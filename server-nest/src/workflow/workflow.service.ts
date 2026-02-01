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

export interface MapState {
  geoJson: FeatureCollection;
  view?: { center: [number, number]; zoom: number };
}

interface FeatureCollection {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry?: { type: string; coordinates: unknown };
    properties?: Record<string, unknown>;
  }>;
}

const MAP_STATE_JSON_MARKER = "MAP_STATE_JSON";
const END_MAP_STATE_JSON_MARKER = "END_MAP_STATE_JSON";

function getLastAssistantContent(response: unknown): string {
  const r = response as Record<string, unknown>;
  const messages = (r?.messages as Array<{ role?: string; content?: string }>) ?? (r?.steps as Array<{ role?: string; content?: string }>);
  if (Array.isArray(messages)) {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m?.role === "assistant" && typeof m?.content === "string") return m.content;
    }
  }
  const content = r?.content ?? r?.output;
  if (typeof content === "string") return content;
  return "";
}

function extractMapStateFromResponse(response: unknown): MapState | null {
  const text = getLastAssistantContent(response);
  const start = text.indexOf(MAP_STATE_JSON_MARKER);
  if (start === -1) return null;
  const afterMarker = text.indexOf("\n", start) + 1;
  const end = text.indexOf(END_MAP_STATE_JSON_MARKER, afterMarker);
  if (end === -1) return null;
  const jsonStr = text.slice(afterMarker, end).trim();
  try {
    const parsed = JSON.parse(jsonStr) as { type?: string; features?: unknown[]; view?: { center?: number[]; zoom?: number } };
    if (parsed?.type !== "FeatureCollection" || !Array.isArray(parsed.features)) return null;
    const geoJson: FeatureCollection = {
      type: "FeatureCollection",
      features: parsed.features as FeatureCollection["features"],
    };
    const view =
      parsed.view?.center?.length === 2 && typeof parsed.view?.zoom === "number"
        ? { center: parsed.view.center as [number, number], zoom: parsed.view.zoom }
        : undefined;
    return { geoJson, view };
  } catch {
    return null;
  }
}

@Injectable()
export class WorkflowService {
  private readonly logger = new Logger(WorkflowService.name);
  private readonly store = new Map<string, WorkflowAgents>();
  private readonly mapStateStore = new Map<string, MapState>();

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
      const response = await this.lettaService.sendMessage(agentId, { content });
      const agents = this.store.get(userId);
      if (agents && agentId === agents.mapAgentId) {
        const mapState = extractMapStateFromResponse(response);
        if (mapState) {
          this.mapStateStore.set(userId, mapState);
          this.logger.log(`Map state updated for user ${userId} (${mapState.geoJson.features.length} features)`);
        }
      }
      return response;
    });
  }

  getMapState(userId: string): MapState | null {
    return this.mapStateStore.get(userId) ?? null;
  }

  setMapState(userId: string, state: MapState): void {
    this.mapStateStore.set(userId, state);
  }
}
