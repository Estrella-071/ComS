
export const chapter19Content = {
  en: `
# Chapter 19: Introduction to Social Media

In this chapter, we briefly touch on **social media** as one of the applications of computer science. Our goal is not to show how to use social media; many students know and use social media in their daily lives. Our goal is primarily to show the concepts behind social media and how these websites are designed for this purpose. We will discuss only two, **Facebook** and **Twitter**, each as an example of a particular social media type.

## Objectives
After studying this chapter, the student should be able to:
- Define the *friendship* relationship in Facebook.
- Define the two-way relationship between friends in Facebook.
- Understand the communication channels in Facebook.
- Know how to become a member and how to terminate membership in Facebook.
- Know how to log in and log out of Facebook.
- Know how to find friends in Facebook.
- Know how to communicate with friends in Facebook.
- Define the *following* relationship in Twitter.
- Define the one-way relationship between members and followers in Twitter.
- Understand the communication channels in Twitter.
- Know how to become a member and how to terminate membership in Twitter.
- Know how to log in and log out of Twitter.
- Know how to follow other members in Twitter.
- Know how to communicate with followers in Twitter.

## 19.1 INTRODUCTION
In the last century, when computer science started as a discipline, we could never have imagined that it would become a part of our daily life in such a short period of time. One of the areas in which computer science has helped all citizens is with the advent of *social media*. Today most people around the world are, to a greater or lesser extent, involved with one or more types of social media, which can be considered a computer science application. Social media is in fact the result of using several computer science disciplines including operating systems, computer programming, computer networks, and databases.

Social media platforms are websites on a large scale, designed to let people exchange their ideas, opinions and experiences. Some are designed primary for exchanging messages or pictures; some are designed to let job seekers find employers, and employers find employees.

A discussion of all types of social media would take a book by itself. In this chapter, therefore, we look at only two of them: Facebook and Twitter. We have chosen these two because the concepts behind Facebook or Twitter are duplicated, more or less, in several other sites.

## 19.2 FACEBOOK
Facebook is a **social media** that allows families and friends around the world to keep in touch with each other and share thoughts, pictures, comments, and so on.

**Facebook allows members to share thoughts, pictures and comments.**

### 19.2.1 General idea
Before explaining how to use Facebook, let us consider the general ideas behind it.

**Friendship**
In Facebook, sharing is done only between **friends**. **Friendship** is a one-to-one reciprocal relationship. If John is a friend of Lucie, Lucie is also a friend of John. However, the relationship does not propagate; if John is a friend of Lucie and Lucie is a friend of Ann, it does not necessarily mean that John is a friend of Ann. To be so, John or Ann needs to request friendship from the other.

**In Facebook, a friend of a friend is not necessarily a friend.**

Although there are billions of members in Facebook, we will assume for the purposes of this discussion that it has only eight members (Ml to M8), as shown in Figure 19.1.

Now assume that the following requests for friendship are made and are all accepted by the other members:
1. Ml requests friendship from M2.
2. M2 requests friendship from M5.
3. M3 requests friendship from M2.
4. M4 requests friendship from M7.
5. M6 requests friendship from M3.
6. M7 requests friendship from M6.
7. M8 requests friendship from M2.

Figure 19.2 shows the friendship relationships between the eight members. Note that Facebook holds the information about each member, but adds a link between two friends after the friendship has been requested and approved.

**Communication**
Although friendship between members is a two-way relationship, we can think of communication as a one-way (one-to-many) relationship: one member posts something, and all their friends can see it, as shown in Figure 19.3:
a. What is posted by Ml can be seen by M2.
b. What is posted by M2 can be seen by Ml, M3, M5, and M8.
c. What is posted by M3 can be seen by M2 and M6.
d. What is posted by M4 can be seen by M7.
e. What is posted by M5 can be seen M2.
f. What is posted by M6 can be seen by M3 and M7.
g. What is posted by M7 can be seen by M4 and M6.
h. What is posted by M8 can be seen by M2.

### 19.2.2 Web pages
Facebook uses several pages, but the two used most often are the home page and the general page. Let us show these two pages before explaining how to use them.

**Home page**
The **home page** is used only for sign-up (enrolling) and log-in (accessing) Facebook. The general format is shown in Figure 19.4.

**User page**
The **user page** is the main page you will use on Facebook. The page is fairly complex, but the general format is shown in Figure 19.5. Note that your page always has a toolbar as the first row. It has three columns, but the two columns on the left can be scrolled to show more options.

### 19.2.3 Membership
You need to be a member of Facebook to use it. To become a member, you need to sign up. To terminate your membership, you need to sign out or deactivate your account.

**Sign up**
To become a member of Facebook (which is free), you need to go to the Facebook home page (www.facebook.com) as shown in Figure 19.4. You can then use the following steps to sign up.
1. Ignore the *log-in* section (first row) and go to the *sign-up* section.
2. Enter your first and last name in the corresponding boxes.
3. Enter your email or mobile number in the corresponding box.
4. Re-enter your email or mobile number in the corresponding box.
5. Select your data of birth (Month, Day, Year).
6. Check your gender button.
7. Click on the sign-up button.

**Sign out (deactivation)**
To permanently deactivate your account in Facebook, go to your home page (Figure 19.5) and do the following:
1. Click the down arrow on the far right of the tool bar.
2. In the submenu that appears, click on *Settings*.
3. Click on *Security*.
4. Choose *Deactivate your account* and follow the steps to confirm it.

### 19.2.4 Accessing services of Facebook
Even if you have signed up as a member, whenever you want to use Facebook, you need to *log in*. When you do not want to use it for a while, you can *log out*.

**Log in**
To log in into your account, go to the Facebook home page at www.facebook.com (Figure 19.5). In the first row, type your email or mobile number, type your password, and click on the log-in button. You will see your page, which means you can now use Facebook.

**Log out**
Whenever you are not using your Facebook page for a while, you can log out. On the toolbar of user page (your page) (Figure 19.5) click on the down arrow to see the menu. Then click on the log-out button.

### 19.2.5 Friends
As described above, the whole idea of using Facebook is to keep in touch with *friends*. If you post something on the Facebook site, you need to have friends to see it. If you want to see what another member posts, you have to be one of her friends. In other words, you need to find friends and let other members find you as a friend before you can start to communicate through Facebook.

**Finding friends**
There are several ways of finding friends in Facebook.

**Accept Facebook recommendation**
You can accept a Facebook recommendation, based on the information you provided during sign-up. To accept a recommendation, go to the toolbar of your page (Figure 19.5) and click on the *find friend* button, which displays a list of people whom you may know. The list is divided into several categories (eg people you may know, mutual friends, people from your home town, current city, high school, college or university, employer etc) that you can scroll through to choose from. In each category, you can select people with whom you want to be friends and click the *add friend* button in front of their name.

**Follow email contacts**
You can **follow** people who regularly contact you by email. On your home page toolbar (Figure 19.5) click on the *friend* icon (two faces next to *find friend* button). Facebook displays a page with different email icons. Choose the appropriate one and type your email and password to see a list of individuals who communicate with you by email. If you want someone on this list to be your Facebook friend, click on the *add friend* button.

**Find people you know**
At the left side of your home page toolbar (Figure 19.5) type the member name and click on the search icon. Facebook shows the list of members with that name. If you find someone you know, click on the name to see their profile page. If you want that person to be your Facebook friend, click on the *add friend* button.

**Accept friendship from other members**
Other members may want to add you as their friends. In this case, you may accept or decline friendship when you receive the request. On the toolbar, click on the *friend request* button. You will see the profile for every member who has sent you a request to be your friend. You can click the *confirm* or *decline* button in front of the member name to accept or reject the invitation.

**Unfriend a friend**
You can remove any member from your friends list at any time. To do so, click on your profile picture on your home page toolbar (Figure 19.5). Click the *friends* button under your name to see the list of your friends. Scroll down until you see the name of a member that you want to unfriend. Then click on the *unfriend* button.

### 19.2.6 Exchanging information
The whole purpose of Facebook is to allow friends to exchange news (texts, photos, videos etc). To receive your friends’ posts, go to your *news feed* where they will appear. To send news to your friends, you need to *update your status*. We will briefly show these two activities.

**Reading news**
To see what news your friends have posted, go the toolbar (Figure 19.5) and click on the *home* button. You will see all the new posts made by your friends. Each post includes the name of your friend, the date it was posted, and the contents. They may also contain links to web pages. Posted photos will also appear there, but you may want to make them larger by clicking on them. If there are videos in the posts, a thumbnail appears in the body of the news feed with the *play* arrow; click it to play the video.

**Commenting on posted updates**
At the top of each item of posted news (called an update), there is a *like* button that you can click on to show that you like the post.

**Sharing posted updates**
Click the *share* button underneath the original post to see a new window. Enter any comments you want to make about the post in the new window and then click the *share* button in the new window. In this way, you can post what you have received to your own friends.

**Posting news**
Facebook allows you to post news (called updates) for your friends. This can be a long message (up to 60000 characters), a link to a web page, a photo, or a video.

**Posting news**
To post **news**, go to the toolbar (Figure 19.5) and click on the *home* button to see the posting window. The *update status* will be selected by default. Click on the *what’s on your mind* button and type your news. Then click the *post* button to post the news for your friends.

**Posting photos or videos**
In the posting window (see Posting News paragraph), click on the *add photos/video* button and then select the right-hand button to post your photos or videos.

**Tagging**
If you want to mention a friend in your post, you can *tag* that friend. To do so, you need to click on the *tag* button (picture of a head) and then select the name of the friend from the list.

**Limiting who can see your post**
Generally, when you post something on Facebook, all Facebook members can see it. You can restrict this just to your friends or even just to yourself. In the *status update* window (see Posting News paragraph), click the button *public* to let anyone see the post, click the *friends* button so that only your friends see the post, or click the *only me* button so that no one except you sees the post.

## 19.3 TWITTER
**Twitter** is a social network that allows members to post a short message, called a **tweet**, of a maximum 140 characters, for their followers to see.

**Twitter allows members to post a tweet for their followers.**

### 19.3.1 General idea
Before showing how to use Twitter, let us discuss the general idea behind this social media site.

**Member–followers relationship**
In Twitter, the relationship is between members and their followers; a one-to-many relationship. A group of Twitter members follow the member they like; the followed member may not even know who their followers are. This is similar to the relationship between a celebrity and her followers: the followers are interested in what the celebrity does, but the celebrity probably does not know who these followers are.

Let us assume that we have eight members registered on the Twitter site as shown in Figure 19.6. Now assume some members decide to follow other members as shown below:
1. M1 follows M2 and M5.
2. M2 follows M3.
3. M3 follows M4 and M5.
4. M4 follows M3 and M8.
5. M5 follows M2 and M6.
6. M6 follows M8.
7. M7 follows M3.
8. M8 follows M7.

Figure 19.7 shows the new one-way relationships (follower–followed).

**Communication**
In Twitter, it is also easier to think of communication as a one-to-many relationship. A member posts a tweet for her followers. Figure 19.8 shows this scenario.
a. M1 has no followers. This means that what is posted by M1 can be seen by no one.
b. M2 has M1 and M5 as followers. This means that what is posted by M2 can be seen by M1 and M5.
c. M3 has M2, M4, and M7 as followers. This means that what is posted by M3 can be seen by M2, M4, and M7.
d. M4 has M3 as a follower. This means that what is posted by M4 can be seen by M3.
e. M5 has M1 and M3 as followers. This means that what is posted by M5 can be seen by M1 and M3.
f. M6 only has M5 as a follower. This means that what is posted by M6 can be seen only by M5.
g. M7 has no followers. This means that what is posted by M7 can be seen by no one.
h. M8 has M4 and M6 as follower. This means what is posted by M8 can be seen by M4 and M6.

### 19.3.2 Pages
The Twitter website has several pages, but the two used primarily are the *web page* and the *home page*. Other pages can be reached from one of these two pages. Let us describe these two pages before explaining how to use them.

**Web page**
The **web page** is used for joining Twitter for the first time or when you want to log into your account (Figure 19.9)

**Home page**
The **home page** is used when you have already have an account with Twitter and you want to use it. The general format of this page is shown in Figure 19.10.

### 19.3.3 Membership
As with any social media, you need to sign up to become a member (Figure 19.9). If you want to deactivate your account you need to sign out (Figure 19.10).

**Sign up**
To become a member of Twitter, go to www.twitter.com to find the Twitter web page, as shown in Figure 19.9. Then click on the *sign-up* button to see the sign-up window as shown in Figure 19.11.
In the sign-up window give your full name, your phone number or email, and your password. Now click the *sign-up* button to join as a member.

**Sign out (deactivation)**
To permanently deactivate your account in Twitter, go to the Twitter home page (Figure 19.10) and do the following:
1. Click the *profile* and *settings* icons.
2. When the new window opens, click on the *settings* and *privacy* buttons.
3. When the new window opens, click on the *deactivate my account* button.

### 19.3.4 Accessing services of Twitter
Even if you are a member, whenever you want to use Twitter, you need to *log in*. When you do not want to use it for a while, you can *log out*.

**Log in**
When you are a member, you can log in to your account from any computer or smartphone. On the Twitter web page (Figure 19.9), click on the *log-in* button to see the log-in window as shown in Figure 19.12.
In the log-in window, give your full name, your phone number or email, and your password. Now click the *log-in* button. You can now use Twitter.

**Log out**
To log out of your account in Twitter, go to the Twitter home page (Figure 19.10) and do the following:
1. Click the *profile* and *settings* icons.
2. When the new window opens, click on the *log-out* button.

### 19.3.5 Following and being followed
The whole idea of Twitter is to enable members and their followers to communicate. Members can receive tweets if they follow other members. If members have followers, they can send useful tweets which will be received by their followers.

**You need to follow other members**
If you want to receive tweets from certain members, you need to let Twitter know that you want to **follow** them. There is no need to get permission from the member you want to follow (unless they explicitly ask Twitter to block you as one of their followers). If you enter the names of the members you want to follow, Twitter creates a list of them in your profile and every time any of these members sends a tweet, you will get a copy. The question is: how do you tell Twitter who you want to follow? There are several ways to do this.

**Accept Twitter recommendation**
You can accept Twitter’s recommendation (based on your past activity and interests). To do this, go to the bottom left section of the Twitter home page, the *who to follow* window, as shown in Figure 19.13 and click the *view-all* button to see Twitter’s recommendations. To learn more about any of these members, click on the @name. To follow a member, click the *follow* button.

**Follow email contacts**
You can follow people who regularly contact you by email. On the *who to follow* page (Figure 19.13) click on the *find friends* button (at the bottom of the right-hand column). A list of email providers appears on the next window, from which you can choose those friends who communicate with you via those email providers.

**Search for specific people or organizations**
On the *who to follow* section (Figure 19.13) click the *view all* button. When the new window opens, enter either the actual name or the Twitter name of the person or organization you are looking for. Now click the *search* button. If an individual or organization with that name is a Twitter member, you can choose to follow them.

**Stop following a member**
You may for some reason want to stop receiving tweets from a member. To do so, you must unfollow them. Go to the Twitter home page, click on the *following* link. Move the mouse over the *follow* button for that member and change it to *unfollow* button.

**Other members following you**
If you want your tweets to be read, you need to have followers to receive them. However, you cannot choose your followers; they have to find you and decide to follow you. They do not need to get your approval to follow you, but if you wish to, you can inform Twitter that you want to block a specific follower.

### 19.3.6 Sending tweets
Although you do not know all your followers personally—they have selected you, you have not selected them—and cannot communicate with them directly, Twitter has a list of your followers. To send a tweet to your followers, just post it on your Twitter page and the site will send it to all your followers.

**Compose a new tweet**
The first thing you need to know is how to compose a new tweet. This can be done as follows (see Figure 19.14).
1. Click the *tweet* button on any Twitter web page to see the *compose new tweet* panel.
2. In the *compose new tweet* panel, type your message.
3. Click the *tweet* button at the bottom of the page to post your tweet.
4. Twitter takes your tweet and adds your profile, including your name, at the top of the tweet.
5. Twitter then sends a copy to all your followers.

**Referring to other people’s tweets**
In any tweets you send, you can also refer to the tweets of other users. This can be done in two ways: by using **ampersands** and/or by using **hashtags**.

**Using ampersands**
When you are sending a tweet to your followers, if you want to refer to the tweets of another user, you can insert the name of that user preceded by an ampersand (@). Any of your followers can click on the name to see tweets posted by that user.

**Using hashtags**
Sometimes you want to refer to a set of tweets that contain a specific word or phrase originating from different senders. In this case you can use a hashtag (#) in front of the word. The word becomes a keyword representing a particular topic or issue, and any click on the word displays all recent tweets that contain that word.

### 19.3.7 Receiving tweets
After you identify and designate those members that you want to follow, any tweet posted by any one of them comes to your Twitter home page (also called your Twitter feed). To get to your home page, click on the *home* icon at the top-left of the Twitter toolbar (Figure 19.10) which enlarges the *what’s happening* section. After reading any tweet, you can:
1. click on the arrow to compose a tweet in response to the sender of the tweet.
2. click on the double arrow to **retweet** the received tweet to their own followers.
3. click on the star to show that they like the tweet.

## 19.4 END-CHAPTER MATERIALS
### 19.4.1 Recommended reading
For more details about the subjects discussed in this chapter, the following book is recommended:
Russel Matthew A. *Mining the Social Web*, Sebastopol, CA: O’Reilly, 2014

### 19.4.2 Key terms
- Facebook
- follow
- following
- friend
- friendship
- hashtag
- home page
- news
- sign out
- social media
- tweet
- Twitter
- user page
- web page

### 19.4.3 Summary
- Facebook allows families and friends around the world to keep in touch with each other.
- In Facebook, each member needs to find friends to communicate with, but a friend of a friend is not a friend.
- Communication in Facebook is one-to-many. What is posted by one member can be seen by all their friends.
- To become a member of Facebook, one needs to sign up. To terminate membership, one needs to sign out.
- To use Facebook, a member needs to log in; to stop using Facebook for a while, a member needs to log out.
- Twitter allows a member to post a tweet (small message) for their followers to read.
- In Twitter, each member needs to find other members to follow.
- Communication in Twitter is one-to-many. Everything posted by one member can be seen by all their followers.
- To become a member of Twitter, one needs to sign up. To terminate membership, one needs to sign out.
- To use Twitter, a member needs to log in; to stop using Twitter for a while, a member needs to log out.
- A member needs to follow other members to receive tweets from them.

## 19.5 PRACTICE SET
### 19.5.1 Quizzes
A set of interactive quizzes for this chapter can be found on the book’s website. It is strongly recommended that the student takes the quizzes to check his/her understanding of the materials before continuing with the practice set.

### 19.5.2 True/false questions
Categorize the following statements as true or false.
T19-1. In Facebook, members post something for their followers.
T19-2. In Facebook, sharing is done between friends.
T19-3. In Facebook, a friend of a friend is a friend.
T19-4. Friendship in Facebook is a one-way relationship.
T19-5. Communication in Facebook is one-way.
T19-6. To sign up in Facebook you need to be on the user page.
T19-7. There is only one way to find friends in Facebook.
T19-8. In Facebook, what is posted by one member can be seen by all their friends.
T19-9. In Twitter communication takes place between a member and his/her friends.
T19-10. To become a member of Twitter, you need to log in.
T19-11. To discontinue membership in Twitter, you need to sign out.
T19-12. Before using Twitter, you need to look for followers.
T19-13. In Twitter, a post (message) can contain thousands of characters.
T19-14. To refer to another person named in your tweet, you need to use an ampersand.
T19-15. To refer to a word in all tweets, you need to use a hashtag.

### 19.5.3 Review questions
Q19-1. What is the difference between Facebook and Twitter when we consider the relationship between members?
Q19-2. What is the difference between Facebook and Twitter when we are thinking about the size of messages exchanged?
Q19-3. In Twitter, explain why a follower cannot send a message to the member that he/she follows.
Q19-4. In Facebook, if x and y are friends and z is only a friend of x but not a friend of y, can x send a message to z? Can z send a message to x?
Q19-5. In Twitter, if x is a follower of y and y is a follower of z, can x see a tweet sent by z?

### 19.5.4 Problems
P19-1. In Figure 19.2, assume that M2 and M5 terminate their friendships. Redraw Figure 19.3 for the new situation.
P19-2. In Figure 19.2, assume that M3 and M8 become friends. Redraw Figure 19.3 for the new situation.
P19-3. In Figure 19.7, assume that M2 decided to follow M6. Redraw Figure 19.7 using the new situation.
P19-4. In Figure 19.7, assume that M4 follows M7 and M7 follows M3. Redraw Figure 19.7 using the new situation.
`,
  zh: `
# 第十九章：社群媒體簡介

在本章中，我們簡要探討**社群媒體**作為電腦科學的應用之一。我們的目標不是展示如何使用社群媒體；許多學生在日常生活中已經知道並使用社群媒體。我們的主要目標是展示社群媒體背後的概念以及這些網站是如何為此目的設計的。我們將只討論 **Facebook** 和 **Twitter** 這兩個平台，分別作為特定社群媒體類型的範例。

## 學習目標
學完本章後，學生應能：
- 定義 Facebook 中的*朋友*關係。
- 定義 Facebook 中朋友之間的雙向關係。
- 理解 Facebook 中的溝通管道。
- 了解如何成為 Facebook 會員以及如何終止會員資格。
- 了解如何登入和登出 Facebook。
- 了解如何在 Facebook 中尋找朋友。
- 了解如何在 Facebook 中與朋友溝通。
- 定義 Twitter 中的*追蹤*關係。
- 定義 Twitter 中成員與追蹤者之間的單向關係。
- 理解 Twitter 中的溝通管道。
- 了解如何成為 Twitter 會員以及如何終止會員資格。
- 了解如何登入和登出 Twitter。
- 了解如何在 Twitter 中追蹤其他成員。
- 了解如何在 Twitter 中與追蹤者溝通。

## 19.1 簡介
在上個世紀，當電腦科學作為一門學科開始時，我們永遠無法想像它會在如此短的時間內成為我們日常生活的一部分。電腦科學幫助所有公民的領域之一是*社群媒體*的出現。今天，世界上大多數人在某種程度上都參與了一種或多種社群媒體，這可以被視為一種電腦科學應用。社群媒體實際上是使用多種電腦科學學科的結果，包括作業系統、電腦程式設計、電腦網路和資料庫。

社群媒體平台是大型網站，旨在讓使用者交流思想、意見和經驗。有些主要設計用於交換訊息或圖片；有些旨在讓求職者尋找雇主，以及雇主尋找員工。

討論所有類型的社群媒體本身就需要一本書。因此，在本章中，我們只探討其中兩種：Facebook 和 Twitter。我們選擇這兩個是因為 Facebook 或 Twitter 背後的概念或多或少在其他幾個網站中都有重複。

## 19.2 FACEBOOK
Facebook 是一個**社群媒體**，讓世界各地的家人和朋友能夠保持聯繫，分享想法、圖片、評論等。

**Facebook 允許成員分享想法、圖片和評論。**

### 19.2.1 基本概念
在解釋如何使用 Facebook 之前，讓我們考慮其背後的一般概念。

**朋友關係**
在 Facebook 中，分享僅在**朋友**之間進行。**朋友關係**是一對一的互惠關係。如果 John 是 Lucie 的朋友，Lucie 也是 John 的朋友。然而，這種關係不會傳播；如果 John 是 Lucie 的朋友，而 Lucie 是 Ann 的朋友，這並不一定意味著 John 是 Ann 的朋友。要成為朋友，John 或 Ann 需要向對方請求建立朋友關係。

**在 Facebook 中，朋友的朋友不一定是朋友。**

雖然 Facebook 有數十億成員，但為了討論方便，我們假設它只有八名成員（M1 到 M8），如圖 19.1 所示。

現在假設發出了以下朋友關係請求並全部被其他成員接受：
1. M1 請求與 M2 建立朋友關係。
2. M2 請求與 M5 建立朋友關係。
3. M3 請求與 M2 建立朋友關係。
4. M4 請求與 M7 建立朋友關係。
5. M6 請求與 M3 建立朋友關係。
6. M7 請求與 M6 建立朋友關係。
7. M8 請求與 M2 建立朋友關係。

圖 19.2 顯示了這八名成員之間的朋友關係。請注意，Facebook 保存了每位成員的資訊，但在請求並批准朋友關係後，會在兩位朋友之間添加連結。

**溝通**
雖然成員之間的朋友關係是雙向的，但我們可以將溝通視為一對多（單向發送，多方接收）的關係：一個成員發布某些內容，他們所有的朋友都能看到，如圖 19.3 所示：
a. M1 發布的內容可以被 M2 看到。
b. M2 發布的內容可以被 M1、M3、M5 和 M8 看到。
c. M3 發布的內容可以被 M2 和 M6 看到。
d. M4 發布的內容可以被 M7 看到。
e. M5 發布的內容可以被 M2 看到。
f. M6 發布的內容可以被 M3 和 M7 看到。
g. M7 發布的內容可以被 M4 和 M6 看到。
h. M8 發布的內容可以被 M2 看到。

### 19.2.2 網頁
Facebook 使用多個頁面，但最常使用的兩個是首頁和一般頁面。在解釋如何使用它們之前，讓我們展示這兩個頁面。

**首頁 (Home page)**
**首頁**僅用於註冊（加入）和登入（存取）Facebook。一般格式如圖 19.4 所示。

**使用者頁面 (User page)**
**使用者頁面**是您在 Facebook 上使用的主要頁面。該頁面相當複雜，但一般格式如圖 19.5 所示。請注意，您的頁面始終將工具列作為第一行。它有三列，但左邊的兩列可以滾動以顯示更多選項。

### 19.2.3 會員資格
您需要成為 Facebook 的會員才能使用它。要成為會員，您需要註冊。要終止您的會員資格，您需要登出或停用您的帳戶。

**註冊 (Sign up)**
要成為 Facebook 的會員（免費），您需要前往 Facebook 首頁 (www.facebook.com)，如圖 19.4 所示。然後您可以使用以下步驟進行註冊。
1. 忽略*登入*部分（第一行）並前往*註冊*部分。
2. 在相應的框中輸入您的名字和姓氏。
3. 在相應的框中輸入您的電子郵件或手機號碼。
4. 在相應的框中重新輸入您的電子郵件或手機號碼。
5. 選擇您的出生日期（月、日、年）。
6. 勾選您的性別按鈕。
7. 點擊註冊按鈕。

**登出 (停用)**
要永久停用您在 Facebook 中的帳戶，請前往您的首頁（圖 19.5）並執行以下操作：
1. 點擊工具列最右側的向下箭頭。
2. 在出現的子選單中，點擊*設定*。
3. 點擊*安全性*。
4. 選擇*停用您的帳戶*並按照步驟確認。

### 19.2.4 存取 Facebook 服務
即使您已註冊成為會員，每當您想使用 Facebook 時，您都需要*登入*。當您暫時不想使用時，您可以*登出*。

**登入 (Log in)**
要登入您的帳戶，請前往 Facebook 首頁 www.facebook.com（圖 19.5）。在第一行，輸入您的電子郵件或手機號碼，輸入您的密碼，然後點擊登入按鈕。您將看到您的頁面，這意味著您現在可以使用 Facebook。

**登出 (Log out)**
每當您暫時不使用您的 Facebook 頁面時，您可以登出。在使用者頁面（您的頁面）的工具列上（圖 19.5），點擊向下箭頭以查看選單。然後點擊登出按鈕。

### 19.2.5 朋友
如上所述，使用 Facebook 的整個想法是與*朋友*保持聯繫。如果您在 Facebook 網站上發布某些內容，您需要有朋友才能看到它。如果您想看另一位成員發布的內容，您必須是她的朋友之一。換句話說，在您可以開始透過 Facebook 溝通之前，您需要尋找朋友並讓其他成員找到您作為朋友。

**尋找朋友**
在 Facebook 中有幾種尋找朋友的方法。

**接受 Facebook 推薦**
您可以接受 Facebook 根據您在註冊期間提供的資訊所做的推薦。要接受推薦，請前往您頁面的工具列（圖 19.5）並點擊*尋找朋友*按鈕，這將顯示您可能認識的人的列表。該列表分為幾個類別（例如您可能認識的人、共同朋友、來自您家鄉的人、當前城市、高中、學院或大學、雇主等），您可以滾動瀏覽以進行選擇。在每個類別中，您可以選擇您想成為朋友的人，並點擊他們名字前面的*加為朋友*按鈕。

**追蹤電子郵件聯絡人**
您可以**追蹤**經常透過電子郵件與您聯繫的人。在您的首頁工具列上（圖 19.5），點擊*朋友*圖示（*尋找朋友*按鈕旁邊的兩張臉）。Facebook 顯示一個帶有不同電子郵件圖示的頁面。選擇適當的一個並輸入您的電子郵件和密碼，以查看透過電子郵件與您通訊的個人列表。如果您希望此列表中的某人成為您的 Facebook 朋友，請點擊*加為朋友*按鈕。

**尋找您認識的人**
在您的首頁工具列左側（圖 19.5），輸入成員姓名並點擊搜尋圖示。Facebook 顯示具有該姓名的成員列表。如果您找到您認識的人，點擊姓名以查看其個人資料頁面。如果您希望該人成為您的 Facebook 朋友，請點擊*加為朋友*按鈕。

**接受其他成員的朋友請求**
其他成員可能想加您為朋友。在這種情況下，當您收到請求時，您可以接受或拒絕朋友關係。在工具列上，點擊*朋友請求*按鈕。您將看到向您發送朋友請求的每位成員的個人資料。您可以點擊成員名字前面的*確認*或*刪除*按鈕來接受或拒絕邀請。

**刪除朋友 (Unfriend)**
您可以隨時從您的朋友列表中刪除任何成員。為此，請點擊您首頁工具列上的個人資料圖片（圖 19.5）。點擊您名字下的*朋友*按鈕以查看您的朋友列表。向下滾動直到您看到您想要刪除的朋友的名字。然後點擊*刪除朋友*按鈕。

### 19.2.6 交換資訊
Facebook 的全部目的是允許朋友交換新聞（文字、照片、影片等）。要接收您朋友的貼文，請前往您的*動態消息*，它們將出現在那裡。要向您的朋友發送新聞，您需要*更新您的狀態*。我們將簡要展示這兩項活動。

**閱讀新聞**
要查看您的朋友發布了什麼新聞，請前往工具列（圖 19.5）並點擊*首頁*按鈕。您將看到您的朋友發布的所有新貼文。每個貼文都包括您朋友的名字、發布日期和內容。它們也可能包含指向網頁的連結。發布的照片也會出現在那裡，但您可能想點擊它們以放大查看。如果貼文中有影片，動態消息主體中會出現縮圖和*播放*箭頭；點擊它以播放影片。

**評論發布的動態**
在每條發布的新聞（稱為動態更新）頂部，有一個*讚*按鈕，您可以點擊它以表示您喜歡該貼文。

**分享發布的動態**
點擊原始貼文下方的*分享*按鈕以查看新視窗。在新視窗中輸入您想對貼文發表的任何評論，然後點擊新視窗中的*分享*按鈕。透過這種方式，您可以將收到的內容發布給您自己的朋友。

**發布新聞**
Facebook 允許您為朋友發布新聞（稱為動態更新）。這可以是一條長訊息（最多 60000 個字元）、指向網頁的連結、照片或影片。

**發布新聞**
要發布**新聞**，請前往工具列（圖 19.5）並點擊*首頁*按鈕以查看發布視窗。*更新狀態*將被預設選中。點擊*你在想什麼*按鈕並輸入您的新聞。然後點擊*發布*按鈕為您的朋友發布新聞。

**發布照片或影片**
在發布視窗中（見發布新聞段落），點擊*相片/影片*按鈕，然後選擇右側按鈕以發布您的照片或影片。

**標記 (Tagging)**
如果您想在貼文中提及朋友，您可以*標記*該朋友。為此，您需要點擊*標記*按鈕（頭像圖片），然後從列表中選擇朋友的名字。

**限制誰可以看到您的貼文**
通常，當您在 Facebook 上發布內容時，所有 Facebook 成員都可以看到。您可以將此限制為僅您的朋友甚至僅您自己。在*狀態更新*視窗中（見發布新聞段落），點擊*公開*按鈕讓任何人都能看到貼文，點擊*朋友*按鈕讓只有您的朋友能看到貼文，或點擊*只限本人*按鈕讓除了您之外沒有人能看到貼文。

## 19.3 TWITTER
**Twitter** 是一個社群網路，允許成員發布一則最多 140 個字元的短訊息，稱為**推文 (tweet)**，供他們的追蹤者查看。

**Twitter 允許成員為其追蹤者發布推文。**

### 19.3.1 基本概念
在展示如何使用 Twitter 之前，讓我們討論這個社群媒體網站背後的一般概念。

**成員-追蹤者關係**
在 Twitter 中，關係是成員與其追蹤者之間的關係；這是一對多的關係。一群 Twitter 成員追蹤他們喜歡的成員；被追蹤的成員甚至可能不知道他們的追蹤者是誰。這類似於名人與其追蹤者之間的關係：追蹤者對名人的所作所為感興趣，但名人可能不知道這些追蹤者是誰。

讓我們假設有八名成員在 Twitter 網站上註冊，如圖 19.6 所示。現在假設一些成員決定追蹤其他成員，如下所示：
1. M1 追蹤 M2 和 M5。
2. M2 追蹤 M3。
3. M3 追蹤 M4 和 M5。
4. M4 追蹤 M3 和 M8。
5. M5 追蹤 M2 和 M6。
6. M6 追蹤 M8。
7. M7 追蹤 M3。
8. M8 追蹤 M7。

圖 19.7 顯示了新的單向關係（追蹤者-被追蹤者）。

**溝通**
在 Twitter 中，將溝通視為一對多關係也更容易。成員為其追蹤者發布推文。圖 19.8 顯示了這種情況。
a. M1 沒有追蹤者。這意味著 M1 發布的內容沒人能看到。
b. M2 有 M1 和 M5 作為追蹤者。這意味著 M2 發布的內容可以被 M1 和 M5 看到。
c. M3 有 M2、M4 和 M7 作為追蹤者。這意味著 M3 發布的內容可以被 M2、M4 和 M7 看到。
d. M4 有 M3 作為追蹤者。這意味著 M4 發布的內容可以被 M3 看到。
e. M5 有 M1 和 M3 作為追蹤者。這意味著 M5 發布的內容可以被 M1 和 M3 看到。
f. M6 只有 M5 作為追蹤者。這意味著 M6 發布的內容只能被 M5 看到。
g. M7 沒有追蹤者。這意味著 M7 發布的內容沒人能看到。
h. M8 有 M4 和 M6 作為追蹤者。這意味著 M8 發布的內容可以被 M4 和 M6 看到。

### 19.3.2 頁面
Twitter 網站有幾個頁面，但主要使用的是*網頁*和*首頁*。其他頁面可以從這兩個頁面之一到達。在解釋如何使用它們之前，讓我們描述這兩個頁面。

**網頁 (Web page)**
**網頁**用於首次加入 Twitter 或當您想登入帳戶時（圖 19.9）。

**首頁 (Home page)**
**首頁**用於當您已經擁有 Twitter 帳戶並想使用它時。此頁面的一般格式如圖 19.10 所示。

### 19.3.3 會員資格
與任何社群媒體一樣，您需要註冊才能成為會員（圖 19.9）。如果您想停用帳戶，您需要登出（圖 19.10）。

**註冊 (Sign up)**
要成為 Twitter 的會員，請前往 www.twitter.com 找到 Twitter 網頁，如圖 19.9 所示。然後點擊*註冊*按鈕以查看註冊視窗，如圖 19.11 所示。
在註冊視窗中提供您的全名、電話號碼或電子郵件以及密碼。現在點擊*註冊*按鈕加入成為會員。

**登出 (停用)**
要永久停用您在 Twitter 中的帳戶，請前往 Twitter 首頁（圖 19.10）並執行以下操作：
1. 點擊*個人資料*和*設定*圖示。
2. 當新視窗打開時，點擊*設定*和*隱私*按鈕。
3. 當新視窗打開時，點擊*停用我的帳戶*按鈕。

### 19.3.4 存取 Twitter 服務
即使您是會員，每當您想使用 Twitter 時，您都需要*登入*。當您暫時不想使用時，您可以*登出*。

**登入 (Log in)**
當您是會員時，您可以從任何電腦或智慧型手機登入您的帳戶。在 Twitter 網頁（圖 19.9）上，點擊*登入*按鈕以查看登入視窗，如圖 19.12 所示。
在登入視窗中，提供您的全名、電話號碼或電子郵件以及密碼。現在點擊*登入*按鈕。您現在可以使用 Twitter。

**登出 (Log out)**
要登出您在 Twitter 中的帳戶，請前往 Twitter 首頁（圖 19.10）並執行以下操作：
1. 點擊*個人資料*和*設定*圖示。
2. 當新視窗打開時，點擊*登出*按鈕。

### 19.3.5 追蹤與被追蹤
Twitter 的整個想法是使成員及其追蹤者能夠溝通。成員如果追蹤其他成員，就可以接收推文。如果成員有追蹤者，他們可以發送有用的推文，這些推文將被其追蹤者接收。

**您需要追蹤其他成員**
如果您想接收某些成員的推文，您需要讓 Twitter 知道您想**追蹤**他們。不需要獲得您想追蹤的成員的許可（除非他們明確要求 Twitter 封鎖您作為他們的追蹤者）。如果您輸入您想追蹤的成員姓名，Twitter 會在您的個人資料中創建一個列表，每當這些成員中的任何一位發送推文時，您都會收到一份副本。問題是：您如何告訴 Twitter 您想追蹤誰？有幾種方法可以做到這一點。

**接受 Twitter 推薦**
您可以接受 Twitter 的推薦（基於您過去的活動和興趣）。為此，請前往 Twitter 首頁左下角的*推薦追蹤*視窗，如圖 19.13 所示，並點擊*查看全部*按鈕以查看 Twitter 的推薦。要了解有關這些成員中任何一位的更多資訊，請點擊 @name。要追蹤成員，請點擊*追蹤*按鈕。

**追蹤電子郵件聯絡人**
您可以追蹤經常透過電子郵件與您聯繫的人。在*推薦追蹤*頁面（圖 19.13）上，點擊*尋找朋友*按鈕（在右側欄底部）。下一個視窗會出現電子郵件提供者列表，您可以從中選擇那些透過這些電子郵件提供者與您通訊的朋友。

**搜尋特定人員或組織**
在*推薦追蹤*部分（圖 19.13）點擊*查看全部*按鈕。當新視窗打開時，輸入您正在尋找的人員或組織的實際名稱或 Twitter 名稱。現在點擊*搜尋*按鈕。如果具有該名稱的個人或組織是 Twitter 成員，您可以選擇追蹤他們。

**停止追蹤成員**
由於某種原因，您可能想停止接收來自成員的推文。為此，您必須取消追蹤他們。前往 Twitter 首頁，點擊*正在追蹤*連結。將滑鼠移到該成員的*追蹤中*按鈕上，並將其更改為*取消追蹤*按鈕。

**其他成員追蹤您**
如果您希望您的推文被閱讀，您需要有追蹤者來接收它們。然而，您不能選擇您的追蹤者；他們必須找到您並決定追蹤您。他們不需要獲得您的批准來追蹤您，但如果您希望，您可以通知 Twitter 您想封鎖特定追蹤者。

### 19.3.6 發送推文
雖然您不認識所有的追蹤者——他們選擇了您，您沒有選擇他們——並且無法直接與他們溝通，但 Twitter 有您的追蹤者列表。要向您的追蹤者發送推文，只需將其發布在您的 Twitter 頁面上，網站就會將其發送給您的所有追蹤者。

**撰寫新推文**
您需要知道的第一件事是如何撰寫新推文。這可以按如下方式完成（見圖 19.14）。
1. 點擊任何 Twitter 網頁上的*推文*按鈕以查看*撰寫新推文*面板。
2. 在*撰寫新推文*面板中，輸入您的訊息。
3. 點擊頁面底部的*推文*按鈕發布您的推文。
4. Twitter 獲取您的推文並在推文頂部添加您的個人資料，包括您的姓名。
5. 然後 Twitter 向您的所有追蹤者發送副本。

**提及他人的推文**
在您發送的任何推文中，您也可以提及其他使用者的推文。這可以通過兩種方式完成：使用 **@ 符號 (ampersands)** 和/或使用 **# 符號 (hashtags)**。

**使用 @ 符號**
當您向追蹤者發送推文時，如果您想提及另一位使用者的推文，您可以插入該使用者的名字，並在前面加上 @ 符號 (@)。您的任何追蹤者都可以點擊該名字以查看該使用者發布的推文。

**使用 # 符號 (hashtags)**
有時您想提及包含特定單詞或片語的一組推文，這些推文來自不同的發送者。在這種情況下，您可以在單詞前面使用 # 符號 (#)。該單詞成為代表特定主題或議題的關鍵字，任何對該單詞的點擊都會顯示包含該單詞的所有最近推文。

### 19.3.7 接收推文
在您識別並指定您想追蹤的成員後，他們中任何一位發布的任何推文都會來到您的 Twitter 首頁（也稱為您的 Twitter 動態）。要前往您的首頁，請點擊 Twitter 工具列左上角的*首頁*圖示（圖 19.10），這將放大*正在發生*部分。閱讀任何推文後，您可以：
1. 點擊箭頭撰寫推文以回應推文的發送者。
2. 點擊雙箭頭**轉推 (retweet)** 收到的推文給自己的追蹤者。
3. 點擊星星表示喜歡該推文。

## 19.4 章末材料
### 19.4.1 推薦閱讀
關於本章討論主題的更多詳細資訊，推薦以下書籍：
Russel Matthew A. *Mining the Social Web*, Sebastopol, CA: O’Reilly, 2014

### 19.4.2 關鍵詞
- Facebook
- 追蹤 (follow)
- 正在追蹤 (following)
- 朋友 (friend)
- 朋友關係 (friendship)
- 主題標籤 (hashtag)
- 首頁 (home page)
- 新聞 (news)
- 登出 (sign out)
- 社群媒體 (social media)
- 推文 (tweet)
- Twitter
- 使用者頁面 (user page)
- 網頁 (web page)

### 19.4.3 摘要
- Facebook 允許世界各地的家人和朋友保持聯繫。
- 在 Facebook 中，每個成員都需要尋找朋友進行溝通，但朋友的朋友不是朋友。
- Facebook 中的溝通是一對多的。一個成員發布的內容可以被他們所有的朋友看到。
- 要成為 Facebook 會員，需要註冊。要終止會員資格，需要登出。
- 要使用 Facebook，成員需要登入；要暫時停止使用 Facebook，成員需要登出。
- Twitter 允許成員發布推文（短訊息）供其追蹤者閱讀。
- 在 Twitter 中，每個成員都需要尋找其他成員來追蹤。
- Twitter 中的溝通是一對多的。一個成員發布的所有內容都可以被他們所有的追蹤者看到。
- 要成為 Twitter 會員，需要註冊。要終止會員資格，需要登出。
- 要使用 Twitter，成員需要登入；要暫時停止使用 Twitter，成員需要登出。
- 成員需要追蹤其他成員才能接收他們的推文。

## 19.5 練習題
### 19.5.1 測驗
本章的一組互動測驗可以在本書的網站上找到。強烈建議學生在繼續練習題之前參加測驗以檢查他/她對材料的理解。

### 19.5.2 是非題
將以下陳述分類為對或錯。
T19-1. 在 Facebook 中，成員為其追蹤者發布內容。
T19-2. 在 Facebook 中，分享是在朋友之間進行的。
T19-3. 在 Facebook 中，朋友的朋友是朋友。
T19-4. Facebook 中的朋友關係是單向關係。
T19-5. Facebook 中的溝通是單向的。
T19-6. 要在 Facebook 中註冊，您需要在使用者頁面上。
T19-7. 在 Facebook 中只有一種尋找朋友的方法。
T19-8. 在 Facebook 中，一個成員發布的內容可以被他們所有的朋友看到。
T19-9. 在 Twitter 中，溝通發生在成員和他/她的朋友之間。
T19-10. 要成為 Twitter 會員，您需要登入。
T19-11. 要終止 Twitter 會員資格，您需要登出。
T19-12. 在使用 Twitter 之前，您需要尋找追蹤者。
T19-13. 在 Twitter 中，貼文（訊息）可以包含數千個字元。
T19-14. 要提及推文中命名的另一個人，您需要使用 @ 符號。
T19-15. 要引用所有推文中的一個詞，您需要使用 # 符號。

### 19.5.3 複習問題
Q19-1. 當我們考慮成員之間的關係時，Facebook 和 Twitter 有什麼區別？
Q19-2. 當我們考慮交換訊息的大小時，Facebook 和 Twitter 有什麼區別？
Q19-3. 在 Twitter 中，解釋為什麼追蹤者不能向他/她追蹤的成員發送訊息。
Q19-4. 在 Facebook 中，如果 x 和 y 是朋友，而 z 只是 x 的朋友但不是 y 的朋友，x 可以向 z 發送訊息嗎？z 可以向 x 發送訊息嗎？
Q19-5. 在 Twitter 中，如果 x 是 y 的追蹤者，而 y 是 z 的追蹤者，x 可以看到 z 發送的推文嗎？

### 19.5.4 問題
P19-1. 在圖 19.2 中，假設 M2 和 M5 終止了他們的朋友關係。為新情況重畫圖 19.3。
P19-2. 在圖 19.2 中，假設 M3 和 M8 成為朋友。為新情況重畫圖 19.3。
P19-3. 在圖 19.7 中，假設 M2 決定追蹤 M6。使用新情況重畫圖 19.7。
P19-4. 在圖 19.7 中，假設 M4 追蹤 M7 且 M7 追蹤 M3。使用新情況重畫圖 19.7。
`
};
