
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Glossary } from './Glossary';
import { QuizView } from './QuizView';
import { Home } from './Home';
import { Overview } from './Overview';
import { ProblemSolver } from './ProblemSolver';
import { QuizHistory } from './QuizHistory';
import { TextbookView } from './TextbookView';
import { ShuffleQuizView } from './ShuffleQuizView';
import { BookmarksView } from './BookmarksView';
import { ProgrammingView } from './ProgrammingView';
import { ExerciseSolver } from './ExerciseSolver';
import { SearchModal } from './SearchModal';
import { Settings } from './ReadingSettings';
import type { View } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { useQuiz } from '../contexts/QuizContext';
import { Bars3Icon, XMarkIcon, ArrowUturnLeftIcon, HomeIcon, PlayIcon, BookOpenIcon, ArrowPathIcon } from './icons';
import { TableOfContentsDropdown } from './TableOfContentsDropdown';

// Wrapper to keep TextbookView and QuizView mounted simultaneously for a chapter
const PersistentChapterWrapper: React.FC<{
    chapterId: string;
    initialMode: 'reading' | 'quiz';
    onNavigate: (view: View) => void;
    setView: (view: View) => void;
    isSidebarOpen: boolean;
    setActiveTocId: (id: string | null) => void;
    activeTocId: string | null;
    onToggleMode: () => void;
}> = ({ chapterId, initialMode, onNavigate, setView, isSidebarOpen, setActiveTocId, activeTocId, onToggleMode }) => {
    const { t } = useTranslation();
    const { subjectData, language } = useAppContext();
    const { startQuiz, quizState } = useQuiz();
    
    // Internal mode state to switch without unmounting
    const [mode, setMode] = useState<'reading' | 'quiz'>(initialMode);

    // Sync if the parent view changes (e.g. user clicked a new chapter from sidebar)
    useEffect(() => {
        setMode(initialMode);
    }, [chapterId, initialMode]);

    // Ensure quiz is initialized ONLY when we switch to quiz mode for this chapter
    useEffect(() => {
        if (subjectData && mode === 'quiz') {
             const chapterNum = chapterId.replace(/\D/g, '');
             const problems = subjectData.problems.filter(p => p.chapter === chapterNum);
             const chapterInfo = subjectData.chapterList.find(c => c.id === chapterId);
             const title = chapterInfo ? chapterInfo.title[language] : `${t('chapter')} ${chapterNum}`;
             
             // Check if we need to start a new quiz for this chapter
             // Only start if quizState doesn't exist OR if it's for a different chapter/context
             if (problems.length > 0 && quizState?.chapterId !== chapterId) {
                 startQuiz({
                    problems,
                    title,
                    startIndex: 0,
                    chapterId
                 });
             }
        }
    }, [mode, chapterId, subjectData, language, startQuiz, t, quizState?.chapterId]);

    return (
        <div className="relative w-full h-full overflow-hidden">
             <div 
                className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${mode === 'reading' ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ zIndex: mode === 'reading' ? 1 : 0 }}
             >
                 <TextbookView chapterId={chapterId} setView={setView} setActiveTocId={setActiveTocId} />
             </div>
             <div 
                className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${mode === 'reading' ? 'translate-x-full' : 'translate-x-0'}`}
                style={{ zIndex: mode === 'quiz' ? 1 : 0 }}
             >
                 <QuizView onReturnHome={setView} isSidebarOpen={isSidebarOpen} />
             </div>
        </div>
    );
}

export const MainLayout: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'home' });
  const [history, setHistory] = useState<View[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  const { t } = useTranslation();
  const { setSubject, subjectData, language } = useAppContext();
  const { endQuiz, startQuiz, quizState } = useQuiz();
  const [direction, setDirection] = useState(0);
  
  const [activeTocId, setActiveTocId] = useState<string | null>(null);

  // Initialize standalone quizzes (Shuffle / Bookmarks)
  useEffect(() => {
    if (view.type === 'quiz' && !view.chapterId && view.problems) {
         if (quizState?.id !== view.id) {
             startQuiz({
                 id: view.id,
                 problems: view.problems,
                 title: view.title,
                 startIndex: view.startIndex || 0
             });
         }
    }
  }, [view, quizState?.id, startQuiz]);

  const navigateTo = (newView: View, navDirection: number) => {
    setDirection(navDirection);
    if (newView.type !== 'quiz' && newView.type !== 'textbook') {
        // endQuiz(); 
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

  // Check if we are in a "Chapter Context" (Textbook or Quiz for a specific chapter)
  const isChapterContext = (view.type === 'textbook' || (view.type === 'quiz' && !!view.chapterId));
  const currentChapterId = view.type === 'textbook' ? view.chapterId : (view.type === 'quiz' ? view.chapterId : null);

  const canSwitchMode = useMemo(() => {
      if (!currentChapterId || !subjectData) return false;
      const chapterNum = currentChapterId.replace(/\D/g, '');
      const hasProblems = subjectData.problems.some(p => p.chapter === chapterNum);
      const chapterExists = subjectData.chapterList.some(c => c.id === currentChapterId && !c.disabled);
      
      if (view.type === 'quiz') return chapterExists;
      if (view.type === 'textbook') return hasProblems;
      
      return false;
  }, [currentChapterId, subjectData, view.type]);

  const handleToggleMode = () => {
      if (!currentChapterId || !subjectData) return;
      
      if (view.type === 'textbook') {
          // Switch to Quiz
          const chapterNumber = currentChapterId.replace(/\D/g, '');
          const problems = subjectData.problems.filter(p => p.chapter === chapterNumber);
          const chapterInfo = subjectData.chapterList.find(c => c.id === currentChapterId);
          const title = chapterInfo ? chapterInfo.title[language] : `${t('chapter')} ${chapterNumber}`;

          navigateTo({
              type: 'quiz',
              id: `chapter-${chapterNumber}-quiz-${Date.now()}`,
              problems,
              title,
              startIndex: 0,
              chapterId: currentChapterId
          }, 0);
      } else if (view.type === 'quiz') {
          // Switch to Textbook
          navigateTo({
              type: 'textbook',
              chapterId: currentChapterId
          }, 0);
      }
  };

  const renderView = () => {
      if (isChapterContext && currentChapterId) {
          return (
              <PersistentChapterWrapper
                  key={currentChapterId} // Remount if chapter changes, but persist if mode changes
                  chapterId={currentChapterId}
                  initialMode={view.type === 'textbook' ? 'reading' : 'quiz'}
                  onNavigate={handleNavigate}
                  setView={handleNavigate}
                  isSidebarOpen={isSidebarOpen}
                  setActiveTocId={setActiveTocId}
                  activeTocId={activeTocId}
                  onToggleMode={handleToggleMode}
              />
          );
      }

    switch (view.type) {
      case 'overview':
        return <Overview setView={handleNavigate} />;
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
      case 'quiz':
        return <QuizView onReturnHome={handleNavigate} isSidebarOpen={isSidebarOpen} />;
      case 'bookmarks':
        return <BookmarksView setView={handleNavigate} />;
      case 'home':
      default:
        return <Home setView={handleNavigate} />;
    }
  };
  
  const getAnimationKey = () => {
    if (isChapterContext && currentChapterId) return currentChapterId;
    if (view.type === 'problem') return view.id;
    if (view.type === 'exercise') return view.id;
    return view.type;
  }
  
  const pageVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 20 : (direction < 0 ? -20 : 0),
      y: direction === 0 ? 10 : 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 400, 
        damping: 35,
        mass: 0.8
      }
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 400, 
        damping: 35,
        mass: 0.8
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -20 : (direction < 0 ? 20 : 0),
      y: direction === 0 ? -10 : 0,
      transition: { duration: 0.15, ease: 'easeIn' as const }
    }),
  };

  return (
    <div className="h-full">
      {/* Top Floating Navigation Bar */}
      <div className="absolute top-3 left-4 right-4 z-[var(--z-fab)] flex justify-between items-start pointer-events-none">
        
        {/* Left Side Controls */}
        <div className="flex flex-col items-start gap-2 pointer-events-auto">
            <div className="flex items-center gap-2 p-1 rounded-full transition-colors duration-300">
                <motion.button
                    onClick={() => setIsSidebarOpen(o => !o)}
                    className="w-10 h-10 md:w-12 md:h-12 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center shadow-lg hover:bg-[var(--accent-solid-hover)] transition-colors"
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
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                      >
                        {isSidebarOpen ? <XMarkIcon className="w-5 h-5 md:w-6 md:h-6" /> : <Bars3Icon className="w-5 h-5 md:w-6 md:h-6" />}
                      </motion.div>
                    </AnimatePresence>
                </motion.button>
                
                <AnimatePresence>
                  {history.length > 0 && (
                      <motion.button
                          key="back"
                          onClick={handleBack}
                          className="h-10 md:h-12 px-3 md:px-4 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg hover:bg-[var(--accent-solid-hover)] transition-colors"
                          initial={{ scale: 0.8, opacity: 0, x: -15 }}
                          animate={{ scale: 1, opacity: 1, x: 0 }}
                          exit={{ scale: 0.8, opacity: 0, x: -15 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={t('go_back')}
                      >
                          <ArrowUturnLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">{t('go_back')}</span>
                      </motion.button>
                  )}
                </AnimatePresence>
                
                {/* Change Subject Button */}
                <motion.button
                    onClick={() => setSubject(null)}
                    className="h-10 md:h-12 px-3 md:px-4 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg hover:bg-[var(--accent-solid-hover)] transition-colors"
                    initial={{ scale: 0.8, opacity: 0, x: -15 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.8, opacity: 0, x: -15 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <HomeIcon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">{t('change_subject')}</span>
                </motion.button>
                
                {/* Mode Switch Button Positioned Here */}
                <AnimatePresence>
                {canSwitchMode && (
                     <motion.button
                         key="switch-mode"
                         onClick={handleToggleMode}
                         className="h-10 md:h-12 px-3 md:px-4 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg hover:bg-[var(--accent-solid-hover)] transition-colors"
                         initial={{ scale: 0.8, opacity: 0, x: -15 }}
                         animate={{ scale: 1, opacity: 1, x: 0 }}
                         exit={{ scale: 0.8, opacity: 0, x: -15 }}
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                     >
                         {view.type === 'textbook' ? (
                             <>
                                <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">Quiz</span>
                             </>
                         ) : (
                             <>
                                <BookOpenIcon className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">Text</span>
                             </>
                         )}
                     </motion.button>
                 )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {view.type === 'textbook' && !isSidebarOpen && (
                  <motion.div
                      className="flex flex-col items-start gap-3 pointer-events-auto mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                  >
                    <TableOfContentsDropdown 
                        chapterId={view.chapterId} 
                        activeTocId={activeTocId} 
                    />
                  </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Right Side Settings (Desktop only here, mobile moves to bottom or sidebar) */}
        <div className="pointer-events-auto hidden lg:block">
            {/* Settings button is actually fixed at bottom right in the main div structure, 
                but we could add top-right shortcuts here if needed. 
                For now keeping clean. */}
        </div>

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
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => {
            setIsSettingsOpen(true);
            setIsSidebarOpen(false);
        }}
      />

      <div className={`relative h-full flex flex-col overflow-hidden lg:glass-pane lg:rounded-2xl transition-[margin-left] duration-300 ease-in-out 
          ${isSidebarOpen ? 'lg:ml-72 xl:ml-72 2xl:ml-80' : 'lg:ml-0'}
      `}>
        <main 
            ref={mainContentRef} 
            className="flex-1 overflow-hidden" 
            style={{ position: 'relative' }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={getAnimationKey()}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <div className="pointer-events-none">
            <div className="absolute bottom-20 right-4 lg:bottom-6 lg:right-6 z-[var(--z-fab)] pointer-events-auto">
                <Settings 
                isOpen={isSettingsOpen}
                setIsOpen={setIsSettingsOpen}
                view={view}
                />
            </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} onNavigate={handleNavigate} />}
      </AnimatePresence>
    </div>
  );
};
