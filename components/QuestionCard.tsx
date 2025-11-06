import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { motion, AnimatePresence } from 'framer-motion';
import type { Problem } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { Tooltip } from './Tooltip';
import { CheckIcon, XMarkIcon, StarIcon, StarSolidIcon } from './icons';
import { TextWithHighlights } from './TextWithHighlights';

interface QuestionCardProps {
  problem: Problem;
  userAnswer?: string;
  onAnswerSelected: (answer: string) => void;
  shouldAutoShowExplanation: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ problem, userAnswer, onAnswerSelected, shouldAutoShowExplanation }) => {
  const { t } = useTranslation();
  const { flaggedProblems, toggleFlaggedProblem } = useAppContext();
  const [showManualExplanation, setShowManualExplanation] = useState(false);
  const [showFlagToast, setShowFlagToast] = useState(false);
  
  const isFlagged = flaggedProblems.includes(problem.id);
  const hasAnswered = userAnswer !== undefined;
  const isExplanationEffectivelyVisible = shouldAutoShowExplanation || showManualExplanation;

  const handleFlagToggle = () => {
    if (!isFlagged) {
        setShowFlagToast(true);
        setTimeout(() => setShowFlagToast(false), 2000);
    }
    toggleFlaggedProblem(problem.id);
  };

  return (
    <div className="bg-[var(--bg-translucent)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-3xl p-6 sm:p-8 h-full overflow-y-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] px-3 py-1 rounded-full inline-block">
              {`${t('chapter')} ${problem.chapter}${t('chapter_unit')} - ${t('problem_header')} ${problem.number}`}
          </p>
          <div className="relative flex items-center">
            <AnimatePresence>
                {showFlagToast && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-1/2 -translate-y-1/2 right-full mr-2 bg-amber-400 text-amber-900 text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap"
                    >
                        {t('flagged_toast')}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                onClick={handleFlagToggle}
                className="text-amber-400 hover:text-amber-500 transition-colors p-2 -m-2"
                aria-label={isFlagged ? 'Unflag problem' : 'Flag problem'}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.4, rotate: 15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
                {isFlagged ? <StarSolidIcon className="w-6 h-6" /> : <StarIcon className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
        <div className="text-lg leading-relaxed text-[var(--text-secondary)]">
            <Tooltip content={problem.text_zh}>
                <p className="border-b border-dashed border-slate-400 dark:border-slate-600 cursor-help inline">
                    <TextWithHighlights text={problem.text_en} />
                </p>
            </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        {problem.options.map((option) => {
          const isSelected = userAnswer === option.key;
          const isCorrect = problem.answer === option.key;
          
          let stateStyles = 'bg-[var(--ui-bg)] border-transparent hover:bg-[var(--ui-bg-hover)]';
          if (hasAnswered) {
              if (isCorrect) {
                  stateStyles = 'bg-green-500/20 border-green-500/50';
              } else if (isSelected && !isCorrect) {
                  stateStyles = 'bg-red-500/20 border-red-500/50';
              }
          }

          return (
            <motion.button
              key={option.key}
              onClick={() => onAnswerSelected(option.key)}
              disabled={hasAnswered}
              className={`w-full flex items-center gap-4 px-4 py-5 rounded-xl border-2 text-left transition-all duration-200 ${stateStyles} ${!hasAnswered ? 'cursor-pointer' : 'cursor-default'}`}
              whileHover={!hasAnswered ? { scale: 1.02 } : {}}
              whileTap={!hasAnswered ? { scale: 0.98 } : {}}
            >
              <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm text-white ${
                hasAnswered && isCorrect ? 'bg-green-500' : 
                hasAnswered && isSelected ? 'bg-red-500' :
                'bg-[var(--text-subtle)] text-[var(--bg-color)]'
              }`}>
                {hasAnswered && isCorrect && <CheckIcon className="w-5 h-5"/>}
                {hasAnswered && isSelected && !isCorrect && <XMarkIcon className="w-5 h-5"/>}
                {!hasAnswered && option.key.toUpperCase()}
                {hasAnswered && !isSelected && !isCorrect && option.key.toUpperCase()}
              </div>
              <div className="flex-1">
                  <Tooltip content={option.text_zh}>
                    <p className={`text-[var(--text-primary)] cursor-help ${hasAnswered && isCorrect ? 'font-semibold' : ''}`}>
                        <TextWithHighlights text={option.text_en} />
                    </p>
                </Tooltip>
              </div>
            </motion.button>
          );
        })}
      </div>
      
       {hasAnswered && !shouldAutoShowExplanation && (
        <div className="mt-6 pt-6 border-t border-[var(--ui-border)] text-center">
            <button
                onClick={() => setShowManualExplanation(!showManualExplanation)}
                className="bg-[var(--ui-bg)] text-[var(--text-secondary)] font-semibold px-5 py-2 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors"
            >
                {showManualExplanation ? t('hide_explanation') : t('show_explanation')}
            </button>
        </div>
       )}

      <AnimatePresence>
        {hasAnswered && isExplanationEffectivelyVisible && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="mt-6 pt-6 border-t border-[var(--ui-border)]">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t('explanation')}</h3>
                    <div className="prose prose-slate dark:prose-invert max-w-none text-left prose-headings:font-semibold prose-p:leading-loose prose-p:text-[var(--text-secondary)] prose-li:text-[var(--text-secondary)]">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        >
                            {problem.explanation_zh}
                        </ReactMarkdown>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};