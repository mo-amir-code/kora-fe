"use client";

import React from "react";
import { LuClock, LuEllipsisVertical, LuToggleLeft, LuToggleRight } from "react-icons/lu";

export interface ReminderRuleCardProps {
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  status: "active" | "paused";
  stats: string;
  onToggle?: () => void;
}

export const ReminderRuleCard = ({
  title,
  category,
  description,
  icon: Icon,
  iconColor,
  status,
  stats,
  onToggle,
  ...props
}: ReminderRuleCardProps & { [key: string]: any }) => {
  const isActive = status === "active";
  const iconTextColor = iconColor.replace("bg-", "text-");

  return (
    <div className="group relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all hover:border-brand-500/30 flex flex-col h-full">
      {/* Top Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${iconColor} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center`}>
            <Icon size={20} className={iconTextColor} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-0.5">
              {category}
            </span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
              {title}
            </h3>
          </div>
        </div>
        
        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <LuEllipsisVertical size={18} />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Footer Info */}
      <div className="mt-auto pt-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Status Badge */}
          <button 
            onClick={onToggle}
            className="flex items-center gap-2 group/status"
          >
            {isActive ? (
              <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-500 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                Active
              </div>
            ) : (
              <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Paused
              </div>
            )}
            
            <div className={`transition-colors ${isActive ? 'text-success-600 dark:text-success-500' : 'text-gray-400'}`}>
              {isActive ? <LuToggleRight size={24} /> : <LuToggleLeft size={24} />}
            </div>
          </button>

          {/* Stats */}
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-600">
            <LuClock size={14} />
            <span className="text-[11px] font-semibold">{stats}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
