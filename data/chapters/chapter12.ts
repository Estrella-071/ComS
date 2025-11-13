
export const chapter12Content = {
  en: `
# Chapter 12: Abstract Data Types

This chapter discusses abstract data types (ADTs), which are data types at a higher 
level of abstraction than the data structures we discussed in Chapter 11. ADTs use data 
structures for implementation.

## Objectives
After studying this chapter, the student should be able to:
- Define the concept of an abstract data type (ADT).
- Define a stack, a queue, a general linear list, a tree, a binary tree, a binary search tree (BST), and a graph, along with their basic operations, applications, and implementations.

## 12.1 BACKGROUND
An **abstract data type (ADT)** is a data type packaged with the operations that are meaningful for that data type. The ADT encapsulates the data and operations, hiding the implementation details from the user.

## 12.2 STACKS
A **stack** is a restricted linear list in which all additions and deletions are made at one end, the top. It is a **last in, first out (LIFO)** data structure.
- **Operations**: \`push\` (insert), \`pop\` (delete), \`empty\`.
- **Applications**: Reversing data, pairing data (e.g., checking parentheses), and backtracking.

## 12.3 QUEUES
A **queue** is a linear list in which data can only be inserted at one end, called the rear, and deleted from the other end, called the front. It is a **first in, first out (FIFO)** structure.
- **Operations**: \`enqueue\` (insert), \`dequeue\` (delete), \`empty\`.
- **Applications**: Processing jobs in order, managing requests, and balancing between fast producers and slow consumers.

## 12.4 GENERAL LINEAR LISTS
A list in which operations, such as insertion and deletion, can be done anywhere in the list.

## 12.5 TREES
A **tree** consists of a finite set of elements, called nodes (or vertices), and a finite set of directed lines, called arcs, that connect pairs of the nodes.
- **Binary tree**: A tree in which no node can have more than two subtrees.
  - **Traversals**: Preorder (root, left, right), Inorder (left, root, right), Postorder (left, right, root).
- **Binary search tree (BST)**: A binary tree where the key value of each node is greater than all keys in its left subtree and smaller than all keys in its right subtree.

## 12.6 GRAPHS
A **graph** is an ADT made of a set of nodes (vertices) and a set of lines connecting them (edges or arcs). A node in a graph can have one or more parents.
`,
  zh: `
# 第十二章：抽象資料型別

本章討論抽象資料型別（ADT），這是在比第十一章討論的資料結構更高抽象層級的資料類型。ADT 使用資料結構來實現。

## 學習目標
學完本章後，學生應能：
- 定義抽象資料型別（ADT）的概念。
- 定義堆疊、佇列、一般線性串列、樹、二元樹、二元搜尋樹（BST）和圖，以及它們的基本操作、應用和實現。

## 12.1 背景
**抽象資料型別（ADT）**是一種將資料類型與對該資料類型有意義的操作打包在一起的資料類型。ADT 封裝了資料和操作，對使用者隱藏了實現細節。

## 12.2 堆疊
**堆疊**是一種受限制的線性串列，其中所有的新增和刪除都在一端進行，即頂部。它是一種**後進先出（LIFO）**的資料結構。
- **操作**：\`push\`（插入）、\`pop\`（刪除）、\`empty\`。
- **應用**：反轉資料、配對資料（例如，檢查括號）和回溯。

## 12.3 佇列
**佇列**是一種線性串列，其中資料只能在一端（稱為尾端）插入，並從另一端（稱為前端）刪除。它是一種**先進先出（FIFO）**的結構。
- **操作**：\`enqueue\`（插入）、\`dequeue\`（刪除）、\`empty\`。
- **應用**：按順序處理工作、管理請求，以及在快速生產者和慢速消費者之間取得平衡。

## 12.4 一般線性串列
一種可以在串列中任何位置進行插入和刪除等操作的串列。

## 12.5 樹
**樹**由一組有限的元素（稱為節點或頂點）和一組有限的連接節點對的有向線（稱為弧）組成。
- **二元樹**：其中沒有節點可以有超過兩個子樹的樹。
  - **遍歷**：前序（根、左、右）、中序（左、根、右）、後序（左、右、根）。
- **二元搜尋樹（BST）**：一種二元樹，其中每個節點的鍵值大於其左子樹中的所有鍵，且小於其右子樹中的所有鍵。

## 12.6 圖
**圖**是由一組節點（頂點）和一組連接它們的線（邊或弧）組成的 ADT。圖中的一個節點可以有一個或多個父節點。
`,
};
