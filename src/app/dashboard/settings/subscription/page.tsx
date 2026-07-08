"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { LuArrowLeft, LuCheck, LuSparkles, LuWallet, LuShieldCheck, LuCreditCard, LuRefreshCw } from "react-icons/lu";
import { useSubscriptionStore } from "@/stores/subscription/subscription";
import toast from "react-hot-toast";
import { AVAILABLE_PLANS } from "@/constants/billing";
import { PlanCard } from "@/components/common";

export default function SubscriptionSettingsPage() {
  const {
    plan,
    billingCycle,
    planExpiresAt,
    status,
    cancelAtPeriodEnd,
    transactions,
    upgrade,
    cancelSubscription,
    fetchCurrentPlan,
    fetchTransactions,
    isLoading,
  } = useSubscriptionStore();

  useEffect(() => {
    fetchCurrentPlan();
    fetchTransactions();
  }, [fetchCurrentPlan, fetchTransactions]);

  const handleUpgrade = async (cycle: "MONTHLY" | "QUARTERLY" | "YEARLY") => {
    try {
      await upgrade(cycle);
      toast.success(`Successfully upgraded to Pro ${cycle} plan!`, {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to upgrade subscription. Please try again.", {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });
    }
  };

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel your Pro subscription?")) {
      try {
        await cancelSubscription();
        toast.success("Subscription cancelled successfully.", {
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
          },
        });
      } catch (error) {
        toast.error("Failed to cancel subscription. Please try again.", {
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
          },
        });
      }
    }
  };

  const getPlanDetails = () => {
    if (plan === "FREE") {
      return {
        name: "Free Tier",
        desc: "Basic features for getting started",
        badgeColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
      };
    }
    const cycleLabel = billingCycle === "MONTHLY" ? "Monthly" : billingCycle === "QUARTERLY" ? "Quarterly" : "Yearly";
    const isCancelled = status === "CANCELLED" || cancelAtPeriodEnd;
    const statusSuffix = isCancelled ? " (Cancelled)" : "";
    const badgeColor =
      billingCycle === "YEARLY"
        ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
        : billingCycle === "QUARTERLY"
        ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
        : "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return {
      name: `Pro ${cycleLabel}${statusSuffix}`,
      desc: "Premium deal management and automated invoicing",
      badgeColor,
    };
  };

  const planDetails = getPlanDetails();

  const availablePlans = AVAILABLE_PLANS;

  const currentTier = plan === "FREE" ? 0 : billingCycle === "MONTHLY" ? 1 : billingCycle === "QUARTERLY" ? 2 : 3;

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-3 xs:px-4 sm:px-6 space-y-8 sm:space-y-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <Link 
          href="/dashboard/settings"
          className="group flex items-center gap-2 text-gray-400 hover:text-brand-500 transition-colors"
        >
          <div className="p-2 rounded-full border border-gray-200 dark:border-gray-800 group-hover:border-brand-500/50 group-hover:bg-brand-500/5 transition-all">
            <LuArrowLeft size={16} strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest ml-1">Back to Settings</span>
        </Link>
        
        <div className="space-y-1 px-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Subscription & Billing
          </h1>
          <p className="text-xs sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            View your current workspace plan, upgrade to unlock advanced automation features, and review invoice transaction history.
          </p>
        </div>
      </div>

      {/* Current Plan Details Card */}
      <div className="p-5 xs:p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <div className="flex flex-col xs:flex-row xs:items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Current Plan</h2>
            <span className={`w-fit px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${planDetails.badgeColor}`}>
              {planDetails.name}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{planDetails.desc}</p>
          {plan === "PRO" && planExpiresAt && (
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5 pt-1">
              <LuRefreshCw className="w-3.5 h-3.5" />
              {(status === "CANCELLED" || cancelAtPeriodEnd) ? "Expires on:" : "Renews / Expires on:"} <strong className="text-slate-600 dark:text-slate-300">{planExpiresAt}</strong>
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 relative z-10 shrink-0 w-full md:w-auto">
          {plan === "PRO" && status !== "CANCELLED" && !cancelAtPeriodEnd && (
            <button
              disabled={isLoading}
              onClick={handleCancel}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-error-500/50 hover:bg-error-500/5 text-gray-600 dark:text-gray-400 hover:text-error-500 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Cancel Subscription"}
            </button>
          )}
        </div>
      </div>

      {cancelAtPeriodEnd && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-medium flex items-start gap-3">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-bold">Subscription cancellation scheduled</p>
            <p className="mt-1 text-slate-500 dark:text-slate-400 leading-relaxed">
              Your Pro features will remain active until <strong className="text-slate-700 dark:text-slate-300">{planExpiresAt}</strong>, after which your account will revert to the Free tier. You can resubscribe or upgrade to another plan at any time to prevent service interruption.
            </p>
          </div>
        </div>
      )}

      {/* Upgrade Options Section */}
      <div className="space-y-6">
        <div className="space-y-1 px-1">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <LuSparkles className="text-brand-500" />
            {currentTier === 3 ? "You're at the Top!" : "Available Upgrades"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {currentTier === 3 
              ? "You are currently enjoying the ultimate tier of creator features. Thank you for your support!" 
              : "Upgrade your billing cycle to secure lower overall rates and expand campaigns limitations."}
          </p>
        </div>

        {currentTier < 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((planOption) => {
              const isCurrent = plan === "PRO" && billingCycle === planOption.cycle;
              const isLower = planOption.tier < currentTier;

              const getStyles = () => {
                if (planOption.cycle === "MONTHLY") {
                  return {
                    border: "border-amber-500 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500",
                    badge: "bg-amber-500",
                    checkmark: "text-amber-500",
                    btn: "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25",
                    currentBadge: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20",
                  };
                }
                if (planOption.cycle === "QUARTERLY") {
                  return {
                    border: "border-indigo-500 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500",
                    badge: "bg-indigo-500",
                    checkmark: "text-indigo-500",
                    btn: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25",
                    currentBadge: "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20",
                  };
                }
                return {
                  border: "border-purple-500 shadow-xl shadow-purple-500/5 ring-1 ring-purple-500",
                  badge: "bg-purple-500",
                  checkmark: "text-purple-500",
                  btn: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25",
                  currentBadge: "text-purple-500 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20",
                };
              };
              const styles = getStyles();

              let ctaText = "Upgrade Now";
              if (isLoading) {
                ctaText = "Processing...";
              } else if (status === "CANCELLED" || cancelAtPeriodEnd) {
                ctaText = isCurrent ? "Resubscribe" : "Upgrade / Subscribe";
              }

              return (
                <PlanCard
                  key={planOption.cycle}
                  name={planOption.name}
                  description={planOption.description}
                  price={planOption.price}
                  period={planOption.period}
                  billedAs={planOption.billedAs || undefined}
                  savings={planOption.savings || undefined}
                  yearlyComparison={planOption.yearlyComparison || undefined}
                  features={planOption.features}
                  isCurrentPlan={isCurrent && status !== "CANCELLED" && !cancelAtPeriodEnd}
                  isLowerTier={isLower && status !== "CANCELLED" && !cancelAtPeriodEnd}
                  badgeText={isCurrent ? "Current Plan" : planOption.tag}
                  ctaText={ctaText}
                  onCtaClick={() => handleUpgrade(planOption.cycle)}
                  ctaDisabled={isLoading}
                  themeClasses={styles}
                  cardClassName={isCurrent ? "" : "border-gray-150 dark:border-gray-850/80 hover:border-gray-500/50"}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Transaction History Section */}
      <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="space-y-1 px-1">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <LuWallet className="text-brand-500" />
            Transaction History
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            A comprehensive list of past transactions, upgrades, and workspace invoice payments.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-150 dark:border-gray-800/80 bg-white dark:bg-gray-900">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-150 dark:border-gray-800/80 bg-slate-50 dark:bg-gray-850/50">
                <th className="hidden sm:table-cell p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Transaction ID</th>
                <th className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Date</th>
                <th className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Amount</th>
                <th className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-150 dark:border-gray-800/80 last:border-0 hover:bg-slate-50/50 dark:hover:bg-gray-800/20 transition-all">
                    <td className="hidden sm:table-cell p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white font-mono">{tx.id}</td>
                    <td className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {new Date(tx.date).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{tx.amount}</td>
                    <td className="p-3 sm:p-4 text-right">
                      <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                        tx.status === "Succeeded" 
                          ? "bg-success-500/10 text-success-600 dark:text-success-400" 
                          : tx.status === "Pending"
                          ? "bg-warning-500/10 text-warning-600 dark:text-warning-400"
                          : "bg-error-500/10 text-error-600 dark:text-error-400"
                      }`}>
                        <span className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${
                          tx.status === "Succeeded" ? "bg-success-500" : tx.status === "Pending" ? "bg-warning-500" : "bg-error-500"
                        }`} />
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
