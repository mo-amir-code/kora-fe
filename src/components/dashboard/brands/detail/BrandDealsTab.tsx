import React from "react";
import { LuChevronRight, LuHistory } from "react-icons/lu";

export interface BrandDeal {
  id: string;
  title: string;
  date: string;
  type: string;
  amount: string;
  status: "paid" | "active" | "pitched" | "completed";
}

interface BrandDealsTabProps {
  deals: BrandDeal[];
}

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  active: "bg-brand-500/10 text-brand-500 border-brand-500/20",
  pitched: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  completed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const BrandDealsTab = ({ deals }: BrandDealsTabProps) => {
  return (
    <div className="space-y-3">
      {deals.map((deal) => (
        <div
          key={deal.id}
          className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400">
                {deal.title.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                {deal.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {deal.date} • {deal.type}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right">
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                {deal.amount}
              </p>
              <span
                className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider border ${statusStyles[deal.status]}`}
              >
                {deal.status}
              </span>
            </div>
            <LuChevronRight
              size={16}
              className="text-gray-300 dark:text-gray-600 group-hover:text-brand-500 transition-colors hidden sm:block"
            />
          </div>
        </div>
      ))}

      {/* Archived section */}
      <div className="mt-8 py-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center text-center">
        <LuHistory size={28} className="text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
          Looking for older deals?
        </p>
        <p className="text-xs text-gray-300 dark:text-gray-600">
          Archived campaigns will appear here.
        </p>
      </div>
    </div>
  );
};

export default BrandDealsTab;
