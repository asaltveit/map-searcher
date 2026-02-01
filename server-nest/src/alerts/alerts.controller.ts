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
} from "./dto/alert-response.dto";
import type { JwtRequest } from "../common/types";

@ApiTags("Alerts")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("api/alerts")
export class AlertsController {
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
    return this.alertsService.createAlert(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: "List user's alerts" })
  @ApiResponse({
    status: 200,
    description: "List of alerts",
    type: [AlertListItemDto],
  })
  async listAlerts(@Req() req: JwtRequest): Promise<AlertListItemDto[]> {
    return this.alertsService.listAlerts(req.user.userId);
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
    const alertIds = alertIdsStr
      ? alertIdsStr.split(",").filter(Boolean)
      : undefined;
    return this.alertsService.getAlertsLocationsGeoJson(
      req.user.userId,
      alertIds,
    );
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
    this.validateUuid(alertId);
    return this.alertsService.getAlert(req.user.userId, alertId);
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
    this.validateUuid(alertId);
    return this.alertsService.updateAlert(req.user.userId, alertId, dto);
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
    this.validateUuid(alertId);
    return this.alertsService.deleteAlert(req.user.userId, alertId);
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
    this.validateUuid(alertId);
    return this.alertsService.runAlert(req.user.userId, alertId);
  }

  private validateUuid(id: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException("Invalid alert ID format");
    }
  }
}
