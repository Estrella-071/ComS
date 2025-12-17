
export const chapter13Content = {
  en: `
# Chapter 13: File Structure

In this chapter we discuss file structures. Based on the application, files are stored in auxiliary storage devices using various methods. We also discuss how individual records are retrieved. This chapter is a prelude to the following chapter, which discusses how a collection of related files, called a database, is organized and accessed.

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
Files are stored on **auxiliary** or **secondary storage devices**. The two most common forms of secondary storage are disk and tape. Files in secondary storage can be both read from and written to. Files can also exist in forms that the computer can write to but not read. For example, the display of information on the system monitor is a form of file, as is data sent to a printer. In a general sense, the keyboard is also a file, although it cannot store data.

For our purposes, a file is a collection of data records in which each record consists of one or more fields, as defined in Chapter 11.

When we design a file, the important issue is how we will retrieve information (a specific record) from the file. Sometimes we need to process records one after another, whereas sometimes we need to access a specific record quickly without retrieving the preceding records. The **access method** determines how records can be retrieved: *sequentially* or *randomly*.

### 13.1.1 Sequential access
If we need to access a file sequentially—that is, one record after another, from beginning to end—we use a **sequential file** structure.

### 13.1.2 Random access
If we need to access a specific record without having to retrieve all records before it, we use a file structure that allows **random access**. Two file structures allow this: *indexed files* and *hashed files*.

## 13.2 SEQUENTIAL FILES
A sequential file is one in which records can only be accessed one after another from beginning to end. Records are stored one after another in auxiliary storage, such as tape or disk, and there is an **EOF (end-of-file)** marker after the last record. The operating system has no information about the record addresses, it only knows where the whole file is stored. The only thing known to the operating system is that the records are sequential.

Algorithm 13.1 shows how records in a sequential file are processed. We process the records one by one. After the operating system processes the last record, the EOF is detected and the loop is exited.

**Algorithm 13.1 Pseudocode for processing records in a sequential file**
\`\`\`text
Algorithm: SequentialFileProcessing (file)
Purpose: Process all records in a sequential file
Pre: Given the beginning address of the file on the auxiliary storage
Post: None
Return: None
{
    while (Not EOF)
    {
        Read the next record from the auxiliary storage into memory
        Process the record
    }
}
\`\`\`

Sequential files are used in applications that need to access all records from beginning to end. For example, if personal information about each employee in a company is stored in a file, we can use **sequential access** to retrieve each record at the end of the month to print the paychecks. Because we have to process each record, sequential access is more efficient and easier than random access.

However, the sequential file is not efficient for random access. For example, if all customer records in a bank can only be accessed sequentially, a customer who needs to get money from an ATM would have to wait as the system checks each record from the beginning of the file until it reaches the customer’s record. If this bank has a million customers, the system, on average, would retrieve half a million records before reaching the customer’s record. This is very inefficient.

### 13.2.1 Updating sequential files
Sequential files must be updated periodically to reflect changes in information. The updating process is very involved because all the records need to be checked and updated (if necessary) sequentially.

**Files involved in updating**
There are four files associated with an update program: the new master file, the old master file, the transaction file, and the error report file. All these files are sorted based on key values.
- **New master file**: The new permanent data file or, as it is commonly known, the **new master file**, contains the most current data. Note that after the update program completes, the new master file is sent to offline storage, where it is kept until needed again.
- **Old master file**: The **old master file** is the permanent file that should be updated. Even after updating, the old master file is normally kept for reference.
- **Transaction file**: The third file is the **transaction file**. This contains the changes to be applied to the master file. There are three basic types of changes in all file updates:
    - *Add transactions* contain data about a new record to be added to the master file.
    - *Delete transactions* identify records to be deleted from the file.
    - *Change transactions* contain revisions to specific records in the file.
    To process any of these transactions, we need a **key**. A key is one or more fields that uniquely identify the data in the file. For example, in a file of students, the key could be student ID.
- **Error report file**: The fourth file needed in an update program is an **error report file**. It is very rare that an update process does not produce at least one error. When an error occurs, we need to report it. The error report contains a listing of all errors discovered during the update process and is presented for corrective action.

**Processing file updates**
To make the updating process efficient, all files are sorted on the same key. The update process requires that we compare the keys on the transaction and master files and, assuming that there are no errors, follow one of three actions:
1.  If the transaction file key is less than the master file key and the transaction is an add (A), add the transaction to the new master.
2.  If the transaction file key is equal to the master file key, either:
    a.  Change the contents of the master file data if the transaction is a change (C).
    b.  Remove the data from the master file if the transaction is a deletion (D).
3.  If the transaction file key is greater than the master file key, write the old master file record to the new master file.
4.  Several cases may create an error and be reported in the error file:
    a.  If the transaction defines adding a record that already exists in the old master file (same key values).
    b.  If the transaction defines deleting or changing a record that does not exist in the old master file.

## 13.3 INDEXED FILES
To access a record in a file randomly, we need to know the address of the record. For example, suppose a customer wants to check their bank account. Neither the customer nor the teller knows the address of the customer’s record. The customer can only give the teller their account number (key). Here, an indexed file can relate the account number (key) to the record address.

An **indexed file** is made of a **data file**, which is a sequential file, and an **index**. The index itself is a very small file with only two fields: the key of the sequential file and the address of the corresponding record on the disk. The index is sorted based on the key values of the data files.

Accessing a record in the file requires these steps:
1.  The entire index file is loaded into main memory (the file is small and uses little memory).
2.  The index entries are searched, using an efficient search algorithm such as a binary search, to find the desired key.
3.  The address of the record is retrieved.
4.  Using the address, the data record is retrieved and passed to the user.

### 13.3.1 Inverted files
One of the advantages of indexed files is that we can have more than one index, each with a different key. For example, an employee file can be retrieved based on either social security number or last name. This type of indexed file is usually called an **inverted file**.

## 13.4 HASHED FILES
In an indexed file, the index maps the key to the address. A **hashed file** uses a mathematical function to accomplish this mapping. The user gives the key, the function maps the key to the address and passes it to the operating system, and the record is retrieved.

The hashed file eliminates the need for an extra file (the index). In an indexed file, we must keep the index on file in the disk, and when we need to process the data file, we must first load the index into memory, search it to find the address of the data record, and then access the data file to access the record. In a hashed file, finding the address is done through the use of a function, so there is no need for an index and all of the overhead associated with it. However, we will see that hashed files have their own drawbacks.

### 13.4.1 Hashing methods
For key-address mapping, we can select one of several **hashing methods**. We discuss a few of them here.

**Direct hashing**
In **direct hashing**, the key is the data file address without any algorithmic manipulation. The file must therefore contain a record for every possible key. Although situations suitable for direct hashing are limited, it can be very powerful because it guarantees that there are no *synonyms* or *collisions* (discussed later in this chapter), as with other methods.
Although this is the ideal method, its application is very limited. For example, it is very inefficient to use long identifiers as keys, because they must have several digits. Let’s turn our attention, therefore, to hashing techniques that map a large population of possible keys to a small address space.

**Modulo division hashing**
Also known as **division remainder hashing**, the modulo division method divides the key by the file size and uses the remainder plus 1 for the address. This gives the simple hashing algorithm that follows, where *list_size* is the number of elements in the file. The reason for adding a 1 to the mod operation result is that our list starts with 1 instead of 0:
\`address = key mod list_size + 1\`

Although this algorithm works with any list size, a list size that is a **prime number** produces fewer collisions than other list sizes. Therefore, whenever possible, try to make the file size a prime number.

**Digit extraction hashing**
Using **digit extraction hashing**, selected digits are extracted from the key and used as the address. For example, using a six-digit employee number to hash to a three-digit address (000–999), we could select the first, third, and fourth digits (from the left) and use them as the address.

**Other hashing methods**
Other popular methods exist, such as the midsquare method, folding methods, the rotational method, and the pseudorandom method.

### 13.4.2 Collision
Generally, the population of keys for a hashed list is greater than the number of records in the data file. Because there are many keys for each address in the file, there is a possibility that more than one key will hash to the same address in the file. We call the set of keys that hash to the same address in our list **synonyms**.

If the actual data that we insert into our list contains two or more synonyms, we will have collisions. A **collision** is the event that occurs when a hashing algorithm produces an address for an insertion key but that address is already occupied. The address produced by the hashing algorithm is known as the **home address**. The part of the file that contains all the home addresses is known as the **prime area**. When two keys collide at a home address, we must resolve the collision by placing one of the keys and its data in another location, outside the prime area.

**Collision resolution**
With the exception of the direct method, none of the methods we have discussed for hashing creates one-to-one mappings. This means that when we hash a new key to an address, we may create a collision. There are several methods for handling collisions, each of them independent of the hashing algorithm.

**Open addressing**
The first collision resolution method, **open addressing resolution**, resolves collisions in the prime area. When a collision occurs, the prime area addresses are searched for an open or unoccupied record where the new data can be placed. One simple strategy for data that cannot be stored in the home address is to store it in the next address (home address + 1).

**Linked list resolution**
A major disadvantage of open addressing is that each collision resolution increases the probability of future collisions. This disadvantage is eliminated in another approach to collision resolution, **linked list resolution**. In this method, the first record is stored in the home address, but contains a pointer to the second record.

**Bucket hashing**
Another approach to handling the problem of collisions is to hash to buckets. A **bucket** is a node that can accommodate more than one record. The disadvantage of this method is that there may be a lot of wasted (unoccupied) locations.

## 13.5 DIRECTORIES
**Directories** are provided by most operating systems for organizing files. A directory performs the same function as a folder in a filing cabinet. However, a directory in most operating systems is represented as a special type of file that holds information about other files. A directory not only serves as a kind of index that tells the operating system where files are located on an auxiliary storage device, but can also contain other information about the files it contains, such as who has access to each file, or the date when each file was created, accessed, or modified.
Directories in most operating systems are organized like the tree abstract data type (ADT), in which each directory except the root directory has a parent. A directory contained in another directory is called a **subdirectory** of the container directory.

### 13.5.1 Directories in the UNIX operating system
In UNIX the directory system is organized as a tree structure. At the top of the directory structure is a directory called the **root**. Although its name is root, in commands related to directories it is typed as one slash (/). In turn, each directory can contain subdirectories and files.

**Special directories**
There are four special types of directory that play an important role in the directory structure in UNIX: the root directory, home directories, working directories, and parent directories.
- **Root directory**: The root directory is the highest level in the file system hierarchy. It is the root of the whole file structure, and therefore does not have a parent directory. The root directory belongs to the system administrator and can be changed only by the system administrator.
- **Home directory**: We use our **home directory** when we first log into the system. This contains any files we create while in it and may contain personal system files. Each user has a home directory.
- **Working directory**: The **working directory** (or **current directory**) is the directory we are ‘in’ at any point in a user session. When we first log in, the working directory is our home directory. When we change directory, our working directory changes automatically.
- **Parent directory**: The **parent directory** is the directory immediately above the working directory.

**Paths and pathnames**
Every directory and file in a file system must have a name. To uniquely identify a file, we need to specify the file’s **path** from the root directory to the file. The file’s path is specified by its **absolute pathname**, a list of all directories separated by a slash character (/).
The absolute pathname for a file or a directory is like an address of a person. UNIX also provides a shorter pathname under certain circumstances, known as a **relative pathname**, which is the path relative to the working directory.

## 13.6 TEXT VERSUS BINARY
Before closing this chapter, we discuss two terms used to categorize files: *text files* and *binary files*. A file stored on a storage device is a sequence of bits that can be interpreted by an application program as a text file or a binary file.

### 13.6.1 Text files
A **text file** is a file of characters. It cannot contain integers, floating-point numbers, or any other data structures in their internal memory format. To store these data types, they must be converted to their character equivalent formats.
Some files can only use character data types. Most notable are file streams (input/output objects in some object-oriented language like C++) for keyboards, monitors, and printers. This is why we need special functions to format data that is input from or output to these devices.

### 13.6.2 Binary files
A **binary file** is a collection of data stored in the internal format of the computer. In this definition, data can be an integer (including other data types represented as unsigned integers, such as image, audio, or video), a floating-point number, or any other structured data (except a file).
Unlike text files, binary files contain data that is meaningful only if it is properly interpreted by a program. If the data is textual, one byte is used to represent one character. But if the data is numeric, two or more bytes are considered a data item.
`,
  zh: `
# 第十三章：檔案結構

在本章中，我們將討論檔案結構。根據應用程式的需求，檔案會使用各種方法儲存在輔助儲存裝置上。我們也將討論如何檢索個別記錄。本章是下一章的序幕，下一章將討論如何組織和存取相關檔案的集合，即資料庫。

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
檔案儲存在**輔助**或**次級儲存裝置**上。最常見的兩種輔助儲存形式是磁碟和磁帶。輔助儲存中的檔案既可以讀取也可以寫入。檔案也可以以電腦可以寫入但不能讀取的形式存在。例如，系統監視器上的資訊顯示是一種檔案形式，發送到印表機的資料也是。從廣義上講，鍵盤也是一個檔案，儘管它不能儲存資料。

就我們的目的而言，檔案是資料記錄的集合，其中每個記錄由一個或多個欄位組成，如第 11 章所定義。

當我們設計檔案時，重要的問題是我們將如何從檔案中檢索資訊（特定記錄）。有時我們需要一個接一個地處理記錄，而有時我們需要快速存取特定記錄，而無需檢索前面的記錄。**存取方法**決定了記錄如何被檢索：*循序*或*隨機*。

### 13.1.1 循序存取 (Sequential access)
如果我們需要循序存取檔案——即從頭到尾一個接一個地存取記錄——我們使用**循序檔案**結構。

### 13.1.2 隨機存取 (Random access)
如果我們需要存取特定記錄而無需檢索其前的所有記錄，我們使用允許**隨機存取**的檔案結構。有兩種檔案結構允許這樣做：*索引檔案*和*雜湊檔案*。

## 13.2 循序檔案 (SEQUENTIAL FILES)
循序檔案是一種記錄只能從頭到尾一個接一個地存取的檔案。記錄在輔助儲存（如磁帶或磁碟）中一個接一個地儲存，並且在最後一個記錄之後有一個 **EOF (檔案結束)** 標記。作業系統沒有關於記錄位址的資訊，它只知道整個檔案儲存在哪裡。作業系統唯一知道的是記錄是循序的。

演算法 13.1 顯示了如何處理循序檔案中的記錄。我們逐一處理記錄。作業系統處理完最後一個記錄後，檢測到 EOF 並退出迴圈。

**演算法 13.1 處理循序檔案中記錄的偽代碼**
\`\`\`text
演算法：SequentialFileProcessing (file)
目的：處理循序檔案中的所有記錄
前置條件：給定輔助儲存上檔案的起始位址
後置條件：無
回傳：無
{
    while (Not EOF)
    {
        從輔助儲存讀取下一個記錄到記憶體
        處理記錄
    }
}
\`\`\`

循序檔案用於需要從頭到尾存取所有記錄的應用程式中。例如，如果公司中每個員工的個人資訊都儲存在檔案中，我們可以使用**循序存取**在月底檢索每個記錄以列印工資單。因為我們必須處理每個記錄，所以循序存取比隨機存取更有效率且更容易。

然而，循序檔案對於隨機存取效率不高。例如，如果銀行的所有客戶記錄只能循序存取，那麼需要從 ATM 取款的客戶將不得不等待系統從檔案開頭檢查每個記錄，直到到達客戶的記錄。如果這家銀行有一百萬個客戶，系統平均將檢索五十萬個記錄才能到達客戶的記錄。這是非常沒有效率的。

### 13.2.1 更新循序檔案
循序檔案必須定期更新以反映資訊的變化。更新過程非常複雜，因為所有記錄都需要按順序檢查和更新（如有必要）。

**涉及更新的檔案**
更新程式涉及四個檔案：新主檔、舊主檔、交易檔和錯誤報告檔。所有這些檔案都根據鍵值進行排序。
- **新主檔 (New master file)**：新的永久資料檔，或通常稱為**新主檔**，包含最新的資料。請注意，更新程式完成後，新主檔將被發送到離線儲存，保存在那裡直到再次需要。
- **舊主檔 (Old master file)**：**舊主檔**是應該更新的永久檔案。即使更新後，舊主檔通常也會保留以供參考。
- **交易檔 (Transaction file)**：第三個檔案是**交易檔**。這包含要應用於主檔的更改。所有檔案更新中都有三種基本的更改類型：
    - *新增交易*包含要添加到主檔的新記錄的資料。
    - *刪除交易*標識要從檔案中刪除的記錄。
    - *更改交易*包含對檔案中特定記錄的修訂。
    要處理任何這些交易，我們需要一個**鍵 (key)**。鍵是一個或多個唯一標識檔案中資料的欄位。例如，在學生檔案中，鍵可以是學生 ID。
- **錯誤報告檔 (Error report file)**：更新程式所需的第四個檔案是**錯誤報告檔**。更新過程不產生至少一個錯誤的情況非常罕見。發生錯誤時，我們需要報告它。錯誤報告包含更新過程中發現的所有錯誤的列表，並提交以採取糾正措施。

**處理檔案更新**
為了使更新過程有效率，所有檔案都按相同的鍵排序。更新過程要求我們比較交易檔和主檔上的鍵，並假設沒有錯誤，採取以下三個動作之一：
1.  如果交易檔鍵小於主檔鍵且交易是新增 (A)，則將交易添加到新主檔。
2.  如果交易檔鍵等於主檔鍵，則：
    a.  如果交易是更改 (C)，則更改主檔資料的內容。
    b.  如果交易是刪除 (D)，則從主檔中刪除資料。
3.  如果交易檔鍵大於主檔鍵，則將舊主檔記錄寫入新主檔。
4.  有幾種情況可能會產生錯誤並在錯誤檔中報告：
    a.  如果交易定義新增一個已存在於舊主檔中的記錄（鍵值相同）。
    b.  如果交易定義刪除或更改一個不存在於舊主檔中的記錄。

## 13.3 索引檔案 (INDEXED FILES)
要隨機存取檔案中的記錄，我們需要知道記錄的位址。例如，假設客戶想要檢查他們的銀行帳戶。客戶和櫃員都不知道客戶記錄的位址。客戶只能給櫃員他們的帳號（鍵）。在這裡，索引檔案可以將帳號（鍵）關聯到記錄位址。

**索引檔案**由**資料檔**（這是一個循序檔案）和**索引**組成。索引本身是一個非常小的檔案，只有兩個欄位：循序檔案的鍵和磁碟上相應記錄的位址。索引根據資料檔的鍵值進行排序。

存取檔案中的記錄需要以下步驟：
1.  將整個索引檔載入主記憶體（檔案很小，佔用的記憶體很少）。
2.  使用有效的搜尋演算法（如二元搜尋）搜尋索引條目以找到所需的鍵。
3.  檢索記錄的位址。
4.  使用位址檢索資料記錄並傳遞給使用者。

### 13.3.1 倒排檔案 (Inverted files)
索引檔案的優點之一是我們可以有多個索引，每個索引具有不同的鍵。例如，可以根據社會安全號碼或姓氏檢索員工檔案。這種類型的索引檔案通常稱為**倒排檔案**。

## 13.4 雜湊檔案 (HASHED FILES)
在索引檔案中，索引將鍵映射到位址。**雜湊檔案**使用數學函數來完成這種映射。使用者給出鍵，函數將鍵映射到位址並將其傳遞給作業系統，然後檢索記錄。

雜湊檔案消除了對額外檔案（索引）的需求。在索引檔案中，我們必須將索引保留在磁碟檔案中，當我們需要處理資料檔時，我們必須先將索引載入記憶體，搜尋它以找到資料記錄的位址，然後再存取資料檔以存取記錄。在雜湊檔案中，查找位址是通過使用函數完成的，因此不需要索引及其相關的所有開銷。然而，我們將看到雜湊檔案有其自身的缺點。

### 13.4.1 雜湊方法 (Hashing methods)
對於鍵-位址映射，我們可以選擇幾種**雜湊方法**之一。我們在這裡討論其中幾種。

**直接雜湊 (Direct hashing)**
在**直接雜湊**中，鍵是沒有任何演算法操作的資料檔位址。因此，檔案必須包含每個可能鍵的記錄。雖然適合直接雜湊的情況有限，但它可能非常強大，因為它保證沒有*同義詞*或*碰撞*（本章稍後討論），這與其他方法不同。
雖然這是理想的方法，但其應用非常有限。例如，使用長標識符作為鍵是非常沒有效率的，因為它們必須有幾位數。因此，讓我們將注意力轉向將大量可能的鍵映射到小位址空間的雜湊技術。

**模數除法雜湊 (Modulo division hashing)**
也稱為**除法餘數雜湊**，模數除法方法將鍵除以檔案大小，並使用餘數加 1 作為位址。這給出了以下簡單的雜湊演算法，其中 *list_size* 是檔案中的元素數量。將 1 加到模運算結果的原因是我們的列表從 1 開始而不是 0：
\`address = key mod list_size + 1\`

雖然此演算法適用於任何列表大小，但**質數**的列表大小比其他列表大小產生的碰撞更少。因此，只要可能，盡量使檔案大小成為質數。

**數字提取雜湊 (Digit extraction hashing)**
使用**數字提取雜湊**，從鍵中提取選定的數字並將其用作位址。例如，使用六位數的員工編號雜湊到三位數的位址 (000–999)，我們可以選擇第一、第三和第四位數字（從左邊算起）並將其用作位址。

**其他雜湊方法**
還存在其他流行的方法，如平方取中法、折疊法、旋轉法和偽隨機法。

### 13.4.2 碰撞 (Collision)
通常，雜湊列表的鍵總體大於資料檔中的記錄數。因為檔案中每個位址有許多鍵，所以存在多個鍵雜湊到檔案中相同位址的可能性。我們將雜湊到列表中相同位址的鍵集稱為**同義詞 (synonyms)**。

如果我們插入列表的實際資料包含兩個或更多同義詞，我們將發生碰撞。**碰撞**是指當雜湊演算法為插入鍵產生一個位址但該位址已被佔用時發生的事件。雜湊演算法產生的位址稱為**主位址 (home address)**。包含所有主位址的檔案部分稱為**主要區域 (prime area)**。當兩個鍵在主位址發生碰撞時，我們必須通過將其中一個鍵及其資料放置在主要區域之外的另一個位置來解決碰撞。

**碰撞解決**
除了直接方法外，我們討論的雜湊方法都沒有創建一對一的映射。這意味著當我們將新鍵雜湊到位址時，我們可能會產生碰撞。有幾種處理碰撞的方法，每種方法都獨立於雜湊演算法。

**開放定址 (Open addressing)**
第一種碰撞解決方法，**開放定址解決**，在主要區域中解決碰撞。當發生碰撞時，搜尋主要區域位址以尋找可以放置新資料的開放或未佔用記錄。對於無法儲存在主位址的資料，一種簡單的策略是將其儲存在下一個位址（主位址 + 1）。

**鏈結串列解決 (Linked list resolution)**
開放定址的一個主要缺點是每次碰撞解決都會增加未來碰撞的可能性。這種缺點在另一種碰撞解決方法**鏈結串列解決**中被消除。在這種方法中，第一條記錄儲存在主位址中，但包含指向第二條記錄的指標。

**桶式雜湊 (Bucket hashing)**
另一種處理碰撞問題的方法是雜湊到桶。**桶 (bucket)** 是一個可以容納多個記錄的節點。這種方法的缺點是可能會有大量浪費（未佔用）的位置。

## 13.5 目錄 (DIRECTORIES)
大多數作業系統提供**目錄**來組織檔案。目錄執行的功能與檔案櫃中的文件夾相同。然而，大多數作業系統中的目錄表示為一種特殊類型的檔案，其中包含有關其他檔案的資訊。目錄不僅作為一種索引，告訴作業系統檔案位於輔助儲存裝置上的位置，還可以包含有關其包含的檔案的其他資訊，例如誰有權存取每個檔案，或每個檔案創建、存取或修改的日期。
大多數作業系統中的目錄組織成樹狀抽象資料型別 (ADT)，其中除根目錄外，每個目錄都有一個父目錄。包含在另一個目錄中的目錄稱為容器目錄的**子目錄**。

### 13.5.1 UNIX 作業系統中的目錄
在 UNIX 中，目錄系統組織成樹狀結構。目錄結構的頂部是一個稱為**根 (root)** 的目錄。雖然它的名字是 root，但在與目錄相關的命令中，它被鍵入為一個斜線 (/)。反過來，每個目錄都可以包含子目錄和檔案。

**特殊目錄**
有四種特殊類型的目錄在 UNIX 的目錄結構中扮演重要角色：根目錄、家目錄、工作目錄和父目錄。
- **根目錄**：根目錄是檔案系統階層中的最高層級。它是整個檔案結構的根，因此沒有父目錄。根目錄屬於系統管理員，只能由系統管理員更改。
- **家目錄 (Home directory)**：當我們首次登入系統時使用我們的**家目錄**。這包含我們在其中創建的任何檔案，並可能包含個人系統檔案。每個使用者都有一個家目錄。
- **工作目錄 (Working directory)**：**工作目錄**（或**當前目錄**）是我們在使用者會話中任何時候「所在」的目錄。當我們首次登入時，工作目錄是我們的家目錄。當我們更改目錄時，我們的工作目錄會自動更改。
- **父目錄 (Parent directory)**：**父目錄**是工作目錄正上方的目錄。

**路徑和路徑名稱**
檔案系統中的每個目錄和檔案都必須有一個名稱。為了唯一標識一個檔案，我們需要指定從根目錄到該檔案的**路徑**。檔案的路徑由其**絕對路徑名稱**指定，這是由斜線字元 (/) 分隔的所有目錄的列表。
檔案或目錄的絕對路徑名稱就像一個人的地址。UNIX 還在某些情況下提供了一種較短的路徑名稱，稱為**相對路徑名稱**，它是相對於工作目錄的路徑。

## 13.6 文字與二進位 (TEXT VERSUS BINARY)
在結束本章之前，我們討論用於分類檔案的兩個術語：*文字檔*和*二進位檔*。儲存在儲存裝置上的檔案是一系列位元，應用程式可以將其解釋為文字檔或二進位檔。

### 13.6.1 文字檔 (Text files)
**文字檔**是字元的檔案。它不能包含整數、浮點數或任何其他以其內部記憶體格式儲存的資料結構。要儲存這些資料類型，必須將它們轉換為其字元等價格式。
某些檔案只能使用字元資料類型。最值得注意的是鍵盤、監視器和印表機的檔案串流（某些物件導向語言如 C++ 中的輸入/輸出物件）。這就是為什麼我們需要特殊函數來格式化從這些設備輸入或輸出的資料。

### 13.6.2 二進位檔 (Binary files)
**二進位檔**是以電腦內部格式儲存的資料集合。在這個定義中，資料可以是整數（包括表示為無符號整數的其他資料類型，如圖像、音訊或視訊）、浮點數或任何其他結構化資料（檔案除外）。
與文字檔不同，二進位檔包含的資料只有在被程式正確解釋時才有意義。如果資料是文字的，則使用一個位元組來表示一個字元。但是如果資料是數值的，則兩個或多個位元組被視為一個資料項目。
`
};
    