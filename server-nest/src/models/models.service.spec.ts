import { Test, TestingModule } from "@nestjs/testing";
import { ModelsService } from "./models.service";
import { LettaService } from "../letta/letta.service";

describe("ModelsService", () => {
  let service: ModelsService;
  let lettaService: jest.Mocked<LettaService>;

  const mockModels = [
    { handle: "openai/gpt-4o", name: "GPT-4o" },
    { handle: "openai/gpt-4o-mini", name: "GPT-4o Mini" },
  ];

  const mockEmbeddingModels = [
    { handle: "openai/text-embedding-3-small", name: "Text Embedding Small" },
    { handle: "openai/text-embedding-3-large", name: "Text Embedding Large" },
  ];

  beforeEach(async () => {
    const mockLettaService = {
      listModels: jest.fn(),
      listEmbeddingModels: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModelsService,
        { provide: LettaService, useValue: mockLettaService },
      ],
    }).compile();

    service = module.get<ModelsService>(ModelsService);
    lettaService = module.get(LettaService);
  });

  describe("listModels", () => {
    it("should return list of LLM models", async () => {
      lettaService.listModels.mockResolvedValue(mockModels as never);

      const result = await service.listModels();

      expect(result).toEqual(mockModels);
      expect(lettaService.listModels).toHaveBeenCalled();
    });
  });

  describe("listEmbeddingModels", () => {
    it("should return list of embedding models", async () => {
      lettaService.listEmbeddingModels.mockResolvedValue(
        mockEmbeddingModels as never,
      );

      const result = await service.listEmbeddingModels();

      expect(result).toEqual(mockEmbeddingModels);
      expect(lettaService.listEmbeddingModels).toHaveBeenCalled();
    });
  });
});
