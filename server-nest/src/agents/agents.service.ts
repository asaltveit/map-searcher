import { Injectable } from "@nestjs/common";
import { LettaService, AgentIds } from "../letta/letta.service";

@Injectable()
export class AgentsService {
  constructor(private readonly lettaService: LettaService) {}

  async getOrCreateAgents(userId: string): Promise<AgentIds> {
    return this.lettaService.getOrCreateAgents(userId);
  }

  async sendMessage(agentId: string, body: any): Promise<any> {
    return this.lettaService.sendMessage(agentId, body);
  }
}
