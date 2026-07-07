"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LuCheck, LuX, LuLoader, LuArrowRight } from "react-icons/lu";
import { useSubscriptionStore } from "@/stores/subscription/subscription";

function SubscriptionStatusContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const { isProcessingPayment, setProcessingPayment } = useSubscriptionStore();
  const [timeLeft, setTimeLeft] = useState(6);

  useEffect(() => {
    if (isProcessingPayment) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const timeout = setTimeout(() => {
        setProcessingPayment(false);
        window.location.href = "/dashboard";
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isProcessingPayment, setProcessingPayment]);

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
        <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isSuccess ? "bg-success-500" : "bg-error-500"
        }`} />

        <div className="flex justify-center">
          {isSuccess ? (
            <div className="p-3 bg-success-500/10 text-success-600 dark:text-success-400 rounded-full border border-success-500/20">
              <LuCheck className="w-16 h-16 animate-bounce" />
            </div>
          ) : (
            <div className="p-3 bg-error-500/10 text-error-600 dark:text-error-400 rounded-full border border-error-500/20">
              <LuX className="w-16 h-16 animate-pulse" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isSuccess ? "Subscription Activated!" : "Payment Cancelled"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-2">
            {isSuccess
              ? "Thank you for upgrading! Your premium features have been successfully unlocked. Enjoy automated WhatsApp reminders and advanced analytics."
              : "The checkout process was cancelled or didn't go through. No charges were made to your account. Feel free to try upgrading again."}
          </p>
        </div>

        {isProcessingPayment && (
          <div className="p-4 rounded-2xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/15 text-xs text-brand-600 dark:text-brand-400 flex flex-col items-center justify-center gap-2 animate-pulse">
            <div className="flex items-center gap-2 font-semibold">
              <LuLoader className="w-4 h-4 animate-spin text-brand-500" />
              <span>Redirecting to Dashboard...</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              Synchronizing with Dodo Payments gateway. Returning in <strong className="text-brand-500">{timeLeft}s</strong>.
            </p>
          </div>
        )}

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/dashboard"
            onClick={() => setProcessingPayment(false)}
            className={`w-full py-3 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
              isSuccess
                ? "bg-success-650 hover:bg-success-700 shadow-success-500/20"
                : "bg-slate-800 hover:bg-slate-950 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-slate-500/10"
            }`}
          >
            <span>Return to Dashboard</span>
            <LuArrowRight className="w-4 h-4" />
          </Link>

          {!isSuccess && (
            <Link
              href="/dashboard/settings/subscription"
              onClick={() => setProcessingPayment(false)}
              className="w-full py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all"
            >
              Retry Upgrade
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SubscriptionStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <LuLoader className="w-5 h-5 animate-spin text-brand-500" />
          <span>Loading subscription status...</span>
        </div>
      </div>
    }>
      <SubscriptionStatusContent />
    </Suspense>
  );
}
