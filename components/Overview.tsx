
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { Problem, View } from '../types';
import { CheckCircleIcon, SearchIcon, StarSolidIcon, ChevronRightIcon, ChevronUpIcon, CodeBracketIcon } from './icons';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { TextWithHighlights } from './TextWithHighlights';

interface OverviewProps {
    setView: (view: View) => void;
}

export const Overview: React.FC<OverviewProps> = ({ setView }) => {
    const { t } = useTranslation();
    const { flaggedProblems, subjectData } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const contentRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ container: contentRef });
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setShowBackToTop(latest > 0.1);
        });
    }, [scrollYProgress]);

    const scrollToTop = () => {
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const problems = useMemo(() => subjectData?.problems || [], [subjectData]);

    const filteredProblems = useMemo(() => {
        if (!searchQuery) return problems;
        const lowercasedQuery = searchQuery.toLowerCase();
        return problems.filter(p => 
            p.text_en.toLowerCase().includes(lowercasedQuery) ||
            p.text_zh.toLowerCase().includes(lowercasedQuery) ||
            p.number.toLowerCase().includes(lowercasedQuery)
        );
    }, [searchQuery, problems]);

    const problemsByChapter = useMemo(() => {
        return filteredProblems.reduce<Record<string, Problem[]>>((acc, problem) => {
            if (!acc[problem.chapter]) acc[problem.chapter] = [];
            acc[problem.chapter].push(problem);
            return acc;
        }, {});
    }, [filteredProblems]);

    const handleProblemClick = (problemId: string) => {
        setView({ type: 'problem', id: problemId });
    };

    if (!subjectData) return null;

    return (
        <div ref={contentRef} className="h-full overflow-y-auto relative">
            <div className="sticky top-0 z-[var(--z-sticky-l2)] bg-[var(--bg-color)]/80 backdrop-blur-md pt-4 pb-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search_placeholder')}
                            className="w-full glass-pane rounded-full py-3 pl-12 pr-4 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all"
                        />
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-subtle)] pointer-events-none" />
                    </div>
                    <button 
                        onClick={() => setView({ type: 'question_bank_quiz' })}
                        className="bg-[var(--accent-solid)] text-[var(--accent-solid-text)] font-semibold px-4 py-3 rounded-full hover:bg-[var(--accent-solid-hover)] transition-colors flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-center"
                    >
                        <CodeBracketIcon className="w-5 h-5" />
                        <span className="sm:inline">{t('question_bank_quiz')}</span>
                    </button>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pb-24 pt-8">
                    {Object.keys(problemsByChapter).length > 0 ? Object.entries(problemsByChapter).sort(([a], [b]) => parseInt(a) - parseInt(b)).map(([chapter, chapterProblems]: [string, Problem[]]) => (
                        <div key={chapter} className="mb-12">
                            <h2 
                                className="text-2xl font-bold text-[var(--text-secondary)] border-b-2 border-[var(--ui-border)] py-3 mb-6"
                            >
                                {`${t('chapter')} ${chapter}${t('chapter_unit')}`}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {chapterProblems.map(p => {
                                    const correctOption = p.options.find(opt => opt.key === p.answer);
                                    const isFlagged = flaggedProblems.includes(p.id);
                                    return (
                                        <motion.button 
                                            key={p.id}
                                            onClick={() => handleProblemClick(p.id)}
                                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.98, y: 0 }}
                                            className={`relative glass-pane rounded-2xl p-5 text-left h-full flex flex-col ${isFlagged ? 'flagged-glow' : ''}`}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-semibold text-[var(--accent-text)]">{t('problem_header')} {p.number}</span>
                                                {isFlagged && <StarSolidIcon className="w-4 h-4 text-[var(--warning-text)]" />}
                                            </div>
                                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
                                            <TextWithHighlights text={p.text_en} highlight={searchQuery} />
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-[var(--success-text)] font-medium mt-auto pt-3 border-t border-[var(--ui-border)]">
                                                <CheckCircleIcon className="w-4 h-4 flex-shrink-0"/>
                                                <span className="truncate">{`(${p.answer.toUpperCase()}) ${correctOption?.text_en}`}</span>
                                            </div>
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 text-[var(--text-secondary)] glass-pane rounded-2xl">
                            <p>{t('search_no_results')}</p>
                        </div>
                    )}
                </div>
            </div>
            
            <AnimatePresence>
                {showBackToTop && (
                     <motion.button
                        onClick={scrollToTop}
                        className={`fixed bottom-6 right-6 w-14 h-14 bg-[var(--ui-bg)] rounded-full text-[var(--text-primary)] flex items-center justify-center shadow-lg z-[var(--z-fab)]`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Back to top"
                    >
                        <ChevronUpIcon className="w-7 h-7" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
