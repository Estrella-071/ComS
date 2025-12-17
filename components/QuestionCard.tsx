
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Problem } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { Tooltip } from './Tooltip';
import { StarIcon, StarSolidIcon, GlobeAltIcon } from './icons';
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
  
  // Local state to toggle Chinese translation. Default is FALSE (English).
  // This simulates the real exam environment where questions are in English.
  const [showChinese, setShowChinese] = useState(false);

  // Reset language state when problem changes to maintain English default
  useEffect(() => {
    setShowChinese(false);
  }, [problem.id]);

  const isFlagged = flaggedItems.includes(problem.id);
  const hasAnswered = userAnswer !== undefined;

  const handleFlagToggle = () => {
    if (!isFlagged) {
        setShowFlagToast(true);
        setTimeout(() => setShowFlagToast(false), 2000);
    }
    toggleFlaggedItem(problem.id);
  };

  // Logic: 
  // Primary (Displayed) is English by default. 
  // If user toggles 'showChinese', display Chinese as Primary.
  // Tooltip always shows the OTHER language.
  
  const questionText = showChinese ? problem.text_zh : problem.text_en;
  const tooltipText = showChinese ? problem.text_en : problem.text_zh;

  return (
    <div className="w-full h-full flex flex-col relative z-0">
      <AnimatePresence>
          {showFlagToast && <Toast message={t('flagged_toast')} />}
      </AnimatePresence>

      <div 
        className="glass-pane rounded-[2.5rem] p-6 md:p-12 h-full overflow-y-auto custom-scrollbar shadow-2xl relative border border-[var(--ui-border)]"
        style={{
            backdropFilter: 'blur(30px) saturate(150%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)'
        }}
      >
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03] select-none">
             <span className="text-[12rem] font-serif font-bold text-[var(--text-primary)] leading-none">Q</span>
        </div>

        {/* Question Header Area */}
        <div className="mb-12 relative z-10">
            <div className="flex justify-between items-start gap-6">
                <div className="flex-1 space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 w-8 bg-[var(--accent-solid)] rounded-full"></div>
                            <div className="font-mono text-xs text-[var(--text-subtle)] uppercase tracking-[0.25em] font-bold">
                                Problem Statement
                            </div>
                        </div>
                     </div>
                     
                     <div className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-[var(--text-primary)] font-medium tracking-tight">
                        <Tooltip content={<span className="font-sans text-sm">{tooltipText}</span>}>
                            <span className="cursor-help decoration-dashed decoration-[var(--ui-border)] underline underline-offset-8 hover:decoration-[var(--accent-solid)] transition-all">
                                <TextWithHighlights text={questionText} />
                            </span>
                        </Tooltip>
                    </div>
                </div>
                
                <div className="flex flex-col gap-3 flex-shrink-0">
                    <motion.button
                        onClick={handleFlagToggle}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 backdrop-blur-md shadow-sm ${
                            isFlagged 
                            ? 'bg-[var(--warning-bg)] border-[var(--warning-text)] text-[var(--warning-text)]' 
                            : 'bg-[var(--ui-bg)] border-[var(--ui-border)] text-[var(--text-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[var(--ui-bg-hover)]'
                        }`}
                        aria-label={isFlagged ? 'Unflag problem' : 'Flag problem'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isFlagged ? <StarSolidIcon className="w-5 h-5" /> : <StarIcon className="w-5 h-5" />}
                    </motion.button>

                    <motion.button
                        onClick={() => setShowChinese(prev => !prev)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 backdrop-blur-md shadow-sm ${showChinese ? 'bg-[var(--text-primary)] text-[var(--bg-color)]' : 'bg-[var(--ui-bg)] text-[var(--text-secondary)]'} border-[var(--ui-border)] hover:bg-[var(--ui-bg-hover)]`}
                        aria-label="Switch Language"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <GlobeAltIcon className="w-5 h-5" />
                        <span className="absolute -bottom-1 -right-1 text-[9px] font-bold px-1 rounded-sm bg-[var(--accent-solid)] text-[var(--accent-solid-text)]">
                            {showChinese ? '中' : 'EN'}
                        </span>
                    </motion.button>
                </div>
            </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-[var(--ui-border)] via-[var(--ui-border)] to-transparent mb-12 opacity-50"></div>

        {/* Options Area */}
        <div className="mb-10 relative z-10">
            <div className="font-mono text-[10px] text-[var(--text-subtle)] uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                <span>Select Option</span>
                <div className="h-px flex-1 bg-[var(--ui-border)] opacity-50"></div>
            </div>
            
            <ProblemOptions 
                problem={problem}
                userAnswer={userAnswer}
                onAnswerSelected={onAnswerSelected}
                isRevealed={hasAnswered}
                disabled={hasAnswered}
                showChinese={showChinese}
            />
        </div>

        {/* Explanation Area */}
        <AnimatePresence>
            {hasAnswered && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
