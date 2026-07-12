"use client";

import React from "react";
import { LuLayoutTemplate, LuEraser, LuX } from "react-icons/lu";
import { MessageTemplate } from "@/services/template.service";

interface RuleTemplateProps {
  data: {
    message: string;
    templateId: string | null;
  };
  templates: MessageTemplate[];
  onChange: (field: string, value: any) => void;
}

const VARIABLES = [
  { id: "#brand_name", label: "brand_name" },
  { id: "#amount", label: "amount" },
  { id: "#due_date", label: "due_date" },
  { id: "#campaign_id", label: "campaign_id" },
  { id: "#invoice_url", label: "invoice_url" }
];

export const RuleTemplate = ({ data, templates, onChange }: RuleTemplateProps) => {
  const insertVariable = (id: string) => {
    if (data.templateId) return;
    const variableText = `{{${id.replace('#', '')}}}`;
    onChange("message", data.message + variableText);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "PAYMENT_REMINDER": return "💰";
      case "FOLLOW_UP": return "⏰";
      case "INVOICE": return "📄";
      default: return "📝";
    }
  };

  const handleSelectTemplate = (t: MessageTemplate) => {
    if (t.id === data.templateId) {
      handleClearTemplate();
    } else {
      onChange("templateId", t.id);
      onChange("message", t.body);
    }
  };

  const handleClearTemplate = () => {
    onChange("templateId", null);
    onChange("message", "");
  };

  const selectedTemplate = templates.find(t => t.id === data.templateId);

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
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
            Use Prebuilt Template
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {templates.map(t => {
            const isSelected = t.id === data.templateId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTemplate(t)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[11px] font-bold transition-all shadow-sm ${
                  isSelected 
                    ? "border-brand-500 text-brand-500 bg-brand-500/5" 
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:border-brand-500/50 hover:text-brand-500"
                }`}
              >
                <span>{getCategoryIcon(t.category)}</span>
                {t.name}
              </button>
            );
          })}
          {templates.length === 0 && (
            <p className="text-[11px] font-medium text-gray-400 italic py-2">No saved templates found.</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {!data.templateId && (
          <>
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
                  type="button"
                  onClick={() => insertVariable(v.id)}
                  className="px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:border-brand-500/50 hover:text-brand-500 hover:bg-brand-500/[0.03] transition-all"
                >
                  {v.id}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Textarea */}
        <div className="space-y-4">
          <div className="relative">
            <textarea 
              rows={6}
              disabled={!!data.templateId}
              className={`w-full border rounded-2xl p-6 text-sm font-medium outline-none focus:border-brand-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 leading-relaxed resize-none ${
                data.templateId 
                  ? "bg-gray-100/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 opacity-75 cursor-not-allowed" 
                  : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700/50"
              }`}
              placeholder="Hi {{brand_name}}, just a quick nudge regarding invoice #{{invoice_id}} for {{amount}} which is due on {{due_date}}..."
              value={data.message}
              onChange={(e) => onChange("message", e.target.value)}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <div className="w-4 h-4 rounded-full border border-current flex-shrink-0 flex items-center justify-center text-[10px] font-bold italic">i</div>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                {data.templateId 
                  ? `Linked to template: "${selectedTemplate?.name || 'Prebuilt'}" (Read-only)` 
                  : "Variables will be swapped with real deal data."}
              </p>
            </div>
            
            {!data.templateId && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                  type="button"
                  onClick={() => onChange("message", "")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-transparent text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LuEraser size={14} />
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
