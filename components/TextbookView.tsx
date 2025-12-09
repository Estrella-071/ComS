
import React, { useState, useRef, useEffect, useMemo } from 'react';
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
        <div className="mt-24 pt-12 border-t border-[var(--ui-border)] flex flex-col sm:flex-row justify-between gap-8">
            {prevChapter ? (
                <button 
                    onClick={() => onNavigate({ type: 'textbook', chapterId: prevChapter.id })} 
                    className="text-left group flex-1 p-6 -mx-6 sm:mx-0 rounded-2xl hover:bg-[var(--ui-bg)] transition-all border border-transparent hover:border-[var(--ui-border)]"
                >
                    <p className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-wider mb-2 group-hover:text-[var(--accent-text)] transition-colors">
                        &larr; {t('previous_chapter')}
                    </p>
                    <p className="font-bold text-[var(--text-primary)] text-xl font-serif group-hover:underline decoration-2 underline-offset-4 decoration-[var(--ui-border)] group-hover:decoration-[var(--accent-solid)] transition-all">
                        {prevChapter.title[language]}
                    </p>
                </button>
            ) : <div className="flex-1"></div>}
            {nextChapter ? (
                <button 
                    onClick={() => onNavigate({ type: 'textbook', chapterId: nextChapter.id })} 
                    className="text-right group flex-1 p-6 -mx-6 sm:mx-0 rounded-2xl hover:bg-[var(--ui-bg)] transition-all border border-transparent hover:border-[var(--ui-border)]"
                >
                    <p className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-wider mb-2 group-hover:text-[var(--accent-text)] transition-colors">
                        {t('next_chapter')} &rarr;
                    </p>
                    <p className="font-bold text-[var(--text-primary)] text-xl font-serif group-hover:underline decoration-2 underline-offset-4 decoration-[var(--ui-border)] group-hover:decoration-[var(--accent-solid)] transition-all">
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
            className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.img
                src={src}
                alt={alt}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl cursor-default object-contain"
                onClick={(e) => e.stopPropagation()}
            />
            <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                aria-label="Close image"
            >
                <XMarkIcon className="w-6 h-6" />
            </button>
            {alt && (
                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                    <span className="inline-block px-4 py-2 rounded-full bg-black/50 text-white text-sm font-medium backdrop-blur-md">
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
        language 
    } = useAppContext();
    const annotate = useBilingualAnnotation();
    const { fontSize, lineHeight, pageWidth, readTheme, initialMode, displayMode } = readingSettings;
    const contentRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({ container: contentRef });
    
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [zoomImage, setZoomImage] = useState<{src: string, alt?: string} | null>(null);

    const { glossaryMap, glossaryRegex } = useMemo(() => {
      if (!glossaryMaps) return { glossaryMap: {}, glossaryRegex: /(?!)/};
      return { glossaryMap: glossaryMaps.glossaryMap, glossaryRegex: glossaryMaps.glossaryRegex };
    }, [glossaryMaps]);
    
    const chapterData = useMemo(() => subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData], [subjectData, chapterId]);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setShowBackToTop(latest > 0.1);
        });
    }, [scrollYProgress]);

    // Optimized Observer
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

    const containerClasses = ['prose-container', 'h-full', 'overflow-y-auto', 'relative', 'px-4', 'sm:px-8', 'lg:px-12', 'pb-32', readTheme !== 'default' ? `reading-theme-${readTheme}` : ''].join(' ');
    const proseWrapperClasses = ['prose', 'prose-slate', 'dark:prose-invert', 'mx-auto', pageWidth].join(' ');

    return (
      <div className="h-full flex flex-col relative" style={{'--prose-font-size': `${fontSize}px`, '--prose-line-height': lineHeight} as React.CSSProperties}>
          
          <div ref={contentRef} className={containerClasses}>
              <EdgeProgressBar containerRef={contentRef} />
              <div className="pt-24 md:pt-32">
                <div 
                  className={proseWrapperClasses}
                  style={{ fontSize: `var(--prose-font-size)`, lineHeight: `var(--prose-line-height)`}}
                >
                    {!chapterData || !subjectData ? (
                        <div className="text-center py-20 text-[var(--text-secondary)]">Chapter not found.</div>
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
                                    <div className="prose-raw font-mono whitespace-pre-wrap text-sm leading-relaxed">
                                        {displayMode === 'en' && contentToRender.en}
                                        {displayMode === 'zh' && contentToRender.zh}
                                        {displayMode === 'bilingual' && interleavedContent.map((item, index) => (
                                            <React.Fragment key={index}>
                                                {language === 'zh' ? (
                                                    <>
                                                        {item.zh && <>{item.zh}{'\n\n'}</>}
                                                        {item.en && <div className="en-translation prose-raw border-l-2 pl-4 my-4 text-[var(--text-secondary)]">{item.en}</div>}
                                                    </>
                                                ) : (
                                                    <>
                                                        {item.en && <>{item.en}{'\n\n'}</>}
                                                        {item.zh && <div className="en-translation prose-raw border-l-2 pl-4 my-4 text-[var(--text-secondary)]">{item.zh}</div>}
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
                                        <React.Fragment key={index}>
                                            {language === 'zh' ? (
                                                <>
                                                    {item.zh && (
                                                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                            {item.zh}
                                                        </ReactMarkdown>
                                                    )}
                                                    {item.en && (
                                                        <div className="en-translation mb-12 pl-6 border-l-4 border-[var(--ui-border)]">
                                                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                                {item.en}
                                                            </ReactMarkdown>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {item.en && (
                                                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                            {item.en}
                                                        </ReactMarkdown>
                                                    )}
                                                    {item.zh && (
                                                        <div className="en-translation mb-12 pl-6 border-l-4 border-[var(--ui-border)]">
                                                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                                {item.zh}
                                                            </ReactMarkdown>
                                                        </div>
                                                    )}
                                                </>
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
          
        <ReadingProgress progress={scrollYProgress} label={chapterData?.title[language]} />
        <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
        
        <AnimatePresence>
            {zoomImage && <ImageModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />}
        </AnimatePresence>
      </div>
    );
};
