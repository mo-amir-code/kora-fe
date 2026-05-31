"use client";

import React from "react";
import { LuTrendingUp, LuDownload } from "react-icons/lu";

const YearlySummary = () => {
  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-brand-500/5 dark:bg-brand-500/10 border border-gray-200 dark:border-gray-800 shadow-2xl shadow-brand-500/5 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-12 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] pointer-events-none group-hover:bg-brand-500/20 transition-colors duration-700" />
      
      <div className="space-y-3 sm:space-y-4 text-center sm:text-left z-10 w-full flex-1">
        <h2 className="text-[10px] sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-widest opacity-80">2025 Year-to-Date Summary</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <h3 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-brand-400 tracking-tighter">₹2,14,000</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <LuTrendingUp size={16} strokeWidth={3} className="sm:w-4.5 sm:h-4.5" />
            <span className="text-xs sm:text-sm font-black">+34% vs 2024</span>
          </div>
        </div>
      </div>

      <button className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs sm:text-sm font-bold shadow-xl shadow-black/10 dark:shadow-white/5 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest z-10 group shrink-0">
        <LuDownload size={18} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
        <span className="whitespace-nowrap">Download Tax Summary</span>
      </button>
    </div>
  );
};

export default YearlySummary;
