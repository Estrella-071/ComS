

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
    const glossaryMap = glossaryData.reduce<Record<string, GlossaryTerm>>((acc, term) => {
        acc[term.term.toLowerCase()] = term;
        return acc;
    }, {});
    const glossaryTerms = glossaryData.map(g => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const glossaryRegex = new RegExp(`\\b(${glossaryTerms.join('|')})\\b`, 'gi');
    
    const zhToEnMap = glossaryData.reduce<Record<string, string>>((acc, term) => {
        if (term.chinese) acc[term.chinese] = term.term;
        return acc;
    }, {});
    const zhTerms = Object.keys(zhToEnMap).sort((a, b) => b.length - a.length);
    const glossaryRegexForZh = new RegExp(`(${zhTerms.join('|')})`, 'g');

    return { glossaryMap, glossaryRegex, zhToEnMap, glossaryRegexForZh };
};

export const addBilingualAnnotations = (markdown: string, maps: GlossaryMaps | null) => {
    if (!markdown || !maps) return markdown;
    const { zhToEnMap, glossaryRegexForZh } = maps;
    const parts = markdown.split(/(```[\s\S]*?```|`[^`]*?`)/);
    const processedParts = parts.map((part, index) => {
        if (index % 2 === 1) return part;
        return part.replace(glossaryRegexForZh, (match) => {
            const englishTerm = zhToEnMap[match];
            return englishTerm ? `${match} (${englishTerm})` : match;
        });
    });
    return processedParts.join('');
};
// --- END SHARED UTILS ---

type Theme = 'light' | 'dark';

interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  pageWidth: string;
  readTheme: string;
  formatMode: 'formatted' | 'unformatted' | 'text-only';
  displayMode: 'bilingual' | 'en' | 'zh';
}

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  flaggedProblems: string[];
  toggleFlaggedProblem: (problemId: string) => void;
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
  setFormatMode: (mode: 'formatted' | 'unformatted' | 'text-only') => void;
  setDisplayMode: (mode: 'bilingual' | 'en' | 'zh') => void;
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

const getInitialReadingSettings = (): ReadingSettings => {
  const defaults: ReadingSettings = {
    fontSize: 16,
    lineHeight: 1.7,
    pageWidth: 'max-w-4xl',
    readTheme: 'default',
    formatMode: 'formatted',
    displayMode: 'bilingual',
  };
  if (typeof window === 'undefined') return defaults;
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.READING_SETTINGS);
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
  } catch (error) {
    console.error("Failed to parse reading settings from localStorage", error);
    return defaults;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [flaggedProblems, setFlaggedProblems] = useState<string[]>([]);
  const [autoShowExplanation, setAutoShowExplanationState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTO_SHOW_EXPLANATION) !== 'false';
  });
  const [autoAdvance, setAutoAdvanceState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTO_ADVANCE) === 'true';
  });
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false);
  const [glossaryMaps, setGlossaryMaps] = useState<GlossaryMaps | null>(null);
  const [readingSettings, setReadingSettingsState] = useState<ReadingSettings>(getInitialReadingSettings);

  const subject = useMemo(() => {
    if (!subjectId) return null;
    return subjects.find(s => s.id === subjectId) || null;
  }, [subjectId]);

  useEffect(() => {
    try {
      const storedFlags = localStorage.getItem(LOCAL_STORAGE_KEYS.FLAGGED_PROBLEMS);
      if (storedFlags) {
        setFlaggedProblems(JSON.parse(storedFlags));
      }
    } catch (error) {
      console.error("Failed to parse flagged problems from localStorage", error);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, newTheme);
  };

  const setAutoShowExplanation = (show: boolean) => {
    setAutoShowExplanationState(show);
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTO_SHOW_EXPLANATION, String(show));
  };

  const setAutoAdvance = (advance: boolean) => {
    setAutoAdvanceState(advance);
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTO_ADVANCE, String(advance));
  }

  const toggleFlaggedProblem = useCallback((problemId: string) => {
    setFlaggedProblems(prev => {
      const newFlags = prev.includes(problemId)
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId];
      localStorage.setItem(LOCAL_STORAGE_KEYS.FLAGGED_PROBLEMS, JSON.stringify(newFlags));
      return newFlags;
    });
  }, []);

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

  const updateReadingSettings = (newSettings: Partial<ReadingSettings>) => {
    setReadingSettingsState(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(LOCAL_STORAGE_KEYS.READING_SETTINGS, JSON.stringify(updated));
      return updated;
    });
  };

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

  const value = {
    theme,
    setTheme,
    flaggedProblems,
    toggleFlaggedProblem,
    autoShowExplanation,
    setAutoShowExplanation,
    autoAdvance,
    setAutoAdvance,
    subject,
    setSubject,
    subjectData,
    isSubjectLoading,
    glossaryMaps,
    readingSettings,
    setFontSize: (size: number) => updateReadingSettings({ fontSize: size }),
    setLineHeight: (height: number) => updateReadingSettings({ lineHeight: height }),
    setPageWidth: (width: string) => updateReadingSettings({ pageWidth: width }),
    setReadTheme: (theme: string) => updateReadingSettings({ readTheme: theme }),
    setFormatMode: (mode: 'formatted' | 'unformatted' | 'text-only') => updateReadingSettings({ formatMode: mode }),
    setDisplayMode: (mode: 'bilingual' | 'en' | 'zh') => updateReadingSettings({ displayMode: mode }),
  };

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