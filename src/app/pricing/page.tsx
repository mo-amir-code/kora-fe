"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicPageLayout } from "@/components/common";
import { APP_NAME } from "@/lib/constants";
import { LuCheck, LuCircleHelp } from "react-icons/lu";
import { useAuthStore } from "@/stores/auth/auth";
import { useSubscriptionStore } from "@/stores/subscription/subscription";
import toast from "react-hot-toast";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("quarterly");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { plan: storePlan, billingCycle: currentCycle, upgrade, isLoading } = useSubscriptionStore();

  const getCycleColorClasses = () => {
    if (billingCycle === "yearly") {
      return {
        border: "border-2 border-purple-500 shadow-xl shadow-purple-500/10",
        badge: "bg-purple-500",
        checkmark: "text-purple-400",
        btn: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20",
        activePlan: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      };
    }
    if (billingCycle === "quarterly") {
      return {
        border: "border-2 border-indigo-500 shadow-xl shadow-indigo-500/10",
        badge: "bg-indigo-500",
        checkmark: "text-indigo-400",
        btn: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20",
        activePlan: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      };
    }
    return {
      border: "border-2 border-amber-500 shadow-xl shadow-amber-500/10",
      badge: "bg-amber-500",
      checkmark: "text-amber-400",
      btn: "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20",
      activePlan: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    };
  };

  const cycleColors = getCycleColorClasses();

  const handleUpgradeClick = async () => {
    try {
      const cycle = billingCycle.toUpperCase() as "MONTHLY" | "QUARTERLY" | "YEARLY";
      await upgrade(cycle);
      toast.success(`Successfully upgraded to Pro ${cycle} plan!`, {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.", {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });
    }
  };

  const plans = [
    {
      name: "Starter",
      description: "Ideal for emerging creators tracking their first brand collaborations.",
      monthlyPrice: 0,
      quarterlyPrice: 0,
      yearlyPrice: 0,
      highlighted: false,
      ctaText: "Start Free",
      ctaHref: "/auth/signup",
      features: [
        "Up to 3 active brand deals",
        "Basic invoice generation",
        "Standard deal status tracking",
        "Email support",
      ],
    },
    {
      name: "Pro Creator",
      description: "For established creators ready to automate billing and protect their income.",
      monthlyPrice: 15,
      quarterlyPrice: 13,
      yearlyPrice: 10.75,
      quarterlyTotal: 39,
      yearlyTotal: 129,
      highlighted: true,
      badgeText: "Most Popular",
      ctaText: "Get Pro Access",
      ctaHref: "/auth/signup",
      features: [
        "Unlimited active brand deals",
        "Automated WhatsApp & Email payment reminders",
        "Custom branded PDF invoices",
        "Real-time revenue & earnings analytics",
        "Calendar deadline integrations",
        "Priority 24/7 support",
      ],
    },
  ];

  const comparisonCategories = [
    {
      category: "Deal & Sponsorship Management",
      features: [
        { name: "Active Brand Deals", starter: "Up to 3", pro: "Unlimited" },
        { name: "Deliverables Tracking", starter: "Basic", pro: "Advanced" },
        { name: "Content Deadline Calendar", starter: false, pro: true },
      ],
    },
    {
      category: "Invoicing & Payment Automation",
      features: [
        { name: "Professional PDF Invoices", starter: true, pro: true },
        { name: "Automated WhatsApp & Email Follow-ups", starter: false, pro: true },
        { name: "Custom GST / Tax Settings", starter: true, pro: true },
        { name: "Overdue Interest Calculation", starter: false, pro: true },
      ],
    },
    {
      category: "Analytics & Support",
      features: [
        { name: "Revenue Dashboard", starter: "Basic", pro: "Full Analytics" },
        { name: "Team Seats", starter: "1 Seat", pro: "1 Seat" },
        { name: "Support Level", starter: "Email", pro: "Priority 24/7" },
      ],
    },
  ];

  const faqs = [
    {
      q: "Can I upgrade or downgrade my plan at any time?",
      a: "Yes! You can switch between plans or switch billing cycles whenever you like from your billing settings.",
    },
    {
      q: "Are there any hidden transaction fees on my invoices?",
      a: "No. Kora does not take any cut or percentage fee from your brand sponsorship invoices.",
    },
    {
      q: "How does the 14-day Pro trial work?",
      a: "When you sign up, you get instant full access to all Pro Creator features for 14 days without entering credit card details.",
    },
    {
      q: "What payment methods do you accept for subscriptions?",
      a: "We accept all major credit/debit cards, UPI, net banking, and PayPal.",
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (billingCycle === "yearly") return plan.yearlyPrice;
    if (billingCycle === "quarterly") return plan.quarterlyPrice;
    return plan.monthlyPrice;
  };

  const getBillingNote = (plan: typeof plans[0], price: number) => {
    if (price === 0) return "";
    if (billingCycle === "yearly") return `($${plan.yearlyTotal} billed annually)`;
    if (billingCycle === "quarterly") return `($${plan.quarterlyTotal} billed quarterly)`;
    return "";
  };

  const getBadgeText = (plan: typeof plans[0]) => {
    if (!plan.highlighted) return null;
    if (billingCycle === "quarterly") return "⭐ Most Popular";
    if (billingCycle === "yearly") return "🔥 Best Value";
    return null;
  };

  const getSavingsBadge = (plan: typeof plans[0]) => {
    if (!plan.highlighted) return null;
    if (billingCycle === "quarterly") return "Save $6 (13%)";
    if (billingCycle === "yearly") return "Save $51 (28%)";
    return null;
  };

  return (
    <PublicPageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 space-y-12 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
            Pricing Plans
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Simple, Transparent Pricing for Every Creator
          </h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal px-2">
            Automate your sponsorship workflow and claim your peace of mind. No hidden fees.
          </p>

          {/* 3-Way Billing Cycle Toggle */}
          <div className="pt-4 sm:pt-6 flex justify-center">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-gray-900/90 border border-slate-200 dark:border-gray-800/80 shadow-inner max-w-full overflow-x-auto gap-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-gray-800 text-slate-900 dark:text-white shadow-md border border-slate-200/60 dark:border-white/10"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setBillingCycle("quarterly")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  billingCycle === "quarterly"
                    ? "bg-white dark:bg-gray-800 text-slate-900 dark:text-white shadow-md border border-slate-200/60 dark:border-white/10"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <span>Quarterly</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] sm:text-xs font-bold border border-indigo-500/20">
                  Save 13%
                </span>
              </button>

              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  billingCycle === "yearly"
                    ? "bg-white dark:bg-gray-800 text-slate-900 dark:text-white shadow-md border border-slate-200/60 dark:border-white/10"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <span>Yearly</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] sm:text-xs font-bold border border-purple-500/20">
                  Save 28%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid (Rearranged for 2 plans) */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const price = getPrice(plan);
            const badge = getBadgeText(plan);
            const savings = getSavingsBadge(plan);

            return (
              <div
                key={index}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlighted
                    ? `bg-slate-900 dark:bg-gray-900 text-white md:-translate-y-2 ${cycleColors.border}`
                    : "bg-slate-50 dark:bg-gray-900/60 text-slate-900 dark:text-white border border-slate-200 dark:border-white/5"
                }`}
              >
                {badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full ${cycleColors.badge} text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-md whitespace-nowrap`}>
                    {badge}
                  </div>
                )}

                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">{plan.name}</h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        plan.highlighted ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">
                        ${price}
                      </span>
                      <span
                        className={`text-xs sm:text-sm ${
                          plan.highlighted ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        /month {getBillingNote(plan, price)}
                      </span>
                    </div>
                    {savings && (
                      <div className="pt-1">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                            billingCycle === "yearly"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : billingCycle === "quarterly"
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {savings}
                        </span>
                      </div>
                    )}
                  </div>

                  <hr
                    className={`border-t ${
                      plan.highlighted ? "border-slate-800" : "border-slate-200 dark:border-gray-800"
                    }`}
                  />

                  <ul className="space-y-3 sm:space-y-3.5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                        <LuCheck
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            plan.highlighted ? cycleColors.checkmark : "text-brand-500"
                          }`}
                        />
                        <span
                          className={
                            plan.highlighted
                              ? "text-slate-200"
                              : "text-slate-600 dark:text-slate-300"
                          }
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 sm:pt-8">
                  {plan.highlighted ? (
                    /* Pro Creator Plan */
                    isAuthenticated ? (
                      storePlan === "PRO" && currentCycle?.toLowerCase() === billingCycle ? (
                        <div className={`w-full py-3.5 text-center text-xs sm:text-sm font-bold ${cycleColors.activePlan} border rounded-xl cursor-default`}>
                          Current active plan
                        </div>
                      ) : (
                        <button
                          disabled={isLoading}
                          onClick={handleUpgradeClick}
                          className={`w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${cycleColors.btn} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isLoading
                            ? "Processing..."
                            : storePlan === "PRO"
                            ? "Change Billing Cycle"
                            : "Get Pro Access"}
                        </button>
                      )
                    ) : (
                      <Link
                        href="/auth/signup"
                        className={`w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${cycleColors.btn}`}
                      >
                        Get Pro Access
                      </Link>
                    )
                  ) : (
                    /* Starter Plan */
                    isAuthenticated ? (
                      storePlan === "PRO" ? (
                        <Link
                          href="/dashboard"
                          className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all text-center bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white"
                        >
                          Go to Dashboard
                        </Link>
                      ) : (
                        <div className="w-full py-3.5 text-center text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-800 rounded-xl cursor-default">
                          Current plan
                        </div>
                      )
                    ) : (
                      <Link
                        href="/auth/signup"
                        className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all text-center bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white"
                      >
                        Start Free
                      </Link>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Micro-Trust Text */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 pt-1">
          14-day free trial • Cancel anytime
        </p>

        {/* Feature Comparison Section */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pt-4 sm:pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Plan Feature Comparison
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Detailed breakdown of features included in each plan tier.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/80">
                  <th className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white w-1/2">
                    Features
                  </th>
                  <th className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 dark:text-white text-center w-1/4">
                    Starter
                  </th>
                  <th className="py-3.5 px-3 sm:px-4 font-bold text-brand-500 text-center w-1/4">
                    Pro Creator
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-gray-800">
                {comparisonCategories.map((cat, catIdx) => (
                  <React.Fragment key={catIdx}>
                    <tr className="bg-slate-100/50 dark:bg-gray-900/50">
                      <td
                        colSpan={3}
                        className="py-2.5 px-4 sm:px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400"
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((item, itemIdx) => (
                      <tr key={itemIdx} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30">
                        <td className="py-3 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-300">
                          {item.name}
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-center text-slate-600 dark:text-slate-400">
                          {typeof item.starter === "boolean" ? (
                            item.starter ? (
                              <LuCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mx-auto" />
                            ) : (
                              <span className="text-slate-400">—</span>
                            )
                          ) : (
                            item.starter
                          )}
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-center font-semibold text-slate-900 dark:text-white">
                          {typeof item.pro === "boolean" ? (
                            item.pro ? (
                              <LuCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 mx-auto" />
                            ) : (
                              <span className="text-slate-400">—</span>
                            )
                          ) : (
                            item.pro
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pt-4 sm:pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Pricing Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Have questions about billing or subscriptions? We have answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-white/5 space-y-2"
              >
                <div className="flex items-start sm:items-center gap-2 font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  <LuCircleHelp className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <h4>{faq.q}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
}
