
export const LOCAL_STORAGE_KEYS = {
  THEME: 'theme',
  FLAGGED_ITEMS: 'flaggedItems',
  AUTO_SHOW_EXPLANATION: 'autoShowExplanation',
  AUTO_ADVANCE: 'autoAdvance',
  QUIZ_HISTORY: 'quizHistory',
  READING_SETTINGS: 'readingSettings',
};

export interface Problem {
  id: string;
  chapter: string;
  number: string;
  text_en: string;
  text_zh: string;
  options: {
    key: 'a' | 'b' | 'c' | 'd';
    text_en: string;
    text_zh: string;
  }[];
  answer: 'a' | 'b' | 'c' | 'd';
  explanation_zh: string;
}

export interface ProgrammingExercise {
  id: string;
  chapter: string;
  number: string;
  title_en: string;
  title_zh: string;
  description_en: string;
  description_zh: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'programming' | 'short_answer' | 'making_a_difference';
  templateCode?: string;
  sampleOutput?: string;
}

export interface GlossaryTerm {
  term: string;
  chinese: string;
  definition: string;
  definition_zh: string;
  category: 'Computer Basics' | 'Number Systems' | 'Data Representation' | 'Computer Architecture' | 'Networking' | 'Operating Systems' | 'Algorithms' | 'Programming Languages' | 'Software Engineering' | 'Data Structures' | 'File Structures' | 'Databases' | 'Data Compression' | 'Security' | 'Theory of Computation' | 'Artificial Intelligence' | 'Social Media' | 'Social & Ethical Issues';
  chapter: string;
  importance: number; // 1 (low) - 3 (high)
}

export interface AnsweredQuestion {
    problemId: string;
    userAnswer: string;
    isCorrect: boolean;
}

export interface QuizResult {
    id: string; // e.g., timestamp
    date: string;
    quizTitle: string;
    subjectId: string;
    score: number;
    totalQuestions: number;
    answeredQuestions: AnsweredQuestion[];
}

export interface QuizState {
    problems: Problem[];
    currentIndex: number;
    answers: Map<string, string>;
    isFinished: boolean;
    score: number;
}

export interface Subject {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  enabled: boolean;
  type: 'quiz' | 'programming';
}

export type View =
  | { type: 'home' }
  | { type: 'overview' }
  | { type: 'textbook'; chapterId: string }
  | { type: 'quiz'; id: string; problems: Problem[]; title: string; startIndex?: number; }
  | { type: 'glossary' }
  | { type: 'history' }
  | { type: 'problem'; id: string }
  | { type: 'question_bank_quiz' }
  | { type: 'bookmarks' }
  | { type: 'programming' }
  | { type: 'exercise'; id: string };
