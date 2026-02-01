import { ApiProperty } from "@nestjs/swagger";

export class AgentResponseDto {
  @ApiProperty({ description: "Agent ID", example: "agent-123..." })
  id: string;

  @ApiProperty({ description: "Agent name", example: "my_assistant" })
  name: string;

  @ApiProperty({ description: "Model used", example: "openai/gpt-4o-mini" })
  model: string;

  @ApiProperty({ description: "Agent type", example: "letta_v1_agent" })
  agent_type: string;
}

export class MessageResponseDto {
  @ApiProperty({
    description: "Messages from the agent",
    type: "array",
    items: { type: "object" },
  })
  messages: any[];

  @ApiProperty({ description: "Stop reason" })
  stop_reason: any;

  @ApiProperty({ description: "Usage statistics" })
  usage: any;
}
