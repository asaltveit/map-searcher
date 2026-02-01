import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { TracingService } from "./tracing/tracing.service";

@ApiTags("Health")
@Controller("api")
export class HealthController {
  constructor(private readonly tracingService: TracingService) {}

  @Get("health")
  @ApiOperation({ summary: "Health check" })
  check() {
    return { status: "ok" };
  }

  @Get("health/tracing")
  @ApiOperation({ summary: "Check if Weave tracing is enabled (WANDB_API_KEY set)" })
  tracing() {
    const enabled = this.tracingService.isTracingEnabled();
    const entity = process.env.WANDB_ENTITY?.trim();
    const project = entity ? `${entity}/map-searcher` : "map-searcher";
    return {
      tracingEnabled: enabled,
      message: enabled
        ? `WANDB_API_KEY is set; traces will be sent to ${project} on wandb.ai`
        : "Set WANDB_API_KEY in .env to enable Weave tracing",
      hint: enabled && !entity
        ? "If you see 'Default entity name not found', set WANDB_ENTITY to your wandb.ai username in server-nest/.env"
        : undefined,
    };
  }
}
