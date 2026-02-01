import {
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  Min,
  Max,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateBlockDto {
  @ApiPropertyOptional({
    description: "New value for the memory block",
    example: "Updated memory content",
    maxLength: 50000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50000)
  value?: string;

  @ApiPropertyOptional({
    description: "Description of the memory block",
    example: "Stores information about the user",
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: "Character limit for this block",
    example: 2000,
    minimum: 100,
    maximum: 50000,
  })
  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(50000)
  limit?: number;
}

export class MemoryBlockResponseDto {
  @ApiProperty({ description: "Block ID", example: "block-123..." })
  id: string;

  @ApiProperty({
    description: "Block label",
    example: "persona",
  })
  label: string;

  @ApiProperty({
    description: "Block content",
    example: "I am a helpful AI assistant.",
  })
  value: string;

  @ApiPropertyOptional({
    description: "Block description",
    example: "Defines the agent's personality",
  })
  description?: string;

  @ApiPropertyOptional({
    description: "Character limit",
    example: 2000,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: "Whether the block is read-only",
    example: false,
  })
  isTemplate?: boolean;
}
