import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ToolResponseDto {
  @ApiProperty({ description: "Tool ID", example: "tool-123..." })
  id: string;

  @ApiProperty({ description: "Tool name", example: "web_search" })
  name: string;

  @ApiPropertyOptional({
    description: "Tool description",
    example: "Search the web for information",
  })
  description?: string;

  @ApiPropertyOptional({
    description: "Tool type",
    example: "letta",
    enum: ["letta", "langchain", "custom"],
  })
  toolType?: string;

  @ApiPropertyOptional({
    description: "Python source code (for custom tools)",
  })
  sourceCode?: string;

  @ApiPropertyOptional({
    description: "Tool tags",
    example: ["search", "utility"],
  })
  tags?: string[];

  @ApiPropertyOptional({
    description: "JSON schema for tool parameters",
  })
  jsonSchema?: object;

  @ApiProperty({
    description: "Creation timestamp",
    example: "2024-01-15T09:30:00Z",
  })
  createdAt: string;

  @ApiPropertyOptional({
    description: "Last update timestamp",
    example: "2024-01-15T10:30:00Z",
  })
  updatedAt?: string;
}

export class ToolListItemDto {
  @ApiProperty({ description: "Tool ID", example: "tool-123..." })
  id: string;

  @ApiProperty({ description: "Tool name", example: "web_search" })
  name: string;

  @ApiPropertyOptional({
    description: "Tool description",
    example: "Search the web for information",
  })
  description?: string;

  @ApiPropertyOptional({
    description: "Tool type",
    example: "letta",
  })
  toolType?: string;

  @ApiPropertyOptional({
    description: "Tool tags",
    example: ["search", "utility"],
  })
  tags?: string[];
}

export class ListToolsQueryDto {
  @ApiPropertyOptional({
    description: "Filter by tool name",
    example: "web_search",
  })
  name?: string;

  @ApiPropertyOptional({
    description: "Search query",
    example: "search",
  })
  search?: string;
}
