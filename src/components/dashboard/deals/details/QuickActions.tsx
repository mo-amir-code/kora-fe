"use client";

import React from "react";
import {
  LuFileText,
  LuMessageSquare,
  LuCircleCheck,
  LuWallet,
  LuArchive,
  LuTrash2
} from "react-icons/lu";

const QuickActions = () => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6 sm:space-y-8 transition-all">
      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[2px] sm:tracking-[3px] text-gray-400 dark:text-gray-600 transition-colors">
        Quick Actions
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Primary Actions */}
        <button className="flex items-center justify-center gap-3 w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-sm sm:text-base font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95">
          <LuFileText className="w-4 h-4 sm:w-5 sm:h-5" />
          Generate Invoice
        </button>

        <button className="flex items-center justify-center gap-3 w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
          <LuMessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          Send WhatsApp Reminder
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-[10px] sm:text-xs font-bold transition-all active:scale-95">
          <LuCircleCheck className="w-3.5 h-3.5" />
          Mark Delivered
        </button>
        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-[10px] sm:text-xs font-bold transition-all active:scale-95">
          <LuWallet className="w-3.5 h-3.5" />
          Mark Paid
        </button>
      </div>

      <div className="flex items-center justify-around pt-4 border-t border-gray-200 dark:border-gray-800">
        <button className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all active:scale-95">
          <LuArchive size={14} />
          Archive
        </button>
        <button className="flex items-center gap-2 text-xs font-bold text-rose-500/60 hover:text-rose-500 transition-all active:scale-95">
          <LuTrash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
