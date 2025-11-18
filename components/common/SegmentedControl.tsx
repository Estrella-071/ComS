
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface SegmentedControlProps<T extends string> {
  options: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  layoutId,
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="flex items-center space-x-1 rounded-full bg-[var(--ui-bg)] p-1 w-full sm:w-auto relative z-0">
      {options.map((option, i) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative flex-1 h-12 rounded-full px-4 text-center text-sm font-semibold transition-colors focus:outline-none flex items-center justify-center`}
        >
          {value === option.value && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 z-0 cursor-default rounded-full bg-[var(--accent-solid)] shadow-md"
              transition={{ type: 'spring' as const, stiffness: 350, damping: 30 }}
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0.1}
              onDragEnd={(event, info) => {
                if (!containerRef.current) return;
                const { width } = containerRef.current.getBoundingClientRect();
                const optionWidth = width / options.length;
                // Calculate which index we dragged to
                const newIndex = Math.round((info.offset.x + i * optionWidth) / optionWidth);
                const clampedIndex = Math.max(0, Math.min(options.length - 1, newIndex));
                if (options[clampedIndex].value !== value) {
                    onChange(options[clampedIndex].value);
                }
              }}
              whileTap={{ cursor: 'grabbing' }}
            />
          )}
          <span className={`relative z-10 transition-colors ${value === option.value ? 'text-[var(--accent-solid-text)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
