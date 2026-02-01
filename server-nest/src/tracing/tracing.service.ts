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
   * Tracing errors are logged but don't affect the main function result.
   */
  async trace<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const ok = await this.ensureWeave();
    if (!ok || !this.op) {
      return fn();
    }

    // Store the result separately so we can return it even if Weave fails after fn() completes
    let result: T;
    let fnCompleted = false;

    try {
      // Create a wrapper that captures the result before Weave processes it
      const wrappedFn = async (): Promise<T> => {
        result = await fn();
        fnCompleted = true;
        return result;
      };

      const traced = this.op(wrappedFn, { name });
      return await traced();
    } catch (error) {
      // Check if the function completed successfully before Weave failed
      if (fnCompleted) {
        // The function ran successfully but Weave failed (likely 403, network error, etc.)
        this.logger.warn(
          `[TRACING] Weave reporting failed after fn completed (name=${name}): ${
            error instanceof Response
              ? `Response ${error.status}`
              : error instanceof Error
                ? error.message
                : String(error)
          }. Returning successful result.`,
        );
        return result!;
      }

      // The function itself failed, re-throw the error
      throw error;
    }
  }

  /**
   * Run fn(input) with optional Weave op tracing.
   * The input is recorded in the trace (e.g. the question sent to an agent).
   * Returns fn(input) result; no-op if Weave not available.
   * Tracing errors are logged but don't affect the main function result.
   */
  async traceWithInput<T, I>(name: string, fn: (input: I) => Promise<T>, input: I): Promise<T> {
    const ok = await this.ensureWeave();
    if (!ok || !this.op) {
      return fn(input);
    }

    // Store the result separately so we can return it even if Weave fails after fn() completes
    let result: T;
    let fnCompleted = false;

    try {
      // Create a wrapper that captures the result before Weave processes it
      const wrappedFn = async (inp: I): Promise<T> => {
        result = await fn(inp);
        fnCompleted = true;
        return result;
      };

      const traced = this.op(wrappedFn, { name });
      return await traced(input);
    } catch (error) {
      // Check if the function completed successfully before Weave failed
      if (fnCompleted) {
        // The function ran successfully but Weave failed (likely 403, network error, etc.)
        this.logger.warn(
          `[TRACING] Weave reporting failed after fn completed (name=${name}): ${
            error instanceof Response
              ? `Response ${error.status}`
              : error instanceof Error
                ? error.message
                : String(error)
          }. Returning successful result.`,
        );
        return result!;
      }

      // The function itself failed, re-throw the error
      throw error;
    }
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
