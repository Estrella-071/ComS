
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

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onNavigate }) => {
  const { subjectData } = useAppContext();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { problems, glossary } = useMemo(() => ({
    problems: subjectData?.problems || [],
    glossary: subjectData?.glossaryData || [],
  }), [subjectData]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return { problems: [], glossary: [] };

    const lowerQuery = query.toLowerCase();
    
    const filteredProblems = problems.filter(p =>
      p.text_en.toLowerCase().includes(lowerQuery) ||
      p.text_zh.toLowerCase().includes(lowerQuery) ||
      p.number.includes(lowerQuery)
    ).slice(0, 10);

    const filteredGlossary = glossary.filter(g =>
      g.term.toLowerCase().includes(lowerQuery) ||
      g.chinese.toLowerCase().includes(lowerQuery) ||
      g.definition.toLowerCase().includes(lowerQuery)
    ).slice(0, 10);

    return { problems: filteredProblems, glossary: filteredGlossary };
  }, [query, problems, glossary]);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
        <div className="overflow-y-auto max-h-[60vh]">
          <AnimatePresence>
            {query.trim() === '' ? (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="p-12 text-center text-[var(--text-secondary)]">{t('search_modal_placeholder')}</motion.div>
            ) : (searchResults.problems.length === 0 && searchResults.glossary.length === 0) ? (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="p-12 text-center text-[var(--text-secondary)]">{t('search_no_results')}</motion.div>
            ) : (
              <div className="divide-y divide-[var(--ui-border)]">
                {searchResults.problems.length > 0 && (
                  <ResultSection icon={<CodeBracketIcon className="w-5 h-5"/>} title={t('search_results_title')}>
                    {searchResults.problems.map(p => (
                      <ResultItem key={p.id} onClick={() => onNavigate({ type: 'problem', id: p.id })}>
                        <p className="font-semibold"><TextWithHighlights text={`Problem ${p.number}`} highlight={query} /></p>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2"><TextWithHighlights text={p.text_en} highlight={query} /></p>
                      </ResultItem>
                    ))}
                  </ResultSection>
                )}
                {searchResults.glossary.length > 0 && (
                  <ResultSection icon={<BookOpenIcon className="w-5 h-5"/>} title={t('glossary')}>
                    {searchResults.glossary.map(g => (
                       <ResultItem key={g.term} onClick={() => onNavigate({ type: 'glossary' })}>
                         <p className="font-semibold"><TextWithHighlights text={g.term} highlight={query} /> <span className="text-[var(--text-subtle)] font-normal">({g.chinese})</span></p>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2"><TextWithHighlights text={g.definition} highlight={query} /></p>
                      </ResultItem>
                    ))}
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

const ResultItem: React.FC<{onClick: () => void, children: React.ReactNode}> = ({onClick, children}) => (
    <button onClick={onClick} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors flex justify-between items-center group">
      <div className="min-w-0">{children}</div>
      <ChevronRightIcon className="w-5 h-5 text-[var(--text-subtle)] flex-shrink-0 ml-4 transition-transform group-hover:translate-x-1"/>
    </button>
);