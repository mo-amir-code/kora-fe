"use client";

import React from "react";

export type FilterOption = {
  id: string;
  label: string;
  hasDot?: boolean;
  dotColor?: string;
};

export type DealsFilterProps = {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  className?: string;
};

const DealsFilter = ({
  options,
  activeFilter,
  onFilterChange,
  className = "",
}: DealsFilterProps) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`
            relative flex items-center gap-2 px-6 py-2 rounded-xl transition-all border whitespace-nowrap
            text-[13px] font-bold
            ${activeFilter === option.id
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-lg active:scale-95"
              : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }
          `}
        >
          {option.label}
          {option.hasDot && (
            <span
              className={`w-1.5 h-1.5 rounded-full ${option.dotColor || "bg-rose-500"
                }`}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default DealsFilter;
