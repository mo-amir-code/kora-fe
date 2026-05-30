"use client";

import React from "react";
import { IconType } from "react-icons";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";

export type PaymentStatusVariant = "success" | "warning" | "danger" | "neutral";

export type PaymentStatusProps = {
    /**
     * Card title (e.g., "Total Earned", "Pending Payments", "Overdue")
     */
    title: string;

    /**
     * Primary numeric value (amount)
     */
    amount: string | number;

    /**
     * Icon component from react-icons
     */
    icon?: IconType;

    /**
     * Card variant controlling colors and styling
     */
    variant?: PaymentStatusVariant;

    /**
     * Supporting information (e.g., "3 invoices pending")
     */
    subtitle?: string;

    /**
     * Trend change amount (e.g., "+₹8,000")
     * Only used when trendType is not "none"
     */
    trendAmount?: string;

    /**
     * Trend direction: "up" for positive trend, "down" for negative trend
     * Set to "none" or undefined to show subtitle instead
     */
    trendType?: "up" | "down" | "none";

    /**
     * Currency symbol (default: "₹")
     */
    currency?: string;

    /**
     * Additional CSS classes
     */
    className?: string;
};

const VARIANT_STYLES: Record<PaymentStatusVariant, { container: string; icon: string; amount: string; iconBg: string }> = {
    success: {
        container: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
        icon: "text-purple-500",
        amount: "text-gray-900 dark:text-white",
        iconBg: "bg-purple-500/10",
    },
    warning: {
        container: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
        icon: "text-warning-500",
        amount: "text-gray-900 dark:text-white",
        iconBg: "bg-warning-500/10",
    },
    danger: {
        container: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
        icon: "text-error-500",
        amount: "text-error-500",
        iconBg: "bg-error-500/10",
    },
    neutral: {
        container: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
        icon: "text-gray-400",
        amount: "text-gray-900 dark:text-white",
        iconBg: "bg-gray-400/10",
    },
};

const PaymentStatus = React.forwardRef<HTMLDivElement, PaymentStatusProps>(
    (
        {
            title,
            amount,
            icon: Icon,
            variant = "neutral",
            subtitle,
            trendAmount,
            trendType = "none",
            currency = "₹",
            className = "",
        },
        ref
    ) => {
        const styles = VARIANT_STYLES[variant];

        const showTrend = trendType !== "none" && trendAmount;
        const TrendIcon = trendType === "up" ? LuTrendingUp : LuTrendingDown;
        const trendColor = trendType === "up" ? "text-emerald-400" : "text-red-400";

        return (
            <div
                ref={ref}
                className={`
          group relative rounded-2xl p-6
          transition-all duration-300 ease-out
          border-gray-200
          hover:shadow-theme-xl dark:hover:shadow-black/20
          hover:border-gray-300 dark:hover:border-gray-700
          ${styles.container}
          ${className}
        `}
                role="region"
                aria-label={title}
            >
                {/* Header: Title + Icon */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-400">
                            {title}
                        </h3>
                    </div>

                    {Icon && (
                        <div
                            className={`
                flex items-center justify-center
                w-10 h-10
                rounded-full
                shrink-0
                transition-transform duration-300
                group-hover:scale-110
                ${styles.iconBg}
                ${styles.icon}
              `}
                        >
                            <Icon size={20} strokeWidth={2} />
                        </div>
                    )}
                </div>

                {/* Primary Value: Amount */}
                <div className="mt-4">
                    <div className={`text-4xl font-bold tracking-tight ${styles.amount}`}>
                        {amount}
                    </div>
                </div>

                {/* Supporting Info: Trend or Subtitle */}
                <div className="mt-2">
                    {showTrend ? (
                        <div className={`flex items-center gap-1.5 ${trendColor}`}>
                            <TrendIcon size={14} className="shrink-0" />
                            <span className="text-sm font-medium">
                                {trendAmount}
                            </span>
                        </div>
                    ) : subtitle ? (
                        <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
                    ) : null}
                </div>
            </div>
        );
    }
);

PaymentStatus.displayName = "PaymentStatus";

export default PaymentStatus;
