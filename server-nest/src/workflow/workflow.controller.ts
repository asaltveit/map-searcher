import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  BadRequestException,
} from "@nestjs/common";
import * as Express from "express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { WorkflowService, WorkflowAgents } from "./workflow.service";


export class WorkflowAgentsDto implements WorkflowAgents {
  researchAgentId!: string;
  mapAgentId!: string;
  researchBlockId!: string;
}

export class UpdateBlockDto {
  researchBlockId!: string;
  value!: string;
}

export class SendMessageDto {
  agentId!: string;
  content!: string;
}

@ApiTags("Workflow")
@Controller("api/workflow")
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get("agents")
  @ApiOperation({
    summary: "Get or create workflow agents (research + map + shared block)",
  })
  @ApiResponse({
    status: 200,
    description: "Workflow agent IDs",
    type: WorkflowAgentsDto,
  })
  async getAgents(@Req() req: Express.Request): Promise<WorkflowAgents> {
    const userId = (req as Express.Request & { userId?: string }).userId ?? "default";
    return this.workflowService.getOrCreateAgents(userId);
  }

  @Post("update-block")
  @ApiOperation({ summary: "Update the shared research block" })
  @ApiResponse({ status: 200, description: "Block updated" })
  async updateBlock(
    @Req() _req: Express.Request,
    @Body() dto: UpdateBlockDto,
  ): Promise<{ ok: boolean }> {
    const { researchBlockId, value } = dto;
    if (!researchBlockId || value == null) {
      throw new BadRequestException("researchBlockId and value required");
    }
    await this.workflowService.updateBlock(researchBlockId, value);
    return { ok: true };
  }

  @Post("send-message")
  @ApiOperation({ summary: "Send a message to a workflow agent" })
  @ApiResponse({ status: 201, description: "Agent response" })
  async sendMessage(
    @Req() req: Express.Request,
    @Body() dto: SendMessageDto,
  ): Promise<unknown> {
    const userId = (req as Express.Request & { userId?: string }).userId ?? "default";
    const { agentId, content } = dto;
    if (!agentId || typeof content !== "string") {
      throw new BadRequestException("agentId and content required");
    }
    const trimmed = content.trim();
    if (!trimmed) {
      throw new BadRequestException("content must be non-empty");
    }
    return this.workflowService.sendMessage(userId, agentId, trimmed);
  }
}
