
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, Variants } from 'framer-motion';
import type { Problem } from '../types';
import { QuestionCard } from './QuestionCard';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import type { View } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { useQuiz } from '../contexts/QuizContext';
import { ToggleSwitch } from './common/ToggleSwitch';
import { QuizNavigatorPopover } from './QuizNavigatorPopover';


interface QuizViewProps {
  onReturnHome: (view: View) => void;
  isSidebarOpen: boolean;
}

export const QuizView: React.FC<QuizViewProps> = ({ 
    onReturnHome, isSidebarOpen
}) => {
  const [direction, setDirection] = useState(0);
  const [justAnswered, setJustAnswered] = useState(false);
  const { t } = useTranslation();
  const { autoShowExplanation, setAutoShowExplanation, autoAdvance, setAutoAdvance } = useAppContext();
  const autoAdvanceTimer = useRef<number | null>(null);
  
  const { 
    quizState, answers, currentIndex, isFinished, 
    answerQuestion, goToProblem, finishQuiz, restartQuiz 
  } = useQuiz();

  const animatedScore = useSpring(0, { stiffness: 150, damping: 30 });
  const displayScore = useTransform(animatedScore, latest => Math.round(latest));

  useEffect(() => {
    if (isFinished && quizState) {
        const score = Array.from(answers).reduce((count: number, [id, answer]) => {
            const problem = quizState.problems.find(p => p.id === id);
            return problem && problem.answer === answer ? count + 1 : count;
        }, 0);
        animatedScore.set(score);
    }
  }, [isFinished, answers, animatedScore, quizState]);
  
  const handleFinish = useCallback(() => {
    finishQuiz();
  }, [finishQuiz]);
  
  const paginate = useCallback((newDirection: number) => {
    if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = null;
    }
    if (isFinished || !quizState) return;
    setJustAnswered(false);
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < quizState.problems.length) {
        setDirection(newDirection);
        goToProblem(newIndex);
    } else if (newIndex >= quizState.problems.length) {
        handleFinish();
    }
  }, [currentIndex, isFinished, goToProblem, handleFinish, quizState]);

  const handleAnswer = useCallback((problemId: string, answer: string) => {
    answerQuestion(problemId, answer);
    setJustAnswered(true);
  }, [answerQuestion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            return;
        }

        if (e.key === 'ArrowRight') {
            paginate(1);
        } else if (e.key === 'ArrowLeft') {
            paginate(-1);
        } else if (!isFinished && quizState && quizState.problems.length > 0) {
            const keyMap: Record<string, string> = {
                '1': 'a', '2': 'b', '3': 'c', '4': 'd',
                'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd',
                'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd'
            };
            if (keyMap[e.key]) {
                const currentProblem = quizState.problems[currentIndex];
                if (currentProblem && !answers.has(currentProblem.id)) {
                     handleAnswer(currentProblem.id, keyMap[e.key]);
                }
            }
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, isFinished, quizState, currentIndex, answers, handleAnswer]);

  
  useEffect(() => {
    if (justAnswered && autoAdvance) {
      autoAdvanceTimer.current = window.setTimeout(() => {
        paginate(1);
      }, 800);
    }
    return () => {
        if (autoAdvanceTimer.current) {
            clearTimeout(autoAdvanceTimer.current);
            autoAdvanceTimer.current = null;
        }
    };
  }, [justAnswered, autoAdvance, paginate]);

  // Smoother sliding transitions
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
      scale: 1 
    },
    exit: (direction: number) => ({
      zIndex: 0, 
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0.8,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] } 
    }),
  };

  if (!quizState) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <div className="text-[var(--text-secondary)] animate-pulse font-mono text-sm tracking-widest">LOADING QUIZ...</div>
        </div>
      );
  }

  const problems = quizState.problems;
  const title = quizState.title;

  if (problems.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="glass-pane p-8 rounded-2xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{title}</h2>
                <p className="text-[var(--text-secondary)] mb-6">There are no problems in this quiz.</p>
                <button 
                    onClick={() => onReturnHome({type: 'home'})} 
                    className="w-full bg-[var(--ui-bg)] text-[var(--text-secondary)] font-semibold px-6 py-3 rounded-xl hover:bg-[var(--ui-bg-hover)] transition-colors"
                >
                    {t('return_home')}
                </button>
            </motion.div>
        </div>
    )
  }

  const resultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };
  const resultItemVariants = {
      hidden: { y: 15, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 30 } }
  } as const;
  
  const currentScore = Array.from(answers).reduce((count: number, [id, answer]) => {
      const problem = problems.find(p => p.id === id);
      return problem && problem.answer === answer ? count + 1 : count;
  }, 0);

  if (isFinished) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <motion.div 
                variants={resultContainerVariants}
                initial="hidden"
                animate="visible"
                className="glass-pane p-8 rounded-3xl w-full max-w-md shadow-2xl border border-[var(--ui-border)]"
            >
                <motion.h2 variants={resultItemVariants} className="text-3xl font-serif font-bold text-[var(--text-primary)] mb-2">{t('quiz_completed')}</motion.h2>
                <motion.p variants={resultItemVariants} className="text-lg text-[var(--text-secondary)] mb-8 font-mono text-xs tracking-widest uppercase">{t('your_score')}</motion.p>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                    <motion.div variants={resultItemVariants} className="text-7xl font-bold text-[var(--accent-solid)] font-serif">{displayScore}</motion.div>
                    <motion.div variants={resultItemVariants} className="text-2xl font-bold text-[var(--text-subtle)] font-mono">/ {problems.length}</motion.div>
                </div>
                <motion.div variants={resultItemVariants} className="text-sm font-medium text-[var(--text-secondary)] mb-10 font-mono">
                    ACCURACY: {problems.length > 0 ? ((currentScore / problems.length) * 100).toFixed(1) : 0}%
                </motion.div>
                <motion.div className="space-y-3" variants={resultContainerVariants}>
                    <motion.button 
                        variants={resultItemVariants}
                        onClick={restartQuiz} 
                        className="w-full bg-[var(--accent-solid)] text-[var(--accent-solid-text)] font-bold px-6 py-4 rounded-full shadow-lg hover:bg-[var(--accent-solid-hover)] transition-all hover:scale-[1.02] active:scale-0.98"
                    >
                        {t('restart_quiz')}
                    </motion.button>
                    <motion.button 
                        variants={resultItemVariants}
                        onClick={() => onReturnHome({type: 'home'})} 
                        className="w-full bg-transparent text-[var(--text-secondary)] font-semibold px-6 py-3 rounded-full hover:bg-[var(--ui-bg)] transition-colors border border-[var(--ui-border)]"
                    >
                        {t('return_home')}
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col p-2 sm:p-4 lg:p-8 relative pt-20 lg:pt-8">
      <div className="flex-shrink-0 mb-2 sm:mb-6 relative z-10">
         <div className="flex flex-col md:flex-row justify-between md:items-start gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                     <span className="font-mono text-[10px] font-bold text-[var(--accent-solid)] border border-[var(--accent-solid)] px-1.5 py-0.5 rounded">
                        Q.{currentIndex + 1}
                     </span>
                     <span className="font-mono text-[10px] text-[var(--text-subtle)] tracking-widest uppercase">
                        Total {problems.length}
                     </span>
                </div>
                <div className="flex items-center gap-2">
                     <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[var(--text-primary)] leading-tight truncate pr-4">{title}</h1>
                     <div className="flex-shrink-0"><QuizNavigatorPopover onNavigate={onReturnHome} /></div>
                </div>
            </div>
            
             <div className="flex flex-row items-center justify-end gap-2 sm:gap-4 self-end md:self-auto bg-[var(--bg-translucent)] backdrop-blur-sm p-1.5 sm:p-2 rounded-full border border-[var(--ui-border)] shadow-sm scale-90 sm:scale-100 origin-right">
                <label htmlFor="auto-show-explanation" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] cursor-pointer px-2 select-none">
                    <span className="hidden sm:inline">{t('show_explanation_on_answer')}</span>
                    <span className="sm:hidden">Expl.</span>
                    <ToggleSwitch id="auto-show-explanation" checked={autoShowExplanation} onChange={setAutoShowExplanation} />
                </label>
                <div className="w-px h-4 bg-[var(--ui-border)]"></div>
                <label htmlFor="auto-advance" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] cursor-pointer px-2 select-none">
                    <span className="hidden sm:inline">{t('auto_advance_on_answer')}</span>
                    <span className="sm:hidden">Auto</span>
                    <ToggleSwitch id="auto-advance" checked={autoAdvance} onChange={setAutoAdvance} />
                </label>
            </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--ui-border)] mt-2 hidden md:block">
            <motion.div
                className="h-[2px] bg-[var(--accent-solid)] origin-left"
                animate={{ scaleX: (currentIndex + 1) / problems.length }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            />
        </div>
         <div className="w-full h-1 bg-[var(--ui-bg)] mt-2 rounded-full overflow-hidden md:hidden">
             <motion.div
                className="h-full bg-[var(--accent-solid)] origin-left"
                animate={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            />
         </div>
      </div>
      
      {/* 
        The parent div here acts as the viewport. 
        `relative` and `overflow-hidden` are crucial for the `absolute` positioning of cards to work correctly.
      */}
      <div className="flex-1 relative w-full overflow-hidden">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    mass: 0.8
                }}
                className="absolute inset-0 w-full h-full"
                drag={!isSidebarOpen ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2} // More elastic for a better 'preview' feel
                onDragEnd={(e, { offset, velocity }) => {
                    const swipeDistanceThreshold = 50;
                    if (Math.abs(offset.y) > Math.abs(offset.x)) return;
                    if (offset.x < -swipeDistanceThreshold || velocity.x < -400) {
                        paginate(1);
                    } else if (offset.x > swipeDistanceThreshold || velocity.x > 400) {
                        paginate(-1);
                    }
                }}
                onClick={e => e.stopPropagation()}
            >
                <QuestionCard
                    problem={problems[currentIndex]}
                    onAnswerSelected={(answer) => handleAnswer(problems[currentIndex].id, answer)}
                    userAnswer={answers.get(problems[currentIndex].id)}
                    shouldAutoShowExplanation={answers.has(problems[currentIndex].id) && autoShowExplanation}
                />
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-4 sm:mt-6 flex-shrink-0 gap-4 pointer-events-none relative z-10">
        <motion.button
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0 || isFinished}
          className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-4 bg-[var(--bg-color)] text-[var(--text-primary)] rounded-full border border-[var(--ui-border)] shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--ui-bg)] hover:border-[var(--text-primary)] transition-all group"
          whileTap={{ scale: 0.95 }}
        >
            <ChevronLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1"/>
            <span className="hidden sm:inline font-bold text-sm tracking-wide">{t('previous_question')}</span>
        </motion.button>

        <motion.button
          onClick={() => paginate(1)}
          disabled={isFinished}
          className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-[var(--accent-solid)] text-[var(--accent-solid-text)] rounded-full shadow-xl shadow-[var(--accent-solid)]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--accent-solid-hover)] transition-all group hover:scale-105 active:scale-95"
          whileTap={{ scale: 0.95 }}
          animate={justAnswered ? { scale: [1, 1.03, 1] } : {}}
          transition={justAnswered ? { duration: 0.2, ease: "easeInOut" } : {}}
        >
            <span className="hidden sm:inline font-bold text-sm tracking-wide">{currentIndex === problems.length - 1 ? t('results') : t('next_question')}</span>
            <span className="sm:hidden font-bold">{currentIndex === problems.length - 1 ? t('results') : t('next_question')}</span>
            <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1"/>
        </motion.button>
      </div>
    </div>
  );
};