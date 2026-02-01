import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";

export interface ResearchEntry {
  id: string;
  content: string;
  source_url: string;
  title?: string;
  created_at: string;
  source: "user" | "library";
}

const MAX_CONTENT_LENGTH = 100_000;
const MAX_TITLE_LENGTH = 500;
const MAX_SOURCE_URL_LENGTH = 2048;
const ALLOWED_URL_SCHEMES = ["http:", "https:"];

@Injectable()
export class ResearchService {
  private readonly logger = new Logger(ResearchService.name);
  private redis: Redis | null = null;

  private getRedis(): Redis {
    if (!this.redis) {
      const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
      this.redis = new Redis(redisUrl);
    }
    return this.redis;
  }

  private validateUrl(url: string): boolean {
    if (typeof url !== "string" || url.length > MAX_SOURCE_URL_LENGTH)
      return false;
    try {
      const u = new URL(url);
      return ALLOWED_URL_SCHEMES.includes(u.protocol);
    } catch {
      return false;
    }
  }

  private sanitizeString(s: any, maxLen: number): string {
    if (s == null) return "";
    return String(s).slice(0, maxLen);
  }

  /**
   * Search: my research first, then shared library. Returns combined with source.
   */
  async searchResearch(
    query: string,
    userId: string,
  ): Promise<ResearchEntry[]> {
    const r = this.getRedis();
    const enableHybrid = process.env.ENABLE_HYBRID_MULTI_USER === "true";
    const q = this.sanitizeString(query, 500).toLowerCase();
    const results: ResearchEntry[] = [];

    if (enableHybrid && userId) {
      const userKeys = await r.keys(`research:${userId}:*`);
      for (const key of userKeys) {
        const raw = await r.get(key);
        if (!raw) continue;
        try {
          const entry = JSON.parse(raw);
          const content = (entry.content || "").toLowerCase();
          const title = (entry.title || "").toLowerCase();
          if (q && content.indexOf(q) === -1 && title.indexOf(q) === -1)
            continue;
          results.push({
            ...entry,
            id: key.split(":").pop()!,
            source: "user",
          });
        } catch {
          /* skip */
        }
      }
    }

    const libKeys = enableHybrid
      ? await r.keys("research:library:*")
      : await r.keys("research:*");

    for (const key of libKeys) {
      if (enableHybrid && key.startsWith(`research:${userId}:`)) continue;
      const raw = await r.get(key);
      if (!raw) continue;
      try {
        const entry = JSON.parse(raw);
        const content = (entry.content || "").toLowerCase();
        const title = (entry.title || "").toLowerCase();
        if (q && content.indexOf(q) === -1 && title.indexOf(q) === -1) continue;
        const id = key.includes("library")
          ? key.split(":").pop()!
          : key.replace("research:", "");
        results.push({
          ...entry,
          id,
          source: key.includes("library") ? "library" : "user",
        });
      } catch {
        /* skip */
      }
    }

    results.sort((a, b) =>
      (b.created_at || "").localeCompare(a.created_at || ""),
    );
    return results.slice(0, 50);
  }

  /**
   * Save to my research (per-user) only. Validates and sanitizes input.
   */
  async saveResearch(
    data: { content: string; source_url: string; title?: string },
    userId: string,
  ): Promise<{ id: string; created_at: string }> {
    if (!data.content || typeof data.content !== "string") {
      throw new BadRequestException("content required");
    }
    if (!data.source_url || !this.validateUrl(data.source_url)) {
      throw new BadRequestException("valid source_url required");
    }

    const safeContent = this.sanitizeString(data.content, MAX_CONTENT_LENGTH);
    const safeTitle = this.sanitizeString(data.title, MAX_TITLE_LENGTH);
    const id = uuidv4();
    const r = this.getRedis();
    const enableHybrid = process.env.ENABLE_HYBRID_MULTI_USER === "true";
    const key =
      enableHybrid && userId ? `research:${userId}:${id}` : `research:${id}`;

    const entry = {
      content: safeContent,
      source_url: data.source_url,
      title: safeTitle || undefined,
      created_at: new Date().toISOString(),
    };

    await r.set(key, JSON.stringify(entry));
    return { id, created_at: entry.created_at };
  }
}
