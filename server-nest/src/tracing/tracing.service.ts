import { Injectable, Logger } from "@nestjs/common";

/**
 * Optional W&B Weave tracing service.
 * Only active when WANDB_API_KEY is set.
 * Wraps key operations for latency and call tracking.
 */
@Injectable()
export class TracingService {
  private readonly logger = new Logger(TracingService.name);
  private op: any = null;
  private initialized = false;

  /**
   * Run fn with optional Weave op tracing.
   * Returns fn() result; no-op if Weave not available.
   */
  async trace<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const ok = await this.ensureWeave();
    if (ok && this.op) {
      const traced = this.op(fn, { name });
      return traced();
    }
    return fn();
  }

  /**
   * Run fn(input) with optional Weave op tracing.
   * The input is recorded in the trace (e.g. the question sent to an agent).
   * Returns fn(input) result; no-op if Weave not available.
   */
  async traceWithInput<T, I>(name: string, fn: (input: I) => Promise<T>, input: I): Promise<T> {
    const ok = await this.ensureWeave();
    if (ok && this.op) {
      const traced = this.op(fn, { name });
      return traced(input);
    }
    return fn(input);
  }

  isTracingEnabled(): boolean {
    return !!process.env.WANDB_API_KEY;
  }

  private async ensureWeave(): Promise<boolean> {
    if (this.initialized) return this.op != null;
    if (!process.env.WANDB_API_KEY) return false;

    try {
      const weave = await import("weave");
      // Skip login() when WANDB_API_KEY is already set (e.g. from .env). login() tries to
      // write to ~/.netrc and warns if it can't; init() uses process.env.WANDB_API_KEY.
      if (weave.init && typeof weave.init === "function") {
        // Use entity/project to avoid "Default entity name not found" (W&B GraphQL defaultEntity)
        const entity = process.env.WANDB_ENTITY?.trim();
        const projectId = entity ? `${entity}/map-searcher` : "map-searcher";
        await weave.init(projectId);
        this.initialized = true;
      }
      if (weave.op && typeof weave.op === "function") {
        this.op = weave.op;
      }
      this.logger.log("Weave tracing initialized");
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      this.logger.warn(`Weave tracing disabled: ${message}`);
      this.initialized = true; // avoid retrying
    }

    return this.op != null;
  }
}
