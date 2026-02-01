import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("General")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: "Get welcome message",
    description:
      "Returns a simple welcome message to verify the API is running",
  })
  @ApiResponse({
    status: 200,
    description: "Welcome message",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Hello World!" },
      },
    },
  })
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }
}

// Test: Postman workspace automation with GitHub Actions
// This change triggers the sync workflow to validate:
// 1. OpenAPI spec generation
// 2. Collection sync with JWT script preservation
// 3. Postman API push to workspace via GitHub Secrets
