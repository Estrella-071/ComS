

import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Tooltip } from './Tooltip';
import type { View, GlossaryTerm } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { XMarkIcon, PlusIcon, MinusIcon, ArrowsRightLeftIcon, CodeBracketIcon, ChevronUpIcon, GlobeAltIcon, Cog6ToothIcon, PencilIcon, SparklesIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { SegmentedControl } from './common/SegmentedControl';
import { useBilingualAnnotation } from '../hooks/useBilingualAnnotation';
import { ToggleSwitch } from './common/ToggleSwitch';

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
                            <div className="text-left max-w-xs">
                                <p className="font-bold">{termData.term} ({termData.chinese})</p>
                                <p className="mt-2 text-xs">{termData.definition}</p>
                                <p className="mt-1 text-xs text-[var(--text-subtle)]">{termData.definition_zh}</p>
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

const ChapterBottomNav: React.FC<{
    chapterId: string;
    onNavigate: (view: View) => void;
}> = ({ chapterId, onNavigate }) => {
    const { t } = useTranslation();
    const { subjectData, language } = useAppContext();
    const chapterListData = subjectData?.chapterList || [];

    const currentChapterIndex = chapterListData.findIndex(c => c.id === chapterId);
    const prevChapter = currentChapterIndex > 0 ? chapterListData[currentChapterIndex - 1] : null;
    const nextChapter = currentChapterIndex < chapterListData.length - 1 ? chapterListData[currentChapterIndex + 1] : null;

    if (!prevChapter && !nextChapter) return null;

    return (
        <div className="mt-12 pt-8 border-t border-[var(--ui-border)] flex justify-between gap-4">
            {prevChapter ? (
                <button onClick={() => onNavigate({ type: 'textbook', chapterId: prevChapter.id })} className="text-left p-4 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors flex-1">
                    <p className="text-sm font-semibold text-[var(--text-secondary)]">{t('previous_chapter')}</p>
                    <p className="font-bold text-[var(--text-primary)] mt-1">{prevChapter.title[language]}</p>
                </button>
            ) : <div className="flex-1"></div>}
            {nextChapter ? (
                <button onClick={() => onNavigate({ type: 'textbook', chapterId: nextChapter.id })} className="text-right p-4 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors flex-1">
                    <p className="text-sm font-semibold text-[var(--text-secondary)]">{t('next_chapter')}</p>
                    <p className="font-bold text-[var(--text-primary)] mt-1">{nextChapter.title[language]}</p>
                </button>
            ) : <div className="flex-1"></div>}
        </div>
    )
}

const ImageModal: React.FC<{ src: string; alt?: string; onClose: () => void }> = ({ src, alt, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={onClose}
        >
            <motion.img
                src={src}
                alt={alt}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-full max-h-full rounded-lg shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
            />
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                <XMarkIcon className="w-8 h-8" />
            </button>
        </motion.div>
    );
}


export const TextbookView: React.FC<TextbookViewProps> = ({ chapterId, setView, setActiveTocId }) => {
    const { t } = useTranslation();
    const { 
        subjectData, 
        glossaryMaps, 
        readingSettings, 
        theme, 
        setTheme, 
        setFontSize,
        setLineHeight,
        setPageWidth,
        setReadTheme,
        setInitialMode,
        setDisplayMode
    } = useAppContext();
    const annotate = useBilingualAnnotation();
    const { fontSize, lineHeight, pageWidth, readTheme, initialMode, displayMode } = readingSettings;
    const contentRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({ container: contentRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [zoomImage, setZoomImage] = useState<{src: string, alt?: string} | null>(null);

    const { glossaryMap, glossaryRegex } = useMemo(() => {
      if (!glossaryMaps) return { glossaryMap: {}, glossaryRegex: new RegExp('a^')};
      return { glossaryMap: glossaryMaps.glossaryMap, glossaryRegex: glossaryMaps.glossaryRegex };
    }, [glossaryMaps]);
    
    const chapterData = useMemo(() => subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData], [subjectData, chapterId]);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setShowBackToTop(latest > 0.1);
        });
    }, [scrollYProgress]);

    useEffect(() => {
        if (!contentRef.current) return;
        const headingElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const observer = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter(e => e.isIntersecting);
            if (visibleEntries.length > 0) {
                visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                setActiveTocId(visibleEntries[0].target.id);
            }
        }, { root: contentRef.current, rootMargin: '0px 0px -85% 0px' });
        headingElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [chapterId, contentRef, setActiveTocId, initialMode, pageWidth, fontSize, displayMode]);

    const scrollToTop = () => contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

    const contentToRender = useMemo(() => {
        if (!chapterData) return { en: '', zh: '' };
        const annotatedZh = annotate(chapterData.content.zh);
        return { en: chapterData.content.en, zh: annotatedZh };
    }, [chapterData, annotate]);
    
    const interleavedContent = useMemo(() => {
      if (displayMode !== 'bilingual') return [];
      if (!contentToRender.zh && !contentToRender.en) return [];
      
      const zhBlocks = contentToRender.zh.split(/\n{2,}/).filter(b => b.trim());
      const enBlocks = contentToRender.en.split(/\n{2,}/).filter(b => b.trim());
      const result: Array<{ zh: string; en: string }> = [];
      const maxLength = Math.max(zhBlocks.length, enBlocks.length);
      for (let i = 0; i < maxLength; i++) {
        result.push({ zh: zhBlocks[i] || '', en: enBlocks[i] || '' });
      }
      return result;
    }, [displayMode, contentToRender]);
    
    const markdownComponents = {
        h1: ({ node, ...props }: any) => <h1 id={slugify(node.children.map((c: any) => c.value || '').join(''))} {...props}>{renderWithGlossary(props.children, glossaryMap, glossaryRegex)}</h1>,
        h2: ({ node, ...props }: any) => <h2 id={slugify(node.children.map((c: any) => c.value || '').join(''))} {...props}>{renderWithGlossary(props.children, glossaryMap, glossaryRegex)}</h2>,
        h3: ({ node, ...props }: any) => <h3 id={slugify(node.children.map((c: any) => c.value || '').join(''))} {...props}>{renderWithGlossary(props.children, glossaryMap, glossaryRegex)}</h3>,
        p: ({children}: {children: React.ReactNode}) => <p>{renderWithGlossary(children, glossaryMap, glossaryRegex)}</p>,
        li: ({children}: {children: React.ReactNode}) => <li>{renderWithGlossary(children, glossaryMap, glossaryRegex)}</li>,
        table: ({node, ...props}: any) => (
            <div className="prose-table-wrapper">
                <table {...props} />
            </div>
        ),
        img: ({node, ...props}: any) => (
            <img 
                {...props} 
                className="cursor-zoom-in hover:shadow-lg transition-shadow duration-200 rounded-lg"
                onClick={() => setZoomImage({ src: props.src, alt: props.alt })}
            />
        )
    };

    const containerClasses = ['prose-container', 'h-full', 'overflow-y-auto', 'relative', 'px-4', 'sm:px-6', 'lg:px-8', 'pb-32', readTheme !== 'default' ? `reading-theme-${readTheme}` : ''].join(' ');
    const proseWrapperClasses = ['prose', 'prose-slate', 'dark:prose-invert', 'mx-auto', pageWidth].join(' ');

    return (
      <div className="h-full flex flex-col relative" style={{'--prose-font-size': `${fontSize}px`, '--prose-line-height': lineHeight} as React.CSSProperties}>
          <motion.div style={{ scaleX }} className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-solid)] origin-left z-20" />
          
          <div ref={contentRef} className={containerClasses}>
              <div className="pt-20">
                <div 
                  className={proseWrapperClasses}
                  style={{ fontSize: `var(--prose-font-size)`, lineHeight: `var(--prose-line-height)`}}
                >
                    {!chapterData || !subjectData ? (
                        <div className="text-center py-10">Chapter not found.</div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${displayMode}-${initialMode}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {initialMode ? (
                                    <div className="prose-raw">
                                        {displayMode === 'en' && contentToRender.en}
                                        {displayMode === 'zh' && contentToRender.zh}
                                        {displayMode === 'bilingual' && interleavedContent.map((item, index) => (
                                            <React.Fragment key={index}>
                                                {item.zh && <>{item.zh}{'\n\n'}</>}
                                                {item.en && <div className="en-translation prose-raw">{item.en}</div>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        {displayMode === 'en' && <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>{contentToRender.en}</ReactMarkdown>}
                                        {displayMode === 'zh' && <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>{contentToRender.zh}</ReactMarkdown>}
                                        {displayMode === 'bilingual' && interleavedContent.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {item.zh && (
                                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                    {item.zh}
                                                </ReactMarkdown>
                                            )}
                                            {item.en && (
                                                <div className="en-translation">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                        {item.en}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </React.Fragment>
                                        ))}
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {chapterData && subjectData && <ChapterBottomNav chapterId={chapterId} onNavigate={setView} />}
                </div>
              </div>
          </div>
          
        <div className="fixed bottom-6 right-6 z-[var(--z-fab)] flex items-end gap-4">
            <AnimatePresence>
                {showBackToTop && (
                  <motion.button onClick={scrollToTop} className="w-12 h-12 bg-[var(--ui-bg)] rounded-full text-[var(--text-primary)] flex items-center justify-center shadow-lg" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Back to top">
                      <ChevronUpIcon className="w-6 h-6" />
                  </motion.button>
                )}
            </AnimatePresence>
            <ReadingSettings 
              isOpen={isSettingsOpen} 
              setIsOpen={setIsSettingsOpen} 
              settings={readingSettings} 
              setters={{
                setFontSize,
                setLineHeight,
                setPageWidth,
                setReadTheme,
                setInitialMode,
                setDisplayMode,
              }}
              theme={theme}
              setTheme={setTheme}
            />
        </div>
        <AnimatePresence>
            {zoomImage && <ImageModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />}
        </AnimatePresence>
      </div>
    );
};

interface ReadingSettingsProps { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; settings: { fontSize: number; lineHeight: number; pageWidth: string; readTheme: string; initialMode: boolean; displayMode: 'en' | 'zh' | 'bilingual'; }; setters: { setFontSize: (size: number) => void; setLineHeight: (height: number) => void; setPageWidth: (width: string) => void; setReadTheme: (theme: string) => void; setInitialMode: (enabled: boolean) => void; setDisplayMode: (mode: 'en' | 'zh' | 'bilingual') => void; }; theme: 'light' | 'dark'; setTheme: (theme: 'light' | 'dark') => void; }

const SettingRow: React.FC<{icon: React.ReactNode, label: string, children: React.ReactNode, layout?: 'stacked' | 'inline'}> = ({ icon, label, children, layout = 'stacked' }) => {
    if (layout === 'inline') {
        return (
            <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap">{icon}<span>{label}</span></label>
                <div>{children}</div>
            </div>
        );
    }
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{icon}<span>{label}</span></label>
            <div>{children}</div>
        </div>
    );
};

const ReadingSettings: React.FC<ReadingSettingsProps> = ({ isOpen, setIsOpen, settings, setters, theme, setTheme }) => {
  const { t } = useTranslation();
  const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };

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
    <div className="relative flex flex-col items-center">
        <motion.div
            variants={{
                open: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' },
                closed: { opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' }
            }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={spring}
            className="absolute bottom-[calc(100%+0.5rem)] right-0 glass-pane rounded-2xl w-80 shadow-xl text-[var(--text-primary)] max-h-[calc(100vh-6rem)] overflow-y-auto"
        >
          <div className="flex justify-between items-center p-4 border-b border-[var(--ui-border)] sticky top-0 bg-[var(--bg-translucent)] backdrop-blur-md z-10">
              <h3 className="font-bold">{t('reading_settings_title')}</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 -m-1 text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)] rounded-full">
                  <XMarkIcon className="w-5 h-5" />
              </button>
          </div>
          <div className="p-4 space-y-6">
              <SettingRow icon={<GlobeAltIcon className="w-5 h-5 text-[var(--text-secondary)]"/>} label={t('reading_settings_language')} layout="inline">
                  <SegmentedControl options={[{ label: t('reading_settings_lang_zh'), value: 'zh' }, { label: t('reading_settings_lang_en'), value: 'en' }, { label: t('reading_settings_lang_bilingual'), value: 'bilingual' }]} value={settings.displayMode} onChange={setters.setDisplayMode} layoutId="display-mode-toggle" />
              </SettingRow>

              <SettingRow icon={<PencilIcon className="w-5 h-5 text-[var(--text-secondary)]"/>} label={`${t('reading_settings_font_size')} (${settings.fontSize}px)`}>
                <input 
                    type="range" 
                    min={MIN_FONT_SIZE} 
                    max={MAX_FONT_SIZE} 
                    value={settings.fontSize}
                    onChange={(e) => setters.setFontSize(Number(e.target.value))}
                    className="w-full"
                />
              </SettingRow>

              <SettingRow icon={<ArrowsRightLeftIcon className="w-5 h-5 text-[var(--text-secondary)] transform rotate-90"/>} label={t('reading_settings_line_height')} layout="inline">
                <SegmentedControl options={[{ label: '1.5', value: '1.5' }, { label: '1.7', value: '1.7' }, { label: '2.0', value: '2.0' }]} value={String(settings.lineHeight)} onChange={(v) => setters.setLineHeight(parseFloat(v))} layoutId="line-height-toggle" />
              </SettingRow>

              <SettingRow icon={<ArrowsRightLeftIcon className="w-5 h-5 text-[var(--text-secondary)]"/>} label={t('reading_settings_page_width')} layout="inline">
                 <SegmentedControl options={[{ label: 'S', value: 'max-w-4xl' }, { label: 'M', value: 'max-w-6xl' }, { label: 'L', value: 'max-w-7xl' }]} value={settings.pageWidth} onChange={setters.setPageWidth} layoutId="page-width-toggle" />
              </SettingRow>
              
              <SettingRow icon={<SparklesIcon className="w-5 h-5 text-[var(--text-secondary)]" />} label={t('reading_settings_theme')} layout="inline">
                <div className="flex items-center gap-2">
                    <button onClick={() => { setTheme('light'); setters.setReadTheme('default'); }} className={`w-8 h-8 rounded-full border border-[var(--ui-border)] bg-[#f4f1ea] ${theme === 'light' && settings.readTheme === 'default' ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-color)] ring-[var(--accent-solid)]' : ''}`}></button>
                    <button onClick={() => setters.setReadTheme('sepia')} className={`w-8 h-8 rounded-full bg-[#DBCDBA] ${settings.readTheme === 'sepia' ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-color)] ring-[var(--accent-solid)]' : ''}`}></button>
                    <button onClick={() => { setTheme('dark'); setters.setReadTheme('default'); }} className={`w-8 h-8 rounded-full border border-[var(--ui-border)] bg-[#1c1917] ${theme === 'dark' && settings.readTheme === 'default' ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-color)] ring-[var(--accent-solid)]' : ''}`}></button>
                </div>
              </SettingRow>
              
              <SettingRow icon={<CodeBracketIcon className="w-5 h-5 text-[var(--text-secondary)]" />} label={t('reading_settings_formatting')} layout="inline">
                  <ToggleSwitch
                      id="initial-mode-toggle"
                      checked={settings.initialMode}
                      onChange={setters.setInitialMode}
                  />
              </SettingRow>
          </div>
        </motion.div>
      <motion.button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center shadow-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Reading settings">
          <AnimatePresence mode="wait">
            <motion.div 
                key={isOpen ? 'close' : 'open'} 
                initial={{ opacity: 0, scale: 0.6, rotate: -45 }} 
                animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                exit={{ opacity: 0, scale: 0.6, rotate: 45 }} 
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Cog6ToothIcon className="w-7 h-7" />}
            </motion.div>
          </AnimatePresence>
      </motion.button>
    </div>
  );
}