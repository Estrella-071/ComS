
import React, { useState, useRef, useLayoutEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ top?: string; bottom?: string; left: string; transform: string }>({ bottom: '100%', left: '50%', transform: 'translateX(-50%)' });
  const timerRef = useRef<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newPos: any = { left: '50%', transform: 'translateX(-50%)' };

        // Check Top overflow
        if (containerRect.top - tooltipRect.height < 0) {
            newPos.top = '100%';
            newPos.bottom = 'auto';
            newPos.marginTop = '0.5rem';
            newPos.marginBottom = '0';
        } else {
            newPos.bottom = '100%';
            newPos.top = 'auto';
            newPos.marginBottom = '0.5rem';
            newPos.marginTop = '0';
        }

        // Check Left/Right overflow
        // Note: We can't easily change 'left' purely via CSS relative to parent without complex calculations
        // if the parent itself is near the edge. 
        // Simple clamp logic:
        // If tooltip rect left < 0, shift right.
        // If tooltip rect right > viewportWidth, shift left.
        
        // Since the tooltip is absolute relative to the span, its 'left' 0 is the span's left.
        // We'll use standard centering and then apply a correction.
        
        const overflowLeft = containerRect.left + (containerRect.width / 2) - (tooltipRect.width / 2);
        const overflowRight = containerRect.left + (containerRect.width / 2) + (tooltipRect.width / 2);
        
        if (overflowLeft < 10) {
             newPos.left = '0';
             newPos.transform = 'translateX(0)';
        } else if (overflowRight > viewportWidth - 10) {
             newPos.left = 'auto';
             newPos.right = '0';
             newPos.transform = 'translateX(0)';
        }

        setPosition(newPos);
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouch}
    >
      {children}
      {isVisible && (
        <div 
            ref={tooltipRef}
            style={{
                ...position,
                marginBottom: position.bottom ? '0.5rem' : 0,
                marginTop: position.top ? '0.5rem' : 0,
            }}
            className="absolute w-max max-w-xs bg-slate-900/90 dark:bg-zinc-800/90 text-white text-sm rounded-lg px-3 py-2 z-[var(--z-tooltip)] shadow-lg pointer-events-none backdrop-blur-sm animate-fade-in"
        >
          {content}
        </div>
      )}
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95) translateY(4px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
