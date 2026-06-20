import React from "react";
import { LuArrowUpRight, LuHistory, LuInstagram, LuYoutube, LuLinkedin, LuTwitter, LuFacebook, LuClapperboard } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";

export interface BrandDeal {
  id: string;
  title: string;
  date: string;
  amount: string;
  status: string;
  stage: string;
  platforms: string[];
  logoUrl?: string | null;
}

interface BrandDealsTabProps {
  deals: BrandDeal[];
}

const PLATFORM_ICONS: Record<string, any> = {
  INSTAGRAM: LuInstagram,
  YOUTUBE: LuYoutube,
  LINKEDIN: LuLinkedin,
  X: LuTwitter,
  FACEBOOK: LuFacebook,
  OTHER: LuClapperboard,
};

const STAGE_COLORS: Record<string, string> = {
  LEAD: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  OUTREACH: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  NEGOTIATION: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  APPROVED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  IN_PROGRESS: "bg-brand-500/10 text-brand-500 border-brand-500/20",
  COMPLETED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const BrandDealsTab = ({ deals }: BrandDealsTabProps) => {
  return (
    <div className="space-y-3">
      {deals.map((deal) => (
        <div
          key={deal.id}
          className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[2rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-brand-500/30 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0 overflow-hidden">
              {deal.logoUrl ? (
                <Image
                  src={deal.logoUrl}
                  alt={deal.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-black text-gray-400">
                  {deal.title.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href={`/dashboard/deals/${deal.id}`} className="text-sm font-black text-gray-900 dark:text-white hover:text-brand-500 transition-colors uppercase tracking-tight">
                  {deal.title}
                </Link>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.1em] border ${STAGE_COLORS[deal.stage] || STAGE_COLORS.LEAD}`}>
                  {deal.stage.replace('_', ' ')}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {deal.date}
                </p>
                {deal.platforms.length > 0 && (
                  <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-gray-100 dark:border-gray-800">
                    {deal.platforms.map((p) => {
                      const Icon = PLATFORM_ICONS[p.toUpperCase()] || PLATFORM_ICONS.OTHER;
                      return <Icon key={p} size={12} className="text-gray-400" title={p} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-50 dark:border-gray-800">
            <div className="text-left sm:text-right">
              <p className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
                {deal.amount}
              </p>
              <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mt-0.5">
                {deal.status}
              </p>
            </div>
            <Link 
              href={`/dashboard/deals/${deal.id}`}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-all group/link border border-transparent hover:border-brand-500/20"
            >
              <LuArrowUpRight size={18} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      ))}

      {deals.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <LuHistory size={24} className="text-gray-300 dark:text-gray-500" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">No deals found</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Campaigns and sponsorship deals will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandDealsTab;
