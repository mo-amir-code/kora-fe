"use client";

import React from "react";
import { InvoiceForm } from "@/components/dashboard/invoices";
import { useParams } from "next/navigation";
import { useInvoiceDetail } from "@/hooks/useInvoices";

const EditInvoicePage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data: invoice, isLoading, error } = useInvoiceDetail(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Invoice not found</h2>
          <p className="mt-2 text-sm font-medium text-slate-500">The invoice you are trying to edit does not exist or you do not have permission to view it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <InvoiceForm mode="edit" initialData={invoice} />
    </div>
  );
};

export default EditInvoicePage;
