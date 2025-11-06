import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Glossary } from './components/Glossary';
import { QuizView } from './components/QuizView';
import { ProblemSolver } from './components/ProblemSolver';
import { QuizHistory } from './components/QuizHistory';
import type { Problem } from './types';
import { problems } from './data/problems';
import { Bars3Icon, SunIcon, MoonIcon, CheckCircleIcon, SearchIcon, StarSolidIcon, ShuffleIcon } from './components/icons';
import { useTranslation } from './hooks/useTranslation';
import { useAppContext } from './contexts/AppContext';
import { TextWithHighlights } from './components/TextWithHighlights';
import { ShuffleQuizModal } from './components/ShuffleQuizModal';


export type View =
  | { type: 'home' }
  | { type: 'quiz'; problems: Problem[]; title: string; startIndex?: number; }
  | { type: 'glossary' }
  | { type: 'history' }
  | { type: 'problem'; id: string };

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'home' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSetView = (newView: View) => {
    setView(newView);
    setIsSidebarOpen(false);
  };

  const renderView = () => {
    switch (view.type) {
      case 'quiz':
        return <QuizView key={view.title + (view.startIndex || 0)} problems={view.problems} title={view.title} setView={handleSetView} startIndex={view.startIndex} isSidebarOpen={isSidebarOpen} />;
      case 'glossary':
        return <Glossary />;
      case 'problem':
        return <ProblemSolver id={view.id} setView={handleSetView} isSidebarOpen={isSidebarOpen} />;
      case 'history':
        return <QuizHistory setView={handleSetView} />;
      case 'home':
      default:
        return <Overview setView={handleSetView} />;
    }
  };
  
  const getAnimationKey = () => {
    if (view.type === 'quiz') return `${view.type}-${view.title}`;
    if (view.type === 'problem') return 'problem';
    return view.type;
  }

  const getPageTitle = () => {
    const { t } = useTranslation();
    switch (view.type) {
      case 'quiz':
        return view.title;
      case 'glossary':
        return t('glossary');
      case 'problem':
        const problem = problems.find(p => p.id === view.id);
        return problem ? `${t('problem_header')} ${problem.number}` : t('home');
      case 'history':
        return t('quiz_history');
      case 'home':
      default:
        return t('home');
    }
  }

  return (
    <div className="lg:flex h-screen overflow-hidden">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>
      <Sidebar view={view} setView={handleSetView} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-screen">
         <header className="lg:hidden flex items-center justify-between p-4 flex-shrink-0 bg-[var(--bg-translucent)] backdrop-blur-xl border-b border-b-[var(--ui-border)] z-10">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-[var(--text-primary)]">
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold truncate text-[var(--text-primary)]">{getPageTitle()}</h2>
          <ThemeToggleMobile />
        </header>
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={getAnimationKey()}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const ThemeToggleMobile: React.FC = () => {
    const { theme, setTheme } = useAppContext();
    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-8 h-8 flex justify-center items-center rounded-full bg-[var(--ui-bg)] text-[var(--text-primary)]"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
             <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </motion.div>
            </AnimatePresence>
        </button>
    )
}

const Overview: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
    const { t } = useTranslation();
    const { flaggedProblems } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [isShuffleModalOpen, setIsShuffleModalOpen] = useState(false);

    const filteredProblems = useMemo(() => {
        if (!searchQuery) return problems;
        const lowercasedQuery = searchQuery.toLowerCase();
        return problems.filter(p => 
            p.text_en.toLowerCase().includes(lowercasedQuery) ||
            p.text_zh.toLowerCase().includes(lowercasedQuery)
        );
    }, [searchQuery]);

    const problemsByChapter = useMemo(() => {
        return filteredProblems.reduce<Record<string, Problem[]>>((acc, problem) => {
            if (!acc[problem.chapter]) acc[problem.chapter] = [];
            acc[problem.chapter].push(problem);
            return acc;
        }, {});
    }, [filteredProblems]);

    const handleProblemClick = (problemId: string) => {
        setView({ type: 'problem', id: problemId });
    };

    const startShuffledQuiz = (selectedChapters: string[], count: number) => {
        let problemsToShuffle = problems;
        if (selectedChapters.length > 0) {
            problemsToShuffle = problems.filter(p => selectedChapters.includes(p.chapter));
        }
        const quizProblems = [...problemsToShuffle].sort(() => Math.random() - 0.5).slice(0, count);
        const title = selectedChapters.length > 0 
            ? `${t('shuffle_mode')} (${selectedChapters.map(c => `${t('chapter_short')}${c}${t('chapter_unit')}`).join(', ')})`
            : t('shuffle_mode');
    
        setView({ type: 'quiz', problems: quizProblems, title, startIndex: 0 });
        setIsShuffleModalOpen(false);
      }
    
    return (
        <div className="max-w-7xl mx-auto pt-8 lg:pt-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[var(--text-primary)] mb-6 text-center whitespace-pre-line">{t('app_name')}</h1>
            
            <div className="lg:static sticky top-0 z-20 bg-[var(--bg-color)]/80 backdrop-blur-md -mx-4 sm:-mx-6 px-4 sm:px-6 py-6 mb-12">
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search_placeholder')}
                            className="w-full bg-[var(--bg-translucent)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-full py-3 pl-12 pr-4 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-solid)] outline-none transition-all"
                        />
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-subtle)]" />
                    </div>
                </div>
            </div>

            {Object.entries(problemsByChapter).map(([chapter, chapterProblems]: [string, Problem[]]) => (
                <div key={chapter} className="mb-16">
                    <h2 className="lg:static sticky top-[88px] z-10 bg-[var(--bg-color)]/80 backdrop-blur-md text-3xl font-bold text-[var(--text-secondary)] border-b-2 border-[var(--ui-border)] py-3 mb-6 -mx-4 sm:-mx-6 px-4 sm:px-6">{`${t('chapter')} ${chapter}${t('chapter_unit')}`}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {chapterProblems.map(p => {
                            const correctOption = p.options.find(opt => opt.key === p.answer);
                            const isFlagged = flaggedProblems.includes(p.id);
                            return (
                                <motion.button 
                                    key={p.id}
                                    onClick={() => handleProblemClick(p.id)}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    className={`relative bg-[var(--bg-translucent)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-2xl p-5 text-left h-full flex flex-col transition-shadow ${isFlagged ? 'flagged-glow' : ''}`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-[var(--accent-text)]">{t('problem_header')} {p.number}</span>
                                        {isFlagged && <StarSolidIcon className="w-4 h-4 text-amber-400" />}
                                    </div>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3 flex-grow mb-6">
                                       <TextWithHighlights text={p.text_en} highlight={searchQuery} />
                                    </p>
                                    <div className="absolute bottom-3 right-4 flex items-center gap-2 text-xs text-green-600 dark:text-green-500 font-medium">
                                        <CheckCircleIcon className="w-4 h-4"/>
                                        <span className="truncate">{`(${p.answer.toUpperCase()}) ${correctOption?.text_en}`}</span>
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>
                </div>
            ))}
            
            <AnimatePresence>
                <motion.button
                    onClick={() => setIsShuffleModalOpen(true)}
                    className="fixed bottom-6 right-6 lg:hidden w-16 h-16 bg-[var(--accent-solid)] rounded-full text-white flex items-center justify-center shadow-lg z-40"
                    initial={{ scale: 0, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 50 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={t('shuffle_mode')}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <ShuffleIcon className="w-8 h-8"/>
                </motion.button>
            </AnimatePresence>
             <ShuffleQuizModal 
                isOpen={isShuffleModalOpen}
                onClose={() => setIsShuffleModalOpen(false)}
                onStart={startShuffledQuiz}
                chapters={Object.keys(problems.reduce<Record<string, boolean>>((acc, p) => { acc[p.chapter] = true; return acc; }, {})).sort((a, b) => parseInt(a) - parseInt(b))}
            />
        </div>
    )
}

export default App;