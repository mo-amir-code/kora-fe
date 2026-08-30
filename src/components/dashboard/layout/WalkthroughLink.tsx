"use client";

import React from "react";
import { LuPlay, LuExternalLink } from "react-icons/lu";
import { WALKTHROUGH_VIDEO_URL } from "@/lib/constants";
import { useSidebar } from "@/context/SidebarContext";

interface WalkthroughLinkProps {
  isExpanded?: boolean;
  isHovered?: boolean;
  isMobileOpen?: boolean;
}

const WalkthroughLink: React.FC<WalkthroughLinkProps> = ({
  isExpanded: propIsExpanded,
  isHovered: propIsHovered,
  isMobileOpen: propIsMobileOpen,
}) => {
  const sidebar = useSidebar();
  const isExpanded = propIsExpanded ?? sidebar.isExpanded;
  const isHovered = propIsHovered ?? sidebar.isHovered;
  const isMobileOpen = propIsMobileOpen ?? sidebar.isMobileOpen;

  const isOpen = isExpanded || isHovered || isMobileOpen;

  if (isOpen) {
    return (
      <a
        href={WALKTHROUGH_VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-1 mb-4 group relative flex items-center gap-3 p-2.5 rounded-xl bg-linear-to-r from-amber-500/10 via-brand-500/10 to-amber-500/5 hover:from-amber-500/20 hover:via-brand-500/20 hover:to-amber-500/10 border border-amber-500/20 dark:border-brand-500/30 transition-all duration-300 shadow-xs hover:shadow-md"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500 text-white shadow-sm shadow-brand-500/30 group-hover:scale-105 transition-transform shrink-0">
          <LuPlay className="w-4 h-4 fill-white ml-0.5" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">
              Kora Walkthrough
            </span>
            <LuExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-500 transition-colors shrink-0" />
          </div>
          <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
            How creators can use Kora
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={WALKTHROUGH_VIDEO_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Watch Kora Walkthrough Video"
      className="mx-auto mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-amber-500/10 to-brand-500/10 border border-brand-500/20 text-brand-500 hover:bg-brand-500 hover:text-white transition-all shadow-xs group"
    >
      <LuPlay className="w-5 h-5 fill-current ml-0.5 group-hover:scale-110 transition-transform" />
    </a>
  );
};

export default WalkthroughLink;
