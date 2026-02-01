import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UpdatePreferencesDto } from "./dto/update-preferences.dto";

@Injectable()
export class UserPreferencesService {
  private readonly logger = new Logger(UserPreferencesService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get user preferences (creates default if not exists)
   */
  async getPreferences(userId: string) {
    let preferences = await this.prisma.userPreference.findUnique({
      where: { userId },
    });

    if (!preferences) {
      // Create default preferences
      preferences = await this.prisma.userPreference.create({
        data: { userId },
      });
      this.logger.log(`Created default preferences for user ${userId}`);
    }

    return this.formatResponse(preferences);
  }

  /**
   * Update user preferences (creates if not exists)
   */
  async updatePreferences(userId: string, dto: UpdatePreferencesDto) {
    const preferences = await this.prisma.userPreference.upsert({
      where: { userId },
      create: {
        userId,
        defaultLat: dto.defaultLat,
        defaultLng: dto.defaultLng,
        defaultZoom: dto.defaultZoom,
      },
      update: {
        ...(dto.defaultLat !== undefined && { defaultLat: dto.defaultLat }),
        ...(dto.defaultLng !== undefined && { defaultLng: dto.defaultLng }),
        ...(dto.defaultZoom !== undefined && { defaultZoom: dto.defaultZoom }),
      },
    });

    this.logger.log(`Updated preferences for user ${userId}`);
    return this.formatResponse(preferences);
  }

  /**
   * Delete user preferences (reset to defaults)
   */
  async resetPreferences(userId: string) {
    await this.prisma.userPreference.deleteMany({
      where: { userId },
    });

    this.logger.log(`Reset preferences for user ${userId}`);
    return { success: true };
  }

  private formatResponse(preferences: {
    id: string;
    defaultLat: number | null;
    defaultLng: number | null;
    defaultZoom: number | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: preferences.id,
      defaultLat: preferences.defaultLat ?? undefined,
      defaultLng: preferences.defaultLng ?? undefined,
      defaultZoom: preferences.defaultZoom ?? undefined,
      createdAt: preferences.createdAt,
      updatedAt: preferences.updatedAt,
    };
  }
}
