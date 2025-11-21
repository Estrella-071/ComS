
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { BookOpenIcon } from './icons';
import type { GlossaryTerm, View } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { BackToTopButton } from './common/BackToTopButton';

interface GlossaryProps {
    setView: (view: View) => void;
}

export const Glossary: React.FC<GlossaryProps> = ({ setView }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'alphabetical' | 'importance'>('alphabetical');
    const [filterChapter, setFilterChapter] = useState<string>('all');
    const { t } = useTranslation();
    const { subjectData } = useAppContext();
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

    const chapters = useMemo(() => {
      if (!subjectData) return ['all'];
      const chapterSet = new Set(subjectData.problems.map(p => p.chapter));
      return ['all', ...Array.from(chapterSet).sort((a: string, b: string) => parseInt(a) - parseInt(b))];
    }, [subjectData]);

    const processedData = useMemo(() => {
        if (!subjectData) return [];
        let data = [...subjectData.glossaryData];

        // Filter by chapter
        if (filterChapter !== 'all') {
            data = data.filter(item => item.chapter === filterChapter);
        }

        // Filter by search term
        if (searchTerm) {
            const lowercasedFilter = searchTerm.toLowerCase();
            data = data.filter(item =>
                item.term.toLowerCase().includes(lowercasedFilter) ||
                item.chinese.toLowerCase().includes(lowercasedFilter) ||
                item.definition.toLowerCase().includes(lowercasedFilter)
            );
        }

        // Sort
        if (sortBy === 'alphabetical') {
            data.sort((a, b) => a.term.localeCompare(b.term));
        } else if (sortBy === 'importance') {
            data.sort((a, b) => b.importance - a.importance);
        }
        
        return data;

    }, [searchTerm, sortBy, filterChapter, subjectData]);

    const termsByCategory = useMemo(() => {
        return processedData.reduce<Record<string, GlossaryTerm[]>>((acc, term) => {
            if (!acc[term.category]) {
                acc[term.category] = [];
            }
            acc[term.category].push(term);
            return acc;
        }, {});
    }, [processedData]);
    
    if (!subjectData) return null;

    return (
        <>
            <div ref={contentRef} className="h-full overflow-y-auto px-4 sm:px-6 lg:p-8 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 my-8">
                        <div className="w-12 h-12 rounded-2xl glass-pane flex items-center justify-center">
                            <BookOpenIcon className="w-7 h-7 text-[var(--accent-text)]" />
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">{t('glossary_title')}</h1>
                    </div>

                    <div className="mb-8 sticky top-0 md:top-6 z-[var(--z-content-overlay)] flex flex-col md:flex-row gap-4 bg-[var(--bg-color)]/80 backdrop-blur-md -mx-4 sm:-mx-6 px-4 sm:px-6 py-4">
                        <input
                            type="text"
                            placeholder={t('glossary_search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full glass-pane rounded-2xl px-4 py-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <select value={filterChapter} onChange={e => setFilterChapter(e.target.value)} className="w-full glass-pane rounded-2xl px-4 py-3 text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all appearance-none text-center">
                                {chapters.map(ch => <option key={ch} value={ch}>{ch === 'all' ? t('glossary_all_chapters') : `${t('chapter')} ${ch}${t('chapter_unit')}`}</option>)}
                            </select>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="w-full glass-pane rounded-2xl px-4 py-3 text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all appearance-none text-center">
                                <option value="alphabetical">{t('glossary_alphabetical')}</option>
                                <option value="importance">{t('glossary_importance')}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="space-y-12 pb-16">
                        {Object.entries(termsByCategory).length > 0 ? (
                            Object.entries(termsByCategory).map(([category, terms]: [string, GlossaryTerm[]]) => (
                                <div key={category}>
                                    <h2 className="text-xl font-bold text-[var(--accent-text)] border-b border-[var(--ui-border)] pb-2 mb-4">{category}</h2>
                                    <div className="space-y-4">
                                        {terms.map(item => (
                                            <div key={item.term} className="glass-pane p-5 rounded-2xl">
                                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{item.term} <span className="text-[var(--text-subtle)] font-normal">({item.chinese})</span></h3>
                                                <p className="text-[var(--text-secondary)] mt-2 leading-relaxed">{item.definition}</p>
                                                <p className="text-[var(--text-subtle)] mt-1 leading-relaxed">{item.definition_zh}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 glass-pane rounded-2xl">
                                <p className="text-[var(--text-secondary)]">{t('glossary_not_found')} "{searchTerm}".</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
        </>
    );
};
