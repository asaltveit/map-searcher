import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    description: "User email address",
    example: "newuser@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User password (8-72 characters for security)",
    example: "SecureP@ss123",
    minLength: 8,
    maxLength: 72,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(72) // Prevent DoS via expensive bcrypt operations on very long passwords
  password: string;

  // SECURITY: Role is NOT user-controlled - always defaults to 'user'
  // Admin users must be created manually in the database
}
