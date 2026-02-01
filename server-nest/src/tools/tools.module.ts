import { Module } from "@nestjs/common";
import { ToolsController } from "./tools.controller";
import { ToolsService } from "./tools.service";
import { LettaModule } from "../letta/letta.module";

@Module({
  imports: [LettaModule],
  controllers: [ToolsController],
  providers: [ToolsService],
  exports: [ToolsService],
})
export class ToolsModule {}
