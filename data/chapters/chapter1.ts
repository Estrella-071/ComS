
export const chapter1Content = {
  en: `
# Chapter 1: Introduction

The phrase computer science has a very broad meaning today. However, in this book, we 
define the phrase as ‘issues related to the computer’. This introductory chapter first tries 
to find out what a computer is, then investigates other issues directly related to computers. We look first at the Turing model as a mathematical and philosophical definition of 
computation. We then show how today’s computers are based on the von Neumann 
model. The chapter ends with a brief history of this culture-changing device . . . the 
computer.

## Objectives
After studying this chapter, the student should be able to:
- Define the Turing model of a computer.
- Define the von Neumann model of a computer.
- Describe the three components of a computer: hardware, data, and software.
- List topics related to computer hardware.
- List topics related to data.
- List topics related to software.
- Give a short history of computers.

## 1.1 TURING MODEL
The idea of a universal computational device was first described by Alan Turing in 1936. 
He proposed that all computation could be performed by a special kind of a machine, now 
called a Turing machine. Although Turing presented a mathematical description of such a 
machine, he was more interested in the philosophical definition of computation than in 
building the actual machine. He based the model on the actions that people perform 
when involved in computation. He abstracted these actions into a model for a computational machine that has really changed the world.

### 1.1.1 Data processors
Before discussing the Turing model, let us define a computer as a data processor. Using 
this definition, a computer acts as a black box that accepts input data, processes the data, 
and creates output data. Although this model can define the functionality of 
a computer today, it is too general. In this model, a pocket calculator is also a computer 
(which it is, in a literal sense).

### 1.1.2 Programmable data processors
The Turing model is a better model for a general-purpose computer. This model adds an 
extra element to the specific computing machine: the program. A program is a set of 
instructions that tells the computer what to do with data. 
In the Turing model, the output data depends on the combination of two factors: the 
input data and the program. With the same input data, we can generate different output 
if we change the program. Similarly, with the same program, we can generate different 
outputs if we change the input data.

### 1.1.3 The universal Turing machine
A universal Turing machine, a machine that can do any computation if the appropriate 
program is provided, was the first description of a modern computer. It can be proved that 
a very powerful computer and a universal Turing machine can compute the same thing. 
We need only provide the data and the program—the description of how to do the computation—to either machine. In fact, a universal Turing machine is capable of computing 
anything that is computable. 

## 1.2 VON NEUMANN MODEL
Computers built on the Turing universal machine store data in their memory. Around 
1944–1945, John von Neumann proposed that, since program and data are logically the 
same, programs should also be stored in the memory of a computer.

### 1.2.1 Four subsystems
Computers built on the von Neumann model divide the computer hardware into four 
subsystems: memory, arithmetic logic unit, control unit, and input/output.
- **Memory**: Memory is the storage area. This is where programs and data are stored during processing. 
- **Arithmetic logic unit (ALU)**: The arithmetic logic unit (ALU) is where calculation and logical operations take place. 
- **Control unit**: The control unit controls the operations of the memory, ALU, and the input/output subsystem. 
- **Input / output**: The input subsystem accepts input data and the program from outside the computer, while the output subsystem sends the result of processing to the outside world.

### 1.2.2 The stored program concept
The von Neumann model states that the program must be stored in memory. This is 
totally different from the architecture of early computers in which only the data was 
stored in memory: the programs for their task were implemented by manipulating a set of 
switches or by changing the wiring system. The memory of modern computers hosts both a program and its corresponding data. 
This implies that both the data and programs should have the same format, because they 
are stored in memory. In fact, they are stored as binary patterns in memory—a sequence 
of 0s and 1s. 

### 1.2.3 Sequential execution of instructions
A program in the von Neumann model is made of a finite number of instructions. In this 
model, the control unit fetches one instruction from memory, decodes it, then executes 
it. In other words, the instructions are executed one after another. Sequential execution of a program was the initial requirement of a computer based on 
the von Neumann model. Today’s computers execute programs in the order that is the 
most efficient. 

## 1.3 COMPUTER COMPONENTS
We can think of a computer as being made up of three components: computer hardware, 
data, and computer software. 

### 1.3.1 Computer hardware
Computer hardware today has four components under the von Neumann model, although 
we can have different types of memory, different types of input/output subsystems, and 
so on. We discuss computer hardware in more detail in Chapter 5. 

### 1.3.2 Data
The von Neumann model clearly defines a computer as a data processing machine that 
accepts the input data, processes it, and outputs the result. Data needs to be changed to another system that uses only two states (0 and 1) to be stored in a computer. In Chapter 3, we will learn how to store different types of data as a binary pattern.

### 1.3.3 Computer software
The main feature of the Turing or von Neumann models is the concept of the program. 
Programming those early computers meant changing the wiring systems or turning a set of switches on or off.
- **Programs must be stored**: In the von Neumann model programs are stored in the computer’s memory.
- **A sequence of instructions**: The program must consist of a sequence of instructions.
- **Algorithms**: A programmer must first solve the problem in a step-by-step manner, then try to find the appropriate instruction (or series of instructions) to implement those steps. This step-by-step solution is called an algorithm.
- **Languages**: The concept of computer languages was born from the idea of using symbols to represent binary patterns.
- **Software engineering**: The design and writing of structured programs.
- **Operating systems**: A manager to facilitate access to the computer’s components by a program.

## 1.4 HISTORY
In this section we briefly review the history of computing and computers. We divide this 
history into three periods.

### 1.4.1 Mechanical machines (before 1930)
- **Pascaline**: In the seventeenth century, Blaise Pascal invented Pascaline, a mechanical calculator for addition and subtraction operations.
- **Leibniz Wheel**: In the late seventeenth century, German mathematician Gottfried Leibniz invented a more sophisticated mechanical calculator that could do multiplication and division.
- **Jacquard loom**: The first machine that used the idea of storage and programming, invented by Joseph-Marie Jacquard at the beginning of the nineteenth century.
- **Difference Engine & Analytical Engine**: In 1823, Charles Babbage invented the Difference Engine. Later, he invented a machine called the Analytical Engine that, to some extent, parallels the idea of modern computers. It had four components: a mill (ALU), a store (memory), an operator (control unit), and output (input/output).
- **Hollerith's machine**: In 1890, Herman Hollerith designed and built a programmer machine that could automatically read, tally, and sort data stored on punched cards.

### 1.4.2 The birth of electronic computers (1930–1950)
- **ABC (Atanasoff Berry Computer)**: The first special-purpose computer that encoded information electrically was invented by John V. Atanasoff in 1939.
- **Mark I**: In the 1930s, Howard Aiken built a huge computer called Mark I.
- **Colossus**: In England, Alan Turing invented a computer called Colossus that was designed to break the German Enigma code.
- **ENIAC**: The first general-purpose, totally electronic computer was made by John Mauchly and J. Presper Eckert and was called ENIAC (Electronic Numerical Integrator and Calculator).
- **EDVAC & EDSAC**: The first computers based on von Neumann’s ideas were made in 1950.

### 1.4.3 Computer generations (1950–present)
- **First generation (1950–1959)**: Characterized by the emergence of commercial computers using vacuum tubes.
- **Second generation (1959–1965)**: Used transistors instead of vacuum tubes. Two high-level programming languages, FORTRAN and COBOL, were invented.
- **Third generation (1965–1975)**: The invention of the integrated circuit. Minicomputers appeared.
- **Fourth generation (1975–1985)**: Saw the appearance of microcomputers.
- **Fifth generation (1985-present)**: Witnessed the appearance of laptop and palmtop computers, multimedia, and virtual reality.

## 1.5 COMPUTER SCIENCE AS A DISCIPLINE 
With the invention of computers, a new discipline has evolved: computer science. We can divide these areas into two broad categories: systems areas and applications areas. Systems areas cover those areas that directly related to the creation of hardware and software. Applications areas cover those that are related to the use of computers.
`,
  zh: `
# 第一章：簡介

「電腦科學」這個詞彙現今的含義非常廣泛。然而，在本書中，我們將其定義為「與電腦相關的議題」。本介紹性章節首先試圖找出什麼是電腦，然後探討與電腦直接相關的其他問題。我們首先將圖靈模型視為計算的數學和哲學定義。然後，我們將展示今日的電腦如何基於馮·諾伊曼模型。本章最後簡要介紹了這個改變文化的設備——電腦的歷史。

## 學習目標
學完本章後，學生應能：
- 定義電腦的圖靈模型。
- 定義電腦的馮·諾伊曼模型。
- 描述電腦的三個組成部分：硬體、資料和軟體。
- 列出與電腦硬體相關的主題。
- 列出與資料相關的主題。
- 列出與軟體相關的主題。
- 簡述電腦的歷史。

## 1.1 圖靈模型
通用計算設備的概念最早由艾倫·圖靈於 1936 年提出。他提出所有的計算都可以由一種特殊的機器執行，現在稱為圖靈機。雖然圖靈對這種機器進行了數學描述，但他更感興趣的是計算的哲學定義，而非建造實際的機器。他將模型建立在人們進行計算時所執行的動作上。他將這些動作抽象化為一個計算機模型，這個模型確實改變了世界。

### 1.1.1 資料處理器
在討論圖靈模型之前，讓我們先將電腦定義為資料處理器。根據這個定義，電腦就像一個黑盒子，接受輸入資料，處理資料，並產生輸出資料。雖然這個模型可以定義今日電腦的功能，但它太過籠統。在這個模型中，袖珍計算機也是一台電腦（從字面上看，它確實是）。

### 1.1.2 可程式化資料處理器
圖靈模型是通用電腦的一個更好模型。此模型為特定的計算機器增加了一個額外元素：程式。程式是一組指令，告訴電腦如何處理資料。
在圖靈模型中，輸出資料取決於兩個因素的組合：輸入資料和程式。使用相同的輸入資料，如果我們改變程式，可以產生不同的輸出。同樣地，使用相同的程式，如果我們改變輸入資料，也可以產生不同的輸出。

### 1.1.3 通用圖靈機
通用圖靈機，一種只要提供適當程式就能進行任何計算的機器，是現代電腦的首次描述。可以證明，一台非常強大的電腦和一台通用圖靈機可以計算相同的東西。我們只需要向任一機器提供資料和程式——即如何進行計算的描述。事實上，通用圖靈機能夠計算任何可計算的事物。

## 1.2 馮·諾伊曼模型
基於圖靈通用機建造的電腦將資料儲存在其記憶體中。大約在 1944-1945 年，約翰·馮·諾伊曼提出，由於程式和資料在邏輯上是相同的，程式也應該儲存在電腦的記憶體中。

### 1.2.1 四個子系統
基於馮·諾伊曼模型建造的電腦將電腦硬體分為四個子系統：記憶體、算術邏輯單元、控制單元和輸入/輸出。
- **記憶體**：記憶體是儲存區域。這是程式和資料在處理過程中儲存的地方。
- **算術邏輯單元 (ALU)**：算術邏輯單元 (ALU) 是進行計算和邏輯運算的地方。
- **控制單元**：控制單元控制記憶體、ALU 和輸入/輸出子系統的操作。
- **輸入/輸出**：輸入子系統從電腦外部接受輸入資料和程式，而輸出子系統將處理結果發送到外部世界。

### 1.2.2 儲存程式概念
馮·諾伊曼模型指出程式必須儲存在記憶體中。這與早期電腦的架構完全不同，早期電腦只有資料儲存在記憶體中：它們的任務程式是透過操作一組開關或改變佈線系統來實現的。現代電腦的記憶體同時存放著程式及其對應的資料。
這意味著資料和程式都應該有相同的格式，因為它們都儲存在記憶體中。事實上，它們在記憶體中以二進位模式儲存——即 0 和 1 的序列。

### 1.2.3 指令的循序執行
在馮·諾伊曼模型中，程式由有限數量的指令組成。在這個模型中，控制單元從記憶體中取出一個指令，解碼，然後執行它。換句話說，指令是逐一執行的。程式的循序執行是基於馮·諾伊曼模型的電腦的初始要求。今日的電腦以最有效率的順序執行程式。

## 1.3 電腦組件
我們可以將電腦視為由三個組件組成：電腦硬體、資料和電腦軟體。

### 1.3.1 電腦硬體
今日的電腦硬體在馮·諾伊曼模型下有四個組件，儘管我們可以有不同類型的記憶體、不同類型的輸入/輸出子系統等等。我們將在第 5 章更詳細地討論電腦硬體。

### 1.3.2 資料
馮·諾伊曼模型清楚地將電腦定義為一台資料處理機器，它接受輸入資料，處理它，並輸出結果。資料需要被轉換為只使用兩種狀態（0 和 1）的另一種系統，才能儲存在電腦中。在第 3 章，我們將學習如何將不同類型的資料儲存為二進位模式。

### 1.3.3 電腦軟體
圖靈或馮·諾伊曼模型的主要特點是程式的概念。對那些早期電腦進行編程意味著改變佈線系統或打開/關閉一組開關。
- **程式必須被儲存**：在馮·諾伊曼模型中，程式儲存在電腦的記憶體中。
- **指令序列**：程式必須由一系列指令組成。
- **演算法**：程式設計師必須首先以逐步的方式解決問題，然後嘗試找到適當的指令（或指令系列）來實現這些步驟。這種逐步的解決方案稱為演算法。
- **語言**：電腦語言的概念源於使用符號來表示二進位模式的想法。
- **軟體工程**：結構化程式的設計與撰寫。
- **作業系統**：一個管理者，以方便程式存取電腦的組件。

## 1.4 歷史
在本節中，我們簡要回顧計算和電腦的歷史。我們將這段歷史分為三個時期。

### 1.4.1 機械機器（1930 年以前）
- **帕斯卡計算器 (Pascaline)**：在十七世紀，布萊茲·帕斯卡發明了帕斯卡計算器，一種用於加減法運算的機械計算器。
- **萊布尼茲輪 (Leibniz Wheel)**：在十七世紀晚期，德國數學家戈特弗里德·萊布尼茲發明了一種更複雜的機械計算器，可以進行乘法和除法。
- **緹花織布機 (Jacquard loom)**：第一台使用儲存和編程思想的機器，由約瑟夫·瑪麗·雅卡爾在十九世紀初發明。
- **差分機與分析機 (Difference Engine & Analytical Engine)**：1823 年，查爾斯·巴貝奇發明了差分機。後來，他發明了一台名為分析機的機器，在某種程度上與現代電腦的思想相似。它有四個組件：一個磨坊 (ALU)、一個倉庫 (記憶體)、一個操作員 (控制單元) 和輸出 (輸入/輸出)。
- **何樂禮的機器 (Hollerith's machine)**：1890 年，赫爾曼·何樂禮設計並建造了一台程式設計機器，可以自動讀取、計數和排序儲存在打孔卡上的資料。

### 1.4.2 電子電腦的誕生（1930–1950）
- **ABC (阿塔納索夫-貝瑞電腦)**：第一台以電力編碼資訊的專用電腦，由約翰·V·阿塔納索夫於 1939 年發明。
- **Mark I**：在 1930 年代，霍華德·艾肯建造了一台名為 Mark I 的巨型電腦。
- **巨像電腦 (Colossus)**：在英國，艾倫·圖靈發明了一台名為 Colossus 的電腦，旨在破解德國的恩尼格瑪密碼。
- **ENIAC**：第一台通用、完全電子的電腦是由約翰·莫奇利和 J. 普雷斯珀·埃克特製造的，名為 ENIAC (電子數值積分計算機)。
- **EDVAC & EDSAC**：第一批基於馮·諾伊曼思想的電腦於 1950 年製造。

### 1.4.3 電腦世代（1950–至今）
- **第一代（1950–1959）**：以使用真空管的商用電腦出現為特徵。
- **第二代（1959–1965）**：使用電晶體取代真空管。發明了兩種高階程式語言，FORTRAN 和 COBOL。
- **第三代（1965–1975）**：積體電路的發明。迷你電腦出現。
- **第四代（1975–1985）**：微電腦的出現。
- **第五代（1985-至今）**：見證了筆記型電腦和掌上型電腦、多媒體和虛擬實境的出現。

## 1.5 作為一門學科的電腦科學
隨著電腦的發明，一門新的學科應運而生：電腦科學。我們可以將這些領域分為兩大類：系統領域和應用領域。系統領域涵蓋那些與硬體和軟體創造直接相關的領域。應用領域涵蓋那些與電腦使用相關的領域。
`,
};
