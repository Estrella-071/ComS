



import React, { useState, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import type { View } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, CodeBracketIcon, PlayIcon, ArrowPathIcon, PaperAirplaneIcon, CheckIcon } from './icons';
import { Tooltip } from './Tooltip';

interface ExerciseSolverProps {
  id: string;
  setView: (view: View) => void;
  isSidebarOpen: boolean;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '50%' : '-50%',
    opacity: 0,
  }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '50%' : '-50%',
    opacity: 0,
  }),
};

const Toast: React.FC<{ message: string }> = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-tooltip)] glass-pane px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
    >
      <CheckIcon className="w-5 h-5 text-[var(--success-text)]" />
      <span>{message}</span>
    </motion.div>
);

export const ExerciseSolver: React.FC<ExerciseSolverProps> = ({ id, setView, isSidebarOpen }) => {
  const [direction, setDirection] = useState(0);
  const { t } = useTranslation();
  const { subjectData, language } = useAppContext();

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSubmitToast, setShowSubmitToast] = useState(false);
  const [showResetToast, setShowResetToast] = useState(false);

  const exercises = useMemo(() => subjectData?.exercises || [], [subjectData]);
  const exerciseIndex = useMemo(() => exercises.findIndex(p => p.id === id), [id, exercises]);
  const exercise = exercises[exerciseIndex];
  
  useEffect(() => {
    if (exercise) {
      setCode(exercise.templateCode || '');
      setOutput('');
      setIsRunning(false);
    }
  }, [id, exercise]);

  const navigate = (dir: number) => {
    const newIndex = exerciseIndex + dir;
    if (newIndex >= 0 && newIndex < exercises.length) {
      setDirection(dir);
      const nextExerciseId = exercises[newIndex].id;
      setView({ type: 'exercise', id: nextExerciseId });
    }
  };
  
  const handleRun = () => {
    setIsRunning(true);
    setOutput('');
    setTimeout(() => {
      setOutput(exercise.sampleOutput || 'Execution complete. No output.');
      setIsRunning(false);
    }, 1000);
  };

  const handleReset = () => {
    setCode(exercise.templateCode || '');
    setShowResetToast(true);
    setTimeout(() => setShowResetToast(false), 2000);
  };

  const handleSubmit = () => {
    setShowSubmitToast(true);
    setTimeout(() => setShowSubmitToast(false), 2000);
  };
  
  const getDifficultyClass = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
        case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    }
  };

  if (!exercise) {
    return <div className="text-center py-10">Exercise not found.</div>;
  }

  const mainTitle = language === 'zh' ? exercise.title_zh : exercise.title_en;
  const subTitle = language === 'zh' ? exercise.title_en : exercise.title_zh;
  const description = language === 'zh' ? exercise.description_zh : exercise.description_en;


  return (
    <div className="h-full flex flex-col">
       <div className="flex-shrink-0 px-4 sm:px-8 pt-4">
            <div className="w-full max-w-4xl mx-auto">
                <p className="text-sm font-semibold text-center text-[var(--text-secondary)] mb-2">{t('exercise_header')} {exercise.number} ({exerciseIndex + 1} / {exercises.length})</p>
                <div className="w-full bg-[var(--ui-bg)] rounded-full h-1.5">
                    <motion.div
                        className="bg-[var(--accent-solid)] h-1.5 rounded-full"
                        animate={{ width: `${((exerciseIndex + 1) / exercises.length) * 100}%` }}
                        transition={{ type: 'spring' as const, stiffness: 200, damping: 25 }}
                    />
                </div>
            </div>
        </div>
      <div className="flex-1 w-full flex justify-center items-center relative min-h-0 pt-4">
        <div className="relative w-full max-w-4xl">
            {/* Desktop side navigation */}
            <button onClick={() => navigate(-1)} disabled={exerciseIndex <= 0} className="hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-full mr-4 w-12 h-12 bg-[var(--ui-bg)] rounded-full text-[var(--text-secondary)] disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] transition-colors z-[var(--z-content-overlay)]">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button onClick={() => navigate(1)} disabled={exerciseIndex >= exercises.length - 1} className="hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-full ml-4 w-12 h-12 bg-[var(--ui-bg)] rounded-full text-[var(--text-secondary)] disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] transition-colors z-[var(--z-content-overlay)]">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
            
            <div className="relative w-full h-full">
                <AnimatePresence>
                  {showSubmitToast && <Toast message={t('code_submitted')} />}
                  {showResetToast && <Toast message={t('code_reset')} />}
                </AnimatePresence>

                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={id}
                    className="w-full h-full"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring' as const, stiffness: 400, damping: 35 }}
                    drag={!isSidebarOpen ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (Math.abs(offset.y) > Math.abs(offset.x)) return;
                      const swipeDistanceThreshold = 100;
                      if (offset.x < -swipeDistanceThreshold || velocity.x < -400) navigate(1);
                      else if (offset.x > swipeDistanceThreshold || velocity.x > 400) navigate(-1);
                    }}
                  >
                    <div className="h-full overflow-y-auto pb-24 lg:pb-8 px-4 space-y-6">
                      <div className="glass-pane rounded-2xl p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div>
                            <span className="text-sm font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] px-3 py-1 rounded-full">
                                {t('exercise_header')} {exercise.number}
                            </span>
                            <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-4">{mainTitle}</h1>
                            <p className="text-md text-[var(--text-secondary)]">{subTitle}</p>
                          </div>
                          <div className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full flex-shrink-0 self-start ${getDifficultyClass(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </div>
                        </div>

                        <div className="prose prose-slate dark:prose-invert max-w-none text-left mt-6">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
                        </div>
                      </div>

                      <div className="glass-pane rounded-2xl p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                            <CodeBracketIcon className="w-6 h-6"/> {t('code_editor')}
                          </h2>
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <Tooltip content={t('reset_code')}><button onClick={handleReset} className="ide-button"><ArrowPathIcon className="w-5 h-5"/></button></Tooltip>
                            <Tooltip content={t('submit_code')}><button onClick={handleSubmit} className="ide-button"><PaperAirplaneIcon className="w-5 h-5"/></button></Tooltip>
                            <button onClick={handleRun} disabled={isRunning} className="flex items-center gap-2 px-4 py-2 bg-[var(--success-solid-bg)] text-[var(--success-solid-text)] rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                                <PlayIcon className="w-5 h-5"/> {t('run_code')}
                            </button>
                          </div>
                        </div>
                        <div className="bg-[#282c34] rounded-lg overflow-hidden relative">
                          <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-80 bg-transparent text-gray-300 font-mono p-4 resize-y outline-none leading-relaxed tracking-wide"
                            spellCheck="false"
                          />
                        </div>
                      </div>

                      <AnimatePresence>
                        {(isRunning || output) && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-pane rounded-2xl p-4 sm:p-6 overflow-hidden">
                            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t('output')}</h2>
                            <pre className="bg-[#282c34] rounded-lg p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap min-h-[5rem]">
                              {isRunning ? <span className="animate-pulse">{t('running_code')}</span> : output}
                            </pre>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {exercise.sampleOutput && (
                        <div className="glass-pane rounded-2xl p-4 sm:p-6">
                          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t('sample_output')}</h2>
                          <pre className="bg-[#282c34] rounded-lg p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap">{exercise.sampleOutput}</pre>
                        </div>
                      )}

                    </div>
                  </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </div>
      
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-pane border-t-0 p-3 flex justify-between items-center gap-4 z-[var(--z-mobile-nav)]">
        <button onClick={() => navigate(-1)} disabled={exerciseIndex <= 0} className="flex items-center gap-1 px-3 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)]">
          <ChevronLeftIcon className="w-5 h-5" /> <span className="hidden sm:inline">{t('previous_question')}</span>
        </button>
        <span className="text-sm font-semibold text-[var(--text-secondary)]">{exerciseIndex + 1} / {exercises.length}</span>
        <button onClick={() => navigate(1)} disabled={exerciseIndex >= exercises.length - 1} className="flex items-center gap-1 px-3 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)]">
          <span className="hidden sm:inline">{t('next_question')}</span> <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
       <style>{`.ide-button { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 8px; background-color: var(--ui-bg); color: var(--text-secondary); transition: all 0.2s; } .ide-button:hover { background-color: var(--ui-bg-hover); color: var(--text-primary); }`}</style>
    </div>
  );
};