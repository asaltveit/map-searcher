# Improvement cycle (separate from Weave)

This improvement cycle is **independent of W&B Weave traces**. It is driven by an explicit backlog and user-submitted improvement requests. No trace data, scores, or W&B API are used.

## Purpose

- **Weave cycle** (optional): Traces → feedback/scorers → persona updates. See [WEAVE_SELF_IMPROVEMENT.md](./WEAVE_SELF_IMPROVEMENT.md).
- **This cycle**: Backlog + user submissions → review → code PRs and/or agent (persona/config) updates. No Weave.

Use this cycle when you want to improve the product from written feedback and a prioritized backlog, without depending on observability or evals.

---

## Inputs

1. **Backlog** – [docs/improvement-backlog.md](./improvement-backlog.md)  
   Entries have: title, problem, solution, area (`client` | `server` | `both`). Optionally add **area: agents** (or a **type: persona** field) for agent-behavior improvements (personas, tools, prompts).

2. **User submissions** – `POST /api/improvements`  
   Body: `{ "improvement": "string" }`. When `IMPROVEMENT_STORAGE_URL` is set, the server forwards submissions to your storage API. You then review and merge into the backlog (or use storage search when running the improvement PR agent).

---

## Process

### 1. Collect and triage

- Review new submissions (from storage or in-app).
- Add or merge into [improvement-backlog.md](./improvement-backlog.md) with title, problem, solution, area.
- Triage each entry:
  - **Code** (client, server, both) → use Improvement PR Agent (step 2).
  - **Agent behavior** (personas, tools, prompts) → use persona/config updates (step 3).

### 2. Code improvements (PRs)

- **Option A – Cursor agent + GitHub MCP**  
  With the GitHub MCP server configured (see [.cursor/mcp.json](../.cursor/mcp.json)), the Cursor agent can create and manage PRs using GitHub MCP tools. Ensure Docker is installed and `GITHUB_TOKEN` (or `GITHUB_PERSONAL_ACCESS_TOKEN`) is set in your environment; the same token used by the improvement PR script works. You can ask the agent to create a PR for an improvement (e.g. with context from the backlog) and it will use MCP to open or update PRs. This can replace or complement running the Python script below.

- **Option B – Improvement PR Agent (Python script)**  
  Run the Improvement PR Agent from the backlog (no Weave):
  ```bash
  export GITHUB_TOKEN=...
  export OPENAI_API_KEY=...
  # Optional: IMPROVEMENT_STORAGE_URL or IMPROVEMENT_SEARCH_URL for “users affected” in PR body
  python weave-eval/improvement_agent.py [--backlog docs/improvement-backlog.md] [--index 0] [--improvement "Title"] [--dry-run] [--remove-from-backlog]
  ```
- The agent creates a branch, generates failing test + implementation (TDD), runs tests, and opens a PR. See [weave-eval/README.md](../weave-eval/README.md).
- **Cleanup**: By default the improvement is **not** removed from the backlog after a PR is created (so you can re-run for another entry or keep history). Use `--remove-from-backlog` so the chosen entry is removed after a successful PR; this avoids re-picking the same item and keeps the backlog from bloating. The external storage API (user-submitted improvements) is out of scope here; if you run one, consider supporting “mark as addressed” when a PR is created so the same requests do not keep appearing in search-similar.

- **Option C – Cron job (server-nest)**  
  The server-nest backend can run the improvement agent on a schedule or via HTTP trigger:
  - **In-process cron**: Set `IMPROVEMENT_CRON_ENABLED=true` and optionally `IMPROVEMENT_CRON_SCHEDULE` (default: 2am daily). The server must have the repo root and Python 3 on PATH (python3 or python).
  - **HTTP trigger**: `POST /api/improvements/run-cycle` with header `X-Cron-Secret: <IMPROVEMENT_CRON_SECRET>`. Use this from an external cron when the API server cannot run Python.

- **Option D – GitHub Action**  
  [.github/workflows/improvement-cron.yml](../.github/workflows/improvement-cron.yml) runs the improvement agent on a schedule (2am UTC daily) and on manual trigger. It uses **Python 3** and **Node/pnpm** for tests. Add repo secrets: `OPENAI_API_KEY` (required); optional `IMPROVEMENT_STORAGE_URL`, `IMPROVEMENT_SEARCH_URL` for “users affected” in PR body.

### 3. Agent behavior improvements (personas / config)

- For backlog entries that are about **agent behavior** (e.g. area: agents, or type: persona):
  - Edit workflow personas in `server-nest/src/workflow/workflow.config.ts` (RESEARCH_PERSONA, MAP_PERSONA), or defaults in `server-nest/src/config/letta.config.ts` and agents; or update via Letta UI.
- Deploy and verify; no Weave or trace data involved.

### 4. Optional: sync storage → backlog

- If your storage API exposes a list or search, you can periodically pull new requests and add them to the backlog (manually or with a small script). The improvement PR agent can use `IMPROVEMENT_STORAGE_URL` / `IMPROVEMENT_SEARCH_URL` to fill “users affected” when creating PRs; it does not need Weave.

---

## Checklist (separate cycle)

| Step | Action |
|------|--------|
| 1 | Add entries to [improvement-backlog.md](./improvement-backlog.md) (from review or storage). |
| 2 | For **code** work: run `improvement_agent.py` with backlog; merge PRs. |
| 3 | For **agent** work: edit personas/config in server-nest (workflow.config.ts or letta.config.ts) or Letta UI; deploy. |
| 4 | (Optional) Use storage search when running the PR agent for “users affected”; no Weave. |

---

## Env (no Weave)

- **Improvement PR Agent**: `GITHUB_TOKEN`, `OPENAI_API_KEY`; optional `IMPROVEMENT_STORAGE_URL` or `IMPROVEMENT_SEARCH_URL`.
- **Cursor agent + GitHub MCP**: Same `GITHUB_TOKEN` (or `GITHUB_PERSONAL_ACCESS_TOKEN`) is used by `.cursor/mcp.json` so one token works for both the Python script and MCP PR creation.
- **In-app submissions**: Improvements are stored in server-nest DB; set `IMPROVEMENT_STORAGE_URL` to this API base (e.g. `http://localhost:3000/api/improvements`) when running the PR agent for “users affected”.
- **Cron (server-nest)**:
  - `IMPROVEMENT_CRON_ENABLED` – set to `true` to run the improvement agent on a schedule.
  - `IMPROVEMENT_CRON_SCHEDULE` – cron expression (default: `0 2 * * *`, 2am daily).
  - `IMPROVEMENT_REPO_ROOT` – repo root path (optional; defaults to parent of server-nest cwd if `weave-eval/improvement_agent.py` exists).
  - `IMPROVEMENT_AGENT_SCRIPT_PATH` – path to `improvement_agent.py` (optional; default: `weave-eval/improvement_agent.py` under repo root).
  - `IMPROVEMENT_CRON_INDEX` – backlog index to run (default: `0`).
  - `IMPROVEMENT_CRON_SECRET` – secret for `POST /api/improvements/run-cycle` (required when using HTTP trigger).
- **This cycle does not use**: `WANDB_API_KEY`, Weave, or any trace/score data.
