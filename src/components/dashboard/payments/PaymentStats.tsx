import React from 'react';
import { LuCalendar, LuZap, LuTriangleAlert, LuChartPie } from 'react-icons/lu';
import type { PaymentStats as PaymentStatsType } from '@/services/payment.service';
import { useCurrency } from '@/hooks/useCurrency';

interface PaymentStatsProps {
  stats: PaymentStatsType;
  onFilterOverdue?: () => void;
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({ stats }) => {
  const { format } = useCurrency();

  const expectedAmount = stats.expectedNext30Days?.amount ?? stats.pending;
  const expectedCount = stats.expectedNext30Days?.invoiceCount ?? 0;

  const collectionDays = stats.avgCollectionDays?.days ?? 14;

  const overdueAmount = stats.actionRequired?.overdueAmount ?? stats.overdue;
  const overdueCount = stats.actionRequired?.overdueCount ?? 0;

  const collectionPercentage = stats.collectionRate?.percentage ?? 100;

  const cards = [
    {
      label: 'Expected (Next 30 Days)',
      value: format(expectedAmount),
      icon: LuCalendar,
      description: expectedCount > 0 ? `${expectedCount} upcoming due ${expectedCount === 1 ? 'date' : 'dates'}` : 'Liquidity pipeline',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      label: 'Avg Collection Speed',
      value: `${collectionDays} Days`,
      icon: LuZap,
      description: 'Invoice to bank clearance',
      colorClass: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      label: 'Action Required',
      value: format(overdueAmount),
      icon: LuTriangleAlert,
      description: overdueCount > 0 ? `${overdueCount} overdue ${overdueCount === 1 ? 'invoice' : 'invoices'} needing follow-up` : 'All invoices up to date',
      colorClass: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-50 dark:bg-rose-500/10',
    },
    {
      label: 'Cash Collection Rate',
      value: `${collectionPercentage}%`,
      icon: LuChartPie,
      description: `Collected vs total billed`,
      colorClass: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-50 dark:bg-purple-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, idx) => (
        <div 
          key={idx}
          className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all hover:border-gray-300 dark:hover:border-gray-700 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${card.iconBg}`}>
              <card.icon className={`h-6 w-6 ${card.colorClass}`} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              {card.label}
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {card.value}
            </span>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
