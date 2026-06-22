"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuChevronDown, LuCheck } from "react-icons/lu";

export type TemplateFilterOption = {
  id: string;
  label: string;
};

export type TemplatesFilterProps = {
  options: TemplateFilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  className?: string;
};

const TemplatesFilter = ({
  options,
  activeFilter,
  onFilterChange,
  className = "",
}: TemplatesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const activeOption = options.find(opt => opt.id === activeFilter) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between gap-3 px-6 py-3 rounded-2xl transition-all border
          text-xs font-black uppercase tracking-widest min-w-[240px]
          bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 
          hover:border-brand-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.05)]
          ${isOpen ? "border-brand-500 ring-2 ring-brand-500/10 shadow-xl scale-[1.01]" : ""}
        `}
      >
        <span className="text-gray-900 dark:text-white">{activeOption.label}</span>
        <LuChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-full min-w-[280px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar space-y-1">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onFilterChange(option.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all
                  text-[10px] font-bold uppercase tracking-widest
                  ${activeFilter === option.id
                    ? "bg-brand-500/10 text-brand-500 dark:bg-brand-500/20"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
              >
                {option.label}
                {activeFilter === option.id && <LuCheck size={14} strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesFilter;
