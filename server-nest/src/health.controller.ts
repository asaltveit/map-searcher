import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Health")
@Controller("api")
export class HealthController {
  @Get("health")
  @ApiOperation({ summary: "Health check" })
  check() {
    return { status: "ok" };
  }
}
