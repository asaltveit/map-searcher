/**
 * Generate OpenAPI JSON from NestJS Swagger
 *
 * This script bootstraps the NestJS application and exports the
 * Swagger/OpenAPI document to a JSON file for Portman to consume.
 */
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "../src/app.controller";
import { AppService } from "../src/app.service";
import { HealthController } from "../src/health.controller";
import { MonitoringModule } from "../src/monitoring/monitoring.module";
import { ResearchModule } from "../src/research/research.module";

// Create a minimal app module for OpenAPI generation
// Note: AuthModule imports AgentsModule (for default agent creation) causing circular deps.
// All endpoint paths are added manually in addLettaPaths() and addAuthPaths().
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MonitoringModule,
    ResearchModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
class OpenApiAppModule {}

// Manually add Agent, Tools, and Models paths since Letta types cause circular dependencies
function addLettaPaths(document: OpenAPIObject): OpenAPIObject {
  // ==================== AGENTS ====================
  document.paths["/api/agents"] = {
    get: {
      operationId: "AgentsController_listAgents",
      summary: "List all agents for the authenticated user",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      responses: {
        "200": {
          description: "List of agents",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/AgentListItemDto" },
              },
            },
          },
        },
      },
    },
    post: {
      operationId: "AgentsController_createAgent",
      summary: "Create a new agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateAgentDto" },
          },
        },
      },
      responses: {
        "201": {
          description: "Agent created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AgentResponseDto" },
            },
          },
        },
      },
    },
  };

  document.paths["/api/agents/{id}"] = {
    get: {
      operationId: "AgentsController_getAgent",
      summary: "Get a single agent by ID",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "Agent details",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AgentResponseDto" },
            },
          },
        },
        "404": { description: "Agent not found" },
      },
    },
    patch: {
      operationId: "AgentsController_updateAgent",
      summary: "Update an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UpdateAgentDto" },
          },
        },
      },
      responses: {
        "200": {
          description: "Agent updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AgentResponseDto" },
            },
          },
        },
      },
    },
    delete: {
      operationId: "AgentsController_deleteAgent",
      summary: "Delete an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "204": { description: "Agent deleted" },
        "404": { description: "Agent not found" },
      },
    },
  };

  // ==================== MESSAGES ====================
  document.paths["/api/agents/{id}/messages"] = {
    get: {
      operationId: "AgentsController_listMessages",
      summary: "Get conversation history for an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
        { name: "limit", in: "query", required: false, schema: { type: "integer" } },
        { name: "before", in: "query", required: false, schema: { type: "string" } },
        { name: "after", in: "query", required: false, schema: { type: "string" } },
        { name: "order", in: "query", required: false, schema: { type: "string", enum: ["asc", "desc"] } },
      ],
      responses: {
        "200": {
          description: "Message history",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageHistoryResponseDto" },
            },
          },
        },
      },
    },
    post: {
      operationId: "AgentsController_sendMessage",
      summary: "Send a message to an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/SendMessageDto" },
          },
        },
      },
      responses: {
        "201": {
          description: "Message response",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponseDto" },
            },
          },
        },
      },
    },
  };

  document.paths["/api/agents/{id}/messages/reset"] = {
    post: {
      operationId: "AgentsController_resetMessages",
      summary: "Reset conversation history for an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ResetMessagesDto" },
          },
        },
      },
      responses: {
        "200": {
          description: "Messages reset",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AgentResponseDto" },
            },
          },
        },
      },
    },
  };

  // ==================== MEMORY BLOCKS ====================
  document.paths["/api/agents/{id}/blocks"] = {
    get: {
      operationId: "AgentsController_listBlocks",
      summary: "List memory blocks for an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "List of memory blocks",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/MemoryBlockResponseDto" },
              },
            },
          },
        },
      },
    },
  };

  document.paths["/api/agents/{id}/blocks/{label}"] = {
    get: {
      operationId: "AgentsController_getBlock",
      summary: "Get a specific memory block by label",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
        { name: "label", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "Memory block",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MemoryBlockResponseDto" },
            },
          },
        },
      },
    },
    patch: {
      operationId: "AgentsController_updateBlock",
      summary: "Update a memory block",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
        { name: "label", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UpdateBlockDto" },
          },
        },
      },
      responses: {
        "200": {
          description: "Memory block updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MemoryBlockResponseDto" },
            },
          },
        },
      },
    },
  };

  // ==================== AGENT TOOLS ====================
  document.paths["/api/agents/{id}/tools"] = {
    get: {
      operationId: "AgentsController_listAgentTools",
      summary: "List tools attached to an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "List of tools",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/ToolSummaryDto" },
              },
            },
          },
        },
      },
    },
  };

  document.paths["/api/agents/{id}/tools/{toolId}/attach"] = {
    post: {
      operationId: "AgentsController_attachTool",
      summary: "Attach a tool to an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
        { name: "toolId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "Tool attached",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AgentResponseDto" },
            },
          },
        },
      },
    },
  };

  document.paths["/api/agents/{id}/tools/{toolId}"] = {
    delete: {
      operationId: "AgentsController_detachTool",
      summary: "Detach a tool from an agent",
      tags: ["Agents"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
        { name: "toolId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "Tool detached",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AgentResponseDto" },
            },
          },
        },
      },
    },
  };

  // ==================== GLOBAL TOOLS ====================
  document.paths["/api/tools"] = {
    get: {
      operationId: "ToolsController_listTools",
      summary: "List all available tools",
      tags: ["Tools"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "name", in: "query", required: false, schema: { type: "string" } },
        { name: "search", in: "query", required: false, schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "List of tools",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/ToolListItemDto" },
              },
            },
          },
        },
      },
    },
    post: {
      operationId: "ToolsController_createTool",
      summary: "Create a custom tool",
      tags: ["Tools"],
      security: [{ "access-token": [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateToolDto" },
          },
        },
      },
      responses: {
        "201": {
          description: "Tool created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ToolResponseDto" },
            },
          },
        },
      },
    },
  };

  document.paths["/api/tools/{id}"] = {
    get: {
      operationId: "ToolsController_getTool",
      summary: "Get a tool by ID",
      tags: ["Tools"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "Tool details",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ToolResponseDto" },
            },
          },
        },
      },
    },
    delete: {
      operationId: "ToolsController_deleteTool",
      summary: "Delete a custom tool",
      tags: ["Tools"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "204": { description: "Tool deleted" },
      },
    },
  };

  // ==================== MODELS ====================
  document.paths["/api/models"] = {
    get: {
      operationId: "ModelsController_listModels",
      summary: "List available LLM models",
      tags: ["Models"],
      security: [{ "access-token": [] }],
      responses: {
        "200": {
          description: "List of models",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/ModelDto" },
              },
            },
          },
        },
      },
    },
  };

  document.paths["/api/models/embeddings"] = {
    get: {
      operationId: "ModelsController_listEmbeddingModels",
      summary: "List available embedding models",
      tags: ["Models"],
      security: [{ "access-token": [] }],
      responses: {
        "200": {
          description: "List of embedding models",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/EmbeddingModelDto" },
              },
            },
          },
        },
      },
    },
  };

  // ==================== SCHEMAS ====================
  if (!document.components) document.components = {};
  if (!document.components.schemas) document.components.schemas = {};

  // Agent DTOs
  document.components.schemas["CreateAgentDto"] = {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string", minLength: 1, maxLength: 100, example: "my_assistant" },
      description: { type: "string", maxLength: 500 },
      model: { type: "string", example: "openai/gpt-4o-mini" },
      embedding: { type: "string", example: "openai/text-embedding-3-small" },
      system: { type: "string", maxLength: 50000 },
      memoryBlocks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            value: { type: "string" },
            limit: { type: "integer" },
          },
        },
      },
      tools: { type: "array", items: { type: "string" } },
      temperature: { type: "number", minimum: 0, maximum: 2 },
      tags: { type: "array", items: { type: "string" } },
    },
  };

  document.components.schemas["UpdateAgentDto"] = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1, maxLength: 100 },
      description: { type: "string", maxLength: 500 },
      model: { type: "string" },
      system: { type: "string", maxLength: 50000 },
      temperature: { type: "number", minimum: 0, maximum: 2 },
      tags: { type: "array", items: { type: "string" } },
    },
  };

  document.components.schemas["AgentResponseDto"] = {
    type: "object",
    properties: {
      id: { type: "string", example: "agent-123..." },
      name: { type: "string", example: "my_assistant" },
      description: { type: "string" },
      model: { type: "string", example: "openai/gpt-4o-mini" },
      embedding: { type: "string", example: "openai/text-embedding-3-small" },
      agent_type: { type: "string", example: "letta_v1_agent" },
      blocks: { type: "array", items: { $ref: "#/components/schemas/MemoryBlockResponseDto" } },
      tools: { type: "array", items: { $ref: "#/components/schemas/ToolSummaryDto" } },
      tags: { type: "array", items: { type: "string" } },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
    },
  };

  document.components.schemas["AgentListItemDto"] = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      model: { type: "string" },
      agent_type: { type: "string" },
      created_at: { type: "string", format: "date-time" },
    },
  };

  // Message DTOs
  document.components.schemas["SendMessageDto"] = {
    type: "object",
    required: ["content"],
    properties: {
      content: { type: "string", minLength: 1, maxLength: 10000, example: "Hello! What can you help me with?" },
      maxSteps: { type: "integer", minimum: 1, maximum: 100 },
    },
  };

  document.components.schemas["ResetMessagesDto"] = {
    type: "object",
    properties: {
      addDefaultInitialMessages: { type: "boolean", default: true },
    },
  };

  document.components.schemas["MessageResponseDto"] = {
    type: "object",
    properties: {
      messages: { type: "array", items: { type: "object" } },
      stop_reason: { type: "object" },
      usage: {
        type: "object",
        properties: {
          prompt_tokens: { type: "integer" },
          completion_tokens: { type: "integer" },
          total_tokens: { type: "integer" },
          step_count: { type: "integer" },
        },
      },
    },
  };

  document.components.schemas["MessageHistoryResponseDto"] = {
    type: "object",
    properties: {
      messages: { type: "array", items: { type: "object" } },
    },
  };

  // Memory Block DTOs
  document.components.schemas["MemoryBlockResponseDto"] = {
    type: "object",
    properties: {
      id: { type: "string" },
      label: { type: "string", example: "persona" },
      value: { type: "string", example: "I am a helpful AI assistant." },
      description: { type: "string" },
      limit: { type: "integer" },
    },
  };

  document.components.schemas["UpdateBlockDto"] = {
    type: "object",
    properties: {
      value: { type: "string", maxLength: 50000 },
      description: { type: "string", maxLength: 500 },
      limit: { type: "integer", minimum: 100, maximum: 50000 },
    },
  };

  // Tool DTOs
  document.components.schemas["ToolSummaryDto"] = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      tool_type: { type: "string" },
    },
  };

  document.components.schemas["CreateToolDto"] = {
    type: "object",
    required: ["sourceCode"],
    properties: {
      sourceCode: { type: "string", minLength: 10, maxLength: 50000 },
      name: { type: "string", minLength: 1, maxLength: 100 },
      description: { type: "string", maxLength: 1000 },
      tags: { type: "array", items: { type: "string" } },
    },
  };

  document.components.schemas["ToolResponseDto"] = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      toolType: { type: "string" },
      sourceCode: { type: "string" },
      tags: { type: "array", items: { type: "string" } },
      jsonSchema: { type: "object" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  };

  document.components.schemas["ToolListItemDto"] = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      toolType: { type: "string" },
      tags: { type: "array", items: { type: "string" } },
    },
  };

  // Model DTOs
  document.components.schemas["ModelDto"] = {
    type: "object",
    properties: {
      handle: { type: "string", example: "openai/gpt-4o" },
      name: { type: "string", example: "GPT-4o" },
      provider: { type: "string", example: "openai" },
      context_window: { type: "integer" },
    },
  };

  document.components.schemas["EmbeddingModelDto"] = {
    type: "object",
    properties: {
      handle: { type: "string", example: "openai/text-embedding-3-small" },
      name: { type: "string", example: "Text Embedding 3 Small" },
      provider: { type: "string", example: "openai" },
      embedding_dim: { type: "integer" },
    },
  };

  return document;
}

// Manually add News Workflow paths
function addNewsWorkflowPaths(document: OpenAPIObject): OpenAPIObject {
  // ==================== NEWS WORKFLOW ENDPOINTS ====================
  document.paths["/api/news-workflow/start"] = {
    post: {
      operationId: "NewsWorkflowController_startWorkflow",
      summary: "Start a new news workflow",
      description:
        "Creates a new news search workflow and queues it for background processing. " +
        "The workflow will search for news articles matching the query within the specified date range, " +
        "extract location mentions, geocode them, and generate summaries.",
      tags: ["News Workflow"],
      security: [{ "access-token": [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/StartWorkflowDto" },
          },
        },
      },
      responses: {
        "201": {
          description: "Workflow created and queued for processing",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/StartWorkflowResponseDto" },
            },
          },
        },
        "400": {
          description: "Invalid input - fromDate must be before toDate",
        },
        "401": { description: "Unauthorized - JWT token required" },
      },
    },
  };

  document.paths["/api/news-workflow"] = {
    get: {
      operationId: "NewsWorkflowController_listWorkflows",
      summary: "List user's workflows",
      description:
        "Returns all news workflows created by the authenticated user, ordered by creation date descending.",
      tags: ["News Workflow"],
      security: [{ "access-token": [] }],
      responses: {
        "200": {
          description: "List of workflows",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/WorkflowListItemDto" },
              },
            },
          },
        },
        "401": { description: "Unauthorized - JWT token required" },
      },
    },
  };

  document.paths["/api/news-workflow/{id}/status"] = {
    get: {
      operationId: "NewsWorkflowController_getWorkflowStatus",
      summary: "Get workflow status",
      description:
        "Returns the current status and progress of a workflow, including article counts and any errors.",
      tags: ["News Workflow"],
      security: [{ "access-token": [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Workflow ID (UUID format)",
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": {
          description: "Workflow status",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WorkflowStatusDto" },
            },
          },
        },
        "400": { description: "Invalid workflow ID format" },
        "401": { description: "Unauthorized - JWT token required" },
        "404": { description: "Workflow not found or not owned by user" },
      },
    },
  };

  document.paths["/api/news-workflow/{id}/report"] = {
    get: {
      operationId: "NewsWorkflowController_getWorkflowReport",
      summary: "Get full workflow report",
      description:
        "Returns the complete workflow with all processed articles, extracted locations, " +
        "AI-generated summaries, key points, and sentiment analysis.",
      tags: ["News Workflow"],
      security: [{ "access-token": [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Workflow ID (UUID format)",
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": {
          description: "Workflow report with articles and locations",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WorkflowReportDto" },
            },
          },
        },
        "400": { description: "Invalid workflow ID format" },
        "401": { description: "Unauthorized - JWT token required" },
        "404": { description: "Workflow not found or not owned by user" },
      },
    },
  };

  document.paths["/api/news-workflow/{id}/locations"] = {
    get: {
      operationId: "NewsWorkflowController_getWorkflowLocations",
      summary: "Get workflow locations as GeoJSON",
      description:
        "Returns all geocoded locations as a GeoJSON FeatureCollection for map display. " +
        "Each feature includes the location coordinates, article metadata, and geocoding confidence.",
      tags: ["News Workflow"],
      security: [{ "access-token": [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Workflow ID (UUID format)",
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": {
          description: "GeoJSON FeatureCollection of locations",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GeoJsonResponseDto" },
            },
          },
        },
        "400": { description: "Invalid workflow ID format" },
        "401": { description: "Unauthorized - JWT token required" },
        "404": { description: "Workflow not found or not owned by user" },
      },
    },
  };

  // ==================== NEWS WORKFLOW SCHEMAS ====================
  if (!document.components) document.components = {};
  if (!document.components.schemas) document.components.schemas = {};

  // Request DTOs
  document.components.schemas["StartWorkflowDto"] = {
    type: "object",
    required: ["query", "region", "fromDate", "toDate"],
    properties: {
      query: {
        type: "string",
        minLength: 2,
        maxLength: 200,
        description: "Search query for news articles",
        example: "crime",
      },
      region: {
        type: "string",
        minLength: 2,
        maxLength: 200,
        description: "Region for geocoding context (city, state, country)",
        example: "San Francisco, CA, USA",
      },
      fromDate: {
        type: "string",
        format: "date",
        description: "Start date for article search (ISO 8601)",
        example: "2025-01-01",
      },
      toDate: {
        type: "string",
        format: "date",
        description: "End date for article search (ISO 8601)",
        example: "2025-01-31",
      },
      maxArticles: {
        type: "integer",
        minimum: 1,
        maximum: 50,
        default: 20,
        description: "Maximum number of articles to process",
        example: 20,
      },
    },
  };

  // Response DTOs
  document.components.schemas["StartWorkflowResponseDto"] = {
    type: "object",
    properties: {
      workflowId: { type: "string", format: "uuid", description: "Workflow ID" },
      jobId: { type: "string", description: "BullMQ job ID for tracking" },
      status: { type: "string", example: "PENDING", description: "Current workflow status" },
      statusUrl: {
        type: "string",
        description: "URL to check workflow status",
        example: "/api/news-workflow/123e4567-e89b-12d3-a456-426614174000/status",
      },
    },
  };

  document.components.schemas["WorkflowStatusDto"] = {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid", description: "Workflow ID" },
      query: { type: "string", description: "Search query" },
      region: { type: "string", description: "Region for geocoding context" },
      fromDate: { type: "string", format: "date-time", description: "Start date for search" },
      toDate: { type: "string", format: "date-time", description: "End date for search" },
      status: {
        type: "string",
        enum: ["PENDING", "SEARCHING", "PROCESSING", "COMPLETED", "FAILED"],
        description: "Current workflow status",
      },
      articlesFound: { type: "integer", description: "Number of articles found" },
      articlesProcessed: { type: "integer", description: "Number of articles processed" },
      errorCount: { type: "integer", description: "Number of errors encountered" },
      errorMessage: { type: "string", description: "Error message if failed" },
      traceId: { type: "string", description: "Weave trace ID for observability" },
      startedAt: { type: "string", format: "date-time", description: "When processing started" },
      completedAt: { type: "string", format: "date-time", description: "When processing completed" },
      createdAt: { type: "string", format: "date-time", description: "When workflow was created" },
    },
  };

  document.components.schemas["WorkflowListItemDto"] = {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid", description: "Workflow ID" },
      query: { type: "string", description: "Search query" },
      region: { type: "string", description: "Region" },
      status: {
        type: "string",
        enum: ["PENDING", "SEARCHING", "PROCESSING", "COMPLETED", "FAILED"],
        description: "Current status",
      },
      articlesFound: { type: "integer", description: "Number of articles found" },
      articlesProcessed: { type: "integer", description: "Number of articles processed" },
      createdAt: { type: "string", format: "date-time", description: "When created" },
      completedAt: { type: "string", format: "date-time", description: "When completed" },
    },
  };

  document.components.schemas["LocationDto"] = {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid", description: "Location ID" },
      mention: { type: "string", description: "Original mention text from article" },
      mentionType: {
        type: "string",
        enum: ["ADDRESS", "CROSS_STREET", "BUSINESS", "PARK", "LANDMARK", "CITY", "OTHER"],
        description: "Type of location mention",
      },
      context: { type: "string", description: "Context around the mention" },
      lat: { type: "number", format: "double", description: "Latitude coordinate" },
      lng: { type: "number", format: "double", description: "Longitude coordinate" },
      formattedAddress: { type: "string", description: "Formatted address from geocoder" },
      confidence: {
        type: "number",
        minimum: 0,
        maximum: 1,
        description: "Confidence score (0-1)",
      },
      geocodeError: { type: "string", description: "Geocoding error if any" },
    },
  };

  document.components.schemas["ArticleDto"] = {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid", description: "Article ID" },
      url: { type: "string", format: "uri", description: "Article URL" },
      title: { type: "string", description: "Article title" },
      author: { type: "string", description: "Article author" },
      source: { type: "string", description: "Source/publisher name" },
      publishedAt: { type: "string", format: "date-time", description: "Publication date" },
      content: { type: "string", description: "Article content" },
      imageUrl: { type: "string", format: "uri", description: "Featured image URL" },
      summary: { type: "string", description: "AI-generated summary" },
      keyPoints: {
        type: "array",
        items: { type: "string" },
        description: "Key points extracted from article",
      },
      sentiment: {
        type: "string",
        enum: ["positive", "negative", "neutral"],
        description: "Sentiment analysis result",
      },
      status: {
        type: "string",
        enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
        description: "Processing status",
      },
      locations: {
        type: "array",
        items: { $ref: "#/components/schemas/LocationDto" },
        description: "Locations mentioned in article",
      },
    },
  };

  document.components.schemas["WorkflowReportDto"] = {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid", description: "Workflow ID" },
      query: { type: "string", description: "Search query" },
      region: { type: "string", description: "Region" },
      fromDate: { type: "string", format: "date-time", description: "Date range start" },
      toDate: { type: "string", format: "date-time", description: "Date range end" },
      status: { type: "string", description: "Workflow status" },
      articlesFound: { type: "integer", description: "Total articles found" },
      articlesProcessed: { type: "integer", description: "Total articles processed" },
      totalLocations: { type: "integer", description: "Total unique locations" },
      geocodedLocations: { type: "integer", description: "Total geocoded locations" },
      articles: {
        type: "array",
        items: { $ref: "#/components/schemas/ArticleDto" },
        description: "Processed articles with locations",
      },
      createdAt: { type: "string", format: "date-time", description: "When created" },
      completedAt: { type: "string", format: "date-time", description: "When completed" },
    },
  };

  document.components.schemas["GeoJsonPointGeometry"] = {
    type: "object",
    properties: {
      type: { type: "string", enum: ["Point"], example: "Point" },
      coordinates: {
        type: "array",
        items: { type: "number" },
        minItems: 2,
        maxItems: 2,
        description: "Coordinates [longitude, latitude]",
        example: [-122.4194, 37.7749],
      },
    },
  };

  document.components.schemas["GeoJsonFeatureProperties"] = {
    type: "object",
    properties: {
      locationId: { type: "string", format: "uuid", description: "Location ID" },
      articleId: { type: "string", format: "uuid", description: "Article ID" },
      articleTitle: { type: "string", description: "Article title" },
      mention: { type: "string", description: "Location mention text" },
      mentionType: { type: "string", description: "Type of location mention" },
      formattedAddress: { type: "string", description: "Formatted address from geocoder" },
      confidence: { type: "number", description: "Geocoding confidence score" },
      articleUrl: { type: "string", format: "uri", description: "Article URL" },
      publishedAt: { type: "string", format: "date-time", description: "Article publication date" },
    },
  };

  document.components.schemas["GeoJsonFeatureDto"] = {
    type: "object",
    properties: {
      type: { type: "string", enum: ["Feature"], example: "Feature" },
      geometry: { $ref: "#/components/schemas/GeoJsonPointGeometry" },
      properties: { $ref: "#/components/schemas/GeoJsonFeatureProperties" },
    },
  };

  document.components.schemas["GeoJsonResponseDto"] = {
    type: "object",
    properties: {
      type: { type: "string", enum: ["FeatureCollection"], example: "FeatureCollection" },
      features: {
        type: "array",
        items: { $ref: "#/components/schemas/GeoJsonFeatureDto" },
        description: "GeoJSON features",
      },
    },
  };

  return document;
}

// Manually add Auth paths since AuthModule imports AgentsModule causing circular deps
function addAuthPaths(document: OpenAPIObject): OpenAPIObject {
  document.paths["/api/auth/register"] = {
    post: {
      operationId: "AuthController_register",
      summary: "Register a new user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", format: "email", example: "user@example.com" },
                password: { type: "string", minLength: 8, example: "SecureP@ss123" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                  createdAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      },
    },
  };

  document.paths["/api/auth/login"] = {
    post: {
      operationId: "AuthController_login",
      summary: "Login user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", format: "email", example: "user@example.com" },
                password: { type: "string", minLength: 8, example: "SecureP@ss123" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      email: { type: "string" },
                      role: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  document.paths["/api/auth/logout"] = {
    post: {
      operationId: "AuthController_logout",
      summary: "Logout user",
      tags: ["Auth"],
      responses: {
        "200": {
          description: "Logout successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                },
              },
            },
          },
        },
      },
    },
  };

  document.paths["/api/auth/me"] = {
    get: {
      operationId: "AuthController_me",
      summary: "Get current user",
      tags: ["Auth"],
      security: [{ "access-token": [] }],
      responses: {
        "200": {
          description: "Current user info",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  sub: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  };

  return document;
}

// Manually add Alerts paths (AlertsModule imports JwtAuthGuard causing potential deps issues)
function addAlertsPaths(document: OpenAPIObject): OpenAPIObject {
  // Schemas
  document.components = document.components || {};
  document.components.schemas = document.components.schemas || {};

  document.components.schemas["CreateAlertDto"] = {
    type: "object",
    required: ["query", "region"],
    properties: {
      query: { type: "string", minLength: 2, maxLength: 200, description: "Search query for news articles", example: "robberies" },
      region: { type: "string", minLength: 2, maxLength: 200, description: "Region for geocoding context", example: "Savannah, GA" },
      maxArticles: { type: "integer", minimum: 1, maximum: 50, default: 20, description: "Maximum articles per run" },
      frequency: { type: "string", enum: ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY", "MANUAL"], default: "MANUAL", description: "How often to run" },
      isActive: { type: "boolean", default: true, description: "Whether alert is active" },
    },
  };

  document.components.schemas["UpdateAlertDto"] = {
    type: "object",
    properties: {
      query: { type: "string", minLength: 2, maxLength: 200 },
      region: { type: "string", minLength: 2, maxLength: 200 },
      maxArticles: { type: "integer", minimum: 1, maximum: 50 },
      frequency: { type: "string", enum: ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY", "MANUAL"] },
      isActive: { type: "boolean" },
    },
  };

  document.components.schemas["AlertResponseDto"] = {
    type: "object",
    properties: {
      id: { type: "string" },
      query: { type: "string" },
      region: { type: "string" },
      maxArticles: { type: "integer" },
      frequency: { type: "string", enum: ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY", "MANUAL"] },
      isActive: { type: "boolean" },
      lastRunAt: { type: "string", format: "date-time", nullable: true },
      nextRunAt: { type: "string", format: "date-time", nullable: true },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      articleCount: { type: "integer" },
    },
  };

  document.components.schemas["AlertListItemDto"] = {
    type: "object",
    properties: {
      id: { type: "string" },
      query: { type: "string" },
      region: { type: "string" },
      frequency: { type: "string", enum: ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY", "MANUAL"] },
      isActive: { type: "boolean" },
      lastRunAt: { type: "string", format: "date-time", nullable: true },
      nextRunAt: { type: "string", format: "date-time", nullable: true },
      articleCount: { type: "integer" },
      createdAt: { type: "string", format: "date-time" },
    },
  };

  document.components.schemas["AlertArticleDto"] = {
    type: "object",
    properties: {
      id: { type: "string" },
      url: { type: "string" },
      title: { type: "string" },
      author: { type: "string", nullable: true },
      source: { type: "string" },
      publishedAt: { type: "string", format: "date-time" },
      summary: { type: "string", nullable: true },
      sentiment: { type: "string", nullable: true },
      locationCount: { type: "integer" },
      createdAt: { type: "string", format: "date-time" },
    },
  };

  document.components.schemas["AlertDetailDto"] = {
    allOf: [
      { $ref: "#/components/schemas/AlertResponseDto" },
      {
        type: "object",
        properties: {
          articles: { type: "array", items: { $ref: "#/components/schemas/AlertArticleDto" } },
        },
      },
    ],
  };

  document.components.schemas["RunAlertResponseDto"] = {
    type: "object",
    properties: {
      jobId: { type: "string" },
      message: { type: "string" },
    },
  };

  document.components.schemas["AlertGeoJsonFeatureDto"] = {
    type: "object",
    properties: {
      type: { type: "string", enum: ["Feature"] },
      geometry: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["Point"] },
          coordinates: { type: "array", items: { type: "number" }, example: [-81.0998, 32.0809] },
        },
      },
      properties: {
        type: "object",
        properties: {
          locationId: { type: "string" },
          articleId: { type: "string" },
          alertId: { type: "string" },
          articleTitle: { type: "string" },
          mention: { type: "string" },
          mentionType: { type: "string" },
          formattedAddress: { type: "string", nullable: true },
          confidence: { type: "number", nullable: true },
          articleUrl: { type: "string" },
          publishedAt: { type: "string" },
        },
      },
    },
  };

  document.components.schemas["AlertGeoJsonResponseDto"] = {
    type: "object",
    properties: {
      type: { type: "string", enum: ["FeatureCollection"] },
      features: { type: "array", items: { $ref: "#/components/schemas/AlertGeoJsonFeatureDto" } },
    },
  };

  // Endpoints
  document.paths["/api/alerts"] = {
    post: {
      operationId: "AlertsController_createAlert",
      summary: "Create a new alert",
      description: "Creates a new news alert for recurring or manual searches",
      tags: ["Alerts"],
      security: [{ "access-token": [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateAlertDto" },
          },
        },
      },
      responses: {
        "201": {
          description: "Alert created",
          content: { "application/json": { schema: { $ref: "#/components/schemas/AlertResponseDto" } } },
        },
        "400": { description: "Invalid input" },
      },
    },
    get: {
      operationId: "AlertsController_listAlerts",
      summary: "List user's alerts",
      tags: ["Alerts"],
      security: [{ "access-token": [] }],
      responses: {
        "200": {
          description: "List of alerts",
          content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/AlertListItemDto" } } } },
        },
      },
    },
  };

  document.paths["/api/alerts/locations"] = {
    get: {
      operationId: "AlertsController_getAlertsLocations",
      summary: "Get all alert locations as GeoJSON",
      description: "Returns all geocoded locations from active alerts as a GeoJSON FeatureCollection",
      tags: ["Alerts"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "alertIds", in: "query", required: false, description: "Comma-separated alert IDs to filter by", schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "GeoJSON FeatureCollection",
          content: { "application/json": { schema: { $ref: "#/components/schemas/AlertGeoJsonResponseDto" } } },
        },
      },
    },
  };

  document.paths["/api/alerts/{id}"] = {
    get: {
      operationId: "AlertsController_getAlert",
      summary: "Get alert details",
      description: "Returns alert details with recent articles",
      tags: ["Alerts"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, description: "Alert ID", schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "Alert details",
          content: { "application/json": { schema: { $ref: "#/components/schemas/AlertDetailDto" } } },
        },
        "404": { description: "Alert not found" },
      },
    },
    patch: {
      operationId: "AlertsController_updateAlert",
      summary: "Update an alert",
      description: "Update alert configuration (query, frequency, etc.)",
      tags: ["Alerts"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, description: "Alert ID", schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UpdateAlertDto" },
          },
        },
      },
      responses: {
        "200": {
          description: "Alert updated",
          content: { "application/json": { schema: { $ref: "#/components/schemas/AlertResponseDto" } } },
        },
        "404": { description: "Alert not found" },
      },
    },
    delete: {
      operationId: "AlertsController_deleteAlert",
      summary: "Delete an alert",
      description: "Delete an alert and all its articles",
      tags: ["Alerts"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, description: "Alert ID", schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "Alert deleted",
          content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" } } } } },
        },
        "404": { description: "Alert not found" },
      },
    },
  };

  document.paths["/api/alerts/{id}/run"] = {
    post: {
      operationId: "AlertsController_runAlert",
      summary: "Manually trigger an alert",
      description: "Queue the alert for immediate processing",
      tags: ["Alerts"],
      security: [{ "access-token": [] }],
      parameters: [
        { name: "id", in: "path", required: true, description: "Alert ID", schema: { type: "string" } },
      ],
      responses: {
        "200": {
          description: "Alert queued for processing",
          content: { "application/json": { schema: { $ref: "#/components/schemas/RunAlertResponseDto" } } },
        },
        "404": { description: "Alert not found" },
      },
    },
  };

  return document;
}

async function generateOpenApi() {
  // Create app with minimal module (excludes Letta/Agents/Tools/Models)
  const app = await NestFactory.create(OpenApiAppModule, { logger: false });

  // Build the same Swagger config as main.ts
  const config = new DocumentBuilder()
    .setTitle("Map-Searcher API")
    .setDescription("Map-Searcher backend API with Letta AI agent integration")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "access-token",
    )
    .addServer("http://localhost:3000", "Local development")
    .addServer("{{baseUrl}}", "Dynamic (from environment)")
    .addTag("Health", "Health check endpoints")
    .addTag("Auth", "Authentication endpoints")
    .addTag("Research", "Research storage endpoints")
    .addTag("Agents", "Letta AI agent endpoints")
    .addTag("Tools", "Global tool management")
    .addTag("Models", "Model discovery endpoints")
    .addTag("News Workflow", "News article search and location extraction workflows")
    .addTag("Alerts", "News alerts endpoints")
    .build();

  let document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  });

  // Add Letta paths manually (Letta types cause circular dependencies)
  document = addLettaPaths(document);

  // Add Auth paths manually (AuthModule imports AgentsModule causing circular deps)
  document = addAuthPaths(document);

  // Add News Workflow paths manually
  document = addNewsWorkflowPaths(document);

  // Add Alerts paths manually
  document = addAlertsPaths(document);

  // Add request body for research endpoint
  const researchRequestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["content"],
          properties: {
            content: { type: "string", description: "Research content" },
            source_url: { type: "string", description: "Source URL" },
            title: { type: "string", description: "Title" },
          },
        },
      },
    },
  };

  type PathItem = { post?: { requestBody?: unknown } };
  const researchPath = document.paths["/api/research"] as PathItem;
  if (researchPath?.post) researchPath.post.requestBody = researchRequestBody;

  // Write to docs/openapi.json
  const outputPath = resolve(__dirname, "../docs/openapi.json");
  writeFileSync(outputPath, JSON.stringify(document, null, 2));

  console.log(`OpenAPI spec written to: ${outputPath}`);

  await app.close();
}

generateOpenApi().catch((err) => {
  console.error("Failed to generate OpenAPI spec:", err);
  process.exit(1);
});
