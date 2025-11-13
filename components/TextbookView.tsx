
import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Tooltip } from './Tooltip';
import type { View, GlossaryTerm, Problem } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronLeftIcon, XMarkIcon, PlusIcon, MinusIcon, EyeDropperIcon, ArrowsRightLeftIcon, CodeBracketIcon, ChevronUpIcon, GlobeAltIcon, PencilIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';

interface TextbookViewProps {
  chapterId: string;
  setView: (view: View) => void;
  setActiveTocId: (id: string | null) => void;
}

const FONT_SIZE_STEP = 1;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

const stripMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\$\$\n?([\s\S]*?)\n?\$\$/g, '')
    .replace(/\$(.*?)\$/g, '')
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#+\s/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/^-{3,}\s*$/gm, '')
    .replace(/^\s*[-*+]\s/gm, '')
    .replace(/^\s*\d+\.\s/gm, '');
};

const renderWithGlossary = (node: React.ReactNode, glossaryMap: Record<string, GlossaryTerm>, glossaryRegex: RegExp): React.ReactNode => {
    return React.Children.map(node, child => {
        if (typeof child === 'string') {
            const parts = child.split(glossaryRegex);
            return parts.map((part, i) => {
                if (!part) {
                    return part;
                }
                const termData = glossaryMap[part.toLowerCase()];
                if (termData) {
                    return (
                        <Tooltip key={i} content={
                            <div className="text-left">
                                <p className="font-bold">{termData.term} ({termData.chinese})</p>
                                <p className="mt-1 text-xs">{termData.definition}</p>
                            </div>
                        }>
                            <span className="border-b border-dashed border-sky-500/50 dark:border-sky-400/50 cursor-help">{part}</span>
                        </Tooltip>
                    );
                }
                return part;
            });
        }
        if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
            return React.cloneElement(child, { ...child.props, children: renderWithGlossary(child.props.children, glossaryMap, glossaryRegex) });
        }
        return child;
    });
};

export const TextbookView: React.FC<TextbookViewProps> = ({ chapterId, setView, setActiveTocId }) => {
    const { t } = useTranslation();
    const { subjectData } = useAppContext();
    const contentRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({ container: contentRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
    
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.7);
    const [pageWidth, setPageWidth] = useState('max-w-4xl');
    const [readTheme, setReadTheme] = useState('default');
    const [formatMode, setFormatMode] = useState<'formatted' | 'unformatted' | 'text-only'>('formatted');
    const [displayMode, setDisplayMode] = useState<'bilingual' | 'en' | 'zh'>('bilingual');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const { glossaryMap, glossaryRegex, zhToEnMap, glossaryRegexForZh } = useMemo(() => {
        const glossaryData = subjectData?.glossaryData || [];
        // FIX: Type the accumulator in the callback and remove the generic argument to fix "Untyped function calls" error.
        const gMap = glossaryData.reduce((acc: Record<string, GlossaryTerm>, term) => {
            acc[term.term.toLowerCase()] = term;
            return acc;
        }, {});
        const gTerms = glossaryData.map(g => g.term);
        const gRegex = new RegExp(`\\b(${gTerms.join('|')})\\b`, 'gi');
        
        // FIX: Type the accumulator in the callback and remove the generic argument to fix "Untyped function calls" error.
        const zMap = glossaryData.reduce((acc: Record<string, string>, term) => {
            if (term.chinese) acc[term.chinese] = term.term;
            return acc;
        }, {});
        const zTerms = Object.keys(zMap).sort((a, b) => b.length - a.length);
        const zRegex = new RegExp(`(${zTerms.join('|')})`, 'g');

        return { glossaryMap: gMap, glossaryRegex: gRegex, zhToEnMap: zMap, glossaryRegexForZh: zRegex };
    }, [subjectData]);

    const addBilingualAnnotations = (markdown: string) => {
        if (!markdown) return '';
        const parts = markdown.split(/(```[\s\S]*?```|`[^`]*?`)/);
        const processedParts = parts.map((part, index) => {
            if (index % 2 === 1) return part;
            return part.replace(glossaryRegexForZh, (match) => {
                const englishTerm = zhToEnMap[match];
                return englishTerm ? `${match} (${englishTerm})` : match;
            });
        });
        return processedParts.join('');
    };
    
    const chapterData = useMemo(() => subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData], [subjectData, chapterId]);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setShowBackToTop(latest > 0.1);
        });
    }, [scrollYProgress]);

    useEffect(() => {
        if (!contentRef.current) return;
        // FIX: Use NodeList.forEach directly to avoid type issues with Array.from.
        const headingElements = contentRef.current.querySelectorAll('h2, h3');
        const observer = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter(e => e.isIntersecting);
            if (visibleEntries.length > 0) {
                visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                setActiveTocId(visibleEntries[0].target.id);
            }
        }, { root: contentRef.current, rootMargin: '0px 0px -85% 0px' });
        headingElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [chapterId, contentRef, setActiveTocId, formatMode, pageWidth, fontSize, displayMode]);

    const scrollToTop = () => contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

    if (!chapterData || !subjectData) {
        return <div className="text-center py-10">Chapter not found.</div>;
    }
    
    const contentToRender = useMemo(() => {
        const annotatedZh = addBilingualAnnotations(chapterData.content.zh);
        if (formatMode === 'text-only') {
            return { en: stripMarkdown(chapterData.content.en), zh: stripMarkdown(annotatedZh) };
        }
        return { en: chapterData.content.en, zh: annotatedZh };
    }, [formatMode, chapterData.content, addBilingualAnnotations]);
    
    const markdownComponents = {
        h2: ({ node, ...props }: any) => <h2 id={slugify(node.children.map((c: any) => c.value || '').join(''))} {...props} />,
        h3: ({ node, ...props }: any) => <h3 id={slugify(node.children.map((c: any) => c.value || '').join(''))} {...props} />,
        p: ({children}: {children: React.ReactNode}) => <p>{renderWithGlossary(children, glossaryMap, glossaryRegex)}</p>,
        li: ({children}: {children: React.ReactNode}) => <li>{renderWithGlossary(children, glossaryMap, glossaryRegex)}</li>,
    };

    const chapterNumberMatch = chapterId.match(/\d+/);
    const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : null;
    const chapterProblems = chapterNumber ? subjectData.problems.filter(p => p.chapter === chapterNumber) : [];

    const startChapterQuiz = () => {
        if (chapterNumber) {
            setView({ 
                type: 'quiz',
                id: `chapter-${chapterNumber}-${Date.now()}`,
                problems: chapterProblems, 
                title: `${t('chapter')} ${chapterNumber}${t('chapter_unit')}`, 
                startIndex: 0 
            });
        }
    };
    
    const containerClasses = ['prose-container', 'h-full', 'overflow-y-auto', 'relative', 'px-4', 'sm:px-6', 'lg:px-8', 'pb-32', readTheme !== 'default' ? `reading-theme-${readTheme}` : ''].join(' ');
    const proseWrapperClasses = ['prose', 'prose-slate', 'dark:prose-invert', 'mx-auto', pageWidth, formatMode === 'unformatted' ? 'format-hidden' : ''].join(' ');

    return (
      <div className="h-full flex flex-col relative" style={{'--prose-font-size': `${fontSize}px`, '--prose-line-height': lineHeight} as React.CSSProperties}>
          <motion.div style={{ scaleX }} className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-solid)] origin-left z-20" />
          
          <div ref={contentRef} className={containerClasses}>
              <div className="pt-8">
                
                <div 
                  className={proseWrapperClasses}
                  style={{ fontSize: `var(--prose-font-size)`, lineHeight: `var(--prose-line-height)`}}
                >
                    {chapterProblems.length > 0 && chapterNumber && (
                        <button onClick={startChapterQuiz} className="bg-[var(--accent-solid)] text-[var(--accent-solid-text)] font-semibold px-4 py-2 rounded-lg my-4 no-underline hover:bg-[var(--accent-solid-hover)] transition-colors">
                            {t('practice_questions_for_chapter')} {chapterNumber}
                        </button>
                    )}
                    {displayMode === 'en' && <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>{contentToRender.en}</ReactMarkdown>}
                    {displayMode === 'zh' && <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>{contentToRender.zh}</ReactMarkdown>}
                    {displayMode === 'bilingual' && (
                        <>
                            <div lang="zh"><ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>{contentToRender.zh}</ReactMarkdown></div>
                            <hr className="my-12 border-t-2 border-dashed border-[var(--ui-border)]" />
                            <div lang="en"><ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>{contentToRender.en}</ReactMarkdown></div>
                        </>
                    )}
                </div>
              </div>
          </div>
          
        <div className="fixed bottom-6 right-6 z-[var(--z-fab)] flex flex-col items-center gap-4">
            <AnimatePresence>
                {showBackToTop && (
                  <motion.button onClick={scrollToTop} className="w-14 h-14 bg-[var(--ui-bg)] rounded-full text-[var(--text-primary)] flex items-center justify-center shadow-lg" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Back to top">
                      <ChevronUpIcon className="w-7 h-7" />
                  </motion.button>
                )}
            </AnimatePresence>
             <ReadingSettings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} settings={{ fontSize, lineHeight, pageWidth, readTheme, formatMode, displayMode }} setters={{ setFontSize, setLineHeight, setPageWidth, setReadTheme, setFormatMode, setDisplayMode }} />
        </div>
      </div>
    );
};

function SegmentedControl<T extends string>({ options, value, onChange, layoutId }: { options: Array<{ label: string; value: T }>, value: T, onChange: (value: T) => void, layoutId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="flex items-center space-x-1 rounded-lg bg-[var(--ui-bg)] p-1 w-full">
      {options.map((option, i) => (
        <button key={option.value} onClick={() => onChange(option.value)} className={`relative flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors`}>
          {value === option.value && (
            <motion.div layoutId={layoutId} className="absolute inset-0 z-0 cursor-grab rounded-md bg-[var(--accent-solid)] shadow-sm" transition={{ type: 'spring', stiffness: 350, damping: 30 }} drag="x" dragConstraints={containerRef} dragElastic={0.2} onDragEnd={(event, info) => { if (!containerRef.current) return; const { width } = containerRef.current.getBoundingClientRect(); const optionWidth = width / options.length; const newIndex = Math.round((info.offset.x + i * optionWidth) / optionWidth); const clampedIndex = Math.max(0, Math.min(options.length - 1, newIndex)); onChange(options[clampedIndex].value); }} whileTap={{ cursor: 'grabbing' }} />
          )}
          <span className={`relative z-10 transition-colors ${value === option.value ? 'text-[var(--accent-solid-text)]' : 'text-[var(--text-secondary)]'}`}>{option.label}</span>
        </button>
      ))}
    </div>
  );
}

interface ReadingSettingsProps { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; settings: { fontSize: number; lineHeight: number; pageWidth: string; readTheme: string; formatMode: 'formatted' | 'unformatted' | 'text-only'; displayMode: 'en' | 'zh' | 'bilingual'; }; setters: { setFontSize: (size: number) => void; setLineHeight: (height: number) => void; setPageWidth: (width: string) => void; setReadTheme: (theme: string) => void; setFormatMode: (mode: 'formatted' | 'unformatted' | 'text-only') => void; setDisplayMode: (mode: 'en' | 'zh' | 'bilingual') => void; } }
const ReadingSettings: React.FC<ReadingSettingsProps> = ({ isOpen, setIsOpen, settings, setters }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <motion.button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center shadow-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Reading settings">
          <AnimatePresence mode="wait"><motion.div key={isOpen ? 'close' : 'open'} initial={{ scale: 0, opacity: 0, rotate: -90 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0, opacity: 0, rotate: 90 }}>{isOpen ? <XMarkIcon className="w-7 h-7" /> : <PencilIcon className="w-7 h-7" />}</motion.div></AnimatePresence>
      </motion.button>
      <AnimatePresence>
          {isOpen && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-[calc(100%+1rem)] right-0 glass-pane rounded-xl w-80 p-4 shadow-xl text-[var(--text-primary)]">
                  <div className="space-y-4">
                       <SettingRow icon={<GlobeAltIcon className="w-5 h-5" />} label={t('reading_settings_language')}><SegmentedControl options={[{ label: t('reading_settings_lang_zh'), value: 'zh' }, { label: t('reading_settings_lang_en'), value: 'en' }, { label: t('reading_settings_lang_bilingual'), value: 'bilingual' }]} value={settings.displayMode} onChange={setters.setDisplayMode} layoutId="display-mode-toggle" /></SettingRow>
                      <SettingRow icon={<PencilIcon className="w-5 h-5"/>} label={t('reading_settings_font_size')}><button onClick={() => setters.setFontSize(Math.max(MIN_FONT_SIZE, settings.fontSize - FONT_SIZE_STEP))} className="setting-btn"><MinusIcon className="w-4 h-4"/></button><span className="text-sm font-semibold w-12 text-center tabular-nums">{settings.fontSize}px</span><button onClick={() => setters.setFontSize(Math.min(MAX_FONT_SIZE, settings.fontSize + FONT_SIZE_STEP))} className="setting-btn"><PlusIcon className="w-4 h-4"/></button></SettingRow>
                      <SettingRow icon={<ArrowsRightLeftIcon className="w-5 h-5 -rotate-45" />} label={t('reading_settings_line_height')}>{[1.5, 1.7, 2.0].map(h => <button key={h} onClick={() => setters.setLineHeight(h)} className={`setting-btn w-auto px-3 text-sm tabular-nums ${settings.lineHeight === h ? 'active' : ''}`}>{h.toFixed(1)}</button>)}</SettingRow>
                      <SettingRow icon={<ArrowsRightLeftIcon className="w-5 h-5" />} label={t('reading_settings_page_width')}> {[{l: 'S', v: 'max-w-2xl'}, {l: 'M', v: 'max-w-4xl'}, {l: 'L', v: 'max-w-7xl'}].map(w => <button key={w.l} onClick={() => setters.setPageWidth(w.v)} className={`setting-btn text-sm ${settings.pageWidth === w.v ? 'active' : ''}`}>{w.l}</button>)}</SettingRow>
                      <SettingRow icon={<EyeDropperIcon className="w-5 h-5" />} label={t('reading_settings_theme')}><button onClick={() => setters.setReadTheme('default')} className={`w-8 h-8 rounded-full border border-gray-400 bg-[#f5f3ef] ${settings.readTheme === 'default' ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-color)] ring-[var(--accent-solid)]' : ''}`}></button><button onClick={() => setters.setReadTheme('sepia')} className={`w-8 h-8 rounded-full bg-[#f4e9d8] ${settings.readTheme === 'sepia' ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-color)] ring-[var(--accent-solid)]' : ''}`}></button><button onClick={() => setters.setReadTheme('dark')} className={`w-8 h-8 rounded-full bg-[#1a1a1a] ${settings.readTheme === 'dark' ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-color)] ring-[var(--accent-solid)]' : ''}`}></button></SettingRow>
                      <div className="flex flex-col gap-2 pt-2"><div className="flex items-center gap-2"><CodeBracketIcon className="w-5 h-5" /><span className="text-sm font-medium">{t('reading_settings_formatting')}</span></div><SegmentedControl options={[{ label: t('reading_settings_format_mode_formatted'), value: 'formatted' }, { label: t('reading_settings_format_mode_unformatted'), value: 'unformatted' }, { label: t('reading_settings_format_mode_text_only'), value: 'text-only' }]} value={settings.formatMode} onChange={setters.setFormatMode} layoutId="format-mode-toggle" /></div>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
      <style>{`.setting-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background-color: var(--ui-bg); transition: background-color 0.2s, color 0.2s; font-weight: 600; } .setting-btn:hover { background-color: var(--ui-bg-hover); } .setting-btn.active { background-color: var(--accent-solid); color: var(--accent-solid-text); }`}</style>
    </>
  );
}
const SettingRow: React.FC<{icon: React.ReactNode, label: string, children: React.ReactNode}> = ({ icon, label, children }) => (
    <div className="grid grid-cols-2 items-center gap-2"><div className="flex items-center gap-2">{icon}<span className="text-sm font-medium">{label}</span></div><div className="flex items-center justify-end gap-1.5">{children}</div></div>
);
