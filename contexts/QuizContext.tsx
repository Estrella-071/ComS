
import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import type { Problem, View } from '../types';

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
  startQuiz: (quizInfo: QuizConfig, onNavigate: (view: View) => void) => void;
  answerQuestion: (problemId: string, answer: string) => void;
  goToProblem: (index: number) => void;
  finishQuiz: () => void;
  restartQuiz: () => void;
  endQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const startQuiz = useCallback((quizInfo: QuizConfig, onNavigate: (view: View) => void) => {
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
    if (isFinished || !quizState) return;
    setIsFinished(true);
  }, [isFinished, quizState]);

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
