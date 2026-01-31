const API = '/api';

export type AgentIds = {
  researchAgentId: string;
  mapAgentId: string;
  researchBlockId: string;
};

export async function getAgents(): Promise<AgentIds> {
  const res = await fetch(`${API}/agents`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to get agents');
  return res.json();
}

export async function searchResearch(q: string): Promise<Array<{ id: string; content: string; source_url: string; title?: string; source?: string }>> {
  const res = await fetch(`${API}/research?q=${encodeURIComponent(q)}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function saveResearch(body: { content: string; source_url: string; title?: string }): Promise<{ id: string; created_at: string }> {
  const res = await fetch(`${API}/research`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || 'Save failed');
  }
  return res.json();
}

export async function sendMessage(
  agentId: string,
  body: { messages: unknown[]; client_tools?: unknown[] }
): Promise<{ messages: unknown[]; stop_reason?: string }> {
  const res = await fetch(`${API}/agents/${agentId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Message failed');
  return res.json();
}

export async function updateBlock(researchBlockId: string, value: string): Promise<void> {
  const res = await fetch(`${API}/workflow/update-block`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ researchBlockId, value }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Update block failed');
}
