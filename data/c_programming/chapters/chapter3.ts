
export const chapter3Content = {
  en: `
# 3. Structured Program Development in C

## Objectives
In this chapter, you'll:
- Use basic problem-solving techniques.
- Develop algorithms through the process of top-down, stepwise refinement.
- Use the if selection statement and the if...else selection statement to select actions.
- Use the while iteration statement to execute statements in a program repeatedly.
- Use counter-controlled iteration and sentinel-controlled iteration.
- Learn structured programming.
- Use increment, decrement and assignment operators.

## 3.1 Introduction
Before writing a program to solve a particular problem, we must have a thorough understanding of the problem and a carefully planned solution approach. Chapters 3 and 4 discuss techniques that facilitate the development of structured computer programs. In Section 4.12, we present a summary of the structured programming techniques developed here and in Chapter 4.

## 3.2 Algorithms
The solution to any computing problem involves executing a series of actions in a specific order. A procedure for solving a problem in terms of
1. the actions to be executed, and
2. the order in which these actions are to be executed
is called an algorithm. The following example demonstrates that correctly specifying the order in which the actions are to be executed is important.
Consider the “rise-and-shine algorithm” followed by one junior executive for getting out of bed and going to work: (1) Get out of bed, (2) take off pajamas, (3) take a shower, (4) get dressed, (5) eat breakfast, (6) carpool to work. This routine gets the executive to work well prepared to make critical decisions. Suppose that the same steps are performed in a slightly different order: (1) Get out of bed, (2) take off pajamas, (3) get dressed, (4) take a shower, (5) eat breakfast, (6) carpool to work. In this case, our junior executive shows up for work soaking wet. Specifying the order in which statements are to be executed in a computer program is called program control. In this and the next chapter, we investigate C’s program control capabilities.

## 3.3 Pseudocode
Pseudocode is an artificial and informal language that helps you develop algorithms. The pseudocode we present here is particularly useful for developing algorithms that will be converted to structured C programs. Pseudocode is similar to everyday English; it’s convenient and user friendly although it’s not an actual computer programming language.
Pseudocode programs are not executed on computers. Rather, they merely help you “think out” a program before attempting to write it in a programming language like C.
Pseudocode consists purely of characters, so you may conveniently type pseudocode programs into a computer using a text editor program. A carefully prepared pseudocode program can be easily converted to a corresponding C program. This is done in many cases simply by replacing pseudocode statements with their C equivalents.
Pseudocode consists only of action and decision statements—those that are executed when the program has been converted from pseudocode to C and is run in C. Definitions are not executable statements—they’re simply messages to the compiler. For example, the definition
\`int i;\`
tells the compiler the type of variable i and instructs the compiler to reserve space in memory for the variable. But this definition does not cause any action—such as input, output, a calculation or a comparison—to occur when the program is executed. Some programmers choose to list each variable and briefly mention the purpose of each at the beginning of a pseudocode program.

## 3.4 Control Structures
Normally, statements in a program are executed one after the other in the order in which they’re written. This is called sequential execution. Various C statements we’ll soon discuss enable you to specify that the next statement to be executed may be other than the next one in sequence. This is called transfer of control.
During the 1960s, it became clear that the indiscriminate use of transfers of control was the root of a great deal of difficulty experienced by software-development groups. The finger of blame was pointed at the goto statement that allows you to specify a transfer of control to one of many possible destinations in a program. The notion of so-called structured programming became almost synonymous with “goto elimination.”
The research of Bohm and Jacopini had demonstrated that programs could be written without any goto statements. The challenge of the era was for programmers to shift their styles to “goto-less programming.” It was not until well into the 1970s that the programming profession started taking structured programming seriously. The results were impressive, as software-development groups reported reduced development times, more frequent on-time delivery of systems and more frequent within-budget completion of software projects. Programs produced with structured techniques were clearer, easier to debug and modify and more likely to be bug free in the first place.
Bohm and Jacopini’s work demonstrated that all programs could be written in terms of only three control structures, namely the sequence structure, the selection structure and the iteration structure. The sequence structure is simple—unless directed otherwise, the computer executes C statements one after the other in the order in which they’re written. The flowchart segment of Fig. 3.1 illustrates C’s sequence structure.

### Flowcharts
A flowchart is a graphical representation of an algorithm or of a portion of an algorithm. Flowcharts are drawn using certain special-purpose symbols such as rectangles, diamonds, rounded rectangles, and small circles; these symbols are connected by arrows called flowlines.
Like pseudocode, flowcharts are useful for developing and representing algorithms, although pseudocode is preferred by most programmers. Flowcharts clearly show how control structures operate; that’s what we use them for in this text.
Consider the flowchart for the sequence structure in Fig. 3.1. We use the rectangle symbol, also called the action symbol, to indicate any type of action including a calculation or an input/output operation. The flowlines in the figure indicate the order in which the actions are performed—first, grade is added to total, then 1 is added to counter. C allows us to have as many actions as we want in a sequence structure. As we’ll soon see, anywhere a single action may be placed, we may place several actions in sequence.

When drawing a flowchart that represents a complete algorithm, the first symbol we use is a rounded rectangle symbol containing the word “Begin.” The last symbol is a rounded rectangle containing the word “End.” When drawing only a portion of an algorithm as in Fig. 3.1, we omit the rounded rectangle symbols in favor of using small circle symbols, also called connector symbols.
Perhaps the most important flowcharting symbol is the diamond symbol, also called the decision symbol, which indicates that a decision is to be made. We’ll discuss the diamond symbol in the next section.

### Selection Statements in C
C provides three types of selection structures in the form of statements. The if selection statement (Section 3.5) either selects (performs) an action if a condition is true or skips the action if the condition is false. The if...else selection statement (Section 3.6) performs an action if a condition is true and performs a different action if the condition is false. The switch selection statement (discussed in Chapter 4) performs one of many different actions, depending on the value of an expression. The if statement is called a single-selection statement because it selects or ignores a single action. The if...else statement is called a double-selection statement because it selects between two different actions. The switch statement is called a multiple-selection statement because it selects among many different actions.

### Iteration Statements in C
C provides three types of iteration structures in the form of statements, namely while (Section 3.7), do...while, and for (both discussed in Chapter 4).
That’s all there is. C has only seven control statements: sequence, three types of selection and three types of iteration. Each C program is formed by combining as many of each type of control statement as is appropriate for the algorithm the program implements. As with the sequence structure of Fig. 3.1, we’ll see that the flowchart representation of each control statement has two small circle symbols, one at the entry point to the control statement and one at the exit point. These single-entry/single-exit control statements make it easy to build clear programs. We can attach the control-statement flowchart segments to one another by connecting the exit point of one control statement to the entry point of the next. This is much like the way in which a child stacks building blocks, so we call this control-statement stacking. We’ll learn that there’s only one other way control statements may be connected—a method called control-statement nesting. Thus, any C program we’ll ever need to build can be constructed from only seven different types of control statements combined in only two ways. This is the essence of simplicity.

## 3.5 The if Selection Statement
Selection statements are used to choose among alternative courses of action. For example, suppose the passing grade on an exam is 60. The pseudocode statement
*If student's grade is greater than or equal to 60*
*  Print "Passed"*
determines whether the condition “student’s grade is greater than or equal to 60” is true or false. If the condition is true, then “Passed” is printed, and the next pseudocode statement in order is “performed” (remember that pseudocode isn’t a real programming language). If the condition is false, the printing is ignored, and the next pseudocode statement in order is performed.
The preceding pseudocode If statement may be written in C as
\`\`\`c
if ( grade >= 60 ) {
    puts("Passed");
} // end if
\`\`\`
Notice that the C code corresponds closely to the pseudocode (of course you’ll also need to declare the int variable grade). This is one of the properties of pseudocode that makes it such a useful program-development tool. The second line of this selection statement is indented. Such indentation is optional, but it’s highly recommended, as it helps emphasize the inherent structure of structured programs. The C compiler ignores white-space characters such as blanks, tabs and newlines used for indentation and vertical spacing.
The flowchart of Fig. 3.2 illustrates the single-selection if statement. This flowchart contains what is perhaps the most important flowcharting symbol—the diamond symbol, also called the decision symbol, which indicates that a decision is to be made. The decision symbol contains an expression, such as a condition, that can be either true or false. The decision symbol has two flowlines emerging from it. One indicates the direction to take when the expression in the symbol is true and the other the direction to take when the expression is false. Decisions can be based on conditions containing relational or equality operators. In fact, a decision can be based on any expression—if the expression evaluates to zero, it’s treated as false, and if it evaluates to nonzero, it’s treated as true.

The if statement, too, is a single-entry/single-exit statement. We’ll soon learn that the flowcharts for the remaining control structures can also contain (besides small circle symbols and flowlines) only rectangle symbols to indicate the actions to be performed, and diamond symbols to indicate decisions to be made. This is the action/decision model of programming we’ve been emphasizing.
We can envision seven bins, each containing only control-statement flowcharts of one of the seven types. These flowchart segments are empty—nothing is written in the rectangles and nothing in the diamonds. Your task, then, is assembling a program from as many of each type of control statement as the algorithm demands, combining them in only two possible ways (stacking or nesting), and then filling in the actions and decisions in a manner appropriate for the algorithm. We’ll discuss the variety of ways in which actions and decisions may be written.

## 3.6 The if...else Selection Statement
The if selection statement performs an indicated action only when the condition is true; otherwise the action is skipped. The if...else selection statement allows you to specify that different actions are to be performed when the condition is true and when it’s false. For example, the pseudocode statement
*If student's grade is greater than or equal to 60*
*  Print "Passed"*
*else*
*  Print "Failed"*
prints Passed if the student’s grade is greater than or equal to 60 and Failed if the student’s grade is less than 60. In either case, after printing occurs, the next pseudocode statement in sequence is “performed.” The body of the else is also indented.

> **Good Programming Practice 3.1**
> Indent both body statements of an if...else statement (in both pseudocode and C).

The preceding pseudocode If...else statement may be written in C as
\`\`\`c
if ( grade >= 60 ) {
    puts("Passed");
} // end if
else {
    puts("Failed" );
} // end else
\`\`\`
The flowchart of Fig. 3.3 illustrates the flow of control in the if...else statement. Once again, besides small circles and arrows, the only symbols in the flowchart are rectangles (for actions) and a diamond (for a decision).

### Conditional Operator (?:)
C provides the conditional operator (?:), which is closely related to the if...else statement. The conditional operator is C’s only ternary operator—it takes three operands. These together with the conditional operator form a conditional expression. The first operand is a condition. The second operand is the value for the entire conditional expression if the condition is true and the third operand is the value for the entire conditional expression if the condition is false. For example, the puts statement
\`\`\`c
puts( grade >= 60 ? "Passed" : "Failed" );
\`\`\`
contains as its argument a conditional expression that evaluates to the string "Passed" if the condition grade >= 60 is true and to the string "Failed" if the condition is false. The puts statement performs in essentially the same way as the preceding if...else statement.

### Nested if...else Statements
Nested if...else statements test for multiple cases by placing if...else statements inside if...else statements. For example, the following pseudocode statement will print A for exam grades greater than or equal to 90, B for grades greater than or equal to 80 (but less than 90), C for grades greater than or equal to 70 (but less than 80), D for grades greater than or equal to 60 (but less than 70), and F for all other grades.

*If student's grade is greater than or equal to 90*
*  Print "A"*
*else*
*  If student's grade is greater than or equal to 80*
*    Print "B"*
*  else*
*    If student's grade is greater than or equal to 70*
*      Print "C"*
*    else*
*      If student's grade is greater than or equal to 60*
*        Print "D"*
*      else*
*        Print "F"*

This pseudocode may be written in C as
\`\`\`c
if ( grade >= 90 ) {
    puts("A");
} // end if
else {
    if ( grade >= 80 ) {
        puts("B");
    } // end if
    else {
        if ( grade >= 70 ) {
            puts("C");
        } // end if
        else {
            if ( grade >= 60 ) {
                puts("D");
            } // end if
            else {
                puts("F");
            } // end else
        } // end else
    } // end else
} // end else
\`\`\`
You may prefer to write the preceding if statement as
\`\`\`c
if ( grade >= 90 ) {
    puts("A");
} // end if
else if ( grade >= 80 ) {
    puts("B");
} // end else if
else if ( grade >= 70 ) {
    puts("C");
} // end else if
else if ( grade >= 60 ) {
    puts("D");
} // end else if
else {
    puts("F");
} // end else
\`\`\`
As far as the C compiler is concerned, both forms are equivalent. The latter form is popular because it avoids the deep indentation of the code to the right. Such indentation often leaves little room on a line, forcing lines to be split and decreasing program readability.

### Compound Statements
The if selection statement expects only one statement in its body—if you have only one statement in the if’s body, you do not need to enclose it in braces. To include several statements in the body of an if, you must enclose the set of statements in braces ({ and }). A set of statements contained within a pair of braces is called a compound statement or a block.

> **Software Engineering Observation 3.1**
> A compound statement can be placed anywhere in a program that a single statement can be placed.

## 3.7 The while Iteration Statement
An iteration statement (also called an repetition statement or loop) allows you to specify that an action is to be repeated while some condition remains true. The pseudocode statement
*While there are more items on my shopping list*
*  Purchase next item and cross it off my list*
describes the iteration that occurs during a shopping trip. The condition, “there are more items on my shopping list” may be true or false. If it’s true, then the action, “Purchase next item and cross it off my list” is performed. This action will be performed repeatedly while the condition remains true. The statement(s) contained in the while iteration statement constitute the body of the while. The while statement body may be a single statement or a compound statement. Eventually, the condition will become false (when the last item on the shopping list has been purchased and crossed off the list). At this point, the iteration terminates, and the first pseudocode statement after the iteration structure is executed.

## 3.8 Formulating Algorithms Case Study 1: Counter-Controlled Iteration
To illustrate how algorithms are developed, we solve several variations of a class-averaging problem. Consider the following problem statement:
*A class of ten students took a quiz. The grades (integers in the range 0 to 100) for this quiz are available to you. Determine the class average on the quiz.*
Let’s use pseudocode to list the actions to execute and specify the order in which these actions should execute. We use counter-controlled iteration to input the grades one at a time. This technique uses a variable called a counter to specify the number of times a set of statements should execute. In this example, iteration terminates when the counter exceeds 10. Counter-controlled iteration is often called definite iteration because the number of iterations is known before the loop begins executing.
The following C program solves the class-average problem using counter-controlled iteration.
\`\`\`c
// Fig. 3.6: fig03_06.c
// Class average program with counter-controlled iteration.
#include <stdio.h>

int main( void ) {
    unsigned int counter; // number of grade to be entered next
    int grade; // grade value
    int total; // sum of grades entered by user
    int average; // average of grades

    // initialization phase
    total = 0; // initialize total
    counter = 1; // initialize loop counter

    // processing phase
    while ( counter <= 10 ) { // loop 10 times
        printf( "%s", "Enter grade: " ); // prompt for input
        scanf( "%d", &grade ); // read grade from user
        total = total + grade; // add grade to total
        counter = counter + 1; // increment counter
    } // end while

    // termination phase
    average = total / 10; // integer division
    printf( "Class average is %d\\n", average ); // display result
} // end function main
\`\`\`

## 3.9 Formulating Algorithms with Top-Down, Stepwise Refinement Case Study 2: Sentinel-Controlled Iteration
Let’s generalize the class-average problem. Consider the following problem:
*Develop a class-averaging program that will process an arbitrary number of grades each time the program is run.*
One way to solve this problem is to use a special value called a sentinel value (also called a signal value, a dummy value, or a flag value) to indicate “end of data entry.” The user types grades until all legitimate grades have been entered. The user then types the sentinel value to indicate “the last grade has been entered.” Sentinel-controlled iteration is often called indefinite iteration because the number of iterations isn’t known before the loop begins executing.

### Top-Down, Stepwise Refinement
We approach the class-average program with a technique called top-down, stepwise refinement, a technique that’s essential to the development of well-structured programs. We begin with a pseudocode representation of the top:
*Determine the class average for the quiz*
We divide the top into a series of smaller tasks and list these in the order in which they need to be performed. This results in the following first refinement.
*Initialize variables*
*Input, sum, and count the quiz grades*
*Calculate and print the class average*
To proceed to the next level of refinement, i.e., the second refinement, we commit to specific variables. The complete second refinement is shown below.
1. *Initialize total to zero*
2. *Initialize counter to zero*
3. *Input the first grade (possibly the sentinel)*
4. *While the user has not as yet entered the sentinel*
5. *  Add this grade into the running total*
6. *  Add one to the grade counter*
7. *  Input the next grade (possibly the sentinel)*
8. *If the counter is not equal to zero*
9. *  Set the average to the total divided by the counter*
10. *  Print the average*
11. *else*
12. *  Print “No grades were entered”*

The C program and a sample execution are shown below. Although only integer grades are entered, the averaging calculation is likely to produce a number with a decimal point. The type \`int\` cannot represent such a number. The program introduces the data type \`float\` to handle numbers with decimal points (called floating-point numbers) and introduces a special operator called a cast operator to handle the averaging calculation.
\`\`\`c
// Fig. 3.8: fig03_08.c
// Class-average program with sentinel-controlled iteration.
#include <stdio.h>

int main( void ) {
    unsigned int counter; // number of grades entered
    int grade; // grade value
    int total; // sum of grades
    float average; // number with decimal point for average

    // initialization phase
    total = 0; // initialize total
    counter = 0; // initialize loop counter

    // processing phase
    printf( "%s", "Enter grade, -1 to end: " ); // prompt for input
    scanf( "%d", &grade ); // read grade from user
    
    while ( grade != -1 ) {
        total = total + grade; // add grade to total
        counter = counter + 1; // increment counter
        printf( "%s", "Enter grade, -1 to end: " ); // prompt for input
        scanf( "%d", &grade ); // read next grade
    } // end while

    // termination phase
    if ( counter != 0 ) {
        // calculate average of all grades entered
        average = (float) total / counter; // avoid truncation
        printf( "Class average is %.2f\\n", average );
    } // end if
    else { // if no grades were entered, output message
        puts( "No grades were entered" );
    } // end else
} // end function main
\`\`\`

## 3.10 Formulating Algorithms with Top-Down, Stepwise Refinement Case Study 3: Nested Control Statements
We’ve seen that control statements may be stacked on top of one another (in sequence). In this case study we’ll see the only other structured way control statements may be connected in C, namely through nesting of one control statement within another.

## 3.11 Assignment Operators
C provides several assignment operators for abbreviating assignment expressions. For example, the statement \`c = c + 3;\` can be abbreviated with the addition assignment operator \`+=\` as \`c += 3;\`. The \`+=\` operator adds the value of the expression on the right of the operator to the value of the variable on the left of the operator and stores the result in the variable on the left of the operator.

## 3.12 Increment and Decrement Operators
C also provides the unary increment operator, \`++\`, and the unary decrement operator, \`--\`. If a variable c is to be incremented by 1, the increment operator \`++\` can be used rather than the expressions \`c = c + 1\` or \`c += 1\`. If increment or decrement operators are placed before a variable (i.e., prefixed), they’re referred to as the preincrement or predecrement operators. If increment or decrement operators are placed after a variable (i.e., postfixed), they’re referred to as the postincrement or postdecrement operators. Preincrementing (predecrementing) a variable causes the variable to be incremented (decremented) by 1, then its new value is used in the expression in which it appears. Postincrementing (postdecrementing) the variable causes the current value of the variable to be used in the expression in which it appears, then the variable value is incremented (decremented) by 1.

## 3.13 Secure C Programming
### Arithmetic Overflow
Adding integers could result in a value that’s too large to store in an \`int\` variable. This is known as arithmetic overflow and can cause undefined behavior. It’s considered a good practice to ensure that before you perform arithmetic calculations, they will not overflow.

### Unsigned Integers
In general, counters that should store only non-negative values should be declared with \`unsigned\` before the integer type. Variables of unsigned types can represent values from 0 to approximately twice the positive range of the corresponding signed integer types.
`,
  zh: `
# 3. C 的結構化程式開發

## 學習目標
在本章中，您將學習：
- 使用基本的解決問題技巧。
- 透過由上而下、逐步精化的過程來開發演算法。
- 使用 if 選擇陳述式和 if...else 選擇陳述式來選擇動作。
- 使用 while 迭代陳述式在程式中重複執行陳述式。
- 使用計數器控制的迭代和哨兵控制的迭代。
- 學習結構化程式設計。
- 使用遞增、遞減和賦值運算子。

## 3.1 簡介
在為了解決特定問題而編寫程式之前，我們必須對問題有透徹的理解，並有一個精心規劃的解決方案。第三章和第四章討論了有助於開發結構化電腦程式的技術。在 4.12 節中，我們將總結這裡和第四章中開發的結構化程式設計技術。

## 3.2 演算法
任何計算問題的解決方案都涉及按特定順序執行一系列動作。一個解決問題的程序，就以下兩方面而言：
1. 要執行的動作，以及
2. 這些動作要執行的順序
被稱為演算法。下面的例子說明了正確指定動作執行順序的重要性。
考慮一位初級主管起床上班所遵循的「起床號演算法」：(1) 起床，(2) 脫掉睡衣，(3) 洗澡，(4) 穿衣服，(5) 吃早餐，(6) 共乘上班。這個程序讓主管準備充分地去上班做重要決策。假設同樣的步驟以稍微不同的順序執行：(1) 起床，(2) 脫掉睡衣，(3) 穿衣服，(4) 洗澡，(5) 吃早餐，(6) 共乘上班。在這種情況下，我們的初級主管上班時會濕淋淋的。在電腦程式中指定陳述式的執行順序稱為程式控制。在本章和下一章中，我們將探討 C 的程式控制能力。

## 3.3 偽代碼
偽代碼是一種非正式的人工語言，可幫助您開發演算法。我們在這裡介紹的偽代碼對於開發將轉換為結構化 C 程式的演算法特別有用。偽代碼類似於日常英語；它方便且使用者友好，儘管它不是一種實際的電腦程式語言。
偽代碼程式不在電腦上執行。相反，它們僅僅幫助您在嘗試用像 C 這樣的程式語言編寫程式之前「思考」出一個程式。
偽代碼純粹由字元組成，因此您可以方便地使用文字編輯器程式將偽代碼程式輸入電腦。一個精心準備的偽代碼程式可以輕易地轉換為對應的 C 程式。在許多情況下，只需將偽代碼陳述式替換為其 C 的等價物即可。
偽代碼僅包含動作和決策陳述式——那些在程式從偽代碼轉換為 C 並在 C 中運行時執行的陳述式。定義不是可執行的陳述式——它們只是給編譯器的訊息。例如，定義
\`int i;\`
告訴編譯器變數 i 的類型，並指示編譯器在記憶體中為該變數保留空間。但是當程式執行時，這個定義不會引起任何動作——如輸入、輸出、計算或比較。一些程式設計師選擇在偽代碼程式的開頭列出每個變數並簡要提及其用途。

## 3.4 控制結構
通常，程式中的陳述式是按照它們被書寫的順序一個接一個地執行的。這稱為循序執行。我們很快將討論的各種 C 陳述式使您能夠指定下一個要執行的陳述式可能不是序列中的下一個。這稱為控制轉移。
在 1960 年代，人們清楚地認識到，不加選擇地使用控制轉移是軟體開發團隊遇到大量困難的根源。矛頭指向了 goto 陳述式，它允許您將控制權轉移到程式中許多可能的目的地之一。「結構化程式設計」的概念幾乎成了「消除 goto」的同義詞。
Bohm 和 Jacopini 的研究表明，程式可以在沒有任何 goto 陳述式的情況下編寫。當時的挑戰是讓程式設計師將他們的風格轉變為「無 goto 程式設計」。直到 1970 年代中期，程式設計行業才開始認真對待結構化程式設計。結果令人印象深刻，軟體開發團隊報告說開發時間縮短了，系統更頻繁地按時交付，軟體專案更頻繁地在預算內完成。用結構化技術產生的程式更清晰，更容易除錯和修改，並且更有可能一開始就沒有錯誤。
Bohm 和 Jacopini 的工作證明了所有程式都可以只用三種控制結構來編寫，即序列結構、選擇結構和迭代結構。序列結構很簡單——除非另有指示，否則電腦會按照 C 陳述式被書寫的順序一個接一個地執行。圖 3.1 的流程圖片段說明了 C 的序列結構。

### 流程圖
流程圖是演算法或演算法一部分的圖形表示。流程圖使用一些特殊用途的符號繪製，如矩形、菱形、圓角矩形和小圓圈；這些符號由稱為流程線的箭頭連接。
像偽代碼一樣，流程圖對於開發和表示演算法很有用，儘管大多數程式設計師更喜歡偽代碼。流程圖清楚地顯示了控制結構如何運作；這就是我們在本書中使用它們的目的。
考慮圖 3.1 中序列結構的流程圖。我們使用矩形符號，也稱為動作符號，來表示任何類型的動作，包括計算或輸入/輸出操作。圖中的流程線指示了動作執行的順序——首先，將 grade 加到 total，然後將 1 加到 counter。C 允許我們在一個序列結構中有多個動作。正如我們很快會看到的，任何可以放置單一動作的地方，我們都可以放置多個動作。

在繪製代表完整演算法的流程圖時，我們使用的第一個符號是包含「開始」字樣的圓角矩形符號。最後一個符號是包含「結束」字樣的圓角矩形。在只繪製演算法的一部分時，如圖 3.1，我們省略了圓角矩形符號，而使用小圓圈符號，也稱為連接符號。
也許最重要的流程圖符號是菱形符號，也稱為決策符號，它表示需要做出一個決定。我們將在下一節討論菱形符號。

### C 的選擇陳述式
C 提供了三種類型的選擇結構，以陳述式的形式。if 選擇陳述式（3.5 節）在條件為真時選擇（執行）一個動作，如果條件為假則跳過該動作。if...else 選擇陳述式（3.6 節）在條件為真時執行一個動作，在條件為假時執行另一個不同的動作。switch 選擇陳述式（在第四章討論）根據一個表達式的值執行多個不同動作中的一個。if 陳述式被稱為單一選擇陳述式，因為它選擇或忽略一個單一的動作。if...else 陳述式被稱為雙重選擇陳述式，因為它在兩個不同的動作之間進行選擇。switch 陳述式被稱為多重選擇陳述式，因為它在多個不同動作中進行選擇。

### C 的迭代陳述式
C 提供了三種類型的迭代結構，以陳述式的形式，即 while（3.7 節）、do...while 和 for（兩者都在第四章討論）。
這就是全部了。C 只有七個控制陳述式：序列、三種類型的選擇和三種類型的迭代。每個 C 程式都是透過組合適當數量的每種類型的控制陳述式來形成的，以實現程式所執行的演算法。與圖 3.1 的序列結構一樣，我們將看到每個控制陳述式的流程圖表示都有兩個小圓圈符號，一個在控制陳述式的入口點，一個在出口點。這些單入口/單出口的控制陳述式使建構清晰的程式變得容易。我們可以將控制陳述式的流程圖片段相互連接，方法是將一個控制陳述式的出口點連接到下一個的入口點。這很像孩子堆疊積木的方式，所以我們稱之為控制陳述式堆疊。我們將學習到控制陳述式還有另一種連接方式——一種稱為控制陳述式巢狀的方法。因此，我們需要建構的任何 C 程式都可以僅由七種不同類型的控制陳述式以兩種方式組合而成。這就是簡單的精髓。

## 3.5 if 選擇陳述式
選擇陳述式用於在不同的行動方案中進行選擇。例如，假設一場考試的及格分數是 60 分。偽代碼陳述式
*如果學生成績大於或等於 60*
*  印出 "Passed"*
判斷「學生成績大於或等於 60」這個條件是真是假。如果條件為真，則印出「Passed」，然後按順序「執行」下一個偽代碼陳述式（記住偽代碼不是真正的程式語言）。如果條件為假，則忽略印出動作，並執行順序中的下一個偽代碼陳述式。
前面的偽代碼 If 陳述式可以用 C 語言寫成
\`\`\`c
if ( grade >= 60 ) {
    puts("Passed");
} // 結束 if
\`\`\`
請注意，C 程式碼與偽代碼非常接近（當然您還需要宣告 int 變數 grade）。這是偽代碼使其成為如此有用的程式開發工具的特性之一。這個選擇陳述式的第二行是縮排的。這種縮排是可選的，但強烈建議使用，因為它有助於強調結構化程式的內在結構。C 編譯器會忽略用於縮排和垂直間距的空白字元，如空格、定位字元和換行符。
圖 3.2 的流程圖說明了單一選擇 if 陳述式。這個流程圖包含了可能是最重要的流程圖符號——菱形符號，也稱為決策符號，它表示需要做出一個決定。決策符號包含一個表達式，如一個條件，其結果可以是真或假。決策符號有兩條流程線從中引出。一條指示當符號中的表達式為真時要走的方向，另一條指示當表達式為假時要走的方向。決策可以基於包含關係或相等運算子的條件。事實上，決策可以基於任何表達式——如果表達式求值為零，則視為假，如果求值為非零，則視為真。

if 陳述式也是一個單入口/單出口的陳述式。我們很快會學到，其餘控制結構的流程圖也只能包含（除了小圓圈符號和流程線外）表示要執行的動作的矩形符號，以及表示要做的決策的菱形符號。這就是我們一直強調的動作/決策程式設計模型。
我們可以想像有七個箱子，每個箱子只包含七種類型中的一種控制陳述式流程圖。這些流程圖片段是空的——矩形裡什麼也沒寫，菱形裡也什麼也沒寫。您的任務就是，根據演算法的需求，從每種類型的控制陳述式中組合出一個程式，只用兩種可能的方式（堆疊或巢狀）組合它們，然後以適合演算法的方式填入動作和決策。我們將討論可以書寫動作和決策的各種方式。

## 3.6 if...else 選擇陳述式
if 選擇陳述式只在條件為真時執行指定的動作；否則跳過該動作。if...else 選擇陳述式允許您指定當條件為真和為假時要執行的不同動作。例如，偽代碼陳述式
*如果學生成績大於或等於 60*
*  印出 "Passed"*
*否則*
*  印出 "Failed"*
如果學生成績大於或等於 60，則印出 Passed，如果學生成績小於 60，則印出 Failed。在任何一種情況下，印出動作發生後，序列中的下一個偽代碼陳述式將被「執行」。else 的主體也是縮排的。

> **良好程式設計實踐 3.1**
> 在 if...else 陳述式中，將兩個主體陳述式都進行縮排（在偽代碼和 C 語言中都是如此）。

前面的偽代碼 If...else 陳述式可以用 C 語言寫成
\`\`\`c
if ( grade >= 60 ) {
    puts("Passed");
} // 結束 if
else {
    puts("Failed" );
} // 結束 else
\`\`\`
圖 3.3 的流程圖說明了 if...else 陳述式中的控制流程。再次，除了小圓圈和箭頭，流程圖中唯一的符號是矩形（用於動作）和一個菱形（用於決策）。

### 條件運算子 (?:)
C 語言提供了條件運算子（?:），它與 if...else 陳述式密切相關。條件運算子是 C 語言中唯一的三元運算子——它接受三個運算元。這三個運算元與條件運算子一起構成一個條件表達式。第一個運算元是一個條件。第二個運算元是當條件為真時整個條件表達式的值，第三個運算元是當條件為假時整個條件表達式的值。例如，puts 陳述式
\`\`\`c
puts( grade >= 60 ? "Passed" : "Failed" );
\`\`\`
的參數是一個條件表達式，如果條件 grade >= 60 為真，則其求值結果為字串 "Passed"，如果條件為假，則為字串 "Failed"。這個 puts 陳述式的執行方式與前面的 if...else 陳述式基本相同。

### 巢狀 if...else 陳述式
巢狀 if...else 陳述式透過將 if...else 陳述式放在其他 if...else 陳述式內部來測試多種情況。例如，下面的偽代碼陳述式將為大於或等於 90 的考試成績印出 A，為大於或等於 80（但小於 90）的成績印出 B，為大於或等於 70（但小於 80）的成績印出 C，為大於或等於 60（但小於 70）的成績印出 D，為所有其他成績印出 F。

*如果學生成績大於或等於 90*
*  印出 "A"*
*否則*
*  如果學生成績大於或等於 80*
*    印出 "B"*
*  否則*
*    如果學生成績大於或等於 70*
*      印出 "C"*
*    否則*
*      如果學生成績大於或等於 60*
*        印出 "D"*
*      否則*
*        印出 "F"*

這個偽代碼可以用 C 語言寫成
\`\`\`c
if ( grade >= 90 ) {
    puts("A");
} // 結束 if
else {
    if ( grade >= 80 ) {
        puts("B");
    } // 結束 if
    else {
        if ( grade >= 70 ) {
            puts("C");
        } // 結束 if
        else {
            if ( grade >= 60 ) {
                puts("D");
            } // 結束 if
            else {
                puts("F");
            } // 結束 else
        } // 結束 else
    } // 結束 else
} // 結束 else
\`\`\`
您可能更喜歡將前面的 if 陳述式寫成
\`\`\`c
if ( grade >= 90 ) {
    puts("A");
} // 結束 if
else if ( grade >= 80 ) {
    puts("B");
} // 結束 else if
else if ( grade >= 70 ) {
    puts("C");
} // 結束 else if
else if ( grade >= 60 ) {
    puts("D");
} // 結束 else if
else {
    puts("F");
} // 結束 else
\`\`\`
就 C 編譯器而言，這兩種形式是等價的。後一種形式很受歡迎，因為它避免了程式碼向右的深度縮排。這種縮排通常會讓一行上的空間變得很小，迫使程式碼行被分割，降低了程式的可讀性。

### 複合陳述式
if 選擇陳述式在其主體中只期望一個陳述式——如果 if 的主體中只有一個陳述式，您不需要用大括號將其括起來。要在 if 的主體中包含多個陳述式，您必須用大括號（{ 和 }）將這組陳述式括起來。包含在一對大括號內的一組陳述式稱為複合陳述式或區塊。

> **軟體工程觀察 3.1**
> 複合陳述式可以放在程式中任何可以放置單一陳述式的地方。

## 3.7 while 迭代陳述式
迭代陳述式（也稱為重複陳述式或迴圈）允許您指定在某個條件保持為真時重複執行一個動作。偽代碼陳述式
*當我的購物清單上還有更多項目時*
*  購買下一個項目並將其劃掉*
描述了購物過程中發生的迭代。條件「我的購物清單上還有更多項目」可以是真或假。如果為真，則執行動作「購買下一個項目並將其劃掉」。只要條件保持為真，這個動作就會重複執行。包含在 while 迭代陳述式中的陳述式構成了 while 的主體。while 陳述式的主體可以是單一陳述式或複合陳述式。最終，條件將變為假（當購物清單上的最後一個項目被購買並劃掉時）。此時，迭代終止，並執行迭代結構之後的第一個偽代碼陳述式。

## 3.8 演算法設計案例研究 1：計數器控制的迭代
為了說明演算法是如何開發的，我們解決了班級平均問題的幾種變體。考慮以下問題陳述：
*一個班級的十名學生參加了一次測驗。這次測驗的成績（0 到 100 範圍內的整數）可供您使用。確定班級在這次測驗中的平均成績。*
讓我們使用偽代碼來列出要執行的動作並指定它們的執行順序。我們使用計數器控制的迭代來一次輸入一個成績。這種技術使用一個稱為計數器的變數來指定一組陳述式應該執行的次數。在這個例子中，當計數器超過 10 時，迭代終止。計數器控制的迭代通常稱為確定性迭代，因為在迴圈開始執行之前，迭代的次數是已知的。
以下 C 程式使用計數器控制的迭代解決了班級平均問題。
\`\`\`c
// 圖 3.6: fig03_06.c
// 使用計數器控制迭代的班級平均程式。
#include <stdio.h>

int main( void ) {
    unsigned int counter; // 下一個要輸入的成績編號
    int grade; // 成績值
    int total; // 使用者輸入的成績總和
    int average; // 成績平均值

    // 初始化階段
    total = 0; // 初始化總和
    counter = 1; // 初始化迴圈計數器

    // 處理階段
    while ( counter <= 10 ) { // 迴圈 10 次
        printf( "%s", "輸入成績: " ); // 提示輸入
        scanf( "%d", &grade ); // 從使用者讀取成績
        total = total + grade; // 將成績加到總和
        counter = counter + 1; // 遞增計數器
    } // 結束 while

    // 終止階段
    average = total / 10; // 整數除法
    printf( "班級平均成績是 %d\\n", average ); // 顯示結果
} // 結束 main 函式
\`\`\`

## 3.9 演算法設計與由上而下、逐步精化案例研究 2：哨兵控制的迭代
讓我們將班級平均問題一般化。考慮以下問題：
*開發一個班級平均程式，該程式每次運行時將處理任意數量的成績。*
解決這個問題的一種方法是使用一個稱為哨兵值（也稱為信號值、虛設值或標誌值）的特殊值來表示「資料輸入結束」。使用者輸入成績，直到所有合法成績都已輸入。然後使用者輸入哨兵值以表示「最後一個成績已輸入」。哨兵控制的迭代通常稱為不確定性迭代，因為在迴圈開始執行之前，迭代的次數是未知的。

### 由上而下、逐步精化
我們使用一種稱為由上而下、逐步精化的技術來處理班級平均程式，這種技術對於開發結構良好的程式至關重要。我們從頂層的偽代碼表示開始：
*確定測驗的班級平均成績*
我們將頂層任務分解為一系列較小的任務，並按它們需要執行的順序列出。這導致了以下的第一層精化。
*初始化變數*
*輸入、加總並計算測驗成績的數量*
*計算並印出班級平均成績*
為了進入下一層精化，即第二層精化，我們確定具體的變數。完整的第二層精化如下所示。
1. *將總和初始化為零*
2. *將計數器初始化為零*
3. *輸入第一個成績（可能是哨兵值）*
4. *當使用者尚未輸入哨兵值時*
5. *  將此成績加到運行總和中*
6. *  將成績計數器加一*
7. *  輸入下一個成績（可能是哨兵值）*
8. *如果計數器不等於零*
9. *  將平均值設定為總和除以計數器*
10. *  印出平均值*
11. *否則*
12. *  印出「未輸入成績」*

C 程式和一個範例執行如下所示。雖然只輸入整數成績，但平均計算很可能會產生帶有小數點的數字。\`int\` 類型無法表示這樣的數字。該程式引入了 \`float\` 資料類型來處理帶有小數點的數字（稱為浮點數），並引入了一個稱為強制轉型運算子的特殊運算子來處理平均計算。
\`\`\`c
// 圖 3.8: fig03_08.c
// 使用哨兵控制迭代的班級平均程式。
#include <stdio.h>

int main( void ) {
    unsigned int counter; // 輸入的成績數量
    int grade; // 成績值
    int total; // 成績總和
    float average; // 帶有小數點的平均值

    // 初始化階段
    total = 0; // 初始化總和
    counter = 0; // 初始化迴圈計數器

    // 處理階段
    printf( "%s", "輸入成績，-1 結束: " ); // 提示輸入
    scanf( "%d", &grade ); // 從使用者讀取成績
    
    while ( grade != -1 ) {
        total = total + grade; // 將成績加到總和
        counter = counter + 1; // 遞增計數器
        printf( "%s", "輸入成績，-1 結束: " ); // 提示輸入
        scanf( "%d", &grade ); // 讀取下一個成績
    } // 結束 while

    // 終止階段
    if ( counter != 0 ) {
        // 計算所有輸入成績的平均值
        average = (float) total / counter; // 避免截斷
        printf( "班級平均成績是 %.2f\\n", average );
    } // 結束 if
    else { // 如果沒有輸入成績，則輸出訊息
        puts( "未輸入成績" );
    } // 結束 else
} // 結束 main 函式
\`\`\`

## 3.10 演算法設計與由上而下、逐步精化案例研究 3：巢狀控制陳述式
我們已經看到控制陳述式可以一個接一個地堆疊（循序地）。在這個案例研究中，我們將看到 C 語言中控制陳述式可以連接的唯一另一種結構化方式，即將一個控制陳述式巢狀在另一個之內。

## 3.11 賦值運算子
C 語言提供了幾種賦值運算子來簡化賦值表達式。例如，陳述式 \`c = c + 3;\` 可以用加法賦值運算子 \`+=\` 簡寫為 \`c += 3;\`。\`+=\` 運算子將運算子右邊表達式的值加到運算子左邊變數的值上，並將結果儲存在左邊的變數中。

## 3.12 遞增與遞減運算子
C 語言也提供了一元遞增運算子 \`++\` 和一元遞減運算子 \`--\`。如果一個變數 c 要加 1，可以使用遞增運算子 \`++\`，而不是表達式 \`c = c + 1\` 或 \`c += 1\`。如果遞增或遞減運算子放在變數前面（即前置），它們被稱為前置遞增或前置遞減運算子。如果遞增或遞減運算子放在變數後面（即後置），它們被稱為後置遞增或後置遞減運算子。前置遞增（前置遞減）一個變數會使該變數先加（減）1，然後在它出現的表達式中使用它的新值。後置遞增（後置遞減）一個變數會使該變數的當前值先在它出現的表達式中使用，然後變數的值再加（減）1。

## 3.13 安全的 C 程式設計
### 算術溢位
將整數相加可能會導致一個太大而無法儲存在 \`int\` 變數中的值。這被稱為算術溢位，可能導致未定義的行為。在執行算術計算之前，確保它們不會溢位是一個良好的實踐。

### 無符號整數
一般來說，只應儲存非負值的計數器應該在整數類型前用 \`unsigned\` 聲明。無符號類型的變數可以表示從 0 到大約是相應有符號整數類型正數範圍兩倍的值。
`,
};
