/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuMail, LuUser, LuInstagram, LuYoutube, LuLoader } from "react-icons/lu";

const DEAL_STAGES = [
  { value: "LEAD", label: "Lead" },
  { value: "OUTREACH", label: "Outreach" },
  { value: "NEGOTIATION", label: "Negotiation" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "CONTRACT_SENT", label: "Contract Sent" },
  { value: "APPROVED", label: "Approved" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "LOST", label: "Lost" },
  { value: "CANCELLED", label: "Cancelled" },
];

export type DealHeaderProps = {
  title: string;
  assignee: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: string;
  status: string;
  stage?: string;
  platforms: string[];
  logo?: string;
  onStageChange?: (stage: string) => void;
  isUpdatingStage?: boolean;
};

const DealHeader = ({
  title,
  assignee,
  amount,
  status,
  stage,
  platforms,
  logo,
  onStageChange,
  isUpdatingStage,
}: DealHeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleStageSelect = (newStage: string) => {
    if (newStage !== stage) {
      onStageChange?.(newStage);
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative group rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-8 transition-all">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 via-blue-500 to-emerald-500" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Logo Container */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shrink-0 transition-colors">
            {logo ? (
              <img src={logo} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-brand-500/10 dark:bg-brand-500/20 rounded-lg flex items-center justify-center text-brand-600 dark:text-brand-500">
                <span className="font-bold text-xl">{title[0]}</span>
              </div>
            )}
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">{title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
              <div className="flex items-center gap-1.5">
                <LuUser size={14} className="text-gray-400 dark:text-gray-500" />
                <span>{assignee.name}</span>
              </div>
              {assignee.email && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <LuMail size={14} className="text-gray-400 dark:text-gray-500" />
                    <span>{assignee.email}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:text-right">
          <div className="text-2xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-500 tracking-tighter">
            {amount}
          </div>

          {/* Clickable Stage Badge */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={isUpdatingStage}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[2px] text-gray-500 dark:text-gray-400 transition-all hover:border-brand-500/50 hover:text-brand-500 cursor-pointer disabled:opacity-50"
            >
              {isUpdatingStage ? (
                <LuLoader size={10} className="animate-spin" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              )}
              {status}
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 z-50 w-48 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl max-h-64 overflow-y-auto">
                {DEAL_STAGES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => handleStageSelect(s.value)}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                      s.value === stage
                        ? "bg-brand-500/10 text-brand-600 dark:text-brand-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Platforms:</span>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors">
              {platform.toLowerCase().includes("instagram") ? <LuInstagram size={14} /> : <LuYoutube size={14} />}
              {platform}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealHeader;
