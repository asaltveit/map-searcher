/**
 * Authentication API client.
 * Uses the same base URL logic as api.ts.
 */

function getBase(): string {
  if (typeof window === "undefined") return "";
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.replace(/\/$/, "");
  return window.location.port === "3000" ? "http://localhost:3001" : "";
}

export interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Register a new user.
 * POST /api/auth/register
 */
export async function register(input: RegisterInput): Promise<AuthResponse> {
  const res = await fetch(`${getBase()}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Registration failed");
  }
  return res.json();
}

/**
 * Login user.
 * POST /api/auth/login
 * Sets HTTP-only cookie on success.
 */
export async function login(input: LoginInput): Promise<AuthResponse> {
  const res = await fetch(`${getBase()}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Login failed");
  }
  return res.json();
}

/**
 * Logout current user.
 * POST /api/auth/logout
 * Clears HTTP-only cookie.
 */
export async function logout(): Promise<void> {
  const res = await fetch(`${getBase()}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Logout failed");
  }
}

/**
 * Get current authenticated user.
 * GET /api/auth/me
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await fetch(`${getBase()}/api/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.user || data;
  } catch {
    return null;
  }
}
