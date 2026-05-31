"use client";

import React, { useState, useEffect, useRef } from "react";
import { LuPlus, LuCalendar } from "react-icons/lu";
import InvoiceTable, { Invoice } from "@/components/dashboard/invoices/InvoiceTable";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { isWithinInterval } from "date-fns";

const DUMMY_INVOICES: (Invoice & { rawDate: Date })[] = [
  {
    id: "#INV-2023-089",
    brand: { name: "Samsung Mobile India" },
    timeline: { label: "Issued", date: "Oct 12", subLabel: "Due", subDate: "Nov 12", isOverdue: true },
    amount: "₹14,20,500",
    status: "Overdue",
    rawDate: new Date(2023, 9, 12)
  },
  {
    id: "#INV-2023-092",
    brand: { name: "Nike Running" },
    timeline: { label: "Issued", date: "Nov 02", subLabel: "Due", subDate: "Dec 02" },
    amount: "₹2,75,000",
    status: "Sent",
    rawDate: new Date(2023, 10, 2)
  },
  {
    id: "#INV-2023-085",
    brand: { name: "L'Oréal Paris" },
    timeline: { label: "Issued", date: "Oct 28", subLabel: "Paid", subDate: "Nov 05", isPaid: true },
    amount: "₹6,20,000",
    status: "Paid",
    rawDate: new Date(2023, 9, 28)
  },
  {
    id: "#INV-2023-095",
    brand: { name: "Skillshare Inc." },
    timeline: { label: "Created", date: "Nov 10", subLabel: "Not Sent" },
    amount: "₹1,10,000",
    status: "Draft",
    rawDate: new Date(2023, 10, 10)
  },
  {
    id: "#INV-2023-094",
    brand: { name: "Microsoft India" },
    timeline: { label: "Issued", date: "Nov 08", subLabel: "Due", subDate: "Dec 08" },
    amount: "₹8,50,000",
    status: "Sent",
    rawDate: new Date(2023, 10, 8)
  }
];

import Link from "next/link";

const InvoicesPage = () => {
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
          // Flatten range: only update state when 2 dates are selected
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

  const filteredInvoices = DUMMY_INVOICES.filter(inv => {
    const statusMatch = filter === "All" || inv.status === filter;
    let dateMatch = true;
    if (dateRange.length === 2) {
      const start = new Date(dateRange[0]);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dateRange[1]);
      end.setHours(23, 59, 59, 999);
      const current = new Date(inv.rawDate);
      dateMatch = current >= start && current <= end;
    }
    return statusMatch && dateMatch;
  });

  const getRangeLabel = () => {
    if (dateRange.length === 2) {
      return `${dateRange[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${dateRange[1].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    return "Date Range";
  };

  return (
    <div className="p-4 sm:p-10 space-y-8 min-h-screen bg-white dark:bg-gray-900 transition-colors animate-in fade-in duration-700">
      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          {["All", "Sent", "Draft", "Paid", "Overdue"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 border
                ${filter === f 
                  ? "bg-gray-900 dark:bg-brand-500 text-white border-transparent shadow-lg shadow-brand-500/10 scale-105" 
                  : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"}
              `}
            >
              {f}
            </button>
          ))}
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