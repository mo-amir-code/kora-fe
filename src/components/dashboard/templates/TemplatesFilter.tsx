"use client";

import React from "react";

export type TemplateFilterOption = {
  id: string;
  label: string;
};

export type TemplatesFilterProps = {
  options: TemplateFilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  className?: string;
};

const TemplatesFilter = ({
  options,
  activeFilter,
  onFilterChange,
  className = "",
}: TemplatesFilterProps) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none scroll-smooth ${className}`}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`
            relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all border whitespace-nowrap
            text-[10px] sm:text-xs font-bold uppercase tracking-widest
            ${activeFilter === option.id
              ? "bg-brand-500/10 border-brand-500 text-brand-500 dark:bg-brand-500/20 dark:border-brand-500 dark:text-brand-400 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
              : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TemplatesFilter;
