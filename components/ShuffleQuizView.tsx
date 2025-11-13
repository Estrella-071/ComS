
import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import type { Problem, View } from '../types';
import { CodeBracketIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';

interface ShuffleQuizViewProps {
  setView: (view: View) => void;
}

function SegmentedControl<T extends string>({ options, value, onChange, layoutId }: {
  options: Array<{ label: string; value: T }>,
  value: T,
  onChange: (value: T) => void,
  layoutId: string,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="flex items-center space-x-1 rounded-lg bg-[var(--ui-bg)] p-1 w-full sm:w-auto">
      {options.map((option, i) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative flex-1 rounded-md px-3 py-1.5 text-center text-sm font-medium transition-colors`}
        >
          {value === option.value && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 z-0 cursor-grab rounded-md bg-[var(--accent-solid)] shadow-sm"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                  if (!containerRef.current) return;
                  const { width } = containerRef.current.getBoundingClientRect();
                  const optionWidth = width / options.length;
                  const newIndex = Math.round((info.offset.x + i * optionWidth) / optionWidth);
                  const clampedIndex = Math.max(0, Math.min(options.length - 1, newIndex));
                  onChange(options[clampedIndex].value);
              }}
              whileTap={{ cursor: 'grabbing' }}
            />
          )}
          <span className={`relative z-10 transition-colors ${value === option.value ? 'text-[var(--accent-solid-text)]' : 'text-[var(--text-secondary)]'}`}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export const ShuffleQuizView: React.FC<ShuffleQuizViewProps> = ({ setView }) => {
  const { t } = useTranslation();
  const { subjectData } = useAppContext();
  
  const problems = useMemo(() => subjectData?.problems || [], [subjectData]);

  const chapters = useMemo(() => {
    if (!problems) return [];
    const chapterSet = new Set(problems.map(p => p.chapter));
    // FIX: Explicitly type the sort callback parameters to resolve type inference issue.
    return Array.from(chapterSet).sort((a: string, b: string) => parseInt(a) - parseInt(b));
  }, [problems]);

  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [count, setCount] = useState<number>(20);
  const [quizMode, setQuizMode] = useState<'shuffled' | 'sequential'>('shuffled');

  const problemsByChapter = useMemo(() => {
    return problems.reduce<Record<string, Problem[]>>((acc, problem) => {
        const chapterKey = `${problem.chapter}`;
        if (!acc[chapterKey]) {
            acc[chapterKey] = [];
        }
        acc[chapterKey].push(problem);
        return acc;
    }, {});
  }, [problems]);

  const maxQuestions = useMemo(() => {
    if (selectedChapters.length === 0) return problems.length;
    return selectedChapters.reduce((total, ch) => total + (problemsByChapter[ch]?.length || 0), 0);
  }, [selectedChapters, problemsByChapter, problems.length]);
  
  React.useEffect(() => {
    const newMax = maxQuestions > 0 ? maxQuestions : 1;
    if (count > newMax) {
        setCount(newMax);
    }
     if (count === 0 && newMax > 0) {
        setCount(1);
    }
  }, [maxQuestions, count]);


  const handleToggleChapter = (chapter: string) => {
    setSelectedChapters(prev =>
      prev.includes(chapter) ? prev.filter(c => c !== chapter) : [...prev, chapter]
    );
  };
  
  const handleSelectAll = () => setSelectedChapters(chapters);
  const handleDeselectAll = () => setSelectedChapters([]);

  const startQuiz = () => {
    let availableProblems = problems;
    if (selectedChapters.length > 0) {
        availableProblems = problems.filter(p => selectedChapters.includes(p.chapter));
    }
    
    let quizProblems;
    if (quizMode === 'shuffled') {
        quizProblems = [...availableProblems].sort(() => Math.random() - 0.5).slice(0, count);
    } else {
        quizProblems = availableProblems.slice(0, count);
    }

    const title = selectedChapters.length > 0 && selectedChapters.length < chapters.length
        ? `${t('question_bank_quiz')} (${selectedChapters.map(c => `${t('chapter_short')}${c}${t('chapter_unit')}`).join(', ')})`
        : t('question_bank_quiz');

    setView({ 
        type: 'quiz', 
        id: `shuffle-${Date.now()}`,
        problems: quizProblems, 
        title, 
        startIndex: 0 
    });
  };
  
  if (!subjectData) return null;

  return (
    <div className="h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto flex items-center justify-center min-h-full py-8 px-4 sm:px-6 lg:p-8">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full glass-pane rounded-2xl p-6 md:p-8"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--accent-bg)] flex items-center justify-center flex-shrink-0">
                        <CodeBracketIcon className="w-7 h-7 text-[var(--accent-text)]" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">{t('quiz_settings')}</h1>
                        <p className="text-md text-[var(--text-secondary)] mt-1">{t('quiz_description')}</p>
                    </div>
                </div>
                
                <div className="space-y-6 mt-8">
                    {/* Quiz Mode */}
                    <SettingRow label={t('quiz_mode')}>
                         <SegmentedControl
                            options={[
                                { label: t('quiz_mode_shuffled'), value: 'shuffled' },
                                { label: t('quiz_mode_sequential'), value: 'sequential' }
                            ]}
                            value={quizMode}
                            onChange={(value) => setQuizMode(value)}
                            layoutId="quiz-mode-toggle"
                        />
                    </SettingRow>

                    {/* Number of Questions */}
                    <div>
                    <label htmlFor="question-count" className="block text-md font-medium text-[var(--text-secondary)] mb-3">{t('quiz_num_questions')} ({count} / {maxQuestions || problems.length})</label>
                    <div className="flex items-center gap-4">
                            <input
                                id="question-count"
                                type="range"
                                value={count}
                                max={maxQuestions || 1}
                                min="1"
                                disabled={(maxQuestions || 1) <= 1}
                                onChange={e => setCount(parseInt(e.target.value, 10))}
                                className="w-full cursor-pointer disabled:opacity-50"
                            />
                            <button 
                                onClick={() => setCount(maxQuestions)}
                                className="px-4 py-2 rounded-lg bg-[var(--ui-bg)] text-[var(--text-secondary)] text-sm font-semibold hover:bg-[var(--ui-bg-hover)] transition-colors"
                            >
                                {t('quiz_all_questions')}
                            </button>
                        </div>
                    </div>

                    {/* Chapters */}
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                            <h3 className="text-md font-medium text-[var(--text-secondary)]">{t('quiz_include_chapters')}</h3>
                            <div className="flex-shrink-0 space-x-2">
                                <button onClick={handleSelectAll} className="text-sm font-semibold bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] text-[var(--text-secondary)] px-3 py-1.5 rounded-md transition-colors">{t('select_all')}</button>
                                <button onClick={handleDeselectAll} className="text-sm font-semibold bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] text-[var(--text-secondary)] px-3 py-1.5 rounded-md transition-colors">{t('deselect_all')}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-48 overflow-y-auto p-3 bg-black/5 dark:bg-white/5 rounded-lg overscroll-contain">
                        {chapters.map(chapter => (
                            <button
                            key={chapter}
                            onClick={() => handleToggleChapter(chapter)}
                            className={`p-3 rounded-lg text-sm font-semibold transition-colors ${
                                selectedChapters.includes(chapter)
                                ? 'bg-[var(--accent-solid)] text-[var(--accent-solid-text)]'
                                : 'bg-[var(--bg-translucent)] text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)]'
                            }`}
                            >
                            {`${t('chapter')} ${chapter}${t('chapter_unit')}`}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                <button onClick={startQuiz} disabled={count === 0 || (maxQuestions === 0 && selectedChapters.length > 0)} className="w-full px-4 py-3 rounded-xl bg-[var(--accent-solid)] text-[var(--accent-solid-text)] font-semibold hover:bg-[var(--accent-solid-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {t('start_quiz')}
                </button>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

const SettingRow: React.FC<{label: string, children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-md font-medium text-[var(--text-secondary)] flex-shrink-0">{label}</span>
        <div className="flex items-center justify-start sm:justify-end w-full">
            {children}
        </div>
    </div>
);
