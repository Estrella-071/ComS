
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { ProgrammingExercise, View } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { SearchIcon } from './icons';
import { SegmentedControl } from './common/SegmentedControl';
import { BackToTopButton } from './common/BackToTopButton';
import { EdgeProgressBar } from './common/EdgeProgressBar';

interface ProgrammingViewProps {
    setView: (view: View) => void;
}

type FilterType = 'all' | 'programming' | 'short_answer' | 'making_a_difference';

export const ProgrammingView: React.FC<ProgrammingViewProps> = ({ setView }) => {
    const { t } = useTranslation();
    const { subjectData } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('programming');
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

    const exercises = useMemo(() => subjectData?.exercises || [], [subjectData]);

    const filteredExercises = useMemo(() => {
        let tempExercises = exercises;

        if (filterType !== 'all') {
            tempExercises = tempExercises.filter(e => e.type === filterType);
        }

        if (!searchQuery) return tempExercises;
        
        const lowercasedQuery = searchQuery.toLowerCase();
        return tempExercises.filter(e => 
            e.title_en.toLowerCase().includes(lowercasedQuery) ||
            e.title_zh.toLowerCase().includes(lowercasedQuery) ||
            e.description_en.toLowerCase().includes(lowercasedQuery) ||
            e.description_zh.toLowerCase().includes(lowercasedQuery) ||
            e.number.toLowerCase().includes(lowercasedQuery)
        );
    }, [searchQuery, exercises, filterType]);

    const exercisesByChapter = useMemo(() => {
        return filteredExercises.reduce<Record<string, ProgrammingExercise[]>>((acc, exercise) => {
            if (!acc[exercise.chapter]) acc[exercise.chapter] = [];
            acc[exercise.chapter].push(exercise);
            return acc;
        }, {});
    }, [filteredExercises]);

    const handleExerciseClick = (exerciseId: string) => {
        setView({ type: 'exercise', id: exerciseId });
    };

    const getDifficultyClass = (difficulty: 'easy' | 'medium' | 'hard') => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        }
    };
    
    const filterOptions = [
        { label: t('filter_programming'), value: 'programming' },
        { label: t('filter_short_answer'), value: 'short_answer' },
        { label: t('filter_making_a_difference'), value: 'making_a_difference' },
        { label: t('filter_all'), value: 'all' },
    ];
    
    if (!subjectData) return null;

    const listVariants = {
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {},
    };
    
    const itemVariants = {
      visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 25 } },
      hidden: { opacity: 0, y: 20 },
      exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    };

    return (
        <>
            <div ref={contentRef} className="h-full overflow-y-auto relative">
                <EdgeProgressBar containerRef={contentRef} />
                {/* Added pt-20 for mobile spacing */}
                <div className="sticky top-0 z-[var(--z-sticky-l2)] bg-[var(--bg-color)]/80 backdrop-blur-md pt-20 lg:pt-4 pb-4 space-y-4">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative w-full">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search_placeholder')}
                                className="w-full glass-pane rounded-full py-3 pl-12 pr-4 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all"
                            />
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-subtle)] pointer-events-none" />
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                        <SegmentedControl
                            options={filterOptions}
                            value={filterType}
                            onChange={(val) => setFilterType(val as FilterType)}
                        />
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div layout className="pb-24 pt-8">
                        {Object.keys(exercisesByChapter).length > 0 ? Object.entries(exercisesByChapter).sort(([a], [b]) => parseInt(a) - parseInt(b)).map(([chapter, chapterExercises]: [string, ProgrammingExercise[]]) => (
                            <motion.div layout="position" key={chapter} className="mb-12">
                                <h2 className="text-2xl font-bold text-[var(--text-secondary)] border-b-2 border-[var(--ui-border)] py-3 mb-6">
                                    {`${t('chapter')} ${chapter}${t('chapter_unit')}`}
                                </h2>
                                <motion.div layout variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
                                    <AnimatePresence>
                                    {chapterExercises.map(ex => {
                                        // Force English
                                        const mainTitle = ex.title_en;
                                        const subTitle = ex.title_zh;
                                        const description = ex.description_en;

                                        return (
                                        <motion.div
                                            key={ex.id}
                                            layout
                                            variants={itemVariants}
                                            exit={itemVariants.exit}
                                            whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.99, y: 0 }}
                                        >
                                            <button
                                                onClick={() => handleExerciseClick(ex.id)}
                                                className="w-full glass-pane rounded-xl p-5 text-left flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                                            >
                                                <div className="flex-grow min-w-0">
                                                    <p className="text-xs font-semibold text-[var(--text-subtle)] mb-2">{t('exercise_header')} {ex.number}</p>
                                                    <h3 className="font-bold text-[var(--text-primary)]">{mainTitle}</h3>
                                                    <p className="text-sm text-[var(--text-secondary)] mt-1">{subTitle}</p>
                                                    <p className="text-sm text-[var(--text-secondary)] mt-3 line-clamp-2">{description}</p>
                                                </div>
                                                <div className="flex-shrink-0 mt-2 sm:mt-0">
                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getDifficultyClass(ex.difficulty)}`}>
                                                        {ex.difficulty}
                                                    </span>
                                                </div>
                                            </button>
                                        </motion.div>
                                    )})}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        )) : (
                            <div className="text-center py-20 text-[var(--text-secondary)] glass-pane rounded-xl">
                                <p>{t('search_no_results')}</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
            <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
        </>
    );
}
