# Map Searcher API

NestJS 11 backend API for the map-searcher application.

## Tech Stack

- **Framework**: NestJS 11 with Express
- **Database**: PostgreSQL with Prisma 7
- **Job Queue**: BullMQ with Redis
- **Auth**: JWT with Passport (httpOnly cookies)
- **AI**: Letta agents integration
- **Monitoring**: Sentry error tracking + Weave tracing
- **Validation**: class-validator + class-transformer

## Essential Commands

```bash
pnpm dev              # Start with Docker services (Redis, Postgres)
pnpm test             # Run tests
pnpm typecheck        # TypeScript type checking
pnpm lint             # Lint and fix
pnpm prisma:migrate   # Run database migrations
pnpm prisma:generate  # Regenerate Prisma client
pnpm studio           # Open Prisma Studio
pnpm services:up      # Start Docker containers
pnpm services:down    # Stop Docker containers
```

## Project Structure

```
src/
├── agents/       # AI agent endpoints (Letta integration)
├── auth/         # JWT authentication (login, register, guards)
├── research/     # Research saving and retrieval
├── workflow/     # Workflow blocks management
├── users/        # User management
├── letta/        # Letta AI service wrapper
├── tracing/      # Weave observability service
├── monitoring/   # Health checks and metrics
├── common/       # Shared middleware and types
└── config/       # Redis and other configuration
```

## Code Patterns

### DTOs and Validation
- Use `class-validator` decorators for all DTOs
- DTOs live in `dto/` subdirectories within each module

### Database Operations
- Use Prisma transactions for multi-step operations
- Access Prisma via injected `PrismaService`

### Authentication
- JWT tokens stored in httpOnly cookies
- Use `@UseGuards(JwtAuthGuard)` for protected routes
- Access user via `@Req() req: AuthenticatedRequest`

### Async Jobs
- Use BullMQ for background job processing
- Redis connection configured in `src/config/redis.config.ts`

### Error Handling
- Sentry captures unhandled exceptions via `SentryFilter`
- Use NestJS built-in exception classes

## Commit Conventions

```
feat(scope): add new feature
fix(scope): fix bug
chore(scope): maintenance task
refactor(scope): code refactoring
```

**Scopes**: `api`, `auth`, `agents`, `workflow`, `research`, `users`, `letta`, `tracing`
