import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthController } from "./health.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MonitoringModule } from "./monitoring/monitoring.module";
import { TracingModule } from "./tracing/tracing.module";
import { LettaModule } from "./letta/letta.module";
import { AgentsModule } from "./agents/agents.module";
import { ResearchModule } from "./research/research.module";
import { ToolsModule } from "./tools/tools.module";
import { ModelsModule } from "./models/models.module";
import { WorkflowModule } from "./workflow/workflow.module";
import { UserResolverMiddleware } from "./common/middleware/user-resolver.middleware";
import { getRedisConfig, isRedisConfigured } from "./config/redis.config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Configure BullMQ with Redis connection (Upstash)
    BullModule.forRootAsync({
      useFactory: () => {
        if (!isRedisConfigured()) {
          console.warn(
            "⚠️  Redis credentials not configured - BullMQ queues will not be available",
          );
          return {
            connection: {
              host: "localhost",
              port: 6379,
              lazyConnect: true,
              maxRetriesPerRequest: null,
            },
          };
        }

        const config = getRedisConfig();
        console.log(
          `📡 Redis config: ${config.host}:${config.port} (TLS: ${config.tls})`,
        );

        return {
          connection: {
            host: config.host,
            port: config.port,
            password: config.password,
            connectTimeout: 10000,
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
            lazyConnect: false,
            ...(config.tls && {
              tls: {},
            }),
          },
        };
      },
    }),

    // Bull-Board Dashboard
    ...(process.env.ENABLE_BULL_BOARD !== "false"
      ? [
          BullBoardModule.forRoot({
            route: "/queues",
            adapter: ExpressAdapter,
          }),
        ]
      : []),

    // Core modules
    TracingModule,
    AuthModule,
    UsersModule,
    MonitoringModule,

    // Map-searcher specific modules
    LettaModule,
    AgentsModule,
    ResearchModule,
    ToolsModule,
    ModelsModule,
    WorkflowModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply UserResolver middleware to all API routes
    consumer.apply(UserResolverMiddleware).forRoutes("api/*");
  }
}
