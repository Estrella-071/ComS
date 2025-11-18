

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
import type { View } from './types';
import { useTranslation } from './hooks/useTranslation';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { useAppContext } from './contexts/AppContext';
import { QuizProvider, useQuiz } from './contexts/QuizContext';
import { Bars3Icon, SearchIcon, XMarkIcon, ArrowUturnLeftIcon, PencilSquareIcon, ListBulletIcon, ChevronDownIcon } from './components/icons';
import { Tooltip } from './components/Tooltip';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

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

const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };
const listVariants = {
  visible: { transition: { staggerChildren: 0.03 } },
  hidden: {},
};
const itemVariants = {
  visible: { opacity: 1, y: 0, transition: spring },
  hidden: { opacity: 0, y: 5, transition: { duration: 0.2 } },
};

interface H3Heading { title: string; slug: string; }
interface H2Heading { title: string; slug: string; children: H3Heading[]; }

const TableOfContentsDropdown: React.FC<{
  chapterId: string;
  activeTocId: string | null;
}> = ({ chapterId, activeTocId }) => {
    const { t } = useTranslation();
    const { subjectData, language } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const tocRef = useRef<HTMLDivElement>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const chapterContent = language === 'zh' 
        ? subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData]?.content.zh
        : subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData]?.content.en;

    const toc = useMemo<H2Heading[]>(() => {
        if (!chapterContent) return [];
        const headingRegex = /^(##|###)\s(.+)/gm;
        const matches = [...chapterContent.matchAll(headingRegex)];
        const newToc: H2Heading[] = [];
        let currentH2: H2Heading | null = null;

        matches.forEach(match => {
            const level = match[1].length;
            const title = match[2].trim();
            const slug = slugify(title);

            if (level === 2) {
                currentH2 = { title, slug, children: [] };
                newToc.push(currentH2);
            } else if (level === 3 && currentH2) {
                currentH2.children.push({ title, slug });
            }
        });
        return newToc;
    }, [chapterContent]);
    
    const handleScroll = (slug: string) => {
        const container = document.querySelector('.prose-container');
        const element = document.getElementById(slug);
        if (container && element) {
            const containerTop = container.getBoundingClientRect().top;
            const elementTop = element.getBoundingClientRect().top;
            const offset = elementTop - containerTop;
            
            container.scrollTo({
                top: container.scrollTop + offset,
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (activeTocId) {
            const parentH2 = toc.find(h2 => 
                h2.slug === activeTocId || h2.children.some(h3 => h3.slug === activeTocId)
            );
            if (parentH2) setExpandedSection(parentH2.slug);
        }
    }, [activeTocId, toc]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tocRef.current && !tocRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (toc.length === 0) return null;

    return (
        <div ref={tocRef} className="relative z-[var(--z-content-overlay)]">
            <motion.button 
                onClick={() => setIsOpen(v => !v)} 
                className="h-12 px-5 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('sidebar_toc_header')}
            >
                <ListBulletIcon className="w-5 h-5"/>
                <span className="text-sm font-semibold whitespace-nowrap">{t('sidebar_toc_header')}</span>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={spring}
                        className="absolute top-full mt-2 left-0 w-72 glass-pane rounded-xl p-2 shadow-lg"
                    >
                        <div className="max-h-80 overflow-y-auto space-y-1">
                            {toc.map(h2 => {
                                const isExpanded = expandedSection === h2.slug;
                                return (
                                <div key={h2.slug}>
                                    <button onClick={() => setExpandedSection(isExpanded ? null : h2.slug)} className="w-full flex justify-between items-center p-2 rounded-md text-sm font-semibold text-left hover:bg-[var(--ui-bg-hover)]">
                                        <a href={`#${h2.slug}`} onClick={(e) => { e.preventDefault(); handleScroll(h2.slug); }} className={`flex-1 truncate pr-2 ${activeTocId === h2.slug ? 'text-[var(--accent-text)]' : ''}`}>{h2.title}</a>
                                        {h2.children.length > 0 && <ChevronDownIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />}
                                    </button>
                                    <AnimatePresence>
                                        {isExpanded && h2.children.length > 0 && (
                                            <motion.div initial="collapsed" animate="open" exit="collapsed" variants={{ open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }} className="pl-4 overflow-hidden">
                                                {h2.children.map(h3 => (
                                                    <a key={h3.slug} href={`#${h3.slug}`} onClick={(e) => { e.preventDefault(); handleScroll(h3.slug); }} className={`block p-2 rounded-md text-sm truncate hover:bg-[var(--ui-bg-hover)] ${activeTocId === h3.slug ? 'text-[var(--accent-text)] font-medium' : 'text-[var(--text-secondary)]'}`}>{h3.title}</a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const MainApp: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'home' });
  const [history, setHistory] = useState<View[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { subject, subjectData } = useAppContext();
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
      <div className="absolute top-4 left-4 z-[var(--z-fab)]">
        {/* Container for sidebar toggle and its associated buttons (Back, Search) */}
        <div className="flex items-center gap-2">
            <motion.button
                onClick={() => setIsSidebarOpen(o => !o)}
                className="w-12 h-12 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
            
            <AnimatePresence>
              {isSidebarOpen && (
                <>
                {history.length > 0 && (
                    <motion.button
                        onClick={handleBack}
                        className="h-12 px-5 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={t('go_back')}
                    >
                        <ArrowUturnLeftIcon className="w-5 h-5" />
                        <span className="text-sm font-semibold whitespace-nowrap">{t('go_back')}</span>
                    </motion.button>
                )}
                <motion.button
                    onClick={() => setIsSearchOpen(true)}
                    className="h-12 px-5 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={t('search')}
                >
                    <SearchIcon className="w-5 h-5" />
                    <span className="text-sm font-semibold whitespace-nowrap">{t('search')}</span>
                </motion.button>
                </>
              )}
            </AnimatePresence>
        </div>

        {/* Note: This container for the textbook buttons is absolutely positioned.
            This prevents them from being pushed to the right by the "Back" and "Search" buttons
            that appear when the sidebar is open. Since their visibility is mutually exclusive,
            they occupy the same visual space without causing a layout shift. */}
        <div className="absolute top-0 left-[calc(3rem+0.5rem)]">
          <AnimatePresence>
              {view.type === 'textbook' && !isSidebarOpen && (
                <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
      </div>

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
        activeTocId={activeTocId}
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
      </div>
      <AnimatePresence>
        {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} onNavigate={handleNavigate} />}
      </AnimatePresence>
    </div>
  );
};

export default App;