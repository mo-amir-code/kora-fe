"use client";

import React, { useState } from "react";
import { LuSend, LuLifeBuoy, LuMessagesSquare, LuMail } from "react-icons/lu";

export const SupportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-5 sm:p-10 space-y-8 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
          Send a Message
        </h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Tell us about your issue and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <input 
              type="text"
              placeholder="Alex Johnson"
              className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm font-semibold text-gray-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
              Work Email
            </label>
            <input 
              type="email"
              placeholder="alex@example.com"
              className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm font-semibold text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
            Issue Category
          </label>
          <div className="relative">
            <select className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all text-sm font-semibold text-gray-900 dark:text-white appearance-none cursor-pointer">
              <option>General Inquiry</option>
              <option>Billing & Subscription</option>
              <option>Technical Issue</option>
              <option>Feature Request</option>
              <option>Collaboration Partnership</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
            Subject
          </label>
          <input 
            type="text"
            placeholder="How can we help?"
            className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm font-semibold text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
            Message Details
          </label>
          <textarea 
            rows={4}
            placeholder="Please describe your issue or question in detail..."
            className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm font-semibold text-gray-900 dark:text-white resize-none"
          />
        </div>

        <button 
          disabled={isSubmitting}
          className="w-full px-8 py-4 rounded-2xl bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <LuSend size={18} strokeWidth={2.5} />
          )}
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
};
