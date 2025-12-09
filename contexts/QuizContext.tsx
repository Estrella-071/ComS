import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import type { Problem, View, AnsweredQuestion, QuizResult } from '../types';
import { LOCAL_STORAGE_KEYS } from '../types';
import { useAppContext } from './AppContext';

interface QuizConfig {
  problems: Problem[];
  title: string;
  startIndex?: number;
}

interface QuizState extends QuizConfig {
  id: string;
}

interface QuizContextType {
  quizState: QuizState | null;
  answers: Map<string, string>;
  currentIndex: number;
  isFinished: boolean;
  startQuiz: (quizInfo: QuizConfig) => void;
  answerQuestion: (problemId: string, answer: string) => void;
  goToProblem: (index: number) => void;
  finishQuiz: () => void;
  restartQuiz: () => void;
  endQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Safe Storage Helper (Duplicated to avoid circular deps or complex refactoring, simple enough)
const safeStorage = {
    getItem: (key: string) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
      } catch (e) { return null; }
      return null;
    },
    setItem: (key: string, value: string) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
      } catch (e) { /* ignore */ }
    }
  };

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { subject } = useAppContext();

  const startQuiz = useCallback((quizInfo: QuizConfig) => {
    const newQuizId = `${quizInfo.title.replace(/\s+/g, '-')}-${Date.now()}`;
    const newQuizState = { ...quizInfo, id: newQuizId };

    if (quizState?.id !== newQuizId) {
        setQuizState(newQuizState);
        setAnswers(new Map());
        setCurrentIndex(quizInfo.startIndex || 0);
        setIsFinished(false);
    }
  }, [quizState]);
  
  const endQuiz = useCallback(() => {
    setQuizState(null);
  }, []);

  const answerQuestion = useCallback((problemId: string, answer: string) => {
    if (isFinished) return;
    setAnswers(prev => new Map(prev).set(problemId, answer));
  }, [isFinished]);

  const goToProblem = useCallback((index: number) => {
    if (quizState && index >= 0 && index < quizState.problems.length) {
      setCurrentIndex(index);
    }
  }, [quizState]);

  const finishQuiz = useCallback(() => {
    if (isFinished || !quizState || !subject) return;

    const score = Array.from(answers).reduce<number>((count, [id, answer]) => {
        const problem = quizState.problems.find(p => p.id === id);
        return (problem && problem.answer === answer) ? count + 1 : count;
    }, 0);

    const answeredQuestions: AnsweredQuestion[] = quizState.problems.map((p) => ({
      problemId: p.id,
      userAnswer: answers.get(p.id) || '',
      isCorrect: answers.get(p.id) === p.answer,
    }));

    const result: QuizResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      quizTitle: quizState.title,
      subjectId: subject.id,
      score,
      totalQuestions: quizState.problems.length,
      answeredQuestions,
    };

    try {
      const stored = safeStorage.getItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY);
      const history = stored ? JSON.parse(stored) : [];
      history.unshift(result);
      safeStorage.setItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history.slice(0, 20)));
    } catch (error) {
      console.error("Failed to save quiz history", error);
    }

    setIsFinished(true);
  }, [isFinished, quizState, answers, subject]);

  const restartQuiz = useCallback(() => {
    if (!quizState) return;
    setCurrentIndex(quizState.startIndex || 0);
    setAnswers(new Map());
    setIsFinished(false);
  }, [quizState]);

  const value = {
    quizState,
    answers,
    currentIndex,
    isFinished,
    startQuiz,
    answerQuestion,
    goToProblem,
    finishQuiz,
    restartQuiz,
    endQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};