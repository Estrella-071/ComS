

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import type { View, Problem, GlossaryTerm } from '../types';
import { SearchIcon, XMarkIcon, CodeBracketIcon, BookOpenIcon, ChevronRightIcon } from './icons';
import { TextWithHighlights } from './TextWithHighlights';

interface SearchModalProps {
  onClose: () => void;
  onNavigate: (view: View) => void;
}

type SearchResultItem = 
    | { type: 'problem'; data: Problem }
    | { type: 'glossary'; data: GlossaryTerm };

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onNavigate }) => {
  const { subjectData } = useAppContext();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { problems, glossary } = useMemo(() => ({
    problems: subjectData?.problems || [],
    glossary: subjectData?.glossaryData || [],
  }), [subjectData]);

  const allResults: SearchResultItem[] = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    
    const filteredProblems = problems.filter(p =>
      p.text_en.toLowerCase().includes(lowerQuery) ||
      p.text_zh.toLowerCase().includes(lowerQuery) ||
      p.number.includes(lowerQuery)
    ).slice(0, 10).map(p => ({ type: 'problem', data: p } as SearchResultItem));

    const filteredGlossary = glossary.filter(g =>
      g.term.toLowerCase().includes(lowerQuery) ||
      g.chinese.toLowerCase().includes(lowerQuery) ||
      g.definition.toLowerCase().includes(lowerQuery)
    ).slice(0, 10).map(g => ({ type: 'glossary', data: g } as SearchResultItem));

    return [...filteredProblems, ...filteredGlossary];
  }, [query, problems, glossary]);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
          onClose();
          return;
      }
      if (allResults.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % allResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + allResults.length) % allResults.length);
      } else if (e.key === 'Enter') {
          if (activeIndex >= 0 && activeIndex < allResults.length) {
              const item = allResults[activeIndex];
              if (item.type === 'problem') {
                  onNavigate({ type: 'problem', id: item.data.id });
              } else {
                  onNavigate({ type: 'glossary' });
              }
          }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, allResults, activeIndex, onNavigate]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    const activeElement = resultsRef.current?.querySelector(`[data-active='true']`);
    activeElement?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const problemResults = allResults.filter(r => r.type === 'problem') as Extract<SearchResultItem, {type: 'problem'}>[];
  const glossaryResults = allResults.filter(r => r.type === 'glossary') as Extract<SearchResultItem, {type: 'glossary'}>[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/50 flex items-start justify-center pt-16 md:pt-24"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-[95vw] max-w-2xl glass-pane rounded-2xl shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[var(--ui-border)] flex items-center gap-2">
          <SearchIcon className="w-6 h-6 text-[var(--text-subtle)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('search_modal_placeholder')}
            className="w-full bg-transparent text-lg text-[var(--text-primary)] outline-none"
          />
          <button onClick={onClose} className="p-2 -m-2 text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)] rounded-full">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div ref={resultsRef} className="overflow-y-auto max-h-[60vh]">
          <AnimatePresence>
            {query.trim() === '' ? (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="p-12 text-center text-[var(--text-secondary)]">{t('search_modal_placeholder')}</motion.div>
            ) : allResults.length === 0 ? (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="p-12 text-center text-[var(--text-secondary)]">{t('search_no_results')}</motion.div>
            ) : (
              <div className="divide-y divide-[var(--ui-border)]">
                {problemResults.length > 0 && (
                  <ResultSection icon={<CodeBracketIcon className="w-5 h-5"/>} title={t('search_results_title')}>
                    {problemResults.map((r) => {
                       const index = allResults.findIndex(item => item.type === 'problem' && item.data.id === r.data.id);
                       return (
                        <ResultItem 
                          key={r.data.id} 
                          onClick={() => onNavigate({ type: 'problem', id: r.data.id })}
                          isActive={index === activeIndex}
                          onMouseEnter={() => setActiveIndex(index)}
                        >
                          <p className="font-semibold"><TextWithHighlights text={`Problem ${r.data.number}`} highlight={query} /></p>
                          <p className="text-sm text-[var(--text-secondary)] line-clamp-2"><TextWithHighlights text={r.data.text_en} highlight={query} /></p>
                        </ResultItem>
                       )
                    })}
                  </ResultSection>
                )}
                {glossaryResults.length > 0 && (
                  <ResultSection icon={<BookOpenIcon className="w-5 h-5"/>} title={t('glossary')}>
                    {glossaryResults.map(r => {
                      const index = allResults.findIndex(item => item.type === 'glossary' && item.data.term === r.data.term);
                       return (
                       <ResultItem 
                        key={r.data.term} 
                        onClick={() => onNavigate({ type: 'glossary' })}
                        isActive={index === activeIndex}
                        onMouseEnter={() => setActiveIndex(index)}
                       >
                         <p className="font-semibold"><TextWithHighlights text={r.data.term} highlight={query} /> <span className="text-[var(--text-subtle)] font-normal">({r.data.chinese})</span></p>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2"><TextWithHighlights text={r.data.definition} highlight={query} /></p>
                      </ResultItem>
                       )
                    })}
                  </ResultSection>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ResultSection: React.FC<{icon: React.ReactNode, title: string, children: React.ReactNode}> = ({icon, title, children}) => (
  <div className="p-2">
    <h3 className="px-3 py-1 text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider flex items-center gap-2">{icon} {title}</h3>
    <div>{children}</div>
  </div>
);

interface ResultItemProps {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  onMouseEnter?: () => void;
}

const ResultItem: React.FC<ResultItemProps> = ({onClick, children, isActive, onMouseEnter}) => (
    <button 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      data-active={isActive}
      className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex justify-between items-center group ${isActive ? 'bg-[var(--ui-bg-hover)]' : 'hover:bg-[var(--ui-bg-hover)]'}`}
    >
      <div className="min-w-0">{children}</div>
      <ChevronRightIcon className="w-5 h-5 text-[var(--text-subtle)] flex-shrink-0 ml-4 transition-transform group-hover:translate-x-1"/>
    </button>
);