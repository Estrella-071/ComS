
export const appendixFContent = {
  en: `
# Appendix F: Examples of Programs in C, C++, and Java

This appendix presents examples of programs written in three languages to give a general idea about their structure.

## F.1 PROGRAMS IN C LANGUAGE
C is a procedural language. Program F-1 shows a simple "Hello World!" program using only the sequence construct. Other examples demonstrate decision (if-else) and repetition (for loop) constructs.

\`\`\`c
// Program F-1: First program in C
#include <stdio.h>

int main ()
{
  // Statement
  printf ("Hello World\\n");
  return 0;
} // End of main
\`\`\`

## F.2 PROGRAMS IN C++ LANGUAGE
C++ is an object-oriented language that builds upon C. The examples are rewritten using C++ features, such as the \`cout\` and \`cin\` objects for input/output.

\`\`\`cpp
// Program F-4: First program in C++
#include <iostream>

int main ()
{
  // Statement
  std::cout << "Hello World!" << std::endl;
  return 0;
} // End of main
\`\`\`

## F.3 PROGRAMS IN JAVA LANGUAGE
Java is a purely object-oriented language. The same programs are shown in Java, highlighting the need for a class to contain the \`main\` method and the use of Java's standard libraries for I/O.

\`\`\`java
// Program F-7: First program in Java
public class First
{
  public static void main (String[] args)
  {
    System.out.println ("Hello World!");
  } // End main
} // End class
\`\`\`
`,
  zh: `
# 附錄 F：C、C++ 和 Java 程式範例

本附錄展示了用三種語言編寫的程式範例，以提供關於其結構的一般概念。

## F.1 C 語言程式
C 是一種程序化語言。程式 F-1 展示了一個僅使用循序建構的簡單「Hello World!」程式。其他範例則示範了決策 (if-else) 和重複 (for 迴圈) 建構。

\`\`\`c
// 程式 F-1：第一個 C 程式
#include <stdio.h>

int main ()
{
  // 陳述式
  printf ("Hello World\\n");
  return 0;
} // main 結束
\`\`\`

## F.2 C++ 語言程式
C++ 是一種建立在 C 語言之上的物件導向語言。範例使用 C++ 的特性重寫，例如使用 \`cout\` 和 \`cin\` 物件進行輸入/輸出。

\`\`\`cpp
// 程式 F-4：第一個 C++ 程式
#include <iostream>

int main ()
{
  // 陳述式
  std::cout << "Hello World!" << std::endl;
  return 0;
} // main 結束
\`\`\`

## F.3 JAVA 語言程式
Java 是一種純粹的物件導向語言。同樣的程式以 Java 呈現，突顯了需要一個類別來包含 \`main\` 方法以及使用 Java 的標準函式庫進行 I/O。

\`\`\`java
// 程式 F-7：第一個 Java 程式
public class First
{
  public static void main (String[] args)
  {
    System.out.println ("Hello World!");
  } // main 結束
} // class 結束
\`\`\`
`,
};
