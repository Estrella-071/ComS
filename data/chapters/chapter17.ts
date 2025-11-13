
export const chapter17Content = {
  en: `
# Chapter 17: Theory of Computation

In this chapter, we answer some questions such as: which problems can be solved by a 
computer? Is one language superior to another? To answer these questions, we turn to a 
discipline called the theory of computation.

## Objectives
After studying this chapter, the student should be able to:
- Describe a programming language we call Simple Language and its basic statements.
- Describe the components of a Turing machine as a computation model.
- Understand the Church–Turing thesis and its implication.
- Understand the concept of the halting problem and that it is unsolvable.
- Distinguish between solvable and unsolvable, polynomial and nonpolynomial solvable problems. 

## 17.1 SIMPLE LANGUAGE
We can define a computer language with only three statements: the increment statement, the decrement statement, and the loop statement. It can be shown that this simple language is as powerful as any sophisticated language in use today.

## 17.2 THE TURING MACHINE
The Turing machine was introduced in 1936 by Alan M. Turing to solve computable problems and is the foundation of modern computers. It consists of a tape, a controller, and a read/write head.

### 17.2.3 The Church–Turing thesis
> If an algorithm exists to do a symbol manipulation task, then a Turing machine exists to do that task.

This thesis claims that any symbol-manipulation task that can be done by writing an algorithm can also be done by a Turing machine.

## 17.3 GÖDEL NUMBERS
An unsigned number is assigned to every program that can be written in a specific language. This assignment has many advantages, including allowing programs to be used as data.

## 17.4 THE HALTING PROBLEM
A classical programming question is: Can we write a program that tests whether or not any program, represented by its Gödel number, will terminate? The halting problem is not solvable.

## 17.5 THE COMPLEXITY OF PROBLEMS
Problems can be divided into two categories: solvable and unsolvable.
- **Unsolvable problems**: Problems that cannot be solved by a computer (e.g., the halting problem).
- **Solvable problems**: Can be divided into polynomial and nonpolynomial problems based on their complexity, often expressed using Big-O notation.
  - **Polynomial problems**: Complexity is O(nᵏ). Generally considered tractable.
  - **Nonpolynomial problems**: Complexity is greater than polynomial (e.g., O(2ⁿ)). Generally considered intractable for large inputs.
`,
  zh: `
# 第十七章：計算理論

在本章中，我們將回答一些問題，例如：哪些問題可以由電腦解決？一種語言是否優於另一種語言？為了回答這些問題，我們轉向一個稱為計算理論的學科。

## 學習目標
學完本章後，學生應能：
- 描述我們稱為「簡單語言」的程式語言及其基本陳述式。
- 描述圖靈機作為計算模型的組件。
- 理解邱奇-圖靈論題及其意涵。
- 理解停機問題的概念及其不可解性。
- 區分可解和不可解問題，以及多項式和非多項式可解問題。

## 17.1 簡單語言
我們可以定義一種只有三個陳述式的電腦語言：遞增陳述式、遞減陳述式和迴圈陳述式。可以證明，這種簡單語言與今日使用的任何複雜語言一樣強大。

## 17.2 圖靈機
圖靈機由艾倫·圖靈於 1936 年提出，用於解決可計算問題，是現代電腦的基礎。它由一條紙帶、一個控制器和一個讀寫頭組成。

### 17.2.3 邱奇-圖靈論題
> 如果存在一個演算法來執行符號操作任務，那麼就存在一台圖靈機來執行該任務。

該論題主張，任何可以透過編寫演算法來完成的符號操作任務，也可以由圖靈機完成。

## 17.3 哥德爾數
對於可以用特定語言編寫的每個程式，都會分配一個無符號數。這種分配有許多優點，包括允許程式作為資料使用。

## 17.4 停機問題
一個經典的程式設計問題是：我們能否編寫一個程式來測試任何程式（由其哥德爾數表示）是否會終止？停機問題是不可解的。

## 17.5 問題的複雜度
問題可以分為兩類：可解和不可解。
- **不可解問題**：無法由電腦解決的問題（例如，停機問題）。
- **可解問題**：可根據其複雜度分為多項式和非多項式問題，通常使用大 O 符號表示。
  - **多項式問題**：複雜度為 O(nᵏ)。通常被認為是易解的。
  - **非多項式問題**：複雜度大於多項式（例如，O(2ⁿ)）。對於大的輸入，通常被認為是難解的。
`,
};
