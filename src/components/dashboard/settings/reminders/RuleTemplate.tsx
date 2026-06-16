"use client";

import React from "react";
import { LuLayoutTemplate, LuEye, LuEraser } from "react-icons/lu";

interface RuleTemplateProps {
  data: {
    message: string;
  };
  onChange: (field: string, value: string) => void;
  onTemplateSelect?: (templateId: string) => void;
}

const VARIABLES = [
  { id: "#brand_name", label: "brand_name" },
  { id: "#amount", label: "amount" },
  { id: "#due_date", label: "due_date" },
  { id: "#campaign_id", label: "campaign_id" },
  { id: "#invoice_url", label: "invoice_url" }
];

export const RuleTemplate = ({ data, onChange, onTemplateSelect }: RuleTemplateProps) => {
  const insertVariable = (id: string) => {
    const variableText = `{{${id.replace('#', '')}}}`;
    onChange("message", data.message + variableText);
  };

  const templates = [
    { id: "payment", label: "Payment Reminder", icon: "💰" },
    { id: "due_soon", label: "Deliverable Due", icon: "⏰" },
    { id: "pitch", label: "Stale Pitch Alert", icon: "📣" }
  ];

  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
            <LuLayoutTemplate size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Message Template</h2>
        </div>
        <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[9px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200/50 dark:border-gray-700/50">
          Auto-Formatting Enabled
        </div>
      </div>

      {/* Prebuilt Selection */}
      <div className="space-y-3 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
          Use Prebuilt Template
        </label>
        <div className="flex flex-wrap gap-2">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => onTemplateSelect?.(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:border-brand-500/50 hover:text-brand-500 transition-all shadow-sm"
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
              Insert Variables
            </label>
        </div>
        {/* Variable Chips */}
        <div className="flex flex-wrap gap-2">
          {VARIABLES.map(v => (
            <button
              key={v.id}
              onClick={() => insertVariable(v.id)}
              className="px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:border-brand-500/50 hover:text-brand-500 hover:bg-brand-500/[0.03] transition-all"
            >
              {v.id}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <div className="space-y-4">
          <div className="relative">
            <textarea 
              rows={6}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 text-sm font-medium outline-none focus:border-brand-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 leading-relaxed resize-none"
              placeholder="Hi {{brand_name}}, just a quick nudge regarding invoice #{{invoice_id}} for {{amount}} which is due on {{due_date}}..."
              value={data.message}
              onChange={(e) => onChange("message", e.target.value)}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <div className="w-4 h-4 rounded-full border border-current flex-shrink-0 flex items-center justify-center text-[10px] font-bold italic">i</div>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">Variables will be swapped with real deal data.</p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => onChange("message", "")}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-transparent text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
              >
                <LuEraser size={14} />
                Clear
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                <LuEye size={14} />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
