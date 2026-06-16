"use client";

import React from "react";
import { IconType } from "react-icons";
import { LuCheck, LuSmartphone, LuMail, LuFolder, LuSlack, LuWebhook } from "react-icons/lu";

export interface IntegrationCardProps {
  name: string;
  description: string;
  icon: IconType;
  status: "connected" | "disconnected" | "configured";
  metaLabel?: string;
  metaValue?: string;
  buttonLabel: string;
  onAction?: () => void;
}

export const IntegrationCard = ({
  name,
  description,
  icon: Icon,
  status,
  metaLabel,
  metaValue,
  buttonLabel,
  onAction
}: IntegrationCardProps) => {
  const isConnected = status === "connected" || status === "configured";

  return (
    <div className="group relative p-6 sm:p-8 rounded-[32px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all hover:border-brand-500/30 flex flex-col h-full overflow-hidden">
      {/* Top Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 group-hover:text-brand-500 group-hover:bg-brand-500/5 transition-all">
          <Icon size={28} />
        </div>
        
        {isConnected && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-500 text-[10px] font-bold uppercase tracking-widest border border-success-100 dark:border-success-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
            Connected
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 mb-8">
        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {/* Meta Area */}
      <div className="mt-auto space-y-6">
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] block">
              {metaLabel || "Status"}
            </span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {metaValue || (status === "connected" ? "Active" : "Not Connected")}
            </span>
          </div>

          <button 
            onClick={onAction}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.98] ${
              isConnected 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700' 
                : 'bg-brand-500 text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600'
            }`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
