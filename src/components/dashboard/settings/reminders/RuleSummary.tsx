"use client";

import React from "react";
import { LuSave, LuFlaskConical, LuCheck } from "react-icons/lu";

interface RuleSummaryProps {
  data: {
    trigger: string;
    offsetValue: string;
    offsetUnit: string;
    channel: string;
    recipients: string[];
  };
}

export const RuleSummary = ({ data }: RuleSummaryProps) => {
  const getTimeline = () => {
    if (data.offsetUnit === "immediately") return "Immediately";
    return `${data.offsetValue} ${data.offsetUnit} post-trigger`;
  };

  const getAudience = () => {
    if (data.recipients.length === 0) return "None selected";
    if (data.recipients.length === 1) {
       if (data.recipients[0] === "primary") return "Primary Contact";
       if (data.recipients[0] === "agency") return "Agency Rep";
       if (data.recipients[0] === "me") return "Internal Me";
    }
    return `${data.recipients.length} Targets`;
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-8 h-full">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Summary</h2>

      <div className="space-y-5">
        {[
          { label: "Trigger", value: getTimeline() },
          { label: "Channel", value: data.channel.charAt(0).toUpperCase() + data.channel.slice(1) },
          { label: "Audience", value: getAudience() }
        ].map(item => (
          <div key={item.label} className="flex justify-between items-center text-sm font-semibold">
            <span className="text-gray-400 dark:text-gray-500">{item.label}</span>
            <span className="text-gray-900 dark:text-white capitalize">{item.value}</span>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="flex items-center gap-2 text-success-500 pt-2">
        <LuCheck size={16} />
        <span className="text-[11px] font-bold uppercase tracking-widest">System Ready</span>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all">
          <LuSave size={18} />
          Save Rule
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
          <LuFlaskConical size={18} />
          Test Rule
        </button>

        <button className="w-full py-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em] pt-4">
          Cancel
        </button>
      </div>
    </div>
  );
};
