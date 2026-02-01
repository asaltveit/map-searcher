# W&B Weave for Agent Self-Improvement

This doc describes how to use W&B Weave so your research and map agents can **self-improve** via tracing, feedback, evaluation, and prompt/memory updates.

**Two improvement cycles:** There is also a **separate** improvement cycle that does **not** use Weave (backlog + user submissions → code PRs and/or persona updates). See [IMPROVEMENT_CYCLE.md](./IMPROVEMENT_CYCLE.md).

## What You Have Today

- **Tracing**: server-nest’s `TracingService` and workflow/agent tracing wrap key operations in Weave ops when `WANDB_API_KEY` is set. Each Letta API call is one Weave trace.
- **Agents**: Research agent (web search, save research) and map agent (layers, view) share a block; personas live in Letta memory blocks.

Self-improvement = **observe** (traces) → **judge** (feedback + evals) → **update** (personas, memory, few-shot examples).

---

## 1. Trace One User Task as One Run (Recommended)

Right now each `sendMessage` and `updateBlock` is a separate trace. For improvement you want **one trace per user task** (e.g. one “find museums in Portland” → research → block update → map).

**Option A – Workflow endpoint (recommended)**  
Add a single endpoint that runs the full workflow (research agent → update block → map agent) and wrap it in one Weave op (e.g. using server-nest’s `TracingService.trace()`). Then:

- One Weave trace = one user query and its full outcome.
- Feedback and evals attach to that trace (e.g. “did the map show the right area?”).

**Option B – Keep current API**  
Keep separate `POST /api/agents/:id/messages` and `POST /api/workflow/update-block`. Each trace is one Letta call. You can still add feedback and evals per message; improvement is then per “research reply” or “map reply” rather than per full task.

---

## 2. Collect Feedback (Signals for Improvement)

Weave supports:

- **Human feedback in the UI**: On each trace, reviewers add 👍/👎, notes, or **human-annotation scorers** (e.g. “Did the research include coordinates?”). Use this to curate good/bad examples.
- **Programmatic feedback**: When your app has a signal (e.g. “user accepted map”, “user re-asked”), add feedback to the trace. The Weave **Python** SDK supports `call.feedback.add_reaction()`, `add_note()`, `add("correctness", {value: 5})`. The **Node/JS** SDK’s feedback APIs are not yet as complete; use the **Service API** or a small Python helper to attach feedback by call ID if needed.
- **Scorers (evals)**: Run automated scorers on traces (see below); scores are stored as feedback on the call.

Use feedback to:
- Decide which traces are “good” (e.g. thumbs up, score &gt; threshold) vs “bad” (thumbs down, low score).
- Build datasets of good/bad examples for prompt updates or few-shot examples.

---

## 3. Evaluate with Scorers (Automated Quality)

Weave **scorers** evaluate model/agent output and attach scores to traces. They are the main lever for **automated** self-improvement.

- **Where**: Scorers are defined and run in **Python** (Weave’s `weave.Evaluation`, `@weave.op` scorers, or `call.apply_scorer()`).
- **What to score** (examples):
  - **Research agent**: “Does the research summary include place names and [lng, lat] or addresses?” (e.g. regex + simple LLM judge); “Did it call `save_research`?”
  - **Map agent**: “Did it call `set_map_view`?”; “Did it add at least one layer?”; “Do tool calls contain valid GeoJSON?”
- **How**:
  1. **Eval pipeline**: A Python job (script or cron) that:
     - Fetches recent traces from Weave (e.g. `client.get_calls()` with filters), or reads from a queue fed by your server.
     - For each trace, extracts the relevant output (e.g. last message, tool calls).
     - Runs your scorers (function or class-based `weave.Scorer`).
     - Writes results back (e.g. `call.apply_scorer(scorer)` or log to Weave as feedback).
  2. **Evaluation + dataset**: Build a Weave **dataset** of example inputs (e.g. “museums in Portland”), run your agent (or a stub that returns stored outputs) for each row, run scorers, and use Weave’s Evaluation UI to compare runs and track metrics over time.

Put the Python eval script in `weave-eval/` (or similar), use `weave.init(project_name)` and the same W&B project as the Node server so traces and scores live together.

---

## 4. Use Feedback and Scores to Improve Agents

“Self-improve” here means **updating agent behavior** using Weave data, not necessarily fully automated RL.

- **Prompt / persona updates**  
  - Periodically (e.g. weekly) open Weave, filter traces by low scores or 👎.  
  - Inspect failures (e.g. “research never included coordinates”, “map agent didn’t set view”).  
  - Edit `RESEARCH_PERSONA` / `MAP_PERSONA` in `server-nest/src/workflow/workflow.config.ts` (or in Letta UI) to add instructions or constraints.  
  - Deploy and let new traces show up in Weave; compare old vs new runs.

- **Few-shot / memory**  
  - Export high-scoring or 👍 traces from Weave (e.g. “user query” + “good research summary” or “good tool sequence”).  
  - Add them as few-shot examples in the agent’s system prompt or as Letta memory blocks so the agent sees good patterns.

- **Guardrails / monitors (optional)**  
  - Weave supports **guardrails** (modify input/output in real time) and **monitors** (score production traces). You can add a scorer that flags e.g. “no coordinates in research” and then either block the reply or send it to a human; over time, use the same scorer’s trends to decide prompt changes.

---

## 5. Minimal Implementation Checklist

1. **Keep/enable tracing**  
   Set `WANDB_API_KEY` so every `sendMessage` and `updateBlock` is traced.

2. **Optional: one trace per workflow**  
   Add a `POST /api/workflow/run` (or similar) that runs research → update block → map in one go, and wrap that in a single Weave op so one trace = one user task.

3. **Human feedback**  
   Use the Weave UI to add 👍/👎 and notes (and human-annotation scorers) on traces. Use these to pick examples for prompt edits.

4. **Automated evals**  
   Add a Python script (e.g. `weave-eval/run_scorers.py`) that:
   - Uses `weave.init("weave-hacks")` (same project as server).
   - Fetches recent calls (or reads from a queue).
   - Runs 1–2 simple scorers (e.g. “research_has_coordinates”, “map_has_set_view”).
   - Writes scores back via `call.apply_scorer(...)` or equivalent.
   Run it on a schedule or after each workflow run.

5. **Improvement loop**  
   Regularly review low-scoring and 👎 traces in Weave, update `RESEARCH_PERSONA` / `MAP_PERSONA` (or memory blocks) in `agents-store.js`, and redeploy. Optionally add good examples as few-shot or memory.

---

## 6. References

- [Weave: Collect feedback and use annotations](https://weave-docs.wandb.ai/guides/tracking/feedback)
- [Weave: Scoring overview](https://docs.wandb.ai/weave/guides/evaluation/scorers)
- [Weave: Evaluations and datasets](https://docs.wandb.ai/weave/guides/core-types/evaluations)
- [Weave: Guardrails and monitors](https://docs.wandb.ai/weave/guides/evaluation/guardrails_and_monitors)
