
export const chapter13Content = {
  en: `
# Chapter 13: File Structure

In this chapter we discuss file structures. Based on the application, files are stored in 
auxiliary storage devices using various methods. We also discuss how individual records 
are retrieved.

## Objectives
After studying this chapter, the student should be able to:
- Define two categories of access methods: sequential access and random access. 
- Understand the structure of sequential files and how they are updated. 
- Understand the structure of indexed files and the relation between the index and the data file.
- Understand the idea behind hashed files and describe some hashing methods. 
- Describe address collisions and how they can be resolved.
- Define directories and how they can be used to organize files. 
- Distinguish between text and binary files. 

## 13.1 INTRODUCTION
A file is a collection of data records stored on auxiliary or secondary storage devices. The access method determines how records can be retrieved: sequentially or randomly.

## 13.2 SEQUENTIAL FILES
A sequential file is one in which records can only be accessed one after another from beginning to end.
- **Updating**: Involves an old master file, a transaction file, a new master file, and an error report file.

## 13.3 INDEXED FILES
An indexed file is made of a data file (sequential) and an index. The index maps the key of a record to its address on the disk.
- **Inverted files**: Indexed files with more than one index, each with a different key.

## 13.4 HASHED FILES
A hashed file uses a mathematical function to map a key to an address.
- **Hashing methods**: Direct hashing, modulo division hashing, digit extraction hashing.
- **Collision**: When a hashing algorithm produces an address that is already occupied.
  - **Collision resolution**: Open addressing, linked list resolution, bucket hashing.

## 13.5 DIRECTORIES
Directories are provided by most operating systems for organizing files in a hierarchical (tree) structure.

## 13.6 TEXT VERSUS BINARY FILES
- **Text file**: A file of characters.
- **Binary file**: A collection of data stored in the internal format of the computer.
`,
  zh: `
# 第十三章：檔案結構

在本章中，我們將討論檔案結構。根據應用程式的需求，檔案會使用各種方法儲存在輔助儲存裝置上。我們也將討論如何檢索個別記錄。

## 學習目標
學完本章後，學生應能：
- 定義兩種存取方法的類別：循序存取和隨機存取。
- 理解循序檔案的結構及其更新方式。
- 理解索引檔案的結構以及索引與資料檔之間的關係。
- 理解雜湊檔案背後的思想並描述一些雜湊方法。
- 描述位址碰撞及其解決方法。
- 定義目錄以及如何使用它們來組織檔案。
- 區分文字檔和二進位檔。

## 13.1 簡介
檔案是儲存在輔助或次級儲存裝置上的資料記錄集合。存取方法決定了記錄如何被檢索：循序或隨機。

## 13.2 循序檔案
循序檔案是一種只能從頭到尾一個接一個地存取記錄的檔案。
- **更新**：涉及舊主檔、交易檔、新主檔和錯誤報告檔。

## 13.3 索引檔案
索引檔案由一個資料檔（循序的）和一個索引組成。索引將記錄的鍵對應到其在磁碟上的位址。
- **倒排檔案**：具有多於一個索引的索引檔案，每個索引使用不同的鍵。

## 13.4 雜湊檔案
雜湊檔案使用一個數學函數將鍵對應到位址。
- **雜湊方法**：直接雜湊、模數除法雜湊、數字提取雜湊。
- **碰撞**：當雜湊演算法產生的位址已被佔用時。
  - **碰撞解決**：開放定址、鏈結串列解決、桶式雜湊。

## 13.5 目錄
大多數作業系統提供目錄，用於以階層（樹狀）結構組織檔案。

## 13.6 文字檔與二進位檔
- **文字檔**：由字元組成的檔案。
- **二進位檔**：以電腦內部格式儲存的資料集合。
`,
};
