import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { NewsWorkflowService } from "./news-workflow.service";
import { StartWorkflowDto } from "./dto/start-workflow.dto";
import {
  StartWorkflowResponseDto,
  WorkflowStatusDto,
  WorkflowListItemDto,
} from "./dto/workflow-response.dto";
import {
  WorkflowReportDto,
  GeoJsonResponseDto,
} from "./dto/article-response.dto";
import type { JwtRequest } from "../common/types";

@ApiTags("News Workflow")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("api/news-workflow")
export class NewsWorkflowController {
  constructor(private readonly newsWorkflowService: NewsWorkflowService) {}

  @Post("start")
  @ApiOperation({
    summary: "Start a new news workflow",
    description:
      "Creates a new news search workflow and queues it for background processing",
  })
  @ApiBody({ type: StartWorkflowDto })
  @ApiResponse({
    status: 201,
    description: "Workflow started",
    type: StartWorkflowResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async startWorkflow(
    @Req() req: JwtRequest,
    @Body() dto: StartWorkflowDto,
  ): Promise<StartWorkflowResponseDto> {
    // Validate date range
    const fromDate = new Date(dto.fromDate);
    const toDate = new Date(dto.toDate);

    if (fromDate > toDate) {
      throw new BadRequestException("fromDate must be before toDate");
    }

    return this.newsWorkflowService.startWorkflow(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: "List user's workflows" })
  @ApiResponse({
    status: 200,
    description: "List of workflows",
    type: [WorkflowListItemDto],
  })
  async listWorkflows(@Req() req: JwtRequest): Promise<WorkflowListItemDto[]> {
    return this.newsWorkflowService.listWorkflows(req.user.userId);
  }

  @Get(":id/status")
  @ApiOperation({ summary: "Get workflow status" })
  @ApiParam({ name: "id", description: "Workflow ID" })
  @ApiResponse({
    status: 200,
    description: "Workflow status",
    type: WorkflowStatusDto,
  })
  @ApiResponse({ status: 404, description: "Workflow not found" })
  async getWorkflowStatus(
    @Req() req: JwtRequest,
    @Param("id") workflowId: string,
  ): Promise<WorkflowStatusDto> {
    this.validateUuid(workflowId);
    return this.newsWorkflowService.getWorkflowStatus(
      req.user.userId,
      workflowId,
    );
  }

  @Get(":id/report")
  @ApiOperation({
    summary: "Get full workflow report",
    description:
      "Returns the complete workflow with all articles and locations",
  })
  @ApiParam({ name: "id", description: "Workflow ID" })
  @ApiResponse({
    status: 200,
    description: "Workflow report with articles",
    type: WorkflowReportDto,
  })
  @ApiResponse({ status: 404, description: "Workflow not found" })
  async getWorkflowReport(
    @Req() req: JwtRequest,
    @Param("id") workflowId: string,
  ): Promise<WorkflowReportDto> {
    this.validateUuid(workflowId);
    return this.newsWorkflowService.getWorkflowReport(
      req.user.userId,
      workflowId,
    );
  }

  @Get(":id/locations")
  @ApiOperation({
    summary: "Get workflow locations as GeoJSON",
    description:
      "Returns all geocoded locations as a GeoJSON FeatureCollection for map display",
  })
  @ApiParam({ name: "id", description: "Workflow ID" })
  @ApiResponse({
    status: 200,
    description: "GeoJSON FeatureCollection of locations",
    type: GeoJsonResponseDto,
  })
  @ApiResponse({ status: 404, description: "Workflow not found" })
  async getWorkflowLocations(
    @Req() req: JwtRequest,
    @Param("id") workflowId: string,
  ): Promise<GeoJsonResponseDto> {
    this.validateUuid(workflowId);
    return this.newsWorkflowService.getWorkflowLocationsGeoJson(
      req.user.userId,
      workflowId,
    );
  }

  private validateUuid(id: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException("Invalid workflow ID format");
    }
  }
}
