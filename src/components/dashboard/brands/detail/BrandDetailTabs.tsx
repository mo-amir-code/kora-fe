"use client";

export type BrandTab = "deals" | "invoices" | "notes" | "contacts";

interface BrandDetailTabsProps {
  activeTab: BrandTab;
  onTabChange: (tab: BrandTab) => void;
  invoiceCount?: number;
}

const tabs: { id: BrandTab; label: string }[] = [
  { id: "deals", label: "Deals" },
  { id: "invoices", label: "Invoices" },
  { id: "notes", label: "Notes" },
  { id: "contacts", label: "Contacts" },
];

const BrandDetailTabs = ({ activeTab, onTabChange, invoiceCount }: BrandDetailTabsProps) => {
  return (
    <div className="flex items-center gap-4 sm:gap-6 border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar -mx-1 px-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative pb-3 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
            activeTab === tab.id
              ? "text-brand-500"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {tab.label}
          {tab.id === "invoices" && invoiceCount !== undefined && invoiceCount > 0 && (
            <span className="ml-1 sm:ml-1.5 px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 text-[9px] sm:text-[10px] font-bold">
              {invoiceCount}
            </span>
          )}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default BrandDetailTabs;
