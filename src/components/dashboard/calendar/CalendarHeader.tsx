"use client";

import React from "react";
import { LuChevronLeft, LuChevronRight, LuPlus } from "react-icons/lu";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  view: "month" | "week";
  onViewChange: (view: "month" | "week") => void;
}

const CalendarHeader = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  view,
  onViewChange,
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto">
        {/* Month Navigation */}
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-1 py-1 shadow-sm w-full sm:w-auto">
          <button 
            onClick={onPrevMonth}
            className="p-2 sm:p-2.5 hover:bg-white dark:hover:bg-gray-700 rounded-lg sm:rounded-xl text-gray-500 dark:text-gray-400 transition-all active:scale-90"
          >
            <LuChevronLeft size={16} strokeWidth={2.5} className="sm:w-4.5 sm:h-4.5" />
          </button>
          <span className="px-2 sm:px-6 text-xs sm:text-base font-black text-gray-900 dark:text-white uppercase tracking-widest sm:tracking-[0.15em] min-w-[120px] sm:min-w-[160px] text-center truncate">
            {format(currentDate, "MMM yyyy")}
          </span>
          <button 
            onClick={onNextMonth}
            className="p-2.5 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-500 dark:text-gray-400 transition-all active:scale-90"
          >
            <LuChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Today Button */}
        <button 
          onClick={onToday}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-[10px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-all hover:border-brand-500/50 hover:text-brand-500 active:scale-95 text-center"
        >
          Today
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        {/* View Switcher - Hidden on mobile, shown at bottom in page.tsx */}
        <div className="hidden sm:flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-1 shadow-sm w-full sm:w-auto">
          <button 
            onClick={() => onViewChange("month")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${
              view === "month" 
                ? "bg-gray-900 dark:bg-brand-500 text-white shadow-lg" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => onViewChange("week")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${
              view === "week" 
                ? "bg-gray-900 dark:bg-brand-500 text-white shadow-lg" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            Week
          </button>
        </div>

        {/* Add Deadline Action */}
        <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] sm:text-xs font-black shadow-xl transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest group">
          <LuPlus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300 sm:w-[18px] sm:h-[18px]" />
          Add Deadline
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
