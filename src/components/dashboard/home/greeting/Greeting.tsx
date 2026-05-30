"use client";
import React from "react";

type GreetingProps = {
  name: string;
  date?: Date | string;
  className?: string;
};

function formatDate(date?: Date | string) {
  const d = date ? (date instanceof Date ? date : new Date(date)) : new Date();
  try {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch (e) {
    return d.toDateString();
  }
}

function getGreetingWord(date?: Date | string) {
  const d = date ? (date instanceof Date ? date : new Date(date)) : new Date();
  const hour = d.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const Greeting: React.FC<GreetingProps> = ({ name, date, className = "" }) => {
  const formatted = formatDate(date);
  const greetingWord = getGreetingWord(date);

  return (
    <div className={`flex flex-col ${className}`}>
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <span>{greetingWord},{` ${name}`}</span>
        <span aria-hidden>👋</span>
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{formatted}</p>
    </div>
  );
};

export type { GreetingProps };
export default Greeting;