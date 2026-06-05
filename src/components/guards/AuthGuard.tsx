"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth/auth";

/**
 * Protects dashboard routes — redirects to /auth/signin if not authenticated.
 * Waits for Zustand to hydrate from localStorage before making decisions.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const token = useAuthStore((s) => s.token);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Wait for Zustand persist to hydrate from localStorage
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // If already hydrated (e.g., hot reload), set immediately
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => { unsub(); };
  }, []);

  useEffect(() => {
    if (hydrated && (!isAuthenticated || !token)) {
      router.replace("/auth/signin");
    }
  }, [hydrated, isAuthenticated, token, router]);

  // Show loading while waiting for hydration
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  // After hydration, if not authenticated show loading while redirect happens
  if (!isAuthenticated || !token) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
