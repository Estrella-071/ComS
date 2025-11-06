import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
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
    return localStorage.getItem('autoShowExplanation') !== 'false';
  });
  const [autoAdvance, setAutoAdvanceState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('autoAdvance') === 'true';
  });


  useEffect(() => {
    try {
      const storedFlags = localStorage.getItem('flaggedProblems');
      if (storedFlags) {
        setFlaggedProblems(JSON.parse(storedFlags));
      }
    } catch (error) {
      console.error("Failed to parse flagged problems from localStorage", error);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setAutoShowExplanation = (show: boolean) => {
    setAutoShowExplanationState(show);
    localStorage.setItem('autoShowExplanation', String(show));
  };

  const setAutoAdvance = (advance: boolean) => {
    setAutoAdvanceState(advance);
    localStorage.setItem('autoAdvance', String(advance));
  }

  const toggleFlaggedProblem = useCallback((problemId: string) => {
    setFlaggedProblems(prev => {
      const newFlags = prev.includes(problemId)
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId];
      localStorage.setItem('flaggedProblems', JSON.stringify(newFlags));
      return newFlags;
    });
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);


  return (
    <AppContext.Provider value={{ theme, setTheme, flaggedProblems, toggleFlaggedProblem, autoShowExplanation, setAutoShowExplanation, autoAdvance, setAutoAdvance }}>
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