




import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { View } from '../types';
import { SparklesIcon, XMarkIcon, ListBulletIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ArrowsRightLeftIcon, PencilSquareIcon, CheckBadgeIcon, CheckIcon, StarSolidIcon, MapIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { useQuiz } from '../contexts/QuizContext';

// Animation Constants
const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };
const listVariants = {
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
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
    y: 5,
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

const ExerciseNavigator: React.FC<{ exerciseId: string; onNavigate: (view: View) => void; }> = ({ exerciseId, onNavigate }) => {
    const { t } = useTranslation();
    const { subjectData } = useAppContext();
    const exerciseData = subjectData?.exercises || [];
    const exerciseIndex = exerciseData.findIndex(e => e.id === exerciseId);
    if (exerciseIndex === -1) return null;
            
    const hasPrev = exerciseIndex > 0;
    const hasNext = exerciseIndex < exerciseData.length - 1;
    const navigateExercise = (dir: number) => {
        const newIndex = exerciseIndex + dir;
        if (newIndex >= 0 && newIndex < exerciseData.length) {
            onNavigate({ type: 'exercise', id: exerciseData[newIndex].id });
        }
    };
    return (
        <div className="space-y-4">
            <h3 className="flex items-start gap-2 text-md font-bold text-[var(--text-primary)]">
                <PencilSquareIcon className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5"/>
                <span className="min-w-0 break-words">{t('sidebar_exercise_nav_header')}</span>
            </h3>
            <div className="flex justify-between gap-2">
                <button onClick={() => navigateExercise(-1)} disabled={!hasPrev} className="flex items-center gap-1.5 px-4 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] text-sm w-full justify-center">
                    <ChevronLeftIcon className="w-4 h-4" /> {t('previous_question')}
                </button>
                <button onClick={() => navigateExercise(1)} disabled={!hasNext} className="flex items-center gap-1.5 px-4 py-2 bg-[var(--ui-bg)] text-[var(--text-secondary)] rounded-lg disabled:opacity-50 hover:bg-[var(--ui-bg-hover)] text-sm w-full justify-center">
                    {t('next_question')} <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

const ChapterToc: React.FC<{ chapterId: string; chapterTitle: string; activeTocId: string | null; onNavigate: (view: View) => void;}> = ({ chapterId, chapterTitle, activeTocId, onNavigate }) => {
    const { t } = useTranslation();
    const { subjectData, language } = useAppContext();
    
    interface H3Heading { title: string; slug: string; }
    interface H2Heading { title: string; slug: string; children: H3Heading[]; }
    
    const [toc, setToc] = useState<H2Heading[]>([]);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const chapterContent = language === 'zh' 
        ? subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData]?.content.zh
        : subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData]?.content.en;
    
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
  flaggedItems: string[];
}> = ({ onNavigate, flaggedItems }) => {
    const { t } = useTranslation();
    const { quizState, currentIndex, answers, isFinished, goToProblem } = useQuiz();
    const [filter, setFilter] = useState<'all' | 'incorrect' | 'unanswered'>('all');
    const currentQuestionRef = React.useRef<HTMLDivElement>(null);

    const { score, problems } = useMemo(() => {
        if (!quizState) return { score: 0, problems: [] };
        const newScore = Array.from(answers).reduce((count: number, [id, answer]) => {
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
                          {flaggedItems.includes(p.id) && (
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

interface CurrentViewPaneProps {
  view: View; 
  onNavigate: (view: View) => void;
  activeTocId?: string | null;
  flaggedItems: string[];
}
const CurrentViewPane: React.FC<CurrentViewPaneProps> = React.memo((props) => {
    const { view, onNavigate, activeTocId, flaggedItems } = props;
    const { t } = useTranslation();
    const { subjectData, language } = useAppContext();
    const { quizState } = useQuiz();
    
    const { content, key } = useMemo(() => {
        let animationKey: string | number = view.type;
        if (view.type === 'textbook') animationKey = view.chapterId;
        else if (view.type === 'quiz' && quizState) animationKey = quizState.id;
        else if (view.type === 'problem') animationKey = view.id;
        else if (view.type === 'exercise') animationKey = view.id;
        
        let renderedContent: React.ReactNode = null;

        switch (view.type) {
            case 'textbook':
                const chapterData = subjectData?.textbookData[view.chapterId as keyof typeof subjectData.textbookData];
                if (chapterData) {
                    renderedContent = <ChapterToc chapterId={view.chapterId} chapterTitle={chapterData.title[language]} activeTocId={activeTocId} onNavigate={onNavigate} />;
                }
                break;
            case 'quiz':
                 if (quizState) {
                    renderedContent = <QuizQuestionNavigator 
                                onNavigate={onNavigate}
                                flaggedItems={flaggedItems}
                            />;
                }
                break;
            case 'problem':
                renderedContent = <ProblemNavigator problemId={view.id} onNavigate={onNavigate} />;
                break;
            case 'exercise':
                renderedContent = <ExerciseNavigator exerciseId={view.id} onNavigate={onNavigate} />;
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
    }, [view, onNavigate, quizState, activeTocId, flaggedItems, subjectData, t, language]);

    const paneVariants = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -15 },
    };
    
    const paneTransition = { type: 'spring' as const, stiffness: 300, damping: 30 };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={key}
                variants={paneVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={paneTransition}
            >
                {content}
            </motion.div>
        </AnimatePresence>
    )
});


interface FloatingContextualPaneProps {
  view: View; 
  onNavigate: (view: View) => void;
  activeTocId?: string | null;
}

export const FloatingContextualPane: React.FC<FloatingContextualPaneProps> = (props) => {
    const { flaggedItems } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    const paneVariants = {
        closed: { x: '100%' },
        open: { x: 0 },
    };

    return (
        <div className="fixed top-0 right-0 h-full z-[var(--z-fab)] pointer-events-none lg:p-6 lg:pr-0">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-10 pointer-events-auto w-14 h-14 bg-[var(--accent-solid)] text-[var(--accent-solid-text)] rounded-full flex items-center justify-center shadow-lg"
                        aria-label="Open Smart Features"
                    >
                        <SparklesIcon className="w-7 h-7" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        variants={paneVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={spring}
                        className="w-80 h-full glass-pane rounded-2xl flex flex-col pointer-events-auto"
                    >
                        <div className="relative flex items-center justify-between h-16 px-4 flex-shrink-0 border-b border-[var(--ui-border)]">
                            <h2 className="text-lg font-bold text-[var(--text-primary)]">智慧功能</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--ui-bg)]"
                                aria-label="Close smart features"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-black/5 dark:bg-white/10">
                            <CurrentViewPane {...props} flaggedItems={flaggedItems} />
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};