"use client";

import React, { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuDownload, LuShare2, LuFileText } from "react-icons/lu";
import { MetricsOverview, RevenueBreakdown, RevenueChart, RecentDealsTable, YearlySummary } from "@/components/dashboard/earnings";

const EarningsPage = () => {
  const [currentDate, setCurrentDate] = useState("May 2025");

  return (
    <div className="p-4 sm:p-8 space-y-8 sm:space-y-10 min-h-screen bg-white dark:bg-gray-900 transition-colors animate-in fade-in duration-700">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-1 py-1 shadow-sm">
            <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 transition-all active:scale-95">
              <LuChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <span className="px-3 sm:px-6 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">{currentDate}</span>
            <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 transition-all active:scale-95">
              <LuChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all uppercase tracking-widest group">
            <LuDownload size={16} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
            Export CSV
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] sm:text-xs font-bold shadow-xl transition-all hover:opacity-90 active:scale-95 uppercase tracking-widest group">
            <LuFileText size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            Send to CA
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 sm:space-y-12">
        {/* Tier 1: Core Metrics */}
        <MetricsOverview />

        {/* Tier 2: Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4">
            <RevenueBreakdown />
          </div>
          <div className="lg:col-span-8">
            <RevenueChart />
          </div>
        </div>

        {/* Tier 3: Granular Data */}
        <div className="space-y-10 sm:space-y-12 pb-20">
          <RecentDealsTable />
          <YearlySummary />
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;