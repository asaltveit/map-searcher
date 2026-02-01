import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LocationDto {
  @ApiProperty({ description: "Location ID" })
  id: string;

  @ApiProperty({ description: "Original mention text from article" })
  mention: string;

  @ApiProperty({
    description: "Type of location mention",
    enum: [
      "ADDRESS",
      "CROSS_STREET",
      "BUSINESS",
      "PARK",
      "LANDMARK",
      "CITY",
      "OTHER",
    ],
  })
  mentionType: string;

  @ApiPropertyOptional({ description: "Context around the mention" })
  context?: string;

  @ApiPropertyOptional({ description: "Latitude coordinate" })
  lat?: number;

  @ApiPropertyOptional({ description: "Longitude coordinate" })
  lng?: number;

  @ApiPropertyOptional({ description: "Formatted address from geocoder" })
  formattedAddress?: string;

  @ApiPropertyOptional({
    description: "Confidence score (0-1)",
    minimum: 0,
    maximum: 1,
  })
  confidence?: number;

  @ApiPropertyOptional({ description: "Geocoding error if any" })
  geocodeError?: string;
}

export class ArticleDto {
  @ApiProperty({ description: "Article ID" })
  id: string;

  @ApiProperty({ description: "Article URL" })
  url: string;

  @ApiProperty({ description: "Article title" })
  title: string;

  @ApiPropertyOptional({ description: "Article author" })
  author?: string;

  @ApiProperty({ description: "Source/publisher name" })
  source: string;

  @ApiProperty({ description: "Publication date" })
  publishedAt: Date;

  @ApiPropertyOptional({ description: "Article content" })
  content?: string;

  @ApiPropertyOptional({ description: "Featured image URL" })
  imageUrl?: string;

  @ApiPropertyOptional({ description: "AI-generated summary" })
  summary?: string;

  @ApiPropertyOptional({
    description: "Key points extracted from article",
    type: [String],
  })
  keyPoints?: string[];

  @ApiPropertyOptional({
    description: "Sentiment analysis",
    enum: ["positive", "negative", "neutral"],
  })
  sentiment?: string;

  @ApiProperty({
    description: "Processing status",
    enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
  })
  status: string;

  @ApiProperty({
    description: "Locations mentioned in article",
    type: [LocationDto],
  })
  locations: LocationDto[];
}

export class WorkflowReportDto {
  @ApiProperty({ description: "Workflow ID" })
  id: string;

  @ApiProperty({ description: "Search query" })
  query: string;

  @ApiProperty({ description: "Region" })
  region: string;

  @ApiProperty({ description: "Date range start" })
  fromDate: Date;

  @ApiProperty({ description: "Date range end" })
  toDate: Date;

  @ApiProperty({ description: "Workflow status" })
  status: string;

  @ApiProperty({ description: "Total articles found" })
  articlesFound: number;

  @ApiProperty({ description: "Total articles processed" })
  articlesProcessed: number;

  @ApiProperty({ description: "Total unique locations" })
  totalLocations: number;

  @ApiProperty({ description: "Total geocoded locations" })
  geocodedLocations: number;

  @ApiProperty({ description: "Processed articles", type: [ArticleDto] })
  articles: ArticleDto[];

  @ApiProperty({ description: "When created" })
  createdAt: Date;

  @ApiPropertyOptional({ description: "When completed" })
  completedAt?: Date;
}

export class GeoJsonPointGeometry {
  @ApiProperty({ example: "Point" })
  type: "Point";

  @ApiProperty({
    description: "Coordinates [longitude, latitude]",
    example: [-122.4194, 37.7749],
    type: [Number],
  })
  coordinates: [number, number];
}

export class GeoJsonFeatureProperties {
  @ApiProperty({ description: "Location ID" })
  locationId: string;

  @ApiProperty({ description: "Article ID" })
  articleId: string;

  @ApiProperty({ description: "Article title" })
  articleTitle: string;

  @ApiProperty({ description: "Location mention text" })
  mention: string;

  @ApiProperty({ description: "Type of location mention" })
  mentionType: string;

  @ApiPropertyOptional({ description: "Formatted address from geocoder" })
  formattedAddress?: string;

  @ApiPropertyOptional({ description: "Geocoding confidence score" })
  confidence?: number;

  @ApiProperty({ description: "Article URL" })
  articleUrl: string;

  @ApiProperty({ description: "Article publication date (ISO string)" })
  publishedAt: string;
}

export class GeoJsonFeatureDto {
  @ApiProperty({ example: "Feature" })
  type: "Feature";

  @ApiProperty({ description: "GeoJSON geometry", type: GeoJsonPointGeometry })
  geometry: GeoJsonPointGeometry;

  @ApiProperty({
    description: "Feature properties",
    type: GeoJsonFeatureProperties,
  })
  properties: GeoJsonFeatureProperties;
}

export class GeoJsonResponseDto {
  @ApiProperty({ example: "FeatureCollection" })
  type: "FeatureCollection";

  @ApiProperty({ description: "GeoJSON features", type: [GeoJsonFeatureDto] })
  features: GeoJsonFeatureDto[];
}
