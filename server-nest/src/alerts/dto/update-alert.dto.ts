import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsBoolean,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { AlertFrequency } from "@prisma/client";

export class UpdateAlertDto {
  @ApiPropertyOptional({
    description: "Search query for news articles",
    example: "robberies",
    minLength: 2,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  query?: string;

  @ApiPropertyOptional({
    description: "Region for geocoding context (city, state, country)",
    example: "Savannah, GA",
    minLength: 2,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  region?: string;

  @ApiPropertyOptional({
    description: "Maximum number of articles to process per run",
    example: 20,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  maxArticles?: number;

  @ApiPropertyOptional({
    description: "How often to run the alert",
    enum: AlertFrequency,
  })
  @IsOptional()
  @IsEnum(AlertFrequency)
  frequency?: AlertFrequency;

  @ApiPropertyOptional({
    description: "Whether the alert is active",
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
