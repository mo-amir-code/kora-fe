"use client";

import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isSameWeek
} from "date-fns";
import EventBadge, { EventStatus } from "./EventBadge";

interface Event {
  id: string;
  date: Date;
  title: string;
  subtitle?: string;
  status: EventStatus;
  time?: string;
}

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  view: "month" | "week";
}

const CalendarGrid = ({ currentDate, events, view }: CalendarGridProps) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = [
    { full: "Sun", short: "S" },
    { full: "Mon", short: "M" },
    { full: "Tue", short: "T" },
    { full: "Wed", short: "W" },
    { full: "Thu", short: "T" },
    { full: "Fri", short: "F" },
    { full: "Sat", short: "S" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5">
      <div className="w-full">
        {/* Grid Header (Days of Week) */}
        <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          {weekDays.map((day, idx) => (
            <div 
              key={idx} 
              className="py-3 sm:py-6 text-center text-[9px] sm:text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest sm:tracking-[0.2em]"
            >
              <span className="hidden sm:inline">{day.full}</span>
              <span className="inline sm:hidden">{day.short}</span>
            </div>
          ))}
        </div>

        {/* Grid Cells */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());
            const isCurrentWeek = isSameWeek(day, currentDate);
            
            // Filter events based on view selection
            let dayEvents = events.filter((event) => isSameDay(event.date, day));
            if (view === "week" && !isCurrentWeek) {
              dayEvents = []; // Only show events for the selected week
            }

            return (
              <div 
                key={day.toString()} 
                className={`
                  min-h-[60px] xs:min-h-[80px] sm:min-h-[140px] p-1 sm:p-4 border-r border-b last:border-r-0 border-gray-100 dark:border-gray-800
                  transition-all duration-300 relative group
                  ${!isCurrentMonth ? "opacity-30 pointer-events-none" : "hover:bg-gray-50 dark:hover:bg-white/[0.02]"}
                  ${isToday ? "bg-brand-500/[0.05]" : ""}
                  ${view === "week" && isCurrentWeek ? "bg-brand-500/[0.02]" : ""}
                  ${view === "week" && !isCurrentWeek ? "opacity-40 grayscale-[0.5]" : ""}
                `}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-4">
                  <span className={`
                    text-[9px] sm:text-sm font-black tracking-tight
                    ${isToday ? "text-brand-500 w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-brand-500/10 flex items-center justify-center -ml-0.5 sm:-ml-1.5 shadow-lg shadow-brand-500/10" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"}
                  `}>
                    {format(day, "d")}
                  </span>
                </div>

                {/* Event Stack */}
                <div className="flex flex-wrap sm:flex-col gap-1 sm:gap-1.5">
                  {dayEvents.map((event) => (
                    <EventBadge 
                      key={event.id}
                      title={event.title}
                      subtitle={event.subtitle}
                      status={event.status}
                      time={event.time}
                      isCompact
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
