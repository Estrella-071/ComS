
export const appendixIContent = {
  en: `
# Appendix I: Addition and Subtraction for Sign-and-Magnitude Integers

Addition and subtraction for sign-and-magnitude integers are more involved than for two's complement integers.

## I.1 OPERATIONS ON INTEGERS

The process can be broken down based on the signs of the two numbers, A and B.
- **Subtraction**: To compute A - B, we can change the sign of B and perform addition.

### For Addition (A + B)
1.  **If the signs are the same (Aₛ = Bₛ)**:
    - The result's sign is the same as the common sign (Rₛ = Aₛ).
    - The result's magnitude is the sum of the magnitudes (Rₘ = Aₘ + Bₘ).
    - Check for overflow if the sum of magnitudes requires more bits than allocated.

2.  **If the signs are different (Aₛ ≠ Bₛ)**:
    - Compare the magnitudes Aₘ and Bₘ.
    - The result's magnitude is the difference between the larger and smaller magnitude. This is often done by taking the two's complement of the smaller magnitude and adding it to the larger one.
    - The result's sign is the sign of the number with the larger magnitude.
`,
  zh: `
# 附錄 I：符號與數值整數的加法和減法

符號與數值整數的加法和減法比二的補數整數更複雜。

## I.1 整數運算

此過程可根據兩個數字 A 和 B 的正負號進行分解。
- **減法**：要計算 A - B，我們可以改變 B 的正負號並執行加法。

### 對於加法 (A + B)
1.  **如果符號相同 (Aₛ = Bₛ)**：
    - 結果的符號與共同的符號相同 (Rₛ = Aₛ)。
    - 結果的數值是兩個數值的總和 (Rₘ = Aₘ + Bₘ)。
    - 如果數值的總和需要比分配的位元更多的位元，則檢查是否溢位。

2.  **如果符號不同 (Aₛ ≠ Bₛ)**：
    - 比較數值 Aₘ 和 Bₘ。
    - 結果的數值是較大數值與較小數值之間的差。這通常是透過取較小數值的二的補數並將其加到較大數值上來完成。
    - 結果的符號是數值較大的數字的符號。
`,
};
