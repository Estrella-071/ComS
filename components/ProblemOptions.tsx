
import React from 'react';
import { motion } from 'framer-motion';
import type { Problem } from '../types';
import { CheckIcon, XMarkIcon } from './icons';
import { Tooltip } from './Tooltip';
import { TextWithHighlights } from './TextWithHighlights';

interface ProblemOptionsProps {
  problem: Problem;
  userAnswer?: string;
  onAnswerSelected: (key: string) => void;
  isRevealed: boolean; // If true, shows the correct answer regardless of user input
  disabled?: boolean;
}

export const ProblemOptions: React.FC<ProblemOptionsProps> = ({
  problem,
  userAnswer,
  onAnswerSelected,
  isRevealed,
  disabled = false,
}) => {
  return (
    <div className="grid grid-cols-1 gap-2.5 md:gap-3">
      {problem.options.map((option, index) => {
        const isSelected = userAnswer === option.key;
        const isCorrect = problem.answer === option.key;
        
        // Force English options
        const optionText = option.text_en;
        const optionTooltip = option.text_zh;

        let containerClasses = "relative group w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 border ";
        let indicatorClasses = "flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border ";
        let textClasses = "font-sans text-sm md:text-base transition-colors duration-300 text-left flex-1 ";

        if (isRevealed) {
           if (isCorrect) {
               // Correct Answer State
               containerClasses += "bg-[var(--success-bg)] border-[var(--success-text)] shadow-[0_0_15px_rgba(34,197,94,0.15)]";
               indicatorClasses += "bg-[var(--success-solid-bg)] text-white border-[var(--success-solid-bg)]";
               textClasses += "text-[var(--text-primary)] font-medium";
           } else if (isSelected && !isCorrect) {
               // Wrong Selection State
               containerClasses += "bg-[var(--error-bg)] border-[var(--error-text)] opacity-90";
               indicatorClasses += "bg-[var(--error-solid-bg)] text-white border-[var(--error-solid-bg)]";
               textClasses += "text-[var(--text-primary)]";
           } else {
               // Unselected, Irrelevant Options (Dimmed)
               containerClasses += "bg-transparent border-transparent opacity-40";
               indicatorClasses += "bg-transparent text-[var(--text-subtle)] border-[var(--ui-border)]";
               textClasses += "text-[var(--text-secondary)]";
           }
        } else {
            // Interactive State
            if (isSelected) {
                // Active/Selected State (Before reveal, if we supported multi-step, but here immediate reveal happens usually. 
                // If immediate reveal is off, this state matters).
                // Assuming immediate reveal for now based on logic, but styling for 'active' just in case.
                containerClasses += "bg-[var(--accent-solid)] border-[var(--accent-solid)] shadow-lg transform scale-[1.01]";
                indicatorClasses += "bg-white text-[var(--accent-solid)] border-white";
                textClasses += "text-[var(--accent-solid-text)]";
            } else {
                // Idle State
                containerClasses += "bg-[var(--ui-bg)] border-transparent hover:bg-[var(--ui-bg-hover)] hover:border-[var(--ui-border)] cursor-pointer";
                indicatorClasses += "bg-[var(--bg-color)] text-[var(--text-secondary)] border-[var(--ui-border)] group-hover:border-[var(--text-subtle)] group-hover:scale-110";
                textClasses += "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]";
            }
        }
        
        if (disabled) containerClasses += " cursor-default";

        return (
          <motion.button
            key={option.key}
            onClick={() => !disabled && onAnswerSelected(option.key)}
            disabled={disabled}
            className={containerClasses}
            initial={false}
            whileHover={!disabled && !isRevealed ? { x: 5 } : {}}
            whileTap={!disabled && !isRevealed ? { scale: 0.98 } : {}}
          >
            <div className={indicatorClasses}>
              {isRevealed && isCorrect ? <CheckIcon className="w-3 h-3 md:w-4 md:h-4"/> : 
               isRevealed && isSelected && !isCorrect ? <XMarkIcon className="w-3 h-3 md:w-4 md:h-4"/> :
               String.fromCharCode(65 + index)} {/* A, B, C, D... */}
            </div>
            
            <Tooltip content={optionTooltip}>
              <div className={textClasses}>
                 <TextWithHighlights text={optionText} />
              </div>
            </Tooltip>

            {/* Aesthetic Decor Line for Selected Item */}
            {!isRevealed && isSelected && (
                <motion.div 
                    layoutId="selection-indicator"
                    className="absolute right-3 md:right-4 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white"
                />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
