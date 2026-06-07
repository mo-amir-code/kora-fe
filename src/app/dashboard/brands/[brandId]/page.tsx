"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { LuArrowLeft, LuLoader } from "react-icons/lu";
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
import { useBrandDetail, useUpdateBrand, useCreateBrandContact, useUpdateBrandContact, useDeleteBrandContact, useUploadBrandLogo } from "@/hooks/useBrands";

const CATEGORY_COLORS: Record<string, string> = {
  TECH: "bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400",
  FASHION: "bg-pink-100 dark:bg-pink-500/15 text-pink-600 dark:text-pink-400",
  BEAUTY: "bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400",
  FINANCE: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  EDUCATION: "bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400",
  GAMING: "bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  FOOD: "bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400",
  FITNESS: "bg-lime-100 dark:bg-lime-500/15 text-lime-600 dark:text-lime-400",
  TRAVEL: "bg-cyan-100 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  AUTOMOTIVE: "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400",
  HEALTH: "bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400",
  ENTERTAINMENT: "bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400",
  E_COMMERCE: "bg-teal-100 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400",
  SAAS: "bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400",
  OTHER: "bg-gray-100 dark:bg-gray-500/15 text-gray-600 dark:text-gray-400",
};

function formatCurrency(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (!num || num === 0) return "₹0";
  return `₹${num.toLocaleString("en-IN")}`;
}

export default function BrandDetails() {
  const params = useParams();
  const brandId = params.brandId as string;
  const { data: brand, isLoading, error } = useBrandDetail(brandId);
  const updateBrand = useUpdateBrand(brandId);
  const createContact = useCreateBrandContact(brandId);
  const updateContact = useUpdateBrandContact(brandId);
  const deleteContact = useDeleteBrandContact(brandId);
  const uploadLogo = useUploadBrandLogo();

  const [activeTab, setActiveTab] = useState<BrandTab>("deals");
  const [showAddContact, setShowAddContact] = useState(false);

  // Check if any mutation is in progress
  const isMutating = updateBrand.isPending || createContact.isPending || updateContact.isPending || deleteContact.isPending || uploadLogo.isPending;

  // ─── NOTES HANDLERS (persist to API) ────────────────────────────────────────

  const handleAddNote = (note: string) => {
    const updatedNotes = [note, ...(brand?.notes ?? [])];
    updateBrand.mutate({ notes: updatedNotes });
  };

  const handleEditNote = (index: number, note: string) => {
    const updatedNotes = [...(brand?.notes ?? [])];
    updatedNotes[index] = note;
    updateBrand.mutate({ notes: updatedNotes });
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = (brand?.notes ?? []).filter((_, i) => i !== index);
    updateBrand.mutate({ notes: updatedNotes });
  };

  // ─── CONTACT HANDLER ────────────────────────────────────────────────────────

  const handleAddContact = (data: { name: string; role: string; email: string; whatsapp: string; isPrimary: boolean }) => {
    createContact.mutate({
      name: data.name,
      role: data.role || undefined,
      email: data.email || undefined,
      whatsapp: data.whatsapp || undefined,
      isPrimary: data.isPrimary,
    }, {
      onSuccess: () => setShowAddContact(false),
    });
  };

  const handleUpdateContact = (contactId: string, data: { name?: string; role?: string; email?: string; whatsapp?: string; isPrimary?: boolean }) => {
    updateContact.mutate({ contactId, data });
  };

  const handleDeleteContact = (contactId: string) => {
    deleteContact.mutate(contactId);
  };

  // ─── BRAND UPDATE HANDLER ──────────────────────────────────────────────────

  const handleUpdateBrand = (data: { name?: string; category?: string; logoUrl?: string | null }) => {
    updateBrand.mutate(data);
  };

  const handleUploadLogo = async (file: File): Promise<string | undefined> => {
    try {
      const result = await uploadLogo.mutateAsync(file);
      return result.url;
    } catch {
      return undefined;
    }
  };

  // ─── LOADING / ERROR ────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LuLoader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/brands"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <LuArrowLeft size={16} />
          Back to Brands
        </Link>
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-red-400">Brand not found or failed to load.</p>
        </div>
      </div>
    );
  }

  const primaryContact = brand.contacts?.find((c) => c.isPrimary) || brand.contacts?.[0];
  const categoryColor = CATEGORY_COLORS[brand.category] || CATEGORY_COLORS.OTHER;

  // Map contacts for the tab (include ID for edit/delete)
  const contactsForTab = (brand.contacts ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    role: c.role ?? "",
    email: c.email ?? "",
    phone: c.whatsapp ?? "",
    isPrimary: c.isPrimary,
  }));

  return (
    <div className="space-y-6 relative">
      {/* Loading overlay — blocks interaction during mutations */}
      {isMutating && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 pointer-events-auto">
          <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-[1px]" />
          <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <LuLoader className="h-4 w-4 animate-spin text-brand-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Saving changes...</span>
          </div>
        </div>
      )}

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
        name={brand.name}
        category={brand.category}
        categoryColor={categoryColor}
        totalDeals={brand.activeDeals ?? 0}
        totalValue={formatCurrency(brand.totalValue ?? 0)}
        logoUrl={brand.logoUrl ?? undefined}
        onUpdateBrand={handleUpdateBrand}
        onUploadLogo={handleUploadLogo}
        isUpdating={updateBrand.isPending}
      />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Tabs + Content */}
        <div className="flex-1 min-w-0">
          <BrandDetailTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            invoiceCount={0}
          />

          <div className="mt-6">
            {activeTab === "deals" && <BrandDealsTab deals={[]} />}
            {activeTab === "invoices" && <BrandInvoicesTab invoices={[]} />}
            {activeTab === "notes" && (
              <BrandNotesTab
                notes={brand.notes ?? []}
                onAddNote={handleAddNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            )}
            {activeTab === "contacts" && (
              <BrandContactsTab
                contacts={contactsForTab}
                showAddForm={showAddContact}
                onToggleAddForm={() => setShowAddContact(!showAddContact)}
                onAddContact={handleAddContact}
                onUpdateContact={handleUpdateContact}
                onDeleteContact={handleDeleteContact}
                isAdding={createContact.isPending}
              />
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <BrandSidebar
            contact={{
              name: primaryContact?.name ?? "—",
              role: primaryContact?.role ?? "",
              email: primaryContact?.email ?? "",
              phone: primaryContact?.whatsapp ?? "",
            }}
            notes={brand.notes ?? []}
            onViewAllContacts={() => setActiveTab("contacts")}
            onEditNotes={() => setActiveTab("notes")}
          />
        </div>
      </div>
    </div>
  );
}
