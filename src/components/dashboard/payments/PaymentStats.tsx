"use client";

import React from "react";
import { LuTrendingUp, LuTrendingDown, LuCircleAlert, LuCircleCheck, LuBanknote } from "react-icons/lu";

export type StatCardProps = {
  title: string;
  amount: string;
  subtitle: string;
  trend?: string;
  trendUp?: boolean;
  type: "outstanding" | "overdue" | "collected";
};

const StatCard = ({ title, amount, subtitle, trend, trendUp, type }: StatCardProps) => {
  const icons = {
    outstanding: <LuBanknote size={22} strokeWidth={2} />,
    overdue: <LuCircleAlert size={22} strokeWidth={2} />,
    collected: <LuCircleCheck size={22} strokeWidth={2} />,
  };

  const colors = {
    outstanding: {
      icon: "text-brand-500",
      iconBg: "bg-brand-500/10",
      amount: "text-gray-900 dark:text-white",
    },
    overdue: {
      icon: "text-rose-500",
      iconBg: "bg-rose-500/10",
      amount: "text-rose-600 dark:text-rose-500",
    },
    collected: {
      icon: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      amount: "text-emerald-600 dark:text-emerald-500",
    },
  };

  const style = colors[type];

  return (
    <div className={`
      relative group overflow-hidden rounded-2xl p-5 sm:p-7
      transition-all duration-300 ease-out
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      hover:border-gray-300 dark:hover:border-gray-700
    `}>
      <div className="flex justify-between items-start mb-5 sm:mb-6 relative z-10">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="text-[10px] sm:text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-[0.1em]">{title}</div>
          <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${style.amount}`}>
            {amount}
          </div>
        </div>
        <div className={`
          flex items-center justify-center
          w-10 h-10 sm:w-11 sm:h-11
          rounded-xl
          transition-all duration-300
          group-hover:scale-105
          ${style.iconBg}
          ${style.icon}
        `}>
          {icons[type]}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 relative z-10">
        {trend && (
          <div className={`flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 ${trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {trendUp ? <LuTrendingUp size={10} strokeWidth={2.5} className="sm:w-3 sm:h-3" /> : <LuTrendingDown size={10} strokeWidth={2.5} className="sm:w-3 sm:h-3" />}
            <span className="text-[10px] sm:text-[11px] font-bold">{trend}</span>
          </div>
        )}
        <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 font-medium italic">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export const PaymentStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
      <StatCard
        title="Total Outstanding"
        amount="₹4,25,000"
        subtitle="vs last month"
        trend="12%"
        trendUp={true}
        type="outstanding"
      />
      <StatCard
        title="Overdue"
        amount="₹1,50,000"
        subtitle="Across 2 deals"
        type="overdue"
      />
      <StatCard
        title="Collected (This Month)"
        amount="₹8,90,000"
        subtitle="vs last month"
        trend="24%"
        trendUp={true}
        type="collected"
      />
    </div>
  );
};

export default PaymentStats;
