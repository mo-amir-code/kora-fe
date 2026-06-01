import React from "react";
import { InvoiceForm } from "@/components/dashboard/invoices";

const CreateInvoicePage = () => {
  return (
    <div className="p-4 sm:p-10 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <InvoiceForm mode="create" />
    </div>
  );
};

export default CreateInvoicePage;
