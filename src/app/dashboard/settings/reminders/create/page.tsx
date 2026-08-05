"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { RuleFoundation } from "@/components/dashboard/settings/reminders/RuleFoundation";
import { RuleDistribution } from "@/components/dashboard/settings/reminders/RuleDistribution";
import { RuleTemplate } from "@/components/dashboard/settings/reminders/RuleTemplate";
import { RuleSummary } from "@/components/dashboard/settings/reminders/RuleSummary";
import { ProTip } from "@/components/dashboard/settings/reminders/ProTip";
import { FollowUpManager, parseDurationToMinutes } from "@/components/dashboard/settings/reminders/FollowUpManager";
import { useCreateReminder } from "@/hooks/useReminders";
import { useTemplates } from "@/hooks/useTemplates";
import { useRouter } from "next/navigation";

export default function CreateReminderPage() {
  const [formData, setFormData] = useState<{
    name: string;
    trigger: string;
    offsetValue: string;
    offsetUnit: string;
    channels: string[];
    recipients: string[];
    message: string;
    templateId: string | null;
    nextFollowUps: string[];
  }>({
    name: "",
    trigger: "deliverable_due_soon",
    offsetValue: "24",
    offsetUnit: "hours",
    channels: ["whatsapp"],
    recipients: ["me"],
    message: "",
    templateId: null,
    nextFollowUps: []
  });

  const createMutation = useCreateReminder();
  const { data: templates = [] } = useTemplates();
  const router = useRouter();

  const handleUpdate = (field: string, value: any) => {
    setFormData(prev => {
      let updatedRecipients: string[] = field === "recipients" ? value : [...prev.recipients];
      if (field === "trigger") {
        const wasPayment = prev.trigger ? prev.trigger.toLowerCase().includes("payment") : false;
        const isPayment = typeof value === "string" && value.toLowerCase().includes("payment");

        if (!isPayment) {
          // Switching to non-payment trigger: block & remove all brand contact variants ("primary", "primary contact", "all")
          const filtered = updatedRecipients.filter((r: string) => r !== "primary" && r !== "primary contact" && r !== "all");
          updatedRecipients = filtered.length > 0 ? filtered : ["me"];
        } else if (!wasPayment && isPayment) {
          // Switching to payment-related trigger from non-payment: enable & auto-select "primary"
          const cleaned = updatedRecipients.filter((r: string) => r !== "all" && r !== "primary contact" && r !== "primary");
          updatedRecipients = ["primary", ...cleaned];
        }
      }

      // Deduplicate recipient entries (e.g. normalize "primary contact" to "primary")
      const deduplicated: string[] = [];
      for (const r of updatedRecipients) {
        const norm = r === "primary contact" ? "primary" : r;
        if (!deduplicated.includes(norm)) {
          deduplicated.push(norm);
        }
      }

      return {
        ...prev,
        [field]: value,
        recipients: deduplicated,
      };
    });
  };

  const handleSubmit = () => {
    const isPaymentTrigger = formData.trigger.toLowerCase().includes("payment");
    const finalRecipients = isPaymentTrigger
      ? formData.recipients
      : formData.recipients.filter(r => r !== "primary" && r !== "all");

    createMutation.mutate({
      name: formData.name,
      triggerType: formData.trigger.toUpperCase(),
      offsetValue: parseInt(formData.offsetValue),
      offsetUnit: formData.offsetUnit,
      nextFollowUps: formData.nextFollowUps,
      recipients: finalRecipients.length > 0 ? finalRecipients : ["me"],
      channelEmail: formData.channels.includes("email"),
      channelWhatsapp: formData.channels.includes("whatsapp"),
      channelPush: formData.recipients.includes("me"),
      messageTemplate: formData.templateId ? null : formData.message,
      templateId: formData.templateId
    }, {
      onSuccess: () => {
        router.push("/dashboard/settings/reminders");
      }
    });
  };

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
             data={{ message: formData.message, templateId: formData.templateId }}
             templates={templates}
             onChange={handleUpdate}
           />
        </div>

        {/* Right Column: Actions & Info (4 Units) */}
        <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
          <RuleSummary 
            data={formData} 
            onSave={handleSubmit}
            isSaving={createMutation.isPending}
            disabled={formData.nextFollowUps.some(f => parseDurationToMinutes(f) < 30)}
          />
          <ProTip />
        </div>

      </div>
    </div>
  );
}
