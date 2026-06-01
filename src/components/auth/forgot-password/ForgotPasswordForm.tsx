"use client";
import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineMail, HiOutlineShieldCheck } from "react-icons/hi";

type Step = "email" | "otp";

const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) {
        // Handle paste
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
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/reset-password");
    }, 1000);
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    // Simulate resend
  };

  if (step === "otp") {
    return (
      <div>
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600/10 mb-6">
          <HiOutlineShieldCheck className="text-purple-400" size={28} />
        </div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1.5">
          Enter verification code
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          We&apos;ve sent a 6-digit code to{" "}
          <span className="text-white font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
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
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold rounded-lg bg-[#1a2231] border border-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={otp.join("").length !== 6 || isLoading}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
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
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {/* Resend */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-purple-400 font-medium hover:text-purple-300 transition-colors"
          >
            Resend OTP
          </button>
        </p>

        {/* Back */}
        <button
          type="button"
          onClick={() => setStep("email")}
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 text-sm mt-4 mx-auto transition-colors"
        >
          ← Change email address
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600/10 mb-6">
        <HiOutlineMail className="text-purple-400" size={28} />
      </div>
      <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1.5">
        Forgot password?
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        No worries, we&apos;ll send you a verification code.
      </p>

      <form onSubmit={handleSendOtp} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="forgot-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="arjun@example.com"
            className="w-full px-4 py-3 rounded-lg bg-[#1a2231] border border-[#1e293b] text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200"
            autoFocus
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!email || isLoading}
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
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
              Sending OTP...
            </span>
          ) : (
            "Send OTP"
          )}
        </button>
      </form>

      {/* Back to Sign In */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Remember your password?{" "}
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

export default ForgotPasswordForm;
