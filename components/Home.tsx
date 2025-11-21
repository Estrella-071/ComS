
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { View, QuizResult } from '../types';
import { LOCAL_STORAGE_KEYS } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { BookOpenIcon, CodeBracketIcon, ListBulletIcon, BookmarkSquareIcon, ChevronUpIcon, ClockIcon, FolderIcon, PencilSquareIcon, SparklesIcon, PlayIcon, ArrowPathIcon, CheckBadgeIcon, ChevronRightIcon } from './icons';
import { SegmentedControl } from './common/SegmentedControl';

interface HomeProps {
    setView: (view: View) => void;
}

const RecentQuizCard: React.FC<{ result: QuizResult, setView: (view: View) => void }> = ({ result, setView }) => {
    const { t } = useTranslation();
    const percentage = result.totalQuestions > 0 ? ((result.score / result.totalQuestions) * 100).toFixed(0) : 0;
    const scoreInt = parseInt(percentage as string);
    
    return (
        <motion.button
            onClick={() => setView({ type: 'history' })}
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left bg-[var(--bg-color)] border border-[var(--ui-border)] rounded-xl p-5 group hover:border-[var(--text-secondary)] transition-colors"
        >
            <div className="flex justify-between items-start gap-3">
                <div>
                    <h3 className="font-bold text-[var(--text-primary)] line-clamp-1 group-hover:underline decoration-1 underline-offset-4">{result.quizTitle}</h3>
                    <p className="text-xs text-[var(--text-subtle)] mt-1 font-mono">{new Date(result.date).toLocaleDateString()}</p>
                </div>
                <div className={`flex items-center justify-center px-2.5 py-1 rounded border text-sm font-bold font-mono ${scoreInt >= 60 ? 'border-[var(--success-text)] text-[var(--success-text)] bg-[var(--success-bg)]' : 'border-[var(--text-subtle)] text-[var(--text-subtle)] opacity-70'}`}>
                    {percentage}%
                </div>
            </div>
            <div className="mt-4 text-sm text-[var(--text-secondary)] flex items-center gap-2">
                <CheckBadgeIcon className="w-4 h-4"/> 
                <span className="font-mono">{result.score} / {result.totalQuestions}</span>
            </div>
        </motion.button>
    );
};

const QuickActionCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    subtitle: string; 
    onClick: () => void;
}> = ({ icon, title, subtitle, onClick }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        className="group w-full p-6 rounded-xl text-left border border-[var(--ui-border)] bg-[var(--bg-color)] hover:bg-[var(--ui-bg)] transition-all relative overflow-hidden"
    >
        <div className="relative z-10 flex flex-col h-full">
            <div className="mb-4 p-3 rounded-lg bg-[var(--ui-bg)] text-[var(--text-primary)] w-fit group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-color)] transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{title}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
            <ChevronRightIcon className="w-5 h-5 text-[var(--text-secondary)]" />
        </div>
    </motion.button>
);

const ChapterListItem: React.FC<{ 
    chapter: any; 
    mode: 'reading' | 'practice';
    onClick: () => void;
    hasQuiz?: boolean;
    language: 'en' | 'zh';
}> = ({ chapter, mode, onClick, hasQuiz, language }) => {
    const { t } = useTranslation();
    const mainTitle = chapter.title[language];
    const subTitle = chapter.title[language === 'en' ? 'zh' : 'en'];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
        >
            <button 
                onClick={onClick}
                className="w-full group flex items-center gap-4 bg-[var(--bg-color)] border border-[var(--ui-border)] p-5 rounded-xl text-left transition-all hover:border-[var(--text-primary)]"
            >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--ui-bg)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {mode === 'reading' ? <BookOpenIcon className="w-5 h-5"/> : (hasQuiz ? <CodeBracketIcon className="w-5 h-5"/> : <FolderIcon className="w-5 h-5"/>)}
                </div>
                
                <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-[var(--text-primary)] truncate font-serif">
                        {mainTitle}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] truncate mt-0.5">
                        {subTitle}
                    </p>
                </div>

                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] border border-[var(--text-primary)] px-2 py-1 rounded">
                        {mode === 'reading' ? 'Read' : 'Start'}
                    </span>
                </div>
            </button>
        </motion.div>
    );
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
    const { t } = useTranslation();
    const { flaggedItems, subject, subjectData, readingSettings, setPreferredMode, language } = useAppContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([]);
    
    // Using preferredMode from context to persist choice
    const activeMode = readingSettings.preferredMode;
    
    const { scrollYProgress } = useScroll({ container: contentRef });
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        if (!subject) return;
        try {
            const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY);
            if (storedHistory) {
                const allHistory: QuizResult[] = JSON.parse(storedHistory);
                const subjectHistory = allHistory.filter(q => q.subjectId === subject.id);
                setRecentQuizzes(subjectHistory.slice(0, 3));
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

    const problems = useMemo(() => subjectData?.problems || [], [subjectData]);
    const chapterProblemsMap = useMemo(() => {
        const map: Record<string, boolean> = {};
        if(!problems) return map;
        subjectData?.chapterList.forEach(ch => {
            const numMatch = ch.id.match(/\d+/);
            const num = numMatch ? numMatch[0] : null;
            map[ch.id] = num ? problems.some(p => p.chapter === num) : false;
        });
        return map;
    }, [subjectData, problems]);

    const handleModeChange = (val: string) => {
        setPreferredMode(val as 'reading' | 'practice');
    };

    const handleChapterClick = (chapterId: string) => {
        if (activeMode === 'reading') {
            setView({ type: 'textbook', chapterId });
        } else {
            // Practice Mode logic
            if (chapterProblemsMap[chapterId]) {
                const numMatch = chapterId.match(/\d+/);
                const num = numMatch ? numMatch[0] : null;
                if(num) {
                     const chapterProblems = problems.filter(p => p.chapter === num);
                     setView({ 
                        type: 'quiz',
                        id: `chapter-${num}-${Date.now()}`,
                        problems: chapterProblems, 
                        title: `${t('chapter')} ${num}${t('chapter_unit')}`, 
                        startIndex: 0 
                    });
                }
            } else {
                setView({ type: 'textbook', chapterId }); 
            }
        }
    };

    if (!subject || !subjectData) return null;
    const isProgrammingSubject = subject.type === 'programming';

    return (
        <div ref={contentRef} className="h-full overflow-y-auto px-4 sm:px-6 lg:p-8 relative">
            <div className="max-w-5xl mx-auto pb-24">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center pt-12 pb-16 border-b border-[var(--ui-border)] mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 font-serif text-center"
                    >
                        {subject.name[language]}
                    </motion.h1>
                    <motion.p
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.1 }}
                         className="text-[var(--text-secondary)] mb-10 text-lg font-serif italic text-center"
                    >
                        {subject.name[language === 'en' ? 'zh' : 'en']}
                    </motion.p>

                    <div className="w-full max-w-sm">
                        <SegmentedControl
                            options={[
                                { label: t('mode_reading'), value: 'reading' },
                                { label: t('mode_practice'), value: 'practice' }
                            ]}
                            value={activeMode}
                            onChange={handleModeChange}
                            layoutId="home-mode-switch"
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeMode === 'reading' ? (
                        <motion.div
                            key="reading-mode"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-10"
                        >
                             <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                    <h2 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
                                        <BookOpenIcon className="w-4 h-4"/>
                                        {t('table_of_contents')}
                                    </h2>
                                    <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {subjectData.chapterList.map((chapter) => (
                                        <ChapterListItem 
                                            key={chapter.id} 
                                            chapter={chapter} 
                                            mode="reading" 
                                            onClick={() => handleChapterClick(chapter.id)} 
                                            language={language}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="practice-mode"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-16"
                        >
                             {/* Quick Actions Grid */}
                             <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                    <h2 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
                                        <SparklesIcon className="w-4 h-4"/>
                                        {t('quick_actions')}
                                    </h2>
                                    <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {subject.type === 'quiz' && (
                                        <>
                                            <QuickActionCard 
                                                icon={<ArrowPathIcon className="w-6 h-6"/>}
                                                title={t('question_bank_quiz')}
                                                subtitle={t('subtitle_randomized_practice')}
                                                onClick={() => setView({ type: 'question_bank_quiz' })}
                                            />
                                            <QuickActionCard 
                                                icon={<ListBulletIcon className="w-6 h-6"/>}
                                                title={t('all_questions')}
                                                subtitle={`${t('browse')} ${subjectData.problems.length} ${t('questions_suffix')}`}
                                                onClick={() => setView({ type: 'overview' })}
                                            />
                                        </>
                                    )}
                                    {isProgrammingSubject && (
                                         <QuickActionCard 
                                            icon={<PencilSquareIcon className="w-6 h-6"/>}
                                            title={t('programming_exercises')}
                                            subtitle={t('subtitle_coding_practice')}
                                            onClick={() => setView({ type: 'programming' })}
                                        />
                                    )}
                                    <QuickActionCard 
                                        icon={<BookmarkSquareIcon className="w-6 h-6"/>}
                                        title={t('flagged_for_review')}
                                        subtitle={`${flaggedItems.length} ${t('saved_items_suffix')}`}
                                        onClick={() => setView({ type: 'bookmarks' })}
                                    />
                                </div>
                            </div>

                            {/* Recent History */}
                             {recentQuizzes.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                        <h2 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
                                            <ClockIcon className="w-4 h-4"/>
                                            {t('recent_quizzes')}
                                        </h2>
                                        <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {recentQuizzes.map(result => (
                                            <RecentQuizCard key={result.id} result={result} setView={setView} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Chapter Practice List */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                    <h2 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
                                        <FolderIcon className="w-4 h-4"/>
                                        {t('by_chapter')}
                                    </h2>
                                    <div className="h-px flex-1 bg-[var(--ui-border)]"></div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {subjectData.chapterList.map((chapter) => (
                                        <ChapterListItem 
                                            key={chapter.id} 
                                            chapter={chapter} 
                                            mode="practice" 
                                            hasQuiz={chapterProblemsMap[chapter.id]}
                                            onClick={() => handleChapterClick(chapter.id)} 
                                            language={language}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        onClick={scrollToTop}
                        className="fixed bottom-6 left-6 w-14 h-14 bg-[var(--ui-bg)] rounded-full text-[var(--text-primary)] flex items-center justify-center shadow-lg z-[var(--z-fab)]"
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
};
