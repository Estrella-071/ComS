
export const appendixEContent = {
  en: `
# Appendix E: Boolean Algebra and Logic Circuits

## E.1 BOOLEAN ALGEBRA
Boolean algebra deals with variables that can only have two values: 1 (true) or 0 (false).

### E.1.1 Constants, variables, and operators
- **Constants**: 1 and 0.
- **Variables**: e.g., x, y, z.
- **Operators**: NOT ('), AND (·), OR (+).

### E.1.3 Logic gates
A logic gate is an electronic device that performs a Boolean operation. Common gates include NOT, AND, OR, NAND, NOR, XOR, and XNOR.

### E.1.4 Axioms, theorems, and Identities
Boolean algebra is governed by rules such as the laws of commutativity, associativity, distributivity, and De Morgan’s theorems.

### E.1.5 Boolean functions
A Boolean function has n Boolean inputs and one Boolean output. It can be represented by a truth table or an expression. A key task is **function simplification** to reduce the number of logic gates needed for implementation.

## E.2 LOGIC CIRCUITS
- **Combinational circuits**: The output depends only on the current inputs. These circuits are memoryless. Examples include adders and multiplexers.
- **Sequential circuits**: The output depends on both the current inputs and the previous state of the circuit. These circuits have memory. The basic memory element is a **flip-flop**.
`,
  zh: `
# 附錄 E：布林代數與邏輯電路

## E.1 布林代數
布林代數處理只能有兩個值的變數：1 (真) 或 0 (假)。

### E.1.1 常數、變數與運算子
- **常數**：1 和 0。
- **變數**：例如 x, y, z。
- **運算子**：NOT (')、AND (·)、OR (+)。

### E.1.3 邏輯閘
邏輯閘是一種執行布林運算的電子設備。常見的閘包括 NOT、AND、OR、NAND、NOR、XOR 和 XNOR。

### E.1.4 公理、定理與恆等式
布林代數受交換律、結合律、分配律和笛摩根定理等規則所支配。

### E.1.5 布林函數
布林函數有 n 個布林輸入和一個布林輸出。它可以用真值表或表達式表示。一項關鍵任務是**函數化簡**，以減少實作所需的邏輯閘數量。

## E.2 邏輯電路
- **組合電路 (Combinational circuits)**：輸出僅取決於當前的輸入。這些電路是無記憶的。例如加法器和多工器。
- **循序電路 (Sequential circuits)**：輸出取決於當前的輸入和電路先前的狀態。這些電路具有記憶體。基本的記憶元件是**正反器 (flip-flop)**。
`,
};
