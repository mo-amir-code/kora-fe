'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ERROR_MESSAGES: Record<string, string> = {
  missing_code: 'Authentication was interrupted. Please try again.',
  token_exchange_failed: 'Could not complete sign-in. Please try again.',
  oauth_failed: 'Google sign-in failed. Please try again.',
  missing_token: 'Authentication data was not received. Please try again.',
  auth_failed: 'Could not verify your identity. Please try again.',
  network_error: 'Network error. Please check your connection and try again.',
};

const DEFAULT_MESSAGE = 'An unexpected error occurred. Please try again.';

function getErrorMessage(code: string | null): string {
  if (!code) return DEFAULT_MESSAGE;
  return ERROR_MESSAGES[code] ?? DEFAULT_MESSAGE;
}

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const errorMessage = getErrorMessage(message);

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="32" fill="#ef4444" fillOpacity="0.1" />
            <circle cx="32" cy="32" r="24" fill="#ef4444" fillOpacity="0.15" />
            <path
              d="M32 22V34"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="32" cy="40" r="1.5" fill="#ef4444" />
          </svg>
        </div>

        {/* Error Title */}
        <h1 className="text-white text-xl font-semibold mb-3">
          Authentication Error
        </h1>

        {/* Error Message */}
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {errorMessage}
        </p>

        {/* Try Again Link */}
        <Link
          href="/auth/signin"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Try again
        </Link>
      </div>
    </div>
  );
}

function ErrorFallback() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<ErrorFallback />}>
      <ErrorContent />
    </Suspense>
  );
}
