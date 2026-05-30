/* eslint-disable @next/next/no-img-element */
"use client";

import { LuFileText, LuClock, LuCircleCheck, LuMessageSquare } from "react-icons/lu";

import React from "react";

export type PaymentStatus = "overdue" | "pending" | "paid";

export type PaymentItemProps = {
  id: string;
  brand: string;
  campaign: string;
  invoiceNumber?: string;
  dueDate?: string;
  datePaid?: string;
  amount: string;
  status: PaymentStatus;
  lateDays?: number;
  logo?: string;
};

const PaymentItem = ({
  brand,
  campaign,
  invoiceNumber,
  dueDate,
  datePaid,
  amount,
  status,
  lateDays,
  logo
}: PaymentItemProps) => {
  return (
    <div className="group relative flex flex-col sm:items-center sm:flex-row justify-between gap-5 p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-white dark:hover:bg-gray-900">
      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
        {/* Brand Logo/Avatar */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0 transition-all duration-300 group-hover:scale-105">
          {logo ? (
            <img src={logo} alt={brand} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-500">
              <LuFileText size={20} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
            </div>
          )}
        </div>

        <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
          <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-tight truncate">
            {brand} <span className="text-gray-300 dark:text-gray-700 font-medium mx-1 sm:inline hidden">—</span> <span className="sm:hidden block text-xs text-gray-500 dark:text-gray-500 font-medium">{campaign}</span> <span className="hidden sm:inline">{campaign}</span>
          </h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-4 sm:gap-y-1.5 text-[9px] sm:text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">
            {invoiceNumber && (
              <span className="flex items-center gap-1.5 sm:gap-2">
                <LuFileText size={12} strokeWidth={2} className="sm:w-3.5 sm:h-3.5" />
                {invoiceNumber}
              </span>
            )}
            {dueDate && (
              <span className="flex items-center gap-1.5 sm:gap-2">
                <LuClock size={12} strokeWidth={2} className="sm:w-3.5 sm:h-3.5" />
                <span className="sm:inline hidden">Due: </span>{dueDate}
              </span>
            )}
            {datePaid && (
              <span className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 dark:text-emerald-500">
                <LuCircleCheck size={12} strokeWidth={2} className="sm:w-3.5 sm:h-3.5" />
                <span className="sm:inline hidden">Paid: </span>{datePaid}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 shrink-0 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0 dark:border-gray-800">
        <div className="text-right space-y-0.5 sm:space-y-1">
          <div className={`text-xl sm:text-2xl font-bold tracking-tight ${status === 'overdue' ? 'text-rose-600 dark:text-rose-500' : 'text-gray-900 dark:text-white'
            }`}>
            {amount}
          </div>
          {status === 'overdue' && lateDays && (
            <div className="text-[9px] sm:text-[10px] font-bold text-rose-600 dark:text-rose-500 uppercase tracking-widest leading-none">
              {lateDays}d Late
            </div>
          )}
          {status === 'pending' && (
            <div className="text-[9px] sm:text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest leading-none">
              Pending
            </div>
          )}
        </div>

        <div className="shrink-0">
          {status === 'overdue' && (
            <button className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold transition-all shadow-md shadow-emerald-500/10 active:scale-95">
              <LuMessageSquare size={14} strokeWidth={2.5} className="sm:w-4 sm:h-4" />
              <span>Remind</span>
            </button>
          )}
          {status === 'pending' && (
            <button className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white text-[10px] sm:text-[11px] font-bold transition-all active:scale-95">
              <LuFileText size={14} strokeWidth={2} className="text-gray-500 dark:text-gray-500 sm:w-4 sm:h-4" />
              <span>Invoice</span>
            </button>
          )}
          {status === 'paid' && (
            <div className="p-2 sm:p-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 transition-all group-hover:scale-110">
              <LuCircleCheck size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
