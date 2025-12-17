
import React, { useMemo } from 'react';
import { Tooltip } from '../components/Tooltip';
import { slugify } from '../utils/textUtils';
import type { GlossaryTerm } from '../types';
import { LinkIcon } from '../components/icons';

// Helper to extract raw text from a React node tree
const getNodeText = (node: any): string => {
    if (['string', 'number'].includes(typeof node)) return node.toString();
    if (node instanceof Array) return node.map(getNodeText).join('');
    if (typeof node === 'object' && node) {
        if (node.value) return node.value;
        if (node.children) return getNodeText(node.children);
        if (node.props && node.props.children) return getNodeText(node.props.children);
    }
    return '';
};

const HeaderLink: React.FC<{ id: string }> = ({ id }) => (
    <a 
        href={`#${id}`} 
        className="ml-2 opacity-0 group-hover:opacity-100 text-[var(--text-subtle)] hover:text-[var(--accent-solid)] transition-opacity duration-200 inline-flex items-center align-middle"
        aria-label="Link to section"
    >
        <LinkIcon className="w-4 h-4" />
    </a>
);

// Optimized recursive renderer
const renderWithGlossary = (
    node: React.ReactNode, 
    glossaryMap: Record<string, GlossaryTerm>, 
    glossaryRegex: RegExp,
    seenTerms: Set<string>
): React.ReactNode => {
    // Short-circuit if no glossary terms or regex is effectively empty
    if (Object.keys(glossaryMap).length === 0 || glossaryRegex.source === '(?:)' || glossaryRegex.source === '(?!') {
        return node;
    }

    return React.Children.map(node, child => {
        if (typeof child === 'string') {
            // Optimization: Skip short strings to avoid regex overhead
            if (child.length < 3) return child;
            
            // Optimization: Check if string potentially contains any match before splitting
            if (!glossaryRegex.test(child)) return child;
            
            // Reset regex lastIndex because we just tested it (if global flag is set)
            glossaryRegex.lastIndex = 0;

            const parts = child.split(glossaryRegex);
            if (parts.length === 1) return child;

            return parts.map((part, i) => {
                if (!part) return part;
                
                const lowerPart = part.toLowerCase();
                const termData = glossaryMap[lowerPart];
                
                if (termData) {
                    if (seenTerms.has(lowerPart)) {
                        return part; // Already highlighted in this block
                    }

                    seenTerms.add(lowerPart);
                    return (
                        <Tooltip key={`${i}-${part}`} content={
                            <div className="text-left max-w-xs">
                                <p className="font-bold font-serif text-base">{termData.term} <span className="text-[var(--text-secondary)] font-normal text-sm">({termData.chinese})</span></p>
                                <p className="mt-2 text-sm leading-relaxed text-gray-200">{termData.definition}</p>
                                <p className="mt-1 text-xs text-gray-400 border-t border-gray-600 pt-1 mt-2">{termData.definition_zh}</p>
                            </div>
                        }>
                            <span className="border-b-[1.5px] border-dotted border-[var(--accent-solid)]/40 cursor-help font-medium text-[var(--text-primary)] hover:bg-[var(--accent-bg)] hover:border-transparent transition-all rounded-sm px-0.5 mx-[-0.125rem] decoration-clone">{part}</span>
                        </Tooltip>
                    );
                }
                return part;
            });
        }
        
        if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
            return React.cloneElement(child, { 
                ...child.props, 
                children: renderWithGlossary(child.props.children, glossaryMap, glossaryRegex, seenTerms) 
            });
        }
        return child;
    });
};

export const useMarkdownComponents = (
    glossaryMap: Record<string, GlossaryTerm>, 
    glossaryRegex: RegExp,
    setZoomImage: (img: {src: string, alt?: string} | null) => void
) => {
    return useMemo(() => ({
        h1: ({ node, ...props }: any) => {
            const id = slugify(getNodeText(node));
            return (
                <h1 id={id} className="group scroll-mt-32 text-[var(--text-primary)] mb-12 mt-8 font-serif text-4xl md:text-5xl font-bold tracking-tight leading-tight relative" {...props}>
                    {renderWithGlossary(props.children, glossaryMap, glossaryRegex, new Set())}
                    <HeaderLink id={id} />
                </h1>
            );
        },
        h2: ({ node, ...props }: any) => {
            const id = slugify(getNodeText(node));
            return (
                <h2 id={id} className="group scroll-mt-32 text-[var(--text-primary)] mt-16 mb-8 font-serif text-2xl md:text-3xl font-bold border-b border-[var(--ui-border)] pb-3 flex items-baseline gap-2" {...props}>
                    <span className="text-[var(--accent-solid)] opacity-40 text-lg mr-1 font-sans">#</span>
                    <span className="flex-1">{renderWithGlossary(props.children, glossaryMap, glossaryRegex, new Set())}</span>
                    <HeaderLink id={id} />
                </h2>
            );
        },
        h3: ({ node, ...props }: any) => {
            const id = slugify(getNodeText(node));
            return (
                <h3 id={id} className="group scroll-mt-28 text-[var(--text-primary)] mt-10 mb-4 font-sans text-xl font-bold tracking-wide flex items-center" {...props}>
                    {renderWithGlossary(props.children, glossaryMap, glossaryRegex, new Set())}
                    <HeaderLink id={id} />
                </h3>
            );
        },
        h4: ({ node, ...props }: any) => (
            <h4 id={slugify(getNodeText(node))} className="scroll-mt-24 text-[var(--text-secondary)] mt-8 mb-3 font-sans text-lg font-semibold" {...props}>
                {renderWithGlossary(props.children, glossaryMap, glossaryRegex, new Set())}
            </h4>
        ),
        p: ({children}: {children: React.ReactNode}) => (
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                {renderWithGlossary(children, glossaryMap, glossaryRegex, new Set())}
            </p>
        ),
        ul: ({children}: {children: React.ReactNode}) => (
            <ul className="list-disc list-outside ml-6 mb-6 space-y-2 marker:text-[var(--text-subtle)] text-[var(--text-secondary)]">
                {children}
            </ul>
        ),
        ol: ({children}: {children: React.ReactNode}) => (
            <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 marker:text-[var(--text-primary)] marker:font-bold text-[var(--text-secondary)]">
                {children}
            </ol>
        ),
        li: ({children}: {children: React.ReactNode}) => (
            <li className="pl-1">
                {renderWithGlossary(children, glossaryMap, glossaryRegex, new Set())}
            </li>
        ),
        blockquote: ({children}: {children: React.ReactNode}) => (
            <blockquote className="relative my-8 pl-6 py-1 border-l-4 border-[var(--accent-solid)] bg-[var(--ui-bg)] rounded-r-lg italic text-[var(--text-secondary)]">
                <div className="py-4 pr-4">{children}</div>
            </blockquote>
        ),
        code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isBlock = !inline && match;
            
            if (isBlock) {
                return (
                    <div className="relative group my-8 rounded-lg overflow-hidden shadow-lg border border-[var(--ui-border)] bg-[#1e1e1e]">
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
                <code className="bg-[var(--accent-bg)] text-[var(--text-primary)] px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-[var(--ui-border)] tracking-tight whitespace-pre-wrap break-words" {...props}>
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
            <div className="my-16 flex items-center justify-center opacity-30">
                <div className="h-px w-24 bg-[var(--text-secondary)]"></div>
                <div className="mx-4 text-[var(--text-secondary)] text-xl tracking-[0.5em]">***</div>
                <div className="h-px w-24 bg-[var(--text-secondary)]"></div>
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
            <tr className="transition-colors hover:bg-[var(--ui-bg-hover)]">
                {children}
            </tr>
        ),
        th: ({children, ...props}: any) => (
            <th className="px-6 py-4 font-semibold text-[var(--text-primary)] whitespace-nowrap" {...props}>{children}</th>
        ),
        td: ({children, ...props}: any) => (
            <td className="px-6 py-4 text-[var(--text-secondary)]" {...props}>
                {renderWithGlossary(children, glossaryMap, glossaryRegex, new Set())}
            </td>
        ),
        img: ({node, ...props}: any) => (
            <figure className="my-12 group">
                <div className="relative rounded-xl overflow-hidden border border-[var(--ui-border)] bg-[var(--ui-bg)]/30 shadow-sm group-hover:shadow-md transition-shadow">
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
    }), [glossaryMap, glossaryRegex, setZoomImage]);
};
