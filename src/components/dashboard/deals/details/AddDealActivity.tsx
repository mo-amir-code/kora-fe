"use client";

import React, { useState } from "react";
import { LuPlus, LuLoader, LuX, LuChevronDown, LuMessageSquare } from "react-icons/lu";

const ACTIVITY_TYPES = [
  { value: "DEAL_UPDATED", label: "Deal Updated" },
  { value: "STAGE_CHANGED", label: "Stage Changed" },
  { value: "CONTACT_CHANGED", label: "Contact Changed" },
  { value: "DELIVERABLE_ADDED", label: "Deliverable Added" },
  { value: "DELIVERABLE_COMPLETED", label: "Deliverable Completed" },
  { value: "CONTRACT_UPLOADED", label: "Contract Uploaded" },
  { value: "INVOICE_CREATED", label: "Invoice Created" },
  { value: "INVOICE_SENT", label: "Invoice Sent" },
  { value: "PAYMENT_RECEIVED", label: "Payment Received" },
  { value: "PAYMENT_REFUNDED", label: "Payment Refunded" },
  { value: "NOTE_ADDED", label: "Note Added" },
  { value: "ATTACHMENT_UPLOADED", label: "Attachment Uploaded" },
  { value: "REMINDER_SENT", label: "Reminder Sent" },
  { value: "DEAL_ARCHIVED", label: "Deal Archived" },
];

interface AddDealActivityProps {
  onAdd: (data: { type: string; body: string }) => void;
  isAdding?: boolean;
}

const AddDealActivity = ({ onAdd, isAdding }: AddDealActivityProps) => {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("NOTE_ADDED");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!body.trim()) return;
    onAdd({ type, body: body.trim() });
    setBody("");
    setShowForm(false);
  };

  return (
    <div className="bg-white dark:bg-[#13141c]/50 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800/40 transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-1.5 sm:p-2 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-500">
          <LuMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Log Activity</h2>
      </div>

      {showForm ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">New Activity</span>
            <button onClick={() => setShowForm(false)} className="p-1 text-gray-400 hover:text-gray-600"><LuX size={16} /></button>
          </div>
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-brand-500"
            >
              {ACTIVITY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe what happened..."
            rows={3}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500 resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={!body.trim() || isAdding}
            className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAdding ? <LuLoader size={14} className="animate-spin" /> : <LuPlus size={14} />}
            {isAdding ? "Logging..." : "Log Activity"}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-gray-400 hover:text-brand-500 hover:border-brand-500/30 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
        >
          <LuPlus size={14} strokeWidth={3} />
          Log Manual Activity
        </button>
      )}
    </div>
  );
};

export default AddDealActivity;
