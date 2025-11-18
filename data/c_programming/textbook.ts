
import { prefaceContent } from './chapters/preface';
import { chapter1Content } from './chapters/chapter1';
import { chapter2Content } from './chapters/chapter2';
import { chapter3Content } from './chapters/chapter3';
import { chapter4Content } from './chapters/chapter4';

export const chapterList = [
    { id: 'preface', title: { en: 'Preface', zh: '前言' }, subtitle: { en: 'About the book', zh: '關於本書' } },
    { id: 'chapter1', title: { en: 'Chapter 1: Intro to Computers, Internet & Web', zh: '第一章：電腦、網路與全球資訊網簡介' }, subtitle: { en: 'Basic concepts, hardware, software, and history', zh: '基本概念、硬體、軟體與歷史' } },
    { id: 'chapter2', title: { en: 'Chapter 2: Introduction to C Programming', zh: '第二章：C 語言程式設計入門' }, subtitle: { en: 'First programs, variables, arithmetic, and decision making', zh: '第一個程式、變數、算術與決策' } },
    { id: 'chapter3', title: { en: 'Chapter 3: Structured Program Development in C', zh: '第三章：C 的結構化程式開發' }, subtitle: { en: 'Algorithms, pseudocode, control structures', zh: '演算法、偽代碼、控制結構' } },
    { id: 'chapter4', title: { en: 'Chapter 4: C Program Control', zh: '第四章：C 程式控制' }, subtitle: { en: 'Essentials of repetition, for, do...while, switch', zh: '重複、for、do...while、switch' } },
    { id: 'chapter5', title: { en: 'Chapter 5: C Functions', zh: '第五章：C 函式' }, subtitle: { en: 'Function definitions, prototypes, recursion', zh: '函式定義、原型、遞迴' } },
    { id: 'chapter6', title: { en: 'Chapter 6: C Arrays', zh: '第六章：C 陣列' }, subtitle: { en: 'Defining, initializing, and using arrays', zh: '定義、初始化與使用陣列' } },
    { id: 'chapter7', title: { en: 'Chapter 7: C Pointers', zh: '第七章：C 指標' }, subtitle: { en: 'Pointer variables, operators, and pointer arithmetic', zh: '指標變數、運算子與指標算術' } },
    { id: 'chapter8', title: { en: 'Chapter 8: C Characters and Strings', zh: '第八章：C 字元與字串' }, subtitle: { en: 'Character handling and string manipulation functions', zh: '字元處理與字串操作函式' } },
    { id: 'chapter9', title: { en: 'Chapter 9: C Formatted Input/Output', zh: '第九章：C 格式化輸入/輸出' }, subtitle: { en: 'printf, scanf, field widths, and precision', zh: 'printf、scanf、欄位寬度與精度' } },
    { id: 'chapter10', title: { en: 'Chapter 10: C Structures, Unions, Bit Manipulation', zh: '第十章：C 結構、聯合與位元操作' }, subtitle: { en: 'Structures, unions, bitwise operators, and bit fields', zh: '結構、聯合、位元運算子與位元欄位' } },
    { id: 'chapter11', title: { en: 'Chapter 11: C File Processing', zh: '第十一章：C 檔案處理' }, subtitle: { en: 'Sequential and random-access files', zh: '循序與隨機存取檔案' } },
    { id: 'chapter12', title: { en: 'Chapter 12: C Data Structures', zh: '第十二章：C 資料結構' }, subtitle: { en: 'Linked lists, stacks, queues, and trees', zh: '鏈結串列、堆疊、佇列與樹' } },
    { id: 'chapter13', title: { en: 'Chapter 13: C Preprocessor', zh: '第十三章：C 前置處理器' }, subtitle: { en: '#define, #include, conditional compilation', zh: '#define、#include、條件編譯' } },
    { id: 'chapter14', title: { en: 'Chapter 14: Other C Topics', zh: '第十四章：其他 C 主題' }, subtitle: { en: 'Redirecting I/O, command-line arguments, exit', zh: 'I/O 重導向、命令列參數、exit' } },
    { id: 'chapter15', title: { en: 'Chapter 15: C++ as a Better C', zh: '第十五章：C++ 作為更好的 C' }, subtitle: { en: 'Intro to Object Technology, iostream, references', zh: '物件技術入門、iostream、參考' } },
    { id: 'chapter16', title: { en: 'Chapter 16: Intro to Classes, Objects and Strings', zh: '第十六章：類別、物件與字串入門' }, subtitle: { en: 'Defining classes, member functions, constructors', zh: '定義類別、成員函式、建構函式' } },
    { id: 'chapter17', title: { en: 'Chapter 17: Classes: A Deeper Look', zh: '第十七章：深入探討類別' }, subtitle: { en: 'const objects, composition, friend functions, this pointer', zh: 'const 物件、複合、友元函式、this 指標' } },
    { id: 'chapter18', title: { en: 'Chapter 18: Operator Overloading; Class string', zh: '第十八章：運算子重載；string 類別' }, subtitle: { en: 'Fundamentals, binary/unary operator overloading', zh: '基礎、二元/一元運算子重載' } },
    { id: 'chapter19', title: { en: 'Chapter 19: Object-Oriented Programming: Inheritance', zh: '第十九章：物件導向程式設計：繼承' }, subtitle: { en: 'Base classes, derived classes, protected members', zh: '基底類別、衍生類別、保護成員' } },
    { id: 'chapter20', title: { en: 'Chapter 20: Object-Oriented Programming: Polymorphism', zh: '第二十章：物件導向程式設計：多型' }, subtitle: { en: 'Virtual functions, abstract classes, dynamic binding', zh: '虛擬函式、抽象類別、動態綁定' } },
    { id: 'chapter21', title: { en: 'Chapter 21: Stream Input/Output: A Deeper Look', zh: '第二十一章：串流輸入/輸出深入探討' }, subtitle: { en: 'Stream states, manipulators, formatting', zh: '串流狀態、操縱元、格式化' } },
    { id: 'chapter22', title: { en: 'Chapter 22: Exception Handling: A Deeper Look', zh: '第二十二章：例外處理深入探討' }, subtitle: { en: 'try, catch, throw, stack unwinding', zh: 'try、catch、throw、堆疊回溯' } },
    { id: 'chapter23', title: { en: 'Chapter 23: Introduction to Custom Templates', zh: '第二十三章：自訂範本入門' }, subtitle: { en: 'Class templates, function templates', zh: '類別範本、函式範本' } },
];

const emptyContent = { en: '# Content Coming Soon\n\nThis chapter content is currently being prepared and will be available in a future update.', zh: '# 內容即將推出\n\n本章節內容正在準備中，將在未來的更新中提供。' };

export const textbookData = {
    'preface': { title: chapterList[0].title, content: prefaceContent },
    'chapter1': { title: chapterList[1].title, content: chapter1Content },
    'chapter2': { title: chapterList[2].title, content: chapter2Content },
    'chapter3': { title: chapterList[3].title, content: chapter3Content },
    'chapter4': { title: chapterList[4].title, content: chapter4Content },
    'chapter5': { title: chapterList[5].title, content: emptyContent },
    'chapter6': { title: chapterList[6].title, content: emptyContent },
    'chapter7': { title: chapterList[7].title, content: emptyContent },
    'chapter8': { title: chapterList[8].title, content: emptyContent },
    'chapter9': { title: chapterList[9].title, content: emptyContent },
    'chapter10': { title: chapterList[10].title, content: emptyContent },
    'chapter11': { title: chapterList[11].title, content: emptyContent },
    'chapter12': { title: chapterList[12].title, content: emptyContent },
    'chapter13': { title: chapterList[13].title, content: emptyContent },
    'chapter14': { title: chapterList[14].title, content: emptyContent },
    'chapter15': { title: chapterList[15].title, content: emptyContent },
    'chapter16': { title: chapterList[16].title, content: emptyContent },
    'chapter17': { title: chapterList[17].title, content: emptyContent },
    'chapter18': { title: chapterList[18].title, content: emptyContent },
    'chapter19': { title: chapterList[19].title, content: emptyContent },
    'chapter20': { title: chapterList[20].title, content: emptyContent },
    'chapter21': { title: chapterList[21].title, content: emptyContent },
    'chapter22': { title: chapterList[22].title, content: emptyContent },
    'chapter23': { title: chapterList[23].title, content: emptyContent },
};
