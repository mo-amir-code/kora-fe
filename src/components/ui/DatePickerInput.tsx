"use client";

import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { LuCalendar } from "react-icons/lu";

interface DatePickerInputProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: string;
  label?: string;
  className?: string;
}

export default function DatePickerInput({
  value,
  onChange,
  placeholder = "Select date",
  minDate,
  className = "",
}: DatePickerInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<ReturnType<typeof flatpickr> | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    fpRef.current = flatpickr(inputRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: value || undefined,
      minDate: minDate,
      disableMobile: false,
      onChange: ([selectedDate]) => {
        if (selectedDate) {
          const year = selectedDate.getFullYear();
          const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
          const day = String(selectedDate.getDate()).padStart(2, "0");
          onChange(`${year}-${month}-${day}`);
        }
      },
    });

    return () => {
      if (fpRef.current) {
        const fp = Array.isArray(fpRef.current) ? fpRef.current[0] : fpRef.current;
        fp?.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes (e.g. edit mode prefill)
  useEffect(() => {
    if (fpRef.current && value) {
      const fp = Array.isArray(fpRef.current) ? fpRef.current[0] : fpRef.current;
      fp?.setDate(value, false);
    }
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        readOnly
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3.5 pr-12 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic placeholder:text-slate-300 dark:placeholder:text-gray-600 cursor-pointer"
      />
      <LuCalendar
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={16}
      />
    </div>
  );
}
