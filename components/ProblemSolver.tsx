
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { StarIcon, StarSolidIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { Tooltip } from './Tooltip';
import { TextWithHighlights } from './TextWithHighlights';
import type { View } from '../types';
import { ProblemOptions } from './ProblemOptions';
import { ProblemExplanation } from './ProblemExplanation';
import { Toast } from './common/Toast';
import { QuestionCard } from './QuestionCard';

interface ProblemSolverProps {
  id: string;
  setView: (view: View) => void;
  isSidebarOpen: boolean;
}

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '110%' : '-110%',
    opacity: 1,
    scale: 0.95,
    zIndex: 1
  }),
  center: {
    zIndex: 2,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0.8,
    scale: 0.95,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }
  }),
};

export const ProblemSolver: React.FC<ProblemSolverProps> = ({ id, setView, isSidebarOpen }) => {
  const [direction, setDirection] = useState(0);
  const { t } = useTranslation();
  const { subjectData, flaggedItems, toggleFlaggedItem } = useAppContext();
  const [showFlagToast, setShowFlagToast] = useState(false);

  const problems = useMemo(() => subjectData?.problems || [], [subjectData]);
  
  const problemIndex = useMemo(() => problems.findIndex(p => p.id === id), [id, problems]);
  const problem = problems[problemIndex];

  const navigate = (dir: number) => {
    const newIndex = problemIndex + dir;
    if (newIndex >= 0 && newIndex < problems.length) {
      setDirection(dir);
      const nextProblemId = problems[newIndex].id;
      setView({ type: 'problem', id: nextProblemId });
    }
  };

  if (!problem) {
    return <div className="text-center py-10">Problem not found.</div>;
  }
  
  return (
    <div className="h-full flex flex-col">
       <div className="flex-shrink-0 px-4 sm:px-8 pt-20 lg:pt-4">
            <div className="w-full max-w-4xl mx-auto">
                <p className="text-sm font-semibold text-center text-[var(--text-secondary)] mb-2">{t('problem_header')} {problem.number} ({problemIndex + 1} / {problems.length})</p>
                <div className="w-full bg-[var(--ui-bg)] rounded-full h-1.5">
                    <motion.div
                        className="bg-[var(--accent-solid)] h-1.5 rounded-full"
                        animate={{ width: `${((problemIndex + 1) / problems.length) * 100}%` }}
                        transition={{ type: 'spring' as const, stiffness: 200, damping: 25 }}
                    />
                </div>
            </div>
        </div>
      <div className="flex-1 w-full flex justify-center items-center relative min-h-0 pt-4 overflow-hidden">
        
        <div className="relative w-full max-w-4xl h-full">
            <button onClick={() => navigate(-1)} disabled={problemIndex <= 0} className="hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-full mr-4 w-12 h-12 bg-[var(--ui-bg)] rounded-full text-[var(--text-secondary)] disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] transition-colors z-[var(--z-content-overlay)]">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button onClick={() => navigate(1)} disabled={problemIndex >= problems.length - 1} className="hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-full ml-4 w-12 h-12 bg-[var(--ui-bg)] rounded-full text-[var(--text-secondary)] disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] transition-colors z-[var(--z-content-overlay)]">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
            
            <div className="relative w-full h-full">
                <div className="lg:hidden absolute inset-y-0 left-0 flex items-center justify-center w-10 pointer-events-none z-[var(--z-content-overlay)]">
                  <ChevronLeftIcon className="w-8 h-8 text-[var(--text-subtle)] opacity-30" />
                </div>
                <div className="lg:hidden absolute inset-y-0 right-0 flex items-center justify-center w-10 pointer-events-none z-[var(--z-content-overlay)]">
                  <ChevronRightIcon className="w-8 h-8 text-[var(--text-subtle)] opacity-30" />
                </div>

                <AnimatePresence>
                    {showFlagToast && <Toast message={t('flagged_toast')} />}
                </AnimatePresence>

                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={id}
                    className="absolute inset-0 w-full h-full"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 30,
                        mass: 0.8
                    }}
                    drag={!isSidebarOpen ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipeDistanceThreshold = 100;
                      if (Math.abs(offset.y) > Math.abs(offset.x)) return;
                      if (offset.x < -swipeDistanceThreshold || velocity.x < -400) navigate(1);
                      else if (offset.x > swipeDistanceThreshold || velocity.x > 400) navigate(-1);
                    }}
                  >
                     <div className="h-full overflow-y-auto pb-24 lg:pb-0 px-4">
                        {/* Reuse QuestionCard for consistent look and feel, but with view-only props */}
                        <div className="mb-6">
                            <QuestionCard 
                                problem={problem}
                                onAnswerSelected={() => {}}
                                userAnswer={problem.answer} // Show correct answer implicitly or revealed
                                shouldAutoShowExplanation={true}
                            />
                        </div>
                     </div>
                  </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </div>
      
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-pane border-t-0 p-3 flex justify-between items-center gap-4 z-[var(--z-mobile-nav)]">
        <button onClick={() => navigate(-1)} disabled={problemIndex <= 0} className="flex items-center gap-1 px-3 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)]">
          <ChevronLeftIcon className="w-5 h-5" /> {t('previous_question')}
        </button>
        <span className="text-sm font-semibold text-[var(--text-secondary)]">{problemIndex + 1} / {problems.length}</span>
        <button onClick={() => navigate(1)} disabled={problemIndex >= problems.length - 1} className="flex items-center gap-1 px-3 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)]">
          {t('next_question')} <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};