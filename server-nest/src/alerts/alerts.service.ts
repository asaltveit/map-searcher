import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { PrismaService } from "../prisma.service";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { UpdateAlertDto } from "./dto/update-alert.dto";
import {
  AlertFrequency,
  ProcessingStatus,
  LocationType,
  type NewsAlert,
  type NewsArticle,
  type ArticleLocation,
} from "@prisma/client";
import { GeocodingService } from "../news-workflow/services/geocoding.service";

export const ALERTS_QUEUE = "alerts";

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

type AlertWithArticles = NewsAlert & {
  articles: (NewsArticle & { locations: ArticleLocation[] })[];
  _count: { articles: number };
};

@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly geocodingService: GeocodingService,
    @InjectQueue(ALERTS_QUEUE) private readonly alertsQueue: Queue,
  ) {}

  /**
   * Create a new alert
   */
  async createAlert(userId: string, dto: CreateAlertDto) {
    const nextRunAt = this.calculateNextRunAt(dto.frequency || AlertFrequency.MANUAL);

    const alert = await this.prisma.newsAlert.create({
      data: {
        userId,
        query: dto.query,
        region: dto.region,
        maxArticles: dto.maxArticles || 20,
        frequency: dto.frequency || AlertFrequency.MANUAL,
        isActive: dto.isActive ?? true,
        nextRunAt,
      },
    });

    this.logger.log(`Created alert ${alert.id} for user ${userId}`);

    // If not manual, schedule the job
    if (alert.frequency !== AlertFrequency.MANUAL && alert.isActive) {
      await this.scheduleAlert(alert);
    }

    return this.formatAlertResponse(alert);
  }

  /**
   * Get alert by ID
   */
  async getAlert(userId: string, alertId: string) {
    const alert = await this.prisma.newsAlert.findFirst({
      where: { id: alertId, userId },
      include: {
        articles: {
          include: { locations: true },
          orderBy: { publishedAt: "desc" },
          take: 50,
        },
        _count: { select: { articles: true } },
      },
    });

    if (!alert) {
      throw new NotFoundException(`Alert not found: ${alertId}`);
    }

    return this.formatAlertDetail(alert as AlertWithArticles);
  }

  /**
   * List user's alerts
   */
  async listAlerts(userId: string) {
    const alerts = await this.prisma.newsAlert.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { articles: true } },
      },
    });

    return alerts.map((alert) => ({
      id: alert.id,
      query: alert.query,
      region: alert.region,
      frequency: alert.frequency,
      isActive: alert.isActive,
      lastRunAt: alert.lastRunAt ?? undefined,
      nextRunAt: alert.nextRunAt ?? undefined,
      articleCount: alert._count.articles,
      createdAt: alert.createdAt,
    }));
  }

  /**
   * Update an alert
   */
  async updateAlert(userId: string, alertId: string, dto: UpdateAlertDto) {
    const existing = await this.prisma.newsAlert.findFirst({
      where: { id: alertId, userId },
    });

    if (!existing) {
      throw new NotFoundException(`Alert not found: ${alertId}`);
    }

    const updateData: Partial<NewsAlert> = {};
    if (dto.query !== undefined) updateData.query = dto.query;
    if (dto.region !== undefined) updateData.region = dto.region;
    if (dto.maxArticles !== undefined) updateData.maxArticles = dto.maxArticles;
    if (dto.frequency !== undefined) {
      updateData.frequency = dto.frequency;
      updateData.nextRunAt = this.calculateNextRunAt(dto.frequency);
    }
    if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

    const alert = await this.prisma.newsAlert.update({
      where: { id: alertId },
      data: updateData,
    });

    // Re-schedule if frequency or active status changed
    if (dto.frequency !== undefined || dto.isActive !== undefined) {
      await this.rescheduleAlert(alert);
    }

    this.logger.log(`Updated alert ${alertId}`);
    return this.formatAlertResponse(alert);
  }

  /**
   * Delete an alert
   */
  async deleteAlert(userId: string, alertId: string) {
    const alert = await this.prisma.newsAlert.findFirst({
      where: { id: alertId, userId },
    });

    if (!alert) {
      throw new NotFoundException(`Alert not found: ${alertId}`);
    }

    // Remove scheduled job
    await this.removeScheduledJob(alertId);

    // Delete the alert (cascades to articles)
    await this.prisma.newsAlert.delete({
      where: { id: alertId },
    });

    this.logger.log(`Deleted alert ${alertId}`);
    return { success: true };
  }

  /**
   * Manually trigger an alert run
   */
  async runAlert(userId: string, alertId: string) {
    const alert = await this.prisma.newsAlert.findFirst({
      where: { id: alertId, userId },
    });

    if (!alert) {
      throw new NotFoundException(`Alert not found: ${alertId}`);
    }

    const job = await this.alertsQueue.add(
      "process-alert",
      { alertId, userId },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 10000,
        },
      },
    );

    this.logger.log(`Queued manual run for alert ${alertId}, job ${job.id}`);

    return {
      jobId: job.id || "unknown",
      message: `Alert ${alertId} queued for processing`,
    };
  }

  /**
   * Get all locations for user's alerts as GeoJSON
   */
  async getAlertsLocationsGeoJson(userId: string, alertIds?: string[]) {
    const whereClause: { userId: string; id?: { in: string[] }; isActive?: boolean } = { userId };
    if (alertIds && alertIds.length > 0) {
      whereClause.id = { in: alertIds };
    } else {
      whereClause.isActive = true;
    }

    const alerts = await this.prisma.newsAlert.findMany({
      where: whereClause,
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

    const features = alerts.flatMap((alert) =>
      alert.articles.flatMap((article) =>
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
              alertId: alert.id,
              articleTitle: article.title,
              mention: loc.mention,
              mentionType: loc.mentionType,
              formattedAddress: loc.formattedAddress ?? undefined,
              confidence: loc.confidence ?? undefined,
              articleUrl: article.url,
              publishedAt: article.publishedAt.toISOString(),
            },
          })),
      ),
    );

    return {
      type: "FeatureCollection" as const,
      features,
    };
  }

  /**
   * Get alerts due for scheduled run
   */
  async getDueAlerts() {
    return this.prisma.newsAlert.findMany({
      where: {
        isActive: true,
        frequency: { not: AlertFrequency.MANUAL },
        nextRunAt: { lte: new Date() },
      },
    });
  }

  /**
   * Update alert after run
   */
  async updateAlertAfterRun(alertId: string, articlesFound: number) {
    const alert = await this.prisma.newsAlert.findUnique({
      where: { id: alertId },
    });

    if (!alert) return;

    const nextRunAt = this.calculateNextRunAt(alert.frequency);

    await this.prisma.newsAlert.update({
      where: { id: alertId },
      data: {
        lastRunAt: new Date(),
        nextRunAt,
      },
    });
  }

  /**
   * Save articles for an alert
   */
  async saveAlertArticles(alertId: string, articles: ProcessedArticle[]) {
    const alert = await this.prisma.newsAlert.findUnique({
      where: { id: alertId },
    });

    if (!alert) {
      throw new NotFoundException(`Alert not found: ${alertId}`);
    }

    let savedCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (const article of articles) {
      try {
        // Check for duplicate
        const existing = await this.prisma.newsArticle.findFirst({
          where: { alertId, url: article.url },
        });

        if (existing) {
          skippedCount++;
          continue;
        }

        // Create article
        const savedArticle = await this.prisma.newsArticle.create({
          data: {
            alertId,
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
        });

        // Process locations - geocode and save
        for (const loc of article.locations) {
          const geocodeResult = await this.geocodingService.geocode(
            loc.mention,
            alert.region,
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

    this.logger.log(
      `Alert ${alertId}: saved ${savedCount}, skipped ${skippedCount} duplicates, ${errorCount} errors`,
    );

    return { savedCount, skippedCount, errorCount };
  }

  /**
   * Get alert by ID (for processor)
   */
  async getAlertById(alertId: string) {
    return this.prisma.newsAlert.findUnique({
      where: { id: alertId },
    });
  }

  // Private helpers

  private calculateNextRunAt(frequency: AlertFrequency): Date | null {
    if (frequency === AlertFrequency.MANUAL) {
      return null;
    }

    const now = new Date();
    const next = new Date(now);

    switch (frequency) {
      case AlertFrequency.DAILY:
        next.setDate(next.getDate() + 1);
        next.setHours(8, 0, 0, 0); // 8 AM
        break;
      case AlertFrequency.WEEKLY:
        next.setDate(next.getDate() + 7);
        next.setHours(8, 0, 0, 0);
        break;
      case AlertFrequency.BIWEEKLY:
        next.setDate(next.getDate() + 14);
        next.setHours(8, 0, 0, 0);
        break;
      case AlertFrequency.MONTHLY:
        next.setMonth(next.getMonth() + 1);
        next.setHours(8, 0, 0, 0);
        break;
    }

    return next;
  }

  private async scheduleAlert(alert: NewsAlert) {
    if (alert.frequency === AlertFrequency.MANUAL || !alert.isActive) {
      return;
    }

    const cronPattern = this.getCronPattern(alert.frequency);
    if (!cronPattern) return;

    await this.alertsQueue.add(
      "process-alert",
      { alertId: alert.id, userId: alert.userId },
      {
        repeat: {
          pattern: cronPattern,
        },
        jobId: `alert-${alert.id}`,
      },
    );

    this.logger.log(`Scheduled alert ${alert.id} with pattern: ${cronPattern}`);
  }

  private async rescheduleAlert(alert: NewsAlert) {
    // Remove old job
    await this.removeScheduledJob(alert.id);

    // Add new job if active and not manual
    if (alert.isActive && alert.frequency !== AlertFrequency.MANUAL) {
      await this.scheduleAlert(alert);
    }
  }

  private async removeScheduledJob(alertId: string) {
    try {
      const repeatableJobs = await this.alertsQueue.getRepeatableJobs();
      const job = repeatableJobs.find((j) => j.id === `alert-${alertId}`);
      if (job) {
        await this.alertsQueue.removeRepeatableByKey(job.key);
        this.logger.log(`Removed scheduled job for alert ${alertId}`);
      }
    } catch (error) {
      this.logger.warn(
        `Error removing scheduled job for alert ${alertId}: ${error}`,
      );
    }
  }

  private getCronPattern(frequency: AlertFrequency): string | null {
    switch (frequency) {
      case AlertFrequency.DAILY:
        return "0 8 * * *"; // 8 AM every day
      case AlertFrequency.WEEKLY:
        return "0 8 * * 1"; // 8 AM every Monday
      case AlertFrequency.BIWEEKLY:
        return "0 8 1,15 * *"; // 8 AM on 1st and 15th
      case AlertFrequency.MONTHLY:
        return "0 8 1 * *"; // 8 AM on 1st of month
      default:
        return null;
    }
  }

  private formatAlertResponse(alert: NewsAlert) {
    return {
      id: alert.id,
      query: alert.query,
      region: alert.region,
      maxArticles: alert.maxArticles,
      frequency: alert.frequency,
      isActive: alert.isActive,
      lastRunAt: alert.lastRunAt ?? undefined,
      nextRunAt: alert.nextRunAt ?? undefined,
      createdAt: alert.createdAt,
      updatedAt: alert.updatedAt,
    };
  }

  private formatAlertDetail(alert: AlertWithArticles) {
    return {
      id: alert.id,
      query: alert.query,
      region: alert.region,
      maxArticles: alert.maxArticles,
      frequency: alert.frequency,
      isActive: alert.isActive,
      lastRunAt: alert.lastRunAt ?? undefined,
      nextRunAt: alert.nextRunAt ?? undefined,
      createdAt: alert.createdAt,
      updatedAt: alert.updatedAt,
      articleCount: alert._count.articles,
      articles: alert.articles.map((article) => ({
        id: article.id,
        url: article.url,
        title: article.title,
        author: article.author ?? undefined,
        source: article.source,
        publishedAt: article.publishedAt,
        summary: article.summary ?? undefined,
        sentiment: article.sentiment ?? undefined,
        locationCount: article.locations.length,
        createdAt: article.createdAt,
      })),
    };
  }

  private parseLocationType(type: string): LocationType {
    const normalized = type.toUpperCase();
    if (Object.values(LocationType).includes(normalized as LocationType)) {
      return normalized as LocationType;
    }
    return LocationType.OTHER;
  }
}
