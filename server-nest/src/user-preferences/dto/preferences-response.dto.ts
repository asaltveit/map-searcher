import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PreferencesResponseDto {
  @ApiProperty({ description: "Preferences ID" })
  id: string;

  @ApiPropertyOptional({ description: "Default map center latitude" })
  defaultLat?: number;

  @ApiPropertyOptional({ description: "Default map center longitude" })
  defaultLng?: number;

  @ApiPropertyOptional({ description: "Default map zoom level" })
  defaultZoom?: number;

  @ApiProperty({ description: "Created timestamp" })
  createdAt: Date;

  @ApiProperty({ description: "Updated timestamp" })
  updatedAt: Date;
}
