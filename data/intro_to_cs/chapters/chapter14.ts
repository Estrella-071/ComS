
export const chapter14Content = {
  en: `
# Chapter 14: Databases

In this chapter we discuss databases and database management systems (DBMS). We present the three-level architecture for a DBMS, focusing on the **relational database** model, with examples of its operation. We also discuss a language (Standard Query Language) that operates on relational databases. We briefly touch on the design of the databases, and finally mention other database models.

## Objectives
After studying this chapter, the student should be able to:
- Define a database and a database management system (DBMS) and describe the components of a DBMS.
- Describe the architecture of a DBMS based on the ANSI/SPARC definition.
- Define the three traditional database models: hierarchical, networking, and relational.
- Describe the relational model and relations.
- Understand operations on a relational database based on commands available in SQL.
- Describe the steps in database design.
- Define ERM and E-R diagrams and explain the entities and relationships in this model.
- Define the hierarchical levels of normalization and understand the rationale for normalizing the relations.
- List database types other than the relational model.

## 14.1 INTRODUCTION
Data storage traditionally used individual, unrelated files, sometimes called **flat-files**. In the past, each application program in an organization used its own file. In a university, for example, each department might have its own set of files: the record office kept a file about the student information and their grades, the financial aid office kept its own file about students that needed financial aid to continue their education, the scheduling office kept the name of the professors and the courses they were teaching, the payroll department kept its own file about the whole staff (including professors), and so on. Today, however, all of these flat-files can be combined in a single entity, the database for the whole university.

### 14.1.1 Definition
Although it is difficult to give a universally agreed definition of a database, we use the following common definition:
**Definition: A database is a collection of related, logically coherent, data used by the application programs in an organization.**

### 14.1.2 Advantages of databases
Comparing the flat-file system, we can mention several advantages of a database system.

**Less redundancy**
In a flat-file system there is a lot of redundancy. For example, in the flat-file system for a university, the names of professors and students are stored in more than one file.

**Inconsistency avoidance**
If the same piece of information is stored in more than one place, then any changes in the data need to occur in all places that data is stored. For example, if a female student marries and accepts the last name of her husband, the last name of the student needs to be changed in all files that hold information about the student. Lack of care may create inconsistency in the data.

**Efficiency**
A database is usually more efficient that a flat-file system, because a piece of information is stored in fewer locations.

**Data integrity**
In a database system it is easier to maintain data integrity (see Chapter 16) because a piece of data is stored in fewer locations.

**Confidentiality**
It is easier to maintain the confidentiality of the information if the storage of data is centralized in one location.

### 14.1.3 Database management systems
A **database management system (DBMS)** defines, creates, and maintains a database. The DBMS also allows controlled access to data in the database. A DBMS is a combination of five components: hardware, software, data, users, and procedures.

**Hardware**
The hardware is the physical computer system that allows access to data. For example, the terminals, hard disk, main computer, and workstations are considered part of the hardware in a DBMS.

**Software**
The software is the actual program that allows users to access, maintain, and update data. In addition, the software controls which user can access which parts of the data in the database.

**Data**
The data in a database is stored physically on the storage devices. In a database, data is a separate entity from the software that accesses it. This separation allows the organization to change the software without having to change the physical data or the way in which it is stored. If an organization decides to use a DBMS, then all the information needed by the organization should be kept together as one entity, to be accessible by the software in the DBMS.

**Users**
The term users in a DBMS has a broad meaning. We can divide users into two categories: end users and application programs.
- **End users**: End users are those humans who can access the database directly to get information. There are two types of end users: **database administrators (DBAs)** and normal users. Database administrators have the maximum level of privileges and can control other users and their access to the DBMS, grant some of their privileges to somebody else, but retain the ability to revoke them at any time. A normal user, on the other hand, can only use part of the database and has limited access.
- **Application programs**: The other users of data in a database are **application programs**. Applications need to access and process data. For example, a payroll application program needs to access part of the data in a database to create paychecks at the end of the month.

**Procedures**
The last component of a DBMS is a set of procedures or rules that should be clearly defined and followed by the users of the database.

## 14.2 DATABASE ARCHITECTURE
The American National Standards Institute/Standards Planning and Requirements Committee (ANSI/SPARC) has established a three-level architecture for a DBMS: internal, conceptual, and external.

### 14.2.1 Internal level
The **internal level** determines where data is actually stored on the storage devices. This level deals with low-level access methods and how bytes are transferred to and from storage devices. In other words, the internal level interacts directly with the hardware.

### 14.2.2 Conceptual level
The **conceptual level** defines the logical view of the data. The data model is defined on this level, and the main functions of the DBMS, such as queries, are also on this level. The DBMS changes the internal view of data to the external view that users need to see. The conceptual level is an intermediary and frees users from dealing with the internal level.

### 14.2.3 External level
The **external level** interacts directly with the user (end users or application programs). It changes the data coming from the conceptual level to a format and view that is familiar to the users.

## 14.3 DATABASE MODELS
A **database model** defines the logical design of data. The model also describes the relationships between different parts of the data. In the history of database design, three models have been in use: the hierarchical model, the network model, and the relational model.

### 14.3.1 Hierarchical database model
In the **hierarchical model**, data is organized as an inverted tree. Each entity has only one parent but can have several children. At the top of the hierarchy, there is one entity, which is called the *root*. As the hierarchical model is obsolete, no further discussion of this model is necessary.

### 14.3.2 Network database model
In the **network model**, the entities are organized in a graph, in which some entities can be accessed through several paths. There is no hierarchy. This model is also obsolete and needs no further discussion.

### 14.3.3 Relational database model
In the **relational model**, data is organized in two-dimensional tables called **relations**. There is no hierarchical or network structure imposed on the data. The tables or *relations* are, however, related to each other.
The relational model is one of the common models in use today, and we devote most of this chapter to it. In the last section, we briefly discuss the other two common models that are derived from the relational model: the distributed model and the object-oriented model.

## 14.4 THE RELATIONAL DATABASE MODEL
In the **relational database management system (RDBMS)**, the data is represented as a set of relations.

### 14.4.1 Relation
A **relation**, in appearance, is a two-dimensional table. The RDBMS organizes the data so that its external view is a set of relations or tables. This does not mean that data are stored as tables: the physical storage of the data is independent of the way in which the data is logically organized.
A relation in an RDBMS has the following features:
- **Name**. Each relation in a relational database should have a name that is unique among other relations.
- **Attributes**. Each column in a relation is called an **attribute**. The attributes are the column headings in the table. Each attribute gives meaning to the data stored under it. Each column in the table must have a name that is unique in the scope of the relation. The total number of attributes for a relation is called the **degree** of the relation. Note that the attribute names are not stored in the database: the conceptual level uses the attributes to give meaning to each column.
- **Tuples**. Each row in a relation is called a **tuple**. A tuple defines a collection of attribute values. The total number of rows in a relation is called the **cardinality** of the relation. Note that the cardinality of a relation changes when tuples are added or deleted. This makes the database dynamic.

### 14.4.2 Operations on relations
In a relational database we can define several operations to create new relations based on existing ones. We define nine operations in this section: *insert*, *delete*, *update*, *select*, *project*, *join*, *union*, *intersection*, and *difference*. Instead of discussing these operations in the abstract, we describe each operation as defined in the database query language SQL (Structured Query Language).

**Structured Query Language**
**Structured Query Language (SQL)** is the language standardized by the American National Standards Institute (ANSI) and the **International Organization for Standardization (ISO)** for use on relational databases. It is a declarative rather than procedural language, which means that users declare what they want without having to write a step-by-step procedure. The SQL language was first implemented by the Oracle Corporation in 1979, with various versions of SQL being released since then.

**Insert**
The **insert operation** is a **unary operation**—that is, it is applied to a single relation. The operation inserts a new tuple into the relation. The insert operation uses the following format:
\`\`\`sql
insert into RELATION-NAME values (..., ..., ...)
\`\`\`
The *values* clause defines all the attribute values for the corresponding tuple to be inserted. String values are enclosed in quotation marks, numeric values are not.

**Delete**
The **delete operation** is also a unary operation. The operation deletes a tuple defined by a criterion from the relation. The delete operation uses the following format:
\`\`\`sql
delete from RELATION-NAME where criteria
\`\`\`
The criteria for deletion are defined in the *where* clause.

**Update**
The **update operation** is also a unary operation that is applied to a single relation. The operation changes the value of some attributes of a tuple. The update operation uses the following format:
\`\`\`sql
update RELATION-NAME
set attribute1 = value1, attribute2 = value2, ...
where criteria
\`\`\`
The attribute to be changed is defined in the *set* clause and the criteria for updating in the *where* clause.

**Select**
The **select operation** is a unary operation—that is, is applied to a single relation—and creates another relation. The tuples (rows) in the resulting relation are a subset of the tuples in the original relation. The select operation uses some criteria to select some of the tuples from the original relation. The select operation uses the following format:
\`\`\`sql
select *
from RELATION-NAME
where criteria
\`\`\`
The asterisk signifies that all attributes are chosen.

**Project**
The **project operation** is also a unary operation, and creates another relation. The attributes (columns) in the resulting relation are a subset of the attributes in the original relation. The project operation creates a relation in which each tuple has fewer attributes. The number of tuples (rows) in this operation remains the same. The project operation uses the following format:
\`\`\`sql
select attribute-list
from RELATION-NAME
\`\`\`
The names of the columns for the new relation are explicitly listed.

**Join**
The **join operation** is a **binary operation**—it takes two relations and combines them based on common attributes. The join operation uses the following format:
\`\`\`sql
select attribute-list
from RELATION1, RELATION2
where criteria
\`\`\`
The attribute list is the combination of attributes from the two input relations: criteria explicitly define the attributes used as common attributes. The join operation is complex and has many variations.

**Union**
The **union operation** is also a binary operation, taking two relations and creating a new relation. However, there is a restriction on the two relations: they must have the same attributes. The union operation, as defined in set theory, creates a new relation in which each tuple is either in the first relation, in the second, or in both. The union operation uses the following format:
\`\`\`sql
select *
from RELATION1
union
select *
from RELATION2
\`\`\`
Again, asterisks signify that all attributes are selected.

**Intersection**
The **intersection operation** is also a binary operation, taking two relations and creating a new relation. Like the union operation, the two relations must have the same attributes. The intersection operation, as defined in set theory, creates a new relation in which each tuple is a member in both relations. The intersection operation uses the following format:
\`\`\`sql
select *
from RELATION1
intersection
select *
from RELATION2
\`\`\`

**Difference**
The **difference operation** is also a binary operation. It is applied to two relations with the same attributes. The tuples in the resulting relation are those that are in the first relation but not the second. The difference operation uses the following format:
\`\`\`sql
select *
from RELATION1
minus
select *
from RELATION2
\`\`\`

**Combination of statements**
The SQL language allows us to combine the foregoing statements to extract more complex information from a database.

## 14.5 DATABASE DESIGN
The design of any database is a lengthy and involved task that can only be done through a step-by-step process. The first step normally involves a lot of interviewing of potential users of the database, for example in a university, to collect the information needed to be stored and the access requirements of each department. The second step is to build an **entity–relation model (ERM)** that defines the entities for which some information must be maintained, the attributes of these entities, and the relationship between these entities.

The next step in design is based on the type of database to be used. In a relational database, the next step is to build relations based on the ERM and normalize the relations. In this introductory course, we just give some idea about ERMs and normalization.

### 14.5.1 Entity–relation model (ERM)
In this step, the database designer creates an **entity–relationship (E-R) diagram** to show the entities for which information needs to be stored and the relationship between those entities. E-R diagrams uses several geometric shapes, but we use only a few of them here:
- **Rectangles** represent entity sets.
- **Ellipses** represent attributes.
- **Diamonds** represent relationship sets.
- **Lines** link attributes to entity sets and link entity sets to relationship sets.

The relationships, which are shown by diamonds, can be one-to-one, one-to-many, many-to-one, and many-to-many.

### 14.5.2 From E-R diagrams to relations
After the E-R diagram has been finalized, relations (tables) in the relational database can be created.

**Relations for entity sets**
For each entity set in the E-R diagram, we create a relation (table) in which there are *n* columns related to the *n* attributes defined for that set.

**Relations for relationship sets**
For each relationship set in the E-R diagram, we create a relation (table). This relation has one column for the key of each entity set involved in this relationship and also one column for each attribute of the relationship itself if the relationship has attributes.

### 14.5.3 Normalization
**Normalization** is the process by which a given set of relations are transformed to a new set of relations with a more solid structure. Normalization is needed to allow any relation in the database to be represented, to allow a languages like SQL to use powerful retrieval operations composed of atomic operations, to remove anomalies in insertion, deletion, and updating, and reduce the need for restructuring the database as new data type are added.

The normalization process defines a set of hierarchical **normal forms (NFs)**. Several normal forms have been proposed, including 1NF, 2NF, 3NF, BCNF (Boyce–Codd Normal Form), 4NF, PJNF (Projection/Joint Normal Form), 5NF, and so on. The discussion of these normal forms (except 1NF) involves the discussion of functional dependencies, a theoretical discipline, which is beyond the scope of this book. However, one important point that we need to know is that these normal forms form a hierarchical structure. In other words, if the relations in a database are in 3NF, it should have been first in 2NF.

**First normal form (1NF)**
When we transform entities or relationships into tabular relations, there may be some relations in which there are more values in the intersection of a row or column. A relation that is not in the first normal form may suffers from many problems. These two relations can be normalized by repeating the rows in which this problem exists.

**Second normal form (2NF)**
In each relation we need to have a key (called a *primary key*) on which all other attributes (column values) needs to depend. However, it may happen that when relations are established based on the E-R diagram, we may have some composite keys (a combination of two or more keys). In this case, a relation is in second normal form if every non-key attribute depends on the whole composite key.
If some attributes depend on part of the composite key, the relation is not in second normal form. We can apply the 2NF process and divide the relation into two, both in the second normal form.

**Other normal forms**
Other normal forms use more complicated dependencies among attributes. We leave these dependencies to books dedicated to the discussion of database topics.

## 14.6 OTHER DATABASE MODELS
The relational database is not the only database model in use today. Two other common models are *distributed databases* and *object-oriented databases*. We briefly discuss these here.

### 14.6.1 Distributed databases
The **distributed database** model is not a new model, but is based on the relational model. However, the data is stored on several computers that communicate through the Internet or a private wide area network. Each computer (or site) maintains either part of the database or the whole database. In other words, data is either fragmented, with each fragment stored at one site, or data is replicated at each site.

**Fragmented distributed databases**
In a **fragmented distributed database**, data is localized—locally used data is stored at the corresponding site. However, this does not mean that a site cannot access data stored at another site, access is mostly local, but occasionally global. Although each site has complete control over its local data, there is global control through the Internet or a wide area network.
For example, a pharmaceutical company may have multiple sites in many countries. Each site has a database with information about its own employees, but a central personnel department could have control of all the databases.

**Replicated distributed databases**
In a **replicated distributed database**, each site holds an exact replica of another site. Any modification to data stored in one site is repeated exactly at every site. The reason for having such a database is security. If the system at one site fails, users at the site can access data at another site.

### 14.6.2 Object-oriented databases
The relational database has a specific view of data that is based on the nature of the database’s tuples and attributes. The smallest unit of data in a relational database is the intersection of a tuple and an attribute. However, some applications need to look at data in other forms, for example to see data as a structure (see Chapter 11), such as a record composed of fields.
An **object-oriented database** tries to keep the advantages of the relational model and at the same time allows applications to access structured data. In an object-oriented database, objects and their relations are defined. In addition, each object can have attributes that can be expressed as fields.
For example, in an organization, one could define object types for employee, department, and customer. The employee class could define the attributes of an employee object (first name, last name, social security number, salary, and so on) and how they can be accessed. The department object could define the attributes of the department and how they can be accessed. In addition, the database could create a relation between an employee object and a department object to denote that the employee works in that department.

**XML**
The query language normally used for objected-oriented databases is **XML (Extensible Markup Language)**. XML was originally designed to add markup information to text documents, but it also has found its application as a query language in databases. XML can represent data with nested structure.

## 14.7 END-CHAPTER MATERIALS

### 14.7.1 Recommended reading
For more details about subjects discussed in this chapter, the following books are recommended:
- Alagic, S. *Relational Database Technology*, New York: Springer, 1986
- Dietrich, S. *Understanding Relational Database Query Language*, Upper Saddle River, NJ: Prentice-Hall, 2001
- Elmasri, R. and Navathe, S. *Fundamentals of Database Systems*, Reading, MA: Addison-Wesley, 2006
- Mannino, M. *Database Application Development and Design*, New York: McGraw-Hill, 2001
- Ramakrishnan, R. and Gehrke, J. *Database Management Systems*, New York: McGraw-Hill, 2003
- Silberschatz, A., Korth, H. and Sudarshan, S. *Databases: System Concepts*, New York: McGraw-Hill, 2005

### 14.7.2 Key Terms
- application programs
- attribute
- binary operation
- cardinality
- conceptual level
- database
- database management system (DBMS)
- database model
- delete operation
- difference operation
- distributed database
- End users
- Entity-Relation Model (E-R)
- Entity–Relationship (E-R) diagram
- external level
- flat-files
- fragmented distributed database
- hierarchical model
- insert operation
- internal level
- International Organization for Standardization (ISO)
- intersection operation
- join operation
- name
- network model
- normal form (NF)
- normalization
- object-oriented database
- project operation
- relation
- relational database management system (RDBMS)
- relational model
- replicated distributed database
- select operation
- Structured Query Language (SQL)
- tuple
- unary operation
- union operation
- update operation
- users

### 14.7.3 Summary
- A database is a collection of data that is logically, but not necessarily physically, coherent—its various parts can be physically separated. A database management system (DBMS) defines, creates, and maintains a database.
- The American National Standards Institute/Standards Planning and Requirements Committee (ANSI/SPARC) has established a three-level architecture for a DBMS: internal, conceptual, and external. The internal level determines where data is actually stored on storage devices. The conceptual level defines the logical view of the data. The external level interacts directly with the user.
- Traditionally, three types of database model were defined: hierarchical, network, and relational. Only the last, relational model, has survived.
- In the relational model, data is organized in two-dimensional tables called relations. A relation has the following features: name, attributes, and tuples.
- In a relational database we can define several operations to create new relations based on existing ones. We mentioned nine operations in the context of the database query language SQL (Structured Query Language): insert, delete, update, select, project, join, union, intersection, and difference.
- The design of a database, for example for an organization, is often a lengthy task that can only be done through a step-by-step process. The first step often involves interviewing potential users of the database to collect the information that needs to be stored. The second step is to build an Entity-Relation Model (ERM) that defines the entities for which information must be maintained. The next step is to build relations based on the ERM.
- Normalization is the process by which a given set of relations are transformed to a new set of relations with a more solid structure. Normalization is required to allow any relation in the database to be represented, to allow a query language such as SQL to use powerful retrieval operations composed of atomic operations, to remove anomalies in insertion, deletion, and updating, and to reduce the need for restructuring the database as new data types are to be added.
- The relational database is not the only model of database in use today. The other two common models are distributed databases and object-oriented databases.

## 14.8 PRACTICE SET

### 14.8.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 14.8.2 Review questions
1. What are the five necessary components of a DBMS?
2. What are the three database models? Which is the most popular today?
3. What is a relation in a relational database?
4. In a relation, what is an attribute? What is a tuple?
5. List some unary operations in relational databases.
6. List some binary operations in relational databases.
7. What is SQL? What is XML? Which one is a query language for relational databases? Which one is a query language for the objected-oriented language?

### 14.8.3 Problems
1. You have relations A, B, and C as shown in Figure 14.21. Show the resulting relation if you apply the following SQL statements:
   \`\`\`sql
   select *
   from A
   where A2 = 16
   \`\`\`
2. You have relations A, B, and C as shown in Figure 14.21. Show the resulting relation if you apply the following SQL statements:
   \`\`\`sql
   select A1 A2
   from A
   where A2 = 16
   \`\`\`
3. You have relations A, B, and C as shown in Figure 14.21. Show the resulting relation if you apply the following SQL statements:
   \`\`\`sql
   select A3
   from A
   \`\`\`
4. You have relations A, B, and C as shown in Figure 14.21. Show the resulting relation if you apply the following SQL statements:
   \`\`\`sql
   select B1
   from B
   where B2 = 216
   \`\`\`
5. You have relations A, B, and C as shown in Figure 14.21. Show the resulting relation if you apply the following SQL statements:
   \`\`\`sql
   update C
   set C1 = 37
   where C1 = 31
   \`\`\`
6. Using the model in Figure 14.5 in section 14.3.3, show the SQL statement that creates a new relation containing only the course number and the number of units for each course.
7. Using the model in Figure 14.5, show the SQL statement that creates a new relation containing only the student ID and student name.
8. Using the model in Figure 14.5, show the SQL statement that creates a new relation containing only the professor’s name.
9. Using the model in Figure 14.5, show the SQL statement that creates a new relation containing only the department name.
10. Using the model in Figure 14.5, show the SQL statement that creates a new relation containing the courses taken by the student with ID 2010.
11. Using the model in Figure 14.5, show the SQL statement that creates a new relation containing the courses taught by Professor Blake.
12. Using the model in Figure 14.5, show the SQL statement that creates a new relation containing only courses that have three units.
13. Using the model in Figure 14.5, show the SQL statement that creates a new relation containing only the name of students taking course CIS015.
14. Using the model in Figure 14.5, show the SQL statement that creates a new relation containing the department number of the Computer Science Department.
15. Is the following relation in first normal form (1NF)? If not, change the table to make it pass 1NF criteria.
    A | B | C | D
    ---|---|---|---
    1 | 70 | 65 | 14
    2 | 25, 32, 71 | 24 | 12, 18
    3 | 32 | 6, 11 | 18
16. Create an E-R diagram for a public library. Show the outline of the relations that can be created from that diagram.
17. Create an E-R diagram for a real estate company, then show the outline of the relations that can be created from that diagram.
18. Create an E-R diagram for three entities FLIGHT, AIRCRAFT, and PILOT in an airline, then show the outlines of the relations in this company.
19. Use references or the Internet to find some information about third normal form (3NF). What kind of functional dependency is involved in this normal form?
20. Use references or the Internet and find some information about Boyce–Codd Normal Form (BCNF). What kind of functional dependency is involved in this normal form?
`,
  zh: `
# 第十四章：資料庫

在本章中，我們將討論資料庫和資料庫管理系統 (DBMS)。我們介紹 DBMS 的三層架構，重點放在**關聯式資料庫**模型，並舉例說明其運作。我們也將討論一種在關聯式資料庫上運作的語言（結構化查詢語言）。我們簡要觸及資料庫的設計，最後提到其他資料庫模型。

## 學習目標
學完本章後，學生應能：
- 定義資料庫和資料庫管理系統 (DBMS) 並描述 DBMS 的組件。
- 根據 ANSI/SPARC 定義描述 DBMS 的架構。
- 定義三種傳統的資料庫模型：階層式、網路式和關聯式。
- 描述關聯式模型和關聯。
- 基於 SQL 中的可用命令理解關聯式資料庫的操作。
- 描述資料庫設計的步驟。
- 定義 ERM 和 E-R 圖並解釋此模型中的實體和關係。
- 定義正規化的階層級別並理解正規化關聯的理由。
- 列出關聯式模型以外的資料庫類型。

## 14.1 簡介
資料儲存傳統上使用獨立的、不相關的檔案，有時稱為**扁平檔案**。過去，組織中的每個應用程式都使用自己的檔案。例如，在大學中，每個系所可能有自己的一套檔案：註冊處保存關於學生資訊及其成績的檔案，財政援助辦公室保存關於需要財政援助以繼續學業的學生的檔案，排課辦公室保存教授姓名及其教授課程的檔案，薪資部門保存關於全體員工（包括教授）的檔案，依此類推。然而，今天，所有這些扁平檔案都可以合併在一個單一實體中，即整所大學的資料庫。

### 14.1.1 定義
雖然很難給出一個普遍認同的資料庫定義，但我們使用以下常見定義：
**定義：資料庫是組織中應用程式使用的相關、邏輯上一致的資料集合。**

### 14.1.2 資料庫的優點
與扁平檔案系統相比，我們可以提到資料庫系統的幾個優點。

**較少冗餘**
在扁平檔案系統中有大量的冗餘。例如，在大學的扁平檔案系統中，教授和學生的名字儲存在多個檔案中。

**避免不一致**
如果同一條資訊儲存在多個地方，那麼資料的任何更改都需要在儲存該資料的所有地方進行。例如，如果一名女學生結婚並接受丈夫的姓氏，則需要在所有保存該學生資訊的檔案中更改該學生的姓氏。缺乏照料可能會導致資料不一致。

**效率**
資料庫通常比扁平檔案系統更有效率，因為一條資訊儲存在更少的位置。

**資料完整性**
在資料庫系統中，更容易維護資料完整性（見第 16 章），因為一條資料儲存在更少的位置。

**機密性**
如果資料儲存集中在一個位置，則更容易維護資訊的機密性。

### 14.1.3 資料庫管理系統
**資料庫管理系統 (DBMS)** 定義、創建和維護資料庫。DBMS 還允許受控地存取資料庫中的資料。DBMS 是五個組件的組合：硬體、軟體、資料、使用者和程序。

**硬體**
硬體是允許存取資料的實體電腦系統。例如，終端機、硬碟、主電腦和工作站被視為 DBMS 中硬體的一部分。

**軟體**
軟體是允許使用者存取、維護和更新資料的實際程式。此外，軟體控制哪些使用者可以存取資料庫中的哪些部分資料。

**資料**
資料庫中的資料物理儲存在儲存設備上。在資料庫中，資料是與存取它的軟體分離的實體。這種分離允許組織在不必更改物理資料或其儲存方式的情況下更改軟體。如果組織決定使用 DBMS，則組織所需的所有資訊應作為一個實體保存在一起，以便 DBMS 中的軟體可以存取。

**使用者**
DBMS 中的使用者一詞具有廣泛的含義。我們可以將使用者分為兩類：終端使用者和應用程式。
- **終端使用者**：終端使用者是那些可以直接存取資料庫以獲取資訊的人。有兩種類型的終端使用者：**資料庫管理員 (DBA)** 和普通使用者。資料庫管理員擁有最高級別的特權，可以控制其他使用者及其對 DBMS 的存取，將部分特權授予他人，但保留隨時撤銷特權的能力。另一方面，普通使用者只能使用資料庫的一部分且存取權限有限。
- **應用程式**：資料庫中資料的其他使用者是**應用程式**。應用程式需要存取和處理資料。例如，薪資應用程式需要存取資料庫中的部分資料以在月底製作薪資支票。

**程序**
DBMS 的最後一個組件是一組應由資料庫使用者明確定義並遵循的程序或規則。

## 14.2 資料庫架構
美國國家標準協會/標準規劃與需求委員會 (ANSI/SPARC) 為 DBMS 建立了三層架構：內部、概念和外部。

### 14.2.1 內部層級
**內部層級**決定資料實際儲存在儲存設備上的位置。此層級處理低階存取方法以及位元組如何在儲存設備之間傳輸。換句話說，內部層級直接與硬體互動。

### 14.2.2 概念層級
**概念層級**定義資料的邏輯視圖。資料模型在此層級定義，DBMS 的主要功能（如查詢）也在此層級。DBMS 將資料的內部視圖更改為使用者需要看到的外部視圖。概念層級是一個中介，使用戶免於處理內部層級。

### 14.2.3 外部層級
**外部層級**直接與使用者（終端使用者或應用程式）互動。它將來自概念層級的資料更改為使用者熟悉的格式和視圖。

## 14.3 資料庫模型
**資料庫模型**定義資料的邏輯設計。該模型還描述了資料不同部分之間的關係。在資料庫設計的歷史中，一直使用三種模型：階層式模型、網路式模型和關聯式模型。

### 14.3.1 階層式資料庫模型
在**階層式模型**中，資料組織成倒置的樹狀結構。每個實體只有一個父節點，但可以有多個子節點。在階層的頂部，有一個實體，稱為*根*。由於階層式模型已過時，無需進一步討論此模型。

### 14.3.2 網路式資料庫模型
在**網路式模型**中，實體組織在圖形中，其中某些實體可以透過多條路徑存取。沒有階層結構。此模型也已過時，無需進一步討論。

### 14.3.3 關聯式資料庫模型
在**關聯式模型**中，資料組織在稱為**關聯**的二維表格中。沒有強加於資料的階層或網路結構。然而，表格或*關聯*彼此相關。
關聯式模型是當今使用的常見模型之一，我們將本章的大部分內容用於討論它。在最後一節中，我們簡要討論從關聯式模型衍生的其他兩種常見模型：分散式模型和物件導向模型。

## 14.4 關聯式資料庫模型
在**關聯式資料庫管理系統 (RDBMS)** 中，資料表示為一組關聯。

### 14.4.1 關聯 (Relation)
**關聯**在外觀上是一個二維表格。RDBMS 組織資料，使其外部視圖是一組關聯或表格。這並不意味著資料儲存為表格：資料的物理儲存獨立於資料的邏輯組織方式。
RDBMS 中的關聯具有以下特徵：
- **名稱**。關聯式資料庫中的每個關聯都應具有在其他關聯中唯一的名稱。
- **屬性 (Attribute)**。關聯中的每一列稱為一個**屬性**。屬性是表格中的列標題。每個屬性賦予其下儲存的資料意義。表格中的每一列必須具有在關聯範圍內唯一的名稱。關聯的屬性總數稱為關聯的**度 (degree)**。請注意，屬性名稱不儲存在資料庫中：概念層級使用屬性賦予每一列意義。
- **元組 (Tuple)**。關聯中的每一行稱為一個**元組**。元組定義了一組屬性值。關聯中的總行數稱為關聯的**基數 (cardinality)**。請注意，當添加或刪除元組時，關聯的基數會發生變化。這使得資料庫是動態的。

### 14.4.2 關聯上的操作
在關聯式資料庫中，我們可以定義多種操作以基於現有關聯創建新關聯。我們在本節中定義九種操作：*插入*、*刪除*、*更新*、*選擇*、*投影*、*連接*、*聯集*、*交集*和*差集*。我們不抽象地討論這些操作，而是描述資料庫查詢語言 SQL (結構化查詢語言) 中定義的每個操作。

**結構化查詢語言**
**結構化查詢語言 (SQL)** 是由美國國家標準協會 (ANSI) 和**國際標準化組織 (ISO)** 標準化的用於關聯式資料庫的語言。它是一種宣告式而非程序式語言，這意味著使用者宣告他們想要什麼，而無需編寫逐步程序。SQL 語言最早由 Oracle 公司於 1979 年實作，此後發布了各種版本的 SQL。

**插入 (Insert)**
**插入操作**是一個**一元操作**——也就是說，它應用於單個關聯。該操作將新元組插入關聯中。插入操作使用以下格式：
\`\`\`sql
insert into RELATION-NAME values (..., ..., ...)
\`\`\`
*values* 子句定義要插入的相應元組的所有屬性值。字串值括在引號中，數值則不括。

**刪除 (Delete)**
**刪除操作**也是一個一元操作。該操作從關聯中刪除由標準定義的元組。刪除操作使用以下格式：
\`\`\`sql
delete from RELATION-NAME where criteria
\`\`\`
刪除的標準在 *where* 子句中定義。

**更新 (Update)**
**更新操作**也是應用於單個關聯的一元操作。該操作更改元組某些屬性的值。更新操作使用以下格式：
\`\`\`sql
update RELATION-NAME
set attribute1 = value1, attribute2 = value2, ...
where criteria
\`\`\`
要更改的屬性在 *set* 子句中定義，更新的標準在 *where* 子句中定義。

**選擇 (Select)**
**選擇操作**是一個一元操作——也就是說，應用於單個關聯——並創建另一個關聯。結果關聯中的元組（行）是原始關聯中元組的子集。選擇操作使用一些標準從原始關聯中選擇部分元組。選擇操作使用以下格式：
\`\`\`sql
select *
from RELATION-NAME
where criteria
\`\`\`
星號表示選擇所有屬性。

**投影 (Project)**
**投影操作**也是一個一元操作，並創建另一個關聯。結果關聯中的屬性（列）是原始關聯中屬性的子集。投影操作創建一個每個元組屬性較少的關聯。此操作中的元組（行）數量保持不變。投影操作使用以下格式：
\`\`\`sql
select attribute-list
from RELATION-NAME
\`\`\`
新關聯的列名被明確列出。

**連接 (Join)**
**連接操作**是一個**二元操作**——它獲取兩個關聯並基於共同屬性將它們組合起來。連接操作使用以下格式：
\`\`\`sql
select attribute-list
from RELATION1, RELATION2
where criteria
\`\`\`
屬性列表是來自兩個輸入關聯的屬性組合：標準明確定義用作共同屬性的屬性。連接操作很複雜，有許多變體。

**聯集 (Union)**
**聯集操作**也是一個二元操作，獲取兩個關聯並創建一個新關聯。然而，這兩個關聯有一個限制：它們必須具有相同的屬性。集合論中定義的聯集操作創建一個新關聯，其中的每個元組要麼在第一個關聯中，要麼在第二個關聯中，或者兩者都在。聯集操作使用以下格式：
\`\`\`sql
select *
from RELATION1
union
select *
from RELATION2
\`\`\`
同樣，星號表示選擇所有屬性。

**交集 (Intersection)**
**交集操作**也是一個二元操作，獲取兩個關聯並創建一個新關聯。像聯集操作一樣，這兩個關聯必須具有相同的屬性。集合論中定義的交集操作創建一個新關聯，其中的每個元組都是兩個關聯的成員。交集操作使用以下格式：
\`\`\`sql
select *
from RELATION1
intersection
select *
from RELATION2
\`\`\`

**差集 (Difference)**
**差集操作**也是一個二元操作。它應用於具有相同屬性的兩個關聯。結果關聯中的元組是那些在第一個關聯中但不在第二個關聯中的元組。差集操作使用以下格式：
\`\`\`sql
select *
from RELATION1
minus
select *
from RELATION2
\`\`\`

**語句組合**
SQL 語言允許我們組合上述語句以從資料庫中提取更複雜的資訊。

## 14.5 資料庫設計
任何資料庫的設計都是一項漫長而複雜的任務，只能透過逐步過程完成。第一步通常涉及大量採訪資料庫的潛在使用者，例如在大學中，以收集需要儲存的資訊和每個部門的存取需求。第二步是建立一個**實體關係模型 (ERM)**，定義必須為其維護某些資訊的實體、這些實體的屬性以及這些實體之間的關係。

設計的下一步基於要使用的資料庫類型。在關聯式資料庫中，下一步是基於 ERM 建立關聯並對關聯進行正規化。在這個入門課程中，我們只給出一些關於 ERM 和正規化的概念。

### 14.5.1 實體關係模型 (ERM)
在此步驟中，資料庫設計師創建一個**實體關係 (E-R) 圖**，以顯示需要儲存資訊的實體以及這些實體之間的關係。E-R 圖使用幾種幾何形狀，但我們這裡只使用其中幾種：
- **矩形**代表實體集。
- **橢圓**代表屬性。
- **菱形**代表關係集。
- **線條**將屬性連結到實體集，並將實體集連結到關係集。

由菱形顯示的關係可以是一對一、一對多、多對一和多對多。

### 14.5.2 從 E-R 圖到關聯
E-R 圖定稿後，即可創建關聯式資料庫中的關聯（表格）。

**實體集的關聯**
對於 E-R 圖中的每個實體集，我們創建一個關聯（表格），其中有 *n* 列與為該集定義的 *n* 個屬性相關。

**關係集的關聯**
對於 E-R 圖中的每個關係集，我們創建一個關聯（表格）。此關聯對於參與此關係的每個實體集的鍵都有一列，如果關係有屬性，則對於關係本身的每個屬性也有一列。

### 14.5.3 正規化 (Normalization)
**正規化**是將一組給定的關聯轉換為一組結構更穩固的新關聯的過程。正規化是為了允許資料庫中的任何關聯都能被表示，允許像 SQL 這樣的語言使用由原子操作組成的強大檢索操作，消除插入、刪除和更新中的異常，並減少隨著新資料類型添加而重組資料庫的需求。

正規化過程定義了一組階層式**正規形式 (NF)**。已經提出了幾種正規形式，包括 1NF、2NF、3NF、BCNF (Boyce-Codd 正規形式)、4NF、PJNF (投影/連接正規形式)、5NF 等等。對這些正規形式（除 1NF 外）的討論涉及函數依賴的討論，這是一個理論學科，超出了本書的範圍。然而，我們需要知道的一個重要點是，這些正規形式形成了一個階層結構。換句話說，如果資料庫中的關聯是 3NF，它應該首先是 2NF。

**第一正規形式 (1NF)**
當我們將實體或關係轉換為表格關聯時，可能會有一些關聯在列或行的交叉處有多個值。不符合第一正規形式的關聯可能會遇到許多問題。這兩個關聯可以透過重複存在此問題的行來正規化。

**第二正規形式 (2NF)**
在每個關聯中，我們需要有一個鍵（稱為*主鍵*），所有其他屬性（列值）都依賴於它。然而，當基於 E-R 圖建立關聯時，可能會發生我們有一些複合鍵（兩個或多個鍵的組合）的情況。在這種情況下，如果每個非鍵屬性都依賴於整個複合鍵，則關聯處於第二正規形式。
如果某些屬性依賴於複合鍵的一部分，則該關聯不是第二正規形式。我們可以應用 2NF 過程並將關聯分為兩個，兩者都處於第二正規形式。

**其他正規形式**
其他正規形式使用屬性之間更複雜的依賴關係。我們將這些依賴關係留給專門討論資料庫主題的書籍。

## 14.6 其他資料庫模型
關聯式資料庫並非當今使用的唯一資料庫模型。另外兩個常見的模型是*分散式資料庫*和*物件導向資料庫*。我們在此簡要討論這些。

### 14.6.1 分散式資料庫
**分散式資料庫**模型不是新模型，而是基於關聯式模型。然而，資料儲存在多台透過網際網路或專用廣域網路通訊的電腦上。每台電腦（或站點）維護部分資料庫或整個資料庫。換句話說，資料要麼被分割，每個片段儲存在一個站點，要麼在每個站點複製。

**分割式分散式資料庫**
在**分割式分散式資料庫**中，資料是本地化的——本地使用的資料儲存在相應的站點。然而，這並不意味著一個站點不能存取儲存在另一個站點的資料，存取主要是本地的，但偶爾是全域的。雖然每個站點對其本地資料有完全控制權，但透過網際網路或廣域網路進行全域控制。
例如，一家製藥公司可能在許多國家擁有多個站點。每個站點都有一個包含其自己員工資訊的資料庫，但中央人事部門可以控制所有資料庫。

**複製式分散式資料庫**
在**複製式分散式資料庫**中，每個站點都持有另一個站點的精確複本。對儲存在一個站點的資料的任何修改都會在每個站點精確重複。擁有這種資料庫的原因是安全性。如果一個站點的系統發生故障，該站點的使用者可以存取另一個站點的資料。

### 14.6.2 物件導向資料庫
關聯式資料庫具有基於資料庫元組和屬性性質的特定資料視圖。關聯式資料庫中的最小資料單位是元組和屬性的交叉點。然而，某些應用程式需要以其他形式查看資料，例如將資料視為結構（見第 11 章），如由欄位組成的記錄。
**物件導向資料庫**試圖保留關聯式模型的優點，同時允許應用程式存取結構化資料。在物件導向資料庫中，定義了物件及其關係。此外，每個物件可以具有可以表示為欄位的屬性。
例如，在組織中，可以為員工、部門和客戶定義物件類型。員工類別可以定義員工物件的屬性（名字、姓氏、社會安全號碼、薪水等）以及如何存取它們。部門物件可以定義部門的屬性以及如何存取它們。此外，資料庫可以在員工物件和部門物件之間建立關係，以表示該員工在該部門工作。

**XML**
通常用於物件導向資料庫的查詢語言是 **XML (可擴展標記語言)**。XML 最初設計用於向文字文件添加標記資訊，但它也發現了其作為資料庫查詢語言的應用。XML 可以表示具有巢狀結構的資料。

## 14.7 章末材料

### 14.7.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Alagic, S. *Relational Database Technology*, New York: Springer, 1986
- Dietrich, S. *Understanding Relational Database Query Language*, Upper Saddle River, NJ: Prentice-Hall, 2001
- Elmasri, R. and Navathe, S. *Fundamentals of Database Systems*, Reading, MA: Addison-Wesley, 2006
- Mannino, M. *Database Application Development and Design*, New York: McGraw-Hill, 2001
- Ramakrishnan, R. and Gehrke, J. *Database Management Systems*, New York: McGraw-Hill, 2003
- Silberschatz, A., Korth, H. and Sudarshan, S. *Databases: System Concepts*, New York: McGraw-Hill, 2005

### 14.7.2 關鍵詞
- 應用程式 (application programs)
- 屬性 (attribute)
- 二元操作 (binary operation)
- 基數 (cardinality)
- 概念層級 (conceptual level)
- 資料庫 (database)
- 資料庫管理系統 (database management system, DBMS)
- 資料庫模型 (database model)
- 刪除操作 (delete operation)
- 差集操作 (difference operation)
- 分散式資料庫 (distributed database)
- 終端使用者 (End users)
- 實體關係模型 (Entity-Relation Model, E-R)
- 實體關係圖 (Entity–Relationship (E-R) diagram)
- 外部層級 (external level)
- 扁平檔案 (flat-files)
- 分割式分散式資料庫 (fragmented distributed database)
- 階層式模型 (hierarchical model)
- 插入操作 (insert operation)
- 內部層級 (internal level)
- 國際標準化組織 (International Organization for Standardization, ISO)
- 交集操作 (intersection operation)
- 連接操作 (join operation)
- 名稱 (name)
- 網路式模型 (network model)
- 正規形式 (normal form, NF)
- 正規化 (normalization)
- 物件導向資料庫 (object-oriented database)
- 投影操作 (project operation)
- 關聯 (relation)
- 關聯式資料庫管理系統 (relational database management system, RDBMS)
- 關聯式模型 (relational model)
- 複製式分散式資料庫 (replicated distributed database)
- 選擇操作 (select operation)
- 結構化查詢語言 (Structured Query Language, SQL)
- 元組 (tuple)
- 一元操作 (unary operation)
- 聯集操作 (union operation)
- 更新操作 (update operation)
- 使用者 (users)

### 14.7.3 摘要
- 資料庫是邏輯上但不一定物理上一致的資料集合——其各個部分可以在物理上分開。資料庫管理系統 (DBMS) 定義、創建和維護資料庫。
- 美國國家標準協會/標準規劃與需求委員會 (ANSI/SPARC) 為 DBMS 建立了三層架構：內部、概念和外部。內部層級決定資料實際儲存在儲存設備上的位置。概念層級定義資料的邏輯視圖。外部層級直接與使用者互動。
- 傳統上，定義了三種資料庫模型：階層式、網路式和關聯式。只有最後一種，關聯式模型，倖存下來。
- 在關聯式模型中，資料組織在稱為關聯的二維表格中。關聯具有以下特徵：名稱、屬性和元組。
- 在關聯式資料庫中，我們可以定義多種操作以基於現有關聯創建新關聯。我們在資料庫查詢語言 SQL (結構化查詢語言) 的背景下提到了九種操作：插入、刪除、更新、選擇、投影、連接、聯集、交集和差集。
- 資料庫的設計，例如為組織設計，通常是一項漫長的任務，只能透過逐步過程完成。第一步通常涉及採訪資料庫的潛在使用者以收集需要儲存的資訊。第二步是建立一個實體關係模型 (ERM)，定義必須為其維護資訊的實體。下一步是基於 ERM 建立關聯。
- 正規化是將一組給定的關聯轉換為一組結構更穩固的新關聯的過程。正規化是為了允許資料庫中的任何關聯都能被表示，允許像 SQL 這樣的查詢語言使用由原子操作組成的強大檢索操作，消除插入、刪除和更新中的異常，並減少隨著新資料類型添加而重組資料庫的需求。
- 關聯式資料庫並非當今使用的唯一資料庫模型。另外兩個常見的模型是分散式資料庫和物件導向資料庫。

## 14.8 練習題

### 14.8.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 14.8.2 複習問題
1. DBMS 的五個必要組件是什麼？
2. 三種資料庫模型是什麼？哪一種在今天最流行？
3. 關聯式資料庫中的關聯是什麼？
4. 在關聯中，屬性是什麼？元組是什麼？
5. 列出關聯式資料庫中的一些一元操作。
6. 列出關聯式資料庫中的一些二元操作。
7. 什麼是 SQL？什麼是 XML？哪一個是關聯式資料庫的查詢語言？哪一個是物件導向語言的查詢語言？

### 14.8.3 問題
1. 你有如圖 14.21 所示的關聯 A、B 和 C。顯示如果應用以下 SQL 語句會產生的結果關聯：
   \`\`\`sql
   select *
   from A
   where A2 = 16
   \`\`\`
2. 你有如圖 14.21 所示的關聯 A、B 和 C。顯示如果應用以下 SQL 語句會產生的結果關聯：
   \`\`\`sql
   select A1 A2
   from A
   where A2 = 16
   \`\`\`
3. 你有如圖 14.21 所示的關聯 A、B 和 C。顯示如果應用以下 SQL 語句會產生的結果關聯：
   \`\`\`sql
   select A3
   from A
   \`\`\`
4. 你有如圖 14.21 所示的關聯 A、B 和 C。顯示如果應用以下 SQL 語句會產生的結果關聯：
   \`\`\`sql
   select B1
   from B
   where B2 = 216
   \`\`\`
5. 你有如圖 14.21 所示的關聯 A、B 和 C。顯示如果應用以下 SQL 語句會產生的結果關聯：
   \`\`\`sql
   update C
   set C1 = 37
   where C1 = 31
   \`\`\`
6. 使用 14.3.3 節圖 14.5 中的模型，顯示創建一個僅包含課程編號和每門課程學分數的新關聯的 SQL 語句。
7. 使用圖 14.5 中的模型，顯示創建一個僅包含學生 ID 和學生姓名的新關聯的 SQL 語句。
8. 使用圖 14.5 中的模型，顯示創建一個僅包含教授姓名的新關聯的 SQL 語句。
9. 使用圖 14.5 中的模型，顯示創建一個僅包含系所名稱的新關聯的 SQL 語句。
10. 使用圖 14.5 中的模型，顯示創建一個包含 ID 為 2010 的學生所修課程的新關聯的 SQL 語句。
11. 使用圖 14.5 中的模型，顯示創建一個包含 Blake 教授所教課程的新關聯的 SQL 語句。
12. 使用圖 14.5 中的模型，顯示創建一個僅包含三個學分課程的新關聯的 SQL 語句。
13. 使用圖 14.5 中的模型，顯示創建一個僅包含修習課程 CIS015 的學生姓名的新關聯的 SQL 語句。
14. 使用圖 14.5 中的模型，顯示創建一個包含電腦科學系系所編號的新關聯的 SQL 語句。
15. 以下關聯是否處於第一正規形式 (1NF)？如果不是，更改表格使其通過 1NF 標準。
    A | B | C | D
    ---|---|---|---
    1 | 70 | 65 | 14
    2 | 25, 32, 71 | 24 | 12, 18
    3 | 32 | 6, 11 | 18
16. 為公共圖書館創建 E-R 圖。顯示可以從該圖創建的關聯大綱。
17. 為房地產公司創建 E-R 圖，然後顯示可以從該圖創建的關聯大綱。
18. 為航空公司中的三個實體 FLIGHT、AIRCRAFT 和 PILOT 創建 E-R 圖，然後顯示該公司中關聯的大綱。
19. 使用參考資料或網際網路查找有關第三正規形式 (3NF) 的一些資訊。此正規形式涉及哪種函數依賴？
20. 使用參考資料或網際網路查找有關 Boyce-Codd 正規形式 (BCNF) 的一些資訊。此正規形式涉及哪種函數依賴？
`
};
    