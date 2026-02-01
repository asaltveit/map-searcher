"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function UserHeader() {
  const { user, logout, loading } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b border-border bg-card px-4 py-3">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Signed in as{" "}
          <span className="font-medium text-foreground">
            {user.email}
          </span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          disabled={loading}
        >
          Sign out
        </Button>
      </div>
    </header>
  );
}
