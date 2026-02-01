import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { AlertsController } from "./alerts.controller";
import { AlertsService, ALERTS_QUEUE } from "./alerts.service";
import { AlertProcessor } from "./alert-processor";
import { LettaModule } from "../letta/letta.module";
import { PrismaService } from "../prisma.service";
import { GeocodingService } from "../news-workflow/services/geocoding.service";

@Module({
  imports: [
    LettaModule,
    BullModule.registerQueue({
      name: ALERTS_QUEUE,
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
    BullBoardModule.forFeature({
      name: ALERTS_QUEUE,
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [AlertsController],
  providers: [
    PrismaService,
    AlertsService,
    AlertProcessor,
    GeocodingService,
  ],
  exports: [AlertsService],
})
export class AlertsModule {}
