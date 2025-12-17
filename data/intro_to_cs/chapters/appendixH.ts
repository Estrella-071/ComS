
export const appendixHContent = {
  en: `
# Appendix H: Error Detection and Correction

When data is transferred from one place to another, or moved from one device to another, the accuracy of the data must be checked. For most applications, a system must guarantee that the data received is identical to the data transmitted. Some applications, on the other hand, can tolerate a small level of error. For example, random errors in audio or video transmissions may be tolerable, but when we transfer text, we expect a very high level of accuracy. We only discuss error in transition: errors due to data corruption in storage are treated in the same way.

## H.1 INTRODUCTION
We first discuss some issues related to error detection and correction.

### H.1.1 Types of errors
Whenever bits flow from one place to another they are subject to unpredictable changes because of interference in the transmission medium, such as crosstalk, external electromagnetic fields, and so on. This is illustrated by Figure H.1.

In a **single-bit error**, a 0 is changed to a 1 or a 1 to a 0. In a **burst error** multiple bits are changed. The term **single-bit error** means that only 1 bit of a given data unit, such as a byte, character, or packet, is changed from 1 to 0 or from 0 to 1. The term **burst error** means that two or more bits in the data unit have changed from 1 to 0 or from 0 to 1.

### H.1.2 Redundancy
The central concept in correcting errors is **redundancy**. To be able to correct errors, we need to send extra bits with our data. These redundant bits are added by the sender and removed by the receiver. Their presence allows the receiver to correct corrupted bits.

**To correct errors, we need to send extra (redundant) bits with data.**

### H.1.3 Detection versus correction
The correction of errors is more difficult than the detection. In **error detection**, we are looking only to see if an error has occurred. The answer is a simple yes or no. We are not even interested in the number of errors: a single-bit error is the same for us as a burst error.

In **error correction**, we need to know the exact number of bits that are corrupted—and more importantly, their location in the message. The number of errors and the size of the message are important factors. If we need to correct a single error in an 8-bit data unit, we need to consider eight possible error locations: if we need to correct two errors in a data unit of the same size, we need to consider 28 (7 + 6 + ... + 1) possibilities. You can imagine the receiver’s difficulty in finding ten errors in a data unit of 1000 bits.

### H.1.4 Forward error correction versus retransmission
There are two main methods of error correction. **Forward error correction** is the process in which the receiver tries to guess the message by using redundant bits. This is possible, as we will see later, if the number of errors is small. Correction by **retransmission** is a technique in which the receiver detects the occurrence of an error and asks the sender to resend the message. Re-sending is repeated until a message arrives that the receiver believes is error-free: usually, not all errors can be detected.

### H.1.5 Coding
Redundancy is achieved through various coding schemes. The sender adds redundant bits through a process that creates a relationship between the redundant bits and the actual data bits. The receiver checks the relationships between the two sets of bits to detect or correct the errors. The ratio of redundant bits to data bits and the robustness of the process are important factors in any coding scheme. Figure H.2 shows the general idea of coding.

We can divide coding schemes into two broad categories: **block coding** and **convolution coding**. In this appendix, we concentrate on block coding: convolution coding is more complex and beyond the scope of this book.
Block coding uses modular arithmetic, as discussed in Appendix G.

**We only concentrate on block codes: we leave convolution codes to advanced texts.**

## H.2 BLOCK CODING
In **block coding** we divide a message into blocks, each of $k$ bits, called **datawords**. We add $r$ redundant bits to each block to make the length $n = k + r$. The resulting $n$-bit blocks are called **codewords**. How the extra $r$ bits are chosen or calculated is something we discuss later. For the moment, it is important to know that we have a set of datawords, each of size $k$, and a set of codewords, each of size of $n$.

With $k$ bits, we can create a combination of $2^k$ datawords: with $n$ bits, we can create a combination of $2^n$ codewords. Since $n > k$, the number of possible codewords is larger than the number of possible datawords. The block coding process is one-to-one: the same dataword is always encoded as the same codeword. This means that we have $2^n - 2^k$ codewords that are not used. We call these codewords **invalid** or **illegal**. Figure H.3 shows the situation.

**Example H.1**
Let us assume our message is made up of a single block of 8 bits ($k = 8$). There are $2^8 = 256$ possible combination of datawords. If we add two redundant bits ($r = 1$), then each possible codeword is 10 bits ($n = 10$) and the total number of possible codewords is $2^{10} = 1024$. This means that we have $1024 - 256 = 768$ codewords are invalid. If one of these invalid codewords is received, the receiver knows that the codeword is corrupted.

### H.2.1 Error detection
How can errors be detected by using block coding? If the following two conditions are met, the receiver detects a change in the original codeword.
1.  The receiver has (or can find) a list of valid codewords.
2.  The original codeword has changed to an invalid one.
Figure H.4 shows the role of block coding in error detection.

The sender creates codewords out of datawords by using a generator that applies the rules and procedures of encoding (discussed later). Each codeword sent to the receiver may change during transmission. If the received codeword is the same as one of the valid codewords, the word is accepted and the corresponding dataword is extracted for use. If the received codeword is not valid, it is discarded.
However, if the codeword is corrupted during transmission, but the received word still matches a valid codeword, the error remains undetected. This type of coding can therefore detect only single errors: two or more errors in the same codeword may remain undetected.

**Example H.2**
Let us assume that $k = 2$ and $n = 3$. Table H.1 shows the list of datawords and defined codewords, which is agreed between the sender and the receiver. Later we will see how to derive a codeword from a dataword.

**Table H.1 A code for error detection (Example H.2)**
| Datawords | Codewords |
| :--- | :--- |
| 00 | 000 |
| 01 | 011 |
| 10 | 101 |
| 11 | 110 |

Assume that the sender encodes the dataword 01 as 011 and sends it to the receiver. Consider the following cases:
1.  The receiver receives 011. It is a valid codeword. The receiver extracts the dataword 01 from it.
2.  The codeword is corrupted during transmission, and 111 is received—that is, the leftmost bit is corrupted. This is not a valid codeword, so it is discarded.
3.  The codeword is corrupted during transmission, and 000 is received—that is, the right two bits are corrupted. This is a valid codeword. The receiver incorrectly extracts the dataword 00. Two corrupted bits have made the error undetectable.

**An error-detecting code can detect only the types of errors for which it is designed: other types of errors may remain undetected.**

### H.2.2 Error correction
Error correction is much more difficult than error detection. In error detection, the receiver needs to know only that the received codeword is invalid: in error correction, the receiver needs to find (or guess) the original codeword sent. We need more redundant bits for error correction than for error detection. Figure H.5 shows the role of block coding in error correction. We can see that the idea is the same as error detection, but the generator and checker functions are much more complex.

**Example H.3**
Let us add more redundant bits to Example H.2 to see if the receiver can correct an error without knowing what was actually sent. We add three redundant bits to the 2-bit dataword to make 5-bit codewords. Again, later we will show how we choose the redundant bits. For the moment let us concentrate on the error correction concept. Table H.2 shows the datawords and codewords.

**Table H.2 A code for error correction (Example H.3)**
| Dataword | Codeword | Dataword | Codeword |
| :--- | :--- | :--- | :--- |
| 00 | 00000 | 10 | 10101 |
| 01 | 01011 | 11 | 11110 |

Assume the dataword is 01. The sender consults the table (or uses an algorithm) to create the codeword 01011. The codeword is corrupted during transmission, and 01001 is received—an error in the second bit from the right. First, the receiver finds that the received codeword is not in the table. This means an error has occurred. (Detection must come before correction.) The receiver, assuming that only 1 bit is corrupted, uses the following strategy to guess the correct dataword.
1.  Comparing the received codeword with the first codeword in the table (01001 *versus* 00000), the receiver decides that the first codeword is not the one that was sent because there are two different bits.
2.  By the same reasoning, the original codeword cannot be the third or fourth one in the table.
3.  The original codeword must be the second one in the table, because this is the only one that differs from the received codeword by 1 bit. The receiver replaces 01001 with 01011 and consults the table to find the dataword 01.

## H.3 LINEAR BLOCK CODES
Almost all block codes used today belong to a subset called **linear block codes**. The use of nonlinear block codes for error detection and correction is not as widespread, because their structure makes theoretical analysis and implementation difficult. We therefore concentrate on linear block codes.
The formal definition of linear block codes requires a knowledge of abstract algebra (particularly Galois fields) which is beyond the scope of this book. We therefore give an informal definition. For our purposes, a linear block code is a code in which the exclusive OR (modulo-2 addition, discussed in Appendix G) of two valid codewords creates another valid codeword.

**In a linear block code, the exclusive OR (XOR) of any two valid codewords creates another valid codeword.**

**Example H.4**
Let us see if the two codes we defined in Table H.1 and Table H.2 belong to the class of linear block codes.
1.  The scheme in Table H.1 is a linear block code because the result of XORing any codeword with any other codeword is a valid codeword. For example, XORing of the second and third codewords creates the fourth one.
2.  The scheme in Table H.2 is also a linear block code. We can create all four codewords by XORing two other codewords.

### H.3.1 Some linear block codes
Let us now show some linear block codes. These codes are trivial because we can easily find the encoding and decoding algorithms and check their performances.

**Simple parity-check code**
Perhaps the most familiar error-detecting code is the **simple parity-check code**. In this code, a $k$-bit dataword is changed to an $n$-bit codeword, where $n = k + 1$. The extra bit, called the **parity bit**, is added to a pre-defined position. It is selected to make the total number of 1s in the codeword even. Although some implementations specify an odd number of 1s, we discuss the even number case.

**A simple parity-check code is a single-bit error-detecting code in which n = k + 1.**

Our first code (Table H.3) is a parity-check code with $k = 2$ and $n = 3$. The code in Table H.3 is also a parity-check code with $k = 4$ and $n = 5$.

**Table H.3 Simple parity-check code C(5, 4)**
| Datawords | Codewords | Datawords | Codewords |
| :--- | :--- | :--- | :--- |
| 0000 | 00000 | 1000 | 10001 |
| 0001 | 00011 | 1001 | 10010 |
| 0010 | 00101 | 1010 | 10100 |
| 0011 | 00110 | 1011 | 10111 |
| 0100 | 01001 | 1100 | 11000 |
| 0101 | 01010 | 1101 | 11011 |
| 0110 | 01100 | 1110 | 11101 |
| 0111 | 01111 | 1111 | 11110 |

Figure H.6 shows a possible structure of an encoder (at the sender) and a decoder (at the receiver).
The encoder uses a generator that takes a copy of a 4-bit dataword ($a_0, a_1, a_2$, and $a_3$) and generates a parity bit $r_0$. The dataword bits and the parity bit create the 5-bit codeword. The parity bit that is added makes the number of 1s in the codeword even. This is normally done by adding the 4 bits of the dataword (modulo-2): the result is the parity bit. In other words:
$r_0 = a_3 + a_2 + a_1 + a_0$       (modulo-2)

If the number of 1s is even, the result is 0: if the number of 1s is odd, the result is 1. In both cases, the total number of 1s in the codeword is even.
The sender sends the codeword, which may be corrupted during transmission. The receiver receives a 5-bit word. The checker at the receiver does the same thing as the generator in the sender with one exception: the addition is done over all five bits. The result, which is called the **syndrome**, is just 1 bit. The syndrome is 0 when the number of 1s in the received codeword is even; otherwise, it is 1.
$s_0 = b_3 + b_2 + b_1 + b_0 + q_0$       (modulo-2)

A syndrome is the output of a checking process that is fed into the decision logic of a receiver in order to decide what to do with the data portion of the code word. The decision may be to accept it, to reject it, or (for correcting code) to modify it before accepting it. In this case, the syndrome is passed to the **decision logic analyzer**. If there is no error in the codeword, the syndrome is 0 and the decision logic accepts the data portion of the codeword as the actual dataword. If the syndrome is 1, there must be an error in the codeword, and so the decision logic discards the data portion of the codeword: the dataword is not created.

**Example H.5**
Let us look at some transmission scenarios. Assume that the sender sends the dataword 1011. The parity bit is $(1 + 0 + 1 + 1) \\text{ mod } 2 = 1$, which is appended to the right of the dataword. The codeword created from this dataword is therefore 10111, which is sent to the receiver. We examine five cases:
1.  No error occurs: the received codeword is 10111. The syndrome is 0. The dataword 1011 is created.
2.  A single-bit error changes $a_1$. The received codeword is 10011. The syndrome is 1. No dataword is created.
3.  A single-bit error changes the parity bit $r_0$. The received codeword is 10110. The syndrome is 1. No dataword is created. Note that although none of the dataword bits are corrupted, no dataword is created because the code is not sophisticated enough to show the position of the corrupted bit.
4.  An error changes $r_0$ and a second error changes $a_3$. The received codeword is 00110. The syndrome is 0. The dataword 0011 is created at the receiver. Note that here the dataword is wrongly created due to the syndrome value: the simple parity-check decoder cannot detect an even number of errors. The errors cancel each other out and give the syndrome a value of 0.
5.  Three bits—$a_3$, $a_2$, and $a_1$—are changed by errors. The received codeword is 01011. The syndrome is 1. The dataword is not created. This shows that the simple parity check, guaranteed to detect a single error, can also find any odd number of errors.

**A simple parity-check code can detect an odd number of errors.**

**Hamming codes**
Hamming codes are a subset of linear block codes that follow two criteria:
$n = k + r$ and $n = 2^r - 1$
in which $k$ is the number of bits in dataword, $r$ is the number of redundant bits, and $n$ is the number of bits in the codeword. These codes can detect up to $r - 1$ bits of error and can correct up to $(r - 1) / 2$ bits of error.

**Example H.6**
A code with $k = 4, r = 3$, and $n = 7$ satisfies the two conditions of a Hamming code, because we have $7 = 4 + 3$ and $7 = 2^3 - 1$. This code can detect only $(3 - 1) = 2$ bits of error and correct only $(3 - 1)/2 = 1$ bit of error.
The theory of Hamming codes in general is beyond the scope of this book. For more information, see *Data Communication and Networking*, by Behrouz Forouzan, McGraw-Hill, New York, 2006. In the next section, we discuss a subset of Hamming code called cyclic codes.

## H.4 CYCLIC CODES
Cyclic codes are special linear block codes with one extra property. In a **cyclic code**, if a codeword is cyclically shifted (rotated), the result is another codeword. For example, if 1011000 is a codeword and we cyclically left-shift it, then 0110001 is also a codeword.

### H.4.1 Cyclic redundancy check
We can create cyclic codes to correct errors. However, the theoretical background required is beyond the scope of this appendix. In this section, we simply discuss a category of cyclic codes called the **cyclic redundancy checks (CRC)** that are used in networks such as LANs and WANs.
Table H.4 shows an example of a CRC code. We can see both the linear and cyclic properties of this code.

**Table H.4 A CRC code with k = 4, n = 7, and r = 3**
| Dataword | Codeword | Dataword | Codeword |
| :--- | :--- | :--- | :--- |
| 0000 | 0000000 | 1000 | 1000101 |
| 0001 | 0001011 | 1001 | 1001110 |
| 0010 | 0010110 | 1010 | 1010011 |
| 0011 | 0011101 | 1011 | 1011000 |
| 0100 | 0100111 | 1100 | 1100010 |
| 0101 | 0101100 | 1101 | 1101001 |
| 0110 | 0110001 | 1110 | 1110100 |
| 0111 | 0111010 | 1111 | 1111111 |

Figure H.7 shows one possible design for the encoder and decoder.
In the encoder in Figure H.7, the dataword has $k$ bits (4 here) and the codeword has $n$ bits (here 7). The size of the dataword is augmented by adding $n - k$ (here 3) 0s to the right-hand side of the word. The $n$-bit result is fed into the generator. The generator uses a predefined divisor of size $n - k + 1$ (here 4). The generator divides the augmented dataword by the divisor using modulo-2 division. The quotient of the division is discarded: the remainder ($r_2 r_1 r_0$) is appended to the dataword to create the codeword.
The decoder receives the codeword, which could be corrupted. A copy of all $n$ bits is fed to the checker, which is a replica of the generator. The remainder produced by the checker is a syndrome of $n - k$ (here 3) bits, which is fed to the decision logic analyzer. The analyzer has a simple function: if the syndrome bits are all 0s, the 4 leftmost bits of the codeword are accepted as the dataword (interpreted as no error), otherwise, the 4 bits are discarded (error).

**Encoder**
Let us take a closer look at the encoder. The encoder takes the dataword and augments it with $n - k$ number of 0s. It then divides the augmented dataword by the divisor, as shown in Figure H.8.
Note that this is not the regular binary division—obviously the result of dividing 72 by 11 is not the quotient of 10 and the remainder of 6. This is binary division in modulo 2 arithmetic, as we discussed in Appendix G. In this division, adding and subtracting is the same (it is the XOR operation discussed in Appendix E), which means that we do not subtract, but add. A better explanation of this division is that we treat the binary word as a polynomial with a coefficient in modulo 2 arithmetic—only 0 or 1. For more information, we refer the interested reader to *finite field theory (Galois fields)* and books on error detection and correction.
In each step, a copy of the divisor is XORed with the 4 bits of the dividend. The result of the XOR operation (remainder) is 3 bits (in this case), which is used for the next step after 1 extra bit is carried down—see Figure H.8—to make it 4 bits long. There is one important point we need to remember in this type of division. If the leftmost bit of the dividend (or the part used in each step) is 0, the corresponding bit in the quotient is 0.
When there are no bits left to pull down, we have a result. The 3-bit remainder forms the check bits ($r_2, r_1, \\text{and } r_0$). They are appended to the dataword to create the codeword. Note also that we are not interested in the quotient, as only the remainder is used in cyclic codes.

**Decoder**
The codeword can change during transmission. The decoder does the same division process as the encoder. The remainder of the division is the syndrome. If the syndrome is all 0s, there is no error: the dataword is separated from the received codeword and accepted. Otherwise, everything is discarded. Figure H.9 shows two cases. The left-hand figure shows the value of syndrome when no error has occurred: the syndrome is 000. The right-hand part of the figure shows the case in which there is a single error: the syndrome is not all 0s (it is 011).

**Divisor**
You may be wondering how the divisor 1011 is chosen. This needs abstract algebra and theory of finite field to explain, which we leave this to books specialized in this area.

### H.4.2 Performance of cyclic codes
We have seen that cyclic codes have a very good performance in detecting single-bit errors, double errors, an odd number of errors, and burst errors. They can easily be implemented in hardware and software. They are especially fast when implemented in hardware. This has made cyclic codes a good candidate for many networks.

## H.5 CHECKSUM
The last error detection method we discuss here is called the **checksum**. The checksum is used in the Internet by several protocols. Like linear and cyclic codes, the checksum is based on the concept of **redundancy**.

### H.5.1 Checksum concept
The concept of the checksum is not difficult. Let us illustrate it with a few examples.

**Example H.7**
Suppose our data is a list of five 4-bit numbers that we want to send to some destination. In addition to sending these numbers, we send the sum of the numbers. For example, if the set of numbers is (7, 11, 12, 0, 6), we send (7, 11, 12, 0, 6, 36), where 36 is the sum of the original numbers. The receiver adds the five numbers and compares the result with the sum. If the two are the same, the receiver assumes no error, accepts the five numbers, and discards the sum. Otherwise, there is an error somewhere and the data is not accepted.

**Example H.8**
We can make the job of the receiver easier if we send the negative (complement) of the sum, called the *checksum*. In this case, we send (7, 11, 12, 0, 6, -36). The receiver can add all the numbers received (including the checksum). If the result is 0, it assumes no error, otherwise there is an error.

### H.5.2 One’s complement
The previous example has one major drawback. Our data can be written as 4-bit words (they are all less than 15) except for the checksum. One solution is to use **one’s complement** arithmetic, as discussed in Chapter 3.

**Example H.9**
Let us redo Example H.8 using one’s complement arithmetic. Figure H.10 shows the process at the sender and at the receiver.
The sender initializes the checksum to 0 and adds all data items and the checksum (the checksum is considered as one data item and is shown in color). The result is 36. However, 36 cannot be expressed in 4 bits. The extra two bits are wrapped and added with the sum to create the wrapped sum value 6. In the figure, we have shown the details in binary. The sum is then complemented, resulting in the checksum value 9 ($15 - 6 = 9$). The sender now sends six data items to the receiver, including the checksum 9. The receiver follows the same procedure as the sender. It adds all data items (including the checksum): the result is 45. The sum is wrapped and becomes 15. The wrapped sum is complemented and becomes 0. Since the value of the checksum is 0, this means that the data is not corrupted. The receiver drops the checksum and keeps the other data items. If the checksum is not zero, the entire packet is dropped and must be retransmitted.

### H.5.3 Internet checksum
Traditionally, the Internet (IP protocol) has used a 16-bit checksum. The sender and receiver use the following procedures:

**Sender side**
*   A 16-bit checksum is set to zero and added to the message.
*   The new message is divided into 16-bit words.
*   All words are added using one’s complement addition.
*   The sum is complemented and replaces the previous checksum.

**Receiver side**
*   The received message (including the checksum) is divided into 16-bit words.
*   All words are added using one’s complement addition.
*   The sum is complemented.
*   If the complemented sum is 0, the message is accepted, otherwise it is rejected.

**Example H.10**
Let us calculate the checksum for a text word of eight characters (‘Forouzan’) as shown in Figure H.11.
The text needs to be divided into 2-byte (16-bit) words. We use ASCII encoding (see Appendix A) to change each byte to a two-digit hexadecimal number. For example, ‘F’ is represented as $(46)_{16}$ and ‘o’ is represented as $(6F)_{16}$. In Figure H.11.a, the value of the partial sum for the first column is $(36)_{16}$. We keep the rightmost digit (6) and insert the leftmost digit (3) as the carry in the second column. The process is repeated for each column. The checksum is calculated and transmitted with the data to the receiver. The receiver performs the same operations, Figure H.11.b. If there is any corruption, the checksum recalculated by the receiver is not all 0s.

**Performance**
The traditional checksum uses a small number of bits (16) to detect errors in a message of any size (sometimes thousands of bits). However, it is not as strong as the CRC in its error-checking capability. For example, if the value of one word is incremented and the value of another word is decremented by the same amount, the two errors cannot be detected because the sum and checksum remain the same. Also if the values of several words are incremented but the total change is a multiple of 65535 ($2^{16}-1$), the sum and the checksum remain the same and the error goes undetected.
`,
  zh: `
# 附錄 H：錯誤偵測與更正

當資料從一個地方傳輸到另一個地方，或從一個設備移動到另一個設備時，必須檢查資料的準確性。對於大多數應用程式，系統必須保證接收到的資料與傳輸的資料相同。另一方面，有些應用程式可以容忍小程度的錯誤。例如，音訊或視訊傳輸中的隨機錯誤可能是可以容忍的，但當我們傳輸文字時，我們期望非常高的準確度。我們只討論傳輸中的錯誤：儲存中資料損壞導致的錯誤也以同樣的方式處理。

## H.1 簡介
我們先討論一些與錯誤偵測和更正相關的問題。

### H.1.1 錯誤類型
每當位元從一個地方流向另一個地方時，由於傳輸介質中的干擾（例如串音、外部電磁場等），它們都會發生不可預測的變化。這如圖 H.1 所示。

在**單一位元錯誤**中，0 變為 1 或 1 變為 0。在**叢發錯誤**中，多個位元發生變化。術語**單一位元錯誤**意味著給定資料單元（例如位元組、字元或封包）中只有 1 個位元從 1 變為 0 或從 0 變為 1。術語**叢發錯誤**意味著資料單元中有兩個或更多位元從 1 變為 0 或從 0 變為 1。

### H.1.2 冗餘
更正錯誤的核心概念是**冗餘**。為了能夠更正錯誤，我們需要在資料中發送額外的位元。這些冗餘位元由發送者添加並由接收者移除。它們的存在允許接收者更正損壞的位元。

**為了更正錯誤，我們需要在資料中發送額外的（冗餘）位元。**

### H.1.3 偵測與更正
錯誤的更正比偵測更困難。在**錯誤偵測**中，我們只看是否發生了錯誤。答案很簡單，是或否。我們甚至對錯誤的數量不感興趣：對我們來說，單一位元錯誤與叢發錯誤是一樣的。

在**錯誤更正**中，我們需要知道損壞的確切位元數——更重要的是，它們在訊息中的位置。錯誤數量和訊息大小是重要因素。如果我們需要更正 8 位元資料單元中的單個錯誤，我們需要考慮八個可能的錯誤位置：如果我們需要更正相同大小資料單元中的兩個錯誤，我們需要考慮 28 (7 + 6 + ... + 1) 種可能性。你可以想像接收者在 1000 位元的資料單元中找出十個錯誤的困難。

### H.1.4 前向錯誤更正與重傳
主要有兩種錯誤更正方法。**前向錯誤更正**是接收者嘗試利用冗餘位元猜測訊息的過程。正如我們稍後將看到的，如果錯誤數量很少，這是有可能的。**重傳**更正是一種技術，其中接收者偵測到錯誤的發生並要求發送者重新發送訊息。重新發送會重複進行，直到收到接收者認為沒有錯誤的訊息：通常，並非所有錯誤都能被偵測到。

### H.1.5 編碼
冗餘是透過各種編碼方案實現的。發送者透過一個過程添加冗餘位元，該過程在冗餘位元和實際資料位元之間建立關係。接收者檢查這兩組位元之間的關係以偵測或更正錯誤。冗餘位元與資料位元的比率以及過程的穩健性是任何編碼方案中的重要因素。圖 H.2 顯示了編碼的一般概念。

我們可以將編碼方案分為兩大類：**區塊編碼**和**卷積編碼**。在本附錄中，我們專注於區塊編碼：卷積編碼更複雜，超出了本書的範圍。
區塊編碼使用模數運算，如附錄 G 所述。

**我們只專注於區塊碼：我們將卷積碼留給高級教材。**

## H.2 區塊編碼
在**區塊編碼**中，我們將訊息分成區塊，每個區塊 $k$ 位元，稱為**資料字**。我們在每個區塊中添加 $r$ 個冗餘位元，使其長度為 $n = k + r$。產生的 $n$ 位元區塊稱為**碼字**。額外的 $r$ 位元是如何選擇或計算的，我們稍後討論。目前，重要的是要知道我們有一組大小為 $k$ 的資料字和一組大小為 $n$ 的碼字。

使用 $k$ 位元，我們可以創建 $2^k$ 個資料字的組合：使用 $n$ 位元，我們可以創建 $2^n$ 個碼字的組合。由於 $n > k$，可能的碼字數量大於可能的資料字數量。區塊編碼過程是一對一的：相同的資料字總是編碼為相同的碼字。這意味著我們有 $2^n - 2^k$ 個碼字未被使用。我們稱這些碼字為**無效**或**非法**。圖 H.3 顯示了這種情況。

**範例 H.1**
讓我們假設我們的訊息由一個 8 位元的單個區塊組成 ($k = 8$)。有 $2^8 = 256$ 種可能的資料字組合。如果我們添加兩個冗餘位元 ($r = 1$)，那麼每個可能的碼字是 10 位元 ($n = 10$)，可能的碼字總數是 $2^{10} = 1024$。這意味著我們有 $1024 - 256 = 768$ 個碼字是無效的。如果收到這些無效碼字之一，接收者就知道碼字已損壞。

### H.2.1 錯誤偵測
如何使用區塊編碼偵測錯誤？如果滿足以下兩個條件，接收者就會偵測到原始碼字的更改。
1.  接收者擁有（或可以找到）有效碼字的列表。
2.  原始碼字已更改為無效碼字。
圖 H.4 顯示了區塊編碼在錯誤偵測中的作用。

發送者使用生成器從資料字創建碼字，該生成器應用編碼規則和程序（稍後討論）。發送給接收者的每個碼字在傳輸過程中可能會發生變化。如果接收到的碼字與有效碼字之一相同，則該字被接受並提取相應的資料字以供使用。如果接收到的碼字無效，則將其丟棄。
然而，如果碼字在傳輸過程中損壞，但接收到的字仍然匹配有效碼字，則錯誤仍未被偵測到。因此，這種類型的編碼只能偵測單一錯誤：同一碼字中的兩個或更多錯誤可能仍未被偵測到。

**範例 H.2**
讓我們假設 $k = 2$ 且 $n = 3$。表 H.1 顯示了發送者和接收者之間商定的資料字和定義的碼字列表。稍後我們將看到如何從資料字推導出碼字。

**表 H.1 用於錯誤偵測的代碼（範例 H.2）**
| 資料字 | 碼字 |
| :--- | :--- |
| 00 | 000 |
| 01 | 011 |
| 10 | 101 |
| 11 | 110 |

假設發送者將資料字 01 編碼為 011 並將其發送給接收者。考慮以下情況：
1.  接收者收到 011。這是一個有效的碼字。接收者從中提取資料字 01。
2.  碼字在傳輸過程中損壞，收到 111——也就是說，最左邊的位元損壞。這不是一個有效的碼字，因此被丟棄。
3.  碼字在傳輸過程中損壞，收到 000——也就是說，右邊的兩個位元損壞。這是一個有效的碼字。接收者錯誤地提取了資料字 00。兩個損壞的位元使錯誤無法偵測。

**錯誤偵測碼只能偵測其設計偵測的錯誤類型：其他類型的錯誤可能仍未被偵測到。**

### H.2.2 錯誤更正
錯誤更正比錯誤偵測困難得多。在錯誤偵測中，接收者只需要知道接收到的碼字是無效的：在錯誤更正中，接收者需要找出（或猜測）發送的原始碼字。比起錯誤偵測，我們需要更多的冗餘位元來進行錯誤更正。圖 H.5 顯示了區塊編碼在錯誤更正中的作用。我們可以看到這個想法與錯誤偵測相同，但生成器和檢查器功能要複雜得多。

**範例 H.3**
讓我們在範例 H.2 中添加更多冗餘位元，看看接收者是否可以在不知道實際發送內容的情況下更正錯誤。我們在 2 位元資料字中添加三個冗餘位元，使其成為 5 位元碼字。同樣，稍後我們將展示如何選擇冗餘位元。目前讓我們專注於錯誤更正概念。表 H.2 顯示了資料字和碼字。

**表 H.2 用於錯誤更正的代碼（範例 H.3）**
| 資料字 | 碼字 | 資料字 | 碼字 |
| :--- | :--- | :--- | :--- |
| 00 | 00000 | 10 | 10101 |
| 01 | 01011 | 11 | 11110 |

假設資料字是 01。發送者查閱表格（或使用演算法）創建碼字 01011。碼字在傳輸過程中損壞，收到 01001——右邊第二個位元出錯。首先，接收者發現接收到的碼字不在表中。這意味著發生了錯誤。（偵測必須在更正之前。）接收者假設只有 1 個位元損壞，使用以下策略來猜測正確的資料字。
1.  將接收到的碼字與表中的第一個碼字進行比較（01001 *對* 00000），接收者認為第一個碼字不是發送的那個，因為有兩個不同的位元。
2.  同理，原始碼字不可能是表中的第三個或第四個。
3.  原始碼字必須是表中的第二個，因為這是唯一一個與接收到的碼字僅相差 1 個位元的碼字。接收者將 01001 替換為 01011 並查閱表格以找到資料字 01。

## H.3 線性區塊碼
今天使用的幾乎所有區塊碼都屬於稱為**線性區塊碼**的子集。用於錯誤偵測和更正的非線性區塊碼並不普遍，因為它們的結構使得理論分析和實作變得很困難。因此，我們專注於線性區塊碼。
線性區塊碼的正式定義需要抽象代數（特別是伽羅瓦域）的知識，這超出了本書的範圍。因此，我們給出一個非正式的定義。就我們的目的而言，線性區塊碼是一種代碼，其中兩個有效碼字的互斥或（模-2 加法，在附錄 G 中討論）會創建另一個有效碼字。

**在線性區塊碼中，任何兩個有效碼字的互斥或 (XOR) 都會創建另一個有效碼字。**

**範例 H.4**
讓我們看看我們在表 H.1 和表 H.2 中定義的兩個代碼是否屬於線性區塊碼類別。
1.  表 H.1 中的方案是一個線性區塊碼，因為任何碼字與任何其他碼字的 XOR 運算結果都是一個有效的碼字。例如，第二個和第三個碼字的 XOR 運算創建了第四個。
2.  表 H.2 中的方案也是一個線性區塊碼。我們可以通過對其他兩個碼字進行 XOR 運算來創建所有四個碼字。

### H.3.1 一些線性區塊碼
現在讓我們展示一些線性區塊碼。這些代碼很簡單，因為我們可以輕鬆找到編碼和解碼演算法並檢查其性能。

**簡單同位檢查碼**
也許最熟悉的錯誤偵測碼是**簡單同位檢查碼**。在這個代碼中，一個 $k$ 位元資料字被改變為一個 $n$ 位元碼字，其中 $n = k + 1$。額外的位元，稱為**同位位元**，被添加到預定義的位置。它的選擇是為了使碼字中 1 的總數為偶數。雖然有些實作指定奇數個 1，但我們討論偶數個的情況。

**簡單同位檢查碼是一種單位元錯誤偵測碼，其中 n = k + 1。**

我們的第一個代碼（表 H.3）是一個 $k = 2$ 且 $n = 3$ 的同位檢查碼。表 H.3 中的代碼也是一個 $k = 4$ 且 $n = 5$ 的同位檢查碼。

**表 H.3 簡單同位檢查碼 C(5, 4)**
| 資料字 | 碼字 | 資料字 | 碼字 |
| :--- | :--- | :--- | :--- |
| 0000 | 00000 | 1000 | 10001 |
| 0001 | 00011 | 1001 | 10010 |
| 0010 | 00101 | 1010 | 10100 |
| 0011 | 00110 | 1011 | 10111 |
| 0100 | 01001 | 1100 | 11000 |
| 0101 | 01010 | 1101 | 11011 |
| 0110 | 01100 | 1110 | 11101 |
| 0111 | 01111 | 1111 | 11110 |

圖 H.6 顯示了編碼器（在發送者處）和解碼器（在接收者處）的可能結構。
編碼器使用一個生成器，該生成器獲取 4 位元資料字（$a_0, a_1, a_2$ 和 $a_3$）的副本並生成一個同位位元 $r_0$。資料字位元和同位位元創建 5 位元碼字。添加的同位位元使碼字中 1 的數量為偶數。這通常是通過將資料字的 4 個位元相加（模-2）來完成的：結果是同位位元。換句話說：
$r_0 = a_3 + a_2 + a_1 + a_0$       (模-2)

如果 1 的數量是偶數，結果是 0：如果 1 的數量是奇數，結果是 1。在這兩種情況下，碼字中 1 的總數都是偶數。
發送者發送碼字，該碼字在傳輸過程中可能會損壞。接收者收到一個 5 位元字。接收者處的檢查器做的事情與發送者中的生成器相同，只有一個例外：加法是在所有五個位元上進行的。結果稱為**症狀 (syndrome)**，只有 1 位元。當接收到的碼字中 1 的數量為偶數時，症狀為 0；否則為 1。
$s_0 = b_3 + b_2 + b_1 + b_0 + q_0$       (模-2)

症狀是檢查過程的輸出，它被送入接收者的決策邏輯，以決定如何處理碼字的資料部分。決策可能是接受它、拒絕它，或（對於更正碼）在接受之前修改它。在這種情況下，症狀被傳遞給**決策邏輯分析器**。如果碼字中沒有錯誤，症狀為 0，決策邏輯接受碼字的資料部分作為實際資料字。如果症狀為 1，則碼字中必定有錯誤，因此決策邏輯丟棄碼字的資料部分：不創建資料字。

**範例 H.5**
讓我們看一些傳輸場景。假設發送者發送資料字 1011。同位位元是 $(1 + 0 + 1 + 1) \\text{ mod } 2 = 1$，它被附加到資料字的右側。從這個資料字創建的碼字因此是 10111，它被發送給接收者。我們檢查五種情況：
1.  沒有發生錯誤：接收到的碼字是 10111。症狀是 0。創建了資料字 1011。
2.  單一位元錯誤改變了 $a_1$。接收到的碼字是 10011。症狀是 1。未創建資料字。
3.  單一位元錯誤改變了同位位元 $r_0$。接收到的碼字是 10110。症狀是 1。未創建資料字。請注意，雖然沒有資料字位元損壞，但也未創建資料字，因為代碼不夠複雜，無法顯示損壞位元的位置。
4.  一個錯誤改變了 $r_0$，第二個錯誤改變了 $a_3$。接收到的碼字是 00110。症狀是 0。在接收者處創建了資料字 0011。請注意，這裡由於症狀值而錯誤地創建了資料字：簡單同位檢查解碼器無法偵測偶數個錯誤。錯誤相互抵消，給出的症狀值為 0。
5.  三個位元——$a_3$、$a_2$ 和 $a_1$——被錯誤改變。接收到的碼字是 01011。症狀是 1。未創建資料字。這表明保證偵測單一錯誤的簡單同位檢查也可以發現任何奇數個錯誤。

**簡單同位檢查碼可以偵測奇數個錯誤。**

**漢明碼**
漢明碼是線性區塊碼的一個子集，遵循兩個標準：
$n = k + r$ 和 $n = 2^r - 1$
其中 $k$ 是資料字中的位元數，$r$ 是冗餘位元數，$n$ 是碼字中的位元數。這些代碼可以偵測最多 $r - 1$ 位元錯誤，並可以更正最多 $(r - 1) / 2$ 位元錯誤。

**範例 H.6**
$k = 4, r = 3$, 和 $n = 7$ 的代碼滿足漢明碼的兩個條件，因為我們有 $7 = 4 + 3$ 和 $7 = 2^3 - 1$。此代碼只能偵測 $(3 - 1) = 2$ 位元錯誤，並只能更正 $(3 - 1)/2 = 1$ 位元錯誤。
一般而言，漢明碼的理論超出了本書的範圍。有關更多資訊，請參閱 Behrouz Forouzan 所著的 *Data Communication and Networking*，McGraw-Hill，New York，2006。在下一節中，我們討論稱為循環碼的漢明碼子集。

## H.4 循環碼
循環碼是具有一個額外屬性的特殊線性區塊碼。在**循環碼**中，如果一個碼字被循環移位（旋轉），結果是另一個碼字。例如，如果 1011000 是一個碼字，我們將其循環左移，那麼 0110001 也是一個碼字。

### H.4.1 循環冗餘檢查
我們可以創建循環碼來更正錯誤。然而，所需的理論背景超出了本附錄的範圍。在本節中，我們簡單討論一類稱為**循環冗餘檢查 (CRC)** 的循環碼，它們用於 LAN 和 WAN 等網路中。
表 H.4 顯示了一個 CRC 碼的例子。我們可以看到此代碼的線性與循環屬性。

**表 H.4 具有 k = 4, n = 7, 和 r = 3 的 CRC 碼**
| 資料字 | 碼字 | 資料字 | 碼字 |
| :--- | :--- | :--- | :--- |
| 0000 | 0000000 | 1000 | 1000101 |
| 0001 | 0001011 | 1001 | 1001110 |
| 0010 | 0010110 | 1010 | 1010011 |
| 0011 | 0011101 | 1011 | 1011000 |
| 0100 | 0100111 | 1100 | 1100010 |
| 0101 | 0101100 | 1101 | 1101001 |
| 0110 | 0110001 | 1110 | 1110100 |
| 0111 | 0111010 | 1111 | 1111111 |

圖 H.7 顯示了編碼器（在發送者處）和解碼器（在接收者處）的一種可能設計。
在圖 H.7 的編碼器中，資料字有 $k$ 位元（這裡是 4），碼字有 $n$ 位元（這裡是 7）。資料字的大小透過在字的右側添加 $n - k$（這裡是 3）個 0 來擴增。$n$ 位元結果被送入生成器。生成器使用大小為 $n - k + 1$（這裡是 4）的預定義除數。生成器使用模-2 除法將擴增的資料字除以除數。除法的商被丟棄：餘數（$r_2 r_1 r_0$）被附加到資料字以創建碼字。
解碼器接收碼字，它可能已損壞。所有 $n$ 位元的副本被送入檢查器，它是生成器的複製品。檢查器產生的餘數是 $n - k$（這裡是 3）位元的症狀，它被送入決策邏輯分析器。分析器有一個簡單的功能：如果症狀位元全為 0，則接受碼字最左邊的 4 個位元作為資料字（解釋為無錯誤），否則，丟棄這 4 個位元（錯誤）。

**編碼器**
讓我們仔細看看編碼器。編碼器獲取資料字並用 $n - k$ 個 0 對其進行擴增。然後它將擴增的資料字除以除數，如圖 H.8 所示。
請注意，這不是常規的二進位除法——顯然 72 除以 11 的結果不是商 10 和餘數 6。這是模 2 運算中的二進位除法，正如我們在附錄 G 中所討論的。在這個除法中，加法和減法是相同的（它是附錄 E 中討論的 XOR 運算），這意味著我們不減，而是加。這種除法更好的解釋是我們將二進位字視為具有模 2 運算係數的多項式——只有 0 或 1。有關更多資訊，我們建議感興趣的讀者參考*有限域理論 (伽羅瓦域)* 和關於錯誤偵測與更正的書籍。
在每一步中，除數的副本與被除數的 4 個位元進行 XOR 運算。XOR 運算的結果（餘數）是 3 位元（在這種情況下），在 1 個額外位元被帶下來後用於下一步——見圖 H.8——使其長度為 4 位元。在這種類型的除法中，我們需要記住一個重要點。如果被除數（或每一步使用的部分）的最左邊位元是 0，則商中的相應位元是 0。
當沒有位元可以拉下來時，我們就有了一個結果。3 位元餘數形成檢查位元（$r_2, r_1, \\text{和 } r_0$）。它們被附加到資料字以創建碼字。另請注意，我們對商不感興趣，因為在循環碼中只使用餘數。

**解碼器**
碼字在傳輸過程中可能會改變。解碼器執行與編碼器相同的除法過程。除法的餘數是症狀。如果症狀全為 0，則沒有錯誤：資料字從接收到的碼字中分離並被接受。否則，一切都被丟棄。圖 H.9 顯示了兩種情況。左圖顯示未發生錯誤時的症狀值：症狀為 000。右圖顯示發生單一錯誤的情況：症狀不全為 0（它是 011）。

**除數**
您可能想知道除數 1011 是如何選擇的。這需要抽象代數和有限域理論來解釋，我們將此留給專門研究該領域的書籍。

### H.4.2 循環碼的性能
我們已經看到循環碼在偵測單位元錯誤、雙位元錯誤、奇數個錯誤和叢發錯誤方面具有非常好的性能。它們可以很容易地在硬體和軟體中實作。當在硬體中實作時，它們特別快。這使得循環碼成為許多網路的良好候選者。

## H.5 校驗和
我們這裡討論的最後一種錯誤偵測方法稱為**校驗和**。校驗和被網際網路中的多個協定使用。像線性碼和循環碼一樣，校驗和基於**冗餘**的概念。

### H.5.1 校驗和概念
校驗和的概念並不難。讓我們用幾個例子來說明。

**範例 H.7**
假設我們的資料是一個包含五個 4 位元數字的列表，我們想要將其發送到某個目的地。除了發送這些數字外，我們還發送這些數字的總和。例如，如果這組數字是 (7, 11, 12, 0, 6)，我們發送 (7, 11, 12, 0, 6, 36)，其中 36 是原始數字的總和。接收者將五個數字相加，並將結果與總和進行比較。如果兩者相同，接收者假設沒有錯誤，接受這五個數字，並丟棄總和。否則，某處有錯誤，資料不被接受。

**範例 H.8**
如果我們發送總和的負數（補數），稱為*校驗和*，我們可以讓接收者的工作更容易。在這種情況下，我們發送 (7, 11, 12, 0, 6, -36)。接收者可以將收到的所有數字（包括校驗和）相加。如果結果為 0，則假設沒有錯誤，否則有錯誤。

### H.5.2 一的補數
前面的例子有一個主要缺點。我們的資料可以寫成 4 位元字（它們都小於 15），除了校驗和。一種解決方案是使用**一的補數**運算，如第 3 章所述。

**範例 H.9**
讓我們使用一的補數運算重做範例 H.8。圖 H.10 顯示了發送者和接收者的過程。
發送者將校驗和初始化為 0，並將所有資料項目和校驗和相加（校驗和被視為一個資料項目，以彩色顯示）。結果是 36。然而，36 不能用 4 位元表示。額外的兩個位元被環繞並加到總和中，以創建環繞總和值 6。在圖中，我們以二進位顯示了細節。然後對總和取補數，得到校驗和值 9 ($15 - 6 = 9$)。發送者現在向接收者發送六個資料項目，包括校驗和 9。接收者遵循與發送者相同的程序。它將所有資料項目（包括校驗和）相加：結果是 45。總和被環繞並變為 15。環繞總和被取補數並變為 0。由於校驗和的值為 0，這意味著資料未損壞。接收者丟棄校驗和並保留其他資料項目。如果校驗和不為零，則丟棄整個封包且必須重新傳輸。

### H.5.3 網際網路校驗和
傳統上，網際網路 (IP 協定) 使用 16 位元校驗和。發送者和接收者使用以下程序：

**發送者端**
*   16 位元校驗和設為零並添加到訊息中。
*   新訊息被分成 16 位元字。
*   所有字使用一的補數加法相加。
*   總和取補數並替換先前的校驗和。

**接收者端**
*   接收到的訊息（包括校驗和）被分成 16 位元字。
*   所有字使用一的補數加法相加。
*   總和取補數。
*   如果補數總和為 0，則接受訊息，否則拒絕。

**範例 H.10**
讓我們計算八個字元 ('Forouzan') 的文字字的校驗和，如圖 H.11 所示。
文字需要分成 2 位元組 (16 位元) 字。我們使用 ASCII 編碼（見附錄 A）將每個位元組更改為兩位十六進位數字。例如，'F' 表示為 $(46)_{16}$，'o' 表示為 $(6F)_{16}$。在圖 H.11.a 中，第一列的部分和值為 $(36)_{16}$。我們保留最右邊的數字 (6) 並將最左邊的數字 (3) 作為進位插入第二列。對每一列重複此過程。計算校驗和並將其與資料一起傳輸給接收者。接收者執行相同的操作，圖 H.11.b。如果有任何損壞，接收者重新計算的校驗和不全為 0。

**性能**
傳統校驗和使用少量位元 (16) 來偵測任何大小（有時數千位元）的訊息中的錯誤。然而，它的錯誤檢查能力不如 CRC 強。例如，如果一個字的值增加，而另一個字的值減少相同的量，則無法偵測到這兩個錯誤，因為總和和校驗和保持不變。此外，如果幾個字的值增加，但總變化是 65535 ($2^{16}-1$) 的倍數，則總和和校驗和保持不變，錯誤未被偵測到。
`,
};
