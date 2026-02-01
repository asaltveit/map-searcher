import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import type { JwtRequest } from "../common/types";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

// Cookie configuration for HTTP-only authentication
// Note: sameSite: 'none' is required for cross-origin cookies (Vercel frontend ↔ Fly.io API)
// When sameSite is 'none', secure must be true (cookies only sent over HTTPS)
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true, // Required for sameSite: 'none'
  sameSite: "none" as const, // Required for cross-origin cookie authentication
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches JWT expiry)
  path: "/",
};

// Cookie options for clearing - MUST match set options (except maxAge)
// Without matching options, browsers treat it as a different cookie and won't clear it!
const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  path: "/",
};

@ApiTags("Auth")
@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.register(dto.email, dto.password);

    // Auto-login: Set HTTP-only cookie after registration
    const { access_token } = this.authService.login(user);
    res.cookie("access_token", access_token, COOKIE_OPTIONS);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    };
  }

  @Post("login")
  @ApiOperation({ summary: "Login user" })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Set HTTP-only cookie with JWT token
    const { access_token } = this.authService.login(user);
    res.cookie("access_token", access_token, COOKIE_OPTIONS);

    // Return user info (token is in cookie, not response body)
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  @Post("logout")
  @ApiOperation({ summary: "Logout user" })
  logout(@Res({ passthrough: true }) res: Response) {
    // Clear the HTTP-only cookie with MATCHING options
    // Cross-origin cookies require same httpOnly, secure, sameSite to clear properly
    res.clearCookie("access_token", CLEAR_COOKIE_OPTIONS);
    return { success: true };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Get current user" })
  me(@Req() req: JwtRequest) {
    // Return user info from JWT payload (already validated by JwtStrategy)
    return {
      sub: req.user.userId,
      email: req.user.email,
      role: req.user.role as "user" | "admin",
    };
  }
}
