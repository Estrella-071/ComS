import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { motion, AnimatePresence } from 'framer-motion';
import type { Problem } from '../types';
import { problems } from '../data/problems';
import { CheckIcon, StarIcon, StarSolidIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { Tooltip } from './Tooltip';
import { TextWithHighlights } from './TextWithHighlights';
import type { View } from '../App';

interface ProblemSolverProps {
  id: string;
  setView: (view: View) => void;
  isSidebarOpen: boolean;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({ id, setView, isSidebarOpen }) => {
  const { t } = useTranslation();
  const [showExplanation, setShowExplanation] = useState(false);
  const [showFlagToast, setShowFlagToast] = useState(false);
  const { flaggedProblems, toggleFlaggedProblem } = useAppContext();
  
  const problem = problems.find(p => p.id === id);
  const isFlagged = problem ? flaggedProblems.includes(problem.id) : false;
  
  const problemIndex = useMemo(() => problems.findIndex(p => p.id === id), [id]);

  const navigate = (direction: number) => {
    const newIndex = problemIndex + direction;
    if (newIndex >= 0 && newIndex < problems.length) {
      const nextProblemId = problems[newIndex].id;
      setView({ type: 'problem', id: nextProblemId });
    }
  };

  const handleFlagToggle = () => {
    if (!problem) return;
    const isCurrentlyFlagged = flaggedProblems.includes(problem.id);
    if (!isCurrentlyFlagged) {
        setShowFlagToast(true);
        setTimeout(() => setShowFlagToast(false), 2000);
    }
    toggleFlaggedProblem(problem.id);
  };

  if (!problem) {
    return <div className="text-center py-10">Problem not found.</div>;
  }

  return (
    <div className="relative">
      {/* Visual affordances for swiping on touch devices */}
      <div className="lg:hidden absolute inset-y-0 left-0 flex items-center justify-center w-10 pointer-events-none z-10">
        <ChevronLeftIcon className="w-8 h-8 text-[var(--text-subtle)] opacity-20" />
      </div>
      <div className="lg:hidden absolute inset-y-0 right-0 flex items-center justify-center w-10 pointer-events-none z-10">
        <ChevronRightIcon className="w-8 h-8 text-[var(--text-subtle)] opacity-20" />
      </div>

       <motion.div
        className="max-w-4xl mx-auto pb-24 lg:pb-0" // Padding bottom for mobile nav
        drag={!isSidebarOpen ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset, velocity }) => {
            const swipeThreshold = 100;
            if (offset.x < -swipeThreshold || velocity.x < -400) {
                navigate(1);
            } else if (offset.x > swipeThreshold || velocity.x > 400) {
                navigate(-1);
            }
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-[var(--bg-translucent)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-start">
              <span className="text-sm font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] px-3 py-1 rounded-full">
                  {t('problem_header')} {problem.number}
              </span>
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
                  <button
                      onClick={handleFlagToggle}
                      className="text-amber-400 hover:text-amber-500 transition-colors p-1"
                      aria-label={isFlagged ? 'Unflag problem' : 'Flag problem'}
                  >
                      {isFlagged ? <StarSolidIcon className="w-6 h-6" /> : <StarIcon className="w-6 h-6" />}
                  </button>
              </div>
          </div>
          <div className="text-lg leading-relaxed text-[var(--text-secondary)] mt-4">
              <Tooltip content={problem.text_zh}>
                  <p className="border-b border-dashed border-slate-400 dark:border-slate-600 cursor-help inline">
                      <TextWithHighlights text={problem.text_en} />
                  </p>
              </Tooltip>
          </div>
        </div>

        <div className="bg-[var(--bg-translucent)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t('options')}</h2>
          <div className="space-y-3">
              {problem.options.map((option) => {
                  const isCorrect = option.key === problem.answer;
                  return (
                      <div
                          key={option.key}
                          className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                              isCorrect 
                                  ? 'bg-green-500/20 border-green-500/50' 
                                  : 'bg-[var(--ui-bg)] border-transparent'
                          }`}
                      >
                          <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center font-bold text-sm ${
                              isCorrect 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-[var(--text-subtle)] text-[var(--bg-color)]'
                          }`}>
                              {isCorrect ? <CheckIcon className="w-4 h-4"/> : option.key.toUpperCase()}
                          </div>
                          <div className="flex-1">
                              <Tooltip content={option.text_zh}>
                                  <p className={`text-[var(--text-primary)] cursor-help ${isCorrect ? 'font-semibold' : ''}`}>
                                      <TextWithHighlights text={option.text_en} />
                                  </p>
                              </Tooltip>
                          </div>
                      </div>
                  );
              })}
          </div>
          <div className="mt-6 pt-6 border-t border-[var(--ui-border)] text-center">
              <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="bg-[var(--ui-bg)] text-[var(--text-secondary)] font-semibold px-5 py-2 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors"
              >
                  {showExplanation ? t('hide_explanation') : t('show_explanation')}
              </button>
          </div>

          <AnimatePresence>
              {showExplanation && (
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
      </motion.div>

      {/* Mobile-only bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-translucent)] backdrop-blur-xl border-t border-t-[var(--ui-border)] p-2 flex justify-between items-center z-40">
        <button onClick={() => navigate(-1)} disabled={problemIndex <= 0} className="flex items-center gap-1 px-3 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] transition-colors">
            <ChevronLeftIcon className="w-5 h-5"/> {t('previous_question')}
        </button>
        <span className="text-sm font-semibold text-[var(--text-secondary)]">{problemIndex + 1} / {problems.length}</span>
        <button onClick={() => navigate(1)} disabled={problemIndex >= problems.length - 1} className="flex items-center gap-1 px-3 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] transition-colors">
            {t('next_question')} <ChevronRightIcon className="w-5 h-5"/>
        </button>
      </div>

      {/* Desktop side navigation */}
       <button onClick={() => navigate(-1)} disabled={problemIndex <= 0} className="hidden lg:flex items-center justify-center absolute top-1/2 -left-20 -translate-y-1/2 w-12 h-12 bg-[var(--ui-bg)] rounded-full text-[var(--text-secondary)] disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] transition-colors">
           <ChevronLeftIcon className="w-6 h-6"/>
       </button>
       <button onClick={() => navigate(1)} disabled={problemIndex >= problems.length - 1} className="hidden lg:flex items-center justify-center absolute top-1/2 -right-20 -translate-y-1/2 w-12 h-12 bg-[var(--ui-bg)] rounded-full text-[var(--text-secondary)] disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] transition-colors">
           <ChevronRightIcon className="w-6 h-6"/>
       </button>
    </div>
  );
};