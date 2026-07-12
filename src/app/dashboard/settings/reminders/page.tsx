"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuArrowLeft, LuPlus, LuSmartphone, LuMail, LuBell } from "react-icons/lu";
import { ReminderRuleCard } from "@/components/dashboard/settings/reminders/ReminderRuleCard";
import { ConfirmationModal } from "@/components/common";
import toast from "react-hot-toast";

import { useRemindersList, useToggleReminder, useDeleteReminder, ReminderRule } from "@/hooks/useReminders";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/stores/subscription/subscription";
import { LuLock } from "react-icons/lu";

const getTriggerLabel = (type: string) => {
  switch (type) {
    case "DELIVERABLE_DUE_SOON": return "Deliverable Due Soon";
    case "DELIVERABLE_OVERDUE": return "Deliverable Overdue";
    case "PAYMENT_DUE": return "Payment Due";
    case "PAYMENT_OVERDUE": return "Payment Overdue";
    case "MISSING_INVOICE": return "Missing Invoice";
    default: return "Automation Rule";
  }
};

export default function RemindersPage() {
  const router = useRouter();
  const plan = useSubscriptionStore((state) => state.plan);
  const { data: rules = [], isLoading } = useRemindersList();
  const toggleMutation = useToggleReminder();
  const deleteMutation = useDeleteReminder();
  const [ruleToDelete, setRuleToDelete] = useState<string | null>(null);

  const toggleRule = (id: string, currentStatus: boolean) => {
    toggleMutation.mutate({ ruleId: id, isActive: !currentStatus });
  };

  const handleDeleteRule = () => {
    if (ruleToDelete !== null) {
      deleteMutation.mutate(ruleToDelete, {
        onSuccess: () => setRuleToDelete(null),
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          <Link 
            href="/dashboard/settings"
            className="group flex items-center gap-2 text-gray-400 hover:text-brand-500 transition-colors"
          >
            <div className="p-2 rounded-full border border-gray-200 dark:border-gray-800 group-hover:border-brand-500/50 group-hover:bg-brand-500/5 transition-all">
              <LuArrowLeft size={16} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest ml-1">Back to Settings</span>
          </Link>
          
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Reminders & Rules
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium max-w-xl">
              Automate your follow-ups, deliverable checks, and financial alerts to save time and stay organized.
            </p>
          </div>
        </div>

        {plan !== "PRO" ? (
          <Link 
            href="/dashboard/settings/subscription"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-200 dark:bg-gray-800 text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-300 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
          >
            <LuLock size={16} />
            Upgrade to Create Rules
          </Link>
        ) : (
          <Link 
            href="/dashboard/settings/reminders/create"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all active:scale-[0.98]"
          >
            <LuPlus size={20} strokeWidth={2.5} />
            Create New Rule
          </Link>
        )}
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map((rule: ReminderRule) => (
          <ReminderRuleCard 
            key={rule.id}
            id={rule.id as any}
            title={rule.name || getTriggerLabel(rule.triggerType)}
            category={rule.channelWhatsapp ? "WhatsApp Follow-up" : "Email Automation"}
            description={rule.messageTemplate || `Reminder set for ${rule.offsetValue} ${rule.offsetUnit} after trigger.`}
            icon={rule.channelWhatsapp ? LuSmartphone : LuMail}
            iconColor={rule.channelWhatsapp ? "bg-success-500" : "bg-blue-500"}
            status={rule.isActive ? "active" : "paused"}
            stats={rule.isActive ? "Active Rule" : "Paused"}
            onToggle={() => toggleRule(rule.id, rule.isActive)}
            onEdit={() => router.push(`/dashboard/settings/reminders/edit/${rule.id}`)}
            onDelete={() => setRuleToDelete(rule.id)}
            readOnly={plan !== "PRO"}
          />
        ))}

        {/* Create Custom Rule Card */}
        {plan !== "PRO" ? (
          <Link 
            href="/dashboard/settings/subscription"
            className="group relative h-full min-h-[220px] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-brand-500/30 hover:bg-brand-500/[0.01] transition-all flex flex-col items-center justify-center gap-4 py-8"
          >
            <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-brand-500 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10 transition-all">
              <LuLock size={24} />
            </div>
            <div className="text-center space-y-1 px-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1.5">
                Custom Rules (Pro)
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-600 font-medium">Upgrade to create custom triggers and channels.</p>
            </div>
          </Link>
        ) : (
          <Link 
            href="/dashboard/settings/reminders/create"
            className="group relative h-full min-h-[220px] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-brand-500/50 hover:bg-brand-500/[0.02] transition-all flex flex-col items-center justify-center gap-4 py-8"
          >
            <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-brand-500 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10 transition-all">
              <LuPlus size={28} />
            </div>
            <div className="text-center space-y-1">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Create Custom Rule</h4>
              <p className="text-xs text-gray-500 dark:text-gray-600 font-medium">Set up custom triggers and actions.</p>
            </div>
          </Link>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-10 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-[0.2em]">
          Automated workflows run on enterprise-grade infrastructure • 99.9% uptime
        </p>
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={ruleToDelete !== null}
        onClose={() => setRuleToDelete(null)}
        onConfirm={handleDeleteRule}
        title="Delete Reminder Rule?"
        description="This action cannot be undone. This automation will stop running immediately across all your deals."
        confirmLabel="Delete Rule"
        variant="danger"
      />
    </div>
  );
}
