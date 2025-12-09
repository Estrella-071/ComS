
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface EdgeProgressBarProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const EdgeProgressBar: React.FC<EdgeProgressBarProps> = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map progress (0-1) to the four sides (0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1.0)
  const topWidth = useTransform(smoothProgress, [0, 0.25], ["0%", "100%"]);
  const rightHeight = useTransform(smoothProgress, [0.25, 0.5], ["0%", "100%"]);
  const bottomWidth = useTransform(smoothProgress, [0.5, 0.75], ["0%", "100%"]);
  const leftHeight = useTransform(smoothProgress, [0.75, 1], ["0%", "100%"]);

  return (
    <div className="fixed inset-0 z-[var(--z-tooltip)] pointer-events-none">
      {/* Top Line (Left -> Right) */}
      <div className="absolute top-0 left-0 h-[4px] w-full bg-transparent">
        <motion.div 
            className="h-full bg-[var(--accent-solid)] shadow-[0_0_10px_var(--accent-solid)]" 
            style={{ width: topWidth }} 
        />
      </div>

      {/* Right Line (Top -> Bottom) */}
      <div className="absolute top-0 right-0 w-[4px] h-full bg-transparent">
        <motion.div 
            className="w-full bg-[var(--accent-solid)] shadow-[0_0_10px_var(--accent-solid)]" 
            style={{ height: rightHeight }} 
        />
      </div>

      {/* Bottom Line (Right -> Left) */}
      <div className="absolute bottom-0 right-0 h-[4px] w-full bg-transparent flex justify-end">
        <motion.div 
            className="h-full bg-[var(--accent-solid)] shadow-[0_0_10px_var(--accent-solid)]" 
            style={{ width: bottomWidth }} 
        />
      </div>

      {/* Left Line (Bottom -> Top) */}
      <div className="absolute bottom-0 left-0 w-[4px] h-full bg-transparent flex flex-col justify-end">
        <motion.div 
            className="w-full bg-[var(--accent-solid)] shadow-[0_0_10px_var(--accent-solid)]" 
            style={{ height: leftHeight }} 
        />
      </div>
    </div>
  );
};
