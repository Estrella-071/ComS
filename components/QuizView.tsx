
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import type { Problem, AnsweredQuestion } from '../types';
import { QuestionCard } from './QuestionCard';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import type { View } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { useQuiz } from '../contexts/QuizContext';
import { ToggleSwitch } from './common/ToggleSwitch';


interface QuizViewProps {
  onReturnHome: (view: View) => void;
  isSidebarOpen: boolean;
  onSaveResult: (score: number, total: number, answered: AnsweredQuestion[]) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ 
    onReturnHome, isSidebarOpen, onSaveResult
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

  const problems = quizState?.problems || [];
  const title = quizState?.title || '';

  const score = useMemo(() => {
    return Array.from(answers).reduce((count: number, [id, answer]) => {
        const problem = problems.find(p => p.id === id);
        return problem && problem.answer === answer ? count + 1 : count;
    }, 0);
  }, [problems, answers]);
  
  const handleFinish = useCallback(() => {
    finishQuiz();
    const answeredQuestions: AnsweredQuestion[] = problems.map((p) => ({
      problemId: p.id,
      userAnswer: answers.get(p.id) || '',
      isCorrect: answers.get(p.id) === p.answer,
    }));
    onSaveResult(score, problems.length, answeredQuestions);
  }, [finishQuiz, problems, answers, onSaveResult, score]);
  
  const paginate = useCallback((newDirection: number) => {
    if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = null;
    }
    if (isFinished) return;
    setJustAnswered(false);
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < problems.length) {
        setDirection(newDirection);
        goToProblem(newIndex);
    } else if (newIndex >= problems.length) {
        handleFinish();
    }
  }, [currentIndex, problems.length, isFinished, goToProblem, handleFinish]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            paginate(1);
        } else if (e.key === 'ArrowLeft') {
            paginate(-1);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const handleAnswer = (problemId: string, answer: string) => {
    answerQuestion(problemId, answer);
    setJustAnswered(true);
  };
  
  useEffect(() => {
    if (justAnswered && autoAdvance) {
      autoAdvanceTimer.current = window.setTimeout(() => {
        paginate(1);
      }, 1500);
    }
    return () => {
        if (autoAdvanceTimer.current) {
            clearTimeout(autoAdvanceTimer.current);
            autoAdvanceTimer.current = null;
        }
    };
  }, [justAnswered, autoAdvance, paginate]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '50%' : '-50%', opacity: 0
    }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({
      zIndex: 0, x: direction < 0 ? '50%' : '-50%', opacity: 0
    }),
  };

  if (problems.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
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

  const animatedScore = useSpring(0, { stiffness: 100, damping: 30 });
  const displayScore = useTransform(animatedScore, latest => Math.round(latest));

  useEffect(() => {
    if (isFinished) {
      animatedScore.set(score);
    }
  }, [isFinished, score, animatedScore]);

  const resultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };
  const resultItemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  } as const;

  if (isFinished) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <motion.div 
                variants={resultContainerVariants}
                initial="hidden"
                animate="visible"
                className="glass-pane p-8 rounded-2xl w-full max-w-md"
            >
                <motion.h2 variants={resultItemVariants} className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t('quiz_completed')}</motion.h2>
                <motion.p variants={resultItemVariants} className="text-lg text-[var(--text-secondary)] mb-8">{t('your_score')}</motion.p>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                    <motion.div variants={resultItemVariants} className="text-7xl font-bold text-[var(--accent-text)]">{displayScore}</motion.div>
                    <motion.div variants={resultItemVariants} className="text-4xl font-bold text-[var(--text-subtle)]">/ {problems.length}</motion.div>
                </div>
                <motion.div variants={resultItemVariants} className="text-xl font-medium text-[var(--text-primary)] mb-10">
                    {problems.length > 0 ? ((score / problems.length) * 100).toFixed(1) : 0}%
                </motion.div>
                <motion.div className="space-y-4" variants={resultContainerVariants}>
                    <motion.button 
                        variants={resultItemVariants}
                        onClick={restartQuiz} 
                        className="w-full bg-[var(--accent-solid)] text-[var(--accent-solid-text)] font-semibold px-6 py-3 rounded-xl hover:bg-[var(--accent-solid-hover)] transition-colors"
                    >
                        {t('restart_quiz')}
                    </motion.button>
                    <motion.button 
                        variants={resultItemVariants}
                        onClick={() => onReturnHome({type: 'home'})} 
                        className="w-full bg-[var(--ui-bg)] text-[var(--text-secondary)] font-semibold px-6 py-3 rounded-xl hover:bg-[var(--ui-bg-hover)] transition-colors"
                    >
                        {t('return_home')}
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col p-4 lg:p-8">
      <div className="mb-3 flex-shrink-0">
         <div className="w-full bg-[var(--ui-bg)] rounded-full h-1.5 mb-3">
            <motion.div
                className="bg-[var(--accent-solid)] h-1.5 rounded-full"
                initial={{ width: `0%` }}
                animate={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
         </div>
         <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <div>
                <h1 className="text-xl md:text-3xl font-bold text-[var(--text-primary)]">{title}</h1>
                <p className="text-[var(--text-secondary)] text-sm mt-1">{`${t('question')} ${currentIndex + 1} ${t('of')} ${problems.length}`}</p>
            </div>
             <div className="flex flex-row flex-wrap justify-start md:justify-end gap-x-4 gap-y-2">
                <label htmlFor="auto-show-explanation" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] select-none cursor-pointer p-1 -m-1 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors">
                    <ToggleSwitch id="auto-show-explanation" checked={autoShowExplanation} onChange={setAutoShowExplanation} />
                    <span>{t('show_explanation_on_answer')}</span>
                </label>
                <label htmlFor="auto-advance" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] select-none cursor-pointer p-1 -m-1 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors">
                    <ToggleSwitch id="auto-advance" checked={autoAdvance} onChange={setAutoAdvance} />
                    <span>{t('auto_advance_on_answer')}</span>
                </label>
            </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-h-0 relative overflow-hidden">
        {/* Visual affordances for swiping on touch devices */}
        <div className="md:hidden absolute inset-y-0 left-0 flex items-center justify-center w-8 pointer-events-none z-[var(--z-content-overlay)]">
          <ChevronLeftIcon className="w-6 h-6 text-[var(--text-subtle)] opacity-30" />
        </div>
        <div className="md:hidden absolute inset-y-0 right-0 flex items-center justify-center w-8 pointer-events-none z-[var(--z-content-overlay)]">
          <ChevronRightIcon className="w-6 h-6 text-[var(--text-subtle)] opacity-30" />
        </div>
        
        <AnimatePresence custom={direction} mode="wait">
            <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="w-full h-full"
                drag={!isSidebarOpen ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipeDistanceThreshold = 100;
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

      <div className="flex justify-between items-center mt-6 flex-shrink-0 gap-2 md:gap-4">
        <motion.button
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0 || isFinished}
          className="flex items-center gap-2 px-4 py-3 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-xl border border-[var(--ui-border)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--ui-bg-hover)] transition-colors"
          whileTap={{ scale: 0.95 }}
        >
            <ChevronLeftIcon className="w-5 h-5"/>
            <span className="hidden sm:inline">{t('previous_question')}</span>
        </motion.button>

        <motion.button
          onClick={() => paginate(1)}
          disabled={isFinished}
          className="flex items-center gap-2 px-4 py-3 bg-[var(--accent-solid)] text-[var(--accent-solid-text)] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent-solid-hover)] transition-colors"
          whileTap={{ scale: 0.95 }}
          animate={justAnswered ? { scale: [1, 1.05, 1] } : {}}
          transition={justAnswered ? { duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: 'mirror' } : {}}
        >
            <span className="hidden sm:inline">{currentIndex === problems.length - 1 ? t('results') : t('next_question')}</span>
            <span className="sm:hidden">{currentIndex === problems.length - 1 ? t('results') : t('next_question')}</span>
            <ChevronRightIcon className="w-5 h-5"/>
        </motion.button>
      </div>
    </div>
  );
};
