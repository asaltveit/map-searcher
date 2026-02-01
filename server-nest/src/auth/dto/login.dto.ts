import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User password",
    example: "SecureP@ss123",
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
