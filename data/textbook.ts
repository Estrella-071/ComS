
import { prefaceContent } from './chapters/preface';
import { chapter1Content } from './chapters/chapter1';
import { chapter2Content } from './chapters/chapter2';
import { chapter3Content } from './chapters/chapter3';
import { chapter4Content } from './chapters/chapter4';
import { chapter5Content } from './chapters/chapter5';
import { chapter6Content } from './chapters/chapter6';
import { chapter7Content } from './chapters/chapter7';
import { chapter8Content } from './chapters/chapter8';
import { chapter9Content } from './chapters/chapter9';
import { chapter10Content } from './chapters/chapter10';
import { chapter11Content } from './chapters/chapter11';
import { chapter12Content } from './chapters/chapter12';
import { chapter13Content } from './chapters/chapter13';
import { chapter14Content } from './chapters/chapter14';
import { chapter15Content } from './chapters/chapter15';
import { chapter16Content } from './chapters/chapter16';
import { chapter17Content } from './chapters/chapter17';
import { chapter18Content } from './chapters/chapter18';
import { chapter19Content } from './chapters/chapter19';
import { chapter20Content } from './chapters/chapter20';
import { appendixAContent } from './chapters/appendixA';
import { appendixBContent } from './chapters/appendixB';
import { appendixCContent } from './chapters/appendixC';
import { appendixDContent } from './chapters/appendixD';
import { appendixEContent } from './chapters/appendixE';
import { appendixFContent } from './chapters/appendixF';
import { appendixGContent } from './chapters/appendixG';
import { appendixHContent } from './chapters/appendixH';
import { appendixIContent } from './chapters/appendixI';
import { appendixJContent } from './chapters/appendixJ';

export const chapterList = [
    { id: 'preface', title: { en: 'Preface', zh: '前言' }, subtitle: { en: 'Book preface and organization', zh: '本書前言與組織結構' } },
    { id: 'chapter1', title: { en: 'Chapter 1: Introduction', zh: '第一章：簡介' }, subtitle: { en: 'Turing and von Neumann models, computer components', zh: '圖靈與馮·諾伊曼模型、電腦組件' } },
    { id: 'chapter2', title: { en: 'Chapter 2: Number Systems', zh: '第二章：數字系統' }, subtitle: { en: 'Positional and non-positional systems, conversions', zh: '進位與非進位制、轉換' } },
    { id: 'chapter3', title: { en: 'Chapter 3: Data Storage', zh: '第三章：資料儲存' }, subtitle: { en: 'Storing numbers, text, audio, images, and video', zh: '儲存數字、文字、音訊、圖像與影像' } },
    { id: 'chapter4', title: { en: 'Chapter 4: Operations on Data', zh: '第四章：資料運算' }, subtitle: { en: 'Logic, shift, and arithmetic operations', zh: '邏輯、移位與算術運算' } },
    { id: 'chapter5', title: { en: 'Chapter 5: Computer Organization', zh: '第五章：電腦組織' }, subtitle: { en: 'CPU, main memory, and I/O subsystems', zh: 'CPU、主記憶體與輸出/入子系統' } },
    { id: 'chapter6', title: { en: 'Chapter 6: Computer Networks and Internet', zh: '第六章：電腦網路與網際網路' }, subtitle: { en: 'Layers, protocols, and network types', zh: '層、協定與網路類型' } },
    { id: 'chapter7', title: { en: 'Chapter 7: Operating Systems', zh: '第七章：作業系統' }, subtitle: { en: 'Components, evolution, and major OSs', zh: '組件、演進與主要作業系統' } },
    { id: 'chapter8', title: { en: 'Chapter 8: Algorithms', zh: '第八章：演算法' }, subtitle: { en: 'Constructs, representation, sorting, and searching', zh: '建構、表示法、排序與搜尋' } },
    { id: 'chapter9', title: { en: 'Chapter 9: Programming Languages', zh: '第九章：程式語言' }, subtitle: { en: 'Evolution, paradigms, and common concepts', zh: '演進、範式與共同概念' } },
    { id: 'chapter10', title: { en: 'Chapter 10: Software Engineering', zh: '第十章：軟體工程' }, subtitle: { en: 'Lifecycle, analysis, design, and testing', zh: '生命週期、分析、設計與測試' } },
    { id: 'chapter11', title: { en: 'Chapter 11: Data Structure', zh: '第十一章：資料結構' }, subtitle: { en: 'Arrays, records, and linked lists', zh: '陣列、記錄與鏈結串列' } },
    { id: 'chapter12', title: { en: 'Chapter 12: Abstract Data Types', zh: '第十二章：抽象資料型別' }, subtitle: { en: 'Stacks, queues, lists, trees, and graphs', zh: '堆疊、佇列、串列、樹與圖' } },
    { id: 'chapter13', title: { en: 'Chapter 13: File Structure', zh: '第十三章：檔案結構' }, subtitle: { en: 'Sequential, indexed, and hashed files', zh: '循序、索引與雜湊檔案' } },
    { id: 'chapter14', title: { en: 'Chapter 14: Databases', zh: '第十四章：資料庫' }, subtitle: { en: 'Database models and relational databases', zh: '資料庫模型與關聯式資料庫' } },
    { id: 'chapter15', title: { en: 'Chapter 15: Data Compression', zh: '第十五章：資料壓縮' }, subtitle: { en: 'Lossless and lossy compression techniques', zh: '無損與失真壓縮技術' } },
    { id: 'chapter16', title: { en: 'Chapter 16: Security', zh: '第十六章：安全性' }, subtitle: { en: 'Confidentiality, integrity, and availability', zh: '機密性、完整性與可用性' } },
    { id: 'chapter17', title: { en: 'Chapter 17: Theory of Computation', zh: '第十七章：計算理論' }, subtitle: { en: 'Simple Language, Turing machines, halting problem', zh: '簡單語言、圖靈機、停機問題' } },
    { id: 'chapter18', title: { en: 'Chapter 18: Artificial Intelligence', zh: '第十八章：人工智慧' }, subtitle: { en: 'Knowledge representation, expert systems, and search', zh: '知識表示、專家系統與搜尋' } },
    { id: 'chapter19', title: { en: 'Chapter 19: Introduction to Social Media', zh: '第十九章：社群媒體簡介' }, subtitle: { en: 'Concepts behind Facebook and Twitter', zh: 'Facebook 與 Twitter 背後的概念' } },
    { id: 'chapter20', title: { en: 'Chapter 20: Social and Ethical Issues', zh: '第二十章：社會與倫理議題' }, subtitle: { en: 'Principles, property, privacy, and crime', zh: '原則、財產、隱私與犯罪' } },
    { id: 'appendixA', title: { en: 'Appendix A: Unicode', zh: '附錄 A：萬國碼' }, subtitle: { en: 'Structure of Unicode and ASCII chart', zh: '萬國碼結構與 ASCII 圖表' } },
    { id: 'appendixB', title: { en: 'Appendix B: UML', zh: '附錄 B：UML' }, subtitle: { en: 'Unified Modeling Language diagrams', zh: '統一建模語言圖' } },
    { id: 'appendixC', title: { en: 'Appendix C: Pseudocode', zh: '附錄 C：偽代碼' }, subtitle: { en: 'Components and constructs', zh: '組件與建構' } },
    { id: 'appendixD', title: { en: 'Appendix D: Structure Chart', zh: '附錄 D：結構圖' }, subtitle: { en: 'Symbols and rules for structure charts', zh: '結構圖的符號與規則' } },
    { id: 'appendixE', title: { en: 'Appendix E: Boolean Algebra', zh: '附錄 E：布林代數' }, subtitle: { en: 'Logic circuits and axioms', zh: '邏輯電路與公理' } },
    { id: 'appendixF', title: { en: 'Appendix F: Example Programs', zh: '附錄 F：範例程式' }, subtitle: { en: 'Examples in C, C++, and Java', zh: 'C、C++ 與 Java 範例' } },
    { id: 'appendixG', title: { en: 'Appendix G: Mathematical Review', zh: '附錄 G：數學複習' }, subtitle: { en: 'Exponents, logarithms, and modular arithmetic', zh: '指數、對數與模數運算' } },
    { id: 'appendixH', title: { en: 'Appendix H: Error Detection', zh: '附錄 H：錯誤偵測' }, subtitle: { en: 'Detection and correction codes', zh: '偵測與更正碼' } },
    { id: 'appendixI', title: { en: 'Appendix I: Sign-and-Magnitude', zh: '附錄 I：符號與數值' }, subtitle: { en: 'Addition and subtraction for integers', zh: '整數的加法與減法' } },
    { id: 'appendixJ', title: { en: 'Appendix J: Reals', zh: '附錄 J：實數' }, subtitle: { en: 'Addition and subtraction for reals', zh: '實數的加法與減法' } },
];

export const textbookData = {
    'preface': { title: chapterList[0].title, content: prefaceContent },
    'chapter1': { title: chapterList[1].title, content: chapter1Content },
    'chapter2': { title: chapterList[2].title, content: chapter2Content },
    'chapter3': { title: chapterList[3].title, content: chapter3Content },
    'chapter4': { title: chapterList[4].title, content: chapter4Content },
    'chapter5': { title: chapterList[5].title, content: chapter5Content },
    'chapter6': { title: chapterList[6].title, content: chapter6Content },
    'chapter7': { title: chapterList[7].title, content: chapter7Content },
    'chapter8': { title: chapterList[8].title, content: chapter8Content },
    'chapter9': { title: chapterList[9].title, content: chapter9Content },
    'chapter10': { title: chapterList[10].title, content: chapter10Content },
    'chapter11': { title: chapterList[11].title, content: chapter11Content },
    'chapter12': { title: chapterList[12].title, content: chapter12Content },
    'chapter13': { title: chapterList[13].title, content: chapter13Content },
    'chapter14': { title: chapterList[14].title, content: chapter14Content },
    'chapter15': { title: chapterList[15].title, content: chapter15Content },
    'chapter16': { title: chapterList[16].title, content: chapter16Content },
    'chapter17': { title: chapterList[17].title, content: chapter17Content },
    'chapter18': { title: chapterList[18].title, content: chapter18Content },
    'chapter19': { title: chapterList[19].title, content: chapter19Content },
    'chapter20': { title: chapterList[20].title, content: chapter20Content },
    'appendixA': { title: chapterList[21].title, content: appendixAContent },
    'appendixB': { title: chapterList[22].title, content: appendixBContent },
    'appendixC': { title: chapterList[23].title, content: appendixCContent },
    'appendixD': { title: chapterList[24].title, content: appendixDContent },
    'appendixE': { title: chapterList[25].title, content: appendixEContent },
    'appendixF': { title: chapterList[26].title, content: appendixFContent },
    'appendixG': { title: chapterList[27].title, content: appendixGContent },
    'appendixH': { title: chapterList[28].title, content: appendixHContent },
    'appendixI': { title: chapterList[29].title, content: appendixIContent },
    'appendixJ': { title: chapterList[30].title, content: appendixJContent },
};