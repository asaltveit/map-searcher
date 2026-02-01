import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { PrismaService } from "../prisma.service";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { UpdateAlertDto } from "./dto/update-alert.dto";
import {
  AlertFrequency,
  AlertProcessingStatus,
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
    this.logger.log(`[SVC] createAlert START - userId=${userId}, query="${dto.query}", region="${dto.region}", frequency=${dto.frequency || 'MANUAL'}, maxArticles=${dto.maxArticles || 20}`);

    const nextRunAt = this.calculateNextRunAt(dto.frequency || AlertFrequency.MANUAL);
    this.logger.log(`[SVC] createAlert calculated nextRunAt=${nextRunAt?.toISOString() || 'null'}`);

    try {
      // Determine if we'll be auto-running this alert
      const willAutoRun = (dto.frequency || AlertFrequency.MANUAL) === AlertFrequency.MANUAL && (dto.isActive ?? true);

      const alert = await this.prisma.newsAlert.create({
        data: {
          userId,
          query: dto.query,
          region: dto.region,
          maxArticles: dto.maxArticles || 20,
          frequency: dto.frequency || AlertFrequency.MANUAL,
          isActive: dto.isActive ?? true,
          nextRunAt,
          processingStatus: willAutoRun ? AlertProcessingStatus.PROCESSING : AlertProcessingStatus.IDLE,
        },
      });

      this.logger.log(`[SVC] createAlert DB SUCCESS - alertId=${alert.id}, userId=${userId}, query="${alert.query}", region="${alert.region}", processingStatus=${alert.processingStatus}`);

      // If not manual, schedule the recurring job
      if (alert.frequency !== AlertFrequency.MANUAL && alert.isActive) {
        this.logger.log(`[SVC] createAlert scheduling recurring job for alertId=${alert.id}`);
        await this.scheduleAlert(alert);
      } else if (alert.frequency === AlertFrequency.MANUAL && alert.isActive) {
        // Auto-run MANUAL alerts immediately on creation
        this.logger.log(`[SVC] createAlert AUTO-QUEUING manual alert ${alert.id} for immediate processing`);
        await this.alertsQueue.add(
          "process-alert",
          { alertId: alert.id, userId },
          {
            attempts: 3,
            backoff: {
              type: "exponential",
              delay: 10000,
            },
          },
        );
        this.logger.log(`[SVC] createAlert AUTO-QUEUED manual alert ${alert.id}`);
      } else {
        this.logger.log(`[SVC] createAlert NOT scheduling - frequency=${alert.frequency}, isActive=${alert.isActive}`);
      }

      return this.formatAlertResponse(alert);
    } catch (error) {
      this.logger.error(`[SVC] createAlert DB FAILED - userId=${userId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Get alert by ID
   */
  async getAlert(userId: string, alertId: string) {
    this.logger.log(`[SVC] getAlert START - userId=${userId}, alertId=${alertId}`);

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
      this.logger.warn(`[SVC] getAlert NOT FOUND - alertId=${alertId}, userId=${userId}`);
      throw new NotFoundException(`Alert not found: ${alertId}`);
    }

    this.logger.log(`[SVC] getAlert FOUND - alertId=${alertId}, query="${alert.query}", region="${alert.region}", totalArticles=${alert._count.articles}, returnedArticles=${alert.articles.length}`);

    // Log location counts per article
    const articlesWithLocations = alert.articles.filter(a => a.locations.length > 0);
    const totalLocations = alert.articles.reduce((sum, a) => sum + a.locations.length, 0);
    this.logger.log(`[SVC] getAlert LOCATION STATS - articlesWithLocations=${articlesWithLocations.length}/${alert.articles.length}, totalLocations=${totalLocations}`);

    if (alert.articles.length > 0) {
      this.logger.log(`[SVC] getAlert ARTICLE SAMPLE - first article: id=${alert.articles[0].id}, title="${alert.articles[0].title}", locationCount=${alert.articles[0].locations.length}`);
      if (alert.articles[0].locations.length > 0) {
        this.logger.log(`[SVC] getAlert LOCATION SAMPLE - first location: ${JSON.stringify(alert.articles[0].locations[0])}`);
      }
    }

    return this.formatAlertDetail(alert as AlertWithArticles);
  }

  /**
   * List user's alerts
   */
  async listAlerts(userId: string) {
    this.logger.log(`[SVC] listAlerts START - userId=${userId}`);

    const alerts = await this.prisma.newsAlert.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { articles: true } },
      },
    });

    this.logger.log(`[SVC] listAlerts FOUND - userId=${userId}, count=${alerts.length}`);

    const result = alerts.map((alert) => ({
      id: alert.id,
      query: alert.query,
      region: alert.region,
      frequency: alert.frequency,
      isActive: alert.isActive,
      processingStatus: alert.processingStatus,
      lastRunAt: alert.lastRunAt ?? undefined,
      nextRunAt: alert.nextRunAt ?? undefined,
      articleCount: alert._count.articles,
      createdAt: alert.createdAt,
    }));

    this.logger.log(`[SVC] listAlerts RESULT - alerts=${JSON.stringify(result.map(a => ({ id: a.id, query: a.query, articleCount: a.articleCount, isActive: a.isActive })))}`);

    return result;
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
    this.logger.log(`[SVC] runAlert START - userId=${userId}, alertId=${alertId}`);

    const alert = await this.prisma.newsAlert.findFirst({
      where: { id: alertId, userId },
    });

    if (!alert) {
      this.logger.warn(`[SVC] runAlert ALERT NOT FOUND - alertId=${alertId}, userId=${userId}`);
      throw new NotFoundException(`Alert not found: ${alertId}`);
    }

    this.logger.log(`[SVC] runAlert FOUND ALERT - alertId=${alertId}, query="${alert.query}", region="${alert.region}", isActive=${alert.isActive}, lastRunAt=${alert.lastRunAt?.toISOString() || 'never'}`);

    try {
      // Set processing status to PROCESSING
      await this.prisma.newsAlert.update({
        where: { id: alertId },
        data: { processingStatus: AlertProcessingStatus.PROCESSING },
      });

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

      this.logger.log(`[SVC] runAlert JOB QUEUED - alertId=${alertId}, jobId=${job.id}, jobName=${job.name}`);

      return {
        jobId: job.id || "unknown",
        message: `Alert ${alertId} queued for processing`,
      };
    } catch (error) {
      this.logger.error(`[SVC] runAlert QUEUE FAILED - alertId=${alertId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Get all locations for user's alerts as GeoJSON
   */
  async getAlertsLocationsGeoJson(userId: string, alertIds?: string[]) {
    this.logger.log(`[SVC] getAlertsLocationsGeoJson START - userId=${userId}, alertIds=${JSON.stringify(alertIds)}`);

    const whereClause: { userId: string; id?: { in: string[] }; isActive?: boolean } = { userId };
    if (alertIds && alertIds.length > 0) {
      whereClause.id = { in: alertIds };
      this.logger.log(`[SVC] getAlertsLocationsGeoJson FILTERING by specific alertIds=${JSON.stringify(alertIds)}`);
    } else {
      whereClause.isActive = true;
      this.logger.log(`[SVC] getAlertsLocationsGeoJson FILTERING by isActive=true (all active alerts)`);
    }

    this.logger.log(`[SVC] getAlertsLocationsGeoJson WHERE clause=${JSON.stringify(whereClause)}`);

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

    this.logger.log(`[SVC] getAlertsLocationsGeoJson FOUND ${alerts.length} alerts`);

    // Detailed logging for each alert
    for (const alert of alerts) {
      const totalArticles = alert.articles.length;
      const articlesWithLocations = alert.articles.filter(a => a.locations.length > 0).length;
      const totalLocations = alert.articles.reduce((sum, a) => sum + a.locations.length, 0);
      this.logger.log(`[SVC] getAlertsLocationsGeoJson ALERT ${alert.id} - query="${alert.query}", region="${alert.region}", articles=${totalArticles}, articlesWithLocations=${articlesWithLocations}, totalGeocodedLocations=${totalLocations}`);
    }

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

    this.logger.log(`[SVC] getAlertsLocationsGeoJson RESULT - totalFeatures=${features.length}`);

    if (features.length === 0) {
      this.logger.warn(`[SVC] getAlertsLocationsGeoJson NO FEATURES! This means no geocoded locations with lat/lng. Check: 1) Are there articles? 2) Do articles have locations? 3) Were locations successfully geocoded?`);
    } else {
      this.logger.log(`[SVC] getAlertsLocationsGeoJson SAMPLE FEATURES - first 3: ${JSON.stringify(features.slice(0, 3).map(f => ({ mention: f.properties.mention, coords: f.geometry.coordinates, articleTitle: f.properties.articleTitle })))}`);
    }

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
        processingStatus: AlertProcessingStatus.COMPLETED,
      },
    });

    this.logger.log(`[SVC] updateAlertAfterRun - alertId=${alertId}, processingStatus=COMPLETED, articlesFound=${articlesFound}`);
  }

  /**
   * Mark alert processing as failed
   */
  async markAlertFailed(alertId: string) {
    await this.prisma.newsAlert.update({
      where: { id: alertId },
      data: { processingStatus: AlertProcessingStatus.FAILED },
    });
    this.logger.log(`[SVC] markAlertFailed - alertId=${alertId}, processingStatus=FAILED`);
  }

  /**
   * Save articles for an alert
   */
  async saveAlertArticles(alertId: string, articles: ProcessedArticle[]) {
    this.logger.log(`[SVC] saveAlertArticles START - alertId=${alertId}, articleCount=${articles.length}`);
    this.logger.log(`[SVC] saveAlertArticles INCOMING ARTICLES - ${JSON.stringify(articles.map(a => ({ url: a.url, title: a.title, locationCount: a.locations?.length || 0 })))}`);

    const alert = await this.prisma.newsAlert.findUnique({
      where: { id: alertId },
    });

    if (!alert) {
      this.logger.error(`[SVC] saveAlertArticles ALERT NOT FOUND - alertId=${alertId}`);
      throw new NotFoundException(`Alert not found: ${alertId}`);
    }

    this.logger.log(`[SVC] saveAlertArticles FOUND ALERT - alertId=${alertId}, query="${alert.query}", region="${alert.region}"`);

    let savedCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    let totalLocationsProcessed = 0;
    let totalLocationsGeocoded = 0;

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      this.logger.log(`[SVC] saveAlertArticles PROCESSING ARTICLE ${i + 1}/${articles.length} - url=${article.url}, title="${article.title}", locations=${article.locations?.length || 0}`);

      try {
        // Check for duplicate
        const existing = await this.prisma.newsArticle.findFirst({
          where: { alertId, url: article.url },
        });

        if (existing) {
          this.logger.log(`[SVC] saveAlertArticles SKIPPING DUPLICATE - url=${article.url}`);
          skippedCount++;
          continue;
        }

        // Create article
        this.logger.log(`[SVC] saveAlertArticles CREATING ARTICLE - url=${article.url}`);
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
        this.logger.log(`[SVC] saveAlertArticles ARTICLE CREATED - articleId=${savedArticle.id}`);

        // Process locations - geocode and save
        const locationCount = article.locations?.length || 0;
        this.logger.log(`[SVC] saveAlertArticles PROCESSING ${locationCount} LOCATIONS for articleId=${savedArticle.id}`);

        for (let j = 0; j < (article.locations?.length || 0); j++) {
          const loc = article.locations[j];
          totalLocationsProcessed++;
          this.logger.log(`[SVC] saveAlertArticles GEOCODING LOCATION ${j + 1}/${locationCount} - mention="${loc.mention}", type="${loc.mentionType}"`);

          const geocodeResult = await this.geocodingService.geocode(
            loc.mention,
            alert.region,
          );

          this.logger.log(`[SVC] saveAlertArticles GEOCODE RESULT - mention="${loc.mention}", success=${geocodeResult.success}, lat=${geocodeResult.lat}, lng=${geocodeResult.lng}, error=${geocodeResult.error || 'none'}`);

          if (geocodeResult.success && geocodeResult.lat && geocodeResult.lng) {
            totalLocationsGeocoded++;
          }

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
          this.logger.log(`[SVC] saveAlertArticles LOCATION SAVED - mention="${loc.mention}", hasCoords=${geocodeResult.lat != null && geocodeResult.lng != null}`);
        }

        // Mark article as completed
        await this.prisma.newsArticle.update({
          where: { id: savedArticle.id },
          data: { status: ProcessingStatus.COMPLETED },
        });
        this.logger.log(`[SVC] saveAlertArticles ARTICLE COMPLETED - articleId=${savedArticle.id}`);

        savedCount++;
      } catch (error) {
        errorCount++;
        this.logger.error(
          `[SVC] saveAlertArticles ERROR saving article ${article.url}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    this.logger.log(`[SVC] saveAlertArticles FINAL STATS - alertId=${alertId}, saved=${savedCount}, skipped=${skippedCount}, errors=${errorCount}, locationsProcessed=${totalLocationsProcessed}, locationsGeocoded=${totalLocationsGeocoded}`);

    if (totalLocationsGeocoded === 0 && totalLocationsProcessed > 0) {
      this.logger.warn(`[SVC] saveAlertArticles WARNING - No locations were successfully geocoded! This means NO map pins will show.`);
    }

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
      processingStatus: alert.processingStatus,
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
      processingStatus: alert.processingStatus,
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
