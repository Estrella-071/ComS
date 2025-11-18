
export const prefaceContent = {
  en: `
# Preface

Welcome to the C programming language and to C How to Program, Eighth Edition! This book presents leading-edge computing technologies for college students, instructors and software-development professionals.

At the heart of the book is the Deitel signature “live-code approach”—we present concepts in the context of complete working programs, rather than in code snippets. Each code example is followed by one or more sample executions. Read the online Before You Begin section at http://www.deitel.com/books/chtp8/chtp8_BYB.pdf to learn how to set up your computer to run the hundreds of code examples. All the source code is available at www.pearsonglobaleditions.com/deitel.

Use the source code we provide to run every program as you study it.

We believe that this book and its support materials will give you an informative, challenging and entertaining introduction to C. As you read the book, if you have questions, send an e-mail to deitel@deitel.com—we'll respond promptly. For book updates, visit www.deitel.com/books/chtp8/, join our social media communities:

*   Facebook®—http://facebook.com/DeitelFan
*   Twitter®—@deitel
*   LinkedIn®—http://linkedin.com/company/deitel-&-associates
*   YouTube™—http://youtube.com/DeitelTV
*   Google+™—http://google.com/+DeitelFan

and register for the Deitel® Buzz Online e-mail newsletter at: http://www.deitel.com/newsletter/subscribe.html

## New and Updated Features

Here are some key features of C How to Program, 8/e:

*   **Integrated More Capabilities of the C11 and C99 standards.** Support for the C11 and C99 standards varies by compiler. Microsoft Visual C++ supports a subset of the features that were added to C in C99 and C11—primarily the features that are also required by the C++ standard. We incorporated several widely supported C11 and C99 features into the book's early chapters, as appropriate for introductory courses and for the compilers we used in this book. Appendix E, Multithreading and Other C11 and C99 Topics, presents more advanced features (such as multithreading for today's increasingly popular multi-core architectures) and various other features that are not widely supported by today's C compilers.
*   **All Code Tested on Linux, Windows and OS X.** We retested all the example and exercise code using GNU gcc on Linux, Visual C++ on Windows (in Visual Studio 2013 Community Edition) and LLVM in Xcode on OS X.
*   **Updated Chapter 1.** The new Chapter 1 engages students with updated intriguing facts and figures to get them excited about studying computers and computer programming. The chapter includes current technology trends and hardware discussions, the data hierarchy, social networking and a table of business and technology publications and websites that will help you stay up to date with the latest technology news and trends. We've included updated test-drives that show how to run a command-line C program on Linux, Microsoft Windows and OS X. We also updated the discussions of the Internet and web, and the introduction to object technology.
*   **Updated Coverage of C++ and Object-Oriented Programming.** We updated Chapters 15–23 on object-oriented programming in C++ with material from our textbook C++ How to Program, 9/e, which is up-to-date with the C++11 standard.
*   **Updated Code Style.** We removed the spacing inside parentheses and square brackets, and toned down our use of comments a bit. We also added parentheses to certain compound conditions for clarity.
*   **Variable Declarations.** Because of improved compiler support, we were able to move variable declarations closer to where they're first used and define for-loop counter-control variables in each for's initialization section.
*   **Summary Bullets.** We removed the end-of-chapter terminology lists and updated the detailed section-by-section, bullet-list summaries with bolded key terms and, for most, page references to their defining occurrences.
*   **Use of Standard Terminology.** To help students prepare to work in industry worldwide, we audited the book against the C standard and upgraded our terminology to use C standard terms in preference to general programming terms.
*   **Online Debugger Appendices.** We've updated the online GNU gdb and Visual C++® debugging appendices, and added an Xcode® debugging appendix.
*   **Additional Exercises.** We updated various exercises and added some new ones, including one for the Fisher-Yates unbiased shuffling algorithm in Chapter 10.

## Other Features

Other features of C How to Program, 8/e include:

*   **Secure C Programming Sections.** Many of the C chapters end with a Secure C Programming Section. We've also posted a Secure C Programming Resource Center at www.deitel.com/SecureC/.
*   **Focus on Performance Issues.** C (and C++) are favored by designers of performance-intensive systems such as operating systems, real-time systems, embedded systems and communications systems, so we focus intensively on performance issues.
*   **"Making a Difference" Contemporary Exercises.** We encourage you to use computers and the Internet to research and solve significant problems. These exercises are meant to increase awareness of important issues the world is facing.
*   **Sorting: A Deeper Look.** We begin our sorting presentation in Chapter 6 with a simple algorithm—in Appendix D, we present a deeper look. We consider several algorithms and compare them with regard to their memory consumption and processor demands.
*   **Titled Programming Exercises.** Most of the programming exercises are titled to help instructors conveniently choose assignments appropriate for their students.
*   **Order of Evaluation.** We caution the reader about subtle order of evaluation issues.
*   **C++-Style // Comments.** We use the newer, more concise C++-style \`//\` comments in preference to C's older style \`/*...*/\` comments.

## A Note About Secure C Programming
Industrial-strength coding techniques in any programming language are beyond the scope of an introductory textbook. For that reason, our Secure C Programming sections present some key issues and techniques, and provide links and references so you can continue learning.

The CERT® Coordination Center (www.cert.org) was created to analyze and respond promptly to attacks. CERT—the Computer Emergency Response Team—publishes and promotes secure coding standards to help C programmers and others implement industrial-strength systems that avoid the programming practices that leave systems vulnerable to attacks. The CERT standards evolve as new security issues arise.

We've upgraded our code (as appropriate for an introductory book) to conform to various CERT recommendations. The Secure C Programming sections at the ends of Chapters 2–13 discuss many important topics, including:
*   testing for arithmetic overflows
*   using unsigned integer types
*   the more secure functions in the C standard's Annex K
*   the importance of checking the status information returned by standard-library functions
*   range checking
*   secure random-number generation
*   array bounds checking
*   preventing buffer overflows
*   input validation
*   avoiding undefined behaviors
*   choosing functions that return status information vs. using similar functions that do not
*   ensuring that pointers are always NULL or contain valid addresses
*   using C functions vs. using preprocessor macros, and more.

## Software Used in C How to Program, 8/e
We tested the programs in C How to Program, 8/e using the following free compilers:
*   GNU C and C++ (http://gcc.gnu.org/install/binaries.html)
*   Microsoft's Visual C++ in Visual Studio 2013 Community edition (http://go.microsoft.com/?linkid=9863608)
*   LLVM in Apple's Xcode IDE
`,
  zh: `
# 前言

歡迎來到 C 程式語言與《C 語言程式設計》第八版！本書為大學生、教師和軟體開發專業人士介紹前沿的計算機技術。

本書的核心是 Deitel 標誌性的「實時代碼方法」(live-code approach)——我們在完整的、可運行的程式上下文中呈現概念，而不是零碎的程式碼片段。每個程式碼範例後都附有一個或多個範例執行結果。請閱讀線上的「開始之前」部分 (http://www.deitel.com/books/chtp8/chtp8_BYB.pdf)，以了解如何設定您的電腦來運行數百個程式碼範例。所有原始碼都可以在 www.pearsonglobaleditions.com/deitel 下載。

在您學習的過程中，使用我們提供的原始碼來運行每一個程式。

我們相信，本書及其支援材料將為您提供一個資訊豐富、具挑戰性且有趣的 C 語言入門。在閱讀本書時，如果您有任何問題，請發送電子郵件至 deitel@deitel.com——我們會迅速回覆。有關書籍更新，請訪問 www.deitel.com/books/chtp8/，或加入我們的社群媒體：

*   Facebook®—http://facebook.com/DeitelFan
*   Twitter®—@deitel
*   LinkedIn®—http://linkedin.com/company/deitel-&-associates
*   YouTube™—http://youtube.com/DeitelTV
*   Google+™—http://google.com/+DeitelFan

並在以下網址註冊 Deitel® Buzz 線上電子報：http://www.deitel.com/newsletter/subscribe.html

## 新增與更新功能

以下是《C 語言程式設計》第八版的一些主要特色：

*   **整合更多 C11 和 C99 標準的功能。** C11 和 C99 標準的支援因編譯器而異。Microsoft Visual C++ 支援 C99 和 C11 中新增的一部分功能——主要是那些 C++ 標準也要求的功能。我們已將幾個廣泛支援的 C11 和 C99 特性納入本書的早期章節，以適用於入門課程和我們在本書中使用的編譯器。附錄 E「多執行緒與其他 C11 和 C99 主題」介紹了更進階的功能（例如適用於現今日益流行的多核心架構的多執行緒）以及其他當今 C 編譯器尚未廣泛支援的各種功能。
*   **所有程式碼皆在 Linux、Windows 和 OS X 上測試通過。** 我們在 Linux 上使用 GNU gcc、在 Windows 上使用 Visual C++（在 Visual Studio 2013 社群版中）以及在 OS X 上的 Xcode 中使用 LLVM，重新測試了所有的範例和練習程式碼。
*   **更新第一章。** 新的第一章透過更新的趣聞和數據來吸引學生，讓他們對學習電腦和電腦程式設計感到興奮。本章包括當前的技術趨勢和硬體討論、資料階層、社交網路以及一個商業和技術出版物與網站的表格，這將幫助您隨時了解最新的技術新聞和趨勢。我們還包括了更新的試駕，展示如何在 Linux、Microsoft Windows 和 OS X 上運行命令列 C 程式。我們也更新了關於網際網路和網路的討論，以及物件技術的介紹。
*   **更新 C++ 和物件導向程式設計的內容。** 我們根據我們的教科書《C++ 程式設計》第九版的內容更新了關於 C++ 物件導向程式設計的第 15-23 章，該書內容與 C++11 標準保持同步。
*   **更新程式碼風格。** 我們移除了括號和方括號內的空格，並稍微減少了註解的使用。我們也為某些複合條件添加了括號以增加清晰度。
*   **變數宣告。** 由於編譯器支援的改進，我們能夠將變數宣告移至更靠近其首次使用的位置，並在每個 for 迴圈的初始化部分定義 for 迴圈的計數器控制變數。
*   **摘要重點。** 我們移除了章末的術語列表，並更新了詳細的、分節的重點摘要，其中包含粗體的關鍵術語，並且對於大多數術語，還附有其定義出現的頁碼參考。
*   **使用標準術語。** 為幫助學生準備在全球產業中工作，我們對照 C 標準審核了本書，並升級了我們的術語，優先使用 C 標準術語而非一般程式設計術語。
*   **線上除錯器附錄。** 我們更新了線上的 GNU gdb 和 Visual C++® 除錯附錄，並新增了 Xcode® 除錯附錄。
*   **額外練習題。** 我們更新了各種練習題並新增了一些新的題目，包括一個關於第十章中 Fisher-Yates 無偏洗牌演算法的練習。

## 其他特色

《C 語言程式設計》第八版的其他特色包括：

*   **安全 C 程式設計章節。** 許多 C 語言章節的結尾都有一個安全 C 程式設計章節。我們也在 www.deitel.com/SecureC/ 上發布了一個安全 C 程式設計資源中心。
*   **專注於性能問題。** C (和 C++) 受到性能密集型系統（如作業系統、即時系統、嵌入式系統和通訊系統）設計師的青睞，因此我們深入關注性能問題。
*   **「創造不同」的當代練習題。** 我們鼓勵您使用電腦和網際網路來研究和解決重要問題。這些練習旨在提高對世界面臨的重要議題的認識。
*   **排序：深入探討。** 我們在第六章以一個簡單的演算法開始介紹排序——在附錄 D 中，我們提供了更深入的探討。我們考慮了幾種演算法，並比較了它們在記憶體消耗和處理器需求方面的表現。
*   **標題化的程式設計練習。** 大多數程式設計練習都有標題，以幫助教師方便地為學生選擇合適的作業。
*   **求值順序。** 我們提醒讀者注意微妙的求值順序問題。
*   **C++ 風格的 // 註解。** 我們優先使用更新、更簡潔的 C++ 風格的 \`//\` 註解，而不是 C 的舊式 \`/*...*/\` 註解。

## 關於安全 C 程式設計的說明
任何程式語言的工業級編碼技術都超出了入門教科書的範圍。因此，我們的「安全 C 程式設計」部分介紹了一些關鍵問題和技術，並提供連結和參考資料，以便您繼續學習。

CERT® 協調中心 (www.cert.org) 的創建是為了分析和迅速應對攻擊。CERT——電腦緊急應變小組——發布並推廣安全編碼標準，以幫助 C 程式設計師和其他人實施能夠避免使系統易受攻擊的程式設計實踐的工業級系統。隨著新安全問題的出現，CERT 標準也在不斷演進。

我們已經（在適合入門書籍的範圍內）升級了我們的程式碼以符合各種 CERT 的建議。第 2-13 章末尾的「安全 C 程式設計」部分討論了許多重要主題，包括：
*   測試算術溢位
*   使用無符號整數類型
*   C 標準附件 K 中更安全的函式
*   檢查標準函式庫函式回傳的狀態資訊的重要性
*   範圍檢查
*   安全隨機數生成
*   陣列邊界檢查
*   防止緩衝區溢位
*   輸入驗證
*   避免未定義行為
*   選擇回傳狀態資訊的函式 vs. 使用不回傳的類似函式
*   確保指標始終為 NULL 或包含有效位址
*   使用 C 函式 vs. 使用前置處理器巨集，等等。

## 《C 語言程式設計》第八版使用的軟體
我們使用以下免費編譯器測試了《C 語言程式設計》第八版中的程式：
*   GNU C 和 C++ (http://gcc.gnu.org/install/binaries.html)
*   Microsoft Visual C++ in Visual Studio 2013 社群版 (http://go.microsoft.com/?linkid=9863608)
*   Apple Xcode IDE 中的 LLVM
`,
};
