
import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '../icons';

interface ToastProps {
  message: string;
  icon?: React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({ message, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-tooltip)] glass-pane px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg bg-[var(--bg-translucent)] backdrop-blur-md border border-[var(--ui-border)]"
  >
    {icon || <CheckIcon className="w-5 h-5 text-[var(--success-text)]" />}
    <span className="text-[var(--text-primary)]">{message}</span>
  </motion.div>
);
