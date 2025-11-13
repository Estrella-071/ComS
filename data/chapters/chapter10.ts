
export const chapter10Content = {
  en: `
# Chapter 10: Software Engineering

In this chapter we introduce the concept of software engineering. We begin with the idea 
of the software lifecycle. We then show two models used for the development process: the 
waterfall model and the incremental model.

## Objectives
After studying this chapter, the student should be able to:
- Understand the concept of the software lifecycle in software engineering.
- Describe two major types of development process, the waterfall and incremental models.
- Understand the analysis phase and describe two separate approaches: procedure-oriented analysis and object-oriented analysis.
- Understand the design phase and describe two separate approaches: procedure-oriented design and object-oriented design.
- Describe the implementation and testing phases.
- Recognize the importance of documentation in software engineering.

## 10.1 THE SOFTWARE LIFECYCLE
Software, like many other products, goes through a cycle of repeating phases: development, use, and modification.

### 10.1.1 Development process models
- **The waterfall model**: The development process flows in only one direction. A phase cannot be started until the previous phase is completed.
- **The incremental model**: Software is developed in a series of steps. The developers first complete a simplified version of the whole system.

## 10.2 ANALYSIS PHASE
This phase results in a specification document that shows what the software will do without specifying how it will be done.
- **Procedure-oriented analysis**: Uses tools like data flow diagrams and entity-relationship diagrams.
- **Object-oriented analysis**: Uses tools like use-case diagrams and class diagrams.

## 10.3 DESIGN PHASE
The design phase defines how the system will accomplish what was defined in the analysis phase.
- **Procedure-oriented design**: The whole system is divided into a set of procedures or modules.
- **Object-oriented design**: Elaborates the details of classes, including attributes and methods.

## 10.4 IMPLEMENTATION PHASE
Programmers write the code for the modules or classes. Key issues include choice of language and software quality.
- **Software quality factors**: Operability, maintainability, and transferability.

## 10.5 TESTING PHASE
The goal of the testing phase is to find errors.
- **Glass-box testing (or white-box testing)**: Based on knowing the internal structure of the software.
- **Black-box testing**: Tests the functionality of the software without knowing what is inside it.

## 10.6 DOCUMENTATION
Documentation is an ongoing process. Three separate sets of documentation are prepared for software: user documentation, system documentation, and technical documentation.
`,
  zh: `
# 第十章：軟體工程

在本章中，我們介紹軟體工程的概念。我們從軟體生命週期的概念開始。然後，我們展示了用於開發過程的兩種模型：瀑布模型和增量模型。

## 學習目標
學完本章後，學生應能：
- 理解軟體工程中軟體生命週期的概念。
- 描述兩種主要的開發過程模型：瀑布模型和增量模型。
- 理解分析階段並描述兩種不同的方法：程序導向分析和物件導向分析。
- 理解設計階段並描述兩種不同的方法：程序導向設計和物件導向設計。
- 描述實作和測試階段。
- 認識到文件在軟體工程中的重要性。

## 10.1 軟體生命週期
軟體和許多其他產品一樣，會經歷一個重複階段的循環：開發、使用和修改。

### 10.1.1 開發過程模型
- **瀑布模型 (The waterfall model)**：開發過程只朝一個方向流動。一個階段必須在前一個階段完成後才能開始。
- **增量模型 (The incremental model)**：軟體分階段開發。開發人員首先完成整個系統的簡化版本。

## 10.2 分析階段
此階段產生一份規格文件，說明軟體將做什麼，但不指定如何做。
- **程序導向分析 (Procedure-oriented analysis)**：使用資料流程圖和實體關係圖等工具。
- **物件導向分析 (Object-oriented analysis)**：使用使用案例圖和類別圖等工具。

## 10.3 設計階段
設計階段定義系統將如何完成在分析階段定義的內容。
- **程序導向設計 (Procedure-oriented design)**：整個系統被劃分為一組程序或模組。
- **物件導向設計 (Object-oriented design)**：詳細闡述類別的細節，包括屬性和方法。

## 10.4 實作階段
程式設計師為模組或類別編寫程式碼。關鍵問題包括語言的選擇和軟體品質。
- **軟體品質因素**：可操作性、可維護性和可轉移性。

## 10.5 測試階段
測試階段的目標是找出錯誤。
- **玻璃箱測試（或稱白箱測試）(Glass-box testing (or white-box testing))**：基於了解軟體的內部結構。
- **黑箱測試 (Black-box testing)**：測試軟體的功能，而不知道其內部是什麼。

## 10.6 文件
文件是一個持續的過程。為軟體準備三套獨立的文件：使用者文件、系統文件和技術文件。
`,
};
