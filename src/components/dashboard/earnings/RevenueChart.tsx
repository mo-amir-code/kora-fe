"use client";

import React from "react";

const CHART_DATA = [
  { month: "Dec", paid: 45, pending: 15 },
  { month: "Jan", paid: 52, pending: 25 },
  { month: "Feb", paid: 38, pending: 40 },
  { month: "Mar", paid: 65, pending: 20 },
  { month: "Apr", paid: 48, pending: 35 },
  { month: "May", paid: 72, pending: 18 },
];

const RevenueChart = () => {
  const maxVal = 100; // Normalize the scale (e.g., ₹100k max)

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">Last 6 Months Revenue</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">Paid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-700/40 dark:bg-emerald-500/20" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">Pending</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-1 sm:gap-4 pt-4 min-h-[220px] sm:min-h-[240px] h-56 sm:h-64">
        {CHART_DATA.map((data) => (
          <div key={data.month} className="flex-1 h-full flex flex-col items-center group">
            <div className="w-full max-w-[32px] sm:max-w-[40px] h-full flex flex-col justify-end gap-0.5 relative">
              {/* Tooltip on Hover */}
              <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-xl border border-white/10">
                Paid: ₹{data.paid}k | Pend: ₹{data.pending}k
              </div>
              
              {/* Stacked Bars */}
              <div 
                className="w-full bg-emerald-700/20 dark:bg-emerald-500/10 rounded-t-lg transition-all duration-500 group-hover:bg-emerald-500/20"
                style={{ height: `${(data.pending / maxVal) * 100}%` }}
              />
              <div 
                className="w-full bg-emerald-500 dark:bg-brand-500 rounded-b-lg transition-all duration-500 group-hover:bg-brand-400"
                style={{ height: `${(data.paid / maxVal) * 100}%` }}
              />
            </div>
            <span className="mt-4 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter sm:tracking-widest">{data.month}</span>
          </div>
        ))}
      </div>
      
      {/* Horizontal Axis Line */}
      <div className="w-full h-px bg-gray-50 dark:bg-gray-800 mt-2" />
    </div>
  );
};


export default RevenueChart;
