import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import type { Problem, QuizResult, AnsweredQuestion } from '../types';
import { QuestionCard } from './QuestionCard';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from './icons';
import type { View } from '../App';
import { useAppContext } from '../contexts/AppContext';

interface QuizViewProps {
  problems: Problem[];
  title: string;
  setView: (view: View) => void;
  startIndex?: number;
  isSidebarOpen: boolean;
}

export const QuizView: React.FC<QuizViewProps> = ({ problems, title, setView, startIndex = 0, isSidebarOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<string, string>>(new Map());
  const [isFinished, setIsFinished] = useState(false);
  const [justAnswered, setJustAnswered] = useState(false);
  const { t } = useTranslation();
  const { autoShowExplanation, setAutoShowExplanation, autoAdvance, setAutoAdvance } = useAppContext();
  
  const score = useMemo(() => {
    return Array.from(userAnswers).reduce((count: number, [id, answer]) => {
        const problem = problems.find(p => p.id === id);
        return problem && problem.answer === answer ? count + 1 : count;
    }, 0);
  }, [problems, userAnswers]);
  
  const handleFinish = useCallback(() => {
    if (isFinished || problems.length === 0) return;
    
    const answeredQuestions = problems.map((p): AnsweredQuestion => ({
      problemId: p.id,
      userAnswer: userAnswers.get(p.id) || '',
      isCorrect: userAnswers.get(p.id) === p.answer,
    }));

    const result: QuizResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      quizTitle: title,
      score: score,
      totalQuestions: problems.length,
      answeredQuestions,
    };

    try {
      const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      history.unshift(result);
      localStorage.setItem('quizHistory', JSON.stringify(history.slice(0, 20)));
    } catch (error) {
      console.error("Failed to save quiz history", error);
    }
    setIsFinished(true);
  }, [isFinished, problems, title, score, userAnswers]);


  const paginate = useCallback((newDirection: number) => {
    if (isFinished) return;
    setJustAnswered(false);
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < problems.length) {
        setDirection(newDirection);
        setCurrentIndex(newIndex);
    } else if (newIndex >= problems.length) {
        handleFinish();
    }
  }, [currentIndex, problems.length, isFinished, handleFinish]);
  
  const goToProblem = useCallback((index: number) => {
    if (isFinished || index < 0 || index >= problems.length) return;
    setJustAnswered(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex, problems.length, isFinished]);

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
    const newAnswers = new Map(userAnswers);
    newAnswers.set(problemId, answer);
    setUserAnswers(newAnswers);
    setJustAnswered(true);
  };
  
  useEffect(() => {
    if (justAnswered && autoAdvance) {
      const timer = setTimeout(() => {
        paginate(1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [justAnswered, autoAdvance, paginate]);

  const restartQuiz = () => {
    setCurrentIndex(0);
    setUserAnswers(new Map());
    setIsFinished(false);
    setJustAnswered(false);
  };

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
                className="bg-[var(--bg-translucent)] backdrop-blur-xl p-8 rounded-3xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{title}</h2>
                <p className="text-[var(--text-secondary)] mb-6">There are no problems in this quiz.</p>
                <button 
                    onClick={() => setView({type: 'home'})} 
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
                className="bg-[var(--bg-translucent)] backdrop-blur-xl p-8 rounded-3xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] w-full max-w-md"
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
                        className="w-full bg-[var(--accent-solid)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[var(--accent-solid-hover)] transition-colors"
                    >
                        {t('restart_quiz')}
                    </motion.button>
                    <motion.button 
                        variants={resultItemVariants}
                        onClick={() => setView({type: 'home'})} 
                        className="w-full bg-[var(--ui-bg)] text-[var(--text-secondary)] font-semibold px-6 py-3 rounded-xl hover:bg-[var(--ui-bg-hover)] transition-colors"
                    >
                        {t('return_home')}
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
  }

  const paginationItems = useMemo(() => {
    const total = problems.length;
    if (total <= 10) {
      return Array.from({ length: total }, (_, i) => i);
    }
  
    const pages = new Set<number>();
    pages.add(0);
    pages.add(total - 1);
  
    for (let i = -2; i <= 2; i++) {
      const page = currentIndex + i;
      if (page >= 0 && page < total) {
        pages.add(page);
      }
    }
  
    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    const result: (number | '...')[] = [];
  
    let lastPage: number | null = null;
    for (const page of sortedPages) {
      if (lastPage !== null && page > lastPage + 1) {
        result.push('...');
      }
      result.push(page);
      lastPage = page;
    }
    return result;
  }, [currentIndex, problems.length]);


  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-3 flex-shrink-0">
         <div className="w-full bg-[var(--ui-bg)] rounded-full h-1.5 mb-3">
            <motion.div
                className="bg-[var(--accent-solid)] h-1.5 rounded-full"
                initial={{ width: `${((startIndex + 1) / problems.length) * 100}%` }}
                animate={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
         </div>
         <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <div>
                <h1 className="text-xl md:text-3xl font-bold text-[var(--text-primary)]">{title}</h1>
                <p className="text-[var(--text-secondary)] text-sm mt-1">{`${t('question')} ${currentIndex + 1} ${t('of')} ${problems.length}`}</p>
            </div>
            <div className="flex flex-row flex-wrap justify-start md:justify-end gap-x-4 gap-y-1">
              <label htmlFor="auto-show-explanation" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] select-none cursor-pointer p-1 -m-1 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors">
                  <input
                      type="checkbox"
                      id="auto-show-explanation"
                      checked={autoShowExplanation}
                      onChange={(e) => setAutoShowExplanation(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[var(--accent-solid)] focus:ring-[var(--accent-solid)] bg-transparent"
                  />
                  {t('show_explanation_on_answer')}
              </label>
              <label htmlFor="auto-advance" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] select-none cursor-pointer p-1 -m-1 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors">
                  <input
                      type="checkbox"
                      id="auto-advance"
                      checked={autoAdvance}
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[var(--accent-solid)] focus:ring-[var(--accent-solid)] bg-transparent"
                  />
                  {t('auto_advance_on_answer')}
              </label>
            </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-h-0 relative overflow-hidden">
        {/* Visual affordances for swiping on touch devices */}
        <div className="md:hidden absolute inset-y-0 left-0 flex items-center justify-center w-8 pointer-events-none z-10">
          <ChevronLeftIcon className="w-6 h-6 text-[var(--text-subtle)] opacity-30" />
        </div>
        <div className="md:hidden absolute inset-y-0 right-0 flex items-center justify-center w-8 pointer-events-none z-10">
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
                dragElastic={0.2}
                dragMomentum={false}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipeDistanceThreshold = 150;
                    const swipeVerticalThreshold = 75;

                    // Abort if swipe is more vertical than horizontal
                    if (Math.abs(offset.y) > Math.abs(offset.x)) {
                        return;
                    }

                    // Abort if vertical travel is beyond the tolerance
                    if (Math.abs(offset.y) > swipeVerticalThreshold) {
                        return;
                    }

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
                    userAnswer={userAnswers.get(problems[currentIndex].id)}
                    shouldAutoShowExplanation={userAnswers.has(problems[currentIndex].id) && autoShowExplanation}
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
        
        <div className="hidden md:flex items-center gap-1.5 text-[var(--text-secondary)]">
            <button onClick={() => goToProblem(0)} title={t('go_to_first')} className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-[var(--ui-bg-hover)] disabled:opacity-50" disabled={currentIndex === 0 || isFinished}><ChevronDoubleLeftIcon className="w-5 h-5"/></button>
            {paginationItems.map((page, index) => {
                if (page === '...') {
                    return <span key={`ellipsis-${index}`} className="w-9 text-center">...</span>
                }
                 const p = problems[page];
                 const isCurrent = page === currentIndex;
                 const answerState = userAnswers.get(p.id);
                 const isCorrect = answerState === p.answer;
                 
                 let statusClass = 'bg-[var(--ui-bg)] text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)]';
                  if (answerState) {
                     statusClass = isCorrect ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white';
                 }
                 if(isCurrent) {
                     statusClass = 'bg-[var(--accent-solid)] text-white ring-2 ring-offset-2 ring-[var(--accent-solid)] ring-offset-[var(--bg-color)]';
                 }
                 
                return (
                    <motion.button
                        key={page}
                        onClick={() => goToProblem(page)}
                        disabled={isFinished}
                        className={`flex-shrink-0 h-9 w-9 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-bold ${statusClass} disabled:opacity-50`}
                        aria-label={`Go to question ${page + 1}`}
                        animate={{ scale: isCurrent ? 1.15 : 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                        {page + 1}
                    </motion.button>
                );
            })}
             <button onClick={() => goToProblem(problems.length - 1)} title={t('go_to_last')} className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-[var(--ui-bg-hover)] disabled:opacity-50" disabled={currentIndex === problems.length - 1 || isFinished}><ChevronDoubleRightIcon className="w-5 h-5"/></button>
        </div>


        <motion.button
          onClick={() => paginate(1)}
          disabled={isFinished}
          className="flex items-center gap-2 px-4 py-3 bg-[var(--accent-solid)] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent-solid-hover)] transition-colors"
          whileTap={{ scale: 0.95 }}
          animate={justAnswered ? { scale: [1, 1.05, 1] } : {}}
          transition={justAnswered ? { duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: 'mirror' } : {}}
        >
            <span className="hidden sm:inline">{currentIndex === problems.length - 1 ? t('results') : t('next_question')}</span>
            <ChevronRightIcon className="w-5 h-5"/>
        </motion.button>
      </div>
    </div>
  );
};