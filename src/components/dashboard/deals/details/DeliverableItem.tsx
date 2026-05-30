"use client";

import React from "react";
import { LuCircleCheck } from "react-icons/lu";

export type DeliverableItemProps = {
  id: string | number;
  title: string;
  status: "DELIVERED" | "PENDING";
  isChecked: boolean;
};

const DeliverableItem = ({ title, status, isChecked }: DeliverableItemProps) => {
  return (
    <div className={`flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${
      isChecked 
        ? "bg-emerald-500/5 dark:bg-emerald-500/5 border-emerald-200/50 dark:border-emerald-500/20" 
        : "bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-800/40"
    }`}>
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
          isChecked 
            ? "bg-emerald-500 border-emerald-500 text-white" 
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        }`}>
          {isChecked && <LuCircleCheck className="w-3.5 h-3.5 sm:w-[14px] sm:h-[14px]" />}
        </div>
        <span className={`text-xs sm:text-sm font-semibold transition-colors line-clamp-2 flex-1 ${
          isChecked 
            ? "text-gray-500 dark:text-gray-400 line-through decoration-gray-400 dark:decoration-gray-600" 
            : "text-gray-900 dark:text-white"
        }`}>
          {title}
        </span>
      </div>
      <div className={`px-2 sm:px-3 py-1 rounded-md text-[8px] sm:text-[10px] font-black tracking-widest shrink-0 transition-colors ${
        status === "DELIVERED" 
          ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-500" 
          : "bg-gray-200 dark:bg-gray-700/30 text-gray-600 dark:text-gray-500"
      }`}>
        {status}
      </div>
    </div>
  );
};

export default DeliverableItem;
