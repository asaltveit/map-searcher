import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import Letta from "@letta-ai/letta-client";

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

  async createAgent(name: string) {
    const client = this.ensureClient();
    const agent = await client.agents.create({
      name,
      memory_blocks: [
        {
          label: "persona",
          value: "I am a friendly AI assistant here to help you.",
        },
        {
          label: "human",
          value: "Name: User",
        },
      ],
      model: "openai/gpt-4o-mini",
    });
    this.logger.log(`Created agent: ${agent.id} (${name})`);
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

  async sendMessage(agentId: string, content: string) {
    const client = this.ensureClient();
    try {
      // Use 'input' as syntactic sugar for single user message
      const response = await client.agents.messages.create(agentId, {
        input: content,
      });
      return response;
    } catch (error) {
      this.logger.error(`Error sending message to agent ${agentId}:`, error);
      throw error;
    }
  }
}
