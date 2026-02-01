/**
 * Per-user agent and block IDs (hybrid). Single-user: one set from env or in-memory.
 */
import { Letta } from '@letta-ai/letta-client';
import { v4 as uuidv4 } from 'uuid';
import { trace } from './tracing.js';

const apiKey = process.env.LETTA_API_KEY;
if (!apiKey) {
  console.warn('LETTA_API_KEY not set; agent creation will fail.');
}

const client = new Letta({ apiKey });
const model = 'anthropic/claude-sonnet-4-5-20250929';
const embedding = 'openai/text-embedding-3-small';

// In-memory: userId -> { researchAgentId, mapAgentId, researchBlockId }
const store = new Map();

/** Return 'research' | 'map' if agentId is a known research/map agent, else null. */
function getAgentKind(agentId) {
  if (!agentId) return null;
  for (const entry of store.values()) {
    if (entry.researchAgentId === agentId) return 'research';
    if (entry.mapAgentId === agentId) return 'map';
  }
  return null;
}

const RESEARCH_PERSONA = `You are a research agent. Always search stored research first using search_stored_research(query) before using web_search. Use web_search only for what is not already in stored research. When you find new information (from web or elsewhere), save it with source attached using save_research(content, source_url, title).

For map-friendly results (e.g. "museums in Portland", "route between X and Y"): include place names, addresses, and when possible coordinates (latitude, longitude) or city/region. For routes, list stops in order with locations so the map agent can draw a path. Write a clear summary the map agent can use: places as lists with names and [lng, lat] if known, and route order.

When the user asks for something you cannot do with your current tools (e.g. add to calendar, export to Notion): (1) Clearly state what you can do with current tools and what you cannot do. (2) Ask whether to continue: "Should I continue with what I can do and add '[the unmet request]' to the improvement list?" Only if the user confirms should the unmet request be submitted to the improvement list (the client will call the improvement API) and you proceed with what you can do.`;

const MAP_PERSONA = `You are a map builder. You create maps and layers using research provided in your context.

Use your tools: add_fill_layer (polygons), add_line_layer (routes/boundaries), add_circle_layer (points), add_symbol_layer (labels/icons), set_map_view (center and zoom). Always provide a human-readable layerName for each layer for accessibility.

For places: use add_circle_layer or add_symbol_layer with GeoJSON Point features (coordinates as [longitude, latitude]). For a route between multiple places: add a line layer with a GeoJSON LineString whose coordinates array is the ordered list of [lng, lat] points, and add points for each stop. Then call set_map_view with a center that fits all features and a zoom that shows the full area (e.g. zoom 10–14 for a city). Prefer GeoJSON: FeatureCollection for layers, Point/LineString geometry.

When the user asks for something you cannot do with your current tools (e.g. export to GIS, add to calendar): (1) Clearly state what you can do and what you cannot do. (2) Ask whether to continue: "Should I continue with what I can do and add '[the unmet request]' to the improvement list?" Only if the user confirms should the unmet request be submitted to the improvement list (the client will call the improvement API) and you proceed with what you can do.`;

export async function getOrCreateAgents(userId) {
  const existing = store.get(userId);
  if (existing) return existing;

  return trace('getOrCreateAgents', async () => {
    const block = await client.blocks.create({
      label: 'research',
      description: 'Research findings for the map agent',
      value: '',
    });

    const researchAgent = await client.agents.create({
      model,
      embedding,
      memory_blocks: [
        { label: 'persona', value: RESEARCH_PERSONA },
        { label: 'human', value: 'User is researching and mapping. Help gather and save findings with sources.' },
      ],
      block_ids: [block.id],
      tools: ['web_search', 'run_code'],
    });

    const mapAgent = await client.agents.create({
      model,
      embedding,
      memory_blocks: [{ label: 'persona', value: MAP_PERSONA }],
      block_ids: [block.id],
    });

    const out = {
      researchAgentId: researchAgent.id,
      mapAgentId: mapAgent.id,
      researchBlockId: block.id,
    };
    store.set(userId, out);
    return out;
  });
}

export async function updateBlock(blockId, value) {
  return trace('updateBlock', async () => {
    await client.blocks.update(blockId, { value: String(value).slice(0, 100_000) });
  });
}

export async function sendMessage(agentId, body) {
  const kind = getAgentKind(agentId);
  const traceName = kind ? `${kind}_agent` : 'sendMessage';
  return trace(traceName, async () => {
    return await client.agents.messages.create(agentId, body);
  });
}
