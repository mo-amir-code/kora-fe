"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useGoogleAuth, useSignupSendOtp, useSignupVerifyOtp, getErrorMessage } from "@/hooks/useAuth";
import { Button, InputField } from "@/components/ui";

type Step = "form" | "otp";

const SignUpFormContent: React.FC = () => {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

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

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

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
        <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          Verify your email
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8">
          We&apos;ve sent a 6-digit code to{" "}
          <span className="text-slate-900 dark:text-white font-medium">{email}</span>
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
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold rounded-lg bg-slate-50 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Error */}
          {verifyOtp.error && (
            <p className="text-red-500 dark:text-red-400 text-xs text-center">
              {getErrorMessage(verifyOtp.error)}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={otp.join("").length !== 6}
            isLoading={verifyOtp.isPending}
            className="w-full py-2.5 sm:py-3 rounded-lg text-sm min-h-[44px] font-semibold"
          >
            Submit
          </Button>
        </form>

        {/* Resend */}
        <p className="text-center text-slate-600 dark:text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={sendOtp.isPending}
            className="text-brand-500 font-medium hover:text-brand-400 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {sendOtp.isPending ? "Sending..." : "Resend OTP"}
          </button>
        </p>

        {/* Back */}
        <button
          type="button"
          onClick={() => setStep("form")}
          className="flex items-center justify-center gap-2 text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 text-xs sm:text-sm mt-3 mx-auto transition-colors cursor-pointer"
        >
          ← Back to sign up
        </button>
      </div>
    );
  }

  // ─── FORM STEP ──────────────────────────────────────────────────────────────────

  return (
    <div>
      <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1">
        Create an account
      </h2>
      <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm mb-4 sm:mb-8">
        Start managing your brand deals like a pro.
      </p>

      {/* Google Auth */}
      <Button
        variant="outline"
        onClick={handleGoogleAuth}
        className="w-full flex items-center justify-center gap-2.5 sm:gap-3 rounded-lg border border-slate-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-slate-700 dark:text-white text-xs sm:text-sm font-medium hover:bg-slate-100 dark:hover:bg-gray-900 active:bg-slate-100 dark:active:bg-gray-900 duration-200 min-h-[44px]"
      >
        <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 sm:gap-4 my-3 sm:my-6">
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-800" />
        <span className="text-slate-500 dark:text-gray-500 text-[10px] sm:text-xs font-medium tracking-wider uppercase whitespace-nowrap">
          Or continue with email
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-800" />
      </div>

      <form onSubmit={handleSendOtp} className="space-y-3 sm:space-y-4">
        {/* Full Name */}
        <InputField
          type="text"
          id="signup-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Arjun Sharma"
          label="Full Name"
          className="rounded-lg bg-slate-50 dark:bg-gray-950 border-slate-300 dark:border-gray-800 placeholder-slate-400 dark:placeholder-gray-500 min-h-[44px]"
        />

        {/* Email */}
        <InputField
          type="email"
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="arjun@example.com"
          label="Email Address"
          className="rounded-lg bg-slate-50 dark:bg-gray-950 border-slate-300 dark:border-gray-800 placeholder-slate-400 dark:placeholder-gray-500 min-h-[44px]"
        />

        {/* Password */}
        <InputField
          type={showPassword ? "text" : "password"}
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          label="Password"
          className="rounded-lg bg-slate-50 dark:bg-gray-950 border-slate-300 dark:border-gray-800 placeholder-slate-400 dark:placeholder-gray-500 min-h-[44px]"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
          }
        />

        {/* Confirm Password */}
        <InputField
          type={showConfirmPassword ? "text" : "password"}
          id="signup-confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          label="Confirm Password"
          className="rounded-lg bg-slate-50 dark:bg-gray-950 border-slate-300 dark:border-gray-800 placeholder-slate-400 dark:placeholder-gray-500 min-h-[44px]"
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
          }
        />

        {/* Submit */}
        <Button
          type="submit"
          isLoading={sendOtp.isPending}
          className="w-full py-2.5 sm:py-3 rounded-lg text-sm min-h-[44px] font-semibold mt-1"
        >
          Send OTP
        </Button>
      </form>

      {/* Error display */}
      {formError && (
        <p className="text-red-500 dark:text-red-400 text-xs text-center mt-3">{formError}</p>
      )}
      {!formError && sendOtp.error && (
        <p className="text-red-500 dark:text-red-400 text-xs text-center mt-3">
          {getErrorMessage(sendOtp.error)}
        </p>
      )}

      {/* Footer */}
      <p className="text-center text-slate-600 dark:text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
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

const SignUpForm: React.FC = () => {
  return (
    <React.Suspense fallback={<div className="text-slate-900 dark:text-white text-center py-4">Loading...</div>}>
      <SignUpFormContent />
    </React.Suspense>
  );
};

export default SignUpForm;
