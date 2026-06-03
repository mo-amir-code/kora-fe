"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineKey, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useResetPassword, getErrorMessage } from "@/hooks/useAuth";

const ResetPasswordFormInner: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPassword = useResetPassword();

  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!email || !otp) {
      router.push("/auth/forgot-password");
    }
  }, [email, otp, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword || password.length < 8) return;

    resetPassword.mutate(
      { email: email!, otp: otp!, newPassword: password },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setTimeout(() => router.push("/auth/signin"), 2000);
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mx-auto mb-6">
          <svg
            className="text-green-400"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">
          Password reset successful!
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Redirecting you to the sign in page...
        </p>
        <Link
          href="/auth/signin"
          className="text-purple-400 font-medium hover:text-purple-300 transition-colors text-sm"
        >
          Click here if not redirected
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600/10 mb-6">
        <HiOutlineKey className="text-purple-400" size={28} />
      </div>
      <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1.5">
        Reset your password
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        Enter a new password for your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New Password */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="reset-new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#1a2231] border border-[#1e293b] text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200 pr-12"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
          </div>
          {password && password.length < 8 && (
            <p className="text-red-400 text-xs mt-1.5">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="reset-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#1a2231] border border-[#1e293b] text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-400 text-xs mt-1.5">
              Passwords do not match
            </p>
          )}
        </div>

        {/* API Error */}
        {resetPassword.error && (
          <p className="text-red-400 text-sm">
            {getErrorMessage(resetPassword.error)}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={
            !password ||
            !confirmPassword ||
            password !== confirmPassword ||
            password.length < 8 ||
            resetPassword.isPending
          }
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resetPassword.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Resetting password...
            </span>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      {/* Back to Sign In */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Back to{" "}
        <Link
          href="/auth/signin"
          className="text-purple-400 font-medium hover:text-purple-300 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

const ResetPasswordForm: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <ResetPasswordFormInner />
    </Suspense>
  );
};

export default ResetPasswordForm;
