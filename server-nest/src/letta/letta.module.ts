import { Module } from "@nestjs/common";
import { LettaService } from "./letta.service";
import { TracingModule } from "../tracing/tracing.module";

@Module({
  imports: [TracingModule],
  providers: [LettaService],
  exports: [LettaService],
})
export class LettaModule {}
