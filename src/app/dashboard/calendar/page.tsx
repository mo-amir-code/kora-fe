"use client";

import React, { useState, useMemo } from "react";
import {
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameMonth,
} from "date-fns";
import { CalendarHeader, CalendarGrid, CalendarSidebar } from "@/components/dashboard/calendar";
import { useCalendarEvents } from "@/hooks/useCalendar";
import { LuLoader } from "react-icons/lu";

const CalendarPage = () => {
  const today = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(today);
  const [view, setView] = useState<"month" | "week">("month");

  /**
   * Smart range calculation:
   * - Base: always 1st → last day of the selected month.
   * - Current month edge case: if today + 7 days spills into the next month,
   *   extend endDate to cover those extra days so the Week sidebar stays complete.
   */
  const { startDate, endDate } = useMemo(() => {
    const start = startOfMonth(currentDate);
    let end = endOfMonth(currentDate);

    // Only apply the buffer when the user is viewing the current month
    if (isSameMonth(currentDate, today)) {
      const weekAhead = addDays(today, 7);
      if (weekAhead > end) {
        end = weekAhead;
      }
    }

    return { startDate: start, endDate: end };
  }, [currentDate, today]);

  const { data: rawEvents, isLoading, error } = useCalendarEvents(startDate, endDate);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(today);

  // Parse ISO date strings from backend into Date objects
  const events = rawEvents?.map(event => ({ ...event, date: new Date(event.date) })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LuLoader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-red-500">Failed to load calendar events.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-10 space-y-8 min-h-screen bg-white dark:bg-gray-900 transition-colors animate-in fade-in duration-700">
      {/* Dashboard Header/Calendar Controls */}
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        view={view}
        onViewChange={setView}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-start transition-all duration-500">
        {/* Main Calendar Section */}
        <div className="xl:col-span-8 space-y-6">
          <CalendarGrid 
            currentDate={currentDate} 
            events={events} 
            view={view}
          />

          {/* Mobile View Switcher - Shown below grid on small screens */}
          <div className="flex sm:hidden items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl p-1 shadow-sm w-full mx-auto max-w-[280px]">
            <button 
              onClick={() => setView("month")}
              className={`flex-1 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                view === "month" 
                  ? "bg-gray-900 dark:bg-brand-500 text-white shadow-lg" 
                  : "text-gray-400"
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setView("week")}
              className={`flex-1 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                view === "week" 
                  ? "bg-gray-900 dark:bg-brand-500 text-white shadow-lg" 
                  : "text-gray-400"
              }`}
            >
              Week
            </button>
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="xl:col-span-4 sticky top-10">
          <CalendarSidebar 
            currentDate={currentDate}
            events={events}
            view={view}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;