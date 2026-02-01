/** Default backend port when running client in dev (server-nest). */
const DEFAULT_API_PORT = "3001";

/**
 * Client API for the backend (server-nest by default).
 * Set NEXT_PUBLIC_API_URL in production (e.g. https://api.example.com).
 * In dev, defaults to http://localhost:3001 so API calls always hit the backend even if the client runs on another port.
 */
function getBase(): string {
  if (typeof window === "undefined") return "";
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return `http://localhost:${DEFAULT_API_PORT}`;
  return window.location.port === "3000" ? `http://localhost:${DEFAULT_API_PORT}` : "";
}

export interface AgentIds {
  researchAgentId: string;
  mapAgentId: string;
  researchBlockId: string;
}

/** Turn API error response body into a user-facing message (avoid showing HTML 404 pages). */
async function getErrorMessage(res: Response): Promise<string> {
  const text = await res.text().catch(() => res.statusText);
  const trimmed = text.trim();
  if (trimmed.startsWith("<!") || trimmed.toLowerCase().startsWith("<!doctype")) {
    return "Could not reach the research service. Make sure the backend is running (e.g. server-nest on port 3001).";
  }
  if (res.status === 404) return "Research service not found. Is the backend running?";
  if (res.status >= 500) return "Research service error. Try again later.";
  return trimmed || res.statusText;
}

/** Get or create workflow agents (research + map + shared block). Uses /api/workflow/agents so both Express and server-nest work. */
export async function getAgents(): Promise<AgentIds> {
  const res = await fetch(`${getBase()}/api/workflow/agents`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

/** Send a user message to a workflow agent. Uses /api/workflow/send-message so both Express and server-nest work. Returns Letta response. */
export async function sendAgentMessage(
  agentId: string,
  content: string
): Promise<unknown> {
  const res = await fetch(`${getBase()}/api/workflow/send-message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ agentId, content }),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return res.json();
}

export async function updateResearchBlock(
  researchBlockId: string,
  value: string
): Promise<void> {
  const res = await fetch(`${getBase()}/api/workflow/update-block`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ researchBlockId, value }),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res));
}

/**
 * Extract the last assistant text from a Letta message response.
 * Letta response shape may include messages[], steps[], or similar.
 */
export function getLastAssistantContent(response: unknown): string {
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

export interface MapStateResponse {
  geoJson: GeoJSON.FeatureCollection;
  view?: { center: [number, number]; zoom: number };
}

/** Get current map state (GeoJSON + optional view) from last map agent run. */
export async function getMapState(): Promise<MapStateResponse | null> {
  const res = await fetch(`${getBase()}/api/workflow/map-state`, { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data?.geoJson?.type || data.geoJson.type !== "FeatureCollection") return null;
  return data as MapStateResponse;
}
