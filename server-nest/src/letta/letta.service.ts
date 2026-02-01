import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Letta } from "@letta-ai/letta-client";
import { TracingService } from "../tracing/tracing.service";

export interface AgentIds {
  researchAgentId: string;
  mapAgentId: string;
  researchBlockId: string;
}

const RESEARCH_PERSONA = `You are a research agent. Always search stored research first using search_stored_research(query) before using web_search. Use web_search only for what is not already in stored research. When you find new information (from web or elsewhere), save it with source attached using save_research(content, source_url, title).

For map-friendly results (e.g. "museums in Portland", "route between X and Y"): include place names, addresses, and when possible coordinates (latitude, longitude) or city/region. For routes, list stops in order with locations so the map agent can draw a path. Write a clear summary the map agent can use: places as lists with names and [lng, lat] if known, and route order.`;

const MAP_PERSONA = `You are a map builder. You create maps and layers using research provided in your context.

Use your tools: add_fill_layer (polygons), add_line_layer (routes/boundaries), add_circle_layer (points), add_symbol_layer (labels/icons), set_map_view (center and zoom). Always provide a human-readable layerName for each layer for accessibility.

For places: use add_circle_layer or add_symbol_layer with GeoJSON Point features (coordinates as [longitude, latitude]). For a route between multiple places: add a line layer with a GeoJSON LineString whose coordinates array is the ordered list of [lng, lat] points, and add points for each stop. Then call set_map_view with a center that fits all features and a zoom that shows the full area (e.g. zoom 10–14 for a city). Prefer GeoJSON: FeatureCollection for layers, Point/LineString geometry.`;

@Injectable()
export class LettaService implements OnModuleInit {
  private readonly logger = new Logger(LettaService.name);
  private client: Letta | null = null;
  private readonly model = "anthropic/claude-sonnet-4-5-20250929";
  private readonly embedding = "openai/text-embedding-3-small";

  // In-memory store: userId -> AgentIds
  private store = new Map<string, AgentIds>();

  constructor(private tracingService: TracingService) {}

  onModuleInit() {
    const apiKey = process.env.LETTA_API_KEY;
    if (!apiKey) {
      this.logger.warn("LETTA_API_KEY not set; agent creation will fail.");
      return;
    }
    this.client = new Letta({ apiKey });
    this.logger.log("Letta client initialized");
  }

  async getOrCreateAgents(userId: string): Promise<AgentIds> {
    const existing = this.store.get(userId);
    if (existing) return existing;

    if (!this.client) {
      throw new Error("Letta client not initialized - LETTA_API_KEY required");
    }

    const block = await this.client.blocks.create({
      label: "research",
      description: "Research findings for the map agent",
      value: "",
    });

    const researchAgent = await this.client.agents.create({
      model: this.model,
      embedding: this.embedding,
      memory_blocks: [
        { label: "persona", value: RESEARCH_PERSONA },
        {
          label: "human",
          value:
            "User is researching and mapping. Help gather and save findings with sources.",
        },
      ],
      block_ids: [block.id],
      tools: ["web_search", "run_code"],
    });

    const mapAgent = await this.client.agents.create({
      model: this.model,
      embedding: this.embedding,
      memory_blocks: [{ label: "persona", value: MAP_PERSONA }],
      block_ids: [block.id],
    });

    const out: AgentIds = {
      researchAgentId: researchAgent.id,
      mapAgentId: mapAgent.id,
      researchBlockId: block.id,
    };

    this.store.set(userId, out);
    this.logger.log(`Created agents for user ${userId}`);

    return out;
  }

  async updateBlock(blockId: string, value: any): Promise<void> {
    if (!this.client) {
      throw new Error("Letta client not initialized");
    }

    return this.tracingService.trace("updateBlock", async () => {
      await this.client!.blocks.update(blockId, {
        value: String(value).slice(0, 100_000),
      });
    });
  }

  async sendMessage(agentId: string, body: any): Promise<any> {
    if (!this.client) {
      throw new Error("Letta client not initialized");
    }

    return this.tracingService.trace("sendMessage", async () => {
      return await this.client!.agents.messages.create(agentId, body);
    });
  }
}
