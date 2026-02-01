import { Test, TestingModule } from "@nestjs/testing";
import { ToolsService } from "./tools.service";
import { LettaService } from "../letta/letta.service";

describe("ToolsService", () => {
  let service: ToolsService;
  let lettaService: jest.Mocked<LettaService>;

  const mockTool = {
    id: "tool-123",
    name: "web_search",
    description: "Search the web",
    toolType: "letta",
    tags: ["search"],
    jsonSchema: { parameters: {} },
  };

  beforeEach(async () => {
    const mockLettaService = {
      listTools: jest.fn(),
      getTool: jest.fn(),
      createTool: jest.fn(),
      deleteTool: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsService,
        { provide: LettaService, useValue: mockLettaService },
      ],
    }).compile();

    service = module.get<ToolsService>(ToolsService);
    lettaService = module.get(LettaService);
  });

  describe("listTools", () => {
    it("should return list of tools", async () => {
      const tools = [mockTool];
      lettaService.listTools.mockResolvedValue(tools as never);

      const result = await service.listTools({});

      expect(result).toEqual(tools);
      expect(lettaService.listTools).toHaveBeenCalled();
    });

    it("should filter by name", async () => {
      lettaService.listTools.mockResolvedValue([mockTool] as never);

      await service.listTools({ name: "web_search" });

      expect(lettaService.listTools).toHaveBeenCalledWith({
        name: "web_search",
      });
    });
  });

  describe("getTool", () => {
    it("should return tool by id", async () => {
      lettaService.getTool.mockResolvedValue(mockTool as never);

      const result = await service.getTool("tool-123");

      expect(result).toEqual(mockTool);
      expect(lettaService.getTool).toHaveBeenCalledWith("tool-123");
    });
  });

  describe("createTool", () => {
    it("should create a custom tool", async () => {
      lettaService.createTool.mockResolvedValue(mockTool as never);

      const result = await service.createTool({
        sourceCode: 'def my_tool(): return "hello"',
        description: "A custom tool",
        tags: ["custom"],
      });

      expect(result).toEqual(mockTool);
      expect(lettaService.createTool).toHaveBeenCalledWith({
        sourceCode: 'def my_tool(): return "hello"',
        description: "A custom tool",
        tags: ["custom"],
      });
    });
  });

  describe("deleteTool", () => {
    it("should delete a tool", async () => {
      lettaService.deleteTool.mockResolvedValue(undefined as never);

      await service.deleteTool("tool-123");

      expect(lettaService.deleteTool).toHaveBeenCalledWith("tool-123");
    });
  });
});
