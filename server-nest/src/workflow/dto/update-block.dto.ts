import { IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBlockDto {
  @ApiProperty({
    description: "Block ID to update",
  })
  @IsString()
  @MaxLength(128)
  blockId: string;

  @ApiProperty({
    description: "New block value",
    maxLength: 100000,
  })
  @IsString()
  @MaxLength(100000)
  value: string;
}
