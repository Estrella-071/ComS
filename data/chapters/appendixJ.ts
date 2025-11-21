

export const appendixJContent = {
  en: `
# Appendix J: Addition and Subtraction for Reals

In Chapter 4 we showed how to operate on data. Addition and subtraction for reals are a little more involved and are discussed in this appendix.

## J.1 OPERATIONS ON REALS
All arithmetic operations such as addition, subtraction, multiplication, and division can be applied to reals stored in floating-point format. Multiplication of two reals involves multiplication of two integers in sign-and-magnitude representation. Division of two reals involves division of two integers in sign-and-magnitude representations. Since we did not discuss the multiplication or division of integers in sign-and-magnitude representation, we will not discuss the multiplication and division of reals, and only show addition and subtraction for reals.

Addition and subtraction of real numbers stored in floating-point numbers is reduced to addition and subtraction of two integers stored in sign-and-magnitude (combination of sign and mantissa) after the alignment of decimal points. Figure J.1 shows a simplified version of the procedure (there are some special cases that we have ignored).

The simplified procedure works as follows:
1.  If any of the two numbers (A or B) is zero, we let the result be 0 and stop.
2.  If the operation is subtraction, we change the sign of the second number (B) to simulate addition.
3.  We denormalize both numbers by including the hidden 1 in the mantissa and incrementing the exponents. The mantissa is now is treated as an integer.
4.  We then align the exponents, which means that we increment the lower exponent and shift the corresponding mantissa until both have the same exponent. For example, if we have:
    $1.11101 \\times 2^4 + 1.01 \\times 2^2$
    we need to make both exponents 4:
    $1.11101 \\times 2^4 + 0.00101 \\times 2^4$
5.  Now, we treat the combination of the sign and mantissa of each number as an integer in sign-and-magnitude format. We add these two integers, as explained earlier in Appendix I.
6.  Finally, we normalized the number again to $1.000010 \\times 2^5$.

**Example J.1**
Show how the computer finds the result of (+5.75) + (+161.875) = (+167.625).

**Solution**
As we saw in Chapter 3, these two numbers are stored in floating-point format, as shown below, but we need to remember that each number has a hidden 1 (which is not stored, but assumed):

| | S | E | M |
|---|---|---|---|
| A | 0 | 10000001 | 01110000000000000000000 |
| B | 0 | 10000110 | 01000011110000000000000 |

The first few steps in the UML diagram (Figure J.1) are not needed. We move to denormalization and denormalize the numbers by adding the hidden 1s to the mantissa and incrementing the exponent. Now both denormalized mantissas are 24 bits and include the hidden 1s. They should be stored in a location that can hold all 24 bits. Each exponent is incremented:

| | S | E | Denormalized M |
|---|---|---|---|
| A | 0 | 10000010 | 101110000000000000000000 |
| B | 0 | 10000111 | 101000011110000000000000 |

Now we need to align the mantissas. We need to increment the first exponent and shift its mantissa to the right. We change the first exponent to $(10000111)_2$, so we need to shift the first mantissa right by five positions:

| | S | E | Denormalized M |
|---|---|---|---|
| A | 0 | 10000111 | 000001011100000000000000 |
| B | 0 | 10000111 | 101000011110000000000000 |

Now we do sign-and-magnitude addition, treating the sign and the mantissa of each number as one integer stored in sign-and-magnitude representation:

| | S | E | Denormalized M |
|---|---|---|---|
| R | 0 | 10000111 | 101001111010000000000000 |

There is no overflow in the mantissa, so we normalize:

| | S | E | M |
|---|---|---|---|
| R | 0 | 10000110 | 01001111010000000000000 |

The mantissa is only 23 bits, no rounding is needed. $E = (10000110)_2 = 134$, $M=0100111101$. In other words, the result is $(1.0100111101)_2 \\times 2^{134-127} = (10100111.101)_2 = 167.625$.

**Example J.2**
Show how the computer finds the result of (+5.75) + (-7.0234375) = -1.2734375.

**Solution**
These two numbers can be stored in floating-point format, as shown below:

| | S | E | M |
|---|---|---|---|
| A | 0 | 10000001 | 01110000000000000000000 |
| B | 1 | 10000001 | 11000001100000000000000 |

Denormalization results in:

| | S | E | Denormalized M |
|---|---|---|---|
| A | 0 | 10000010 | 101110000000000000000000 |
| B | 1 | 10000010 | 111000001100000000000000 |

Alignment is not needed (both exponents are the same), so we apply addition operation on the combinations of sign and mantissa. The result is shown below, in which the sign of the result is negative:

| | S | E | Denormalized M |
|---|---|---|---|
| R | 1 | 10000010 | 001010001100000000000000 |

Now we need to normalize. We decrement the exponent three times and shift the denormalized mantissa to the left three positions:

| | S | E | M |
|---|---|---|---|
| R | 1 | 01111111 | 010001100000000000000000 |

The mantissa is now 24 bits, so we round it to 23 bits:

| | S | E | M |
|---|---|---|---|
| R | 1 | 01111111 | 01000110000000000000000 |

The result is $R = - 2^{127-127} \\times 1.0100011 = - 1.2734375$, as expected.
`,
  zh: `
# 附錄 J：實數的加法和減法

在第 4 章中，我們展示了如何對資料進行運算。實數的加法和減法稍微複雜一些，將在本附錄中進行討論。

## J.1 實數運算
所有算術運算，如加法、減法、乘法和除法，都可以應用於以浮點格式儲存的實數。兩個實數的乘法涉及符號與數值表示法中兩個整數的乘法。兩個實數的除法涉及符號與數值表示法中兩個整數的除法。由於我們沒有討論符號與數值表示法中整數的乘法或除法，我們將不討論實數的乘法和除法，而只展示實數的加法和減法。

以浮點數儲存的實數的加法和減法在對齊小數點後簡化為對兩個以符號與數值（符號和尾數的組合）儲存的整數進行加法和減法。圖 J.1 顯示了該程序的簡化版本（我們忽略了一些特殊情況）。

簡化的程序如下：
1.  如果兩個數字（A 或 B）中有任何一個為零，我們讓結果為 0 並停止。
2.  如果運算是減法，我們改變第二個數字 (B) 的符號以模擬加法。
3.  我們**非正規化**兩個數字：在尾數中包含隱藏的 1，並遞增指數。現在尾數被視為整數。
4.  然後我們對齊指數，這意味著我們遞增較小的指數並移位對應的尾數，直到兩者具有相同的指數。例如，如果我們有：
    $1.11101 \\times 2^4 + 1.01 \\times 2^2$
    我們需要使兩個指數都為 4：
    $1.11101 \\times 2^4 + 0.00101 \\times 2^4$
5.  現在，我們將每個數字的符號和尾數的組合視為符號與數值格式的整數。我們將這兩個整數相加，如前文附錄 I 所釋。
6.  最後，我們將數字再次正規化為 $1.000010 \\times 2^5$。

**範例 J.1**
顯示電腦如何找出 (+5.75) + (+161.875) = (+167.625) 的結果。

**解答**
正如我們在第 3 章中看到的，這兩個數字以浮點格式儲存，如下所示，但我們需要記住每個數字都有一個隱藏的 1（未儲存，但假定存在）：

| | S | E | M |
|---|---|---|---|
| A | 0 | 10000001 | 01110000000000000000000 |
| B | 0 | 10000110 | 01000011110000000000000 |

UML 圖（圖 J.1）中的前幾個步驟是不需要的。我們進行非正規化，通過將隱藏的 1 添加到尾數並遞增指數來非正規化數字。現在兩個非正規化的尾數都是 24 位元，包括隱藏的 1。它們應該儲存在可以容納所有 24 位元的位置。每個指數都遞增：

| | S | E | 非正規化 M |
|---|---|---|---|
| A | 0 | 10000010 | 101110000000000000000000 |
| B | 0 | 10000111 | 101000011110000000000000 |

現在我們需要對齊尾數。我們需要遞增第一個指數並將其尾數向右移位。我們將第一個指數更改為 $(10000111)_2$，因此我們需要將第一個尾數向右移位五個位置：

| | S | E | 非正規化 M |
|---|---|---|---|
| A | 0 | 10000111 | 000001011100000000000000 |
| B | 0 | 10000111 | 101000011110000000000000 |

現在我們進行符號與數值加法，將每個數字的符號和尾數視為一個以符號與數值表示法儲存的整數：

| | S | E | 非正規化 M |
|---|---|---|---|
| R | 0 | 10000111 | 101001111010000000000000 |

尾數沒有溢位，所以我們正規化：

| | S | E | M |
|---|---|---|---|
| R | 0 | 10000110 | 01001111010000000000000 |

尾數只有 23 位元，不需要四捨五入。$E = (10000110)_2 = 134$，$M=0100111101$。換句話說，結果是 $(1.0100111101)_2 \\times 2^{134-127} = (10100111.101)_2 = 167.625$。

**範例 J.2**
顯示電腦如何找出 (+5.75) + (+27.0234375) = 21.2734375 的結果。
*(註：原文此處範例標題數字有誤，根據上下文和計算，應為 (+5.75) + (-7.0234375)，但解答過程顯示第二個數為負。此外，範例 J.2 標題中的第二個數值與解答中的數值 B 符號不符，且解答最終結果為 -1.2734375。基於 PDF 內容，B 的符號位元是 1，表示負數。讓我們依據 PDF 圖片中的運算邏輯修正描述。)*
顯示電腦如何找出 (+5.75) + (-7.0234375) = -1.2734375 的結果。

**解答**
這兩個數字可以以浮點格式儲存，如下所示：

| | S | E | M |
|---|---|---|---|
| A | 0 | 10000001 | 01110000000000000000000 |
| B | 1 | 10000001 | 11000001100000000000000 |

非正規化結果為：

| | S | E | 非正規化 M |
|---|---|---|---|
| A | 0 | 10000010 | 101110000000000000000000 |
| B | 1 | 10000010 | 111000001100000000000000 |

不需要對齊（兩個指數相同），因此我們對符號和尾數的組合應用加法運算。結果如下所示，其中結果的符號為負：

| | S | E | 非正規化 M |
|---|---|---|---|
| R | 1 | 10000010 | 001010001100000000000000 |

現在我們需要正規化。我們將指數遞減三次，並將非正規化的尾數向左移位三個位置：

| | S | E | M |
|---|---|---|---|
| R | 1 | 01111111 | 010001100000000000000000 |

尾數現在是 24 位元，所以我們將其四捨五入為 23 位元：

| | S | E | M |
|---|---|---|---|
| R | 1 | 01111111 | 01000110000000000000000 |

結果是 $R = - 2^{127-127} \\times 1.0100011 = - 1.2734375$，如預期。
`,
};
