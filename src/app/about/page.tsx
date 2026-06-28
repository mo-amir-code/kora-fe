import React from "react";
import Metadata from "next";
import Link from "next/link";
import { PublicPageLayout } from "@/components/common";
import { allMetadata } from "@/utils/data/metadata";
import { APP_NAME } from "@/lib/constants";
import {
  LuRocket,
  LuShieldCheck,
  LuZap,
  LuHeart,
  LuTarget,
  LuEye,
  LuCircleCheck,
} from "react-icons/lu";

export const metadata = allMetadata.about;

export default function AboutPage() {
  const values = [
    {
      icon: LuShieldCheck,
      title: "Transparency First",
      description:
        "We believe creators deserve crystal-clear clarity on contract terms, payment timelines, and deliverable statuses.",
    },
    {
      icon: LuHeart,
      title: "Creator-Centric Focus",
      description:
        "Every feature we build starts with solving real everyday friction points experienced by digital creators and influencers.",
    },
    {
      icon: LuZap,
      title: "Zero-Friction Automation",
      description:
        "We eliminate tedious admin work, manual invoice tracking, and repetitive follow-up DMs through intelligent automation.",
    },
    {
      icon: LuRocket,
      title: "Empowering Creative Freedom",
      description:
        "By taking care of the business infrastructure, we free up creators to focus 100% on what they do best: creating content.",
    },
  ];

  const features = [
    {
      title: "Sponsorship & Deal Tracking",
      description:
        "Consolidate all active brand collaborations, draft deliverables, and posting schedules into a unified dashboard.",
    },
    {
      title: "Automated WhatsApp Reminders",
      description:
        "Never chase late payments in DMs again. Kora sends professional automated WhatsApp and email reminders to brand partners.",
    },
    {
      title: "One-Click Invoicing",
      description:
        "Generate GST-compliant, professional PDF invoices pre-filled with deal details in seconds.",
    },
    {
      title: "Financial Intelligence",
      description:
        "Gain real-time insights into your total earnings, pending payouts, overdue invoices, and monthly growth trends.",
    },
  ];

  return (
    <PublicPageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 space-y-14 sm:space-y-28">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            About {APP_NAME}
          </div>
          <h1 className="text-2xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Empowering Creators to Command Their Worth
          </h1>
          <p className="text-sm sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal px-2">
            {APP_NAME} is the business management OS built specifically for independent creators, influencers, and digital talent agencies.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-white/5 space-y-3 sm:space-y-4 relative overflow-hidden group hover:border-brand-500/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              <LuTarget className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-base">
              To professionalize the creator economy by providing world-class financial infrastructure, automated invoice collection, and sponsorship workflow management—ensuring creators get paid accurately and on time.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-white/5 space-y-3 sm:space-y-4 relative overflow-hidden group hover:border-brand-500/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              <LuEye className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Our Vision
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-base">
              A world where independent creators operate with the financial confidence and operational sophistication of established media enterprises, turning creative passion into sustainable long-term wealth.
            </p>
          </div>
        </div>

        {/* What Kora Does */}
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-4">
            <h2 className="text-xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              What {APP_NAME} Does
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base px-2">
              We streamline every step of the brand collaboration lifecycle so you never lose track of deliverables or revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feat, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800 space-y-2.5 sm:space-y-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <LuCircleCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 flex-shrink-0" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why It Was Built */}
        <div className="p-6 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-gray-950 text-white space-y-4 sm:space-y-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-3 sm:space-y-4 relative z-10">
            <span className="text-brand-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
              Why We Built {APP_NAME}
            </span>
            <h2 className="text-xl sm:text-4xl font-bold text-white">
              Built out of real creator frustration.
            </h2>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              For years, creators managed multi-thousand dollar brand deals across chaotic Instagram DMs, lost email threads, and manual Excel sheets. Overdue invoices often went unpaid for months simply because creators felt uncomfortable awkwardly chasing brand managers for money.
            </p>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              We built {APP_NAME} to remove awkwardness from money conversations. By replacing chaotic DMs with structured status links and automated payment reminders, {APP_NAME} transforms how creators and brands collaborate.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-4">
            <h2 className="text-xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Our Core Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base px-2">
              The foundational principles guiding everything we design and engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-white/5 space-y-3 sm:space-y-4"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center text-lg sm:text-xl font-bold">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
}
