"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function UserHeader() {
  const { user, logout, loading } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Signed in as{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
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
