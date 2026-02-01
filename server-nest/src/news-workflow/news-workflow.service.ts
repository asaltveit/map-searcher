import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { PrismaService } from "../prisma.service";
import { StartWorkflowDto } from "./dto/start-workflow.dto";
import {
  WorkflowStatus,
  ProcessingStatus,
  LocationType,
  type NewsWorkflow,
  type NewsArticle,
  type ArticleLocation,
} from "@prisma/client";
import { GeocodingService } from "./services/geocoding.service";

export const NEWS_WORKFLOW_QUEUE = "news-workflow";

export interface ProcessedArticle {
  url: string;
  title: string;
  author?: string;
  source: string;
  publishedAt: string;
  content?: string;
  imageUrl?: string;
  summary?: string;
  keyPoints?: string[];
  sentiment?: string;
  locations: Array<{
    mention: string;
    mentionType: string;
    context?: string;
  }>;
}

type WorkflowWithArticles = NewsWorkflow & {
  articles: (NewsArticle & { locations: ArticleLocation[] })[];
};

@Injectable()
export class NewsWorkflowService {
  private readonly logger = new Logger(NewsWorkflowService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly geocodingService: GeocodingService,
    @InjectQueue(NEWS_WORKFLOW_QUEUE) private readonly workflowQueue: Queue,
  ) {}

  /**
   * Start a new news workflow
   */
  async startWorkflow(userId: string, dto: StartWorkflowDto) {
    // Create workflow record
    const workflow = await this.prisma.newsWorkflow.create({
      data: {
        userId,
        query: dto.query,
        region: dto.region,
        fromDate: new Date(dto.fromDate),
        toDate: new Date(dto.toDate),
        maxArticles: dto.maxArticles || 20,
        status: WorkflowStatus.PENDING,
      },
    });

    this.logger.log(`Created workflow ${workflow.id} for user ${userId}`);

    // Queue the job for background processing
    const job = await this.workflowQueue.add(
      "process-news",
      {
        workflowId: workflow.id,
        userId,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
      },
    );

    this.logger.log(`Queued job ${job.id} for workflow ${workflow.id}`);

    return {
      workflowId: workflow.id,
      jobId: job.id || "unknown",
      status: workflow.status,
      statusUrl: `/api/news-workflow/${workflow.id}/status`,
    };
  }

  /**
   * Get workflow status
   */
  async getWorkflowStatus(userId: string, workflowId: string) {
    const workflow = await this.prisma.newsWorkflow.findFirst({
      where: { id: workflowId, userId },
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow not found: ${workflowId}`);
    }

    return {
      id: workflow.id,
      query: workflow.query,
      region: workflow.region,
      fromDate: workflow.fromDate,
      toDate: workflow.toDate,
      status: workflow.status,
      articlesFound: workflow.articlesFound,
      articlesProcessed: workflow.articlesProcessed,
      errorCount: workflow.errorCount,
      errorMessage: workflow.errorMessage ?? undefined,
      traceId: workflow.traceId ?? undefined,
      startedAt: workflow.startedAt ?? undefined,
      completedAt: workflow.completedAt ?? undefined,
      createdAt: workflow.createdAt,
    };
  }

  /**
   * Get full workflow report with articles
   */
  async getWorkflowReport(userId: string, workflowId: string) {
    const workflow = await this.prisma.newsWorkflow.findFirst({
      where: { id: workflowId, userId },
      include: {
        articles: {
          include: {
            locations: true,
          },
          orderBy: { publishedAt: "desc" },
        },
      },
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow not found: ${workflowId}`);
    }

    const typedWorkflow = workflow as WorkflowWithArticles;

    // Count locations
    const allLocations = typedWorkflow.articles.flatMap((a) => a.locations);
    const geocodedLocations = allLocations.filter(
      (l) => l.lat !== null && l.lng !== null,
    );

    return {
      id: typedWorkflow.id,
      query: typedWorkflow.query,
      region: typedWorkflow.region,
      fromDate: typedWorkflow.fromDate,
      toDate: typedWorkflow.toDate,
      status: typedWorkflow.status,
      articlesFound: typedWorkflow.articlesFound,
      articlesProcessed: typedWorkflow.articlesProcessed,
      totalLocations: allLocations.length,
      geocodedLocations: geocodedLocations.length,
      articles: typedWorkflow.articles.map((article) => ({
        id: article.id,
        url: article.url,
        title: article.title,
        author: article.author ?? undefined,
        source: article.source,
        publishedAt: article.publishedAt,
        content: article.content ?? undefined,
        imageUrl: article.imageUrl ?? undefined,
        summary: article.summary ?? undefined,
        keyPoints: article.keyPoints as string[] | undefined,
        sentiment: article.sentiment ?? undefined,
        status: article.status,
        locations: article.locations.map((loc) => ({
          id: loc.id,
          mention: loc.mention,
          mentionType: loc.mentionType,
          context: loc.context ?? undefined,
          lat: loc.lat ?? undefined,
          lng: loc.lng ?? undefined,
          formattedAddress: loc.formattedAddress ?? undefined,
          confidence: loc.confidence ?? undefined,
          geocodeError: loc.geocodeError ?? undefined,
        })),
      })),
      createdAt: typedWorkflow.createdAt,
      completedAt: typedWorkflow.completedAt ?? undefined,
    };
  }

  /**
   * Get workflow locations as GeoJSON
   */
  async getWorkflowLocationsGeoJson(userId: string, workflowId: string) {
    const workflow = await this.prisma.newsWorkflow.findFirst({
      where: { id: workflowId, userId },
      include: {
        articles: {
          include: {
            locations: {
              where: {
                lat: { not: null },
                lng: { not: null },
              },
            },
          },
        },
      },
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow not found: ${workflowId}`);
    }

    const typedWorkflow = workflow as WorkflowWithArticles;

    const features = typedWorkflow.articles.flatMap((article) =>
      article.locations
        .filter((loc) => loc.lat !== null && loc.lng !== null)
        .map((loc) => ({
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: [loc.lng!, loc.lat!] as [number, number],
          },
          properties: {
            locationId: loc.id,
            articleId: article.id,
            articleTitle: article.title,
            mention: loc.mention,
            mentionType: loc.mentionType,
            formattedAddress: loc.formattedAddress ?? undefined,
            confidence: loc.confidence ?? undefined,
            articleUrl: article.url,
            publishedAt: article.publishedAt.toISOString(),
          },
        })),
    );

    return {
      type: "FeatureCollection" as const,
      features,
    };
  }

  /**
   * List user's workflows
   */
  async listWorkflows(userId: string) {
    const workflows = await this.prisma.newsWorkflow.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return workflows.map((w) => ({
      id: w.id,
      query: w.query,
      region: w.region,
      status: w.status,
      articlesFound: w.articlesFound,
      articlesProcessed: w.articlesProcessed,
      createdAt: w.createdAt,
      completedAt: w.completedAt ?? undefined,
    }));
  }

  /**
   * Update workflow status (called by processor)
   */
  async updateWorkflowStatus(
    workflowId: string,
    status: WorkflowStatus,
    updates?: {
      articlesFound?: number;
      articlesProcessed?: number;
      errorCount?: number;
      errorMessage?: string;
      traceId?: string;
      lettaAgentId?: string;
      startedAt?: Date;
      completedAt?: Date;
    },
  ) {
    return this.prisma.newsWorkflow.update({
      where: { id: workflowId },
      data: {
        status,
        ...updates,
      },
    });
  }

  /**
   * Save processed articles from the agent
   */
  async saveArticleResults(workflowId: string, articles: ProcessedArticle[]) {
    const workflow = await this.prisma.newsWorkflow.findUnique({
      where: { id: workflowId },
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow not found: ${workflowId}`);
    }

    let savedCount = 0;
    let errorCount = 0;

    for (const article of articles) {
      try {
        // Create article
        const savedArticle = await this.prisma.newsArticle.upsert({
          where: {
            workflowId_url: {
              workflowId,
              url: article.url,
            },
          },
          create: {
            workflowId,
            url: article.url,
            title: article.title,
            author: article.author,
            source: article.source,
            publishedAt: new Date(article.publishedAt),
            content: article.content,
            imageUrl: article.imageUrl,
            summary: article.summary,
            keyPoints: article.keyPoints,
            sentiment: article.sentiment,
            status: ProcessingStatus.PROCESSING,
          },
          update: {
            title: article.title,
            author: article.author,
            source: article.source,
            content: article.content,
            imageUrl: article.imageUrl,
            summary: article.summary,
            keyPoints: article.keyPoints,
            sentiment: article.sentiment,
          },
        });

        // Process locations - geocode and save
        for (const loc of article.locations) {
          const geocodeResult = await this.geocodingService.geocode(
            loc.mention,
            workflow.region,
          );

          await this.prisma.articleLocation.create({
            data: {
              articleId: savedArticle.id,
              mention: loc.mention,
              mentionType: this.parseLocationType(loc.mentionType),
              context: loc.context,
              lat: geocodeResult.lat,
              lng: geocodeResult.lng,
              formattedAddress: geocodeResult.formattedAddress,
              confidence: geocodeResult.confidence,
              geocodeError: geocodeResult.error,
            },
          });
        }

        // Mark article as completed
        await this.prisma.newsArticle.update({
          where: { id: savedArticle.id },
          data: { status: ProcessingStatus.COMPLETED },
        });

        savedCount++;
      } catch (error) {
        errorCount++;
        this.logger.error(
          `Error saving article ${article.url}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    // Update workflow counts
    await this.prisma.newsWorkflow.update({
      where: { id: workflowId },
      data: {
        articlesProcessed: { increment: savedCount },
        errorCount: { increment: errorCount },
      },
    });

    return { savedCount, errorCount };
  }

  /**
   * Get workflow by ID (for processor)
   */
  async getWorkflow(workflowId: string) {
    return this.prisma.newsWorkflow.findUnique({
      where: { id: workflowId },
    });
  }

  private parseLocationType(type: string): LocationType {
    const normalized = type.toUpperCase();
    if (Object.values(LocationType).includes(normalized as LocationType)) {
      return normalized as LocationType;
    }
    return LocationType.OTHER;
  }
}
