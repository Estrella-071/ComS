
import { problems as introProblems } from './intro_to_cs/problems';
import { glossaryData as introGlossary } from './intro_to_cs/glossary';
import { textbookData as introTextbook, chapterList as introChapters } from './intro_to_cs/textbook';

import { problems as cProblems } from './c_programming/problems';
import { exercises as cExercises } from './c_programming/exercises';
import { glossaryData as cGlossary } from './c_programming/glossary';
import { textbookData as cTextbook, chapterList as cChapters } from './c_programming/textbook';

import type { Problem, ProgrammingExercise, GlossaryTerm, Subject } from '../types';

export interface SubjectData {
  problems: Problem[];
  exercises: ProgrammingExercise[];
  glossaryData: GlossaryTerm[];
  textbookData: any;
  chapterList: Array<{ 
      id: string; 
      title: { en: string; zh: string };
      subtitle?: { en: string; zh: string };
      disabled?: boolean;
      highlight?: boolean;
  }>;
}

export const subjects: Subject[] = [
  {
    id: 'intro-to-cs',
    name: { en: 'Intro to Computers', zh: '計算機概論' },
    description: {
      en: 'A comprehensive introduction to computer science concepts including hardware, software, data representation, and algorithms.',
      zh: '電腦科學概念的全面介紹，包括硬體、軟體、資料表示和演算法。'
    },
    type: 'quiz',
    enabled: true,
  },
  {
    id: 'c-programming',
    name: { en: 'C Programming', zh: 'C 語言程式設計' },
    description: {
      en: 'Master the fundamentals of C programming, from basic syntax to advanced topics like pointers and data structures.',
      zh: '掌握 C 語言程式設計的基礎，從基本語法到指標和資料結構等進階主題。'
    },
    type: 'programming',
    enabled: true,
  }
];

export const allData: Record<string, { loader: () => Promise<SubjectData> }> = {
  'intro-to-cs': {
    loader: async () => ({
        problems: introProblems,
        exercises: [],
        glossaryData: introGlossary,
        textbookData: introTextbook,
        chapterList: introChapters
    })
  },
  'c-programming': {
    loader: async () => ({
        problems: cProblems,
        exercises: cExercises,
        glossaryData: cGlossary,
        textbookData: cTextbook,
        chapterList: cChapters
    })
  }
};
