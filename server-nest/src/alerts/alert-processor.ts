import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { LettaService } from "../letta/letta.service";
import { TracingService } from "../tracing/tracing.service";
import { AlertsService, ALERTS_QUEUE, ProcessedArticle } from "./alerts.service";
import { NEWS_ORCHESTRATOR_CONFIG } from "../news-workflow/agents/news-orchestrator.config";

interface AlertJobData {
  alertId: string;
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

@Processor(ALERTS_QUEUE)
export class AlertProcessor extends WorkerHost {
  private readonly logger = new Logger(AlertProcessor.name);

  constructor(
    private readonly alertsService: AlertsService,
    private readonly lettaService: LettaService,
    private readonly tracingService: TracingService,
  ) {
    super();
  }

  async process(
    job: Job<AlertJobData>,
  ): Promise<{ success: boolean; articlesProcessed: number }> {
    const { alertId, userId } = job.data;
    this.logger.log(`Processing alert ${alertId} for user ${userId}`);

    try {
      // Get alert details
      const alert = await this.alertsService.getAlertById(alertId);
      if (!alert) {
        throw new Error(`Alert not found: ${alertId}`);
      }

      if (!alert.isActive) {
        this.logger.log(`Alert ${alertId} is inactive, skipping`);
        return { success: true, articlesProcessed: 0 };
      }

      // Execute the alert with tracing
      const result = await this.tracingService.trace(
        `Alert:${alertId}`,
        async () => this.executeAlert(alertId, alert),
      );

      // Update alert after run
      await this.alertsService.updateAlertAfterRun(alertId, result.articlesProcessed);

      this.logger.log(
        `Completed alert ${alertId}: ${result.articlesProcessed} articles processed`,
      );

      return { success: true, articlesProcessed: result.articlesProcessed };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Alert ${alertId} failed: ${errorMessage}`);
      throw error;
    }
  }

  private async executeAlert(
    alertId: string,
    alert: {
      query: string;
      region: string;
      maxArticles: number;
      lastRunAt: Date | null;
    },
  ): Promise<{ articlesProcessed: number }> {
    // Create or get the orchestrator agent
    const agent = await this.getOrCreateOrchestratorAgent();

    // Calculate date range: lastRunAt → now (or last 7 days for new alerts)
    const toDate = new Date();
    const fromDate = alert.lastRunAt
      ? new Date(alert.lastRunAt)
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const fromDateStr = fromDate.toISOString().split("T")[0];
    const toDateStr = toDate.toISOString().split("T")[0];

    // Construct the search prompt
    const searchPrompt = `
IMPORTANT: When using web_search, your query MUST include the location.
Search query should be: "${alert.query} ${alert.region}"

Search for news articles about "${alert.query}" in ${alert.region} from ${fromDateStr} to ${toDateStr}.

Find up to ${alert.maxArticles} relevant articles. For each article:
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

Focus on articles that mention specific locations within ${alert.region}.
`;

    // Send the message to the agent
    const response = await this.lettaService.sendMessage(agent.id, {
      content: searchPrompt,
    });

    // Parse the agent response to extract articles
    const articles = this.parseAgentResponse(
      response as { messages: LettaMessage[] },
    );

    if (articles.length > 0) {
      // Save the articles (this will also geocode locations)
      const { savedCount } = await this.alertsService.saveAlertArticles(
        alertId,
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

    // Create new orchestrator agent with autoclear enabled
    return this.lettaService.createAgent({
      name: NEWS_ORCHESTRATOR_CONFIG.name,
      description: NEWS_ORCHESTRATOR_CONFIG.description,
      model: NEWS_ORCHESTRATOR_CONFIG.model,
      embedding: NEWS_ORCHESTRATOR_CONFIG.embedding,
      system: NEWS_ORCHESTRATOR_CONFIG.system,
      memoryBlocks: NEWS_ORCHESTRATOR_CONFIG.memoryBlocks,
      tools: NEWS_ORCHESTRATOR_CONFIG.tools,
      messageBufferAutoclear: NEWS_ORCHESTRATOR_CONFIG.messageBufferAutoclear,
    });
  }

  private parseAgentResponse(response: {
    messages: LettaMessage[];
  }): ProcessedArticle[] {
    const articles: ProcessedArticle[] = [];

    for (const message of response.messages) {
      const messageType = message.message_type || "";

      if (messageType === "assistant_message" && message.assistant_message) {
        const parsed = this.extractJsonFromText(message.assistant_message);
        if (parsed) {
          articles.push(...this.normalizeArticles(parsed));
        }
      }

      if (messageType === "tool_return_message" && message.tool_return) {
        const parsed = this.extractJsonFromText(message.tool_return);
        if (parsed) {
          articles.push(...this.normalizeArticles(parsed));
        }
      }

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
    const jsonMatches = text.match(/\[[\s\S]*\]/);
    if (jsonMatches) {
      try {
        return JSON.parse(jsonMatches[0]);
      } catch {
        // Not valid JSON
      }
    }

    const objectMatches = text.match(/\{[\s\S]*\}/);
    if (objectMatches) {
      try {
        const parsed = JSON.parse(objectMatches[0]);
        if (parsed.url && parsed.title) {
          return [parsed];
        }
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
