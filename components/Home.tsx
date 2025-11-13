
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { View, QuizResult } from '../types';
import { LOCAL_STORAGE_KEYS } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { BookOpenIcon, CodeBracketIcon, ListBulletIcon, BookmarkSquareIcon, ChevronUpIcon, ClockIcon, FolderIcon } from './icons';

interface HomeProps {
    setView: (view: View) => void;
}

const RecentQuizCard: React.FC<{ result: QuizResult, setView: (view: View) => void }> = ({ result, setView }) => {
    const { t } = useTranslation();
    const percentage = result.totalQuestions > 0 ? ((result.score / result.totalQuestions) * 100).toFixed(0) : 0;
    return (
        <motion.div
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="glass-pane rounded-2xl p-6"
        >
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="font-bold text-[var(--text-primary)] line-clamp-2">{result.quizTitle}</h3>
                    <p className="text-xs text-[var(--text-subtle)] mt-1.5">{new Date(result.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1 text-lg font-bold text-[var(--accent-text)] bg-[var(--accent-bg)] px-3 py-1 rounded-full">
                    <span>{percentage}%</span>
                </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
                <p className="text-sm text-[var(--text-secondary)]">{`${result.score} / ${result.totalQuestions} ${t('correct')}`}</p>
                <button
                    onClick={() => setView({ type: 'history' })}
                    className="text-sm font-semibold bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] text-[var(--text-secondary)] px-4 py-2 rounded-lg transition-colors"
                >
                    {t('history_view_details')}
                </button>
            </div>
        </motion.div>
    );
};

export const Home: React.FC<HomeProps> = ({ setView }) => {
    const { t } = useTranslation();
    const { flaggedProblems, subject, subjectData } = useAppContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([]);
    
    const { scrollYProgress } = useScroll({ container: contentRef });
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        if (!subject) return;
        try {
            const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY);
            if (storedHistory) {
                const allHistory: QuizResult[] = JSON.parse(storedHistory);
                const subjectHistory = allHistory.filter(q => q.subjectId === subject.id);
                setRecentQuizzes(subjectHistory.slice(0, 2));
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };
    
    if (!subject || !subjectData) return null;

    return (
        <div ref={contentRef} className="h-full overflow-y-auto px-4 sm:px-6 lg:p-8 relative">
            <div className="max-w-5xl mx-auto pb-16">
                <div className="text-center my-12 lg:my-20">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-snug text-[var(--text-primary)] mb-4 whitespace-pre-line"
                    >
                        {subject.name.zh}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
                    >
                        {subject.description.zh}
                    </motion.p>
                </div>
                
                 {recentQuizzes.length > 0 && (
                    <motion.div
                        className="mb-16"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                            <ClockIcon className="w-8 h-8 text-[var(--text-secondary)]"/>
                            {t('recent_quizzes')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {recentQuizzes.map(result => (
                                <RecentQuizCard key={result.id} result={result} setView={setView} />
                            ))}
                        </div>
                    </motion.div>
                )}
                
                <motion.div 
                    className="mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                        <BookOpenIcon className="w-8 h-8 text-[var(--text-secondary)]"/>
                        {t('table_of_contents')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjectData.chapterList.map((chapter) => (
                            <motion.div key={chapter.id} variants={itemVariants}>
                                <motion.button 
                                    onClick={() => setView({ type: 'textbook', chapterId: chapter.id })}
                                    className="w-full h-full glass-pane rounded-2xl p-6 text-left"
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.97, y: -2 }}
                                >
                                    <FolderIcon className="w-6 h-6 text-[var(--text-subtle)] mb-3"/>
                                    <h3 className="font-bold text-lg text-[var(--text-primary)]">{chapter.title.zh}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mt-1">{chapter.title.en}</p>
                                    <p className="text-sm text-[var(--text-secondary)] mt-3 line-clamp-2">{chapter.subtitle.zh}</p>
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                        <CodeBracketIcon className="w-8 h-8 text-[var(--text-secondary)]" />
                        {t('practice_modes')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <motion.div variants={itemVariants}>
                            <motion.button onClick={() => setView({ type: 'question_bank_quiz' })} className="w-full h-full glass-pane rounded-2xl p-6 text-left" whileHover={{ y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97, y: -2 }}>
                                <CodeBracketIcon className="w-8 h-8 mb-3 text-[var(--accent-text)]"/>
                                <h3 className="font-bold text-lg text-[var(--text-primary)]">{t('question_bank_quiz')}</h3>
                                <p className="text-sm text-[var(--text-secondary)] mt-1">Test your knowledge with a random selection of questions.</p>
                            </motion.button>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <motion.button onClick={() => setView({ type: 'bookmarks' })} className="w-full h-full glass-pane rounded-2xl p-6 text-left" whileHover={{ y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97, y: -2 }}>
                                <BookmarkSquareIcon className="w-8 h-8 mb-3 text-[var(--accent-text)]"/>
                                <h3 className="font-bold text-lg text-[var(--text-primary)]">{t('flagged_for_review')}</h3>
                                <p className="text-sm text-[var(--text-secondary)] mt-1">Review the {flaggedProblems.length} questions you've bookmarked.</p>
                            </motion.button>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <motion.button onClick={() => setView({ type: 'overview' })} className="w-full h-full glass-pane rounded-2xl p-6 text-left" whileHover={{ y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97, y: -2 }}>
                                <ListBulletIcon className="w-8 h-8 mb-3 text-[var(--accent-text)]"/>
                                <h3 className="font-bold text-lg text-[var(--text-primary)]">{t('all_questions')}</h3>
                                <p className="text-sm text-[var(--text-secondary)] mt-1">Browse all {subjectData.problems.length} questions in the question bank.</p>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 w-14 h-14 bg-[var(--ui-bg)] rounded-full text-[var(--text-primary)] flex items-center justify-center shadow-lg z-[var(--z-fab)]"
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
