import { Module } from "@nestjs/common";
import { ImprovementsController } from "./improvements.controller";
import { ImprovementsService } from "./improvements.service";
import { ImprovementsCronService } from "./improvements-cron.service";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [ImprovementsController],
  providers: [ImprovementsService, ImprovementsCronService, PrismaService],
  exports: [ImprovementsService],
})
export class ImprovementsModule {}
