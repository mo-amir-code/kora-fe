import React from "react";
import { LuCalendar, LuInfo } from "react-icons/lu";

export type DealStatsProps = {
  dueDate: string;
  timeLeft?: string;
  createdDate: string;
  createdYear: string;
};

const DealStats = ({ dueDate, timeLeft, createdDate, createdYear }: DealStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Due Date Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 sm:space-y-4 transition-all hover:border-gray-300 dark:hover:border-gray-700">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-500">
          <LuCalendar className="w-3.5 h-3.5 sm:w-[14px] sm:h-[14px]" strokeWidth={2.5} />
          <span>Due Date</span>
        </div>
        <div className="space-y-1">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{dueDate}</div>
          {timeLeft && (
            <div className="inline-flex px-2.5 py-0.5 sm:px-3 sm:py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-full text-[10px] font-bold text-amber-700 dark:text-amber-500 transition-colors">
              {timeLeft}
            </div>
          )}
        </div>
      </div>

      {/* Created Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 sm:space-y-4 transition-all hover:border-gray-300 dark:hover:border-gray-700">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-500">
          <LuInfo className="w-3.5 h-3.5 sm:w-[14px] sm:h-[14px]" strokeWidth={2.5} />
          <span>Created</span>
        </div>
        <div className="space-y-1">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{createdDate}</div>
          <div className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-500">{createdYear}</div>
        </div>
      </div>
    </div>
  );
};

export default DealStats;
