import { Module } from "@nestjs/common";
import { WorkflowController } from "./workflow.controller";
import { WorkflowService } from "./workflow.service";
import { LettaModule } from "../letta/letta.module";
import { TracingModule } from "../tracing/tracing.module";

@Module({
  imports: [LettaModule, TracingModule],
  controllers: [WorkflowController],
  providers: [WorkflowService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
