
import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, id }) => {
  const spring = { type: "spring", stiffness: 700, damping: 30 } as const;

  return (
    <div
      id={id}
      onClick={() => onChange(!checked)}
      className={`flex h-6 w-11 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out`}
      style={{
        backgroundColor: checked ? 'var(--success-solid-bg)' : 'var(--ui-bg-hover)',
        justifyContent: checked ? 'flex-end' : 'flex-start'
      }}
    >
      <motion.div
        className="h-5 w-5 rounded-full bg-white shadow-md"
        layout
        transition={spring}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0.5, right: 0.5 }}
        onDragEnd={(e, info) => {
          if (checked && info.offset.x < -10) {
            onChange(false);
          } else if (!checked && info.offset.x > 10) {
            onChange(true);
          }
        }}
        onDragStart={(e) => e.stopPropagation()}
      />
    </div>
  );
};
