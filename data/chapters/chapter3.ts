

export const chapter3Content = {
  en: `
# Chapter 3: Data Storage

As discussed in Chapter 1, a computer is a programmable data processing machine. Before we can talk about processing data, we need to understand the nature of data. In this chapter we discuss different data types and how they are stored inside a computer. In Chapter 4, we show how data is manipulated inside a computer.

## Objectives
After studying this chapter, the student should be able to:
- List five different data types used in a computer.
- Describe how different data is stored inside the computer as bit patterns.
- Describe how integers are stored in a computer using unsigned format.
- Describe how integers are stored in a computer using sign-and-magnitude format.
- Describe how integers are stored in two’s complement format.
- Describe how reals are stored in a computer using floating-point format.
- Describe how text is stored in a computer using one of the various encoding systems.
- Describe how audio is stored in a computer using sampling, quantization, and encoding.
- Describe how images are stored in a computer using raster and vector graphics schemes.
- Describe how video is stored in a computer as a representation of images changing in time.

## 3.1 DATA TYPES
Data today come in different forms including numbers, text, audio, images, and video (Figure 3.1).
People need to be able to process many different types of data:
- An engineering program uses a computer mainly to process numbers: to do arithmetic, to solve algebraic or trigonometric equations, to find the roots of a differential equation, and so on.
- A word processing program, on the other hand, uses a computer mainly to process text: justify, move, delete, and so on.
- A computer also handles audio data. We can play music on a computer and can record sound as data.
- An image processing program uses a computer to manipulate images: create, shrink, expand, rotate, and so on.
- Finally, a computer can be used not only to show movies, but also to create the special effects seen in movies.

The computer industry uses the term **'multimedia'** to define information that contains numbers, text, audio, images, and video.

### 3.1.1 Data inside the computer
All data types are transformed into a uniform representation when they are stored in a computer and transformed back to their original form when retrieved. This universal representation is called a **bit pattern**, as discussed shortly.

#### Bits
A **bit** (binary digit) is the smallest unit of data that can be stored in a computer and has a value of 0 or 1. A bit represents the state of a device that can take one of two states. For example, a switch can be on or off. A convention can be established to represent the ‘on’ state as 1 and the ‘off’ state as 0, or vice versa. In this way, a switch can store one bit of information. Today, computers use various two-state devices to store data.

#### Bit patterns
To represent different types of data, we use a **bit pattern**, a sequence, or as it is sometimes called, a string of bits. Figure 3.2 shows a bit pattern made up of sixteen bits. It is a combination of sixteen 0s and 1s. This means that if we need to store a bit pattern made of sixteen bits, we need sixteen electronic switches. If we need to store 1000 bit patterns, each sixteen bits long, we need 16 000 switches, and so on. By tradition a bit pattern with eight bits is called a **byte**. Sometimes the term **word** is used to refer to a longer bit pattern.

As Figure 3.3 shows, a piece of data belonging to different data types can be stored as the same pattern in the memory.

If we are using a **text editor** (a word processor), the character A typed on the keyboard can be stored as the 8-bit pattern 01000001. The same 8-bit pattern can represent the number 65 if we are using a mathematical routine. Moreover, the same pattern can represent part of an image, part of a song, or part of a scene in a film. The computer’s memory stores all of them without recognizing what type of data they represent.

### 3.1.2 Data compression
To occupy less memory space, data is normally compressed before being stored in the computer. Data compression is a very broad and involved subject, so we have dedicated the whole of Chapter 15 to this subject.

### 3.1.3 Error detection and correction
Another issue related to data is the detection and correction of errors during transmission or storage. We discuss this issue briefly in Appendix H.

## 3.2 STORING NUMBERS
A number is changed to the binary system before being stored in the computer memory, as described in Chapter 2. However, there are still two issues that need to be handled:
1.  How to store the sign of the number.
2.  How to show the decimal point.

There are several ways to handle the sign issue, discussed later in this chapter. For the decimal point, computers use two different representations: **fixed-point** and **floating-point**. The first is used to store a number as an integer—without a fractional part, the second is used to store a number as a real—with a fractional part.

### 3.2.1 Storing integers
Integers are whole numbers (numbers without a fractional part). For example, 134 and -125 are integers, whereas 134.23 and -0.235 are not. An integer can be thought of as a number in which the position of the decimal point is fixed: the decimal point is to the right of the least significant (rightmost) bit. For this reason, **fixed-point representation** is used to store an integer, as shown in Figure 3.4. In this representation the decimal point is assumed but not stored.

However, a user (or a program) may store an integer as a real with the fractional part set to zero. This may happen, for example, if an integer is too large to be stored in the size defined for an integer. To use computer memory more efficiently, unsigned and signed integers are stored inside the computer differently.

**An integer is normally stored in memory using fixed-point representation.**

#### Unsigned representation
An **unsigned integer** is an integer that can never be negative and can take only 0 or positive values. Its range is between 0 and positive infinity. However, since no computer can possibly represent all the integers in this range, most computers define a constant called the **maximum unsigned integer**, which has the value of $(2^n - 1)$ where $n$ is the number of bits allocated to represent an unsigned integer.

**Storing unsigned integers**
An input device stores an unsigned integer using the following steps:
1.  The integer is changed to binary.
2.  If the number of bits is less than $n$, 0s are added to the left of the binary integer so that there is a total of $n$ bits. If the number of bits is greater than $n$, the integer cannot be stored. A condition referred to as **overflow** will occur, which we discuss later.

> **Example 3.1**
> Store 7 in an 8-bit memory location using unsigned representation.
>
> **Solution**
> First change the integer to binary, $(111)_2$. Add five 0s to make a total of eight bits, $(00000111)_2$. The integer is stored in the memory location. Note that the subscript 2 is used to emphasize that the integer is binary, but the subscript is not stored in the computer:
> Change 7 to binary → 1 1 1
> Add five bits at the left → 0 0 0 0 0 1 1 1

> **Example 3.2**
> Store 258 in a 16-bit memory location.
>
> **Solution**
> First change the integer to binary $(100000010)_2$. Add seven 0s to make a total of sixteen bits $(0000000100000010)_2$. The integer is stored in the memory location:
> Change 258 to binary → 1 0 0 0 0 0 0 1 0
> Add seven bits at the left → 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0

**Retrieving unsigned integers**
An output device retrieves a bit string from memory as a bit pattern and converts it to an unsigned decimal integer.

> **Example 3.3**
> What is returned from an output device when it retrieves the bit string 00101011 stored in the memory as an unsigned integer?
>
> **Solution**
> Using the procedure shown in Chapter 2, the binary integer is converted to the unsigned integer 43.

**Overflow**
Due to size limitations—the allocated number of bits—the range of integers that can be represented is limited. In an $n$-bit memory location we can only store an unsigned integer between 0 and $2^n - 1$. Figure 3.5 shows what happens if we try to store an integer that is larger than $2^4 - 1 = 15$ in a memory location that can only hold four bits. This situation, called **overflow**, happens when, for example, we have stored the integer 11 in a memory location and then try to add 9 to the integer. The minimum number of bits we need to represent the decimal 20 is five bits. In other words, $20 = (10100)_2$, so the computer drops the leftmost bit and keeps the rightmost four bits $(0100)_2$. People are surprised when they see that the new integer is printed as 4 instead of 20. Figure 3.5 shows why this happens.

**Applications of unsigned integers**
Unsigned integer representation can improve the efficiency of storage because we do not need to store the sign of the integer. This means that the entire bit allocation can be used for storing the number. Unsigned integer representation can be used whenever we do not need negative integers. The following lists some cases:
- **Counting.** When we count, we do not need negative numbers. We start counting from 1 (sometimes 0) and go up.
- **Addressing.** Some computer programs store the address of a memory location inside another memory location. Addresses are positive integers starting from 0 (the first memory location) and going up to an integer representing the total memory capacity. Here again, we do not need negative integers—unsigned integers can easily do the job.
- **Storing other data types.** Other data types (text, images, audio, and video), as we will discuss shortly, are stored as bit patterns, which can be interpreted as unsigned integers.

#### Sign-and-magnitude representation
Although the **sign-and-magnitude representation** format is not commonly used to store integers, this format is used to store part of a real number in a computer, as described in the next section. For this reason we briefly discuss this format here. In this method, the available range for unsigned integers ($0$ to $2^n - 1$) is divided into two equal subranges. The first half represents positive integers, the second half, negative integers. For example, if $n$ is 4, the range is 0000 to 1111. This range is divided into two halves: 0000 to 0111 and 1000 to 1111 (Figure 3.6). The bit patterns are then assigned to negative and positive integers. Note that the negative numbers appear to the right of the positive numbers, which is contrary to conventional thinking about positive and negative numbers. Also note that we have two 0s: positive zero (0000) and negative zero (1000).

Storing an integer in sign-and-magnitude format requires 1 bit to represent the sign (0 for positive, 1 for negative). This means that in an 8-bit allocation, we can only use seven bits to represent the absolute value of the number (number without the sign). Therefore, the maximum positive value is one half the unsigned value. The range of numbers that can be stored in an $n$-bit location is $-(2^{n-1} -1)$ to $+ (2^{n-1} -1)$. In an $n$-bit allocation, the leftmost bit is dedicated to store the sign (0 for positive, 1 for negative).

**In sign-and-magnitude representation, the leftmost bit defines the sign of the integer. If it is 0, the integer is positive. If it is 1, the integer is negative.**

> **Example 3.4**
> Store +28 in an 8-bit memory location using sign-and-magnitude representation.
>
> **Solution**
> The integer is changed to 7-bit binary. The leftmost bit is set to 0. The 8-bit number is stored:
> Change 28 to 7-bit binary: 0 0 1 1 1 0 0
> Add the sign and store: 0 0 0 1 1 1 0 0

> **Example 3.5**
> Store -28 in an 8-bit memory location using sign-and-magnitude representation.
>
> **Solution**
> The integer is changed to 7-bit binary. The leftmost bit is set to 1. The 8-bit number is stored:
> Change 28 to 7-bit binary: 0 0 1 1 1 0 0
> Add the sign and store: 1 0 0 1 1 1 0 0

> **Example 3.6**
> Retrieve the integer that is stored as 01001101 in sign-and-magnitude representation.
>
> **Solution**
> Since the leftmost bit is 0, the sign is positive. The rest of the bits (1001101) are changed to decimal as 77. After adding the sign, the integer is +77.

> **Example 3.7**
> Retrieve the integer that is stored as 10100001 in sign-and-magnitude representation.
>
> **Solution**
> Since the leftmost bit is 1, the sign is negative. The rest of the bits (0100001) are changed to decimal as 33. After adding the sign, the integer is -33.

**Overflow in sign-and-magnitude representation**
Like unsigned integers, signed integers are also subjected to overflow. However, in this case, we may have both positive and negative overflow. Figure 3.7 shows both positive and negative overflow when storing an integer in sign-and-magnitude representation using a 4-bit memory location. Positive overflow occurs when we try to store a positive integer larger than 7. For example, assume that we have stored integer 5 in a memory location and we then try to add 6 to the integer. We expect the result to be 11, but the computer’s response is –3. The reason is that if we start from 5 on a circular representation and go six units in the clockwise direction, we end up at –3. A positive overflow wraps the integer back to the range.
A negative overflow can happen when we try to store a integer that is less than –7, for example if we have stored the integer –5 in a memory and try to subtract 7 from it. We expect the result to be –12, but the computer’s response is +6. The reason is that if we start from –5 on a circular representation and go seven units in the counterclockwise direction, we end up at +6.

**There are two 0s in sign-and-magnitude representation: +0 and −0.**

**Applications of sign-and-magnitude representation**
Sign-and-magnitude representation is not used to store integers. However, it is used to store part of real numbers, as we will see shortly. In addition, sign-and-magnitude representation is often used when we quantize an analog signal, such as audio.

#### Two’s complement representation
Almost all computers use **two’s complement representation** to store a signed integer in an $n$-bit memory location. In this method, the available range for an unsigned integer of ($0$ to $2^n - 1$) is divided into two equal subranges. The first subrange is used to represent nonnegative integers, the second half to represent negative integers. For example, if $n$ is 4, the range is 0000 to 1111. This range is divided into two halves: 0000 to 0111 and 1000 to 1111. The two halves are swapped to be in agreement with the common convention of showing negative integers to the left of positive integers. The bit patterns are then assigned to negative and nonnegative (zero and positive) integers as shown in Figure 3.8.

Although the sign of the integer affects every bit in the binary integer stored, the first (leftmost) bit determines the sign. If the leftmost bit is 0, the integer is nonnegative: if the leftmost bit is 1, the integer is negative.

**In two’s complement representation, the leftmost bit defines the sign of the integer. If it is 0, the integer is positive. If it is 1, the integer is negative.**

**Two operations**
Before we discuss this representation further, we need to introduce two operations. The first is called *one’s completing* or *taking the one’s complement of an integer*. The operation can be applied to any integer, positive or negative. This operation simply reverses (flips) each bit. A 0-bit is changed to a 1-bit, a 1-bit is changed to a 0-bit.

> **Example 3.8**
> The following shows how we take the **one’s complement** of the integer 00110110:
> Original pattern: 0 0 1 1 0 1 1 0
> After applying one’s complement operation: 1 1 0 0 1 0 0 1

> **Example 3.9**
> The following shows that we get the original integer if we apply the one’s complement operations twice:
> Original pattern: 0 0 1 1 0 1 1 0
> One’s complementing once: 1 1 0 0 1 0 0 1
> One’s complementing twice: 0 0 1 1 0 1 1 0

The second operation is called *two’s completing* or *taking the two’s complement of an integer* in binary. This operation is done in two steps. First, we copy bits from the right until a 1 is copied, Then, we flip the rest of the bits.

> **Example 3.10**
> The following shows how we take the **two’s complement** of the integer 00110100:
> Original integer: 0 0 1 1 0 1 0 0
> Two’s complementing once: 1 1 0 0 1 1 0 0

> **Example 3.11**
> The following shows that we always get the original integer if we apply the two’s complement operation twice:
> Original integer: 0 0 1 1 0 1 0 0
> Two’s complementing once: 1 1 0 0 1 1 0 0
> Two’s complementing twice: 0 0 1 1 0 1 0 0

An alternative way to take the two’s complement of an integer is to first take the one’s complement and then add 1 to the result (see Chapter 4 for binary addition).

**Storing an integer in two’s complement format**
To store an integer in two’s complement representation, the computer follows the steps below:
- The absolute value of the integer is changed to an $n$-bit binary.
- If the integer is positive or zero, it is stored as it is: if it is negative, the computer takes the two’s complement of the integer and then stores it.

**Retrieving an integer in two’s complement format**
To retrieve an integer in two’s complement representation, the computer follows the steps below:
- If the leftmost bit is 1, the computer applies the two’s complement operation to the integer. If the leftmost bit is 0, no operation is applied.
- The computer changes the integer to decimal.

> **Example 3.12**
> Store the integer 28 in an 8-bit memory location using two’s complement representation.
>
> **Solution**
> The integer is positive (no sign means positive), so after decimal to binary transformation no more action is needed. Note that three extra 0s are added to the left of the integer to make it eight bits:
> Change 28 to 8-bit binary: 0 0 0 1 1 1 0 0

> **Example 3.13**
> Store -28 in an 8-bit memory location using two’s complement representation.
>
> **Solution**
> The integer is negative, so after changing to binary, the computer applies the two’s complement operation on the integer:
> Change 28 to 8-bit binary: 0 0 0 1 1 1 0 0
> Apply two’s complement operation: 1 1 1 0 0 1 0 0

> **Example 3.14**
> Retrieve the integer that is stored as 00001101 in memory in two’s complement format.
>
> **Solution**
> The leftmost bit is 0, so the sign is positive. The integer is changed to decimal and the sign is added:
> Leftmost bit is 0. The sign is positive. 0 0 0 0 1 1 0 1
> Integer changed to decimal: 13
> Sign is added: +13

> **Example 3.15**
> Retrieve the integer that is stored as 11100110 in memory using two’s complement format.
>
> **Solution**
> The leftmost bit is 1, so the integer is negative. The integer needs to be two’s complemented before changing to decimal:
> Leftmost bit is 1. The sign is negative. 1 1 1 0 0 1 1 0
> Apply two’s complement operation. 0 0 0 1 1 0 1 0
> Integer changed to decimal. 26
> Sign is added. -26

A very interesting point about two’s complement is that there is only one zero in this representation. In sign-and-magnitude representation, there are two zeros (+0 and -0).

**There is only one zero in two’s complement notation.**

**Overflow in two’s complement notation**
Like other representations, integers stored in two’s complement format are also subject to overflow. Figure 3.9 shows both positive and negative overflow when storing a signed integer in a 4-bit memory location. Positive overflow occurs when we try to store a positive integer larger than 7. For example, assume that we have stored an integer value 5 in a memory location and we then try to add 6 to the integer. We expect the result to be 11, but the computer’s response is –5. The reason is if we start from 5 on the circular representation and move six units in the clockwise direction, we end up at –5. The positive overflow wraps the integer back to the range.
A negative overflow can happen when we try to store an integer that is less than –8, for example if we have stored –3 and try to subtract 7 from it. We expect the result to be –10, but the computer’s response is +6. The reason is that if we start from –3 on a circular representation and go seven units in the counterclockwise direction, we end up at +6.

**Applications of two’s complement notation**
Two’s complement representation is the standard representation for storing integers in computers today. In the next chapter we will see why this is the case when we see the simplicity of operations using two’s complement.

### 3.2.2 Comparison of the three systems
Table 3.1 shows a comparison between unsigned, two’s complement, and sign-and-magnitude integers. A 4-bit memory location can store an unsigned integer between 0 and 15, and the same location can store two’s complement signed integers between -8 and +7. It is very important that we store and retrieve an integer in the same format. For example, if the integer 13 is stored in signed format, it needs to be retrieved in signed format: the same integer is retrieved as -3 in two’s complement format.

**Table 3.1 Summary of integer representations**

| Contents of memory | Unsigned | Sign-and-magnitude | Two’s complement |
| :--- | :--- | :--- | :--- |
| 0000 | 0 | 0 | +0 |
| 0001 | 1 | 1 | +1 |
| 0010 | 2 | 2 | +2 |
| 0011 | 3 | 3 | +3 |
| 0100 | 4 | 4 | +4 |
| 0101 | 5 | 5 | +5 |
| 0110 | 6 | 6 | +6 |
| 0111 | 7 | 7 | +7 |
| 1000 | 8 | -0 | -8 |
| 1001 | 9 | -1 | -7 |
| 1010 | 10 | -2 | -6 |
| 1011 | 11 | -3 | -5 |
| 1100 | 12 | -4 | -4 |
| 1101 | 13 | -5 | -3 |
| 1110 | 14 | -6 | -2 |
| 1111 | 15 | -7 | -1 |

### 3.2.3 Storing reals
A **real** is a number with an integral part and a fractional part. For example, 23.7 is a real number—the integral part is 23 and the fractional part is 7/10. Although a fixed-point representation can be used to represent a real number, the result may not be accurate or it may not have the required precision. The next two examples explain why.

> **Example 3.16**
> In the decimal system, assume that we use a fixed-point representation with two digits at the right of the decimal point and fourteen digits at the left of the decimal point, for a total of sixteen digits. The precision of a real number in this system is lost if we try to represent a decimal number such as 1.00234: the system stores the number as 1.00.

> **Example 3.17**
> In the decimal system, assume that we use a fixed-point representation with six digits to the right of the decimal point and ten digits for the left of the decimal point, for a total of sixteen digits. The accuracy of a real number in this system is lost if we try to represent a decimal number such as 236154302345.00. The system stores the number as 6154302345.00: the integral part is much smaller than it should be.

**Real numbers with very large integral parts or very small fractional parts should not be stored in fixed-point representation.**

#### Floating-point representation
The solution for maintaining accuracy or precision is to use **floating-point representation**. This representation allows the decimal point to float: we can have different numbers of digits to the left or right of the decimal point. The range of real numbers that can be stored using this method increases tremendously: numbers with large integral parts or small fractional parts can be stored in memory. In floating-point representation, either decimal or binary, a number is made up of three sections, as shown in Figure 3.10.

The first section is the sign, either positive or negative. The second section shows how many places the decimal point should be shifted to the right or left to form the actual number. The third section is a fixed-point representation in which the position of the decimal is fixed.

**A floating-point representation of a number is made up of three parts: a sign, a shifter, and a fixed-point number.**

Floating-point representation is used in science to represent very small or very large decimal numbers. In this representation, which is called **scientific notation**, the fixed-point section has only one digit to the left of the decimal point and the shifter is the power of 10.

> **Example 3.18**
> The following shows the decimal number 7425000000000000000000.00 in scientific notation (floating-point representation):
>
> **Solution**
> Actual number → + 7425000000000000000000.00
> Scientific notation → + 7.425 × 10²¹

The three sections are the sign (+), the shifter (21), and the fixed-point part (7.425). Note that the shifter is the exponent. We can easily see the advantage of this. Even if we just want to write the number on a piece of paper, the scientific notation is shorter and takes less space. The notation uses the concept of floating-point because the position of the decimal point, which is near the right-hand end in the example, has moved 21 digits to the left to make the fixed-point part of the number. Some programming languages and calculators show the number as +7.425E21 because the base 10 is understood and does not need to be mentioned.

> **Example 3.19**
> Show the number -0.0000000000000232 in scientific notation.
>
> **Solution**
> We use the same approach as in the previous example—we move the decimal point after the digit 2, as shown below:
> Actual number → - 0.0000000000000232
> Scientific notation → - 2.32 × 10⁻¹⁴
> Note that the exponent is negative here because the decimal point in 2.32 needs to move to the left (fourteen positions) to form the original number. Again, we can say that the number in this notation is made of three parts: sign (-), the real number (2.32), and the negative integer (-14). Some programming languages and calculators show this as -2.32E-14.

Similar approaches have been used to represent very large or very small numbers (both integers and reals) in binary, to be stored in computers.

> **Example 3.20**
> Show the number $(101001000000000000000000000000000.00)_2$ in floating-point format.
>
> **Solution**
> We use the same idea, keeping only one digit to the left of the decimal point:
> Actual number → + $(101001000000000000000000000000000.00)_2$
> Scientific notation → + $1.01001 × 2^{32}$

Note that we don’t have to worry about all those 0s at the right of the rightmost 1, because they are not significant when we use the real $(1.01001)_2$. The exponent is shown as 32, but it is actually stored in the computer in binary, as we will see shortly. We have also shown the sign as positive, but it would be stored as one bit.

> **Example 3.21**
> Show the number $-(0.00000000000000000000000101)_2$ in floating-point format.
>
> **Solution**
> We use the same idea, keeping only one non zero digit on the left-hand side of the decimal point:
> Actual number → - $(0.00000000000000000000000101)_2$
> Scientific notation → - $1.01 × 2^{-24}$
> Note that exponent is stored as a negative binary in the computer.

**Normalization**
To make the fixed part of the representation uniform, both the scientific method (for the decimal system) and the floating-point method (for the binary system) use only one non-zero digit on the left of the decimal point. This is called **normalization**. In the decimal system this digit can be 1 to 9, while in the binary system it can only be 0 or 1. In the following, d is a non zero digit, x is a digit, and y is either 0 or 1:
Decimal ± d.xxxxxxxxxxxxxx (Note: d is 1 to 9 and each x is 0 to 9)
Binary ± 1.yyyyyyyyyyyyyy (Note: each y is 0 or 1)

**Sign, exponent, and mantissa**
After a binary number is normalized, only three pieces of information about the number are stored: sign, exponent, and mantissa (the bits to the right of the decimal point). For example, +1000111.0101 becomes:
Sign: + (1)
Exponent: $2^6$ (6)
Mantissa: $1.0001110101$ ($0001110101$)

**Note that the point and the bit 1 to the left of the fixed-point section are not stored—they are implicit.**

**Sign**
The sign of the number can be stored using 1 bit (0 or 1).

**Exponent**
The exponent (power of 2) defines the shifting of the decimal point. Note that the power can be negative or positive. The **Excess representation** (discussed later) is the method used to store the exponent.

**Mantissa**
The **mantissa** is the binary integer to the right of the decimal point. It defines the precision of the number. The mantissa is stored in fixed-point notation. If we think of the mantissa and the sign together, we can say this combination is stored as an integer in sign-and-magnitude format. However, we need to remember that it is not an integer—it is a fractional part that is stored like an integer. We emphasize this point because in a mantissa, if we insert extra 0s to the right of the number, the value will not change, whereas in a real integer if we insert extra 0s to the left of the number, the value will not change.

**The mantissa is a fractional part that, together with the sign, is treated like an integer stored in sign-and-magnitude representation.**

**The Excess system**
The mantissa can be stored as an unsigned integer. The exponent, the power that shows how many bits the decimal point should be moved to the left or right, is a signed number. Although this could have been stored using two’s complement representation, a new representation, called the Excess system, is used instead. In the Excess system, both positive and negative integers are stored as unsigned integers. To represent a positive or negative integer, a positive integer (called a bias) is added to each number to shift them uniformly to the nonnegative side. The value of this bias is $2^{m-1} - 1$, where $m$ is the size of the memory location to store the exponent.

> **Example 3.22**
> We can express sixteen integers in a number system with 4-bit allocation. Using one location for 0 and splitting the other fifteen (not quite equally) we can express integers in the range of -7 to 8, as shown in Figure 3.11. By adding seven units to each integer in this range, we can uniformly translate all integers to the right and make all of them positive without changing the relative position of the integers with respect to each other, as shown in the figure. The new system is referred to as Excess-7, or biased representation with biasing value of 7.

The advantage of this new representation compared to that before the translation is that all integers in the Excess system are positive, so we don’t need to be concerned about the sign when we are comparing or doing operations on the integers. For 4-bit allocation, the bias is $2^{4-1} -1 = 7$, as we expected.

**IEEE standards**
The Institute of Electrical and Electronics Engineers (IEEE) has defined several standards for storing floating-point numbers. We discuss the two most common ones here, single precision and double precision. These formats are shown in Figure 3.12. The numbers above the boxes are the number of bits for each field.

**Single-precision** format uses a total of 32 bits to store a real number in floating-point representation. The sign occupies one bit (0 for positive and 1 for negative), the exponent occupies eight bits (using a bias of 127), the mantissa uses 23 bits (unsigned number). This standard is sometimes referred to as **Excess_127** because the bias is 127.

**Double-precision** format uses a total of 64 bits to store a real number in floating-point representation. The sign occupies one bit, the exponent occupies eleven bits (using a bias of 1023), and the mantissa uses 52 bits. The standard is sometimes referred to as **Excess_1023** because the bias is 1023. Table 3.2 summarizes the specification of the two standards.

**Table 3.2 Specifications of the two IEEE floating-point standards**

| Parameter | Single Precision | Double Precision |
| :--- | :--- | :--- |
| Memory location size (number of bits) | 32 | 64 |
| Sign size (number of bits) | 1 | 1 |
| Exponent size (number of bits) | 8 | 11 |
| Mantissa size (number of bits) | 23 | 52 |
| Bias (integer) | 127 | 1023 |

**Storage of IEEE standard floating-point numbers**
A real number can be stored in one of the IEEE standard floating-point formats using the following procedure, with reference to Figure 3.12:
- Store the sign in S (0 or 1).
- Change the number to binary.
- Normalize.
- Find the values of E and M.
- Concatenate S, E, and M.

> **Example 3.23**
> Show the Excess_127 (single precision) representation of the decimal number 5.75.
>
> **Solution**
> a. The sign is positive, so S = 0.
> b. Decimal to binary transformation: 5.75 = $(101.11)_2$.
> c. Normalization: $(101.11)_2 = (1.0111)_2 \times 2^2$.
> d. E = 2 + 127 = 129 = $(10000001)_2$, M = 0111. We need to add 19 zeros at the right of M to make it 23 bits.
> e. The presentation is shown below:
> S: 0
> E: 10000001
> M: 01110000000000000000000
> The number is stored in the computer as 01000000101110000000000000000000.

> **Example 3.24**
> Show the Excess_127 (single precision) representation of the decimal number –161.875.
>
> **Solution**
> a. The sign is negative, so S = 1.
> b. Decimal to binary transformation: 161.875 = $(10100001.111)_2$.
> c. Normalization: $(10100001.111)_2 = (1.0100001111)_2 \times 2^7$.
> d. E = 7 + 127 = 134 = $(10000110)_2$ and M = $(0100001111)_2$.
> e. Representation:
> S: 1
> E: 10000110
> M: 01000011110000000000000
> The number is stored in the computer as 11000011010000111100000000000000.

> **Example 3.25**
> Show the Excess_127 (single precision) representation of the decimal number –0.0234375.
>
> **Solution**
> a. S = 1 (the number is negative).
> b. Decimal to binary transformation: 0.0234375 = $(0.0000011)_2$.
> c. Normalization: $(0.0000011)_2 = (1.1)_2 \times 2^{-6}$.
> d. E = –6 + 127 = 121 = $(01111001)_2$ and M = $(1)_2$.
> e. Representation:
> S: 1
> E: 01111001
> M: 10000000000000000000000
> The number is stored in the computer as 10111100110000000000000000000000.

**Retrieving numbers stored in IEEE standard floating-point format**
A number stored in one of the IEEE floating-point formats can be retrieved using the following method:
- Find the value of S, E, and M.
- If S = 0, set the sign to positive, otherwise, set the sign to negative.
- Find the shifter (E -127).
- Denormalize the mantissa.
- Change the denormalized number to binary to find the absolute value.
- Add the sign.

> **Example 3.26**
> The bit pattern $(11001010000000000111000100001111)_2$ is stored in memory in Excess_127 format. Show what is the value of the number in decimal notation.
>
> **Solution**
> a. The first bit represents S, the next eight bits, E and the remaining 23 bits, M:
> S: 1
> E: 10010100
> M: 00000000111000100001111
> b. The sign is negative.
> c. The shifter = E - 127 = 148 - 127 = 21.
> d. Denormalization gives us $(1.00000000111000100001111)_2 \times 2^{21}$.
> e. The binary number is $(1000000001110001000011.11)_2$.
> f. The absolute value is 2104378.75.
> g. The number is -2104378.75.

> **Example 3.27**
> The bit pattern 01000011111000000000000000000000 is stored in memory in Excess_127 format. Show the value of the number in decimal notation.
>
> **Solution**
> a. The first bit represents S, the next eight bits E, and the remaining 23 bits, M:
> S: 0
> E: 10000111
> M: 11000000000000000000000
> b. The sign is positive.
> c. The shifter = E - 127 = 135 - 127 = 8.
> d. Denormalization gives us $(1.11000000000000000000000)_2 \times 2^8$.
> e. The binary number is $(111000000.00)_2$.
> f. The absolute value is 448.
> g. The number is +448.

**Overflow and underflow**
In the case of floating-point numbers, we can have both an **overflow** and **underflow**. Figure 3.13 shows the ranges of floating-point representations using 32-bit memory locations (Excess_127). This representation cannot store numbers with very small or very large absolute values. An attempt to store numbers with very small absolute values results in an underflow condition, while an attempt to store numbers with very large absolute values results to an overflow condition. We leave the calculation of boundary values (+largest, -largest, +smallest, and -smallest) as problems.

**Storing zero**
You may have noticed that a real number with an integral part and the fractional part set to zero, that is, 0.0, cannot be stored using the steps discussed above. To handle this special case, it is agreed that in this case the sign, exponent, and the mantissa are set to 0s.

**Truncation errors**
When a real number is stored using floating-point representation, the value of the numbered stored may not be exactly as we expect it to be. For example, assume we need to store the number:
$(1111111111111111.11111111111)_2$
in memory using Excess_127 representation. After normalization, we have:
$(1.11111111111111111111111111)_2$
This means that the mantissa has 26 1s. This mantissa needs to be truncated to 23 1s. In other words, what is stored in the computer is:
$(1.11111111111111111111111)_2$
which means the original number is changed to:
$(1111111111111111.11111111)_2$
with the three 1s at the right of the fractional part truncated. The difference between the original number and what is retrieved is called the **truncation error**. This type of error is very important in areas in which very small or very large numbers are being used, such as calculations in the space industry. In such cases we need to use larger memory locations and other presentations. The IEEE defines other standards with larger mantissas for these purposes.

## 3.3 STORING TEXT
A section of **text** in any language is a sequence of symbols used to represent an idea in that language. For example, the English language uses 26 symbols (A, B, C,…, Z) to represent uppercase letters, 26 symbols (a, b, c, …, z) to represent lowercase letters, ten symbols (0, 1, 2, …, 9) to represent numeric characters (not actual numbers—numbers are treated separately, as we explained in the previous section), and symbols (., ?, :, ; , …, !) to represent punctuation. Other symbols such as blank, newline, and tab are used for text alignment and readability.
We can represent each symbol with a bit pattern. In other words, text such as ‘CATS’, which is made up from four symbols, can be represented as four n-bit patterns, each pattern defining a single symbol (Figure 3.14).

Now the question is: how many bits are needed in a bit pattern to represent a symbol in a language? It depends on how many symbols are in the set used for the language. For example, if we create an imaginary language that uses only English uppercase letters, we need only 26 symbols. A bit pattern in this language needs to represent at least 26 symbols.
For another language, such as Chinese, we may need many more symbols. The length of the bit pattern that represents a symbol in a language depends on the number of symbols used in that language. More symbols mean a longer bit pattern.
Although the length of the bit pattern depends on the number of symbols, the relationship is not linear: it is logarithmic. If we need two symbols, the length is one bit ($\log_2 2$ is 1). If we need four symbols, the length is two bits ($\log_2 4$ is 2). Table 3.3 shows the relationship. A bit pattern of two bits can take four different forms: 00, 01, 10, and 11. Each of these forms can represent a symbol. In the same way, a bit pattern of three bits can take eight different forms: 000, 001, 010, 011, 100, 101, 110, and 111.

**Table 3.3 Number of symbols and bit pattern length**

| Number of symbols | Bit pattern length | Number of symbols | Bit pattern length |
| :--- | :--- | :--- | :--- |
| 2 | 1 | 128 | 7 |
| 4 | 2 | 256 | 8 |
| 8 | 3 | 65536 | 16 |
| 16 | 4 | 4294967296 | 32 |

### 3.3.1 Codes
Different sets of bit patterns have been designed to represent text symbols. Each set is called a **code**, and the process of representing symbols is called **coding**. In this section, we explain the common codes.

**ASCII**
The **American National Standards Institute (ANSI)** developed a code called **American Standard Code for Information Interchange (ASCII)**. This code uses seven bits for each symbol. This means that $2^7 = 128$ different symbols can be defined in this code. The full bit patterns for ASCII code are included in Appendix A. Today ASCII is part of Unicode, which is discussed next.

**Unicode**
A coalition of hardware and software manufacturers have designed a code called **Unicode** that uses 32 bits and can therefore represent up to $2^{32} = 4294967296$ symbols. Different sections of the code are allocated to symbols from different languages in the world. Some parts of the code are used for graphical and special symbols. A brief set of Unicode symbols is listed in Appendix A. ASCII is part of Unicode today.

## 3.4 STORING AUDIO
**Audio** is a representation of sound or music. Audio, by nature, is different from the numbers or text we have discussed so far. Text is composed of countable entities (characters): we can count the number of characters in text. Text is an example of **digital** data. In contrast, audio is not countable. Audio is an entity that changes with time—we can only measure the intensity of the sound at each moment. When we discuss storing audio in computer memory, we mean storing the intensity of an audio signal, such as the signal from a microphone, over a period of time: one second, one hour.
Audio is an example of **analog** data. Even if we are able to measure all its values in a period of time, we cannot store these in the computer’s memory, as we would need an infinite number of memory locations. Figure 3.15 shows the nature of an analog signal, such as audio, that varies with time.

### 3.4.1 Sampling
If we cannot record all the values of an audio signal over an interval, we can record some of them. **Sampling** means that we select only a finite number of points on the analog signal, measure their values, and record them. Figure 3.16 shows a selection of ten samples from the signal: we can then record these values to represent the analog signal.

**Sampling rate**
The next logical question is, how many samples do we need in each second to be able to retrieve a replica of the original signal? The number of samples depends on the maximum number of changes in the analog signal. If the signal is smooth, we need fewer samples: if the signal is changing rapidly, we need more samples. It has been shown that a **sampling rate** of 40000 samples per second is good enough to reproduce an audio signal.

### 3.4.2 Quantization
The value measured for each sample is a real number. This means that we can store 40000 real values for each one second sample. However, it is simpler to use an unsigned number (a bit pattern) for each sample. **Quantization** refers to a process that rounds the value of a sample to the closest integer value. For example, if the real value is 17.2, it can be rounded down to 17: if the value is 17.7, it can be rounded up to 18.

### 3.4.3 Encoding
The next task is encoding. The quantized sample values need to be encoded as bit patterns. Some systems assign positive and negative values to samples, some just shift the curve to the positive part and assign only positive values. In other words, some systems use an unsigned integer to represent a sample, while others use signed integers to do so. However, the signed integers don’t have to be in two’s complement, they can be sign-and-magnitude values. The leftmost bit is used to represent the sign (0 for positive values and 1 for negative values), and the rest of the bits are used to represent the absolute values.

**Bit per sample**
The system needs to decide how many bits should be allocated for each sample. Although in the past only 8 bits were assigned to sound samples, today 16, 24, or even 32 bits per sample is normal. The number of bits per sample is sometimes referred to as the **bit depth**.

**Bit rate**
If we call the bit depth or number of bits per sample B, the number of samples per second, S, we need to store S × B bits for each second of audio. This product is sometimes referred to as **bit rate**, R. For example, if we use 40000 samples per second and 16 bits per sample, the bit rate is R = 40000 × 16 = 640000 bits per second = 640 kilobits per second.

### 3.4.4 Standards for sound encoding
Today the dominant standard for storing audio is **MP3** (short for MPEG Layer 3). This standard is a modification of the **MPEG** (Motion Picture Experts Group) compression method used for video. It uses 44100 samples per second and 16 bits per sample. The result is a signal with a bit rate of 705600 bits per second, which is compressed using a compression method that discards information that cannot be detected by the human ear. This is called lossy compression, as opposed to lossless compression: see Chapter 15.

## 3.5 STORING IMAGES
Images are stored in computers using two different techniques: raster graphics and vector graphics.

### 3.5.1 Raster graphics
**Raster graphics** (or **bitmap graphics**) is used when we need to store an analog image such as a photograph. A photograph consists of analog data, similar to audio information: the difference is that the intensity (color) of data varies in space instead of in time. This means that data must be sampled. However, sampling in this case is normally called **scanning**. The samples are called **pixels** (which stands for **picture elements**). In other words, the whole image is divided into small pixels where each pixel is assumed to have a single intensity value.

**Resolution**
Just like audio sampling, in image scanning we need to decide how many pixels we need to record for each square or linear inch. The scanning rate in image processing is called **resolution**. If the resolution is sufficiently high, the human eye cannot recognize the discontinuity in reproduced images.

**Color depth**
The number of bits used to represent a pixel, its **color depth**, depends on how a pixel’s color is handled by different encoding techniques. The perception of color is how our eyes respond to a beam of light. Our eyes have different types of *photoreceptor* cells: some respond to the three primary colors red, green, and blue (often called **RGB**), while others merely respond to the intensity of light.

**True-Color**
One of the techniques used to encode a pixel is called **True-Color**, which uses 24 bits to encode a pixel. In this technique, each of the three primary colors (RGB) are represented by eight bits. Since an 8-bit pattern can represent a number between 0 to 255 in this technique, each color is represented by three decimal numbers between 0 to 255. Table 3.4 shows the three values for some of the colors in this technique.

**Table 3.4 Some colors defined in True-Color**

| Color | Red | Green | Blue | Color | Red | Green | Blue |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Black | 0 | 0 | 0 | Yellow | 255 | 255 | 0 |
| Red | 255 | 0 | 0 | Cyan | 0 | 255 | 255 |
| Green | 0 | 255 | 0 | Magenta | 255 | 0 | 255 |
| Blue | 0 | 0 | 255 | White | 255 | 255 | 255 |

Note that the True-Color scheme can encode $2^{24}$ or 16776216 colors. In other words, the color intensity of each pixel is one of these values.

**Indexed color**
The True-Color scheme uses more than 16 million colors. Many applications do not need such a large range of colors. The **indexed color**—or **palette color**—scheme uses only a portion of these colors. In this scheme each application selects a few (normally 256) colors from the large set of colors and indexes them, assigning a number between 0 and 255 to each selected color. This is similar to the way in which an artist might have a great many colors in their studio, but at each moment use only a few on their palette. Figure 3.17 illustrates the idea of indexed color.

The use of indexing reduces the number of bits required to store a pixel. For example, in the True-Color scheme 24 bits are needed to store a single pixel. The index color scheme normally uses 256 indexes, which needs only eight bits to store the same pixel. For example, a high-quality digital camera uses almost three million pixels for a 3 × 5 inch photo.
The following shows the number of bits that need to be stored using each scheme:
True-Color: 3000000 × 24 = 72000000
Indexed-Color: 3000000 × 8 = 24000000

**Standards for image encoding**
Several de facto standards for image encoding are in use. **JPEG (Joint Photographic Experts Group)** uses the True-Color scheme, but compresses the image to reduce the number of bits (see Chapter 15). **GIF (Graphic Interchange Format)**, on the other hand, uses the indexed color scheme.

### 3.5.2 Vector graphics
Raster graphics has two disadvantages: the file size is big and rescaling is troublesome. To enlarge a raster graphics image means enlarging the pixels, so the image looks ragged when it is enlarged. The **vector graphic** image encoding method, however, does not store the bit patterns for each pixel. An image is decomposed into a combination of geometrical shapes such as lines, squares, or circles. Each geometrical shape is represented by a mathematical formula. For example, a line may be described by the coordinates of its endpoints, and a circle may be described by the coordinates of its center and the length of its radius. A vector graphic image is made up from a series of commands that defines how these shapes should be drawn.
When the image is to be displayed or printed, the size of the image is given to the system as an input. The system rescales the image to the new size and uses the same formulae to draw the image. In this case, each time an image is drawn, the formulae are reevaluated. For this reason, vector graphics are also called *geometric modeling* or *object-oriented graphics*.

For example, consider a circle of radius r. The main pieces of information a program needs to draw this circle are:
1. The radius r and equation of a circle.
2. The location of the center point of the circle.
3. The stroke line style and color.
4. The fill style and color.

When the size of the circle is changed, the program changes the value of the radius and recalculates the information to draw the circle again. Rescaling does not change the quality of the drawing.

Vector graphics is not suitable for storing the subtleties of photographic images. JPEG or GIF raster graphics provide much better and more vivid pictures. Vector graphics is suitable for applications that use mainly geometric primitives to create images. It is used in applications such as FLASH, and to create TrueType (Microsoft, Apple) and PostScript (Adobe) fonts. Computer-aided design (CAD) also uses vector graphics for engineering drawings.

## 3.6 STORING VIDEO
**Video** is a representation of images (called **frames**) over time. A movie consists of a series of frames shown one after another to create the illusion of motion. In other words, video is the representation of information that changes in space (single image) and in time (a series of images). So, if we know how to store an image inside a computer, we also know how to store video: each image or frame is transformed into a set of bit patterns and stored. The combination of the images then represents the video. Today video is normally compressed. In Chapter 15 we discuss MPEG, a common video compression technique.

## 3.7 END-CHAPTER MATERIALS
### 3.7.1 Recommended reading
For more details about the subjects discussed in this chapter, the following books are recommended:
- Halsall, F. *Multimedia Communication*, Boston, MA: Addison-Wesley, 2001
- Koren, I. *Computer Arithmetic Algorithms*, Natick, MA: A K Peters, 2001
- Long, B. *Complete Digital Photography*, Hignham, MA: Charles River Media, 2003
- Mano, M. *Computer System Architecture*, Upper Saddle River, NJ: Prentice-Hall, 1993
- Miano, J. *Compressed Image File Formats*, Boston, MA: Addison-Wesley, 1999

### 3.7.2 Key terms
- American National Standards Institute (ANSI)
- American Standard Code for Information Interchange (ASCII)
- analog
- audio
- binary digit
- bit
- bit depth
- bitmap graphic
- bit pattern
- bit rate
- byte
- code
- color depth
- digital
- Excess_1023
- Excess_127
- Excess representation
- floating-point representation
- frames
- Graphic Interchange Format (GIF)
- indexed color
- Joint Photographer Experts Group (JPEG)
- mantissa
- MP3
- MPEG
- normalization
- one’s complement
- overflow
- palette color
- picture element
- pixel
- quantization
- raster graphic
- real
- resolution
- RGB
- sampling
- sampling rate
- scanning
- scientific notation
- sign-and-magnitude representation
- text
- text editor
- True-Color
- truncation error
- two’s complement
- two’s complement representation
- underflow
- Unicode
- unsigned integer
- vector graphic
- video

### 3.7.3 Summary
- Data comes in different forms, including numbers, text, audio, image, and video. All data types are transformed into a uniform representation called a bit pattern.
- A number is changed to the binary system before being stored in computer memory. There are several ways to handle the sign. There are two ways to handle the decimal point: fixed-point and floating-point. An integer can be thought of as a number in which the position of the decimal point is fixed: the decimal point is at the right of the least significant bit. An unsigned integer is an integer that can never be negative. One of the methods used to store a signed integer is the sign-and-magnitude format. In this format, the leftmost bit is used to show the sign and the rest of the bits define the magnitude. Sign and magnitude are separated from each other. Almost all computers use the two’s complement representation to store a signed integer in an n-bit memory location. In this method, the available range for unsigned integers is divided into two equal subranges. The first half is used to represent non negative integers, the second half is used to represent negative integers. In two’s complement representation, the leftmost bit defines the sign of the integer, but sign and magnitude are not separated from each other. A real is a number with an integral part and a fractional part. Real numbers are stored in the computer using floating-point representation. In floating-point representation a number is made up of three sections: a sign, a shifter, and a fixed-point number.
- A piece of text in any language is a sequence of symbols. We can represent each symbol with a bit pattern. Different sets of bit patterns (codes) have been designed to represent text symbols. A coalition of hardware and software manufacturers have designed a code called Unicode that uses 32 bits to represent a symbol.
- Audio is a representation of sound or music. Audio is analog data. We cannot record an infinite number of values in an interval, we can only record some samples. The number of samples depends on the maximum number of changes in the analog signal. The values measured for each sample is a real number. Quantization refers to a process that rounds up the sample values to integers.
- Storage of images is done using two different techniques: raster graphics and vector graphics. Raster graphics are used when we need to store an analog image such as a photograph. The image is scanned (sampled) and pixels are stored. In the vector graphic method, an image is decomposed into a combination of geometrical shapes such as lines, squares, or circles. Each geometrical shape is represented by a mathematical formula.
- Video is a representation of images (called frames) in time. A movie is a series of frames shown one after another to create the illusion of continuous motion. In other words, video is the representation of information that changes in space (single image) and in time (a series of images).

## 3.8 PRACTICE SET
### 3.8.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 3.8.2 Review questions
1. Name five types of data that a computer can process.
2. How is bit pattern length related to the number of symbols the bit pattern can represent?
3. How does the bitmap graphic method represent an image as a bit pattern?
4. What is the advantage of the vector graphic method over the bitmap graphic method? What is the disadvantage?
5. What steps are needed to convert audio data to bit patterns?
6. Compare and contrast the representation of positive integers in unsigned, sign-and-magnitude format, and two’s complement format.
7. Compare and contrast the representation of negative integers in sign-and-magnitude and two’s complement format.
8. Compare and contrast the representation of zero in sign-and-magnitude, two’s complement, and Excess formats.
9. Discuss the role of the leftmost bit in sign-and-magnitude, and two’s complement formats.
10. Answer the following questions about floating-point representations of real numbers:
    a. Why is normalization necessary?
    b. What is the mantissa?
    c. After a number is normalized, what kind of information does a computer store in memory?

### 3.8.3 Problems
1. How many distinct 5-bit patterns can we have?
2. In some countries vehicle license plates have two decimal digits (0 to 9). How many distinct plates can we have? If the digit 0 is not allowed on the license plate, how many distinct plates can we have?
3. Redo Problem P3-2 for a license plate that has two digits followed by three uppercase letters (A to Z).
4. A machine has eight different cycles. How many bits are needed to represent each cycle?
5. A student’s grade in a course can be A, B, C, D, F, W (withdraw), or I (incomplete). How many bits are needed to represent the grade?
6. A company has decided to assign a unique bit pattern to each employee. If the company has 900 employees, what is the minimum number of bits needed to create this system of representation? How many patterns are unassigned? If the company hires another 300 employees, should it increase the number of bits? Explain your answer.
7. If we use a 4-bit pattern to represent the digits 0 to 9, how many bit patterns are wasted?
8. An audio signal is sampled 8000 times per second. Each sample is represented by 256 different levels. How many bits per second are needed to represent this signal?
9. Change the following decimal numbers to 8-bit unsigned integers.
    a. 23
    b. 121
    c. 34
    d. 342
10. Change the following decimal numbers to 16-bit unsigned integers.
    a. 41
    b. 411
    c. 1234
    d. 342
11. Change the following decimal numbers to 8-bit two’s complement integers.
    a. −12
    b. −145
    c. 56
    d. 142
12. Change the following decimal numbers to 16-bit two’s complement integers.
    a. 102
    b. −179
    c. 534
    d. 62,056
13. Change the following 8-bit unsigned numbers to decimal.
    a. 01101011
    b. 10010100
    c. 00000110
    d. 01010000
14. Change the following 8-bit two’s complement numbers to decimal.
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
15. The following are two’s complement binary numbers. Show how to change the sign of the number.
    a. 01110111
    b. 11111100
    c. 01110111
    d. 11001110
16. If we apply the two’s complement operation to a number twice, we should get the original number. Apply the two’s complement operation to each of the following numbers and see if we can get the original number.
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
17. Normalize the following binary floating-point numbers. Explicitly show the value of the exponent after normalization.
    a. 1.10001
    b. $2^3 \\times 111.1111$
    c. $2^{-2} \\times 101.110011$
    d. $2^{-5} \\times 101101.00000110011000$
18. Convert the following numbers in 32-bit IEEE format.
    a. $-2^0 \\times 1.10001$
    b. $+2^3 \\times 1.111111$
    c. $+2^{-4} \\times 1.01110011$
    d. $-2^{-5} \\times 1.01101000$
19. Convert the following numbers in 64-bit IEEE format.
    a. $-2^0 \\times 1.10001$
    b. $+2^3 \\times 1.111111$
    c. $+2^{-4} \\times 1.01110011$
    d. $-2^{-5} \\times 1.01101000$
20. Convert the following numbers in 32-bit IEEE format.
    a. 7.1875
    b. −12.640625
    c. 11.40625
    d. −0.375
21. The following are sign-and-magnitude binary numbers in a 8-bit allocation. Convert them to decimal.
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
22. Convert the following decimal integers to sign-and-magnitude with 8-bit allocation.
    a. 53
    b. −107
    c. −5
    d. 154
23. One method of representing signed numbers in a computer is one’s complement representation. In this representation, to represent a positive number, we store the binary number. To represent a negative number, we apply the one’s complement operation on the number. Store the following decimal integers to one’s complement with 8-bit allocation.
    a. 53
    b. −107
    c. −5
    d. 154
24. The following are one’s complement binary numbers in a 8-bit allocation. Convert them to decimal.
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
25. If we apply the one’s complement operation to a number twice, we should get the original number. Apply the one’s complement operation twice to each of the following numbers and see if you can get the original number.
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
26. An alternative method to find the two’s complement of a number is to first take the one’s complement of the number and then add 1 to the result. (Adding binary integers is explained in Chapter 4). Try both methods using the following numbers. Compare and contrast the results.
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
27. The equivalent of one’s complement in the binary system is nine’s complement in the decimal system ($1 = 2 - 1$ and $9 = 10 - 1$). With $n$-digit allocation, we can represent nine’s complement numbers in the range of: $- [(10^n/2) - 1]$ to $+ [(10^n/2 - 1)]$. The nine’s complement of a number with $n$ digit allocation is obtained as follows. If the number is positive, the nine’s complement of the number is itself. If the number is negative, we subtract each digit from 9. Answer the following questions for three-digit allocation:
    a. What is the range of the numbers we can represent using nine’s complement?
    b. In this system, how can we determine the sign of a number?
    c. Do we have two zeros in this system?
    d. If the answer to c. is yes, what is the representation for +0 and -0?
28. Assuming three-digit allocation, find the nine’s complement of the following decimal numbers.
    a. +234
    b. +560
    c. -125
    d. -111
29. The equivalent of two’s complement in the binary system is ten’s complement in the decimal system (in the binary system, 2 is the base, in the decimal system, 10 is the base). Using $n$-digit allocation, we can represent numbers in the range of: $-(10^n/2)$ to $+(10^n/2 - 1)$ in ten’s complement format. The ten’s complement of a number with $n$-digit allocation is obtained by first finding the nine’s complement of the number and then adding 1 to the result. Answer the following questions for three-digit allocation.
    a. What is the range of the numbers we can represent using ten’s complement?
    b. In this system, how can we determine the sign of a number?
    c. Do we have two zeros in this system?
    d. If the answer to c. is yes, what is the representation for +0 and −0?
30. Assuming three-digit allocation, find the ten’s complement of the following decimal numbers.
    a. +234
    b. +560
    c. -125
    d. -111
31. The equivalent of one’s complement in the binary system is fifteen’s complement in the hexadecimal system ($1 = 2 - 1$ and $15 = 16 - 1$).
    a. What range of numbers can we represent with three-digit allocation in fifteen’s complement?
    b. Explain how the fifteen’s complement of a number is obtained in the hexadecimal system.
    c. Do we have two zeros in this system?
    d. If the answer to c. is yes, what is the representation for +0 and −0?
32. Assuming three-digit allocation, find the fifteen’s complement of the following hexadecimal numbers.
    a. +B14
    b. +FE1
    c. -1A
    d. -1E2
33. The equivalent of two’s complement in the binary system is sixteen’s complement in the hexadecimal system.
    a. What range of numbers can we represent with three-digit allocation in sixteen’s complement?
    b. Explain how a sixteen’s complement of a number is obtained in the hexadecimal system.
    c. Do we have two zeros in this system?
    d. If the answer to c. is yes, what is the representation for +0 and −0?
34. Assuming three-digit allocation, find the sixteen’s complement of the following hexadecimal numbers.
    a. +B14
    b. +FE1
    c. −1A
    d. −1E2
`,
  zh: `
# 第三章：資料儲存

如第一章所述，電腦是一種可程式化的資料處理機器。在我們討論處理資料之前，我們需要了解資料的本質。本章我們將討論不同的資料類型以及它們如何儲存在電腦內部。在第四章，我們將展示資料如何在電腦內部被操作。

## 學習目標
學完本章後，學生應能：
- 列舉電腦中使用的五種不同資料類型。
- 描述不同的資料如何以位元模式儲存在電腦內部。
- 描述整數如何使用無符號格式儲存在電腦中。
- 描述整數如何使用符號與數值格式儲存在電腦中。
- 描述整數如何以二的補數格式儲存。
- 描述實數如何使用浮點數格式儲存在電腦中。
- 描述文字如何使用各種編碼系統之一儲存在電腦中。
- 描述音訊如何透過取樣、量化和編碼儲存在電腦中。
- 描述圖像如何使用點陣圖和向量圖形方案儲存在電腦中。
- 描述影像如何以隨時間變化的圖像表示形式儲存在電腦中。

## 3.1 資料類型
今日的資料以不同形式存在，包括數字、文字、音訊、圖像和影像 (圖 3.1)。
人們需要能夠處理許多不同類型的資料：
- 工程程式主要使用電腦來處理數字：進行算術運算、解代數或三角方程式、求微分方程式的根等等。
- 另一方面，文字處理程式主要使用電腦來處理文字：對齊、移動、刪除等等。
- 電腦也處理音訊資料。我們可以在電腦上播放音樂，並可以將聲音錄製為資料。
- 圖像處理程式使用電腦來操作圖像：創建、縮小、擴大、旋轉等等。
- 最後，電腦不僅可以用來放映電影，還可以用來創造電影中看到的特效。

電腦產業使用「多媒體」一詞來定義包含數字、文字、音訊、圖像和影像的資訊。

### 3.1.1 電腦內部的資料
所有資料類型在儲存於電腦時都會被轉換為統一的表示形式，並在檢索時轉換回其原始形式。這種通用表示形式稱為位元模式，稍後將進行討論。

**位元 (Bits)**
**位元**（二進位數字）是電腦中可儲存的最小資料單位，值為 0 或 1。位元代表可以採取兩種狀態之一的設備的狀態。例如，開關可以是開或關。可以建立一個慣例，將「開」狀態表示為 1，「關」狀態表示為 0，反之亦然。這樣，一個開關就可以儲存一位元的資訊。今日，電腦使用各種雙態設備來儲存資料。

**位元模式 (Bit patterns)**
為了表示不同類型的資料，我們使用**位元模式**，即一個序列，或者有時稱為一串位元。圖 3.2 顯示了一個由十六個位元組成的位元模式。它是十六個 0 和 1 的組合。這意味著如果我們需要儲存一個由十六個位元組成的位元模式，我們需要十六個電子開關。如果我們需要儲存 1000 個位元模式，每個十六位元長，我們需要 16000 個開關，依此類推。按照傳統，一個八位元的位元模式稱為一個**位元組 (byte)**。有時術語*字 (word)* 用於指代更長的位元模式。

如圖 3.3 所示，屬於不同資料類型的資料片段可以作為相同的模式儲存在記憶體中。

如果我們正在使用**文字編輯器**（文字處理器），在鍵盤上輸入的字元 A 可以儲存為 8 位元模式 01000001。如果我們正在使用數學例程，相同的 8 位元模式可以表示數字 65。此外，相同的模式可以表示圖像的一部分、歌曲的一部分或電影場景的一部分。電腦的記憶體儲存所有這些，而不識別它們代表什麼類型的資料。

### 3.1.2 資料壓縮
為了佔用更少的記憶體空間，資料通常在儲存到電腦之前進行壓縮。資料壓縮是一個非常廣泛且複雜的主題，因此我們將第 15 章整章專門討論此主題。

### 3.1.3 錯誤偵測與更正
與資料相關的另一個問題是在傳輸或儲存期間錯誤的偵測與更正。我們在附錄 H 中簡要討論此問題。

## 3.2 儲存數字
數字在儲存到電腦記憶體之前會被轉換為二進位系統，如第 2 章所述。但是，仍有兩個問題需要處理：
1.  如何儲存數字的正負號。
2.  如何顯示小數點。

有幾種方法可以處理正負號問題，稍後將在本章討論。對於小數點，電腦使用兩種不同的表示法：定點數和浮點數。第一種用於將數字儲存為整數——沒有小數部分，第二種用於將數字儲存為實數——有小數部分。

### 3.2.1 儲存整數
整數是整數（沒有小數部分的數字）。例如，134 和 -125 是整數，而 134.23 和 -0.235 不是。整數可以被認為是小數點位置固定的數字：小數點位於最低有效（最右邊）位元的右邊。因此，使用**定點數表示法**來儲存整數，如圖 3.4 所示。在這種表示法中，小數點是假設的，但不儲存。

然而，使用者（或程式）可能會將整數儲存為小數部分設為零的實數。例如，如果整數太大而無法儲存在為整數定義的大小中，就可能發生這種情況。為了更有效地利用電腦記憶體，無符號和有符號整數在電腦內部的儲存方式不同。

**整數通常使用定點數表示法儲存在記憶體中。**

#### 無符號表示法
**無符號整數**是永遠不會為負的整數，只能取 0 或正值。其範圍在 0 到正無窮大之間。然而，由於沒有電腦可能表示此範圍內的所有整數，大多數電腦定義了一個稱為*最大無符號整數*的常數，其值為 $(2^n - 1)$，其中 $n$ 是分配用於表示無符號整數的位元數。

**儲存無符號整數**
輸入設備使用以下步驟儲存無符號整數：
1.  整數被轉換為二進位。
2.  如果位元數少於 $n$，則在二進位整數的左邊添加 0，使總共有 $n$ 個位元。如果位元數大於 $n$，則無法儲存該整數。將發生稱為*溢位 (overflow)* 的情況，我們將在稍後討論。

> **範例 3.1**
> 使用無符號表示法將 7 儲存在 8 位元記憶體位置中。
>
> **解答**
> 首先將整數轉換為二進位 $(111)_2$。添加五個 0 以構成總共八個位元 $(00000111)_2$。整數儲存在記憶體位置中。請注意，下標 2 用於強調整數是二進位的，但下標不儲存在電腦中：
> 將 7 轉換為二進位 → 1 1 1
> 在左邊添加五個位元 → 0 0 0 0 0 1 1 1

> **範例 3.2**
> 將 258 儲存在 16 位元記憶體位置中。
>
> **解答**
> 首先將整數轉換為二進位 $(100000010)_2$。添加七個 0 以構成總共十六個位元 $(0000000100000010)_2$。整數儲存在記憶體位置中：
> 將 258 轉換為二進位 → 1 0 0 0 0 0 0 1 0
> 在左邊添加七個位元 → 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0

**檢索無符號整數**
輸出設備從記憶體中檢索位元字串作為位元模式，並將其轉換為無符號十進位整數。

> **範例 3.3**
> 當輸出設備檢索儲存在記憶體中作為無符號整數的位元字串 00101011 時，會回傳什麼？
>
> **解答**
> 使用第 2 章中顯示的程序，二進位整數被轉換為無符號整數 43。

**溢位**
由於大小限制——分配的位元數——可以表示的整數範圍是有限的。在一個 $n$ 位元記憶體位置中，我們只能儲存 0 到 $2^n - 1$ 之間的無符號整數。圖 3.5 顯示了如果我們試圖將大於 $2^4 - 1 = 15$ 的整數儲存在只能容納四個位元的記憶體位置中會發生什麼。這種情況稱為**溢位**，例如，當我們在記憶體位置中儲存了整數 11，然後試圖將 9 加到該整數時，就會發生這種情況。表示十進位 20 所需的最小位元數是五個位元。換句話說，$20 = (10100)_2$，因此電腦丟棄最左邊的位元並保留最右邊的四個位元 $(0100)_2$。當人們看到新整數被印成 4 而不是 20 時，會感到驚訝。圖 3.5 顯示了為什麼會發生這種情況。

**無符號整數的應用**
無符號整數表示法可以提高儲存效率，因為我們不需要儲存整數的符號。這意味著整個位元分配都可以用於儲存數字。只要我們不需要負整數，就可以使用無符號整數表示法。以下列出了一些情況：
- **計數 (Counting)**。當我們計數時，我們不需要負數。我們從 1（有時是 0）開始向上數。
- **定址 (Addressing)**。一些電腦程式將記憶體位置的位址儲存在另一個記憶體位置內。位址是從 0（第一個記憶體位置）開始並上升到代表總記憶體容量的整數的正整數。在這裡，我們也不需要負整數——無符號整數可以輕鬆完成工作。
- **儲存其他資料類型**。其他資料類型（文字、圖像、音訊和視訊），如我們稍後將討論的，儲存為位元模式，可以解釋為無符號整數。

#### 符號與數值表示法
雖然**符號與數值表示法**格式通常不用於儲存整數，但此格式用於儲存電腦中實數的一部分，如下一節所述。因此，我們在此簡要討論這種格式。在這種方法中，無符號整數的可用範圍（$0$ 到 $2^n - 1$）被分為兩個相等的子範圍。前半部分代表正整數，後半部分代表負整數。例如，如果 $n$ 是 4，範圍是 0000 到 1111。此範圍分為兩半：0000 到 0111 和 1000 到 1111（圖 3.6）。然後將位元模式分配給負整數和正整數。請注意，負數出現在正數的右邊，這與關於正數和負數的傳統思維相反。另請注意，我們有兩個 0：正零 (0000) 和負零 (1000)。

以符號與數值格式儲存整數需要 1 個位元來表示符號（0 為正，1 為負）。這意味著在 8 位元分配中，我們只能使用七個位元來表示數字的絕對值（沒有符號的數字）。因此，最大正值是無符號值的一半。可以在 $n$ 位元位置儲存的數字範圍是 $-(2^{n-1} -1)$ 到 $+ (2^{n-1} -1)$。在 $n$ 位元分配中，最左邊的位元專用於儲存符號（0 為正，1 為負）。

**在符號與數值表示法中，最左邊的位元定義整數的符號。如果是 0，整數為正。如果是 1，整數為負。**

> **範例 3.4**
> 使用符號與數值表示法將 +28 儲存在 8 位元記憶體位置中。
>
> **解答**
> 整數被轉換為 7 位元二進位。最左邊的位元設為 0。儲存 8 位元數字：
> 將 28 轉換為 7 位元二進位：0 0 1 1 1 0 0
> 添加符號並儲存：0 0 0 1 1 1 0 0

> **範例 3.5**
> 使用符號與數值表示法將 -28 儲存在 8 位元記憶體位置中。
>
> **解答**
> 整數被轉換為 7 位元二進位。最左邊的位元設為 1。儲存 8 位元數字：
> 將 28 轉換為 7 位元二進位：0 0 1 1 1 0 0
> 添加符號並儲存：1 0 0 1 1 1 0 0

> **範例 3.6**
> 檢索以符號與數值表示法儲存為 01001101 的整數。
>
> **解答**
> 由於最左邊的位元是 0，符號為正。其餘位元 (1001101) 轉換為十進位 77。添加符號後，整數為 +77。

> **範例 3.7**
> 檢索以符號與數值表示法儲存為 10100001 的整數。
>
> **解答**
> 由於最左邊的位元是 1，符號為負。其餘位元 (0100001) 轉換為十進位 33。添加符號後，整數為 -33。

**符號與數值表示法中的溢位**
像無符號整數一樣，有符號整數也會發生溢位。然而，在這種情況下，我們可能會有正溢位和負溢位。圖 3.7 顯示了使用 4 位元記憶體位置以符號與數值表示法儲存整數時的正溢位和負溢位。當我們試圖儲存大於 7 的正整數時，會發生正溢位。例如，假設我們在記憶體位置中儲存了整數 5，然後試圖將 6 加到該整數。我們期望結果是 11，但電腦的回應是 –3。原因是如果我們從循環表示法上的 5 開始，沿順時針方向走六個單位，我們最終會到達 –3。正溢位將整數包裹回範圍內。
當我們試圖儲存小於 –7 的整數時，可能會發生負溢位，例如，如果我們在記憶體中儲存了整數 –5，並試圖從中減去 7。我們期望結果是 –12，但電腦的回應是 +6。原因是如果我們從循環表示法上的 –5 開始，沿逆時針方向走七個單位，我們最終會到達 +6。

**符號與數值表示法中有兩個 0：+0 和 −0。**

**符號與數值表示法的應用**
符號與數值表示法不用於儲存整數。然而，它用於儲存實數的一部分，我們稍後將看到。此外，當我們量化類比信號（如音訊）時，通常使用符號與數值表示法。

#### 二的補數表示法
幾乎所有電腦都使用**二的補數表示法**將有符號整數儲存在 $n$ 位元記憶體位置中。在這種方法中，無符號整數的可用範圍 ($0$ 到 $2^n - 1$) 分為兩個相等的子範圍。第一個子範圍用於表示非負整數，後半部分用於表示負整數。例如，如果 $n$ 是 4，範圍是 0000 到 1111。此範圍分為兩半：0000 到 0111 和 1000 到 1111。兩半被交換以符合負整數在正整數左邊的常見慣例。然後將位元模式分配給負整數和非負（零和正）整數，如圖 3.8 所示。

雖然整數的符號影響儲存的二進位整數中的每個位元，但第一個（最左邊）位元決定了符號。如果最左邊的位元是 0，整數是非負的：如果最左邊的位元是 1，整數是負的。

**在二的補數表示法中，最左邊的位元定義整數的符號。如果是 0，整數為正。如果是 1，整數為負。**

**兩個運算**
在進一步討論此表示法之前，我們需要介紹兩個運算。第一個稱為*一的補數運算*或*取整數的一的補數*。該運算可以應用於任何整數，正數或負數。此運算只是反轉（翻轉）每個位元。0 位元變為 1 位元，1 位元變為 0 位元。

> **範例 3.8**
> 以下顯示我們如何取整數 00110110 的**一的補數**：
> 原始模式：0 0 1 1 0 1 1 0
> 應用一的補數運算後：1 1 0 0 1 0 0 1

> **範例 3.9**
> 以下顯示如果我們應用兩次一的補數運算，我們會得到原始整數：
> 原始模式：0 0 1 1 0 1 1 0
> 一次一的補數：1 1 0 0 1 0 0 1
> 兩次一的補數：0 0 1 1 0 1 1 0

第二個運算稱為*二的補數運算*或*取二進位整數的二的補數*。此運算分兩步完成。首先，我們從右邊複製位元，直到複製了一個 1，然後，我們翻轉其餘的位元。

> **範例 3.10**
> 以下顯示我們如何取整數 00110100 的**二的補數**：
> 原始整數：0 0 1 1 0 1 0 0
> 一次二的補數：1 1 0 0 1 1 0 0

> **範例 3.11**
> 以下顯示如果我們應用兩次二的補數運算，我們總是會得到原始整數：
> 原始整數：0 0 1 1 0 1 0 0
> 一次二的補數：1 1 0 0 1 1 0 0
> 兩次二的補數：0 0 1 1 0 1 0 0

取整數二的補數的另一種方法是先取一的補數，然後將結果加 1（見第 4 章的二進位加法）。

**以二的補數格式儲存整數**
要以二的補數表示法儲存整數，電腦遵循以下步驟：
- 整數的絕對值轉換為 $n$ 位元二進位。
- 如果整數是正數或零，則照原樣儲存：如果是負數，電腦取整數的二的補數然後儲存。

**以二的補數格式檢索整數**
要以二的補數表示法檢索整數，電腦遵循以下步驟：
- 如果最左邊的位元是 1，電腦對整數應用二的補數運算。如果最左邊的位元是 0，則不應用任何運算。
- 電腦將整數轉換為十進位。

> **範例 3.12**
> 使用二的補數表示法將整數 28 儲存在 8 位元記憶體位置中。
>
> **解答**
> 整數是正數（無符號表示正數），因此在十進位轉二進位轉換後不需要更多操作。請注意，在整數左邊添加了三個額外的 0 以使其成為八個位元：
> 將 28 轉換為 8 位元二進位：0 0 0 1 1 1 0 0

> **範例 3.13**
> 使用二的補數表示法將 -28 儲存在 8 位元記憶體位置中。
>
> **解答**
> 整數是負數，因此在轉換為二進位後，電腦對整數應用二的補數運算：
> 將 28 轉換為 8 位元二進位：0 0 0 1 1 1 0 0
> 應用二的補數運算：1 1 1 0 0 1 0 0

> **範例 3.14**
> 檢索以二的補數格式儲存在記憶體中的整數 00001101。
>
> **解答**
> 最左邊的位元是 0，因此符號為正。將整數轉換為十進位並添加符號：
> 最左邊位元是 0。符號為正。0 0 0 0 1 1 0 1
> 整數轉換為十進位：13
> 添加符號：+13

> **範例 3.15**
> 檢索以二的補數格式儲存在記憶體中的整數 11100110。
>
> **解答**
> 最左邊的位元是 1，因此整數是負數。在轉換為十進位之前，需要對整數進行二的補數運算：
> 最左邊位元是 1。符號為負。1 1 1 0 0 1 1 0
> 應用二的補數運算。0 0 0 1 1 0 1 0
> 整數轉換為十進位。26
> 添加符號。-26

關於二的補數的一個非常有趣的點是，在這種表示法中只有一個零。在符號與數值表示法中，有兩個零（+0 和 -0）。

**二的補數表示法中只有一個零。**

**二的補數表示法中的溢位**
像其他表示法一樣，以二的補數格式儲存的整數也會發生溢位。圖 3.9 顯示了在 4 位元記憶體位置中儲存有符號整數時的正溢位和負溢位。當我們試圖儲存大於 7 的正整數時，會發生正溢位。例如，假設我們在記憶體位置中儲存了整數值 5，然後試圖將 6 加到該整數。我們期望結果是 11，但電腦的回應是 –5。原因是如果我們從循環表示法上的 5 開始，沿順時針方向移動六個單位，我們最終會到達 –5。正溢位將整數包裹回範圍內。
當我們試圖儲存小於 –8 的整數時，可能會發生負溢位，例如，如果我們儲存了 –3 並試圖從中減去 7。我們期望結果是 –10，但電腦的回應是 +6。原因是如果我們從 –3 開始，沿逆時針方向走七個單位，我們最終會到達 +6。

**二的補數表示法的應用**
二的補數表示法是當今電腦中儲存整數的標準表示法。在下一章中，當我們看到使用二的補數進行運算的簡單性時，我們就會明白為什麼會這樣。

### 3.2.2 三種系統的比較
表 3.1 顯示了無符號、二的補數和符號與數值整數之間的比較。4 位元記憶體位置可以儲存 0 到 15 之間的無符號整數，同一位置可以儲存 -8 到 +7 之間的二的補數有符號整數。非常重要的一點是，我們以相同的格式儲存和檢索整數。例如，如果整數 13 以有符號格式儲存，則需要以有符號格式檢索：同一整數在二的補數格式中被檢索為 -3。

**表 3.1 整數表示法摘要**

| 記憶體內容 | 無符號 | 符號與數值 | 二的補數 |
| :--- | :--- | :--- | :--- |
| 0000 | 0 | 0 | +0 |
| 0001 | 1 | 1 | +1 |
| 0010 | 2 | 2 | +2 |
| 0011 | 3 | 3 | +3 |
| 0100 | 4 | 4 | +4 |
| 0101 | 5 | 5 | +5 |
| 0110 | 6 | 6 | +6 |
| 0111 | 7 | 7 | +7 |
| 1000 | 8 | -0 | -8 |
| 1001 | 9 | -1 | -7 |
| 1010 | 10 | -2 | -6 |
| 1011 | 11 | -3 | -5 |
| 1100 | 12 | -4 | -4 |
| 1101 | 13 | -5 | -3 |
| 1110 | 14 | -6 | -2 |
| 1111 | 15 | -7 | -1 |

### 3.2.3 儲存實數
**實數**是帶有整數部分和小數部分的數字。例如，23.7 是一個實數——整數部分是 23，小數部分是 7/10。雖然定點數表示法可以用來表示實數，但結果可能不準確，或者可能沒有所需的精度。接下來的兩個範例解釋了原因。

> **範例 3.16**
> 在十進位系統中，假設我們使用定點數表示法，小數點右邊有兩位數，小數點左邊有十四位數，總共十六位數。如果我們試圖表示像 1.00234 這樣的十進位數字，此系統中實數的精度就會喪失：系統將數字儲存為 1.00。

> **範例 3.17**
> 在十進位系統中，假設我們使用定點數表示法，小數點右邊有六位數，小數點左邊有十位數，總共十六位數。如果我們試圖表示像 236154302345.00 這樣的十進位數字，此系統中實數的準確度就會喪失。系統將數字儲存為 6154302345.00：整數部分比它應該有的要小得多。

**具有非常大整數部分或非常小將數部分的實數不應以定點數表示法儲存。**

#### 浮點數表示法
保持準確度或精度的解決方案是使用**浮點數表示法**。這種表示法允許小數點浮動：我們可以在小數點左邊或右邊有不同數量的位數。使用這種方法可以儲存的實數範圍大大增加：具有大整數部分或小將數部分的數字可以儲存在記憶體中。在浮點數表示法中，無論是十進位還是二進位，一個數字由三個部分組成，如圖 3.10 所示。

第一部分是符號，正或負。第二部分顯示小數點應該向右或向左移動多少位以形成實際數字。第三部分是定點數表示法，其中小數點的位置是固定的。

**數字的浮點數表示法由三個部分組成：一個符號、一個移位器和一個定點數。**

浮點數表示法在科學中用於表示非常小或非常大的十進位數字。在這種稱為**科學記數法**的表示法中，定點部分在小數點左邊只有一位數字，移位器是 10 的冪。

> **範例 3.18**
> 以下以科學記數法（浮點數表示法）顯示十進位數字 7425000000000000000000.00：
>
> **解答**
> 實際數字 → + 7425000000000000000000.00
> 科學記數法 → + 7.425 × 10²¹

這三個部分是符號 (+)，移位器 (21) 和定點部分 (7.425)。請注意，移位器是指數。我們可以很容易地看到這點的優勢。即使我們只想將數字寫在紙上，科學記數法也更短，佔用的空間更少。該表示法使用浮點數的概念，因為小數點的位置（在範例中靠近右端）向左移動了 21 位數以構成數字的定點部分。一些程式語言和計算機將數字顯示為 +7.425E21，因為底數 10 是被理解的，不需要提及。

> **範例 3.19**
> 以科學記數法顯示數字 -0.0000000000000232。
>
> **解答**
> 我們使用與前一個範例相同的方法——我們將小數點移動到數字 2 之後，如下所示：
> 實際數字 → - 0.0000000000000232
> 科學記數法 → - 2.32 × 10⁻¹⁴
> 請注意，這裡的指數是負的，因為 2.32 中的小數點需要向左移動（十四個位置）以形成原始數字。同樣，我們可以說這種表示法中的數字由三個部分組成：符號 (-)，實數 (2.32) 和負整數 (-14)。一些程式語言和計算機將此顯示為 -2.32E-14。

類似的方法已用於以二進位表示非常大或非常小的數字（整數和實數），以便儲存在電腦中。

> **範例 3.20**
> 以浮點格式顯示數字 $(101001000000000000000000000000000.00)_2$。
>
> **解答**
> 我們使用相同的想法，只在小數點左邊保留一位數字：
> 實際數字 → + $(101001000000000000000000000000000.00)_2$
> 科學記數法 → + $1.01001 × 2^{32}$

請注意，我們不必擔心最右邊 1 右邊的所有 0，因為當我們使用實數 $(1.01001)_2$ 時，它們並不重要。指數顯示為 32，但它實際上是以二進位儲存在電腦中的，我們稍後會看到。我們還將符號顯示為正，但它將被儲存為一個位元。

> **範例 3.21**
> 以浮點格式顯示數字 $-(0.00000000000000000000000101)_2$。
>
> **解答**
> 我們使用相同的想法，只在小數點左側保留一個非零數字：
> 實際數字 → - $(0.00000000000000000000000101)_2$
> 科學記數法 → - $1.01 × 2^{-24}$
> 請注意，指數在電腦中儲存為負二進位。

**正規化**
為了使表示的定點部分統一，科學方法（對於十進位系統）和浮點方法（對於二進位系統）都在小數點左邊只使用一個非零數字。這稱為**正規化**。在十進位系統中，此數字可以是 1 到 9，而在二進位系統中，它只能是 0 或 1。在下文中，d 是非零數字，x 是數字，y 是 0 或 1：
十進位 ± d.xxxxxxxxxxxxxx（註：d 是 1 到 9，每個 x 是 0 到 9）
二進位 ± 1.yyyyyyyyyyyyyy（註：每個 y 是 0 或 1）

**符號、指數和尾數**
在二進位數字被正規化後，只儲存關於數字的三條資訊：符號、指數和尾數（小數點右邊的位元）。例如，+1000111.0101 變為：
符號：+ (1)
指數：$2^6$ (6)
尾數：$1.0001110101$ ($0001110101$)

**請注意，小數點和定點部分左邊的位元 1 不儲存——它們是隱含的。**

**符號**
數字的符號可以使用 1 個位元（0 或 1）儲存。

**指數**
指數（2 的冪）定義小數點的移位。請注意，冪可以是負數或正數。**超額表示法**（稍後討論）是用於儲存指數的方法。

**尾數**
**尾數**是小數點右邊的二進位整數。它定義了數字的精度。尾數以定點表示法儲存。如果我們將尾數和符號放在一起考慮，我們可以說這種組合是以符號與數值格式儲存的整數。然而，我們需要記住它不是整數——它是一個像整數一樣儲存的小數部分。我們強調這一點是因為在尾數中，如果我們在數字右邊插入額外的 0，值不會改變，而在實整數中，如果我們在數字左邊插入額外的 0，值不會改變。

**尾數是一個小數部分，與符號一起，被視為以符號與數值表示法儲存的整數。**

**超額系統**
尾數可以儲存為無符號整數。指數，即顯示小數點應向左或向右移動多少位元的冪，是有符號數。雖然這可以使用二的補數表示法儲存，但使用了另一種稱為超額系統的表示法。在超額系統中，正整數和負整數都儲存為無符號整數。為了表示正整數或負整數，將一個正整數（稱為偏置）加到每個數字上，將它們均勻地移向非負側。此偏置的值為 $2^{m-1} - 1$，其中 $m$ 是儲存指數的記憶體位置大小。

> **範例 3.22**
> 我們可以在 4 位元分配的數字系統中表示十六個整數。使用一個位置表示 0 並分割其他十五個（不完全均等），我們可以表示 -7 到 8 範圍內的整數，如圖 3.11 所示。透過將七個單位加到此範圍內的每個整數，我們可以將所有整數均勻地向右平移，使它們全部為正，而不改變整數相對於彼此的相對位置，如圖所示。新系統稱為 Excess-7，或偏置值為 7 的偏置表示法。

與平移之前相比，這種新表示法的優點是超額系統中的所有整數都是正的，因此當我們比較或對整數進行運算時，不需要關心符號。對於 4 位元分配，偏置為 $2^{4-1} -1 = 7$，正如我們預期的那樣。

**IEEE 標準**
電機電子工程師學會 (IEEE) 定義了幾種儲存浮點數的標準。我們在此討論最常見的兩種，單精度和雙精度。這些格式如圖 3.12 所示。方框上方的數字是每個欄位的位元數。

**單精度**格式使用總共 32 個位元以浮點數表示法儲存實數。符號佔用一個位元（0 為正，1 為負），指數佔用八個位元（使用 127 的偏置），尾數使用 23 個位元（無符號數）。此標準有時稱為 **Excess_127**，因為偏置為 127。

**雙精度**格式使用總共 64 個位元以浮點數表示法儲存實數。符號佔用一個位元，指數佔用十一個位元（使用 1023 的偏置），尾數使用 52 個位元。此標準有時稱為 **Excess_1023**，因為偏置為 1023。表 3.2 總結了這兩個標準的規格。

**表 3.2 兩個 IEEE 浮點數標準的規格**

| 參數 | 單精度 | 雙精度 |
| :--- | :--- | :--- |
| 記憶體位置大小（位元數） | 32 | 64 |
| 符號大小（位元數） | 1 | 1 |
| 指數大小（位元數） | 8 | 11 |
| 尾數大小（位元數） | 23 | 52 |
| 偏置（整數） | 127 | 1023 |

**IEEE 標準浮點數的儲存**
參考圖 3.12，可以使用以下程序將實數儲存在 IEEE 標準浮點數格式之一中：
- 將符號儲存在 S 中（0 或 1）。
- 將數字轉換為二進位。
- 正規化。
- 找出 E 和 M 的值。
- 連接 S、E 和 M。

> **範例 3.23**
> 顯示十進位數字 5.75 的 Excess_127（單精度）表示法。
>
> **解答**
> a. 符號為正，所以 S = 0。
> b. 十進位轉二進位轉換：5.75 = $(101.11)_2$。
> c. 正規化：$(101.11)_2 = (1.0111)_2 \times 2^2$。
> d. E = 2 + 127 = 129 = $(10000001)_2$，M = 0111。我們需要在 M 的右邊添加 19 個零使其成為 23 位元。
> e. 表示法如下所示：
> S: 0
> E: 10000001
> M: 01110000000000000000000
> 數字在電腦中儲存為 01000000101110000000000000000000。

> **範例 3.24**
> 顯示十進位數字 –161.875 的 Excess_127（單精度）表示法。
>
> **解答**
> a. 符號為負，所以 S = 1。
> b. 十進位轉二進位轉換：161.875 = $(10100001.111)_2$。
> c. 正規化：$(10100001.111)_2 = (1.0100001111)_2 \times 2^7$。
> d. E = 7 + 127 = 134 = $(10000110)_2$ 且 M = $(0100001111)_2$。
> e. 表示法：
> S: 1
> E: 10000110
> M: 01000011110000000000000
> 數字在電腦中儲存為 11000011010000111100000000000000。

> **範例 3.25**
> 顯示十進位數字 –0.0234375 的 Excess_127（單精度）表示法。
>
> **解答**
> a. S = 1（數字為負）。
> b. 十進位轉二進位轉換：0.0234375 = $(0.0000011)_2$。
> c. 正規化：$(0.0000011)_2 = (1.1)_2 \times 2^{-6}$。
> d. E = –6 + 127 = 121 = $(01111001)_2$ 且 M = $(1)_2$。
> e. 表示法：
> S: 1
> E: 01111001
> M: 10000000000000000000000
> 數字在電腦中儲存為 10111100110000000000000000000000。

**檢索以 IEEE 標準浮點格式儲存的數字**
可以使用以下方法檢索儲存在 IEEE 浮點格式之一中的數字：
- 找出 S、E 和 M 的值。
- 如果 S = 0，將符號設為正，否則，將符號設為負。
- 找出移位器 (E - 127)。
- 對尾數進行反正規化。
- 將反正規化的數字轉換為二進位以找出絕對值。
- 添加符號。

> **範例 3.26**
> 位元模式 $(11001010000000000111000100001111)_2$ 以 Excess_127 格式儲存在記憶體中。顯示數字的十進位值是多少。
>
> **解答**
> a. 第一個位元代表 S，接下來的八個位元代表 E，其餘的 23 個位元代表 M：
> S: 1
> E: 10010100
> M: 00000000111000100001111
> b. 符號為負。
> c. 移位器 = E - 127 = 148 - 127 = 21。
> d. 反正規化給出 $(1.00000000111000100001111)_2 \times 2^{21}$。
> e. 二進位數字為 $(1000000001110001000011.11)_2$。
> f. 絕對值為 2104378.75。
> g. 數字為 -2104378.75。

> **範例 3.27**
> 位元模式 01000011111000000000000000000000 以 Excess_127 格式儲存在記憶體中。顯示數字的十進位值。
>
> **解答**
> a. 第一個位元代表 S，接下來的八個位元代表 E，其餘的 23 個位元代表 M：
> S: 0
> E: 10000111
> M: 11000000000000000000000
> b. 符號為正。
> c. 移位器 = E - 127 = 135 - 127 = 8。
> d. 反正規化給出 $(1.11000000000000000000000)_2 \times 2^8$。
> e. 二進位數字為 $(111000000.00)_2$。
> f. 絕對值為 448。
> g. 數字為 +448。

**溢位與下溢**
在浮點數的情況下，我們可能會有**溢位**和**下溢**。圖 3.13 顯示了使用 32 位元記憶體位置 (Excess_127) 的浮點數表示法範圍。此表示法無法儲存絕對值非常小或非常大的數字。試圖儲存絕對值非常小的數字會導致下溢情況，而試圖儲存絕對值非常大的數字會導致溢位情況。我們將邊界值（+最大、-最大、+最小和-最小）的計算留作習題。

**儲存零**
您可能已經注意到，整數部分和將數部分都設為零的實數，即 0.0，無法使用上述步驟儲存。為了處理這種特殊情況，約定在此情況下，符號、指數和尾數都設為 0。

**截斷誤差**
當使用浮點數表示法儲存實數時，儲存的數字值可能不完全是我們期望的那樣。例如，假設我們需要儲存數字：
$(1111111111111111.11111111111)_2$
在記憶體中使用 Excess_127 表示法。正規化後，我們有：
$(1.11111111111111111111111111)_2$
這意味著尾數有 26 個 1。此尾數需要被截斷為 23 個 1。換句話說，儲存在電腦中的是：
$(1.11111111111111111111111)_2$
這意味著原始數字變為：
$(1111111111111111.11111111)_2$
小數部分右邊的三個 1 被截斷。原始數字與檢索到的數字之間的差異稱為**截斷誤差**。這種類型的誤差在使用非常小或非常大數字的領域（如航太工業的計算）中非常重要。在這種情況下，我們需要使用更大的記憶體位置和其他表示法。IEEE 定義了其他具有更大尾數的標準用於這些目的。

## 3.3 儲存文字
任何語言中的一段**文字**都是用來代表該語言中思想的符號序列。例如，英語使用 26 個符號 (A, B, C,…, Z) 代表大寫字母，26 個符號 (a, b, c, …, z) 代表小寫字母，十個符號 (0, 1, 2, …, 9) 代表數字字元（不是實際數字——數字是分開處理的，如前一節所述），以及符號 (., ?, :, ; , …, !) 代表標點符號。其他符號如空白、換行和定位用於文字對齊和可讀性。
我們可以用一個位元模式來表示每個符號。換句話說，像「CATS」這樣的文字，由四個符號組成，可以表示為四個 n 位元模式，每個模式定義一個符號（圖 3.14）。

現在的問題是：表示語言中的一個符號需要多少位元的位元模式？這取決於該語言使用的集合中有多少符號。例如，如果我們創建一個只使用英語大寫字母的想像語言，我們只需要 26 個符號。這種語言中的位元模式至少需要表示 26 個符號。
對於另一種語言，如中文，我們可能需要更多的符號。表示語言中符號的位元模式長度取決於該語言中使用的符號數量。更多符號意味著更長的位元模式。
雖然位元模式的長度取決於符號數量，但這種關係不是線性的：它是對數的。如果我們需要兩個符號，長度是一個位元 ($\log_2 2$ 是 1)。如果我們需要四個符號，長度是兩個位元 ($\log_2 4$ 是 2)。表 3.3 顯示了這種關係。兩個位元的位元模式可以採取四種不同形式：00, 01, 10 和 11。這些形式中的每一種都可以代表一個符號。同樣地，三個位元的位元模式可以採取八種不同形式：000, 001, 010, 011, 100, 101, 110 和 111。

**表 3.3 符號數量與位元模式長度**

| 符號數量 | 位元模式長度 | 符號數量 | 位元模式長度 |
| :--- | :--- | :--- | :--- |
| 2 | 1 | 128 | 7 |
| 4 | 2 | 256 | 8 |
| 8 | 3 | 65536 | 16 |
| 16 | 4 | 4294967296 | 32 |

### 3.3.1 代碼
已經設計了不同的位元模式集來表示文字符號。每個集合稱為一個**代碼**，表示符號的過程稱為**編碼**。在本節中，我們解釋常見的代碼。

**ASCII**
**美國國家標準協會 (ANSI)** 開發了一種稱為**美國資訊交換標準碼 (ASCII)** 的代碼。此代碼為每個符號使用七個位元。這意味著可以在此代碼中定義 $2^7 = 128$ 個不同的符號。ASCII 碼的完整位元模式包含在附錄 A 中。今天 ASCII 是 Unicode 的一部分，接下來將討論 Unicode。

**Unicode**
硬體和軟體製造商聯盟設計了一種稱為 **Unicode** 的代碼，它使用 32 位元，因此可以表示多達 $2^{32} = 4294967296$ 個符號。代碼的不同部分分配給世界不同語言的符號。代碼的某些部分用於圖形和特殊符號。附錄 A 列出了一組簡短的 Unicode 符號。ASCII 是今天 Unicode 的一部分。

## 3.4 儲存音訊
**音訊**是聲音或音樂的表示。從本質上講，音訊與我們目前討論的數字或文字不同。文字由可數的實體（字元）組成：我們可以計算文字中的字元數。文字是**數位**資料的一個例子。相比之下，音訊是不可數的。音訊是隨時間變化的實體——我們只能測量每一時刻的聲音強度。當我們討論在電腦記憶體中儲存音訊時，我們指的是儲存一段時間內（一秒、一小時）音訊信號（例如來自麥克風的信號）的強度。
音訊是**類比**資料的一個例子。即使我們能夠測量一段時間內的所有值，我們也無法將這些儲存在電腦記憶體中，因為我們需要無限數量的記憶體位置。圖 3.15 顯示了隨時間變化的類比信號（如音訊）的性質。

### 3.4.1 取樣
如果我們不能記錄一段間隔內音訊信號的所有值，我們可以記錄其中的一部分。**取樣**意味著我們只選擇類比信號上有限數量的點，測量它們的值並記錄下來。圖 3.16 顯示了從信號中選擇十個樣本：然後我們可以記錄這些值來表示類比信號。

**取樣率**
下一個合乎邏輯的問題是，我們每秒需要多少個樣本才能檢索原始信號的複製品？樣本數取決於類比信號中的最大變化數。如果信號平滑，我們需要較少的樣本：如果信號變化迅速，我們需要更多的樣本。已經證明，每秒 40000 個樣本的**取樣率**足以重現音訊信號。

### 3.4.2 量化
每個樣本測量的值是一個實數。這意味著我們可以為每一秒樣本儲存 40000 個實數值。然而，為每個樣本使用一個無符號數字（位元模式）更簡單。**量化**是指將樣本值四捨五入到最接近整數值的過程。例如，如果實數值是 17.2，它可以向下捨入為 17：如果值是 17.7，它可以向上捨入為 18。

### 3.4.3 編碼
下一個任務是編碼。量化後的樣本值需要被編碼為位元模式。一些系統為樣本分配正值和負值，一些只是將曲線移到正部分並只分配正值。換句話說，一些系統使用無符號整數來表示樣本，而其他系統使用有符號整數。然而，有符號整數不必是二的補數，它們可以是符號與數值。最左邊的位元用於表示符號（0 為正值，1 為負值），其餘位元用於表示絕對值。

**每個樣本的位元數**
系統需要決定應為每個樣本分配多少位元。雖然過去只分配 8 位元給聲音樣本，但今天每個樣本 16、24 甚至 32 位元是正常的。每個樣本的位元數有時稱為**位元深度**。

**位元率**
如果我們稱位元深度或每個樣本的位元數為 B，每秒樣本數為 S，我們需要為每秒音訊儲存 S × B 位元。這個乘積有時稱為**位元率** R。例如，如果我們使用每秒 40000 個樣本和每個樣本 16 位元，位元率是 R = 40000 × 16 = 640000 位元每秒 = 640 kbps。

### 3.4.4 聲音編碼標準
今天儲存音訊的主流標準是 **MP3**（MPEG Layer 3 的縮寫）。此標準是用於視訊的 **MPEG**（動態影像專家小組）壓縮方法的修改版。它使用每秒 44100 個樣本和每個樣本 16 位元。結果是一個位元率為 705600 bps 的信號，該信號使用一種丟棄人耳無法檢測到的資訊的壓縮方法進行壓縮。這稱為失真壓縮，與無損壓縮相對：見第 15 章。

## 3.5 儲存圖像
圖像在電腦中使用兩種不同的技術儲存：點陣圖形和向量圖形。

### 3.5.1 點陣圖形
當我們需要儲存像照片這樣的類比圖像時，使用**點陣圖形**（或**位圖**）。照片由類比資料組成，類似於音訊資訊：不同之處在於資料的強度（顏色）隨空間而不是隨時間變化。這意味著資料必須被取樣。然而，這種情況下的取樣通常稱為**掃描**。樣本稱為**像素**（代表**圖片元素**）。換句話說，整個圖像被劃分為小像素，其中每個像素被假定具有單一強度值。

**解析度**
就像音訊取樣一樣，在圖像掃描中，我們需要決定每平方或線性英吋需要記錄多少像素。圖像處理中的掃描率稱為**解析度**。如果解析度足夠高，人眼無法識別再現圖像中的不連續性。

**色彩深度**
用於表示像素的位元數，即其**色彩深度**，取決於不同編碼技術如何處理像素的顏色。顏色的感知是我們的眼睛對光束的反應。我們的眼睛有不同類型的*感光*細胞：一些對三種原色紅、綠和藍（通常稱為 **RGB**）有反應，而其他僅對光的強度有反應。

**全彩 (True-Color)**
用於編碼像素的技術之一稱為**全彩**，它使用 24 位元來編碼一個像素。在這種技術中，三種原色（RGB）中的每一種都由八個位元表示。由於 8 位元模式可以表示 0 到 255 之間的數字，因此在這種技術中，每種顏色都由三個 0 到 255 之間的十進位數字表示。表 3.4 顯示了這種技術中某些顏色的三個值。

**表 3.4 全彩中定義的一些顏色**

| 顏色 | 紅 | 綠 | 藍 | 顏色 | 紅 | 綠 | 藍 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 黑色 | 0 | 0 | 0 | 黃色 | 255 | 255 | 0 |
| 紅色 | 255 | 0 | 0 | 青色 | 0 | 255 | 255 |
| 綠色 | 0 | 255 | 0 | 洋紅色 | 255 | 0 | 255 |
| 藍色 | 0 | 0 | 255 | 白色 | 255 | 255 | 255 |

請注意，全彩方案可以編碼 $2^{24}$ 或 16776216 種顏色。換句話說，每個像素的顏色強度是這些值之一。

**索引色**
全彩方案使用超過 1600 萬種顏色。許多應用程式不需要如此大範圍的顏色。**索引色**——或**調色盤色**——方案只使用這些顏色的一部分。在這種方案中，每個應用程式從大量顏色集合中選擇少數（通常是 256 種）顏色並對它們進行索引，為每個選定的顏色分配一個 0 到 255 之間的數字。這類似於藝術家可能在工作室中有許多顏色，但在任何時候只在調色盤上使用少數幾種顏色。圖 3.17 說明了索引色的概念。

使用索引減少了儲存像素所需的位元數。例如，在全彩方案中，需要 24 位元來儲存單個像素。索引色方案通常使用 256 個索引，這只需要八個位元來儲存同一個像素。例如，高品質數位相機使用近三百萬像素拍攝 3 × 5 英吋的照片。
以下顯示了使用每種方案需要儲存的位元數：
全彩：3000000 × 24 = 72000000
索引色：3000000 × 8 = 24000000

**圖像編碼標準**
目前使用幾種事實上的圖像編碼標準。**JPEG (聯合圖像專家小組)** 使用全彩方案，但壓縮圖像以減少位元數（見第 15 章）。另一方面，**GIF (圖形交換格式)** 使用索引色方案。

### 3.5.2 向量圖形
點陣圖形有兩個缺點：檔案大小大且重新縮放很麻煩。放大點陣圖形圖像意味著放大像素，因此放大時圖像看起來呈鋸齒狀。然而，**向量圖形**圖像編碼方法不儲存每個像素的位元模式。圖像被分解為幾何形狀的組合，如線條、正方形或圓形。每個幾何形狀由數學公式表示。例如，一條線可以由其端點的坐標描述，圓可以由其中心點的坐標及其半徑長度描述。向量圖形圖像由一系列定義應如何繪製這些形狀的命令組成。
當要顯示或列印圖像時，圖像的大小作為輸入提供給系統。系統將圖像重新縮放到新大小，並使用相同的公式繪製圖像。在這種情況下，每次繪製圖像時，公式都會重新計算。因此，向量圖形也稱為*幾何建模*或*物件導向圖形*。

例如，考慮一個半徑為 r 的圓。程式繪製此圓所需的主要資訊是：
1. 半徑 r 和圓的方程式。
2. 圓中心點的位置。
3. 筆劃線條樣式和顏色。
4. 填充樣式和顏色。

當圓的大小改變時，程式改變半徑的值並重新計算資訊以再次繪製圓。重新縮放不會改變繪圖的品質。

向量圖形不適合儲存攝影圖像的細微差別。JPEG 或 GIF 點陣圖形提供更好、更生動的圖片。向量圖形適用於主要使用幾何圖元創建圖像的應用程式。它用於 FLASH 等應用程式，以及創建 TrueType (Microsoft, Apple) 和 PostScript (Adobe) 字體。電腦輔助設計 (CAD) 也使用向量圖形進行工程繪圖。

## 3.6 儲存影像
**影像**是一段時間內圖像（稱為**影格**）的表示。電影由一系列相繼顯示的影格組成，以產生運動的錯覺。換句話說，影像是隨空間（單一圖像）和時間（一系列圖像）變化的資訊的表示。因此，如果我們知道如何在電腦內儲存圖像，我們也就知道如何儲存影像：每個圖像或影格都被轉換為一組位元模式並儲存起來。圖像的組合隨後代表影像。今天影像通常被壓縮。在第 15 章中，我們討論 MPEG，一種常見的影像壓縮技術。

## 3.7 章末材料
### 3.7.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Halsall, F. *Multimedia Communication*, Boston, MA: Addison-Wesley, 2001
- Koren, I. *Computer Arithmetic Algorithms*, Natick, MA: A K Peters, 2001
- Long, B. *Complete Digital Photography*, Hignham, MA: Charles River Media, 2003
- Mano, M. *Computer System Architecture*, Upper Saddle River, NJ: Prentice-Hall, 1993
- Miano, J. *Compressed Image File Formats*, Boston, MA: Addison-Wesley, 1999

### 3.7.2 關鍵詞
- 美國國家標準協會 (ANSI)
- 美國資訊交換標準碼 (ASCII)
- 類比 (analog)
- 音訊 (audio)
- 二進位數字 (binary digit)
- 位元 (bit)
- 位元深度 (bit depth)
- 點陣圖形 (bitmap graphic)
- 位元模式 (bit pattern)
- 位元率 (bit rate)
- 位元組 (byte)
- 代碼 (code)
- 色彩深度 (color depth)
- 數位 (digital)
- Excess_1023
- Excess_127
- 超額表示法 (Excess representation)
- 浮點數表示法 (floating-point representation)
- 影格 (frames)
- 圖形交換格式 (GIF)
- 索引色 (indexed color)
- 聯合圖像專家小組 (JPEG)
- 尾數 (mantissa)
- MP3
- MPEG
- 正規化 (normalization)
- 一的補數 (one’s complement)
- 溢位 (overflow)
- 調色盤色 (palette color)
- 圖片元素 (picture element)
- 像素 (pixel)
- 量化 (quantization)
- 點陣圖形 (raster graphic)
- 實數 (real)
- 解析度 (resolution)
- RGB
- 取樣 (sampling)
- 取樣率 (sampling rate)
- 掃描 (scanning)
- 科學記數法 (scientific notation)
- 符號與數值表示法 (sign-and-magnitude representation)
- 文字 (text)
- 文字編輯器 (text editor)
- 全彩 (True-Color)
- 截斷誤差 (truncation error)
- 二的補數 (two’s complement)
- 二的補數表示法 (two’s complement representation)
- 下溢 (underflow)
- Unicode
- 無符號整數 (unsigned integer)
- 向量圖形 (vector graphic)
- 影像 (video)

### 3.7.3 摘要
- 資料以不同形式存在，包括數字、文字、音訊、圖像和影像。所有資料類型都被轉換為稱為位元模式的統一表示形式。
- 數字在儲存到電腦記憶體之前被轉換為二進位系統。有幾種方法可以處理符號。有兩種方法可以處理小數點：定點數和浮點數。整數可以被認為是小數點位置固定的數字：小數點位於最低有效位元的右邊。無符號整數是永遠不會為負的整數。用於儲存有符號整數的方法之一是符號與數值格式。在這種格式中，最左邊的位元用於顯示符號，其餘位元定義數值。符號和數值彼此分開。幾乎所有電腦都使用二的補數表示法在 $n$ 位元記憶體位置中儲存有符號整數。在這種方法中，無符號整數的可用範圍分為兩個相等的子範圍。前半部分用於表示非負整數，後半部分用於表示負整數。在二的補數表示法中，最左邊的位元定義整數的符號，但符號和數值沒有彼此分開。實數是具有整數部分和小數部分的數字。實數使用浮點數表示法儲存在電腦中。在浮點數表示法中，數字由三個部分組成：符號、移位器和定點數。
- 任何語言中的一段文字都是符號序列。我們可以用位元模式表示每個符號。已經設計了不同的位元模式集（代碼）來表示文字符號。硬體和軟體製造商聯盟設計了一種稱為 Unicode 的代碼，它使用 32 位元來表示一個符號。
- 音訊是聲音或音樂的表示。音訊是類比資料。我們不能記錄一段間隔內的無限數量的值，我們只能記錄一些樣本。樣本數取決於類比信號中的最大變化數。為每個樣本測量的值是一個實數。量化是指將樣本值四捨五入為整數的過程。
- 圖像的儲存使用兩種不同的技術完成：點陣圖形和向量圖形。當我們需要儲存像照片這樣的類比圖像時，使用點陣圖形。圖像被掃描（取樣）並儲存像素。在向量圖形方法中，圖像被分解為幾何形狀的組合，如線條、正方形或圓形。每個幾何形狀由數學公式表示。
- 影像是時間內的圖像（稱為影格）的表示。電影是一系列相繼顯示的影格，以產生連續運動的錯覺。換句話說，影像是隨空間（單一圖像）和時間（一系列圖像）變化的資訊的表示。

## 3.8 練習題
### 3.8.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 3.8.2 複習問題
1. 列舉電腦可以處理的五種資料類型。
2. 位元模式長度與位元模式可以表示的符號數量有何關係？
3. 點陣圖形方法如何將圖像表示為位元模式？
4. 向量圖形方法相對於點陣圖形方法有什麼優點？缺點是什麼？
5. 將音訊資料轉換為位元模式需要哪些步驟？
6. 比較和對比無符號、符號與數值格式以及二的補數格式中正整數的表示法。
7. 比較和對比符號與數值和二的補數格式中負整數的表示法。
8. 比較和對比符號與數值、二的補數和超額格式中零的表示法。
9. 討論最左邊位元在符號與數值和二的補數格式中的作用。
10. 回答有關實數浮點表示法的以下問題：
    a. 為什麼需要正規化？
    b. 什麼是尾數？
    c. 數字正規化後，電腦在記憶體中儲存什麼樣的資訊？

### 3.8.3 問題
1. 我們可以有多少個不同的 5 位元模式？
2. 在某些國家，車輛牌照有兩個十進位數字（0 到 9）。我們可以有多少個不同的牌照？如果牌照上不允許使用數字 0，我們可以有多少個不同的牌照？
3. 為一個有兩位數字後面跟著三個大寫字母（A 到 Z）的牌照重做問題 P3-2。
4. 一台機器有八個不同的週期。需要多少位元來表示每個週期？
5. 學生在課程中的成績可以是 A、B、C、D、F、W（退選）或 I（未完成）。需要多少位元來表示成績？
6. 一家公司決定為每位員工分配一個唯一的位元模式。如果公司有 900 名員工，創建此表示系統所需的最小位元數是多少？有多少模式未分配？如果公司再僱用 300 名員工，是否應該增加位元數？解釋您的答案。
7. 如果我們使用 4 位元模式來表示數字 0 到 9，有多少位元模式被浪費了？
8. 音訊信號每秒取樣 8000 次。每個樣本由 256 個不同級別表示。表示此信號每秒需要多少位元？
9. 將以下十進位數字更改為 8 位元無符號整數。
    a. 23
    b. 121
    c. 34
    d. 342
10. 將以下十進位數字更改為 16 位元無符號整數。
    a. 41
    b. 411
    c. 1234
    d. 342
11. 將以下十進位數字更改為 8 位元二的補數整數。
    a. −12
    b. −145
    c. 56
    d. 142
12. 將以下十進位數字更改為 16 位元二的補數整數。
    a. 102
    b. −179
    c. 534
    d. 62,056
13. 將以下 8 位元無符號數字更改為十進位。
    a. 01101011
    b. 10010100
    c. 00000110
    d. 01010000
14. 將以下 8 位元二的補數數字更改為十進位。
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
15. 以下是二的補數二進位數字。顯示如何更改數字的符號。
    a. 01110111
    b. 11111100
    c. 01110111
    d. 11001110
16. 如果我們對一個數字應用兩次二的補數運算，我們應該得到原始數字。對以下每個數字應用二的補數運算，看看是否能得到原始數字。
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
17. 正規化以下二進位浮點數。明確顯示正規化後指數的值。
    a. 1.10001
    b. $2^3 \\times 111.1111$
    c. $2^{-2} \\times 101.110011$
    d. $2^{-5} \\times 101101.00000110011000$
18. 將以下數字轉換為 32 位元 IEEE 格式。
    a. $-2^0 \\times 1.10001$
    b. $+2^3 \\times 1.111111$
    c. $+2^{-4} \\times 1.01110011$
    d. $-2^{-5} \\times 1.01101000$
19. 將以下數字轉換為 64 位元 IEEE 格式。
    a. $-2^0 \\times 1.10001$
    b. $+2^3 \\times 1.111111$
    c. $+2^{-4} \\times 1.01110011$
    d. $-2^{-5} \\times 1.01101000$
20. 將以下數字轉換為 32 位元 IEEE 格式。
    a. 7.1875
    b. −12.640625
    c. 11.40625
    d. −0.375
21. 以下是 8 位元分配的符號與數值二進位數字。將它們轉換為十進位。
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
22. 將以下十進位整數轉換為具有 8 位元分配的符號與數值。
    a. 53
    b. −107
    c. −5
    d. 154
23. 電腦中表示有符號數字的一種方法是一的補數表示法。在這種表示法中，為了表示正數，我們儲存二進位數字。為了表示負數，我們對數字應用一的補數運算。將以下十進位整數儲存為具有 8 位元分配的一的補數。
    a. 53
    b. −107
    c. −5
    d. 154
24. 以下是 8 位元分配的一的補數二進位數字。將它們轉換為十進位。
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
25. 如果我們對一個數字應用兩次一的補數運算，我們應該得到原始數字。對以下每個數字應用兩次一的補數運算，看看是否能得到原始數字。
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
26. 找出數字二的補數的另一種方法是先取數字的一的補數，然後將結果加 1。（二進位整數的加法在第 4 章解釋）。對以下數字嘗試這兩種方法。比較和對比結果。
    a. 01110111
    b. 11111100
    c. 01110100
    d. 11001110
27. 二進位系統中一的補數等同於十進位系統中的九的補數（$1 = 2 - 1$ 和 $9 = 10 - 1$）。使用 $n$ 位數分配，我們可以表示範圍在 $- [(10^n/2) - 1]$ 到 $+ [(10^n/2 - 1)]$ 的九的補數數字。具有 $n$ 位數分配的數字的九的補數獲得如下。如果數字為正，數字的九的補數就是它本身。如果數字為負，我們從 9 中減去每個數字。回答有關三位數分配的以下問題：
    a. 我們可以使用九的補數表示的數字範圍是多少？
    b. 在這個系統中，我們如何確定數字的符號？
    c. 我們在這個系統中有兩個零嗎？
    d. 如果 c 的答案是肯定的，+0 和 -0 的表示是什麼？
28. 假設三位數分配，找出以下十進位數字的九的補數。
    a. +234
    b. +560
    c. -125
    d. -111
29. 二進位系統中二的補數等同於十進位系統中的十的補數（在二進位系統中，2 是基底，在十進位系統中，10 是基底）。使用 $n$ 位數分配，我們可以用十的補數格式表示範圍在 $-(10^n/2)$ 到 $+(10^n/2 - 1)$ 的數字。具有 $n$ 位數分配的數字的十的補數是通過首先找到數字的九的補數然後將結果加 1 獲得的。回答有關三位數分配的以下問題。
    a. 我們可以使用十的補數表示的數字範圍是多少？
    b. 在這個系統中，我們如何確定數字的符號？
    c. 我們在這個系統中有兩個零嗎？
    d. 如果 c 的答案是肯定的，+0 和 -0 的表示是什麼？
30. 假設三位數分配，找出以下十進位數字的十的補數。
    a. +234
    b. +560
    c. -125
    d. -111
31. 二進位系統中一的補數等同於十六進位系統中的十五的補數（$1 = 2 - 1$ 和 $15 = 16 - 1$）。
    a. 我們可以用十五的補數和三位數分配表示什麼範圍的數字？
    b. 解釋如何在十六進位系統中獲得數字的十五的補數。
    c. 我們在這個系統中有兩個零嗎？
    d. 如果 c 的答案是肯定的，+0 和 -0 的表示是什麼？
32. 假設三位數分配，找出以下十六進位數字的十五的補數。
    a. +B14
    b. +FE1
    c. -1A
    d. -1E2
33. 二進位系統中二的補數等同於十六進位系統中的十六的補數。
    a. 我們可以用十六的補數和三位數分配表示什麼範圍的數字？
    b. 解釋如何在十六進位系統中獲得數字的十六的補數。
    c. 我們在這個系統中有兩個零嗎？
    d. 如果 c 的答案是肯定的，+0 和 -0 的表示是什麼？
34. 假設三位數分配，找出以下十六進位數字的十六的補數。
    a. +B14
    b. +FE1
    c. −1A
    d. −1E2
`
};
