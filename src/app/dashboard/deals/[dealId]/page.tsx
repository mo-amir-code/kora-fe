"use client";

import React from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { 
  DealHeader, 
  Deliverables, 
  DealStats, 
  QuickActions,
  DealActivity,
  AutomatedReminders 
} from "@/components/dashboard/deals/details";

// Mock data - In a real app, this would come from an API
const SAMPLE_DEAL = {
  id: "DEAL-2024-001",
  title: "Aesthetic Room Makeover Collab",
  amount: "$4,500.00",
  status: "IN REVIEW",
  logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80\u0026w=100\u0026h=100\u0026auto=format",
  assignee: {
    name: "Rahul Desai",
    email: "rahul@kora.ai",
  },
  platforms: ["Instagram", "YouTube Shorts"],
  deliverables: [
    { id: 1, title: "1x Main Instagram Reel (60s)", status: "DELIVERED" as const, isChecked: true },
    { id: 2, title: "3x Instagram Stories with Link", status: "DELIVERED" as const, isChecked: true },
    { id: 3, title: "YouTube Shorts Crossposting", status: "PENDING" as const, isChecked: false },
    { id: 4, title: "Raw Footage Delivery", status: "PENDING" as const, isChecked: false },
  ],
  stats: {
    dueDate: "Oct 30, 2024",
    timeLeft: "2 Days Remaining",
    createdDate: "Oct 15, 2024",
    createdYear: "2024 Fiscal",
  },
  activities: [
    { 
      id: 1, 
      title: "Payment Expected", 
      description: "Pending delivery of final shorts", 
      status: "future" as const 
    },
    { 
      id: 2, 
      title: "Reel \u0026 Story Posted", 
      description: "Oct 24, 2023 at 4:30 PM • Link shared with brand", 
      status: "active" as const,
      timestamp: "Oct 24, 2023"
    },
    { 
      id: 3, 
      title: "Creative Brief Approved", 
      description: "Oct 20, 2023 at 11:15 AM • Approved by Rahul Desai", 
      status: "completed" as const,
      timestamp: "Oct 20, 2023"
    },
    { 
      id: 4, 
      title: "Deal Created \u0026 Pitched", 
      description: "Oct 15, 2023 at 09:00 AM", 
      status: "completed" as const,
      timestamp: "Oct 15, 2023"
    },
  ],
  reminders: [
    { 
      id: 1, 
      title: "72hr Due Date Alert", 
      description: "Sends WhatsApp ping to brand", 
      enabled: true 
    },
    { 
      id: 2, 
      title: "24hr Final Notice", 
      description: "Sends Email with Invoice attached", 
      enabled: false 
    },
  ]
};

export default function DealDetailsPage({ params }: { params: Promise<{ dealId: string }> }) {
  const resolvedParams = React.use(params);
  const dealId = resolvedParams.dealId;

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
          <p className="text-xs sm:text-sm font-black text-gray-900 dark:text-white tracking-widest uppercase">{dealId}</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Left Column: Core Info & Activity */}
        <div className="xl:col-span-2 space-y-6 sm:space-y-8">
          <DealHeader 
            title={SAMPLE_DEAL.title}
            assignee={SAMPLE_DEAL.assignee}
            amount={SAMPLE_DEAL.amount}
            status={SAMPLE_DEAL.status}
            platforms={SAMPLE_DEAL.platforms}
            logo={SAMPLE_DEAL.logo}
          />

          <Deliverables items={SAMPLE_DEAL.deliverables} />

          <DealActivity activities={SAMPLE_DEAL.activities} />
        </div>

        {/* Right Column: Stats & Actions */}
        <div className="space-y-6 sm:space-y-8">
          <DealStats 
            dueDate={SAMPLE_DEAL.stats.dueDate}
            timeLeft={SAMPLE_DEAL.stats.timeLeft}
            createdDate={SAMPLE_DEAL.stats.createdDate}
            createdYear={SAMPLE_DEAL.stats.createdYear}
          />
          
          <QuickActions />
          
          <AutomatedReminders reminders={SAMPLE_DEAL.reminders} />
        </div>

      </div>
    </div>
  );
}