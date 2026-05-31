"use client";

import React, { useState } from "react";
import { 
  LuPlus, 
  LuInfo, 
  LuCalendar, 
  LuLink, 
  LuTrash2, 
  LuChevronDown, 
  LuSave,
  LuClock,
  LuLibrary,
  LuFileText
} from "react-icons/lu";

interface Deliverable {
  id: string;
  type: string;
  quantity: number;
  dueDate: string;
}

interface AddDealFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
}

const STAGES = ["Pitched", "Active", "Delivered", "Paid"];
const PLATFORMS = ["Instagram", "YouTube", "TikTok", "X (Twitter)"];
const CURRENCIES = ["INR", "USD", "EUR", "GBP"];

const AddDealForm = ({ onSave, onCancel }: AddDealFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    currency: "INR",
    brand: "",
    contact: "",
    paymentTerms: "Net 15",
    paymentDueDate: "",
    contractUrl: "",
    notes: ""
  });

  const [stage, setStage] = useState("Pitched");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram"]);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: "1", type: "Instagram Reel", quantity: 1, dueDate: "" }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addDeliverable = () => {
    setDeliverables([
      ...deliverables,
      { id: Date.now().toString(), type: "Instagram Reel", quantity: 1, dueDate: "" }
    ]);
  };

  const removeDeliverable = (id: string) => {
    if (deliverables.length > 1) {
      setDeliverables(deliverables.filter(d => d.id !== id));
    }
  };

  const updateDeliverable = (id: string, field: keyof Deliverable, value: any) => {
    setDeliverables(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const handleSave = () => {
    onSave({
      ...formData,
      stage,
      selectedPlatforms,
      deliverables
    });
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto w-full px-1 sm:px-0">
      {/* Page Header */}
      <div className="space-y-1 px-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Add New Deal</h1>
        <p className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
          Fill in the details below to track a new brand partnership.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Deal Information Section */}
        <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 sm:space-y-8 transition-all">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50 dark:border-gray-800">
            <div className="p-1.5 sm:p-2 rounded-lg bg-brand-500/10 text-brand-500">
              <LuInfo size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Deal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            <div className="md:col-span-2 lg:col-span-1 space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Deal Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Q4 Tech Review"
                className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Amount</label>
                <input 
                  type="number" 
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Currency</label>
                <div className="relative">
                  <select 
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <LuChevronDown className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-1 space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Brand</label>
              <div className="relative">
                <select 
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                >
                  <option value="">Select a brand...</option>
                  <option value="TechNova">TechNova</option>
                  <option value="FitLife">FitLife</option>
                </select>
                <LuChevronDown className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-2 space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Primary Contact</label>
              <div className="relative">
                <select 
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                >
                  <option value="">Select a contact...</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Sarah Smith">Sarah Smith</option>
                </select>
                <LuChevronDown className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Terms Section */}
        <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 sm:space-y-8 transition-all">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50 dark:border-gray-800">
            <div className="p-1.5 sm:p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <LuClock size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Timeline & Terms</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            {/* Stage Selector */}
            <div className="space-y-4">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Current Stage</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                {STAGES.map(s => (
                  <button 
                    key={s}
                    onClick={() => setStage(s)}
                    className={`px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl text-xs font-bold transition-all border ${
                      stage === s 
                      ? "bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                      : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-4">
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Payment Terms</label>
                <div className="relative">
                  <select 
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  >
                    <option>Net 15</option>
                    <option>Net 30</option>
                    <option>Advanced (100%)</option>
                    <option>50% Advance, 50% Post</option>
                  </select>
                  <LuChevronDown className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Payment Due Date</label>
                <div className="relative group/input">
                  <LuCalendar size={18} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-brand-500 transition-colors pointer-events-none" strokeWidth={2.5} />
                  <input 
                    type="date" 
                    name="paymentDueDate"
                    value={formData.paymentDueDate}
                    onChange={handleInputChange}
                    onClick={(e) => (e.currentTarget as any).showPicker?.()}
                    className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl pl-11 sm:pl-12 pr-4 sm:pr-5 py-3.5 sm:py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            {/* Platforms */}
            <div className="lg:col-span-2 space-y-4 pt-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Platforms</label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {PLATFORMS.map(p => (
                  <button 
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold border transition-all ${
                      selectedPlatforms.includes(p)
                      ? "bg-brand-500/10 border-brand-500/50 text-brand-600 dark:text-brand-400"
                      : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 text-gray-500"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 sm:space-y-8 transition-all">
          <div className="flex items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-800 gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <LuLibrary size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Deliverables</h2>
            </div>
            <button 
              onClick={addDeliverable}
              className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors uppercase tracking-widest whitespace-nowrap"
            >
              <div className="p-1 rounded-md bg-brand-500/10">
                <LuPlus size={12} className="sm:hidden" strokeWidth={3} />
                <LuPlus size={14} className="hidden sm:block" strokeWidth={3} />
              </div>
              Add More
            </button>
          </div>

          <div className="space-y-4">
            {deliverables.map((d) => (
              <div key={d.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 items-stretch md:items-end p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800/50 transition-all">
                <div className="md:col-span-5 space-y-1.5 sm:space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight ml-1">Type</label>
                  <div className="relative">
                    <select 
                      value={d.type}
                      onChange={(e) => updateDeliverable(d.id, 'type', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all"
                    >
                      <option>Instagram Reel</option>
                      <option>YouTube Video</option>
                      <option>TikTok Video</option>
                      <option>X Post</option>
                      <option>Other</option>
                    </select>
                    <LuChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>
                <div className="flex gap-4 md:col-span-6">
                  <div className="flex-1 space-y-1.5 sm:space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight ml-1">Quantity</label>
                    <input 
                      type="number" 
                      value={d.quantity}
                      onChange={(e) => updateDeliverable(d.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all text-center"
                    />
                  </div>
                  <div className="flex-[2] space-y-1.5 sm:space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight ml-1">Due Date</label>
                    <div className="relative">
                      <LuCalendar size={14} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input 
                        type="date" 
                        value={d.dueDate}
                        onChange={(e) => updateDeliverable(d.id, 'dueDate', e.target.value)}
                        onClick={(e) => (e.currentTarget as any).showPicker?.()}
                        className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1 flex justify-end items-center pt-2 md:pb-1">
                  <button 
                    onClick={() => removeDeliverable(d.id)}
                    className={`flex items-center justify-center gap-2 w-full md:w-auto p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all ${deliverables.length === 1 ? "hidden" : ""}`}
                  >
                    <LuTrash2 size={16} strokeWidth={2.5} />
                    <span className="md:hidden text-[10px] font-bold uppercase tracking-widest">Remove Deliverable</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 sm:space-y-8 transition-all">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50 dark:border-gray-800">
            <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <LuFileText size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Additional Info</h2>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Contract URL</label>
              <div className="relative group/input">
                <LuLink size={18} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-brand-500 transition-colors" strokeWidth={2.5} />
                <input 
                  type="text" 
                  name="contractUrl"
                  value={formData.contractUrl}
                  onChange={handleInputChange}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl pl-11 sm:pl-12 pr-4 sm:pr-5 py-3.5 sm:py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-mono text-[11px] sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Internal Notes</label>
              <textarea 
                rows={4}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add guidelines or key points..."
                className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4 sm:py-5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 pb-10">
          <button 
            onClick={onCancel}
            className="w-full sm:w-auto px-10 py-3.5 rounded-xl sm:rounded-2xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all uppercase tracking-widest active:scale-95"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto px-10 py-3.5 rounded-xl sm:rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-xl shadow-brand-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            <LuSave size={18} strokeWidth={2.5} />
            Save Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDealForm;
