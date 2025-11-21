

export const chapter18Content = {
  en: `
# Chapter 18: Artificial Intelligence

In this chapter of the book, we offer an introduction to **artificial intelligence (AI)**. The first section is a brief history and an attempt to define artificial intelligence. **Knowledge representation**, a broad and well-developed area in AI, is discussed in the next section. We then introduce **expert systems**, systems that can replace human expertise when it is needed but not available. We then discuss how artificial intelligence can be used to simulate the normal (mundane) behavior of human beings in two areas: **image processing** and **language analysis**. We then show how expert systems and mundane systems can solve problems using different searching method. Finally, we discuss how **neural networks** can simulate the process of learning in an intelligent agent.

## Objectives
After studying this chapter, the student should be able to:
- Define and give a brief history of artificial intelligence.
- Describe how knowledge is represented in an intelligent agent.
- Show how expert systems can be used when a human expert is not available.
- Show how an artificial agent can be used to simulate mundane tasks performed by human beings.
- Show how expert systems and mundane systems can use different search techniques to solve problems.
- Show how the learning process in humans can be simulated, to some extent, using neural networks that create the electronic version of a neuron called a perceptron.

## 18.1 INTRODUCTION
In this section we first try to define the term **artificial intelligence (AI)** informally and give a brief history of it. We also define an **intelligent agent** and its two broad categories. Finally, we mention two programming languages that are commonly used in artificial intelligence.

### 18.1.1 What is artificial intelligence?
Although there is no universally agreed definition of artificial intelligence, we accept the following definition that matches the topics covered in this chapter:

**Artificial intelligence is the study of programmed systems that can simulate, to some extent, human activities such as perceiving, thinking, learning, and acting.**

### 18.1.2 A brief history of artificial intelligence
Although artificial intelligence as an independent field of study is relatively new, it has some roots in the past. We can say that it started 2400 years ago when the Greek philosopher Aristotle invented the concept of logical reasoning. The effort to finalize the language of logic continued with Leibniz and Newton. George Boole developed Boolean algebra in the nineteenth century (Appendix E) that laid the foundation of computer circuits. However, the main idea of a thinking machine came from Alan Turing, who proposed the Turing test. The term ‘artificial intelligence’ was first coined by John McCarthy in 1956.

### 18.1.3 The Turing test
In 1950, Alan Turing proposed the **Turing Test**, which provides a definition of *intelligence* in a machine. The test simply compares the intelligent behavior of a human being with that of a computer. An interrogator asks a set of questions that are forwarded to both a computer and a human being. The interrogator receives two sets of responses, but does not know which set comes from the human and which set from the computer. After careful examination of the two sets, if the interrogator cannot definitely tell which set has come from the computer and which from the human, the computer has passed the Turing test for intelligent behavior.

### 18.1.4 Intelligent agents
An **intelligent agent** is a system that perceives its environment, learns from it, and interacts with it intelligently. Intelligent agents can be divided into two broad categories: *software agents* and *physical agents*.

**Software agents**
A **software agent** is a set of programs that are designed to do particular tasks. For example, some intelligent systems can be used to organize electronic mail (email). This type of agent can check the contents of received emails and classify them into different categories (junk, less important, important, very important, and so on). Another example of software agents is a search engine used to search the World Wide Web and find sites that can provide information about a requested subject.

**Physical agents**
A **physical agent (robot)** is a programmable system that can be used to perform a variety of tasks. Simple robots can be used in manufacturing to do routine jobs such as assembling, welding, or painting. Some organizations use mobile robots that do delivery jobs such as distributing mail or correspondence to different rooms. There are mobile robots that are used underwater for prospecting for oil.
A humanoid robot is an autonomous mobile robot that is supposed to behave like a human. Although humanoid robots are prevalent in science fiction, there is still a lot of work to do before such robots will be able to interact properly with their surroundings and learn from events that occur there.

### 18.1.5 Programming languages
Although some all-purpose languages such as C, C++, and Java are used to create intelligent software, two languages are specifically designed for AI: LISP and PROLOG.

**LISP**
**LISP (LISt Programming)** was invented by John McCarthy in 1958. As the name implies, LISP is a programming language that manipulates lists. LISP treats data as well as programs as lists, which means that a LISP program can change itself. This feature matches the idea of an intelligent agent that can learn from its environment and improve its behavior.
However, one drawback of LISP is its sluggishness. It is slow if the list to be handled is long. Another drawback is the complexity of its syntax.

**PROLOG**
**PROLOG (PROgramming in LOGic)** is a language that can build a database of facts and a knowledge base of rules. A program in PROLOG can use logical reasoning to answer questions that can be inferred from the knowledge base. However, PROLOG is not a very efficient programming language. Some complex problems can be more efficiently solved using other languages, such as C, C++, or Java.

## 18.2 KNOWLEDGE REPRESENTATION
If an artificial agent is supposed to solve some problems related to the real world, it needs to be able to represent knowledge somehow. Facts are represented as data structures that can be manipulated by programs stored inside the computer. In this section, we describe four common methods for representing knowledge: *semantic networks*, *frames*, *predicate logic*, and *rule-based systems*.

### 18.2.1 Semantic networks
**Semantic networks** were developed in the early 1960s by Richard H. Richens. A semantic network uses directed graphs to represent knowledge. A directed graph, as discussed in Chapter 12, is made of vertices (nodes) and edges (arcs). Semantic networks use vertices to represent concepts, and edges (denoted by arrows) to represent the relation between two concepts (Figure 18.1).

**Concepts**
To develop an exact definition of a concept, experts have related the definition of concepts to the theory of sets. A concept, therefore, can be thought of as a set or a subset. For example, *animal* defines the set of all animals, *horse* defines the set of all horses and is a subset of the set *animal*. An object is a member (instance) of a set. Concepts are shown by vertices.

**Relations**
In a semantic network, relations are shown by edges. An edge can define a *subclass* relation—the edge is directed from the subclass to its superclass. An edge can also define an *instance* relation—the edge is directed from the instance to the set to which it belongs. An edge can also define an *attribute* of an object (color, size, ...). Finally, an edge can define a property of an object, such as possessing another object. One of the most important relations that can be well defined in a semantic network is *inheritance*. An inheritance relation defines the fact that all the attributes of a class are present in an inherited class. This can be used to infer new knowledge from the knowledge represented by the graph.

### 18.2.2 Frames
**Frames** are closely related to semantic networks. In semantic networks, a graph is used to represent knowledge: in frames, data structures (records) are used to represent the same knowledge. One advantage of frames over semantic networks is that programs can handle frames more easily than semantic networks. Figure 18.2 shows how the semantic network shown in Figure 18.1 can be implemented using frames.

**Objects**
A node in a semantic network becomes an object in a set of frames, so an object can define a class, a subclass, or an instance of a class. In Figure 18.2 *reptile*, *mammal*, *dog*, *Roxy*, and *Ringo* are objects.

**Slots**
Edges in semantic networks are translated into **slots**—fields in the data structure. The name of the slot defines the type of the relationship and the value of the slot completes the relationship. In Figure 18.2, for example, *animal* is a slot in the *reptile* object.

### 18.2.3 Predicate logic
The most common knowledge representation is **predicate logic**. Predicate logic can be used to represent complex facts. It is a well-defined language developed via a long history of theoretical logic. Although this section defines predicate logic, we first introduce **propositional logic**, a simpler language. We then discuss predicate logic, which employs propositional logic.

**Propositional logic**
Propositional logic is a language made up from a set of sentences that can be used to carry out logical reasoning about the world.

**Operators**
Propositional logic uses five operators, as shown below:
¬ (not), ∨ (or), ∧ (and), → (if ... then), ↔ (if and only if)

The first operator is unary—the operator takes only one sentence: the other four operators are binary—they take two sentences. The logical value (*true* or *false*) of each sentence depends on the logical value of the atomic sentences (sentences with no operators) of which the complex sentence is made. Figure 18.3 shows the truth table for each logical operator in propositional logic. Truth tables were introduced in Chapter 4 and explained in Appendix E.

**Sentence**
A sentence in this language is defined recursively as shown below:
1.  An uppercase letter, such as A, B, S, or T, that represents a statement in a natural languages, is a sentence.
2.  Any of the two constant values (*true* and *false*) is a sentence.
3.  If P is a sentence, then ¬P is a sentence.
4.  If P and Q are sentences, then P ∨ Q, P ∧ Q, P → Q, and P ↔ Q are sentences.

> **Example 18.1**
> The following are sentences in propositional language:
> a. Today is Sunday (S).
> b. It is raining (R).
> c. Today is Sunday or Monday (S ∨ M).
> d. It is not raining (¬R)
> e. If a dog is a mammal then a cat is a mammal (D → C)

**Deduction**
In AI we need to create new facts from the existing facts. In propositional logic, the process is called **deduction**. Given two presumably true sentences, we can deduce a new true sentence. The first two sentences are called *premisses*: the deduced sentence is called the *conclusion*. The whole is called an *argument*. For example:
*   Premiss 1: Either he is at home or at the office
*   Premiss 2: He is not at home
*   Conclusion: Therefore, he is at the office

If we use H for ‘he is at home’, O for ‘he is at office’, and the symbol |- for the ‘therefore’, then we can show the above argument as:
{H ∨ O, ¬H} |- O

The question is how we can prove if a deductive argument is *valid*. A valid deductive argument is an argument whose conclusions follow necessarily from its premisses. In other words, in a valid deductive argument, it is impossible for the conclusion to be false while its premisses all are true.
One way to do this is to create a truth table for the premisses and the conclusion. A conclusion is invalid if we can find a *counterexample* case: a case in which both premisses are true, but the conclusion is false.

**An argument is valid if no counterexample can be found.**

> **Example 18.2**
> The validity of the argument {H ∨ O, ¬H} |- O can be proved using a truth table. The row where H is False and O is True makes both premisses true and the conclusion true. There is no row where premisses are true and conclusion is false.

> **Example 18.3**
> The argument {R → C, C} |- R is not valid because a counterexample can be found. (R: She is rich, C: She has a car). Premiss 1: If she is rich, she has a car. Premiss 2: She has a car. Conclusion: Therefore, she is rich.
> Counterexample: She has a car (True), but she is not rich (False). Premiss 1 (F → T is T) is True, Premiss 2 is True, but Conclusion is False.

**Predicate logic**
In propositional logic, a symbol that represents a sentence is atomic: it cannot be broken up to find information about its components. For example, consider the sentences:
P1: ‘Linda is Mary’s mother’
P2: ‘Mary is Anne’s mother’
We can combine these two sentences in many ways to create other sentences, but we cannot extract any relation between Linda and Anne. For example, we cannot infer from the above two sentences that Linda is the grandmother of Anne. To do so, we need predicate logic: the logic that defines the relation between the parts in a proposition.

In predicate logic, a sentence is divided into a predicate and arguments. For example, each of the following propositions can be written as predicates with two arguments:
P1: ‘Linda is Mary’s mother’ becomes **mother (Linda, Mary)**
P2: ‘Mary is Anne’s mother’ becomes **mother (Mary, Anne)**

The relationship of motherhood in each of the above sentences is defined by the predicate *mother*. If the object *Mary* in both sentences refers to the same person, we can infer a new relation between Linda and Anne: **grandmother (Linda, Anne)**. This is the whole purpose of predicate logic.

**Sentence**
A sentence in predicate language is defined as follows:
1.  A predicate with n arguments such as *predicate_name (argument1, ..., argumentn)* is a sentence. The *predicate_name* relates arguments to each other. Each argument can be:
    a. A constant, such as *human*, *animal*, *John*, *Mary*.
    b. A variable, such as *x*, *y*, and *z*.
    c. A function such as *mother (Anne)*. Note that a function is a predicate that is used as an argument: a function returns an object that can takes the place of an argument.
2.  Any of the two constant values (*true* and *false*) is a sentence.
3.  If P is a sentence, then ¬P is a sentence.
4.  If P and Q are sentences, then P ∨ Q, P ∧ Q, P → Q, and P ↔ Q are sentences.

> **Example 18.4**
> 1. The sentence ‘John works for Ann’s sister’ can be written as: **works [John, sister (Ann)]**
> 2. The sentence ‘John’s father loves Ann’s sister’ can be written as: **loves [father (John), sister (Ann)]**

**Quantifiers**
Predicate logic allows us to use **quantifiers**. Two quantifiers are common in predicate logic: ∀ and ∃.
1.  The first, **∀**, which is read as ‘for all’, is called the **universal quantifier**: it states that something is true for every object that its variable represents.
2.  The second, **∃**, which is read as ‘there exists’, is called the **existential quantifier**: it states that something is true for one or more objects that its variable represents.

> **Example 18.5**
> 1. 'All men are mortals': ∀x [man (x) → mortal (x)]
> 2. 'Frogs are green': ∀x [frog (x) → green (x)]
> 3. 'Some flowers are red': ∃x [flower (x) ∧ red(x)]
> 4. 'John has a book': ∃x [book (x) ∧ has (John, x)]
> 5. 'No frog is yellow': ∀x[frog (x) → ¬yellow (x)] or ¬∃x [frog (x) ∧ yellow (x)]

**Deduction**
In predicate logic, if there is no quantifier, the verification of an argument is the same as that which we discussed in propositional logic. However, the verification becomes more complicated if there are quantifiers.
Premiss 1: All men are mortals.
Premiss 2: Socrates is a man.
Conclusion: Therefore, Socrates is mortal.
Verification: ∀x [man (x) → mortal (x)] , man (Socrates) |- mortal (Socrates)

**Beyond predicate logic**
There have been further developments in logic to include the need of logical reasoning. Some examples of these include high-order logic, default logic, modal logic, and temporal logic.
- **High-order logic**: Extends the scope of quantifiers to predicates themselves (e.g., ∀P).
- **Modal logic**: Includes expressions like ‘could’, ‘should’, ‘may’, ‘might’, ‘ought’.
- **Temporal logic**: Extends predicate logic with temporal operators such as ‘from now on’.
- **Default logic**: Assumes default conclusions unless there is evidence to the contrary (e.g., birds fly).

### 18.2.4 Rule-based systems
A **rule-based system** represents knowledge using a set of rules that can be used to deduce new facts from known facts. The rules express what is true if specific conditions are met. A rule-based database is a set of if... then... statements in the form
**If A then B** or **A → B**
in which A is called the *antecedent* and B is called the *consequent*. Note that in a rule-based system, each rule is handled independently without any connection to other rules.

**Components**
A rule-based system is made up of three components: an **interpreter** (or **inference engine**), a **knowledge base**, and a **fact database**, as shown in Figure 18.4.

**Knowledge base**
The knowledge base component in a rule-based system is a database (repository) of rules. It contains a set of pre-established rules that can be used to draw conclusions from the given facts.

**Database of facts**
The database of facts contains a set of conditions that are used by the rules in the knowledge base.

**Interpreter**
The interpreter (inference engine) is a processor or controller—a program, for example—that combines rules and facts. Interpreters are of two types: **forward chaining** and **backward chaining**.

**Forward chaining**
**Forward chaining** is the process in which an interpreter uses a set of rules and a set of facts to perform an action. The action can be just adding a new fact to the base of facts, or issuing some commands. The interpreter interprets and executes rules until no more rules can be interpreted.
If there is any conflict in which two different rules can be applied to one fact or one rule can be applied to two facts, the system needs to call a conflict resolution procedure.

**Backward chaining**
Forward chaining is not very efficient if the system tries to prove a conclusion. All facts must be checked by all rules to come up with the given conclusion. In this case, it may be more efficient if **backward chaining** is used. The process starts with the conclusion (goal). If the goal is already in the fact database, the process stops and the conclusion is proved. If the goal is not in the fact database, the system finds the rule that has the goal in its conclusion. However, instead of firing that rule, backward chaining is now applied to each fact in the rule (recursion).

## 18.3 EXPERT SYSTEMS
**Expert systems** use the knowledge representation languages discussed in the previous section to perform tasks that normally need human expertise. They can be used in situations in which that expertise is in short supply, expensive, or unavailable when required. For example, in medicine, an expert system can narrow down a set of symptoms to a likely subset of causes, a task normally carried out by a doctor.

### 18.3.1 Extracting knowledge
An expert system is built on predefined knowledge about its field of expertise. The first step in building an expert system is therefore to extract the knowledge from a human expert. This extracted knowledge becomes the knowledge base.
Extracting knowledge from an expert is normally a difficult task because the knowledge is often heuristic (based on probability rather than certainty) and intuitive. The knowledge-extraction process is normally done by a *knowledge engineer*.

### 18.3.2 Extracting facts
To be able to infer new facts or perform actions, a fact database is needed in addition to the knowledge base. The fact database in an expert system is case-based, in which facts collected or measured are entered into the system to be used by the inference engine.

### 18.3.3 Architecture
Figure 18.7 shows the general idea behind the architecture of an expert system. An expert system can have up to seven components: user, user interface, inference engine, knowledge base, fact database, explanation system, and knowledge base editor.
The **inference engine** is the heart of an expert system. Four of the seven components—user interface, inference engine, explanation system, and knowledge base editor—can be made once and used for many applications, as they are not dependent on the particular knowledge base or fact database. These components form an **expert system shell**.

- **User interface**: Allows the user to interact with the system.
- **Inference engine**: Uses the knowledge base and fact database to infer the action.
- **Knowledge base**: Collection of rules based on expert interviews.
- **Fact database**: Case-based data entered by the user.
- **Explanation system**: Explains the rationale behind the decision made.
- **Knowledge base editor**: Used to update the knowledge base.

## 18.4 PERCEPTION
One of the goals in artificial intelligence is to create a machine that behaves like an ordinary human. **Perception** is understanding what is received through the senses—sight, hearing, touch, smell, taste. An intelligent agent should be able to perceive if it needs to act like a human being. AI has been particularly involved in two types of perception, sight and hearing.

### 18.4.1 Image processing
**Image processing** or **computer vision** is an area of AI that deals with the perception of objects through the artificial eyes of an agent, such as a camera. An image processor takes a two-dimensional image from the outside world and tries to create a description of the three-dimensional objects present in the scene. The processor uses a database containing the characteristics of objects for comparison.

**Edge detection**
The first stage in image processing is **edge detection**: finding where the edges in the image are. Edges can define the boundaries between an object and its background. Edges show discontinuity in surface, depth, or illumination. The edges can be detected by finding adjacent pixels with a large difference in intensity.

**Segmentation**
**Segmentation** is the next stage in image analysis. Segmentation divides the image into homogeneous segments or areas. A homogeneous area is an area in which the intensity of pixels varies smoothly. Segmentation finds the boundaries between different areas inside the object. Several methods exist, such as *thresholding*, *splitting*, and *merging*.

**Finding depth**
The next step is to find the depth of the object or objects in the image. Depth finding can help the intelligent agent to gauge how far the object is from it.
- **Stereo vision**: Uses two eyes or two cameras. If the object is very close, the two images are different; if far away, they are almost the same.
- **Motion**: Creates several images when one or more objects are moving. The relative position of a moving object with respect to other objects gives a clue to distance.

**Finding orientation**
Orientation of the object in the scene can be found using two techniques: *shading* and *texture*.
- **Shading**: The amount of light reflected from a surface depends on the orientation of the surface relative to the light source.
- **Texture**: A regularly repeated pattern can help in finding the orientation or curvature.

**Object recognition**
The last step is **object recognition**. To recognize an object, the agent needs to have a model of the object in memory for comparison. One solution is to assume that objects are compound objects made of a set of simple **primitive geometric shapes** (block, cylinder, cone, etc.). When an agent ‘sees’ an object, it tries to decompose the object into a combination of the primitives.

### 18.4.2 Language understanding
One of the inherent capabilities of a human being is to understand—that is, interpret—the audio signals that they perceive. A machine that can understand **natural language** can be very useful. We can divide the task into four consecutive steps: speech recognition, syntactic analysis, semantic analysis, and pragmatic analysis.

**Speech recognition**
The first step is **speech recognition**. The speech signal (analog) is analyzed and the sequence of words it contains are extracted. The signal needs to be divided into different sounds, sometimes called *phonemes*.

**Syntactic analysis**
The **syntactic analysis** step is used to define how words are to be grouped in a sentence.
- **Grammar**: The first tool to correctly analyze a sentence is a well-defined grammar.
- **Parser**: A machine that determines if a sentence is grammatically (syntactically) correct does not need to check all possible choices before rejecting a sentence as an invalid one. This is done by a **parser**, which creates a **parse tree** based on the grammar rules.

**Semantic analysis**
The **semantic analysis** extracts the meaning of a sentence after it has been syntactically analyzed. This analysis creates a representation of the objects involved in the sentence, their relations, and their attributes.

**Pragmatic analysis**
**Pragmatic analysis** is needed to further clarify the purpose of the sentence and to remove ambiguities.
- **Purpose**: Determine if the sentence is a request, an inquiry, etc.
- **Removing ambiguity**: Resolving ambiguities where a word has multiple functions or meanings, or where a syntactically correct sentence is nonsense.

## 18.5 SEARCHING
One of the techniques for solving problems in artificial intelligence is **searching**. Searching can be described as solving a problem using a set of **states** (a situation). A search procedure starts from an **initial state**, goes through **intermediate states** until finally reaching a **target state**. The set of all states used by a searching process is referred to as the **search space**.
Example: The 8-puzzle.

### 18.5.1 Search methods
There are two general search methods: *brute-force* and *heuristic*. The brute-force method is itself either *breadth-first* or *depth-first*.

**Brute-force search**
We use **brute-force search** if we do not have any prior knowledge about the search.
- **Breadth-first search**: We start from the root of the tree and examine all the nodes at each level before we move to the next level. This guarantees finding a solution if one exists and finding the shortest path, but is inefficient.
- **Depth-first search**: We start from the root and do a forward search until we hit the goal or a dead-end. If we hit a dead-end, we **backtrack** to the nearest branch and do a forward search again.

**Heuristic search**
Using **heuristic search**, we assign a quantitative value called a **heuristic value (h value)** to each node. This quantitative value shows the relative closeness of the node to the goal state. For example, in the 8-puzzle, the heuristic value could be the minimum number of movements a tile must make to reach its goal position. We start with the state with the smaller *h* value (closer to the goal) and continue this way.

## 18.6 NEURAL NETWORKS
If an intelligent agent is supposed to behave like a human being, it may need to learn. Most methods use **inductive learning** or **learning by example**. This means that a large set of problems and their solutions are given to the machine from which to learn. **Neural networks** try to simulate the learning process of the human brain using a network of neurons.

### 18.6.1 Biological neurons
The human brain has billions of processing units, called **neurons**. A neuron is made of three parts: **soma**, **axon**, and **dendrites**. The dendrites act as input devices; the axon acts as an output device. The **synapse** is the connecting point. A neuron can be in one of two states: *excited* (fires an output) or *inhibited*.

### 18.6.2 Perceptrons
A **perceptron** is an artificial neuron similar to a single biological neuron. It takes a set of weighted inputs, sums the inputs, and compares the result with a **threshold** value. If the result is above the threshold value, the perceptron fires (output 1), otherwise, it does not (output 0).
$S = (x_1 \\cdot w_1 + x_2 \\cdot w_2 + ...)$
If $S > T$, then $y = 1$; else $y = 0$.
A perceptron can be trained by adjusting weights based on correct or incorrect outputs from known examples.

### 18.6.3 Multilayer networks
Several layers of perceptrons can be combined to create **multilayer neural networks**. The output from each layer becomes the input to the next layer. The first layer is the **input layer**, the middle layers are called **hidden layers**, and the last layer is the **output layer**.

### 18.6.4 Applications
Neural networks can be used when enough pre-established inputs and outputs exist to train the network. Applications include **optical character recognition (OCR)** and credit assignment (establishing credit ratings).

## 18.7 END-CHAPTER MATERIALS
### 18.7.1 Recommended reading
- Cawsey, A. *The Essence of Artificial Intelligence*, Upper Saddle River, NJ: Prentice-Hall, 1998
- Luger, G. *Artificial Intelligence: Structures and Strategies for Complex Problem Solving*, Reading, MA: Addison-Wesley, 2004
- Winston, P. *Artificial Intelligence*, Reading, MA: Addison-Wesley, 1993
- Coppin, B. *Artificial Intelligence Illuminated*, Sudbury, MA: Jones and Bartlett, 2004
- Russel, S. and Norvig, P. *Artificial Intelligence: A Modern Approach*, Upper Saddle River, NJ: Prentice-Hall, 2003
- Dean, T. *Artificial Intelligence: Theory and Practice*, Redwood City, Reading, MA: Addison-Wesley, 2002

### 18.7.2 Key terms
- artificial intelligence
- axon
- brute-force search
- breadth-first search
- depth-first search
- expert system
- frame
- heuristic search
- image processing
- intelligent agent
- LISP
- neural network
- neuron
- perceptron
- physical agent
- pragmatic analysis
- predicate logic
- PROLOG
- search space
- segmentation
- semantic analysis
- semantic network
- software agent
- soma
- speech recognition
- synapse
- syntactic analysis
- temporal logic
- thresholding
- Turing test

### 18.7.3 Summary
- Artificial intelligence is the study of programmed systems that can simulate human activities such as perceiving, thinking, learning, and acting. The Turing Test compares the intelligent behavior of a human being with that of a computer.
- An intelligent agent is a system that perceives its environment, learns from it, and interacts with it. Agents can be software agents or physical agents (robots).
- Knowledge representation methods include semantic networks, frames, predicate logic, and rule-based systems. Semantic networks use graphs; frames use data structures. Predicate logic uses logical reasoning. Rule-based systems use rules to deduce new facts.
- Expert systems perform tasks that normally need human expertise. They extract knowledge from experts and use an inference engine to make decisions.
- Perception involves understanding sensory inputs. Image processing deals with visual perception (edge detection, segmentation, depth finding, object recognition). Language understanding involves speech recognition, syntactic analysis, semantic analysis, and pragmatic analysis.
- Searching is a technique for solving problems by moving through states in a search space. Brute-force search (breadth-first, depth-first) explores systematically. Heuristic search uses rules of thumb to find solutions faster.
- Neural networks simulate the learning process of the human brain using artificial neurons called perceptrons, often arranged in multilayer networks. They learn by example (inductive learning).

## 18.8 PRACTICE SET
### 18.8.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 18.8.2 Review questions
1. Describe the Turing test. Do you think this test can be used to define an intelligent system accurately?
2. Define an intelligent systems and list two broad categories of agents.
3. Compare and contrast LISP and PROLOG when they are used in artificial intelligence.
4. Describe the need for knowledge representation and list four different methods discussed in this chapter.
5. Compare and contrast predicate logic and propositional logic.
6. Compare and contrast frames and semantic networks.
7. Define a rule-base system and compare it with semantic networks.
8. Compare and contrast expert systems and mundane systems.
9. List different steps in image processing.
10. List different steps in language processing.
11. Define a neural network and how it can simulate the learning process in human beings.
12. Define a perceptron.

### 18.8.3 Problems
1. Draw a semantic network to show the relations between the following: medical doctor, family practitioner, gynecologist, intern, engineer, accountant, Dr. Pascal who is a French family practitioner.
2. Represent the semantic network of Problem P18-1 as a set of frames.
3. Using the symbol R for the sentence ‘It is raining’ and the symbol S for the sentence ‘It is sunny’, write each of the following English sentences in propositional logic:
   a. It is not raining.
   b. It is not sunny.
   c. It is neither raining nor sunny.
   d. It is raining and sunny.
   e. If it is sunny, then it is not raining.
   f. If it is raining, then it is not sunny.
   g. It is sunny if and only if it is not raining.
   h. It is not true that if it is not raining, it is sunny.
4. If the symbols C, W, and H mean ‘it is cold’, ‘it is warm’, and ‘it is hot’, write the English statements corresponding to the following statements in propositional logic:
   a. ¬H
   b. W ∨ H
   c. W ∧ H
   d. W ∧ (¬ H)
   e. ¬ (W ∧ H)
   f. W → H
   g. (¬ C) → W
   h. ¬ (W → H)
   i. H → (¬ W)
   j. ((¬C) ∧ H) ∨ (C ∨ (¬H))
5. Using the symbols Wh, Re, Gr, and Fl for the predicates ‘is white’, ‘is red’, ‘is green’, and ‘is a flower’ respectively, write the following sentences in predicate logic:
   a. Some flowers are white.
   b. Some flowers are not red.
   c. Not all flowers are red.
   d. Some flowers are either red or white.
   e. There is not a green flower.
   f. No flowers are green.
   g. Some flowers are not white.
6. Using the symbols Has, Loves, Dog, and Cat for the predicates ‘has’, ‘loves’, ‘is a dog’, and ‘is a cat’ respectively, write the following sentences in predicate logic:
   a. John has a cat.
   b. John loves all cats.
   c. John loves Anne.
   d. Anne loves some dogs.
   e. Not everything John loves is a cat.
   f. Anne does not like some cats.
   g. If John loves a cat, Anne loves it.
   h. John loves a cat if and only if Anne loves it.
7. Using the symbols Expensive, Cheap, Buys, and Sells for the predicates ‘is expensive’, ‘is cheap’, ‘buys’, and ‘sells’ respectively, write the following sentences in predicate logic:
   a. Everything is expensive.
   b. Everything is cheap.
   c. Bob buys everything that is cheap.
   d. John sells something expensive.
   e. Not everything is expensive.
   f. Not everything is cheap.
   g. If something is cheap, then it is not expensive.
8. Using the symbols Identical for the predicate ‘is identical to’, write the following sentences in predicate logic. Note that the predicate ‘equal’ needs two arguments:
   a. John is not Anne.
   b. John exists.
   c. Anne does not exist.
   d. Something exists.
   e. Nothing exists.
   f. There are at least two things.
9. Use a truth table to find whether the following argument is valid: {P → Q, P} |- Q
10. Use a truth table to find whether the following argument is valid: {P ∨ Q, P} |- Q
11. Use a truth table to find whether the following argument is valid: {P ∧ Q, P} |- Q
12. Use a truth table to find whether the following argument is valid: {P → Q, Q → R} |- (P → R)
13. Draw a neural network that can simulate an OR gate.
14. Draw a neural network that can simulate an AND gate.
15. The initial and goal states of an 8-puzzle are shown in Figure 18.25. Draw the heuristic search tree for solving the puzzle.
16. Show the breadth-first search for the tree diagram shown in Figure 18.26.
17. Show the depth-first search for the tree diagram of Problem P18-16.
18. Draw the tree diagram for the maze shown in Figure 18.27.
19. Draw the tree and show a breadth-first search for Problem P18-18.
20. Draw the tree and show a depth-first search for Problem P18-18.
`,
  zh: `
# 第十八章：人工智慧

在本書的這一章中，我們介紹**人工智慧 (AI)**。第一節是簡短的歷史並嘗試定義人工智慧。**知識表示**是 AI 中一個廣泛且發展完善的領域，將在下一節討論。然後我們介紹**專家系統**，即在需要但無法獲得人類專業知識時可以替代人類專業知識的系統。接著我們討論如何使用人工智慧來模擬人類在兩個領域的正常（平凡）行為：**影像處理**和**語言分析**。然後我們展示專家系統和平凡系統如何使用不同的搜尋方法來解決問題。最後，我們討論**神經網路**如何模擬智慧代理中的學習過程。

## 學習目標
學完本章後，學生應能：
- 定義並簡述人工智慧的歷史。
- 描述知識如何在智慧代理中表示。
- 展示當無法獲得人類專家時如何使用專家系統。
- 展示如何使用人工代理來模擬人類執行的平凡任務。
- 展示專家系統和平凡系統如何使用不同的搜尋技術來解決問題。
- 展示如何使用創建神經元電子版本（稱為感知器）的神經網路在一定程度上模擬人類的學習過程。

## 18.1 簡介
在本節中，我們首先嘗試非正式地定義**人工智慧 (AI)** 一詞並簡述其歷史。我們還定義了**智慧代理**及其兩大類。最後，我們提到兩種常用於人工智慧的程式語言。

### 18.1.1 什麼是人工智慧？
雖然對於人工智慧沒有普遍認同的定義，但我們接受以下符合本章涵蓋主題的定義：

**人工智慧是研究能夠在一定程度上模擬人類活動（如感知、思考、學習和行動）的程式化系統的學科。**

### 18.1.2 人工智慧簡史
雖然人工智慧作為一個獨立的研究領域相對較新，但它在過去有一些根源。我們可以說它始於 2400 年前，當時希臘哲學家亞里斯多德發明了邏輯推理的概念。完善邏輯語言的努力在萊布尼茲和牛頓那裡繼續進行。喬治·布爾在 19 世紀發展了布林代數（附錄 E），為電腦電路奠定了基礎。然而，思維機器的主要想法來自艾倫·圖靈，他提出了圖靈測試。「人工智慧」一詞最早由約翰·麥卡錫在 1956 年創造。

### 18.1.3 圖靈測試
1950 年，艾倫·圖靈提出了**圖靈測試**，提供了機器*智慧*的定義。該測試簡單地比較人類和電腦的智慧行為。審問者提出一組問題，轉發給電腦和人類。審問者收到兩組回應，但不知道哪一組來自人類，哪一組來自電腦。經過仔細檢查這兩組回應後，如果審問者無法確定哪一組來自電腦，哪一組來自人類，則電腦通過了智慧行為的圖靈測試。

### 18.1.4 智慧代理
**智慧代理**是一個感知其環境、從中學習並與之進行智慧互動的系統。智慧代理可分為兩大類：*軟體代理*和*實體代理*。

**軟體代理**
**軟體代理**是一組設計用於執行特定任務的程式。例如，一些智慧系統可用於組織電子郵件。這種類型的代理可以檢查收到電子郵件的內容並將其分類為不同類別（垃圾郵件、次要、重要、非常重要等等）。軟體代理的另一個例子是用於搜尋全球資訊網並查找可以提供有關請求主題資訊的網站的搜尋引擎。

**實體代理**
**實體代理 (機器人)** 是一個可程式化的系統，可用於執行各種任務。簡單的機器人可用於製造業，執行組裝、焊接或噴漆等常規工作。一些組織使用移動機器人執行遞送工作，例如將郵件或信件分發到不同房間。還有用於水下勘探石油的移動機器人。
人形機器人是一種自主移動機器人，被認為像人類一樣行為。雖然人形機器人在科幻小說中很普遍，但在這些機器人能夠正確地與周圍環境互動並從發生的事件中學習之前，還有很多工作要做。

### 18.1.5 程式語言
雖然一些通用語言如 C、C++ 和 Java 用於創建智慧軟體，但有兩種語言專門為 AI 設計：LISP 和 PROLOG。

**LISP**
**LISP (LISt Programming，列表程式設計)** 由約翰·麥卡錫於 1958 年發明。顧名思義，LISP 是一種操作列表的程式語言。LISP 將資料和程式都視為列表，這意味著 LISP 程式可以更改自身。此功能符合智慧代理可以從其環境中學習並改善其行為的想法。
然而，LISP 的一個缺點是遲緩。如果要處理的列表很長，速度會很慢。另一個缺點是其語法的複雜性。

**PROLOG**
**PROLOG (PROgramming in LOGic，邏輯程式設計)** 是一種可以建立事實資料庫和規則知識庫的語言。PROLOG 程式可以使用邏輯推理來回答可以從知識庫推斷出的問題。然而，PROLOG 不是一種非常有效率的程式語言。一些複雜問題可以使用其他語言（如 C、C++ 或 Java）更有效率地解決。

## 18.2 知識表示
如果人工代理要解決一些與現實世界相關的問題，它需要以某種方式表示知識。事實表示為可以在電腦內部由程式操作的資料結構。在本節中，我們描述四種常見的知識表示方法：*語意網路*、*框架*、*謂詞邏輯*和*規則型系統*。

### 18.2.1 語意網路
**語意網路**由 Richard H. Richens 於 1960 年代初開發。語意網路使用有向圖來表示知識。如第 12 章所述，有向圖由頂點（節點）和邊（弧）組成。語意網路使用頂點表示概念，使用邊（由箭頭表示）表示兩個概念之間的關係（圖 18.1）。

**概念**
為了對概念進行精確定義，專家將概念的定義與集合論聯繫起來。因此，概念可以被認為是一個集合或子集。例如，*動物*定義了所有動物的集合，*馬*定義了所有馬的集合，並且是集合*動物*的子集。物件是集合的成員（實例）。概念由頂點顯示。

**關係**
在語意網路中，關係由邊顯示。邊可以定義*子類別*關係——邊從子類別指向其超類別。邊也可以定義*實例*關係——邊從實例指向它所屬的集合。邊還可以定義物件的*屬性*（顏色、大小...）。最後，邊可以定義物件的屬性，例如擁有另一個物件。在語意網路中可以很好定義的最重要關係之一是*繼承*。繼承關係定義了類別的所有屬性都存在於繼承類別中的事實。這可用於從圖形表示的知識中推斷新知識。

### 18.2.2 框架
**框架**與語意網路密切相關。在語意網路中，圖形用於表示知識：在框架中，資料結構（記錄）用於表示相同的知識。框架相對於語意網路的一個優點是程式可以比語意網路更容易地處理框架。圖 18.2 顯示了如何使用框架實作圖 18.1 中顯示的語意網路。

**物件**
語意網路中的節點成為一組框架中的物件，因此物件可以定義類別、子類別或類別的實例。在圖 18.2 中，*爬行動物*、*哺乳動物*、*狗*、*Roxy* 和 *Ringo* 是物件。

**槽 (Slots)**
語意網路中的邊被轉換為**槽**——資料結構中的欄位。槽的名稱定義關係的類型，槽的值完成關係。例如，在圖 18.2 中，*動物*是*爬行動物*物件中的一個槽。

### 18.2.3 謂詞邏輯
最常見的知識表示是**謂詞邏輯**。謂詞邏輯可用於表示複雜事實。它是一種透過長期的理論邏輯歷史發展而來的定義明確的語言。雖然本節定義謂詞邏輯，但我們先介紹**命題邏輯**，一種更簡單的語言。然後我們討論謂詞邏輯，它採用命題邏輯。

**命題邏輯**
命題邏輯是由一組句子組成的語言，可用於對世界進行邏輯推理。

**運算子**
命題邏輯使用五個運算子，如下所示：
¬ (非), ∨ (或), ∧ (且), → (如果...則), ↔ (若且唯若)

第一個運算子是一元的——運算子只接受一個句子：其他四個運算子是二元的——它們接受兩個句子。每個句子的邏輯值（*真*或*假*）取決於組成複雜句子的原子句子（沒有運算子的句子）的邏輯值。圖 18.3 顯示了命題邏輯中每個邏輯運算子的真值表。真值表在第 4 章介紹並在附錄 E 中解釋。

**句子**
這種語言中的句子遞迴定義如下：
1.  代表自然語言陳述的大寫字母，如 A、B、S 或 T，是一個句子。
2.  兩個常數值（*真*和*假*）中的任何一個都是一個句子。
3.  如果 P 是一個句子，那麼 ¬P 是一個句子。
4.  如果 P 和 Q 是句子，那麼 P ∨ Q, P ∧ Q, P → Q, 和 P ↔ Q 是句子。

> **範例 18.1**
> 以下是命題語言中的句子：
> a. 今天是星期日 (S)。
> b. 正在下雨 (R)。
> c. 今天是星期日或星期一 (S ∨ M)。
> d. 沒有下雨 (¬R)
> e. 如果狗是哺乳動物，那麼貓是哺乳動物 (D → C)

**推論**
在 AI 中，我們需要從現有事實中創建新事實。在命題邏輯中，這個過程稱為**推論**。給定兩個假定為真的句子，我們可以推導出一個新的真句子。前兩個句子稱為*前提*：推導出的句子稱為*結論*。整體稱為*論證*。例如：
*   前提 1：他在家或在辦公室
*   前提 2：他不在家
*   結論：因此，他在辦公室

如果我們用 H 代表「他在家」，O 代表「他在辦公室」，符號 |- 代表「因此」，那麼我們可以將上述論證表示為：
{H ∨ O, ¬H} |- O

問題是我們如何證明演繹論證是*有效*的。有效的演繹論證是指其結論必然源自其前提的論證。換句話說，在有效的演繹論證中，前提全為真而結論為假是不可能的。
一種方法是為前提和結論創建真值表。如果我們可以找到一個*反例*情況：即兩個前提都為真但結論為假的情況，則結論無效。

**如果找不到反例，則論證有效。**

> **範例 18.2**
> 論證 {H ∨ O, ¬H} |- O 的有效性可以使用真值表證明。當 H 為假且 O 為真時，兩個前提都為真，結論也為真。沒有前提為真而結論為假的情況。

> **範例 18.3**
> 論證 {R → C, C} |- R 無效，因為可以找到反例。（R：她很富有，C：她有車）。前提 1：如果她很富有，她就有車。前提 2：她有車。結論：因此，她很富有。
> 反例：她有車（真），但她不富有（假）。前提 1（F → T 為 T）為真，前提 2 為真，但結論為假。

**謂詞邏輯**
在命題邏輯中，表示句子的符號是原子的：它不能被分解以查找有關其組件的資訊。例如，考慮句子：
P1：「Linda 是 Mary 的母親」
P2：「Mary 是 Anne 的母親」
我們可以以多種方式組合這兩個句子來創建其他句子，但我們無法提取 Linda 和 Anne 之間的任何關係。例如，我們無法從上述兩個句子推斷出 Linda 是 Anne 的祖母。為此，我們需要謂詞邏輯：定義命題中各部分之間關係的邏輯。

在謂詞邏輯中，句子分為謂詞和引數。例如，以下每個命題都可以寫成帶有兩個引數的謂詞：
P1：「Linda 是 Mary 的母親」變為 **mother (Linda, Mary)**
P2：「Mary 是 Anne 的母親」變為 **mother (Mary, Anne)**

上述每個句子中的母性關係由謂詞 *mother* 定義。如果兩個句子中的物件 *Mary* 指的是同一個人，我們可以推斷出 Linda 和 Anne 之間的新關係：**grandmother (Linda, Anne)**。這就是謂詞邏輯的全部目的。

**句子**
謂詞語言中的句子定義如下：
1.  帶有 n 個引數的謂詞，如 *predicate_name (argument1, ..., argumentn)* 是一個句子。*predicate_name* 將引數相互關聯。每個引數可以是：
    a. 常數，如 *human*、*animal*、*John*、*Mary*。
    b. 變數，如 *x*、*y* 和 *z*。
    c. 函數，如 *mother (Anne)*。請注意，函數是用作引數的謂詞：函數回傳一個可以代替引數的物件。
2.  兩個常數值（*真*和*假*）中的任何一個都是一個句子。
3.  如果 P 是一個句子，那麼 ¬P 是一個句子。
4.  如果 P 和 Q 是句子，那麼 P ∨ Q, P ∧ Q, P → Q, 和 P ↔ Q 是句子。

> **範例 18.4**
> 1. 句子「John 為 Ann 的姐姐工作」可以寫成：**works [John, sister (Ann)]**
> 2. 句子「John 的父親愛 Ann 的姐姐」可以寫成：**loves [father (John), sister (Ann)]**

**量詞**
謂詞邏輯允許我們使用**量詞**。謂詞邏輯中常見兩個量詞：∀ 和 ∃。
1.  第一個，**∀**，讀作「對於所有」，稱為**全稱量詞**：它聲明對於其變數所代表的每個物件，某事都是真的。
2.  第二個，**∃**，讀作「存在」，稱為**存在量詞**：它聲明對於其變數所代表的一個或多個物件，某事是真的。

> **範例 18.5**
> 1. 「所有人都會死」：∀x [man (x) → mortal (x)]
> 2. 「青蛙是綠色的」：∀x [frog (x) → green (x)]
> 3. 「有些花是紅色的」：∃x [flower (x) ∧ red(x)]
> 4. 「John 有一本書」：∃x [book (x) ∧ has (John, x)]
> 5. 「沒有青蛙是黃色的」：∀x[frog (x) → ¬yellow (x)] 或 ¬∃x [frog (x) ∧ yellow (x)]

**推論**
在謂詞邏輯中，如果沒有量詞，論證的驗證與我們在命題邏輯中討論的相同。然而，如果有量詞，驗證會變得更加複雜。
前提 1：所有人都會死。
前提 2：蘇格拉底是人。
結論：因此，蘇格拉底會死。
驗證：∀x [man (x) → mortal (x)] , man (Socrates) |- mortal (Socrates)

**超越謂詞邏輯**
邏輯已有進一步發展以包含邏輯推理的需求。其中一些例子包括高階邏輯、預設邏輯、模態邏輯和時序邏輯。
- **高階邏輯**：將量詞的範圍擴展到謂詞本身（例如 ∀P）。
- **模態邏輯**：包括諸如「可以」、「應該」、「可能」、「或許」、「應當」等表達式。
- **時序邏輯**：用諸如「從現在開始」之類的時序運算子擴展謂詞邏輯。
- **預設邏輯**：假設預設結論，除非有相反的證據（例如，鳥會飛）。

### 18.2.4 規則型系統
**規則型系統**使用一組規則來表示知識，這些規則可用於從已知事實推斷出新事實。規則表達了如果滿足特定條件什麼是真的。規則型資料庫是一組如果...則...陳述式，形式為
**如果 A 則 B** 或 **A → B**
其中 A 稱為*前件*，B 稱為*後件*。請注意，在規則型系統中，每個規則都是獨立處理的，與其他規則沒有任何連接。

**組件**
規則型系統由三個組件組成：**直譯器**（或**推論引擎**）、**知識庫**和**事實資料庫**，如圖 18.4 所示。

**知識庫**
規則型系統中的知識庫組件是規則的資料庫（儲存庫）。它包含一組預先建立的規則，可用於從給定事實得出結論。

**事實資料庫**
事實資料庫包含一組條件，由知識庫中的規則使用。

**直譯器**
直譯器（推論引擎）是一個處理器或控制器——例如程式——結合規則和事實。直譯器有兩種類型：**前向鏈接**和**後向鏈接**。

**前向鏈接**
**前向鏈接**是直譯器使用一組規則和一組事實來執行動作的過程。動作可以只是向事實庫添加新事實，或發出一些命令。直譯器解釋並執行規則，直到沒有更多規則可以解釋。
如果存在衝突，即兩個不同的規則可以應用於一個事實，或一個規則可以應用於兩個事實，系統需要呼叫衝突解決程序。

**後向鏈接**
如果系統試圖證明一個結論，前向鏈接效率不高。必須檢查所有事實的所有規則才能得出給定的結論。在這種情況下，如果使用**後向鏈接**可能會更有效率。過程從結論（目標）開始。如果目標已經在事實資料庫中，過程停止，結論被證明。如果目標不在事實資料庫中，系統找到在其結論中具有目標的規則。然而，後向鏈接現在應用於規則中的每個事實（遞迴），而不是觸發該規則。

## 18.3 專家系統
**專家系統**使用上一節討論的知識表示語言來執行通常需要人類專業知識的任務。它們可用於專業知識短缺、昂貴或在需要時無法獲得的情況。例如，在醫學中，專家系統可以將一組症狀縮小到可能的病因集，這通常是由醫生執行的任務。

### 18.3.1 提取知識
專家系統建立在其專業領域的預定義知識之上。因此，建立專家系統的第一步是從人類專家那裡提取知識。這個提取的知識成為知識庫。
從專家那裡提取知識通常是一項困難的任務，因為知識通常是啟發式的（基於機率而非確定性）和直覺的。知識提取過程通常由*知識工程師*完成。

### 18.3.2 提取事實
為了能夠推斷新事實或執行動作，除了知識庫外還需要事實資料庫。專家系統中的事實資料庫是基於案例的，其中收集或測量的事實被輸入系統供推論引擎使用。

### 18.3.3 架構
圖 18.7 顯示了專家系統架構背後的一般想法。專家系統最多可以有七個組件：使用者、使用者介面、推論引擎、知識庫、事實資料庫、解釋系統和知識庫編輯器。
**推論引擎**是專家系統的心臟。七個組件中的四個——使用者介面、推論引擎、解釋系統和知識庫編輯器——可以製作一次並用於許多應用程式，因為它們不依賴於特定的知識庫或事實資料庫。這些組件構成了**專家系統外殼**。

- **使用者介面**：允許使用者與系統互動。
- **推論引擎**：使用知識庫和事實資料庫來推斷動作。
- **知識庫**：基於專家訪談的規則集合。
- **事實資料庫**：使用者輸入的基於案例的資料。
- **解釋系統**：解釋決策背後的理由。
- **知識庫編輯器**：用於更新知識庫。

## 18.4 感知
人工智慧的目標之一是創造一台行為像普通人的機器。**感知**是理解透過感官（視覺、聽覺、觸覺、嗅覺、味覺）接收到的內容。智慧代理應該能夠感知它是否需要像人類一樣行動。AI 特別涉及兩種類型的感知，視覺和聽覺。

### 18.4.1 影像處理
**影像處理**或**電腦視覺**是 AI 的一個領域，處理透過代理的人造眼睛（如相機）對物體的感知。影像處理器從外部世界獲取二維影像，並試圖創建場景中存在的三維物體的描述。處理器使用包含物體特徵的資料庫進行比較。

**邊緣偵測**
影像處理的第一階段是**邊緣偵測**：找出影像中的邊緣在哪裡。邊緣可以定義物體與其背景之間的邊界。邊緣顯示表面、深度或照明的不連續性。可以透過尋找強度差異大的相鄰像素來偵測邊緣。

**分割**
**分割**是影像分析的下一個階段。分割將影像劃分為同質的區段或區域。同質區域是像素強度平滑變化的區域。分割找出物體內部不同區域之間的邊界。存在幾種方法，如*閾值化*、*分裂*和*合併*。

**尋找深度**
下一步是找出影像中物體的深度。深度尋找可以幫助智慧代理判斷物體離它有多遠。
- **立體視覺**：使用兩隻眼睛或兩台相機。如果物體很近，兩個影像不同；如果很遠，它們幾乎相同。
- **運動**：當一個或多個物體移動時創建多個影像。移動物體相對於其他物體的相對位置提供了距離的線索。

**尋找方向**
可以使用兩種技術找出場景中物體的方向：*陰影*和*紋理*。
- **陰影**：從表面反射的光量取決於表面相對於光源的方向。
- **紋理**：有規律重複的圖案可以幫助找出方向或曲率。

**物體辨識**
最後一步是**物體辨識**。為了辨識物體，代理需要在記憶體中有物體的模型進行比較。一種解決方案是假設物體是由一組簡單的**原始幾何形狀**（塊、圓柱體、圓錐體等）組成的複合體。當代理「看到」一個物體時，它試圖將物體分解為原始形狀的組合。

### 18.4.2 語言理解
人類固有的能力之一是理解——即解釋——他們感知到的音訊信號。能夠理解**自然語言**的機器非常有用。我們可以將任務分為四個連續步驟：語音辨識、句法分析、語意分析和語用分析。

**語音辨識**
第一步是**語音辨識**。分析語音信號（類比）並提取其中包含的單詞序列。信號需要被分成不同的聲音，有時稱為*音素*。

**句法分析**
**句法分析**步驟用於定義單詞如何在句子中分組。
- **文法**：正確分析句子的第一個工具是定義明確的文法。
- **解析器**：決定句子在文法（句法）上是否正確的機器不需要在拒絕句子為無效之前檢查所有可能的選擇。這是由**解析器**完成的，它根據文法規則創建**解析樹**。

**語意分析**
**語意分析**在句子經過句法分析後提取其含義。此分析創建了句子中涉及的物件、它們的關係及其屬性的表示。

**語用分析**
需要**語用分析**來進一步闡明句子的目的並消除歧義。
- **目的**：確定句子是請求、詢問等。
- **消除歧義**：解決單詞具有多種功能或含義，或句法正確的句子是無意義的情況下的歧義。

## 18.5 搜尋
人工智慧中解決問題的技術之一是**搜尋**。搜尋可以描述為使用一組**狀態**（一種情況）來解決問題。搜尋程序從**初始狀態**開始，經過**中間狀態**，直到最終達到**目標狀態**。搜尋過程使用的所有狀態的集合稱為**搜尋空間**。
範例：八數位推盤。

### 18.5.1 搜尋方法
有兩種一般的搜尋方法：*暴力*和*啟發式*。暴力方法本身又是*廣度優先*或*深度優先*。

**暴力搜尋**
如果我們對搜尋沒有任何先驗知識，我們使用**暴力搜尋**。
- **廣度優先搜尋**：我們從樹的根開始，檢查每一層的所有節點，然後再移動到下一層。這保證在解存在時找到解並找到最短路徑，但效率低。
- **深度優先搜尋**：我們從根開始，進行前向搜尋，直到達到目標或死胡同。如果我們遇到死胡同，我們**回溯**到最近的分支並再次進行前向搜尋。

**啟發式搜尋**
使用**啟發式搜尋**，我們為每個節點分配一個稱為**啟發式值 (h 值)** 的定量值。此定量值顯示節點與目標狀態的相對接近程度。例如，在八數位推盤中，啟發式值可以是方塊到達其目標位置所需的最小移動次數。我們從 *h* 值較小（更接近目標）的狀態開始，並以這種方式繼續。

## 18.6 神經網路
如果智慧代理要像人類一樣行為，它可能需要學習。大多數方法使用**歸納學習**或**範例學習**。這意味著給機器一大組問題及其解決方案以供學習。**神經網路**試圖使用神經元網路模擬人腦的學習過程。

### 18.6.1 生物神經元
人腦有數十億個處理單元，稱為**神經元**。神經元由三部分組成：**細胞體**、**軸突**和**樹突**。樹突充當輸入設備；軸突充當輸出設備。**突觸**是連接點。神經元可以處於兩種狀態之一：*興奮*（發射輸出）或*抑制*。

### 18.6.2 感知器
**感知器**是類似於單個生物神經元的人工神經元。它獲取一組加權輸入，對輸入求和，並將結果與**閾值**進行比較。如果結果高於閾值，感知器發射（輸出 1），否則不發射（輸出 0）。
$S = (x_1 \\cdot w_1 + x_2 \\cdot w_2 + ...)$
如果 $S > T$，則 $y = 1$；否則 $y = 0$。
可以透過根據已知範例的正確或錯誤輸出調整權重來訓練感知器。

### 18.6.3 多層網路
可以組合幾層感知器來創建**多層神經網路**。每層的輸出成為下一層的輸入。第一層是**輸入層**，中間層稱為**隱藏層**，最後一層是**輸出層**。

### 18.6.4 應用
當存在足夠的預先建立的輸入和輸出以訓練網路時，可以使用神經網路。應用包括**光學字元辨識 (OCR)** 和信用評估（建立信用評級）。

## 18.7 章末材料
### 18.7.1 推薦閱讀
- Cawsey, A. *The Essence of Artificial Intelligence*, Upper Saddle River, NJ: Prentice-Hall, 1998
- Luger, G. *Artificial Intelligence: Structures and Strategies for Complex Problem Solving*, Reading, MA: Addison-Wesley, 2004
- Winston, P. *Artificial Intelligence*, Reading, MA: Addison-Wesley, 1993
- Coppin, B. *Artificial Intelligence Illuminated*, Sudbury, MA: Jones and Bartlett, 2004
- Russel, S. and Norvig, P. *Artificial Intelligence: A Modern Approach*, Upper Saddle River, NJ: Prentice-Hall, 2003
- Dean, T. *Artificial Intelligence: Theory and Practice*, Redwood City, Reading, MA: Addison-Wesley, 2002

### 18.7.2 關鍵詞
- 人工智慧
- 軸突
- 暴力搜尋
- 廣度優先搜尋
- 深度優先搜尋
- 專家系統
- 框架
- 啟發式搜尋
- 影像處理
- 智慧代理
- LISP
- 神經網路
- 神經元
- 感知器
- 實體代理
- 語用分析
- 謂詞邏輯
- PROLOG
- 搜尋空間
- 分割
- 語意分析
- 語意網路
- 軟體代理
- 細胞體
- 語音辨識
- 突觸
- 句法分析
- 時序邏輯
- 閾值化
- 圖靈測試

### 18.7.3 摘要
- 人工智慧是研究能夠模擬人類活動（如感知、思考、學習和行動）的程式化系統的學科。圖靈測試比較人類和電腦的智慧行為。
- 智慧代理是一個感知其環境、從中學習並與之互動的系統。代理可以是軟體代理或實體代理（機器人）。
- 知識表示方法包括語意網路、框架、謂詞邏輯和規則型系統。語意網路使用圖形；框架使用資料結構。謂詞邏輯使用邏輯推理。規則型系統使用規則來推斷新事實。
- 專家系統執行通常需要人類專業知識的任務。它們從專家那裡提取知識並使用推論引擎做出決策。
- 感知涉及理解感官輸入。影像處理處理視覺感知（邊緣偵測、分割、深度尋找、物體辨識）。語言理解涉及語音辨識、句法分析、語意分析和語用分析。
- 搜尋是一種透過在搜尋空間中的狀態之間移動來解決問題的技術。暴力搜尋（廣度優先、深度優先）系統地探索。啟發式搜尋使用經驗法則更快地找到解決方案。
- 神經網路使用稱為感知器的人工神經元（通常排列在多層網路中）來模擬人腦的學習過程。它們透過範例學習（歸納學習）。

## 18.8 練習題
### 18.8.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 18.8.2 複習問題
1. 描述圖靈測試。您認為此測試可用於準確定義智慧系統嗎？
2. 定義智慧系統並列出兩大類代理。
3. 比較 LISP 和 PROLOG 在人工智慧中的使用。
4. 描述知識表示的需求並列出本章討論的四種不同方法。
5. 比較和對比謂詞邏輯和命題邏輯。
6. 比較和對比框架和語意網路。
7. 定義規則型系統並將其與語意網路進行比較。
8. 比較和對比專家系統和平凡系統。
9. 列出影像處理的不同步驟。
10. 列出語言處理的不同步驟。
11. 定義神經網路以及它如何模擬人類的學習過程。
12. 定義感知器。

### 18.8.3 問題
1. 畫一個語意網路來顯示以下之間的關係：醫生、家庭醫生、婦科醫生、實習生、工程師、會計師、Pascal 博士（一位法國家庭醫生）。
2. 將問題 P18-1 的語意網路表示為一組框架。
3. 使用符號 R 代表句子「正在下雨」，符號 S 代表句子「陽光普照」，用命題邏輯寫出以下每個英語句子：
   a. 沒有下雨。
   b. 沒有陽光普照。
   c. 既沒下雨也沒陽光普照。
   d. 正在下雨且陽光普照。
   e. 如果陽光普照，就沒有下雨。
   f. 如果正在下雨，就沒有陽光普照。
   g. 若且唯若沒有下雨時，陽光普照。
   h. 如果沒有下雨就是陽光普照，這不是真的。
4. 如果符號 C、W 和 H 分別表示「很冷」、「很溫暖」和「很熱」，寫出對應於以下命題邏輯陳述式的英語陳述：
   a. ¬H
   b. W ∨ H
   c. W ∧ H
   d. W ∧ (¬ H)
   e. ¬ (W ∧ H)
   f. W → H
   g. (¬ C) → W
   h. ¬ (W → H)
   i. H → (¬ W)
   j. ((¬C) ∧ H) ∨ (C ∨ (¬H))
5. 分別使用符號 Wh、Re、Gr 和 Fl 代表謂詞「是白色的」、「是紅色的」、「是綠色的」和「是一朵花」，用謂詞邏輯寫出以下句子：
   a. 有些花是白色的。
   b. 有些花不是紅色的。
   c. 並非所有花都是紅色的。
   d. 有些花是紅色或白色的。
   e. 沒有綠色的花。
   f. 沒有花是綠色的。
   g. 有些花不是白色的。
6. 分別使用符號 Has、Loves、Dog 和 Cat 代表謂詞「有」、「愛」、「是狗」和「是貓」，用謂詞邏輯寫出以下句子：
   a. John 有一隻貓。
   b. John 愛所有的貓。
   c. John 愛 Anne。
   d. Anne 愛一些狗。
   e. John 愛的不是所有東西都是貓。
   f. Anne 不喜歡一些貓。
   g. 如果 John 愛一隻貓，Anne 也愛它。
   h. 若且唯若 Anne 愛一隻貓時，John 才愛它。
7. 分別使用符號 Expensive、Cheap、Buys 和 Sells 代表謂詞「是昂貴的」、「是便宜的」、「買」和「賣」，用謂詞邏輯寫出以下句子：
   a. 所有東西都很貴。
   b. 所有東西都很便宜。
   c. Bob 買所有便宜的東西。
   d. John 賣一些昂貴的東西。
   e. 並非所有東西都很貴。
   f. 並非所有東西都很便宜。
   g. 如果某樣東西便宜，它就不貴。
8. 使用符號 Identical 代表謂詞「等同於」，用謂詞邏輯寫出以下句子。請注意，謂詞「equal」需要兩個引數：
   a. John 不是 Anne。
   b. John 存在。
   c. Anne 不存在。
   d. 某物存在。
   e. 沒有東西存在。
   f. 至少有兩樣東西。
9. 使用真值表找出以下論證是否有效：{P → Q, P} |- Q
10. 使用真值表找出以下論證是否有效：{P ∨ Q, P} |- Q
11. 使用真值表找出以下論證是否有效：{P ∧ Q, P} |- Q
12. 使用真值表找出以下論證是否有效：{P → Q, Q → R} |- (P → R)
13. 畫一個可以模擬 OR 閘的神經網路。
14. 畫一個可以模擬 AND 閘的神經網路。
15. 8 數位推盤的初始狀態和目標狀態如圖 18.25 所示。畫出解決該難題的啟發式搜尋樹。
16. 顯示圖 18.26 所示樹狀圖的廣度優先搜尋。
17. 顯示問題 P18-16 樹狀圖的深度優先搜尋。
18. 畫出圖 18.27 所示迷宮的樹狀圖。
19. 畫出樹狀圖並顯示問題 P18-18 的廣度優先搜尋。
20. 畫出樹狀圖並顯示問題 P18-18 的深度優先搜尋。
`,
};
