'use client';

import React, { useState } from 'react';
import { LuPlus, LuFilter, LuCalendar } from 'react-icons/lu';
import { usePayments, usePaymentStats } from '@/hooks/usePayments';
import { PaymentStats } from '@/components/dashboard/payments/PaymentStats';
import { PaymentTable } from '@/components/dashboard/payments/PaymentTable';

export default function PaymentsPage() {
  const [filter, setFilter] = useState('all');

  const { data: payments = [], isLoading: paymentsLoading } = usePayments(filter);
  const { data: stats, isLoading: statsLoading } = usePaymentStats();

  const isLoading = paymentsLoading || statsLoading;

  const filters = [
    { label: 'All Payments', value: 'all' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Overdue', value: 'OVERDUE' },
    { label: 'Paid', value: 'PAID' },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Payments & Cash Flow
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Monitor your revenue, pending invoices, and upcoming milestones.
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
            <LuCalendar className="h-4 w-4" />
            Schedule Reminder
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-sm font-bold text-white dark:text-gray-900 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none">
            <LuPlus className="h-4 w-4" strokeWidth={3} />
            Create Invoice
          </button>
        </div> */}
      </div>

      {/* Stats Section */}
      {stats && (
        <PaymentStats
          received={stats.received}
          pending={stats.pending}
          overdue={stats.overdue}
          total={stats.total}
        />
      )}

      {/* List Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 w-fit">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f.value
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <LuFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white/20 transition-all">
                <option>Sort by: Newest</option>
                <option>Sort by: Oldest</option>
                <option>Sort by: Highest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-white/10 border-t-gray-900 dark:border-t-white" />
          </div>
        ) : (
          <PaymentTable payments={payments} />
        )}
      </div>
    </div>
  );
}