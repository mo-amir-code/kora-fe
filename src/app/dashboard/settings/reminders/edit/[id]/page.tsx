"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { RuleFoundation } from "@/components/dashboard/settings/reminders/RuleFoundation";
import { RuleDistribution } from "@/components/dashboard/settings/reminders/RuleDistribution";
import { RuleTemplate } from "@/components/dashboard/settings/reminders/RuleTemplate";
import { RuleSummary } from "@/components/dashboard/settings/reminders/RuleSummary";
import { ProTip } from "@/components/dashboard/settings/reminders/ProTip";
import { FollowUpManager } from "@/components/dashboard/settings/reminders/FollowUpManager";
import { useRemindersList, useUpdateReminder } from "@/hooks/useReminders";
import { useTemplates } from "@/hooks/useTemplates";

export default function EditReminderPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: rules = [], isLoading: isFetching } = useRemindersList();
  const updateMutation = useUpdateReminder();
  const { data: templates = [] } = useTemplates();

  const [formData, setFormData] = useState<{
    name: string;
    trigger: string;
    offsetValue: string;
    offsetUnit: string;
    channels: string[];
    recipients: string[];
    message: string;
    nextFollowUps: string[];
  }>({
    name: "",
    trigger: "deliverable_due_soon",
    offsetValue: "24",
    offsetUnit: "hours",
    channels: ["whatsapp"],
    recipients: ["primary", "me"],
    message: "",
    nextFollowUps: []
  });

  useEffect(() => {
    if (rules.length > 0 && id) {
      const rule = rules.find(r => r.id === id);
      if (rule) {
        setFormData({
          name: rule.name || "",
          trigger: rule.triggerType.toLowerCase(),
          offsetValue: rule.offsetValue.toString(),
          offsetUnit: rule.offsetUnit,
          channels: [
            ...(rule.channelEmail ? ["email"] : []),
            ...(rule.channelWhatsapp ? ["whatsapp"] : [])
          ],
          recipients: rule.recipients && rule.recipients.length > 0 ? rule.recipients : ["primary", "me"],
          message: rule.messageTemplate || "",
          nextFollowUps: rule.nextFollowUps || []
        });
      }
    }
  }, [rules, id]);

  const handleUpdate = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTemplateSelect = (content: string) => {
    handleUpdate("message", content);
  };

  const handleSubmit = () => {
    updateMutation.mutate({
      ruleId: id as string,
      data: {
        name: formData.name,
        triggerType: formData.trigger.toUpperCase(),
        offsetValue: parseInt(formData.offsetValue),
        offsetUnit: formData.offsetUnit,
        nextFollowUps: formData.nextFollowUps,
        recipients: formData.recipients,
        channelEmail: formData.channels.includes("email"),
        channelWhatsapp: formData.channels.includes("whatsapp"),
        channelPush: formData.recipients.includes("me"),
        messageTemplate: formData.message
      }
    }, {
      onSuccess: () => {
        router.push("/dashboard/settings/reminders");
      }
    });
  };

  if (isFetching) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 space-y-12">
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
            Edit Reminder Rule
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
            Update your automation logic to stay perfectly aligned with your changing workflow needs.
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

          <FollowUpManager 
            dates={formData.nextFollowUps}
            onChange={(dates) => handleUpdate("nextFollowUps", dates)}
          />

          <RuleDistribution 
            data={{
              channels: formData.channels,
              recipients: formData.recipients,
              trigger: formData.trigger,
            }}
            onChange={handleUpdate}
          />

          <RuleTemplate 
             data={{ message: formData.message }}
             templates={templates}
             onChange={handleUpdate}
             onTemplateSelect={handleTemplateSelect}
           />
        </div>

        {/* Right Column: Actions & Info (4 Units) */}
        <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
          <RuleSummary 
            data={formData} 
            onSave={handleSubmit}
            isSaving={updateMutation.isPending}
          />
          <ProTip />
        </div>

      </div>
    </div>
  );
}
