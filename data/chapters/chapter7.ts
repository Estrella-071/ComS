
export const chapter7Content = {
  en: `
# Chapter 7: Operating Systems

This is the first chapter in this book to deal with computer software. In this chapter we 
explore the role of the operating system in a computer. 

## Objectives
After studying this chapter, the student should be able to:
- Understand the role of the operating system in a computer system. 
- Give a definition of an operating system.
- Understand the process of bootstrapping to load the operating system into memory.
- List the components of an operating system.
- Discuss the role of the memory manager, process manager, device manager, and file manager in an operating system.
- Understand the main features of three common operating systems: UNIX, Linux, and Windows.

## 7.1 INTRODUCTION
A computer is a system composed of two major components: hardware and software. 
An **operating system** is an interface between the hardware of a computer and the 
user (programs or humans) that facilitates the execution of other programs 
and the access to hardware and software resources.

### 7.1.2 Bootstrap process
The operating system itself is a program that needs to be loaded into memory. A very small section of memory is made of ROM and holds a small program called the bootstrap program, which is responsible for loading the operating system into RAM memory.

## 7.2 EVOLUTION
Operating systems have gone through a long history of evolution.
- **Batch systems (1950s)**: Designed to control mainframe computers, processing jobs in batches.
- **Time-sharing systems**: Introduced multiprogramming, where several jobs are held in memory at a time and resources could be shared between them.
- **Personal systems**: Single-user operating systems such as DOS.
- **Parallel systems**: Multiple CPUs on the same machine, allowing many tasks to be accomplished in parallel.
- **Distributed systems**: Combine features of the previous generation with new duties such as controlling security across networked computers.
- **Real-time systems**: Expected to do a task within specific time constraints.

## 7.3 COMPONENTS 
A modern operating system has at least four duties: memory manager, process manager, device manager, and file manager.
- **User interface (Shell)**: A program that accepts requests from users and interprets them for the rest of the OS.
- **Memory manager**: Manages memory allocation.
  - **Monoprogramming**: Only one program in memory.
  - **Multiprogramming**: More than one program in memory, executed concurrently. Techniques include partitioning, paging, demand paging, and segmentation, which lead to the concept of **virtual memory**.
- **Process manager**: Manages the execution of programs (processes).
  - **Program, job, and process**: A program is a set of instructions. A job is a program selected for execution. A process is a program in execution.
  - **State diagrams**: Show the states of a process: hold, ready, running, waiting, terminated.
  - **Schedulers**: Job scheduler and process scheduler move jobs/processes between states.
  - **Process synchronization**: Handles issues like **deadlock** and **starvation**.
- **Device manager**: Responsible for access to input/output devices.
- **File manager**: Controls access to files, including creation, deletion, modification, storage, archiving, and backups.

## 7.4 A SURVEY OF OPERATING SYSTEMS
- **UNIX**: A multiuser, multiprocessing, portable operating system. It consists of the kernel, the shell, a standard set of utilities, and application programs.
- **Linux**: A new operating system developed by Linus Torvalds, with features traditionally attributed to UNIX. It has a kernel, system libraries, and system utilities.
- **Windows**: A single-user operating system from Microsoft with a modular, layered architecture (HAL, Kernel, Executive, Environmental subsystems).
`,
  zh: `
# 第七章：作業系統

這是本書第一章處理電腦軟體的章節。在本章中，我們將探討作業系統在電腦中的角色。

## 學習目標
學完本章後，學生應能：
- 理解作業系統在電腦系統中的角色。
- 給出作業系統的定義。
- 理解將作業系統載入記憶體的啟動程序 (bootstrapping)。
- 列出作業系統的組件。
- 討論記憶體管理器、行程管理器、設備管理器和檔案管理器在作業系統中的角色。
- 理解三種常見作業系統的主要特性：UNIX、Linux 和 Windows。

## 7.1 簡介
電腦是一個由兩個主要組件組成的系統：硬體和軟體。
**作業系統**是電腦硬體與使用者（程式或人類）之間的介面，它有助於其他程式的執行以及對硬體和軟體資源的存取。

### 7.1.2 啟動程序 (Bootstrap process)
作業系統本身是一個需要載入到記憶體中的程式。記憶體中一小部分由 ROM 組成，其中存放一個稱為啟動程式 (bootstrap program) 的小程式，負責將作業系統載入 RAM 記憶體。

## 7.2 演進
作業系統經歷了漫長的演進歷史。
- **批次系統 (1950年代)**：設計用於控制大型主機，以批次方式處理工作。
- **分時系統 (Time-sharing systems)**：引入了多重程式設計，一次將多個工作保留在記憶體中，並在它們之間共享資源。
- **個人系統 (Personal systems)**：單使用者作業系統，如 DOS。
- **平行系統 (Parallel systems)**：同一台機器上有多個 CPU，允許許多任務並行完成。
- **分散式系統 (Distributed systems)**：結合了前一代的特性，並增加了新的職責，如控制跨網路電腦的安全性。
- **即時系統 (Real-time systems)**：期望在特定的時間限制內完成任務。

## 7.3 組件
現代作業系統至少有四個職責：記憶體管理器、行程管理器、設備管理器和檔案管理器。
- **使用者介面 (Shell)**：一個接受使用者請求並為作業系統其餘部分解釋這些請求的程式。
- **記憶體管理器 (Memory manager)**：管理記憶體分配。
  - **單道程式設計 (Monoprogramming)**：記憶體中只有一個程式。
  - **多重程式設計 (Multiprogramming)**：記憶體中有多於一個程式，並行執行。技術包括分割、分頁、請求分頁和分段，這些導致了**虛擬記憶體**的概念。
- **行程管理器 (Process manager)**：管理程式（行程）的執行。
  - **程式、工作和行程**：程式是一組指令。工作是為執行而選擇的程式。行程是正在執行中的程式。
  - **狀態圖**：顯示行程的狀態：保持、就緒、執行中、等待、終止。
  - **排程器**：工作排程器和行程排程器在不同狀態之間移動工作/行程。
  - **行程同步**：處理諸如**死結**和**饑餓**等問題。
- **設備管理器 (Device manager)**：負責存取輸入/輸出設備。
- **檔案管理器 (File manager)**：控制對檔案的存取，包括建立、刪除、修改、儲存、封存和備份。

## 7.4 作業系統概覽
- **UNIX**：一個多使用者、多工、可移植的作業系統。它由核心、shell、一套標準公用程式和應用程式組成。
- **Linux**：由 Linus Torvalds 開發的新作業系統，具有傳統上歸屬於 UNIX 的特性。它有一個核心、系統函式庫和系統公用程式。
- **Windows**：微軟的單使用者作業系統，具有模組化、分層的架構（HAL、核心、執行層、環境子系統）。
`,
};
