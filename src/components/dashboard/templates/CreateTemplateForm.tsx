"use client";

import React, { useState } from "react";
import { 
  LuSave, 
  LuLayoutTemplate, 
  LuChevronDown, 
  LuMessageSquare, 
  LuMail, 
  LuPlus 
} from "react-icons/lu";

interface CreateTemplateFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  "Payment Reminder",
  "Invoice Follow-up",
  "Deal Pitch",
  "Deliverable Submitted",
  "Thank You"
];

const PLACEHOLDERS = [
  "[Brand Name]",
  "[Deal Amount]",
  "[Due Date]",
  "[Contact Name]",
  "[Invoice Link]"
];

const CreateTemplateForm = ({ onSave, onCancel }: CreateTemplateFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [channels, setChannels] = useState({ whatsapp: true, email: false });
  const [body, setBody] = useState("");

  const toggleChannel = (channel: 'whatsapp' | 'email') => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  const addPlaceholder = (placeholder: string) => {
    setBody(prev => prev + " " + placeholder);
  };

  const handleSave = () => {
    onSave({
      name,
      category,
      channels,
      body
    });
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create New Template</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-medium sm:hidden">Draft a custom message for your partners</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onCancel}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-[11px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 uppercase tracking-widest"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-[11px] sm:text-xs font-bold shadow-lg shadow-brand-500/20 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <LuSave size={14} strokeWidth={2.5} />
            Save Template
          </button>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-8 sm:space-y-10 transition-all">
        
        {/* Template Configuration */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50 dark:border-gray-800">
            <div className="p-1.5 sm:p-2 rounded-lg bg-brand-500/10 text-brand-500">
              <LuLayoutTemplate size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Template Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Template Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Payment Reminder"
                className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Category</label>
              <div className="relative">
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <LuChevronDown className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Channels */}
        <div className="space-y-5 sm:space-y-6">
          <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Distribution Channels</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* ... rest of the code remains the same ... */}
            <button 
              onClick={() => toggleChannel('whatsapp')}
              className={`flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all ${
                channels.whatsapp 
                ? "bg-emerald-500/5 border-emerald-500 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500 dark:text-emerald-400" 
                : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 text-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <LuMessageSquare size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                <span className="text-sm font-bold">WhatsApp</span>
              </div>
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                channels.whatsapp ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300 dark:border-gray-700"
              }`}>
                {channels.whatsapp && <div className="w-1.5 h-3 border-r-2 border-b-2 border-white rotate-45 mb-0.5" />}
              </div>
            </button>

            <button 
              onClick={() => toggleChannel('email')}
              className={`flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all ${
                channels.email 
                ? "bg-brand-500/5 border-brand-500 text-brand-600 dark:bg-brand-500/10 dark:border-brand-500 dark:text-brand-400" 
                : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 text-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <LuMail size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                <span className="text-sm font-bold">Email</span>
              </div>
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                channels.email ? "bg-brand-500 border-brand-500 text-white" : "border-gray-300 dark:border-gray-700"
              }`}>
                {channels.email && <div className="w-1.5 h-3 border-r-2 border-b-2 border-white rotate-45 mb-0.5" />}
              </div>
            </button>
          </div>
        </div>

        {/* Template Body */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Template Body</label>
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Markdown supported</span>
          </div>
          <div className="relative group">
            <textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              placeholder="Hey [Contact Name], just a quick nudge..."
              className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-sm sm:text-base font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none shadow-inner"
            />
          </div>

          {/* Placeholder Toolbar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 scrollbar-hide overflow-x-auto pb-1">
            {PLACEHOLDERS.map(ph => (
              <button 
                key={ph}
                onClick={() => addPlaceholder(ph)}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800 text-[10px] sm:text-[11px] font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all active:scale-95 whitespace-nowrap"
              >
                <div className="flex items-center">
                  <LuPlus size={10} className="sm:hidden" strokeWidth={3} />
                  <LuPlus size={12} className="hidden sm:block" strokeWidth={3} />
                </div>
                {ph}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplateForm;
