"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useGoogleAuth, useSignin, getErrorMessage } from "@/hooks/useAuth";
import { Button, InputField } from "@/components/ui";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleGoogleAuth } = useGoogleAuth();
  const router = useRouter();
  const signin = useSignin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signin.mutate(
      { email, password },
      { onSuccess: () => router.replace("/dashboard") }
    );
  };

  return (
    <div>
      <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1">
        Welcome back
      </h2>
      <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm mb-5 sm:mb-8">
        Enter your details to access your dashboard.
      </p>

      {/* Google Auth */}
      <Button
        variant="outline"
        onClick={handleGoogleAuth}
        className="w-full flex items-center justify-center gap-2.5 sm:gap-3 rounded-lg border border-slate-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-slate-700 dark:text-white text-xs sm:text-sm font-medium hover:bg-slate-100 dark:hover:bg-gray-900 active:bg-slate-100 dark:active:bg-gray-900 duration-200 min-h-[44px] py-2.5 sm:py-3 px-4"
      >
        <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 sm:gap-4 my-4 sm:my-6">
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-800" />
        <span className="text-slate-500 dark:text-gray-500 text-[10px] sm:text-xs font-medium tracking-wider uppercase whitespace-nowrap">
          Or continue with email
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-800" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
        {/* Email */}
        <InputField
          type="email"
          id="signin-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="arjun@example.com"
          label="Email Address"
          className="rounded-lg bg-slate-50 dark:bg-gray-950 border-slate-300 dark:border-gray-800 placeholder-slate-400 dark:placeholder-gray-500 min-h-[44px]"
        />

        {/* Password */}
        <InputField
          type={showPassword ? "text" : "password"}
          id="signin-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="rounded-lg bg-slate-50 dark:bg-gray-950 border-slate-300 dark:border-gray-800 placeholder-slate-400 dark:placeholder-gray-500 min-h-[44px]"
          label={
            <div className="flex items-center justify-between w-full">
              <span className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm font-medium">Password</span>
              <Link
                href="/auth/forgot-password"
                className="text-brand-500 text-xs font-medium hover:text-brand-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          }
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
          }
        />

        {/* Submit */}
        <Button
          type="submit"
          isLoading={signin.isPending}
          className="w-full py-2.5 sm:py-3 rounded-lg text-sm min-h-[44px] font-semibold"
        >
          Sign in
        </Button>
      </form>

      {signin.error && (
        <p className="text-red-500 dark:text-red-400 text-xs text-center mt-3">
          {getErrorMessage(signin.error)}
        </p>
      )}

      {/* Footer */}
      <p className="text-center text-slate-600 dark:text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-brand-500 font-medium hover:text-brand-400 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
