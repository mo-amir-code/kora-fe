"use client";

import React, { useState, useEffect, useRef } from "react";
import { LuPlus, LuCalendar, LuChevronDown } from "react-icons/lu";
import { LoadingSpinner } from "@/components/common";
import { InvoiceTable } from "@/components/dashboard/invoices";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useInvoicesList } from "@/hooks/useInvoices";
import { format } from "date-fns";
import Link from "next/link";

const InvoicesPage = () => {
  const { data: realInvoices, isLoading } = useInvoicesList();
  const [filter, setFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const flatpickrRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (inputRef.current && buttonRef.current) {
      flatpickrRef.current = flatpickr(inputRef.current, {
        mode: "range",
        dateFormat: "M d",
        positionElement: buttonRef.current,
        onChange: (selectedDates) => {
          if (selectedDates.length === 2) {
            setDateRange(selectedDates);
          } else if (selectedDates.length === 0) {
            setDateRange([]);
          }
        },
      });
    }
    return () => {
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
      }
    };
  }, []);

  const handleClearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (flatpickrRef.current) {
      flatpickrRef.current.clear();
    }
    setDateRange([]);
  };

  const openPicker = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.open();
    }
  };

  const filteredInvoices = (realInvoices || []).filter(inv => {
    const statusMatch = filter === "All" || inv.status.toLowerCase() === filter.toLowerCase();

    let dateMatch = true;
    if (dateRange.length === 2) {
      const start = new Date(dateRange[0]);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dateRange[1]);
      end.setHours(23, 59, 59, 999);
      const issuedDate = new Date(inv.issuedDate);
      dateMatch = issuedDate >= start && issuedDate <= end;
    }

    return statusMatch && dateMatch;
  });

  const getRangeLabel = () => {
    if (dateRange.length === 2) {
      return `${format(dateRange[0], "MMM dd")} - ${format(dateRange[1], "MMM dd")}`;
    }
    return "Date Range";
  };

  if (isLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="p-4 sm:p-10 space-y-8 min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="relative group">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none pl-6 pr-12 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:border-brand-500/50 hover:text-brand-500 transition-all focus:outline-none cursor-pointer shadow-sm"
          >
            {["All", "Sent", "Draft", "Viewed", "Partially Paid", "Paid", "Overdue", "Void", "Cancelled"].map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <LuChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-brand-500 transition-colors" size={14} />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <input ref={inputRef} className="hidden" />
            <button
              ref={buttonRef}
              onClick={openPicker}
              className={`
                flex items-center gap-2 px-6 py-3.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all active:scale-95
                ${dateRange.length === 2
                  ? "bg-brand-500 text-white border-transparent shadow-lg shadow-brand-500/20"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-brand-500/50 hover:text-brand-500"}
              `}
            >
              <LuCalendar size={16} />
              {getRangeLabel()}
            </button>
            {dateRange.length === 2 && (
              <button
                onClick={handleClearDates}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-[10px] shadow-lg hover:scale-110 transition-transform z-10"
                title="Clear Date Range"
              >
                ×
              </button>
            )}
          </div>
          <Link href="/dashboard/invoices/create">
            <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black shadow-xl transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest group">
              <LuPlus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
              New Invoice
            </button>
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-4 sm:p-8 shadow-2xl shadow-black/5 overflow-hidden">
        <InvoiceTable invoices={filteredInvoices} />

        {/* Pagination Placeholder */}
        <div className="mt-10 pt-8 border-t border-gray-50 dark:border-white/[0.03] flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
            Showing 1-{filteredInvoices.length} of {filteredInvoices.length} Invoices
          </p>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${p === 1 ? 'bg-gray-900 dark:bg-brand-500 text-white' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;