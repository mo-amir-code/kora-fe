import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuTrash2, LuUser, LuMail } from 'react-icons/lu';

export interface BrandCardProps {
  id: string;
  name: string;
  category: {
    label: string;
    colorClass: string;
  };
  dealsCount: number;
  totalValue: string;
  contactName: string;
  contactRole?: string;
  contactEmail: string;
  lastDealDate: string;
  logoUrl?: string;
  onDelete?: (id: string) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  id,
  name,
  category,
  dealsCount,
  totalValue,
  contactName,
  contactRole,
  contactEmail,
  lastDealDate,
  logoUrl,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-none transition-all duration-300 relative group">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden transition-all duration-300 group-hover:scale-105">
            {logoUrl ? (
              <Image src={logoUrl} alt={name} fill className="object-contain p-2" />
            ) : (
              <span className="text-base font-bold text-gray-500 dark:text-gray-400">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              {name}
            </h3>
            <span className={`inline-flex px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider w-fit ${category.colorClass}`}>
              {category.label}
            </span>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); if (confirm(`Delete "${name}"? This cannot be undone.`)) onDelete?.(id); }}
          className="text-gray-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100"
          title="Delete brand"
        >
          <LuTrash2 className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800/80">
          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Active Deals</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{dealsCount}</span>
        </div>
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800/80">
          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Total Value</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{totalValue}</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-3 py-2">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
            <LuUser className="h-4 w-4 text-gray-500 dark:text-gray-500" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate font-bold text-gray-900 dark:text-white leading-none mb-1">
              {contactName}
            </span>
            {contactRole && <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tight">{contactRole}</span>}
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
            <LuMail className="h-4 w-4 text-gray-500 dark:text-gray-500" strokeWidth={2.5} />
          </div>
          <span className="truncate font-medium text-[13px]">{contactEmail}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Last Interaction</span>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-300">{lastDealDate}</span>
        </div>
        <Link 
          href={`/dashboard/brands/${id}`}
          className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2 text-[11px] font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all uppercase tracking-widest active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
