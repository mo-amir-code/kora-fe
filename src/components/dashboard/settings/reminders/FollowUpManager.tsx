"use client";

import React from "react";
import { LuCalendarClock, LuPlus, LuTrash2, LuClock } from "react-icons/lu";

interface FollowUpManagerProps {
  dates: string[];
  onChange: (dates: string[]) => void;
}

export const parseDurationToMinutes = (durationStr: string): number => {
  const parts = durationStr.trim().split(/\s+/);
  const val = parseFloat(parts[0]);
  const unit = parts[1]?.toLowerCase();
  
  if (isNaN(val)) return 0;
  
  switch (unit) {
    case "minutes":
    case "minute":
      return val;
    case "hours":
    case "hour":
      return val * 60;
    case "days":
    case "day":
      return val * 24 * 60;
    case "weeks":
    case "week":
      return val * 7 * 24 * 60;
    default:
      return 0;
  }
};

export const FollowUpManager = ({ dates: followups = [], onChange }: FollowUpManagerProps) => {
  const addFollowUp = () => {
    if (followups.length >= 2) return;
    onChange([...followups, "2 hours"]);
  };

  const removeFollowUp = (index: number) => {
    onChange(followups.filter((_, i) => i !== index));
  };

  const updateFollowUp = (index: number, val: string, unit: string) => {
    const newFollowups = [...followups];
    newFollowups[index] = `${val} ${unit}`;
    onChange(newFollowups);
  };

  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
            <LuCalendarClock size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Scheduled Follow-ups</h2>
        </div>
        <button
          onClick={addFollowUp}
          disabled={followups.length >= 2}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/10 text-brand-500 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-500 transition-all"
        >
          <LuPlus size={14} />
          {followups.length >= 2 ? "Max 2 Reached" : "Add Follow-up"}
        </button>
      </div>

      <div className="space-y-3">
        {followups.map((f, index) => {
          const parts = f.split(" ");
          const val = parts[0] === undefined ? "2" : parts[0];
          const unit = parts[1] || "hours";
          const isInvalid = parseDurationToMinutes(f) < 30;
          return (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border transition-all group ${
                isInvalid ? "border-red-300 dark:border-red-900/50" : "border-gray-100 dark:border-gray-800"
              }`}
            >
              <div className="p-2 rounded-lg bg-white dark:bg-gray-900 text-gray-400">
                <LuClock size={16} />
              </div>
              <input
                type="text"
                value={val}
                placeholder="2"
                onChange={(e) => updateFollowUp(index, e.target.value, unit)}
                className={`w-16 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white text-center transition-all ${
                  isInvalid ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700"
                }`}
              />
              <select
                value={unit}
                onChange={(e) => updateFollowUp(index, val, e.target.value)}
                className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white outline-none"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
              <button
                onClick={() => removeFollowUp(index)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <LuTrash2 size={16} />
              </button>
            </div>
          );
        })}

        {followups.length === 0 && (
          <div className="py-10 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl">
            <p className="text-sm font-medium text-gray-400">No follow-ups scheduled yet.</p>
          </div>
        )}

        {followups.some(f => parseDurationToMinutes(f) < 30) && (
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest text-center mt-2 animate-in fade-in duration-200">
            ⚠️ Each scheduled follow-up interval must be at least 30 minutes
          </p>
        )}

        {followups.length >= 2 && !followups.some(f => parseDurationToMinutes(f) < 30) && (
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center mt-2">
            ⚠️ Maximum of 2 follow-ups allowed per rule
          </p>
        )}
      </div>
    </div>
  );
};
