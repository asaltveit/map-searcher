# Weave Hacks – Research & Map

**Description:** An AI-powered research and mapping app that turns natural-language questions into live map updates. You ask about places, routes, or current events in plain language (typed or spoken); AI agents run the research—searching stored findings and the web, with sources—then a map agent drives the UI by adding layers, pins, and viewport changes to a MapLibre map. The interface (map and chat) updates in response to the agents, so you see current research visualized on the map as the workflow runs. The project supports **self-healing agents and workflows**: W&B Weave traces research and map runs, automated scorers evaluate quality, and improvement reports suggest persona and config updates so agents get better over time.

---

Letta-based workflow: research agent → shared block → map agent. You type or say what you want to search; the app runs research, then updates a MapLibre map with layers and shows the result in chat.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Agentic Architecture](#agentic-architecture)
- [Data Flow Diagrams](#data-flow-diagrams)
- [Database Schema](#database-schema)
- [Technology Summary](#technology-summary)
- [Plan](#plan)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Project Layout](#project-layout)
- [Environment Variables](#env)
- [Security](#security)
- [Tracing (Weave)](#tracing-weave)
- [Self-improvement Demo](#self-improvement-demo)
- [Logging](#logging)
- [Accessibility](#accessibility)
- [Voice](#voice)

---

## Architecture Overview

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MAP-SEARCHER                                    │
│                        AI-Powered Location Research                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────┐          ┌────────────────────────────────────┐ │
│  │   FRONTEND (Next.js)   │◄────────►│      BACKEND (NestJS)              │ │
│  │                        │   REST   │                                    │ │
│  │  • React 19            │   API    │  • Prisma ORM + PostgreSQL         │ │
│  │  • MapLibre GL Maps    │          │  • BullMQ Job Queue + Redis        │ │
│  │  • Pipecat Voice SDK   │          │  • JWT Authentication              │ │
│  │  • TailwindCSS         │          │  • Swagger/OpenAPI                 │ │
│  └────────────────────────┘          └───────────────┬────────────────────┘ │
│                                                      │                       │
│                                                      ▼                       │
│                              ┌────────────────────────────────────────────┐ │
│                              │         AI AGENT LAYER                     │ │
│                              │                                            │ │
│                              │  ┌─────────────┐   ┌─────────────────────┐ │ │
│                              │  │   LETTA AI  │   │      PIPECAT        │ │ │
│                              │  │   (Agents)  │   │   (Voice Chat)      │ │ │
│                              │  └─────────────┘   └─────────────────────┘ │ │
│                              │           │                    │           │ │
│                              │           ▼                    ▼           │ │
│                              │  ┌─────────────┐   ┌─────────────────────┐ │ │
│                              │  │   OpenAI    │   │     Daily.co        │ │ │
│                              │  │  GPT-4o-mini│   │     (WebRTC)        │ │ │
│                              │  └─────────────┘   └─────────────────────┘ │ │
│                              └────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Project Structure (Monorepo)

```
map-searcher/
├── client/                 # Next.js 16 + React 19 Frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   │   ├── alerts/     # Alert & voice chat components
│   │   │   ├── auth/       # Authentication UI
│   │   │   ├── map/        # MapLibre components
│   │   │   └── ui/         # Reusable UI primitives
│   │   ├── hooks/          # Custom hooks (TTS, STT, alerts)
│   │   ├── lib/            # API client, utilities
│   │   └── contexts/       # React contexts
│   └── package.json
│
├── server-nest/            # NestJS Backend API
│   ├── src/
│   │   ├── agents/         # Agent CRUD & messaging
│   │   ├── alerts/         # News alerts system
│   │   ├── auth/           # JWT authentication
│   │   ├── letta/          # Letta AI SDK wrapper
│   │   ├── news-workflow/  # Article processing pipeline
│   │   ├── workflow/       # Research + Map agent orchestration
│   │   ├── tracing/        # W&B Weave observability
│   │   └── tools/          # Agent tool definitions
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
│
├── weave-eval/             # Python self-improvement system
│   ├── scorers.py          # Response evaluation
│   └── improvement_agent.py # Auto-PR generation
│
└── voice/                  # Pipecat voice server scaffold
```

### Backend Module Structure

| Module | Purpose |
|--------|---------|
| **agents** | Letta agent CRUD and message handling |
| **auth** | JWT authentication, register/login endpoints |
| **letta** | Letta API client wrapper service |
| **research** | Research storage and retrieval |
| **workflow** | Workflow blocks and agent orchestration |
| **news-workflow** | News article processing pipeline |
| **alerts** | News alerts management and scheduling |
| **tools** | Tool definitions for agents |
| **models** | Model selection/management |
| **improvements** | User improvement requests & feedback |
| **user-preferences** | User settings (map defaults, etc.) |
| **tracing** | W&B Weave integration for observability |
| **monitoring** | Health checks, metrics |

### Frontend Directory Structure

| Directory | Contents |
|-----------|----------|
| **app/** | Next.js App Router pages |
| **components/** | React components (alerts, auth, map, UI) |
| **hooks/** | Custom React hooks (useAlerts, useTTS, useSpeechRecognition) |
| **lib/** | Utilities (API client, map config, validations) |
| **types/** | TypeScript types |
| **contexts/** | React Context providers |
| **data/** | Demo data |
| **test/** | Test setup and utilities |

---

## Agentic Architecture

This is where it gets interesting! The app uses **multiple AI agent patterns** working together.

### Agent System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AGENTIC ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    LETTA AI AGENT FRAMEWORK                          │   │
│   │                                                                      │   │
│   │  ┌───────────────┐  ┌───────────────┐  ┌────────────────────────┐  │   │
│   │  │  RESEARCH     │  │     MAP       │  │    ARTICLE CHAT        │  │   │
│   │  │   AGENT       │  │    AGENT      │  │      AGENTS            │  │   │
│   │  │               │  │               │  │                        │  │   │
│   │  │ • web_search  │  │ • GeoJSON gen │  │ • 1 per NewsAlert      │  │   │
│   │  │ • save_research│ │ • Map views   │  │ • Article context      │  │   │
│   │  │ • Location ID │  │ • Layer mgmt  │  │ • Conversation memory  │  │   │
│   │  └───────┬───────┘  └───────┬───────┘  └────────────┬───────────┘  │   │
│   │          │                  │                       │              │   │
│   │          └───────────┬──────┴───────────────────────┘              │   │
│   │                      │                                              │   │
│   │                      ▼                                              │   │
│   │         ┌────────────────────────┐                                  │   │
│   │         │   SHARED MEMORY BLOCKS │                                  │   │
│   │         │                        │                                  │   │
│   │         │  • persona             │                                  │   │
│   │         │  • research_findings   │                                  │   │
│   │         │  • articles_context    │                                  │   │
│   │         └────────────────────────┘                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    PIPECAT VOICE AGENTS                              │   │
│   │                                                                      │   │
│   │   ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐ │   │
│   │   │   STT        │───►│   LLM        │───►│      TTS             │ │   │
│   │   │ (Whisper)    │    │  Pipeline    │    │   (OpenAI/Browser)   │ │   │
│   │   └──────────────┘    └──────────────┘    └──────────────────────┘ │   │
│   │          ▲                                          │              │   │
│   │          │            WebRTC (Daily.co)             │              │   │
│   │          └──────────────────────────────────────────┘              │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1. Two-Agent Workflow System

The app uses a **specialized two-agent workflow** for location research:

```
┌────────────────────────────────────────────────────────────────────────┐
│                    RESEARCH + MAP WORKFLOW                              │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   User Query: "Find coffee shops in downtown SF"                        │
│                        │                                                │
│                        ▼                                                │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                   RESEARCH AGENT                                │   │
│   │                                                                 │   │
│   │   Persona: "I am a search and gathering specialist..."         │   │
│   │                                                                 │   │
│   │   Tools:                                                        │   │
│   │   • web_search    → Search the web for information             │   │
│   │   • save_research → Save findings to shared memory block       │   │
│   │                                                                 │   │
│   │   Behavior:                                                     │   │
│   │   1. Check existing research in memory first                   │   │
│   │   2. Use web_search for new queries                            │   │
│   │   3. Extract: place names, addresses, GPS coords, routes       │   │
│   │   4. Save to research_block for Map Agent                      │   │
│   └─────────────────────────────┬──────────────────────────────────┘   │
│                                 │                                       │
│                                 ▼                                       │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │              SHARED MEMORY BLOCK                                 │  │
│   │                                                                  │  │
│   │   {                                                              │  │
│   │     "label": "research",                                         │  │
│   │     "value": "Found 5 coffee shops:\n                           │  │
│   │               1. Blue Bottle - 66 Mint St (37.7821, -122.4039)  │  │
│   │               2. Sightglass - 270 7th St (37.7773, -122.4096)   │  │
│   │               ..."                                               │  │
│   │   }                                                              │  │
│   └─────────────────────────────┬────────────────────────────────────┘  │
│                                 │                                       │
│                                 ▼                                       │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                      MAP AGENT                                  │   │
│   │                                                                 │   │
│   │   Persona: "I am a cartography and visualization specialist"   │   │
│   │                                                                 │   │
│   │   Output Format:                                                │   │
│   │   MAP_STATE_JSON                                                │   │
│   │   {                                                             │   │
│   │     "type": "FeatureCollection",                                │   │
│   │     "features": [                                               │   │
│   │       {                                                         │   │
│   │         "type": "Feature",                                      │   │
│   │         "geometry": {"type": "Point", "coordinates": [...]}    │   │
│   │         "properties": {"name": "Blue Bottle", "type": "cafe"}  │   │
│   │       }                                                         │   │
│   │     ],                                                          │   │
│   │     "view": {"center": [-122.4, 37.78], "zoom": 14}            │   │
│   │   }                                                             │   │
│   │   END_MAP_STATE_JSON                                            │   │
│   └─────────────────────────────┬──────────────────────────────────┘   │
│                                 │                                       │
│                                 ▼                                       │
│                        ┌────────────────┐                               │
│                        │   MAP DISPLAY  │                               │
│                        │   (MapLibre)   │                               │
│                        └────────────────┘                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Implementation:** `server-nest/src/workflow/workflow.service.ts`

### 2. Article Chat Agents (One Per Alert)

Each news alert gets its own dedicated chat agent with article context:

```
┌────────────────────────────────────────────────────────────────────────┐
│                    ARTICLE CHAT AGENT PATTERN                           │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   NewsAlert Created                                                     │
│        │                                                                │
│        ▼                                                                │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │               ARTICLE PROCESSING PIPELINE                     │     │
│   │                                                               │     │
│   │   1. Search news APIs for query                               │     │
│   │   2. Extract article text & metadata                          │     │
│   │   3. AI extracts locations from articles                      │     │
│   │   4. Geocode locations → lat/lng coordinates                  │     │
│   │   5. Store articles + locations in PostgreSQL                 │     │
│   └──────────────────────────────────────────────────────────────┘     │
│        │                                                                │
│        ▼                                                                │
│   User wants to chat about articles                                     │
│        │                                                                │
│        ▼                                                                │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │         ARTICLE CHAT AGENT (per alert)                        │     │
│   │                                                               │     │
│   │   Name: ArticleChat-{alertId}                                 │     │
│   │                                                               │     │
│   │   Memory Blocks:                                              │     │
│   │   ┌─────────────────────────────────────────────────────┐    │     │
│   │   │ persona: "You are an article research assistant.    │    │     │
│   │   │           Answer questions about the news articles  │    │     │
│   │   │           provided. Be specific, cite sources."     │    │     │
│   │   └─────────────────────────────────────────────────────┘    │     │
│   │   ┌─────────────────────────────────────────────────────┐    │     │
│   │   │ articles:                                            │    │     │
│   │   │   ARTICLES:                                          │    │     │
│   │   │   - "Robbery on Market St" (SF Chronicle): Police   │    │     │
│   │   │     responded to armed robbery at 3rd & Market...   │    │     │
│   │   │   - "Crime trends in SOMA" (SFGate): Analysis of    │    │     │
│   │   │     recent crime data shows increase in...          │    │     │
│   │   └─────────────────────────────────────────────────────┘    │     │
│   │                                                               │     │
│   │   Tools: web_search (for topics not in articles)              │     │
│   └──────────────────────────────────────────────────────────────┘     │
│        │                                                                │
│        ▼                                                                │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │   User: "What locations had incidents this week?"             │     │
│   │                                                               │     │
│   │   Agent: "Based on the articles, incidents occurred at:       │     │
│   │          • 3rd & Market St (robbery, SF Chronicle)            │     │
│   │          • 5th & Mission St (assault, SFGate)                 │     │
│   │          • Powell Station (theft, KQED)"                      │     │
│   └──────────────────────────────────────────────────────────────┘     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Implementation:** `server-nest/src/alerts/alerts.service.ts:chatWithArticles()`

### 3. Pipecat Voice Chat System

Real-time voice conversations using Pipecat + Daily.co WebRTC:

```
┌────────────────────────────────────────────────────────────────────────┐
│                       PIPECAT VOICE ARCHITECTURE                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                        CLIENT (Browser)                          │  │
│   │                                                                  │  │
│   │   ┌────────────┐    ┌────────────┐    ┌────────────────────┐   │  │
│   │   │ Microphone │───►│  Pipecat   │───►│   Audio Output      │   │  │
│   │   │   Input    │    │   React    │◄───│   (Speaker)         │   │  │
│   │   └────────────┘    │   Client   │    └────────────────────┘   │  │
│   │                     └─────┬──────┘                              │  │
│   └───────────────────────────┼─────────────────────────────────────┘  │
│                               │                                         │
│                               │ WebRTC (Daily.co Transport)            │
│                               │                                         │
│   ┌───────────────────────────┼─────────────────────────────────────┐  │
│   │                           ▼                                      │  │
│   │   ┌──────────────────────────────────────────────────────────┐  │  │
│   │   │                  PIPECAT BOT SERVER                       │  │  │
│   │   │                                                           │  │  │
│   │   │   ┌─────────┐   ┌─────────────┐   ┌─────────────────┐   │  │  │
│   │   │   │   STT   │──►│   LLM       │──►│      TTS        │   │  │  │
│   │   │   │         │   │  (Pipeline) │   │                 │   │  │  │
│   │   │   │ Whisper │   │  GPT-4o     │   │  OpenAI Voices  │   │  │  │
│   │   │   └─────────┘   └─────────────┘   └─────────────────┘   │  │  │
│   │   │        │              │                    │             │  │  │
│   │   │        └──────────────┴────────────────────┘             │  │  │
│   │   │                       │                                  │  │  │
│   │   │              Article Context                             │  │  │
│   │   │              (from NewsAlert)                            │  │  │
│   │   └──────────────────────────────────────────────────────────┘  │  │
│   │                                                                  │  │
│   │                        BACKEND                                   │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Voice Connection Flow:**

```
┌─────────┐         ┌─────────┐         ┌──────────┐         ┌─────────┐
│  User   │         │ Frontend│         │  Backend │         │ Daily.co│
└────┬────┘         └────┬────┘         └────┬─────┘         └────┬────┘
     │ Click Voice       │                    │                    │
     │ Chat Button       │                    │                    │
     │ ─────────────────►│                    │                    │
     │                   │ POST /pipecat/     │                    │
     │                   │ connect            │                    │
     │                   │───────────────────►│                    │
     │                   │                    │ Create Room        │
     │                   │                    │───────────────────►│
     │                   │                    │◄───────────────────│
     │                   │                    │ {token, roomUrl}   │
     │                   │◄───────────────────│                    │
     │                   │ {token, roomUrl,   │                    │
     │                   │  sessionId}        │                    │
     │                   │                    │                    │
     │                   │ PipecatClient      │                    │
     │                   │ .connect()         │                    │
     │                   │─────────────────────────────────────────►│
     │                   │◄─────────────────────────────────────────│
     │                   │        WebRTC Connected                  │
     │                   │                    │                    │
     │ Speak             │                    │                    │
     │ ─────────────────►│ Audio Stream       │                    │
     │                   │─────────────────────────────────────────►│
     │                   │                    │                    │
     │                   │◄─────────────────────────────────────────│
     │◄──────────────────│ AI Voice Response  │                    │
     │                   │                    │                    │
```

**Implementation:** `client/src/components/alerts/PipecatChat.tsx`

### 4. Text-to-Speech System (Multi-Tier)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TTS ARCHITECTURE                                 │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Text to speak                                                         │
│        │                                                                │
│        ▼                                                                │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │                    CACHE CHECK                                │     │
│   │                                                               │     │
│   │   Key: hash(text + voiceId)                                   │     │
│   │   TTL: 10 minutes                                             │     │
│   │   Max: 50 items                                               │     │
│   └───────────────────────────┬──────────────────────────────────┘     │
│                               │                                         │
│              ┌────────────────┴────────────────┐                       │
│              │                                 │                        │
│         Cache HIT                         Cache MISS                   │
│              │                                 │                        │
│              ▼                                 ▼                        │
│   ┌──────────────────┐           ┌──────────────────────────────┐     │
│   │  Return cached   │           │    PRIMARY: OpenAI TTS        │     │
│   │  audio buffer    │           │                               │     │
│   └──────────────────┘           │  Voices: alloy, echo, fable,  │     │
│                                  │          onyx, nova, shimmer  │     │
│                                  │                               │     │
│                                  │  Rate Limit: 3 RPM            │     │
│                                  │  Min Interval: 1.5 seconds    │     │
│                                  └───────────────┬───────────────┘     │
│                                                  │                      │
│                                    ┌─────────────┴─────────────┐       │
│                                    │                           │        │
│                                Success                    Rate Limited  │
│                                    │                     (429 Error)    │
│                                    ▼                           │        │
│                          ┌──────────────────┐                  │        │
│                          │  Cache & Play    │                  │        │
│                          │  Audio           │                  ▼        │
│                          └──────────────────┘     ┌─────────────────┐  │
│                                                   │ FALLBACK:       │  │
│                                                   │ Browser TTS     │  │
│                                                   │                 │  │
│                                                   │ Web Speech API  │  │
│                                                   │ SpeechSynthesis │  │
│                                                   │ Utterance       │  │
│                                                   └─────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Implementation:** `client/src/hooks/useTTS.ts`

### 5. Letta AI Agent Framework

Core agent management architecture:

```typescript
// Agent lifecycle management
createAgent(params)      // Creates agent with memory blocks and tools
sendMessage(agentId, content)  // Send user message, returns LLM response
updateAgent(agentId, params)   // Modify agent configuration
deleteAgent(agentId)     // Remove agent
listAgents()             // Enumerate all agents

// Memory Block System
- Global blocks (shared across agents)
- Agent-scoped memory blocks with custom labels and limits
- Supports persona, human context, research findings, etc.

// Tool Integration
- Tool attachment/detachment to agents
- Tool execution via Letta's function calling system
- Default tools: web_search, save_research, etc.
```

**Default Agent Configuration:**

```typescript
Model: openai/gpt-4o-mini
Embedding: openai/text-embedding-3-small
Tools: web_search, save_research
Memory Blocks:
  - persona: "I am a friendly AI assistant..."
  - human: "Name: {userName}"
```

---

## Data Flow Diagrams

### News Alert Creation → Map Display

```
┌───────────────────────────────────────────────────────────────────────────┐
│                    NEWS ALERT → MAP VISUALIZATION                          │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   User                                                                     │
│     │                                                                      │
│     │ Create Alert: "robberies in SF"                                      │
│     ▼                                                                      │
│   ┌──────────────┐    POST /alerts     ┌──────────────────────────────┐  │
│   │   Frontend   │ ──────────────────► │         Backend              │  │
│   │              │                     │                              │  │
│   │ CreateAlert  │                     │  1. Create NewsAlert record  │  │
│   │ Dialog       │                     │  2. Queue BullMQ job         │  │
│   └──────────────┘                     └──────────────┬───────────────┘  │
│                                                       │                   │
│   Polling (3s interval)                               ▼                   │
│        │                              ┌───────────────────────────────┐  │
│        │                              │    BACKGROUND JOB PROCESSOR   │  │
│        ▼                              │                               │  │
│   ┌──────────────┐                    │  1. Search news APIs          │  │
│   │  Status:     │                    │  2. Fetch article content     │  │
│   │  PROCESSING  │                    │  3. AI extracts locations     │  │
│   │              │                    │  4. Geocode to coordinates    │  │
│   └──────────────┘                    │  5. Store in PostgreSQL       │  │
│                                       │  6. Update status: COMPLETED  │  │
│   Polling detects COMPLETED           └───────────────────────────────┘  │
│        │                                                                  │
│        ▼                                                                  │
│   ┌──────────────┐    GET /alerts/locations    ┌─────────────────────┐  │
│   │   Frontend   │ ──────────────────────────► │      Backend        │  │
│   │              │ ◄────────────────────────── │                     │  │
│   │              │       GeoJSON Response      │  Query articles     │  │
│   │              │                             │  + locations        │  │
│   └──────┬───────┘                             └─────────────────────┘  │
│          │                                                               │
│          ▼                                                               │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │                        MAPLIBRE GL                                │  │
│   │                                                                   │  │
│   │   GeoJSON FeatureCollection rendered as map pins                  │  │
│   │                                                                   │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

### Chat with Articles Flow

```
1. User selects alert → selectAlert(alertId)

2. Frontend loads articles via getAlert(alertId)
   → Shows articles in ArticlePanel

3. User types question in chat
   → chatWithArticles(alertId, message)

4. Backend creates/retrieves chat agent for alert
   → Agent has article context in memory
   → Sends message to Letta

5. Letta agent responds with thinking + response
   → Returns to frontend

6. Frontend displays response in chat
   → User can continue conversation
```

---

## Database Schema

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           POSTGRESQL SCHEMA                                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────┐         ┌──────────────────┐         ┌────────────────┐ │
│   │    User     │         │    NewsAlert     │         │  NewsWorkflow  │ │
│   ├─────────────┤         ├──────────────────┤         ├────────────────┤ │
│   │ id          │◄────────│ userId           │         │ id             │ │
│   │ email       │    1:N  │ id               │◄────────│ alertId        │ │
│   │ password    │         │ name             │    1:N  │ status         │ │
│   │ name        │         │ query            │         │ startedAt      │ │
│   │ createdAt   │         │ region           │         │ completedAt    │ │
│   └─────────────┘         │ frequency        │         │ error          │ │
│         │                 │ scheduleTime     │         └────────────────┘ │
│         │                 │ status           │                             │
│         │                 │ lastRunAt        │                             │
│         │                 │ lettaAgentId     │                             │
│         │                 └────────┬─────────┘                             │
│         │                          │                                        │
│         │                          │ 1:N                                    │
│         │                          ▼                                        │
│         │                 ┌──────────────────┐         ┌────────────────┐ │
│         │                 │   NewsArticle    │         │ArticleLocation │ │
│         │                 ├──────────────────┤         ├────────────────┤ │
│         │                 │ id               │◄────────│ articleId      │ │
│         │                 │ alertId          │    1:N  │ id             │ │
│         │                 │ externalId       │         │ name           │ │
│         │                 │ title            │         │ type           │ │
│         │                 │ source           │         │ latitude       │ │
│         │                 │ url              │         │ longitude      │ │
│         │                 │ publishedAt      │         │ geocodedAddr   │ │
│         │                 │ content          │         │ confidence     │ │
│         │                 │ summary          │         └────────────────┘ │
│         │                 │ sentiment        │                             │
│         │                 │ keyPoints        │                             │
│         │                 └──────────────────┘                             │
│         │                                                                   │
│         │                 ┌──────────────────┐                             │
│         │ 1:N             │     Agent        │                             │
│         └────────────────►├──────────────────┤                             │
│                           │ id               │                             │
│                           │ userId           │                             │
│                           │ lettaAgentId     │                             │
│                           │ name             │                             │
│                           │ description      │                             │
│                           └──────────────────┘                             │
│                                                                             │
│   Location Types:  ADDRESS | CROSS_STREET | BUSINESS | PARK | LANDMARK     │
│                    CITY | OTHER                                             │
│                                                                             │
│   Alert Frequency: DAILY | WEEKLY | BIWEEKLY | MONTHLY | MANUAL            │
│                                                                             │
│   Workflow Status: PENDING | SEARCHING | PROCESSING | COMPLETED | FAILED   │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Self-Improvement Loop (Weave)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    WEAVE OBSERVABILITY & IMPROVEMENT                        │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                     RUNTIME TRACING                                  │  │
│   │                                                                      │  │
│   │   User Message                                                       │  │
│   │        │                                                             │  │
│   │        ▼                                                             │  │
│   │   ┌───────────────────────────────────────────────────────────┐     │  │
│   │   │  @weave.trace()                                           │     │  │
│   │   │                                                           │     │  │
│   │   │  sendMessageWithTrace(agentId, content)                   │     │  │
│   │   │    │                                                      │     │  │
│   │   │    ├── Agent ID                                           │     │  │
│   │   │    ├── Input message                                      │     │  │
│   │   │    ├── Response content                                   │     │  │
│   │   │    ├── Token usage                                        │     │  │
│   │   │    ├── Latency                                            │     │  │
│   │   │    └── Tool calls                                         │     │  │
│   │   │                                                           │     │  │
│   │   └────────────────────────────┬──────────────────────────────┘     │  │
│   │                                │                                     │  │
│   │                                ▼                                     │  │
│   │                     ┌──────────────────────┐                        │  │
│   │                     │   W&B Weave Cloud    │                        │  │
│   │                     │                      │                        │  │
│   │                     │   Dashboards         │                        │  │
│   │                     │   Metrics            │                        │  │
│   │                     │   Trace Viewer       │                        │  │
│   │                     └──────────────────────┘                        │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                  AUTOMATED IMPROVEMENT (weave-eval/)                 │  │
│   │                                                                      │  │
│   │   ┌──────────────┐    ┌──────────────┐    ┌────────────────────┐   │  │
│   │   │   scorers.py │───►│  Analysis    │───►│ improvement_agent  │   │  │
│   │   │              │    │              │    │        .py         │   │  │
│   │   │ • Relevance  │    │ • Find low   │    │                    │   │  │
│   │   │ • Accuracy   │    │   scores     │    │ • Generate fixes   │   │  │
│   │   │ • Helpfulness│    │ • Patterns   │    │ • Create PR        │   │  │
│   │   └──────────────┘    └──────────────┘    └────────────────────┘   │  │
│   │                                                   │                 │  │
│   │                                                   ▼                 │  │
│   │                                          ┌─────────────────┐       │  │
│   │                                          │  GitHub PR      │       │  │
│   │                                          │                 │       │  │
│   │                                          │ "Improve agent  │       │  │
│   │                                          │  persona for    │       │  │
│   │                                          │  location       │       │  │
│   │                                          │  queries"       │       │  │
│   │                                          └─────────────────┘       │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19 | App framework |
| **UI** | TailwindCSS, Radix UI | Styling & components |
| **Maps** | MapLibre GL, react-map-gl | Geospatial visualization |
| **Backend** | NestJS 11 | API server |
| **Database** | PostgreSQL + Prisma | Data persistence |
| **Queue** | BullMQ + Redis | Background jobs |
| **Auth** | JWT + Passport | Authentication |
| **AI Agents** | Letta AI | LLM agent framework |
| **LLM** | OpenAI GPT-4o-mini | Language model |
| **Voice** | Pipecat + Daily.co | Real-time voice chat |
| **TTS** | OpenAI TTS + Web Speech | Text-to-speech |
| **STT** | Web Speech API | Speech-to-text |
| **Observability** | W&B Weave, Sentry | Tracing & errors |
| **Package Manager** | pnpm | Monorepo management |

### API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/agents` | GET/POST | List/create agents |
| `/api/agents/{id}` | GET/PATCH/DELETE | Manage agent |
| `/api/agents/{id}/messages` | GET/POST | Agent messaging |
| `/api/workflow/agents` | GET | Get/create workflow agents |
| `/api/workflow/send-message` | POST | Send to workflow agent |
| `/api/workflow/map-state` | GET | Get map visualization |
| `/api/alerts` | GET/POST | List/create alerts |
| `/api/alerts/{id}` | GET/PATCH/DELETE | Manage alert |
| `/api/alerts/{id}/chat` | POST | Chat with alert articles |
| `/api/alerts/pipecat/connect` | POST | Initialize Pipecat session |
| `/api/alerts/locations` | GET | Get GeoJSON locations |
| `/api/auth/register` | POST | Register user |
| `/api/auth/login` | POST | Login (JWT cookie) |
| `/api/auth/profile` | GET | Get user profile |

---

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

2. Copy the env template and set your values (the app reads from `server-nest/.env`):

   ```bash
   cp server-nest/.env.example server-nest/.env
   # Edit server-nest/.env: set LETTA_API_KEY, REDIS_URL, DATABASE_URL, JWT_SECRET (and optional keys)
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
- `server-nest/.env` – Backend and its scripts read from here. Copy from `server-nest/.env.example`.

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
| GITHUB_TOKEN / GITHUB_PERSONAL_ACCESS_TOKEN | No | Used by GitHub MCP (`.cursor/mcp.json`) and improvement PR agent for creating PRs; set in env so Cursor agent can submit improvement PRs via MCP |

## Security

- NestJS **ValidationPipe** (whitelist, forbidNonWhitelisted) on all DTOs; CORS restricted to known origins (e.g. localhost:3000).
- Secrets (LETTA_API_KEY, REDIS_URL) stay on the backend; frontend only talks to the API (e.g. `NEXT_PUBLIC_API_URL` in production).
- Research and workflow endpoints validate input; map tool args are validated (allowlist layer types, bounds-check center/zoom).

## Tracing (Weave)

When `WANDB_API_KEY` is set, the NestJS backend initializes W&B Weave and traces `sendMessage` and `updateBlock` calls for latency and observability. If the Weave SDK fails to initialize (e.g. missing netrc), tracing is disabled and the app continues without it.

## Self-improvement demo

To show the self-improvement loop in a demo:

1. Set `WANDB_API_KEY` and `WANDB_ENTITY` in `server-nest/.env` (same as above).
2. Start the app, load agents, and send a few research + map messages.
3. From the repo root: `cd weave-eval && pip install -r requirements.txt`, then `python demo_mode.py`.
4. The script scores recent traces and prints one summary (low-scoring Research/Map counts and suggested persona edits). Update personas, redeploy, and run again to show improvement.

See [weave-eval/README.md](weave-eval/README.md) for the full eval pipeline and [docs/WEAVE_SELF_IMPROVEMENT.md](docs/WEAVE_SELF_IMPROVEMENT.md) for the design.

## Logging

The NestJS backend uses Nest's built-in logger; request lifecycle and errors are logged to the console (or your configured logger).

## Accessibility

- Map: focus the map container then use **arrow keys** to pan and **+ / −** to zoom; actions are announced in the live region. A short hint is shown above the map.
- Chat: labeled input, aria-describedby hint, and status/alert regions for errors and map updates.

## Voice

The app includes a **Voice** section (client) using the **Web Speech API**: mic for speech-to-text, and text-to-speech for typed or pasted text. No backend or Pipecat required. See **[voice/README.md](voice/README.md)** for details and for the optional Pipecat STT/TTS scaffold (server-side, higher quality).
