import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { WorkflowService } from "./workflow.service";
import { LettaService } from "../letta/letta.service";
import { TracingService } from "../tracing/tracing.service";
import { RESEARCH_PERSONA, MAP_PERSONA } from "./workflow.config";
import {
  DEFAULT_AGENT_MODEL,
  DEFAULT_EMBEDDING_MODEL,
  DEFAULT_AGENT_TOOLS,
} from "../config/letta.config";

describe("WorkflowService", () => {
  let service: WorkflowService;
  let lettaService: jest.Mocked<LettaService>;
  let tracingService: jest.Mocked<TracingService>;

  const mockUserId = "user-123";
  const mockBlock = { id: "block-1", label: "research", value: "" };
  const mockResearchAgent = { id: "research-agent-1", name: "Research Agent" };
  const mockMapAgent = { id: "map-agent-1", name: "Map Agent" };

  beforeEach(async () => {
    const mockLettaService = {
      createBlock: jest.fn(),
      createAgent: jest.fn(),
      updateBlockById: jest.fn(),
      sendMessage: jest.fn(),
    };

    const mockTracingService = {
      trace: jest.fn(<T>(_name: string, fn: () => Promise<T>) => fn()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkflowService,
        { provide: LettaService, useValue: mockLettaService },
        { provide: TracingService, useValue: mockTracingService },
      ],
    }).compile();

    service = module.get<WorkflowService>(WorkflowService);
    lettaService = module.get(LettaService);
    tracingService = module.get(TracingService);

    lettaService.createBlock.mockResolvedValue(mockBlock as never);
    lettaService.createAgent
      .mockResolvedValueOnce(mockResearchAgent as never)
      .mockResolvedValueOnce(mockMapAgent as never);
  });

  describe("getOrCreateAgents", () => {
    it("should create research and map agents with a shared block", async () => {
      const result = await service.getOrCreateAgents(mockUserId);

      expect(result).toEqual({
        researchAgentId: mockResearchAgent.id,
        mapAgentId: mockMapAgent.id,
        researchBlockId: mockBlock.id,
      });
      expect(lettaService.createBlock).toHaveBeenCalledWith({
        label: "research",
        value: "",
        description: "Research findings for the map agent",
      });
      expect(lettaService.createAgent).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          name: "Research Agent",
          model: DEFAULT_AGENT_MODEL,
          embedding: DEFAULT_EMBEDDING_MODEL,
          blockIds: [mockBlock.id],
          tools: DEFAULT_AGENT_TOOLS,
          memoryBlocks: expect.arrayContaining([
            { label: "persona", value: RESEARCH_PERSONA },
          ]),
        }),
      );
      expect(lettaService.createAgent).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          name: "Map Agent",
          model: DEFAULT_AGENT_MODEL,
          embedding: DEFAULT_EMBEDDING_MODEL,
          blockIds: [mockBlock.id],
          memoryBlocks: [{ label: "persona", value: MAP_PERSONA }],
        }),
      );
      expect(tracingService.trace).toHaveBeenCalledWith(
        "workflow.getOrCreateAgents",
        expect.any(Function),
      );
    });

    it("should return cached agents on subsequent calls", async () => {
      await service.getOrCreateAgents(mockUserId);
      lettaService.createBlock.mockClear();
      lettaService.createAgent.mockClear();

      const result = await service.getOrCreateAgents(mockUserId);

      expect(result.researchAgentId).toBe(mockResearchAgent.id);
      expect(lettaService.createBlock).not.toHaveBeenCalled();
      expect(lettaService.createAgent).not.toHaveBeenCalled();
    });
  });

  describe("updateBlock", () => {
    it("should update a block via Letta", async () => {
      await service.updateBlock("block-1", "New research content");

      expect(tracingService.trace).toHaveBeenCalledWith(
        "workflow.updateBlock",
        expect.any(Function),
      );
      expect(lettaService.updateBlockById).toHaveBeenCalledWith(
        "block-1",
        "New research content",
      );
    });
  });

  describe("isWorkflowAgent", () => {
    it("should return true for workflow agent ids", async () => {
      await service.getOrCreateAgents(mockUserId);

      expect(service.isWorkflowAgent(mockUserId, mockResearchAgent.id)).toBe(
        true,
      );
      expect(service.isWorkflowAgent(mockUserId, mockMapAgent.id)).toBe(true);
    });

    it("should return false for unknown agent ids", async () => {
      await service.getOrCreateAgents(mockUserId);

      expect(service.isWorkflowAgent(mockUserId, "other-agent")).toBe(false);
    });

    it("should return false when no agents exist for the user", () => {
      expect(service.isWorkflowAgent(mockUserId, mockResearchAgent.id)).toBe(
        false,
      );
    });
  });

  describe("sendMessage", () => {
    beforeEach(async () => {
      await service.getOrCreateAgents(mockUserId);
      lettaService.createBlock.mockClear();
      lettaService.createAgent.mockClear();
    });

    it("should reject messages to non-workflow agents", async () => {
      await expect(
        service.sendMessage(mockUserId, "unknown-agent", "Hello"),
      ).rejects.toThrow(BadRequestException);
    });

    it("should send a message to a research agent without updating map state", async () => {
      const mockResponse = {
        messages: [{ role: "assistant", content: "Research complete" }],
      };
      lettaService.sendMessage.mockResolvedValue(mockResponse as never);

      const result = await service.sendMessage(
        mockUserId,
        mockResearchAgent.id,
        "Find museums in Portland",
      );

      expect(result).toEqual(mockResponse);
      expect(lettaService.sendMessage).toHaveBeenCalledWith(
        mockResearchAgent.id,
        { content: "Find museums in Portland" },
      );
      expect(service.getMapState(mockUserId)).toBeNull();
    });

    it("should extract map state from map agent responses", async () => {
      const mapStateJson = JSON.stringify({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-122.68, 45.52] },
            properties: { title: "Portland Art Museum" },
          },
        ],
        view: { center: [-122.68, 45.52], zoom: 12 },
      });
      const mockResponse = {
        messages: [
          {
            role: "assistant",
            content: `Added the museum layer.\nMAP_STATE_JSON\n${mapStateJson}\nEND_MAP_STATE_JSON`,
          },
        ],
      };
      lettaService.sendMessage.mockResolvedValue(mockResponse as never);

      await service.sendMessage(
        mockUserId,
        mockMapAgent.id,
        "Show museums on the map",
      );

      expect(service.getMapState(mockUserId)).toEqual({
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
      });
    });

    it("should leave map state unchanged when map agent response has no valid state", async () => {
      const mockResponse = {
        messages: [{ role: "assistant", content: "No map output yet" }],
      };
      lettaService.sendMessage.mockResolvedValue(mockResponse as never);

      await service.sendMessage(mockUserId, mockMapAgent.id, "Build the map");

      expect(service.getMapState(mockUserId)).toBeNull();
    });
  });

  describe("getMapState and setMapState", () => {
    it("should return null when no map state exists", () => {
      expect(service.getMapState(mockUserId)).toBeNull();
    });

    it("should store and retrieve map state", () => {
      const state = {
        geoJson: {
          type: "FeatureCollection" as const,
          features: [],
        },
      };

      service.setMapState(mockUserId, state);

      expect(service.getMapState(mockUserId)).toEqual(state);
    });
  });
});
