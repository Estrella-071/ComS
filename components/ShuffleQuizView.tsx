
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import type { Problem, View } from '../types';
import { CodeBracketIcon, PlayIcon, ArrowPathIcon, CheckIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { SegmentedControl } from './common/SegmentedControl';
import { useQuiz } from '../contexts/QuizContext';

interface ShuffleQuizViewProps {
  setView: (view: View) => void;
}

export const ShuffleQuizView: React.FC<ShuffleQuizViewProps> = ({ setView }) => {
  const { t } = useTranslation();
  const { subjectData } = useAppContext();
  const { quizState, updateQuiz, startQuiz: startNewQuiz } = useQuiz();
  
  const problems = useMemo(() => subjectData?.problems || [], [subjectData]);

  const chapters = useMemo(() => {
    if (!problems) return [];
    const chapterSet = new Set(problems.map(p => p.chapter));
    return Array.from(chapterSet).sort((a: string, b: string) => parseInt(a) - parseInt(b));
  }, [problems]);

  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [count, setCount] = useState<number>(20);
  const [quizMode, setQuizMode] = useState<'shuffled' | 'sequential'>('shuffled');

  // Pre-fill from active quiz if available (Change Scope feature)
  useEffect(() => {
    if (quizState && quizState.problems.length > 0) {
        // Infer chapters from current problems
        const currentChapters = new Set(quizState.problems.map(p => p.chapter));
        setSelectedChapters(Array.from(currentChapters));
        setCount(quizState.problems.length);
        // Note: Detecting 'shuffled' vs 'sequential' from problems list is hard, defaulting to shuffled is safer or keeping user state
    }
  }, [quizState]);

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
  
  useEffect(() => {
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

  const getNewProblems = () => {
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
    return quizProblems;
  };

  const getNewTitle = () => {
    return selectedChapters.length > 0 && selectedChapters.length < chapters.length
        ? `${t('start_quiz_session')} (${selectedChapters.map(c => `${t('chapter_short')}${c}${t('chapter_unit')}`).join(', ')})`
        : t('start_quiz_session');
  }

  const handleStartNew = () => {
    const quizProblems = getNewProblems();
    const title = getNewTitle();
    const quizId = `shuffle-${Date.now()}`;

    startNewQuiz({ 
        id: quizId,
        problems: quizProblems, 
        title, 
        startIndex: 0 
    });

    setView({ 
        type: 'quiz', 
        id: quizId,
        problems: quizProblems,
        title,
        startIndex: 0
    });
  };

  const handleUpdateAndContinue = () => {
      const quizProblems = getNewProblems();
      const title = getNewTitle();
      updateQuiz(quizProblems, title);
      resumeQuiz();
  };
  
  const resumeQuiz = () => {
      if (quizState) {
          setView({
              type: 'quiz',
              id: quizState.id,
              problems: quizState.problems,
              title: quizState.title,
              startIndex: 0 
          });
      }
  };
  
  if (!subjectData) return null;

  return (
    <div className="h-full overflow-y-auto pt-20 lg:pt-0">
        <div className="max-w-3xl mx-auto flex items-center justify-center min-h-full py-8 px-4 sm:px-6 lg:p-8">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full glass-pane rounded-2xl p-6 md:p-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--accent-bg)] flex items-center justify-center flex-shrink-0">
                            <CodeBracketIcon className="w-7 h-7 text-[var(--accent-text)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">{t('quiz_settings')}</h1>
                            <p className="text-md text-[var(--text-secondary)] mt-1">{t('quiz_description')}</p>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <SettingRow label={t('quiz_mode')}>
                         <SegmentedControl
                            options={[
                                { label: t('quiz_mode_shuffled'), value: 'shuffled' },
                                { label: t('quiz_mode_sequential'), value: 'sequential' }
                            ]}
                            value={quizMode}
                            onChange={(value) => setQuizMode(value)}
                        />
                    </SettingRow>

                    <SettingRow label={t('quiz_num_questions')}>
                        <div className="flex items-center gap-2 w-full">
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
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold w-12 text-center tabular-nums">{count} / {maxQuestions || problems.length}</span>
                                <button 
                                    onClick={() => setCount(maxQuestions)}
                                    className="px-3 py-2 rounded-lg bg-[var(--ui-bg)] text-[var(--text-secondary)] text-xs font-semibold hover:bg-[var(--ui-bg-hover)] transition-colors"
                                >
                                    {t('quiz_all_questions')}
                                </button>
                            </div>
                        </div>
                    </SettingRow>

                    <div>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                            <h3 className="text-md font-medium text-[var(--text-primary)]">{t('quiz_include_chapters')}</h3>
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

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    {quizState ? (
                        <>
                            <button 
                                onClick={resumeQuiz}
                                className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-[var(--ui-border)] text-[var(--text-secondary)] font-semibold hover:bg-[var(--ui-bg)] transition-colors"
                            >
                                Cancel (Resume)
                            </button>
                            <button 
                                onClick={handleStartNew} 
                                disabled={count === 0 || (maxQuestions === 0 && selectedChapters.length > 0)} 
                                className="flex-1 px-4 py-3 rounded-xl bg-[var(--error-bg)] text-[var(--error-text)] border border-[var(--error-border)] font-semibold hover:bg-[var(--error-border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Restart New
                            </button>
                            <button 
                                onClick={handleUpdateAndContinue} 
                                disabled={count === 0 || (maxQuestions === 0 && selectedChapters.length > 0)} 
                                className="flex-[2] px-4 py-3 rounded-xl bg-[var(--accent-solid)] text-[var(--accent-solid-text)] font-semibold hover:bg-[var(--accent-solid-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <ArrowPathIcon className="w-5 h-5"/> Update & Continue
                            </button>
                        </>
                    ) : (
                         <button 
                            onClick={handleStartNew} 
                            disabled={count === 0 || (maxQuestions === 0 && selectedChapters.length > 0)} 
                            className="w-full px-4 py-3 rounded-xl bg-[var(--accent-solid)] text-[var(--accent-solid-text)] font-semibold hover:bg-[var(--accent-solid-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <PlayIcon className="w-5 h-5"/> {t('start_quiz')}
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    </div>
  );
};

const SettingRow: React.FC<{label: string, children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label className="text-md font-medium text-[var(--text-primary)] sm:w-1/3 flex-shrink-0">{label}</label>
        <div className="flex items-center justify-start sm:justify-start w-full">
            {children}
        </div>
    </div>
);
