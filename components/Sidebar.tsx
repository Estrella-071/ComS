
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { Problem, View } from '../types';
import { BookOpenIcon, SunIcon, MoonIcon, HomeIcon, ListBulletIcon, CodeBracketIcon, FolderIcon, ChevronDownIcon, StarSolidIcon, ClockIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, ChevronRightIcon, ChevronLeftIcon, CheckIcon, XMarkIcon, CheckBadgeIcon, ArrowsRightLeftIcon, PencilSquareIcon, MapIcon, Cog6ToothIcon, BookmarkSquareIcon, CompassIcon, BriefcaseIcon, ArrowUturnLeftIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Tooltip } from './Tooltip';
import { useQuiz } from '../contexts/QuizContext';

interface SidebarProps {
  view: View; 
  onNavigate: (view: View) => void;
  onResetNavigate: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTocId?: string | null;
}

// --- Animation Constants ---
// FIX: Added 'as const' to specify the literal type 'spring' for the 'type' property, satisfying framer-motion's Transition type.
const spring = { type: 'spring' as const, stiffness: 400, damping: 35 };
// FIX: Added 'as const' to specify the literal type 'spring' for the 'type' property, satisfying framer-motion's Transition type.
const iconSpring = { type: 'spring' as const, stiffness: 500, damping: 30 };

const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
};

const listVariants = {
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
  hidden: {},
};

const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
  hidden: { 
    opacity: 0, 
    y: 10,
    transition: { duration: 0.2 }
  },
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

const ProblemNavigator: React.FC<{ problemId: string; onNavigate: (view: View) => void; }> = ({ problemId, onNavigate }) => {
    const { t } = useTranslation();
    const { subjectData } = useAppContext();
    const problemData = subjectData?.problems || [];
    const problemIndex = problemData.findIndex(p => p.id === problemId);
    if (problemIndex === -1) return null;
            
    const hasPrev = problemIndex > 0;
    const hasNext = problemIndex < problemData.length - 1;
    const navigateProblem = (dir: number) => {
        const newIndex = problemIndex + dir;
        if (newIndex >= 0 && newIndex < problemData.length) {
            onNavigate({ type: 'problem', id: problemData[newIndex].id });
        }
    };
    return (
        <div className="space-y-4">
            <h3 className="flex items-start gap-2 text-md font-bold text-[var(--text-primary)]">
                <ArrowsRightLeftIcon className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5"/>
                <span className="min-w-0 break-words">{t('sidebar_problem_nav_header')}</span>
            </h3>
            <div className="flex justify-between gap-2">
                <button onClick={() => navigateProblem(-1)} disabled={!hasPrev} className="flex items-center gap-1.5 px-4 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] text-sm w-full justify-center">
                    <ChevronLeftIcon className="w-4 h-4" /> {t('previous_question')}
                </button>
                <button onClick={() => navigateProblem(1)} disabled={!hasNext} className="flex items-center gap-1.5 px-4 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] text-sm w-full justify-center">
                    {t('next_question')} <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

const ChapterToc: React.FC<{ chapterId: string; chapterTitle: string; activeTocId: string | null; onNavigate: (view: View) => void;}> = ({ chapterId, chapterTitle, activeTocId, onNavigate }) => {
    const { t } = useTranslation();
    const { subjectData } = useAppContext();
    
    interface H3Heading { title: string; slug: string; }
    interface H2Heading { title: string; slug: string; children: H3Heading[]; }
    
    const [toc, setToc] = useState<H2Heading[]>([]);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const chapterContent = subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData]?.content.zh;
    const chapterListData = subjectData?.chapterList || [];
    const problemData = subjectData?.problems || [];

    useEffect(() => {
        if (!chapterContent) return;
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
        setToc(newToc);
    }, [chapterId, chapterContent]);

    useEffect(() => {
        if (activeTocId) {
            const parentH2 = toc.find(h2 => 
                h2.slug === activeTocId || h2.children.some(h3 => h3.slug === activeTocId)
            );
            if (parentH2) {
                setExpandedSection(parentH2.slug);
            }
        }
    }, [activeTocId, toc]);
    
    const currentChapterIndex = chapterListData.findIndex(c => c.id === chapterId);
    const prevChapter = currentChapterIndex > 0 ? chapterListData[currentChapterIndex - 1] : null;
    const nextChapter = currentChapterIndex < chapterListData.length - 1 ? chapterListData[currentChapterIndex + 1] : null;
    
    const chapterNumberMatch = chapterId.match(/\d+/);
    const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : null;
    const chapterProblems = chapterNumber ? problemData.filter(p => p.chapter === chapterNumber) : [];

    const startChapterQuiz = () => {
        if (chapterNumber) {
            onNavigate({ 
                type: 'quiz',
                id: `chapter-${chapterNumber}-${Date.now()}`,
                problems: chapterProblems, 
                title: `${t('chapter')} ${chapterNumber}${t('chapter_unit')}`, 
                startIndex: 0 
            });
        }
    };
    
    if (!chapterContent) return null;
    return (
        <div className="space-y-4">
             <h3 className="flex items-start gap-2 text-md font-bold text-[var(--text-primary)]">
                <ListBulletIcon className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5"/>
                <span className="min-w-0 break-words">{t('sidebar_toc_header')}</span>
            </h3>
            <motion.h4 layoutId="sidebar-chapter-title" className="font-bold text-[var(--text-primary)] truncate text-center">{chapterTitle}</motion.h4>
            
            <div className="flex justify-between gap-2">
                <button onClick={() => onNavigate({ type: 'textbook', chapterId: prevChapter!.id })} disabled={!prevChapter} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] text-sm">
                    <ChevronLeftIcon className="w-4 h-4" /> {t('previous_chapter')}
                </button>
                <button onClick={() => onNavigate({ type: 'textbook', chapterId: nextChapter!.id })} disabled={!nextChapter} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] text-sm">
                    {t('next_chapter')} <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
            
            {chapterProblems.length > 0 && (
                <button onClick={startChapterQuiz} className="w-full text-sm mt-1 px-3 py-2.5 bg-[var(--accent-bg)] hover:bg-[var(--ui-bg-hover)] rounded-lg font-semibold transition-colors">
                    {t('practice_questions_for_chapter')} {chapterNumber}
                </button>
            )}
            
            {toc.length > 0 && <hr className="my-2 border-[var(--ui-border)]" />}
             <div className="space-y-1">
                {toc.map((h2) => {
                    const isExpanded = expandedSection === h2.slug;
                    const isActive = activeTocId === h2.slug;
                    const hasActiveChild = h2.children.some(h3 => h3.slug === activeTocId);
                    const isEffectivelyActive = isActive || (isExpanded && hasActiveChild);

                    return (
                        <div key={h2.slug}>
                            <button
                                onClick={() => setExpandedSection(isExpanded ? null : h2.slug)}
                                className={`relative w-full flex justify-between items-center p-2.5 rounded-md transition-colors text-left ${isEffectivelyActive ? 'text-[var(--accent-text)] font-semibold' : 'text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)]'}`}
                            >
                                {isEffectivelyActive && (
                                    <motion.div
                                        layoutId="active-toc-indicator"
                                        className="absolute inset-0 bg-[var(--accent-bg)] rounded-md"
                                        style={{ borderRadius: '6px' }}
                                        transition={spring}
                                    />
                                )}
                                <span className="relative truncate pr-2">{h2.title}</span>
                                {h2.children.length > 0 && (
                                    <motion.div animate={{ rotate: isExpanded ? 0 : -90 }} transition={spring} className="relative">
                                        <ChevronDownIcon className="w-4 h-4 flex-shrink-0" />
                                    </motion.div>
                                )}
                            </button>
                             <AnimatePresence initial={false}>
                                {isExpanded && (
                                    <motion.div
                                        key="content"
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: { opacity: 1, height: 'auto' },
                                            collapsed: { opacity: 0, height: 0 },
                                        }}
                                        transition={spring}
                                        className="overflow-hidden pl-3"
                                    >
                                        <motion.div
                                            className="pt-1 space-y-1"
                                            variants={listVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                        {h2.children.map((h3) => (
                                            <motion.a
                                                variants={itemVariants}
                                                key={h3.slug}
                                                href={`#${h3.slug}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(h3.slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }}
                                                className={`relative block p-2.5 rounded-md truncate transition-colors pl-3 ${activeTocId === h3.slug ? 'text-[var(--accent-text)] font-semibold' : 'text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)]'}`}
                                            >
                                                {activeTocId === h3.slug && (
                                                    <motion.div
                                                        layoutId="active-toc-indicator"
                                                        className="absolute inset-0 bg-[var(--accent-bg)] rounded-md"
                                                        style={{ borderRadius: '6px' }}
                                                        transition={spring}
                                                    />
                                                )}
                                                <span className="relative">{h3.title}</span>
                                            </motion.a>
                                        ))}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const QuizQuestionNavigator: React.FC<{
  onNavigate: (view: View) => void;
  flaggedProblems: string[];
}> = ({ onNavigate, flaggedProblems }) => {
    const { t } = useTranslation();
    const { quizState, currentIndex, answers, isFinished, goToProblem } = useQuiz();
    const [filter, setFilter] = useState<'all' | 'incorrect' | 'unanswered'>('all');
    const currentQuestionRef = React.useRef<HTMLDivElement>(null);

    const { score, problems } = useMemo(() => {
        if (!quizState) return { score: 0, problems: [] };
        const newScore = Array.from(answers).reduce((count, [id, answer]) => {
            const problem = quizState.problems.find(p => p.id === id);
            return problem && problem.answer === answer ? count + 1 : count;
        }, 0);
        return { score: newScore, problems: quizState.problems };
    }, [quizState, answers]);
    
    useEffect(() => {
        if(currentQuestionRef.current) {
            currentQuestionRef.current.scrollIntoView({ block: 'nearest', inline: 'center' });
        }
    }, [currentIndex]);
    
    const incorrectProblems = useMemo(() => {
        return problems.filter(p => {
            const userAnswer = answers.get(p.id);
            return userAnswer && userAnswer !== p.answer;
        });
    }, [problems, answers, isFinished]);
    
    const filteredProblems = useMemo(() => {
        if (!isFinished || filter === 'all') return problems.map((p, i) => ({...p, originalIndex: i}));
        
        return problems.map((p, i) => ({...p, originalIndex: i})).filter(p => {
            const userAnswer = answers.get(p.id);
            if (filter === 'incorrect') return userAnswer && userAnswer !== p.answer;
            if (filter === 'unanswered') return !userAnswer;
            return false;
        });
    }, [problems, answers, isFinished, filter]);
    
    const handleReviewIncorrect = () => {
        if (incorrectProblems.length > 0) {
            onNavigate({
                type: 'quiz',
                id: `review-incorrect-${Date.now()}`,
                problems: incorrectProblems,
                title: t('review_incorrect_questions'),
                startIndex: 0,
            });
        }
    };
    
    if (!quizState) return null;

    return (
        <div className="space-y-4">
            <h3 className="flex items-start gap-2 text-md font-bold text-[var(--text-primary)]">
                <CheckBadgeIcon className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5"/>
                <span className="min-w-0 break-words">{t('sidebar_quiz_nav_header')}</span>
            </h3>
            <div className="text-center relative h-7 flex items-center justify-center">
                 <AnimatePresence mode="wait">
                    <motion.h3
                        key={isFinished ? 'score' : 'progress'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, position: 'absolute' }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="text-lg font-bold text-[var(--text-secondary)]"
                    >
                        {isFinished ? `${t('your_score')}: ${score} / ${problems.length}` : `${t('question')} ${currentIndex + 1} / ${problems.length}`}
                    </motion.h3>
                </AnimatePresence>
            </div>
            {isFinished && (
                <div className="space-y-3">
                 <div className="flex items-center bg-[var(--ui-bg)] rounded-lg p-1 text-xs">
                    <button onClick={() => setFilter('all')} className={`flex-1 p-1 rounded ${filter === 'all' ? 'bg-[var(--accent-solid)] text-[var(--accent-solid-text)]' : 'hover:bg-[var(--ui-bg-hover)]'}`}>{t('quiz_nav_all')}</button>
                    <button onClick={() => setFilter('incorrect')} className={`flex-1 p-1 rounded ${filter === 'incorrect' ? 'bg-[var(--error-solid-bg)] text-[var(--error-solid-text)]' : 'hover:bg-[var(--ui-bg-hover)]'}`}>{t('quiz_nav_incorrect')}</button>
                    <button onClick={() => setFilter('unanswered')} className={`flex-1 p-1 rounded ${filter === 'unanswered' ? 'bg-transparent text-[var(--text-secondary)]' : 'hover:bg-[var(--ui-bg-hover)]'}`}>{t('quiz_nav_unanswered')}</button>
                </div>
                {incorrectProblems.length > 0 && (
                    <button onClick={handleReviewIncorrect} className="w-full text-sm px-3 py-2 bg-[var(--error-bg)] text-[var(--error-text)] hover:bg-[var(--error-border)] rounded-lg font-semibold transition-colors">
                        {t('review_incorrect_questions')} ({incorrectProblems.length})
                    </button>
                )}
                </div>
            )}
            <motion.div
              layout
              transition={spring}
              className="grid grid-cols-5 gap-2 rounded-lg bg-black/5 p-3"
            >
              <AnimatePresence>
                {filteredProblems.map(p => {
                    const index = p.originalIndex;
                    const isCurrent = index === currentIndex;
                    const answerState = answers.get(p.id);
                    const isCorrect = answerState === p.answer;
                    
                    let statusIcon = null;
                    if (answerState) {
                        statusIcon = isCorrect ? <CheckIcon className="w-3 h-3"/> : <XMarkIcon className="w-3 h-3"/>;
                    }

                    return (
                        <motion.div 
                          layout
                          key={p.id} 
                          className="relative" 
                          ref={isCurrent ? currentQuestionRef : null}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={spring}
                        >
                          <button
                            onClick={() => goToProblem(index)}
                            className={`h-11 w-full rounded-md text-sm font-bold transition-all flex items-center justify-center gap-1 ${
                                isCurrent ? 'bg-[var(--accent-solid)] text-[var(--accent-solid-text)] ring-2 ring-offset-2 ring-[var(--accent-solid)] ring-offset-[var(--bg-color)]' : 
                                answerState ? (isCorrect ? 'bg-[var(--success-bg)] text-[var(--success-text)]' : 'bg-[var(--error-bg)] text-[var(--error-text)]') :
                                'bg-[var(--bg-translucent)] text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)]'
                            }`}
                          >
                            {index + 1}
                            {isFinished && statusIcon}
                          </button>
                          {flaggedProblems.includes(p.id) && (
                              <div className="absolute -top-1 -right-1 z-10 pointer-events-none">
                                <StarSolidIcon className="w-4 h-4 text-[var(--warning-text)] drop-shadow" />
                              </div>
                          )}
                        </motion.div>
                    );
                })}
              </AnimatePresence>
            </motion.div>
        </div>
    );
};

interface CurrentViewPaneProps extends Omit<SidebarProps, 'onResetNavigate' | 'isOpen' | 'setIsOpen'> {
  flaggedProblems: string[];
}
const CurrentViewPane: React.FC<CurrentViewPaneProps> = React.memo((props) => {
    const { view, onNavigate, activeTocId, flaggedProblems } = props;
    const { t } = useTranslation();
    const { subjectData } = useAppContext();
    const { quizState } = useQuiz();
    
    const { content, key } = useMemo(() => {
        const animationKey = view.type === 'textbook' ? view.chapterId : quizState ? quizState.id : view.type;
        let renderedContent: React.ReactNode = null;

        switch (view.type) {
            case 'textbook':
                const chapterData = subjectData?.textbookData[view.chapterId as keyof typeof subjectData.textbookData];
                if (chapterData) {
                    renderedContent = <ChapterToc chapterId={view.chapterId} chapterTitle={chapterData.title.zh} activeTocId={activeTocId} onNavigate={onNavigate} />;
                }
                break;
            case 'quiz':
                 if (quizState) {
                    renderedContent = <QuizQuestionNavigator 
                                onNavigate={onNavigate}
                                flaggedProblems={flaggedProblems}
                            />;
                }
                break;
            case 'problem':
                renderedContent = <ProblemNavigator problemId={view.id} onNavigate={onNavigate} />;
                break;
            default:
                renderedContent = (
                     <div className="flex items-center gap-3 text-sm font-semibold text-[var(--text-secondary)]">
                        <MapIcon className="w-5 h-5"/>
                        <span className="truncate">{t('app_name')}</span>
                    </div>
                );
        }
        return { content: renderedContent, key: animationKey };
    }, [view, onNavigate, quizState, activeTocId, flaggedProblems, subjectData, t]);

    const paneVariants = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={key}
                variants={paneVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={spring}
            >
                {content}
            </motion.div>
        </AnimatePresence>
    )
});

const CollapsibleSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    isActiveSection: boolean;
}> = ({ title, icon, children, defaultOpen = false, isActiveSection }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen || isActiveSection);

    useEffect(() => {
        if (isActiveSection) {
            setIsOpen(true);
        }
    }, [isActiveSection]);

    return (
        <motion.div variants={itemVariants} layout="position">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                    isActiveSection ? 'text-[var(--accent-text)]' : 'text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)] hover:text-[var(--text-primary)]'
                }`}
            >
                {isActiveSection && (
                    <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 bg-[var(--accent-bg)] rounded-lg"
                        style={{ borderRadius: 8 }}
                        transition={spring}
                    />
                )}
                <div className="relative flex items-center gap-3">
                    {icon}
                    <span className="truncate">{title}</span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 0 : -90 }} transition={spring}>
                    <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{ open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }}
                        transition={spring}
                        className="overflow-hidden"
                    >
                        <motion.div
                            className="pt-2 pl-4 space-y-1 border-l-2 border-[var(--ui-border)] ml-[26px]"
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { view, onNavigate, onResetNavigate, isOpen, setIsOpen } = props;
  const { t } = useTranslation();
  const { flaggedProblems, subjectData, setSubject, theme, setTheme } = useAppContext();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : true);
  
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
  
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
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
  
  return (
      <motion.aside 
        drag={isMobile ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        initial={false}
        variants={sidebarVariants}
        animate={!isMobile || isOpen ? 'open' : 'closed'}
        transition={spring}
        className="fixed inset-y-0 left-0 z-[var(--z-sidebar)] w-80 glass-pane flex flex-col rounded-r-2xl lg:absolute lg:top-0 lg:left-0 lg:h-full lg:rounded-none">
        
            {/* Mobile Header */}
            <div className="lg:hidden relative flex items-center justify-center h-16 px-4 flex-shrink-0 border-b border-[var(--ui-border)]">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--ui-bg)]"
                    aria-label="Close menu"
                >
                    <XMarkIcon className="w-7 h-7" />
                </button>
                <button onClick={() => onResetNavigate({ type: 'home' })} className="text-center">
                    <h1 className="text-lg font-bold text-[var(--text-primary)] whitespace-pre-line leading-tight">
                        {t('app_name')}
                    </h1>
                </button>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block px-6 pt-8 pb-6 flex-shrink-0">
                 <button onClick={() => onResetNavigate({type: 'home'})} className="flex items-center gap-2 text-left">
                    <h1 className="text-xl font-bold text-[var(--text-primary)] whitespace-pre-line leading-tight">{t('app_name')}</h1>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-4 pt-4 lg:pt-0">
                <motion.div
                    layout
                    transition={spring}
                    className="p-4 rounded-2xl bg-black/5 dark:bg-white/10 relative overflow-hidden"
                >
                    <CurrentViewPane {...props} flaggedProblems={flaggedProblems} />
                </motion.div>
                
                 <motion.div
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                 >
                    <CollapsibleSection
                        title={t('navigate')}
                        icon={<CompassIcon className="w-5 h-5" />}
                        isActiveSection={['home', 'overview', 'question_bank_quiz'].includes(view.type)}
                        defaultOpen={true}
                    >
                        <NavItem icon={<HomeIcon className="w-5 h-5"/>} label={t('home')} active={view.type === 'home'} onClick={() => onResetNavigate({type: 'home'})} />
                        <NavItem icon={<ListBulletIcon className="w-5 h-5"/>} label={t('all_questions')} active={view.type === 'overview'} onClick={() => onNavigate({ type: 'overview' })} />
                        <NavItem icon={<CodeBracketIcon className="w-5 h-5"/>} label={t('question_bank_quiz')} active={view.type === 'question_bank_quiz'} onClick={() => onNavigate({ type: 'question_bank_quiz' })} />
                    </CollapsibleSection>
                    
                    <CollapsibleSection title={t('by_chapter')} icon={<FolderIcon className="w-5 h-5"/>} defaultOpen={view.type === 'textbook'} isActiveSection={view.type === 'textbook'}>
                        <div className="space-y-1">
                            {chapterListData.map(chapter => (
                                <NavItem
                                    key={chapter.id}
                                    label={chapter.title.zh}
                                    active={view.type === 'textbook' && view.chapterId === chapter.id}
                                    onClick={() => onNavigate({ type: 'textbook', chapterId: chapter.id })}
                                />
                            ))}
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title={t('tools')} icon={<BriefcaseIcon className="w-5 h-5"/>} isActiveSection={['bookmarks', 'glossary', 'history'].includes(view.type)}>
                        <div className="space-y-1">
                            <NavItem label={t('flagged_for_review')} active={view.type === 'bookmarks'} onClick={() => onNavigate({type: 'bookmarks'})} badgeCount={flaggedProblems.length}/>
                            <NavItem label={t('glossary')} active={view.type === 'glossary'} onClick={() => onNavigate({type: 'glossary'})} />
                            <NavItem label={t('quiz_history')} active={view.type === 'history'} onClick={() => onNavigate({type: 'history'})} />
                        </div>
                    </CollapsibleSection>
                </motion.div>
            </div>

            <div className="mt-auto flex-shrink-0 p-3 border-t border-[var(--ui-border)]">
                <div className="grid grid-cols-3 gap-2">
                    <Tooltip content={theme === 'light' ? t('toggle_dark_mode') : t('toggle_light_mode')}>
                        <motion.button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className="w-full flex items-center justify-center p-2.5 text-sm font-semibold rounded-lg transition-colors text-[var(--text-secondary)] bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] hover:text-[var(--text-primary)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={theme === 'light' ? t('toggle_dark_mode') : t('toggle_light_mode')}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={theme}
                                    initial={{ y: -20, opacity: 0, rotate: -30 }}
                                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    exit={{ y: 20, opacity: 0, rotate: 30 }}
                                    transition={iconSpring}
                                    className="flex items-center justify-center h-5 w-5"
                                >
                                    {theme === 'light' ? <SunIcon className="w-full h-full"/> : <MoonIcon className="w-full h-full"/>}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </Tooltip>
                    
                    <Tooltip content={t('change_subject')}>
                        <motion.button
                            onClick={() => setSubject(null)}
                            className="w-full flex items-center justify-center p-2.5 text-sm font-semibold rounded-lg transition-colors text-[var(--text-secondary)] bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] hover:text-[var(--text-primary)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={t('change_subject')}
                        >
                            <ArrowUturnLeftIcon className="w-5 h-5"/>
                        </motion.button>
                    </Tooltip>
                    
                    <Tooltip content={isFullscreen ? t('exit_fullscreen') : t('enter_fullscreen')}>
                        <motion.button
                            onClick={toggleFullscreen}
                            className="w-full flex items-center justify-center p-2.5 text-sm font-semibold rounded-lg transition-colors text-[var(--text-secondary)] bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-hover)] hover:text-[var(--text-primary)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={isFullscreen ? t('exit_fullscreen') : t('enter_fullscreen')}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isFullscreen ? 'exit' : 'enter'}
                                    initial={{ rotate: -90, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    exit={{ rotate: 90, scale: 0 }}
                                    transition={iconSpring}
                                    className="flex items-center justify-center h-5 w-5"
                                >
                                    {isFullscreen ? <ArrowsPointingInIcon className="w-full h-full" /> : <ArrowsPointingOutIcon className="w-full h-full" />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </Tooltip>
                </div>
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
    className={`relative w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-150 ${
      active
        ? 'text-[var(--accent-solid-text)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)] hover:text-[var(--text-primary)]'
    }`}
  >
    {active && (
      <motion.div
        layoutId="active-nav-indicator"
        className="absolute inset-0 bg-[var(--accent-solid)] rounded-lg shadow-md"
        style={{ borderRadius: 8 }}
        transition={spring}
      />
    )}
    <div className="relative flex items-center gap-3">
        {icon}
        <span className="truncate">{label}</span>
    </div>
    {badgeCount !== undefined && badgeCount > 0 && (
        <span className={`relative text-xs font-bold rounded-full px-2 py-0.5 ${active ? 'bg-white/20 text-[var(--accent-solid-text)]' : 'bg-[var(--accent-bg)] text-[var(--accent-text)]'}`}>
            {badgeCount}
        </span>
    )}
  </motion.button>
);
