import type { GlossaryTerm } from '../types';

export const glossaryData: GlossaryTerm[] = [
  // Chapter 1
  { term: 'Algorithm', chinese: '演算法', category: 'Computer Basics', chapter: '1', importance: 3, definition: 'A step-by-step method for solving a problem or doing a task.' },
  { term: 'ALU (Arithmetic Logic Unit)', chinese: '算術邏輯單元', category: 'Computer Architecture', chapter: '1', importance: 3, definition: 'The part of a computer system that performs arithmetic and logic operations on data.' },
  { term: 'Computer Language', chinese: '電腦語言', category: 'Computer Basics', chapter: '1', importance: 2, definition: 'A set of predefined words that are combined into a program according to predefined rules (syntax).' },
  { term: 'Control Unit', chinese: '控制單元', category: 'Computer Architecture', chapter: '1', importance: 3, definition: 'The component of a CPU that interprets the instructions and controls the flow of data.' },
  { term: 'Data Processor', chinese: '資料處理器', category: 'Computer Basics', chapter: '1', importance: 1, definition: 'An entity that inputs data, processes it, and outputs the result.' },
  { term: 'Input/Output (I/O) Subsystem', chinese: '輸入/輸出子系統', category: 'Computer Architecture', chapter: '1', importance: 2, definition: 'The part of the computer’s organization that receives data from the outside and sends data to the outside.' },
  { term: 'Instruction', chinese: '指令', category: 'Computer Architecture', chapter: '1', importance: 2, definition: 'A command that tells a computer what to do.' },
  { term: 'Integrated Circuit', chinese: '積體電路', category: 'Computer Architecture', chapter: '1', importance: 2, definition: 'Transistors, wiring, and other components on a single chip.' },
  { term: 'Memory', chinese: '記憶體', category: 'Computer Architecture', chapter: '1', importance: 3, definition: 'A device or system that is used to store information for immediate use in a computer.' },
  { term: 'Program', chinese: '程式', category: 'Computer Basics', chapter: '1', importance: 3, definition: 'A set of instructions in a computer language that tells the computer what to do with data.' },
  { term: 'Software Engineering', chinese: '軟體工程', category: 'Computer Basics', chapter: '1', importance: 2, definition: 'The systematic application of engineering principles to the design, development, testing, and maintenance of software.' },
  { term: 'Turing Model', chinese: '圖靈模型', category: 'Computer Basics', chapter: '1', importance: 2, definition: 'A computer model based on Alan Turing’s theoretical definition of a computer.' },
  { term: 'von Neumann model', chinese: '馮·諾伊曼模型', category: 'Computer Basics', chapter: '1', importance: 3, definition: 'A computer architecture model that uses a single storage structure to hold both instructions and data.' },

  // Chapter 2
  { term: 'Base / Radix', chinese: '基底', category: 'Number Systems', chapter: '2', importance: 3, definition: 'The number of unique digits, including zero, used to represent numbers in a positional numeral system.' },
  { term: 'Binary', chinese: '二進位', category: 'Number Systems', chapter: '2', importance: 3, definition: 'A base-2 number system, which uses only two symbols: typically 0 and 1.' },
  { term: 'Octal', chinese: '八進位', category: 'Number Systems', chapter: '2', importance: 2, definition: 'A base-8 number system, which uses the digits 0 to 7.' },
  { term: 'Hexadecimal', chinese: '十六進位', category: 'Number Systems', chapter: '2', importance: 3, definition: 'A base-16 number system, which uses sixteen distinct symbols, most often 0-9 and A-F.' },

  // Chapter 3
  { term: 'Bit', chinese: '位元', category: 'Data Representation', chapter: '3', importance: 3, definition: 'Acronym for binary digit. In a computer, the basic storage unit with a value of either 0 or 1.' },
  { term: 'Byte', chinese: '位元組', category: 'Data Representation', chapter: '3', importance: 3, definition: 'A unit of digital information that most commonly consists of eight bits.' },
  { term: 'ASCII', chinese: 'ASCII碼', category: 'Data Representation', chapter: '3', importance: 2, definition: 'A character encoding standard for electronic communication. ASCII codes represent text in computers, telecommunications equipment, and other devices.' },
  { term: 'Unicode', chinese: '萬國碼', category: 'Data Representation', chapter: '3', importance: 2, definition: 'An international character encoding standard for use with different languages and scripts, by which each letter, digit, or symbol is assigned a unique numeric value.' },
  { term: 'Pixel', chinese: '像素', category: 'Data Representation', chapter: '3', importance: 3, definition: 'The smallest unit of an image, representing a single point.' },
  { term: 'Bitmap Graphic', chinese: '點陣圖', category: 'Data Representation', chapter: '3', importance: 2, definition: 'A digital image composed of a matrix of dots (pixels). When viewed at 100%, each dot corresponds to an individual pixel on a display.' },
  { term: 'Vector Graphic', chinese: '向量圖', category: 'Data Representation', chapter: '3', importance: 2, definition: 'Computer graphics images that are defined in terms of 2D points, which are connected by lines and curves to form polygons and other shapes.' },
  { term: 'Floating-Point Representation', chinese: '浮點數表示法', category: 'Data Representation', chapter: '3', importance: 3, definition: 'A number representation in which the position of the decimal point is floated to create better precision. Normally used to represent real numbers in a computer.' },
  { term: 'Excess Representation', chinese: '超額表示法', category: 'Data Representation', chapter: '3', importance: 1, definition: 'A format for representing signed numbers where the value is stored as the sum of the number and a "bias" or "excess" value, used for exponents in floating-point numbers.' },

  // Chapter 4
  { term: 'Two\'s Complement', chinese: '二的補數', category: 'Data Representation', chapter: '4', importance: 3, definition: 'A mathematical operation on binary numbers, and is the most common method of representing signed integers on computers.' },
  { term: 'Mask', chinese: '遮罩', category: 'Data Representation', chapter: '4', importance: 2, definition: 'Data that are used for bitwise operations, particularly in a bit field. Using a mask, multiple bits in a byte can be set on, off or inverted in a single bitwise operation.' },
  { term: 'Shift Operation', chinese: '移位運算', category: 'Data Representation', chapter: '4', importance: 2, definition: 'An operation that moves the bits in a pattern, changing their positions to the left or to the right.' },

  // Chapter 5
  { term: 'CPU (Central Processing Unit)', chinese: '中央處理器', category: 'Computer Architecture', chapter: '5', importance: 3, definition: 'The electronic circuitry that executes instructions comprising a computer program.' },
  { term: 'Register', chinese: '暫存器', category: 'Computer Architecture', chapter: '5', importance: 2, definition: 'A small amount of storage available as part of a CPU or other digital processor.' },
  { term: 'RAM (Random Access Memory)', chinese: '隨機存取記憶體', category: 'Computer Architecture', chapter: '5', importance: 3, definition: 'A form of computer memory that can be read and changed in any order, typically used to store working data and machine code.' },
  { term: 'ROM (Read-Only Memory)', chinese: '唯讀記憶體', category: 'Computer Architecture', chapter: '5', importance: 2, definition: 'A type of non-volatile memory used in computers and other electronic devices. Data stored in ROM cannot be electronically modified after the manufacture of the memory device.' },
  { term: 'Cache Memory', chinese: '快取記憶體', category: 'Computer Architecture', chapter: '5', importance: 3, definition: 'A small, fast memory used to hold data items that are being processed, placed between the CPU and main memory.' },
  { term: 'Bus', chinese: '匯流排', category: 'Computer Architecture', chapter: '5', importance: 2, definition: 'The physical channel that links hardware components in a computer, such as data bus, address bus, and control bus.' },
  { term: 'Fetch-Decode-Execute Cycle', chinese: '提取-解碼-執行週期', category: 'Computer Architecture', chapter: '5', importance: 3, definition: 'The basic operational process of a computer. The CPU fetches an instruction from memory, decodes it to determine the operation, and executes it.' },
  { term: 'DMA (Direct Memory Access)', chinese: '直接記憶體存取', category: 'Computer Architecture', chapter: '5', importance: 2, definition: 'A feature of computer systems that allows certain hardware subsystems to access main system memory (RAM) independently of the central processing unit (CPU).' },
  
  // Chapter 6
  { term: 'TCP/IP Model', chinese: 'TCP/IP 模型', category: 'Networking', chapter: '6', importance: 3, definition: 'A conceptual model and set of communications protocols used in the Internet and similar computer networks. It is commonly known as TCP/IP because the foundational protocols are the Transmission Control Protocol (TCP) and the Internet Protocol (IP).' },
  { term: 'LAN (Local Area Network)', chinese: '區域網路', category: 'Networking', chapter: '6', importance: 3, definition: 'A network connecting devices inside a limited area, such as a home, office, or building.' },
  { term: 'WAN (Wide Area Network)', chinese: '廣域網路', category: 'Networking', chapter: '6', importance: 3, definition: 'A network that spans a large geographical distance, such as a city, country, or even the world.' },
  { term: 'Router', chinese: '路由器', category: 'Networking', chapter: '6', importance: 3, definition: 'A device operating at the network layer that connects independent networks and routes packets based on their destination address.' },
  { term: 'Domain Name System (DNS)', chinese: '網域名稱系統', category: 'Networking', chapter: '6', importance: 3, definition: 'A hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network.' },
  { term: 'FTP (File Transfer Protocol)', chinese: '檔案傳輸協定', category: 'Networking', chapter: '6', importance: 1, definition: 'A standard network protocol used for the transfer of computer files between a client and server on a computer network.' },
  { term: 'HTTP (Hypertext Transfer Protocol)', chinese: '超文字傳輸協定', category: 'Networking', chapter: '6', importance: 2, definition: 'An application protocol for distributed, collaborative, hypermedia information systems that allows users to communicate data on the World Wide Web.' },

  // Chapter 7
  { term: 'Operating System (OS)', chinese: '作業系統', category: 'Operating Systems', chapter: '7', importance: 3, definition: 'Software that manages computer hardware and software resources and provides common services for computer programs.' },
  { term: 'Multiprogramming', chinese: '多重程式設計', category: 'Operating Systems', chapter: '7', importance: 2, definition: 'A technique that allows more than one program to reside in memory while being processed, improving CPU utilization.' },
  { term: 'Paging', chinese: '分頁', category: 'Operating Systems', chapter: '7', importance: 2, definition: 'A memory management scheme by which a computer stores and retrieves data from secondary storage for use in main memory. In this scheme, the operating system retrieves data from secondary storage in same-size blocks called pages.' },
  { term: 'Deadlock', chinese: '死結', category: 'Operating Systems', chapter: '7', importance: 2, definition: 'A state in which each member of a group is waiting for another member, including itself, to take action, such as sending a message or more commonly releasing a lock.' },
  { term: 'Starvation', chinese: '饑餓', category: 'Operating Systems', chapter: '7', importance: 1, definition: 'A problem encountered in concurrent computing where a process is perpetually denied necessary resources to process its work.' },
  { term: 'Virtual Memory', chinese: '虛擬記憶體', category: 'Operating Systems', chapter: '7', importance: 2, definition: 'A memory management capability of an operating system that uses hardware and software to allow a computer to compensate for physical memory shortages by temporarily transferring data from random access memory (RAM) to disk storage.' },
  { term: 'Process', chinese: '行程', category: 'Operating Systems', chapter: '7', importance: 3, definition: 'A program in execution. It is a program that has started but has not finished.' },

  // Chapter 8
  { term: 'Pseudocode', chinese: '偽代碼', category: 'Algorithms', chapter: '8', importance: 2, definition: 'An informal high-level description of the operating principle of a computer program or other algorithm.' },
  { term: 'Recursion', chinese: '遞迴', category: 'Algorithms', chapter: '8', importance: 2, definition: 'A method of solving a computational problem where the solution depends on solutions to smaller instances of the same problem.' },
  { term: 'Sorting Algorithm', chinese: '排序演算法', category: 'Algorithms', chapter: '8', importance: 3, definition: 'An algorithm that puts elements of a list into an order.' },
  { term: 'Searching Algorithm', chinese: '搜尋演算法', category: 'Algorithms', chapter: '8', importance: 3, definition: 'An algorithm for finding an item with specified properties among a collection of items.' },
  { term: 'Selection Sort', chinese: '選擇排序', category: 'Algorithms', chapter: '8', importance: 1, definition: 'A sort algorithm in which the smallest value in the unsorted portion of the list is selected and placed at the end of the sorted portion of the list.' },
  { term: 'Bubble Sort', chinese: '氣泡排序', category: 'Algorithms', chapter: '8', importance: 1, definition: 'A sort algorithm in which each pass through the data moves (bubbles) the lowest element to the beginning of the unsorted portion of the list.' },
  { term: 'Insertion Sort', chinese: '插入排序', category: 'Algorithms', chapter: '8', importance: 1, definition: 'A sort algorithm in which the first element from the unsorted portion of the list is inserted into its proper position in the sorted portion of the list.' },

  // Chapter 9
  { term: 'Procedural Language', chinese: '程序化語言', category: 'Programming Languages', chapter: '9', importance: 2, definition: 'A type of computer programming language that specifies a series of well-structured steps and procedures within its programming context to compose a program.' },
  { term: 'Object-Oriented Language', chinese: '物件導向語言', category: 'Programming Languages', chapter: '9', importance: 3, definition: 'A programming language based on the concept of "objects", which can contain data and code: data in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods).' },
  { term: 'Functional Language', chinese: '函數式語言', category: 'Programming Languages', chapter: '9', importance: 1, definition: 'A programming paradigm where programs are constructed by applying and composing functions.' },
  { term: 'Compiler', chinese: '編譯器', category: 'Programming Languages', chapter: '9', importance: 3, definition: 'System software that converts a source program into executable object code: traditionally associated with high-level languages.' },
  { term: 'Interpreter', chinese: '直譯器', category: 'Programming Languages', chapter: '9', importance: 3, definition: 'A program that translates a source program in a high-level language line by line and executes each line immediately.' },
  
  // Chapter 10
  { term: 'Software Lifecycle', chinese: '軟體生命週期', category: 'Software Engineering', chapter: '10', importance: 3, definition: 'A fundamental concept in software engineering, describing the cycle of repeating phases a software product goes through from conception to retirement.' },
  { term: 'Waterfall Model', chinese: '瀑布模型', category: 'Software Engineering', chapter: '10', importance: 2, definition: 'A software development process model where the development process flows in only one direction, with each phase being completed before the next begins.' },
  { term: 'Modularization', chinese: '模組化', category: 'Software Engineering', chapter: '10', importance: 2, definition: 'The process of breaking a large software project into smaller, independent, and interchangeable modules.' },
  { term: 'Coupling', chinese: '耦合', category: 'Software Engineering', chapter: '10', importance: 2, definition: 'The degree of interdependence between software modules; a measure of how closely connected two routines or modules are.' },
  { term: 'Cohesion', chinese: '內聚', category: 'Software Engineering', chapter: '10', importance: 2, definition: 'The degree to which the elements inside a module belong together. It is a measure of the strength of relationship between the pieces of functionality within a given module.' },

  // Chapter 11
  { term: 'Data Structure', chinese: '資料結構', category: 'Data Structures', chapter: '11', importance: 3, definition: 'A data organization, management, and storage format that enables efficient access and modification.' },
  { term: 'Array', chinese: '陣列', category: 'Data Structures', chapter: '11', importance: 3, definition: 'A fixed-sized, sequenced collection of elements of the same data type.' },
  { term: 'Record', chinese: '紀錄', category: 'Data Structures', chapter: '11', importance: 2, definition: 'A collection of related elements, possibly of different types, having a single name. Each element is called a field.' },
  { term: 'Linked List', chinese: '鏈結串列', category: 'Data Structures', chapter: '11', importance: 2, definition: 'A linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next.' },
  
  // Chapter 12
  { term: 'Abstract Data Type (ADT)', chinese: '抽象資料型別', category: 'Data Structures', chapter: '12', importance: 3, definition: 'A data declaration packaged together with operations that are meaningful on the data type, hiding the implementation details.' },
  { term: 'Stack', chinese: '堆疊', category: 'Data Structures', chapter: '12', importance: 3, definition: 'An abstract data type that serves as a collection of elements, with two main principal operations: push, which adds an element to the collection, and pop, which removes the most recently added element that was not yet removed (LIFO).' },
  { term: 'Queue', chinese: '佇列', category: 'Data Structures', chapter: '12', importance: 3, definition: 'An abstract data type that serves as a collection of elements, with two main principal operations: enqueue, which adds an element to the rear of the collection, and dequeue, which removes the element from the front of the collection (FIFO).' },
  { term: 'Binary Tree', chinese: '二元樹', category: 'Data Structures', chapter: '12', importance: 2, definition: 'A tree data structure in which each node has at most two children, which are referred to as the left child and the right child.' },
  { term: 'Binary Search Tree (BST)', chinese: '二元搜尋樹', category: 'Data Structures', chapter: '12', importance: 2, definition: 'A binary tree in which the keys of the left subtrees are all less than the root key, and the keys of all right subtrees are greater than the root key.' },
  { term: 'Graph', chinese: '圖', category: 'Data Structures', chapter: '12', importance: 2, definition: 'A collection of nodes (vertices) and line segments (edges or arcs) connecting pairs of nodes.' },
  
  // Chapter 13
  { term: 'Sequential File', chinese: '循序檔', category: 'File Structures', chapter: '13', importance: 2, definition: 'A file organization method in which records are stored one after another in a predetermined order.' },
  { term: 'Indexed File', chinese: '索引檔', category: 'File Structures', chapter: '13', importance: 2, definition: 'A file organization method that uses an index to allow for both sequential and direct access to records.' },
  { term: 'Hashed File', chinese: '雜湊檔', category: 'File Structures', chapter: '13', importance: 2, definition: 'A file that is searched using one of the hashing methods.' },
  { term: 'Hashing', chinese: '雜湊', category: 'File Structures', chapter: '13', importance: 2, definition: 'The process of converting a given key into another value. A hash function is used to generate the new value, which is known as a hash value or hash.' },
  { term: 'Collision', chinese: '碰撞', category: 'File Structures', chapter: '13', importance: 2, definition: 'In hashing, an event that occurs when a hashing algorithm produces an address for an insertion, and that address is already occupied.' },
  { term: 'Directory', chinese: '目錄', category: 'File Structures', chapter: '13', importance: 2, definition: 'A file that contains the names and addresses of other files, used for organizing files.' }
];
