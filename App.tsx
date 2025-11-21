
import React, { useState, useMemo } from 'react';
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
import { ProgrammingView } from './components/ProgrammingView';
import { ExerciseSolver } from './components/ExerciseSolver';
import { SubjectSelection } from './components/SubjectSelection';
import { SearchModal } from './components/SearchModal';
import { Settings } from './components/ReadingSettings'; // Renamed component but file kept
import type { View } from './types';
import { useTranslation } from './hooks/useTranslation';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { useAppContext } from './contexts/AppContext';
import { QuizProvider, useQuiz } from './contexts/QuizContext';
import { Bars3Icon, XMarkIcon, ArrowUturnLeftIcon, PencilSquareIcon, HomeIcon } from './components/icons';
import { TableOfContentsDropdown } from './components/TableOfContentsDropdown';

const App: React.FC = () => {
  const { subject, isSubjectLoading } = useAppContext();

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
          ) : isSubjectLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="text-lg font-semibold text-[var(--text-secondary)]">Loading...</div>
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
              <QuizProvider>
                <MainApp />
              </QuizProvider>
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { t } = useTranslation();
  const { 
      subject, 
      subjectData, 
      setSubject,
      readingSettings, 
      theme, 
      setTheme, 
      setFontSize, 
      setLineHeight, 
      setPageWidth, 
      setReadTheme, 
      setInitialMode, 
      setDisplayMode
  } = useAppContext();
  const { startQuiz, endQuiz } = useQuiz();
  const [direction, setDirection] = useState(0);
  
  // Lifted Table of Contents state
  const [activeTocId, setActiveTocId] = useState<string | null>(null);

  const navigateTo = (newView: View, navDirection: number) => {
    setDirection(navDirection);
    
    if (newView.type === 'quiz') {
      startQuiz({ 
        problems: newView.problems, 
        title: newView.title, 
        startIndex: newView.startIndex || 0 
      });
    } else {
      endQuiz(); // End any active quiz if navigating away
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

  const chapterNumberMatch = view.type === 'textbook' ? view.chapterId.match(/\d+/) : null;
  const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : null;

  const chapterProblems = useMemo(() => {
    if (!subjectData || !chapterNumber) return [];
    return subjectData.problems.filter(p => p.chapter === chapterNumber);
  }, [subjectData, chapterNumber]);

  const handleStartChapterQuiz = () => {
    if (view.type !== 'textbook' || !chapterNumber || chapterProblems.length === 0) return;
    
    handleNavigate({ 
        type: 'quiz',
        id: `chapter-${chapterNumber}-${Date.now()}`,
        problems: chapterProblems, 
        title: `${t('chapter')} ${chapterNumber}${t('chapter_unit')}`, 
        startIndex: 0 
    });
  };
  
  const renderView = () => {
    switch (view.type) {
      case 'overview':
        return <Overview setView={handleNavigate} />;
      case 'textbook':
        return <TextbookView chapterId={view.chapterId} setView={handleNavigate} setActiveTocId={setActiveTocId} />;
      case 'quiz':
        return <QuizView 
                  key={view.id} 
                  onReturnHome={handleResetNavigate}
                  isSidebarOpen={isSidebarOpen}
                />;
      case 'glossary':
        return <Glossary setView={handleNavigate} />;
      case 'problem':
        return <ProblemSolver id={view.id} setView={handleNavigate} isSidebarOpen={isSidebarOpen} />;
      case 'exercise':
        return <ExerciseSolver id={view.id} setView={handleNavigate} isSidebarOpen={isSidebarOpen} />;
      case 'programming':
        return <ProgrammingView setView={handleNavigate} />;
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
    if (view.type === 'problem') return view.id;
    if (view.type === 'exercise') return view.id;
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

  return (
    <div className="h-full">
      {/* Floating Header / Navigation Controls */}
      <div className="absolute top-4 left-4 z-[var(--z-fab)] flex flex-col items-start gap-2 pointer-events-none">
        {/* Container for sidebar toggle and navigation buttons */}
        <div className="flex items-center gap-2 pointer-events-auto p-1 rounded-full transition-colors duration-300">
             {/* Main Toggle */}
            <motion.button
                onClick={() => setIsSidebarOpen(o => !o)}
                className="w-12 h-12 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center shadow-lg hover:bg-[var(--accent-solid-hover)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
            >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={isSidebarOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                  </motion.div>
                </AnimatePresence>
            </motion.button>
            
            {/* Additional Controls (Back / Home) */}
            <AnimatePresence>
              {history.length > 0 && (
                  <motion.button
                      key="back"
                      onClick={handleBack}
                      className="h-12 px-4 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg hover:bg-[var(--accent-solid-hover)] transition-colors"
                      initial={{ scale: 0.8, opacity: 0, x: -20 }}
                      animate={{ scale: 1, opacity: 1, x: 0 }}
                      exit={{ scale: 0.8, opacity: 0, x: -20 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={t('go_back')}
                  >
                      <ArrowUturnLeftIcon className="w-5 h-5" />
                      <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">{t('go_back')}</span>
                  </motion.button>
              )}
              
              {isSidebarOpen && (
                <motion.button
                    key="home"
                    onClick={() => setSubject(null)}
                    className="h-12 px-4 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg hover:bg-[var(--accent-solid-hover)] transition-colors"
                    initial={{ scale: 0.8, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.8, opacity: 0, x: -20 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={t('change_subject')}
                >
                    <HomeIcon className="w-5 h-5" />
                    <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">{t('change_subject')}</span>
                </motion.button>
              )}
            </AnimatePresence>
        </div>

        {/* Textbook View Controls Stack (TOC, etc.) */}
        <AnimatePresence>
            {view.type === 'textbook' && !isSidebarOpen && (
              <motion.div
                  className="flex flex-col items-start gap-3 pointer-events-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
              >
                {subject?.type === 'quiz' && chapterProblems.length > 0 && chapterNumber && (
                    <motion.button 
                        onClick={handleStartChapterQuiz}
                        className="h-12 px-5 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`${t('practice_questions_for_chapter')} ${chapterNumber}`}
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                        <span className="text-sm font-semibold whitespace-nowrap">{t('practice_questions_for_chapter')}</span>
                    </motion.button>
                )}
                <TableOfContentsDropdown 
                    chapterId={view.chapterId} 
                    activeTocId={activeTocId} 
                />
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/30 z-[var(--z-sidebar-backdrop)] backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      
      <Sidebar 
        view={view} 
        onNavigate={handleNavigate}
        onResetNavigate={handleResetNavigate}
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeTocId={activeTocId}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <div className={`relative h-full flex flex-col overflow-hidden lg:glass-pane lg:rounded-2xl transition-[margin-left] duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
        <main className="flex-1 overflow-hidden" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={getAnimationKey()}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Global Settings FAB */}
        <div className="absolute bottom-6 right-6 z-[var(--z-fab)]">
            <Settings 
              isOpen={isSettingsOpen}
              setIsOpen={setIsSettingsOpen}
              view={view}
              settings={readingSettings}
              setters={{
                setFontSize,
                setLineHeight,
                setPageWidth,
                setReadTheme,
                setInitialMode,
                setDisplayMode,
              }}
              theme={theme}
              setTheme={setTheme}
            />
        </div>
      </div>
      
      <AnimatePresence>
        {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} onNavigate={handleNavigate} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
