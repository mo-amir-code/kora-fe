"use client";
import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useGoogleAuth, useSignupSendOtp, useSignupVerifyOtp, getErrorMessage } from "@/hooks/useAuth";

type Step = "form" | "otp";

const SignUpForm: React.FC = () => {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { handleGoogleAuth } = useGoogleAuth();
  const router = useRouter();
  const sendOtp = useSignupSendOtp();
  const verifyOtp = useSignupVerifyOtp();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    setFormError("");
    sendOtp.mutate(
      { email, password, fullName: name },
      { onSuccess: () => setStep("otp") }
    );
  };

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) {
        const digits = value.replace(/\D/g, "").slice(0, 6).split("");
        const newOtp = [...otp];
        digits.forEach((digit, i) => {
          if (index + i < 6) newOtp[index + i] = digit;
        });
        setOtp(newOtp);
        const lastIndex = Math.min(index + digits.length, 5);
        inputRefs.current[lastIndex]?.focus();
        return;
      }

      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;
    verifyOtp.mutate(
      { email, otp: otpValue },
      { onSuccess: () => router.replace("/dashboard") }
    );
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    sendOtp.mutate({ email, password, fullName: name });
  };

  // ─── OTP STEP ───────────────────────────────────────────────────────────────────

  if (step === "otp") {
    return (
      <div>
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          Verify your email
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8">
          We&apos;ve sent a 6-digit code to{" "}
          <span className="text-white font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-5">
          {/* OTP Inputs */}
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                id={`signup-otp-input-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold rounded-lg bg-gray-950 border border-gray-850 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Error */}
          {verifyOtp.error && (
            <p className="text-red-400 text-xs text-center">
              {getErrorMessage(verifyOtp.error)}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={otp.join("").length !== 6 || verifyOtp.isPending}
            className="w-full py-2.5 sm:py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 active:scale-[0.98] min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {verifyOtp.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Verifying...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        {/* Resend */}
        <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={sendOtp.isPending}
            className="text-brand-500 font-medium hover:text-brand-400 transition-colors disabled:opacity-50"
          >
            {sendOtp.isPending ? "Sending..." : "Resend OTP"}
          </button>
        </p>

        {/* Back */}
        <button
          type="button"
          onClick={() => setStep("form")}
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 text-xs sm:text-sm mt-3 mx-auto transition-colors"
        >
          ← Back to sign up
        </button>
      </div>
    );
  }

  // ─── FORM STEP ──────────────────────────────────────────────────────────────────

  return (
    <div>
      <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1">
        Create an account
      </h2>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-8">
        Start managing your brand deals like a pro.
      </p>

      {/* Google Auth */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="w-full flex items-center justify-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-lg border border-gray-800 bg-gray-950 text-white text-xs sm:text-sm font-medium hover:bg-gray-900 active:bg-gray-900 transition-colors duration-200 min-h-[44px]"
      >
        <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 sm:gap-4 my-3 sm:my-6">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-gray-500 text-[10px] sm:text-xs font-medium tracking-wider uppercase whitespace-nowrap">
          Or continue with email
        </span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      <form onSubmit={handleSendOtp} className="space-y-3 sm:space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="signup-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Arjun Sharma"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-950 border border-gray-850 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200 min-h-[44px]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="arjun@example.com"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-950 border border-gray-850 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200 min-h-[44px]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-950 border border-gray-850 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200 pr-11 sm:pr-12 min-h-[44px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="signup-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-950 border border-gray-850 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200 pr-11 sm:pr-12 min-h-[44px]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={sendOtp.isPending}
          className="w-full py-2.5 sm:py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 active:scale-[0.98] mt-1 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sendOtp.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending OTP...
            </span>
          ) : (
            "Send OTP"
          )}
        </button>
      </form>

      {/* Error display */}
      {formError && (
        <p className="text-red-400 text-xs text-center mt-3">{formError}</p>
      )}
      {!formError && sendOtp.error && (
        <p className="text-red-400 text-xs text-center mt-3">
          {getErrorMessage(sendOtp.error)}
        </p>
      )}

      {/* Footer */}
      <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-brand-500 font-medium hover:text-brand-400 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;

