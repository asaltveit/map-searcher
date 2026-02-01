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
    .build();

  let document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  });

  // Add Letta paths manually (Letta types cause circular dependencies)
  document = addLettaPaths(document);

  // Add Auth paths manually (AuthModule imports AgentsModule causing circular deps)
  document = addAuthPaths(document);

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
