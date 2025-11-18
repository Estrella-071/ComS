

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import type { View, Problem, ProgrammingExercise } from '../types';
import { BookmarkSquareIcon, ChevronRightIcon, StarSolidIcon } from './icons';

interface BookmarksViewProps {
    setView: (view: View) => void;
}

type BookmarkedItem = 
    | { type: 'problem'; data: Problem }
    | { type: 'exercise'; data: ProgrammingExercise };


export const BookmarksView: React.FC<BookmarksViewProps> = ({ setView }) => {
    const { t } = useTranslation();
    const { flaggedItems, subjectData, subject } = useAppContext();

    const bookmarkedItems = React.useMemo(() => {
        if (!subjectData) return [];
        const items: BookmarkedItem[] = [];

        if (subjectData.problems) {
            subjectData.problems.forEach(p => {
                if (flaggedItems.includes(p.id)) {
                    items.push({ type: 'problem', data: p });
                }
            });
        }
        if (subjectData.exercises) {
            subjectData.exercises.forEach(e => {
                if (flaggedItems.includes(e.id)) {
                    items.push({ type: 'exercise', data: e });
                }
            });
        }

        return items.sort((a, b) => {
            const chapA = parseInt(a.data.chapter);
            const chapB = parseInt(b.data.chapter);
            if (chapA !== chapB) return chapA - chapB;
            const numA = parseInt(a.data.number.split('.').pop() || '0');
            const numB = parseInt(b.data.number.split('.').pop() || '0');
            return numA - numB;
        });

    }, [flaggedItems, subjectData]);
    
    const bookmarkedProblems = bookmarkedItems.filter(item => item.type === 'problem').map(item => item.data as Problem);

    const handleStartQuiz = () => {
        if (bookmarkedProblems.length > 0) {
            setView({
                type: 'quiz',
                id: `bookmarks-${Date.now()}`,
                problems: bookmarkedProblems,
                title: t('flagged_for_review'),
                startIndex: 0,
            });
        }
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
        visible: { y: 0, opacity: 1 }
    };

    if (!subjectData) return null;

    return (
        <div className="h-full overflow-y-auto px-4 sm:px-6 lg:p-8 relative">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 my-8">
                    <div className="w-12 h-12 rounded-2xl glass-pane flex items-center justify-center">
                        <BookmarkSquareIcon className="w-7 h-7 text-[var(--accent-text)]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">{t('bookmarks_title')}</h1>
                        <p className="text-md text-[var(--text-secondary)] mt-1">{t('bookmarks_description')}</p>
                    </div>
                </div>

                {subject?.type === 'quiz' && bookmarkedProblems.length > 0 && (
                    <div className="mb-6">
                        <button onClick={handleStartQuiz} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--accent-solid)] text-[var(--accent-solid-text)] font-semibold hover:bg-[var(--accent-solid-hover)] transition-colors">
                           {t('bookmarks_start_quiz')} ({bookmarkedProblems.length})
                        </button>
                    </div>
                )}

                {bookmarkedItems.length === 0 ? (
                    <div className="text-center py-20 glass-pane rounded-2xl">
                        <StarSolidIcon className="w-12 h-12 text-[var(--text-subtle)] mx-auto mb-4" />
                        <p className="text-[var(--text-secondary)]">{t('bookmarks_no_problems')}</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3 pb-16"
                    >
                        {bookmarkedItems.map(item => (
                            <motion.button
                                key={item.data.id}
                                variants={itemVariants}
                                onClick={() => setView({ type: item.type, id: item.data.id })}
                                className="w-full glass-pane p-4 rounded-xl text-left transition-all hover:border-[var(--accent-text)]/50"
                            >
                               <div className="flex justify-between items-center">
                                 <div className="min-w-0">
                                    <p className="text-xs font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] px-2 py-0.5 rounded-full inline-block">
                                        {item.type === 'problem' ? t('problem_header') : t('exercise_header')} {item.data.number}
                                    </p>
                                    <p className="mt-2 text-sm text-[var(--text-primary)] line-clamp-2 pr-4">{item.type === 'problem' ? item.data.text_en : item.data.title_en}</p>
                                 </div>
                                 <ChevronRightIcon className="w-6 h-6 text-[var(--text-subtle)] flex-shrink-0 ml-4"/>
                               </div>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};