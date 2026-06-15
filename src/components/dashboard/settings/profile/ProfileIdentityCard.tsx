"use client";

import React, { useRef, useState } from "react";
import { LuCamera, LuTrash2, LuImage } from "react-icons/lu";

export const ProfileIdentityCard = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 group">
      <div className="relative flex flex-col items-center gap-6">
        {/* Avatar Display */}
        <div className="relative group/avatar">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-gray-50 dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-transform duration-500 group-hover/avatar:scale-105">
            {avatar ? (
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 dark:text-gray-600">
                <LuCamera size={40} strokeWidth={1.5} />
              </div>
            )}
          </div>
          
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 p-2 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-all active:scale-90"
            title="Update Photo"
          >
            <LuCamera size={16} />
          </button>
        </div>

        {/* Identity Info */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Priya Sharma</h2>
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest">
            @priyacreates
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-[0.98]"
          >
            <LuImage size={14} />
            Change
          </button>
          <button 
            type="button"
            onClick={() => setAvatar(null)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-error-100 dark:border-error-500/20 text-error-500 text-xs font-bold hover:bg-error-50 dark:hover:bg-error-500/5 transition-all active:scale-[0.98]"
          >
            <LuTrash2 size={14} />
            Remove
          </button>
        </div>

        {/* Requirements Text */}
        <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center leading-relaxed font-medium uppercase tracking-tighter">
            Recommended: 500x500px • Max: 5MB (JPG, PNG)
          </p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
