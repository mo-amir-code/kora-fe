"use client";

import React from "react";
import { APP_NAME } from "@/lib/constants";
import { SettingSection } from "@/components/dashboard/settings";
import { LuUser, LuBell, LuSettings, LuFileText, LuCircleHelp, LuWallet } from "react-icons/lu";

export default function SettingsPage() {
  const accountItems = [
    {
      title: "My Profile",
      description: "Update your name, photo, and how others see you on the platform.",
      linkText: "Edit Details",
      href: "/dashboard/settings/profile",
      icon: LuUser,
    },
    {
      title: "General Preferences",
      description: "Configure your base currency (default USD $), timezone, and region.",
      linkText: "Configure",
      href: "/dashboard/settings/general",
      icon: LuSettings,
    },
    {
      title: "Subscription & Plan",
      description: "Manage your subscription, view current plan limits, and upgrade your account.",
      linkText: "Manage Plan",
      href: "/dashboard/settings/subscription",
      icon: LuWallet,
    },
  ];

  const workspaceItems = [
    {
      title: "Invoice Settings",
      description: "Set up your GSTIN, UPI ID, bank account, prefix, logo, and footer notes.",
      linkText: "Manage",
      href: "/dashboard/settings/invoices",
      icon: LuFileText,
    },
    {
      title: "Reminders",
      description: "Set up automatic alerts for your deals, invoices, and deadlines.",
      linkText: "Manage",
      href: "/dashboard/settings/reminders",
      icon: LuBell,
    },
  ];

  const generalItems = [
    {
      title: "Help Center",
      description: "Need help? Contact our team or read our easy-to-follow guides.",
      linkText: "Get Support",
      href: "/dashboard/settings/support",
      icon: LuCircleHelp,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-6 sm:py-10 px-2 sm:px-6">
      <div className="px-4 space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Manage your account, notifications, invoice templates, and workspace preferences for {APP_NAME}.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        <SettingSection title="Account & Preferences" items={accountItems} />
        <SettingSection title="Workspace & Invoicing" items={workspaceItems} />
        <SettingSection title="General & Support" items={generalItems} />
      </div>

      <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 font-medium tracking-wide">
          {APP_NAME} v1.0.5
        </p>
      </div>
    </div>
  );
}
