import { Test, TestingModule } from "@nestjs/testing";
import { AgentsController } from "./agents.controller";
import { AgentsService } from "./agents.service";
import { BadRequestException } from "@nestjs/common";
import type { JwtRequest } from "../common/types";

describe("AgentsController", () => {
  let controller: AgentsController;
  let agentsService: jest.Mocked<AgentsService>;

  const mockUserId = "user-123";
  const mockAgentId = "agent-456";

  const mockRequest = {
    user: { userId: mockUserId, email: "test@test.com" },
  } as JwtRequest;

  const mockAgent = {
    id: mockAgentId,
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
    const mockAgentsService = {
      createAgent: jest.fn(),
      listAgents: jest.fn(),
      getAgent: jest.fn(),
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

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentsController],
      providers: [{ provide: AgentsService, useValue: mockAgentsService }],
    }).compile();

    controller = module.get<AgentsController>(AgentsController);
    agentsService = module.get(AgentsService);
  });

  describe("createAgent", () => {
    it("should create an agent", async () => {
      agentsService.createAgent.mockResolvedValue(mockAgent as never);

      const result = await controller.createAgent(mockRequest, {
        name: "Test Agent",
      });

      expect(result).toEqual(mockAgent);
      expect(agentsService.createAgent).toHaveBeenCalledWith(mockUserId, {
        name: "Test Agent",
        description: undefined,
        model: undefined,
        embedding: undefined,
        system: undefined,
        memoryBlocks: undefined,
        tools: undefined,
        temperature: undefined,
        tags: undefined,
      });
    });

    it("should pass all optional parameters", async () => {
      agentsService.createAgent.mockResolvedValue(mockAgent as never);

      await controller.createAgent(mockRequest, {
        name: "Test Agent",
        description: "Test description",
        model: "openai/gpt-4",
        tools: ["web_search"],
        tags: ["test"],
      });

      expect(agentsService.createAgent).toHaveBeenCalledWith(
        mockUserId,
        expect.objectContaining({
          name: "Test Agent",
          description: "Test description",
          model: "openai/gpt-4",
          tools: ["web_search"],
          tags: ["test"],
        }),
      );
    });
  });

  describe("listAgents", () => {
    it("should return list of agents for user", async () => {
      const agents = [mockAgent];
      agentsService.listAgents.mockResolvedValue(agents as never);

      const result = await controller.listAgents(mockRequest);

      expect(result).toEqual(agents);
      expect(agentsService.listAgents).toHaveBeenCalledWith(mockUserId);
    });
  });

  describe("getAgent", () => {
    it("should return agent by id", async () => {
      agentsService.getAgent.mockResolvedValue(mockAgent as never);

      const result = await controller.getAgent(mockRequest, mockAgentId);

      expect(result).toEqual(mockAgent);
      expect(agentsService.getAgent).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
      );
    });

    it("should reject invalid agent id", async () => {
      await expect(controller.getAgent(mockRequest, "")).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should reject agent id that is too long", async () => {
      const longId = "a".repeat(200);
      await expect(controller.getAgent(mockRequest, longId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe("updateAgent", () => {
    it("should update agent", async () => {
      const updatedAgent = { ...mockAgent, name: "Updated Name" };
      agentsService.updateAgent.mockResolvedValue(updatedAgent as never);

      const result = await controller.updateAgent(mockRequest, mockAgentId, {
        name: "Updated Name",
      });

      expect(result.name).toBe("Updated Name");
      expect(agentsService.updateAgent).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
        expect.objectContaining({ name: "Updated Name" }),
      );
    });
  });

  describe("deleteAgent", () => {
    it("should delete agent", async () => {
      agentsService.deleteAgent.mockResolvedValue(undefined as never);

      await controller.deleteAgent(mockRequest, mockAgentId);

      expect(agentsService.deleteAgent).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
      );
    });
  });

  describe("sendMessage", () => {
    it("should send message to agent", async () => {
      const mockResponse = {
        messages: [{ content: "Hello back!" }],
        usage: { total_tokens: 100 },
      };
      agentsService.sendMessage.mockResolvedValue(mockResponse as never);

      const result = await controller.sendMessage(mockRequest, mockAgentId, {
        content: "Hello!",
      });

      expect(result).toEqual(mockResponse);
      expect(agentsService.sendMessage).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
        { content: "Hello!", maxSteps: undefined },
      );
    });

    it("should pass maxSteps parameter", async () => {
      const mockResponse = { messages: [], usage: {} };
      agentsService.sendMessage.mockResolvedValue(mockResponse as never);

      await controller.sendMessage(mockRequest, mockAgentId, {
        content: "Hello!",
        maxSteps: 5,
      });

      expect(agentsService.sendMessage).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
        { content: "Hello!", maxSteps: 5 },
      );
    });
  });

  describe("listMessages", () => {
    it("should list messages with defaults", async () => {
      const mockMessages = [{ id: "msg-1", content: "Hello" }];
      agentsService.listMessages.mockResolvedValue(mockMessages as never);

      const result = await controller.listMessages(mockRequest, mockAgentId, {});

      expect(result).toEqual(mockMessages);
    });

    it("should pass pagination parameters", async () => {
      const mockMessages: object[] = [];
      agentsService.listMessages.mockResolvedValue(mockMessages as never);

      await controller.listMessages(mockRequest, mockAgentId, {
        limit: 10,
        before: "msg-100",
        order: "asc",
      });

      expect(agentsService.listMessages).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
        { limit: 10, before: "msg-100", after: undefined, order: "asc" },
      );
    });
  });

  describe("resetMessages", () => {
    it("should reset agent messages", async () => {
      agentsService.resetMessages.mockResolvedValue(mockAgent as never);

      const result = await controller.resetMessages(
        mockRequest,
        mockAgentId,
        {},
      );

      expect(result).toEqual(mockAgent);
      expect(agentsService.resetMessages).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
      );
    });
  });

  describe("memory blocks", () => {
    it("should list blocks", async () => {
      const mockBlocks = [{ label: "persona", value: "I am helpful" }];
      agentsService.listBlocks.mockResolvedValue(mockBlocks as never);

      const result = await controller.listBlocks(mockRequest, mockAgentId);

      expect(result).toEqual(mockBlocks);
    });

    it("should get specific block", async () => {
      const mockBlock = { label: "persona", value: "I am helpful" };
      agentsService.getBlock.mockResolvedValue(mockBlock as never);

      const result = await controller.getBlock(
        mockRequest,
        mockAgentId,
        "persona",
      );

      expect(result).toEqual(mockBlock);
    });

    it("should update block", async () => {
      const updatedBlock = { label: "persona", value: "Updated value" };
      agentsService.updateBlock.mockResolvedValue(updatedBlock as never);

      const result = await controller.updateBlock(
        mockRequest,
        mockAgentId,
        "persona",
        { value: "Updated value" },
      );

      expect(result).toEqual(updatedBlock);
      expect(agentsService.updateBlock).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
        "persona",
        { value: "Updated value", description: undefined, limit: undefined },
      );
    });
  });

  describe("agent tools", () => {
    it("should list agent tools", async () => {
      const mockTools = [{ id: "tool-1", name: "web_search" }];
      agentsService.listAgentTools.mockResolvedValue(mockTools as never);

      const result = await controller.listAgentTools(mockRequest, mockAgentId);

      expect(result).toEqual(mockTools);
    });

    it("should attach tool", async () => {
      agentsService.attachTool.mockResolvedValue(mockAgent as never);

      const result = await controller.attachTool(
        mockRequest,
        mockAgentId,
        "tool-1",
      );

      expect(result).toEqual(mockAgent);
      expect(agentsService.attachTool).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
        "tool-1",
      );
    });

    it("should detach tool", async () => {
      agentsService.detachTool.mockResolvedValue(mockAgent as never);

      const result = await controller.detachTool(
        mockRequest,
        mockAgentId,
        "tool-1",
      );

      expect(result).toEqual(mockAgent);
      expect(agentsService.detachTool).toHaveBeenCalledWith(
        mockUserId,
        mockAgentId,
        "tool-1",
      );
    });
  });
});
