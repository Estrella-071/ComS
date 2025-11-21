
export const chapter10Content = {
  en: `
# Chapter 10: Software Engineering

In this chapter we introduce the concept of software engineering. We begin with the idea of the software lifecycle. We then show two models used for the development process: the waterfall model and the incremental model. A brief discussion of four phases in the development process follows.

## Objectives
After studying this chapter, the student should be able to:
- Understand the concept of the software lifecycle in software engineering.
- Describe two major types of development process, the waterfall and incremental models.
- Understand the analysis phase and describe two separate approaches in the analysis phase: procedure-oriented analysis and object-oriented analysis.
- Understand the design phase and describe two separate approaches in the design phase: procedure-oriented design and object-oriented design.
- Describe the implementation phase and recognize the quality issues in this phase.
- Describe the testing phase and distinguish between glass-box testing and black-box testing.
- Recognize the importance of documentation in software engineering and distinguish between user documentation, system documentation, and technical documentation.

**Software engineering** is the establishment and use of sound engineering methods and principles to obtain reliable software. This definition, taken from the first international conference on software engineering in 1969, was proposed 30 years after the first computer was built.

## 10.1 THE SOFTWARE LIFECYCLE
A fundamental concept in **software engineering** is the **software lifecycle**. Software, like many other products, goes through a cycle of repeating phases (Figure 10.1).

Software is first developed by a group of developers. Usually it is in use for a while before modifications are necessary. Modification is often needed due to errors found in the software, changes in the rules or laws governing its design, or changes in the company itself. The software therefore needs to be modified before further use. These two steps, use and modify, continue until the software becomes obsolete. By ‘obsolete’, we mean that the software loses its validity because of inefficiency, obsolescence of the language, major changes in user requirements, or other factors.

### 10.1.1 Development process models
Although software engineering involves all three processes (development, use, modification), in this chapter we discuss only the **development process**. The development process in the software lifecycle involves four phases: *analysis*, *design*, *implementation*, and *testing*. There are several models for the development process. We discuss the two most common here: the waterfall model and the incremental model.

**The waterfall model**
One very popular model for the software development process is known as the **waterfall model** (Figure 10.2). In this model, the development process flows in only one direction. This means that a phase cannot be started until the previous phase is completed.

For example, the analysis phase of the whole project should be completed before its design phase is started. The entire design phase should be finished before the implementation phase can be started.
There are advantages and disadvantages to the waterfall model. One advantage is that each phase is completed before the next phase starts. The group that works on the design phase, for example, knows exactly what to do because they have the complete results of the analysis phase. The testing phase can test the whole system because the entire system under development is ready. However, a disadvantage of the waterfall model is the difficulty in locating a problem: if there is a problem in part of the process, the entire process must be checked.

**The incremental model**
In the **incremental model**, software is developed in a series of steps. The developers first complete a simplified version of the whole system. This version represents the entire system but does not include the details. Figure 10.3 shows the incremental model concept.

In the second version, more details are added, while some are left unfinished, and the system is tested again. If there is a problem, the developers know that the problem is with the new functionality. They do not add more functionality until the existing system works properly. This process continues until all required functionality has been added.

## 10.2 ANALYSIS PHASE
The development process starts with the **analysis phase**. This phase results in a specification document that shows *what* the software will do without specifying *how* it will be done. The analysis phase can use two separate approaches, depending on whether the implementation phase is done using a procedural programming language or an object-oriented language. We briefly discuss both in this section.

### 10.2.1 Procedure-oriented analysis
**Procedure-oriented analysis**—also called *structured analysis* or *classical analysis*—is the analysis process used if the system implementation phase will use a procedural language. The specification in this case may use several modeling tools, but we discuss only a few of them here.

**Data flow diagrams**
**Data flow diagrams** show the movement of data in the system. They use four symbols: a square box shows the source or destination of data, a rectangle with rounded corners shows the process (the action to be performed on the data), an open-ended rectangle shows where data is stored, and arrows show the flow of data.
Figure 10.4 shows a simplified version of a booking system in a small hotel that accepts reservations from potential guests through the Internet and confirms or rejects the reservation based on available vacancies. One of the processes in this diagram (handle reservation) checks the availability using the reservation file and accepts or rejects a reservation. If the reservation is accepted, it will be recorded in the reservation file.

**Entity–relationship diagrams**
Another modeling tool used during the analysis phase is the **entity–relationship diagram**. Since this diagram is also used in database design, we discuss it in Chapter 14.

**State diagrams**
**State diagrams** (see Appendix B) provide another useful tool that is normally used when the state of the entity in the system will change in response to events. As an example of a state diagram, we show the operation of a one-passenger elevator. When a floor button is pushed, the elevator moves in the requested direction. It does not respond to any other request until it reach its destination.
Figure 10.5 shows a state diagram for this old-style elevator. The elevator can be in one of three states: moving up, moving down, or parked. Each of these states is represented by a rounded rectangle in the state diagram. When the elevator is in the parked state, it accepts a request. If the requested floor is the same as the current floor, the request is ignored—the elevator remains in the parked state. If the requested floor is above the current floor, the elevator starts moving up. If the requested floor is lower than the requested floor, the elevator starts moving down. Once moving, the elevator remains in one moving state until it reaches the requested floor.

### 10.2.2 Object-oriented analysis
**Object-oriented analysis** is the analysis process used if the implementation uses an object-oriented language. The specification document in this case may use several tools, but we discuss only a few of them here.

**Use-case diagrams**
A **use-case diagram** gives the user’s view of a system: it shows how the user communicates with the system. A use-case diagram uses four components: system, use cases, actors, and relationships. A system, shown by a rectangle, performs a function. The actions in the system are shown by use cases, which are denoted by rounded rectangles. An actor is someone or something that uses the system. Although actors are represented by stick figures, they do not necessarily represent human beings.
Figure 10.6 shows the use-case diagram for the old-style elevator for which we gave a state diagram in Figure 10.5. The system in this figure is the elevator. The only actor is the user of the elevator. There are two uses cases: pressing the elevator button (in the hall of each floor) and pressing the floor button inside the elevator. The elevator has only one button on each floor that gives the signal to the elevator to move to that floor.

**Class diagrams**
The next step in analysis is to create a **class diagram** for the system. For example, we can create a class diagram for our old-style elevator. To do so, we need to think about the entities involved in the system. In the elevator system we have two classes of entities: the buttons and the elevator itself. At first glance, therefore, it looks as if we have two classes: a button class and an elevator class. However, we have two types of buttons: the elevator buttons in the hallways and the floor buttons inside the elevator. It seems then that we can have a button class and two classes that inherit from the button class: an elevator button class and a floor button class. The first class diagram that we can create for the elevator problem is therefore that shown in Figure 10.7.
Note that the elevator button class and the floor button class are subclasses of the button class. However, the relationship between the elevator class and the two button classes (elevator button and floor button) is a one-to-many relation (see Appendix B). The class diagram for the elevator system can of course be extended, but we leave this to books on software engineering.

**State chart**
After the class diagram is finalized, a **state chart** can be prepared for each class in the class diagram. A state chart in object-oriented analysis plays the same role as the state diagram in procedure-oriented analysis. This means that for the class diagram of Figure 10.7, we need to have a four-state chart.

## 10.3 DESIGN PHASE
The **design phase** defines *how* the system will accomplish *what* was defined in the analysis phase. In the design phase, all components of the system are defined.

### 10.3.1 Procedure-oriented design
In **procedure-oriented design** we have both procedures and data to design. We discuss a category of design methods that concentrate on procedures. In procedure-oriented design, the whole system is divided into a set of procedure or modules.

**Structure charts**
A common tool for illustrating the relations between modules in procedure-oriented design is a **structure chart**. For example, the elevator system whose state diagram is shown in Figure 10.5 can be designed as a set of modules shown in the structure chart in Figure 10.8. Structure charts are discussed in Appendix D.

**Modularity**
**Modularity** means breaking a large project into smaller parts that can be understood and handled easily. In other words, modularity means dividing a large task into small tasks that can communicate with each other. The structure chart discussed in the previous section shows the modularity in the elevator system. There are two main concerns when a system is divided into modules: *coupling* and *cohesion*.

**Coupling**
**Coupling** is a measure of how tightly two modules are bound to each other. The more tightly coupled, the less independent they are. Since the objective is to make modules as independent as possible, we want them to be loosely coupled. There are at least three reasons why loose coupling is desirable.
- Loosely coupled modules are more likely to be reusable.
- Loosely coupled modules are less likely to create errors in related modules.
- When the system needs to be modified, loosely coupled modules allow us to modify only modules that need to be changed without affecting modules that do not need to change.

**Coupling between modules in a software system must be minimized.**

**Cohesion**
Another issue in modularity is cohesion. **Cohesion** is a measure of how closely the modules in a system are related. We need to have maximum possible cohesion between modules in a software system.

**Cohesion between modules in a software system must be maximized.**

### 10.3.2 Object-oriented design
In **object-oriented design**, the design phase continues by elaborating the details of classes. As we mentioned in Chapter 9, a class is made of a set of variables (attributes) and a set of methods (functions). The object-oriented design lists the details of these **attributes** and **methods**. Figure 10.9 shows an example of the details of our four classes used in the design of the old-style elevator.

## 10.4 IMPLEMENTATION PHASE
In the waterfall model, after the design phase is completed, the **implementation phase** can start. In this phase the programmers write the code for the modules in procedure-oriented design, or write the program units to implement classes in object-oriented design. There are several issues to mention in each case.

### 10.4.1 Choice of language
In a procedure-oriented development, the project team needs to choose a language or a set of languages from among the procedural languages discussed in Chapter 9. Although some languages like C++ are considered to be both a procedure—and an object-oriented language—normally an implementation uses a purely procedural language such as C. In object-oriented cases, both C++ and Java are common.

### 10.4.2 Software quality
The quality of software created at the implementation phase is a very important issue. A software system of high quality is one that satisfies the user’s requirements, meets the operating standards of the organization, and runs efficiently on the hardware for which it was developed. However, if we want to achieve a software system of high quality, we must be able to define some attributes of quality.

**Software quality factors**
**Software quality** can be divided into three broad measures: *operability*, *maintainability*, and *transferability*. Each of these measures can be further broken down as shown in Figure 10.10.

**Operability**
**Operability** refers to the basic operation of a system. Several measures can be mentioned for operability, as shown in Figure 10.10: *accuracy, efficiency, reliability, security, timeliness,* and *usability*.
- A system that is not *accurate* is worse than no system at all. Any system that is developed, therefore, must be thoroughly tested both by a system’s test engineer and the user. *Accuracy* can be measured by such metrics as mean time between failures, number of bugs per thousand lines of code, and number of user requests for change.
- *Efficiency* is a subjective term. In some cases, the user will specify a performance standard, such as a real-time response that must be received within 1 second 95 per cent of the time. This is certainly measurable.
- *Reliability* is really the sum of the other factors. If users count on the system to get their job done and are confident in it, then it is most likely reliable. On the other hand, some measures speak directly to a system’s reliability, most notably, mean time between failures.
- How *secure* a system is refers to how easy it is for unauthorized people to access the system’s data. Although this is a subjective area, there are checklists that assist in assessing the system’s security. For example, does the system have and require passwords to identify users?
- *Timeliness* in software engineering can mean several different things. Does the system deliver its output in a timely fashion? For online systems, does the response time satisfy the users’ requirements?
- *Usability* is another area that is highly subjective. The best measure of usability is to watch the users and see how they are using the system. User interviews will often reveal problems with the usability of a system.

**Maintainability**
**Maintainability** refers to the ease with which a system can be kept up to date and running correctly. Many systems require regular changes, not because they were poorly implemented, but because of changes in external factors. For example, the payroll system for a company might have to be changed often to meet changes in government laws and regulations.
- *Changeability* is a subjective factor. Experienced project leaders, however, are able to estimate how long a requested change will take to implement. If too long, it may indicate that the system is difficult to change. This is especially true of older systems. There are software measurement tools in the field today that will estimate a program’s complexity and structure.
- One measure of *correctability* is *mean time to recovery*, which is the time it takes to get a program back into operation after it fails. Although this is a reactive definition, there are currently no predictors of how long it will take to correct a program when it fails.
- Users are constantly requesting changes to systems. *Flexibility* is a qualitative attribute that attempts to measure how easy it is to make these changes. If a program needs to be completely rewritten to effect a change, it is not flexible.
- We might think that *testability* is a highly subjective area, but test engineers have checklists of factors that can assess a program’s testability.

**Transferability**
**Transferability** refers to the ability to move data and/or a system from one platform to another and to reuse code. In many situations this is not an important factor. On the other hand, if we are writing generalized software, it can be critical.
- If modules are written so that they can be reused in other systems, then they have high levels of *reusability*. Good programmers build libraries of functions that they can reuse for solving similar problems.
- *Interoperability* is the capability of sending data to other systems. In today’s highly integrated systems, it is a desirable attribute. In fact, it has become so important that operating systems now support the ability to move data between systems, such as between a word processor and a spreadsheet.
- *Portability* is the ability to move software from one hardware platform to another.

## 10.5 TESTING PHASE
The goal of the **testing phase** is to find errors, which means that a good testing strategy is the one that finds most errors. There are two types of testing: *glass-box* and *black-box* (Figure 10.11).

### 10.5.1 Glass-box testing
**Glass-box testing** (or **white-box testing**) is based on knowing the internal structure of the software. The testing goal is to check to determine whether all components of the software do what they are designed to do. Glass-box testing assumes that the tester knows everything about the software. In this case, the software is like a glass box in which everything inside the box is visible. Glass-box testing is done by the software engineer or a dedicated team. Glass-box testing that uses the structure of the software is required to guarantee that at least the following four criteria are met:
- All independent paths in every module are tested at least once.
- All the decision constructs (two-way and multiway) are tested on each branch.
- Each loop construct is tested.
- All data structures are tested.
Several testing methodologies have been designed in the past. We briefly discuss two of them: *basis path* testing and *control structure* testing.

**Basis path testing**
**Basis path testing** was proposed by Tom McCabe. This method creates a set of test cases that executes *every statement* in the software at least once.

**Basis path testing is a method in which each statement in the software is executed at least once.**

Basis path testing uses *graph theory* (see Chapter 12) and *cyclomatic complexity* to find the independent paths that must be followed to guarantee that each statement is executed at least once.

**Control structure testing**
**Control structure testing** is more comprehensive than basis path testing and includes it. This method uses different categories of test that are briefly described below.
- **Condition testing**: Condition testing applies to any condition expression in the module. A *simple condition* is a relational expression, while a *compound condition* is a combination of simple conditions and logical operators (see Chapter 9). Condition testing is designed to check whether all conditions are set correctly.
- **Data flow testing**: Data flow testing is based on the flow of data through the module. This type of testing selects test cases that involve checking the value of variables when they are used on the left side of the assignment statement.
- **Loop testing**: Loop testing uses test cases to check the validity of loops. All types of loops (*while*, *do*, and *for*) are carefully tested.

### 10.5.2 Black-box testing
**Black-box testing** gets its name from the concept of testing software without knowing what is inside it and without knowing how it works. In other words, the software is like a black box into which the tester cannot see. Black-box testing tests the functionality of the software in terms of what the software is supposed to accomplish, such as its inputs and outputs. Several methods are used in black-box testing, discussed below.

**Exhaustive testing**
The best black-box test method is to test the software for all possible values in the input domain. However, in complex software the input domain is so huge that it is often impractical to do so.

**Random testing**
In random testing, a subset of values in the input domain is selected for testing. It is very important that the subset be chosen in such a way that the values are distributed over the domain input. The use of random number generators can be very helpful in this case.

**Boundary-value testing**
Errors often happen when boundary values are encountered. For example, if a module defines that one of its inputs must be greater than or equal to 100, it is very important that module be tested for the boundary value 100. If the module fails at this boundary value, it is possible that some condition in the module’s code such as x > 100 is written as x >= 100.

## 10.6 DOCUMENTATION
For software to be used properly and maintained efficiently, documentation is needed. Usually, three separate sets of documentation are prepared for software: user documentation, system documentation, and technical documentation. However, note that documentation is an ongoing process. If the software has problems after release, they must be documented too. If the software is modified, all modifications and their relationship to the original package must also be documented. Documentation only stops when the package becomes obsolete.

**Documentation is an ongoing process.**

### 10.6.1 User documentation
To run the software system properly, the users need documentation, traditionally called a *user guide*, that shows how to use the software step by step. User guides usually contain a tutorial section to guide the user through each feature of the software.
A good user guide can be a very powerful marketing tool: the importance of user documentation in marketing cannot be overemphasized. User guides should be written for both the novice and the expert users, and a software system with good user documentation will definitely increase sales.

### 10.6.2 System documentation
**System documentation** defines the software itself. It should be written so that the software can be maintained and modified by people other than the original developers. System documentation should exist for all four phases of system development.
In the analysis phase, the information collected should be carefully documented. In addition, the analysts should define the sources of information. The requirements and methods chosen in this phase must be clearly stated with the rationale behind them.
In the design phase, the tools used in the final copy must be documented. For example, if a chart undergoes several changes, the final copy of the chart should be documented with complete explanations.
In the implementation phase, every module of the code should be documented. In addition, the code should be self-documenting as far as possible using comments and descriptive headers.
Finally, the developers must carefully document the testing phase. Each type of test applied to the final product should be mentioned along with its result. Even unfavorable results and the data that produced them must be documented.

### 10.6.3 Technical documentation
**Technical documentation** describe the installation and the servicing of the software system. Installation documentation defines how the software should be installed on each computer, for example, servers and clients. Service documentation defines how the system should be maintained and updated if necessary.

## 10.7 END-CHAPTER MATERIALS
### 10.7.1 Recommended reading
- Braude, E. *Software Engineering – An Object-Oriented Perspective*, New York: Wiley, 2001
- Gustafson, D. *Software Engineering*, New York: McGraw-Hill, 2002
- Lethbridge, T. and Laganiere, R. *Object-Oriented Software Engineering*, New York: McGraw-Hill, 2005
- Pressman, R. *Software Engineering: A Practitioner’s Approach*, New York: McGraw-Hill, 2005
- Schach, S. *Object-Oriented and Classical Software Engineering*, New York: McGraw-Hill, 2007

### 10.7.2 Key terms
- analysis phase
- attribute
- basis path testing
- black-box testing
- class diagram
- cohesion
- control structure testing
- coupling
- data flow diagram
- design phase
- development process
- entity–relationship diagram
- glass-box testing
- implementation phase
- incremental model
- maintainability
- modularity
- object-oriented analysis
- object-oriented design
- operability
- procedure-oriented analysis
- procedure-oriented design
- software engineering
- software lifecycle
- software quality
- state chart
- state diagram
- structure chart
- technical documentation
- testability
- testing phase
- transferability
- use-case diagram
- waterfall model
- white-box testing

### 10.7.3 Summary
- The software lifecycle is a fundamental concept in software engineering. Software, like many other products, goes through a cycle of repeating phases.
- The development process in the software lifecycle involves four phases: analysis, design, implementation, and testing. Several models have been used in relation to these phases. We discussed the two most common: the waterfall model and the incremental model.
- The development process starts with the analysis phase. The analyst prepares a specification document that shows what the software will do without specifying how it will be done. The analysis phase can be done in two ways: procedure-oriented analysis and object-oriented analysis.
- The design phase defines how the system will accomplish what was defined in the analysis phase. In procedure-oriented design, the whole project is divided into a set of procedure or modules. In object-oriented design, the design phase continues by elaborating the details of classes.
- Modularity means breaking a large project into smaller parts that can be understood and handled easily. Two issues are important when a system is divided into modules: coupling and cohesion. Coupling is a measure of how tightly two modules are bound to each other. Coupling between modules in a software system must be minimized. Cohesion is a measure of how closely the modules in a system are related. Cohesion between modules in a software system should be maximized.
- In the implementation phase, programmers write the code for the modules in procedure-oriented design, or write the program units to implement classes in the object-oriented design.
- The quality of software is important. Software quality can be divided into three broad measures: operability, maintainability, and transferability.
- The goal of the testing phase is to find errors. There are two types of testing: glass-box and black-box. Glass-box testing (or white-box testing) is based on knowing the internal structure of the software. Glass-box testing assumes that the tester knows everything. Black-box testing means testing the software without knowing what is inside it and without knowing how it works.

## 10.8 PRACTICE SET
### 10.8.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 10.8.2 Review questions
1. Define ‘software lifecycle’.
2. Distinguish between the waterfall model and the incremental development models.
3. List the four phases in the development process.
4. Define the purpose of the analysis phase and describe two trends in this phase.
5. Define the purpose of the design phase and describe two trends in this phase.
6. Describe modularity and mention two issues related to modularity.
7. Distinguish between coupling and cohesion.
8. Define the purpose of the implementation phase and describe the issue of quality in this phase.
9. Define the purpose of the testing phase and list two categories of testing.
10. Distinguish between glass-box testing and black-box testing.

### 10.8.3 Problems
1. In Chapter 9 we explained that the use of constant values are preferred to literals. What it the effect of this preference on the software lifecycle?
2. In Chapter 9 we showed that communication between two modules can take place either by pass-by-value or pass-by-reference. Which method provides less coupling between the two modules?
3. In Chapter 9 we showed that communication between two modules can take place either by pass-by-value or pass-by-reference. Which method provides more cohesion between the two modules?
4. Draw a use-case diagram for a simple library.
5. Draw a use-case diagram for a small grocery store.
6. Show the data flow diagram for a simple mathematical formula $x + y$.
7. Show the data flow diagram for a simple mathematical formula $x \\times y + z \\times t$.
8. Show the data flow diagram for a library.
9. Show the data flow diagram for a small groceries store.
10. Create a structure chart for Problem P10-8.
11. Create a structure chart for Problem P10-9.
12. Show a state diagram for a stack of fixed capacity (see Chapter 12).
13. Show a state diagram for a queue of fixed capacity (see Chapter 12).
14. Create a class diagram for a library.
15. Create a class diagram for a small grocery store.
16. Show the details of classes in Problem P10-14.
17. Show the details of classes in Problem P10-15.
18. The input data to a program is made up of a combination of three integers in the range 1000 to 1999 (inclusive). Find the number of exhaustive tests to test all combinations of these numbers.
19. List the boundary-value tests required for the Problem P10-18.
20. A random number generator creates a number between 0 and 0.999. How can this random number generator be used to do random testing for the system described in Problem P10-18.
`,
  zh: `
# 第十章：軟體工程

在本章中，我們介紹軟體工程的概念。我們從軟體生命週期的概念開始。然後，我們展示了用於開發過程的兩種模型：瀑布模型和增量模型。接下來簡要討論開發過程中的四個階段。

## 學習目標
學完本章後，學生應能：
- 理解軟體工程中軟體生命週期的概念。
- 描述兩種主要的開發過程模型：瀑布模型和增量模型。
- 理解分析階段並描述分析階段的兩種不同方法：程序導向分析和物件導向分析。
- 理解設計階段並描述設計階段的兩種不同方法：程序導向設計和物件導向設計。
- 描述實作階段並認識此階段的品質問題。
- 描述測試階段並區分玻璃箱測試和黑箱測試。
- 認識到文件在軟體工程中的重要性，並區分使用者文件、系統文件和技術文件。

**軟體工程**是建立和使用完善的工程方法和原則以獲得可靠軟體的過程。這個定義取自 1969 年的第一屆軟體工程國際會議，是在第一台電腦建成 30 年後提出的。

## 10.1 軟體生命週期
**軟體工程**中的一個基本概念是**軟體生命週期**。軟體和許多其他產品一樣，會經歷一個重複階段的循環（圖 10.1）。

軟體首先由一組開發人員開發。通常在使用一段時間後才需要修改。修改通常是因為發現軟體中的錯誤、管理其設計的規則或法律發生變化，或公司本身發生變化。因此，軟體在進一步使用之前需要進行修改。這兩個步驟，使用和修改，持續進行，直到軟體過時。所謂「過時」，是指軟體因效率低下、語言過時、使用者需求發生重大變化或其他因素而失去有效性。

### 10.1.1 開發過程模型
雖然軟體工程涉及所有三個過程（開發、使用、修改），但在本章中我們僅討論**開發過程**。軟體生命週期中的開發過程涉及四個階段：*分析*、*設計*、*實作*和*測試*。開發過程有幾種模型。我們在此討論最常見的兩種：瀑布模型和增量模型。

**瀑布模型**
軟體開發過程的一個非常流行的模型稱為**瀑布模型**（圖 10.2）。在這個模型中，開發過程只朝一個方向流動。這意味著一個階段必須在前一個階段完成後才能開始。

例如，整個專案的分析階段應在設計階段開始之前完成。整個設計階段應在實作階段開始之前完成。
瀑布模型有優點也有缺點。一個優點是每個階段都在下一個階段開始之前完成。例如，負責設計階段的小組確切知道該做什麼，因為他們有分析階段的完整結果。測試階段可以測試整個系統，因為開發中的整個系統都已準備就緒。然而，瀑布模型的一個缺點是難以定位問題：如果在過程的一部分出現問題，則必須檢查整個過程。

**增量模型**
在**增量模型**中，軟體分一系列步驟開發。開發人員首先完成整個系統的簡化版本。此版本代表整個系統但不包括細節。圖 10.3 顯示了增量模型的概念。

在第二個版本中，添加了更多細節，同時有些仍未完成，並再次測試系統。如果有問題，開發人員知道問題出在新功能上。在現有系統正常運作之前，他們不會添加更多功能。此過程持續進行，直到添加了所有所需功能。

## 10.2 分析階段
開發過程始於**分析階段**。此階段產生一份規格文件，說明軟體將做*什麼*，但不指定*如何*做。分析階段可以使用兩種不同的方法，具體取決於實作階段是使用程序化程式語言還是物件導向語言。我們在本節簡要討論兩者。

### 10.2.1 程序導向分析
**程序導向分析**——也稱為*結構化分析*或*古典分析*——是如果系統實作階段將使用程序化語言時使用的分析過程。在這種情況下的規格可能使用多種建模工具，但我們在此僅討論其中幾種。

**資料流程圖**
**資料流程圖**顯示系統中資料的移動。它們使用四種符號：方框顯示資料的來源或目的地，圓角矩形顯示處理過程（對資料執行的動作），開口矩形顯示資料儲存的位置，箭頭顯示資料流向。
圖 10.4 顯示了一家小型旅館的預訂系統的簡化版本，該系統透過網際網路接受潛在客人的預訂，並根據可用空房確認或拒絕預訂。此圖中的一個過程（處理預訂）使用預訂檔案檢查可用性並接受或拒絕預訂。如果接受預訂，則將其記錄在預訂檔案中。

**實體關係圖**
分析階段使用的另一種建模工具是**實體關係圖**。由於此圖也用於資料庫設計，我們將在第 14 章討論它。

**狀態圖**
**狀態圖**（見附錄 B）提供了另一個有用的工具，通常用於系統中實體的狀態會因應事件而發生變化的情況。作為狀態圖的一個例子，我們展示了一部單人電梯的操作。當按下樓層按鈕時，電梯向請求的方向移動。在到達目的地之前，它不會回應任何其他請求。
圖 10.5 顯示了這部舊式電梯的狀態圖。電梯可以處於三種狀態之一：向上移動、向下移動或停泊。這些狀態中的每一個都在狀態圖中由圓角矩形表示。當電梯處於停泊狀態時，它接受請求。如果請求的樓層與當前樓層相同，則忽略該請求——電梯保持停泊狀態。如果請求的樓層高於當前樓層，電梯開始向上移動。如果請求的樓層低於請求的樓層，電梯開始向下移動。一旦移動，電梯保持在一種移動狀態，直到到達請求的樓層。

### 10.2.2 物件導向分析
**物件導向分析**是如果實作使用物件導向語言時使用的分析過程。在這種情況下的規格文件可能使用多種工具，但我們在此僅討論其中幾種。

**使用案例圖**
**使用案例圖**給出了系統的使用者視圖：它顯示了使用者如何與系統通訊。使用案例圖使用四個組件：系統、使用案例、參與者和關係。系統由矩形顯示，執行功能。系統中的動作由使用案例顯示，用圓角矩形表示。參與者是使用系統的人或事物。雖然參與者由火柴人表示，但它們不一定代表人類。
圖 10.6 顯示了我們在圖 10.5 中給出狀態圖的舊式電梯的使用案例圖。圖中的系統是電梯。唯一的參與者是電梯的使用者。有兩個使用案例：按下電梯按鈕（在每層樓的大廳）和按下電梯內的樓層按鈕。電梯在每層樓只有一個按鈕，向電梯發出信號以移動到該層。

**類別圖**
分析的下一步是為系統創建**類別圖**。例如，我們可以為我們的舊式電梯創建一個類別圖。為此，我們需要考慮系統中涉及的實體。在電梯系統中，我們有兩類實體：按鈕和電梯本身。因此，乍看之下，我們似乎有兩個類別：按鈕類別和電梯類別。然而，我們有兩種類型的按鈕：大廳裡的電梯按鈕和電梯內的樓層按鈕。那麼看來我們可以有一個按鈕類別和兩個繼承自按鈕類別的類別：電梯按鈕類別和樓層按鈕類別。因此，我們可以為電梯問題創建的第一個類別圖如圖 10.7 所示。
請注意，電梯按鈕類別和樓層按鈕類別是按鈕類別的子類別。然而，電梯類別與兩個按鈕類別（電梯按鈕和樓層按鈕）之間的關係是一對多關係（見附錄 B）。電梯系統的類別圖當然可以擴展，但我們將此留給軟體工程書籍。

**狀態圖 (State chart)**
類別圖定稿後，可以為類別圖中的每個類別準備一個**狀態圖**。物件導向分析中的狀態圖與程序導向分析中的狀態圖扮演相同的角色。這意味著對於圖 10.7 的類別圖，我們需要有一個四狀態圖。

## 10.3 設計階段
**設計階段**定義系統將*如何*完成在分析階段定義的*內容*。在設計階段，定義系統的所有組件。

### 10.3.1 程序導向設計
在**程序導向設計**中，我們既有程序又有資料要設計。我們討論一類專注於程序的設計方法。在程序導向設計中，整個系統被劃分為一組程序或模組。

**結構圖**
在程序導向設計中說明模組之間關係的常用工具是**結構圖**。例如，圖 10.5 中顯示其狀態圖的電梯系統可以設計為圖 10.8 中的結構圖所示的一組模組。結構圖在附錄 D 中討論。

**模組化**
**模組化**意味著將大型專案分解為易於理解和處理的較小部分。換句話說，模組化意味著將大任務劃分為可以相互通訊的小任務。上一節討論的結構圖顯示了電梯系統中的模組化。當系統被劃分為模組時，主要關注兩個問題：*耦合*和*內聚*。

**耦合 (Coupling)**
**耦合**是衡量兩個模組彼此綁定緊密程度的指標。耦合越緊密，它們就越不獨立。由於目標是使模組盡可能獨立，我們希望它們鬆散耦合。鬆散耦合是可取的，至少有三個原因。
- 鬆散耦合的模組更有可能被重複使用。
- 鬆散耦合的模組不太可能在相關模組中產生錯誤。
- 當系統需要修改時，鬆散耦合的模組允許我們僅修改需要更改的模組，而不影響不需要更改的模組。

**軟體系統中模組之間的耦合必須最小化。**

**內聚 (Cohesion)**
模組化的另一個問題是內聚。**內聚**是衡量系統中模組相關程度的指標。我們需要在軟體系統的模組之間擁有最大可能的內聚。

**軟體系統中模組之間的內聚必須最大化。**

### 10.3.2 物件導向設計
在**物件導向設計**中，設計階段透過詳細闡述類別的細節繼續進行。正如我們在第 9 章提到的，類別由一組變數（屬性）和一組方法（函式）組成。物件導向設計列出了這些**屬性**和**方法**的細節。圖 10.9 顯示了我們用於設計舊式電梯的四個類別的細節範例。

## 10.4 實作階段
在瀑布模型中，設計階段完成後，**實作階段**即可開始。在此階段，程式設計師為程序導向設計中的模組編寫程式碼，或編寫程式單元以實作物件導向設計中的類別。每種情況都有幾個問題要提及。

### 10.4.1 語言的選擇
在程序導向開發中，專案團隊需要從第 9 章討論的程序化語言中選擇一種或一組語言。雖然像 C++ 這樣的語言被認為既是程序化語言又是物件導向語言，但實作通常使用純程序化語言，如 C。在物件導向的情況下，C++ 和 Java 都很常見。

### 10.4.2 軟體品質
在實作階段創建的軟體品質是一個非常重要的問題。高品質的軟體系統是滿足使用者需求、符合組織營運標準並在為其開發的硬體上有效運行的系統。然而，如果我們想要獲得高品質的軟體系統，我們必須能夠定義一些品質屬性。

**軟體品質因素**
**軟體品質**可以分為三大類指標：*可操作性*、*可維護性*和*可轉移性*。這些指標中的每一個都可以進一步細分，如圖 10.10 所示。

**可操作性 (Operability)**
**可操作性**是指系統的基本操作。可以提到幾個可操作性的指標，如圖 10.10 所示：*準確性、效率、可靠性、安全性、及時性*和*可用性*。
- 不*準確*的系統比沒有系統更糟糕。因此，開發的任何系統都必須經過系統測試工程師和使用者的徹底測試。*準確性*可以透過平均故障間隔時間、每千行代碼的錯誤數和使用者請求更改的次數等指標來衡量。
- *效率*是一個主觀術語。在某些情況下，使用者會指定效能標準，例如必須在 95% 的時間內在 1 秒內收到即時回應。這當然是可以衡量的。
- *可靠性*實際上是其他因素的總和。如果使用者指望系統完成工作並對其充滿信心，那麼它很可能是可靠的。另一方面，一些指標直接說明了系統的可靠性，最顯著的是平均故障間隔時間。
- 系統的*安全性*是指未經授權的人員存取系統資料的難易程度。雖然這是一個主觀領域，但有一些清單可以協助評估系統的安全性。例如，系統是否擁有並要求密碼來識別使用者？
- 軟體工程中的*及時性*可以意味著幾件不同的事情。系統是否及時交付輸出？對於線上系統，回應時間是否滿足使用者的需求？
- *可用性*是另一個高度主觀的領域。可用性的最佳衡量標準是觀察使用者並看他們如何使用系統。使用者訪談通常會揭示系統可用性的問題。

**可維護性 (Maintainability)**
**可維護性**是指系統保持更新和正確運行的難易程度。許多系統需要定期更改，不是因為它們實作不佳，而是因為外部因素的變化。例如，公司的薪資系統可能需要經常更改以滿足政府法律法規的變化。
- *可變更性*是一個主觀因素。然而，經驗豐富的專案負責人能夠估計實作請求的變更需要多長時間。如果太長，可能表示系統難以更改。對於舊系統尤其如此。目前領域中有軟體測量工具可以估計程式的複雜性和結構。
- *可修正性*的一個衡量標準是*平均恢復時間*，即程式在失敗後恢復運作所需的時間。雖然這是一個被動定義，但目前沒有預測程式失敗時修正需要多長時間的指標。
- 使用者不斷請求更改系統。*靈活性*是一個定性屬性，試圖衡量進行這些更改的難易程度。如果程式需要完全重寫才能實現更改，則它不靈活。
- 我們可能認為*可測試性*是一個高度主觀的領域，但測試工程師有因素清單可以評估程式的可測試性。

**可轉移性 (Transferability)**
**可轉移性**是指將資料和/或系統從一個平台移動到另一個平台以及重複使用程式碼的能力。在許多情況下，這不是一個重要因素。另一方面，如果我們正在編寫通用軟體，它可能是至關重要的。
- 如果編寫模組以便可以在其他系統中重複使用，那麼它們就具有高水準的*可重用性*。優秀的程式設計師會建立函式庫，以便重複使用來解決類似的問題。
- *互操作性*是向其他系統發送資料的能力。在當今高度整合的系統中，這是一個理想的屬性。事實上，它變得如此重要，以至於作業系統現在支援在系統之間移動資料的能力，例如在文字處理器和試算表之間。
- *可移植性*是將軟體從一個硬體平台移動到另一個硬體平台的能力。

## 10.5 測試階段
**測試階段**的目標是找出錯誤，這意味著好的測試策略是能找出最多錯誤的策略。有兩種類型的測試：*玻璃箱*和*黑箱*（圖 10.11）。

### 10.5.1 玻璃箱測試
**玻璃箱測試**（或**白箱測試**）基於了解軟體的內部結構。測試目標是檢查以確定軟體的所有組件是否按設計執行。玻璃箱測試假設測試人員了解軟體的一切。在這種情況下，軟體就像一個玻璃箱，箱內的一切都可見。玻璃箱測試由軟體工程師或專門團隊完成。使用軟體結構的玻璃箱測試需要保證至少滿足以下四個標準：
- 每個模組中的所有獨立路徑至少測試一次。
- 所有決策建構（雙向和多向）在每個分支上都經過測試。
- 每個迴圈建構都經過測試。
- 所有資料結構都經過測試。
過去已經設計了幾種測試方法。我們簡要討論其中兩種：*基本路徑*測試和*控制結構*測試。

**基本路徑測試**
**基本路徑測試**由 Tom McCabe 提出。此方法創建一組測試案例，執行軟體中的*每個陳述式*至少一次。

**基本路徑測試是一種軟體中每個陳述式至少執行一次的方法。**

基本路徑測試使用*圖論*（見第 12 章）和*循環複雜度*來找出必須遵循的獨立路徑，以保證每個陳述式至少執行一次。

**控制結構測試**
**控制結構測試**比基本路徑測試更全面，並包含它。此方法使用不同類別的測試，簡要描述如下。
- **條件測試**：條件測試適用於模組中的任何條件表達式。*簡單條件*是一個關係表達式，而*複合條件*是簡單條件和邏輯運算子的組合（見第 9 章）。條件測試旨在檢查所有條件是否設定正確。
- **資料流測試**：資料流測試基於通過模組的資料流。這種類型的測試選擇涉及在賦值陳述式左側使用變數時檢查變數值的測試案例。
- **迴圈測試**：迴圈測試使用測試案例來檢查迴圈的有效性。所有類型的迴圈（*while*、*do* 和 *for*）都經過仔細測試。

### 10.5.2 黑箱測試
**黑箱測試**得名於在不知道軟體內部是什麼以及不知道它如何工作的情況下測試軟體的概念。換句話說，軟體就像一個黑箱，測試人員看不到裡面。黑箱測試根據軟體應該完成的任務（例如其輸入和輸出）來測試軟體的功能。黑箱測試使用了幾種方法，討論如下。

**窮舉測試**
最好的黑箱測試方法是針對輸入域中的所有可能值測試軟體。然而，在複雜軟體中，輸入域如此巨大，以至於這樣做通常是不切實際的。

**隨機測試**
在隨機測試中，選擇輸入域中的值子集進行測試。非常重要的是，子集的選擇方式應使值分佈在輸入域上。在這種情況下，使用隨機數生成器會非常有幫助。

**邊界值測試**
遇到邊界值時經常發生錯誤。例如，如果模組定義其輸入之一必須大於或等於 100，則測試該模組的邊界值 100 非常重要。如果模組在這個邊界值失敗，可能是模組代碼中的某個條件（如 x > 100）被寫成了 x >= 100。

## 10.6 文件
為了正確使用和有效維護軟體，需要文件。通常，為軟體準備三套獨立的文件：使用者文件、系統文件和技術文件。然而，請注意，文件是一個持續的過程。如果軟體在發布後出現問題，也必須記錄下來。如果修改了軟體，所有修改及其與原始套件的關係也必須記錄下來。只有當套件過時，文件才會停止。

**文件是一個持續的過程。**

### 10.6.1 使用者文件
為了正確運行軟體系統，使用者需要文件，傳統上稱為*使用者指南*，它逐步顯示如何使用軟體。使用者指南通常包含教學部分，引導使用者了解軟體的每個功能。
好的使用者指南可以成為非常強大的行銷工具：使用者文件在行銷中的重要性怎麼強調都不為過。使用者指南應為新手和專家使用者編寫，擁有良好使用者文件的軟體系統肯定會增加銷售量。

### 10.6.2 系統文件
**系統文件**定義了軟體本身。它的編寫應使軟體可以由原始開發人員以外的人員維護和修改。系統開發的所有四個階段都應存在系統文件。
在分析階段，收集的資訊應仔細記錄。此外，分析師應定義資訊來源。此階段選擇的需求和方法必須清楚說明其背後的理由。
在設計階段，必須記錄最終副本中使用的工具。例如，如果圖表經過多次更改，則應記錄圖表的最終副本並附上完整的解釋。
在實作階段，代碼的每個模組都應記錄下來。此外，代碼應盡可能使用註解和描述性標頭進行自我記錄。
最後，開發人員必須仔細記錄測試階段。應用於最終產品的每種測試類型都應連同其結果一起提及。即使是不利的結果和產生它們的資料也必須記錄下來。

### 10.6.3 技術文件
**技術文件**描述軟體系統的安裝和服務。安裝文件定義應如何在每台電腦（例如伺服器和客戶端）上安裝軟體。服務文件定義應如何維護系統並在必要時進行更新。

## 10.7 章末材料
### 10.7.1 推薦閱讀
- Braude, E. *Software Engineering – An Object-Oriented Perspective*, New York: Wiley, 2001
- Gustafson, D. *Software Engineering*, New York: McGraw-Hill, 2002
- Lethbridge, T. and Laganiere, R. *Object-Oriented Software Engineering*, New York: McGraw-Hill, 2005
- Pressman, R. *Software Engineering: A Practitioner’s Approach*, New York: McGraw-Hill, 2005
- Schach, S. *Object-Oriented and Classical Software Engineering*, New York: McGraw-Hill, 2007

### 10.7.2 關鍵詞
- 分析階段 (analysis phase)
- 屬性 (attribute)
- 基本路徑測試 (basis path testing)
- 黑箱測試 (black-box testing)
- 類別圖 (class diagram)
- 內聚 (cohesion)
- 控制結構測試 (control structure testing)
- 耦合 (coupling)
- 資料流程圖 (data flow diagram)
- 設計階段 (design phase)
- 開發過程 (development process)
- 實體關係圖 (entity–relationship diagram)
- 玻璃箱測試 (glass-box testing)
- 實作階段 (implementation phase)
- 增量模型 (incremental model)
- 可維護性 (maintainability)
- 模組化 (modularity)
- 物件導向分析 (object-oriented analysis)
- 物件導向設計 (object-oriented design)
- 可操作性 (operability)
- 程序導向分析 (procedure-oriented analysis)
- 程序導向設計 (procedure-oriented design)
- 軟體工程 (software engineering)
- 軟體生命週期 (software lifecycle)
- 軟體品質 (software quality)
- 狀態圖 (state chart)
- 狀態圖 (state diagram)
- 結構圖 (structure chart)
- 技術文件 (technical documentation)
- 可測試性 (testability)
- 測試階段 (testing phase)
- 可轉移性 (transferability)
- 使用案例圖 (use-case diagram)
- 瀑布模型 (waterfall model)
- 白箱測試 (white-box testing)

### 10.7.3 摘要
- 軟體生命週期是軟體工程中的一個基本概念。軟體像許多其他產品一樣，會經歷一個重複階段的循環。
- 軟體生命週期中的開發過程涉及四個階段：分析、設計、實作和測試。已有多種模型用於這些階段。我們討論了最常見的兩種：瀑布模型和增量模型。
- 開發過程始於分析階段。分析師準備一份規格文件，說明軟體將做什麼，但不指定如何做。分析階段可以通過兩種方式完成：程序導向分析和物件導向分析。
- 設計階段定義系統將如何完成在分析階段定義的內容。在程序導向設計中，整個專案被劃分為一組程序或模組。在物件導向設計中，設計階段透過詳細闡述類別的細節繼續進行。
- 模組化意味著將大型專案分解為易於理解和處理的較小部分。當系統被劃分為模組時，兩個問題很重要：耦合和內聚。耦合是衡量兩個模組彼此綁定緊密程度的指標。軟體系統中模組之間的耦合必須最小化。內聚是衡量系統中模組相關程度的指標。軟體系統中模組之間的內聚應最大化。
- 在實作階段，程式設計師為程序導向設計中的模組編寫程式碼，或編寫程式單元以實作物件導向設計中的類別。
- 軟體品質很重要。軟體品質可以分為三大類指標：可操作性、可維護性和可轉移性。
- 測試階段的目標是找出錯誤。有兩種類型的測試：玻璃箱和黑箱。玻璃箱測試（或白箱測試）基於了解軟體的內部結構。玻璃箱測試假設測試人員了解一切。黑箱測試意味著在不知道軟體內部是什麼以及不知道它如何工作的情況下測試軟體。

## 10.8 練習題
### 10.8.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 10.8.2 複習問題
1. 定義「軟體生命週期」。
2. 區分瀑布模型和增量開發模型。
3. 列出開發過程中的四個階段。
4. 定義分析階段的目的並描述此階段的兩個趨勢。
5. 定義設計階段的目的並描述此階段的兩個趨勢。
6. 描述模組化並提及兩個與模組化相關的問題。
7. 區分耦合和內聚。
8. 定義實作階段的目的並描述此階段的品質問題。
9. 定義測試階段的目的並列出兩類測試。
10. 區分玻璃箱測試和黑箱測試。

### 10.8.3 問題
1. 在第 9 章中，我們解釋了常數值的使用優於字面值。這種偏好對軟體生命週期有什麼影響？
2. 在第 9 章中，我們展示了兩個模組之間的通訊可以透過傳值或傳參考進行。哪種方法在兩個模組之間提供較少的耦合？
3. 在第 9 章中，我們展示了兩個模組之間的通訊可以透過傳值或傳參考進行。哪種方法在兩個模組之間提供更多的內聚？
4. 為一個簡單的圖書館繪製使用案例圖。
5. 為一家小型雜貨店繪製使用案例圖。
6. 顯示簡單數學公式 $x + y$ 的資料流程圖。
7. 顯示簡單數學公式 $x \\times y + z \\times t$ 的資料流程圖。
8. 顯示圖書館的資料流程圖。
9. 顯示小型雜貨店的資料流程圖。
10. 為問題 P10-8 創建結構圖。
11. 為問題 P10-9 創建結構圖。
12. 顯示固定容量堆疊的狀態圖（見第 12 章）。
13. 顯示固定容量佇列的狀態圖（見第 12 章）。
14. 為圖書館創建類別圖。
15. 為小型雜貨店創建類別圖。
16. 顯示問題 P10-14 中類別的詳細資訊。
17. 顯示問題 P10-15 中類別的詳細資訊。
18. 程式的輸入資料由 1000 到 1999（含）範圍內的三個整數組合組成。找出測試這些數字所有組合的窮舉測試數量。
19. 列出問題 P10-18 所需的邊界值測試。
20. 隨機數生成器生成 0 到 0.999 之間的數字。如何使用此隨機數生成器對問題 P10-18 中描述的系統進行隨機測試。
`
};
