import { IsString, IsUrl, IsOptional, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SaveResearchDto {
  @ApiProperty({
    description: "Research content",
    maxLength: 100000,
  })
  @IsString()
  @MaxLength(100000)
  content: string;

  @ApiProperty({
    description: "Source URL (http or https)",
    example: "https://example.com/article",
  })
  @IsUrl({ protocols: ["http", "https"] })
  @MaxLength(2048)
  source_url: string;

  @ApiPropertyOptional({
    description: "Research title",
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  title?: string;
}
