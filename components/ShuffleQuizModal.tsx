import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { problems } from '../data/problems';
import type { Problem } from '../types';

interface ShuffleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (selectedChapters: string[], count: number) => void;
  chapters: string[];
}

export const ShuffleQuizModal: React.FC<ShuffleQuizModalProps> = ({ isOpen, onClose, onStart, chapters }) => {
  const { t } = useTranslation();
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [count, setCount] = useState<number>(20);

  const problemsByChapter = useMemo(() => {
    return problems.reduce<Record<string, Problem[]>>((acc, problem) => {
        const chapterKey = `${problem.chapter}`;
        if (!acc[chapterKey]) {
            acc[chapterKey] = [];
        }
        acc[chapterKey].push(problem);
        return acc;
    }, {});
  }, []);

  const maxQuestions = useMemo(() => {
    if (selectedChapters.length === 0) return problems.length;
    return selectedChapters.reduce((total, ch) => total + (problemsByChapter[ch]?.length || 0), 0);
  }, [selectedChapters, problemsByChapter]);

  const handleToggleChapter = (chapter: string) => {
    setSelectedChapters(prev =>
      prev.includes(chapter) ? prev.filter(c => c !== chapter) : [...prev, chapter]
    );
  };
  
  const handleSelectAll = () => setSelectedChapters(chapters);
  const handleDeselectAll = () => setSelectedChapters([]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-[var(--bg-translucent)] backdrop-blur-2xl rounded-2xl p-6 w-full max-w-md border border-[var(--glass-border)] shadow-[var(--glass-shadow)]"
          >
            <h2 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">{t('shuffle_settings')}</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">{t('shuffle_description')}</p>

            <div className="mb-4">
               <label htmlFor="question-count" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">{t('shuffle_num_questions')}</label>
                <div className="flex gap-2">
                    <input
                        id="question-count"
                        type="number"
                        value={count}
                        max={maxQuestions}
                        min="1"
                        onChange={e => {
                          let val = parseInt(e.target.value, 10);
                          if (isNaN(val) || val < 1) val = 1;
                          if (val > maxQuestions) val = maxQuestions;
                          setCount(val);
                        }}
                        className="w-full bg-[var(--ui-bg)] border border-[var(--ui-border)] rounded-lg px-3 py-2 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all"
                    />
                    <button 
                        onClick={() => setCount(maxQuestions)}
                        className="px-4 py-2 rounded-lg bg-[var(--ui-bg)] text-[var(--text-secondary)] text-sm font-semibold hover:bg-[var(--ui-bg-hover)] transition-colors"
                    >
                        {t('shuffle_all_questions')}
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-2">
                <button onClick={handleSelectAll} className="text-xs font-semibold text-[var(--accent-text)]">{t('select_all')}</button>
                <button onClick={handleDeselectAll} className="text-xs font-semibold text-[var(--accent-text)]">{t('deselect_all')}</button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6 max-h-48 overflow-y-auto p-2 bg-[var(--ui-bg)] rounded-lg overscroll-contain">
              {chapters.map(chapter => (
                <button
                  key={chapter}
                  onClick={() => handleToggleChapter(chapter)}
                  className={`p-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedChapters.includes(chapter)
                      ? 'bg-[var(--accent-solid)] text-white'
                      : 'bg-[var(--bg-translucent)] text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)]'
                  }`}
                >
                  {`${t('chapter')} ${chapter}${t('chapter_unit')}`}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={onClose} className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-[var(--ui-bg)] text-[var(--text-secondary)] font-semibold hover:bg-[var(--ui-bg-hover)] transition-colors">
                {t('cancel')}
              </button>
              <button onClick={() => onStart(selectedChapters, count)} className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-semibold hover:bg-[var(--accent-solid-hover)] transition-colors">
                {t('start_shuffled_quiz')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};