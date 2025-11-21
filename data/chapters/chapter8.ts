
export const chapter8Content = {
  en: `
# Chapter 8: Algorithms

In this chapter we introduce the concept of algorithms, step-by-step procedures for solving a problem. We then discuss the tools used to develop algorithms. Finally, we give some examples of common iterative and recursive algorithms.

## Objectives
After studying this chapter, the student should be able to:
- Define an algorithm and relate it to problem solving.
- Define three constructs—sequence, selection, and repetition—and describe their use in algorithms.
- Describe UML diagrams and how they can be used when representing algorithms.
- Describe pseudocode and how it can be used when representing algorithms.
- List basic algorithms and their applications.
- Describe the concept of sorting and understand the mechanisms behind three primitive sorting algorithms.
- Describe the concept of searching and understand the mechanisms behind two common searching algorithms.
- Define subalgorithms and their relations to algorithms.
- Distinguish between iterative and recursive algorithms.

## 8.1 CONCEPT
In this section we informally define an **algorithm** and elaborate on the concept using an example.

### 8.1.1 Informal definition
An informal definition of an algorithm is:

**Algorithm: a step-by-step method for solving a problem or doing a task.**

In this definition, an algorithm is independent of the computer system. More specifically, we should also note that the algorithm accepts **input data** and creates **output data** (Figure 8.1).

### 8.1.2 Example
Let us elaborate on this simple definition with an example. We want to develop an algorithm for finding the largest integer among a list of positive integers. The algorithm should find the largest integer among a list of any size (for example 5, 1000, 10000, 1000000). The algorithm should be general and not depend on the number of integers.

It is obvious that finding the largest integer among many integers is a task that cannot be done in one step, either by a human or a computer. The algorithm needs to test each integer one by one.

To solve this problem, we need an intuitive approach. First use a small number of integers (for example, five), then extend the solution to any number of integers. Our solution for five integers follows the same principles and restrictions for one thousand or one million integers. Assume, even for a five-integer case, that the algorithm handles the integers one by one. It looks at the first integer without knowing the values of the remaining integers. After it handles the first one, it looks at the second integer, and so on. Figure 8.2 shows one way to solve this problem.

We call the algorithm FindLargest. Each algorithm has a name to distinguish it from other algorithms. The algorithm receives a list of five integers as input and gives the largest integer as output.

**Input**
The algorithm accepts the list of five integers as input.

**Processing**
The algorithm uses the following five steps to find the largest integer:
**Step 1**
In this step, the algorithm inspects the first integer (12). Since it does not know the values of other integers, it decides that the largest integer (so far) is the first integer. The algorithm defines a data item, called Largest, and sets its value to the first integer (12).
**Step 2**
The largest integer so far is 12, but the new integer may change the situation. The algorithm makes a comparison between the value of Largest (12) and the value of the second integer (8). It finds that Largest is larger than the second integer, which means that Largest is still holding the largest integer. There is no need to change the value of Largest.
**Step 3**
The largest integer so far is 12, but the new integer (13) is larger than Largest. This means than the value of Largest is no longer valid. The value of Largest should be replaced by the third integer (13). The algorithm changes the value of Largest to 13 and moves to the next step.
**Step 4**
Nothing is changed in this step because Largest is larger than the fourth integer (9).
**Step 5**
Again nothing is changed because Largest is larger than the fifth integer (11).

**Output**
Because there are no more integers to be processed, the algorithm outputs the value of Largest, which is 13.

### 8.1.3 Defining actions
Figure 8.2 does not show what should be done in each step. We can modify the figure to show more details. For example, in step 1, set Largest to the value of the first integer. In steps 2 to 5, however, additional actions are needed to compare the value of Largest with the current integer being processed. If the current integer is larger than Largest, set the value of Largest to the current integer (Figure 8.3).

### 8.1.4 Refinement
This algorithm needs refinement to be acceptable to the programming community. There are two problems. First, the action in the first step is different than those for the other steps. Second, the wording is not the same in steps 2 to 5. We can easily redefine the algorithm to remove these two inconveniences by changing the wording in steps 2 to 5 to ‘If the current integer is greater than Largest, set Largest to the current integer’. The reason that the first step is different than the other steps is because Largest is not initialized.

If we initialize Largest to $-\\infty$ (minus infinity), then the first step can be the same as the other steps, so we add a new step, calling it step 0 to show that it should be done before processing any integers.
Figure 8.4 shows the result of this refinement. Note that we do not have to show all the steps, because they are now the same.

### 8.1.5 Generalization
Is it possible to generalize the algorithm? We want to find the largest of $n$ positive integers, where $n$ can be 1000, 1000000, or more. Of course, we can follow Figure 8.4 and repeat each step. But if we change the algorithm to a program, then we need to actually type the actions for $n$ steps!
There is a better way to do this. We can tell the computer to repeat the steps $n$ times. We now include this feature in our pictorial algorithm (Figure 8.5).

## 8.2 THREE CONSTRUCTS
Computer scientists have defined three constructs for a structured program or algorithm. The idea is that a program must be made of a combination of only these three constructs: *sequence*, *decision*, and *repetition* (Figure 8.6). It has been proven there is no need for any other constructs. Using only these constructs makes a program or an algorithm easy to understand, debug, or change.

### 8.2.1 Sequence
The first construct is called the **sequence**. An algorithm, and eventually a program, is a sequence of instructions, which can be a simple instruction or either of the other two constructs.

### 8.2.2 Decision
Some problems cannot be solved with only a sequence of simple instructions. Sometimes we need to test a condition. If the result of testing is true, we follow a sequence of instructions: if it is false, we follow a different sequence of instructions. This is called the **decision (selection)** construct.

### 8.2.3 Repetition
In some problems, the same sequence of instructions must be repeated. We handle this with the **repetition** or **loop** construct. Finding the largest integer among a set of integers can use a construct of this kind.

## 8.3 ALGORITHM REPRESENTATION
So far, we have used figures to convey the concept of an algorithm. During the last few decades, tools have been designed for this purpose. Two of these tools, UML and pseudocode, are presented here.

### 8.3.1 UML
**Unified Modeling Language (UML)** is a pictorial representation of an algorithm. It hides all the details of an algorithm in an attempt to give the ‘big picture’ and to show how the algorithm flows from beginning to end.
UML is covered in detail in Appendix B. Here we show only how the three constructs are represented using UML (Figure 8.7). Note that UML allows us a lot of flexibility, as shown in Appendix B. For example, the decision construct can be simplified if there are no actions on the false part.

### 8.3.2 Pseudocode
**Pseudocode** is an English-language-like representation of an algorithm. There is no standard for pseudocode—some people use a lot of detail, others use less. Some use a code that is close to English, while others use a syntax like the Pascal programming language. Pseudocode is covered in detail in Appendix C. Here we show only how the three constructs can be represented by pseudocode (Figure 8.8).

> **Example 8.1**
> Write an algorithm in pseudocode that finds the sum of two integers.
>
> **Solution**
> This is a simple problem that can be solved using only the sequence construct. Note also that we name the algorithm, define the input to the algorithm and, at the end, we use a return instruction to return the sum (Algorithm 8.1).
>
> **Algorithm 8.1 Calculating the sum of two integers**
> Algorithm: SumOfTwo (first, second)
> Purpose: Find the sum of two integers
> Pre: Given: two integers (first and second)
> Post: None
> Return: The sum value
> {
>   sum ← first + second
>   return sum
> }

> **Example 8.2**
> Write an algorithm to change a numeric grade to a pass/no pass grade.
>
> **Solution**
> This problem cannot be solved with only the sequence construct. We also need the decision construct. The computer is given an integer between 0 and 100. It returns ‘pass’ if the integer is greater than or equal to 70, and returns ‘no pass’ if the integer is less than 70. Algorithm 8.2 shows the pseudocode for this algorithm.
>
> **Algorithm 8.2 Assigning pass/no pass grade**
> Algorithm: Pass/NoPass (score)
> Purpose: Creates a pass/no pass grade given the score
> Pre: Given: the score to be changed to grade
> Post: None
> Return: The grade
> {
>   if (score ≥ 70)
>     grade ← “pass”
>   else
>     grade ← “nopass”
>   return grade
> }

> **Example 8.3**
> Write an algorithm to change a numeric grade (integer) to a letter grade.
>
> **Solution**
> This problem needs more than one decision. The pseudocode in Algorithm 8.3 shows one way to solve the problem—not the best one, but an easy one to understand. Again, an integer is given between 0 and 100, and we want to change it to a letter grade (A, B, C, D, or F).
>
> **Algorithm 8.3 Assigning a letter grade**
> Algorithm: LetterGrade (score)
> Purpose: Find the letter grade corresponding to the given score
> Pre: Given: a numeric score
> Post: None
> Return: A letter grade
> {
>   if (100 ≥ score ≥ 90)
>     grade ← ’A’
>   if (89 ≥ score ≥ 80)
>     grade ← ’B’
>   if (79 ≥ score ≥ 70)
>     grade ← ’C’
>   if (69 ≥ score ≥ 60)
>     grade ← ’D’
>   if (59 ≥ score ≥ 0)
>     grade ← ’F’
>   return grade
> }
> Note that the decision constructs do not need an else section, because we do nothing if the condition is false.

> **Example 8.4**
> Write an algorithm to find the largest of a set of integers. We do not know the number of integers.
>
> **Solution**
> We use the concept in Figure 8.5 on page 217 to write an algorithm for this problem (see Algorithm 8.4).
>
> **Algorithm 8.4 Finding the largest integer among a set of integers**
> Algorithm: FindLargest (list)
> Purpose: Find the largest integer among a set of integers
> Pre: Given: the set of integers
> Post: None
> Return: The largest integer
> {
>   largest ← –∞
>   while (more integers to check)
>   {
>     current ← next integer
>     if (current > largest)
>       largest ← current
>   }
>   return largest
> }

> **Example 8.5**
> Write an algorithm to find the smallest of the first 1000 integers in a set of integers.
>
> **Solution**
> Here we need a counter to count the number of integers. We initialize the counter to 1 and increment it in each repetition. When the counter is greater than 1000, we exit from the loop (see Algorithm 8.5). Note that there are more than 1000 integers in the list, but we want to find the smallest among the first 1000.
>
> **Algorithm 8.5 Find the smallest integers among 1000 integers**
> Algorithm: FindSmallest (list)
> Purpose: Find and return the smallest integer among the first 1000 integers
> Pre: Given the set of integers with more than 1000 integers
> Post: None
> Return: The smallest integer
> {
>   smallest ← +∞
>   counter ← 1
>   while (counter ≤ 1000)
>   {
>     current ← next integer
>     if (current < smallest)
>       smallest ← current
>     counter ← counter + 1
>   }
>   return smallest
> }

## 8.4 A MORE FORMAL DEFINITION
Now that we have discussed the concept of an algorithm and shown its representation, here is a more formal definition. Let us elaborate on this definition.

**Algorithm: An ordered set of unambiguous steps that produces a result and terminates in a finite time.**

### 8.4.1 Well-Defined
An algorithm must be a well-defined, ordered set of instructions.

### 8.4.2 Unambiguous steps
Each step in an algorithm must be clearly and unambiguously defined. If one step is to *add two integers*, we must define both ‘integers’ as well as the ‘add’ operation: we cannot for example use the same symbol to mean addition in one place and multiplication somewhere else.

### 8.4.3 Produce a result
An algorithm must produce a result, otherwise it is useless. The result can be data returned to the calling algorithm, or some other effect (for example, printing).

### 8.4.4 Terminate in a finite time
An algorithm must terminate (halt). If it does not (that is, it has an infinite loop), we have not created an algorithm. In Chapter 17 we will discuss *solvable* and *unsolvable* problems, and we will see that a solvable problem has a solution in the form of an algorithm that terminates.

## 8.5 BASIC ALGORITHMS
Several algorithms are used in computer science so prevalently that they are considered ‘basic’. We discuss the most common here. This discussion is very general: implementation depends on the language.

### 8.5.1 Summation
One commonly used algorithm in computer science is **summation**. We can add two or three integers very easily, but how can we add many integers? The solution is simple: we use the add operator in a loop (Figure 8.9).
A summation algorithm has three logical parts:
1.  Initialization of the sum at the beginning.
2.  The loop, which in each iteration adds a new integer to the sum.
3.  Return of the result after exiting from the loop.

### 8.5.2 Product
Another common algorithm is finding the **product** of a list of integers. The solution is simple: use the multiplication operator in a loop (Figure 8.10). A product algorithm has three logical parts:
1.  Initialization of the product at the beginning.
2.  The loop, which in each iteration multiplies a new integer with the product.
3.  Return of the result after exiting from the loop.

For example, the preceding algorithm can be used to calculate $x^n$ using a minor modification—this is left as an exercise. As another example, the same algorithm can be used to calculate the factorial of an integer, which is discussed later in the chapter.

### 8.5.3 Smallest and largest
We discussed the algorithm for finding the largest among a list of integers at the beginning of this chapter. The idea was to write a decision construct to find the larger of two integers. If we put this construct in a loop, we can find the largest of a list of integers.
Finding the smallest integer among a list of integers is similar, with two minor differences. First, we use a decision construct to find the smaller of two integers. Second, we initialize with a very large integer instead of a very small one. Figure 8.11 shows the algorithm to find the smallest among a list of integers. The figure to find the largest is similar and left as an exercise.

### 8.5.4 Sorting
One of the most common applications in computer science is **sorting**, which is the process by which data is arranged according to its values. People are surrounded by data. If the data was not ordered, it would take hours and hours to find a single piece of information. Imagine the difficulty of finding someone’s telephone number in a telephone book that is not ordered.
In this section, we introduce three sorting algorithms: selection sort, bubble sort, and insertion sort. These three sorting algorithms are the foundation of faster sorting algorithms used in computer science today.

**Selection sorts**
In a **selection sort**, the list to be sorted is divided into two sublists—sorted and unsorted—which are separated by an imaginary wall. We find the smallest element from the unsorted sublist and swap it with the element at the beginning of the unsorted sublist. After each selection and swap, the imaginary wall between the two sublists moves one element ahead, increasing the number of sorted elements and decreasing the number of unsorted ones. Each time we move one element from the unsorted sublist to the sorted sublist, we have completed a sort pass. A list of $n$ elements requires $n - 1$ passes to completely rearrange the data. Selection sort is presented graphically in Figure 8.12.

Figure 8.13 traces a set of six integers as we sort them.
The figure shows how the wall between the sorted and unsorted sublists moves in each pass. As we study the figure, we will see that the list is sorted after five passes, which is one less than the number of elements in the list. Thus, if we use a loop to control the sorting, the loop will have one less iteration than the number of elements to be sorted.

**A selection sort algorithm**
The algorithm uses two loops, one inside the other. The outer loop is iterated for each pass: the inner loop finds the smallest element in the unsorted list. Figure 8.14 shows the UML for the selection sort algorithm. The inner loop is not explicitly shown in the figure, but the first instruction in the loop is itself a loop. We leave the demonstration of the loop as an exercise.

**Bubble sorts**
In the **bubble sort** method, the list to be sorted is also divided into two sublists—sorted and unsorted. The smallest element is *bubbled up* from the unsorted sublist and moved to the sorted sublist. After the smallest element has been moved to the sorted list, the wall moves one element ahead, increasing the number of sorted elements and decreasing the number of unsorted ones. Each time an element moves from the unsorted sublist to the sorted sublist, one sort pass is completed (Figure 8.15). Given a list of $n$ elements, bubble sort requires up to $n - 1$ passes to sort the data.

Figure 8.16 shows how the wall moves one element in each pass. Looking at the first pass, we start with 56 and compare it to 32. Since 56 is not less than 32, it is not moved, and we step down one element. No exchanges take place until we compare 45 to 8. Since 8 is less than 45, the two elements are exchanged, and we step down one element. Because 8 was moved down, it is now compared to 78, and these two elements are exchanged. Finally, 8 is compared to 23 and exchanged. This series of exchanges places 8 in the first location, and the wall is moved up one position. The algorithm gets its name from the way in which numbers—in this example, 8—appear to move to the start, or top, of the list in the same way that bubbles rise through water.
Note that we have stopped before the wall moves to the end of the list, because the list is already sorted. We can always include an indicator in the algorithm to stop the passes if no number exchanges occur in a pass. This fact can be used to improve the efficiency of the bubble sort by reducing the number of steps.
The bubble sort was originally written to ‘bubble down’ the highest element in the list. From an efficiency point of view, it makes no difference whether high elements are moved or low elements are moved up. From a consistency point of view, however, it makes comparisons between the sort algorithms easier if all of them work in the same manner. For that reason, we have chosen to move the lowest value up in each pass.

**A bubble sort algorithm**
Bubble sorts also use two loops, one inside the other. The outer loop is iterated for each pass, while each iteration of the inner loop tries to bubble one element up to the top (left). We leave the UML and pseudocode as exercises.

**Insertion sorts**
The **insertion sort** algorithm is one of the most common sorting techniques, and it is often used by card players. Each card a player picks up is inserted into the proper place in their hand of cards to maintain a particular sequence. (Card sorting is an example of a sort that uses two criteria for sorting: suit and rank.)
In an insertion sort, as in the other two sorting algorithms discussed above, the list is divided into two parts—sorted and unsorted. In each pass, the first element of the unsorted sublist is transferred to the sorted sublist and inserted at the appropriate place (Figure 8.17). Note that a list of $n$ elements will take $n - 1$ passes to sort the data.

Figure 8.18 traces an insertion sort through our list of six numbers. The wall moves with each pass as an element is removed from the unsorted sublist and inserted into the sorted sublist.

**Insertion sort algorithm**
The design of insertion sort follows the same pattern seen in both selection sort and bubble sort. The outer loop is iterated for each pass, and the inner loop finds the position of insertion. We leave the UML diagram and pseudocode as exercises.

**Other sorting algorithms**
The three sorting algorithms discussed here are the least efficient sorting algorithms, and should not be used if the list to be sorted has more than a few hundred elements. We have discussed these algorithms here for educational purposes, but they are not practical. There are however several reasons for discussing these sorting algorithms in an introductory book:
- They are the simplest algorithms to understand and analyze.
- They are the foundation of more efficient algorithms such as *quicksort, heap sort, Shell sort, bucket sort, merge sort, radix sort*, and so on.
Most such advanced sorting algorithms are discussed in books on data structures.
We may ask why there are so many sorting algorithms. The reason lies in the type of data that needs to be sorted. One algorithm may be more efficient for a list that is partially sorted, whereas another algorithm may be more efficient for a list that is completely unsorted. To decide which algorithm is best suited for a particular application, a measurement called the complexity of algorithms is needed. We discuss this issue in Chapter 17, but a thorough understanding requires additional courses in programming and data structures.

### 8.5.5 Searching
Another common algorithm in computer science is **searching**, which is the process of finding the location of a target among a list of objects. In the case of a list, searching means that given a value, we want to find the location of the first element in the list that contains that value. There are two basic searches for lists: **sequential search** and **binary search**. Sequential search can be used to locate an item in any list, whereas binary search requires the list first to be sorted.

**Sequential search**
**Sequential search** is used if the list to be searched is not ordered. Generally, we use this technique only for small lists, or lists that are not searched often. In other cases, the best approach is to first sort the list and then search it using the binary search discussed later.
In a sequential search, we start searching for the target from the beginning of the list. We continue until we either find the target or reach the end of the list. Figure 8.19 traces the steps to find the value 62. The search algorithm needs to be designed so that the search stops when we find the target or when we reach the end of the list.

**Binary search**
The sequential search algorithm is very slow. If we have a list of a million elements, we must do a million comparisons in the worst case. If the list is not sorted, this is the only solution. If the list is sorted, however, we can use a more efficient algorithm called **binary search**. Generally speaking, programmers use a binary search when a list is large.

A binary search starts by testing the data in the element at the middle of the list. This determines whether the target is in the first half or the second half of the list. If it is in the first half, there is no need to further check the second half. If it is in the second half, there is no need to further check the first half. In other words, we eliminate half the list from further consideration.
We repeat this process until we either find the target or satisfy ourselves that it is not in the list. Figure 8.20 shows how to find the target, 22, in a list of 12 numbers using three references: first, mid, and last.
1.  At the beginning, *first* shows 1 and *last* shows 12. Let *mid* show the middle position, (1 + 12) / 2, or 6 if truncated to an integer. Now compare the target (22) with data at position 6 (21). The target is greater than this value, so we ignore the first half of the list.
2.  Move *first* after *mid*, to position 7. Let *mid* show the middle of the second half, (7 + 12) / 2, or 9. Now compare the target (22) with data at position 9 (62). The target is smaller than this value, so we ignore the integers from this value (62) to the end.
3.  Move *last* before *mid* to position 8. Recalculate *mid* again, (8 + 7) / 2, or 7. Compare the target (22) with the value at this position (22). We have found the target and can quit.

The algorithm for binary search needs to be designed to find the target or to stop if the target is not in the list. It can be shown that if the target is not found in the list, the value of *last* becomes smaller than the value of *first*, an abnormal condition that helps us to know when to come out of the loop.

## 8.6 SUBALGORITHMS
The three programming constructs described in Section 8.2 allow us to create an algorithm for any solvable problem. The principles of structured programming, however, require that an algorithm be broken into small units called **subalgorithms**. Each subalgorithm is in turn divided into smaller subalgorithms. A good example is the algorithm for the selection sort in Figure 8.14. Finding the smallest integer in the unsorted sublist is an independent task that can be considered as a subalgorithm. (Figure 8.21). The algorithm SelectionSort calls the subalgorithm FindSmallest in each iteration.

Using subalgorithms has at least two advantages:
- It is more understandable. Looking at the SelectionSort algorithm, we can immediately see that a task (finding the smallest integer among the unsorted list) is repeated.
- A subalgorithm can be called many times in different parts of the main algorithm without being rewritten.

### 8.6.1 Structure chart
Another tool programmers use is the **structure chart**. A structure chart is a high-level design tool that shows the relationship between algorithms and subalgorithms. It is used mainly at the design level rather than at the programming level. We briefly discuss the structure chart in Appendix D.

## 8.7 RECURSION
In general, there are two approaches to writing algorithms for solving a problem. One uses *iteration*, the other uses *recursion*. **Recursion** is a process in which an algorithm calls itself.

### 8.7.1 Iterative definition
To study a simple example, consider the calculation of a factorial. The factorial of a integer is the product of the integral values from 1 to the integer. The definition is *iterative* (Figure 8.22). An algorithm is iterative whenever the definition does not involve the algorithm itself.
Factorial (n) =
1 if n = 0
n × (n − 1) × (n − 2) × ... × 3 × 2 × 1 if n > 0

### 8.7.2 Recursive definition
An algorithm is defined recursively whenever the algorithm appears within the definition itself. For example, the factorial function can be defined recursively as shown in Figure 8.23.
Factorial (n) =
1 if n = 0
n × Factorial (n − 1) if n > 0

The decomposition of factorial (3), using recursion, is shown in Figure 8.24. If we study the figure carefully, we will note that the recursive solution for a problem involves a two-way journey. First we decompose the problem from top to bottom, and then we solve it from bottom to top.

Judging by this example, it looks as if the recursive calculation is much longer and more difficult. So why would we want to use the recursive method? Although the recursive calculation looks more difficult when using paper and pencil, it is often a much easier and more elegant solution when using computers. Additionally, it offers a conceptual simplicity to the creator and the reader.

**Iterative solution**
Let us write an algorithm to solve the factorial problem iteratively. This solution usually involves a loop such as seen in Algorithm 8.6.

**Algorithm 8.6 Iteration solution to factorial problem**
Algorithm: Factorial (n)
Purpose: Find the factorial of a number using a loop
Pre: Given: n
Post: None
Return: n!
{
  F ← 1
  i ← 1
  while (i ≤ n)
  {
    F ← F × i
    i ← i + 1
  }
  return F
}

**Recursive solution**
The recursive solution to factorials is shown in Algorithm 8.7. It does not need a loop, as the recursion concept itself involves repetition. In the recursive version, we let the algorithm Factorial call itself.

**Algorithm 8.7 A recursive solution of the factorial problem**
Algorithm: Factorial (n)
Purpose: Find the factorial of a number using recursion
Pre: Given: n
Post: None
Return: n!
{
  if (n = 0)
    return 1
  else
    return n × Factorial (n – 1)
}

## 8.8 END-CHAPTER MATERIALS
### 8.8.1 Recommended reading
For more details about the subjects discussed in this chapter, the following books are recommended:
- Aho, A., Hopcroft, J. and Ullman, J. *The Design and Analysis of Computer Algorithms*, Boston, MA: Addison-Wesley, 1974
- Cormen, T., Leiserson, C. and Rivest, R. *Introduction to Algorithms*, New York: McGraw-Hill, 2003
- Gries, D. *The Science of Programming*, New York: Springer, 1998
- Tardos, E. and Kleinberg, J. *Algorithm Design*, Boston, MA: Addison-Wesley, 2006
- Roberts, E. *Thinking Recursively*, New York: Wiley, 1998

### 8.8.2 Key terms
- algorithm
- binary search
- bubble sort
- decision
- input data
- insertion sort
- loop
- output data
- product
- pseudocode
- recursion
- repetition
- searching
- selection
- selection sort
- sequence
- sequential search
- sorting
- structure chart
- subalgorithm
- summation
- Unified Modeling Language (UML)

### 8.8.3 Summary
- An algorithm can be informally defined as ‘a step-by-step method for solving a problem or doing a task’. More formally, an algorithm is defined as ‘an ordered set of unambiguous steps that produces a result and terminates in a finite time’.
- Computer scientists have defined three constructs for a structured program or algorithm: sequence, decision (selection), and repetition (loop).
- Several tools have been designed to show an algorithm: UML, pseudocode, and structure charts. UML is a pictorial representation of an algorithm. Pseudocode is an English-language-like representation of an algorithm. A structure chart is a high-level design tool that shows the relationship between algorithms and subalgorithms.
- Several algorithms are used in computer science so prevalently that they are considered basic. We discussed the most common in this chapter: summation, product, finding the smallest and largest, sorting, and searching.
- One of the most common applications in computer science is sorting, which is the process by which data is arranged according to its value. We introduced three primitive but fundamental, sorting algorithms: selection sort, bubble sort, and insertion sort. These three sorting algorithms are the foundation of the faster sorts used in computer science today.
- Another common algorithm in computer science is searching, which is the process of finding the location of a target among a list of objects. There are two basic searches for lists: sequential search and binary search. Sequential search can be used to locate an item in any list, whereas binary search requires the list to be sorted.
- The principles of structured programming require that an algorithm be broken into small units called subalgorithms. Each subalgorithm is in turn divided into smaller subalgorithms.
- In general, there are two approaches to writing algorithms to solve a problem. One uses iteration, the other uses recursion. An algorithm is iterative whenever the definition does not involve the algorithm itself. An algorithm is defined recursively whenever the algorithm appears within the definition itself.

## 8.9 PRACTICE SET
### 8.9.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 8.9.2 Review questions
1. What is the formal definition of an algorithm?
2. Define the three constructs used in structured programming.
3. How is a UML diagram related to an algorithm?
4. How is pseudocode related to an algorithm?
5. What is the purpose of a sorting algorithm?
6. What are the three basic sorting algorithms discussed in this chapter?
7. What is the purpose of a searching algorithm?
8. What are the two basic searching algorithms discussed in this chapter?
9. Give a definition and an example of an iterative process.
10. Give a definition and an example of a recursive process.

### 8.9.3 Problems
1. Using the summation algorithm, make a table to show the value of the sum after each integer in the following list is processed:
   20 12 70 81 45 13 81
2. Using the product algorithm, make a table to show the value of the product after each integer in the following list is processed:
   2 12 8 11 10 5 20
3. Using the FindLargest algorithm, make a table to show the value of Largest after each integer in the following list is processed:
   18 12 8 20 10 32 5
4. Using the FindSmallest algorithm, make a table to show the value of Smallest after each integer in the following list is processed:
   18 3 11 8 20 1 2
5. Using the selection sort algorithm, manually sort the following list and show your work in each pass using a table:
   14 7 23 31 40 56 78 9 2
6. Using the bubble sort algorithm, manually sort the following list and show your work in each pass using a table:
   14 7 23 31 40 56 78 9 2
7. Using the insertion sort algorithm, manually sort the following list and show your work in each pass:
   7 23 31 40 56 78 9 2
8. A list contains the following elements. The first two elements have been sorted using the selection sort algorithm. What is the value of the elements in the list after three more passes of the selection sort?
   7 8 26 44 13 23 98 57
9. A list contains the following elements. The first two elements have been sorted using the bubble sort algorithm. What is the value of the elements in the list after three more passes of the bubble sort?
   7 8 26 44 13 23 57 98
10. A list contains the following elements. The first two elements have been sorted using the insertion sort algorithm. What is the value of the elements in the list after three more passes of the insertion sort?
    3 13 7 26 44 23 98 57
11. A list contains the following elements. Using the binary search algorithm, trace the steps followed to find 88. At each step, show the values of first, last, and mid:
    8 13 17 26 44 56 88 97
12. A list contains the following elements. Using the binary search algorithm, trace the steps followed to find 20. At each step, show the values of first, last, and mid:
    17 26 44 56 88 97
13. Using Figure 8.19 in section 8.5.1 (sequential search) show all the steps to try to find a target of 11 (which is not in the list).
14. Using Figure 8.20 in section 8.5.5 (binary search) show all the steps try to find a target of 17 (which is not in the list).
15. Apply the iterative definition of the Factorial algorithm to show the value of F in each step when finding the value of 6! (6 factorial).
16. Apply the recursive definition of the Factorial algorithm to show the value of Factorial in each step when finding the value of 6!
17. Write a recursive algorithm in pseudocode to find the greatest common divisor (gcd) of two integers using the definition in Figure 8.25. In this definition, the expression ‘x mod y’ means dividing x by y and using the remainder as the result of the operation.
    gcd (x, y) = x if y = 0
    gcd (x, y) = gcd (y, x mod y) otherwise
18. Using the definition of Figure 8.25, find the following:
    a. gcd (7, 41)
    b. gcd (12, 100)
    c. gcd (80, 4)
    d. gcd (17, 29)
19. Write a recursive algorithm in pseudocode to find the combination of n objects taken k at a time using the definition in Figure 8.26.
    C(n, k) = 1 if k = 0 or n = k
    C(n, k) = C(n-1, k) + C(n-1, k-1) if n > k > 0
20. Using the definition in Figure 8.26, find the following:
    a. C (3, 2)
    b. C (5, 5)
    c. C (2, 7)
    d. C (4, 3)
21. The Fibonacci sequence, Fib (n), is used in science and mathematics as shown in Figure 8.27. Write a recursive algorithm in pseudocode to calculate the value of Fib (n).
    Fib(n) = 0 if n = 0
    Fib(n) = 1 if n = 1
    Fib(n) = Fib(n-1) + Fib(n-2) if n > 1
22. Using the definition of Figure 8.27, find the following:
    a. Fib(2)
    b. Fib(3)
    c. Fib(4)
    d. Fib(5)
23. Draw a UML diagram for the selection sort algorithm that uses two loops. The nested loop is used to find the smallest element in the unsorted sublist.
24. Draw a UML diagram for the bubble sort algorithm that uses two loops. The nested loop is used to swap adjacent items in the unsorted sublist.
25. Draw a UML diagram for the insertion sort algorithm that uses two loops. The nested loop is used to do the insertion into the sorted sublist.
26. Draw a UML diagram for the bubble sort algorithm that uses a subalgorithm. The subalgorithm bubbles the unsorted sublist.
27. Draw a UML diagram for the insertion sort algorithm that uses a subalgorithm. The subalgorithm is used to do the insertion into the sorted sublist.
28. Write an algorithm in pseudocode for the UML diagram in Figure 8.9 in section 8.5.1 (summation).
29. Write an algorithm in pseudocode for the UML diagram in Figure 8.10 in section 8.5.5 (product).
30. Write an algorithm in pseudocode for the selection sort using two nested loops.
31. Write an algorithm in pseudocode for the selection sort using a subalgorithm to find the smallest integer in the unsorted sublist.
32. Write an algorithm in pseudocode for the bubble sort using two nested loop.
33. Write an algorithm in pseudocode for the bubble sort using a subalgorithm to do bubbling in the unsorted sublist.
34. Write an algorithm in pseudocode for the insertion sort using two nested loop.
35. Write an algorithm in pseudocode for the insertion sort using a subalgorithm to do insertion in the sorted sublist.
36. Write an algorithm in pseudocode for the sequential search algorithm. Include the condition for algorithm termination if the target is found or not found.
37. Write an algorithm in pseudocode for the binary search algorithm. Include the condition for algorithm termination if the target is found or not found.
38. Using the UML diagram for the product algorithm, draw a diagram to calculate the value of $x^n$, when $x$ and $n$ are two given integers.
39. Write an algorithm in pseudocode to find the value of $x^n$, when $x$ and $n$ are two given integers.
`,
  zh: `
# 第八章：演算法

在本章中，我們介紹演算法的概念，即解決問題的逐步程序。然後我們討論開發演算法所使用的工具。最後，我們給出一些常見的迭代和遞迴演算法的範例。

## 學習目標
學完本章後，學生應能：
- 定義演算法並將其與問題解決聯繫起來。
- 定義循序、選擇和重複三個建構，並描述它們在演算法中的應用。
- 描述 UML 圖以及它們如何用於表示演算法。
- 描述偽代碼以及它如何用於表示演算法。
- 列出基本演算法及其應用。
- 描述排序的概念，並理解三種原始排序演算法背後的機制。
- 描述搜尋的概念，並理解兩種常見搜尋演算法背後的機制。
- 定義子演算法及其與演算法的關係。
- 區分迭代和遞迴演算法。

## 8.1 概念
在本節中，我們非正式地定義**演算法**，並使用一個範例來詳細說明該概念。

### 8.1.1 非正式定義
演算法的非正式定義是：

**演算法：解決問題或執行任務的逐步方法。**

在這個定義中，演算法獨立於電腦系統。更具體地說，我們還應該注意，演算法接受**輸入資料**並創建**輸出資料**（圖 8.1）。

### 8.1.2 範例
讓我們用一個例子來詳細說明這個簡單的定義。我們想要開發一個演算法來找出正整數列表中的最大整數。該演算法應該能在任何大小的列表中找到最大整數（例如 5、1000、10000、1000000）。該演算法應該是通用的，不依賴於整數的數量。

顯然，在許多整數中找到最大整數是一項無法一步完成的任務，無論是由人類還是電腦。演算法需要逐一測試每個整數。

為了解決這個問題，我們需要一種直觀的方法。首先使用少量的整數（例如五個），然後將解決方案擴展到任意數量的整數。我們對五個整數的解決方案遵循與一千或一百萬個整數相同的原則和限制。假設，即使對於五個整數的情況，演算法也是逐一處理整數。它查看第一個整數，而不知道其餘整數的值。在處理完第一個整數後，它查看第二個整數，依此類推。圖 8.2 顯示了解決這個問題的一種方法。

我們稱此演算法為 FindLargest。每個演算法都有一個名稱，以區別於其他演算法。該演算法接收五個整數的列表作為輸入，並給出最大整數作為輸出。

**輸入**
演算法接受五個整數的列表作為輸入。

**處理**
演算法使用以下五個步驟來找到最大整數：
**步驟 1**
在此步驟中，演算法檢查第一個整數 (12)。由於它不知道其他整數的值，它決定最大整數（目前為止）是第一個整數。演算法定義一個名為 Largest 的資料項目，並將其值設定為第一個整數 (12)。
**步驟 2**
目前為止的最大整數是 12，但新的整數可能會改變這種情況。演算法比較 Largest 的值 (12) 和第二個整數的值 (8)。它發現 Largest 大於第二個整數，這意味著 Largest 仍然持有最大整數。無需更改 Largest 的值。
**步驟 3**
目前為止的最大整數是 12，但新的整數 (13) 大於 Largest。這意味著 Largest 的值不再有效。Largest 的值應該被第三個整數 (13) 替換。演算法將 Largest 的值更改為 13 並移動到下一步。
**步驟 4**
在此步驟中沒有任何更改，因為 Largest 大於第四個整數 (9)。
**步驟 5**
同樣沒有任何更改，因為 Largest 大於第五個整數 (11)。

**輸出**
因為沒有更多的整數需要處理，演算法輸出 Largest 的值，即 13。

### 8.1.3 定義動作
圖 8.2 沒有顯示每一步應該做什麼。我們可以修改圖形以顯示更多細節。例如，在步驟 1 中，將 Largest 設定為第一個數字的值。然而，在步驟 2 到 5 中，需要額外的動作來將 Largest 的值與當前正在處理的整數進行比較。如果當前整數大於 Largest，則將 Largest 的值設定為當前整數（圖 8.3）。

### 8.1.4 精化
這個演算法需要精化才能被程式設計社群接受。有兩個問題。首先，第一步中的動作與其他步驟不同。其次，步驟 2 到 5 中的措辭不盡相同。我們可以透過將步驟 2 到 5 中的措辭更改為「如果當前整數大於 Largest，則將 Largest 設定為當前整數」來輕鬆地重新定義演算法以消除這兩個不便。第一步與其他步驟不同的原因是 Largest 沒有初始化。

如果我們將 Largest 初始化為 $-\\infty$（負無窮大），那麼第一步就可以與其他步驟相同，因此我們添加一個新步驟，稱為步驟 0，以表明它應該在處理任何整數之前完成。
圖 8.4 顯示了這種精化的結果。請注意，我們不必顯示所有步驟，因為它們現在是相同的。

### 8.1.5 一般化
是否可以將演算法一般化？我們想找出 $n$ 個正整數中的最大值，其中 $n$ 可以是 1000、1000000 或更多。當然，我們可以按照圖 8.4 重複每個步驟。但是如果我們將演算法更改為程式，那麼我們需要實際輸入 $n$ 個步驟的動作！
有一個更好的方法可以做到這一點。我們可以告訴電腦重複這些步驟 $n$ 次。我們現在將此功能包含在我們的圖形演算法中（圖 8.5）。

## 8.2 三個建構
電腦科學家為結構化程式或演算法定義了三個建構。這個想法是程式必須僅由這三個建構的組合組成：*循序*、*決策*和*重複*（圖 8.6）。已經證明不需要任何其他建構。僅使用這些建構使程式或演算法易於理解、除錯或更改。

### 8.2.1 循序 (Sequence)
第一個建構稱為**循序**。一個演算法，以及最終的一個程式，是一系列的指令，可以是一個簡單的指令或是其他兩個建構之一。

### 8.2.2 決策 (Decision)
有些問題不能僅用一系列簡單指令來解決。有時我們需要測試一個條件。如果測試結果為真，我們遵循一系列指令：如果為假，我們遵循另一系列指令。這稱為**決策（選擇）**建構。

### 8.2.3 重複 (Repetition)
在某些問題中，必須重複相同的指令序列。我們使用**重複**或**迴圈**建構來處理這個問題。在一組整數中尋找最大整數可以使用這種建構。

## 8.3 演算法表示法
到目前為止，我們一直使用圖形來傳達演算法的概念。在過去的幾十年裡，已經設計了用於此目的的工具。這裡介紹其中兩個工具：UML 和偽代碼。

### 8.3.1 UML
**統一塑模語言 (UML)** 是演算法的圖形表示。它隱藏了演算法的所有細節，試圖給出「大圖」並展示演算法從開始到結束的流程。
UML 在附錄 B 中有詳細介紹。這裡我們只展示如何使用 UML 表示這三個建構（圖 8.7）。請注意，UML 允許我們有很大的靈活性，如附錄 B 所示。例如，如果假的部分沒有動作，則決策建構可以簡化。

### 8.3.2 偽代碼 (Pseudocode)
**偽代碼**是演算法的類英語表示法。偽代碼沒有標準——有些人使用大量細節，有些人使用較少。有些人使用接近英語的代碼，而有些人使用像 Pascal 程式語言一樣的語法。偽代碼在附錄 C 中有詳細介紹。這裡我們只展示如何用偽代碼表示這三個建構（圖 8.8）。

> **範例 8.1**
> 用偽代碼編寫一個演算法，找出兩個整數之和。
>
> **解答**
>這是一個簡單的問題，可以僅使用循序建構來解決。另請注意，我們命名演算法，定義演算法的輸入，並在最後使用 return 指令回傳總和（演算法 8.1）。
>
> **演算法 8.1 計算兩個整數之和**
> 演算法：SumOfTwo (first, second)
> 目的：找出兩個整數之和
> 前置條件：給定：兩個整數 (first 和 second)
> 後置條件：無
> 回傳：總和值
> {
>   sum ← first + second
>   return sum
> }

> **範例 8.2**
> 編寫一個演算法將數字成績更改為及格/不及格成績。
>
> **解答**
> 這個問題不能僅用循序建構來解決。我們還需要決策建構。電腦被給予一個 0 到 100 之間的整數。如果整數大於或等於 70，它回傳「及格」，如果整數小於 70，則回傳「不及格」。演算法 8.2 顯示了此演算法的偽代碼。
>
> **演算法 8.2 分配及格/不及格成績**
> 演算法：Pass/NoPass (score)
> 目的：根據分數創建及格/不及格成績
> 前置條件：給定：要更改為成績的分數
> 後置條件：無
> 回傳：成績
> {
>   if (score ≥ 70)
>     grade ← “pass”
>   else
>     grade ← “nopass”
>   return grade
> }

> **範例 8.3**
> 編寫一個演算法將數字成績（整數）更改為字母成績。
>
> **解答**
> 這個問題需要多個決策。演算法 8.3 中的偽代碼顯示了解決問題的一種方法——不是最好的方法，但很容易理解。再次，給定一個 0 到 100 之間的整數，我們想將其更改為字母成績（A、B、C、D 或 F）。
>
> **演算法 8.3 分配字母成績**
> 演算法：LetterGrade (score)
> 目的：找出對應於給定分數的字母成績
> 前置條件：給定：一個數字分數
> 後置條件：無
> 回傳：一個字母成績
> {
>   if (100 ≥ score ≥ 90)
>     grade ← ’A’
>   if (89 ≥ score ≥ 80)
>     grade ← ’B’
>   if (79 ≥ score ≥ 70)
>     grade ← ’C’
>   if (69 ≥ score ≥ 60)
>     grade ← ’D’
>   if (59 ≥ score ≥ 0)
>     grade ← ’F’
>   return grade
> }
> 請注意，決策建構不需要 else 部分，因為如果條件為假，我們什麼也不做。

> **範例 8.4**
> 編寫一個演算法來找出一組整數中的最大值。我們不知道整數的數量。
>
> **解答**
> 我們使用 217 頁圖 8.5 中的概念為此問題編寫演算法（見演算法 8.4）。
>
> **演算法 8.4 在一組整數中找出最大整數**
> 演算法：FindLargest (list)
> 目的：在一組整數中找出最大整數
> 前置條件：給定：整數集合
> 後置條件：無
> 回傳：最大整數
> {
>   largest ← –∞
>   while (還有更多整數要檢查)
>   {
>     current ← 下一個整數
>     if (current > largest)
>       largest ← current
>   }
>   return largest
> }

> **範例 8.5**
> 編寫一個演算法來找出一組整數中前 1000 個整數的最小值。
>
> **解答**
> 這裡我們需要一個計數器來計算整數的數量。我們將計數器初始化為 1，並在每次重複中遞增它。當計數器大於 1000 時，我們退出迴圈（見演算法 8.5）。請注意，列表中有超過 1000 個整數，但我們想在前 1000 個整數中找到最小值。
>
> **演算法 8.5 在 1000 個整數中找出最小整數**
> 演算法：FindSmallest (list)
> 目的：找出並回傳前 1000 個整數中的最小整數
> 前置條件：給定具有超過 1000 個整數的整數集合
> 後置條件：無
> 回傳：最小整數
> {
>   smallest ← +∞
>   counter ← 1
>   while (counter ≤ 1000)
>   {
>     current ← 下一個整數
>     if (current < smallest)
>       smallest ← current
>     counter ← counter + 1
>   }
>   return smallest
> }

## 8.4 更正式的定義
現在我們已經討論了演算法的概念並展示了它的表示法，這裡有一個更正式的定義。讓我們詳細說明這個定義。

**演算法：一個有序、無歧義的步驟集合，能在有限時間內產生結果並終止。**

### 8.4.1 定義明確 (Well-Defined)
演算法必須是一組定義明確、有序的指令。

### 8.4.2 無歧義的步驟 (Unambiguous steps)
演算法中的每一步都必須清晰且無歧義地定義。如果一步是*將兩個整數相加*，我們必須定義「整數」以及「加法」操作：我們不能例如在一個地方使用相同的符號表示加法，在另一個地方表示乘法。

### 8.4.3 產生結果 (Produce a result)
演算法必須產生結果，否則它是無用的。結果可以是回傳給呼叫演算法的資料，或其他效果（例如，列印）。

### 8.4.4 在有限時間內終止 (Terminate in a finite time)
演算法必須終止（停止）。如果不終止（即它有一個無限迴圈），我們就沒有創建出演算法。在第 17 章中，我們將討論*可解*和*不可解*問題，我們將看到可解問題具有以終止的演算法形式存在的解決方案。

## 8.5 基本演算法
有幾種演算法在電腦科學中使用得非常普遍，以至於它們被認為是「基本」的。我們在這裡討論最常見的。這個討論非常一般：實作取決於語言。

### 8.5.1 總和 (Summation)
電腦科學中常用的一種演算法是**總和**。我們可以很容易地將兩個或三個整數相加，但是我們如何將許多整數相加？解決方案很簡單：我們在迴圈中使用加法運算子（圖 8.9）。
總和演算法有三個邏輯部分：
1.  開始時總和的初始化。
2.  迴圈，在每次迭代中將一個新整數加到總和中。
3.  退出迴圈後回傳結果。

### 8.5.2 乘積 (Product)
另一個常見的演算法是找出一列整數的**乘積**。解決方案很簡單：在迴圈中使用乘法運算子（圖 8.10）。乘積演算法有三個邏輯部分：
1.  開始時乘積的初始化。
2.  迴圈，在每次迭代中將一個新整數與乘積相乘。
3.  退出迴圈後回傳結果。

例如，前面的演算法可以用稍加修改來計算 $x^n$——這留作練習。另一個例子，同樣的演算法可以用來計算整數的階乘，這將在本章稍後討論。

### 8.5.3 最小與最大 (Smallest and largest)
我們在本章開頭討論了在一列整數中找出最大值的演算法。其想法是編寫一個決策建構來找出兩個整數中較大的一個。如果我們將此建構放在迴圈中，我們可以找出一列整數中的最大值。
在一列整數中找出最小整數是類似的，只有兩個小的區別。首先，我們使用決策建構來找出兩個整數中較小的一個。其次，我們使用一個非常大的整數而不是非常小的整數進行初始化。圖 8.11 顯示了在一列整數中找出最小值的演算法。找出最大值的圖形是類似的，留作練習。

### 8.5.4 排序 (Sorting)
電腦科學中最常見的應用之一是**排序**，這是根據資料的值排列資料的過程。人們被資料包圍。如果資料沒有排序，將需要數小時才能找到單一資訊。想像一下在未排序的電話簿中尋找某人電話號碼的困難。
在本節中，我們介紹三種排序演算法：選擇排序、氣泡排序和插入排序。這三種排序演算法是當今電腦科學中使用的更快速排序演算法的基礎。

**選擇排序 (Selection sorts)**
在**選擇排序**中，要排序的列表被分為兩個子列表——已排序和未排序——它們由一堵想像的牆隔開。我們從未排序子列表中找出最小元素，並將其與未排序子列表開頭的元素交換。每次選擇和交換後，兩個子列表之間的想像牆向前移動一個元素，增加已排序元素的數量並減少未排序元素的數量。每次我們將一個元素從未排序子列表移動到已排序子列表時，我們就完成了一次排序遍歷。一個 $n$ 個元素的列表需要 $n - 1$ 次遍歷才能完全重新排列資料。選擇排序在圖 8.12 中以圖形方式呈現。

圖 8.13 追蹤了一組六個整數的排序過程。
圖中顯示了已排序和未排序子列表之間的牆如何在每次遍歷中移動。當我們研究該圖時，我們會看到列表在五次遍歷後排序完成，這比列表中的元素數量少一個。因此，如果我們使用迴圈來控制排序，迴圈的迭代次數將比要排序的元素數量少一次。

**選擇排序演算法**
該演算法使用兩個迴圈，一個在另一個裡面。外部迴圈為每次遍歷進行迭代：內部迴圈在未排序列表中找出最小元素。圖 8.14 顯示了選擇排序演算法的 UML。內部迴圈在圖中沒有明確顯示，但迴圈中的第一條指令本身就是一個迴圈。我們將迴圈的演示留作練習。

**氣泡排序 (Bubble sorts)**
在**氣泡排序**方法中，要排序的列表也被分為兩個子列表——已排序和未排序。最小的元素從未排序子列表中*冒出來*並移動到已排序子列表。在最小元素移動到已排序列表後，牆向前移動一個元素，增加已排序元素的數量並減少未排序元素的數量。每次元素從未排序子列表移動到已排序子列表時，就完成了一次排序遍歷（圖 8.15）。給定一個 $n$ 個元素的列表，氣泡排序最多需要 $n - 1$ 次遍歷來排序資料。

圖 8.16 顯示了牆如何在每次遍歷中移動一個元素。看第一次遍歷，我們從 56 開始並將其與 32 比較。由於 56 不小於 32，它不移動，我們向下移動一個元素。直到我們將 45 與 8 比較才發生交換。由於 8 小於 45，兩個元素交換，我們向下移動一個元素。因為 8 被向下移動，它現在與 78 比較，這兩個元素交換。最後，8 與 23 比較並交換。這一系列的交換將 8 放置在第一個位置，牆向上移動一個位置。該演算法的名稱來自數字——在這個例子中是 8——看起來像氣泡在水中上升一樣移動到列表的開始或頂部的方式。
請注意，我們在牆移動到列表末尾之前停止了，因為列表已經排序。我們總可以在演算法中包含一個指示器，如果在一次遍歷中沒有發生數字交換，則停止遍歷。這一事實可用於透過減少步驟數來提高氣泡排序的效率。
氣泡排序最初是為了「向下冒泡」列表中的最高元素而編寫的。從效率的角度來看，移動高元素還是移動低元素沒有區別。然而，從一致性的角度來看，如果所有排序演算法都以相同的方式工作，則更容易比較它們。因此，我們選擇在每次遍歷中向上移動最低值。

**氣泡排序演算法**
氣泡排序也使用兩個迴圈，一個在另一個裡面。外部迴圈為每次遍歷進行迭代，而內部迴圈的每次迭代都試圖將一個元素冒泡到頂部（左側）。我們將 UML 和偽代碼留作練習。

**插入排序 (Insertion sorts)**
**插入排序**演算法是最常見的排序技術之一，經常被牌手使用。牌手拿起的每張牌都被插入到手中牌的適當位置以保持特定順序。（撲克牌排序是使用兩個標準進行排序的一個例子：花色和點數。）
在插入排序中，就像上面討論的其他兩種排序演算法一樣，列表分為兩部分——已排序和未排序。在每次遍歷中，未排序子列表的第一個元素被轉移到已排序子列表並插入到適當的位置（圖 8.17）。請注意，一個 $n$ 個元素的列表將需要 $n - 1$ 次遍歷來排序資料。

圖 8.18 追蹤了我們六個數字列表的插入排序過程。隨著元素從未排序子列表移出並插入到已排序子列表，牆在每次遍歷中移動。

**插入排序演算法**
插入排序的設計遵循與選擇排序和氣泡排序相同的模式。外部迴圈為每次遍歷進行迭代，內部迴圈找出插入的位置。我們將 UML 圖和偽代碼留作練習。

**其他排序演算法**
這裡討論的三種排序演算法是效率最低的排序演算法，如果需要排序的列表有超過幾百個元素，則不應使用它們。我們在這裡討論這些演算法是為了教育目的，但它們並不實用。然而，在入門書籍中討論這些排序演算法有幾個原因：
- 它們是最容易理解和分析的演算法。
- 它們是更有效率的演算法（如*快速排序、堆積排序、希爾排序、桶排序、合併排序、基數排序*等）的基礎。
大多數這樣的高級排序演算法在資料結構書籍中討論。
我們可能會問為什麼有這麼多排序演算法。原因在於需要排序的資料類型。一種演算法可能對部分排序的列表更有效率，而另一種演算法可能對完全未排序的列表更有效率。要決定哪種演算法最適合特定應用，需要一種稱為演算法複雜度的度量。我們在第 17 章討論這個問題，但徹底的理解需要程式設計和資料結構的額外課程。

### 8.5.5 搜尋 (Searching)
電腦科學中另一個常見的演算法是**搜尋**，這是在一列物件中找出目標位置的過程。在列表的情況下，搜尋意味著給定一個值，我們想找出列表中包含該值的第一個元素的位置。列表有兩種基本搜尋：**循序搜尋**和**二元搜尋**。循序搜尋可用於在任何列表中定位項目，而二元搜尋要求列表首先被排序。

**循序搜尋 (Sequential search)**
如果要在未排序的列表中搜尋，則使用**循序搜尋**。一般來說，我們只對小列表或不經常搜尋的列表使用這種技術。在其他情況下，最好的方法是先對列表進行排序，然後使用稍後討論的二元搜尋進行搜尋。
在循序搜尋中，我們從列表的開頭開始搜尋目標。我們繼續直到找到目標或到達列表的末尾。圖 8.19 追蹤了尋找值 62 的步驟。搜尋演算法需要設計成當我們找到目標或到達列表末尾時停止搜尋。

**二元搜尋 (Binary search)**
循序搜尋演算法非常慢。如果我們有一百萬個元素的列表，在最壞的情況下我們必須進行一百萬次比較。如果列表未排序，這是唯一的解決方案。然而，如果列表已排序，我們可以使用一種更有效率的演算法，稱為**二元搜尋**。一般來說，程式設計師在列表很大時使用二元搜尋。

二元搜尋從測試列表由中間的元素資料開始。這決定了目標是在列表的前半部分還是後半部分。如果在前半部分，則無需進一步檢查後半部分。如果在後半部分，則無需進一步檢查前半部分。換句話說，我們從進一步考慮中消除了一半的列表。
我們重複這個過程，直到我們找到目標或確信它不在列表中。圖 8.20 顯示了如何使用三個參考：first、mid 和 last 在 12 個數字的列表中找到目標 22。
1.  開始時，*first* 顯示 1，*last* 顯示 12。讓 *mid* 顯示中間位置，(1 + 12) / 2，或 6（如果截斷為整數）。現在將目標 (22) 與位置 6 的資料 (21) 進行比較。目標大於此值，因此我們忽略列表的前半部分。
2.  將 *first* 移到 *mid* 之後，到位置 7。讓 *mid* 顯示後半部分的中間，(7 + 12) / 2，或 9。現在將目標 (22) 與位置 9 的資料 (62) 進行比較。目標小於此值，因此我們忽略從此值 (62) 到末尾的整數。
3.  將 *last* 移到 *mid* 之前，到位置 8。再次重新計算 *mid*，(8 + 7) / 2，或 7。將目標 (22) 與此位置的值 (22) 進行比較。我們找到了目標，可以退出。

二元搜尋的演算法需要設計成找到目標或在目標不在列表中時停止。可以證明，如果在列表中找不到目標，*last* 的值會變得小於 *first* 的值，這是一個異常條件，有助於我們知道何時退出迴圈。

## 8.6 子演算法
8.2 節中描述的三種程式設計建構允許我們為任何可解問題創建演算法。然而，結構化程式設計的原則要求將演算法分解為稱為**子演算法**的小單元。每個子演算法又分為更小的子演算法。一個很好的例子是圖 8.14 中的選擇排序演算法。在未排序子列表中找出最小整數是一個獨立的任務，可以視為一個子演算法。（圖 8.21）。演算法 SelectionSort 在每次迭代中呼叫子演算法 FindSmallest。

使用子演算法至少有兩個優點：
- 它更容易理解。看 SelectionSort 演算法，我們可以立即看到一個任務（在未排序列表中找出最小整數）被重複。
- 子演算法可以在主演算法的不同部分被多次呼叫而無需重寫。

### 8.6.1 結構圖 (Structure chart)
程式設計師使用的另一個工具是**結構圖**。結構圖是一種高階設計工具，顯示演算法和子演算法之間的關係。它主要用於設計層級而不是程式設計層級。我們在附錄 D 中簡要討論結構圖。

## 8.7 遞迴
一般來說，編寫演算法解決問題有兩種方法。一種使用*迭代*，另一種使用*遞迴*。**遞迴**是一個演算法呼叫自身的過程。

### 8.7.1 迭代定義
為了研究一個簡單的例子，考慮階乘的計算。整數的階乘是從 1 到該整數的整數值的乘積。定義是*迭代的*（圖 8.22）。只要定義不涉及演算法本身，演算法就是迭代的。
Factorial (n) =
1 如果 n = 0
n × (n − 1) × (n − 2) × ... × 3 × 2 × 1 如果 n > 0

### 8.7.2 遞迴定義
每當演算法出現在定義本身中時，演算法就被遞迴地定義。例如，階乘函數可以遞迴地定義，如圖 8.23 所示。
Factorial (n) =
1 如果 n = 0
n × Factorial (n − 1) 如果 n > 0

使用遞迴分解 factorial (3) 如圖 8.24 所示。如果我們仔細研究該圖，我們會注意到解決問題的遞迴解決方案涉及雙向旅程。首先我們將問題從上到下分解，然後我們從下到上解決它。

從這個例子來看，遞迴計算似乎更長更困難。那麼我們為什麼要使用遞迴方法呢？雖然在使用紙筆時遞迴計算看起來更困難，但在使用電腦時，它通常是一種更容易、更優雅的解決方案。此外，它為創建者和讀者提供了概念上的簡單性。

**迭代解決方案**
讓我們編寫一個演算法來迭代地解決階乘問題。這個解決方案通常涉及一個迴圈，如演算法 8.6 所示。

**演算法 8.6 階乘問題的迭代解決方案**
演算法：Factorial (n)
目的：使用迴圈找出數字的階乘
前置條件：給定：n
後置條件：無
回傳：n!
{
  F ← 1
  i ← 1
  while (i ≤ n)
  {
    F ← F × i
    i ← i + 1
  }
  return F
}

**遞迴解決方案**
階乘的遞迴解決方案如演算法 8.7 所示。它不需要迴圈，因為遞迴概念本身涉及重複。在遞迴版本中，我們讓演算法 Factorial 呼叫自身。

**演算法 8.7 階乘問題的遞迴解決方案**
演算法：Factorial (n)
目的：使用遞迴找出數字的階乘
前置條件：給定：n
後置條件：無
回傳：n!
{
  if (n = 0)
    return 1
  else
    return n × Factorial (n – 1)
}

## 8.8 章末材料
### 8.8.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Aho, A., Hopcroft, J. and Ullman, J. *The Design and Analysis of Computer Algorithms*, Boston, MA: Addison-Wesley, 1974
- Cormen, T., Leiserson, C. and Rivest, R. *Introduction to Algorithms*, New York: McGraw-Hill, 2003
- Gries, D. *The Science of Programming*, New York: Springer, 1998
- Tardos, E. and Kleinberg, J. *Algorithm Design*, Boston, MA: Addison-Wesley, 2006
- Roberts, E. *Thinking Recursively*, New York: Wiley, 1998

### 8.8.2 關鍵詞
- 演算法 (algorithm)
- 二元搜尋 (binary search)
- 氣泡排序 (bubble sort)
- 決策 (decision)
- 輸入資料 (input data)
- 插入排序 (insertion sort)
- 迴圈 (loop)
- 輸出資料 (output data)
- 乘積 (product)
- 偽代碼 (pseudocode)
- 遞迴 (recursion)
- 重複 (repetition)
- 搜尋 (searching)
- 選擇 (selection)
- 選擇排序 (selection sort)
- 循序 (sequence)
- 循序搜尋 (sequential search)
- 排序 (sorting)
- 結構圖 (structure chart)
- 子演算法 (subalgorithm)
- 總和 (summation)
- 統一塑模語言 (UML)

### 8.8.3 摘要
- 演算法可以非正式地定義為「解決問題或執行任務的逐步方法」。更正式地說，演算法被定義為「一個有序、無歧義的步驟集合，能在有限時間內產生結果並終止」。
- 電腦科學家為結構化程式或演算法定義了三個建構：循序、決策（選擇）和重複（迴圈）。
- 已經設計了幾種工具來顯示演算法：UML、偽代碼和結構圖。UML 是演算法的圖形表示。偽代碼是演算法的類英語表示。結構圖是一種高階設計工具，顯示演算法和子演算法之間的關係。
- 有幾種演算法在電腦科學中使用得非常普遍，以至於它們被認為是基本的。我們在本章中討論了最常見的：總和、乘積、找出最小和最大值、排序和搜尋。
- 電腦科學中最常見的應用之一是排序，這是根據資料的值排列資料的過程。我們介紹了三種原始但基本的排序演算法：選擇排序、氣泡排序和插入排序。這三種排序演算法是當今電腦科學中使用的更快速排序的基礎。
- 電腦科學中另一個常見的演算法是搜尋，這是在一列物件中找出目標位置的過程。列表有兩種基本搜尋：循序搜尋和二元搜尋。循序搜尋可用於在任何列表中定位項目，而二元搜尋要求列表必須先排序。
- 結構化程式設計的原則要求將演算法分解為稱為子演算法的小單元。每個子演算法又分為更小的子演算法。
- 一般來說，編寫演算法解決問題有兩種方法。一種使用迭代，另一種使用遞迴。只要定義不涉及演算法本身，演算法就是迭代的。每當演算法出現在定義本身中時，演算法就被遞迴地定義。

## 8.9 練習題
### 8.9.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 8.9.2 複習問題
1. 演算法的正式定義是什麼？
2. 定義結構化程式設計中使用的三個建構。
3. UML 圖與演算法有何關係？
4. 偽代碼與演算法有何關係？
5. 排序演算法的目的是什麼？
6. 本章討論的三種基本排序演算法是什麼？
7. 搜尋演算法的目的是什麼？
8. 本章討論的兩種基本搜尋演算法是什麼？
9. 給出迭代過程的定義和範例。
10. 給出遞迴過程的定義和範例。

### 8.9.3 問題
1. 使用總和演算法，製作一個表格來顯示在處理下列列表中的每個整數後總和的值：
   20 12 70 81 45 13 81
2. 使用乘積演算法，製作一個表格來顯示在處理下列列表中的每個整數後乘積的值：
   2 12 8 11 10 5 20
3. 使用 FindLargest 演算法，製作一個表格來顯示在處理下列列表中的每個整數後 Largest 的值：
   18 12 8 20 10 32 5
4. 使用 FindSmallest 演算法，製作一個表格來顯示在處理下列列表中的每個整數後 Smallest 的值：
   18 3 11 8 20 1 2
5. 使用選擇排序演算法，手動排序下列列表並使用表格顯示每次遍歷的工作：
   14 7 23 31 40 56 78 9 2
6. 使用氣泡排序演算法，手動排序下列列表並使用表格顯示每次遍歷的工作：
   14 7 23 31 40 56 78 9 2
7. 使用插入排序演算法，手動排序下列列表並顯示每次遍歷的工作：
   7 23 31 40 56 78 9 2
8. 一個列表包含以下元素。前兩個元素已使用選擇排序演算法排序。在選擇排序再進行三次遍歷後，列表中的元素值是什麼？
   7 8 26 44 13 23 98 57
9. 一個列表包含以下元素。前兩個元素已使用氣泡排序演算法排序。在氣泡排序再進行三次遍歷後，列表中的元素值是什麼？
   7 8 26 44 13 23 57 98
10. 一個列表包含以下元素。前兩個元素已使用插入排序演算法排序。在插入排序再進行三次遍歷後，列表中的元素值是什麼？
    3 13 7 26 44 23 98 57
11. 一個列表包含以下元素。使用二元搜尋演算法，追蹤尋找 88 所遵循的步驟。在每一步，顯示 first、last 和 mid 的值：
    8 13 17 26 44 56 88 97
12. 一個列表包含以下元素。使用二元搜尋演算法，追蹤尋找 20 所遵循的步驟。在每一步，顯示 first、last 和 mid 的值：
    17 26 44 56 88 97
13. 使用 8.5.1 節中的圖 8.19（循序搜尋）顯示嘗試尋找目標 11（不在列表中）的所有步驟。
14. 使用 8.5.5 節中的圖 8.20（二元搜尋）顯示嘗試尋找目標 17（不在列表中）的所有步驟。
15. 應用 Factorial 演算法的迭代定義，顯示在尋找 6!（6 的階乘）值時每一步 F 的值。
16. 應用 Factorial 演算法的遞迴定義，顯示在尋找 6! 值時每一步 Factorial 的值。
17. 使用圖 8.25 中的定義，用偽代碼編寫一個遞迴演算法來找出兩個整數的最大公因數 (gcd)。在這個定義中，表達式「x mod y」意味著將 x 除以 y 並使用餘數作為運算結果。
    gcd (x, y) = x 如果 y = 0
    gcd (x, y) = gcd (y, x mod y) 否則
18. 使用圖 8.25 的定義，找出以下內容：
    a. gcd (7, 41)
    b. gcd (12, 100)
    c. gcd (80, 4)
    d. gcd (17, 29)
19. 使用圖 8.26 中的定義，用偽代碼編寫一個遞迴演算法來找出 n 個物件中一次取 k 個的組合。
    C(n, k) = 1 如果 k = 0 或 n = k
    C(n, k) = C(n-1, k) + C(n-1, k-1) 如果 n > k > 0
20. 使用圖 8.26 中的定義，找出以下內容：
    a. C (3, 2)
    b. C (5, 5)
    c. C (2, 7)
    d. C (4, 3)
21. 費氏數列 Fib (n) 用於科學和數學，如圖 8.27 所示。用偽代碼編寫一個遞迴演算法來計算 Fib (n) 的值。
    Fib(n) = 0 如果 n = 0
    Fib(n) = 1 如果 n = 1
    Fib(n) = Fib(n-1) + Fib(n-2) 如果 n > 1
22. 使用圖 8.27 的定義，找出以下內容：
    a. Fib(2)
    b. Fib(3)
    c. Fib(4)
    d. Fib(5)
23. 為使用兩個迴圈的選擇排序演算法繪製 UML 圖。巢狀迴圈用於在未排序子列表中找出最小元素。
24. 為使用兩個迴圈的氣泡排序演算法繪製 UML 圖。巢狀迴圈用於交換未排序子列表中的相鄰項目。
25. 為使用兩個迴圈的插入排序演算法繪製 UML 圖。巢狀迴圈用於執行插入到已排序子列表的操作。
26. 為使用子演算法的氣泡排序演算法繪製 UML 圖。子演算法對未排序子列表進行冒泡。
27. 為使用子演算法的插入排序演算法繪製 UML 圖。子演算法用於執行插入到已排序子列表的操作。
28. 為 8.5.1 節圖 8.9 中的 UML 圖（總和）編寫偽代碼演算法。
29. 為 8.5.5 節圖 8.10 中的 UML 圖（乘積）編寫偽代碼演算法。
30. 使用兩個巢狀迴圈編寫選擇排序的偽代碼演算法。
31. 使用子演算法編寫選擇排序的偽代碼演算法，以在未排序子列表中找出最小整數。
32. 使用兩個巢狀迴圈編寫氣泡排序的偽代碼演算法。
33. 使用子演算法編寫氣泡排序的偽代碼演算法，以在未排序子列表中進行冒泡。
34. 使用兩個巢狀迴圈編寫插入排序的偽代碼演算法。
35. 使用子演算法編寫插入排序的偽代碼演算法，以在已排序子列表中進行插入。
36. 編寫循序搜尋演算法的偽代碼演算法。包括如果找到或未找到目標的演算法終止條件。
37. 編寫二元搜尋演算法的偽代碼演算法。包括如果找到或未找到目標的演算法終止條件。
38. 使用乘積演算法的 UML 圖，繪製一個圖來計算 $x^n$ 的值，其中 $x$ 和 $n$ 是兩個給定的整數。
39. 用偽代碼編寫一個演算法來找出 $x^n$ 的值，其中 $x$ 和 $n$ 是兩個給定的整數。
`
};