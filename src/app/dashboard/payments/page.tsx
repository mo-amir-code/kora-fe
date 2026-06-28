'use client';

import React, { useState, useMemo } from 'react';
import { LuFilter, LuPlus } from 'react-icons/lu';
import { LoadingSpinner } from '@/components/common';
import { usePayments, usePaymentStats } from '@/hooks/usePayments';
import { PaymentStats } from '@/components/dashboard/payments/PaymentStats';
import { PaymentTable } from '@/components/dashboard/payments/PaymentTable';
import { AddPaymentEventModal } from '@/components/dashboard/payments/AddPaymentEventModal';

export default function PaymentsPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: payments = [], isLoading: paymentsLoading } = usePayments(filter);
  const { data: stats, isLoading: statsLoading } = usePaymentStats();

  const isLoading = paymentsLoading || statsLoading;

  const filters = [
    { label: 'All Payments', value: 'all' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Overdue', value: 'OVERDUE' },
    { label: 'Paid', value: 'PAID' },
  ];

  const sortedPayments = useMemo(() => {
    const list = [...payments];
    if (sortBy === 'newest') {
      return list.sort((a, b) => (b.dueDate ? new Date(b.dueDate).getTime() : 0) - (a.dueDate ? new Date(a.dueDate).getTime() : 0));
    }
    if (sortBy === 'oldest') {
      return list.sort((a, b) => (a.dueDate ? new Date(a.dueDate).getTime() : 0) - (b.dueDate ? new Date(b.dueDate).getTime() : 0));
    }
    if (sortBy === 'highest') {
      return list.sort((a, b) => b.amount - a.amount);
    }
    return list;
  }, [payments, sortBy]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Payments & Cash Flow
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
            Monitor liquidity, expected cash flow, collection speed, and milestone payments.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-sm font-bold text-white dark:text-gray-900 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none"
          >
            <LuPlus className="h-4 w-4" strokeWidth={3} />
            Add Payment Event
          </button>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <PaymentStats stats={stats} />
      )}

      {/* List Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 overflow-x-auto custom-scrollbar max-w-full">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${filter === f.value
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <LuFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto pl-9 pr-8 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white/20 transition-all cursor-pointer"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="highest">Sort by: Highest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <PaymentTable payments={sortedPayments} />
        )}
      </div>

      {/* Add Payment Event Modal */}
      <AddPaymentEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}