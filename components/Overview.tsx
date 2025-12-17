
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { Problem, View } from '../types';
import { SearchIcon, StarSolidIcon, ChevronDownIcon, CheckIcon, StarIcon, ListBulletIcon } from './icons';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { TextWithHighlights } from './TextWithHighlights';
import { BackToTopButton } from './common/BackToTopButton';
import { EdgeProgressBar } from './common/EdgeProgressBar';
import { ProblemOptions } from './ProblemOptions';
import { ProblemExplanation } from './ProblemExplanation';
import { Toast } from './common/Toast';

interface OverviewProps {
    setView: (view: View) => void;
}

export const Overview: React.FC<OverviewProps> = ({ setView }) => {
    const { t } = useTranslation();
    const { flaggedItems, subjectData, toggleFlaggedItem, language } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ container: scrollRef });
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);
    const [activeChapter, setActiveChapter] = useState<string | null>(null);
    
    const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null);
    const [showFlagToast, setShowFlagToast] = useState(false);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setShowBackToTop(latest > 0.1);
        });
    }, [scrollYProgress]);

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
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

    const chapters = useMemo(() => {
        return Object.keys(problemsByChapter).sort((a, b) => parseInt(a) - parseInt(b));
    }, [problemsByChapter]);

    const handleProblemToggle = (problemId: string) => {
        setExpandedProblemId(prev => prev === problemId ? null : problemId);
    };

    const handleFlagToggle = (e: React.MouseEvent, problemId: string) => {
        e.stopPropagation();
        const isCurrentlyFlagged = flaggedItems.includes(problemId);
        if (!isCurrentlyFlagged) {
            setShowFlagToast(true);
            setTimeout(() => setShowFlagToast(false), 2000);
        }
        toggleFlaggedItem(problemId);
    };

    const scrollToChapter = (chapterId: string) => {
        const el = document.getElementById(`chapter-${chapterId}`);
        if (el && scrollRef.current) {
             const top = el.offsetTop - 120; // adjust for header
             scrollRef.current.scrollTo({ top, behavior: 'smooth' });
             setIsChapterMenuOpen(false);
        }
    }
    
    const getChapterInfo = (chapterNum: string) => {
        if (!subjectData?.chapterList) return null;
        // Search by ID first (e.g., 'chapter1') then by matching index logic if needed
        const chapterData = subjectData.chapterList.find(c => c.id === `chapter${chapterNum}` || c.id === chapterNum);
        
        if (chapterData) return { title: chapterData.title[language], isHighlighted: chapterData.highlight };
        
        // Fallback: Check if chapterList is array and index matches
        const idx = parseInt(chapterNum) - 1;
        if (idx >= 0 && idx < subjectData.chapterList.length) {
            const fallbackData = subjectData.chapterList[idx];
             return { title: fallbackData.title[language], isHighlighted: fallbackData.highlight };
        }
        
        return null;
    };

    useEffect(() => {
        if (!scrollRef.current) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ch = entry.target.getAttribute('data-chapter');
                    if (ch) setActiveChapter(ch);
                }
            });
        }, { 
            root: scrollRef.current,
            rootMargin: '-20% 0px -60% 0px', // Trigger when near top
            threshold: 0
        });

        chapters.forEach(ch => {
            const el = document.getElementById(`chapter-${ch}`);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [chapters]);

    if (!subjectData) return null;

    return (
        <div className="h-full flex flex-col relative">
            <EdgeProgressBar containerRef={scrollRef} />
            <AnimatePresence>
                {showFlagToast && <Toast message={t('flagged_toast')} />}
            </AnimatePresence>

            <div className="flex-1 flex overflow-hidden w-full">
                <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 border-r border-[var(--ui-border)] bg-transparent backdrop-blur-sm">
                     <div className="p-6 border-b border-[var(--ui-border)]">
                        <div className="flex items-center gap-2 mb-2 text-[var(--accent-solid)]">
                            <ListBulletIcon className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">{t('question_bank')}</span>
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-[var(--text-primary)]">
                            {t('table_of_contents')}
                        </h1>
                     </div>
                     
                     <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
                         <div className="relative pl-2">
                            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-[var(--ui-border)]" />
                            
                            {chapters.map(chapter => {
                                const isActive = activeChapter === chapter;
                                const info = getChapterInfo(chapter);
                                const title = info?.title;
                                const isHighlighted = info?.isHighlighted;
                                
                                return (
                                 <button
                                    key={chapter}
                                    onClick={() => scrollToChapter(chapter)}
                                    className={`relative w-full text-left pl-10 pr-3 py-3 rounded-lg transition-all group ${
                                        isActive 
                                        ? 'bg-[var(--ui-bg)]/50' 
                                        : 'hover:bg-[var(--ui-bg)]/30'
                                    }`}
                                 >
                                    <div className={`absolute left-[16px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full border transition-all z-10 ${
                                        isActive 
                                        ? (isHighlighted ? 'bg-[var(--warning-solid-bg)] border-[var(--warning-solid-bg)] scale-125' : 'bg-[var(--accent-solid)] border-[var(--accent-solid)] scale-125')
                                        : (isHighlighted ? 'bg-[var(--bg-color)] border-[var(--warning-text)] group-hover:bg-[var(--warning-text)]' : 'bg-[var(--bg-color)] border-[var(--text-subtle)] group-hover:border-[var(--text-secondary)]')
                                    }`} />
                                    
                                     <div className={`text-xs font-mono mb-0.5 transition-colors flex items-center justify-between ${isActive ? 'text-[var(--text-primary)] font-bold' : (isHighlighted ? 'text-[var(--warning-text)] font-semibold' : 'text-[var(--text-subtle)]')}`}>
                                        <span>{t('chapter')} {chapter}</span>
                                        {isHighlighted && <StarSolidIcon className="w-3 h-3 text-[var(--warning-text)]" />}
                                     </div>
                                     {title && <div className={`text-sm truncate leading-tight transition-colors font-serif ${isActive ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>{title}</div>}
                                 </button>
                             )})}
                         </div>
                     </div>
                </aside>

                <main ref={scrollRef} className="flex-1 overflow-y-auto relative custom-scrollbar scroll-smooth bg-transparent">
                    
                    <div className="sticky top-0 z-[var(--z-sticky-l1)] pt-20 lg:pt-6 px-4 sm:px-8 pb-6 bg-[var(--bg-color)]/10 backdrop-blur-lg border-b border-transparent">
                        <div className="max-w-4xl mx-auto flex gap-4 items-center">
                            <div className="relative w-full">
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('search_placeholder')}
                                    className="w-full bg-[var(--bg-color)]/50 border border-[var(--ui-border)] backdrop-blur-md rounded-full py-3 pl-12 pr-4 text-base text-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] outline-none transition-all shadow-sm placeholder:text-[var(--text-subtle)]"
                                />
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-subtle)] pointer-events-none" />
                            </div>

                            <div className="lg:hidden relative">
                                <button 
                                    onClick={() => setIsChapterMenuOpen(!isChapterMenuOpen)}
                                    className="flex items-center gap-2 bg-[var(--bg-color)]/80 backdrop-blur-md text-[var(--text-primary)] px-4 py-3 rounded-full shadow-sm text-sm font-bold border border-[var(--ui-border)] whitespace-nowrap"
                                >
                                    <span>{activeChapter ? `CH ${activeChapter}` : t('by_chapter')}</span>
                                    <ChevronDownIcon className="w-4 h-4" />
                                </button>
                                <AnimatePresence>
                                    {isChapterMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full right-0 mt-2 w-64 glass-pane rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto border border-[var(--ui-border)] z-[var(--z-sticky-l2)]"
                                        >
                                            {chapters.map(chapter => {
                                                const info = getChapterInfo(chapter);
                                                const isHighlighted = info?.isHighlighted;
                                                return (
                                                <button
                                                    key={chapter}
                                                    onClick={() => scrollToChapter(chapter)}
                                                    className={`w-full text-left px-5 py-3 text-sm border-b border-[var(--ui-border)] last:border-0 hover:bg-[var(--ui-bg)] flex items-center justify-between ${
                                                        activeChapter === chapter 
                                                        ? (isHighlighted ? 'font-bold text-[var(--warning-text)] bg-[var(--warning-bg)]/20' : 'font-bold text-[var(--accent-text)] bg-[var(--accent-bg)]')
                                                        : (isHighlighted ? 'text-[var(--warning-text)] font-semibold' : 'text-[var(--text-secondary)]')
                                                    }`}
                                                >
                                                    <span>{t('chapter')} {chapter}</span>
                                                    {isHighlighted && <StarSolidIcon className="w-3 h-3 text-[var(--warning-text)]" />}
                                                </button>
                                            )})}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 sm:px-8 max-w-4xl mx-auto pb-32">
                        {chapters.length > 0 ? (
                            <div className="space-y-16">
                                {chapters.map(chapter => {
                                    const info = getChapterInfo(chapter);
                                    const title = info?.title;
                                    const isHighlighted = info?.isHighlighted;
                                    
                                    return (
                                    <section key={chapter} id={`chapter-${chapter}`} data-chapter={chapter} className="scroll-mt-40">
                                        <div className="flex flex-col items-start gap-1 mb-8 border-b border-[var(--ui-border)]/50 pb-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-bold uppercase tracking-widest font-mono ${isHighlighted ? 'text-[var(--warning-text)]' : 'text-[var(--text-subtle)]'}`}>
                                                    {t('chapter')} {chapter}
                                                </span>
                                                {isHighlighted && (
                                                    <span className="px-2 py-0.5 rounded-full bg-[var(--warning-solid-bg)] text-[var(--warning-solid-text)] text-[8px] font-bold uppercase tracking-wider shadow-sm">
                                                        {t('finals_tag')}
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-3xl font-bold font-serif text-[var(--text-primary)]">
                                                {title || `${t('chapter')} ${chapter}`}
                                            </h2>
                                        </div>
                                        
                                        <div className="grid grid-cols-1">
                                            {problemsByChapter[chapter].map(p => {
                                                const isFlagged = flaggedItems.includes(p.id);
                                                const isExpanded = expandedProblemId === p.id;
                                                
                                                return (
                                                    <div 
                                                        key={p.id}
                                                        className={`group relative py-8 border-b border-[var(--ui-border)]/30 transition-all duration-500`}
                                                    >
                                                        <div 
                                                            onClick={() => handleProblemToggle(p.id)}
                                                            className="cursor-pointer flex gap-5 items-start"
                                                        >
                                                            <div className="flex-shrink-0 mt-1.5">
                                                                <span className={`font-mono text-xs font-bold px-2 py-1 rounded border transition-colors ${isExpanded ? 'bg-[var(--text-primary)] text-[var(--bg-color)] border-[var(--text-primary)]' : 'bg-transparent text-[var(--text-subtle)] border-[var(--ui-border)]'}`}>
                                                                    {p.number}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex-grow">
                                                                <p className={`text-xl md:text-2xl font-serif leading-relaxed transition-colors duration-300 ${isExpanded ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                                                                    <TextWithHighlights text={p.text_en} highlight={searchQuery} />
                                                                </p>
                                                            </div>
                                                            
                                                            <div className="flex-shrink-0 flex items-center gap-3 pt-1">
                                                                <button
                                                                    onClick={(e) => handleFlagToggle(e, p.id)}
                                                                    className={`p-2 rounded-full transition-all hover:bg-[var(--ui-bg)] ${isFlagged ? 'text-[var(--warning-text)]' : 'text-[var(--text-subtle)] hover:text-[var(--warning-text)]'}`}
                                                                >
                                                                    {isFlagged ? <StarSolidIcon className="w-5 h-5" /> : <StarIcon className="w-5 h-5" />}
                                                                </button>
                                                                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                                                                    <ChevronDownIcon className="w-5 h-5 text-[var(--text-subtle)]" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="pt-8 pl-0 sm:pl-14">
                                                                        <div className="border-l-2 border-[var(--ui-border)] pl-6 space-y-8">
                                                                            <div className="space-y-4">
                                                                                <h3 className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-widest">{t('options')}</h3>
                                                                                <ProblemOptions 
                                                                                    problem={p} 
                                                                                    isRevealed={true}
                                                                                    onAnswerSelected={() => {}}
                                                                                    disabled={true}
                                                                                />
                                                                            </div>
                                                                            
                                                                            <div className="space-y-4">
                                                                                <h3 className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-widest">{t('explanation')}</h3>
                                                                                <div className="prose prose-sm dark:prose-invert max-w-none text-[var(--text-secondary)]">
                                                                                     {/* Render directly to avoid double wrapping if ProblemExplanation adds margin/border */}
                                                                                     <ProblemExplanation 
                                                                                        explanation={p.explanation_zh} 
                                                                                        isVisible={true} 
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                )})}
                            </div>
                        ) : (
                            <div className="text-center py-32 text-[var(--text-secondary)] rounded-2xl border-dashed border-2 border-[var(--ui-border)]">
                                <p className="text-lg">{t('search_no_results')}</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
        </div>
    );
};
