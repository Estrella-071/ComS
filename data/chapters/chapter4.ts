
export const chapter4Content = {
  en: `
# Chapter 4: Operations on Data

In Chapter 3 we showed how to store different types of data in a computer. In this chapter, we show how to operate on data stored in a computer. Operations on data can be 
divided into three broad categories: logic operations, shift operations, and arithmetic 
operations. 

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
Logic operations refer to those operations that apply the same basic operation on individual bits of a pattern, or on two corresponding bits in two patterns.

### 4.1.1 Logic operations at bit level
A bit can take one of the two values: 0 or 1. We can apply the operations defined in Boolean algebra to manipulate bits: NOT, AND, OR, and XOR. 
- **NOT**: A unary operator that flips its input.
- **AND**: A binary operator; the output bit is 1 if both inputs are 1s.
- **OR**: A binary operator; the output bit is 0 if both inputs are 0s.
- **XOR**: A binary operator; the output is 0 when both inputs are the same, and 1 when the inputs are different.

### 4.1.2 Logic operations at pattern level
The same four operators can be applied to an n-bit pattern.
- **Complementing**: Applying the NOT operator to a pattern changes every 0 to 1 and every 1 to 0.
- **Unsetting specific bits**: Using the AND operator with a **mask** to force specific bits to 0.
- **Setting specific bits**: Using the OR operator with a **mask** to force specific bits to 1.
- **Flipping specific bits**: Using the XOR operator with a **mask** to complement specific bits.

## 4.2 SHIFT OPERATIONS
Shift operations move the bits in a pattern, changing their positions.

### 4.2.1 Logical shift operations
A logical shift operation is applied to a pattern that does not represent a signed number.
- **Simple shift**: A simple right shift shifts each bit one position to the right, losing the rightmost bit and filling the leftmost bit with a 0. A simple left shift is similar.
- **Circular shift**: A circular shift operation (or rotate operation) shifts bits, but no bit is lost. The bit shifted out from one end is circulated to the other end.

### 4.2.2 Arithmetic shift operations
Arithmetic shift operations assume that the bit pattern is a signed integer in two’s complement format.
- **Arithmetic right shift**: Used to divide an integer by two. The sign bit is retained and also copied to its right neighbor.
- **Arithmetic left shift**: Used to multiply an integer by two. An overflow can occur if the sign bit changes.

## 4.3 ARITHMETIC OPERATIONS
Arithmetic operations involve adding, subtracting, multiplying, and dividing.

### 4.3.1 Arithmetic operations on integers
- **Two’s complement integers**: Addition is performed column by column. Subtraction is achieved by adding the two’s complement of the second number. The carry from the last column is discarded.
- **Sign-and-magnitude integers**: Addition or subtraction looks very complex, involving four different combinations of signs for addition, and four for subtraction.

### 4.3.2 Arithmetic operations on reals
Arithmetic operations on reals stored in floating-point format involves several steps, including aligning the exponents before performing the operation on the mantissas.
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
邏輯運算指的是對模式中的單個位元，或對兩個模式中對應的位元應用相同的基本運算。

### 4.1.1 位元層級的邏輯運算
一個位元可以取兩個值之一：0 或 1。我們可以應用布林代數中定義的運算來操作位元：NOT、AND、OR 和 XOR。
- **NOT**：一個一元運算子，會翻轉其輸入。
- **AND**：一個二元運算子；如果兩個輸入都是 1，則輸出位元為 1。
- **OR**：一個二元運算子；如果兩個輸入都是 0，則輸出位元為 0。
- **XOR**：一個二元運算子；當兩個輸入相同時輸出為 0，當輸入不同時輸出為 1。

### 4.1.2 模式層級的邏輯運算
同樣的四個運算子可以應用於一個 n 位元的模式。
- **補數運算**：對一個模式應用 NOT 運算子，會將每個 0 變為 1，每個 1 變為 0。
- **取消設定特定位元**：使用 AND 運算子和一個**遮罩**來強制特定位元為 0。
- **設定特定位元**：使用 OR 運算子和一個**遮罩**來強制特定位元為 1。
- **翻轉特定位元**：使用 XOR 運算子和一個**遮罩**來對特定位元取補數。

## 4.2 移位運算
移位運算移動模式中的位元，改變它們的位置。

### 4.2.1 邏輯移位運算
邏輯移位運算應用於不表示有符號數的模式。
- **簡單移位**：簡單右移將每個位元向右移動一個位置，最右邊的位元遺失，最左邊的位元填入 0。簡單左移類似。
- **循環移位**：循環移位運算（或旋轉運算）移動位元，但沒有位元會遺失。從一端移出的位元會循環到另一端。

### 4.2.2 算術移位運算
算術移位運算假設位元模式是一個以二的補數格式表示的有符號整數。
- **算術右移**：用於將整數除以二。符號位被保留並複製到其右邊的鄰居。
- **算術左移**：用於將整數乘以二。如果符號位改變，可能會發生溢位。

## 4.3 算術運算
算術運算包括加、減、乘、除。

### 4.3.1 整數的算術運算
- **二的補數整數**：加法是逐欄執行的。減法是通過加上第二個數的二的補數來實現的。最後一欄的進位被丟棄。
- **符號與數值整數**：加法或減法看起來非常複雜，加法涉及四種不同的符號組合，減法也涉及四種。

### 4.3.2 實數的算術運算
對以浮點數格式儲存的實數進行算術運算涉及幾個步驟，包括在對尾數進行運算之前對齊指數。
`,
};
