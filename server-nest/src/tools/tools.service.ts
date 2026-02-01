import { Injectable } from "@nestjs/common";
import { LettaService, CreateToolParams } from "../letta/letta.service";

@Injectable()
export class ToolsService {
  constructor(private readonly lettaService: LettaService) {}

  async listTools(params?: { name?: string; search?: string }) {
    return this.lettaService.listTools(params);
  }

  async getTool(toolId: string) {
    return this.lettaService.getTool(toolId);
  }

  async createTool(params: CreateToolParams) {
    return this.lettaService.createTool(params);
  }

  async deleteTool(toolId: string) {
    return this.lettaService.deleteTool(toolId);
  }
}
