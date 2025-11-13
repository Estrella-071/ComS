import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = window.setTimeout(() => {
        setIsVisible(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
        clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };

  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsVisible(v => !v);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouch}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-900/90 dark:bg-zinc-800/90 text-white text-sm rounded-lg px-3 py-1.5 z-[var(--z-tooltip)] shadow-lg pointer-events-none backdrop-blur-sm animate-fade-in-up">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900/90 dark:border-t-zinc-800/90"></div>
        </div>
      )}
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(4px) translateX(-50%); }
            to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.2s ease-out;
            left: 50%;
        }
      `}</style>
    </div>
  );
};