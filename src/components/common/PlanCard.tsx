import React from "react";
import Link from "next/link";
import { LuCheck } from "react-icons/lu";

export interface PlanCardProps {
  name: string;
  description: string;
  price: string | number;
  period?: string;
  billedAs?: string;
  savings?: string;
  yearlyComparison?: string;
  features: string[];
  highlighted?: boolean;
  isCurrentPlan?: boolean;
  isLowerTier?: boolean;
  badgeText?: string | null;
  ctaText: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
  themeClasses?: {
    border?: string;
    badge?: string;
    checkmark?: string;
    btn?: string;
    currentBadge?: string;
    savingsBadge?: string;
  };
  cardClassName?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  description,
  price,
  period = "month",
  billedAs,
  savings,
  yearlyComparison,
  features,
  highlighted = false,
  isCurrentPlan = false,
  isLowerTier = false,
  badgeText,
  ctaText,
  ctaHref,
  onCtaClick,
  ctaDisabled = false,
  themeClasses,
  cardClassName = "",
}) => {
  const defaultTheme = {
    border: "border-2 border-indigo-500 shadow-xl shadow-indigo-500/10",
    badge: "bg-indigo-500",
    checkmark: "text-indigo-400",
    btn: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20",
    currentBadge: "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20",
    savingsBadge: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  };

  const theme = themeClasses || defaultTheme;

  const cardStyle = highlighted
    ? `bg-slate-900 dark:bg-slate-950 text-white md:-translate-y-2 ${theme.border || ""}`
    : isCurrentPlan
    ? `bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white ${theme.border || ""}`
    : `bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/80`;

  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${cardStyle} ${cardClassName}`}
    >
      {/* Badge Top Banner */}
      {badgeText && (
        <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full ${theme.badge} text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-md whitespace-nowrap`}>
          {badgeText}
        </div>
      )}

      {isCurrentPlan && !badgeText && (
        <span className={`absolute top-0 right-6 transform -translate-y-1/2 ${theme.badge} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
          Current Plan
        </span>
      )}

      <div className="space-y-5 sm:space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">{name}</h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              highlighted ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-4xl sm:text-5xl font-black tracking-tight">
              {typeof price === "number" ? `$${price}` : price}
            </span>
            <span
              className={`text-xs sm:text-sm ${highlighted ? "text-slate-400" : "text-slate-500"}`}
            >
              / {period}
            </span>
          </div>

          {billedAs && (
            <div className="text-[11px] text-gray-500 font-semibold leading-none pt-0.5">
              {billedAs}
            </div>
          )}

          {savings && (
            <div className="pt-1.5 flex flex-wrap gap-1.5 items-center">
              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold ${theme.savingsBadge || "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"}`}>
                {savings}
              </span>
              {yearlyComparison && (
                <span className="text-[10px] text-gray-400 font-bold">
                  {yearlyComparison}
                </span>
              )}
            </div>
          )}

          {!savings && yearlyComparison && (
            <div className="pt-1.5">
              <span className="text-[10px] text-gray-400 font-semibold">
                {yearlyComparison}
              </span>
            </div>
          )}
        </div>

        <hr
          className={`border-t ${
            highlighted ? "border-slate-800" : "border-slate-200 dark:border-gray-800"
          }`}
        />

        <ul className="space-y-3 sm:space-y-3.5">
          {features.map((feat, fIdx) => (
            <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm">
              <LuCheck
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  highlighted || isCurrentPlan ? theme.checkmark : "text-brand-500"
                }`}
              />
              <span
                className={
                  highlighted
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
        {isCurrentPlan ? (
          <div className={`w-full py-3 text-center text-xs sm:text-sm font-bold ${theme.currentBadge} rounded-xl cursor-default`}>
            Current active plan
          </div>
        ) : isLowerTier ? (
          <div className="w-full py-3 text-center text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-800 rounded-xl cursor-not-allowed">
            Lower tier (active plan takes precedence)
          </div>
        ) : onCtaClick ? (
          <button
            disabled={ctaDisabled}
            onClick={onCtaClick}
            className={`w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${theme.btn} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {ctaText}
          </button>
        ) : ctaHref ? (
          <Link
            href={ctaHref}
            className={`w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${
              highlighted ? theme.btn : "bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white"
            }`}
          >
            {ctaText}
          </Link>
        ) : (
          <button
            disabled={ctaDisabled}
            className={`w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${theme.btn} disabled:opacity-50`}
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  );
};
