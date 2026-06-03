"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth/auth";

/**
 * Protects dashboard routes — redirects to /auth/signin if not authenticated.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.replace("/auth/signin");
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated || !token) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
