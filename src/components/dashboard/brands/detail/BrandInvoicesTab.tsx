import { LuDownload, LuMail, LuEllipsisVertical } from "react-icons/lu";
import InvoiceStatusBadge, { InvoiceStatus } from "@/components/dashboard/invoices/InvoiceStatusBadge";

export interface BrandInvoice {
  id: string;
  dateIssued: string;
  description: string;
  amount: string;
  status: InvoiceStatus;
}

interface BrandInvoicesTabProps {
  invoices: BrandInvoice[];
}

const BrandInvoicesTab = ({ invoices }: BrandInvoicesTabProps) => {
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
                Description
              </th>
              <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-3">
                Amount
              </th>
              <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-3">
                Status
              </th>
              <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-3 text-center">
                Actions
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
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    {invoice.id}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {invoice.dateIssued}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {invoice.description}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {invoice.amount}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center justify-center">
                    {invoice.status === "Paid" ? (
                      <button className="p-2 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all">
                        <LuDownload size={16} />
                      </button>
                    ) : invoice.status === "Overdue" ? (
                      <button className="p-2 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all">
                        <LuMail size={16} />
                      </button>
                    ) : (
                      <button className="p-2 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all">
                        <LuEllipsisVertical size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card view */}
      <div className="sm:hidden space-y-3">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-0.5">
                  {invoice.id}
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {invoice.description}
                </p>
              </div>
              <InvoiceStatusBadge status={invoice.status} />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {invoice.dateIssued}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {invoice.amount}
                </span>
              </div>
              {invoice.status === "Paid" ? (
                <button className="p-2 rounded-lg text-gray-400 hover:text-brand-500 transition-all">
                  <LuDownload size={16} />
                </button>
              ) : invoice.status === "Overdue" ? (
                <button className="p-2 rounded-lg text-gray-400 hover:text-brand-500 transition-all">
                  <LuMail size={16} />
                </button>
              ) : (
                <button className="p-2 rounded-lg text-gray-400 hover:text-brand-500 transition-all">
                  <LuEllipsisVertical size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandInvoicesTab;
