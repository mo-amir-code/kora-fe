"use client";

import React, { useState } from "react";
import { LuBellRing, LuPlus, LuX, LuLoader, LuTrash2, LuChevronDown } from "react-icons/lu";
import { useReminderRules, useCreateReminder, useToggleReminder, useDeleteReminder } from "@/hooks/useReminders";

const TRIGGER_TYPES = [
  { value: "DELIVERABLE_DUE_SOON", label: "Deliverable Due Soon" },
  { value: "DELIVERABLE_OVERDUE", label: "Deliverable Overdue" },
  { value: "PAYMENT_DUE_SOON", label: "Payment Due Soon" },
  { value: "PAYMENT_OVERDUE", label: "Payment Overdue" },
  { value: "MISSING_INVOICE", label: "Missing Invoice" },
];

function getTriggerLabel(type: string): string {
  return TRIGGER_TYPES.find((t) => t.value === type)?.label ?? type;
}

function formatOffset(value: number, unit: string): string {
  if (unit === "immediately") return "Immediately";
  return `${value} ${unit} before`;
}

const AutomatedReminders = () => {
  const { data: reminders, isLoading } = useReminderRules();
  const createReminder = useCreateReminder();
  const toggleReminder = useToggleReminder();
  const deleteReminder = useDeleteReminder();

  const [showForm, setShowForm] = useState(false);
  const [newRule, setNewRule] = useState({ triggerType: "PAYMENT_DUE_SOON", offsetValue: "24", offsetUnit: "hours", channelEmail: true, channelWhatsapp: false, channelPush: true });

  const handleCreate = () => {
    const value = parseInt(newRule.offsetValue);
    if (newRule.offsetUnit !== "immediately" && (!value || value <= 0)) return;
    createReminder.mutate(
      { 
        triggerType: newRule.triggerType, 
        offsetValue: value, 
        offsetUnit: newRule.offsetUnit,
        channelEmail: newRule.channelEmail, 
        channelWhatsapp: newRule.channelWhatsapp 
      },
      { onSuccess: () => { setShowForm(false); setNewRule({ triggerType: "PAYMENT_DUE_SOON", offsetValue: "24", offsetUnit: "hours", channelEmail: true, channelWhatsapp: false, channelPush: true }); } }
    );
  };

  return (
    <div className="bg-white dark:bg-[#13141c]/50 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800/40 transition-colors">
      <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-1.5 sm:p-2 bg-brand-500/10 rounded-xl text-brand-600 dark:text-brand-500">
            <LuBellRing className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Automated Reminders</h2>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-6">
          <LuLoader className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      )}

      {/* Rules List */}
      {!isLoading && (
        <div className="space-y-3 sm:space-y-4">
          {(reminders ?? []).map((rule) => (
            <div 
              key={rule.id}
              className="flex items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-800/40 transition-all hover:border-gray-300 dark:hover:border-gray-700 group"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white tracking-tight truncate">
                  {formatOffset(rule.offsetValue, rule.offsetUnit)} — {getTriggerLabel(rule.triggerType)}
                </h4>
                <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
                  {rule.channelEmail ? "Email" : ""}{rule.channelWhatsapp ? " • WhatsApp" : ""}{rule.channelPush ? " • Push" : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => deleteReminder.mutate(rule.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/5 transition-all opacity-0 group-hover:opacity-100"
                >
                  <LuTrash2 size={14} />
                </button>
                <button
                  onClick={() => toggleReminder.mutate({ ruleId: rule.id, isActive: !rule.isActive })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                    rule.isActive ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                    rule.isActive ? "translate-x-6" : "translate-x-1"
                  }`} />
                </button>
              </div>
            </div>
          ))}

          {!isLoading && (reminders ?? []).length === 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-4">No reminder rules yet.</p>
          )}
        </div>
      )}

      {/* Add New Form */}
      {showForm && (
        <div className="mt-4 p-4 rounded-2xl border border-brand-500/30 bg-white dark:bg-gray-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">New Reminder</span>
            <button onClick={() => setShowForm(false)} className="p-1 text-gray-400 hover:text-gray-600"><LuX size={16} /></button>
          </div>
          <div className="relative">
            <select
              value={newRule.triggerType}
              onChange={(e) => setNewRule({ ...newRule, triggerType: e.target.value })}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500"
            >
              {TRIGGER_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="0"
              value={newRule.offsetValue}
              onChange={(e) => setNewRule({ ...newRule, offsetValue: e.target.value })}
              className="w-20 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500"
            />
            <select
              value={newRule.offsetUnit}
              onChange={(e) => setNewRule({ ...newRule, offsetUnit: e.target.value })}
              className="flex-1 appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500"
            >
              <option value="immediately">Immediately</option>
              <option value="hours">Hours after</option>
              <option value="days">Days after</option>
              <option value="weeks">Weeks after</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={newRule.channelEmail}
              onChange={(e) => setNewRule({ ...newRule, channelEmail: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            Email
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={newRule.channelWhatsapp}
              onChange={(e) => setNewRule({ ...newRule, channelWhatsapp: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            WhatsApp
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={newRule.channelPush}
              onChange={(e) => setNewRule({ ...newRule, channelPush: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            Push Notification
          </label>
          <button
            onClick={handleCreate}
            disabled={createReminder.isPending}
            className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {createReminder.isPending ? <LuLoader size={14} className="animate-spin" /> : <LuPlus size={14} />}
            {createReminder.isPending ? "Creating..." : "Create Reminder"}
          </button>
        </div>
      )}

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mt-4 py-3 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-gray-400 hover:text-brand-500 hover:border-brand-500/30 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
        >
          <LuPlus size={14} strokeWidth={3} />
          Add Reminder
        </button>
      )}
    </div>
  );
};

export default AutomatedReminders;
