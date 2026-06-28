"use client";

import { useState } from "react";
import { LuPlus, LuChevronDown } from "react-icons/lu";
import { LoadingSpinner } from "@/components/common";
import { DealCard, AddDealForm } from "@/components/dashboard/deals";
import type { DealStatus, Platform } from "@/components/dashboard/deals/kanban";
import { useDealsList } from "@/hooks/useDeals";
import type { Deal } from "@/services/deal.service";
import { formatCurrencyAmount } from "@/lib/currency";

const DEAL_STAGES = [
  { value: "all", label: "All Stages" },
  { value: "LEAD", label: "Lead" },
  { value: "OUTREACH", label: "Outreach" },
  { value: "NEGOTIATION", label: "Negotiation" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "CONTRACT_SENT", label: "Contract Sent" },
  { value: "APPROVED", label: "Approved" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "LOST", label: "Lost" },
  { value: "CANCELLED", label: "Cancelled" },
];

// Map backend stage to DealCard status
function mapStageToStatus(stage: string): DealStatus {
  switch (stage) {
    case "LEAD":
    case "OUTREACH":
    case "PROPOSAL_SENT":
      return "pitched";
    case "NEGOTIATION":
    case "CONTRACT_SENT":
    case "APPROVED":
    case "IN_PROGRESS":
      return "active";
    case "COMPLETED":
      return "delivered";
    case "LOST":
    case "CANCELLED":
      return "overdue";
    default:
      return "pitched";
  }
}

function mapStageToLabel(stage: string): string {
  const found = DEAL_STAGES.find((s) => s.value === stage);
  return found?.label ?? stage;
}

// Map platforms from backend strings to DealCard Platform type
function mapPlatforms(platforms: string[]): Platform[] {
  const map: Record<string, Platform> = {
    Instagram: "instagram",
    YouTube: "youtube",
    TikTok: "tiktok",
    instagram: "instagram",
    youtube: "youtube",
    tiktok: "tiktok",
  };
  return platforms.map((p) => map[p]).filter(Boolean) as Platform[];
}

function formatCurrency(amount: string | null, currency: string): string {
  if (!amount || parseFloat(amount) === 0) return "—";
  return formatCurrencyAmount(amount, currency);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function mapDealToCard(deal: Deal) {
  const completedDeliverables = deal.deliverables.filter((d) => d.isCompleted).length;
  const totalDeliverables = deal.deliverables.length;

  return {
    id: deal.id,
    title: deal.brand.name,
    subtitle: deal.title,
    amount: formatCurrency(deal.amount, deal.currency),
    status: mapStageToStatus(deal.stage),
    statusLabel: mapStageToLabel(deal.stage),
    platforms: mapPlatforms(deal.platforms),
    deliverables: totalDeliverables > 0 ? { current: completedDeliverables, total: totalDeliverables } : undefined,
    date: formatDate(deal.createdAt),
    assigneeName: deal.contact?.name ?? deal.brand.name,
  };
}

const DealsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDealId, setEditingDealId] = useState<string | null>(null);

  const { data: deals, isLoading, error } = useDealsList(activeFilter);

  // Find the deal being edited
  const editingDeal = editingDealId ? deals?.find((d) => d.id === editingDealId) : null;

  if (showAddForm || editingDeal) {
    return (
      <div className="p-4 sm:p-8 min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <AddDealForm 
          onSave={() => { setShowAddForm(false); setEditingDealId(null); }} 
          onCancel={() => { setShowAddForm(false); setEditingDealId(null); }}
          editDeal={editingDeal ? {
            id: editingDeal.id,
            title: editingDeal.title,
            brandId: editingDeal.brandId,
            contactId: editingDeal.contactId,
            stage: editingDeal.stage,
            amount: editingDeal.amount,
            currency: editingDeal.currency,
            paymentTerms: editingDeal.paymentTerms,
            paymentDueDate: editingDeal.paymentDueDate,
            platforms: editingDeal.platforms,
            contractUrl: editingDeal.contractUrl,
            notes: editingDeal.notes,
            deliverables: editingDeal.deliverables.map((d) => ({ id: d.id, type: d.type, quantity: d.quantity, dueDate: d.dueDate })),
          } : undefined}
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-10 min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <button 
          onClick={() => setShowAddForm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-6 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-xl transition-all hover:opacity-90 active:scale-95 uppercase tracking-widest"
        >
          <LuPlus className="h-4 w-4 stroke-3" />
          Add New Deal
        </button>

        {/* Stage Filter Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="w-full sm:w-52 appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
          >
            {DEAL_STAGES.map((stage) => (
              <option key={stage.value} value={stage.value}>{stage.label}</option>
            ))}
          </select>
          <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}

      {/* Error */}
      {error && (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-red-400">Failed to load deals. Please try again.</p>
        </div>
      )}

      {/* Deals Grid */}
      {!isLoading && !error && deals && deals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20">
          {deals.map((deal) => (
            <DealCard key={deal.id} {...mapDealToCard(deal)} onEdit={(id) => setEditingDealId(id as string)} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && deals && deals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <LuPlus className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activeFilter === "all" ? "No deals yet. Create your first deal." : `No deals with "${DEAL_STAGES.find(s => s.value === activeFilter)?.label}" stage.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DealsPage;
