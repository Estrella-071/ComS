
export const chapter12Content = {
  en: `
# Chapter 12: Abstract Data Types

In this chapter we discuss abstract data types (ADTs), which are data types at a higher level of abstraction than the data structures we discussed in Chapter 11. ADTs use data structures for implementation. We begin this chapter with a brief background on ADTs. We then give a definition and propose a model. The remainder of the chapter discusses various ADTs, such as stacks, queues, general linear lists, trees, binary trees, binary search trees, and graphs.

## Objectives
After studying this chapter, the student should be able to:
- Define the concept of an abstract data type (ADT).
- Define a stack, the basic operations on stacks, their applications, and how they can be implemented.
- Define a queue, the basic operations on queues, their applications, and how they can be implemented.
- Define a general linear list, the basic operations on lists, their applications, and how they can be implemented.
- Define a general tree and its application.
- Define a binary tree—a special kind of tree—and its applications.
- Define a binary search tree (BST) and its applications.
- Define a graph and its applications.

## 12.1 BACKGROUND
Problem solving with a computer means processing data. To process data, we need to define the data type and the operation to be performed on the data. For example, to find the sum of a list of numbers, we should select the type for the number (integer or real) and define the operation (addition). The definition of the data type and the definition of the operation to be applied to the data is part of the idea behind an **abstract data type (ADT)**—to hide how the operation is performed on the data. In other word, the user of an ADT needs only to know that a set of operations are available for the data type, but does not need to know how they are applied.

### 12.1.1 Simple ADTs
Many programming languages already define some simple ADTs as integral parts of the language. For example, the C language defines a simple ADT called an *integer*. The type of this ADT is integer with predefined ranges. C also defines several operations that can be applied on this data type (addition, subtraction, multiplication, division, and so on). C explicitly defines these operations on integers and what we expect as the results. A programmer who writes a C program to add two integers should know about the integer ADT and the operations that can be applied to it.

The programmer, however, does not need to know *how* these operations are actually implemented. For example, the programmer uses the expression $z \\leftarrow x + y$ and expects the value of $x$ (an integer) to be added to the value of $y$ (an integer) and the result to be named $z$ (an integer). The programmer does not need to know how the addition is performed. We learned in previous chapters that the way this addition is done by a computer is to store the two integers in two memory locations in two’s complement format, to load them into the CPU register, to add them in binary, and to store the result back to another memory location. The programmer, however, does not need to know this. An integer in C is a simple abstract data type with predefined operations. How the operations are performed is not a concern for the programmer.

### 12.1.2 Complex ADTs
Although several simple ADTs, such as integer, real, character, pointer, and so on, have been implemented and are available for use in most languages, many useful complex ADTs are not. As we will see in this chapter, we need a list ADT, a stack ADT, a queue ADT, and so on. To be efficient, these ADTs should be created and stored in the library of the computer to be used. The user of a *list*, for example, should only need to know what operations are available for the list, not how these operations are performed.

Therefore, with an ADT, users are not concerned with *how* the task is done, but rather with *what* it can do. In other words, the ADT consists of a set of definitions that allow programmers to use the operation while their implementation is hidden. This generalization of operations with unspecified implementations is known as abstraction. We abstract the essence of the process and leave the implementation details hidden.

**The concept of abstraction means:**
1. **We know what a data type can do.**
2. **How it is done is hidden.**

### 12.1.3 Definition
Let us now define an ADT. An abstract data type is a data type packaged with the operations that are meaningful for the data type. We then encapsulate the data and the operations on the data and hide them from the user.

**Abstract Data Type**
1. **Definition of data**
2. **Definition of operations**
3. **Encapsulation of data and operation**

### 12.1.4 Model for an abstract data type
The ADT model is shown in Figure 12.1. The colored area with an irregular outline represents the ADT. Inside the ADT are two different parts of the model: *data structure* and *operations* (public and private). The application program can only access the public operations through the **interface**. An interface is a list of public operations and data to be passed to or returned from those operations. The private operations are for internal use by the ADT. The data structures, such as arrays and linked lists, are inside the ADT and are used by the public and private operations.

Although the public operations and the interface should be independent of the implementation, the private operations are dependent on the data structures chosen during the implementation of the ADT. We will elaborate on this issue when we discuss some of the ADTs.

### 12.1.5 Implementation
Computer languages do not provide ADT packages. To use an ADT, it is first implemented and kept in a library. The main purpose of this chapter is to introduce some common ADTs and their applications. However, we also give a brief discussion of each ADT implementation for the interested reader. We leave the pseudocode algorithms of the implementations as challenging exercises.

## 12.2 STACKS
A **stack** is a restricted **linear list** in which all additions and deletions are made at one end, the top. If we insert a series of data into a stack and then remove it, the order of the data is reversed. Data input as 5, 10, 15, 20, for example, would be removed as 20, 15, 10, and 5. This reversing attribute is why stacks are known as a **last in, first out (LIFO)** data structure.

We use many different types of stacks in our daily lives. We often talk of a stack of coins or a stack of books. Any situation in which we can only add or remove an object at the top is a stack. If we want to remove an object other than the one at the top, we must first remove all objects above it. Figure 12.2 shows three representations of stacks.

### 12.2.1 Operations on stacks
Although we can define many operations for a stack, there are four basic operations, *stack*, *push*, *pop*, and *empty*, which we define in this chapter.

**The stack operation**
The *stack* operation creates an empty stack. The following shows the format:
\`stack (stackName)\`
*stackName* is the name of the stack to be created. This operation returns an empty stack. Figure 12.3 shows the pictorial representation of this operation.

**The push operation**
The *push* operation inserts an item at the top of the stack. The following shows the format:
\`push (stackName, dataItem)\`
*stackName* is the name of the stack and *dataItem* is the data to be inserted at the top of the stack. After the push operation, the new item becomes the top item in the stack. This operation returns the new stack with *dataItem* inserted at the top. Figure 12.4 shows the pictorial representation of this operation.

**The pop operation**
The *pop* operation deletes the item at the top of the stack. The following shows the format:
\`pop (stackName, dataItem)\`
*stackName* is the name of the stack and *dataItem* is the data that is deleted from the stack. Figure 12.5 shows the pictorial representation of this operation.
The deleted item can be used by the application program or can be just discarded. After the pop operation, the item that was under the top element before the deletion becomes the top element. This operation returns the new stack with one less element.

**The empty operation**
The *empty* operation checks the status of the stack. The following shows the format:
\`empty (stackName)\`
The *stackName* is the name of the stack. This operation returns *true* if the stack is empty and *false* if the stack is not empty.

### 12.2.2 Stack ADT
We define a stack as an ADT as shown below:

**Stack ADT**
**Definition**
A list of data items that can only be accessed at one end, called the top.
**Operations**
*stack*: Creates an empty stack.
*push*: Inserts an element at the top.
*pop*: Deletes the top element.
*empty*: Checks the status of the stack.

> **Example 12.1**
> Figure 12.6 shows a segment of an algorithm that applies the previously defined operations on a stack S. The fourth operation checks the status of the stack before trying to pop the top element. The value of the top element is stored in the variable x. However, we do not use this value: it will be automatically discarded at the end of the algorithm segment.

### 12.2.3 Stack applications
Stack applications can be classified into four broad categories: reversing data, pairing data, postponing data usage, and backtracking steps. We discuss the first two in the sections that follow.

**Reversing data items**
Reversing data items requires that a given set of data items be reordered so that the first and last items are exchanged, with all of the positions between the first and last being relatively exchanged also. For example, the list (2, 4, 7, 1, 6, 8) becomes (8, 6, 1, 7, 4, 2).

> **Example 12.2**
> In Chapter 2 (Figure 2.6 in section 2.2.6) we gave a simple UML diagram to convert an integer from decimal to any base. Although the algorithm is very simple, if we print the digits of the converted integer as they are created, we will get the digits in reverse order. The print instruction in any computer language prints characters from left to right, but the algorithm creates the digits from right to left. We can use the reversing characteristic of a stack (LIFO structure) to solve the problem.
> Algorithm 12.1 shows the pseudocode to convert a decimal integer to binary and print the result.

**Algorithm 12.1 Example 2.2**
\`\`\`
Algorithm: DecimalToBinary (number)
Purpose: Print the binary equivalent of a given integer (absolute value)
Pre: Given the integer to be converted (number)
Post: The binary integer is printed
Return: None
{
    stack (S)
    while (number ≠ 0)
    {
        remainder ← number mod 2
        push (S, remainder)
        number ← number / 2
    }
    while (not empty (S))
    {
        pop (S, x)
        print (x)
    }
    return
}
\`\`\`
We create an empty stack first. Then we use a *while* loop to create the bits, but instead of printing them, we push them into the stack. When all bits are created, we exit the loop. Now we use another loop to pop the bits from the stack and print them. Note that the bits are printed in the reverse order to that in which they have been created.

**Pairing data items**
We often need to pair some characters in an expression. For example, when we write a mathematical expression in a computer language, we often need to use parentheses to change the precedence of operators. The following two expressions are evaluated differently because of the parentheses in the second expression:
3 × 6 + 2 = 20     3 × (6 + 2) = 24
In the first expression, the multiplication operator has precedence over the addition operator—it is calculated first. In the second expression, the parentheses ignore the precedence, so the addition is calculated first. When we type an expression with a lot of parentheses, we often forget to pair the parentheses. One of the duties of a compiler is to do the checking for us. The compiler uses a stack to check that all opening parentheses are paired with a closing parentheses.

> **Example 12.3**
> Algorithm 12.2 shows how we can check if every opening parenthesis is paired with a closing parenthesis.

**Algorithm 12.2 Example 12.3**
\`\`\`
Algorithm: CheckingParentheses (expression)
Purpose: Check the pairing of parentheses in an expression
Pre: Given the expression to be checked
Post: Error messages if unpaired parentheses are found
Return: None
{
    stack (S)
    while (more character in the expression)
    {
        Char ← next character
        if (Char = '(')
        {
            push (S, Char)
        }
        else
        {
            if (Char = ')')
            {
                if (empty (S))
                {
                    print (unmatched opening parenthesis)
                }
                else
                {
                    pop (S, x)
                }
            }
        }
    }
    if (not empty (S))
    {
        print (a closing parenthesis not matched)
    }
    return
}
\`\`\`

### 12.2.4 Stack implementation
In this section we describe the general ideas behind the implementation of a stack ADT. At the ADT level, we use the stack and its four operations (*stack*, *push*, *pop*, and *empty*): at the implementation level, we need to choose a data structure to implement it. Stack ADT can be implemented using either an array or a linked list. Figure 12.7 shows an example of a stack ADT with five items. The figure also shows how we can implement the stack.

In our array implementation, we have a record that has two fields. The first field can be used to store information about the array: we have used it as the count field, which at each moment shows the number of data items in the stack. The second field is an integer that holds the index of the top element. Note that the array is shown upside down to match the linked list implementation.

The linked list implementation is similar: we have an extra node that has the name of the stack. This node also has two fields: a counter and a pointer that points to the top element.

**Algorithms**
We can write four algorithms in pseudocode for the four operations we defined for stack in each implementation. We showed algorithms to handle arrays and linked lists in Chapter 11: these algorithms can be modified to create the four algorithms we need for stacks: *stack*, *push*, *pop*, and *empty*. These algorithms are even easier than those presented in Chapter 11, because the insertion and deletion is done only at the top of stack. We leave the writing of these algorithms as exercises.

## 12.3 QUEUES
A **queue** is a linear list in which data can only be inserted at one end, called the **rear**, and deleted from the other end, called the **front**. These restrictions ensure that the data are processed through the queue in the order in which it is received. In other words, a queue is a **first in, first out (FIFO)** structure.

Queues are familiar from everyday life. A line of people waiting for the bus at a bus station is a queue, a list of calls put on hold to be answered by a telephone operator is a queue, and a list of waiting jobs to be processed by a computer is a queue.

Figure 12.8 shows two representations of queues, one a queue of people and the other a computer queue. Both people and data enter the queue at the rear and progress through the queue until they arrive at the front. Once they are at the front of the queue, they leave the queue and are served.

### 12.3.1 Operations on queues
Although we can define many operations for a queue, four are basic: *queue*, *enqueue*, *dequeue*, and *empty*, as defined below.

**The queue operation**
The *queue* operation creates an empty queue. The following shows the format:
\`queue (queueName)\`
*queueName* is the name of the queue to be created. This operation returns an empty queue. Figure 12.9 shows a pictorial representation of this operation.

**The enqueue operation**
The *enqueue* operation inserts an item at the rear of the queue. The following shows the format:
\`enqueue (queueName, dataItem)\`
*queueName* is the name of the queue and *dataItem* is the data to be inserted at the rear of the queue. After the enqueue operation, the new item becomes the last item in the queue. This operation returns the new queue with *dataItem* inserted at the rear. Figure 12.10 shows the pictorial representation of this operation.

**The dequeue operation**
The *dequeue* operation deletes the item at the front of the queue. The following shows the format:
\`dequeue (queueName, dataItem)\`
*queueName* is the name of the queue and *dataItem* is the data that is deleted from the queue. The deleted item can be used by the application program or can be just discarded. After the dequeue operation, the item that followed the front element becomes the front element. This operation returns the new queue with one less element. Figure 12.11 shows the pictorial representation of this operation.

**The empty operation**
The *empty* operation checks the status of the queue. The following shows the format:
\`empty (queueName)\`
The *queueName* is the name of the queue. This operation returns *true* if the queue is empty and *false* if the queue is not empty.

### 12.3.2 Queue ADT
We define a queue as an ADT as shown below:

**Queue ADT**
**Definition**
A list of data items in which an item can be deleted from one end, called the front and an item can be inserted at the other end called the rear.
**Operations**
*queue*: Creates an empty queue.
*enqueue*: Inserts an element at the rear.
*dequeue*: Deletes an element from the front.
*empty*: Checks the status of the queue.

> **Example 12.4**
> Figure 12.12 shows a segment of an algorithm that applies the previously defined operations on a queue Q. The fourth operation checks the status of the queue before trying to dequeue the front element. The value of the front element is stored in the variable x. However, we do not use this value—it will automatically be discarded at the end of the algorithm segment.

### 12.3.3 Queue applications
Queues are one of the most common of all data processing structures. They are found in virtually every operating system and network and in countless other areas. For example, queues are used in online business applications such as processing customer requests, jobs, and orders. In a computer system, a queue is needed to process jobs and for system services such as print spools.

> **Example 12.5**
> Queues can be used to organize databases by some characteristic of the data. For example, imagine we have a list of sorted data stored in the computer belonging to two categories: less than 1000, and greater than 1000. We can use two queues to separate the categories and at the same time maintain the order of data in their own category. Algorithm 12.3 shows the pseudocode for this operation.

**Algorithm 12.3 Example 12.5**
\`\`\`
Algorithm: Categorizer (list)
Purpose: Categorize data into two categories and create two separate lists.
Pre: Given: original list
Post: Prints the two lists
Return: None
{
    queue (Q1)
    queue (Q2)
    while (more data in the list)
    {
        if (data < 1000)
        {
            enqueue (Q1, data)
        }
        if (data ≥ 1000)
        {
            enqueue (Q2, data)
        }
    }
    while (not empty (Q1))
    {
        dequeue (Q1, x)
        print (x)
    }
    while (not empty (Q2))
    {
        dequeue (Q2, x)
        print (x)
    }
    return
}
\`\`\`

> **Example 12.6**
> Another common application of a queue is to adjust and create a balance between a fast producer of data and a slow consumer of data. For example, assume that a CPU is connected to a printer. The speed of a printer is not comparable with the speed of a CPU. If the CPU waits for the printer to print some data created by the CPU, the CPU would be idle for a long time. The solution is a queue. The CPU creates as many chunks of data as the queue can hold and sends them to the queue. The CPU is now free to do other jobs. The chunks are dequeued slowly and printed by the printer. The queue used for this purpose is normally referred to as a *spool queue*.

### 12.3.4 Queue implementation
At the ADT level, we use the queue and its four operations (*queue*, *enqueue*, *dequeue*, and *empty*): at the implementation level, we need to choose a data structure to implement it. A queue ADT can be implemented using either an array or a linked list. Figure 12.13 on page 331 shows an example of a queue ADT with five items. The figure also shows how we can implement it.

In the array implementation we have a record with three fields. The first field can be used to store information about the queue: we have used this as a count field that shows the current number of data items in the queue. The second field is an integer that holds the index of the front element. The third field is also an integer, which holds the index of the rear element.

The linked list implementation is similar: we have an extra node that has the name of the queue. This node also has three fields: a count, a pointer that points to the front element, and a pointer that points to the rear element.

**Algorithms**
We can write four algorithms in pseudocode for the four operations we defined for queues in each implementation. We described algorithms to handle arrays and linked lists in Chapter 11: we can modify those algorithms to create the four algorithms we need for queues: *queue*, *enqueue*, *dequeue*, and *empty*. These algorithms are easier than those presented in Chapter 11, because insertion is done only at the end of the queue and deletion is done only at the front of the queue. We leave the writing of these algorithms as exercises.

## 12.4 GENERAL LINEAR LISTS
Stacks and queues defined in the two previous sections are *restricted linear lists*. A general linear list is a list in which operations, such as insertion and deletion, can be done anywhere in the list—at the beginning, in the middle, or at the end. Figure 12.14 shows a general linear list.

We define a **general linear list** as a collection of elements with the following properties:
- The elements are of the same type.
- The elements are arranged sequentially, which means that there is a first element and a last element.
- Each element except the first has a unique predecessor, each element except the last has a unique successor.
- Each element is a record with a key field.
- The elements are sorted based on the key value.

### 12.4.1 Operations on general linear lists
Although we can define many operations on a general linear list, we discuss only six common operations in this chapter: *list*, *insert*, *delete*, *retrieve*, *traverse*, and *empty*.

**The list operation**
The *list* operation creates an empty list. The following shows the format:
\`list (listName)\`
*listName* is the name of the general linear list to be created. This operation returns an empty list.

**The insert operation**
Since we assume that data in a general linear list is sorted, insertion must be done in such a way that the ordering of the elements is maintained. To determine where the elements are to be placed, searching is needed. However, searching is done at the implementation level, not at the ADT level. In addition, we assume for simplicity that duplicate data is not allowed in a general linear list. Therefore we insert an element in a location that preserves the order of the keys. The following shows the format:
\`insert (listName, element)\`
Insertion is shown graphically in Figure 12.15.

**The delete operation**
Deletion from a general list (Figure 12.16) also requires that the list be searched to locate the data to be deleted. After the location of the data is found, deletion can be done. The following shows the format:
\`delete (listName, target, element)\`
*target* is a data value of the same type as the key of the elements in the list. If an element with the key value equal to the target is found, that element is deleted. The **delete operation** is shown graphically in Figure 12.16.

Note that this operation returns the deleted element. This is necessary if we want, say, to change the value of some fields and reinsert the item into the list again—we have not defined any operation that changes the value of the fields in the list.

**The retrieve operation**
By retrieval, we mean access of a single element. Like insertion and deletion, the general list should be first searched, and if the data is found, it can be retrieved. The format of the retrieve operation is:
\`retrieve (listName, target, element)\`
*target* is a data value of the same type as the key of the elements in the list. Figure 12.17 shows the retrieve operation graphically. If an element with the key value equal to the target is found, a copy of the element is retrieved, but the element still remains in the list.

**The traverse operation**
Each of the previous operations involves a single element in the list, randomly accessing the list. List traversal, on the other hand, involves sequential access. It is an operation in which all elements in the list are processed one by one. The following shows the format:
\`traverse (listName, action)\`
The traverse operation accesses the elements of the list sequentially, while the action specifies the operation to be performed on each element. Some examples of actions are printing the data, applying some mathematical operation on the data, and so on.

**The empty operation**
The *empty* operation checks the status of the list. The following shows the format:
\`empty (listName)\`
*listName* is the name of the list. This operation returns *true* if the list is empty, or *false* if the list is not empty.

### 12.4.2 General linear list ADT
We define a general linear list as an ADT as shown below:

**General Linear List ADT**
**Definition**
A list of sorted data items, all of the same type.
**Operations**
*list*: Creates an empty list.
*insert*: Inserts an element in the list.
*delete*: Deletes an element from the list.
*retrieve*: Retrieves an element from the list.
*traverse*: Traverses the list sequentially.
*empty*: Checks the status of the list.

> **Example 12.7**
> Figure 12.18 shows a segment of an algorithm that applies the previously defined operations on a list L. Note that the third operation inserts the new data at the correct position because the insert operation calls the search algorithm at the implementation level to find where the new data should be inserted.
> The fourth operation is required to delete the data item 3 from the list. It calls the *empty* operation to be sure that the list is not empty. Since the list is not empty, this operation can proceed, but when it calls the search operation at the implementation level, the data item is not found in the list. The list is therefore returned without a change. Finally the final operation inserts 6 at the appropriate location.

### 12.4.3 General linear list applications
General linear lists are used in situations in which the elements are accessed randomly or sequentially. For example, in a college a linear list can be used to store information about students who are enrolled in each semester.

> **Example 12.8**
> Assume that a college has a general linear list that holds information about the students and that each data element is a record with three fields: *ID*, *Name*, and *Grade*. Algorithm 12.4 shows an algorithm that helps a professor to change the grade for a student. The delete operation removes an element from the list, but makes it available to the program to allow the grade to be changed. The insert operation inserts the changed element back into the list. The element holds the whole record for the student, and the target is the *ID* used to search the list.

**Algorithm 12.4 Example 12.8**
\`\`\`
Algorithm: ChangeGrade (StudentList, target, grade)
Purpose: Change the grade of a student
Pre: Given the list of students and the grade
Post: None
Return: None
{
    delete (StudentList, target, element)
    (element.data).Grade ← grade
    insert (StudentList, element)
    return
}
\`\`\`

> **Example 12.9**
> Continuing with Example 12.8, assume that the tutor wants to print the record of all students at the end of the semester. Algorithm 12.5 can do this job.

**Algorithm 12.5 Example 12.9**
\`\`\`
Algorithm: PrintRecord (StudentList)
Purpose: Print the record of all students in the StudentList
Pre: Given the list of students
Post: None
Return: None
{
    traverse (StudentList, Print)
    return
}
\`\`\`
We assume that there is an algorithm called *Print* that prints the contents of the record. For each node, the list traverse calls the *Print* algorithm and passes the data to be printed to it.

### 12.4.4 General linear list implementation
At the ADT level, we use the list and its six operations (*list*, *insert*, *delete*, *retrieve*, *traverse*, and *empty*), but at the implementation level we need to choose a data structure to implement it. A general list ADT can be implemented using either an array or a linked list. Figure 12.19 shows an example of a list ADT with five items. The figure also shows how we can implement it.

In our array implementation we have a record with two fields. The first field can be used to store information about the array: we have used it as a count field that shows the current number of data item in a list. The second field is an integer that holds the index of the first element.

The linked list implementation is similar: we have an extra node that has the name of the list. This node also has two fields, a counter and a pointer that points to the first element.

**Algorithms**
We can write six algorithms in pseudocode for the six operations we defined for a list in each implementation. We showed algorithms to handle arrays and linked lists in Chapter 11: these algorithms can be slightly modified to create the algorithms we need for a list. We leave these as an exercise.

## 12.5 TREES
A **tree** consists of a finite set of elements, called **nodes** (or **vertices**), and a finite set of directed lines, called **arcs**, that connect pairs of the nodes. If the tree is not empty, one of the nodes, called the **root**, has no incoming arcs. The other nodes in a tree can be reached from the root by following a unique **path**, which is a sequence of consecutive arcs. Tree structures are normally drawn upside down with the root at the top (see Figure 12.20).

We can divide the vertices in a tree into three categories: the root, **leaves**, and the **internal nodes**.
Table 12.1 shows the number of outgoing and incoming arcs allowed for each type of node.

**Table 12.1 Number of incoming and outgoing arcs**
| Type of node | Incoming arc | Outgoing arc |
| :--- | :--- | :--- |
| root | 0 | 0 or more |
| leaf | 1 | 0 |
| internal | 1 | 1 or more |

A node that is directly accessible (through a single arc) from a given node is called the **child**: the node from which the child is directly accessible is called a **parent**. Nodes with a common parent are called **siblings**. **Descendents** of a node are all nodes that can be reached by that node, and a node from which all descendents can be reached is called an **ancestor**. Each node in a tree may have a **subtree**.

The subtree of each node includes one of its children and all descendents of that child. Figure 12.21 shows all subtrees for the tree in Figure 12.20.

Although trees have many applications in computer science, such as index files, their study is beyond the scope of this book. We introduce trees as a prelude to discussing one special type of tree, *binary trees*.

### 12.5.1 Binary trees
A **binary tree** is a tree in which no node can have more than two subtrees. In other words, a node can have zero, one, or two subtrees. These subtrees are designated as the **left subtree** and the **right subtree**. Figure 12.22 shows a binary tree with its two subtrees. Note that each subtree is itself a binary tree.

**Recursive definition of binary trees**
In Chapter 8 we introduced the recursive definition of an algorithm. We can also define a structure or an ADT recursively. The following gives the recursive definition of a binary tree. Note that, based on this definition, a binary tree can have a root, but each subtree can also have a root.

**A binary tree is either empty or consists of a node, root, with two subtrees, in which each subtree is also a binary tree.**

Figure 12.23 shows eight trees, the first of which is an empty binary tree (sometimes called a *null* binary tree).

### 12.5.2 Operations on binary trees
The six most common operations defined for a binary tree are *tree* (creates an empty tree) *insert*, *delete*, *retrieve*, *empty* and *traversal*. The first five are complex and beyond the scope of this book. We discuss binary tree traversal in this section.

**Binary tree traversals**
A *binary tree traversal* requires that each node of the tree be processed once and only once in a predetermined sequence. The two general approaches to the traversal sequence are *depth-first* and *breadth-first* traversal.

**Depth-first traversals**
Given that a binary tree consists of a root, a left subtree, and a right subtree, we can define six different **depth-first traversal** sequences. Computer scientists have assigned standard names to three of these sequences in the literature: the other three are unnamed but are easily derived. The standard traversals are shown in Figure 12.24.
- **Preorder traversal**. In **preorder traversal** the root node is processed first, followed by the left subtree and then the right subtree. The prefix *pre* indicates that the root node is processed *before* the subtrees.
- **Inorder traversal**. In **inorder traversal** the left subtree is processed first, then the root node, and finally the right subtree. The prefix *in* indicates that the root node is processed *between* the subtrees.
- **Postorder traversal**. In **postorder traversal** the root node is processed after the left and right subtrees have been processed. The prefix *post* indicates that the root is processed *after* the subtrees.

> **Example 12.10**
> Figure 12.25 shows how we visit each node in a tree using preorder traversal. The figure also shows the *walking order*. In preorder traversal we visit a node when we pass from its left side. The nodes are visited in this order: A, B, C, D, E, F.

**Breadth-first traversals**
In **breadth-first traversal** of a binary tree we process all the children of a node before proceeding with the next generation. As with depth-first traversals, we can trace the traversal with a walk.

> **Example 12.11**
> Figure 12.26 shows how we visit each node in a tree using breadth-first traversal. The figure also shows the walking order. The traversal order is A, B, E, C, D, F.

### 12.5.3 Binary tree applications
Binary trees have many applications in computer science. In this section we mention only two of them: Huffman coding and expression trees.

**Huffman coding**
**Huffman coding** is a compression technique that uses binary trees to generate a variable length binary code from a string of symbols. We discuss Huffman coding in detail in Chapter 15.

**Expression trees**
An arithmetic expression can be represented in three different formats: **infix**, **postfix**, and **prefix**. In an **infix** notation, the operator comes between the two operands. In **postfix** notation, the operator comes after its two operands, and in **prefix** notation it comes before the two operands. These formats are shown below for the addition of two operands A and B.
**Prefix**: + A B    **Infix**: A + B    **Postfix**: A B +

Although we use infix notation in our algorithms and in programming languages, the compiler often changes them to postfix notation before evaluating them. One way to do this conversion is to create an **expression tree**. In an expression tree, the root and the internal nodes are operators and the leaves are the operands. The three standard traversals (preorder, inorder, and postorder: Figure 12.4) then represent the three different expression formats: infix, postfix, and prefix. The inorder traversal produces the infix expression, the postorder traversal produces the postfix expression, and the preorder traversal produces the prefix expression. Figure 12.27 shows an expression and its expression tree. Note that only the infix notation needs parentheses.

### 12.5.4 Binary tree implementation
Binary trees can be implemented using arrays or linked list. Link list implementation is more efficient for deletion and insertion and is more prevalent.

### 12.5.5 Binary search trees
A **binary search tree (BST)** is a binary tree with one extra property: the key value of each node is greater than the key values of all nodes in each left subtree and smaller than the value of all nodes in each right subtree. Figure 12.28 shows the idea.

> **Example 12.12**
> Figure 12.29 shows some binary trees that are BSTs and some that are not. Note that a tree is a BST if all its subtrees are BSTs and the whole tree is also a BST.

A very interesting property of a BST is that if we apply the inorder traversal of a binary tree, the elements that are visited are sorted in ascending order. For example, the three BSTs in Figure 12.29, when traversed in the order gives the list (3, 6, 17), (17, 19), and (3, 6, 14, 17, 19).

**An inorder traversal of a BST creates a list that is sorted in ascending order.**

Another feature that makes a BST interesting is that we can use a version of the binary search we used in Chapter 8 for a binary search tree. Figure 12.30 shows the UML for a BST search.

**Binary search tree ADTs**
The ADT for a binary search tree is similar to the one we defined for a general linear list with the same operation. As a matter of fact, we see more BST lists than general linear lists today. The reason is that searching a BST is more efficient that searching a linear list: a general linear list uses sequential searching, but BSTs use a version of binary search.

**BST implementation**
BSTs can be implemented using either arrays or linked lists. However, linked list structures are more common and more efficient. A linear implementation uses nodes with two pointers, *left* and *right*. The left pointer points to the left subtree and the right pointer points to the right subtree. If the left subtree is empty, the left pointer is null: if the right subtree is empty, the right pointer is null. Like a linked-list implementation of a general linear list, a BST linked-list implementation uses a dummy node that has the same name as the BST. The data section of this dummy node can hold information about the tree, such as the number of nodes in the tree. The pointer section points to the root of the tree. Figure 12.31 shows a BST in which the data field of each node is a record.

## 12.6 GRAPHS
A **graph** is an ADT made of a set of nodes, called vertices, and set of lines connecting the vertices, called **edges** or arcs. Whereas a tree defines a hierarchical structure in which a node can have only one single parent, each node in a graph can have one or more parents. Graphs may be either **directed** or **undirected**. In a **directed graph**, or **digraph**, each edge, which connects two vertices, has a direction (shown in the figure by an arrowhead) from one vertex to the other. In an **undirected graph**, there is no direction. Figure 12.32 shows an example of both a directed graph (a) and an undirected graph (b).

The vertices in a graph can represent objects or concepts and the edges or arcs can represent a relationship between those objects or concepts. If a graph is directed, the relations are one-way: if a graph is undirected, the relation is two-way.

> **Example 12.13**
> A map of cities and the roads connecting the cities can be represented in a computer using an undirected graph. The cities are vertices and the undirected edges are the roads that connect them. If we want to show the distances between the cities, we can use *weighted graphs*, in which each edge has a weight that represent the distance between two cities connected by that edge.

> **Example 12.14**
> Another application of graphs is in computer networks (Chapter 6). The vertices can represent the nodes or hubs; the edges can represent the route. Each edge can have a weight that defines the cost of reaching from one hub to the adjacent hub. A router can use graph algorithms to find the shortest path between itself and the final destination of a packet.

## 12.7 END-CHAPTER MATERIALS

### 12.7.1 Recommended reading
For more details about subjects discussed in this chapter, the following books are recommended:
- Gilberg, R. and Forouzan, B. *Data Structures – A Pseudocode Approach with C*, Boston, MA: Course Technology, 2005
- Goodrich, M. and Tamassia, R. *Data Structures and Algorithms in Java*, New York: Wiley, 2005
- Nyhoff, L. *ADTs, Data Structures, and Problem Solving with C++*, Upper Saddle River, NJ: Prentice-Hall, 2005

### 12.7.2 Key terms
- abstract data type (ADT)
- ancestor
- arc
- binary search tree (BST)
- binary tree
- breadth-first traversal
- child
- delete operation
- depth-first traversal
- dequeue
- descendent
- digraph
- directed graph
- edge
- enqueue
- expression tree
- first in, first out (FIFO)
- front
- general linear list
- graph
- Huffman coding
- infix
- inorder traversal
- interface
- internal node
- last in, first out (LIFO)
- leaf
- linear list
- node
- parent
- path
- pop
- postfix
- postorder traversal
- prefix
- preorder traversal
- push
- queue
- rear
- root
- sibling
- stack
- subtree
- traversal
- tree
- undirected graph
- vertex

### 12.7.3 Summary
Although several simple data types have been implemented in all programming languages, most languages do not define complex data types. An abstract data type (ADT) is a package that defines a new data type, defines operations on that data type, and encapsulates the data and the operations.
- A stack is a restricted linear list in which all additions and deletions are made at one end, called the top. If we inserted a series of data items into a stack and then removed them, the order of the data is reversed. This reversing attribute is why stacks are known as a last in, first out (LIFO) structure. We defined four basic operations on a stack: stack, push, pop, and empty.
- A queue is a linear list in which data can only be inserted at one end, called the rear, and deleted from the other end, called the front. These restrictions ensure that data is processed through the queue in the order in which it is received. In other words, a queue is a first in, first out (FIFO) structure. We defined four basic operations for a queue: queue, enqueue, dequeue, and empty. A general linear list is a list in which operations, such as insertion and deletion, can be done anywhere in the list—at the beginning, in the middle, or at the end. We defined six operations for a general linear list: list, insert, delete, retrieve, traverse, and empty.
- A tree consists of a finite set of elements, called nodes (or vertices), and a finite set of directed lines, called arcs, that connect pairs of nodes. If the tree is not empty, one of the nodes, called the root, has no incoming arcs. A binary tree is a tree in which no node can have more than two subtrees. In other words, a node can have zero, one, or two subtrees. A binary tree traversal requires that each node of the tree be processed once and only once in a predetermined sequence. The two general approaches to the traversal sequence are depth first and breadth first. A binary search tree (BST) is a binary tree with one extra property: the key value of each node is greater than the key values of all nodes in each left subtree and smaller than the value of all nodes in each right subtree.
- A graph is an ADT made up of a set of nodes, called vertices, and set of lines connecting the vertices, called edges or arcs. Whereas a tree defines a hierarchical structure in which a node can only have a single parent, each node in a graph can have one or more parents. Graphs may be either directed or undirected.

## 12.8 PRACTICE SET

### 12.8.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 12.8.2 Review questions
1. What is an abstract data type? In an ADT, what is known and what is hidden?
2. What is a stack? What are the four basic stack operations defined in this chapter?
3. What is a queue? What are the four basic queue operations defined in this chapter?
4. What is a general linear list? What are the six basic operations defined for a general linear list in this chapter?
5. Define a tree. Distinguish between a tree and a binary tree. Distinguish between a binary tree and a binary search tree.
6. Distinguish between a depth-first traversal and breadth-first traversal of a binary tree.
7. What is a graph? Distinguish between a directed graph and an undirected graph.
8. List some applications of stacks and queues.
9. List some applications of general linear lists.
10. List some applications of binary trees and binary search trees.

### 12.8.3 Problems
1. Write an algorithm segment using while loops to empty the contents of stack S2.
2. Write an algorithm segment using while loops to move the contents of stack S1 to S2. After the operation, stack S1 should be empty.
3. Write an algorithm segment using while loops to copy the contents of stack S1 to S2. After the operation, the contents of stacks S1 and S2 should be the same.
4. Write an algorithm segment using while loops to concatenate the contents of stack S2 with the contents of stack S1. After the concatenation, the elements of stack S2 should be above the elements of stack S1 and stack S2 should be empty.
5. Show the contents of stack S1 and the value of variables x and y after the following algorithm segment is executed.
   \`stack (S1)\`
   \`push (S1, 5)\`
   \`push (S1, 3)\`
   \`push (S1, 2)\`
   \`if (not empty (S1))\`
   \`{\`
       \`pop (S1, x)\`
   \`}\`
   \`if (not empty (S1))\`
   \`{\`
       \`pop (S1, y)\`
   \`}\`
   \`push (S1, 6)\`
6. A palindrome is a string that can be read backwards and forwards with the same result. For example, the following is a palindrome if we ignore spaces:
   *Able was I ere I saw Elba*
   Write an algorithm in pseudocode using a stack to test whether a string is a palindrome.
7. Write an algorithm in pseudocode to compare the contents of two stacks.
8. Use a while loop to empty the contents of queue Q.
9. Use while loops to move the contents of queue Q1 to queue Q2. After the operation, queue Q1 should be empty.
10. Use while loops to copy the contents of queue Q1 to queue Q2. After the operation, the contents of queue Q1 and queue Q2 should be the same.
11. Use while loops to concatenate the contents of queue Q2 to the contents of queue Q1. After the concatenation, the elements of queue Q2 should be at the end of the elements of queue Q1. Queue Q2 should be empty.
12. Write an algorithm to compare the contents of two queues.
13. Find the root of each of the following binary trees:
    a. Tree with postorder traversal: FCBDG
    b. Tree with preorder traversal: IBCDFEN
    c. Tree with postorder traversal: CBIDFGE
14. A binary tree has ten nodes. The inorder and preorder traversal of the tree are shown below:
    Preorder: JCBADEFIGH    Inorder: ABCEDFJGIH
    Draw the tree.
15. A binary tree has eight nodes. The inorder and postorder traversal of the tree follow:
    Postorder: FECHGDBA    Inorder: FECABHDG
    Draw the tree.
16. A binary tree has seven nodes. The following shows the inorder and postorder traversal of a tree. Can we draw the tree? If not, explain why not:
    Postorder: GFDABEC    Inorder: ABDCEFG
17. Create the ADT package in pseudocode to implement the four operations defined for a stack in this chapter using an array as the data structure.
18. Create the ADT package in pseudocode to implement the four operations defined for a stack in this chapter using a linked list as the data structure.
19. Create the ADT package in pseudocode to implement the four operations defined for a queue in this chapter using an array as the data structure.
20. Create the ADT package in pseudocode to implement the four operations defined for a queue in this chapter using a linked list as the data structure.
21. Create the ADT package in pseudocode to implement the six operations defined for a general linear list in this chapter using an array as the data structure.
22. Create the ADT package in pseudocode to implement the six operations defined for a general linear list in this chapter using a linked list as the data structure.
`,
  zh: `
# 第十二章：抽象資料型別

在本章中，我們將討論抽象資料型別 (ADT)，這是一種比我們在第 11 章討論的資料結構具有更高抽象層級的資料類型。ADT 使用資料結構來實作。我們在本章開始時簡要介紹 ADT 的背景。然後我們給出一個定義並提出一個模型。本章的其餘部分討論各種 ADT，如堆疊、佇列、一般線性串列、樹、二元樹、二元搜尋樹和圖形。

## 學習目標
學完本章後，學生應能：
- 定義抽象資料型別 (ADT) 的概念。
- 定義堆疊、堆疊的基本操作、其應用以及如何實作。
- 定義佇列、佇列的基本操作、其應用以及如何實作。
- 定義一般線性串列、串列的基本操作、其應用以及如何實作。
- 定義一般樹及其應用。
- 定義二元樹——一種特殊的樹——及其應用。
- 定義二元搜尋樹 (BST) 及其應用。
- 定義圖形及其應用。

## 12.1 背景
用電腦解決問題意味著處理資料。為了處理資料，我們需要定義資料類型和要對資料執行的操作。例如，要找出一列數字的總和，我們應該選擇數字的類型（整數或實數）並定義操作（加法）。資料類型的定義和應用於資料的操作的定義是**抽象資料型別 (ADT)** 背後思想的一部分——隱藏操作是如何在資料上執行的。換句話說，ADT 的使用者只需要知道有一組操作可用於該資料類型，而不需要知道它們是如何應用的。

### 12.1.1 簡單 ADT
許多程式語言已經定義了一些簡單的 ADT 作為語言的組成部分。例如，C 語言定義了一個稱為*整數*的簡單 ADT。此 ADT 的類型是具有預定義範圍的整數。C 還定義了可以應用於此資料類型的幾種操作（加、減、乘、除等）。C 明確定義了這些對整數的操作以及我們預期的結果。編寫 C 程式將兩個整數相加的程式設計師應該了解整數 ADT 以及可以應用於它的操作。

然而，程式設計師不需要知道這些操作實際上是*如何*實作的。例如，程式設計師使用表達式 $z \\leftarrow x + y$ 並期望將 $x$（一個整數）的值加到 $y$（一個整數）的值上，並將結果命名為 $z$（一個整數）。程式設計師不需要知道加法是如何執行的。我們在前幾章中了解到，電腦執行此加法的方式是將兩個整數以二的補數格式儲存在兩個記憶體位置中，將它們載入到 CPU 暫存器中，以二進位形式相加，並將結果儲存回另一個記憶體位置。然而，程式設計師不需要知道這一點。C 中的整數是一個具有預定義操作的簡單抽象資料型別。操作如何執行不是程式設計師關心的問題。

### 12.1.2 複雜 ADT
雖然一些簡單的 ADT，如整數、實數、字元、指標等，已經被實作並可在大多數語言中使用，但許多有用的複雜 ADT 卻沒有。正如我們將在本章中看到的，我們需要列表 ADT、堆疊 ADT、佇列 ADT 等等。為了提高效率，這些 ADT 應該被創建並儲存在要使用的電腦的函式庫中。例如，*列表*的使用者應該只需要知道有哪些操作可用於列表，而不是這些操作是如何執行的。

因此，對於 ADT，使用者不關心任務是*如何*完成的，而是關心它能做*什麼*。換句話說，ADT 由一組定義組成，允許程式設計師使用操作，而其實作被隱藏。這種具有未指定實作的操作泛化稱為抽象。我們抽象出過程的本質，並將實作細節隱藏起來。

**抽象的概念意味著：**
1. **我們知道資料類型能做什麼。**
2. **它是如何完成的是隱藏的。**

### 12.1.3 定義
現在讓我們定義一個 ADT。抽象資料型別是一種與對該資料類型有意義的操作打包在一起的資料類型。然後我們將資料和對資料的操作封裝起來，並對使用者隱藏它們。

**抽象資料型別**
1. **資料的定義**
2. **操作的定義**
3. **資料和操作的封裝**

### 12.1.4 抽象資料型別的模型
ADT 模型如圖 12.1 所示。具有不規則輪廓的彩色區域代表 ADT。ADT 內部有模型的兩個不同部分：*資料結構*和*操作*（公開和私有）。應用程式只能透過**介面**存取公開操作。介面是公開操作以及傳遞給這些操作或從這些操作回傳的資料的列表。私有操作供 ADT 內部使用。資料結構，如陣列和鏈結串列，位於 ADT 內部，並由公開和私有操作使用。

雖然公開操作和介面應該獨立於實作，但私有操作取決於在 ADT 實作期間選擇的資料結構。我們將在討論一些 ADT 時詳細說明這個問題。

### 12.1.5 實作
電腦語言不提供 ADT 套件。要使用 ADT，首先要實作它並將其保存在函式庫中。本章的主要目的是介紹一些常見的 ADT 及其應用。然而，我們也為感興趣的讀者簡要討論每個 ADT 的實作。我們將實作的偽代碼演算法留作具有挑戰性的練習。

## 12.2 堆疊
**堆疊**是一種受限的**線性串列**，其中所有的新增和刪除都在一端進行，即頂部。如果我們將一系列資料插入堆疊然後將其移除，資料的順序是反轉的。例如，輸入為 5、10、15、20 的資料將以 20、15、10 和 5 的順序移除。這種反轉屬性就是為什麼堆疊被稱為**後進先出 (LIFO)** 資料結構。

我們在日常生活中使用許多不同類型的堆疊。我們經常談論一疊硬幣或一疊書。任何我們只能在頂部添加或移除物件的情況都是堆疊。如果我們想移除頂部以外的物件，我們必須先移除其上方的所有物件。圖 12.2 顯示了堆疊的三種表示形式。

### 12.2.1 堆疊上的操作
雖然我們可以為堆疊定義許多操作，但有四個基本操作：*stack*、*push*、*pop* 和 *empty*，我們在本章中定義它們。

**stack 操作**
*stack* 操作創建一個空堆疊。格式如下：
\`stack (stackName)\`
*stackName* 是要創建的堆疊名稱。此操作回傳一個空堆疊。圖 12.3 顯示了此操作的圖形表示。

**push 操作**
*push* 操作在堆疊頂部插入一個項目。格式如下：
\`push (stackName, dataItem)\`
*stackName* 是堆疊的名稱，*dataItem* 是要插入堆疊頂部的資料。在 push 操作後，新項目成為堆疊中的頂部項目。此操作回傳頂部插入了 *dataItem* 的新堆疊。圖 12.4 顯示了此操作的圖形表示。

**pop 操作**
*pop* 操作刪除堆疊頂部的項目。格式如下：
\`pop (stackName, dataItem)\`
*stackName* 是堆疊的名稱，*dataItem* 是從堆疊中刪除的資料。圖 12.5 顯示了此操作的圖形表示。
刪除的項目可以由應用程式使用，也可以直接丟棄。在 pop 操作後，刪除前位於頂部元素下方的項目成為頂部元素。此操作回傳少了一個元素的新堆疊。

**empty 操作**
*empty* 操作檢查堆疊的狀態。格式如下：
\`empty (stackName)\`
*stackName* 是堆疊的名稱。如果堆疊為空，此操作回傳 *true*，如果堆疊不為空，則回傳 *false*。

### 12.2.2 堆疊 ADT
我們將堆疊定義為 ADT，如下所示：

**堆疊 ADT**
**定義**
只能在一端（稱為頂部）存取的資料項目列表。
**操作**
*stack*：創建一個空堆疊。
*push*：在頂部插入一個元素。
*pop*：刪除頂部元素。
*empty*：檢查堆疊的狀態。

> **範例 12.1**
> 圖 12.6 顯示了一段演算法片段，該片段對堆疊 S 應用了先前定義的操作。第四個操作在嘗試彈出頂部元素之前檢查堆疊的狀態。頂部元素的值儲存在變數 x 中。然而，我們不使用這個值：它將在演算法片段結束時自動丟棄。

### 12.2.3 堆疊應用
堆疊應用可分為四大類：反轉資料、配對資料、延遲資料使用和回溯步驟。我們在接下來的部分討論前兩類。

**反轉資料項目**
反轉資料項目要求將給定的一組資料項目重新排序，以便交換第一個和最後一個項目，並且第一個和最後一個之間的所有位置也相對交換。例如，列表 (2, 4, 7, 1, 6, 8) 變為 (8, 6, 1, 7, 4, 2)。

> **範例 12.2**
> 在第 2 章（2.2.6 節中的圖 2.6）中，我們給出了一個簡單的 UML 圖，將整數從十進位轉換為任意基底。雖然演算法非常簡單，但如果我們在創建轉換後的整數的數字時列印它們，我們將得到反序的數字。任何電腦語言中的列印指令都是從左到右列印字元，但演算法是從右到左創建數字。我們可以使用堆疊（LIFO 結構）的反轉特性來解決這個問題。
> 演算法 12.1 顯示了將十進位整數轉換為二進位並列印結果的偽代碼。

**演算法 12.1 範例 2.2**
\`\`\`
演算法：DecimalToBinary (number)
目的：列印給定整數（絕對值）的二進位等價值
前置條件：給定要轉換的整數 (number)
後置條件：列印二進位整數
回傳：無
{
    stack (S)
    while (number ≠ 0)
    {
        remainder ← number mod 2
        push (S, remainder)
        number ← number / 2
    }
    while (not empty (S))
    {
        pop (S, x)
        print (x)
    }
    return
}
\`\`\`
我們先創建一個空堆疊。然後我們使用 *while* 迴圈來創建位元，但不是列印它們，而是將它們推入堆疊。當創建完所有位元後，我們退出迴圈。現在我們使用另一個迴圈從堆疊中彈出位元並列印它們。請注意，位元是以與創建順序相反的順序列印的。

**配對資料項目**
我們經常需要配對表達式中的某些字元。例如，當我們用電腦語言編寫數學表達式時，我們經常需要使用括號來改變運算子的優先順序。以下兩個表達式的計算結果因第二個表達式中的括號而異：
3 × 6 + 2 = 20     3 × (6 + 2) = 24
在第一個表達式中，乘法運算子的優先順序高於加法運算子——它先被計算。在第二個表達式中，括號忽略了優先順序，因此先計算加法。當我們輸入帶有大量括號的表達式時，我們經常忘記配對括號。編譯器的職責之一就是為我們進行檢查。編譯器使用堆疊來檢查所有左括號是否與右括號配對。

> **範例 12.3**
> 演算法 12.2 顯示了我們如何檢查每個左括號是否與右括號配對。

**演算法 12.2 範例 12.3**
\`\`\`
演算法：CheckingParentheses (expression)
目的：檢查表達式中括號的配對
前置條件：給定要檢查的表達式
後置條件：如果發現未配對的括號，則顯示錯誤訊息
回傳：無
{
    stack (S)
    while (more character in the expression)
    {
        Char ← next character
        if (Char = '(')
        {
            push (S, Char)
        }
        else
        {
            if (Char = ')')
            {
                if (empty (S))
                {
                    print (unmatched opening parenthesis)
                }
                else
                {
                    pop (S, x)
                }
            }
        }
    }
    if (not empty (S))
    {
        print (a closing parenthesis not matched)
    }
    return
}
\`\`\`

### 12.2.4 堆疊實作
在本節中，我們描述實作堆疊 ADT 背後的一般想法。在 ADT 層級，我們使用堆疊及其四個操作（*stack*、*push*、*pop* 和 *empty*）：在實作層級，我們需要選擇一種資料結構來實作它。堆疊 ADT 可以使用陣列或鏈結串列來實作。圖 12.7 顯示了一個包含五個項目的堆疊 ADT 範例。該圖還顯示了我們如何實作堆疊。

在我們的陣列實作中，我們有一個包含兩個欄位的記錄。第一個欄位可用於儲存有關陣列的資訊：我們用它作為計數欄位，隨時顯示堆疊中資料項目的數量。第二個欄位是一個整數，保存頂部元素的索引。請注意，陣列是倒置顯示的，以匹配鏈結串列的實作。

鏈結串列的實作類似：我們有一個額外的節點，其中包含堆疊的名稱。此節點也有兩個欄位：一個計數器和一個指向頂部元素的指標。

**演算法**
我們可以為每個實作中為堆疊定義的四個操作編寫四個偽代碼演算法。我們在第 11 章展示了處理陣列和鏈結串列的演算法：可以修改這些演算法以創建我們需要的堆疊四個演算法：*stack*、*push*、*pop* 和 *empty*。這些演算法甚至比第 11 章中介紹的更簡單，因為插入和刪除僅在堆疊頂部進行。我們將這些演算法的編寫留作練習。

## 12.3 佇列
**佇列**是一種線性串列，其中資料只能在一端（稱為**尾端**）插入，並從另一端（稱為**前端**）刪除。這些限制確保資料按接收順序在佇列中處理。換句話說，佇列是一種**先進先出 (FIFO)** 結構。

佇列在日常生活中很常見。公車站等公車的人排成的隊伍是佇列，電話接線員等待接聽的電話列表是佇列，電腦等待處理的工作列表是佇列。

圖 12.8 顯示了佇列的兩種表示形式，一種是人的佇列，另一種是電腦佇列。人和資料都從尾端進入佇列，並在佇列中前進，直到到達前端。一旦到達佇列的前端，他們就會離開佇列並得到服務。

### 12.3.1 佇列上的操作
雖然我們可以為佇列定義許多操作，但有四個基本操作：*queue*、*enqueue*、*dequeue* 和 *empty*，如下所定義。

**queue 操作**
*queue* 操作創建一個空佇列。格式如下：
\`queue (queueName)\`
*queueName* 是要創建的佇列名稱。此操作回傳一個空佇列。圖 12.9 顯示了此操作的圖形表示。

**enqueue 操作**
*enqueue* 操作在佇列的尾端插入一個項目。格式如下：
\`enqueue (queueName, dataItem)\`
*queueName* 是佇列的名稱，*dataItem* 是要插入佇列尾端的資料。在 enqueue 操作之後，新項目成為佇列中的最後一個項目。此操作回傳尾端插入了 *dataItem* 的新佇列。圖 12.10 顯示了此操作的圖形表示。

**dequeue 操作**
*dequeue* 操作刪除佇列前端的項目。格式如下：
\`dequeue (queueName, dataItem)\`
*queueName* 是佇列的名稱，*dataItem* 是從佇列中刪除的資料。刪除的項目可以由應用程式使用，也可以直接丟棄。在 dequeue 操作之後，跟隨前端元素的項目成為前端元素。此操作回傳少了一個元素的新佇列。圖 12.11 顯示了此操作的圖形表示。

**empty 操作**
*empty* 操作檢查佇列的狀態。格式如下：
\`empty (queueName)\`
*queueName* 是佇列的名稱。如果佇列為空，此操作回傳 *true*，如果佇列不為空，則回傳 *false*。

### 12.3.2 佇列 ADT
我們將佇列定義為 ADT，如下所示：

**佇列 ADT**
**定義**
一種資料項目列表，其中項目可以從一端（稱為前端）刪除，並且項目可以插入另一端（稱為尾端）。
**操作**
*queue*：創建一個空佇列。
*enqueue*：在尾端插入一個元素。
*dequeue*：從前端刪除一個元素。
*empty*：檢查佇列的狀態。

> **範例 12.4**
> 圖 12.12 顯示了一段演算法片段，該片段對佇列 Q 應用了先前定義的操作。第四個操作在嘗試從前端刪除元素之前檢查佇列的狀態。前端元素的值儲存在變數 x 中。然而，我們不使用這個值——它將在演算法片段結束時自動丟棄。

### 12.3.3 佇列應用
佇列是所有資料處理結構中最常見的一種。它們存在於幾乎每個作業系統和網路以及無數其他領域中。例如，佇列用於線上商業應用程式，如處理客戶請求、工作和訂單。在電腦系統中，需要佇列來處理工作和系統服務，如列印多工緩衝處理。

> **範例 12.5**
> 佇列可用於根據資料的某些特徵組織資料庫。例如，想像我們在電腦中儲存了一個已排序的資料列表，屬於兩類：小於 1000 和大於 1000。我們可以使用兩個佇列來分開這兩類，同時保持各自類別中資料的順序。演算法 12.3 顯示了此操作的偽代碼。

**演算法 12.3 範例 12.5**
\`\`\`
演算法：Categorizer (list)
目的：將資料分為兩類並創建兩個單獨的列表。
前置條件：給定：原始列表
後置條件：列印兩個列表
回傳：無
{
    queue (Q1)
    queue (Q2)
    while (more data in the list)
    {
        if (data < 1000)
        {
            enqueue (Q1, data)
        }
        if (data ≥ 1000)
        {
            enqueue (Q2, data)
        }
    }
    while (not empty (Q1))
    {
        dequeue (Q1, x)
        print (x)
    }
    while (not empty (Q2))
    {
        dequeue (Q2, x)
        print (x)
    }
    return
}
\`\`\`

> **範例 12.6**
> 佇列的另一個常見應用是在快速的資料生產者和慢速的資料消費者之間進行調整和建立平衡。例如，假設 CPU 連接到印表機。印表機的速度無法與 CPU 的速度相比。如果 CPU 等待印表機列印 CPU 創建的一些資料，CPU 將長時間處於閒置狀態。解決方案是佇列。CPU 創建盡可能多的資料塊以填滿佇列，並將其發送到佇列。CPU 現在可以自由地做其他工作。資料塊被緩慢地從佇列中取出並由印表機列印。用於此目的的佇列通常稱為*多工緩衝處理佇列 (spool queue)*。

### 12.3.4 佇列實作
在 ADT 層級，我們使用佇列及其四個操作（*queue*、*enqueue*、*dequeue* 和 *empty*）：在實作層級，我們需要選擇一種資料結構來實作它。佇列 ADT 可以使用陣列或鏈結串列來實作。第 331 頁的圖 12.13 顯示了一個包含五個項目的佇列 ADT 範例。該圖還顯示了我們如何實作它。

在陣列實作中，我們有一個包含三個欄位的記錄。第一個欄位可用於儲存有關佇列的資訊：我們用它作為計數欄位，顯示佇列中目前資料項目的數量。第二個欄位是一個整數，保存前端元素的索引。第三個欄位也是一個整數，保存尾端元素的索引。

鏈結串列的實作類似：我們有一個額外的節點，其中包含佇列的名稱。此節點也有三個欄位：一個計數，一個指向前端元素的指標，和一個指向尾端元素的指標。

**演算法**
我們可以為每個實作中為佇列定義的四個操作編寫四個偽代碼演算法。我們在第 11 章描述了處理陣列和鏈結串列的演算法：我們可以修改這些演算法以創建我們需要的佇列四個演算法：*queue*、*enqueue*、*dequeue* 和 *empty*。這些演算法比第 11 章中介紹的更容易，因為插入僅在佇列末尾進行，刪除僅在佇列前端進行。我們將這些演算法的編寫留作練習。

## 12.4 一般線性串列
前兩節定義的堆疊和佇列是*受限線性串列*。一般線性串列是一種可以在列表中的任何位置（開頭、中間或結尾）進行插入和刪除等操作的列表。圖 12.14 顯示了一般線性串列。

我們將**一般線性串列**定義為具有以下屬性的元素集合：
- 元素類型相同。
- 元素按順序排列，這意味著有第一個元素和最後一個元素。
- 除第一個元素外，每個元素都有唯一的前驅，除最後一個元素外，每個元素都有唯一的後繼。
- 每個元素都是一個帶有鍵欄位的記錄。
- 元素根據鍵值排序。

### 12.4.1 一般線性串列上的操作
雖然我們可以對一般線性串列定義許多操作，但我們在本章中僅討論六個常見操作：*list*、*insert*、*delete*、*retrieve*、*traverse* 和 *empty*。

**list 操作**
*list* 操作創建一個空列表。格式如下：
\`list (listName)\`
*listName* 是要創建的一般線性串列的名稱。此操作回傳一個空列表。

**insert 操作**
由於我們假設一般線性串列中的資料是排序的，因此插入必須以保持元素順序的方式進行。為了確定元素放置的位置，需要進行搜尋。然而，搜尋是在實作層級完成的，而不是在 ADT 層級。此外，為了簡單起見，我們假設一般線性串列中不允許有重複資料。因此，我們在保持鍵順序的位置插入元素。格式如下：
\`insert (listName, element)\`
插入操作如圖 12.15 所示。

**delete 操作**
從一般列表中刪除（圖 12.16）也需要搜尋列表以定位要刪除的資料。找到資料的位置後，即可進行刪除。格式如下：
\`delete (listName, target, element)\`
*target* 是與列表中元素鍵相同類型的資料值。如果找到鍵值等於目標的元素，則刪除該元素。**delete 操作**如圖 12.16 所示。

請注意，此操作回傳已刪除的元素。如果我們想要更改某些欄位的值並將項目再次插入列表中，這是必要的——我們沒有定義任何更改列表中欄位值的操作。

**retrieve 操作**
所謂檢索，是指存取單個元素。像插入和刪除一樣，應首先搜尋一般列表，如果找到資料，則可以檢索它。檢索操作的格式為：
\`retrieve (listName, target, element)\`
*target* 是與列表中元素鍵相同類型的資料值。圖 12.17 以圖形方式顯示了檢索操作。如果找到鍵值等於目標的元素，則檢索該元素的副本，但該元素仍保留在列表中。

**traverse 操作**
前面的每個操作都涉及列表中的單個元素，隨機存取列表。另一方面，列表遍歷涉及順序存取。這是一個逐一處理列表中所有元素的操作。格式如下：
\`traverse (listName, action)\`
遍歷操作按順序存取列表的元素，而 action 指定要對每個元素執行的操作。操作的一些例子是列印資料，對資料應用一些數學運算等等。

**empty 操作**
*empty* 操作檢查列表的狀態。格式如下：
\`empty (listName)\`
*listName* 是列表的名稱。如果列表為空，此操作回傳 *true*，如果列表不為空，則回傳 *false*。

### 12.4.2 一般線性串列 ADT
我們將一般線性串列定義為 ADT，如下所示：

**一般線性串列 ADT**
**定義**
已排序資料項目的列表，類型均相同。
**操作**
*list*：創建一個空列表。
*insert*：在列表中插入一個元素。
*delete*：從列表中刪除一個元素。
*retrieve*：從列表中檢索一個元素。
*traverse*：按順序遍歷列表。
*empty*：檢查列表的狀態。

> **範例 12.7**
> 圖 12.18 顯示了一段演算法片段，該片段對列表 L 應用了先前定義的操作。請注意，第三個操作將新資料插入到正確位置，因為插入操作呼叫實作層級的搜尋演算法來查找應插入新資料的位置。
> 第四個操作需要從列表中刪除資料項目 3。它呼叫 *empty* 操作以確保列表不為空。由於列表不為空，此操作可以繼續，但是當它呼叫實作層級的搜尋操作時，在列表中未找到資料項目。因此，列表在未更改的情況下回傳。最後，最後一個操作在適當位置插入 6。

### 12.4.3 一般線性串列應用
一般線性串列用於隨機或順序存取元素的情況。例如，在大學中，線性串列可用於儲存每個學期註冊學生的資訊。

> **範例 12.8**
> 假設一所大學有一個一般線性串列，其中包含有關學生的資訊，每個資料元素都是一個具有三個欄位的記錄：*ID*、*Name* 和 *Grade*。演算法 12.4 顯示了一個幫助教授更改學生成績的演算法。刪除操作從列表中移除元素，但使其可用於程式以允許更改成績。插入操作將更改後的元素插回列表中。元素包含學生的完整記錄，目標是用於搜尋列表的 *ID*。

**演算法 12.4 範例 12.8**
\`\`\`
演算法：ChangeGrade (StudentList, target, grade)
目的：更改學生的成績
前置條件：給定學生列表和成績
後置條件：無
回傳：無
{
    delete (StudentList, target, element)
    (element.data).Grade ← grade
    insert (StudentList, element)
    return
}
\`\`\`

> **範例 12.9**
> 延續範例 12.8，假設導師想在學期末列印所有學生的記錄。演算法 12.5 可以完成這項工作。

**演算法 12.5 範例 12.9**
\`\`\`
演算法：PrintRecord (StudentList)
目的：列印 StudentList 中所有學生的記錄
前置條件：給定學生列表
後置條件：無
回傳：無
{
    traverse (StudentList, Print)
    return
}
\`\`\`
我們假設有一個名為 *Print* 的演算法可以列印記錄的內容。對於每個節點，列表遍歷呼叫 *Print* 演算法並將要列印的資料傳遞給它。

### 12.4.4 一般線性串列實作
在 ADT 層級，我們使用列表及其六個操作（*list*、*insert*、*delete*、*retrieve*、*traverse* 和 *empty*），但在實作層級，我們需要選擇一種資料結構來實作它。一般列表 ADT 可以使用陣列或鏈結串列來實作。圖 12.19 顯示了一個包含五個項目的列表 ADT 範例。該圖還顯示了我們如何實作它。

在我們的陣列實作中，我們有一個包含兩個欄位的記錄。第一個欄位可用於儲存有關陣列的資訊：我們用它作為計數欄位，顯示列表中目前資料項目的數量。第二個欄位是一個整數，保存第一個元素的索引。

鏈結串列的實作類似：我們有一個額外的節點，其中包含列表的名稱。此節點也有兩個欄位，一個計數器和一個指向第一個元素的指標。

**演算法**
我們可以為每個實作中為列表定義的六個操作編寫六個偽代碼演算法。我們在第 11 章展示了處理陣列和鏈結串列的演算法：可以稍微修改這些演算法以創建我們需要的列表演算法。我們將這些留作練習。

## 12.5 樹
**樹**由一組有限的元素（稱為**節點**或**頂點**）和一組有限的連接節點對的有向線（稱為**弧**）組成。如果樹不為空，則其中一個節點（稱為**根**）沒有傳入弧。樹中的其他節點可以從根透過唯一的**路徑**到達，該路徑是一系列連續的弧。樹結構通常倒置繪製，根在頂部（見圖 12.20）。

我們可以將樹中的頂點分為三類：根、**葉**和**內部節點**。
表 12.1 顯示了每種類型節點允許的傳出和傳入弧的數量。

**表 12.1 傳入和傳出弧的數量**
| 節點類型 | 傳入弧 | 傳出弧 |
| :--- | :--- | :--- |
| 根 | 0 | 0 或更多 |
| 葉 | 1 | 0 |
| 內部 | 1 | 1 或更多 |

從給定節點直接可存取（透過單個弧）的節點稱為**子節點**：可以直接存取子節點的節點稱為**父節點**。具有共同父節點的節點稱為**兄弟節點**。節點的**後代**是可以從該節點到達的所有節點，可以從中到達所有後代的節點稱為**祖先**。樹中的每個節點都可以有一個**子樹**。

每個節點的子樹包括其一個子節點和該子節點的所有後代。圖 12.21 顯示了圖 12.20 中樹的所有子樹。

雖然樹在電腦科學中有許多應用，例如索引檔案，但其研究超出了本書的範圍。我們介紹樹是為了作為討論一種特殊類型樹——*二元樹*的序幕。

### 12.5.1 二元樹
**二元樹**是其中沒有節點可以有超過兩個子樹的樹。換句話說，一個節點可以有零、一或兩個子樹。這些子樹被指定為**左子樹**和**右子樹**。圖 12.22 顯示了一個帶有兩個子樹的二元樹。請注意，每個子樹本身也是一個二元樹。

**二元樹的遞迴定義**
在第 8 章中，我們介紹了演算法的遞迴定義。我們也可以遞迴地定義結構或 ADT。以下給出了二元樹的遞迴定義。請注意，根據此定義，二元樹可以有一個根，但每個子樹也可以有一個根。

**二元樹要麼為空，要麼由一個節點（根）和兩個子樹組成，其中每個子樹也是一個二元樹。**

圖 12.23 顯示了八棵樹，其中第一棵是空二元樹（有時稱為*空 (null)* 二元樹）。

### 12.5.2 二元樹上的操作
為二元樹定義的最常見的六個操作是 *tree*（創建空樹）、*insert*、*delete*、*retrieve*、*empty* 和 *traversal*。前五個很複雜，超出了本書的範圍。我們在本節中討論二元樹遍歷。

**二元樹遍歷**
*二元樹遍歷*要求樹的每個節點以預定順序被處理一次且僅一次。遍歷序列的兩種一般方法是*深度優先*和*廣度優先*遍歷。

**深度優先遍歷**
鑑於二元樹由根、左子樹和右子樹組成，我們可以定義六種不同的**深度優先遍歷**序列。電腦科學家在文獻中為其中三種序列指定了標準名稱：其他三種沒有名稱，但很容易推導出來。標準遍歷如圖 12.24 所示。
- **前序遍歷 (Preorder traversal)**。在**前序遍歷**中，首先處理根節點，然後是左子樹，然後是右子樹。前綴 *pre* 表示根節點在子樹*之前*處理。
- **中序遍歷 (Inorder traversal)**。在**中序遍歷**中，首先處理左子樹，然後是根節點，最後是右子樹。前綴 *in* 表示根節點在子樹*之間*處理。
- **後序遍歷 (Postorder traversal)**。在**後序遍歷**中，根節點在處理完左子樹和右子樹後處理。前綴 *post* 表示根在子樹*之後*處理。

> **範例 12.10**
> 圖 12.25 顯示了我們如何使用前序遍歷訪問樹中的每個節點。該圖還顯示了*行走順序*。在前序遍歷中，當我們從節點的左側通過時，我們訪問該節點。節點按此順序訪問：A, B, C, D, E, F。

**廣度優先遍歷**
在二元樹的**廣度優先遍歷**中，我們處理節點的所有子節點，然後再繼續下一代。與深度優先遍歷一樣，我們可以通過行走來追蹤遍歷。

> **範例 12.11**
> 圖 12.26 顯示了我們如何使用廣度優先遍歷訪問樹中的每個節點。該圖還顯示了行走順序。遍歷順序為 A, B, E, C, D, F。

### 12.5.3 二元樹應用
二元樹在電腦科學中有許多應用。在本節中，我們僅提及其中兩個：霍夫曼編碼和表達式樹。

**霍夫曼編碼**
**霍夫曼編碼**是一種壓縮技術，它使用二元樹從符號字串生成可變長度的二進位代碼。我們在第 15 章詳細討論霍夫曼編碼。

**表達式樹**
算術表達式可以用三種不同的格式表示：**中綴**、**後綴**和**前綴**。在**中綴**表示法中，運算子位於兩個運算元之間。在**後綴**表示法中，運算子位於其兩個運算元之後，而在**前綴**表示法中，它位於兩個運算元之前。以下顯示了兩個運算元 A 和 B 相加的這些格式。
**前綴**：+ A B    **中綴**：A + B    **後綴**：A B +

雖然我們在演算法和程式語言中使用中綴表示法，但編譯器通常在評估之前將它們更改為後綴表示法。進行這種轉換的一種方法是創建**表達式樹**。在表達式樹中，根和內部節點是運算子，葉子是運算元。三種標準遍歷（前序、中序和後序：圖 12.4）然後代表三種不同的表達式格式：中綴、後綴和前綴。中序遍歷產生中綴表達式，後序遍歷產生後綴表達式，前序遍歷產生前綴表達式。圖 12.27 顯示了一個表達式及其表達式樹。請注意，只有中綴表示法需要括號。

### 12.5.4 二元樹實作
二元樹可以使用陣列或鏈結串列來實作。鏈結串列實作對於刪除和插入更有效率，並且更為普遍。

### 12.5.5 二元搜尋樹
**二元搜尋樹 (BST)** 是一種具有一個額外屬性的二元樹：每個節點的鍵值大於每個左子樹中所有節點的鍵值，並小於每個右子樹中所有節點的鍵值。圖 12.28 顯示了這個想法。

> **範例 12.12**
> 圖 12.29 顯示了一些是 BST 和一些不是 BST 的二元樹。請注意，如果所有子樹都是 BST 且整棵樹也是 BST，則該樹是 BST。

BST 的一個非常有趣的屬性是，如果我們對二元樹應用中序遍歷，則訪問的元素將按升序排序。例如，圖 12.29 中的三個 BST，按順序遍歷時給出列表 (3, 6, 17), (17, 19), 和 (3, 6, 14, 17, 19)。

**BST 的中序遍歷創建一個按升序排序的列表。**

使 BST 有趣的另一個特徵是我們可以使用我們在第 8 章中用於二元搜尋樹的二元搜尋版本。圖 12.30 顯示了 BST 搜尋的 UML。

**二元搜尋樹 ADT**
二元搜尋樹的 ADT 類似於我們為具有相同操作的一般線性串列定義的 ADT。事實上，我們今天看到的 BST 列表比一般線性串列更多。原因是搜尋 BST 比搜尋線性串列更有效率：一般線性串列使用循序搜尋，但 BST 使用二元搜尋的版本。

**BST 實作**
BST 可以使用陣列或鏈結串列來實作。然而，鏈結串列結構更常見也更有效率。線性實作使用帶有兩個指標 *left* 和 *right* 的節點。左指標指向左子樹，右指標指向右子樹。如果左子樹為空，則左指標為空：如果右子樹為空，則右指標為空。像一般線性串列的鏈結串列實作一樣，BST 鏈結串列實作使用一個與 BST 同名的虛擬節點。此虛擬節點的資料部分可以保存有關樹的資訊，例如樹中的節點數。指標部分指向樹的根。圖 12.31 顯示了一個 BST，其中每個節點的資料欄位是一個記錄。

## 12.6 圖形
**圖形**是由一組稱為頂點的節點和一組連接頂點的線（稱為**邊**或弧）組成的 ADT。樹定義了一種階層結構，其中一個節點只能有一個父節點，而圖形中的每個節點可以有一個或多個父節點。圖形可以是**有向**或**無向**的。在**有向圖**或**digraph**中，連接兩個頂點的每條邊都有一個方向（圖中用箭頭顯示），從一個頂點指向另一個頂點。在**無向圖**中，沒有方向。圖 12.32 顯示了有向圖 (a) 和無向圖 (b) 的範例。

圖形中的頂點可以代表物件或概念，邊或弧可以代表這些物件或概念之間的關係。如果圖形是有向的，關係是單向的：如果圖形是無向的，關係是雙向的。

> **範例 12.13**
> 城市地圖和連接城市的道路可以使用無向圖在電腦中表示。城市是頂點，無向邊是連接它們的道路。如果我們想顯示城市之間的距離，我們可以使用*加權圖*，其中每條邊都有一個權重，代表由該邊連接的兩個城市之間的距離。

> **範例 12.14**
> 圖形的另一個應用是在電腦網路中（第 6 章）。頂點可以代表節點或集線器；邊可以代表路徑。每條邊可以有一個權重，定義從一個集線器到達相鄰集線器的成本。路由器可以使用圖形演算法找到自身與封包最終目的地之間的最短路徑。

## 12.7 章末材料

### 12.7.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Gilberg, R. and Forouzan, B. *Data Structures – A Pseudocode Approach with C*, Boston, MA: Course Technology, 2005
- Goodrich, M. and Tamassia, R. *Data Structures and Algorithms in Java*, New York: Wiley, 2005
- Nyhoff, L. *ADTs, Data Structures, and Problem Solving with C++*, Upper Saddle River, NJ: Prentice-Hall, 2005

### 12.7.2 關鍵詞
- 抽象資料型別 (ADT)
- 祖先 (ancestor)
- 弧 (arc)
- 二元搜尋樹 (BST)
- 二元樹 (binary tree)
- 廣度優先遍歷 (breadth-first traversal)
- 子節點 (child)
- 刪除操作 (delete operation)
- 深度優先遍歷 (depth-first traversal)
- dequeue
- 後代 (descendent)
- 有向圖 (digraph)
- 有向圖 (directed graph)
- 邊 (edge)
- enqueue
- 表達式樹 (expression tree)
- 先進先出 (FIFO)
- 前端 (front)
- 一般線性串列 (general linear list)
- 圖形 (graph)
- 霍夫曼編碼 (Huffman coding)
- 中綴 (infix)
- 中序遍歷 (inorder traversal)
- 介面 (interface)
- 內部節點 (internal node)
- 後進先出 (LIFO)
- 葉 (leaf)
- 線性串列 (linear list)
- 節點 (node)
- 父節點 (parent)
- 路徑 (path)
- pop
- 後綴 (postfix)
- 後序遍歷 (postorder traversal)
- 前綴 (prefix)
- 前序遍歷 (preorder traversal)
- push
- 佇列 (queue)
- 尾端 (rear)
- 根 (root)
- 兄弟節點 (sibling)
- 堆疊 (stack)
- 子樹 (subtree)
- 遍歷 (traversal)
- 樹 (tree)
- 無向圖 (undirected graph)
- 頂點 (vertex)

### 12.7.3 摘要
雖然所有程式語言都實作了幾種簡單的資料類型，但大多數語言並未定義複雜的資料類型。抽象資料型別 (ADT) 是一個套件，它定義新的資料類型，定義該資料類型上的操作，並封裝資料和操作。
- 堆疊是一種受限的線性串列，其中所有的新增和刪除都在一端進行，即頂部。如果我們將一系列資料項目插入堆疊然後將其移除，資料的順序是反轉的。這種反轉屬性就是為什麼堆疊被稱為後進先出 (LIFO) 結構。我們在堆疊上定義了四個基本操作：stack、push、pop 和 empty。
- 佇列是一種線性串列，其中資料只能在一端（稱為尾端）插入，並從另一端（稱為前端）刪除。這些限制確保資料按接收順序在佇列中處理。換句話說，佇列是一種先進先出 (FIFO) 結構。我們為佇列定義了四個基本操作：queue、enqueue、dequeue 和 empty。一般線性串列是一種可以在列表中的任何位置（開頭、中間或結尾）進行插入和刪除等操作的列表。我們為一般線性串列定義了六個操作：list、insert、delete、retrieve、traverse 和 empty。
- 樹由一組有限的元素（稱為節點或頂點）和一組有限的連接節點對的有向線（稱為弧）組成。如果樹不為空，則其中一個節點（稱為根）沒有傳入弧。二元樹是其中沒有節點可以有超過兩個子樹的樹。換句話說，一個節點可以有零、一或兩個子樹。二元樹遍歷要求樹的每個節點以預定順序被處理一次且僅一次。遍歷序列的兩種一般方法是深度優先和廣度優先。二元搜尋樹 (BST) 是一種具有一個額外屬性的二元樹：每個節點的鍵值大於每個左子樹中所有節點的鍵值，並小於每個右子樹中所有節點的鍵值。
- 圖形是由一組節點（稱為頂點）和一組連接頂點的線（稱為邊或弧）組成的 ADT。樹定義了一種階層結構，其中一個節點只能有一個父節點，而圖形中的每個節點可以有一個或多個父節點。圖形可以是有向或無向的。

## 12.8 練習題

### 12.8.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 12.8.2 複習問題
1. 什麼是抽象資料型別？在 ADT 中，什麼是已知的，什麼是隱藏的？
2. 什麼是堆疊？本章定義的四個基本堆疊操作是什麼？
3. 什麼是佇列？本章定義的四個基本佇列操作是什麼？
4. 什麼是一般線性串列？本章為一般線性串列定義的六個基本操作是什麼？
5. 定義樹。區分樹和二元樹。區分二元樹和二元搜尋樹。
6. 區分二元樹的深度優先遍歷和廣度優先遍歷。
7. 什麼是圖形？區分有向圖和無向圖。
8. 列出堆疊和佇列的一些應用。
9. 列出一般線性串列的一些應用。
10. 列出二元樹和二元搜尋樹的一些應用。

### 12.8.3 問題
1. 使用 while 迴圈編寫一段演算法片段以清空堆疊 S2 的內容。
2. 使用 while 迴圈編寫一段演算法片段以將堆疊 S1 的內容移動到 S2。操作後，堆疊 S1 應為空。
3. 使用 while 迴圈編寫一段演算法片段以將堆疊 S1 的內容複製到 S2。操作後，堆疊 S1 和 S2 的內容應相同。
4. 使用 while 迴圈編寫一段演算法片段以將堆疊 S2 的內容連接到堆疊 S1 的內容。連接後，堆疊 S2 的元素應在堆疊 S1 的元素之上，並且堆疊 S2 應為空。
5. 顯示執行以下演算法片段後堆疊 S1 的內容以及變數 x 和 y 的值。
   \`stack (S1)\`
   \`push (S1, 5)\`
   \`push (S1, 3)\`
   \`push (S1, 2)\`
   \`if (not empty (S1))\`
   \`{\`
       \`pop (S1, x)\`
   \`}\`
   \`if (not empty (S1))\`
   \`{\`
       \`pop (S1, y)\`
   \`}\`
   \`push (S1, 6)\`
6. 迴文是一個可以向後和向前讀取並具有相同結果的字串。例如，如果我們忽略空格，以下是一個迴文：
   *Able was I ere I saw Elba*
   使用堆疊編寫偽代碼演算法以測試字串是否為迴文。
7. 用偽代碼編寫一個演算法來比較兩個堆疊的內容。
8. 使用 while 迴圈清空佇列 Q 的內容。
9. 使用 while 迴圈將佇列 Q1 的內容移動到佇列 Q2。操作後，佇列 Q1 應為空。
10. 使用 while 迴圈將佇列 Q1 的內容複製到佇列 Q2。操作後，佇列 Q1 和 Q2 的內容應相同。
11. 使用 while 迴圈將佇列 Q2 的內容連接到佇列 Q1 的內容。連接後，佇列 Q2 的元素應在佇列 Q1 的元素的末尾。佇列 Q2 應為空。
12. 編寫一個演算法來比較兩個佇列的內容。
13. 找出以下每個二元樹的根：
    a. 具有後序遍歷的樹：FCBDG
    b. 具有前序遍歷的樹：IBCDFEN
    c. 具有後序遍歷的樹：CBIDFGE
14. 二元樹有十個節點。樹的中序和前序遍歷如下所示：
    前序：JCBADEFIGH    中序：ABCEDFJGIH
    畫出這棵樹。
15. 二元樹有八個節點。樹的中序和後序遍歷如下：
    後序：FECHGDBA    中序：FECABHDG
    畫出這棵樹。
16. 二元樹有七個節點。以下顯示了樹的中序和後序遍歷。我們可以畫出這棵樹嗎？如果不能，請解釋原因：
    後序：GFDABEC    中序：ABDCEFG
17. 用偽代碼創建 ADT 套件，使用陣列作為資料結構實作本章為堆疊定義的四個操作。
18. 用偽代碼創建 ADT 套件，使用鏈結串列作為資料結構實作本章為堆疊定義的四個操作。
19. 用偽代碼創建 ADT 套件，使用陣列作為資料結構實作本章為佇列定義的四個操作。
20. 用偽代碼創建 ADT 套件，使用鏈結串列作為資料結構實作本章為佇列定義的四個操作。
21. 用偽代碼創建 ADT 套件，使用陣列作為資料結構實作本章為一般線性串列定義的六個操作。
22. 用偽代碼創建 ADT 套件，使用鏈結串列作為資料結構實作本章為一般線性串列定義的六個操作。
`
};
    