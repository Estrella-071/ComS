
export const chapter2Content = {
  en: `
# Chapter 2: Number Systems

This chapter is a prelude to Chapters 3 and 4. In Chapter 3 we will show how data is stored inside the computer. In Chapter 4 we will show how logic and arithmetic operations are performed on data. This chapter is a preparation for understanding the contents of Chapters 3 and 4. Readers who know about number systems can skip this chapter and move on to Chapter 3 without loss of continuity. Note that the number systems discussed in this chapter are ‘paper and pencil representations’: we show how these numbers are stored in a computer in Chapter 3.

## Objectives
After studying this chapter, the student should be able to:
- Understand the concept of number systems.
- Distinguish between nonpositional and positional number systems.
- Describe the decimal system (base 10).
- Describe the binary system (base 2).
- Describe the hexadecimal system (base 16).
- Describe the octal system (base 8).
- Convert a number in binary, octal, or hexadecimal to a number in the decimal system.
- Convert a number in the decimal system to a number in binary, octal, or hexadecimal.
- Convert a number in binary to octal and vice versa.
- Convert a number in binary to hexadecimal and vice versa.
- Find the number of digits needed in each system to represent a particular value.

## 2.1 INTRODUCTION
A **number system** (or numeral system) defines how a number can be represented using distinct symbols. A number can be represented differently in different systems. For example, the two numbers (2A)₁₆ and (52)₈ both refer to the same quantity, (42)₁₀, but their representations are different. This is the same as using the words *cheval* (French) and *equus* (Latin) to refer to the same entity, a horse.

As we use symbols (characters) to create words in a language, we use symbols (digits) to represent numbers. However, we know that the number of symbols (characters) in any language is limited. We need to repeat characters and combine them to create words. It is the same for numbers: we have a limited number of symbols (digits) to represent numbers, which means that the digits need to be repeated.

Several number systems have been used in the past and can be categorized into two groups: positional and nonpositional systems. Our main goal is to discuss the positional number systems, but we also give examples of nonpositional systems.

## 2.2 POSITIONAL NUMBER SYSTEMS
In a **positional number system**, the position a symbol occupies in the number determines the value it represents. In this system, a number represented as:

± (Sₖ₋₁ ... S₂ S₁ S₀ . S₋₁ S₋₂ ... S₋ₗ)b

has the value of:

n = ± Sₖ₋₁ × bᵏ⁻¹ + ... + S₁ × b¹ + S₀ × b⁰ + S₋₁ × b⁻¹ + S₋₂ × b⁻² + ... + S₋ₗ × b⁻ˡ

in which S is the set of symbols, b is the **base** (or **radix**), which is equal to the total number of the symbols in the set S, and Sₖ and S₋ₗ are symbols in the whole and fraction parts of the number. Note that we have used an expression that can be extended from the right or from the left. In other words, the power of b can be 0 to K - 1 in one direction and -1 to -L in the other direction. The terms with non-negative powers of b are related to the integral part of the number, while the terms with negative power of b are related to the fractional part of the number. The ± sign shows that the number can be either positive or negative. We will study several positional number systems in this chapter.

### 2.2.1 The decimal system (base 10)
The first positional number system we discuss in this chapter is the **decimal system**. The word *decimal* is derived from the Latin root *decem* (ten). In this system the base b = 10 and we use ten symbols to represent a number. The set of symbols is S = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}. As we know, the symbols in this system are often referred to as **decimal digits** or just digits. In this chapter, we use ± to show that a number can be positive or negative, but remember that these signs are not stored in computers—computers handle the sign differently, as we discuss in Chapter 3.

In the decimal system, a number is written as:

± (Sₖ₋₁ ... S₂ S₁ S₀ . S₋₁ S₋₂ ... S₋ₗ)₁₀

but for simplicity, we often drop the parentheses, the base, and the plus sign (if the number is positive). For example, we write the number +(552.23)₁₀ as 552.23—the base and plus signs are implicit.

**Integers**
An **integer** (an integral number with no fractional part) in the decimal system is familiar to all of us—we use integers in our daily life. In fact, we have used them so much that they are intuitive. We represent an integer as ± Sₖ₋₁ ... S₁ S₀. The value is calculated as:

N = ± Sₖ₋₁ × 10ᵏ⁻¹ + Sₖ₋₂ × 10ᵏ⁻² + ... + S₂ × 10² + S₁ × 10¹ + S₀ × 10⁰

in which Sᵢ is a digit, b = 10 is the base, and K is the number of digits.
Another way to show an integer in a number system is to use **place values**, which are powers of 10 (10⁰, 10¹, ..., 10ᵏ⁻¹) for decimal numbers.

**Example 2.1**
The following shows the place values for the integer +224 in the decimal system:
*   Place values: 10² 10¹ 10⁰
*   Number: 2 2 4
*   Values: N = + 2 × 10² + 2 × 10¹ + 4 × 10⁰

Note that the digit in position 1 has the value 20, but the same digit in position 2 has the value 200. Also note that we normally drop the plus sign, but it is implicit.

**Example 2.2**
The following shows the place values for the decimal number –7508. We have used 1, 10, 100, and 1000 instead of powers of 10:
*   Place values: 1000 100 10 1
*   Number: 7 5 0 8
*   Values: N = – (7 × 1000 + 5 × 100 + 0 × 10 + 8 × 1)

**Maximum value**
Sometimes we need to know the maximum value of a decimal integer that can be represented by K digits. The answer is N_max = 10ᴷ – 1. For example, if K = 5, then the maximum value is N_max = 10⁵ – 1 = 99999.

**Reals**
A **real** (a number with a fractional part) in the decimal system is also familiar. For example, we use this system to show dollars and cents ($23.40). We can represent a real as ± Sₖ₋₁ ... S₁ S₀ . S₋₁ ... S₋ₗ. The value is calculated as:

R = ± Sₖ₋₁ × 10ᵏ⁻¹ + ... + S₁ × 10¹ + S₀ × 10⁰ + S₋₁ × 10⁻¹ + ... + S₋ₗ × 10⁻ˡ

in which Sᵢ is a digit, b = 10 is the base, K is the number of digits in the integral part, and L is the number of digits in the fractional part. The decimal point we use in our representation separates the fractional part from the integral part.

**Example 2.3**
The following shows the place values for the real number +24.13:
*   Place values: 10¹ 10⁰ . 10⁻¹ 10⁻²
*   Number: 2 4 . 1 3
*   Values: R = + 2 × 10 + 4 × 1 + 1 × 0.1 + 3 × 0.01

### 2.2.2 The binary system (base 2)
The second positional number system we discuss in this chapter is the **binary system**. The word *binary* is derived from the Latin root *bini* (or two by two). In this system the base b = 2 and we use only two symbols, S = {0, 1}. The symbols in this system are often referred to as **binary digits** or **bits** (binary digit). As we will see in Chapter 3, data and programs are stored in the computer using binary patterns, a string of bits. This is because the computer is made of electronic switches that can have only two states, on and off. The bit 1 represents one of these two states and the bit 0 the other.

**Integers**
We can represent an integer as ± (Sₖ₋₁ ... S₁ S₀)₂. The value is calculated as:

N = ± Sₖ₋₁ × 2ᵏ⁻¹ + Sₖ₋₂ × 2ᵏ⁻² + ... + S₂ × 2² + S₁ × 2¹ + S₀ × 2⁰

in which Sᵢ is a digit, b = 2 is the base, and K is the number of bits. Another way to show a binary number is to use place values (2⁰, 2¹, ... 2ᵏ⁻¹).

**Example 2.4**
The following shows that the number (11001)₂ in binary is the same as 25 in decimal. The subscript 2 shows that the base is 2:
*   Place values: 2⁴ 2³ 2² 2¹ 2⁰
*   Number: 1 1 0 0 1
*   Decimal: N = 1 × 2⁴ + 1 × 2³ + 0 × 2² + 0 × 2¹ + 1 × 2⁰
Note that the equivalent decimal number is N = 16 + 8 + 0 + 0 + 1 = 25.

**Maximum value**
The maximum value of a binary integer with K digits is N_max = 2ᴷ – 1. For example, if K = 5, then the maximum value is N_max = 2⁵ – 1 = 31.

**Reals**
A real—a number with an optional fractional part—in the binary system can be made of K bits on the left and L bits on the right, ± (Sₖ₋₁ ... S₁ S₀ . S₋₁ ... S₋ₗ)₂. The value can be calculated as:

R = ± Sₖ₋₁ × 2ᵏ⁻¹ x ... x S₁ × 2¹ x S₀ × 2⁰ + S₋₁ × 2⁻¹ + ... + S₋ₗ × 2⁻ˡ

in which Sᵢ is a bit, b = 2 is the base, K is the number of bits to the left, and L is the number of bits to the right of the decimal point. Note that K starts from 0, but L starts from -1. The highest power is K – 1 and the lowest power is -L.

**Example 2.5**
The following shows that the number (101.11)₂ in binary is equal to the number 5.75 in decimal:
*   Place values: 2² 2¹ 2⁰ . 2⁻¹ 2⁻²
*   Number: 1 0 1 . 1 1
*   Values: R = 1 × 2² + 0 × 2¹ + 1 × 2⁰ + 1 × 2⁻¹ + 1 × 2⁻²
Note that the value in the decimal system is R = 4 + 0 + 1 + 0.5 + 0.25 = 5.75.

### 2.2.3 The hexadecimal system (base 16)
Although the binary system is used to store data in computers, it is not convenient for representation of numbers outside the computer, as a number in binary notation is much longer than the corresponding number in decimal notation. However, the decimal system does not show what is stored in the computer as binary directly—there is no obvious relationship between the number of bits in binary and the number of decimal digits. Conversion from one to the other is not fast, as we will see shortly.

To overcome this problem, two positional systems were devised: hexadecimal and octal. We first discuss the hexadecimal system, which is more common. The word **hexadecimal** is derived from the Greek root *hex* (six) and the Latin root *decem* (ten). To be consistent with decimal and binary, it should really have been called *sexadecimal*, from the Latin roots *sex* and *decem*. In this system the base b = 16 and we use 16 symbols to represent a number. The set of symbols is S = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F}. Note that the symbols A, B, C, D, E, F (uppercase or lowercase) are equivalent to 10, 11, 12, 13, 14, and 15 respectively. The symbols in this system are often referred to as **hexadecimal digits**.

**Integers**
We can represent an integer as ± Sₖ₋₁ ... S₁ S₀. The value is calculated as:

N = ± Sₖ₋₁ × 16ᵏ⁻¹ + Sₖ₋₂ × 16ᵏ⁻² + ... + S₂ × 16² + S₁ × 16¹ + S₀ × 16⁰

in which Sᵢ is a digit, b = 16 is the base, and K is the number of digits.
Another way to show a hexadecimal number is to use place values (16⁰, 16¹, ..., 16ᵏ⁻¹).

**Example 2.6**
The following shows that the number (2AE)₁₆ in hexadecimal is equivalent to 686 in decimal:
*   Place values: 16² 16¹ 16⁰
*   Number: 2 A E
*   Values: N = 2 × 16² + 10 × 16¹ + 14 × 16⁰
Note that the value in the decimal system is N = 512 + 160 + 14 = 686.

**Maximum value**
The maximum value of a hexadecimal integer with K digits is N_max = 16ᴷ – 1. For example, if K = 5, then the maximum value is N_max = 16⁵ – 1 = 1048575.

**Reals**
Although a real number can be also represented in the hexadecimal system, it is not very common.

### 2.2.4 The octal system (base 8)
The second system that was devised to show the equivalent of the binary system outside the computer is the **octal system**. The word *octal* is derived from the Latin root *octo* (eight). In this system the base b = 8 and we use eight symbols to represent a number. The set of symbols is S = {0, 1, 2, 3, 4, 5, 6, 7}. The symbols in this system are often referred to as **octal digits**.

**Integers**
We can represent an integer as ± Sₖ₋₁ ... S₁ S₀. The value is calculated as:

N = ± Sₖ₋₁ × 8ᵏ⁻¹ + Sₖ₋₂ × 8ᵏ⁻² + ... + S₂ × 8² + S₁ × 8¹ + S₀ × 8⁰

in which Sᵢ is a digit, b = 8 is the base, and K is the number of digits.
Another way to show an octal number is to use place values (8⁰, 8¹, ..., 8ᵏ⁻¹).

**Example 2.7**
The following shows that the number (1256)₈ in octal is the same as 686 in decimal:
*   Place values: 8³ 8² 8¹ 8⁰
*   Number: 1 2 5 6
*   Values: N = 1 × 8³ + 2 × 8² + 5 × 8¹ + 6 × 8⁰
Note that the decimal number is N = 512 + 128 + 40 + 6 = 686.

**Maximum Value**
The maximum value of an octal integer with K digits is N_max = 8ᴷ – 1. For example, if K = 5, then the maximum value is N_max = 8⁵ – 1 = 32767.

**Reals**
Although a real number can be also represented in the octal system, it is not very common.

### 2.2.5 Summary of the four positional systems
Table 2.1 shows a summary of the four positional number systems discussed in this chapter.

**Table 2.1 Summary of the four positional number systems**
| System | Base | Symbols | Examples |
| :--- | :--- | :--- | :--- |
| Decimal | 10 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | 2345.56 |
| Binary | 2 | 0, 1 | (1001.11)₂ |
| Octal | 8 | 0, 1, 2, 3, 4, 5, 6, 7 | (156.23)₈ |
| Hexadecimal | 16 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F | (A2C.A1)₁₆ |

Table 2.2 shows how the number 15 is represented with two digits in decimal, four digits in binary, two digits in octal, and only one digit in hexadecimal. The hexadecimal representation is definitely the shortest.

**Table 2.2 Comparison of numbers in the four systems**
| Decimal | Binary | Octal | Hexadecimal |
| :--- | :--- | :--- | :--- |
| 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 |
| 2 | 10 | 2 | 2 |
| 3 | 11 | 3 | 3 |
| 4 | 100 | 4 | 4 |
| 5 | 101 | 5 | 5 |
| 6 | 110 | 6 | 6 |
| 7 | 111 | 7 | 7 |
| 8 | 1000 | 10 | 8 |
| 9 | 1001 | 11 | 9 |
| 10 | 1010 | 12 | A |
| 11 | 1011 | 13 | B |
| 12 | 1100 | 14 | C |
| 13 | 1101 | 15 | D |
| 14 | 1110 | 16 | E |
| 15 | 1111 | 17 | F |

### 2.2.6 Conversion
We need to know how to convert a number in one system to the equivalent number in another system. Since the decimal system is more familiar than the other systems, we first show how to covert from any base to decimal. Then we show how to convert from decimal to any base. Finally, we show how we can easily convert from binary to hexadecimal or octal and vice versa.

**Any base to decimal conversion**
This type of conversion is easy and fast. We multiply each digit with its place value in the source system and add the results to get the number in the decimal system.

**Example 2.8**
The following shows how to convert the binary number (110.11)₂ to decimal: (110.11)₂ = 6.75:
*   Binary: 1 1 0 . 1 1
*   Place values: 2² 2¹ 2⁰ . 2⁻¹ 2⁻²
*   Partial results: 4 + 2 + 0 + 0.5 + 0.25
*   Decimal: 6.75

**Example 2.9**
The following shows how to convert the hexadecimal number (1A.23)₁₆ to decimal:
*   Hexadecimal: 1 A . 2 3
*   Place values: 16¹ 16⁰ . 16⁻¹ 16⁻²
*   Partial result: 16 + 10 + 0.125 + 0.012
*   Decimal: 26.137
Note that the result in the decimal notation is not exact, because 3 × 16⁻² = 0.01171875. We have rounded this value to three digits (0.012). In other words, (1A.23)₁₆ ≈ 26.137. When we convert a number in decimal to hexadecimal, we need to specify how many digits we allow to the right of the decimal point.

**Example 2.10**
The following shows how to convert (23.17)₈ to decimal:
*   Octal: 2 3 . 1 7
*   Place values: 8¹ 8⁰ . 8⁻¹ 8⁻²
*   Partial result: 16 + 3 + 0.125 + 0.109
*   Decimal: 19.234
This means that (23.17)₈ ≈ 19.234 in decimal. Again, we have rounded up 7 × 8⁻² = 0.109375.

**Decimal to any base**
We can convert a decimal number to its equivalent in any base. We need two procedures, one for the integral part and one for the fractional part.

**Converting the integral part**
The integral part can be converted using repetitive division. We call the integral part of the decimal number the source and the integral part of the converted number the destination. We first create an empty destination. We then repetitively divide the source to get the quotient and the remainder. The remainder is inserted to the left of the destination. The quotient becomes a new source.

**Example 2.11**
The following shows how to convert 35 in decimal to binary. We start with the number in decimal, we move to the left while continuously finding the quotients and the remainder of division by 2. The result is 35 = (100011)₂:
*   Decimal: 35
*   Divide by 2: 35/2 -> Q=17, R=1
*   Divide by 2: 17/2 -> Q=8, R=1
*   Divide by 2: 8/2 -> Q=4, R=0
*   Divide by 2: 4/2 -> Q=2, R=0
*   Divide by 2: 2/2 -> Q=1, R=0
*   Divide by 2: 1/2 -> Q=0, R=1
*   Binary: 100011

**Example 2.12**
The following shows how to convert 126 in decimal to its equivalent in the octal system. We move to the right while continuously finding the quotients and the remainder of division by 8. The result is 126 = (176)₈:
*   Decimal: 126
*   Divide by 8: 126/8 -> Q=15, R=6
*   Divide by 8: 15/8 -> Q=1, R=7
*   Divide by 8: 1/8 -> Q=0, R=1
*   Octal: 176

**Example 2.13**
The following shows how we convert 126 in decimal to its equivalent in the hexadecimal system. We move to the right while continuously finding the quotients and the remainder of division by 16. The result is 126 = (7E)₁₆:
*   Decimal: 126
*   Divide by 16: 126/16 -> Q=7, R=14 (E)
*   Divide by 16: 7/16 -> Q=0, R=7
*   Hexadecimal: 7E

**Converting the fractional part**
The fractional part can be converted using repetitive multiplication. We call the fractional part of the decimal number the source and the fractional part of the converted number the destination. We first create an empty destination. We then repetitively multiply the source to get the result. The integral part of the result is inserted to the right of the destination, while the fractional part becomes the new source.

**Example 2.14**
Convert the decimal number 0.625 to binary.
Solution: Since the number 0.625 has no integral part, the example shows how the fractional part is calculated. The base here is 2. Write the decimal number at the left corner. Multiply the number continuously by 2 and record the integral and fractional part of the result. The fractional part moves to the right, and the integral part is recorded under each operation. Stop when the fractional part is 0 or there are enough bits. The result is (0.101)₂:
*   0.625 * 2 = 1.25 -> I=1, F=0.25
*   0.25 * 2 = 0.50 -> I=0, F=0.50
*   0.50 * 2 = 1.00 -> I=1, F=0.00
*   Binary: .101

**Example 2.15**
The following shows how to convert 0.634 to octal using a maximum of four digits. The result is 0.634 = (0.5044)₈. Note that we multiply by 8 (base octal):
*   0.634 * 8 = 5.072 -> I=5
*   0.072 * 8 = 0.576 -> I=0
*   0.576 * 8 = 4.608 -> I=4
*   0.608 * 8 = 4.864 -> I=4
*   Octal: .5044

**Example 2.16**
The following shows how to convert 178.6 in decimal to hexadecimal using only one digit to the right of the decimal point. The result is 178.6 = (B2.9)₁₆ Note that we divide or multiply by 16 (base hexadecimal):
*   Integral part 178: 178/16 -> Q=11 (B), R=2 -> B2
*   Fractional part 0.6: 0.6 * 16 = 9.6 -> I=9
*   Hexadecimal: B2.9

**Example 2.17**
An alternative method for converting a small decimal integer (usually less than 256) to binary is to break the number as the sum of numbers that are equivalent to the binary place values. Using this table, we can convert 165 to binary (10100101)₂ as shown below:
165 = 128 + 0 + 32 + 0 + 0 + 4 + 0 + 1 -> 10100101

**Example 2.18**
A similar method can be used to convert a decimal fraction to binary when the denominator is a power of two. Using this table, we convert 27/64 to binary (0.011011)₂ as shown below:
27/64 = 0 + 1/4 + 1/8 + 0 + 1/32 + 1/64 -> 0.011011

**Number of digits**
We often need to know the number of digits before converting a number from decimal to other bases. In a positional number system with base b, we can always find the number of digits of an integer using the relation K = ⌈log_b N⌉, in which ⌈x⌉ means the smallest integer greater than or equal to x (it is also called the ceiling of x), and N is the decimal value of the integer.

**Binary–hexadecimal conversion**
We can easily change a number from binary to hexadecimal and vice versa. The reason is that there is a relationship between the two bases: four bits in binary is one digit in hexadecimal.

**Example 2.19**
Show the hexadecimal equivalent of the binary number (10011100010)₂.
Solution: We first arrange the binary number in 4-bit patterns: 100 1110 0010. Note that the leftmost pattern can have one to four bits. We then use the equivalent of each pattern shown in Table 2.2 in section 2.2.5 to change the number to hexadecimal: (4E2)₁₆.

**Example 2.20**
What is the binary equivalent of (24C)₁₆?
Solution: Each hexadecimal digit is converted to 4-bit patterns: 2 → 0010, 4 → 0100, and C → 1100. The result is (001001001100)₂.

**Binary–octal conversion**
We can easily convert a number from binary to octal and vice versa. The reason is that there is an interesting relationship between the two bases: three bits is one octal digit.

**Example 2.21**
Show the octal equivalent of the binary number (101110010)₂.
Solution: Each group of three bits is translated into one octal digit. The equivalent of each 3‑bit group is shown in Table 2.2 in section 2.2.5. The result is (562)₈.

**Example 2.22**
What is the binary equivalent of for (24)₈?
Solution: Write each octal digit as its equivalent bit pattern to get (010100)₂.

**Octal–hexadecimal conversion**
It is not difficult to convert a number in octal to hexadecimal or vice versa. We can use the binary system as the intermediate system.
*   To convert from octal to hexadecimal, we first convert the number in the octal system to binary. We then rearrange the bits in groups of four bits to find the hexadecimal equivalent.
*   To convert from hexadecimal to octal, we first convert the number in the hexadecimal system to binary. We then rearrange the bits in groups of three to find the octal equivalent.

**Number of digits**
In conversion from one base to another, we often need to know the minimum number of digits we need in the destination system if we know the maximum number of digits in the source system. In general, assume that we are using K digits in base b₁ system. The maximum number we can represent in the source system is b₁ᴷ – 1. The maximum number we can have in the destination system is b₂ˣ – 1. Therefore, b₂ˣ – 1 ≥ b₁ᴷ – 1. This means x ≥ K × (log b₁ / log b₂).

**Example 2.23**
Find the minimum number of binary digits required to store decimal integers with a maximum of six digits.
Solution: K = 6, b₁ = 10, and b₂ = 2. Then x = ⌈6 × (log 10 / log 2)⌉ = ⌈6 × 3.322⌉ = ⌈19.93⌉ = 20.

## 2.3 NONPOSITIONAL NUMBER SYSTEMS
Although nonpositional number systems are not used in computers, we give a short review here for comparison with positional number systems. A **nonpositional number system** still uses a limited number of symbols in which each symbol has a value. However, the position a symbol occupies in the number normally bears no relation to its value—the value of each symbol is fixed. To find the value of a number, we add the value of all symbols present in the representation.

**Example 2.24**
The **Roman number system** is a good example of a nonpositional number system. This system was invented by the Romans and was used until the sixteenth century in Europe. Roman numerals are still used in sports events, clock dials, and other applications. This number system has a set of symbols S = {I, V, X, L, C, D, M}. The values of each symbol are shown in Table 2.3.

**Table 2.3 Values of symbols in the Roman number system**
| Symbol | I | V | X | L | C | D | M |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Value | 1 | 5 | 10 | 50 | 100 | 500 | 1000 |

To find the value of a number, we need to add the value of symbols subject to specific rules:
1.  When a symbol with a smaller value is placed after a symbol having an equal or larger value, the values are added.
2.  When a symbol with a smaller value is placed before a symbol having a larger value, the smaller value is subtracted from the larger one.
3.  A symbol S₁ cannot come before another symbol S₂ if S₁ ≤ 10 × S₂. For example, I or V cannot come before C.
4.  For large numbers a bar is placed above any of the six symbols (all symbols except I) to express multiplication by 1000. For example, V̅ = 5000 and M̅ = 1000000.
5.  Although Romans used the word *nulla* (nothing) to convey the concept of zero, the Roman numerals lack a zero digit in their system.

The following shows some Roman numbers and their values:
*   III → 1 + 1 + 1 = 3
*   IV → 5 – 1 = 4
*   VIII → 5 + 1 + 1 + 1 = 8
*   XVIII → 10 + 5 + 1 + 1 + 1 = 18
*   XIX → 10 + (10 – 1) = 19
*   LXXII → 50 + 10 + 10 + 1 + 1 = 72
*   CI → 100 + 1 = 101
*   MMVII → 1000 + 1000 + 5 + 1 + 1 = 2007
*   MDC → 1000 + 500 + 100 = 1600

## 2.4 END-CHAPTER MATERIALS
### 2.4.1 Recommended reading
For more details about the subjects discussed in this chapter, the following books are recommended:
*   Stalling, W. *Computer Organization and Architecture*, Upper Saddle River, NJ: Prentice-Hall, 2000
*   Mano, M. *Computer System Architecture*, Upper Saddle River, NJ: Prentice-Hall, 1993
*   Null, L. and Lobur, J. *Computer Organization and Architecture*, Sudbury, MA: Jones and Bartlett, 2003
*   Brown, S. and Vranesic, Z. *Fundamentals of Digital Logic with Verilog Design*, New York: McGraw-Hill, 2003

### 2.4.2 Key terms
*   base
*   binary digit
*   binary system
*   bit
*   decimal digit
*   decimal system
*   hexadecimal digit
*   hexadecimal system
*   integer
*   nonpositional number system
*   number system
*   octal digit
*   octal system
*   place value
*   positional number system
*   radix
*   real
*   Roman number system

### 2.4.3 Summary
*   A number system (or numeral system) is a system that uses distinct symbols to represent a number. In a positional number system, the position a symbol occupies in the number determines the value it represents. Each position has a place value associated with it. A nonpositional number system uses a limited number of symbols in which each symbol has a value. However, the position a symbol occupies in the number normally bears no relation to its value: the value of each symbol is normally fixed.
*   In the decimal system, the base b = 10 and we use ten symbols to represent numbers. The symbols in this system are often referred to as decimal digits or just digits. In the binary system, the base b = 2 and we use only two symbols to represent numbers. The symbols in this system are often referred to as binary digits or bits. In a hexadecimal system, the base = 16 and we use 16 symbols to represent numbers. The symbols in this system are often referred to as hexadecimal digits. In an octal system, the base b = 8 and we use eight symbols to represent numbers. The symbols in this system are often referred to as octal digits.
*   We can convert a number in any system to decimal. We multiply each digit with its place value in the source system and add the result to get the number in the decimal system. We can convert a decimal number to its equivalent in any base using two different procedures, one for the integral part and one for the fractional part. The integral part needs repeated division and the fraction part needs repeated multiplication.
*   Conversion from the binary system to the hexadecimal system and from the hexadecimal system to the binary system is very easy, because four bits in the binary system are represented as one digit in the hexadecimal system.
*   Conversion from the binary system to the octal system and from the octal system to the binary system is very easy, because three bits in the binary system are represented as one digit in the octal system.
`,
  zh: `
# 第二章：數字系統

本章是第三章和第四章的前奏。在第三章中，我們將展示資料如何儲存在電腦內部。在第四章中，我們將展示如何在資料上執行邏輯和算術運算。本章是為了理解第三章和第四章內容所做的準備。已經了解數字系統的讀者可以跳過本章，直接進入第三章，不會影響連貫性。請注意，本章討論的數字系統是「紙筆表示法」：我們將在第三章展示這些數字如何儲存在電腦中。

## 學習目標
學完本章後，學生應能：
- 理解數字系統的概念。
- 區分非進位制和進位制數字系統。
- 描述十進位系統（基底為 10）。
- 描述二進位系統（基底為 2）。
- 描述十六進位系統（基底為 16）。
- 描述八進位系統（基底為 8）。
- 將二進位、八進位或十六進位的數字轉換為十進位數字。
- 將十進位數字轉換為二進位、八進位或十六進位的數字。
- 將二進位數字轉換為八進位，反之亦然。
- 將二進位數字轉換為十六進位，反之亦然。
- 計算在各系統中表示特定值所需的位數。

## 2.1 簡介
**數字系統**（或計數系統）定義了如何使用不同的符號來表示一個數字。一個數字在不同的系統中可以有不同的表示方式。例如，兩個數字 (2A)₁₆ 和 (52)₈ 都指代相同的數量 (42)₁₀，但它們的表示方式不同。這就像使用 *cheval*（法語）和 *equus*（拉丁語）來指代同一個實體——馬。

就像我們使用符號（字元）在語言中創造單詞一樣，我們使用符號（數字）來表示數字。然而，我們知道任何語言中的符號（字元）數量是有限的。我們需要重複字元並將它們組合起來創造單詞。數字也是如此：我們用來表示數字的符號（數字）數量有限，這意味著數字需要被重複使用。

過去曾使用過多種數字系統，可分為兩類：進位制和非進位制系統。我們的主要目標是討論進位制數字系統，但我們也會給出非進位制系統的例子。

## 2.2 進位制數字系統
在**進位制數字系統**中，符號在數字中所佔的位置決定了它所代表的值。在這個系統中，一個表示為：

± (Sₖ₋₁ ... S₂ S₁ S₀ . S₋₁ S₋₂ ... S₋ₗ)b

的數字，其值為：

n = ± Sₖ₋₁ × bᵏ⁻¹ + ... + S₁ × b¹ + S₀ × b⁰ + S₋₁ × b⁻¹ + S₋₂ × b⁻² + ... + S₋ₗ × b⁻ˡ

其中 S 是符號集合，b 是**基底**（或**底數**），它等於集合 S 中符號的總數，Sₖ 和 S₋ₗ 是數字的整數和小數部分的符號。請注意，我們使用了一個可以向右或向左擴展的表達式。換句話說，b 的冪次在一個方向上可以是 0 到 K - 1，在另一個方向上可以是 -1 到 -L。b 的非負冪次項與數字的整數部分有關，而 b 的負冪次項與數字的小數部分有關。± 符號表示數字可以是正數或負數。我們將在本章學習幾種進位制數字系統。

### 2.2.1 十進位系統（基底為 10）
我們在本章討論的第一個進位制數字系統是**十進位系統**。「decimal」一詞源於拉丁詞根 *decem*（十）。在這個系統中，基底 b = 10，我們使用十個符號來表示數字。符號集合為 S = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}。如我們所知，這個系統中的符號通常被稱為**十進位數字**或簡稱數字。在本章中，我們使用 ± 來表示數字可以是正數或負數，但請記住，這些符號並不儲存在電腦中——電腦以不同的方式處理符號，我們將在第 3 章討論。

在十進位系統中，一個數字寫作：

± (Sₖ₋₁ ... S₂ S₁ S₀ . S₋₁ S₋₂ ... S₋ₗ)₁₀

但為了簡單起見，我們通常省略括號、基底和加號（如果數字是正數）。例如，我們將數字 +(552.23)₁₀ 寫作 552.23——基底和加號是隱含的。

**整數**
十進位系統中的**整數**（沒有小數部分的整數）對我們所有人來說都很熟悉——我們在日常生活中使用整數。事實上，我們使用它們太多了，以至於它們變得很直觀。我們將整數表示為 ± Sₖ₋₁ ... S₁ S₀。其值計算如下：

N = ± Sₖ₋₁ × 10ᵏ⁻¹ + Sₖ₋₂ × 10ᵏ⁻² + ... + S₂ × 10² + S₁ × 10¹ + S₀ × 10⁰

其中 Sᵢ 是一個數字，b = 10 是基底，K 是位數。
在數字系統中顯示整數的另一種方法是使用**位值**，對於十進位數字來說，就是 10 的冪次（10⁰, 10¹, ..., 10ᵏ⁻¹）。

**範例 2.1**
以下顯示了十進位整數 +224 的位值：
*   位值：10² 10¹ 10⁰
*   數字：2 2 4
*   值：N = + 2 × 10² + 2 × 10¹ + 4 × 10⁰

請注意，位置 1 的數字值為 20，但位置 2 的相同數字值為 200。另請注意，我們通常省略加號，但它是隱含的。

**範例 2.2**
以下顯示了十進位數字 –7508 的位值。我們使用了 1, 10, 100, 1000 代替 10 的冪次：
*   位值：1000 100 10 1
*   數字：7 5 0 8
*   值：N = – (7 × 1000 + 5 × 100 + 0 × 10 + 8 × 1)

**最大值**
有時我們需要知道由 K 位數表示的十進位整數的最大值。答案是 N_max = 10ᴷ – 1。例如，如果 K = 5，則最大值為 N_max = 10⁵ – 1 = 99999。

**實數**
十進位系統中的**實數**（帶有小數部分的數字）也很常見。例如，我們使用這個系統來顯示美元和美分 ($23.40)。我們可以將實數表示為 ± Sₖ₋₁ ... S₁ S₀ . S₋₁ ... S₋ₗ。其值計算如下：

R = ± Sₖ₋₁ × 10ᵏ⁻¹ + ... + S₁ × 10¹ + S₀ × 10⁰ + S₋₁ × 10⁻¹ + ... + S₋ₗ × 10⁻ˡ

其中 Sᵢ 是一個數字，b = 10 是基底，K 是整數部分的位數，L 是小數部分的位數。我們在表示中使用的小數點將小數部分與整數部分分開。

**範例 2.3**
以下顯示了實數 +24.13 的位值：
*   位值：10¹ 10⁰ . 10⁻¹ 10⁻²
*   數字：2 4 . 1 3
*   值：R = + 2 × 10 + 4 × 1 + 1 × 0.1 + 3 × 0.01

### 2.2.2 二進位系統（基底為 2）
我們在本章討論的第二個進位制數字系統是**二進位系統**。「binary」一詞源於拉丁詞根 *bini*（或二乘二）。在這個系統中，基底 b = 2，我們只使用兩個符號 S = {0, 1}。這個系統中的符號通常被稱為**二進位數字**或**位元** (bit)。正如我們將在第 3 章中看到的，資料和程式使用二進位模式（一串位元）儲存在電腦中。這是因為電腦由只能有兩種狀態（開和關）的電子開關組成。位元 1 代表這兩種狀態之一，位元 0 代表另一種。

**整數**
我們可以將整數表示為 ± (Sₖ₋₁ ... S₁ S₀)₂。其值計算如下：

N = ± Sₖ₋₁ × 2ᵏ⁻¹ + Sₖ₋₂ × 2ᵏ⁻² + ... + S₂ × 2² + S₁ × 2¹ + S₀ × 2⁰

其中 Sᵢ 是一個數字，b = 2 是基底，K 是位元數。顯示二進位數字的另一種方法是使用位值（2⁰, 2¹, ... 2ᵏ⁻¹）。

**範例 2.4**
以下顯示二進位數字 (11001)₂ 與十進位數字 25 相同。下標 2 表示基底為 2：
*   位值：2⁴ 2³ 2² 2¹ 2⁰
*   數字：1 1 0 0 1
*   十進位：N = 1 × 2⁴ + 1 × 2³ + 0 × 2² + 0 × 2¹ + 1 × 2⁰
請注意，等價的十進位數字是 N = 16 + 8 + 0 + 0 + 1 = 25。

**最大值**
具有 K 位數的二進位整數的最大值是 N_max = 2ᴷ – 1。例如，如果 K = 5，則最大值為 N_max = 2⁵ – 1 = 31。

**實數**
二進位系統中的實數——帶有可選小數部分的數字——可以由左邊的 K 個位元和右邊的 L 個位元組成，即 ± (Sₖ₋₁ ... S₁ S₀ . S₋₁ ... S₋ₗ)₂。其值計算如下：

R = ± Sₖ₋₁ × 2ᵏ⁻¹ x ... x S₁ × 2¹ x S₀ × 2⁰ + S₋₁ × 2⁻¹ + ... + S₋ₗ × 2⁻ˡ

其中 Sᵢ 是一個位元，b = 2 是基底，K 是小數點左邊的位元數，L 是小數點右邊的位元數。請注意，K 從 0 開始，但 L 從 -1 開始。最高冪次是 K – 1，最低冪次是 -L。

**範例 2.5**
以下顯示二進位數字 (101.11)₂ 等於十進位數字 5.75：
*   位值：2² 2¹ 2⁰ . 2⁻¹ 2⁻²
*   數字：1 0 1 . 1 1
*   值：R = 1 × 2² + 0 × 2¹ + 1 × 2⁰ + 1 × 2⁻¹ + 1 × 2⁻²
請注意，十進位系統中的值是 R = 4 + 0 + 1 + 0.5 + 0.25 = 5.75。

### 2.2.3 十六進位系統（基底為 16）
雖然二進位系統用於在電腦中儲存資料，但它不便於在電腦外部表示數字，因為二進位表示法的數字比相應的十進位表示法長得多。然而，十進位系統並不能直接顯示電腦中儲存的二進位內容——二進位位數和十進位位數之間沒有明顯的關係。從一種轉換到另一種並不快，我們稍後會看到。

為了克服這個問題，設計了兩種進位制系統：十六進位和八進位。我們首先討論較常見的十六進位系統。**十六進位**（Hexadecimal）一詞源於希臘詞根 *hex*（六）和拉丁詞根 *decem*（十）。為了與十進位和二進位保持一致，它實際上應該被稱為 *sexadecimal*，源自拉丁詞根 *sex* 和 *decem*。在這個系統中，基底 b = 16，我們使用 16 個符號來表示數字。符號集合為 S = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F}。請注意，符號 A, B, C, D, E, F（大寫或小寫）分別相當於 10, 11, 12, 13, 14 和 15。這個系統中的符號通常被稱為**十六進位數字**。

**整數**
我們可以將整數表示為 ± Sₖ₋₁ ... S₁ S₀。其值計算如下：

N = ± Sₖ₋₁ × 16ᵏ⁻¹ + Sₖ₋₂ × 16ᵏ⁻² + ... + S₂ × 16² + S₁ × 16¹ + S₀ × 16⁰

其中 Sᵢ 是一個數字，b = 16 是基底，K 是位數。
顯示十六進位數字的另一種方法是使用位值（16⁰, 16¹, ..., 16ᵏ⁻¹）。

**範例 2.6**
以下顯示十六進位數字 (2AE)₁₆ 等於十進位數字 686：
*   位值：16² 16¹ 16⁰
*   數字：2 A E
*   值：N = 2 × 16² + 10 × 16¹ + 14 × 16⁰
請注意，十進位系統中的值是 N = 512 + 160 + 14 = 686。

**最大值**
具有 K 位數的十六進位整數的最大值是 N_max = 16ᴷ – 1。例如，如果 K = 5，則最大值為 N_max = 16⁵ – 1 = 1048575。

**實數**
雖然實數也可以在十六進位系統中表示，但這不是很常見。

### 2.2.4 八進位系統（基底為 8）
第二個為在電腦外部顯示二進位系統等價值而設計的系統是**八進位系統**。*Octal* 一詞源於拉丁詞根 *octo*（八）。在這個系統中，基底 b = 8，我們使用八個符號來表示數字。符號集合為 S = {0, 1, 2, 3, 4, 5, 6, 7}。這個系統中的符號通常被稱為**八進位數字**。

**整數**
我們可以將整數表示為 ± Sₖ₋₁ ... S₁ S₀。其值計算如下：

N = ± Sₖ₋₁ × 8ᵏ⁻¹ + Sₖ₋₂ × 8ᵏ⁻² + ... + S₂ × 8² + S₁ × 8¹ + S₀ × 8⁰

其中 Sᵢ 是一個數字，b = 8 是基底，K 是位數。
顯示八進位數字的另一種方法是使用位值（8⁰, 8¹, ..., 8ᵏ⁻¹）。

**範例 2.7**
以下顯示八進位數字 (1256)₈ 與十進位數字 686 相同：
*   位值：8³ 8² 8¹ 8⁰
*   數字：1 2 5 6
*   值：N = 1 × 8³ + 2 × 8² + 5 × 8¹ + 6 × 8⁰
請注意，十進位數字是 N = 512 + 128 + 40 + 6 = 686。

**最大值**
具有 K 位數的八進位整數的最大值是 N_max = 8ᴷ – 1。例如，如果 K = 5，則最大值為 N_max = 8⁵ – 1 = 32767。

**實數**
雖然實數也可以在八進位系統中表示，但這不是很常見。

### 2.2.5 四種進位制系統摘要
表 2.1 顯示了本章討論的四種進位制數字系統的摘要。

**表 2.1 四種進位制數字系統摘要**
| 系統 | 基底 | 符號 | 範例 |
| :--- | :--- | :--- | :--- |
| 十進位 | 10 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | 2345.56 |
| 二進位 | 2 | 0, 1 | (1001.11)₂ |
| 八進位 | 8 | 0, 1, 2, 3, 4, 5, 6, 7 | (156.23)₈ |
| 十六進位 | 16 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F | (A2C.A1)₁₆ |

表 2.2 顯示了數字 15 如何在十進位中用兩位數表示，在二進位中用四位數，在八進位中用兩位數，而在十六進位中僅用一位數表示。十六進位表示法無疑是最短的。

**表 2.2 四種系統中的數字比較**
| 十進位 | 二進位 | 八進位 | 十六進位 |
| :--- | :--- | :--- | :--- |
| 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 |
| 2 | 10 | 2 | 2 |
| 3 | 11 | 3 | 3 |
| 4 | 100 | 4 | 4 |
| 5 | 101 | 5 | 5 |
| 6 | 110 | 6 | 6 |
| 7 | 111 | 7 | 7 |
| 8 | 1000 | 10 | 8 |
| 9 | 1001 | 11 | 9 |
| 10 | 1010 | 12 | A |
| 11 | 1011 | 13 | B |
| 12 | 1100 | 14 | C |
| 13 | 1101 | 15 | D |
| 14 | 1110 | 16 | E |
| 15 | 1111 | 17 | F |

### 2.2.6 轉換
我們需要知道如何將一個系統中的數字轉換為另一個系統中的等價數字。由於十進位系統比其他系統更熟悉，我們首先展示如何從任意基底轉換為十進位。然後我們展示如何從十進位轉換為任意基底。最後，我們展示如何輕鬆地將二進位轉換為十六進位或八進位，反之亦然。

**任意基底轉十進位**
這種類型的轉換既簡單又快速。我們將每個數字與其在來源系統中的位值相乘，並將結果相加，得到十進位系統中的數字。

**範例 2.8**
以下顯示如何將二進位數字 (110.11)₂ 轉換為十進位：(110.11)₂ = 6.75：
*   二進位：1 1 0 . 1 1
*   位值：2² 2¹ 2⁰ . 2⁻¹ 2⁻²
*   部分結果：4 + 2 + 0 + 0.5 + 0.25
*   十進位：6.75

**範例 2.9**
以下顯示如何將十六進位數字 (1A.23)₁₆ 轉換為十進位：
*   十六進位：1 A . 2 3
*   位值：16¹ 16⁰ . 16⁻¹ 16⁻²
*   部分結果：16 + 10 + 0.125 + 0.012
*   十進位：26.137
請注意，十進位表示法中的結果並不精確，因為 3 × 16⁻² = 0.01171875。我們將此值四捨五入到小數點後三位 (0.012)。換句話說，(1A.23)₁₆ ≈ 26.137。當我們將十進位數字轉換為十六進位時，我們需要指定允許小數點右邊有多少位數。

**範例 2.10**
以下顯示如何將 (23.17)₈ 轉換為十進位：
*   八進位：2 3 . 1 7
*   位值：8¹ 8⁰ . 8⁻¹ 8⁻²
*   部分結果：16 + 3 + 0.125 + 0.109
*   十進位：19.234
這意味著 (23.17)₈ ≈ 19.234 (十進位)。同樣，我們將 7 × 8⁻² = 0.109375 向上取整。

**十進位轉任意基底**
我們可以將十進位數字轉換為其在任意基底中的等價值。我們需要兩個程序，一個用於整數部分，一個用於小數部分。

**轉換整數部分**
整數部分可以使用重複除法轉換。我們將十進位數字的整數部分稱為來源，轉換後數字的整數部分稱為目的地。我們先建立一個空的目的地。然後我們重複地除以來源以獲得商和餘數。餘數被插入到目的地的左邊。商成為新的來源。

**範例 2.11**
以下顯示如何將十進位 35 轉換為二進位。我們從十進位數字開始，向左移動，同時不斷找出除以 2 的商和餘數。結果是 35 = (100011)₂：
*   十進位：35
*   除以 2：35/2 -> 商=17, 餘=1
*   除以 2：17/2 -> 商=8, 餘=1
*   除以 2：8/2 -> 商=4, 餘=0
*   除以 2：4/2 -> 商=2, 餘=0
*   除以 2：2/2 -> 商=1, 餘=0
*   除以 2：1/2 -> 商=0, 餘=1
*   二進位：100011

**範例 2.12**
以下顯示如何將十進位 126 轉換為其在八進位系統中的等價值。我們向右移動，同時不斷找出除以 8 的商和餘數。結果是 126 = (176)₈：
*   十進位：126
*   除以 8：126/8 -> 商=15, 餘=6
*   除以 8：15/8 -> 商=1, 餘=7
*   除以 8：1/8 -> 商=0, 餘=1
*   八進位：176

**範例 2.13**
以下顯示我們如何將十進位 126 轉換為其在十六進位系統中的等價值。我們向右移動，同時不斷找出除以 16 的商和餘數。結果是 126 = (7E)₁₆：
*   十進位：126
*   除以 16：126/16 -> 商=7, 餘=14 (E)
*   除以 16：7/16 -> 商=0, 餘=7
*   十六進位：7E

**轉換小數部分**
小數部分可以使用重複乘法轉換。我們將十進位數字的小數部分稱為來源，轉換後數字的小數部分稱為目的地。我們先建立一個空的目的地。然後我們重複地乘以來源以獲得結果。結果的整數部分被插入到目的地的右邊，而小數部分成為新的來源。

**範例 2.14**
將十進位數字 0.625 轉換為二進位。
解答：由於數字 0.625 沒有整數部分，該範例顯示了如何計算小數部分。這裡的基底是 2。在左上角寫下十進位數字。將該數字不斷乘以 2，並記錄結果的整數和小數部分。小數部分向右移動，整數部分記錄在每個操作下方。當小數部分為 0 或有足夠的位數時停止。結果是 (0.101)₂：
*   0.625 * 2 = 1.25 -> I=1, F=0.25
*   0.25 * 2 = 0.50 -> I=0, F=0.50
*   0.50 * 2 = 1.00 -> I=1, F=0.00
*   二進位：.101

**範例 2.15**
以下顯示如何使用最多四位數將 0.634 轉換為八進位。結果是 0.634 = (0.5044)₈。請注意，我們乘以 8（八進位基底）：
*   0.634 * 8 = 5.072 -> I=5
*   0.072 * 8 = 0.576 -> I=0
*   0.576 * 8 = 4.608 -> I=4
*   0.608 * 8 = 4.864 -> I=4
*   八進位：.5044

**範例 2.16**
以下顯示如何將十進位 178.6 轉換為十六進位，且小數點右邊僅保留一位數。結果是 178.6 = (B2.9)₁₆ 請注意，我們除以或乘以 16（十六進位基底）：
*   整數部分 178：178/16 -> 商=11 (B), 餘=2 -> B2
*   小數部分 0.6：0.6 * 16 = 9.6 -> I=9
*   十六進位：B2.9

**範例 2.17**
將小十進位整數（通常小於 256）轉換為二進位的另一種方法是將數字分解為等於二進位位值的數字之和。使用此表，我們可以將 165 轉換為二進位 (10100101)₂，如下所示：
165 = 128 + 0 + 32 + 0 + 0 + 4 + 0 + 1 -> 10100101

**範例 2.18**
當分母是 2 的冪時，可以使用類似的方法將十進位分數轉換為二進位。使用此表，我們將 27/64 轉換為二進位 (0.011011)₂，如下所示：
27/64 = 0 + 1/4 + 1/8 + 0 + 1/32 + 1/64 -> 0.011011

**位數**
在將數字從十進位轉換為其他基底之前，我們經常需要知道位數。在基底為 b 的進位制數字系統中，我們總是可以使用關係式 K = ⌈log_b N⌉ 來找到整數的位數，其中 ⌈x⌉ 表示大於或等於 x 的最小整數（也稱為 x 的上限），N 是整數的十進位值。

**二進位–十六進位轉換**
我們可以輕鬆地將數字從二進位轉換為十六進位，反之亦然。原因是這兩個基底之間存在關係：二進位中的四個位元是十六進位中的一個數字。

**範例 2.19**
顯示二進位數字 (10011100010)₂ 的十六進位等價值。
解答：我們先將二進位數字排列成 4 位元的模式：100 1110 0010。請注意，最左邊的模式可以有一到四個位元。然後我們使用 2.2.5 節表 2.2 中顯示的每個模式的等價值將數字更改為十六進位：(4E2)₁₆。

**範例 2.20**
(24C)₁₆ 的二進位等價值是多少？
解答：每個十六進位數字轉換為 4 位元模式：2 → 0010, 4 → 0100, 和 C → 1100。結果是 (001001001100)₂。

**二進位–八進位轉換**
我們可以輕鬆地將數字從二進位轉換為八進位，反之亦然。原因是這兩個基底之間存在有趣的關係：三個位元是一個八進位數字。

**範例 2.21**
顯示二進位數字 (101110010)₂ 的八進位等價值。
解答：每組三個位元被翻譯成一個八進位數字。每個 3 位元組的等價值顯示在 2.2.5 節的表 2.2 中。結果是 (562)₈。

**範例 2.22**
(24)₈ 的二進位等價值是多少？
解答：將每個八進位數字寫成其等價的位元模式，得到 (010100)₂。

**八進位–十六進位轉換**
將八進位數字轉換為十六進位或反之亦然並不困難。我們可以使用二進位系統作為中間系統。
*   要從八進位轉換為十六進位，我們先將八進位系統中的數字轉換為二進位。然後我們將位元重新排列成四位一組，以找到十六進位等價值。
*   要從十六進位轉換為八進位，我們先將十六進位系統中的數字轉換為二進位。然後我們將位元重新排列成三位一組，以找到八進位等價值。

**位數**
在從一個基底轉換到另一個基底時，如果我們知道來源系統中的最大位數，我們經常需要知道目的地系統中所需的最小位數。一般來說，假設我們在基底 b₁ 系統中使用 K 位數。我們可以在來源系統中表示的最大數字是 b₁ᴷ – 1。我們可以在目的地系統中擁有的最大數字是 b₂ˣ – 1。因此，b₂ˣ – 1 ≥ b₁ᴷ – 1。這意味著 x ≥ K × (log b₁ / log b₂)。

**範例 2.23**
找出儲存最多六位數十進位整數所需的最小二進位位數。
解答：K = 6, b₁ = 10, 且 b₂ = 2。那麼 x = ⌈6 × (log 10 / log 2)⌉ = ⌈6 × 3.322⌉ = ⌈19.93⌉ = 20。

## 2.3 非進位制數字系統
雖然非進位制數字系統不用於電腦，但我們在此簡要回顧以與進位制數字系統進行比較。**非進位制數字系統**仍然使用有限數量的符號，其中每個符號都有一個值。然而，符號在數字中所佔的位置通常與其值無關——每個符號的值是固定的。要找到一個數字的值，我們將表示中所有符號的值相加。

**範例 2.24**
**羅馬數字系統**是非進位制數字系統的一個很好的例子。這個系統由羅馬人發明，並在歐洲使用到十六世紀。羅馬數字仍用於體育賽事、鐘面和其他應用。這個數字系統有一組符號 S = {I, V, X, L, C, D, M}。每個符號的值顯示在表 2.3 中。

**表 2.3 羅馬數字系統中符號的值**
| 符號 | I | V | X | L | C | D | M |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 值 | 1 | 5 | 10 | 50 | 100 | 500 | 1000 |

要找到一個數字的值，我們需要將符號的值相加，但要遵守特定規則：
1.  當一個值較小的符號放在一個值相等或較大的符號後面時，這些值相加。
2.  當一個值較小的符號放在一個值較大的符號前面時，較小的值從較大的值中減去。
3.  如果 S₁ ≤ 10 × S₂，則符號 S₁ 不能在另一個符號 S₂ 之前。例如，I 或 V 不能在 C 之前。
4.  對於大數字，在六個符號中的任何一個（除 I 以外的所有符號）上方放置一條橫線表示乘以 1000。例如，V̅ = 5000 和 M̅ = 1000000。
5.  雖然羅馬人使用單詞 *nulla*（無）來傳達零的概念，但羅馬數字系統中缺乏零數字。

以下顯示了一些羅馬數字及其值：
*   III → 1 + 1 + 1 = 3
*   IV → 5 – 1 = 4
*   VIII → 5 + 1 + 1 + 1 = 8
*   XVIII → 10 + 5 + 1 + 1 + 1 = 18
*   XIX → 10 + (10 – 1) = 19
*   LXXII → 50 + 10 + 10 + 1 + 1 = 72
*   CI → 100 + 1 = 101
*   MMVII → 1000 + 1000 + 5 + 1 + 1 = 2007
*   MDC → 1000 + 500 + 100 = 1600

## 2.4 章末材料
### 2.4.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
*   Stalling, W. *Computer Organization and Architecture*, Upper Saddle River, NJ: Prentice-Hall, 2000
*   Mano, M. *Computer System Architecture*, Upper Saddle River, NJ: Prentice-Hall, 1993
*   Null, L. and Lobur, J. *Computer Organization and Architecture*, Sudbury, MA: Jones and Bartlett, 2003
*   Brown, S. and Vranesic, Z. *Fundamentals of Digital Logic with Verilog Design*, New York: McGraw-Hill, 2003

### 2.4.2 關鍵詞
*   基底 (base)
*   二進位數字 (binary digit)
*   二進位系統 (binary system)
*   位元 (bit)
*   十進位數字 (decimal digit)
*   十進位系統 (decimal system)
*   十六進位數字 (hexadecimal digit)
*   十六進位系統 (hexadecimal system)
*   整數 (integer)
*   非進位制數字系統 (nonpositional number system)
*   數字系統 (number system)
*   八進位數字 (octal digit)
*   八進位系統 (octal system)
*   位值 (place value)
*   進位制數字系統 (positional number system)
*   基數 (radix)
*   實數 (real)
*   羅馬數字系統 (Roman number system)

### 2.4.3 摘要
*   數字系統（或計數系統）是一個使用不同符號來表示數字的系統。在進位制數字系統中，符號在數字中所佔的位置決定了它所代表的值。每個位置都有一個與之相關聯的位值。非進位制數字系統使用有限數量的符號，其中每個符號都有一個值。然而，符號在數字中所佔的位置通常與其值無關：每個符號的值通常是固定的。
*   在十進位系統中，基底 b = 10，我們使用十個符號來表示數字。這個系統中的符號通常被稱為十進位數字或簡稱數字。在二進位系統中，基底 b = 2，我們只使用兩個符號來表示數字。這個系統中的符號通常被稱為二進位數字或位元。在十六進位系統中，基底 = 16，我們使用 16 個符號來表示數字。這個系統中的符號通常被稱為十六進位數字。在八進位系統中，基底 b = 8，我們使用八個符號來表示數字。這個系統中的符號通常被稱為八進位數字。
*   我們可以將任何系統中的數字轉換為十進位。我們將每個數字與其在來源系統中的位值相乘，並將結果相加，得到十進位系統中的數字。我們可以使用兩個不同的程序將十進位數字轉換為其在任何基底中的等價值，一個用於整數部分，一個用於小數部分。整數部分需要重複除法，小數部分需要重複乘法。
*   從二進位系統轉換到十六進位系統以及從十六進位系統轉換到二進位系統非常容易，因為二進位系統中的四個位元在十六進位系統中表示為一個數字。
*   從二進位系統轉換到八進位系統以及從八進位系統轉換到二進位系統非常容易，因為二進位系統中的三個位元在八進位系統中表示為一個數字。
`
};
