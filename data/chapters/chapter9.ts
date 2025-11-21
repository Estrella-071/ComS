
export const chapter9Content = {
  en: `
# Chapter 9: Programming Languages

In Chapter 8 we discussed algorithms. We showed how we can write algorithms in UML or pseudocode to solve a problem. In this chapter, we examine programming languages that can implement pseudocode or UML descriptions of a solution into a programming language. This chapter is not designed to teach a particular programming language; it is written to compare and contrast different languages.

## Objectives
After studying this chapter, the student should be able to:
- Describe the evolution of programming languages from machine language to high-level languages.
- Understand how a program in a high-level language is translated into machine language using an interpreter or a compiler.
- Distinguish between four computer language paradigms.
- Understand the procedural paradigm and the interaction between a program unit and data items in the paradigm.
- Understand the object-oriented paradigm and the interaction between a program unit and objects in this paradigm.
- Define functional paradigm and understand its applications.
- Define a declaration paradigm and understand its applications.
- Define common concepts in procedural and object-oriented languages.

## 9.1 EVOLUTION
To write a program for a computer, we must use a computer language. A computer language is a set of predefined words that are combined into a program according to predefined rules (syntax). Over the years, computer languages have evolved from machine language to high-level languages.

### 9.1.1 Machine languages
In the earliest days of computers, the only **programming languages** available were **machine languages**. Each computer had its own machine language, which was made of streams of 0s and 1s. In Chapter 5 we showed that in a primitive hypothetical computer, we need to use 11 lines of code to read two integers, add them, and print the result. These lines of code, when written in machine language, make 11 lines of binary code, each of 16 bits, as shown in Table 9.1.

**Table 9.1 Code in machine language to add two integers**
| Hexadecimal | Code in machine language |
| :--- | :--- |
| (1FEF)16 | 0001 1111 1110 1111 |
| (240F)16 | 0010 0100 0000 1111 |
| (1FEF)16 | 0001 1111 1110 1111 |
| (241F)16 | 0010 0100 0001 1111 |
| (1040)16 | 0001 0000 0100 0000 |
| (1141)16 | 0001 0001 0100 0001 |
| (3201)16 | 0011 0010 0000 0001 |
| (2422)16 | 0010 0100 0010 0010 |
| (1F42)16 | 0001 1111 0100 0010 |
| (2FFF)16 | 0010 1111 1111 1111 |
| (0000)16 | 0000 0000 0000 0000 |

Machine language is the only language understood by the computer hardware, which is made of electronic switches with two states: off (representing 0) and on (representing 1).

**The only language understood by a computer is machine language.**

Although a program written in machine language truly represents how data is manipulated by the computer, it has at least two drawbacks. First, it is machine-dependent. The machine language of one computer is different than the machine language of another computer if they use different hardware. Second, it is very tedious to write programs in this language and very difficult to find errors. The era of machine language is now is referred to as the *first generation* of programming languages.

### 9.1.2 Assembly languages
The next evolution in programming came with the idea of replacing binary code for instruction and addresses with symbols or mnemonics. Because they used symbols, these languages were first known as *symbolic languages*. The set of these mnemonic languages were later referred to as **assembly languages**. The assembly language for our hypothetical computer to replace the machine language in Table 9.1 is shown in Table 9.2.

**Table 9.2 Code in assembly language to add two integers**
| Code in assembly language | Description |
| :--- | :--- |
| LOAD RF Keyboard | Load from keyboard controller to register F |
| STORE Number1 RF | Store register F into Number1 |
| LOAD RF Keyboard | Load from keyboard controller to register F |
| STORE Number2 RF | Store register F into Number2 |
| LOAD R0 Number1 | Load Number1 into register 0 |
| LOAD R1 Number2 | Load Number2 into register 1 |
| ADDI R2 R0 R1 | Add registers 0 and 1 with result in register 2 |
| STORE Result R2 | Store register 2 into Result |
| LOAD RF Result | Load Result into register F |
| STORE Monitor RF | Store register F into monitor controller |
| HALT | Stop |

A special program called an **assembler** is used to translate code in assembly language into machine language.

### 9.1.3 High-level languages
Although assembly languages greatly improved programming efficiency, they still required programmers to concentrate on the hardware they were using. Working with symbolic languages was also very tedious, because each machine instruction had to be individually coded. The desire to improve programmer efficiency and to change the focus from the computer to the problem being solved led to the development of **high-level languages**.

High-level languages are portable to many different computers, allowing the programmer to concentrate on the application rather than the intricacies of the computer’s organization. They are designed to relieve the programmer from the details of assembly language. High-level languages share one characteristic with symbolic languages: they must be converted to machine language. This process is called *interpretation* or *compilation* (described later in the chapter).

Over the years, various languages, most notably BASIC, COBOL, Pascal, Ada, C, C++, and Java, were developed. Program 9-1 shows the code for adding two integers as it would appear in the C++ language. Although the program looks longer, some of the lines are used for documentation (comments).

**Program 9-1 Addition program in C++**
\`\`\`cpp
/* This program reads two integers from keyboard and prints their sum.
   Written by:
   Date:
*/
#include <iostream>
using namespace std;
int main ()
{
    // Local Declarations
    int number1;
    int number2;
    int result;
    // Statements
    cin >> number1;
    cin >> number2;
    result = number1 + number2;
    cout << result;
    return 0;
} // main
\`\`\`

## 9.2 TRANSLATION
Programs today are normally written in one of the high-level languages. To run the program on a computer, the program needs to be translated into the machine language of the computer on which it will run. The program in a high-level language is called the **source program**. The translated program in machine language is called the **object program**. Two methods are used for translation: **compilation** and **interpretation**.

### 9.2.1 Compilation
A **compiler** normally translates the whole source program into the object program.

### 9.2.2 Interpretation
Some computer languages use an **interpreter** to translate the source program into the object program. Interpretation refers to the process of translating each line of the source program into the corresponding line of the object program and executing the line. However, we need to be aware of two trends in interpretation: that used by some languages before Java and the interpretation used by Java.

**First approach to interpretation**
Some interpreted languages prior to Java (such as BASIC and APL) used a kind of interpretation process that we refer to as the *first approach* to interpretation, for the lack of any other name. In this type of interpretation, each line of the source program is translated into the machine language of the computer being used and executed immediately. If there are any errors in translation and execution, the process displays a message and the rest of the process is aborted. The program needs to be corrected and be interpreted and executed again from the beginning. This first approach was considered to be a slow process, which is why most languages use compilation instead of interpretation.

**Second approach to interpretation**
With the advent of Java, a new kind of interpretation process was introduced. The Java language is designed to be portable to any computer. To achieve portability, the translation of the source program to object program is done in two steps: compilation and interpretation. A Java source program is first compiled to create Java **bytecode**, which looks like code in a machine language, but is not the object code for any specific computer: it is the object code for a virtual machine, called the Java Virtual Machine or JVM. The bytecode then can be compiled or interpreted by any computer that runs a JVM emulator—that is, the computer that runs the bytecode needs only a JVM emulator, not the Java compiler.

### 9.2.3 Translation process
Compilation and interpretation differ in that the first translates the whole source code before executing it, while the second translates and executes the source code a line at a time. Both methods, however, follow the same translation process.

**Lexical analyzer**
A **lexical analyzer** reads the source code, symbol by symbol, and creates a list of **tokens** in the source language. For example, the five symbols w, h, i, l, e are read and grouped together as the token *while* in the C, C++, or Java languages.

**Syntax analyzer**
The **syntax analyzer** parses a set of tokens to find instructions. For example, the tokens ‘x’, ‘=’, ‘0’ are used by the syntax analyzer to create the assignment statement in the C language ‘x = 0’.

**Semantic analyzer**
The **semantic analyzer** checks the sentences created by the syntax analyzer to be sure that they contain no ambiguity. Computer languages are normally unambiguous, which means that this stage is either omitted in a **translator**, or its duty is minimal.

**Code generator**
After unambiguous instructions are created by the semantic analyzer, each instruction is converted to a set of machine language instructions for the computer on which the program will run. This is done by the **code generator**.

## 9.3 PROGRAMMING PARADIGMS
Today computer languages are categorized according to the approach they use to solve a problem. A *paradigm*, therefore, is a way in which a computer language looks at the problem to be solved. We divide computer languages into four paradigms: *procedural* (imperative), *object-oriented*, *functional*, and *declarative*.

### 9.3.1 The procedural paradigm
In the **procedural paradigm** (or **imperative paradigm**) we can think of a program as an *active agent* that manipulates *passive objects*. We encounter many passive objects in our daily life: a stone, a book, a lamp, and so on. A passive object cannot initiate an action by itself, but it can receive actions from active agents.

A program in a procedural paradigm is an active agent that uses passive objects that we refer to as *data* or *data items*. Data items, as passive objects, are stored in the memory of the computer, and a program manipulates them. To manipulate a piece of data, the active agent (program) issues an action, referred to as a *procedure*. For example, think of a program that prints the contents of a file. To be printed, the file needs to be stored in memory (or some registers that act as memory). The file is a passive object or a collection of passive objects. To print the file, the program uses a procedure, which we call *print*. The procedure print has usually been written previously to include all the actions required to tell the computer how to print each character in the file. The program invokes or *calls* the procedure *print*. In a procedural paradigm, the object (*file*) and the procedure (*print*) are completely separate entities. The object (*file*) is an independent entity that can receive the *print* action, or some other actions, such as *delete*, *copy*, and so on. To apply any of these actions to the file, we need a procedure to act on the file. The procedure *print* (or *copy* or *delete*) is a separate entity that is written and the program only triggers it.

We need to separate the procedure from its triggering by the program. The program does not define the procedure, it only triggers or calls the procedure. The procedure must already exist.
When we use a procedural high-level language, the program consists of nothing but a lot of procedure calls. Although it is not immediately obvious, even when we use a simple mathematical operator such as the addition operator (+), we are using a procedure call to a procedure that is already written. For example, when we use the expression A + B and expect the expression to add the value of two objects A and B, we are calling the procedure add and passing the name of these two objects to the procedure. The procedure *add* needs two objects to act on. It adds the values of the two objects and returns the result. In other words, the expression A + B is a short cut for add (A, B). The designer of the language has written this procedure and we can call it.

A program in this paradigm is made up of three parts: a part for object creation, a set of procedure calls, and a set of code for each procedure. Some procedures have already been defined in the language itself. By combining this code, the programmer can create new procedures.

**Some procedural languages**
Several high-level imperative (procedural) languages have been developed over the last few decades, such as FORTRAN, COBOL, Pascal, C, and Ada.

**FORTRAN**
**FORTRAN (FORmula TRANslation)**, designed by a group of IBM engineers under the supervision of Jack Backus, became commercially available in 1957. FORTRAN was the first high-level language. FORTRAN has some features that, even after four decades, still make it an ideal language for scientific and engineering applications. These features can be summarized as:
- High-precision arithmetic
- Capability of handling complex numbers
- Exponentiation computation ($a^b$)

**COBOL**
**COBOL (COmmon Business-Oriented Language)** was designed by a group of computer scientists under the direction of Grace Hopper of the US Navy. COBOL had a specific design goal: to be used as a business programming language. The programming needs of the business world can be summarized as follows:
- Fast access to files and databases
- Fast updating of files and databases
- Large amounts of generated reports
- User-friendly formatted output

**Pascal**
**Pascal** was invented by Niklaus Wirth in 1971. Pascal was designed with a specific goal in mind: to teach programming to novices by emphasizing the structured programming approach. Although Pascal became the most popular language in academia, it never attained the same popularity in industry. Today’s **procedural languages** owe a lot to this language.

**C**
The **C language** was developed in the early 1970s by Dennis Ritchie at Bell Laboratories. It was originally intended for writing operating systems and system software—most of the UNIX operating system is written in C. Later, it became popular among programmers for several reasons:
- C has all the high-level instructions a structured high-level programming language should have.
- C also has some low-level instructions that allow the programmer to access the hardware directly and quickly. This makes it a good language for system programmers.
- C is a very efficient language: its instructions are short.

**Ada**
**Ada** was named after Augusta Ada Byron, the daughter of Lord Byron. It was created for the US Department of Defense (DoD). Ada has three features that make it very popular:
- Ada has high-level instructions like other procedural languages.
- Ada has instructions to allow real-time processing.
- Ada has parallel-processing capabilities.

### 9.3.2 The object-oriented paradigm
The **object-oriented paradigm** deals with *active objects* instead of passive objects. We encounter many active objects in our daily life: a vehicle, an automatic door, a dishwasher, and so on. The actions to be performed on these objects are included in the object: the objects need only to receive the appropriate stimulus from outside to perform one of the actions.

Returning to our example in the procedural paradigm, a file in an object-oriented paradigm can be packed with all the procedures—called **methods** in the object-oriented paradigm—to be performed by the file: printing, copying, deleting, and so on. The program in this paradigm just sends the corresponding request to the object (print, delete, copy, and so on) and the file will be printed, copied, or deleted.
The methods are shared by all objects of the same type, and also for other objects that are inherited from these objects. If the program wants to print File1, it just sends the required stimulus to the active objects and File1 will be printed.
Comparing the procedural paradigm with the object-oriented paradigm, we see that the procedures in the procedural paradigm are independent entities, but the methods in object-oriented paradigm belong to the object’s territory.

**Classes**
Objects of the same type (files, for example) need a set of methods that show how an object of this type reacts to stimuli from outside the object’s ‘territories’. To create these methods, object-oriented languages such as C++, Java, and C# (pronounced ‘C sharp’) use a unit called a **class**.

**Methods**
In general, the formats of methods are very similar to the functions used in some procedural languages. Each **method** has its header, its local variables, and its statement. This means that most of the features we discussed for procedural languages are also applied to methods written for an object-oriented program.

**Inheritance**
In the object-oriented paradigm, as in nature, an object can inherit from another object. This concept is called **inheritance**. When a general class is defined, we can define a more specific class that inherits some of the characteristics of the general class, but also has some new characteristics. For example, when an object of the type *GeometricalShapes* is defined, we can define a class called *Rectangles*. Rectangles are geometrical shapes with additional characteristics.

**Polymorphism**
**Polymorphism** means ‘many forms’. Polymorphism in the object-oriented paradigm means that we can define several operations with the same name that can do different things in related classes. For example, assume that we define two classes, *Rectangles* and *Circles*, both inherited from the class *GeometricalShapes*. We define two operations both named *area*, one in Rectangles and one in Circles, that calculate the area of a rectangle or a circle. The two operations have the same name but do different things.

**Some object-oriented languages**
Several **object-oriented languages** have been developed. We briefly discuss the characteristics of two: C++ and Java.

**C++**
The **C++ language** was developed by Bjarne Stroustrup at Bell Laboratory as an improvement of the C language. It uses **classes** to define the general characteristics of similar objects and the operations that can be applied to them. Three principles were used in the design of the C++ language: *encapsulation*, *inheritance*, and *polymorphism*.

**Java**
**Java** was developed at Sun Microsystems, Inc. It is based on C and C++, but some features of C++ were removed to make the language more robust. In addition, the language is totally class-oriented. In C++ one can solve a problem without ever defining a class, but in Java every data item belongs to a class.
A program in Java can either be an application or an applet. An application is a complete stand-alone program that can be run independently. An **applet**, on the other hand, is embedded HTML, stored on a server, and run by a browser.
One interesting feature of Java is support for **multithreading**. A thread is a sequence of actions executed one after another. C++ allows only single threading, but Java allows the concurrent execution of several lines of code.

### 9.3.3 The functional paradigm
In the **functional paradigm** a program is considered a mathematical function. In this context, a **function** is a black box that maps a list of inputs to a list of outputs.
For example, *summation* can be considered as a function with $n$ inputs and only one output. The function takes the $n$ inputs, adds them, and creates the sum. A **functional language** does the following:
- Predefines a set of primitive (atomic) functions that can be used by any programmer.
- Allows the programmer to combine primitive functions to create new functions.

For example, we can define a primitive function called *first* that extracts the first element of a list. It may also have a function called *rest* that extracts all the elements except the first. A program can define a function that extracts the third element of a list by combining these two functions.

**Some functional languages**
We briefly discuss LISP and Scheme as examples of functional languages.

**LISP**
**LISP (LISt Programming)** was designed by a team of researchers at MIT in the early 1960s. It is a list-processing programming language in which everything is considered a list.

**Scheme**
The LISP language suffered from a lack of standardization. The de facto standard is the one developed by MIT in the early 1970s called **Scheme**.
The Scheme language defines a set of primitive functions that solves problems. The function name and the list of inputs to the function are enclosed in parentheses. For example, there is a function, car, that extracts the first element of a list. There is a function, called cdr, that extracts the rest of the elements in a list except the first one. In other words, we have:
\`(car 2 3 7 8 11 17 20) -> 2\`
\`(cdr 2 3 7 8 11 17 20) -> 3 7 8 11 17 20\`
Now we can combine these two functions to extract the third element of any list:
\`(car (cdr (cdr list)))\`

### 9.3.4 The declarative paradigm
A **declarative paradigm** uses the principle of logical reasoning to answer queries. It is based on formal logic defined by Greek mathematicians and later developed into *first-order predicate calculus*.
Logical reasoning is based on deduction. Some statements (facts) are given that are assumed to be true, and the logician uses solid rules of logical reasoning to deduce new statements (facts). For example, the famous rule of deduction in logic is:
If (A is B) and (B is C), then (A is C)
Using this rule and the two following facts:
Fact 1: Socrates is a human -> A is B
Fact 2: A human is mortal -> B is C
we can deduce a new fact:
Fact 3: Socrates is mortal -> A is C

One problem associated with **declarative languages** is that a program is specific to a particular domain. This is the reason why declarative programming is limited so far to specific fields such as artificial intelligence.

**Prolog**
One of the famous declarative languages is **Prolog (PROgramming in LOGic)**, developed by A. Colmerauer in France in 1972. A program in Prolog is made up of facts and rules. For example, the previous facts about human beings can be stated as:
\`human (John)\`
\`mortal (human)\`
The user can then ask:
\`?-mortal (John)\`
and the program will respond with *yes*.

## 9.4 COMMON CONCEPTS
In this section we conduct a quick navigation through some procedural languages to find common concepts. Some of these concepts are also available in most object-oriented languages because an object-oriented paradigm uses the procedural paradigm when creating methods.

### 9.4.1 Identifiers
One feature present in all procedural languages, as well as in other languages, is the **identifier**—that is, the name of objects. Identifiers allow us to name objects in the program. For example, each piece of data in a computer is stored at a unique address. Identifiers allow us to give data names and let the compiler keep track of where they are physically located.

### 9.4.2 Data types
A **data type** defines a set of values and a set of operations that can be applied to those values. The set of values for each type is known as the *domain* for the type. Most languages define two categories of data types: *simple types* and *composite types*.

**Simple data types**
A **simple type** (sometimes called an *atomic type*, *fundamental type*, *scalar type*, or *built-in type*) is a data type that cannot be broken into smaller data types. Several simple data types have been defined in **imperative languages**:
- An *integer* type is a whole number, that is, a number without a fractional part.
- A *real* type is a number with a fractional part.
- A *character* type is a symbol in the underlying character set used by the language, for example, ASCII or Unicode.
- A *Boolean* type is type with only two values, *true* or *false*.

**Composite data types**
A **composite type** is a set of elements in which each element is a simple type or a composite type. Most languages defines the following composite types:
- An *array* is a set of elements each of the same type.
- A *record* is a set of elements in which the element can be of different types.

### 9.4.3 Variables
**Variables** are names for memory locations. A programmer can use a variable, such as *score*, to store the integer value of a score received in a test. Since a variable holds a data item, it has a type.

**Variable declarations**
Most procedural and object-oriented languages required that the variables be declared before being used. Declaration alerts the computer that a variable with a given name and type will be used in the program.
\`char C;\`
\`int num;\`
\`double result;\`

**Variable initialization**
Most procedural languages allow the initialization of the variables when they are declared. Initialization stores a value in the variable.
\`char C = 'Z';\`
\`int num = 123;\`
\`double result = 256,782;\`

### 9.4.4 Literals
A **literal** is a predetermined value used in a program. For example, in the expression 3.14 × r^2, the approximate value of $\\pi$ (pi) is used as a literal. In most programming languages we can have integer, real, character, and Boolean literals. To distinguish the character and string literals from the names of variables, most languages require that the character literals be enclosed in single quotes, such as 'A' and strings to be enclosed in double quotes such as "Anne".

### 9.4.5 Constants
Most programming languages defined **constants**. A constant, like a variable, is a named location that can store a value, but the value cannot be changed after it has been defined at the beginning of the program.
\`const float taxMultiplier = 1.08;\`
\`...\`
\`cost = price * taxMultiplier;\`

### 9.4.6 Input and Output
Almost every program needs to read and/or write data. Most programming languages use a predefined function for input and output.
**Input**: Data is **input** by either a statement or a predefined function. For example, the *scanf* function in C reads data from the keyboard.
**Output**: Data is **output** by either a statement or a predefined function. For example, the *printf* function in C displays a string on the monitor.

### 9.4.7 Expressions
An **expression** is a sequence of operands and operators that reduces to a single value.
**Operator**: An **operator** is a language-specific token that requires an action to be taken. Common operators include arithmetic (+, -, *, /, %), relational (<, <=, >, >=, ==, !=), and logical (!, &&, ||) operators.
**Operand**: An **operand** receives an operator’s action.

### 9.4.8 Statements
A **statement** causes an action to be performed by the program.
**Assignment statements**: An **assignment statement** assigns a value to a variable. The symbol = is common (e.g., x = 1).
**Compound statements**: A **compound statement** is a unit of code consisting of zero or more statements. It is also known as a block. It allows a group of statements to be treated as a single entity.
**Control statements**: A **control statement** is a program in a procedural language that is a set of statements. Control statements are normally executed one after another. However, sometimes it is necessary to change this sequential order.
- **Selection**: Two-way selection is achieved through the *if-else* statement, multi-way selection through the *switch* (or *case*) statement.
- **Repetition**: Most imperative languages define loops like *while*, *do-while*, and *for*.

### 9.4.9 Subprograms
The idea of **subprograms** is crucial in procedural languages. A subprogram is a program unit that can be written once but called many times. Subprograms make programming more structural.
**Local variables**: Local objects or **local variables** are created each time the subprogram is called and destroyed when control returns from the subprogram.
**Parameters**: Subprograms act on objects. These are referred to as **actual parameters** in the main program and **formal parameters** in the subprogram.
- **Pass by value**: The main program sends the value of the actual parameter to the subprogram. The subprogram receives a copy. It cannot change the original variable in the main program.
- **Pass by reference**: The variable is shared by the main program and the subprogram. The subprogram can change the value of the variable in the main program.
**Returning values**: A subprogram can be designed to return a value or values.
**Implementation**: In C and C++, the subprogram is implemented as a function.

## 9.5 END-CHAPTER MATERIALS
### 9.5.1 Recommended reading
- Cooke, D. A. *Concise Introduction to Computer Languages*, Pacific Grove, CA: Brooks/Cole, 2003
- Tucker, A. and Noonan, R. *Programming Languages: Principles and Paradigms*, Burr Ridge, IL: McGraw-Hill, 2002
- Pratt, T. and Zelkowitz, M. *Programming Languages, Design and Implementation*, Englewood Cliffs, NJ: Prentice-Hall, 2001
- Sebesta, R. *Concepts of Programming Languages*, Boston, MA: Addison-Wesley, 2006

### 9.5.2 Key terms
- actual parameter
- Ada
- applet
- arithmetic operator
- assembler
- assembly language
- assignment statement
- bytecode
- C++ language
- C language
- class
- code generator
- COmmon Business-Oriented Language (COBOL)
- compilation
- compiler
- composite type
- compound statement
- computer language
- constant
- control statement
- data type
- declarative language
- declarative paradigm
- expression
- formal parameter
- FORmula TRANslation (FORTRAN)
- functional language
- functional paradigm
- high-level language
- identifier
- imperative language
- imperative paradigm
- inheritance
- input
- interpretation
- interpreter
- Java
- lexical analyzer
- LISt Programming Language (LISP)
- literal
- local variable
- logical operator
- machine language
- method
- multithreading
- object-oriented language
- object-oriented paradigm
- object program
- operand
- operator
- output
- parameter
- Pascal
- pass by reference
- pass by value
- polymorphism
- procedural paradigm
- Programming in LOGic (PROLOG)
- programming language
- relational operator
- Scheme
- semantic analyzer
- simple type
- source program
- statement
- subprogram
- symbolic language
- syntax
- syntax analyzer
- token
- translator
- variable

### 9.5.3 Summary
- A computer language is a set of predefined words that are combined into a program according to predefined rules (syntax).
- High-level languages are portable to many different computers.
- To run a program on a computer, it needs to be translated into the machine language. Compilation translates the whole source program; interpretation translates line by line.
- Four paradigms: procedural, object-oriented, functional, and declarative.
- Common concepts: identifiers, data types, variables, literals, constants, input/output, expressions, statements, and subprograms.
`,
  zh: `
# 第九章：程式語言

在第八章中，我們討論了演算法。我們展示了如何用 UML 或偽代碼編寫演算法來解決問題。在本章中，我們將探討程式語言，這些語言可以將解決方案的偽代碼或 UML 描述實作為程式語言。本章並非旨在教授特定的程式語言，而是為了比較和對比不同的語言。

## 學習目標
學完本章後，學生應能：
- 描述程式語言從機器語言到高階語言的演進。
- 理解高階語言程式如何使用直譯器或編譯器轉換為機器語言。
- 區分四種電腦語言範式。
- 理解程序化範式以及該範式中程式單元與資料項目之間的互動。
- 理解物件導向範式以及該範式中程式單元與物件之間的互動。
- 定義函數式範式並理解其應用。
- 定義宣告式範式並理解其應用。
- 定義程序化和物件導向語言中的共同概念。

## 9.1 演進
要為電腦編寫程式，我們必須使用電腦語言。電腦語言是一組預先定義的詞彙，根據預先定義的規則（語法）組合成程式。多年來，電腦語言已從機器語言演變為高階語言。

### 9.1.1 機器語言
在電腦最早期的時代，唯一可用的**程式語言**是**機器語言**。每台電腦都有自己的機器語言，由 0 和 1 的串流組成。在第五章中，我們展示了在一台原始的假設電腦中，我們需要使用 11 行代碼來讀取兩個整數，將它們相加，並列印結果。這些代碼行如果用機器語言編寫，會變成 11 行二進位代碼，每行 16 位元，如表 9.1 所示。

**表 9.1 用機器語言編寫的兩個整數相加的代碼**
| 十六進位 | 機器語言代碼 |
| :--- | :--- |
| (1FEF)16 | 0001 1111 1110 1111 |
| (240F)16 | 0010 0100 0000 1111 |
| (1FEF)16 | 0001 1111 1110 1111 |
| (241F)16 | 0010 0100 0001 1111 |
| (1040)16 | 0001 0000 0100 0000 |
| (1141)16 | 0001 0001 0100 0001 |
| (3201)16 | 0011 0010 0000 0001 |
| (2422)16 | 0010 0100 0010 0010 |
| (1F42)16 | 0001 1111 0100 0010 |
| (2FFF)16 | 0010 1111 1111 1111 |
| (0000)16 | 0000 0000 0000 0000 |

機器語言是電腦硬體唯一能理解的語言，硬體由具有兩種狀態的電子開關組成：關（代表 0）和開（代表 1）。

**電腦唯一能理解的語言是機器語言。**

雖然用機器語言編寫的程式真實地代表了電腦如何操作資料，但它至少有兩個缺點。首先，它是依賴機器的。如果兩台電腦使用不同的硬體，它們的機器語言就會不同。其次，用這種語言編寫程式非常繁瑣，而且很難發現錯誤。機器語言時代現在被稱為程式語言的*第一代*。

### 9.1.2 組合語言
程式設計的下一次演進是用符號或助記符取代指令和位址的二進位碼。因為它們使用符號，這些語言最初被稱為*符號語言*。這些助記符語言的集合後來被稱為**組合語言**。用於替換表 9.1 中機器語言的我們假設電腦的組合語言如表 9.2 所示。

**表 9.2 用組合語言編寫的兩個整數相加的代碼**
| 組合語言代碼 | 描述 |
| :--- | :--- |
| LOAD RF Keyboard | 從鍵盤控制器載入到暫存器 F |
| STORE Number1 RF | 將暫存器 F 存入 Number1 |
| LOAD RF Keyboard | 從鍵盤控制器載入到暫存器 F |
| STORE Number2 RF | 將暫存器 F 存入 Number2 |
| LOAD R0 Number1 | 將 Number1 載入到暫存器 0 |
| LOAD R1 Number2 | 將 Number2 載入到暫存器 1 |
| ADDI R2 R0 R1 | 將暫存器 0 和 1 相加，結果存入暫存器 2 |
| STORE Result R2 | 將暫存器 2 存入 Result |
| LOAD RF Result | 將 Result 載入到暫存器 F |
| STORE Monitor RF | 將暫存器 F 存入螢幕控制器 |
| HALT | 停止 |

一種稱為**組譯器**的特殊程式用於將組合語言代碼翻譯成機器語言。

### 9.1.3 高階語言
雖然組合語言大大提高了程式設計效率，但它們仍然要求程式設計師專注於他們正在使用的硬體。使用符號語言工作也非常繁瑣，因為每條機器指令都必須單獨編碼。提高程式設計師效率並將重點從電腦轉移到要解決的問題上的願望導致了**高階語言**的開發。

高階語言可移植到許多不同的電腦上，讓程式設計師可以專注於應用程式，而不是電腦組織的複雜細節。它們旨在讓程式設計師從組合語言的細節中解脫出來。高階語言與符號語言有一個共同特徵：它們必須被轉換為機器語言。這個過程稱為*直譯*或*編譯*（稍後在本章中描述）。

多年來，各種語言被開發出來，最著名的是 BASIC、COBOL、Pascal、Ada、C、C++ 和 Java。程式 9-1 顯示了用 C++ 語言編寫的兩個整數相加的代碼。雖然程式看起來更長，但其中一些行用於文件說明（註解）。

**程式 9-1 C++ 中的加法程式**
\`\`\`cpp
/* 該程式從鍵盤讀取兩個整數並列印它們的總和。
   作者：
   日期：
*/
#include <iostream>
using namespace std;
int main ()
{
    // 區域宣告
    int number1;
    int number2;
    int result;
    // 陳述式
    cin >> number1;
    cin >> number2;
    result = number1 + number2;
    cout << result;
    return 0;
} // main
\`\`\`

## 9.2 轉譯
今天的程式通常是用一種高階語言編寫的。為了在電腦上運行程式，程式需要被翻譯成將要運行的電腦的機器語言。高階語言的程式稱為**原始程式**。翻譯後的機器語言程式稱為**目的程式**。翻譯使用兩種方法：**編譯**和**直譯**。

### 9.2.1 編譯 (Compilation)
**編譯器**通常將整個原始程式翻譯成目的程式。

### 9.2.2 直譯 (Interpretation)
一些電腦語言使用**直譯器**將原始程式翻譯成目的程式。直譯是指逐行將原始程式翻譯成目的程式的對應行並執行該行的過程。然而，我們需要意識到直譯的兩個趨勢：Java 之前的一些語言使用的直譯和 Java 使用的直譯。

**第一種直譯方法**
Java 之前的一些直譯語言（如 BASIC 和 APL）使用一種我們稱之為*第一種方法*的直譯過程，因為沒有其他名稱。在這種類型的直譯中，原始程式的每一行都被翻譯成正在使用的電腦的機器語言並立即執行。如果在翻譯和執行過程中出現任何錯誤，該過程會顯示一條訊息，其餘過程將中止。程式需要被修正，並從頭開始再次直譯和執行。這第一種方法被認為是一個緩慢的過程，這就是為什麼大多數語言使用編譯而不是直譯。

**第二種直譯方法**
隨著 Java 的出現，引入了一種新的直譯過程。Java 語言旨在可移植到任何電腦。為了實現可移植性，原始程式到目的程式的翻譯分兩步完成：編譯和直譯。Java 原始程式首先被編譯以創建 Java **位元組碼 (bytecode)**，它看起來像機器語言代碼，但不是任何特定電腦的目的碼：它是虛擬機器的目的碼，稱為 Java 虛擬機或 JVM。然後，位元組碼可以由任何運行 JVM 模擬器的電腦編譯或直譯——也就是說，運行位元組碼的電腦只需要一個 JVM 模擬器，而不是 Java 編譯器。

### 9.2.3 翻譯過程
編譯和直譯的不同之處在於，前者在執行之前翻譯整個原始程式碼，而後者一次翻譯並執行一行原始程式碼。然而，這兩種方法都遵循相同的翻譯過程。

**詞彙分析器 (Lexical analyzer)**
**詞彙分析器**逐個符號地讀取原始程式碼，並在原始語言中創建**符記 (tokens)** 列表。例如，五個符號 w, h, i, l, e 被讀取並組合在一起作為 C、C++ 或 Java 語言中的符記 *while*。

**語法分析器 (Syntax analyzer)**
**語法分析器**解析一組符記以查找指令。例如，符記 'x', '=', '0' 被語法分析器用來在 C 語言中創建賦值陳述式 'x = 0'。

**語意分析器 (Semantic analyzer)**
**語意分析器**檢查語法分析器生成的句子，以確保它們不包含歧義。電腦語言通常是明確的，這意味著這個階段在**翻譯器**中要麼被省略，要麼其職責很小。

**代碼生成器 (Code generator)**
在語意分析器創建明確的指令後，每條指令都被轉換為一組機器語言指令，用於將運行程式的電腦。這是由**代碼生成器**完成的。

## 9.3 程式設計範式
今天，電腦語言根據它們用來解決問題的方法進行分類。因此，*範式*是電腦語言看待待解決問題的方式。我們將電腦語言分為四種範式：*程序化*（指令式）、*物件導向*、*函數式*和*宣告式*。

### 9.3.1 程序化範式
在**程序化範式**（或**指令式範式**）中，我們可以將程式視為一個*主動的代理者*，它操作*被動的物件*。我們在日常生活中遇到許多被動的物件：石頭、書、燈等等。被動的物件不能自己發起動作，但它可以接受來自主動代理者的動作。

程序化範式中的程式是一個主動的代理者，它使用我們稱為*資料*或*資料項目*的被動物件。資料項目作為被動物件，儲存在電腦的記憶體中，程式操作它們。為了操作一塊資料，主動代理者（程式）發出一個動作，稱為*程序*。例如，想像一個列印檔案內容的程式。要被列印，檔案需要儲存在記憶體中（或一些充當記憶體的暫存器）。檔案是一個被動物件或被動物件的集合。為了列印檔案，程式使用一個程序，我們稱之為 *print*。程序 print 通常已經預先寫好，包含了告訴電腦如何列印檔案中每個字元所需的所有動作。程式調用或*呼叫*程序 *print*。在程序化範式中，物件（*檔案*）和程序（*print*）是完全獨立的實體。物件（*檔案*）是一個獨立的實體，可以接收 *print* 動作，或其他一些動作，如 *delete*、*copy* 等等。要對檔案應用任何這些動作，我們需要一個程序來作用於檔案。程序 *print*（或 *copy* 或 *delete*）是一個單獨的實體，它被寫好，程式只是觸發它。

我們需要將程序與程式對它的觸發分開。程式不定義程序，它只觸發或呼叫程序。程序必須已經存在。
當我們使用程序化高階語言時，程式只不過是由大量的程序呼叫組成。雖然這不是立即顯而易見的，但即使我們使用簡單的數學運算子，如加法運算子 (+)，我們也是在使用對已經寫好的程序的程序呼叫。例如，當我們使用表達式 A + B 並期望表達式將兩個物件 A 和 B 的值相加時，我們是在呼叫程序 add 並將這兩個物件的名稱傳遞給程序。程序 *add* 需要兩個物件來作用。它將兩個物件的值相加並回傳結果。換句話說，表達式 A + B 是 add (A, B) 的捷徑。語言的設計者已經編寫了這個程序，我們可以呼叫它。

這種範式中的程式由三部分組成：物件創建部分、一組程序呼叫和每個程序的代碼集。有些程序已經在語言本身中定義。透過組合這些代碼，程式設計師可以創建新的程序。

**一些程序化語言**
在過去幾十年中，已經開發了幾種高階指令式（程序化）語言，如 FORTRAN、COBOL、Pascal、C 和 Ada。

**FORTRAN**
**FORTRAN (FORmula TRANslation，公式翻譯)** 由 Jack Backus 監督的一組 IBM 工程師設計，於 1957 年商業化。FORTRAN 是第一個高階語言。FORTRAN 具有一些特性，即使在四十年後，仍然使其成為科學和工程應用的理想語言。這些特性可以總結為：
- 高精度算術
- 處理複數的能力
- 指數運算 ($a^b$)

**COBOL**
**COBOL (COmmon Business-Oriented Language，通用商業導向語言)** 由美國海軍 Grace Hopper 指導的一組電腦科學家設計。COBOL 有一個特定的設計目標：用作商業程式語言。商業世界的程式設計需求可以總結如下：
- 快速存取檔案和資料庫
- 快速更新檔案和資料庫
- 大量生成的報告
- 使用者友好的格式化輸出

**Pascal**
**Pascal** 由 Niklaus Wirth 於 1971 年發明。Pascal 的設計有一個特定的目標：透過強調結構化程式設計方法來教導新手程式設計。雖然 Pascal 在學術界成為最受歡迎的語言，但它從未在工業界獲得同樣的普及。今天的**程序化語言**在很大程度上歸功於這種語言。

**C**
**C 語言**由 Dennis Ritchie 於 1970 年代初在貝爾實驗室開發。它最初是為了編寫作業系統和系統軟體而設計的——大部分 UNIX 作業系統都是用 C 編寫的。後來，由於幾個原因，它在程式設計師中流行起來：
- C 具有結構化高階程式語言應具有的所有高階指令。
- C 也有一些低階指令，允許程式設計師直接快速地存取硬體。這使它成為系統程式設計師的好語言。
- C 是一種非常高效的語言：它的指令很短。

**Ada**
**Ada** 以 Lord Byron 的女兒 Augusta Ada Byron 命名。它是為美國國防部 (DoD) 創建的。Ada 有三個特點使它非常受歡迎：
- 像其他程序化語言一樣，Ada 具有高階指令。
- Ada 具有允許即時處理的指令。
- Ada 具有平行處理能力。

### 9.3.2 物件導向範式
**物件導向範式**處理的是*主動的物件*而不是被動的物件。我們在日常生活中遇到許多主動的物件：車輛、自動門、洗碗機等等。對這些物件執行的動作包含在物件中：物件只需要從外部接收適當的刺激來執行其中一個動作。

回到我們在程序化範式中的例子，物件導向範式中的檔案可以包含所有要由檔案執行的程序——在物件導向範式中稱為**方法 (methods)**：列印、複製、刪除等等。這種範式中的程式只是向物件發送相應的請求（列印、刪除、複製等），檔案就會被列印、複製或刪除。
相同類型的所有物件共享這些方法，從這些物件繼承的其他物件也共享這些方法。如果程式想要列印 File1，它只需向主動物件發送所需的刺激，File1 就會被列印。
比較程序化範式與物件導向範式，我們可以看到程序化範式中的程序是獨立的實體，但物件導向範式中的方法屬於物件的領域。

**類別 (Classes)**
相同類型的物件（例如檔案）需要一組方法來顯示這種類型的物件如何對來自物件「領域」外部的刺激做出反應。為了創建這些方法，C++、Java 和 C#（發音為 'C sharp'）等物件導向語言使用稱為**類別**的單元。

**方法 (Methods)**
一般來說，方法的格式與某些程序化語言中使用的函式非常相似。每個**方法**都有其標頭、區域變數和陳述式。這意味著我們討論的程序化語言的大多數特性也適用於為物件導向程式編寫的方法。

**繼承 (Inheritance)**
在物件導向範式中，就像在自然界中一樣，一個物件可以從另一個物件繼承。這個概念稱為**繼承**。當定義了一個一般類別時，我們可以定義一個更具體的類別，它繼承了一般類別的一些特徵，但也具有一些新特徵。例如，當定義了類型為 *GeometricalShapes*（幾何形狀）的物件時，我們可以定義一個名為 *Rectangles*（矩形）的類別。矩形是具有額外特徵的幾何形狀。

**多型 (Polymorphism)**
**多型**意味著「多種形式」。物件導向範式中的多型意味著我們可以定義幾個同名的操作，這些操作在相關類別中可以做不同的事情。例如，假設我們定義了兩個類別 *Rectangles* 和 *Circles*（圓形），都繼承自類別 *GeometricalShapes*。我們定義了兩個都名為 *area*（面積）的操作，一個在 Rectangles 中，一個在 Circles 中，用於計算矩形或圓形的面積。這兩個操作名稱相同但做不同的事情。

**一些物件導向語言**
已經開發了幾種**物件導向語言**。我們簡要討論其中兩種的特徵：C++ 和 Java。

**C++**
**C++ 語言**由貝爾實驗室的 Bjarne Stroustrup 開發，作為 C 語言的改進。它使用**類別**來定義相似物件的一般特徵以及可以應用於它們的操作。C++ 語言的設計使用了三個原則：*封裝*、*繼承*和*多型*。

**Java**
**Java** 由 Sun Microsystems, Inc. 開發。它基於 C 和 C++，但刪除了 C++ 的一些功能以使語言更健壯。此外，該語言完全是類別導向的。在 C++ 中，人們可以解決問題而無需定義類別，但在 Java 中，每個資料項目都屬於一個類別。
Java 程式可以是應用程式或小程式。應用程式是一個可以獨立運行的完整獨立程式。另一方面，**小程式 (applet)** 是嵌入式 HTML，儲存在伺服器上，並由瀏覽器運行。
Java 的一個有趣特徵是支援**多執行緒**。執行緒是依序執行的一系列動作。C++ 只允許單執行緒，但 Java 允許同時執行幾行代碼。

### 9.3.3 函數式範式
在**函數式範式**中，程式被視為數學函數。在這種情況下，**函數**是一個將輸入列表映射到輸出列表的黑盒子。
例如，*總和*可以被視為具有 $n$ 個輸入和只有一個輸出的函數。該函數獲取 $n$ 個輸入，將它們相加，並創建總和。**函數式語言**做以下事情：
- 預先定義一組原始（原子）函數，任何程式設計師都可以使用。
- 允許程式設計師組合原始函數以創建新函數。

例如，我們可以定義一個名為 *first* 的原始函數，它提取列表的第一個元素。它也可能有另一個名為 *rest* 的函數，它提取除第一個之外的所有元素。程式可以透過組合這兩個函數來定義一個提取列表第三個元素的函數。

**一些函數式語言**
我們簡要討論 LISP 和 Scheme 作為函數式語言的例子。

**LISP**
**LISP (LISt Programming，列表程式設計)** 由麻省理工學院的一組研究人員於 1960 年代初設計。它是一種列表處理程式語言，其中一切都被視為列表。

**Scheme**
LISP 語言缺乏標準化。事實上的標準是由麻省理工學院在 1970 年代初開發的，稱為 **Scheme**。
Scheme 語言定義了一組解決問題的原始函數。函數名稱和函數的輸入列表包含在括號中。例如，有一個函數 car，它提取列表的第一個元素。有一個函數，稱為 cdr，它提取列表中除第一個之外的其餘元素。換句話說，我們有：
\`(car 2 3 7 8 11 17 20) -> 2\`
\`(cdr 2 3 7 8 11 17 20) -> 3 7 8 11 17 20\`
現在我們可以組合這兩個函數來提取任何列表的第三個元素：
\`(car (cdr (cdr list)))\`

### 9.3.4 宣告式範式
**宣告式範式**使用邏輯推理原則來回答查詢。它基於希臘數學家定義的形式邏輯，後來發展成*一階謂詞演算*。
邏輯推理基於演繹。給出一些被假定為真的陳述（事實），邏輯學家使用可靠的邏輯推理規則來推導出新的陳述（事實）。例如，邏輯中著名的演繹規則是：
如果 (A 是 B) 且 (B 是 C)，則 (A 是 C)
使用這條規則和以下兩個事實：
事實 1：蘇格拉底是人 -> A 是 B
事實 2：人是會死的 -> B 是 C
我們可以推導出一個新事實：
事實 3：蘇格拉底是會死的 -> A 是 C

與**宣告式語言**相關的一個問題是程式特定於特定領域。這就是為什麼宣告式程式設計目前僅限於特定領域，如人工智慧。

**Prolog**
著名的宣告式語言之一是 **Prolog (PROgramming in LOGic，邏輯程式設計)**，由法國的 A. Colmerauer 於 1972 年開發。Prolog 程式由事實和規則組成。例如，關於人類的先前事實可以陳述為：
\`human (John)\`
\`mortal (human)\`
使用者然後可以問：
\`?-mortal (John)\`
程式將回應 *yes*。

## 9.4 共同概念
在本節中，我們將快速瀏覽一些程序化語言以尋找共同概念。其中一些概念在大多數物件導向語言中也可用，因為物件導向範式在創建方法時使用程序化範式。

### 9.4.1 識別碼 (Identifiers)
所有程序化語言以及其他語言中都存在的一個特徵是**識別碼**——即物件的名稱。識別碼允許我們命名程式中的物件。例如，電腦中的每塊資料都儲存在唯一的位址。識別碼允許我們給資料命名，並讓編譯器追蹤它們的物理位置。

### 9.4.2 資料型別 (Data types)
**資料型別**定義了一組值和一組可以應用於這些值的運算。每種類型的值集合稱為該類型的*域*。大多數語言定義兩類資料型別：*簡單型別*和*複合型別*。

**簡單資料型別**
**簡單型別**（有時稱為*原子型別*、*基本型別*、*純量型別*或*內建型別*）是一種不能分解為更小資料型別的資料型別。在**指令式語言**中定義了幾種簡單資料型別：
- *整數 (integer)* 型別是整數，即沒有小數部分的數字。
- *實數 (real)* 型別是帶有小數部分的數字。
- *字元 (character)* 型別是語言使用的底層字元集中的符號，例如 ASCII 或 Unicode。
- *布林 (Boolean)* 型別是只有兩個值，*真 (true)* 或 *假 (false)* 的型別。

**複合資料型別**
**複合型別**是一組元素，其中每個元素都是簡單型別或複合型別。大多數語言定義以下複合型別：
- *陣列 (array)* 是一組相同型別的元素。
- *記錄 (record)* 是一組元素，其中元素可以是不同的型別。

### 9.4.3 變數 (Variables)
**變數**是記憶體位置的名稱。程式設計師可以使用變數，例如 *score*，來儲存測試中獲得的分數的整數值。由於變數保存資料項目，因此它具有一種類型。

**變數宣告**
大多數程序化和物件導向語言要求在使用變數之前對其進行宣告。宣告提醒電腦將在程式中使用具有給定名稱和類型的變數。
\`char C;\`
\`int num;\`
\`double result;\`

**變數初始化**
大多數程序化語言允許在宣告變數時對其進行初始化。初始化將值儲存在變數中。
\`char C = 'Z';\`
\`int num = 123;\`
\`double result = 256,782;\`

### 9.4.4 字面值 (Literals)
**字面值**是程式中使用的預定值。例如，在表達式 3.14 × r^2 中，$\\pi$ (pi) 的近似值被用作字面值。在大多數程式語言中，我們可以有整數、實數、字元和布林字面值。為了區分字元和字串字面值與變數名稱，大多數語言要求將字元字面值括在單引號中，如 'A'，並將字串括在雙引號中，如 "Anne"。

### 9.4.5 常數 (Constants)
大多數程式語言定義了**常數**。常數像變數一樣，是一個可以儲存值的命名位置，但在程式開頭定義後，該值不能更改。
\`const float taxMultiplier = 1.08;\`
\`...\`
\`cost = price * taxMultiplier;\`

### 9.4.6 輸入和輸出
幾乎每個程式都需要讀取和/或寫入資料。大多數程式語言使用預先定義的函數進行輸入和輸出。
**輸入 (Input)**：資料由陳述式或預先定義的函數**輸入**。例如，C 中的 *scanf* 函數從鍵盤讀取資料。
**輸出 (Output)**：資料由陳述式或預先定義的函數**輸出**。例如，C 中的 *printf* 函數在螢幕上顯示字串。

### 9.4.7 表達式 (Expressions)
**表達式**是由運算元和運算子組成的序列，可化簡為單一值。
**運算子 (Operator)**：**運算子**是語言特定的符號，需要執行動作。常見的運算子包括算術 (+, -, *, /, %)、關係 (<, <=, >, >=, ==, !=) 和邏輯 (!, &&, ||) 運算子。
**運算元 (Operand)**：**運算元**接收運算子的動作。

### 9.4.8 陳述式 (Statements)
**陳述式**使程式執行一個動作。
**賦值陳述式**：**賦值陳述式**將值賦給變數。符號 = 很常見（例如，x = 1）。
**複合陳述式**：**複合陳述式**是由零個或多個陳述式組成的代碼單元。它也被稱為區塊。它允許將一組陳述式視為單個實體。
**控制陳述式**：**控制陳述式**是程序化語言中的一個程式，是一組陳述式。控制陳述式通常一個接一個地執行。然而，有時需要改變這種順序。
- **選擇 (Selection)**：透過 *if-else* 陳述式實現雙向選擇，透過 *switch*（或 *case*）陳述式實現多向選擇。
- **重複 (Repetition)**：大多數指令式語言定義了像 *while*、*do-while* 和 *for* 這樣的迴圈。

### 9.4.9 副程式 (Subprograms)
**副程式**的概念在程序化語言中至關重要。副程式是一個可以編寫一次但多次呼叫的程式單元。副程式使程式設計更具結構性。
**區域變數**：區域物件或**區域變數**在每次呼叫副程式時創建，並在控制權從副程式回傳時銷毀。
**參數**：副程式作用於物件。這些在主程式中稱為**實際參數**，在副程式中稱為**形式參數**。
- **傳值 (Pass by value)**：主程式將實際參數的值發送給副程式。副程式接收副本。它不能更改主程式中的原始變數。
- **傳參考 (Pass by reference)**：變數由主程式和副程式共享。副程式可以更改主程式中變數的值。
**回傳值**：副程式可以設計為回傳一個或多個值。
**實作**：在 C 和 C++ 中，副程式實作為函式。

## 9.5 章末材料
### 9.5.1 推薦閱讀
- Cooke, D. A. *Concise Introduction to Computer Languages*, Pacific Grove, CA: Brooks/Cole, 2003
- Tucker, A. and Noonan, R. *Programming Languages: Principles and Paradigms*, Burr Ridge, IL: McGraw-Hill, 2002
- Pratt, T. and Zelkowitz, M. *Programming Languages, Design and Implementation*, Englewood Cliffs, NJ: Prentice-Hall, 2001
- Sebesta, R. *Concepts of Programming Languages*, Boston, MA: Addison-Wesley, 2006

### 9.5.2 關鍵詞
- 實際參數 (actual parameter)
- Ada
- 小程式 (applet)
- 算術運算子 (arithmetic operator)
- 組譯器 (assembler)
- 組合語言 (assembly language)
- 賦值陳述式 (assignment statement)
- 位元組碼 (bytecode)
- C++ 語言 (C++ language)
- C 語言 (C language)
- 類別 (class)
- 代碼生成器 (code generator)
- 通用商業導向語言 (COBOL)
- 編譯 (compilation)
- 編譯器 (compiler)
- 複合型別 (composite type)
- 複合陳述式 (compound statement)
- 電腦語言 (computer language)
- 常數 (constant)
- 控制陳述式 (control statement)
- 資料型別 (data type)
- 宣告式語言 (declarative language)
- 宣告式範式 (declarative paradigm)
- 表達式 (expression)
- 形式參數 (formal parameter)
- 公式翻譯 (FORTRAN)
- 函數式語言 (functional language)
- 函數式範式 (functional paradigm)
- 高階語言 (high-level language)
- 識別碼 (identifier)
- 指令式語言 (imperative language)
- 指令式範式 (imperative paradigm)
- 繼承 (inheritance)
- 輸入 (input)
- 直譯 (interpretation)
- 直譯器 (interpreter)
- Java
- 詞彙分析器 (lexical analyzer)
- 列表程式設計語言 (LISP)
- 字面值 (literal)
- 區域變數 (local variable)
- 邏輯運算子 (logical operator)
- 機器語言 (machine language)
- 方法 (method)
- 多執行緒 (multithreading)
- 物件導向語言 (object-oriented language)
- 物件導向範式 (object-oriented paradigm)
- 目的程式 (object program)
- 運算元 (operand)
- 運算子 (operator)
- 輸出 (output)
- 參數 (parameter)
- Pascal
- 傳參考 (pass by reference)
- 傳值 (pass by value)
- 多型 (polymorphism)
- 程序化範式 (procedural paradigm)
- 邏輯程式設計 (PROLOG)
- 程式語言 (programming language)
- 關係運算子 (relational operator)
- Scheme
- 語意分析器 (semantic analyzer)
- 簡單型別 (simple type)
- 原始程式 (source program)
- 陳述式 (statement)
- 副程式 (subprogram)
- 符號語言 (symbolic language)
- 語法 (syntax)
- 語法分析器 (syntax analyzer)
- 符記 (token)
- 翻譯器 (translator)
- 變數 (variable)

### 9.5.3 摘要
- 電腦語言是一組預先定義的詞彙，根據預先定義的規則（語法）組合成程式。
- 高階語言可移植到許多不同的電腦上。
- 要在電腦上運行程式，需要將其翻譯成機器語言。編譯翻譯整個原始程式；直譯逐行翻譯。
- 四種範式：程序化、物件導向、函數式和宣告式。
- 共同概念：識別碼、資料型別、變數、字面值、常數、輸入/輸出、表達式、陳述式和副程式。
`
};
