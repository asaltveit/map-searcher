import { NestFactory, Reflector, HttpAdapterHost } from "@nestjs/core";
import {
  ValidationPipe,
  ClassSerializerInterceptor,
  ExceptionFilter,
} from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { SentryFilter } from "./sentry.filter";
import * as Sentry from "@sentry/nestjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import cookieParser from "cookie-parser";
import basicAuth from "express-basic-auth";

// Log unhandled rejections with a clear message (e.g. when a library rejects with a fetch Response)
process.on("unhandledRejection", (reason: unknown) => {
  const r = reason as { ok?: boolean; status?: number; statusText?: string };
  if (typeof r?.ok === "boolean" && typeof r?.status === "number") {
    console.error(
      `UnhandledPromiseRejection: API response ${r.status} ${r.statusText ?? ""}`.trim(),
    );
    return;
  }
  console.error("UnhandledPromiseRejection:", reason);
});

// Initialize Sentry BEFORE anything else
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    // Profiling
    profilesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  });
  console.log("✅ Sentry initialized");
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser middleware (for HTTP-only cookie authentication)
  app.use(cookieParser());

  // Bull-Board Basic Auth Protection (when enabled)
  // Protects /queues dashboard from public access
  if (process.env.ENABLE_BULL_BOARD !== "false") {
    const bullBoardUser = process.env.BULL_BOARD_USER;
    const bullBoardPass = process.env.BULL_BOARD_PASS;

    if (bullBoardUser && bullBoardPass) {
      app.use(
        "/queues",
        basicAuth({
          users: { [bullBoardUser]: bullBoardPass },
          challenge: true,
          realm: "Bull-Board Dashboard",
        }),
      );
      console.log("🔒 Bull-Board protected with Basic Auth");
    } else {
      console.warn(
        "⚠️  Bull-Board enabled but BULL_BOARD_USER/BULL_BOARD_PASS not set - dashboard is UNPROTECTED",
      );
    }
  }

  // CORS configuration with credentials support (for cookie-based auth)
  const allowedOrigins = [
    "http://localhost:3000", // Local frontend development
    "http://localhost:3001", // Alternative local port
    "http://localhost:5173", // Vite dev server
  ];

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Allow requests with no origin (same-origin, Postman, curl, etc.)
      if (!origin) return callback(null, true);

      // Check static allowed origins
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Reject unknown origins
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true, // Required for HTTP-only cookies
  });

  // Global exception filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  const filters: ExceptionFilter[] = [];
  if (process.env.SENTRY_DSN) {
    filters.push(new SentryFilter(httpAdapter)); // Capture errors in Sentry
  }
  if (filters.length > 0) {
    app.useGlobalFilters(...filters);
  }

  // Global validation pipe for security
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTOs (prevent mass assignment)
      forbidNonWhitelisted: true, // Reject requests with unknown properties
      transform: true, // Auto-transform payloads to DTO class instances
      transformOptions: {
        enableImplicitConversion: true, // Convert string "123" to number 123
      },
    }),
  );

  // Global serialization interceptor for response transformation
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // OpenAPI / Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Map-Searcher API")
    .setDescription("Map-Searcher backend API")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "access-token",
    )
    .addServer("http://localhost:3000", "Local development")
    .addTag("Health", "Health check endpoints")
    .addTag("Auth", "Authentication endpoints")
    .addTag("Agents", "Letta agent endpoints")
    .addTag("Research", "Research storage endpoints")
    .addTag("Workflow", "Workflow endpoints")
    .addTag("Alerts", "News alerts endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server running on port ${process.env.PORT ?? 3000}`);
  if (process.env.WANDB_API_KEY) {
    console.log("✅ Weave tracing: enabled (WANDB_API_KEY set); traces → wandb.ai project 'map-searcher'");
  } else {
    console.log("⚠️  Weave tracing: disabled (set WANDB_API_KEY in .env to enable)");
  }
}
void bootstrap();
