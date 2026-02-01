import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { LettaService } from "../letta/letta.service";
import { TracingService } from "../tracing/tracing.service";
import {
  RESEARCH_PERSONA,
  MAP_PERSONA,
} from "./workflow.config";
import {
  DEFAULT_AGENT_MODEL,
  DEFAULT_EMBEDDING_MODEL,
  DEFAULT_AGENT_TOOLS,
} from "../config/letta.config";

export interface WorkflowAgents {
  researchAgentId: string;
  mapAgentId: string;
  researchBlockId: string;
}

@Injectable()
export class WorkflowService {
  private readonly logger = new Logger(WorkflowService.name);
  private readonly store = new Map<string, WorkflowAgents>();

  constructor(
    private readonly lettaService: LettaService,
    private readonly tracingService: TracingService,
  ) {}

  async getOrCreateAgents(userId: string): Promise<WorkflowAgents> {
    const existing = this.store.get(userId);
    if (existing) return existing;

    return this.tracingService.trace("workflow.getOrCreateAgents", async () => {
      const block = await this.lettaService.createBlock({
        label: "research",
        value: "",
        description: "Research findings for the map agent",
      });

      const researchAgent = await this.lettaService.createAgent({
        name: "Research Agent",
        description: "Research agent for map workflow",
        model: DEFAULT_AGENT_MODEL,
        embedding: DEFAULT_EMBEDDING_MODEL,
        blockIds: [block.id],
        memoryBlocks: [
          { label: "persona", value: RESEARCH_PERSONA },
          {
            label: "human",
            value:
              "User is researching and mapping. Help gather and save findings with sources.",
          },
        ],
        tools: DEFAULT_AGENT_TOOLS,
      });

      const mapAgent = await this.lettaService.createAgent({
        name: "Map Agent",
        description: "Map builder for workflow",
        model: DEFAULT_AGENT_MODEL,
        embedding: DEFAULT_EMBEDDING_MODEL,
        blockIds: [block.id],
        memoryBlocks: [{ label: "persona", value: MAP_PERSONA }],
      });

      const out: WorkflowAgents = {
        researchAgentId: researchAgent.id,
        mapAgentId: mapAgent.id,
        researchBlockId: block.id,
      };
      this.store.set(userId, out);
      this.logger.log(`Workflow agents created for user ${userId}`);
      return out;
    });
  }

  async updateBlock(blockId: string, value: string): Promise<void> {
    await this.tracingService.trace("workflow.updateBlock", async () => {
      await this.lettaService.updateBlockById(blockId, value);
    });
  }

  isWorkflowAgent(userId: string, agentId: string): boolean {
    const agents = this.store.get(userId);
    if (!agents) return false;
    return (
      agents.researchAgentId === agentId || agents.mapAgentId === agentId
    );
  }

  async sendMessage(
    userId: string,
    agentId: string,
    content: string,
  ): Promise<unknown> {
    if (!this.isWorkflowAgent(userId, agentId)) {
      throw new BadRequestException(`Agent ${agentId} is not a workflow agent`);
    }
    return this.tracingService.trace("workflow.sendMessage", async () => {
      return this.lettaService.sendMessage(agentId, { content });
    });
  }
}
