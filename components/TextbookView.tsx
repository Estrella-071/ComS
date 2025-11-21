
import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Tooltip } from './Tooltip';
import type { View, GlossaryTerm } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { XMarkIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';
import { useBilingualAnnotation } from '../hooks/useBilingualAnnotation';
import { slugify } from '../utils/textUtils';
import { BackToTopButton } from './common/BackToTopButton';
import { ReadingProgress } from './common/ReadingProgress';

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

const renderWithGlossary = (
    node: React.ReactNode, 
    glossaryMap: Record<string, GlossaryTerm>, 
    glossaryRegex: RegExp,
    seenTerms: Set<string> // Pass seenTerms to track uniqueness within a block
): React.ReactNode => {
    // Short-circuit if no glossary terms exist to avoid expensive tree traversal and regex splitting
    if (Object.keys(glossaryMap).length === 0 || glossaryRegex.source === '(?:)' || glossaryRegex.source === '(?!') {
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
                const lowerPart = part.toLowerCase();
                const termData = glossaryMap[lowerPart];
                
                // Check if term exists AND hasn't been seen in this block yet
                if (termData) {
                    // Optimization: Only highlight if we haven't seen it in this block yet
                    if (seenTerms.has(lowerPart)) {
                        return part; // Already highlighted in this block, return raw text
                    }

                    seenTerms.add(lowerPart); // Mark as seen for this block
                    return (
                        <Tooltip key={i} content={
                            <div className="text-left max-w-xs">
                                <p className="font-bold">{termData.term} ({termData.chinese})</p>
                                <p className="mt-2 text-xs">{termData.definition}</p>
                                <p className="mt-1 text-xs text-[var(--text-subtle)]">{termData.definition_zh}</p>
                            </div>
                        }>
                            <span className="border-b border-dashed border-sky-500/50 dark:border-sky-400/50 cursor-help font-medium text-[var(--text-primary)] hover:bg-[var(--accent-bg)] transition-colors rounded-sm px-0.5 mx-[-0.125rem]">{part}</span>
                        </Tooltip>
                    );
                }
                return part;
            });
        }
        if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
            return React.cloneElement(child, { ...child.props, children: renderWithGlossary(child.props.children, glossaryMap, glossaryRegex, seenTerms) });
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
    
    // Each block element (p, li, h1-h6, etc.) creates a new Set to track "seen" terms
    // This ensures terms are linked once per paragraph/block, avoiding clutter
    const markdownComponents = useMemo(() => ({
        h1: ({ node, ...props }: any) => (
            <h1 id={slugify(getNodeText(node))} className="scroll-mt-32 text-[var(--text-primary)] mb-12 mt-8 font-serif text-4xl md:text-5xl font-bold tracking-tight leading-tight" {...props}>
                {renderWithGlossary(props.children, glossaryMap, glossaryRegex, new Set())}
            </h1>
        ),
        h2: ({ node, ...props }: any) => (
            <h2 id={slugify(getNodeText(node))} className="scroll-mt-32 text-[var(--text-primary)] mt-16 mb-8 font-serif text-2xl md:text-3xl font-bold border-b-2 border-[var(--ui-border)] pb-3 flex items-center gap-3" {...props}>
                <span className="w-1.5 h-8 rounded-full bg-[var(--accent-solid)] inline-block mr-1"></span>
                {renderWithGlossary(props.children, glossaryMap, glossaryRegex, new Set())}
            </h2>
        ),
        h3: ({ node, ...props }: any) => (
            <h3 id={slugify(getNodeText(node))} className="scroll-mt-28 text-[var(--text-primary)] mt-10 mb-4 font-sans text-xl font-bold tracking-wide" {...props}>
                {renderWithGlossary(props.children, glossaryMap, glossaryRegex, new Set())}
            </h3>
        ),
        h4: ({ node, ...props }: any) => (
            <h4 id={slugify(getNodeText(node))} className="scroll-mt-24 text-[var(--text-secondary)] mt-8 mb-3 font-sans text-lg font-semibold italic" {...props}>
                {renderWithGlossary(props.children, glossaryMap, glossaryRegex, new Set())}
            </h4>
        ),
        p: ({children}: {children: React.ReactNode}) => (
            <p className="text-[var(--text-secondary)] mb-6">
                {renderWithGlossary(children, glossaryMap, glossaryRegex, new Set())}
            </p>
        ),
        ul: ({children}: {children: React.ReactNode}) => (
            <ul className="list-disc list-outside ml-6 mb-6 space-y-2 marker:text-[var(--accent-solid)] text-[var(--text-secondary)]">
                {children}
            </ul>
        ),
        ol: ({children}: {children: React.ReactNode}) => (
            <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 marker:text-[var(--accent-solid)] marker:font-bold text-[var(--text-secondary)]">
                {children}
            </ol>
        ),
        li: ({children}: {children: React.ReactNode}) => (
            <li className="pl-1">
                {renderWithGlossary(children, glossaryMap, glossaryRegex, new Set())}
            </li>
        ),
        blockquote: ({children}: {children: React.ReactNode}) => (
            <blockquote className="relative my-8 pl-6 py-4 border-l-4 border-[var(--accent-solid)] bg-[var(--ui-bg)] rounded-r-xl italic text-[var(--text-secondary)] shadow-sm">
                <div>{children}</div>
            </blockquote>
        ),
        code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isBlock = !inline && match;
            
            if (isBlock) {
                return (
                    <div className="relative group my-8 rounded-xl overflow-hidden shadow-xl border border-[var(--ui-border)] bg-[#1e1e1e]">
                         <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/10">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                            </div>
                            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{match[1]}</span>
                        </div>
                        <code className={`${className} block overflow-x-auto p-5 text-gray-200 text-sm font-mono leading-relaxed`} {...props}>
                            {children}
                        </code>
                    </div>
                );
            }
            
            return (
                <code className="bg-[var(--accent-bg)] text-[var(--accent-solid)] px-1.5 py-0.5 rounded-md text-[0.9em] font-mono border border-[var(--ui-border)] font-medium tracking-tight" {...props}>
                    {children}
                </code>
            );
        },
        pre: ({children}: {children: React.ReactNode}) => (
             <pre className="not-prose my-0 bg-transparent p-0">
                {children}
             </pre>
        ),
        a: ({node, ...props}: any) => (
            <a 
                {...props} 
                className="text-[var(--accent-solid)] font-semibold underline decoration-2 decoration-[var(--accent-solid)]/30 hover:decoration-[var(--accent-solid)] underline-offset-2 transition-all"
                target={props.href?.startsWith('http') ? "_blank" : undefined}
                rel={props.href?.startsWith('http') ? "noopener noreferrer" : undefined}
            />
        ),
        hr: () => (
            <div className="my-12 flex items-center justify-center opacity-30">
                <div className="h-px w-1/4 bg-[var(--text-secondary)]"></div>
                <div className="mx-4 text-[var(--text-secondary)] text-xl">***</div>
                <div className="h-px w-1/4 bg-[var(--text-secondary)]"></div>
            </div>
        ),
        table: ({node, ...props}: any) => (
            <div className="my-10 w-full overflow-hidden rounded-xl border border-[var(--ui-border)] shadow-sm bg-[var(--bg-color)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse" {...props} />
                </div>
            </div>
        ),
        thead: ({children}: {children: React.ReactNode}) => (
            <thead className="bg-[var(--ui-bg)] text-[var(--text-primary)] font-bold uppercase tracking-wider text-xs border-b border-[var(--ui-border)]">
                {children}
            </thead>
        ),
        tbody: ({children}: {children: React.ReactNode}) => (
            <tbody className="divide-y divide-[var(--ui-border)]">
                {children}
            </tbody>
        ),
        tr: ({children}: {children: React.ReactNode}) => (
            <tr className="transition-colors hover:bg-[var(--ui-bg-hover)] even:bg-[var(--ui-bg)]/30">
                {children}
            </tr>
        ),
        th: ({children, ...props}: any) => (
            <th className="px-6 py-4 font-semibold text-[var(--text-primary)]" {...props}>{children}</th>
        ),
        td: ({children, ...props}: any) => (
            <td className="px-6 py-4 whitespace-nowrap text-[var(--text-secondary)]" {...props}>
                {renderWithGlossary(children, glossaryMap, glossaryRegex, new Set())}
            </td>
        ),
        img: ({node, ...props}: any) => (
            <figure className="my-10 group">
                <div className="relative rounded-xl overflow-hidden border border-[var(--ui-border)] bg-[var(--ui-bg)]/50 shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                        {...props} 
                        className="w-full max-h-[600px] object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.01]"
                        onClick={() => setZoomImage({ src: props.src, alt: props.alt })}
                    />
                </div>
                {props.alt && (
                    <figcaption className="text-center text-sm text-[var(--text-subtle)] mt-3 font-medium px-4 italic">
                        {props.alt}
                    </figcaption>
                )}
            </figure>
        )
    }), [glossaryMap, glossaryRegex]);

    const containerClasses = ['prose-container', 'h-full', 'overflow-y-auto', 'relative', 'px-4', 'sm:px-8', 'lg:px-12', 'pb-32', readTheme !== 'default' ? `reading-theme-${readTheme}` : ''].join(' ');
    const proseWrapperClasses = ['prose', 'prose-slate', 'dark:prose-invert', 'mx-auto', pageWidth].join(' ');

    return (
      <div className="h-full flex flex-col relative" style={{'--prose-font-size': `${fontSize}px`, '--prose-line-height': lineHeight} as React.CSSProperties}>
          
          <div ref={contentRef} className={containerClasses}>
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
