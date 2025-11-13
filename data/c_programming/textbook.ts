import { prefaceContent } from './chapters/preface';
import { chapter1Content } from './chapters/chapter1';

export const chapterList = [
    { id: 'preface', title: { en: 'Preface', zh: '前言' }, subtitle: { en: 'About the book', zh: '關於本書' } },
    { id: 'chapter1', title: { en: 'Chapter 1: Introduction to Computers, the Internet and the Web', zh: '第一章：電腦、網路與全球資訊網簡介' }, subtitle: { en: 'Basic concepts, hardware, software, and history', zh: '基本概念、硬體、軟體與歷史' } },
];

export const textbookData = {
    'preface': { title: chapterList[0].title, content: prefaceContent },
    'chapter1': { title: chapterList[1].title, content: chapter1Content },
};
