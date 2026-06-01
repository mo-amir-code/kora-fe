import { LuPlus } from "react-icons/lu";

interface BrandDetailHeaderProps {
  name: string;
  category: string;
  categoryColor: string;
  totalDeals: number;
  totalValue: string;
  logoUrl?: string;
}

const BrandDetailHeader = ({
  name,
  category,
  categoryColor,
  totalDeals,
  totalValue,
  logoUrl,
}: BrandDetailHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl sm:text-2xl font-black text-gray-500 dark:text-gray-400">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {name}
              </h1>
              <span className={`px-2 py-0.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${categoryColor}`}>
                {category}
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Total Deals <span className="font-bold text-gray-900 dark:text-white">{totalDeals}</span>
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Total Value <span className="font-bold text-gray-900 dark:text-white">{totalValue}</span>
              </span>
            </div>
          </div>
        </div>

        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-lg shadow-brand-500/20">
          <LuPlus size={16} strokeWidth={3} />
          <span className="sm:hidden">New Deal</span>
          <span className="hidden sm:inline">New Deal with {name}</span>
        </button>
      </div>
    </div>
  );
};

export default BrandDetailHeader;
