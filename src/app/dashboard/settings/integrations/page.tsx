"use client";

import React from "react";
import Link from "next/link";
import { LuArrowLeft, LuSmartphone, LuMail, LuFolder, LuSlack, LuWebhook } from "react-icons/lu";
import { IntegrationCard } from "@/components/dashboard/settings/integrations";

const SERVICES = [
  {
    name: "WhatsApp Business",
    description: "Send automated deal updates, contract reminders, and invoice links directly to your clients' WhatsApp.",
    icon: LuSmartphone,
    status: "connected" as const,
    metaLabel: "Connected Number",
    metaValue: "+91 98765 43210",
    buttonLabel: "Manage"
  },
  {
    name: "Custom Email SMTP",
    description: "Route all platform emails through your own domain provider for maximum deliverability and professional branding.",
    icon: LuMail,
    status: "connected" as const,
    metaLabel: "Sending Domain",
    metaValue: "deals@creator.in",
    buttonLabel: "Settings"
  },
  {
    name: "Google Workspace",
    description: "Automatically create folders and sync contracts, deliverables, and invoices to your Google Drive.",
    icon: LuFolder,
    status: "disconnected" as const,
    metaLabel: "Status",
    metaValue: "Not Connected",
    buttonLabel: "Connect"
  },
  {
    name: "Slack",
    description: "Get instant notifications in your dedicated team channels when a deal status changes or payment is received.",
    icon: LuSlack,
    status: "disconnected" as const,
    metaLabel: "Status",
    metaValue: "Not Connected",
    buttonLabel: "Connect"
  },
  {
    name: "Custom Webhooks",
    description: "Push real-time deal events to your own servers or tools like Zapier and Make for ultimate custom automation.",
    icon: LuWebhook,
    status: "configured" as const,
    metaLabel: "Endpoints",
    metaValue: "0 Active",
    buttonLabel: "Configure"
  }
];

export default function IntegrationsPage() {
  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
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
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">Integrations</span>
        </nav>
        
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Connected Services
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium max-w-xl leading-relaxed">
            Manage third-party connections to automate your workflow. Send notifications, sync documents, and streamline your deal pipeline.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => (
          <IntegrationCard key={index} {...service} />
        ))}
      </div>

      {/* Add More Section */}
      <div className="pt-10 border-t border-gray-100 dark:border-gray-800">
        <div className="p-8 rounded-[32px] bg-brand-500/[0.03] border border-brand-500/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Need a specific integration?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">We're constantly adding new services. Let us know what you need.</p>
          </div>
          <button className="px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
            Request Service
          </button>
        </div>
      </div>
    </div>
  );
}
