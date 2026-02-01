import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AlertsService } from "./alerts.service";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { UpdateAlertDto } from "./dto/update-alert.dto";
import {
  AlertResponseDto,
  AlertListItemDto,
  AlertDetailDto,
  RunAlertResponseDto,
  AlertGeoJsonResponseDto,
  ChatWithArticlesDto,
  ChatResponseDto,
} from "./dto/alert-response.dto";
import type { JwtRequest } from "../common/types";

@ApiTags("Alerts")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("api/alerts")
export class AlertsController {
  private readonly logger = new Logger(AlertsController.name);

  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new alert",
    description: "Creates a new news alert for recurring or manual searches",
  })
  @ApiBody({ type: CreateAlertDto })
  @ApiResponse({
    status: 201,
    description: "Alert created",
    type: AlertResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async createAlert(
    @Req() req: JwtRequest,
    @Body() dto: CreateAlertDto,
  ): Promise<AlertResponseDto> {
    this.logger.log(`[CTRL] createAlert START - userId=${req.user.userId}, dto=${JSON.stringify(dto)}`);
    try {
      const result = await this.alertsService.createAlert(req.user.userId, dto);
      this.logger.log(`[CTRL] createAlert SUCCESS - alertId=${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`[CTRL] createAlert FAILED - userId=${req.user.userId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: "List user's alerts" })
  @ApiResponse({
    status: 200,
    description: "List of alerts",
    type: [AlertListItemDto],
  })
  async listAlerts(@Req() req: JwtRequest): Promise<AlertListItemDto[]> {
    this.logger.log(`[CTRL] listAlerts START - userId=${req.user.userId}`);
    try {
      const result = await this.alertsService.listAlerts(req.user.userId);
      this.logger.log(`[CTRL] listAlerts SUCCESS - userId=${req.user.userId}, count=${result.length}, alerts=${JSON.stringify(result.map(a => ({ id: a.id, query: a.query, articleCount: a.articleCount })))}`);
      return result;
    } catch (error) {
      this.logger.error(`[CTRL] listAlerts FAILED - userId=${req.user.userId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  @Get("locations")
  @ApiOperation({
    summary: "Get all alert locations as GeoJSON",
    description:
      "Returns all geocoded locations from active alerts as a GeoJSON FeatureCollection",
  })
  @ApiQuery({
    name: "alertIds",
    required: false,
    description: "Comma-separated alert IDs to filter by",
  })
  @ApiResponse({
    status: 200,
    description: "GeoJSON FeatureCollection",
    type: AlertGeoJsonResponseDto,
  })
  async getAlertsLocations(
    @Req() req: JwtRequest,
    @Query("alertIds") alertIdsStr?: string,
  ): Promise<AlertGeoJsonResponseDto> {
    this.logger.log(`[CTRL] getAlertsLocations START - userId=${req.user.userId}, alertIdsStr="${alertIdsStr || 'ALL'}"`);
    const alertIds = alertIdsStr
      ? alertIdsStr.split(",").filter(Boolean)
      : undefined;
    this.logger.log(`[CTRL] getAlertsLocations parsed alertIds=${JSON.stringify(alertIds)}`);
    try {
      const result = await this.alertsService.getAlertsLocationsGeoJson(
        req.user.userId,
        alertIds,
      );
      this.logger.log(`[CTRL] getAlertsLocations SUCCESS - userId=${req.user.userId}, featureCount=${result.features.length}`);
      if (result.features.length > 0) {
        this.logger.log(`[CTRL] getAlertsLocations SAMPLE FEATURES - first 3: ${JSON.stringify(result.features.slice(0, 3).map(f => ({ articleTitle: f.properties.articleTitle, mention: f.properties.mention, coords: f.geometry.coordinates })))}`);
      } else {
        this.logger.warn(`[CTRL] getAlertsLocations NO FEATURES FOUND - userId=${req.user.userId}, alertIds=${JSON.stringify(alertIds)}`);
      }
      return result;
    } catch (error) {
      this.logger.error(`[CTRL] getAlertsLocations FAILED - userId=${req.user.userId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get alert details",
    description: "Returns alert details with recent articles",
  })
  @ApiParam({ name: "id", description: "Alert ID" })
  @ApiResponse({
    status: 200,
    description: "Alert details",
    type: AlertDetailDto,
  })
  @ApiResponse({ status: 404, description: "Alert not found" })
  async getAlert(
    @Req() req: JwtRequest,
    @Param("id") alertId: string,
  ): Promise<AlertDetailDto> {
    this.logger.log(`[CTRL] getAlert START - userId=${req.user.userId}, alertId=${alertId}`);
    this.validateUuid(alertId);
    try {
      const result = await this.alertsService.getAlert(req.user.userId, alertId);
      this.logger.log(`[CTRL] getAlert SUCCESS - alertId=${alertId}, query="${result.query}", region="${result.region}", articleCount=${result.articleCount}, articlesReturned=${result.articles?.length || 0}`);
      if (result.articles && result.articles.length > 0) {
        this.logger.log(`[CTRL] getAlert ARTICLES SAMPLE - first 3: ${JSON.stringify(result.articles.slice(0, 3).map(a => ({ id: a.id, title: a.title, locationCount: a.locationCount })))}`);
      } else {
        this.logger.warn(`[CTRL] getAlert NO ARTICLES - alertId=${alertId}`);
      }
      return result;
    } catch (error) {
      this.logger.error(`[CTRL] getAlert FAILED - alertId=${alertId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update an alert",
    description: "Update alert configuration (query, frequency, etc.)",
  })
  @ApiParam({ name: "id", description: "Alert ID" })
  @ApiBody({ type: UpdateAlertDto })
  @ApiResponse({
    status: 200,
    description: "Alert updated",
    type: AlertResponseDto,
  })
  @ApiResponse({ status: 404, description: "Alert not found" })
  async updateAlert(
    @Req() req: JwtRequest,
    @Param("id") alertId: string,
    @Body() dto: UpdateAlertDto,
  ): Promise<AlertResponseDto> {
    this.logger.log(`[CTRL] updateAlert START - userId=${req.user.userId}, alertId=${alertId}, dto=${JSON.stringify(dto)}`);
    this.validateUuid(alertId);
    try {
      const result = await this.alertsService.updateAlert(req.user.userId, alertId, dto);
      this.logger.log(`[CTRL] updateAlert SUCCESS - alertId=${alertId}`);
      return result;
    } catch (error) {
      this.logger.error(`[CTRL] updateAlert FAILED - alertId=${alertId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete an alert",
    description: "Delete an alert and all its articles",
  })
  @ApiParam({ name: "id", description: "Alert ID" })
  @ApiResponse({ status: 200, description: "Alert deleted" })
  @ApiResponse({ status: 404, description: "Alert not found" })
  async deleteAlert(
    @Req() req: JwtRequest,
    @Param("id") alertId: string,
  ): Promise<{ success: boolean }> {
    this.logger.log(`[CTRL] deleteAlert START - userId=${req.user.userId}, alertId=${alertId}`);
    this.validateUuid(alertId);
    try {
      const result = await this.alertsService.deleteAlert(req.user.userId, alertId);
      this.logger.log(`[CTRL] deleteAlert SUCCESS - alertId=${alertId}`);
      return result;
    } catch (error) {
      this.logger.error(`[CTRL] deleteAlert FAILED - alertId=${alertId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  @Post(":id/run")
  @ApiOperation({
    summary: "Manually trigger an alert",
    description: "Queue the alert for immediate processing",
  })
  @ApiParam({ name: "id", description: "Alert ID" })
  @ApiResponse({
    status: 200,
    description: "Alert queued for processing",
    type: RunAlertResponseDto,
  })
  @ApiResponse({ status: 404, description: "Alert not found" })
  async runAlert(
    @Req() req: JwtRequest,
    @Param("id") alertId: string,
  ): Promise<RunAlertResponseDto> {
    this.logger.log(`[CTRL] runAlert START - userId=${req.user.userId}, alertId=${alertId}`);
    this.validateUuid(alertId);
    try {
      const result = await this.alertsService.runAlert(req.user.userId, alertId);
      this.logger.log(`[CTRL] runAlert SUCCESS - alertId=${alertId}, jobId=${result.jobId}, message="${result.message}"`);
      return result;
    } catch (error) {
      this.logger.error(`[CTRL] runAlert FAILED - alertId=${alertId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  @Post(":id/chat")
  @ApiOperation({
    summary: "Chat with articles",
    description: "Send a message to an AI agent that has context about the alert's articles",
  })
  @ApiParam({ name: "id", description: "Alert ID" })
  @ApiBody({ type: ChatWithArticlesDto })
  @ApiResponse({
    status: 200,
    description: "Chat response",
    type: ChatResponseDto,
  })
  @ApiResponse({ status: 404, description: "Alert not found" })
  async chatWithArticles(
    @Req() req: JwtRequest,
    @Param("id") alertId: string,
    @Body() dto: ChatWithArticlesDto,
  ): Promise<ChatResponseDto> {
    this.logger.log(`[CTRL] chatWithArticles START - userId=${req.user.userId}, alertId=${alertId}`);
    this.validateUuid(alertId);
    try {
      const result = await this.alertsService.chatWithArticles(
        req.user.userId,
        alertId,
        dto.message,
      );
      this.logger.log(`[CTRL] chatWithArticles SUCCESS - alertId=${alertId}, agentId=${result.agentId}`);
      return result;
    } catch (error) {
      this.logger.error(`[CTRL] chatWithArticles FAILED - alertId=${alertId}, error=${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  private validateUuid(id: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException("Invalid alert ID format");
    }
  }
}
