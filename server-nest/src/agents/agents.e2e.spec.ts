import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import supertest from "supertest";
import { AgentsModule } from "./agents.module";
import { PrismaService } from "../prisma.service";
import { LettaService } from "../letta/letta.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

/**
 * E2E Integration Tests for Agents API
 *
 * These tests verify the HTTP endpoints work correctly by mocking
 * the database and Letta service layers.
 */
describe("Agents API (e2e)", () => {
  let app: INestApplication;
  let mockPrismaService: jest.Mocked<PrismaService>;
  let mockLettaService: jest.Mocked<LettaService>;

  const mockUserId = "user-test-123";
  const mockAgentId = "agent-test-456";

  const mockAgent = {
    id: mockAgentId,
    lettaAgentId: mockAgentId,
    userId: mockUserId,
    name: "Test Agent",
    description: "A test agent",
    model: "openai/gpt-4o-mini",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLettaAgent = {
    id: mockAgentId,
    name: "Test Agent",
    description: "A test agent",
    model: "openai/gpt-4o-mini",
    embedding: "openai/text-embedding-3-small",
    blocks: [
      { label: "persona", value: "I am helpful" },
      { label: "human", value: "Name: User" },
    ],
    tools: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Helper to get typed mock function
  const mockFn = <T>(fn: T): jest.Mock => fn as jest.Mock;

  beforeEach(async () => {
    // Create mock services
    mockPrismaService = {
      agent: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    mockLettaService = {
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
    } as unknown as jest.Mocked<LettaService>;

    // Create mock auth guard that always passes
    const mockJwtAuthGuard = {
      canActivate: jest.fn().mockImplementation((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = { userId: mockUserId, email: "test@test.com" };
        return true;
      }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AgentsModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(LettaService)
      .useValue(mockLettaService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  describe("POST /api/agents", () => {
    it("should create a new agent", async () => {
      mockLettaService.createAgent.mockResolvedValue(mockLettaAgent as never);
      mockFn(mockPrismaService.agent.create).mockResolvedValue(mockAgent);

      const response = await supertest(app.getHttpServer())
        .post("/api/agents")
        .send({
          name: "Test Agent",
          model: "openai/gpt-4o-mini",
          embedding: "openai/text-embedding-3-small",
        })
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("Test Agent");
    });

    it("should reject missing name", async () => {
      await supertest(app.getHttpServer())
        .post("/api/agents")
        .send({ model: "openai/gpt-4o-mini", embedding: "openai/text-embedding-3-small" })
        .expect(400);
    });

    it("should reject unknown properties", async () => {
      await supertest(app.getHttpServer())
        .post("/api/agents")
        .send({
          name: "Test",
          model: "openai/gpt-4o-mini",
          embedding: "openai/text-embedding-3-small",
          unknownField: "value",
        })
        .expect(400);
    });
  });

  describe("GET /api/agents", () => {
    it("should list agents for authenticated user", async () => {
      mockFn(mockPrismaService.agent.findMany).mockResolvedValue([mockAgent]);
      mockLettaService.retrieveAgent.mockResolvedValue(mockLettaAgent as never);

      const response = await supertest(app.getHttpServer())
        .get("/api/agents")
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe("Test Agent");
    });

    it("should return empty array if no agents", async () => {
      mockFn(mockPrismaService.agent.findMany).mockResolvedValue([]);

      const response = await supertest(app.getHttpServer())
        .get("/api/agents")
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe("GET /api/agents/:id", () => {
    it("should get agent by id", async () => {
      mockFn(mockPrismaService.agent.findFirst).mockResolvedValue(mockAgent);
      mockLettaService.retrieveAgent.mockResolvedValue(mockLettaAgent as never);

      const response = await supertest(app.getHttpServer())
        .get(`/api/agents/${mockAgentId}`)
        .expect(200);

      expect(response.body.id).toBe(mockAgentId);
    });

    it("should return 404 for non-existent agent", async () => {
      mockFn(mockPrismaService.agent.findFirst).mockResolvedValue(null);

      await supertest(app.getHttpServer())
        .get("/api/agents/non-existent")
        .expect(404);
    });
  });

  describe("PATCH /api/agents/:id", () => {
    it("should update agent", async () => {
      mockFn(mockPrismaService.agent.findFirst).mockResolvedValue(mockAgent);
      mockLettaService.updateAgent.mockResolvedValue({
        ...mockLettaAgent,
        name: "Updated Name",
      } as never);
      mockFn(mockPrismaService.agent.update).mockResolvedValue({
        ...mockAgent,
        name: "Updated Name",
      });

      const response = await supertest(app.getHttpServer())
        .patch(`/api/agents/${mockAgentId}`)
        .send({ name: "Updated Name" })
        .expect(200);

      expect(response.body.name).toBe("Updated Name");
    });
  });

  describe("DELETE /api/agents/:id", () => {
    it("should delete agent", async () => {
      mockFn(mockPrismaService.agent.findFirst).mockResolvedValue(mockAgent);
      mockLettaService.deleteAgent.mockResolvedValue(undefined as never);
      mockFn(mockPrismaService.agent.delete).mockResolvedValue(mockAgent);

      await supertest(app.getHttpServer())
        .delete(`/api/agents/${mockAgentId}`)
        .expect(204);
    });
  });

  describe("POST /api/agents/:id/messages", () => {
    it("should send message to agent", async () => {
      mockFn(mockPrismaService.agent.findFirst).mockResolvedValue(mockAgent);
      const mockResponse = {
        messages: [{ content: "Hello back!" }],
        usage: { total_tokens: 100 },
        stop_reason: { stop_reason: "end_turn" },
      };
      mockLettaService.sendMessage.mockResolvedValue(mockResponse as never);

      const response = await supertest(app.getHttpServer())
        .post(`/api/agents/${mockAgentId}/messages`)
        .send({ content: "Hello!" })
        .expect(201);

      expect(response.body.messages).toBeDefined();
    });

    it("should reject empty message", async () => {
      await supertest(app.getHttpServer())
        .post(`/api/agents/${mockAgentId}/messages`)
        .send({ content: "" })
        .expect(400);
    });
  });

  describe("GET /api/agents/:id/messages", () => {
    it("should list messages with pagination", async () => {
      mockFn(mockPrismaService.agent.findFirst).mockResolvedValue(mockAgent);
      const mockMessages = [{ id: "msg-1", content: "Hello" }];
      mockLettaService.listMessages.mockResolvedValue(mockMessages as never);

      const response = await supertest(app.getHttpServer())
        .get(`/api/agents/${mockAgentId}/messages?limit=10`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/agents/:id/blocks", () => {
    it("should list memory blocks", async () => {
      mockFn(mockPrismaService.agent.findFirst).mockResolvedValue(mockAgent);
      const mockBlocks = [
        { label: "persona", value: "I am helpful" },
        { label: "human", value: "Name: User" },
      ];
      mockLettaService.listBlocks.mockResolvedValue(mockBlocks as never);

      const response = await supertest(app.getHttpServer())
        .get(`/api/agents/${mockAgentId}/blocks`)
        .expect(200);

      expect(response.body).toHaveLength(2);
    });
  });

  describe("PATCH /api/agents/:id/blocks/:label", () => {
    it("should update memory block", async () => {
      mockFn(mockPrismaService.agent.findFirst).mockResolvedValue(mockAgent);
      const updatedBlock = { label: "persona", value: "I am very helpful" };
      mockLettaService.updateBlock.mockResolvedValue(updatedBlock as never);

      const response = await supertest(app.getHttpServer())
        .patch(`/api/agents/${mockAgentId}/blocks/persona`)
        .send({ value: "I am very helpful" })
        .expect(200);

      expect(response.body.value).toBe("I am very helpful");
    });
  });
});
