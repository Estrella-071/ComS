
export const chapter4Content = {
  en: `
# 4. C Program Control

## Objectives
In this chapter, you'll learn:
- The essentials of counter-controlled iteration.
- To use the for and do...while iteration statements to execute statements repeatedly.
- To understand multiple selection using the switch selection statement.
- To use the break and continue statements to alter the flow of control.
- To use the logical operators to form complex conditional expressions in control statements.
- To avoid the consequences of confusing the equality and assignment operators.

## 4.1 Introduction
You should now be comfortable with writing simple, complete C programs. In this chapter, iteration is considered in greater detail, and additional iteration control statements, namely the for and the do...while, are presented. The switch multiple-selection statement is introduced. We discuss the break statement for exiting immediately from certain control statements, and the continue statement for skipping the remainder of the body of an iteration statement, then proceeding with the next iteration of the loop. The chapter discusses logical operators used for combining conditions, and summarizes the principles of structured programming as presented in Chapter 3 and this chapter.

## 4.2 Iteration Essentials
Most programs involve iteration, or looping. A loop is a group of instructions the computer executes repeatedly while some loop-continuation condition remains true. We've discussed two means of iteration:
1. Counter-controlled iteration
2. Sentinel-controlled iteration
Counter-controlled iteration is sometimes called definite iteration because we know in advance exactly how many times the loop will be executed. Sentinel-controlled iteration is sometimes called indefinite iteration because it’s not known in advance how many times the loop will be executed.
In counter-controlled iteration, a control variable is used to count the number of iterations. The control variable is incremented (usually by 1) each time the group of instructions is performed. When the value of the control variable indicates that the correct number of iterations has been performed, the loop terminates and execution continues with the statement after the iteration statement.

## 4.3 Counter-Controlled Iteration
Counter-controlled iteration requires:
1. The name of a control variable (or loop counter).
2. The initial value of the control variable.
3. The increment (or decrement) by which the control variable is modified each time through the loop.
4. The condition that tests for the final value of the control variable (i.e., whether looping should continue).
Consider the simple program shown in Fig. 4.1, which prints the numbers from 1 to 10. The definition
\`unsigned int counter = 1; // initialization\`
names the control variable (counter), defines it to be an integer, reserves memory space for it, and sets its initial value to 1.

## 4.4 for Iteration Statement
The for iteration statement handles all the details of counter-controlled iteration. The general format of the for statement is
\`for (initialization; condition; increment) { statement }\`
where the initialization expression initializes the loop-control variable, the condition expression is the loop-continuation condition and the increment expression increments the control variable.
Figure 4.3 takes a closer look at the for statement of Fig. 4.2. Notice that the for statement “does it all”—it specifies each of the items needed for counter-controlled iteration with a control variable. The three expressions in the for statement are optional. If the condition expression is omitted, C assumes that the loop-continuation condition is true, thus creating an infinite loop. The two semicolons in the for statement are required.

## 4.5 for Statement: Notes and Observations
1. The initialization, loop-continuation condition and increment can contain arithmetic expressions.
2. The “increment” may be negative (in which case it’s really a decrement and the loop actually counts downward).
3. If the loop-continuation condition is initially false, the loop body does not execute.
4. The control variable is frequently printed or used in calculations in the body of a loop, but it need not be.
5. The for statement is flowcharted much like the while statement. The initialization occurs only once and incrementing occurs after the body statement each time it’s performed.

## 4.6 Examples Using the for Statement
The for statement can be used to sum the even integers from 2 to 100, or to calculate compound interest. C does not include an exponentiation operator, but we can use the Standard Library function \`pow(x, y)\` to calculate x raised to the y-th power.

## 4.7 switch Multiple-Selection Statement
Occasionally, an algorithm will contain a series of decisions in which a variable or expression is tested separately for each of the constant integral values it may assume, and different actions are taken. This is called multiple selection. C provides the switch multiple-selection statement to handle such decision making.
The switch statement consists of a series of case labels, an optional default case and statements to execute for each case. The break statement is used to exit the switch statement immediately. If break is not used, fall-through will occur, where the statements for all the remaining cases will be executed.

## 4.8 do...while Iteration Statement
The do...while iteration statement is similar to the while statement. In the while statement, the loop-continuation condition is tested at the beginning of the loop before the body of the loop is performed. The do...while statement tests the loop-continuation condition after the loop body is performed. Therefore, the loop body will always execute at least once.

## 4.9 break and continue Statements
The break and continue statements are used to alter the flow of control.
- **break Statement**: When executed in a while, for, do...while or switch statement, causes an immediate exit from that statement.
- **continue Statement**: When executed in a while, for or do...while statement, skips the remaining statements in that control statement’s body and performs the next iteration of the loop.

## 4.10 Logical Operators
Logical operators may be used to form more complex conditions by combining simple conditions. The logical operators are \`&&\` (logical AND), \`||\` (logical OR) and \`!\` (logical NOT).
- An expression containing \`&&\` or \`||\` operators is evaluated only until truth or falsehood is known. This is called short-circuit evaluation.

## 4.11 Confusing Equality (==) and Assignment (=) Operators
A common error is accidentally swapping the operators \`==\` (equality) and \`=\` (assignment). This does not ordinarily cause compilation errors but can lead to runtime logic errors. Any expression that produces a value can be used in the decision portion of any control statement. If the value is 0, it’s treated as false; if nonzero, it's true. Assignments in C produce a value.

## 4.12 Structured Programming Summary
Structured programming produces programs that are easier to understand, test, debug, modify, and even prove correct. It involves using only single-entry/single-exit control statements combined in two ways: stacking and nesting. All programs can be written in terms of only three forms of control: sequence, selection (if), and iteration (while).

## 4.13 Secure C Programming
### Checking Function scanf’s Return Value
Many functions return values indicating whether they executed successfully. For example, function \`scanf\` returns an \`int\` indicating the number of items that were read. If this value does not match the number you intended to read, then \`scanf\` was unable to complete the input operation.

### Range Checking
Even if a scanf operates successfully, the values read might still be invalid. You should validate inputs by using range checking to ensure that they are within expected bounds.
`,
  zh: `
# 4. C 程式控制

## 學習目標
在本章中，您將學習：
- 計數器控制迭代的要點。
- 使用 for 和 do...while 迭代陳述式重複執行陳述式。
- 理解使用 switch 選擇陳述式的多重選擇。
- 使用 break 和 continue 陳述式改變控制流程。
- 在控制陳述式中使用邏輯運算子形成複雜的條件表達式。
- 避免混淆相等和賦值運算子所帶來的後果。

## 4.1 簡介
您現在應該能自如地編寫簡單、完整的 C 程式了。在本章中，將更詳細地探討迭代，並介紹額外的迭代控制陳述式，即 for 和 do...while。同時也會介紹 switch 多重選擇陳述式。我們將討論用於立即從某些控制陳述式中退出的 break 陳述式，以及用於跳過迭代陳述式主體的其餘部分，然後繼續下一次迴圈的 continue 陳述式。本章還討論了用於組合條件的邏輯運算子，並總結了第三章和本章中介紹的結構化程式設計原則。

## 4.2 迭代要點
大多數程式都涉及迭代或迴圈。迴圈是電腦在某個迴圈繼續條件為真時重複執行的一組指令。我們已經討論了兩種迭代方式：
1. 計數器控制的迭代
2. 哨兵控制的迭代
計數器控制的迭代有時被稱為確定性迭代，因為我們事先確切知道迴圈將執行多少次。哨兵控制的迭代有時被稱為不確定性迭代，因為事先不知道迴圈將執行多少次。
在計數器控制的迭代中，使用一個控制變數來計算迭代次數。每次執行這組指令時，控制變數都會遞增（通常是加 1）。當控制變數的值表示已執行正確的迭代次數時，迴圈終止，程式繼續執行迭代陳述式之後的陳述式。

## 4.3 計數器控制的迭代
計數器控制的迭代需要：
1. 控制變數（或迴圈計數器）的名稱。
2. 控制變數的初始值。
3. 每次迴圈中控制變數被修改的增量（或減量）。
4. 測試控制變數最終值的條件（即是否應繼續迴圈）。
考慮圖 4.1 中的簡單程式，它印出從 1 到 10 的數字。定義
\`unsigned int counter = 1; // 初始化\`
命名了控制變數（counter），將其定義為整數，為其保留記憶體空間，並將其初始值設為 1。

## 4.4 for 迭代陳述式
for 迭代陳述式處理了計數器控制迭代的所有細節。for 陳述式的一般格式是
\`for (初始化; 條件; 增量) { 陳述式 }\`
其中初始化表達式初始化迴圈控制變數，條件表達式是迴圈繼續條件，增量表達式遞增控制變數。
圖 4.3 更詳細地介紹了圖 4.2 的 for 陳述式。請注意，for 陳述式「包辦一切」——它指定了使用控制變數進行計數器控制迭代所需的每一個項目。for 陳述式中的三個表達式都是可選的。如果省略條件表達式，C 語言會假設迴圈繼續條件為真，從而創建一個無限迴圈。for 陳述式中的兩個分號是必需的。

## 4.5 for 陳述式：注意事項與觀察
1. 初始化、迴圈繼續條件和增量可以包含算術表達式。
2. 「增量」可以是負數（在這種情況下，它實際上是遞減，迴圈實際上是倒數）。
3. 如果迴圈繼續條件一開始就為假，則迴圈主體不執行。
4. 控制變數經常在迴圈主體中被印出或用於計算，但這不是必需的。
5. for 陳述式的流程圖與 while 陳述式非常相似。初始化只發生一次，而增量在每次執行主體陳述式後發生。

## 4.6 使用 for 陳述式的範例
for 陳述式可用於對 2 到 100 之間的所有偶數求和，或計算複利。C 語言不包含指數運算子，但我們可以使用標準函式庫的 \`pow(x, y)\` 函式來計算 x 的 y 次方。

## 4.7 switch 多重選擇陳述式
有時，一個演算法會包含一系列的決策，其中一個變數或表達式會針對它可能承擔的每個常數整數值進行單獨測試，並採取不同的動作。這稱為多重選擇。C 語言提供了 switch 多重選擇陳述式來處理這種決策。
switch 陳述式由一系列的 case 標籤、一個可選的 default case 以及為每個 case 執行的陳述式組成。break 陳述式用於立即退出 switch 陳述式。如果不使用 break，將會發生「穿透」(fall-through)，即其餘所有 case 的陳述式都將被執行。

## 4.8 do...while 迭代陳述式
do...while 迭代陳述式與 while 陳述式相似。在 while 陳述式中，迴圈繼續條件在迴圈主體執行之前於迴圈開始時進行測試。do...while 陳述式則在迴圈主體執行之後測試迴圈繼續條件。因此，迴圈主體至少會執行一次。

## 4.9 break 與 continue 陳述式
break 和 continue 陳述式用於改變控制流程。
- **break 陳述式**：在 while、for、do...while 或 switch 陳述式中執行時，會導致立即從該陳述式退出。
- **continue 陳述式**：在 while、for 或 do...while 陳述式中執行時，會跳過該控制陳述式主體中的其餘陳述式，並執行迴圈的下一次迭代。

## 4.10 邏輯運算子
邏輯運算子可用於透過組合簡單條件來形成更複雜的條件。邏輯運算子有 \`&&\` (邏輯 AND)、\`||\` (邏輯 OR) 和 \`!\` (邏輯 NOT)。
- 包含 \`&&\` 或 \`||\` 運算子的表達式只會評估到真假值已知為止。這稱為短路求值。

## 4.11 混淆相等 (==) 與賦值 (=) 運算子
一個常見的錯誤是意外地交換了 \`==\` (相等) 和 \`=\` (賦值) 運算子。這通常不會導致編譯錯誤，但可能導致執行時的邏輯錯誤。任何產生值的表達式都可以在任何控制陳述式的決策部分使用。如果值為 0，則視為假；如果非零，則為真。在 C 語言中，賦值會產生一個值。

## 4.12 結構化程式設計摘要
結構化程式設計產生的程式更容易理解、測試、除錯、修改，甚至可以證明其正確性。它僅涉及使用單入口/單出口的控制陳述式，並以兩種方式組合：堆疊和巢狀。所有程式都可以僅用三種控制形式來編寫：序列、選擇 (if) 和迭代 (while)。

## 4.13 安全的 C 程式設計
### 檢查函式 scanf 的回傳值
許多函式會回傳值以指示它們是否成功執行。例如，函式 \`scanf\` 回傳一個 \`int\`，表示讀取到的項目數量。如果這個值與您預期讀取的數量不符，那麼 \`scanf\` 就無法完成輸入操作。

### 範圍檢查
即使 scanf 操作成功，讀取到的值可能仍然無效。您應該透過範圍檢查來驗證輸入，以確保它們在預期的範圍內。
`,
};
