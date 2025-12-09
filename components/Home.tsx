import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { View, QuizResult } from '../types';
import { LOCAL_STORAGE_KEYS } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { BookOpenIcon, CodeBracketIcon, ListBulletIcon, ClockIcon, FolderIcon, PlayIcon, ChevronRightIcon, StarIcon } from './icons';
import { SegmentedControl } from './common/SegmentedControl';
import { BackToTopButton } from './common/BackToTopButton';
import { EdgeProgressBar } from './common/EdgeProgressBar';

interface HomeProps {
    setView: (view: View) => void;
}

// --- Helper Components ---

const GreetingHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => {
    const hour = new Date().getHours();
    let greeting = 'Hello';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    return (
        <div className="flex flex-col items-start">
            <span className="text-xs font-bold text-[var(--accent-text)] uppercase tracking-wider mb-1 opacity-80">{greeting}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
                {title}
            </h1>
            <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mt-2">
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
}> = ({ onAction, label, subLabel, icon, recentQuiz, isPrimary = false }) => {
    return (
        <motion.button
            onClick={onAction}
            whileHover={{ scale: 1.01, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full relative overflow-hidden rounded-3xl p-8 text-left shadow-lg border transition-all duration-300 group min-h-[180px] flex flex-col justify-between
                ${isPrimary 
                    ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-color)]' 
                    : 'border-[var(--ui-border)] bg-[var(--bg-color)] text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                }`}
        >
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start w-full">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform mb-4
                         ${isPrimary 
                            ? 'bg-[var(--bg-color)] text-[var(--text-primary)] border-transparent' 
                            : 'bg-[var(--ui-bg)] text-[var(--text-primary)] border-[var(--ui-border)]'
                        }`}>
                        {icon}
                    </div>
                    {recentQuiz && isPrimary && (
                        <span className="px-3 py-1 rounded-full bg-[var(--bg-color)] text-[var(--text-primary)] text-xs font-bold uppercase tracking-wide">
                            Resume
                        </span>
                    )}
                </div>

                <div>
                    <h2 className={`text-2xl sm:text-3xl font-bold font-serif mb-2 ${isPrimary ? 'text-[var(--bg-color)]' : 'text-[var(--text-primary)]'}`}>
                        {label}
                    </h2>
                    <p className={`text-sm sm:text-base ${isPrimary ? 'text-[var(--bg-color)] opacity-80' : 'text-[var(--text-secondary)]'}`}>
                        {subLabel}
                    </p>
                </div>
            </div>
            
            {/* Decorative Background for Primary Card */}
            {isPrimary && (
                 <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
            )}
        </motion.button>
    )
}

const SmallToolCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    count?: number | string;
    onClick: () => void;
    colorClass?: string;
}> = ({ icon, title, count, onClick, colorClass = "text-[var(--accent-solid)]" }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col p-6 rounded-2xl border border-[var(--ui-border)] bg-[var(--bg-color)] hover:bg-[var(--ui-bg)] transition-all h-full w-full gap-4 group shadow-sm hover:shadow-md"
    >
        <div className={`p-3 w-fit rounded-xl bg-[var(--ui-bg)] ${colorClass} group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div className="text-left">
            <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight">{title}</h3>
            {count !== undefined && (
                <p className="text-sm text-[var(--text-secondary)] mt-1 font-mono opacity-80">{count} items</p>
            )}
        </div>
    </motion.button>
);

const ChapterCard: React.FC<{ 
    chapter: any; 
    index: number;
    onClick: () => void;
    language: 'en' | 'zh';
}> = ({ chapter, index, onClick, language }) => {
    const mainTitle = chapter.title[language];
    const subTitle = chapter.title[language === 'en' ? 'zh' : 'en'];
    const chapterNum = index + 1;

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.01, x: 4 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center gap-6 p-6 rounded-2xl border border-[var(--ui-border)] bg-[var(--bg-color)] hover:bg-[var(--ui-bg)] transition-colors relative overflow-hidden group text-left shadow-sm"
        >
             {/* Watermark Number */}
            <div className="absolute -right-4 -bottom-6 text-[5rem] font-bold text-[var(--text-primary)] opacity-[0.03] font-serif select-none pointer-events-none group-hover:opacity-[0.06] transition-opacity">
                {chapterNum.toString().padStart(2, '0')}
            </div>

            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border border-[var(--ui-border)] bg-[var(--ui-bg)] text-[var(--text-secondary)] group-hover:border-[var(--text-subtle)] transition-colors z-10">
                <BookOpenIcon className="w-6 h-6"/>
            </div>
            
            <div className="flex-grow min-w-0 z-10">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-text)]">
                        CHAPTER {chapterNum}
                    </span>
                </div>
                <h3 className="font-bold truncate font-serif text-xl text-[var(--text-primary)] mb-1">
                    {mainTitle}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] truncate opacity-80">
                    {subTitle}
                </p>
            </div>
            
             <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 z-10 hidden sm:block">
                 <ChevronRightIcon className="w-6 h-6 text-[var(--text-subtle)]" />
            </div>
        </motion.button>
    );
}

// --- Main Component ---

export const Home: React.FC<HomeProps> = ({ setView }) => {
    const { t } = useTranslation();
    const { flaggedItems, subject, subjectData, readingSettings, setPreferredMode, language } = useAppContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([]);
    
    const activeMode = readingSettings.preferredMode;
    const { scrollYProgress } = useScroll({ container: contentRef });
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        if (!subject) return;
        try {
            // Safe LocalStorage Access
            let storedHistory: string | null = null;
            try {
                if (typeof window !== 'undefined' && window.localStorage) {
                    storedHistory = window.localStorage.getItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY);
                }
            } catch (e) { /* ignore */ }

            if (storedHistory) {
                const allHistory: QuizResult[] = JSON.parse(storedHistory);
                const subjectHistory = allHistory.filter(q => q.subjectId === subject.id);
                setRecentQuizzes(subjectHistory.slice(0, 5)); // Get top 5 for stats
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

    const handleStartQuizClick = () => {
        setView({ type: 'question_bank_quiz' });
    }
    
    const handleReadingHeroClick = () => {
         if (subjectData?.chapterList[0]) {
             setView({ type: 'textbook', chapterId: subjectData.chapterList[0].id });
         }
    }

    if (!subject || !subjectData) return null;
    const isProgrammingSubject = subject.type === 'programming';
    const isQuizSubject = subject.type === 'quiz';

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.05 } 
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } }
    };

    return (
        <>
            <div ref={contentRef} className="h-full overflow-y-auto px-4 sm:px-8 lg:p-12 relative">
                <EdgeProgressBar containerRef={contentRef} />
                {/* Expanded Max Width for better desktop usage */}
                <div className="max-w-[1600px] mx-auto pb-32 pt-24 lg:pt-10">
                    
                    {/* --- Dashboard Header --- */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                        <GreetingHeader 
                            title={subject.name[language]} 
                            subtitle={subject.name[language === 'en' ? 'zh' : 'en']} 
                        />
                        
                        <div className="w-full md:w-72 flex-shrink-0">
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
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            className="space-y-10"
                        >
                            {/* --- PRACTICE MODE LAYOUT --- */}
                            {activeMode === 'practice' && (
                                <>
                                    {isQuizSubject && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Primary Action: Start Quiz */}
                                            <motion.div variants={itemVariants} className="h-full">
                                                <LargeActionCard 
                                                    onAction={handleStartQuizClick}
                                                    label={t('start_quiz_session')}
                                                    subLabel={t('subtitle_randomized_practice')}
                                                    icon={<PlayIcon className="w-7 h-7"/>}
                                                    isPrimary={true}
                                                    recentQuiz={recentQuizzes.length > 0 ? recentQuizzes[0] : null}
                                                />
                                            </motion.div>

                                            {/* Secondary Action: Question Bank */}
                                            <motion.div variants={itemVariants} className="h-full">
                                                <LargeActionCard 
                                                    onAction={() => setView({ type: 'overview' })}
                                                    label={t('question_bank')}
                                                    subLabel={t('subtitle_question_bank')}
                                                    icon={<ListBulletIcon className="w-7 h-7"/>}
                                                />
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Programming Specific */}
                                    {isProgrammingSubject && (
                                         <motion.div variants={itemVariants}>
                                            <LargeActionCard 
                                                onAction={() => setView({ type: 'programming' })}
                                                label={t('programming_exercises')}
                                                subLabel={t('subtitle_coding_practice')}
                                                icon={<CodeBracketIcon className="w-7 h-7"/>}
                                                isPrimary={true}
                                            />
                                        </motion.div>
                                    )}

                                    {/* Tools Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <motion.div variants={itemVariants}>
                                            <SmallToolCard 
                                                icon={<StarIcon className="w-6 h-6"/>}
                                                title={t('starred_items')}
                                                count={flaggedItems.length}
                                                onClick={() => setView({ type: 'bookmarks' })}
                                                colorClass="text-amber-500 bg-amber-50 dark:bg-amber-900/20"
                                            />
                                        </motion.div>
                                        {isQuizSubject && (
                                            <motion.div variants={itemVariants}>
                                                <SmallToolCard 
                                                    icon={<ClockIcon className="w-6 h-6"/>}
                                                    title={t('quiz_history')}
                                                    count={recentQuizzes.length}
                                                    onClick={() => setView({ type: 'history' })}
                                                    colorClass="text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* --- READING MODE LAYOUT --- */}
                            {activeMode === 'reading' && (
                                <>
                                    <motion.div variants={itemVariants}>
                                        <LargeActionCard 
                                            onAction={handleReadingHeroClick}
                                            label={subjectData.chapterList[0]?.title[language] || "Read"}
                                            subLabel="Continue reading from the beginning"
                                            icon={<BookOpenIcon className="w-7 h-7"/>}
                                            isPrimary={true}
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <div className="flex items-center gap-3 mb-6 mt-4">
                                            <h2 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
                                                <FolderIcon className="w-5 h-5"/>
                                                {t('by_chapter')}
                                            </h2>
                                            <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {subjectData.chapterList.map((chapter, index) => (
                                                <ChapterCard
                                                    key={chapter.id}
                                                    index={index}
                                                    chapter={chapter}
                                                    onClick={() => handleChapterClick(chapter.id)}
                                                    language={language}
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