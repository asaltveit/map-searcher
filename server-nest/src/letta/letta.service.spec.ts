import { Test, TestingModule } from "@nestjs/testing";
import { LettaService } from "./letta.service";

describe("LettaService", () => {
  let service: LettaService;

  beforeEach(async () => {
    // Remove LETTA_API_KEY to test disabled mode
    const originalEnv = process.env.LETTA_API_KEY;
    delete process.env.LETTA_API_KEY;

    const module: TestingModule = await Test.createTestingModule({
      providers: [LettaService],
    }).compile();

    service = module.get<LettaService>(LettaService);

    // Trigger onModuleInit
    service.onModuleInit();

    // Restore env
    if (originalEnv) {
      process.env.LETTA_API_KEY = originalEnv;
    }
  });

  describe("initialization", () => {
    it("should not initialize client without API key", () => {
      // Service should be created but client should be null
      expect(service).toBeDefined();
    });

    it("should throw error when calling methods without API key", async () => {
      // Any method should throw since client is not initialized
      await expect(service.listAgents()).rejects.toThrow(
        "Letta client not initialized",
      );
    });
  });

  describe("ensureClient", () => {
    it("should throw descriptive error when client not initialized", async () => {
      await expect(service.createAgent({ name: "test" })).rejects.toThrow(
        "LETTA_API_KEY required",
      );
    });
  });
});

describe("LettaService with API key", () => {
  // These tests would require mocking the Letta SDK
  // For now, we just verify the service structure
  it("should have all required methods defined", () => {
    const service = new LettaService();

    // Agent methods
    expect(typeof service.createAgent).toBe("function");
    expect(typeof service.listAgents).toBe("function");
    expect(typeof service.retrieveAgent).toBe("function");
    expect(typeof service.updateAgent).toBe("function");
    expect(typeof service.deleteAgent).toBe("function");

    // Message methods
    expect(typeof service.sendMessage).toBe("function");
    expect(typeof service.listMessages).toBe("function");
    expect(typeof service.resetMessages).toBe("function");

    // Block methods
    expect(typeof service.listBlocks).toBe("function");
    expect(typeof service.getBlock).toBe("function");
    expect(typeof service.updateBlock).toBe("function");

    // Tool methods
    expect(typeof service.listAgentTools).toBe("function");
    expect(typeof service.attachTool).toBe("function");
    expect(typeof service.detachTool).toBe("function");
    expect(typeof service.listTools).toBe("function");
    expect(typeof service.getTool).toBe("function");
    expect(typeof service.createTool).toBe("function");
    expect(typeof service.deleteTool).toBe("function");

    // Model methods
    expect(typeof service.listModels).toBe("function");
    expect(typeof service.listEmbeddingModels).toBe("function");
  });
});
