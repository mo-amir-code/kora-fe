import React from "react";
import { LuPencil } from "react-icons/lu";
import InvoiceStatusBadge, { InvoiceStatus } from "./InvoiceStatusBadge";
import Link from "next/link";

export interface Invoice {
  id: string;
  brand: {
    name: string;
    logo?: string;
  };
  timeline: {
    label: string;
    date: string;
    subLabel?: string;
    subDate?: string;
    isPaid?: boolean;
    isOverdue?: boolean;
  };
  amount: string;
  status: InvoiceStatus;
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable = ({ invoices }: InvoiceTableProps) => {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar -mx-4 sm:mx-0">
      <div className="min-w-[800px] sm:min-w-full px-4 sm:px-0">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4">Invoice ID</th>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4">Brand</th>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4">Timeline</th>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4">Amount</th>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4">Status</th>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/[0.03]">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-all duration-300">
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <span className="text-[11px] sm:text-sm font-black text-gray-400 dark:text-gray-600 group-hover:text-brand-500 transition-colors uppercase tracking-tight whitespace-nowrap">
                    {invoice.id}
                  </span>
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-gray-500 shrink-0">
                      {invoice.brand.logo ? (
                        <img src={invoice.brand.logo} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        invoice.brand.name.substring(0, 1)
                      )}
                    </div>
                    <span className="text-[11px] sm:text-sm font-black text-gray-900 dark:text-white tracking-tight truncate max-w-[100px] sm:max-w-none">
                      {invoice.brand.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <div className="space-y-0.5 sm:space-y-1">
                    <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-gray-200 whitespace-nowrap">
                      {invoice.timeline.label} <span className="text-gray-400 dark:text-gray-500">{invoice.timeline.date}</span>
                    </p>
                    {invoice.timeline.subLabel && (
                      <p className={`text-[8px] sm:text-[10px] font-black uppercase tracking-wider ${invoice.timeline.isPaid ? 'text-emerald-500' : invoice.timeline.isOverdue ? 'text-rose-500' : 'text-gray-400 dark:text-gray-600'}`}>
                        {invoice.timeline.subLabel} {invoice.timeline.subDate}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <span className="text-[11px] sm:text-sm font-black text-gray-900 dark:text-white tracking-tight whitespace-nowrap">
                    {invoice.amount}
                  </span>
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <div className="flex items-center justify-center">
                    <Link href={`/dashboard/invoices/edit/${invoice.id}`}>
                      <button className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all active:scale-90 border border-transparent hover:border-brand-500/20 group/btn">
                        <LuPencil size={14} className="sm:size-4" />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
