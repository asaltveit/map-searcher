import { Test, TestingModule } from "@nestjs/testing";
import { AgentsService } from "./agents.service";
import { LettaService } from "../letta/letta.service";
import { PrismaService } from "../prisma.service";
import { AgentTracingService } from "./agent-tracing.service";
import { NotFoundException } from "@nestjs/common";

describe("AgentsService", () => {
  let service: AgentsService;
  let lettaService: jest.Mocked<LettaService>;
  let prismaService: jest.Mocked<PrismaService>;
  let agentTracingServiceMock: { sendMessageWithTrace: jest.Mock };

  const mockUserId = "user-123";
  const mockAgentId = "agent-456";
  const mockLettaAgentId = "agent-456";

  const mockAgent = {
    id: mockAgentId,
    lettaAgentId: mockLettaAgentId,
    userId: mockUserId,
    name: "Test Agent",
    description: "A test agent",
    model: "openai/gpt-4o-mini",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLettaAgent = {
    id: mockLettaAgentId,
    name: "Test Agent",
    description: "A test agent",
    model: "openai/gpt-4o-mini",
    embedding: "openai/text-embedding-3-small",
    blocks: [],
    tools: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(async () => {
    const mockLettaService = {
      createAgent: jest.fn(),
      retrieveAgent: jest.fn(),
      updateAgent: jest.fn(),
      deleteAgent: jest.fn(),
      sendMessage: jest.fn(),
      listMessages: jest.fn(),
      resetMessages: jest.fn(),
      listBlocks: jest.fn(),
      getBlock: jest.fn(),
      updateBlock: jest.fn(),
      listAgentTools: jest.fn(),
      attachTool: jest.fn(),
      detachTool: jest.fn(),
    };

    const mockPrismaService = {
      agent: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    agentTracingServiceMock = {
      sendMessageWithTrace: jest.fn(),
    };

    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        AgentsService,
        { provide: LettaService, useValue: mockLettaService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: AgentTracingService, useValue: agentTracingServiceMock },
      ],
    }).compile();

    service = testingModule.get<AgentsService>(AgentsService);
    lettaService = testingModule.get(LettaService);
    prismaService = testingModule.get(PrismaService);
  });

  describe("verifyOwnership", () => {
    it("should return lettaAgentId when user owns the agent", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);

      const result = await service.verifyOwnership(mockUserId, mockAgentId);

      expect(result).toEqual({ lettaAgentId: mockLettaAgentId });
      expect(prismaService.agent.findFirst).toHaveBeenCalledWith({
        where: { lettaAgentId: mockAgentId, userId: mockUserId },
      });
    });

    it("should throw NotFoundException when agent not found", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.verifyOwnership(mockUserId, "nonexistent-agent"),
      ).rejects.toThrow(NotFoundException);
    });

    it("should throw NotFoundException when user does not own agent", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.verifyOwnership("other-user", mockAgentId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("createAgent", () => {
    it("should create an agent with defaults", async () => {
      lettaService.createAgent.mockResolvedValue(mockLettaAgent as never);
      (prismaService.agent.create as jest.Mock).mockResolvedValue(mockAgent);

      const result = await service.createAgent(mockUserId, {
        name: "Test Agent",
      });

      expect(result).toEqual(mockLettaAgent);
      expect(lettaService.createAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Agent",
          model: "openai/gpt-4o-mini",
          embedding: "openai/text-embedding-3-small",
        }),
      );
      expect(prismaService.agent.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          lettaAgentId: mockLettaAgentId,
          userId: mockUserId,
          name: "Test Agent",
        }),
      });
    });

    it("should create an agent with custom config", async () => {
      lettaService.createAgent.mockResolvedValue(mockLettaAgent as never);
      (prismaService.agent.create as jest.Mock).mockResolvedValue(mockAgent);

      await service.createAgent(mockUserId, {
        name: "Custom Agent",
        description: "Custom description",
        model: "openai/gpt-4",
        tools: ["web_search"],
      });

      expect(lettaService.createAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Custom Agent",
          description: "Custom description",
          model: "openai/gpt-4",
          tools: ["web_search"],
        }),
      );
    });
  });

  describe("listAgents", () => {
    it("should return list of agents for user", async () => {
      (prismaService.agent.findMany as jest.Mock).mockResolvedValue([
        mockAgent,
      ]);
      lettaService.retrieveAgent.mockResolvedValue(mockLettaAgent as never);

      const result = await service.listAgents(mockUserId);

      expect(result).toEqual([mockLettaAgent]);
      expect(prismaService.agent.findMany).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        orderBy: { createdAt: "desc" },
      });
    });

    it("should filter out agents that fail to retrieve from Letta", async () => {
      (prismaService.agent.findMany as jest.Mock).mockResolvedValue([
        mockAgent,
        { ...mockAgent, id: "agent-789", lettaAgentId: "agent-789" },
      ]);
      lettaService.retrieveAgent
        .mockResolvedValueOnce(mockLettaAgent as never)
        .mockRejectedValueOnce(new Error("Not found"));

      const result = await service.listAgents(mockUserId);

      expect(result).toHaveLength(1);
    });
  });

  describe("getAgent", () => {
    it("should return agent details", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      lettaService.retrieveAgent.mockResolvedValue(mockLettaAgent as never);

      const result = await service.getAgent(mockUserId, mockAgentId);

      expect(result).toEqual(mockLettaAgent);
    });

    it("should throw NotFoundException if not owned", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.getAgent("other-user", mockAgentId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("updateAgent", () => {
    it("should update agent in Letta and local DB", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      lettaService.updateAgent.mockResolvedValue({
        ...mockLettaAgent,
        name: "Updated Name",
      } as never);
      (prismaService.agent.update as jest.Mock).mockResolvedValue({
        ...mockAgent,
        name: "Updated Name",
      });

      const result = await service.updateAgent(mockUserId, mockAgentId, {
        name: "Updated Name",
      });

      expect(result.name).toBe("Updated Name");
      expect(prismaService.agent.update).toHaveBeenCalledWith({
        where: { lettaAgentId: mockAgentId },
        data: { name: "Updated Name" },
      });
    });
  });

  describe("deleteAgent", () => {
    it("should delete agent from Letta and local DB", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      lettaService.deleteAgent.mockResolvedValue(undefined as never);
      (prismaService.agent.delete as jest.Mock).mockResolvedValue(mockAgent);

      await service.deleteAgent(mockUserId, mockAgentId);

      expect(lettaService.deleteAgent).toHaveBeenCalledWith(mockAgentId);
      expect(prismaService.agent.delete).toHaveBeenCalledWith({
        where: { lettaAgentId: mockAgentId },
      });
    });
  });

  describe("sendMessage", () => {
    it("should delegate to agent tracing service", async () => {
      const mockResponse = {
        messages: [{ content: "Hello back!" }],
        usage: { total_tokens: 100 },
      };
      agentTracingServiceMock.sendMessageWithTrace.mockResolvedValue(
        mockResponse,
      );

      const result = await service.sendMessage(mockUserId, mockAgentId, {
        content: "Hello!",
      });

      expect(result).toEqual(mockResponse);
      expect(agentTracingServiceMock.sendMessageWithTrace).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
        { content: "Hello!" },
      );
    });
  });

  describe("listMessages", () => {
    it("should list messages with pagination", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      const mockMessages = [{ id: "msg-1", content: "Hello" }];
      lettaService.listMessages.mockResolvedValue(mockMessages as never);

      const result = await service.listMessages(mockUserId, mockAgentId, {
        limit: 10,
      });

      expect(result).toEqual(mockMessages);
      expect(lettaService.listMessages).toHaveBeenCalledWith(mockAgentId, {
        limit: 10,
      });
    });
  });

  describe("resetMessages", () => {
    it("should reset agent messages", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      lettaService.resetMessages.mockResolvedValue(mockLettaAgent as never);

      const result = await service.resetMessages(mockUserId, mockAgentId);

      expect(result).toEqual(mockLettaAgent);
      expect(lettaService.resetMessages).toHaveBeenCalledWith(mockAgentId);
    });
  });

  describe("memory blocks", () => {
    it("should list blocks", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      const mockBlocks = [{ label: "persona", value: "I am helpful" }];
      lettaService.listBlocks.mockResolvedValue(mockBlocks as never);

      const result = await service.listBlocks(mockUserId, mockAgentId);

      expect(result).toEqual(mockBlocks);
    });

    it("should get specific block", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      const mockBlock = { label: "persona", value: "I am helpful" };
      lettaService.getBlock.mockResolvedValue(mockBlock as never);

      const result = await service.getBlock(mockUserId, mockAgentId, "persona");

      expect(result).toEqual(mockBlock);
    });

    it("should update block", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      const updatedBlock = { label: "persona", value: "I am very helpful" };
      lettaService.updateBlock.mockResolvedValue(updatedBlock as never);

      const result = await service.updateBlock(
        mockUserId,
        mockAgentId,
        "persona",
        { value: "I am very helpful" },
      );

      expect(result).toEqual(updatedBlock);
    });
  });

  describe("agent tools", () => {
    it("should list agent tools", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      const mockTools = [{ id: "tool-1", name: "web_search" }];
      lettaService.listAgentTools.mockResolvedValue(mockTools as never);

      const result = await service.listAgentTools(mockUserId, mockAgentId);

      expect(result).toEqual(mockTools);
    });

    it("should attach tool to agent", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      lettaService.attachTool.mockResolvedValue(mockLettaAgent as never);

      const result = await service.attachTool(
        mockUserId,
        mockAgentId,
        "tool-1",
      );

      expect(result).toEqual(mockLettaAgent);
      expect(lettaService.attachTool).toHaveBeenCalledWith(
        mockAgentId,
        "tool-1",
      );
    });

    it("should detach tool from agent", async () => {
      (prismaService.agent.findFirst as jest.Mock).mockResolvedValue(mockAgent);
      lettaService.detachTool.mockResolvedValue(mockLettaAgent as never);

      const result = await service.detachTool(
        mockUserId,
        mockAgentId,
        "tool-1",
      );

      expect(result).toEqual(mockLettaAgent);
      expect(lettaService.detachTool).toHaveBeenCalledWith(
        mockAgentId,
        "tool-1",
      );
    });
  });

  describe("createDefaultAgent", () => {
    it("should create default agent with user name", async () => {
      lettaService.createAgent.mockResolvedValue(mockLettaAgent as never);
      (prismaService.agent.create as jest.Mock).mockResolvedValue(mockAgent);

      await service.createDefaultAgent(mockUserId, "testuser");

      expect(lettaService.createAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "My Assistant",
          description: "Your personal AI assistant",
          memoryBlocks: expect.arrayContaining([
            expect.objectContaining({ label: "persona" }),
            expect.objectContaining({
              label: "human",
              value: expect.stringContaining("testuser"),
            }),
          ]),
        }),
      );
    });
  });
});
