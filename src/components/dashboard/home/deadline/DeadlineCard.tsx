/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { LuArrowRight } from "react-icons/lu";

export type DeadlineStatus = "today" | "tomorrow" | "upcoming";

export type DeadlineCardProps = {
  /**
   * Brand or project name
   */
  brandName: string;

  /**
   * Count of items (e.g., 1, 2, 3)
   */
  itemCount: number;

  /**
   * Type of items (e.g., "Reel", "Stories", "Invoices")
   */
  itemType: string;

  /**
   * Deadline status controlling color scheme
   */
  status: DeadlineStatus;

  /**
   * Display label (e.g., "Due Today", "Due Tomorrow")
   */
  statusLabel: string;

  /**
   * Avatar/image URL
   */
  avatarUrl?: string;

  /**
   * Avatar/initials (text content fallback)
   */
  avatar?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Callback when card is clicked
   */
  onClick?: () => void;

  /**
   * Grouped items for this deadline
   */
  items?: Array<{ id: string; type: string; dealTitle: string; dealId: string }>;

  /**
   * Callback to view details of grouped items
   */
  onViewDetails?: (items: Array<{ id: string; type: string; dealTitle: string; dealId: string }>) => void;
};

const STATUS_COLORS: Record<DeadlineStatus, { container: string; dot: string; label: string; avatar: string }> = {
  today: {
    container: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
    dot: "bg-error-500",
    label: "text-error-500",
    avatar: "bg-error-500/10 text-error-500",
  },
  tomorrow: {
    container: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
    dot: "bg-warning-500",
    label: "text-warning-500",
    avatar: "bg-warning-500/10 text-warning-500",
  },
  upcoming: {
    container: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
    dot: "bg-brand-500",
    label: "text-brand-500",
    avatar: "bg-brand-500/10 text-brand-500",
  },
};

const DeadlineCard = React.forwardRef<HTMLDivElement, DeadlineCardProps>(
  (
    {
      brandName,
      itemCount,
      itemType,
      status,
      statusLabel,
      avatar,
      avatarUrl,
      items = [],
      onViewDetails,
      className = "",
      onClick,
    },
    ref
  ) => {
    const colors = STATUS_COLORS[status];

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`
          group relative rounded-2xl p-5 min-w-[280px]
          transition-all duration-300 ease-out
          border border-gray-200
          cursor-pointer
          ${colors.container}
          ${className}
        `}
        role="button"
        tabIndex={0}
        aria-label={`${brandName} deadline: ${statusLabel}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick?.();
          }
        }}
      >
        {/* Header: Avatar + Brand Name + Item Count */}
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Avatar Badge */}
            {(avatarUrl || avatar) && (
              <div
                className={`
                  flex items-center justify-center
                  w-10 h-10
                  rounded-full
                  shrink-0
                  overflow-hidden
                  font-semibold text-sm
                  ${colors.avatar}
                `}
              >
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt={brandName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  avatar
                )}
              </div>
            )}

            {/* Brand Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {brandName}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {itemCount} {itemType}
              </p>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="shrink-0 text-gray-500 dark:text-gray-600 group-hover:text-gray-400 transition-colors">
            <LuArrowRight size={20} strokeWidth={2} />
          </div>
        </div>

        {/* Status: Dot + Label + Action */}
        <div className="mt-4 sm:mt-5 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${colors.label}`}>
            <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
            <span className="text-xs sm:text-sm font-medium">{statusLabel}</span>
          </div>

          {items.length > 1 && onViewDetails && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(items);
              }}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline px-2 py-1 rounded-md hover:bg-brand-50 dark:hover:bg-brand-900/20"
            >
              Show Details
            </button>
          )}
        </div>
      </div>
    );
  }
);

DeadlineCard.displayName = "DeadlineCard";

export default DeadlineCard;
