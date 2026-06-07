"use client";

import React, { useState } from 'react';
import { LuPlus, LuLoader } from 'react-icons/lu';
import { BrandCard } from '@/components/dashboard/brands/BrandCard';
import AddBrandForm from '@/components/dashboard/brands/AddBrandForm';
import { useBrandsList, useDeleteBrand } from '@/hooks/useBrands';

const CATEGORY_COLORS: Record<string, string> = {
  TECH: 'text-purple-500 bg-purple-500/10 dark:text-purple-400 dark:bg-purple-500/15',
  FASHION: 'text-pink-500 bg-pink-500/10 dark:text-pink-400 dark:bg-pink-500/15',
  BEAUTY: 'text-rose-500 bg-rose-500/10 dark:text-rose-400 dark:bg-rose-500/15',
  FINANCE: 'text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/15',
  EDUCATION: 'text-blue-500 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-500/15',
  GAMING: 'text-indigo-500 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-500/15',
  FOOD: 'text-orange-500 bg-orange-500/10 dark:text-orange-400 dark:bg-orange-500/15',
  FITNESS: 'text-lime-500 bg-lime-500/10 dark:text-lime-400 dark:bg-lime-500/15',
  TRAVEL: 'text-cyan-500 bg-cyan-500/10 dark:text-cyan-400 dark:bg-cyan-500/15',
  AUTOMOTIVE: 'text-red-500 bg-red-500/10 dark:text-red-400 dark:bg-red-500/15',
  HEALTH: 'text-green-500 bg-green-500/10 dark:text-green-400 dark:bg-green-500/15',
  ENTERTAINMENT: 'text-amber-500 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/15',
  E_COMMERCE: 'text-teal-500 bg-teal-500/10 dark:text-teal-400 dark:bg-teal-500/15',
  SAAS: 'text-violet-500 bg-violet-500/10 dark:text-violet-400 dark:bg-violet-500/15',
  OTHER: 'text-gray-500 bg-gray-500/10 dark:text-gray-400 dark:bg-gray-500/15',
};

function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (!num || num === 0) return '₹0';
  return `₹${num.toLocaleString('en-IN')}`;
}

const Brands = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: brands, isLoading, error } = useBrandsList();
  const deleteBrand = useDeleteBrand();

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors p-4 sm:p-0">
        <AddBrandForm 
          onSave={() => setShowAddForm(false)} 
          onCancel={() => setShowAddForm(false)} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen bg-white dark:bg-gray-900 transition-colors p-4 sm:p-0 relative">
      {/* Deleting overlay */}
      {deleteBrand.isPending && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-4">
          <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-[1px]" />
          <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <LuLoader className="h-4 w-4 animate-spin text-rose-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Deleting brand...</span>
          </div>
        </div>
      )}

      {/* Top action bar */}
      <div className="flex w-full items-center justify-end">
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-6 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-xl transition-all hover:opacity-90 active:scale-95 uppercase tracking-widest"
        >
          <LuPlus className="h-4 w-4 stroke-[3]" />
          Add Brand
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <LuLoader className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-red-400">Failed to load brands. Please try again.</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && brands && brands.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <LuPlus className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">No brands yet. Add your first brand partner.</p>
        </div>
      )}

      {/* Grid of brand cards */}
      {brands && brands.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-20">
          {brands.map((brand) => {
            const primaryContact = brand.contacts.find(c => c.isPrimary) || brand.contacts[0];
            const categoryKey = brand.category;
            const colorClass = CATEGORY_COLORS[categoryKey] || CATEGORY_COLORS.OTHER;

            return (
              <BrandCard
                key={brand.id}
                id={brand.id}
                name={brand.name}
                category={{ label: categoryKey.replace('_', ' '), colorClass }}
                dealsCount={brand.activeDeals ?? 0}
                totalValue={formatCurrency(brand.totalValue ?? 0)}
                contactName={primaryContact?.name ?? '—'}
                contactRole={primaryContact?.role ?? ''}
                contactEmail={primaryContact?.email ?? ''}
                lastDealDate=""
                logoUrl={brand.logoUrl ?? undefined}
                onDelete={(id) => deleteBrand.mutate(id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Brands;
