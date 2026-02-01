import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserPreferencesService } from "./user-preferences.service";
import { UpdatePreferencesDto } from "./dto/update-preferences.dto";
import { PreferencesResponseDto } from "./dto/preferences-response.dto";
import type { JwtRequest } from "../common/types";

@ApiTags("User Preferences")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("api/preferences")
export class UserPreferencesController {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Get user preferences",
    description: "Returns the current user's preferences, creating defaults if none exist",
  })
  @ApiResponse({
    status: 200,
    description: "User preferences",
    type: PreferencesResponseDto,
  })
  async getPreferences(@Req() req: JwtRequest): Promise<PreferencesResponseDto> {
    return this.userPreferencesService.getPreferences(req.user.userId);
  }

  @Patch()
  @ApiOperation({
    summary: "Update user preferences",
    description: "Update the current user's preferences (partial update)",
  })
  @ApiBody({ type: UpdatePreferencesDto })
  @ApiResponse({
    status: 200,
    description: "Updated preferences",
    type: PreferencesResponseDto,
  })
  async updatePreferences(
    @Req() req: JwtRequest,
    @Body() dto: UpdatePreferencesDto,
  ): Promise<PreferencesResponseDto> {
    return this.userPreferencesService.updatePreferences(req.user.userId, dto);
  }

  @Delete()
  @ApiOperation({
    summary: "Reset user preferences",
    description: "Reset the current user's preferences to defaults",
  })
  @ApiResponse({
    status: 200,
    description: "Preferences reset",
  })
  async resetPreferences(
    @Req() req: JwtRequest,
  ): Promise<{ success: boolean }> {
    return this.userPreferencesService.resetPreferences(req.user.userId);
  }
}
