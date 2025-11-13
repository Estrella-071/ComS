
export const chapter2Content = {
  en: `
# Chapter 2: Number Systems

This chapter is a prelude to Chapters 3 and 4. In Chapter 3 we will show how data is 
stored inside the computer. In Chapter 4 we will show how logic and arithmetic operations are performed on data. This chapter is a preparation for understanding the contents 
of Chapters 3 and 4.

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
A number system (or numeral system) defines how a number can be represented using 
distinct symbols. A number can be represented differently in different systems. Several number systems have been used in the past and can be categorized into two 
groups: positional and nonpositional systems.

## 2.2 POSITIONAL NUMBER SYSTEMS
In a positional number system, the position a symbol occupies in the number determines 
the value it represents. In this system, a number represented as: 
± (Sₖ₋₁ ... S₁S₀ . S₋₁S₋₂ ... S₋ₗ)b
has the value of: 
n = ± (Sₖ₋₁ × bᵏ⁻¹ + ... + S₁ × b¹ + S₀ × b⁰ + S₋₁ × b⁻¹ + ... + S₋ₗ × b⁻ˡ)
in which S is the set of symbols, b is the base (or radix).

### 2.2.1 The decimal system (base 10) 
The first positional number system we discuss is the decimal system. The 
word decimal is derived from the Latin root decem (ten). In this system the base b = 10 
and we use ten symbols to represent a number. The set of symbols is S = {0, 1, 2, 3, 4, 5, 
6, 7, 8, 9}.

### 2.2.2 The binary system (base 2)
The second positional number system we discuss is the binary system. The word binary is derived from the Latin root bini (or two by two). In this 
system the base b = 2 and we use only two symbols, S = {0, 1}. The symbols in this 
system are often referred to as binary digits or bits.

### 2.2.3 The hexadecimal system (base 16)
The word hexadecimal is derived from the Greek root hex (six) and the Latin root decem (ten). In this system the base b = 16 and we use 16 symbols to represent a 
number. The set of symbols is S = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F}. Note that the 
symbols A, B, C, D, E, F are equivalent to 10, 11, 12, 13, 14, and 
15 respectively.

### 2.2.4 The octal system (base 8)
The second system that was devised to show the equivalent of the binary system outside 
the computer is the octal system. The word octal is derived from the Latin root octo 
(eight). In this system the base b = 8 and we use eight symbols to represent a number. The 
set of symbols is S = {0, 1, 2, 3, 4, 5, 6, 7}.

### 2.2.6 Conversion
We need to know how to convert a number in one system to the equivalent number in another 
system.
- **Any base to decimal conversion**: We multiply each digit with its place value in the source system and add the results to get the number in the decimal system.
- **Decimal to any base conversion**: We need two procedures, one for the integral part and one for the fractional part. The integral part is converted using repetitive division. The fractional part can be converted using repetitive multiplication.
- **Binary–hexadecimal conversion**: Four bits in binary is one digit in hexadecimal.
- **Binary–octal conversion**: Three bits is one octal digit.

## 2.3 NONPOSITIONAL NUMBER SYSTEMS
A nonpositional number system still uses a limited number of symbols in which each symbol has a value. However, the position a symbol occupies in the number normally bears no relation to its value—the value of each symbol is fixed. To find the value of a number, we add the value of all symbols present in the representation. The Roman number system is a good example.
`,
  zh: `
# 第二章：數字系統

本章是第三章和第四章的前奏。在第三章中，我們將展示資料如何儲存在電腦內部。在第四章中，我們將展示如何在資料上執行邏輯和算術運算。本章是為了理解第三章和第四章內容所做的準備。

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
數字系統（或計數系統）定義了如何使用不同的符號來表示一個數字。一個數字在不同的系統中可以有不同的表示方式。過去曾使用過多種數字系統，可分為兩類：進位制和非進位制系統。

## 2.2 進位制數字系統
在進位制數字系統中，符號在數字中所佔的位置決定了它所代表的值。在這個系統中，一個表示為：
± (Sₖ₋₁ ... S₁S₀ . S₋₁S₋₂ ... S₋ₗ)b
的數字，其值為：
n = ± (Sₖ₋₁ × bᵏ⁻¹ + ... + S₁ × b¹ + S₀ × b⁰ + S₋₁ × b⁻¹ + ... + S₋ₗ × b⁻ˡ)
其中 S 是符號集合，b 是基底（或底數）。

### 2.2.1 十進位系統（基底為 10）
我們討論的第一個進位制數字系統是十進位系統。「decimal」一詞源於拉丁詞根 decem（十）。在這個系統中，基底 b = 10，我們使用十個符號來表示數字。符號集合為 S = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}。

### 2.2.2 二進位系統（基底為 2）
我們討論的第二個進位制數字系統是二進位系統。「binary」一詞源於拉丁詞根 bini（或二乘二）。在這個系統中，基底 b = 2，我們只使用兩個符號 S = {0, 1}。這個系統中的符號通常被稱為二進位數字或位元（bits）。

### 2.2.3 十六進位系統（基底為 16）
「hexadecimal」一詞源於希臘詞根 hex（六）和拉丁詞根 decem（十）。在這個系統中，基底 b = 16，我們使用 16 個符號來表示數字。符號集合為 S = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F}。請注意，符號 A, B, C, D, E, F 分別相當於 10, 11, 12, 13, 14 和 15。

### 2.2.4 八進位系統（基底為 8）
第二個為在電腦外部顯示二進位系統等價值而設計的系統是八進位系統。「octal」一詞源於拉丁詞根 octo（八）。在這個系統中，基底 b = 8，我們使用八個符號來表示數字。符號集合為 S = {0, 1, 2, 3, 4, 5, 6, 7}。

### 2.2.6 轉換
我們需要知道如何將一個系統中的數字轉換為另一個系統中的等價數字。
- **任意基底轉十進位**：我們將每個數字與其在來源系統中的位值相乘，並將結果相加，得到十進位系統中的數字。
- **十進位轉任意基底**：我們需要兩個程序，一個用於整數部分，一個用於小數部分。整數部分使用重複除法轉換。小數部分可以使用重複乘法轉換。
- **二進位–十六進位轉換**：二進位中的四個位元等於十六進位中的一個數字。
- **二進位–八進位轉換**：三個位元等於一個八進位數字。

## 2.3 非進位制數字系統
非進位制數字系統仍然使用有限數量的符號，其中每個符號都有一個值。然而，符號在數字中所佔的位置通常與其值無關——每個符號的值是固定的。要找到一個數字的值，我們將表示中所有符號的值相加。羅馬數字系統就是一個很好的例子。
`,
};
