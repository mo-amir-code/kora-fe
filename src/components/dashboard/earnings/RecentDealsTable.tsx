"use client";

import React from "react";

const DEALS = [
  {
    brand: "Nykaa Beauty",
    logo: "N",
    color: "bg-pink-500",
    value: "₹45,000",
    platform: "Instagram Reels",
    status: "Paid",
    statusColor: "text-emerald-500 bg-emerald-500/10",
    paidDate: "12 May 2025"
  },
  {
    brand: "Samsung India",
    logo: "S",
    color: "bg-blue-600",
    value: "₹80,000",
    platform: "YouTube Integration",
    status: "Pending",
    statusColor: "text-amber-500 bg-amber-500/10",
    paidDate: "-"
  },
  {
    brand: "Myntra",
    logo: "M",
    color: "bg-pink-600",
    value: "₹15,000",
    platform: "Instagram Story",
    status: "Overdue",
    statusColor: "text-rose-500 bg-rose-500/10",
    paidDate: "- 14 days"
  },
  {
    brand: "Boat Lifestyle",
    logo: "B",
    color: "bg-red-500",
    value: "₹25,000",
    platform: "YouTube Shorts",
    status: "Delivered",
    statusColor: "text-brand-500 bg-brand-500/10",
    paidDate: "-"
  }
];

const RecentDealsTable = () => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8 px-1">
        <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">All deals this month</h2>
        <button className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors uppercase tracking-widest">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-800">
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Brand</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Value</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap hidden sm:table-cell">Platform</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Paid Date</th>
            </tr>
          </thead>
          <tbody>
            {DEALS.map((deal, idx) => (
              <tr 
                key={deal.brand} 
                className={`group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${idx !== DEALS.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${deal.color} flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0`}>
                      {deal.logo}
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors truncate max-w-[100px] sm:max-w-none">{deal.brand}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">{deal.value}</td>
                <td className="py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">{deal.platform}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${deal.statusColor}`}>
                      {deal.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">{deal.paidDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDealsTable;
