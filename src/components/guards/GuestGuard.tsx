"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth/auth";

/**
 * Protects auth routes — redirects to /dashboard if already authenticated.
 * Waits for Zustand to hydrate from localStorage before making decisions.
 */
export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const token = useAuthStore((s) => s.token);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => { unsub(); };
  }, []);

  useEffect(() => {
    if (hydrated && isAuthenticated && token) {
      // Don't redirect if on callback or error pages (they handle their own flow)
      if (!pathname.includes("/auth/callback") && !pathname.includes("/auth/error")) {
        router.replace("/dashboard");
      }
    }
  }, [hydrated, isAuthenticated, token, router, pathname]);

  // Show loading while waiting for hydration
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  // After hydration, if authenticated show loading while redirect happens
  if (isAuthenticated && token && !pathname.includes("/auth/callback") && !pathname.includes("/auth/error")) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
