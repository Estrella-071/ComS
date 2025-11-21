
export const appendixCContent = {
  en: `
# Appendix C: Pseudocode

One of the most common tools for defining algorithms is pseudocode. **Pseudocode** is an English-like representation of the code required for an algorithm. It is part English and part structured code. The English part provides a relaxed syntax that is easy to read. The code part consists of an extended version of the basic algorithmic constructs: *sequence*, *selection*, and *loop*. Algorithm C.1 shows an example of pseudocode. We briefly discuss each component in the next section.

**Algorithm C.1 Example of pseudocode**
\`\`\`
Algorithm: FindingSmallest (list)
Purpose: Finds the smallest number among a list of numbers
Pre: List of numbers
Post: None
Return: The smallest number in the list
{
    smallest ← first number
    Loop (not end of list)
    {
        If (next number < smallest)
        {
            smallest ← second number
        }
    }
    Return value of smallest
}
\`\`\`

## C.1 COMPONENTS

An algorithm written in pseudocode can be decomposed into several elements and constructs.

### C.1.1 Algorithm header
Each algorithm begins with a header that names it. For example, in Algorithm C.1, the header starts with the word *Algorithm*, which gives the algorithm’s title as ‘Finding Smallest’.

### C.1.2 Purpose, conditions, and return
After the header, we normally mention the purpose, the precondition, postconditions, and the data returned from the algorithm.

**Purpose**
The purpose is a short statement about what the algorithm does. It needs to describe only the general algorithm processing. It should not attempt to describe all of the processing. The purpose starts with the word Purpose and continues with the goal of the algorithm.

**Precondition**
The precondition lists any precursor requirements. For example, we require that the list be available to the algorithm.

**Postcondition**
The postcondition identifies any effect created by the algorithm. For example, the algorithm may require the printing of data.

**Return**
We believe that every algorithm should show what is returned from the algorithm. If there is nothing to be returned, we advise that null be specified. The smallest value that is found is returned.

**Statement**
Statements are commands such as **assign**, **input**, **output**, **if-then-else**, and **loop**, as shown in Algorithms C.1, C.2, C.3, and C.4. Nested statements—statements inside another statement—are indented. The list of nested statements starts with the opening brace (curly bracket) and ends with a closing brace. The whole argument is a list of nested statements inside the algorithm itself. For this reason, we see an opening brace at the beginning and a closing brace at the end.

### C.1.3 Statement constructs
When Niklaus Wirth first proposed the structured programming model, he stated that any algorithm could be written with only three programming constructs: *sequence*, *selection*, and *loop*. Our pseudocode contains only these three basic constructs. The implementation of these constructs relies on the richness of the implementation language. For example, the loop can be implemented as a *while*, *do-while*, or *for* statement in the C language.

**Sequence**
A sequence is a series of statements that do not alter the execution path within an algorithm. Although it is obvious that statements such as **assign** and **add** are sequence statements, it is not so obvious that a call to other algorithms is also considered a sequence statement. The reason lies in the structured programming concept that each algorithm has only one entry and one exit. Furthermore, when an algorithm completes, it returns to the statement immediately after the call that invoked it. You can therefore properly consider the algorithm call a sequence statement. Algorithm C.2 shows a sequence.

**Algorithm C.2 Example of a sequence**
\`\`\`
x ← first number
y ← second number
z ← x × y
call Argument X
\`\`\`

**Selection**
Selection statements evaluate one or more alternatives. If true, one path is taken; if false, a different path is taken. The typical selection statement is the two-way selection (if-else). Whereas most languages provide for multi-way selections, we provide none in pseudocode. The alternatives of the selection are identified by indentation, as shown in Algorithm C.3.

**Algorithm C.3 Example of a selection**
\`\`\`
If (x < y)
{
    Increment x
    Print x
}
Else
{
    Decrement y
    Print y
}
\`\`\`

**Loop**
A loop iterates a block of code. The loop in our pseudocode most closely resembles the *while* loop. It is a pretest loop: that is, the condition is evaluated before the body of the loop is executed. If the condition is true, the body is executed. If the condition is false, the loop terminates. Algorithm C.4 shows an example of a loop.

**Algorithm C.4 Example of a loop**
\`\`\`
Loop (more lines in the file File1)
{
    Read next line
    Delete the leading space
    Copy the line to File2
}
\`\`\`
`,
  zh: `
# 附錄 C：偽代碼 (Pseudocode)

定義演算法最常用的工具之一是偽代碼。**偽代碼**是一種近似英語的表示法，用於描述演算法所需的程式碼。它部分是英語，部分是結構化程式碼。英語部分提供了易於閱讀的寬鬆語法。程式碼部分由基本演算法建構的擴展版本組成：*循序*、*選擇*和*迴圈*。演算法 C.1 顯示了一個偽代碼範例。我們將在下一節簡要討論每個組件。

**演算法 C.1 偽代碼範例**
\`\`\`
Algorithm: FindingSmallest (list)
Purpose: 找出一列數字中的最小數字
Pre: 數字列表
Post: 無
Return: 列表中的最小數字
{
    smallest ← 第一個數字
    Loop (未到列表末尾)
    {
        If (下一個數字 < smallest)
        {
            smallest ← 第二個數字
        }
    }
    Return smallest 的值
}
\`\`\`

## C.1 組成部分

用偽代碼編寫的演算法可以分解為幾個元素和建構。

### C.1.1 演算法標頭
每個演算法都以一個標頭開始，為其命名。例如，在演算法 C.1 中，標頭以單詞 *Algorithm* 開頭，給出演算法的標題為「Finding Smallest」。

### C.1.2 目的、條件與回傳值
在標頭之後，我們通常會提到目的、前置條件、後置條件以及從演算法回傳的資料。

**目的 (Purpose)**
目的是關於演算法做什麼的簡短陳述。它只需要描述一般的演算法處理。它不應試圖描述所有的處理。目的以單詞 Purpose 開頭，並繼續說明演算法的目標。

**前置條件 (Precondition)**
前置條件列出了任何前導要求。例如，我們要求列表對演算法可用。

**後置條件 (Postcondition)**
後置條件標識演算法產生的任何效果。例如，演算法可能要求列印資料。

**回傳 (Return)**
我們認為每個演算法都應該顯示從演算法回傳的內容。如果沒有任何東西要回傳，我們建議指定 null。找到的最小值被回傳。

**陳述式 (Statement)**
陳述式是諸如 **assign** (賦值)、**input** (輸入)、**output** (輸出)、**if-then-else** (如果-則-否則) 和 **loop** (迴圈) 之類的命令，如演算法 C.1、C.2、C.3 和 C.4 所示。巢狀陳述式——另一個陳述式內部的陳述式——是縮排的。巢狀陳述式列表以左大括號（curly bracket）開始，以右大括號結束。整個引數是演算法本身內部的巢狀陳述式列表。因此，我們在開頭看到一個左大括號，在結尾看到一個右大括號。

### C.1.3 陳述式建構
當 Niklaus Wirth 首次提出結構化程式設計模型時，他指出任何演算法都可以只用三種程式設計建構來編寫：*循序*、*選擇*和*迴圈*。我們的偽代碼僅包含這三種基本建構。這些建構的實作依賴於實作語言的豐富性。例如，迴圈可以在 C 語言中實作為 *while*、*do-while* 或 *for* 陳述式。

**循序 (Sequence)**
循序是一系列不改變演算法內執行路徑的陳述式。雖然 **assign** 和 **add** 等陳述式顯然是循序陳述式，但呼叫其他演算法也被視為循序陳述式這一點並不那麼明顯。原因在於結構化程式設計概念，即每個演算法只有一個入口和一個出口。此外，當演算法完成時，它會返回到調用它的呼叫之後的陳述式。因此，您可以正確地將演算法呼叫視為循序陳述式。演算法 C.2 顯示了一個循序。

**演算法 C.2 循序範例**
\`\`\`
x ← 第一個數字
y ← 第二個數字
z ← x × y
call Argument X
\`\`\`

**選擇 (Selection)**
選擇陳述式評估一個或多個替代方案。如果為真，則採取一條路徑；如果為假，則採取不同的路徑。典型的選擇陳述式是雙向選擇 (if-else)。雖然大多數語言提供多向選擇，但在偽代碼中我們不提供。選擇的替代方案由縮排標識，如演算法 C.3 所示。

**演算法 C.3 選擇範例**
\`\`\`
If (x < y)
{
    Increment x
    Print x
}
Else
{
    Decrement y
    Print y
}
\`\`\`

**迴圈 (Loop)**
迴圈迭代一個程式碼區塊。我們偽代碼中的迴圈最像 *while* 迴圈。這是一個前測迴圈：也就是說，在執行迴圈主體之前評估條件。如果條件為真，則執行主體。如果條件為假，則迴圈終止。演算法 C.4 顯示了一個迴圈的範例。

**演算法 C.4 迴圈範例**
\`\`\`
Loop (檔案 File1 中還有更多行)
{
    Read 下一行
    Delete 前導空格
    Copy 該行到 File2
}
\`\`\`
`,
};
