
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
  isRevealed: boolean; 
  disabled?: boolean;
  showChinese?: boolean;
}

export const ProblemOptions: React.FC<ProblemOptionsProps> = ({
  problem,
  userAnswer,
  onAnswerSelected,
  isRevealed,
  disabled = false,
  showChinese = false,
}) => {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:gap-4">
      {problem.options.map((option, index) => {
        const isSelected = userAnswer === option.key;
        const isCorrect = problem.answer === option.key;
        
        const optionText = showChinese ? option.text_zh : option.text_en;
        const optionTooltip = showChinese ? option.text_en : option.text_zh;

        // Optimized classes for mobile readability and touch targets
        let containerClasses = "relative group w-full flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 border backdrop-blur-md ";
        // Ensure indicator stays circular and doesn't squash
        let indicatorClasses = "flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 border mt-0.5 ";
        let textClasses = "font-sans text-sm sm:text-base transition-colors duration-300 text-left flex-1 leading-normal break-words ";

        if (isRevealed) {
           if (isCorrect) {
               containerClasses += "bg-[var(--success-bg)] border-[var(--success-text)] shadow-[0_0_15px_rgba(34,197,94,0.1)] ring-1 ring-[var(--success-text)]";
               indicatorClasses += "bg-[var(--success-solid-bg)] text-white border-[var(--success-solid-bg)] shadow-sm";
               textClasses += "text-[var(--text-primary)] font-medium";
           } else if (isSelected && !isCorrect) {
               containerClasses += "bg-[var(--error-bg)] border-[var(--error-text)] opacity-90";
               indicatorClasses += "bg-[var(--error-solid-bg)] text-white border-[var(--error-solid-bg)] shadow-sm";
               textClasses += "text-[var(--text-primary)]";
           } else {
               containerClasses += "bg-transparent border-transparent opacity-50 grayscale";
               indicatorClasses += "bg-[var(--ui-bg)] text-[var(--text-subtle)] border-[var(--ui-border)]";
               textClasses += "text-[var(--text-secondary)]";
           }
        } else {
            if (isSelected) {
                containerClasses += "bg-[var(--text-primary)] border-[var(--text-primary)] shadow-lg transform scale-[1.01] z-10";
                indicatorClasses += "bg-[var(--bg-color)] text-[var(--text-primary)] border-[var(--bg-color)]";
                textClasses += "text-[var(--bg-color)]";
            } else {
                containerClasses += "bg-[var(--bg-translucent)] border-[var(--ui-border)] hover:border-[var(--text-primary)] hover:bg-[var(--ui-bg)] cursor-pointer hover:shadow-md md:hover:translate-x-1";
                indicatorClasses += "bg-[var(--ui-bg)] text-[var(--text-secondary)] border-[var(--ui-border)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-color)] group-hover:border-[var(--text-primary)] group-hover:scale-105";
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
            whileTap={!disabled && !isRevealed ? { scale: 0.98 } : {}}
          >
            <div className={indicatorClasses}>
              {isRevealed && isCorrect ? <CheckIcon className="w-4 h-4"/> : 
               isRevealed && isSelected && !isCorrect ? <XMarkIcon className="w-4 h-4"/> :
               String.fromCharCode(65 + index)}
            </div>
            
            <Tooltip content={optionTooltip}>
              <div className={textClasses}>
                 <TextWithHighlights text={optionText} />
              </div>
            </Tooltip>

            {!isRevealed && isSelected && (
                <motion.div 
                    layoutId="selection-indicator"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--bg-color)]"
                />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
