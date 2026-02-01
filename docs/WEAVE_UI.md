# How to Use the Weave UI

This project sends traces to **W&B Weave** when `WANDB_API_KEY` is set. Here’s how to open and use the Weave UI.

## 1. Log in and open your project

1. **Create or log in to a W&B account**  
   Go to [wandb.ai](https://wandb.ai) and sign up or log in.

2. **Get an API key**  
   In the W&B UI: **Settings → API keys**. Create a key and set it as `WANDB_API_KEY` in your server env (e.g. `.env`).

3. **Open the Weave UI for this project**  
   This app uses the project name **`map-searcher`** (see server-nest’s `TracingService` → `weave.init(…)`).

   - If you didn’t set a team, traces go to your **default team**.
   - Open: **https://wandb.ai/&lt;your-username-or-team&gt;/weave-hacks/weave**

   Or from the W&B home page: go to your project **weave-hacks**, then open the **Weave** / traces view for that project.

## 2. What you’ll see

- **Traces** – Each traced operation (e.g. `sendMessage`, `updateBlock`) appears as a row. You can filter by time, op name, etc.
- **Call details** – Click a trace to see inputs, outputs, latency, and any nested ops.
- **Feedback** – On a call’s details page you can add 👍/👎, notes, or human-annotation scorers (if you’ve created them under **Scorers**).

## 3. Adding feedback on a trace

1. In the Weave view, open **Traces**.
2. Click the trace you want to score.
3. On the call details page, use the **Feedback** area (e.g. emoji reactions or “Show feedback”) to add:
   - A reaction (thumbs up/down),
   - A note,
   - Or a human-annotation scorer (e.g. “Did the research include coordinates?”).

That feedback is then used to decide which runs are good or bad when improving personas (see [WEAVE_SELF_IMPROVEMENT.md](./WEAVE_SELF_IMPROVEMENT.md)).

## 4. If you don’t see any traces

- Ensure **`WANDB_API_KEY`** is set in the environment where the server runs (e.g. `.env` or `export WANDB_API_KEY=...`).
- Trigger some traced actions (e.g. send a message to an agent or call the update-block endpoint).
- Confirm you’re in the correct project (**weave-hacks**) and team in the Weave UI.

## 5. Links

- [Weave quickstart: track LLM inputs & outputs](https://docs.wandb.ai/weave/quickstart)
- [Navigate the Weave Trace view](https://docs.wandb.ai/weave/guides/tracking/trace-tree)
- [Collect feedback and use annotations](https://weave-docs.wandb.ai/guides/tracking/feedback)
