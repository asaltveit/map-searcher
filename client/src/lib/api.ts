/**
 * Client API for the backend (server-nest by default).
 * Set NEXT_PUBLIC_API_URL in production (e.g. https://api.example.com).
 * In dev, when the client runs on port 3000, defaults to http://localhost:3001 (run server-nest with PORT=3001).
 */
function getBase(): string {
  if (typeof window === "undefined") return "";
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.replace(/\/$/, "");
  return window.location.port === "3000" ? "http://localhost:3001" : "";
}

export interface AgentIds {
  researchAgentId: string;
  mapAgentId: string;
  researchBlockId: string;
}

/** Get or create workflow agents (research + map + shared block). Uses /api/workflow/agents so both Express and server-nest work. */
export async function getAgents(): Promise<AgentIds> {
  const res = await fetch(`${getBase()}/api/workflow/agents`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
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
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
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
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
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
