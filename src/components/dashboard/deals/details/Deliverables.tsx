import React from "react";
import { LuCircleCheck } from "react-icons/lu";
import DeliverableItem, { DeliverableItemProps } from "./DeliverableItem";

export type DeliverablesProps = {
  items: DeliverableItemProps[];
};

const Deliverables = ({ items }: DeliverablesProps) => {
  const completed = items.filter(i => i.isChecked).length;
  const total = items.length;
  const progress = (completed / total) * 100;

  return (
    <div className="space-y-6 sm:space-y-8 bg-gray-50/50 dark:bg-[#13141c]/50 p-5 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800/40 transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 sm:p-2 bg-brand-500/10 rounded-xl text-brand-600 dark:text-brand-500">
            <LuCircleCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Deliverables</h2>
        </div>
        <span className="text-[10px] sm:text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wide text-right">
          {completed} / {total} Done
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-4 w-full bg-gray-200 dark:bg-gray-900 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800/50 transition-colors">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 via-blue-500 to-emerald-500 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <DeliverableItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Deliverables;
