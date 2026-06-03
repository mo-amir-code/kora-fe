'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useOAuthCallback } from '@/hooks/useAuth';

function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutate } = useOAuthCallback();
  const hasRun = useRef(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!token) {
      router.replace('/auth/error?message=missing_token');
      return;
    }

    mutate(token, {
      onSuccess: () => router.replace('/dashboard'),
      onError: () => router.replace('/auth/error?message=auth_failed'),
    });
  }, [token, mutate, router]);

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
        <p className="text-gray-400 text-sm">Signing you in...</p>
      </div>
    </div>
  );
}

function CallbackFallback() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackHandler />
    </Suspense>
  );
}
