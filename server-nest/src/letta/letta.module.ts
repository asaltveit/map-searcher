import { Module } from "@nestjs/common";
import { LettaService } from "./letta.service";

@Module({
  providers: [LettaService],
  exports: [LettaService],
})
export class LettaModule {}
