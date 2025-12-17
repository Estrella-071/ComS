

export const chapter17Content = {
  en: `
# Chapter 17: Theory of Computation

In Chapters 1 through 16, we considered a computer as a problem-solving machine. In this chapter, we answer some questions such as: which problems can be solved by a computer? Is one language superior to another? Before running a program, can it be determined whether the program will halt (terminate) or run forever? How long does it take to solve a problem using a particular language? To answer these questions, we turn to a discipline called the theory of computation.

## Objectives
After studying this chapter, the student should be able to:
- Describe a programming language we call Simple Language and define its basic statements.
- Write macros in Simple Language using the combination of simple statements.
- Describe the components of a Turing machine as a computation model.
- Show how simple statements in Simple Language can be simulated using a Turing machine.
- Understand the Church–Turing thesis and its implication.
- Define the Gödel number and its application.
- Understand the concept of the halting problem and how it can be proved that this problem is unsolvable.
- Distinguish between solvable and unsolvable problems.
- Distinguish between polynomial and nonpolynomial solvable problems.

## 17.1 SIMPLE LANGUAGE
We can define a computer language with only three statements: the **increment statement**, the **decrement statement**, and the **loop statement** (Figure 17.1). In this language, the only data type we use is nonnegative integers. There is no need for any other data type, because the goal of the chapter is merely to demonstrate some ideas in computation theory. The language uses only a few symbols such as '{' and '}'.

### 17.1.1 Increment statement
The increment statement adds 1 to a variable. The format is shown in Algorithm 17.1.

**Algorithm 17.1 The increment statement**
\`\`\`text
incr (X)
\`\`\`

### 17.1.2 Decrement statement
The decrement statement subtracts 1 from a variable. The format is shown in Algorithm 17.2.

**Algorithm 17.2 The decrement statement**
\`\`\`text
decr (X)
\`\`\`

### 17.1.3 Loop statement
The loop statement repeats an action (or a series of actions) while the value of the variable is not 0. The format is shown in Algorithm 17.3.

**Algorithm 17.3 The loop statement**
\`\`\`text
while (X)
{
  decr (X)
  Body of the loop
}
\`\`\`

### 17.1.4 The power of the simple language
It can be shown that this simple programming language with only three statements is as powerful—although not necessarily as efficient—as any sophisticated language in use today, such as C. To do so, we show how we can simulate several statements found in some popular languages.

**Macros in Simple Language**
We call each simulation a **macro** and use it in other simulations without the need to repeat code. A *macro* (short for *macroinstruction*) is an instruction in a high-level language that is equivalent to a specific set of one or more ordinary instructions in the same language.

**First macro: X ← 0**
Algorithm 17.4 shows how to use the statements in Simple Language to assign 0 to a variable X. It is sometimes called *clearing* a variable.

**Algorithm 17.4 Macro X ← 0**
\`\`\`text
while (X)
{
  decr (X)
}
\`\`\`

**Second macro: X ← n**
Algorithm 17.5 shows how to use the statements in Simple Language to assign a positive integer $n$ to a variable X. First clear the variable X, then increment X $n$ times.

**Algorithm 17.5 Macro X ← n**
\`\`\`text
X ← 0
incr (X)
incr (X)
...
incr (X)
// The statement incr (X) is repeated n times.
\`\`\`

**Third macro: Y ← X**
Algorithm 17.6 simulates the macro Y ← X in Simple Language. Note that we can use an extra line of code to restore the value of X.

**Algorithm 17.6 Macro Y ← X**
\`\`\`text
Y ← 0
while (X)
{
  decr (X)
  incr (Y)
}
\`\`\`

**Fourth macro: Y ← Y + X**
Algorithm 17.7 simulates the macro Y ← Y + X in Simple Language. Again, we can use more code lines to restore the value of X to its original value.

**Algorithm 17.7 Macro Y ← Y + X**
\`\`\`text
while (X)
{
  decr (X)
  incr (Y)
}
\`\`\`

**Fifth macro: Y ← Y × X**
Algorithm 17.8 simulates the macro Y ← Y × X in Simple Language. We can use the addition macro because integer multiplication can be simulated by repeated addition. Note that we need to preserve the value of X in a temporary variable, because in each addition we need the original value of X to be added to Y.

**Algorithm 17.8 Macro Y ← Y × X**
\`\`\`text
TEMP ← Y
Y ← 0
while (X)
{
  decr (X)
  Y ← Y + TEMP
}
\`\`\`

**Sixth macro: Y ← Y^X**
Algorithm 17.9 simulates the macro Y ← Y^X in Simple Language. We do this using the multiplication macro because integer exponentiation can be simulated by repeated multiplication.

**Algorithm 17.9 Macro Y ← Y^X**
\`\`\`text
TEMP ← Y
Y ← 1
while (X)
{
  decr (X)
  Y ← Y × TEMP
}
\`\`\`

**Seventh macro: if X then A**
Algorithm 17.10 simulates the seventh macro in Simple Language. This macro simulates the decision-making (*if*) statement of modern languages. In this macro, the variable X has only one of the two values 0 or 1. If the value of X is not 0, A (an action or a series of actions) is executed in the loop. However, the loop is executed only once because, after the first iteration, the value of X becomes 0 and we come out of the loop. If the value of X is originally 0, the loop is skipped.

**Algorithm 17.10 Macro if X then A**
\`\`\`text
while (X)
{
  decr (X)
  A
}
\`\`\`

**Other macros**
It is obvious that we need more macros to make Simple Language compatible with contemporary languages. Creating other macros is possible, although not trivial.

**Input and output**
In this simple language the statement *read X* can be simulated using (X ← n). We also simulate the output by assuming that the last variable used in a program holds what should be printed. Remember that this is not a practical language, it is merely designed to prove some theorems in computer science.

## 17.2 THE TURING MACHINE
The **Turing machine** was introduced in 1936 by Alan M. Turing to solve computable problems, and is the foundation of modern computers. In this section we introduce a very simplified version of the machine to show how it works.

### 17.2.1 Turing machine components
A Turing machine is made of three components: a tape, a controller, and a read/write head (Figure 17.2).

**Tape**
Although modern computers use a random-access storage device with finite capacity, we assume that the Turing machine’s memory is infinite. The tape, at any one time, holds a sequence of characters from the set of characters accepted by the machine. For our purpose, we assume that the machine can accept only two symbols: a blank (**b**) and digit **1**. Figure 17.3 shows an example of data on a tape in this machine.

The left-hand blank defines the beginning of the nonnegative integers stored on the tape. The integer is represented by a string of 1s, and the right-hand blank defines the end of the integer. The rest of the tape contains blank characters. If more than one integer are stored on the tape, they are separated by at least one blank character.
We also assume that the tape processes only positive integer data represented in unary arithmetic. In this arithmetic, a positive integer is made up only of 1s. For example, the integer 4 is represented as 1111 (four 1s) and the integer 7 is represented as 1111111 (seven 1s). The absence of 1s represents 0.

**Read/write head**
The **read/write head** at any moment points to one symbol on the tape. We call this symbol the *current* symbol. The read/write head reads and writes one symbol at a time from the tape. After reading and writing, it moves to the left or to the right. Reading, writing, and moving are all done under instructions from the controller.

**Controller**
The **controller** is the theoretical counterpart of the central processing unit (CPU) in modern computers. It is a **finite state automaton**, a machine that has a predetermined finite number of states and moves from one state to another based on the input. At any moment, it can be in one of these states.
Figure 17.4 shows the transition state diagram for a simple controller as a finite state automaton. In this figure, the automaton has only three states (A, B, and C), although a controller normally has many states. The diagram shows the change of state as a function of the character read. The expression on each line, *x/y/L*, *x/y/R*, and *x/y/N*, shows that if the controller has read the symbol *x*, it writes the symbol *y* (overwrites *x*), and the read/write head moves to the left (L), right (R), or does not move (N). Note that since the symbols on the tape can be only a blank or the digit 1, there should be two paths out of each state: one if the blank symbol is read and one if the digit 1 is read. The beginning of the line (called the *transition line*) shows the current state and the end of the line (arrow head) shows the next state.

We can create a transition table (Table 17.1) in which each row relates to one state. The table will have five columns: current state, the symbol that is read, the symbol to write, the direction of movement of the head, and the next symbol. Since the machine can only go through a finite number of states, we can create an instruction set like the one we create for the Simple Computer in Chapter 5.

**Table 17.1 Transition table**
| Current State | Read | Write | Move | New State |
| :--- | :--- | :--- | :--- | :--- |
| A | b | b | R | A |
| A | 1 | 1 | R | B |
| B | b | 1 | R | B |
| B | 1 | b | N | C |
| C | b | b | L | A |
| C | 1 | 1 | L | B |

The instructions put together the value of five columns in each row. For this elementary machine, we have only six instructions:
1. (A, b, b, R, A)
2. (A, 1, 1, R, B)
3. (B, b, 1, R, B)
4. (B, 1, b, N, C)
5. (C, b, b, L, A)
6. (C, 1, 1, L, B)

For example, the first instruction says that if the machine is in state A and has read the symbol b, it overwrites the symbol with a new b, moves to the next symbol to the right, and the machine transitions to state A—that is, remains in the same state.

> **Example 17.1**
> A Turing machine has only two states and the following four instructions:
> 1. (A, b, b, L, A)
> 2. (A, 1, 1, R, B)
> 3. (B, b, b, L, A)
> 4. (B, 1, b, R, A)
> If the machine starts with the configuration shown in Figure 17.5 (Controller state A, pointing to first 1 in sequence 'b 1 1 1 1 b'), what is the configuration of the machine after executing one of the above instructions? Note that the machine can only execute one of the instructions, the one that matches the current state and the current symbol.
>
> **Solution**
> The machine is in state A and the current symbol is 1, which means that only the second instruction, (A, 1, 1, R, B) can be executed. The new configuration is also shown in Figure 17.5. Note that the state of the controller has been changed to B and the read/write head has moved one symbol to the right.

### 17.2.2 Simulating Simple Language
We can now write programs that implement the statements of Simple Language. Note that these statements can be written in many different ways: we have chosen the simplest or most convenient for our educational purpose, but they are not necessarily the best ones.

**Increment statement**
Figure 17.6 shows the Turing machine for the **incr (X)** statement. The controller has four states, S1 through S4. State S1 is the starting state, state S2 is the moving-right state, state S3 is the moving-left state, and state S4 is the halting state. If the machine reaches the halting state, it stops: there is no instruction that starts with this state.

Figure 17.6 also shows the program for the incr (X) statement. It has only five instructions. The process starts from the blank symbol at the left of X (data to be incremented), moves right over all 1s until it reaches the blank symbol at the right of X. It changes this blank to 1. It then moves left over all 1s until it reaches the blank at the left again. At this point it halts. Note that we have also written the program to move the read/write head back to the blank symbol to the left of X, which is necessary if more operations are to be performed on X.

> **Example 17.2**
> Show how the Turing machine can increment X when X = 2.
>
> **Solution**
> Figure 17.7 shows the solution. The value of X (11 in the unary system) is stored between the two blank symbols. It takes seven steps for the machine to increment X and return the read/write head to its original position. Steps 1 to 4 move the read/write head to the end of X. Steps 5 to 7 change the blank at the end and move the read/write head back to where it was before.

**Decrement statement**
We implement the **decr (X)** statement using the minimum number of instructions. The reason is that we need to use this statement in the next statement, the *while* loop, which will also be used to implement all macros. Figure 17.8 shows the Turing machine for this statement. The controller has three states, S1, S2, and S3. Statement S1 is the starting state. State S2 is the checking statement, which checks to see if the current symbol is 1 or b. If it is b, the statement goes to the halting state: if the next symbol is 1, the second statement changes it to b and goes to the halting state. Figure 17.8 also shows the program for this statement.

> **Example 17.3**
> Show how the Turing machine can decrement X when X = 2.
>
> **Solution**
> Figure 17.9 shows the situation. The machine starts at the blank to the left of the data and changes the next symbol to blank if it is 1. The read/write head stops over the blank character to the left of the resulting data. This is the same arrangement as with the increment statement. Note that we could have moved the read/write head to the end of the data and deleted the last 1 instead of the first one, but that program would be much longer than our version. Since we need this statement in every loop statement, we have used the shorter version to save the number of instructions. We use the short version of this statement in the *while* loop statement that we develop next.

**Loop statement**
To simulate the loop, we assume that X and the data to be processed by the body of the loop are stored on the tape separated by a single blank symbol. Figure 17.10 shows the table, the program, and the state transition diagram for a general loop statement.

The three states S1, S2, and S3 control the loops by determining X and exiting the loop if X = 0. Compare these three statements to the three statements used in the decrement statement in Figure 17.8. The state MR moves the read/write head over the blank symbol that defines the start of the data at the beginning of processing data in each iteration, the state ML moves the read/write head over the blank symbol defining the start of the X at the end of processing in each iteration. The state BS (*body start*) defines the beginning state of the body of the loop, while the state BH (*body halt*) defines the halting state for the body of the loop. The body of the loop may have several states between these two states.

Figure 17.10 also shows the repetitive nature of the statement. The state diagram itself is a loop that is repeated as long as the value of X is not zero. When the value of X becomes 0, the loop stops and state S3, the halting state, is reached.

> **Example 17.4**
> Let us show a very simple example. Suppose we want to simulate the fourth macro, Y ← Y + X (page 454). As we discussed before, this macro can be simulated using the while statement in Simple Language:
> \`\`\`text
> while (X)
> {
>   decr (X)
>   incr (Y)
> }
> \`\`\`
> To make the procedure shorter, we assume that X = 2 and Y = 3, so the result is Y = 5. Figure 17.11 shows the state of the tape before and after applying the macro. Note that in this program we erase the value of X to make the process shorter, but the original value of X can be preserved if we allow other symbols on the tape.
> Since X = 2, the program goes through two iterations. At the end of the first iteration, the value of X = 1 and the value of Y = 4. At the end of the second iteration, the value of X = 0 and the value of Y = 5.

### 17.2.3 The Church–Turing thesis
We have shown that a Turing machine can simulate the three basic statements in Simple Language. This means that the Turing machine can also simulate all the macros we defined for Simple Language. Can the Turing machine therefore solve any problem that can be solved by a computer? The answer to this question can be found in the Church–Turing thesis.

**The Church–Turing Thesis**
**If an algorithm exists to do a symbol manipulation task, then a Turing machine exists to do that task.**

Based on this claim, any symbol-manipulation task that can be done by writing an algorithm to do so can also be done by a Turing machine. Note that this is only a *thesis*, not a *theorem*. A theorem can be proved mathematically, a thesis cannot. Although this thesis probably can never be proved, there are strong arguments in its favor. First, no algorithms have been found that cannot be simulated using a Turing machine. Second, it has been proven that all computing models that have been mathematically proved are equivalent to the Turing machine model.

## 17.3 GÖDEL NUMBERS
In theoretical computer science, an unsigned number is assigned to every program that can be written in a specific language. This is usually referred to as the **Gödel number**, named after the Austrian mathematician Kurt Gödel.

This assignment has many advantages. First, programs can be used as a single data item as input to other programs. Second, programs can be referred to by just their integer representations. Third, the numbering can be used to prove that some problems cannot be solved by a computer, by showing that the total number of problems in the world is much larger than the total number of programs that can ever be written.

Different methods have been devised for numbering programs. We use a very simple transformation to number programs written in our Simple Language. Simple Language uses only fifteen symbols (Table 17.2).

**Table 17.2 Code for symbols used in Simple Language**
| Symbol | Hex code | Symbol | Hex code |
| :--- | :--- | :--- | :--- |
| 1 | 1 | 9 | 9 |
| 2 | 2 | incr | A |
| 3 | 3 | decr | B |
| 4 | 4 | while | C |
| 5 | 5 | { | D |
| 6 | 6 | } | E |
| 7 | 7 | X | F |
| 8 | 8 | | |

Note that in this language we use only X, X1, X2, …, X9 as variables. To encode these variables, we handle Xn as two symbols X and n (X3 is X and 3). If we have a macro with other variables, they need to be changed to Xn.

### 17.3.1 Representing a program
Using the table, we can represent any program written in Simple Language by a unique positive integer by following these steps:
1.  Replace each symbol with the corresponding hexadecimal code from the table.
2.  Interpret the resulting hexadecimal number as an unsigned integer.

> **Example 17.5**
> What is the Gödel number for the program \`incr X\`?
>
> **Solution**
> Replace each symbol by its hexadecimal code.
> \`incr X\` → (AF)16 → 175
> So this program can be represented by the number 175.

### 17.3.2 Interpreting a number
To show that the numbering system is unique, use the following steps to interpret a Gödel number:
1.  Convert the number to hexadecimal.
2.  Interpret each **hexadecimal digit** as a symbol using Table 17.2 (ignore a 0).

Note that while any program written in Simple Language can be represented by a number, not every number can be interpreted as a valid program. After conversion, if the symbols do not follow the syntax of the language, the number is not a valid program.

> **Example 17.6**
> Interpret 3058 as a program.
>
> **Solution**
> Change the number to hexadecimal and replace each digit with the corresponding symbol:
> 3058 → (BF2)16 → decr X 2 → decr (X2)
> This means that the equivalent code in Simple Language is \`decr (X2)\`. Note that in Simple Language, each program includes input and output. This means that the combination of a program and its inputs defines the Gödel number.

## 17.4 THE HALTING PROBLEM
Almost every program written in a programming language involves some form of repetition—loops or recursive functions. A repetition construct may never terminate (halt): that is, a program can run forever if it has an infinite loop. For example, the following program in Simple Language never terminates:
\`\`\`text
X → 1
while (X)
{
}
\`\`\`

A classical programming question is:
**Can we write a program that tests whether or not any program, represented by its Gödel number, will terminate?**

The existence of this program would save programmers a lot of time. Running a program without knowing if it halts or not is a tedious job. Unfortunately, it has now been proven that such a program cannot exist—much to the disappointment of programmers!

### 17.4.1 The halting problem is not solvable
Instead of saying that the testing program does not exist and can never exist, the computer scientist says ‘The **halting problem** is not solvable’.

**Proof**
Let us give an informal proof about the nonexistence of this testing program. Our method, called *proof by contradiction*, is often used in mathematics: we assume that the program does exist, then show that its existence creates a contradiction—therefore, it cannot exist. We use three steps to show the proof in this approach.

**Step 1**
In this step, we assume that a program, called Test, exists. It can accept any program such as $P$, represented by its Gödel number, as input, and outputs either 1 or 0. If $P$ terminates, the output of Test is 1: if $P$ does not terminate, the output of Test is 0 (see Figure 17.12).

**Step 2**
In this step, we create another program called Strange that is made of two parts: a copy of Test at the beginning and an empty loop—a loop with an empty body—at the end. The loop uses X as the testing variable, which is actually the output of the Test program. This program also uses $P$ as the input. We call this program Strange for the following reason: if $P$ terminates, the first part of Strange, which is a copy of Test, outputs 1. This 1 is input to the loop. The loop does not terminate—it’s an infinite loop—and consequently Strange does not terminate. If $P$ does not terminate, the first part of Strange, which is a copy of Test, outputs 0. This 0 is input to the loop, so the loop does terminate—it’s now a finite loop, the loop never iterates—and consequently, Strange does terminate. In other words, we have these strange situations:
- If $P$ terminates, Strange does not terminate.
- If $P$ does not terminate, Strange terminates.

**Step 3**
Having written the program Strange, we test it with itself (its Gödel number) as input. This is legitimate because we did not put any restrictions on $P$.
If we assume that Test exists, we have the following contradictions:
- Strange does not terminate if Strange terminates.
- Strange terminates if Strange does not terminate.
This proves that the Test program cannot exist and that we should stop looking for it, so…
**The halting problem is unsolvable.**

The unsolvability of the halting program has proved that many other programs are also unsolvable, because if they are solvable, then the halting problem is solvable—which it is not.

## 17.5 THE COMPLEXITY OF PROBLEMS
Now that we have shown that at least one problem is unsolvable by a computer, we’ll touch on this important issue a bit more. In computer science, we can say that, in general, problems can be divided into two categories: **solvable problems** and **unsolvable problems**. The solvable problems can themselves be divided into two categories: **polynomial** and **nonpolynomial** problems (Figure 17.15).

### 17.5.1 Unsolvable problems
There are an infinite number of problems that cannot be solved by a computer: one is the halting problem. One method to prove that a problem is not solvable is to show that if that problem is solvable, the halting problem is solvable too. In other words, prove that the solvability of a problem results in the solvability of the halting problem.

### 17.5.2 Solvable problems
There are many problems that can be solved by a computer. However, we often want to know how *long* it takes for the computer to solve that problem. In other words, how complex is the program?
The complexity of a program can be measured in several different ways, such as its run time, the memory it needs, and so on. One approach is the program’s run time—how long does the program take to run?

**Complexity of solvable problems**
One way to measure the complexity of a solvable problem is to find the number of operations executed by the computer when it runs the program. In this way, the complexity measure is independent of the speed of the computer that runs the program. This measure of complexity can depend on the number of inputs. For example, if a program is processing a list, such as sorting it, the complexity depends on the number of elements in the list.

**Big-O notation**
With the speed of computers today, we are not as concerned with exact numbers as with general orders of magnitude. For example, if the analysis of two programs shows that one executes 15 operations (or a set of operations) while the other executes 25, they are both so fast that we can’t see the difference. On the other hand, if the numbers are 15 versus 1500, we should be concerned.
This simplification of efficiency is known as **big-O notation**. We present the idea of this notation without delving into its formal definition and calculation. In big-O notation, the number of operations—or a set of related operations—is given as a function of the number of inputs. The notation O(n) means a program does $n$ operations for $n$ inputs, while the notation O($n^2$) means a program does $n^2$ operations for $n$ inputs.

> **Example 17.7**
> Imagine we have written three different programs to solve the same problem. The first one has a complexity of O($\\log_{10} n$), the second O($n$), and the third O($n^2$). Assuming 1 million inputs, how long does it take to execute each of these programs on a computer that executes one instruction in one microsecond, that is, one million instructions per second?
>
> **Solution**
> The following shows the analysis:
> *   1st program: $n = 1000000$, O($\\log_{10} n$) → 6. Time → 6 µs
> *   2nd program: $n = 1000000$, O($n$) → 1000000. Time → 1 sec
> *   3rd program: $n = 1000000$, O($n^2$) → $10^{12}$. Time → 277 hours

**Polynomial problems**
If a program has a complexity of O(log $n$), O($n$), O($n^2$), O($n^3$), O($n^4$), or O($n^k$), where $k$ is a constant, it is called **polynomial**. With the speed of computers today, we can get solutions to **polynomial problems** with a reasonable number of inputs, for example 1000 to 1 million.

**Non polynomial problems**
If a program has a complexity that is greater than a polynomial—for example, O($10^n$) or O($n!$)—it can be solved if the number of inputs is very small, such as fewer than 100. If the number of inputs is large, one could sit in front of the computer for months to see the result of a **nonpolynomial problem**. But who knows? At the rate at which the speed of computers is increasing, we may be able to get a result for this type of problem in less time.

## 17.6 END-CHAPTER MATERIALS
### 17.6.1 Recommended reading
For more details about the subjects discussed in this chapter, the following books are recommended:
- Hennie, F. *Introduction to Computability*, Reading, MA: Addison-Wesley, 1977
- Hofstadter, D. *Gödel, Escher, Bach: An Eternal Golden Braid*, St. Paul, MN: Vintage, 1980
- Hopcroft, J., Motwani, R. and Ullman, J. *Introduction to Automata Theory, Languages, and Computation*, Reading, MA: Addison-Wesley, 2006
- Kfoury, A., Moll, R. and Michael, A. *A Programming Approach to Computability*, New York: Springer, 1982
- Minsky, M. *Computation: Finite and Infinite Machines*, Engelwood Cliffs, NJ: Prentice-Hall, 1967
- Sipser, M. *Introduction to the Theory of Computation*, Boston, MA: Course Technology, 2005

### 17.6.2 Key terms
- big-O notation
- Church–Turing thesis
- controller
- decrement statement
- finite state automaton
- Gödel number
- halting problem
- hexadecimal digit
- increment statement
- loop statement
- macro
- nonpolynomial problem
- polynomial problem
- read/write head
- solvable problem
- Turing machine
- unsolvable problem

### 17.6.3 Summary
- We can define a computer language with only three statements: the increment statement, the decrement statement, and the loop statement. The increment statement adds 1 to a variable, the decrement statement subtracts 1 from a variable, and the loop statement repeats an action or a series of actions while the value of a variable is not 0.
- It can be shown that this simple programming language can simulate several statements found in some popular languages. We call each simulation a macro and use it in other simulations without the need to repeat code.
- The Turing machine was designed to solve computable problems. It is the foundation of modern computers. A Turing machine is made of three components: a tape, a controller, and a read/write head.
- Based on the Church–Turing thesis, if an algorithm to do a symbol manipulation task exists, then a Turing machine to do that task also exists.
- In theoretical computer science, an unsigned number is assigned to every program that can be written in a specific language. This is usually referred to as the Gödel number.
- A classical programming question is whether a program that can determine if another program halts can be constructed. Unfortunately, it has now been proved that this program cannot exist: the halting problem is not solvable.
- In computer science, problems can be divided into two categories: solvable problems and unsolvable problems. The solvable problems can themselves be divided into two categories: polynomial and non polynomial problems.

## 17.7 PRACTICE SET
### 17.7.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 17.7.2 Review questions
1. Name and describe the functions of the three basic statements that are the foundation of other statements in Simple Language.
2. Show how assigning the value of one variable to another uses the three basic statements.
3. What is the relationship between the Turing machine and our Simple Language?
4. What are the components of the Turing machine and what is the function of each component?
5. Describe one way to delimit the data on a Turing machine’s tape.
6. When a read/write head in a Turing machine finishes reading and writing a symbol, what are its next options?
7. How is a transition state diagram related to a Turing machine controller?
8. How is a transition state diagram related to a transition table? Do they have the same information? Which has more information?
9. What is a Gödel number? How do we use a Gödel number to prove that the halting problem is not solvable?
10. Compare and contrast the complexity of a polynomial solvable problem and a non polynomial solvable problem.

### 17.7.3 Problems
1. Rewrite Algorithm 17.6 (Y ← X) so that it preserves the value of X.
2. Rewrite Algorithm 17.7 so that it calculates Z ← Y + X while preserving the values of X and Y.
3. Rewrite Algorithm 17.8 so that it calculates Z ← Y × X while preserving the values of X and Y.
4. Rewrite Algorithm 17.9 so that it calculates Z ← Y^X while preserving the values of X and Y.
5. Simulate the following macro using the previously defined statements or macros in Simple Language: Y ← Y - X.
6. Simulate the following macro using the previously defined statements or macros in the Language (X can be only 0 or 1):
   \`\`\`text
   if (X) then
   {
     A1
   }
   else
   {
     A2
   }
   \`\`\`
7. Given a Turing machine with a single instruction (A, 1, b, R, B) and the tape configuration:
   ... b 1 1 1 b ...
   (pointing to first 1)
   show the final configuration of the tape.
8. Given a Turing machine with a single instruction (A, b, b, R, B) and the tape configuration:
   ... b 1 1 1 b ...
   (pointing to first b)
   show the final configuration of the tape.
9. Given a Turing machine with five instructions (A, b, b, R, B), (B, 1, #, R, B), (B, b, b, L, C), (C, #, 1, L, C), (C, b, b, R, B) and the tape configuration:
   ... b 1 1 1 b ...
   (pointing to first b)
   show the final configuration of the tape.
10. Show the state diagram of a Turing machine that increments a nonnegative integer represented in the binary system. For example, if the contents of the tape is $(101)_2$, it will be changed to $(110)_2$.
11. Show that the simulation of incr (X) in the Turing machine, as defined in this chapter, gives the correct answer when X = 0.
12. Show that the simulation of decr (X) in the Turing machine, as defined in this chapter, gives the correct answer when X = 0.
13. Show how the simulation of a loop statement in the Turing machine, as defined in this chapter, can be changed to preserve the original value of X if we allow another symbol such as # to be used by the machine.
14. Give the transition states and the program for the Turing machine that simulates the macro X ← 0.
15. Give the transition states and the program for the Turing machine that simulates the macro Y ← X.
16. A Turing machine uses a single 1 to represent the integer 0. Show how the integer n can be represented in this machine.
17. What is the Gödel number for the macro X1 ← 0?
18. What is the Gödel number for the macro X2 ← 2?
19. What is the Gödel number for the macro X3 ← X1 + X2?
`,
  zh: `
# 第十七章：計算理論

在第 1 章到第 16 章中，我們將電腦視為一種解決問題的機器。在本章中，我們將回答一些問題，例如：哪些問題可以由電腦解決？一種語言是否優於另一種語言？在運行程式之前，能否確定程式是會停止（終止）還是永遠運行？使用特定語言解決問題需要多長時間？為了回答這些問題，我們轉向一個稱為計算理論的學科。

## 學習目標
學完本章後，學生應能：
- 描述我們稱為「簡單語言」的程式語言並定義其基本陳述式。
- 使用簡單陳述式的組合在簡單語言中編寫巨集。
- 描述圖靈機作為計算模型的組件。
- 展示如何使用圖靈機模擬簡單語言中的簡單陳述式。
- 理解邱奇-圖靈論題及其意涵。
- 定義哥德爾數及其應用。
- 理解停機問題的概念以及如何證明該問題是不可解的。
- 區分可解和不可解問題。
- 區分多項式和非多項式可解問題。

## 17.1 簡單語言
我們可以定義一種只有三個陳述式的電腦語言：**遞增陳述式**、**遞減陳述式**和**迴圈陳述式**（圖 17.1）。在這種語言中，我們使用的唯一資料類型是非負整數。不需要任何其他資料類型，因為本章的目的僅僅是演示計算理論中的一些想法。該語言僅使用少數符號，如 '{' 和 '}'。

### 17.1.1 遞增陳述式
遞增陳述式將變數加 1。格式如演算法 17.1 所示。

**演算法 17.1 遞增陳述式**
\`\`\`text
incr (X)
\`\`\`

### 17.1.2 遞減陳述式
遞減陳述式從變數中減去 1。格式如演算法 17.2 所示。

**演算法 17.2 遞減陳述式**
\`\`\`text
decr (X)
\`\`\`

### 17.1.3 迴圈陳述式
當變數的值不為 0 時，迴圈陳述式重複一個動作（或一系列動作）。格式如演算法 17.3 所示。

**演算法 17.3 迴圈陳述式**
\`\`\`text
while (X)
{
  decr (X)
  Body of the loop
}
\`\`\`

### 17.1.4 簡單語言的威力
可以證明，這種只有三個陳述式的簡單程式語言與當今使用的任何複雜語言（如 C）一樣強大——儘管不一定那麼有效率。為此，我們展示如何模擬一些流行語言中的陳述式。

**簡單語言中的巨集**
我們稱每個模擬為**巨集**，並在其他模擬中使用它，而無需重複代碼。*巨集*（*巨集指令*的縮寫）是高階語言中的一條指令，相當於同一語言中一組特定的一個或多個普通指令。

**第一個巨集：X ← 0**
演算法 17.4 顯示如何使用簡單語言中的陳述式將 0 賦值給變數 X。這有時稱為*清除*變數。

**演算法 17.4 巨集 X ← 0**
\`\`\`text
while (X)
{
  decr (X)
}
\`\`\`

**第二個巨集：X ← n**
演算法 17.5 顯示如何使用簡單語言中的陳述式將正整數 $n$ 賦值給變數 X。首先清除變數 X，然後將 X 遞增 $n$ 次。

**演算法 17.5 巨集 X ← n**
\`\`\`text
X ← 0
incr (X)
incr (X)
...
incr (X)
// 陳述式 incr (X) 重複 n 次。
\`\`\`

**第三個巨集：Y ← X**
演算法 17.6 模擬簡單語言中的巨集 Y ← X。請注意，我們可以使用額外的代碼行將 X 的值恢復為其原始值。

**演算法 17.6 巨集 Y ← X**
\`\`\`text
Y ← 0
while (X)
{
  decr (X)
  incr (Y)
}
\`\`\`

**第四個巨集：Y ← Y + X**
演算法 17.7 模擬簡單語言中的巨集 Y ← Y + X。同樣，我們可以使用更多的代碼行將 X 的值恢復為其原始值。

**演算法 17.7 巨集 Y ← Y + X**
\`\`\`text
while (X)
{
  decr (X)
  incr (Y)
}
\`\`\`

**第五個巨集：Y ← Y × X**
演算法 17.8 模擬簡單語言中的巨集 Y ← Y × X。我們可以使用加法巨集，因為整數乘法可以透過重複加法來模擬。請注意，我們需要在臨時變數中保留 X 的值，因為在每次加法中，我們都需要將 X 的原始值加到 Y 上。

**演算法 17.8 巨集 Y ← Y × X**
\`\`\`text
TEMP ← Y
Y ← 0
while (X)
{
  decr (X)
  Y ← Y + TEMP
}
\`\`\`

**第六個巨集：Y ← Y^X**
演算法 17.9 模擬簡單語言中的巨集 Y ← Y^X。我們使用乘法巨集來執行此操作，因為整數求冪可以透過重複乘法來模擬。

**演算法 17.9 巨集 Y ← Y^X**
\`\`\`text
TEMP ← Y
Y ← 1
while (X)
{
  decr (X)
  Y ← Y × TEMP
}
\`\`\`

**第七個巨集：if X then A**
演算法 17.10 模擬簡單語言中的第七個巨集。此巨集模擬現代語言中的決策（*if*）陳述式。在此巨集中，變數 X 只有兩個值 0 或 1 之一。如果 X 的值不為 0，則在迴圈中執行 A（一個動作或一系列動作）。然而，迴圈只執行一次，因為在第一次迭代後，X 的值變為 0，我們跳出迴圈。如果 X 的值最初為 0，則跳過迴圈。

**演算法 17.10 巨集 if X then A**
\`\`\`text
while (X)
{
  decr (X)
  A
}
\`\`\`

**其他巨集**
顯然，我們需要更多的巨集來使簡單語言與當代語言相容。創建其他巨集是可能的，儘管並非微不足道。

**輸入和輸出**
在這種簡單語言中，陳述式 *read X* 可以使用 (X ← n) 來模擬。我們還透過假設程式中使用的最後一個變數保存應該列印的內容來模擬輸出。請記住，這不是一種實用的語言，它僅僅是為了證明電腦科學中的一些定理而設計的。

## 17.2 圖靈機
**圖靈機**由艾倫·圖靈於 1936 年提出，用於解決可計算問題，是現代電腦的基礎。在本節中，我們介紹機器的非常簡化版本以展示其工作原理。

### 17.2.1 圖靈機組件
圖靈機由三個組件組成：一條紙帶、一個控制器和一個讀寫頭（圖 17.2）。

**紙帶 (Tape)**
雖然現代電腦使用容量有限的隨機存取儲存設備，但我們假設圖靈機的記憶體是無限的。紙帶在任何時候都保存來自機器接受的字元集的字元序列。就我們的目的而言，我們假設機器只能接受兩個符號：空白 (**b**) 和數字 **1**。圖 17.3 顯示了該機器紙帶上的資料範例。

左側空白定義了儲存在紙帶上的非負整數的開始。整數由一串 1 表示，右側空白定義了整數的結束。紙帶的其餘部分包含空白字元。如果紙帶上儲存了多個整數，則它們至少由一個空白字元分隔。
我們還假設紙帶僅處理以一元運算表示的正整數資料。在這種運算中，正整數僅由 1 組成。例如，整數 4 表示為 1111（四個 1），整數 7 表示為 1111111（七個 1）。沒有 1 代表 0。

**讀寫頭 (Read/write head)**
**讀寫頭**在任何時刻都指向紙帶上的一個符號。我們稱此符號為*當前*符號。讀寫頭一次從紙帶讀取和寫入一個符號。讀寫後，它向左或向右移動。讀取、寫入和移動都是在控制器的指令下完成的。

**控制器 (Controller)**
**控制器**是現代電腦中中央處理單元 (CPU) 的理論對應物。它是一個**有限狀態自動機**，一種具有預定有限數量狀態並根據輸入從一個狀態移動到另一個狀態的機器。在任何時刻，它可以處於這些狀態之一。
圖 17.4 顯示了作為有限狀態自動機的簡單控制器的轉換狀態圖。在此圖中，自動機只有三個狀態（A、B 和 C），儘管控制器通常有許多狀態。該圖顯示了狀態隨讀取字元的變化。每條線上的表達式 *x/y/L*、*x/y/R* 和 *x/y/N* 顯示如果控制器讀取了符號 *x*，它寫入符號 *y*（覆蓋 *x*），並且讀寫頭向左移動 (L)、向右移動 (R) 或不移動 (N)。請注意，由於紙帶上的符號只能是空白或數字 1，因此每個狀態應該有兩條路徑：一條是讀取空白符號，另一條是讀取數字 1。線的開頭（稱為*轉換線*）顯示當前狀態，線的末端（箭頭）顯示下一個狀態。

我們可以創建一個轉換表（表 17.1），其中每一行與一個狀態相關。該表將有五列：當前狀態、讀取的符號、寫入的符號、頭的移動方向和下一個符號。由於機器只能經過有限數量的狀態，我們可以像第 5 章中為簡單電腦創建的那樣創建一個指令集。

**表 17.1 轉換表**
| 當前狀態 | 讀取 | 寫入 | 移動 | 新狀態 |
| :--- | :--- | :--- | :--- | :--- |
| A | b | b | R | A |
| A | 1 | 1 | R | B |
| B | b | 1 | R | B |
| B | 1 | b | N | C |
| C | b | b | L | A |
| C | 1 | 1 | L | B |

指令將每行中五列的值放在一起。對於這台基本機器，我們只有六條指令：
1. (A, b, b, R, A)
2. (A, 1, 1, R, B)
3. (B, b, 1, R, B)
4. (B, 1, b, N, C)
5. (C, b, b, L, A)
6. (C, 1, 1, L, B)

例如，第一條指令說如果機器處於狀態 A 並且讀取了符號 b，它會用新的 b 覆蓋該符號，移動到右邊的下一個符號，並且機器轉換到狀態 A——也就是說，保持在同一狀態。

> **範例 17.1**
> 一台圖靈機只有兩個狀態和以下四條指令：
> 1. (A, b, b, L, A)
> 2. (A, 1, 1, R, B)
> 3. (B, b, b, L, A)
> 4. (B, 1, b, R, A)
> 如果機器從圖 17.5 所示的配置開始（控制器狀態 A，指向序列 'b 1 1 1 1 b' 中的第一個 1），執行上述指令之一後機器的配置是什麼？請注意，機器只能執行其中一條指令，即與當前狀態和當前符號匹配的指令。
>
> **解答**
> 機器處於狀態 A 且當前符號為 1，這意味著只能執行第二條指令 (A, 1, 1, R, B)。新配置也顯示在圖 17.5 中。請注意，控制器的狀態已更改為 B，讀寫頭向右移動了一個符號。

### 17.2.2 模擬簡單語言
我們現在可以編寫實作簡單語言陳述式的程式。請注意，這些陳述式可以用許多不同的方式編寫：我們選擇了最簡單或最方便的方式用於教育目的，但它們不一定是最好的。

**遞增陳述式**
圖 17.6 顯示了 **incr (X)** 陳述式的圖靈機。控制器有四個狀態，S1 到 S4。狀態 S1 是開始狀態，狀態 S2 是向右移動狀態，狀態 S3 是向左移動狀態，狀態 S4 是停機狀態。如果機器到達停機狀態，它就會停止：沒有以此狀態開始的指令。

圖 17.6 還顯示了 incr (X) 陳述式的程式。它只有五條指令。該過程從 X 左側的空白符號開始（要遞增的資料），向右移動越過所有 1，直到到達 X 右側的空白符號。它將此空白更改為 1。然後它向左移動越過所有 1，直到再次到達左側的空白。此時它停止。請注意，我們還編寫了程式將讀寫頭移回 X 左側的空白符號，如果要在 X 上執行更多操作，這是必要的。

> **範例 17.2**
> 展示當 X = 2 時圖靈機如何遞增 X。
>
> **解答**
> 圖 17.7 顯示了解決方案。X 的值（一元系統中的 11）儲存在兩個空白符號之間。機器需要七個步驟來遞增 X 並將讀寫頭返回其原始位置。步驟 1 到 4 將讀寫頭移動到 X 的末尾。步驟 5 到 7 更改末尾的空白並將讀寫頭移回之前的位置。

**遞減陳述式**
我們使用最少數量的指令實作 **decr (X)** 陳述式。原因是我們需要在下一個陳述式，*while* 迴圈中使用此陳述式，這也將用於實作所有巨集。圖 17.8 顯示了此陳述式的圖靈機。控制器有三個狀態，S1、S2 和 S3。陳述式 S1 是開始狀態。狀態 S2 是檢查陳述式，它檢查當前符號是 1 還是 b。如果是 b，則陳述式進入停機狀態：如果下一個符號是 1，則第二個陳述式將其更改為 b 並進入停機狀態。圖 17.8 還顯示了此陳述式的程式。

> **範例 17.3**
> 展示當 X = 2 時圖靈機如何遞減 X。
>
> **解答**
> 圖 17.9 顯示了這種情況。機器從資料左側的空白開始，如果是 1 則將下一個符號更改為空白。讀寫頭停在結果資料左側的空白字元上方。這與遞增陳述式的安排相同。請注意，我們可以將讀寫頭移動到資料末尾並刪除最後一個 1 而不是第一個，但該程式會比我們的版本長得多。由於我們在每個迴圈陳述式中都需要此陳述式，因此我們使用了較短的版本來節省指令數量。我們在接下來開發的 *while* 迴圈陳述式中使用此陳述式的簡短版本。

**迴圈陳述式**
為了模擬迴圈，我們假設 X 和要由迴圈主體處理的資料儲存在紙帶上，由單個空白符號分隔。圖 17.10 顯示了一般迴圈陳述式的表、程式和狀態轉換圖。

三個狀態 S1、S2 和 S3 透過確定 X 並在 X = 0 時退出迴圈來控制迴圈。將這三個陳述式與圖 17.8 遞減陳述式中使用的三個陳述式進行比較。狀態 MR 在每次迭代處理資料開始時將讀寫頭移動到定義資料開始的空白符號上方，狀態 ML 在每次迭代處理結束時將讀寫頭移動到定義 X 開始的空白符號上方。狀態 BS（*主體開始*）定義迴圈主體的開始狀態，而狀態 BH（*主體停止*）定義迴圈主體的停機狀態。迴圈主體在這兩個狀態之間可能有幾個狀態。

圖 17.10 還顯示了陳述式的重複性質。狀態圖本身是一個迴圈，只要 X 的值不為零就會重複。當 X 的值變為 0 時，迴圈停止並到達狀態 S3，即停機狀態。

> **範例 17.4**
> 讓我們展示一個非常簡單的例子。假設我們想要模擬第四個巨集 Y ← Y + X（第 454 頁）。正如我們之前討論的，這個巨集可以使用簡單語言中的 while 陳述式來模擬：
> \`\`\`text
> while (X)
> {
>   decr (X)
>   incr (Y)
> }
> \`\`\`
> 為了使過程更短，我們假設 X = 2 且 Y = 3，因此結果是 Y = 5。圖 17.11 顯示了應用巨集前後紙帶的狀態。請注意，在這個程式中，我們刪除 X 的值以使過程更短，但如果我們允許紙帶上有其他符號，則可以保留 X 的原始值。
> 由於 X = 2，程式經過兩次迭代。在第一次迭代結束時，X = 1 且 Y = 4。在第二次迭代結束時，X = 0 且 Y = 5。

### 17.2.3 邱奇-圖靈論題
我們已經證明圖靈機可以模擬簡單語言中的三個基本陳述式。這意味著圖靈機也可以模擬我們為簡單語言定義的所有巨集。那麼圖靈機是否可以解決電腦可以解決的任何問題呢？這個問題的答案可以在邱奇-圖靈論題中找到。

**邱奇-圖靈論題**
**如果存在一個演算法來執行符號操作任務，那麼就存在一台圖靈機來執行該任務。**

基於這一主張，任何可以透過編寫演算法來完成的符號操作任務也可以由圖靈機完成。請注意，這只是一個*論題*，而不是一個*定理*。定理可以用數學證明，論題則不能。雖然這個論題可能永遠無法被證明，但有強有力的論據支持它。首先，還沒有發現不能使用圖靈機模擬的演算法。其次，已經證明所有已被數學證明的計算模型都等同於圖靈機模型。

## 17.3 哥德爾數
在理論電腦科學中，對於可以用特定語言編寫的每個程式，都會分配一個無符號數。這通常被稱為**哥德爾數**，以奧地利數學家庫爾特·哥德爾命名。

這種分配有許多優點。首先，程式可以作為單個資料項目作為其他程式的輸入。其次，程式可以僅透過其整數表示來引用。第三，編號可以用來證明某些問題無法由電腦解決，方法是證明世界上的問題總數遠大於可以編寫的程式總數。

已經設計了不同的方法來為程式編號。我們使用一種非常簡單的轉換來為用我們的簡單語言編寫的程式編號。簡單語言僅使用十五個符號（表 17.2）。

**表 17.2 簡單語言中使用的符號代碼**
| 符號 | 十六進位代碼 | 符號 | 十六進位代碼 |
| :--- | :--- | :--- | :--- |
| 1 | 1 | 9 | 9 |
| 2 | 2 | incr | A |
| 3 | 3 | decr | B |
| 4 | 4 | while | C |
| 5 | 5 | { | D |
| 6 | 6 | } | E |
| 7 | 7 | X | F |
| 8 | 8 | | |

請注意，在這種語言中，我們僅使用 X, X1, X2, …, X9 作為變數。為了編碼這些變數，我們將 Xn 處理為兩個符號 X 和 n（X3 是 X 和 3）。如果我們有一個帶有其他變數的巨集，它們需要更改為 Xn。

### 17.3.1 表示程式
使用該表，我們可以透過以下步驟將任何用簡單語言編寫的程式表示為唯一的正整數：
1.  用表中的相應十六進位代碼替換每個符號。
2.  將結果十六進位數字解釋為無符號整數。

> **範例 17.5**
> 程式 \`incr X\` 的哥德爾數是多少？
>
> **解答**
> 用其十六進位代碼替換每個符號。
> \`incr X\` → (AF)16 → 175
> 所以這個程式可以用數字 175 表示。

### 17.3.2 解釋數字
為了證明編號系統是唯一的，使用以下步驟解釋哥德爾數：
1.  將數字轉換為十六進位。
2.  使用表 17.2 將每個**十六進位數字**解釋為一個符號（忽略 0）。

請注意，雖然任何用簡單語言編寫的程式都可以用一個數字表示，但並非每個數字都可以解釋為有效程式。轉換後，如果符號不遵循語言的語法，則該數字不是有效程式。

> **範例 17.6**
> 將 3058 解釋為一個程式。
>
> **解答**
> 將數字更改為十六進位並用相應的符號替換每個數字：
> 3058 → (BF2)16 → decr X 2 → decr (X2)
> 這意味著簡單語言中的等效代碼是 \`decr (X2)\`。請注意，在簡單語言中，每個程式都包括輸入和輸出。這意味著程式及其輸入的組合定義了哥德爾數。

## 17.4 停機問題
幾乎每個用程式語言編寫的程式都涉及某種形式的重複——迴圈或遞迴函數。重複建構可能永遠不會終止（停止）：也就是說，如果程式有無限迴圈，它可以永遠運行。例如，以下簡單語言中的程式永遠不會終止：
\`\`\`text
X → 1
while (X)
{
}
\`\`\`

一個經典的程式設計問題是：
**我們能否編寫一個程式來測試任何程式（由其哥德爾數表示）是否會終止？**

這個程式的存在將為程式設計師節省大量時間。在不知道程式是否停止的情況下運行程式是一項乏味的工作。不幸的是，現在已經證明這樣的程式不可能存在——這讓程式設計師非常失望！

### 17.4.1 停機問題是不可解的
電腦科學家不說測試程式不存在且永遠不可能存在，而是說「**停機問題**是不可解的」。

**證明**
讓我們給出關於此測試程式不存在的非正式證明。我們的方法稱為*反證法*，常用於數學：我們假設程式確實存在，然後證明其存在會產生矛盾——因此，它不可能存在。我們使用三個步驟來展示這種方法的證明。

**步驟 1**
在此步驟中，我們假設存在一個名為 Test 的程式。它可以接受任何程式（如 $P$，由其哥德爾數表示）作為輸入，並輸出 1 或 0。如果 $P$ 終止，Test 的輸出為 1：如果 $P$ 不終止，Test 的輸出為 0（見圖 17.12）。

**步驟 2**
在此步驟中，我們創建另一個名為 Strange 的程式，它由兩部分組成：開頭是 Test 的副本，末尾是一個空迴圈——一個主體為空的迴圈。該迴圈使用 X 作為測試變數，這實際上是 Test 程式的輸出。此程式也使用 $P$ 作為輸入。我們稱此程式為 Strange，原因如下：如果 $P$ 終止，Strange 的第一部分（Test 的副本）輸出 1。這個 1 輸入到迴圈中。迴圈不終止——它是一個無限迴圈——因此 Strange 不終止。如果 $P$ 不終止，Strange 的第一部分（Test 的副本）輸出 0。這個 0 輸入到迴圈中，所以迴圈確實終止——它現在是一個有限迴圈，迴圈從不迭代——因此，Strange 終止。換句話說，我們有這些奇怪的情況：
- 如果 $P$ 終止，Strange 不終止。
- 如果 $P$ 不終止，Strange 終止。

**步驟 3**
編寫了程式 Strange 後，我們用它自己（它的哥德爾數）作為輸入來測試它。這是合法的，因為我們沒有對 $P$ 施加任何限制。
如果我們假設 Test 存在，我們有以下矛盾：
- 如果 Strange 終止，Strange 不終止。
- 如果 Strange 不終止，Strange 終止。
這證明 Test 程式不可能存在，我們應該停止尋找它，所以……
**停機問題是不可解的。**

停機程式的不可解性證明了許多其他程式也是不可解的，因為如果它們是可解的，那麼停機問題就是可解的——而事實並非如此。

## 17.5 問題的複雜度
現在我們已經證明至少有一個問題是電腦無法解決的，我們將稍微多談談這個重要問題。在電腦科學中，我們可以說，一般而言，問題可以分為兩類：**可解問題**和**不可解問題**。可解問題本身可以分為兩類：**多項式**和**非多項式**問題（圖 17.15）。

### 17.5.1 不可解問題
有無限多個問題是電腦無法解決的：其中之一是停機問題。證明一個問題不可解的一種方法是證明如果該問題可解，那麼停機問題也可解。換句話說，證明問題的可解性導致停機問題的可解性。

### 17.5.2 可解問題
有許多問題可以由電腦解決。然而，我們經常想知道電腦解決該問題需要多*長*時間。換句話說，程式有多複雜？
程式的複雜度可以用幾種不同的方式來衡量，例如其運行時間、所需的記憶體等等。一種方法是程式的運行時間——程式運行需要多長時間？

**可解問題的複雜度**
衡量可解問題複雜度的一種方法是找出電腦運行程式時執行的操作數量。透過這種方式，複雜度度量與運行程式的電腦速度無關。這種複雜度度量可能取決於輸入的數量。例如，如果程式正在處理列表（例如對其進行排序），則複雜度取決於列表中的元素數量。

**大 O 符號**
以當今電腦的速度，我們不關心確切的數字，而關心一般的數量級。例如，如果對兩個程式的分析顯示一個執行 15 次操作（或一組操作），而另一個執行 25 次，它們都太快了，我們看不出區別。另一方面，如果數字是 15 對 1500，我們就應該關注了。
這種效率的簡化稱為**大 O 符號**。我們在不深入探討其正式定義和計算的情況下介紹這種符號的概念。在大 O 符號中，操作的數量——或一組相關的操作——以輸入數量的函數給出。符號 O(n) 意味著程式對 $n$ 個輸入執行 $n$ 次操作，而符號 O($n^2$) 意味著程式對 $n$ 個輸入執行 $n^2$ 次操作。

> **範例 17.7**
> 想像我們編寫了三個不同的程式來解決同一個問題。第一個的複雜度為 O($\\log_{10} n$)，第二個為 O($n$)，第三個為 O($n^2$)。假設有 100 萬個輸入，在一台執行一條指令需一微秒（即每秒一百萬條指令）的電腦上執行每個程式需要多長時間？
>
> **解答**
> 分析如下：
> *   第 1 個程式：$n = 1000000$，O($\\log_{10} n$) → 6。時間 → 6 µs
> *   第 2 個程式：$n = 1000000$，O($n$) → 1000000。時間 → 1 秒
> *   第 3 個程式：$n = 1000000$，O($n^2$) → $10^{12}$。時間 → 277 小時

**多項式問題**
如果程式的複雜度為 O(log $n$)、O($n$)、O($n^2$)、O($n^3$)、O($n^4$) 或 O($n^k$)，其中 $k$ 是常數，則稱為**多項式**。以當今電腦的速度，我們可以在合理的輸入數量下（例如 1000 到 100 萬）獲得**多項式問題**的解決方案。

**非多項式問題**
如果程式的複雜度大於多項式——例如 O($10^n$) 或 O($n!$)——只有當輸入數量非常小（例如少於 100）時才能解決。如果輸入數量很大，一個人可能會坐在電腦前幾個月才能看到**非多項式問題**的結果。但也許誰知道呢？按照電腦速度增長的速度，我們也許能夠在更短的時間內獲得這類問題的結果。

## 17.6 章末材料
### 17.6.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Hennie, F. *Introduction to Computability*, Reading, MA: Addison-Wesley, 1977
- Hofstadter, D. *Gödel, Escher, Bach: An Eternal Golden Braid*, St. Paul, MN: Vintage, 1980
- Hopcroft, J., Motwani, R. and Ullman, J. *Introduction to Automata Theory, Languages, and Computation*, Reading, MA: Addison-Wesley, 2006
- Kfoury, A., Moll, R. and Michael, A. *A Programming Approach to Computability*, New York: Springer, 1982
- Minsky, M. *Computation: Finite and Infinite Machines*, Engelwood Cliffs, NJ: Prentice-Hall, 1967
- Sipser, M. *Introduction to the Theory of Computation*, Boston, MA: Course Technology, 2005

### 17.6.2 關鍵詞
- 大 O 符號 (big-O notation)
- 邱奇-圖靈論題 (Church–Turing thesis)
- 控制器 (controller)
- 遞減陳述式 (decrement statement)
- 有限狀態自動機 (finite state automaton)
- 哥德爾數 (Gödel number)
- 停機問題 (halting problem)
- 十六進位數字 (hexadecimal digit)
- 遞增陳述式 (increment statement)
- 迴圈陳述式 (loop statement)
- 巨集 (macro)
- 非多項式問題 (nonpolynomial problem)
- 多項式問題 (polynomial problem)
- 讀寫頭 (read/write head)
- 可解問題 (solvable problem)
- 圖靈機 (Turing machine)
- 不可解問題 (unsolvable problem)

### 17.6.3 摘要
- 我們可以定義一種只有三個陳述式的電腦語言：遞增陳述式、遞減陳述式和迴圈陳述式。遞增陳述式將變數加 1，遞減陳述式從變數中減去 1，迴圈陳述式在變數值不為 0 時重複一個動作或一系列動作。
- 可以證明，這種簡單的程式語言可以模擬一些流行語言中的幾個陳述式。我們稱每個模擬為巨集，並在其他模擬中使用它，而無需重複代碼。
- 圖靈機旨在解決可計算問題。它是現代電腦的基礎。圖靈機由三個組件組成：一條紙帶、一個控制器和一個讀寫頭。
- 根據邱奇-圖靈論題，如果存在執行符號操作任務的演算法，那麼也存在執行該任務的圖靈機。
- 在理論電腦科學中，對於可以用特定語言編寫的每個程式，都會分配一個無符號數。這通常被稱為哥德爾數。
- 一個經典的程式設計問題是是否可以構建一個程式來確定另一個程式是否停止。不幸的是，現在已經證明這個程式不可能存在：停機問題是不可解的。
- 在電腦科學中，問題可以分為兩類：可解問題和不可解問題。可解問題本身可以分為兩類：多項式和非多項式問題。

## 17.7 練習題
### 17.7.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 17.7.2 複習問題
1. 命名並描述三個基本陳述式的功能，這三個陳述式是簡單語言中其他陳述式的基礎。
2. 展示將一個變數的值賦給另一個變數如何使用這三個基本陳述式。
3. 圖靈機與我們的簡單語言有什麼關係？
4. 圖靈機的組件是什麼？每個組件的功能是什麼？
5. 描述一種劃分圖靈機紙帶上資料的方法。
6. 當圖靈機中的讀寫頭完成讀寫符號後，它的下一個選項是什麼？
7. 轉換狀態圖與圖靈機控制器有何關係？
8. 轉換狀態圖與轉換表有何關係？它們有相同的資訊嗎？哪個資訊更多？
9. 什麼是哥德爾數？我們如何使用哥德爾數來證明停機問題是不可解的？
10. 比較和對比多項式可解問題和非多項式可解問題的複雜度。

### 17.7.3 問題
1. 重寫演算法 17.6 (Y ← X)，使其保留 X 的值。
2. 重寫演算法 17.7，使其計算 Z ← Y + X，同時保留 X 和 Y 的值。
3. 重寫演算法 17.8，使其計算 Z ← Y × X，同時保留 X 和 Y 的值。
4. 重寫演算法 17.9，使其計算 Z ← Y^X，同時保留 X 和 Y 的值。
5. 使用先前在簡單語言中定義的陳述式或巨集模擬以下巨集：Y ← Y - X。
6. 使用語言中先前定義的陳述式或巨集模擬以下巨集（X 只能是 0 或 1）：
   \`\`\`text
   if (X) then
   {
     A1
   }
   else
   {
     A2
   }
   \`\`\`
7. 給定一台具有單條指令 (A, 1, b, R, B) 和紙帶配置的圖靈機：
   ... b 1 1 1 b ...
   (指向第一個 1)
   顯示紙帶的最終配置。
8. 給定一台具有單條指令 (A, b, b, R, B) 和紙帶配置的圖靈機：
   ... b 1 1 1 b ...
   (指向第一個 b)
   顯示紙帶的最終配置。
9. 給定一台具有五條指令 (A, b, b, R, B), (B, 1, #, R, B), (B, b, b, L, C), (C, #, 1, L, C), (C, b, b, R, B) 和紙帶配置的圖靈機：
   ... b 1 1 1 b ...
   (指向第一個 b)
   顯示紙帶的最終配置。
10. 顯示遞增以二進位系統表示的非負整數的圖靈機的狀態圖。例如，如果紙帶的內容是 $(101)_2$，它將更改為 $(110)_2$。
11. 證明本章定義的圖靈機中 incr (X) 的模擬在 X = 0 時給出正確答案。
12. 證明本章定義的圖靈機中 decr (X) 的模擬在 X = 0 時給出正確答案。
13. 說明如果我們允許機器使用另一個符號（如 #），如何更改本章定義的圖靈機中迴圈陳述式的模擬以保留 X 的原始值。
14. 給出模擬巨集 X ← 0 的圖靈機的轉換狀態和程式。
15. 給出模擬巨集 Y ← X 的圖靈機的轉換狀態和程式。
16. 一台圖靈機使用單個 1 來表示整數 0。展示整數 n 如何在這台機器中表示。
17. 巨集 X1 ← 0 的哥德爾數是多少？
18. 巨集 X2 ← 2 的哥德爾數是多少？
19. 巨集 X3 ← X1 + X2 的哥德爾數是多少？
`,
};
