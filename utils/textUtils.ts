
import type { GlossaryTerm } from '../types';

export interface GlossaryMaps {
  glossaryMap: Record<string, GlossaryTerm>;
  glossaryRegex: RegExp;
  zhToEnMap: Record<string, string>;
  glossaryRegexForZh: RegExp;
}

export const slugify = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5\-_]+/g, '');
};

// Terms that MUST be matched with exact case (usually acronyms or very short words)
const STRICT_CASE_TERMS = new Set([
    'AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR', 
    'C', 'R', 'I', 'P', 'NP', 'BIT', 'BYTE', 
    'RAM', 'ROM', 'CPU', 'ALU', 'CU', 'OS', 'IO', 'I/O',
    'GIF', 'PNG', 'JPEG', 'MPEG', 'MP3', 'DVD', 'CD',
    'IP', 'TCP', 'UDP', 'MAC', 'URL', 'URI', 'HTML', 'HTTP', 'XML',
    'AI', 'DSL', 'ISP', 'LAN', 'WAN', 'MAN', 'PAN',
    'SQL', 'NoSQL', 'AC', 'DC', 'RSA', 'DES', 'AES',
    'GUI', 'CLI', 'API', 'SDK', 'IDE'
]);

// Chinese terms that are too generic/common words and should NOT be auto-linked in text
// to avoid "noise" (e.g., "及" means "and", "方法" means "way/method").
const ZH_SKIPPED_TERMS = new Set([
    '及', '或', '非', '與', '無', '是', '在', // Logical/Math single chars acting as conjunctions
    '記錄', // Record (verb/noun common usage)
    '摘要', // Digest/Summary (common usage)
    '方法', // Method (common usage)
    '程序', // Procedure (common usage)
    '步驟', // Step
    '位址', // Address (often used generally)
    '位置', // Location
    '狀態', // State
    '樹',   // Tree (single char is risky)
    '圖',   // Graph (single char means picture/map)
    '列',   // Column/Row
    '行',   // Column/Row
    '鍵',   // Key
    '值',   // Value
    '類別', // Class (common usage)
    '物件', // Object (common usage)
    '屬性', // Attribute
    '元素',  // Element
    '應用', // Application
    '分析', // Analysis
    '設計', // Design
    '實作', // Implementation
    '測試', // Testing
    '連結', // Link
    '節點', // Node
    '路徑', // Path
    '部分' // Part/Section
]);

export const computeGlossaryMaps = (glossaryData: GlossaryTerm[]): GlossaryMaps => {
    // Filter glossary for annotation based on importance.
    const annotatableGlossary = glossaryData.filter(term => term.importance > 1);

    // Full map for tooltips in English text
    const glossaryMap = glossaryData.reduce<Record<string, GlossaryTerm>>((acc, term) => {
        acc[term.term.toLowerCase()] = term;
        return acc;
    }, {});

    // Regex for English tooltips
    let glossaryRegex: RegExp;
    if (glossaryData.length === 0) {
        glossaryRegex = /(?!)/;
    } else {
        const allGlossaryTerms = glossaryData
            .slice()
            .sort((a, b) => b.term.length - a.term.length); // Longest match first

        // Enhanced Boundary Character Class:
        // Includes alphanumerics, Chinese chars, plus +, -, # (for C++, C#, e-mail)
        const boundaryChar = '[\\w\\u4e00-\\u9fa5+\\-#]';

        const regexParts = allGlossaryTerms.map(g => {
            const term = g.term;
            
            // Escape special regex characters
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // Check for strict case requirements
            const isStrict = STRICT_CASE_TERMS.has(term) || term.length < 3;

            if (isStrict) {
                return escaped;
            } else {
                // Manually create case-insensitive pattern
                return term.split('').map(char => {
                    if (/[a-zA-Z]/.test(char)) {
                        return `[${char.toLowerCase()}${char.toUpperCase()}]`;
                    }
                    return char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                }).join('');
            }
        });

        // Lookbehind and Lookahead for boundaries
        const pattern = `(?<!${boundaryChar})(${regexParts.join('|')})(?!${boundaryChar})`;
        glossaryRegex = new RegExp(pattern, 'g');
    }
    
    // Map and Regex for Chinese annotations
    const zhToEnMap = annotatableGlossary.reduce<Record<string, string>>((acc, term) => {
        if (term.chinese) {
            // Strip parentheses for matching: "基數 (Radix)" -> "基數"
            const cleanZh = term.chinese.replace(/\s*\(.*?\)/, '').trim();
            
            const aliases = cleanZh.split(/,|，/).map(s => s.trim());
            aliases.forEach(alias => {
                // CRITICAL: Skip terms that are in the blocklist OR are single chars
                if (alias) {
                   if (alias.length > 1 && !ZH_SKIPPED_TERMS.has(alias)) {
                        // If a term is already mapped (e.g. by a higher importance term), keep the first one
                        // or overwrite? Usually shortest/most specific wins in regex, but here we build a map.
                        acc[alias] = term.term;
                   }
                }
            });
        }
        return acc;
    }, {});

    const zhTerms = Object.keys(zhToEnMap).sort((a, b) => b.length - a.length);
    let glossaryRegexForZh: RegExp;
    
    if (zhTerms.length === 0) {
        glossaryRegexForZh = /(?!)/;
    } else {
        const escapedZhTerms = zhTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        glossaryRegexForZh = new RegExp(`(?:${escapedZhTerms.join('|')})`, 'g');
    }

    return { glossaryMap, glossaryRegex, zhToEnMap, glossaryRegexForZh };
};

export const addBilingualAnnotations = (text: string, maps: GlossaryMaps | null): string => {
  if (!maps || !text) return text;
  
  const { zhToEnMap, glossaryRegexForZh } = maps;
  // Track seen terms within this specific text block to avoid repetition
  const seen = new Set<string>();

  return text.replace(glossaryRegexForZh, (match, offset, string) => {
      // 1. Check uniqueness in this block
      if (seen.has(match)) return match;

      const enTerm = zhToEnMap[match];
      if (enTerm) {
          // 2. Lookahead check: Don't annotate if the English term is already there
          // Check next 50 chars or so to see if (English Term) follows immediately
          const remainingText = string.slice(offset + match.length);
          
          // Regex to check if immediately followed by (enTerm) or （enTerm）
          const escapedEn = enTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const lookaheadRegex = new RegExp(`^\\s*[\\(\uff08]\\s*${escapedEn}\\s*[\\)\uff09]`, 'i');

          if (lookaheadRegex.test(remainingText)) {
              return match;
          }

          seen.add(match);
          return `${match} (${enTerm})`;
      }
      return match;
  });
};
