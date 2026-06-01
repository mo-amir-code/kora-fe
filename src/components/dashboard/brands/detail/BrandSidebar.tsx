import React from "react";
import { LuMail, LuPhone, LuMessageSquare, LuCalendar, LuPencil } from "react-icons/lu";

interface BrandSidebarProps {
  contact: {
    name: string;
    role: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  };
  notes: string[];
}

const BrandSidebar = ({ contact, notes }: BrandSidebarProps) => {
  return (
    <div className="space-y-5">
      {/* Brand Contact Card */}
      <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Brand Contact</h3>
          <button className="text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-brand-500 transition-colors uppercase tracking-wider">
            View All
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
            {contact.avatarUrl ? (
              <img src={contact.avatarUrl} alt={contact.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                {contact.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{contact.name}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{contact.role}</p>
          </div>
        </div>

        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
            <LuMail size={14} className="text-gray-400 shrink-0" />
            <span className="truncate">{contact.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
            <LuPhone size={14} className="text-gray-400 shrink-0" />
            <span>{contact.phone}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all">
            <LuMessageSquare size={13} />
            WhatsApp
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <LuCalendar size={13} />
            Schedule
          </button>
        </div>
      </div>

      {/* Internal Notes Card */}
      <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Internal Notes</h3>
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all">
            <LuPencil size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {notes.slice(0, 2).map((note, index) => (
            <div key={index} className="pl-3 border-l-2 border-brand-500/50">
              <p className="text-xs text-gray-600 dark:text-gray-400 italic leading-relaxed">
                &ldquo;{note}&rdquo;
              </p>
            </div>
          ))}
          {notes.length === 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500">No notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandSidebar;
