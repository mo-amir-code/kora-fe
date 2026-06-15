"use client";

import React, { useState } from "react";
import { LuX, LuBell, LuPlus, LuZap, LuSmartphone, LuMail } from "react-icons/lu";

interface CreateRuleFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRuleForm = ({ isOpen, onClose }: CreateRuleFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    trigger: "deliverable_due",
    timeline: "24h",
    channel: "whatsapp"
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 sm:p-10 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Automation</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Set up custom triggers and notifications.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
            >
              <LuX size={24} />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Rule Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Rule Name
              </label>
              <div className="relative">
                <LuBell className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="e.g. Weekly Invoice Follow-up"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl pl-12 pr-5 py-4 text-sm font-semibold outline-none focus:border-brand-500 transition-all text-gray-900 dark:text-white"
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                />
              </div>
            </div>

            {/* Trigger Grid */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 text-center">
                Select Trigger Event
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "deliverable_due", label: "Deliverable Due", icon: LuZap },
                  { id: "invoice_overdue", label: "Invoice Overdue", icon: LuPlus },
                  { id: "pitch_stale", label: "Stale Pitch", icon: LuBell }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setFormData(p => ({ ...p, trigger: t.id }))}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${formData.trigger === t.id ? 'border-brand-500 bg-brand-500/[0.03] text-brand-500' : 'border-gray-100 dark:border-gray-800 text-gray-400 hover:border-gray-200 dark:hover:border-gray-700'}`}
                  >
                    <t.icon size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Channel Options */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Notification Channel
              </label>
              <div className="flex gap-4">
                {[
                  { id: "whatsapp", label: "WhatsApp", icon: LuSmartphone, color: "text-success-500" },
                  { id: "email", label: "Email", icon: LuMail, color: "text-blue-500" }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setFormData(p => ({ ...p, channel: c.id }))}
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${formData.channel === c.id ? 'border-brand-500 bg-brand-500/[0.03] text-brand-500 font-bold' : 'border-gray-100 dark:border-gray-800 text-gray-400'}`}
                  >
                    <c.icon size={18} className={formData.channel === c.id ? 'text-brand-500' : c.color} />
                    <span className="text-xs uppercase tracking-widest">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all"
            >
              Create Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
