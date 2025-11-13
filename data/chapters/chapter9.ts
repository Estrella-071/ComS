
export const chapter9Content = {
  en: `
# Chapter 9: Programming Languages

In Chapter 8 we discussed algorithms. In this chapter, we examine programming languages that can implement pseudocode or UML descriptions of a solution into a programming 
language.

## Objectives
After studying this chapter, the student should be able to:
- Describe the evolution of programming languages from machine language to high-level languages.
- Understand how a program in a high-level language is translated into machine language using an interpreter or a compiler.
- Distinguish between four computer language paradigms.
- Define common concepts in procedural and object-oriented languages. 

## 9.1 EVOLUTION
A computer language is a set of predefined words that are combined into a program according to predefined rules (syntax).
- **Machine languages**: The only programming languages available in the earliest days of computers, made of streams of 0s and 1s.
- **Assembly languages**: Replaced binary code for instruction and addresses with symbols or mnemonics.
- **High-level languages**: Portable to many different computers, allowing the programmer to concentrate on the application rather than the intricacies of the computer’s organization.

## 9.2 TRANSLATION
A program in a high-level language (source program) needs to be translated into the machine language of the computer (object program).
- **Compilation**: A compiler translates the whole source program into the object program.
- **Interpretation**: An interpreter translates the source program into the object program line by line, executing each line.

## 9.3 PROGRAMMING PARADIGMS
A paradigm is a way in which a computer language looks at the problem to be solved.
- **The procedural paradigm**: A program is an active agent that manipulates passive objects (data).
- **The object-oriented paradigm**: Deals with active objects instead of passive objects, encapsulating data and methods.
- **The functional paradigm**: A program is considered a mathematical function.
- **The declarative paradigm**: Uses the principle of logical reasoning to answer queries.

## 9.4 COMMON CONCEPTS
- **Identifiers**: Names of objects in the program.
- **Data types**: Defines a set of values and operations.
- **Variables**: Names for memory locations.
- **Literals**: Predetermined values used in a program.
- **Constants**: Named locations that store a value that cannot be changed.
- **Input and Output**: Operations to read and/or write data.
- **Expressions**: A sequence of operands and operators that reduces to a single value.
- **Statements**: Cause an action to be performed by the program.
- **Subprograms**: A unit of code to accomplish a single task that can be called many times.
`,
  zh: `
# 第九章：程式語言

在第八章中，我們討論了演算法。在本章中，我們將探討程式語言，這些語言可以將解決方案的偽代碼或 UML 描述實作為程式語言。

## 學習目標
學完本章後，學生應能：
- 描述程式語言從機器語言到高階語言的演進。
- 理解高階語言程式如何使用直譯器或編譯器轉換為機器語言。
- 區分四種電腦語言範式。
- 定義程序化和物件導向語言中的共同概念。

## 9.1 演進
電腦語言是一組預先定義的詞彙，根據預先定義的規則（語法）組合成程式。
- **機器語言**：在電腦最早期的時代，唯一可用的程式語言，由 0 和 1 的串流組成。
- **組合語言**：用符號或助記符取代指令和位址的二進位碼。
- **高階語言**：可移植到許多不同的電腦上，讓程式設計師可以專注於應用程式，而不是電腦組織的複雜細節。

## 9.2 轉譯
高階語言的程式（原始程式）需要被轉譯成電腦的機器語言（目的程式）。
- **編譯 (Compilation)**：編譯器將整個原始程式轉譯成目的程式。
- **直譯 (Interpretation)**：直譯器逐行將原始程式轉譯成目的程式，並執行每一行。

## 9.3 程式設計範式
範式是電腦語言看待待解決問題的方式。
- **程序化範式 (The procedural paradigm)**：程式是一個主動的代理者，它操作被動的物件（資料）。
- **物件導向範式 (The object-oriented paradigm)**：處理主動的物件而不是被動的物件，將資料和方法封裝起來。
- **函數式範式 (The functional paradigm)**：程式被視為一個數學函數。
- **宣告式範式 (The declarative paradigm)**：使用邏輯推理的原則來回答查詢。

## 9.4 共同概念
- **識別碼 (Identifiers)**：程式中物件的名稱。
- **資料型別 (Data types)**：定義一組值和運算。
- **變數 (Variables)**：記憶體位置的名稱。
- **字面值 (Literals)**：程式中使用的預定值。
- **常數 (Constants)**：儲存一個不能被改變的值的具名位置。
- **輸入與輸出 (Input and Output)**：讀取和/或寫入資料的操作。
- **表達式 (Expressions)**：由運算元和運算子組成的序列，可化簡為單一值。
- **陳述式 (Statements)**：使程式執行一個動作。
- **副程式 (Subprograms)**：完成單一任務的程式碼單元，可被多次呼叫。
`,
};
