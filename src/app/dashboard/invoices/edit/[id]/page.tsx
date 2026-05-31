"use client";

import React from "react";
import InvoiceForm from "@/components/dashboard/invoices/InvoiceForm";
import { useParams } from "next/navigation";

const EditInvoicePage = () => {
  const params = useParams();
  const id = params?.id as string;

  // Mock fetching data based on ID
  const mockInitialData = {
    invoiceNumber: id || "INV-2023-089",
    deal: "TechBrand Q3 Sponsorship (Deliverable 2/2)",
    lineItems: [
      { id: "1", description: "Dedicated YouTube Integration (10-15 mins)", qty: 1, rate: 150000, amount: 150000 }
    ],
    applyGst: true
  };

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <InvoiceForm mode="edit" initialData={mockInitialData} />
    </div>
  );
};

export default EditInvoicePage;
