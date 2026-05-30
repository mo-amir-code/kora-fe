"use client";

import { useState } from "react";
import DealsFilter from "@/components/dashboard/deals/deals-filter";
import { DealCard, DealCardProps } from "@/components/dashboard/deals/kanban";

const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "overdue", label: "Overdue", hasDot: true, dotColor: "bg-warning-500" },
  { id: "paid", label: "Paid" },
  { id: "pitched", label: "Pitched" },
];

const ALL_DEALS: DealCardProps[] = [
  {
    id: 1,
    title: "TechNova Solutions",
    subtitle: "Q3 Campaign Pitch",
    amount: "₹1,50,000",
    status: "pitched" as const,
    statusLabel: "Pending",
    platforms: ["youtube" as const],
    date: "Oct 15",
    assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "GlowBeats Audio",
    subtitle: "Product Review",
    amount: "₹75,000",
    status: "pitched" as const,
    statusLabel: "Pending",
    platforms: ["instagram" as const],
    date: "Oct 20",
    assigneeAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "StyleMantra",
    subtitle: "Festive Collection",
    amount: "₹2,00,000",
    status: "active" as const,
    statusLabel: "Active",
    platforms: ["instagram" as const, "tiktok" as const],
    deliverables: { current: 1, total: 3 },
    date: "Oct 12",
    assigneeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "UrbanEats App",
    subtitle: "App Launch Promo",
    amount: "₹85,000",
    status: "overdue" as const,
    statusLabel: "Overdue",
    platforms: ["youtube" as const],
    deliverables: { current: 0, total: 1 },
    date: "Oct 05",
    assigneeAvatar: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "FitLife Supplements",
    subtitle: "Monthly Retainer",
    amount: "₹1,20,000",
    status: "in-review" as const,
    statusLabel: "In Review",
    platforms: ["instagram" as const],
    deliverables: { current: 2, total: 2 },
    date: "Inv Sent",
    assigneeAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
  },
];

const DealsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredDeals = ALL_DEALS.filter(deal => {
    if (activeFilter === "all") return true;
    if (activeFilter === "overdue") return deal.status === "overdue";
    if (activeFilter === "active") return deal.status === "active";
    if (activeFilter === "pitched") return deal.status === "pitched";
    if (activeFilter === "paid") return deal.status === "delivered";
    return true;
  });

  return (
    <div className="p-4 sm:p-8 space-y-10 min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="flex justify-end">
        <DealsFilter
          options={FILTER_OPTIONS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredDeals.map((deal) => (
          <DealCard key={deal.id} {...deal} />
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg font-medium">No deals found for this filter</p>
        </div>
      )}
    </div>
  );
};

export default DealsPage;