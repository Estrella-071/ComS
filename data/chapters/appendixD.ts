
export const appendixDContent = {
  en: `
# Appendix D: Structure Chart

The structure chart is a primary tool in procedure-oriented software design, created before coding begins. It shows the hierarchical structure of a program's modules.

## D.1 STRUCTURE CHART SYMBOLS
- **Module**: A rectangle represents a function or procedure.
- **Selection**: A diamond on a connection line indicates a conditional call (an \`if\` statement).
- **Loop**: A circular arrow around a connection line indicates that a call is made inside a loop.

## D.2 READING STRUCTURE CHARTS
Charts are read top-down and left-to-right. A module calls the submodules below it in left-to-right order.

## D.3 RULES OF STRUCTURE CHARTS
- Each rectangle is a module.
- The chart shows module flow, not code.
- Common (reused) modules are marked, often with shading.
- Data flows (parameters) between modules can be shown with small arrows, though they are optional.
`,
  zh: `
# 附錄 D：結構圖 (Structure Chart)

結構圖是程序導向軟體設計中的主要工具，在編碼開始前創建。它顯示了程式模組的階層結構。

## D.1 結構圖符號
- **模組 (Module)**：一個矩形代表一個函式或程序。
- **選擇 (Selection)**：連接線上的菱形表示條件式呼叫（一個 \`if\` 陳述式）。
- **迴圈 (Loop)**：圍繞連接線的圓形箭頭表示該呼叫是在迴圈內進行的。

## D.2 閱讀結構圖
圖表由上到下、由左至右閱讀。一個模組會按照從左到右的順序呼叫其下方的子模組。

## D.3 結構圖規則
- 每個矩形都是一個模組。
- 圖表顯示的是模組流程，而不是程式碼。
- 通用（可重複使用）的模組會被標記，通常帶有陰影。
- 模組之間的資料流（參數）可以用小箭頭表示，但這是可選的。
`,
};
