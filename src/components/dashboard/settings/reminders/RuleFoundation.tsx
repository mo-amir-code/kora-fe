"use client";

import React from "react";
import { LuZap } from "react-icons/lu";

interface RuleFoundationProps {
  data: {
    name: string;
    trigger: string;
    offsetValue: string;
    offsetUnit: string;
  };
  onChange: (field: string, value: string) => void;
}

export const RuleFoundation = ({ data, onChange }: RuleFoundationProps) => {
  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
          <LuZap size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Rule Foundation</h2>
      </div>

      <div className="space-y-6">
        {/* Rule Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
            Rule Name
          </label>
          <input 
            type="text"
            placeholder="e.g., Payment Follow-up - 24h Post Due"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl px-5 py-4 text-sm font-semibold outline-none focus:border-brand-500 transition-all text-gray-900 dark:text-white"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        {/* Trigger and Timing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
              Trigger Event
            </label>
            <select 
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl px-5 py-4 text-sm font-semibold outline-none focus:border-brand-500 transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
              value={data.trigger}
              onChange={(e) => onChange("trigger", e.target.value)}
            >
              <option value="deliverable_due_soon">Deliverable Due Soon</option>
              <option value="deliverable_overdue">Deliverable Overdue</option>
              <option value="payment_due">Payment Due</option>
              <option value="payment_overdue">Payment Overdue</option>
              <option value="missing_invoice">Missing Invoice</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
              Timing Offset
            </label>
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="0"
                className="w-20 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl px-4 py-4 text-sm font-semibold outline-none focus:border-brand-500 transition-all text-gray-900 dark:text-white text-center"
                value={data.offsetValue}
                onChange={(e) => onChange("offsetValue", e.target.value)}
              />
              <select 
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl px-5 py-4 text-sm font-semibold outline-none focus:border-brand-500 transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                value={data.offsetUnit}
                onChange={(e) => onChange("offsetUnit", e.target.value)}
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
