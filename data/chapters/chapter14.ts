
export const chapter14Content = {
  en: `
# Chapter 14: Databases

In this chapter we discuss databases and database management systems (DBMS), focusing on the relational database model.

## Objectives
After studying this chapter, the student should be able to:
- Define a database and a database management system (DBMS) and describe their components. 
- Describe the architecture of a DBMS based on the ANSI/SPARC definition. 
- Define the three traditional database models: hierarchical, networking, and relational. 
- Describe the relational model and understand operations on a relational database.
- Describe the steps in database design, including ERM and normalization.

## 14.1 INTRODUCTION
A **database** is a collection of related, logically coherent data used by application programs in an organization. It has advantages over flat-file systems, including less redundancy and inconsistency. A **database management system (DBMS)** defines, creates, and maintains a database.

## 14.2 DATABASE ARCHITECTURE
The ANSI/SPARC has established a three-level architecture for a DBMS:
- **Internal level**: Determines where data is actually stored on the storage devices.
- **Conceptual level**: Defines the logical view of the data.
- **External level**: Interacts directly with the user.

## 14.3 DATABASE MODELS
- **Hierarchical model**: Data is organized as an inverted tree.
- **Network model**: Entities are organized in a graph.
- **Relational model**: Data is organized in two-dimensional tables called relations.

## 14.4 THE RELATIONAL DATABASE MODEL
In the relational database management system (RDBMS), the data is represented as a set of relations.
- **Relation**: A two-dimensional table with a unique name.
- **Attribute**: A column in a relation.
- **Tuple**: A row in a relation.
- **Operations**: SQL (Structured Query Language) is used for operations like INSERT, DELETE, UPDATE, SELECT, PROJECT, JOIN, UNION, INTERSECTION, and DIFFERENCE.

## 14.5 DATABASE DESIGN
The design of a database involves:
- **Entity-relation model (ERM)**: Creates an entity-relationship (E-R) diagram to show entities, attributes, and relationships.
- **Normalization**: The process of transforming relations to a more solid structure to reduce redundancy and anomalies. Normal forms include 1NF, 2NF, 3NF, etc.

## 14.6 OTHER DATABASE MODELS
- **Distributed databases**: Data is stored on several computers, either fragmented or replicated.
- **Object-oriented databases**: Store data as objects, which encapsulate data and methods.
`,
  zh: `
# 第十四章：資料庫

在本章中，我們將討論資料庫和資料庫管理系統 (DBMS)，重點放在關聯式資料庫模型。

## 學習目標
學完本章後，學生應能：
- 定義資料庫和資料庫管理系統 (DBMS) 並描述其組件。
- 根據 ANSI/SPARC 定義描述 DBMS 的架構。
- 定義三種傳統的資料庫模型：階層式、網路式和關聯式。
- 描述關聯式模型並理解對關聯式資料庫的操作。
- 描述資料庫設計的步驟，包括 ERM 和正規化。

## 14.1 簡介
**資料庫**是一個組織中應用程式所使用的相關、邏輯上一致的資料集合。與扁平檔案系統相比，它具有較少冗餘和不一致等優點。**資料庫管理系統 (DBMS)** 定義、建立和維護資料庫。

## 14.2 資料庫架構
ANSI/SPARC 為 DBMS 建立了三層架構：
- **內部層級 (Internal level)**：決定資料實際儲存在儲存裝置上的位置。
- **概念層級 (Conceptual level)**：定義資料的邏輯視圖。
- **外部層級 (External level)**：直接與使用者互動。

## 14.3 資料庫模型
- **階層式模型 (Hierarchical model)**：資料組織成倒置的樹狀結構。
- **網路式模型 (Network model)**：實體組織成圖形結構。
- **關聯式模型 (Relational model)**：資料組織在稱為關聯的二維表格中。

## 14.4 關聯式資料庫模型
在關聯式資料庫管理系統 (RDBMS) 中，資料表示為一組關聯。
- **關聯 (Relation)**：具有唯一名稱的二維表格。
- **屬性 (Attribute)**：關聯中的一個欄位。
- **元組 (Tuple)**：關聯中的一列。
- **操作**：SQL (結構化查詢語言) 用於諸如 INSERT、DELETE、UPDATE、SELECT、PROJECT、JOIN、UNION、INTERSECTION 和 DIFFERENCE 等操作。

## 14.5 資料庫設計
資料庫的設計涉及：
- **實體關係模型 (ERM)**：建立一個實體關係 (E-R) 圖，以顯示實體、屬性和關係。
- **正規化 (Normalization)**：將關聯轉換為更穩固的結構以減少冗餘和異常的過程。正規形式包括 1NF、2NF、3NF 等。

## 14.6 其他資料庫模型
- **分散式資料庫 (Distributed databases)**：資料儲存在多台電腦上，可以是分散的或複製的。
- **物件導向資料庫 (Object-oriented databases)**：將資料儲存為物件，物件封裝了資料和方法。
`,
};
