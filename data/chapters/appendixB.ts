
export const appendixBContent = {
  en: `
# Appendix B: Unified Modeling Language (UML)

Unified Modeling Language (UML) is a graphical language used for analysis and design of software systems. UML provides different levels of abstraction, called views.

## The Four Views of UML
1.  **User View**: Shows the interaction of the user with the system, represented by **use-case diagrams**.
2.  **Structural View**: Shows the static structure of the system, represented by **class diagrams**.
3.  **Behavioral View**: Shows how objects in the system behave, represented by **collaboration, sequence, state, and activity diagrams**.
4.  **Implementation View**: Shows how the system is implemented, using **component and deployment diagrams**.

## B.1 User View: Use-Case Diagrams
A use-case diagram shows how users (**actors**) interact with the system through different **use cases** (actions).

## B.2 Structural View: Class Diagrams
A class diagram shows the system's classes, their **attributes** (data), **methods** (operations), and the static relationships between them, such as **association** and **generalization** (inheritance).

## B.3 Behavioral View
- **Collaboration Diagrams**: Show interactions between objects (instances of classes).
- **State Diagrams**: Show the changes in the state of a single object in response to events.
- **Sequence Diagrams**: Show the interaction between objects over time, emphasizing the sequence of messages.
- **Activity Diagrams**: Show the flow of control from one activity to another, useful for modeling workflows.

## B.4 Implementation View
- **Component Diagrams**: Show the software components and the dependencies among them.
- **Deployment Diagrams**: Show the physical deployment of software components on hardware nodes.
`,
  zh: `
# 附錄 B：統一塑模語言 (UML)

統一塑模語言 (UML) 是一種用於分析和設計軟體系統的圖形化語言。UML 提供了不同層級的抽象，稱為視圖。

## UML 的四個視圖
1.  **使用者視圖 (User View)**：顯示使用者與系統的互動，由**使用案例圖 (use-case diagrams)** 表示。
2.  **結構視圖 (Structural View)**：顯示系統的靜態結構，由**類別圖 (class diagrams)** 表示。
3.  **行為視圖 (Behavioral View)**：顯示系統中物件的行為方式，由**協作圖、循序圖、狀態圖和活動圖**表示。
4.  **實作視圖 (Implementation View)**：顯示系統的實作方式，使用**組件圖和部署圖**。

## B.1 使用者視圖：使用案例圖
使用案例圖顯示使用者（**參與者 (actors)**）如何透過不同的**使用案例 (use cases)**（動作）與系統互動。

## B.2 結構視圖：類別圖
類別圖顯示系統的類別、它們的**屬性 (attributes)**（資料）、**方法 (methods)**（操作）以及它們之間的靜態關係，例如**關聯 (association)** 和**泛化 (generalization)**（繼承）。

## B.3 行為視圖
- **協作圖 (Collaboration Diagrams)**：顯示物件（類別的實例）之間的互動。
- **狀態圖 (State Diagrams)**：顯示單一物件因應事件而發生的狀態變化。
- **循序圖 (Sequence Diagrams)**：顯示物件之間隨時間的互動，強調訊息的順序。
- **活動圖 (Activity Diagrams)**：顯示從一個活動到另一個活動的控制流程，可用於模擬工作流程。

## B.4 實作視圖
- **組件圖 (Component Diagrams)**：顯示軟體組件及其間的依賴關係。
- **部署圖 (Deployment Diagrams)**：顯示軟體組件在硬體節點上的實體部署。
`,
};
