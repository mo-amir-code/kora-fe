"use client";

import React, { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export type PaymentSectionProps = {
  title: string;
  icon: React.ReactNode;
  count: number;
  content: React.ReactNode;
  isCollapsible?: boolean;
  defaultOpen?: boolean;
};

const PaymentSection = ({
  title,
  icon,
  count,
  content,
  isCollapsible = false,
  defaultOpen = true
}: PaymentSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-6">
      <div
        className={`flex items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 ${isCollapsible ? 'cursor-pointer select-none' : ''}`}
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-gray-900 dark:text-white transition-colors shrink-0">
            {icon}
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white tracking-tight truncate">
            {title}
          </h3>
          {isCollapsible && (
            <div className="text-gray-400 dark:text-gray-500 transition-colors shrink-0">
              {isOpen ? <LuChevronUp size={18} className="sm:w-5 sm:h-5" /> : <LuChevronDown size={18} className="sm:w-5 sm:h-5" />}
            </div>
          )}
        </div>

        <div className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[9px] sm:text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors shrink-0">
          {count} <span className="hidden sm:inline">{count === 1 ? 'Item' : 'Items'}</span>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-4">
          {content}
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
