"use client";

import React from "react";
import { LuPlus } from "react-icons/lu";

interface CreateTemplateCardProps {
  onClick?: () => void;
}

const CreateTemplateCard = ({ onClick }: CreateTemplateCardProps) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-transparent hover:border-brand-500/50 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 transition-all duration-300 group min-h-[250px]"
    >
      <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <LuPlus className="h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-white" strokeWidth={3} />
      </div>
      <div className="text-center">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          Create New Template
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-500 font-medium">
          Draft a custom message
        </p>
      </div>
    </button>
  );
};

export default CreateTemplateCard;
