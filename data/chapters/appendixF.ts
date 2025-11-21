
export const appendixFContent = {
  en: `
# Appendix F: Examples of Programs in C, C++, and Java

In this appendix we present some examples of programs written in three languages, C, C++, and Java, to give a general idea about the structure of these three common languages. Note that the line number at the left of each program is not part of the program; it is added to make references easier. Also note that the text in color are comments and ignored by the compiler when the program is compiled into machine language.

## F.1 PROGRAMS IN C LANGUAGE
In this section, we show three simple programs in C. The goal is not to teach the language; it is to give an idea what programs in C look like.

### Example F.1
Program F-1 is the simplest program written in the C language that prints the message ‘Hello World!’. It is an example that uses only the sequence construct, which means that the code is executed line by line without branching or repeating some sections.

**Program F-1 First program in C**
\`\`\`c
1 /*
2 This program shows how we can use only sequence construct
3 to achieve a simple goal.
4 */
5
6 #include <stdio.h>
7
8 int main ()
9 {
10   // Statement
11   printf ("Hello World\\n");
12   return 0;
13
14 } // End of main
\`\`\`
**Run:**
Hello World

### Example F.2
Program F-2 is an example of a simple program in C that uses both sequence and branching construct. If a condition is met, the program executes some lines; if not, other lines are executed. We run the program twice to show the two different cases.

**Program F-2 Second program in C**
\`\`\`c
1 /*
2 This program shows how to make a decision in a program written in C.
3 The program gets an integer and finds if it is divisible by 7.
4 */
5
6 #include <stdio.h>
7
8 int main ()
9 {
10   // Declaration
11   int num;
12   // Statement
13   printf ("Enter an integer: ");
14   scanf ("%d", &num);
15   // Selection
16   if (num % 7 == 0)
17   {
18     printf ("The number %d", num);
19     printf (" is divisible by 7.\\n");
20   }
21   else
22   {
23     printf ("The number %d", num);
24     printf (" is not divisible by 7.\\n");
25   }
26   return 0;
27 } // End of main
\`\`\`
**Run:**
Enter an integer: 24
The number 24 is not divisible by 7.
**Run:**
Enter an integer: 35
The number 35 is divisible by 7.

### Example F.3
Program F-3 shows the combination of sequence and repetition construct. We use a loop to repeatedly print a number, but the number is changing in each repetition. We run the program twice: the first time, the limit is 6; the second time the limit is 9.

**Program F-3 Third program in C**
\`\`\`c
1 /*
2 This program shows how to use repetition in C.
3 The program prints number from 1 to n, in which n is given by the user.
4 */
5
6 #include <stdio.h>
7
8 int main ()
9 {
10 // Declaration
11 int n;
12 int i;
13 // Statement
14 printf ("Enter the upper limit: ");
15 scanf ("%d", &n);
16 // Repetition
17 for (i = 1; i <= n; i++)
18 {
19   printf ("%d\\n", i);
20 }
21 return 0;
22 } // End of main
\`\`\`
**Run:**
Enter the upper limit: 6
1
2
3
4
5
6
**Run:**
Enter the upper limit: 9
1
2
3
4
5
6
7
8
9

## F.2 PROGRAMS IN C++ LANGUAGE
In this section, we show how to write the same three previous programs using the C++ language. The point is to show the similarity and differences between the languages. The C language is a procedural language in which there are no classes and objects. On the other hand, C++ is an object-oriented language in which we can have classes and objects.

### Example F.4
Program F-4 accomplishes the same purpose as Program F-1, but it is written in C++ instead of C. We can see the main difference in line 14. To print data in C++, we need to use an object. The term *cout* defines an object that is responsible to output data.

**Program F-4 First program in C++**
\`\`\`cpp
1 /*
2 This program demonstrates some of the components of a simple
3 program written in C++
4 */
5
6 #include <iostream>
7 #include <iomanip>
8
9 using namespace std;
10
11 int main ()
12 {
13 // Statement
14 cout << "Hello World!" << endl;
15 return 0;
16 } // End of main
\`\`\`
**Run:**
Hello World

### Example F.5
Program F-5 accomplishes the same purpose as Program F-2, but it is written in C++ instead of C. The main difference between this program and its C version is in lines 16, 17, 21, 22, 26, and 27 in which we need to use input object (*cin*) and output objects (*cout*) for input and output.

**Program F-5 Second program in C++**
\`\`\`cpp
1 /*
2 This program shows how to make a decision in a program written in C++.
3 The program gets an integer and prints it if it is less than 50.
4 */
5
6 #include <iostream>
7 #include <iomanip>
8
9 using namespace std;
10
11 int main ()
12 {
13 // Declaration
14 int num;
15 // Statement
16 cout << ("Enter an integer: ");
17 cin >> num;
18 // Decision
19 if (num % 7 == 0)
20 {
21   cout << "The number " << num;
22   cout << " is divisible by 7." << endl;
23 }
24 else
25 {
26   cout << "The number " << num;
27   cout << " is not divisible by 7." << endl;
28 }
29 return 0;
30 } // End of main
\`\`\`
**Run:**
Enter an integer: 22
The number 22 is not divisible by 7.
**Run:**
Enter an integer: 21
The number 21 is divisible by 7.

### Example F.6
Program F-6 accomplishes the same purpose as Program F-3, but it is written in C++ instead of C. The main difference between this program and its C version is in lines 17, 18, and 23 in which we need to use input object (*cin*) and output objects (*cout*) for input and output.

**Program F-6 Third program in C++**
\`\`\`cpp
1 /*
2 This program shows how to use repetition in C++.
3 The program prints number from 1 to n, in which n is given by the user.
4 */
5
6 #include <iostream>
7 #include <iomanip>
8
9 using namespace std;
10
11 int main ()
12 {
13 // Declaration
14 int n;
15
16 // Statement
17 cout << "Enter the upper limit: ";
18 cin >> n;
19
20 // loop
21 for (int i = 1; i <= n; i++)
22 {
23   cout << i << endl;
24 }
25
26 return 0;
27 } // End of main
\`\`\`
**Run:**
Enter the upper limit: 4
1
2
3
4
**Run:**
Enter the upper limit: 8
1
2
3
4
5
6
7
8

## F.3 PROGRAMS IN JAVA LANGUAGE
In this section, we show how to write the same three programs in Java language. The point is to show the similarity and differences between the languages. The first difference we encounter is in the *main* function in C++ and *main* method in Java. In C++, the main function is a stand-alone program; in Java the main method should be part of a class. We call these classes First, Second, and Third respectively in these programs.

### Example F.7
Program F-7 accomplishes the same purpose as Program F-4, but it is written in Java instead of C++. We need a class to host the *main* method. Another difference is in line 10 where we use a predefined object (System.out) for output.

**Program F-7 First program in Java**
\`\`\`java
1 /*
2 This program demonstrates some of the components of a simple
3 program written in Java
4 */
5
6 public class First
7 {
8 public static void main (String[] args)
9 {
10   System.out.println ("Hello World!");
11 } // End main
12 } // End class
\`\`\`

### Example F.8
Program F-8 accomplishes the same purpose as Program F-5, but it is written in Java instead of C++. We need a class to host the *main* method. Other differences are in lines 13, 14, 15, 20, 21, 26, and 27 where we use an object of class Scanner for input and a predefined object (System.out) for output.

**Program F-8 Second program in Java**
\`\`\`java
1 /*
2 This program shows how to make a decision in a program written in Java.
3 The program gets an integer and checks if it is divisible by 7.
4 */
5
6 import java.util.*;
7
8 public class Second
9 {
10 public static void main (String[] args)
11 {
12   // Declaration
13   Scanner input = new Scanner (System.in);
14   System.out.print ("Enter an integer: ");
15   int num = input.nextInt ();
16
17   // Decision
18   if (num % 7 == 0)
19   {
20     System.out.print ("The number " + num);
21     System.out.println (" is divisible by 7");
22
23   }
24   else
25   {
26     System.out.print ("The number " + num);
27     System.out.println (" is not divisible by 7.");
28
29   }
30 } // End main
31
32 } // End class
\`\`\`
**Run:**
Enter an integer: 25
The number 25 is not divisible by 7.
**Run:**
Enter an integer: 42
The number 42 is divisible by 7.

### Example F.9
Program F-9 accomplishes the same purpose as Program F-6, but it is written in Java instead of C++. We need a class to host the *main* method. Other differences are in lines 13, 14, 15, and 20 where we use an object of class Scanner for input and a predefined object (System.out) for output.

**Program F-9 Third program in Java**
\`\`\`java
1 /*
2 This program shows how to use a loop in Java.
3 The program prints number from 1 to n, in which n is given by the user.
4 */
5
6 import java.util.*;
7
8 public class Third
9 {
10  public static void main (String[] args)
11  {
12    // Statements to get the value of n
13    Scanner input = new Scanner (System.in);
14    System.out.print("Enter the upper limit: ");
15    int n = input.nextInt ();
16
17    // Loop
18    for (int i = 1 ; i <= n; i++)
19    {
20      System.out.println (i);
21    }
22  } // End main
23
24 } // End class
\`\`\`
**Run:**
Enter the upper limit: 3
1
2
3
**Run:**
Enter the upper limit: 7
1
2
3
4
5
6
7
`,
  zh: `
# 附錄 F：C、C++ 和 Java 程式範例

本附錄展示了用 C、C++ 和 Java 三種語言編寫的程式範例，以提供關於其結構的一般概念。請注意，每個程式左側的行號不是程式的一部分；添加它是為了方便參考。另請注意，彩色文字是註解，當程式編譯成機器語言時會被編譯器忽略。

## F.1 C 語言程式
在本節中，我們展示了三個簡單的 C 程式。目標不是教授語言，而是提供 C 程式樣貌的概念。

### 範例 F.1
程式 F-1 是用 C 語言編寫的最簡單程式，它印出訊息「Hello World!」。這是一個僅使用循序建構的範例，這意味著代碼逐行執行，沒有分支或重複某些部分。

**程式 F-1 第一個 C 程式**
\`\`\`c
1 /*
2 這個程式展示了我們如何僅使用循序建構
3 來實現一個簡單的目標。
4 */
5
6 #include <stdio.h>
7
8 int main ()
9 {
10   // 陳述式
11   printf ("Hello World\\n");
12   return 0;
13
14 } // main 結束
\`\`\`
**執行：**
Hello World

### 範例 F.2
程式 F-2 是一個簡單的 C 程式範例，它同時使用了循序和分支建構。如果滿足條件，程式執行某些行；如果不滿足，則執行其他行。我們運行程式兩次以顯示兩種不同的情況。

**程式 F-2 第二個 C 程式**
\`\`\`c
1 /*
2 這個程式展示了如何在 C 語言編寫的程式中做出決策。
3 程式獲取一個整數並查找它是否能被 7 整除。
4 */
5
6 #include <stdio.h>
7
8 int main ()
9 {
10   // 宣告
11   int num;
12   // 陳述式
13   printf ("Enter an integer: ");
14   scanf ("%d", &num);
15   // 選擇
16   if (num % 7 == 0)
17   {
18     printf ("The number %d", num);
19     printf (" is divisible by 7.\\n");
20   }
21   else
22   {
23     printf ("The number %d", num);
24     printf (" is not divisible by 7.\\n");
25   }
26   return 0;
27 } // main 結束
\`\`\`
**執行：**
Enter an integer: 24
The number 24 is not divisible by 7.
**執行：**
Enter an integer: 35
The number 35 is divisible by 7.

### 範例 F.3
程式 F-3 顯示了循序和重複建構的組合。我們使用迴圈重複印出一個數字，但數字在每次重複中都會改變。我們運行程式兩次：第一次，上限是 6；第二次上限是 9。

**程式 F-3 第三個 C 程式**
\`\`\`c
1 /*
2 這個程式展示了如何在 C 中使用重複。
3 程式印出從 1 到 n 的數字，其中 n 由使用者給出。
4 */
5
6 #include <stdio.h>
7
8 int main ()
9 {
10 // 宣告
11 int n;
12 int i;
13 // 陳述式
14 printf ("Enter the upper limit: ");
15 scanf ("%d", &n);
16 // 重複
17 for (i = 1; i <= n; i++)
18 {
19   printf ("%d\\n", i);
20 }
21 return 0;
22 } // main 結束
\`\`\`
**執行：**
Enter the upper limit: 6
1
2
3
4
5
6
**執行：**
Enter the upper limit: 9
1
2
3
4
5
6
7
8
9

## F.2 C++ 語言程式
在本節中，我們展示如何使用 C++ 語言編寫相同的三個程式。重點是展示語言之間的相似性和差異。C 語言是一種沒有類別和物件的程序化語言。另一方面，C++ 是一種物件導向語言，我們可以在其中擁有類別和物件。

### 範例 F.4
程式 F-4 完成與程式 F-1 相同的目的，但它是用 C++ 而不是 C 編寫的。我們可以看到第 14 行的主要區別。要在 C++ 中印出資料，我們需要使用一個物件。術語 *cout* 定義了一個負責輸出資料的物件。

**程式 F-4 第一個 C++ 程式**
\`\`\`cpp
1 /*
2 這個程式演示了用 C++ 編寫的簡單程式的
3 一些組件
4 */
5
6 #include <iostream>
7 #include <iomanip>
8
9 using namespace std;
10
11 int main ()
12 {
13 // 陳述式
14 cout << "Hello World!" << endl;
15 return 0;
16 } // main 結束
\`\`\`
**執行：**
Hello World

### 範例 F.5
程式 F-5 完成與程式 F-2 相同的目的，但它是用 C++ 而不是 C 編寫的。此程式與其 C 版本之間的主要區別在於第 16、17、21、22、26 和 27 行，其中我們需要使用輸入物件 (*cin*) 和輸出物件 (*cout*) 進行輸入和輸出。

**程式 F-5 第二個 C++ 程式**
\`\`\`cpp
1 /*
2 這個程式展示了如何在 C++ 編寫的程式中做出決策。
3 程式獲取一個整數，如果它小於 50 則印出它。
4 */
5
6 #include <iostream>
7 #include <iomanip>
8
9 using namespace std;
10
11 int main ()
12 {
13 // 宣告
14 int num;
15 // 陳述式
16 cout << ("Enter an integer: ");
17 cin >> num;
18 // 決策
19 if (num % 7 == 0)
20 {
21   cout << "The number " << num;
22   cout << " is divisible by 7." << endl;
23 }
24 else
25 {
26   cout << "The number " << num;
27   cout << " is not divisible by 7." << endl;
28 }
29 return 0;
30 } // main 結束
\`\`\`
**執行：**
Enter an integer: 22
The number 22 is not divisible by 7.
**執行：**
Enter an integer: 21
The number 21 is divisible by 7.

### 範例 F.6
程式 F-6 完成與程式 F-3 相同的目的，但它是用 C++ 而不是 C 編寫的。此程式與其 C 版本之間的主要區別在於第 17、18 和 23 行，其中我們需要使用輸入物件 (*cin*) 和輸出物件 (*cout*) 進行輸入和輸出。

**程式 F-6 第三個 C++ 程式**
\`\`\`cpp
1 /*
2 這個程式展示了如何在 C++ 中使用重複。
3 程式印出從 1 到 n 的數字，其中 n 由使用者給出。
4 */
5
6 #include <iostream>
7 #include <iomanip>
8
9 using namespace std;
10
11 int main ()
12 {
13 // 宣告
14 int n;
15
16 // 陳述式
17 cout << "Enter the upper limit: ";
18 cin >> n;
19
20 // 迴圈
21 for (int i = 1; i <= n; i++)
22 {
23   cout << i << endl;
24 }
25
26 return 0;
27 } // main 結束
\`\`\`
**執行：**
Enter the upper limit: 4
1
2
3
4
**執行：**
Enter the upper limit: 8
1
2
3
4
5
6
7
8

## F.3 JAVA 語言程式
在本節中，我們展示如何用 Java 語言編寫相同的三個程式。重點是展示語言之間的相似性和差異。我們遇到的第一個區別是 C++ 中的 *main* 函式和 Java 中的 *main* 方法。在 C++ 中，main 函式是一個獨立的程式；在 Java 中，main 方法應該是類別的一部分。我們在這些程式中分別稱這些類別為 First、Second 和 Third。

### 範例 F.7
程式 F-7 完成與程式 F-4 相同的目的，但它是用 Java 而不是 C++ 編寫的。我們需要一個類別來託管 *main* 方法。另一個區別在第 10 行，我們使用預定義物件 (System.out) 進行輸出。

**程式 F-7 第一個 Java 程式**
\`\`\`java
1 /*
2 這個程式演示了用 Java 編寫的簡單程式的
3 一些組件
4 */
5
6 public class First
7 {
8 public static void main (String[] args)
9 {
10   System.out.println ("Hello World!");
11 } // main 結束
12 } // class 結束
\`\`\`

### 範例 F.8
程式 F-8 完成與程式 F-5 相同的目的，但它是用 Java 而不是 C++ 編寫的。我們需要一個類別來託管 *main* 方法。其他區別在第 13、14、15、20、21、26 和 27 行，其中我們使用 Scanner 類別的物件進行輸入，使用預定義物件 (System.out) 進行輸出。

**程式 F-8 第二個 Java 程式**
\`\`\`java
1 /*
2 這個程式展示了如何在 Java 編寫的程式中做出決策。
3 程式獲取一個整數並檢查它是否能被 7 整除。
4 */
5
6 import java.util.*;
7
8 public class Second
9 {
10 public static void main (String[] args)
11 {
12   // 宣告
13   Scanner input = new Scanner (System.in);
14   System.out.print ("Enter an integer: ");
15   int num = input.nextInt ();
16
17   // 決策
18   if (num % 7 == 0)
19   {
20     System.out.print ("The number " + num);
21     System.out.println (" is divisible by 7");
22
23   }
24   else
25   {
26     System.out.print ("The number " + num);
27     System.out.println (" is not divisible by 7.");
28
29   }
30 } // main 結束
31
32 } // class 結束
\`\`\`
**執行：**
Enter an integer: 25
The number 25 is not divisible by 7.
**執行：**
Enter an integer: 42
The number 42 is divisible by 7.

### 範例 F.9
程式 F-9 完成與程式 F-6 相同的目的，但它是用 Java 而不是 C++ 編寫的。我們需要一個類別來託管 *main* 方法。其他區別在第 13、14、15 和 20 行，其中我們使用 Scanner 類別的物件進行輸入，使用預定義物件 (System.out) 進行輸出。

**程式 F-9 第三個 Java 程式**
\`\`\`java
1 /*
2 這個程式展示了如何在 Java 中使用迴圈。
3 程式印出從 1 到 n 的數字，其中 n 由使用者給出。
4 */
5
6 import java.util.*;
7
8 public class Third
9 {
10  public static void main (String[] args)
11  {
12    // 獲取 n 值的陳述式
13    Scanner input = new Scanner (System.in);
14    System.out.print("Enter the upper limit: ");
15    int n = input.nextInt ();
16
17    // 迴圈
18    for (int i = 1 ; i <= n; i++)
19    {
20      System.out.println (i);
21    }
22  } // main 結束
23
24 } // class 結束
\`\`\`
**執行：**
Enter the upper limit: 3
1
2
3
**執行：**
Enter the upper limit: 7
1
2
3
4
5
6
7
`,
};
