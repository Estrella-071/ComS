
export const chapter11Content = {
  en: `
# Chapter 11: Data Structure

In this chapter, we introduce data structures: collections of related variables that can be accessed individually or as a whole. We discuss three data structures: arrays, records, and linked lists.

## Objectives
After studying this chapter, the student should be able to:
- Define a data structure.
- Define an array, record, and linked list and how they are used.
- Distinguish between the names and elements in these structures.
- Describe operations for each structure.
- Compare and contrast arrays, records, and linked lists.

## 11.1 ARRAYS
An **array** is a sequenced collection of elements of the same data type. Elements are accessed by an **index**.
- **Multidimensional arrays**: Arrays with more than one dimension, like a two-dimensional array (table).
- **Memory layout**: Usually stored in row-major order.
- **Operations**: Searching, insertion, deletion, retrieval, and traversal.
- **Application**: Suitable for a list with a small number of insertions/deletions but a lot of searching and retrieval.

## 11.2 RECORDS
A **record** is a collection of related elements, called **fields**, which can be of different types, having a single name.
- **Array of records**: A combination where each element of an array is a record.

## 11.3 LINKED LISTS
A **linked list** is a collection of data in which each element (**node**) contains two parts: data and a **link** (a pointer to the next element).
- The list is not stored contiguously in memory.
- The last node's link is a **null pointer**.
- **Arrays versus linked lists**: Arrays offer fast random access but are static in size. Linked lists are dynamic and offer efficient insertion/deletion but only allow sequential access.
- **Operations**:
  - **Searching**: Must be sequential.
  - **Inserting a node**: Requires updating pointers. Cases include inserting into an empty list, at the beginning, at the end, or in the middle.
  - **Deleting a node**: Requires updating the previous node's pointer to bypass the deleted node.
  - **Traversing**: Visiting each node sequentially using a "walking" pointer.
- **Application**: A suitable structure for a large number of insertions and deletions.
`,
  zh: `
# 第十一章：資料結構

在本章中，我們介紹資料結構：可以單獨或作為整體存取的相關變數的集合。我們將討論三種資料結構：陣列、記錄和鏈結串列。

## 學習目標
學完本章後，學生應能：
- 定義資料結構。
- 定義陣列、記錄和鏈結串列以及它們的使用方式。
- 區分這些結構中的名稱和元素。
- 描述每種結構的操作。
- 比較和對比陣列、記錄和鏈結串列。

## 11.1 陣列
**陣列**是相同資料類型元素的序列集合。元素通過**索引**存取。
- **多維陣列**：具有多於一個維度的陣列，如二維陣列（表格）。
- **記憶體佈局**：通常以列優先順序儲存。
- **操作**：搜尋、插入、刪除、檢索和遍歷。
- **應用**：適用於插入/刪除次數少但搜尋和檢索次數多的列表。

## 11.2 記錄
**記錄**是相關元素的集合，稱為**欄位**，可以具有不同的類型，並擁有單一名稱。
- **記錄陣列**：一種組合，其中陣列的每個元素都是一個記錄。

## 11.3 鏈結串列
**鏈結串列**是資料的集合，其中每個元素（**節點**）包含兩部分：資料和一個**連結**（指向下一個元素的指標）。
- 列表在記憶體中不是連續儲存的。
- 最後一個節點的連結是**空指標**。
- **陣列與鏈結串列的比較**：陣列提供快速的隨機存取，但大小是靜態的。鏈結串列是動態的，提供高效的插入/刪除，但只允許循序存取。
- **操作**：
  - **搜尋**：必須是循序的。
  - **插入節點**：需要更新指標。情況包括插入到空列表、開頭、結尾或中間。
  - **刪除節點**：需要更新前一個節點的指標以繞過被刪除的節點。
  - **遍歷**：使用「行走」指標循序訪問每個節點。
- **應用**：適用於大量插入和刪除的結構。
`,
};
