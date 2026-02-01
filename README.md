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
   npm run install:all
   ```

2. Copy env and set keys:

   ```bash
   cp .env.example .env
   # Edit .env: set LETTA_API_KEY and REDIS_URL (e.g. redis://localhost:6379)
   ```

3. Start Redis (if local):

   ```bash
   redis-server
   ```

4. Run app:

   ```bash
   npm run dev
   ```

   - Backend: http://localhost:3001  
   - Frontend: http://localhost:5173 (proxies /api to backend)

## Usage

1. Open http://localhost:5173
2. Click **Load agents** (creates research + map agents and shared block on first use)
3. Type a request, e.g. **"Research museums in Portland and show a route between them on the map"**
4. Send. The workflow runs: research agent (search stored research first, then web search, save with source) → shared block updated → map agent (adds layers and sets view). Map and chat update as tools run.

## Testing

- **Server:** `npm run test:server` (from repo root). Requires network (supertest binds a port). Tests: validation (`isValidId`), auth (user id sanitization), and route security (400 for invalid agent id, researchBlockId, source_url, missing content).
- **Client:** `cd client && npm run test`. Vitest + React Testing Library + jest-axe. Tests: home page and VoiceSection accessibility (main landmark, region/labels, live transcript, button labels, no axe violations).

## Project layout

- `server/` – Express backend: Letta proxy, Redis research store, per-user agents (hybrid), auth stub
- `client/` – Vite React TS: MapLibre map, chat, workflow runner, client-side tools (research + map)
- `voice/` – Pipecat STT/TTS scaffold (see [voice/README.md](voice/README.md))
- `.env` – LETTA_API_KEY, REDIS_URL (optional: WANDB_API_KEY, ENABLE_HYBRID_MULTI_USER)

## Env

| Variable | Required | Description |
|----------|----------|-------------|
| LETTA_API_KEY | Yes | Letta API key |
| REDIS_URL | Yes | Redis URL (e.g. redis://localhost:6379) |
| WANDB_API_KEY | No | W&B Weave tracing |
| ENABLE_HYBRID_MULTI_USER | No | Set to `true` for per-user agents + my research; requires X-User-Id or cookie |

## Security

- **Helmet**: Secure HTTP headers (X-Content-Type-Options, X-Frame-Options, etc.); CSP disabled so the separate Vite frontend can load scripts/maps.
- Secrets (LETTA_API_KEY, REDIS_URL) stay on the server; frontend only talks to `/api`
- Research API validates URLs (http/https only) and content length
- Map tool args are validated (allowlist layer types, bounds-check center/zoom)
- **Rate limiting**: `/api` routes are limited to 100 requests per 15 minutes per IP; respond with 429 when exceeded

## Tracing (Weave)

When `WANDB_API_KEY` is set, the server initializes W&B Weave and traces `sendMessage` and `updateBlock` calls for latency and observability. If the Weave SDK fails to initialize (e.g. missing netrc), tracing is disabled and the app continues without it.

## Logging

The server uses structured "wide event" logging (JSON lines): each request logs `request_end` with `requestId`, `method`, `path`, `statusCode`, `durationMs`, and `userId`. Errors log `request_error` with `path`, `requestId`, and `error`. See `server/logger.js`.

## Accessibility

- Map: focus the map container then use **arrow keys** to pan and **+ / −** to zoom; actions are announced in the live region. A short hint is shown above the map.
- Chat: labeled input, aria-describedby hint, and status/alert regions for errors and map updates.

## Voice

The app includes a **Voice** section (client) using the **Web Speech API**: mic for speech-to-text, and text-to-speech for typed or pasted text. No backend or Pipecat required. See **[voice/README.md](voice/README.md)** for details and for the optional Pipecat STT/TTS scaffold (server-side, higher quality).
