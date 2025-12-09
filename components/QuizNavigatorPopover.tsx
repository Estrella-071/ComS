
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { useQuiz } from '../contexts/QuizContext';
import { ListBulletIcon, CheckBadgeIcon, CheckIcon, XMarkIcon, StarSolidIcon } from './icons';
import type { View } from '../types';

const spring = { type: 'spring' as const, stiffness: 500, damping: 40 };

interface QuizNavigatorPopoverProps {
  onNavigate: (view: View) => void;
}

export const QuizNavigatorPopover: React.FC<QuizNavigatorPopoverProps> = ({ onNavigate }) => {
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
