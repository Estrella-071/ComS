
export const appendixDContent = {
  en: `
# Appendix D: Structure Chart

The structure chart is the primary tool in a procedure-oriented software design phase. As a design tool, it is created before we start writing our program.

## D.1 STRUCTURE CHART SYMBOLS
Figure D.1 shows the various symbols used in a structure chart.

### D.1.1 Module symbol
Each rectangle in a structure chart represents a module. The name in the rectangle is the name you give to the module (Figure D.2).

### D.1.2 Selection in structure charts
Figure D.3 shows two symbols for a module that is called by a selection statement: the condition and the exclusive OR.

In Figure D.3a, the module *A* contains a conditional call to a submodule, *fun*. If the condition is true, you call *fun*. If it is not true, we skip *fun*. This situation is represented in a structure chart as a diamond on the vertical line between the two module blocks.

Figure D.3b represents selection between two different modules. In this example the module *select* chooses between *A* and *B*. One and only one of them will be called each time the selection statement is executed. This is known as an **exclusive OR**: one of the two alternatives is executed to the exclusion of the other. The exclusive OR is represented by a plus sign between the modules.

Now consider the design of a series of modules that can be called exclusively. This occurs when a multi-way selection contains calls to several different modules. Figure D.4 contains an example of a selection statement that calls different modules based on color.

### D.1.3 Loops in structure charts
Let’s look at how loops are shown in a structure chart. The symbols are very simple. Loops go in circles, so the symbol used is a circle. Programmers use two basic looping symbols. The first is a simple loop, shown in Figure D.5a. The other is the conditional loop, shown in Figure D.5b. When the module is called unconditionally, as in a *while* loop, the circle flows around the line above the called module. On the other hand, if the call is conditional, as in a module called in an *if-else* statement inside a loop, then the circle includes a decision diamond on the line.

Figure D.6 shows the basic structure for a module called *process*. The circle is *below* the module that controls the loop. In this example, the looping statement is contained in *process*, and it calls three modules, *A*, *B*, and *C*. The exact nature of the loop cannot be determined from the structure chart. It could be any of the three basic looping constructs.

## D.2 READING STRUCTURE CHARTS
Structure charts are read *top-down* and *left-to-right*. Referring to Figure D.2, this rule says that the program (*main*) consists of three submodules: *initialize*, *process*, and *endOfJob*. According to the left-to-right rule, the first call in the program is to *initialize*. After *initialize* is complete, the program calls *process*. When *process* is complete, the program calls *endOfJob*. In other words, the modules on the same level of a structure chart are called in order from left to right.

The concept of top-down is demonstrated by *process*. When *process* is called, it calls *A*, *B*, and *C* in turn. Module *B* does not start running, however, until *A* is finished. While *A* is running, it calls *A1* and *A2* in turn. In other words, all modules in a line from *process* to *A2* must be called before module *B* can start.

Often a program will contain several calls to a common module. These calls are usually scattered throughout the program. The structure chart will show the call wherever it logically occurs in the program. To identify common structures, the lower right corner of the rectangle will contain crosshatching or will be shaded. If the common module is complex and contains submodules, these submodules need to be shown only once. An indication that the incomplete references contain additional structure should be shown. This is usually done with a line below the module rectangle and a cut (~) symbol. This idea is shown in Figure D.7, which uses a common module, *average*, in two different places in the program. Note, however, that you never show a module connected to two calling modules graphically.

## D.3 RULES OF STRUCTURE CHARTS
We summarize the rules discussed in this section:
*   Each rectangle in a structure chart represents a module.
*   The name in the rectangle is the name that will be used in the coding of the module.
*   The structure chart contains only module flow. No code is indicated.
*   Common modules are indicated by crosshatching or shading in the lower right corner of the module rectangle.
*   Data flows and flags are optional. When used, they should be named.
*   Input flows and flags are shown to the left of the vertical line; output flows and flags are shown to the right.
`,
  zh: `
# 附錄 D：結構圖 (Structure Chart)

結構圖是程序導向軟體設計階段的主要工具。作為一種設計工具，它在我們開始編寫程式之前創建。

## D.1 結構圖符號
圖 D.1 顯示了結構圖中使用的各種符號。

### D.1.1 模組符號
結構圖中的每個矩形代表一個模組。矩形中的名稱是你給模組的名稱（圖 D.2）。

### D.1.2 結構圖中的選擇
圖 D.3 顯示了由選擇陳述式呼叫的模組的兩個符號：條件和互斥或 (exclusive OR)。

在圖 D.3a 中，模組 *A* 包含對子模組 *fun* 的條件式呼叫。如果條件為真，則呼叫 *fun*。如果不為真，則跳過 *fun*。這種情況在結構圖中表示為兩個模組塊之間的垂直線上的菱形。

圖 D.3b 表示兩個不同模組之間的選擇。在這個例子中，模組 *select* 在 *A* 和 *B* 之間進行選擇。每次執行選擇陳述式時，將呼叫其中一個且僅呼叫一個。這稱為**互斥或**：執行兩個替代方案之一，而排除另一個。互斥或由模組之間的加號表示。

現在考慮一系列可以互斥呼叫的模組的設計。當多向選擇包含對幾個不同模組的呼叫時，就會發生這種情況。圖 D.4 包含一個基於顏色呼叫不同模組的選擇陳述式範例。

### D.1.3 結構圖中的迴圈
讓我們看看迴圈在結構圖中是如何顯示的。符號非常簡單。迴圈是繞圈的，所以使用的符號是一個圓圈。程式設計師使用兩個基本的迴圈符號。第一個是簡單迴圈，如圖 D.5a 所示。另一個是條件迴圈，如圖 D.5b 所示。當無條件呼叫模組時，如在 *while* 迴圈中，圓圈圍繞在被呼叫模組上方的線上。另一方面，如果呼叫是有條件的，如在迴圈內的 *if-else* 陳述式中呼叫模組，那麼圓圈在線上包含一個決策菱形。

圖 D.6 顯示了名為 *process* 的模組的基本結構。圓圈位於控制迴圈的模組*下方*。在這個例子中，迴圈陳述式包含在 *process* 中，它呼叫三個模組 *A*、*B* 和 *C*。迴圈的確切性質無法從結構圖中確定。它可以是三種基本迴圈建構中的任何一種。

## D.2 閱讀結構圖
結構圖是*由上而下*和*由左至右*閱讀的。參考圖 D.2，這個規則說程式 (*main*) 由三個子模組組成：*initialize*、*process* 和 *endOfJob*。根據從左到右的規則，程式中的第一個呼叫是 *initialize*。在 *initialize* 完成後，程式呼叫 *process*。當 *process* 完成時，程式呼叫 *endOfJob*。換句話說，結構圖同一層級上的模組是按從左到右的順序呼叫的。

由上而下的概念由 *process* 演示。當 *process* 被呼叫時，它依次呼叫 *A*、*B* 和 *C*。然而，模組 *B* 直到 *A* 完成才開始運行。當 *A* 運行時，它依次呼叫 *A1* 和 *A2*。換句話說，從 *process* 到 *A2* 的一條線上的所有模組必須在模組 *B* 開始之前被呼叫。

通常，一個程式會包含對一個通用模組的多次呼叫。這些呼叫通常分散在整個程式中。結構圖將在程式中邏輯發生呼叫的任何地方顯示該呼叫。為了識別通用結構，矩形的右下角將包含交叉陰影或被陰影覆蓋。如果通用模組很複雜並包含子模組，這些子模組只需要顯示一次。應該顯示不完整引用包含額外結構的指示。這通常通過在模組矩形下方畫一條線和一個切割 (~) 符號來完成。這個想法在圖 D.7 中顯示，該圖在程式的兩個不同位置使用了一個通用模組 *average*。然而，請注意，你永遠不會以圖形方式顯示一個模組連接到兩個呼叫模組。

## D.3 結構圖規則
我們總結本節討論的規則：
*   結構圖中的每個矩形代表一個模組。
*   矩形中的名稱是在模組編碼中將使用的名稱。
*   結構圖僅包含模組流程。未指示代碼。
*   通用模組由模組矩形右下角的交叉陰影或陰影指示。
*   資料流和旗標是可選的。使用時，它們應該被命名。
*   輸入流和旗標顯示在垂直線的左側；輸出流和旗標顯示在右側。
`,
};
