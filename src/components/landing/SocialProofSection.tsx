import { HiCheckCircle } from "react-icons/hi";
import { APP_NAME } from "@/lib/constants";

const benefits = [
  "Saved 15+ hours a month",
  "Looked 10x more professional",
  "Reduced payment delays by 60%",
];

export default function SocialProofSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-linear-to-br from-brand-100 dark:from-brand-900/40 to-slate-50 dark:to-gray-900 border border-brand-200 dark:border-white/10 rounded-2xl sm:rounded-4xl lg:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 sm:gap-12 relative overflow-hidden transition-colors duration-300">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/10 dark:bg-brand-500/20 blur-[80px] rounded-full" />

          <div className="flex-1 space-y-4 sm:space-y-6 relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              &ldquo;I recovered ₹40,000 in overdue payments within my first
              week using {APP_NAME}.&rdquo;
            </h2>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-lg sm:text-xl font-bold text-slate-900 dark:text-white border-2 border-brand-500 overflow-hidden">
                A
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                  Arjun Sharma
                </p>
                <p className="text-brand-600 dark:text-brand-400 text-xs sm:text-sm">
                  Tech Creator • 85K Followers
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto md:min-w-[280px] lg:min-w-[360px] shrink-0 space-y-3 sm:space-y-4 relative z-10">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/80 dark:bg-white/5 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/5"
              >
                <HiCheckCircle
                  className="text-brand-500 dark:text-brand-400 shrink-0"
                  size={20}
                />
                <span className="text-slate-800 dark:text-white font-medium text-sm sm:text-base">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
