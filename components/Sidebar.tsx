
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { View } from '../types';
import { HomeIcon, ListBulletIcon, CodeBracketIcon, FolderIcon, BriefcaseIcon, SearchIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { SegmentedControl } from './common/SegmentedControl';

interface SidebarProps {
  view: View; 
  onNavigate: (view: View) => void;
  onResetNavigate: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTocId?: string | null;
  onOpenSearch: () => void;
}

// --- Animation Constants ---
const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };

const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
};

const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
  hidden: { 
    opacity: 0, 
    y: 5,
    transition: { duration: 0.2 }
  },
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { view, onNavigate, onResetNavigate, isOpen, setIsOpen, onOpenSearch } = props;
  const { t } = useTranslation();
  const { flaggedItems, subjectData, subject, language } = useAppContext();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : true);
  
  const [activeTab, setActiveTab] = useState<'chapters' | 'practice'>('chapters');

  const chapterListData = subjectData?.chapterList || [];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Sync active tab with current view
  useEffect(() => {
      if (view.type === 'textbook') {
          setActiveTab('chapters');
      } else if (['quiz', 'problem', 'exercise', 'question_bank_quiz', 'bookmarks', 'history', 'overview', 'programming'].includes(view.type)) {
          setActiveTab('practice');
      }
  }, [view.type]);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -40 || info.velocity.x < -400) {
      setIsOpen(false);
    }
  };
  
  const isQuizSubject = subject?.type === 'quiz';
  const isProgrammingSubject = subject?.type === 'programming';

  return (
      <motion.aside 
        drag={isMobile ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        initial={false}
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={spring}
        className="fixed inset-y-0 left-0 z-[var(--z-sidebar)] w-80 glass-pane flex flex-col rounded-r-2xl lg:absolute lg:top-0 lg:left-0 lg:h-full lg:rounded-none"
        style={{ willChange: 'transform' }}
      >
            <div className="pt-20 px-5 pb-2 space-y-4">
                <SegmentedControl 
                    options={[
                        { label: t('sidebar_tab_chapters'), value: 'chapters' },
                        { label: t('sidebar_tab_practice'), value: 'practice' }
                    ]}
                    value={activeTab}
                    onChange={(val) => setActiveTab(val as 'chapters' | 'practice')}
                    layoutId="sidebar-tab-switch"
                />

                <button 
                    onClick={onOpenSearch}
                    className="w-full h-10 bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] border border-[var(--ui-border)] rounded-xl px-3 flex items-center gap-3 transition-all cursor-pointer group shadow-sm text-left"
                >
                    <SearchIcon className="w-5 h-5 text-[var(--text-subtle)] group-hover:text-[var(--text-primary)] transition-colors" />
                    <span className="text-sm text-[var(--text-subtle)] group-hover:text-[var(--text-secondary)] truncate select-none">{t('search_placeholder')}</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 pt-2">
                <AnimatePresence mode="wait">
                    {activeTab === 'chapters' ? (
                        <motion.div
                            key="chapters"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-1"
                        >
                            {chapterListData.map(chapter => (
                                <NavItem
                                    key={chapter.id}
                                    label={chapter.title[language]}
                                    active={view.type === 'textbook' && view.chapterId === chapter.id}
                                    onClick={() => onNavigate({ type: 'textbook', chapterId: chapter.id })}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="practice"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                             <div>
                                <div className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-wider mb-2 px-2">{t('practice_modes')}</div>
                                <div className="space-y-1">
                                    <NavItem icon={<HomeIcon className="w-5 h-5"/>} label={t('home')} active={view.type === 'home'} onClick={() => onResetNavigate({type: 'home'})} />
                                    {isQuizSubject && (
                                        <>
                                            <NavItem icon={<ListBulletIcon className="w-5 h-5"/>} label={t('all_questions')} active={view.type === 'overview'} onClick={() => onNavigate({ type: 'overview' })} />
                                            <NavItem icon={<CodeBracketIcon className="w-5 h-5"/>} label={t('question_bank_quiz')} active={view.type === 'question_bank_quiz'} onClick={() => onNavigate({ type: 'question_bank_quiz' })} />
                                        </>
                                    )}
                                    {isProgrammingSubject && (
                                        <NavItem icon={<CodeBracketIcon className="w-5 h-5" />} label={t('programming_exercises')} active={view.type === 'programming' || view.type === 'exercise'} onClick={() => onNavigate({ type: 'programming' })} />
                                    )}
                                </div>
                             </div>

                             <div>
                                <div className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-wider mb-2 px-2">{t('my_tools')}</div>
                                <div className="space-y-1">
                                    <NavItem icon={<BriefcaseIcon className="w-5 h-5"/>} label={t('flagged_for_review')} active={view.type === 'bookmarks'} onClick={() => onNavigate({type: 'bookmarks'})} badgeCount={flaggedItems.length}/>
                                    <NavItem icon={<FolderIcon className="w-5 h-5"/>} label={t('glossary')} active={view.type === 'glossary'} onClick={() => onNavigate({type: 'glossary'})} />
                                    {isQuizSubject && <NavItem icon={<BriefcaseIcon className="w-5 h-5"/>} label={t('quiz_history')} active={view.type === 'history'} onClick={() => onNavigate({type: 'history'})} />}
                                </div>
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
      </motion.aside>
  );
};

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badgeCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, badgeCount }) => (
  <motion.button
    variants={itemVariants}
    onClick={onClick}
    className={`relative w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-150 ${
      active
        ? 'text-[var(--accent-solid-text)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)] hover:text-[var(--text-primary)]'
    }`}
  >
    {active && (
      <motion.div
        layoutId="active-nav-indicator"
        className="absolute inset-0 bg-[var(--accent-solid)] rounded-lg shadow-lg"
        style={{ borderRadius: 8 }}
        transition={spring}
      />
    )}
    <div className="relative flex items-center gap-3">
        {icon}
        <span className="truncate text-left">{label}</span>
    </div>
    {badgeCount !== undefined && badgeCount > 0 && (
        <span className={`relative text-xs font-bold rounded-full px-2 py-0.5 ${active ? 'bg-white/20 text-[var(--accent-solid-text)]' : 'bg-[var(--accent-bg)] text-[var(--accent-text)]'}`}>
            {badgeCount}
        </span>
    )}
  </motion.button>
);
