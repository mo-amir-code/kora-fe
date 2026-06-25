"use client";

import React from "react";
import Link from "next/link";
import { LuArrowLeft, LuLifeBuoy, LuMessagesSquare, LuMail } from "react-icons/lu";
import { SupportForm } from "@/components/dashboard/settings/support";

const CONTACT_METHODS = [
  {
    icon: LuLifeBuoy,
    title: "Help Center",
    description: "Browse guides and documentation",
    tag: "Docs"
  },
  {
    icon: LuMessagesSquare,
    title: "Live Chat",
    description: "Average response: 5 mins",
    tag: "Instant"
  },
  {
    icon: LuMail,
    title: "Email Support",
    description: "For complex inquiries",
    tag: "24h"
  }
];

export default function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header Section */}
      <div className="space-y-4">
        <nav className="flex items-center gap-2">
          <Link 
            href="/dashboard/settings"
            className="group flex items-center gap-2 text-gray-400 hover:text-brand-500 transition-colors"
          >
            <div className="p-2 rounded-full border border-gray-200 dark:border-gray-800 group-hover:border-brand-500/50 group-hover:bg-brand-500/5 transition-all">
              <LuArrowLeft size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest ml-1">Settings</span>
          </Link>
          <span className="text-gray-400 text-xs font-bold">/</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">Support</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
        {/* Left: Contact Info (static, no links) */}
        <div className="lg:col-span-5 space-y-10 lg:space-y-12">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              How can we <br className="hidden sm:block" />
              <span className="text-brand-500">help you?</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium max-w-sm leading-relaxed">
              Have a question about Kora? Our team is here to help you get the most out of your experience.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {CONTACT_METHODS.map((method, index) => (
              <div 
                key={index}
                className="p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-800/50 transition-all flex items-center justify-between bg-white dark:bg-gray-900/40"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                    <method.icon size={20} className="sm:size-[22px]" />
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-bold text-gray-900 dark:text-white">{method.title}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-500 font-medium tracking-wide">{method.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-brand-500/60 uppercase tracking-widest">{method.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Support Form */}
        <div className="lg:col-span-7">
          <SupportForm />
        </div>
      </div>

      {/* FAQ Link Footer */}
      <div className="text-center pt-10 border-t border-gray-100 dark:border-gray-800">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Looking for immediate answers? 
          <span className="ml-1 text-brand-500 font-bold">
            Visit our Knowledge Base
          </span>
        </p>
      </div>
    </div>
  );
}
