"use client";

import React, { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { BrandCard } from '@/components/dashboard/brands/BrandCard';
import AddBrandForm from '@/components/dashboard/brands/AddBrandForm';

const brandsData = [
  {
    id: 1,
    name: 'Apple',
    category: { label: 'Tech', colorClass: 'text-purple-500 bg-purple-500/10 dark:text-purple-400 dark:bg-purple-500/15' },
    dealsCount: 3,
    totalValue: '₹1,25,000',
    contactName: 'Sarah Jenkins',
    contactRole: 'Marketing',
    contactEmail: 'sarah.j@apple.com',
    lastDealDate: 'March 2025',
  },
  {
    id: 2,
    name: 'Nike',
    category: { label: 'Apparel', colorClass: 'text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/15' },
    dealsCount: 1,
    totalValue: '₹45,000',
    contactName: 'Raj Patel',
    contactRole: 'PR',
    contactEmail: 'r.patel@nike.in',
    lastDealDate: 'Feb 2025',
  },
  {
    id: 3,
    name: "L'Oréal",
    category: { label: 'Beauty', colorClass: 'text-pink-500 bg-pink-500/10 dark:text-pink-400 dark:bg-pink-500/15' },
    dealsCount: 5,
    totalValue: '₹2,10,000',
    contactName: 'Priya Sharma',
    contactRole: '',
    contactEmail: 'priya.s@loreal.com',
    lastDealDate: 'Jan 2025',
  },
];

const Brands = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors p-4 sm:p-0">
        <AddBrandForm 
          onSave={(data) => {
            console.log("Saving brand:", data);
            setShowAddForm(false);
          }} 
          onCancel={() => setShowAddForm(false)} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen bg-white dark:bg-gray-900 transition-colors p-4 sm:p-0">
      {/* Top action bar without headings */}
      <div className="flex w-full items-center justify-end">
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-6 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-xl transition-all hover:opacity-90 active:scale-95 uppercase tracking-widest"
        >
          <LuPlus className="h-4 w-4 stroke-[3]" />
          Add Brand
        </button>
      </div>

      {/* Grid of brand cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-20">
        {brandsData.map((brand) => (
          <BrandCard
            key={brand.id}
            name={brand.name}
            category={brand.category}
            dealsCount={brand.dealsCount}
            totalValue={brand.totalValue}
            contactName={brand.contactName}
            contactRole={brand.contactRole}
            contactEmail={brand.contactEmail}
            lastDealDate={brand.lastDealDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;