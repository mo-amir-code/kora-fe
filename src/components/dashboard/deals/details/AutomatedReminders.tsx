"use client";

import React, { useState } from "react";
import { LuBellRing } from "react-icons/lu";

export type ReminderType = {
  id: string | number;
  title: string;
  description: string;
  enabled: boolean;
};

export type AutomatedRemindersProps = {
  reminders: ReminderType[];
};

const AutomatedReminders = ({ reminders: initialReminders }: AutomatedRemindersProps) => {
  const [reminders, setReminders] = useState(initialReminders);

  const toggleReminder = (id: string | number) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="bg-white dark:bg-[#13141c]/50 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800/40 transition-colors">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-1.5 sm:p-2 bg-brand-500/10 rounded-xl text-brand-600 dark:text-brand-500">
          <LuBellRing className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Automated Reminders</h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {reminders.map((reminder) => (
          <div 
            key={reminder.id}
            className="flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-800/40 transition-all hover:border-gray-300 dark:hover:border-gray-700"
          >
            <div className="space-y-1 flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white tracking-tight truncate">
                {reminder.title}
              </h4>
              <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 line-clamp-1">
                {reminder.description}
              </p>
            </div>

            <button
              onClick={() => toggleReminder(reminder.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 outline-none focus:ring-2 focus:ring-brand-500/20 ${
                reminder.enabled ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                  reminder.enabled ? "translate-x-6" : "translate-x-1"
                } ${reminder.enabled ? "shadow-[0_0_8px_rgba(255,255,255,0.4)]" : ""}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomatedReminders;
