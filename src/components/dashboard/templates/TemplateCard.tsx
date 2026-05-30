"use client";

import React from "react";
import { LuClock, LuPencil, LuArrowRight } from "react-icons/lu";

export type TemplateCardProps = {
  title: string;
  preview: string;
  platforms: ("WhatsApp" | "Email")[];
  lastUsed: string;
  onEdit?: () => void;
  onUse?: () => void;
};

const TemplateCard = ({
  title,
  preview,
  platforms,
  lastUsed,
  onEdit,
  onUse,
}: TemplateCardProps) => {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl dark:hover:shadow-none group">
      {/* Header: Title & Platforms */}
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {title}
        </h3>
        <div className="flex gap-1.5 sm:gap-2 shrink-0">
          {platforms.map((platform) => (
            <span
              key={platform}
              className={`
                px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider
                ${platform === "WhatsApp"
                  ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                }
              `}
            >
              {platform}
            </span>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50 min-h-[80px]">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {preview}
        </p>
      </div>

      {/* Footer: Meta & Actions */}
      <div className="mt-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-4 pt-4 border-t border-gray-50 dark:border-gray-800">
        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest w-full sm:w-auto">
          <LuClock className="h-3.5 w-3.5" strokeWidth={3} />
          <span>Last used: {lastUsed}</span>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={onEdit}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-[10px] sm:text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all uppercase tracking-widest active:scale-95"
          >
            <LuPencil className="h-3.5 w-3.5" strokeWidth={2.5} />
            Edit
          </button>
          <button 
            onClick={onUse}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-brand-600 dark:bg-brand-600 text-[10px] sm:text-[11px] font-bold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all uppercase tracking-widest active:scale-95"
          >
            Use Template
            <LuArrowRight className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
