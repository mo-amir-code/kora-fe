import React from "react";

export type EventStatus = 'success' | 'warning' | 'danger' | 'brand';

interface EventBadgeProps {
  title: string;
  status: EventStatus;
  time?: string;
  isCompact?: boolean;
}

const getStatusStyles = (status: EventStatus) => {
  const map = {
    success: {
      dot: "bg-emerald-500",
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      glow: "bg-emerald-500",
    },
    warning: {
      dot: "bg-amber-500",
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      glow: "bg-amber-500",
    },
    danger: {
      dot: "bg-rose-500",
      bg: "bg-rose-500/10",
      text: "text-rose-500",
      glow: "bg-rose-500",
    },
    brand: {
      dot: "bg-brand-500",
      bg: "bg-brand-500/10",
      text: "text-brand-500",
      glow: "bg-brand-500",
    },
  };
  return map[status];
};

const EventBadge = ({ title, status, time, isCompact = false }: EventBadgeProps) => {
  const styles = getStatusStyles(status);

  if (isCompact) {
    return (
      <div className="group flex items-center gap-1">
        <div className={`w-0.5 h-3 sm:w-1 sm:h-5 rounded-full ${styles.glow} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
        <span className={`hidden sm:inline text-[9px] font-black ${styles.text} truncate max-w-[60px] uppercase tracking-tighter`}>
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${styles.bg} border border-white/5 space-y-1.5 sm:space-y-2 group cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]`}>
      <div className="flex items-center justify-between">
        <span className={`px-1.5 py-0.5 rounded-md ${styles.bg} border border-white/10 text-[8px] sm:text-[9px] font-black uppercase tracking-widest ${styles.text}`}>
          {status === 'success' ? 'Paid' : status === 'warning' ? 'Payment Due' : status === 'danger' ? 'Overdue' : 'Delivered'}
        </span>
        {time && <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500">{time}</span>}
      </div>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className={`w-0.5 sm:w-1 h-6 sm:h-8 rounded-full bg-gradient-to-b from-white/20 to-transparent ${styles.dot}`} />
        <div className="space-y-0.5">
          <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white leading-tight truncate">{title}</h4>
          <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-60">TechCorp India</p>
        </div>
      </div>
    </div>
  );
};

export default EventBadge;
