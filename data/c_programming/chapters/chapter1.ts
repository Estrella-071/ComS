export const chapter1Content = {
  en: `
# 1. Introduction to Computers, the Internet and the Web

## 1.1 Introduction
Welcome to C and C++! C is a concise yet powerful computer programming language that’s appropriate for technically oriented people with little or no programming experience and for experienced programmers to use in building substantial software systems. C How to Program, Eighth Edition, is an effective learning tool for each of these audiences.

The core of the book emphasizes software engineering through the proven methodologies of structured programming in C and object-oriented programming in C++. The book presents hundreds of complete working programs and shows the outputs produced when those programs are run on a computer. We call this the “live-code approach.” All of these example programs may be downloaded from our website www.deitel.com/books/chtp8/.

Most people are familiar with the exciting tasks that computers perform. Using this textbook, you’ll learn how to command computers to perform those tasks. It’s software (i.e., the instructions you write to command computers to perform actions and make decisions) that controls computers (often referred to as hardware).

## 1.2 Hardware and Software
Computers can perform calculations and make logical decisions phenomenally faster than human beings can. Many of today’s personal computers can perform billions of calculations in one second—more than a human can perform in a lifetime. Supercomputers are already performing thousands of trillions (quadrillions) of instructions per second! China’s National University of Defense Technology’s Tianhe-2 supercomputer can perform over 33 quadrillion calculations per second (33.86 petaflops)! To put that in perspective, the Tianhe-2 supercomputer can perform in one second about 3 million calculations for every person on the planet! And supercomputing “upper limits” are growing quickly.

Computers process data under the control of sequences of instructions called computer programs. These software programs guide the computer through ordered actions specified by people called computer programmers.

A computer consists of various devices referred to as hardware (e.g., the keyboard, screen, mouse, hard disks, memory, DVD drives and processing units). Computing costs are dropping dramatically, owing to rapid developments in hardware and software technologies. Computers that might have filled large rooms and cost millions of dollars decades ago are now inscribed on silicon chips smaller than a fingernail, costing perhaps a few dollars each. Ironically, silicon is one of the most abundant materials on Earth—it’s an ingredient in common sand. Silicon-chip technology has made computing so economical that computers have become a commodity.

### 1.2.1 Moore's Law
Every year, you probably expect to pay at least a little more for most products and services. The opposite has been the case in the computer and communications fields, especially with regard to the hardware supporting these technologies. For many decades, hardware costs have fallen rapidly.

Every year or two, the capacities of computers have approximately doubled inexpensively. This remarkable trend often is called Moore’s Law, named for the person who identified it in the 1960s, Gordon Moore, co-founder of Intel—the leading manufacturer of the processors in today’s computers and embedded systems. Moore’s Law and related observations apply especially to the amount of memory that computers have for programs, the amount of secondary storage (such as disk storage) they have to hold programs and data over longer periods of time, and their processor speeds—the speeds at which they execute their programs (i.e., do their work).

Similar growth has occurred in the communications field—costs have plummeted as enormous demand for communications bandwidth (i.e., information-carrying capacity) has attracted intense competition. We know of no other fields in which technology improves so quickly and costs fall so rapidly. Such phenomenal improvement is truly fostering the Information Revolution.

### 1.2.2 Computer Organization
Regardless of differences in physical appearance, computers can be envisioned as divided into various logical units or sections.

*   **Input unit**: This “receiving” section obtains information (data and computer programs) from input devices and places it at the disposal of the other units for processing.
*   **Output unit**: This “shipping” section takes information the computer has processed and places it on various output devices to make it available for use outside the computer.
*   **Memory unit**: This rapid-access, relatively low-capacity “warehouse” section retains information that has been entered through the input unit, making it immediately available for processing when needed.
*   **Arithmetic and logic unit (ALU)**: This “manufacturing” section performs calculations, such as addition, subtraction, multiplication and division.
*   **Central processing unit (CPU)**: This “administrative” section coordinates and supervises the operation of the other sections.
*   **Secondary storage unit**: This is the long-term, high-capacity “warehousing” section.

## 1.3 Data Hierarchy
Data items processed by computers form a data hierarchy that becomes larger and more complex in structure as we progress from the simplest data items (called “bits”) to richer ones, such as characters and fields. This includes bits, characters, fields, records, files, databases, and big data.

## 1.4 Machine Languages, Assembly Languages and High-Level Languages
Programmers write instructions in various programming languages, some directly understandable by computers and others requiring intermediate translation steps.
1.  **Machine languages**
2.  **Assembly languages**
3.  **High-level languages**

## 1.5 The C Programming Language
C evolved from two previous languages, BCPL and B. BCPL was developed in 1967 by Martin Richards as a language for writing operating systems and compilers. Ken Thompson modeled many features in his B language after their counterparts in BCPL, and in 1970 he used B to create early versions of the UNIX operating system at Bell Laboratories.

The C language was evolved from B by Dennis Ritchie at Bell Laboratories and was originally implemented in 1972. C initially became widely known as the development language of the UNIX operating system. Many of today’s leading operating systems are written in C and/or C++. C is mostly hardware independent—with careful design, it’s possible to write C programs that are portable to most computers.

## 1.6 C Standard Library
As you’ll learn in Chapter 5, C programs consist of pieces called functions. You can program all the functions that you need to form a C program, but most C programmers take advantage of the rich collection of existing functions called the C Standard Library.

## 1.7 C++ and Other C-Based Languages
C++ was developed by Bjarne Stroustrup at Bell Laboratories. It has its roots in C, providing a number of features that “spruce up” the C language. More important, it provides capabilities for object-oriented programming. Other popular C-based languages include Objective-C, Java, C#, PHP, Python, JavaScript, and Swift.

## 1.8 Object Technology
This section is intended for readers who will be studying C++ in the later part of this book. Building software quickly, correctly and economically remains an elusive goal at a time when demands for new and more powerful software are soaring. Objects, or more precisely the classes objects come from, are essentially reusable software components. Key concepts include:

*   Objects and Classes
*   Instantiation and Reuse
*   Messages and Method Calls
*   Attributes and Instance Variables
*   Encapsulation and Information Hiding
*   Inheritance

## 1.9 Typical C Program-Development Environment
C systems generally consist of several parts: a program-development environment, the language and the C Standard Library. C programs typically go through six phases to be executed: edit, preprocess, compile, link, load and execute.

## 1.10 Test-Driving a C Application in Windows, Linux and Mac OS X
This section provides tutorials for running your first C application on different operating systems.

## 1.11 Operating Systems
Operating systems are software systems that make using computers more convenient for users, application developers and system administrators. Popular desktop operating systems include Linux, Windows and Mac OS X. Popular mobile operating systems used in smartphones and tablets include Google’s Android, Apple’s iOS, Windows Phone and BlackBerry OS.

## 1.12 The Internet and World Wide Web
In the late 1960s, ARPA—the Advanced Research Projects Agency of the United States Department of Defense—rolled out plans for networking the main computer systems of approximately a dozen ARPA-funded universities and research institutions. This led to the ARPANET, the precursor to today's Internet. The World Wide Web, developed by Tim Berners-Lee, made the internet more user-friendly.

## 1.13 Some Key Software Terminology
This section introduces buzzwords like Agile software development, Refactoring, Design patterns, LAMP, Software as a Service (SaaS), Platform as a Service (PaaS), Cloud computing, and Software Development Kits (SDKs).

## 1.14 Keeping Up-to-Date with Information Technologies
This section lists key technical and business publications to help you stay up-to-date with the latest news and trends and technology.
`,
  zh: ``
};