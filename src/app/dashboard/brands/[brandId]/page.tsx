"use client";

import { useState } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import {
  BrandDetailHeader,
  BrandDetailTabs,
  BrandDealsTab,
  BrandInvoicesTab,
  BrandNotesTab,
  BrandContactsTab,
  BrandSidebar,
} from "@/components/dashboard/brands/detail";
import type { BrandTab } from "@/components/dashboard/brands/detail/BrandDetailTabs";
import type { BrandDeal } from "@/components/dashboard/brands/detail/BrandDealsTab";
import type { BrandInvoice } from "@/components/dashboard/brands/detail/BrandInvoicesTab";
import type { BrandContact } from "@/components/dashboard/brands/detail/BrandContactsTab";

// Mock data — replace with API calls
const mockDeals: BrandDeal[] = [
  {
    id: "1",
    title: "Q3 Tech Review",
    date: "March 2025",
    type: "YouTube Integration",
    amount: "₹45,000",
    status: "paid",
  },
  {
    id: "2",
    title: "iPhone 16 Pro Launch",
    date: "April 2025",
    type: "Instagram Reel + Stories",
    amount: "₹60,000",
    status: "active",
  },
  {
    id: "3",
    title: "MacBook Air Campaign",
    date: "May 2025",
    type: "Dedicated Video",
    amount: "₹20,000",
    status: "pitched",
  },
];

const mockInvoices: BrandInvoice[] = [
  {
    id: "#INV-2025-001",
    dateIssued: "Mar 15, 2025",
    description: "Q3 Tech Review Integration",
    amount: "₹45,000",
    status: "Paid",
  },
  {
    id: "#INV-2025-002",
    dateIssued: "Apr 20, 2025",
    description: "iPhone 16 Pro Launch Socials",
    amount: "₹60,000",
    status: "Pending",
  },
  {
    id: "#INV-2025-003",
    dateIssued: "Feb 10, 2025",
    description: "Previous Campaign Milestone",
    amount: "₹20,000",
    status: "Overdue",
  },
];

const mockContacts: BrandContact[] = [
  {
    name: "Sarah Jenkins",
    role: "Marketing Manager",
    email: "sarah.j@apple.com",
    phone: "+1 (555) 123-4567",
    isPrimary: true,
  },
  {
    name: "Michael Chen",
    role: "Legal Counsel",
    email: "m.chen@apple.com",
    phone: "+1 (555) 987-6543",
  },
];

const initialNotes = [
  "Prefers Reels over Stories for brand awareness campaigns.",
  "Payment usually takes 15 days post-invoice approval.",
];

export default function BrandDetails() {
  const [activeTab, setActiveTab] = useState<BrandTab>("deals");
  const [notes, setNotes] = useState<string[]>(initialNotes);

  const handleAddNote = (note: string) => {
    setNotes([note, ...notes]);
  };

  const handleEditNote = (index: number, note: string) => {
    const updated = [...notes];
    updated[index] = note;
    setNotes(updated);
  };

  const handleDeleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/brands"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <LuArrowLeft size={16} />
        Back to Brands
      </Link>

      {/* Header */}
      <BrandDetailHeader
        name="Apple"
        category="TECH"
        categoryColor="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
        totalDeals={3}
        totalValue="₹1,25,000"
      />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Tabs + Content */}
        <div className="flex-1 min-w-0">
          <BrandDetailTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            invoiceCount={mockInvoices.length}
          />

          <div className="mt-6">
            {activeTab === "deals" && <BrandDealsTab deals={mockDeals} />}
            {activeTab === "invoices" && (
              <BrandInvoicesTab invoices={mockInvoices} />
            )}
            {activeTab === "notes" && (
              <BrandNotesTab
                notes={notes}
                onAddNote={handleAddNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            )}
            {activeTab === "contacts" && <BrandContactsTab contacts={mockContacts} />}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <BrandSidebar
            contact={{
              name: "Sarah Jenkins",
              role: "Marketing Manager",
              email: "sarah.j@apple.com",
              phone: "+1 (555) 123-4567",
            }}
            notes={notes}
          />
        </div>
      </div>
    </div>
  );
}
