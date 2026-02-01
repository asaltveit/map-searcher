import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { TracingService } from "../tracing/tracing.service";
import { LettaService, SendMessageParams } from "../letta/letta.service";

/**
 * Handles Weave tracing for agent message sends.
 * Resolves the agent by user/agentId, then runs the Letta sendMessage inside a trace
 * named by the agent (e.g. "Research_Agent", "Map_Agent").
 */
@Injectable()
export class AgentTracingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tracingService: TracingService,
    private readonly lettaService: LettaService,
  ) {}

  /**
   * Send a message to an agent with Weave tracing.
   * Trace name is derived from the agent's name (e.g. "Research Agent" → "Research_Agent").
   * @throws NotFoundException if agent not found or not owned by user
   */
  async sendMessageWithTrace(
    userId: string,
    agentId: string,
    params: SendMessageParams,
  ) {
    const agent = await this.prisma.agent.findFirst({
      where: { userId, lettaAgentId: agentId },
    });
    if (!agent) {
      throw new NotFoundException(`Agent not found: ${agentId}`);
    }
    const traceName = agent.name.replace(/\s+/g, "_");
    return this.tracingService.traceWithInput(
      traceName,
      (input) => this.lettaService.sendMessage(agentId, input),
      params,
    );
  }
}
