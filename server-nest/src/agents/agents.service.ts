import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import {
  LettaService,
  CreateAgentParams,
  UpdateAgentParams,
  SendMessageParams,
  ListMessagesParams,
  UpdateBlockParams,
} from "../letta/letta.service";
import {
  DEFAULT_AGENT_TOOLS,
  DEFAULT_AGENT_MODEL,
  DEFAULT_EMBEDDING_MODEL,
  DEFAULT_PERSONA,
  DEFAULT_HUMAN_TEMPLATE,
} from "../config/letta.config";

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(
    private readonly lettaService: LettaService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Verify that the user owns the agent
   * @throws NotFoundException if agent not found or not owned by user
   */
  async verifyOwnership(
    userId: string,
    agentId: string,
  ): Promise<{ lettaAgentId: string }> {
    const agent = await this.prisma.agent.findFirst({
      where: {
        lettaAgentId: agentId,
        userId,
      },
    });

    if (!agent) {
      throw new NotFoundException(`Agent not found: ${agentId}`);
    }

    return { lettaAgentId: agent.lettaAgentId };
  }

  // ==================== Agent Management ====================

  async createAgent(userId: string, params: CreateAgentParams) {
    // Set defaults if not provided
    const agentParams: CreateAgentParams = {
      ...params,
      model: params.model || DEFAULT_AGENT_MODEL,
      embedding: params.embedding || DEFAULT_EMBEDDING_MODEL,
      tools: params.tools || DEFAULT_AGENT_TOOLS,
      memoryBlocks: params.memoryBlocks || [
        { label: "persona", value: DEFAULT_PERSONA },
        { label: "human", value: DEFAULT_HUMAN_TEMPLATE("User") },
      ],
    };

    // Create agent in Letta
    const lettaAgent = await this.lettaService.createAgent(agentParams);

    // Track ownership in our database
    await this.prisma.agent.create({
      data: {
        lettaAgentId: lettaAgent.id,
        userId,
        name: params.name,
        description: params.description,
        model: agentParams.model!,
      },
    });

    this.logger.log(
      `Created agent ${lettaAgent.id} for user ${userId}`,
    );

    return lettaAgent;
  }

  async listAgents(userId: string) {
    // Get user's agents from our database
    const userAgents = await this.prisma.agent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // Fetch full details from Letta for each agent
    const agents = await Promise.all(
      userAgents.map(async (agent) => {
        try {
          return await this.lettaService.retrieveAgent(agent.lettaAgentId);
        } catch (error) {
          this.logger.warn(
            `Failed to retrieve agent ${agent.lettaAgentId} from Letta`,
          );
          return null;
        }
      }),
    );

    return agents.filter((agent) => agent !== null);
  }

  async getAgent(userId: string, agentId: string) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.retrieveAgent(agentId);
  }

  async updateAgent(userId: string, agentId: string, params: UpdateAgentParams) {
    await this.verifyOwnership(userId, agentId);

    // Update in Letta
    const updatedAgent = await this.lettaService.updateAgent(agentId, params);

    // Update local record if name/description changed
    if (params.name || params.description || params.model) {
      await this.prisma.agent.update({
        where: { lettaAgentId: agentId },
        data: {
          ...(params.name && { name: params.name }),
          ...(params.description && { description: params.description }),
          ...(params.model && { model: params.model }),
        },
      });
    }

    return updatedAgent;
  }

  async deleteAgent(userId: string, agentId: string) {
    await this.verifyOwnership(userId, agentId);

    // Delete from Letta
    await this.lettaService.deleteAgent(agentId);

    // Delete from our database
    await this.prisma.agent.delete({
      where: { lettaAgentId: agentId },
    });

    this.logger.log(`Deleted agent ${agentId} for user ${userId}`);
  }

  // ==================== Messages ====================

  async sendMessage(userId: string, agentId: string, params: SendMessageParams) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.sendMessage(agentId, params);
  }

  async listMessages(
    userId: string,
    agentId: string,
    params: ListMessagesParams = {},
  ) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.listMessages(agentId, params);
  }

  async resetMessages(
    userId: string,
    agentId: string,
    addDefaultInitialMessages = true,
  ) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.resetMessages(agentId, addDefaultInitialMessages);
  }

  // ==================== Memory Blocks ====================

  async listBlocks(userId: string, agentId: string) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.listBlocks(agentId);
  }

  async getBlock(userId: string, agentId: string, label: string) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.getBlock(agentId, label);
  }

  async updateBlock(
    userId: string,
    agentId: string,
    label: string,
    params: UpdateBlockParams,
  ) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.updateBlock(agentId, label, params);
  }

  // ==================== Agent Tools ====================

  async listAgentTools(userId: string, agentId: string) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.listAgentTools(agentId);
  }

  async attachTool(userId: string, agentId: string, toolId: string) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.attachTool(agentId, toolId);
  }

  async detachTool(userId: string, agentId: string, toolId: string) {
    await this.verifyOwnership(userId, agentId);
    return this.lettaService.detachTool(agentId, toolId);
  }

  // ==================== Default Agent Creation ====================

  /**
   * Create a default agent for a new user during registration
   */
  async createDefaultAgent(userId: string, userName: string) {
    return this.createAgent(userId, {
      name: "My Assistant",
      description: "Your personal AI assistant",
      model: DEFAULT_AGENT_MODEL,
      embedding: DEFAULT_EMBEDDING_MODEL,
      memoryBlocks: [
        { label: "persona", value: DEFAULT_PERSONA },
        { label: "human", value: DEFAULT_HUMAN_TEMPLATE(userName) },
      ],
      tools: DEFAULT_AGENT_TOOLS,
    });
  }
}
