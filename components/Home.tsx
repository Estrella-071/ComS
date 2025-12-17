
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { View, QuizResult } from '../types';
import { LOCAL_STORAGE_KEYS } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { BookOpenIcon, CodeBracketIcon, ListBulletIcon, ClockIcon, FolderIcon, PlayIcon, ChevronRightIcon, StarIcon } from './icons';
import { SegmentedControl } from './common/SegmentedControl';
import { BackToTopButton } from './common/BackToTopButton';
import { EdgeProgressBar } from './common/EdgeProgressBar';
import { safeStorage } from '../utils/storage';

interface HomeProps {
    setView: (view: View) => void;
}

const GreetingHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => {
    const hour = new Date().getHours();
    let greeting = 'Hello';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    return (
        <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-[var(--text-primary)] opacity-30"></div>
                <span className="text-xs font-bold font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">{greeting}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] font-serif leading-none tracking-tight">
                {title}
            </h1>
            <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl font-light leading-relaxed opacity-70 mt-3">
                {subtitle}
            </p>
        </div>
    );
};

const LargeActionCard: React.FC<{
    onAction: () => void;
    label: string;
    subLabel: string;
    icon: React.ReactNode;
    recentQuiz?: QuizResult | null;
    isPrimary?: boolean;
    indexStr?: string;
    className?: string;
}> = ({ onAction, label, subLabel, icon, recentQuiz, isPrimary = false, indexStr = "01", className = "" }) => {
    return (
        <motion.button
            onClick={onAction}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-[2rem] p-6 md:p-8 text-left shadow-2xl transition-all duration-300 group min-h-[200px] md:min-h-[240px] flex flex-col justify-between glass-pane border w-full
                ${isPrimary 
                    ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-color)]' 
                    : 'border-[var(--ui-border)] hover:border-[var(--text-subtle)]'
                } ${className}`}
        >
            <div className={`absolute top-4 right-6 font-mono text-7xl font-bold tracking-tighter select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 ${isPrimary ? 'opacity-10 text-[var(--bg-color)]' : 'opacity-5 text-[var(--text-primary)]'}`}>
                {indexStr}
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start w-full">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:rotate-12 group-hover:scale-110
                         ${isPrimary 
                            ? 'bg-[var(--bg-color)] text-[var(--text-primary)] border-transparent' 
                            : 'bg-[var(--ui-bg)] text-[var(--text-primary)] border-[var(--ui-border)]'
                        }`}>
                        {icon}
                    </div>
                    {recentQuiz && isPrimary && (
                        <span className="px-3 py-1 rounded-full bg-[var(--bg-color)] text-[var(--text-primary)] text-[9px] font-mono font-bold uppercase tracking-wider border border-transparent shadow-lg animate-pulse">
                            Resume
                        </span>
                    )}
                </div>

                <div className="mt-6 space-y-1.5">
                    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold font-serif leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 ${isPrimary ? 'text-[var(--bg-color)]' : 'text-[var(--text-primary)]'}`}>
                        {label}
                    </h2>
                    <p className={`text-xs font-mono uppercase tracking-[0.15em] flex items-center gap-2 ${isPrimary ? 'text-[var(--bg-color)] opacity-70' : 'text-[var(--text-secondary)] opacity-60'}`}>
                        {subLabel} <ChevronRightIcon className="w-3 h-3" />
                    </p>
                </div>
            </div>
            
             <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100 
                ${isPrimary ? 'bg-gradient-to-tr from-white/20 to-transparent' : 'bg-gradient-to-tr from-[var(--text-primary)]/5 to-transparent'}`} 
             />
        </motion.button>
    )
}

const SmallToolCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    count?: number | string;
    onClick: () => void;
    indexStr?: string;
}> = ({ icon, title, count, onClick, indexStr }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col justify-between p-6 rounded-[1.5rem] border border-[var(--ui-border)] bg-[var(--bg-translucent)] backdrop-blur-xl hover:border-[var(--text-subtle)] transition-all h-full w-full gap-5 group shadow-lg hover:shadow-2xl relative overflow-hidden"
    >
        <div className="absolute top-5 right-5 font-mono text-xs text-[var(--text-subtle)] opacity-40 font-bold tracking-widest">{indexStr}</div>
        
        <div className="p-3 w-fit rounded-2xl bg-[var(--ui-bg)] text-[var(--text-primary)] group-hover:scale-110 group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-color)] transition-all duration-300 border border-[var(--ui-border)]">
            {icon}
        </div>
        <div className="text-left">
            <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight font-serif group-hover:translate-x-1 transition-transform">{title}</h3>
            {count !== undefined && (
                <div className="flex items-center gap-3 mt-2">
                    <div className="h-px w-6 bg-[var(--text-subtle)]"></div>
                    <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-widest">{count} ITEMS</p>
                </div>
            )}
        </div>
    </motion.button>
);

const ChapterCard: React.FC<{ 
    chapter: any; 
    index: number;
    onClick: () => void;
    language: 'en' | 'zh';
    problemCount?: number;
    mode?: 'reading' | 'practice';
}> = ({ chapter, index, onClick, language, problemCount, mode = 'reading' }) => {
    const mainTitle = chapter.title[language];
    const subTitle = chapter.subtitle ? chapter.subtitle[language] : chapter.title[language === 'en' ? 'zh' : 'en'];
    // Preface is index 0, should be "00". Chapter 1 is index 1, should be "01".
    const chapterNum = index.toString().padStart(2, '0');
    
    // In reading mode, rely on chapter.disabled
    // In practice mode, rely on problemCount
    const isDisabled = mode === 'reading' ? chapter.disabled : (!problemCount || problemCount === 0);
    const isHighlighted = chapter.highlight;

    return (
        <motion.button
            onClick={isDisabled ? undefined : onClick}
            disabled={isDisabled}
            whileHover={isDisabled ? {} : { scale: 1.01, x: 4 }}
            whileTap={isDisabled ? {} : { scale: 0.99 }}
            className={`w-full flex items-center justify-between p-5 rounded-[1.25rem] border transition-all relative overflow-hidden group text-left shadow-sm
                ${isDisabled 
                    ? 'border-[var(--ui-border)] bg-[var(--ui-bg)] opacity-60 cursor-not-allowed grayscale' 
                    : 'bg-[var(--bg-translucent)] backdrop-blur-md hover:bg-[var(--ui-bg)] hover:shadow-lg'
                }
                ${isHighlighted ? 'border-[var(--warning-text)] border-2 bg-[var(--warning-bg)]/10' : 'border-[var(--ui-border)] hover:border-[var(--text-subtle)]'}
                `}
        >
            <div className="flex items-center gap-5">
                 <div className={`font-mono text-xl font-bold transition-all ${isDisabled ? 'text-[var(--text-subtle)]' : 'text-[var(--text-subtle)] opacity-40 group-hover:text-[var(--accent-solid)] group-hover:opacity-100'} ${isHighlighted ? 'text-[var(--warning-text)] opacity-100' : ''}`}>
                    {chapterNum}
                 </div>
                 <div>
                    <h3 className={`font-bold font-serif text-lg mb-1 transition-transform ${isDisabled ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] group-hover:translate-x-1'}`}>
                        {mainTitle}
                    </h3>
                    <p className={`text-[10px] font-mono uppercase tracking-wide ${isDisabled ? 'text-[var(--text-subtle)] font-bold' : 'text-[var(--text-secondary)] opacity-60 group-hover:opacity-80'}`}>
                        {subTitle}
                    </p>
                    {mode === 'practice' && problemCount !== undefined && !isDisabled && (
                         <div className="flex items-center gap-2 mt-1.5">
                             <div className="h-0.5 w-4 bg-[var(--accent-solid)] opacity-30"></div>
                             <span className="text-[10px] font-mono font-bold text-[var(--accent-text)]">{problemCount} Questions</span>
                         </div>
                    )}
                 </div>
            </div>
            
            {!isDisabled && !isHighlighted && (
                <div className="w-8 h-8 rounded-full border border-[var(--ui-border)] flex items-center justify-center text-[var(--text-subtle)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-color)] group-hover:border-[var(--text-primary)] transition-all transform group-hover:rotate-0 -rotate-45">
                     <ChevronRightIcon className="w-4 h-4" />
                </div>
            )}

            {isHighlighted && (
                 <div className="px-2.5 py-0.5 rounded-full bg-[var(--warning-solid-bg)] text-[var(--warning-solid-text)] text-[9px] font-bold uppercase tracking-wider shadow-sm">
                    Finals
                 </div>
            )}
        </motion.button>
    );
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
    const { t } = useTranslation();
    const { flaggedItems, subject, subjectData, readingSettings, setPreferredMode, language, lastActiveChapterId } = useAppContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([]);
    
    const activeMode = readingSettings.preferredMode;
    const { scrollYProgress } = useScroll({ container: contentRef });
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        if (!subject) return;
        try {
            const storedHistory = safeStorage.getItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY);

            if (storedHistory) {
                const allHistory: QuizResult[] = JSON.parse(storedHistory);
                const subjectHistory = allHistory.filter(q => q.subjectId === subject.id);
                setRecentQuizzes(subjectHistory.slice(0, 5));
            }
        } catch (e) {
            console.error("Could not parse quiz history", e);
        }
    }, [subject]);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setShowBackToTop(latest > 0.1);
        });
    }, [scrollYProgress]);

    const scrollToTop = () => {
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleModeChange = (val: string) => {
        setPreferredMode(val as 'reading' | 'practice');
    };

    const handleChapterClick = (chapterId: string) => {
        setView({ type: 'textbook', chapterId });
    };
    
    const handleChapterQuizClick = (chapterId: string) => {
        // Extract chapter number from ID (e.g. "chapter1" -> "1")
        const chapterNumber = chapterId.replace(/\D/g, '');
        if (!chapterNumber || !subjectData) return;
        
        const problems = subjectData.problems.filter(p => p.chapter === chapterNumber);
        if (problems.length === 0) return;
        
        // Find title
        const chapterInfo = subjectData.chapterList.find(c => c.id === chapterId);
        const title = chapterInfo ? chapterInfo.title[language] : `${t('chapter')} ${chapterNumber}`;

        setView({ 
            type: 'quiz', 
            id: `chapter-${chapterNumber}-quiz-${Date.now()}`,
            problems,
            title,
            startIndex: 0,
            chapterId: chapterId // Pass chapterId to allow switching back to textbook
        });
    };

    const handleStartQuizClick = () => {
        setView({ type: 'question_bank_quiz' });
    }
    
    const handleContinueReading = () => {
         // Default to first chapter if no lastActiveChapterId
         const targetChapterId = lastActiveChapterId || (subjectData?.chapterList[0]?.id);
         if (targetChapterId) {
             setView({ type: 'textbook', chapterId: targetChapterId });
         }
    }

    const handleSwitchToPractice = () => {
        setPreferredMode('practice');
        setView({ type: 'home' }); // Force re-render of home in practice mode
    }
    
    // Pre-calculate problem counts per chapter
    const problemsByChapter = useMemo(() => {
        if (!subjectData) return {};
        const counts: Record<string, number> = {};
        subjectData.problems.forEach(p => {
            const chId = `chapter${p.chapter}`;
            counts[chId] = (counts[chId] || 0) + 1;
        });
        return counts;
    }, [subjectData]);

    // Resolve chapter title for hero section
    const lastChapterTitle = useMemo(() => {
        if(!lastActiveChapterId || !subjectData) return null;
        const ch = subjectData.chapterList.find(c => c.id === lastActiveChapterId);
        return ch ? ch.title[language] : null;
    }, [lastActiveChapterId, subjectData, language]);


    if (!subject || !subjectData) return null;
    const isProgrammingSubject = subject.type === 'programming';
    const isQuizSubject = subject.type === 'quiz';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.08 } 
        }
    };
    
    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 400, damping: 30 } }
    };

    return (
        <>
            <div ref={contentRef} className="h-full overflow-y-auto px-4 sm:px-6 lg:px-12 relative custom-scrollbar">
                <EdgeProgressBar containerRef={contentRef} />
                <div className="max-w-[1300px] mx-auto pb-32 pt-20 lg:pt-12">
                    
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                        <GreetingHeader 
                            title={subject.name[language]} 
                            subtitle={subject.name[language === 'en' ? 'zh' : 'en']} 
                        />
                        
                        <div className="w-full md:w-80 flex-shrink-0">
                            <SegmentedControl
                                options={[
                                    { label: t('mode_reading'), value: 'reading' },
                                    { label: t('mode_practice'), value: 'practice' }
                                ]}
                                value={activeMode}
                                onChange={handleModeChange}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMode}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            className="space-y-10"
                        >
                            {activeMode === 'practice' && (
                                <>
                                    {isQuizSubject && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <motion.div variants={itemVariants} className="h-full">
                                                <LargeActionCard 
                                                    onAction={handleStartQuizClick}
                                                    label={t('start_quiz_session')}
                                                    subLabel={t('subtitle_randomized_practice')}
                                                    icon={<PlayIcon className="w-7 h-7"/>}
                                                    isPrimary={true}
                                                    recentQuiz={recentQuizzes.length > 0 ? recentQuizzes[0] : null}
                                                    indexStr="01"
                                                />
                                            </motion.div>

                                            <motion.div variants={itemVariants} className="h-full">
                                                <LargeActionCard 
                                                    onAction={() => setView({ type: 'overview' })}
                                                    label={t('question_bank')}
                                                    subLabel={t('subtitle_question_bank')}
                                                    icon={<ListBulletIcon className="w-7 h-7"/>}
                                                    indexStr="02"
                                                />
                                            </motion.div>
                                        </div>
                                    )}

                                    {isProgrammingSubject && (
                                         <motion.div variants={itemVariants}>
                                            <LargeActionCard 
                                                onAction={() => setView({ type: 'programming' })}
                                                label={t('programming_exercises')}
                                                subLabel={t('subtitle_coding_practice')}
                                                icon={<CodeBracketIcon className="w-7 h-7"/>}
                                                isPrimary={true}
                                                indexStr="01"
                                            />
                                        </motion.div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <motion.div variants={itemVariants}>
                                            <SmallToolCard 
                                                icon={<StarIcon className="w-5 h-5"/>}
                                                title={t('starred_items')}
                                                count={flaggedItems.length}
                                                onClick={() => setView({ type: 'bookmarks' })}
                                                indexStr="03"
                                            />
                                        </motion.div>
                                        {isQuizSubject && (
                                            <motion.div variants={itemVariants}>
                                                <SmallToolCard 
                                                    icon={<ClockIcon className="w-5 h-5"/>}
                                                    title={t('quiz_history')}
                                                    count={recentQuizzes.length}
                                                    onClick={() => setView({ type: 'history' })}
                                                    indexStr="04"
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                    
                                    {isQuizSubject && (
                                        <motion.div variants={itemVariants}>
                                            <div className="flex items-center gap-6 mb-6 mt-10">
                                                <h2 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <FolderIcon className="w-4 h-4"/>
                                                    {t('practice_questions_for_chapter')}
                                                </h2>
                                                <div className="h-px flex-1 bg-[var(--ui-border)] opacity-60"></div>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {subjectData.chapterList.map((chapter, index) => (
                                                    <ChapterCard
                                                        key={chapter.id}
                                                        index={index}
                                                        chapter={chapter}
                                                        onClick={() => handleChapterQuizClick(chapter.id)}
                                                        language={language}
                                                        problemCount={problemsByChapter[chapter.id] || 0}
                                                        mode="practice"
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </>
                            )}

                            {activeMode === 'reading' && (
                                <>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <motion.div variants={itemVariants} className="flex-[3]">
                                            <LargeActionCard 
                                                onAction={handleContinueReading}
                                                label={lastChapterTitle || subjectData.chapterList[0]?.title[language] || "Read"}
                                                subLabel={lastActiveChapterId ? "Resume Reading" : "Start Reading"}
                                                icon={<BookOpenIcon className="w-7 h-7"/>}
                                                isPrimary={true}
                                                indexStr="00"
                                            />
                                        </motion.div>
                                        
                                        <motion.div variants={itemVariants} className="flex-1 min-w-[260px]">
                                             <button
                                                onClick={handleSwitchToPractice}
                                                className="w-full h-full relative overflow-hidden rounded-[2rem] p-6 text-left shadow-lg transition-all duration-300 group flex flex-col justify-between border border-[var(--ui-border)] bg-[var(--bg-translucent)] hover:bg-[var(--ui-bg)] hover:border-[var(--text-subtle)]"
                                             >
                                                <div className="absolute top-4 right-6 font-mono text-3xl font-bold tracking-tighter opacity-10 text-[var(--text-primary)]">
                                                    Q
                                                </div>
                                                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[var(--ui-bg)] text-[var(--text-primary)] border border-[var(--ui-border)] group-hover:scale-110 transition-transform">
                                                    <PlayIcon className="w-6 h-6" />
                                                </div>
                                                <div className="mt-4">
                                                    <h3 className="text-xl font-bold font-serif text-[var(--text-primary)] leading-tight mb-1">Practice</h3>
                                                    <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                                                        Question Bank
                                                    </p>
                                                </div>
                                             </button>
                                        </motion.div>
                                    </div>

                                    <motion.div variants={itemVariants}>
                                        <div className="flex items-center gap-6 mb-6 mt-6">
                                            <h2 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] flex items-center gap-2">
                                                <FolderIcon className="w-4 h-4"/>
                                                {t('by_chapter')}
                                            </h2>
                                            <div className="h-px flex-1 bg-[var(--ui-border)] opacity-60"></div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {subjectData.chapterList.map((chapter, index) => (
                                                <ChapterCard
                                                    key={chapter.id}
                                                    index={index}
                                                    chapter={chapter}
                                                    onClick={() => handleChapterClick(chapter.id)}
                                                    language={language}
                                                    mode="reading"
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
        </>
    );
};
