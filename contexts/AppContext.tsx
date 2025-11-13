import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { LOCAL_STORAGE_KEYS } from '../types';
import { subjects, allData, type SubjectData } from '../data/subjects';
import type { Subject } from '../types';

type Theme = 'light' | 'dark';

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

  const { subject, subjectData } = useMemo(() => {
    if (!subjectId) return { subject: null, subjectData: null };
    const foundSubject = subjects.find(s => s.id === subjectId);
    const data = allData[subjectId as keyof typeof allData]?.data;
    return { subject: foundSubject || null, subjectData: data || null };
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
    setSubjectId(id);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Manage syntax highlighting theme
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
    subjectData
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