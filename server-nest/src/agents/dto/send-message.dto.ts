import { IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
}
