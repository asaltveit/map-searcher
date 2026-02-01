/**
 * Postman API helpers for environment sync
 */

const POSTMAN_API_BASE = "https://api.getpostman.com";

interface PostmanEnvValue {
  key: string;
  value: string;
  type?: "default" | "secret";
  enabled?: boolean;
}

interface PostmanEnvironment {
  name: string;
  values: PostmanEnvValue[];
}

interface PostmanEnvResponse {
  environment: {
    id: string;
    name: string;
    values: PostmanEnvValue[];
  };
}

interface PostmanEnvListResponse {
  environments: Array<{
    id: string;
    name: string;
    uid: string;
  }>;
}

export async function getPostmanApiKey(): Promise<string> {
  const apiKey = process.env.POSTMAN_API_KEY;
  if (!apiKey) {
    throw new Error("POSTMAN_API_KEY environment variable is not set");
  }
  return apiKey;
}

export async function getWorkspaceId(): Promise<string> {
  const workspaceId = process.env.POSTMAN_WORKSPACE_ID;
  if (!workspaceId) {
    throw new Error("POSTMAN_WORKSPACE_ID environment variable is not set");
  }
  return workspaceId;
}

export async function listEnvironments(
  apiKey: string,
  workspaceId: string,
): Promise<PostmanEnvListResponse["environments"]> {
  const response = await fetch(
    `${POSTMAN_API_BASE}/environments?workspace=${workspaceId}`,
    {
      headers: {
        "X-Api-Key": apiKey,
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list environments: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as PostmanEnvListResponse;
  return data.environments;
}

export async function getEnvironment(
  apiKey: string,
  envId: string,
): Promise<PostmanEnvResponse["environment"]> {
  const response = await fetch(`${POSTMAN_API_BASE}/environments/${envId}`, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get environment: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as PostmanEnvResponse;
  return data.environment;
}

export async function createEnvironment(
  apiKey: string,
  workspaceId: string,
  environment: PostmanEnvironment,
): Promise<string> {
  const response = await fetch(
    `${POSTMAN_API_BASE}/environments?workspace=${workspaceId}`,
    {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ environment }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create environment: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as { environment: { id: string } };
  return data.environment.id;
}

export async function updateEnvironment(
  apiKey: string,
  envId: string,
  environment: PostmanEnvironment,
): Promise<void> {
  const response = await fetch(`${POSTMAN_API_BASE}/environments/${envId}`, {
    method: "PUT",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ environment }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update environment: ${response.status} - ${errorText}`);
  }
}

export async function syncEnvironment(
  apiKey: string,
  workspaceId: string,
  localEnv: PostmanEnvironment,
): Promise<{ action: "created" | "updated"; id: string }> {
  // List existing environments
  const environments = await listEnvironments(apiKey, workspaceId);

  // Find matching environment by name
  const existing = environments.find((env) => env.name === localEnv.name);

  if (existing) {
    // Update existing environment
    await updateEnvironment(apiKey, existing.id, localEnv);
    return { action: "updated", id: existing.id };
  } else {
    // Create new environment
    const id = await createEnvironment(apiKey, workspaceId, localEnv);
    return { action: "created", id };
  }
}
