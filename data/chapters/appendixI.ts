

export const appendixIContent = {
  en: `
# Appendix I: Addition and Subtraction for Sign-and-Magnitude Integers

In Chapter 4 we showed how to operate on data. Addition and subtraction for sign-and-magnitude integers are a little more involved and are discussed in this appendix.

## I.1 OPERATIONS ON INTEGERS
Addition and subtraction for integers in sign-and-magnitude representation look very complex. We have four different combination of signs (two signs, each of two values) for addition, and four different conditions for subtraction. This means that we need to consider eight different situations. However, if we examine the signs in more detail, we can reduce the number of cases, as shown in Figure I-1.

Let us first explain the diagram:
1.  We check the operation. If the operation is subtraction, we change the sign of the second integer (B). This means we now only have to worry about the addition of two signed integers.
2.  We apply the XOR operation to the two signs. If the result (stored in temporary location S) is 0, it means that the signs are the same (either both signs are positive or both are negative).
3.  If the signs are the same, $R = \\pm (A_M + B_M)$. We need to add the magnitude and the sign of the result is the common sign. So, we have:
    $R_M = (A_M) + (B_M)$ and $R_S = A_S$
    where the subscript M means magnitude and subscript S means sign. In this case, however, we should be careful about the overflow. When we add the two magnitudes, an overflow may occur that must be reported and the process aborted.
4.  If the signs are different, $R = \\pm (A_M - B_M)$. So we need to subtract $B_M$ from $A_M$ and then make a decision about the sign. Instead of subtracting bit by bit, we take the two’s complement of the second magnitude ($B_M$) and add them. The sign of the result is the sign of the integer with larger magnitude.
    a. It can be shown that if $A_M \\ge B_M$, there is an overflow and the result is a positive number. Therefore, if there is an overflow, we discard the overflow and let the sign of the result be the sign of A.
    b. It can be shown that if $A_M < B_M$, there is no overflow, but the result is a negative number. So if there is no overflow, we make the two’s complement of the result and let the sign of the result be the sign of B.

**Example I.1**
Two integers A and B are stored in sign-and-magnitude format (we have separated the sign from the magnitude for clarity). Show how B is added to A.
A = $(0 \\ 0010001)_2$ B = $(0 \\ 0010110)_2$

**Solution**
The operation is adding: the sign of B is not changed. Since $S = A_S \\text{ XOR } B_S = 0, R_M = A_M + B_M$ and $R_S = A_S$. There is no overflow.

| | Sign | Magnitude |
|---|---|---|
| $A_S$ | 0 | 0 0 1 0 0 0 1 $A_M$ |
| $B_S$ | 0 | + 0 0 1 0 1 1 0 $B_M$ |
| $R_S$ | 0 | 0 0 1 0 0 1 1 1 $R_M$ |

Checking the result in decimal, (+17) + (+22) = (+39).

**Example I.2**
Two integers A and B are stored in sign-and-magnitude format. Show how B is added to A.
A = $(0 \\ 0010001)_2$ B = $(1 \\ 0010110)_2$

**Solution**
The operation is adding: the sign of B is not changed. Since $S = A_S \\text{ XOR } B_S = 1; R_M = A_M + (\\bar{B}_M + 1)$. Since there is no overflow, we need to take the two’s complement of $R_M$. The sign of R is the sign of B.

| | Sign | Magnitude |
|---|---|---|
| $A_S$ | 0 | 0 0 1 0 0 0 1 $A_M$ |
| $B_S$ | 1 | + 1 1 0 1 0 1 0 $(\\bar{B}_M + 1)$ |
| | | 1 1 1 1 1 0 1 1 $R_M$ |
| $R_S$ | 1 | 0 0 0 0 0 1 0 1 $R_M = (\\bar{R}_M + 1)$ |

Checking the result in decimal, (+17) + (-22) = (-5).

**Example I.3**
Two integers A and B are stored in sign-and-magnitude format. Show how B is subtracted from A.
A = $(1 \\ 1010001)_2$ B = $(1 \\ 0010110)_2$

**Solution**
The operation is subtracting: $S_B = S_B \\text{ XOR } 1$. $S = A_S \\text{ XOR } B_S = 1, R_M = A_M + (\\bar{B}_M + 1)$. Since there is an overflow, the value of $R_M$ is final. The sign of R is the sign of A.

| | Sign | Magnitude |
|---|---|---|
| $A_S$ | 1 | 1 0 1 0 0 0 1 $A_M$ |
| $B_S$ | 1 | + 1 1 0 1 0 1 0 $(\\bar{B}_M + 1)$ |
| $R_S$ | 1 | 1 0 1 1 1 0 1 1 $R_M$ |

Checking the result in decimal, (-81) - (-22) = (-59).
`,
  zh: `
# 附錄 I：符號與數值整數的加法和減法

在第 4 章中，我們展示了如何對資料進行運算。符號與數值整數的加法和減法稍微複雜一些，將在本附錄中進行討論。

## I.1 整數運算
符號與數值表示法中整數的加法和減法看起來非常複雜。對於加法，我們有四種不同的符號組合（兩個符號，每個符號有兩個值），對於減法，我們也有四種不同的條件。這意味著我們需要考慮八種不同的情況。然而，如果我們更詳細地檢查符號，我們可以減少情況的數量，如圖 I.1 所示。

讓我們先解釋一下圖表：
1.  我們檢查運算。如果運算是減法，我們改變第二個整數 (B) 的符號。這意味著我們現在只需要擔心兩個有符號整數的加法。
2.  我們對這兩個符號應用 XOR 運算。如果結果（儲存在臨時位置 S 中）為 0，則表示符號相同（兩個符號都是正數或都是負數）。
3.  如果符號相同，$R = \\pm (A_M + B_M)$。我們需要將數值相加，結果的符號是共同的符號。所以，我們有：
    $R_M = (A_M) + (B_M)$ 和 $R_S = A_S$
    其中下標 M 表示數值，下標 S 表示符號。但在這種情況下，我們應該小心溢位。當我們將兩個數值相加時，可能會發生溢位，必須報告並中止該過程。
4.  如果符號不同，$R = \\pm (A_M - B_M)$。所以我們需要從 $A_M$ 中減去 $B_M$，然後對符號做出決定。我們不逐位減法，而是取第二個數值 ($B_M$) 的二的補數並將它們相加。結果的符號是數值較大整數的符號。
    a. 可以證明，如果 $A_M \\ge B_M$，則存在溢位且結果為正數。因此，如果有溢位，我們丟棄溢位並讓結果的符號為 A 的符號。
    b. 可以證明，如果 $A_M < B_M$，則沒有溢位，但結果為負數。所以如果沒有溢位，我們取結果的二的補數並讓結果的符號為 B 的符號。

**範例 I.1**
兩個整數 A 和 B 以符號與數值格式儲存（為了清楚起見，我們將符號與數值分開）。顯示如何將 B 加到 A。
A = $(0 \\ 0010001)_2$ B = $(0 \\ 0010110)_2$

**解答**
運算是加法：B 的符號不改變。由於 $S = A_S \\text{ XOR } B_S = 0, R_M = A_M + B_M$ 且 $R_S = A_S$。沒有溢位。

| | 符號 | 數值 |
|---|---|---|
| $A_S$ | 0 | 0 0 1 0 0 0 1 $A_M$ |
| $B_S$ | 0 | + 0 0 1 0 1 1 0 $B_M$ |
| $R_S$ | 0 | 0 0 1 0 0 1 1 1 $R_M$ |

以十進位檢查結果，(+17) + (+22) = (+39)。

**範例 I.2**
兩個整數 A 和 B 以符號與數值格式儲存。顯示如何將 B 加到 A。
A = $(0 \\ 0010001)_2$ B = $(1 \\ 0010110)_2$

**解答**
運算是加法：B 的符號不改變。由於 $S = A_S \\text{ XOR } B_S = 1; R_M = A_M + (\\bar{B}_M + 1)$。由於沒有溢位，我們需要取 $R_M$ 的二的補數。R 的符號是 B 的符號。

| | 符號 | 數值 |
|---|---|---|
| $A_S$ | 0 | 0 0 1 0 0 0 1 $A_M$ |
| $B_S$ | 1 | + 1 1 0 1 0 1 0 $(\\bar{B}_M + 1)$ |
| | | 1 1 1 1 1 0 1 1 $R_M$ |
| $R_S$ | 1 | 0 0 0 0 0 1 0 1 $R_M = (\\bar{R}_M + 1)$ |

以十進位檢查結果，(+17) + (-22) = (-5)。

**範例 I.3**
兩個整數 A 和 B 以符號與數值格式儲存。顯示如何從 A 中減去 B。
A = $(1 \\ 1010001)_2$ B = $(1 \\ 0010110)_2$

**解答**
運算是減法：$S_B = S_B \\text{ XOR } 1$。$S = A_S \\text{ XOR } B_S = 1, R_M = A_M + (\\bar{B}_M + 1)$。由於存在溢位，$R_M$ 的值是最終的。R 的符號是 A 的符號。

| | 符號 | 數值 |
|---|---|---|
| $A_S$ | 1 | 1 0 1 0 0 0 1 $A_M$ |
| $B_S$ | 1 | + 1 1 0 1 0 1 0 $(\\bar{B}_M + 1)$ |
| $R_S$ | 1 | 1 0 1 1 1 0 1 1 $R_M$ |

以十進位檢查結果，(-81) - (-22) = (-59)。
`,
};
