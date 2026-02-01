import { Module } from "@nestjs/common";
import { AgentsController } from "./agents.controller";
import { AgentsService } from "./agents.service";
import { LettaModule } from "../letta/letta.module";

@Module({
  imports: [LettaModule],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
