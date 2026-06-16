"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { RuleFoundation } from "@/components/dashboard/settings/reminders/RuleFoundation";
import { RuleDistribution } from "@/components/dashboard/settings/reminders/RuleDistribution";
import { RuleTemplate } from "@/components/dashboard/settings/reminders/RuleTemplate";
import { RuleSummary } from "@/components/dashboard/settings/reminders/RuleSummary";
import { ProTip } from "@/components/dashboard/settings/reminders/ProTip";

const PREBUILT_TEMPLATES: Record<string, string> = {
  payment: "Hi {{brand_name}}, just a quick nudge regarding invoice #{{invoice_id}} for {{amount}} which is due on {{due_date}}. Please ensure it is processed on time. Thanks!",
  due_soon: "Hey team, this is a reminder that the deliverable '{{campaign_id}}' is due in 24 hours. Please confirm if everything is on track for submission.",
  pitch: "Alert: The pitch for {{brand_name}} has reached its threshold with no reply. It might be time to manually follow up or adjust the strategy."
};

export default function CreateReminderPage() {
  const [formData, setFormData] = useState({
    name: "",
    trigger: "invoice_created",
    offsetValue: "24",
    offsetUnit: "hours",
    channel: "whatsapp",
    recipients: ["primary", "me"],
    message: ""
  });

  const handleUpdate = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTemplateSelect = (templateId: string) => {
    handleUpdate("message", PREBUILT_TEMPLATES[templateId] || "");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Page Header */}
      <div className="space-y-4">
        <Link 
          href="/dashboard/settings/reminders"
          className="group flex items-center gap-2 text-gray-400 hover:text-brand-500 transition-colors"
        >
          <div className="p-2 rounded-full border border-gray-200 dark:border-gray-800 group-hover:border-brand-500/50 group-hover:bg-brand-500/5 transition-all">
            <LuArrowLeft size={16} strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest ml-1">Back to Rules</span>
        </Link>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create Custom Reminder Rule
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
            Design precision automation for your workflow. Notify the right people at exactly the right moment.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
        
        {/* Left Column: Configuration (8 Units) */}
        <div className="lg:col-span-8 space-y-8">
          <RuleFoundation 
            data={{
              name: formData.name,
              trigger: formData.trigger,
              offsetValue: formData.offsetValue,
              offsetUnit: formData.offsetUnit
            }}
            onChange={handleUpdate}
          />

          <RuleDistribution 
            data={{
              channel: formData.channel,
              recipients: formData.recipients
            }}
            onChange={handleUpdate}
          />

          <RuleTemplate 
            data={{ message: formData.message }}
            onChange={handleUpdate}
            onTemplateSelect={handleTemplateSelect}
          />
        </div>

        {/* Right Column: Actions & Info (4 Units) */}
        <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
          <RuleSummary data={formData} />
          <ProTip />
        </div>

      </div>
    </div>
  );
}
