"use client";

import React from "react";
import Image from "next/image";
import type { EarningsDashboard } from "@/services/earnings.service";
import { formatEarningsCurrency, formatEarningsDate } from "./earnings-utils";
import PlatformsTooltip from "./PlatformsTooltip";

const STATUS_COLORS = {
  PAID: "text-emerald-500 bg-emerald-500/10",
  PENDING: "text-amber-500 bg-amber-500/10",
  OVERDUE: "text-rose-500 bg-rose-500/10",
  DELIVERED: "text-brand-500 bg-brand-500/10",
};

interface RecentDealsTableProps {
  deals: EarningsDashboard['recentDeals'];
}

const RecentDealsTable = ({ deals }: RecentDealsTableProps) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="mb-8 px-1">
        <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">Deals</h2>
      </div>

      <div className="max-h-[440px] overflow-auto custom-scrollbar pr-1">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900">
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Brand &amp; Deal</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Value</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap hidden sm:table-cell">Platform</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Paid Date</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, idx) => (
              <tr 
                key={deal.id}
                className={`group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${idx !== deals.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-700 flex items-center justify-center overflow-hidden text-white font-bold text-xs sm:text-sm shrink-0">
                      {deal.brandLogo ? <Image src={deal.brandLogo} alt="" fill className="object-cover" /> : deal.brandName.charAt(0)}
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors truncate max-w-[140px] sm:max-w-[220px]">{deal.brandName}</span>
                      <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 truncate max-w-[140px] sm:max-w-[220px]">{deal.dealTitle}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">{formatEarningsCurrency(deal.value, deal.currency)}</td>
                <td className="py-4 px-4 hidden sm:table-cell">
                  {deal.platforms.length > 0 ? (
                    <PlatformsTooltip platforms={deal.platforms} />
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${STATUS_COLORS[deal.status]}`}>
                      {deal.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">{formatEarningsDate(deal.paidDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {deals.length === 0 && <p className="py-10 text-center text-sm font-medium text-gray-400">No deals found for this month.</p>}
      </div>
    </div>
  );
};

export default RecentDealsTable;
