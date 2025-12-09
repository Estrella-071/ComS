
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon } from '../icons';

interface BackToTopButtonProps {
  show: boolean;
  onClick: () => void;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({ show, onClick }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={onClick}
          className="absolute bottom-24 right-6 w-14 h-14 bg-[var(--ui-bg)] rounded-full text-[var(--text-primary)] flex items-center justify-center shadow-xl border border-[var(--ui-border)] z-[var(--z-fab)] hover:bg-[var(--ui-bg-hover)] transition-colors backdrop-blur-md"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 500, damping: 30 } }}
          exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ChevronUpIcon className="w-8 h-8" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
