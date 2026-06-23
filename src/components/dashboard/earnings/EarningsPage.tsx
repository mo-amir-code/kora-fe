"use client";

import React, { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuDownload } from "react-icons/lu";
import { useEarnings } from "@/hooks/useEarnings";
import MetricsOverview from "./MetricsOverview";
import RevenueBreakdown from "./RevenueBreakdown";
import RevenueChart from "./RevenueChart";
import RecentDealsTable from "./RecentDealsTable";
import YearlySummary from "./YearlySummary";
import { currentMonthKey, downloadEarningsCsv, formatMonth, shiftMonth } from "./earnings-utils";
import type { EarningsCurrency, EarningsDealFilter } from "@/services/earnings.service";

const DEAL_FILTER_OPTIONS: Array<{ value: EarningsDealFilter; label: string }> = [
  { value: "expected", label: "Expected This Month" },
  { value: "paid", label: "Paid This Month" },
  { value: "created", label: "Created This Month" },
  { value: "overdue", label: "Overdue" },
  { value: "all", label: "All" },
];

const EarningsPage = () => {
  const [currentMonth, setCurrentMonth] = useState(currentMonthKey);
  const [currency, setCurrency] = useState<EarningsCurrency>('INR');
  const [dealFilter, setDealFilter] = useState<EarningsDealFilter>('expected');
  const { data, isLoading, isError, refetch } = useEarnings(currentMonth, currency, dealFilter);

  // const sendToCa = () => {
  //   if (!data) return;
  //   const subject = encodeURIComponent(`Kora earnings summary — ${formatMonth(data.period)}`);
  //   const body = encodeURIComponent(`Please find my ${formatMonth(data.period)} earnings summary.\n\nTotal earned: ${data.metrics.earned} ${data.currency}\nPending: ${data.metrics.pending} ${data.currency}\nOverdue: ${data.metrics.overdue} ${data.currency}`);
  //   window.location.href = `mailto:?subject=${subject}&body=${body}`;
  // };

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-white/10 dark:border-t-white" /></div>;
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="font-bold text-gray-500">We couldn&apos;t load your earnings.</p>
        <button onClick={() => refetch()} className="rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-bold text-white dark:bg-white dark:text-gray-900">Try again</button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-8 sm:space-y-10 min-h-screen bg-white dark:bg-gray-900 transition-colors animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-1 py-1 shadow-sm w-fit">
            <button onClick={() => setCurrentMonth((month) => shiftMonth(month, -1))} aria-label="Previous month" className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 transition-all active:scale-95"><LuChevronLeft size={16} strokeWidth={2.5} /></button>
            <span className="px-3 sm:px-6 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">{formatMonth(currentMonth)}</span>
            <button onClick={() => setCurrentMonth((month) => shiftMonth(month, 1))} aria-label="Next month" className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 transition-all active:scale-95"><LuChevronRight size={16} strokeWidth={2.5} /></button>
          </div>
          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800" aria-label="Display currency">
            {(['INR', 'USD'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCurrency(option)}
                className={`rounded-lg px-3 py-2 text-[10px] font-bold tracking-widest transition-all ${currency === option ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                {option}
              </button>
            ))}
          </div>
          <select
            value={dealFilter}
            onChange={(event) => setDealFilter(event.target.value as EarningsDealFilter)}
            className="w-full sm:w-auto appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 outline-none transition-all hover:border-brand-500/50 hover:text-brand-500 focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            aria-label="Deals filter"
          >
            {DEAL_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button onClick={() => downloadEarningsCsv(data)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all uppercase tracking-widest"><LuDownload size={16} />Export CSV</button>
          {/* <button onClick={sendToCa} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] sm:text-xs font-bold shadow-xl transition-all hover:opacity-90 uppercase tracking-widest"><LuFileText size={16} />Send to CA</button> */}
        </div>
      </div>

      <div className="space-y-8 sm:space-y-12">
        <MetricsOverview metrics={data.metrics} currency={data.currency} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4"><RevenueBreakdown breakdown={data.breakdown} currency={data.currency} /></div>
          <div className="lg:col-span-8"><RevenueChart trend={data.trend} currency={data.currency} /></div>
        </div>
        <div className="space-y-10 sm:space-y-12 pb-20">
          <RecentDealsTable deals={data.recentDeals} />
          <YearlySummary summary={data.yearly} currency={data.currency} onDownload={() => downloadEarningsCsv(data)} />
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
