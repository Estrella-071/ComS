

export const chapter5Content = {
  en: `
# Chapter 5: Computer Organization

In this chapter we discuss the organization of a stand-alone computer. We explain how every computer is made up of three subsystems. We also show how a simple, hypothetical computer can run a simple program to perform primitive arithmetic or logic operations.

## Objectives
After studying this chapter, the student should be able to:
- List the three subsystems of a computer.
- Describe the role of the central processing unit (CPU) in a computer.
- Describe the fetch–decode–execute phases of a cycle in a typical computer.
- Describe the main memory and its addressing space.
- Distinguish between main memory and cache memory.
- Define the input/output subsystem.
- Understand the interconnection of subsystems and list different bus systems.
- Describe different methods of input/output addressing.
- Distinguish the two major trends in the design of computer architecture.
- Understand how computer throughput can be improved using pipelining.
- Understand how parallel processing can improve the throughput of computers.

## 5.1 INTRODUCTION
We can divide the parts that make up a computer into three broad categories or subsystems: the **central processing unit (CPU)**, the **main memory**, and the **input/output subsystem**. The next three sections discuss these subsystems and how they are connected to make a standalone computer. Figure 5.1 shows the three subsystems of a standalone computer.

## 5.2 CENTRAL PROCESSING UNIT
The **central processing unit (CPU)** performs operations on data. In most architectures it has three parts: an **arithmetic logic unit (ALU)**, a **control unit**, and a set of **registers** (Figure 5.2).

### 5.2.1 The arithmetic logic unit (ALU)
The **arithmetic logic unit (ALU)** performs logic, shift, and arithmetic operations on data.

**Logic operations**
We discussed several logic operations, such as NOT, AND, OR, and XOR, in Chapter 4. These operations treat the input data as bit patterns and the result of the operation is also a bit pattern.

**Shift operations**
We discussed two groups of shift operations on data in Chapter 4: logical shift operations and arithmetic shift operations. Logical shift operations are used to shift bit patterns to the left or right, while arithmetic operations are applied to integers. Their main purpose is to divide or multiply integers by two.

**Arithmetic operation**
We discussed some arithmetic operations on integers and reals on Chapter 4. We mentioned that some operations can be implemented more efficiently in hardware.

### 5.2.2 Registers
**Registers** are fast stand-alone storage locations that hold data temporarily. Multiple registers are needed to facilitate the operation of the CPU. Some of these registers are shown in Figure 5.2.

**Data registers**
In the past computers had only a few data registers to hold the input data and the result of the operations. Today, computers use dozens of registers inside the CPU to speed up their operations, because complex operations are done using hardware instead of software. These require several registers to hold the intermediate results. Data registers are named $R_0$ to $R_n$ in Figure 5.2.

**Instruction registers**
Today computers store not only data, but also programs, in their memory. The CPU is responsible for fetching instructions one by one from memory, storing them in the **instruction register (IR)** (in Figure 5.2), decoding them, and executing them. We will discuss this issue later in the chapter.

**Program counter**
Another common register in the CPU is the **program counter (PC)** (in Figure 5.2). The program counter keeps track of the instruction currently being executed. After execution of the instruction, the counter is incremented to point to the address of the next instruction in memory.

### 5.2.3 The control unit
The third part of any CPU is the control unit. The **control unit** controls the operation of each subsystem. Controlling is achieved through signals sent from the control unit to other subsystems.

## 5.3 MAIN MEMORY
**Main memory** is the second major subsystem in a computer (Figure 5.3). It consists of a collection of storage locations, each with a unique identifier, called an **address**. Data is transferred to and from memory in groups of bits called **words**. A word can be a group of 8 bits, 16 bits, 32 bits, or 64 bits (and growing). If the word is 8 bits, it is referred to as a **byte**. The term ‘byte’ is so common in computer science that sometimes a 16-bit word is referred to as a 2-byte word, or a 32-bit word is referred to as a 4-byte word.

### 5.3.1 Address space
To access a word in memory requires an identifier. Although programmers use a name to identify a word (or a collection of words), at the hardware level each word is identified by an address. The total number of uniquely identifiable locations in memory is called the **address space**. For example, a memory with 64 kilobytes and a word size of 1 byte has an address space that ranges from 0 to 65535.

Table 5.1 shows the units used to refer to memory. Note that the terminology is misleading: it approximates the number of bytes in powers of 10, but the actual number of bytes is in powers of 2. Units in powers of 2 facilitates addressing.

**Table 5.1 Memory units**

| Unit | Exact Number of Bytes | Approximation |
| :--- | :--- | :--- |
| kilobyte | $2^{10}$ (1024) bytes | $10^3$ bytes |
| megabyte | $2^{20}$ (1048576) bytes | $10^6$ bytes |
| gigabyte | $2^{30}$ (1073741824) bytes | $10^9$ bytes |
| terabyte | $2^{40}$ bytes | $10^{12}$ bytes |

**Addresses as bit patterns**
Because computers operate by storing numbers as bit patterns, a memory address is also represented as a bit pattern. So if a computer has 64 kilobytes ($2^{16}$) of memory with a word size of 1 byte, we need a bit pattern of 16 bits to define an address. Recall from Chapter 3 that addresses can be represented as unsigned integers (we do not have negative addresses). In other words, the first location is referred to as address 0000000000000000 (address 0), and the last location is referred to as address 1111111111111111 (address 65535). In general, if a computer has $N$ words of memory, we need an unsigned integer of size $\\log_2 N$ bits to refer to each memory location.

**Memory addresses are defined using unsigned binary integers.**

> **Example 5.1**
> A computer has 32 MB (megabytes) of memory. How many bits are needed to address any single byte in memory?
>
> **Solution**
> The memory address space is 32 MB, or $2^{25}$ ($2^5 \\times 2^{20}$). This means that we need $\\log_2 2^{25}$, or 25 bits, to address each byte.

> **Example 5.2**
> A computer has 128 MB of memory. Each word in this computer is eight bytes. How many bits are needed to address any single word in memory?
>
> **Solution**
> The memory address space is 128 MB, which means $2^{27}$. However, each word is eight ($2^3$) bytes, which means that we have $2^{24}$ words. This means that we need $\\log_2 2^{24}$, or 24 bits, to address each word.

### 5.3.2 Memory types
Two main types of memory exist: RAM and ROM.

**RAM**
**Random access memory (RAM)** makes up most of the main memory in a computer. In a random access device, a data item can be accessed randomly—using the address of the memory location—without the need to access all data items located before it. However, the term is confusing, because ROM can also be accessed randomly. What distinguishes RAM from ROM is that RAM can be read from and written to. The CPU can write something to RAM and later overwrite it. Another characteristic of RAM is that it is **volatile**: the information (program or data) is lost if the computer is powered down. In other words, all information in RAM is erased if you turn off the computer or if there is a power outage. RAM technology is divided into two broad categories: SRAM and DRAM.

**SRAM**
**Static RAM (SRAM)** technology uses traditional flip-flop gates (see Appendix E) to hold data. The gates hold their state (0 or 1), which means that data is stored as long as the power is on and there is no need to refresh memory locations. SRAM is fast but expensive.

**DRAM**
**Dynamic RAM (DRAM)** technology uses capacitors, electrical devices that can store energy, for data storage. If a capacitor is charged, the state is 1; if it is discharged, the state is 0. Because a capacitor loses some of its charge with time, DRAM memory cells need to be refreshed periodically. DRAMs are slow but inexpensive.

**ROM**
The contents of **read-only memory (ROM)** are written by the manufacturer, and the CPU can read from, but not write to, ROM. Its advantage is that it is **nonvolatile**—its contents are not lost if you turn off the computer. Normally, it is used for programs or data that must not be erased or changed even if you turn off the computer. For example, some computers come with ROM that holds the boot program that runs when we switch on the computer.

**PROM**
One variation of ROM is **programmable read-only memory (PROM)**. This type of memory is blank when the computer is shipped. The user of the computer, with some special equipment, can store programs on it. When programs are stored, it behaves like ROM and cannot be overwritten. This allows a computer user to store specific programs in PROM.

**EPROM**
A variation of PROM is **erasable programmable read-only memory (EPROM)**. It can be programmed by the user, but can also be erased with a special device that applies ultraviolet light. To erase EPROM memory requires physical removal and reinstallation of the EPROM.

**EEPROM**
A variation of EPROM is **electrically erasable programmable read-only memory (EEPROM)**. EEPROM can be programmed and erased using electronic impulses without being removed from the computer.

### 5.3.3 Memory hierarchy
Computer users need a lot of memory, especially memory that is very fast and inexpensive. This demand is not always possible to satisfy—very fast memory is usually not cheap. A compromise needs to be made. The solution is hierarchical levels of memory (Figure 5.4). The hierarchy is based on the following:
- Use a very small amount of costly high-speed memory where speed is crucial. The registers inside the CPU are of this type.
- Use a moderate amount of medium-speed memory to store data that is accessed often. Cache memory, discussed next, is of this type.
- Use a large amount of low-speed memory for data that is accessed less often. Main memory is of this type.

### 5.3.4 Cache memory
**Cache memory** is faster than main memory but slower than the CPU and its registers. Cache memory, which is normally small in size, is placed between the CPU and main memory (Figure 5.5).

Cache memory at any time contains a copy of a portion of main memory. When the CPU needs to access a word in main memory, it follows this procedure:
1.  The CPU checks the cache.
2.  If the word is there, it copies the word: if not, the CPU accesses main memory and copies a block of memory starting with the desired word. This block replaces the previous contents of cache memory.
3.  The CPU accesses the cache and copies the word.

This procedure can expedite operations; if the word is in the cache, it is accessed immediately. If the word is not in the cache, the word and a whole block are copied to the cache. Since it is probable that the CPU, in its next cycle, will need to access the words following the first word, the existence of the cache speeds processing.

We might wonder why cache memory is so efficient despite its small size. The answer lies in the ‘80–20 rule’. It has been observed that most computers typically spend 80 per cent of their time accessing only 20 per cent of the data. In other words, the same data is accessed over and over again. Cache memory, with its high speed, can hold this 20 per cent to make access faster at least 80 per cent of the time.

## 5.4 INPUT/OUTPUT SUBSYSTEM
The third major subsystem in a computer is the collection of devices referred to as the **input/output (I/O) subsystem**. This subsystem allows a computer to communicate with the outside world, and to store programs and data even when the power is off. Input/output devices can be divided into two broad categories: nonstorage and storage devices.

### 5.4.1 Nonstorage devices
**Nonstorage devices** allow the CPU/memory to communicate with the outside world, but they cannot store information.

**Keyboard and monitor**
Two of the more common nonstorage input/output devices are the **keyboard** and the **monitor**. The keyboard provides input, the monitor displays output and at the same time echoes input typed on the keyboard. Programs, commands, and data are input or output using strings of characters. The characters are encoded using a code such as ASCII (see Appendix A). Other devices that fall in this category are mice, joysticks, and so on.

**Printer**
A **printer** is an **output device** that creates a permanent record. A printer is a nonstorage device because the printed material cannot be directly entered into a computer again unless someone retypes or scans it.

### 5.4.2 Storage devices
**Storage devices**, although classified as I/O devices, can store large amounts of information to be retrieved at a later time. They are cheaper than main memory, and their contents are nonvolatile—that is, not erased when the power is turned off. They are sometimes referred to as **auxiliary storage devices**. We can categorize them as either magnetic or optical.

**Magnetic storage devices**
Magnetic storage devices use magnetization to store bits of data. If a location is magnetized, it represents 1, if not magnetized, it represents 0.

**Magnetic disks**
A **magnetic disk** consists of one or more disks stacked on top of each other. The disks are coated with a thin magnetic film. Information is stored on and retrieved from the surface of the disk using a **read/write head** for each magnetized surface of the disk. Figure 5.6 shows the physical layout of a magnetic disk drive and the organization of a disk.
- **Surface organization.** To organize data stored on the disk, each surface is divided into **tracks**, and each track is divided into **sectors** (Figure 5.6). The tracks are separated by an **intertrack gap**, and the sectors are separated by an **intersector gap**.
- **Data access.** A magnetic disk is considered a random access device. In a random access device, a data item can be accessed randomly without the need to access all other data items located before it. However, the smallest storage area that can be accessed at one time is a sector. A block of data can be stored in one or more sectors and retrieved without the need to retrieve the rest of the information on the disk.
- **Performance.** The performance of a disk depends on several factors, the most important being the rotational speed, the seek time, and the transfer time. The **rotational speed** defines how fast the disk is spinning. The **seek time** defines the time to move the read/write head to the desired track where the data is stored. The **transfer time** defines the time to move data from the disk to the CPU/memory.

**Magnetic tape**
**Magnetic tape** comes in various sizes. One common type is half-inch plastic tape coated with a thick magnetic film. The tape is mounted on two reels and uses a read/write head that reads or writes information when the tape is passed through it. Figure 5.7 shows the mechanical configuration of a magnetic tape drive.
- **Surface organization.** The width of the tape is divided into nine tracks, each location on a track storing 1 bit of information. Nine vertical locations can store 8 bits of information related to a byte plus a bit for error detection (Figure 5.7).
- **Data access.** A magnetic tape is considered a sequential access device. Although the surface may be divided into blocks, there is no addressing mechanism to access each block. To retrieve a specific block on the tape, we need to pass through all the previous blocks.
- **Performance.** Although magnetic tape is slower than a magnetic disk, it is cheaper. Today, people use magnetic tape to back up large amounts of data.

**Optical storage devices**
**Optical storage devices**, a relatively recent technology, use laser light to store and retrieve data. The use of optical storage technology followed the invention of the **compact disk (CD)** used to store audio information. Today, the same technology—slightly improved—is used to store information in a computer. Devices that use this technology include CD-ROMs, CD-Rs, CD-RWs, and DVDs.

**CD-ROMs**
**Compact disk read-only memory (CD-ROM)** disks use the same technology as the audio CD, originally developed by Phillips and Sony for recording music. The only difference between these two technologies is enhancement: a CD-ROM drive is more robust and checks for errors. Figure 5.8 shows the steps involved in creating and using a CD-ROM.
- **Creation.** CD-ROM technology uses three steps to create a large number of discs:
  a. A **master disk** is created using a high-power infrared laser that creates bit patterns on coated plastic. The laser translates the bit patterns into a sequence of **pits** (holes) and **lands** (no holes). The pits usually represent 0s and the lands usually represent 1s. However, this is only a convention, and it can be reversed. Other schemes use a transition (pit to land or land to pit) to represent 1, and a lack of transition to represent 0.
  b. From the master disk, a mold is made. In the mold, the pits (holes) are replaced by bumps.
  c. Molten **polycarbonate resin** is injected into the mold to produce the same pits as the master disk. A very thin layer of aluminum is added to the polycarbonate to provide a reflective surface. On top of this, a protective layer of lacquer is applied and a label is added. Only this last step needs to be repeated for each disk.
- **Reading.** The CD-ROM is read using a low-power laser beam. The beam is reflected by the aluminum surface when passing through a land. It is reflected twice when it encounters a pit, once by the pit boundary and once by the aluminum boundary. The two reflections have a destructive effect, because the depth of the pit is chosen to be exactly one-fourth of the beam wavelength. In other words, the sensor installed in the drive detects more light when the location is a land and less light when the location is a pit, so can read what was recorded on the original master disk and copied to the CD-ROM.
- **Format.** CD-ROM technology uses a different format than magnetic disk (Figure 5.9). The format of data on a CD-ROM is based on:
  a. A block of 8-bit data transformed into a 14-bit symbol using an error-correction method called Hamming code.
  b. A frame made up from 42 symbols (14 bits/symbol).
  c. A sector made up from 98 frames (2352 bytes).
- **Speed.** CD-ROM drives come in different speeds. Single speed is referred to as 1x, double speed 2x, and so on. If the drive is single speed, it can read up to 153 600 bytes per second. Table 5.2 shows the speeds and their corresponding data rates.

**Table 5.2 CD-ROM speeds**
| Speed | Data rate | Approximation |
|---|---|---|
| 1x | 153600 bytes per second | 150 KB/s |
| 2x | 307200 bytes per second | 300 KB/s |
| 4x | 614400 bytes per second | 600 KB/s |
| 6x | 921600 bytes per second | 900 KB/s |
| 8x | 1228800 bytes per second | 1.2 MB/s |
| 12x | 1843200 bytes per second | 1.8 MB/s |
| 16x | 2457600 bytes per second | 2.4 MB/s |
| 24x | 3688400 bytes per second | 3.6 MB/s |
| 32x | 4915200 bytes per second | 4.8 MB/s |
| 40x | 6144000 bytes per second | 6 MB/s |

- **Application.** The expense involved in creating a master disk, mold, and the actual disk can be justified if there are a large number of potential customers. In other words, this technology is economical if the discs are mass produced.

**CD-R**
Clearly, CD-ROM technology is justifiable only if the manufacturer can create a large number of disks. On the other hand, the **compact disk recordable (CD-R)** format allows users to create one or more disks without going through the expense involved in creating CD-ROMs. It is particularly useful for making backups. You can write once to CD-R disks, but they can be read many times. This is why the format is sometimes called **write once, read many (WORM)**.
- **Creation.** CD-R technology uses the same principles as CD-ROM to create a disk (Figure 5.10). The following lists the differences:
  a. There is no master disk or mold.
  b. The reflective layer is made of gold instead of aluminum.
  c. There are no physical pits (holes) in the polycarbonate: the pits and lands are only simulated. To simulate pits and lands, an extra layer of dye, similar to the material used in photography, is added between the reflective layer and the polycarbonate.
  d. A high-power laser beam, created by the CD burner of the drive, makes a dark spot in the dye, changing its chemical composition, which simulates a pit. The areas not struck by the beam become lands.
- **Reading.** CD-Rs can be read by a CD-ROM or a CD-R drive. This means that any differences should be transparent to the drive. The same low-power laser beam passes in front of the simulated pits and lands. For a land, the beam reaches the reflective layer and is reflected. For a simulated pit, the spot is opaque, so the beam cannot be reflected back.
- **Format and speed.** The format, capacity, and speed of CD-Rs are the same as CD-ROMs.
- **Application.** This technology is very attractive for the creation and distribution of a small number of disks. It is also very useful for making archive files and backups.

**CD-RW**
Although CD-Rs have become very popular, they can be written to only once. To overwrite previous materials, a new technology allows a new type of disk called **compact disk rewritable (CD-RW)**. It is sometimes called an *erasable optical disk*.
- **Creation.** CD-RW technology uses the same principles as CD-R to create the disk (Figure 5.11). The following lists the differences:
  a. Instead of dye, the technology uses an alloy of silver, indium, antimony, and tellurium. This alloy has two stable states: crystalline (transparent) and amorphous (nontransparent).
  b. The drive uses high-power lasers to create simulated pits in the alloy (changing it from crystalline to amorphous).
- **Reading.** The drive uses the same type of low-power laser beam as CD-ROM and CD-R to detect pits and lands.
- **Erasing.** The drive uses a medium-power laser beam to change pits to lands. The beam changes a location from the amorphous state to the crystalline state.
- **Format and speed.** The format, capacity, and speed of CD-RWs are the same as CD-ROMs.
- **Application.** The technology is definitely more attractive than CD-R technology. However, CD-Rs are more popular for two reasons. First, blank CD-R discs are less expensive than blank CD-RW discs. Second, CD-Rs are preferable in cases where the created disk must not be changed, either accidentally or intentionally.

**DVD**
The industry has felt the need for digital storage media with even higher capacity. The capacity of a CD-ROM (650 MB) is insufficient to store video information. The latest optical memory storage device on the market is called a **digital versatile disk (DVD)**. It uses a technology similar to CD-ROM, but with the following differences:
a. The pits are smaller: 0.4 microns in diameter instead of the 0.8 microns used in CDs.
b. The tracks are closer to each other.
c. The beam is a red laser instead of infrared.
d. DVDs use one to two recording layers, and can be single-sided or double-sided.
- **Capacity.** These improvements result in higher capacities (Table 5.3).

**Table 5.3 DVD capacities**
| Feature | Capacity |
|---|---|
| Single-sided, single-layer | 4.7 GB |
| Single-sided, dual-layer | 8.5 GB |
| Double-sided, single-layer | 9.4 GB |
| Double-sided, dual-layer | 17 GB |

- **Compression.** DVD technology uses MPEG (see Chapter 15) for compression. This means that a single-sided, single-layer DVD can hold 133 minutes of video at high resolution. This also includes both audio and subtitles.
- **Application.** Today, the high capacity of DVDs attracts many applications that need to store a high volume of data.

## 5.5 SUBSYSTEM INTERCONNECTION
The previous sections outlined the characteristics of the three subsystems (CPU, main memory, and I/O) in a stand-alone computer. In this section, we explore how these three subsystems are interconnected. The interconnection plays an important role because information needs to be exchanged between the three subsystems.

### 5.5.1 Connecting CPU and memory
The CPU and memory are normally connected by three groups of connections, each called a **bus**: data bus, address bus, and control bus (Figure 5.12).

**Data bus**
The **data bus** is made of several connections, each carrying 1 bit at a time. The number of connections depends on the size of the word used by the computer. If the word is 32 bits (4 bytes), we need a data bus with 32 connections so that all 32 bits of a word can be transmitted at the same time.

**Address bus**
The **address bus** allows access to a particular word in memory. The number of connections in the address bus depends on the address space of the memory. If the memory has $2^n$ words, the address bus needs to carry $n$ bits at a time. Therefore, it must have $n$ connections.

**Control bus**
The **control bus** carries communication between the CPU and memory. For example, there must be a code, sent from the CPU to memory, to specify a read or write operation. The number of connections used in the control bus depends on the total number of control commands a computer needs. If a computer has $2^m$ control actions, we need $m$ connections for the control bus, because $m$ bits can define $2^m$ different operations.

### 5.5.2 Connecting I/O devices
I/O devices cannot be connected directly to the buses that connect the CPU and memory because the nature of I/O devices is different from the nature of CPU and memory. I/O devices are electromechanical, magnetic, or optical devices, whereas the CPU and memory are electronic devices. I/O devices also operate at a much slower speed than the CPU/memory. There is a need for some sort of intermediary to handle this difference. Input/output devices are therefore attached to the buses through **input/output controllers** or **interfaces**. There is one specific **controller** for each input/output device (Figure 5.13).

**Controllers**
Controllers or interfaces bridge the gap between the nature of the I/O device and the CPU and memory. A controller can be a serial or parallel device. A serial controller has only one data wire, while a parallel controller has several data connections so that several bits can be transferred at a time.
Several kinds of controllers are in use. The most common ones today are SCSI, FireWire, USB, and HDMI.

**SCSI**
The **small computer system interface (SCSI)** was first developed for Macintosh computers in 1984. Today it is used in many systems. It has a parallel interface with 8, 16, or 32 connections. The SCSI interface provides a daisy-chained connection, as shown in Figure 5.14. Both ends of the chain must be connected to a special device called a *terminator*, and each device must have a unique address (target ID).

**FireWire**
IEEE standard 1394 defines a serial interface commonly called **FireWire**. It is a high-speed serial interface that transfers data in packets, achieving a transfer rate of up to 50 MB/sec, or double that in the most recent version. It can be used to connect up to 63 devices in a daisy chain or a tree connection (using only one connection). Figure 5.15 shows the connection of input/output devices to a FireWire controller. There is no need for termination as there is for SCSI.

**USB**
**Universal Serial Bus (USB)** is a competitor for FireWire. Although the nomenclature uses the term *bus*, USB is a serial controller that connects both low- and high-speed devices to the computer bus. Figure 5.16 shows the connection of the USB controller to the bus and the connection of devices to the controller.

Multiple devices can be connected to a USB controller, which is also referred to as a *root hub*. USB-2 (USB Version 2.0) allows up to 127 devices to be connected to a USB controller using a tree-like **topology** with the controller as the root of the tree, **hubs** as the intermediate nodes, and the devices as the end nodes. The difference between the controller (root hub) and the other hubs is that the controller is aware of the presence of other hubs in the tree, but other hubs are passive devices that simply pass the data.
Devices can easily be removed or attached to the tree without powering down the computer. This is referred to as *hot-swappable*. When a hub is removed from the system, all devices and other hubs connected to it are also removed.
USB uses a cable with four wires. Two wires (+5 volts and ground) are used to provide power for low-power devices such as keyboards or mice. A high-power device needs to be connected to a power source. A hub gets its power from the bus and can provide power for low-power devices. The other two wires (twisted together to reduce noise) are used to carry data, addresses, and control signals. USB uses two different connectors: A and B. The A connector (downstream connector) is rectangular and is used to connect to the USB controller or the hub. The B connector (upstream connector) is close to square and is used to connect to the device. Recently two new connectors, mini A and mini B, have been introduced that are used for connecting to small devices and laptop computers.
USB-2 provides three data transfer rates: 1.5 Mbps (megabits per second), 12 Mbps, and 480 Mbps. The low data rate can be used with slow devices such as keyboards and mice, the medium data rate with printers, and the high data rate with mass storage devices.

Data is transferred over USB in packets (see Chapter 6). Each packet contains an address part (device identifier), a control part, and part of the data to be transmitted to that device. All devices will receive the same packet, but only those devices with the address defined in the packet will accept it.
USB 3.0 is another revision of the Universal Serial Bus (USB) standard for computer connectivity. USB 3.0 adds a new transfer mode called *SuperSpeed* capable of transferring data at up to 4.8 Gbit/s. It is promised to update USB 3.0 to 10 Gbit/s.

**HDMI**
**HDMI (High-Definition Multimedia Interface)** is a digital replacement for existing analog video standards. It can be used for transferring video data digital audio data from a source to a compatible computer monitor, video projector, digital television, or digital audio device. There are a number of HDMI-standard cables available including standard, enhanced, high definition, and 3D video signals; up to eight channels of compressed or uncompressed digital audio; a CEC (Consumer Electronics Control) connection; and an Ethernet data connection.

### 5.5.3 Addressing input/output devices
The CPU usually uses the same bus to read data from or write data to main memory and I/O device. The only difference is the instruction. If the instruction refers to a word in main memory, data transfer is between main memory and the CPU. If the instruction identifies an I/O device, data transfer is between the I/O device and the CPU. There are two methods for handling the addressing of I/O devices: isolated I/O and memory-mapped I/O.

**Isolated I/O**
In the **isolated I/O** method, the instructions used to read/write memory are totally different than the instructions used to read/write I/O devices. There are instructions to test, control, read from, and write to I/O devices. Each I/O device has its own address. The I/O addresses can overlap with memory addresses without any ambiguity because the instruction itself is different. For example, the CPU can use a command ‘Read 101’ to read from memory word 101, and it can use a command ‘Input 101’ to read from I/O device 101. There is no confusion, because the read command is for reading from memory and the input command is for reading from an I/O device (Figure 5.17).

**Memory-mapped I/O**
In the **memory-mapped I/O** method, the CPU treats each register in the I/O controller as a word in memory. In other words, the CPU does not have separate instructions for transferring data from memory and I/O devices. For example, there is only one ‘Read’ instruction. If the address defines a word from memory, the data is read from that word. If the address defines a register from an I/O device, the data is read from that register. The advantage of the memory-mapped configuration is a smaller number of instructions: all the memory instructions can be used by I/O devices. The disadvantage is that part of the memory address space is allocated to registers in I/O controllers. For example, if we have five I/O controllers and each has four registers, 20 addresses are used for this purpose. The size of the memory is reduced by 20 words. Figure 5.18 shows the memory-mapped I/O concept.

## 5.6 PROGRAM EXECUTION
Today, general-purpose computers use a set of instructions called a *program* to process data. A computer executes the program to create output data from input data. Both the program and the data are stored in memory.

**At the end of this chapter we give some examples of how a hypothetical simple computer executes a program.**

### 5.6.1 Machine cycle
The CPU uses repeating **machine cycles** to execute instructions in the program, one by one, from beginning to end. A simplified cycle can consist of three phases: **fetch**, **decode**, and **execute** (Figure 5.19).

**Fetch**
In the **fetch** phase, the control unit orders the system to copy the next instruction into the instruction register in the CPU. The address of the instruction to be copied is held in the program counter register. After copying, the program counter is incremented to refer to the next instruction in memory.

**Decode**
The second phase in the cycle is the **decode** phase. When the instruction is in the instruction register, it is decoded by the control unit. The result of this decode step is the binary code for some operation that the system will perform.

**Execute**
After the instruction is decoded, the control unit sends the task order to a component in the CPU. For example, the control unit can tell the system to load (read) a data item from memory, or the CPU can tell the ALU to add the contents of two input registers and put the result in an output register. This is the **execute** phase.

### 5.6.2 Input/output operation
Commands are required to transfer data from I/O devices to the CPU and memory. Because I/O devices operate at much slower speeds than the CPU, the operation of the CPU must be somehow synchronized with the I/O devices. Three methods have been devised for this synchronization: programmed I/O, interrupt-driven I/O, and direct memory access (DMA).

**Programmed I/O**
In the **programmed I/O** method, synchronization is very primitive: the CPU waits for the I/O device (Figure 5.20).

The transfer of data between the I/O device and the CPU is done by an instruction in the program. When the CPU encounters an I/O instruction, it does nothing else until the data transfer is complete. The CPU constantly checks the status of the I/O device: if the device is ready to transfer, data is transferred to the CPU. If the device is not ready, the CPU continues checking the device status until the I/O device is ready. The big issue here is that CPU time is wasted by checking the status of the I/O device for each unit of data to be transferred. Note that data is transferred to memory after the input operation, while data is transferred from memory before the output operation.

**Interrupt-driven I/O**
In the **interrupt-driven I/O** method, the CPU informs the I/O device that a transfer is going to happen, but it does not test the status of the I/O device continuously. The I/O device informs (interrupts) the CPU when it is ready. During this time, the CPU can do other jobs such as running other programs or transferring data from or to other I/O devices (Figure 5.21).
In this method, CPU time is not wasted—the CPU can do something else while the slow I/O device is finishing a task. Note that, like programmed I/O, this method also transfers data between the device and the CPU. Data is transferred to memory after the input operation, while data is transferred from memory before the output operation.

**Direct memory access (DMA)**
The third method used for transferring data is **direct memory access (DMA)**. This method transfers a large block of data between a high-speed I/O device, such as a disk, and memory directly without passing it through the CPU. This requires a DMA controller that relieves the CPU of some of its functions. The DMA controller has registers to hold a block of data before and after memory transfer. Figure 5.22 shows the DMA connection to the data, address, and control buses.

Using this method for an I/O operation, the CPU sends a message to the DMA. The message contains the type of transfer (input or output), the beginning address of the memory location, and the number of bytes to be transferred. The CPU is then available for other jobs (Figure 5.23).
When ready to transfer data, the DMA controller informs the CPU that it needs to take control of the buses. The CPU stops using the buses and lets the controller use them. After data transfer directly between the DMA and memory, the CPU continues its normal operation. Note that, in this method, the CPU is idle for a time. However, the duration of this idle period is very short compared to other methods—the CPU is idle only during the data transfer between the DMA and memory, not while the device prepares the data.

## 5.7 DIFFERENT ARCHITECTURES
The architecture and organization of computers have gone through many changes in recent decades. In this section we discuss some common architectures and organizations that differ from the simple computer architecture we discussed earlier.

### 5.7.1 CISC
CISC (pronounced *sisk*) stands for **complex instruction set computer (CISC)**. The strategy behind CISC architectures is to have a large set of instructions, including complex ones. Programming CISC-based computers is easier than in other designs because there is a single instruction for both simple and complex tasks. Programmers therefore do not have to write a set of instructions to do a complex task.

The complexity of the instruction set makes the circuitry of the CPU and the control unit very complicated. The designers of CISC architectures have come up with a solution to reduce this complexity: programming is done on two levels. An instruction in machine language is not executed directly by the CPU—the CPU performs only simple operations, called *microoperations*. A complex instruction is transformed into a set of these simple operations and then executed by the CPU. This necessitates the addition of a special memory called *micromemory* that holds the set of operations for each complex instruction in the instruction set. The type of programming that uses microoperations is called *microprogramming*.
One objection to CISC architecture is the overhead associated with microprogramming and access to micromemory. However, proponents of the architecture argue that this compensates for smaller programs at the machine level. An example of CISC architecture can be seen in the Pentium series of processors developed by Intel.

### 5.7.2 RISC
RISC (pronounced *risk*) stands for **reduced instruction set computer**. The strategy behind RISC architecture is to have a small set of instructions that do a minimum number of simple operations. Complex instructions are simulated using a subset of simple instructions. Programming in RISC is more difficult and time-consuming than in the other design because most of the complex instructions are simulated using simple instructions.

### 5.7.3 Pipelining
We have learned that a computer uses three phases of *fetch*, *decode*, and *execute* for each instruction. In early computers, these three phases needed to be done in series for each instruction. In other words, instruction $n$ needs to finish all of these phases before the instruction $n + 1$ can start its own phases. Modern computers use a technique called **pipelining** to improve the **throughput** (the total number of instructions performed in each period of time). The idea is that if the control unit can do two or three of these phases simultaneously, the next instruction can start before the previous one is finished.
Figure 5.24.a shows how three consecutive instructions are handled in a computer that uses no pipelining. Figure 5.24.b shows how pipelining can increase the throughput of the computer by allowing different types of phases belonging to different instructions to be done simultaneously. In other words, when the CPU is performing the decode phase of the first instruction, it can also perform the fetch phase of the second instruction. The first computer can perform on average 9 phases in the specific period of time, while the pipelined computer can perform 24 phases in the same period of time. If we assume that each phase uses the same amount of time, the first computer has done 9/3 = 3 instructions while the second computer has done 24/3 = 8 instructions. The throughput is therefore increased 8/3 or 266 per cent.
Of course, pipelining is not as easy as this. There are some problems, such as when a jump instruction is encountered. In this case, the instruction in the *pipe* should be discarded. However, new CPU designs have overcome most drawbacks. Some new CPU designs can even do several fetch cycles simultaneously.

### 5.7.4 Parallel processing
Traditionally a computer had a single control unit, a single arithmetic logic unit, and a single memory unit. With the evolution in technology and the drop in the cost of computer hardware, today we can have a single computer with multiple control units, multiple arithmetic logic units and multiple memory units. This idea is referred to as *parallel processing*. Like pipelining, parallel processing can improve throughput.
**Parallel processing** involves many different techniques. A general view of parallel processing is given by the taxonomy proposed by M. J. Flynn. This taxonomy divides the computer’s organization (in term of processing data) into four categories, as shown in Figure 5.25. According to Flynn, parallel processing may occur in the data stream, the instruction stream, or both.

**SISD organization**
A **single instruction-stream, single data-stream (SISD)** organization represents a computer that has one control unit, one arithmetic logic unit, and one multiple memory units. The instructions are executed sequentially and each instruction may access one or more data items in the data stream. Our simple computer introduced earlier in the chapter is an example of SISD organization. Figure 5.26 shows the concept of configuration for an SISD organization.

**SIMD organization**
A **single instruction-stream, multiple data-stream (SIMD)** organization represents a computer that has one control unit, multiple processing units, and multiple memory units. All processor units receive the same instruction from the control unit, but operate on different items of data. An array processor that simultaneously operates on an array of data belongs to this category. Figure 5.27 shows the concept and implementation of an SIMD organization.

**MISD organization**
A **multiple instruction-stream, single data-stream (MISD)** architecture is one in which several instructions belonging to several instruction streams simultaneously operate on the same data stream. Figure 5.28 shows the concept, but it has never been implemented.

**MIMD organization**
A **multiple instruction-stream, multiple data-stream (MIMD)** architecture is one in which several instructions belonging to several instruction streams simultaneously operate on several data streams (each instruction on one data stream). Figure 5.29 shows the concept and implementation. MIMD organization is considered as a true parallel processing architecture by some experts. In this architecture several tasks can be performed simultaneously. The architecture can use a single shared memory or multiple memory sections.

Parallel processing has found some applications, mostly in the scientific community, in which a task may take several hours or days if done using a traditional computer architecture. Some examples of this can be found in multiplication of very large matrices, in simultaneous processing of large amounts of data for weather prediction, or in space flight simulations.

## 5.8 A SIMPLE COMPUTER
To explain the architecture of computers as well as their instruction processing, we introduce a simple (unrealistic) computer, as shown in Figure 5.30. Our simple computer has three components: CPU, memory, and an input/output subsystem.

### 5.8.1 CPU
The CPU itself is divided into three sections: data registers, arithmetic logic unit (ALU), and the control unit.

**Data registers**
There are sixteen 16-bit data registers with hexadecimal addresses $(0, 1, 2, ..., F)_{16}$, but we refer to them as $R_0$ to $R_{15}$. In most instructions, they hold 16-bit data, but in some instructions they may hold other information.

**Control unit**
The control unit has the circuitry to control the operations of the ALU, access to memory, and access to the I/O subsystem. In addition, it has two dedicated registers: program counter and instruction register. The program counter (PC), which can hold only eight bits, keeps track of which instruction is to be executed next. The contents of the PC points to the address of the memory location of the main memory that holds the next program instruction. After each machine cycle the program counter is incremented by one to point to the next program instruction. The instruction register (IR) holds a 16-bit value which is the encoded instruction for the current cycle.

### 5.8.2 Main memory
The main memory has 256 16-bit memory locations with binary addresses $(00000000 \\text{ to } 11111101)_2$ or hexadecimal addresses $(00 \\text{ to } FD)_{16}$. The main memory holds both data and program instruction. The first 64 locations $(00 \\text{ to } 3F)_{16}$ are dedicated to program instructions. Program instructions for any program are stored in consecutive memory locations. Memory locations $(40 \\text{ to } FD)_{16}$ are used for storing data.

### 5.8.3 Input/output subsystem
Our simple computer has a very primitive input/output subsystem. The subsystem consists of a keyboard and a monitor. Although we show the keyboard and monitor in a separate box in Figure 5.30, the subsystem is part of the memory address-wise. These devices have memory-mapped addresses, as discussed earlier in the chapter. We assume that the keyboard (as the input device) and monitor (as the only output device) act like memory locations with addresses $(FE)_{16}$ and $(FF)_{16}$ respectively, as shown in the figure. In other words, we assume that they behave as 16-bit registers that interact with the CPU as a memory location would. These two devices transfer data from the outside world to the CPU and vice versa.

### 5.8.4 Instruction set
Our simple computer is capable of having a set of 16 instructions, although we are using only 14 of these instructions. Each computer instruction consists of two parts: the **operation code (opcode)** and the **operand(s)**. The opcode specifies the type of operation to be performed on the operand(s). Each instruction consists of 16 bits divided into four 4-bit fields. The leftmost field contains the opcode and the other three fields contain the operand or address of operand(s), as shown in Figure 5.31.

The instructions are listed in Table 5.4 below. Note that not every instruction requires three operands. Any operand field not needed is filled with $(0)_{16}$. For example, all three operand fields of the halt instruction, and the last field of the move and NOT instructions, are filled with $(0)_{16}$. Also note that a register address is described by a single hexadecimal digit and thus uses a single field, but a memory location is described by two hexadecimal digits and uses two fields.
There are two add instructions: one for adding integers (ADDI) and one for adding floating points numbers (ADDF). The simple computer can take input from keyboard if we use address $(FE)_{16}$ as the second operand of the LOAD instruction. Similarly, the computer sends output to the monitor if we use the address $(FF)_{16}$ as the second operand of the STORE instruction. If the third operand of the ROTATE instruction is 0, the instruction circularly rotates the bit pattern in R to the right $n$ places: if the third operand is 1, it rotates it to the left. We have also included one increment (INC) and one decrement (DEC) instruction.

**Table 5.4 List of instructions for the simple computer**
| Instruction | Code $d_1$ | Operands $d_2, d_3, d_4$ | Action |
|---|---|---|---|
| HALT | 0 | | Stops the execution of the program |
| LOAD | 1 | $R_D$ $M_S$ | $R_D \\leftarrow M_S$ |
| STORE | 2 | $M_D$ $R_S$ | $M_D \\leftarrow R_S$ |
| ADDI | 3 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} + R_{S2}$ |
| ADDF | 4 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} + R_{S2}$ |
| MOVE | 5 | $R_D$ $R_S$ | $R_D \\leftarrow R_S$ |
| NOT | 6 | $R_D$ $R_S$ | $R_D \\leftarrow \\overline{R_S}$ |
| AND | 7 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} \\text{ AND } R_{S2}$ |
| OR | 8 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} \\text{ OR } R_{S2}$ |
| XOR | 9 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} \\text{ XOR } R_{S2}$ |
| INC | A | $R$ | $R \\leftarrow R + 1$ |
| DEC | B | $R$ | $R \\leftarrow R - 1$ |
| ROTATE | C | $R$ $n$ 0 or 1 | Rot$_n$ $R$ |
| JUMP | D | $R$ $n$ | IF $R_0 \\neq R$ then PC = $n$, otherwise continue |

Key:
$R_S, R_{S1}, R_{S2}$: Hexadecimal address of source registers
$R_D$: Hexadecimal address of destination register
$M_S$: Hexadecimal address of source memory location
$M_D$: Hexadecimal address of destination memory location
$n$: Hexadecimal number
$d_1, d_2, d_3, d_4$: First, second, third, and fourth hexadecimal digits

### 5.8.5 Processing the instructions
Our simple computer, like most computers, uses machine cycles. A cycle is made of three phases: *fetch*, *decode*, and *execute*. During the fetch phase, the instruction whose address is determined by the PC is obtained from the memory and loaded into the IR. The PC is then incremented to point to the next instruction. During the *decode* phase, the instruction in the IR is decoded and the required operands are fetched from the register or from memory. During the *execute* phase, the instruction is executed and the results are placed in the appropriate memory location or the register. Once the third phase is completed, the control unit starts the cycle again, but now the PC is pointing to the next instruction. The process continues until the CPU reaches a HALT instruction.

**An example**
Let us show how our simple computer can add two integers A and B and create the result as C. We assume that integers are in two’s complement format. Mathematically, we show this operation as:
$C = A + B$
To solve this problem with the simple computer, it is necessary for the first two integers to be held in two registers (for example, $R_0$ and $R_1$) and the result of the operation to be held in a third register (for example $R_2$). The ALU can only operate on the data that is stored in data registers in the CPU. However, most computers, including our simple computer, have a limited number of registers in the CPU. If the number of data items is large and they are supposed to stay in the computer for the duration of the program, it is better to store them in memory and only bring them to the registers temporarily. So we assume that the first two integers are stored in memory locations $(40)_{16}$ and $(41)_{16}$ and the result should be stored in memory location $(42)_{16}$. This means that two integers need to be loaded into the CPU and the result needs to be stored in the memory. Therefore, a simple program to do the simple addition needs five instructions, as shown below:

1.  Load the contents of $M_{40}$ into register $R_0$ ($R_0 \\leftarrow M_{40}$).
2.  Load the contents of $M_{41}$ into register $R_1$ ($R_1 \\leftarrow M_{41}$).
3.  Add the contents of $R_0$ and $R_1$ and place the result in $R_2$ ($R_2 \\leftarrow R_0 + R_1$).
4.  Store the contents $R_2$ in $M_{42}$ ($M_{42} \\leftarrow R_2$).
5.  Halt.

In the language of our simple computer, these five instructions are encoded as:

| Code | Interpretation |
|---|---|
| $(1040)_{16}$ | 1: LOAD 0: $R_0$ 40: $M_{40}$ |
| $(1141)_{16}$ | 1: LOAD 1: $R_1$ 41: $M_{41}$ |
| $(3201)_{16}$ | 3: ADDI 2: $R_2$ 0: $R_0$ 1: $R_1$ |
| $(2422)_{16}$ | 2: STORE 42: $M_{42}$ 2: $R_2$ |
| $(0000)_{16}$ | 0: HALT |

### 5.8.6 Storing program and data
To follow the von Neumann model, we need to store the program and the data in memory. We can store the five-line program in memory starting from location $(00)_{16}$ to $(04)_{16}$. We already know that the data needs to be stored in memory locations $(40)_{16}$, $(41)_{16}$, and $(42)_{16}$.

### 5.8.7 Cycles
Our computer uses one cycle per instruction. If we have a small program with five instructions, we need five cycles. We also know that each cycle is normally made up of three steps: *fetch*, *decode*, *execute*. Assume for the moment that we need to add $161 + 254 = 415$. The numbers are shown in memory in hexadecimal is, $(00A1)_{16}$, $(00FE)_{16}$, and $(019F)_{16}$.

**Cycle 1**
At the beginning of the first cycle (Figure 5.32), the PC points to the first instruction of the program, which is at memory location $(00)_{16}$. The control unit goes through three steps:
1.  The control unit *fetches* the instruction stored in memory location $(00)_{16}$ and puts it in the IR. After this step, the value of the PC is incremented.
2.  The control unit *decodes* the instruction $(1040)_{16}$ as $R_0 \\leftarrow M_{40}$.
3.  The control unit *executes* the instruction, which means that a copy of the integer stored in memory location (40) is loaded into register $R_0$.

**Cycle 2**
At the beginning of the second cycle (Figure 5.33), the PC points to the second instruction of the program, which is at memory location $(01)_{16}$. The control unit goes through three steps:
1.  The control unit *fetches* the instruction stored in memory location $(01)_{16}$ and puts it in the IR. After this step, the value of the PC is incremented.
2.  The control unit *decodes* the instruction $(1141)_{16}$ as $R_1 \\leftarrow M_{41}$.
3.  The control unit *executes* the instruction, which means that a copy of integer stored in memory location $(41)_{16}$ is loaded into register $R_1$.

**Cycle 3**
At the beginning of the third cycle (Figure 5.34), the PC points to the third instruction of the program, which is at memory location $(02)_{16}$. The control unit goes through three steps:
1.  The control unit *fetches* the instruction stored in memory location $(02)_{16}$ and puts it in the IR. After this step, the value of the PC is incremented.
2.  The control unit *decodes* the instruction $(3201)_{16}$ as $R_2 \\leftarrow R_0 + R_1$.
3.  The control unit *executes* the instruction, which means that the contents of $R_0$ is added to the content of $R_1$ (by the ALU) and the result is put in $R_2$.

**Cycle 4**
At the beginning of the fourth cycle (Figure 5.35), the PC points to the fourth instruction of the program, which is at memory location $(03)_{16}$. The control unit goes through three steps:
1.  The control unit *fetches* the instruction stored in memory location $(03)_{16}$ and puts it in the IR. After this step, the value of the PC is incremented.
2.  The control unit *decodes* the instruction $(2422)_{16}$ as $M_{42} \\leftarrow R_2$.
3.  The control unit *executes* the instruction, which means a copy of integer in register $R_2$ is stored in memory location $(42)_{16}$.

**Cycle 5**
At the beginning of the fifth cycle (Figure 5.36), the PC points to the fifth instruction of the program, which is at memory location $(04)_{16}$. The control unit goes through three steps:
1.  The control unit *fetches* the instruction stored in memory location $(04)_{16}$ and puts it in the IR. After this step, the value of the PC is incremented.
2.  The control unit *decodes* the instruction $(0000)_{16}$ as Halt.
3.  The control unit *executes* the instruction, which means that the computer stops.

### 5.8.8 Another example
In the previous example we assumed that the two integers to be added were already in memory. We also assume that the result of addition will be held in memory. You may ask how we can store the two integers we want to add in memory, or how we use the result when it is stored in the memory. In a real situation, we enter the first two integers into memory using an input device such as keyboard, and we display the third integer through an output device such as a monitor. Getting data via an input device is normally called a *read* operation, while sending data to an output device is normally called a *write* operation. To make our previous program more practical, we need to modify it as follows:

1.  Read an integer into $M_{40}$.
2.  $R_0 \\leftarrow M_{40}$.
3.  Read an integer into $M_{41}$.
4.  $R_1 \\leftarrow M_{41}$.
5.  $R_2 \\leftarrow R_0 + R_1$.
6.  $M_{42} \\leftarrow R_2$.
7.  Write the integer from $M_{42}$.
8.  Halt.

There are many ways to implement input and output. Most computers today do direct data transfer from an input device to memory and direct data transfer from memory to an output device. However, our simple computer is not one of them. In our computer we can simulate read and write operations using the LOAD and STORE instruction. Furthermore, LOAD and STORE read data input to the CPU and write data from the CPU. We need two instructions to read data into memory or write data out of memory. The read operation is:

$R \\leftarrow M_{FE}$ Because the keyboard is assumed to be memory location $(FE)_{16}$
$M \\leftarrow R$

The write operation is:

$R \\leftarrow M$
$M_{FF} \\leftarrow R$ Because the monitor is assumed to be memory location $(FF)_{16}$

You may ask, if the operations are supposed to be done in the CPU, why do we transfer the data from the keyboard to the CPU, then to the memory, then to the CPU for processing? Could we directly transfer data to the CPU? The answer is that we can do this for this small problem, but we should not do it in principle. Think what happens if we need to add 1000 numbers or sort 1000000 integers. The number of registers in the CPU is limited (it may be hundreds in a real computer, but still not enough).

**The input operation must always read data from an input device into memory: the output operation must always write data from memory to an output device.**

With this in mind, the program is coded as:
1 $(1FFE)_{16}$   5 $(1040)_{16}$   9 $(1F42)_{16}$
2 $(240F)_{16}$   6 $(1141)_{16}$   10 $(2FFF)_{16}$
3 $(1FFE)_{16}$   7 $(3201)_{16}$   11 $(0000)_{16}$
4 $(241F)_{16}$   8 $(2422)_{16}$

Operations 1 to 4 are for input and operations 9 and 10 are for output. When we run this program, it waits for the user to input two integers on the keyboard and press the enter key. The program then calculates the sum and displays the result on the monitor.

### 5.8.9 Reusability
One of the advantages of a computer over a non-programmable calculator is that we can use the same program over and over. We can run the program several times and each time enter different inputs and obtain a different output.

## 5.9 END-CHAPTER MATERIALS
### 5.9.1 Recommended reading
For more details about subjects discussed in this chapter, the following books are recommended:
- Englander, I. *The Architecture of Computer Hardware and Systems Software*, Hoboken, NJ: Wiley, 2003
- Mano, M. *Computer System Architecture*, Upper Saddle River, NJ: Prentice-Hall, 1993
- Null, L. and Lobur, J. *Computer Organization and Architecture*, Sudbury, MA: Jones and Bartlett, 2003
- Hamacher, C., Vranesic, Z. and Zaky, S. *Computer Organization*, New York: McGraw-Hill, 2002
- Warford, S. *Computer Systems*, Sudbury, MA: Jones and Bartlett, 2005
- Ercegovac, M., Lang, T. and Moreno, J. *Introduction to Digital Systems*, Hoboken, NJ: Wiley, 1998
- Cragon, H. *Computer Architecture and Implementation*, Cambridge: Cambridge University Press, 2000
- Stallings, W. *Computer Organization and Architecture*, Upper Saddle River, NJ: Prentice-Hall, 2002

### 5.9.2 Key terms
- address bus
- address space
- arithmetic logic unit (ALU)
- bus
- cache memory
- central processing unit (CPU)
- compact disk (CD)
- compact disk read-only memory (CD-ROM)
- compact disk recordable (CD-R)
- complex instruction set computer (CISC)
- control bus
- controller
- control unit
- data bus
- decode
- digital versatile disk (DVD)
- direct memory access (DMA)
- dynamic RAM (DRAM)
- electrically erasable programmable read-only memory (EEPROM)
- erasable programmable read-only memory (EPROM)
- execute
- fetch
- FireWire
- HDMI (High-Definition Multimedia Interface)
- hub
- input/output controller
- input/output subsystem
- instruction register
- interrupt-driven I/O
- intersector gap
- intertrack gap
- isolated I/O
- land
- machine cycle
- programmable read-only memory (PROM)
- magnetic disk
- magnetic tape
- main memory
- master disk
- memory mapped I/O
- monitor
- multiple instruction-stream, multiple data stream (MIMD)
- multiple instruction-stream, single data stream (MISD)
- nonstorage device
- optical storage device
- output device
- parallel processing
- pipelining
- pit
- polycarbonate resin
- printer
- program counter
- programmed I/O
- random access memory (RAM)
- read-only memory (ROM)
- read/write head
- reduced instruction set computer (RISC)
- register
- rotational speed
- sector
- seek time
- single instruction-stream, multiple data stream (SIMD)
- static RAM (SRAM)
- storage device
- throughput
- topology
- track
- transfer time
- Universal Serial Bus (USB)
- write once, read many (WORM)

### 5.9.3 Summary
- The parts that make up a computer can be divided into three broad categories or subsystems: the central processing unit (CPU), the main memory, and the input/output subsystem.
- The central processing unit (CPU) performs operations on data. It has three parts: an arithmetic logic unit (ALU), a control unit, and a set of registers. The arithmetic logic unit (ALU) performs logic, shift, and arithmetic operations on data. Registers are fast stand-alone storage locations that hold data temporarily. The control unit controls the operation of each part of the CPU.
- Main memory is a collection of storage locations, each with a unique identifier called the address. Data is transferred to and from memory in groups of bits called words. The total number of uniquely identifiable locations in memory is called the address space. Two types of memory are available: random access memory (RAM) and read-only memory (ROM).
- The collection of devices referred to as the input/output (I/O) subsystem allows a computer to communicate with the outside world and to store programs and data even when the power is off. Input/output devices can be divided into two broad categories: nonstorage and storage devices. Nonstorage devices allow the CPU/memory to communicate with the outside world. Storage devices can store large amounts of information to be retrieved at a later time. Storage devices are categorized as either magnetic or optical.
- The interconnection of the three subsystems of a computer plays an important role, because information needs to be exchanged between these subsystems. The CPU and memory are normally connected by three groups of connections, each called a bus: data bus, address bus, and control bus. Input/output devices are attached to the buses through an input/output controller or interface. Several kinds of controllers are in use. The most common ones today are SCSI, FireWire, and USB.
- There are two methods of handling the addressing of I/O devices: isolated I/O and memory-mapped I/O. In the isolated I/O method, the instructions used to read/write to and from memory are different from the instructions used to read/write to and from input/output devices. In the memory-mapped I/O method, the CPU treats each register in the I/O controller as a word in memory.
- Today, general-purpose computers use a set of instructions called a program to process data. A computer executes the program to create output data from input data. Both the program and the data are stored in memory. The CPU uses repeating machine cycles to execute instructions in the program, one by one, from beginning to end. A simplified cycle can consist of three phases: fetch, decode, and execute.
- Three methods have been devised for synchronization between I/O devices and the CPU: programmed I/O, interrupt-driven I/O, and direct memory access (DMA).
- The architecture and organization of computers have gone through many changes during recent decades. We can divide computer architecture into two broad categories: CISC (complex instruction set computers) and RISC (reduced instruction set computers).
- Modern computers use a technique called pipelining to improve their throughput. The idea is to allow the control unit to perform two or three phases simultaneously, which means that processing of the next instruction can start before the previous one is finished.
- Traditionally, a computer had a single control unit, a single arithmetic logic unit, and a single memory unit. Parallel processing can improve throughput by using multiple instruction streams to handle multiple data streams.
`,
  zh: `
# 第五章：電腦組織

在本章中，我們討論獨立電腦的組織。我們解釋每台電腦如何由三個子系統組成。我們也展示了一台簡單的、假設的電腦如何運行簡單的程式來執行原始的算術或邏輯運算。

## 學習目標
學完本章後，學生應能：
- 列出電腦的三個子系統。
- 描述中央處理單元 (CPU) 在電腦中的角色。
- 描述典型電腦週期中的提取-解碼-執行階段。
- 描述主記憶體及其位址空間。
- 區分主記憶體和快取記憶體。
- 定義輸入/輸出子系統。
- 了解子系統的互連並列出不同的匯流排系統。
- 描述輸入/輸出定址的不同方法。
- 區分電腦架構設計中的兩大趨勢。
- 了解如何使用管線化提高電腦吞吐量。
- 了解平行處理如何提高電腦的吞吐量。

## 5.1 簡介
我們可以將組成電腦的各個部分分為三大類或子系統：**中央處理單元 (CPU)**、**主記憶體**和**輸入/輸出子系統**。接下來的三節將討論這些子系統以及它們如何連接以構成一台獨立電腦。圖 5.1 顯示了獨立電腦的三個子系統。

## 5.2 中央處理單元
**中央處理單元 (CPU)** 對資料執行操作。在大多數架構中，它由三個部分組成：**算術邏輯單元 (ALU)**、**控制單元**和一組**暫存器**（圖 5.2）。

### 5.2.1 算術邏輯單元 (ALU)
**算術邏輯單元 (ALU)** 對資料執行邏輯、移位和算術運算。

**邏輯運算**
我們在第四章討論了幾種邏輯運算，例如 NOT、AND、OR 和 XOR。這些運算將輸入資料視為位元模式，運算結果也是位元模式。

**移位運算**
我們在第四章討論了兩組資料移位運算：邏輯移位運算和算術移位運算。邏輯移位運算用於將位元模式向左或向右移動，而算術運算應用於整數。它們的主要目的是將整數除以二或乘以二。

**算術運算**
我們在第四章討論了一些整數和實數的算術運算。我們提到有些運算可以在硬體中更有效地實現。

### 5.2.2 暫存器
**暫存器**是快速的獨立儲存位置，用於暫時保存資料。需要多個暫存器來促進 CPU 的運作。圖 5.2 中顯示了其中一些暫存器。

**資料暫存器**
過去的電腦只有少數幾個資料暫存器來保存輸入資料和運算結果。如今，電腦在 CPU 內部使用數十個暫存器來加速運算，因為複雜的運算是使用硬體而不是軟體完成的。這需要幾個暫存器來保存中間結果。圖 5.2 中的資料暫存器命名為 $R_0$ 到 $R_n$。

**指令暫存器**
今天的電腦不僅將資料儲存在記憶體中，還將程式儲存在記憶體中。CPU 負責從記憶體中逐一提取指令，將其儲存在**指令暫存器 (IR)**（圖 5.2 中）中，進行解碼並執行。我們將在本章稍後討論這個問題。

**程式計數器**
CPU 中的另一個常見暫存器是**程式計數器 (PC)**（圖 5.2 中）。程式計數器追蹤當前正在執行的指令。執行完指令後，計數器遞增以指向記憶體中下一條指令的位址。

### 5.2.3 控制單元
任何 CPU 的第三部分都是控制單元。**控制單元**控制每個子系統的操作。控制是透過從控制單元發送到其他子系統的信號來實現的。

## 5.3 主記憶體
**主記憶體**是電腦中的第二大子系統（圖 5.3）。它由一組儲存位置組成，每個位置都有一個唯一的標識符，稱為**位址**。資料以稱為**字 (word)** 的位元組為單位傳輸到記憶體和從記憶體傳輸出來。一個字可以是 8 位元、16 位元、32 位元或 64 位元（且還在增長）。如果字是 8 位元，則稱為**位元組 (byte)**。「位元組」一詞在電腦科學中非常常見，有時 16 位元的字被稱為 2 位元組字，或 32 位元的字被稱為 4 位元組字。

### 5.3.1 位址空間
要存取記憶體中的字，需要一個標識符。雖然程式設計師使用名稱來標識字（或一組字），但在硬體層級，每個字都由位址標識。記憶體中唯一可識別位置的總數稱為**位址空間**。例如，具有 64 KB 和字長為 1 位元組的記憶體，其位址空間範圍從 0 到 65535。

表 5.1 顯示了用於指稱記憶體的單位。請注意，術語具有誤導性：它以 10 的冪次近似位元組數，但實際的位元組數是 2 的冪次。2 的冪次單位便於定址。

**表 5.1 記憶體單位**

| 單位 | 精確位元組數 | 近似值 |
| :--- | :--- | :--- |
| kilobyte (KB) | $2^{10}$ (1024) bytes | $10^3$ bytes |
| megabyte (MB) | $2^{20}$ (1048576) bytes | $10^6$ bytes |
| gigabyte (GB) | $2^{30}$ (1073741824) bytes | $10^9$ bytes |
| terabyte (TB) | $2^{40}$ bytes | $10^{12}$ bytes |

**位址作為位元模式**
因為電腦透過將數字儲存為位元模式來運作，所以記憶體位址也表示為位元模式。因此，如果一台電腦有 64 KB ($2^{16}$) 的記憶體，字長為 1 位元組，我們就需要一個 16 位元的位元模式來定義位址。回想第 3 章，位址可以表示為無符號整數（我們沒有負位址）。換句話說，第一個位置稱為位址 0000000000000000（位址 0），最後一個位置稱為位址 1111111111111111（位址 65535）。一般來說，如果一台電腦有 $N$ 個字的記憶體，我們需要一個大小為 $\\log_2 N$ 位元的無符號整數來引用每個記憶體位置。

**記憶體位址使用無符號二進位整數定義。**

> **範例 5.1**
> 一台電腦有 32 MB (百萬位元組) 的記憶體。需要多少位元來定址記憶體中的任何單一位元組？
>
> **解答**
> 記憶體位址空間為 32 MB，即 $2^{25}$ ($2^5 \\times 2^{20}$)。這意味著我們需要 $\\log_2 2^{25}$，即 25 位元，來定址每個位元組。

> **範例 5.2**
> 一台電腦有 128 MB 的記憶體。這台電腦中的每個字是八個位元組。需要多少位元來定址記憶體中的任何單一字？
>
> **解答**
> 記憶體位址空間為 128 MB，即 $2^{27}$。然而，每個字是八 ($2^3$) 個位元組，這意味著我們有 $2^{24}$ 個字。這意味著我們需要 $\\log_2 2^{24}$，即 24 位元，來定址每個字。

### 5.3.2 記憶體類型
存在兩種主要的記憶體類型：RAM 和 ROM。

**RAM**
**隨機存取記憶體 (RAM)** 構成了電腦中大部分的主記憶體。在隨機存取設備中，可以隨機存取資料項目——使用記憶體位置的位址——而無需存取位於其之前的所有資料項目。然而，這個術語令人困惑，因為 ROM 也可以隨機存取。區分 RAM 和 ROM 的是 RAM 可以讀取和寫入。CPU 可以將某些內容寫入 RAM，稍後再覆寫它。RAM 的另一個特性是它是**揮發性的**：如果電腦斷電，資訊（程式或資料）將會遺失。換句話說，如果你關閉電腦或停電，RAM 中的所有資訊都會被刪除。RAM 技術分為兩大類：SRAM 和 DRAM。

**SRAM**
**靜態 RAM (SRAM)** 技術使用傳統的正反器閘（參見附錄 E）來保存資料。閘保持其狀態（0 或 1），這意味著只要電源開啟，資料就會被儲存，無需刷新記憶體位置。SRAM 速度快但價格昂貴。

**DRAM**
**動態 RAM (DRAM)** 技術使用電容器（一種可以儲存能量的電子元件）來儲存資料。如果電容器充電，狀態為 1；如果放電，狀態為 0。因為電容器會隨時間失去部分電荷，DRAM 記憶體單元需要定期刷新。DRAM 速度慢但價格便宜。

**ROM**
**唯讀記憶體 (ROM)** 的內容由製造商寫入，CPU 可以從 ROM 讀取，但不能寫入。它的優點是它是**非揮發性的**——如果你關閉電腦，其內容不會遺失。通常，它用於儲存即使關閉電腦也不能刪除或更改的程式或資料。例如，有些電腦配備了 ROM，其中包含當我們開啟電腦時運行的啟動程式。

**PROM**
ROM 的一種變體是**可程式化唯讀記憶體 (PROM)**。這種記憶體在電腦出廠時是空白的。電腦使用者可以使用一些特殊設備將程式儲存在其中。當程式被儲存後，它的行為就像 ROM 一樣，不能被覆寫。這允許電腦使用者將特定程式儲存在 PROM 中。

**EPROM**
PROM 的一種變體是**可抹除可程式化唯讀記憶體 (EPROM)**。它可以由使用者編程，也可以用施加紫外線的特殊設備擦除。擦除 EPROM 記憶體需要物理移除並重新安裝 EPROM。

**EEPROM**
EPROM 的一種變體是**電子可抹除可程式化唯讀記憶體 (EEPROM)**。EEPROM 可以使用電子脈衝進行編程和擦除，而無需從電腦中移除。

### 5.3.3 記憶體階層
電腦使用者需要大量的記憶體，尤其是非常快速且便宜的記憶體。這種需求並不總是能夠滿足——非常快速的記憶體通常不便宜。需要做出妥協。解決方案是記憶體的階層級別（圖 5.4）。該階層基於以下幾點：
- 在速度至關重要的地方使用極少量的昂貴高速記憶體。CPU 內部的暫存器屬於此類型。
- 使用適量的中速記憶體來儲存經常存取的資料。接下來討論的快取記憶體屬於此類型。
- 使用大量的低速記憶體來儲存較少存取的資料。主記憶體屬於此類型。

### 5.3.4 快取記憶體
**快取記憶體**比主記憶體快，但比 CPU 及其暫存器慢。快取記憶體通常容量較小，放置在 CPU 和主記憶體之間（圖 5.5）。

快取記憶體在任何時候都包含主記憶體一部分的副本。當 CPU 需要存取主記憶體中的一個字時，它遵循以下程序：
1.  CPU 檢查快取。
2.  如果該字在那裡，它複製該字；如果不在，CPU 存取主記憶體並複製從所需字開始的一塊記憶體。該區塊替換快取記憶體先前的內容。
3.  CPU 存取快取並複製該字。

這個程序可以加快操作速度；如果字在快取中，則立即存取。如果字不在快取中，則將該字和整個區塊複製到快取中。由於 CPU 在下一個週期中很可能需要存取第一個字後面的字，因此快取記憶體的存在加快了處理速度。

我們可能會想，為什麼快取記憶體儘管容量小卻如此有效率。答案在於「80-20 法則」。據觀察，大多數電腦通常花費 80% 的時間存取僅 20% 的資料。換句話說，相同的資料被反覆存取。快取記憶體憑藉其高速度，可以保存這 20% 的資料，使存取速度在至少 80% 的時間內變快。

## 5.4 輸入/輸出子系統
電腦中的第三大子系統是稱為**輸入/輸出 (I/O) 子系統**的設備集合。此子系統允許電腦與外部世界通訊，即使在電源關閉時也能儲存程式和資料。輸入/輸出設備可分為兩大類：非儲存設備和儲存設備。

### 5.4.1 非儲存設備
**非儲存設備**允許 CPU/記憶體與外部世界通訊，但它們不能儲存資訊。

**鍵盤和螢幕**
兩種較常見的非儲存輸入/輸出設備是**鍵盤**和**螢幕**。鍵盤提供輸入，螢幕顯示輸出，同時回顯在鍵盤上輸入的內容。程式、命令和資料使用字元串輸入或輸出。字元使用諸如 ASCII 之類的代碼進行編碼（參見附錄 A）。屬於此類別的其他設備包括滑鼠、搖桿等。

**印表機**
**印表機**是一種產生永久記錄的**輸出設備**。印表機是非儲存設備，因為列印出來的材料無法直接再次輸入電腦，除非有人重新輸入或掃描它。

### 5.4.2 儲存設備
**儲存設備**雖然被歸類為 I/O 設備，但可以儲存大量資訊以供日後檢索。它們比主記憶體便宜，而且其內容是非揮發性的——也就是說，當電源關閉時不會被刪除。它們有時被稱為**輔助儲存設備**。我們可以將它們分類為磁性或光學設備。

**磁性儲存設備**
磁性儲存設備使用磁化來儲存資料位元。如果一個位置被磁化，它代表 1，如果沒有被磁化，它代表 0。

**磁碟**
**磁碟**由一個或多個堆疊在一起的磁盤組成。磁盤塗有一層薄薄的磁性膜。使用每個磁化表面的**讀/寫頭**在磁盤表面儲存和檢索資訊。圖 5.6 顯示了磁碟機的實體佈局和磁碟的組織。
- **表面組織。** 為了組織儲存在磁碟上的資料，每個表面被劃分為**磁軌 (tracks)**，每個磁軌被劃分為**磁區 (sectors)**（圖 5.6）。磁軌由**磁軌間隙**分隔，磁區由**磁區間隙**分隔。
- **資料存取。** 磁碟被認為是隨機存取設備。在隨機存取設備中，可以隨機存取資料項目，而無需存取位於其之前的所有其他資料項目。然而，一次可以存取的最小儲存區域是一個磁區。一塊資料可以儲存在一個或多個磁區中並被檢索，而無需檢索磁碟上的其餘資訊。
- **效能。** 磁碟的效能取決於幾個因素，最重要的是轉速、搜尋時間和傳輸時間。**轉速**定義了磁碟旋轉的速度。**搜尋時間**定義了將讀/寫頭移動到儲存資料的所需磁軌的時間。**傳輸時間**定義了將資料從磁碟移動到 CPU/記憶體的時間。

**磁帶**
**磁帶**有各種尺寸。一種常見的類型是塗有厚磁性膜的半英吋塑膠帶。磁帶安裝在兩個捲軸上，並使用讀/寫頭在磁帶通過時讀取或寫入資訊。圖 5.7 顯示了磁帶機的機械配置。
- **表面組織。** 磁帶的寬度分為九個軌道，每個軌道上的一個位置儲存 1 位元資訊。九個垂直位置可以儲存與一個位元組相關的 8 位元資訊加上一個用於錯誤檢測的位元（圖 5.7）。
- **資料存取。** 磁帶被認為是循序存取設備。雖然表面可以分為區塊，但沒有定址機制來存取每個區塊。要檢索磁帶上的特定區塊，我們需要通過所有先前的區塊。
- **效能。** 雖然磁帶比磁碟慢，但它更便宜。今天，人們使用磁帶備份大量資料。

**光學儲存設備**
**光學儲存設備**是一種相對較新的技術，使用雷射光來儲存和檢索資料。光學儲存技術的使用緊隨用於儲存音訊資訊的**光碟 (CD)** 的發明之後。今天，同樣的技術——稍加改進——用於在電腦中儲存資訊。使用這種技術的設備包括 CD-ROM、CD-R、CD-RW 和 DVD。

**CD-ROM**
**唯讀光碟 (CD-ROM)** 使用與最初由飛利浦和索尼開發用於錄製音樂的音訊 CD 相同的技術。這兩種技術之間的唯一區別是增強：CD-ROM 驅動器更強大並檢查錯誤。圖 5.8 顯示了創建和使用 CD-ROM 所涉及的步驟。
- **創建。** CD-ROM 技術使用三個步驟來創建大量光碟：
  a. 使用高功率紅外雷射在塗層塑膠上創建位元模式來製作**母片 (master disk)**。雷射將位元模式轉換為一系列**凹坑 (pits)**（孔）和**平台 (lands)**（無孔）。凹坑通常代表 0，平台通常代表 1。然而，這只是一個慣例，它可以反過來。其他方案使用過渡（從凹坑到平台或從平台到凹坑）來代表 1，並且沒有過渡來代表 0。
  b. 從母片製作模具。在模具中，凹坑（孔）被凸起取代。
  c. 將熔融的**聚碳酸酯樹脂**注入模具中，以產生與母片相同的凹坑。在聚碳酸酯上添加一層非常薄的鋁以提供反射表面。在此之上，塗上一層保護漆並添加標籤。只有這最後一步需要對每張光碟重複進行。
- **讀取。** 使用低功率雷射束讀取 CD-ROM。當光束通過平台時，會被鋁表面反射。當它遇到凹坑時，會被反射兩次，一次由凹坑邊界反射，一次由鋁邊界反射。這兩次反射具有破壞性效果，因為選擇的凹坑深度正好是光束波長的四分之一。換句話說，安裝在驅動器中的感測器在位置是平台時檢測到更多的光，而在位置是凹坑時檢測到更少的光，因此可以讀取記錄在原始母片上並複製到 CD-ROM 的內容。
- **格式。** CD-ROM 技術使用與磁碟不同的格式（圖 5.9）。CD-ROM 上的資料格式基於：
  a. 一個 8 位元資料區塊使用稱為漢明碼的錯誤更正方法轉換為 14 位元符號。
  b. 由 42 個符號（14 位元/符號）組成的訊框。
  c. 由 98 個訊框（2352 位元組）組成的磁區。
- **速度。** CD-ROM 驅動器有不同的速度。單速稱為 1x，雙速稱為 2x，依此類推。如果驅動器是單速，它每秒最多可以讀取 153,600 位元組。表 5.2 顯示了速度及其對應的資料速率。

**表 5.2 CD-ROM 速度**
| 速度 | 資料速率 | 近似值 |
|---|---|---|
| 1x | 每秒 153600 位元組 | 150 KB/s |
| 2x | 每秒 307200 位元組 | 300 KB/s |
| 4x | 每秒 614400 位元組 | 600 KB/s |
| 6x | 每秒 921600 位元組 | 900 KB/s |
| 8x | 每秒 1228800 位元組 | 1.2 MB/s |
| 12x | 每秒 1843200 位元組 | 1.8 MB/s |
| 16x | 每秒 2457600 位元組 | 2.4 MB/s |
| 24x | 每秒 3688400 位元組 | 3.6 MB/s |
| 32x | 每秒 4915200 位元組 | 4.8 MB/s |
| 40x | 每秒 6144000 位元組 | 6 MB/s |

- **應用。** 如果有大量潛在客戶，那麼創建母片、模具和實際光碟所涉及的費用是合理的。換句話說，如果光碟是大規模生產的，這項技術就是經濟的。

**CD-R**
顯然，只有當製造商能夠創建大量光碟時，CD-ROM 技術才是合理的。另一方面，**可錄式光碟 (CD-R)** 格式允許使用者創建一張或多張光碟，而無需經歷創建 CD-ROM 所涉及的費用。它特別適用於製作備份。您可以寫入 CD-R 光碟一次，但可以讀取多次。這就是為什麼該格式有時被稱為**一次寫入，多次讀取 (WORM)**。
- **創建。** CD-R 技術使用與 CD-ROM 相同的原理來創建光碟（圖 5.10）。以下列出了差異：
  a. 沒有母片或模具。
  b. 反射層由金而不是鋁製成。
  c. 聚碳酸酯中沒有物理凹坑（孔）：凹坑和平台只是模擬的。為了模擬凹坑和平台，在反射層和聚碳酸酯之間添加了一層額外的染料，類似於攝影中使用的材料。
  d. 由驅動器的 CD 燒錄器產生的高功率雷射束在染料中產生黑點，改變其化學成分，從而模擬凹坑。未被光束擊中的區域成為平台。
- **讀取。** CD-R 可以由 CD-ROM 或 CD-R 驅動器讀取。這意味著任何差異對驅動器來說都應該是透明的。相同的低功率雷射束通過模擬的凹坑和平台前方。對於平台，光束到達反射層並被反射。對於模擬凹坑，斑點是不透明的，因此光束無法反射回來。
- **格式和速度。** CD-R 的格式、容量和速度與 CD-ROM 相同。
- **應用。** 這項技術對於創建和分發少量光碟非常有吸引力。它對於製作存檔文件和備份也非常有用。

**CD-RW**
雖然 CD-R 已經非常流行，但它們只能寫入一次。為了覆寫先前的材料，新技術允許一種新型光碟，稱為**可重寫光碟 (CD-RW)**。它有時被稱為*可擦除光碟*。
- **創建。** CD-RW 技術使用與 CD-R 相同的原理來創建光碟（圖 5.11）。以下列出了差異：
  a. 該技術不使用染料，而是使用銀、銦、銻和碲的合金。這種合金有兩種穩定狀態：結晶（透明）和非晶（不透明）。
  b. 驅動器使用高功率雷射在合金中創建模擬凹坑（將其從結晶變為非晶）。
- **讀取。** 驅動器使用與 CD-ROM 和 CD-R 相同類型的低功率雷射束來檢測凹坑和平台。
- **擦除。** 驅動器使用中等功率的雷射束將凹坑變為平台。光束將位置從非晶狀態變為結晶狀態。
- **格式和速度。** CD-RW 的格式、容量和速度與 CD-ROM 相同。
- **應用。** 該技術無疑比 CD-R 技術更具吸引力。然而，CD-R 更受歡迎有兩個原因。首先，空白 CD-R 光碟比空白 CD-RW 光碟便宜。其次，在絕不能更改（無論是意外還是故意）已創建光碟的情況下，CD-R 更可取。

**DVD**
業界感到需要具有更高容量的數位儲存媒體。CD-ROM (650 MB) 的容量不足以儲存視訊資訊。市場上最新的光學記憶體儲存設備稱為**數位多功能光碟 (DVD)**。它使用類似於 CD-ROM 的技術，但有以下區別：
a. 凹坑更小：直徑為 0.4 微米，而不是 CD 中使用的 0.8 微米。
b. 磁軌彼此更靠近。
c. 光束是紅色雷射而不是紅外線。
d. DVD 使用一到兩個記錄層，可以是單面或雙面。
- **容量。** 這些改進導致更高的容量（表 5.3）。

**表 5.3 DVD 容量**
| 特徵 | 容量 |
|---|---|
| 單面，單層 | 4.7 GB |
| 單面，雙層 | 8.5 GB |
| 雙面，單層 | 9.4 GB |
| 雙面，雙層 | 17 GB |

- **壓縮。** DVD 技術使用 MPEG（參見第 15 章）進行壓縮。這意味著單面單層 DVD 可以容納 133 分鐘的高解析度視訊。這也包括音訊和字幕。
- **應用。** 今天，DVD 的高容量吸引了許多需要儲存大量資料的應用程式。

## 5.5 子系統互連
前面的章節概述了獨立電腦中三個子系統（CPU、主記憶體和 I/O）的特徵。在本節中，我們探討這三個子系統是如何互連的。互連扮演著重要的角色，因為資訊需要在這三個子系統之間交換。

### 5.5.1 連接 CPU 和記憶體
CPU 和記憶體通常由三組連接連接，每組稱為**匯流排 (bus)**：資料匯流排、位址匯流排和控制匯流排（圖 5.12）。

**資料匯流排**
**資料匯流排**由數個連接組成，每個連接一次傳輸 1 位元。連接數取決於電腦使用的字長。如果字是 32 位元（4 位元組），我們需要一條有 32 個連接的資料匯流排，以便可以同時傳輸一個字的所有 32 位元。

**位址匯流排**
**位址匯流排**允許存取記憶體中的特定字。位址匯流排中的連接數取決於記憶體的位址空間。如果記憶體有 $2^n$ 個字，位址匯流排需要一次攜帶 $n$ 位元。因此，它必須有 $n$ 個連接。

**控制匯流排**
**控制匯流排**傳遞 CPU 和記憶體之間的通訊。例如，必須有一個從 CPU 發送到記憶體的代碼，以指定讀取或寫入操作。控制匯流排中使用的連接數取決於電腦所需的控制命令總數。如果一台電腦有 $2^m$ 個控制動作，我們需要 $m$ 個連接用於控制匯流排，因為 $m$ 位元可以定義 $2^m$ 種不同的操作。

### 5.5.2 連接 I/O 設備
I/O 設備不能直接連接到連接 CPU 和記憶體的匯流排，因為 I/O 設備的性質與 CPU 和記憶體的性質不同。I/O 設備是機電、磁性或光學設備，而 CPU 和記憶體是電子設備。I/O 設備的運作速度也比 CPU/記憶體慢得多。需要某種中介來處理這種差異。因此，輸入/輸出設備透過**輸入/輸出控制器**或**介面**連接到匯流排。每個輸入/輸出設備都有一個特定的**控制器**（圖 5.13）。

**控制器**
控制器或介面橋接了 I/O 設備與 CPU 和記憶體之間性質的差距。控制器可以是串列或並列設備。串列控制器只有一條資料線，而並列控制器有數條資料連接，以便可以一次傳輸數個位元。
使用了幾種控制器。今天最常見的是 SCSI、FireWire、USB 和 HDMI。

**SCSI**
**小型電腦系統介面 (SCSI)** 最初於 1984 年為麥金塔電腦開發。今天它用於許多系統。它具有 8、16 或 32 個連接的並列介面。SCSI 介面提供菊花鏈連接，如圖 5.14 所示。鏈的兩端必須連接到稱為*終端器*的特殊設備，每個設備必須具有唯一的位址（目標 ID）。

**FireWire**
IEEE 標準 1394 定義了一種通常稱為 **FireWire (火線)** 的串列介面。它是一種高速串列介面，以封包形式傳輸資料，傳輸速率高達 50 MB/sec，最新版本則加倍。它可用於在菊花鏈或樹狀連接（僅使用一個連接）中連接多達 63 個設備。圖 5.15 顯示了輸入/輸出設備到 FireWire 控制器的連接。不需要像 SCSI 那樣的終端器。

**USB**
**通用序列匯流排 (USB)** 是 FireWire 的競爭對手。雖然命名法使用術語*匯流排*，但 USB 是一個串列控制器，將低速和高速設備連接到電腦匯流排。圖 5.16 顯示了 USB 控制器到匯流排的連接以及設備到控制器的連接。

多個設備可以連接到 USB 控制器，該控制器也被稱為*根集線器 (root hub)*。USB-2（USB 2.0 版）允許使用樹狀**拓撲**將多達 127 個設備連接到 USB 控制器，控制器作為樹的根，**集線器 (hubs)** 作為中間節點，設備作為末端節點。控制器（根集線器）與其他集線器的區別在於，控制器知道樹中存在其他集線器，而其他集線器只是簡單傳遞資料的被動設備。
設備可以輕鬆地從樹中移除或連接，而無需關閉電腦電源。這稱為*熱插拔*。當從系統中移除集線器時，與其連接的所有設備和其他集線器也會被移除。
USB 使用四根電線的電纜。兩根電線（+5 伏特和接地）用於為鍵盤或滑鼠等低功率設備提供電源。高功率設備需要連接到電源。集線器從匯流排獲取電力，並可以為低功率設備提供電力。另外兩根電線（絞合在一起以減少雜訊）用於攜帶資料、位址和控制信號。USB 使用兩種不同的連接器：A 和 B。A 連接器（下游連接器）是矩形的，用於連接到 USB 控制器或集線器。B 連接器（上游連接器）接近正方形，用於連接到設備。最近推出了兩種新的連接器，mini A 和 mini B，用於連接小型設備和筆記型電腦。
USB-2 提供三種資料傳輸速率：1.5 Mbps（百萬位元每秒）、12 Mbps 和 480 Mbps。低資料速率可用於鍵盤和滑鼠等慢速設備，中等資料速率用於印表機，高資料速率用於大容量儲存設備。

資料透過 USB 以封包形式傳輸（參見第 6 章）。每個封包包含位址部分（設備標識符）、控制部分和要傳輸到該設備的部分資料。所有設備都會收到相同的封包，但只有封包中定義了位址的那些設備才會接受它。
USB 3.0 是通用序列匯流排 (USB) 標準的另一個修訂版，用於電腦連接。USB 3.0 增加了一種稱為 *SuperSpeed* 的新傳輸模式，能夠以高達 4.8 Gbit/s 的速度傳輸資料。承諾將 USB 3.0 更新至 10 Gbit/s。

**HDMI**
**HDMI (高畫質多媒體介面)** 是現有類比視訊標準的數位替代品。它可用於將視訊資料、數位音訊資料從來源傳輸到相容的電腦顯示器、視訊投影機、數位電視或數位音訊設備。有許多可用的 HDMI 標準電纜，包括標準、增強、高畫質和 3D 視訊信號；多達八個通道的壓縮或未壓縮數位音訊；CEC (消費電子控制) 連接；以及乙太網路資料連接。

### 5.5.3 定址輸入/輸出設備
CPU 通常使用相同的匯流排從主記憶體和 I/O 設備讀取資料或向其寫入資料。唯一的區別在於指令。如果指令引用主記憶體中的字，則資料傳輸發生在主記憶體和 CPU 之間。如果指令標識 I/O 設備，則資料傳輸發生在 I/O 設備和 CPU 之間。有兩種處理 I/O 設備定址的方法：獨立 I/O 和記憶體映射 I/O。

**獨立 I/O**
在**獨立 I/O** 方法中，用於讀/寫記憶體的指令與用於讀/寫 I/O 設備的指令完全不同。有指令用於測試、控制、讀取和寫入 I/O 設備。每個 I/O 設備都有自己的位址。I/O 位址可以與記憶體位址重疊而不會產生任何歧義，因為指令本身是不同的。例如，CPU 可以使用命令「Read 101」從記憶體字 101 讀取，並使用命令「Input 101」從 I/O 設備 101 讀取。不會混淆，因為讀取命令用於從記憶體讀取，輸入命令用於從 I/O 設備讀取（圖 5.17）。

**記憶體映射 I/O**
在**記憶體映射 I/O** 方法中，CPU 將 I/O 控制器中的每個暫存器視為記憶體中的一個字。換句話說，CPU 沒有單獨的指令來從記憶體和 I/O 設備傳輸資料。例如，只有一個「Read」指令。如果位址定義了記憶體中的字，則從該字讀取資料。如果位址定義了 I/O 設備中的暫存器，則從該暫存器讀取資料。記憶體映射配置的優點是指令數量較少：所有記憶體指令都可用於 I/O 設備。缺點是部分記憶體位址空間被分配給 I/O 控制器中的暫存器。例如，如果我們有五個 I/O 控制器，每個有四個暫存器，則 20 個位址用於此目的。記憶體的大小減少了 20 個字。圖 5.18 顯示了記憶體映射 I/O 的概念。

## 5.6 程式執行
今天，通用電腦使用一組稱為*程式*的指令來處理資料。電腦執行程式以從輸入資料產生輸出資料。程式和資料都儲存在記憶體中。

**在本章末尾，我們給出了一些關於假設的簡單電腦如何執行程式的範例。**

### 5.6.1 機器週期
CPU 使用重複的**機器週期**來執行程式中的指令，從頭到尾逐一執行。一個簡化的週期可以由三個階段組成：**提取**、**解碼**和**執行**（圖 5.19）。

**提取**
在**提取**階段，控制單元命令系統將下一個指令複製到 CPU 中的指令暫存器中。要複製的指令位址保存在程式計數器暫存器中。複製後，程式計數器遞增以引用記憶體中的下一個指令。

**解碼**
週期中的第二個階段是**解碼**階段。當指令在指令暫存器中時，它由控制單元解碼。此解碼步驟的結果是系統將執行的某個操作的二進位代碼。

**執行**
指令解碼後，控制單元將任務命令發送到 CPU 中的組件。例如，控制單元可以告訴系統從記憶體載入（讀取）資料項目，或者 CPU 可以告訴 ALU 將兩個輸入暫存器的內容相加並將結果放入輸出暫存器。這是**執行**階段。

### 5.6.2 輸入/輸出操作
需要命令將資料從 I/O 設備傳輸到 CPU 和記憶體。由於 I/O 設備的運作速度比 CPU 慢得多，因此 CPU 的操作必須以某種方式與 I/O 設備同步。已經設計了三種用於此同步的方法：程式控制 I/O、中斷驅動 I/O 和直接記憶體存取 (DMA)。

**程式控制 I/O**
在**程式控制 I/O** 方法中，同步非常原始：CPU 等待 I/O 設備（圖 5.20）。

I/O 設備和 CPU 之間的資料傳輸由程式中的指令完成。當 CPU 遇到 I/O 指令時，在資料傳輸完成之前它不會做任何其他事情。CPU 不斷檢查 I/O 設備的狀態：如果設備準備好傳輸，則將資料傳輸到 CPU。如果設備未準備好，CPU 繼續檢查設備狀態，直到 I/O 設備準備好。這裡的大問題是 CPU 時間浪費在為每個要傳輸的資料單元檢查 I/O 設備的狀態上。請注意，資料在輸入操作後傳輸到記憶體，而資料在輸出操作前從記憶體傳輸。

**中斷驅動 I/O**
在**中斷驅動 I/O** 方法中，CPU 通知 I/O 設備傳輸即將發生，但它不會持續測試 I/O 設備的狀態。I/O 設備在準備好時通知（中斷）CPU。在此期間，CPU 可以做其他工作，例如運行其他程式或將資料從其他 I/O 設備傳輸或傳輸到其他 I/O 設備（圖 5.21）。
在這種方法中，CPU 時間不會浪費——CPU 可以在慢速 I/O 設備完成任務時做其他事情。請注意，像程式控制 I/O 一樣，此方法也在設備和 CPU 之間傳輸資料。資料在輸入操作後傳輸到記憶體，而資料在輸出操作前從記憶體傳輸。

**直接記憶體存取 (DMA)**
用於傳輸資料的第三種方法是**直接記憶體存取 (DMA)**。這種方法在高速 I/O 設備（如磁碟）和記憶體之間直接傳輸大量資料區塊，而無需通過 CPU。這需要一個 DMA 控制器來減輕 CPU 的部分功能。DMA 控制器具有暫存器，用於在記憶體傳輸之前和之後保存資料區塊。圖 5.22 顯示了 DMA 與資料、位址和控制匯流排的連接。

使用此方法進行 I/O 操作時，CPU 向 DMA 發送訊息。訊息包含傳輸類型（輸入或輸出）、記憶體位置的起始位址以及要傳輸的位元組數。然後 CPU 可用於其他工作（圖 5.23）。
準備好傳輸資料時，DMA 控制器通知 CPU 它需要控制匯流排。CPU 停止使用匯流排並讓控制器使用它們。在 DMA 和記憶體之間直接傳輸資料後，CPU 繼續其正常操作。請注意，在這種方法中，CPU 會閒置一段時間。然而，與其他方法相比，此閒置期間非常短——CPU 僅在 DMA 和記憶體之間的資料傳輸期間閒置，而在設備準備資料時不閒置。

## 5.7 不同的架構
最近幾十年，電腦的架構和組織經歷了許多變化。在本節中，我們討論一些與我們前面討論的簡單電腦架構不同的常見架構和組織。

### 5.7.1 CISC
CISC（發音為 *sisk*）代表**複雜指令集電腦 (CISC)**。CISC 架構背後的策略是擁有大量指令集，包括複雜指令。基於 CISC 的電腦編程比其他設計更容易，因為對於簡單和複雜的任務都有單一指令。因此，程式設計師不必編寫一組指令來完成複雜的任務。

指令集的複雜性使得 CPU 和控制單元的電路非常複雜。CISC 架構的設計者想出了解決方案來降低這種複雜性：編程在兩個層次上完成。機器語言中的指令不由 CPU 直接執行——CPU 僅執行簡單的操作，稱為*微操作*。複雜指令被轉換為一組這些簡單操作，然後由 CPU 執行。這需要添加稱為*微記憶體*的特殊記憶體，其中保存指令集中每個複雜指令的操作集。使用微操作的編程類型稱為*微編程*。
對 CISC 架構的一個反對意見是與微編程和存取微記憶體相關的開銷。然而，該架構的支持者認為這補償了機器層級較小的程式。CISC 架構的一個例子可以在 Intel 開發的 Pentium 系列處理器中看到。

### 5.7.2 RISC
RISC（發音為 *risk*）代表**精簡指令集電腦**。RISC 架構背後的策略是擁有一小組指令，這些指令執行最少數量的簡單操作。複雜指令使用簡單指令的子集來模擬。RISC 編程比其他設計更困難且更耗時，因為大多數複雜指令都是使用簡單指令模擬的。

### 5.7.3 管線化 (Pipelining)
我們已經了解到，電腦對每個指令使用三個階段：*提取*、*解碼*和*執行*。在早期的電腦中，每個指令的這三個階段需要串列完成。換句話說，指令 $n$ 需要在指令 $n + 1$ 開始其自己的階段之前完成所有這些階段。現代電腦使用一種稱為**管線化**的技術來提高**吞吐量**（在每個時間段內執行的指令總數）。這個想法是，如果控制單元可以同時執行這些階段中的兩個或三個，那麼下一個指令可以在前一個指令完成之前開始。
圖 5.24.a 顯示了在不使用管線化的電腦中如何處理三個連續指令。圖 5.24.b 顯示了管線化如何透過允許同時完成屬於不同指令的不同類型階段來增加電腦的吞吐量。換句話說，當 CPU 執行第一個指令的解碼階段時，它也可以執行第二個指令的提取階段。第一台電腦在特定時間段內平均可以執行 9 個階段，而管線化電腦在同一時間段內可以執行 24 個階段。如果我們假設每個階段使用相同的時間量，第一台電腦完成了 9/3 = 3 條指令，而第二台電腦完成了 24/3 = 8 條指令。因此，吞吐量增加了 8/3 或 266%。
當然，管線化並不像這樣簡單。存在一些問題，例如遇到跳轉指令時。在這種情況下，*管道*中的指令應該被丟棄。然而，新的 CPU 設計已經克服了大多數缺點。一些新的 CPU 設計甚至可以同時執行多個提取週期。

### 5.7.4 平行處理
傳統上，電腦只有一個控制單元、一個算術邏輯單元和一個記憶體單元。隨著技術的發展和電腦硬體成本的下降，今天我們可以擁有一台具有多個控制單元、多個算術邏輯單元和多個記憶體單元的電腦。這個想法被稱為*平行處理*。像管線化一樣，平行處理可以提高吞吐量。
**平行處理**涉及許多不同的技術。M. J. Flynn 提出的分類法給出了平行處理的一般視圖。這種分類法將電腦的組織（在處理資料方面）分為四類，如圖 5.25 所示。根據 Flynn 的說法，平行處理可能發生在資料流、指令流或兩者中。

**SISD 組織**
**單指令流、單資料流 (SISD)** 組織代表一台具有一個控制單元、一個算術邏輯單元和一個多重記憶體單元的電腦。指令循序執行，每個指令可以存取資料流中的一個或多個資料項目。我們在本章前面介紹的簡單電腦就是 SISD 組織的一個例子。圖 5.26 顯示了 SISD 組織的配置概念。

**SIMD 組織**
**單指令流、多資料流 (SIMD)** 組織代表一台具有一個控制單元、多個處理單元和多個記憶體單元的電腦。所有處理器單元從控制單元接收相同的指令，但對不同的資料項目進行操作。同時對資料陣列進行操作的陣列處理器屬於此類別。圖 5.27 顯示了 SIMD 組織的概念和實作。

**MISD 組織**
**多指令流、單資料流 (MISD)** 架構是一種屬於多個指令流的幾個指令同時在同一資料流上操作的架構。圖 5.28 顯示了這個概念，但從未實作過。

**MIMD 組織**
**多指令流、多資料流 (MIMD)** 架構是一種屬於多個指令流的幾個指令同時在多個資料流上操作（每個指令在一個資料流上）的架構。圖 5.29 顯示了概念和實作。MIMD 組織被一些專家認為是真正的平行處理架構。在這種架構中，可以同時執行多個任務。該架構可以使用單一共享記憶體或多個記憶體區段。

平行處理已發現一些應用，主要是在科學界，如果使用傳統電腦架構完成一項任務可能需要數小時或數天。這方面的一些例子可以在超大型矩陣的乘法、用於天氣預報的大量資料的同時處理或太空飛行模擬中找到。

## 5.8 一台簡單的電腦
為了解釋電腦的架構及其指令處理，我們介紹一台簡單的（不切實際的）電腦，如圖 5.30 所示。我們的簡單電腦有三個組件：CPU、記憶體和輸入/輸出子系統。

### 5.8.1 CPU
CPU 本身分為三個部分：資料暫存器、算術邏輯單元 (ALU) 和控制單元。

**資料暫存器**
有 16 個 16 位元資料暫存器，十六進位位址為 $(0, 1, 2, ..., F)_{16}$，但我們稱之為 $R_0$ 到 $R_{15}$。在大多數指令中，它們保存 16 位元資料，但在某些指令中，它們可能保存其他資訊。

**控制單元**
控制單元具有控制 ALU 操作、存取記憶體和存取 I/O 子系統的電路。此外，它有兩個專用暫存器：程式計數器和指令暫存器。程式計數器 (PC) 只能保存八個位元，它追蹤下一個要執行的指令。PC 的內容指向主記憶體中保存下一個程式指令的記憶體位置的位址。在每個機器週期之後，程式計數器加一以指向下一個程式指令。指令暫存器 (IR) 保存一個 16 位元值，這是當前週期的編碼指令。

### 5.8.2 主記憶體
主記憶體有 256 個 16 位元記憶體位置，二進位位址為 $(00000000 \\text{ 到 } 11111101)_2$ 或十六進位位址為 $(00 \\text{ 到 } FD)_{16}$。主記憶體同時保存資料和程式指令。前 64 個位置 $(00 \\text{ 到 } 3F)_{16}$ 專用於程式指令。任何程式的程式指令都儲存在連續的記憶體位置中。記憶體位置 $(40 \\text{ 到 } FD)_{16}$ 用於儲存資料。

### 5.8.3 輸入/輸出子系統
我們的簡單電腦有一個非常原始的輸入/輸出子系統。該子系統由鍵盤和螢幕組成。雖然我們在圖 5.30 中將鍵盤和螢幕顯示在單獨的方框中，但該子系統在位址方面是記憶體的一部分。這些設備具有記憶體映射位址，如本章前面所討論的。我們假設鍵盤（作為輸入設備）和螢幕（作為唯一的輸出設備）就像記憶體位置一樣，位址分別為 $(FE)_{16}$ 和 $(FF)_{16}$，如圖所示。換句話說，我們假設它們表現為 16 位元暫存器，像記憶體位置一樣與 CPU 互動。這兩個設備將資料從外部世界傳輸到 CPU，反之亦然。

### 5.8.4 指令集
我們的簡單電腦能夠擁有一組 16 個指令，儘管我們只使用其中的 14 個指令。每個電腦指令由兩部分組成：**操作碼 (opcode)** 和 **運算元 (operand(s))**。操作碼指定要對運算元執行的操作類型。每個指令由 16 位元組成，分為四個 4 位元欄位。最左邊的欄位包含操作碼，其他三個欄位包含運算元或運算元的位址，如圖 5.31 所示。

指令列在下表 5.4 中。請注意，並非每個指令都需要三個運算元。任何不需要的運算元欄位都填入 $(0)_{16}$。例如，停止指令的所有三個運算元欄位，以及移動和 NOT 指令的最後一個欄位，都填入 $(0)_{16}$。另請注意，暫存器位址由單個十六進位數字描述，因此使用單個欄位，但記憶體位置由兩個十六進位數字描述，使用兩個欄位。
有兩個加法指令：一個用於加整數 (ADDI)，一個用於加浮點數 (ADDF)。如果我們使用位址 $(FE)_{16}$ 作為 LOAD 指令的第二個運算元，簡單電腦可以從鍵盤獲取輸入。同樣，如果我們使用位址 $(FF)_{16}$ 作為 STORE 指令的第二個運算元，電腦將輸出發送到螢幕。如果 ROTATE 指令的第三個運算元是 0，則指令將 R 中的位元模式循環向右旋轉 $n$ 位：如果第三個運算元是 1，則向左旋轉。我們還包括了一個遞增 (INC) 和一個遞減 (DEC) 指令。

**表 5.4 簡單電腦的指令列表**
| 指令 | 代碼 $d_1$ | 運算元 $d_2, d_3, d_4$ | 動作 |
|---|---|---|---|
| HALT | 0 | | 停止程式執行 |
| LOAD | 1 | $R_D$ $M_S$ | $R_D \\leftarrow M_S$ |
| STORE | 2 | $M_D$ $R_S$ | $M_D \\leftarrow R_S$ |
| ADDI | 3 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} + R_{S2}$ |
| ADDF | 4 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} + R_{S2}$ |
| MOVE | 5 | $R_D$ $R_S$ | $R_D \\leftarrow R_S$ |
| NOT | 6 | $R_D$ $R_S$ | $R_D \\leftarrow \\overline{R_S}$ |
| AND | 7 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} \\text{ AND } R_{S2}$ |
| OR | 8 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} \\text{ OR } R_{S2}$ |
| XOR | 9 | $R_D$ $R_{S1}$ $R_{S2}$ | $R_D \\leftarrow R_{S1} \\text{ XOR } R_{S2}$ |
| INC | A | $R$ | $R \\leftarrow R + 1$ |
| DEC | B | $R$ | $R \\leftarrow R - 1$ |
| ROTATE | C | $R$ $n$ 0 或 1 | Rot$_n$ $R$ |
| JUMP | D | $R$ $n$ | 如果 $R_0 \\neq R$ 則 PC = $n$，否則繼續 |

圖例：
$R_S, R_{S1}, R_{S2}$：來源暫存器的十六進位位址
$R_D$：目的暫存器的十六進位位址
$M_S$：來源記憶體位置的十六進位位址
$M_D$：目的記憶體位置的十六進位位址
$n$：十六進位數字
$d_1, d_2, d_3, d_4$：第一、第二、第三和第四個十六進位數字

### 5.8.5 處理指令
我們的簡單電腦，像大多數電腦一樣，使用機器週期。一個週期由三個階段組成：*提取*、*解碼*和*執行*。在提取階段，位址由 PC 決定的指令從記憶體中獲取並載入到 IR 中。然後 PC 遞增以指向下一個指令。在*解碼*階段，IR 中的指令被解碼，所需的運算元從暫存器或記憶體中提取。在*執行*階段，指令被執行，結果被放置在適當的記憶體位置或暫存器中。第三階段完成後，控制單元再次開始週期，但現在 PC 指向下一個指令。該過程持續進行，直到 CPU 達到 HALT 指令。

**一個例子**
讓我們展示我們的簡單電腦如何將兩個整數 A 和 B 相加並產生結果 C。我們假設整數採用二的補數格式。在數學上，我們將此運算表示為：
$C = A + B$
為了解決這個問題，對於簡單電腦來說，必須將前兩個整數保存在兩個暫存器中（例如 $R_0$ 和 $R_1$），並將運算結果保存在第三個暫存器中（例如 $R_2$）。ALU 只能對儲存在 CPU 資料暫存器中的資料進行操作。然而，大多數電腦，包括我們的簡單電腦，CPU 中的暫存器數量有限。如果資料項目數量很大，並且它們應該在程式持續期間留在電腦中，最好將它們儲存在記憶體中，僅暫時將它們帶到暫存器。所以我們假設前兩個整數儲存在記憶體位置 $(40)_{16}$ 和 $(41)_{16}$，結果應儲存在記憶體位置 $(42)_{16}$。這意味著兩個整數需要載入到 CPU，結果需要儲存在記憶體中。因此，一個執行簡單加法的簡單程式需要五個指令，如下所示：

1.  將 $M_{40}$ 的內容載入暫存器 $R_0$ ($R_0 \\leftarrow M_{40}$)。
2.  將 $M_{41}$ 的內容載入暫存器 $R_1$ ($R_1 \\leftarrow M_{41}$)。
3.  將 $R_0$ 和 $R_1$ 的內容相加並將結果放入 $R_2$ ($R_2 \\leftarrow R_0 + R_1$)。
4.  將內容 $R_2$ 儲存在 $M_{42}$ ($M_{42} \\leftarrow R_2$)。
5.  停止。

在我們簡單電腦的語言中，這五個指令編碼為：

| 代碼 | 解釋 |
|---|---|
| $(1040)_{16}$ | 1: LOAD 0: $R_0$ 40: $M_{40}$ |
| $(1141)_{16}$ | 1: LOAD 1: $R_1$ 41: $M_{41}$ |
| $(3201)_{16}$ | 3: ADDI 2: $R_2$ 0: $R_0$ 1: $R_1$ |
| $(2422)_{16}$ | 2: STORE 42: $M_{42}$ 2: $R_2$ |
| $(0000)_{16}$ | 0: HALT |

### 5.8.6 儲存程式和資料
為了遵循馮·諾伊曼模型，我們需要將程式和資料儲存在記憶體中。我們可以將這五行程式儲存在記憶體中，從位置 $(00)_{16}$ 到 $(04)_{16}$ 開始。我們已經知道資料需要儲存在記憶體位置 $(40)_{16}$、$(41)_{16}$ 和 $(42)_{16}$。

### 5.8.7 週期
我們的電腦每個指令使用一個週期。如果我們有一個包含五個指令的小程式，我們需要五個週期。我們也知道每個週期通常由三個步驟組成：*提取*、*解碼*、*執行*。暫時假設我們需要加 $161 + 254 = 415$。數字在記憶體中顯示為十六進位，即 $(00A1)_{16}$、$(00FE)_{16}$ 和 $(019F)_{16}$。

**週期 1**
在第一個週期開始時（圖 5.32），PC 指向程式的第一個指令，位於記憶體位置 $(00)_{16}$。控制單元經歷三個步驟：
1.  控制單元*提取*儲存在記憶體位置 $(00)_{16}$ 的指令並將其放入 IR。此步驟後，PC 的值遞增。
2.  控制單元將指令 $(1040)_{16}$ *解碼*為 $R_0 \\leftarrow M_{40}$。
3.  控制單元*執行*指令，這意味著儲存在記憶體位置 (40) 的整數副本被載入到暫存器 $R_0$。

**週期 2**
在第二個週期開始時（圖 5.33），PC 指向程式的第二個指令，位於記憶體位置 $(01)_{16}$。控制單元經歷三個步驟：
1.  控制單元*提取*儲存在記憶體位置 $(01)_{16}$ 的指令並將其放入 IR。此步驟後，PC 的值遞增。
2.  控制單元將指令 $(1141)_{16}$ *解碼*為 $R_1 \\leftarrow M_{41}$。
3.  控制單元*執行*指令，這意味著儲存在記憶體位置 $(41)_{16}$ 的整數副本被載入到暫存器 $R_1$。

**週期 3**
在第三個週期開始時（圖 5.34），PC 指向程式的第三個指令，位於記憶體位置 $(02)_{16}$。控制單元經歷三個步驟：
1.  控制單元*提取*儲存在記憶體位置 $(02)_{16}$ 的指令並將其放入 IR。此步驟後，PC 的值遞增。
2.  控制單元將指令 $(3201)_{16}$ *解碼*為 $R_2 \\leftarrow R_0 + R_1$。
3.  控制單元*執行*指令，這意味著 $R_0$ 的內容被加到 $R_1$ 的內容（由 ALU 執行），結果放入 $R_2$。

**週期 4**
在第四個週期開始時（圖 5.35），PC 指向程式的第四個指令，位於記憶體位置 $(03)_{16}$。控制單元經歷三個步驟：
1.  控制單元*提取*儲存在記憶體位置 $(03)_{16}$ 的指令並將其放入 IR。此步驟後，PC 的值遞增。
2.  控制單元將指令 $(2422)_{16}$ *解碼*為 $M_{42} \\leftarrow R_2$。
3.  控制單元*執行*指令，這意味著暫存器 $R_2$ 中的整數副本被儲存在記憶體位置 $(42)_{16}$。

**週期 5**
在第五個週期開始時（圖 5.36），PC 指向程式的第五個指令，位於記憶體位置 $(04)_{16}$。控制單元經歷三個步驟：
1.  控制單元*提取*儲存在記憶體位置 $(04)_{16}$ 的指令並將其放入 IR。此步驟後，PC 的值遞增。
2.  控制單元將指令 $(0000)_{16}$ *解碼*為 Halt。
3.  控制單元*執行*指令，這意味著電腦停止。

### 5.8.8 另一個例子
在前面的例子中，我們假設要相加的兩個整數已經在記憶體中。我們也假設加法結果將保存在記憶體中。你可能會問我們如何將想要相加的兩個整數儲存在記憶體中，或者當結果儲存在記憶體中時我們如何使用它。在實際情況中，我們使用鍵盤等輸入設備將前兩個整數輸入到記憶體中，並透過螢幕等輸出設備顯示第三個整數。透過輸入設備獲取資料通常稱為*讀取*操作，而將資料發送到輸出設備通常稱為*寫入*操作。為了使我們之前的程式更實用，我們需要如下修改它：

1.  讀取一個整數到 $M_{40}$。
2.  $R_0 \\leftarrow M_{40}$。
3.  讀取一個整數到 $M_{41}$。
4.  $R_1 \\leftarrow M_{41}$。
5.  $R_2 \\leftarrow R_0 + R_1$。
6.  $M_{42} \\leftarrow R_2$。
7.  從 $M_{42}$ 寫入整數。
8.  停止。

有多種方法可以實現輸入和輸出。今天大多數電腦直接從輸入設備將資料傳輸到記憶體，並直接從記憶體將資料傳輸到輸出設備。然而，我們的簡單電腦不是其中之一。在我們的電腦中，我們可以使用 LOAD 和 STORE 指令模擬讀取和寫入操作。此外，LOAD 和 STORE 讀取資料輸入到 CPU 並從 CPU 寫入資料。我們需要兩個指令將資料讀入記憶體或將資料寫出記憶體。讀取操作是：

$R \\leftarrow M_{FE}$ 因為假設鍵盤是記憶體位置 $(FE)_{16}$
$M \\leftarrow R$

寫入操作是：

$R \\leftarrow M$
$M_{FF} \\leftarrow R$ 因為假設螢幕是記憶體位置 $(FF)_{16}$

你可能會問，如果操作應該在 CPU 中完成，為什麼我們將資料從鍵盤傳輸到 CPU，然後傳輸到記憶體，然後再傳輸到 CPU 進行處理？我們可以直接將資料傳輸到 CPU 嗎？答案是對於這個小問題我們可以這樣做，但原則上我們不應該這樣做。想想如果我們需要加 1000 個數字或排序 1000000 個整數會發生什麼。CPU 中的暫存器數量是有限的（在真實電腦中可能有數百個，但仍然不夠）。

**輸入操作必須始終將資料從輸入設備讀入記憶體：輸出操作必須始終將資料從記憶體寫入輸出設備。**

考慮到這一點，程式編碼為：
1 $(1FFE)_{16}$   5 $(1040)_{16}$   9 $(1F42)_{16}$
2 $(240F)_{16}$   6 $(1141)_{16}$   10 $(2FFF)_{16}$
3 $(1FFE)_{16}$   7 $(3201)_{16}$   11 $(0000)_{16}$
4 $(241F)_{16}$   8 $(2422)_{16}$

操作 1 到 4 是輸入，操作 9 和 10 是輸出。當我們運行這個程式時，它等待使用者在鍵盤上輸入兩個整數並按 Enter 鍵。然後程式計算總和並在螢幕上顯示結果。

### 5.8.9 可重用性
電腦相對於不可程式化計算器的優點之一是我們可以反覆使用同一個程式。我們可以多次運行程式，每次輸入不同的輸入並獲得不同的輸出。

## 5.9 章末材料
### 5.9.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Englander, I. *The Architecture of Computer Hardware and Systems Software*, Hoboken, NJ: Wiley, 2003
- Mano, M. *Computer System Architecture*, Upper Saddle River, NJ: Prentice-Hall, 1993
- Null, L. and Lobur, J. *Computer Organization and Architecture*, Sudbury, MA: Jones and Bartlett, 2003
- Hamacher, C., Vranesic, Z. and Zaky, S. *Computer Organization*, New York: McGraw-Hill, 2002
- Warford, S. *Computer Systems*, Sudbury, MA: Jones and Bartlett, 2005
- Ercegovac, M., Lang, T. and Moreno, J. *Introduction to Digital Systems*, Hoboken, NJ: Wiley, 1998
- Cragon, H. *Computer Architecture and Implementation*, Cambridge: Cambridge University Press, 2000
- Stallings, W. *Computer Organization and Architecture*, Upper Saddle River, NJ: Prentice-Hall, 2002

### 5.9.2 關鍵詞
- 位址匯流排 (address bus)
- 位址空間 (address space)
- 算術邏輯單元 (ALU)
- 匯流排 (bus)
- 快取記憶體 (cache memory)
- 中央處理單元 (CPU)
- 光碟 (CD)
- 唯讀光碟 (CD-ROM)
- 可錄式光碟 (CD-R)
- 複雜指令集電腦 (CISC)
- 控制匯流排 (control bus)
- 控制器 (controller)
- 控制單元 (control unit)
- 資料匯流排 (data bus)
- 解碼 (decode)
- 數位多功能光碟 (DVD)
- 直接記憶體存取 (DMA)
- 動態 RAM (DRAM)
- 電子可抹除可程式化唯讀記憶體 (EEPROM)
- 可抹除可程式化唯讀記憶體 (EPROM)
- 執行 (execute)
- 提取 (fetch)
- FireWire (火線)
- HDMI (高畫質多媒體介面)
- 集線器 (hub)
- 輸入/輸出控制器 (input/output controller)
- 輸入/輸出子系統 (input/output subsystem)
- 指令暫存器 (instruction register)
- 中斷驅動 I/O (interrupt-driven I/O)
- 磁區間隙 (intersector gap)
- 磁軌間隙 (intertrack gap)
- 獨立 I/O (isolated I/O)
- 平台 (land)
- 機器週期 (machine cycle)
- 可程式化唯讀記憶體 (PROM)
- 磁碟 (magnetic disk)
- 磁帶 (magnetic tape)
- 主記憶體 (main memory)
- 母片 (master disk)
- 記憶體映射 I/O (memory mapped I/O)
- 螢幕 (monitor)
- 多指令流、多資料流 (MIMD)
- 多指令流、單資料流 (MISD)
- 非儲存設備 (nonstorage device)
- 光學儲存設備 (optical storage device)
- 輸出設備 (output device)
- 平行處理 (parallel processing)
- 管線化 (pipelining)
- 凹坑 (pit)
- 聚碳酸酯樹脂 (polycarbonate resin)
- 印表機 (printer)
- 程式計數器 (program counter)
- 程式控制 I/O (programmed I/O)
- 隨機存取記憶體 (RAM)
- 唯讀記憶體 (ROM)
- 讀/寫頭 (read/write head)
- 精簡指令集電腦 (RISC)
- 暫存器 (register)
- 轉速 (rotational speed)
- 磁區 (sector)
- 搜尋時間 (seek time)
- 單指令流、多資料流 (SIMD)
- 靜態 RAM (SRAM)
- 儲存設備 (storage device)
- 吞吐量 (throughput)
- 拓撲 (topology)
- 磁軌 (track)
- 傳輸時間 (transfer time)
- 通用序列匯流排 (USB)
- 一次寫入，多次讀取 (WORM)

### 5.9.3 摘要
- 組成電腦的部分可以分為三大類或子系統：中央處理單元 (CPU)、主記憶體和輸入/輸出子系統。
- 中央處理單元 (CPU) 對資料執行操作。它有三個部分：算術邏輯單元 (ALU)、控制單元和一組暫存器。算術邏輯單元 (ALU) 對資料執行邏輯、移位和算術運算。暫存器是快速的獨立儲存位置，用於暫時保存資料。控制單元控制 CPU 每個部分的操作。
- 主記憶體是一組儲存位置，每個位置都有一個唯一的標識符，稱為位址。資料以稱為字的位元組為單位傳輸到記憶體和從記憶體傳輸出來。記憶體中唯一可識別位置的總數稱為位址空間。存在兩種記憶體類型：隨機存取記憶體 (RAM) 和唯讀記憶體 (ROM)。
- 被稱為輸入/輸出 (I/O) 子系統的設備集合允許電腦與外部世界通訊，即使在電源關閉時也能儲存程式和資料。輸入/輸出設備可分為兩大類：非儲存設備和儲存設備。非儲存設備允許 CPU/記憶體與外部世界通訊。儲存設備可以儲存大量資訊以供日後檢索。儲存設備分為磁性或光學設備。
- 電腦的三個子系統的互連扮演著重要的角色，因為資訊需要在這些子系統之間交換。CPU 和記憶體通常由三組連接連接，每組稱為匯流排：資料匯流排、位址匯流排和控制匯流排。輸入/輸出設備透過輸入/輸出控制器或介面連接到匯流排。使用了幾種控制器。今天最常見的是 SCSI、FireWire 和 USB。
- 有兩種處理 I/O 設備定址的方法：獨立 I/O 和記憶體映射 I/O。在獨立 I/O 方法中，用於讀/寫記憶體的指令與用於讀/寫輸入/輸出設備的指令不同。在記憶體映射 I/O 方法中，CPU 將 I/O 控制器中的每個暫存器視為記憶體中的一個字。
- 今天，通用電腦使用一組稱為程式的指令來處理資料。電腦執行程式以從輸入資料產生輸出資料。程式和資料都儲存在記憶體中。CPU 使用重複的機器週期來執行程式中的指令，從頭到尾逐一執行。一個簡化的週期可以由三個階段組成：提取、解碼和執行。
- 已經設計了三種用於 I/O 設備和 CPU 之間同步的方法：程式控制 I/O、中斷驅動 I/O 和直接記憶體存取 (DMA)。
- 最近幾十年，電腦的架構和組織經歷了許多變化。我們可以將電腦架構分為兩大類：CISC（複雜指令集電腦）和 RISC（精簡指令集電腦）。
- 現代電腦使用一種稱為管線化的技術來提高其吞吐量。這個想法是允許控制單元同時執行兩個或三個階段，這意味著下一個指令的處理可以在前一個指令完成之前開始。
- 傳統上，電腦只有一個控制單元、一個算術邏輯單元和一個記憶體單元。平行處理可以透過使用多個指令流來處理多個資料流來提高吞吐量。
`
};
