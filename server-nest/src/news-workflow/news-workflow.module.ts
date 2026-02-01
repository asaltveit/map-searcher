import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { NewsWorkflowController } from "./news-workflow.controller";
import {
  NewsWorkflowService,
  NEWS_WORKFLOW_QUEUE,
} from "./news-workflow.service";
import { GeocodingService } from "./services/geocoding.service";
import { WorkflowProcessor } from "./services/workflow-processor";
import { WorkflowTracingService } from "./services/workflow-tracing.service";
import { LettaModule } from "../letta/letta.module";
import { PrismaService } from "../prisma.service";

@Module({
  imports: [
    LettaModule,
    BullModule.registerQueue({
      name: NEWS_WORKFLOW_QUEUE,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
      },
    }),
    // Register queue with Bull Board dashboard
    BullBoardModule.forFeature({
      name: NEWS_WORKFLOW_QUEUE,
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [NewsWorkflowController],
  providers: [
    PrismaService,
    NewsWorkflowService,
    GeocodingService,
    WorkflowProcessor,
    WorkflowTracingService,
  ],
  exports: [NewsWorkflowService],
})
export class NewsWorkflowModule {}
