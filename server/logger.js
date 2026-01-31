/**
 * Structured "wide event" logging for request and workflow observability.
 * Logs JSON lines with timestamp, event, and context (route, userId, duration, etc.).
 */
function nowIso() {
  return new Date().toISOString();
}

/**
 * Log a single event as a JSON line. Include all relevant context for debugging and monitoring.
 * @param {string} event - Event name (e.g. request_start, request_end, workflow_error)
 * @param {Record<string, unknown>} data - Arbitrary key-value context
 */
export function log(event, data = {}) {
  const payload = { ts: nowIso(), event, ...data };
  try {
    console.log(JSON.stringify(payload));
  } catch (e) {
    console.error(JSON.stringify({ ts: nowIso(), event: 'log_error', error: String(e?.message || e) }));
  }
}

/**
 * Middleware: attach requestId and log request_end with duration, statusCode, userId.
 * Call log('request_start', ...) at entry if desired; this logs on finish.
 */
export function requestLogger(req, res, next) {
  const requestId = crypto.randomUUID?.() ?? `req-${Date.now()}`;
  req.requestId = requestId;
  const start = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - start;
    log('request_end', {
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs,
      userId: req.userId ?? undefined,
    });
  });
  next();
}
