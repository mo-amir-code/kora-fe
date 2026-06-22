import React from "react";
import { LuPencil, LuEye, LuDownload } from "react-icons/lu";
import InvoiceStatusBadge from "./InvoiceStatusBadge";
import Link from "next/link";
import { Invoice } from "@/services/invoice.service";
import { useProfile } from "@/hooks/useProfile";
import { formatInvoiceCurrency, formatInvoiceDate, generateInvoicePDF } from "./invoice-utils";
import Image from "next/image";

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable = ({ invoices }: InvoiceTableProps) => {
  const { data: profile } = useProfile();
  const [activeInvoice, setActiveInvoice] = React.useState<Invoice | null>(null);

  const handleDownload = async (invoice: Invoice) => {
    setActiveInvoice(invoice);
    // Give it a tick to render
    setTimeout(async () => {
      await generateInvoicePDF("invoice-table-preview", invoice.invoiceNumber);
      setActiveInvoice(null);
    }, 100);
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar -mx-4 sm:mx-0 pb-4">
      <div className="min-w-[800px] sm:min-w-full px-4 sm:px-0">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4">Invoice #</th>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4">Brand / Deal</th>
              <th className="pb-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-2 sm:px-4">Dates</th>
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
                    {invoice.invoiceNumber}
                  </span>
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-gray-500 shrink-0 relative overflow-hidden">
                      {invoice.deal.brand.logoUrl ? (
                        <Image src={invoice.deal.brand.logoUrl} alt="" fill className="object-cover" />
                      ) : (
                        invoice.deal.brand.name.substring(0, 1)
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] sm:text-sm font-black text-gray-900 dark:text-white tracking-tight truncate">
                        {invoice.deal.brand.name}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter truncate">
                        {invoice.deal.title}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <div className="space-y-0.5 sm:space-y-1">
                    <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-gray-200 whitespace-nowrap">
                      Issued <span className="text-gray-400 dark:text-gray-500">{formatInvoiceDate(invoice.issuedDate)}</span>
                    </p>
                    <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-rose-500">
                      Due {formatInvoiceDate(invoice.dueDate)}
                    </p>
                  </div>
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <span className="text-[11px] sm:text-sm font-black text-gray-900 dark:text-white tracking-tight whitespace-nowrap">
                    {formatInvoiceCurrency(invoice.total)}
                  </span>
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <InvoiceStatusBadge status={invoice.status as any} />
                </td>
                <td className="py-4 sm:py-6 px-2 sm:px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleDownload(invoice)}
                      className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all active:scale-90 border border-transparent hover:border-emerald-500/20 group/btn"
                      title="Download PDF"
                    >
                      <LuDownload size={14} className="sm:size-4" />
                    </button>
                    <Link href={`/dashboard/invoices/${invoice.id}`}>
                      <button className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all active:scale-90 border border-transparent hover:border-emerald-500/20 group/btn">
                        <LuEye size={14} className="sm:size-4" />
                      </button>
                    </Link>
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

      {/* Hidden PDF Preview for Downloads */}
      {activeInvoice && (
        <div
          style={{
            position: "fixed",
            left: "-10000px",
            top: 0,
            width: "820px",
            zIndex: -1
          }}
        >
          <div
            id="invoice-table-preview"
            style={{
              width: "792px",
              minHeight: "1120px",
              background: "#ffffff",
              borderRadius: "18px",
              padding: "26px",
              fontFamily: "Inter, sans-serif",
              color: "#102a43",
              boxSizing: "border-box",
            }}
          >
            <div style={{ height: "6px", width: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)", marginBottom: "18px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #e6ecff", paddingBottom: "16px" }}>
              <div>
                <p style={{ margin: 0, fontSize: "34px", fontWeight: 900, color: "#1d4ed8" }}>KORA</p>
                <p style={{ margin: "4px 0 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#64748b" }}>Invoice</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: "34px", fontWeight: 900, color: "#0f172a" }}>INVOICE</p>
                <p style={{ margin: "2px 0 10px", fontSize: "22px", fontWeight: 900, color: "#4f46e5" }}>#{activeInvoice.invoiceNumber}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#475569" }}>Date: {formatInvoiceDate(activeInvoice.issuedDate)}</p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#475569" }}>Due: {formatInvoiceDate(activeInvoice.dueDate)}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "18px" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 800, color: "#64748b" }}>From</p>
                <p style={{ margin: 0, fontSize: "29px", fontWeight: 800, color: "#0f172a" }}>{profile?.invoiceSettings?.legalName || profile?.fullName || ""}</p>
                <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#334155" }}>{profile?.invoiceSettings?.upiId || ""}</p>
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 800, color: "#64748b" }}>Bill To</p>
                <p style={{ margin: 0, fontSize: "29px", fontWeight: 800, color: "#0f172a" }}>{activeInvoice.deal.brand.name}</p>
                <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#334155" }}>{(activeInvoice.deal.brand as any).email || ""}</p>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "4.6fr 0.9fr 1.5fr 1.7fr", gap: "8px", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>
                <p style={{ fontSize: "12px", fontWeight: 900 }}>Description</p>
                <p style={{ textAlign: "center", fontSize: "12px", fontWeight: 900 }}>Qty</p>
                <p style={{ textAlign: "right", fontSize: "12px", fontWeight: 900 }}>Rate</p>
                <p style={{ textAlign: "right", fontSize: "12px", fontWeight: 900 }}>Amount</p>
              </div>

              {activeInvoice.lineItems.map((item, index) => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "4.6fr 0.9fr 1.5fr 1.7fr", gap: "8px", padding: "14px 8px", borderBottom: "1px solid #eef2f7", background: index % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                  <p style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>{item.description}</p>
                  <p style={{ margin: 0, textAlign: "center", fontSize: "16px" }}>{item.quantity}</p>
                  <p style={{ margin: 0, textAlign: "right", fontSize: "16px" }}>{formatInvoiceCurrency(item.unitPrice)}</p>
                  <p style={{ margin: 0, textAlign: "right", fontSize: "18px", fontWeight: 700 }}>{formatInvoiceCurrency(item.amount)}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "36px" }}>
              <div style={{ width: "330px", border: "1px solid #dbe4ff", borderRadius: "16px", background: "#f8faff", padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "9px" }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>{formatInvoiceCurrency(activeInvoice.subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span>GST ({activeInvoice.gstRate}%)</span>
                  <span style={{ fontWeight: 700 }}>{formatInvoiceCurrency(activeInvoice.gstAmount || 0)}</span>
                </div>
                <div style={{ borderTop: "2px solid #c7d2fe", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <span style={{ fontSize: "30px", fontWeight: 900 }}>Total</span>
                  <span style={{ fontSize: "42px", fontWeight: 900, color: "#4338ca" }}>{formatInvoiceCurrency(activeInvoice.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;
