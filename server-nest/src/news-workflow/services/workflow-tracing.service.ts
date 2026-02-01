import { Injectable, Logger } from "@nestjs/common";
import { TracingService } from "../../tracing/tracing.service";

@Injectable()
export class WorkflowTracingService {
  private readonly logger = new Logger(WorkflowTracingService.name);

  constructor(private readonly tracingService: TracingService) {}

  /**
   * Trace a workflow execution
   */
  async traceWorkflow<T>(
    workflowId: string,
    query: string,
    fn: () => Promise<T>,
  ): Promise<T> {
    return this.tracingService.trace(`NewsWorkflow:${workflowId}`, async () => {
      this.logger.log({ event: "workflow_start", workflowId, query });
      const result = await fn();
      this.logger.log({ event: "workflow_complete", workflowId });
      return result;
    });
  }

  /**
   * Trace a single article processing step
   */
  async traceArticleProcessing<T>(
    workflowId: string,
    articleUrl: string,
    fn: () => Promise<T>,
  ): Promise<T> {
    return this.tracingService.trace(
      `Article:${workflowId.substring(0, 8)}`,
      async () => {
        this.logger.debug({
          event: "article_processing",
          workflowId,
          articleUrl,
        });
        return fn();
      },
    );
  }

  /**
   * Trace geocoding operation
   */
  async traceGeocoding<T>(location: string, fn: () => Promise<T>): Promise<T> {
    return this.tracingService.trace("Geocode", async () => {
      this.logger.debug({ event: "geocoding", location });
      return fn();
    });
  }
}
