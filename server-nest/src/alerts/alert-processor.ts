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
    this.logger.log(`[PROCESSOR] ========== ALERT JOB START ==========`);
    this.logger.log(`[PROCESSOR] process START - jobId=${job.id}, alertId=${alertId}, userId=${userId}, attempt=${job.attemptsMade + 1}`);

    try {
      // Get alert details
      this.logger.log(`[PROCESSOR] Fetching alert details for alertId=${alertId}`);
      const alert = await this.alertsService.getAlertById(alertId);
      if (!alert) {
        this.logger.error(`[PROCESSOR] ALERT NOT FOUND - alertId=${alertId}`);
        throw new Error(`Alert not found: ${alertId}`);
      }

      this.logger.log(`[PROCESSOR] ALERT FOUND - alertId=${alertId}, query="${alert.query}", region="${alert.region}", maxArticles=${alert.maxArticles}, isActive=${alert.isActive}, lastRunAt=${alert.lastRunAt?.toISOString() || 'never'}`);

      if (!alert.isActive) {
        this.logger.log(`[PROCESSOR] Alert ${alertId} is INACTIVE, skipping execution`);
        return { success: true, articlesProcessed: 0 };
      }

      // Execute the alert with tracing
      this.logger.log(`[PROCESSOR] Starting alert execution with tracing...`);
      const result = await this.tracingService.trace(
        `Alert:${alertId}`,
        async () => this.executeAlert(alertId, alert),
      );

      this.logger.log(`[PROCESSOR] Alert execution completed - articlesProcessed=${result.articlesProcessed}`);

      // Update alert after run
      this.logger.log(`[PROCESSOR] Updating alert after run...`);
      await this.alertsService.updateAlertAfterRun(alertId, result.articlesProcessed);

      this.logger.log(`[PROCESSOR] ========== ALERT JOB SUCCESS ==========`);
      this.logger.log(`[PROCESSOR] Completed alertId=${alertId}: ${result.articlesProcessed} articles processed`);

      return { success: true, articlesProcessed: result.articlesProcessed };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`[PROCESSOR] ========== ALERT JOB FAILED ==========`);
      this.logger.error(`[PROCESSOR] Alert ${alertId} failed: ${errorMessage}`);
      this.logger.error(`[PROCESSOR] Full error: ${error instanceof Error ? error.stack : String(error)}`);

      // Mark alert as failed
      await this.alertsService.markAlertFailed(alertId);

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
    this.logger.log(`[PROCESSOR] executeAlert START - alertId=${alertId}, query="${alert.query}", region="${alert.region}"`);

    // Create or get the orchestrator agent
    this.logger.log(`[PROCESSOR] Getting or creating orchestrator agent...`);
    const agent = await this.getOrCreateOrchestratorAgent();
    this.logger.log(`[PROCESSOR] Using agent - id=${agent.id}, name=${agent.name}`);

    // Calculate date range: lastRunAt → now (or last 7 days for new alerts)
    const toDate = new Date();
    const fromDate = alert.lastRunAt
      ? new Date(alert.lastRunAt)
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const fromDateStr = fromDate.toISOString().split("T")[0];
    const toDateStr = toDate.toISOString().split("T")[0];

    this.logger.log(`[PROCESSOR] Date range - from=${fromDateStr}, to=${toDateStr}, lastRunAt=${alert.lastRunAt?.toISOString() || 'never'}`);

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

    this.logger.log(`[PROCESSOR] SENDING PROMPT TO AGENT - agentId=${agent.id}`);
    this.logger.log(`[PROCESSOR] PROMPT:\n${searchPrompt}`);

    // Send the message to the agent
    let response;
    try {
      response = await this.lettaService.sendMessage(agent.id, {
        content: searchPrompt,
      });
      this.logger.log(`[PROCESSOR] AGENT RESPONSE RECEIVED - type=${typeof response}`);
      this.logger.log(`[PROCESSOR] RAW AGENT RESPONSE: ${JSON.stringify(response).substring(0, 2000)}...`);
    } catch (error) {
      this.logger.error(`[PROCESSOR] AGENT CALL FAILED - error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }

    // Parse the agent response to extract articles
    this.logger.log(`[PROCESSOR] Parsing agent response for articles...`);
    const articles = this.parseAgentResponse(
      response as { messages: LettaMessage[] },
    );

    this.logger.log(`[PROCESSOR] PARSED ARTICLES - count=${articles.length}`);

    if (articles.length > 0) {
      this.logger.log(`[PROCESSOR] ARTICLES FOUND - ${JSON.stringify(articles.map(a => ({ url: a.url, title: a.title, locationCount: a.locations?.length || 0 })))}`);

      // Save the articles (this will also geocode locations)
      this.logger.log(`[PROCESSOR] Saving articles to database...`);
      const { savedCount } = await this.alertsService.saveAlertArticles(
        alertId,
        articles,
      );

      this.logger.log(`[PROCESSOR] executeAlert COMPLETE - savedCount=${savedCount}`);
      return { articlesProcessed: savedCount };
    } else {
      this.logger.warn(`[PROCESSOR] NO ARTICLES PARSED from agent response! Check the raw response above.`);
    }

    return { articlesProcessed: 0 };
  }

  private async getOrCreateOrchestratorAgent() {
    this.logger.log(`[PROCESSOR] getOrCreateOrchestratorAgent START`);

    // Try to find existing orchestrator agent
    this.logger.log(`[PROCESSOR] Listing existing agents...`);
    const existingAgents = await this.lettaService.listAgents();
    this.logger.log(`[PROCESSOR] Found ${existingAgents.length} existing agents`);

    const orchestrator = existingAgents.find(
      (a) => a.name === NEWS_ORCHESTRATOR_CONFIG.name,
    );

    if (orchestrator) {
      this.logger.log(`[PROCESSOR] FOUND existing orchestrator agent - id=${orchestrator.id}, name=${orchestrator.name}`);
      return orchestrator;
    }

    this.logger.log(`[PROCESSOR] No existing orchestrator found, CREATING new agent with config: name=${NEWS_ORCHESTRATOR_CONFIG.name}, model=${NEWS_ORCHESTRATOR_CONFIG.model}`);

    // Create new orchestrator agent with autoclear enabled
    const newAgent = await this.lettaService.createAgent({
      name: NEWS_ORCHESTRATOR_CONFIG.name,
      description: NEWS_ORCHESTRATOR_CONFIG.description,
      model: NEWS_ORCHESTRATOR_CONFIG.model,
      embedding: NEWS_ORCHESTRATOR_CONFIG.embedding,
      system: NEWS_ORCHESTRATOR_CONFIG.system,
      memoryBlocks: NEWS_ORCHESTRATOR_CONFIG.memoryBlocks,
      tools: NEWS_ORCHESTRATOR_CONFIG.tools,
      messageBufferAutoclear: NEWS_ORCHESTRATOR_CONFIG.messageBufferAutoclear,
    });

    this.logger.log(`[PROCESSOR] CREATED new orchestrator agent - id=${newAgent.id}, name=${newAgent.name}`);
    return newAgent;
  }

  private parseAgentResponse(response: {
    messages: LettaMessage[];
  }): ProcessedArticle[] {
    this.logger.log(`[PROCESSOR] parseAgentResponse START - messageCount=${response.messages?.length || 0}`);

    if (!response.messages || response.messages.length === 0) {
      this.logger.warn(`[PROCESSOR] parseAgentResponse NO MESSAGES in response!`);
      return [];
    }

    const articles: ProcessedArticle[] = [];

    for (let i = 0; i < response.messages.length; i++) {
      const message = response.messages[i];
      const messageType = message.message_type || "";

      this.logger.log(`[PROCESSOR] parseAgentResponse MESSAGE ${i + 1}/${response.messages.length} - type="${messageType}"`);

      if (messageType === "assistant_message" && message.assistant_message) {
        this.logger.log(`[PROCESSOR] parseAgentResponse ASSISTANT MESSAGE - length=${message.assistant_message.length}`);
        this.logger.log(`[PROCESSOR] parseAgentResponse ASSISTANT CONTENT (first 500 chars): ${message.assistant_message.substring(0, 500)}`);
        const parsed = this.extractJsonFromText(message.assistant_message);
        if (parsed) {
          const normalized = this.normalizeArticles(parsed);
          this.logger.log(`[PROCESSOR] parseAgentResponse EXTRACTED ${normalized.length} articles from assistant_message`);
          articles.push(...normalized);
        } else {
          this.logger.log(`[PROCESSOR] parseAgentResponse NO JSON found in assistant_message`);
        }
      }

      if (messageType === "tool_return_message" && message.tool_return) {
        this.logger.log(`[PROCESSOR] parseAgentResponse TOOL RETURN - length=${message.tool_return.length}`);
        this.logger.log(`[PROCESSOR] parseAgentResponse TOOL RETURN CONTENT (first 500 chars): ${message.tool_return.substring(0, 500)}`);
        const parsed = this.extractJsonFromText(message.tool_return);
        if (parsed) {
          const normalized = this.normalizeArticles(parsed);
          this.logger.log(`[PROCESSOR] parseAgentResponse EXTRACTED ${normalized.length} articles from tool_return`);
          articles.push(...normalized);
        } else {
          this.logger.log(`[PROCESSOR] parseAgentResponse NO JSON found in tool_return`);
        }
      }

      if (message.content && typeof message.content === "string") {
        this.logger.log(`[PROCESSOR] parseAgentResponse CONTENT FIELD - length=${message.content.length}`);
        this.logger.log(`[PROCESSOR] parseAgentResponse CONTENT (first 500 chars): ${message.content.substring(0, 500)}`);
        const parsed = this.extractJsonFromText(message.content);
        if (parsed) {
          const normalized = this.normalizeArticles(parsed);
          this.logger.log(`[PROCESSOR] parseAgentResponse EXTRACTED ${normalized.length} articles from content field`);
          articles.push(...normalized);
        } else {
          this.logger.log(`[PROCESSOR] parseAgentResponse NO JSON found in content field`);
        }
      }
    }

    this.logger.log(`[PROCESSOR] parseAgentResponse FINAL - totalArticles=${articles.length}`);
    if (articles.length > 0) {
      this.logger.log(`[PROCESSOR] parseAgentResponse ARTICLE TITLES: ${articles.map(a => a.title).join(', ')}`);
    }

    return articles;
  }

  private extractJsonFromText(text: string): unknown {
    this.logger.log(`[PROCESSOR] extractJsonFromText - textLength=${text.length}`);

    const jsonMatches = text.match(/\[[\s\S]*\]/);
    if (jsonMatches) {
      this.logger.log(`[PROCESSOR] extractJsonFromText - FOUND ARRAY JSON pattern, length=${jsonMatches[0].length}`);
      try {
        const parsed = JSON.parse(jsonMatches[0]);
        this.logger.log(`[PROCESSOR] extractJsonFromText - PARSED ARRAY successfully, isArray=${Array.isArray(parsed)}, length=${Array.isArray(parsed) ? parsed.length : 'N/A'}`);
        return parsed;
      } catch (e) {
        this.logger.warn(`[PROCESSOR] extractJsonFromText - FAILED to parse array JSON: ${e instanceof Error ? e.message : String(e)}`);
      }
    }

    const objectMatches = text.match(/\{[\s\S]*\}/);
    if (objectMatches) {
      this.logger.log(`[PROCESSOR] extractJsonFromText - FOUND OBJECT JSON pattern, length=${objectMatches[0].length}`);
      try {
        const parsed = JSON.parse(objectMatches[0]);
        this.logger.log(`[PROCESSOR] extractJsonFromText - PARSED OBJECT successfully, keys=${Object.keys(parsed).join(',')}`);
        if (parsed.url && parsed.title) {
          this.logger.log(`[PROCESSOR] extractJsonFromText - Single article object detected`);
          return [parsed];
        }
        if (parsed.articles && Array.isArray(parsed.articles)) {
          this.logger.log(`[PROCESSOR] extractJsonFromText - Articles wrapper detected, count=${parsed.articles.length}`);
          return parsed.articles;
        }
        return parsed;
      } catch (e) {
        this.logger.warn(`[PROCESSOR] extractJsonFromText - FAILED to parse object JSON: ${e instanceof Error ? e.message : String(e)}`);
      }
    }

    this.logger.log(`[PROCESSOR] extractJsonFromText - NO JSON found in text`);
    return null;
  }

  private normalizeArticles(data: unknown): ProcessedArticle[] {
    this.logger.log(`[PROCESSOR] normalizeArticles - isArray=${Array.isArray(data)}`);

    if (!Array.isArray(data)) {
      this.logger.warn(`[PROCESSOR] normalizeArticles - Data is NOT an array, returning empty`);
      return [];
    }

    this.logger.log(`[PROCESSOR] normalizeArticles - Processing ${data.length} items`);

    const validItems = data.filter((item): item is Record<string, unknown> => {
      const isValid = typeof item === "object" &&
        item !== null &&
        typeof (item as Record<string, unknown>).url === "string" &&
        typeof (item as Record<string, unknown>).title === "string";
      if (!isValid) {
        this.logger.log(`[PROCESSOR] normalizeArticles - SKIPPING invalid item (missing url or title): ${JSON.stringify(item).substring(0, 200)}`);
      }
      return isValid;
    });

    this.logger.log(`[PROCESSOR] normalizeArticles - ${validItems.length}/${data.length} items are valid articles`);

    return validItems.map((item, idx) => {
      const locations = this.normalizeLocations(item.locations);
      this.logger.log(`[PROCESSOR] normalizeArticles - Article ${idx + 1}: url=${item.url}, title="${(item.title as string).substring(0, 50)}...", locations=${locations.length}`);

      return {
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
        locations,
      };
    });
  }

  private normalizeLocations(
    locations: unknown,
  ): Array<{ mention: string; mentionType: string; context?: string }> {
    if (!Array.isArray(locations)) {
      this.logger.log(`[PROCESSOR] normalizeLocations - locations is NOT an array (type=${typeof locations}), returning empty`);
      return [];
    }

    this.logger.log(`[PROCESSOR] normalizeLocations - Processing ${locations.length} locations`);

    const validLocs = locations
      .filter((loc): loc is Record<string, unknown> => {
        const isValid = typeof loc === "object" &&
          loc !== null &&
          typeof (loc as Record<string, unknown>).mention === "string";
        if (!isValid) {
          this.logger.log(`[PROCESSOR] normalizeLocations - SKIPPING invalid location: ${JSON.stringify(loc).substring(0, 100)}`);
        }
        return isValid;
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

    this.logger.log(`[PROCESSOR] normalizeLocations - ${validLocs.length}/${locations.length} valid locations: ${validLocs.map(l => `"${l.mention}"`).join(', ')}`);

    return validLocs;
  }
}
