import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateAgentDto {
  @ApiPropertyOptional({
    description: "Name for the agent",
    example: "my_assistant",
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: "Description of the agent",
    example: "A helpful research assistant",
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: "LLM model to use",
    example: "openai/gpt-4o-mini",
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({
    description: "Custom system prompt",
    maxLength: 50000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50000)
  system?: string;

  @ApiPropertyOptional({
    description: "Temperature for response generation (0-2)",
    example: 0.7,
    minimum: 0,
    maximum: 2,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @ApiPropertyOptional({
    description: "Tags for organizing agents",
    example: ["research", "coding"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
