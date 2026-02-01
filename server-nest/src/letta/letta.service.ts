import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import Letta from "@letta-ai/letta-client";

export interface CreateAgentParams {
  name: string;
  description?: string;
  model?: string;
  embedding?: string;
  system?: string;
  memoryBlocks?: Array<{ label: string; value: string; limit?: number }>;
  blockIds?: string[];
  tools?: string[];
  temperature?: number;
  tags?: string[];
  messageBufferAutoclear?: boolean; // Clear message history between requests (for workflows)
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
    this.client = new Letta({
      apiKey,
      timeout: 15 * 60 * 1000, // 15 minutes (in milliseconds) for complex operations
    });
    this.logger.log("Letta client initialized with 15 minute timeout");
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
      ...(params.blockIds?.length && { block_ids: params.blockIds }),
      tools: params.tools,
      tags: params.tags,
      // For workflow agents: clear message buffer after each request
      message_buffer_autoclear: params.messageBufferAutoclear ?? false,
    });
    this.logger.log(`Created agent: ${agent.id} (${params.name})${params.messageBufferAutoclear ? ' [autoclear enabled]' : ''}`);
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
    this.logger.log(`[LETTA] sendMessage START - agentId=${agentId}, contentLength=${params.content.length}`);
    const client = this.ensureClient();
    try {
      // Client-level timeout is already set to 15 minutes
      this.logger.log(`[LETTA] sendMessage calling agent API...`);
      const response = await client.agents.messages.create(agentId, {
        messages: [
          {
            role: "user",
            content: params.content,
          },
        ],
      });
      this.logger.log(`[LETTA] sendMessage RESPONSE RECEIVED - type=${typeof response}, hasMessages=${!!(response as any).messages}`);
      if ((response as any).messages) {
        this.logger.log(`[LETTA] sendMessage RESPONSE - messageCount=${(response as any).messages.length}`);
        for (let i = 0; i < (response as any).messages.length; i++) {
          const msg = (response as any).messages[i];
          this.logger.log(`[LETTA] sendMessage MESSAGE ${i + 1} - type="${msg.message_type || msg.role}", hasContent=${!!(msg.content || msg.assistant_message || msg.tool_return)}`);
        }
      }
      return response;
    } catch (error) {
      const normalized = this.normalizeError(error, `Letta sendMessage(${agentId})`);
      this.logger.error(`[LETTA] sendMessage FAILED - agentId=${agentId}, error=${normalized.message}`);
      throw normalized;
    }
  }

  /**
   * Convert fetch Response or other non-Error rejections into an Error so we never
   * throw/reject with a raw Response (which causes "UnhandledPromiseRejection: #<_Response>").
   */
  private normalizeError(error: unknown, context: string): Error {
    if (error instanceof Error) return error;
    const r = error as { ok?: boolean; status?: number; statusText?: string };
    if (typeof r?.ok === "boolean" && typeof r?.status === "number") {
      return new Error(
        `${context}: API returned ${r.status} ${r.statusText ?? ""}`.trim(),
      );
    }
    return new Error(`${context}: ${String(error)}`);
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

  // ==================== Global Blocks (shared across agents) ====================

  async createBlock(params: {
    label: string;
    value: string;
    description?: string;
  }) {
    const client = this.ensureClient();
    const block = await client.blocks.create({
      label: params.label,
      value: params.value,
      description: params.description,
    });
    this.logger.log(`Created block: ${block.id} (${params.label})`);
    return block;
  }

  async updateBlockById(blockId: string, value: string) {
    const client = this.ensureClient();
    const block = await client.blocks.update(blockId, {
      value: String(value).slice(0, 100_000),
    });
    this.logger.log(`Updated block: ${blockId}`);
    return block;
  }

  // ==================== Memory Blocks (agent-scoped) ====================

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
