
export const chapter1Content = {
  en: `
# 1. Introduction to Computers, the Internet and the Web

## 1.1 Introduction
Welcome to C and C++! C is a concise yet powerful computer programming language that’s appropriate for technically oriented people with little or no programming experience and for experienced programmers to use in building substantial software systems. C How to Program, Eighth Edition, is an effective learning tool for each of these audiences.

The core of the book emphasizes software engineering through the proven methodologies of structured programming in C and object-oriented programming in C++. The book presents hundreds of complete working programs and shows the outputs produced when those programs are run on a computer. We call this the “live-code approach.” All of these example programs may be downloaded from our website www.deitel.com/books/chtp8/.

Most people are familiar with the exciting tasks that computers perform. Using this textbook, you'll learn how to command computers to perform those tasks. It’s software (i.e., the instructions you write to command computers to perform actions and make decisions) that controls computers (often referred to as hardware).

## 1.2 Hardware and Software
Computers can perform calculations and make logical decisions phenomenally faster than human beings can. Many of today's personal computers can perform billions of calculations in one second—more than a human can perform in a lifetime. Supercomputers are already performing thousands of trillions (quadrillions) of instructions per second! China's National University of Defense Technology's Tianhe-2 supercomputer can perform over 33 quadrillion calculations per second (33.86 petaflops)! To put that in perspective, the Tianhe-2 supercomputer can perform in one second about 3 million calculations for every person on the planet! And supercomputing “upper limits" are growing quickly.

Computers process data under the control of sequences of instructions called **computer programs**. These software programs guide the computer through ordered actions specified by people called **computer programmers**.

A computer consists of various devices referred to as **hardware** (e.g., the keyboard, screen, mouse, hard disks, memory, DVD drives and processing units). Computing costs are dropping dramatically, owing to rapid developments in hardware and software technologies. Computers that might have filled large rooms and cost millions of dollars decades ago are now inscribed on silicon chips smaller than a fingernail, costing perhaps a few dollars each. Ironically, silicon is one of the most abundant materials on Earth—it's an ingredient in common sand. Silicon-chip technology has made computing so economical that computers have become a commodity.

### 1.2.1 Moore's Law
Every year, you probably expect to pay at least a little more for most products and services. The opposite has been the case in the computer and communications fields, especially with regard to the hardware supporting these technologies. For many decades, hardware costs have fallen rapidly.

Every year or two, the capacities of computers have approximately doubled inexpensively. This remarkable trend often is called **Moore’s Law**, named for the person who identified it in the 1960s, Gordon Moore, co-founder of Intel—the leading manufacturer of the processors in today's computers and embedded systems. Moore's Law and related observations apply especially to the amount of memory that computers have for programs, the amount of secondary storage (such as disk storage) they have to hold programs and data over longer periods of time, and their processor speeds—the speeds at which they execute their programs (i.e., do their work).

Similar growth has occurred in the communications field—costs have plummeted as enormous demand for communications bandwidth (i.e., information-carrying capacity) has attracted intense competition. We know of no other fields in which technology improves so quickly and costs fall so rapidly. Such phenomenal improvement is truly fostering the Information Revolution.

### 1.2.2 Computer Organization
Regardless of differences in physical appearance, computers can be envisioned as divided into various logical units or sections.

| Logical unit | Description |
|---|---|
| **Input unit** | This "receiving" section obtains information (data and computer programs) from input devices and places it at the disposal of the other units for processing. Most user input is entered into computers through keyboards, touch screens and mouse devices. Other forms of input include receiving voice commands, scanning images and barcodes, reading from secondary storage devices (such as hard drives, DVD drives, Blu-ray DiscTM drives and USB flash drives—also called “thumb drives” or “memory sticks”), receiving video from a webcam and having your computer receive information from the Internet (such as when you stream videos from YouTube® or download e-books from Amazon). Newer forms of input include position data from a GPS device, and motion and orientation information from an accelerometer in a smartphone or game controller. |
| **Output unit** | This "shipping" section takes information the computer has processed and places it on various output devices to make it available for use outside the computer. Most information that's output from computers today is displayed on screens (including touch screens), printed on paper, played as audio or video, and giant screens in sports stadiums, transmitted over the Internet or used to control other devices, such as robots and “intelligent” appliances. Information is also commonly output to secondary storage devices. |
| **Memory unit** | This rapid-access, relatively low-capacity “warehouse” section retains information that has been entered through the input unit, making it immediately available for processing when needed. The memory unit also retains processed information until it can be placed on output devices. Information in the memory unit is volatile—it's typically lost when the computer's power is turned off. The memory unit is often called either memory, **primary memory** or RAM (Random Access Memory). |
| **Arithmetic and logic unit (ALU)** | This "manufacturing" section performs calculations, such as addition, subtraction, multiplication and division. It also contains the decision mechanisms that allow the computer to compare two items from the memory unit to determine whether they're equal. |
| **Central processing unit (CPU)** | This "administrative” section coordinates and supervises the operation of the other sections. The CPU tells the input unit when information should be read into the memory unit, tells the ALU when information from the memory unit should be used in calculations and tells the output unit when to send information from the memory unit to certain output devices. Many of today's computers have multiple CPUs and, hence, can perform many operations simultaneously. A **multi-core processor** implements multiple processors on a single integrated-circuit chip. |
| **Secondary storage unit** | This is the long-term, high-capacity “warehousing” section. Programs or data not actively being used by the other units normally are placed on secondary storage devices until they're again needed. Information on secondary storage devices is **persistent**—it's preserved even when the computer's power is turned off. Examples of secondary storage devices include hard drives, DVD drives and USB flash drives. |

## 1.3 Data Hierarchy
Data items processed by computers form a **data hierarchy** that becomes larger and more complex in structure as we progress from the simplest data items (called “bits”) to richer ones, such as characters and fields.

- **Bits**: The smallest data item in a computer can assume the value 0 or the value 1. It's called a bit (short for "binary digit").
- **Characters**: Digits, letters and special symbols are known as characters. The computer's character set is the set of all the characters used to write programs and represent data items. C supports various character sets, including Unicode which contains characters for many of the world's languages.
- **Fields**: A field is a group of characters or bytes that conveys meaning. For example, a field consisting of uppercase and lowercase letters can be used to represent a person's name.
- **Records**: Several related fields can be used to compose a record. For example, an employee record might consist of fields for ID number, name, address, etc.
- **Files**: A file is a group of related records.
- **Database**: A database is a collection of data organized for easy access and manipulation. The most popular model is the relational database, in which data is stored in simple tables.
- **Big Data**: The amount of data being produced worldwide is enormous and growing quickly. Big data applications deal with massive amounts of data.

| Unit | Bytes | Which is approximately |
|---|---|---|
| 1 kilobyte (KB) | 1024 bytes | 10³ (1024 bytes exactly) |
| 1 megabyte (MB) | 1024 kilobytes | 10⁶ (1,000,000 bytes) |
| 1 gigabyte (GB) | 1024 megabytes | 10⁹ (1,000,000,000 bytes) |
| 1 terabyte (TB) | 1024 gigabytes | 10¹² (1,000,000,000,000 bytes) |
| 1 petabyte (PB) | 1024 terabytes | 10¹⁵ (1,000,000,000,000,000 bytes) |
| 1 exabyte (EB) | 1024 petabytes | 10¹⁸ (1,000,000,000,000,000,000 bytes) |
| 1 zettabyte (ZB) | 1024 exabytes | 10²¹ (1,000,000,000,000,000,000,000 bytes) |

## 1.4 Machine Languages, Assembly Languages and High-Level Languages
Programmers write instructions in various programming languages. These may be divided into three general types:
1.  **Machine languages**: Any computer can directly understand only its own machine language, defined by its hardware design. Machine languages generally consist of strings of numbers (ultimately reduced to 1s and 0s). Such languages are cumbersome for humans.
2.  **Assembly languages**: Programmers began using English-like abbreviations to represent elementary operations. These abbreviations formed the basis of assembly languages. Translator programs called **assemblers** were developed to convert early assembly-language programs to machine language.
3.  **High-level languages**: To speed the programming process, high-level languages were developed in which single statements could be written to accomplish substantial tasks. Translator programs called **compilers** convert high-level language programs into machine language. **Interpreters** execute high-level language programs directly, avoiding compilation but running slower.

## 1.5 The C Programming Language
C evolved from two previous languages, BCPL and B. The C language was evolved from B by Dennis Ritchie at Bell Laboratories and was originally implemented in 1972. C initially became widely known as the development language of the UNIX operating system. Many of today's leading operating systems are written in C and/or C++. C is mostly hardware independent—with careful design, it's possible to write C programs that are portable to most computers.

C is widely used to develop systems that demand performance, such as operating systems, embedded systems, real-time systems and communications systems.

A standard version of C was needed, so a committee was created to develop a standard. The standard was approved in 1989 and updated in 1999 (C99). We also discuss the latest C standard (C11), approved in 2011.

## 1.6 C Standard Library
C programs consist of pieces called functions. You can program all the functions that you need to form a C program, but most C programmers take advantage of the rich collection of existing functions called the **C Standard Library**. This encourages **software reuse**.

## 1.7 C++ and Other C-Based Languages
C++ was developed by Bjarne Stroustrup at Bell Laboratories. It has its roots in C, providing a number of features that “spruce up” the C language. More important, it provides capabilities for **object-oriented programming**.

| Programming language | Description |
|---|---|
| **Objective-C** | An object-oriented language based on C. It has become the key programming language for the OS X operating system and all iOS-powered devices. |
| **Java** | A C++-based object-oriented programming language developed by Sun Microsystems. A key goal of Java is to enable the writing of programs that will run on a broad variety of computer systems. It is also the language of Android app development. |
| **C#** | Microsoft's primary object-oriented language, based on C++ and Java. |
| **PHP** | An object-oriented, open-source scripting language used by millions of websites. |
| **Python** | An object-oriented scripting language developed by Guido van Rossum. |
| **JavaScript** | The most widely used scripting language, primarily used to add dynamic behavior to web pages. |
| **Swift** | Apple's new programming language for developing iOS and Mac apps, announced in 2014. |

## 1.8 Object Technology
Building software quickly, correctly and economically remains an elusive goal. **Objects**, or more precisely the classes objects come from, are essentially reusable software components that model items in the real world.
*   **Methods and Classes**: Performing a task in a program requires a method. The method houses the program statements that actually perform its tasks. In object-oriented programming languages, we create a program unit called a class to house the set of methods that perform the class's tasks.
*   **Instantiation**: You must build an object of a class before a program can perform the tasks that the class's methods define. The process of doing this is called instantiation. An object is an instance of its class.
*   **Reuse**: Reusing existing classes when building new classes and programs saves time and effort.
*   **Messages and Method Calls**: You send messages to an object. Each message is implemented as a method call that tells a method of the object to perform its task.
*   **Attributes and Instance Variables**: An object has attributes that it carries along as it's used in a program. These attributes are specified by the class's instance variables.
*   **Encapsulation and Information Hiding**: Classes encapsulate, i.e., encase, their attributes and methods. Objects may communicate with one another, but they're normally not allowed to know how other objects are implemented—implementation details are hidden.
*   **Inheritance**: A new class of objects can be created conveniently by inheritance—the new class (called the subclass) starts with the characteristics of an existing class (called the superclass), possibly customizing them and adding unique characteristics of its own.

## 1.9 Typical C Program-Development Environment
C systems generally consist of several parts: a program-development environment, the language and the C Standard Library. C programs typically go through six phases to be executed: edit, preprocess, compile, link, load and execute.

1.  **Phase 1: Creating a Program**: You type a C program with an editor and store the program on a secondary storage device. C program filenames should end with the \`.c\` extension.
2.  **Phase 2 & 3: Preprocessing and Compiling a C Program**: The compiler translates the C program into machine-language code (object code). A preprocessor program executes automatically before compilation, obeying special commands called preprocessor directives which indicate manipulations to be performed on the program. A syntax error occurs when the compiler cannot recognize a statement because it violates the rules of the language.
3.  **Phase 4: Linking**: C programs typically contain references to functions defined elsewhere. A linker links the object code with the code for the missing functions to produce an executable image.
4.  **Phase 5: Loading**: Before a program can be executed, it must first be placed in memory. This is done by the loader, which takes the executable image from disk and transfers it to memory.
5.  **Phase 6: Execution**: The computer, under the control of its CPU, executes the program one instruction at a time. Runtime errors (e.g., division by zero) can occur at this stage.

## 1.10 Test-Driving a C Application in Windows, Linux and Mac OS X
This section walks you through compiling and running your first C application—a guess-the-number game—from the command line in Windows, Linux, and Mac OS X.

## 1.11 Operating Systems
**Operating systems** are software systems that make using computers more convenient. The software that contains the core components of the operating system is the **kernel**.
*   **1.11.1 Windows—A Proprietary Operating System**: Developed by Microsoft, it's the world's most widely used operating system.
*   **1.11.2 Linux—An Open-Source Operating System**: Perhaps the greatest success of the open-source movement, popular in servers, personal computers, and embedded systems.
*   **1.11.3 Apple's Mac OS X; Apple's iOS**: Mac OS X is a descendant of NeXTSTEP. iOS is derived from Mac OS X and is used in the iPhone, iPad and iPod Touch devices.
*   **1.11.4 Google's Android**: The fastest growing tablet and smartphone operating system, based on the Linux kernel and Java.

## 1.12 The Internet and World Wide Web
In the late 1960s, ARPA rolled out plans for networking computer systems, which became known as the ARPANET, the precursor to today's Internet. The protocol for communicating over the ARPANET became known as the Transmission Control Protocol (TCP). Later, the Internet Protocol (IP) was developed. The combined set of protocols is now called TCP/IP.

The **World Wide Web** (simply called “the web”) is a collection of hardware and software associated with the Internet that allows computer users to locate and view multimedia-based documents. In 1989, Tim Berners-Lee of CERN began to develop a technology for sharing information via "hyperlinked” text documents, called HyperText Markup Language (HTML), and communication protocols like HyperText Transfer Protocol (HTTP).

## 1.13 Some Key Software Terminology
This section introduces several buzzwords from the software development community.

| Technology | Description |
|---|---|
| Agile software development | A set of methodologies that try to get software implemented faster and using fewer resources. |
| Refactoring | Reworking programs to make them clearer and easier to maintain while preserving their correctness and functionality. |
| Design patterns | Proven architectures for constructing flexible and maintainable object-oriented software. |
| LAMP | An acronym for Linux, Apache, MySQL and PHP (or Perl or Python). |
| Software as a Service (SaaS) | The software runs on servers elsewhere on the Internet and is accessed through a browser. |
| Platform as a Service (PaaS) | Provides a computing platform for developing and running applications as a service over the web. |
| Cloud computing | Using software and data stored in the “cloud”—i.e., accessed on remote computers via the Internet. |
| Software Development Kit (SDK) | Includes the tools and documentation developers use to program applications. |

Software products typically go through release stages:
- **Alpha**: Earliest release, often buggy and incomplete.
- **Beta**: More stable, released to a larger number of developers.
- **Release candidates**: Generally feature complete and bug free, ready for community testing.
- **Final release**: The product is released to the general public.
- **Continuous beta**: Hosted in the cloud and constantly evolving without version numbers.

## 1.14 Keeping Up-to-Date with Information Technologies
This section lists key technical and business publications that will help you stay up-to-date with the latest news and trends and technology. You can also find a growing list of Internet- and web-related Resource Centers at www.deitel.com/ResourceCenters.html.
`,
  zh: `
# 1. 電腦、網際網路與全球資訊網簡介

## 1.1 簡介
歡迎學習 C 和 C++！C 是一種簡潔而強大的電腦程式語言，適合幾乎沒有或完全沒有程式設計經驗的技術導向人士，也適合經驗豐富的程式設計師用來建構大型軟體系統。《C 語言程式設計》第八版是適合這兩類讀者的有效學習工具。

本書的核心是透過在 C 中經過驗證的結構化程式設計方法論和在 C++ 中的物件導向程式設計來強調軟體工程。本書呈現了數百個完整的、可運行的程式，並展示了這些程式在電腦上運行時產生的輸出。我們稱之為「實時代碼方法」(live-code approach)。所有這些範例程式都可以從我們的網站 www.deitel.com/books/chtp8/ 下載。

大多數人都熟悉電腦執行的令人興奮的任務。透過本教科書，您將學習如何命令電腦執行這些任務。是軟體（也就是您編寫來命令電腦執行動作和做出決策的指令）控制著電腦（通常稱為硬體）。

## 1.2 硬體與軟體
電腦執行計算和做出邏輯決策的速度遠超人類。今日許多個人電腦每秒可執行數十億次計算——比一個人一生中能執行的還多。超級電腦每秒已經可以執行數千兆次（千兆）的指令！中國國防科技大學的天河二號超級電腦每秒可執行超過 33 千兆次計算（33.86 petaflops）！換個角度看，天河二號超級電腦一秒鐘內可以為地球上每個人執行約 300 萬次計算！而超級計算的「上限」正在迅速增長。

電腦在稱為**電腦程式**的指令序列控制下處理資料。這些軟體程式引導電腦完成由稱為**電腦程式設計師**的人所指定的有序動作。

電腦由各種稱為**硬體**的設備組成（例如，鍵盤、螢幕、滑鼠、硬碟、記憶體、DVD 光碟機和處理單元）。由於硬體和軟體技術的快速發展，計算成本正在急劇下降。幾十年前可能佔滿大房間、耗資數百萬美元的電腦，現在被刻在比指甲還小的矽晶片上，成本可能只需幾美元。諷刺的是，矽是地球上最豐富的材料之一——它是普通沙子的一種成分。矽晶片技術使計算變得如此經濟，以至於電腦已成為一種商品。

### 1.2.1 摩爾定律
每年，您可能都預期大多數產品和服務的價格至少會上漲一點。但在電腦和通訊領域，情況恰恰相反，特別是在支援這些技術的硬體方面。幾十年來，硬體成本一直在迅速下降。

每一兩年，電腦的容量大約會以低廉的成本翻倍。這個顯著的趨勢通常被稱為**摩爾定律**，以在 1960 年代提出此說法的高登·摩爾（英特爾共同創辦人）命名。摩爾定律及其相關觀察特別適用於電腦用於程式的記憶體數量、用於長期儲存程式和資料的輔助儲存（如磁碟儲存）容量，以及它們的處理器速度——即它們執行程式的速度。

類似的增長也發生在通訊領域——由於對通訊頻寬（即資訊承載能力）的巨大需求吸引了激烈的競爭，成本已大幅下降。我們不知道還有哪個領域的技術進步如此之快，成本下降如此之迅速。這種驚人的進步確實在促進資訊革命。

### 1.2.2 電腦組織
無論外觀如何不同，電腦都可以被看作是劃分為各種邏輯單元或部分。

| 邏輯單元 | 描述 |
|---|---|
| **輸入單元** | 這個「接收」部分從輸入設備獲取資訊（資料和電腦程式），並將其提供給其他單元進行處理。大多數使用者輸入是透過鍵盤、觸控螢幕和滑鼠設備輸入電腦的。其他輸入形式包括接收語音命令、掃描圖像和條碼、從輔助儲存設備（如硬碟、DVD、藍光光碟機和 USB 隨身碟）讀取、從網路攝影機接收影片，以及讓您的電腦從網際網路接收資訊（例如，當您從 YouTube® 串流影片或從 Amazon 下載電子書時）。較新的輸入形式包括來自 GPS 設備的位置資料，以及來自智慧型手機或遊戲控制器中加速度計的運動和方向資訊。 |
| **輸出單元** | 這個「輸送」部分將電腦處理過的資訊放置在各種輸出設備上，以供電腦外部使用。今日從電腦輸出的資訊大多顯示在螢幕上（包括觸控螢幕）、印在紙上、作為音訊或影片播放、顯示在體育場館的巨型螢幕上、透過網際網路傳輸，或用於控制其他設備，如機器人和「智慧」家電。資訊也通常輸出到輔助儲存設備。 |
| **記憶體單元** | 這個快速存取、容量相對較低的「倉庫」部分保留透過輸入單元輸入的資訊，使其在需要時能立即用於處理。記憶體單元也保留處理過的資訊，直到可以將其放置在輸出設備上。記憶體單元中的資訊是易失性的——當電腦電源關閉時，它通常會遺失。記憶體單元通常被稱為記憶體、**主記憶體**或 RAM (隨機存取記憶體)。 |
| **算術與邏輯單元 (ALU)** | 這個「製造」部分執行計算，如加、減、乘、除。它還包含決策機制，允許電腦比較記憶體單元中的兩個項目以確定它們是否相等。 |
| **中央處理單元 (CPU)** | 這個「行政」部分協調和監督其他部分的運作。CPU 告訴輸入單元何時應將資訊讀入記憶體單元，告訴 ALU 何時應使用記憶體單元中的資訊進行計算，並告訴輸出單元何時應將資訊從記憶體單元發送到某些輸出設備。今日許多電腦有多個 CPU，因此可以同時執行許多操作。**多核心處理器**在單一積體電路晶片上實現多個處理器。 |
| **輔助儲存單元** | 這是長期、高容量的「倉儲」部分。其他單元不活躍使用的程式或資料通常被放置在輔助儲存設備上，直到再次需要它們。輔助儲存設備上的資訊是**持久的**——即使電腦電源關閉，它也會被保留下來。輔助儲存設備的例子包括硬碟、DVD 光碟機和 USB 隨身碟。 |

## 1.3 資料階層
由電腦處理的資料項目形成一個**資料階層**，隨著我們從最簡單的資料項目（稱為「位元」）進展到更豐富的項目（如字元和欄位），其結構變得更大、更複雜。

- **位元 (Bits)**：電腦中最小的資料項目，可以取值 0 或 1。它被稱為位元（「二進位數字」的縮寫）。
- **字元 (Characters)**：數字、字母和特殊符號被稱為字元。電腦的字元集是所有用於編寫程式和表示資料項目的字元集合。C 語言支援多種字元集，包括包含世界多種語言字元的 Unicode。
- **欄位 (Fields)**：欄位是一組傳達意義的字元或位元組。例如，由大小寫字母組成的欄位可用於表示一個人的名字。
- **記錄 (Records)**：幾個相關的欄位可以組成一個記錄。例如，一個員工記錄可能包含員工 ID、姓名、地址等欄位。
- **檔案 (Files)**：檔案是一組相關的記錄。
- **資料庫 (Database)**：資料庫是為方便存取和操作而組織的資料集合。最流行的模型是關聯式資料庫，其中資料儲存在簡單的表格中。
- **大數據 (Big Data)**：全球範圍內產生的資料量是巨大的，並且正在迅速增長。大數據應用程式處理大量的資料。

| 單位 | 位元組 | 大約是 |
|---|---|---|
| 1 千位元組 (KB) | 1024 bytes | 10³ (正好 1024 bytes) |
| 1 百萬位元組 (MB) | 1024 kilobytes | 10⁶ (1,000,000 bytes) |
| 1 十億位元組 (GB) | 1024 megabytes | 10⁹ (1,000,000,000 bytes) |
| 1 兆位元組 (TB) | 1024 gigabytes | 10¹² (1,000,000,000,000 bytes) |
| 1 千兆位元組 (PB) | 1024 terabytes | 10¹⁵ (1,000,000,000,000,000 bytes) |
| 1 百京位元組 (EB) | 1024 petabytes | 10¹⁸ (1,000,000,000,000,000,000 bytes) |
| 1 十垓位元組 (ZB) | 1024 exabytes | 10²¹ (1,000,000,000,000,000,000,000 bytes) |

## 1.4 機器語言、組合語言與高階語言
程式設計師使用各種程式語言編寫指令。這些語言可分為三種類型：
1.  **機器語言**：任何電腦只能直接理解其自身的機器語言，由其硬體設計定義。機器語言通常由數字串（最終簡化為 1 和 0）組成。這種語言對人類來說很麻煩。
2.  **組合語言**：程式設計師開始使用類似英語的縮寫來表示基本操作。這些縮寫構成了組合語言的基礎。稱為**組譯器**的翻譯程式被開發出來，用於將早期的組合語言程式轉換為機器語言。
3.  **高階語言**：為了加快程式設計過程，開發了高階語言，其中單一陳述式可以完成大量任務。稱為**編譯器**的翻譯程式將高階語言程式轉換為機器語言。**直譯器**則直接執行高階語言程式，避免了編譯過程，但運行速度較慢。

## 1.5 C 程式語言
C 語言從 BCPL 和 B 這兩種早期的語言演變而來。C 語言由丹尼斯·里奇在貝爾實驗室開發，並於 1972 年首次實現。C 最初作為 UNIX 作業系統的開發語言而廣為人知。今日許多領先的作業系統都是用 C 和/或 C++ 編寫的。C 語言基本上與硬體無關——透過精心設計，可以編寫可移植到大多數電腦上的 C 程式。

C 語言廣泛用於開發需要高性能的系統，例如作業系統、嵌入式系統、即時系統和通訊系統。

為了需要一個標準版本的 C，一個委員會被創建來開發一個標準。該標準於 1989 年被批准，並於 1999 年更新 (C99)。我們也討論了 2011 年批准的最新 C 標準 (C11)。

## 1.6 C 標準函式庫
C 程式由稱為函式的功能塊組成。您可以編寫所有需要的函式來組成一個 C 程式，但大多數 C 程式設計師都會利用一個豐富的現有函式集合，稱為**C 標準函式庫**。這鼓勵了**軟體重用**。

## 1.7 C++ 與其他基於 C 的語言
C++ 由 Bjarne Stroustrup 在貝爾實驗室開發。它植根於 C，提供了一些「美化」C 語言的功能。更重要的是，它提供了**物件導向程式設計**的能力。

| 程式語言 | 描述 |
|---|---|
| **Objective-C** | 一種基於 C 的物件導向語言。它已成為 OS X 作業系統和所有 iOS 設備的關鍵程式語言。 |
| **Java** | 由 Sun Microsystems 開發的基於 C++ 的物件導向程式語言。Java 的一個關鍵目標是能夠編寫可在各種電腦系統上運行的程式。它也是 Android 應用程式開發的語言。 |
| **C#** | 微軟的主要物件導向語言，基於 C++ 和 Java。 |
| **PHP** | 一種物件導向的開源腳本語言，被數百萬個網站使用。 |
| **Python** | 由 Guido van Rossum 開發的物件導向腳本語言。 |
| **JavaScript** | 使用最廣泛的腳本語言，主要用於為網頁添加動態行為。 |
| **Swift** | 蘋果公司於 2014 年宣布的用於開發 iOS 和 Mac 應用的新程式語言。 |

## 1.8 物件技術
快速、正確且經濟地建構軟體仍然是一個難以實現的目標。**物件**，或更準確地說，物件所來自的類別，本質上是可重用的軟體組件，用於模擬現實世界中的事物。
*   **方法與類別**：在程式中執行一項任務需要一個方法。方法容納了實際執行其任務的程式陳述式。在物件導向程式語言中，我們創建一個稱為類別的程式單元來容納執行該類別任務的方法集合。
*   **實例化**：在程式可以執行類別方法定義的任務之前，您必須從該類別建立一個物件。這個過程稱為實例化。物件是其類別的一個實例。
*   **重用**：在建構新類別和程式時重用現有類別可以節省時間和精力。
*   **訊息與方法呼叫**：您向物件發送訊息。每個訊息都實現為一個方法呼叫，它告訴物件的某個方法去執行其任務。
*   **屬性與實例變數**：物件在使用過程中帶有其屬性。這些屬性由類別的實例變數指定。
*   **封裝與資訊隱藏**：類別封裝，即包裹其屬性和方法。物件可以相互通訊，但通常不允許知道其他物件是如何實現的——實作細節被隱藏起來。
*   **繼承**：可以透過繼承方便地創建一個新的物件類別——新類別（稱為子類別）從一個現有類別（稱為父類別）的特性開始，可能會客製化它們並添加自己獨特的特性。

## 1.9 典型的 C 程式開發環境
C 系統通常由幾個部分組成：程式開發環境、語言和 C 標準函式庫。C 程式通常經過六個階段才能執行：編輯、前置處理、編譯、連結、載入和執行。

1.  **階段 1：創建程式**：您使用編輯器輸入 C 程式，並將程式儲存在輔助儲存設備上。C 程式檔案名應以 \`.c\` 副檔名結尾。
2.  **階段 2 & 3：前置處理與編譯 C 程式**：編譯器將 C 程式轉譯成機器語言程式碼（目的碼）。一個前置處理器程式在編譯前自動執行，遵循稱為前置處理器指令的特殊命令，這些指令指示要對程式執行的操作。當編譯器無法識別某個陳述式時，會發生語法錯誤，因為它違反了語言規則。
3.  **階段 4：連結**：C 程式通常包含對在其他地方定義的函式的引用。連結器將目的碼與缺失函式的程式碼（例如，來自標準函式庫）連結起來，產生可執行映像檔。
4.  **階段 5：載入**：在程式可以執行之前，它必須首先被放置在記憶體中。這由載入器完成，它將可執行映像檔從磁碟中取出並傳輸到記憶體中。
5.  **階段 6：執行**：電腦在其 CPU 的控制下，逐一執行程式的指令。此階段可能發生執行時錯誤（例如，除以零）。

## 1.10 試駕一個 C 應用程式
本節將引導您在 Windows、Linux 和 Mac OS X 的命令列中編譯和運行您的第一個 C 應用程式——一個猜數字遊戲。

## 1.11 作業系統
**作業系統** (OS) 是使電腦使用更方便的軟體系統。作業系統的核心組件所在的軟體是**核心 (kernel)**。
*   **1.11.1 Windows——專有作業系統**：由微軟開發，是世界上使用最廣泛的作業系統。
*   **1.11.2 Linux——開源作業系統**：可能是開源運動的最大成功，在伺服器、個人電腦和嵌入式系統中廣受歡迎。
*   **1.11.3 蘋果的 Mac OS X；蘋果的 iOS**：Mac OS X 是 NeXTSTEP 的後代。iOS 源自 Mac OS X，用於 iPhone、iPad 和 iPod Touch 設備。
*   **1.11.4 Google 的 Android**：增長最快的平板電腦和智慧型手機作業系統，基於 Linux 核心和 Java。

## 1.12 網際網路與全球資訊網
網際網路的前身是 ARPANET，於 1960 年代後期開發。管理網際網路通訊的協定集合是 TCP/IP。**全球資訊網**（簡稱「網路」）是與網際網路相關的硬體和軟體集合，允許電腦使用者定位和查看基於多媒體的文件。1989 年，CERN 的提姆·柏內茲-李開始開發一種透過「超連結」文本文件共享資訊的技術，稱為超文本標記語言 (HTML)，以及像超文本傳輸協定 (HTTP) 這樣的通訊協定。

## 1.13 一些關鍵軟體術語
本節介紹軟體開發社群中的幾個流行語。

| 技術 | 描述 |
|---|---|
| 敏捷軟體開發 | 一套旨在更快、使用更少資源實現軟體的方法論。 |
| 重構 | 在保持其正確性和功能的同時，重新設計程式，使其更清晰、更易於維護。 |
| 設計模式 | 用於建構靈活且可維護的物件導向軟體的成熟架構。 |
| LAMP | Linux、Apache、MySQL 和 PHP（或 Perl 或 Python）的縮寫。 |
| 軟體即服務 (SaaS) | 軟體在網際網路上的其他伺服器上運行，並透過瀏覽器存取。 |
| 平台即服務 (PaaS) | 透過網路提供用於開發和運行應用程式的計算平台作為服務。 |
| 雲端運算 | 使用儲存在「雲端」中的軟體和資料——即透過網際網路在遠端電腦上存取。 |
| 軟體開發套件 (SDK) | 包括開發人員用來編寫應用程式的工具和文件。 |

軟體產品通常會經歷以下發布階段：
- **Alpha**：最早的發行版，通常充滿錯誤且不完整。
- **Beta**：更穩定，發布給更多的開發人員。
- **發行候選版 (Release candidates)**：通常功能完整且無錯誤，準備好進行社群測試。
- **最終版 (Final release)**：產品向公眾發布。
- **持續 Beta (Continuous beta)**：託管在雲端並不斷演進，沒有版本號。

## 1.14 隨時掌握資訊技術的最新動態
本節列出了一些關鍵的技術和商業出版物，以幫助您隨時了解最新的新聞、趨勢和技術。您也可以在 www.deitel.com/ResourceCenters.html 找到一個不斷增長的網際網路和網路相關資源中心列表。
`,
};
