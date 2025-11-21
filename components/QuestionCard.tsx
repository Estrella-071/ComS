
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
    <div className="glass-pane rounded-2xl p-4 sm:p-8 h-full overflow-y-auto">
      <AnimatePresence>
          {showFlagToast && <Toast message={t('flagged_toast')} />}
      </AnimatePresence>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] px-3 py-1 rounded-full inline-block">
              {`${t('chapter')} ${problem.chapter}${t('chapter_unit')} - ${t('problem_header')} ${problem.number}`}
          </p>
          <div className="relative flex items-center">
            <motion.button
                onClick={handleFlagToggle}
                className="text-[var(--warning-text)] hover:text-[var(--warning-text-hover)] transition-colors p-2 -m-2"
                aria-label={isFlagged ? 'Unflag problem' : 'Flag problem'}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.4, rotate: 15 }}
            >
                {isFlagged ? <StarSolidIcon className="w-6 h-6" /> : <StarIcon className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
        <div className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
            <Tooltip content={tooltipText}>
                <p className="border-b border-dashed border-slate-400 dark:border-slate-600 cursor-help inline">
                    <TextWithHighlights text={questionText} />
                </p>
            </Tooltip>
        </div>
      </div>

      <ProblemOptions 
          problem={problem}
          userAnswer={userAnswer}
          onAnswerSelected={onAnswerSelected}
          isRevealed={hasAnswered}
          disabled={hasAnswered}
      />

      {hasAnswered && (
          <ProblemExplanation 
            explanation={problem.explanation_zh}
            isVisible={shouldAutoShowExplanation}
          />
      )}
    </div>
  );
};
