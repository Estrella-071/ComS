

export const chapter16Content = {
  en: `
# Chapter 16: Security

The topic of security is very broad and involves some specific areas of mathematics such as number theory. In this chapter, we try to give a very simple introduction to this topic to prepare the background for more study.

## Objectives
After studying this chapter, the student should be able to: 
- Define security goals: confidentiality, integrity, and availability.
- Show how confidentiality can be achieved using symmetric-key and asymmetric-key cipher.
- Discuss other aspects of security: message integrity, message authentication, digital signature, entity authentication, and key management.
- Discuss the use of firewalls to protect a system from harmful messages. 

## 16.1 INTRODUCTION
We are living in the information age. We need to keep information about every aspect of our lives. In other words, information is an asset that has a value like any other asset. As an asset, information needs to be secured from attacks. To be secure, information needs to be hidden from unauthorized access (**confidentiality**), protected from unauthorized change (**integrity**), and available to an authorized entity when it is needed (**availability**).

During the last three decades, computer networks have created a revolution in the use of information. Information is now distributed. Authorized people can send and retrieve information from a distance using computer networks. Although the three above-mentioned requirements—confidentiality, integrity, and availability—have not changed, they now have some new dimensions. Not only should information be confidential when it is stored; there should also be a way to maintain its confidentiality when it is transmitted from one computer to another.

In this section, we first discuss the three major goals of information security. We then see how attacks can threaten these three goals. We then discuss the security services in relation to these security goals. Finally, we define two techniques to implement the security goals and prevent attacks.

### 16.1.1 Security goals
Let us first discuss the three security goals: confidentiality, integrity, and availability.

**Confidentiality**
**Confidentiality** is probably the most common aspect of information security. We need to protect our confidential information. An organization needs to guard against those malicious actions that endanger the confidentiality of its information. Confidentiality not only applies to the storage of information, it also applies to the transmission of information. When we send a piece of information to be stored in a remote computer or when we retrieve a piece of information from a remote computer, we need to conceal it during transmission.

**Integrity**
Information needs to be changed constantly. In a bank, when a customer deposits or withdraws money, the balance of their account needs to be changed. **Integrity** means that changes need to be done only by authorized entities and through authorized mechanisms. Integrity violation is not necessarily the result of a malicious act; an interruption in the system, such as a power surge, may also create unwanted changes in some information.

**Availability**
The third component of information security is **availability**. The information created and stored by an organization needs to be available to authorized entities. Information is useless if it is not available. Information needs to be constantly changed, which means it must be accessible to authorized entities. The unavailability of information is just as harmful for an organization as the lack of confidentiality or integrity. Imagine what would happen to a bank if the customers could not access their accounts for transactions.

### 16.1.2 Attacks
Our three goals of security—confidentiality, integrity, and availability—can be threatened by **security attacks**. Although the literature uses different approaches to categorizing the attacks, we divide them into three groups related to the security goals.

**Attacks threatening confidentiality**
In general, two types of attacks threaten the confidentiality of information: snooping and traffic analysis.

**Snooping**
**Snooping** refers to unauthorized access to or interception of data. For example, a file transferred through the Internet may contain confidential information. An unauthorized entity may intercept the transmission and use the contents for their own benefit. To prevent snooping, the data can be made nonintelligible to the intercepter by using encipherment techniques discussed later.

**Traffic analysis**
Although encipherment of data may make it nonintelligible for the intercepter, they can obtain some other type of information by monitoring online traffic. For example, they can find the electronic address (such as the email address) of the sender or the receiver. They can collect pairs of requests and responses to help them guess the nature of the transaction.

**Attacks threatening integrity**
The integrity of data can be threatened by several kinds of attacks: modification, masquerading, replaying, and repudiation.

**Modification**
After intercepting or accessing information, the attacker modifies the information to make it beneficial to them. For example, a customer sends a message to a bank to initiate some transaction. The attacker intercepts the message and changes the type of transaction to benefit them. Note that sometimes the attacker simply deletes or delays the message to harm the system or to benefit from it.

**Masquerading**
**Masquerading**, or **spoofing**, happens when the attacker impersonates somebody else. For example, an attacker might steal the bank card and PIN of a bank customer and pretend that they are that customer. Sometimes the attacker pretends instead to be the receiver entity. For example, a user tries to contact a bank, but another site pretends that it is the bank and obtains some information from the user.

**Replaying**
**Replaying** is another attack. The attacker obtains a copy of a message sent by a user and later tries to replay it. For example, a person sends a request to their bank to ask for payment to the attacker, who has done a job for them. The attacker intercepts the message and sends it again to receive another payment from the bank.

**Repudiation**
This type of attack is different from others because it is performed by one of the two parties in the communication: the sender or the receiver. The sender of the message might later deny that they have sent the message; the receiver of the message might later deny that they have received the message. An example of denial by the sender would be a bank customer asking their bank to send some money to a third party but later denying that they have made such a request. An example of denial by the receiver could occur when a person buys a product from a manufacturer and pays for it electronically, but the manufacturer later denies having received the payment and asks to be paid.

**Attacks threatening availability**
We mention only one attack threatening availability: denial of service.

**Denial of service**
**Denial of service (DoS)** is a very common attack. It may slow down or totally interrupt the service of a system. The attacker can use several strategies to achieve this. They might send so many bogus requests to a server that the server crashes because of the heavy load. The attacker might intercept and delete a server’s response to a client, making the client believe that the server is not responding. The attacker may also intercept requests from the clients, causing the clients to send requests many times and overload the system.

### 16.1.3 Services and techniques
ITU-T defines some security services to achieve security goals and prevent attacks. Each of these services is designed to prevent one or more attacks while maintaining security goals. The actual implementation of security goals needs some techniques.
Two techniques are prevalent today: one is very general (cryptography) and one is specific (steganography).

**Cryptography**
Some security services can be implemented using cryptography. **Cryptography**, a word with Greek origins, means ‘secret writing’. However, we use the term to refer to the science and art of transforming messages to make them secure and immune to attacks. Although in the past cryptography referred only to the **encryption** and **decryption** of messages using **secret keys**, today it is defined as involving three distinct mechanisms: symmetric-key encipherment, asymmetric-key encipherment, and hashing. We will discuss all these mechanisms later in the chapter.

**Steganography**
Although this chapter and the next are based on cryptography as a technique for implementing security mechanisms, another technique that was used for secret communication in the past is being revived at the present time: steganography. The word **steganography**, with origins in Greek, means ‘covered writing’, in contrast to cryptography, which means ‘secret writing’. *Cryptography* means concealing the contents of a message by enciphering; *steganography* means concealing the message itself by covering it with something else. We leave the discussion of steganography to those books dedicated to this topic.

## 16.2 CONFIDENTIALITY
We now look at the first goal of security, confidentiality. Confidentiality can be achieved using ciphers. Ciphers can be divided into two broad categories: symmetric-key and asymmetric-key.

### 16.2.1 Symmetric-key ciphers
A **symmetric-key cipher** uses the same key for both encryption and decryption, and the key can be used for bidirectional communication, which is why it is called symmetric.

**Symmetric-key ciphers are also called secret-key ciphers.**

The original message from Alice to Bob is called **plaintext**; the message that is sent through the channel is called **ciphertext**. To create the ciphertext from the plaintext, Alice uses an **encryption algorithm** and a *shared secret key*.
To create the plaintext from ciphertext, Bob uses a **decryption algorithm** and the same secret key. We refer to encryption and decryption algorithms as **ciphers**. A **key** is a set of values (numbers) that the cipher, as an algorithm, operates on.

Note that the symmetric-key encipherment uses a single key (the key itself may be a set of values) for both encryption and decryption. In addition, the encryption and decryption algorithms are inverses of each other.

**Encryption**: $C = E_k(P)$        **Decryption**: $P = D_k(C)$

Encryption can be thought of as locking the message in a box; decryption can be thought of as unlocking the box. In symmetric-key encipherment, the same key locks and unlocks.

The symmetric-key ciphers can be divided into traditional ciphers and modern ciphers. Traditional ciphers are simple, character-oriented ciphers that are not secured based on today’s standard. Modern ciphers, on the other hand, are complex, bit-oriented ciphers that are more secure. We briefly discuss the traditional ciphers to pave the way for discussing more complex modern ciphers.

**Traditional symmetric-key ciphers**
Traditional ciphers belong to the past. However, we briefly discuss them here because they can be thought of as the components of the modern ciphers. To be more exact, we can divide traditional ciphers into substitution ciphers and transposition ciphers.

**Substitution ciphers**
A **substitution cipher** replaces one symbol with another. If the symbols in the plaintext are alphabetic characters, we replace one character with another. For example, we can replace letter A with letter D and letter T with letter Z. If the symbols are digits (0 to 9), we can replace 3 with 7 and 2 with 6.
Substitution ciphers can be categorized as either monoalphabetic ciphers or polyalphabetic ciphers.

**Monoalphabetic ciphers**
In a **monoalphabetic cipher**, a character (or a symbol) in the plaintext is always changed to the same character (or symbol) in the ciphertext regardless of its position in the text. For example, if the algorithm says that letter A in the plaintext is changed to letter D, every letter A is changed to letter D. In other words, the relationship between letters in the plaintext and the ciphertext is one-to-one.
The simplest monoalphabetic cipher is the **additive cipher** (or **shift cipher**). Assume that the plaintext consists of lowercase letters (a to z), and that the ciphertext consists of uppercase letters (A to Z). To be able to apply mathematical operations on the plaintext and ciphertext, we assign numerical values to each letter (lower- or uppercase).
The encryption algorithm adds the key to the plaintext character; the decryption algorithm subtracts the key from the ciphertext character. All operations are done in modulo 26.
Historically, additive ciphers are called shift ciphers because the encryption algorithm can be interpreted as ‘shift key characters down’ and the encryption algorithm can be interpreted as ‘shift key characters up’. Julius Caesar used an additive cipher, with a key of 3, to communicate with his officers. For this reason, additive ciphers are sometimes referred to as the **Caesar cipher**.

**Polyalphabetic ciphers**
In a **polyalphabetic cipher**, each occurrence of a character may have a different substitute. The relationship between a character in the plaintext to a character in the ciphertext is one-to-many. For example, ‘a’ could be enciphered as ‘D’ at the beginning of the text, but as ‘N’ in the middle. Polyalphabetic ciphers have the advantage of hiding the letter frequency of the underlying language. Eve cannot use single-letter frequency statistics to break the ciphertext.
To create a polyalphabetic cipher, we need to make each ciphertext character dependent on both the corresponding plaintext character and the position of the plaintext character in the message.

**Transposition ciphers**
A **transposition cipher** does not substitute one symbol for another; instead it changes the location of the symbols. A symbol in the first position of the plaintext may appear in the tenth position of the ciphertext. A symbol in the eighth position in the plaintext may appear in the first position of the ciphertext. In other words, a transposition cipher reorders (transposes) the symbols.

**Stream and block ciphers**
The literature divides the symmetric ciphers into two broad categories: stream ciphers and block ciphers.

**Stream cipher**
In a **stream cipher**, encryption and decryption are done one symbol (such as a character or a bit) at a time. We have a plaintext stream, a ciphertext stream, and a key stream.

**Block ciphers**
In a **block cipher**, a group of plaintext symbols of size $m$ ($m > 1$) are encrypted together, creating a group of ciphertext of the same size. Based on the definition, in a block cipher, a single key is used to encrypt the whole block even if the key is made of multiple values. In a block cipher, a ciphertext block depends on the whole plaintext block.

**Modern symmetric-key ciphers**
The traditional symmetric-key ciphers that we have studied so far are character-oriented ciphers. With the advent of the computer, we need bit-oriented ciphers. This is because the information to be encrypted is not just text; it can also consist of numbers, graphics, audio, and video data. It is convenient to convert these types of data into a stream of bits, to encrypt the stream, and then to send the encrypted stream.

**Modern block ciphers**
A symmetric-key *modern block cipher* encrypts an $n$-bit block of plaintext or decrypts an $n$-bit block of ciphertext. The encryption or decryption algorithm uses a $k$-bit key. The decryption algorithm must be the inverse of the encryption algorithm, and both operations must use the same secret key so that Bob can retrieve the message sent by Alice.

**Modern stream ciphers**
In addition to modern block ciphers, we can also use modern stream ciphers. In a modern stream cipher, encryption and decryption are done $r$ bits at a time. Stream ciphers are faster than block ciphers. The hardware implementation of a stream cipher is also easier. When we need to encrypt binary streams and transmit them at a constant rate, a stream cipher is the better choice to use.
The simplest and the most secure type of synchronous stream cipher is called the **one-time pad**, which was invented and patented by Gilbert Vernam. A one-time pad cipher uses a key stream that is randomly chosen for each encipherment. The encryption and decryption algorithms each use a single exclusive-OR operation. The one-time pad is an ideal cipher. It is perfect. There is no way that an adversary can guess the key or the plaintext and ciphertext statistics. However, there is an issue here. How can the sender and the receiver share a one-time pad key each time they want to communicate?

### 16.2.2 Asymmetric-key ciphers
In previous sections we discussed symmetric-key ciphers. In this section, we start the discussion of **asymmetric-key ciphers**. Symmetric- and asymmetric-key ciphers will exist in parallel and continue to serve the community. We actually believe that they are complements of each other; the advantages of one can compensate for the disadvantages of the other.

The conceptual differences between the two systems are based on how these systems keep a secret. In symmetric-key cryptography, the secret must be shared between two persons. In asymmetric-key cryptography, the secret is personal (unshared); each person creates and keeps his or her own secret.

**Symmetric-key cryptography is based on sharing secrecy; asymmetric-key cryptography is based on personal secrecy.**

There are some other aspects of security besides encipherment that need asymmetric-key cryptography. These include authentication and digital signatures. Whenever an application is based on a personal secret, we need to use asymmetric-key cryptography.

Whereas symmetric-key cryptography is based on substitution and permutation of symbols (characters or bits), asymmetric-key cryptography is based on applying mathematical functions to numbers. In asymmetric-key cryptography, the plaintext and ciphertext are numbers; encryption and decryption are mathematical functions that are applied to numbers to create other numbers.

**In symmetric-key cryptography, symbols are permuted or substituted; in asymmetric-key cryptography, numbers are manipulated.**

Asymmetric-key cryptography uses two separate keys: one private and one public. If encryption and decryption are thought of as locking and unlocking padlocks with keys, then the padlock that is locked with a public key can be unlocked only with the corresponding private key.

**Asymmetric-key ciphers are sometimes called public-key ciphers.**

**General idea**
The burden of providing security is mostly on the shoulders of the receiver (Bob, in this case). Bob needs to create two keys: one private and one public. Bob is responsible for distributing the public key to the community.
Second, asymmetric-key cryptography means that Bob and Alice cannot use the same set of keys for two-way communication. Each entity in the community should create its own private and public keys.
Third, asymmetric-key cryptography means that Bob needs only one private key to receive all correspondence from anyone in the community, but Alice needs $n$ public keys to communicate with $n$ entities in the community, one public key for each entity. In other words, Alice needs a ring of public keys.

**Plaintext/ciphertext**
Unlike in symmetric-key cryptography, plaintext and ciphertext in asymmetric-key cryptography are treated as integers. The message must be encoded as an integer (or a set of integers) before encryption; the integer (or the set of integers) must be decoded into the message after decryption. Asymmetric-key cryptography is normally used to encrypt or decrypt small pieces of information, such as the cipher key for a symmetric-key cryptography.

**Asymmetric-key cryptography is normally used to encrypt or decrypt small pieces of information.**

**RSA cryptosystem**
Although there are several asymmetric-key cryptosystems, one of the common public-key algorithms is the **RSA cryptosystem**, named for its inventors (Rivest, Shamir, and Adleman). RSA uses two exponents, $e$ and $d$, where $e$ is public and $d$ is private. Suppose $P$ is the plaintext and $C$ is the ciphertext. Alice uses $C = P^e \\pmod n$ to create ciphertext $C$ from plaintext $P$; Bob uses $P = C^d \\pmod n$ to retrieve the plaintext sent by Alice. The modulus $n$, a very large number, is created during the key generation process.

Bob chooses two large numbers, $p$ and $q$, and calculates $n = p \\times q$ and $\\phi = (p - 1) \\times (q - 1)$. Bob then selects $e$ and $d$ such that $(e \\times d) \\pmod \\phi = 1$. Bob advertises $e$ and $n$ to the community as the public key; Bob keeps $d$ as the private key. Anyone, including Alice, can encrypt a message and send the ciphertext to Bob, using $C = P^e \\pmod n$; only Bob can decrypt the message, using $P = C^d \\pmod n$. An intruder such as Eve cannot decrypt the message if $p$ and $q$ are very large numbers (she does not know $d$).

Although RSA can be used to encrypt and decrypt actual messages, it is very slow if the message is long. RSA, therefore, is useful for short messages. In particular, we will see that RSA is used in digital signatures and other cryptosystems that often need to encrypt a small message without having access to a symmetric key.

## 16.3 OTHER ASPECTS OF SECURITY
The cryptography systems that we have studied so far provide confidentiality. However, in modern communication, we need to take care of other aspects of security, such as integrity, message and entity authentication, non-repudiation, and key management. We briefly discuss these issues in this section.

### 16.3.1 Message integrity
There are occasions where we may not even need secrecy but instead must have integrity: the message should remain unchanged.

**Message and message digest**
One way to preserve the integrity of a document is through the use of a **fingerprint**. The electronic equivalent of the document and fingerprint pair is the message and digest pair. To preserve the integrity of a message, the message is passed through an algorithm called a **cryptographic hash function**. The function creates a compressed image of the message, called a **digest**, that can be used like a fingerprint. To check the integrity of a message or document, Bob runs the cryptographic hash function again and compares the new digest with the previous one. If both are the same, Bob is sure that the original message has not been changed.

**The message digest needs to be safe from change.**

**Hash functions**
A cryptographic hash function takes a message of arbitrary length and creates a message digest of fixed length. All cryptographic hash functions need to create a fixed-size digest out of a variable-size message. Creating such a function is best accomplished using iteration. Instead of using a hash function with variable-size input, a function with fixed-size input is created and is used a necessary number of times. The fixed-size input function is referred to as a compression function. It compresses an $n$-bit string to create an $m$-bit string where $n$ is normally greater than $m$. The scheme is referred to as an *iterated cryptographic hash function*.
Several hash algorithms were designed by Ron Rivest. These are referred to as **MD2**, **MD4**, and **MD5**, where MD stands for **message digest**. The last version, MD5, is a strengthened version of MD4 that divides the message into blocks of 512 bits and creates a 128-bit digest. It turns out, however, that a message digest of size 128 bits is too small to resist attack.
In response to the insecurity of MD hash algorithms, the Secure Hash Algorithm was invented. The **Secure Hash Algorithm (SHA)** is a standard that was developed by the National Institute of Standards and Technology (NIST). SHA has gone through several versions.

### 16.3.2 Message authentication
A digest can be used to check the integrity of a message—that the message has not been changed. To ensure the integrity of the message and the data origin authentication—that Alice is the originator of the message, not somebody else—we need to include a secret shared by Alice and Bob (that Eve does not possess) in the process; we need to create a **message authentication code (MAC)**.

Alice uses a hash function to create a MAC from the concatenation of the key and the message, $h(K + M)$. She sends the message and the MAC to Bob over the insecure channel. Bob separates the message from the MAC. He then makes a new MAC from the concatenation of the message and the secret key. Bob then compares the newly created MAC with the one received. If the two MACs match, the message is authentic and has not been modified by an adversary.

**A MAC provides message integrity and message authentication using a combination of a hash function and a secret key.**

### 16.3.3 Digital signature
Another way to provide message integrity and message authentication (and some more security services, as we will see shortly) is a digital signature. A MAC uses a secret key to protect the digest; a digital signature uses a pair of private–public keys.

**A digital signature uses a pair of private–public keys.**

When Alice sends a message to Bob, Bob needs to check the authenticity of the sender; he needs to be sure that the message comes from Alice and not Eve. Bob can ask Alice to sign the message electronically. In other words, an electronic signature can prove the authenticity of Alice as the sender of the message. We refer to this type of signature as a **digital signature**.

**Comparison**
- **Inclusion**: A conventional signature is included in the document; it is part of the document. But when we sign a document digitally, we send the signature as a separate document.
- **Verification method**: For a conventional signature, when the recipient receives a document, they compare the signature on the document with the signature on file. For a digital signature, the recipient receives the message and the signature. The recipient needs to apply a verification technique to the combination of the message and the signature to verify the authenticity.
- **Relationship**: For a conventional signature, there is normally a one-to-many relationship between a signature and documents. For a digital signature, there is a one-to-one relationship between a signature and a message. Each message has its own signature.
- **Duplicity**: Another difference between the two types of signatures is a quality called *duplicity*. With a conventional signature, a copy of the signed document can be distinguished from the original one on file. With a digital signature, there is no such distinction unless there is a factor of time (such as a timestamp) on the document.

**Process**
The sender uses a **signing algorithm** to sign the message. The message and the signature are sent to the receiver. The receiver receives the message and the signature and applies the **verifying algorithm** to the combination. If the result is true, the message is accepted; otherwise, it is rejected.

In a digital signature, the signer uses her **private key**, applied to a signing algorithm, to sign the document. The verifier, on the other hand, uses the **public key** of the signer, applied to the verifying algorithm, to verify the document.

**A digital signature needs a public-key system. The signer signs with her private key; the verifier verifies with the signer’s public key.**

**A cryptosystem uses the private and public keys of the receiver; a digital signature uses the private and public keys of the sender.**

**Signing the digest**
Asymmetric-key cryptosystems are very inefficient when dealing with long messages. In a digital signature system, the messages are normally long, but we have to use asymmetric-key schemes. The solution is to sign a digest of the message, which is much shorter than the message. A carefully selected message digest has a one-to-one relationship with the message. The sender can sign the message digest and the receiver can verify the message digest. The effect is the same.

**Services**
- **Message authentication**: A secure digital signature scheme can provide message authentication (also referred to as data-origin authentication). Bob can verify that the message is sent by Alice because Alice’s public key is used in verification. Alice’s public key cannot verify the signature signed by Eve’s private key.
- **Message integrity**: The integrity of the message is preserved if we sign the message or the digest of the message because we cannot get the same digest if any part of the message is changed.
- **Nonrepudiation**: If Alice signs a message and then denies it, Bob can prove that Alice actually signed it. One solution is a trusted third party. People can create an established trusted party among themselves.

**Confidentiality**
A digital signature does not provide confidential communication. If confidentiality is required, the message and the signature must be encrypted using either a symmetric-key or an asymmetric-key cipher.

### 16.3.4 Entity authentication
**Entity authentication** is a technique designed to let one party verify the identity of another party. An **entity** can be a person, a process, a client, or a server. The entity whose identity needs to be proven is called the **claimant**; the party that tries to verify the identity of the claimant is called the **verifier**.

**Entity versus message authentication**
1.  Message authentication (or data-origin authentication) might not happen in real time; entity authentication does. In the former, Alice sends a message to Bob. When Bob authenticates the message, Alice may or may not be present in the communication process. On the other hand, when Alice requests entity authentication, there is no real message communication involved until Alice is authenticated by Bob. Alice needs to be online and to take part in the process.
2.  Message authentication simply authenticates one message; the process needs to be repeated for each new message. Entity authentication authenticates the claimant for the entire duration of a session.

**Verification categories**
In entity authentication, the claimant must identify him- or herself to the verifier. This can be done with one of three kinds of witnesses: something known, something possessed, or something inherent.
- **Something known**: This is a secret known only by the claimant that can be checked by the verifier. Examples are a password, a PIN, a secret key, and a private key.
- **Something possessed**: This is something that can prove the claimant’s identity. Examples are a passport, a driver’s license, an identification card, a credit card, and a smart card.
- **Something inherent**: This is an inherent characteristic of the claimant. Examples are conventional signatures, fingerprints, voice, facial characteristics, retinal pattern, and handwriting.

**Passwords**
The simplest and oldest method of entity authentication is the use of a **password**, which is something that the claimant *knows*. A password is used when a user needs to access a system’s resources (login). Each user has a user identification that is public, and a password that is private. Passwords, however, are very prone to attack.

**Challenge–response**
In password authentication, the claimant proves her identity by demonstrating that she knows a secret, the password. However, because the claimant sends this secret, it is susceptible to interception by the adversary. In **challenge–response authentication**, the claimant proves that she *knows* a secret without sending it to the verifier. In other words, the claimant does not send the secret to the verifier; the verifier either has it or finds it.

**In challenge–response authentication, the claimant proves that she knows a secret without sending it to the verifier.**

The **challenge** is a time-varying value such as a random number or a timestamp that is sent by the verifier. The claimant applies a function to the challenge and sends the result, called a **response**, to the verifier. The response shows that the claimant knows the secret.

**Using a symmetric-key cipher**
Several approaches to challenge–response authentication use **symmetric-key encryption**. The secret here is the shared secret key, known by both the claimant and the verifier. The function is the encrypting algorithm applied on the challenge.

**Using an asymmetric-key cipher**
Instead of a symmetric-key cipher, we can use an asymmetric-key cipher for entity authentication. Here the secret must be the private key of the claimant. The claimant must show that she owns the private key related to the public key that is available to everyone.

**Using digital signatures**
Entity authentication can also be achieved using a digital signature. When a digital signature is used for entity authentication, the claimant uses her private key for signing.

### 16.3.5 Key management
We discussed symmetric-key and asymmetric-key cryptography in the previous sections. However, we have not yet discussed how secret keys in symmetric-key cryptography, and public keys in asymmetric-key cryptography, are distributed and maintained. This section touches on these two issues.

**Symmetric-key distribution**
Symmetric-key cryptography is more efficient than asymmetric-key cryptography for enciphering large messages. Symmetric-key cryptography, however, needs a shared secret key between two parties.
If Alice needs to exchange confidential messages with $N$ people, she needs $N$ different keys. What if $N$ people need to communicate with each other? A total of $N(N - 1)/2$ keys are needed. This is normally referred to as the $N^2$ problem because the number of required keys for $N$ entities is close to $N^2$.
The number of keys is not the only problem; the distribution of keys is another. Using the Internet is definitely not a secure method.

**Key distribution center: KDC**
A practical solution is the use of a trusted third party, referred to as a **key-distribution center (KDC)**. To reduce the number of keys, each person establishes a shared secret key with the KDC. A secret key is established between the KDC and each member. Now the question is how Alice can send a confidential message to Bob.
1.  Alice sends a request to the KDC stating that she needs a session (temporary) secret key between herself and Bob.
2.  The KDC informs Bob about Alice’s request.
3.  If Bob agrees, a session key is created between the two.
The secret key between Alice and Bob that is established with the KDC is used to authenticate Alice and Bob to the KDC and to prevent Eve from impersonating either of them.

**Session keys**
A KDC creates a secret key for each member. This secret key can be used only between the member and the KDC, not between two members. If Alice needs to communicate secretly with Bob, she needs a secret key between herself and Bob. A KDC can create a **session key** between Alice and Bob, using their keys with the center. The keys of Alice and Bob are used to authenticate Alice and Bob to the center and to each other before the session key is established. After communication is terminated, the session key is no longer useful.

**A session symmetric key between two parties is used only once.**

**Public-key distribution**
In asymmetric-key cryptography, people do not need to know a symmetric shared key. If Alice wants to send a message to Bob, she only needs to know Bob’s public key, which is open to the public and available to everyone. In public-key cryptography, everyone shields a private key and advertises a public key.

**In public-key cryptography, everyone has access to everyone’s public key; public keys are available to the public.**

**Public announcement**
The naive approach is to announce public keys publicly. Bob can put his public key on his website or announce it in a local or national newspaper. This approach, however, is not secure; it is subject to forgery. For example, Eve could make such a public announcement. Eve can fool Alice into sending her a message that is intended for Bob.

**Certification authority**
The common approach to distributing public keys is to create **public-key certificates**. Bob wants two things; he wants people to know his public key, and he wants no one to accept a forged public key as his. Bob can go to a **certification authority (CA)**, a federal or state organization that binds a public key to an entity and issues a certificate.
The CA itself has a well-known public key that cannot be forged. The CA checks Bob’s identification. It then asks for Bob’s public key and writes it on the certificate. To prevent the certificate itself from being forged, the CA signs the certificate with its private key. Now Bob can upload the signed certificate. Anyone who wants Bob’s public key downloads the signed certificate and uses the authority’s public key to extract Bob’s public key.

**X.509**
Although the use of a CA has solved the problem of public-key fraud, it has created a **side effect**. Each certificate may have a different format. Anything that needs to be used universally must have a universal format. To remove this side effect, the ITU has designed **X.509**, a recommendation that has been accepted by the Internet with some changes. X.509 is a way to describe the certificate in a structured way. It uses a well-known protocol called ASN.1 that defines fields familiar to computer programmers.

## 16.4 FIREWALLS
All previous security measures cannot prevent Eve from sending a harmful message to a system. To control access to a system we need firewalls. A **firewall** is a device (usually a router or a computer) installed between the internal network of an organization and the rest of the Internet. It is designed to forward some packets and filter (not forward) others.

For example, a firewall may filter all incoming packets destined for a specific host or a specific server such as HTTP. A firewall can be used to deny access to a specific host or a specific service in the organization. A firewall is usually classified as a *packet-filter firewall* or a *proxy-based firewall*.

### 16.4.1 Packet-filter firewall
A firewall can be used as a packet filter. It can forward or block packets based on the information in the network-layer and transport-layer headers: source and destination IP addresses, source and destination **port addresses**, and type of protocol (TCP or UDP). A **packet-filter firewall** is a router that uses a filtering table to decide which packets must be discarded (not forwarded).

### 16.4.2 Proxy firewall
The packet-filter firewall is based on the information available in the network-layer and transport-layer headers (IP and TCP/UDP). However, sometimes we need to filter a message based on the information available in the message itself (at the application layer). As an example, assume that an organization wants to implement the following policies regarding its web pages: only those Internet users who have previously established business relations with the company can have access; access to other users must be blocked. In this case, a packet-filter firewall is not feasible because it cannot distinguish between different packets arriving at TCP port 80 (HTTP). Testing must be done at the application level (using URLs).

One solution is to install a proxy computer (sometimes called an **application gateway**), which stands between the customer computer and the corporation computer. When the user client process sends a message, the application gateway runs a server process to receive the request. The server opens the packet at the application level and finds out if the request is legitimate. If it is, the server acts as a client process and sends the message to the real server in the corporation. If it is not, the message is dropped and an error message is sent to the external user. In this way, the requests of the external users are filtered based on the contents at the application layer.

## 16.5 END-CHAPTER MATERIALS
### 16.5.2 Key terms
- additive cipher
- application gateway
- asymmetric-key cipher
- autokey cipher
- availability
- block cipher
- caesar cipher
- certification authority (CA)
- challenge–response authentication
- cipher
- ciphertext
- confidentiality
- cryptographic hash function
- cryptography
- decryption
- decryption algorithm
- denial of service (DoS)
- digest
- digital signature
- encryption
- encryption algorithm
- firewall
- hashed MAC (HMAC)
- integrity
- key
- key-distribution center (KDC)
- masquerading
- message authentication code (MAC)
- message digest (MD)
- monoalphabetic cipher
- one-time pad
- packet-filter firewall
- plaintext
- polyalphabetic cipher
- port address
- private key
- proxy firewall
- public key
- public-key certificate
- replaying
- RSA cryptosystem
- secret key
- Secure Hash Algorithm (SHA)
- security attack
- security goal
- shift cipher
- side effect
- snooping
- spoofing
- steganography
- stream cipher
- substitution cipher
- symmetric-key cipher
- symmetric-key encryption
- ticket
- traffic analysis
- transposition cipher
- verifying algorithm
- X.509

### 16.5.3 Summary
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
# 第十六章：安全性

安全性的主題非常廣泛，涉及一些特定的數學領域，如數論。在本章中，我們試圖對此主題做一個非常簡單的介紹，為更深入的學習做準備。

## 學習目標
學完本章後，學生應能：
- 定義安全性目標：機密性、完整性和可用性。
- 展示如何使用對稱金鑰和非對稱金鑰加密法實現機密性。
- 討論安全性的其他方面：訊息完整性、訊息驗證、數位簽章、實體驗證和金鑰管理。
- 討論如何使用防火牆保護系統免受有害訊息的侵害。

## 16.1 簡介
我們生活在資訊時代。我們需要保存關於生活各個方面的資訊。換句話說，資訊是一種像任何其他資產一樣有價值的資產。作為一種資產，資訊需要免受攻擊。為了安全，資訊需要隱藏以防止未經授權的存取（**機密性**），保護以免受未經授權的更改（**完整性**），並在需要時對授權實體可用（**可用性**）。

在過去的三十年中，電腦網路在資訊的使用上創造了一場革命。資訊現在是分散式的。授權人員可以使用電腦網路從遠處發送和檢索資訊。雖然上述三個要求——機密性、完整性和可用性——沒有改變，但它們現在有了一些新的維度。資訊不僅在儲存時應該保密；還應該有一種方法在從一台電腦傳輸到另一台電腦時保持其機密性。

在本節中，我們首先討論資訊安全的三個主要目標。然後我們看看攻擊如何威脅這三個目標。接著我們討論與這些安全目標相關的安全服務。最後，我們定義兩種技術來實現安全目標並防止攻擊。

### 16.1.1 安全性目標
讓我們先討論三個安全性目標：機密性、完整性和可用性。

**機密性 (Confidentiality)**
**機密性**可能是資訊安全中最常見的方面。我們需要保護我們的機密資訊。組織需要防範那些危及資訊機密性的惡意行為。機密性不僅適用於資訊的儲存，也適用於資訊的傳輸。當我們發送一條資訊以儲存在遠端電腦中，或當我們從遠端電腦檢索一條資訊時，我們需要在傳輸過程中將其隱藏。

**完整性 (Integrity)**
資訊需要不斷更改。在銀行中，當客戶存款或取款時，他們的帳戶餘額需要更改。**完整性**意味著更改只能由授權實體並通過授權機制完成。完整性違規不一定是惡意行為的結果；系統中的中斷，例如電湧，也可能在某些資訊中產生不必要的更改。

**可用性 (Availability)**
資訊安全的第三個組成部分是**可用性**。組織創建和儲存的資訊需要對授權實體可用。如果資訊不可用，它就是無用的。資訊需要不斷更改，這意味著它必須可供授權實體存取。資訊的不可用性對組織的危害與缺乏機密性或完整性一樣大。想像一下，如果客戶無法存取他們的帳戶進行交易，銀行會發生什麼事。

### 16.1.2 攻擊
我們的三個安全性目標——機密性、完整性和可用性——可能會受到**安全性攻擊**的威脅。雖然文獻使用不同的方法對攻擊進行分類，但我們將它們分為與安全性目標相關的三組。

**威脅機密性的攻擊**
一般來說，有兩種類型的攻擊威脅資訊的機密性：窺探和流量分析。

**窺探 (Snooping)**
**窺探**是指未經授權存取或攔截資料。例如，透過網際網路傳輸的檔案可能包含機密資訊。未經授權的實體可能會攔截傳輸並將內容用於自己的利益。為了防止窺探，可以使用稍後討論的加密技術使攔截者無法理解資料。

**流量分析 (Traffic analysis)**
雖然資料加密可能會使攔截者無法理解資料，但他們可以透過監控線上流量來獲取其他類型的資訊。例如，他們可以找到發送者或接收者的電子位址（如電子郵件地址）。他們可以收集請求和回應對，以幫助他們猜測交易的性質。

**威脅完整性的攻擊**
資料的完整性可能會受到幾種攻擊的威脅：修改、偽裝、重放和否認。

**修改 (Modification)**
在攔截或存取資訊後，攻擊者會修改資訊以使其對自己有利。例如，客戶向銀行發送訊息以啟動某些交易。攻擊者攔截訊息並更改交易類型以使自己受益。請注意，有時攻擊者只是刪除或延遲訊息以損害系統或從中受益。

**偽裝 (Masquerading)**
**偽裝**或**欺騙 (spoofing)** 發生在攻擊者冒充他人時。例如，攻擊者可能會竊取銀行客戶的銀行卡和 PIN 碼，並假裝自己是該客戶。有時攻擊者假裝是接收實體。例如，使用者試圖聯繫銀行，但另一個網站假裝是銀行並從使用者那裡獲取一些資訊。

**重放 (Replaying)**
**重放**是另一種攻擊。攻擊者獲取使用者發送的訊息副本，稍後嘗試重放它。例如，一個人向銀行發送請求，要求向為其完成工作的攻擊者付款。攻擊者攔截訊息並再次發送以從銀行獲得另一筆付款。

**否認 (Repudiation)**
這種類型的攻擊與其他攻擊不同，因為它是由通訊中的兩方之一執行的：發送者或接收者。訊息的發送者稍後可能會否認他們發送了該訊息；訊息的接收者稍後可能會否認他們收到了該訊息。發送者否認的一個例子是銀行客戶要求銀行向第三方匯款，但後來否認他們提出了這樣的請求。接收者否認的一個例子可能發生在一個人從製造商那裡購買產品並以電子方式付款，但製造商後來否認收到付款並要求付款。

**威脅可用性的攻擊**
我們只提到一種威脅可用性的攻擊：阻斷服務。

**阻斷服務 (Denial of service)**
**阻斷服務 (DoS)** 是一種非常常見的攻擊。它可能會減慢或完全中斷系統的服務。攻擊者可以使用幾種策略來實現這一目標。他們可能會向伺服器發送大量虛假請求，導致伺服器因負載過重而崩潰。攻擊者可能會攔截並刪除伺服器對客戶端的回應，使客戶端認為伺服器沒有回應。攻擊者也可能攔截來自客戶端的請求，導致客戶端多次發送請求並使系統過載。

### 16.1.3 服務與技術
ITU-T 定義了一些安全性服務來實現安全性目標並防止攻擊。這些服務中的每一項都旨在防止一種或多種攻擊，同時維護安全性目標。安全性目標的實際實作需要一些技術。
今天流行兩種技術：一種是非常通用的（密碼學），一種是特定的（隱寫術）。

**密碼學 (Cryptography)**
一些安全性服務可以使用密碼學來實現。**密碼學**一詞源於希臘語，意思是「秘密寫作」。然而，我們使用該術語來指代轉換訊息使其安全並免受攻擊的科學與藝術。雖然在過去，密碼學僅指使用**秘密金鑰**對訊息進行**加密**和**解密**，但今天它被定義為涉及三種不同的機制：對稱金鑰加密、非對稱金鑰加密和雜湊。我們將在本章稍後討論所有這些機制。

**隱寫術 (Steganography)**
雖然本章和下一章是基於密碼學作為實作安全機制的技術，但在過去用於秘密通訊的另一種技術目前正在復興：隱寫術。**隱寫術**一詞源於希臘語，意思是「覆蓋寫作」，與意為「秘密寫作」的密碼學形成對比。*密碼學*意味著透過加密來隱藏訊息的內容；*隱寫術*意味著透過用其他東西覆蓋訊息來隱藏訊息本身。我們將隱寫術的討論留給專門討論此主題的書籍。

## 16.2 機密性
我們現在來看安全性的第一個目標，機密性。可以使用加密法實現機密性。加密法可以分為兩大類：對稱金鑰和非對稱金鑰。

### 16.2.1 對稱金鑰加密法
**對稱金鑰加密法**使用相同的金鑰進行加密和解密，並且該金鑰可用於雙向通訊，這就是為什麼它被稱為對稱的原因。

**對稱金鑰加密法也稱為秘密金鑰加密法。**

從 Alice 到 Bob 的原始訊息稱為**明文**；透過通道發送的訊息稱為**密文**。為了從明文創建密文，Alice 使用**加密演算法**和*共享秘密金鑰*。
為了從密文創建明文，Bob 使用**解密演算法**和相同的秘密金鑰。我們將加密和解密演算法稱為**加密法 (ciphers)**。**金鑰**是一組值（數字），加密法作為演算法對其進行操作。

請注意，對稱金鑰加密使用單個金鑰（金鑰本身可能是一組值）進行加密和解密。此外，加密和解密演算法互為逆運算。

**加密**: $C = E_k(P)$        **解密**: $P = D_k(C)$

加密可以被認為是將訊息鎖在盒子裡；解密可以被認為是解鎖盒子。在對稱金鑰加密中，同一把鑰匙用於鎖定和解鎖。

對稱金鑰加密法可以分為傳統加密法和現代加密法。傳統加密法是簡單的、面向字元的加密法，基於今天的標準並不安全。另一方面，現代加密法是複雜的、面向位元的加密法，更加安全。我們簡要討論傳統加密法，為討論更複雜的現代加密法鋪路。

**傳統對稱金鑰加密法**
傳統加密法屬於過去。然而，我們在這裡簡要討論它們，因為它們可以被認為是現代加密法的組成部分。更確切地說，我們可以將傳統加密法分為替換加密法和換位加密法。

**替換加密法 (Substitution ciphers)**
**替換加密法**用一個符號替換另一個符號。如果明文中的符號是字母字元，我們用另一個字元替換一個字元。例如，我們可以用字母 D 替換字母 A，用字母 Z 替換字母 T。如果符號是數字（0 到 9），我們可以用 7 替換 3，用 6 替換 2。
替換加密法可以歸類為單字母加密法或多字母加密法。

**單字母加密法 (Monoalphabetic ciphers)**
在**單字母加密法**中，明文中的一個字元（或符號）總是變更為密文中的同一個字元（或符號），無論其在文本中的位置如何。例如，如果演算法說明文中的字母 A 變更為字母 D，那麼每個字母 A 都會變更為字母 D。換句話說，明文和密文中的字母之間的關係是一對一的。
最簡單的單字母加密法是**加法加密法**（或**移位加密法**）。假設明文由小寫字母（a 到 z）組成，密文由大寫字母（A 到 Z）組成。為了能夠對明文和密文應用數學運算，我們為每個字母（小寫或大寫）分配數值。
加密演算法將金鑰加到明文字元上；解密演算法從密文字元中減去金鑰。所有操作都在模 26 中完成。
歷史上，加法加密法被稱為移位加密法，因為加密演算法可以解釋為「將金鑰字元向下移位」，加密演算法可以解釋為「將金鑰字元向上移位」。朱利葉斯·凱撒使用加法加密法，金鑰為 3，與他的軍官通訊。因此，加法加密法有時被稱為**凱撒密碼**。

**多字母加密法 (Polyalphabetic ciphers)**
在**多字母加密法**中，每個出現的字元可能有不同的替換。明文字元與密文字元的關係是一對多的。例如，'a' 在文本開頭可能被加密為 'D'，但在中間可能被加密為 'N'。多字母加密法的優點是隱藏了底層語言的字母頻率。Eve 無法使用單字母頻率統計來破解密文。
為了創建多字母加密法，我們需要使每個密文字元同時依賴於相應的明文字元和明文字元在訊息中的位置。

**換位加密法 (Transposition ciphers)**
**換位加密法**不替換一個符號為另一個符號；相反，它改變符號的位置。明文第一個位置的符號可能出現在密文的第十個位置。明文第八個位置的符號可能出現在密文的第一個位置。換句話說，換位加密法重新排序（換位）符號。

**串流和區塊加密法**
文獻將對稱加密法分為兩大類：串流加密法和區塊加密法。

**串流加密法 (Stream cipher)**
在**串流加密法**中，加密和解密是一次一個符號（如字元或位元）進行的。我們有明文串流、密文串流和金鑰串流。

**區塊加密法 (Block ciphers)**
在**區塊加密法**中，大小為 $m$ ($m > 1$) 的一組明文符號被一起加密，創建相同大小的一組密文。根據定義，在區塊加密法中，單個金鑰用於加密整個區塊，即使金鑰由多個值組成。在區塊加密法中，密文區塊取決於整個明文區塊。

**現代對稱金鑰加密法**
我們到目前為止學習的傳統對稱金鑰加密法是面向字元的加密法。隨著電腦的出現，我們需要面向位元的加密法。這是因為要加密的資訊不僅僅是文字；它還可以由數字、圖形、音訊和視訊資料組成。將這些類型的資料轉換為位元流，加密該流，然後發送加密流是很方便的。

**現代區塊加密法**
對稱金鑰*現代區塊加密法*加密 $n$ 位元明文區塊或解密 $n$ 位元密文區塊。加密或解密演算法使用 $k$ 位元金鑰。解密演算法必須是加密演算法的逆運算，並且兩個操作必須使用相同的秘密金鑰，以便 Bob 可以檢索 Alice 發送的訊息。

**現代串流加密法**
除了現代區塊加密法，我們還可以使用現代串流加密法。在現代串流加密法中，加密和解密是一次 $r$ 位元進行的。串流加密法比區塊加密法快。串流加密法的硬體實作也更容易。當我們需要加密二進位串流並以恆定速率傳輸它們時，串流加密法是更好的選擇。
最簡單和最安全的同步串流加密法類型稱為**一次性密碼本 (one-time pad)**，由 Gilbert Vernam 發明並獲得專利。一次性密碼本加密法使用為每次加密隨機選擇的金鑰流。加密和解密演算法各使用單個互斥或 (XOR) 運算。一次性密碼本是一種理想的加密法。它是完美的。對手無法猜測金鑰或明文和密文的統計數據。然而，這裡有一個問題。發送者和接收者如何能在每次想要通訊時分享一個一次性密碼本金鑰？

### 16.2.2 非對稱金鑰加密法
在前幾節中，我們討論了對稱金鑰加密法。在本節中，我們開始討論**非對稱金鑰加密法**。對稱和非對稱金鑰加密法將並行存在並繼續服務社群。我們實際上認為它們是互補的；一種的優點可以彌補另一種的缺點。

這兩個系統之間的概念差異在於這些系統如何保守秘密。在對稱金鑰密碼學中，秘密必須在兩個人之間共享。在非對稱金鑰密碼學中，秘密是個人的（不共享）；每個人創建並保存自己的秘密。

**對稱金鑰密碼學基於共享秘密；非對稱金鑰密碼學基於個人秘密。**

除了加密之外，還有其他一些安全性方面需要非對稱金鑰密碼學。這些包括驗證和數位簽章。每當應用程式基於個人秘密時，我們就需要使用非對稱金鑰密碼學。

雖然對稱金鑰密碼學基於符號（字元或位元）的替換和排列，但非對稱金鑰密碼學基於對數字應用數學函數。在非對稱金鑰密碼學中，明文和密文是數字；加密和解密是應用於數字以創建其他數字的數學函數。

**在對稱金鑰密碼學中，符號被排列或替換；在非對稱金鑰密碼學中，數字被操作。**

非對稱金鑰密碼學使用兩個獨立的金鑰：一個私鑰和一個公鑰。如果將加密和解密視為用鑰匙鎖定和解鎖掛鎖，那麼用公鑰鎖定的掛鎖只能用相應的私鑰解鎖。

**非對稱金鑰加密法有時稱為公開金鑰加密法。**

**基本概念**
提供安全性的負擔主要在接收者（在本例中為 Bob）肩上。Bob 需要創建兩個金鑰：一個私鑰和一個公鑰。Bob 負責將公鑰分發給社群。
其次，非對稱金鑰密碼學意味著 Bob 和 Alice 不能使用同一組金鑰進行雙向通訊。社群中的每個實體都應創建自己的私鑰和公鑰。
第三，非對稱金鑰密碼學意味著 Bob 只需要一個私鑰來接收來自社群中任何人的所有信件，但 Alice 需要 $n$ 個公鑰與社群中的 $n$ 個實體通訊，每個實體一個公鑰。換句話說，Alice 需要一串公鑰。

**明文/密文**
與對稱金鑰密碼學不同，非對稱金鑰密碼學中的明文和密文被視為整數。訊息在加密前必須編碼為整數（或一組整數）；整數（或一組整數）在解密後必須解碼為訊息。非對稱金鑰密碼學通常用於加密或解密小塊資訊，例如對稱金鑰密碼學的密碼金鑰。

**非對稱金鑰密碼學通常用於加密或解密小塊資訊。**

**RSA 密碼系統**
雖然有幾種非對稱金鑰密碼系統，但常見的公開金鑰演算法之一是 **RSA 密碼系統**，以其發明者（Rivest、Shamir 和 Adleman）命名。RSA 使用兩個指數，$e$ 和 $d$，其中 $e$ 是公開的，$d$ 是私有的。假設 $P$ 是明文，$C$ 是密文。Alice 使用 $C = P^e \\pmod n$ 從明文 $P$ 創建密文 $C$；Bob 使用 $P = C^d \\pmod n$ 檢索 Alice 發送的明文。模數 $n$ 是一個非常大的數字，在金鑰生成過程中創建。

Bob 選擇兩個大數 $p$ 和 $q$，並計算 $n = p \\times q$ 和 $\\phi = (p - 1) \\times (q - 1)$。然後 Bob 選擇 $e$ 和 $d$，使得 $(e \\times d) \\pmod \\phi = 1$。Bob 向社群公佈 $e$ 和 $n$ 作為公鑰；Bob 保留 $d$ 作為私鑰。任何人，包括 Alice，都可以加密訊息並將密文發送給 Bob，使用 $C = P^e \\pmod n$；只有 Bob 可以解密訊息，使用 $P = C^d \\pmod n$。入侵者如 Eve 如果 $p$ 和 $q$ 是非常大的數字，則無法解密訊息（她不知道 $d$）。

雖然 RSA 可用於加密和解密實際訊息，但如果訊息很長，它會非常慢。因此，RSA 適用於短訊息。特別是，我們將看到 RSA 用於數位簽章和其他經常需要加密小訊息而無需存取對稱金鑰的密碼系統。

## 16.3 安全性的其他方面
我們到目前為止學習的密碼學系統提供了機密性。然而，在現代通訊中，我們需要關注安全性的其他方面，如完整性、訊息和實體驗證、不可否認性和金鑰管理。我們在本節簡要討論這些問題。

### 16.3.1 訊息完整性
有些場合我們甚至可能不需要保密，但必須有完整性：訊息應保持不變。

**訊息與訊息摘要**
保持文件完整性的一種方法是使用**指紋**。文件和指紋對的電子等價物是訊息和摘要對。為了保持訊息的完整性，訊息通過稱為**密碼雜湊函數**的演算法。該函數創建訊息的壓縮影像，稱為**摘要**，可以像指紋一樣使用。為了檢查訊息或文件的完整性，Bob 再次運行密碼雜湊函數，並將新摘要與前一個摘要進行比較。如果兩者相同，Bob 確信原始訊息未被更改。

**訊息摘要需要防止更改。**

**雜湊函數**
密碼雜湊函數獲取任意長度的訊息並創建固定長度的訊息摘要。所有密碼雜湊函數都需要從可變大小的訊息中創建固定大小的摘要。創建這樣的函數最好使用迭代來完成。不是使用具有可變大小輸入的雜湊函數，而是創建一個具有固定大小輸入的函數，並使用必要的次數。固定大小輸入函數稱為壓縮函數。它壓縮 $n$ 位元字串以創建 $m$ 位元字串，其中 $n$ 通常大於 $m$。該方案稱為*迭代密碼雜湊函數*。
Ron Rivest 設計了幾種雜湊演算法。這些被稱為 **MD2**、**MD4** 和 **MD5**，其中 MD 代表**訊息摘要**。最後一個版本 MD5 是 MD4 的增強版本，它將訊息分為 512 位元的區塊並創建 128 位元的摘要。然而，事實證明，128 位元的訊息摘要太小，無法抵禦攻擊。
為了應對 MD 雜湊演算法的不安全性，發明了安全雜湊演算法。**安全雜湊演算法 (SHA)** 是由美國國家標準技術研究所 (NIST) 開發的標準。SHA 已經歷了幾個版本。

### 16.3.2 訊息驗證
摘要可用於檢查訊息的完整性——訊息未被更改。為了確保訊息的完整性和資料來源驗證——Alice 是訊息的發起者，而不是其他人——我們需要在過程中包含 Alice 和 Bob 共享的秘密（Eve 不擁有）；我們需要創建一個**訊息驗證碼 (MAC)**。

Alice 使用雜湊函數從金鑰和訊息的串聯 $h(K + M)$ 中創建 MAC。她透過不安全的通道將訊息和 MAC 發送給 Bob。Bob 將訊息與 MAC 分開。然後他從訊息和秘密金鑰的串聯中創建一個新的 MAC。然後 Bob 將新創建的 MAC 與接收到的 MAC 進行比較。如果兩個 MAC 匹配，則訊息是真實的，並且未被對手修改。

**MAC 使用雜湊函數和秘密金鑰的組合提供訊息完整性和訊息驗證。**

### 16.3.3 數位簽章
提供訊息完整性和訊息驗證（以及我們稍後將看到的一些更多安全性服務）的另一種方法是數位簽章。MAC 使用秘密金鑰保護摘要；數位簽章使用一對私鑰-公鑰。

**數位簽章使用一對私鑰-公鑰。**

當 Alice 發送訊息給 Bob 時，Bob 需要檢查發送者的真實性；他需要確定訊息來自 Alice 而不是 Eve。Bob 可以要求 Alice 以電子方式簽署訊息。換句話說，電子簽章可以證明 Alice 作為訊息發送者的真實性。我們將這種類型的簽章稱為**數位簽章**。

**比較**
- **包含**：傳統簽章包含在文件中；它是文件的一部分。但是當我們以數位方式簽署文件時，我們會將簽章作為單獨的文件發送。
- **驗證方法**：對於傳統簽章，當接收者收到文件時，他們會將文件上的簽章與檔案中的簽章進行比較。對於數位簽章，接收者收到訊息和簽章。接收者需要對訊息和簽章的組合應用驗證技術來驗證真實性。
- **關係**：對於傳統簽章，簽章和文件之間通常是一對多的關係。對於數位簽章，簽章和訊息之間是一對一的關係。每條訊息都有自己的簽章。
- **複製性**：兩種類型簽章之間的另一個區別是一種稱為*複製性*的品質。對於傳統簽章，簽署文件的副本可以與檔案中的原始文件區分開來。對於數位簽章，除非文件上有時間因素（如時間戳），否則沒有這種區別。

**過程**
發送者使用**簽署演算法**簽署訊息。訊息和簽章發送給接收者。接收者接收訊息和簽章，並將**驗證演算法**應用於組合。如果結果為真，則接受訊息；否則，拒絕訊息。

在數位簽章中，簽署者使用她的**私鑰**，應用於簽署演算法，來簽署文件。另一方面，驗證者使用簽署者的**公鑰**，應用於驗證演算法，來驗證文件。

**數位簽章需要公開金鑰系統。簽署者用她的私鑰簽署；驗證者用簽署者的公鑰驗證。**

**密碼系統使用接收者的私鑰和公鑰；數位簽章使用發送者的私鑰和公鑰。**

**簽署摘要**
非對稱金鑰密碼系統在處理長訊息時效率很低。在數位簽章系統中，訊息通常很長，但我們必須使用非對稱金鑰方案。解決方案是簽署訊息的摘要，它比訊息短得多。精心選擇的訊息摘要與訊息具有一對一的關係。發送者可以簽署訊息摘要，接收者可以驗證訊息摘要。效果是一樣的。

**服務**
- **訊息驗證**：安全的數位簽章方案可以提供訊息驗證（也稱為資料來源驗證）。Bob 可以驗證訊息是由 Alice 發送的，因為驗證中使用了 Alice 的公鑰。Alice 的公鑰無法驗證由 Eve 的私鑰簽署的簽章。
- **訊息完整性**：如果我們簽署訊息或訊息摘要，則訊息的完整性得以保留，因為如果訊息的任何部分發生更改，我們無法獲得相同的摘要。
- **不可否認性**：如果 Alice 簽署了一條訊息然後否認它，Bob 可以證明 Alice 確實簽署了它。一種解決方案是受信任的第三方。人們可以在他們之間建立一個受信任的第三方。

**機密性**
數位簽章不提供機密通訊。如果需要機密性，訊息和簽章必須使用對稱金鑰或非對稱金鑰加密法進行加密。

### 16.3.4 實體驗證
**實體驗證**是一種旨在讓一方驗證另一方身份的技術。**實體**可以是人、行程、客戶端或伺服器。需要證明其身份的實體稱為**索賠人**；試圖驗證索賠人身份的一方稱為**驗證者**。

**實體與訊息驗證**
1.  訊息驗證（或資料來源驗證）可能不會即時發生；實體驗證會。在前一種情況下，Alice 發送訊息給 Bob。當 Bob 驗證訊息時，Alice 可能在也可能不在通訊過程中。另一方面，當 Alice 請求實體驗證時，在 Alice 被 Bob 驗證之前不涉及真正的訊息通訊。Alice 需要在線並參與該過程。
2.  訊息驗證只是驗證一條訊息；對於每條新訊息都需要重複該過程。實體驗證在整個會話期間驗證索賠人。

**驗證類別**
在實體驗證中，索賠人必須向驗證者表明自己的身份。這可以透過三種證人之一來完成：知道的東西、擁有的東西或固有的東西。
- **知道的東西**：這是只有索賠人知道的秘密，可以由驗證者檢查。例子有密碼、PIN、秘密金鑰和私鑰。
- **擁有的東西**：這是可以證明索賠人身份的東西。例子有護照、駕駛執照、身份證、信用卡和智慧卡。
- **固有的東西**：這是索賠人的固有特徵。例子有傳統簽名、指紋、聲音、面部特徵、視網膜模式和筆跡。

**密碼**
最簡單和最古老的實體驗證方法是使用**密碼**，這是索賠人*知道*的東西。當使用者需要存取系統資源（登入）時使用密碼。每個使用者都有一個公開的使用者標識和一個私有的密碼。然而，密碼很容易受到攻擊。

**挑戰–回應**
在密碼驗證中，索賠人透過證明她知道一個秘密（密碼）來證明她的身份。然而，因為索賠人發送了這個秘密，它很容易被對手攔截。在**挑戰–回應驗證**中，索賠人證明她*知道*一個秘密，而不將其發送給驗證者。換句話說，索賠人不向驗證者發送秘密；驗證者要麼有它，要麼能找到它。

**在挑戰–回應驗證中，索賠人證明她知道一個秘密，而不將其發送給驗證者。**

**挑戰**是一個隨時間變化的值，如隨機數或時間戳，由驗證者發送。索賠人對挑戰應用一個函數並將結果（稱為**回應**）發送給驗證者。回應顯示索賠人知道秘密。

**使用對稱金鑰加密法**
幾種挑戰–回應驗證方法使用**對稱金鑰加密**。這裡的秘密是共享秘密金鑰，由索賠人和驗證者都知道。函數是應用於挑戰的加密演算法。

**使用非對稱金鑰加密法**
代替對稱金鑰加密法，我們可以使用非對稱金鑰加密法進行實體驗證。這裡的秘密必須是索賠人的私鑰。索賠人必須證明她擁有與每個人都可用的公鑰相關的私鑰。

**使用數位簽章**
實體驗證也可以使用數位簽章來實現。當數位簽章用於實體驗證時，索賠人使用她的私鑰進行簽署。

### 16.3.5 金鑰管理
我們在前幾節中討論了對稱金鑰和非對稱金鑰密碼學。然而，我們尚未討論對稱金鑰密碼學中的秘密金鑰和非對稱金鑰密碼學中的公鑰是如何分發和維護的。本節觸及這兩個問題。

**對稱金鑰分發**
對稱金鑰密碼學在加密長訊息方面比非對稱金鑰密碼學更有效率。然而，對稱金鑰密碼學需要雙方之間有共享的秘密金鑰。
如果 Alice 需要與 $N$ 個人交換機密訊息，她需要 $N$ 個不同的金鑰。如果 $N$ 個人需要相互通訊怎麼辦？總共需要 $N(N - 1)/2$ 個金鑰。這通常被稱為 $N^2$ 問題，因為 $N$ 個實體所需的金鑰數量接近 $N^2$。
金鑰數量不是唯一的問題；金鑰的分發是另一個問題。使用網際網路絕對不是一種安全的方法。

**金鑰分發中心：KDC**
一個實際的解決方案是使用受信任的第三方，稱為**金鑰分發中心 (KDC)**。為了減少金鑰數量，每個人都與 KDC 建立一個共享秘密金鑰。在 KDC 和每個成員之間建立秘密金鑰。現在的問題是 Alice 如何向 Bob 發送機密訊息。
1.  Alice 向 KDC 發送請求，說明她需要一個她和 Bob 之間的會話（臨時）秘密金鑰。
2.  KDC 通知 Bob 關於 Alice 的請求。
3.  如果 Bob 同意，則在兩者之間創建一個會話金鑰。
與 KDC 建立的 Alice 和 Bob 之間的秘密金鑰用於向 KDC 驗證 Alice 和 Bob，並防止 Eve 冒充他們中的任何一個。

**會話金鑰**
KDC 為每個成員創建一個秘密金鑰。此秘密金鑰只能在成員和 KDC 之間使用，不能在兩個成員之間使用。如果 Alice 需要與 Bob 秘密通訊，她需要一個她和 Bob 之間的秘密金鑰。KDC 可以使用 Alice 和 Bob 與中心的金鑰創建一個 Alice 和 Bob 之間的**會話金鑰**。Alice 和 Bob 的金鑰用於在建立會話金鑰之前向中心和彼此驗證 Alice 和 Bob。通訊終止後，會話金鑰不再有用。

**兩方之間的會話對稱金鑰僅使用一次。**

**公開金鑰分發**
在非對稱金鑰密碼學中，人們不需要知道對稱共享金鑰。如果 Alice 想要發送訊息給 Bob，她只需要知道 Bob 的公鑰，該公鑰對公眾開放且每個人都可用。在公開金鑰密碼學中，每個人都保護私鑰並公佈公鑰。

**在公開金鑰密碼學中，每個人都可以存取每個人的公鑰；公鑰對公眾可用。**

**公開公告**
天真的方法是公開宣佈公鑰。Bob 可以將他的公鑰放在他的網站上，或在當地或國家報紙上宣佈。然而，這種方法並不安全；它容易被偽造。例如，Eve 可以發布這樣的公開公告。Eve 可以愚弄 Alice 向她發送打算給 Bob 的訊息。

**憑證頒發機構**
分發公鑰的常見方法是創建**公鑰憑證**。Bob 想要兩件事；他希望人們知道他的公鑰，並且他不希望任何人接受偽造的公鑰作為他的。Bob 可以去**憑證頒發機構 (CA)**，這是一個將公鑰綁定到實體並頒發憑證的聯邦或州組織。
CA 本身有一個無法偽造的知名公鑰。CA 檢查 Bob 的身份。然後它要求 Bob 的公鑰並將其寫在憑證上。為了防止憑證本身被偽造，CA 用其私鑰簽署憑證。現在 Bob 可以上傳簽署的憑證。任何想要 Bob 公鑰的人都可以下載簽署的憑證，並使用頒發機構的公鑰提取 Bob 的公鑰。

**X.509**
雖然使用 CA 解決了公鑰欺詐的問題，但它產生了一個**副作用**。每個憑證可能有不同的格式。任何需要普遍使用的東西都必須有通用格式。為了消除這種副作用，ITU 設計了 **X.509**，這是一個已被網際網路接受並進行了一些更改的建議。X.509 是一種以結構化方式描述憑證的方法。它使用一個稱為 ASN.1 的知名協定，定義了電腦程式設計師熟悉的欄位。

## 16.4 防火牆
所有先前的安全措施都無法防止 Eve 向系統發送有害訊息。為了控制對系統的存取，我們需要防火牆。**防火牆**是安裝在組織內部網路和網際網路其餘部分之間的設備（通常是路由器或電腦）。它旨在轉發某些封包並過濾（不轉發）其他封包。

例如，防火牆可能會過濾所有發往特定主機或特定伺服器（如 HTTP）的傳入封包。防火牆可用於拒絕對組織中特定主機或特定服務的存取。防火牆通常分為*封包過濾防火牆*或*基於代理的防火牆*。

### 16.4.1 封包過濾防火牆
防火牆可以用作封包過濾器。它可以根據網路層和傳輸層標頭中的資訊轉發或阻止封包：來源和目的 IP 位址、來源和目的**埠位址**以及協定類型（TCP 或 UDP）。**封包過濾防火牆**是一個使用過濾表來決定必須丟棄（不轉發）哪些封包的路由器。

### 16.4.2 代理防火牆
封包過濾防火牆基於網路層和傳輸層標頭（IP 和 TCP/UDP）中可用的資訊。然而，有時我們需要根據訊息本身（在應用層）可用的資訊來過濾訊息。例如，假設一個組織想要實施關於其網頁的以下政策：只有那些以前與公司建立業務關係的網際網路使用者才能存取；必須阻止其他使用者的存取。在這種情況下，封包過濾防火牆是不可行的，因為它無法區分到達 TCP 埠 80 (HTTP) 的不同封包。測試必須在應用層級（使用 URL）完成。

一種解決方案是安裝一台代理電腦（有時稱為**應用閘道器**），它位於客戶電腦和公司電腦之間。當使用者客戶端行程發送訊息時，應用閘道器運行伺服器行程來接收請求。伺服器在應用層打開封包並查明請求是否合法。如果是，伺服器充當客戶端行程並將訊息發送到公司的真實伺服器。如果不是，訊息將被丟棄，並向外部使用者發送錯誤訊息。透過這種方式，外部使用者的請求會根據應用層的內容進行過濾。

## 16.5 章末材料
### 16.5.2 關鍵詞
- 加法加密法
- 應用閘道器
- 非對稱金鑰加密法
- 自動金鑰加密法
- 可用性
- 區塊加密法
- 凱撒密碼
- 憑證頒發機構 (CA)
- 挑戰–回應驗證
- 加密法
- 密文
- 機密性
- 密碼雜湊函數
- 密碼學
- 解密
- 解密演算法
- 阻斷服務 (DoS)
- 摘要
- 數位簽章
- 加密
- 加密演算法
- 防火牆
- 雜湊 MAC (HMAC)
- 完整性
- 金鑰
- 金鑰分發中心 (KDC)
- 偽裝
- 訊息驗證碼 (MAC)
- 訊息摘要 (MD)
- 單字母加密法
- 一次性密碼本
- 封包過濾防火牆
- 明文
- 多字母加密法
- 埠位址
- 私鑰
- 代理防火牆
- 公鑰
- 公鑰憑證
- 重放
- RSA 密碼系統
- 秘密金鑰
- 安全雜湊演算法 (SHA)
- 安全性攻擊
- 安全性目標
- 移位加密法
- 副作用
- 窺探
- 欺騙
- 隱寫術
- 串流加密法
- 替換加密法
- 對稱金鑰加密法
- 對稱金鑰加密
- 票據
- 流量分析
- 換位加密法
- 驗證演算法
- X.509

### 16.5.3 摘要
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
    