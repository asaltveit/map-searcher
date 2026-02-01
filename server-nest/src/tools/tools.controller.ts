import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ToolsService } from "./tools.service";
import { CreateToolDto } from "./dto/create-tool.dto";
import {
  ToolResponseDto,
  ToolListItemDto,
  ListToolsQueryDto,
} from "./dto/tool-response.dto";

@ApiTags("Tools")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("api/tools")
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  @ApiOperation({ summary: "List all available tools" })
  @ApiQuery({
    name: "name",
    required: false,
    description: "Filter by tool name",
  })
  @ApiQuery({
    name: "search",
    required: false,
    description: "Search query",
  })
  @ApiResponse({
    status: 200,
    description: "List of tools",
    type: [ToolListItemDto],
  })
  async listTools(@Query() query: ListToolsQueryDto) {
    return this.toolsService.listTools({
      name: query.name,
      search: query.search,
    });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a tool by ID" })
  @ApiParam({ name: "id", description: "Tool ID" })
  @ApiResponse({
    status: 200,
    description: "Tool details",
    type: ToolResponseDto,
  })
  @ApiResponse({ status: 404, description: "Tool not found" })
  async getTool(@Param("id") toolId: string) {
    this.validateToolId(toolId);
    return this.toolsService.getTool(toolId);
  }

  @Post()
  @ApiOperation({ summary: "Create a custom tool" })
  @ApiBody({ type: CreateToolDto })
  @ApiResponse({
    status: 201,
    description: "Tool created",
    type: ToolResponseDto,
  })
  async createTool(@Body() dto: CreateToolDto) {
    return this.toolsService.createTool({
      sourceCode: dto.sourceCode,
      name: dto.name,
      description: dto.description,
      tags: dto.tags,
    });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a custom tool" })
  @ApiParam({ name: "id", description: "Tool ID" })
  @ApiResponse({ status: 204, description: "Tool deleted" })
  @ApiResponse({ status: 404, description: "Tool not found" })
  async deleteTool(@Param("id") toolId: string) {
    this.validateToolId(toolId);
    await this.toolsService.deleteTool(toolId);
  }

  private validateToolId(id: string): void {
    if (typeof id !== "string" || id.length === 0 || id.length > 128) {
      throw new BadRequestException("Invalid tool ID");
    }
  }
}
