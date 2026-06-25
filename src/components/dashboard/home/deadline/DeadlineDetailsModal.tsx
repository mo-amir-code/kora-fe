"use client";

import React from "react";
import { LuX, LuArrowUpRight } from "react-icons/lu";

type DeadlineItem = {
  id: string;
  type: string;
  dealTitle: string;
  dealId: string;
};

type DeadlineDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  items: DeadlineItem[];
};

const DeadlineDetailsModal: React.FC<DeadlineDetailsModalProps> = ({
  isOpen,
  onClose,
  brandName,
  items,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Deliverables
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For {brandName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
          >
            <LuX size={24} />
          </button>
        </div>

        {/* List */}
        <div className="p-2 max-h-[60vh] overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {item.dealTitle}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/20 text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    {item.type.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-gray-400 group-hover:text-brand-500 transition-colors ml-4">
                <LuArrowUpRight size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeadlineDetailsModal;
