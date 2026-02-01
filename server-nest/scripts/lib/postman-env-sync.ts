/**
 * Postman Environment Sync Helper Functions
 *
 * This module provides helper functions for syncing environment files
 * to Postman workspace via the Postman API.
 */

export interface PostmanEnvironment {
  id?: string;
  name: string;
  values: Array<{
    key: string;
    value: string;
    type: 'default' | 'secret';
    enabled: boolean;
  }>;
  _postman_variable_scope?: string;
}

export interface PostmanApiEnvironmentResponse {
  environment: PostmanEnvironment;
}

export interface PostmanApiEnvironmentsListResponse {
  environments: Array<{
    id: string;
    name: string;
    uid: string;
  }>;
}

export class EnvSyncError extends Error {
  constructor(
    message: string,
    public code:
      | 'MISSING_CONFIG'
      | 'ENV_NOT_FOUND'
      | 'API_ERROR'
      | 'RATE_LIMIT'
      | 'AUTH_ERROR'
      | 'NETWORK_ERROR'
      | 'FILE_NOT_FOUND',
    public details?: any,
  ) {
    super(message);
    this.name = 'EnvSyncError';
  }
}

/**
 * Check if environment exists in Postman by ID
 */
export async function environmentExists(
  apiKey: string,
  environmentId: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.getpostman.com/environments/${environmentId}`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': apiKey,
        },
      },
    );

    return response.status === 200;
  } catch (error) {
    return false;
  }
}

/**
 * Find environment by name in Postman (global search)
 */
export async function findEnvironmentByName(
  apiKey: string,
  name: string,
): Promise<string | null> {
  try {
    const response = await fetch('https://api.getpostman.com/environments', {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data =
      (await response.json()) as PostmanApiEnvironmentsListResponse;
    const env = data.environments.find((e) => e.name === name);

    return env ? env.id : null;
  } catch (error) {
    return null;
  }
}

/**
 * List all environments in a specific workspace
 */
export async function listEnvironmentsInWorkspace(
  apiKey: string,
  workspaceId: string,
): Promise<Array<{ id: string; name: string; uid: string }>> {
  try {
    const response = await fetch(
      `https://api.getpostman.com/environments?workspace=${workspaceId}`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': apiKey,
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    const data =
      (await response.json()) as PostmanApiEnvironmentsListResponse;
    return data.environments || [];
  } catch (error) {
    return [];
  }
}

/**
 * Find environment by name within a specific workspace
 */
export async function findEnvironmentByNameInWorkspace(
  apiKey: string,
  name: string,
  workspaceId: string,
): Promise<string | null> {
  const environments = await listEnvironmentsInWorkspace(apiKey, workspaceId);
  const env = environments.find((e) => e.name === name);
  return env ? env.id : null;
}

/**
 * Create new environment in Postman
 */
export async function createEnvironment(
  apiKey: string,
  environment: PostmanEnvironment,
  workspaceId?: string,
): Promise<{ id: string; name: string }> {
  // Use workspace query parameter to link environment to workspace
  // Without this, environment is created in oldest personal workspace
  const url = workspaceId
    ? `https://api.getpostman.com/environments?workspace=${workspaceId}`
    : 'https://api.getpostman.com/environments';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      environment: {
        name: environment.name,
        values: environment.values,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorBody: any;
    try {
      errorBody = JSON.parse(errorText);
    } catch {
      errorBody = { message: errorText };
    }

    if (response.status === 401 || response.status === 403) {
      throw new EnvSyncError(
        `Authentication failed: ${errorBody.error?.message || 'Invalid API key'}\n` +
          'Please verify your POSTMAN_API_KEY in .env file.\n' +
          'Generate a new key at: https://web.postman.co/settings/me/api-keys',
        'AUTH_ERROR',
        errorBody,
      );
    }

    if (response.status === 429) {
      const retryAfter = response.headers.get('X-RateLimit-RetryAfter');
      throw new EnvSyncError(
        `Rate limit exceeded (300 requests/minute).\n` +
          `Retry after: ${retryAfter || 'unknown'} seconds`,
        'RATE_LIMIT',
        errorBody,
      );
    }

    throw new EnvSyncError(
      `Failed to create environment: ${errorBody.error?.message || response.statusText}`,
      'API_ERROR',
      errorBody,
    );
  }

  const data = (await response.json()) as PostmanApiEnvironmentResponse;
  return {
    id: data.environment.id!,
    name: data.environment.name,
  };
}

/**
 * Update existing environment in Postman
 */
export async function updateEnvironment(
  apiKey: string,
  environmentId: string,
  environment: PostmanEnvironment,
  workspaceId?: string,
): Promise<{ id: string; name: string }> {
  // Update environment with workspace query parameter for visibility
  const url = `https://api.getpostman.com/environments/${environmentId}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      environment: {
        name: environment.name,
        values: environment.values,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorBody: any;
    try {
      errorBody = JSON.parse(errorText);
    } catch {
      errorBody = { message: errorText };
    }

    if (response.status === 401 || response.status === 403) {
      throw new EnvSyncError(
        `Authentication failed: ${errorBody.error?.message || 'Invalid API key'}\n` +
          'Please verify your POSTMAN_API_KEY in .env file.\n' +
          'Generate a new key at: https://web.postman.co/settings/me/api-keys',
        'AUTH_ERROR',
        errorBody,
      );
    }

    if (response.status === 404) {
      throw new EnvSyncError(
        `Environment not found with ID: ${environmentId}\n` +
          'The environment may have been deleted in Postman.\n' +
          'Remove the environment ID from .env to create a new one.',
        'ENV_NOT_FOUND',
        errorBody,
      );
    }

    if (response.status === 429) {
      const retryAfter = response.headers.get('X-RateLimit-RetryAfter');
      throw new EnvSyncError(
        `Rate limit exceeded (300 requests/minute).\n` +
          `Retry after: ${retryAfter || 'unknown'} seconds`,
        'RATE_LIMIT',
        errorBody,
      );
    }

    throw new EnvSyncError(
      `Failed to update environment: ${errorBody.error?.message || response.statusText}`,
      'API_ERROR',
      errorBody,
    );
  }

  const data = (await response.json()) as PostmanApiEnvironmentResponse;
  return {
    id: data.environment.id!,
    name: data.environment.name,
  };
}

/**
 * Sync environment to Postman (create or update)
 */
export async function syncEnvironment(
  apiKey: string,
  environment: PostmanEnvironment,
  environmentId?: string,
  workspaceId?: string,
): Promise<{ id: string; name: string; action: 'created' | 'updated' }> {
  // If environment ID is provided, try to update
  if (environmentId) {
    const exists = await environmentExists(apiKey, environmentId);
    if (exists) {
      const result = await updateEnvironment(
        apiKey,
        environmentId,
        environment,
        workspaceId,
      );
      return { ...result, action: 'updated' };
    } else {
      console.warn(
        `⚠️  Environment ID ${environmentId} not found in Postman, will create new one`,
      );
    }
  }

  // When workspace is provided, search within that workspace (not globally)
  // This finds existing environments in the correct workspace and updates them
  if (workspaceId) {
    const existingIdInWorkspace = await findEnvironmentByNameInWorkspace(
      apiKey,
      environment.name,
      workspaceId,
    );
    if (existingIdInWorkspace) {
      console.log(
        `   Found existing environment "${environment.name}" in workspace, updating...`,
      );
      const result = await updateEnvironment(
        apiKey,
        existingIdInWorkspace,
        environment,
        workspaceId,
      );
      return { ...result, action: 'updated' };
    }
    // Only create if not found in workspace
    console.log(
      `   Environment "${environment.name}" not found in workspace, creating...`,
    );
    const result = await createEnvironment(apiKey, environment, workspaceId);
    return { ...result, action: 'created' };
  }

  // For global environments (no workspace), try to find by name first
  const existingId = await findEnvironmentByName(apiKey, environment.name);
  if (existingId) {
    const result = await updateEnvironment(
      apiKey,
      existingId,
      environment,
      workspaceId,
    );
    return { ...result, action: 'updated' };
  }

  // Create new environment globally
  const result = await createEnvironment(apiKey, environment, workspaceId);
  return { ...result, action: 'created' };
}
