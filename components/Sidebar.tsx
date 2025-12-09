
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { View } from '../types';
import { HomeIcon, ListBulletIcon, CodeBracketIcon, FolderIcon, BriefcaseIcon, SearchIcon, SparklesIcon, StarIcon, PlayIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
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

// --- Animation Constants ---
const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };

const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
};

const listContainerVariants = {
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.05 }
    },
    hidden: { opacity: 0 }
};

const itemVariants = {
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
  hidden: { opacity: 0, x: -15 }
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { view, onNavigate, onResetNavigate, isOpen, setIsOpen, onOpenSearch, onOpenSettings } = props;
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
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        initial={false}
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={spring}
        // Design Change: Removed border-r, removed backdrop-blur, used solid background color for high contrast purity
        className="fixed inset-y-0 left-0 z-[var(--z-sidebar)] w-80 bg-[var(--bg-color)] flex flex-col lg:absolute lg:top-0 lg:left-0 lg:h-full shadow-2xl lg:shadow-none"
        style={{ willChange: 'transform' }}
      >
            {/* 
                Sticky Header Section / Control Panel 
            */}
            <div className="flex-shrink-0 px-6 pt-24 pb-6 space-y-6 bg-[var(--bg-color)] z-20 relative">
                <div className="space-y-4">
                    {/* Search Button - Pill Shape, Serif Font */}
                    <button 
                        onClick={onOpenSearch}
                        className="w-full group relative flex items-center justify-between px-5 py-3 bg-transparent hover:bg-[var(--ui-bg)] border border-[var(--ui-border)] hover:border-[var(--text-primary)] rounded-full transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <SearchIcon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                            <span className="text-sm font-serif text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{t('search_placeholder')}</span>
                        </div>
                        <div className="hidden sm:flex items-center">
                             <span className="text-[10px] font-mono font-bold border border-[var(--ui-border)] rounded px-1.5 py-0.5 text-[var(--text-subtle)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-all">⌘K</span>
                        </div>
                    </button>

                    {/* Tabs */}
                    <SegmentedControl 
                        options={[
                            { label: t('sidebar_tab_chapters'), value: 'chapters' },
                            { label: t('sidebar_tab_practice'), value: 'practice' }
                        ]}
                        value={activeTab}
                        onChange={(val) => setActiveTab(val as 'chapters' | 'practice')}
                    />
                </div>
            </div>

            {/* 
                Scrollable Content Area 
            */}
            <div 
                className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar"
                style={{ 
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20px, black 90%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20px, black 90%, transparent 100%)'
                }}
            >
                {/* Spacer */}
                <div className="h-2" /> 

                <AnimatePresence mode="wait">
                    {activeTab === 'chapters' ? (
                        <motion.div
                            key="chapters"
                            variants={listContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className="space-y-2"
                        >
                            {chapterListData.map((chapter, index) => (
                                <NavItem
                                    key={chapter.id}
                                    label={chapter.title[language]}
                                    subLabel={`${t('chapter')} ${index + 1}`}
                                    active={view.type === 'textbook' && view.chapterId === chapter.id}
                                    onClick={() => onNavigate({ type: 'textbook', chapterId: chapter.id })}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="practice"
                            variants={listContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className="space-y-8"
                        >
                             <div className="space-y-2">
                                <SectionTitle>{t('practice_modes')}</SectionTitle>
                                <NavItem icon={<HomeIcon className="w-5 h-5"/>} label={t('home')} active={view.type === 'home'} onClick={() => onResetNavigate({type: 'home'})} />
                                {isQuizSubject && (
                                    <>
                                        <NavItem icon={<PlayIcon className="w-5 h-5"/>} label={t('start_quiz_session')} active={view.type === 'question_bank_quiz'} onClick={() => onNavigate({ type: 'question_bank_quiz' })} />
                                        <NavItem icon={<ListBulletIcon className="w-5 h-5"/>} label={t('question_bank')} active={view.type === 'overview'} onClick={() => onNavigate({ type: 'overview' })} />
                                    </>
                                )}
                                {isProgrammingSubject && (
                                    <NavItem icon={<CodeBracketIcon className="w-5 h-5" />} label={t('programming_exercises')} active={view.type === 'programming' || view.type === 'exercise'} onClick={() => onNavigate({ type: 'programming' })} />
                                )}
                             </div>

                             <div className="space-y-2">
                                <SectionTitle>{t('my_tools')}</SectionTitle>
                                <NavItem icon={<StarIcon className="w-5 h-5"/>} label={t('starred_items')} active={view.type === 'bookmarks'} onClick={() => onNavigate({type: 'bookmarks'})} badgeCount={flaggedItems.length}/>
                                <NavItem icon={<FolderIcon className="w-5 h-5"/>} label={t('glossary')} active={view.type === 'glossary'} onClick={() => onNavigate({type: 'glossary'})} />
                                {isQuizSubject && <NavItem icon={<BriefcaseIcon className="w-5 h-5"/>} label={t('quiz_history')} active={view.type === 'history'} onClick={() => onNavigate({type: 'history'})} />}
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                 {/* Mobile-only Settings Link */}
                 <div className="lg:hidden mt-8 pt-4 border-t border-[var(--ui-border)]">
                     <NavItem 
                         icon={<SparklesIcon className="w-5 h-5" />} 
                         label={t('sidebar_tab_settings')} 
                         active={false} 
                         onClick={onOpenSettings} 
                     />
                 </div>
            </div>
            
      </motion.aside>
  );
};

const SectionTitle: React.FC<{children: React.ReactNode}> = ({children}) => (
    <h3 className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-subtle)] select-none opacity-60 font-sans">
        {children}
    </h3>
);

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  subLabel?: string;
  active: boolean;
  onClick: () => void;
  badgeCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, subLabel, active, onClick, badgeCount }) => (
  <motion.button
    variants={itemVariants}
    onClick={onClick}
    // Design Change: rounded-full instead of rounded-xl, font-serif, removed background hover to focus on outline/text
    className={`group relative w-full flex items-center justify-between gap-3 px-5 py-3 rounded-full transition-all duration-300 text-left overflow-hidden border ${
      active
        ? 'bg-[var(--text-primary)] text-[var(--bg-color)] border-[var(--text-primary)]' // Inverted high contrast for active
        : 'bg-transparent text-[var(--text-secondary)] border-transparent hover:border-[var(--text-subtle)] hover:text-[var(--text-primary)]' // Minimalist for inactive
    }`}
  >
    
    <div className="relative z-10 flex items-center gap-3 min-w-0 pl-1 flex-1">
        {icon ? (
            <div className={`flex-shrink-0 transition-colors duration-200 ${active ? 'text-[var(--bg-color)]' : 'text-[var(--text-subtle)] group-hover:text-[var(--text-primary)]'}`}>
                {icon}
            </div>
        ) : null}
        <div className="flex flex-col min-w-0 flex-1">
            {/* Font Serif applied here */}
            <span className={`text-sm truncate font-serif transition-all duration-200 ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
            {subLabel && <span className={`text-[10px] font-sans truncate transition-colors ${active ? 'text-[var(--bg-color)] opacity-70' : 'text-[var(--text-subtle)]'}`}>{subLabel}</span>}
        </div>
    </div>

    <div className="relative z-10 flex items-center gap-2 pr-1">
        {badgeCount !== undefined && badgeCount > 0 && (
            <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 transition-colors ${
                active 
                ? 'bg-[var(--bg-color)] text-[var(--text-primary)]' 
                : 'bg-[var(--ui-bg)] text-[var(--text-secondary)] border border-[var(--ui-border)]'
            }`}>
                {badgeCount}
            </span>
        )}
    </div>
  </motion.button>
);