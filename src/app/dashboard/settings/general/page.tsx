"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LuArrowLeft, LuGlobe, LuCoins, LuSave } from "react-icons/lu";
import { LoadingSpinner } from "@/components/common";
import { useProfile, useUpdateGeneralSettings } from "@/hooks/useProfile";

export default function GeneralSettingsPage() {
  const { data: user, isLoading } = useProfile();
  const updateMutation = useUpdateGeneralSettings();

  const [timezone, setTimezone] = useState("UTC");
  const [baseCurrency, setBaseCurrency] = useState("USD");

  useEffect(() => {
    if (user) {
      if (user.settings?.timezone) setTimezone(user.settings.timezone);
      if (user.settings?.baseCurrency) setBaseCurrency(user.settings.baseCurrency);
    }
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ timezone, baseCurrency });
  };

  const currencies = [
    { code: "USD", symbol: "$", label: "USD ($) - US Dollar" },
    { code: "INR", symbol: "₹", label: "INR (₹) - Indian Rupee" },
    { code: "EUR", symbol: "€", label: "EUR (€) - Euro" },
    { code: "GBP", symbol: "£", label: "GBP (£) - British Pound" },
    { code: "CAD", symbol: "C$", label: "CAD (C$) - Canadian Dollar" },
    { code: "AUD", symbol: "A$", label: "AUD (A$) - Australian Dollar" },
  ];

  const timezones = [
    "UTC",
    "Asia/Kolkata",
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Dubai",
    "Australia/Sydney",
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <Link 
          href="/dashboard/settings"
          className="group flex items-center gap-2 text-gray-400 hover:text-brand-500 transition-colors"
        >
          <div className="p-2 rounded-full border border-gray-200 dark:border-gray-800 group-hover:border-brand-500/50 group-hover:bg-brand-500/5 transition-all">
            <LuArrowLeft size={16} strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest ml-1">Back to Settings</span>
        </Link>
        
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            General Settings
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            Configure your account's default currency, timezone, and regional preferences.
          </p>
        </div>
      </div>

      {/* Settings Form Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-8">
        {/* Base Currency Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <LuCoins className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Base Currency
              </h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Default currency used across dashboard analytics and financial reports (default USD $)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                type="button"
                onClick={() => setBaseCurrency(curr.code)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  baseCurrency === curr.code
                    ? "bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 shadow-sm"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold w-7 text-center">{curr.symbol}</span>
                  <div>
                    <p className="text-sm font-bold">{curr.code}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{curr.label.split("-")[1]?.trim()}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-800" />

        {/* Timezone Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500">
              <LuGlobe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Timezone
              </h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Used to schedule reminders, milestone notifications, and invoice due dates
              </p>
            </div>
          </div>

          <div className="max-w-md pt-2">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-all shadow-md disabled:opacity-50 active:scale-95"
          >
            <LuSave className="h-4 w-4" />
            {updateMutation.isPending ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}
