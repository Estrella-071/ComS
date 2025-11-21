
export const appendixEContent = {
  en: `
# Appendix E: Boolean Algebra and Logic Circuits

## E.1 BOOLEAN ALGEBRA
**Boolean algebra** deals with variables and constants that take only one of two values: 1 or 0. This algebra is a suitable way to represent information in a computer, which is made of a collection of signals that can be in only one of the two states: on or off.

### E.1.1 Constants, variables, and operators
We use constants, variables, and operators in Boolean algebra.

**Constants**
There are only two constants: 1 and 0. The value of 1 is associated with the logical value *true*: the value 0 is associated with the logical value *false*.

**Variables**
We use letters such as x, y, and z to represent variables. Boolean variables can take only the values 0 or 1.

**Operators**
We use three basic operators: NOT, AND, and OR. We use a prime to represent NOT, a dot to represent AND, and a plus sign to represent OR, as shown below:
x’ → NOT x        x . y → x AND y        x + y → x OR y
An operator takes one or two values and creates one output value. The first operator, NOT, is a unary operator that takes only one value: the other two, AND and OR, are binary operators that take two values. Note that the choice of operators is arbitrary. We can construct all gates from the NAND gate (explained later).

### E.1.2 Expressions
An expression is a combination of Boolean operators, constants, and variables. The following shows some Boolean expressions:
0    x    x . 1    x + 0
x + 1 + y    x . (y + z)    x + y + z    x . y . z . t

### E.1.3 Logic gates
A **logic gate** is an electronic device that normally takes 1 to N inputs and creates one output. In this appendix, however, we use gates with only one or two inputs for simplicity. The logical value of the output is determined by the expression representing the gate and the input values. A variety of logic gates are commonly used in digital computers. Figure E.1 shows the symbols for the eight most common gates, their truth tables (see Chapter 4), and the expressions that can be used to find the output when the input or inputs are given.

*   **Buffer**. The first gate is just a buffer, in which the input and the output are the same. If the input is 0, the output is 0: if the input is 1, the output is 1. The buffer only amplifies the input signal.
*   **NOT**. The NOT gate is the implementation of the NOT operator. The output of this gate is the complement of the input. If the input is 1, the output is 0: if the input is 0, the output is 1.
*   **AND**. The AND gate is the implementation of the AND operator. It takes two inputs and creates one output. The output is 1 if both inputs are 1s, otherwise it is 0. Sometimes the AND operator is referred to as *product*.
*   **OR**. The OR gate is the implementation of the OR operator. It takes two inputs and creates one output. The output is 1 if any of the inputs, or both of them, is 1, otherwise it is 0. Sometimes the OR gate is referred to as *sum*.
*   **NAND**. The NAND gate is a logical combination of an AND gate followed by a NOT gate. The reason for its existence can be explained when we discuss the actual implementation of these gates. The output of a NAND gate is the complement of the corresponding AND gate if the inputs to two gates are the same.
*   **NOR**. The NOR gate is a logical combination of an OR gate followed by a NOT gate. The reason for its existence can also be explained when we discuss the actual implementation of these gates. The output of a NOR gate is the complement of the corresponding OR gate if the inputs to two gates are the same.
*   **XOR**. The XOR (exclusive-OR) gate is defined by the expression $(x . y’ + x’. y)$, which is normally represented as $(x \\oplus y)$. The output of this gate is 1 when the two inputs are different and is 0 when the inputs are the same. One can say that this is a more restricted OR gate. The output of an XOR gate is the same as the OR gate except that, if the two inputs are 1s, the output is 0.
*   **XNOR**. The XNOR (exclusive-NOR) gate is defined by the expression $(x . y’ + x’. y)’$ which is normally represented as $(x \\oplus y)’$. It is the complement of the XOR gate. The output of this gate is 1 when the two inputs are the same and 0 when the inputs are different. One can say that this represents the logical idea of equivalence: only if the two inputs are equal is the output 1.

**Implementation of gates**
The logic gates discussed in the previous section can be physically implemented using electronic switches (transistors). The most common implementation uses only three gates: NOT, NAND, and NOR. A NAND gate uses fewer components than an AND gate. This is also true for the NOR gate *versus* the OR gate. As a result, NAND and NOR gates have become the common standard in the industry. We only discuss these three implementations. Although we show simple switches in this discussion, we need to know that, in practice, switches are replaced by transistors. A transistor, when used in gates, behaves like a switch. The switch can be opened or closed by applying the appropriate voltage to the input. Several different technologies are used to implement these transistors, but we leave this discussion to books on electronics.

**Implementation of the NOT gate**
The NOT gate can be implemented with an electronic switch, a voltage source, and a resistor as shown in Figure E.2.
The input to the gate is a control signal that holds the switch open or closed. An input signal of 0 holds the switch open, while an input signal of 1 closes the switch. The output is the voltage at the point before the switch (output terminal). If the value of this voltage is positive (V volts), the output is interpreted as 1: if the voltage is 0 (or below a threshold), the output is interpreted as 0. When the switch is open, there is no current through the resistor, and therefore no voltage drop. The output voltage is V (interpreted as logic 1). Closing the switch grounds the output terminal and makes its voltage 0 (or almost 0), which is interpreted as logic 0. Note that the behavior of the circuit matches the values shown in the table.
**To implement a NOT gate, we need only one electronic switch.**

**Implementation of the NAND gate**
The NAND gate can be implemented using two switches in series (two inputs). For the current to flow through the circuit from the positive terminal to the ground, both switches must be closed—that is, both inputs must be 1s. In this case, the voltage of the output terminal is zero because it is grounded (logic 0). If one of the switches or both switches are open—that is, where the inputs are 00, 01, or 10—no current flows through the resistor. There is thus no voltage drop across the resistor and the voltage at the output terminal is V (logic 1).
Figure E.3 shows the implementation of the NAND gate. The behavior of the circuit matches the values shown in the table. Note that if an AND gate is needed, it can be made from a NAND gate followed by a NOT gate.
**To implement a NAND gate, we need two electronic switches that are connected in series.**

**Implementation of the NOR gate**
The NOR gate can also be implemented using two switches in parallel (two inputs). If both switches are open, then the current does not flow through the resistor. In this case, there is no voltage drop across the resistor, which means the output terminal holds the voltage V (logic 1). If either or both of the switches are closed, the output terminal is grounded and the output voltage is zero (logic 0).
Figure E.4 shows the implementation of the NOR gate. The behavior of the circuit matches the values in the table. Note that if an OR gate is needed, it can be simulated using a NOR gate followed by a NOT gate.
**To implement a NOR gate, we need two electronic switches that are connected in parallel.**

### E.1.4 Axioms, theorems, and Identities
To be able to work with Boolean algebra, we need to have some rules. The rules in Boolean algebra are divided into three broad categories: axioms, theorems, and identities.

**Axioms**
Boolean algebra, like any other algebra, uses some rules, called **axioms**: they cannot be proved. Table E.1 shows the axioms for Boolean algebra.

**Table E.1 Axioms for Boolean algebra**
| | Related to NOT | Related to AND | Related to OR |
| :--- | :--- | :--- | :--- |
| 1 | $x = 0 \\rightarrow x’ = 1$ | | |
| 2 | $x = 1 \\rightarrow x’ = 0$ | | |
| 3 | | $0 \\cdot 0 = 0$ | $0 + 0 = 0$ |
| 4 | | $1 \\cdot 1 = 1$ | $1 + 1 = 1$ |
| 5 | | $1 \\cdot 0 = 0 \\cdot 1 = 0$ | $1 + 0 = 0 + 1 = 1$ |

**Theorems**
Theorems are rules that we prove using the axioms, although we must leave the proofs to textbooks on Boolean algebra. Table E.2 shows some theorems used in Boolean algebra.

**Table E.2 Basic theorems for Boolean algebra**
| | Related to NOT | Related to AND | Related to OR |
| :--- | :--- | :--- | :--- |
| 1 | $(x’)’ = x$ | | |
| 2 | | $0 \\cdot x = 0$ | $0 + x = x$ |
| 3 | | $1 \\cdot x = x$ | $1 + x = 1$ |
| 4 | | $x \\cdot x = x$ | $x + x = x$ |
| 5 | | $x \\cdot x’ = 0$ | $x + x’ = 1$ |

**Identities**
We can also drive many identities using the axioms and the theorems. We list only the most common in Table E.3, although we must leave the proofs to textbooks on Boolean algebra.

**Table E.3 Basic Identities related to OR and AND operators**
| | Description | Related to AND | Related to OR |
| :--- | :--- | :--- | :--- |
| 1 | Commutativity | $x \\cdot y = y \\cdot x$ | $x + y = y + x$ |
| 2 | Associativity | $x \\cdot (y \\cdot z) = (x \\cdot y) \\cdot z$ | $x + (y + z) = (x + y) + z$ |
| 3 | Distributivity | $x \\cdot (y + z) = (x \\cdot y) + (y \\cdot z)$ | $x + (y \\cdot z) = (x + y) \\cdot (x + z)$ |
| 4 | De Morgan’s Rules | $(x \\cdot y)’ = x’ + y’$ | $(x + y)’ = x’ \\cdot y’$ |
| 5 | Absorption | $x \\cdot (x’ + y) = x \\cdot y$ | $x + (x’ \\cdot y) = x + y$ |

De Morgan’s Rules play a very important role in logic design, as we will see shortly. They can be extended to more than one variable. For example, we can have the following two identities for three variables:
$(x + y + z)’ = x’. y’. z’$        $(x. y. z)’ = x’ + y’ + z’$

### E.1.5 Boolean functions
We define a **Boolean function** as a function with $n$ Boolean input variables and one Boolean output variable, as shown in Figure E.5.

A function can be represented either by a truth table or an expression. The truth table for a function has $2^n$ rows and $n + 1$ columns, in which the first $n$ columns define the possible values of the variables and the last column defines the value of the function’s output for the combination of the values defined in the first $n$ columns.
Figure E.6 shows the truth tables and expression representation for two functions $F_1$ and $F_2$. Although the truth table representation is unique, a function can be represented by different expressions. We have shown two of the expressions for each function. Note that the second expressions are shorter and simpler. Later we show that we need to simplify the expressions to make the implementation more efficient.

**Table-to-expression transformation**
The specification of a function is normally given by a truth table (see Chapter 4). To implement the function using logic gates (as discussed earlier), we need to find an expression for the truth table. This can be done in two ways.

**Sum of products**
The first method of changing a truth table into an expression is referred to as the **sum of products** method. A sum of products representation of a function is made of up to $2^n$ terms in which each term is called a **minterm**. A minterm is a product (ANDing) of all variables in a function in which each variable appears only once. For example, in a three-variable function, we can have eight minterms, such as $x’. y’. z’$ or $x. y’. z’$. Each term represents one row in the truth value. If the value of a variable is 0, the complement of the variable appears in the term: if the value of the variable is 1, the variable itself appears in the term. To transform a truth table to a sum of product representation, we use the following strategy:
1.  Find the minterms for each row for which the function has a value of 1.
2.  Use the sum (ORing) of the terms in step 1.

**Product of sums**
The second method of changing a truth table to an expression is referred to as the **product of sums** method. A product of sum representation of a function is made of up to $2^n$ terms in which each term is called a **maxterm**. A maxterm is a sum (ORing) of all variables in a function in which each variable appears only once. For example, in a three-variable function, we can have eight maxterms such as $x’+ y’+ z’$ or $x + y’+ z’$. To transform a truth table to a product of sum representation, we use the following strategy:
1.  Find the minterms for each row for which the function has a 0 value.
2.  Find the complement of the sum of the terms in step 1.
3.  Use De Morgan’s rules to change minterms to maxterms.

**Example E.1**
Figure E.7 shows how we create the sum of products and product of sums for the functions F1 and F2 in Figure E.6.

The sum of products is directly made from the table, but the product of sums needs the use of De Morgan’s rules. Note that sometimes the first method gives the shorter expression and sometimes the second one.

### E.1.6 Function simplification
Although we can implement a Boolean function using the logic gates discussed before, it is normally not efficient. The direct implementation of a function requires more gates. The number of gates could be reduced if we can carry out simplification. Traditionally two methods of simplification are used: the algebraic method using Karnaugh maps, and the Quine–McKluskey method.

**Algebraic method**
We can simplify a function using the axioms, theorems, and identities discussed before. For example, we can simplify the first function ($F_1$) in Figure E.7, as shown below:
$F_1 = x’ \\cdot y’ + x \\cdot y’ + x \\cdot y$
$= (x’ + x) \\cdot y’ + x \\cdot y$        Identity 3 (distributivity) for AND
$= 1 \\cdot y’ + x \\cdot y$                Theorem 5 for OR
$= y’ + x \\cdot y$                        Theorem 3 for AND
$= y’ + y \\cdot x$                        Theorem 1 (commutativity) for AND
$= y’ + x$                            Identity 5 (absorption)
$= x + y’$                            Theorem 1 (commutativity) for OR

This means that if the non-simplified version needs eight gates, the simplified version needs only two gates, one NOT and one OR.

**Karnaugh map method**
Another simplification method involves the use of a **Karnaugh map**. This method can normally be used for functions of up to four variables. A map is a matrix of $2^n$ cells in which each cell represents one of the values of the function. The first point that deserves attention is to fill up the map correctly. Contrary to expectations, the map is not always filled up row by row or column by column: it is filled up according to the value of variables as shown on the map. Figure E.8 shows an example where n = 2, 3, or 4.

In the truth table, we use the function values from the top to the bottom of the truth table. The map is filled up one by one, but the order of rows are 1, 2, 4, 3. In each row, the columns are filled up one by one, but the order of the columns are 1, 2, 4, 3. The fourth row comes before the third row: the fourth column comes before the third. This arrangement is needed to allow the maximum of simplification.

**Sum of products**
The simplification can be done to create sum of products terms. When we simplify a function in this way we use minterms with value of 1. To create an efficient expression, we first combine adjacent minterm cells. Note that adjacency can also include wrap-around of bits.

**Example E.2**
Figure E.9 shows the sum of products simplification for our first function. The 1s in the second row are the entire x domain. The 1s in the first column are the entire y’ domain. The resulting simplified function is $F_1 = (x) + (y’)$. The figure also shows the implementation using one OR gate and one NOT gate.

**Example E.3**
Figure E.10 shows the sum of products simplification for our second function. The 1s in the second row are the intersection of x and z domains, which is represented as $(x . z)$. The 1s in the first row are the intersection of x’ and z’ domains, which is represented as $(x’. z’)$. The resulting simplified function is $F_2 = (x . z) + (x’. z’)$. The figure also shows the implementation using one OR gate, two AND gates, and two NOT gates.

**Product of sums**
The simplification can be done using the product of sums methods. When we simplify a function in this way, we need to use maxterms. To create an efficient expression, we first combine the adjacent minterm cells. However, the function obtained in this way is the complement of the function we are looking for: we need to use the De Morgan’s rules to find our function.

**Example E.4**
Figure E.11 shows a product of sums simplification for our first function. Note that in this case the implementation is exactly the same as Figure E.9, but this is not always the case. Also note that our function has only one term: we need no AND gate.

**Example E.5**
Figure E.12 shows the product-of-sums simplification for our second function. Note that the process gives us $(F_2)’$, so we need to apply the De Morgan’s rules to find $F_2$. The figure also shows the implementation using two NOT gates, two OR gates, and one AND gate. This implementation is less efficient than the one we found with minterms. We should always use the one which is more efficient.

## E.2 LOGIC CIRCUITS
A computer is normally built out of standard components that we collectively refer to as **logic circuits**. Logic circuits are divided into two broad categories, known as *combinational circuits* and *sequential circuits*. We briefly discuss each category here and give some examples.

### E.2.1 Combinational circuits
A **combinational circuit** is a circuit made up of a combination of logic gates with $n$ inputs and $m$ outputs. Each output at any time entirely depends on all given inputs.
**In a combinational circuit, each output at any time depends entirely on all inputs.**
Figure E.13 shows the block diagram of a combinational circuit with $n$ inputs and $m$ outputs. Comparing Figure E.13 and Figure E.5, we can say that a combinational circuit with $m$ outputs can be thought of as $m$ functions, a function for each output.
The output of a combinational circuit is normally defined by a truth table. However, the truth table needs to have $m$ outputs.

**Half adder**
A simple example of a combinational circuit is a **half adder**, an adder that can only add two bits. A half adder is a combinational circuit with two inputs and two outputs. The two inputs define the two bits to be added. The first output is the sum of the two bits, while the second output is the carry bit that needs to be propagated to the next adder. Figure E.14 shows a half-adder with its truth table and the logic gates used to the make the circuit.
The sum of two bits can be achieved using an XOR gate: the carry can be achieved using and AND gate.

**Multiplexer**
A **multiplexer** is a combinational circuit with $n$ inputs and only one output. The $n$ inputs are made up of $D$ data inputs and $C$ control inputs ($n = D + C$). At any time, the multiplexer routes one of its $D$ data inputs to its single data output. The selection is based on the value of control bits. To select one of the $D$ data inputs, we need $C = \\log_2 D$ control bits. If $D = 2$, at any time only one of the data inputs is routed to the output. The control input is only one bit. If the control input is 0, the first data input is directed to the output: if the control input is 1, the second input is routed to the output.
Figure E.15 shows the truth table and the circuit for a 2 x 1 multiplexer. Note that the circuit actually has three inputs and one output: the control input is considered one of the inputs.
Note that the truth table here is very simplified: the output depends only on the control input but the value of the output, however, is one of the two data inputs.

### E.2.2 Sequential circuits
A combinational circuit is memoryless: it does not remember its previous output. At any moment the output depends on the current input. A **sequential circuit**, on the other hand, includes the concept of memory in the logic. The memory enables the circuit to remember its current state to be used in the future; the future state can be dependent on the current state.

**Flip-flops**
To add the idea of memory to the combinational circuit, a storage element called a **flip-flop** was invented that can hold one bit of information. A set of flip-flops can be used to hold a set of bits.

**SR flip-flops**
The simplest type of flip-flop is called an **SR flip-flop**, in which there are two inputs S (set) and R (reset) and two outputs Q and Q’, which are always complements of each other. Figure E.16 shows the symbol, the circuit, and the characteristic table of an SR flip-flop. Note that the characteristic table is different from the truth tables we have used for combinational circuits. The characteristic table shows the next output, Q ($t + 1$) based on the current output, Q ($t$) and the input.
The characteristic table shows that if both S and R are zero, Q ($t + 1$) = Q ($t$). The next output will be the same as the current output. If S is 0 and R is 1, Q ($t + 1$) = 0, which means the output will be reset (R = 1). If S is 1 and R is 0, Q ($t + 1$) = 1, which means that the output will be set. However, if both S and R are 1s, the next output is unpredictable (undefined). Note that we have not shown the value of Q’ in the characteristic table, because it is always the complement of Q.
An SR flip-flop can be used as a set–reset device. For example, if the output is connected to an electric sounder, the alarm can be set by letting R = 0 and S = 1. After setting, the alarm continues sounding until it is reset by setting R = 1 and S = 0. The only flaw in this design is that R and S should not simultaneously be 1s.
To understand the behavior of the SR flip-flop we need to create its truth table. However, note that we now have three inputs and one output (Q and Q’ are independent). Table E.4 shows the truth table for this flip-flop.

**Table E.4 Truth table for an SR flip-flop**
| S | R | Q (t) | Q (t + 1) |
| :--- | :--- | :--- | :--- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | undefined |
| 1 | 1 | 1 | undefined |

**D flip-flop**
The SR flip-flop cannot be used as a 1-bit memory, as it needs two inputs instead of one. A small modification to the SR flip-flop can create a **D flop** (D stands for data). Figure E.17 shows the symbol and characteristics of a D flip-flop.
Note that the output of D flip-flop is the same as its input. However, the output remains as it is until the new input is given. This means that it memorizes its input states.

**JK flip-flop**
To remove the undefined state from the SR flip-flop, the **JK flip-flop** was invented (JK stands for Jack Kilby, who invented integrated circuits). Adding two AND gates to an SR flip-flop creates a JK flip-flop that has no undefined state. Figure E.18 shows the JK flip-flop and its characteristic table.

**T flip-flop**
Another common type of flip-flop is the **T flip-flop** (T stands for *toggle*). This flip-flop can be made by connecting the two inputs of an JK flip-flop together and calling it the T input. This input toggles the state of the flip-flop: if the input is 0, the next state is the same as the current state. If the input is 1, the next state is the complement of the current state. Figure E.19 shows the symbol, circuit, and characteristic table of the T flip-flop.

**Synchronous versus asynchronous**
The flip-flops we have discussed so far are all referred to as **asynchronous devices**: the transition from one state to another can happen only when there is a change in the input.
Digital computers, on the other hand, are **synchronous devices**. A central clock in the computer controls the timing of all logic circuits. The clock creates a signal—a series of pulses with an exact pulse width—that coordinates all events. A simple event takes place only at the ‘tick’ of this clock signal.
Figure E.20 shows an abstract idea of a clock signal. We call it *abstract* because in reality no electronic circuit can generate a signal with perfectly sharp impulses, but the signal shown here is sufficient for our discussion.

A flip-flop can be synchronous if we add one more input to the circuit: the clock input. The clock input can be ANDed with every input to gate the input so that it is effective only when the clock pulse is present. Figure E.21 shows the symbols for the clocked versions of all four flip-flop types we discussed. Figure E.22 shows the circuit of an SR flip-flop with a clock signal. The other flip-flops have the same additional circuitry.

**Register**
As the first application of a synchronous (clocked) sequential circuit, we will introduce a simplified version of a **register**. A register is an $n$-bit storage device that stores its data between consecutive clock pulses. At the trigger of the clock, the old data is discarded and replaced by the new data.
Figure E.23 shows a 4-bit register in which each cell is composed of a D flip-flop. Note that the clock input is common for all cells. We have rotated our previous symbols to make the connections simpler.

**Digital counter**
An $n$-bit **digital counter** counts from 0 to $2^n - 1$. For example, when $n = 4$, the output of the counter is 0000, 0001, 0010, 0011, …, 1111, so it counts from 0 to 15. An $n$-bit counter can be made out of $n$ T flip-flops. At the start, the counter represents 0000. The count enable line—see Figure E.24—carries a sequence of 1s: the data (pulse) to be counted. Looking at the sequence of events, we can see that the rightmost bit is complemented with each positive transition of the count enable connection, simulating the arrival of a data item. When the rightmost bit changes from 1 to 0, the next leftmost bit is complemented. The process is repeated for all bits. This observation gives us a clue to the use of a T flip-flop. The characteristic table of this flip-flop shows that each input of value 1 complements the output. Note that this counter can count only up to 15 or $(1111)_2$. The arrival of the sixteenth data item resets the counter back to $(0000)_2$. Figure E.24 shows the circuit of a 4-bit counter.
`,
  zh: `
# 附錄 E：布林代數與邏輯電路

## E.1 布林代數
**布林代數**處理只能取兩個值之一的變數和常數：1 或 0。這種代數是表示電腦中資訊的合適方式，電腦由一組只能處於兩種狀態之一的信號組成：開或關。

### E.1.1 常數、變數與運算子
我們在布林代數中使用常數、變數和運算子。

**常數**
只有兩個常數：1 和 0。值 1 與邏輯值*真 (true)* 相關聯：值 0 與邏輯值*假 (false)* 相關聯。

**變數**
我們使用字母如 x, y, 和 z 來表示變數。布林變數只能取值 0 或 1。

**運算子**
我們使用三個基本運算子：NOT、AND 和 OR。我們使用撇號表示 NOT，圓點表示 AND，加號表示 OR，如下所示：
x’ → NOT x        x . y → x AND y        x + y → x OR y
運算子接受一個或兩個值並創建一個輸出值。第一個運算子 NOT 是一元運算子，只接受一個值：其他兩個 AND 和 OR 是二元運算子，接受兩個值。請注意，運算子的選擇是任意的。我們可以從 NAND 閘構建所有閘（稍後解釋）。

### E.1.2 表達式
表達式是布林運算子、常數和變數的組合。以下顯示了一些布林表達式：
0    x    x . 1    x + 0
x + 1 + y    x . (y + z)    x + y + z    x . y . z . t

### E.1.3 邏輯閘
**邏輯閘**是一種電子設備，通常接受 1 到 N 個輸入並創建一個輸出。然而，在本附錄中，為了簡單起見，我們使用只有一個或兩個輸入的閘。輸出的邏輯值由代表閘的表達式和輸入值決定。各種邏輯閘常用於數位電腦中。圖 E.1 顯示了八種最常見閘的符號、它們的真值表（見第 4 章），以及可用於在給定輸入時找出輸出的表達式。

*   **緩衝器 (Buffer)**。第一個閘只是緩衝器，輸入和輸出相同。如果輸入是 0，輸出是 0：如果輸入是 1，輸出是 1。緩衝器只放大輸入信號。
*   **NOT**。NOT 閘是 NOT 運算子的實作。此閘的輸出是輸入的補數。如果輸入是 1，輸出是 0：如果輸入是 0，輸出是 1。
*   **AND**。AND 閘是 AND 運算子的實作。它接受兩個輸入並創建一個輸出。如果兩個輸入都是 1，輸出是 1，否則是 0。有時 AND 運算子被稱為*積*。
*   **OR**。OR 閘是 OR 運算子的實作。它接受兩個輸入並創建一個輸出。如果任何輸入或兩者都是 1，輸出是 1，否則是 0。有時 OR 閘被稱為*和*。
*   **NAND**。NAND 閘是 AND 閘後跟 NOT 閘的邏輯組合。當我們討論這些閘的實際實作時，可以解釋其存在的原因。如果兩個閘的輸入相同，NAND 閘的輸出是對應 AND 閘的補數。
*   **NOR**。NOR 閘是 OR 閘後跟 NOT 閘的邏輯組合。當我們討論這些閘的實際實作時，也可以解釋其存在的原因。如果兩個閘的輸入相同，NOR 閘的輸出是對應 OR 閘的補數。
*   **XOR**。XOR（互斥或）閘由表達式 $(x . y’ + x’. y)$ 定義，通常表示為 $(x \\oplus y)$。當兩個輸入不同時，此閘的輸出為 1，當輸入相同時為 0。可以說這是一個更受限制的 OR 閘。XOR 閘的輸出與 OR 閘相同，除了如果兩個輸入都是 1，輸出是 0。
*   **XNOR**。XNOR（互斥反或）閘由表達式 $(x . y’ + x’. y)’$ 定義，通常表示為 $(x \\oplus y)’$。它是 XOR 閘的補數。當兩個輸入相同時，此閘的輸出為 1，當輸入不同時為 0。可以說這代表了等價的邏輯概念：只有當兩個輸入相等時，輸出才為 1。

**閘的實作**
上一節討論的邏輯閘可以使用電子開關（電晶體）進行物理實作。最常見的實作只使用三種閘：NOT、NAND 和 NOR。NAND 閘使用的組件比 AND 閘少。NOR 閘*對比* OR 閘也是如此。因此，NAND 和 NOR 閘已成為業界的通用標準。我們只討論這三種實作。雖然我們在這個討論中展示了簡單的開關，但我們需要知道，實際上開關被電晶體取代。電晶體在用於閘中時，行為就像開關。可以透過向輸入施加適當的電壓來打開或關閉開關。有幾種不同的技術用於實作這些電晶體，但我們將此討論留給電子學書籍。

**NOT 閘的實作**
NOT 閘可以使用電子開關、電壓源和電阻器來實作，如圖 E.2 所示。
閘的輸入是一個控制信號，使開關保持打開或關閉。輸入信號為 0 使開關保持打開，而輸入信號為 1 使開關關閉。輸出是開關前一點（輸出端）的電壓。如果此電壓值為正（V 伏特），則輸出解釋為 1：如果電壓為 0（或低於閾值），則輸出解釋為 0。當開關打開時，沒有電流通過電阻器，因此沒有電壓降。輸出電壓為 V（解釋為邏輯 1）。關閉開關將輸出端接地，使其電壓為 0（或幾乎為 0），這解釋為邏輯 0。請注意，電路的行為與表中顯示的值相符。
**要實作 NOT 閘，我們只需要一個電子開關。**

**NAND 閘的實作**
NAND 閘可以使用兩個串聯的開關（兩個輸入）來實作。為了讓電流從正極流向地面通過電路，兩個開關都必須關閉——也就是說，兩個輸入都必須是 1。在這種情況下，輸出端的電壓為零，因為它已接地（邏輯 0）。如果其中一個開關或兩個開關都打開——也就是說，輸入為 00、01 或 10——則沒有電流通過電阻器。因此，電阻器兩端沒有電壓降，輸出端的電壓為 V（邏輯 1）。
圖 E.3 顯示了 NAND 閘的實作。電路的行為與表中顯示的值相符。請注意，如果需要 AND 閘，可以由 NAND 閘後跟 NOT 閘製成。
**要實作 NAND 閘，我們需要兩個串聯連接的電子開關。**

**NOR 閘的實作**
NOR 閘也可以使用兩個並聯的開關（兩個輸入）來實作。如果兩個開關都打開，則電流不流過電阻器。在這種情況下，電阻器兩端沒有電壓降，這意味著輸出端保持電壓 V（邏輯 1）。如果其中一個或兩個開關關閉，則輸出端接地，輸出電壓為零（邏輯 0）。
圖 E.4 顯示了 NOR 閘的實作。電路的行為與表中的值相符。請注意，如果需要 OR 閘，可以使用 NOR 閘後跟 NOT 閘來模擬。
**要實作 NOR 閘，我們需要兩個並聯連接的電子開關。**

### E.1.4 公理、定理與恆等式
為了能夠使用布林代數，我們需要有一些規則。布林代數中的規則分為三大類：公理、定理和恆等式。

**公理 (Axioms)**
布林代數像任何其他代數一樣，使用一些規則，稱為**公理**：它們無法被證明。表 E.1 顯示了布林代數的公理。

**表 E.1 布林代數公理**
| | 與 NOT 相關 | 與 AND 相關 | 與 OR 相關 |
| :--- | :--- | :--- | :--- |
| 1 | $x = 0 \\rightarrow x’ = 1$ | | |
| 2 | $x = 1 \\rightarrow x’ = 0$ | | |
| 3 | | $0 \\cdot 0 = 0$ | $0 + 0 = 0$ |
| 4 | | $1 \\cdot 1 = 1$ | $1 + 1 = 1$ |
| 5 | | $1 \\cdot 0 = 0 \\cdot 1 = 0$ | $1 + 0 = 0 + 1 = 1$ |

**定理 (Theorems)**
定理是我們使用公理證明的規則，儘管我們必須將證明留給布林代數教科書。表 E.2 顯示了布林代數中使用的一些定理。

**表 E.2 布林代數基本定理**
| | 與 NOT 相關 | 與 AND 相關 | 與 OR 相關 |
| :--- | :--- | :--- | :--- |
| 1 | $(x’)’ = x$ | | |
| 2 | | $0 \\cdot x = 0$ | $0 + x = x$ |
| 3 | | $1 \\cdot x = x$ | $1 + x = 1$ |
| 4 | | $x \\cdot x = x$ | $x + x = x$ |
| 5 | | $x \\cdot x’ = 0$ | $x + x’ = 1$ |

**恆等式 (Identities)**
我們還可以使用公理和定理推導出許多恆等式。我們在表 E.3 中僅列出最常見的，儘管我們必須將證明留給布林代數教科書。

**表 E.3 與 OR 和 AND 運算子相關的基本恆等式**
| | 描述 | 與 AND 相關 | 與 OR 相關 |
| :--- | :--- | :--- | :--- |
| 1 | 交換律 | $x \\cdot y = y \\cdot x$ | $x + y = y + x$ |
| 2 | 結合律 | $x \\cdot (y \\cdot z) = (x \\cdot y) \\cdot z$ | $x + (y + z) = (x + y) + z$ |
| 3 | 分配律 | $x \\cdot (y + z) = (x \\cdot y) + (y \\cdot z)$ | $x + (y \\cdot z) = (x + y) \\cdot (x + z)$ |
| 4 | 笛摩根定律 | $(x \\cdot y)’ = x’ + y’$ | $(x + y)’ = x’ \\cdot y’$ |
| 5 | 吸收律 | $x \\cdot (x’ + y) = x \\cdot y$ | $x + (x’ \\cdot y) = x + y$ |

笛摩根定律在邏輯設計中扮演著非常重要的角色，我們稍後將看到。它們可以擴展到多個變數。例如，對於三個變數，我們可以有以下兩個恆等式：
$(x + y + z)’ = x’. y’. z’$        $(x. y. z)’ = x’ + y’ + z’$

### E.1.5 布林函數
我們將**布林函數**定義為具有 $n$ 個布林輸入變數和一個布林輸出變數的函數，如圖 E.5 所示。

函數可以用真值表或表達式表示。函數的真值表有 $2^n$ 行和 $n + 1$ 列，其中前 $n$ 列定義變數的可能值，最後一列定義函數輸出對於前 $n$ 列定義的值組合的值。
圖 E.6 顯示了兩個函數 $F_1$ 和 $F_2$ 的真值表和表達式表示。雖然真值表表示是唯一的，但函數可以用不同的表達式表示。我們為每個函數顯示了兩個表達式。請注意，第二個表達式更短更簡單。稍後我們將展示我們需要簡化表達式以使實作更有效率。

**表到表達式的轉換**
函數的規格通常由真值表給出（見第 4 章）。為了使用邏輯閘實作函數（如前所述），我們需要為真值表找到一個表達式。這可以通過兩種方式完成。

**積之和 (Sum of products)**
將真值表轉換為表達式的第一種方法稱為**積之和**方法。函數的積之和表示法由最多 $2^n$ 個項組成，其中每個項稱為**最小項 (minterm)**。最小項是函數中所有變數的乘積（AND 運算），其中每個變數只出現一次。例如，在三變數函數中，我們可以有八個最小項，如 $x’. y’. z’$ 或 $x. y’. z’$。每個項代表真值表中的一行。如果變數的值為 0，則變數的補數出現在項中：如果變數的值為 1，則變數本身出現在項中。要將真值表轉換為積之和表示法，我們使用以下策略：
1.  找出函數值為 1 的每一行的最小項。
2.  使用步驟 1 中各項的和（OR 運算）。

**和之積 (Product of sums)**
將真值表轉換為表達式的第二種方法稱為**和之積**方法。函數的和之積表示法由最多 $2^n$ 個項組成，其中每個項稱為**最大項 (maxterm)**。最大項是函數中所有變數的和（OR 運算），其中每個變數只出現一次。例如，在三變數函數中，我們可以有八個最大項，如 $x’+ y’+ z’$ 或 $x + y’+ z’$。要將真值表轉換為和之積表示法，我們使用以下策略：
1.  找出函數值為 0 的每一行的最小項。
2.  找出步驟 1 中各項之和的補數。
3.  使用笛摩根定律將最小項更改為最大項。

**範例 E.1**
圖 E.7 顯示了我們如何為圖 E.6 中的函數 F1 和 F2 創建積之和與和之積。

積之和直接由表製成，但和之積需要使用笛摩根定律。請注意，有時第一種方法給出較短的表達式，有時是第二種。

### E.1.6 函數化簡
雖然我們可以使用之前討論的邏輯閘實作布林函數，但通常效率不高。函數的直接實作需要更多的閘。如果我們可以進行化簡，就可以減少閘的數量。傳統上使用兩種化簡方法：使用卡諾圖的代數方法和 Quine-McKluskey 方法。

**代數方法**
我們可以使用之前討論的公理、定理和恆等式來化簡函數。例如，我們可以化簡圖 E.7 中的第一個函數 ($F_1$)，如下所示：
$F_1 = x’ \\cdot y’ + x \\cdot y’ + x \\cdot y$
$= (x’ + x) \\cdot y’ + x \\cdot y$        AND 的恆等式 3（分配律）
$= 1 \\cdot y’ + x \\cdot y$                OR 的定理 5
$= y’ + x \\cdot y$                        AND 的定理 3
$= y’ + y \\cdot x$                        AND 的定理 1（交換律）
$= y’ + x$                            恆等式 5（吸收律）
$= x + y’$                            OR 的定理 1（交換律）

這意味著如果未化簡的版本需要八個閘，化簡後的版本只需要兩個閘，一個 NOT 和一個 OR。

**卡諾圖法**
另一種化簡方法涉及使用**卡諾圖 (Karnaugh map)**。這種方法通常可用於最多四個變數的函數。圖是一個 $2^n$ 個單元格的矩陣，其中每個單元格代表函數的一個值。值得注意的第一點是正確填充圖。與預期相反，圖並不總是按行或按列填充：它是根據地圖上顯示的變數值填充的。圖 E.8 顯示了一個範例，其中 n = 2, 3, 或 4。

在真值表中，我們使用從真值表頂部到底部的函數值。圖是一個接一個填充的，但行的順序是 1, 2, 4, 3。在每一行中，列是一個接一個填充的，但列的順序是 1, 2, 4, 3。第四行在第三行之前：第四列在第三列之前。這種安排是為了允許最大程度的化簡。

**積之和**
可以進行化簡以創建積之和項。當我們以這種方式化簡函數時，我們使用值為 1 的最小項。為了創建一個有效的表達式，我們首先合併相鄰的最小項單元格。請注意，相鄰性也可以包括位元的環繞。

**範例 E.2**
圖 E.9 顯示了我們第一個函數的積之和化簡。第二行中的 1 是整個 x 域。第一列中的 1 是整個 y’ 域。結果化簡後的函數是 $F_1 = (x) + (y’)$。該圖還顯示了使用一個 OR 閘和一個 NOT 閘的實作。

**範例 E.3**
圖 E.10 顯示了我們第二個函數的積之和化簡。第二行中的 1 是 x 和 z 域的交集，表示為 $(x . z)$。第一行中的 1 是 x’ 和 z’ 域的交集，表示為 $(x’. z’)$。結果化簡後的函數是 $F_2 = (x . z) + (x’. z’)$。該圖還顯示了使用一個 OR 閘、兩個 AND 閘和兩個 NOT 閘的實作。

**和之積**
可以使用和之積方法進行化簡。當我們以這種方式化簡函數時，我們需要使用最大項。為了創建一個有效的表達式，我們首先合併相鄰的最小項單元格。然而，以這種方式獲得的函數是我們正在尋找的函數的補數：我們需要使用笛摩根定律來找到我們的函數。

**範例 E.4**
圖 E.11 顯示了我們第一個函數的和之積化簡。請注意，在這種情況下，實作與圖 E.9 完全相同，但並非總是如此。另請注意，我們的函數只有一項：我們不需要 AND 閘。

**範例 E.5**
圖 E.12 顯示了我們第二個函數的和之積化簡。請注意，該過程給了我們 $(F_2)’$，所以我們需要應用笛摩根定律來找到 $F_2$。該圖還顯示了使用兩個 NOT 閘、兩個 OR 閘和一個 AND 閘的實作。這種實作比我們用最小項找到的效率低。我們應該總是使用更有效率的那一個。

## E.2 邏輯電路
電腦通常由我們統稱為**邏輯電路**的標準組件構建而成。邏輯電路分為兩大類，稱為*組合電路*和*循序電路*。我們在此簡要討論每個類別並給出一些範例。

### E.2.1 組合電路
**組合電路**是由具有 $n$ 個輸入和 $m$ 個輸出的邏輯閘組合而成的電路。任何時候的每個輸出完全取決於所有給定的輸入。
**在組合電路中，任何時候的每個輸出完全取決於所有輸入。**
圖 E.13 顯示了具有 $n$ 個輸入和 $m$ 個輸出的組合電路的方塊圖。比較圖 E.13 和圖 E.5，我們可以說具有 $m$ 個輸出的組合電路可以被認為是 $m$ 個函數，每個輸出一個函數。
組合電路的輸出通常由真值表定義。然而，真值表需要有 $m$ 個輸出。

**半加器 (Half adder)**
組合電路的一個簡單例子是**半加器**，一種只能加兩個位元的加法器。半加器是具有兩個輸入和兩個輸出的組合電路。兩個輸入定義要相加的兩個位元。第一個輸出是兩個位元的和，而第二個輸出是需要傳播到下一個加法器的進位位元。圖 E.14 顯示了半加器及其真值表和用於製作電路的邏輯閘。
兩個位元的和可以使用 XOR 閘實現：進位可以使用 AND 閘實現。

**多工器 (Multiplexer)**
**多工器**是具有 $n$ 個輸入和只有一個輸出的組合電路。$n$ 個輸入由 $D$ 個資料輸入和 $C$ 個控制輸入組成 ($n = D + C$)。在任何時候，多工器將其 $D$ 個資料輸入之一路由到其單個資料輸出。選擇基於控制位元的值。要選擇 $D$ 個資料輸入之一，我們需要 $C = \\log_2 D$ 個控制位元。如果 $D = 2$，則任何時候只有一個資料輸入被路由到輸出。控制輸入只有一個位元。如果控制輸入為 0，則第一個資料輸入被引導到輸出：如果控制輸入為 1，則第二個輸入被路由到輸出。
圖 E.15 顯示了 2 x 1 多工器的真值表和電路。請注意，電路實際上具有三個輸入和一個輸出：控制輸入被視為輸入之一。
請注意，這裡的真值表非常簡化：輸出僅取決於控制輸入，但輸出的值是兩個資料輸入之一。

### E.2.2 循序電路
組合電路是無記憶的：它不記得之前的輸出。任何時刻的輸出取決於當前的輸入。另一方面，**循序電路**在邏輯中包含了記憶的概念。記憶使電路能夠記住其當前狀態以供將來使用；未來狀態可以依賴於當前狀態。

**正反器 (Flip-flops)**
為了將記憶的概念添加到組合電路中，發明了一種稱為**正反器**的儲存元件，它可以保存一位元的資訊。一組正反器可用於保存一組位元。

**SR 正反器**
最簡單類型的正反器稱為 **SR 正反器**，其中有兩個輸入 S (set) 和 R (reset) 以及兩個輸出 Q 和 Q’，它們始終互為補數。圖 E.16 顯示了 SR 正反器的符號、電路和特性表。請注意，特性表不同於我們用於組合電路的真值表。特性表根據當前輸出 Q ($t$) 和輸入顯示下一個輸出 Q ($t + 1$)。
特性表顯示，如果 S 和 R 都為零，則 Q ($t + 1$) = Q ($t$)。下一個輸出將與當前輸出相同。如果 S 為 0 且 R 為 1，則 Q ($t + 1$) = 0，這意味著輸出將被重置 (R = 1)。如果 S 為 1 且 R 為 0，則 Q ($t + 1$) = 1，這意味著輸出將被設定。然而，如果 S 和 R 都是 1，則下一個輸出是不可預測的（未定義）。請注意，我們沒有在特性表中顯示 Q’ 的值，因為它總是 Q 的補數。
SR 正反器可用作設定-重置裝置。例如，如果輸出連接到電子發聲器，可以透過讓 R = 0 和 S = 1 來設定警報。設定後，警報繼續響起，直到透過設定 R = 1 和 S = 0 來重置。此設計的唯一缺陷是 R 和 S 不應同時為 1。
要了解 SR 正反器的行為，我們需要創建其真值表。然而，請注意，我們現在有三個輸入和一個輸出（Q 和 Q’ 是獨立的）。表 E.4 顯示了此正反器的真值表。

**表 E.4 SR 正反器的真值表**
| S | R | Q (t) | Q (t + 1) |
| :--- | :--- | :--- | :--- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | undefined |
| 1 | 1 | 1 | undefined |

**D 正反器**
SR 正反器不能用作 1 位元記憶體，因為它需要兩個輸入而不是一個。對 SR 正反器稍加修改可以創建一個 **D 正反器**（D 代表資料）。圖 E.17 顯示了 D 正反器的符號和特性。
請注意，D 正反器的輸出與其輸入相同。然而，輸出保持原樣，直到給出新的輸入。這意味著它記住了其輸入狀態。

**JK 正反器**
為了消除 SR 正反器的未定義狀態，發明了 **JK 正反器**（JK 代表 Jack Kilby，他發明了積體電路）。在 SR 正反器中添加兩個 AND 閘創建了一個沒有未定義狀態的 JK 正反器。圖 E.18 顯示了 JK 正反器及其特性表。

**T 正反器**
另一種常見類型的正反器是 **T 正反器**（T 代表 *toggle*，切換）。此正反器可以透過將 JK 正反器的兩個輸入連接在一起並稱為 T 輸入來製作。此輸入切換正反器的狀態：如果輸入為 0，則下一個狀態與當前狀態相同。如果輸入為 1，則下一個狀態是當前狀態的補數。圖 E.19 顯示了 T 正反器的符號、電路和特性表。

**同步與非同步**
我們到目前為止討論的正反器都被稱為**非同步裝置**：只有當輸入發生變化時，才會發生從一個狀態到另一個狀態的轉換。
另一方面，數位電腦是**同步裝置**。電腦中的中央時鐘控制所有邏輯電路的時序。時鐘產生一個信號——一系列具有精確脈衝寬度的脈衝——協調所有事件。簡單事件僅在此時鐘信號的「滴答」處發生。
圖 E.20 顯示了時鐘信號的抽象概念。我們稱之為*抽象*，因為實際上沒有電子電路可以產生具有完美尖銳脈衝的信號，但這裡顯示的信號足以供我們討論。

如果我們向電路添加一個輸入：時鐘輸入，正反器可以是同步的。時鐘輸入可以與每個輸入進行 AND 運算以控制輸入，使其僅在時鐘脈衝存在時才有效。圖 E.21 顯示了我們討論的所有四種正反器類型的時鐘版本符號。圖 E.22 顯示了帶有時鐘信號的 SR 正反器電路。其他正反器具有相同的附加電路。

**暫存器 (Register)**
作為同步（時鐘）循序電路的第一個應用，我們將介紹**暫存器**的簡化版本。暫存器是一個 $n$ 位元儲存設備，在連續的時鐘脈衝之間儲存其資料。在時鐘觸發時，舊資料被丟棄並被新資料取代。
圖 E.23 顯示了一個 4 位元暫存器，其中每個單元由一個 D 正反器組成。請注意，時鐘輸入對於所有單元都是通用的。我們旋轉了之前的符號以使連接更簡單。

**數位計數器 (Digital counter)**
$n$ 位元**數位計數器**從 0 計數到 $2^n - 1$。例如，當 $n = 4$ 時，計數器的輸出為 0000, 0001, 0010, 0011, …, 1111，因此它從 0 計數到 15。$n$ 位元計數器可以由 $n$ 個 T 正反器製成。開始時，計數器代表 0000。計數啟用線——見圖 E.24——攜帶一系列 1：要計數的資料（脈衝）。觀察事件序列，我們可以看到最右邊的位元隨著計數啟用連接的每次正轉換而補數，模擬資料項目的到達。當最右邊的位元從 1 變為 0 時，下一個最左邊的位元補數。對所有位元重複該過程。這個觀察給了我們使用 T 正反器的線索。此正反器的特性表顯示，每個值為 1 的輸入都會使輸出補數。請注意，此計數器只能計數到 15 或 $(1111)_2$。第十六個資料項目的到達將計數器重置回 $(0000)_2$。圖 E.24 顯示了 4 位元計數器的電路。
`,
};
