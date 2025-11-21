
import React, { useState } from 'react';
import { motion, MotionValue, useSpring, useMotionValueEvent } from 'framer-motion';

interface ReadingProgressProps {
  progress: MotionValue<number>;
  label?: string;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({ progress, label }) => {
  const [percentage, setPercentage] = useState(0);
  const scaleX = useSpring(progress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(progress, "change", (latest) => {
    setPercentage(Math.round(latest * 100));
  });

  return (
    <motion.div 
      className="absolute bottom-6 left-6 z-[var(--z-fab)] flex items-center gap-3 pl-4 pr-5 py-3 glass-pane rounded-full shadow-xl border border-[var(--ui-border)] bg-[var(--bg-translucent)] backdrop-blur-md max-w-[calc(100%-8rem)] transition-all hover:border-[var(--text-secondary)]"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
    >
      {label && (
         <span className="text-xs font-bold text-[var(--text-secondary)] truncate max-w-[160px] sm:max-w-[240px] border-r border-[var(--ui-border)] pr-3 mr-1 hidden sm:block">
             {label}
         </span>
      )}
      
      <div className="flex flex-col justify-center gap-1">
          <div className="flex justify-between items-center w-28">
            <span className="text-[10px] font-bold text-[var(--text-subtle)] uppercase tracking-wider">Progress</span>
            <span className="text-xs font-bold font-mono text-[var(--text-primary)]">{percentage}%</span>
          </div>
          <div className="w-28 h-1.5 bg-[var(--ui-bg)] rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-[var(--accent-solid)] origin-left rounded-full"
                style={{ scaleX }}
            />
          </div>
      </div>
    </motion.div>
  );
};
