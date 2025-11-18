
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import type { Problem } from '../types';
import { QuestionCard } from './QuestionCard';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronLeftIcon, ChevronRightIcon, ListBulletIcon, XMarkIcon, CheckIcon, StarSolidIcon, CheckBadgeIcon } from './icons';
import type { View } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { useQuiz } from '../contexts/QuizContext';
import { ToggleSwitch } from './common/ToggleSwitch';

const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };

const QuizNavigatorPopover: React.FC<{
  onNavigate: (view: View) => void;
}> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const { flaggedItems } = useAppContext();
    const { quizState, currentIndex, answers, isFinished, goToProblem } = useQuiz();
    const [filter, setFilter] = useState<'all' | 'incorrect' | 'unanswered'>('all');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const currentQuestionRef = React.useRef<HTMLButtonElement>(null);

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsNavOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if(isNavOpen && currentQuestionRef.current) {
            currentQuestionRef.current.scrollIntoView({ block: 'nearest' });
        }
    }, [isNavOpen, currentIndex]);

    const { score, problems } = useMemo(() => {
        if (!quizState) return { score: 0, problems: [] };
        const newScore = Array.from(answers).reduce((count: number, [id, answer]) => {
            const problem = quizState.problems.find(p => p.id === id);
            return problem && problem.answer === answer ? count + 1 : count;
        }, 0);
        return { score: newScore, problems: quizState.problems };
    }, [quizState, answers]);
    
    const incorrectProblems = useMemo(() => {
        return problems.filter(p => {
            const userAnswer = answers.get(p.id);
            return userAnswer && userAnswer !== p.answer;
        });
    }, [problems, answers, isFinished]);
    
    const filteredProblems = useMemo(() => {
        const allProbs = problems.map((p, i) => ({...p, originalIndex: i}));
        if (!isFinished || filter === 'all') return allProbs;
        
        return allProbs.filter(p => {
            const userAnswer = answers.get(p.id);
            if (filter === 'incorrect') return userAnswer && userAnswer !== p.answer;
            if (filter === 'unanswered') return !userAnswer;
            return false;
        });
    }, [problems, answers, isFinished, filter]);
    
    const handleReviewIncorrect = () => {
        if (incorrectProblems.length > 0) {
            onNavigate({
                type: 'quiz',
                id: `review-incorrect-${Date.now()}`,
                problems: incorrectProblems,
                title: t('review_incorrect_questions'),
                startIndex: 0,
            });
        }
    };
    
    if (!quizState) return null;

    return (
        <div ref={navRef} className="relative">
             <div className="flex items-center gap-2">
                <p className="text-[var(--text-secondary)] text-sm mt-1">{`${t('question')} ${currentIndex + 1} ${t('of')} ${problems.length}`}</p>
                <button onClick={() => setIsNavOpen(v => !v)} className="p-1 -m-1 text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors"><ListBulletIcon className="w-5 h-5"/></button>
            </div>

             <AnimatePresence>
                {isNavOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={spring}
                        className="absolute top-full mt-2 right-0 w-80 max-w-[90vw] glass-pane rounded-xl shadow-lg z-10 p-3"
                    >
                        {isFinished && (
                            <div className="space-y-3 p-1 mb-2">
                                <h3 className="flex items-center gap-2 text-md font-bold text-[var(--text-primary)]">
                                    <CheckBadgeIcon className="w-5 h-5 text-[var(--text-secondary)]"/> {t('your_score')}: {score} / {problems.length}
                                </h3>
                                <div className="flex items-center bg-[var(--ui-bg)] rounded-lg p-1 text-xs">
                                    <button onClick={() => setFilter('all')} className={`flex-1 p-1.5 rounded-md font-semibold ${filter === 'all' ? 'bg-[var(--accent-solid)] text-[var(--accent-solid-text)]' : 'hover:bg-[var(--ui-bg-hover)]'}`}>{t('quiz_nav_all')}</button>
                                    <button onClick={() => setFilter('incorrect')} className={`flex-1 p-1.5 rounded-md font-semibold ${filter === 'incorrect' ? 'bg-[var(--error-solid-bg)] text-[var(--error-solid-text)]' : 'hover:bg-[var(--ui-bg-hover)]'}`}>{t('quiz_nav_incorrect')}</button>
                                    <button onClick={() => setFilter('unanswered')} className={`flex-1 p-1.5 rounded-md font-semibold ${filter === 'unanswered' ? 'text-[var(--text-secondary)]' : 'hover:bg-[var(--ui-bg-hover)]'}`}>{t('quiz_nav_unanswered')}</button>
                                </div>
                                {incorrectProblems.length > 0 && (
                                    <button onClick={handleReviewIncorrect} className="w-full text-sm px-3 py-2 bg-[var(--error-bg)] text-[var(--error-text)] hover:bg-[var(--error-border)] rounded-lg font-semibold transition-colors">
                                        {t('review_incorrect_questions')} ({incorrectProblems.length})
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                            {filteredProblems.map(p => {
                                const index = p.originalIndex;
                                const isCurrent = index === currentIndex;
                                const answerState = answers.get(p.id);
                                const isCorrect = answerState === p.answer;
                                
                                return (
                                    <div key={p.id} className="relative">
                                    <button
                                        ref={isCurrent ? currentQuestionRef : null}
                                        onClick={() => { goToProblem(index); setIsNavOpen(false); }}
                                        className={`h-11 w-full rounded-md text-sm font-bold transition-all flex items-center justify-center gap-1 ${
                                            isCurrent ? 'bg-[var(--accent-solid)] text-[var(--accent-solid-text)] ring-2 ring-offset-2 ring-[var(--accent-solid)] ring-offset-[var(--bg-color)]' : 
                                            answerState ? (isCorrect ? 'bg-[var(--success-bg)] text-[var(--success-text)]' : 'bg-[var(--error-bg)] text-[var(--error-text)]') :
                                            'bg-[var(--bg-translucent)] text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)]'
                                        }`}
                                    >
                                        {index + 1}
                                        {isFinished && answerState && (isCorrect ? <CheckIcon className="w-3 h-3"/> : <XMarkIcon className="w-3 h-3"/>)}
                                    </button>
                                    {flaggedItems.includes(p.id) && (
                                        <div className="absolute -top-1 -right-1 z-10 pointer-events-none">
                                            <StarSolidIcon className="w-4 h-4 text-[var(--warning-text)] drop-shadow" />
                                        </div>
                                    )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


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

  const animatedScore = useSpring(0, { stiffness: 100, damping: 30 });
  const displayScore = useTransform(animatedScore, latest => Math.round(latest));

  const problems = quizState?.problems || [];
  const title = quizState?.title || '';

  const score = useMemo(() => {
    return Array.from(answers).reduce((count: number, [id, answer]) => {
        const problem = problems.find(p => p.id === id);
        return problem && problem.answer === answer ? count + 1 : count;
    }, 0);
  }, [problems, answers]);

  useEffect(() => {
    if (isFinished) {
      animatedScore.set(score);
    }
  }, [isFinished, score, animatedScore]);
  
  const handleFinish = useCallback(() => {
    finishQuiz();
  }, [finishQuiz]);
  
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

  const handleAnswer = useCallback((problemId: string, answer: string) => {
    answerQuestion(problemId, answer);
    setJustAnswered(true);
  }, [answerQuestion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            paginate(1);
        } else if (e.key === 'ArrowLeft') {
            paginate(-1);
        } else if (!isFinished) {
            // Map 1-4 and a-d to options
            const keyMap: Record<string, string> = {
                '1': 'a', '2': 'b', '3': 'c', '4': 'd',
                'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd',
                'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd'
            };
            if (keyMap[e.key]) {
                const currentProblem = problems[currentIndex];
                // Only answer if not already answered
                if (!answers.has(currentProblem.id)) {
                     handleAnswer(currentProblem.id, keyMap[e.key]);
                }
            }
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, isFinished, problems, currentIndex, answers, handleAnswer]);

  
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
                animate={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
                transition={{ type: 'spring' as const, stiffness: 200, damping: 25 }}
            />
         </div>
         <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <div>
                <h1 className="text-xl md:text-3xl font-bold text-[var(--text-primary)]">{title}</h1>
                <QuizNavigatorPopover onNavigate={onReturnHome} />
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
                transition={{ type: "spring" as const, stiffness: 400, damping: 35 }}
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
