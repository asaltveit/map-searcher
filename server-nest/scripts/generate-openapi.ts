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
import { AuthModule } from "../src/auth/auth.module";
import { UsersModule } from "../src/users/users.module";
import { MonitoringModule } from "../src/monitoring/monitoring.module";
import { ResearchModule } from "../src/research/research.module";

// Create a minimal app module for OpenAPI generation
// Note: AgentsModule is excluded due to Letta client circular dependencies.
// Agent endpoints are added manually in addAgentPaths().
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    MonitoringModule,
    ResearchModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
class OpenApiAppModule {}

// Manually add Agent paths since Letta types cause circular dependencies
function addAgentPaths(document: OpenAPIObject): OpenAPIObject {
  document.paths["/api/agents"] = {
    get: {
      operationId: "AgentsController_listAgents",
      summary: "List all agents",
      tags: ["Agents"],
      responses: {
        "200": {
          description: "List of agents",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/AgentResponseDto" },
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

  document.paths["/api/agents/{id}/messages"] = {
    post: {
      operationId: "AgentsController_sendMessage",
      summary: "Send a message to an agent",
      tags: ["Agents"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Agent ID",
          schema: { type: "string" },
        },
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

  // Add schemas
  if (!document.components) document.components = {};
  if (!document.components.schemas) document.components.schemas = {};

  document.components.schemas["CreateAgentDto"] = {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "Name for the new agent",
        example: "my_assistant",
        minLength: 1,
        maxLength: 100,
      },
    },
  };

  document.components.schemas["SendMessageDto"] = {
    type: "object",
    required: ["content"],
    properties: {
      content: {
        type: "string",
        description: "Message content to send to the agent",
        example: "Hello! What can you help me with?",
        minLength: 1,
        maxLength: 10000,
      },
    },
  };

  document.components.schemas["AgentResponseDto"] = {
    type: "object",
    properties: {
      id: { type: "string", description: "Agent ID", example: "agent-123..." },
      name: { type: "string", description: "Agent name", example: "my_assistant" },
      model: { type: "string", description: "Model used", example: "openai/gpt-4o-mini" },
      agent_type: { type: "string", description: "Agent type", example: "letta_v1_agent" },
    },
  };

  document.components.schemas["MessageResponseDto"] = {
    type: "object",
    properties: {
      messages: {
        type: "array",
        description: "Messages from the agent",
        items: { type: "object" },
      },
      stop_reason: { type: "object", description: "Stop reason" },
      usage: { type: "object", description: "Usage statistics" },
    },
  };

  return document;
}

async function generateOpenApi() {
  // Create app with minimal module (excludes Letta/Agents)
  const app = await NestFactory.create(OpenApiAppModule, { logger: false });

  // Build the same Swagger config as main.ts
  const config = new DocumentBuilder()
    .setTitle("Map-Searcher API")
    .setDescription("Map-Searcher backend API")
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
    .build();

  let document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  });

  // Add Agent paths manually (Letta types cause circular dependencies)
  document = addAgentPaths(document);

  // Add request bodies for auth endpoints (NestJS Swagger doesn't auto-generate without @ApiBody)
  const authRequestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
              description: "User email address",
            },
            password: {
              type: "string",
              minLength: 8,
              example: "SecureP@ss123",
              description: "User password (minimum 8 characters)",
            },
          },
        },
      },
    },
  };

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
  const registerPath = document.paths["/api/auth/register"] as PathItem;
  if (registerPath?.post) registerPath.post.requestBody = authRequestBody;

  const loginPath = document.paths["/api/auth/login"] as PathItem;
  if (loginPath?.post) loginPath.post.requestBody = authRequestBody;

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
