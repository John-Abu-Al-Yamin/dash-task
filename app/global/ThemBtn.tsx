"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDark = mounted && theme === "dark";

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`w-[80px] sm:w-[100px] md:w-[120px]
        h-[40px] sm:h-[45px] md:h-[50px]
        rounded-full flex items-center px-2 
        ${
          isDark
            ? "justify-end bg-gray-800 border border-gray-700"
            : "justify-start bg-blue-50 border border-blue-100 "

        } 
        cursor-pointer transition-colors duration-500
        shadow-md hover:shadow-lg`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div
        className={`w-[28px] sm:w-[32px] md:w-[40px]
          h-[28px] sm:h-[32px] md:h-[40px]
          ${
            isDark
              ? "bg-indigo-900 text-yellow-300 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
              : "bg-white text-orange-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          } 
          rounded-full flex items-center justify-center
          shadow-md
          transition-transform duration-200
          active:scale-90
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        ) : (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        )}
      </div>
    </button>
  );
}
