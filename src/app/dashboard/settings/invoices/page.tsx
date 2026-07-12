"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LuArrowLeft, LuFileText, LuCreditCard, LuBuilding, LuImage, LuSave, LuLock } from "react-icons/lu";
import { LoadingSpinner } from "@/components/common";
import { useProfile, useUpdateInvoiceSettings } from "@/hooks/useProfile";
import { useSubscriptionStore } from "@/stores/subscription/subscription";

export default function InvoiceSettingsPage() {
  const { data: user, isLoading } = useProfile();
  const updateMutation = useUpdateInvoiceSettings();
  const plan = useSubscriptionStore((state) => state.plan);
  const isFree = plan !== "PRO";

  const [invoicePrefix, setInvoicePrefix] = useState("INV-");
  const [nextInvoiceNum, setNextInvoiceNum] = useState<number>(1);
  const [gstin, setGstin] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [footerText, setFooterText] = useState("");

  useEffect(() => {
    if (user?.invoiceSettings) {
      const inv = user.invoiceSettings;
      if (inv.invoicePrefix !== undefined && inv.invoicePrefix !== null) setInvoicePrefix(inv.invoicePrefix);
      if (inv.nextInvoiceNum !== undefined && inv.nextInvoiceNum !== null) setNextInvoiceNum(inv.nextInvoiceNum);
      if (inv.gstin) setGstin(inv.gstin);
      if (inv.upiId) setUpiId(inv.upiId);
      if (inv.bankIfsc) setBankIfsc(inv.bankIfsc);
      if (inv.bankAccount) setBankAccount(inv.bankAccount);
      if (inv.logoUrl) setLogoUrl(inv.logoUrl);
      if (inv.footerText) setFooterText(inv.footerText);
    }
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      invoicePrefix: isFree ? "INV-" : invoicePrefix,
      nextInvoiceNum: Number(nextInvoiceNum),
      gstin: gstin || undefined,
      upiId: upiId || undefined,
      bankIfsc: bankIfsc || undefined,
      bankAccount: bankAccount || undefined,
      logoUrl: isFree ? undefined : (logoUrl || undefined),
      footerText: footerText || undefined,
    });
  };

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
            Invoice Settings
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            Customize your invoice formatting, tax credentials (GSTIN), payment details, and branding.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-8">
        {/* Section 1: Invoice Numbering & Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500">
              <LuFileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Invoice Sequence & Branding
              </h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Define invoice prefix, starting number, and brand logo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Invoice Prefix
                </label>
                {isFree && (
                  <span className="text-[10px] font-bold text-brand-500 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <LuLock size={10} /> Pro Only
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="e.g. INV-"
                value={isFree ? "INV-" : invoicePrefix}
                onChange={(e) => setInvoicePrefix(e.target.value)}
                disabled={isFree}
                className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                  isFree ? "opacity-60 cursor-not-allowed bg-slate-50 dark:bg-gray-900/30" : ""
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Next Invoice Number
              </label>
              <input
                type="number"
                value={nextInvoiceNum}
                onChange={(e) => setNextInvoiceNum(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Logo URL (Appears on PDF Invoices)
              </label>
              {isFree && (
                <span className="text-[10px] font-bold text-brand-500 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <LuLock size={10} /> Pro Only
                </span>
              )}
            </div>
            <div className="relative">
              <LuImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="url"
                placeholder={isFree ? "Upgrade to Pro to upload custom logo" : "https://example.com/logo.png"}
                value={isFree ? "" : logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                disabled={isFree}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                  isFree ? "opacity-60 cursor-not-allowed bg-slate-50 dark:bg-gray-900/30" : ""
                }`}
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-800" />

        {/* Section 2: Tax Credentials */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
              <LuBuilding className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Tax & Legal Details
              </h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Your registered GSTIN number for tax calculation
              </p>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              GSTIN (GST Identification Number)
            </label>
            <input
              type="text"
              placeholder="e.g. 22AAAAA0000A1Z5"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all uppercase tracking-wider"
            />
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-800" />

        {/* Section 3: Payment Collection Accounts */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <LuCreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Payment Collection Details
              </h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Bank account and UPI details printed on invoices for brand clearance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="e.g. name@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Bank Account #
              </label>
              <input
                type="text"
                placeholder="Account number"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Bank IFSC Code
              </label>
              <input
                type="text"
                placeholder="e.g. HDFC0001234"
                value={bankIfsc}
                onChange={(e) => setBankIfsc(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all uppercase tracking-wider"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-800" />

        {/* Section 4: Footer Note / Terms */}
        <div className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Default Footer Text / Payment Terms
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Thank you for working with us! Please make payments within 15 days of invoice date."
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-all shadow-md disabled:opacity-50 active:scale-95"
          >
            <LuSave className="h-4 w-4" />
            {updateMutation.isPending ? "Saving..." : "Save Invoice Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
