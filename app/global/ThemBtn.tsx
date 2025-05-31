"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsToggling(true);
    // Add a slight delay to make the animation visible
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setIsToggling(false);
    }, 300);
  };

  const isDark = mounted && theme === "dark";

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      disabled={isToggling}
      className={`w-[80px] sm:w-[100px] md:w-[120px]
        h-[40px] sm:h-[45px] md:h-[50px]
        rounded-full flex items-center px-2 
        ${
          isDark
            ? "justify-end bg-gray-800 border border-gray-700"
            : "justify-start bg-blue-50 border border-blue-100"
        } 
        cursor-pointer transition-all duration-700 ease-in-out
        shadow-md hover:shadow-lg
        ${isToggling ? 'scale-95' : 'scale-100'}
        relative overflow-hidden`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {/* Background animation overlay */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 ease-in-out
          ${isToggling 
            ? 'bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 opacity-20' 
            : 'opacity-0'
          }`}
      />
      
      {/* Toggle circle */}
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
          transition-all duration-500 ease-out
          ${isToggling ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
          active:scale-90
          relative z-10
        `}
      >
        {/* Icon with fade transition */}
        <div className={`transition-all duration-400 ${isToggling ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}>
          {isDark ? (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          ) : (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          )}
        </div>
        
        {/* Pulsing effect during toggle */}
        {isToggling && (
          <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping" />
        )}
      </div>
      
      {/* Sparkle effects */}
      {isToggling && (
        <>
          <div className="absolute top-1 left-4 w-1 h-1 bg-yellow-300 rounded-full animate-ping" />
          <div className="absolute bottom-2 right-6 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-75" />
          <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping animation-delay-150" />
        </>
      )}
    </button>
  );
}