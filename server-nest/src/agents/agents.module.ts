import { Module } from "@nestjs/common";
import { AgentsController } from "./agents.controller";
import { AgentsService } from "./agents.service";
import { AgentTracingService } from "./agent-tracing.service";
import { LettaModule } from "../letta/letta.module";
import { TracingModule } from "../tracing/tracing.module";
import { PrismaService } from "../prisma.service";

@Module({
  imports: [LettaModule, TracingModule],
  controllers: [AgentsController],
  providers: [AgentsService, AgentTracingService, PrismaService],
  exports: [AgentsService],
})
export class AgentsModule {}
