"use client";

import React from "react";
import { LuSave, LuFlaskConical, LuCheck } from "react-icons/lu";

interface RuleSummaryProps {
  data: {
    trigger: string;
    offsetValue: string;
    offsetUnit: string;
    channels: string[];
    recipients: string[];
    nextFollowUps: string[];
  };
  onSave?: () => void;
  isSaving?: boolean;
}

export const RuleSummary = ({ data, onSave, isSaving }: RuleSummaryProps) => {
  const getTimeline = () => {
    if (data.trigger === "deliverable_due_soon" || data.trigger === "payment_due" || data.trigger === "deliverable_overdue" || data.trigger === "payment_overdue") {
        return `${data.offsetValue} ${data.offsetUnit}`;
    }
    if (data.nextFollowUps && data.nextFollowUps.length > 0) {
        return `${data.nextFollowUps.length} Scheduled Follow-ups`;
    }
    return "Custom Rule";
  };

  const getAudience = () => {
    if (data.recipients.length === 0) return "Me (Creator)";
    const targets = data.recipients.map(r => {
        if (r === "primary") return "Brand";
        if (r === "me") return "Me";
        return r;
    });
    return targets.join(", ");
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-8 h-full">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Summary</h2>

      <div className="space-y-5">
        {[
          { label: "Alert Timing", value: getTimeline() },
          { label: "Notification", value: data.channels.length > 0 ? data.channels.join(", ") : "None" },
          { label: "Delivery", value: getAudience() }
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
        <button 
          onClick={onSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LuSave size={18} />
              Save Rule
            </>
          )}
        </button>
        
        <button className="w-full py-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em] pt-4">
          Cancel
        </button>
      </div>
    </div>
  );
};
