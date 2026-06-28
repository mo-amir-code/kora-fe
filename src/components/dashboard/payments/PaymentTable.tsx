import React from 'react';
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

  const statusStyles = {
    PAID: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
    OVERDUE: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-100 dark:border-rose-500/20',
  };

  const typeStyles = {
    INVOICE: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-100 dark:border-blue-500/20',
    PAYMENT_EVENT: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-100 dark:border-purple-500/20',
  };

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No payments found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Brand & Deal</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Due Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {payments.map((item) => (
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
                        {item.brandName}
                      </span>
                      <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 truncate max-w-[200px]">
                        {item.dealTitle}
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
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${typeStyles[item.type]}`}>
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
                    href={item.type === 'INVOICE' ? `/dashboard/invoices/${item.sourceId}` : `/dashboard/deals/${item.sourceId}`}
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
    </div>
  );
};
