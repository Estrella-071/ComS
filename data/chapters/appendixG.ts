
export const appendixGContent = {
  en: `
# Appendix G: Mathematical Review

In this appendix we review some mathematical concepts that may help with understanding the topics covered in the book. We first give a brief treatment of exponential and logarithmic functions. We then discuss modular arithmetic. Finally, we give the formulas for the discrete cosine transforms that are used in data compression.

## G.1 EXPONENT AND LOGARITHM
In solving some problems in this book, we often need to know how to handle exponential and logarithmic functions. This section briefly reviews these two concepts.

### G.1.1 Exponential functions
The exponential function with base a is defined as $a^x$. If x is an integer, this is interpreted as multiplying a by itself x times. Normally we can use a calculator to find the value of y.

**Example G.1**
Calculate the value of the following exponential functions.
a. $3^2$
b. $5.2^6$
**Solution**
Using the interpretation of exponentiation, we can find:
a. $3^2 = 3 \\times 3 = 9$
b. $5.2^6 = 5.2 \\times 5.2 \\times 5.2 \\times 5.2 \\times 5.2 \\times 5.2 = 19770.609664$

**Example G.2**
Calculate the value of the following exponential functions:
a. $3^{2.2}$
b. $5.2^{6.3}$
**Solution**
These problems can be done more easily using a calculator—we can find:
a. $3^{2.2} \\approx 11.212$
b. $5.2^{6.3} \\approx 32424.60$

**Three common bases**
In the expression $a^b$, we call $a$ the base and $b$ the exponent. Three bases are very common: base 10, base $e$, and base 2.
*   Base 10 is the base of decimal system. Most calculators have a $10^x$ key.
*   The base used in science and mathematics is the natural base $e$, which has the value 2.71828183... Most calculators have an $e^x$ key. This base is used in science because some phenomena, such as radioactive decay, can be best described using this base.
*   The base which we normally need in computer science is base 2. Most calculators have no $2^x$ key, but we can always use the general $x^y$ key, in which $x = 2$.

**Example G.3**
Calculate the value of the following exponential functions:
a. $e^4$
b. $e^{6.3}$
c. $10^{3.3}$
d. $2^{6.3}$
e. $2^{10}$
**Solution**
a. $e^4 \\approx 54.60$
b. $e^{6.3} \\approx 544.57$
c. $10^{3.3} \\approx 1995.26$
d. $2^{6.3} \\approx 78.79$
e. $2^{10} = 1024$

**Example G.4**
In computer science the dominant base is 2. It is a good practice for us to know the powers of 2 for some common exponents. We often need to remember that:
$2^0 = 1$   $2^1 = 2$   $2^2 = 4$   $2^3 = 8$   $2^4 = 16$   $2^5 = 32$   $2^6 = 64$
$2^7 = 128$   $2^8 = 256$   $2^9 = 512$   $2^{10} = 1024$

**Properties of the exponential function**
Exponential functions have several properties, and some are useful to us:
1. $a^0 = 1$
2. $a^1 = a$
3. $a^{-x} = 1 / a^x$
4. $a^{x+y} = a^x \\times a^y$
5. $a^{x-y} = a^x / a^y$
6. $(a^x)^y = a^{x \\times y}$

**Example G.5**
Examples using these properties are:
a. $5^0 = 1$
b. $6^1 = 6$
c. $2^{-4} = 1/2^4 = 1/16 = 0.0625$
d. $2^{5+3} = 2^5 \\times 2^3 = 32 \\times 8 = 256$
e. $3^{2-3} = 3^2 / 3^3 = 9 / 27 = 1/3 \\approx 0.33$
f. $(10^4)^2 = 10^{4 \\times 2} = 10^8 = 100000000$

### G.1.2 Logarithmic function
A logarithmic function is the inverse of an exponential function, as shown below:
$y = a^x \\leftrightarrow x = \\log_a y$
Just as in the exponential function, $a$ is called the **base** of the logarithmic function. In other words, if $x$ is given, we can calculate $y$ by using the exponential function: if $y$ is given, we can calculate $x$ by using the logarithmic function.

**Exponential and logarithmic functions are the inverse of each other.**

Logarithms facilitate calculations in arithmetic because they convert multiplication to addition and exponentiation to multiplication.

**Example G.6**
Calculate the value of the following logarithmic functions:
a. $\\log_3 9$
b. $\\log_2 16$
c. $\\log 100$
d. $\\log_2 (-2)$
**Solution**
We have not yet shown how to calculate the log function in different bases, but we can solve this problem intuitively.
a. Because $3^2 = 9$, $\\log_3 9 = 2$, using the fact that the two functions are the inverse of each other.
b. Similarly, because $2^4 = 16$, then $\\log_2 16 = 4$.
c. Since there is no finite number $x$ such that $10^x = 0$, then $\\log_{10} 0$ is undefined or mathematically negative infinity.
d. A negative number in real number mathematics does not have a logarithm. However, in the domain of complex numbers we can have the logarithm of a negative number, but we leave this to books on complex number theory.

**Three common bases**
As in the case of exponentiation, there are three common bases in logarithms: base 10, base $e$, and base 2. Logarithms in base $e$ are normally shown as **ln** (natural logarithm), and logarithms in base 10 as **log** (omitting the base). Not all calculators have logarithms in base 2. We show how to handle this base shortly.

**Example G.7**
Calculate the value of the following logarithmic functions:
a. $\\log 233$
b. $\\ln 45$
**Solution**
For these two bases we can use a calculator:
a. $\\log 233 \\approx 2.367$
b. $\\ln 45 \\approx 3.81$

**Base transformation**
We often need to find the value of a logarithmic function in a base other than $e$ or 10. If the available calculator cannot give the result in our desired base, we can use a fundamental property of the logarithm, base transformation, as shown:
$\\log_a y = \\frac{\\log_b y}{\\log_b a}$
Note that the right-hand side shows two log functions with base $b$, which is different from the base $a$ at the left-hand side. This means that we can choose a base that is available in our calculator (base $b$) and find the log of a base that is not available (base $a$).

**Example G.8**
Calculate the value of the following logarithmic functions:
a. $\\log_3 810$
b. $\\log_5 600$
c. $\\log_2 1024$
d. $\\log_2 600$
**Solution**
These bases are normally not available on most calculators, but we can use base 10, which is available.
a. $\\log_3 810 = \\log 810 / \\log 3 = 2.908 / 0.477 \\approx 6.095$
b. $\\log_5 600 = \\log 600 / \\log 5 = 2.778 / 0.699 \\approx 3.975$
c. $\\log_2 1024 = \\log 1024 / \\log 2 = 3.01 / 0.301 = 10$
d. $\\log_2 600 = \\log 600 / \\log 2 \\approx 2.778 / 0.301 \\approx 9.223$

**Example G.9**
Base 2 is very common in computer science. Since we know that $\\log_{10} 2 \\approx 0.301$, it is very easy to calculate (approximately) the log of this base. We find the log of the corresponding number in base 10 and divide it by 0.310. Alternatively, we can multiply the corresponding log in base 10 by 3.332 ($\\approx 1 / 0.301$).
a. $\\log_2 600 \\approx 3.322 \\times \\log_{10} 600 \\approx 3.322 \\times 2.778 \\approx 9.228$
b. $\\log_2 2048 \\approx 3.322 \\times \\log_{10} 2048 \\approx 3.322 \\times 2.778 = 11$

**Properties of logarithmic functions**
Logarithmic functions have six useful properties, each related to the corresponding property of the exponential function (mentioned earlier).
1. $\\log_a 1 = 0$
2. $\\log_a a = 1$
3. $\\log_a (1/x) = -\\log_a x$
4. $\\log_a (x \\times y) = \\log_a x + \\log_a y$
5. $\\log_a (x/y) = \\log_a x - \\log_a y$
6. $\\log_a x^y = y \\times \\log_a x$

**Example G.10**
Calculate the value of the following logarithmic functions.
a. $\\log_3 1$
b. $\\log_3 3$
c. $\\log (1/10)$
d. $\\log_a (x \\times y)$ if we know that $\\log_a x = 2$ and $\\log_a y = 3$
e. $\\log_a (x/y)$ if we know that $\\log_a x = 2$ and $\\log_a y = 3$
f. $\\log_2 (1024)$ without using a calculator
**Solution**
We use the property of log functions to solve the problems:
a. $\\log_3 1 = 0$
b. $\\log_3 3 = 1$
c. $\\log (1/10) = \\log 10^{-1} = -1 \\log 10 = -1$
d. $\\log_a (x \\times y) = \\log_a x + \\log_a y = 2 + 3 = 5$
e. $\\log_a (x / y) = \\log_a x - \\log_a y = 2 - 3 = -1$
f. $\\log_2 (1024) = \\log_2 (2^{10}) = 10 \\times \\log_2 2 = 10 \\times 1 = 10$

## G.2 MODULAR ARITHMETIC
In integer arithmetic, if we divide $a$ by $n$, we can get $q$ and $r$. The relationship between these four integers can be shown as $a = q \\times n + r$. In this relation, $a$ is called the dividend, $q$ the quotient, $n$ the divisor, and $r$ the residue. Since an operation is normally defined with one single output, this is not an operation. We can call it the **division relation**.

**Example G.11**
Assume that $a = 214$ and $n = 13$. We can find $q = 16$ and $r = 6$ using the division algorithm we have learned in arithmetic, as shown in Figure G.1.
Most computer languages can find the quotient and the residue using language-specific operators. For example, in the C language, the division operator (/) can find the quotient and the modulo operator (%) can find the residue.

### G.2.1 The modulo operator
In modular arithmetic we are interested in only one of the outputs, the remainder, $r$. We don’t care about the quotient, $q$. In other words, we want to know what is the value of $r$ when we divide $a$ by $n$. This implies that we can change the above relation into a binary operator with two inputs $a$ and $n$ and one output $r$. The binary operator is then called the **modulo operator** and is shown as **mod**. The second input ($n$) is called the **modulus** and the output $r$ is called the **residue**. Figure G.2 shows the division relation compared with the modulo operator.

The modulo operator (**mod**) takes an integer ($a$) a modulus ($n$). The operator creates a residue ($r$). Although $a$ and $r$ can be any integer, $n$ cannot be 0 because it implies division by zero, which yields an undefined value or infinity. However, in practice we need the value of $n$ to be non-negative. For this reason, the values of $a$ and $r$ should be between 0 and $n - 1$.

**Example G.12**
A very good example of the use of modular arithmetic is our clock system. The clock is based on modulo 12 arithmetic. However, the integer 12 in our clock should actually be 0 to make it conformant with the modulo arithmetic.

**Example G.13**
Find the result of the following operations:
a. 28 mod 6
b. 32 mod 12
c. 19 mod 15
d. 7 mod 11
**Solution**
We are looking for the residue $r$. We can divide $a$ by $n$ and find $q$ and $r$. We can then disregard $q$ and keep $r$.
a. Dividing 28 by 6 results in $r = 4$. This means that 28 mod 6 = 4.
b. Dividing 32 by 12 results in $r = 8$. This means that 32 mod 12 = 8.
c. Dividing 19 by 15 results in $r = 4$. This means that 19 mod 15 = 4.
d. Dividing 7 by 11 results in $r = 7$. This means that 7 mod 11 = 7.

### G.2.2 Arithmetic operations
The three binary operations (addition, subtraction, and multiplication) that we discussed for integers can also be defined for modulo arithmetic. We may need to normalize the result (apply the mod operation and use the residue) if the result is greater than $n - 1$, as shown in Figure G.3.

Actually, two sets of binary operators are used here. The first set is one of the binary operators (+, -, $\\times$) and the second is the **mod** operator. We need to use parentheses to emphasize the order of operations. If at any time during calculation we find a negative value for $r$, the value should be normalized. We need to add the modulus to the result as many times as is necessary to make it positive.

**Example G.14**
Perform the following operations:
a. Add 7 to 14 using modulo 15.
b. Subtract 11 from 7 using modulo 13.
c. Multiply 11 by 7 using modulo 20.
**Solution**
The following shows the two steps involved in each case:
$(14 + 7) \\text{ mod } 15 \\rightarrow (21) \\text{ mod } 15 = 6$
$(7 - 11) \\text{ mod } 13 \\rightarrow (-4) \\text{ mod } 13 = -4 + 13 = 9$
$(7 \\times 11) \\text{ mod } 20 \\rightarrow (77) \\text{ mod } 20 = 17$

**Example G.15**
Perform the following operations:
a. Add 17 to 27 using modulo 14.
b. Subtract 43 from 12 using modulo 13
c. Multiply 123 by -10 using modulo 19.
**Solution**
Note that the integers in these examples are sometimes out of the range of 0 to $n - 1$. We can normalize them either before applying the operation or after applying the operation. We show the second choice, you try the first choice. The result should be the same.
$(17 + 27) \\text{ mod } 14 \\rightarrow (44) \\text{ mod } 14 = 2$
$(12 - 43) \\text{ mod } 15 \\rightarrow (-31) \\text{ mod } 15 = -1 + 15 = 14$
$(123 \\times -10) \\text{ mod } 20 \\rightarrow (-1230) \\text{ mod } 19 = -14 + 19 = 5$

**Modulo-2 arithmetic**
Modulo-2 arithmetic is of particular interest. As the modulus is 2, we can use only the values 0 and 1. Operations in this arithmetic are very simple. The following shows how we can add or subtract 2 bits:
Adding: $(0 + 0) \\text{ mod } 2 = 0$  $(0 + 1) \\text{ mod } 2 = 1$
$(1 + 0) \\text{ mod } 2 = 1$  $(1 + 1) \\text{ mod } 2 = 0$
Subtracting: $(0 - 0) \\text{ mod } 2 = 0$  $(0 - 1) \\text{ mod } 2 = 1$
$(1 - 0) \\text{ mod } 2 = 1$  $(1 - 1) \\text{ mod } 2 = 0$
Notice particularly that addition and subtraction give the same results. In this arithmetic we use the XOR (exclusive OR) operation for both addition and subtraction. The result of an XOR operation is 0 if two bits are the same and 1 if two bits are different. Figure G.4 shows this operation.

## G.3 DISCRETE COSINE TRANSFORM
In this section we give the mathematical background for the discrete cosine and inverse discrete cosine transforms that are used for data compression, as discussed in Chapter 15.

### G.3.1 The discrete cosine transform
The discrete cosine transform (DCT) changes each block of 64 pixels so that the relative relationship between pixels is preserved but redundancies are revealed. The formula follows. $P(x, y)$ defines one particular value in the picture block, while $T(m, n)$ defines one value in the transformed block.

$T(m, n) = 0.25 c(m) c(n) \\sum_{x=0}^7 \\sum_{y=0}^7 P(x, y) \\cos \\left[ \\frac{(2x + 1)m\\pi}{16} \\right] \\cos \\left[ \\frac{(2y + 1)n\\pi}{16} \\right]$

where $c(i) = 1/\\sqrt{2}$ if $i = 0$, and $c(i) = 1$ otherwise.

### G.3.2 The inverse discrete cosine transform
The inverse transform is used to create the $P(x, y)$ table from the $T(m, n)$ table.

$P(x, y) = 0.25 \\sum_{m=0}^7 \\sum_{n=0}^7 c(m) c(n) T(m, n) \\cos \\left[ \\frac{(2m + 1)x\\pi}{16} \\right] \\cos \\left[ \\frac{(2n + 1)y\\pi}{16} \\right]$

where $c(i) = 1/\\sqrt{2}$ if $i = 0$, and $c(i) = 1$ otherwise.

**Example G.16**
Evaluate $T(0, 0)$ and $T(0, 1)$ if $P(x, y) = 20$ for all $x$ and $y$.
**Solution**
Using sum-to-product identity $\\cos x + \\cos y = 2[\\cos(x + y)/2] [\\cos(x - y)/2]$, we can show that the sum of all cosine terms is 0.
`,
  zh: `
# 附錄 G：數學複習

本附錄複習一些有助於理解本書內容的數學概念。我們先簡要介紹指數和對數函數。然後討論模數運算。最後，我們給出用於資料壓縮的離散餘弦轉換的公式。

## G.1 指數與對數
在解決本書中的某些問題時，我們經常需要知道如何處理指數和對數函數。本節簡要複習這兩個概念。

### G.1.1 指數函數
以 $a$ 為底的指數函數定義為 $a^x$。如果 $x$ 是整數，這被解釋為將 $a$ 乘以自身 $x$ 次。通常我們可以使用計算器來找出 $y$ 的值。

**範例 G.1**
計算以下指數函數的值。
a. $3^2$
b. $5.2^6$
**解答**
使用指數的解釋，我們可以找到：
a. $3^2 = 3 \\times 3 = 9$
b. $5.2^6 = 5.2 \\times 5.2 \\times 5.2 \\times 5.2 \\times 5.2 \\times 5.2 = 19770.609664$

**範例 G.2**
計算以下指數函數的值：
a. $3^{2.2}$
b. $5.2^{6.3}$
**解答**
使用計算器可以更輕鬆地完成這些問題——我們可以找到：
a. $3^{2.2} \\approx 11.212$
b. $5.2^{6.3} \\approx 32424.60$

**三個常見底數**
在表達式 $a^b$ 中，我們稱 $a$ 為底數，$b$ 為指數。三個底數非常常見：底數 10、底數 $e$ 和底數 2。
*   底數 10 是十進位系統的底數。大多數計算器都有 $10^x$ 鍵。
*   科學和數學中使用的底數是自然底數 $e$，其值為 2.71828183...。大多數計算器都有 $e^x$ 鍵。此底數用於科學，因為某些現象（如放射性衰變）最適合使用此底數來描述。
*   我們在電腦科學中通常需要的底數是底數 2。大多數計算器沒有 $2^x$ 鍵，但我們總可以使用通用的 $x^y$ 鍵，其中 $x = 2$。

**範例 G.3**
計算以下指數函數的值：
a. $e^4$
b. $e^{6.3}$
c. $10^{3.3}$
d. $2^{6.3}$
e. $2^{10}$
**解答**
a. $e^4 \\approx 54.60$
b. $e^{6.3} \\approx 544.57$
c. $10^{3.3} \\approx 1995.26$
d. $2^{6.3} \\approx 78.79$
e. $2^{10} = 1024$

**範例 G.4**
在電腦科學中，主導底數是 2。了解一些常見指數的 2 的冪是一個好習慣。我們經常需要記住：
$2^0 = 1$   $2^1 = 2$   $2^2 = 4$   $2^3 = 8$   $2^4 = 16$   $2^5 = 32$   $2^6 = 64$
$2^7 = 128$   $2^8 = 256$   $2^9 = 512$   $2^{10} = 1024$

**指數函數的性質**
指數函數有幾個性質，有些對我們有用：
1. $a^0 = 1$
2. $a^1 = a$
3. $a^{-x} = 1 / a^x$
4. $a^{x+y} = a^x \\times a^y$
5. $a^{x-y} = a^x / a^y$
6. $(a^x)^y = a^{x \\times y}$

**範例 G.5**
使用這些性質的例子：
a. $5^0 = 1$
b. $6^1 = 6$
c. $2^{-4} = 1/2^4 = 1/16 = 0.0625$
d. $2^{5+3} = 2^5 \\times 2^3 = 32 \\times 8 = 256$
e. $3^{2-3} = 3^2 / 3^3 = 9 / 27 = 1/3 \\approx 0.33$
f. $(10^4)^2 = 10^{4 \\times 2} = 10^8 = 100000000$

### G.1.2 對數函數
對數函數是指數函數的反函數，如下所示：
$y = a^x \\leftrightarrow x = \\log_a y$
就像在指數函數中一樣，$a$ 被稱為對數函數的**底數**。換句話說，如果給定 $x$，我們可以使用指數函數計算 $y$：如果給定 $y$，我們可以使用對數函數計算 $x$。

**指數函數和對數函數互為反函數。**

對數促進了算術中的計算，因為它們將乘法轉換為加法，將求冪轉換為乘法。

**範例 G.6**
計算以下對數函數的值：
a. $\\log_3 9$
b. $\\log_2 16$
c. $\\log 100$
d. $\\log_2 (-2)$
**解答**
我們尚未展示如何在不同底數中計算對數函數，但我們可以直觀地解決這個問題。
a. 因為 $3^2 = 9$，所以 $\\log_3 9 = 2$，利用了這兩個函數互為反函數的事實。
b. 同樣地，因為 $2^4 = 16$，所以 $\\log_2 16 = 4$。
c. 由於沒有有限數 $x$ 使得 $10^x = 0$，因此 $\\log_{10} 0$ 是未定義的或數學上的負無窮大。
d. 實數數學中的負數沒有對數。然而，在複數域中我們可以有負數的對數，但我們將此留給複數理論的書籍。

**三個常見底數**
如同求冪的情況，對數也有三個常見底數：底數 10、底數 $e$ 和底數 2。底數 $e$ 的對數通常顯示為 **ln**（自然對數），底數 10 的對數顯示為 **log**（省略底數）。並非所有計算器都有底數 2 的對數。我們很快就會展示如何處理這個底數。

**範例 G.7**
計算以下對數函數的值：
a. $\\log 233$
b. $\\ln 45$
**解答**
對於這兩個底數，我們可以使用計算器：
a. $\\log 233 \\approx 2.367$
b. $\\ln 45 \\approx 3.81$

**換底公式**
我們經常需要找出底數不是 $e$ 或 10 的對數函數的值。如果可用的計算器不能給出我們所需底數的結果，我們可以使用對數的一個基本性質，換底公式，如下所示：
$\\log_a y = \\frac{\\log_b y}{\\log_b a}$
請注意，右側顯示了兩個以 $b$ 為底的對數函數，這與左側的底數 $a$ 不同。這意味著我們可以選擇計算器中可用的底數（底數 $b$）並找出不可用底數（底數 $a$）的對數。

**範例 G.8**
計算以下對數函數的值：
a. $\\log_3 810$
b. $\\log_5 600$
c. $\\log_2 1024$
d. $\\log_2 600$
**解答**
這些底數通常在大多數計算器上不可用，但我們可以使用可用的底數 10。
a. $\\log_3 810 = \\log 810 / \\log 3 = 2.908 / 0.477 \\approx 6.095$
b. $\\log_5 600 = \\log 600 / \\log 5 = 2.778 / 0.699 \\approx 3.975$
c. $\\log_2 1024 = \\log 1024 / \\log 2 = 3.01 / 0.301 = 10$
d. $\\log_2 600 = \\log 600 / \\log 2 \\approx 2.778 / 0.301 \\approx 9.223$

**範例 G.9**
底數 2 在電腦科學中非常常見。由於我們知道 $\\log_{10} 2 \\approx 0.301$，計算（近似）這個底數的對數非常容易。我們找出底數 10 的對應數字的對數並除以 0.310。或者，我們可以將底數 10 的對應對數乘以 3.332 ($\\approx 1 / 0.301$)。
a. $\\log_2 600 \\approx 3.322 \\times \\log_{10} 600 \\approx 3.322 \\times 2.778 \\approx 9.228$
b. $\\log_2 2048 \\approx 3.322 \\times \\log_{10} 2048 \\approx 3.322 \\times 2.778 = 11$

**對數函數的性質**
對數函數有六個有用的性質，每個都與指數函數的相應性質有關（前面提到過）。
1. $\\log_a 1 = 0$
2. $\\log_a a = 1$
3. $\\log_a (1/x) = -\\log_a x$
4. $\\log_a (x \\times y) = \\log_a x + \\log_a y$
5. $\\log_a (x/y) = \\log_a x - \\log_a y$
6. $\\log_a x^y = y \\times \\log_a x$

**範例 G.10**
計算以下對數函數的值。
a. $\\log_3 1$
b. $\\log_3 3$
c. $\\log (1/10)$
d. $\\log_a (x \\times y)$ 如果我們知道 $\\log_a x = 2$ 且 $\\log_a y = 3$
e. $\\log_a (x/y)$ 如果我們知道 $\\log_a x = 2$ 且 $\\log_a y = 3$
f. $\\log_2 (1024)$ 不使用計算器
**解答**
我們使用對數函數的性質來解決問題：
a. $\\log_3 1 = 0$
b. $\\log_3 3 = 1$
c. $\\log (1/10) = \\log 10^{-1} = -1 \\log 10 = -1$
d. $\\log_a (x \\times y) = \\log_a x + \\log_a y = 2 + 3 = 5$
e. $\\log_a (x / y) = \\log_a x - \\log_a y = 2 - 3 = -1$
f. $\\log_2 (1024) = \\log_2 (2^{10}) = 10 \\times \\log_2 2 = 10 \\times 1 = 10$

## G.2 模數運算
在整數運算中，如果我們將 $a$ 除以 $n$，我們可以得到 $q$ 和 $r$。這四個整數之間的關係可以表示為 $a = q \\times n + r$。在這個關係中，$a$ 稱為被除數，$q$ 為商，$n$ 為除數，$r$ 為餘數。由於一個運算通常只定義一個單一輸出，這不是一個運算。我們可以稱之為**除法關係**。

**範例 G.11**
假設 $a = 214$ 且 $n = 13$。我們可以使用我們在算術中學到的除法演算法找到 $q = 16$ 和 $r = 6$，如圖 G.1 所示。
大多數電腦語言可以使用特定語言的運算子找到商和餘數。例如，在 C 語言中，除法運算子 (/) 可以找到商，模數運算子 (%) 可以找到餘數。

### G.2.1 模數運算子
在模數運算中，我們只對其中一個輸出感興趣，即餘數 $r$。我們不關心商 $q$。換句話說，我們想知道當我們將 $a$ 除以 $n$ 時，$r$ 的值是多少。這意味著我們可以將上述關係更改為具有兩個輸入 $a$ 和 $n$ 以及一個輸出 $r$ 的二元運算子。該二元運算子稱為**模數運算子**，顯示為 **mod**。第二個輸入 ($n$) 稱為**模數**，輸出 $r$ 稱為**餘數**。圖 G.2 顯示了除法關係與模數運算子的比較。

模數運算子 (**mod**) 獲取一個整數 ($a$) 和一個模數 ($n$)。運算子創建一個餘數 ($r$)。雖然 $a$ 和 $r$ 可以是任何整數，但 $n$ 不能為 0，因為這意味著除以零，這會產生未定義的值或無窮大。然而，在實踐中，我們需要 $n$ 的值為非負。因此，$a$ 和 $r$ 的值應在 0 到 $n - 1$ 之間。

**範例 G.12**
模數運算的一個很好的例子是我們的時鐘系統。時鐘基於模 12 運算。然而，我們時鐘中的整數 12 實際上應該是 0，以使其符合模數運算。

**範例 G.13**
找出以下運算的結果：
a. 28 mod 6
b. 32 mod 12
c. 19 mod 15
d. 7 mod 11
**解答**
我們正在尋找餘數 $r$。我們可以將 $a$ 除以 $n$ 並找到 $q$ 和 $r$。然後我們可以忽略 $q$ 並保留 $r$。
a. 28 除以 6 的結果是 $r = 4$。這意味著 28 mod 6 = 4。
b. 32 除以 12 的結果是 $r = 8$。這意味著 32 mod 12 = 8。
c. 19 除以 15 的結果是 $r = 4$。這意味著 19 mod 15 = 4。
d. 7 除以 11 的結果是 $r = 7$。這意味著 7 mod 11 = 7。

### G.2.2 算術運算
我們為整數討論的三個二元運算（加、減和乘）也可以為模數運算定義。如果結果大於 $n - 1$，我們可能需要將結果正規化（應用 mod 運算並使用餘數），如圖 G.3 所示。

實際上，這裡使用了兩組二元運算子。第一組是二元運算子之一 (+, -, $\\times$)，第二組是 **mod** 運算子。我們需要使用括號來強調運算的順序。如果在計算過程中的任何時候我們發現 $r$ 為負值，則該值應被正規化。我們需要將模數加到結果中，直到其變為正數為止。

**範例 G.14**
執行以下運算：
a. 使用模數 15 將 7 加到 14。
b. 使用模數 13 從 7 中減去 11。
c. 使用模數 20 將 11 乘以 7。
**解答**
以下顯示了每種情況涉及的兩個步驟：
$(14 + 7) \\text{ mod } 15 \\rightarrow (21) \\text{ mod } 15 = 6$
$(7 - 11) \\text{ mod } 13 \\rightarrow (-4) \\text{ mod } 13 = -4 + 13 = 9$
$(7 \\times 11) \\text{ mod } 20 \\rightarrow (77) \\text{ mod } 20 = 17$

**範例 G.15**
執行以下運算：
a. 使用模數 14 將 17 加到 27。
b. 使用模數 13 從 12 中減去 43。
c. 使用模數 19 將 123 乘以 -10。
**解答**
請注意，這些範例中的整數有時超出了 0 到 $n - 1$ 的範圍。我們可以在應用運算之前或之後對它們進行正規化。我們展示第二種選擇，您可以嘗試第一種選擇。結果應該是相同的。
$(17 + 27) \\text{ mod } 14 \\rightarrow (44) \\text{ mod } 14 = 2$
$(12 - 43) \\text{ mod } 15 \\rightarrow (-31) \\text{ mod } 15 = -1 + 15 = 14$
$(123 \\times -10) \\text{ mod } 20 \\rightarrow (-1230) \\text{ mod } 19 = -14 + 19 = 5$

**模-2 運算**
模-2 運算特別令人感興趣。由於模數是 2，我們只能使用值 0 和 1。這種運算中的操作非常簡單。以下顯示了我們如何加或減 2 個位元：
加法：$(0 + 0) \\text{ mod } 2 = 0$  $(0 + 1) \\text{ mod } 2 = 1$
$(1 + 0) \\text{ mod } 2 = 1$  $(1 + 1) \\text{ mod } 2 = 0$
減法：$(0 - 0) \\text{ mod } 2 = 0$  $(0 - 1) \\text{ mod } 2 = 1$
$(1 - 0) \\text{ mod } 2 = 1$  $(1 - 1) \\text{ mod } 2 = 0$
特別注意，加法和減法給出相同的結果。在這種運算中，我們使用 XOR（互斥或）運算進行加法和減法。如果兩個位元相同，XOR 運算的結果為 0，如果兩個位元不同，結果為 1。圖 G.4 顯示了此運算。

## G.3 離散餘弦轉換
在本節中，我們給出離散餘弦和逆離散餘弦轉換的數學背景，這些轉換用於資料壓縮，如第 15 章所述。

### G.3.1 離散餘弦轉換
離散餘弦轉換 (DCT) 改變每個 64 像素的區塊，以便保留像素之間的相對關係，但揭示冗餘。公式如下。$P(x, y)$ 定義圖片區塊中的一個特定值，而 $T(m, n)$ 定義轉換區塊中的一個值。

$T(m, n) = 0.25 c(m) c(n) \\sum_{x=0}^7 \\sum_{y=0}^7 P(x, y) \\cos \\left[ \\frac{(2x + 1)m\\pi}{16} \\right] \\cos \\left[ \\frac{(2y + 1)n\\pi}{16} \\right]$

其中如果 $i = 0$，則 $c(i) = 1/\\sqrt{2}$，否則 $c(i) = 1$。

### G.3.2 逆離散餘弦轉換
逆轉換用於從 $T(m, n)$ 表創建 $P(x, y)$ 表。

$P(x, y) = 0.25 \\sum_{m=0}^7 \\sum_{n=0}^7 c(m) c(n) T(m, n) \\cos \\left[ \\frac{(2m + 1)x\\pi}{16} \\right] \\cos \\left[ \\frac{(2n + 1)y\\pi}{16} \\right]$

其中如果 $i = 0$，則 $c(i) = 1/\\sqrt{2}$，否則 $c(i) = 1$。

**範例 G.16**
如果 $P(x, y) = 20$ 對於所有 $x$ 和 $y$，求 $T(0, 0)$ 和 $T(0, 1)$。
**解答**
使用積化和差恆等式 $\\cos x + \\cos y = 2[\\cos(x + y)/2] [\\cos(x - y)/2]$，我們可以證明所有餘弦項之和為 0。
`,
};
