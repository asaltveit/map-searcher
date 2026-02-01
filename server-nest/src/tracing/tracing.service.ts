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

  isTracingEnabled(): boolean {
    return !!process.env.WANDB_API_KEY;
  }

  private async ensureWeave(): Promise<boolean> {
    if (this.initialized) return this.op != null;
    if (!process.env.WANDB_API_KEY) return false;

    try {
      const weave = await import("weave");
      if (weave.login && typeof weave.login === "function") {
        await weave.login({ apiKey: process.env.WANDB_API_KEY });
      }
      if (weave.init && typeof weave.init === "function") {
        await weave.init("map-searcher");
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
