"use client";

import React from "react";
import { LuLightbulb } from "react-icons/lu";

export const ProTip = () => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
      <div className="flex items-center gap-2 text-brand-500">
        <LuLightbulb size={18} />
        <span className="text-sm font-bold uppercase tracking-widest">Pro Tip</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
        Creators using <span className="text-success-500 font-bold italic">WhatsApp reminders</span> get paid <span className="text-gray-900 dark:text-white font-bold">4.2 days faster</span> on average compared to Email. Ensure your messages remain professional yet urgent.
      </p>
      
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <span>99.8% Success Rate</span>
        </div>
      </div>
    </div>
  );
};
