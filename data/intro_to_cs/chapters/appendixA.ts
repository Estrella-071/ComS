
export const appendixAContent = {
  en: `
# Appendix A: Unicode

Computers use numbers. They store characters by assigning a number to each one. The original coding system was called ASCII (American Standard Code for Information Interchange) and had 128 characters each stored as a 7-bit number. ASCII can satisfactorily handle lowercase and uppercase letters, digits, punctuation characters, and some control characters. An attempt was made to extend the ASCII character set to eight bits. The new code, which was called Extended ASCII, was never internationally standardized.

To overcome the difficulties inherent in ASCII and Extended ASCII—not enough bits to represent characters and other symbols needed for communication in other languages—the Unicode Consortium, a group of multilingual software manufacturers, created a universal encoding system to provide a comprehensive character set, called **Unicode**.

Unicode was originally a 2-byte character set. Unicode version 5, however, is a 4-byte code and is fully compatible with ASCII and Extended ASCII. The ASCII set, which is now called Basic Latin, is Unicode with the upper 25 bits set to zero. Extended ASCII, which is now called Latin-1, is Unicode with the 24 upper bits set to zero. Figure A.1 shows how the different systems are compatible.

Each character or symbol in Unicode is defined by a 32-bit number. The code can define up to $2^{32}$ (4294967296) characters or symbols. The description here uses hexadecimal digits in the following format, in which each X is a hexadecimal digit:

\`U+XXXXXXXX\`

## A.1 PLANES
Unicode divides the whole code space into planes. The most significant 16 bits define the plane, which means we can have 65536 ($2^{16}$) planes. For plane 0, the most significant 16 bits are 0s, $(0000)_{16}$, in plane 1 the bits are $(0001)_{16}$, in plane 2 they are $(0002)_{16}$, and so on until in the plane 65536, they are $(FFFF)_{16}$. Each plane can define up to 65536 characters or symbols. Figure A.2 shows the structure of Unicode code spaces and its planes.

### A.1.1 Basic multilingual plane (BMP)
The **basic multilingual plane**, plane 0, is designed to be compatible with the previous 16-bit Unicode. The most significant 16 bits in this plane are all zeros. The codes are normally shown as \`U+XXXX\` with the understanding that XXXX defines only the least significant 16 bits. This plane mostly defines character sets in different languages, with the exception of some codes used for control or other special characters (for more information, see the Unicode Web Page).

### A.1.2 Other planes
Unicode had other planes:
*   The **supplementary multilingual plane**, plane $(0001)_{16}$, is designed to provide more code for multilingual characters that are not included in the BMP plane.
*   The **supplementary ideographic plane**, plane $(0002)_{16}$, is designed to provide code for ideographic symbols, any symbol that primarily denotes an idea or meaning in contrast to a sound or pronunciation.
*   The **supplementary special plane**, plane $(000E)_{16}$, is used for special characters not found in the Basic Latin or Basic Latin-1 codes.
*   **Private use planes**, planes $(000F)_{16}$ and $(0010)_{16}$, are reserved for private use.

## A.2 ASCII
Today, ASCII or Basic Latin, is part of Unicode. It occupies the first 128 codes in Unicode (U-00000000 to U-0000007F). Table A.1 contains the hexadecimal codes and symbols. To find the actual code, we prepend $(000000)_{16}$ to the code.

**Table A.1 ASCII**

| Code | Symbol | Code | Symbol | Code | Symbol | Code | Symbol |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| $(00)_{16}$ | Null | $(20)_{16}$ | Space | $(40)_{16}$ | @ | $(60)_{16}$ | \` |
| $(01)_{16}$ | SOH | $(21)_{16}$ | ! | $(41)_{16}$ | A | $(61)_{16}$ | a |
| $(02)_{16}$ | STX | $(22)_{16}$ | “ | $(42)_{16}$ | B | $(62)_{16}$ | b |
| $(03)_{16}$ | ETX | $(23)_{16}$ | # | $(43)_{16}$ | C | $(63)_{16}$ | c |
| $(04)_{16}$ | EOT | $(24)_{16}$ | $ | $(44)_{16}$ | D | $(64)_{16}$ | d |
| $(05)_{16}$ | ENQ | $(25)_{16}$ | % | $(45)_{16}$ | E | $(65)_{16}$ | e |
| $(06)_{16}$ | ACK | $(26)_{16}$ | & | $(46)_{16}$ | F | $(66)_{16}$ | f |
| $(07)_{16}$ | BEL | $(27)_{16}$ | ‘ | $(47)_{16}$ | G | $(67)_{16}$ | g |
| $(08)_{16}$ | BS | $(28)_{16}$ | ( | $(48)_{16}$ | H | $(68)_{16}$ | h |
| $(09)_{16}$ | HT | $(29)_{16}$ | ) | $(49)_{16}$ | I | $(69)_{16}$ | i |
| $(0A)_{16}$ | LF | $(2A)_{16}$ | * | $(4A)_{16}$ | J | $(6A)_{16}$ | j |
| $(0B)_{16}$ | VT | $(2B)_{16}$ | + | $(4B)_{16}$ | K | $(6B)_{16}$ | k |
| $(0C)_{16}$ | FF | $(2C)_{16}$ | , | $(4C)_{16}$ | L | $(6C)_{16}$ | l |
| $(0D)_{16}$ | CR | $(2D)_{16}$ | - | $(4D)_{16}$ | M | $(6D)_{16}$ | m |
| $(0E)_{16}$ | SO | $(2E)_{16}$ | . | $(4E)_{16}$ | N | $(6E)_{16}$ | n |
| $(0F)_{16}$ | SI | $(2F)_{16}$ | / | $(4F)_{16}$ | O | $(6F)_{16}$ | o |
| $(10)_{16}$ | DLE | $(30)_{16}$ | 0 | $(50)_{16}$ | P | $(70)_{16}$ | p |
| $(11)_{16}$ | DC1 | $(31)_{16}$ | 1 | $(51)_{16}$ | Q | $(71)_{16}$ | q |
| $(12)_{16}$ | DC2 | $(32)_{16}$ | 2 | $(52)_{16}$ | R | $(72)_{16}$ | r |
| $(13)_{16}$ | DC3 | $(33)_{16}$ | 3 | $(53)_{16}$ | S | $(73)_{16}$ | s |
| $(14)_{16}$ | DC4 | $(34)_{16}$ | 4 | $(54)_{16}$ | T | $(74)_{16}$ | t |
| $(15)_{16}$ | NAK | $(35)_{16}$ | 5 | $(55)_{16}$ | U | $(75)_{16}$ | u |
| $(16)_{16}$ | SYN | $(36)_{16}$ | 6 | $(56)_{16}$ | V | $(76)_{16}$ | v |
| $(17)_{16}$ | ETB | $(37)_{16}$ | 7 | $(57)_{16}$ | W | $(77)_{16}$ | w |
| $(18)_{16}$ | CAN | $(38)_{16}$ | 8 | $(58)_{16}$ | X | $(78)_{16}$ | x |
| $(19)_{16}$ | EM | $(39)_{16}$ | 9 | $(59)_{16}$ | Y | $(79)_{16}$ | y |
| $(1A)_{16}$ | SUB | $(3A)_{16}$ | : | $(5A)_{16}$ | Z | $(7A)_{16}$ | z |
| $(1B)_{16}$ | ESC | $(3B)_{16}$ | ; | $(5B)_{16}$ | [ | $(7B)_{16}$ | { |
| $(1C)_{16}$ | FS | $(3C)_{16}$ | < | $(5C)_{16}$ | \\ | $(7C)_{16}$ | | |
| $(1D)_{16}$ | GS | $(3D)_{16}$ | = | $(5D)_{16}$ | ] | $(7D)_{16}$ | } |
| $(1E)_{16}$ | RS | $(3E)_{16}$ | > | $(5E)_{16}$ | ^ | $(7E)_{16}$ | ~ |
| $(1F)_{16}$ | US | $(3F)_{16}$ | ? | $(5F)_{16}$ | _ | $(7F)_{16}$ | DEL |

### A.2.1 Some properties of ASCII
ASCII has some interesting properties that we need to briefly mention here:
1.  The first code, $(00)_{16}$, which is non-printable, is the null character. It represents the absence of any character.
2.  The last code, $(7F)_{16}$, is the delete character, which is also non-printable. It is used by some programs to delete the current character.
3.  The space character, $(20)_{16}$, is a printable character. It prints a blank space.
4.  Characters with code $(01)_{16}$ to $(1F)_{16}$ are control characters: they are not printable. Table A.2 shows their functions. Most of these characters were used in data communication in out-of-date protocols.

**Table A.2 Explanation for control characters**
| Symbol | Explanation | Symbol | Explanation |
| :--- | :--- | :--- | :--- |
| SOH | Start of heading | DC1 | Device control 1 |
| STX | Start of text | DC2 | Device control 2 |
| ETX | End of text | DC3 | Device control 3 |
| EOT | End of transmission | DC4 | Device control 4 |
| ENQ | Enquiry | NAK | Negative acknowledgment |
| ACK | Acknowledgment | SYN | Synchronous idle |
| BEL | Ring bell | ETB | End of transmission block |
| BS | Backspace | CAN | Cancel |
| HT | Horizontal tab | EM | End of medium |
| LF | Line feed | SUB | Substitute |
| VT | Vertical tab | ESC | Escape |
| FF | Form feed | FS | File separator |
| CR | Carriage return | GS | Group separator |
| SO | Shift out | RS | Record separator |
| SI | Shift in | US | Unit separator |

5.  The uppercase letters start from $(41)_{16}$. The lowercase letters start from $(61)_{16}$. When numerically compared, uppercase letters are smaller than lowercase ones. This means that when we sort a list based on ASCII values, the uppercase letters show before the lowercase letters.
6.  The uppercase and lowercase letters differ by only one bit in the 7-bit code. For example, character A is $(41)_{16}$ and character a is $(61)_{16}$. The difference is bit 6, which is 0 in uppercase letters and 1 in lowercase letters. If we know the code for one case, we can find the code for the other easily by adding or subtracting, $(20)_{16}$ in hexadecimal or flipping the sixth bit. In other words, the code for character A is $(41)_{16} = (1000001)_2$, but the code for character a is $(61)_{16} = (1100001)_2$: the sixth bit in binary notation is flipped from 0 to 1.
7.  The uppercase letters are not immediately followed by lowercase letters—there are some punctuation characters in between.
8.  Decimal digits (0 to 9) begin at $(30)_{16}$. This means that if we want to change a numeric character to its face value as an integer, we need to subtract $(30)_{16} = 48$ from it. For example, the code for 8 in ASCII is $(38)_{16} = 56$. To find the face value, we need to subtract 48 from this, or $56 - 48 = 8$.
`,
  zh: `
# 附錄 A：萬國碼 (Unicode)

電腦使用數字。它們透過為每個字元分配一個數字來儲存字元。最初的編碼系統稱為 ASCII（美國資訊交換標準碼），有 128 個字元，每個字元儲存為 7 位元數字。ASCII 可以令人滿意地處理大寫和小寫字母、數字、標點符號和一些控制字元。曾有人試圖將 ASCII 字元集擴展到八位元。新代碼稱為擴展 ASCII (Extended ASCII)，但從未在國際上標準化。

為了克服 ASCII 和擴展 ASCII 固有的困難——沒有足夠的位元來表示其他語言通訊所需的字元和其他符號——Unicode 聯盟（一群多語言軟體製造商）創建了一個通用的編碼系統，以提供全面的字元集，稱為 **Unicode**。

Unicode 最初是一個 2 位元組的字元集。然而，Unicode 第 5 版是一個 4 位元組代碼，並且與 ASCII 和擴展 ASCII 完全相容。ASCII 集（現在稱為基本拉丁文）是高 25 位元設為零的 Unicode。擴展 ASCII（現在稱為 Latin-1）是高 24 位元設為零的 Unicode。圖 A.1 顯示了不同系統如何相容。

Unicode 中的每個字元或符號都由一個 32 位元數字定義。該代碼最多可以定義 $2^{32}$ (4294967296) 個字元或符號。這裡的描述使用以下格式的十六進位數字，其中每個 X 是一個十六進位數字：

\`U+XXXXXXXX\`

## A.1 平面 (PLANES)
Unicode 將整個代碼空間劃分為多個平面。最高有效的 16 位元定義了平面，這意味著我們可以有 65536 ($2^{16}$) 個平面。對於平面 0，最高有效的 16 位元是 0，$(0000)_{16}$，在平面 1 中，位元是 $(0001)_{16}$，在平面 2 中，它們是 $(0002)_{16}$，依此類推，直到在平面 65536 中，它們是 $(FFFF)_{16}$。每個平面最多可以定義 65536 個字元或符號。圖 A.2 顯示了 Unicode 代碼空間及其平面的結構。

### A.1.1 基本多文種平面 (BMP)
**基本多文種平面**，平面 0，旨在與以前的 16 位元 Unicode 相容。此平面中最高有效的 16 位元全為零。代碼通常顯示為 \`U+XXXX\`，其中 XXXX 僅定義最低有效的 16 位元。此平面主要定義不同語言的字元集，除了一些用於控制或其他特殊字元的代碼（有關更多資訊，請參閱 Unicode 網頁）。

### A.1.2 其他平面
Unicode 有其他平面：
*   **輔助多文種平面**，平面 $(0001)_{16}$，旨在為未包含在 BMP 平面中的多語言字元提供更多代碼。
*   **輔助表意文字平面**，平面 $(0002)_{16}$，旨在為表意符號提供代碼，即任何主要表示思想或意義而非聲音或發音的符號。
*   **輔助專用平面**，平面 $(000E)_{16}$，用於未在基本拉丁文或基本拉丁文-1 代碼中找到的特殊字元。
*   **私人使用平面**，平面 $(000F)_{16}$ 和 $(0010)_{16}$，保留供私人使用。

## A.2 ASCII
今天，ASCII 或基本拉丁文是 Unicode 的一部分。它佔據了 Unicode 中的前 128 個代碼（U-00000000 到 U-0000007F）。表 A.1 包含十六進位代碼和符號。要找到實際代碼，我們在代碼前加上 $(000000)_{16}$。

**表 A.1 ASCII**

| 代碼 | 符號 | 代碼 | 符號 | 代碼 | 符號 | 代碼 | 符號 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| $(00)_{16}$ | Null | $(20)_{16}$ | Space | $(40)_{16}$ | @ | $(60)_{16}$ | \` |
| $(01)_{16}$ | SOH | $(21)_{16}$ | ! | $(41)_{16}$ | A | $(61)_{16}$ | a |
| $(02)_{16}$ | STX | $(22)_{16}$ | “ | $(42)_{16}$ | B | $(62)_{16}$ | b |
| $(03)_{16}$ | ETX | $(23)_{16}$ | # | $(43)_{16}$ | C | $(63)_{16}$ | c |
| $(04)_{16}$ | EOT | $(24)_{16}$ | $ | $(44)_{16}$ | D | $(64)_{16}$ | d |
| $(05)_{16}$ | ENQ | $(25)_{16}$ | % | $(45)_{16}$ | E | $(65)_{16}$ | e |
| $(06)_{16}$ | ACK | $(26)_{16}$ | & | $(46)_{16}$ | F | $(66)_{16}$ | f |
| $(07)_{16}$ | BEL | $(27)_{16}$ | ‘ | $(47)_{16}$ | G | $(67)_{16}$ | g |
| $(08)_{16}$ | BS | $(28)_{16}$ | ( | $(48)_{16}$ | H | $(68)_{16}$ | h |
| $(09)_{16}$ | HT | $(29)_{16}$ | ) | $(49)_{16}$ | I | $(69)_{16}$ | i |
| $(0A)_{16}$ | LF | $(2A)_{16}$ | * | $(4A)_{16}$ | J | $(6A)_{16}$ | j |
| $(0B)_{16}$ | VT | $(2B)_{16}$ | + | $(4B)_{16}$ | K | $(6B)_{16}$ | k |
| $(0C)_{16}$ | FF | $(2C)_{16}$ | , | $(4C)_{16}$ | L | $(6C)_{16}$ | l |
| $(0D)_{16}$ | CR | $(2D)_{16}$ | - | $(4D)_{16}$ | M | $(6D)_{16}$ | m |
| $(0E)_{16}$ | SO | $(2E)_{16}$ | . | $(4E)_{16}$ | N | $(6E)_{16}$ | n |
| $(0F)_{16}$ | SI | $(2F)_{16}$ | / | $(4F)_{16}$ | O | $(6F)_{16}$ | o |
| $(10)_{16}$ | DLE | $(30)_{16}$ | 0 | $(50)_{16}$ | P | $(70)_{16}$ | p |
| $(11)_{16}$ | DC1 | $(31)_{16}$ | 1 | $(51)_{16}$ | Q | $(71)_{16}$ | q |
| $(12)_{16}$ | DC2 | $(32)_{16}$ | 2 | $(52)_{16}$ | R | $(72)_{16}$ | r |
| $(13)_{16}$ | DC3 | $(33)_{16}$ | 3 | $(53)_{16}$ | S | $(73)_{16}$ | s |
| $(14)_{16}$ | DC4 | $(34)_{16}$ | 4 | $(54)_{16}$ | T | $(74)_{16}$ | t |
| $(15)_{16}$ | NAK | $(35)_{16}$ | 5 | $(55)_{16}$ | U | $(75)_{16}$ | u |
| $(16)_{16}$ | SYN | $(36)_{16}$ | 6 | $(56)_{16}$ | V | $(76)_{16}$ | v |
| $(17)_{16}$ | ETB | $(37)_{16}$ | 7 | $(57)_{16}$ | W | $(77)_{16}$ | w |
| $(18)_{16}$ | CAN | $(38)_{16}$ | 8 | $(58)_{16}$ | X | $(78)_{16}$ | x |
| $(19)_{16}$ | EM | $(39)_{16}$ | 9 | $(59)_{16}$ | Y | $(79)_{16}$ | y |
| $(1A)_{16}$ | SUB | $(3A)_{16}$ | : | $(5A)_{16}$ | Z | $(7A)_{16}$ | z |
| $(1B)_{16}$ | ESC | $(3B)_{16}$ | ; | $(5B)_{16}$ | [ | $(7B)_{16}$ | { |
| $(1C)_{16}$ | FS | $(3C)_{16}$ | < | $(5C)_{16}$ | \\ | $(7C)_{16}$ | | |
| $(1D)_{16}$ | GS | $(3D)_{16}$ | = | $(5D)_{16}$ | ] | $(7D)_{16}$ | } |
| $(1E)_{16}$ | RS | $(3E)_{16}$ | > | $(5E)_{16}$ | ^ | $(7E)_{16}$ | ~ |
| $(1F)_{16}$ | US | $(3F)_{16}$ | ? | $(5F)_{16}$ | _ | $(7F)_{16}$ | DEL |

### A.2.1 ASCII 的一些特性
ASCII 有一些我們需要在這裡簡要提及的有趣特性：
1.  第一個代碼 $(00)_{16}$ 是不可列印的，是空字元。它代表沒有任何字元。
2.  最後一個代碼 $(7F)_{16}$ 是刪除字元，也是不可列印的。它被一些程式用來刪除當前字元。
3.  空格字元 $(20)_{16}$ 是一個可列印字元。它列印一個空白空間。
4.  代碼為 $(01)_{16}$ 到 $(1F)_{16}$ 的字元是控制字元：它們不可列印。表 A.2 顯示了它們的功能。這些字元中的大多數用於過時協定中的資料通訊。

**表 A.2 控制字元解釋**
| 符號 | 解釋 | 符號 | 解釋 |
| :--- | :--- | :--- | :--- |
| SOH | 標題開始 | DC1 | 設備控制 1 |
| STX | 文本開始 | DC2 | 設備控制 2 |
| ETX | 文本結束 | DC3 | 設備控制 3 |
| EOT | 傳輸結束 | DC4 | 設備控制 4 |
| ENQ | 詢問 | NAK | 否定確認 |
| ACK | 確認 | SYN | 同步閒置 |
| BEL | 響鈴 | ETB | 傳輸區塊結束 |
| BS | 退格 | CAN | 取消 |
| HT | 水平定位 | EM | 媒體結束 |
| LF | 換行 | SUB | 替換 |
| VT | 垂直定位 | ESC | 逸出 |
| FF | 換頁 | FS | 檔案分隔符 |
| CR | 歸位 | GS | 群組分隔符 |
| SO | 移出 | RS | 記錄分隔符 |
| SI | 移入 | US | 單元分隔符 |

5.  大寫字母從 $(41)_{16}$ 開始。小寫字母從 $(61)_{16}$ 開始。在數值比較時，大寫字母小於小寫字母。這意味著當我們根據 ASCII 值對列表進行排序時，大寫字母顯示在小寫字母之前。
6.  大寫和小寫字母在 7 位元代碼中僅相差一個位元。例如，字元 A 是 $(41)_{16}$，字元 a 是 $(61)_{16}$。區別在於第 6 位元，在大寫字母中為 0，在小寫字母中為 1。如果我們知道一種情況的代碼，我們可以透過加上或減去十六進位的 $(20)_{16}$ 或翻轉第六位元來輕鬆找到另一種情況的代碼。換句話說，字元 A 的代碼是 $(41)_{16} = (1000001)_2$，但字元 a 的代碼是 $(61)_{16} = (1100001)_2$：二進位表示法中的第六位元從 0 翻轉為 1。
7.  大寫字母後面不緊跟小寫字母——中間有一些標點符號。
8.  十進位數字（0 到 9）從 $(30)_{16}$ 開始。這意味著如果我們想將數字字元更改為其作為整數的面值，我們需要從中減去 $(30)_{16} = 48$。例如，ASCII 中 8 的代碼是 $(38)_{16} = 56$。要找到面值，我們需要從中減去 48，即 $56 - 48 = 8$。
`,
};
