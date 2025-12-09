
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Problem } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { Tooltip } from './Tooltip';
import { StarIcon, StarSolidIcon } from './icons';
import { TextWithHighlights } from './TextWithHighlights';
import { ProblemOptions } from './ProblemOptions';
import { ProblemExplanation } from './ProblemExplanation';
import { Toast } from './common/Toast';

interface QuestionCardProps {
  problem: Problem;
  userAnswer?: string;
  onAnswerSelected: (answer: string) => void;
  shouldAutoShowExplanation: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ problem, userAnswer, onAnswerSelected, shouldAutoShowExplanation }) => {
  const { t } = useTranslation();
  const { flaggedItems, toggleFlaggedItem } = useAppContext();
  const [showFlagToast, setShowFlagToast] = useState(false);

  const isFlagged = flaggedItems.includes(problem.id);
  const hasAnswered = userAnswer !== undefined;

  const handleFlagToggle = () => {
    if (!isFlagged) {
        setShowFlagToast(true);
        setTimeout(() => setShowFlagToast(false), 2000);
    }
    toggleFlaggedItem(problem.id);
  };

  // Force English questions, Chinese tooltip
  const questionText = problem.text_en;
  const tooltipText = problem.text_zh;

  return (
    <div className="w-full h-full flex flex-col">
      <AnimatePresence>
          {showFlagToast && <Toast message={t('flagged_toast')} />}
      </AnimatePresence>

      <div className="glass-pane rounded-[1.5rem] md:rounded-[2rem] p-5 pb-24 md:p-10 md:pb-24 lg:pb-10 h-full overflow-y-auto custom-scrollbar border border-[var(--ui-border)] shadow-xl bg-[var(--bg-translucent)] backdrop-blur-xl">
        
        {/* Question Header Area */}
        <div className="mb-6 md:mb-8 relative">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                     <div className="font-mono text-[9px] sm:text-[10px] text-[var(--text-subtle)] uppercase tracking-widest mb-2 sm:mb-4">
                        Problem Statement
                     </div>
                     <div className="text-lg sm:text-2xl lg:text-3xl font-serif leading-relaxed text-[var(--text-primary)] font-medium">
                        <Tooltip content={tooltipText}>
                            <span className="cursor-help border-b border-dashed border-[var(--text-subtle)]/30 hover:border-[var(--accent-solid)] transition-colors">
                                <TextWithHighlights text={questionText} />
                            </span>
                        </Tooltip>
                    </div>
                </div>
                
                <motion.button
                    onClick={handleFlagToggle}
                    className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isFlagged 
                        ? 'bg-[var(--warning-bg)] border-[var(--warning-text)] text-[var(--warning-text)]' 
                        : 'bg-transparent border-[var(--ui-border)] text-[var(--text-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                    }`}
                    aria-label={isFlagged ? 'Unflag problem' : 'Flag problem'}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isFlagged ? <StarSolidIcon className="w-5 h-5" /> : <StarIcon className="w-5 h-5" />}
                </motion.button>
            </div>
        </div>

        <div className="h-px w-1/4 bg-[var(--ui-border)] mb-6 md:mb-8 opacity-50"></div>

        {/* Options Area */}
        <div className="mb-8">
            <div className="font-mono text-[9px] sm:text-[10px] text-[var(--text-subtle)] uppercase tracking-widest mb-3 sm:mb-4">
                Select Option
            </div>
            <ProblemOptions 
                problem={problem}
                userAnswer={userAnswer}
                onAnswerSelected={onAnswerSelected}
                isRevealed={hasAnswered}
                disabled={hasAnswered}
            />
        </div>

        {/* Explanation Area */}
        <AnimatePresence>
            {hasAnswered && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <ProblemExplanation 
                        explanation={problem.explanation_zh}
                        isVisible={shouldAutoShowExplanation}
                    />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};
