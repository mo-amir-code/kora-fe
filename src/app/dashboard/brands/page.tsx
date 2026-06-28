"use client";

import React, { useState } from 'react';
import { LuPlus, LuLoader } from 'react-icons/lu';
import { LoadingSpinner } from '@/components/common';
import { BrandCard } from '@/components/dashboard/brands/BrandCard';
import AddBrandForm from '@/components/dashboard/brands/AddBrandForm';
import { useBrandsList, useDeleteBrand } from '@/hooks/useBrands';
import { useCurrency } from '@/hooks/useCurrency';

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

const Brands = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: brands, isLoading, error } = useBrandsList();
  const deleteBrand = useDeleteBrand();
  const { format } = useCurrency();

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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl tracking-tight">
            Brands & Sponsors
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
            Manage relationships, primary contacts, and lifetime value for all partner brands.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-all shadow-md active:scale-95 shrink-0"
        >
          <LuPlus className="h-4 w-4" />
          Add Brand
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="p-8 text-center bg-rose-50 dark:bg-rose-500/10 rounded-2xl border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold">
          Failed to load brands. Please try again.
        </div>
      ) : !brands || brands.length === 0 ? (
        <div className="p-12 text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No brands found. Click "Add Brand" to get started.</p>
        </div>
      ) : (
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
                totalValue={format(brand.totalValue ?? 0)}
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
