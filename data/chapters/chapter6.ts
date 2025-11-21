
export const chapter6Content = {
  en: `
# Chapter 6: Computer Networks and Internet

The development of the personal computer has brought about tremendous changes for business, industry, science, and education. A similar revolution has occurred in networking. Technological advances are making it possible for communication links to carry more and faster signals. As a result, services are evolving to allow use of this expanded capacity. Research in this area has resulted in new technologies. One goal is to be able to exchange data such as text, audio, and video from all parts of the world. We want to access the Internet to download and upload information quickly and accurately and at any time.

## Objectives
After studying this chapter, the student should be able to:
- Describe local and wide area networks (LANs and WANs).
- Distinguish an internet from the Internet.
- Describe the TCP/IP protocol suite as the network model in the Internet.
- Define the layers in the TCP/IP protocol suite and their relationship.
- Describe some applications at the application layer.
- Describe the services provided by the transport-layer protocols.
- Describe the services provided by the network-layer protocols.
- Describe different protocols used at the data-link layer.
- Describe the duties of the physical layer.
- Describe the different transmission media used in computer networking.

## 6.1 OVERVIEW
Although the goal of this chapter is to discuss the Internet, a system that interconnects billions of computers in the world, we think of the Internet not as a single network, but as an **internetwork**, a combination of networks. Therefore, we start our journey by first defining a network. We then show how we can connect networks to create small internetworks. Finally, we show the structure of the Internet and open the gate to study the Internet in the rest of this chapter.

### 6.1.1 Networks
A **network** is the interconnection of a set of devices capable of communication. In this definition, a device can be a **host** (or an **end system** as it is sometimes called) such as a large computer, desktop, laptop, workstation, cellular phone, or security system. A device in this definition can also be a **connecting device** such as a **router** which connects the network to other networks, a **switch** which connects devices together, a **modem** (modulator-demodulator) that changes the form of data, and so on. These devices in a network are connected using wired or wireless transmission media such as cable or air. When we connect two computers at home using a plug-and-play router, we have created a network, although very small.

**Local area network**
A **local area network (LAN)** is usually privately owned and connects some hosts in a single office, building, or campus. Depending on the needs of an organization, a LAN can be as simple as two PCs and a printer in someone’s home office, or it can extend throughout a company and include audio and video devices. Each host in a LAN has an identifier, an address, that uniquely defines the host in the LAN. A packet sent by a host to another host carries both the source host’s and the destination host’s addresses.

**Wide area network**
A **wide area network (WAN)** is also an interconnection of devices capable of communication. However, there are some differences between a LAN and a WAN. A LAN is normally limited in size, spanning an office, a building, or a campus; a WAN has a wider geographical span, spanning a town, a state, a country, or even the world. A LAN interconnects hosts; a WAN interconnects connecting devices such as switches, routers, or modems. A LAN is normally privately owned by the organization that uses it; a WAN is normally created and run by communication companies and leased by an organization that uses it. We see two distinct examples of WANs today: **point-to-point WANs** and **switched WANs**.

A **point-to-point WAN** is a network that connects two communicating devices through a transmission medium (cable or air).

A **switched WAN** is a network with more than two ends. A switched WAN, as we will see shortly, is used in the backbone of global communication today. We can say that a switched WAN is a combination of several point-to-point WANs that are connected by switches.

**Internetwork**
Today, it is very rare to see a LAN or a WAN in isolation; they are connected to one another. When two or more networks are connected, they make an **internetwork**, or **internet**. As an example, assume that an organization has two offices. Each office has a LAN that allows all employees in the office to communicate with each other. To make the communication between employees at different offices possible, the management leases a point-to-point dedicated WAN from a service provider, such as a telephone company, and connects the two LANs. Now the company has an internetwork, or a private internet (with lowercase i). Communication between offices is now possible.

### 6.1.2 The Internet
As we discussed before, an internet (note the lowercase i) is two or more networks that can communicate with each other. The most notable internet is called the **Internet** (uppercase I), and is composed of thousands of interconnected networks.

The Internet is composed of several **backbones**, **provider networks**, and **customer networks**. At the top level, the **backbones** are large networks owned by some communication companies. The backbone networks are connected through some complex switching systems, called **peering points**. At the second level, there are smaller networks, called **provider networks**, that use the services of the backbones for a fee. The provider networks are connected to backbones and sometimes to other provider networks. The **customer networks** are networks at the edge of the Internet that actually use the services provided by the Internet. They pay fees to provider networks for receiving services.

Backbones and provider networks are also called **internet service providers (ISPs)**. The backbones are often referred to as international ISPs; the provider networks are often referred to as national or regional ISPs.

### 6.1.3 Hardware and software
We have given the overview of the Internet structure, which is made of small and large networks glued together with connecting devices. It should be clear, however, that if we only connect these pieces nothing will happen. For communication to happen, we need both **hardware** and **software**. This is similar to a complex computation in which we need both a computer and a program. In the next section, we show how these combinations of hardware and software are coordinated with each other using *protocol layering*.

### 6.1.4 Protocol layering
A word we hear all the time when we talk about the Internet is *protocol*. A **protocol** defines the rules that both the sender and receiver and all intermediate devices need to follow to be able to communicate effectively. When communication is simple, we may need only one simple protocol; when the communication is complex, we may need to divide the task between different layers, in which case we need a protocol at each layer, or **protocol layering**.

**A scenario**
Let us develop a simple scenario to better understand the need for protocol layering. We assume that Ann and Maria are neighbors with a lot of common ideas. They communicate with each other every time they meet about a project for the time when they will be retired. Suddenly, Ann is offered a higher-level position in her company, but needs to move to another branch located in a city very far from Maria. The two friends still want to continue their communication and exchange ideas because they have come up with an innovative project to start a new business when they both retire. They decide to continue their conversation using regular mail through the post office. However, they do not want their ideas to be revealed to other people if the letters are intercepted. They agree on an encryption/decryption technique. The sender of the letter encrypts it to make it unreadable by an intruder; the receiver of the letter decrypts it to get the original letter. We discuss the encryption/decryption methods in Chapter 16, but for the moment we assume that Maria and Ann use one technique that makes it hard to decrypt the letter if one does not have the key for doing so. Now we can say that the communication between Maria and Ann takes place in three layers. We assume that Ann and Maria each have three machines (or robots) that can perform the task at each layer.

Let us assume that Maria sends the first letter to Ann. Maria talks to the machine at the third layer as though the machine is Ann and is listening to her. The third-layer machine listens to what Maria says and creates the plaintext (a letter in English), which is passed to the second-layer machine. The second-layer machine takes the plaintext, encrypts it, and creates the **ciphertext**, which is passed to the first-layer machine. The first layer machine, presumably a robot, takes the ciphertext, puts it in an envelope, adds the sender and receiver addresses, and mails it.
At Ann’s side, the first-layer machine picks up the letter from Ann’s mail box, recognizing the letter from Maria by the sender address. The machine takes out the ciphertext from the envelope and delivers it to the second-layer machine. The second-layer machine decrypts the message, creates the plaintext, and passes the plaintext to the third-layer machine. The third-layer machine takes the plaintext and reads it as though Maria is speaking.

Protocol layering enables us to divide a complex task into several smaller and simpler tasks. For example, we could have used only one machine to do the job of all three machines. However, if Maria and Ann decide that the encryption/decryption done by the machine is not enough to protect their secrecy, they have to change the whole machine. In the present situation, they need to change only the second-layer machine; the other two can remain the same. This is referred to as **modularity**. Modularity in this case means independent layers. A layer (**module**) can be defined as a black box with inputs and outputs, without concern about how inputs are changed to outputs. If two machines provide the same outputs when given the same inputs, they can replace each other. For example, Ann and Maria can buy the second-layer machine from two different manufacturers. As long as the two machines create the same ciphertext from the same plaintext and vice versa, they do the job.

One of the advantages of protocol layering is that it allows us to separate the services from the implementation. A layer needs to be able to receive a set of services from the lower layer and to give the services to the upper layer; we don’t care about how the layer is implemented. For example, Maria may decide not to buy the machine (robot) for the first layer; she can do the job herself. As long as Maria can do the tasks provided by the first layer, in both directions, the communication system works.

Another advantage of protocol layering, which cannot be seen in our simple examples, but reveals itself when we discuss protocol layering in the Internet, is that communication does not always use only two end systems; there are intermediate systems that need only some layers, but not all layers. If we did not use protocol layering, we would have to make each intermediate system as complex as the end systems, which makes the whole system more expensive.

Is there any disadvantage to protocol layering? One can argue that having a single layer makes the job easier. There is no need for each layer to provide a service to the upper layer and give a service to the lower layer. For example, Ann and Maria could find or build one machine that could do all three tasks. However, as mentioned above, if one day they found that their code was broken, each would have to replace the whole machine with a new one instead of just changing the machine in the second layer.

**Principles of protocol layering**
Let us discuss some principles of protocol layering. The first principle dictates that if we want bidirectional communication, we need to make each layer so that it is able to perform two opposite tasks, one in each direction. For example, the third-layer task is to *listen* (in one direction) and *talk* (in the other direction). The second layer needs to be able to encrypt and decrypt. The first layer needs to send and receive mail.
The second important principle that we need to follow in protocol layering is that the two objects under each layer at both sites should be identical. For example, the object under layer 3 at both sites should be a plaintext letter. The object under layer 2 at both sites should be a ciphertext letter. The object under layer 1 at both sites should be a piece of mail.

**Logical connections**
After following the above two principles, we can think about logical connection between each layer. This means that we have layer-to-layer communication. Maria and Ann can think that there is a logical (imaginary) connection at each layer through which they can send the object created from that layer. We will see that the concept of logical connection will help us better understand the task of layering we encounter in data communication and networking.

### 6.1.5 TCP/IP protocol suite
Now that we know about the concept of protocol layering and the logical communication between layers in our second scenario, we can introduce the **TCP/IP (Transmission Control Protocol/Internet Protocol)**. TCP/IP is a protocol suite (a set of protocols organized in different layers) used in the Internet today. It is a hierarchical protocol made up of interactive modules, each of which provides a specific functionality. The term *hierarchical* means that each upper-level protocol is supported by the services provided by one or more lower-level protocols. The TCP/IP protocol suite is made of five layers:
1.  **Application Layer** (Layer 5)
2.  **Transport Layer** (Layer 4)
3.  **Network Layer** (Layer 3)
4.  **Data link Layer** (Layer 2)
5.  **Physical Layer** (Layer 1)

**Layered architecture**
To show how the layers in the TCP/IP protocol suite are involved in communication between two hosts, we assume that we want to use the suite in a small internet made up of three LANs (links), each with a link-layer switch. We also assume that the links are connected by one router.

Let us assume that computer A communicates with computer B. We have five communicating devices in this communication: source host (computer A), the link-layer switch in link 1, the router, the link-layer switch in link 2, and the destination host (computer B). Each device is involved with a set of layers depending on the role of the device in the internet. The two hosts are involved in all five layers; the source host needs to create a message in the **application layer** and send it down the layers so that it is physically sent to the destination host. The destination host needs to receive the communication at the **physical layer** and then deliver it through the other layers to the application layer.

The router is involved only in three layers; there is no transport or application layer in a router as long as the router is used only for **routing**. Although a router is always involved in one network layer, it is involved in $n$ combinations of link and physical layers in which $n$ is the number of links the router is connected to. The reason is that each link may use its own data-link or physical protocol. Each link may be using different link-layer and physical-layer protocols; the router needs to receive a packet from link 1 based on one pair of protocols and deliver it to link 2 based on another pair of protocols.

A link-layer switch in a link, however, is involved only in two layers, data-link and physical. Although each switch has two different connections, the connections are in the same link, which uses only one set of protocols. This means that, unlike a router, a link-layer switch is involved only in one data-link and one physical layer.

**Addressing and packet names**
It is worth mentioning another two concepts related to protocol layering in the Internet: *addressing* and *packet names*. As we discussed before, we have logical communication between pairs of layers in this model. Any communication that involves two parties needs two addresses: source address and destination address. Although it looks as if we need five pairs of addresses, one pair per layer, we normally have only four because the physical layer does not need addresses; the unit of data exchange at the physical layer is a bit, which definitely cannot have an address.

There is a relationship between the layer, the address used in that layer, and the packet name at that layer. At the application layer, we normally use **names** to define the site that provides services, such as *someorg.com*, or the email address, such as *somebody@coldmail.com*. The packet name at this layer is **message**.
At the transport layer, addresses are called **port numbers**, and these define the application-layer programs at the source and destination. Port numbers are local addresses that distinguish between several programs running at the same time. The packet name at this layer is **segment** or **user datagram**.
At the **network-layer**, the addresses are **logical addresses** (global), with the whole Internet as the scope. A network-layer address uniquely defines the connection of a device to the Internet. The packet name is **datagram**.
The link-layer addresses, sometimes called **MAC addresses** or **link-layer addresses**, are locally defined addresses, each of which defines a specific host or router in a network (LAN or WAN). The packet name is **frame**.
At the physical layer, the unit is a **bit**.

## 6.2 APPLICATION LAYER
After the brief discussion of networks, internetworks, and the Internet, we are ready to give some discussion about each layer of the TCP/IP protocol. We start from the fifth layer and move to the first layer.

The fifth layer of the TCP/IP protocol is called the application layer. The application layer provides services to the user. Communication is provided using a logical connection, which means that the two application layers assume that there is an imaginary direct connection through which they can send and receive messages.

Consider a scenario in which a scientist working in a research company, Sky Research, needs to order a book related to her research from an online bookseller, Scientific Books. Logical connection takes place between the application layer at a computer at Sky Research and the application layer of a server at Scientific Books. We call the first host Alice and the second one Bob. The communication at the application layer is logical, not physical. Alice and Bob assume that there is a two-way logical channel between them through which they can send and receive messages. The actual communication, however, takes place through several devices and several physical channels.

### 6.2.1 Providing services
The application layer is somehow different from other layers in that it is the highest layer in the suite. The protocols in this layer do not provide services to any other protocol in the suite; they only receive services from the protocols in the transport layer. This means that protocols can be removed from this layer easily. New protocols can be also added to this layer as long as the new protocol can use the service provided by one of the transport-layer protocols.

Since the application layer is the only layer that provides services to the Internet user, the flexibility of the application layer, as described above, allows new application protocols to be easily added to the Internet, which has been occurring during the lifetime of the Internet. When the Internet was created, only a few application protocols were available to the users; today we cannot give a number for these protocols because new ones are being added constantly.

### 6.2.2 Application-layer paradigms
It should be clear that to use the Internet we need two application programs to interact with each other: one running on a computer somewhere in the world, the other running on another computer somewhere else in the world. The two programs need to send messages to each other through the Internet infrastructure. However, we have not discussed what the relationship should be between these programs. Should both application programs be able to request services and provide services, or should the application programs just do one or the other? Two paradigms have been developed during the lifetime of the Internet to answer this question: the *client–server paradigm* and the *peer-to-peer paradigm*. We briefly introduce these two paradigms here.

**Traditional paradigm: client–server**
The traditional paradigm is called the **client–server paradigm**. It was the most popular paradigm until a few years ago. In this paradigm, the service provider is an application program, called the **server process**; it runs continuously, waiting for another application program, called the **client process**, to make a connection through the Internet and ask for service. There are normally some server processes that can provide a specific type of service, but there are many clients that request service from any of these server processes. The server process must be running all the time; the client process is started when the client needs to receive service.

Although the communication in the client–server paradigm is between two application programs, the role of each program is totally different. In other words, we cannot run a client program as a server program or vice versa.

One problem with this paradigm is that the concentration of the communication load is on the shoulder of the server, which means the server should be a powerful computer. Even a powerful computer may become overwhelmed if a large number of clients try to connect to the server at the same time. Another problem is that there should be a service provider willing to accept the cost and create a powerful server for a specific service, which means the service must always return some type of income for the server in order to encourage such an arrangement.

Several traditional services are still using this paradigm, including the **World Wide Web (WWW)** and its vehicle **HyperText Transfer Protocol (HTTP)**, file transfer protocol (FTP), secure shell (SSH), email, and so on. We discuss some of these protocols and applications later in the chapter.

**New paradigm: peer-to-peer**
A new paradigm, called the **peer-to-peer paradigm** (often abbreviated **P2P paradigm**) has emerged to respond to the needs of some new applications. In this paradigm, there is no need for a server process to be running all the time and waiting for the client processes to connect. The responsibility is shared between peers. A computer connected to the Internet can provide service at one time and receive service at another time. A computer can even provide and receive services at the same time.

One of the areas that really fits in this paradigm is Internet telephony. Communication by phone is indeed a peer-to-peer activity; no party needs to be running forever waiting for the other party to call. Another area in which the peer-to-peer paradigm can be used is when some computers connected to the Internet have something to share with each other. For example, if an Internet user has a file available to share with other Internet users, there is no need for the file holder to become a server and run a server process all the time waiting for other users to connect and retrieve the file.

Although the peer-to-peer paradigm has been proved to be easily scalable and cost-effective in eliminating the need for expensive servers to be running and maintained all the time, there are also some challenges. The main challenge has been **security**; it is more difficult to create secure communication between distributed services than between those controlled by some dedicated servers. The other challenge is applicability; it appears that not all applications can use this new paradigm. For example, not many Internet users are ready to become involved, if one day the Web can be implemented as a peer-to-peer service.

### 6.2.3 Standard client–server applications
During the lifetime of the Internet, several client–server application programs have been developed. We do not have to redefine them, but we need to understand what they do. We have selected six standard application programs in this section. We start with HTTP and the World Wide Web because they are used by almost all Internet users. We then introduce file transfer and electronic mail applications which have high traffic loads on the Internet. Next, we explain remote logging and how it can be achieved using the TELNET and SSH protocols. Finally, we discuss DNS, which is used by all application programs to map the application layer identifier to the corresponding host IP address.

**World Wide Web and HTTP**
In this section, we first introduce the World Wide Web (abbreviated WWW or Web). We then discuss the HyperText Transfer Protocol (HTTP), the most common client–server application program used in relation to the Web.

**World Wide Web**
The Web today is a repository of information in which the documents, called **Web pages**, are distributed all over the world and related documents are linked together. The popularity and growth of the Web can be related to two terms in the above statement: distributed and linked. Distribution allows the growth of the Web. Each web server in the world can add a new web page to the repository and announce it to all Internet users without overloading a few servers. Linking allows one web page to refer to another web page stored in another server somewhere else in the world. The linking of web pages was achieved using a concept called **hypertext**, which was introduced many years before the advent of the Internet. The idea was to use a machine that automatically retrieved another document stored in the system when a link to it appeared in the document. The Web implemented this idea electronically: to allow the linked document to be retrieved when the link was clicked by the user. Today, the term hypertext, coined to mean linked text documents, has been changed to **hypermedia**, to show that a web page can be a text document, an image, an audio file, or a video file.

The WWW today is a distributed client–server service, in which a client using a **browser** can access a service using a server. However, the service provided is distributed over many locations called *sites*. Each site holds one or more documents, referred to as **web pages**. Each web page, however, can contain some links to other web pages in the same or other sites. In other words, a web page can be simple or composite. A simple web page has no links to other web pages; a composite web page has one or more links to other web pages. Each web page is a file with a name and address.

**Web client (browser)**
A variety of vendors offer commercial **browsers** that interpret and display a web page, and all of them use nearly the same architecture. Each browser usually consists of three parts: a controller, client protocols, and interpreters.
The controller receives input from the keyboard or the mouse and uses the client programs to access the document. After the document has been accessed, the controller uses one of the interpreters to display the document on the screen. The client protocol can be one of the protocols described later, such as HTTP or FTP. The interpreter can be **HyperText Markup Language (HTML)**, Java, or JavaScript, depending on the type of document. Some commercial browsers include Internet Explorer, Netscape Navigator, and Firefox.

**Web server**
The web page is stored at the server. Each time a request arrives, the corresponding document is sent to the client.

**Uniform resource locator (URL)**
A web page, as a file, needs to have a unique identifier to distinguish it from other web pages. To define a web page, we need three identifiers: *host*, *port*, and *path*. However, before defining the web page, we need to tell the browser what client–server application we want to use, which is called the *protocol*. This means we need four identifiers to define the web page. The first is the type of vehicle to be used to fetch the web page; the last three make up the combination that defines the destination object (web page).
- **Protocol**. The first identifier is the abbreviation for the client–server program that we need in order to access the web page.
- **Host identifier**. The host identifier can be the IP address of the server or the unique name given to the server.
- **Port number**. The port, a 16-bit integer, is normally predefined for the client–server application.
- **Path**. The path identifies the location and the name of the file in the underlying operating system. The format of this identifier normally depends on the operating system. In UNIX, a path is a set of directory names followed by the file name, all separated by a slash.
To combine these four pieces together, the **uniform resource locator (URL)** has been designed; it uses three different separators between the four pieces as shown below:
\`protocol://host:port/path\`

**HyperText Transfer Protocol (HTTP)**
The **HyperText Transfer Protocol (HTTP)** is a protocol that is used to define how the client–server programs can be written to retrieve web pages from the Web. An HTTP client sends a request; an HTTP server returns a response. The server uses the port number 80; the client uses a temporary port number.

**6.2.4 File Transfer Protocol (FTP)**
**File Transfer Protocol (FTP)** is the standard protocol provided by TCP/IP for copying a file from one host to another. Although transferring files from one system to another seems simple and straightforward, some problems must be dealt with first. For example, two systems may use different file name conventions. Two systems may have different ways to represent data. Two systems may have different directory structures. All of these problems have been solved by FTP in a very simple and elegant approach.

The client has three components: user interface, client control process, and the client data transfer process. The server has two components: the server control process and the server data transfer process. The control connection is made between the control processes. The data connection is made between the data transfer processes.
Separation of commands and data transfer makes FTP more efficient. The control connection uses very simple rules of communication. We need to transfer only a line of command or a line of response at a time. The data connection, on the other hand, needs more complex rules due to the variety of data types transferred.

**Lifetimes of two connections**
The two connections in FTP have different lifetimes. The control connection remains connected during the entire interactive FTP session. The data connection is opened and then closed for each file transfer activity. It opens each time commands that involve transferring files are used, and it closes when the file is transferred. In other words, when a user starts an FTP session, the control connection opens. While the control connection is open, the data connection can be opened and closed multiple times if several files are transferred.

**6.2.5 Electronic mail**
**Electronic mail** (or **email**) allows users to exchange messages. The nature of this application, however, is different from other applications discussed so far. In an application such as HTTP or FTP, the server program is running all the time, waiting for a request from a client. When the request arrives, the server provides the service. There is a request and there is a response. In the case of electronic mail, the situation is different. First, email is considered a one-way transaction. When Alice sends an email to Bob, she may expect a response, but this is not a mandate. Bob may or may not respond. If he does respond, it is another one-way transaction. Second, it is neither feasible nor logical for Bob to run a server program and wait until someone sends an email to him. Bob may turn off his computer when he is not using it. This means that the idea of client/server programming should be implemented in another way: using some intermediate computers (servers). The users run only client programs when they want and the intermediate servers apply the client/server paradigm.

**Architecture**
To explain the architecture of email, we give a common scenario.
In the common scenario, the sender and the receiver of the email, Alice and Bob respectively, are connected via a LAN or a WAN to two mail servers. The administrator has created one **mailbox** for each user where the received messages are stored. A mailbox is part of a server hard drive, a special file with permission restrictions. Only the owner of the mailbox has access to it. The administrator has also created a queue (spool) to store messages waiting to be sent.
A simple email from Alice to Bob takes nine different steps. Alice and Bob use three different agents: a **user agent (UA)**, a **Mail Transfer Agent (MTA)**, and a **Message Access Agent (MAA)**. When Alice needs to send a message to Bob, she runs a UA program to prepare the message and send it to her mail server. The mail server at her site uses a queue (spool) to store messages waiting to be sent. The message, however, needs to be sent through the Internet from Alice’s site to Bob’s site using an MTA. Here two message transfer agents are needed: one client and one server. Like most client–server programs on the Internet, the server needs to run all the time because it does not know when a client will ask for a connection. The client, on the other hand, can be triggered by the system when there is a message in the queue to be sent. The user agent at Bob’s site allows Bob to read the received message. Bob later uses an MAA client to retrieve the message from an MAA server running on the second server.
Bob needs another pair of client–server programs: message access programs. This is because an MTA client–server program is a *push* program: the client pushes the message to the server. Bob needs a *pull* program. The client needs to pull the message from the server.

**6.2.6 TELNET**
A server program can provide a specific service to its corresponding client program. For example, the FTP server is designed to let the FTP client store or retrieve files on the server site. However, it is impossible to have a client/server pair for each type of service we need; the number of servers soon becomes intractable. The idea is not scalable. Another solution is to have a specific client/server program for a set of common scenarios, but to have some generic client/server programs that allow a user on the client site to log into the computer at the server site and use the services available there. For example, if a student needs to use the Java compiler program at her university lab, there is no need for a Java compiler client and a Java compiler server. The student can use a client logging program to log into the university server and use the compiler program at the university. We refer to these generic client/server pairs as **remote login** applications.
One of the original remote logging protocols is **TELNET**, which is an abbreviation for TErminaL NETwork. Although TELNET requires a logging name and password, it is vulnerable to hacking because it sends all data including the password in plaintext (not encrypted). A hacker can eavesdrop and obtain the logging name and password. Because of this security issue, the use of TELNET has diminished in favor of another protocol, Secure Shell (SSH).

**6.2.7 Secure Shell (SSH)**
Although **Secure Shell (SSH)** is a secure application program that can be used today for several purposes such as remote logging and file transfer, it was originally designed to replace TELNET. There are two versions of SSH: SSH-1 and SSH-2, which are totally incompatible. The first version, SSH-1, is now deprecated because of security flaws in it. The current version is called SSH-2.

**6.2.8 Domain Name System (DNS)**
The last client–server application program we discuss has been designed to help other application programs. To identify an entity, TCP/IP protocols use the IP address, which uniquely identifies the connection of a host to the Internet. However, people prefer to use names instead of numeric addresses. Therefore, the Internet needs to have a directory system that can map a name to an address. This is analogous to the telephone network. A telephone network is designed to use telephone numbers, not names. People can either keep a private file to map a name to the corresponding telephone number or can call the telephone directory to do so.
Since the Internet is so huge today, a central directory system cannot hold all the mapping. In addition, if the central computer fails, the whole communication network will collapse. A better solution is to distribute the information among many computers in the world. In this method, the host that needs mapping can contact the closest computer holding the needed information. The TCP/IP uses a **DNS** client and a DNS server to map a name to an address. A user wants to use a file transfer client to access the corresponding file transfer server running on a remote host. The user knows only the file transfer server name, such as *afilesource.com*. However, the TCP/IP suite needs the IP address of the file transfer server to make the connection. The following six steps map the host name to an IP address:
1.  The user passes the host name to the file transfer client.
2.  The file transfer client passes the host name to the DNS client.
3.  Each computer, after being booted, knows the address of one DNS server. The DNS client sends a message to a DNS server with a query that gives the file transfer server name using the known IP address of the DNS server.
4.  The DNS server responds with the IP address of the desired file transfer server.
5.  The DNS client passes the IP address to the file transfer server.
6.  The file transfer client now uses the received IP address to access the file transfer server.

**Name space**
To be unambiguous, the names assigned to machines must be carefully selected from a name space with complete control over the binding between the names and IP addresses. In other words, the names must be unique because the addresses are unique. A **name space** can map each address to a unique name and is normally organized hierarchically. In a hierarchical *name space*, each name is made of several parts. The first part can define the nature of the organization, the second part can define the name of an organization, the third part can define departments in the organization, and so on. In this case, the authority to assign and control the name spaces can be decentralized. A central authority can assign the part of the name that defines the nature of the organization and the name of the organization. The responsibility for the rest of the name can be given to the organization itself. The organization can add suffixes (or prefixes) to the name to define its host or resources. The management of the organization need not worry that the prefix chosen for a host is taken by another organization because, even if part of an address is the same, the whole address is different.

**DNS in the Internet**
DNS is a protocol that can be used in different platforms. In the Internet, the **domain name space** (tree) was originally divided into three different sections: generic domains, country domains, and the inverse domain. However, due to the rapid growth of the Internet, it became extremely difficult to keep track of the inverse domains, which could be used to find the name of a host when given the IP address. The inverse domains are now deprecated. We, therefore, concentrate on the first two.

**Generic domains**
The **generic domains** define registered hosts according to their generic behavior. Each node in the tree defines a domain, which is an index to the **domain name** space database. Looking at the tree, we see that the first level in the generic domains section allows 14 possible labels. These labels describe the organization types:
*   **aero**: Airlines and aerospace
*   **biz**: Businesses or firms
*   **com**: Commercial organizations
*   **coop**: Cooperative organizations
*   **edu**: Educational institutions
*   **gov**: Government institutions
*   **info**: Information service providers
*   **int**: International organizations
*   **mil**: Military groups
*   **museum**: Museums
*   **name**: Personal names (individuals)
*   **net**: Network support centers
*   **org**: Nonprofit organizations
*   **pro**: Professional organizations

**Country domains**
The **country domains** section uses two-character country abbreviations (e.g., us for United States). Second labels can be organizational, or they can be more specific, national designations. The United States, for example, uses state abbreviations as a subdivision of us (e.g., ca.us.).

**6.2.9 Peer-to-peer paradigm**
We discussed the client–server paradigm early in the chapter. The first instance of peer-to-peer file sharing goes back to December 1987 when Wayne Bell created *WWIVnet*, the network component of WWIV (World War Four) bulletin board software. In July 1999, Ian Clarke designed *Freenet*, a decentralized, censorship-resistant distributed data store, aimed to provide freedom of speech through a peer-to-peer network with strong protection of anonymity.
Peer-to-peer gained popularity with Napster (1999–2001), an online music file sharing service created by Shawn Fanning. Although free copying and distributing of music files by the users led to a copyright violation lawsuit against Napster, and eventually closing of the service, it paved the way for peer-to-peer file-distribution models that came later. Gnutella had its first release in March 2000. It was followed by FastTrack (used by the Kazaa), BitTorrent, WinMX, and GNUnet in March, April, May, and November of 2001 respectively.

Internet users that are ready to share their resources become peers and form a network. When a peer in the network has a file (for example, an audio or video file) to share, it makes it available to the rest of the peers. An interested peer can connect itself to the computer where the file is stored and download it. After a peer downloads a file, it can make it available for other peers to download. As more peers join and download that file, more copies of the file become available to the group. Since lists of peers may grow and shrink, the question is how the paradigm keeps track of loyal peers and the location of the files. To answer this question, we first need to divide the P2P networks into two categories: centralized and decentralized.

**Centralized networks**
In a **centralized P2P network**, the directory system listing of the peers and what they offer uses the client–server paradigm, but the storing and downloading of the files are done using the peer-to-peer paradigm. For this reason, a centralized P2P network is sometimes referred to as a hybrid P2P network. Napster was an example of a centralized P2P. In this type of network, a peer first registers itself with a central server. The peer then provides its IP address and a list of files it has to share. To avoid system collapse, Napster used several servers for this purpose.
A peer, looking for a particular file, sends a query to a central server. The server searches its directory and responds with the IP addresses of nodes that have a copy of the file. The peer contacts one of the nodes and downloads the file. The directory is constantly updated as nodes join or leave the peer.
Centralized networks make the maintenance of the directory simple but have several drawbacks. Accessing the directory can generate huge traffic and slow down the system. The central servers are vulnerable to attack, and if all of them fail, the whole system goes down.

**Decentralized network**
A decentralized P2P network does not depend on a centralized directory system. In this model, peers arrange themselves into an *overlay network*, which is a logical network made on top of the physical network. Depending on how the nodes in the overlay network are linked, a decentralized P2P network is classified as either unstructured or structured.
In an *unstructured* P2P network, the nodes are linked randomly. A search in an unstructured P2P is not very efficient because a query to find a file must be flooded through the network, which produces significant traffic and still the query may not be resolved. Two examples of this type of network are Gnutella and Freenet.
A *structured* network uses a predefined set of rules to link nodes so that a query can be effectively and efficiently resolved. The most common technique used for this purpose is the *Distributed Hash Table (DHT)*. DHT is used in many applications including Distributed Data Structure (DDS), Content Distributed Systems (CDS), Domain Name System (DNS), and P2P file sharing. One popular P2P file sharing protocol that uses the DHT is BitTorrent.

## 6.3 TRANSPORT LAYER
The **transport layer** in the TCP/IP suite is located between the application layer and the network layer. It provides services to the application layer and receives services from the network layer. The transport layer acts as a liaison between a client program and a server program, a **process-to-process** connection. The transport layer is the heart of the TCP/IP protocol suite; it is the end-to-end logical vehicle for transferring data from one point to another in the Internet. Only the two end systems use the service of the transport layer; all intermediate routers use only the first three layers.

### 6.3.1 Transport-layer services
In this section, we discuss the services that can be provided by the transport layer; in the next section, we discuss several transport-layer protocols.

**Process-to-process communication**
The first duty of a transport-layer protocol is to provide *process-to-process communication*. A process is an application-layer entity (running program) that uses the services of the transport layer.
The network layer (discussed later) is responsible for communication at the computer level (host-to-host communication). A network-layer protocol can deliver the message only to the destination computer. However, this is an incomplete delivery. The message still needs to be handed to the correct process. This is where a transport-layer protocol takes over. A transport-layer protocol is responsible for delivery of the message to the appropriate process.

**Addressing: port numbers**
Although there are a few ways to achieve process-to-process communication, the most common is through the client–server paradigm. A process on the local host, called a *client*, needs services from a process usually on the remote host, called a *server*. Both processes (client and server) have the same name. For example, to get the day and time from a remote machine, we need a daytime client process running on the local host and a daytime server process running on a remote machine. A remote computer can run several server programs at the same time, just as several local computers can run one or more client programs at the same time. For communication, we must define the local host, local process, remote host, and remote process. The local host and the remote host are defined using IP addresses (discussed in the next section). To define the processes, we need second identifiers, called **port numbers**. In the TCP/IP protocol suite, the port numbers are integers between 0 and 65535 (16 bits).
The client program defines itself with a port number, called the **ephemeral port number**. The word ephemeral means *short-lived* and is used because the life of a client is normally short. An ephemeral port number is recommended to be greater than 1023 for some client/server programs to work properly. The server process must also define itself with a port number. This port number, however, cannot be chosen randomly. TCP/IP has decided to use universal port numbers for servers; these are called **well-known port numbers**. Every client process knows the well-known port number of the corresponding server process.

### 6.3.2 Transport-layer protocols
Although the Internet uses several transport-layer protocols, we discuss only two in this section: UDP and TCP.

**User Datagram Protocol (UDP)**
The **User Datagram Protocol (UDP)** is a connectionless, unreliable transport protocol. It does not add anything to the services of network layer except for providing process-to-process communication instead of host-to-host communication. If UDP is so powerless, why would a process want to use it? With the disadvantages come some advantages. UDP is a very simple protocol using a minimum of overhead. If a process wants to send a small message and does not care much about reliability, it can use UDP. Sending a small message using UDP takes much less interaction between the sender and receiver than using TCP.

**User datagrams**
UDP packets, called **user datagrams**, have a fixed-size **header** of 8 bytes. However, the total length needs to be less because a UDP user datagram is stored in an **IP datagram** with the total length of 65535 bytes.

**Transmission Control Protocol (TCP)**
**Transmission Control Protocol (TCP)** is a connection-oriented, reliable protocol. TCP explicitly defines connection establishment, data transfer, and connection teardown phases to provide a connection-oriented service. Connection-oriented service here means that there is a connection (relationship) between all packets (segments) belonging to the same message (coming from the application layer). TCP uses sequence numbers to define the order of the segments. The sequence number is related to the number of bytes in each segment. For example, if the message is 6000 bytes, the first segment has a sequence number 0, the second has the sequence number 2000, and the third segment has the sequence number 4000 (the process is more complicated, we try to simplify it). In this way, if a segment is lost, the receiver holds the other two until the lost one is reset by the sender.

**Segments**
At the transport layer, TCP groups a number of bytes together into a packet called a **segment**. TCP adds a header to each segment (for control purposes) and delivers the segment to the network layer for transmission. The segments are encapsulated in an IP datagram.

## 6.4 NETWORK LAYER
The **network layer** in the TCP/IP protocol suite is responsible for the host-to-host delivery of messages.
The network layer is involved at the source host, destination host, and all routers in the path. At the source host, the network layer accepts a packet from a transport layer, encapsulates the packet in a **datagram**, and delivers the packet to the data-link layer. At the destination host, the datagram is decapsulated, the packet is extracted and delivered to the corresponding transport layer. Although the source and destination hosts are involved in all five layers of the TCP/IP suite, the routers use three layers if they are routing packets only; however, they may need the transport and application layers for control purposes. A router in the path is normally shown with two data-link layers and two physical layers, because it receives a packet from one network and delivers it to another network.

### 6.4.1 Services Provided by network layer
The network layer is located under the transport layer; this means that the network layer provides service to the transport layer. We discuss some aspects of this service below.

**Packetizing**
The first duty of the network layer is definitely **packetizing**: encapsulating the payload (data received from the upper layer) in a network-layer packet at the source and decapsulating the payload from the network-layer packet at the destination. In other words, one duty of the network layer is to carry a payload from the source to the destination without changing it or using it. The network layer is doing the service of a carrier such as the post office, which is responsible for delivery of packages from a sender to a receiver without changing or using the contents.
1. The source network-layer protocol receives a packet from the transport-layer protocol, adds a header that contains the source and destination addresses and some other information that is required by the network-layer protocol.
2. The network layer protocol then logically delivers the packet to the network-layer protocol at the destination.
3. The destination host receives the network-layer packet, decapsulates the payload and delivers to the upper-layer protocol.
If the packet is fragmented at the source or at routers along the path, the network layer is responsible for waiting until all fragments arrive, reassembling them, and delivering them to the upper-layer protocol.
A transport-layer payload may be encapsulated in several network-layer packets.

**Packet delivery**
Packet delivery at the network layer is unreliable and connectionless. We briefly discuss these two concepts next.

**Unreliable delivery**
The delivery of packets at the network layer is **unreliable**. This means that the packets can be corrupted, lost, duplicated. In other words, the network layer provides a best-effort delivery, but there is no guarantee that a packet will reach the destination as we expect. This is the same service we receive from the post office when we mail a regular letter. The reason in both cases is the cost. If we need a guarantee from the post office, the cost is higher (registered mail for example). If we need a guarantee from the network layer, the delivery of packets will be delayed. Each packet needs to be checked at each router and destination and resent if corrupted. Checking the lost packets is even more costly. Does it mean that messages we send by the Internet are not reliable? The answer is that if we want to guarantee that the messages are not corrupted, we need to use the TCP protocol at the transport layer. If a payload at the transport layer is corrupted (because of unreliable delivery at the data-link layer), TCP drops the packet and requests resending of the data as we discussed in the previous section.

**Connectionless delivery**
The delivery at the network layer is also **connectionless**, but the word connectionless here does not mean that there is no physical connection between the sender and receiver. It means that the network layer treats each packet independently (like the way the post office does with the letters). In other words, there is no relationship between packets belonging to the same transport-layer payload. If a transport-layer packet results in four network-layer packets, there is no guarantee that the packets arrive in the same order as sent because each packet may follow a different path to reach the destination. A transport-layer packet is divided into four network-layer packets. They are sent in order (1, 2, 3, 4), but they are received out of order (2, 4, 3, 1). The transport layer at the destination is responsible for holding packets until all of them arrive before putting them in order and delivering them to the application layer.

**Routing**
Another duty of the network layer, which is as important as the others, is **routing**. The network layer is responsible for routing the packet from its source to the destination. A physical network is a combination of networks (LANs and WANs) and routers that connect them. This means that there is more than one route from the source to the destination. The network layer is responsible for finding the *best* one among these possible routes. The network layer needs to have some specific strategies for defining the best route. In the Internet today, this is done by running some *routing protocols* to help the routers coordinate their knowledge about the neighborhood and to come up with consistent tables to be used when a packet arrives.

### 6.4.2 Network-layer protocols
Although there are several protocols at the network layer, the main protocol is called the **Internet Protocol (IP)**. Other protocols are auxiliary protocols that help IP. Today, two versions of IP protocol are in use: IPv4 and IPv6. We discuss each in the next two sections.

**Internet Protocol Version 4 (IPv4)**
Today most systems are using the Internet Protocol Version 4 (IPv4), but this will be changed in future because of smaller address space and packet format of this protocol (among other reasons).

**IPv4 addressing**
The identifier used in the IPv4 layer of the TCP/IP protocol suite to identify the connection of each device to the Internet is called the **Internet address** or **IP address**. An IPv4 address is a 32-bit address that uniquely and universally defines the connection of a host or a router to the Internet. The IP address is the address of the connection, not the host or the router, because if the device is moved to another network, the IP address may be changed. IPv4 addresses are unique in the sense that each address defines one, and only one, connection to the Internet. If a device, such as a router, has several connections to the Internet, via several networks, it has several IPv4 addresses. IPv4 addresses are universal in the sense that the addressing system must be accepted by any host that wants to be connected to the Internet.

There are three common notations to show an IPv4 address: binary notation (base 2), dotted-decimal notation (base 256), and hexadecimal notation (base 16). In binary notation, an IPv4 address is displayed as 32 bits. To make the address more readable, one or more spaces are usually inserted between each octet (8 bits). Each octet is often referred to as a byte. To make the IPv4 address more compact and easier to read, it is usually written in decimal form with a decimal point (dot) separating the bytes. This format is referred to as **dotted-decimal notation**. Note that because each byte (octet) is only 8 bits, each number in the dotted-decimal notation is between 0 and 255. We sometimes see an IPv4 address in hexadecimal notation. Each hexadecimal digit is equivalent to four bits. This means that a 32-bit address has 8 hexadecimal digits. This notation is often used in network programming.

In any communication network that involves delivery, such as a telephone network or a postal network, the addressing system is hierarchical. In a postal network, the postal address (mailing address) includes the country, city, street, house number, and the name of the mail recipient. Similarly, a telephone number is divided into the country code, area code, local exchange, and the connection.
A 32-bit IPv4 address is also hierarchical, but divided only into two parts. The first part of the address, called the **prefix**, defines the network; the second part of the address, called the **suffix**, defines the node (connection of a device to the Internet). The prefix length is $n$ bits and the suffix length is $(32 - n)$ bits. The prefix and suffix lengths depend on the site of the network (organization).

**IPv4 datagram**
Packets used by the IP are called *datagrams*. A datagram is a variable-length packet consisting of two parts: header and payload (data). The header is 20 to 60 bytes in length and contains information essential to routing and delivery. Note that a byte is 8 bits.

**Internet Protocol Version 6 (IPv6)**
Some shortcomings of IPv4 such as address depletion prompted a new version of IP protocol in the early 1990s. The new version, which is called **Internet Protocol version 6 (IPv6)** or **IP new generation (IPng)** was a proposal to augment the address space of IPv4 and at the same time redesign the format of the IP packet and revise some auxiliary protocols. It is interesting to know that IPv5 was a proposal that never materialized. The following shows the main changes in the IPv6 protocol.

**IPv6 addressing**
To prevent the address depletion, IPv6 uses 128 bits to define any device connected to the Internet. An address is represented as either binary or colon-hexadecimal form. The first form is used to store an address in the computer; the second form is used by humans.
The address in IPv6 actually defines three levels of hierarchy: site (organization), subnetwork, and connection to the host.

**IPv6 datagram**
A datagram in this version is also a variable-length packet consisting of two parts: header and payload (data). The header is 40 bytes. However, some extension headers are considered part of the payload in this version.

## 6.5 DATA-LINK LAYER
The TCP/IP suite does not define any protocol in the **data-link layer**. This layer is the territory of networks that when connected make up the Internet. These networks, wired or wireless, receive services and provide services to the network layer. This may give us a clue that there are several standard protocols in the market today.
In the previous section, we learned that communication at the network layer is host-to-host. The Internet, however, is a combination of networks glued together by connecting devices (routers or switches). If a datagram is to travel from a host to another host, it needs to pass through these networks.
Communication at the data-link layer is made up of separate logical connections between the data-link layers in the path. Only one data-link layer is involved at the source or the destination, but two data-link layers are involved at each router. The reason is that source and destination computers are each connected to a single network; each router, however, takes input from one network and sends output to another network.

### 6.5.1 Nodes and links
Although communication at the application, transport, and network layers is end-to-end, communication at the data-link layer is **node-to-node**. Data units from one point in the Internet need to pass through many networks (LANs and WANs) to reach another point. These LANs and WANs are connected by routers. It is customary to refer to the two end hosts and the routers as **nodes** and the networks in between as **links**. The link that connects the nodes are either local area networks (LANs) or Wide Area Networks (WANs).

### 6.5.2 Local area networks (LANs)
In the beginning of this chapter, we learned that a local area network (LAN) is a computer network that is designed for a limited geographic area such as a building or a campus. Although a LAN can be used as an isolated network to connect computers in an organization for the sole purpose of sharing resources, most LANs today are also linked to a wide area network (WAN) or the Internet.
LANs can be wired or wireless networks. In the first group, the stations in the LANs are connected by wire; in the second group the stations are logically connected by air. We discuss each group separately.

**Wired LANS: Ethernet**
Although several wired LANs were invented in the past, only one has survived: the Ethernet. Maybe the reason is that Ethernet was upgraded several times according to the needs of the Internet community.
The Ethernet LAN was developed in the 1970s by Robert Metcalfe and David Boggs. Since then, it has gone through four generations: **Standard Ethernet** (10 Mbps), **Fast Ethernet** (100 Mbps), **Gigabit Ethernet** (1 Gbps), and **10-Gigabit Ethernet** (10 Gbps). The data rate, the speed in which bits are sent in each second, has been increased ten times in each generation.

**Standard Ethernet**
We refer to the original Ethernet technology with the data rate of 10 Mbps (ten million bits per second) as the Standard Ethernet. The data rate in this case defines the speed in which data can be sent out of the station to the LAN. In the case of the Ethernet, the speed is 10 million bits per second. The bits, however, are not sent one by one, a group of bits are packaged together and are referred to as a **frame**. A frame does not carry only data from the sender to the destination. It also carries some information such as the source address (48 bits), the destination address (48 bits), the type of data, the actual data, and some other control bits as a guard to help checking the integrity of data during transition. If we can think of a frame as an envelope carrying a letter from the sender to the receiver, the data is inside the envelope, but there is other information, such as addresses on the envelope. In the case of the LAN all are encapsulated in a frame.

**Fast Ethernet (100 Mbps)**
In the 1990s, Ethernet made a big jump by increasing the **transmission rate** to 100 Mbps, and the new generation was called the Fast Ethernet. The designers of the Fast Ethernet needed to make it compatible with the Standard Ethernet. Most of the protocol such as addressing, frame format remained unchanged. By increasing the transmission rate, features of the Standard Ethernet that depend on the transmission rate had to be revised.

**Gigabit Ethernet**
The need for an even higher data rate resulted in the design of the **Gigabit Ethernet Protocol** (1000 Mbps). The goals of the Gigabit Ethernet were to upgrade the data rate to 1 Gbps, but keep the address length, the frame format, and the maximum and minimum frame length the same.

**10-Gigabit Ethernet**
In recent years, there has been another look into the Ethernet for use in metropolitan areas. The idea is to extend the technology, the data rate, and the coverage distance so that the Ethernet can be used as LAN and MAN (**metropolitan area network**). The goals of the 10-Gigabit Ethernet design can be summarized as upgrading the data rate to 10 Gbps, keeping the same frame size and format, and allowing the interconnection of LANs, MANs, and WAN possible. This data rate is possible only with fiber-optic technology at this time.

**Wireless LANs**
Wireless communication is one of the fastest-growing technologies. The demand for connecting devices without the use of cables is increasing everywhere. Wireless LANs can be found on college campuses, in office buildings, and in many public areas. The first difference we can see between a wired and a wireless LAN is the medium. In a wired LAN, we use wires to connect hosts. In a wireless LAN, the medium is air, the signal is generally broadcast. When hosts in a wireless LAN communicate with each other, they are sharing the same medium (multiple access). Two technologies have been instrumental in this area: Wireless Ethernet and Bluetooth.

**Wireless Ethernet (WiFi)**
Institute of Electrical and Electronics Engineers (IEEE) has defined the specifications for a wireless LAN, which sometimes is referred to as wireless Ethernet or **WiFi** (short for wireless fidelity). WiFi, however, is a wireless LAN that is certified by the WiFi Alliance, a global, nonprofit industry association of more than 300 member companies. The standard defines two kinds of services: the **basic service set (BSS)** and the **extended service set (ESS)**. The second service uses an extra device (access point or AP) that serves as a switch for connection to other LANs or WANs.

**Bluetooth**
**Bluetooth** is a wireless LAN technology designed to connect devices of different functions such as telephones, notebooks, computers (desktop and laptop), cameras, printers, and even coffee makers when they are at a short distance from each other. A Bluetooth LAN is an *ad hoc* network, which means that the network is formed spontaneously; the devices, sometimes called *gadgets*, find each other and make a network called a **piconet**. A Bluetooth LAN can even be connected to the Internet if one of the gadgets has this capability. A Bluetooth LAN, by nature, cannot be large. If there are many gadgets that try to connect, there is chaos.
Bluetooth technology has several applications. Peripheral devices such as a wireless mouse or keyboard can communicate with the computer through this technology. Monitoring devices can communicate with sensor devices in a small health care center. Home security devices can use this technology to connect different sensors to the main security controller. Conference attendees can synchronize their laptop computers at a conference.
Bluetooth was originally started as a project by the Ericsson Company. It is named after Harald Blaatand, the King of Denmark (940–981) who united Denmark and Norway. *Blaatand* translates to *Bluetooth* in English.

### 6.5.3 Wide area networks (WANs)
As we discussed before, the networks connecting two nodes in the Internet can be a LAN or a WAN. As in the case of the LANs, WANs can be wired or wireless. We briefly discuss each separately.

**Wired WANs**
We have a variety of wired WANs in today’s Ethernet. Some are point-to-point and some are switched WANs.

**Point-to-point wireless WANs**
Today we can use several point-to-point wireless networks to provide what is called *last-mile* service to connect residents and businesses to the Internet.

**Dial-up service**
A dial-up network or connection uses the services provided by the telephone networks to transmit data. The telephone network had its beginnings in the late 1800s. The entire network was originally a system to transmit voice. With the advent of the computer era, the network, in the 1980s, began to carry data in addition to voice. During the last decade, the telephone network has undergone many technical changes. The need to communicate digital data resulted in the invention of the dial-up modem.
The term **modem** is a composite word that refers to the two functional entities that make up the device: a signal **modulator** and a signal **demodulator**. A modulator creates signal from data. A demodulator recovers the data from the modulated signal.

**Digital subscriber line (DSL)**
After traditional modems reached their peak data rate, telephone companies developed another technology, DSL, to provide higher-speed access to the Internet. **Digital subscriber line (DSL)** technology is one of the most promising for supporting high-speed communication over the existing telephone. DSL technology is a set of technologies, each differing in the first letter (ADSL, VDSL, HDSL, and SDSL). The set is often referred to as *xDSL*, where *x* can be replaced by A, V, H, or S. We just discuss the first, ADSL. The first technology in the set is **asymmetric DSL (ADSL)**. ADSL provides higher speed (**bit rate**) in the downstream direction (from the Internet to the resident) than in the upstream direction (from the resident to the Internet). That is the reason it is called *asymmetric*.
ADSL allows the subscriber to use the voice channel and the data channel at the same time. The rate for the upstream can reach 1.44 Mbps. However, the data rate is normally below 500 kbps because of the high-level noise in this channel. The downstream data rate can reach 13.4 Mbps. However, the data rate is normally below 8 Mbps because of noise in this channel. A very interesting point is that the telephone company in this case serves as the ISP, so services such as email or Internet access are provided by the telephone company itself.

**Cable network**
Cable networks were originally created to provide access to TV programs for those subscribers who had no reception because of natural obstructions such as mountains. Later the cable networks became popular with people who just wanted a better signal. In addition, cable networks enabled access to remote broadcasting stations via microwave connections. Cable TV also found a good market in Internet access provision, using some of the channels originally designed for video.
Cable companies are now competing with telephone companies for the residential customer who wants high-speed data transfer. DSL technology provides high-data-rate connections for residential subscribers over the local loop. However, DSL uses the existing unshielded twisted-pair cable, which is very susceptible to interference. This imposes an upper limit on the data rate. A solution is the use of the cable TV network.

**Switched wired WANs**
It is obvious that the Internet today cannot be operative with only point-to-point wired WANs that provide the last-mile connection. We need switched wired WANs to connect the backbone of the Internet. Several protocols in the past have been designed for this purpose such as SONET or ATM. However, these are complex networks, discussion of which is beyond the scope of this book.

**Wireless WANs**
The service area of the Internet is so large today that sometimes using only wired WANs cannot provide services to each corner of the world. We definitely need wireless WANs. Several technologies have been used for this purpose as described below.

**WiMax**
The **Worldwide Interoperability Access (WiMax)** is the wireless version of DSL or Cable connection to the Internet. It provides two types of services (fixed WiMax) to connect the main station to fixed station or to mobile stations such as cellular phones.

**Cellular telephony network**
Another wireless WAN today is the **cellular telephony** which was originally designed for voice communication, but it is also used today for Internet communication. We all know that the cellular network divides the earth into cells. The mobile stations communicate with the fixed antenna in the cell that they are inside at each moment. When the user moves to another cell, the communication is between the mobile device and the new antenna.

**Satellite networks**
A **satellite network** is a combination of nodes, some of which are satellites, that provides communication from one point on the Earth to another. A node in the network can be a satellite, an Earth station, or an end-user terminal or telephone.
Satellite networks are like cellular networks in that they divide the planet into cells. Satellites can provide transmission capability to and from any location on Earth, no matter how remote. This advantage makes high-quality communication available to less well-developed parts of the world without requiring a huge investment in ground-based infrastructure.

## 6.6 PHYSICAL LAYER
Our discussion of the TCP/IP protocol suite would be incomplete without the discussion of the physical layer. The role of the physical layer is to transfer the bits received from the data-link layer and convert them to electromagnetic signals for transmission. After the bits are converted to signals, the signals are delivered to the transmission media, which are the subject of our discussion in the next section.

### 6.6.1 Data and signals
At the physical layer, the communication is node-to-node, but the nodes exchange electromagnetic signals.
One of the major functions of the physical layer is to route bits between nodes. However, bits, as the representation of two possible values stored in the memory of a node (host, router, or switch), cannot be sent directly to the transmission medium (wire or air); the bits need to be changed to signals before transmission. So the main duty of the physical layer is to efficiently convert these bits into electromagnetic signals. We first need to understand the nature of the data and then the types of signals to see how we can do this conversion efficiently.

**Analog and Digital**
Data can be analog or digital. The term **analog data** refers to information that is continuous. Analog data, such as the sounds made by a human voice, take on continuous values. When someone speaks, an analog wave is created in the air. This can be captured by a microphone and converted to an analog signal or sampled and converted to a digital signal.
**Digital data** take on discrete values. For example, data are stored in computer memory in the form of 0s and 1s. They can be converted to a digital signal or modulated into an analog signal for transmission across a medium.
Like the data they represent, signals can be either analog or digital. An **analog signal** has infinitely many levels of intensity over a period of time. As the wave moves from value A to value B, it passes through and includes an infinite number of values along its path. A **digital signal**, on the other hand, can have only a limited number of defined values. Although each value can be any number, it is often as simple as 1 and 0. The simplest way to show signals is by plotting them on a pair of perpendicular axes. The vertical axis represents the value or strength of a signal. The horizontal axis represents time.

### 6.6.2 Digital transmission
A computer network is designed to send information from one point to another. This information needs to be converted to either a digital signal or an analog signal for transmission. If data is digital, we need to use **digital-to-digital conversion** techniques, methods which convert digital data to digital signals. If data is analog, we need to use **analog-to-digital conversion** techniques, methods which change an analog signal to a digital signal.

**Digital–to–digital conversion**
If our data is digital and we need to transmit digital signal, we can use digital-to-digital conversion to change the digital data to digital signal. Although there are many techniques for doing so, in its simplest form, a bit or group of bits is represented by a signal level.

**Analog-to-digital conversion**
Sometimes we have an analog signal such as one created by a microphone or camera. The tendency today is to change an analog signal to digital data because the digital signal is less susceptible to noise. Although there are several techniques for doing so, the simplest one is to sample the analog signal to create a digital data and convert the digital data to digital signal as discussed before.

### 6.6.3 Analog transmission
While digital transmission is desirable, it needs a dedicated channel; analog transmission is the only choice if we do not have a dedicated channel. For example, if we are broadcasting in the air, the air belongs to everyone, so we can use only part of the channel available. Based on the data type available, we can use either digital-to-analog or analog-to-analog conversion.

**Digital-to-analog conversion**
**Digital-to-analog conversion** is the process of changing one of the characteristics of an analog signal based on the information in digital data.

**Analog-to-analog conversion**
**Analog-to-analog conversion** is the process of changing one of the characteristics of an analog signal based on the information in digital data.

## 6.7 TRANSMISSION MEDIA
Electrical signals created at the physical layer need transmission media to go from one point to another. Transmission media are actually located below the physical layer and are directly controlled by the physical layer. We could say that transmission media belong to layer zero.
A **transmission medium** can be broadly defined as anything that can carry information from a source to a destination. For example, the transmission medium for two people having a dinner conversation is the air. The air can also be used to convey the message in a smoke signal or semaphore. For a written message, the transmission medium might be a mail carrier, a truck, or an airplane.
In telecommunications, transmission media can be divided into two broad categories: guided and unguided. Guided media include twisted-pair cable, coaxial cable, and fiber-optic cable. Unguided medium is free space.

### 6.7.1 Guided media
**Guided media**, which are those that provide a conduit from one device to another, include **twisted-pair cable**, **coaxial cable**, and **fiber-optic cable**.

**Twisted-pair cable**
A twisted-pair consists of two conductors (normally copper), each with its own plastic insulation, twisted together. One of the wires is used to carry signals to the receiver, and the other is used only as a ground reference. The receiver uses the difference between the two.
In addition to the signal from the sender, interference (noise) may affect both wires and create unwanted signals. If the two wires are parallel, the effect of these unwanted signals is not the same in both wires because they are at different locations relative to the noise sources. By twisting the pairs, a balance is maintained.
The DSL lines that are used by the telephone companies to provide high-data-rate connections are also twisted-pair cables.

**Coaxial cable**
Instead of having two wires, coax has a central core conductor of solid or stranded wire (usually copper) enclosed in an insulating sheath, which is, in turn, encased in an outer conductor of metal foil, braid, or a combination of the two. The outer metallic wrapping serves both as a shield against noise and as the second conductor, which completes the circuit. This outer conductor is also enclosed in an insulating sheath, and the whole cable is protected by a plastic cover.
Cable TV networks use coaxial cable. In the traditional cable TV network, the entire network used coaxial cable. Later, however, cable TV providers replaced most of the media with fiber-optic cable; hybrid networks use coaxial cable only at the network boundaries, near the consumer premises.

**Fiber-optic cable**
A fiber-optic cable is made of glass or plastic and transmits signals in the form of light. This technology uses the property of a beam of light that is refracted (comes back) when it encounters a medium of less density. Covering a glass or plastic medium by another less dense medium (called cladding) guides the light through the medium.
Fiber-optic cable is often found in backbone networks because its wide bandwidth is cost-effective.

### 6.7.2 Unguided media: wireless
Unguided media transport electromagnetic waves without using a physical conductor. This type of communication is often referred to as **wireless communication**. Signals are normally broadcast through free space and thus are available to anyone who has a device capable of receiving them.
Communication today uses three different ranges of electromagnetic spectrum: radio waves, microwaves, and infrared.

**Radio waves**
Electromagnetic waves ranging in frequencies between 3 kHz and 1 GHz are normally called **radio waves**. They are used mostly for radio communication.

**Microwaves**
Electromagnetic waves having frequencies between 1 and 300 GHz are called **microwaves**. Microwaves are unidirectional. When an antenna transmits microwaves, they can be narrowly focused. This means that the sending and receiving antennas need to be aligned. The unidirectional property has an obvious advantage. A pair of antennas can be aligned without interfering with another pair of aligned antennas.

**Infrared**
**Infrared waves**, with frequencies from 300 GHz to 400 THz (wavelengths from 1 mm to 770 nm), can be used for short-range communication. Infrared waves, having high frequencies, cannot penetrate walls. This advantageous characteristic prevents interference between one system and another; a short-range communication system in one room cannot be affected by another system in the next room. When we use our infrared remote control, we do not interfere with the use of the remote by our neighbors. However, this same characteristic makes infrared signals useless for long-range communication. In addition, we cannot use infrared waves outside a building because the sun’s rays contain infrared waves that can interfere with the communication.

## 6.8 END-CHAPTER MATERIALS
### 6.8.1 Recommended reading
For more details about subjects discussed in this chapter, the following books are recommended:
- Forouzan, B. and Mosharrf, F. *Computer Networks: A Top-Down Approach*, New York: McGraw-Hill Education, 2012
- Forouzan, B. *Data Communication and Networking*, New York: McGraw-Hill Education, 2013
- Forouzan, B. *TCP/IP Protocol Suite*, New York: McGraw-Hill Education, 2010
- Forouzan, B. *Local Area Networks*, New York: McGraw-Hill Education, 2003
- Kurose, J. and Ross, K. *Computer Networking*, Reading, MA: Addison-Wesley, 2007

### 6.8.2 Key terms
- 10-Gigabit Ethernet
- analog-to-analog conversion
- analog-to-digital conversion
- analog data
- analog signal
- application layer
- bit rate
- Bluetooth
- cellular telephony
- ciphertext
- client–server paradigm
- coaxial cable
- connecting device
- connectionless protocol
- country domain
- demodulator
- digital-to-analog conversion
- digital-to-digital conversion
- digital data
- digital signal
- digital subscriber line (DSL)
- domain name
- Domain Name System (DNS)
- domain name space
- dotted-decimal notation
- electronic mail (email)
- end system
- ephemeral port number
- Fast Ethernet
- fiber-optic cable
- File Transfer Protocol (FTP)
- frame
- generic domain
- Gigabit Ethernet
- guided media
- hardware
- header
- host
- host identifier
- hypertext
- HyperText Markup Language (HTML)
- HyperText Transfer Protocol (HTTP)
- infrared waves
- internet
- Internet
- Internet address
- Internet Protocol
- Internet Protocol version 6 (IPv6)
- internet service provider (ISP)
- Internetwork
- IP address
- IP datagram
- IP new generation (IPng)
- link
- local area network (LAN)
- Message Access Agent (MAA)
- message transfer agent (MTA)
- metropolitan area network (MAN)
- modem
- modularity
- modulator
- module
- name space
- network layer
- node
- packetizing
- peer-to-peer (P2P) paradigm
- physical layer
- port number
- protocol
- protocol layering
- remote login
- router
- Secure Shell (SHH)
- segment
- software
- source to destination delivery
- Standard Ethernet
- switch
- switched WAN
- TCP/IP protocol suite
- TELNET (terminal network)
- Transmission Control Protocol (TCP)
- transmission medium
- transmission rate
- twisted-pair cable
- unguided media
- uniform resource locator (URL)
- user agent (UA)
- user datagram
- User Datagram Protocol (UDP)
- web page
- well-known port number
- wide area network (WAN)
- Worldwide Interoperability Access (WiMAX)
- World Wide Web (WWW)
- write once, read many (WORM)

### 6.8.3 Summary
- A network is a set of devices connected by communication links. Today when we speak of networks, we are generally referring to two primary categories: local area networks and wide area networks. The Internet today is made up of many wide and local area networks joined by connecting devices and switching stations. A protocol is a set of rules that governs communication. TCP/IP is a hierarchical protocol suite made of five layers: application, transport, network, data-link, and physical.
- Applications in the Internet are designed using either a client–server paradigm or a peer-to-peer paradigm. The World Wide Web (WWW) is a repository of information linked together from points all over the world. The HyperText Transfer Protocol (HTTP) is the main protocol used to access data on the World Wide Web (WWW). File Transfer Protocol (FTP) is a TCP/IP client–server application for copying files from one host to another. Electronic mail is one of the most common applications on the Internet. TELNET is a client–server application that allows a user to log into a remote machine, giving the user access to the remote system. The Domain Name System (DNS) is a client–server application that identifies each host on the Internet with a unique name.
- The main duty of a transport-layer protocol is to provide process-to-process communication. UDP is a transport protocol that provides unreliable and connectionless service. Transmission Control Protocol (TCP) is another transport-layer protocol that provides reliable and connection-oriented service.
- The network layer supervises the handling of packets by the underlying physical networks. IPv4 is an unreliable connectionless protocol responsible for source-to-destination delivery. The identifiers used in the IP layer of the TCP/IP protocol suite are called the IP addresses. An IPv4 address is 32 bits long. IPv6, the latest version of the Internet Protocol, has a 128-bit address space.
- The data-link layer involves local and wide area networks (LANs and WANs). LANs and WANs can be wired or wireless. Ethernet is the most widely used wired local area network protocol. Dial-up service, DSL, and cable are mostly used for point-to-point wired WANs. Wireless LANs became formalized with wireless Ethernet. Bluetooth is a wireless LAN technology that connects devices (called gadgets) in a small area. WiMAX is a wireless access network that may replace DSL and cable in the future.
- Data must be transformed to electromagnetic signals to be transmitted. Analog data are continuous and take continuous values. Digital data have discrete states and take discrete values. Digital-to-digital conversion changes digital data to digital signal. Digital-to-analog conversion is the process of changing digital data to analog signal. Analog-to-digital conversion is the process of sampling analog data and changing it to digital signal. Analog-to-analog signal means changing analog data to analog signal.
- Transmission media lie below the physical layer. A guided medium provides a physical conduit from one device to another. Twisted-pair cable, coaxial cable, and optical fiber are the most popular types of guided media. Unguided media (free space) transport electromagnetic waves without the use of a physical conductor.
`,
  zh: `
# 第六章：電腦網路與網際網路

個人電腦的發展為商業、工業、科學和教育帶來了巨大的變革。網路領域也發生了類似的革命。技術進步使得通訊連結能夠傳輸更多且更快的信號。因此，服務正在演進以允許使用這種擴展的容量。該領域的研究產生了新技術。一個目標是能夠交換來自世界各地的資料，如文字、音訊和視訊。我們希望隨時隨地快速準確地存取網際網路以下載和上傳資訊。

## 學習目標
學完本章後，學生應能：
- 描述區域網路 (LAN) 和廣域網路 (WAN)。
- 區分 internet (互連網) 和 Internet (網際網路)。
- 描述作為網際網路中網路模型的 TCP/IP 協定套件。
- 定義 TCP/IP 協定套件中的各層及其關係。
- 描述應用層的一些應用程式。
- 描述傳輸層協定提供的服務。
- 描述網路層協定提供的服務。
- 描述資料連結層使用的不同協定。
- 描述實體層的職責。
- 描述電腦網路中使用的不同傳輸介質。

## 6.1 概覽
雖然本章的目標是討論網際網路，一個互連世界上數十億台電腦的系統，但我們不將網際網路視為單一網路，而是一個**互連網 (internetwork)**，即網路的組合。因此，我們首先定義網路，開始我們的旅程。然後我們展示如何連接網路以創建小型互連網。最後，我們展示網際網路的結構，並在本章的其餘部分開啟學習網際網路的大門。

### 6.1.1 網路
**網路**是一組能夠通訊的設備的互連。在這個定義中，設備可以是**主機**（或有時稱為**終端系統**），例如大型電腦、桌上型電腦、筆記型電腦、工作站、行動電話或安全系統。這個定義中的設備也可以是**連接設備**，例如連接網路與其他網路的**路由器**、連接設備的**交換器**、改變資料形式的**數據機**（調變解調器）等等。網路中的這些設備使用有線或無線傳輸介質（如電纜或空氣）連接。當我們在家中使用隨插即用的路由器連接兩台電腦時，我們就建立了一個網路，雖然非常小。

**區域網路**
**區域網路 (LAN)** 通常為私人擁有，連接單一辦公室、建築物或校園內的一些主機。根據組織的需求，LAN 可以簡單到某人家庭辦公室中的兩台 PC 和一台印表機，也可以擴展到整個公司並包括音訊和視訊設備。LAN 中的每台主機都有一個標識符，一個位址，唯一地定義了 LAN 中的主機。主機發送給另一台主機的封包包含來源主機和目的主機的位址。

**廣域網路**
**廣域網路 (WAN)** 也是能夠通訊的設備互連。然而，LAN 和 WAN 之間存在一些差異。LAN 通常在規模上受到限制，跨越辦公室、建築物或校園；WAN 的地理範圍更廣，跨越城鎮、州、國家，甚至全世界。LAN 互連主機；WAN 互連連接設備，如交換器、路由器或數據機。LAN 通常由使用它的組織私有；WAN 通常由通訊公司建立和運營，並由使用它的組織租賃。我們今天看到兩種不同的 WAN 範例：**點對點 WAN** 和 **交換式 WAN**。

一個**點對點 WAN** 是一個透過傳輸介質（電纜或空氣）連接兩個通訊設備的網路。

一個**交換式 WAN** 是一個具有兩個以上端點的網路。我們稍後將看到，交換式 WAN 用於當今全球通訊的主幹。我們可以說交換式 WAN 是由交換器連接的數個點對點 WAN 的組合。

**互連網**
今天，很難看到孤立的 LAN 或 WAN；它們彼此連接。當兩個或多個網路連接時，它們構成一個**互連網 (internetwork)** 或 **internet**。舉例來說，假設一個組織有兩個辦公室。每個辦公室都有一個 LAN，允許辦公室內的所有員工相互通訊。為了使不同辦公室的員工能夠通訊，管理層從服務提供商（如電話公司）租賃了一條點對點專用 WAN，並連接了這兩個 LAN。現在該公司擁有一個互連網，或私人 internet（小寫 i）。辦公室之間的通訊現在成為可能。

### 6.1.2 網際網路 (The Internet)
如前所述，internet（注意小寫 i）是可以相互通訊的兩個或多個網路。最著名的互連網稱為 **Internet**（大寫 I），由成千上萬個互連的網路組成。

網際網路主要由**骨幹網路 (backbones)**、**提供者網路 (provider networks)** 和 **客戶網路 (customer networks)** 組成。在頂層，**骨幹網路**是由一些通訊公司擁有的大型網路。骨幹網路透過一些複雜的交換系統連接，稱為**對等點 (peering points)**。在第二層，有較小的網路，稱為**提供者網路**，它們付費使用骨幹網路的服務。提供者網路連接到骨幹網路，有時也連接到其他提供者網路。**客戶網路**是位於網際網路邊緣的網路，實際使用網際網路提供的服務。它們向提供者網路支付費用以接收服務。

骨幹網路和提供者網路也稱為**網際網路服務提供者 (ISPs)**。骨幹網路通常被稱為國際 ISP；提供者網路通常被稱為國家或區域 ISP。

### 6.1.3 硬體與軟體
我們已經概述了網際網路的結構，它由小型和大型網路透過連接設備黏合在一起組成。然而，應該清楚的是，如果我們只連接這些部件，什麼也不會發生。為了進行通訊，我們需要**硬體**和**軟體**。這類似於複雜的計算，我們既需要電腦也需要程式。在下一節中，我們將展示如何使用*協定分層*來協調這些硬體和軟體的組合。

### 6.1.4 協定分層
當我們談論網際網路時，我們一直聽到的一個詞是*協定*。**協定**定義了發送方和接收方以及所有中間設備需要遵循的規則，以便有效地進行通訊。當通訊簡單時，我們可能只需要一個簡單的協定；當通訊複雜時，我們可能需要將任務分配給不同的層，在這種情況下，我們需要在每一層都有一個協定，即**協定分層**。

**一個情境**
讓我們發展一個簡單的情境來更好地理解協定分層的需求。假設 Ann 和 Maria 是鄰居，有很多共同的想法。她們每次見面都會交流關於退休後的一個專案。突然，Ann 在公司獲得了更高層級的職位，但需要搬到離 Maria 很遠的另一個城市的據點。這兩位朋友仍然想繼續溝通並交流想法，因為她們已經想出了一個創新專案，打算在退休後開始新業務。她們決定透過郵局的普通郵件繼續對話。然而，她們不希望如果信件被攔截，想法會洩露給其他人。她們同意使用一種加密/解密技術。發送者加密信件使其對入侵者不可讀；接收者解密信件以獲取原始信件。我們在第 16 章討論加密/解密方法，但目前我們假設 Maria 和 Ann 使用一種技術，如果沒有解密金鑰就很難解密信件。現在我們可以說 Maria 和 Ann 之間的通訊發生在三個層次。我們假設 Ann 和 Maria 各有三台機器（或機器人）可以在每一層執行任務。

假設 Maria 給 Ann 發送了第一封信。Maria 像是在對 Ann 說話一樣對第三層的機器說話。第三層機器聽 Maria 說什麼並創建明文（一封英文信），然後傳遞給第二層機器。第二層機器獲取明文，對其進行加密，並創建**密文 (ciphertext)**，然後傳遞給第一層機器。第一層機器，大概是一個機器人，獲取密文，將其放入信封中，添加發送者和接收者地址，然後郵寄出去。
在 Ann 那邊，第一層機器從 Ann 的信箱中取信，透過發送者地址識別出來自 Maria 的信。機器從信封中取出密文並將其傳遞給第二層機器。第二層機器解密訊息，創建明文，並將明文傳遞給第三層機器。第三層機器獲取明文並像 Maria 在說話一樣讀出它。

協定分層使我們能夠將複雜的任務劃分為幾個更小、更簡單的任務。例如，我們本可以使用一台機器來完成所有三台機器的工作。然而，如果 Maria 和 Ann 決定機器所做的加密/解密不足以保護其機密，她們必須更換整台機器。在目前的情況下，她們只需要更換第二層機器；其他兩台可以保持不變。這稱為**模組化 (modularity)**。在這種情況下，模組化意味著獨立的層。層（**模組**）可以定義為具有輸入和輸出的黑盒子，而不必關心輸入如何變為輸出。如果兩台機器在給定相同輸入時提供相同的輸出，它們就可以相互替換。例如，Ann 和 Maria 可以從不同的製造商購買第二層機器。只要這兩台機器能從相同的明文創建相同的密文，反之亦然，它們就能完成工作。

協定分層的優點之一是它允許我們將服務與實作分開。一層需要能夠從下層接收一組服務並向上層提供服務；我們不關心該層是如何實作的。例如，Maria 可能決定不購買第一層的機器（機器人）；她可以自己做這項工作。只要 Maria 能執行第一層提供的任務，無論是哪個方向，通訊系統就能運作。

協定分層的另一個優點在我們的簡單範例中看不到，但在我們討論網際網路中的協定分層時會顯現出來，那就是通訊並不總是只使用兩個終端系統；有一些中間系統只需要某些層，而不是所有層。如果我們不使用協定分層，我們就必須使每個中間系統都像終端系統一樣複雜，這會使整個系統更加昂貴。

協定分層有什麼缺點嗎？有人可能會說，擁有單一層會讓工作更容易。不需要每一層都向上層提供服務並向下層提供服務。例如，Ann 和 Maria 可以找到或建造一台能完成所有三項任務的機器。然而，如上所述，如果有一天她們發現代碼被破解，她們每個人都必須更換整台機器，而不是僅僅更換第二層的機器。

**協定分層原則**
讓我們討論協定分層的一些原則。第一個原則規定，如果我們想要雙向通訊，我們需要使每一層能夠執行兩個相反的任務，每個方向一個。例如，第三層的任務是*聽*（在一個方向上）和*說*（在另一個方向上）。第二層需要能夠加密和解密。第一層需要發送和接收郵件。
我們在協定分層中需要遵循的第二個重要原則是，雙方每一層下的兩個物件應該是相同的。例如，雙方第 3 層下的物件應該是明文信件。雙方第 2 層下的物件應該是密文信件。雙方第 1 層下的物件應該是一封郵件。

**邏輯連接**
遵循上述兩個原則後，我們可以考慮每一層之間的邏輯連接。這意味著我們有層對層的通訊。Maria 和 Ann 可以認為每一層都有一個邏輯（想像的）連接，透過它她們可以發送從該層創建的物件。我們將看到邏輯連接的概念將幫助我們更好地理解我們在資料通訊和網路中遇到的分層任務。

### 6.1.5 TCP/IP 協定套件
現在我們知道了協定分層的概念和層之間的邏輯通訊，我們可以介紹 **TCP/IP (傳輸控制協定/網際網路協定)**。TCP/IP 是今天網際網路中使用的一組協定（組織在不同層中的一組協定）。它是一個由互動模組組成的分層協定，每個模組提供特定的功能。術語*分層*意味著每個上層協定都由一個或多個下層協定提供的服務所支援。TCP/IP 協定套件由五層組成：
1.  **應用層** (第 5 層)
2.  **傳輸層** (第 4 層)
3.  **網路層** (第 3 層)
4.  **資料連結層** (第 2 層)
5.  **實體層** (第 1 層)

**分層架構**
為了展示 TCP/IP 協定套件中的層如何參與兩台主機之間的通訊，我們假設我們要在一個由三個 LAN（連結）組成的小型互連網中使用該套件，每個 LAN 都有一個連結層交換器。我們還假設這些連結由一個路由器連接。

讓我們假設電腦 A 與電腦 B 通訊。在此通訊中有五個通訊設備：來源主機（電腦 A）、連結 1 中的連結層交換器、路由器、連結 2 中的連結層交換器和目的主機（電腦 B）。每個設備根據其在互連網中的角色參與一組層。兩台主機參與所有五層；來源主機需要在**應用層**建立訊息並將其向下發送，以便實體發送到目的主機。目的主機需要在**實體層**接收通訊，然後透過其他層將其傳遞到應用層。

路由器只參與三層；只要路由器僅用於**路由**，路由器中就沒有傳輸層或應用層。雖然路由器總是參與一個網路層，但它參與 $n$ 個連結層和實體層的組合，其中 $n$ 是路由器連接的連結數。原因是每個連結可能使用自己的資料連結或實體協定。每個連結可能使用不同的連結層和實體層協定；路由器需要根據一對協定從連結 1 接收封包，並根據另一對協定將其傳遞到連結 2。

然而，連結中的連結層交換器只參與兩層：資料連結層和實體層。雖然每個交換器有兩個不同的連接，但這些連接在同一個連結中，只使用一組協定。這意味著，與路由器不同，連結層交換器只參與一個資料連結層和一個實體層。

**定址和封包名稱**
值得一提的是與網際網路中協定分層相關的另外兩個概念：*定址*和*封包名稱*。如前所述，我們在此模型中具有成對層之間的邏輯通訊。任何涉及雙方的通訊都需要兩個位址：來源位址和目的位址。雖然看起來我們需要五對位址，每一層一對，但我們通常只有四對，因為實體層不需要位址；實體層的資料交換單位是位元，這絕對不可能有位址。

層、該層使用的位址和該層的封包名稱之間存在關係。在應用層，我們通常使用**名稱**來定義提供服務的站點，例如 *someorg.com*，或電子郵件地址，例如 *somebody@coldmail.com*。此層的封包名稱是**訊息 (message)**。
在傳輸層，位址稱為**埠號 (port numbers)**，這些定義了來源和目的地的應用層程式。埠號是區分同時運行的多個程式的本地位址。此層的封包名稱是**區段 (segment)** 或**使用者資料包 (user datagram)**。
在**網路層**，位址是**邏輯位址**（全域），範圍是整個網際網路。網路層位址唯一地定義了設備到網際網路的連接。封包名稱是**資料包 (datagram)**。
連結層位址，有時稱為 **MAC 位址**或**連結層位址**，是本地定義的位址，每個位址定義網路（LAN 或 WAN）中的特定主機或路由器。封包名稱是**訊框 (frame)**。
在實體層，單位是**位元 (bit)**。

## 6.2 應用層
在簡要討論了網路、互連網和網際網路之後，我們準備討論 TCP/IP 協定的每一層。我們從第五層開始，向下移動到第一層。

TCP/IP 協定的第五層稱為應用層。應用層為使用者提供服務。通訊是使用邏輯連接提供的，這意味著兩個應用層假設有一個想像的直接連接，透過它它們可以發送和接收訊息。

考慮一個情境，Sky Research 研究公司的科學家需要從線上書店 Scientific Books 訂購一本與其研究相關的書。邏輯連接發生在 Sky Research 的電腦的應用層和 Scientific Books 伺服器的應用層之間。我們稱第一台主機為 Alice，第二台為 Bob。應用層的通訊是邏輯的，而非實體的。Alice 和 Bob 假設他們之間有一個雙向邏輯通道，透過該通道他們可以發送和接收訊息。然而，實際通訊是透過多個設備和多個實體通道進行的。

### 6.2.1 提供服務
應用層與其他層有些不同，它是套件中的最高層。此層中的協定不向套件中的任何其他協定提供服務；它們只接收傳輸層協定提供的服務。這意味著可以輕鬆地從此層移除協定。只要新協定可以使用傳輸層協定之一提供的服務，也可以將新協定新增至此層。

由於應用層是唯一向網際網路使用者提供服務的層，如上所述，應用層的靈活性允許輕鬆地向網際網路添加新的應用協定，這在網際網路的生命週期中一直在發生。當網際網路創建時，只有少數應用協定可供使用者使用；今天我們無法給出這些協定的數量，因為新的協定不斷被添加。

### 6.2.2 應用層範式
顯然，要使用網際網路，我們需要兩個應用程式相互互動：一個在世界某處的電腦上運行，另一個在世界其他地方的另一台電腦上運行。這兩個程式需要透過網際網路基礎設施相互發送訊息。然而，我們尚未討論這些程式之間的關係應該是什麼。兩個應用程式都應該能夠請求服務並提供服務，還是應用程式只應該做其中之一？在網際網路的生命週期中已經開發了兩種範式來回答這個問題：*主從式 (client-server) 範式*和*點對點 (peer-to-peer) 範式*。我們在此簡要介紹這兩種範式。

**傳統範式：主從式**
傳統範式稱為**主從式範式**。直到幾年前，它一直是最流行的範式。在這種範式中，服務提供者是一個應用程式，稱為**伺服器行程 (server process)**；它持續運行，等待另一個應用程式，稱為**客戶端行程 (client process)**，透過網際網路建立連接並請求服務。通常有一些伺服器行程可以提供特定類型的服務，但有許多客戶端請求任何這些伺服器行程的服務。伺服器行程必須一直運行；客戶端行程在客戶端需要接收服務時啟動。

雖然主從式範式中的通訊是在兩個應用程式之間進行的，但每個程式的角色完全不同。換句話說，我們不能將客戶端程式作為伺服器程式運行，反之亦然。

這種範式的一個問題是通訊負載集中在伺服器肩上，這意味著伺服器應該是一台功能強大的電腦。即使是一台功能強大的電腦，如果大量客戶端試圖同時連接到伺服器，也可能會不堪重負。另一個問題是，必須有一個服務提供者願意承擔成本並為特定服務創建一個強大的伺服器，這意味著服務必須始終為伺服器帶來某種類型的收入，以鼓勵這種安排。

一些傳統服務仍在使用這種範式，包括**全球資訊網 (WWW)** 及其載具 **超文本傳輸協定 (HTTP)**、檔案傳輸協定 (FTP)、安全殼層 (SSH)、電子郵件等。我們將在本章稍後討論其中一些協定和應用程式。

**新範式：點對點**
一種稱為**點對點範式**（通常縮寫為 **P2P 範式**）的新範式已經出現，以回應某些新應用程式的需求。在這種範式中，不需要伺服器行程一直運行並等待客戶端行程連接。責任在對等點之間共享。連接到網際網路的電腦可以在某個時間提供服務，在另一個時間接收服務。電腦甚至可以同時提供和接收服務。

真正適合這種範式的一個領域是網際網路電話。電話通訊確實是一種點對點活動；沒有一方需要永遠運行等待另一方呼叫。可以使用點對點範式的另一個領域是當連接到網際網路的一些電腦有東西要彼此分享時。例如，如果一個網際網路使用者有一個檔案可供其他網際網路使用者分享，則無需檔案持有者成為伺服器並一直運行伺服器行程等待其他使用者連接並檢索檔案。

雖然點對點範式已被證明易於擴展且在消除一直運行和維護昂貴伺服器的需求方面具成本效益，但也存在一些挑戰。主要挑戰一直是**安全性**；在分散式服務之間建立安全通訊比在由專用伺服器控制的服務之間建立安全通訊更困難。另一個挑戰是適用性；似乎並非所有應用程式都能使用這種新範式。例如，如果有一天 Web 可以實作為點對點服務，並非許多網際網路使用者都準備好參與其中。

### 6.2.3 標準主從式應用
在網際網路的生命週期中，已經開發了幾個主從式應用程式。我們不必重新定義它們，但我們需要了解它們做什麼。我們在本節中選擇了六個標準應用程式。我們從 HTTP 和全球資訊網開始，因為幾乎所有網際網路使用者都在使用它們。然後我們介紹在網際網路上具有高流量負載的檔案傳輸和電子郵件應用程式。接下來，我們解釋遠端登入以及如何使用 TELNET 和 SSH 協定來實現。最後，我們討論 DNS，所有應用程式都使用它將應用層標識符映射到相應的主機 IP 位址。

**全球資訊網和 HTTP**
在本節中，我們首先介紹全球資訊網（縮寫為 WWW 或 Web）。然後我們討論超文本傳輸協定 (HTTP)，這是與 Web 相關的最常見的主從式應用程式。

**全球資訊網**
今天的 Web 是一個資訊儲存庫，其中的文件（稱為**網頁**）分佈在世界各地，相關文件連結在一起。Web 的流行和增長與上述陳述中的兩個術語有關：分佈式和連結。分佈允許 Web 的增長。世界上的每個網頁伺服器都可以向儲存庫添加新網頁並向所有網際網路使用者宣佈，而不會使少數伺服器過載。連結允許一個網頁引用儲存世界其他地方的另一個伺服器中的另一個網頁。網頁連結是使用稱為**超文本 (hypertext)** 的概念實現的，該概念在網際網路出現之前許多年就已引入。這個想法是使用一台機器，當文件中出現指向另一個文件的連結時，自動檢索儲存在系統中的該文件。Web 以電子方式實現了這個想法：允許在使用者點擊連結時檢索連結的文件。今天，超文本一詞（意指連結的文字文件）已更改為**超媒體 (hypermedia)**，以表明網頁可以是文字文件、圖像、音訊檔案或視訊檔案。

今天的 WWW 是一個分散式主從式服務，其中使用**瀏覽器**的客戶端可以存取使用伺服器的服務。然而，提供的服務分佈在許多稱為*站點*的位置。每個站點持有一份或多份文件，稱為**網頁**。然而，每個網頁都可以包含一些指向相同或不同站點中其他網頁的連結。換句話說，網頁可以是簡單的或複合的。簡單網頁沒有指向其他網頁的連結；複合網頁有一個或多個指向其他網頁的連結。每個網頁都是一個具有名稱和位址的檔案。

**Web 客戶端（瀏覽器）**
各種供應商提供商業**瀏覽器**來解釋和顯示網頁，所有這些瀏覽器都使用幾乎相同的架構。每個瀏覽器通常由三個部分組成：控制器、客戶端協定和直譯器。
控制器接收來自鍵盤或滑鼠的輸入，並使用客戶端程式存取文件。存取文件後，控制器使用其中一個直譯器在螢幕上顯示文件。客戶端協定可以是稍後描述的協定之一，例如 HTTP 或 FTP。直譯器可以是**超文本標記語言 (HTML)**、Java 或 JavaScript，具體取決於文件類型。一些商業瀏覽器包括 Internet Explorer、Netscape Navigator 和 Firefox。

**Web 伺服器**
網頁儲存在伺服器上。每當請求到達時，相應的文件就會發送給客戶端。

**統一資源定位器 (URL)**
網頁作為一個檔案，需要有一個唯一的標識符以區別於其他網頁。為了定義網頁，我們需要三個標識符：*主機*、*埠*和*路徑*。然而，在定義網頁之前，我們需要告訴瀏覽器我們想要使用什麼主從式應用程式，這稱為*協定*。這意味著我們需要四個標識符來定義網頁。第一個是用於獲取網頁的載具類型；後三個組成了定義目的地物件（網頁）的組合。
- **協定**。第一個標識符是我們需要用來存取網頁的主從式程式的縮寫。
- **主機標識符**。主機標識符可以是伺服器的 IP 位址或給予伺服器的唯一名稱。
- **埠號**。埠是一個 16 位元整數，通常為主從式應用程式預定義。
- **路徑**。路徑標識檔案在底層作業系統中的位置和名稱。此標識符的格式通常取決於作業系統。在 UNIX 中，路徑是一組目錄名稱，後跟檔案名稱，全部由斜線分隔。
為了將這四個部分結合在一起，設計了**統一資源定位器 (URL)**；它使用三個不同的分隔符號在四個部分之間，如下所示：
\`protocol://host:port/path\`

**超文本傳輸協定 (HTTP)**
**超文本傳輸協定 (HTTP)** 是一個協定，用於定義如何編寫主從式程式以從 Web 檢索網頁。HTTP 客戶端發送請求；HTTP 伺服器返回回應。伺服器使用埠號 80；客戶端使用臨時埠號。

**6.2.4 檔案傳輸協定 (FTP)**
**檔案傳輸協定 (FTP)** 是 TCP/IP 提供的標準協定，用於將檔案從一台主機複製到另一台主機。雖然將檔案從一個系統傳輸到另一個系統看起來簡單直接，但必須先處理一些問題。例如，兩個系統可能使用不同的檔案命名慣例。兩個系統可能有不同的資料表示方式。兩個系統可能有不同的目錄結構。所有這些問題都由 FTP 以非常簡單優雅的方法解決了。

客戶端有三個組件：使用者介面、客戶端控制行程和客戶端資料傳輸行程。伺服器有兩個組件：伺服器控制行程和伺服器資料傳輸行程。控制連接在控制行程之間建立。資料連接在資料傳輸行程之間建立。
命令和資料傳輸的分離使 FTP 更有效率。控制連接使用非常簡單的通訊規則。我們一次只需要傳輸一行命令或一行回應。另一方面，由於傳輸的資料類型多樣，資料連接需要更複雜的規則。

**兩個連接的生命週期**
FTP 中的兩個連接有不同的生命週期。控制連接在整個互動式 FTP 會話期間保持連接。資料連接在每次檔案傳輸活動中打開然後關閉。每當使用涉及傳輸檔案的命令時，它就會打開，並在檔案傳輸時關閉。換句話說，當使用者啟動 FTP 會話時，控制連接打開。當控制連接打開時，如果傳輸多個檔案，資料連接可以打開和關閉多次。

**6.2.5 電子郵件**
**電子郵件**（或 **email**）允許使用者交換訊息。然而，此應用程式的性質與目前討論的其他應用程式不同。在 HTTP 或 FTP 等應用程式中，伺服器程式一直運行，等待來自客戶端的請求。當請求到達時，伺服器提供服務。有一個請求和一個回應。在電子郵件的情況下，情況有所不同。首先，電子郵件被認為是單向交易。當 Alice 發送電子郵件給 Bob 時，她可能期望回應，但這不是強制性的。Bob 可能回應也可能不回應。如果他回應，那就是另一個單向交易。其次，Bob 運行伺服器程式並等待有人發送電子郵件給他是不可行也不合邏輯的。Bob 在不使用電腦時可能會關閉電腦。這意味著主從式程式設計的想法應該以另一種方式實現：使用一些中間電腦（伺服器）。使用者只在想要時運行客戶端程式，中間伺服器應用主從式範式。

**架構**
為了解釋電子郵件的架構，我們給出一個常見場景。
在常見場景中，電子郵件的發送者和接收者（分別為 Alice 和 Bob）透過 LAN 或 WAN 連接到兩個郵件伺服器。管理員為每個使用者創建了一個**信箱**，用於儲存接收到的訊息。信箱是伺服器硬碟的一部分，是一個具有權限限制的特殊檔案。只有信箱的所有者才有權存取它。管理員還創建了一個佇列（spool）來儲存等待發送的訊息。
一封來自 Alice 給 Bob 的簡單電子郵件需要九個不同的步驟。Alice 和 Bob 使用三種不同的代理：**使用者代理 (UA)**、**郵件傳輸代理 (MTA)** 和 **訊息存取代理 (MAA)**。當 Alice 需要發送訊息給 Bob 時，她運行 UA 程式準備訊息並將其發送到她的郵件伺服器。她站點的郵件伺服器使用佇列（spool）來儲存等待發送的訊息。然而，訊息需要使用 MTA 透過網際網路從 Alice 的站點發送到 Bob 的站點。這裡需要兩個郵件傳輸代理：一個客戶端和一個伺服器。像網際網路上大多數主從式程式一樣，伺服器需要一直運行，因為它不知道客戶端何時會請求連接。另一方面，當佇列中有訊息要發送時，系統可以觸發客戶端。Bob 站點的使用者代理允許 Bob 閱讀接收到的訊息。Bob 隨後使用 MAA 客戶端從在第二個伺服器上運行的 MAA 伺服器檢索訊息。
Bob 需要另一對主從式程式：訊息存取程式。這是因為 MTA 主從式程式是一個*推送*程式：客戶端將訊息推送到伺服器。Bob 需要一個*拉取*程式。客戶端需要從伺服器拉取訊息。

**6.2.6 TELNET**
伺服器程式可以向其對應的客戶端程式提供特定服務。例如，FTP 伺服器旨在讓 FTP 客戶端在伺服器站點儲存或檢索檔案。然而，不可能為我們需要的每種類型的服務都擁有一對主從式程式；伺服器的數量很快就會變得難以處理。這個想法是不可擴展的。另一種解決方案是為一組常見場景擁有特定的主從式程式，但也擁有一些通用的主從式程式，允許客戶端站點的使用者登入伺服器站點的電腦並使用那裡可用的服務。例如，如果學生需要使用她大學實驗室的 Java 編譯器程式，則無需 Java 編譯器客戶端和 Java 編譯器伺服器。學生可以使用客戶端登入程式登入大學伺服器並在大學使用編譯器程式。我們將這些通用的主從式對稱為**遠端登入**應用程式。
最初的遠端登入協定之一是 **TELNET**，它是 TErminaL NETwork 的縮寫。雖然 TELNET 需要登入名稱和密碼，但它很容易受到駭客攻擊，因為它以明文（未加密）發送包括密碼在內的所有資料。駭客可以竊聽並獲取登入名稱和密碼。由於這個安全問題，TELNET 的使用已經減少，取而代之的是另一種協定，安全殼層 (SSH)。

**6.2.7 安全殼層 (SSH)**
雖然**安全殼層 (SSH)** 是一個安全的應用程式，今天可用於多種用途，如遠端登入和檔案傳輸，但它最初設計是用來取代 TELNET。SSH 有兩個版本：SSH-1 和 SSH-2，它們完全不相容。第一個版本 SSH-1 由於其中的安全缺陷現已棄用。目前的版本稱為 SSH-2。

**6.2.8 網域名稱系統 (DNS)**
我們討論的最後一個主從式應用程式旨在幫助其他應用程式。為了識別實體，TCP/IP 協定使用 IP 位址，該位址唯一地標識主機到網際網路的連接。然而，人們更喜歡使用名稱而不是數字位址。因此，網際網路需要一個可以將名稱映射到位址的目錄系統。這類似於電話網路。電話網路設計為使用電話號碼，而不是名稱。人們可以保留一個私人檔案將名稱映射到相應的電話號碼，或者可以撥打電話查號台來做這件事。
由於今天的網際網路如此龐大，中央目錄系統無法容納所有的映射。此外，如果中央電腦故障，整個通訊網路就會崩潰。更好的解決方案是將資訊分佈在世界各地的許多電腦中。在這種方法中，需要映射的主機可以聯繫持有所需資訊的最近電腦。TCP/IP 使用 **DNS** 客戶端和 DNS 伺服器將名稱映射到位址。使用者想要使用檔案傳輸客戶端存取在遠端主機上運行的相應檔案傳輸伺服器。使用者只知道檔案傳輸伺服器名稱，例如 *afilesource.com*。然而，TCP/IP 套件需要檔案傳輸伺服器的 IP 位址來建立連接。以下六個步驟將主機名稱映射到 IP 位址：
1.  使用者將主機名稱傳遞給檔案傳輸客戶端。
2.  檔案傳輸客戶端將主機名稱傳遞給 DNS 客戶端。
3.  每台電腦在啟動後都知道一個 DNS 伺服器的位址。DNS 客戶端向 DNS 伺服器發送一條訊息，其中包含使用 DNS 伺服器已知 IP 位址查詢檔案傳輸伺服器名稱的查詢。
4.  DNS 伺服器回應所需檔案傳輸伺服器的 IP 位址。
5.  DNS 客戶端將 IP 位址傳遞給檔案傳輸伺服器。
6.  檔案傳輸客戶端現在使用接收到的 IP 位址存取檔案傳輸伺服器。

**名稱空間**
為了不模棱兩可，分配給機器的名稱必須從名稱空間中仔細選擇，並且完全控制名稱和 IP 位址之間的綁定。換句話說，名稱必須是唯一的，因為位址是唯一的。**名稱空間**可以將每個位址映射到唯一的名稱，通常按層次結構組織。在分層*名稱空間*中，每個名稱由幾個部分組成。第一部分可以定義組織的性質，第二部分可以定義組織的名稱，第三部分可以定義組織中的部門，依此類推。在這種情況下，分配和控制名稱空間的權限可以分散。中央機構可以分配定義組織性質的部分和組織名稱。名稱其餘部分的責任可以交給組織本身。組織可以向名稱添加後綴（或前綴）以定義其主機或資源。組織的管理層不必擔心為主機選擇的前綴被另一個組織佔用，因為即使位址的一部分相同，整個位址也是不同的。

**網際網路中的 DNS**
DNS 是一個可用於不同平台的協定。在網際網路中，**網域名稱空間**（樹）最初分為三個不同的部分：通用網域、國家網域和反向網域。然而，由於網際網路的快速增長，追蹤反向網域變得極其困難，反向網域可用於在給定 IP 位址時查找主機名稱。反向網域現已棄用。因此，我們專注於前兩個。

**通用網域**
**通用網域**根據其通用行為定義註冊主機。樹中的每個節點定義一個網域，這是**網域名稱**空間資料庫的索引。觀察這棵樹，我們看到通用網域部分的第一層允許 14 個可能的標籤。這些標籤描述了組織類型：
*   **aero**：航空公司和航太
*   **biz**：商業或公司
*   **com**：商業組織
*   **coop**：合作組織
*   **edu**：教育機構
*   **gov**：政府機構
*   **info**：資訊服務提供者
*   **int**：國際組織
*   **mil**：軍事團體
*   **museum**：博物館
*   **name**：個人名稱（個人）
*   **net**：網路支援中心
*   **org**：非營利組織
*   **pro**：專業組織

**國家網域**
**國家網域**部分使用兩個字元的國家縮寫（例如，us 代表美國）。第二個標籤可以是組織性的，也可以是更具體的國家名稱。例如，美國使用州縮寫作為 us 的細分（例如，ca.us.）。

**6.2.9 點對點範式**
我們在本章前面討論了主從式範式。點對點檔案分享的第一個實例可以追溯到 1987 年 12 月，當時 Wayne Bell 創建了 *WWIVnet*，這是 WWIV（第四次世界大戰）電子佈告欄軟體的網路組件。1999 年 7 月，Ian Clarke 設計了 *Freenet*，這是一個分散式、抗審查的分散式資料儲存庫，旨在透過具有強大匿名保護的點對點網路提供言論自由。
點對點隨著 Napster (1999–2001) 的出現而流行起來，這是由 Shawn Fanning 創建的線上音樂檔案分享服務。雖然使用者免費複製和分發音樂檔案導致了針對 Napster 的版權侵犯訴訟，並最終關閉了該服務，但它為後來出現的點對點檔案分發模型鋪平了道路。Gnutella 於 2000 年 3 月首次發布。隨後是 FastTrack（由 Kazaa 使用）、BitTorrent、WinMX 和 GNUnet，分別於 2001 年 3 月、4 月、5 月和 11 月發布。

準備分享資源的網際網路使用者成為對等點並形成網路。當網路中的一個對等點有一個檔案（例如音訊或視訊檔案）要分享時，它會讓其他對等點可以使用。感興趣的對等點可以連接到儲存檔案的電腦並下載它。對等點下載檔案後，可以讓其他對等點下載。隨著更多對等點加入並下載該檔案，該檔案的更多副本可供群組使用。由於對等點列表可能會增長和縮小，問題是該範式如何追蹤忠實的對等點和檔案的位置。為了回答這個問題，我們首先需要將 P2P 網路分為兩類：集中式和分散式。

**集中式網路**
在**集中式 P2P 網路**中，列出對等點及其提供的內容的目錄系統使用主從式範式，但檔案的儲存和下載使用點對點範式。因此，集中式 P2P 網路有時被稱為混合 P2P 網路。Napster 是集中式 P2P 的一個例子。在這種類型的網路中，對等點首先在中央伺服器註冊。然後對等點提供其 IP 位址和要分享的檔案列表。為了避免系統崩潰，Napster 使用了多個伺服器來實現此目的。
尋找特定檔案的對等點向中央伺服器發送查詢。伺服器搜尋其目錄並回應擁有檔案副本的節點的 IP 位址。對等點聯繫其中一個節點並下載檔案。目錄隨著節點加入或離開對等點而不斷更新。
集中式網路使目錄的維護變得簡單，但有幾個缺點。存取目錄會產生巨大的流量並降低系統速度。中央伺服器容易受到攻擊，如果它們全部發生故障，整個系統就會崩潰。

**分散式網路**
分散式 P2P 網路不依賴集中式目錄系統。在這個模型中，對等點將自己安排成*覆蓋網路*，這是在實體網路上建立的邏輯網路。根據覆蓋網路中節點的連結方式，分散式 P2P 網路被歸類為非結構化或結構化。
在*非結構化* P2P 網路中，節點隨機連結。在非結構化 P2P 中搜尋效率不高，因為尋找檔案的查詢必須透過網路氾濫傳播，這會產生大量流量，而且查詢仍可能無法解決。這種類型網路的兩個例子是 Gnutella 和 Freenet。
*結構化*網路使用預定義的規則集來連結節點，以便可以有效地解決查詢。用於此目的的最常見技術是*分散式雜湊表 (DHT)*。DHT 用於許多應用程式，包括分散式資料結構 (DDS)、內容分散式系統 (CDS)、網域名稱系統 (DNS) 和 P2P 檔案分享。**BitTorrent** 是一種使用 DHT 的流行 P2P 檔案分享協定。

## 6.3 傳輸層
TCP/IP 套件中的**傳輸層**位於應用層和網路層之間。它為應用層提供服務並從網路層接收服務。傳輸層充當客戶端程式和伺服器程式之間的聯絡人，即**行程對行程**連接。傳輸層是 TCP/IP 協定套件的核心；它是將資料從網際網路中的一點傳輸到另一點的端對端邏輯載具。只有兩個終端系統使用傳輸層的服務；所有中間路由器只使用前三層。

### 6.3.1 傳輸層服務
在本節中，我們討論傳輸層可以提供的服務；在下一節中，我們討論幾種傳輸層協定。

**行程對行程通訊**
傳輸層協定的第一個職責是提供*行程對行程通訊*。行程是使用傳輸層服務的應用層實體（正在運行的程式）。
網路層（稍後討論）負責電腦層級的通訊（主機對主機通訊）。網路層協定只能將訊息傳遞給目的電腦。然而，這是不完整的傳遞。訊息仍然需要傳遞給正確的行程。這就是傳輸層協定接管的地方。傳輸層協定負責將訊息傳遞給適當的行程。

**定址：埠號**
雖然有幾種方法可以實現行程對行程通訊，但最常見的是透過主從式範式。本地主機上的行程，稱為*客戶端*，需要通常在遠端主機上的行程，稱為*伺服器*的服務。兩個行程（客戶端和伺服器）具有相同的名稱。例如，要從遠端機器獲取日期和時間，我們需要在本地主機上運行 daytime 客戶端行程，在遠端機器上運行 daytime 伺服器行程。遠端電腦可以同時運行多個伺服器程式，就像多個本地電腦可以同時運行一個或多個客戶端程式一樣。為了通訊，我們必須定義本地主機、本地行程、遠端主機和遠端行程。本地主機和遠端主機使用 IP 位址定義（在下一節中討論）。為了定義行程，我們需要第二個標識符，稱為**埠號**。在 TCP/IP 協定套件中，埠號是 0 到 65535 之間的整數（16 位元）。
客戶端程式使用稱為**臨時埠號**的埠號定義自己。詞語 ephemeral 意思是*短暫的*，之所以使用是因為客戶端的壽命通常很短。建議臨時埠號大於 1023，以便某些主從式程式正常運作。伺服器行程也必須使用埠號定義自己。然而，這個埠號不能隨機選擇。TCP/IP 已決定為伺服器使用通用埠號；這些稱為**熟知埠號**。每個客戶端行程都知道相應伺服器行程的熟知埠號。

### 6.3.2 傳輸層協定
雖然網際網路使用多種傳輸層協定，但我們在本節中僅討論兩種：UDP 和 TCP。

**使用者資料包協定 (UDP)**
**使用者資料包協定 (UDP)** 是一種無連接、不可靠的傳輸協定。除提供行程對行程通訊代替主機對主機通訊外，它不向網路層服務添加任何內容。如果 UDP 如此無力，為什麼行程會想要使用它？缺點伴隨著優點。UDP 是一個非常簡單的協定，使用最少的開銷。如果一個行程想要發送一條小訊息並且不太關心可靠性，它可以使用 UDP。使用 UDP 發送小訊息比使用 TCP 需要發送者和接收者之間更少的互動。

**使用者資料包**
UDP 封包稱為**使用者資料包**，具有 8 位元組的固定大小**標頭**。然而，總長度需要更小，因為 UDP 使用者資料包儲存在總長度為 65535 位元組的 **IP 資料包**中。

**傳輸控制協定 (TCP)**
**傳輸控制協定 (TCP)** 是一種連線導向、可靠的協定。TCP 明確定義了連線建立、資料傳輸和連線拆除階段，以提供連線導向服務。這裡的連線導向服務意味著屬於同一訊息（來自應用層）的所有封包（區段）之間存在連接（關係）。TCP 使用序列號來定義區段的順序。序列號與每個區段中的位元組數有關。例如，如果訊息是 6000 位元組，第一個區段的序列號為 0，第二個區段的序列號為 2000，第三個區段的序列號為 4000（過程更複雜，我們試圖簡化它）。這樣，如果一個區段遺失，接收者將保留另外兩個，直到發送者重置遺失的那個。

**區段**
在傳輸層，TCP 將若干位元組組合成一個稱為**區段 (segment)** 的封包。TCP 向每個區段添加一個標頭（用於控制目的）並將該區段傳遞給網路層進行傳輸。這些區段被封裝在 IP 資料包中。

## 6.4 網路層
TCP/IP 協定套件中的**網路層**負責訊息的主機對主機傳遞。
網路層涉及來源主機、目的主機和路徑中的所有路由器。在來源主機，網路層接受來自傳輸層的封包，將封包封裝在**資料包**中，並將封包傳遞給資料連結層。在目的主機，資料包被解封裝，封包被提取並傳遞給相應的傳輸層。雖然來源和目的主機涉及 TCP/IP 套件的所有五層，但如果路由器僅路由封包，則使用三層；然而，它們可能需要傳輸層和應用層用於控制目的。路徑中的路由器通常顯示為具有兩個資料連結層和兩個實體層，因為它從一個網路接收封包並將其傳遞到另一個網路。

### 6.4.1 網路層提供的服務
網路層位於傳輸層之下；這意味著網路層為傳輸層提供服務。我們在下面討論此服務的一些方面。

**封包化**
網路層的第一個職責無疑是**封包化**：在來源將酬載（從上層接收的資料）封裝在網路層封包中，並在目的地從網路層封包解封裝酬載。換句話說，網路層的一個職責是將酬載從來源攜帶到目的地，而不改變或使用它。網路層正在做像郵局這樣的載體服務，郵局負責將包裹從發送者傳遞給接收者，而不改變或使用內容。
1. 來源網路層協定從傳輸層協定接收封包，添加一個包含來源和目的位址以及網路層協定所需的其他資訊的標頭。
2. 然後網路層協定在邏輯上將封包傳遞給目的地的網路層協定。
3. 目的主機接收網路層封包，解封裝酬載並傳遞給上層協定。
如果封包在來源或路徑中的路由器處被分段，網路層負責等待直到所有片段到達，重新組裝它們，並將它們傳遞給上層協定。
一個傳輸層酬載可以封裝在幾個網路層封包中。

**封包傳遞**
網路層的封包傳遞是不可靠和無連接的。我們接下來簡要討論這兩個概念。

**不可靠傳遞**
網路層的封包傳遞是**不可靠的**。這意味著封包可能會損壞、遺失、重複。換句話說，網路層提供盡力而為的傳遞，但不保證封包會像我們預期的那樣到達目的地。這與我們郵寄普通信件時從郵局獲得的服務相同。這兩種情況的原因都是成本。如果我們需要郵局的保證，成本會更高（例如掛號信）。如果我們需要網路層的保證，封包的傳遞將被延遲。每個封包都需要在每個路由器和目的地進行檢查，如果損壞則重新發送。檢查遺失的封包成本更高。這是否意味著我們透過網際網路發送的訊息不可靠？答案是，如果我們想保證訊息不損壞，我們需要在傳輸層使用 TCP 協定。如果傳輸層的酬載損壞（由於資料連結層的不可靠傳遞），TCP 會丟棄封包並請求重新發送資料，如我們在上一節中所討論的。

**無連接傳遞**
網路層的傳遞也是**無連接的**，但這裡的無連接一詞並不意味著發送者和接收者之間沒有實體連接。這意味著網路層獨立處理每個封包（就像郵局處理信件的方式一樣）。換句話說，屬於同一傳輸層酬載的封包之間沒有關係。如果一個傳輸層封包產生四個網路層封包，則不保證封包按發送順序到達，因為每個封包可能遵循不同的路徑到達目的地。一個傳輸層封包分為四個網路層封包。它們按順序 (1, 2, 3, 4) 發送，但它們按亂序 (2, 4, 3, 1) 接收。目的地的傳輸層負責保留封包直到所有封包到達，然後將其按順序排列並傳遞給應用層。

**路由**
網路層的另一個職責，與其他職責一樣重要，是**路由**。網路層負責將封包從其來源路由到目的地。實體網路是網路（LAN 和 WAN）和連接它們的路由器的組合。這意味著從來源到目的地有多條路徑。網路層負責在這些可能路徑中找到*最佳*路徑。網路層需要有一些具體策略來定義最佳路徑。在今天的網際網路中，這是透過運行一些*路由協定*來幫助路由器協調它們對鄰域的了解，並得出一致的表以在封包到達時使用。

### 6.4.2 網路層協定
雖然網路層有幾個協定，但主要協定稱為**網際網路協定 (IP)**。其他協定是幫助 IP 的輔助協定。今天，使用了兩個版本的 IP 協定：IPv4 和 IPv6。我們在接下來的兩節中討論每一個。

**網際網路協定第四版 (IPv4)**
今天大多數系統都在使用網際網路協定第四版 (IPv4)，但由於該協定的位址空間較小和封包格式等原因，將來會有所改變。

**IPv4 定址**
TCP/IP 協定套件的 IPv4 層中用於識別每個設備到網際網路連接的標識符稱為**網際網路位址**或 **IP 位址**。IPv4 位址是一個 32 位元位址，唯一且通用地定義了主機或路由器到網際網路的連接。IP 位址是連接的位址，而不是主機或路由器的位址，因為如果設備移動到另一個網路，IP 位址可能會更改。IPv4 位址在每個位址定義一個且僅一個到網際網路的連接的意義上是唯一的。如果一個設備，如路由器，透過多個網路有多個到網際網路的連接，它就有多個 IPv4 位址。IPv4 位址在定址系統必須被任何想要連接到網際網路的主機接受的意義上是通用的。

有三種常見的表示法來顯示 IPv4 位址：二進位表示法（基底 2）、點分十進位表示法（基底 256）和十六進位表示法（基底 16）。在二進位表示法中，IPv4 位址顯示為 32 位元。為了使位址更具可讀性，通常在每個八位元組（8 位元）之間插入一個或多個空格。每個八位元組通常稱為一個位元組。為了使 IPv4 位址更緊湊且更易於閱讀，通常以十進位形式書寫，並用小數點（點）分隔位元組。這種格式稱為**點分十進位表示法**。請注意，因為每個位元組（八位元組）只有 8 位元，所以點分十進位表示法中的每個數字都在 0 到 255 之間。我們有時會看到十六進位表示法的 IPv4 位址。每個十六進位數字相當於四個位元。這意味著一個 32 位元位址有 8 個十六進位數字。這種表示法常用於網路程式設計。

在任何涉及傳遞的通訊網路中，如電話網路或郵政網路，定址系統都是分層的。在郵政網路中，郵政地址（郵寄地址）包括國家、城市、街道、門牌號碼和郵件收件人的姓名。同樣，電話號碼分為國家代碼、區域代碼、本地交換局和連接號碼。
32 位元 IPv4 位址也是分層的，但只分為兩部分。位址的第一部分稱為**前綴**，定義網路；位址的第二部分稱為**後綴**，定義節點（設備到網際網路的連接）。前綴長度為 $n$ 位元，後綴長度為 $(32 - n)$ 位元。前綴和後綴長度取決於網路（組織）的站點。

**IPv4 資料包**
IP 使用的封包稱為*資料包*。資料包是由兩部分組成的可變長度封包：標頭和酬載（資料）。標頭長度為 20 到 60 位元組，包含對路由和傳遞至關重要的資訊。請注意，一個位元組是 8 位元。

**網際網路協定第六版 (IPv6)**
IPv4 的一些缺點，如位址耗盡，促使在 1990 年代初期推出了新版本的 IP 協定。新版本稱為**網際網路協定第六版 (IPv6)** 或 **IP 新一代 (IPng)**，提議擴充 IPv4 的位址空間，同時重新設計 IP 封包的格式並修訂一些輔助協定。有趣的是，IPv5 是一個從未實現的提議。以下顯示了 IPv6 協定的主要變化。

**IPv6 定址**
為了防止位址耗盡，IPv6 使用 128 位元來定義連接到網際網路的任何設備。位址表示為二進位或冒號十六進位形式。第一種形式用於在電腦中儲存位址；第二種形式供人類使用。
IPv6 中的位址實際上定義了三個層級的結構：站點（組織）、子網路和與主機的連接。

**IPv6 資料包**
此版本中的資料包也是由兩部分組成的可變長度封包：標頭和酬載（資料）。標頭為 40 位元組。然而，一些擴展標頭在此版本中被視為酬載的一部分。

## 6.5 資料連結層
TCP/IP 套件在**資料連結層**中沒有定義任何協定。這一層是網路的領域，這些網路連接起來構成了網際網路。這些網路，無論是有線還是無線，都接收服務並向網路層提供服務。這可能給我們一個線索，即今天市場上有幾種標準協定。
在上一節中，我們了解到網路層的通訊是主機對主機的。然而，網際網路是由連接設備（路由器或交換器）黏合在一起的網路組合。如果資料包要從一台主機傳輸到另一台主機，它需要通過這些網路。
資料連結層的通訊由路徑中資料連結層之間的分離邏輯連接組成。只有一個資料連結層參與來源或目的地，但每個路由器涉及兩個資料連結層。原因是來源和目的電腦各連接到單一網路；然而，每個路由器從一個網路接收輸入並向另一個網路發送輸出。

### 6.5.1 節點與連結
雖然應用層、傳輸層和網路層的通訊是端對端的，但資料連結層的通訊是**節點對節點**的。來自網際網路上一點的資料單元需要通過許多網路（LAN 和 WAN）才能到達另一點。這些 LAN 和 WAN 由路由器連接。習慣上將兩個終端主機和路由器稱為**節點**，將其間的網路稱為**連結**。連接節點的連結可以是區域網路 (LAN) 或廣域網路 (WAN)。

### 6.5.2 區域網路 (LAN)
在本章開頭，我們了解到區域網路 (LAN) 是為有限地理區域（如建築物或校園）設計的電腦網路。雖然 LAN 可以作為獨立網路連接組織中的電腦，僅用於共享資源，但今天大多數 LAN 也連接到廣域網路 (WAN) 或網際網路。
LAN 可以是有線或無線網路。在第一組中，LAN 中的工作站透過電線連接；在第二組中，工作站透過空氣邏輯連接。我們分別討論每一組。

**有線 LAN：乙太網路**
雖然過去發明了幾種有線 LAN，但只有一種倖存下來：乙太網路。也許原因是乙太網路根據網際網路社群的需求進行了多次升級。
乙太網路 LAN 由 Robert Metcalfe 和 David Boggs 於 1970 年代開發。從那時起，它經歷了四代：**標準乙太網路** (10 Mbps)、**快速乙太網路** (100 Mbps)、**十億位元乙太網路** (1 Gbps) 和 **10 十億位元乙太網路** (10 Gbps)。資料速率，即每秒發送位元的速度，在每一代中都增加了十倍。

**標準乙太網路**
我們將資料速率為 10 Mbps（每秒一千萬位元）的原始乙太網路技術稱為標準乙太網路。在這種情況下，資料速率定義了資料從工作站發送到 LAN 的速度。在乙太網路的情況下，速度是每秒 1000 萬位元。然而，位元不是一個接一個地發送的，一組位元被打包在一起，稱為**訊框**。訊框不僅攜帶從發送者到接收者的資料。它還攜帶一些資訊，如來源位址（48 位元）、目的位址（48 位元）、資料類型、實際資料以及一些其他控制位元作為保護，以幫助檢查轉換過程中的資料完整性。如果我們可以將訊框視為攜帶信件從發送者到接收者的信封，資料在信封內，但信封上還有其他資訊，如位址。在 LAN 的情況下，所有這些都封裝在一個訊框中。

**快速乙太網路 (100 Mbps)**
在 1990 年代，乙太網路透過將**傳輸速率**提高到 100 Mbps 做出了巨大的飛躍，新一代被稱為快速乙太網路。快速乙太網路的設計者需要使其與標準乙太網路相容。大多協定如定址、訊框格式保持不變。透過提高傳輸速率，必須修改依賴傳輸速率的標準乙太網路功能。

**十億位元乙太網路**
對更高資料速率的需求導致了**十億位元乙太網路協定** (1000 Mbps) 的設計。十億位元乙太網路的目標是將資料速率升級到 1 Gbps，但保持位址長度、訊框格式以及最大和最小訊框長度不變。

**10 十億位元乙太網路**
近年來，人們重新審視乙太網路在都會區的使用。這個想法是擴展技術、資料速率和覆蓋距離，以便乙太網路可以用作 LAN 和 MAN（**都會區域網路**）。10 十億位元乙太網路設計的目標可以概括為將資料速率升級到 10 Gbps，保持相同的訊框大小和格式，並允許 LAN、MAN 和 WAN 的互連成為可能。目前只有光纖技術才能實現此資料速率。

**無線 LAN**
無線通訊是增長最快的技術之一。在不使用電纜的情況下連接設備的需求隨處可見。無線 LAN 可以在大學校園、辦公樓和許多公共區域找到。我們可以看到有線和無線 LAN 之間的第一個區別是介質。在有線 LAN 中，我們使用電線連接主機。在無線 LAN 中，介質是空氣，信號通常是廣播的。當無線 LAN 中的主機相互通訊時，它們共享相同的介質（多重存取）。兩種技術在該領域發揮了重要作用：無線乙太網路和藍牙。

**無線乙太網路 (WiFi)**
電機電子工程師學會 (IEEE) 定義了無線 LAN 的規格，有時稱為無線乙太網路或 **WiFi**（無線保真的縮寫）。然而，WiFi 是由 WiFi 聯盟認證的無線 LAN，WiFi 聯盟是一個由 300 多家成員公司組成的全球性非營利行業協會。該標準定義了兩種類型的服務：**基本服務集 (BSS)** 和 **擴展服務集 (ESS)**。第二種服務使用額外的設備（存取點或 AP）作為交換器連接到其他 LAN 或 WAN。

**藍牙**
**藍牙**是一種無線 LAN 技術，旨在短距離連接不同功能的設備，如電話、筆記型電腦、電腦（桌上型和筆記型）、相機、印表機，甚至咖啡機。藍牙 LAN 是一個*隨意 (ad hoc)* 網路，這意味著網路是自發形成的；這些設備，有時稱為*小工具*，彼此發現並形成一個稱為**微微網 (piconet)** 的網路。如果其中一個小工具具有此功能，藍牙 LAN 甚至可以連接到網際網路。就本質而言，藍牙 LAN 不能很大。如果有許多小工具試圖連接，就會出現混亂。
藍牙技術有許多應用。無線滑鼠或鍵盤等周邊設備可以透過此技術與電腦通訊。監控設備可以與小型醫療中心的感測器設備通訊。家庭安全設備可以使用此技術將不同的感測器連接到主安全控制器。會議參與者可以在會議上同步他們的筆記型電腦。
藍牙最初是愛立信公司的一個專案。它以丹麥國王哈拉爾·藍牙 (940–981) 的名字命名，他統一了丹麥和挪威。*Blaatand* 翻譯成英文就是 *Bluetooth*。

### 6.5.3 廣域網路 (WAN)
如前所述，連接網際網路中兩個節點的網路可以是 LAN 或 WAN。就像 LAN 的情況一樣，WAN 可以是有線或無線的。我們分別簡要討論每一種。

**有線 WAN**
今天的乙太網路中有各種有線 WAN。有些是點對點的，有些是交換式 WAN。

**點對點有線 WAN**
今天我們可以使用幾種點對點無線網路來提供所謂的*最後一哩*服務，將居民和企業連接到網際網路。

**撥接服務**
撥接網路或連接使用電話網路提供的服務來傳輸資料。電話網路起源於 1800 年代後期。整個網路最初是一個傳輸語音的系統。隨著電腦時代的到來，該網路在 1980 年代開始除了語音之外還傳輸資料。在過去十年中，電話網路經歷了許多技術變革。通訊數位資料的需求導致了撥接數據機的發明。
術語**數據機 (modem)** 是一個複合詞，指的是組成該設備的兩個功能實體：信號**調變器**和信號**解調器**。調變器從資料產生信號。解調器從調變信號中恢復資料。

**數位用戶迴路 (DSL)**
在傳統數據機達到其峰值資料速率後，電話公司開發了另一種技術 DSL，以提供更高速的網際網路存取。**數位用戶迴路 (DSL)** 技術是最有希望支援現有電話高速通訊的技術之一。DSL 技術是一組技術，每種技術的第一個字母不同（ADSL、VDSL、HDSL 和 SDSL）。該集合通常稱為 *xDSL*，其中 *x* 可以替換為 A、V、H 或 S。我們只討論第一個，ADSL。該集合中的第一個技術是**非對稱 DSL (ADSL)**。ADSL 在下行方向（從網際網路到居民）提供比上行方向（從居民到網際網路）更高的速度（**位元率**）。這就是它被稱為*非對稱*的原因。
ADSL 允許訂戶同時使用語音通道和資料通道。上行速率可達 1.44 Mbps。然而，由於此通道中的高電平雜訊，資料速率通常低於 500 kbps。下行資料速率可達 13.4 Mbps。然而，由於此通道中的雜訊，資料速率通常低於 8 Mbps。一個非常有趣的一點是，在這種情況下，電話公司充當 ISP，因此電子郵件或網際網路存取等服務由電話公司本身提供。

**有線電視網路**
有線電視網路最初是為了向那些因為自然障礙（如山脈）而無法接收信號的訂戶提供電視節目存取而創建的。後來，有線電視網路在只想要更好信號的人們中流行起來。此外，有線電視網路透過微波連接實現了對遠端廣播站的存取。有線電視還在網際網路存取提供方面發現了一個很好的市場，使用了一些最初為視訊設計的頻道。
有線電視公司現在正在與電話公司競爭想要高速資料傳輸的住宅客戶。DSL 技術透過本地迴路為住宅訂戶提供高資料速率連接。然而，DSL 使用現有的非遮蔽雙絞線電纜，非常容易受到干擾。這對資料速率施加了上限。解決方案是使用有線電視網路。

**交換式有線 WAN**
顯然，今天的網際網路不能僅靠提供最後一哩連接的點對點有線 WAN 運作。我們需要交換式有線 WAN 來連接網際網路的骨幹。過去已經為此目的設計了幾種協定，如 SONET 或 ATM。然而，這些是複雜的網路，其討論超出了本書的範圍。

**無線 WAN**
今天的網際網路服務區域如此之大，有時僅使用有線 WAN 無法向世界的每個角落提供服務。我們絕對需要無線 WAN。如下所述，已有多種技術用於此目的。

**WiMax**
**全球互通微波存取 (WiMax)** 是 DSL 或有線電視連接到網際網路的無線版本。它提供兩種類型的服務（固定 WiMax）將主站連接到固定站或移動站（如行動電話）。

**行動電話網路**
另一種今天的無線 WAN 是**行動電話**，它最初是為語音通訊設計的，但現在也用於網際網路通訊。我們都知道行動網路將地球劃分為蜂巢。移動站與它們每一刻所在的蜂巢中的固定天線通訊。當使用者移動到另一個蜂巢時，通訊是在移動設備和新天線之間進行的。

**衛星網路**
**衛星網路**是節點的組合，其中一些是衛星，提供從地球上一點到另一點的通訊。網路中的節點可以是衛星、地面站或終端使用者終端或電話。
衛星網路像行動網路一樣，將地球劃分為蜂巢。衛星可以提供往返地球上任何位置的傳輸能力，無論多麼偏遠。這一優勢使得高品質的通訊可以用於世界欠發達地區，而無需在地面基礎設施上進行巨額投資。

## 6.6 實體層
如果不討論實體層，我們對 TCP/IP 協定套件的討論將是不完整的。實體層的作用是傳輸從資料連結層接收到的位元，並將其轉換為電磁信號進行傳輸。在位元轉換為信號後，信號被傳遞到傳輸介質，這是我們在下一節討論的主題。

### 6.6.1 資料與信號
在實體層，通訊是節點對節點的，但節點交換電磁信號。
實體層的主要功能之一是在節點之間路由位元。然而，位元作為儲存在節點（主機、路由器或交換器）記憶體中的兩個可能值的表示，不能直接發送到傳輸介質（電線或空氣）；位元需要在傳輸前更改為信號。所以實體層的主要職責是有效地將這些位元轉換為電磁信號。我們首先需要了解資料的性質，然後了解信號的類型，看看我們如何有效地進行這種轉換。

**類比與數位**
資料可以是類比或數位的。術語**類比資料**是指連續的資訊。類比資料，如人聲發出的聲音，具有連續的值。當有人說話時，空氣中會產生類比波。這可以被麥克風捕獲並轉換為類比信號，或取樣並轉換為數位信號。
**數位資料**採用離散值。例如，資料以 0 和 1 的形式儲存在電腦記憶體中。它們可以轉換為數位信號或調變為類比信號以在介質上傳輸。
像它們所代表的資料一樣，信號可以是類比或數位的。**類比信號**在一段時間內具有無限多個強度等級。隨著波從值 A 移動到值 B，它通過並包括其路徑上的無限多個值。另一方面，**數位信號**只能具有有限數量的定義值。雖然每個值可以是任何數字，但通常簡單如 1 和 0。顯示信號最簡單的方法是在一對垂直軸上繪製它們。垂直軸代表信號的值或強度。水平軸代表時間。

### 6.6.2 數位傳輸
電腦網路旨在將資訊從一點發送到另一點。此資訊需要轉換為數位信號或類比信號進行傳輸。如果資料是數位的，我們需要使用**數位對數位轉換**技術，即將數位資料轉換為數位信號的方法。如果資料是類比的，我們需要使用**類比對數位轉換**技術，即將類比信號更改為數位信號的方法。

**數位對數位轉換**
如果我們的資料是數位的，並且我們需要傳輸數位信號，我們可以使用數位對數位轉換將數位資料更改為數位信號。雖然有許多技術可以做到這一點，但以最簡單的形式，一個位元或一組位元由一個信號電平表示。

**類比對數位轉換**
有時我們有類比信號，例如由麥克風或相機產生的信號。今天的趨勢是將類比信號更改為數位資料，因為數位信號較不容易受到雜訊的影響。雖然有幾種技術可以做到這一點，但最簡單的一種是對類比信號進行取樣以創建數位資料，並將數位資料轉換為數位信號，如前所述。

### 6.6.3 類比傳輸
雖然數位傳輸是可取的，但它需要專用通道；如果我們沒有專用通道，類比傳輸是唯一的選擇。例如，如果我們在空氣中廣播，空氣屬於每個人，所以我們只能使用可用通道的一部分。根據可用的資料類型，我們可以使用數位對類比或類比對類比轉換。

**數位對類比轉換**
**數位對類比轉換**是根據數位資料中的資訊更改類比信號特徵之一的過程。

**類比對類比轉換**
**類比對類比轉換**是根據數位資料中的資訊更改類比信號特徵之一的過程。

## 6.7 傳輸介質
在實體層產生的電信號需要傳輸介質才能從一點到另一點。傳輸介質實際上位於實體層之下，並由實體層直接控制。我們可以說傳輸介質屬於第零層。
**傳輸介質**可以廣義地定義為任何可以將資訊從來源攜帶到目的地的東西。例如，兩個人共進晚餐交談的傳輸介質是空氣。空氣也可以用來傳遞煙霧信號或旗語中的訊息。對於書面訊息，傳輸介質可能是郵遞員、卡車或飛機。
在電信中，傳輸介質可分為兩大類：導引和非導引。導引介質包括雙絞線、同軸電纜和光纖電纜。非導引介質是自由空間。

### 6.7.1 導引介質
**導引介質**提供從一個設備到另一個設備的管道，包括**雙絞線**、**同軸電纜**和**光纖電纜**。

**雙絞線**
雙絞線由兩根導線（通常是銅）組成，每根都有自己的塑膠絕緣層，絞合在一起。其中一根導線用於將信號傳送到接收器，另一根僅用作接地參考。接收器使用兩者之間的差異。
除了來自發送者的信號外，干擾（雜訊）可能會影響兩根導線並產生不需要的信號。如果兩根導線平行，這些不需要的信號在兩根導線中的影響是不一樣的，因為它們相對於雜訊源的位置不同。透過絞合線對，可以保持平衡。
電話公司用來提供高資料速率連接的 DSL 線路也是雙絞線電纜。

**同軸電纜**
同軸電纜不是有兩根導線，而是有一個實心或絞合線（通常是銅）的中心核心導體，封閉在絕緣護套中，該護套又被金屬箔、編織物或兩者組合的外部導體包圍。外部金屬包裹既作為防雜訊屏蔽，又作為完成電路的第二導體。這個外部導體也被封閉在絕緣護套中，整條電纜由塑膠蓋保護。
有線電視網路使用同軸電纜。在傳統的有線電視網路中，整個網路都使用同軸電纜。然而，後來有線電視提供商用光纖電纜替換了大部分介質；混合網路僅在網路邊界，即消費者處所附近使用同軸電纜。

**光纖電纜**
光纖電纜由玻璃或塑膠製成，以光的形式傳輸信號。這項技術利用了光束在遇到密度較低的介質時折射（返回）的特性。用另一種密度較低的介質（稱為包層）覆蓋玻璃或塑膠介質可以引導光通過介質。
光纖電纜經常在骨幹網路中發現，因為其高頻寬具有成本效益。

### 6.7.2 非導引介質：無線
非導引介質在不使用實體導體的情況下傳輸電磁波。這種類型的通訊通常稱為**無線通訊**。信號通常透過自由空間廣播，因此任何擁有能夠接收它們的設備的人都可以使用。
今天的通訊使用三種不同範圍的電磁頻譜：無線電波、微波和紅外線。

**無線電波**
頻率在 3 kHz 到 1 GHz 之間的電磁波通常稱為**無線電波**。它們主要用於無線電通訊。

**微波**
頻率在 1 到 300 GHz 之間的電磁波稱為**微波**。微波是單向的。當天線發射微波時，它們可以被窄聚焦。這意味著發送和接收天線需要對齊。單向特性具有明顯的優勢。一對天線可以對齊而不干擾另一對對齊的天線。

**紅外線**
**紅外線**，頻率從 300 GHz 到 400 THz（波長從 1 毫米到 770 奈米），可用於短距離通訊。具有高頻率的紅外線無法穿透牆壁。這個有利的特性防止了一個系統與另一個系統之間的干擾；一個房間內的短距離通訊系統不會受到隔壁房間另一個系統的影響。當我們使用紅外線遙控器時，我們不會干擾鄰居對遙控器的使用。然而，同樣的特性使得紅外信號無法用於長距離通訊。此外，我們不能在建築物外使用紅外線，因為太陽光包含會干擾通訊的紅外線。

## 6.8 章末材料
### 6.8.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Forouzan, B. and Mosharrf, F. *Computer Networks: A Top-Down Approach*, New York: McGraw-Hill Education, 2012
- Forouzan, B. *Data Communication and Networking*, New York: McGraw-Hill Education, 2013
- Forouzan, B. *TCP/IP Protocol Suite*, New York: McGraw-Hill Education, 2010
- Forouzan, B. *Local Area Networks*, New York: McGraw-Hill Education, 2003
- Kurose, J. and Ross, K. *Computer Networking*, Reading, MA: Addison-Wesley, 2007

### 6.8.2 關鍵詞
- 10 十億位元乙太網路
- 類比對類比轉換
- 類比對數位轉換
- 類比資料
- 類比信號
- 應用層
- 位元率
- 藍牙
- 行動電話
- 密文
- 主從式範式
- 同軸電纜
- 連接設備
- 無連接協定
- 國家網域
- 解調器
- 數位對類比轉換
- 數位對數位轉換
- 數位資料
- 數位信號
- 數位用戶迴路 (DSL)
- 網域名稱
- 網域名稱系統 (DNS)
- 網域名稱空間
- 點分十進位表示法
- 電子郵件 (email)
- 終端系統
- 臨時埠號
- 快速乙太網路
- 光纖電纜
- 檔案傳輸協定 (FTP)
- 訊框
- 通用網域
- 十億位元乙太網路
- 導引介質
- 硬體
- 標頭
- 主機
- 主機標識符
- 超文本
- 超文本標記語言 (HTML)
- 超文本傳輸協定 (HTTP)
- 紅外線
- 互連網 (internet)
- 網際網路 (Internet)
- 網際網路位址
- 網際網路協定
- 網際網路協定第六版 (IPv6)
- 網際網路服務提供者 (ISP)
- 互連網 (Internetwork)
- IP 位址
- IP 資料包
- IP 新一代 (IPng)
- 連結
- 區域網路 (LAN)
- 訊息存取代理 (MAA)
- 郵件傳輸代理 (MTA)
- 都會區域網路 (MAN)
- 數據機
- 模組化
- 調變器
- 模組
- 名稱空間
- 網路層
- 節點
- 封包化
- 點對點 (P2P) 範式
- 實體層
- 埠號
- 協定
- 協定分層
- 遠端登入
- 路由器
- 安全殼層 (SHH)
- 區段
- 軟體
- 來源到目的地傳遞
- 標準乙太網路
- 交換器
- 交換式 WAN
- TCP/IP 協定套件
- TELNET (終端網路)
- 傳輸控制協定 (TCP)
- 傳輸介質
- 傳輸速率
- 雙絞線電纜
- 非導引介質
- 統一資源定位器 (URL)
- 使用者代理 (UA)
- 使用者資料包
- 使用者資料包協定 (UDP)
- 網頁
- 熟知埠號
- 廣域網路 (WAN)
- 全球互通微波存取 (WiMAX)
- 全球資訊網 (WWW)
- 一次寫入，多次讀取 (WORM)

### 6.8.3 摘要
- 網路是一組由通訊連結連接的設備。今天當我們談論網路時，我們通常指的是兩個主要類別：區域網路和廣域網路。今天的網際網路是由許多廣域和區域網路透過連接設備和交換站連接而成的。協定是一組管理通訊的規則。TCP/IP 是一個由五層組成的分層協定套件：應用層、傳輸層、網路層、資料連結層和實體層。
- 網際網路中的應用程式使用主從式範式或點對點範式設計。全球資訊網 (WWW) 是一個資訊儲存庫，從世界各地連結在一起。超文本傳輸協定 (HTTP) 是用於存取全球資訊網 (WWW) 上資料的主要協定。檔案傳輸協定 (FTP) 是一個 TCP/IP 主從式應用程式，用於將檔案從一台主機複製到另一台主機。電子郵件是網際網路上最常見的應用程式之一。TELNET 是一個主從式應用程式，允許使用者登入遠端機器，讓使用者存取遠端系統。網域名稱系統 (DNS) 是一個主從式應用程式，用唯一的名稱識別網際網路上的每台主機。
- 傳輸層協定的主要職責是提供行程對行程通訊。UDP 是一種提供不可靠和無連接服務的傳輸協定。傳輸控制協定 (TCP) 是另一種傳輸層協定，提供可靠和連線導向的服務。
- 網路層監督底層實體網路對封包的處理。IPv4 是一種不可靠的無連接協定，負責來源到目的地的傳遞。TCP/IP 協定套件的 IP 層中使用的標識符稱為 IP 位址。IPv4 位址長 32 位元。IPv6 是網際網路協定的最新版本，具有 128 位元的位址空間。
- 資料連結層涉及區域網路 (LAN) 和廣域網路 (WAN)。LAN 和 WAN 可以是有線或無線的。乙太網路是使用最廣泛的有線區域網路協定。撥接服務、DSL 和電纜主要用於點對點有線 WAN。無線 LAN 透過無線乙太網路正式化。藍牙是一種無線 LAN 技術，連接小區域內的設備（稱為小工具）。WiMAX 是一種無線存取網路，將來可能會取代 DSL 和電纜。
- 資料必須轉換為電磁信號才能傳輸。類比資料是連續的並取連續值。數位資料具有離散狀態並取離散值。數位對數位轉換將數位資料更改為數位信號。數位對類比轉換是將數位資料更改為類比信號的過程。類比對數位轉換是對類比資料進行取樣並將其更改為數位信號的過程。類比對類比信號意味著將類比資料更改為類比信號。
- 傳輸介質位於實體層之下。導引介質提供從一個設備到另一個設備的實體管道。雙絞線、同軸電纜和光纖是最流行的導引介質類型。非導引介質（自由空間）在不使用實體導體的情況下傳輸電磁波。
`
};
