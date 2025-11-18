
export const chapter2Content = {
  en: `
# 2. Introduction to C Programming

In this chapter we introduce C programming and present several examples that illustrate many important features of C. Each example is analyzed one statement at a time. In Chapters 3 and 4 we present an introduction to structured programming in C. We then use the structured approach throughout the remainder of the C portion of the text. We provide the first of many “Secure C Programming" sections.

## 2.1 Introduction
The C language facilitates a structured and disciplined approach to computer-program design. In this chapter we introduce C programming and present several examples that illustrate many important features of C. Each example is analyzed one statement at a time. In Chapters 3 and 4 we present an introduction to structured programming in C. We then use the structured approach throughout the remainder of the C portion of the text. We provide the first of many “Secure C Programming" sections.

## 2.2 A Simple C Program: Printing a Line of Text
C uses some notations that may appear strange to people who have not programmed computers. We begin by considering a simple C program. Our first example prints a line of text. The program and its screen output are shown in Fig. 2.1.

\`\`\`c
// Fig. 2.1: fig02_01.c
// A first program in C.
#include <stdio.h>

// function main begins program execution
int main( void )
{
    printf( "Welcome to C!\\n" );
} // end function main
\`\`\`

### Comments
Even though this program is simple, it illustrates several important features of the C language. Lines 1 and 2 begin with \`//\`, indicating that these two lines are comments. You insert comments to document programs and improve program readability. Comments do not cause the computer to perform any action when the program is run—they’re ignored by the C compiler and do not cause any machine-language object code to be generated. You can also use \`/*...*/\` multi-line comments. We prefer \`//\` comments because they're shorter and they eliminate common programming errors that occur with \`/*...*/\` comments, especially when the closing \`*/\` is omitted.

### #include Preprocessor Directive
Line 3, \`#include <stdio.h>\`, is a directive to the C preprocessor. Lines beginning with \`#\` are processed by the preprocessor before compilation. Line 3 tells the preprocessor to include the contents of the standard input/output header (\<stdio.h\>) in the program. This header contains information used by the compiler when compiling calls to standard input/output library functions such as \`printf\`.

### Blank Lines and White Space
Line 4 is simply a blank line. You use blank lines, space characters and tab characters (i.e., "tabs") to make programs easier to read. Together, these characters are known as white space. White-space characters are normally ignored by the compiler.

### The main Function
Line 6, \`int main(void)\`, is a part of every C program. The parentheses after \`main\` indicate that \`main\` is a program building block called a function. C programs contain one or more functions, one of which must be \`main\`. Every program in C begins executing at the function \`main\`. Functions can return information. The keyword \`int\` to the left of main indicates that main “returns” an integer (whole-number) value. Functions also can receive information. The \`void\` in parentheses here means that \`main\` does not receive any information.

> **Good Programming Practice 2.1**
> Every function should be preceded by a comment describing the function’s purpose.

A left brace, \`{\`, begins the body of every function (line 7). A corresponding right brace ends each function (line 9). This pair of braces and the portion of the program between the braces is called a block.

### An Output Statement
Line 8, \`printf( "Welcome to C!\\n" );\`, instructs the computer to perform an action, namely to print on the screen the string of characters marked by the quotation marks. A string is sometimes called a character string, a message or a literal. The entire line, including the \`printf\` function, its argument, and the semicolon (\`;\`), is called a statement. Every statement must end with a semicolon.

### Escape Sequences
Notice that the characters \`\\n\` were not printed on the screen. The backslash (\`\\\`) is called an escape character. It indicates that \`printf\` is supposed to do something out of the ordinary. When encountering a backslash, the compiler looks ahead at the next character to form an escape sequence. \`\\n\` means newline.

| Escape sequence | Description |
|---|---|
| \`\\n\` | Newline. Position the cursor to the beginning of the next line. |
| \`\\t\` | Horizontal tab. Move the cursor to the next tab stop. |
| \`\\a\` | Alert. Produces a sound or visible alert. |
| \`\\\\\` | Backslash. Insert a backslash character in a string. |
| \`\\"\` | Double quote. Insert a double-quote character in a string. |

### The Linker and Executables
Standard library functions like \`printf\` and \`scanf\` are not part of the C programming language. When the compiler compiles a \`printf\` statement, it merely provides space in the object program for a "call" to the library function. The linker locates the library functions and inserts the proper calls to these library functions in the object program. The linked program is called an executable.

## 2.3 Another Simple C Program: Adding Two Integers
Our next program uses the Standard Library function \`scanf\` to obtain two integers typed by a user, computes the sum, and prints the result.

\`\`\`c
// Fig. 2.5: fig02_05.c
// Addition program.
#include <stdio.h>

// function main begins program execution
int main( void )
{
    int integer1; // first number to be entered by user
    int integer2; // second number to be entered by user
    int sum; // variable in which sum will be stored

    printf("Enter first integer\\n" ); // prompt
    scanf("%d", &integer1); // read an integer

    printf("Enter second integer\\n"); // prompt
    scanf("%d", &integer2); // read an integer

    sum = integer1 + integer2; // assign total to sum
    printf( "Sum is %d\\n", sum); // print sum
} // end function main
\`\`\`

### Variables and Variable Definitions
The names \`integer1\`, \`integer2\`, and \`sum\` are variables—locations in memory where values can be stored. These definitions specify that the variables are of type \`int\`, meaning they'll hold integer values. All variables must be defined with a name and a data type before they can be used. A variable name in C can be any valid identifier (a series of letters, digits and underscores that does not begin with a digit). C is case sensitive.

### The scanf Function and Formatted Inputs
The \`scanf\` function obtains a value from the user. It has two arguments, \`"%d"\` and \`&integer1\`. The first, the format control string, indicates the type of data that should be entered. The \`%d\` conversion specifier indicates an integer. The second argument begins with an ampersand (\`&\`)—the address operator. It tells \`scanf\` the location in memory where the variable \`integer1\` is stored.

### Assignment Statement
The assignment statement \`sum = integer1 + integer2;\` calculates the total and assigns the result to \`sum\` using the assignment operator \`=\`.

## 2.4 Memory Concepts
Variable names such as \`integer1\`, \`integer2\` and \`sum\` actually correspond to locations in the computer's memory. Every variable has a name, a type and a value. When a value is placed in a memory location, it replaces the previous value; this is called a destructive process. When a value is read from memory, the process is said to be nondestructive.

## 2.5 Arithmetic in C
Most C programs perform calculations using the C arithmetic operators.

| C operation | Arithmetic operator | Algebraic expression | C expression |
|---|---|---|---|
| Addition | \`+\` | f + 7 | \`f + 7\` |
| Subtraction | \`-\` | p - c | \`p - c\` |
| Multiplication | \`*\` | bm | \`b * m\` |
| Division | \`/\` | x/y or x ÷ y | \`x / y\` |
| Remainder | \`%\` | r mod s | \`r % s\` |

### Rules of Operator Precedence
C applies operators in arithmetic expressions in a precise sequence determined by the rules of operator precedence.
1.  **Parentheses**: Evaluated first.
2.  **Multiplication, division, and remainder**: Evaluated second, from left to right.
3.  **Addition and subtraction**: Evaluated third, from left to right.
4.  **Assignment**: Evaluated last.

## 2.6 Decision Making: Equality and Relational Operators
The \`if\` statement allows a program to make a decision based on the truth or falsity of a condition. Conditions are formed using equality operators (\`==\`, \`!=\`) and relational operators (\`>\`, \`<\`, \`>=\`, \`<=\`).

\`\`\`c
// Fig. 2.13: fig02_13.c
// Using if statements, relational operators, and equality operators.
#include <stdio.h>

int main( void )
{
    int num1; // first number to be read from user
    int num2; // second number to be read from user

    printf("Enter two integers, and I will tell you\\n");
    printf("the relationships they satisfy: ");
    scanf("%d %d", &num1, &num2); // read two integers

    if ( num1 == num2 ) {
        printf("%d is equal to %d\\n", num1, num2 );
    }
    if ( num1 != num2 ) {
        printf("%d is not equal to %d\\n", num1, num2 );
    }
    if ( num1 < num2 ) {
        printf("%d is less than %d\\n", num1, num2);
    }
    if ( num1 > num2 ) {
        printf("%d is greater than %d\\n", num1, num2);
    }
    if ( num1 <= num2 ) {
        printf("%d is less than or equal to %d\\n", num1, num2);
    }
    if ( num1 >= num2 ) {
        printf("%d is greater than or equal to %d\\n", num1, num2 );
    }
}
\`\`\`

## 2.7 Secure C Programming
The words we've used in C programs—in particular \`int\`, \`if\` and \`void\`—are keywords or reserved words of the language. They have special meaning to the compiler and cannot be used as identifiers.

### Avoid Single-Argument printfs
One guideline is to avoid using \`printf\` with a single string argument. If you need to display a string that terminates with a newline, use the \`puts\` function. If you need to display a string without a terminating newline character, use \`printf\` with two arguments—a \`"%s"\` format control string and the string to display.

`,
  zh: `
# 第二章：C 語言程式設計入門

本章我們介紹 C 程式設計，並提供幾個範例來說明 C 的許多重要特性。每個範例都將逐一分析其陳述式。在第三章和第四章中，我們將介紹 C 的結構化程式設計。接著，我們將在本書 C 語言部分的其餘內容中持續使用結構化方法。我們也提供了許多「安全 C 程式設計」章節中的第一個。

## 2.1 簡介
C 語言有助於採用結構化且有紀律的方法來設計電腦程式。本章我們介紹 C 程式設計，並提供幾個範例來說明 C 的許多重要特性。每個範例都將逐一分析其陳述式。在第三章和第四章中，我們將介紹 C 的結構化程式設計。接著，我們將在本書 C 語言部分的其餘內容中持續使用結構化方法。我們也提供了許多「安全 C 程式設計」章節中的第一個。

## 2.2 一個簡單的 C 程式：印出一行文字
C 語言使用一些對於未曾編寫過電腦程式的人來說可能顯得陌生的符號。我們從一個簡單的 C 程式開始。我們的第一個範例印出一行文字。程式及其螢幕輸出顯示在圖 2.1 中。

\`\`\`c
// 圖 2.1: fig02_01.c
// 第一個 C 程式。
#include <stdio.h>

// main 函式開始程式執行
int main( void )
{
    printf( "Welcome to C!\\n" );
} // main 函式結束
\`\`\`

### 註解
儘管這個程式很簡單，它卻展示了 C 語言的幾個重要特性。第 1 行和第 2 行以 \`//\` 開頭，表示這兩行是註解。您插入註解是為了記錄程式並提高程式的可讀性。註解不會在程式運行時讓電腦執行任何動作——它們會被 C 編譯器忽略，且不會產生任何機器語言目的碼。您也可以使用 \`/*...*/\` 多行註解。我們偏好使用 \`//\` 註解，因為它們更短，並且能消除使用 \`/*...*/\` 註解時常見的程式設計錯誤，特別是當結尾的 \`*/\` 被省略時。

### #include 前置處理器指令
第 3 行，\`#include <stdio.h>\`，是給 C 前置處理器的指令。以 \`#\` 開頭的行在編譯前由前置處理器處理。第 3 行告訴前置處理器將標準輸入/輸出標頭檔（\<stdio.h\>）的內容包含到程式中。這個標頭檔包含了編譯器在編譯對標準輸入/輸出函式庫（如 \`printf\`）的呼叫時所使用的資訊。

### 空白行與空白字元
第 4 行只是一個空白行。您可以使用空白行、空格字元和定位字元（即「tabs」）來使程式更容易閱讀。這些字元統稱為空白字元。空白字元通常會被編譯器忽略。

### main 函式
第 6 行，\`int main(void)\`，是每個 C 程式的一部分。\`main\` 後面的括號表示 \`main\` 是一個稱為函式的程式建構塊。C 程式包含一個或多個函式，其中之一必須是 \`main\`。C 語言的每個程式都從 \`main\` 函式開始執行。函式可以回傳資訊。\`main\` 左邊的關鍵字 \`int\` 表示 \`main\`「回傳」一個整數值。函式也可以接收資訊。這裡括號中的 \`void\` 表示 \`main\` 不接收任何資訊。

> **良好程式設計實踐 2.1**
> 每個函式前都應該有註解描述其目的。

左大括號 \`{\` 開始每個函式的主體（第 7 行）。對應的右大括號結束每個函式（第 9 行）。這對大括號及其之間的程式部分稱為一個區塊。

### 一個輸出陳述式
第 8 行，\`printf( "Welcome to C!\\n" );\`，指示電腦執行一個動作，即在螢幕上印出由引號標記的字元串。字串有時被稱為字元串、訊息或字面值。整行，包括 \`printf\` 函式、其參數以及分號（\`；\`），稱為一個陳述式。每個陳述式都必須以分號結尾。

### 逸出序列
請注意，字元 \`\\n\` 並沒有被印在螢幕上。反斜線（\`\\\`）稱為逸出字元。它表示 \`printf\` 應該做一些不尋常的事情。當遇到反斜線時，編譯器會查看下一個字元以形成一個逸出序列。\`\\n\` 表示換行。

| 逸出序列 | 描述 |
|---|---|
| \`\\n\` | 換行。將游標定位到下一行的開頭。 |
| \`\\t\` | 水平定位字元。將游標移動到下一個定位點。 |
| \`\\a\` | 警告。產生聲音或可見的警示。 |
| \`\\\\\` | 反斜線。在字串中插入一個反斜線字元。 |
| \`\\"\` | 雙引號。在字串中插入一個雙引號字元。 |

### 連結器與可執行檔
標準函式庫函式如 \`printf\` 和 \`scanf\` 並不是 C 程式語言的一部分。當編譯器編譯一個 \`printf\` 陳述式時，它僅在目的程式中為呼叫該函式庫函式預留空間。連結器會找到這些函式庫函式，並在目的程式中插入對這些函式的正確呼叫。連結後的程式稱為可執行檔。

## 2.3 另一個簡單的 C 程式：兩數相加
我們的下一個程式使用標準函式庫的 \`scanf\` 函式來獲取使用者輸入的兩個整數，計算它們的和，並印出結果。

\`\`\`c
// 圖 2.5: fig02_05.c
// 加法程式。
#include <stdio.h>

// main 函式開始程式執行
int main( void )
{
    int integer1; // 使用者要輸入的第一個數字
    int integer2; // 使用者要輸入的第二個數字
    int sum; // 將儲存總和的變數

    printf("Enter first integer\\n" ); // 提示
    scanf("%d", &integer1); // 讀取一個整數

    printf("Enter second integer\\n"); // 提示
    scanf("%d", &integer2); // 讀取一個整數

    sum = integer1 + integer2; // 將總和賦值給 sum
    printf( "Sum is %d\\n", sum); // 印出總和
} // main 函式結束
\`\`\`

### 變數與變數定義
名稱 \`integer1\`、\`integer2\` 和 \`sum\` 是變數——記憶體中可以儲存值的位置。這些定義指定這些變數的類型為 \`int\`，表示它們將儲存整數值。所有變數在使用前都必須用名稱和資料類型進行定義。C 語言中的變數名稱可以是任何有效的識別碼（由字母、數字和底線組成且不以數字開頭的序列）。C 語言區分大小寫。

### scanf 函式與格式化輸入
\`scanf\` 函式從使用者那裡獲取一個值。它有兩個參數，\`"%d"\` 和 \`&integer1\`。第一個，格式控制字串，指示應該輸入的資料類型。\`%d\` 轉換說明符表示整數。第二個參數以 \`&\`（位址運算子）開頭。它告訴 \`scanf\` 變數 \`integer1\` 在記憶體中的儲存位置。

### 賦值陳述式
賦值陳述式 \`sum = integer1 + integer2;\` 計算總和並使用賦值運算子 \`=\` 將結果賦給 \`sum\`。

## 2.4 記憶體概念
變數名稱如 \`integer1\`、\`integer2\` 和 \`sum\` 實際上對應於電腦記憶體中的位置。每個變數都有一個名稱、一個類型和一個值。當一個值被放入記憶體位置時，它會取代之前的值；這稱為破壞性過程。當從記憶體中讀取一個值時，該過程被稱為非破壞性的。

## 2.5 C 語言的算術運算
大多數 C 程式使用 C 算術運算子進行計算。

| C 運算 | 算術運算子 | 代數表達式 | C 表達式 |
|---|---|---|---|
| 加法 | \`+\` | f + 7 | \`f + 7\` |
| 減法 | \`-\` | p - c | \`p - c\` |
| 乘法 | \`*\` | bm | \`b * m\` |
| 除法 | \`/\` | x/y 或 x ÷ y | \`x / y\` |
| 餘數 | \`%\` | r mod s | \`r % s\` |

### 運算子優先順序規則
C 語言按照運算子優先順序規則的精確順序來應用算術表達式中的運算子。
1.  **括號**：最先計算。
2.  **乘法、除法和餘數**：第二順位，由左至右計算。
3.  **加法和減法**：第三順位，由左至右計算。
4.  **賦值**：最後計算。

## 2.6 決策：相等與關係運算子
\`if\` 陳述式允許程式根據條件的真假來做出決策。條件是使用相等運算子（\`==\`、\`!=\`）和關係運算子（\`>\`、\`<\`、\`>=\`、\`<=\`）形成的。

\`\`\`c
// 圖 2.13: fig02_13.c
// 使用 if 陳述式、關係運算子和相等運算子。
#include <stdio.h>

int main( void )
{
    int num1; // 從使用者讀取的第一個數字
    int num2; // 從使用者讀取的第二個數字

    printf("Enter two integers, and I will tell you\\n");
    printf("the relationships they satisfy: ");
    scanf("%d %d", &num1, &num2); // 讀取兩個整數

    if ( num1 == num2 ) {
        printf("%d is equal to %d\\n", num1, num2 );
    }
    if ( num1 != num2 ) {
        printf("%d is not equal to %d\\n", num1, num2 );
    }
    if ( num1 < num2 ) {
        printf("%d is less than %d\\n", num1, num2);
    }
    if ( num1 > num2 ) {
        printf("%d is greater than %d\\n", num1, num2);
    }
    if ( num1 <= num2 ) {
        printf("%d is less than or equal to %d\\n", num1, num2);
    }
    if ( num1 >= num2 ) {
        printf("%d is greater than or equal to %d\\n", num1, num2 );
    }
}
\`\`\`

## 2.7 安全的 C 程式設計
我們在 C 程式中使用的詞彙——特別是 \`int\`、\`if\` 和 \`void\`——是該語言的關鍵字或保留字。它們對編譯器有特殊意義，不能用作識別碼。

### 避免單一參數的 printf
一個指導原則是避免使用帶有單一字串參數的 \`printf\`。如果您需要顯示以換行符結尾的字串，請使用 \`puts\` 函式。如果您需要顯示不帶終止換行符的字串，請使用帶有兩個參數的 \`printf\`——一個 \`"%s"\` 格式控制字串和要顯示的字串。

`
};
