"use client";

import React, { useState, useEffect } from "react";
import { LuCircleCheck, LuLoader, LuCheck } from "react-icons/lu";

export type DeliverableItem = {
  id: string;
  title: string;
  status: "DELIVERED" | "PENDING";
  isChecked: boolean;
};

export type DeliverablesProps = {
  items: DeliverableItem[];
  onUpdate?: (updates: { id: string; isCompleted: boolean }[]) => void;
  isUpdating?: boolean;
};

const Deliverables = ({ items, onUpdate, isUpdating }: DeliverablesProps) => {
  const [localItems, setLocalItems] = useState(items);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync from props when data refetches
  useEffect(() => {
    setLocalItems(items);
    setHasChanges(false);
  }, [items]);

  const toggleItem = (id: string) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isChecked: !item.isChecked, status: !item.isChecked ? "DELIVERED" as const : "PENDING" as const }
          : item
      )
    );
    setHasChanges(true);
  };

  const handleConfirm = () => {
    const updates = localItems.map((item) => ({ id: item.id, isCompleted: item.isChecked }));
    onUpdate?.(updates);
  };

  const completed = localItems.filter((i) => i.isChecked).length;
  const total = localItems.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-6 sm:space-y-8 bg-gray-50/50 dark:bg-[#13141c]/50 p-5 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800/40 transition-colors relative">
      {/* Updating overlay */}
      {isUpdating && (
        <div className="absolute inset-0 z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-[1px] rounded-3xl flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <LuLoader className="h-4 w-4 animate-spin text-brand-500" />
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Saving...</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 sm:p-2 bg-brand-500/10 rounded-xl text-brand-600 dark:text-brand-500">
            <LuCircleCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Deliverables</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] sm:text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wide">
            {completed} / {total} Done
          </span>
          {/* Confirm button — only shows when changes exist */}
          {hasChanges && (
            <button
              onClick={handleConfirm}
              disabled={isUpdating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-[10px] sm:text-xs font-bold transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-brand-500/20"
            >
              <LuCheck size={14} strokeWidth={3} />
              Confirm
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 w-full bg-gray-200 dark:bg-gray-900 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800/50 transition-colors">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 via-blue-500 to-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Items */}
      <div className="flex flex-col gap-4">
        {localItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none ${
              item.isChecked
                ? "bg-emerald-500/5 dark:bg-emerald-500/5 border-emerald-200/50 dark:border-emerald-500/20"
                : "bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-800/40 hover:border-gray-300 dark:hover:border-gray-700"
            }`}
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                item.isChecked
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              }`}>
                {item.isChecked && <LuCircleCheck className="w-3.5 h-3.5" />}
              </div>
              <span className={`text-xs sm:text-sm font-semibold transition-colors line-clamp-2 flex-1 ${
                item.isChecked
                  ? "text-gray-500 dark:text-gray-400 line-through decoration-gray-400 dark:decoration-gray-600"
                  : "text-gray-900 dark:text-white"
              }`}>
                {item.title}
              </span>
            </div>
            <div className={`px-2 sm:px-3 py-1 rounded-md text-[8px] sm:text-[10px] font-black tracking-widest shrink-0 transition-colors ${
              item.isChecked
                ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-500"
                : "bg-gray-200 dark:bg-gray-700/30 text-gray-600 dark:text-gray-500"
            }`}>
              {item.isChecked ? "DELIVERED" : "PENDING"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deliverables;
