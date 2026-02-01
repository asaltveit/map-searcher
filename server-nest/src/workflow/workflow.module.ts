import { Module } from "@nestjs/common";
import { WorkflowController } from "./workflow.controller";
import { WorkflowService } from "./workflow.service";
import { LettaModule } from "../letta/letta.module";

@Module({
  imports: [LettaModule],
  controllers: [WorkflowController],
  providers: [WorkflowService],
})
export class WorkflowModule {}
