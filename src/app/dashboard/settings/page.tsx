"use client";

import React from "react";
import { APP_NAME } from "@/lib/constants";
import { SettingSection } from "@/components/dashboard/settings";
import { LuUser, LuBell, LuLink, LuMessageSquare, LuCircleHelp } from "react-icons/lu";

export default function SettingsPage() {
  const accountItems = [
    {
      title: "My Profile",
      description: "Update your name, photo, and how others see you on the platform.",
      linkText: "Edit Details",
      href: "/dashboard/settings/profile",
      icon: LuUser,
    },
  ];

  const workspaceItems = [
    {
      title: "Reminders",
      description: "Set up automatic alerts for your deals, invoices, and deadlines.",
      linkText: "Manage",
      href: "/dashboard/settings/reminders",
      icon: LuBell,
    },
    // {
    //   title: "Integrations",
    //   description: `Connect ${APP_NAME} with apps like Slack, Google, and your bank.`,
    //   linkText: "Connect",
    //   href: "/dashboard/settings/integrations",
    //   icon: LuLink,
    // },
  ];

  const generalItems = [
    // {
    //   title: "Send Feedback",
    //   description: "Tell us what you like, report a bug, or suggest a new feature.",
    //   linkText: "Share",
    //   href: "/dashboard/settings/feedback",
    //   icon: LuMessageSquare,
    // },
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
          Manage your account, notifications, and workspace preferences for {APP_NAME}.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        <SettingSection title="Account" items={accountItems} />
        <SettingSection title="Workspace" items={workspaceItems} />
        <SettingSection title="General" items={generalItems} />
      </div>

      <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 font-medium tracking-wide">
          {APP_NAME} v1.0.4
        </p>
      </div>
    </div>
  );
}
