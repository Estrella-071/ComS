
export const appendixBContent = {
  en: `
# Appendix B: Unified Modeling Language (UML)

**Unified Modeling Language (UML)** is a graphical language used for analysis and design. Through UML we can specify, visualize, construct, and document software and hardware systems using standard graphical notations. UML provides different levels of abstraction, called **views**, as shown in Figure B.1.

As shown in Figure B.1 the four views are:
1.  The **user view**, which shows the interaction of the user with the system. This view is represented by use-case diagrams.
2.  The **structural view**, which shows the static structure of the system. This view is represented by class diagrams.
3.  The **behavioral view**, which shows how the objects in the system behave. This view is represented by collaboration, sequence, state, and activity diagrams.
4.  The **implementation view**, which shows how the system is implemented. It contains component and deployment diagrams.

## B.1 THE USER VIEW
The user view is a high level view of the whole system. It shows how a system is organized in general. There is only one type of diagram in user views, the use-case diagram.

### B.1.1 Use-case diagrams
A project normally starts with a use-case diagram. A **use-case diagram** gives the user’s view of a system: it shows how the users communicate with the system. Figure B.2 shows an example of a use-case diagram. A use-case diagram uses four main components: **system**, **use cases**, **actors**, and **relationships**. Each component is explained below.

**System**
A system performs a function. We are interested only in a computer system. The computer system in a use-case diagram is shown by a rectangular box with the name of the system outside the box in the top-left corner.

**Use cases**
A system contains many actions represented as use cases. Each use case defines one of the actions that can be taken by the users of a system. A use case in a use-case diagram is shown by a rectangle with rounded corners.

**Actors**
An actor is someone or something that uses the system. Although actors are shown as stick figures, they do not necessarily represent human beings.

**Relationships**
Relationships are associations between actors and use cases. A relationship is shown as a line connecting actors to use cases. An actor can relate to multiple use cases and a use case can be used by multiple actors.

## B.2 THE STRUCTURAL VIEW
The structural view shows the static nature of the system, classes and their relationships. The structural view uses only one type of diagram, class diagrams.

### B.2.1 Class diagrams
A **class diagram** manifests the static structure of a system. It shows the characteristics of the classes and the relationship between them. The symbol for a class is a rectangle with the name of the class written inside. Figure B.3 shows three classes, Person, Fraction, and Elevator, belonging to three different systems—that is, there is no relationship between them.

Class diagrams are extended by adding attributes, types, and methods to the diagram. Relationships between classes are shown with association and generalization diagrams.

**Attributes and types**
A class symbol can include attributes and types in a separate compartment. An attribute is a property of a class and a type is the type of data used to represent that attribute. Figure B.4 shows some attributes of the classes Person and Fraction.

**Methods**
A class can also be extended to include methods. A method is a procedure that can be used by an object (an instance of a class) or applied to an object. In other words, an object is either a doer or a receiver. Figure B.5 shows two classes with attributes and methods. The attributes and methods are listed in separate compartments.

**Association**
An association is a conceptual relation between two classes. An association is shown by a solid line between two classes. If a name is given to the association, it is written next to the line with a solid arrow.
An association can be one-to-one, one-to-many, many-to-one or many-to-many. Figure B.6 shows four classes and some associations between them. It shows that one professor (an object of the Professor class) can teach from one to five courses (1…5). Conversely, in this example, a course can have only one professor. The university (an object of the University class) can have many professors and many students (objects of the Student class), as indicated by the asterisk (*) on the association line. The figure also shows that a student can take many courses.

**Generalization**
Generalization organizes classes based on their similarities and differences. Generalization allows us to define **subclasses** and **superclasses**. A subclass inherits characteristics (attributes and methods) of all its superclasses, but it normally has some characteristics (attributes and methods) of its own. Figure B.7 shows single and multiple inheritance.

## B.3 THE BEHAVIORAL VIEW
A behavioral view looks at the behavior of objects in a system. Depending on the type of the behavior, we can have four different diagrams: collaboration diagrams, state diagrams, sequence diagrams, and activity diagrams.

### B.3.1 Collaboration diagrams
A collaboration diagram is similar to a class diagram. The difference is that the class diagram shows the relationship between classes, whereas a collaboration diagram shows the relationship between objects (instances of classes).
Any object instantiated from the class can also be shown in a rectangle with the name of the object followed by a colon and the name of the class. For an anonymous object, the name of the object is left out. Figure B.8 shows three objects instantiated from the class Person.

**Attributes and values**
An attribute is a property of a class, while a value is a property of an object corresponding to an attribute. An object symbol can include values. Figure B.9 shows some attributes of the classes Person and Fraction with values for attributes within the classes.

**Methods and operations**
Although an object symbol can also include methods and operations, it is not common in a collaboration diagram.

**Links**
A link in a collaboration diagram is an instance of an association in a class diagram. Objects can be related to each other using links. Two stereotype notations can be used for links: local and parameter. The first shows that one object uses another object as a local variable: the second shows that one object uses another object as a parameter. Multiplicity, as shown in the association between Student and Course in Figure B.6, can also be shown by multiple superimposed objects. Multiplicity can also be shown between objects of the same class. Figure B.10 shows that a Student’s object uses multiple Course objects as parameters.

**Messages**
An object can send a message to another object. A message can represent an event sent from the first object to the second. A message can also invoke a method in the second object. Finally, an object can create or destroy another object using a message. Messages are shown by an arrow pointing in the direction of the message and are shown over the link between objects. Figure B.11 shows how an Editor object sends a print message to a Printer object.

### B.3.2 State diagrams
A state diagram is used to show changes in the states of a single object. An object may change its state in response to an event. For example, a switch may change its state from **off** to **on** when it is turned on. A washing machine may change its state from **wash** to **rinse** in response to triggers from a timer.

**Symbols**
A state diagram uses three main symbols, as shown in Figure B.12.

**States**
There are three symbols for states: the start state, the stop state, and the intermediate state. The start state, which is drawn as a black circle with its name next to the circle, is allowed only once in the diagram. The stop state, which is drawn as a solid black circle inside another circle, can be repeated in the diagram. The intermediate state is drawn as a rectangle with rounded corners with the name of the state inside the rectangle.

**Transitions**
In a state diagram, a transition is a movement between states. The transition symbol is an arrowed line between two states. The arrow shows the next state. One or more transitions can leave a state: only one transition can arrive at a state.

**Decision point**
A decision point is shown by a diamond. A transition can take several paths based on data or conditions in the object.

**Events**
In a state diagram, an object is triggered by an event, which can be external or internal. For example, a switch may move from an **off** state to an **on** state if it is turned on. An event is represented by a string which defines the operation in the class that handles the event. It may have parentheses containing the formal parameters to be passed to the operation. An event can also have a condition enclosed in brackets. The following shows an example of an event:
\`withdraw (amount) [amount < balance]\`
An object may or may not move to another state when triggered by an event.

**Actions**
Although an action may be triggered in several ways, we only mention an action triggered by an event. An action is shown by a string, which normally defines another object and the event that should be invoked for that object. If parameters are needed for the target object they are included in parentheses. The action is separated from the event by using a forward slash. The following shows an example of an action:
\`deposit (amount) / add (balance)\`

**Example B.1**
Figure B.13 shows a simple example of a state diagram. There are six states—a start and a stop state and four intermediate states—nine events, and four actions.

### B.3.3 Sequence diagrams
A sequence diagram shows the interaction between objects (or actors) over time. In a sequence diagram, objects (or actors) are listed as columns, and time, which flows notionally downwards, is represented as a vertical broken line.

**Symbols**
A sequence diagram uses five main symbols, as shown in Figure B.14.

**Actor**
The symbol for an actor is the same stick figure as we saw in use-case diagrams. Since actors can also communicate with objects, they can be part of a sequence diagram.

**Object**
Objects, as we saw before, are instances of classes. A sequence diagram represents the interaction between the objects.

**Lifeline**
A lifeline, shown by a solid or dashed vertical line, represents an individual participant in a sequence diagram. It is usually headed by a rectangle that contains the name of the object or actor. The vertical line, which represents the lifespan of the object, extends to the point where the object is no longer active.

**Activation**
Activation, represented by a solid narrow rectangle, shows the time when the object is involved in an activity, that is, when it is not idle. For example, if an object has sent a message to another object and is waiting for a response, the object is involved during this time.

**Message**
Messages are shown as horizontal arrowed lines showing the interaction between objects (or actors).

**Example B.2**
Figure B.15 shows a simple example of a sequence diagram with one actor and three anonymous objects. The diagram also shows concurrency: the first object, after receiving the first message, concurrently sends two messages: one to the actor and one to the second object.

### B.3.4 Activity diagrams
An activity diagram shows the break-down of a complex operation or a process into a set of simpler operations or processes. An activity diagram is more detailed than a sequence diagram. A sequence diagram emphasizes objects, while an activity diagram shows more detailed operations performed by one or more objects. An activity diagram in object-oriented programming replaces a traditional flowchart in procedural programming. However, a traditional flowchart shows only sequential flow control (serial), while an activity diagram can show both sequential and concurrent (parallel) flow control.

**Symbols**
An activity diagram uses six main symbols, as shown in Figure B.16.

**Activities**
An activity is a step in an activity diagram. We show an activity using a rectangle with rounded corners that contains the name of the activity. The level of detail in an activity should be consistent for the whole diagram. If more detail is needed for one of the activities, a new diagram should be drawn to show it.

**Transitions**
Similar to a state diagram, a transition in an activity diagram is shown by an arrowed line. The arrow shows the direction of the action.

**Start and end points**
The start point in an activity diagram is a solid circle with a single outgoing transition: the stop point is a solid circle surrounded by a hollow circle (bull’s eye) with a single incoming transition. There can be only one start point. While logically there can be only one end point, multiple end points are allowed to make the diagram easier to read.

**Decision and merge**
A diamond shows a decision or a merge point. A transition can take several paths based on conditions. When used as a decision point, a diamond symbol can have only one entry, with two or more exits. When used as a merge point, a diamond symbol can have two or more entries but only one exit.

**Fork or joint**
A thick line shows a fork or join in parallel processing. A fork symbol shows the start of two or more threads of processes: a joint symbol shows the end of the threads.

**Example B.3**
Figure B.17 shows an example of an activity diagram. Activities 2 and 3 are done concurrently (parallel processing).

### B.3.5 Swimlanes
Sometimes operations in an activity diagram are performed by different objects or actors. To show that more than one object or actor is involved, **swimlanes** are added to an activity diagram, as shown in Figure B.18.

## B.4 THE IMPLEMENTATION VIEW
An implementation view shows how the final product is implemented. Two types of diagrams are used to show the implementations: component diagrams and deployment diagrams.

### B.4.1 Component diagrams
A component diagram shows the software components and the dependencies among them. The components are shown as rectangles with two small rectangles on their left edges. A dependency between the components is shown by a dashed line with an arrow on the end. We can also use stereotyping on the dependency line by including such stereotype relations such as <<report>>. Figure B.19 shows a component diagram.

### B.4.2 Deployment diagrams
A deployment diagram shows nodes connected by communication links. A node is shown as a cuboid and the communication association (link) is shown as a line connecting two nodes. A node can also include one or more components. Figure B.20 shows a simple deployment diagram.
`,
  zh: `
# 附錄 B：統一塑模語言 (UML)

**統一塑模語言 (UML)** 是一種用於分析和設計的圖形化語言。透過 UML，我們可以使用標準的圖形符號來指定、視覺化、建構和記錄軟體和硬體系統。UML 提供了不同層級的抽象，稱為**視圖**，如圖 B.1 所示。

如圖 B.1 所示，四個視圖是：
1.  **使用者視圖**，顯示使用者與系統的互動。此視圖由使用案例圖表示。
2.  **結構視圖**，顯示系統的靜態結構。此視圖由類別圖表示。
3.  **行為視圖**，顯示系統中物件的行為方式。此視圖由協作圖、循序圖、狀態圖和活動圖表示。
4.  **實作視圖**，顯示系統的實作方式。它包含組件圖和部署圖。

## B.1 使用者視圖
使用者視圖是整個系統的高階視圖。它顯示了系統的一般組織方式。使用者視圖中只有一種類型的圖，即使用案例圖。

### B.1.1 使用案例圖 (Use-case diagrams)
專案通常以使用案例圖開始。**使用案例圖**給出了系統的使用者視圖：它顯示了使用者如何與系統通訊。圖 B.2 顯示了一個使用案例圖的範例。使用案例圖使用四個主要組件：**系統**、**使用案例**、**參與者**和**關係**。每個組件解釋如下。

**系統**
系統執行功能。我們只對電腦系統感興趣。使用案例圖中的電腦系統由一個矩形框表示，系統名稱在框外的左上角。

**使用案例**
系統包含許多表示為使用案例的動作。每個使用案例定義了系統使用者可以採取的動作之一。使用案例圖中的使用案例由圓角矩形顯示。

**參與者 (Actors)**
參與者是使用系統的人或事物。雖然參與者顯示為火柴人，但它們不一定代表人類。

**關係**
關係是參與者與使用案例之間的關聯。關係顯示為連接參與者與使用案例的線。一個參與者可以與多個使用案例相關聯，一個使用案例也可以被多個參與者使用。

## B.2 結構視圖
結構視圖顯示系統、類別及其關係的靜態性質。結構視圖僅使用一種類型的圖，即類別圖。

### B.2.1 類別圖 (Class diagrams)
**類別圖**展示了系統的靜態結構。它顯示了類別的特徵以及它們之間的關係。類別的符號是一個矩形，裡面寫著類別的名稱。圖 B.3 顯示了三個類別：Person、Fraction 和 Elevator，屬於三個不同的系統——也就是說，它們之間沒有關係。

透過向圖中添加屬性、類型和方法來擴展類別圖。類別之間的關係用關聯圖和泛化圖表示。

**屬性和類型**
類別符號可以在單獨的區間中包含屬性和類型。屬性是類別的性質，類型是用於表示該屬性的資料類型。圖 B.4 顯示了類別 Person 和 Fraction 的一些屬性。

**方法**
類別也可以擴展以包含方法。方法是一個可以由物件（類別的實例）使用或應用於物件的程序。換句話說，物件要麼是執行者，要麼是接收者。圖 B.5 顯示了兩個具有屬性和方法的類別。屬性和方法列在單獨的區間中。

**關聯 (Association)**
關聯是兩個類別之間的概念關係。關聯由兩個類別之間的實線顯示。如果給關聯一個名稱，它會寫在帶有實心箭頭的線旁邊。
關聯可以是一對一、一對多、多對一或多對多。圖 B.6 顯示了四個類別以及它們之間的一些關聯。它顯示一位教授（Professor 類別的物件）可以教授一到五門課程 (1…5)。相反，在這個例子中，一門課程只能有一位教授。大學（University 類別的物件）可以有許多教授和許多學生（Student 類別的物件），如關聯線上的星號 (*) 所示。該圖還顯示一名學生可以選修多門課程。

**泛化 (Generalization)**
泛化根據類別的相似性和差異性來組織類別。泛化允許我們定義**子類別**和**超類別**。子類別繼承其所有超類別的特徵（屬性和方法），但它通常具有一些自己的特徵（屬性和方法）。圖 B.7 顯示了單一繼承和多重繼承。

## B.3 行為視圖
行為視圖查看系統中物件的行為。根據行為的類型，我們可以有四種不同的圖：協作圖、狀態圖、循序圖和活動圖。

### B.3.1 協作圖 (Collaboration diagrams)
協作圖類似於類別圖。不同之處在於類別圖顯示類別之間的關係，而協作圖顯示物件（類別的實例）之間的關係。
從類別實例化的任何物件也可以顯示在一個矩形中，物件名稱後面跟著冒號和類別名稱。對於匿名物件，省略物件名稱。圖 B.8 顯示了從類別 Person 實例化的三個物件。

**屬性和值**
屬性是類別的性質，而值是物件對應於屬性的性質。物件符號可以包含值。圖 B.9 顯示了類別 Person 和 Fraction 的一些屬性以及類別內屬性的值。

**方法和操作**
雖然物件符號也可以包含方法和操作，但在協作圖中並不常見。

**連結 (Links)**
協作圖中的連結是類別圖中關聯的實例。物件可以使用連結相互關聯。連結可以使用兩種構造型符號：區域和參數。第一種顯示一個物件使用另一個物件作為區域變數：第二種顯示一個物件使用另一個物件作為參數。如圖 B.6 中 Student 和 Course 之間的關聯所示的多重性，也可以通過多個重疊物件來顯示。多重性也可以在同一類別的物件之間顯示。圖 B.10 顯示了一個 Student 物件使用多個 Course 物件作為參數。

**訊息**
一個物件可以向另一個物件發送訊息。訊息可以代表從第一個物件發送到第二個物件的事件。訊息也可以調用第二個物件中的方法。最後，一個物件可以使用訊息創建或銷毀另一個物件。訊息由指向訊息方向的箭頭顯示，並顯示在物件之間的連結上方。圖 B.11 顯示了 Editor 物件如何向 Printer 物件發送列印訊息。

### B.3.2 狀態圖 (State diagrams)
狀態圖用於顯示單一物件狀態的變化。物件可能會因應事件而改變其狀態。例如，開關在打開時可能會從**關**狀態變為**開**狀態。洗衣機可能會因應計時器的觸發而從**洗滌**狀態變為**漂洗**狀態。

**符號**
狀態圖使用三個主要符號，如圖 B.12 所示。

**狀態**
狀態有三種符號：開始狀態、停止狀態和中間狀態。開始狀態繪製為黑色圓圈，名稱在圓圈旁邊，在圖中僅允許出現一次。停止狀態繪製為另一個圓圈內的實心黑色圓圈，可以在圖中重複出現。中間狀態繪製為圓角矩形，狀態名稱在矩形內。

**轉換**
在狀態圖中，轉換是狀態之間的移動。轉換符號是兩個狀態之間的箭頭線。箭頭顯示下一個狀態。一個或多個轉換可以離開一個狀態：只有一個轉換可以到達一個狀態。

**決策點**
決策點由菱形顯示。轉換可以根據物件中的資料或條件採取多條路徑。

**事件**
在狀態圖中，物件由事件觸發，事件可以是外部的或內部的。例如，開關如果被打開，可能會從**關**狀態移動到**開**狀態。事件由定義處理該事件的類別中操作的字串表示。它可能有包含要傳遞給操作的形式參數的括號。事件也可以有括在括號中的條件。以下顯示了一個事件的範例：
\`withdraw (amount) [amount < balance]\`
當被事件觸發時，物件可能會或可能不會移動到另一個狀態。

**動作**
雖然動作可以透過多種方式觸發，但我們只提及由事件觸發的動作。動作由一個字串顯示，該字串通常定義另一個物件以及應該為該物件調用的事件。如果目標物件需要參數，它們包含在括號中。動作使用正斜線與事件分隔。以下顯示了一個動作的範例：
\`deposit (amount) / add (balance)\`

**範例 B.1**
圖 B.13 顯示了一個簡單的狀態圖範例。有六個狀態——一個開始和一個停止狀態以及四個中間狀態——九個事件和四個動作。

### B.3.3 循序圖 (Sequence diagrams)
循序圖顯示物件（或參與者）之間隨時間的互動。在循序圖中，物件（或參與者）列為列，時間概念上向下流動，由垂直虛線表示。

**符號**
循序圖使用五個主要符號，如圖 B.14 所示。

**參與者**
參與者的符號與我們在使用案例圖中看到的火柴人相同。由於參與者也可以與物件通訊，因此它們可以是循序圖的一部分。

**物件**
如前所述，物件是類別的實例。循序圖表示物件之間的互動。

**生命線**
生命線由實線或虛線垂直線顯示，代表循序圖中的單個參與者。它通常以包含物件或參與者名稱的矩形為首。垂直線代表物件的壽命，延伸到物件不再活躍的點。

**活化 (Activation)**
活化由實心窄矩形表示，顯示物件參與活動的時間，即它不閒置的時間。例如，如果一個物件向另一個物件發送了訊息並正在等待回應，則該物件在此期間參與其中。

**訊息**
訊息顯示為水平箭頭線，顯示物件（或參與者）之間的互動。

**範例 B.2**
圖 B.15 顯示了一個簡單的循序圖範例，其中包含一個參與者和三個匿名物件。該圖還顯示了並行性：第一個物件在收到第一條訊息後，同時發送兩條訊息：一條給參與者，一條給第二個物件。

### B.3.4 活動圖 (Activity diagrams)
活動圖顯示將複雜操作或過程分解為一組更簡單的操作或過程。活動圖比循序圖更詳細。循序圖強調物件，而活動圖顯示由一個或多個物件執行的更詳細操作。物件導向程式設計中的活動圖取代了程序導向程式設計中的傳統流程圖。然而，傳統流程圖僅顯示循序流控制（串列），而活動圖可以顯示循序和並行（平行）流控制。

**符號**
活動圖使用六個主要符號，如圖 B.16 所示。

**活動**
活動是活動圖中的一個步驟。我們使用包含活動名稱的圓角矩形顯示活動。活動的詳細程度應在整個圖中保持一致。如果其中一個活動需要更多細節，應繪製新圖來顯示它。

**轉換**
與狀態圖類似，活動圖中的轉換由箭頭線顯示。箭頭顯示動作的方向。

**開始和結束點**
活動圖中的開始點是一個帶有單個外向轉換的實心圓：停止點是一個被空心圓（靶心）包圍的實心圓，帶有單個傳入轉換。只能有一個開始點。雖然邏輯上只能有一個結束點，但允許有多個結束點以使圖表更容易閱讀。

**決策和合併**
菱形顯示決策或合併點。轉換可以根據條件採取多條路徑。當用作決策點時，菱形符號只能有一個入口，有兩個或多個出口。當用作合併點時，菱形符號可以有兩個或多個入口但只有一個出口。

**分叉或匯合**
粗線顯示平行處理中的分叉或匯合。分叉符號顯示兩個或多個執行緒的開始：匯合符號顯示執行緒的結束。

**範例 B.3**
圖 B.17 顯示了一個活動圖的範例。活動 2 和 3 是並行完成的（平行處理）。

### B.3.5 泳道 (Swimlanes)
有時活動圖中的操作由不同的物件或參與者執行。為了顯示涉及多個物件或參與者，將**泳道**添加到活動圖中，如圖 B.18 所示。

## B.4 實作視圖
實作視圖顯示最終產品是如何實作的。使用兩種類型的圖來顯示實作：組件圖和部署圖。

### B.4.1 組件圖 (Component diagrams)
組件圖顯示軟體組件及其間的依賴關係。組件顯示為左邊緣有兩個小矩形的矩形。組件之間的依賴關係由末端帶箭頭的虛線顯示。我們還可以在依賴線上使用構造型，包括諸如 <<report>> 之類的構造型關係。圖 B.19 顯示了一個組件圖。

### B.4.2 部署圖 (Deployment diagrams)
部署圖顯示透過通訊連結連接的節點。節點顯示為長方體，通訊關聯（連結）顯示為連接兩個節點的線。一個節點還可以包含一個或多個組件。圖 B.20 顯示了一個簡單的部署圖。
`,
};
