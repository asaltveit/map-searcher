/**
 * Redis Configuration Utility
 *
 * SINGLE SOURCE OF TRUTH for Redis connection configuration.
 * Used by both the NestJS app (BullMQ) and E2E tests (QueueEvents).
 *
 * Priority: REDIS_URL (if set) > individual env vars (REDIS_HOST, REDIS_PORT, etc.)
 *
 * CRITICAL: Both CI and local tests must use the same configuration.
 * See .env.test for local config, .github/workflows/ci.yml for CI config.
 * Any port changes must be coordinated across both files.
 */

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  tls: boolean;
}

/**
 * Get Redis configuration from environment variables.
 *
 * Supports two configuration methods:
 * 1. REDIS_URL (preferred) - Full Redis URL (e.g., redis://localhost:6379 or rediss://user:pass@host:port)
 * 2. Individual vars (fallback) - REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_USE_TLS
 *
 * @returns RedisConfig object with parsed connection details
 */
export function getRedisConfig(): RedisConfig {
  const redisUrl = process.env.REDIS_URL;

  if (redisUrl) {
    try {
      const url = new URL(redisUrl);
      return {
        host: url.hostname,
        port: url.port ? parseInt(url.port, 10) : 6379,
        password: url.password || undefined,
        tls: url.protocol === "rediss:", // rediss:// = TLS enabled
      };
    } catch {
      console.error(`❌ Invalid REDIS_URL format: ${redisUrl}`);
      throw new Error("Invalid REDIS_URL format");
    }
  }

  // Fallback to individual environment variables
  return {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    password: process.env.REDIS_PASSWORD || undefined,
    tls: process.env.REDIS_USE_TLS === "true",
  };
}

/**
 * Check if Redis is configured (host is available).
 * Useful for conditional initialization in environments without Redis (e.g., CI builds).
 */
export function isRedisConfigured(): boolean {
  const redisUrl = process.env.REDIS_URL;
  const redisHost = process.env.REDIS_HOST;
  return !!(redisUrl || redisHost);
}
