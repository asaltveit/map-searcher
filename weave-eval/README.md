# Weave Eval – Agent self-improvement (Python)

Python eval pipeline for W&B Weave: score research and map agent traces and use results to **automate** improvement (scorers + improvement report).

## Setup

```bash
cd weave-eval
pip install -r requirements.txt
export WANDB_API_KEY=...
export WANDB_ENTITY=your-username   # optional, same as server-nest
```

## Demo mode (one command)

For live demos, run a single script that scores recent traces and prints one summary:

```bash
cd weave-eval && python demo_mode.py [--limit 20]
```

**Before running:** Start the Nest app with tracing (`WANDB_API_KEY` and `WANDB_ENTITY` in `server-nest/.env`), open the client, load agents, and send a few research + map messages so traces exist. Then run `demo_mode.py` from `weave-eval/`.

Output: trace count, scored count, low-scoring Research/Map counts, and suggested persona edits in one block.

## Automated improvement pipeline

1. **Run scorers** on recent traces (same W&B project as server-nest: `entity/map-searcher`):
   ```bash
   python weave-eval/run_scorers.py [--limit 50] [--dry-run]
   ```
   - Fetches recent agent traces from Weave.
   - Runs `research_has_place_or_coords` and `map_has_action` scorers (see [scorers.py](scorers.py)).
   - Attaches scores to traces (via `apply_scorer` or feedback API when available).
   - Use `--dry-run` to list calls without scoring.

2. **Generate improvement report** from low-scoring traces:
   ```bash
   python weave-eval/improvement_report.py [--limit 100]
   ```
   - Reads scores from traces (run `run_scorers.py` first, or add scores in Weave UI).
   - Prints counts of low-scoring Research/Map traces and **suggested persona edits** (e.g. “Strengthen RESEARCH_PERSONA to include place names and [lng, lat]”).

3. **Apply changes**: Edit personas in server-nest config/Letta (e.g. workflow.config.ts or letta.config.ts), deploy, then run `run_scorers.py` again to track improvement.

**Schedule**: Run `run_scorers.py` on a cron (e.g. hourly) or after workflows; run `improvement_report.py` weekly to get suggested edits.

See [Weave scorers](https://docs.wandb.ai/weave/guides/evaluation/scorers) and [docs/WEAVE_SELF_IMPROVEMENT.md](../docs/WEAVE_SELF_IMPROVEMENT.md). For a **separate** improvement cycle (no Weave): [docs/IMPROVEMENT_CYCLE.md](../docs/IMPROVEMENT_CYCLE.md).

## Scorers (scorers.py)

- **research_has_place_or_coords**: Output contains `[lng, lat]`, latitude/longitude, or place/address-like text.
- **map_has_action**: Output contains `set_map_view` or `add_*_layer` (fill, line, circle, symbol).

Defined as `@weave.op` functions; extend or add scorers in [scorers.py](scorers.py).

---

## Improvement PR Agent

Optional script that picks an improvement from the backlog, generates **failing tests** and **implementation** via an LLM (TDD), runs tests, and opens a GitHub PR with a structured description (problem, solution, users affected/asking).

### Setup

```bash
cd weave-eval
pip install -r requirements.txt
export GITHUB_TOKEN=...        # gh auth or token for gh pr create
export OPENAI_API_KEY=...      # or use Anthropic (extend script)
# Optional: IMPROVEMENT_STORAGE_URL or IMPROVEMENT_SEARCH_URL for search-similar (users affected)
```

### Usage

1. **Backlog**: Add entries to [docs/improvement-backlog.md](../docs/improvement-backlog.md) (title, problem, solution, area).
2. **Run** (from repo root or weave-eval):
   ```bash
   python weave-eval/improvement_agent.py [--backlog docs/improvement-backlog.md] [--index 0] [--dry-run]
   ```
   - `--index N`: pick N-th backlog entry (default 0).
   - `--improvement "Title"`: pick by title.
   - `--dry-run`: create branch and print PR body; do not push or create PR.
   - `--skip-llm`: only create branch and PR body (no LLM, no tests).
   - `--remove-from-backlog`: after a successful PR, remove this entry from the backlog file so it is not picked again (avoids bloat and duplicate PRs).
3. **Flow**: Creates branch `improvement/<slug>`, calls LLM to generate failing test + implementation, writes files, runs `npm run test:server` and `cd client && npm run test`. On success: commit, push, `gh pr create` with body from [docs/pr-template-improvement.md](../docs/pr-template-improvement.md) (problem, solution, users affected). **Users affected** comes from the storage API search-similar when `IMPROVEMENT_STORAGE_URL` or `IMPROVEMENT_SEARCH_URL` is set; otherwise "Backlog item". By default the backlog file is **not** modified; use `--remove-from-backlog` to remove the chosen entry after a successful PR.
4. **PRs are TDD**: The agent adds or modifies test files first so tests fail, then adds implementation so they pass.

### Env

| Variable | Required | Description |
|----------|----------|-------------|
| GITHUB_TOKEN | Yes (for PR) | GitHub token or `gh auth login` |
| OPENAI_API_KEY | Yes (for LLM) | OpenAI API key for test/impl generation |
| IMPROVEMENT_STORAGE_URL | No | Storage API base URL (submit + search-similar built separately) |
| IMPROVEMENT_SEARCH_URL | No | Search-similar endpoint (overrides storage URL for search only) |
| OPENAI_MODEL | No | Model name (default: gpt-4o-mini) |
