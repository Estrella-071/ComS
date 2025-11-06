import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { Problem } from '../types';
import { problems } from '../data/problems';
import { BookOpenIcon, SunIcon, MoonIcon, HomeIcon, ListBulletIcon, ShuffleIcon, FolderIcon, ChevronDownIcon, StarIcon, StarSolidIcon, ClockIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, SearchIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import type { View } from '../App';
import { ShuffleQuizModal } from './ShuffleQuizModal';
import { SearchModal } from './SearchModal';

interface SidebarProps {
  view: View; 
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
};

const sidebarTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
} as const;


export const Sidebar: React.FC<SidebarProps> = ({ view, setView, isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { flaggedProblems } = useAppContext();
  const [isShuffleModalOpen, setIsShuffleModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLg, setIsLg] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsLg(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startQuiz = (mode: 'all' | 'flagged', chapter?: string) => {
      let quizProblems: Problem[] = [];
      let title = '';

      if (mode === 'all') {
          quizProblems = problems;
          title = t('all_questions');
      } else if (mode === 'flagged') {
          quizProblems = problems.filter(p => flaggedProblems.includes(p.id));
          title = t('flagged_for_review');
      } else if (chapter) {
          quizProblems = problems.filter(p => p.chapter === chapter);
          title = `${t('chapter')} ${chapter}${t('chapter_unit')}`;
      }
      setView({ type: 'quiz', problems: quizProblems, title, startIndex: 0 });
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

  const problemsByChapter = useMemo(() => {
    return problems.reduce<Record<string, Problem[]>>((acc, problem) => {
      const chapterKey = `${problem.chapter}`;
      if (!acc[chapterKey]) {
        acc[chapterKey] = [];
      }
      acc[chapterKey].push(problem);
      return acc;
    }, {});
  }, []);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -40 || info.velocity.x < -400) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.aside 
        drag={isLg ? false : 'x'}
        dragConstraints={{ left: -288, right: 0 }}
        dragElastic={0.2}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        initial={false}
        variants={sidebarVariants}
        animate={isLg || isOpen ? 'open' : 'closed'}
        transition={sidebarTransition}
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-[var(--bg-translucent)] backdrop-blur-xl flex-shrink-0 p-4 border-r border-r-[var(--glass-border)] shadow-[var(--glass-shadow)] flex flex-col h-full lg:relative`}>
        <button onClick={() => setView({type: 'home'})} className="flex items-center gap-2 mb-8 px-2 text-left flex-shrink-0">
          <h1 className="text-xl font-bold text-[var(--text-primary)] whitespace-pre-line leading-tight">{t('app_name')}</h1>
        </button>
        
        <nav className="flex-1 space-y-2 overflow-y-auto pr-1 -mr-2">
          <div>
            <h2 className="text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider px-3 mb-2">{t('modes')}</h2>
            <NavItem icon={<HomeIcon className="w-5 h-5"/>} label={t('home')} active={view.type === 'home'} onClick={() => setView({type: 'home'})} />
            <NavItem icon={<ListBulletIcon className="w-5 h-5"/>} label={t('all_questions')} active={view.type === 'quiz' && view.title === t('all_questions')} onClick={() => startQuiz('all')} />
            <NavItem icon={<ShuffleIcon className="w-5 h-5"/>} label={t('shuffle_mode')} active={view.type === 'quiz' && view.title.includes(t('shuffle_mode'))} onClick={() => setIsShuffleModalOpen(true)} />
          </div>
          
          <hr className="my-4 border-[var(--ui-border)]" />

          <div>
            <h2 className="text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider px-3 mb-2">{t('tools')}</h2>
            <NavItem icon={<SearchIcon className="w-5 h-5"/>} label={t('search')} active={false} onClick={() => setIsSearchModalOpen(true)} />
            <NavItem icon={<StarIcon className="w-5 h-5"/>} label={t('flagged_for_review')} active={view.type === 'quiz' && view.title === t('flagged_for_review')} onClick={() => startQuiz('flagged')} badgeCount={flaggedProblems.length}/>
            <NavItem icon={<BookOpenIcon className="w-5 h-5"/>} label={t('glossary')} active={view.type === 'glossary'} onClick={() => setView({type: 'glossary'})} />
            <NavItem icon={<ClockIcon className="w-5 h-5"/>} label={t('quiz_history')} active={view.type === 'history'} onClick={() => setView({type: 'history'})} />
          </div>
          
          <hr className="my-4 border-[var(--ui-border)]" />
          
          <div className="flex-1">
            <h2 className="text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider px-3 mb-2">{t('by_chapter')}</h2>
            <div className="space-y-1">
              {Object.keys(problemsByChapter).map(chapter => (
                  <ChapterAccordion 
                      key={chapter}
                      chapter={chapter}
                      problems={problemsByChapter[chapter]}
                      view={view}
                      setView={setView}
                  />
              ))}
            </div>
          </div>
        </nav>
        <div className="mt-auto flex-shrink-0 pt-4 border-t border-[var(--ui-border)] space-y-1">
          <ThemeToggleNavItem />
          <FullscreenToggleNavItem />
        </div>
      </motion.aside>
      <ShuffleQuizModal 
        isOpen={isShuffleModalOpen}
        onClose={() => setIsShuffleModalOpen(false)}
        onStart={startShuffledQuiz}
        chapters={Object.keys(problemsByChapter)}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        setView={setView}
      />
    </>
  );
};

interface ChapterAccordionProps {
    chapter: string;
    problems: Problem[];
    view: View;
    setView: (view: View) => void;
}

const ChapterAccordion: React.FC<ChapterAccordionProps> = ({ chapter, problems, view, setView }) => {
    const { t } = useTranslation();
    const { flaggedProblems } = useAppContext();
    const [isExpanded, setIsExpanded] = useState(false);
    
    const isChapterActive = view.type === 'problem' && problems.some(p => p.id === view.id);

    return (
        <div>
            <div
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer ${
                    isChapterActive
                      ? 'bg-[var(--accent-bg)] text-[var(--accent-text)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)]'
                }`}
            >
                <div className="flex items-center gap-3 flex-1" onClick={() => setView({ type: 'quiz', problems, title: `${t('chapter')} ${chapter}${t('chapter_unit')}`, startIndex: 0 })}>
                    <FolderIcon className="w-5 h-5"/>
                    <span>{`${t('chapter')} ${chapter}${t('chapter_unit')}`}</span>
                </div>
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-3 -m-3 rounded-full hover:bg-[var(--ui-bg)]">
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-1 ml-5 pl-5 border-l-2 border-[var(--ui-border)] space-y-1 relative">
                            {problems.map((p) => (
                                <div key={p.id} className="relative">
                                    <div className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-4 h-px bg-[var(--ui-border)]"></div>
                                    <button
                                        onClick={() => setView({ type: 'problem', id: p.id })}
                                        className={`w-full flex items-center justify-between text-left text-sm py-1.5 px-2 rounded-md truncate ${
                                            view.type === 'problem' && view.id === p.id 
                                            ? 'text-[var(--accent-text)] font-semibold'
                                            : 'text-[var(--text-subtle)] hover:bg-[var(--ui-bg-hover)]'
                                        }`}
                                    >
                                        <span>{t('problem_header')} {p.number}</span>
                                        {flaggedProblems.includes(p.id) && <StarSolidIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const ThemeToggleNavItem: React.FC = () => {
    const { theme, setTheme } = useAppContext();
    const { t } = useTranslation();

    const isLight = theme === 'light';
    const icon = isLight ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />;

    return (
        <NavItem
            icon={
                 <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={theme}
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center"
                    >
                        {icon}
                    </motion.div>
                </AnimatePresence>
            }
            label={isLight ? t('toggle_dark_mode') : t('toggle_light_mode')}
            active={false}
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
        />
    );
}

const FullscreenToggleNavItem: React.FC = () => {
    const { t } = useTranslation();
    const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const icon = isFullscreen ? <ArrowsPointingInIcon className="w-5 h-5" /> : <ArrowsPointingOutIcon className="w-5 h-5" />;
    const label = isFullscreen ? t('exit_fullscreen') : t('enter_fullscreen');

    return <NavItem icon={icon} label={label} active={false} onClick={toggleFullscreen} />;
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badgeCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, badgeCount }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
      active
        ? 'bg-[var(--accent-bg)] text-[var(--accent-text)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)] hover:text-[var(--text-primary)]'
    }`}
  >
    <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
    </div>
    {badgeCount !== undefined && badgeCount > 0 && (
        <span className="text-xs font-bold bg-[var(--accent-solid)] text-white rounded-full px-2 py-0.5">
            {badgeCount}
        </span>
    )}
  </button>
);