
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { ListBulletIcon, ChevronDownIcon } from './icons';
import { slugify } from '../utils/textUtils';

const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };

interface H3Heading { title: string; slug: string; }
interface H2Heading { title: string; slug: string; children: H3Heading[]; }

interface TableOfContentsDropdownProps {
  chapterId: string;
  activeTocId: string | null;
}

export const TableOfContentsDropdown: React.FC<TableOfContentsDropdownProps> = ({ chapterId, activeTocId }) => {
    const { t } = useTranslation();
    const { subjectData, language } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const tocRef = useRef<HTMLDivElement>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const chapterContent = language === 'zh' 
        ? subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData]?.content.zh
        : subjectData?.textbookData[chapterId as keyof typeof subjectData.textbookData]?.content.en;

    const toc = useMemo<H2Heading[]>(() => {
        if (!chapterContent) return [];
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
        return newToc;
    }, [chapterContent]);
    
    const handleScroll = (slug: string) => {
        const container = document.querySelector('.prose-container');
        const element = document.getElementById(slug);
        if (container && element) {
            const containerTop = container.getBoundingClientRect().top;
            const elementTop = element.getBoundingClientRect().top;
            const offset = elementTop - containerTop;
            
            container.scrollTo({
                top: container.scrollTop + offset,
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (activeTocId) {
            const parentH2 = toc.find(h2 => 
                h2.slug === activeTocId || h2.children.some(h3 => h3.slug === activeTocId)
            );
            if (parentH2) setExpandedSection(parentH2.slug);
        }
    }, [activeTocId, toc]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tocRef.current && !tocRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (toc.length === 0) return null;

    return (
        <div ref={tocRef} className="relative z-[var(--z-content-overlay)]">
            <motion.button 
                onClick={() => setIsOpen(v => !v)} 
                className="h-12 px-5 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('sidebar_toc_header')}
            >
                <ListBulletIcon className="w-5 h-5"/>
                <span className="text-sm font-semibold whitespace-nowrap">{t('sidebar_toc_header')}</span>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={spring}
                        className="absolute top-full mt-2 left-0 w-72 glass-pane rounded-xl p-2 shadow-lg"
                    >
                        <div className="max-h-80 overflow-y-auto space-y-1">
                            {toc.map(h2 => {
                                const isExpanded = expandedSection === h2.slug;
                                return (
                                <div key={h2.slug}>
                                    <button onClick={() => setExpandedSection(isExpanded ? null : h2.slug)} className="w-full flex justify-between items-center p-2 rounded-md text-sm font-semibold text-left hover:bg-[var(--ui-bg-hover)]">
                                        <a href={`#${h2.slug}`} onClick={(e) => { e.preventDefault(); handleScroll(h2.slug); }} className={`flex-1 truncate pr-2 ${activeTocId === h2.slug ? 'text-[var(--accent-text)]' : ''}`}>{h2.title}</a>
                                        {h2.children.length > 0 && <ChevronDownIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />}
                                    </button>
                                    <AnimatePresence>
                                        {isExpanded && h2.children.length > 0 && (
                                            <motion.div initial="collapsed" animate="open" exit="collapsed" variants={{ open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }} className="pl-4 overflow-hidden">
                                                {h2.children.map(h3 => (
                                                    <a key={h3.slug} href={`#${h3.slug}`} onClick={(e) => { e.preventDefault(); handleScroll(h3.slug); }} className={`block p-2 rounded-md text-sm truncate hover:bg-[var(--ui-bg-hover)] ${activeTocId === h3.slug ? 'text-[var(--accent-text)] font-medium' : 'text-[var(--text-secondary)]'}`}>{h3.title}</a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
