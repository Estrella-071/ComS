import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizResult, Problem } from '../types';
import { problems } from '../data/problems';
import { useTranslation } from '../hooks/useTranslation';
import { CheckBadgeIcon, ClockIcon, XMarkIcon, CheckIcon } from './icons';
import type { View } from '../App';

interface QuizHistoryProps {
  setView: (view: View) => void;
}

export const QuizHistory: React.FC<QuizHistoryProps> = ({ setView }) => {
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('quizHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse quiz history from localStorage", error);
    }
  }, []);

  if (selectedResult) {
    return <QuizDetailView result={selectedResult} onBack={() => setSelectedResult(null)} setView={setView} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[var(--bg-translucent)] backdrop-blur-xl flex items-center justify-center border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
          <ClockIcon className="w-7 h-7 text-[var(--accent-text)]" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">{t('history_title')}</h1>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-10 bg-[var(--bg-translucent)] backdrop-blur-xl p-4 rounded-2xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
          <p className="text-[var(--text-secondary)]">{t('history_no_quizzes')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map(result => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--bg-translucent)] backdrop-blur-xl p-4 rounded-2xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)]"
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
  );
};

const QuizDetailView: React.FC<{ result: QuizResult; onBack: () => void; setView: (view: View) => void }> = ({ result, onBack, setView }) => {
    const { t } = useTranslation();
    const problemsById = useMemo(() => {
        return problems.reduce<Record<string, Problem>>((acc, p) => {
            acc[p.id] = p;
            return acc;
        }, {});
    }, []);

    const percentage = result.totalQuestions > 0 ? ((result.score / result.totalQuestions) * 100).toFixed(1) : 0;

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="text-sm font-semibold text-[var(--accent-text)] mb-6">&larr; {t('quiz_history')}</button>
            <div className="bg-[var(--bg-translucent)] backdrop-blur-xl p-6 rounded-2xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{result.quizTitle}</h1>
                        <p className="text-sm text-[var(--text-secondary)]">{new Date(result.date).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-500">
                        <CheckBadgeIcon className="w-8 h-8"/>
                        <span className="text-3xl font-bold">{percentage}%</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {result.answeredQuestions.map(ans => {
                    const problem = problemsById[ans.problemId];
                    if (!problem) return null;
                    const correctOption = problem.options.find(o => o.key === problem.answer);
                    const userOption = problem.options.find(o => o.key === ans.userAnswer);

                    return (
                        <div key={ans.problemId} className="bg-[var(--bg-translucent)] backdrop-blur-xl p-4 rounded-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
                           <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2">{t('problem_header')} {problem.number}</p>
                           <p className="mb-4 text-[var(--text-primary)]">{problem.text_en}</p>
                           <div className="space-y-2">
                                <div className={`flex items-start gap-3 p-2 rounded-lg ${ans.isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white ${ans.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {ans.isCorrect ? <CheckIcon className="w-3 h-3"/> : <XMarkIcon className="w-3 h-3"/>}
                                    </div>
                                    <p className="text-sm text-[var(--text-primary)]">
                                        <span className="font-semibold">{t('history_your_answer')}: </span>
                                        {userOption ? `(${ans.userAnswer.toUpperCase()}) ${userOption.text_en}` : 'Not answered'}
                                    </p>
                                </div>
                                {!ans.isCorrect && (
                                     <div className="flex items-start gap-3 p-2 rounded-lg bg-green-500/10">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-green-500 text-white">
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