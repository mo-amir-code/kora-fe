"use client";

import React from "react";
import { LuTriangleAlert, LuX } from "react-icons/lu";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "brand";
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "brand"
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "bg-red-500 hover:bg-red-600 shadow-red-500/20",
    warning: "bg-warning-500 hover:bg-warning-600 shadow-warning-500/20",
    brand: "bg-brand-500 hover:bg-brand-600 shadow-brand-500/20"
  };

  const iconStyles = {
    danger: "text-red-500 bg-red-500/10",
    warning: "text-warning-500 bg-warning-500/10",
    brand: "text-brand-500 bg-brand-500/10"
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-[32px] border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        {/* Header/Close */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <LuX size={20} />
        </button>

        <div className="p-8 sm:p-10 space-y-8">
          {/* Icon & Title Group */}
          <div className="space-y-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconStyles[variant]}`}>
              <LuTriangleAlert size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {title}
              </h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
               onClick={onClose}
               className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-center"
            >
              {cancelLabel}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-6 py-4 rounded-2xl text-white text-sm font-bold shadow-lg transition-all active:scale-[0.98] text-center ${variantStyles[variant]}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
