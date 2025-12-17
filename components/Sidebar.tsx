
import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { View } from '../types';
import { 
    HomeIcon, ListBulletIcon, CodeBracketIcon, FolderIcon, 
    BriefcaseIcon, SearchIcon, SparklesIcon, StarIcon, 
    PlayIcon, BookOpenIcon, PencilSquareIcon, ArrowPathIcon 
} from './icons';
import { useAppContext } from '../contexts/AppContext';
import { useQuiz } from '../contexts/QuizContext';
import { useTranslation } from '../hooks/useTranslation';
import { SegmentedControl } from './common/SegmentedControl';

interface SidebarProps {
  view: View; 
  onNavigate: (view: View) => void;
  onResetNavigate: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
}

const spring = { type: 'spring' as const, stiffness: 400, damping: 40, mass: 0.8 };

const sidebarVariants = {
    open: { x: 0, opacity: 1, scale: 1 },
    closed: { x: '-110%', opacity: 0, scale: 0.95 },
};

const listContainerVariants = {
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    },
    hidden: { opacity: 0 }
};

const itemVariants = {
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 500, damping: 30 } },
  hidden: { opacity: 0, x: -20 }
};

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  subLabel?: string;
  active: boolean;
  onClick?: () => void;
  badgeCount?: number;
  isChapter?: boolean;
  disabled?: boolean;
  highlight?: boolean;
  actionIcon?: React.ReactNode;
}

const NavItem = memo<NavItemProps>(({ icon, label, subLabel, active, onClick, badgeCount, isChapter, disabled, highlight, actionIcon }) => (
  <motion.button
    variants={itemVariants}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    whileHover={disabled ? {} : { x: 4 }}
    whileTap={disabled ? {} : { scale: 0.98 }}
    className={`group relative w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left overflow-hidden border ${
      active
        ? 'bg-[var(--text-primary)] text-[var(--bg-color)] border-[var(--text-primary)] shadow-md' 
        : disabled
            ? 'bg-transparent text-[var(--text-subtle)] border-transparent opacity-50 cursor-not-allowed'
            : 'bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--ui-bg)] hover:border-[var(--ui-border)]'
    }`}
  >
    <div className="relative z-10 flex items-center gap-4 min-w-0 flex-1">
        {icon && (
            <div className={`flex-shrink-0 transition-colors duration-200 ${active ? 'text-[var(--bg-color)]' : 'text-[var(--text-subtle)] group-hover:text-[var(--text-primary)]'}`}>
                {icon}
            </div>
        )}
        {isChapter && subLabel && (
            <div className={`font-mono text-xs font-bold transition-colors ${active ? 'text-[var(--bg-color)] opacity-60' : 'text-[var(--text-subtle)] opacity-40 group-hover:opacity-100'}`}>
                {subLabel}
            </div>
        )}
        
        <div className="flex-col min-w-0 flex-1 flex">
            <span className={`text-sm truncate font-serif leading-tight transition-all duration-200 ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
        </div>
    </div>

    {/* Right side indicators */}
    <div className="flex items-center gap-2 relative z-10">
        {highlight && (
            <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-[var(--bg-color)]' : 'bg-[var(--warning-solid-bg)]'}`} />
        )}

        {badgeCount !== undefined && badgeCount > 0 && (
            <span className={`text-[10px] font-bold font-mono rounded-full px-2 py-0.5 transition-colors ${
                active 
                ? 'bg-[var(--bg-color)] text-[var(--text-primary)]' 
                : 'bg-[var(--ui-bg)] text-[var(--text-secondary)] border border-[var(--ui-border)]'
            }`}>
                {badgeCount}
            </span>
        )}
        
        {actionIcon && (
            <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${active ? 'text-[var(--bg-color)]' : 'text-[var(--text-subtle)]'}`}>
                {actionIcon}
            </div>
        )}
    </div>
  </motion.button>
));

NavItem.displayName = 'NavItem';

const SectionHeader: React.FC<{children: React.ReactNode}> = memo(({children}) => (
    <div className="px-4 py-2 mt-4 mb-1 flex items-center gap-3">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-subtle)] select-none opacity-80 font-mono">
            {children}
        </h3>
        <div className="h-px flex-1 bg-[var(--ui-border)] opacity-50"></div>
    </div>
));

SectionHeader.displayName = 'SectionHeader';

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { view, onNavigate, onResetNavigate, isOpen, setIsOpen, onOpenSearch, onOpenSettings } = props;
  const { t } = useTranslation();
  const { flaggedItems, subjectData, subject, language, lastActiveChapterId } = useAppContext();
  const { quizState, currentIndex } = useQuiz();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : true);
  
  // Determine current mode
  const mode = useMemo(() => {
    if (view.type === 'textbook') return 'reading';
    return 'practice'; // 'quiz', 'problem', 'exercise', 'question_bank_quiz', 'bookmarks', 'history', 'overview', 'programming'
  }, [view.type]);

  const chapterListData = subjectData?.chapterList || [];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -40 || info.velocity.x < -400) {
      setIsOpen(false);
    }
  };
  
  const isQuizSubject = subject?.type === 'quiz';
  const isProgrammingSubject = subject?.type === 'programming';

  // Helper to get current chapter context for "Switch to Text" or "Switch to Practice"
  const currentChapterContextId = useMemo(() => {
    if (view.type === 'textbook') return view.chapterId;
    if (view.type === 'quiz' && quizState && quizState.problems.length > 0) {
        // Try to get chapter from current problem
        const currentProblem = quizState.problems[currentIndex];
        if (currentProblem) return `chapter${currentProblem.chapter}`;
    }
    if (view.type === 'problem') {
         // Need to find problem in subjectData to get chapter
         const problem = subjectData?.problems.find(p => p.id === view.id);
         if (problem) return `chapter${problem.chapter}`;
    }
    return lastActiveChapterId || subjectData?.chapterList[0]?.id;
  }, [view, quizState, currentIndex, subjectData, lastActiveChapterId]);

  const handleStartChapterQuiz = (chapterId: string) => {
      const chapterNum = chapterId.replace(/\D/g, '');
      if (!subjectData) return;
      const problems = subjectData.problems.filter(p => p.chapter === chapterNum);
      const chapterInfo = subjectData.chapterList.find(c => c.id === chapterId);
      const title = chapterInfo ? chapterInfo.title[language] : `${t('chapter')} ${chapterNum}`;
      
      onNavigate({ 
          type: 'quiz', 
          id: `chapter-${chapterNum}-quiz-${Date.now()}`,
          problems,
          title,
          startIndex: 0,
          chapterId: chapterId 
      });
  };

  const handleModeSwitch = (newMode: string) => {
      if (newMode === 'reading') {
          if (currentChapterContextId) {
            onNavigate({ type: 'textbook', chapterId: currentChapterContextId });
          } else {
            onNavigate({ type: 'textbook', chapterId: subjectData?.chapterList[0].id || '' });
          }
      } else {
          // Switch to practice - Use current chapter context if available, otherwise go home
          if (currentChapterContextId) {
              handleStartChapterQuiz(currentChapterContextId);
          } else {
              onNavigate({ type: 'home' });
          }
      }
  };

  return (
      <motion.aside 
        drag={isMobile ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        initial="closed"
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={spring}
        className="fixed top-24 bottom-4 left-4 z-[var(--z-sidebar)] w-80 flex flex-col rounded-3xl lg:absolute lg:top-24 lg:bottom-4 lg:left-4 lg:h-[calc(100%-7rem)] glass-pane border border-[var(--ui-border)] shadow-2xl"
        style={{ willChange: 'transform' }}
      >
            <div className="flex-shrink-0 px-6 pt-6 pb-4 space-y-6 z-20 relative">
                <button 
                    onClick={onOpenSearch}
                    className="w-full group relative flex items-center justify-between px-5 py-3.5 bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] border border-[var(--ui-border)] rounded-2xl transition-all duration-200 shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <SearchIcon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                        <span className="text-sm font-serif font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{t('search_placeholder')}</span>
                    </div>
                    <div className="hidden sm:flex items-center">
                            <span className="text-[10px] font-mono font-bold text-[var(--text-subtle)] border border-[var(--ui-border)] px-1.5 rounded opacity-60">⌘K</span>
                    </div>
                </button>

                {view.type !== 'home' && (
                    <SegmentedControl 
                        options={[
                            { label: t('sidebar_tab_chapters'), value: 'reading' },
                            { label: t('sidebar_tab_practice'), value: 'practice' }
                        ]}
                        value={mode}
                        onChange={(val) => handleModeSwitch(val)}
                    />
                )}
            </div>

            <div 
                className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar"
                style={{ 
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20px, black 95%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20px, black 95%, transparent 100%)'
                }}
            >
                <div className="h-2" /> 

                <AnimatePresence mode="wait">
                    {mode === 'reading' ? (
                        <motion.div
                            key="reading-nav"
                            variants={listContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className="space-y-2"
                        >
                            {/* Actions for Reading Mode */}
                            <div className="mb-6 space-y-2">
                                <SectionHeader>{t('quick_actions')}</SectionHeader>
                                <NavItem 
                                    icon={<FolderIcon className="w-5 h-5"/>} 
                                    label={t('glossary')} 
                                    active={view.type === 'glossary'} 
                                    onClick={() => onNavigate({type: 'glossary'})} 
                                />
                            </div>

                            {/* Chapter List (Navigates to Textbook) */}
                            <SectionHeader>{t('table_of_contents')}</SectionHeader>
                            {chapterListData.map((chapter, index) => (
                                <NavItem
                                    key={chapter.id}
                                    label={chapter.title[language]}
                                    subLabel={index.toString().padStart(2, '0')}
                                    active={view.type === 'textbook' && view.chapterId === chapter.id}
                                    onClick={() => onNavigate({ type: 'textbook', chapterId: chapter.id })}
                                    isChapter={true}
                                    disabled={chapter.disabled}
                                    highlight={chapter.highlight}
                                    actionIcon={<BookOpenIcon className="w-4 h-4" />}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="practice-nav"
                            variants={listContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className="space-y-2"
                        >
                             {/* Actions for Practice Mode */}
                             <div className="mb-6 space-y-2">
                                <SectionHeader>{t('practice_modes')}</SectionHeader>
                                
                                {isQuizSubject && currentChapterContextId && (
                                     <NavItem 
                                        icon={<SparklesIcon className="w-5 h-5"/>} 
                                        label="Change Scope" // Replaced View Problems
                                        active={view.type === 'question_bank_quiz'} 
                                        onClick={() => onNavigate({ type: 'question_bank_quiz' })}
                                        subLabel="Settings"
                                     />
                                )}

                                {isQuizSubject && (
                                    <>
                                        <NavItem 
                                            icon={<StarIcon className="w-5 h-5"/>} 
                                            label={t('starred_items')} 
                                            active={view.type === 'bookmarks'} 
                                            onClick={() => onNavigate({type: 'bookmarks'})} 
                                            badgeCount={flaggedItems.length}
                                        />
                                         <NavItem 
                                            icon={<BriefcaseIcon className="w-5 h-5"/>} 
                                            label={t('quiz_history')} 
                                            active={view.type === 'history'} 
                                            onClick={() => onNavigate({type: 'history'})} 
                                        />
                                    </>
                                )}
                                
                                {isProgrammingSubject && (
                                    <NavItem 
                                        icon={<CodeBracketIcon className="w-5 h-5" />} 
                                        label={t('programming_exercises')} 
                                        active={view.type === 'programming' || view.type === 'exercise'} 
                                        onClick={() => onNavigate({ type: 'programming' })} 
                                    />
                                )}
                             </div>

                             {/* Chapter List (Navigates to Quiz for Chapter) */}
                             {isQuizSubject && (
                                 <>
                                    <SectionHeader>{t('practice_questions_for_chapter')}</SectionHeader>
                                    {chapterListData.map((chapter, index) => (
                                        <NavItem
                                            key={chapter.id}
                                            label={chapter.title[language]}
                                            subLabel={index.toString().padStart(2, '0')}
                                            active={view.type === 'quiz' && view.chapterId === chapter.id}
                                            onClick={() => handleStartChapterQuiz(chapter.id)}
                                            isChapter={true}
                                            disabled={chapter.disabled}
                                            highlight={chapter.highlight}
                                            actionIcon={<PlayIcon className="w-4 h-4" />}
                                        />
                                    ))}
                                 </>
                             )}
                        </motion.div>
                    )}
                </AnimatePresence>

                 <div className="lg:hidden mt-8 pt-4 border-t border-[var(--ui-border)]">
                     <NavItem 
                         icon={<SparklesIcon className="w-5 h-5" />} 
                         label={t('sidebar_tab_settings')} 
                         active={false} 
                         onClick={onOpenSettings} 
                     />
                 </div>
                 
                 <div className="h-12" />
            </div>
            
      </motion.aside>
  );
};
