"use client";

import React, { useState } from "react";
import { LuClock, LuEllipsisVertical, LuToggleLeft, LuToggleRight, LuPencil, LuTrash2 } from "react-icons/lu";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";

export interface ReminderRuleCardProps {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  status: "active" | "paused";
  stats: string;
  onToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ReminderRuleCard = ({
  id,
  title,
  category,
  description,
  icon: Icon,
  iconColor,
  status,
  stats,
  onToggle,
  onEdit,
  onDelete,
  ...props
}: ReminderRuleCardProps & { [key: string]: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="dropdown-toggle p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <LuEllipsisVertical size={18} />
          </button>
          
          <Dropdown isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} className="w-[180px] origin-top-right !right-0 !left-auto">
            <div className="p-2 space-y-0.5">
              <DropdownItem 
                onClick={() => { onEdit?.(); setIsMenuOpen(false); }}
                className="flex items-center gap-3 py-2.5 group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover/item:text-brand-500 group-hover/item:bg-brand-500/10 transition-all">
                  <LuPencil size={14} />
                </div>
                <span className="text-xs font-bold transition-colors">Edit Rule</span>
              </DropdownItem>
              <DropdownItem 
                onClick={() => { onDelete?.(); setIsMenuOpen(false); }}
                className="flex items-center gap-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/5 flex items-center justify-center text-red-400 group-hover/item:text-red-500 group-hover/item:bg-red-500/10 transition-all">
                  <LuTrash2 size={14} />
                </div>
                <span className="text-xs font-bold">Delete Rule</span>
              </DropdownItem>
            </div>
          </Dropdown>
        </div>
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
