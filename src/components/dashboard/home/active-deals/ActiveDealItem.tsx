/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { LuPencil } from "react-icons/lu";

export type DealStatus = "pitched" | "in-progress" | "delivered";

export type ActiveDealItemProps = {
  id: string | number;
  dealName: string;
  brandName: string;
  status: DealStatus;
  progress: string;
  amount: string;
  dueStatus: string;
  dueStatusType?: "normal" | "urgent";
  logoUrl?: string;
  logoInitial?: string;
};

const STATUS_CONFIG: Record<DealStatus, { label: string; classes: string }> = {
  pitched: {
    label: "PITCHED",
    classes: "bg-warning-500/10 text-warning-500",
  },
  "in-progress": {
    label: "IN PROGRESS",
    classes: "bg-success-500/10 text-success-500",
  },
  delivered: {
    label: "DELIVERED",
    classes: "bg-brand-500/10 text-brand-500",
  },
};

const ActiveDealItem = ({
  dealName,
  status,
  progress,
  amount,
  dueStatus,
  dueStatusType = "normal",
  logoUrl,
  logoInitial,
}: ActiveDealItemProps) => {
  const statusInfo = STATUS_CONFIG[status];

  return (
    <div className="flex items-center justify-between py-6 group first:pt-0 last:pb-0">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Logo/Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700">
          {logoUrl ? (
            <img src={logoUrl} alt={dealName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-bold text-gray-500">{logoInitial}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate mb-1">
            {dealName}
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full ${statusInfo.classes}`}>
              {statusInfo.label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Progress: {progress}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Amount & Due Status */}
      <div className="flex items-center gap-4 sm:gap-6 ml-4">
        <div className="text-right shrink-0">
          <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
            {amount}
          </p>
          <p className={`text-[10px] sm:text-xs mt-1 ${
            dueStatusType === "urgent" 
              ? "text-error-500 font-medium" 
              : "text-gray-500 dark:text-gray-400"
          }`}>
            {dueStatus}
          </p>
        </div>

        {/* Edit Button */}
        <button className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" title="Edit">
          <LuPencil size={18} />
        </button>
      </div>
    </div>
  );
};

export default ActiveDealItem;
