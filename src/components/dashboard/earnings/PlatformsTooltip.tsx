"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PlatformsTooltipProps {
  platforms: string[];
}

const PlatformsTooltip = ({ platforms }: PlatformsTooltipProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ left: number; top?: number; bottom?: number } | null>(null);

  const showTooltip = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const showAbove = rect.top > window.innerHeight / 2;
    setPosition({
      left: rect.left + rect.width / 2,
      ...(showAbove
        ? { bottom: window.innerHeight - rect.top + 8 }
        : { top: rect.bottom + 8 }),
    });
  };

  const hideTooltip = () => setPosition(null);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="cursor-help rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-bold text-gray-500 transition-colors hover:border-brand-500/30 hover:text-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        aria-label={`Platforms: ${platforms.join(', ')}`}
      >
        {platforms[0]}{platforms.length > 1 ? ` +${platforms.length - 1}` : ''}
      </button>

      {position && createPortal(
        <div
          role="tooltip"
          style={{ left: position.left, top: position.top, bottom: position.bottom }}
          className="pointer-events-none fixed z-[9999] min-w-36 max-h-52 -translate-x-1/2 overflow-y-auto rounded-xl border border-gray-200 bg-white p-3 shadow-xl custom-scrollbar dark:border-gray-700 dark:bg-gray-800"
        >
          <p className="mb-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-widest text-gray-400">Platforms</p>
          <div className="flex flex-col gap-1.5">
            {platforms.map((platform) => (
              <span key={platform} className="whitespace-nowrap text-xs font-semibold text-gray-700 dark:text-gray-200">{platform}</span>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default PlatformsTooltip;
