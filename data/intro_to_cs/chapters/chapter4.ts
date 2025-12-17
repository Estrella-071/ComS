

export const chapter4Content = {
  en: `
# Chapter 4: Operations on Data

In Chapter 3 we showed how to store different types of data in a computer. In this chapter, we show how to operate on data stored in a computer. Operations on data can be divided into three broad categories: logic operations, shift operations, and arithmetic operations.

## Objectives
After studying this chapter, the student should be able to:
- List the three categories of operations performed on data.
- Perform unary and binary logic operations on bit patterns.
- Distinguish between logic shift operations and arithmetic shift operations.
- Perform logic shift operations on bit patterns.
- Perform arithmetic shift operations on integers stored in two’s complement format.
- Perform addition and subtraction on integers when they are stored in two’s complement format.
- Perform addition and subtraction on integers when they are stored in sign-and-magnitude format.
- Perform addition and subtraction operations on reals when they are stored in floating-point format.
- Understand some applications of logical and shift operations such as setting, unsetting, and flipping specific bits.

## 4.1 LOGIC OPERATIONS
In Chapter 3 we discussed the fact that data inside a computer is stored as patterns of bits. Logic operations refer to those operations that apply the same basic operation on individual bits of a pattern, or on two corresponding bits in two patterns. This means that we can define logic operations at the bit level and at the pattern level. A logic operation at the pattern level is $n$ logic operations, of the same type, at the bit level where $n$ is the number of bits in the pattern.

### 4.1.1 Logic operations at bit level
A bit can take one of the two values: 0 or 1. If we interpret 0 as the value *false* and 1 as the value *true*, we can apply the operations defined in **Boolean algebra** to manipulate bits. Boolean algebra, named in honor of George Boole, belongs to a special field of mathematics called *logic*. Boolean algebra and its application to building logic circuits in computers are briefly discussed in Appendix E. In this section, we show briefly four bit-level operations that are used to manipulate bits: NOT, AND, OR, and XOR.

Figure 4.1 shows the symbols for these four bit-level operators and their truth tables. A **truth table** defines the values of output for each possible input or inputs. Note that the output of each operator is always one bit, but the input can be one or two bits.

**NOT**
The **NOT operator** is a unary operator: it takes only one input. The output bit is the complement of the input. If the input is 0, the output is 1, if the input is 1, the output is 0. In other words, the NOT operator flips its input. The truth table of the NOT operator has only two rows because the single input can be either 0 or 1: two possibilities.

| x | NOT x |
| :--- | :--- |
| 0 | 1 |
| 1 | 0 |

**AND**
The **AND operator** is a binary operator: it takes two inputs. The output bit is 1 if both inputs are 1s and the output is 0 in the other three cases. The truth table of the AND operator has four rows because, with two inputs, there are four possible input combinations.

| x | y | x AND y |
| :--- | :--- | :--- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**A property**
One interesting point about the AND operator is that if a bit in one input is 0, we do not have to check the corresponding bit in the other input: we can quickly conclude that the result is 0. We use this property when we discuss the application of this operator in relation to a bit pattern:
For x = 0 or 1: x AND 0 → 0 and 0 AND x → 0

**OR**
The **OR operator** is a also a binary operator: it takes two inputs. The output bit is 0 if both inputs are 0s and the output is 1 in the other three cases. The truth table of the OR operator has also four rows. The OR operator is sometimes called the *inclusive-or operator* because the output is 1 not only when one of the inputs is 1, but also when both inputs are 1s. This is in contrast to the operator we introduce next.

| x | y | x OR y |
| :--- | :--- | :--- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**A property**
One interesting point about the OR operator is that if a bit in one input is 1, we do not have to check the corresponding bit in the other input: we can quickly conclude that the result is 1. We use this property when we discuss the application of this operator in relation to a bit pattern:
For x = 0 or 1: x OR 1 → 1 and 1 OR x → 1

**XOR**
The **XOR operator** (pronounced ‘exclusive-or’) is also a binary operator like the OR operator, with only one difference: the output is 0 if both inputs are 1s. We can look at this operator in another way: the output is 0 when both inputs are the same, and the output is 1 when the inputs are different.

| x | y | x XOR y |
| :--- | :--- | :--- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

> **Example 4.1**
> In English we use the conjunction ‘or’ sometimes to mean an inclusive-or, and sometimes to mean an exclusive-or.
> a. The sentence ‘I wish to have a car *or* a house’ uses ‘or’ in the inclusive sense—I wish a car, a house, or both.
> b. The sentence ‘Today is either Monday *or* Tuesday’ uses ‘or’ in the exclusive sense—today is either Monday or Tuesday, but it cannot be both.

> **Example 4.2**
> The XOR operator is not actually a new operator. We can always simulate it using the other three operators. The following two expressions are equivalent:
> x XOR y ↔ [x AND (NOT y)] OR [(NOT x) AND y]
> The equivalence can be proved if we make the truth table for both.

**A property**
A property of XOR is that if a bit in one input is 1, the result is the complement of the corresponding bit in the other input. We use this property when we discuss the application of this operator in relation to a bit pattern:
For x = 0 or 1: 1 XOR x → NOT x and x XOR 1 → NOT x

### 4.1.2 Logic operations at pattern level
The same four operators (NOT, AND, OR, and XOR) can be applied to an $n$-bit pattern. The effect is the same as applying each operator to each individual bit for NOT and to each corresponding pair of bits for other three operators. Figure 4.2 shows these four operators with input and output patterns.

> **Example 4.3**
> Use the NOT operator on the bit pattern 10011000.
>
> **Solution**
> The solution is shown below. Note that the NOT operator changes every 0 to 1 and every 1 to 0:
> Input: 1 0 0 1 1 0 0 0
> NOT: 0 1 1 0 0 1 1 1

> **Example 4.4**
> Use the AND operator on the bit patterns 10011000 and 00101010.
>
> **Solution**
> The solution is shown below. Note that only one bit in the output is 1, where both corresponding inputs are 1s:
> Input 1: 1 0 0 1 1 0 0 0
> Input 2: 0 0 1 0 1 0 1 0
> AND: 0 0 0 0 1 0 0 0

> **Example 4.5**
> Use the OR operator on the bit patterns 10011001 and 00101110.
>
> **Solution**
> The solution is shown below. Note that only one bit in the output is 0, where both corresponding inputs are 0s:
> Input 1: 1 0 0 1 1 0 0 1
> Input 2: 0 0 1 0 1 1 1 0
> OR: 1 0 1 1 1 1 1 1

> **Example 4.6**
> Use the XOR operator on the bit patterns 10011001 and 00101110.
>
> **Solution**
> The solution is shown below. Compare the output in this example with the one in Example 4.5. The only difference is that when the two inputs are 1s, the result is 0 (the effect of exclusion):
> Input 1: 1 0 0 1 1 0 0 1
> Input 2: 0 0 1 0 1 1 1 0
> XOR: 1 0 1 1 0 1 1 1

**Applications**
Four logic operations can be used to modify a bit pattern.

**Complementing**
The only application of the NOT operator is to complement the whole pattern. Applying this operator to a pattern changes every 0 to 1 and every 1 to 0. This is sometimes referred to as a one’s complement operation. Example 4.3 shows the effect of complementing.

**Unsetting specific bits**
One of the applications of the AND operator is to unset (force to 0) specific bits in a bit pattern. The second input in this case is called a **mask**. The 0-bits in the mask unset the corresponding bits in the first input: the 1-bits in the mask leave the corresponding bits in the first input unchanged. This is due to the property we mentioned for the AND operator: if one of the inputs is 0, the output is 0 no matter what the other input is. Unsetting the bits in a pattern can have many applications. For example, if an image is using only one bit per pixel (a black and white image), then we can make a specific pixel black using a mask and the AND operator.

> **Example 4.7**
> Use a mask to unset (clear) the five leftmost bits of a pattern. Test the mask with the pattern 10100110.
>
> **Solution**
> The mask is 00000111. The result of applying the mask is:
> Input: 1 0 1 0 0 1 1 0
> Mask: 0 0 0 0 0 1 1 1
> AND: 0 0 0 0 0 1 1 0
> Note that the three rightmost bits remain unchanged, while the five leftmost bits are unset (changed to 0) no matter what their previous values.

**Setting specific bits**
One of the applications of the OR operator is to set (force to 1) specific bits in a bit pattern. Again we can use a mask, but a different one. The 1-bits in the mask set the corresponding bits in the first input, and the 0-bits in the mask leave the corresponding bits in the first input unchanged. This is due to the property we mentioned for the OR operator: if one of the inputs is 1, the output is 1 no matter what the other input is. Setting the bits in a pattern has many applications. For example, if an image is using only one bit per pixel (a black and white image), then we can make a specific pixel white using a mask and the OR operator.

> **Example 4.8**
> Use a mask to set the five leftmost bits of a pattern. Test the mask with the pattern 10100110.
>
> **Solution**
> The mask is 11111000. The result of applying the mask is:
> Input: 1 0 1 0 0 1 1 0
> Mask: 1 1 1 1 1 0 0 0
> OR: 1 1 1 1 1 1 1 0

**Flipping specific bits**
One of the applications of the XOR operator is to flip (complement) specific bits in a bit pattern. Again we can use a mask, but a different one. The 1-bits in the mask flip the corresponding bits in the first input, and the 0-bits in the mask leave the corresponding bits in the first input unchanged. This is due to the property we mentioned for the XOR operator: if one of the inputs is 1, the output is the complement of the corresponding bit. Note the difference between the NOT operator and the XOR operator. The NOT operator complements all the bits in the input, while the XOR operator complements only the specific bits in the first input as defined by the mask.

> **Example 4.9**
> Use a mask to flip the five leftmost bits of a pattern. Test the mask with the pattern 10100110.
>
> **Solution**
> The mask is 11111000. The result of applying the mask is:
> Input: 1 0 1 0 0 1 1 0
> Mask: 1 1 1 1 1 0 0 0
> XOR: 0 1 0 1 1 1 1 0

## 4.2 SHIFT OPERATIONS
Shift operations move the bits in a pattern, changing the positions of the bits. They can move bits to the left or to the right. We can divide shift operations into two categories: logical shift operations and arithmetic shift operations.

### 4.2.1 Logical shift operations
A **logical shift operation** is applied to a pattern that does not represent a signed number. The reason is that these shift operation may change the sign of the number that is defined by the leftmost bit in the pattern. We distinguish two types of logical shift operations, as described below.

**Simple shift**
A **simple right shift** operation shifts each bit one position to the right. In an $n$-bit pattern, the rightmost bit is lost and a 0 fills the leftmost bit. A **simple left shift** operation shifts each bit one position to the left. In an $n$-bit pattern, the leftmost bit is lost and a 0 fills the rightmost bit. Figure 4.3 shows the simple right shift and simple left shift operations for an 8-bit pattern.

> **Example 4.10**
> Use a simple left shift operation on the bit pattern 10011000.
>
> **Solution**
> The solution is shown below. The leftmost bit is lost and a 0 is inserted as the rightmost bit:
> Original: 1 0 0 1 1 0 0 0
> After shift: 0 0 1 1 0 0 0 0

**Circular shift**
A **circular shift operation** (or **rotate operation**) shifts bits, but no bit is lost or added. A **circular right shift** (or **right rotate**) shifts each bit one position to the right. The rightmost bit is circulated and becomes the leftmost bit. A **circular left shift** (or **left rotate**) shifts each bit one position to the left. The leftmost bit circulates and become the rightmost bit. Figure 4.4 shows the circular shift left and circular shift right operation.

> **Example 4.11**
> Use a circular left shift operation on the bit pattern 10011000.
>
> **Solution**
> The solution is shown below. The leftmost bit is circulated and becomes the rightmost bit:
> Original: 1 0 0 1 1 0 0 0
> After shift: 0 0 1 1 0 0 0 1

> **Example 4.12**
> Combining logic operations and logical shift operations gives us some tools for manipulating bit patterns. Assume that we have a pattern and we need to use the third bit (from the right) of this pattern in a decision-making process. We want to know if this particular bit is 0 or 1. The following shows how we can find out:
> Original: h g f e d c b a
> One right shift: 0 h g f e d c b
> Two right shifts: 0 0 h g f e d c
> Mask: 0 0 0 0 0 0 0 1
> AND result: 0 0 0 0 0 0 0 c
> We shift the pattern two bits to the right so that the target bit moves to the rightmost position. The result is then ANDed with a mask which has one 1 at the rightmost position. The result is a pattern with seven 0s and the target bit at the rightmost position. We can then test the result: if it is an unsigned integer 1, the target bit was 1, whereas if the result is an unsigned integer 0, the target bit was 0.

**Arithmetic shift operations**
**Arithmetic shift operations** assume that the bit pattern is a signed integer in two’s complement format. **Arithmetic right shift** is used to divide an integer by two, while **arithmetic left shift** is used to multiply an integer by two. These operations should not change the sign (leftmost) bit. An arithmetic right shift retains the sign bit, but also copies it into the next right bit, so that the sign is preserved. An arithmetic left shift discards the sign bit and accepts the bit to the left of the sign bit as the sign. If the new sign bit is the same as the previous one, the operation is successful, otherwise an overflow or underflow has occurred and the result is not valid. Figure 4.5 shows these two operations.

> **Example 4.13**
> Use an arithmetic right shift operation on the bit pattern 10011001. The pattern is an integer in two’s complement format.
>
> **Solution**
> The solution is shown below. The leftmost bit is retained and also copied to its right neighbor bit. The rightmost bit is lost:
> Original: 1 0 0 1 1 0 0 1
> After shift: 1 1 0 0 1 1 0 0
> The original number was –103 and the new number is –52, which is the result of dividing –103 by 2 truncated to the smaller integer.

> **Example 4.14**
> Use an arithmetic left shift operation on the bit pattern 11011001. The pattern is an integer in two’s complement format.
>
> **Solution**
> The solution is shown below. The leftmost bit is lost and a 0 is inserted as the rightmost bit:
> Original: 1 1 0 1 1 0 0 1
> After shift: 1 0 1 1 0 0 1 0
> The original number was –39 and the new number is –78. The original number is multiplied by two. The operation is valid because no underflow occurred.

> **Example 4.15**
> Use an arithmetic left shift operation on the bit pattern 01111111. The pattern is an integer in two’s complement format.
>
> **Solution**
> The solution is shown below. The leftmost bit is lost and a 0 is inserted as the rightmost bit:
> Original: 0 1 1 1 1 1 1 1
> After shift: 1 1 1 1 1 1 1 0
> The original number was 127 and the new number is –2. Here the result is not valid because an overflow has occurred. The expected answer 127 × 2 = 254 cannot be represented by an 8-bit pattern.

## 4.3 ARITHMETIC OPERATIONS
**Arithmetic operations** involve adding, subtracting, multiplying, and dividing. We can apply these operations to integers and floating-point numbers.

### 4.3.1 Arithmetic operations on integers
All arithmetic operations such as addition, subtraction, multiplication, and division can be applied to integers. Although multiplication (division) of integers can be implemented using repeated addition (subtraction), the procedure is not efficient. There are more efficient procedures for multiplication and division, such as Booth procedures, but these are beyond the scope of this book. For this reason, we only discuss addition and subtraction of integers here.

**Addition and subtraction for two’s complement integers**
We first discuss addition and subtraction for integers in two’s complement representation, because it is more common. As we discussed in Chapter 3, integers are normally stored in two’s complement format. One of the advantages of two’s complement representation is that there is no difference between addition and subtraction. When the subtraction operation is encountered, the computer simply changes it to an addition operation, but makes two’s complement of the second number. In other words:
$A - B \leftrightarrow A + (\bar{B} + 1)$ where $(\bar{B} + 1)$ means the two’s complement of B.

This means that we only need to discuss addition. Adding numbers in two’s complement is like adding the numbers in decimal: we add column by column, and if there is a carry, it is added to the next column. However, the carry produced from the last column is discarded.
We should remember that we add integers column by column. In each column, we have either two bits to add if there is no carry from the previous column, or three bits to add if there is a carry from the previous column.
The procedure is as follows:
1. If the operation is subtraction, we take the two’s complement of the second integer. Otherwise, we move to the next step.
2. We add the two integers.

> **Example 4.16**
> Two integers A and B are stored in two’s complement format. Show how B is added to A:
> A = $(00010001)_2$ B = $(00010110)_2$
>
> **Solution**
> The operation is adding. A is added to B and the result is stored in R:
> A: 0 0 0 1 0 0 0 1
> B: 0 0 0 1 0 1 1 0
> R: 0 0 1 0 0 1 1 1
> We check the result in decimal: (+17) + (+22) = (+39).

> **Example 4.17**
> Two integers A and B are stored in two’s complement format. Show how B is added to A:
> A = $(00011000)_2$ B = $(11101111)_2$
>
> **Solution**
> The operation is adding. A is added to B and the result is stored in R. Note that the last carry is discarded because the size of the memory is only 8 bits:
> A: 0 0 0 1 1 0 0 0
> B: 1 1 1 0 1 1 1 1
> R: 0 0 0 0 0 1 1 1
> Checking the result in decimal, (+24) + (–17) = (+7).

> **Example 4.18**
> Two integers A and B are stored in two’s complement format. Show how B is subtracted from A:
> A = $(00011000)_2$ B = $(11101111)_2$
>
> **Solution**
> The operation is subtracting. A is added to $(\bar{B} + 1)$ and the result is stored in R:
> $(\bar{B} + 1) = 00010001$
> A: 0 0 0 1 1 0 0 0
> $(\bar{B} + 1)$: 0 0 0 1 0 0 0 1
> R: 0 0 1 0 1 0 0 1
> Checking the result in decimal, (+24) – (–17) = (+41).

> **Example 4.19**
> Two integers A and B are stored in two’s complement format. Show how B is subtracted from A:
> A = $(11011101)_2$ B = $(00010100)_2$
>
> **Solution**
> The operation is subtracting. A is added to $(\bar{B} + 1)$ and the result is stored in R:
> $(\bar{B} + 1) = 11101100$
> A: 1 1 0 1 1 1 0 1
> $(\bar{B} + 1)$: 1 1 1 0 1 1 0 0
> R: 1 1 0 0 1 0 0 1
> Checking the result in decimal, (–35) – (+20) = (–55). Note that the last carry is discarded.

> **Example 4.20**
> Two integers A and B are stored in two’s complement format. Show how B is added to A:
> A = $(01111111)_2$ B = $(00000011)_2$
>
> **Solution**
> The operation is adding. A is added to B and the result is stored in R:
> A: 0 1 1 1 1 1 1 1
> B: 0 0 0 0 0 0 1 1
> R: 1 0 0 0 0 0 1 0
> We expect the result to be 127 + 3 = 130, but the answer is −126. The error is due to overflow, because the expected answer (+130) is not in the range −128 to +127.
> When we do arithmetic operations on numbers in a computer, we should remember that each number and the result should be in the range defined by the bit allocation.

**Addition or subtraction for sign-and-magnitude integers**
Addition or subtraction for integers in sign-and-magnitude representation looks very complex. We have four different combinations of signs (two signs, each of two values) for addition, and four different conditions for subtraction. This means that we need to consider eight different situations. For those interested readers, we describe these in more detail in Appendix I.

### 4.3.2 Arithmetic operations on reals
All arithmetic operations such as addition, subtraction, multiplication, and division can be applied to reals stored in floating-point format. Multiplication of two reals involves multiplication of two integers in sign-and-magnitude representation. Division of two reals involves division of two integers in sign-and-magnitude representations. Since we did not discuss the multiplication or division of integers in sign-and-magnitude representation, we will not discuss the multiplication and division of reals, and only show addition and subtractions for reals in Appendix J.

## 4.4 END-CHAPTER MATERIALS
### 4.4.1 Recommended Reading
For more details about the subjects discussed in this chapter, the following books are recommended:
- Mano, M. *Computer System Architecture*, Upper Saddle River, NJ: Prentice-Hall, 1993
- Null, L. and Lobur, J. *Computer Organization and Architecture*, Sudbury, MA: Jones and Bartlett, 2003
- Stalling, W. *Computer Organization and Architecture*, Upper Saddle River, NJ: Prentice-Hall, 2000

### 4.4.2 Key terms
- AND operation
- arithmetic operation
- arithmetic shift operation
- Boolean algebra
- circular shift operation
- logical shift operation
- mask
- NOT operation
- OR operation
- truth table
- XOR operation

### 4.4.3 Summary
- Operations on data can be divided into three broad categories: logic operations, shift operations, and arithmetic operations. Logic operations refer to those operations that apply the same basic operation to individual bits of a pattern or to two corresponding bits in two patterns. Shift operations move the bits in the pattern. Arithmetic operations involve adding, subtracting, multiplying, and dividing.
- The four logic operators discussed in this chapter (NOT, AND, OR, and XOR) can be used at the bit level or the pattern level. The NOT operator is a unary operator, while the AND, OR, and XOR operators are binary operators.
- The only application of the NOT operator is to complement the whole pattern. One of the applications of the AND operator is to unset (force to 0) specific bits in a bit pattern. One of the applications of the OR operator is to set (force to 1) specific bits in a bit pattern. One of the applications of the XOR operator is to flip (complement) specific bits in a bit pattern.
- Shift operations move the bits in the pattern: they change the positions of the bits. We can divide shift operations into two categories: logical shift operations and arithmetic shift operations. A logical shift operation is applied to a pattern that does not represent a signed number. Arithmetic shift operations assume that the bit pattern is a signed integer in two’s complement format.
- All arithmetic operations such as addition, subtraction, multiplication, and division can be applied to integers. Integers are normally stored in two’s complement format. One of the advantages of two’s complement representation is that there is no difference between addition and subtraction. When the subtraction operation is encountered, the computer simply changes it to an addition operation, but forms the two’s complement of the second number. Addition and subtraction for integers in sign-and-magnitude representation looks very complex. We have eight situations to consider.
- All arithmetic operations such as addition, subtraction, multiplication, and division can be applied to reals stored in floating-point format. Addition and subtraction of real numbers stored in floating-point numbers is reduced to addition and subtraction of two integers stored in sign-and-magnitude after the alignment of decimal points.

## 4.5 PRACTICE SET
### 4.5.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 4.5.2 Review questions
1. What is the difference between an arithmetic operation and a logical operation?
2. What happens to the carry from the leftmost column in the addition of integers in two’s complement format?
3. Can n, the bit allocation, equal 1? Why, or why not?
4. Define the term overflow.
5. In the addition of floating-point numbers, how do we adjust the representation of numbers with different exponents?
6. What is the difference between a unary operation and a binary operation?
7. Name the logical binary operations.
8. What is a truth table?
9. What does the NOT operator do?
10. When is the result of an AND operator true?
11. When is the result of an OR operator true?
12. When is the result of an XOR operator true?
13. Mention an important property of the AND operator discussed in this chapter.
14. Mention an important property of the OR operator discussed in this chapter.
15. Mention an important property of the XOR operator discussed in this chapter.
16. What binary operation can be used to set bits? What bit pattern should the mask have?
17. What binary operation can be used to unset bits? What bit pattern should the mask have?
18. What binary operation can be used to flip bits? What bit pattern should the mask have?
19. What is the difference between simple and arithmetic shifts?

### 4.5.3 Problems
1. Show the result of the following operations:
    a. NOT (99)16
    b. NOT (FF)16
    c. NOT (00)16
    d. NOT (01)16
2. Show the result of the following operations:
    a. (99)16 AND (99)16
    b. (99)16 AND (00)16
    c. (99)16 AND (FF)16
    d. (FF)16 AND (FF)16
3. Show the result of the following operations:
    a. (99)16 OR (99)16
    b. (99)16 OR (00)16
    c. (99)16 OR (FF)16
    d. (FF)16 OR (FF)16
4. Show the result of the following operations:
    a. NOT [(99)16 OR (99)16)]
    b. (99)16 OR [NOT (00)16]
    c. [(99)16 AND (33)16)] OR [(00)16 AND (FF)16]
    d. (99)16 OR (33)16 AND [(00)16 OR (FF)16]
5. We need to unset (force to 0) the four leftmost bits of a pattern. Show the mask and the operation.
6. We need to set (force to 1) the four rightmost bits of a pattern. Show the mask and the operation.
7. We need to flip the three rightmost and the two leftmost bits of a pattern. Show the mask and the operation.
8. We need to unset the three leftmost bits and set the two rightmost bits of a pattern. Show the masks and operations.
9. Use the shift operation to divide an integer by 4.
10. Use the shift operation to multiply an integer by 8.
11. Use a combination of logical and shift operations to extract the fourth and fifth bits from the left of an unsigned integer.
12. Using an 8-bit allocation, first convert each of the following integers to two’s complement, do the operation, and then convert the result to decimal.
    a. 19 + 23
    b. 19 − 23
    c. −19 + 23
    d. −19 − 23
13. Using a 16-bit allocation, first convert each of the following numbers to two’s complement, do the operation, and then convert the result to decimal.
    a. 161 + 1023
    b. 161 − 1023
    c. −161 + 1023
    d. −161 − 1023
14. Which of the following operations creates an overflow if the numbers and the result are represented in 8-bit two’s complement representation?
    a. 11000010 + 00111111
    b. 00000010 + 00111111
    c. 11000010 + 11111111
    d. 00000010 + 11111111
15. Without actually doing the calculation, can we tell which of the following creates an overflow if the numbers and the result are in 8-bit two’s complement representation?
    a. 32 + 105
    b. 32 − 105
    c. −32 + 105
    d. −32 − 105
16. Show the result of the following operations assuming that the numbers are stored in 16-bit two’s complement representation. Show the result in hexadecimal notation.
    a. (012A)16 + (0E27)16
    b. (712A)16 + (9E00)16
    c. (8011)16 + (0001)16
    d. (E12A)16 + (9E27)16
17. Using an 8-bit allocation, first convert each of the following numbers to sign-and-magnitude representation, do the operation, and then convert the result to decimal.
    a. 19 + 23
    b. 19 − 23
    c. −19 + 23
    d. −19 − 23
18. Show the result of the following floating-point operations using IEEE_127—see Chapter 3.
    a. 34.75 + 23.125
    b. −12.625 + 451.00
    c. 33.1875 − 0.4375
    d. −344.3125 − 123.5625
19. In which of the following situations does an overflow never occur? Justify the answer.
    a. Adding two positive integers.
    b. Adding one positive integer to a negative integer.
    c. Subtracting one positive integer from a negative integer.
    d. Subtracting two negative integers.
20. What is the result of adding an integer to its one’s complement?
21. What is the result of adding an integer to its two’s complement?
`,
  zh: `
# 第四章：資料運算

在第三章中，我們展示了如何在電腦中儲存不同類型的資料。在本章中，我們將展示如何對儲存在電腦中的資料進行運算。資料的運算可以分為三大類：邏輯運算、移位運算和算術運算。

## 學習目標
學完本章後，學生應能：
- 列出對資料執行的三類運算。
- 對位元模式執行一元和二元邏輯運算。
- 區分邏輯移位運算和算術移位運算。
- 對位元模式執行邏輯移位運算。
- 對以二的補數格式儲存的整數執行算術移位運算。
- 對以二的補數格式儲存的整數執行加法和減法。
- 對以符號與數值格式儲存的整數執行加法和減法。
- 對以浮點數格式儲存的實數執行加法和減法運算。
- 理解邏輯和移位運算的一些應用，例如設定、取消設定和翻轉特定位元。

## 4.1 邏輯運算
在第三章中，我們討論了電腦內部的資料是以位元模式儲存的事實。邏輯運算指的是那些對模式中的單個位元，或對兩個模式中對應的位元應用相同的基本運算的操作。這意味著我們可以在位元層級和模式層級定義邏輯運算。模式層級的邏輯運算是在位元層級上進行 $n$ 次相同類型的邏輯運算，其中 $n$ 是模式中的位元數。

### 4.1.1 位元層級的邏輯運算
一個位元可以取兩個值之一：0 或 1。如果我們將 0 解釋為值*假 (false)*，將 1 解釋為值*真 (true)*，我們可以應用**布林代數**中定義的運算來操作位元。布林代數以喬治·布爾 (George Boole) 的名字命名，屬於數學的一個特殊領域，稱為*邏輯*。布林代數及其在構建電腦邏輯電路中的應用在附錄 E 中簡要討論。在本節中，我們簡要展示用於操作位元的四種位元層級運算：NOT、AND、OR 和 XOR。

圖 4.1 顯示了這四個位元層級運算子的符號及其真值表。**真值表**定義了每個可能輸入或輸入組合的輸出值。請注意，每個運算子的輸出總是一個位元，但輸入可以是一個或兩個位元。

**NOT**
**NOT 運算子**是一個一元運算子：它只接受一個輸入。輸出位元是輸入的補數。如果輸入是 0，輸出是 1，如果輸入是 1，輸出是 0。換句話說，NOT 運算子翻轉其輸入。NOT 運算子的真值表只有兩行，因為單個輸入只能是 0 或 1：兩種可能性。

| x | NOT x |
| :--- | :--- |
| 0 | 1 |
| 1 | 0 |

**AND**
**AND 運算子**是一個二元運算子：它接受兩個輸入。如果兩個輸入都是 1，則輸出位元為 1，在其他三種情況下輸出為 0。AND 運算子的真值表有四行，因為對於兩個輸入，有四種可能的輸入組合。

| x | y | x AND y |
| :--- | :--- | :--- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**一個屬性**
關於 AND 運算子的一個有趣點是，如果一個輸入中的位元是 0，我們不必檢查另一個輸入中的對應位元：我們可以快速得出結果是 0。當我們討論此運算子在位元模式中的應用時，我們會使用此屬性：
對於 x = 0 或 1：x AND 0 → 0 和 0 AND x → 0

**OR**
**OR 運算子**也是一個二元運算子：它接受兩個輸入。如果兩個輸入都是 0，則輸出位元為 0，在其他三種情況下輸出為 1。OR 運算子的真值表也有四行。OR 運算子有時稱為*包含或 (inclusive-or) 運算子*，因為不僅當其中一個輸入為 1 時輸出為 1，而且當兩個輸入都為 1 時輸出也為 1。這與我們接下來介紹的運算子形成對比。

| x | y | x OR y |
| :--- | :--- | :--- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**一個屬性**
關於 OR 運算子的一個有趣點是，如果一個輸入中的位元是 1，我們不必檢查另一個輸入中的對應位元：我們可以快速得出結果是 1。當我們討論此運算子在位元模式中的應用時，我們會使用此屬性：
對於 x = 0 或 1：x OR 1 → 1 和 1 OR x → 1

**XOR**
**XOR 運算子**（發音為「互斥或」）也是一個像 OR 運算子一樣的二元運算子，只有一個區別：如果兩個輸入都是 1，則輸出為 0。我們可以用另一種方式來看待這個運算子：當兩個輸入相同時輸出為 0，當輸入不同時輸出為 1。

| x | y | x XOR y |
| :--- | :--- | :--- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

> **範例 4.1**
> 在英語中，我們有時使用連接詞「或 (or)」來表示包含或，有時表示互斥或。
> a. 句子「我希望有一輛車*或*一棟房子」在包含意義上使用「或」——我希望有一輛車、一棟房子，或兩者兼有。
> b. 句子「今天是星期一*或*星期二」在互斥意義上使用「或」——今天是星期一或星期二，但不可能兩者都是。

> **範例 4.2**
> XOR 運算子實際上並不是一個新運算子。我們總是可以模擬它使用其他三個運算子。以下兩個表達式是等價的：
> x XOR y ↔ [x AND (NOT y)] OR [(NOT x) AND y]
> 如果我們為兩者製作真值表，就可以證明等價性。

**一個屬性**
XOR 的一個屬性是，如果一個輸入中的位元是 1，則結果是另一個輸入中對應位元的補數。當我們討論此運算子在位元模式中的應用時，我們會使用此屬性：
對於 x = 0 或 1：1 XOR x → NOT x 和 x XOR 1 → NOT x

### 4.1.2 模式層級的邏輯運算
同樣的四個運算子（NOT、AND、OR 和 XOR）可以應用於一個 $n$ 位元的模式。其效果與對每個單獨位元應用 NOT 運算子以及對其他三個運算子應用於每對應位元對是一樣的。圖 4.2 顯示了這四個具有輸入和輸出模式的運算子。

> **範例 4.3**
> 對位元模式 10011000 使用 NOT 運算子。
>
> **解答**
> 解答如下所示。請注意，NOT 運算子將每個 0 變為 1，每個 1 變為 0：
> 輸入：1 0 0 1 1 0 0 0
> NOT：0 1 1 0 0 1 1 1

> **範例 4.4**
> 對位元模式 10011000 和 00101010 使用 AND 運算子。
>
> **解答**
> 解答如下所示。請注意，輸出中只有一個位元是 1，其中兩個對應的輸入都是 1：
> 輸入 1：1 0 0 1 1 0 0 0
> 輸入 2：0 0 1 0 1 0 1 0
> AND：0 0 0 0 1 0 0 0

> **範例 4.5**
> 對位元模式 10011001 和 00101110 使用 OR 運算子。
>
> **解答**
> 解答如下所示。請注意，輸出中只有一個位元是 0，其中兩個對應的輸入都是 0：
> 輸入 1：1 0 0 1 1 0 0 1
> 輸入 2：0 0 1 0 1 1 1 0
> OR：1 0 1 1 1 1 1 1

> **範例 4.6**
> 對位元模式 10011001 和 00101110 使用 XOR 運算子。
>
> **解答**
> 解答如下所示。將此範例中的輸出與範例 4.5 中的輸出進行比較。唯一的區別是當兩個輸入都是 1 時，結果是 0（互斥的效果）：
> 輸入 1：1 0 0 1 1 0 0 1
> 輸入 2：0 0 1 0 1 1 1 0
> XOR：1 0 1 1 0 1 1 1

**應用**
四種邏輯運算可用於修改位元模式。

**補數運算**
NOT 運算子的唯一應用是對整個模式進行補數運算。對模式應用此運算子會將每個 0 變為 1，每個 1 變為 0。這有時被稱為一的補數運算。範例 4.3 顯示了補數運算的效果。

**取消設定特定位元**
AND 運算子的應用之一是取消設定（強制為 0）位元模式中的特定位元。在這種情況下，第二個輸入稱為**遮罩**。遮罩中的 0 位元取消設定第一個輸入中的對應位元：遮罩中的 1 位元保持第一個輸入中的對應位元不變。這是由於我們提到的 AND 運算子的屬性：如果其中一個輸入是 0，無論另一個輸入是什麼，輸出都是 0。取消設定模式中的位元可能有許多應用。例如，如果圖像每個像素僅使用一個位元（黑白圖像），那麼我們可以使用遮罩和 AND 運算子將特定像素變為黑色。

> **範例 4.7**
> 使用遮罩取消設定（清除）模式中最左邊的五個位元。使用模式 10100110 測試遮罩。
>
> **解答**
> 遮罩是 00000111。應用遮罩的結果是：
> 輸入：1 0 1 0 0 1 1 0
> 遮罩：0 0 0 0 0 1 1 1
> AND：0 0 0 0 0 1 1 0
> 請注意，最右邊的三個位元保持不變，而最左邊的五個位元被取消設定（變為 0），無論它們之前的值為何。

**設定特定位元**
OR 運算子的應用之一是設定（強制為 1）位元模式中的特定位元。我們再次可以使用遮罩，但使用不同的遮罩。遮罩中的 1 位元設定第一個輸入中的對應位元，遮罩中的 0 位元保持第一個輸入中的對應位元不變。這是由於我們提到的 OR 運算子的屬性：如果其中一個輸入是 1，無論另一個輸入是什麼，輸出都是 1。設定模式中的位元有許多應用。例如，如果圖像每個像素僅使用一個位元（黑白圖像），那麼我們可以使用遮罩和 OR 運算子將特定像素變為白色。

> **範例 4.8**
> 使用遮罩設定模式中最左邊的五個位元。使用模式 10100110 測試遮罩。
>
> **解答**
> 遮罩是 11111000。應用遮罩的結果是：
> 輸入：1 0 1 0 0 1 1 0
> 遮罩：1 1 1 1 1 0 0 0
> OR：1 1 1 1 1 1 1 0

**翻轉特定位元**
XOR 運算子的應用之一是翻轉（補數）位元模式中的特定位元。我們再次可以使用遮罩，但使用不同的遮罩。遮罩中的 1 位元翻轉第一個輸入中的對應位元，遮罩中的 0 位元保持第一個輸入中的對應位元不變。這是由於我們提到的 XOR 運算子的屬性：如果其中一個輸入是 1，輸出是對應位元的補數。請注意 NOT 運算子和 XOR 運算子之間的區別。NOT 運算子對輸入中的所有位元進行補數運算，而 XOR 運算子僅對遮罩定義的第一個輸入中的特定位元進行補數運算。

> **範例 4.9**
> 使用遮罩翻轉模式中最左邊的五個位元。使用模式 10100110 測試遮罩。
>
> **解答**
> 遮罩是 11111000。應用遮罩的結果是：
> 輸入：1 0 1 0 0 1 1 0
> 遮罩：1 1 1 1 1 0 0 0
> XOR：0 1 0 1 1 1 1 0

## 4.2 移位運算
移位運算移動模式中的位元，改變位元的位置。它們可以向左或向右移動位元。我們可以將移位運算分為兩大類：邏輯移位運算和算術移位運算。

### 4.2.1 邏輯移位運算
**邏輯移位運算**應用於不表示有符號數字的模式。原因是這些移位運算可能會改變由模式中最左邊位元定義的數字的符號。我們區分兩種類型的邏輯移位運算，如下所述。

**簡單移位**
**簡單右移**運算將每個位元向右移動一個位置。在 $n$ 位元模式中，最右邊的位元遺失，最左邊的位元填入 0。**簡單左移**運算將每個位元向左移動一個位置。在 $n$ 位元模式中，最左邊的位元遺失，最右邊的位元填入 0。圖 4.3 顯示了 8 位元模式的簡單右移和簡單左移運算。

> **範例 4.10**
> 對位元模式 10011000 使用簡單左移運算。
>
> **解答**
> 解答如下所示。最左邊的位元遺失，最右邊插入一個 0：
> 原始：1 0 0 1 1 0 0 0
> 移位後：0 0 1 1 0 0 0 0

**循環移位**
**循環移位運算**（或**旋轉運算**）移動位元，但沒有位元遺失或增加。**循環右移**（或**右旋**）將每個位元向右移動一個位置。最右邊的位元循環並成為最左邊的位元。**循環左移**（或**左旋**）將每個位元向左移動一個位置。最左邊的位元循環並成為最右邊的位元。圖 4.4 顯示了循環左移和循環右移運算。

> **範例 4.11**
> 對位元模式 10011000 使用循環左移運算。
>
> **解答**
> 解答如下所示。最左邊的位元循環並成為最右邊的位元：
> 原始：1 0 0 1 1 0 0 0
> 移位後：0 0 1 1 0 0 0 1

> **範例 4.12**
> 結合邏輯運算和邏輯移位運算為我們提供了一些操作位元模式的工具。假設我們有一個模式，我們需要在決策過程中使用該模式的第三個位元（從右邊數）。我們想知道這個特定位元是 0 還是 1。以下顯示了我們如何找出：
> 原始：h g f e d c b a
> 一次右移：0 h g f e d c b
> 兩次右移：0 0 h g f e d c
> 遮罩：0 0 0 0 0 0 0 1
> AND 結果：0 0 0 0 0 0 0 c
> 我們將模式向右移動兩個位元，使目標位元移動到最右邊的位置。然後將結果與最右邊位置為 1 的遮罩進行 AND 運算。結果是一個包含七個 0 和最右邊位置為目標位元的模式。然後我們可以測試結果：如果它是無符號整數 1，則目標位元為 1，而如果結果是無符號整數 0，則目標位元為 0。

**算術移位運算**
**算術移位運算**假設位元模式是以二的補數格式表示的有符號整數。**算術右移**用於將整數除以二，而**算術左移**用於將整數乘以二。這些運算不應改變符號（最左邊）位元。算術右移保留符號位元，但也將其複製到下一個右邊的位元，以便保留符號。算術左移丟棄符號位元並接受符號位元左邊的位元作為符號。如果新符號位元與前一個相同，則運算成功，否則發生溢位或下溢，結果無效。圖 4.5 顯示了這兩個運算。

> **範例 4.13**
> 對位元模式 10011001 使用算術右移運算。該模式是二的補數格式的整數。
>
> **解答**
> 解答如下所示。最左邊的位元被保留並複製到其右邊的相鄰位元。最右邊的位元遺失：
> 原始：1 0 0 1 1 0 0 1
> 移位後：1 1 0 0 1 1 0 0
> 原始數字是 –103，新數字是 –52，這是將 –103 除以 2 並截斷為較小整數的結果。

> **範例 4.14**
> 對位元模式 11011001 使用算術左移運算。該模式是二的補數格式的整數。
>
> **解答**
> 解答如下所示。最左邊的位元遺失，最右邊插入一個 0：
> 原始：1 1 0 1 1 0 0 1
> 移位後：1 0 1 1 0 0 1 0
> 原始數字是 –39，新數字是 –78。原始數字乘以二。運算有效，因為未發生下溢。

> **範例 4.15**
> 對位元模式 01111111 使用算術左移運算。該模式是二的補數格式的整數。
>
> **解答**
> 解答如下所示。最左邊的位元遺失，最右邊插入一個 0：
> 原始：0 1 1 1 1 1 1 1
> 移位後：1 1 1 1 1 1 1 0
> 原始數字是 127，新數字是 –2。這裡的結果無效，因為發生了溢位。預期答案 127 × 2 = 254 無法用 8 位元模式表示。

## 4.3 算術運算
**算術運算**包括加、減、乘和除。我們可以將這些運算應用於整數和浮點數。

### 4.3.1 整數的算術運算
所有算術運算（如加、減、乘和除）都可以應用於整數。雖然整數的乘法（除法）可以使用重複加法（減法）來實現，但該過程效率不高。有更有效的乘法和除法程序，如布斯程序，但這些超出了本書的範圍。因此，我們在此僅討論整數的加法和減法。

**二的補數整數的加法和減法**
我們首先討論二的補數表示法中整數的加法和減法，因為它更常見。正如我們在第三章中所討論的，整數通常以二的補數格式儲存。二的補數表示法的優點之一是加法和減法之間沒有區別。當遇到減法運算時，電腦只需將其更改為加法運算，但對第二個數字取二的補數。換句話說：
$A - B \leftrightarrow A + (\bar{B} + 1)$ 其中 $(\bar{B} + 1)$ 表示 B 的二的補數。

這意味著我們只需要討論加法。在二的補數中加數字就像在十進位中加數字一樣：我們逐欄相加，如果有進位，則將其加到下一欄。然而，從最後一欄產生的進位被丟棄。
我們應該記住，我們是逐欄添加整數的。在每一欄中，如果沒有前一欄的進位，我們有兩個位元要相加，如果有前一欄的進位，則有三個位元要相加。
程序如下：
1. 如果運算是減法，我們取第二個整數的二的補數。否則，我們進入下一步。
2. 我們將兩個整數相加。

> **範例 4.16**
> 兩個整數 A 和 B 以二的補數格式儲存。顯示如何將 B 加到 A：
> A = $(00010001)_2$ B = $(00010110)_2$
>
> **解答**
> 運算是加法。將 A 加到 B，結果儲存在 R 中：
> A：0 0 0 1 0 0 0 1
> B：0 0 0 1 0 1 1 0
> R：0 0 1 0 0 1 1 1
> 我們以十進位檢查結果：(+17) + (+22) = (+39)。

> **範例 4.17**
> 兩個整數 A 和 B 以二的補數格式儲存。顯示如何將 B 加到 A：
> A = $(00011000)_2$ B = $(11101111)_2$
>
> **解答**
> 運算是加法。將 A 加到 B，結果儲存在 R 中。請注意，最後的進位被丟棄，因為記憶體的大小只有 8 位元：
> A：0 0 0 1 1 0 0 0
> B：1 1 1 0 1 1 1 1
> R：0 0 0 0 0 1 1 1
> 以十進位檢查結果，(+24) + (–17) = (+7)。

> **範例 4.18**
> 兩個整數 A 和 B 以二的補數格式儲存。顯示如何從 A 中減去 B：
> A = $(00011000)_2$ B = $(11101111)_2$
>
> **解答**
> 運算是減法。將 A 加到 $(\bar{B} + 1)$，結果儲存在 R 中：
> $(\bar{B} + 1) = 00010001$
> A：0 0 0 1 1 0 0 0
> $(\bar{B} + 1)$：0 0 0 1 0 0 0 1
> R：0 0 1 0 1 0 0 1
> 以十進位檢查結果，(+24) – (–17) = (+41)。

> **範例 4.19**
> 兩個整數 A 和 B 以二的補數格式儲存。顯示如何從 A 中減去 B：
> A = $(11011101)_2$ B = $(00010100)_2$
>
> **解答**
> 運算是減法。將 A 加到 $(\bar{B} + 1)$，結果儲存在 R 中：
> $(\bar{B} + 1) = 11101100$
> A：1 1 0 1 1 1 0 1
> $(\bar{B} + 1)$：1 1 1 0 1 1 0 0
> R：1 1 0 0 1 0 0 1
> 以十進位檢查結果，(–35) – (+20) = (–55)。請注意，最後的進位被丟棄。

> **範例 4.20**
> 兩個整數 A 和 B 以二的補數格式儲存。顯示如何將 B 加到 A：
> A = $(01111111)_2$ B = $(00000011)_2$
>
> **解答**
> 運算是加法。將 A 加到 B，結果儲存在 R 中：
> A：0 1 1 1 1 1 1 1
> B：0 0 0 0 0 0 1 1
> R：1 0 0 0 0 0 1 0
> 我們期望結果是 127 + 3 = 130，但答案是 −126。錯誤是由於溢位，因為預期答案 (+130) 不在範圍 −128 到 +127 內。
> 當我們在電腦中對數字進行算術運算時，我們應該記住每個數字和結果都應該在位元分配定義的範圍內。

**符號與數值整數的加法或減法**
符號與數值表示法中整數的加法或減法看起來非常複雜。我們有四種不同的符號組合（兩個符號，每個有兩個值）用於加法，還有四種不同的條件用於減法。這意味著我們需要考慮八種不同的情況。對於那些感興趣的讀者，我們在附錄 I 中更詳細地描述了這些。

### 4.3.2 實數的算術運算
所有算術運算（如加、減、乘和除）都可以應用於以浮點格式儲存的實數。兩個實數的乘法涉及符號與數值表示法中兩個整數的乘法。兩個實數的除法涉及符號與數值表示法中兩個整數的除法。由於我們沒有討論符號與數值表示法中整數的乘法或除法，我們將不討論實數的乘法和除法，而只在附錄 J 中顯示實數的加法和減法。

## 4.4 章末材料
### 4.4.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Mano, M. *Computer System Architecture*, Upper Saddle River, NJ: Prentice-Hall, 1993
- Null, L. and Lobur, J. *Computer Organization and Architecture*, Sudbury, MA: Jones and Bartlett, 2003
- Stalling, W. *Computer Organization and Architecture*, Upper Saddle River, NJ: Prentice-Hall, 2000

### 4.4.2 關鍵詞
- AND 運算
- 算術運算
- 算術移位運算
- 布林代數
- 循環移位運算
- 邏輯移位運算
- 遮罩
- NOT 運算
- OR 運算
- 真值表
- XOR 運算

### 4.4.3 摘要
- 資料的運算可以分為三大類：邏輯運算、移位運算和算術運算。邏輯運算指的是那些對模式中的單個位元或兩個模式中的對應位元應用相同基本運算的操作。移位運算移動模式中的位元。算術運算涉及加、減、乘和除。
- 本章討論的四個邏輯運算子（NOT、AND、OR 和 XOR）可以在位元層級或模式層級使用。NOT 運算子是一元運算子，而 AND、OR 和 XOR 運算子是二元運算子。
- NOT 運算子的唯一應用是對整個模式進行補數運算。AND 運算子的應用之一是取消設定（強制為 0）位元模式中的特定位元。OR 運算子的應用之一是設定（強制為 1）位元模式中的特定位元。XOR 運算子的應用之一是翻轉（補數）位元模式中的特定位元。
- 移位運算移動模式中的位元：它們改變位元的位置。我們可以將移位運算分為兩大類：邏輯移位運算和算術移位運算。邏輯移位運算應用於不表示有符號數字的模式。算術移位運算假設位元模式是以二的補數格式表示的有符號整數。
- 所有算術運算（如加、減、乘和除）都可以應用於整數。整數通常以二的補數格式儲存。二的補數表示法的優點之一是加法和減法之間沒有區別。當遇到減法運算時，電腦只需將其更改為加法運算，但形成第二個數字的二的補數。符號與數值表示法中整數的加法和減法看起來非常複雜。我們有八種情況需要考慮。
- 所有算術運算（如加、減、乘和除）都可以應用於以浮點格式儲存的實數。以浮點數儲存的實數的加法和減法在對齊小數點後簡化為以符號與數值儲存的兩個整數的加法和減法。

## 4.5 練習題
### 4.5.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 4.5.2 複習問題
1. 算術運算和邏輯運算有什麼區別？
2. 在二的補數格式的整數加法中，最左邊一欄的進位會發生什麼？
3. 位元分配 n 可以等於 1 嗎？為什麼或為什麼不？
4. 定義術語溢位。
5. 在浮點數加法中，我們如何調整具有不同指數的數字的表示？
6. 一元運算和二元運算有什麼區別？
7. 命名邏輯二元運算。
8. 什麼是真值表？
9. NOT 運算子做什麼？
10. AND 運算子的結果何時為真？
11. OR 運算子的結果何時為真？
12. XOR 運算子的結果何時為真？
13. 提到本章討論的 AND 運算子的一個重要屬性。
14. 提到本章討論的 OR 運算子的一個重要屬性。
15. 提到本章討論的 XOR 運算子的一個重要屬性。
16. 什麼二進位運算可用於設定位元？遮罩應該有什麼位元模式？
17. 什麼二進位運算可用於取消設定位元？遮罩應該有什麼位元模式？
18. 什麼二進位運算可用於翻轉位元？遮罩應該有什麼位元模式？
19. 簡單移位和算術移位有什麼區別？

### 4.5.3 問題
1. 顯示以下運算的結果：
    a. NOT (99)16
    b. NOT (FF)16
    c. NOT (00)16
    d. NOT (01)16
2. 顯示以下運算的結果：
    a. (99)16 AND (99)16
    b. (99)16 AND (00)16
    c. (99)16 AND (FF)16
    d. (FF)16 AND (FF)16
3. 顯示以下運算的結果：
    a. (99)16 OR (99)16
    b. (99)16 OR (00)16
    c. (99)16 OR (FF)16
    d. (FF)16 OR (FF)16
4. 顯示以下運算的結果：
    a. NOT [(99)16 OR (99)16)]
    b. (99)16 OR [NOT (00)16]
    c. [(99)16 AND (33)16)] OR [(00)16 AND (FF)16]
    d. (99)16 OR (33)16 AND [(00)16 OR (FF)16]
5. 我們需要取消設定（強制為 0）模式中最左邊的四個位元。顯示遮罩和運算。
6. 我們需要設定（強制為 1）模式中最右邊的四個位元。顯示遮罩和運算。
7. 我們需要翻轉模式中最右邊的三個和最左邊的兩個位元。顯示遮罩和運算。
8. 我們需要取消設定最左邊的三個位元並設定模式中最右邊的兩個位元。顯示遮罩和運算。
9. 使用移位運算將整數除以 4。
10. 使用移位運算將整數乘以 8。
11. 使用邏輯和移位運算的組合從無符號整數左邊提取第四和第五個位元。
12. 使用 8 位元分配，首先將以下每個整數轉換為二的補數，執行運算，然後將結果轉換為十進位。
    a. 19 + 23
    b. 19 − 23
    c. −19 + 23
    d. −19 − 23
13. 使用 16 位元分配，首先將以下每個數字轉換為二的補數，執行運算，然後將結果轉換為十進位。
    a. 161 + 1023
    b. 161 − 1023
    c. −161 + 1023
    d. −161 − 1023
14. 如果數字和結果以 8 位元二的補數表示法表示，以下哪種運算會產生溢位？
    a. 11000010 + 00111111
    b. 00000010 + 00111111
    c. 11000010 + 11111111
    d. 00000010 + 11111111
15. 在不實際進行計算的情況下，我們能分辨出以下哪種運算會產生溢位嗎？假設數字和結果以 8 位元二的補數表示法表示。
    a. 32 + 105
    b. 32 − 105
    c. −32 + 105
    d. −32 − 105
16. 假設數字以 16 位元二的補數表示法儲存，顯示以下運算的結果。以十六進位表示法顯示結果。
    a. (012A)16 + (0E27)16
    b. (712A)16 + (9E00)16
    c. (8011)16 + (0001)16
    d. (E12A)16 + (9E27)16
17. 使用 8 位元分配，首先將以下每個數字轉換為符號與數值表示法，執行運算，然後將結果轉換為十進位。
    a. 19 + 23
    b. 19 − 23
    c. −19 + 23
    d. −19 − 23
18. 使用 IEEE_127 顯示以下浮點運算的結果——見第 3 章。
    a. 34.75 + 23.125
    b. −12.625 + 451.00
    c. 33.1875 − 0.4375
    d. −344.3125 − 123.5625
19. 在以下哪種情況下永遠不會發生溢位？證明答案的合理性。
    a. 兩個正整數相加。
    b. 一個正整數加一個負整數。
    c. 從一個負整數中減去一個正整數。
    d. 兩個負整數相減。
20. 將一個整數加到其一的補數上的結果是什麼？
21. 將一個整數加到其二的補數上的結果是什麼？
`,
};
