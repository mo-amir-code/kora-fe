"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicPageLayout } from "@/components/common";
import { APP_NAME } from "@/lib/constants";
import { LuCheck, LuCircleHelp } from "react-icons/lu";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const plans = [
    {
      name: "Starter",
      description: "Ideal for emerging creators tracking their first brand collaborations.",
      monthlyPrice: 0,
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
      monthlyPrice: 19,
      yearlyPrice: 15,
      highlighted: true,
      badgeText: "Most Popular",
      ctaText: "Get Pro Access",
      ctaHref: "/auth/signup",
      features: [
        "Unlimited active brand deals",
        "Automated WhatsApp payment reminders",
        "Custom branded PDF invoices",
        "Real-time revenue & earnings analytics",
        "Calendar deadline integrations",
        "Priority 24/7 support",
      ],
    },
    {
      name: "Agency & Studio",
      description: "For talent managers, boutique agencies, and creator teams.",
      monthlyPrice: 49,
      yearlyPrice: 39,
      highlighted: false,
      ctaText: "Contact Sales",
      ctaHref: "/contact",
      features: [
        "Everything in Pro Creator",
        "Multi-user team workspace (up to 5 seats)",
        "Talent roster management",
        "Dedicated account manager",
        "Custom agreement templates",
        "API access & webhooks",
      ],
    },
  ];

  const comparisonCategories = [
    {
      category: "Deal & Sponsorship Management",
      features: [
        { name: "Active Brand Deals", starter: "Up to 3", pro: "Unlimited", agency: "Unlimited" },
        { name: "Deliverables Tracking", starter: "Basic", pro: "Advanced", agency: "Advanced + Multi-Talent" },
        { name: "Content Deadline Calendar", starter: false, pro: true, agency: true },
      ],
    },
    {
      category: "Invoicing & Payment Automation",
      features: [
        { name: "Professional PDF Invoices", starter: true, pro: true, agency: true },
        { name: "Automated WhatsApp Follow-ups", starter: false, pro: true, agency: true },
        { name: "Custom GST / Tax Settings", starter: true, pro: true, agency: true },
        { name: "Overdue Interest Calculation", starter: false, pro: true, agency: true },
      ],
    },
    {
      category: "Analytics & Support",
      features: [
        { name: "Revenue Dashboard", starter: "Basic", pro: "Full Analytics", agency: "Custom Reports" },
        { name: "Team Seats", starter: "1 Seat", pro: "1 Seat", agency: "Up to 5 Seats" },
        { name: "Support Level", starter: "Email", pro: "Priority 24/7", agency: "Dedicated Manager" },
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

  return (
    <PublicPageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 space-y-12 sm:space-y-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Pricing Plans
          </div>
          <h1 className="text-2xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Simple, Transparent Pricing for Every Creator
          </h1>
          <p className="text-sm sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal px-2">
            Automate your sponsorship workflow and claim your peace of mind. No hidden fees.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span
              className={`text-xs sm:text-sm font-medium ${
                billingCycle === "monthly"
                  ? "text-slate-900 dark:text-white font-bold"
                  : "text-slate-500"
              }`}
            >
              Monthly Billing
            </span>
            <button
              onClick={() =>
                setBillingCycle((prev) => (prev === "monthly" ? "yearly" : "monthly"))
              }
              className="relative w-12 h-7 sm:w-14 sm:h-8 rounded-full bg-slate-200 dark:bg-gray-800 p-1 transition-colors focus:outline-none flex-shrink-0"
              aria-label="Toggle billing cycle"
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-500 transition-transform ${
                  billingCycle === "yearly" ? "transform translate-x-5 sm:translate-x-6" : ""
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs sm:text-sm font-medium ${
                  billingCycle === "yearly"
                    ? "text-slate-900 dark:text-white font-bold"
                    : "text-slate-500"
                }`}
              >
                Annual Billing
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-bold border border-emerald-500/20">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan, index) => {
            const price =
              billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={index}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-slate-900 dark:bg-gray-900 text-white border-2 border-brand-500 shadow-xl shadow-brand-500/10 md:-translate-y-2"
                    : "bg-slate-50 dark:bg-gray-900/60 text-slate-900 dark:text-white border border-slate-200 dark:border-white/5"
                }`}
              >
                {plan.badgeText && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-brand-500 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-md whitespace-nowrap">
                    {plan.badgeText}
                  </div>
                )}

                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">{plan.name}</h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        plan.highlighted ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-5xl font-black tracking-tight">
                      ${price}
                    </span>
                    <span
                      className={`text-xs sm:text-sm ${
                        plan.highlighted ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      /month {billingCycle === "yearly" && price > 0 ? "(billed annually)" : ""}
                    </span>
                  </div>

                  <hr
                    className={`border-t ${
                      plan.highlighted ? "border-slate-800" : "border-slate-200 dark:border-gray-800"
                    }`}
                  />

                  <ul className="space-y-2.5 sm:space-y-3">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm">
                        <LuCheck
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            plan.highlighted ? "text-brand-400" : "text-brand-500"
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
                  <Link
                    href={plan.ctaHref}
                    className={`w-full inline-flex items-center justify-center py-3 sm:py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${
                      plan.highlighted
                        ? "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                        : "bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white"
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Section */}
        <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Plan Feature Comparison
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Detailed breakdown of features included in each plan tier.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 shadow-sm -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/80">
                  <th className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white w-1/2">
                    Features
                  </th>
                  <th className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 dark:text-white text-center">
                    Starter
                  </th>
                  <th className="py-3.5 px-3 sm:px-4 font-bold text-brand-500 text-center">
                    Pro Creator
                  </th>
                  <th className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 dark:text-white text-center">
                    Agency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-gray-800">
                {comparisonCategories.map((cat, catIdx) => (
                  <React.Fragment key={catIdx}>
                    <tr className="bg-slate-100/50 dark:bg-gray-900/50">
                      <td
                        colSpan={4}
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
                        <td className="py-3 px-3 sm:px-4 text-center text-slate-600 dark:text-slate-400">
                          {typeof item.agency === "boolean" ? (
                            item.agency ? (
                              <LuCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mx-auto" />
                            ) : (
                              <span className="text-slate-400">—</span>
                            )
                          ) : (
                            item.agency
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
        <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-8">
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
