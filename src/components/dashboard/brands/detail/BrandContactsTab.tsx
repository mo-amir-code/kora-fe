import React from "react";
import { LuMail, LuPhone, LuMessageSquare, LuPlus } from "react-icons/lu";

export interface BrandContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
}

interface BrandContactsTabProps {
  contacts: BrandContact[];
}

const BrandContactsTab = ({ contacts }: BrandContactsTabProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="relative p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
        >
          {contact.isPrimary && (
            <span className="absolute top-4 right-4 px-2 py-0.5 rounded-lg bg-brand-500/10 text-brand-500 text-[9px] font-bold uppercase tracking-wider">
              Primary
            </span>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                {contact.name.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {contact.name}
              </h4>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {contact.role}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 mb-5">
            <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
              <LuMail size={14} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <span className="truncate">{contact.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
              <LuPhone size={14} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <span>{contact.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              <LuMail size={13} />
              Email
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all">
              <LuMessageSquare size={13} />
              WhatsApp
            </button>
          </div>
        </div>
      ))}

      {/* Add New Contact Card */}
      <div className="p-5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-brand-500/30 hover:bg-brand-500/2 transition-all cursor-pointer group">
        <div className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center mb-3 group-hover:border-brand-500/50 transition-colors">
          <LuPlus size={20} className="text-gray-400 dark:text-gray-500 group-hover:text-brand-500 transition-colors" />
        </div>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:text-brand-500 transition-colors">
          Add New Contact
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Add another point of contact for this brand
        </p>
      </div>
    </div>
  );
};

export default BrandContactsTab;
