import { Injectable } from "@nestjs/common";
import { LettaService } from "../letta/letta.service";

@Injectable()
export class AgentsService {
  constructor(private readonly lettaService: LettaService) {}

  async createAgent(name: string) {
    return this.lettaService.createAgent(name);
  }

  async listAgents() {
    return this.lettaService.listAgents();
  }

  async sendMessage(agentId: string, content: string) {
    return this.lettaService.sendMessage(agentId, content);
  }
}
