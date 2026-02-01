import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  MinLength,
  MaxLength,
  Min,
  Max,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class StartWorkflowDto {
  @ApiProperty({
    description: "Search query for news articles",
    example: "crime",
    minLength: 2,
    maxLength: 200,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  query: string;

  @ApiProperty({
    description: "Region for geocoding context (city, state, country)",
    example: "San Francisco, CA, USA",
    minLength: 2,
    maxLength: 200,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  region: string;

  @ApiProperty({
    description: "Start date for article search (ISO 8601)",
    example: "2025-01-01",
  })
  @IsDateString()
  fromDate: string;

  @ApiProperty({
    description: "End date for article search (ISO 8601)",
    example: "2025-01-31",
  })
  @IsDateString()
  toDate: string;

  @ApiPropertyOptional({
    description: "Maximum number of articles to process",
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  maxArticles?: number;
}
