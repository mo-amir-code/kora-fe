"use client";

import React from "react";
import { LuTrendingUp, LuClock, LuInfo, LuDollarSign } from "react-icons/lu";

interface MetricCardProps {
  title: string;
  value: string;
  subValue: React.ReactNode;
  subValueColor?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const MetricCard = ({ title, value, subValue, subValueColor = "text-gray-500", icon, iconBg, iconColor }: MetricCardProps) => (
  <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:border-gray-200 dark:hover:border-gray-700 group">
    <div className="flex items-start justify-between mb-3 sm:mb-4">
      <div className={`p-2.5 sm:p-3 rounded-2xl ${iconBg} ${iconColor} transition-transform group-hover:scale-110 duration-300`}>
        {icon}
      </div>
    </div>
    <div className="space-y-0.5 sm:space-y-1">
      <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{title}</p>
      <h3 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</h3>
      <div className={`text-[11px] sm:text-xs font-bold ${subValueColor} flex items-center gap-1.5`}>
        {subValue}
      </div>
    </div>
  </div>
);

const MetricsOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <MetricCard 
        title="Total Earned"
        value="₹86,000"
        subValue={<><LuTrendingUp size={14} /> +12% vs last month</>}
        subValueColor="text-emerald-500"
        icon={<LuDollarSign size={20} strokeWidth={2.5} />}
        iconBg="bg-emerald-500/10"
        iconColor="text-emerald-500"
      />
      <MetricCard 
        title="Total Pending"
        value="₹42,500"
        subValue="3 Invoices processing"
        subValueColor="text-amber-500"
        icon={<LuClock size={20} strokeWidth={2.5} />}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-500"
      />
      <MetricCard 
        title="Total Overdue"
        value="₹15,000"
        subValue="Follow up required"
        subValueColor="text-rose-500"
        icon={<LuInfo size={20} strokeWidth={2.5} />}
        iconBg="bg-rose-500/10"
        iconColor="text-rose-500"
      />
      <MetricCard 
        title="Avg. Deal Value"
        value="₹28,500"
        subValue="Based on 5 deals"
        subValueColor="text-brand-500"
        icon={<LuTrendingUp size={20} strokeWidth={2.5} />}
        iconBg="bg-brand-500/10"
        iconColor="text-brand-500"
      />
    </div>
  );
};

export default MetricsOverview;
