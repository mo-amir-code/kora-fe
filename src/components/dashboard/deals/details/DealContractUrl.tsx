"use client";

import React, { useState, useEffect } from "react";
import { LuPencil, LuCheck, LuX, LuLoader, LuLink, LuExternalLink } from "react-icons/lu";

interface DealContractUrlProps {
  contractUrl: string | null;
  onUpdate: (url: string | null) => void;
  isUpdating?: boolean;
}

const DealContractUrl = ({ contractUrl, onUpdate, isUpdating }: DealContractUrlProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(contractUrl ?? "");

  useEffect(() => {
    setEditValue(contractUrl ?? "");
  }, [contractUrl]);

  const handleSave = () => {
    onUpdate(editValue.trim() || null);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(contractUrl ?? "");
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-[#13141c]/50 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800/40 transition-colors relative">
      {isUpdating && (
        <div className="absolute inset-0 z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-[1px] rounded-3xl flex items-center justify-center">
          <LuLoader className="h-4 w-4 animate-spin text-brand-500" />
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-500">
            <LuLink className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Contract</h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all"
          >
            <LuPencil size={16} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <input
            type="url"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder="https://drive.google.com/..."
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500 font-mono text-xs"
            autoFocus
          />
          <div className="flex items-center gap-2 justify-end">
            <button onClick={handleCancel} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <LuX size={16} />
            </button>
            <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all">
              <LuCheck size={14} strokeWidth={3} />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          {contractUrl ? (
            <a
              href={contractUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors break-all"
            >
              <LuExternalLink size={14} className="shrink-0" />
              <span className="truncate">{contractUrl}</span>
            </a>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 italic">No contract URL. Click the pencil to add one.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DealContractUrl;
