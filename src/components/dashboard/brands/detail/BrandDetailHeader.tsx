"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { LuPlus, LuPencil, LuCheck, LuX, LuChevronDown, LuImage } from "react-icons/lu";

interface BrandDetailHeaderProps {
  name: string;
  category: string;
  categoryColor: string;
  totalDeals: number;
  totalValue: string;
  logoUrl?: string;
  onUpdateBrand?: (data: { name?: string; category?: string; logoUrl?: string | null }) => void;
  onUploadLogo?: (file: File) => Promise<string | undefined>;
  isUpdating?: boolean;
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

const BrandDetailHeader = ({
  name,
  category,
  categoryColor,
  totalDeals,
  totalValue,
  logoUrl,
  onUpdateBrand,
  onUploadLogo,
  isUpdating,
}: BrandDetailHeaderProps) => {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editCategory, setEditCategory] = useState(category);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!editName.trim()) return;
    const changes: { name?: string; category?: string } = {};
    if (editName.trim() !== name) changes.name = editName.trim();
    if (editCategory !== category) changes.category = editCategory;
    if (Object.keys(changes).length > 0) {
      onUpdateBrand?.(changes);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditName(name);
    setEditCategory(category);
    setEditing(false);
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadLogo) return;
    const url = await onUploadLogo(file);
    if (url) {
      onUpdateBrand?.({ logoUrl: url });
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleLogoChange} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 group">
          {/* Logo with edit overlay */}
          <div
            onClick={handleLogoClick}
            className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shrink-0 relative group cursor-pointer"
          >
            {logoUrl ? (
              <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl sm:text-2xl font-black text-gray-500 dark:text-gray-400">
                {name.charAt(0)}
              </span>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <LuImage size={18} className="text-white" />
            </div>
          </div>

          {/* Name + Category */}
          {editing ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-xl sm:text-2xl font-bold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1 text-gray-900 dark:text-white outline-none focus:border-brand-500 w-48 sm:w-64"
                  autoFocus
                />
                <button onClick={handleSave} disabled={isUpdating} className="p-2 rounded-lg text-brand-500 hover:bg-brand-500/10 transition-all">
                  <LuCheck size={18} />
                </button>
                <button onClick={handleCancel} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <LuX size={18} />
                </button>
              </div>
              <div className="relative w-40">
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-brand-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <LuChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {name}
                </h1>
                <span className={`px-2 py-0.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${categoryColor}`}>
                  {category.replace("_", " ")}
                </span>
                <button
                  onClick={() => setEditing(true)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all opacity-0 group-hover:opacity-100"
                  title="Edit brand"
                >
                  <LuPencil size={14} />
                </button>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Active Deals <span className="font-bold text-gray-900 dark:text-white">{totalDeals}</span>
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Total Value <span className="font-bold text-gray-900 dark:text-white">{totalValue}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {!editing && (
          <Link
            href="/dashboard/deals"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-lg shadow-brand-500/20"
          >
            <LuPlus size={16} strokeWidth={3} />
            <span className="sm:hidden">New Deal</span>
            <span className="hidden sm:inline">New Deal with {name}</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BrandDetailHeader;
