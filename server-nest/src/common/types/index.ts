import { Request } from "express";

/**
 * JWT payload structure (from JWT token)
 */
export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * User object attached to request after JWT validation
 * This is what passport-jwt returns from JwtStrategy.validate()
 */
export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
}

/**
 * Express Request with authenticated user
 * Use this type when accessing req.user in controllers
 */
export interface JwtRequest extends Request {
  user: AuthenticatedUser;
}

/**
 * Prisma error with code property
 * Common Prisma error codes:
 * - P2002: Unique constraint violation
 * - P2025: Record not found
 */
export interface PrismaError extends Error {
  code: string;
  meta?: {
    target?: string[];
    cause?: string;
  };
}

/**
 * Type guard to check if error is a PrismaError
 */
export function isPrismaError(error: unknown): error is PrismaError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as PrismaError).code === "string"
  );
}

/**
 * Type guard to check if error is an Error instance
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}
