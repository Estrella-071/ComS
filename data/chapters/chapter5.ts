
export const chapter5Content = {
  en: `
# Chapter 5: Computer Organization

In this chapter we discuss the organization of a stand-alone computer. We explain how 
every computer is made up of three subsystems. We also show how a simple, hypothetical 
computer can run a simple program to perform primitive arithmetic or logic operations. 

## Objectives
After studying this chapter, the student should be able to:
- List the three subsystems of a computer.
- Describe the role of the central processing unit (CPU) in a computer.
- Describe the fetch–decode–execute phases of a cycle in a typical computer. 
- Describe the main memory and its addressing space.
- Distinguish between main memory and cache memory. 
- Define the input/output subsystem.
- Understand the interconnection of subsystems and list different bus systems.
- Describe different methods of input/output addressing.
- Distinguish the two major trends in the design of computer architecture.
- Understand how computer throughput can be improved using pipelining.
- Understand how parallel processing can improve the throughput of computers. 

## 5.1 INTRODUCTION
We can divide the parts that make up a computer into three broad categories or subsystems: the central processing unit (CPU), the main memory, and the input/output subsystem. 

## 5.2 CENTRAL PROCESSING UNIT
The central processing unit (CPU) performs operations on data. It has three parts: an arithmetic logic unit (ALU), a control unit, and a set of registers.
- **ALU**: Performs logic, shift, and arithmetic operations on data.
- **Registers**: Fast stand-alone storage locations that hold data temporarily. They include data registers, instruction registers, and the program counter.
- **Control Unit**: Controls the operation of each subsystem.

## 5.3 MAIN MEMORY
Main memory consists of a collection of storage locations, each with a unique identifier called an address. Data is transferred in groups called words.
- **Address space**: The total number of uniquely identifiable locations in memory.
- **Memory types**: RAM (SRAM, DRAM) and ROM (PROM, EPROM, EEPROM).
- **Memory hierarchy**: A structure that uses a hierarchy of memory types to achieve the best performance at the lowest cost.
- **Cache memory**: Faster than main memory but slower than the CPU and its registers.

## 5.4 INPUT/OUTPUT SUBSYSTEM
This subsystem allows a computer to communicate with the outside world, and to store programs and data even when the power is off.
- **Nonstorage devices**: Keyboard, monitor, printer.
- **Storage devices**: Magnetic disks, magnetic tape, CD-ROMs, CD-Rs, CD-RWs, and DVDs.

## 5.5 SUBSYSTEM INTERCONNECTION
The CPU and memory are normally connected by three groups of connections, each called a bus: data bus, address bus, and control bus.
- **I/O devices** connect to the buses through controllers like SCSI, FireWire, and USB.

## 5.6 PROGRAM EXECUTION
A computer executes a program to create output data from input data. Both are stored in memory.
- **Machine cycle**: A simplified cycle can consist of three phases: fetch, decode, and execute.
- **Input/output operation**: Three methods for synchronization: programmed I/O, interrupt-driven I/O, and direct memory access (DMA).

## 5.7 DIFFERENT ARCHITECTURES
- **CISC (Complex Instruction Set Computer)**: Have a large set of instructions, including complex ones.
- **RISC (Reduced Instruction Set Computer)**: Have a small set of simple instructions.
- **Pipelining**: A technique to improve throughput by allowing different phases of instructions to be done simultaneously.
- **Parallel processing**: Using multiple control units, ALUs, and memory units to improve throughput.

## 5.8 A SIMPLE COMPUTER
An example to explain the architecture of computers as well as their instruction processing.
`,
  zh: `
# 第五章：電腦組織

在本章中，我們將討論單機電腦的組織。我們將解釋每台電腦如何由三個子系統組成。我們還將展示一台簡單的假設性電腦如何運行一個簡單的程式來執行基本的算術或邏輯運算。

## 學習目標
學完本章後，學生應能：
- 列出電腦的三個子系統。
- 描述中央處理單元 (CPU) 在電腦中的角色。
- 描述典型電腦週期中的提取-解碼-執行階段。
- 描述主記憶體及其定址空間。
- 區分主記憶體和快取記憶體。
- 定義輸入/輸出子系統。
- 理解子系統的互連並列出不同的匯流排系統。
- 描述不同的輸入/輸出定址方法。
- 區分電腦架構設計的兩大趨勢。
- 理解如何使用管線化技術提高電腦的吞吐量。
- 理解平行處理如何提高電腦的吞吐量。

## 5.1 簡介
我們可以將組成電腦的部件分為三大類或子系統：中央處理單元 (CPU)、主記憶體和輸入/輸出子系統。

## 5.2 中央處理單元 (CPU)
中央處理單元 (CPU) 對資料執行運算。它有三個部分：算術邏輯單元 (ALU)、控制單元和一組暫存器。
- **ALU**：對資料執行邏輯、移位和算術運算。
- **暫存器**：高速的獨立儲存位置，用於暫時保存資料。它們包括資料暫存器、指令暫存器和程式計數器。
- **控制單元**：控制每個子系統的運作。

## 5.3 主記憶體
主記憶體由一組儲存位置組成，每個位置都有一個稱為位址的唯一標識符。資料以稱為字 (word) 的群組進行傳輸。
- **定址空間**：記憶體中可唯一識別的位置總數。
- **記憶體類型**：RAM (SRAM, DRAM) 和 ROM (PROM, EPROM, EEPROM)。
- **記憶體階層**：一種使用不同類型記憶體階層的結構，以最低成本實現最佳性能。
- **快取記憶體**：比主記憶體快，但比 CPU 及其暫存器慢。

## 5.4 輸入/輸出子系統
此子系統允許電腦與外界通訊，並在斷電時也能儲存程式和資料。
- **非儲存設備**：鍵盤、顯示器、印表機。
- **儲存設備**：磁碟、磁帶、CD-ROM、CD-R、CD-RW 和 DVD。

## 5.5 子系統互連
CPU 和記憶體通常由三組連接線連接，每組稱為匯流排：資料匯流排、位址匯流排和控制匯流排。
- **I/O 設備**透過 SCSI、FireWire 和 USB 等控制器連接到匯流排。

## 5.6 程式執行
電腦執行程式以從輸入資料創建輸出資料。兩者都儲存在記憶體中。
- **機器週期**：一個簡化的週期可以包括三個階段：提取、解碼和執行。
- **輸入/輸出操作**：三種同步方法：程式控制 I/O、中斷驅動 I/O 和直接記憶體存取 (DMA)。

## 5.7 不同的架構
- **CISC (複雜指令集電腦)**：擁有大量指令集，包括複雜指令。
- **RISC (精簡指令集電腦)**：擁有小量簡單指令集。
- **管線化 (Pipelining)**：一種透過允許同時執行指令的不同階段來提高吞吐量的技術。
- **平行處理 (Parallel processing)**：使用多個控制單元、ALU 和記憶體單元來提高吞吐量。

## 5.8 一台簡單的電腦
一個解釋電腦架構及其指令處理的例子。
`,
};
