import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { JwtRequest } from "../common/types";
import { AgentsService } from "./agents.service";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { UpdateAgentDto } from "./dto/update-agent.dto";
import {
  SendMessageDto,
  ListMessagesQueryDto,
  ResetMessagesDto,
} from "./dto/send-message.dto";
import { UpdateBlockDto, MemoryBlockResponseDto } from "./dto/memory-block.dto";
import {
  AgentResponseDto,
  AgentListItemDto,
  MessageResponseDto,
  MessageHistoryResponseDto,
  ToolSummaryDto,
} from "./dto/agent-response.dto";

@ApiTags("Agents")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("api/agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  // ==================== Agent Management ====================

  @Post()
  @ApiOperation({ summary: "Create a new agent" })
  @ApiBody({ type: CreateAgentDto })
  @ApiResponse({
    status: 201,
    description: "Agent created",
    type: AgentResponseDto,
  })
  async createAgent(@Req() req: JwtRequest, @Body() dto: CreateAgentDto) {
    return this.agentsService.createAgent(req.user.userId, {
      name: dto.name,
      description: dto.description,
      model: dto.model,
      embedding: dto.embedding,
      system: dto.system,
      memoryBlocks: dto.memoryBlocks,
      tools: dto.tools,
      temperature: dto.temperature,
      tags: dto.tags,
    });
  }

  @Get()
  @ApiOperation({ summary: "List all agents for the authenticated user" })
  @ApiResponse({
    status: 200,
    description: "List of agents",
    type: [AgentListItemDto],
  })
  async listAgents(@Req() req: JwtRequest) {
    return this.agentsService.listAgents(req.user.userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single agent by ID" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiResponse({
    status: 200,
    description: "Agent details",
    type: AgentResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async getAgent(@Req() req: JwtRequest, @Param("id") agentId: string) {
    this.validateAgentId(agentId);
    return this.agentsService.getAgent(req.user.userId, agentId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiBody({ type: UpdateAgentDto })
  @ApiResponse({
    status: 200,
    description: "Agent updated",
    type: AgentResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async updateAgent(
    @Req() req: JwtRequest,
    @Param("id") agentId: string,
    @Body() dto: UpdateAgentDto,
  ) {
    this.validateAgentId(agentId);
    return this.agentsService.updateAgent(req.user.userId, agentId, {
      name: dto.name,
      description: dto.description,
      model: dto.model,
      system: dto.system,
      temperature: dto.temperature,
      tags: dto.tags,
    });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiResponse({ status: 204, description: "Agent deleted" })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async deleteAgent(@Req() req: JwtRequest, @Param("id") agentId: string) {
    this.validateAgentId(agentId);
    await this.agentsService.deleteAgent(req.user.userId, agentId);
  }

  // ==================== Messages ====================

  @Post(":id/messages")
  @ApiOperation({ summary: "Send a message to an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiBody({ type: SendMessageDto })
  @ApiResponse({
    status: 201,
    description: "Message response",
    type: MessageResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async sendMessage(
    @Req() req: JwtRequest,
    @Param("id") agentId: string,
    @Body() dto: SendMessageDto,
  ) {
    this.validateAgentId(agentId);
    return this.agentsService.sendMessage(req.user.userId, agentId, {
      content: dto.content,
      maxSteps: dto.maxSteps,
    });
  }

  @Get(":id/messages")
  @ApiOperation({ summary: "Get conversation history for an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiResponse({
    status: 200,
    description: "Message history",
    type: MessageHistoryResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async listMessages(
    @Req() req: JwtRequest,
    @Param("id") agentId: string,
    @Query() query: ListMessagesQueryDto,
  ) {
    this.validateAgentId(agentId);
    return this.agentsService.listMessages(req.user.userId, agentId, {
      limit: query.limit,
      before: query.before,
      after: query.after,
      order: query.order,
    });
  }

  @Post(":id/messages/reset")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset conversation history for an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiBody({ type: ResetMessagesDto })
  @ApiResponse({
    status: 200,
    description: "Messages reset",
    type: AgentResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async resetMessages(
    @Req() req: JwtRequest,
    @Param("id") agentId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _dto: ResetMessagesDto,
  ) {
    this.validateAgentId(agentId);
    return this.agentsService.resetMessages(req.user.userId, agentId);
  }

  // ==================== Memory Blocks ====================

  @Get(":id/blocks")
  @ApiOperation({ summary: "List memory blocks for an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiResponse({
    status: 200,
    description: "List of memory blocks",
    type: [MemoryBlockResponseDto],
  })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async listBlocks(@Req() req: JwtRequest, @Param("id") agentId: string) {
    this.validateAgentId(agentId);
    return this.agentsService.listBlocks(req.user.userId, agentId);
  }

  @Get(":id/blocks/:label")
  @ApiOperation({ summary: "Get a specific memory block by label" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiParam({
    name: "label",
    description: "Block label (e.g., 'persona', 'human')",
  })
  @ApiResponse({
    status: 200,
    description: "Memory block",
    type: MemoryBlockResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent or block not found" })
  async getBlock(
    @Req() req: JwtRequest,
    @Param("id") agentId: string,
    @Param("label") label: string,
  ) {
    this.validateAgentId(agentId);
    return this.agentsService.getBlock(req.user.userId, agentId, label);
  }

  @Patch(":id/blocks/:label")
  @ApiOperation({ summary: "Update a memory block" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiParam({
    name: "label",
    description: "Block label (e.g., 'persona', 'human')",
  })
  @ApiBody({ type: UpdateBlockDto })
  @ApiResponse({
    status: 200,
    description: "Memory block updated",
    type: MemoryBlockResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent or block not found" })
  async updateBlock(
    @Req() req: JwtRequest,
    @Param("id") agentId: string,
    @Param("label") label: string,
    @Body() dto: UpdateBlockDto,
  ) {
    this.validateAgentId(agentId);
    return this.agentsService.updateBlock(req.user.userId, agentId, label, {
      value: dto.value,
      description: dto.description,
      limit: dto.limit,
    });
  }

  // ==================== Agent Tools ====================

  @Get(":id/tools")
  @ApiOperation({ summary: "List tools attached to an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiResponse({
    status: 200,
    description: "List of tools",
    type: [ToolSummaryDto],
  })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async listAgentTools(@Req() req: JwtRequest, @Param("id") agentId: string) {
    this.validateAgentId(agentId);
    return this.agentsService.listAgentTools(req.user.userId, agentId);
  }

  @Post(":id/tools/:toolId/attach")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Attach a tool to an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiParam({ name: "toolId", description: "Tool ID to attach" })
  @ApiResponse({
    status: 200,
    description: "Tool attached",
    type: AgentResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent or tool not found" })
  async attachTool(
    @Req() req: JwtRequest,
    @Param("id") agentId: string,
    @Param("toolId") toolId: string,
  ) {
    this.validateAgentId(agentId);
    return this.agentsService.attachTool(req.user.userId, agentId, toolId);
  }

  @Delete(":id/tools/:toolId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Detach a tool from an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiParam({ name: "toolId", description: "Tool ID to detach" })
  @ApiResponse({
    status: 200,
    description: "Tool detached",
    type: AgentResponseDto,
  })
  @ApiResponse({ status: 404, description: "Agent or tool not found" })
  async detachTool(
    @Req() req: JwtRequest,
    @Param("id") agentId: string,
    @Param("toolId") toolId: string,
  ) {
    this.validateAgentId(agentId);
    return this.agentsService.detachTool(req.user.userId, agentId, toolId);
  }

  // ==================== Helpers ====================

  private validateAgentId(id: string): void {
    if (typeof id !== "string" || id.length === 0 || id.length > 128) {
      throw new BadRequestException("Invalid agent ID");
    }
  }
}
