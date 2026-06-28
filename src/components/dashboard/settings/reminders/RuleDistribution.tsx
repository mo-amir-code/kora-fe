"use client";

import React from "react";
import { LuShare2, LuSmartphone, LuMail, LuCheck, LuChevronDown, LuChevronUp } from "react-icons/lu";

interface RuleDistributionProps {
  data: {
    channels: string[];
    recipients: string[];
    trigger?: string;
  };
  onChange: (field: string, value: any) => void;
}

export const RuleDistribution = ({ data, onChange }: RuleDistributionProps) => {
  const isPaymentTrigger = data.trigger === "payment_due" || data.trigger === "payment_overdue";
  const isBrandSelected = data.recipients.includes("primary") || data.recipients.includes("all");

  const toggleBrandContacts = () => {
    if (!isPaymentTrigger) return;
    if (isBrandSelected) {
      // Unselect brand contacts (remove primary and all)
      const newRecipients = data.recipients.filter(r => r !== "primary" && r !== "all");
      onChange("recipients", newRecipients);
    } else {
      // Select brand contacts with primary selected by default as radio choice
      const newRecipients = Array.from(new Set([...data.recipients.filter(r => r !== "all"), "primary"]));
      onChange("recipients", newRecipients);
    }
  };

  const selectSubOption = (subId: "primary" | "all") => {
    if (!isPaymentTrigger) return;
    const otherSubId = subId === "primary" ? "all" : "primary";
    let newRecipients = data.recipients.filter(r => r !== otherSubId);
    if (!newRecipients.includes(subId)) {
      newRecipients.push(subId);
    }
    onChange("recipients", newRecipients);
  };

  const toggleMeRecipient = () => {
    const isSelected = data.recipients.includes("me");
    const newRecipients = isSelected
      ? data.recipients.filter(r => r !== "me")
      : [...data.recipients, "me"];
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
            ].map(c => {
              const isSelected = data.channels.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    const newChannels = isSelected
                      ? data.channels.filter(id => id !== c.id)
                      : [...data.channels, c.id];
                    onChange("channels", newChannels);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${isSelected ? 'border-brand-500 bg-brand-500/[0.03]' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-brand-500 bg-brand-500' : 'border-gray-300 dark:border-gray-700'}`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-brand-500/10 text-brand-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                    <c.icon size={18} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{c.label}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{c.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recipients */}
        <div className="md:col-span-3 space-y-4">
          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
            Recipients
          </label>
          <div className="space-y-3">
            {/* 1. Brand Contacts (Faded and disabled when not a payment trigger) */}
            <div className={`space-y-2 transition-all ${!isPaymentTrigger ? "opacity-50 pointer-events-none select-none" : ""}`}>
              <button
                type="button"
                disabled={!isPaymentTrigger}
                onClick={toggleBrandContacts}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                  isBrandSelected && isPaymentTrigger
                    ? "border-brand-500/50 bg-brand-500/5 dark:bg-brand-500/10"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                } ${!isPaymentTrigger ? "cursor-not-allowed bg-gray-50 dark:bg-gray-800/40" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isBrandSelected && isPaymentTrigger
                        ? "bg-brand-500 border-brand-500 shadow-md shadow-brand-500/20"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {isBrandSelected && isPaymentTrigger && <LuCheck size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  <div>
                    <span
                      className={`text-sm font-bold transition-colors ${
                        isBrandSelected && isPaymentTrigger ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      Brand Contacts
                    </span>
                    {!isPaymentTrigger && (
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                        Only available for Payment Due / Overdue triggers
                      </p>
                    )}
                  </div>
                </div>
                {isBrandSelected && isPaymentTrigger ? (
                  <LuChevronUp size={18} className="text-brand-500" />
                ) : (
                  <LuChevronDown size={18} className="text-gray-400" />
                )}
              </button>

              {/* Sub-options for Brand Contacts (Radio Buttons: Select Only One) */}
              {isBrandSelected && isPaymentTrigger && (
                <div className="ml-6 pl-4 border-l-2 border-brand-500/30 space-y-2 pt-1 pb-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    type="button"
                    disabled={!isPaymentTrigger}
                    onClick={() => selectSubOption("primary")}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        data.recipients.includes("primary")
                          ? "border-brand-500 bg-brand-500"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      {data.recipients.includes("primary") && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        data.recipients.includes("primary")
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Primary Contact
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={!isPaymentTrigger}
                    onClick={() => selectSubOption("all")}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        data.recipients.includes("all")
                          ? "border-brand-500 bg-brand-500"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      {data.recipients.includes("all") && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        data.recipients.includes("all")
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      All Contacts
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. Me (Internal Alert) */}
            <button
              type="button"
              onClick={toggleMeRecipient}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left ${
                data.recipients.includes("me")
                  ? "border-brand-500/50 bg-brand-500/5 dark:bg-brand-500/10"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  data.recipients.includes("me")
                    ? "bg-brand-500 border-brand-500 shadow-md shadow-brand-500/20"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                {data.recipients.includes("me") && <LuCheck size={14} className="text-white" strokeWidth={3} />}
              </div>
              <span
                className={`text-sm font-bold transition-colors ${
                  data.recipients.includes("me") ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Me (Internal Alert)
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
