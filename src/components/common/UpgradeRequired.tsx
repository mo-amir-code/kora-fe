import React from "react";
import { LuLock } from "react-icons/lu";
import { Button } from "@/components/ui";

interface UpgradeRequiredProps {
  title: string;
  description: string;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
}

export const UpgradeRequired: React.FC<UpgradeRequiredProps> = ({
  title,
  description,
  features = [],
  ctaText = "Upgrade to Pro Creator",
  ctaHref = "/dashboard/settings/subscription",
}) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200/60 dark:border-gray-800/80 bg-slate-50/50 dark:bg-gray-950/20 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 -z-10 bg-radial-gradient from-brand-500/5 via-transparent to-transparent opacity-60 dark:opacity-40" />

      {/* Glass Lock Badge */}
      <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-md text-brand-500 animate-bounce">
        <LuLock className="w-6 h-6" />
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Feature List */}
        {features.length > 0 && (
          <div className="pt-2 pb-6 max-w-sm mx-auto">
            <ul className="text-left space-y-2.5 inline-block">
              {features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-2">
          <Button href={ctaHref} className="px-8 shadow-xl shadow-brand-500/25">
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
};
