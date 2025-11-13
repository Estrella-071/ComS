
export const chapter3Content = {
  en: `
# Chapter 3: Data Storage

As discussed in Chapter 1, a computer is a programmable data processing machine. Before 
we can talk about processing data, we need to understand the nature of data. In this 
chapter we discuss different data types and how they are stored inside a computer. 
In Chapter 4, we show how data is manipulated inside a computer. 

## Objectives
After studying this chapter, the student should be able to:
- List five different data types used in a computer.
- Describe how different data is stored inside the computer as bit patterns.
- Describe how integers are stored in a computer using unsigned format. 
- Describe how integers are stored in a computer using sign-and-magnitude format.
- Describe how integers are stored in two’s complement format.
- Describe how reals are stored in a computer using floating-point format.
- Describe how text is stored in a computer using one of the various encoding systems.
- Describe how audio is stored in a computer using sampling, quantization, and encoding. 
- Describe how images are stored in a computer using raster and vector graphics schemes. 
- Describe how video is stored in a computer as a representation of images changing in time. 

## 3.1 DATA TYPES
Data today come in different forms including numbers, text, audio, images, and video.
The computer industry uses the term ‘multimedia’ to define information that contains numbers, text, audio, images, and video.

### 3.1.1 Data inside the computer
All data types are transformed into a uniform representation when they are stored in a 
computer and transformed back to their original form when retrieved. This universal 
representation is called a **bit pattern**.
- **Bits**: A bit (binary digit) is the smallest unit of data that can be stored in a computer and has a value of 0 or 1.
- **Bit patterns**: To represent different types of data, we use a bit pattern, a sequence of bits. A bit pattern with eight bits is called a **byte**.

## 3.2 STORING NUMBERS
A number is changed to the binary system before being stored in the computer memory. Two issues that need to be handled are storing the sign and showing the decimal point. Computers use **fixed-point** and **floating-point** representations.

### 3.2.1 Storing integers
Integers are whole numbers and are normally stored using fixed-point representation.
- **Unsigned representation**: An unsigned integer is an integer that can never be negative. In an n-bit memory location we can only store an unsigned integer between 0 and 2ⁿ − 1.
- **Sign-and-magnitude representation**: The leftmost bit defines the sign (0 for positive, 1 for negative). The range of numbers that can be stored in an n-bit location is −(2ⁿ⁻¹ −1) to +(2ⁿ⁻¹ −1). There are two 0s in sign-and-magnitude representation: +0 and −0.
- **Two’s complement representation**: Almost all computers use this representation to store a signed integer. If the leftmost bit is 0, the integer is positive. If it is 1, the integer is negative. There is only one zero in two’s complement notation.

### 3.2.3 Storing reals
A real is a number with an integral part and a fractional part.
- **Floating-point representation**: This representation allows the decimal point to float. A number is made up of three sections: a sign, a shifter (exponent), and a fixed-point number (mantissa).
- **Normalization**: To make the fixed part of the representation uniform, both the scientific method and the floating-point method use only one non-zero digit on the left of the decimal point.
- **IEEE standards**: The Institute of Electrical and Electronics Engineers (IEEE) has defined several standards for storing floating-point numbers, including single precision (Excess_127) and double precision (Excess_1023).

## 3.3 STORING TEXT
A section of text is a sequence of symbols. Each symbol is represented by a bit pattern using a code.
- **ASCII**: American Standard Code for Information Interchange. This code uses seven bits for each symbol.
- **Unicode**: A code that uses 32 bits and can therefore represent up to 2³² symbols.

## 3.4 STORING AUDIO
Audio is a representation of sound or music. It is analog data. To store audio, it needs to be sampled, quantized, and encoded.
- **Sampling**: Selecting a finite number of points on the analog signal and measuring their values.
- **Quantization**: A process that rounds the value of a sample to the closest integer value.
- **Encoding**: The quantized sample values need to be encoded as bit patterns.

## 3.5 STORING IMAGES
Images are stored in computers using two different techniques: raster graphics and vector graphics.
- **Raster graphics (or bitmap graphics)**: Used to store an analog image such as a photograph. The image is divided into pixels.
- **Vector graphics**: The image is decomposed into a combination of geometrical shapes such as lines, squares, or circles.

## 3.6 STORING VIDEO
Video is a representation of images (called frames) over time. Each image or frame is transformed into a set of bit patterns and stored.
`,
  zh: `
# 第三章：資料儲存

如第一章所述，電腦是一種可程式化的資料處理機器。在我們討論處理資料之前，我們需要了解資料的本質。本章我們將討論不同的資料類型以及它們如何儲存在電腦內部。在第四章，我們將展示資料如何在電腦內部被操作。

## 學習目標
學完本章後，學生應能：
- 列舉電腦中使用的五種不同資料類型。
- 描述不同的資料如何以位元模式儲存在電腦內部。
- 描述整數如何使用無符號格式儲存在電腦中。
- 描述整數如何使用符號與數值格式儲存在電腦中。
- 描述整數如何以二的補數格式儲存。
- 描述實數如何使用浮點數格式儲存在電腦中。
- 描述文字如何使用各種編碼系統之一儲存在電腦中。
- 描述音訊如何透過取樣、量化和編碼儲存在電腦中。
- 描述圖像如何使用點陣圖和向量圖形方案儲存在電腦中。
- 描述影像如何以隨時間變化的圖像表示形式儲存在電腦中。

## 3.1 資料類型
今日的資料以不同形式存在，包括數字、文字、音訊、圖像和影像。
電腦產業使用「多媒體」一詞來定義包含數字、文字、音訊、圖像和影像的資訊。

### 3.1.1 電腦內部的資料
所有資料類型在儲存於電腦時都會被轉換為統一的表示形式，並在檢索時轉換回其原始形式。這種通用表示形式稱為**位元模式**。
- **位元（Bits）**：位元（二進位數字）是電腦中可儲存的最小資料單位，值為 0 或 1。
- **位元模式（Bit patterns）**：為了表示不同類型的資料，我們使用位元模式，即位元的序列。一個八位元的位元模式稱為一個**位元組（byte）**。

## 3.2 儲存數字
數字在儲存到電腦記憶體之前會被轉換為二進位系統。需要處理的兩個問題是儲存正負號和表示小數點。電腦使用**定點數**和**浮點數**表示法。

### 3.2.1 儲存整數
整數是整數，通常使用定點數表示法儲存。
- **無符號表示法**：無符號整數是永遠不會為負的整數。在一個 n 位元的記憶體位置中，我們只能儲存 0 到 2ⁿ − 1 之間的無符號整數。
- **符號與數值表示法**：最左邊的位元定義正負號（0 為正，1 為負）。在 n 位元位置中可儲存的數字範圍是 −(2ⁿ⁻¹ −1) 到 +(2ⁿ⁻¹ −1)。符號與數值表示法中有兩個 0：+0 和 −0。
- **二的補數表示法**：幾乎所有電腦都使用這種表示法來儲存有符號整數。如果最左邊的位元是 0，則整數為正。如果是 1，則整數為負。二的補數表示法中只有一個零。

### 3.2.3 儲存實數
實數是帶有整數部分和小數部分的數字。
- **浮點數表示法**：這種表示法允許小數點浮動。一個數字由三個部分組成：一個正負號、一個移位器（指數）和一個定點數（尾數）。
- **正規化**：為了使表示的定點部分統一，科學記數法和浮點數方法都在小數點左邊只使用一個非零數字。
- **IEEE 標準**：電機電子工程師學會（IEEE）定義了幾種儲存浮點數的標準，包括單精度（Excess_127）和雙精度（Excess_1023）。

## 3.3 儲存文字
一段文字是符號的序列。每個符號都使用一種代碼由位元模式表示。
- **ASCII**：美國資訊交換標準碼。此代碼為每個符號使用七個位元。
- **Unicode**：一種使用 32 位元的代碼，因此可以表示高達 2³² 個符號。

## 3.4 儲存音訊
音訊是聲音或音樂的表示。它是類比資料。要儲存音訊，需要對其進行取樣、量化和編碼。
- **取樣（Sampling）**：在類比信號上選擇有限數量的點並測量其值。
- **量化（Quantization）**：將樣本值四捨五入到最接近的整數值的過程。
- **編碼（Encoding）**：量化後的樣本值需要被編碼為位元模式。

## 3.5 儲存圖像
圖像在電腦中使用兩種不同的技術儲存：點陣圖形和向量圖形。
- **點陣圖形（或稱位圖）**：用於儲存像照片這樣的類比圖像。圖像被劃分為像素。
- **向量圖形**：圖像被分解為幾何形狀（如線條、正方形或圓形）的組合。

## 3.6 儲存影像
影像是一段時間內圖像（稱為影格）的表示。每個圖像或影格都被轉換為一組位元模式並儲存起來。
`,
};
