# Weave Eval – Agent self-improvement (Python)

Optional Python eval pipeline for W&B Weave: score research and map agent traces and use results to improve personas.

## Setup

```bash
cd weave-eval
pip install -r requirements.txt
export WANDB_API_KEY=...
```

## Usage

1. **Fetch recent traces** from Weave (same project as server, e.g. `weave-hacks`).
2. **Run scorers** on each trace (e.g. “research includes coordinates?”, “map agent called set_map_view?”).
3. **Write scores** back to Weave via `call.apply_scorer(...)` or feedback API.
4. Use Weave UI or API to filter low-scoring traces and update `RESEARCH_PERSONA` / `MAP_PERSONA` in `server/agents-store.js`.

See [Weave scorers](https://docs.wandb.ai/weave/guides/evaluation/scorers) and [docs/WEAVE_SELF_IMPROVEMENT.md](../docs/WEAVE_SELF_IMPROVEMENT.md) for the full self-improvement loop.

## Scorer ideas

- **Research**: Output contains `[lng, lat]` or “latitude”/“longitude”; or tool calls include `save_research`.
- **Map**: Tool calls include `set_map_view` and at least one layer (`add_circle_layer`, `add_line_layer`, etc.).

Implement these as `@weave.op` functions or `weave.Scorer` subclasses that take the trace output (e.g. last message or tool_calls) and return a dict of scores.

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
   - `--dry-run**: create branch and print PR body; do not push or create PR.
   - `--skip-llm**: only create branch and PR body (no LLM, no tests).
3. **Flow**: Creates branch `improvement/<slug>`, calls LLM to generate failing test + implementation, writes files, runs `npm run test:server` and `cd client && npm run test`. On success: commit, push, `gh pr create` with body from [docs/pr-template-improvement.md](../docs/pr-template-improvement.md) (problem, solution, users affected). **Users affected** comes from the storage API search-similar when `IMPROVEMENT_STORAGE_URL` or `IMPROVEMENT_SEARCH_URL` is set; otherwise "Backlog item".
4. **PRs are TDD**: The agent adds or modifies test files first so tests fail, then adds implementation so they pass.

### Env

| Variable | Required | Description |
|----------|----------|-------------|
| GITHUB_TOKEN | Yes (for PR) | GitHub token or `gh auth login` |
| OPENAI_API_KEY | Yes (for LLM) | OpenAI API key for test/impl generation |
| IMPROVEMENT_STORAGE_URL | No | Storage API base URL (submit + search-similar built separately) |
| IMPROVEMENT_SEARCH_URL | No | Search-similar endpoint (overrides storage URL for search only) |
| OPENAI_MODEL | No | Model name (default: gpt-4o-mini) |
