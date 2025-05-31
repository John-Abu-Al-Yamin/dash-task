import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div className="w-12 h-12 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        {/* Loading text with animation */}
        <div className="text-2xl font-semibold text-gray-700 mb-4">
          <span className="inline-block animate-pulse">Loading</span>
          <span className="inline-block animate-bounce ml-1">.</span>
          <span className="inline-block animate-bounce ml-1" style={{animationDelay: '0.1s'}}>.</span>
          <span className="inline-block animate-bounce ml-1" style={{animationDelay: '0.2s'}}>.</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
        </div>
        
        {/* Optional message */}
        <p className="text-gray-500 mt-4 text-sm animate-fade-in">
          Please wait while we prepare everything for you...
        </p>
      </div>
      
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Loading;