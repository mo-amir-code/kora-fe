import React from 'react';
import { LuWallet, LuClock, LuTriangleAlert, LuTrendingUp } from 'react-icons/lu';

interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
  description: string;
  colorClass: string;
  iconBg: string;
}

interface PaymentStatsProps {
  received: number;
  pending: number;
  overdue: number;
  total: number;
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({ received, pending, overdue, total }) => {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const stats: Stat[] = [
    {
      label: 'Received',
      value: formatCurrency(received),
      icon: LuWallet,
      description: 'Total revenue collected',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      label: 'Pending',
      value: formatCurrency(pending),
      icon: LuClock,
      description: 'Awaiting payment',
      colorClass: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-500/10',
    },
    {
      label: 'Overdue',
      value: formatCurrency(overdue),
      icon: LuTriangleAlert,
      description: 'Past due date',
      colorClass: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-50 dark:bg-rose-500/10',
    },
    {
      label: 'Total Value',
      value: formatCurrency(total),
      icon: LuTrendingUp,
      description: 'Cumulative pipeline',
      colorClass: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, idx) => (
        <div 
          key={idx}
          className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all hover:border-gray-300 dark:hover:border-gray-700"
        >
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${stat.iconBg}`}>
              <stat.icon className={`h-6 w-6 ${stat.colorClass}`} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">
              {stat.label}
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {stat.value}
            </span>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {stat.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
