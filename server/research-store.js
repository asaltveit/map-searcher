/**
 * Research store in Redis.
 * Hybrid: my research (research:{userId}:{id}) + shared library (research:library:{id}).
 * Single-user: research:{id}.
 */
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
let redis = null;

function getRedis() {
  if (!redis) redis = new Redis(REDIS_URL);
  return redis;
}

const MAX_CONTENT_LENGTH = 100_000;
const MAX_TITLE_LENGTH = 500;
const MAX_SOURCE_URL_LENGTH = 2048;
const ALLOWED_URL_SCHEMES = ['http:', 'https:'];

function validateUrl(url) {
  if (typeof url !== 'string' || url.length > MAX_SOURCE_URL_LENGTH) return false;
  try {
    const u = new URL(url);
    return ALLOWED_URL_SCHEMES.includes(u.protocol);
  } catch {
    return false;
  }
}

function sanitizeString(s, maxLen) {
  if (s == null) return '';
  const t = String(s).slice(0, maxLen);
  return t;
}

/**
 * Search: my research first, then shared library. Returns combined with source.
 */
export async function searchResearch(query, userId) {
  const r = getRedis();
  const enableHybrid = process.env.ENABLE_HYBRID_MULTI_USER === 'true';
  const q = sanitizeString(query, 500).toLowerCase();
  const results = [];

  if (enableHybrid && userId) {
    const userKeys = await r.keys(`research:${userId}:*`);
    for (const key of userKeys) {
      const raw = await r.get(key);
      if (!raw) continue;
      try {
        const entry = JSON.parse(raw);
        const content = (entry.content || '').toLowerCase();
        const title = (entry.title || '').toLowerCase();
        if (q && content.indexOf(q) === -1 && title.indexOf(q) === -1) continue;
        results.push({ ...entry, id: key.split(':').pop(), source: 'user' });
      } catch {
        /* skip */
      }
    }
  }

  const libKeys = enableHybrid ? await r.keys('research:library:*') : await r.keys('research:*');
  for (const key of libKeys) {
    if (enableHybrid && key.startsWith(`research:${userId}:`)) continue;
    const raw = await r.get(key);
    if (!raw) continue;
    try {
      const entry = JSON.parse(raw);
      const content = (entry.content || '').toLowerCase();
      const title = (entry.title || '').toLowerCase();
      if (q && content.indexOf(q) === -1 && title.indexOf(q) === -1) continue;
      const id = key.includes('library') ? key.split(':').pop() : key.replace('research:', '');
      results.push({
        ...entry,
        id,
        source: key.includes('library') ? 'library' : 'user',
      });
    } catch {
      /* skip */
    }
  }

  results.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  return results.slice(0, 50);
}

/**
 * Save to my research (per-user) only. Validates and sanitizes input.
 */
export async function saveResearch({ content, source_url, title }, userId) {
  if (!content || typeof content !== 'string') throw new Error('content required');
  if (!source_url || !validateUrl(source_url)) throw new Error('valid source_url required');
  const safeContent = sanitizeString(content, MAX_CONTENT_LENGTH);
  const safeTitle = sanitizeString(title, MAX_TITLE_LENGTH);
  const id = uuidv4();
  const r = getRedis();
  const enableHybrid = process.env.ENABLE_HYBRID_MULTI_USER === 'true';
  const key = enableHybrid && userId ? `research:${userId}:${id}` : `research:${id}`;
  const entry = {
    content: safeContent,
    source_url,
    title: safeTitle || undefined,
    created_at: new Date().toISOString(),
  };
  await r.set(key, JSON.stringify(entry));
  return { id, created_at: entry.created_at };
}
