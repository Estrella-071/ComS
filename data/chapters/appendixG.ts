
export const appendixGContent = {
  en: `
# Appendix G: Mathematical Review

This appendix reviews some mathematical concepts relevant to the book.

## G.1 EXPONENT AND LOGARITHM

### G.1.1 Exponential functions
The exponential function with base *a* is defined as *a*ˣ. Common bases are 10, *e* (the natural base), and 2. Key properties include:
- a⁰ = 1
- a¹ = a
- a⁻ˣ = 1 / aˣ
- aˣ⁺ʸ = aˣ × aʸ
- aˣ⁻ʸ = aˣ / aʸ
- (aˣ)ʸ = aˣʸ

### G.1.2 Logarithmic function
The logarithmic function is the inverse of the exponential function:
y = aˣ ↔ x = logₐ y
- **Base transformation**: logₐ y = logᵦ y / logᵦ a
- Key properties include:
  - logₐ (x × y) = logₐ x + logₐ y
  - logₐ (x / y) = logₐ x - logₐ y
  - logₐ (xʸ) = y × logₐ x

## G.2 MODULAR ARITHMETIC

Modular arithmetic deals with the remainder (residue) of a division operation.

### G.2.1 The modulo operator
The operation *a* mod *n* gives the remainder when *a* is divided by *n*.

### G.2.2 Arithmetic operations
Addition, subtraction, and multiplication can be performed in modular arithmetic. The result is always brought back into the range [0, n-1] by applying the mod n operation.
- (a + b) mod n
- (a - b) mod n
- (a × b) mod n

## G.3 DISCRETE COSINE TRANSFORM (DCT)
The DCT is a mathematical transform used in JPEG image compression. It changes a block of pixel values into a block of frequency coefficients, separating the image's average color (DC component) from the detail information (AC components).
`,
  zh: `
# 附錄 G：數學複習

本附錄複習一些與本書相關的數學概念。

## G.1 指數與對數

### G.1.1 指數函數
以 *a* 為底的指數函數定義為 *a*ˣ。常見的底數有 10、*e*（自然底數）和 2。主要性質包括：
- a⁰ = 1
- a¹ = a
- a⁻ˣ = 1 / aˣ
- aˣ⁺ʸ = aˣ × aʸ
- aˣ⁻ʸ = aˣ / aʸ
- (aˣ)ʸ = aˣʸ

### G.1.2 對數函數
對數函數是指數函數的反函數：
y = aˣ ↔ x = logₐ y
- **換底公式**：logₐ y = logᵦ y / logᵦ a
- 主要性質包括：
  - logₐ (x × y) = logₐ x + logₐ y
  - logₐ (x / y) = logₐ x - logₐ y
  - logₐ (xʸ) = y × logₐ x

## G.2 模數運算

模數運算處理除法運算的餘數。

### G.2.1 模數運算子
運算 *a* mod *n* 給出 *a* 除以 *n* 的餘數。

### G.2.2 算術運算
可以在模數運算中執行加法、減法和乘法。結果總是透過應用 mod n 運算回到 [0, n-1] 的範圍內。
- (a + b) mod n
- (a - b) mod n
- (a × b) mod n

## G.3 離散餘弦轉換 (DCT)
DCT 是一種用於 JPEG 影像壓縮的數學轉換。它將一塊像素值轉換為一塊頻率係數，將影像的平均顏色（DC 分量）與細節資訊（AC 分量）分開。
`,
};
