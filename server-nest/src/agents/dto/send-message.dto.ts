import {
  IsString,
  IsOptional,
  IsNumber,
  IsIn,
  MinLength,
  MaxLength,
  Min,
  Max,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class SendMessageDto {
  @ApiProperty({
    description: "Message content to send to the agent",
    example: "Hello! What can you help me with?",
    minLength: 1,
    maxLength: 10000,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  content: string;

  @ApiPropertyOptional({
    description: "Maximum number of agent steps (1-100)",
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  maxSteps?: number;
}

export class ListMessagesQueryDto {
  @ApiPropertyOptional({
    description: "Maximum number of messages to return",
    example: 50,
    minimum: 1,
    maximum: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1000)
  limit?: number;

  @ApiPropertyOptional({
    description: "Cursor for pagination - get messages before this ID",
    example: "msg-123...",
  })
  @IsOptional()
  @IsString()
  before?: string;

  @ApiPropertyOptional({
    description: "Cursor for pagination - get messages after this ID",
    example: "msg-123...",
  })
  @IsOptional()
  @IsString()
  after?: string;

  @ApiPropertyOptional({
    description: "Sort order",
    example: "desc",
    enum: ["asc", "desc"],
  })
  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";
}

export class ResetMessagesDto {
  @ApiPropertyOptional({
    description: "Whether to add default initial messages after reset",
    example: true,
    default: true,
  })
  @IsOptional()
  addDefaultInitialMessages?: boolean;
}
