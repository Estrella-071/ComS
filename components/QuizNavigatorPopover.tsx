
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { useQuiz } from '../contexts/QuizContext';
import { 
    ListBulletIcon, 
    CheckBadgeIcon, 
    CheckIcon, 
    XMarkIcon, 
    StarSolidIcon, 
    Squares2X2Icon,
    ExclamationCircleIcon
} from './icons';
import type { View } from '../types';

const spring = { type: 'spring' as const, stiffness: 500, damping: 40 };

interface QuizNavigatorPopoverProps {
  onNavigate: (view: View) => void;
}

type FilterType = 'all' | 'todo' | 'flagged' | 'incorrect';

export const QuizNavigatorPopover: React.FC<QuizNavigatorPopoverProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const { flaggedItems } = useAppContext();
    const { quizState, currentIndex, answers, isFinished, goToProblem } = useQuiz();
    
    // Default filter depends on state: if finished, show all, otherwise show all
    const [filter, setFilter] = useState<FilterType>('all');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const activeItemRef = useRef<HTMLButtonElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Auto-scroll to current question when opening
    useEffect(() => {
        if(isOpen && activeItemRef.current) {
            activeItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [isOpen]);

    const { problems, score } = useMemo(() => {
        if (!quizState) return { problems: [], score: 0 };
        
        let currentScore = 0;
        if (isFinished) {
            currentScore = Array.from(answers).reduce((count, [id, answer]) => {
                const problem = quizState.problems.find(p => p.id === id);
                return problem && problem.answer === answer ? count + 1 : count;
            }, 0);
        }
        return { problems: quizState.problems, score: currentScore };
    }, [quizState, answers, isFinished]);

    // Calculate stats for badges
    const stats = useMemo(() => {
        const total = problems.length;
        const answeredCount = answers.size;
        const flaggedCount = problems.filter(p => flaggedItems.includes(p.id)).length;
        const remaining = total - answeredCount;
        
        // Calculate incorrect count only if finished to avoid spoilers
        const incorrectCount = isFinished 
            ? problems.filter(p => {
                const ans = answers.get(p.id);
                return ans && ans !== p.answer;
            }).length
            : 0;

        return { total, remaining, flaggedCount, incorrectCount };
    }, [problems, answers, flaggedItems, isFinished]);

    const filteredProblems = useMemo(() => {
        // Map to preserve original index
        const all = problems.map((p, i) => ({...p, originalIndex: i}));
        
        return all.filter(p => {
            const isFlagged = flaggedItems.includes(p.id);
            const isAnswered = answers.has(p.id);
            const answer = answers.get(p.id);
            const isIncorrect = isFinished && isAnswered && answer !== p.answer;

            switch (filter) {
                case 'flagged': return isFlagged;
                case 'todo': return !isAnswered;
                case 'incorrect': return isIncorrect;
                default: return true;
            }
        });
    }, [problems, answers, flaggedItems, filter, isFinished]);

    const handleJump = (index: number) => {
        goToProblem(index);
        setIsOpen(false);
    };

    if (!quizState) return null;

    return (
        <div ref={containerRef} className="relative z-50">
             {/* Trigger Button */}
             <motion.button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`group flex items-center gap-3 px-3 py-1.5 rounded-lg border transition-all ${
                    isOpen 
                    ? 'bg-[var(--ui-bg)] border-[var(--text-secondary)]' 
                    : 'bg-transparent border-transparent hover:bg-[var(--ui-bg)]'
                }`}
                whileTap={{ scale: 0.95 }}
            >
                <div className="flex flex-col items-end mr-1">
                    <span className="text-[10px] font-bold text-[var(--text-subtle)] uppercase tracking-wider leading-none mb-1">
                        {t('question')}
                    </span>
                    <span className="text-sm font-mono font-bold text-[var(--text-primary)] leading-none">
                        {currentIndex + 1} <span className="text-[var(--text-subtle)] font-normal">/ {problems.length}</span>
                    </span>
                </div>
                <div className={`p-2 rounded-md transition-colors ${isOpen ? 'bg-[var(--text-primary)] text-[var(--bg-color)]' : 'bg-[var(--ui-bg)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                    <Squares2X2Icon className="w-5 h-5"/>
                </div>
            </motion.button>

             <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                        className="absolute top-full mt-4 right-0 w-[340px] max-w-[95vw] glass-pane rounded-2xl shadow-2xl border border-[var(--ui-border)] overflow-hidden flex flex-col"
                        style={{ maxHeight: 'min(500px, 80vh)' }}
                    >
                        {/* Header Area */}
                        <div className="flex-shrink-0 bg-[var(--ui-bg)]/50 backdrop-blur-md border-b border-[var(--ui-border)] p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                                    {t('table_of_contents')}
                                </h3>
                                {isFinished && (
                                    <div className="flex items-center gap-1.5 bg-[var(--accent-bg)] px-2 py-1 rounded-md text-[var(--accent-text)]">
                                        <CheckBadgeIcon className="w-4 h-4"/>
                                        <span className="text-xs font-bold font-mono">{score} / {problems.length}</span>
                                    </div>
                                )}
                            </div>

                            {/* Custom Tab Bar */}
                            <div className="flex p-1 bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)]">
                                <FilterTab 
                                    active={filter === 'all'} 
                                    onClick={() => setFilter('all')} 
                                    label="All" 
                                    count={stats.total} 
                                />
                                <FilterTab 
                                    active={filter === 'todo'} 
                                    onClick={() => setFilter('todo')} 
                                    label="To Do" 
                                    count={stats.remaining}
                                    disabled={isFinished} 
                                />
                                <FilterTab 
                                    active={filter === 'flagged'} 
                                    onClick={() => setFilter('flagged')} 
                                    label="Flagged" 
                                    count={stats.flaggedCount} 
                                />
                                {isFinished && (
                                    <FilterTab 
                                        active={filter === 'incorrect'} 
                                        onClick={() => setFilter('incorrect')} 
                                        label="Wrong" 
                                        count={stats.incorrectCount} 
                                        isError
                                    />
                                )}
                            </div>
                        </div>

                        {/* Grid Area */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[var(--bg-color)]/30">
                            {filteredProblems.length === 0 ? (
                                <div className="h-32 flex flex-col items-center justify-center text-[var(--text-subtle)]">
                                    <ExclamationCircleIcon className="w-8 h-8 mb-2 opacity-50" />
                                    <span className="text-xs font-medium">No questions found</span>
                                </div>
                            ) : (
                                <motion.div 
                                    layout
                                    className="grid grid-cols-5 gap-2.5"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredProblems.map((p) => {
                                            const index = p.originalIndex;
                                            const isCurrent = index === currentIndex;
                                            const isFlagged = flaggedItems.includes(p.id);
                                            const hasAnswer = answers.has(p.id);
                                            const answer = answers.get(p.id);
                                            const isCorrect = isFinished && hasAnswer && answer === p.answer;
                                            const isWrong = isFinished && hasAnswer && answer !== p.answer;

                                            // Determine visual state
                                            let bgClass = 'bg-[var(--ui-bg)] border-[var(--ui-border)]';
                                            let textClass = 'text-[var(--text-secondary)]';
                                            
                                            if (isCurrent) {
                                                bgClass = 'bg-[var(--accent-solid)] border-[var(--accent-solid)] shadow-lg shadow-[var(--accent-solid)]/20';
                                                textClass = 'text-[var(--accent-solid-text)]';
                                            } else if (isWrong) {
                                                bgClass = 'bg-[var(--error-bg)] border-[var(--error-border)]';
                                                textClass = 'text-[var(--error-text)]';
                                            } else if (isCorrect) {
                                                bgClass = 'bg-[var(--success-bg)] border-[var(--success-border)]';
                                                textClass = 'text-[var(--success-text)]';
                                            } else if (hasAnswer) {
                                                bgClass = 'bg-[var(--text-secondary)]/10 border-[var(--text-secondary)]/20';
                                                textClass = 'text-[var(--text-primary)]';
                                            }

                                            return (
                                                <motion.button
                                                    layout
                                                    key={p.id}
                                                    ref={isCurrent ? activeItemRef : null}
                                                    onClick={() => handleJump(index)}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.8, opacity: 0 }}
                                                    whileHover={{ scale: 1.05, zIndex: 10 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`
                                                        relative h-12 rounded-xl border text-sm font-bold font-mono transition-colors flex items-center justify-center
                                                        ${bgClass} ${textClass}
                                                    `}
                                                >
                                                    {index + 1}

                                                    {/* Flag Badge */}
                                                    {isFlagged && (
                                                        <div className="absolute -top-1 -right-1">
                                                            <div className="relative flex items-center justify-center">
                                                                <div className="absolute w-2 h-2 bg-[var(--bg-color)] rounded-full"></div>
                                                                <StarSolidIcon className="w-3.5 h-3.5 text-[var(--warning-text)] relative z-10" />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Selection Indicator (Active) */}
                                                    {isCurrent && (
                                                        <motion.div
                                                            layoutId="active-ring"
                                                            className="absolute -inset-1 rounded-2xl border-2 border-[var(--accent-solid)] opacity-30"
                                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                        />
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FilterTab: React.FC<{ 
    active: boolean; 
    onClick: () => void; 
    label: string; 
    count: number;
    disabled?: boolean;
    isError?: boolean;
}> = ({ active, onClick, label, count, disabled, isError }) => (
    <button
        onClick={onClick}
        disabled={disabled || count === 0}
        className={`
            flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-all text-[10px] uppercase tracking-wide font-bold gap-0.5
            ${disabled || count === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-[var(--ui-bg-hover)]'}
            ${active 
                ? (isError ? 'bg-[var(--error-bg)] text-[var(--error-text)]' : 'bg-[var(--bg-color)] text-[var(--text-primary)] shadow-sm') 
                : 'text-[var(--text-subtle)]'
            }
        `}
    >
        <span>{label}</span>
        <span className="font-mono opacity-80">{count}</span>
    </button>
);
