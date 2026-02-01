import { Request } from "express";

export interface JwtUser {
  userId: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}
