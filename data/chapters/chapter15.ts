

export const chapter15Content = {
  en: `
# Chapter 15: Data Compression

In recent years technology has changed the way we transmit and store data. For example, fiber-optic cable allows us to transmit data much faster, and DVDs allow us to store huge amounts of data on a physically small medium. However, as in other aspects of life, the rate of demand from the public is ever increasing. Today, we want to download more and more data in a shorter and shorter amount of time. We also want to store more and more data in a smaller space.

Compressing data can reduce the amount of data to be sent or stored by partially eliminating inherent redundancy. Redundancy is created when we produce data. Through data compression, we make transmission and storage more efficient, and at the same time, we preserve the integrity of the data.

## Objectives
After studying this chapter, the student should be able to:
- Distinguish between lossless and lossy compression.
- Describe run-length encoding and how it achieves compression.
- Describe Huffman coding and how it achieves compression.
- Describe Lempel Ziv encoding and the role of the dictionary in encoding and decoding.
- Describe the main idea behind the JPEG standard for compressing still images.
- Describe the main idea behind the MPEG standard for compressing video and its relation to JPEG.
- Describe the main idea behind the MP3 standard for compressing audio.

## 15.1 INTRODUCTION
Data compression implies sending or storing a smaller number of bits. Although many methods are used for this purpose, in general these methods can be divided into two broad categories: lossless and lossy methods.

We first discuss lossless compression methods, as they are simpler and easier to understand. We then present lossy compression methods.

## 15.2 LOSSLESS COMPRESSION METHODS
In **lossless data compression**, the integrity of the data is preserved. The original data and the data after compression and decompression are exactly the same because, in these methods, the compression and decompression algorithms are exact inverses of each other: no part of the data is lost in the process. Redundant data is removed in compression and added during decompression.

Lossless compression methods are normally used when we cannot afford to lose any data. For example, we must not lose data when we compress a text file or an application program.

We discuss three lossless compression methods in this section: *run-length encoding*, *Huffman coding*, and the *Lempel Ziv algorithm*.

### 15.2.1 Run-length encoding
**Run-length encoding** is probably the simplest method of compression. It can be used to compress data made of any combination of symbols. It does not need to know the frequency of occurrence of symbols (as is necessary for Huffman coding) and can be very efficient if data is represented as 0s and 1s.

The general idea behind this method is to replace consecutive repeating occurrences of a symbol by one occurrence of the symbol followed by the number of occurrences. For example, \`AAAAAAAA\` can be replaced by \`A08\`. Note that we use a fixed number of digits (two) to represent the count.

The method can be even more efficient if the data uses only two symbols (for example 0 and 1) in its bit pattern and one symbol is more frequent than the other. For example, let’s say we have an image represented by mostly 0s and some 1s. In this case, we can reduce the number of bits by sending (or storing) the number of 0s occurring between two 1s.

We have represented the counts as a 4-bit binary number (unsigned integer). In an actual situation, we would find an optimal number of bits to avoid introducing extra redundancy.

Note that, given a 4-bit binary compression, if there are more than fifteen 0s, they are broken into two or more groups. For example, a sequence of twenty-five 0s is encoded as \`1111 1010\`. Now the question is how the decoding algorithm knows that this consists of twenty-five 0s and not fifteen 0s, then a 1, and then ten 0s. The answer is that if the first count is \`1111\`, the receiver knows the next 4-bit pattern is a continuation of 0s. Now another question is raised: what if there are exactly fifteen 0s between two 1s? In this case, the pattern is \`1111\` followed by \`0000\`.

### 15.2.2 Huffman coding
**Huffman coding** assigns shorter codes to symbols that occur more frequently and longer codes to those that occur less frequently. For example, imagine we have a text file that uses only five characters (A, B, C, D, E). We chose only five characters to make the discussion simpler, but the procedure is equally valid for a smaller or greater number of characters.

Before we can assign bit patterns to each character, we assign each character a weight based on its frequency of use. Once the weight of each character is established, we build a tree based on those values. The process for building this tree follows three basic steps:
1.  Put the entire character set in a row. Each character is now a node at the lowest level of the tree.
2.  Find the two nodes with the smallest weights and join them to form a third node, resulting in a simple two-level tree. The weight of the new node is the combined weights of the original two nodes. This node, one level up from the leaves, is eligible for combination with other nodes. Remember that the sum of the weights of the two nodes chosen must be smaller than the combination of any other possible choices.
3.  Repeat step 2 until all of the nodes, on every level, are combined into a single tree.

Once the tree is complete, use it to assign codes to each character. First, assign a bit value to each branch. Starting from the root (top node), assign 0 to the left branch and 1 to the right branch and repeat this pattern at each node.

A character’s code is found by starting at the root and following the branches that lead to that character. The code itself is the bit value of each branch on the path, taken in sequence.

**Encoding**
Let us see how to encode text using the code for our five characters.
Two points are worth mentioning. First, notice that there is a sense of compression even in this small and unrealistic code. If we want to send the text without using Huffman coding, we need to assign a 3-bit code to each character. You would have sent 30 bits, whereas with Huffman coding, we send only 22 bits.
Second, notice that we have not used any delimiters between the bits that encode each character. We write the codes one after another. The beauty of Huffman coding is that no code is the prefix of another code. There is therefore no ambiguity in encoding, so the decoding algorithm can decode the received data without ambiguity.

**Decoding**
The recipient has a very easy job in decoding the data that it receives. When the recipient receives the first bits, it does not have to wait for the next bit to make a decision—it knows that these bits encode a specific letter if the bits match a code in the tree. This is why Huffman code is called an instantaneous code—the decoder can unambiguously decode the bits instantaneously, using the minimum number of bits.

### 15.2.3 Lempel Ziv encoding
**Lempel Ziv (LZ) encoding**, named after its inventors (Abraham Lempel and Jacob Ziv), is an example of a category of algorithms called **dictionary-based encoding**. The idea is to create a dictionary (a table) of strings used during the communication session. If both the sender and the receiver have a copy of the dictionary, then previously encountered strings can be substituted by their index in the dictionary to reduce the amount of information transmitted.

Although the idea appears simple, several difficulties surface in the implementation. First, how can a dictionary be created for each session? It cannot be universal, due to its length. Second, how can the recipient acquire the dictionary created by the sender—if we send the dictionary, we are sending extra data, which defeats the whole purpose of compression?

The Lempel Ziv (LZ) algorithm is a practical algorithm that uses the idea of adaptive dictionary-based encoding. The algorithm has gone through several versions (LZ77, LZ78). We introduce the basic idea of this algorithm with an example.

**Compression**
In this phase there are two concurrent events: building an indexed dictionary and compressing a string of symbols. The algorithm extracts the smallest substring that cannot be found in the dictionary from the remaining uncompressed string. It then stores a copy of this substring in the dictionary as a new entry and assigns it an index value. Compression occurs when the substring, except for the last character, is replaced with the index found in the dictionary. The process then inserts the index and the last character of the substring into the compressed string. For example, if the substring is \`ABBB\`, we search for \`ABB\` in the dictionary. If we find that the index for \`ABB\` is 4, the compressed substring is therefore \`4B\`.

**Decompression**
Decompression is the inverse of the compression process. The process extracts the substrings from the compressed string and tries to replace the indexes with the corresponding entry in the dictionary, which is empty at first and built up gradually. The idea is that when an index is received, there is already an entry in the dictionary corresponding to that index.

## 15.3 LOSSY COMPRESSION METHODS
Loss of information is not acceptable in a text file or a program file. It is, however, acceptable in an image, video, or audio file. The reason is that our eyes and ears cannot distinguish subtle changes. In such cases, we can use a **lossy data compression** method. These methods are cheaper—they take less time and space when it comes to sending millions of bits per second for images and video.

Several methods have been developed using lossy compression techniques. **JPEG (Joint Photographic Experts Group)** encoding is used to compress pictures and graphics, **MPEG (Moving Picture Experts Group)** encoding is used to compress video, and **MP3 (MPEG audio layer 3)** for audio compression.

### 15.3.1 Image compression—JPEG encoding
An image can be represented by a two-dimensional array (table) of picture elements (pixels). For example, 640 × 480 = 307,200 pixels. If the picture is grayscale, each pixel can be represented by an 8-bit integer, giving 256 levels of gray. If the picture is color, each pixel can be represented by 24 bits (3 × 8 bits), with each 8 bits representing one of the colors in the RBG color system.

In JPEG, a grayscale picture is divided into blocks of 8 × 8 pixel blocks. The purpose of dividing the picture into blocks is to decrease the number of calculations.
The whole idea of JPEG is to change the picture into a linear (vector) set of numbers that reveals the redundancies. The redundancies (lack of changes) can then be removed using one of the lossless compression methods we studied previously.

**Discrete cosine transform (DCT)**
In this step, each block of 64 pixels goes through a transformation called the **discrete cosine transform (DCT)**. The transformation changes the 64 values so that the relative relationships between pixels are kept but the redundancies are revealed. The value of $T(0,0)$ is the average of the other values. This is called the **DC value**. The rest of the values, called **AC values**, in $T(m, n)$ represent changes in the pixel values.

**Quantization**
After the T table is created, the values are quantized to reduce the number of bits needed for encoding. **Quantization** divides the number of bits by a constant and then drops the fraction. This reduces the required number of bits even more. Note that the only phase in the process that is not reversible is the quantizing phase. You lose some information here that is not recoverable. The only reason that JPEG is a lossy compression method is because of the quantization phase.

**Compression**
After quantization the values are read from the table, and redundant 0s are removed. However, to cluster the 0s together, the process reads the table diagonally in a zigzag fashion rather than row by row or column by column. The reason is that if the picture does not have fine changes, the bottom right corner of the T table is all 0s. JPEG usually uses run-length encoding at the compression phase to compress the bit pattern resulting from the zigzag linearization.

### 15.3.2 Video compression—MPEG encoding
The **Moving Picture Experts Group (MPEG)** method is used to compress video. In principle, a motion picture is a rapid sequence of a set of frames in which each frame is a picture. In other words, a frame is a spatial combination of pixels, and a video is a temporal combination of frames that are sent one after another. Compressing video, then, means spatially compressing each frame and temporally compressing a set of frames.

**Spatial compression**
The **spatial compression** of each frame is done with JPEG, or a modification of it. Each frame is a picture that can be independently compressed.

**Temporal compression**
In **temporal compression**, redundant frames are removed. When we watch television, for example, we receive 30 frames per second. However, most of the consecutive frames are almost the same.
To temporally compress data, the MPEG method first divides frames into three categories: I-frames, P-frames, and B-frames.
- **I-frames**: An **intracoded frame (I-frame)** is an independent frame that is not related to any other frame. They are present at regular intervals. An I-frame must appear periodically due to some sudden change in the frame that the previous and following frames cannot show.
- **P-frames**: A **predicted frame (P-frame)** is related to the preceding I-frame or P-frame. In other words, each P-frame contains only the changes from the preceding frame. P-frames carry much less information than other frame types and carry even fewer bits after compression.
- **B-frames**: A **bidirectional frame (B-frame)** is relative to the preceding and following I-frame or P-frame. In other words, each B-frame is relative to the past and the future. Note that a B-frame is never related to another B-frame.

### 15.3.3 Audio compression
Audio compression can be used for speech or music. Two categories of techniques are used for audio compression: predictive encoding and perceptual encoding.

**Predictive encoding**
In **predictive encoding**, the differences between samples are encoded instead of encoding all the sampled values. This type of compression is normally used for speech. Several standards have been defined such as GSM.

**Perceptual encoding: MP3**
The most common compression technique used to create CD-quality audio is based on the **perceptual encoding** technique. This type of audio needs at least 1.411 Mbps, which cannot be sent over the Internet without compression. **MP3 (MPEG audio layer 3)**, a part of the MPEG standard, uses this technique.

Perceptual encoding is based on the science of psychoacoustics, which is the study of how people perceive sound. The idea is based on flaws in our auditory system: some sounds can mask other sounds. Masking can happen in both frequency and time. In **frequency masking**, a loud sound in one frequency range can partially or totally mask a softer sound in another frequency range. In **temporal masking**, a loud sound can reduce the sensitivity of our hearing for a short time even after the sound has stopped.

MP3 uses these two phenomena, frequency and temporal masking, to compress audio signals. The technique analyzes and divides the audio spectrum into several groups. Zero bits are allocated to frequency ranges that are totally masked, a small number of bits are allocated to frequency ranges that are partially masked, and a larger number of bits are allocated to frequency ranges that are not masked.

## 15.4 END-CHAPTER MATERIALS
### 15.4.2 Key terms
- AC value
- bidirectional frame (B-frame)
- data compression
- DC value
- dictionary-based encoding
- discrete cosine transform (DCT)
- frequency masking
- Huffman coding
- intracoded frame (I-frame)
- Joint Photographic Experts Group (JPEG)
- Lempel Ziv (LZ) encoding
- Lempel Ziv Welch (LZW) encoding
- lossless data compression
- lossy data compression
- Moving Picture Experts Group (MPEG)
- MPEG audio layer 3 (MP3)
- perceptual encoding
- predicted frame (P-frame)
- predictive encoding
- run-length encoding
- spatial compression
- temporal compression
- temporal masking

### 15.4.3 Summary
- Data compression methods are either lossless (all information is recoverable) or lossy (some information is lost).
- In lossless compression methods, the received data is an exact replica of the sent data. Three lossless compression methods are run-length encoding, Huffman coding, and Lempel Ziv (LZ) encoding.
- In run-length encoding, repeated occurrences of a symbol are replaced by a symbol and the number of occurrences of the symbol.
- In Huffman coding, the code length is a function of symbol frequency: more frequent symbols have shorter codes than less frequent symbols.
- In LZ encoding, repeated strings or words are stored in memory locations. An index to the memory location replaces the string or word. LZ encoding requires a dictionary and an algorithm at both sender and receiver.
- In lossy compression methods, the received data need not be an exact replica of the sent data. Three lossy compression methods were discussed in this chapter: JPEG, MPEG, and MP3.
- JPEG (Joint Photographic Experts Group) compression is a method of compressing pictures and graphics. The JPEG process involves blocking, the discrete cosine transform, quantization, and lossless compression.
- MPEG (Moving Pictures Experts Group) compression is a method of compressing video. MPEG involves both spatial compression and temporal compression. The former is similar to JPEG, while the latter removes redundant frames.
- MP3 (MPEG audio layer 3) is a part of the MPEG standard. MP3 uses perceptual encoding techniques to compress CD-quality audio.
`,
  zh: `
# 第十五章：資料壓縮

近年來，技術改變了我們傳輸和儲存資料的方式。例如，光纖電纜允許我們以更快的速度傳輸資料，而 DVD 允許我們在物理上很小的媒體上儲存大量資料。然而，正如生活的其他方面一樣，大眾的需求率不斷增加。今天，我們希望在越來越短的時間內下載越來越多的資料。我們也希望在更小的空間中儲存越來越多的資料。

壓縮資料可以透過部分消除固有的冗餘來減少要發送或儲存的資料量。當我們產生資料時就會產生冗餘。透過資料壓縮，我們使傳輸和儲存更有效率，同時我們也保留了資料的完整性。

## 學習目標
學完本章後，學生應能：
- 區分無損壓縮和失真壓縮。
- 描述連長編碼 (run-length encoding) 及其如何實現壓縮。
- 描述霍夫曼編碼 (Huffman coding) 及其如何實現壓縮。
- 描述 Lempel Ziv 編碼以及字典在編碼和解碼中的作用。
- 描述用於壓縮靜態圖像的 JPEG 標準背後的主要思想。
- 描述用於壓縮視訊的 MPEG 標準背後的主要思想及其與 JPEG 的關係。
- 描述用於壓縮音訊的 MP3 標準背後的主要思想。

## 15.1 簡介
資料壓縮意味著發送或儲存較少數量的位元。雖然有許多方法用於此目的，但一般來說這些方法可以分為兩大類：無損方法和失真方法。

我們先討論無損壓縮方法，因為它們較簡單且容易理解。然後我們介紹失真壓縮方法。

## 15.2 無損壓縮方法
在**無損資料壓縮**中，資料的完整性得到保留。原始資料與壓縮和解壓縮後的資料完全相同，因為在這些方法中，壓縮和解壓縮演算法互為逆運算：過程中沒有任何資料丟失。冗餘資料在壓縮中被移除，在解壓縮時被添加回來。

無損壓縮方法通常用於我們不能承受丟失任何資料的情況。例如，當我們壓縮文字檔案或應用程式時，我們絕不能丟失資料。

我們在本節討論三種無損壓縮方法：*連長編碼*、*霍夫曼編碼*和 *Lempel Ziv 演算法*。

### 15.2.1 連長編碼 (Run-length encoding)
**連長編碼**可能是最簡單的壓縮方法。它可以用來壓縮由任何符號組合組成的資料。它不需要知道符號出現的頻率（這對於霍夫曼編碼是必要的），如果資料表示為 0 和 1，它可以非常有效率。

這種方法背後的一般思想是用一次符號的出現加上出現的次數來替換連續重複出現的符號。例如，\`AAAAAAAA\` 可以替換為 \`A08\`。請注意，我們使用固定數量的位數（兩位）來表示計數。

如果資料在其位元模式中僅使用兩個符號（例如 0 和 1），並且一個符號比另一個更頻繁，則該方法可以更有效率。例如，假設我們有一個主要由 0 和一些 1 表示的圖像。在這種情況下，我們可以透過發送（或儲存）兩個 1 之間出現的 0 的數量來減少位元數。

我們將計數表示為 4 位元二進位數字（無符號整數）。在實際情況下，我們會找到最佳的位元數以避免引入額外的冗餘。

請注意，給定 4 位元二進位壓縮，如果有超過十五個 0，它們會被分成兩組或多組。例如，二十五個 0 的序列被編碼為 \`1111 1010\`。現在的問題是解碼演算法如何知道這包含二十五個 0 而不是十五個 0，然後是一個 1，然後是十個 0。答案是如果第一個計數是 \`1111\`，接收者知道下一個 4 位元模式是 0 的延續。現在提出了另一個問題：如果兩個 1 之間正好有十五個 0 怎麼辦？在這種情況下，模式是 \`1111\` 後跟 \`0000\`。

### 15.2.2 霍夫曼編碼 (Huffman coding)
**霍夫曼編碼**為出現頻率較高的符號分配較短的代碼，為出現頻率較低的符號分配較長的代碼。例如，想像我們有一個只使用五個字元 (A, B, C, D, E) 的文字檔案。我們只選擇五個字元是為了使討論更簡單，但該程序對於較少或較多數量的字元同樣有效。

在我們為每個字元分配位元模式之前，我們先根據其使用頻率為每個字元分配一個權重。一旦確定了每個字元的權重，我們就根據這些值構建一棵樹。構建這棵樹的過程遵循三個基本步驟：
1.  將整個字元集排成一行。每個字元現在是樹的最低層級的一個節點。
2.  找出權重最小的兩個節點並將它們連接起來形成第三個節點，產生一個簡單的兩層樹。新節點的權重是原始兩個節點權重的總和。這個節點，位於葉子上一層，有資格與其他節點組合。請記住，所選兩個節點的權重總和必須小於任何其他可能選擇的組合。
3.  重複步驟 2，直到所有層級的所有節點組合成一棵單獨的樹。

一旦樹完成，就用它來為每個字元分配代碼。首先，為每個分支分配一個位元值。從根（頂部節點）開始，將 0 分配給左分支，將 1 分配給右分支，並在每個節點重複此模式。

字元的代碼是透過從根開始並跟隨通向該字元的分支找到的。代碼本身是路徑上每個分支的位元值，按順序排列。

**編碼**
讓我們看看如何使用我們五個字元的代碼來編碼文字。
有兩點值得一提。首先，請注意，即使在這個小型且不切實際的代碼中，也有一種壓縮感。如果我們想不使用霍夫曼編碼發送文字，我們需要為每個字元分配一個 3 位元的代碼。你會發送 30 個位元，而使用霍夫曼編碼，我們只發送 22 個位元。
其次，請注意我們沒有在編碼每個字元的位元之間使用任何分隔符。我們一個接一個地寫代碼。霍夫曼編碼的美妙之處在於沒有代碼是另一個代碼的前綴。因此，在編碼中沒有歧義，所以解碼演算法可以無歧義地解碼接收到的資料。

**解碼**
接收者在解碼接收到的資料時工作非常輕鬆。當接收者接收到第一組位元時，它不必等待下一個位元來做決定——如果位元與樹中的代碼匹配，它就知道這些位元編碼了一個特定的字母。這就是為什麼霍夫曼編碼被稱為即時碼——解碼器可以使用最少的位元數即時且無歧義地解碼位元。

### 15.2.3 Lempel Ziv 編碼
**Lempel Ziv (LZ) 編碼**，以其發明者（Abraham Lempel 和 Jacob Ziv）命名，是稱為**基於字典的編碼**的一類演算法的例子。其想法是創建一個通訊會話期間使用的字串字典（表）。如果發送者和接收者都有字典的副本，那麼先前遇到的字串可以用它們在字典中的索引替換，以減少傳輸的資訊量。

雖然這個想法看起來很簡單，但在實作中會出現一些困難。首先，如何為每個會話創建一個字典？由於其長度，它不可能是通用的。其次，接收者如何獲取發送者創建的字典——如果我們發送字典，我們就在發送額外的資料，這違背了壓縮的初衷？

Lempel Ziv (LZ) 演算法是一個實用的演算法，它使用自適應基於字典的編碼思想。該演算法經歷了幾個版本 (LZ77, LZ78)。我們通過一個例子介紹該演算法的基本思想。

**壓縮**
在這個階段有兩個並發事件：建立索引字典和壓縮符號字串。演算法從剩餘的未壓縮字串中提取在字典中找不到的最小子字串。然後它將此子字串的副本儲存在字典中作為新條目並分配一個索引值。當子字串（除了最後一個字元）被字典中找到的索引替換時，就會發生壓縮。該過程隨後將索引和子字串的最後一個字元插入壓縮字串中。例如，如果子字串是 \`ABBB\`，我們在字典中搜尋 \`ABB\`。如果我們發現 \`ABB\` 的索引是 4，那麼壓縮後的子字串就是 \`4B\`。

**解壓縮**
解壓縮是壓縮過程的逆過程。該過程從壓縮字串中提取子字串，並嘗試用字典中的相應條目替換索引，字典起初是空的，並逐漸建立起來。其想法是，當接收到索引時，字典中已經有對應於該索引的條目。

## 15.3 失真壓縮方法
資訊的丟失在文字檔案或程式檔案中是不可接受的。然而，在圖像、視訊或音訊檔案中是可以接受的。原因是我們的眼睛和耳朵無法區分細微的變化。在這種情況下，我們可以使用**失真資料壓縮**方法。這些方法更便宜——在每秒發送數百萬位元的圖像和視訊時，它們佔用的時間和空間更少。

已經使用失真壓縮技術開發了幾種方法。**JPEG (聯合圖像專家小組)** 編碼用於壓縮圖片和圖形，**MPEG (動態影像專家小組)** 編碼用於壓縮視訊，以及 **MP3 (MPEG 音訊層 3)** 用於音訊壓縮。

### 15.3.1 圖像壓縮—JPEG 編碼
圖像可以由圖片元素（像素）的二維陣列（表）表示。例如，640 × 480 = 307,200 像素。如果圖片是灰階的，每個像素可以用一個 8 位元整數表示，給出 256 個灰度級別。如果圖片是彩色的，每個像素可以用 24 位元（3 × 8 位元）表示，每 8 位元代表 RGB 顏色系統中的一種顏色。

在 JPEG 中，灰階圖片被分成 8 × 8 像素的區塊。將圖片分成區塊的目的是減少計算量。
JPEG 的整個想法是將圖片變成一組顯示冗餘的線性（向量）數字。冗餘（缺乏變化）隨後可以使用我們先前研究過的無損壓縮方法之一去除。

**離散餘弦變換 (DCT)**
在此步驟中，每個 64 像素的區塊都要經過稱為**離散餘弦變換 (DCT)** 的轉換。轉換改變了 64 個值，使得像素之間的相對關係得以保留，但揭示了冗餘。$T(0,0)$ 的值是其他值的平均值。這稱為 **DC 值**。$T(m, n)$ 中的其餘值稱為 **AC 值**，代表像素值的變化。

**量化**
在 T 表創建後，對值進行量化以減少編碼所需的位元數。**量化**將位元數除以一個常數，然後捨去小數部分。這進一步減少了所需的位元數。請注意，過程中唯一不可逆的階段是量化階段。你在這裡丟失了一些無法恢復的資訊。JPEG 是失真壓縮方法的唯一原因是因為量化階段。

**壓縮**
量化後，從表中讀取值，並移除冗餘的 0。然而，為了將 0 聚集在一起，該過程以 Z 字形對角線讀取表，而不是逐行或逐列讀取。原因是如果圖片沒有細微的變化，T 表的右下角全是 0。JPEG 通常在壓縮階段使用連長編碼來壓縮 Z 字形線性化產生的位元模式。

### 15.3.2 視訊壓縮—MPEG 編碼
**動態影像專家小組 (MPEG)** 方法用於壓縮視訊。原則上，動態圖片是一組影格的快速序列，其中每個影格都是一張圖片。換句話說，影格是像素的空間組合，而視訊是依次發送的影格的時間組合。因此，壓縮視訊意味著在空間上壓縮每個影格，並在時間上壓縮一組影格。

**空間壓縮**
每個影格的**空間壓縮**是使用 JPEG 或其修改版本完成的。每個影格都是一張可以獨立壓縮的圖片。

**時間壓縮**
在**時間壓縮**中，冗餘影格被移除。例如，當我們看電視時，我們每秒接收 30 個影格。然而，大多數連續的影格幾乎相同。
為了在時間上壓縮資料，MPEG 方法首先將影格分為三類：I-frames、P-frames 和 B-frames。
- **I-frames**：**幀內編碼影格 (I-frame)** 是一個與任何其他影格無關的獨立影格。它們定期出現。由於前一個和後一個影格無法顯示的某些突然變化，I-frame 必須週期性地出現。
- **P-frames**：**預測影格 (P-frame)** 與前面的 I-frame 或 P-frame 有關。換句話說，每個 P-frame 僅包含來自前一個影格的變化。P-frame 攜帶的資訊比其他影格類型少得多，並且在壓縮後攜帶的位元更少。
- **B-frames**：**雙向影格 (B-frame)** 與前面和後面的 I-frame 或 P-frame 有關。換句話說，每個 B-frame 與過去和未來都有關。請注意，B-frame 永遠不與另一個 B-frame 相關。

### 15.3.3 音訊壓縮
音訊壓縮可用於語音或音樂。兩類技術用於音訊壓縮：預測編碼和感知編碼。

**預測編碼**
在**預測編碼**中，對樣本之間的差異進行編碼，而不是對所有採樣值進行編碼。這種類型的壓縮通常用於語音。已經定義了幾個標準，如 GSM。

**感知編碼：MP3**
用於創建 CD 品質音訊的最常見壓縮技術是基於**感知編碼**技術。這種類型的音訊至少需要 1.411 Mbps，如果不壓縮就無法透過網際網路發送。**MP3 (MPEG 音訊層 3)** 是 MPEG 標準的一部分，使用了這種技術。

感知編碼基於心理聲學，即研究人們如何感知聲音的學科。這個想法基於我們聽覺系統的缺陷：有些聲音可以掩蓋其他聲音。掩蔽可以發生在頻率和時間上。在**頻率掩蔽**中，一個頻率範圍內的響亮聲音可以部分或完全掩蓋另一個頻率範圍內的較柔和聲音。在**時間掩蔽**中，響亮的聲音即使在聲音停止後也能在短時間內降低我們聽覺的靈敏度。

MP3 使用這兩種現象，頻率和時間掩蔽，來壓縮音訊信號。該技術分析並將音訊頻譜分為幾組。零位元分配給完全被掩蓋的頻率範圍，少量位元分配給部分被掩蓋的頻率範圍，較多位元分配給未被掩蓋的頻率範圍。

## 15.4 章末材料
### 15.4.2 關鍵詞
- AC 值
- 雙向影格 (B-frame)
- 資料壓縮
- DC 值
- 基於字典的編碼
- 離散餘弦變換 (DCT)
- 頻率掩蔽
- 霍夫曼編碼
- 幀內編碼影格 (I-frame)
- 聯合圖像專家小組 (JPEG)
- Lempel Ziv (LZ) 編碼
- Lempel Ziv Welch (LZW) 編碼
- 無損資料壓縮
- 失真資料壓縮
- 動態影像專家小組 (MPEG)
- MPEG 音訊層 3 (MP3)
- 感知編碼
- 預測影格 (P-frame)
- 預測編碼
- 連長編碼
- 空間壓縮
- 時間壓縮
- 時間掩蔽

### 15.4.3 摘要
- 資料壓縮方法要麼是無損的（所有資訊都可恢復），要麼是失真的（丟失一些資訊）。
- 在無損壓縮方法中，接收到的資料是發送資料的精確複本。三種無損壓縮方法是連長編碼、霍夫曼編碼和 Lempel Ziv (LZ) 編碼。
- 在連長編碼中，重複出現的符號被符號和符號出現的次數所取代。
- 在霍夫曼編碼中，代碼長度是符號頻率的函數：較頻繁的符號比較不頻繁的符號具有更短的代碼。
- 在 LZ 編碼中，重複的字串或單詞儲存在記憶體位置中。記憶體位置的索引替換字串或單詞。LZ 編碼要求發送者和接收者都有字典和演算法。
- 在失真壓縮方法中，接收到的資料不必是發送資料的精確複本。本章討論了三種失真壓縮方法：JPEG、MPEG 和 MP3。
- JPEG (聯合圖像專家小組) 壓縮是一種壓縮圖片和圖形的方法。JPEG 過程涉及分塊、離散餘弦變換、量化和無損壓縮。
- MPEG (動態影像專家小組) 壓縮是一種壓縮視訊的方法。MPEG 涉及空間壓縮和時間壓縮。前者類似於 JPEG，而後者移除了冗餘影格。
- MP3 (MPEG 音訊層 3) 是 MPEG 標準的一部分。MP3 使用感知編碼技術來壓縮 CD 品質的音訊。
`
};
    