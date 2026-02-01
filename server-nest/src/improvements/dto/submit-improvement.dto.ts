import { IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const MAX_IMPROVEMENT_LENGTH = 2000;

export class SubmitImprovementDto {
  @ApiProperty({
    description: "User-submitted improvement request (e.g. unmet feature request)",
    example: "Add calendar integration for saving research",
    maxLength: MAX_IMPROVEMENT_LENGTH,
  })
  @IsString()
  @MaxLength(MAX_IMPROVEMENT_LENGTH)
  improvement: string;
}
