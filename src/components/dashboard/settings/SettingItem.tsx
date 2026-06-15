"use client";

import React from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export interface SettingItemProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  linkText: string;
}

export const SettingItem = ({ title, description, icon: Icon, href, linkText }: SettingItemProps) => (
  <Link 
    href={href}
    className="group flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
  >
    <div className="flex items-center gap-3 sm:gap-6">
      <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-brand-500 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10 transition-all">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm sm:max-w-xl line-clamp-2 sm:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2 sm:gap-4">
      <span className="hidden sm:block text-[11px] font-medium text-gray-400 dark:text-gray-600 group-hover:text-brand-500 transition-colors uppercase tracking-wider">
        {linkText}
      </span>
      <LuChevronRight size={16} className="text-gray-300 dark:text-gray-700 group-hover:text-brand-500 transition-all group-hover:translate-x-1" />
    </div>
  </Link>
);
