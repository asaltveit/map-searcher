import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { PrismaService } from "../prisma.service";

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

// Extract JWT from HTTP-only cookie
const extractFromCookie = (req: Request): string | null => {
  return req?.cookies?.access_token || null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error(
        "JWT_SECRET environment variable is required. Set it in .env or environment.",
      );
    }

    super({
      // Try cookie first (browser clients), fallback to Authorization header (API clients/Postman)
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<{
    userId: string;
    email: string;
    role: string;
  }> {
    // SECURITY: Verify user still exists in database (prevent ghost user tokens)
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      throw new UnauthorizedException("User no longer exists");
    }

    return { userId: user.id, email: user.email, role: user.role };
  }
}
