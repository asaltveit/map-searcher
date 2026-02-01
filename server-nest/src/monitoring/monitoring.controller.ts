import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { isRedisConfigured } from "../config/redis.config";

@ApiTags("Monitoring")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("api/monitoring")
export class MonitoringController {
  @Get("health")
  @ApiOperation({
    summary: "Get system health status",
    description: "Returns health status including Redis availability",
  })
  @ApiResponse({
    status: 200,
    description: "System health status",
  })
  getHealth() {
    return {
      status: "healthy",
      redis: {
        configured: isRedisConfigured(),
      },
      timestamp: new Date().toISOString(),
    };
  }
}
