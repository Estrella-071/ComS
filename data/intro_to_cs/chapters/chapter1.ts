
export const chapter1Content = {
  en: `
# Chapter 1: Introduction

The phrase computer science has a very broad meaning today. However, in this book, we define the phrase as ‘issues related to the computer’. This introductory chapter first tries to find out what a computer is, then investigates other issues directly related to computers. We look first at the Turing model as a mathematical and philosophical definition of computation. We then show how today’s computers are based on the von Neumann model. The chapter ends with a brief history of this culture-changing device . . . the computer.

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
The idea of a universal computational device was first described by Alan Turing in 1936. He proposed that all computation could be performed by a special kind of a machine, now called a **Turing machine**. Although Turing presented a mathematical description of such a machine, he was more interested in the philosophical definition of computation than in building the actual machine. He based the model on the actions that people perform when involved in computation. He abstracted these actions into a model for a computational machine that has really changed the world.

### 1.1.1 Data processors
Before discussing the Turing model, let us define a computer as a **data processor**. Using this definition, a computer acts as a black box that accepts input data, processes the data, and creates output data (Figure 1.1). Although this model can define the functionality of a computer today, it is too general. In this model, a pocket calculator is also a computer (which it is, in a literal sense).

**Figure 1.1 A single-purpose computing machine**
Input data -> Computer -> Output data

Another problem with this model is that it does not specify the type of processing, or whether more than one type of processing is possible. In other words, it is not clear how many types or sets of operations a machine based on this model can perform. Is it a specific-purpose machine or a general-purpose machine?

This model could represent a specific-purpose computer (or processor) that is designed to do a single job, such as controlling the temperature of a building or controlling the fuel usage in a car. However, computers, as the term is used today, are *general-purpose* machines. They can do many different types of tasks. This implies that we need to change this model into the Turing model to be able to reflect the actual computers of today.

### 1.1.2 Programmable data processors
The Turing model is a better model for a general-purpose computer. This model adds an extra element to the specific computing machine: the *program*. A **program** is a set of instructions that tells the computer what to do with data. Figure 1.2 shows the Turing model.

**Figure 1.2 A computer based on the Turing model: programmable data processor**
Input data + Program -> Computer -> Output data

In the Turing model, the **output data** depends on the combination of two factors: the **input data** and the program. With the same input data, we can generate different output if we change the program. Similarly, with the same program, we can generate different outputs if we change the input data. Finally, if the input data and the program remain the same, the output should be the same. Let us look at three cases.

**Same program, different input data**
Figure 1.3 shows the same sorting program with different input data. Although the program is the same, the outputs are different, because different input data is processed.

*   **Case 1**: Input (3, 12, 8, 22) -> Program: Sort -> Output (3, 8, 12, 22)
*   **Case 2**: Input (14, 6, 8, 12) -> Program: Sort -> Output (6, 8, 12, 14)

**Same input data, different programs**
Figure 1.4 shows the same input data with different programs. Each program makes the computer perform different operations on the input data. The first program sorts the data, the second adds the data, and the third finds the smallest number.

*   **Case 1**: Input (3, 12, 8, 22) -> Program: Sort -> Output (3, 8, 12, 22)
*   **Case 2**: Input (3, 12, 8, 22) -> Program: Add -> Output (45)
*   **Case 3**: Input (3, 12, 8, 22) -> Program: Find smallest -> Output (3)

**Same input data, same program**
We expect the same result each time if both input data and the program are the same, of course. In other words, when the same program is run with the same input data, we expect the same output.

### 1.1.3 The universal Turing machine
A *universal Turing machine*, a machine that can do any computation if the appropriate program is provided, was the first description of a modern computer. It can be proved that a very powerful computer and a universal Turing machine can compute the same thing. We need only provide the data and the program—the description of how to do the computation—to either machine. In fact, a universal Turing machine is capable of computing anything that is computable.

## 1.2 VON NEUMANN MODEL
Computers built on the Turing universal machine store data in their memory. Around 1944–1945, John von Neumann proposed that, since program and data are logically the same, programs should also be stored in the memory of a computer.

### 1.2.1 Four subsystems
Computers built on the von Neumann model divide the computer hardware into four subsystems: memory, arithmetic logic unit, control unit, and input/output (Figure 1.5).

**Memory**
Memory is the storage area. This is where programs and data are stored during processing. We discuss the reasons for storing programs and data later in the chapter.

**Arithmetic logic unit**
The **arithmetic logic unit (ALU)** is where calculation and **logical operations** take place. For a computer to act as a data processor, it must be able to do arithmetic operations on data (such as adding a list of numbers). It should also be able to do logical operations on data, as we will see in Chapter 4.

**Control unit**
The **control unit** controls the operations of the **memory**, ALU, and the input/output subsystem.

**Input / output**
The **input subsystem** accepts input data and the program from outside the computer, while the **output subsystem** sends the result of processing to the outside world. The definition of the input/output subsystem is very broad: it also includes secondary storage devices such as disk or tape that stores data and programs for processing. When a disk stores data that results from processing, it is considered an output device: when it reads data from the disk, it is considered an input device.

### 1.2.2 The stored program concept
The von Neumann model states that the program must be stored in memory. This is totally different from the architecture of early computers in which only the data was stored in memory: the programs for their task were implemented by manipulating a set of switches or by changing the wiring system.

The memory of modern computers hosts both a program and its corresponding data. This implies that both the data and programs should have the same format, because they are stored in memory. In fact, they are stored as *binary* patterns in memory—a sequence of 0s and 1s.

### 1.2.3 Sequential execution of instructions
A program in the von Neumann model is made of a finite number of **instructions**. In this model, the control unit fetches one instruction from memory, decodes it, then executes it. In other words, the instructions are executed one after another. Of course, one instruction may request the control unit to jump to some previous or following instruction, but this does not mean that the instructions are not executed sequentially. Sequential execution of a program was the initial requirement of a computer based on the von Neumann model. Today’s computers execute programs in the order that is the most efficient.

## 1.3 COMPUTER COMPONENTS
We can think of a computer as being made up of three components: computer hardware, data, and computer software.

### 1.3.1 Computer hardware
Computer hardware today has four components under the von Neumann model, although we can have different types of memory, different types of input/output subsystems, and so on. We discuss computer hardware in more detail in Chapter 5.

### 1.3.2 Data
The von Neumann model clearly defines a computer as a data processing machine that accepts the input data, processes it, and outputs the result.

**Storing data**
The von Neumann model does not define how data must be stored in a computer. If a computer is an electronic device, the best way to store data is in the form of an electrical signal, specifically its presence or absence. This implies that a computer can store data in one of two states.

Obviously, the data we use in daily life is not just in one of two states. For example, our numbering system uses digits that can take one of ten states (0 to 9). We cannot (as yet) store this type of information in a computer: it needs to be changed to another system that uses only two states (0 and 1). We also need to be able to process other types of data (text, image, audio, video). These also cannot be stored in a computer directly, but need to be changed to the appropriate form (0s and 1s).

In Chapter 3, we will learn how to store different types of data as a binary pattern, a sequence of 0s and 1s. In Chapter 4, we show how data is manipulated, as a binary pattern, inside a computer.

**Organizing data**
Although data should be stored only in one form inside a computer, a binary pattern, data outside a computer can take many forms. In addition, computers (and the notion of data processing) have created a new field of study known as *data organization*, which asks the question: can we organize our data into different entities and formats before storing them inside a computer? Today, data is not treated as a flat sequence of information. Instead, data is organized into small units, small units are organized into larger units, and so on. We will look at data from this point of view in Chapters 11–14.

### 1.3.3 Computer software
The main feature of the Turing or von Neumann models is the concept of the *program*. Although early computers did not store the program in the computer’s memory, they did use the concept of programs. *Programming* those early computers meant changing the wiring systems or turning a set of switches on or off. Programming was therefore a task done by an operator or engineer before the actual data processing began.

**Programs must be stored**
In the von Neumann model programs are stored in the computer’s memory. Not only do we need memory to hold data, but we also need memory to hold the program.

**A sequence of instructions**
Another requirement of the model is that the program must consist of a sequence of instructions. Each instruction operates on one or more data items. Thus, an instruction can change the effect of a previous instruction. For example, Figure 1.7 shows a program that inputs two numbers, adds them, and prints the result. This program consists of four individual instructions.

We might ask why a program must be composed of instructions. The answer is reusability. Today, computers do millions of tasks. If the program for each task was an independent entity without anything in common with other programs, programming would be difficult. The Turing and von Neumann models make programming easier by defining the different instructions that can be used by computers. A programmer can then combine these instructions to make any number of programs. Each program can be a different combination of different instructions.

**Algorithms**
The requirement for a program to consist of a sequence of instructions made programming possible, but it brought another dimension to using a computer. A programmer must not only learn the task performed by each instruction, but also learn how to combine these instructions to do a particular task. Looking at this issue differently, a programmer must first solve the problem in a step-by-step manner, then try to find the appropriate instruction (or series of instructions) to implement those steps. This step-by-step solution is called an **algorithm**. Algorithms play a very important role in computer science and are discussed in Chapter 8.

**Languages**
At the beginning of the computer age there was only one computer language, *machine language*. Programmers wrote instructions (using binary patterns) to solve a problem. However, as programs became larger, writing long programs using these patterns became tedious. Computer scientists came up with the idea of using symbols to represent binary patterns, just as people use symbols (words) for commands in daily life. Of course, the symbols used in daily life are different from those used in computers. So the concept of **computer languages** was born. A natural language such as English is rich and has many rules to combine words correctly: a computer language, on the other hand, has a more limited number of symbols and also a limited number of words. We will study computer languages in Chapter 9.

**Software engineering**
Something that was not defined in the von Neumann model is **software engineering**, which is the design and writing of **structured programs**. Today it is not acceptable just to write a program that does a task: the program must follow strict rules and principles. We discuss these principles, collectively known as *software engineering*, in Chapter 10.

**Operating systems**
During the evolution of computers, scientists became aware that there was a series of instructions common to all programs. For example, instructions to tell a computer where to receive data and where to send data are needed by almost all programs. It is more efficient to write these instructions only once for the use of all programs. Thus the concept of the **operating system** emerged. An operating system originally worked as a manager to facilitate access to the computer’s components by a program, although today operating systems do much more. We will learn about them in Chapter 7.

## 1.4 HISTORY
In this section we briefly review the history of computing and computers. We divide this history into three periods.

### 1.4.1 Mechanical machines (before 1930)
During this period, several computing machines were invented that bear little resemblance to the modern concept of a computer.
*   In the seventeenth century, Blaise Pascal, a French mathematician and philosopher, invented Pascaline, a mechanical calculator for addition and subtraction operations. In the twentieth century, when Niklaus Wirth invented a structured programming language, he called it Pascal to honor the inventor of the first mechanical calculator.
*   In the late seventeenth century, German mathematician Gottfried Leibniz invented a more sophisticated mechanical calculator that could do multiplication and division as well as addition and subtraction. It was called the Leibniz Wheel.
*   The first machine that used the idea of storage and programming was the Jacquard loom, invented by Joseph-Marie Jacquard at the beginning of the nineteenth century. The loom used punched cards (like a stored program) to control the raising of the warp threads in the manufacture of textiles.
*   In 1823, Charles Babbage invented the Difference Engine, which could do more than simple arithmetic operations—it could solve polynomial equations, too. Later, he invented a machine called the Analytical Engine that, to some extent, parallels the idea of modern computers. It had four components: a mill (corresponding to a modern ALU), a store (memory), an operator (control unit), and output (input/output).
*   In 1890, Herman Hollerith, working at the US Census Bureau, designed and built a programmer machine that could automatically read, tally, and sort data stored on punched cards.

### 1.4.2 The birth of electronic computers (1930–1950)
Between 1930 and 1950, several computers were invented by scientists who could be considered the pioneers of the electronic computer industry.

**Early electronic computers**
The early computers of this period did not store the program in memory—all were programmed externally. Five computers were prominent during these years:
*   The first special-purpose computer that encoded information electrically was invented by John V. Atanasoff and his assistant Clifford Berry in 1939. It was called the ABC (Atanasoff Berry Computer) and was specifically designed to solve a system of linear equations.
*   At the same time, a German mathematician called Konrad Zuse designed a general-purpose machine called Z1.
*   In the 1930s, the US Navy and IBM sponsored a project at Harvard University under the direction of Howard Aiken to build a huge computer called Mark I. This computer used both electrical and mechanical components.
*   In England, Alan Turing invented a computer called Colossus that was designed to break the German Enigma code.
*   The first general-purpose, totally electronic computer was made by John Mauchly and J. Presper Eckert and was called ENIAC (Electronic Numerical Integrator and Calculator). It was completed in 1946. It used 18000 vacuum tubes, was 100 feet long by 10 feet high, and weighed 30 tons.

**Computers based on the von Neumann model**
The preceding five computers used memory only for storing data, and were programmed externally using wires or switches. John von Neumann proposed that the program and the data should be stored in memory. That way, every time we use a computer to do a new task, we need only change the program instead of rewiring the machine or turning hundreds of switches on and off.
The first computer based on von Neumann’s ideas was made in 1950 at the University of Pennsylvania and was called EDVAC. At the same time, a similar computer called EDSAC was built by Maurice Wilkes at Cambridge University in England.

### 1.4.3 Computer generations (1950–present)
Computers built after 1950 more or less follow the von Neumann model. They have become faster, smaller, and cheaper, but the principle is almost the same. Historians divide this period into generations, with each generation witnessing some major change in hardware or software (but not in the model).

**First generation**
The first generation (roughly 1950–1959) is characterized by the emergence of commercial computers. During this time, computers were used only by professionals. They were locked in rooms with access limited only to the operator or computer specialist. Computers were bulky and used vacuum tubes as electronic switches. At this time, computers were affordable only by big organizations.

**Second generation**
Second-generation computers (roughly 1959–1965) used transistors instead of vacuum tubes. This reduced the size of computers, as well as their cost, and made them affordable to small and medium-size corporations. Two high-level programming languages, FORTRAN and COBOL (see Chapter 9), were invented and made programming easier. These two languages separated the programming task from the computer operation task. A civil engineer, for example could write a FORTRAN program to solve a problem without being involved in the electronic details of computer architecture.

**Third generation**
The invention of the **integrated circuit** (transistors, wiring, and other components on a single chip) reduced the cost and size of computers even further. *Minicomputers* appeared on the market. Canned programs, popularly known as software packages, became available. A small corporation could buy a package, for example for accounting, instead of writing its own program. A new industry, the software industry, was born. This generation lasted roughly from 1965 to 1975.

**Fourth generation**
The fourth generation (approximately 1975–1985) saw the appearance of **microcomputers**. The first desktop calculator, the Altair 8800, became available in 1975. Advances in the electronics industry allowed whole computer subsystems to fit on a single circuit board. This generation also saw the emergence of computer networks (see Chapter 6).

**Fifth generation**
This open-ended generation started in 1985. It has witnessed the appearance of laptop and palmtop computers, improvements in secondary storage media (CD-ROM, DVD, and so on), the use of multimedia, and the phenomenon of virtual reality.

## 1.5 COMPUTER SCIENCE AS A DISCIPLINE
With the invention of computers, a new discipline has evolved: *computer science*. Like any other discipline, computer science has now divided into several areas. We can divide these areas into two broad categories: *systems areas* and *applications areas*. Systems areas cover those areas that directly related to the creation of hardware and software, such as *computer architecture*, *computer networking*, *security issues*, *operating systems*, *algorithms*, *programming languages*, and *software engineering*. Applications areas cover those that are related to the *use* of computers, such as *databases* and *artificial intelligence*. This book is a breadth-first approach to all of these areas. After reading the book, the reader should have enough information to select the desired area of specialty.

## 1.6 OUTLINE OF THE COURSE
After this introductory chapter, the book is divided into five parts.

### 1.6.1 Part I: Data representation and operation
This part includes Chapters 2, 3, and 4. Chapter 2 discusses number systems, how a quantity can be represented using symbols. Chapter 3 discusses how different data is stored inside the computer. Chapter 4 discusses some primitive operations on *bits*.

### 1.6.2 Part II: Computer hardware
This part includes Chapters 5 and 6. Chapter 5 gives a general idea of computer hardware, discussing different computer organizations. Chapter 6 shows how individual computers are connected to make computer networks, and *internetworks* (internets). In particular, this chapter explores some subjects related to the Internet and its applications.

### 1.6.3 Part III: Computer software
This part includes Chapters 7, 8, 9, and 10. Chapter 7 discusses operating systems, the system software that controls access to the hardware by users—either human or application programs. Chapter 8 shows how problem solving is reduced to writing an algorithm for the problem. Chapter 9 takes a journey through the list of contemporary programming languages. Finally, Chapter 10 is a review of software engineering, the engineering approach to the development of software.

### 1.6.4 Part IV: Data organization and abstraction
This part complements Part I. In computer science, *atomic* data is collected into records, files, and databases. Data *abstraction* allows the programmer to create abstract notions about data. Part IV includes Chapters 11, 12, 13, and 14. Chapter 11 discusses data structure, collecting data of the same or different type under one category. Chapter 12 discusses abstract data types. Chapter 13 shows how different file structures can be used for different purposes. Finally, Chapter 14 discusses databases.

### 1.6.5 Part V: Advanced topics
Part V gives an overview of advanced topics, topics that students of computer science will encounter later in their education. This part covers Chapters 15, 16, 17, and 18. Chapter 15 discusses data compression, which is prevalent in today’s data communications. Chapter 16 explores some issues to do with security, which is becoming more and more important when we communicate over insecure channels. Chapter 17 discusses the theory of computation: what can and cannot be computed. Finally Chapter 18 gives some idea of artificial intelligence, a topic wih day-to-day challenges in computer science.

### 1.6.6 Part VI: Social media and social Issues
Part VI briefly discusses social media and social issues, two topics that students of computer science may be interested to explore.

## 1.7 END-CHAPTER MATERIALS
### 1.7.1 Recommended reading
For more details about the subjects discussed in this chapter, the following books are recommended:
*   Schneider, G. M. and Gersting, J. L. *Invitation to Computer Science*, Boston, MA: Course Technology, 2004
*   Dale, N. and Lewis, J. *Computer Science Illuminated*, Sudbury, MA: Jones and Bartlett, 2004
*   Patt, Y. and Patel, S. *Introduction to Computing Systems*, New York: McGraw-Hill, 2004

### 1.7.2 Key terms
*   algorithm
*   arithmetic logic unit (ALU)
*   computer languages
*   control unit
*   data processor
*   input data
*   input/output subsystem
*   instruction
*   integrated circuit
*   logical operation
*   memory
*   microcomputer
*   operating system
*   output data
*   program
*   structured programs
*   software engineering
*   Turing machine
*   Turing model
*   von Neumann model

### 1.7.3 Summary
*   The idea of a universal computational device was first put forward by Alan Turing in 1936. He proposed that all computations can be performed by a special kind of a machine, now called a Turing machine.
*   The von Neumann model defines a computer as four subsystems: memory, arithmetic logic unit, control unit, and input/output. The von Neumann model states that the program must be stored in memory.
*   We can think of a computer as made up of three components: computer hardware, data, and computer software.
*   The history of computing and computers can be divided into three periods: the period of mechanical machines (before 1930), the period of electronic computers (1930–1950), and the period that includes the five modern computer generations.
*   With the invention of computers a new discipline has evolved, *computer science*, which is now divided into several areas.
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
通用計算設備的概念最早由艾倫·圖靈於 1936 年提出。他提出所有的計算都可以由一種特殊的機器執行，現在稱為**圖靈機**。雖然圖靈對這種機器進行了數學描述，但他更感興趣的是計算的哲學定義，而非建造實際的機器。他將模型建立在人們進行計算時所執行的動作上。他將這些動作抽象化為一個計算機模型，這個模型確實改變了世界。

### 1.1.1 資料處理器
在討論圖靈模型之前，讓我們先將電腦定義為**資料處理器**。根據這個定義，電腦就像一個黑盒子，接受輸入資料，處理資料，並產生輸出資料（圖 1.1）。雖然這個模型可以定義今日電腦的功能，但它太過籠統。在這個模型中，袖珍計算機也是一台電腦（從字面上看，它確實是）。

**圖 1.1 單一用途的計算機器**
輸入資料 -> 電腦 -> 輸出資料

這個模型還有另一個問題，就是它沒有指定處理的類型，或者是否可以進行多種處理。換句話說，目前還不清楚基於這個模型的機器可以執行多少種類型或集合的操作。它是專用機器還是通用機器？

這個模型可以代表一台專用電腦（或處理器），其設計目的是執行單一工作，例如控制建築物的溫度或控制汽車的燃料使用。然而，就現今使用的術語而言，電腦是*通用*機器。它們可以執行許多不同類型的任務。這意味著我們需要將此模型更改為圖靈模型，以便能夠反映今日實際的電腦。

### 1.1.2 可程式化資料處理器
圖靈模型是通用電腦的一個更好模型。此模型為特定的計算機器增加了一個額外元素：*程式*。**程式**是一組指令，告訴電腦如何處理資料。圖 1.2 顯示了圖靈模型。

**圖 1.2 基於圖靈模型的電腦：可程式化資料處理器**
輸入資料 + 程式 -> 電腦 -> 輸出資料

在圖靈模型中，**輸出資料**取決於兩個因素的組合：**輸入資料**和程式。使用相同的輸入資料，如果我們改變程式，可以產生不同的輸出。同樣地，使用相同的程式，如果我們改變輸入資料，也可以產生不同的輸出。最後，如果輸入資料和程式保持不變，則輸出應該相同。讓我們來看三種情況。

**相同的程式，不同的輸入資料**
圖 1.3 顯示了相同的排序程式使用不同的輸入資料。雖然程式相同，但輸出不同，因為處理的是不同的輸入資料。

*   **情況 1**: 輸入 (3, 12, 8, 22) -> 程式: 排序 -> 輸出 (3, 8, 12, 22)
*   **情況 2**: 輸入 (14, 6, 8, 12) -> 程式: 排序 -> 輸出 (6, 8, 12, 14)

**相同的輸入資料，不同的程式**
圖 1.4 顯示了相同的輸入資料使用不同的程式。每個程式使電腦對輸入資料執行不同的操作。第一個程式對資料進行排序，第二個將資料相加，第三個找出最小的數字。

*   **情況 1**: 輸入 (3, 12, 8, 22) -> 程式: 排序 -> 輸出 (3, 8, 12, 22)
*   **情況 2**: 輸入 (3, 12, 8, 22) -> 程式: 相加 -> 輸出 (45)
*   **情況 3**: 輸入 (3, 12, 8, 22) -> 程式: 找最小值 -> 輸出 (3)

**相同的輸入資料，相同的程式**
當然，如果輸入資料和程式都相同，我們期望每次都能得到相同的結果。換句話說，當使用相同的輸入資料執行相同的程式時，我們期望得到相同的輸出。

### 1.1.3 通用圖靈機
*通用圖靈機*，一種只要提供適當程式就能進行任何計算的機器，是現代電腦的首次描述。可以證明，一台非常強大的電腦和一台通用圖靈機可以計算相同的東西。我們只需要向任一機器提供資料和程式——即如何進行計算的描述。事實上，通用圖靈機能夠計算任何可計算的事物。

## 1.2 馮·諾伊曼模型
基於圖靈通用機建造的電腦將資料儲存在其記憶體中。大約在 1944-1945 年，約翰·馮·諾伊曼提出，由於程式和資料在邏輯上是相同的，程式也應該儲存在電腦的記憶體中。

### 1.2.1 四個子系統
基於馮·諾伊曼模型建造的電腦將電腦硬體分為四個子系統：記憶體、算術邏輯單元、控制單元和輸入/輸出（圖 1.5）。

**記憶體**
記憶體是儲存區域。這是程式和資料在處理過程中儲存的地方。我們將在本章稍後討論儲存程式和資料的原因。

**算術邏輯單元**
**算術邏輯單元 (ALU)** 是進行計算和**邏輯運算**的地方。要使電腦充當資料處理器，它必須能夠對資料執行算術運算（例如將一列數字相加）。它還應該能夠對資料執行邏輯運算，我們將在第 4 章中看到。

**控制單元**
**控制單元**控制**記憶體**、ALU 和輸入/輸出子系統的操作。

**輸入/輸出**
**輸入子系統**從電腦外部接受輸入資料和程式，而**輸出子系統**將處理結果發送到外部世界。輸入/輸出子系統的定義非常廣泛：它還包括輔助儲存設備，如磁碟或磁帶，用於儲存處理用的資料和程式。當磁碟儲存處理產生的資料時，它被視為輸出設備：當它從磁碟讀取資料時，它被視為輸入設備。

### 1.2.2 儲存程式概念
馮·諾伊曼模型指出程式必須儲存在記憶體中。這與早期電腦的架構完全不同，早期電腦只有資料儲存在記憶體中：它們的任務程式是透過操作一組開關或改變佈線系統來實現的。

現代電腦的記憶體同時存放著程式及其對應的資料。這意味著資料和程式都應該有相同的格式，因為它們都儲存在記憶體中。事實上，它們在記憶體中以*二進位*模式儲存——即 0 和 1 的序列。

### 1.2.3 指令的循序執行
在馮·諾伊曼模型中，程式由有限數量的**指令**組成。在這個模型中，控制單元從記憶體中取出一個指令，解碼，然後執行它。換句話說，指令是逐一執行的。當然，一個指令可能會請求控制單元跳轉到某個先前或之後的指令，但這並不意味著指令不是按順序執行的。程式的循序執行是基於馮·諾伊曼模型的電腦的初始要求。今日的電腦以最有效率的順序執行程式。

## 1.3 電腦組件
我們可以將電腦視為由三個組件組成：電腦硬體、資料和電腦軟體。

### 1.3.1 電腦硬體
今日的電腦硬體在馮·諾伊曼模型下有四個組件，儘管我們可以有不同類型的記憶體、不同類型的輸入/輸出子系統等等。我們將在第 5 章更詳細地討論電腦硬體。

### 1.3.2 資料
馮·諾伊曼模型清楚地將電腦定義為一台資料處理機器，它接受輸入資料，處理它，並輸出結果。

**儲存資料**
馮·諾伊曼模型並沒有定義資料必須如何在電腦中儲存。如果電腦是一個電子設備，最好的資料儲存方式是以電信號的形式，具體來說是它的存在或不存在。這意味著電腦可以用兩種狀態之一來儲存資料。

顯然，我們在日常生活中使用的資料不僅僅是兩種狀態。例如，我們的數字系統使用可以採用十種狀態之一（0 到 9）的數字。我們（目前）無法將這類資訊直接儲存在電腦中：它需要轉換為另一個只使用兩種狀態（0 和 1）的系統。我們還需要能夠處理其他類型的資料（文字、圖像、音訊、視訊）。這些也不能直接儲存在電腦中，而需要轉換為適當的形式（0 和 1）。

在第 3 章，我們將學習如何將不同類型的資料儲存為二進位模式，即 0 和 1 的序列。在第 4 章，我們將展示如何在電腦內部操作二進位模式的資料。

**組織資料**
雖然資料在電腦內部應該只以一種形式儲存，即二進位模式，但在電腦外部資料可以有多種形式。此外，電腦（以及資料處理的概念）創造了一個新的研究領域，稱為*資料組織*，它提出的問題是：我們能否在將資料儲存到電腦內部之前，將其組織成不同的實體和格式？如今，資料不再被視為扁平的資訊序列。相反，資料被組織成小單元，小單元被組織成更大的單元，依此類推。我們將在第 11-14 章從這個角度來看資料。

### 1.3.3 電腦軟體
圖靈或馮·諾伊曼模型的主要特點是*程式*的概念。雖然早期電腦沒有將程式儲存在電腦的記憶體中，但它們確實使用了程式的概念。對那些早期電腦進行*編程*意味著改變佈線系統或打開/關閉一組開關。因此，編程是在實際資料處理開始之前由操作員或工程師完成的任務。

**程式必須被儲存**
在馮·諾伊曼模型中，程式儲存在電腦的記憶體中。我們不僅需要記憶體來保存資料，還需要記憶體來保存程式。

**指令序列**
該模型的另一個要求是程式必須由一系列指令組成。每個指令對一個或多個資料項目進行操作。因此，一個指令可以改變前一個指令的效果。例如，圖 1.7 顯示了一個輸入兩個數字、將它們相加並印出結果的程式。這個程式由四個單獨的指令組成。

我們可能會問為什麼程式必須由指令組成。答案是可重用性。如今，電腦執行數百萬項任務。如果每個任務的程式都是一個獨立的實體，與其他程式沒有任何共同之處，那麼編程將會很困難。圖靈和馮·諾伊曼模型透過定義電腦可以使用的不同指令，使編程變得更容易。程式設計師隨後可以組合這些指令來製作任意數量的程式。每個程式都可以是不同指令的不同組合。

**演算法**
程式必須由一系列指令組成的要求使編程成為可能，但它為使用電腦帶來了另一個維度。程式設計師不僅必須學習每個指令執行的任務，還必須學習如何組合這些指令來完成特定任務。換個角度看，程式設計師必須首先以逐步的方式解決問題，然後嘗試找到適當的指令（或指令系列）來實現這些步驟。這種逐步的解決方案稱為**演算法**。演算法在電腦科學中扮演著非常重要的角色，將在第 8 章中討論。

**語言**
在電腦時代的初期，只有一種電腦語言，即*機器語言*。程式設計師編寫指令（使用二進位模式）來解決問題。然而，隨著程式變得越來越大，使用這些模式編寫長程式變得乏味。電腦科學家想出了使用符號來表示二進位模式的想法，就像人們在日常生活中使用符號（單詞）來表示命令一樣。當然，日常生活中使用的符號與電腦中使用的符號不同。於是**電腦語言**的概念誕生了。像英語這樣的自然語言很豐富，有許多規則來正確組合單詞：另一方面，電腦語言的符號數量較有限，單詞數量也有限。我們將在第 9 章學習電腦語言。

**軟體工程**
馮·諾伊曼模型中沒有定義的是**軟體工程**，即**結構化程式**的設計與撰寫。如今，僅僅編寫一個執行任務的程式是不可接受的：程式必須遵循嚴格的規則和原則。我們將在第 10 章討論這些統稱為*軟體工程*的原則。

**作業系統**
在電腦演進的過程中，科學家們意識到有一系列指令是所有程式通用的。例如，幾乎所有程式都需要告訴電腦從哪裡接收資料以及將資料發送到哪裡的指令。只編寫這些指令一次供所有程式使用會更有效率。於是**作業系統**的概念應運而生。作業系統最初是作為一個管理者，以方便程式存取電腦的組件，儘管今日的作業系統做的更多。我們將在第 7 章學習它們。

## 1.4 歷史
在本節中，我們簡要回顧計算和電腦的歷史。我們將這段歷史分為三個時期。

### 1.4.1 機械機器（1930 年以前）
在此期間，發明了幾種計算機器，它們與現代電腦的概念幾乎沒有相似之處。
*   在十七世紀，法國數學家和哲學家布萊茲·帕斯卡發明了 Pascaline（帕斯卡計算器），一種用於加減法運算的機械計算器。在二十世紀，當 Niklaus Wirth 發明一種結構化程式語言時，他將其命名為 Pascal，以紀念第一台機械計算器的發明者。
*   在十七世紀晚期，德國數學家戈特弗里德·萊布尼茲發明了一種更複雜的機械計算器，可以進行乘法和除法以及加法和減法。它被稱為萊布尼茲輪 (Leibniz Wheel)。
*   第一台使用儲存和編程思想的機器是緹花織布機 (Jacquard loom)，由約瑟夫·瑪麗·雅卡爾在十九世紀初發明。織布機使用打孔卡（就像儲存的程式）來控制紡織品製造中經線的升降。
*   1823 年，查爾斯·巴貝奇發明了差分機 (Difference Engine)，它可以做的不僅僅是簡單的算術運算——它還可以解多項式方程式。後來，他發明了一台名為分析機 (Analytical Engine) 的機器，在某種程度上與現代電腦的思想相似。它有四個組件：一個磨坊 (相當於現代 ALU)、一個倉庫 (記憶體)、一個操作員 (控制單元) 和輸出 (輸入/輸出)。
*   1890 年，在美國人口普查局工作的赫爾曼·何樂禮設計並建造了一台程式設計機器，可以自動讀取、計數和排序儲存在打孔卡上的資料。

### 1.4.2 電子電腦的誕生（1930–1950）
在 1930 年至 1950 年間，科學家們發明了幾台電腦，這些科學家可以被視為電子電腦產業的先驅。

**早期電子電腦**
這一時期的早期電腦沒有將程式儲存在記憶體中——全部都是外部編程的。這幾年有五台電腦表現突出：
*   第一台以電力編碼資訊的專用電腦是由約翰·V·阿塔納索夫和他的助手克利福德·貝里於 1939 年發明的。它被稱為 ABC (阿塔納索夫-貝瑞電腦)，專門設計用於解線性方程組。
*   與此同時，德國數學家 Konrad Zuse 設計了一台名為 Z1 的通用機器。
*   在 1930 年代，美國海軍和 IBM 資助了哈佛大學的一個專案，由霍華德·艾肯指導，建造了一台名為 Mark I 的巨型電腦。這台電腦同時使用了電子和機械組件。
*   在英國，艾倫·圖靈發明了一台名為 Colossus (巨像) 的電腦，旨在破解德國的恩尼格瑪密碼。
*   第一台通用、完全電子的電腦是由約翰·莫奇利和 J. 普雷斯珀·埃克特製造的，名為 ENIAC (電子數值積分計算機)。它於 1946 年完成。它使用了 18000 個真空管，長 100 英尺，高 10 英尺，重 30 噸。

**基於馮·諾伊曼模型的電腦**
上述五台電腦僅使用記憶體來儲存資料，並使用電線或開關進行外部編程。約翰·馮·諾伊曼提出程式和資料應該儲存在記憶體中。這樣，每次我們使用電腦執行新任務時，我們只需要更改程式，而不是重新佈線機器或打開和關閉數百個開關。
第一台基於馮·諾伊曼思想的電腦於 1950 年在賓夕法尼亞大學製造，名為 EDVAC。與此同時，劍橋大學的 Maurice Wilkes 在英國建造了一台類似的電腦，名為 EDSAC。

### 1.4.3 電腦世代（1950–至今）
1950 年以後建造的電腦或多或少都遵循馮·諾伊曼模型。它們變得更快、更小、更便宜，但原理幾乎相同。歷史學家將這一時期分為幾個世代，每個世代都見證了硬體或軟體的一些重大變化（但模型沒有變）。

**第一代**
第一代（大約 1950–1959）的特徵是商用電腦的出現。在此期間，電腦僅由專業人員使用。它們被鎖在房間裡，只有操作員或電腦專家才能進入。電腦體積龐大，使用真空管作為電子開關。當時，只有大型組織才負擔得起電腦。

**第二代**
第二代電腦（大約 1959–1965）使用電晶體取代真空管。這減小了電腦的尺寸以及成本，使中小型企業也能負擔得起。發明了兩種高階程式語言，FORTRAN 和 COBOL（參見第 9 章），使編程變得更容易。這兩種語言將編程任務與電腦操作任務分開。例如，土木工程師可以編寫 FORTRAN 程式來解決問題，而無需涉及電腦架構的電子細節。

**第三代**
**積體電路**（單一晶片上的電晶體、佈線和其他組件）的發明進一步降低了電腦的成本和尺寸。*迷你電腦*出現在市場上。罐頭程式，通稱為軟體套件，變得可用。一家小公司可以購買一個套件，例如用於會計，而不是編寫自己的程式。一個新的產業，軟體產業，誕生了。這一代大約持續從 1965 年到 1975 年。

**第四代**
第四代（大約 1975–1985）見證了**微電腦**的出現。第一台桌上型計算機 Altair 8800 於 1975 年問世。電子工業的進步使得整個電腦子系統可以安裝在單一電路板上。這一代也見證了電腦網路的出現（參見第 6 章）。

**第五代**
這個開放式的世代始於 1985 年。它見證了筆記型電腦和掌上型電腦的出現、輔助儲存媒體（CD-ROM、DVD 等）的改進、多媒體的使用以及虛擬實境現象。

## 1.5 作為一門學科的電腦科學
隨著電腦的發明，一門新的學科應運而生：*電腦科學*。像任何其他學科一樣，電腦科學現在已分為幾個領域。我們可以將這些領域分為兩大類：*系統領域*和*應用領域*。系統領域涵蓋那些與硬體和軟體創造直接相關的領域，例如*電腦架構*、*電腦網路*、*安全性議題*、*作業系統*、*演算法*、*程式語言*和*軟體工程*。應用領域涵蓋那些與電腦*使用*相關的領域，例如*資料庫*和*人工智慧*。本書是對所有這些領域的廣度優先探討。讀完本書後，讀者應該有足夠的資訊來選擇所需的專業領域。

## 1.6 課程大綱
在介紹性章節之後，本書分為五個部分。

### 1.6.1 第一部分：資料表示與運算
這部分包括第 2、3 和 4 章。第 2 章討論數字系統，即如何使用符號表示數量。第 3 章討論如何在電腦內部儲存不同的資料。第 4 章討論對*位元*的一些基本運算。

### 1.6.2 第二部分：電腦硬體
這部分包括第 5 和 6 章。第 5 章給出了電腦硬體的一般概念，討論了不同的電腦組織。第 6 章展示了各個電腦如何連接成電腦網路和*互連網* (internets)。特別是，本章探討了一些與網際網路及其應用相關的主題。

### 1.6.3 第三部分：電腦軟體
這部分包括第 7、8、9 和 10 章。第 7 章討論作業系統，即控制使用者（人類或應用程式）存取硬體的系統軟體。第 8 章展示了如何將解決問題簡化為為問題編寫演算法。第 9 章帶領讀者遊歷當代程式語言列表。最後，第 10 章回顧了軟體工程，即軟體開發的工程方法。

### 1.6.4 第四部分：資料組織與抽象
這部分補充了第一部分。在電腦科學中，*原子*資料被收集成記錄、檔案和資料庫。資料*抽象*允許程式設計師創建關於資料的抽象概念。第四部分包括第 11、12、13 和 14 章。第 11 章討論資料結構，將相同或不同類型的資料收集在一個類別下。第 12 章討論抽象資料型別。第 13 章展示了如何將不同的檔案結構用於不同的目的。最後，第 14 章討論資料庫。

### 1.6.5 第五部分：進階主題
第五部分概述了進階主題，即電腦科學學生在以後的教育中會遇到的主題。這部分涵蓋第 15、16、17 和 18 章。第 15 章討論資料壓縮，這在當今的資料通訊中很普遍。第 16 章探討了一些與安全性相關的問題，當我們透過不安全的通道進行通訊時，安全性變得越來越重要。第 17 章討論計算理論：什麼可以計算，什麼不能計算。最後第 18 章給出了一些關於人工智慧的概念，這是電腦科學中日益受到挑戰的主題。

### 1.6.6 第六部分：社群媒體與社會議題
第六部分簡要討論社群媒體和社會議題，這兩個主題是電腦科學學生可能有興趣探索的。

## 1.7 章末材料
### 1.7.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
*   Schneider, G. M. and Gersting, J. L. *Invitation to Computer Science*, Boston, MA: Course Technology, 2004
*   Dale, N. and Lewis, J. *Computer Science Illuminated*, Sudbury, MA: Jones and Bartlett, 2004
*   Patt, Y. and Patel, S. *Introduction to Computing Systems*, New York: McGraw-Hill, 2004

### 1.7.2 關鍵詞
*   演算法 (algorithm)
*   算術邏輯單元 (ALU)
*   電腦語言 (computer languages)
*   控制單元 (control unit)
*   資料處理器 (data processor)
*   輸入資料 (input data)
*   輸入/輸出子系統 (input/output subsystem)
*   指令 (instruction)
*   積體電路 (integrated circuit)
*   邏輯運算 (logical operation)
*   記憶體 (memory)
*   微電腦 (microcomputer)
*   作業系統 (operating system)
*   輸出資料 (output data)
*   程式 (program)
*   結構化程式 (structured programs)
*   軟體工程 (software engineering)
*   圖靈機 (Turing machine)
*   圖靈模型 (Turing model)
*   馮·諾伊曼模型 (von Neumann model)

### 1.7.3 摘要
*   通用計算設備的想法最早由艾倫·圖靈於 1936 年提出。他提出所有的計算都可以由一種特殊的機器執行，現在稱為圖靈機。
*   馮·諾伊曼模型將電腦定義為四個子系統：記憶體、算術邏輯單元、控制單元和輸入/輸出。馮·諾伊曼模型指出程式必須儲存在記憶體中。
*   我們可以將電腦視為由三個組件組成：電腦硬體、資料和電腦軟體。
*   計算和電腦的歷史可以分為三個時期：機械機器時期（1930 年以前）、電子電腦時期（1930–1950），以及包括五個現代電腦世代的時期。
*   隨著電腦的發明，一門新的學科應運而生，即*電腦科學*，它現在分為幾個領域。
`,
};
