import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
  ValidateNested,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class MemoryBlockInput {
  @ApiProperty({
    description: "Label for the memory block (e.g., 'persona', 'human')",
    example: "persona",
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  label: string;

  @ApiProperty({
    description: "Content of the memory block",
    example: "I am a helpful AI assistant.",
  })
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  value: string;

  @ApiPropertyOptional({
    description: "Character limit for this block",
    example: 2000,
  })
  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(50000)
  limit?: number;
}

export class CreateAgentDto {
  @ApiProperty({
    description: "Name for the new agent",
    example: "my_assistant",
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: "Description of the agent",
    example: "A helpful research assistant",
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    description: "LLM model to use (required by Letta SDK)",
    example: "openai/gpt-4o-mini",
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: "Embedding model for memory (required by Letta SDK)",
    example: "openai/text-embedding-3-small",
  })
  @IsString()
  embedding: string;

  @ApiPropertyOptional({
    description: "Custom system prompt",
    maxLength: 50000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50000)
  system?: string;

  @ApiPropertyOptional({
    description: "Initial memory blocks",
    type: [MemoryBlockInput],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemoryBlockInput)
  memoryBlocks?: MemoryBlockInput[];

  @ApiPropertyOptional({
    description: "Tool names to attach to the agent",
    example: ["web_search", "run_code"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tools?: string[];

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
