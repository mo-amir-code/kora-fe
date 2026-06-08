/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { 
  LuInstagram, 
  LuYoutube, 
  LuMusic2, 
  LuCalendar, 
  LuTriangleAlert,
  LuPencil,
} from "react-icons/lu";
import { IconType } from "react-icons";

export type DealStatus = "pitched" | "active" | "delivered" | "overdue" | "in-review";

export type Platform = "instagram" | "youtube" | "tiktok";

export type DealCardProps = {
  id: string | number;
  title: string;
  subtitle: string;
  amount: string;
  status: DealStatus;
  statusLabel: string;
  platforms: Platform[];
  deliverables?: { current: number; total: number };
  date: string;
  assigneeAvatar?: string;
  assigneeName?: string;
  className?: string;
  onEdit?: (id: string | number) => void;
};

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: LuInstagram,
  youtube: LuYoutube,
  tiktok: LuMusic2,
};

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const STATUS_CONFIG: Record<DealStatus, { accent: string; badge: string; dot: string }> = {
  pitched: {
    accent: "border-warning-500",
    badge: "bg-warning-500/10 text-warning-500",
    dot: "bg-warning-500",
  },
  active: {
    accent: "border-brand-500",
    badge: "bg-brand-500/10 text-brand-500",
    dot: "bg-brand-500",
  },
  delivered: {
    accent: "border-success-500",
    badge: "bg-success-500/10 text-success-500",
    dot: "bg-success-500",
  },
  overdue: {
    accent: "border-error-500",
    badge: "bg-error-500/10 text-error-500",
    dot: "bg-error-500",
  },
  "in-review": {
    accent: "border-info-500",
    badge: "bg-info-500/10 text-info-500",
    dot: "bg-info-500",
  },
};

const DealCard = ({
  id,
  title,
  subtitle,
  amount,
  status,
  statusLabel,
  platforms,
  deliverables,
  date,
  assigneeAvatar,
  assigneeName,
  className = "",
  onEdit,
}: DealCardProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <Link
      href={`/dashboard/deals/${id}`}
      className={`
        group relative flex flex-col gap-5 p-6 rounded-2xl
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        hover:border-gray-300 dark:hover:border-gray-700
        hover:-translate-y-1 transition-all duration-300
        overflow-hidden
        ${className}
      `}
    >
      {/* Background Glow Effect */}
      <div className={`absolute -right-20 -top-20 w-40 h-40 blur-[100px] opacity-10 rounded-full ${config.dot}`} />

      {/* Header: Title & Status Badge */}
      <div className="flex justify-between items-start gap-4 relative z-10">
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(id); }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/10 transition-all opacity-0 group-hover:opacity-100"
              title="Edit deal"
            >
              <LuPencil size={14} />
            </button>
          )}
          {status === "overdue" && (
            <div className="p-1.5 bg-rose-500/10 rounded-full">
              <LuTriangleAlert className="text-rose-500" size={16} />
            </div>
          )}
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 ${config.badge}`}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-baseline gap-1 relative z-10">
        <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {amount}
        </span>
      </div>

      {/* Platform Chips */}
      <div className="flex flex-wrap gap-2.5 relative z-10">
        {platforms.map((platform) => {
          const Icon = PLATFORM_ICONS[platform];
          return (
            <div
              key={platform}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-brand-600 dark:group-hover:text-gray-200 group-hover:border-brand-500/20 dark:group-hover:border-gray-700 transition-colors"
            >
              <Icon size={14} strokeWidth={2.5} />
              {PLATFORM_LABELS[platform]}
            </div>
          );
        })}
      </div>

      {/* Deliverables Progress */}
      {deliverables && (
        <div className="space-y-3 mt-1 relative z-10">
          <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <span>Deliverables</span>
            <span className="text-brand-600 dark:text-brand-400">
              {deliverables.current} / {deliverables.total}
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={`h-full ${status === 'overdue' ? 'bg-rose-500' : 'bg-brand-500'} transition-all duration-1000 ease-out`}
              style={{ width: `${(deliverables.current / deliverables.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Bottom: Date & Avatar */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 relative z-10">
        <div className="flex items-center gap-2.5 text-xs font-bold text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-400 transition-colors uppercase tracking-widest">
          <LuCalendar size={15} strokeWidth={2.5} />
          <span>{date}</span>
        </div>
        <div className="relative group/avatar">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 group-hover:border-brand-500/50 transition-all overflow-hidden relative z-10 shadow-sm">
            {assigneeAvatar ? (
              <img src={assigneeAvatar} alt="Assignee" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400 dark:text-gray-500">
                {assigneeName?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DealCard;
