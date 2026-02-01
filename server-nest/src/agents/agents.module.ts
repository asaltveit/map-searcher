import { Module } from "@nestjs/common";
import { AgentsController } from "./agents.controller";
import { AgentsService } from "./agents.service";
import { LettaModule } from "../letta/letta.module";
import { PrismaService } from "../prisma.service";

@Module({
  imports: [LettaModule],
  controllers: [AgentsController],
  providers: [AgentsService, PrismaService],
  exports: [AgentsService],
})
export class AgentsModule {}
