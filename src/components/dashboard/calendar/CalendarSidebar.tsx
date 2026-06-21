"use client";

import React from "react";
import { format, isSameWeek, startOfWeek, endOfWeek, isSameMonth } from "date-fns";
import EventBadge, { EventStatus } from "./EventBadge";

interface Event {
  id: string;
  date: Date;
  title: string;
  subtitle?: string;
  status: EventStatus;
  time?: string;
}

interface CalendarSidebarProps {
  currentDate: Date;
  events: Event[];
  view: "month" | "week";
}

const CalendarSidebar = ({ currentDate, events, view }: CalendarSidebarProps) => {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);
  
  const filteredEvents = events.filter((event) => 
    view === "month" 
      ? isSameMonth(event.date, currentDate)
      : isSameWeek(event.date, today)
  );

  // Group events by day
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const dayName = format(event.date, "eeee");
    const dayNumber = format(event.date, "d");
    const key = `${dayNumber} ${dayName}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-1 sm:space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
          {view === "month" ? "Selected Month" : "Current Week"}
        </h2>
        <p className="text-[10px] sm:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest opacity-80">
          {view === "month" 
            ? format(currentDate, "MMMM yyyy") 
            : `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d")}`
          }
        </p>
      </div>

      {/* Scrollable event list */}
      <div className="max-h-[72vh] overflow-y-auto overflow-x-hidden space-y-6 sm:space-y-8 pr-1 pb-8 custom-scrollbar">
        {Object.entries(groupedEvents).map(([dayLabel, dayEvents]) => (
          <div key={dayLabel} className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[14px] sm:text-base font-black text-brand-500 dark:text-brand-400 uppercase tracking-widest">{dayLabel}</span>
              <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800/50" />
            </div>
            
            <div className="space-y-4">
              {dayEvents.map((event) => (
                <EventBadge 
                  key={event.id}
                  title={event.title}
                  subtitle={event.subtitle}
                  status={event.status}
                  time={event.time}
                />
              ))}
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="py-12 px-6 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-800 text-center space-y-3">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No activities</p>
            <p className="text-xs text-gray-500">Relax! You have a clear schedule for this {view}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSidebar;
