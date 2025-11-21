
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
import { XMarkIcon, ChevronUpIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { useBilingualAnnotation } from '../hooks/useBilingualAnnotation';
import { slugify } from '../utils/textUtils';

interface TextbookViewProps {
  chapterId: string;
  setView: (view: View) => void;
  setActiveTocId: (id: string | null) => void;
}

// Helper to extract raw text from a React node tree
const getNodeText = (node: any): string => {
    if (['string', 'number'].includes(typeof node)) return node.toString();
    if (node instanceof Array) return node.map(getNodeText).join('');
    if (typeof node === 'object' && node) {
        // react-markdown AST node structure
        if (node.value) return node.value;
        if (node.children) return getNodeText(node.children);
        // React element props structure
        if (node.props && node.props.children) return getNodeText(node.props.children);
    }
    return '';
};

const renderWithGlossary = (node: React.ReactNode, glossaryMap: Record<string, GlossaryTerm>, glossaryRegex: RegExp): React.ReactNode => {
    // Short-circuit if no glossary terms exist to avoid expensive tree traversal and regex splitting
    // Check for empty map, or specific "match nothing" patterns including '(?!)'
    if (Object.keys(glossaryMap).length === 0 || glossaryRegex.source === 'a^' || glossaryRegex.source === '(?:)' || glossaryRegex.source === '(?!') {
        return node;
    }

    return React.Children.map(node, child => {
        if (typeof child === 'string') {
            const parts = child.split(glossaryRegex);
            // Optimization: If split results in the original string (length 1), return it directly
            if (parts.length === 1) return child;

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
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close image"
            >
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
        language 
    } = useAppContext();
    const annotate = useBilingualAnnotation();
    const { fontSize, lineHeight, pageWidth, readTheme, initialMode, displayMode } = readingSettings;
    const contentRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({ container: contentRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [zoomImage, setZoomImage] = useState<{src: string, alt?: string} | null>(null);

    const { glossaryMap, glossaryRegex } = useMemo(() => {
      // Fallback regex matches nothing: (?!). 
      if (!glossaryMaps) return { glossaryMap: {}, glossaryRegex: /(?!)/};
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
    
    // Memoize markdown components to prevent unnecessary re-renders of the entire markdown tree
    const markdownComponents = useMemo(() => ({
        h1: ({ node, ...props }: any) => <h1 id={slugify(getNodeText(node))} {...props}>{renderWithGlossary(props.children, glossaryMap, glossaryRegex)}</h1>,
        h2: ({ node, ...props }: any) => <h2 id={slugify(getNodeText(node))} {...props}>{renderWithGlossary(props.children, glossaryMap, glossaryRegex)}</h2>,
        h3: ({ node, ...props }: any) => <h3 id={slugify(getNodeText(node))} {...props}>{renderWithGlossary(props.children, glossaryMap, glossaryRegex)}</h3>,
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
    }), [glossaryMap, glossaryRegex]);

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
                                                {language === 'zh' ? (
                                                    <>
                                                        {item.zh && <>{item.zh}{'\n\n'}</>}
                                                        {item.en && <div className="en-translation prose-raw">{item.en}</div>}
                                                    </>
                                                ) : (
                                                    <>
                                                        {item.en && <>{item.en}{'\n\n'}</>}
                                                        {item.zh && <div className="en-translation prose-raw">{item.zh}</div>}
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
                                                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={markdownComponents}>
                                                            {item.en}
                                                        </ReactMarkdown>
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
            {/* Settings is now global in App.tsx, removed from here */}
        </div>
        <AnimatePresence>
            {zoomImage && <ImageModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />}
        </AnimatePresence>
      </div>
    );
};
