"use client";

import React from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { LoadingSpinner } from "@/components/common";
import {
  DealHeader,
  Deliverables,
  DealStats,
  QuickActions,
  DealActivity,
  // AutomatedReminders,
  AddDealActivity,
  DealNotes,
  DealContractUrl
} from "@/components/dashboard/deals/details";
import { useDealDetail, useUpdateDeliverables, useUpdateDeal, useAddDealActivity } from "@/hooks/useDeals";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

function formatAmount(amount: string | null, currency: string): string {
  if (!amount || parseFloat(amount) === 0) return "—";
  const num = parseFloat(amount);
  const symbol = currency === "USD" ? "$" : "₹";
  return `${symbol}${num.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

function getStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    LEAD: "Lead",
    OUTREACH: "Outreach",
    NEGOTIATION: "Negotiation",
    PROPOSAL_SENT: "Proposal Sent",
    CONTRACT_SENT: "Contract Sent",
    APPROVED: "Approved",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    LOST: "Lost",
    CANCELLED: "Cancelled",
  };
  return labels[stage] ?? stage;
}

function getTimeLeft(dueDate: string | null): string {
  if (!dueDate) return "No due date";
  const due = new Date(dueDate);
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays === 0) return "Due today";
  return `${diffDays} day${diffDays > 1 ? "s" : ""} remaining`;
}

export default function DealDetailsPage({ params }: { params: Promise<{ dealId: string }> }) {
  const resolvedParams = React.use(params);
  const dealId = resolvedParams.dealId;
  const { data: deal, isLoading, error } = useDealDetail(dealId);
  const updateDeliverables = useUpdateDeliverables(dealId);
  const updateDeal = useUpdateDeal(dealId);
  const addActivity = useAddDealActivity(dealId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !deal) {
    return (
      <div className="max-w-[1600px] mx-auto p-4 sm:p-8 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900">
        <Link href="/dashboard/deals" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <LuArrowLeft size={16} /> Back to Deals
        </Link>
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-red-400">Deal not found or failed to load.</p>
        </div>
      </div>
    );
  }

  // Map deliverables for the component
  const deliverableItems = deal.deliverables.map((d) => ({
    id: d.id,
    title: `${d.quantity}x ${d.type.replace(/_/g, " ")}`,
    status: (d.isCompleted ? "DELIVERED" : "PENDING") as "DELIVERED" | "PENDING",
    isChecked: d.isCompleted,
  }));

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-8 space-y-6 sm:space-y-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navigation Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/deals"
          className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white dark:bg-[#13141c] border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-brand-500 transition-all"
        >
          <LuArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-[10px] sm:text-theme-sm font-bold text-gray-500 dark:text-gray-400">Deal Management</h2>
          <p className="text-xs sm:text-sm font-black text-gray-900 dark:text-white tracking-widest uppercase">{deal.brand.name}</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">

        {/* Left Column: Core Info & Activity */}
        <div className="xl:col-span-2 space-y-6 sm:space-y-8">
          <DealHeader
            title={deal.title}
            assignee={{
              name: deal.contact?.name ?? deal.brand.name,
              email: "",
            }}
            amount={formatAmount(deal.amount, deal.currency)}
            status={getStageLabel(deal.stage).toUpperCase()}
            stage={deal.stage}
            platforms={deal.platforms}
            logo={deal.brand.logoUrl ?? undefined}
            onStageChange={(stage) => updateDeal.mutate({ stage })}
            isUpdatingStage={updateDeal.isPending}
          />

          <Deliverables
            items={deliverableItems}
            onUpdate={(updates) => updateDeliverables.mutate(updates)}
            isUpdating={updateDeliverables.isPending}
          />

          <DealActivity activities={(deal.activities ?? []).map((a) => ({
            id: a.id,
            title: a.type.replace(/_/g, " "),
            description: a.body ?? "",
            timestamp: new Date(a.createdAt).toLocaleString("en-IN", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
            status: "completed" as const,
          }))} />
        </div>

        {/* Right Column: Stats & Actions */}
        <div className="space-y-6 sm:space-y-8">
          <DealStats
            dueDate={formatDate(deal.paymentDueDate)}
            timeLeft={getTimeLeft(deal.paymentDueDate)}
            createdDate={formatDate(deal.createdAt)}
            createdYear={new Date(deal.createdAt).getFullYear().toString()}
          />

          {/* <QuickActions dealId={deal.id} /> */}

          <DealContractUrl
            contractUrl={deal.contractUrl}
            onUpdate={(contractUrl) => updateDeal.mutate({ contractUrl })}
            isUpdating={updateDeal.isPending}
          />

          <DealNotes
            notes={deal.notes}
            onUpdate={(notes) => updateDeal.mutate({ notes })}
            isUpdating={updateDeal.isPending}
          />

          {/* <AutomatedReminders /> */}

          <AddDealActivity
            onAdd={(data) => addActivity.mutate(data)}
            isAdding={addActivity.isPending}
          />
        </div>

      </div>
    </div>
  );
}
