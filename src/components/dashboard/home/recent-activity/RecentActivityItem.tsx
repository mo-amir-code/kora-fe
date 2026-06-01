import React from "react";
import { IconType } from "react-icons";

export type RecentActivityType = "delivered" | "invoice" | "reminder" | "pitch";

export type RecentActivityItemProps = {
  type: RecentActivityType;
  entityName: string;
  prefix?: string;
  suffix?: string;
  time: string;
  amount?: string;
  icon: IconType;
  isLast?: boolean;
};

const TYPE_STYLES: Record<RecentActivityType, { icon: string; iconBg: string }> = {
  delivered: {
    icon: "text-brand-500",
    iconBg: "bg-brand-500/10",
  },
  invoice: {
    icon: "text-success-500",
    iconBg: "bg-success-500/10",
  },
  reminder: {
    icon: "text-error-500",
    iconBg: "bg-error-500/10",
  },
  pitch: {
    icon: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
};

const RecentActivityItem = ({
  type,
  entityName,
  prefix,
  suffix,
  time,
  amount,
  icon: Icon,
  isLast,
}: RecentActivityItemProps) => {
  const styles = TYPE_STYLES[type];

  return (
    <div className="relative flex gap-4 pb-8 group last:pb-0">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[18px] top-[36px] bottom-0 w-[2px] bg-gray-100 dark:bg-gray-800" />
      )}

      {/* Icon Circle */}
      <div
        className={`
          relative z-10 flex items-center justify-center
          w-9 h-9 rounded-full shrink-0
          ${styles.iconBg} ${styles.icon}
          transition-transform duration-300 group-hover:scale-110
        `}
      >
        <Icon size={18} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {prefix && <span>{prefix} </span>}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {entityName}
            </span>
            {suffix && <span> {suffix}</span>}
          </p>

          {amount && (
            <div className="mt-1">
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-success-500/10 text-success-500">
                {amount}
              </span>
            </div>
          )}

          <time className="text-xs text-gray-500 dark:text-gray-500">
            {time}
          </time>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityItem;
