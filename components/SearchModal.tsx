import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { problems } from '../data/problems';
import type { Problem } from '../types';
import type { View } from '../App';
import { SearchIcon, StarSolidIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { TextWithHighlights } from './TextWithHighlights';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: View) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, setView }) => {
  const { t } = useTranslation();
  const { flaggedProblems } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Defer focus to allow for modal animation
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredProblems = useMemo(() => {
    if (!searchQuery) return [];
    const lowercasedQuery = searchQuery.toLowerCase();
    return problems.filter(p => 
        p.text_en.toLowerCase().includes(lowercasedQuery) ||
        p.text_zh.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  const handleProblemClick = (problemId: string) => {
    setView({ type: 'problem', id: problemId });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-[var(--bg-translucent)] backdrop-blur-2xl rounded-2xl p-6 w-full max-w-2xl h-full max-h-[80vh] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">{t('search_modal_title')}</h2>
            
            <div className="relative mb-4">
              <input 
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_modal_placeholder')}
                className="w-full bg-[var(--ui-bg)] border border-[var(--ui-border)] rounded-full py-3 pl-12 pr-4 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-subtle)]" />
            </div>

            <div className="flex-1 overflow-y-auto -mx-2 px-2 overscroll-contain">
              {searchQuery && filteredProblems.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-[var(--text-secondary)]">{t('search_no_results')}</p>
                </div>
              )}
              <div className="space-y-2">
                {filteredProblems.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => handleProblemClick(p.id)}
                    className="w-full text-left p-3 rounded-lg bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs text-[var(--text-subtle)] mb-1">
                      <span>{t('problem_header')} {p.number}</span>
                      {flaggedProblems.includes(p.id) && <StarSolidIcon className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                      <TextWithHighlights text={p.text_en} highlight={searchQuery} />
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};