"use client";

import React from "react";
import { LuHistory } from "react-icons/lu";

export type ActivityStatus = "completed" | "active" | "future";

export type ActivityEntry = {
  id: string | number;
  title: string;
  description: string;
  timestamp?: string;
  status: ActivityStatus;
};

export type DealActivityProps = {
  activities: ActivityEntry[];
};

const DealActivity = ({ activities }: DealActivityProps) => {
  return (
    <div className="bg-white dark:bg-[#13141c]/50 p-5 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800/40 transition-colors">
      <div className="flex items-center gap-3 mb-8 sm:mb-10">
        <div className="p-1.5 sm:p-2 bg-brand-500/10 rounded-xl text-brand-600 dark:text-brand-500">
          <LuHistory className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Deal Activity</h2>
      </div>

      <div className="relative space-y-0">
        {activities.map((activity, index) => {
          const isLast = index === activities.length - 1;
          
          return (
            <div key={activity.id} className="relative flex gap-4 sm:gap-6 pb-8 sm:pb-10 last:pb-0 group">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-[9px] sm:left-[11px] top-[24px] bottom-0 w-[2px] bg-gray-100 dark:bg-gray-800 transition-colors" />
              )}

              {/* Status Indicator */}
              <div className="relative z-10 shrink-0">
                {activity.status === "completed" && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 flex items-center justify-center border-[3px] sm:border-4 border-white dark:border-[#13141c]" />
                )}
                {activity.status === "active" && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-brand-500 bg-white dark:bg-[#13141c] flex items-center justify-center border-[3px] sm:border-4 border-white dark:border-[#13141c]">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-500 animate-pulse" />
                  </div>
                )}
                {activity.status === "future" && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center border-[3px] sm:border-4 border-white dark:border-[#13141c]" />
                )}
              </div>

              {/* Content */}
              <div className="space-y-1.5 pt-0.5">
                <h4 className={`text-sm font-bold tracking-tight transition-colors ${
                  activity.status === "future" ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-white"
                }`}>
                  {activity.title}
                </h4>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                  {activity.description}
                </p>
                {activity.timestamp && (
                  <div className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest pt-1">
                    {activity.timestamp}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DealActivity;
