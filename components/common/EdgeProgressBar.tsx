
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface EdgeProgressBarProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const EdgeProgressBar: React.FC<EdgeProgressBarProps> = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    // z-index 20 puts it above sticky headers (15/16) but below sidebar (41) and mobile nav
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[20] pointer-events-none">
      <motion.div 
          className="h-full bg-[var(--accent-solid)] origin-left shadow-sm" 
          style={{ scaleX }} 
      />
    </div>
  );
};
