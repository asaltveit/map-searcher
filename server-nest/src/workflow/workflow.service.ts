import { Injectable } from "@nestjs/common";
import { LettaService } from "../letta/letta.service";

@Injectable()
export class WorkflowService {
  constructor(private readonly lettaService: LettaService) {}

  async updateBlock(blockId: string, value: string): Promise<void> {
    await this.lettaService.updateBlock(blockId, value);
  }
}
