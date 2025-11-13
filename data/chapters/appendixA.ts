
export const appendixAContent = {
  en: `
# Appendix A: Unicode

Computers store characters by assigning a number to each one. The original coding system was called ASCII (American Standard Code for Information Interchange). Unicode was created to provide a comprehensive character set for all languages.

## A.1 PLANES
Unicode divides its code space into planes. The Basic Multilingual Plane (BMP), or Plane 0, contains characters for most modern languages and many symbols.

## A.2 ASCII
ASCII (Basic Latin) is a subset of Unicode, occupying the first 128 code points.

### ASCII Table (Control Characters)
| Code (Hex) | Symbol | Description |
|---|---|---|
| 00 | NUL | Null |
| 01 | SOH | Start of Heading |
| 02 | STX | Start of Text |
| 07 | BEL | Bell |
| 08 | BS | Backspace |
| 09 | HT | Horizontal Tab |
| 0A | LF | Line Feed |
| 0D | CR | Carriage Return |
| 1B | ESC | Escape |
| 7F | DEL | Delete |

### ASCII Table (Printable Characters)
| Code (Hex) | Symbol | | Code (Hex) | Symbol | | Code (Hex) | Symbol | | Code (Hex) | Symbol |
|---|---|---|---|---|---|---|---|
| 20 | (space) | | 40 | @ | | 60 | \` |
| 21 | ! | | 41 | A | | 61 | a |
| 23 | # | | 42 | B | | 62 | b |
| 2B | + | | 43 | C | | 63 | c |
| 30 | 0 | | 50 | P | | 70 | p |
| 31 | 1 | | 51 | Q | | 71 | q |
| 39 | 9 | | 59 | Y | | 79 | y |
| 3A | : | | 5A | Z | | 7A | z |
`,
  zh: `
# 附錄 A：萬國碼 (Unicode)

電腦透過為每個字元分配一個數字來儲存字元。最初的編碼系統稱為 ASCII（美國資訊交換標準碼）。Unicode 的創建是為了為所有語言提供一個全面的字元集。

## A.1 平面 (PLANES)
Unicode 將其碼空間劃分為多個平面。基本多文種平面 (BMP)，或稱第 0 平面，包含了大多數現代語言的字元和許多符號。

## A.2 ASCII
ASCII (基本拉丁文) 是 Unicode 的一個子集，佔據了前 128 個碼點。

### ASCII 表 (控制字元)
| 碼 (十六進位) | 符號 | 描述 |
|---|---|---|
| 00 | NUL | 空字元 |
| 01 | SOH | 標題開始 |
| 02 | STX | 文本開始 |
| 07 | BEL | 響鈴 |
| 08 | BS | 退格 |
| 09 | HT | 水平定位字元 |
| 0A | LF | 換行 |
| 0D | CR | 歸位 |
| 1B | ESC | 逸出 |
| 7F | DEL | 刪除 |

### ASCII 表 (可印出字元)
| 碼 (十六進位) | 符號 | | 碼 (十六進位) | 符號 | | 碼 (十六進位) | 符號 | | 碼 (十六進位) | 符號 |
|---|---|---|---|---|---|---|---|
| 20 | (空白) | | 40 | @ | | 60 | \` |
| 21 | ! | | 41 | A | | 61 | a |
| 23 | # | | 42 | B | | 62 | b |
| 2B | + | | 43 | C | | 63 | c |
| 30 | 0 | | 50 | P | | 70 | p |
| 31 | 1 | | 51 | Q | | 71 | q |
| 39 | 9 | | 59 | Y | | 79 | y |
| 3A | : | | 5A | Z | | 7A | z |
`,
};
