
import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { LOCAL_STORAGE_KEYS } from '../types';
import { subjects, allData, type SubjectData } from '../data/subjects';
import type { Subject, GlossaryTerm } from '../types';

// --- SHARED UTILS (to avoid code duplication) ---

export interface GlossaryMaps {
  glossaryMap: Record<string, GlossaryTerm>;
  glossaryRegex: RegExp;
  zhToEnMap: Record<string, string>;
  glossaryRegexForZh: RegExp;
}

export const computeGlossaryMaps = (glossaryData: GlossaryTerm[]): GlossaryMaps => {
    // Filter glossary for annotation based on importance. Terms with importance 1 are too common.
    const annotatableGlossary = glossaryData.filter(term => term.importance > 1);

    // Full map for tooltips in English text
    const glossaryMap = glossaryData.reduce<Record<string, GlossaryTerm>>((acc, term) => {
        acc[term.term.toLowerCase()] = term;
        return acc;
    }, {});

    // Regex for English tooltips
    // 1. Sort by length descending to ensure "C++" matches before "C".
    // 2. Escape special characters.
    // 3. Apply word boundaries smartly: only if the term starts/ends with a word char.
    const allGlossaryTerms = glossaryData
        .slice() // Create a copy to sort
        .sort((a, b) => b.term.length - a.term.length)
        .map(g => {
            const escaped = g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // If term starts with a word char, require a word boundary before it.
            const startBoundary = /^\w/.test(g.term) ? '\\b' : '';
            // If term ends with a word char, require a word boundary after it.
            const endBoundary = /\w$/.test(g.term) ? '\\b' : '';
            return `${startBoundary}${escaped}${endBoundary}`;
        });
    
    const glossaryRegex = new RegExp(`(${allGlossaryTerms.join('|')})`, 'gi');
    
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
    const glossaryRegexForZh = zhTerms.length > 0 ? new RegExp(`(${zhTerms.join('|')})`, 'g') : new RegExp('a^');

    return { glossaryMap, glossaryRegex, zhToEnMap, glossaryRegexForZh };
};

export const addBilingualAnnotations = (markdown: string, maps: GlossaryMaps | null) => {
    if (!markdown || !maps) return markdown;
    const { zhToEnMap, glossaryRegexForZh } = maps;
    
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
// --- END SHARED UTILS ---

type Theme = 'light' | 'dark';
type Language = 'en' | 'zh';

interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  pageWidth: string;
  readTheme: string;
  initialMode: boolean;
  displayMode: 'bilingual' | 'en' | 'zh';
  preferredMode: 'reading' | 'practice';
}

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  flaggedItems: string[];
  toggleFlaggedItem: (itemId: string) => void;
  autoShowExplanation: boolean;
  setAutoShowExplanation: (show: boolean) => void;
  autoAdvance: boolean;
  setAutoAdvance: (advance: boolean) => void;
  subject: Subject | null;
  setSubject: (subjectId: string | null) => void;
  subjectData: SubjectData | null;
  isSubjectLoading: boolean;
  glossaryMaps: GlossaryMaps | null;
  readingSettings: ReadingSettings;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setPageWidth: (width: string) => void;
  setReadTheme: (theme: string) => void;
  setInitialMode: (enabled: boolean) => void;
  setDisplayMode: (mode: 'bilingual' | 'en' | 'zh') => void;
  setPreferredMode: (mode: 'reading' | 'practice') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem('language');
        if (storedLang === 'en' || storedLang === 'zh') {
            return storedLang;
        }
    }
    return 'zh'; // Default to Chinese
};

const getSubjectSpecificValue = <T,>(subjectId: string, key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const stored = localStorage.getItem(`${key}_${subjectId}`);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
        console.error(`Failed to parse ${key} from localStorage`, error);
        return defaultValue;
    }
}

const setSubjectSpecificValue = <T,>(subjectId: string, key: string, value: T) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${key}_${subjectId}`, JSON.stringify(value));
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [flaggedItems, setFlaggedItems] = useState<string[]>([]);
  const [autoShowExplanation, setAutoShowExplanation] = useState<boolean>(true);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(false);
  const [readingSettings, setReadingSettings] = useState<ReadingSettings>({
    fontSize: 18, lineHeight: 1.7, pageWidth: 'max-w-6xl', readTheme: 'default', initialMode: false, displayMode: 'bilingual', preferredMode: 'reading'
  });
  
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false);
  const [glossaryMaps, setGlossaryMaps] = useState<GlossaryMaps | null>(null);

  const subject = useMemo(() => {
    if (!subjectId) return null;
    return subjects.find(s => s.id === subjectId) || null;
  }, [subjectId]);

  // Load subject-specific settings when subject changes
  useEffect(() => {
    if (subject) {
      setFlaggedItems(getSubjectSpecificValue(subject.id, LOCAL_STORAGE_KEYS.FLAGGED_ITEMS, []));
      setAutoShowExplanation(getSubjectSpecificValue(subject.id, LOCAL_STORAGE_KEYS.AUTO_SHOW_EXPLANATION, true));
      setAutoAdvance(getSubjectSpecificValue(subject.id, LOCAL_STORAGE_KEYS.AUTO_ADVANCE, false));
      setReadingSettings(getSubjectSpecificValue(subject.id, LOCAL_STORAGE_KEYS.READING_SETTINGS, {
        fontSize: 18, lineHeight: 1.7, pageWidth: 'max-w-6xl', readTheme: 'default', initialMode: false, displayMode: 'bilingual', preferredMode: 'reading'
      }));
    } else {
      setFlaggedItems([]);
    }
  }, [subject]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, newTheme);
  };
  
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  const createSubjectSpecificSetter = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, key: string) => {
      return useCallback((value: T | ((prevState: T) => T)) => {
          if (!subject) return;
          setter(prevValue => {
              const newValue = typeof value === 'function' ? (value as (prevState: T) => T)(prevValue) : value;
              setSubjectSpecificValue(subject.id, key, newValue);
              return newValue;
          });
      }, [subject, setter, key]);
  };
  
  const setAutoShowExplanationCallback = createSubjectSpecificSetter(setAutoShowExplanation, LOCAL_STORAGE_KEYS.AUTO_SHOW_EXPLANATION);
  const setAutoAdvanceCallback = createSubjectSpecificSetter(setAutoAdvance, LOCAL_STORAGE_KEYS.AUTO_ADVANCE);

  const toggleFlaggedItem = useCallback((itemId: string) => {
    if (!subject) return;
    setFlaggedItems(prev => {
      const newFlags = prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      setSubjectSpecificValue(subject.id, LOCAL_STORAGE_KEYS.FLAGGED_ITEMS, newFlags);
      return newFlags;
    });
  }, [subject]);

  const setSubject = useCallback((id: string | null) => {
    if (id) {
      const subjectLoader = allData[id]?.loader;
      if (subjectLoader) {
        setIsSubjectLoading(true);
        subjectLoader()
          .then(data => {
            setSubjectData(data);
            setSubjectId(id);
            setGlossaryMaps(computeGlossaryMaps(data.glossaryData));
          })
          .catch(error => console.error("Failed to load subject data", error))
          .finally(() => setIsSubjectLoading(false));
      }
    } else {
      setSubjectId(null);
      setSubjectData(null);
      setGlossaryMaps(null);
    }
  }, []);

  const updateReadingSettings = useCallback((newSettings: Partial<ReadingSettings>) => {
    if (!subject) return;
    setReadingSettings(prev => {
      const updated = { ...prev, ...newSettings };
      setSubjectSpecificValue(subject.id, LOCAL_STORAGE_KEYS.READING_SETTINGS, updated);
      return updated;
    });
  }, [subject]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    let styleLink = document.getElementById('highlight-style') as HTMLLinkElement;
    if (!styleLink) {
        styleLink = document.createElement('link');
        styleLink.id = 'highlight-style';
        styleLink.rel = 'stylesheet';
        document.head.appendChild(styleLink);
    }
    styleLink.href = theme === 'dark' 
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css' 
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';

  }, [theme]);
  
  const setFontSize = useCallback((size: number) => updateReadingSettings({ fontSize: size }), [updateReadingSettings]);
  const setLineHeight = useCallback((height: number) => updateReadingSettings({ lineHeight: height }), [updateReadingSettings]);
  const setPageWidth = useCallback((width: string) => updateReadingSettings({ pageWidth: width }), [updateReadingSettings]);
  const setReadTheme = useCallback((theme: string) => updateReadingSettings({ readTheme: theme }), [updateReadingSettings]);
  const setInitialMode = useCallback((enabled: boolean) => updateReadingSettings({ initialMode: enabled }), [updateReadingSettings]);
  const setDisplayMode = useCallback((mode: 'bilingual' | 'en' | 'zh') => updateReadingSettings({ displayMode: mode }), [updateReadingSettings]);
  const setPreferredMode = useCallback((mode: 'reading' | 'practice') => updateReadingSettings({ preferredMode: mode }), [updateReadingSettings]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    language,
    setLanguage,
    flaggedItems,
    toggleFlaggedItem,
    autoShowExplanation,
    setAutoShowExplanation: setAutoShowExplanationCallback,
    autoAdvance,
    setAutoAdvance: setAutoAdvanceCallback,
    subject,
    setSubject,
    subjectData,
    isSubjectLoading,
    glossaryMaps,
    readingSettings,
    setFontSize,
    setLineHeight,
    setPageWidth,
    setReadTheme,
    setInitialMode,
    setDisplayMode,
    setPreferredMode
  }), [
    theme, setTheme, language, setLanguage, flaggedItems, toggleFlaggedItem, autoShowExplanation, setAutoShowExplanationCallback,
    autoAdvance, setAutoAdvanceCallback, subject, setSubject, subjectData, isSubjectLoading, glossaryMaps,
    readingSettings, setFontSize, setLineHeight, setPageWidth, setReadTheme, setInitialMode, setDisplayMode, setPreferredMode
  ]);


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
