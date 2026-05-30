"use client";

import React, { useState } from "react";

export type PaymentFilter = "All" | "Overdue" | "Pending" | "Paid";

const PaymentFilters = () => {
  const [active, setActive] = useState<PaymentFilter>("All");
  const filters: PaymentFilter[] = ["All", "Overdue", "Pending", "Paid"];

  return (
    <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 lg:mx-0 lg:px-0">
      <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-xl text-[11px] sm:text-sm font-bold transition-all border whitespace-nowrap ${active === filter
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-lg active:scale-95"
                : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentFilters;
