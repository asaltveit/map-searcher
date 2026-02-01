import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AgentsService } from "./agents.service";
import { Request } from "express";

// Extend Request to include userId from middleware
interface RequestWithUser extends Request {
  userId: string;
}

@ApiTags("Agents")
@Controller("api/agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @ApiOperation({ summary: "Get or create agents for current user" })
  async getAgents(@Req() req: RequestWithUser) {
    const userId = req.userId || "default";
    return this.agentsService.getOrCreateAgents(userId);
  }

  @Post(":id/messages")
  @ApiOperation({ summary: "Send a message to an agent" })
  async sendMessage(
    @Param("id") agentId: string,
    @Body() body: any,
    @Req() req: RequestWithUser,
  ) {
    // Validate agentId
    if (!this.isValidId(agentId)) {
      throw new BadRequestException("Invalid agent ID");
    }

    // Validate user is authenticated
    if (!req.userId) {
      throw new UnauthorizedException("User not authenticated");
    }

    return this.agentsService.sendMessage(agentId, body);
  }

  private isValidId(id: string): boolean {
    return typeof id === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(id);
  }
}
