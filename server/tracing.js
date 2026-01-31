/**
 * Optional W&B Weave tracing. Only active when WANDB_API_KEY is set.
 * Wraps key operations for latency and call tracking.
 */
let op = null;
let initialized = false;

async function ensureWeave() {
  if (initialized) return op != null;
  if (!process.env.WANDB_API_KEY) return false;
  try {
    const weave = await import('weave');
    if (weave.login && typeof weave.login === 'function') {
      await weave.login({ apiKey: process.env.WANDB_API_KEY });
    }
    if (weave.init && typeof weave.init === 'function') {
      await weave.init('weave-hacks');
      initialized = true;
    }
    if (weave.op && typeof weave.op === 'function') {
      op = weave.op;
    }
  } catch (e) {
    console.warn('Weave tracing disabled:', e.message);
    initialized = true; // avoid retrying
  }
  return op != null;
}

/**
 * Run fn with optional Weave op tracing. Returns fn() result; no-op if Weave not available.
 * @param {string} name - Operation name for the trace
 * @param {() => Promise<T>} fn - Async function to run
 * @returns {Promise<T>}
 */
export async function trace(name, fn) {
  const ok = await ensureWeave();
  if (ok && op) {
    const traced = op(fn, { name });
    return traced();
  }
  return fn();
}

export function isTracingEnabled() {
  return !!process.env.WANDB_API_KEY;
}
