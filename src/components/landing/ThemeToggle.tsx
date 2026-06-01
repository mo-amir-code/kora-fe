"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering until client-side
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-black/30 backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-200 group"
    >
      {theme === "dark" ? (
        <LuSun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <LuMoon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
