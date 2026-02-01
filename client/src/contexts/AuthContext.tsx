"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  User,
  getCurrentUser,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  LoginInput,
  RegisterInput,
} from "@/lib/auth-api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Mock user when auth is disabled locally (NEXT_PUBLIC_DISABLE_AUTH=true). */
const MOCK_USER: User = {
  id: "local-dev",
  email: "dev@local",
  role: "user",
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const authDisabled =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";

  const [user, setUser] = useState<User | null>(authDisabled ? MOCK_USER : null);
  const [loading, setLoading] = useState(!authDisabled);
  const [error, setError] = useState<string | null>(null);

  // Check auth status on mount (skip when auth disabled locally)
  useEffect(() => {
    if (authDisabled) return;
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [authDisabled]);

  const login = useCallback(async (input: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(input);
      setUser(response.user);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Login failed";
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRegister(input);
      setUser(response.user);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Registration failed";
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (authDisabled) {
      setUser(MOCK_USER); // stay "logged in" when auth disabled
      return;
    }
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Logout failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [authDisabled]);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
