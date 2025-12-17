
export const chapter11Content = {
  en: `
# Chapter 11: Data Structure

In the preceding chapters, we used variables that store a single entity. Although single variables are used extensively in programming languages, they cannot be used to solve complex problems efficiently. In this chapter, we introduce data structures. This chapter is a prelude to the next chapter, in which we introduce abstract data types (ADTs).

A **data structure** uses a collection of related variables that can be accessed individually or as a whole. In other words, a data structure represents a set of data items that share a specific relationship. We discuss three data structures in this chapter: *arrays*, *records*, and *linked lists*. Most programming languages have an implicit implementation of the first two. The third, however, is simulated using pointers and records.

## Objectives
After studying this chapter, the student should be able to:
- Define a data structure.
- Define an array as a data structure and how it is used to store a list of data items.
- Distinguish between the name of an array and the names of the elements in an array.
- Describe operations defined for an array.
- Define a record as a data structure and how it is used to store attributes belonging to a single data element.
- Distinguish between the name of a record and the names of its fields.
- Define a linked list as a data structure and how it is implemented using pointers.
- Describe operations defined for a linked list.
- Compare and contrast arrays, records, and linked lists.
- Define the applications of arrays, records, and linked lists.

## 11.1 ARRAYS
Imagine that we have 100 scores. We need to read them, process them, and print them. We must also keep these 100 scores in memory for the duration of the program. We can define a hundred variables, each with a different name, as shown in Figure 11.1.

But having 100 different names creates other problems. We need 100 references to read them, 100 references to process them, and 100 references to write them. Figure 11.2 shows a diagram that illustrates this problem.

The number of instructions we need to handle even this relatively small number of scores is unacceptable. To process large amounts of data, we need a data structure such as an array.

An **array** is a sequenced collection of elements, of the same data type. We can refer to the elements in the array as the first element, the second element, and so forth until we get to the last element. If we were to put our 100 scores into an array, we could designate the elements as scores[1], scores[2], and so on. The **index** indicates the ordinal number of the element, counting from the beginning of the array. The elements of the array are individually addressed through their subscripts (Figure 11.3). The array as a whole has a name, *scores*, but each score can be accessed individually using its subscript.

We can use loops to read and write the elements in an array. We can also use loops to process elements. Now it does not matter if there are 100, 1000, or 10000 elements to be processed—loops make it easy to handle them all. We can use an integer variable to control the loop, and remain in the loop as long as the value of this variable is less than the total number of elements in the array (Figure 11.4).

We have used indexes that start from 1; some modern languages such as C, C++, and Java start indexes from 0.

> **Example 11.1**
> Compare the number of instructions needed to handle 100 individual elements in Figure 11.2 and the array with 100 in Figure 11.4. Assume that processing each score needs only one instruction.
>
> **Solution**
> - In the first case, we need 100 instructions to read, 100 instructions to write, and 100 instructions to process. The total is 300 instructions.
> - In the second case, we have three loops. In each loop we have two instructions, giving a total of six instructions. However, we also need three instructions for initializing the index and three instructions to check the value of the index. In total, we have 12 instructions.

> **Example 11.2**
> The number of cycles (fetch, decode, and execute phases) the computer needs to perform is not reduced if we use an array. The number of cycles is actually increased, because we have the extra overhead of initializing, incrementing, and testing the value of the index. But our concern is not the number of cycles: it is the number of lines we need to write the program.

> **Example 11.3**
> In computer science, one of the big issues is the reusability of programs—for example, how much needs to be changed if the number of data items is changed. Assume we have written two programs to process the scores as shown in Figure 11.2 and Figure 11.4. If the number of scores changes from 100 to 1000, how many changes do we need to make in each program?
> In the first program we need to add 3 × 900 = 2700 instructions. In the second program, we only need to change three conditions (I > 100 to I > 1000). We can actually modify the diagram in Figure 11.4 to reduce the number of changes to one.

### 11.1.1 Array name versus element name
In an array we have two types of identifiers: the name of the array and the name of each individual element. The name of the array is the name of the whole structure, while the name of an element allows us to refer to that element. In the array of Figure 11.3, the name of the array is *scores* and the name of each element is the name of the array followed by the index, for example, scores[1], scores[2], and so on. In this chapter, we mostly need the names of the elements, but in some languages, such as C, we also need to use the name of the array.

### 11.1.2 Multidimensional arrays
The arrays discussed so far are known as **one-dimensional arrays** because the data is organized linearly in only one direction. Many applications require that data be stored in more than one dimension. One common example is a table, which is an array that consists of rows and columns. Figure 11.5 shows a table, which is commonly called a **two-dimensional array**.

The array shown in Figure 11.5 holds the scores of students in a class. There are five students in the class and each student has four different scores for four quizzes. The variable scores[2][3] show the score of the second student in the third quiz. Arranging the scores in a two-dimensional array can help the teacher to find the average of scores for each student (the average over the row values) and find the average for each quiz (the average over the column values), as well as the average of all quizzes (the average of the whole table).

**Multidimensional arrays**—arrays with more than two dimensions—are also possible. However, we do not discuss arrays beyond two dimensions in this book.

### 11.1.3 Memory layout
The indexes in a one-dimensional array directly define the relative positions of the element in actual memory. A two-dimensional array, however, represents rows and columns. How each element is stored in memory depends on the computer. Most computers use **row-major storage**, in which an entire row of an array is stored in memory before the next row. However, a computer may store the array using **column-major storage**, in which the entire column is stored before the next column. Figure 11.6 shows a two-dimensional array and how it is stored in memory using row-major or column-major storage. Row-major storage is more common.

> **Example 11.4**
> We have stored the two-dimensional array *students* in the memory. The array is 100 × 4 (100 rows and 4 columns). Show the address of the element *students*[5][3] assuming that the element *student*[1][1] is stored in the memory location with address 1000 and each element occupies only one memory location. The computer uses row-major storage.
>
> **Solution**
> We can use the following formula to find the location of an element, assuming each element occupies one memory location:
> $y = x + \\text{Cols} \\times (i - 1) + (j - 1)$
> where $x$ defines the start address, Cols defines the number of columns in the array, $i$ defines the row number of the element, $j$ defines the column number of the element, and $y$ is the address we are looking for. In our example, $x$ is 1000, Cols is 4, $i$ is 5 and $j$ is 3. We are looking for the value of $y$:
> $y = x + \\text{Cols} \\times (i - 1) + (j - 1) = 1000 + 4(5 - 1) + (3 - 1) = 1018$
> The answer makes sense because the element is at row 5 and column 3. There are four rows before this element that occupy 16 (4 × 4) memory locations. The previous two elements in row 5 have also occupied two memory locations. This means that all elements before the target elements occupy 18 memory locations. If the first element occupies the location 1000, the target element occupies the location 1018.

### 11.1.4 Operations on array
Although we can apply conventional operations defined for each element of an array (see Chapter 4), there are some operations that we can define on an array as a data structure. The common operations on arrays as structures are *searching*, *insertion*, *deletion*, *retrieval*, and *traversal*.

**Searching for elements**
We often need to find the index of an element when we know the value. This type of search was discussed in Chapter 8. We can use sequential search for unsorted arrays or binary search on sorted arrays. Searching is used for the next three operations.

**Insertion of elements**
Traditionally, computer languages require that the size of an array (the number of elements in the array) be defined at the time the program is written and prevent it from being changed during the execution of the program. Recently, some languages have allowed variable-size arrays. Even when the language allows variable-sized arrays, insertion of an element into an array needs careful attention.

**Insertion at the end**
If the insertion is at the end of an array and the language allows us to increase the size of the array, this can be done easily. For example, if an array has 30 elements, we increase the size of the array to 31 and insert the new item as the 31st item.

**Insertion at the beginning or middle**
If the insertion is to be at the beginning or in the middle of an array, the process is lengthy and time consuming. This happens when we need to insert an element in a sorted array. We first search the array, as described before. After finding the location of the insertion, we insert the new element. For example, if we want to insert an element as the 9th element in an array of 30 elements, elements 9 to 30 should be shifted one element towards the end of the array to open an empty element at position 9 for insertion. The following shows part of the pseudocode that needs to be applied to the array:

\`\`\`
i ← 30
while (i ≥ 9)
{
    array [i + 1] ← array [i]
    i ← i - 1
}
array [i] ← newValue
\`\`\`

Note that the shifting needs to take place from the end of the array to prevent losing the values of the elements. The code first copies the value of the 30th element into the 31st element, then copies the value of the 29th element into the 30th element, and so on. When the code comes out of the loop, the 9th element is already copied to the 10th element. The last line copies the value of the new item into the 9th element.

**Deletion of elements**
Deletion of an element in an array is as lengthy and involved as insertion. For example, if the ninth element should be deleted, we need to shift elements 10 to 30 one position towards the start of the array. We leave the pseudocode for this operation as an exercise, which is similar to the one for addition of an element.

**Retrieving elements**
Retrieving means randomly accessing an element for the purpose of inspecting or copying the data contained in the element. Unlike insertion and deletion operations, retrieving is an easy operation when a data structure is an array. In fact, an array is a *random-access structure*, which means that each element of an array can be accessed randomly without the need to access the elements before or after it. For example, if we want to retrieve the value of the 9th element in the array, we can do so using a single instruction, as shown below:

\`\`\`
RetrievedValue ← array[9]
\`\`\`

**Traversal of arrays**
Array traversal refers to an operation that is applied to all elements of the array, such as reading, writing, applying mathematical operation, and so on.

Algorithm 11.1 gives an example of finding the average of elements in an array whose elements are reals. The algorithm first finds the sum of the elements using a loop. After the loop is terminated, the average is calculated, which is the sum divided by the number of elements. Note that for proper calculation of the sum, the sum needs to be set to 0.0 before the loop.

**Algorithm 11.1 Calculating the average of elements in an array**
\`\`\`
Algorithm: ArrayAverage (Array, n)
Purpose: Find the average value
Pre: Given the array Array and the number of elements, n.
Post: None
Return: The average value
{
    sum ← 0.0
    i ← 1
    while (i ≤ n)
    {
        sum ← sum + Array [i]
        i ← i + 1
    }
    average ← sum / n
    Return ( average )
}
\`\`\`

### 11.1.5 Strings
A **string**, as a set of characters, is treated in different languages differently. In C, a string is an array of characters. In C++, a string can be an array of characters, but there is a type named string. In Java, a string is a type.

### 11.1.6 Application
Thinking about the operations discussed in the previous section gives a clue to the application of arrays. If we have a list in which a lot of insertions and deletions are expected after the original list has been created, we should not use an array. An array is more suitable when the number of deletions and insertions is small, but a lot of *searching* and *retrieval* activities are expected.

**An array is a suitable structure when a small number of insertions and deletions are required, but a lot of searching and retrieval is needed.**

## 11.2 RECORDS
A **record** is a collection of related elements, possibly of different types, having a single name. Each element in a record is called a **field**. A field is the smallest element of named data that has meaning. A field has a type, and exists in memory. Fields can be assigned values, which in turn can be accessed for selection or manipulation. A field differs from a variable primarily in that it is part of a record.

Figure 11.7 contains two examples of records. The first example, *fraction*, has two fields, both of which are integers. The second example, *student*, has three fields made up of three different types.

**The elements in a record can be of the same or different types, but all elements in the record must be related.**

The data in a record should all be related to one object. In Figure 11.7, the integers in the fraction both belong to the same fraction, and the data in the second example all relate to one student. (Note that we have placed string data between two double quotes and a single character between two single quotes. This is the convention used in most programming languages.)

### 11.2.1 Record name versus field name
Just like in an array, we have two types of identifier in a record: the name of the record and the name of each individual field inside the record. The name of the record is the name of the whole structure, while the name of each field allows us to refer to that field. For example, in the student record of Figure 11.7, the name of the record is *student*, the name of the fields are *student.id*, *student.name*, and *student.grade*. Most programming languages use a period (.) to separate the name of the structure (record) from the name of its components (fields). This is the convention we use in this book.

> **Example 11.5**
> The following shows how the value of fields in Figure 11.7 are stored:
> \`student.id ← 2005\` \`student.name ← "G. Boole"\` \`student.grade ← 'A'\`

### 11.2.2 Comparison of records and arrays
We can conceptually compare an array with a record. This helps us to understand when we should use an array and when a record. An array defines a combination of elements, while a record defines the identifiable parts of an element. For example, an array can define a class of students (40 students), but a record defines different attributes of a student, such as id, name, or grade.

### 11.2.3 Array of records
If we need to define a combination of element and at the same time some attributes of each element, we can use an array of records. For example, in a class of 30 students, we can have an array of 30 records, each record representing a student. Figure 11.8 shows an array of 30 student records called *students*.

In an array of records, the name of the array defines the whole structure, the group of students as a whole. To define each element, we need to use the corresponding index. To define the parts (attributes) of each element, we need to use the dot operator. In other words, first we need to define the element, then we can define part of that element. Therefore, the id of the third student is defined as:
\`(student[3]).id\`

Note that we use parentheses to emphasize that first a particular student should be chosen, then the id of that student. In other words, the parentheses tell us that the index operator has precedence over the dot operator. In some languages, there is no need to use parentheses, because the precedence is already established in the language itself, but using parentheses always guarantees the precedence.

> **Example 11.6**
> The following shows how we access the fields of each record in the students array to store values in them.
> \`(students[1]).id ← 1001 (students[1]).name ← "J. Aron" (students[1]).grade ← 'A'\`
> \`(students[2]).id ← 2007 (students[2]).name ← "F. Bush" (students[2]).grade ← 'F'\`
> ...
> \`(students[30]).id ← 3012 (students[30]).name ← "M. Blair" (students[30]).grade ← 'B'\`

> **Example 11.7**
> However, we normally use a loop to read data into an array of record. Algorithm 11.2 shows part of the pseudocode for this process.

**Algorithm 11.2 Part of the pseudocode to read student record**
\`\`\`
i ← 1
while (i < 31)
{
    read (students [i]).id
    read (students [i]).name
    read (students [i]).grade
    i ← i + 1
}
\`\`\`

### 11.2.4 Arrays versus array of records
Both an array and an array of record represents a list of items. An array can be thought of as a special case of an array of records in which each element is a record with only a single field.

## 11.3 LINKED LISTS
A **linked list** is a collection of data in which each element contains the location of the next element—that is, each element contains two parts: data and link. The data part holds the value information: the data to be processed. The link is used to chain the data together, and contains a **pointer** (an address) that identifies the next element in the list. In addition, a pointer variable identifies the first element in the list. The name of the list is the same as the name of this pointer variable.

Figure 11.9 shows a linked list called *scores* that contains four elements. The link in each element, except the last, points to its successor. The link in the last element contains a **null pointer**, indicating the end of the list. We define an empty linked list to be only a null pointer: Figure 11.9 also shows an example of an empty linked list.

The elements in a linked list are traditionally called nodes. A **node** in a linked list is a record that has at least two fields: one contains the data, and the other contains the address of the next node in the sequence (the link). Figure 11.9 also shows a node.

Before further discussion of linked lists, we need to explain the notation we use in the figures. We show the connection between two nodes using a line. One end of the line has an arrowhead, the other end has a solid circle. The arrowhead represents a copy of the address of the node to which the arrow head is pointed. The solid circle shows where this copy of the address is stored (Figure 11.10). The figure also shows that we can store a copy of the address in more than one place. For example, Figure 11.10 shows that two copies of the address are stored in two different locations. Understanding these concepts helps us to understand operations on a linked list better.

### 11.3.1 Arrays versus linked lists
Both an array and a linked list are representations of a list of items in memory. The only difference is the way in which the items are linked together. In an array of records, the *linking tool* is the index. The element scores[3] is linked to the element scores[4] because the integer 4 comes after the integer 3. In a linked list, the *linking tool* is the link that points to the next element—the pointer or the address of the next element. Figure 11.11 compares the two representations for a list of five integers.

The elements of an array are stored one after another in the memory without a gap in between: the list is contiguous. The nodes of a linked list can be stored with gaps between them: the link part of the node ‘glues’ the items together. In other words, the computer has the option to store them contiguously or spread the nodes through the whole memory. This has an advantage: insertion and deletion in a linked list is much easier. The only thing that needs to be changed is the pointer to the address of the next element. However, this comes with an overhead: each node of a linked list has an extra field, the address of the next node in memory.

### 11.3.2 Linked list names versus nodes names
As for arrays and records, we need to distinguish between the name of the linked list and the names of the nodes, the elements of a linked list. A linked list must have a name. The name of a linked list is the name of the head pointer that points to the first node of the list. Nodes, on the other hand, do not have explicit names in a linked list, just implicit ones. The name of a node is related to the name of the pointer that points to the node. Different languages handle the relation between the pointer and the node to which the pointer points differently. We use the convention used in the C language. If the pointer that points to a node is called p, for example, we call the node *p. Since the node is a record, we can access the fields inside the node using the name of the node. For example, the data part and the link part of a node pointed by a pointer p can be called (*p).data and (*p).link. This naming convention implies that a node can have more than one name. Figure 11.12 shows the name of the linked list and the names of the nodes.

### 11.3.3 Operations on linked lists
The same operations we defined for an array can be applied to a linked list.

**Searching a linked list**
The search algorithm for a linked list can only be sequential (see Chapter 8) because the nodes in a linked list have no specific names (unlike the elements in an array) that can be found using a binary search. However, since nodes in a linked list have no names, we use two pointers, *pre* (for previous) and *cur* (for current).

At the beginning of the search, the *pre* pointer is null and the *cur* pointer points to the first node. The search algorithm moves the two pointers together towards the end of the list. Figure 11.13 shows the movement of these two pointers through the list in an extreme case scenario: when the target value is larger than any value in the list. For example, in the five-node list, assume that our target value is 220, which is larger than any value in the list.

However, other situations can occur. The value of the target can be less that data value in the first node, or it can be equal to one of the data values in one of the nodes, and so on. In all situations, however, when the search stops, the *cur* pointer points to the node that stops the search and the *pre* pointer points to the previous node. If the target is found, the *cur* pointer points to the node that holds the target value. If the target value is not found, the *cur* pointer points to the node with a value larger than the target value. In other words, since the list is sorted, and may be very long, we never allow the two pointers to reach the end of the list if we are sure that we have passed the target value. The searching algorithm uses a flag (a variable that can take only *true* or *false* values). When the target is found, the flag is set to *true*: when the target is not found, the flag is set to *false*. When the flag is *true* the *cur* pointer points to the target value: when the flag is *false*, the *cur* pointer points to a value larger than the target value.

Figure 11.14 shows some different situations. In the first case, the target is 98. This value does not exist in the list and is smaller than any value in the list, so the search algorithm stops while *pre* is null and *cur* points to the first node. The value of the flag is *false* because the value was not found. In the second case, the target is 132, which is the value of the second node. The search algorithm stops while *cur* is pointing to the second node and *pre* is pointing to the first node. The value of the flag is *true* because the target is found. In the third and the fourth cases, the targets are not found so the value of the flag is *false*.

Algorithm 11.3 shows a simplified algorithm for the search. We need more conditions on the *while* loop, but we leave that for more advanced discussion of linked lists. Note how we move the two pointers forward together. In each move, we have:

\`pre ← cur\` and \`cur ← (*cur).link\`

This guarantees that the two pointers move together. The first assignment makes a copy of *cur* and stores it in *pre*. This means *pre* is taking the previous value of *cur*. In the second assignment, the node pointed by *cur* is selected and the value of its link field is copied and stored in *cur* (see Figure 11.12 for clarification). The search algorithm is used both by the insertion algorithm (if the target is not found) and by the delete algorithm (if the target is found).

**Algorithm 11.3 Searching a linked list**
\`\`\`
Algorithm: SearchLinkedList
Purpose: Search the list using two pointers: pre and cur.
Pre: The linked list (head pointer) and target value
Post: None
Return: The position of pre and cur pointers and the value of the flag
{
    pre ← null
    cur ← list
    while (target < (*cur).data)
    {
        pre ← cur
        cur ← (*cur).link
    }
    if ((*cur).data = target) flag ← true
    else flag ← false
}
\`\`\`

**Inserting a node**
Before insertion into a linked list, we first apply the searching algorithm. If the flag returned from the searching algorithm is false, we will allow insertion, otherwise we abort the insertion algorithm, because we do not allow data with duplicate values. Four cases can arise:
- Inserting into an empty list.
- Insertion at the beginning of the list.
- Insertion at the end of the list.
- Insertion in the middle of the list.

**Insertion into an empty list**
If the list is empty (list = null), the new item is inserted as the first element. One statement can do the job:
\`list ← new\`

**Insertion at the beginning**
If the searching algorithm returns a flag with value of *false* and the value of the *pre* pointer is null, the data needs to be inserted at the beginning of the list. Two statements are needed to do the job:
\`(*new).link ← cur\` and \`list ← new\`
The first assignment makes the new node become the predecessor of the previous first node. The second statement makes the newly connected node the first node. Figure 11.15 shows the situation.

**Insertion at the end**
If the searching algorithm returns a flag with value of *false* and the value of the *cur* pointer is null, the data needs to be inserted at the end of the list. Two statements are needed to do the job:
\`(*pre).link ← new\` and \`(*new).link ← null\`
The first assignment connects the new node to the previous last node. The second statement makes the newly connected node become the last node. Figure 11.16 shows the situation.

**Insertion in the middle**
If the searching algorithm returns a flag with a value of *false* and none of the returned pointers are null, the new data needs to be inserted at the middle of the list. Two statements are needed to do the job:
\`(*new).link ← cur\` and \`(*pre).link ← new\`
The first assignment connects the new node to its successor. The second statement connects the new node to its predecessor. Figure 11.17 shows the situation.

Algorithm 11.4 shows the pseudocode for inserting a new node in a linked list. The first section just adds a node to an empty list.

**Algorithm 11.4 Inserting a node in a linked list**
\`\`\`
Algorithm: InsertLinkedList (list, target, new)
Purpose: Insert a node in the link list after searching the list
Pre: The linked list and the target data to be inserted
Post: None
Return: The new linked list
{
    searchlinkedlist (list, target, pre, cur, flag)
    // Given target and returning pre, cur, and flag
    if (flag = true) // No duplicate
    {
        return list
    }
    if (list = null // Insert into empty list
    {
        list ← new
    }
    if (pre = null) // Insertion at the beginning
    {
        (*new).link ← cur
        list ← new
        return list
    }
    if (cur = null) // Insertion at the end
    {
        (*pre).link ← new
        (*new).link ← null
        return list
    }
    (*new).link ← cur // Insertion in the middle
    (*pre).link ← new
    return list
}
\`\`\`

**Deleting a node**
Before deleting a node in a linked list, we apply the search algorithm. If the flag returned from the search algorithm is true (the node is found), we can delete the node from the linked list. However, deletion is simpler than insertion: we have only two cases—deleting the first node and deleting any other node. In other words, the deletion of the last and the middle nodes can be done by the same process.

**Deleting the first node**
If the *pre* pointer is null, the first node is to be deleted. The *cur* pointer points to the first node and deleting can be done by one statement:
\`list ← (*cur).link\`
The statement connects the second node to the list pointer, which means that the first node is deleted. Figure 11.18 shows the case.

**Deleting the middle or the last node**
If neither of the pointers is null, the node to be deleted is either a middle node or the last node. The *cur* pointer points to the corresponding node and deleting can be done by one statement:
\`(*pre).link ← (*cur).link\`
The statement connects the successor node to the predecessor node, which means that the current node is deleted. Figure 11.19 shows the case.

Algorithm 11.5 shows the pseudocode for deleting a node. The algorithm is much simpler than the one for inserting. We have only two cases and each case needs only one statement.

**Algorithm 11.5 Deleting a node in a linked list**
\`\`\`
Algorithm: DeleteLinkedList (list, target)
Purpose: Delete a node in a linked list after searching the list for the right node
Pre: The linked list and the target data to be deleted
Post: None
Return: The new linked list
{
    // Given target and returning pre, cur, and flag
    searchlinkedlist (list, target, pre, cur, flag)
    if (flag = false)
    {
        return list // The node to be deleted not found
    }
    if (pre = null) // Deleting the first node
    {
        list ← (*cur).link
        return list
    }
    (*pre).link ← (*cur).link // Deleting other nodes
    return list
}
\`\`\`

**Retrieving a node**
Retrieving means randomly accessing a node for the purpose of inspecting or copying the data contained in the node. Before retrieving, the linked list needs to be searched. If the data item is found, it is retrieved, otherwise the process is aborted. Retrieving uses only the *cur* pointer, which points to the node found by the search algorithm. Algorithm 11.6 shows the pseudocode for retrieving the data in a node. The algorithm is much simpler than the insertion or deletion algorithm.

**Algorithm 11.6 Retrieving a node in a linked list**
\`\`\`
Algorithm: RetrieveLinkedList (list, target)
Purpose: Retrieves the data in a node after searching the list for the right node
Pre: The linked list (head pointer) and the target (data to be retrieved)
Post: None
Return: Return the data retrieved
{
    searchlinkedlist (list, target, pre, cur, flag)
    if (flag = false) // The node not found
    {
        return error
    }
    return (*cur).data
}
\`\`\`

**Traversing a linked list**
To traverse the list, we need a ‘walking’ pointer, which is a pointer that moves from node to node as each element is processed. We start traversing by setting the walking pointer to the first node in the list. Then, using a loop, we continue until all of the data has been processed. Each iteration of the loop processes the current node, then advances the walking pointer to the next node. When the last node has been processed, the walking pointer becomes null and the loop terminates (Figure 11.20).

Algorithm 11.7 shows the pseudocode for traversing a linked list.

**Algorithm 11.7 Traversing a linked list**
\`\`\`
Algorithm: TraverseLinkedList (list)
Purpose: Traverse a linked list and process each data item
Pre: The linked list (head pointer)
Post: None
Return: The list
{
    walker ← list
    while (walker ≠ null)
    {
        Process (*walker).data
        walker ← (*walker).link
    }
    return list
}
\`\`\`

### 11.3.4 Applications of linked lists
A linked list is a very efficient data structure for storing data that will go through many insertions and deletions. A linked list is a dynamic data structure in which the list can start with no nodes and then grow as new nodes are needed. A node can be easily deleted without moving other nodes, as would be the case with an array. For example, a linked list could be used to hold the records of students in a school. Each quarter or semester, new students enroll in the school and some students leave or graduate.

A linked list can grow infinitely and can shrink to an empty list. The overhead is to hold an extra field for each node. A linked list, however, is not a good candidate for data that must be searched often. This appears to be a dilemma, because each deletion or insertion needs a search. We will see that some abstract data types, discussed in the next chapter, have the advantages of an array for searching and the advantages of a link list for insertion and deletion.

**A linked list is a suitable structure if a large number of insertions and deletions are needed, but searching a linked list is slower that searching an array.**

## 11.4 END-CHAPTER MATERIALS

### 11.4.1 Recommended reading
For more details about the subjects discussed in this chapter, the following books are recommended:
- Gilberg, R. and Forouzan, B. *Data Structures – A Pseudocode Approach with C*, Boston, MA: Course Technology, 2005
- Goodrich, M. and Tamassia, R. *Data Structures and Algorithms in Java*, New York: Wiley, 2005
- Neapolitan, R. and Naimipour, K. *Foundations of Algorithms Using C++ Pseudocode*, Sudbury, MA: Jones and Bartlett, 2004
- Main, M. and Savitch, W. *Data Structures and Other Objects Using C++*, Reading, MA: Addison-Wesley, 2004
- Standish, T. *Data Structures, Algorithms, and Software Principles*, Reading, MA: Addison-Wesley, 1994

### 11.4.2 Key terms
- array
- column-major storage
- data structure
- field
- index
- link
- linked list
- multidimensional array
- node
- null pointer
- one-dimensional array
- pointer
- record
- retrieval
- row-major storage
- searching
- two-dimensional array
- string

### 11.4.3 Summary
- A data structure uses a collection of related variables that can be accessed individually or as a whole. In other words, a data structure represents a set of data items that share a specific relationship. We discussed three data structures in this chapter: arrays, records, and linked lists.
- An array is a sequenced collection of elements normally of the same data type. We use indexes to refer to the elements of an array. In an array we have two types of identifiers: the name of the array and the name of each individual element.
- Many applications require that data is stored in more than one dimension. One common example is a table, which is an array that consists of rows and columns. Two-dimensional arrays can be stored in memory using either row-major or column-major storage. The first is more common.
- The common operations on arrays as a structure are searching, insertion, deletion, retrieval, and traversal. An array is a suitable structure in applications where the number of deletions and insertions is small but a lot of searching and retrieval operations are required. An array is normally a static data structure and so is more suitable when the number of data items is fixed.
- A record is a collection of related elements, possibly of different types, having a single name. Each element in a record is called a field. A field is the smallest element of named data that has meaning in a record.
- A string is a set of characters that is treated like an array in some languages and as a type in others.
- A linked list is a collection of data in which each element contains the location of the next element; that is, each element contains two parts: data and link. The data part holds the useful information: the data to be processed. The link is used to chain the data together.
- The same operations defined for an array can be applied to a linked list. A linked list is a very efficient structure for data that will go through many insertions and deletions. A linked list is a dynamic data structure in which the list can start with no nodes and grow as new nodes are needed.

## 11.5 PRACTICE SET

### 11.5.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 11.5.2 Review questions
1. Name three types of data structures.
2. How is an element in an array different from an element in a record?
3. How is an element in an array different from an element in a linked list?
4. Why should we use indexes rather than subscripts to identify array elements?
5. How are the elements of an array stored in memory?
6. What is the definition of a field in a record?
7. What are the fields of a node in a linked list?
8. What is the function of the pointer in a linked list?
9. How do you point to the first node in a linked list?
10. What is the value of the link field in the last node of a linked list?

### 11.5.3 Problems
1. There are two arrays, A and B, each of 10 integers. Write an algorithm that tests if every element of array A is equal to its corresponding element in array B.
2. Write an algorithm that reverses the elements of an array so that the last element becomes the first, the second to the last becomes the second, and so forth.
3. Write an algorithm to print the contents of a two-dimensional array of R rows and C columns.
4. Write an algorithm to apply sequential search on an array of N elements.
5. Write an algorithm to apply binary search on an array of N elements.
6. Write an algorithm to insert an element into a sorted array. The algorithm must call a search algorithm to find the location for insertion.
7. Write an algorithm to delete an element in a sorted array. The algorithm must call a search algorithm to find the location of insertion.
8. Write an algorithm to multiply each element of an array by a constant.
9. Write an algorithm to add a fraction (Fr1) to another fraction (Fr2).
10. Write an algorithm to subtract a fraction (Fr1) from another fraction (Fr2).
11. Write an algorithm to multiply a fraction (Fr1) by another fraction (Fr2).
12. Write an algorithm to divide a fraction (Fr1) by another fraction (Fr2).
13. Draw a diagram to show a linked list in which the data part is a student record with three fields: id, name, and grade.
14. Show how the delete algorithm for a linked list (Algorithm 11.4, in section 11.3.3) can delete the only node in a linked list.
15. Show how the insertion algorithm for a linked list (Algorithm 11.3, in section 11.3.3) can add a node to an empty linked list.
16. Show how we can build a linked list from scratch using the insertion algorithm (Algorithm 11.3, in section 11.3.3).
17. Write an algorithm to find the average of the numbers in a linked list of numbers.
18. Show what happens if we apply the following statements to the linked list in Figure 11.9.
   \`scores ← (*scores).link\`
19. Show what happens if we apply the following statements to the linked list in Figure 11.13.
   \`cur ← (*cur).link\` and \`pre ← (*pre).link\`
`,
  zh: `
# 第十一章：資料結構

在前面的章節中，我們使用了儲存單個實體的變數。雖然單一變數在程式語言中被廣泛使用，但它們無法有效地解決複雜的問題。在本章中，我們介紹資料結構。本章是下一章的序幕，在下一章我們將介紹抽象資料型別（ADT）。

**資料結構**使用一組相關的變數，這些變數可以單獨存取，也可以作為一個整體存取。換句話說，資料結構代表一組共享特定關係的資料項目。我們在本章討論三種資料結構：*陣列*、*記錄*和*鏈結串列*。大多數程式語言都對前兩者有隱含的實作。然而，第三種是使用指標和記錄來模擬的。

## 學習目標
學完本章後，學生應能：
- 定義資料結構。
- 定義陣列為一種資料結構以及如何使用它來儲存資料項目列表。
- 區分陣列名稱和陣列中元素名稱。
- 描述為陣列定義的操作。
- 定義記錄為一種資料結構以及如何使用它來儲存屬於單個資料元素的屬性。
- 區分記錄名稱及其欄位名稱。
- 定義鏈結串列為一種資料結構以及如何使用指標來實作它。
- 描述為鏈結串列定義的操作。
- 比較和對比陣列、記錄和鏈結串列。
- 定義陣列、記錄和鏈結串列的應用。

## 11.1 陣列
想像我們有 100 個分數。我們需要讀取它們，處理它們，並列印它們。我們還必須在程式執行期間將這 100 個分數保留在記憶體中。我們可以定義一百個變數，每個變數都有不同的名稱，如圖 11.1 所示。

但是擁有 100 個不同的名稱會產生其他問題。我們需要 100 個引用來讀取它們，100 個引用來處理它們，以及 100 個引用來寫入它們。圖 11.2 顯示了一個說明此問題的圖表。

即使處理這相對較少的分數，我們需要的指令數量也是不可接受的。為了處理大量資料，我們需要像陣列這樣的資料結構。

**陣列**是相同資料類型元素的序列集合。我們可以將陣列中的元素稱為第一個元素、第二個元素，依此類推，直到最後一個元素。如果我們將 100 個分數放入一個陣列中，我們可以將元素指定為 scores[1]、scores[2] 等等。**索引**表示元素的序數，從陣列的開頭開始計數。陣列的元素是通過其下標單獨定址的（圖 11.3）。陣列作為一個整體有一個名稱，*scores*，但每個分數都可以使用其下標單獨存取。

我們可以使用迴圈來讀取和寫入陣列中的元素。我們還可以使用迴圈來處理元素。現在不管是要處理 100、1000 還是 10000 個元素都沒有關係——迴圈使處理它們變得容易。我們可以使用一個整數變數來控制迴圈，只要該變數的值小於陣列中元素的總數，就保持在迴圈中（圖 11.4）。

我們使用了從 1 開始的索引；一些現代語言如 C、C++ 和 Java 從 0 開始索引。

> **範例 11.1**
> 比較圖 11.2 中處理 100 個單獨元素和圖 11.4 中處理 100 個元素的陣列所需的指令數量。假設處理每個分數只需要一個指令。
>
> **解答**
> - 在第一種情況下，我們需要 100 個指令來讀取，100 個指令來寫入，以及 100 個指令來處理。總共是 300 個指令。
> - 在第二種情況下，我們有三個迴圈。在每個迴圈中我們有兩個指令，總共六個指令。然而，我們還需要三個指令來初始化索引，以及三個指令來檢查索引的值。總共，我們有 12 個指令。

> **範例 11.2**
> 如果我們使用陣列，電腦需要執行的週期數（提取、解碼和執行階段）並不會減少。週期數實際上增加了，因為我們有初始化、遞增和測試索引值的額外開銷。但我們關注的不是週期數：而是我們編寫程式所需的行數。

> **範例 11.3**
> 在電腦科學中，最大的問題之一是程式的可重用性——例如，如果資料項目的數量發生變化，需要更改多少。假設我們編寫了兩個程式來處理分數，如圖 11.2 和圖 11.4 所示。如果分數數量從 100 變為 1000，我們需要在每個程式中進行多少更改？
> 在第一個程式中，我們需要增加 3 × 900 = 2700 個指令。在第二個程式中，我們只需要更改三個條件（I > 100 改為 I > 1000）。我們實際上可以修改圖 11.4 中的圖表，將更改次數減少到一次。

### 11.1.1 陣列名稱與元素名稱
在陣列中，我們有兩種類型的識別碼：陣列的名稱和每個單獨元素的名稱。陣列的名稱是整個結構的名稱，而元素的名稱允許我們引用該元素。在圖 11.3 的陣列中，陣列的名稱是 *scores*，每個元素的名稱是陣列名稱後跟索引，例如 scores[1]、scores[2] 等等。在本章中，我們主要需要元素的名稱，但在某些語言中，如 C，我們也需要使用陣列的名稱。

### 11.1.2 多維陣列
到目前為止討論的陣列被稱為**一維陣列**，因為資料僅在一個方向上線性組織。許多應用程式要求資料儲存在多個維度中。一個常見的例子是表格，它是一個由列和行組成的陣列。圖 11.5 顯示了一個表格，通常稱為**二維陣列**。

圖 11.5 中顯示的陣列保存了一個班級學生的分數。班上有五名學生，每名學生有四個不同的測驗分數。變數 scores[2][3] 顯示了第二名學生在第三次測驗中的分數。將分數排列在二維陣列中可以幫助老師找到每位學生的平均分數（列值的平均值）和每次測驗的平均分數（行值的平均值），以及所有測驗的平均值（整個表格的平均值）。

**多維陣列**——具有超過兩個維度的陣列——也是可能的。然而，我們在本書中不討論超過二維的陣列。

### 11.1.3 記憶體佈局
一維陣列中的索引直接定義了元素在實際記憶體中的相對位置。然而，二維陣列代表列和行。每個元素如何儲存在記憶體中取決於電腦。大多數電腦使用**以列為主 (row-major) 的儲存**，其中陣列的一整列在下一列之前儲存在記憶體中。然而，電腦可以使用**以行為主 (column-major) 的儲存**來儲存陣列，其中整行在下一行之前儲存。圖 11.6 顯示了一個二維陣列以及它是如何使用以列為主或以行為主的儲存方式儲存在記憶體中的。以列為主的儲存更為常見。

> **範例 11.4**
> 我們已將二維陣列 *students* 儲存在記憶體中。陣列是 100 × 4（100 列和 4 行）。假設元素 *student*[1][1] 儲存在位址 1000 的記憶體位置，且每個元素只佔用一個記憶體位置，顯示元素 *students*[5][3] 的位址。電腦使用以列為主的儲存。
>
> **解答**
> 我們可以使用以下公式找到元素的位置，假設每個元素佔用一個記憶體位置：
> $y = x + \\text{Cols} \\times (i - 1) + (j - 1)$
> 其中 $x$ 定義起始位址，Cols 定義陣列中的行數，$i$ 定義元素的列號，$j$ 定義元素的行號，$y$ 是我們要尋找的位址。在我們的例子中，$x$ 是 1000，Cols 是 4，$i$ 是 5，$j$ 是 3。我們正在尋找 $y$ 的值：
> $y = x + \\text{Cols} \\times (i - 1) + (j - 1) = 1000 + 4(5 - 1) + (3 - 1) = 1018$
> 這個答案是有道理的，因為元素位於第 5 列第 3 行。在此元素之前有四列，佔用 16 (4 × 4) 個記憶體位置。第 5 列的前兩個元素也佔用了兩個記憶體位置。這意味著目標元素之前的所有元素佔用了 18 個記憶體位置。如果第一個元素佔用位置 1000，則目標元素佔用位置 1018。

### 11.1.4 陣列上的操作
雖然我們可以應用為陣列每個元素定義的常規操作（見第 4 章），但有些操作我們可以定義在作為資料結構的陣列上。陣列作為結構的常見操作是*搜尋*、*插入*、*刪除*、*檢索*和*遍歷*。

**搜尋元素**
當我們知道值時，我們經常需要找到元素的索引。這種類型的搜尋在第 8 章中討論過。我們可以對未排序的陣列使用循序搜尋，或對已排序的陣列使用二元搜尋。搜尋用於接下來的三個操作。

**插入元素**
傳統上，電腦語言要求在編寫程式時定義陣列的大小（陣列中的元素數量），並防止在程式執行期間更改它。最近，一些語言允許變長陣列。即使語言允許變長陣列，將元素插入陣列也需要仔細注意。

**在末尾插入**
如果插入是在陣列的末尾，並且語言允許我們增加陣列的大小，這可以很容易地完成。例如，如果一個陣列有 30 個元素，我們將陣列的大小增加到 31，並將新項目作為第 31 個項目插入。

**在開頭或中間插入**
如果插入要在陣列的開頭或中間進行，過程是漫長且耗時的。當我們需要在已排序的陣列中插入元素時，就會發生這種情況。我們首先搜尋陣列，如前所述。找到插入位置後，我們插入新元素。例如，如果我們想在 30 個元素的陣列中插入一個元素作為第 9 個元素，則第 9 到第 30 個元素應向陣列末尾移動一個位置，以便在位置 9 打開一個空元素進行插入。以下顯示了需要應用於陣列的部分偽代碼：

\`\`\`
i ← 30
while (i ≥ 9)
{
    array [i + 1] ← array [i]
    i ← i - 1
}
array [i] ← newValue
\`\`\`

請注意，移動需要從陣列的末尾進行，以防止丟失元素的值。代碼首先將第 30 個元素的值複製到第 31 個元素，然後將第 29 個元素的值複製到第 30 個元素，依此類推。當代碼跳出迴圈時，第 9 個元素已經複製到第 10 個元素。最後一行將新項目的值複製到第 9 個元素中。

**刪除元素**
刪除陣列中的元素與插入一樣漫長且複雜。例如，如果應該刪除第九個元素，我們需要將第 10 到第 30 個元素向陣列的開始方向移動一個位置。我們將此操作的偽代碼留作練習，它與添加元素的偽代碼類似。

**檢索元素**
檢索意味著為了檢查或複製元素中包含的資料而隨機存取一個元素。與插入和刪除操作不同，當資料結構是陣列時，檢索是一個簡單的操作。事實上，陣列是一個*隨機存取結構*，這意味著陣列的每個元素都可以隨機存取，而無需存取它之前或之後的元素。例如，如果我們想檢索陣列中第 9 個元素的值，我們可以使用單個指令來完成，如下所示：

\`\`\`
RetrievedValue ← array[9]
\`\`\`

**遍歷陣列**
陣列遍歷是指應用於陣列所有元素的操作，例如讀取、寫入、應用數學運算等等。

演算法 11.1 給出了一個範例，用於找出元素為實數的陣列中元素的平均值。演算法首先使用迴圈找出元素的總和。迴圈終止後，計算平均值，即總和除以元素數量。請注意，為了正確計算總和，需要在迴圈之前將總和設定為 0.0。

**演算法 11.1 計算陣列中元素的平均值**
\`\`\`
演算法：ArrayAverage (Array, n)
目的：找出平均值
前置條件：給定陣列 Array 和元素數量 n。
後置條件：無
回傳：平均值
{
    sum ← 0.0
    i ← 1
    while (i ≤ n)
    {
        sum ← sum + Array [i]
        i ← i + 1
    }
    average ← sum / n
    Return ( average )
}
\`\`\`

### 11.1.5 字串
**字串**作為一組字元，在不同的語言中處理方式不同。在 C 中，字串是字元陣列。在 C++ 中，字串可以是字元陣列，但有一個名為 string 的類型。在 Java 中，字串是一種類型。

### 11.1.6 應用
思考上一節討論的操作可以為陣列的應用提供線索。如果我們有一個列表，在創建原始列表後預計會有大量的插入和刪除，我們就不應該使用陣列。當刪除和插入的數量很少，但預計會有大量的*搜尋*和*檢索*活動時，陣列更合適。

**當需要少量的插入和刪除，但需要大量的搜尋和檢索時，陣列是一個合適的結構。**

## 11.2 記錄
**記錄**是相關元素的集合，可能具有不同的類型，擁有單一名稱。記錄中的每個元素稱為**欄位**。欄位是具有意義的命名資料的最小元素。欄位具有類型，並存在於記憶體中。可以為欄位賦值，進而可以存取這些值進行選擇或操作。欄位與變數的主要區別在於它是記錄的一部分。

圖 11.7 包含兩個記錄範例。第一個範例 *fraction* 有兩個欄位，都是整數。第二個範例 *student* 有三個由三種不同類型組成的欄位。

**記錄中的元素可以是相同或不同的類型，但記錄中的所有元素必須相關。**

記錄中的資料應該都與一個物件相關。在圖 11.7 中，分數中的整數都屬於同一個分數，第二個範例中的資料都與一名學生有關。（請注意，我們將字串資料放在雙引號之間，單個字元放在單引號之間。這是大多數程式語言中使用的慣例。）

### 11.2.1 記錄名稱與欄位名稱
就像在陣列中一樣，我們在記錄中有兩種類型的識別碼：記錄的名稱和記錄內每個單獨欄位的名稱。記錄的名稱是整個結構的名稱，而每個欄位的名稱允許我們引用該欄位。例如，在圖 11.7 的學生記錄中，記錄的名稱是 *student*，欄位的名稱是 *student.id*、*student.name* 和 *student.grade*。大多數程式語言使用句點 (.) 來分隔結構（記錄）的名稱與其組件（欄位）的名稱。這是我們在本書中使用的慣例。

> **範例 11.5**
> 以下顯示圖 11.7 中欄位的值是如何儲存的：
> \`student.id ← 2005\` \`student.name ← "G. Boole"\` \`student.grade ← 'A'\`

### 11.2.2 記錄和陣列的比較
我們可以概念性地比較陣列和記錄。這有助於我們理解何時應該使用陣列，何時應該使用記錄。陣列定義了元素的組合，而記錄定義了元素的可識別部分。例如，陣列可以定義一個班級的學生（40 名學生），但記錄定義了學生的不同屬性，如 id、姓名或成績。

### 11.2.3 記錄陣列
如果我們需要定義元素的組合，同時定義每個元素的一些屬性，我們可以使用記錄陣列。例如，在一個 30 名學生的班級中，我們可以有一個包含 30 個記錄的陣列，每個記錄代表一名學生。圖 11.8 顯示了一個名為 *students* 的 30 個學生記錄的陣列。

在記錄陣列中，陣列的名稱定義了整個結構，即學生群體。要定義每個元素，我們需要使用相應的索引。要定義每個元素的部分（屬性），我們需要使用點運算子。換句話說，首先我們需要定義元素，然後我們可以定義該元素的一部分。因此，第三名學生的 id 定義為：
\`(student[3]).id\`

請注意，我們使用括號來強調首先應該選擇特定學生，然後是該學生的 id。換句話說，括號告訴我們索引運算子的優先順序高於點運算子。在某些語言中，不需要使用括號，因為優先順序已經在語言本身中建立，但使用括號總是能保證優先順序。

> **範例 11.6**
> 以下顯示我們如何存取 students 陣列中每個記錄的欄位以在其中儲存值。
> \`(students[1]).id ← 1001 (students[1]).name ← "J. Aron" (students[1]).grade ← 'A'\`
> \`(students[2]).id ← 2007 (students[2]).name ← "F. Bush" (students[2]).grade ← 'F'\`
> ...
> \`(students[30]).id ← 3012 (students[30]).name ← "M. Blair" (students[30]).grade ← 'B'\`

> **範例 11.7**
> 然而，我們通常使用迴圈將資料讀入記錄陣列。演算法 11.2 顯示了此過程的部分偽代碼。

**演算法 11.2 讀取學生記錄的部分偽代碼**
\`\`\`
i ← 1
while (i < 31)
{
    read (students [i]).id
    read (students [i]).name
    read (students [i]).grade
    i ← i + 1
}
\`\`\`

### 11.2.4 陣列與記錄陣列
陣列和記錄陣列都代表項目列表。陣列可以被認為是記錄陣列的一種特殊情況，其中每個元素是只有一個欄位的記錄。

## 11.3 鏈結串列
**鏈結串列**是資料的集合，其中每個元素包含下一個元素的位置——也就是說，每個元素包含兩個部分：資料和連結。資料部分保存值資訊：要處理的資料。連結用於將資料鏈接在一起，並包含一個**指標**（位址），該指標標識列表中的下一個元素。此外，一個指標變數標識列表中的第一個元素。列表的名稱與此指標變數的名稱相同。

圖 11.9 顯示了一個名為 *scores* 的鏈結串列，其中包含四個元素。除了最後一個元素外，每個元素中的連結都指向其後繼者。最後一個元素中的連結包含一個**空指標 (null pointer)**，表示列表的結束。我們將空鏈結串列定義為僅一個空指標：圖 11.9 也顯示了一個空鏈結串列的例子。

鏈結串列中的元素傳統上稱為節點。鏈結串列中的**節點**是一個至少有兩個欄位的記錄：一個包含資料，另一個包含序列中下一個節點的位址（連結）。圖 11.9 也顯示了一個節點。

在進一步討論鏈結串列之前，我們需要解釋我們在圖中使用的符號。我們使用一條線顯示兩個節點之間的連接。線的一端有一個箭頭，另一端有一個實心圓。箭頭代表箭頭指向的節點位址的副本。實心圓顯示此位址副本儲存的位置（圖 11.10）。該圖還顯示我們可以將位址副本儲存在多個位置。例如，圖 11.10 顯示兩個位址副本儲存在兩個不同的位置。理解這些概念有助於我們更好地理解鏈結串列上的操作。

### 11.3.1 陣列與鏈結串列
陣列和鏈結串列都是記憶體中項目列表的表示形式。唯一的區別在於項目鏈接在一起的方式。在記錄陣列中，*鏈接工具*是索引。元素 scores[3] 鏈接到元素 scores[4]，因為整數 4 在整數 3 之後。在鏈結串列中，*鏈接工具*是指向下一個元素的連結——指標或下一個元素的位址。圖 11.11 比較了五個整數列表的兩種表示形式。

陣列的元素在記憶體中一個接一個地儲存，中間沒有間隙：列表是連續的。鏈結串列的節點可以儲存為中間有間隙：節點的連結部分將項目「黏」在一起。換句話說，電腦可以選擇將它們連續儲存或將節點分散在整個記憶體中。這有一個優點：鏈結串列中的插入和刪除要容易得多。唯一需要更改的是指向下一個元素位址的指標。然而，這也帶來了開銷：鏈結串列的每個節點都有一個額外的欄位，即記憶體中下一個節點的位址。

### 11.3.2 鏈結串列名稱與節點名稱
對於陣列和記錄，我們需要區分鏈結串列的名稱和節點（鏈結串列的元素）的名稱。鏈結串列必須有一個名稱。鏈結串列的名稱是指向列表第一個節點的頭指標的名稱。另一方面，節點在鏈結串列中沒有顯式名稱，只有隱含名稱。節點的名稱與指向該節點的指標名稱有關。不同的語言以不同的方式處理指標與指標所指向的節點之間的關係。我們使用 C 語言中使用的慣例。例如，如果指向節點的指標稱為 p，我們稱該節點為 *p。由於節點是一個記錄，我們可以使用節點的名稱存取節點內部的欄位。例如，由指標 p 指向的節點的資料部分和連結部分可以稱為 (*p).data 和 (*p).link。這種命名慣例意味著一個節點可以有多個名稱。圖 11.12 顯示了鏈結串列的名稱和節點的名稱。

### 11.3.3 鏈結串列上的操作
我們為陣列定義的相同操作可以應用於鏈結串列。

**搜尋鏈結串列**
鏈結串列的搜尋演算法只能是循序的（見第 8 章），因為鏈結串列中的節點沒有特定名稱（不像陣列中的元素），無法使用二元搜尋找到。然而，由於鏈結串列中的節點沒有名稱，我們使用兩個指標，*pre*（前一個）和 *cur*（當前）。

在搜尋開始時，*pre* 指標為空，*cur* 指標指向第一個節點。搜尋演算法將兩個指標一起向列表末尾移動。圖 11.13 顯示了這兩個指標在極端情況下的移動：當目標值大於列表中的任何值時。例如，在五個節點的列表中，假設我們的目標值是 220，它大於列表中的任何值。

然而，可能會發生其他情況。目標值可能小於第一個節點中的資料值，或者它可能等於其中一個節點中的資料值，依此類推。然而，在所有情況下，當搜尋停止時，*cur* 指標指向停止搜尋的節點，*pre* 指標指向前一個節點。如果找到目標，*cur* 指標指向保存目標值的節點。如果未找到目標值，*cur* 指標指向值大於目標值的節點。換句話說，由於列表是已排序的，並且可能很長，如果我們確定已經過了目標值，我們絕不允許兩個指標到達列表的末尾。搜尋演算法使用一個旗標（一個只能取 *true* 或 *false* 值的變數）。當找到目標時，旗標設定為 *true*：當未找到目標時，旗標設定為 *false*。當旗標為 *true* 時，*cur* 指標指向目標值：當旗標為 *false* 時，*cur* 指標指向大於目標值的數值。

圖 11.14 顯示了一些不同的情況。在第一種情況下，目標是 98。此值在列表中不存在，且小於列表中的任何值，因此搜尋演算法在 *pre* 為空且 *cur* 指向第一個節點時停止。旗標的值為 *false*，因為未找到該值。在第二種情況下，目標是 132，這是第二個節點的值。搜尋演算法在 *cur* 指向第二個節點且 *pre* 指向第一個節點時停止。旗標的值為 *true*，因為找到了目標。在第三和第四種情況下，未找到目標，因此旗標的值為 *false*。

演算法 11.3 顯示了一個簡化的搜尋演算法。我們需要在 *while* 迴圈上增加更多條件，但我們將其留給鏈結串列的更進階討論。請注意我們如何將兩個指標一起向前移動。在每次移動中，我們有：

\`pre ← cur\` 和 \`cur ← (*cur).link\`

這保證了兩個指標一起移動。第一個賦值製作 *cur* 的副本並將其儲存在 *pre* 中。這意味著 *pre* 正在獲取 *cur* 的先前值。在第二個賦值中，選擇由 *cur* 指向的節點，並將其連結欄位的值複製並儲存在 *cur* 中（見圖 11.12 進行說明）。搜尋演算法由插入演算法（如果未找到目標）和刪除演算法（如果找到目標）使用。

**演算法 11.3 搜尋鏈結串列**
\`\`\`
演算法：SearchLinkedList
目的：使用兩個指標 pre 和 cur 搜尋列表。
前置條件：鏈結串列（頭指標）和目標值
後置條件：無
回傳：pre 和 cur 指標的位置以及旗標的值
{
    pre ← null
    cur ← list
    while (target < (*cur).data)
    {
        pre ← cur
        cur ← (*cur).link
    }
    if ((*cur).data = target) flag ← true
    else flag ← false
}
\`\`\`

**插入節點**
在插入鏈結串列之前，我們先應用搜尋演算法。如果搜尋演算法回傳的旗標為 false，我們將允許插入，否則我們中止插入演算法，因為我們不允許有重複值的資料。可能會出現四種情況：
- 插入空列表。
- 在列表開頭插入。
- 在列表末尾插入。
- 在列表由間插入。

**插入空列表**
如果列表為空（list = null），新項目將作為第一個元素插入。一個語句可以完成這項工作：
\`list ← new\`

**在開頭插入**
如果搜尋演算法回傳值為 *false* 的旗標且 *pre* 指標的值為空，則需要在列表開頭插入資料。需要兩個語句來完成這項工作：
\`(*new).link ← cur\` 和 \`list ← new\`
第一個賦值使新節點成為先前第一個節點的前驅。第二個語句使新連接的節點成為第一個節點。圖 11.15 顯示了這種情況。

**在末尾插入**
如果搜尋演算法回傳值為 *false* 的旗標且 *cur* 指標的值為空，則需要在列表末尾插入資料。需要兩個語句來完成這項工作：
\`(*pre).link ← new\` 和 \`(*new).link ← null\`
第一個賦值將新節點連接到先前的最後一個節點。第二個語句使新連接的節點成為最後一個節點。圖 11.16 顯示了這種情況。

**在中間插入**
如果搜尋演算法回傳值為 *false* 的旗標且回傳的指標都不為空，則需要在列表由間插入新資料。需要兩個語句來完成這項工作：
\`(*new).link ← cur\` 和 \`(*pre).link ← new\`
第一個賦值將新節點連接到其後繼者。第二個語句將新節點連接到其前驅。圖 11.17 顯示了這種情況。

演算法 11.4 顯示了在鏈結串列中插入新節點的偽代碼。第一部分只是將節點添加到空列表。

**演算法 11.4 在鏈結串列中插入節點**
\`\`\`
演算法：InsertLinkedList (list, target, new)
目的：在搜尋列表後在鏈結串列中插入節點
前置條件：鏈結串列和要插入的目標資料
後置條件：無
回傳：新的鏈結串列
{
    searchlinkedlist (list, target, pre, cur, flag)
    // 給定目標並回傳 pre, cur 和 flag
    if (flag = true) // 無重複
    {
        return list
    }
    if (list = null // 插入空列表
    {
        list ← new
    }
    if (pre = null) // 在開頭插入
    {
        (*new).link ← cur
        list ← new
        return list
    }
    if (cur = null) // 在末尾插入
    {
        (*pre).link ← new
        (*new).link ← null
        return list
    }
    (*new).link ← cur // 在中間插入
    (*pre).link ← new
    return list
}
\`\`\`

**刪除節點**
在刪除鏈結串列中的節點之前，我們應用搜尋演算法。如果搜尋演算法回傳的旗標為真（找到節點），我們可以從鏈結串列中刪除該節點。然而，刪除比插入簡單：我們只有兩種情況——刪除第一個節點和刪除任何其他節點。換句話說，最後一個和中間節點的刪除可以通過相同的過程完成。

**刪除第一個節點**
如果 *pre* 指標為空，則要刪除的是第一個節點。*cur* 指標指向第一個節點，刪除可以通過一個語句完成：
\`list ← (*cur).link\`
該語句將第二個節點連接到列表指標，這意味著第一個節點被刪除。圖 11.18 顯示了這種情況。

**刪除中間或最後一個節點**
如果兩個指標都不為空，則要刪除的節點是中間節點或最後一個節點。*cur* 指標指向相應的節點，刪除可以通過一個語句完成：
\`(*pre).link ← (*cur).link\`
該語句將後繼節點連接到前驅節點，這意味著當前節點被刪除。圖 11.19 顯示了這種情況。

演算法 11.5 顯示了刪除節點的偽代碼。該演算法比插入演算法簡單得多。我們只有兩種情況，每種情況只需要一個語句。

**演算法 11.5 在鏈結串列中刪除節點**
\`\`\`
演算法：DeleteLinkedList (list, target)
目的：在搜尋列表找到正確節點後刪除鏈結串列中的節點
前置條件：鏈結串列和要刪除的目標資料
後置條件：無
回傳：新的鏈結串列
{
    // 給定目標並回傳 pre, cur 和 flag
    searchlinkedlist (list, target, pre, cur, flag)
    if (flag = false)
    {
        return list // 未找到要刪除的節點
    }
    if (pre = null) // 刪除第一個節點
    {
        list ← (*cur).link
        return list
    }
    (*pre).link ← (*cur).link // 刪除其他節點
    return list
}
\`\`\`

**檢索節點**
檢索意味著隨機存取節點以檢查或複製節點中包含的資料。在檢索之前，需要搜尋鏈結串列。如果找到資料項目，則檢索它，否則中止該過程。檢索僅使用 *cur* 指標，該指標指向搜尋演算法找到的節點。演算法 11.6 顯示了檢索節點中資料的偽代碼。該演算法比插入或刪除演算法簡單得多。

**演算法 11.6 在鏈結串列中檢索節點**
\`\`\`
演算法：RetrieveLinkedList (list, target)
目的：在搜尋列表找到正確節點後檢索節點中的資料
前置條件：鏈結串列（頭指標）和目標（要檢索的資料）
後置條件：無
回傳：回傳檢索到的資料
{
    searchlinkedlist (list, target, pre, cur, flag)
    if (flag = false) // 未找到節點
    {
        return error
    }
    return (*cur).data
}
\`\`\`

**遍歷鏈結串列**
要遍歷列表，我們需要一個「行走」指標，這是一個在處理每個元素時從一個節點移動到另一個節點的指標。我們通過將行走指標設定為列表中的第一個節點來開始遍歷。然後，使用迴圈，我們繼續直到處理完所有資料。迴圈的每次迭代處理當前節點，然後將行走指標推進到下一個節點。當處理完最後一個節點時，行走指標變為空，迴圈終止（圖 11.20）。

演算法 11.7 顯示了遍歷鏈結串列的偽代碼。

**演算法 11.7 遍歷鏈結串列**
\`\`\`
演算法：TraverseLinkedList (list)
目的：遍歷鏈結串列並處理每個資料項目
前置條件：鏈結串列（頭指標）
後置條件：無
回傳：列表
{
    walker ← list
    while (walker ≠ null)
    {
        Process (*walker).data
        walker ← (*walker).link
    }
    return list
}
\`\`\`

### 11.3.4 鏈結串列的應用
鏈結串列是一種非常有效的資料結構，用於儲存將經歷許多插入和刪除的資料。鏈結串列是一種動態資料結構，列表可以從沒有節點開始，然後隨著需要新節點而增長。可以輕鬆刪除節點而無需移動其他節點，而在陣列中則需要這樣做。例如，鏈結串列可用於保存學校學生的記錄。每個季度或學期，新學生入學，一些學生離開或畢業。

鏈結串列可以無限增長，也可以縮小到空列表。開銷是為每個節點保留一個額外的欄位。然而，對於必須經常搜尋的資料，鏈結串列不是一個好的候選者。這似乎是一個兩難境地，因為每次刪除或插入都需要搜尋。我們將看到，下一章討論的一些抽象資料型別具有陣列搜尋的優點和鏈結串列插入和刪除的優點。

**如果需要大量的插入和刪除，鏈結串列是一個合適的結構，但搜尋鏈結串列比搜尋陣列慢。**

## 11.4 章末材料

### 11.4.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Gilberg, R. and Forouzan, B. *Data Structures – A Pseudocode Approach with C*, Boston, MA: Course Technology, 2005
- Goodrich, M. and Tamassia, R. *Data Structures and Algorithms in Java*, New York: Wiley, 2005
- Neapolitan, R. and Naimipour, K. *Foundations of Algorithms Using C++ Pseudocode*, Sudbury, MA: Jones and Bartlett, 2004
- Main, M. and Savitch, W. *Data Structures and Other Objects Using C++*, Reading, MA: Addison-Wesley, 2004
- Standish, T. *Data Structures, Algorithms, and Software Principles*, Reading, MA: Addison-Wesley, 1994

### 11.4.2 關鍵詞
- 陣列 (array)
- 以行為主儲存 (column-major storage)
- 資料結構 (data structure)
- 欄位 (field)
- 索引 (index)
- 連結 (link)
- 鏈結串列 (linked list)
- 多維陣列 (multidimensional array)
- 節點 (node)
- 空指標 (null pointer)
- 一維陣列 (one-dimensional array)
- 指標 (pointer)
- 記錄 (record)
- 檢索 (retrieval)
- 以列為主儲存 (row-major storage)
- 搜尋 (searching)
- 二維陣列 (two-dimensional array)
- 字串 (string)

### 11.4.3 摘要
- 資料結構使用一組相關的變數，這些變數可以單獨存取，也可以作為一個整體存取。換句話說，資料結構代表一組共享特定關係的資料項目。我們在本章討論了三種資料結構：陣列、記錄和鏈結串列。
- 陣列是通常具有相同資料類型的元素的序列集合。我們使用索引來引用陣列的元素。在陣列中，我們有兩種類型的識別碼：陣列的名稱和每個單獨元素的名稱。
- 許多應用程式要求資料儲存在多個維度中。一個常見的例子是表格，它是一個由列和行組成的陣列。二維陣列可以使用以列為主或以行為主的儲存方式儲存在記憶體中。第一種更常見。
- 陣列作為結構的常見操作是搜尋、插入、刪除、檢索和遍歷。在刪除和插入次數較少但需要大量搜尋和檢索操作的應用中，陣列是一個合適的結構。陣列通常是一個靜態資料結構，因此當資料項目數量固定時更合適。
- 記錄是相關元素的集合，可能具有不同的類型，擁有單一名稱。記錄中的每個元素稱為欄位。欄位是記錄中具有意義的命名資料的最小元素。
- 字串是一組字元，在某些語言中被視為陣列，在其他語言中被視為一種類型。
- 鏈結串列是資料的集合，其中每個元素包含下一個元素的位置；也就是說，每個元素包含兩個部分：資料和連結。資料部分保存有用的資訊：要處理的資料。連結用於將資料鏈接在一起。
- 為陣列定義的相同操作可以應用於鏈結串列。鏈結串列是一種非常有效的結構，適用於將經歷許多插入和刪除的資料。鏈結串列是一種動態資料結構，列表可以從沒有節點開始，並隨著需要新節點而增長。

## 11.5 練習題

### 11.5.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 11.5.2 複習問題
1. 說出三種資料結構的名稱。
2. 陣列中的元素與記錄中的元素有何不同？
3. 陣列中的元素與鏈結串列中的元素有何不同？
4. 為什麼我們應該使用索引而不是下標來識別陣列元素？
5. 陣列的元素如何儲存在記憶體中？
6. 記錄中欄位的定義是什麼？
7. 鏈結串列中節點的欄位是什麼？
8. 鏈結串列中指標的功能是什麼？
9. 你如何指向鏈結串列中的第一個節點？
10. 鏈結串列中最後一個節點的連結欄位的值是什麼？

### 11.5.3 問題
1. 有兩個陣列 A 和 B，每個都有 10 個整數。編寫一個演算法，測試陣列 A 的每個元素是否等於陣列 B 中的對應元素。
2. 編寫一個演算法，反轉陣列的元素，使最後一個元素成為第一個，倒數第二個成為第二個，依此類推。
3. 編寫一個演算法來列印 R 列 C 行的二維陣列的內容。
4. 編寫一個演算法，對 N 個元素的陣列應用循序搜尋。
5. 編寫一個演算法，對 N 個元素的陣列應用二元搜尋。
6. 編寫一個演算法，將一個元素插入已排序的陣列中。該演算法必須呼叫搜尋演算法以找到插入位置。
7. 編寫一個演算法，刪除已排序陣列中的一個元素。該演算法必須呼叫搜尋演算法以找到插入位置。
8. 編寫一個演算法，將陣列的每個元素乘以一個常數。
9. 編寫一個演算法，將一個分數 (Fr1) 加到另一個分數 (Fr2) 上。
10. 編寫一個演算法，從另一個分數 (Fr2) 中減去一個分數 (Fr1)。
11. 編寫一個演算法，將一個分數 (Fr1) 乘以另一個分數 (Fr2)。
12. 編寫一個演算法，將一個分數 (Fr1) 除以另一個分數 (Fr2)。
13. 畫一個圖表來顯示一個鏈結串列，其中資料部分是一個具有三個欄位的學生記錄：id、name 和 grade。
14. 說明鏈結串列的刪除演算法（11.3.3 節中的演算法 11.4）如何刪除鏈結串列中唯一的節點。
15. 說明鏈結串列的插入演算法（11.3.3 節中的演算法 11.3）如何將節點添加到空鏈結串列中。
16. 說明我們如何使用插入演算法（11.3.3 節中的演算法 11.3）從頭開始建立一個鏈結串列。
17. 編寫一個演算法來找出數字鏈結串列中數字的平均值。
18. 說明如果我們對圖 11.9 中的鏈結串列應用以下語句會發生什麼。
   \`scores ← (*scores).link\`
19. 說明如果我們對圖 11.13 中的鏈結串列應用以下語句會發生什麼。
   \`cur ← (*cur).link\` 和 \`pre ← (*pre).link\`
`
};
    