import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { AgentTracingService } from "./agent-tracing.service";
import { PrismaService } from "../prisma.service";
import { TracingService } from "../tracing/tracing.service";
import { LettaService } from "../letta/letta.service";

describe("AgentTracingService", () => {
  let service: AgentTracingService;
  let prismaService: jest.Mocked<PrismaService>;
  let tracingService: jest.Mocked<TracingService>;
  let lettaService: jest.Mocked<LettaService>;

  const mockUserId = "user-123";
  const mockAgentId = "agent-456";
  const mockAgent = {
    id: "db-id",
    lettaAgentId: mockAgentId,
    userId: mockUserId,
    name: "Research Agent",
    description: null,
    model: "openai/gpt-4o-mini",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockPrismaService = {
      agent: {
        findFirst: jest.fn(),
      },
    };

    const mockTracingService = {
      trace: jest.fn(<T>(_name: string, fn: () => Promise<T>) => fn()),
      traceWithInput: jest.fn(
        <T, I>(_name: string, fn: (input: I) => Promise<T>, input: I) => fn(input),
      ),
    };

    const mockLettaService = {
      sendMessage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentTracingService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: TracingService, useValue: mockTracingService },
        { provide: LettaService, useValue: mockLettaService },
      ],
    }).compile();

    service = module.get<AgentTracingService>(AgentTracingService);
    prismaService = module.get(PrismaService);
    tracingService = module.get(TracingService);
    lettaService = module.get(LettaService);
  });

  describe("sendMessageWithTrace", () => {
    it("should send message with trace name from agent name", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      const mockResponse = {
        messages: [{ content: "Hello back!" }],
        usage: { total_tokens: 100 },
      };
      lettaService.sendMessage.mockResolvedValue(mockResponse as never);

      const result = await service.sendMessageWithTrace(mockUserId, mockAgentId, {
        content: "Hello!",
      });

      expect(result).toEqual(mockResponse);
      expect(prismaService.agent.findFirst).toHaveBeenCalledWith({
        where: { userId: mockUserId, lettaAgentId: mockAgentId },
      });
      expect(tracingService.traceWithInput).toHaveBeenCalledWith(
        "Research_Agent",
        expect.any(Function),
        { content: "Hello!" },
      );
      expect(lettaService.sendMessage).toHaveBeenCalledWith(mockAgentId, {
        content: "Hello!",
      });
    });

    it("should use underscored trace name for multi-word agent names", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue({
        ...mockAgent,
        name: "Map Agent",
      });
      lettaService.sendMessage.mockResolvedValue({} as never);

      await service.sendMessageWithTrace(mockUserId, mockAgentId, {
        content: "Hi",
      });

      expect(tracingService.traceWithInput).toHaveBeenCalledWith(
        "Map_Agent",
        expect.any(Function),
        { content: "Hi" },
      );
    });

    it("should throw NotFoundException when agent not found", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.sendMessageWithTrace(mockUserId, mockAgentId, {
          content: "Hi",
        }),
      ).rejects.toThrow(NotFoundException);

      expect(lettaService.sendMessage).not.toHaveBeenCalled();
    });
  });
});
