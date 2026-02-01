import { Test, TestingModule } from "@nestjs/testing";
import { getQueueToken } from "@nestjs/bullmq";
import { NotFoundException } from "@nestjs/common";
import { NewsWorkflowService, NEWS_WORKFLOW_QUEUE } from "./news-workflow.service";
import { PrismaService } from "../prisma.service";
import { GeocodingService } from "./services/geocoding.service";
import { WorkflowStatus, ProcessingStatus, LocationType } from "@prisma/client";

describe("NewsWorkflowService", () => {
  let service: NewsWorkflowService;
  let mockPrisma: jest.Mocked<PrismaService>;
  let mockGeocodingService: jest.Mocked<GeocodingService>;
  let mockQueue: { add: jest.Mock };

  const mockUserId = "user-123";
  const mockWorkflowId = "workflow-456";

  const mockWorkflow = {
    id: mockWorkflowId,
    userId: mockUserId,
    query: "crime",
    region: "San Francisco, CA",
    fromDate: new Date("2025-01-01"),
    toDate: new Date("2025-01-31"),
    maxArticles: 20,
    status: WorkflowStatus.PENDING,
    articlesFound: 0,
    articlesProcessed: 0,
    errorCount: 0,
    errorMessage: null,
    traceId: null,
    lettaAgentId: null,
    startedAt: null,
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockPrisma = {
      newsWorkflow: {
        create: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
      },
      newsArticle: {
        upsert: jest.fn(),
        update: jest.fn(),
      },
      articleLocation: {
        create: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    mockGeocodingService = {
      geocode: jest.fn(),
      batchGeocode: jest.fn(),
    } as unknown as jest.Mocked<GeocodingService>;

    mockQueue = {
      add: jest.fn().mockResolvedValue({ id: "job-123" }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsWorkflowService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: GeocodingService, useValue: mockGeocodingService },
        { provide: getQueueToken(NEWS_WORKFLOW_QUEUE), useValue: mockQueue },
      ],
    }).compile();

    service = module.get<NewsWorkflowService>(NewsWorkflowService);
  });

  describe("startWorkflow", () => {
    it("should create workflow and queue job", async () => {
      (mockPrisma.newsWorkflow.create as jest.Mock).mockResolvedValue(mockWorkflow);

      const result = await service.startWorkflow(mockUserId, {
        query: "crime",
        region: "San Francisco, CA",
        fromDate: "2025-01-01",
        toDate: "2025-01-31",
        maxArticles: 20,
      });

      expect(result.workflowId).toBe(mockWorkflowId);
      expect(result.jobId).toBe("job-123");
      expect(result.status).toBe("PENDING");
      expect(mockQueue.add).toHaveBeenCalledWith(
        "process-news",
        { workflowId: mockWorkflowId, userId: mockUserId },
        expect.any(Object),
      );
    });
  });

  describe("getWorkflowStatus", () => {
    it("should return workflow status", async () => {
      (mockPrisma.newsWorkflow.findFirst as jest.Mock).mockResolvedValue(mockWorkflow);

      const result = await service.getWorkflowStatus(mockUserId, mockWorkflowId);

      expect(result.id).toBe(mockWorkflowId);
      expect(result.query).toBe("crime");
      expect(result.status).toBe("PENDING");
    });

    it("should throw NotFoundException if workflow not found", async () => {
      (mockPrisma.newsWorkflow.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.getWorkflowStatus(mockUserId, "not-found"),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("getWorkflowReport", () => {
    it("should return workflow with articles", async () => {
      const workflowWithArticles = {
        ...mockWorkflow,
        articles: [
          {
            id: "article-1",
            url: "https://example.com/article",
            title: "Test Article",
            author: "John Doe",
            source: "Test Source",
            publishedAt: new Date(),
            content: "Article content",
            imageUrl: null,
            summary: "Article summary",
            keyPoints: ["point 1", "point 2"],
            sentiment: "neutral",
            status: ProcessingStatus.COMPLETED,
            locations: [
              {
                id: "loc-1",
                mention: "123 Main St",
                mentionType: LocationType.ADDRESS,
                context: "The incident occurred at 123 Main St",
                lat: 37.7749,
                lng: -122.4194,
                formattedAddress: "123 Main St, San Francisco, CA",
                confidence: 0.9,
                geocodeError: null,
              },
            ],
          },
        ],
      };

      (mockPrisma.newsWorkflow.findFirst as jest.Mock).mockResolvedValue(
        workflowWithArticles,
      );

      const result = await service.getWorkflowReport(mockUserId, mockWorkflowId);

      expect(result.id).toBe(mockWorkflowId);
      expect(result.articles).toHaveLength(1);
      expect(result.totalLocations).toBe(1);
      expect(result.geocodedLocations).toBe(1);
    });
  });

  describe("getWorkflowLocationsGeoJson", () => {
    it("should return GeoJSON FeatureCollection", async () => {
      const workflowWithLocations = {
        ...mockWorkflow,
        articles: [
          {
            id: "article-1",
            url: "https://example.com",
            title: "Test",
            publishedAt: new Date(),
            locations: [
              {
                id: "loc-1",
                mention: "123 Main St",
                mentionType: LocationType.ADDRESS,
                lat: 37.7749,
                lng: -122.4194,
                formattedAddress: "123 Main St",
                confidence: 0.9,
              },
            ],
          },
        ],
      };

      (mockPrisma.newsWorkflow.findFirst as jest.Mock).mockResolvedValue(
        workflowWithLocations,
      );

      const result = await service.getWorkflowLocationsGeoJson(
        mockUserId,
        mockWorkflowId,
      );

      expect(result.type).toBe("FeatureCollection");
      expect(result.features).toHaveLength(1);
      expect(result.features[0].geometry.type).toBe("Point");
      expect(result.features[0].geometry.coordinates).toEqual([-122.4194, 37.7749]);
    });
  });

  describe("listWorkflows", () => {
    it("should return list of workflows", async () => {
      (mockPrisma.newsWorkflow.findMany as jest.Mock).mockResolvedValue([mockWorkflow]);

      const result = await service.listWorkflows(mockUserId);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockWorkflowId);
    });
  });

  describe("updateWorkflowStatus", () => {
    it("should update workflow status", async () => {
      const updatedWorkflow = { ...mockWorkflow, status: WorkflowStatus.SEARCHING };
      (mockPrisma.newsWorkflow.update as jest.Mock).mockResolvedValue(updatedWorkflow);

      const result = await service.updateWorkflowStatus(
        mockWorkflowId,
        WorkflowStatus.SEARCHING,
        { startedAt: new Date() },
      );

      expect(result.status).toBe("SEARCHING");
    });
  });

  describe("saveArticleResults", () => {
    it("should save articles with geocoded locations", async () => {
      (mockPrisma.newsWorkflow.findUnique as jest.Mock).mockResolvedValue(mockWorkflow);
      (mockPrisma.newsArticle.upsert as jest.Mock).mockResolvedValue({
        id: "article-1",
      });
      mockGeocodingService.geocode.mockResolvedValue({
        success: true,
        lat: 37.7749,
        lng: -122.4194,
        formattedAddress: "123 Main St, San Francisco",
        confidence: 0.9,
      });
      (mockPrisma.articleLocation.create as jest.Mock).mockResolvedValue({});
      (mockPrisma.newsArticle.update as jest.Mock).mockResolvedValue({});
      (mockPrisma.newsWorkflow.update as jest.Mock).mockResolvedValue({});

      const result = await service.saveArticleResults(mockWorkflowId, [
        {
          url: "https://example.com/article",
          title: "Test Article",
          source: "Test Source",
          publishedAt: "2025-01-15T00:00:00Z",
          content: "Article content",
          summary: "Summary",
          locations: [
            {
              mention: "123 Main St",
              mentionType: "ADDRESS",
              context: "at 123 Main St",
            },
          ],
        },
      ]);

      expect(result.savedCount).toBe(1);
      expect(result.errorCount).toBe(0);
      expect(mockGeocodingService.geocode).toHaveBeenCalledWith(
        "123 Main St",
        "San Francisco, CA",
      );
    });

    it("should throw NotFoundException if workflow not found", async () => {
      (mockPrisma.newsWorkflow.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.saveArticleResults("not-found", []),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
