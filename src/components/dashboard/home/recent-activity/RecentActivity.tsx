"use client";
import RecentActivityItem, { RecentActivityItemProps } from "./RecentActivityItem";

export type RecentActivityProps = {
  activities: (Omit<RecentActivityItemProps, "isLast"> & { id: string | number })[];
  className?: string;
};

const RecentActivity = ({ activities, className = "" }: RecentActivityProps) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-800 
        rounded-2xl p-6 h-full
        ${className}
      `}
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-8">
        Recent Activity
      </h2>

      <div className="max-h-[560px] overflow-y-auto custom-scrollbar pr-1">
        <div className="flex flex-col">
          {activities.map((activity, index) => (
            <RecentActivityItem
              key={activity.id}
              {...activity}
              isLast={index === activities.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
