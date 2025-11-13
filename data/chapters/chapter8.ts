
export const chapter8Content = {
  en: `
# Chapter 8: Algorithms

In this chapter we introduce the concept of algorithms, step-by-step procedures for solving a problem. We then discuss the tools used to develop algorithms. Finally, we give some 
examples of common iterative and recursive algorithms. 

## Objectives
After studying this chapter, the student should be able to:
- Define an algorithm and relate it to problem solving.
- Define three constructs—sequence, selection, and repetition—and describe their use in algorithms. 
- Describe UML diagrams and how they can be used when representing algorithms.
- Describe pseudocode and how it can be used when representing algorithms.
- List basic algorithms and their applications.
- Describe the concept of sorting and understand the mechanisms behind three primitive sorting algorithms. 
- Describe the concept of searching and understand the mechanisms behind two common searching algorithms.
- Define subalgorithms and their relations to algorithms.
- Distinguish between iterative and recursive algorithms.

## 8.1 CONCEPT
An algorithm is a step-by-step method for solving a problem or doing a task. It accepts input data and creates output data. A more formal definition is: An ordered set of unambiguous steps that produces a result and terminates in a finite time.

## 8.2 THREE CONSTRUCTS
Computer scientists have defined three constructs for a structured program or algorithm:
1.  **Sequence**: A sequence of instructions.
2.  **Decision (Selection)**: Tests a condition to follow different paths.
3.  **Repetition (Loop)**: Repeats a sequence of instructions.

## 8.3 ALGORITHM REPRESENTATION
- **UML (Unified Modeling Language)**: A pictorial representation of an algorithm.
- **Pseudocode**: An English-language-like representation of an algorithm.

## 8.5 BASIC ALGORITHMS
- **Summation**: Adds a list of numbers.
- **Product**: Multiplies a list of numbers.
- **Smallest and largest**: Finds the smallest or largest value in a list.
- **Sorting**: The process by which data is arranged according to its values.
  - **Selection sort**: Divides the list into sorted and unsorted sublists, finds the smallest element from the unsorted sublist, and swaps it with the element at the beginning of the unsorted sublist.
  - **Bubble sort**: The smallest element is bubbled up from the unsorted sublist and moved to the sorted sublist.
  - **Insertion sort**: The first element of the unsorted sublist is transferred to the sorted sublist and inserted at the appropriate place.
- **Searching**: The process of finding the location of a target among a list of objects.
  - **Sequential search**: Used if the list is not ordered.
  - **Binary search**: Requires the list to be sorted first.

## 8.6 SUBALGORITHMS
An algorithm can be broken into small units called subalgorithms.

## 8.7 RECURSION
Recursion is a process in which an algorithm calls itself.
- **Iterative definition**: An algorithm that does not involve the algorithm itself.
- **Recursive definition**: An algorithm that appears within its own definition.
`,
  zh: `
# 第八章：演算法

在本章中，我們介紹演算法的概念，即解決問題的逐步程序。然後我們討論開發演算法所使用的工具。最後，我們給出一些常見的迭代和遞迴演算法的範例。

## 學習目標
學完本章後，學生應能：
- 定義演算法並將其與問題解決聯繫起來。
- 定義循序、選擇和重複三個建構，並描述它們在演算法中的應用。
- 描述 UML 圖以及它們如何用於表示演算法。
- 描述偽代碼以及它如何用於表示演算法。
- 列出基本演算法及其應用。
- 描述排序的概念，並理解三種原始排序演算法背後的機制。
- 描述搜尋的概念，並理解兩種常見搜尋演算法背後的機制。
- 定義子演算法及其與演算法的關係。
- 區分迭代和遞迴演算法。

## 8.1 概念
演算法是解決問題或執行任務的逐步方法。它接受輸入資料並產生輸出資料。一個更正式的定義是：一個有序、無歧義的步驟集合，能在有限時間內產生結果並終止。

## 8.2 三個建構
電腦科學家為結構化程式或演算法定義了三個建構：
1.  **循序 (Sequence)**：一系列的指令。
2.  **決策 (選擇) (Decision (Selection))**：測試一個條件以遵循不同的路徑。
3.  **重複 (迴圈) (Repetition (Loop))**：重複執行一系列指令。

## 8.3 演算法表示法
- **UML (統一塑模語言)**：演算法的圖形表示。
- **偽代碼 (Pseudocode)**：演算法的類英語表示。

## 8.5 基本演算法
- **總和 (Summation)**：將一列數字相加。
- **乘積 (Product)**：將一列數字相乘。
- **最小與最大 (Smallest and largest)**：在一列數中找到最小值或最大值。
- **排序 (Sorting)**：根據數值排列資料的過程。
  - **選擇排序 (Selection sort)**：將列表分為已排序和未排序的子列表，從未排序子列表中找到最小的元素，並將其與未排序子列表開頭的元素交換。
  - **氣泡排序 (Bubble sort)**：最小的元素從未排序子列表中像氣泡一樣冒上來，並移動到已排序的子列表。
  - **插入排序 (Insertion sort)**：將未排序子列表的第一個元素轉移到已排序子列表，並插入到適當的位置。
- **搜尋 (Searching)**：在一列物件中找到目標位置的過程。
  - **循序搜尋 (Sequential search)**：如果列表未排序時使用。
  - **二元搜尋 (Binary search)**：要求列表必須先排序。

## 8.6 子演算法
一個演算法可以分解成稱為子演算法的小單元。

## 8.7 遞迴
遞迴是一個演算法呼叫自身的過程。
- **迭代定義**：不涉及演算法本身的演算法。
- **遞迴定義**：出現在自身定義中的演算法。
`,
};
