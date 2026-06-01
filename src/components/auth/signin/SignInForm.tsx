"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic
  };

  return (
    <div>
      <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1">
        Welcome back
      </h2>
      <p className="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-8">
        Enter your details to access your dashboard.
      </p>

      {/* Google Auth */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-lg border border-[#1e293b] bg-[#151c2c] text-white text-xs sm:text-sm font-medium hover:bg-[#1a2338] active:bg-[#1a2338] transition-colors duration-200 min-h-[44px]"
      >
        <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 sm:gap-4 my-4 sm:my-6">
        <div className="flex-1 h-px bg-[#1e293b]" />
        <span className="text-gray-500 text-[10px] sm:text-xs font-medium tracking-wider uppercase whitespace-nowrap">
          Or continue with email
        </span>
        <div className="flex-1 h-px bg-[#1e293b]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
        {/* Email */}
        <div>
          <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="signin-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="arjun@example.com"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#1a2231] border border-[#1e293b] text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200 min-h-[44px]"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <label className="text-gray-300 text-xs sm:text-sm font-medium">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-purple-400 text-xs font-medium hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="signin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#1a2231] border border-[#1e293b] text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200 pr-11 sm:pr-12 min-h-[44px]"
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
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 active:scale-[0.98] min-h-[44px]"
        >
          Sign in
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-purple-400 font-medium hover:text-purple-300 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
