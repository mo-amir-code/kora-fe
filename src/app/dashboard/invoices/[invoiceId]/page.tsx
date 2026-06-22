'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LuArrowLeft, LuDownload, LuPencil, LuTrash2, LuCalendar, LuUser, LuBriefcase } from 'react-icons/lu';
import { useInvoiceDetail, useDeleteInvoice } from '@/hooks/useInvoices';
import { useProfile } from '@/hooks/useProfile';
import InvoiceStatusBadge from '@/components/dashboard/invoices/InvoiceStatusBadge';
import Image from 'next/image';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import { formatInvoiceCurrency, formatInvoiceDate, generateInvoicePDF } from "@/components/dashboard/invoices/invoice-utils";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export default function InvoiceViewPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.invoiceId as string;

  const { data: invoice, isLoading, isError } = useInvoiceDetail(invoiceId);
  const { data: profile } = useProfile();
  const deleteInvoice = useDeleteInvoice();

  const downloadPDF = async () => {
    if (!invoice) return;
    await generateInvoicePDF("invoice-pdf-preview", invoice.invoiceNumber);
  };

  const formatMoney = formatInvoiceCurrency;
  const formatDate = formatInvoiceDate;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-white/10 border-t-gray-900 dark:border-t-white" />
      </div>
    );
  }

  if (isError || !invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500 dark:text-gray-400 font-medium">Invoice not found or failed to load.</p>
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white"
        >
          <LuArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    );
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      await deleteInvoice.mutateAsync(invoiceId);
      router.push('/dashboard/invoices');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 flex flex-col gap-8">
      {/* Header / Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest"
          >
            <LuArrowLeft className="h-3.5 w-3.5" />
            Back to Invoices
          </button>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {invoice.invoiceNumber}
            </h1>
            <InvoiceStatusBadge status={capitalize(invoice.status) as any} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={downloadPDF}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95" 
            title="Download PDF"
          >
            <LuDownload className="h-5 w-5" />
          </button>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-800 mx-2 hidden sm:block" />
          <button 
            onClick={() => router.push(`/dashboard/invoices/edit/${invoiceId}`)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-sm font-bold text-white dark:text-gray-900 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none"
          >
            <LuPencil className="h-4 w-4" />
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/30 bg-white dark:bg-gray-900 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-95"
            title="Delete Invoice"
          >
            <LuTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Invoice Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
            <div className="flex flex-col gap-10">
              {/* Brand & Deal Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center relative overflow-hidden">
                    {invoice.deal.brand.logoUrl ? (
                      <Image src={invoice.deal.brand.logoUrl} alt={invoice.deal.brand.name} fill className="object-contain p-2" />
                    ) : (
                      <span className="text-xl font-bold text-gray-400 uppercase">{invoice.deal.brand.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Billed To</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{invoice.deal.brand.name}</h3>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{invoice.deal.title}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:text-right">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Issued On</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{formatDate(invoice.issuedDate)}</span>
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-2">Due By</span>
                  <span className="text-sm font-bold text-rose-500">{formatDate(invoice.dueDate)}</span>
                </div>
              </div>

              {/* Line Items */}
              <div className="flex flex-col gap-6">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Service Details</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Description</th>
                        <th className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">Qty</th>
                        <th className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">Unit Price</th>
                        <th className="py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {invoice.lineItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-6 min-w-[200px]">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{item.description}</span>
                          </td>
                          <td className="py-6 px-4 text-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.quantity}</span>
                          </td>
                          <td className="py-6 px-4 text-right">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">₹{item.unitPrice.toLocaleString('en-IN')}</span>
                          </td>
                          <td className="py-6 text-right">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">₹{item.amount.toLocaleString('en-IN')}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Section */}
              <div className="flex flex-col items-end gap-4 pt-10 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between w-full sm:w-64">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">₹{invoice.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {invoice.gstAmount && invoice.gstAmount > 0 && (
                  <div className="flex items-center justify-between w-full sm:w-64">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">GST ({invoice.gstRate}%)</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹{invoice.gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex items-center justify-between w-full sm:w-64 p-4 rounded-2xl bg-gray-900 dark:bg-white mt-4">
                  <span className="text-sm font-bold text-white dark:text-gray-900">Total Amount</span>
                  <span className="text-xl font-bold text-white dark:text-gray-900 uppercase">₹{invoice.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/30 flex flex-col gap-6">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Metadata</h4>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500">
                  <LuBriefcase className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight">Deal Context</span>
                  <button 
                    onClick={() => router.push(`/dashboard/deals/${invoice.dealId}`)}
                    className="text-xs font-bold text-gray-900 dark:text-white hover:underline text-left"
                  >
                    {invoice.deal.title}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500">
                  <LuCalendar className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight">Payment Deadline</span>
                  <span className="text-xs font-bold text-rose-500">{formatDate(invoice.dueDate)}</span>
                </div>
              </div>
            </div>

            {invoice.notes && (
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight">Notes</span>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                  "{invoice.notes}"
                </p>
              </div>
            )}
          </div>

          <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <LuUser className="h-5 w-5 opacity-70" />
              <h5 className="font-bold text-sm">Quick Actions</h5>
            </div>
            <p className="text-xs opacity-70 leading-relaxed">
              Need to follow up with {invoice.deal.brand.name}? You can send a reminder using your message templates.
            </p>
            <button className="w-full py-2.5 rounded-xl bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-900/20 text-xs font-bold hover:bg-white/20 dark:hover:bg-gray-900/20 transition-all uppercase tracking-widest">
              Send Reminder
            </button>
          </div>
        </div>
      </div>

      {/* Hidden PDF Preview - Ported from InvoiceForm */}
      <div
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          width: "820px",
          background: "linear-gradient(140deg, #eef2ff 0%, #f5f3ff 100%)",
          padding: "14px",
          zIndex: -1
        }}
      >
        <div
          id="invoice-pdf-preview"
          style={{
            width: "792px",
            minHeight: "1120px",
            background: "#ffffff",
            border: "1px solid #dbe4ff",
            borderRadius: "18px",
            padding: "26px",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            color: "#102a43",
            boxSizing: "border-box",
            boxShadow: "0 22px 48px rgba(37, 99, 235, 0.12)"
          }}
        >
          <div style={{ height: "6px", width: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 55%, #2563eb 100%)", marginBottom: "18px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #e6ecff", paddingBottom: "16px" }}>
            <div>
              <p style={{ margin: 0, fontSize: "34px", fontWeight: 900, letterSpacing: "0.08em", color: "#1d4ed8" }}>KORA</p>
              <p style={{ margin: "4px 0 0", fontSize: "11px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "#64748b" }}>
                Digital Content Creator Invoice
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: "34px", fontWeight: 900, color: "#0f172a", letterSpacing: "0.01em" }}>INVOICE</p>
              <p style={{ margin: "2px 0 10px", fontSize: "22px", fontWeight: 900, color: "#4f46e5" }}>#{invoice.invoiceNumber}</p>
              <p style={{ margin: 0, fontSize: "12px", color: "#475569" }}>Date: {formatDate(invoice.issuedDate)}</p>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#475569" }}>Due: {formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8faff", border: "1px solid #e2e8ff", borderRadius: "12px", padding: "10px 12px" }}>
            <p style={{ margin: 0, fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>Billed For</p>
            <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{invoice.deal.brand.name}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "18px" }}>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>From</p>
              <p style={{ margin: 0, fontSize: "29px", fontWeight: 800, color: "#0f172a" }}>{profile?.invoiceSettings?.legalName || profile?.fullName || ""}</p>
              <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#334155" }}>{profile?.invoiceSettings?.upiId || ""}</p>
              <p style={{ margin: "2px 0 0", fontSize: "14px", color: "#334155" }}>A/C: {profile?.invoiceSettings?.accountNo || ""}</p>
              <p style={{ margin: "2px 0 0", fontSize: "14px", color: "#334155" }}>IFSC: {profile?.invoiceSettings?.ifsc || ""}</p>
            </div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>Bill To</p>
              <p style={{ margin: 0, fontSize: "29px", fontWeight: 800, color: "#0f172a" }}>{invoice.deal.brand.name}</p>
              <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#334155" }}>{(invoice.deal.brand as any).email || ""}</p>
              <p style={{ margin: "2px 0 0", fontSize: "14px", color: "#334155" }}>GSTIN: {(invoice.deal.brand as any).gstin || "NA"}</p>
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#64748b" }}>Payment Terms: Net Due by {formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "4.6fr 0.9fr 1.5fr 1.7fr", gap: "8px", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 900, textTransform: "uppercase", color: "#334155", letterSpacing: "0.07em" }}>Description</p>
              <p style={{ margin: 0, textAlign: "center", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", color: "#334155", letterSpacing: "0.07em" }}>Qty</p>
              <p style={{ margin: 0, textAlign: "right", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", color: "#334155", letterSpacing: "0.07em" }}>Rate</p>
              <p style={{ margin: 0, textAlign: "right", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", color: "#334155", letterSpacing: "0.07em" }}>Amount</p>
            </div>

            {invoice.lineItems.map((item, index) => (
              <div key={item.id} style={{ display: "grid", gridTemplateColumns: "4.6fr 0.9fr 1.5fr 1.7fr", gap: "8px", padding: "14px 8px", borderBottom: "1px solid #eef2f7", borderRadius: "10px", background: index % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>{item.description || "Service Item"}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>{invoice.deal.brand.name}</p>
                </div>
                <p style={{ margin: 0, textAlign: "center", fontSize: "16px", color: "#1e293b" }}>{item.quantity}</p>
                <p style={{ margin: 0, textAlign: "right", fontSize: "16px", color: "#1e293b" }}>{formatMoney(Number(item.unitPrice))}</p>
                <p style={{ margin: 0, textAlign: "right", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>{formatMoney(item.amount)}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "36px" }}>
            <div style={{ width: "330px", border: "1px solid #dbe4ff", borderRadius: "16px", background: "#f8faff", padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "9px" }}>
                <span style={{ fontSize: "16px", color: "#334155" }}>Subtotal</span>
                <span style={{ fontSize: "16px", color: "#0f172a", fontWeight: 700 }}>{formatMoney(invoice.subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "16px", color: "#334155" }}>GST ({invoice.gstRate}%)</span>
                <span style={{ fontSize: "16px", color: "#0f172a", fontWeight: 700 }}>{formatMoney(invoice.gstAmount || 0)}</span>
              </div>
              <div style={{ borderTop: "2px solid #c7d2fe", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <span style={{ fontSize: "30px", fontWeight: 900, color: "#0f172a" }}>Total</span>
                <span style={{ fontSize: "42px", fontWeight: 900, color: "#4338ca", lineHeight: 1 }}>{formatMoney(invoice.total)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "52px", borderTop: "1px dashed #d5ddf0", paddingTop: "14px" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textAlign: "center" }}>Thank you for your partnership. Please clear this invoice by due date.</p>
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>Payment via bank transfer • Ref: {invoice.invoiceNumber}</p>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#6366f1", letterSpacing: "0.06em" }}>KORA FINANCE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
