
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
    <div ref={containerRef} className="flex items-center space-x-1 rounded-lg bg-[var(--ui-bg)] p-1 w-full sm:w-auto">
      {options.map((option, i) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative flex-1 rounded-md px-3 py-1.5 text-center text-sm font-medium transition-colors`}
        >
          {value === option.value && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 z-0 cursor-grab rounded-md bg-[var(--accent-solid)] shadow-sm"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                if (!containerRef.current) return;
                const { width } = containerRef.current.getBoundingClientRect();
                const optionWidth = width / options.length;
                const newIndex = Math.round((info.offset.x + i * optionWidth) / optionWidth);
                const clampedIndex = Math.max(0, Math.min(options.length - 1, newIndex));
                onChange(options[clampedIndex].value);
              }}
              whileTap={{ cursor: 'grabbing' }}
            />
          )}
          <span className={`relative z-10 transition-colors ${value === option.value ? 'text-[var(--accent-solid-text)]' : 'text-[var(--text-secondary)]'}`}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
