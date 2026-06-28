"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PublicPageLayout } from "@/components/common";
import { APP_NAME } from "@/lib/constants";
import { LuSearch, LuChevronDown, LuCircleHelp, LuMessageSquare } from "react-icons/lu";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true });

  const categories = ["All", "General", "Invoices & Billing", "WhatsApp Reminders", "Security"];

  const faqData = [
    {
      id: 0,
      category: "General",
      question: `What exactly is ${APP_NAME} and who is it for?`,
      answer: `${APP_NAME} is an all-in-one sponsorship and deal management OS designed specifically for digital content creators, influencers, and boutique talent agencies. It helps creators track deliverables, automate invoice collections, and maintain professional brand partnerships.`,
    },
    {
      id: 1,
      category: "WhatsApp Reminders",
      question: "How do automated WhatsApp reminders work?",
      answer: `When an invoice reaches its due date (or becomes overdue), ${APP_NAME} automatically sends a polite, professional WhatsApp reminder to your designated brand contact. You don't have to awkwardly follow up in Instagram DMs or email threads yourself!`,
    },
    {
      id: 2,
      category: "Invoices & Billing",
      question: "Can I generate GST-compliant or custom tax invoices?",
      answer: `Yes! ${APP_NAME} allows you to configure GST/VAT rates, add custom business registration numbers, pre-fill campaign line items, and export high-resolution branded PDF invoices with one click.`,
    },
    {
      id: 3,
      category: "General",
      question: "How many brand deals can I manage simultaneously?",
      answer: `The Starter plan supports up to 3 active deals at a time. The Pro Creator and Agency plans allow you to track an unlimited number of active sponsorships, draft deliverables, and historical records.`,
    },
    {
      id: 4,
      category: "Security",
      question: "Is my financial and deal data secure on Kora?",
      answer: `Absolutely. We use enterprise-grade encryption (256-bit SSL/TLS) for data in transit and at rest. Your contract details, brand contact information, and revenue metrics are strictly private to your account.`,
    },
    {
      id: 5,
      category: "Invoices & Billing",
      question: "Does Kora take a commission from my sponsorship earnings?",
      answer: "No, never. Kora operates on a simple flat subscription model. We take zero percentage cut or commission from your deal revenue.",
    },
    {
      id: 6,
      category: "WhatsApp Reminders",
      question: "Can I customize the text in automated payment reminders?",
      answer: "Yes! Pro Creator and Agency users can customize reminder templates, adjust grace periods, and schedule when automated follow-up messages trigger.",
    },
    {
      id: 7,
      category: "Security",
      question: "Can I invite my manager or agency assistant to my workspace?",
      answer: "Yes, our Agency & Studio plan includes multi-seat team access so your managers, accountants, or assistants can collaborate seamlessly.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <PublicPageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-20 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Help Center
          </div>
          <h1 className="text-2xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto px-2">
            Everything you need to know about {APP_NAME}, deal tracking, automated reminders, and invoicing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                  : "bg-slate-100 dark:bg-gray-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 sm:py-12 space-y-3 p-6 sm:p-8 rounded-2xl border border-dashed border-slate-300 dark:border-gray-800">
              <LuCircleHelp className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                No matching questions found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                Try searching with different keywords or browse our category filters above.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-gray-900/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left font-bold text-slate-900 dark:text-white text-sm sm:text-lg hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <LuChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-brand-500" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-white/5 pt-3 sm:pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Support Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-500/10 to-amber-500/10 border border-brand-500/20 text-center space-y-3 sm:space-y-4">
          <LuMessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-brand-500 mx-auto" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Still have questions?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Please reach out to our friendly support team.
          </p>
          <div className="pt-1 sm:pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/20 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
}
