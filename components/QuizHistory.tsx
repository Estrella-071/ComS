
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { QuizResult, Problem } from '../types';
import { LOCAL_STORAGE_KEYS } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { CheckBadgeIcon, ClockIcon, XMarkIcon, CheckIcon, ChevronUpIcon } from './icons';
import type { View } from '../types';
import { allData } from '../data/subjects';
import { useAppContext } from '../contexts/AppContext';

interface QuizHistoryProps {
  setView: (view: View) => void;
}

export const QuizHistory: React.FC<QuizHistoryProps> = ({ setView }) => {
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null);
  const { t } = useTranslation();
  const { subject } = useAppContext();
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

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY);
      if (storedHistory) {
        const allHistory: QuizResult[] = JSON.parse(storedHistory);
        if (subject) {
            setHistory(allHistory.filter(r => r.subjectId === subject.id));
        } else {
            setHistory([]);
        }
      }
    } catch (error) {
      console.error("Failed to parse quiz history from localStorage", error);
    }
  }, [subject]);

  if (selectedResult) {
    return <QuizDetailView result={selectedResult} onBack={() => setSelectedResult(null)} setView={setView} />;
  }

  return (
    <div ref={contentRef} className="h-full overflow-y-auto px-4 sm:px-6 lg:p-8 relative">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 my-8">
                <div className="w-12 h-12 rounded-2xl glass-pane flex items-center justify-center">
                    <ClockIcon className="w-7 h-7 text-[var(--accent-text)]" />
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">{t('history_title')}</h1>
            </div>

            {history.length === 0 ? (
                <div className="text-center py-10 glass-pane p-4 rounded-2xl">
                    <p className="text-[var(--text-secondary)]">{t('history_no_quizzes')}</p>
                </div>
            ) : (
                <div className="space-y-4 pb-16">
                    {history.map(result => (
                        <motion.div
                            key={result.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="glass-pane p-4 rounded-2xl"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex-1 mb-4 sm:mb-0">
                                    <h2 className="font-bold text-[var(--text-primary)]">{result.quizTitle}</h2>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {new Date(result.date).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                    <div className="text-center">
                                        <p className="text-xs text-[var(--text-secondary)] uppercase font-semibold">{t('history_score')}</p>
                                        <p className="font-bold text-lg text-[var(--accent-text)]">{result.score} / {result.totalQuestions}</p>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedResult(result)}
                                        className="bg-[var(--ui-bg)] text-[var(--text-secondary)] font-semibold px-4 py-2 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors"
                                    >
                                        {t('history_view_details')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
        <AnimatePresence>
            {showBackToTop && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-6 left-6 w-14 h-14 bg-[var(--ui-bg)] rounded-full text-[var(--text-primary)] flex items-center justify-center shadow-lg z-[var(--z-fab)]"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Back to top"
                >
                    <ChevronUpIcon className="w-7 h-7" />
                </motion.button>
            )}
        </AnimatePresence>
    </div>
  );
};

const QuizDetailView: React.FC<{ result: QuizResult; onBack: () => void; setView: (view: View) => void }> = ({ result, onBack, setView }) => {
    const { t } = useTranslation();
    const [problemsById, setProblemsById] = useState<Record<string, Problem> | null>(null);

    useEffect(() => {
        const fetchProblems = async () => {
            const subjectLoader = allData[result.subjectId]?.loader;
            if (subjectLoader) {
                try {
                    const subjectData = await subjectLoader();
                    const problemMap = (subjectData.problems || []).reduce<Record<string, Problem>>((acc, p) => {
                        acc[p.id] = p;
                        return acc;
                    }, {});
                    setProblemsById(problemMap);
                } catch (error) {
                    console.error("Failed to load problems for quiz history", error);
                    setProblemsById({});
                }
            } else {
                setProblemsById({});
            }
        };
        fetchProblems();
    }, [result.subjectId]);

    const percentage = result.totalQuestions > 0 ? ((result.score / result.totalQuestions) * 100).toFixed(1) : 0;
    
    if (problemsById === null) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-[var(--text-secondary)]">Loading quiz details...</p>
            </div>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto h-full overflow-y-auto px-4 sm:px-6 lg:p-8">
            <button onClick={onBack} className="text-sm font-semibold text-[var(--accent-text)] my-6">&larr; {t('quiz_history')}</button>
            <div className="glass-pane p-6 rounded-2xl mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{result.quizTitle}</h1>
                        <p className="text-sm text-[var(--text-secondary)]">{new Date(result.date).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--success-text)]">
                        <CheckBadgeIcon className="w-8 h-8"/>
                        <span className="text-3xl font-bold">{percentage}%</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 pb-16">
                {result.answeredQuestions.map(ans => {
                    const problem = problemsById[ans.problemId];
                    if (!problem) return null;
                    const correctOption = problem.options.find(o => o.key === problem.answer);
                    const userOption = problem.options.find(o => o.key === ans.userAnswer);

                    return (
                        <div key={ans.problemId} className="glass-pane p-4 rounded-2xl">
                           <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2">{t('problem_header')} {problem.number}</p>
                           <p className="mb-4 text-[var(--text-primary)]">{problem.text_en}</p>
                           <div className="space-y-2">
                                <div className={`flex items-start gap-3 p-3 rounded-lg ${ans.isCorrect ? 'bg-[var(--success-bg)]' : 'bg-[var(--error-bg)]'}`}>
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${ans.isCorrect ? 'bg-[var(--success-solid-bg)] text-[var(--success-solid-text)]' : 'bg-[var(--error-solid-bg)] text-[var(--error-solid-text)]'}`}>
                                        {ans.isCorrect ? <CheckIcon className="w-3 h-3"/> : <XMarkIcon className="w-3 h-3"/>}
                                    </div>
                                    <p className="text-sm text-[var(--text-primary)]">
                                        <span className="font-semibold">{t('history_your_answer')}: </span>
                                        {userOption ? `(${ans.userAnswer.toUpperCase()}) ${userOption.text_en}` : 'Not answered'}
                                    </p>
                                </div>
                                {!ans.isCorrect && (
                                     <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--success-bg)]">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-[var(--success-solid-bg)] text-[var(--success-solid-text)]">
                                            <CheckIcon className="w-3 h-3"/>
                                        </div>
                                        <p className="text-sm text-[var(--text-primary)]">
                                            <span className="font-semibold">{t('history_correct_answer')}: </span>
                                            {`(${problem.answer.toUpperCase()}) ${correctOption?.text_en}`}
                                        </p>
                                    </div>
                                )}
                           </div>
                           <button onClick={() => setView({type: 'problem', id: problem.id})} className="text-xs text-[var(--accent-text)] mt-3 font-semibold hover:underline">
                                {t('show_explanation')} &rarr;
                           </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
