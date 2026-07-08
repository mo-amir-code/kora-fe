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
  LuFileText,
  LuLoader
} from "react-icons/lu";
import { useCreateDeal, useUpdateDeal } from "@/hooks/useDeals";
import { useBrandsList } from "@/hooks/useBrands";
import { useCurrency } from "@/hooks/useCurrency";
import { getErrorMessage } from "@/hooks/useAuth";
import { Button, InputField } from "@/components/ui";

interface Deliverable {
  id: string;
  type: string;
  quantity: number;
  dueDate: string;
}

interface AddDealFormProps {
  onSave: () => void;
  onCancel: () => void;
  editDeal?: {
    id: string;
    title: string;
    brandId: string;
    contactId: string | null;
    stage: string;
    amount: string | null;
    currency: string;
    paymentTerms: string | null;
    paymentDueDate: string | null;
    platforms: string[];
    contractUrl: string | null;
    notes: string | null;
    deliverables: { id: string; type: string; quantity: number; dueDate: string | null }[];
  };
}

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

const PAYMENT_TERMS = [
  { value: "", label: "Select..." },
  { value: "ADVANCE_100", label: "100% Advance" },
  { value: "ADVANCE_50", label: "50% Advance" },
  { value: "ON_DELIVERY", label: "On Delivery" },
  { value: "NET_15", label: "Net 15" },
  { value: "NET_30", label: "Net 30" },
  { value: "NET_45", label: "Net 45" },
  { value: "NET_60", label: "Net 60" },
  { value: "CUSTOM", label: "Custom" },
];

const DELIVERABLE_TYPES = [
  { value: "INSTAGRAM_REEL", label: "Instagram Reel" },
  { value: "INSTAGRAM_POST", label: "Instagram Post" },
  { value: "INSTAGRAM_STORY", label: "Instagram Story" },
  { value: "YOUTUBE_VIDEO", label: "YouTube Video" },
  { value: "YOUTUBE_SHORT", label: "YouTube Short" },
  { value: "TIKTOK_VIDEO", label: "TikTok Video" },
  { value: "LINKEDIN_POST", label: "LinkedIn Post" },
  { value: "X_POST", label: "X Post" },
  { value: "BLOG_POST", label: "Blog Post" },
  { value: "NEWSLETTER", label: "Newsletter" },
  { value: "LIVE_STREAM", label: "Live Stream" },
  { value: "UGC_VIDEO", label: "UGC Video" },
  { value: "OTHER", label: "Other" },
];

const PLATFORMS = ["Instagram", "YouTube", "TikTok", "LinkedIn", "X"];
const CURRENCIES = ["INR", "USD"];

const AddDealForm = ({ onSave, onCancel, editDeal }: AddDealFormProps) => {
  const createDeal = useCreateDeal();
  const updateDeal = useUpdateDeal(editDeal?.id ?? "");
  const { data: brands, isLoading: brandsLoading } = useBrandsList();
  const { baseCurrency, symbol } = useCurrency();
  const isEditMode = !!editDeal;

  const [formData, setFormData] = useState({
    title: editDeal?.title ?? "",
    amount: editDeal?.amount ?? "",
    currency: baseCurrency || editDeal?.currency || "USD",
    brandId: editDeal?.brandId ?? "",
    contactId: editDeal?.contactId ?? "",
    paymentTerms: editDeal?.paymentTerms ?? "",
    paymentDueDate: editDeal?.paymentDueDate?.split("T")[0] ?? "",
    contractUrl: editDeal?.contractUrl ?? "",
    notes: editDeal?.notes ?? "",
  });

  React.useEffect(() => {
    if (baseCurrency) {
      setFormData((prev) => ({ ...prev, currency: baseCurrency }));
    }
  }, [baseCurrency]);
  const [stage, setStage] = useState(editDeal?.stage ?? "LEAD");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(editDeal?.platforms ?? []);
  const [deliverables, setDeliverables] = useState<Deliverable[]>(
    editDeal?.deliverables?.map((d) => ({ id: d.id, type: d.type, quantity: d.quantity, dueDate: d.dueDate?.split("T")[0] ?? "" })) ??
    [{ id: "1", type: "INSTAGRAM_REEL", quantity: 1, dueDate: "" }]
  );
  const [formError, setFormError] = useState("");

  // Get contacts for selected brand
  const selectedBrand = brands?.find((b) => b.id === formData.brandId);
  const brandContacts = selectedBrand?.contacts ?? [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset contact when brand changes
      if (name === "brandId") {
        updated.contactId = "";
      }
      return updated;
    });
    setFormError("");
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const addDeliverable = () => {
    setDeliverables([...deliverables, { id: Date.now().toString(), type: "INSTAGRAM_REEL", quantity: 1, dueDate: "" }]);
  };

  const removeDeliverable = (id: string) => {
    if (deliverables.length > 1) setDeliverables(deliverables.filter((d) => d.id !== id));
  };

  const updateDeliverable = (id: string, field: keyof Deliverable, value: string | number) => {
    setDeliverables((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const handleSave = async () => {
    if (!formData.title.trim()) { setFormError("Deal title is required"); return; }
    if (!isEditMode && !formData.brandId) { setFormError("Please select a brand"); return; }

    setFormError("");

    const dealData = {
      title: formData.title.trim(),
      stage,
      amount: formData.amount ? parseFloat(formData.amount) : undefined,
      currency: formData.currency,
      paymentTerms: formData.paymentTerms || undefined,
      paymentDueDate: formData.paymentDueDate || undefined,
      platforms: selectedPlatforms,
      contractUrl: formData.contractUrl.trim() || undefined,
      notes: formData.notes.trim() || undefined,
    };

    if (isEditMode) {
      updateDeal.mutate(
        { ...dealData, contactId: formData.contactId || undefined },
        {
          onSuccess: () => onSave(),
          onError: (err) => setFormError(getErrorMessage(err)),
        }
      );
    } else {
      createDeal.mutate(
        {
          ...dealData,
          brandId: formData.brandId,
          contactId: formData.contactId || undefined,
          deliverables: deliverables
            .filter((d) => d.type)
            .map((d) => ({
              type: d.type,
              quantity: d.quantity || 1,
              dueDate: d.dueDate || undefined,
            })),
        },
        {
          onSuccess: () => onSave(),
          onError: (err) => setFormError(getErrorMessage(err)),
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto w-full px-1 sm:px-0">
      <div className="space-y-1 px-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{isEditMode ? "Edit Deal" : "Add New Deal"}</h1>
        <p className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{isEditMode ? "Update the deal details below." : "Fill in the details below to track a new brand partnership."}</p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Deal Information */}
        <div className="p-5 sm:p-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50 dark:border-gray-800">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500"><LuInfo size={18} strokeWidth={2.5} /></div>
            <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Deal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            <InputField
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Q4 Tech Review"
              label={<span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Deal Title</span>}
              required
              containerClassName="md:col-span-2 lg:col-span-1"
            />
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              <InputField
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                label={<span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Amount</span>}
                className="font-bold"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 pl-1">
                  <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest">Currency</label>
                  <div className="group relative flex items-center cursor-pointer">
                    <LuInfo size={14} className="text-gray-400 hover:text-brand-500 transition-colors" />
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 w-52 rounded-xl bg-gray-900 dark:bg-gray-800 p-2.5 text-[11px] font-medium text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 text-center leading-snug border border-gray-700/50">
                      You can change the currency from the Settings page for the entire app.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <select
                    name="currency"
                    value={formData.currency}
                    disabled
                    className="w-full appearance-none bg-gray-100/80 dark:bg-gray-800/20 border border-gray-200/80 dark:border-gray-800/80 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none transition-all opacity-80"
                  >
                    <option value={formData.currency}>{formData.currency} ({symbol})</option>
                  </select>
                  <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 w-52 rounded-xl bg-gray-900 dark:bg-gray-800 p-2.5 text-[11px] font-medium text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 text-center leading-snug border border-gray-700/50">
                    You can change the currency from the Settings page for the entire app.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Brand <span className="text-rose-500">*</span></label>
              <div className="relative">
                <select name="brandId" value={formData.brandId} onChange={handleInputChange} disabled={brandsLoading} className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all disabled:opacity-50">
                  <option value="">{brandsLoading ? "Loading brands..." : brands?.length ? "Select a brand..." : "No brands — create one first"}</option>
                  {brands?.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="lg:col-span-2 space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Contact</label>
              <div className="relative">
                <select name="contactId" value={formData.contactId} onChange={handleInputChange} className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all">
                  <option value="">Select a contact...</option>
                  {brandContacts.map((c) => <option key={c.id} value={c.id}>{c.name}{c.role ? ` (${c.role})` : ""}</option>)}
                </select>
                <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Terms */}
        <div className="p-5 sm:p-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50 dark:border-gray-800">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500"><LuClock size={18} strokeWidth={2.5} /></div>
            <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Timeline & Terms</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            <div className="space-y-4">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Current Stage</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DEAL_STAGES.map((s) => (
                  <button key={s.value} type="button" onClick={() => setStage(s.value)} className={`px-3 py-3 rounded-xl text-xs font-bold transition-all border ${stage === s.value ? "bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400" : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-300"}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Payment Terms</label>
                <div className="relative">
                  <select name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange} className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all">
                    {PAYMENT_TERMS.map((pt) => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                  </select>
                  <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <InputField
                type="date"
                name="paymentDueDate"
                value={formData.paymentDueDate}
                onChange={handleInputChange}
                onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
                label={<span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Payment Due Date</span>}
                icon={<LuCalendar size={16} />}
                className="cursor-pointer"
              />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Platforms</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button key={p} type="button" onClick={() => togglePlatform(p)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedPlatforms.includes(p) ? "bg-brand-500/10 border-brand-500/50 text-brand-600 dark:text-brand-400" : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 text-gray-500"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="p-5 sm:p-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><LuLibrary size={18} strokeWidth={2.5} /></div>
              <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Deliverables</h2>
            </div>
            <button type="button" onClick={addDeliverable} className="flex items-center gap-2 text-xs font-bold text-brand-500 hover:text-brand-600 uppercase tracking-widest">
              <LuPlus size={14} strokeWidth={3} /> Add More
            </button>
          </div>

          <div className="space-y-4">
            {deliverables.map((d) => (
              <div key={d.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 items-stretch md:items-end p-4 rounded-xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800/50">
                <div className="md:col-span-5 space-y-2">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-tight ml-1">Type</label>
                  <div className="relative">
                    <select value={d.type} onChange={(e) => updateDeliverable(d.id, "type", e.target.value)} className="w-full appearance-none bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all">
                      {DELIVERABLE_TYPES.map((dt) => <option key={dt.value} value={dt.value}>{dt.label}</option>)}
                    </select>
                    <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                  </div>
                </div>
                <div className="flex gap-4 md:col-span-6">
                  <div className="flex-1 space-y-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-tight ml-1">Qty</label>
                    <input type="number" value={d.quantity} onChange={(e) => updateDeliverable(d.id, "quantity", parseInt(e.target.value) || 1)} className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all text-center" />
                  </div>
                  <div className="flex-[2] space-y-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-tight ml-1">Due Date</label>
                    <input type="date" value={d.dueDate} onChange={(e) => updateDeliverable(d.id, "dueDate", e.target.value)} onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()} className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all cursor-pointer" />
                  </div>
                </div>
                <div className="md:col-span-1 flex justify-end items-center">
                  {deliverables.length > 1 && (
                    <button type="button" onClick={() => removeDeliverable(d.id)} className="p-2.5 rounded-xl border border-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                      <LuTrash2 size={16} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-5 sm:p-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50 dark:border-gray-800">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><LuFileText size={18} strokeWidth={2.5} /></div>
            <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Additional Info</h2>
          </div>
          <div className="space-y-5">
            <InputField
              type="text"
              name="contractUrl"
              value={formData.contractUrl}
              onChange={handleInputChange}
              placeholder="https://drive.google.com/..."
              label={<span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Contract URL</span>}
              icon={<LuLink size={16} />}
            />
            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Internal Notes</label>
              <textarea rows={4} name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Add guidelines or key points..." className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 pb-10">
          {formError && <p className="text-red-400 text-xs font-medium mr-auto">{formError}</p>}
          <Button
            variant="neutral"
            onClick={onCancel}
            className="w-full sm:w-auto px-10 py-3.5 text-sm font-bold uppercase tracking-widest"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            isLoading={createDeal.isPending || updateDeal.isPending}
            className="w-full sm:w-auto px-10 py-3.5 text-sm font-bold uppercase tracking-widest"
          >
            {isEditMode ? "Update Deal" : "Save Deal"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddDealForm;
