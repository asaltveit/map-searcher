import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { LettaService } from "../../letta/letta.service";
import { TracingService } from "../../tracing/tracing.service";
import {
  NewsWorkflowService,
  ProcessedArticle,
  NEWS_WORKFLOW_QUEUE,
} from "../news-workflow.service";
import { NEWS_ORCHESTRATOR_CONFIG } from "../agents/news-orchestrator.config";
import { WorkflowStatus } from "@prisma/client";

interface WorkflowJobData {
  workflowId: string;
  userId: string;
}

interface LettaMessage {
  message_type?: string;
  assistant_message?: string;
  tool_call?: {
    name: string;
    arguments: string;
  };
  tool_return?: string;
  content?: string;
}

@Processor(NEWS_WORKFLOW_QUEUE)
export class WorkflowProcessor extends WorkerHost {
  private readonly logger = new Logger(WorkflowProcessor.name);

  constructor(
    private readonly newsWorkflowService: NewsWorkflowService,
    private readonly lettaService: LettaService,
    private readonly tracingService: TracingService,
  ) {
    super();
  }

  async process(
    job: Job<WorkflowJobData>,
  ): Promise<{ success: boolean; articlesProcessed: number }> {
    const { workflowId, userId } = job.data;
    this.logger.log(`Processing workflow ${workflowId} for user ${userId}`);

    try {
      // Update status to SEARCHING
      await this.newsWorkflowService.updateWorkflowStatus(
        workflowId,
        WorkflowStatus.SEARCHING,
        { startedAt: new Date() },
      );

      // Get workflow details
      const workflow = await this.newsWorkflowService.getWorkflow(workflowId);
      if (!workflow) {
        throw new Error(`Workflow not found: ${workflowId}`);
      }

      // Execute the workflow with tracing
      const result = await this.tracingService.trace(
        `NewsWorkflow:${workflowId}`,
        async () => this.executeWorkflow(workflowId, workflow),
      );

      // Update status to COMPLETED
      await this.newsWorkflowService.updateWorkflowStatus(
        workflowId,
        WorkflowStatus.COMPLETED,
        {
          completedAt: new Date(),
          traceId: `NewsWorkflow:${workflowId}`,
        },
      );

      this.logger.log(
        `Completed workflow ${workflowId}: ${result.articlesProcessed} articles processed`,
      );

      return { success: true, articlesProcessed: result.articlesProcessed };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Workflow ${workflowId} failed: ${errorMessage}`);

      await this.newsWorkflowService.updateWorkflowStatus(
        workflowId,
        WorkflowStatus.FAILED,
        {
          errorMessage,
          completedAt: new Date(),
        },
      );

      throw error;
    }
  }

  private async executeWorkflow(
    workflowId: string,
    workflow: {
      query: string;
      region: string;
      fromDate: Date;
      toDate: Date;
      maxArticles: number;
    },
  ): Promise<{ articlesProcessed: number }> {
    // Create or get the orchestrator agent
    const agent = await this.getOrCreateOrchestratorAgent();

    // Update workflow with agent ID
    await this.newsWorkflowService.updateWorkflowStatus(
      workflowId,
      WorkflowStatus.SEARCHING,
      { lettaAgentId: agent.id },
    );

    // Format date range for the search
    const fromDateStr = workflow.fromDate.toISOString().split("T")[0];
    const toDateStr = workflow.toDate.toISOString().split("T")[0];

    // Construct the search prompt
    const searchPrompt = `
Search for news articles about "${workflow.query}" in ${workflow.region} from ${fromDateStr} to ${toDateStr}.

Find up to ${workflow.maxArticles} relevant articles. For each article:
1. Extract the title, URL, source, and publication date
2. Get the full article content
3. Extract all location mentions (addresses, intersections, businesses, parks, landmarks)
4. Generate a 2-3 sentence summary
5. List 3-5 key points
6. Determine the sentiment (positive, negative, or neutral)

Return the results as a JSON array of articles. Each article should have:
- url, title, source, publishedAt, content
- summary, keyPoints (array), sentiment
- locations (array with mention, mentionType, context)

Focus on articles that mention specific locations within ${workflow.region}.
`;

    // Send the message to the agent
    const response = await this.lettaService.sendMessage(agent.id, {
      content: searchPrompt,
    });

    // Update status to PROCESSING
    await this.newsWorkflowService.updateWorkflowStatus(
      workflowId,
      WorkflowStatus.PROCESSING,
    );

    // Parse the agent response to extract articles
    // Cast to our expected interface since Letta types can vary
    const articles = this.parseAgentResponse(
      response as { messages: LettaMessage[] },
    );

    if (articles.length > 0) {
      // Update articles found count
      await this.newsWorkflowService.updateWorkflowStatus(
        workflowId,
        WorkflowStatus.PROCESSING,
        { articlesFound: articles.length },
      );

      // Save the articles (this will also geocode locations)
      const { savedCount } = await this.newsWorkflowService.saveArticleResults(
        workflowId,
        articles,
      );

      return { articlesProcessed: savedCount };
    }

    return { articlesProcessed: 0 };
  }

  private async getOrCreateOrchestratorAgent() {
    // Try to find existing orchestrator agent
    const existingAgents = await this.lettaService.listAgents();
    const orchestrator = existingAgents.find(
      (a) => a.name === NEWS_ORCHESTRATOR_CONFIG.name,
    );

    if (orchestrator) {
      return orchestrator;
    }

    // Create new orchestrator agent
    return this.lettaService.createAgent({
      name: NEWS_ORCHESTRATOR_CONFIG.name,
      description: NEWS_ORCHESTRATOR_CONFIG.description,
      model: NEWS_ORCHESTRATOR_CONFIG.model,
      embedding: NEWS_ORCHESTRATOR_CONFIG.embedding,
      system: NEWS_ORCHESTRATOR_CONFIG.system,
      memoryBlocks: NEWS_ORCHESTRATOR_CONFIG.memoryBlocks,
      tools: NEWS_ORCHESTRATOR_CONFIG.tools,
    });
  }

  private parseAgentResponse(response: {
    messages: LettaMessage[];
  }): ProcessedArticle[] {
    const articles: ProcessedArticle[] = [];

    // Look through the messages for JSON content
    for (const message of response.messages) {
      const messageType = message.message_type || "";

      // Check assistant messages for JSON
      if (messageType === "assistant_message" && message.assistant_message) {
        const parsed = this.extractJsonFromText(message.assistant_message);
        if (parsed) {
          articles.push(...this.normalizeArticles(parsed));
        }
      }

      // Check tool returns for JSON
      if (messageType === "tool_return_message" && message.tool_return) {
        const parsed = this.extractJsonFromText(message.tool_return);
        if (parsed) {
          articles.push(...this.normalizeArticles(parsed));
        }
      }

      // Also check content field which some message types use
      if (message.content && typeof message.content === "string") {
        const parsed = this.extractJsonFromText(message.content);
        if (parsed) {
          articles.push(...this.normalizeArticles(parsed));
        }
      }
    }

    return articles;
  }

  private extractJsonFromText(text: string): unknown {
    // Try to find JSON array in the text
    const jsonMatches = text.match(/\[[\s\S]*\]/);
    if (jsonMatches) {
      try {
        return JSON.parse(jsonMatches[0]);
      } catch {
        // Not valid JSON
      }
    }

    // Try to find JSON object in the text
    const objectMatches = text.match(/\{[\s\S]*\}/);
    if (objectMatches) {
      try {
        const parsed = JSON.parse(objectMatches[0]);
        // If it's a single article, wrap in array
        if (parsed.url && parsed.title) {
          return [parsed];
        }
        // If it has an articles property, use that
        if (parsed.articles && Array.isArray(parsed.articles)) {
          return parsed.articles;
        }
        return parsed;
      } catch {
        // Not valid JSON
      }
    }

    return null;
  }

  private normalizeArticles(data: unknown): ProcessedArticle[] {
    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .filter((item): item is Record<string, unknown> => {
        return (
          typeof item === "object" &&
          item !== null &&
          typeof (item as Record<string, unknown>).url === "string" &&
          typeof (item as Record<string, unknown>).title === "string"
        );
      })
      .map((item) => ({
        url: item.url as string,
        title: item.title as string,
        author: item.author as string | undefined,
        source: (item.source as string) || "Unknown",
        publishedAt:
          (item.publishedAt as string) ||
          (item.published_at as string) ||
          new Date().toISOString(),
        content: item.content as string | undefined,
        imageUrl:
          (item.imageUrl as string | undefined) ||
          (item.image_url as string | undefined),
        summary: item.summary as string | undefined,
        keyPoints: Array.isArray(item.keyPoints)
          ? item.keyPoints
          : Array.isArray(item.key_points)
            ? item.key_points
            : undefined,
        sentiment: item.sentiment as string | undefined,
        locations: this.normalizeLocations(item.locations),
      }));
  }

  private normalizeLocations(
    locations: unknown,
  ): Array<{ mention: string; mentionType: string; context?: string }> {
    if (!Array.isArray(locations)) {
      return [];
    }

    return locations
      .filter((loc): loc is Record<string, unknown> => {
        return (
          typeof loc === "object" &&
          loc !== null &&
          typeof (loc as Record<string, unknown>).mention === "string"
        );
      })
      .map((loc) => ({
        mention: loc.mention as string,
        mentionType:
          (loc.mentionType as string) ||
          (loc.mention_type as string) ||
          (loc.type as string) ||
          "OTHER",
        context: loc.context as string | undefined,
      }));
  }
}
