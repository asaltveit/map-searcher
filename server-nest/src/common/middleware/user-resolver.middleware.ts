import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as crypto from "crypto";

const ANON_COOKIE = "weave_hacks_user_id";

// Extend Express Request to include userId
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

/**
 * Resolve user identity for hybrid multi-user.
 * In dev: use X-User-Id header or anonymous stable id from cookie.
 */
@Injectable()
export class UserResolverMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const enableHybrid = process.env.ENABLE_HYBRID_MULTI_USER === "true";

    if (!enableHybrid) {
      req.userId = "default";
      return next();
    }

    // Try X-User-Id header first
    const headerId = req.headers["x-user-id"];
    if (headerId && typeof headerId === "string" && headerId.length <= 128) {
      req.userId = headerId.replace(/[^a-zA-Z0-9_-]/g, "") || "default";
      return next();
    }

    // Try cookie
    const cookieId = req.cookies?.[ANON_COOKIE];
    if (cookieId && typeof cookieId === "string" && cookieId.length <= 128) {
      req.userId = cookieId.replace(/[^a-zA-Z0-9_-]/g, "") || "default";
      return next();
    }

    // Generate new anonymous ID
    const newId = "anon_" + crypto.randomUUID().replace(/-/g, "");
    req.userId = newId;

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie(ANON_COOKIE, newId, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      secure: isProduction,
      sameSite: "lax",
    });

    next();
  }
}
