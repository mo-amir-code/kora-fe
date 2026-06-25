"use client";

import React from "react";
import Link from "next/link";
import ActiveDealItem, { ActiveDealItemProps } from "./ActiveDealItem";

export type ActiveDealsProps = {
  deals: ActiveDealItemProps[];
  totalCount: number;
  className?: string;
};

const ActiveDeals = ({ deals, totalCount, className = "" }: ActiveDealsProps) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-800 
        rounded-2xl p-6
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Active Deals ({totalCount})
        </h2>
        <Link 
          href="/dashboard/deals"
          className="text-sm font-medium text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {deals.map((deal) => (
            <ActiveDealItem key={deal.id} {...deal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveDeals;
