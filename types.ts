export interface Problem {
  id: string;
  chapter: string;
  number: string;
  isStarred: boolean; // Not present in new data, but can be kept for future use
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

export interface GlossaryTerm {
  term: string;
  chinese: string;
  definition: string;
  category: 'Computer Basics' | 'Number Systems' | 'Data Representation' | 'Computer Architecture' | 'Networking' | 'Operating Systems' | 'Algorithms' | 'Programming Languages' | 'Software Engineering' | 'Data Structures' | 'File Structures';
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
    score: number;
    totalQuestions: number;
    answeredQuestions: AnsweredQuestion[];
}