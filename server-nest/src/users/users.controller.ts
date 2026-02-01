import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PrismaService } from "../prisma.service";
import { UsersService } from "./users.service";
import type { JwtRequest } from "../common/types";

@ApiTags("Users")
@ApiBearerAuth("access-token")
@Controller("api/users")
export class UsersController {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "List all users" })
  @ApiResponse({ status: 200, description: "List of users" })
  async list() {
    return this.usersService.findAll();
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Get current user profile from JWT payload",
    description:
      "Returns the authenticated user profile extracted from the JWT token.",
  })
  @ApiResponse({
    status: 200,
    description: "User profile from JWT token",
  })
  getProfile(@Request() req: JwtRequest) {
    return req.user; // From JWT payload
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Get full user profile from database",
    description: "Fetches the complete user profile from the database.",
  })
  @ApiResponse({
    status: 200,
    description: "Full user profile (no password)",
  })
  async getFullProfile(@Request() req: JwtRequest) {
    return this.prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true, role: true, createdAt: true },
    });
  }
}
