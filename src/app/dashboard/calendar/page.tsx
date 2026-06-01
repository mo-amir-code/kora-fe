"use client";

import React, { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { CalendarHeader, CalendarGrid, CalendarSidebar } from "@/components/dashboard/calendar";

// Dummy Data relative to current date (May 31, 2026)
const DUMMY_EVENTS = [
  {
    id: "1",
    date: new Date(2026, 4, 31), // May 31
    title: "TechCorp Review",
    status: "warning" as const,
    time: "10:00 AM",
  },
  {
    id: "2",
    date: new Date(2026, 5, 1), // June 1
    title: "Nykaa Campaign",
    status: "brand" as const,
    time: "2:00 PM",
  },
  {
    id: "3",
    date: new Date(2026, 5, 3), // June 3
    title: "Samsung Integration",
    status: "success" as const,
    time: "11:00 AM",
  },
  {
    id: "4",
    date: new Date(2026, 5, 5), // June 5
    title: "Draft Overdue",
    status: "danger" as const,
    time: "4:30 PM",
  },
];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

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
            events={DUMMY_EVENTS} 
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
            events={DUMMY_EVENTS}
            view={view}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;