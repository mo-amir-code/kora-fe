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

const VARIANT_STYLES: Record<PaymentStatusVariant, { 
    icon: string; 
    iconBg: string;
    amount: string;
}> = {
    success: {
        icon: "text-emerald-500",
        iconBg: "bg-emerald-500/10",
        amount: "text-emerald-500",
    },
    warning: {
        icon: "text-amber-500",
        iconBg: "bg-amber-500/10",
        amount: "text-gray-900 dark:text-white",
    },
    danger: {
        icon: "text-rose-500",
        iconBg: "bg-rose-500/10",
        amount: "text-rose-500",
    },
    neutral: {
        icon: "text-zinc-400 dark:text-zinc-500",
        iconBg: "bg-zinc-400/10 dark:bg-zinc-500/10",
        amount: "text-gray-900 dark:text-white",
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
            className = "",
        },
        ref
    ) => {
        const styles = VARIANT_STYLES[variant];
        const showTrend = trendType !== "none" && trendAmount;
        const TrendIcon = trendType === "up" ? LuTrendingUp : LuTrendingDown;
        const trendColor = trendType === "up" ? "text-emerald-500" : "text-rose-500";

        return (
            <div
                ref={ref}
                className={`
                    group relative rounded-2xl p-7
                    transition-all duration-300 ease-out
                    bg-white dark:bg-gray-900
                    border border-gray-200 dark:border-gray-800
                    hover:border-gray-300 dark:hover:border-gray-700
                    ${className}
                `}
                role="region"
                aria-label={title}
            >
                <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                        <h3 className="text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-[0.1em]">
                            {title}
                        </h3>
                        <div className={`text-3xl font-bold tracking-tight ${styles.amount}`}>
                            {amount}
                        </div>
                    </div>

                    {Icon && (
                        <div
                            className={`
                                flex items-center justify-center
                                w-11 h-11
                                rounded-xl
                                transition-all duration-300
                                group-hover:scale-105
                                ${styles.iconBg}
                                ${styles.icon}
                            `}
                        >
                            <Icon size={22} strokeWidth={2} />
                        </div>
                    )}
                </div>

                <div className="mt-6 flex items-center gap-3">
                    {showTrend ? (
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 ${trendColor}`}>
                            <TrendIcon size={12} strokeWidth={2.5} />
                            <span className="text-[11px] font-bold">
                                {trendAmount}
                            </span>
                        </div>
                    ) : subtitle ? (
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium italic">
                            {subtitle}
                        </p>
                    ) : null}
                </div>
            </div>
        );
    }
);

PaymentStatus.displayName = "PaymentStatus";

export default PaymentStatus;
