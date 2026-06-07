"use client";

import React, { useState, useRef } from "react";
import { 
  LuCloudUpload, 
  LuGlobe, 
  LuMail, 
  LuUser, 
  LuMessageSquare, 
  LuPlus, 
  LuChevronDown, 
  LuBadgeCheck, 
  LuFileText,
  LuSave,
  LuTrash2,
  LuImage,
  LuLoader
} from "react-icons/lu";
import { useCreateBrand, useUploadBrandLogo } from "@/hooks/useBrands";
import { brandService } from "@/services/brand.service";
import { getErrorMessage } from "@/hooks/useAuth";

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  whatsapp: string;
  isPrimary: boolean;
}

interface AddBrandFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const CATEGORIES = [
  { label: "Tech", value: "TECH" },
  { label: "Fashion", value: "FASHION" },
  { label: "Beauty", value: "BEAUTY" },
  { label: "Fitness", value: "FITNESS" },
  { label: "Food", value: "FOOD" },
  { label: "Travel", value: "TRAVEL" },
  { label: "Gaming", value: "GAMING" },
  { label: "Education", value: "EDUCATION" },
  { label: "Finance", value: "FINANCE" },
  { label: "Health", value: "HEALTH" },
  { label: "Entertainment", value: "ENTERTAINMENT" },
  { label: "E-Commerce", value: "E_COMMERCE" },
  { label: "SaaS", value: "SAAS" },
  { label: "Automotive", value: "AUTOMOTIVE" },
  { label: "Other", value: "OTHER" },
];

const AddBrandForm = ({ onSave, onCancel }: AddBrandFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [brandData, setBrandData] = useState({
    name: "",
    category: "TECH",
    website: "",
    gstin: "",
    notes: ""
  });
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "", role: "", email: "", whatsapp: "", isPrimary: true },
  ]);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const createBrand = useCreateBrand();
  const uploadLogo = useUploadBrandLogo();

  // ─── INPUT HANDLERS ─────────────────────────────────────────────────────────

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBrandData(prev => ({ ...prev, [name]: value }));
    setFormError("");
  };

  // ─── LOGO UPLOAD ──────────────────────────────────────────────────────────────

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setFormError("Please upload an image file");
      return;
    }

    // Show local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to GCP
    try {
      const result = await uploadLogo.mutateAsync(file);
      setLogoUrl(result.url);
    } catch (err) {
      setFormError(getErrorMessage(err));
      setLogoPreview(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) await processFile(file);
  };

  const removeLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoPreview(null);
    setLogoUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── CONTACTS ─────────────────────────────────────────────────────────────────

  const addContact = () => {
    setContacts([
      ...contacts,
      { id: Date.now().toString(), name: "", role: "", email: "", whatsapp: "", isPrimary: false },
    ]);
  };

  const removeContact = (id: string) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const updateContact = (id: string, field: keyof Contact, value: string | boolean) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // ─── SAVE ─────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    // Validate required fields
    if (!brandData.name.trim()) {
      setFormError("Brand name is required");
      return;
    }

    setFormError("");
    setIsSaving(true);

    try {
      // Step 1: Create brand
      const brand = await createBrand.mutateAsync({
        name: brandData.name.trim(),
        category: brandData.category,
        logoUrl: logoUrl || undefined,
        website: brandData.website.trim() || undefined,
        gstin: brandData.gstin.trim() || undefined,
        notes: brandData.notes.trim() ? [brandData.notes.trim()] : [],
      });

      // Step 2: Create contacts (only those with a name filled in)
      const validContacts = contacts.filter(c => c.name.trim());
      for (const contact of validContacts) {
        await brandService.createContact(brand.id, {
          name: contact.name.trim(),
          role: contact.role.trim() || undefined,
          email: contact.email.trim() || undefined,
          whatsapp: contact.whatsapp.trim() || undefined,
          isPrimary: contact.isPrimary,
        });
      }

      onSave();
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Add New Brand</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
          Onboard a new brand partner to track sponsorships, deals, and relationship intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Left Columns (Identity & Business) */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Brand Identity Section */}
          <div className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-50 dark:border-gray-800">
              <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
                <LuBadgeCheck size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Brand Identity</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest pl-1">
                  Brand Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={brandData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Nike, Adobe"
                  className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest pl-1">
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="category"
                    value={brandData.category}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6 sm:mb-8">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest pl-1">Website URL</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors">
                  <LuGlobe size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type="text" 
                  name="website"
                  value={brandData.website}
                  onChange={handleInputChange}
                  placeholder="https://brand.com"
                  className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-right"
                />
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Brand Logo</label>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              
              {!logoPreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center gap-3 sm:gap-4 hover:border-brand-500/50 hover:bg-brand-500/[0.02] transition-all cursor-pointer group"
                >
                  <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-brand-500 transition-colors">
                    {uploadLogo.isPending ? (
                      <LuLoader size={24} className="animate-spin" />
                    ) : (
                      <>
                        <LuCloudUpload size={24} strokeWidth={1.5} className="sm:hidden" />
                        <LuCloudUpload size={28} strokeWidth={1.5} className="hidden sm:block" />
                      </>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Click to upload or drag & drop</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-1 uppercase tracking-tight">SVG, PNG or JPG (max. 5MB)</p>
                  </div>
                </div>
              ) : (
                <div className="relative group/logo w-full max-w-sm">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 overflow-hidden flex items-center justify-center p-8 aspect-[2/1] relative">
                    {uploadLogo.isPending && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                        <LuLoader size={24} className="animate-spin text-white" />
                      </div>
                    )}
                    <img src={logoPreview} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 rounded-xl bg-white text-gray-900 hover:scale-110 transition-transform shadow-lg"
                        title="Change Logo"
                      >
                        <LuImage size={20} strokeWidth={2.5} />
                      </button>
                      <button 
                        type="button"
                        onClick={removeLogo}
                        className="p-3 rounded-xl bg-rose-500 text-white hover:scale-110 transition-transform shadow-lg"
                        title="Remove Logo"
                      >
                        <LuTrash2 size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Selected Brand Logo</p>
                </div>
              )}
            </div>
          </div>

          {/* Business Details Section */}
          <div className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-50 dark:border-gray-800">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <LuFileText size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Business Details</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest pl-1">GSTIN (Optional)</label>
                <input 
                  type="text" 
                  name="gstin"
                  value={brandData.gstin}
                  onChange={handleInputChange}
                  placeholder="22AAAAA0000A1Z5"
                  className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm font-bold tracking-wider text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Internal Notes</label>
                <textarea 
                  rows={4}
                  name="notes"
                  value={brandData.notes}
                  onChange={handleInputChange}
                  placeholder="Relationship history, preferred payment terms..."
                  className="w-full bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Contacts & Actions) */}
        <div className="space-y-6 sm:space-y-8 h-full flex flex-col">
          {/* Contacts Section */}
          <div className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
                <LuUser size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Brand Contacts</h2>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="relative p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-white/50 dark:bg-gray-800/20 space-y-4 sm:space-y-5 group/contact transition-colors hover:border-gray-200 dark:hover:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">
                        {index === 0 ? "Primary Contact" : `Contact ${index + 1}`}
                      </span>
                    </div>
                    {contacts.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeContact(contact.id)}
                        className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <LuTrash2 size={16} strokeWidth={2.5} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3.5 sm:space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight ml-1">Contact Name</label>
                      <input 
                        type="text" 
                        value={contact.name}
                        onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight ml-1">Role</label>
                      <input 
                        type="text" 
                        value={contact.role}
                        onChange={(e) => updateContact(contact.id, 'role', e.target.value)}
                        placeholder="e.g. Marketing Manager"
                        className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 outline-none focus:border-brand-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight ml-1">Email Address</label>
                      <div className="relative group/input">
                        <LuMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-brand-500 transition-colors" strokeWidth={2.5} />
                        <input 
                          type="email" 
                          value={contact.email}
                          onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                          placeholder="rahul@brand.co"
                          className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-brand-500 transition-all shadow-sm text-right"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight ml-1">WhatsApp Number</label>
                      <div className="relative group/input">
                        <LuMessageSquare size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" strokeWidth={2.5} />
                        <input 
                          type="text" 
                          value={contact.whatsapp}
                          onChange={(e) => updateContact(contact.id, 'whatsapp', e.target.value)}
                          placeholder="+91 98765 4321"
                          className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-emerald-500 transition-all shadow-sm text-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button"
                onClick={addContact}
                className="w-full py-3 sm:py-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-gray-400 hover:text-brand-500 hover:border-brand-500 hover:bg-brand-500/[0.02] transition-all flex items-center justify-center gap-2 group"
              >
                <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-brand-500 group-hover:text-white transition-all">
                  <LuPlus size={14} strokeWidth={3} className="sm:hidden" />
                  <LuPlus size={16} strokeWidth={3} className="hidden sm:block" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">Add Another Contact</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4 pt-4">
            {/* Error Display */}
            {formError && (
              <p className="text-red-400 text-xs text-center font-medium">{formError}</p>
            )}

            <button 
              type="button"
              onClick={handleSave}
              disabled={isSaving || uploadLogo.isPending}
              className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-xl shadow-brand-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <LuLoader size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <LuSave size={18} strokeWidth={2.5} />
                  Save Brand
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="w-full py-3.5 sm:py-4 rounded-2xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrandForm;
