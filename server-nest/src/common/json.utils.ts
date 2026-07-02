export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseArticleObject(parsed: unknown): unknown {
  if (!isRecord(parsed)) {
    return parsed;
  }

  if (typeof parsed.url === "string" && typeof parsed.title === "string") {
    return [parsed];
  }

  if (Array.isArray(parsed.articles)) {
    return parsed.articles;
  }

  return parsed;
}
