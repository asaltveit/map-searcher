import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ModelsService } from "./models.service";
import { ModelDto, EmbeddingModelDto } from "./dto/model-response.dto";

@ApiTags("Models")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("api/models")
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  @ApiOperation({ summary: "List available LLM models" })
  @ApiResponse({
    status: 200,
    description: "List of LLM models",
    type: [ModelDto],
  })
  async listModels() {
    return this.modelsService.listModels();
  }

  @Get("embeddings")
  @ApiOperation({ summary: "List available embedding models" })
  @ApiResponse({
    status: 200,
    description: "List of embedding models",
    type: [EmbeddingModelDto],
  })
  async listEmbeddingModels() {
    return this.modelsService.listEmbeddingModels();
  }
}
