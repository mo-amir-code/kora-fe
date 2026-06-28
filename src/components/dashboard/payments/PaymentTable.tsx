import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuChevronRight, LuCalendar, LuTag } from 'react-icons/lu';
import { PaymentItem } from '@/services/payment.service';
import { useCurrency } from '@/hooks/useCurrency';

interface PaymentTableProps {
  payments: PaymentItem[];
}

export const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  const { format } = useCurrency();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [payments]);

  const statusStyles = {
    PAID: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
    OVERDUE: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-100 dark:border-rose-500/20',
  };

  const typeStyles = {
    DEAL: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-100 dark:border-blue-500/20',
    PAYMENT_EVENT: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-100 dark:border-purple-500/20',
  };

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No payments found matching your criteria.</p>
      </div>
    );
  }

  const totalItems = payments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = totalItems === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedPayments = payments.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Brand & Deal</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Remaining</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Due Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {paginatedPayments.map((item) => (
              <tr key={item.id} className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden relative">
                      {item.brandLogo ? (
                        <Image src={item.brandLogo} alt={item.brandName} fill className="object-contain p-1.5" />
                      ) : (
                        <span className="text-xs font-bold text-gray-500 uppercase">{item.brandName.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-gray-900 dark:text-white truncate max-w-[200px]">
                        {item.dealTitle}
                      </span>
                      <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 truncate max-w-[200px]">
                        {item.brandName}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {format(item.amount, item.currency)}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                      {item.currency}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  {item.type === 'PAYMENT_EVENT' ? (
                    <span className="text-sm font-medium text-gray-400 dark:text-gray-500">—</span>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {format(item.remaining, item.currency)}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                        {item.currency}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <LuCalendar className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs font-medium">
                      {item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      }) : 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${typeStyles[item.type] || 'bg-gray-100 text-gray-700'}`}>
                    <LuTag className="h-3 w-3" />
                    {item.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${statusStyles[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
                  <Link 
                    href={`/dashboard/deals/${item.sourceId}`}
                    className="inline-flex p-2 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <LuChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (visible on mobile screens) */}
      <div className="block md:hidden divide-y divide-gray-100 dark:divide-gray-800/60">
        {paginatedPayments.map((item) => (
          <div key={item.id} className="p-4 flex flex-col gap-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden relative">
                  {item.brandLogo ? (
                    <Image src={item.brandLogo} alt={item.brandName} fill className="object-contain p-1.5" />
                  ) : (
                    <span className="text-xs font-bold text-gray-500 uppercase">{item.brandName.charAt(0)}</span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
                    {item.dealTitle}
                  </span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 truncate">
                    {item.brandName}
                  </span>
                </div>
              </div>
              <Link 
                href={`/dashboard/deals/${item.sourceId}`}
                className="p-2 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white shrink-0"
              >
                <LuChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Amount</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{format(item.amount, item.currency)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Remaining</span>
                {item.type === 'PAYMENT_EVENT' ? (
                  <span className="text-sm font-medium text-gray-400">—</span>
                ) : (
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{format(item.remaining, item.currency)}</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-50 dark:border-gray-800/40">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider ${typeStyles[item.type] || 'bg-gray-100 text-gray-700'}`}>
                  <LuTag className="h-2.5 w-2.5" />
                  {item.type.replace('_', ' ')}
                </span>
                <span className={`inline-flex px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 shrink-0">
                <LuCalendar className="h-3 w-3 text-gray-400" />
                <span>
                  {item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                  }) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-800/30">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] text-center sm:text-left">
          {totalItems === 0
            ? "Showing 0 Payments"
            : `Showing ${startIndex + 1}-${endIndex} of ${totalItems} Payments`}
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={safePage === 1}
              className="px-2.5 py-1.5 rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors cursor-pointer shrink-0"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors cursor-pointer shrink-0 ${
                  p === safePage
                    ? 'bg-gray-900 dark:bg-brand-500 text-white'
                    : 'text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={safePage === totalPages}
              className="px-2.5 py-1.5 rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors cursor-pointer shrink-0"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
