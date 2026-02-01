import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AlertFrequency } from "@prisma/client";

export class AlertResponseDto {
  @ApiProperty({ description: "Alert ID" })
  id: string;

  @ApiProperty({ description: "Search query" })
  query: string;

  @ApiProperty({ description: "Region for geocoding" })
  region: string;

  @ApiProperty({ description: "Max articles per run" })
  maxArticles: number;

  @ApiProperty({ enum: AlertFrequency, description: "Run frequency" })
  frequency: AlertFrequency;

  @ApiProperty({ description: "Whether alert is active" })
  isActive: boolean;

  @ApiPropertyOptional({ description: "Last run timestamp" })
  lastRunAt?: Date;

  @ApiPropertyOptional({ description: "Next scheduled run" })
  nextRunAt?: Date;

  @ApiProperty({ description: "Created timestamp" })
  createdAt: Date;

  @ApiProperty({ description: "Updated timestamp" })
  updatedAt: Date;

  @ApiPropertyOptional({ description: "Total articles found" })
  articleCount?: number;
}

export class AlertListItemDto {
  @ApiProperty({ description: "Alert ID" })
  id: string;

  @ApiProperty({ description: "Search query" })
  query: string;

  @ApiProperty({ description: "Region" })
  region: string;

  @ApiProperty({ enum: AlertFrequency, description: "Run frequency" })
  frequency: AlertFrequency;

  @ApiProperty({ description: "Whether alert is active" })
  isActive: boolean;

  @ApiPropertyOptional({ description: "Last run timestamp" })
  lastRunAt?: Date;

  @ApiPropertyOptional({ description: "Next scheduled run" })
  nextRunAt?: Date;

  @ApiProperty({ description: "Total articles found" })
  articleCount: number;

  @ApiProperty({ description: "Created timestamp" })
  createdAt: Date;
}

export class AlertDetailDto extends AlertResponseDto {
  @ApiProperty({ description: "Recent articles from this alert" })
  articles: AlertArticleDto[];
}

export class AlertArticleDto {
  @ApiProperty({ description: "Article ID" })
  id: string;

  @ApiProperty({ description: "Article URL" })
  url: string;

  @ApiProperty({ description: "Article title" })
  title: string;

  @ApiPropertyOptional({ description: "Article author" })
  author?: string;

  @ApiProperty({ description: "Source publication" })
  source: string;

  @ApiProperty({ description: "Publication date" })
  publishedAt: Date;

  @ApiPropertyOptional({ description: "Article summary" })
  summary?: string;

  @ApiPropertyOptional({ description: "Sentiment" })
  sentiment?: string;

  @ApiProperty({ description: "Number of locations" })
  locationCount: number;

  @ApiProperty({ description: "Created timestamp" })
  createdAt: Date;
}

export class RunAlertResponseDto {
  @ApiProperty({ description: "Job ID for the queued job" })
  jobId: string;

  @ApiProperty({ description: "Message" })
  message: string;
}

export class AlertGeoJsonFeatureDto {
  @ApiProperty({ example: "Feature" })
  type: "Feature";

  @ApiProperty({ description: "Point geometry" })
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };

  @ApiProperty({ description: "Feature properties" })
  properties: {
    locationId: string;
    articleId: string;
    alertId: string;
    articleTitle: string;
    mention: string;
    mentionType: string;
    formattedAddress?: string;
    confidence?: number;
    articleUrl: string;
    publishedAt: string;
  };
}

export class AlertGeoJsonResponseDto {
  @ApiProperty({ example: "FeatureCollection" })
  type: "FeatureCollection";

  @ApiProperty({ type: [AlertGeoJsonFeatureDto] })
  features: AlertGeoJsonFeatureDto[];
}
