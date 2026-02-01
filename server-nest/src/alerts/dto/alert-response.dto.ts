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

export class AlertDetailDto extends AlertResponseDto {
  @ApiProperty({ type: () => [AlertArticleDto], description: "Recent articles from this alert" })
  articles: AlertArticleDto[];
}

export class RunAlertResponseDto {
  @ApiProperty({ description: "Job ID for the queued job" })
  jobId: string;

  @ApiProperty({ description: "Message" })
  message: string;
}

// GeoJSON DTOs with explicit schema definitions to avoid circular dependency detection
export class PointGeometryDto {
  @ApiProperty({ example: "Point", enum: ["Point"] })
  type: "Point";

  @ApiProperty({
    type: "array",
    items: { type: "number" },
    example: [-81.0998, 32.0809],
    description: "Coordinates as [longitude, latitude]",
  })
  coordinates: [number, number];
}

export class GeoJsonFeaturePropertiesDto {
  @ApiProperty({ description: "Location ID" })
  locationId: string;

  @ApiProperty({ description: "Article ID" })
  articleId: string;

  @ApiProperty({ description: "Alert ID" })
  alertId: string;

  @ApiProperty({ description: "Article title" })
  articleTitle: string;

  @ApiProperty({ description: "Location mention text" })
  mention: string;

  @ApiProperty({ description: "Type of mention (city, address, etc.)" })
  mentionType: string;

  @ApiPropertyOptional({ description: "Formatted address" })
  formattedAddress?: string;

  @ApiPropertyOptional({ description: "Geocoding confidence score" })
  confidence?: number;

  @ApiProperty({ description: "Article URL" })
  articleUrl: string;

  @ApiProperty({ description: "Publication date" })
  publishedAt: string;
}

export class AlertGeoJsonFeatureDto {
  @ApiProperty({ example: "Feature", enum: ["Feature"] })
  type: "Feature";

  @ApiProperty({ type: () => PointGeometryDto, description: "Point geometry" })
  geometry: PointGeometryDto;

  @ApiProperty({ type: () => GeoJsonFeaturePropertiesDto, description: "Feature properties" })
  properties: GeoJsonFeaturePropertiesDto;
}

export class AlertGeoJsonResponseDto {
  @ApiProperty({ example: "FeatureCollection", enum: ["FeatureCollection"] })
  type: "FeatureCollection";

  @ApiProperty({ type: () => [AlertGeoJsonFeatureDto], description: "GeoJSON features" })
  features: AlertGeoJsonFeatureDto[];
}
