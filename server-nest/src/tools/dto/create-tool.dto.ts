import {
  IsString,
  IsOptional,
  IsArray,
  MinLength,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateToolDto {
  @ApiProperty({
    description: "Python source code for the tool",
    example: `def my_tool(query: str) -> str:
    """Search for information.

    Args:
        query: The search query

    Returns:
        Search results
    """
    return f"Results for: {query}"`,
  })
  @IsString()
  @MinLength(10)
  @MaxLength(50000)
  sourceCode: string;

  @ApiPropertyOptional({
    description:
      "Name for the tool (derived from function name if not provided)",
    example: "my_custom_tool",
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: "Description of what the tool does",
    example: "Searches for information using a custom API",
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    description: "Tags for organizing tools",
    example: ["search", "utility"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
