import type { Subject, Problem, GlossaryTerm } from '../types';

import { problems as introProblems } from './problems';
import { textbookData as introTextbookData, chapterList as introChapterList } from './textbook';
import { glossaryData as introGlossaryData } from './glossary';

import { chapterList as cChapterList, textbookData as cTextbookData, problems as cProblems, glossaryData as cGlossaryData } from './c_programming';

export interface SubjectData {
  problems: Problem[];
  textbookData: any; // Can be different structures
  chapterList: any[]; // Can be different structures
  glossaryData: GlossaryTerm[];
}

interface AllData {
  [key: string]: {
    name: { en: string; zh: string; };
    description: { en: string; zh: string; };
    enabled: boolean;
    data: SubjectData;
  };
}

export const allData: AllData = {
  'intro-to-cs': {
    name: { en: 'Introduction to Computers', zh: '計算機概論' },
    description: { en: 'An interactive textbook and question bank for an introductory computer science course.', zh: '一本為計算機科學入門課程設計的互動式教科書與題庫。' },
    enabled: true,
    data: {
      problems: introProblems,
      textbookData: introTextbookData,
      chapterList: introChapterList,
      glossaryData: introGlossaryData,
    },
  },
  'c-programming': {
    name: { en: 'C How to Program', zh: 'C 語言程式設計' },
    description: { en: 'The complete textbook for "C How to Program, 8th Edition". Explore C and C++ programming concepts.', zh: '《C 語言程式設計，第八版》完整教科書內容。探索 C 與 C++ 程式設計概念。' },
    enabled: true,
    data: {
      problems: cProblems,
      textbookData: cTextbookData,
      chapterList: cChapterList,
      glossaryData: cGlossaryData,
    }
  }
};

export const subjects: Subject[] = Object.entries(allData).map(([id, details]) => ({
    id,
    name: details.name,
    description: details.description,
    enabled: details.enabled,
}));