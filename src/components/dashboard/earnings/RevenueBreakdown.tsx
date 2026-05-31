"use client";

import React from "react";

const BREAKDOWN_DATA = [
  { label: "Paid", percentage: 45, color: "bg-emerald-500", rawColor: "#10b981" },
  { label: "Pending", percentage: 30, color: "bg-amber-500", rawColor: "#f59e0b" },
  { label: "Overdue", percentage: 10, color: "bg-rose-500", rawColor: "#f43f5e" },
  { label: "Delivered", percentage: 15, color: "bg-brand-500", rawColor: "#8b5cf6" },
];

const RevenueBreakdown = () => {
  // Simple donut visualization using conic-gradient for maximum performance and minimum weight
  const conicGradient = BREAKDOWN_DATA.reduce((acc, item, i) => {
    const prevPercentage = BREAKDOWN_DATA.slice(0, i).reduce((sum, current) => sum + current.percentage, 0);
    return `${acc}${i > 0 ? ', ' : ''}${item.rawColor} ${prevPercentage}% ${prevPercentage + item.percentage}%`;
  }, "");

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm h-full flex flex-col">
      <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-8">Revenue Breakdown</h2>
      
      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full flex items-center justify-center transition-transform hover:scale-105 duration-500">
          {/* Donut Chart Background */}
          <div 
            className="absolute inset-0 rounded-full" 
            style={{ background: `conic-gradient(${conicGradient})` }}
          />
          {/* Center Hole */}
          <div className="absolute inset-3.5 sm:inset-4 rounded-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center shadow-inner">
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">₹86K</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-4 sm:gap-x-6 mt-8">
        {BREAKDOWN_DATA.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${item.color}`} />
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap">{item.label} ({item.percentage}%)</span>
            </div>
            {/* Optional Small Progress Bar under each label */}
            <div className="w-full h-1 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
               <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueBreakdown;
