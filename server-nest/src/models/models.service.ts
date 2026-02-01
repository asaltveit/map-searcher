import { Injectable } from "@nestjs/common";
import { LettaService } from "../letta/letta.service";

@Injectable()
export class ModelsService {
  constructor(private readonly lettaService: LettaService) {}

  async listModels() {
    return this.lettaService.listModels();
  }

  async listEmbeddingModels() {
    return this.lettaService.listEmbeddingModels();
  }
}
