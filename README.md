# Weave Hacks – Research & Map

Letta-based workflow: research agent → shared block → map agent. You type or say what you want to search; the app runs research, then updates a MapLibre map with layers and shows the result in chat.

## Plan

See [Letta Map Agent + MapLibre](.cursor/plans/letta_map_agent_+_maplibre_0c09b8a8.plan.md) for the full plan (workflow, Redis, hybrid multi-user, accessibility, security, Weave, Pipecat, etc.).

## Prerequisites

- Node 18+
- Redis (e.g. `redis-server` locally)
- [Letta API key](https://app.letta.com/api-keys)

## Setup

1. Clone and install:

   ```bash
   cd weave-hacks
   pnpm install
   ```

2. Copy the env template and set your values (the app reads from `.env`, not `.env.example`):

   ```bash
   cp .env.example server-nest/.env
   # Edit server-nest/.env: set LETTA_API_KEY, REDIS_URL, DATABASE_URL (and optional keys)
   ```

3. Start Redis (if local):

   ```bash
   redis-server
   ```

4. Run app (two terminals):

   - **Backend:** `cd server-nest && PORT=3001 pnpm run start:dev` → http://localhost:3001  
   - **Frontend:** `cd client && pnpm run dev` → http://localhost:3000  

   The client expects the API at `http://localhost:3001` when the app runs on port 3000 (set `NEXT_PUBLIC_API_URL` in production).

## Usage

1. Open http://localhost:3000
2. Click **Load agents** (creates research + map agents and shared block on first use)
3. Type a request, e.g. **"Research museums in Portland and show a route between them on the map"**
4. Send. The workflow runs: research agent (search stored research first, then web search, save with source) → shared block updated → map agent (adds layers and sets view). Map and chat update as tools run.

## Testing

- **Backend:** `pnpm --filter server-nest test` (or `cd server-nest && pnpm test`). Jest; includes workflow, agents, and API tests.
- **Client:** `pnpm --filter client test` (or `cd client && pnpm test`). Vitest + React Testing Library + jest-axe. Tests: home page and VoiceSection accessibility (main landmark, region/labels, live transcript, button labels, no axe violations).

## Project layout

- `server-nest/` – NestJS backend: Letta workflow (agents, send-message, update-block), research store, auth, health
- `client/` – Next.js React TS: MapLibre map, chat, voice section, workflow API client
- `voice/` – Pipecat STT/TTS scaffold (see [voice/README.md](voice/README.md))
- `.env` – Backend reads from `server-nest/.env`. See root `.env.example` for a template (copy to `server-nest/.env`).

## Env

| Variable | Required | Description |
|----------|----------|-------------|
| LETTA_API_KEY | Yes | Letta API key |
| REDIS_URL | Yes | Redis URL (e.g. redis://localhost:6379) |
| DATABASE_URL | Yes | PostgreSQL URL for server-nest/Prisma (e.g. postgresql://localhost:5432/map_searcher) |
| WANDB_API_KEY | No | W&B Weave tracing |
| WANDB_ENTITY | No | W&B username/team if you see "Default entity name not found" |
| ENABLE_HYBRID_MULTI_USER | No | Set to `true` for per-user agents + my research; requires X-User-Id or cookie |
| NEXT_PUBLIC_API_URL | No | Client: API base URL in production (e.g. https://your-api.fly.dev) |

## Security

- NestJS **ValidationPipe** (whitelist, forbidNonWhitelisted) on all DTOs; CORS restricted to known origins (e.g. localhost:3000).
- Secrets (LETTA_API_KEY, REDIS_URL) stay on the backend; frontend only talks to the API (e.g. `NEXT_PUBLIC_API_URL` in production).
- Research and workflow endpoints validate input; map tool args are validated (allowlist layer types, bounds-check center/zoom).

## Tracing (Weave)

When `WANDB_API_KEY` is set, the NestJS backend initializes W&B Weave and traces `sendMessage` and `updateBlock` calls for latency and observability. If the Weave SDK fails to initialize (e.g. missing netrc), tracing is disabled and the app continues without it.

## Logging

The NestJS backend uses Nest’s built-in logger; request lifecycle and errors are logged to the console (or your configured logger).

## Accessibility

- Map: focus the map container then use **arrow keys** to pan and **+ / −** to zoom; actions are announced in the live region. A short hint is shown above the map.
- Chat: labeled input, aria-describedby hint, and status/alert regions for errors and map updates.

## Voice

The app includes a **Voice** section (client) using the **Web Speech API**: mic for speech-to-text, and text-to-speech for typed or pasted text. No backend or Pipecat required. See **[voice/README.md](voice/README.md)** for details and for the optional Pipecat STT/TTS scaffold (server-side, higher quality).
