import React, { useState, useMemo } from 'react';
import { glossaryData } from '../data/glossary';
import { BookOpenIcon } from './icons';
import type { GlossaryTerm } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { problems } from '../data/problems';

export const Glossary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'alphabetical' | 'importance'>('alphabetical');
    const [filterChapter, setFilterChapter] = useState<string>('all');
    const { t } = useTranslation();

    const chapters = useMemo(() => {
      const chapterSet = new Set(problems.map(p => p.chapter));
      return ['all', ...Array.from(chapterSet).sort((a,b) => parseInt(a) - parseInt(b))];
    }, []);

    const processedData = useMemo(() => {
        let data = [...glossaryData];

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

    }, [searchTerm, sortBy, filterChapter]);

    const termsByCategory = useMemo(() => {
        return processedData.reduce<Record<string, GlossaryTerm[]>>((acc, term) => {
            if (!acc[term.category]) {
                acc[term.category] = [];
            }
            acc[term.category].push(term);
            return acc;
        }, {});
    }, [processedData]);


    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-translucent)] backdrop-blur-xl flex items-center justify-center border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
                    <BookOpenIcon className="w-7 h-7 text-[var(--accent-text)]" />
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">{t('glossary_title')}</h1>
            </div>

            <div className="mb-8 sticky top-0 md:top-6 z-10 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder={t('glossary_search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[var(--bg-translucent)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-2xl px-4 py-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all"
                />
                 <div className="grid grid-cols-2 gap-4">
                    <select value={filterChapter} onChange={e => setFilterChapter(e.target.value)} className="w-full bg-[var(--bg-translucent)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-2xl px-4 py-3 text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all appearance-none text-center">
                        {chapters.map(ch => <option key={ch} value={ch}>{ch === 'all' ? t('glossary_all_chapters') : `${t('chapter')} ${ch}${t('chapter_unit')}`}</option>)}
                    </select>
                     <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="w-full bg-[var(--bg-translucent)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-2xl px-4 py-3 text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all appearance-none text-center">
                        <option value="alphabetical">{t('glossary_alphabetical')}</option>
                        <option value="importance">{t('glossary_importance')}</option>
                    </select>
                </div>
            </div>
            
            <div className="space-y-10">
                {Object.entries(termsByCategory).length > 0 ? (
                    // FIX: Explicitly type the destructured arguments from Object.entries to resolve the 'unknown' type error for terms.
                    Object.entries(termsByCategory).map(([category, terms]: [string, GlossaryTerm[]]) => (
                        <div key={category}>
                            <h2 className="text-xl font-bold text-[var(--accent-text)] border-b border-[var(--ui-border)] pb-2 mb-4">{category}</h2>
                            <div className="space-y-4">
                                {terms.map(item => (
                                    <div key={item.term} className="bg-[var(--bg-translucent)] backdrop-blur-xl p-4 rounded-2xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{item.term} <span className="text-[var(--text-subtle)] font-normal">({item.chinese})</span></h3>
                                        <p className="text-[var(--text-secondary)] mt-2 leading-relaxed">{item.definition}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-[var(--text-secondary)]">{t('glossary_not_found')} "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};