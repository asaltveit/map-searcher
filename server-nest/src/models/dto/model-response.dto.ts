import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ModelDto {
  @ApiProperty({
    description: "Model identifier",
    example: "openai/gpt-4o-mini",
  })
  model: string;

  @ApiPropertyOptional({
    description: "Model handle/name",
    example: "gpt-4o-mini",
  })
  modelHandle?: string;

  @ApiPropertyOptional({
    description: "Model provider",
    example: "openai",
  })
  provider?: string;

  @ApiPropertyOptional({
    description: "Context window size in tokens",
    example: 128000,
  })
  contextWindow?: number;

  @ApiPropertyOptional({
    description: "Whether model supports function calling",
    example: true,
  })
  supportsFunctionCalling?: boolean;
}

export class EmbeddingModelDto {
  @ApiProperty({
    description: "Embedding model identifier",
    example: "openai/text-embedding-3-small",
  })
  model: string;

  @ApiPropertyOptional({
    description: "Model handle/name",
    example: "text-embedding-3-small",
  })
  modelHandle?: string;

  @ApiPropertyOptional({
    description: "Model provider",
    example: "openai",
  })
  provider?: string;

  @ApiPropertyOptional({
    description: "Embedding dimension",
    example: 1536,
  })
  embeddingDim?: number;
}
