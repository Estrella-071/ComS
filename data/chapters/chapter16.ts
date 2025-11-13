
export const chapter16Content = {
  en: `
# Chapter 16: Security

The topic of security is very broad. In this chapter, we try to give a very simple introduction to this topic.

## Objectives
After studying this chapter, the student should be able to: 
- Define security goals: confidentiality, integrity, and availability.
- Show how confidentiality can be achieved using symmetric-key and asymmetric-key ciphers.
- Discuss other aspects of security: message integrity, message authentication, digital signature, entity authentication, and key management.
- Discuss the use of firewalls to protect a system from harmful messages. 

## 16.1 INTRODUCTION
Information needs to be secured from attacks.

### 16.1.1 Security goals
- **Confidentiality**: Hiding information from unauthorized access.
- **Integrity**: Protecting information from unauthorized change.
- **Availability**: Information needs to be available to an authorized entity when it is needed.

### 16.1.2 Attacks
- **Attacks threatening confidentiality**: Snooping and traffic analysis.
- **Attacks threatening integrity**: Modification, masquerading, replaying, and repudiation.
- **Attacks threatening availability**: Denial of service.

### 16.1.3 Services and techniques
- **Cryptography**: The science and art of transforming messages to make them secure.
- **Steganography**: Concealing the message itself by covering it with something else.

## 16.2 CONFIDENTIALITY
Confidentiality can be achieved using ciphers.
- **Symmetric-key ciphers**: Use the same key for both encryption and decryption.
- **Asymmetric-key ciphers**: Use two separate keys: one private and one public.

## 16.3 OTHER ASPECTS OF SECURITY
- **Message integrity**: Ensured using a cryptographic hash function to create a message digest.
- **Message authentication**: A Message Authentication Code (MAC) provides message integrity and authentication.
- **Digital signature**: Provides message integrity, authentication, and non-repudiation using a pair of private-public keys.
- **Entity authentication**: A technique to let one party verify the identity of another.
- **Key management**: Methods to distribute and maintain secret and public keys, using Key-Distribution Centers (KDCs) or Certification Authorities (CAs).

## 16.4 FIREWALLS
A firewall is a device installed between an internal network and the Internet, designed to forward some packets and filter others.
- **Packet-filter firewall**: A router that uses a filtering table to decide which packets must be discarded.
- **Proxy firewall**: Filters messages based on the information available in the message itself at the application layer.
`,
  zh: `
# 第十六章：安全性

安全性的主題非常廣泛。在本章中，我們試圖對此主題做一個非常簡單的介紹。

## 學習目標
學完本章後，學生應能：
- 定義安全性目標：機密性、完整性和可用性。
- 展示如何使用對稱金鑰和非對稱金鑰加密法實現機密性。
- 討論安全性的其他方面：訊息完整性、訊息驗證、數位簽章、實體驗證和金鑰管理。
- 討論如何使用防火牆保護系統免受有害訊息的侵害。

## 16.1 簡介
資訊需要免受攻擊。

### 16.1.1 安全性目標
- **機密性 (Confidentiality)**：隱藏資訊，防止未經授權的存取。
- **完整性 (Integrity)**：保護資訊，防止未經授權的更改。
- **可用性 (Availability)**：資訊在需要時必須對授權實體可用。

### 16.1.2 攻擊
- **威脅機密性的攻擊**：窺探和流量分析。
- **威脅完整性的攻擊**：修改、偽裝、重放和否認。
- **威脅可用性的攻擊**：阻斷服務。

### 16.1.3 服務與技術
- **密碼學 (Cryptography)**：轉換訊息使其安全的科學與藝術。
- **隱寫術 (Steganography)**：透過用其他東西覆蓋訊息來隱藏訊息本身。

## 16.2 機密性
可以使用加密法實現機密性。
- **對稱金鑰加密法 (Symmetric-key ciphers)**：加密和解密都使用相同的金鑰。
- **非對稱金鑰加密法 (Asymmetric-key ciphers)**：使用兩個獨立的金鑰：一個私鑰和一個公鑰。

## 16.3 安全性的其他方面
- **訊息完整性**：透過使用密碼雜湊函數創建訊息摘要來確保。
- **訊息驗證**：訊息驗證碼 (MAC) 提供訊息完整性和驗證。
- **數位簽章**：使用一對私鑰-公鑰提供訊息完整性、驗證和不可否認性。
- **實體驗證**：一種讓一方驗證另一方身份的技術。
- **金鑰管理**：使用金鑰分發中心 (KDC) 或憑證頒發機構 (CA) 來分發和維護秘密金鑰和公鑰的方法。

## 16.4 防火牆
防火牆是安裝在內部網路和網際網路之間的設備，旨在轉發某些封包並過濾其他封包。
- **封包過濾防火牆**：一種使用過濾表來決定必須丟棄哪些封包的路由器。
- **代理防火牆**：根據應用層訊息本身可用的資訊來過濾訊息。
`,
};
