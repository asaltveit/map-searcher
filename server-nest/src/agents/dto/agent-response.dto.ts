import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ToolSummaryDto {
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
}

export class BlockSummaryDto {
  @ApiProperty({ description: "Block ID", example: "block-123..." })
  id: string;

  @ApiProperty({ description: "Block label", example: "persona" })
  label: string;

  @ApiProperty({
    description: "Block value/content",
    example: "I am a helpful assistant.",
  })
  value: string;

  @ApiPropertyOptional({ description: "Character limit", example: 2000 })
  limit?: number;
}

export class AgentResponseDto {
  @ApiProperty({ description: "Agent ID", example: "agent-123..." })
  id: string;

  @ApiProperty({ description: "Agent name", example: "my_assistant" })
  name: string;

  @ApiPropertyOptional({
    description: "Agent description",
    example: "A helpful research assistant",
  })
  description?: string;

  @ApiProperty({ description: "Model used", example: "openai/gpt-4o-mini" })
  model: string;

  @ApiPropertyOptional({
    description: "Embedding model",
    example: "openai/text-embedding-3-small",
  })
  embedding?: string;

  @ApiProperty({ description: "Agent type", example: "memgpt_agent" })
  agentType: string;

  @ApiPropertyOptional({
    description: "Memory blocks",
    type: [BlockSummaryDto],
  })
  memoryBlocks?: BlockSummaryDto[];

  @ApiPropertyOptional({
    description: "Attached tools",
    type: [ToolSummaryDto],
  })
  tools?: ToolSummaryDto[];

  @ApiPropertyOptional({
    description: "Agent tags",
    example: ["research", "coding"],
  })
  tags?: string[];

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

export class AgentListItemDto {
  @ApiProperty({ description: "Agent ID", example: "agent-123..." })
  id: string;

  @ApiProperty({ description: "Agent name", example: "my_assistant" })
  name: string;

  @ApiPropertyOptional({
    description: "Agent description",
    example: "A helpful research assistant",
  })
  description?: string;

  @ApiProperty({ description: "Model used", example: "openai/gpt-4o-mini" })
  model: string;

  @ApiProperty({ description: "Agent type", example: "memgpt_agent" })
  agentType: string;

  @ApiProperty({
    description: "Creation timestamp",
    example: "2024-01-15T09:30:00Z",
  })
  createdAt: string;
}

// Message types based on Letta SDK
export class MessageContentDto {
  @ApiProperty({ description: "Content type", example: "text" })
  type: string;

  @ApiPropertyOptional({ description: "Text content", example: "Hello!" })
  text?: string;
}

export class ToolCallDto {
  @ApiProperty({ description: "Tool call ID", example: "call_123..." })
  id: string;

  @ApiProperty({ description: "Tool name", example: "web_search" })
  name: string;

  @ApiPropertyOptional({
    description: "Tool arguments as JSON string",
    example: '{"query": "weather"}',
  })
  arguments?: string;
}

export class ToolReturnDto {
  @ApiProperty({ description: "Tool call ID", example: "call_123..." })
  toolCallId: string;

  @ApiProperty({
    description: "Tool return value",
    example: "Search results...",
  })
  content: string;

  @ApiPropertyOptional({ description: "Tool status", example: "success" })
  status?: string;
}

export class MessageDto {
  @ApiProperty({ description: "Message ID", example: "msg-123..." })
  id: string;

  @ApiProperty({
    description: "Message type",
    example: "assistant_message",
    enum: [
      "user_message",
      "assistant_message",
      "reasoning_message",
      "tool_call_message",
      "tool_return_message",
      "system_message",
    ],
  })
  messageType: string;

  @ApiProperty({
    description: "Message timestamp",
    example: "2024-01-15T09:30:00Z",
  })
  date: string;

  @ApiPropertyOptional({
    description: "Message content",
    type: [MessageContentDto],
  })
  content?: MessageContentDto[];

  @ApiPropertyOptional({
    description: "Reasoning content (for reasoning messages)",
    example: "I should search for this information...",
  })
  reasoning?: string;

  @ApiPropertyOptional({
    description: "Tool call information",
    type: ToolCallDto,
  })
  toolCall?: ToolCallDto;

  @ApiPropertyOptional({
    description: "Tool return information",
    type: ToolReturnDto,
  })
  toolReturn?: ToolReturnDto;
}

export class UsageStatisticsDto {
  @ApiProperty({ description: "Prompt tokens used", example: 150 })
  promptTokens: number;

  @ApiProperty({ description: "Completion tokens used", example: 50 })
  completionTokens: number;

  @ApiProperty({ description: "Total tokens used", example: 200 })
  totalTokens: number;

  @ApiPropertyOptional({ description: "Number of steps taken", example: 3 })
  stepCount?: number;
}

export class MessageResponseDto {
  @ApiProperty({
    description: "Messages from the agent",
    type: [MessageDto],
  })
  messages: MessageDto[];

  @ApiPropertyOptional({
    description: "Reason the agent stopped",
    example: "end_turn",
  })
  stopReason?: string;

  @ApiPropertyOptional({
    description: "Usage statistics",
    type: UsageStatisticsDto,
  })
  usage?: UsageStatisticsDto;
}

export class MessageHistoryResponseDto {
  @ApiProperty({
    description: "Message history",
    type: [MessageDto],
  })
  messages: MessageDto[];

  @ApiPropertyOptional({
    description: "Cursor for next page",
    example: "msg-456...",
  })
  nextCursor?: string;

  @ApiProperty({
    description: "Whether there are more messages",
    example: true,
  })
  hasMore: boolean;
}
