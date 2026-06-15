"use client";

import React, { useState } from "react";
import { LuSave, LuSmartphone, LuMessageCircle } from "react-icons/lu";

export const ProfileFormCard = () => {
  const [formData, setFormData] = useState({
    fullName: "Priya Sharma",
    handle: "priyacreates",
    mobile: "+91 9876543210",
    whatsapp: "+91 9876543210",
    sameAsMobile: true
  });

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="space-y-10">
        {/* Primary Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 rounded-full bg-brand-500" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">
              My Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input 
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl px-5 py-3.5 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Handle
              </label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 font-bold transition-colors group-focus-within:text-brand-500">@</span>
                <input 
                  type="text"
                  value={formData.handle}
                  onChange={(e) => setFormData(p => ({ ...p, handle: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl pl-10 pr-5 py-3.5 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full bg-success-500" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                Contact Details
              </h3>
            </div>
            
            <button 
              type="button"
              onClick={() => setFormData(p => ({ ...p, sameAsMobile: !p.sameAsMobile }))}
              className="flex items-center gap-2 group"
            >
              <div className={`w-3 h-3 rounded-full border-2 transition-all ${formData.sameAsMobile ? 'bg-success-500 border-success-500' : 'border-gray-300 dark:border-white/10'}`} />
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight group-hover:text-success-500 transition-colors">
                Same as mobile
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Mobile Number
              </label>
              <div className="relative group">
                <LuSmartphone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                <input 
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => setFormData(p => ({ ...p, mobile: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl pl-12 pr-5 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all tracking-wider font-mono text-right"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                WhatsApp Number
              </label>
              <div className="relative group">
                <LuMessageCircle size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-success-500" />
                <input 
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(p => ({ ...p, whatsapp: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl pl-12 pr-5 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all tracking-wider font-mono text-right"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer Actions */}
        <div className="pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
          <button 
            type="button"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-brand-500 text-white text-sm font-bold hover:bg-brand-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <LuSave size={18} strokeWidth={2.5} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
