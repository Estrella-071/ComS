
import React, { useState, useRef, useEffect, useMemo, useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { View } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { XMarkIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { useBilingualAnnotation } from '../hooks/useBilingualAnnotation';
import { BackToTopButton } from './common/BackToTopButton';
import { ReadingProgress } from './common/ReadingProgress';
import { useMarkdownComponents } from '../hooks/useMarkdownComponents';
import { EdgeProgressBar } from './common/EdgeProgressBar';

interface TextbookViewProps {
  chapterId: string;
  setView: (view: View) => void;
  setActiveTocId: (id: string | null) => void;
}

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
        <div className="mt-32 pt-16 border-t border-[var(--ui-border)] flex flex-col sm:flex-row justify-between gap-8">
            {prevChapter ? (
                <button 
                    onClick={() => onNavigate({ type: 'textbook', chapterId: prevChapter.id })} 
                    className="text-left group flex-1 p-8 -mx-8 sm:mx-0 rounded-[2rem] hover:bg-[var(--ui-bg)] transition-all border border-transparent hover:border-[var(--ui-border)]"
                >
                    <p className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-widest mb-3 group-hover:text-[var(--accent-text)] transition-colors">
                        &larr; {t('previous_chapter')}
                    </p>
                    <p className="font-bold text-[var(--text-primary)] text-2xl font-serif group-hover:translate-x-2 transition-transform">
                        {prevChapter.title[language]}
                    </p>
                </button>
            ) : <div className="flex-1"></div>}
            {nextChapter ? (
                <button 
                    onClick={() => onNavigate({ type: 'textbook', chapterId: nextChapter.id })} 
                    className="text-right group flex-1 p-8 -mx-8 sm:mx-0 rounded-[2rem] hover:bg-[var(--ui-bg)] transition-all border border-transparent hover:border-[var(--ui-border)]"
                >
                    <p className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-widest mb-3 group-hover:text-[var(--accent-text)] transition-colors">
                        {t('next_chapter')} &rarr;
                    </p>
                    <p className="font-bold text-[var(--text-primary)] text-2xl font-serif group-hover:-translate-x-2 transition-transform">
                        {nextChapter.title[language]}
                    </p>
                </button>
            ) : <div className="flex-1"></div>}
        </div>
    )
}

const ImageModal: React.FC<{ src: string; alt?: string; onClose: () => void }> = ({ src, alt, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-md"
            onClick={onClose}
        >
            <motion.img
                src={src}
                alt={alt}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl cursor-default object-contain border border-white/10"
                onClick={(e) => e.stopPropagation()}
            />
            <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
                aria-label="Close image"
            >
                <XMarkIcon className="w-6 h-6" />
            </button>
            {alt && (
                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                    <span className="inline-block px-5 py-2.5 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur-md border border-white/10">
                        {alt}
                    </span>
                </div>
            )}
        </motion.div>
    );
}

export const TextbookView: React.FC<TextbookViewProps> = ({ chapterId, setView, setActiveTocId }) => {
    const {
        subjectData, 
        glossaryMaps, 
        readingSettings, 
        language,
        setLastActiveChapterId 
    } = useAppContext();
    const annotate = useBilingualAnnotation();
    const { fontSize, lineHeight, pageWidth, readTheme, initialMode, displayMode } = readingSettings;
    const contentRef = useRef<HTMLDivElement>(null);
    const centerElementRef = useRef<HTMLElement | null>(null);
    
    const { scrollYProgress } = useScroll({ container: contentRef });
    
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [zoomImage, setZoomImage] = useState<{src: string, alt?: string} | null>(null);

    const { glossaryMap, glossaryRegex } = useMemo(() => {
      if (!glossaryMaps) return { glossaryMap: {}, glossaryRegex: /(?!)/};
      return { glossaryMap: glossaryMaps.glossaryMap, glossaryRegex: glossaryMaps.glossaryRegex };
    }, [glossaryMaps]);
    
    const chapterData = useMemo(() => subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData], [subjectData, chapterId]);

    // Update last active chapter
    useEffect(() => {
        if (chapterId) {
            setLastActiveChapterId(chapterId);
        }
    }, [chapterId, setLastActiveChapterId]);

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
        }, { root: contentRef.current, rootMargin: '-10% 0px -80% 0px' }); 
        headingElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [chapterId, contentRef, setActiveTocId, initialMode, displayMode]);

    // Scroll Locking Logic to prevent disorienting jumps when width changes
    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            // Find element closest to vertical center
            const centerY = contentRef.current.getBoundingClientRect().top + contentRef.current.clientHeight / 2;
            // Target block elements that contain content
            const elements = contentRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
            
            let closest = null;
            let minDiff = Infinity;

            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2;
                const diff = Math.abs(centerY - elCenter);
                if (diff < minDiff) {
                    minDiff = diff;
                    closest = el;
                }
            });
            
            if (closest) {
                centerElementRef.current = closest as HTMLElement;
            }
        };

        const container = contentRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    // Restore scroll position after layout changes (width, font size, line height)
    useLayoutEffect(() => {
        if (centerElementRef.current) {
             centerElementRef.current.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
    }, [pageWidth, fontSize, lineHeight, displayMode]);


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
    
    const markdownComponents = useMarkdownComponents(glossaryMap, glossaryRegex, setZoomImage);

    const themeClasses = readTheme !== 'default' ? `reading-theme-${readTheme}` : '';
    
    const containerClasses = [
        'prose-container', 
        'h-full', 
        'overflow-y-auto', 
        'relative', 
        'custom-scrollbar',
        'scroll-smooth'
    ].join(' ');

    return (
      <div className="h-full flex flex-col relative w-full" style={{'--prose-font-size': `${fontSize}px`, '--prose-line-height': lineHeight} as React.CSSProperties}>
          
          <div ref={contentRef} className={containerClasses}>
              <EdgeProgressBar containerRef={contentRef} />
              
              <div className="min-h-full py-20 md:py-32 px-4 sm:px-6 md:px-12 flex justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`
                    w-full ${pageWidth} ${themeClasses} layout-transition
                    glass-pane rounded-[2.5rem] p-8 md:p-20 lg:p-24 shadow-2xl border border-[var(--ui-border)]
                    bg-[var(--bg-translucent)] backdrop-blur-2xl relative
                `}>
                    
                    <div className="absolute top-10 right-10 opacity-10 font-mono text-8xl font-bold select-none pointer-events-none text-[var(--text-primary)]">
                         {chapterId.replace(/\D/g, '').padStart(2, '0')}
                    </div>

                    <div className="absolute top-10 left-10 flex items-center gap-3 opacity-40 pointer-events-none select-none text-[var(--text-primary)]">
                         <div className="h-px w-16 bg-[var(--text-primary)]"></div>
                         <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">Reading Mode</span>
                    </div>

                    <div 
                      className="prose prose-slate dark:prose-invert mx-auto max-w-none mt-8"
                      style={{ fontSize: `var(--prose-font-size)`, lineHeight: `var(--prose-line-height)`}}
                    >
                        {!chapterData || !subjectData ? (
                            <div className="text-center py-20 text-[var(--text-secondary)]">Chapter not found.</div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${displayMode}-${initialMode}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {initialMode ? (
                                        <div className="prose-raw font-mono whitespace-pre-wrap text-sm leading-relaxed p-6 bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)]">
                                            {displayMode === 'en' && contentToRender.en}
                                            {displayMode === 'zh' && contentToRender.zh}
                                            {displayMode === 'bilingual' && interleavedContent.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    {language === 'zh' ? (
                                                        <>
                                                            {item.zh && <>{item.zh}{'\n\n'}</>}
                                                            {item.en && <div className="en-translation prose-raw border-l-2 pl-4 my-6 text-[var(--text-secondary)]">{item.en}</div>}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {item.en && <>{item.en}{'\n\n'}</>}
                                                            {item.zh && <div className="en-translation prose-raw border-l-2 pl-4 my-6 text-[var(--text-secondary)]">{item.zh}</div>}
                                                        </>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            {displayMode === 'en' && <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>{contentToRender.en}</ReactMarkdown>}
                                            {displayMode === 'zh' && <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>{contentToRender.zh}</ReactMarkdown>}
                                            {displayMode === 'bilingual' && interleavedContent.map((item, index) => (
                                            <div key={index} className="mb-12 relative group">
                                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--ui-border)] to-transparent opacity-0 group-hover:opacity-50 transition-opacity rounded-full -ml-6 hidden md:block"></div>
                                                
                                                {language === 'zh' ? (
                                                    <>
                                                        {item.zh && (
                                                            <div className="mb-4">
                                                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                                    {item.zh}
                                                                </ReactMarkdown>
                                                            </div>
                                                        )}
                                                        {item.en && (
                                                            <div className="en-translation">
                                                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                                    {item.en}
                                                                </ReactMarkdown>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {item.en && (
                                                            <div className="mb-4">
                                                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                                    {item.en}
                                                                </ReactMarkdown>
                                                            </div>
                                                        )}
                                                        {item.zh && (
                                                            <div className="en-translation">
                                                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                                    {item.zh}
                                                                </ReactMarkdown>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            ))}
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {chapterData && subjectData && <ChapterBottomNav chapterId={chapterId} onNavigate={setView} />}
                    </div>
                </motion.div>
              </div>
          </div>
          
        <ReadingProgress progress={scrollYProgress} label={chapterData?.title[language]} />
        <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
        
        <AnimatePresence>
            {zoomImage && <ImageModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />}
        </AnimatePresence>
      </div>
    );
};
