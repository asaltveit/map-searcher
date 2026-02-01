import { IsOptional, IsNumber, Min, Max } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdatePreferencesDto {
  @ApiPropertyOptional({
    description: "Default map center latitude",
    example: 32.0809,
    minimum: -90,
    maximum: 90,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  defaultLat?: number;

  @ApiPropertyOptional({
    description: "Default map center longitude",
    example: -81.0912,
    minimum: -180,
    maximum: 180,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  defaultLng?: number;

  @ApiPropertyOptional({
    description: "Default map zoom level",
    example: 10,
    minimum: 1,
    maximum: 20,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  @Type(() => Number)
  defaultZoom?: number;
}
