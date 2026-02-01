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

// ==================== Alerts API ====================

export type AlertFrequency = "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "MANUAL";
export type AlertProcessingStatus = "IDLE" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface Alert {
  id: string;
  query: string;
  region: string;
  maxArticles: number;
  frequency: AlertFrequency;
  isActive: boolean;
  processingStatus: AlertProcessingStatus;
  lastRunAt?: string;
  nextRunAt?: string;
  createdAt: string;
  updatedAt: string;
  articleCount?: number;
}

export interface AlertListItem {
  id: string;
  query: string;
  region: string;
  frequency: AlertFrequency;
  isActive: boolean;
  processingStatus: AlertProcessingStatus;
  lastRunAt?: string;
  nextRunAt?: string;
  articleCount: number;
  createdAt: string;
}

export interface AlertArticle {
  id: string;
  url: string;
  title: string;
  author?: string;
  source: string;
  publishedAt: string;
  summary?: string;
  sentiment?: string;
  locationCount: number;
  createdAt: string;
}

export interface AlertDetail extends Alert {
  articles: AlertArticle[];
}

export interface CreateAlertInput {
  query: string;
  region: string;
  maxArticles?: number;
  frequency?: AlertFrequency;
  isActive?: boolean;
}

export interface UpdateAlertInput {
  query?: string;
  region?: string;
  maxArticles?: number;
  frequency?: AlertFrequency;
  isActive?: boolean;
}

export interface GeoJsonFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    locationId: string;
    articleId: string;
    alertId: string;
    articleTitle: string;
    mention: string;
    mentionType: string;
    formattedAddress?: string;
    confidence?: number;
    articleUrl: string;
    publishedAt: string;
  };
}

export interface GeoJsonFeatureCollection {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

/** List all alerts for the current user */
export async function listAlerts(): Promise<AlertListItem[]> {
  const url = `${getBase()}/api/alerts`;
  console.log(`[API] listAlerts START - url=${url}`);
  const res = await fetch(url, {
    credentials: "include",
  });
  console.log(`[API] listAlerts response - status=${res.status}, ok=${res.ok}`);
  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    console.error(`[API] listAlerts FAILED - status=${res.status}, error=${errorText}`);
    throw new Error(errorText);
  }
  const data = await res.json();
  console.log(`[API] listAlerts SUCCESS - count=${data?.length || 0}, alerts=`, data?.map((a: AlertListItem) => ({ id: a.id, query: a.query, articleCount: a.articleCount })));
  return data;
}

/** Get a single alert with its articles */
export async function getAlert(alertId: string): Promise<AlertDetail> {
  const url = `${getBase()}/api/alerts/${alertId}`;
  console.log(`[API] getAlert START - alertId=${alertId}, url=${url}`);
  const res = await fetch(url, {
    credentials: "include",
  });
  console.log(`[API] getAlert response - status=${res.status}, ok=${res.ok}`);
  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    console.error(`[API] getAlert FAILED - alertId=${alertId}, status=${res.status}, error=${errorText}`);
    throw new Error(errorText);
  }
  const data = await res.json();
  console.log(`[API] getAlert SUCCESS - alertId=${alertId}, query="${data.query}", region="${data.region}", articleCount=${data.articleCount}, articlesReturned=${data.articles?.length || 0}`);
  if (data.articles && data.articles.length > 0) {
    console.log(`[API] getAlert ARTICLES SAMPLE:`, data.articles.slice(0, 2).map((a: AlertArticle) => ({ id: a.id, title: a.title, locationCount: a.locationCount })));
  }
  return data;
}

/** Create a new alert */
export async function createAlert(input: CreateAlertInput): Promise<Alert> {
  const url = `${getBase()}/api/alerts`;
  console.log(`[API] createAlert START - query="${input.query}", region="${input.region}", frequency=${input.frequency || 'MANUAL'}, maxArticles=${input.maxArticles || 20}`);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  console.log(`[API] createAlert response - status=${res.status}, ok=${res.ok}`);
  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    console.error(`[API] createAlert FAILED - status=${res.status}, error=${errorText}`);
    throw new Error(errorText);
  }
  const data = await res.json();
  console.log(`[API] createAlert SUCCESS - alertId=${data.id}, query="${data.query}", region="${data.region}"`);
  return data;
}

/** Update an existing alert */
export async function updateAlert(alertId: string, input: UpdateAlertInput): Promise<Alert> {
  const res = await fetch(`${getBase()}/api/alerts/${alertId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}

/** Delete an alert */
export async function deleteAlert(alertId: string): Promise<{ success: boolean }> {
  const res = await fetch(`${getBase()}/api/alerts/${alertId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}

/** Manually trigger an alert to run */
export async function runAlert(alertId: string): Promise<{ jobId: string; message: string }> {
  const url = `${getBase()}/api/alerts/${alertId}/run`;
  console.log(`[API] runAlert START - alertId=${alertId}, url=${url}`);
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
  });
  console.log(`[API] runAlert response - status=${res.status}, ok=${res.ok}`);
  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    console.error(`[API] runAlert FAILED - alertId=${alertId}, status=${res.status}, error=${errorText}`);
    throw new Error(errorText);
  }
  const data = await res.json();
  console.log(`[API] runAlert SUCCESS - alertId=${alertId}, jobId=${data.jobId}, message="${data.message}"`);
  return data;
}

/** Get GeoJSON locations for alerts */
export async function getAlertsLocations(alertIds?: string[]): Promise<GeoJsonFeatureCollection> {
  const params = alertIds?.length ? `?alertIds=${alertIds.join(",")}` : "";
  const url = `${getBase()}/api/alerts/locations${params}`;
  console.log(`[API] getAlertsLocations START - alertIds=${JSON.stringify(alertIds)}, url=${url}`);
  const res = await fetch(url, {
    credentials: "include",
  });
  console.log(`[API] getAlertsLocations response - status=${res.status}, ok=${res.ok}`);
  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    console.error(`[API] getAlertsLocations FAILED - status=${res.status}, error=${errorText}`);
    throw new Error(errorText);
  }
  const data = await res.json();
  console.log(`[API] getAlertsLocations SUCCESS - featureCount=${data.features?.length || 0}, type=${data.type}`);
  if (data.features && data.features.length > 0) {
    console.log(`[API] getAlertsLocations SAMPLE FEATURES (first 3):`, data.features.slice(0, 3).map((f: GeoJsonFeature) => ({ mention: f.properties.mention, articleTitle: f.properties.articleTitle, coords: f.geometry.coordinates })));
  } else {
    console.warn(`[API] getAlertsLocations WARNING - NO FEATURES RETURNED! This means no map pins will show.`);
  }
  return data;
}

export interface ChatResponse {
  response: string;
  agentId: string;
}

/** Chat with articles in an alert using an AI agent */
export async function chatWithArticles(alertId: string, message: string): Promise<ChatResponse> {
  const url = `${getBase()}/api/alerts/${alertId}/chat`;
  console.log(`[API] chatWithArticles START - alertId=${alertId}`);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message }),
  });
  console.log(`[API] chatWithArticles response - status=${res.status}, ok=${res.ok}`);
  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    console.error(`[API] chatWithArticles FAILED - alertId=${alertId}, status=${res.status}, error=${errorText}`);
    throw new Error(errorText);
  }
  const data = await res.json();
  console.log(`[API] chatWithArticles SUCCESS - alertId=${alertId}, agentId=${data.agentId}`);
  return data;
}

// ==================== User Preferences API ====================

export interface UserPreferences {
  id: string;
  defaultLat?: number;
  defaultLng?: number;
  defaultZoom?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePreferencesInput {
  defaultLat?: number;
  defaultLng?: number;
  defaultZoom?: number;
}

/** Get user preferences */
export async function getPreferences(): Promise<UserPreferences> {
  const res = await fetch(`${getBase()}/api/preferences`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}

/** Update user preferences */
export async function updatePreferences(input: UpdatePreferencesInput): Promise<UserPreferences> {
  const res = await fetch(`${getBase()}/api/preferences`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}

/** Reset user preferences to defaults */
export async function resetPreferences(): Promise<{ success: boolean }> {
  const res = await fetch(`${getBase()}/api/preferences`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}
