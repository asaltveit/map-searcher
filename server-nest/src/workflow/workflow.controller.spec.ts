import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import * as Express from "express";
import { WorkflowController } from "./workflow.controller";
import { WorkflowService, MapState } from "./workflow.service";

describe("WorkflowController", () => {
  let controller: WorkflowController;
  let workflowService: jest.Mocked<WorkflowService>;

  const mockUserId = "user-123";
  const mockAgents = {
    researchAgentId: "research-agent-1",
    mapAgentId: "map-agent-1",
    researchBlockId: "block-1",
  };

  const mockRequest = (userId?: string): Express.Request =>
    ({ userId }) as Express.Request & { userId?: string };

  beforeEach(async () => {
    const mockWorkflowService = {
      getOrCreateAgents: jest.fn(),
      updateBlock: jest.fn(),
      sendMessage: jest.fn(),
      getMapState: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowController],
      providers: [{ provide: WorkflowService, useValue: mockWorkflowService }],
    }).compile();

    controller = module.get<WorkflowController>(WorkflowController);
    workflowService = module.get(WorkflowService);
  });

  describe("getAgents", () => {
    it("should return workflow agents for the authenticated user", async () => {
      workflowService.getOrCreateAgents.mockResolvedValue(mockAgents);

      const result = await controller.getAgents(mockRequest(mockUserId));

      expect(result).toEqual(mockAgents);
      expect(workflowService.getOrCreateAgents).toHaveBeenCalledWith(
        mockUserId,
      );
    });

    it("should fall back to default user when userId is missing", async () => {
      workflowService.getOrCreateAgents.mockResolvedValue(mockAgents);

      await controller.getAgents(mockRequest());

      expect(workflowService.getOrCreateAgents).toHaveBeenCalledWith("default");
    });
  });

  describe("updateBlock", () => {
    it("should update the research block", async () => {
      workflowService.updateBlock.mockResolvedValue(undefined);

      const result = await controller.updateBlock(mockRequest(), {
        researchBlockId: "block-1",
        value: "Updated research",
      });

      expect(result).toEqual({ ok: true });
      expect(workflowService.updateBlock).toHaveBeenCalledWith(
        "block-1",
        "Updated research",
      );
    });

    it("should reject missing researchBlockId", async () => {
      await expect(
        controller.updateBlock(mockRequest(), {
          researchBlockId: "",
          value: "Updated research",
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it("should reject missing value", async () => {
      await expect(
        controller.updateBlock(mockRequest(), {
          researchBlockId: "block-1",
          value: null as unknown as string,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("sendMessage", () => {
    it("should send a message to a workflow agent", async () => {
      const mockResponse = { messages: [{ role: "assistant", content: "Hi" }] };
      workflowService.sendMessage.mockResolvedValue(mockResponse);

      const result = await controller.sendMessage(mockRequest(mockUserId), {
        agentId: mockAgents.researchAgentId,
        content: "  Hello workflow  ",
      });

      expect(result).toEqual(mockResponse);
      expect(workflowService.sendMessage).toHaveBeenCalledWith(
        mockUserId,
        mockAgents.researchAgentId,
        "Hello workflow",
      );
    });

    it("should fall back to default user when userId is missing", async () => {
      workflowService.sendMessage.mockResolvedValue({});

      await controller.sendMessage(mockRequest(), {
        agentId: mockAgents.mapAgentId,
        content: "Hello",
      });

      expect(workflowService.sendMessage).toHaveBeenCalledWith(
        "default",
        mockAgents.mapAgentId,
        "Hello",
      );
    });

    it("should reject missing agentId", async () => {
      await expect(
        controller.sendMessage(mockRequest(mockUserId), {
          agentId: "",
          content: "Hello",
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it("should reject non-string content", async () => {
      await expect(
        controller.sendMessage(mockRequest(mockUserId), {
          agentId: mockAgents.researchAgentId,
          content: null as unknown as string,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it("should reject empty content after trimming", async () => {
      await expect(
        controller.sendMessage(mockRequest(mockUserId), {
          agentId: mockAgents.researchAgentId,
          content: "   ",
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("getMapState", () => {
    it("should return map state for the user", () => {
      const mockMapState: MapState = {
        geoJson: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [-122.68, 45.52] },
              properties: { title: "Portland Art Museum" },
            },
          ],
        },
        view: { center: [-122.68, 45.52], zoom: 12 },
      };
      workflowService.getMapState.mockReturnValue(mockMapState);

      const result = controller.getMapState(mockRequest(mockUserId));

      expect(result).toEqual(mockMapState);
      expect(workflowService.getMapState).toHaveBeenCalledWith(mockUserId);
    });

    it("should fall back to default user when userId is missing", () => {
      workflowService.getMapState.mockReturnValue(null);

      controller.getMapState(mockRequest());

      expect(workflowService.getMapState).toHaveBeenCalledWith("default");
    });
  });
});
