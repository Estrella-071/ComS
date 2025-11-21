
import type { GlossaryTerm } from '../types';

export interface GlossaryMaps {
  glossaryMap: Record<string, GlossaryTerm>;
  glossaryRegex: RegExp;
  zhToEnMap: Record<string, string>;
  glossaryRegexForZh: RegExp;
}

export const slugify = (text: string): string => {
  // Robust slugify for English and Chinese using standard character classes
  // Matches word characters (A-Za-z0-9_), Chinese characters range, hyphen and underscore
  // This avoids potential issues with \p{L} in older environments
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5\-_]+/g, '');
};

export const computeGlossaryMaps = (glossaryData: GlossaryTerm[]): GlossaryMaps => {
    // Filter glossary for annotation based on importance. Terms with importance 1 are too common.
    const annotatableGlossary = glossaryData.filter(term => term.importance > 1);

    // Full map for tooltips in English text
    const glossaryMap = glossaryData.reduce<Record<string, GlossaryTerm>>((acc, term) => {
        acc[term.term.toLowerCase()] = term;
        return acc;
    }, {});

    // Regex for English tooltips
    let glossaryRegex: RegExp;
    if (glossaryData.length === 0) {
        glossaryRegex = /(?!)/; // Matches nothing
    } else {
        const allGlossaryTerms = glossaryData
            .slice() // Create a copy to sort
            .sort((a, b) => b.term.length - a.term.length)
            .map(g => {
                const escaped = g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // Use simple word boundaries (\b) for compatibility.
                // This is safe and widely supported.
                return `\\b${escaped}\\b`;
            });
        glossaryRegex = new RegExp(`(${allGlossaryTerms.join('|')})`, 'gi');
    }
    
    // Map and Regex for Chinese annotations (uses only annotatable terms)
    const zhToEnMap = annotatableGlossary.reduce<Record<string, string>>((acc, term) => {
        if (term.chinese) {
            const aliases = term.chinese.split(',').map(s => s.trim());
            aliases.forEach(alias => {
                acc[alias] = term.term;
            });
        }
        return acc;
    }, {});

    // Sort Chinese terms by length descending as well
    const zhTerms = Object.keys(zhToEnMap).sort((a, b) => b.length - a.length);
    // Use simple alternation for Chinese as word boundaries are less relevant/reliable in simple regex
    // If no terms, use "match nothing" regex
    const glossaryRegexForZh = zhTerms.length > 0 ? new RegExp(`(${zhTerms.join('|')})`, 'g') : /(?!)/;

    return { glossaryMap, glossaryRegex, zhToEnMap, glossaryRegexForZh };
};

export const addBilingualAnnotations = (markdown: string, maps: GlossaryMaps | null) => {
    if (!markdown || !maps) return markdown;
    const { zhToEnMap, glossaryRegexForZh } = maps;
    
    // Optimization: skip if regex matches nothing (source is '(?!)')
    if (glossaryRegexForZh.source === '(?!)') return markdown;
    
    // Split by code blocks and preformatted text to avoid annotating code
    const parts = markdown.split(/(```[\s\S]*?```|`[^`]*?`|<pre>[\s\S]*?<\/pre>)/);

    const processedParts = parts.map((part, index) => {
        // If it's a code block (odd index), return as is
        if (index % 2 === 1) return part;

        // Process paragraph by paragraph within this non-code part
        const paragraphs = part.split(/(\n\s*\n)/); 
        const processedParagraphs = paragraphs.map(paragraphOrSeparator => {
            // Don't process empty lines or separators, just content blocks
            if (paragraphOrSeparator.trim() === '') {
                return paragraphOrSeparator;
            }

            const annotatedInBlock = new Set<string>();
            // Use a function with the replace method to control annotation frequency
            return paragraphOrSeparator.replace(glossaryRegexForZh, (match) => {
                const englishTerm = zhToEnMap[match];
                if (englishTerm && !annotatedInBlock.has(englishTerm)) {
                    annotatedInBlock.add(englishTerm);
                    return `${match} (${englishTerm})`;
                }
                return match; // Return original match if already annotated in this block
            });
        });
        return processedParagraphs.join('');
    });

    return processedParts.join('');
};
