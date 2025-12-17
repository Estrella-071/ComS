
export const chapter7Content = {
  en: `
# Chapter 7: Operating Systems

This is the first chapter in this book to deal with computer software. In this chapter we explore the role of the operating system in a computer.

## Objectives
After studying this chapter, the student should be able to:
- Understand the role of the operating system in a computer system.
- Give a definition of an operating system.
- Understand the process of bootstrapping to load the operating system into memory.
- List the components of an operating system.
- Discuss the role of the memory manager in an operating system.
- Discuss the role of the process manager in an operating system.
- Discuss the role of the device manager in an operating system.
- Discuss the role of the file manager in an operating system.
- Understand the main features of three common operating systems: UNIX, Linux, and Windows.

## 7.1 INTRODUCTION
A computer is a system composed of two major components: hardware and software. Computer hardware is the physical equipment. Software is the collection of programs that allows the hardware to do its job. Computer **software** is divided into two broad categories: the **operating system** and **application programs** (Figure 7.1). Application programs use the computer hardware to solve users’ problems. The operating system, on the other hand, controls the access to hardware by users.

### 7.1.1 Operating system
An **operating system** is complex, so it is difficult to give a simple universal definition. Instead, here are some common definitions:
- An operating system is an interface between the hardware of a computer and the user (programs or humans).
- An operating system is a program (or a set of programs) that facilitates the execution of other programs.
- An operating system acts as a general manager supervising the activity of each component in the computer system. As a general manager, the operating system checks that hardware and software resources are used efficiently, and when there is a conflict in using a resource, the operating system mediates to solve it.

**An operating system is an interface between the hardware of a computer and the user (programs or humans) that facilitates the execution of other programs and the access to hardware and software resources.**

Two major design goals of an operating system are:
- Efficient use of hardware.
- Easy use of resources.

### 7.1.2 Bootstrap process
The operating system, based on the above definitions, provides support for other programs. For example, it is responsible for loading other programs into memory for execution. However, the operating system itself is a program that needs to be loaded into the memory and be run. How is this dilemma solved?

The problem can be solved if the operating system is stored (by the manufacturer) in part of memory using ROM technology. The program counter of the CPU (see Chapter 5) can be set to the beginning of this ROM memory. When the computer is turned on, the CPU reads instructions from ROM and executes them. This solution, however, is not very efficient, because a significant part of the memory would need to be composed of ROM and could not therefore be used by other programs. Today’s technology needs to allocate just a small part of memory to part of the operating system.

The solution adopted today is a two-stage process. A very small section of memory is made of ROM and holds a small program called the **bootstrap program**. When the computer is turned on, the CPU counter is set to the first instruction of this bootstrap program and executes the instructions in this program. This program is only responsible for loading the operating system itself, or that part of it required to start up the computer, into RAM memory. When loading is done, the program counter in the CPU is set to the first instruction of the operating system in RAM and the operating system is executed. Figure 7.2 illustrates the bootstrap process.

## 7.2 EVOLUTION
Operating systems have gone through a long history of evolution, which we summarize next.

### 7.2.1 Batch systems
**Batch operating systems** were designed in the 1950s to control mainframe computers. At that time, computers were large machines that used punched cards for input, line printers for output, and tape drives for secondary storage media.

Each program to be executed was called a job. A programmer who wished to execute a job sent a request to the operating room along with punched cards for the program and data. The punched cards were fed into the computer by an operator. If the program was successful, a printout of the result was sent to the programmer—if not, a printout of the error was sent.

Operating systems during this era were very simple: they only ensured that all of the computer’s resources were transferred from one job to the next.

### 7.2.2 Time-sharing systems
To use computer system resources efficiently, **multiprogramming** was introduced. The idea is to hold several jobs in memory at a time, and only assign a resource to a job that needs it on the condition that the resource is available. For example, when one program is using an input/output device, the CPU is free and can be used by another program. We discuss multiprogramming later in this chapter.

Multiprogramming brought the idea of **time sharing**: resources could be shared between different jobs, with each job being allocated a portion of time to use a resource. Because a computer is much faster than a human, time sharing is hidden from the user—each user has the impression that the whole system is serving them exclusively.

Multiprogramming, and eventually time sharing, improved the efficiency of computer systems tremendously. However, they required a more complex operating system. The operating system now had to do **scheduling**: allocating resources to different programs and deciding which program should use which resource, and when. During this era, the relationship between a computer and a user also changed. The user could directly interact with the system without going through an operator. A new term was also coined: **process**. A job is a program to be run, while a process is a program that is in memory and waiting for resources.

### 7.2.3 Personal systems
When personal computers were introduced, there was a need for an operating system for this new type of computer. During this era, **single-user operating systems** such as **DOS (Disk Operating System)** were introduced.

### 7.2.4 Parallel systems
The need for more speed and efficiency led to the design of **parallel systems**: multiple CPUs on the same machine. Each CPU can be used to serve one program or a part of a program, which means that many tasks can be accomplished in parallel instead of serially. The operating systems required for this are more complex than those that support single CPUs.

### 7.2.5 Distributed systems
Networking and internetworking, as we saw in Chapter 6, have created a new dimension in operating systems. A job that was previously done on one computer can now be shared between computers that may be thousands of miles apart. A program can be run partially on one computer and partially on another if they are connected through an internetwork such as the Internet. In addition, resources can be distributed. A program may need files located in different parts of the world. **Distributed systems** combine features of the previous generation with new duties such as controlling security.

### 7.2.6 Real-time systems
A **real-time system** is expected to do a task within specific time constraints. They are used with real-time applications, which monitor, respond to, or control external processes or environments. Examples can be found in traffic control, patient monitoring, or military control systems. The application program can sometimes be an embedded system such as a component of a large system, such as the control system in an automobile.

The requirements for a real-time operating system are often different than those for a general-purpose system. For this reason, we do not discuss them in this chapter.

## 7.3 COMPONENTS
Today’s operating systems are very complex. An operating system needs to manage different resources in a computer system. It resembles an organization with several managers at the top level. Each manager is responsible for managing their department, but also needs to cooperate with others and coordinate activities. A modern operating system has at least four duties: memory manager, process manager, device manager, and file manager. Like many organizations that have a department that is not necessarily under any specific manager, an operating system also has such a component, which is usually called a user interface or a shell. The user interface is responsible for communication outside the operating system. Figure 7.3 shows the typical components of an operating system.

### 7.3.1 User interface
Each operating system has a **user interface**, a program that accepts requests from users (processes) and interprets them for the rest of the operating system. A user interface in some operating systems, such as UNIX, is called a **shell**. In others, it is called a window to denote that it is menu driven and has a **GUI (graphical user interface)** component.

### 7.3.2 Memory manager
One of the responsibilities of a modern computer system is **memory management**. Although the memory size of computers has increased tremendously in recent years, so has the size of the programs and data to be processed. Memory allocation must be managed to prevent applications from running out of memory. Operating systems can be divided into two broad categories of memory management: monoprogramming and multiprogramming.

**Monoprogramming**
**Monoprogramming** belongs to the past, but it is worth mentioning because it helps us to understand multiprogramming. In monoprogramming, most of the memory capacity is dedicated to a single program (we consider the data to be processed by a program as part of the program): only a small part is needed to hold the operating system. In this configuration, the whole program is in memory for execution. When the program finishes running, the program area is occupied by another program (Figure 7.4).

The job of the memory manager is straightforward here. It loads the program into memory, runs it, and replaces it with the next program. However, there are several problems with this technique:
- The program must fit into memory. If the size of memory is less than the size of the program, the program cannot be run.
- When one program is being run, no other program can be executed. A program, during its execution, often needs to receive data from input devices and needs to send data to output devices. Input/output devices are slow compared with the CPU, so when the input/output operations are being carried out, the CPU is idle. It cannot serve another program because this program is not in memory. This is a very inefficient use of memory and CPU time.

**Multiprogramming**
In **multiprogramming**, more than one program is in memory at the same time, and they are executed concurrently, with the CPU switching rapidly between the programs. Figure 7.5 shows memory in a multiprogramming environment.
Since the 1960s, multiprogramming has gone through several improvements that can be seen in the taxonomy in Figure 7.6.

We discuss each scheme very briefly in the next few sections. Two techniques belong to the *nonswapping* category, which means that the program remains in memory for the duration of execution. The other two techniques belong to the *swapping* category. This means that, during execution, the program can be swapped between memory and disk one or more times.

**Partitioning**
The first technique used in multiprogramming is called **partitioning**. In this scheme, memory is divided into variable-length sections. Each section or partition holds one program. The CPU switches between programs. It starts with one program, executing some instructions until it either encounters an input/output operation or the time allocated for that program has expired. The CPU then saves the address of the memory location where the last instruction was executed and moves to the next program. The same procedure is repeated with the second program. After all the programs have been served, the CPU moves back to the first program. Priority levels can also be used to control the amount of CPU time allocated to each program (Figure 7.7).

With this technique, each program is entirely in memory and occupying contiguous locations. Partitioning improves the efficiency of the CPU, but there are still some issues:
- The size of the partitions has to be determined beforehand by the memory manager. If partition sizes are small, some programs cannot be loaded into memory. If partition sizes are large, there might be some ‘holes’ (unused locations) in memory.
- Even if partitioning is perfect when the computer is started, there may be some holes after completed programs are replaced by new ones.
- When there are many holes, the memory manager can compact the partitions to remove the holes and create new partitions, but this creates extra overhead on the system.

**Paging**
**Paging** improves the efficiency of partitioning. In paging, memory is divided into equally sized sections called **frames**. Programs are also divided, into equally sized sections called **pages**. The size of a page and a frame is usually the same and equal to the size of the block used by the system to retrieve information from a storage device (Figure 7.8).

A page is loaded into a frame in memory. If a program has three pages, it occupies three frames in memory. With this technique, the program does not have to be contiguous in memory: two consecutive pages can occupy noncontiguous frames in memory. The advantage of paging over partitioning is that two programs, each using three noncontiguous frames, can be replaced by one program that needs six frames. There is no need for the new program to wait until six contiguous frames are free before being loaded into memory.

Paging improves efficiency to some extent, but the whole program still needs to be in memory before being executed. This means that a program that needs six frames, for example, cannot be loaded into memory if there are currently only four unoccupied frames.

**Demand paging**
Paging does not require that the program be in contiguous memory locations, but it does require that the entire program be in memory for execution. **Demand paging** has removed this last restriction. In demand paging the program is divided into pages, but the pages can be loaded into memory one by one, executed, and replaced by another page. In other words, memory can hold pages from multiple programs at the same time. In addition, consecutive pages from the same program do not have to be loaded into the same frame—a page can be loaded into any free frame. An example of demand paging is shown in Figure 7.9. Two pages from program A, one page from program B, and one page from program C are in the memory.

**Demand segmentation**
A technique similar to paging is **segmentation**. In paging, a program is divided into equally sized pages, which is not the way a programmer thinks—a programmer thinks in terms of modules. As we will see in later chapters, a program is usually made up of a main program and subprograms. In **demand segmentation**, the program is divided into segments that match the programmer’s view. These are loaded into memory, executed, and replaced by another module from the same or a different program. An example of demand segmentation is shown in Figure 7.10. Since segments in memory are of equal size, part of a segment may remain empty.

**Demand paging and segmentation**
Demand paging and segmentation can be combined to further improve the efficiency of the system. A segment may be too large to fit any available free space in memory. Memory can be divided into frames, and a module can be divided into pages. The pages of a module can then be loaded into memory one by one and executed.

**Virtual memory**
Demand paging and demand segmentation mean that, when a program is being executed, part of the program is in memory and part is on disk. This means that, for example, a memory size of 10 MB can execute ten programs, each of size 3 MB, for a total of 30 MB. At any moment, 10 MB of the ten programs are in memory and 20 MB are on disk. There is therefore an actual memory size of 10 MB, but a virtual memory size of 30 MB. Figure 7.11 shows the concept. **Virtual memory**, which implies demand paging, demand segmentation, or both, is used in almost all operating systems today.

### 7.3.3 Process manager
A second function of an operating system is process management, but before discussing this concept, we need to define some terms.

**Program, job, and process**
Modern operating systems use three terms that refer to a set of instructions: program, job, and process. Although the terminology is vague and varies from one operating system to another, we can define these terms informally.

**Program**
A **program** is a nonactive set of instructions stored on disk (or tape). It may or may not become a job.

**Job**
A program becomes a **job** from the moment it is selected for execution until it has finished running and becomes a program again. During this time a job may or may not be executed. It may be located on disk waiting to be loaded to memory, or it may be loaded into memory and waiting for execution by the CPU. It may be on disk or in memory waiting for an input/output event, or it may be in memory while being executed by the CPU. The program is a job in all of these situations. When a job has finished executing (either normally or abnormally), it becomes a program and once again resides on the disk. The operating system no longer governs the program. Note that every job is a program, but not every program is a job.

**Process**
A **process** is a program in execution. It is a program that has started but has not finished. In other words, a process is a job that is being run in memory. It has been selected among other waiting jobs and loaded into memory. A process may be executing or it may be waiting for CPU time. As long as the job is in memory, it is a process. Note that every process is a job, but not every job is a process.

**State diagrams**
The relationship between a program, a job, and a process becomes clearer if we consider how a program becomes a job and how a job becomes a process. This can be illustrated with a **state diagram** that shows the different states of each of these entities. Figure 7.12 is a state diagram using boundaries between a program, a job, and a process.

A program becomes a job when selected by the operating system and brought to the **hold state**. It remains in this state until it can be loaded into memory. When there is memory space available to load the program totally or partially, the job moves to the **ready state**. It now becomes a process. It remains in memory and in this state until the CPU can execute it, moving to the **running state** at this time. When in the running state, one of three things can happen:
- The process executes until it needs I/O resources
- The process exhausts its allocated time slot
- The process terminates
In the first case, the process goes into the **waiting state** and waits until I/O is complete. In the second case, it goes directly to the ready state. In the third case, it goes into the **terminated state** and is no longer a process. A process can move between the running, waiting, and ready states many times before it goes to the terminated state. Note that the diagram can be much more complex if the system uses virtual memory and swaps programs in and out of main memory.

**Schedulers**
To move a job or process from one state to another, the process manager uses two **schedulers**: the job scheduler and the process scheduler.

**Job scheduler**
The **job scheduler** moves a job from the hold state to the ready state or from the running state to the terminated state. In other words, a job scheduler is responsible for creating a process from a job and terminating a process. Figure 7.13 shows the job scheduler.

**Process scheduler**
The **process scheduler** moves a process from one state to another. It moves a process from the running state to the waiting state when the process is waiting for some event to happen. It moves the process from the waiting state to the ready state when the event has occurred. It moves a process from the running state to the ready state if the process’ time allotment has expired. When the CPU is ready to run the process, the process scheduler moves the process from the ready state to the running state. Figure 7.14 shows the process scheduler.

**Other schedulers**
Some operating systems use other types of schedulers to make switching between processes more efficient.

**Queuing**
Our state diagram shows one job or process moving from one state to another. In reality, there are many jobs and many processes competing with each other for computer resources. For example, when some jobs are in memory, others must wait until space is available. Or when a process is running using the CPU, others must wait until the CPU is free. To handle multiple processes and jobs, the process manager uses **queues** (waiting lists). A *job control block* or *process control block* is associated with each job or process. This is a block of memory that stores information about that job or process. The process manager stores the job or process control block in the queues instead of the job or process itself. The job or process itself remains in memory or disk, as it is too big to be duplicated in a queue: the job control block or process control block is the representative of the waiting job or process.
An operating system can have several queues. For example, Figure 7.15 shows the circulation of jobs and processes through three queues: the job queue, the ready queue, and the I/O queue. The job queue holds the jobs that are waiting for memory. The ready queue holds the processes that are in memory, ready to be run and waiting for the CPU. The I/O queue holds the processes that are waiting for an I/O device (there can be several I/O queues, one for each input/output device, but we show only one for simplicity).

The process manager can have different policies for selecting the next job or process from a queue: it could be first in, first out (FIFO), shortest length first, highest priority first, and so on.

**Process synchronization**
The whole idea behind process management is to synchronize different processes with different resources. Whenever resources can be used by more than one user (or process, in this case), we can have two problematic situations: *deadlock* and *starvation*. A brief discussion of these two situations follows.

**Deadlock**
Instead of a formal definition of **deadlock**, we give an example. Assume that there are two processes, A and B. Process A is holding a file, File1 (that is, File1 is assigned to A) and cannot release it until it acquires another file, File2 (that is, A has requested File2). Process B is holding File2 (that is, File2 is assigned to B) and cannot release it until it has File1 (that is, B has requested File1). Files in most systems are not sharable—when in use by one process, a file cannot be used by another process. If there is no provision in this situation to force a process to release a file, deadlock is created (Figure 7.16).

As an analogy, Figure 7.17 shows deadlock on a narrow bridge. The situation is similar because the resource (part of the bridge) is held by a vehicle that does not release it until it gets the other part of the bridge, which is held by the other vehicle, and *vice versa*.

Deadlock occurs if the operating system allows a process to start running without first checking to see if the required resources are ready, and allows a process to hold a resource as long as it wants. There should be some provision in the system to prevent deadlock. One solution is not to allow a process to start running until the required resources are free, but we will see later that this creates another problem. The second solution is to limit the time a process can hold a resource.

**Deadlock occurs when the operating system does not put resource restrictions on processes.**

Deadlock does not always occur. There are four necessary conditions for deadlock as shown below:
- **Mutual exclusion**. Only one process can hold a resource
- **Resource holding**. A process holds a resource even though it cannot use it until other resources are available
- **No preemption**. The operating system cannot temporarily reallocate a resource
- **Circular waiting**. All processes and resources involved form a loop, as in Figure 7.16
All four conditions are required for deadlock to occur. However, these conditions are only necessary preconditions, and are not sufficient to cause deadlock of themselves—they must be present for deadlock, but they might not be enough to cause it. If one of these conditions is missing, deadlock cannot occur. This gives us a method for preventing or avoiding deadlock: do not allow one of these conditions to happen.

**Starvation**
**Starvation** is the opposite of deadlock. It can happen when the operating system puts too many resource restrictions on a process. For example, imagine an operating system that specifies that a process must have possession of its required resources before it can be run.
In Figure 7.18, imagine that process A needs two files, File1 and File2. File1 is being used by process B and File2 is being used by process E. Process B terminates first and releases File1. Process A cannot be started, because File2 is still not available. At this moment, process C, which needs only File1, is allowed to run. Now process E terminates and releases File2, but process A still cannot run because File1 is unavailable.

A classic starvation problem is the one introduced by Edsger Dijkstra. Five philosophers are sitting at a round table (Figure 7.19). Each philosopher needs two chopsticks to eat a bowl of rice. However, one or both chopsticks could be used by a neighbor. A philosopher could starve if two chopsticks are not available at the same time.

### 7.3.4 Device manager
The **device manager**, or input/output manager, is responsible for access to input/output devices. There are limitations on the number and speed of input/output devices in a computer system. Because these devices are slower in speed compared with the CPU and memory, when a process accesses an input/output device, the device is not available to other processes for a period of time. The device manager is responsible for the efficient use of input/output devices.

A detailed discussion of device managers requires advanced knowledge of operating system principles and is beyond the scope of this book. However, we can briefly list the responsibilities of a device manager:
- The device manager monitors every input/output device constantly to ensure that the device is functioning properly. The manager also needs to know when a device has finished serving one process and is ready to serve the next process in the queue.
- The device manager maintains a queue for each input/output device or one or more queues for similar input/output devices. For example, if there are two fast printers in the system, the manager can have one queue for each or one queue for both.
- The device manager controls the different policies for accessing input/output devices. For example, it may use FIFO for one device and shortest length first for another.

### 7.3.5 File manager
Operating systems today use a **file manager** to control access to files. A detailed discussion of the file manager also requires advanced knowledge of operating system principles and file access concepts that are beyond the scope of this book. We discuss some issues related to file access in Chapter 13, but this is not adequate to understand the actual operation of a file manager. Here is a brief list of the responsibilities of a file manager:

- The file manager controls access to files. Access is permitted only by permitted applications and/or users, and the type of access can vary. For example, a process (or a user that calls a process) may be allowed to read from a file but is allowed to write to it (that is, change it). Another process may be allowed to execute a file and a process, but not allowed to read its contents, and so on.
- The file manager supervises the creation, deletion, and modification of files.
- The file manager can control the naming of files.
- The file manager supervises the storage of files: how they are stored, where they are stored, and so on.
- The file manager is responsible for archiving and backups.

## 7.4 A SURVEY OF OPERATING SYSTEMS
In this section we introduce some popular operating systems and encourage you to study them further. We have chosen three operating systems that are familiar to most computer users: UNIX, Linux, and Windows.

### 7.4.1 UNIX
**UNIX** was originally developed in 1969 by Thomson and Ritchie of the Computer Science Research Group at Bell Laboratories. UNIX has gone through many versions since then. It has been a popular operating system among computer programmers and computer scientists. It is a very powerful operating system with three outstanding features. First, UNIX is a portable operating system that can be moved from one platform to another without many changes. The reason is that it is written mostly in the C language (instead of a machine language specific to a particular computer system). Second, UNIX has a powerful set of utilities (commands) that can be combined (in an executable file called a *script*) to solve many problems that require programming in other operating systems. Third, it is device-independent, because it includes device drivers in the operating system itself, which means that it can be easily configured to run any device.
UNIX is a multiuser, multiprocessing, portable operating system designed to facilitate programming, text processing, communication, and many other tasks that are expected from an operating system. It contains hundreds of simple, single-purpose functions that can be combined to do virtually every processing task imaginable. Its flexibility is demonstrated by the fact that it is used in three different computing environments: stand-alone personal environments, time-sharing systems, and client–server systems.

**UNIX is a multiuser, multiprocessing, portable operating system. It is designed to facilitate programming, text processing, and communication.**

**UNIX structure**
UNIX consists of four major components: the *kernel*, the *shell*, a standard set of *utilities*, and *application programs*. These components are shown in Figure 7.20.

**The kernel**
The **kernel** is the heart of the UNIX system. It contains the most basic parts of the operating system: memory management, process management, device management, and file management. All other components of the system call on the kernel to perform these services for them.

**The shell**
The **shell** is the part of UNIX that is most visible to the user. It receives and interprets the commands entered by the user. In many respects, this makes it the most important component of the UNIX structure. It is certainly the part that users get to know best. To do anything in the system, we must give the shell a command. If the command requires a utility, the shell requests that the kernel execute the utility. If the command requires an application program, the shell requests the kernel to run it. Some operating systems, such as UNIX, have several different shells.

**Utilities**
There are literally hundreds of UNIX utilities. A **utility** is a standard UNIX program that provides a support process for users. Three common utilities are text editors, search programs, and sort programs.
Many of the system utilities are actually sophisticated applications. For example, the UNIX email system is considered a utility, as are the three common text editors, **vi**, **emacs**, and **pico**. All four of these utilities are large systems in themselves. Other utilities are shorter, simpler functions. For example, the list (**ls**) utility displays the files in a disk directory.

**Applications**
Applications in UNIX are programs that are not a standard part of the operating system distribution. Written by systems administrators, professional programmers, or users, they provide extended capabilities to the system. In fact, many of the standard utilities started out as applications years ago and proved so useful that they are now part of the system.

### 7.4.2 Linux
In 1991, Linus Torvalds, a Finnish student at the University of Helsinki at the time, developed a new operating system that is known today as **Linux**. The initial kernel, which was similar to a small subset of UNIX, has grown into a full-scale operating system today. The Linus 2.0 kernel, released in 1997, was accepted as a commercial operating system: it has all the features traditionally attributed to UNIX.

**Components**
Linux has the following components.

**Kernel**
The kernel is responsible for all duties attributed to a kernel, such as memory management, process management, device management, and file management.

**System libraries**
The system libraries hold a set of functions used by the application programs, including the shell, to interact with the kernel.

**System utilities**
The system utilities are individual programs that use the services provided by the system libraries to perform management tasks.

**Networking capabilities**
Linux supports the standard Internet protocols discussed in Chapter 6. It supports three layers: the socket interface, protocol drivers, and network device drivers.

**Security**
Linux’ security mechanism provides the security aspects defined traditionally for UNIX, such as **authentication** and access control.

### 7.4.3 Windows
In the late 1980s, Microsoft started development of a new single-user operating system to replace **MS-DOS** (Microsoft Disk Operating System). **Windows** was the result. Several versions of Windows followed. We refer to all of these versions as Windows.

**Design goals**
Design goals released by Microsoft are *extensibility*, *portability*, *reliability*, *compatibility*, and *performance*.

**Extensibility**
Windows is designed as a modular architecture with several layers. The purpose is to let the higher layers to be changed with time without affecting the lower layers.

**Portability**
Windows, like UNIX, is mostly is written in C or C++ and the code is independent of the machine language of the computer on which it is running.

**Reliability**
Windows was designed to handle error conditions including protection from malicious software.

**Compatibility**
Windows was designed to run programs written for other operating systems and the earlier versions of Windows.

**Performance**
Windows was designed to have a fast response time to applications that run on top of the operating system.

**Architecture**
Windows uses a layered architecture, as shown in Figure 7.21.

**HAL**
The **hardware abstraction layer (HAL)** hides hardware differences from the upper layers.

**Kernel**
The kernel is the heart of the operating system. It is an object-oriented piece of software that sees any entity as an object.

**Executive**
The Windows executive provides services for the whole operating system. It is made up of six subsystems: object manager, security reference monitor, process manager, virtual memory manager, local procedure call facility, and the I/O manager. Most of these subsystems are familiar from our previous discussions of operating subsystems. Some subsystems, like the object manager, are added to Windows because of its object-oriented nature. The executive runs in kernel (privileged) mode.

**Environmental subsystems**
These are subsystems designed to allow Windows to run application programs designed for Windows, for other operating systems, or for earlier versions of Windows. The native subsystem that runs applications designed for Windows is called Win32. The environment subsystems run in the user mode (a non-privileged mode).

## 7.5 END-CHAPTER MATERIALS
### 7.5.1 Recommended reading
For more details about the subjects discussed in this chapter, the following books are recommended:
- Bic, L. and Shaw, A. *Operating Systems Principles*, Upper Saddle River, NJ: Prentice- Hall, 2003
- McHoes, A. and Flynn, I. *Understanding Operating Systems*, Boston, MA: Course Technology, 2007
- Nutt, G. *Operating Systems: A Modern Perspective*, Reading, MA: Addison-Wesley, 2001
- Silberschatz, A. and Galvin, P. *Operating System Concepts*, New York: Wiley, 2004

### 7.5.2 Key terms
- authentication
- batch operating system
- bootstrap
- circular waiting
- deadlock
- demand paging
- demand paging and segmentation
- demand segmentation
- device manager
- distributed system
- emacs
- frame
- graphical user interface (GUI)
- hardware abstraction layer (HAL)
- hold state
- job
- job scheduler
- kernel
- Linux
- memory management
- Microsoft Disk Operating System (MS-DOS)
- monoprogramming
- multiprogramming
- mutual exclusion
- no preemption
- operating system
- page
- paging
- parallel system
- partitioning
- pico
- portability
- portability process scheduler
- process
- process manager
- program
- queue
- ready state
- real-time system
- reliability
- resource holding
- running state
- scheduler
- scheduling
- shell
- single-user operating system
- software
- starvation
- state diagram
- terminated state
- time sharing
- UNIX
- user interface
- utility
- vi
- virtual memory
- waiting state
- Windows

### 7.5.3 Summary
- An operating system is an interface between the hardware of a computer and the user that facilitates the execution of programs and access to hardware and software resources. Two major design goals of an operating system are efficient use of hardware and ease of use of resources.
- Operating systems have gone through a long history of evolution: batch systems, time-sharing systems, personal systems, parallel systems, and distributed systems. A modern operating system has at least four functional areas: memory manager, process manager, device manager, and file manager. An operating system also provides a user interface.
- The first responsibility of a modern computer system is memory management. Memory allocation must be controlled by the operating system. Memory management techniques can be divided into two categories: monoprogramming and multiprogramming. In monoprogramming, most of the memory capacity is dedicated to one single program. In multiprogramming, more than one program can be in memory at the same time.
- The second responsibility of an operating system is process management. A process is a program in execution. The process manager uses schedulers and queues to manage processes. Process management involves synchronizing different processes with different resources. This may potentially create resource deadlock or starvation. Deadlock occurs when the operating system does not put resource restrictions on processes: starvation can happen when the operating system puts too many resource restrictions on a process.
- The third responsibility of an operating system is device or input/output management.
- The fourth responsibility of an operating system is file management. An operating system uses a file manager to control access to files. Access is permitted only by processes or users that are allowed access to specific files, and the type of access can vary.
- Two common operating systems with some similarities are UNIX and Linux. UNIX is a multiuser, multiprocessing, portable operating system made up from four parts: the kernel, the shell, a standard set of utilities, and application programs. Linux has three components: a kernel, a system utilities, and a system library.
- A popular family of operating systems from Microsoft is referred to as Windows. Windows is an object-oriented, multi-layer operating system. It uses several layers, including a hardware abstract layer (HAL), executive layer, and environment subsystem layer.
`,
  zh: `
# 第七章：作業系統

這是本書第一章處理電腦軟體的章節。在本章中，我們將探討作業系統在電腦中的角色。

## 學習目標
學完本章後，學生應能：
- 理解作業系統在電腦系統中的角色。
- 給出作業系統的定義。
- 理解將作業系統載入記憶體的啟動程序 (bootstrapping)。
- 列出作業系統的組件。
- 討論記憶體管理器在作業系統中的角色。
- 討論行程管理器在作業系統中的角色。
- 討論設備管理器在作業系統中的角色。
- 討論檔案管理器在作業系統中的角色。
- 理解三種常見作業系統的主要特性：UNIX、Linux 和 Windows。

## 7.1 簡介
電腦是一個由兩個主要組件組成的系統：硬體和軟體。電腦硬體是實體設備。軟體是讓硬體完成工作的一組程式。電腦**軟體**分為兩大類：**作業系統**和**應用程式**（圖 7.1）。應用程式使用電腦硬體來解決使用者的問題。另一方面，作業系統控制使用者對硬體的存取。

### 7.1.1 作業系統
**作業系統**非常複雜，因此很難給出一個簡單的通用定義。相反，這裡有一些常見的定義：
- 作業系統是電腦硬體與使用者（程式或人類）之間的介面。
- 作業系統是一個（或一組）促進其他程式執行的程式。
- 作業系統充當總經理，監管電腦系統中每個組件的活動。作為總經理，作業系統檢查硬體和軟體資源是否被有效使用，當資源使用發生衝突時，作業系統進行協調以解決衝突。

**作業系統是電腦硬體與使用者（程式或人類）之間的介面，它有助於其他程式的執行以及對硬體和軟體資源的存取。**

作業系統的兩個主要設計目標是：
- 硬體的有效使用。
- 資源的易用性。

### 7.1.2 啟動程序 (Bootstrap process)
根據上述定義，作業系統為其他程式提供支援。例如，它負責將其他程式載入記憶體以執行。然而，作業系統本身就是一個需要載入記憶體並運行的程式。這個困境是如何解決的？

如果作業系統（由製造商）使用 ROM 技術儲存在部分記憶體中，則可以解決此問題。CPU 的程式計數器（見第 5 章）可以設定為此 ROM 記憶體的開頭。當電腦開啟時，CPU 從 ROM 讀取指令並執行它們。然而，這個解決方案效率不高，因為很大一部分記憶體將由 ROM 組成，因此不能被其他程式使用。今天的技術只需要將一小部分記憶體分配給作業系統的一部分。

今天採用的解決方案是一個兩階段的過程。記憶體中一小部分由 ROM 組成，其中存放一個稱為**啟動程式 (bootstrap program)** 的小程式。當電腦開啟時，CPU 計數器被設定為此啟動程式的第一條指令，並執行此程式中的指令。此程式僅負責將作業系統本身，或啟動電腦所需的部分作業系統載入 RAM 記憶體。當載入完成時，CPU 中的程式計數器被設定為 RAM 中作業系統的第一條指令，作業系統隨即執行。圖 7.2 說明了啟動程序。

## 7.2 演進
作業系統經歷了漫長的演進歷史，我們接下來將進行總結。

### 7.2.1 批次系統
**批次作業系統**設計於 1950 年代，用於控制大型主機。當時，電腦是使用打孔卡輸入、行列式印表機輸出和磁帶機作為輔助儲存媒體的大型機器。

每個要執行的程式稱為一個工作 (job)。希望執行工作的程式設計師將請求連同程式和資料的打孔卡發送到操作室。操作員將打孔卡送入電腦。如果程式成功，結果的列印輸出將發送給程式設計師——如果失敗，則發送錯誤的列印輸出。

這個時代的作業系統非常簡單：它們只確保所有電腦資源從一個工作轉移到下一個工作。

### 7.2.2 分時系統
為了有效地利用電腦系統資源，引入了**多重程式設計 (multiprogramming)**。其想法是一次將多個工作保留在記憶體中，並且僅在資源可用的條件下將資源分配給需要它的工作。例如，當一個程式正在使用輸入/輸出設備時，CPU 是空閒的，可以被另一個程式使用。我們將在本章稍後討論多重程式設計。

多重程式設計帶來了**分時 (time sharing)** 的概念：資源可以在不同工作之間共享，每個工作分配一部分時間來使用資源。因為電腦比人類快得多，所以分時對使用者來說是隱藏的——每個使用者都有整個系統專門為他們服務的印象。

多重程式設計，以及最終的分時，極大地提高了電腦系統的效率。然而，它們需要更複雜的作業系統。作業系統現在必須進行**排程 (scheduling)**：將資源分配給不同的程式，並決定哪個程式應該使用哪個資源，以及何時使用。在這個時代，電腦與使用者之間的關係也發生了變化。使用者可以直接與系統互動，而無需通過操作員。還創造了一個新術語：**行程 (process)**。工作是要運行的程式，而行程是在記憶體中並等待資源的程式。

### 7.2.3 個人系統
當個人電腦問世時，需要一種用於這種新型電腦的作業系統。在這個時代，引入了**單使用者作業系統**，如 **DOS (磁碟作業系統)**。

### 7.2.4 平行系統
對更高速度和效率的需求導致了**平行系統**的設計：同一台機器上有多個 CPU。每個 CPU 可用於服務一個程式或程式的一部分，這意味著許多任務可以並行完成而不是串列完成。這所需的作業系統比支援單一 CPU 的作業系統更複雜。

### 7.2.5 分散式系統
網路和互連網，如我們在第 6 章所見，在作業系統中創造了一個新的維度。以前在一台電腦上完成的工作現在可以在相距數千英里的電腦之間共享。如果程式透過網際網路等互連網連接，則可以在一台電腦上部分運行，在另一台電腦上部分運行。此外，資源可以分散式。程式可能需要位於世界不同地區的檔案。**分散式系統**結合了前一代的特性，並增加了新的職責，如控制安全性。

### 7.2.6 即時系統
**即時系統**期望在特定的時間限制內完成任務。它們用於即時應用程式，監控、回應或控制外部過程或環境。例子可以在交通控制、病患監測或軍事控制系統中找到。應用程式有時可以是嵌入式系統，例如大型系統的一個組件，如汽車中的控制系統。

即時作業系統的要求通常不同於通用系統。因此，我們不在本章討論它們。

## 7.3 組件
現代作業系統非常複雜。作業系統需要管理電腦系統中的不同資源。它類似於一個高層有多位經理的組織。每位經理負責管理其部門，但也需要與他人合作並協調活動。現代作業系統至少有四個職責：記憶體管理器、行程管理器、設備管理器和檔案管理器。就像許多組織有一個不一定隸屬於任何特定經理的部門一樣，作業系統也有這樣一個組件，通常稱為使用者介面或 shell。使用者介面負責作業系統外部的通訊。圖 7.3 顯示了作業系統的典型組件。

### 7.3.1 使用者介面
每個作業系統都有一個**使用者介面**，這是一個接受使用者（行程）請求並為作業系統其餘部分解釋這些請求的程式。在某些作業系統（如 UNIX）中，使用者介面稱為 **shell**。在其他系統中，它被稱為視窗，表示它是選單驅動的，並具有 **GUI (圖形使用者介面)** 組件。

### 7.3.2 記憶體管理器
現代電腦系統的職責之一是**記憶體管理**。雖然近年來電腦的記憶體大小急劇增加，但要處理的程式和資料的大小也在增加。必須管理記憶體分配以防止應用程式耗盡記憶體。作業系統可以分為兩大類記憶體管理：單道程式設計和多重程式設計。

**單道程式設計 (Monoprogramming)**
**單道程式設計**屬於過去，但值得一提，因為它有助於我們理解多重程式設計。在單道程式設計中，大部分記憶體容量專用於單個程式（我們將程式處理的資料視為程式的一部分）；只需要一小部分來保存作業系統。在這種配置中，整個程式都在記憶體中執行。當程式執行完畢時，程式區域被另一個程式佔用（圖 7.4）。

這裡記憶體管理器的工作很簡單。它將程式載入記憶體，運行它，然後用下一個程式替換它。然而，這種技術有幾個問題：
- 程式必須適合記憶體。如果記憶體大小小於程式大小，則無法運行該程式。
- 當一個程式正在運行時，不能執行其他程式。程式在執行期間通常需要從輸入設備接收資料並需要向輸出設備發送資料。與 CPU 相比，輸入/輸出設備很慢，因此當執行輸入/輸出操作時，CPU 是空閒的。它不能服務另一個程式，因為該程式不在記憶體中。這是對記憶體和 CPU 時間的一種非常低效的使用。

**多重程式設計 (Multiprogramming)**
在**多重程式設計**中，記憶體中同時有多個程式，並且它們並行執行，CPU 在程式之間快速切換。圖 7.5 顯示了多重程式設計環境中的記憶體。
自 1960 年代以來，多重程式設計經歷了幾次改進，如圖 7.6 的分類法所示。

我們在接下來的幾節中非常簡要地討論每種方案。其中兩種技術屬於*非交換 (nonswapping)* 類別，這意味著程式在執行期間保留在記憶體中。另外兩種技術屬於*交換 (swapping)* 類別。這意味著在執行期間，程式可以在記憶體和磁碟之間交換一次或多次。

**分割 (Partitioning)**
多重程式設計中使用的第一種技術稱為**分割**。在這個方案中，記憶體被劃分為可變長度的區段。每個區段或分割區保存一個程式。CPU 在程式之間切換。它從一個程式開始，執行一些指令，直到遇到輸入/輸出操作或分配給該程式的時間已過。然後 CPU 保存最後執行指令的記憶體位置位址，並移動到下一個程式。對第二個程式重複相同的過程。在所有程式都得到服務後，CPU 移回第一個程式。優先級別也可用於控制分配給每個程式的 CPU 時間量（圖 7.7）。

使用這種技術，每個程式都完全在記憶體中並佔用連續的位置。分割提高了 CPU 的效率，但仍然存在一些問題：
- 分割區的大小必須由記憶體管理器預先決定。如果分割區太小，某些程式將無法載入記憶體。如果分割區太大，記憶體中可能會有一些「洞」（未使用的位置）。
- 即使在電腦啟動時分割是完美的，但在完成的程式被新程式替換後，可能會出現一些洞。
- 當有很多洞時，記憶體管理器可以壓縮分割區以去除洞並建立新的分割區，但這會給系統帶來額外的開銷。

**分頁 (Paging)**
**分頁**提高了分割的效率。在分頁中，記憶體被劃分為大小相等的區段，稱為**頁框 (frames)**。程式也被劃分為大小相等的區段，稱為**頁面 (pages)**。頁面和頁框的大小通常相同，並且等於系統用於從儲存設備檢索資訊的區塊大小（圖 7.8）。

頁面被載入到記憶體中的頁框中。如果一個程式有三個頁面，它佔用記憶體中的三個頁框。使用這種技術，程式不必在記憶體中連續；兩個連續的頁面可以佔用記憶體中的非連續頁框。分頁優於分割的優點是，每個使用三個非連續頁框的兩個程式可以被一個需要六個頁框的程式替換。新程式無需等到有六個連續的頁框空閒才能載入記憶體。

分頁在一定程度上提高了效率，但整個程式在執行前仍需要在記憶體中。這意味著，例如，如果目前只有四個未佔用的頁框，則無法將需要六個頁框的程式載入記憶體。

**請求分頁 (Demand paging)**
分頁不要求程式位於連續的記憶體位置，但它確實要求整個程式在執行時都在記憶體中。**請求分頁**已經消除了這最後一個限制。在請求分頁中，程式被劃分為頁面，但頁面可以逐一載入記憶體，執行，並由另一個頁面替換。換句話說，記憶體可以同時保存來自多個程式的頁面。此外，來自同一程式的連續頁面不必載入到同一頁框中——頁面可以載入到任何空閒頁框中。圖 7.9 顯示了請求分頁的一個例子。來自程式 A 的兩個頁面、來自程式 B 的一個頁面和來自程式 C 的一個頁面在記憶體中。

**請求分段 (Demand segmentation)**
一種類似於分頁的技術是**分段**。在分頁中，程式被劃分為大小相等的頁面，這不是程式設計師思考的方式——程式設計師是以模組來思考的。正如我們將在後面的章節中看到的，程式通常由主程式和子程式組成。在**請求分段**中，程式被劃分為符合程式設計師視圖的區段。這些被載入記憶體，執行，並由來自同一或不同程式的另一個模組替換。圖 7.10 顯示了請求分段的一個例子。由於記憶體中的區段大小相等，部分區段可能會保持空白。

**請求分頁和分段**
請求分頁和分段可以結合起來進一步提高系統的效率。一個區段可能太大而無法適應記憶體中任何可用的空閒空間。記憶體可以劃分為頁框，模組可以劃分為頁面。然後模組的頁面可以逐一載入記憶體並執行。

**虛擬記憶體 (Virtual memory)**
請求分頁和請求分段意味著，當程式正在執行時，部分程式在記憶體中，部分在磁碟上。這意味著，例如，10 MB 的記憶體大小可以執行十個程式，每個程式大小為 3 MB，總共 30 MB。在任何時刻，十個程式的 10 MB 在記憶體中，20 MB 在磁碟上。因此，實際記憶體大小為 10 MB，但虛擬記憶體大小為 30 MB。圖 7.11 顯示了這個概念。**虛擬記憶體**意味著請求分頁、請求分段或兩者兼有，如今幾乎所有作業系統都在使用。

### 7.3.3 行程管理器
作業系統的第二個功能是行程管理，但在討論這個概念之前，我們需要定義一些術語。

**程式、工作和行程**
現代作業系統使用三個術語來指代一組指令：程式、工作和行程。雖然術語含糊不清且因作業系統而異，但我們可以非正式地定義這些術語。

**程式 (Program)**
**程式**是儲存在磁碟（或磁帶）上的非活動指令集。它可能成為也可能不會成為工作。

**工作 (Job)**
程式從被選中執行到運行結束並再次成為程式的這段時間稱為**工作**。它可能位於磁碟上等待載入記憶體，或者可能已載入記憶體並等待 CPU 執行。它可能在磁碟或記憶體中等待輸入/輸出事件，或者可能正在記憶體中由 CPU 執行。在所有這些情況下，程式都是工作。當工作完成執行（正常或異常）時，它變成程式並再次駐留在磁碟上。作業系統不再管理該程式。請注意，每個工作都是程式，但並非每個程式都是工作。

**行程 (Process)**
**行程**是正在執行中的程式。它是一個已開始但尚未完成的程式。換句話說，行程是在記憶體中運行的工作。它已從其他等待的工作中被選中並載入記憶體。行程可能正在執行，也可能正在等待 CPU 時間。只要工作在記憶體中，它就是一個行程。請注意，每個行程都是工作，但並非每個工作都是行程。

**狀態圖**
如果我們考慮程式如何成為工作以及工作如何成為行程，程式、工作和行程之間的關係就會變得更清晰。這可以用顯示這些實體中每一個的不同狀態的**狀態圖**來說明。圖 7.12 是一個使用邊界區分程式、工作和行程的狀態圖。

程式被作業系統選中並帶到**保持狀態 (hold state)** 時成為工作。它保持在這個狀態，直到它可以被載入記憶體。當有記憶體空間可以完全或部分載入程式時，工作移動到**就緒狀態 (ready state)**。它現在變成了一個行程。它保留在記憶體中並處於此狀態，直到 CPU 可以執行它，此時移動到**執行狀態 (running state)**。處於執行狀態時，可能會發生三件事之一：
- 行程執行直到需要 I/O 資源
- 行程用盡了分配給它的時間片
- 行程終止
在第一種情況下，行程進入**等待狀態 (waiting state)** 並等待 I/O 完成。在第二種情況下，它直接回到就緒狀態。在第三種情況下，它進入**終止狀態 (terminated state)**，不再是行程。行程可以在進入終止狀態之前多次在執行、等待和就緒狀態之間移動。請注意，如果系統使用虛擬記憶體並將程式換入和換出主記憶體，則圖表可能會複雜得多。

**排程器**
為了將工作或行程從一種狀態移動到另一種狀態，行程管理器使用兩個**排程器**：工作排程器和行程排程器。

**工作排程器 (Job scheduler)**
**工作排程器**將工作從保持狀態移動到就緒狀態，或從執行狀態移動到終止狀態。換句話說，工作排程器負責從工作創建行程並終止行程。圖 7.13 顯示了工作排程器。

**行程排程器 (Process scheduler)**
**行程排程器**將行程從一種狀態移動到另一種狀態。當行程等待某些事件發生時，它將行程從執行狀態移動到等待狀態。當事件發生時，它將行程從等待狀態移動到就緒狀態。如果行程的時間分配已過期，它將行程從執行狀態移動到就緒狀態。當 CPU 準備好運行行程時，行程排程器將行程從就緒狀態移動到執行狀態。圖 7.14 顯示了行程排程器。

**其他排程器**
一些作業系統使用其他類型的排程器來使行程之間的切換更有效率。

**佇列 (Queuing)**
我們的狀態圖顯示一個工作或行程從一種狀態移動到另一種狀態。實際上，有許多工作和許多行程在爭奪電腦資源。例如，當一些工作在記憶體中時，其他工作必須等待直到空間可用。或者當一個行程正在使用 CPU 運行時，其他行程必須等待直到 CPU 空閒。為了處理多個行程和工作，行程管理器使用**佇列**（等待列表）。*工作控制區塊*或*行程控制區塊*與每個工作或行程相關聯。這是一塊記憶體，儲存有關該工作或行程的資訊。行程管理器將工作或行程控制區塊儲存在佇列中，而不是工作或行程本身。工作或行程本身保留在記憶體或磁碟中，因為它太大而無法在佇列中複製：工作控制區塊或行程控制區塊是等待工作或行程的代表。
一個作業系統可以有幾個佇列。例如，圖 7.15 顯示了工作和行程通過三個佇列的循環：工作佇列、就緒佇列和 I/O 佇列。工作佇列保存等待記憶體的工作。就緒佇列保存記憶體中準備運行並等待 CPU 的行程。I/O 佇列保存等待 I/O 設備的行程（可以有幾個 I/O 佇列，每個輸入/輸出設備一個，但為了簡單起見我們只顯示一個）。

行程管理器可以有不同的策略從佇列中選擇下一個工作或行程：可以是先進先出 (FIFO)、最短長度優先、最高優先順序優先等等。

**行程同步**
行程管理背後的整個想法是使不同的行程與不同的資源同步。每當資源可以被多個使用者（或在這種情況下是行程）使用時，我們可能會遇到兩種有問題的情況：*死結*和*饑餓*。這兩種情況的簡要討論如下。

**死結 (Deadlock)**
我們不給出**死結**的正式定義，而是給出一個例子。假設有兩個行程 A 和 B。行程 A 持有一個檔案 File1（即 File1 分配給 A），並且在獲取另一個檔案 File2 之前無法釋放它（即 A 請求 File2）。行程 B 持有 File2（即 File2 分配給 B），並且在擁有 File1 之前無法釋放它（即 B 請求 File1）。大多數系統中的檔案是不可共享的——當一個行程使用時，另一個行程不能使用。如果在這種情況下沒有強制行程釋放檔案的規定，就會產生死結（圖 7.16）。

作為類比，圖 7.17 顯示了狹窄橋樑上的死結。情況類似，因為資源（橋的一部分）由一輛車持有，直到它獲得由另一輛車持有的橋的另一部分才釋放，反之亦然。

如果作業系統允許行程開始運行而無需先檢查所需資源是否準備就緒，並允許行程隨心所欲地持有資源，則會發生死結。系統中應該有一些規定來防止死結。一種解決方案是在所需資源空閒之前不允許行程開始運行，但我們稍後會看到這會產生另一個問題。第二種解決方案是限制行程持有資源的時間。

**當作業系統不對行程施加資源限制時，就會發生死結。**

死結並不總是發生。死結有四個必要條件，如下所示：
- **互斥 (Mutual exclusion)**。只有一個行程可以持有資源。
- **資源持有 (Resource holding)**。行程持有一個資源，即使它在其他資源可用之前無法使用它。
- **無搶佔 (No preemption)**。作業系統不能暫時重新分配資源。
- **循環等待 (Circular waiting)**。所有涉及的行程和資源形成一個迴圈，如圖 7.16 所示。
死結發生需要所有四個條件。然而，這些條件只是必要的先決條件，本身不足以導致死結——它們必須存在才會發生死結，但可能不足以導致死結。如果缺少這些條件之一，則不會發生死結。這給了我們一種預防或避免死結的方法：不允許這些條件之一發生。

**饑餓 (Starvation)**
**饑餓**是死結的對立面。當作業系統對行程施加過多的資源限制時，就會發生這種情況。例如，想像一個作業系統規定行程必須擁有其所需的資源才能運行。
在圖 7.18 中，想像行程 A 需要兩個檔案 File1 和 File2。File1 正在被行程 B 使用，File2 正在被行程 E 使用。行程 B 先終止並釋放 File1。行程 A 無法啟動，因為 File2 仍然不可用。此時，只需要 File1 的行程 C 被允許運行。現在行程 E 終止並釋放 File2，但行程 A 仍然無法運行，因為 File1 不可用。

一個經典的饑餓問題是由 Edsger Dijkstra 提出的。五位哲學家圍坐在一張圓桌旁（圖 7.19）。每位哲學家需要兩根筷子才能吃一碗飯。然而，一根或兩根筷子可能被鄰居使用。如果兩根筷子不同時可用，哲學家可能會挨餓。

### 7.3.4 設備管理器
**設備管理器**或輸入/輸出管理器負責存取輸入/輸出設備。電腦系統中輸入/輸出設備的數量和速度是有限的。由於這些設備的速度比 CPU 和記憶體慢，當一個行程存取輸入/輸出設備時，該設備在一段時間內對其他行程不可用。設備管理器負責輸入/輸出設備的有效使用。

設備管理器的詳細討論需要作業系統原理的高級知識，超出了本書的範圍。然而，我們可以簡要列出設備管理器的職責：
- 設備管理器持續監控每個輸入/輸出設備，以確保設備正常運作。管理器還需要知道設備何時完成服務一個行程並準備好服務佇列中的下一個行程。
- 設備管理器為每個輸入/輸出設備維護一個佇列，或為類似的輸入/輸出設備維護一個或多個佇列。例如，如果系統中有兩台快速印表機，管理器可以為每台印表機維護一個佇列，或者為兩台印表機維護一個佇列。
- 設備管理器控制存取輸入/輸出設備的不同策略。例如，它可能對一個設備使用 FIFO，對另一個設備使用最短長度優先。

### 7.3.5 檔案管理器
今天的作業系統使用**檔案管理器**來控制對檔案的存取。關於檔案管理器的詳細討論也需要作業系統原理和檔案存取概念的高級知識，這超出了本書的範圍。我們在第 13 章討論一些與檔案存取相關的問題，但這不足以理解檔案管理器的實際運作。以下是檔案管理器職責的簡要列表：

- 檔案管理器控制對檔案的存取。僅允許獲得許可的應用程式和/或使用者存取，並且存取類型可以不同。例如，一個行程（或呼叫行程的使用者）可能被允許從檔案讀取但被允許寫入（即更改）它。另一個行程可能被允許執行檔案和行程，但不允許讀取其內容，依此類推。
- 檔案管理器監督檔案的創建、刪除和修改。
- 檔案管理器可以控制檔案的命名。
- 檔案管理器監督檔案的儲存：它們如何儲存，儲存在哪裡等等。
- 檔案管理器負責存檔和備份。

## 7.4 作業系統概覽
在本節中，我們介紹一些流行的作業系統，並鼓勵您進一步研究它們。我們選擇了大多數電腦使用者熟悉的三種作業系統：UNIX、Linux 和 Windows。

### 7.4.1 UNIX
**UNIX** 最初由貝爾實驗室電腦科學研究小組的 Thomson 和 Ritchie 於 1969 年開發。從那時起，UNIX 經歷了許多版本。它一直是電腦程式設計師和電腦科學家中流行的作業系統。它是一個非常強大的作業系統，具有三個顯著特徵。首先，UNIX 是一個可移植的作業系統，可以從一個平台移動到另一個平台而無需太多更改。原因是它主要用 C 語言編寫（而不是特定於特定電腦系統的機器語言）。其次，UNIX 擁有一組強大的公用程式（命令），可以組合（在稱為*腳本*的可執行檔案中）來解決許多在其他作業系統中需要編程的問題。第三，它與設備無關，因為它在作業系統本身中包含設備驅動程式，這意味著它可以輕鬆配置以運行任何設備。
UNIX 是一個多使用者、多工、可移植的作業系統，旨在促進程式設計、文字處理、通訊和作業系統預期的許多其他任務。它包含數百個簡單的單一用途功能，可以組合成幾乎可以想像到的每個處理任務。它的靈活性體現在它用於三種不同的計算環境：獨立個人環境、分時系統和主從式系統。

**UNIX 是一個多使用者、多工、可移植的作業系統。它旨在促進程式設計、文字處理和通訊。**

**UNIX 架構**
UNIX 由四個主要組件組成：*核心*、*shell*、一組標準*公用程式*和*應用程式*。這些組件如圖 7.20 所示。

**核心 (The kernel)**
**核心**是 UNIX 系統的心臟。它包含作業系統最基本的部分：記憶體管理、行程管理、設備管理和檔案管理。系統的所有其他組件都呼叫核心來為它們執行這些服務。

**Shell**
**Shell** 是 UNIX 中對使用者最可見的部分。它接收並解釋使用者輸入的命令。在許多方面，這使其成為 UNIX 架構中最重要的組件。它當然是使用者最了解的部分。要在系統中做任何事情，我們必須給 shell 一個命令。如果命令需要公用程式，shell 請求核心執行公用程式。如果命令需要應用程式，shell 請求核心運行它。一些作業系統，如 UNIX，有幾個不同的 shell。

**公用程式 (Utilities)**
實際上只有數百個 UNIX 公用程式。**公用程式**是一個標準的 UNIX 程式，為使用者提供支援過程。三種常見的公用程式是文字編輯器、搜尋程式和排序程式。
許多系統公用程式實際上是複雜的應用程式。例如，UNIX 電子郵件系統被認為是一個公用程式，三個常見的文字編輯器 **vi**、**emacs** 和 **pico** 也是如此。這四個公用程式本身就是大型系統。其他公用程式是較短、較簡單的功能。例如，列表 (**ls**) 公用程式顯示磁碟目錄中的檔案。

**應用程式 (Applications)**
UNIX 中的應用程式不是作業系統發行版標準部分的程式。由系統管理員、專業程式設計師或使用者編寫，它們為系統提供了擴展功能。事實上，許多標準公用程式在幾年前也是作為應用程式開始的，並被證明非常有用，以至於它們現在已成為系統的一部分。

### 7.4.2 Linux
1991 年，當時赫爾辛基大學的芬蘭學生 Linus Torvalds 開發了一種新的作業系統，今天被稱為 **Linux**。最初的核心類似於 UNIX 的一小部分，如今已發展成為一個全面的作業系統。Linus 2.0 核心於 1997 年發布，被接受為商業作業系統：它具有傳統上歸因於 UNIX 的所有功能。

**組件**
Linux 具有以下組件。

**核心 (Kernel)**
核心負責歸因於核心的所有職責，例如記憶體管理、行程管理、設備管理和檔案管理。

**系統函式庫 (System libraries)**
系統函式庫保存一組由應用程式（包括 shell）使用的函式，以與核心互動。

**系統公用程式 (System utilities)**
系統公用程式是使用系統函式庫提供的服務來執行管理任務的單獨程式。

**網路功能 (Networking capabilities)**
Linux 支援第 6 章討論的標準網際網路協定。它支援三層：插座介面、協定驅動程式和網路設備驅動程式。

**安全性 (Security)**
Linux 的安全機制提供了傳統上為 UNIX 定義的安全方面，例如**驗證**和存取控制。

### 7.4.3 Windows
在 1980 年代後期，微軟開始開發一種新的單使用者作業系統來取代 **MS-DOS**（微軟磁碟作業系統）。**Windows** 就是結果。隨後發布了幾個版本的 Windows。我們將所有這些版本統稱為 Windows。

**設計目標**
微軟發布的設計目標是*可擴展性*、*可移植性*、*可靠性*、*相容性*和*效能*。

**可擴展性 (Extensibility)**
Windows 設計為具有多層的模組化架構。目的是讓較高層隨時間更改而不影響較低層。

**可移植性 (Portability)**
像 UNIX 一樣，Windows 主要用 C 或 C++ 編寫，代碼獨立於運行它的電腦的機器語言。

**可靠性 (Reliability)**
Windows 旨在處理錯誤條件，包括防止惡意軟體。

**相容性 (Compatibility)**
Windows 旨在運行原本為其他作業系統和早期版本 Windows 編寫的程式。

**效能 (Performance)**
Windows 旨在對在作業系統之上運行的應用程式具有快速的回應時間。

**架構**
Windows 使用分層架構，如圖 7.21 所示。

**HAL**
**硬體抽象層 (HAL)** 向較高層隱藏硬體差異。

**核心 (Kernel)**
核心是作業系統的心臟。它是一個物件導向的軟體，將任何實體視為物件。

**執行層 (Executive)**
Windows 執行層為整個作業系統提供服務。它由六個子系統組成：物件管理器、安全參考監視器、行程管理器、虛擬記憶體管理器、本地過程呼叫設施和 I/O 管理器。我們之前對作業系統子系統的討論中已經熟悉了這些子系統中的大多數。一些子系統，如物件管理器，由於其物件導向的性質而被添加到 Windows 中。執行層在核心（特權）模式下運行。

**環境子系統 (Environmental subsystems)**
這些子系統旨在允許 Windows 運行專為 Windows、其他作業系統或早期版本 Windows 設計的應用程式。運行專為 Windows 設計的應用程式的原生子系統稱為 Win32。環境子系統在使用者模式（非特權模式）下運行。

## 7.5 章末材料
### 7.5.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
- Bic, L. and Shaw, A. *Operating Systems Principles*, Upper Saddle River, NJ: Prentice- Hall, 2003
- McHoes, A. and Flynn, I. *Understanding Operating Systems*, Boston, MA: Course Technology, 2007
- Nutt, G. *Operating Systems: A Modern Perspective*, Reading, MA: Addison-Wesley, 2001
- Silberschatz, A. and Galvin, P. *Operating System Concepts*, New York: Wiley, 2004

### 7.5.2 關鍵詞
- 驗證 (authentication)
- 批次作業系統 (batch operating system)
- 啟動程序 (bootstrap)
- 循環等待 (circular waiting)
- 死結 (deadlock)
- 請求分頁 (demand paging)
- 請求分頁與分段 (demand paging and segmentation)
- 請求分段 (demand segmentation)
- 設備管理器 (device manager)
- 分散式系統 (distributed system)
- emacs
- 頁框 (frame)
- 圖形使用者介面 (graphical user interface, GUI)
- 硬體抽象層 (hardware abstraction layer, HAL)
- 保持狀態 (hold state)
- 工作 (job)
- 工作排程器 (job scheduler)
- 核心 (kernel)
- Linux
- 記憶體管理 (memory management)
- 微軟磁碟作業系統 (Microsoft Disk Operating System, MS-DOS)
- 單道程式設計 (monoprogramming)
- 多重程式設計 (multiprogramming)
- 互斥 (mutual exclusion)
- 無搶佔 (no preemption)
- 作業系統 (operating system)
- 頁面 (page)
- 分頁 (paging)
- 平行系統 (parallel system)
- 分割 (partitioning)
- pico
- 可移植性 (portability)
- 可移植性行程排程器 (portability process scheduler)
- 行程 (process)
- 行程管理器 (process manager)
- 程式 (program)
- 佇列 (queue)
- 就緒狀態 (ready state)
- 即時系統 (real-time system)
- 可靠性 (reliability)
- 資源持有 (resource holding)
- 執行狀態 (running state)
- 排程器 (scheduler)
- 排程 (scheduling)
- shell
- 單使用者作業系統 (single-user operating system)
- 軟體 (software)
- 饑餓 (starvation)
- 狀態圖 (state diagram)
- 終止狀態 (terminated state)
- 分時 (time sharing)
- UNIX
- 使用者介面 (user interface)
- 公用程式 (utility)
- vi
- 虛擬記憶體 (virtual memory)
- 等待狀態 (waiting state)
- Windows

### 7.5.3 摘要
- 作業系統是電腦硬體與使用者之間的介面，它促進程式的執行以及對硬體和軟體資源的存取。作業系統的兩個主要設計目標是硬體的有效使用和資源的易用性。
- 作業系統經歷了漫長的演進歷史：批次系統、分時系統、個人系統、平行系統和分散式系統。現代作業系統至少有四個功能區域：記憶體管理器、行程管理器、設備管理器和檔案管理器。作業系統還提供使用者介面。
- 現代電腦系統的第一個職責是記憶體管理。記憶體分配必須由作業系統控制。記憶體管理技術可分為兩類：單道程式設計和多重程式設計。在單道程式設計中，大部分記憶體容量專用於單個程式。在多重程式設計中，記憶體中可以同時有多個程式。
- 作業系統的第二個職責是行程管理。行程是正在執行中的程式。行程管理器使用排程器和佇列來管理行程。行程管理涉及同步具有不同資源的不同行程。這可能會產生資源死結或饑餓。當作業系統不對行程施加資源限制時，就會發生死結：當作業系統對行程施加過多的資源限制時，可能會發生饑餓。
- 作業系統的第三個職責是設備或輸入/輸出管理。
- 作業系統的第四個職責是檔案管理。作業系統使用檔案管理器來控制對檔案的存取。僅允許被允許存取特定檔案的行程或使用者存取，並且存取類型可以不同。
- 兩種具有一些相似之處的常見作業系統是 UNIX 和 Linux。UNIX 是一個多使用者、多工、可移植的作業系統，由四個部分組成：核心、shell、一組標準公用程式和應用程式。Linux 有三個組件：核心、系統公用程式和系統函式庫。
- 來自微軟的一個流行的作業系統家族稱為 Windows。Windows 是一個物件導向、多層作業系統。它使用多層，包括硬體抽象層 (HAL)、執行層和環境子系統層。
`
};