
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
    <div className="space-y-3">
      {problem.options.map((option) => {
        const isSelected = userAnswer === option.key;
        const isCorrect = problem.answer === option.key;
        // Force English options
        const optionText = option.text_en;
        const optionTooltip = option.text_zh;

        let stateStyles = 'bg-[var(--ui-bg)] border-transparent';
        
        if (isRevealed) {
           if (isCorrect) {
               stateStyles = 'bg-[var(--success-bg)] border-[var(--success-border)]';
           } else if (isSelected && !isCorrect) {
               stateStyles = 'bg-[var(--error-bg)] border-[var(--error-border)]';
           } else {
               stateStyles = 'bg-[var(--ui-bg)] border-transparent opacity-70';
           }
        } else if (!disabled) {
            stateStyles += ' hover:bg-[var(--ui-bg-hover)] cursor-pointer';
        } else {
            stateStyles += ' cursor-default';
        }

        return (
          <motion.button
            key={option.key}
            onClick={() => !disabled && onAnswerSelected(option.key)}
            disabled={disabled}
            className={`w-full flex items-start gap-4 px-4 py-3 sm:py-4 rounded-xl border-2 text-left transition-all ${stateStyles}`}
            whileHover={!disabled ? { scale: 1.01 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
          >
            <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm mt-0.5 ${
              isRevealed && isCorrect ? 'bg-[var(--success-solid-bg)] text-[var(--success-solid-text)]' : 
              isRevealed && isSelected && !isCorrect ? 'bg-[var(--error-solid-bg)] text-[var(--error-solid-text)]' :
              'bg-[var(--text-subtle)] text-[var(--bg-color)]'
            }`}>
              {isRevealed && isCorrect && <CheckIcon className="w-5 h-5"/>}
              {isRevealed && isSelected && !isCorrect && <XMarkIcon className="w-5 h-5"/>}
              {!isRevealed && option.key.toUpperCase()}
              {isRevealed && !isSelected && !isCorrect && option.key.toUpperCase()}
            </div>
            <Tooltip content={optionTooltip}>
              <p className={`text-[var(--text-primary)] cursor-help leading-relaxed ${isRevealed && isCorrect ? 'font-semibold' : ''}`}>
                  <TextWithHighlights text={optionText} />
              </p>
            </Tooltip>
          </motion.button>
        );
      })}
    </div>
  );
};
