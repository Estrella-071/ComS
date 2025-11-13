
export const appendixHContent = {
  en: `
# Appendix H: Error Detection and Correction

When data is transferred, its accuracy must be checked.

## H.1 INTRODUCTION

### H.1.1 Types of errors
- **Single-bit error**: Only one bit in a data unit is changed.
- **Burst error**: Two or more bits in the data unit have changed.

### H.1.2 Redundancy
The central concept in detecting or correcting errors is **redundancy**. Extra bits are sent with the data to allow the receiver to check for and possibly correct errors.

## H.2 BLOCK CODING
A message is divided into blocks called **datawords**. Redundant bits are added to each dataword to create a **codeword**.

### H.2.1 Error detection
Errors can be detected if the received codeword is not a valid codeword.

### H.2.2 Error correction
Error correction is more difficult. It requires finding the original codeword from the (possibly corrupted) received codeword. This requires more redundant bits.

## H.3 LINEAR BLOCK CODES
A code in which the XOR of any two valid codewords creates another valid codeword.
- **Simple parity-check code**: A single parity bit is added to a dataword to make the total number of 1s either even or odd. It can detect an odd number of errors.
- **Hamming codes**: A family of error-correcting codes that can detect up to two-bit errors or correct one-bit errors.

## H.4 CYCLIC CODES
Special linear block codes where if a codeword is cyclically shifted (rotated), the result is another valid codeword.
- **Cyclic Redundancy Check (CRC)**: A common error-detecting code used in networks, based on binary polynomial division.

## H.5 CHECKSUM
An error detection method where the "sum" of the data words is sent along with the data. The receiver re-calculates the sum and checks if it matches. The Internet checksum uses one's complement arithmetic.
`,
  zh: `
# 附錄 H：錯誤偵測與更正

當資料傳輸時，必須檢查其準確性。

## H.1 簡介

### H.1.1 錯誤類型
- **單一位元錯誤 (Single-bit error)**：資料單元中只有一個位元被改變。
- **叢發錯誤 (Burst error)**：資料單元中有兩個或更多位元被改變。

### H.1.2 冗餘
偵測或更正錯誤的核心概念是**冗餘 (redundancy)**。額外的位元會與資料一起發送，以允許接收方檢查並可能更正錯誤。

## H.2 區塊編碼
訊息被分成稱為**資料字 (datawords)** 的區塊。冗餘位元被添加到每個資料字中以創建一個**碼字 (codeword)**。

### H.2.1 錯誤偵測
如果接收到的碼字不是一個有效的碼字，就可以偵測到錯誤。

### H.2.2 錯誤更正
錯誤更正更加困難。它需要從（可能已損壞的）接收碼字中找出原始碼字。這需要更多的冗餘位元。

## H.3 線性區塊碼
一種任何兩個有效碼字的 XOR 運算結果都是另一個有效碼字的編碼。
- **簡單同位檢查碼 (Simple parity-check code)**：將單個同位位元添加到資料字中，使 1 的總數為偶數或奇數。它可以偵測到奇數個錯誤。
- **漢明碼 (Hamming codes)**：一族可以偵測最多兩個位元錯誤或更正一個位元錯誤的錯誤更正碼。

## H.4 循環碼
特殊的線性區塊碼，如果一個碼字被循環移位（旋轉），結果是另一個有效的碼字。
- **循環冗餘檢查 (CRC)**：一種常用於網路中的錯誤偵測碼，基於二進位多項式除法。

## H.5 校驗和 (CHECKSUM)
一種錯誤偵測方法，其中資料字的「總和」與資料一起發送。接收方重新計算總和並檢查是否匹配。網際網路校驗和使用一的補數運算。
`,
};
