
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Glossary } from './components/Glossary';
import { QuizView } from './components/QuizView';
import { Home } from './components/Home';
import { Overview } from './components/Overview';
import { ProblemSolver } from './components/ProblemSolver';
import { QuizHistory } from './components/QuizHistory';
import { TextbookView } from './components/TextbookView';
import { ShuffleQuizView } from './components/ShuffleQuizView';
import { BookmarksView } from './components/BookmarksView';
import { SubjectSelection } from './components/SubjectSelection';
import { SearchModal } from './components/SearchModal';
import type { View, QuizResult, AnsweredQuestion } from './types';
import { LOCAL_STORAGE_KEYS } from './types';
import { useTranslation } from './hooks/useTranslation';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { useAppContext } from './contexts/AppContext';
import { TopBar } from './components/TopBar';

const App: React.FC = () => {
  const { subject } = useAppContext();

  return (
    <div className="relative h-screen overflow-hidden lg:p-6">
      <BackgroundCanvas />
      <AnimatePresence mode="wait">
        {!subject ? (
            <motion.div
              key="subject-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <SubjectSelection />
            </motion.div>
          ) : (
            <motion.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <MainApp />
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  );
};

const MainApp: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'home' });
  const [history, setHistory] = useState<View[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { subject, subjectData } = useAppContext();
  const [direction, setDirection] = useState(0);

  // Lifted quiz state
  const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Map<string, string>>(new Map());
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  
  // Lifted Table of Contents state
  const [activeTocId, setActiveTocId] = useState<string | null>(null);

  const navigateTo = (newView: View, navDirection: number) => {
    setDirection(navDirection);
    
    // Only reset quiz state if navigating to a *new* quiz
    if (newView.type === 'quiz') {
      if (currentQuizId !== newView.id) {
        setQuizCurrentIndex(newView.startIndex || 0);
        setQuizAnswers(new Map());
        setIsQuizFinished(false);
        setCurrentQuizId(newView.id);
      }
    }

    setView(newView);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    setActiveTocId(null);
  };
  
  const handleNavigate = (newView: View) => {
    setHistory(prev => [...prev, view]);
    navigateTo(newView, 1);
    setIsSearchOpen(false);
  };

  const handleResetNavigate = (newView: View) => {
    setHistory([]);
    navigateTo(newView, 0);
    setIsSearchOpen(false);
  };
  
  const handleBack = () => {
    if (history.length > 0) {
      const lastView = history[history.length - 1];
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      navigateTo(lastView, -1);
    }
  };
  
  const getPageTitle = () => {
    if (!subject || !subjectData) return '';
    
    switch (view.type) {
      case 'overview':
        return t('all_questions');
      case 'textbook':
        const chapter = subjectData.chapterList.find(c => c.id === view.chapterId);
        return chapter ? chapter.title.zh : t('home');
      case 'quiz':
        return view.title;
      case 'glossary':
        return t('glossary');
      case 'problem':
        const problem = subjectData.problems.find(p => p.id === view.id);
        return problem ? `${t('problem_header')} ${problem.number}` : t('home');
      case 'history':
        return t('quiz_history');
      case 'question_bank_quiz':
        return t('question_bank_quiz');
      case 'bookmarks':
        return t('bookmarks_title');
      case 'home':
      default:
        return t('home');
    }
  };

  const handleAnswer = (problemId: string, answer: string) => {
    if (isQuizFinished) return;
    const newAnswers = new Map(quizAnswers);
    newAnswers.set(problemId, answer);
    setQuizAnswers(newAnswers);
  };

  const handleGoToProblem = (index: number) => {
    if (view.type === 'quiz' && index >= 0 && index < view.problems.length) {
      setQuizCurrentIndex(index);
    }
  };

  const handleFinishQuiz = useCallback(() => {
    if (isQuizFinished || view.type !== 'quiz' || view.problems.length === 0 || !subject) return;
    
    // FIX: Use a generic on `reduce` to explicitly set the accumulator's type to number and resolve a type inference issue.
    const score = Array.from(quizAnswers).reduce<number>((count, [id, answer]) => {
        const problem = view.problems.find(p => p.id === id);
        return problem && problem.answer === answer ? count + 1 : count;
    }, 0);

    const answeredQuestions: AnsweredQuestion[] = view.problems.map((p) => ({
      problemId: p.id,
      userAnswer: quizAnswers.get(p.id) || '',
      isCorrect: quizAnswers.get(p.id) === p.answer,
    }));

    const result: QuizResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      quizTitle: view.title,
      subjectId: subject.id,
      score,
      totalQuestions: view.problems.length,
      answeredQuestions,
    };

    try {
      const history = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY) || '[]');
      history.unshift(result);
      localStorage.setItem(LOCAL_STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history.slice(0, 20)));
    } catch (error) {
      console.error("Failed to save quiz history", error);
    }
    setIsQuizFinished(true);
  }, [isQuizFinished, view, quizAnswers, subject]);
  
  const handleRestartQuiz = () => {
    if (view.type !== 'quiz') return;
    setQuizCurrentIndex(view.startIndex || 0);
    setQuizAnswers(new Map());
    setIsQuizFinished(false);
  };

  const quizStateForSidebar = useMemo(() => {
    if (view.type === 'quiz' && currentQuizId === view.id) {
      // FIX: Use a generic on `reduce` to explicitly set the accumulator's type to number and resolve a potential type inference issue.
      const score = Array.from(quizAnswers).reduce<number>((count, [id, answer]) => {
          const problem = view.problems.find(p => p.id === id);
          return problem && problem.answer === answer ? count + 1 : count;
      }, 0);

      return {
        problems: view.problems,
        currentIndex: quizCurrentIndex,
        answers: quizAnswers,
        isFinished: isQuizFinished,
        score: score,
      };
    }
    return undefined;
  }, [view, quizCurrentIndex, quizAnswers, isQuizFinished, currentQuizId]);

  const renderView = () => {
    switch (view.type) {
      case 'overview':
        return <Overview setView={handleNavigate} />;
      case 'textbook':
        return <TextbookView chapterId={view.chapterId} setView={handleNavigate} setActiveTocId={setActiveTocId} />;
      case 'quiz':
        return <QuizView 
                  key={view.id} 
                  problems={view.problems} 
                  title={view.title} 
                  setView={handleNavigate} 
                  onReturnHome={handleResetNavigate}
                  isSidebarOpen={isSidebarOpen}
                  currentIndex={quizCurrentIndex}
                  answers={quizAnswers}
                  isFinished={isQuizFinished}
                  onAnswer={handleAnswer}
                  onGoToProblem={handleGoToProblem}
                  onFinish={handleFinishQuiz}
                  onRestart={handleRestartQuiz}
                />;
      case 'glossary':
        return <Glossary setView={handleNavigate} />;
      case 'problem':
        return <ProblemSolver id={view.id} setView={handleNavigate} isSidebarOpen={isSidebarOpen} />;
      case 'history':
        return <QuizHistory setView={handleNavigate} />;
      case 'question_bank_quiz':
        return <ShuffleQuizView setView={handleNavigate} />;
      case 'bookmarks':
        return <BookmarksView setView={handleNavigate} />;
      case 'home':
      default:
        return <Home setView={handleNavigate} />;
    }
  };
  
  const getAnimationKey = () => {
    if (view.type === 'quiz') return view.id;
    if (view.type === 'problem') return view.id; // Animate between problems
    if (view.type === 'textbook') return view.chapterId;
    return view.type;
  }
  
  const pageVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 15 : (direction < 0 ? -15 : 0),
      y: direction === 0 ? 10 : 0,
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -15 : (direction < 0 ? 15 : 0),
      y: direction === 0 ? -10 : 0,
    }),
  };

  const pageTitle = getPageTitle();

  return (
    <div className="h-full">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/30 z-[var(--z-sidebar-backdrop)]"
          />
        )}
      </AnimatePresence>
      
      <Sidebar 
        view={view} 
        onNavigate={handleNavigate}
        onResetNavigate={handleResetNavigate}
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        quizState={quizStateForSidebar}
        onGoToQuizProblem={handleGoToProblem}
        activeTocId={activeTocId}
      />

      <div className="relative h-full flex flex-col overflow-hidden lg:glass-pane lg:rounded-2xl lg:ml-80">
        <TopBar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            pageTitle={pageTitle}
            showBackButton={history.length > 0}
            onBack={handleBack}
            onOpenSearch={() => setIsSearchOpen(true)}
        />
        <main className="flex-1 overflow-hidden" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={getAnimationKey()}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="h-full pt-16 lg:pt-0"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <AnimatePresence>
        {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} onNavigate={handleNavigate} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
