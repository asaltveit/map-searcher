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

- Run the Improvement PR Agent from the backlog (no Weave):
  ```bash
  export GITHUB_TOKEN=...
  export OPENAI_API_KEY=...
  # Optional: IMPROVEMENT_STORAGE_URL or IMPROVEMENT_SEARCH_URL for “users affected” in PR body
  python weave-eval/improvement_agent.py [--backlog docs/improvement-backlog.md] [--index 0] [--improvement "Title"] [--dry-run]
  ```
- The agent creates a branch, generates failing test + implementation (TDD), runs tests, and opens a PR. See [weave-eval/README.md](../weave-eval/README.md).

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
- **In-app submissions**: `IMPROVEMENT_STORAGE_URL` for `POST /api/improvements`.
- **This cycle does not use**: `WANDB_API_KEY`, Weave, or any trace/score data.
