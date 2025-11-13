
export const appendixJContent = {
  en: `
# Appendix J: Addition and Subtraction for Reals

Addition and subtraction for real numbers stored in floating-point format are discussed in this appendix.

## J.1 OPERATIONS ON REALS

All arithmetic operations can be applied to reals stored in floating-point format. Addition and subtraction are reduced to addition and subtraction of two integers stored in sign-and-magnitude (the sign and mantissa) after the alignment of decimal points.

The simplified procedure works as follows:
1.  If any of the two numbers (A or B) is zero, the result is the other number.
2.  For subtraction (A - B), change the sign of B and perform addition.
3.  **Denormalize** both numbers: include the hidden '1' bit in the mantissa.
4.  **Align the exponents**: The number with the smaller exponent must be adjusted. Its mantissa is shifted right, and its exponent is incremented, until the exponents of both numbers are equal.
5.  **Add/Subtract the mantissas**: Treat the signs and mantissas as two sign-and-magnitude integers and perform the addition/subtraction.
6.  **Normalize the result**: The resulting mantissa is shifted and the exponent is adjusted until the number is in normalized form (with a single '1' before the binary point). This may also involve rounding if the mantissa has too many bits.
`,
  zh: `
# 附錄 J：實數的加減法

本附錄討論以浮點格式儲存的實數的加法和減法。

## J.1 實數運算

所有算術運算都可以應用於以浮點格式儲存的實數。在對齊小數點後，加法和減法被簡化為對兩個以符號與數值（符號和尾數）儲存的整數進行加法和減法。

簡化的程序如下：
1.  如果兩個數字（A 或 B）中有任何一個為零，則結果是另一個數字。
2.  對於減法 (A - B)，改變 B 的符號並執行加法。
3.  **非正規化**兩個數字：在尾數中包含隱藏的 '1' 位元。
4.  **對齊指數**：必須調整指數較小的數字。其尾數向右移動，指數遞增，直到兩個數字的指數相等。
5.  **加/減尾數**：將符號和尾數視為兩個符號與數值整數，並執行加/減法。
6.  **正規化結果**：對產生的尾數進行移位並調整指數，直到數字處於正規化形式（在二進位點前只有一個 '1'）。如果尾數位數過多，這也可能涉及四捨五入。
`,
};
