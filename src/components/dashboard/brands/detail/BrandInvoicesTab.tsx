import { LuArrowUpRight, LuFileText } from "react-icons/lu";
import InvoiceStatusBadge, { InvoiceStatus } from "@/components/dashboard/invoices/InvoiceStatusBadge";
import Link from "next/link";

export interface BrandInvoice {
  id: string;
  dbId: string;
  dateIssued: string;
  amount: string;
  status: InvoiceStatus;
}

interface BrandInvoicesTabProps {
  invoices: BrandInvoice[];
}

const BrandInvoicesTab = ({ invoices }: BrandInvoicesTabProps) => {
  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <LuFileText size={24} className="text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">No invoices yet</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
          Invoices for this brand will appear here once you create a deal and generate an invoice.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop: Table view */}
      <div className="hidden sm:block w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-3">
                Invoice ID
              </th>
              <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-3">
                Date Issued
              </th>
              <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-3">
                Amount
              </th>
              <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-3">
                Status
              </th>
              <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-3 text-right">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="group hover:bg-gray-50/50 dark:hover:bg-white/2 transition-all"
              >
                <td className="py-4 px-3">
                  <span className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                    {invoice.id}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {invoice.dateIssued}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <span className="text-sm font-black text-gray-900 dark:text-white">
                    {invoice.amount}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>
                <td className="py-4 px-3 text-right">
                  <Link 
                    href={`/dashboard/invoices/edit/${invoice.dbId}`}
                    className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all group/link"
                  >
                    <LuArrowUpRight size={18} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card view */}
      <div className="sm:hidden space-y-3">
        {invoices.map((invoice) => (
          <Link 
            key={invoice.id} 
            href={`/dashboard/invoices/edit/${invoice.dbId}`}
            className="block p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 active:scale-95 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 mb-0.5 uppercase tracking-tighter">
                  {invoice.id}
                </p>
                <p className="text-sm font-black text-gray-900 dark:text-white">
                  {invoice.amount}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <InvoiceStatusBadge status={invoice.status} />
                <LuArrowUpRight size={16} className="text-gray-300" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Issued {invoice.dateIssued}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandInvoicesTab;
