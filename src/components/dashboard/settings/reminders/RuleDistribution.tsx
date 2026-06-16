"use client";

import React from "react";
import { LuShare2, LuSmartphone, LuMail, LuCheck } from "react-icons/lu";

interface RuleDistributionProps {
  data: {
    channel: string;
    recipients: string[];
  };
  onChange: (field: string, value: any) => void;
}

export const RuleDistribution = ({ data, onChange }: RuleDistributionProps) => {
  const toggleRecipient = (id: string) => {
    const newRecipients = data.recipients.includes(id)
      ? data.recipients.filter(r => r !== id)
      : [...data.recipients, id];
    onChange("recipients", newRecipients);
  };

  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
          <LuShare2 size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Distribution</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Channel Selection */}
        <div className="md:col-span-2 space-y-4">
          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
            Notification Channel
          </label>
          <div className="space-y-3">
            {[
              { id: "whatsapp", label: "WhatsApp", sub: "Direct high-priority message", icon: LuSmartphone },
              { id: "email", label: "Email", sub: "Official record & thread", icon: LuMail }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => onChange("channel", c.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${data.channel === c.id ? 'border-brand-500 bg-brand-500/[0.03]' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${data.channel === c.id ? 'border-brand-500 bg-brand-500' : 'border-gray-300 dark:border-gray-700'}`}>
                  {data.channel === c.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div className={`p-2.5 rounded-xl ${data.channel === c.id ? 'bg-brand-500/10 text-brand-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                  <c.icon size={18} />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${data.channel === c.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{c.label}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{c.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recipients */}
        <div className="md:col-span-3 space-y-4">
          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
            Recipients
          </label>
          <div className="space-y-2">
            {[
              { id: "primary", label: "Brand Primary Contact" },
              { id: "agency", label: "Agency / Representative" },
              { id: "me", label: "Me (Internal Alert)" }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => toggleRecipient(r.id)}
                className="w-full flex items-center gap-3 p-3 group transition-colors"
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${data.recipients.includes(r.id) ? 'bg-brand-500 border-brand-500 shadow-lg shadow-brand-500/20' : 'border-gray-200 dark:border-gray-800 group-hover:border-gray-300 dark:group-hover:border-gray-700'}`}>
                  {data.recipients.includes(r.id) && <LuCheck size={14} className="text-white" strokeWidth={3} />}
                </div>
                <span className={`text-sm font-semibold transition-colors ${data.recipients.includes(r.id) ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
