import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import Letta from "@letta-ai/letta-client";

export interface CreateAgentParams {
  name: string;
  description?: string;
  model?: string;
  embedding?: string;
  system?: string;
  memoryBlocks?: Array<{ label: string; value: string; limit?: number }>;
  tools?: string[];
  temperature?: number;
  tags?: string[];
}

export interface UpdateAgentParams {
  name?: string;
  description?: string;
  model?: string;
  system?: string;
  temperature?: number;
  tags?: string[];
}

export interface SendMessageParams {
  content: string;
  maxSteps?: number;
}

export interface ListMessagesParams {
  limit?: number;
  before?: string;
  after?: string;
  order?: "asc" | "desc";
}

export interface UpdateBlockParams {
  value?: string;
  description?: string;
  limit?: number;
}

export interface CreateToolParams {
  sourceCode: string;
  name?: string;
  description?: string;
  tags?: string[];
}

@Injectable()
export class LettaService implements OnModuleInit {
  private readonly logger = new Logger(LettaService.name);
  private client: Letta | null = null;

  onModuleInit() {
    const apiKey = process.env.LETTA_API_KEY;
    if (!apiKey) {
      this.logger.warn("LETTA_API_KEY not set; Letta features disabled.");
      return;
    }
    this.client = new Letta({ apiKey });
    this.logger.log("Letta client initialized");
  }

  private ensureClient(): Letta {
    if (!this.client) {
      throw new Error("Letta client not initialized - LETTA_API_KEY required");
    }
    return this.client;
  }

  // ==================== Agent Management ====================

  async createAgent(params: CreateAgentParams) {
    const client = this.ensureClient();
    const agent = await client.agents.create({
      name: params.name,
      description: params.description,
      model: params.model || "openai/gpt-4o-mini",
      embedding: params.embedding || "openai/text-embedding-3-small",
      system: params.system,
      memory_blocks: params.memoryBlocks?.map((block) => ({
        label: block.label,
        value: block.value,
        limit: block.limit,
      })) || [
        {
          label: "persona",
          value: "I am a friendly AI assistant here to help you.",
        },
        {
          label: "human",
          value: "Name: User",
        },
      ],
      tools: params.tools,
      tags: params.tags,
    });
    this.logger.log(`Created agent: ${agent.id} (${params.name})`);
    return agent;
  }

  async listAgents() {
    const client = this.ensureClient();
    const agents = [];
    for await (const agent of client.agents.list()) {
      agents.push(agent);
    }
    return agents;
  }

  async retrieveAgent(agentId: string) {
    const client = this.ensureClient();
    const agent = await client.agents.retrieve(agentId);
    return agent;
  }

  async updateAgent(agentId: string, params: UpdateAgentParams) {
    const client = this.ensureClient();
    const agent = await client.agents.update(agentId, {
      name: params.name,
      description: params.description,
      model: params.model,
      system: params.system,
      tags: params.tags,
    });
    this.logger.log(`Updated agent: ${agentId}`);
    return agent;
  }

  async deleteAgent(agentId: string) {
    const client = this.ensureClient();
    await client.agents.delete(agentId);
    this.logger.log(`Deleted agent: ${agentId}`);
  }

  // ==================== Messages ====================

  async sendMessage(agentId: string, params: SendMessageParams) {
    const client = this.ensureClient();
    try {
      const response = await client.agents.messages.create(agentId, {
        messages: [
          {
            role: "user",
            content: params.content,
          },
        ],
      });
      return response;
    } catch (error) {
      this.logger.error(`Error sending message to agent ${agentId}:`, error);
      throw error;
    }
  }

  async listMessages(agentId: string, params: ListMessagesParams = {}) {
    const client = this.ensureClient();
    const messages = [];
    for await (const message of client.agents.messages.list(agentId, {
      limit: params.limit,
      before: params.before,
      after: params.after,
    })) {
      messages.push(message);
    }
    return messages;
  }

  async resetMessages(agentId: string, addDefaultInitialMessages = true) {
    const client = this.ensureClient();
    const result = await client.agents.messages.reset(agentId, {
      add_default_initial_messages: addDefaultInitialMessages,
    });
    this.logger.log(`Reset messages for agent: ${agentId}`);
    return result;
  }

  // ==================== Memory Blocks ====================

  async listBlocks(agentId: string) {
    const client = this.ensureClient();
    const blocks = [];
    for await (const block of client.agents.blocks.list(agentId)) {
      blocks.push(block);
    }
    return blocks;
  }

  async getBlock(agentId: string, label: string) {
    const client = this.ensureClient();
    const block = await client.agents.blocks.retrieve(label, {
      agent_id: agentId,
    });
    return block;
  }

  async updateBlock(agentId: string, label: string, params: UpdateBlockParams) {
    const client = this.ensureClient();
    const block = await client.agents.blocks.update(label, {
      agent_id: agentId,
      value: params.value,
      description: params.description,
      limit: params.limit,
    });
    this.logger.log(`Updated block '${label}' for agent: ${agentId}`);
    return block;
  }

  // ==================== Agent Tools ====================

  async listAgentTools(agentId: string) {
    const client = this.ensureClient();
    const tools = [];
    for await (const tool of client.agents.tools.list(agentId)) {
      tools.push(tool);
    }
    return tools;
  }

  async attachTool(agentId: string, toolId: string) {
    const client = this.ensureClient();
    const agent = await client.agents.tools.attach(toolId, {
      agent_id: agentId,
    });
    this.logger.log(`Attached tool ${toolId} to agent: ${agentId}`);
    return agent;
  }

  async detachTool(agentId: string, toolId: string) {
    const client = this.ensureClient();
    const agent = await client.agents.tools.detach(toolId, {
      agent_id: agentId,
    });
    this.logger.log(`Detached tool ${toolId} from agent: ${agentId}`);
    return agent;
  }

  // ==================== Global Tools ====================

  async listTools(params?: { name?: string; search?: string }) {
    const client = this.ensureClient();
    const tools = [];
    for await (const tool of client.tools.list({
      name: params?.name,
    })) {
      tools.push(tool);
    }
    return tools;
  }

  async getTool(toolId: string) {
    const client = this.ensureClient();
    const tool = await client.tools.retrieve(toolId);
    return tool;
  }

  async createTool(params: CreateToolParams) {
    const client = this.ensureClient();
    const tool = await client.tools.create({
      source_code: params.sourceCode,
      description: params.description,
      tags: params.tags,
    });
    this.logger.log(`Created tool: ${tool.id}`);
    return tool;
  }

  async deleteTool(toolId: string) {
    const client = this.ensureClient();
    await client.tools.delete(toolId);
    this.logger.log(`Deleted tool: ${toolId}`);
  }

  // ==================== Models ====================

  async listModels() {
    const client = this.ensureClient();
    const models = await client.models.list();
    return models;
  }

  async listEmbeddingModels() {
    const client = this.ensureClient();
    const models = await client.models.embeddings.list();
    return models;
  }
}
