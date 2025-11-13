
export const chapter6Content = {
  en: `
# Chapter 6: Computer Networks and Internet

The development of the personal computer has brought about tremendous changes for 
business, industry, science, and education. This chapter focuses on computer networks and the Internet.

## Objectives
After studying this chapter, the student should be able to:
- Describe local and wide area networks (LANs and WANs).
- Distinguish an internet from the Internet.
- Describe the TCP/IP protocol suite as the network model in the Internet.
- Define the layers in the TCP/IP protocol suite and their relationship.
- Describe some applications at the application layer.
- Describe the services provided by the transport-layer and network-layer protocols.
- Describe different protocols used at the data-link layer and the duties of the physical layer.

## 6.1 OVERVIEW
A **network** is the interconnection of a set of devices capable of communication.
- **Local area network (LAN)**: Usually privately owned and connects some hosts in a single office, building, or campus.
- **Wide area network (WAN)**: Has a wider geographical span, spanning a town, a state, a country, or even the world.
- **Internetwork**: When two or more networks are connected, they make an internetwork, or internet. The **Internet** is the global internetwork.

### 6.1.4 Protocol layering
A **protocol** defines the rules that both the sender and receiver and all intermediate devices need to follow. The TCP/IP protocol suite is made of five layers.

## The TCP/IP Protocol Suite
1.  **Application Layer**: Provides services to the user. Communication is provided using a logical connection.
2.  **Transport Layer**: Located between the application layer and the network layer. It provides services to the application layer and receives services from the network layer.
3.  **Network Layer**: Responsible for the host-to-host delivery of messages.
4.  **Data-Link Layer**: The territory of networks that when connected make up the Internet.
5.  **Physical Layer**: Transfers the bits received from the data-link layer and convert them to electromagnetic signals for transmission.

## 6.2 APPLICATION LAYER
Provides services to the user.
- **Paradigms**: Client-server and peer-to-peer.
- **Standard client-server applications**: World Wide Web (WWW) and HTTP, File Transfer Protocol (FTP), Electronic mail (email), TELNET, Secure Shell (SSH), and Domain Name System (DNS).

## 6.3 TRANSPORT LAYER
Acts as a liaison between a client program and a server program, a process-to-process connection.
- **Services**: Process-to-process communication, addressing with port numbers.
- **Protocols**: User Datagram Protocol (UDP) and Transmission Control Protocol (TCP).

## 6.4 NETWORK LAYER
Responsible for the host-to-host delivery of messages.
- **Services**: Packetizing, unreliable and connectionless delivery, and routing.
- **Protocols**: Internet Protocol Version 4 (IPv4) and Internet Protocol Version 6 (IPv6).

## 6.5 DATA-LINK LAYER
Communication at the data-link layer is node-to-node.
- **LANs**: Wired LANS (Ethernet) and Wireless LANs (WiFi, Bluetooth).
- **WANs**: Wired WANs and Wireless WANs (WiMax, cellular telephony, satellite networks).

## 6.6 PHYSICAL LAYER
The role of the physical layer is to transfer the bits received from the data-link layer and convert them to electromagnetic signals for transmission.
- **Data and signals**: Analog and digital.
- **Transmission**: Digital and analog.
- **Transmission Media**: Guided media (twisted-pair, coaxial, fiber-optic) and unguided media (radio waves, microwaves, infrared).
`,
  zh: `
# 第六章：電腦網路與網際網路

個人電腦的發展為商業、工業、科學和教育帶來了巨大的變革。本章重點介紹電腦網路與網際網路。

## 學習目標
學完本章後，學生應能：
- 描述區域網路 (LAN) 和廣域網路 (WAN)。
- 區分 internet (互連網) 和 Internet (網際網路)。
- 描述作為網際網路中網路模型的 TCP/IP 協定套件。
- 定義 TCP/IP 協定套件中的各層及其關係。
- 描述應用層的一些應用程式。
- 描述傳輸層和網路層協定提供的服務。
- 描述資料連結層使用的不同協定以及實體層的職責。

## 6.1 概覽
**網路**是一組能夠通訊的設備的互連。
- **區域網路 (LAN)**：通常為私人擁有，連接單一辦公室、建築物或校園內的一些主機。
- **廣域網路 (WAN)**：地理範圍更廣，可橫跨一個城鎮、一個州、一個國家，甚至全世界。
- **互連網 (Internetwork)**：當兩個或多個網路連接在一起時，它們就構成了一個互連網 (internet)。**網際網路 (The Internet)** 是全球性的互連網。

### 6.1.4 協定分層
**協定**定義了發送方、接收方以及所有中間設備都需要遵循的規則。TCP/IP 協定套件由五層組成。

## TCP/IP 協定套件
1.  **應用層 (Application Layer)**：為使用者提供服務。通訊是透過邏輯連接提供的。
2.  **傳輸層 (Transport Layer)**：位於應用層和網路層之間。它為應用層提供服務，並從網路層接收服務。
3.  **網路層 (Network Layer)**：負責訊息的主機對主機傳遞。
4.  **資料連結層 (Data-Link Layer)**：是構成網際網路的各個網路的領域。
5.  **實體層 (Physical Layer)**：傳輸從資料連結層接收到的位元，並將其轉換為電磁信號進行傳輸。

## 6.2 應用層
為使用者提供服務。
- **範式**：主從式 (Client-server) 和點對點 (peer-to-peer)。
- **標準主從式應用**：全球資訊網 (WWW) 和 HTTP、檔案傳輸協定 (FTP)、電子郵件 (email)、遠端登入 (TELNET)、安全殼層 (SSH) 和網域名稱系統 (DNS)。

## 6.3 傳輸層
作為客戶端程式和伺服器程式之間的聯絡人，建立行程對行程 (process-to-process) 的連接。
- **服務**：行程對行程通訊、使用埠號進行定址。
- **協定**：使用者資料包協定 (UDP) 和傳輸控制協定 (TCP)。

## 6.4 網路層
負責訊息的主機對主機 (host-to-host) 傳遞。
- **服務**：封包化、不可靠且無連接的傳遞，以及路由。
- **協定**：網際網路協定第四版 (IPv4) 和網際網路協定第六版 (IPv6)。

## 6.5 資料連結層
資料連結層的通訊是節點對節點 (node-to-node) 的。
- **區域網路 (LANs)**：有線區域網路 (乙太網路) 和無線區域網路 (WiFi, 藍牙)。
- **廣域網路 (WANs)**：有線廣域網路和無線廣域網路 (WiMax, 行動電話, 衛星網路)。

## 6.6 實體層
實體層的作用是傳輸從資料連結層接收到的位元，並將其轉換為電磁信號進行傳輸。
- **資料與信號**：類比和數位。
- **傳輸**：數位和類比。
- **傳輸介質**：導引介質 (雙絞線、同軸電纜、光纖) 和非導引介質 (無線電波、微波、紅外線)。
`,
};
