import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { AgentsService } from "./agents.service";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { SendMessageDto } from "./dto/send-message.dto";
import { AgentResponseDto, MessageResponseDto } from "./dto/agent-response.dto";

@ApiTags("Agents")
@Controller("api/agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new agent" })
  @ApiBody({ type: CreateAgentDto })
  @ApiResponse({ status: 201, description: "Agent created", type: AgentResponseDto })
  async createAgent(@Body() dto: CreateAgentDto) {
    return this.agentsService.createAgent(dto.name);
  }

  @Get()
  @ApiOperation({ summary: "List all agents" })
  @ApiResponse({ status: 200, description: "List of agents", type: [AgentResponseDto] })
  async listAgents() {
    return this.agentsService.listAgents();
  }

  @Post(":id/messages")
  @ApiOperation({ summary: "Send a message to an agent" })
  @ApiParam({ name: "id", description: "Agent ID" })
  @ApiBody({ type: SendMessageDto })
  @ApiResponse({ status: 201, description: "Message response", type: MessageResponseDto })
  async sendMessage(
    @Param("id") agentId: string,
    @Body() dto: SendMessageDto,
  ) {
    if (!this.isValidId(agentId)) {
      throw new BadRequestException("Invalid agent ID");
    }
    return this.agentsService.sendMessage(agentId, dto.content);
  }

  private isValidId(id: string): boolean {
    return typeof id === "string" && id.length > 0 && id.length <= 128;
  }
}
