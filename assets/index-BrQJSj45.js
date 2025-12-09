const h=[],n=[{id:"c1.4",chapter:"1",number:"1.4",title_en:"Categorize Hardware/Software",title_zh:"硬體/軟體分類",description_en:`Categorize each of the following items as either hardware or software:
a) a microprocessor
b) RAM
c) Microsoft Visual Studio
d) a preprocessor
e) a scanner
f) an internet browser`,description_zh:`將下列各項分類為硬體或軟體：
a) 微處理器
b) RAM
c) Microsoft Visual Studio
d) 前置處理器
e) 掃描器
f) 網路瀏覽器`,difficulty:"easy",type:"short_answer"},{id:"c1.9",chapter:"1",number:"1.9",title_en:"Internet Negatives",title_zh:"網際網路的負面影響",description_en:"Besides their numerous benefits, the Internet and the web have several downsides, such as privacy issues, identity theft, spam and malware. Research some of the negative aspects of the Internet. List five problems and describe what could possibly be done to help solve each.",description_zh:"除了眾多好處外，網際網路和網路也有一些負面影響，例如隱私問題、身份盜竊、垃圾郵件和惡意軟體。研究網際網路的一些負面層面。列出五個問題，並描述可以採取哪些措施來幫助解決每個問題。",difficulty:"medium",type:"making_a_difference"},{id:"c1.10",chapter:"1",number:"1.10",title_en:"Watch as an Object",title_zh:"手錶作為物件",description_en:"You are probably wearing on your wrist one of the most common types of objects—a watch. Discuss how each of the following terms and concepts applies to the notion of a watch: object, attributes, behaviors, class, inheritance (consider, for example, an alarm clock), messages, encapsulation and information hiding.",description_zh:"你手腕上可能戴著最常見的物件類型之一——手錶。討論以下每個術語和概念如何應用於手錶的概念：物件、屬性、行為、類別、繼承（例如，考慮鬧鐘）、訊息、封裝和資訊隱藏。",difficulty:"medium",type:"short_answer"},{id:"c1.11",chapter:"1",number:"1.11",title_en:"Test-Drive: Carbon Footprint Calculator",title_zh:"試駕：碳足跡計算器",description_en:"Some scientists believe that carbon emissions contribute significantly to global warming. Websites like TerraPass and Carbon Footprint provide carbon-footprint calculators. Test-drive these calculators to determine your carbon footprint. To prepare for programming your own later, use the web to research the formulas for calculating carbon footprints.",description_zh:"一些科學家認為碳排放對全球暖化有顯著影響。像 TerraPass 和 Carbon Footprint 這樣的網站提供了碳足跡計算器。試用這些計算器來確定您的碳足跡。為了準備稍後自己編寫程式，請使用網路研究計算碳足跡的公式。",difficulty:"easy",type:"making_a_difference"},{id:"c1.12",chapter:"1",number:"1.12",title_en:"Test-Drive: Body Mass Index Calculator",title_zh:"試駕：身體質量指數(BMI)計算器",description_en:"Obesity causes significant increases in illnesses. To determine whether a person is overweight or obese, you can use the body mass index (BMI). The U.S. Department of Health provides a BMI calculator. Use it to calculate your own BMI. To prepare for programming your own later, research the formulas for calculating BMI.",description_zh:"肥胖會顯著增加疾病風險。要確定一個人是否超重或肥胖，您可以使用身體質量指數（BMI）。美國衛生部提供了一個 BMI 計算器。用它來計算您自己的 BMI。為了準備稍後自己編寫程式，請研究計算 BMI 的公式。",difficulty:"easy",type:"making_a_difference"},{id:"c1.14",chapter:"1",number:"1.14",title_en:"Gender Neutrality",title_zh:"性別中立",description_en:"You've been asked to create a program that can process a paragraph of text and replace gender-specific words with gender-neutral ones (e.g., replace “wife” with “spouse”). Explain the procedure you'd use to read through a paragraph and manually perform these replacements. How might your procedure generate a strange term like “woperchild?”",description_zh:"您被要求創建一個程式，該程式可以處理一段文本並將特定性別的詞語替換為性別中立的詞語（例如，將「妻子」替換為「配偶」）。解釋您將用來閱讀段落並手動執行這些替換的程序。您的程序可能會如何產生像「woperchild」這樣的奇怪術語？",difficulty:"medium",type:"making_a_difference"}],i=[{id:"c2.16",chapter:"2",number:"2.16",title_en:"Arithmetic",title_zh:"算術運算",description_en:"Write a program that asks the user to enter two numbers, obtains them from the user and prints their sum, product, difference, quotient and remainder.",description_zh:"編寫一個程式，要求使用者輸入兩個數字，從使用者那裡獲取它們，然後印出它們的和、積、差、商和餘數。",difficulty:"easy",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    // Declare variables
    int num1, num2;

    // Prompt user for input
    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);

    // Perform calculations and print results
    printf("Sum is %d\\n", num1 + num2);
    printf("Product is %d\\n", num1 * num2);
    printf("Difference is %d\\n", num1 - num2);
    printf("Quotient is %d\\n", num1 / num2);
    printf("Remainder is %d\\n", num1 % num2);
    
    return 0;
}`,sampleOutput:`Enter two numbers: 45 10
Sum is 55
Product is 450
Difference is 35
Quotient is 4
Remainder is 5`},{id:"c2.17",chapter:"2",number:"2.17",title_en:"Final Velocity",title_zh:"末速度計算",description_en:"Write a program that asks the user to enter the initial velocity (u), acceleration (a), and time (t) of an object, and prints the final velocity (v) and distance traversed (s), using the formulas: v = u + at and s = ut + (1/2)at²",description_zh:"編寫一個程式，要求使用者輸入物體的初速度(u)、加速度(a)和經過的時間(t)，並使用公式 v = u + at 和 s = ut + (1/2)at² 印出末速度 v 和行進距離 s。",difficulty:"easy",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    double u, a, t;
    double v, s;

    printf("Enter initial velocity (u): ");
    scanf("%lf", &u);

    printf("Enter acceleration (a): ");
    scanf("%lf", &a);

    printf("Enter time elapsed (t): ");
    scanf("%lf", &t);

    v = u + a * t;
    s = u * t + 0.5 * a * t * t;

    printf("\\nFinal velocity (v) is: %.2f\\n", v);
    printf("Distance traversed (s) is: %.2f\\n", s);
    
    return 0;
}`,sampleOutput:`Enter initial velocity (u): 10
Enter acceleration (a): 5
Enter time elapsed (t): 12

Final velocity (v) is: 70.00
Distance traversed (s) is: 480.00`},{id:"c2.19",chapter:"2",number:"2.19",title_en:"Arithmetic, Largest, and Smallest",title_zh:"算術、最大值與最小值",description_en:"Write a program that inputs three different integers from the keyboard, then prints the sum, the average, the product, the smallest and the largest of these numbers. Use only the single-selection form of the if statement.",description_zh:"編寫一個程式，從鍵盤輸入三個不同的整數，然後印出這些數字的和、平均值、積、最小值和最大值。僅使用單選 if 陳述式。",difficulty:"medium",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    int n1, n2, n3;
    int sum, product;
    float average;
    int smallest, largest;

    printf("Enter three different integers: ");
    scanf("%d %d %d", &n1, &n2, &n3);

    sum = n1 + n2 + n3;
    average = (float)sum / 3.0;
    product = n1 * n2 * n3;

    printf("Sum is %d\\n", sum);
    printf("Average is %.2f\\n", average);
    printf("Product is %d\\n", product);

    smallest = n1;
    if (n2 < smallest) {
        smallest = n2;
    }
    if (n3 < smallest) {
        smallest = n3;
    }
    printf("Smallest is %d\\n", smallest);

    largest = n1;
    if (n2 > largest) {
        largest = n2;
    }
    if (n3 > largest) {
        largest = n3;
    }
    printf("Largest is %d\\n", largest);

    return 0;
}`,sampleOutput:`Enter three different integers: 13 27 14
Sum is 54
Average is 18.00
Product is 4914
Smallest is 13
Largest is 27`},{id:"c2.20",chapter:"2",number:"2.20",title_en:"Seconds to H:M:S",title_zh:"秒數轉換",description_en:"Write a program that asks the user to enter the total time elapsed in seconds and converts it to hours:minutes:seconds. [Hint: Use the remainder operator]",description_zh:"編寫一個程式，要求使用者輸入經過的總秒數，並將其轉換為 時:分:秒 的格式。[提示：使用餘數運算子]",difficulty:"easy",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    int total_seconds;
    int hours, minutes, seconds;

    printf("Enter total time elapsed in seconds: ");
    scanf("%d", &total_seconds);

    hours = total_seconds / 3600;
    minutes = (total_seconds % 3600) / 60;
    seconds = total_seconds % 60;

    printf("%d seconds is equal to %d:%d:%d\\n", total_seconds, hours, minutes, seconds);

    return 0;
}`,sampleOutput:`Enter total time elapsed in seconds: 3723
3723 seconds is equal to 1:2:3`},{id:"c2.21",chapter:"2",number:"2.21",title_en:"Shapes with Asterisks",title_zh:"星號圖形",description_en:"Write a program that prints specific shapes using asterisks.",description_zh:"編寫一個程式，用星號印出指定的圖形。",difficulty:"easy",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    printf("*********\\n*       *\\n*       *\\n*       *\\n*       *\\n*       *\\n*       *\\n*       *\\n*********\\n\\n");
    printf("   ***   \\n *     * \\n*       *\\n*       *\\n*       *\\n*       *\\n*       *\\n *     * \\n   ***   \\n\\n");
    printf("  *  \\n *** \\n*****\\n  *  \\n  *  \\n  *  \\n  *  \\n\\n");
    printf("    *    \\n   * *   \\n  *   *  \\n *     * \\n*       *\\n *     * \\n  *   *  \\n   * *   \\n    *    \\n");
    return 0;
}`},{id:"c2.23",chapter:"2",number:"2.23",title_en:"Largest and Smallest Integers",title_zh:"最大與最小整數",description_en:"Write a program that reads in three integers and then determines and prints the largest and the smallest integers in the group.",description_zh:"編寫一個程式，讀入三個整數，然後確定並印出這組數中的最大值和最小值。",difficulty:"easy",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    int n1, n2, n3;
    int smallest, largest;

    printf("Enter three integers: ");
    scanf("%d %d %d", &n1, &n2, &n3);

    smallest = n1;
    if (n2 < smallest) smallest = n2;
    if (n3 < smallest) smallest = n3;

    largest = n1;
    if (n2 > largest) largest = n2;
    if (n3 > largest) largest = n3;

    printf("Smallest is %d\\n", smallest);
    printf("Largest is %d\\n", largest);

    return 0;
}`},{id:"c2.24",chapter:"2",number:"2.24",title_en:"Odd or Even",title_zh:"奇數或偶數",description_en:"Write a program that reads an integer and determines and prints whether it's odd or even.",description_zh:"編寫一個程式，讀入一個整數，然後確定並印出它是奇數還是偶數。",difficulty:"easy",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    int num;

    printf("Enter an integer: ");
    scanf("%d", &num);

    if (num % 2 == 0) {
        printf("%d is even.\\n", num);
    } else {
        printf("%d is odd.\\n", num);
    }
    
    return 0;
}`},{id:"c2.26",chapter:"2",number:"2.26",title_en:"Multiples",title_zh:"倍數",description_en:"Write a program that reads in two integers and determines and prints whether the first is a multiple of the second.",description_zh:"編寫一個程式，讀入兩個整數，然後確定並印出第一個數是否為第二個數的倍數。",difficulty:"easy",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    int num1, num2;

    printf("Enter two integers: ");
    scanf("%d %d", &num1, &num2);

    if (num2 != 0 && num1 % num2 == 0) {
        printf("%d is a multiple of %d.\\n", num1, num2);
    } else {
        printf("%d is not a multiple of %d.\\n", num1, num2);
    }

    return 0;
}`},{id:"c2.29",chapter:"2",number:"2.29",title_en:"Integer Value of a Character",title_zh:"字元的整數值",description_en:"Write a C program that prints the integer equivalents of: A B C a b c 0 1 2 $ * + / and the blank character.",description_zh:"編寫一個 C 程式，印出以下字元的整數等價值：A B C a b c 0 1 2 $ * + / 以及空白字元。",difficulty:"easy",type:"programming",templateCode:`#include <stdio.h>

int main(void) {
    printf("A: %d\\n", 'A');
    printf("B: %d\\n", 'B');
    printf("C: %d\\n", 'C');
    printf("a: %d\\n", 'a');
    printf("b: %d\\n", 'b');
    printf("c: %d\\n", 'c');
    printf("0: %d\\n", '0');
    printf("1: %d\\n", '1');
    printf("2: %d\\n", '2');
    printf("$: %d\\n", '$');
    printf("*: %d\\n", '*');
    printf("+: %d\\n", '+');
    printf("/: %d\\n", '/');
    printf("space: %d\\n", ' ');

    return 0;
}`},{id:"c2.32",chapter:"2",number:"2.32",title_en:"Body Mass Index Calculator",title_zh:"身體質量指數(BMI)計算機",description_en:"Create a BMI calculator application that reads the user's weight and height, then calculates and displays the user's body mass index, along with the standard BMI categories.",description_zh:"建立一個 BMI 計算器應用程式，讀取使用者的體重和身高，然後計算並顯示其身體質量指數，同時顯示標準的 BMI 分類資訊。",difficulty:"medium",type:"making_a_difference",templateCode:`#include <stdio.h>

int main(void) {
    float weight_lb, height_in;
    float bmi;

    printf("Enter your weight in pounds: ");
    scanf("%f", &weight_lb);
    printf("Enter your height in inches: ");
    scanf("%f", &height_in);

    bmi = (weight_lb * 703) / (height_in * height_in);

    printf("\\nYour BMI is: %.2f\\n\\n", bmi);
    
    printf("BMI VALUES\\n");
    printf("Underweight: less than 18.5\\n");
    printf("Normal:      between 18.5 and 24.9\\n");
    printf("Overweight:  between 25 and 29.9\\n");
    printf("Obese:       30 or greater\\n");

    return 0;
}`},{id:"c2.33",chapter:"2",number:"2.33",title_en:"Car-Pool Savings Calculator",title_zh:"共乘節省計算機",description_en:"Create an application that calculates your daily driving cost based on total miles, gas cost, mileage, parking, and tolls.",description_zh:"建立一個應用程式，根據總里程、油價、油耗、停車費和過路費來計算您的每日駕駛成本。",difficulty:"easy",type:"making_a_difference",templateCode:`#include <stdio.h>

int main(void) {
    float miles, cost_gallon, avg_mpg, parking, tolls;
    float daily_cost;

    printf("Enter total miles driven per day: ");
    scanf("%f", &miles);
    printf("Enter cost per gallon of gasoline: ");
    scanf("%f", &cost_gallon);
    printf("Enter average miles per gallon: ");
    scanf("%f", &avg_mpg);
    printf("Enter parking fees per day: ");
    scanf("%f", &parking);
    printf("Enter tolls per day: ");
    scanf("%f", &tolls);

    daily_cost = (miles / avg_mpg) * cost_gallon + parking + tolls;

    printf("\\nYour daily driving cost is: $%.2f\\n", daily_cost);

    return 0;
}`}],a=[{id:"c3.10",chapter:"3",number:"3.10",title_en:"Error Correction",title_zh:"錯誤修正",description_en:'Identify and correct the errors in each of the following code snippets. [Note: There may be more than one error in each piece of code.]\na) `if (sales => 5000 ) puts("Sales are greater than or equal to $5000"); else puts("Sales are less than $5000");`\nb) `int x = 1, product = 0; while (x <= 10); { product *= x; ++x; }`\nc) `While (x <= 100 ) total =+ x; ++x;`',description_zh:'找出並修正下列每個程式碼片段中的錯誤。[注意：每個程式碼片段中可能有一個以上的錯誤。]\na) `if (sales => 5000 ) puts("Sales are greater than or equal to $5000"); else puts("Sales are less than $5000");`\nb) `int x = 1, product = 0; while (x <= 10); { product *= x; ++x; }`\nc) `While (x <= 100 ) total =+ x; ++x;`',difficulty:"easy",type:"short_answer"},{id:"c3.16",chapter:"3",number:"3.16",title_en:"Sales Tax",title_zh:"銷售稅計算",description_en:"A retailer has to file a monthly sales tax report which lists the sales for the month and the amount of sales tax collected, at both the county and state levels. Develop a program that will input the total collections for a month, calculate the sales tax on the collections, and display the county and state taxes. Assume that states have a 4% sales tax and counties have a 5% sales tax.",description_zh:"零售商必須提交月度銷售稅報告，其中列出該月的銷售額以及在郡和州兩級徵收的銷售稅金額。開發一個程式，輸入一個月的總收款，計算收款的銷售稅，並顯示郡稅和州稅。假設州銷售稅為 4%，郡銷售稅為 5%。",difficulty:"easy",type:"programming"},{id:"c3.17",chapter:"3",number:"3.17",title_en:"Mortgage Calculator",title_zh:"抵押貸款計算器",description_en:"Develop a C program to calculate the interest accrued on a bank customer's mortgage. For each customer, the following facts are available: account number, mortgage amount, mortgage term (in years), and interest rate. The program should input each fact, calculate the total interest payable ( = mortgage amount × interest rate × mortgage term), and calculate the required monthly payment. The program should display the monthly payment rounded to the nearest dollar.",description_zh:"開發一個 C 程式來計算銀行客戶抵押貸款的應計利息。對於每個客戶，可獲得以下資訊：帳號、抵押貸款金額、抵押貸款期限（年）和利率。程式應輸入每個資訊，計算應付總利息（= 抵押貸款金額 × 利率 × 抵押貸款期限），並計算所需的每月還款額。程式應顯示四捨五入到最接近美元的每月還款額。",difficulty:"medium",type:"programming"},{id:"c3.18",chapter:"3",number:"3.18",title_en:"Sales-Commission Calculator",title_zh:"銷售佣金計算器",description_en:"A large chemical company pays its salespeople on a commission basis. The salespeople receive $200 per week plus 9% of their gross sales for that week. Develop a program that will input each salesperson's gross sales for last week and will calculate and display that salesperson's earnings. Process one salesperson's figures at a time.",description_zh:"一家大型化學公司按佣金制支付銷售人員薪水。銷售人員每週可獲得 200 美元，外加該週總銷售額的 9%。開發一個程式，輸入每位銷售人員上週的總銷售額，並計算和顯示該銷售人員的收入。一次處理一位銷售人員的數據。",difficulty:"easy",type:"programming"},{id:"c3.19",chapter:"3",number:"3.19",title_en:"Interest Calculator",title_zh:"利息計算器",description_en:"The simple interest on a loan is calculated by the formula: interest = principal * rate * days / 365; Develop a program that will input principal, rate and days for several loans, and will calculate and display the simple interest for each loan.",description_zh:"貸款的單利計算公式為：利息 = 本金 * 利率 * 天數 / 365；開發一個程式，輸入多筆貸款的本金、利率和天數，並計算和顯示每筆貸款的單利。",difficulty:"easy",type:"programming"},{id:"c3.20",chapter:"3",number:"3.20",title_en:"Salary Calculator",title_zh:"薪資計算器",description_en:`Develop a program that will determine the gross pay for each of several employees. The company pays “straight time” for the first 40 hours worked by each employee and pays "time-and-a-half" for all hours worked in excess of 40 hours. Your program should input the number of hours worked and the hourly rate for each employee, and determine and display the employee's gross pay.`,description_zh:"開發一個程式來確定幾位員工的總薪資。公司對每位員工工作的前 40 小時支付「正常工資」，對超過 40 小時的所有工時支付「1.5 倍工資」。您的程式應輸入每位員工的工作時數和時薪，並確定和顯示員工的總薪資。",difficulty:"medium",type:"programming"},{id:"c3.22",chapter:"3",number:"3.22",title_en:"Checking if a Number is Prime",title_zh:"檢查質數",description_en:"A prime number is any natural number greater than 1 that is divisible only by 1 and by itself. Write a C program that reads an integer and determines whether it is a prime number or not.",description_zh:"質數是任何大於 1 的自然數，且只能被 1 和它本身整除。編寫一個 C 程式，讀取一個整數並判斷它是否為質數。",difficulty:"medium",type:"programming"},{id:"c3.23",chapter:"3",number:"3.23",title_en:"Find the Largest Number",title_zh:"找出最大數",description_en:"Write a program that inputs a series of 10 non-negative numbers and determines and prints the largest of the numbers. Your program should use three variables: counter, number, and largest.",description_zh:"編寫一個程式，輸入一系列 10 個非負數，並確定和印出其中最大的數字。您的程式應使用三個變數：計數器、數字和最大值。",difficulty:"easy",type:"programming"},{id:"c3.24",chapter:"3",number:"3.24",title_en:"Tabular Output",title_zh:"表格輸出",description_en:"Write a program that uses looping to print a table of N, N^2, N^3, and N^4 for N from 1 to 10. Use the tab escape sequence (\\t) to separate the columns.",description_zh:"編寫一個程式，使用迴圈印出 N 從 1 到 10 的 N、N^2、N^3 和 N^4 的表格。使用定位字元逸出序列 (\\t) 來分隔各欄。",difficulty:"easy",type:"programming"},{id:"c3.32",chapter:"3",number:"3.32",title_en:"Square of Asterisks",title_zh:"星號正方形",description_en:"Write a program that reads in the side of a square and then prints that square out of asterisks. Your program should work for squares of all side sizes between 1 and 20.",description_zh:"編寫一個程式，讀入一個正方形的邊長，然後用星號印出該正方形。您的程式應適用於邊長在 1 到 20 之間的所有正方形。",difficulty:"easy",type:"programming"},{id:"c3.33",chapter:"3",number:"3.33",title_en:"Hollow Square of Asterisks",title_zh:"空心星號正方形",description_en:"Modify the program you wrote in Exercise 3.32 so that it prints a hollow square. For example, if your program reads a size of 5, it should print a 5x5 hollow square.",description_zh:"修改您在練習 3.32 中編寫的程式，使其印出一個空心正方形。例如，如果您的程式讀取的大小為 5，它應該印出一個 5x5 的空心正方形。",difficulty:"medium",type:"programming"},{id:"c3.45",chapter:"3",number:"3.45",title_en:"Factorial",title_zh:"階乘",description_en:"The factorial of a nonnegative integer n is written n!. Write a program that reads a nonnegative integer and computes and prints its factorial.",description_zh:"非負整數 n 的階乘寫作 n!。編寫一個程式，讀取一個非負整數，並計算和印出其階乘。",difficulty:"easy",type:"programming"},{id:"c3.46",chapter:"3",number:"3.46",title_en:"World Population Growth Calculator",title_zh:"世界人口增長計算器",description_en:"Use the web to determine the current world population and the annual world population growth rate. Write an application that inputs these values, then displays the estimated world population after one, two, three, four and five years.",description_zh:"使用網路確定當前的世界人口和年度世界人口增長率。編寫一個應用程式，輸入這些值，然後顯示一年、兩年、三年、四年和五年後的預計世界人口。",difficulty:"easy",type:"making_a_difference"},{id:"c3.47",chapter:"3",number:"3.47",title_en:"Target-Heart-Rate Calculator",title_zh:"目標心率計算器",description_en:"Create a program that reads the user's birthday and the current day (each consisting of the month, day and year). Your program should calculate and display the person's age (in years), the person's maximum heart rate (220 - age) and the person's target-heart-rate range (50-85% of max).",description_zh:"創建一個程式，讀取使用者的生日和當前日期（均包括月、日、年）。您的程式應計算並顯示此人的年齡（歲）、最大心率（220 - 年齡）和目標心率範圍（最大心率的 50-85%）。",difficulty:"medium",type:"making_a_difference"},{id:"c3.48",chapter:"3",number:"3.48",title_en:"Enforcing Privacy with Cryptography",title_zh:"用密碼學加強隱私",description_en:"Write a program that encrypts a four-digit integer. Replace each digit with the result of adding 7 to the digit and getting the remainder after dividing by 10. Then swap the first digit with the third, and swap the second digit with the fourth. Print the encrypted integer. Write a separate application that decrypts it.",description_zh:"編寫一個加密四位數整數的程式。將每個數字替換為（該數字+7）除以 10 的餘數。然後交換第一位和第三位數字，交換第二位和第四位數字。印出加密後的整數。再編寫一個獨立的應用程式來解密它。",difficulty:"hard",type:"making_a_difference"}],o=[{id:"c4.5",chapter:"4",number:"4.5",title_en:"Find the Errors",title_zh:"找出錯誤",description_en:'Find the error in each of the following. (Note: There may be more than one error.)\na) `for (a = 25, a <= 1, a--); { printf("%d\\n", a); }`\nb) The following code should print whether a given integer is odd or even: `switch (value) { case (value % 2 == 0): puts("Even"); case (value % 2 != 0): puts("Odd"); }`',description_zh:'找出下列各項中的錯誤。（註：可能有一個以上的錯誤。）\na) `for (a = 25, a <= 1, a--); { printf("%d\\n", a); }`\nb) 下列程式碼應該要印出給定的整數是奇數還是偶數：`switch (value) { case (value % 2 == 0): puts("Even"); case (value % 2 != 0): puts("Odd"); }`',difficulty:"easy",type:"short_answer"},{id:"c4.9",chapter:"4",number:"4.9",title_en:"Sum and Average of Integers",title_zh:"整數的總和與平均值",description_en:"Write a program to sum a sequence of integers and calculate their average. Assume that the first integer read specifies the number of values to be entered.",description_zh:"編寫一個程式來加總一個整數序列並計算它們的平均值。假設讀取的第一個整數指定了要輸入的值的數量。",difficulty:"easy",type:"programming"},{id:"c4.10",chapter:"4",number:"4.10",title_en:"Conversion Celsius to Fahrenheit",title_zh:"攝氏度轉華氏度",description_en:"Write a program that converts temperatures from 30°C to 50°C to the Fahrenheit scale. The program should print a table displaying temperatures in the two scales side by side. [Hint: °F = (9/5)°C + 32]",description_zh:"編寫一個程式，將 30°C 到 50°C 的溫度轉換為華氏度。程式應印出一個並排顯示兩種溫標的表格。[提示：°F = (9/5)°C + 32]",difficulty:"easy",type:"programming"},{id:"c4.12",chapter:"4",number:"4.12",title_en:"Prime Numbers",title_zh:"質數",description_en:"Write a program to calculate and print a list of all prime numbers from 1 to 100.",description_zh:"編寫一個程式來計算並印出 1 到 100 之間的所有質數列表。",difficulty:"medium",type:"programming"},{id:"c4.14",chapter:"4",number:"4.14",title_en:"Factorials",title_zh:"階乘",description_en:"Write a program that evaluates the factorials of the integers from 1 to 5. Print the results in tabular format. What difficulty might prevent you from calculating the factorial of 20?",description_zh:"編寫一個程式，計算 1 到 5 的整數的階乘。以表格格式印出結果。計算 20 的階乘可能會遇到什麼困難？",difficulty:"easy",type:"programming"},{id:"c4.15",chapter:"4",number:"4.15",title_en:"Modified Compound-Interest Program",title_zh:"修改後的複利程式",description_en:"Modify the compound-interest program to repeat its steps for interest rates of 5%, 6%, 7%, 8%, 9%, and 10%. Use a for loop to vary the interest rate.",description_zh:"修改複利程式，使其對 5%、6%、7%、8%、9% 和 10% 的利率重複其步驟。使用 for 迴圈來改變利率。",difficulty:"medium",type:"programming"},{id:"c4.16",chapter:"4",number:"4.16",title_en:"Triangle-Printing Program",title_zh:"三角形列印程式",description_en:'Write a program that prints four different triangle patterns separately, one below the other, using for loops. All asterisks (*) should be printed by a single printf statement of the form printf("%s", "*");',description_zh:'編寫一個程式，使用 for 迴圈分別印出四種不同的三角形圖案，一個在另一個下面。所有星號 (*) 都應由 printf("%s", "*"); 形式的單一 printf 陳述式印出。',difficulty:"medium",type:"programming"},{id:"c4.17",chapter:"4",number:"4.17",title_en:"Calculating Credit Limits",title_zh:"計算信用額度",description_en:"A company has cut its customers' credit limits in half. Write a program that analyzes the credit status of three customers. For each customer you're given an account number, credit limit before the recession, and current balance. Your program should calculate and print the new credit limit and determine which customers have balances that exceed their new credit limits.",description_zh:"一家公司將其客戶的信用額度減半。編寫一個程式，分析三位客戶的信用狀況。對於每位客戶，您將獲得帳號、衰退前的信用額度和當前餘額。您的程式應計算並印出新的信用額度，並確定哪些客戶的餘額超過了他們的新信用額度。",difficulty:"easy",type:"programming"},{id:"c4.18",chapter:"4",number:"4.18",title_en:"Bar-Chart Printing Program",title_zh:"長條圖列印程式",description_en:"Write a program that reads five numbers (each between 1 and 30). For each number read, your program should print a line containing that number of adjacent asterisks.",description_zh:"編寫一個程式，讀取五個數字（每個數字介於 1 和 30 之間）。對於讀取的每個數字，您的程式應印出一行包含該數量相鄰星號的線。",difficulty:"easy",type:"programming"},{id:"c4.19",chapter:"4",number:"4.19",title_en:"Calculating Sales",title_zh:"計算銷售額",description_en:"An online retailer sells five different products. Write a program that reads a series of pairs of numbers (product number and quantity sold) and uses a switch statement to determine the retail price for each product. Your program should calculate and display the total retail value of all products sold.",description_zh:"一家線上零售商銷售五種不同的產品。編寫一個程式，讀取一系列數字對（產品編號和銷售數量），並使用 switch 陳述式來確定每種產品的零售價。您的程式應計算並顯示所有售出產品的總零售價值。",difficulty:"medium",type:"programming"},{id:"c4.27",chapter:"4",number:"4.27",title_en:"Pythagorean Triples",title_zh:"畢氏三元數組",description_en:"A right triangle can have sides that are all integers. The set of three integer values for the sides is called a Pythagorean triple. These three sides must satisfy the relationship that the sum of the squares of two of the sides is equal to the square of the hypotenuse. Find all Pythagorean triples for side1, side2, and the hypotenuse all no larger than 500. Use a triple-nested for loop.",description_zh:"直角三角形的三個邊可以是整數。這組三個整數值稱為畢氏三元數組。這三個邊必須滿足兩邊平方和等於斜邊平方的關係。找出 side1、side2 和斜邊都不大於 500 的所有畢氏三元數組。使用三重巢狀 for 迴圈。",difficulty:"hard",type:"programming"},{id:"c4.28",chapter:"4",number:"4.28",title_en:"Calculating Weekly Pay",title_zh:"計算週薪",description_en:"A company pays its employees as managers (fixed salary), hourly workers (time-and-a-half for overtime), commission workers ($250 + 5.7% of sales), or pieceworkers. Write a program to compute the weekly pay for each employee. Use a switch to compute pay based on an employee's paycode.",description_zh:"一家公司支付其員工薪資的方式有：經理（固定週薪）、計時工（加班費為 1.5 倍）、佣金工（250 美元 + 5.7% 的銷售額）或計件工。編寫一個程式來計算每位員工的週薪。使用 switch 根據員工的薪資代碼計算薪資。",difficulty:"hard",type:"programming"},{id:"c4.29",chapter:"4",number:"4.29",title_en:"De Morgan's Laws",title_zh:"笛摩根定律",description_en:"Use De Morgan's Laws to write equivalent expressions for each of the following, and then write a program to show that both the original expression and the new expression in each case are equivalent.\na) `! (x < 5) && ! (y >= 7)`\nb) `! (a == b) || !(g != 5)`\nc) `!((x <= 8) && (y > 4))`\nd) `!((i > 4) || (j <= 6))`",description_zh:"使用笛摩根定律為下列各項編寫等價的表達式，然後編寫一個程式來證明原始表達式和新表達式在每種情況下都是等價的。\na) `! (x < 5) && ! (y >= 7)`\nb) `! (a == b) || !(g != 5)`\nc) `!((x <= 8) && (y > 4))`\nd) `!((i > 4) || (j <= 6))`",difficulty:"medium",type:"programming"},{id:"c4.31",chapter:"4",number:"4.31",title_en:"Diamond-Printing Program",title_zh:"鑽石圖形列印程式",description_en:"Write a program that prints a diamond shape. You may use printf statements that print either a single asterisk (*) or a single blank. Maximize your use of iteration (with nested for statements).",description_zh:"編寫一個程式來印出鑽石形狀。您可以使用只印出單一星號 (*) 或單一空格的 printf 陳述式。最大化地使用迭代（使用巢狀 for 陳述式）。",difficulty:"medium",type:"programming"},{id:"c4.40",chapter:"4",number:"4.40",title_en:"World Population Growth",title_zh:"世界人口增長",description_en:"Get estimates for the current world population and its growth rate. Write a program that calculates world population growth each year for the next 75 years, using the simplifying assumption that the current growth rate will stay constant. Determine the year in which the population would be double what it is today.",description_zh:"獲取當前世界人口及其增長率的估計值。編寫一個程式，在假設當前增長率保持不變的情況下，計算未來 75 年每年的世界人口增長。確定人口將是今天兩倍的年份。",difficulty:"medium",type:"making_a_difference"},{id:"c4.41",chapter:"4",number:"4.41",title_en:"Tax Plan Alternatives; The “FairTax”",title_zh:"稅收計畫替代方案；「公平稅」",description_en:"Research how the proposed FairTax works. Write a program that prompts the user to enter expenses in various categories (e.g., housing, food, clothing), then prints the estimated FairTax that person would pay.",description_zh:"研究擬議的公平稅 (FairTax) 如何運作。編寫一個程式，提示使用者輸入各種類別的開支（例如，住房、食品、衣物），然後印出該人將支付的預計公平稅。",difficulty:"medium",type:"making_a_difference"}],m=[...n,...i,...a,...o],u=[],r={en:`
# Preface

Welcome to the C programming language and to C How to Program, Eighth Edition! This book presents leading-edge computing technologies for college students, instructors and software-development professionals.

At the heart of the book is the Deitel signature “live-code approach”—we present concepts in the context of complete working programs, rather than in code snippets. Each code example is followed by one or more sample executions. Read the online Before You Begin section at http://www.deitel.com/books/chtp8/chtp8_BYB.pdf to learn how to set up your computer to run the hundreds of code examples. All the source code is available at www.pearsonglobaleditions.com/deitel.

Use the source code we provide to run every program as you study it.

We believe that this book and its support materials will give you an informative, challenging and entertaining introduction to C. As you read the book, if you have questions, send an e-mail to deitel@deitel.com—we'll respond promptly. For book updates, visit www.deitel.com/books/chtp8/, join our social media communities:

*   Facebook®—http://facebook.com/DeitelFan
*   Twitter®—@deitel
*   LinkedIn®—http://linkedin.com/company/deitel-&-associates
*   YouTube™—http://youtube.com/DeitelTV
*   Google+™—http://google.com/+DeitelFan

and register for the Deitel® Buzz Online e-mail newsletter at: http://www.deitel.com/newsletter/subscribe.html

## New and Updated Features

Here are some key features of C How to Program, 8/e:

*   **Integrated More Capabilities of the C11 and C99 standards.** Support for the C11 and C99 standards varies by compiler. Microsoft Visual C++ supports a subset of the features that were added to C in C99 and C11—primarily the features that are also required by the C++ standard. We incorporated several widely supported C11 and C99 features into the book's early chapters, as appropriate for introductory courses and for the compilers we used in this book. Appendix E, Multithreading and Other C11 and C99 Topics, presents more advanced features (such as multithreading for today's increasingly popular multi-core architectures) and various other features that are not widely supported by today's C compilers.
*   **All Code Tested on Linux, Windows and OS X.** We retested all the example and exercise code using GNU gcc on Linux, Visual C++ on Windows (in Visual Studio 2013 Community Edition) and LLVM in Xcode on OS X.
*   **Updated Chapter 1.** The new Chapter 1 engages students with updated intriguing facts and figures to get them excited about studying computers and computer programming. The chapter includes current technology trends and hardware discussions, the data hierarchy, social networking and a table of business and technology publications and websites that will help you stay up to date with the latest technology news and trends. We've included updated test-drives that show how to run a command-line C program on Linux, Microsoft Windows and OS X. We also updated the discussions of the Internet and web, and the introduction to object technology.
*   **Updated Coverage of C++ and Object-Oriented Programming.** We updated Chapters 15–23 on object-oriented programming in C++ with material from our textbook C++ How to Program, 9/e, which is up-to-date with the C++11 standard.
*   **Updated Code Style.** We removed the spacing inside parentheses and square brackets, and toned down our use of comments a bit. We also added parentheses to certain compound conditions for clarity.
*   **Variable Declarations.** Because of improved compiler support, we were able to move variable declarations closer to where they're first used and define for-loop counter-control variables in each for's initialization section.
*   **Summary Bullets.** We removed the end-of-chapter terminology lists and updated the detailed section-by-section, bullet-list summaries with bolded key terms and, for most, page references to their defining occurrences.
*   **Use of Standard Terminology.** To help students prepare to work in industry worldwide, we audited the book against the C standard and upgraded our terminology to use C standard terms in preference to general programming terms.
*   **Online Debugger Appendices.** We've updated the online GNU gdb and Visual C++® debugging appendices, and added an Xcode® debugging appendix.
*   **Additional Exercises.** We updated various exercises and added some new ones, including one for the Fisher-Yates unbiased shuffling algorithm in Chapter 10.

## Other Features

Other features of C How to Program, 8/e include:

*   **Secure C Programming Sections.** Many of the C chapters end with a Secure C Programming Section. We've also posted a Secure C Programming Resource Center at www.deitel.com/SecureC/.
*   **Focus on Performance Issues.** C (and C++) are favored by designers of performance-intensive systems such as operating systems, real-time systems, embedded systems and communications systems, so we focus intensively on performance issues.
*   **"Making a Difference" Contemporary Exercises.** We encourage you to use computers and the Internet to research and solve significant problems. These exercises are meant to increase awareness of important issues the world is facing.
*   **Sorting: A Deeper Look.** We begin our sorting presentation in Chapter 6 with a simple algorithm—in Appendix D, we present a deeper look. We consider several algorithms and compare them with regard to their memory consumption and processor demands.
*   **Titled Programming Exercises.** Most of the programming exercises are titled to help instructors conveniently choose assignments appropriate for their students.
*   **Order of Evaluation.** We caution the reader about subtle order of evaluation issues.
*   **C++-Style // Comments.** We use the newer, more concise C++-style \`//\` comments in preference to C's older style \`/*...*/\` comments.

## A Note About Secure C Programming
Industrial-strength coding techniques in any programming language are beyond the scope of an introductory textbook. For that reason, our Secure C Programming sections present some key issues and techniques, and provide links and references so you can continue learning.

The CERT® Coordination Center (www.cert.org) was created to analyze and respond promptly to attacks. CERT—the Computer Emergency Response Team—publishes and promotes secure coding standards to help C programmers and others implement industrial-strength systems that avoid the programming practices that leave systems vulnerable to attacks. The CERT standards evolve as new security issues arise.

We've upgraded our code (as appropriate for an introductory book) to conform to various CERT recommendations. The Secure C Programming sections at the ends of Chapters 2–13 discuss many important topics, including:
*   testing for arithmetic overflows
*   using unsigned integer types
*   the more secure functions in the C standard's Annex K
*   the importance of checking the status information returned by standard-library functions
*   range checking
*   secure random-number generation
*   array bounds checking
*   preventing buffer overflows
*   input validation
*   avoiding undefined behaviors
*   choosing functions that return status information vs. using similar functions that do not
*   ensuring that pointers are always NULL or contain valid addresses
*   using C functions vs. using preprocessor macros, and more.

## Software Used in C How to Program, 8/e
We tested the programs in C How to Program, 8/e using the following free compilers:
*   GNU C and C++ (http://gcc.gnu.org/install/binaries.html)
*   Microsoft's Visual C++ in Visual Studio 2013 Community edition (http://go.microsoft.com/?linkid=9863608)
*   LLVM in Apple's Xcode IDE
`,zh:`
# 前言

歡迎來到 C 程式語言與《C 語言程式設計》第八版！本書為大學生、教師和軟體開發專業人士介紹前沿的計算機技術。

本書的核心是 Deitel 標誌性的「實時代碼方法」(live-code approach)——我們在完整的、可運行的程式上下文中呈現概念，而不是零碎的程式碼片段。每個程式碼範例後都附有一個或多個範例執行結果。請閱讀線上的「開始之前」部分 (http://www.deitel.com/books/chtp8/chtp8_BYB.pdf)，以了解如何設定您的電腦來運行數百個程式碼範例。所有原始碼都可以在 www.pearsonglobaleditions.com/deitel 下載。

在您學習的過程中，使用我們提供的原始碼來運行每一個程式。

我們相信，本書及其支援材料將為您提供一個資訊豐富、具挑戰性且有趣的 C 語言入門。在閱讀本書時，如果您有任何問題，請發送電子郵件至 deitel@deitel.com——我們會迅速回覆。有關書籍更新，請訪問 www.deitel.com/books/chtp8/，或加入我們的社群媒體：

*   Facebook®—http://facebook.com/DeitelFan
*   Twitter®—@deitel
*   LinkedIn®—http://linkedin.com/company/deitel-&-associates
*   YouTube™—http://youtube.com/DeitelTV
*   Google+™—http://google.com/+DeitelFan

並在以下網址註冊 Deitel® Buzz 線上電子報：http://www.deitel.com/newsletter/subscribe.html

## 新增與更新功能

以下是《C 語言程式設計》第八版的一些主要特色：

*   **整合更多 C11 和 C99 標準的功能。** C11 和 C99 標準的支援因編譯器而異。Microsoft Visual C++ 支援 C99 和 C11 中新增的一部分功能——主要是那些 C++ 標準也要求的功能。我們已將幾個廣泛支援的 C11 和 C99 特性納入本書的早期章節，以適用於入門課程和我們在本書中使用的編譯器。附錄 E「多執行緒與其他 C11 和 C99 主題」介紹了更進階的功能（例如適用於現今日益流行的多核心架構的多執行緒）以及其他當今 C 編譯器尚未廣泛支援的各種功能。
*   **所有程式碼皆在 Linux、Windows 和 OS X 上測試通過。** 我們在 Linux 上使用 GNU gcc、在 Windows 上使用 Visual C++（在 Visual Studio 2013 社群版中）以及在 OS X 上的 Xcode 中使用 LLVM，重新測試了所有的範例和練習程式碼。
*   **更新第一章。** 新的第一章透過更新的趣聞和數據來吸引學生，讓他們對學習電腦和電腦程式設計感到興奮。本章包括當前的技術趨勢和硬體討論、資料階層、社交網路以及一個商業和技術出版物與網站的表格，這將幫助您隨時了解最新的技術新聞和趨勢。我們還包括了更新的試駕，展示如何在 Linux、Microsoft Windows 和 OS X 上運行命令列 C 程式。我們也更新了關於網際網路和網路的討論，以及物件技術的介紹。
*   **更新 C++ 和物件導向程式設計的內容。** 我們根據我們的教科書《C++ 程式設計》第九版的內容更新了關於 C++ 物件導向程式設計的第 15-23 章，該書內容與 C++11 標準保持同步。
*   **更新程式碼風格。** 我們移除了括號和方括號內的空格，並稍微減少了註解的使用。我們也為某些複合條件添加了括號以增加清晰度。
*   **變數宣告。** 由於編譯器支援的改進，我們能夠將變數宣告移至更靠近其首次使用的位置，並在每個 for 迴圈的初始化部分定義 for 迴圈的計數器控制變數。
*   **摘要重點。** 我們移除了章末的術語列表，並更新了詳細的、分節的重點摘要，其中包含粗體的關鍵術語，並且對於大多數術語，還附有其定義出現的頁碼參考。
*   **使用標準術語。** 為幫助學生準備在全球產業中工作，我們對照 C 標準審核了本書，並升級了我們的術語，優先使用 C 標準術語而非一般程式設計術語。
*   **線上除錯器附錄。** 我們更新了線上的 GNU gdb 和 Visual C++® 除錯附錄，並新增了 Xcode® 除錯附錄。
*   **額外練習題。** 我們更新了各種練習題並新增了一些新的題目，包括一個關於第十章中 Fisher-Yates 無偏洗牌演算法的練習。

## 其他特色

《C 語言程式設計》第八版的其他特色包括：

*   **安全 C 程式設計章節。** 許多 C 語言章節的結尾都有一個安全 C 程式設計章節。我們也在 www.deitel.com/SecureC/ 上發布了一個安全 C 程式設計資源中心。
*   **專注於性能問題。** C (和 C++) 受到性能密集型系統（如作業系統、即時系統、嵌入式系統和通訊系統）設計師的青睞，因此我們深入關注性能問題。
*   **「創造不同」的當代練習題。** 我們鼓勵您使用電腦和網際網路來研究和解決重要問題。這些練習旨在提高對世界面臨的重要議題的認識。
*   **排序：深入探討。** 我們在第六章以一個簡單的演算法開始介紹排序——在附錄 D 中，我們提供了更深入的探討。我們考慮了幾種演算法，並比較了它們在記憶體消耗和處理器需求方面的表現。
*   **標題化的程式設計練習。** 大多數程式設計練習都有標題，以幫助教師方便地為學生選擇合適的作業。
*   **求值順序。** 我們提醒讀者注意微妙的求值順序問題。
*   **C++ 風格的 // 註解。** 我們優先使用更新、更簡潔的 C++ 風格的 \`//\` 註解，而不是 C 的舊式 \`/*...*/\` 註解。

## 關於安全 C 程式設計的說明
任何程式語言的工業級編碼技術都超出了入門教科書的範圍。因此，我們的「安全 C 程式設計」部分介紹了一些關鍵問題和技術，並提供連結和參考資料，以便您繼續學習。

CERT® 協調中心 (www.cert.org) 的創建是為了分析和迅速應對攻擊。CERT——電腦緊急應變小組——發布並推廣安全編碼標準，以幫助 C 程式設計師和其他人實施能夠避免使系統易受攻擊的程式設計實踐的工業級系統。隨著新安全問題的出現，CERT 標準也在不斷演進。

我們已經（在適合入門書籍的範圍內）升級了我們的程式碼以符合各種 CERT 的建議。第 2-13 章末尾的「安全 C 程式設計」部分討論了許多重要主題，包括：
*   測試算術溢位
*   使用無符號整數類型
*   C 標準附件 K 中更安全的函式
*   檢查標準函式庫函式回傳的狀態資訊的重要性
*   範圍檢查
*   安全隨機數生成
*   陣列邊界檢查
*   防止緩衝區溢位
*   輸入驗證
*   避免未定義行為
*   選擇回傳狀態資訊的函式 vs. 使用不回傳的類似函式
*   確保指標始終為 NULL 或包含有效位址
*   使用 C 函式 vs. 使用前置處理器巨集，等等。

## 《C 語言程式設計》第八版使用的軟體
我們使用以下免費編譯器測試了《C 語言程式設計》第八版中的程式：
*   GNU C 和 C++ (http://gcc.gnu.org/install/binaries.html)
*   Microsoft Visual C++ in Visual Studio 2013 社群版 (http://go.microsoft.com/?linkid=9863608)
*   Apple Xcode IDE 中的 LLVM
`},s={en:`
# 1. Introduction to Computers, the Internet and the Web

## 1.1 Introduction
Welcome to C and C++! C is a concise yet powerful computer programming language that’s appropriate for technically oriented people with little or no programming experience and for experienced programmers to use in building substantial software systems. C How to Program, Eighth Edition, is an effective learning tool for each of these audiences.

The core of the book emphasizes software engineering through the proven methodologies of structured programming in C and object-oriented programming in C++. The book presents hundreds of complete working programs and shows the outputs produced when those programs are run on a computer. We call this the “live-code approach.” All of these example programs may be downloaded from our website www.deitel.com/books/chtp8/.

Most people are familiar with the exciting tasks that computers perform. Using this textbook, you'll learn how to command computers to perform those tasks. It’s software (i.e., the instructions you write to command computers to perform actions and make decisions) that controls computers (often referred to as hardware).

## 1.2 Hardware and Software
Computers can perform calculations and make logical decisions phenomenally faster than human beings can. Many of today's personal computers can perform billions of calculations in one second—more than a human can perform in a lifetime. Supercomputers are already performing thousands of trillions (quadrillions) of instructions per second! China's National University of Defense Technology's Tianhe-2 supercomputer can perform over 33 quadrillion calculations per second (33.86 petaflops)! To put that in perspective, the Tianhe-2 supercomputer can perform in one second about 3 million calculations for every person on the planet! And supercomputing “upper limits" are growing quickly.

Computers process data under the control of sequences of instructions called **computer programs**. These software programs guide the computer through ordered actions specified by people called **computer programmers**.

A computer consists of various devices referred to as **hardware** (e.g., the keyboard, screen, mouse, hard disks, memory, DVD drives and processing units). Computing costs are dropping dramatically, owing to rapid developments in hardware and software technologies. Computers that might have filled large rooms and cost millions of dollars decades ago are now inscribed on silicon chips smaller than a fingernail, costing perhaps a few dollars each. Ironically, silicon is one of the most abundant materials on Earth—it's an ingredient in common sand. Silicon-chip technology has made computing so economical that computers have become a commodity.

### 1.2.1 Moore's Law
Every year, you probably expect to pay at least a little more for most products and services. The opposite has been the case in the computer and communications fields, especially with regard to the hardware supporting these technologies. For many decades, hardware costs have fallen rapidly.

Every year or two, the capacities of computers have approximately doubled inexpensively. This remarkable trend often is called **Moore’s Law**, named for the person who identified it in the 1960s, Gordon Moore, co-founder of Intel—the leading manufacturer of the processors in today's computers and embedded systems. Moore's Law and related observations apply especially to the amount of memory that computers have for programs, the amount of secondary storage (such as disk storage) they have to hold programs and data over longer periods of time, and their processor speeds—the speeds at which they execute their programs (i.e., do their work).

Similar growth has occurred in the communications field—costs have plummeted as enormous demand for communications bandwidth (i.e., information-carrying capacity) has attracted intense competition. We know of no other fields in which technology improves so quickly and costs fall so rapidly. Such phenomenal improvement is truly fostering the Information Revolution.

### 1.2.2 Computer Organization
Regardless of differences in physical appearance, computers can be envisioned as divided into various logical units or sections.

| Logical unit | Description |
|---|---|
| **Input unit** | This "receiving" section obtains information (data and computer programs) from input devices and places it at the disposal of the other units for processing. Most user input is entered into computers through keyboards, touch screens and mouse devices. Other forms of input include receiving voice commands, scanning images and barcodes, reading from secondary storage devices (such as hard drives, DVD drives, Blu-ray DiscTM drives and USB flash drives—also called “thumb drives” or “memory sticks”), receiving video from a webcam and having your computer receive information from the Internet (such as when you stream videos from YouTube® or download e-books from Amazon). Newer forms of input include position data from a GPS device, and motion and orientation information from an accelerometer in a smartphone or game controller. |
| **Output unit** | This "shipping" section takes information the computer has processed and places it on various output devices to make it available for use outside the computer. Most information that's output from computers today is displayed on screens (including touch screens), printed on paper, played as audio or video, and giant screens in sports stadiums, transmitted over the Internet or used to control other devices, such as robots and “intelligent” appliances. Information is also commonly output to secondary storage devices. |
| **Memory unit** | This rapid-access, relatively low-capacity “warehouse” section retains information that has been entered through the input unit, making it immediately available for processing when needed. The memory unit also retains processed information until it can be placed on output devices. Information in the memory unit is volatile—it's typically lost when the computer's power is turned off. The memory unit is often called either memory, **primary memory** or RAM (Random Access Memory). |
| **Arithmetic and logic unit (ALU)** | This "manufacturing" section performs calculations, such as addition, subtraction, multiplication and division. It also contains the decision mechanisms that allow the computer to compare two items from the memory unit to determine whether they're equal. |
| **Central processing unit (CPU)** | This "administrative” section coordinates and supervises the operation of the other sections. The CPU tells the input unit when information should be read into the memory unit, tells the ALU when information from the memory unit should be used in calculations and tells the output unit when to send information from the memory unit to certain output devices. Many of today's computers have multiple CPUs and, hence, can perform many operations simultaneously. A **multi-core processor** implements multiple processors on a single integrated-circuit chip. |
| **Secondary storage unit** | This is the long-term, high-capacity “warehousing” section. Programs or data not actively being used by the other units normally are placed on secondary storage devices until they're again needed. Information on secondary storage devices is **persistent**—it's preserved even when the computer's power is turned off. Examples of secondary storage devices include hard drives, DVD drives and USB flash drives. |

## 1.3 Data Hierarchy
Data items processed by computers form a **data hierarchy** that becomes larger and more complex in structure as we progress from the simplest data items (called “bits”) to richer ones, such as characters and fields.

- **Bits**: The smallest data item in a computer can assume the value 0 or the value 1. It's called a bit (short for "binary digit").
- **Characters**: Digits, letters and special symbols are known as characters. The computer's character set is the set of all the characters used to write programs and represent data items. C supports various character sets, including Unicode which contains characters for many of the world's languages.
- **Fields**: A field is a group of characters or bytes that conveys meaning. For example, a field consisting of uppercase and lowercase letters can be used to represent a person's name.
- **Records**: Several related fields can be used to compose a record. For example, an employee record might consist of fields for ID number, name, address, etc.
- **Files**: A file is a group of related records.
- **Database**: A database is a collection of data organized for easy access and manipulation. The most popular model is the relational database, in which data is stored in simple tables.
- **Big Data**: The amount of data being produced worldwide is enormous and growing quickly. Big data applications deal with massive amounts of data.

| Unit | Bytes | Which is approximately |
|---|---|---|
| 1 kilobyte (KB) | 1024 bytes | 10³ (1024 bytes exactly) |
| 1 megabyte (MB) | 1024 kilobytes | 10⁶ (1,000,000 bytes) |
| 1 gigabyte (GB) | 1024 megabytes | 10⁹ (1,000,000,000 bytes) |
| 1 terabyte (TB) | 1024 gigabytes | 10¹² (1,000,000,000,000 bytes) |
| 1 petabyte (PB) | 1024 terabytes | 10¹⁵ (1,000,000,000,000,000 bytes) |
| 1 exabyte (EB) | 1024 petabytes | 10¹⁸ (1,000,000,000,000,000,000 bytes) |
| 1 zettabyte (ZB) | 1024 exabytes | 10²¹ (1,000,000,000,000,000,000,000 bytes) |

## 1.4 Machine Languages, Assembly Languages and High-Level Languages
Programmers write instructions in various programming languages. These may be divided into three general types:
1.  **Machine languages**: Any computer can directly understand only its own machine language, defined by its hardware design. Machine languages generally consist of strings of numbers (ultimately reduced to 1s and 0s). Such languages are cumbersome for humans.
2.  **Assembly languages**: Programmers began using English-like abbreviations to represent elementary operations. These abbreviations formed the basis of assembly languages. Translator programs called **assemblers** were developed to convert early assembly-language programs to machine language.
3.  **High-level languages**: To speed the programming process, high-level languages were developed in which single statements could be written to accomplish substantial tasks. Translator programs called **compilers** convert high-level language programs into machine language. **Interpreters** execute high-level language programs directly, avoiding compilation but running slower.

## 1.5 The C Programming Language
C evolved from two previous languages, BCPL and B. The C language was evolved from B by Dennis Ritchie at Bell Laboratories and was originally implemented in 1972. C initially became widely known as the development language of the UNIX operating system. Many of today's leading operating systems are written in C and/or C++. C is mostly hardware independent—with careful design, it's possible to write C programs that are portable to most computers.

C is widely used to develop systems that demand performance, such as operating systems, embedded systems, real-time systems and communications systems.

A standard version of C was needed, so a committee was created to develop a standard. The standard was approved in 1989 and updated in 1999 (C99). We also discuss the latest C standard (C11), approved in 2011.

## 1.6 C Standard Library
C programs consist of pieces called functions. You can program all the functions that you need to form a C program, but most C programmers take advantage of the rich collection of existing functions called the **C Standard Library**. This encourages **software reuse**.

## 1.7 C++ and Other C-Based Languages
C++ was developed by Bjarne Stroustrup at Bell Laboratories. It has its roots in C, providing a number of features that “spruce up” the C language. More important, it provides capabilities for **object-oriented programming**.

| Programming language | Description |
|---|---|
| **Objective-C** | An object-oriented language based on C. It has become the key programming language for the OS X operating system and all iOS-powered devices. |
| **Java** | A C++-based object-oriented programming language developed by Sun Microsystems. A key goal of Java is to enable the writing of programs that will run on a broad variety of computer systems. It is also the language of Android app development. |
| **C#** | Microsoft's primary object-oriented language, based on C++ and Java. |
| **PHP** | An object-oriented, open-source scripting language used by millions of websites. |
| **Python** | An object-oriented scripting language developed by Guido van Rossum. |
| **JavaScript** | The most widely used scripting language, primarily used to add dynamic behavior to web pages. |
| **Swift** | Apple's new programming language for developing iOS and Mac apps, announced in 2014. |

## 1.8 Object Technology
Building software quickly, correctly and economically remains an elusive goal. **Objects**, or more precisely the classes objects come from, are essentially reusable software components that model items in the real world.
*   **Methods and Classes**: Performing a task in a program requires a method. The method houses the program statements that actually perform its tasks. In object-oriented programming languages, we create a program unit called a class to house the set of methods that perform the class's tasks.
*   **Instantiation**: You must build an object of a class before a program can perform the tasks that the class's methods define. The process of doing this is called instantiation. An object is an instance of its class.
*   **Reuse**: Reusing existing classes when building new classes and programs saves time and effort.
*   **Messages and Method Calls**: You send messages to an object. Each message is implemented as a method call that tells a method of the object to perform its task.
*   **Attributes and Instance Variables**: An object has attributes that it carries along as it's used in a program. These attributes are specified by the class's instance variables.
*   **Encapsulation and Information Hiding**: Classes encapsulate, i.e., encase, their attributes and methods. Objects may communicate with one another, but they're normally not allowed to know how other objects are implemented—implementation details are hidden.
*   **Inheritance**: A new class of objects can be created conveniently by inheritance—the new class (called the subclass) starts with the characteristics of an existing class (called the superclass), possibly customizing them and adding unique characteristics of its own.

## 1.9 Typical C Program-Development Environment
C systems generally consist of several parts: a program-development environment, the language and the C Standard Library. C programs typically go through six phases to be executed: edit, preprocess, compile, link, load and execute.

1.  **Phase 1: Creating a Program**: You type a C program with an editor and store the program on a secondary storage device. C program filenames should end with the \`.c\` extension.
2.  **Phase 2 & 3: Preprocessing and Compiling a C Program**: The compiler translates the C program into machine-language code (object code). A preprocessor program executes automatically before compilation, obeying special commands called preprocessor directives which indicate manipulations to be performed on the program. A syntax error occurs when the compiler cannot recognize a statement because it violates the rules of the language.
3.  **Phase 4: Linking**: C programs typically contain references to functions defined elsewhere. A linker links the object code with the code for the missing functions to produce an executable image.
4.  **Phase 5: Loading**: Before a program can be executed, it must first be placed in memory. This is done by the loader, which takes the executable image from disk and transfers it to memory.
5.  **Phase 6: Execution**: The computer, under the control of its CPU, executes the program one instruction at a time. Runtime errors (e.g., division by zero) can occur at this stage.

## 1.10 Test-Driving a C Application in Windows, Linux and Mac OS X
This section walks you through compiling and running your first C application—a guess-the-number game—from the command line in Windows, Linux, and Mac OS X.

## 1.11 Operating Systems
**Operating systems** are software systems that make using computers more convenient. The software that contains the core components of the operating system is the **kernel**.
*   **1.11.1 Windows—A Proprietary Operating System**: Developed by Microsoft, it's the world's most widely used operating system.
*   **1.11.2 Linux—An Open-Source Operating System**: Perhaps the greatest success of the open-source movement, popular in servers, personal computers, and embedded systems.
*   **1.11.3 Apple's Mac OS X; Apple's iOS**: Mac OS X is a descendant of NeXTSTEP. iOS is derived from Mac OS X and is used in the iPhone, iPad and iPod Touch devices.
*   **1.11.4 Google's Android**: The fastest growing tablet and smartphone operating system, based on the Linux kernel and Java.

## 1.12 The Internet and World Wide Web
In the late 1960s, ARPA rolled out plans for networking computer systems, which became known as the ARPANET, the precursor to today's Internet. The protocol for communicating over the ARPANET became known as the Transmission Control Protocol (TCP). Later, the Internet Protocol (IP) was developed. The combined set of protocols is now called TCP/IP.

The **World Wide Web** (simply called “the web”) is a collection of hardware and software associated with the Internet that allows computer users to locate and view multimedia-based documents. In 1989, Tim Berners-Lee of CERN began to develop a technology for sharing information via "hyperlinked” text documents, called HyperText Markup Language (HTML), and communication protocols like HyperText Transfer Protocol (HTTP).

## 1.13 Some Key Software Terminology
This section introduces several buzzwords from the software development community.

| Technology | Description |
|---|---|
| Agile software development | A set of methodologies that try to get software implemented faster and using fewer resources. |
| Refactoring | Reworking programs to make them clearer and easier to maintain while preserving their correctness and functionality. |
| Design patterns | Proven architectures for constructing flexible and maintainable object-oriented software. |
| LAMP | An acronym for Linux, Apache, MySQL and PHP (or Perl or Python). |
| Software as a Service (SaaS) | The software runs on servers elsewhere on the Internet and is accessed through a browser. |
| Platform as a Service (PaaS) | Provides a computing platform for developing and running applications as a service over the web. |
| Cloud computing | Using software and data stored in the “cloud”—i.e., accessed on remote computers via the Internet. |
| Software Development Kit (SDK) | Includes the tools and documentation developers use to program applications. |

Software products typically go through release stages:
- **Alpha**: Earliest release, often buggy and incomplete.
- **Beta**: More stable, released to a larger number of developers.
- **Release candidates**: Generally feature complete and bug free, ready for community testing.
- **Final release**: The product is released to the general public.
- **Continuous beta**: Hosted in the cloud and constantly evolving without version numbers.

## 1.14 Keeping Up-to-Date with Information Technologies
This section lists key technical and business publications that will help you stay up-to-date with the latest news and trends and technology. You can also find a growing list of Internet- and web-related Resource Centers at www.deitel.com/ResourceCenters.html.
`,zh:`
# 1. 電腦、網際網路與全球資訊網簡介

## 1.1 簡介
歡迎學習 C 和 C++！C 是一種簡潔而強大的電腦程式語言，適合幾乎沒有或完全沒有程式設計經驗的技術導向人士，也適合經驗豐富的程式設計師用來建構大型軟體系統。《C 語言程式設計》第八版是適合這兩類讀者的有效學習工具。

本書的核心是透過在 C 中經過驗證的結構化程式設計方法論和在 C++ 中的物件導向程式設計來強調軟體工程。本書呈現了數百個完整的、可運行的程式，並展示了這些程式在電腦上運行時產生的輸出。我們稱之為「實時代碼方法」(live-code approach)。所有這些範例程式都可以從我們的網站 www.deitel.com/books/chtp8/ 下載。

大多數人都熟悉電腦執行的令人興奮的任務。透過本教科書，您將學習如何命令電腦執行這些任務。是軟體（也就是您編寫來命令電腦執行動作和做出決策的指令）控制著電腦（通常稱為硬體）。

## 1.2 硬體與軟體
電腦執行計算和做出邏輯決策的速度遠超人類。今日許多個人電腦每秒可執行數十億次計算——比一個人一生中能執行的還多。超級電腦每秒已經可以執行數千兆次（千兆）的指令！中國國防科技大學的天河二號超級電腦每秒可執行超過 33 千兆次計算（33.86 petaflops）！換個角度看，天河二號超級電腦一秒鐘內可以為地球上每個人執行約 300 萬次計算！而超級計算的「上限」正在迅速增長。

電腦在稱為**電腦程式**的指令序列控制下處理資料。這些軟體程式引導電腦完成由稱為**電腦程式設計師**的人所指定的有序動作。

電腦由各種稱為**硬體**的設備組成（例如，鍵盤、螢幕、滑鼠、硬碟、記憶體、DVD 光碟機和處理單元）。由於硬體和軟體技術的快速發展，計算成本正在急劇下降。幾十年前可能佔滿大房間、耗資數百萬美元的電腦，現在被刻在比指甲還小的矽晶片上，成本可能只需幾美元。諷刺的是，矽是地球上最豐富的材料之一——它是普通沙子的一種成分。矽晶片技術使計算變得如此經濟，以至於電腦已成為一種商品。

### 1.2.1 摩爾定律
每年，您可能都預期大多數產品和服務的價格至少會上漲一點。但在電腦和通訊領域，情況恰恰相反，特別是在支援這些技術的硬體方面。幾十年來，硬體成本一直在迅速下降。

每一兩年，電腦的容量大約會以低廉的成本翻倍。這個顯著的趨勢通常被稱為**摩爾定律**，以在 1960 年代提出此說法的高登·摩爾（英特爾共同創辦人）命名。摩爾定律及其相關觀察特別適用於電腦用於程式的記憶體數量、用於長期儲存程式和資料的輔助儲存（如磁碟儲存）容量，以及它們的處理器速度——即它們執行程式的速度。

類似的增長也發生在通訊領域——由於對通訊頻寬（即資訊承載能力）的巨大需求吸引了激烈的競爭，成本已大幅下降。我們不知道還有哪個領域的技術進步如此之快，成本下降如此之迅速。這種驚人的進步確實在促進資訊革命。

### 1.2.2 電腦組織
無論外觀如何不同，電腦都可以被看作是劃分為各種邏輯單元或部分。

| 邏輯單元 | 描述 |
|---|---|
| **輸入單元** | 這個「接收」部分從輸入設備獲取資訊（資料和電腦程式），並將其提供給其他單元進行處理。大多數使用者輸入是透過鍵盤、觸控螢幕和滑鼠設備輸入電腦的。其他輸入形式包括接收語音命令、掃描圖像和條碼、從輔助儲存設備（如硬碟、DVD、藍光光碟機和 USB 隨身碟）讀取、從網路攝影機接收影片，以及讓您的電腦從網際網路接收資訊（例如，當您從 YouTube® 串流影片或從 Amazon 下載電子書時）。較新的輸入形式包括來自 GPS 設備的位置資料，以及來自智慧型手機或遊戲控制器中加速度計的運動和方向資訊。 |
| **輸出單元** | 這個「輸送」部分將電腦處理過的資訊放置在各種輸出設備上，以供電腦外部使用。今日從電腦輸出的資訊大多顯示在螢幕上（包括觸控螢幕）、印在紙上、作為音訊或影片播放、顯示在體育場館的巨型螢幕上、透過網際網路傳輸，或用於控制其他設備，如機器人和「智慧」家電。資訊也通常輸出到輔助儲存設備。 |
| **記憶體單元** | 這個快速存取、容量相對較低的「倉庫」部分保留透過輸入單元輸入的資訊，使其在需要時能立即用於處理。記憶體單元也保留處理過的資訊，直到可以將其放置在輸出設備上。記憶體單元中的資訊是易失性的——當電腦電源關閉時，它通常會遺失。記憶體單元通常被稱為記憶體、**主記憶體**或 RAM (隨機存取記憶體)。 |
| **算術與邏輯單元 (ALU)** | 這個「製造」部分執行計算，如加、減、乘、除。它還包含決策機制，允許電腦比較記憶體單元中的兩個項目以確定它們是否相等。 |
| **中央處理單元 (CPU)** | 這個「行政」部分協調和監督其他部分的運作。CPU 告訴輸入單元何時應將資訊讀入記憶體單元，告訴 ALU 何時應使用記憶體單元中的資訊進行計算，並告訴輸出單元何時應將資訊從記憶體單元發送到某些輸出設備。今日許多電腦有多個 CPU，因此可以同時執行許多操作。**多核心處理器**在單一積體電路晶片上實現多個處理器。 |
| **輔助儲存單元** | 這是長期、高容量的「倉儲」部分。其他單元不活躍使用的程式或資料通常被放置在輔助儲存設備上，直到再次需要它們。輔助儲存設備上的資訊是**持久的**——即使電腦電源關閉，它也會被保留下來。輔助儲存設備的例子包括硬碟、DVD 光碟機和 USB 隨身碟。 |

## 1.3 資料階層
由電腦處理的資料項目形成一個**資料階層**，隨著我們從最簡單的資料項目（稱為「位元」）進展到更豐富的項目（如字元和欄位），其結構變得更大、更複雜。

- **位元 (Bits)**：電腦中最小的資料項目，可以取值 0 或 1。它被稱為位元（「二進位數字」的縮寫）。
- **字元 (Characters)**：數字、字母和特殊符號被稱為字元。電腦的字元集是所有用於編寫程式和表示資料項目的字元集合。C 語言支援多種字元集，包括包含世界多種語言字元的 Unicode。
- **欄位 (Fields)**：欄位是一組傳達意義的字元或位元組。例如，由大小寫字母組成的欄位可用於表示一個人的名字。
- **記錄 (Records)**：幾個相關的欄位可以組成一個記錄。例如，一個員工記錄可能包含員工 ID、姓名、地址等欄位。
- **檔案 (Files)**：檔案是一組相關的記錄。
- **資料庫 (Database)**：資料庫是為方便存取和操作而組織的資料集合。最流行的模型是關聯式資料庫，其中資料儲存在簡單的表格中。
- **大數據 (Big Data)**：全球範圍內產生的資料量是巨大的，並且正在迅速增長。大數據應用程式處理大量的資料。

| 單位 | 位元組 | 大約是 |
|---|---|---|
| 1 千位元組 (KB) | 1024 bytes | 10³ (正好 1024 bytes) |
| 1 百萬位元組 (MB) | 1024 kilobytes | 10⁶ (1,000,000 bytes) |
| 1 十億位元組 (GB) | 1024 megabytes | 10⁹ (1,000,000,000 bytes) |
| 1 兆位元組 (TB) | 1024 gigabytes | 10¹² (1,000,000,000,000 bytes) |
| 1 千兆位元組 (PB) | 1024 terabytes | 10¹⁵ (1,000,000,000,000,000 bytes) |
| 1 百京位元組 (EB) | 1024 petabytes | 10¹⁸ (1,000,000,000,000,000,000 bytes) |
| 1 十垓位元組 (ZB) | 1024 exabytes | 10²¹ (1,000,000,000,000,000,000,000 bytes) |

## 1.4 機器語言、組合語言與高階語言
程式設計師使用各種程式語言編寫指令。這些語言可分為三種類型：
1.  **機器語言**：任何電腦只能直接理解其自身的機器語言，由其硬體設計定義。機器語言通常由數字串（最終簡化為 1 和 0）組成。這種語言對人類來說很麻煩。
2.  **組合語言**：程式設計師開始使用類似英語的縮寫來表示基本操作。這些縮寫構成了組合語言的基礎。稱為**組譯器**的翻譯程式被開發出來，用於將早期的組合語言程式轉換為機器語言。
3.  **高階語言**：為了加快程式設計過程，開發了高階語言，其中單一陳述式可以完成大量任務。稱為**編譯器**的翻譯程式將高階語言程式轉換為機器語言。**直譯器**則直接執行高階語言程式，避免了編譯過程，但運行速度較慢。

## 1.5 C 程式語言
C 語言從 BCPL 和 B 這兩種早期的語言演變而來。C 語言由丹尼斯·里奇在貝爾實驗室開發，並於 1972 年首次實現。C 最初作為 UNIX 作業系統的開發語言而廣為人知。今日許多領先的作業系統都是用 C 和/或 C++ 編寫的。C 語言基本上與硬體無關——透過精心設計，可以編寫可移植到大多數電腦上的 C 程式。

C 語言廣泛用於開發需要高性能的系統，例如作業系統、嵌入式系統、即時系統和通訊系統。

為了需要一個標準版本的 C，一個委員會被創建來開發一個標準。該標準於 1989 年被批准，並於 1999 年更新 (C99)。我們也討論了 2011 年批准的最新 C 標準 (C11)。

## 1.6 C 標準函式庫
C 程式由稱為函式的功能塊組成。您可以編寫所有需要的函式來組成一個 C 程式，但大多數 C 程式設計師都會利用一個豐富的現有函式集合，稱為**C 標準函式庫**。這鼓勵了**軟體重用**。

## 1.7 C++ 與其他基於 C 的語言
C++ 由 Bjarne Stroustrup 在貝爾實驗室開發。它植根於 C，提供了一些「美化」C 語言的功能。更重要的是，它提供了**物件導向程式設計**的能力。

| 程式語言 | 描述 |
|---|---|
| **Objective-C** | 一種基於 C 的物件導向語言。它已成為 OS X 作業系統和所有 iOS 設備的關鍵程式語言。 |
| **Java** | 由 Sun Microsystems 開發的基於 C++ 的物件導向程式語言。Java 的一個關鍵目標是能夠編寫可在各種電腦系統上運行的程式。它也是 Android 應用程式開發的語言。 |
| **C#** | 微軟的主要物件導向語言，基於 C++ 和 Java。 |
| **PHP** | 一種物件導向的開源腳本語言，被數百萬個網站使用。 |
| **Python** | 由 Guido van Rossum 開發的物件導向腳本語言。 |
| **JavaScript** | 使用最廣泛的腳本語言，主要用於為網頁添加動態行為。 |
| **Swift** | 蘋果公司於 2014 年宣布的用於開發 iOS 和 Mac 應用的新程式語言。 |

## 1.8 物件技術
快速、正確且經濟地建構軟體仍然是一個難以實現的目標。**物件**，或更準確地說，物件所來自的類別，本質上是可重用的軟體組件，用於模擬現實世界中的事物。
*   **方法與類別**：在程式中執行一項任務需要一個方法。方法容納了實際執行其任務的程式陳述式。在物件導向程式語言中，我們創建一個稱為類別的程式單元來容納執行該類別任務的方法集合。
*   **實例化**：在程式可以執行類別方法定義的任務之前，您必須從該類別建立一個物件。這個過程稱為實例化。物件是其類別的一個實例。
*   **重用**：在建構新類別和程式時重用現有類別可以節省時間和精力。
*   **訊息與方法呼叫**：您向物件發送訊息。每個訊息都實現為一個方法呼叫，它告訴物件的某個方法去執行其任務。
*   **屬性與實例變數**：物件在使用過程中帶有其屬性。這些屬性由類別的實例變數指定。
*   **封裝與資訊隱藏**：類別封裝，即包裹其屬性和方法。物件可以相互通訊，但通常不允許知道其他物件是如何實現的——實作細節被隱藏起來。
*   **繼承**：可以透過繼承方便地創建一個新的物件類別——新類別（稱為子類別）從一個現有類別（稱為父類別）的特性開始，可能會客製化它們並添加自己獨特的特性。

## 1.9 典型的 C 程式開發環境
C 系統通常由幾個部分組成：程式開發環境、語言和 C 標準函式庫。C 程式通常經過六個階段才能執行：編輯、前置處理、編譯、連結、載入和執行。

1.  **階段 1：創建程式**：您使用編輯器輸入 C 程式，並將程式儲存在輔助儲存設備上。C 程式檔案名應以 \`.c\` 副檔名結尾。
2.  **階段 2 & 3：前置處理與編譯 C 程式**：編譯器將 C 程式轉譯成機器語言程式碼（目的碼）。一個前置處理器程式在編譯前自動執行，遵循稱為前置處理器指令的特殊命令，這些指令指示要對程式執行的操作。當編譯器無法識別某個陳述式時，會發生語法錯誤，因為它違反了語言規則。
3.  **階段 4：連結**：C 程式通常包含對在其他地方定義的函式的引用。連結器將目的碼與缺失函式的程式碼（例如，來自標準函式庫）連結起來，產生可執行映像檔。
4.  **階段 5：載入**：在程式可以執行之前，它必須首先被放置在記憶體中。這由載入器完成，它將可執行映像檔從磁碟中取出並傳輸到記憶體中。
5.  **階段 6：執行**：電腦在其 CPU 的控制下，逐一執行程式的指令。此階段可能發生執行時錯誤（例如，除以零）。

## 1.10 試駕一個 C 應用程式
本節將引導您在 Windows、Linux 和 Mac OS X 的命令列中編譯和運行您的第一個 C 應用程式——一個猜數字遊戲。

## 1.11 作業系統
**作業系統** (OS) 是使電腦使用更方便的軟體系統。作業系統的核心組件所在的軟體是**核心 (kernel)**。
*   **1.11.1 Windows——專有作業系統**：由微軟開發，是世界上使用最廣泛的作業系統。
*   **1.11.2 Linux——開源作業系統**：可能是開源運動的最大成功，在伺服器、個人電腦和嵌入式系統中廣受歡迎。
*   **1.11.3 蘋果的 Mac OS X；蘋果的 iOS**：Mac OS X 是 NeXTSTEP 的後代。iOS 源自 Mac OS X，用於 iPhone、iPad 和 iPod Touch 設備。
*   **1.11.4 Google 的 Android**：增長最快的平板電腦和智慧型手機作業系統，基於 Linux 核心和 Java。

## 1.12 網際網路與全球資訊網
網際網路的前身是 ARPANET，於 1960 年代後期開發。管理網際網路通訊的協定集合是 TCP/IP。**全球資訊網**（簡稱「網路」）是與網際網路相關的硬體和軟體集合，允許電腦使用者定位和查看基於多媒體的文件。1989 年，CERN 的提姆·柏內茲-李開始開發一種透過「超連結」文本文件共享資訊的技術，稱為超文本標記語言 (HTML)，以及像超文本傳輸協定 (HTTP) 這樣的通訊協定。

## 1.13 一些關鍵軟體術語
本節介紹軟體開發社群中的幾個流行語。

| 技術 | 描述 |
|---|---|
| 敏捷軟體開發 | 一套旨在更快、使用更少資源實現軟體的方法論。 |
| 重構 | 在保持其正確性和功能的同時，重新設計程式，使其更清晰、更易於維護。 |
| 設計模式 | 用於建構靈活且可維護的物件導向軟體的成熟架構。 |
| LAMP | Linux、Apache、MySQL 和 PHP（或 Perl 或 Python）的縮寫。 |
| 軟體即服務 (SaaS) | 軟體在網際網路上的其他伺服器上運行，並透過瀏覽器存取。 |
| 平台即服務 (PaaS) | 透過網路提供用於開發和運行應用程式的計算平台作為服務。 |
| 雲端運算 | 使用儲存在「雲端」中的軟體和資料——即透過網際網路在遠端電腦上存取。 |
| 軟體開發套件 (SDK) | 包括開發人員用來編寫應用程式的工具和文件。 |

軟體產品通常會經歷以下發布階段：
- **Alpha**：最早的發行版，通常充滿錯誤且不完整。
- **Beta**：更穩定，發布給更多的開發人員。
- **發行候選版 (Release candidates)**：通常功能完整且無錯誤，準備好進行社群測試。
- **最終版 (Final release)**：產品向公眾發布。
- **持續 Beta (Continuous beta)**：託管在雲端並不斷演進，沒有版本號。

## 1.14 隨時掌握資訊技術的最新動態
本節列出了一些關鍵的技術和商業出版物，以幫助您隨時了解最新的新聞、趨勢和技術。您也可以在 www.deitel.com/ResourceCenters.html 找到一個不斷增長的網際網路和網路相關資源中心列表。
`},l={en:'\n# 2. Introduction to C Programming\n\nIn this chapter we introduce C programming and present several examples that illustrate many important features of C. Each example is analyzed one statement at a time. In Chapters 3 and 4 we present an introduction to structured programming in C. We then use the structured approach throughout the remainder of the C portion of the text. We provide the first of many “Secure C Programming" sections.\n\n## 2.1 Introduction\nThe C language facilitates a structured and disciplined approach to computer-program design. In this chapter we introduce C programming and present several examples that illustrate many important features of C. Each example is analyzed one statement at a time. In Chapters 3 and 4 we present an introduction to structured programming in C. We then use the structured approach throughout the remainder of the C portion of the text. We provide the first of many “Secure C Programming" sections.\n\n## 2.2 A Simple C Program: Printing a Line of Text\nC uses some notations that may appear strange to people who have not programmed computers. We begin by considering a simple C program. Our first example prints a line of text. The program and its screen output are shown in Fig. 2.1.\n\n```c\n// Fig. 2.1: fig02_01.c\n// A first program in C.\n#include <stdio.h>\n\n// function main begins program execution\nint main( void )\n{\n    printf( "Welcome to C!\\n" );\n} // end function main\n```\n\n### Comments\nEven though this program is simple, it illustrates several important features of the C language. Lines 1 and 2 begin with `//`, indicating that these two lines are comments. You insert comments to document programs and improve program readability. Comments do not cause the computer to perform any action when the program is run—they’re ignored by the C compiler and do not cause any machine-language object code to be generated. You can also use `/*...*/` multi-line comments. We prefer `//` comments because they\'re shorter and they eliminate common programming errors that occur with `/*...*/` comments, especially when the closing `*/` is omitted.\n\n### #include Preprocessor Directive\nLine 3, `#include <stdio.h>`, is a directive to the C preprocessor. Lines beginning with `#` are processed by the preprocessor before compilation. Line 3 tells the preprocessor to include the contents of the standard input/output header (<stdio.h>) in the program. This header contains information used by the compiler when compiling calls to standard input/output library functions such as `printf`.\n\n### Blank Lines and White Space\nLine 4 is simply a blank line. You use blank lines, space characters and tab characters (i.e., "tabs") to make programs easier to read. Together, these characters are known as white space. White-space characters are normally ignored by the compiler.\n\n### The main Function\nLine 6, `int main(void)`, is a part of every C program. The parentheses after `main` indicate that `main` is a program building block called a function. C programs contain one or more functions, one of which must be `main`. Every program in C begins executing at the function `main`. Functions can return information. The keyword `int` to the left of main indicates that main “returns” an integer (whole-number) value. Functions also can receive information. The `void` in parentheses here means that `main` does not receive any information.\n\n> **Good Programming Practice 2.1**\n> Every function should be preceded by a comment describing the function’s purpose.\n\nA left brace, `{`, begins the body of every function (line 7). A corresponding right brace ends each function (line 9). This pair of braces and the portion of the program between the braces is called a block.\n\n### An Output Statement\nLine 8, `printf( "Welcome to C!\\n" );`, instructs the computer to perform an action, namely to print on the screen the string of characters marked by the quotation marks. A string is sometimes called a character string, a message or a literal. The entire line, including the `printf` function, its argument, and the semicolon (`;`), is called a statement. Every statement must end with a semicolon.\n\n### Escape Sequences\nNotice that the characters `\\n` were not printed on the screen. The backslash (`\\`) is called an escape character. It indicates that `printf` is supposed to do something out of the ordinary. When encountering a backslash, the compiler looks ahead at the next character to form an escape sequence. `\\n` means newline.\n\n| Escape sequence | Description |\n|---|---|\n| `\\n` | Newline. Position the cursor to the beginning of the next line. |\n| `\\t` | Horizontal tab. Move the cursor to the next tab stop. |\n| `\\a` | Alert. Produces a sound or visible alert. |\n| `\\\\` | Backslash. Insert a backslash character in a string. |\n| `\\"` | Double quote. Insert a double-quote character in a string. |\n\n### The Linker and Executables\nStandard library functions like `printf` and `scanf` are not part of the C programming language. When the compiler compiles a `printf` statement, it merely provides space in the object program for a "call" to the library function. The linker locates the library functions and inserts the proper calls to these library functions in the object program. The linked program is called an executable.\n\n## 2.3 Another Simple C Program: Adding Two Integers\nOur next program uses the Standard Library function `scanf` to obtain two integers typed by a user, computes the sum, and prints the result.\n\n```c\n// Fig. 2.5: fig02_05.c\n// Addition program.\n#include <stdio.h>\n\n// function main begins program execution\nint main( void )\n{\n    int integer1; // first number to be entered by user\n    int integer2; // second number to be entered by user\n    int sum; // variable in which sum will be stored\n\n    printf("Enter first integer\\n" ); // prompt\n    scanf("%d", &integer1); // read an integer\n\n    printf("Enter second integer\\n"); // prompt\n    scanf("%d", &integer2); // read an integer\n\n    sum = integer1 + integer2; // assign total to sum\n    printf( "Sum is %d\\n", sum); // print sum\n} // end function main\n```\n\n### Variables and Variable Definitions\nThe names `integer1`, `integer2`, and `sum` are variables—locations in memory where values can be stored. These definitions specify that the variables are of type `int`, meaning they\'ll hold integer values. All variables must be defined with a name and a data type before they can be used. A variable name in C can be any valid identifier (a series of letters, digits and underscores that does not begin with a digit). C is case sensitive.\n\n### The scanf Function and Formatted Inputs\nThe `scanf` function obtains a value from the user. It has two arguments, `"%d"` and `&integer1`. The first, the format control string, indicates the type of data that should be entered. The `%d` conversion specifier indicates an integer. The second argument begins with an ampersand (`&`)—the address operator. It tells `scanf` the location in memory where the variable `integer1` is stored.\n\n### Assignment Statement\nThe assignment statement `sum = integer1 + integer2;` calculates the total and assigns the result to `sum` using the assignment operator `=`.\n\n## 2.4 Memory Concepts\nVariable names such as `integer1`, `integer2` and `sum` actually correspond to locations in the computer\'s memory. Every variable has a name, a type and a value. When a value is placed in a memory location, it replaces the previous value; this is called a destructive process. When a value is read from memory, the process is said to be nondestructive.\n\n## 2.5 Arithmetic in C\nMost C programs perform calculations using the C arithmetic operators.\n\n| C operation | Arithmetic operator | Algebraic expression | C expression |\n|---|---|---|---|\n| Addition | `+` | f + 7 | `f + 7` |\n| Subtraction | `-` | p - c | `p - c` |\n| Multiplication | `*` | bm | `b * m` |\n| Division | `/` | x/y or x ÷ y | `x / y` |\n| Remainder | `%` | r mod s | `r % s` |\n\n### Rules of Operator Precedence\nC applies operators in arithmetic expressions in a precise sequence determined by the rules of operator precedence.\n1.  **Parentheses**: Evaluated first.\n2.  **Multiplication, division, and remainder**: Evaluated second, from left to right.\n3.  **Addition and subtraction**: Evaluated third, from left to right.\n4.  **Assignment**: Evaluated last.\n\n## 2.6 Decision Making: Equality and Relational Operators\nThe `if` statement allows a program to make a decision based on the truth or falsity of a condition. Conditions are formed using equality operators (`==`, `!=`) and relational operators (`>`, `<`, `>=`, `<=`).\n\n```c\n// Fig. 2.13: fig02_13.c\n// Using if statements, relational operators, and equality operators.\n#include <stdio.h>\n\nint main( void )\n{\n    int num1; // first number to be read from user\n    int num2; // second number to be read from user\n\n    printf("Enter two integers, and I will tell you\\n");\n    printf("the relationships they satisfy: ");\n    scanf("%d %d", &num1, &num2); // read two integers\n\n    if ( num1 == num2 ) {\n        printf("%d is equal to %d\\n", num1, num2 );\n    }\n    if ( num1 != num2 ) {\n        printf("%d is not equal to %d\\n", num1, num2 );\n    }\n    if ( num1 < num2 ) {\n        printf("%d is less than %d\\n", num1, num2);\n    }\n    if ( num1 > num2 ) {\n        printf("%d is greater than %d\\n", num1, num2);\n    }\n    if ( num1 <= num2 ) {\n        printf("%d is less than or equal to %d\\n", num1, num2);\n    }\n    if ( num1 >= num2 ) {\n        printf("%d is greater than or equal to %d\\n", num1, num2 );\n    }\n}\n```\n\n## 2.7 Secure C Programming\nThe words we\'ve used in C programs—in particular `int`, `if` and `void`—are keywords or reserved words of the language. They have special meaning to the compiler and cannot be used as identifiers.\n\n### Avoid Single-Argument printfs\nOne guideline is to avoid using `printf` with a single string argument. If you need to display a string that terminates with a newline, use the `puts` function. If you need to display a string without a terminating newline character, use `printf` with two arguments—a `"%s"` format control string and the string to display.\n\n',zh:'\n# 第二章：C 語言程式設計入門\n\n本章我們介紹 C 程式設計，並提供幾個範例來說明 C 的許多重要特性。每個範例都將逐一分析其陳述式。在第三章和第四章中，我們將介紹 C 的結構化程式設計。接著，我們將在本書 C 語言部分的其餘內容中持續使用結構化方法。我們也提供了許多「安全 C 程式設計」章節中的第一個。\n\n## 2.1 簡介\nC 語言有助於採用結構化且有紀律的方法來設計電腦程式。本章我們介紹 C 程式設計，並提供幾個範例來說明 C 的許多重要特性。每個範例都將逐一分析其陳述式。在第三章和第四章中，我們將介紹 C 的結構化程式設計。接著，我們將在本書 C 語言部分的其餘內容中持續使用結構化方法。我們也提供了許多「安全 C 程式設計」章節中的第一個。\n\n## 2.2 一個簡單的 C 程式：印出一行文字\nC 語言使用一些對於未曾編寫過電腦程式的人來說可能顯得陌生的符號。我們從一個簡單的 C 程式開始。我們的第一個範例印出一行文字。程式及其螢幕輸出顯示在圖 2.1 中。\n\n```c\n// 圖 2.1: fig02_01.c\n// 第一個 C 程式。\n#include <stdio.h>\n\n// main 函式開始程式執行\nint main( void )\n{\n    printf( "Welcome to C!\\n" );\n} // main 函式結束\n```\n\n### 註解\n儘管這個程式很簡單，它卻展示了 C 語言的幾個重要特性。第 1 行和第 2 行以 `//` 開頭，表示這兩行是註解。您插入註解是為了記錄程式並提高程式的可讀性。註解不會在程式運行時讓電腦執行任何動作——它們會被 C 編譯器忽略，且不會產生任何機器語言目的碼。您也可以使用 `/*...*/` 多行註解。我們偏好使用 `//` 註解，因為它們更短，並且能消除使用 `/*...*/` 註解時常見的程式設計錯誤，特別是當結尾的 `*/` 被省略時。\n\n### #include 前置處理器指令\n第 3 行，`#include <stdio.h>`，是給 C 前置處理器的指令。以 `#` 開頭的行在編譯前由前置處理器處理。第 3 行告訴前置處理器將標準輸入/輸出標頭檔（<stdio.h>）的內容包含到程式中。這個標頭檔包含了編譯器在編譯對標準輸入/輸出函式庫（如 `printf`）的呼叫時所使用的資訊。\n\n### 空白行與空白字元\n第 4 行只是一個空白行。您可以使用空白行、空格字元和定位字元（即「tabs」）來使程式更容易閱讀。這些字元統稱為空白字元。空白字元通常會被編譯器忽略。\n\n### main 函式\n第 6 行，`int main(void)`，是每個 C 程式的一部分。`main` 後面的括號表示 `main` 是一個稱為函式的程式建構塊。C 程式包含一個或多個函式，其中之一必須是 `main`。C 語言的每個程式都從 `main` 函式開始執行。函式可以回傳資訊。`main` 左邊的關鍵字 `int` 表示 `main`「回傳」一個整數值。函式也可以接收資訊。這裡括號中的 `void` 表示 `main` 不接收任何資訊。\n\n> **良好程式設計實踐 2.1**\n> 每個函式前都應該有註解描述其目的。\n\n左大括號 `{` 開始每個函式的主體（第 7 行）。對應的右大括號結束每個函式（第 9 行）。這對大括號及其之間的程式部分稱為一個區塊。\n\n### 一個輸出陳述式\n第 8 行，`printf( "Welcome to C!\\n" );`，指示電腦執行一個動作，即在螢幕上印出由引號標記的字元串。字串有時被稱為字元串、訊息或字面值。整行，包括 `printf` 函式、其參數以及分號（`；`），稱為一個陳述式。每個陳述式都必須以分號結尾。\n\n### 逸出序列\n請注意，字元 `\\n` 並沒有被印在螢幕上。反斜線（`\\`）稱為逸出字元。它表示 `printf` 應該做一些不尋常的事情。當遇到反斜線時，編譯器會查看下一個字元以形成一個逸出序列。`\\n` 表示換行。\n\n| 逸出序列 | 描述 |\n|---|---|\n| `\\n` | 換行。將游標定位到下一行的開頭。 |\n| `\\t` | 水平定位字元。將游標移動到下一個定位點。 |\n| `\\a` | 警告。產生聲音或可見的警示。 |\n| `\\\\` | 反斜線。在字串中插入一個反斜線字元。 |\n| `\\"` | 雙引號。在字串中插入一個雙引號字元。 |\n\n### 連結器與可執行檔\n標準函式庫函式如 `printf` 和 `scanf` 並不是 C 程式語言的一部分。當編譯器編譯一個 `printf` 陳述式時，它僅在目的程式中為呼叫該函式庫函式預留空間。連結器會找到這些函式庫函式，並在目的程式中插入對這些函式的正確呼叫。連結後的程式稱為可執行檔。\n\n## 2.3 另一個簡單的 C 程式：兩數相加\n我們的下一個程式使用標準函式庫的 `scanf` 函式來獲取使用者輸入的兩個整數，計算它們的和，並印出結果。\n\n```c\n// 圖 2.5: fig02_05.c\n// 加法程式。\n#include <stdio.h>\n\n// main 函式開始程式執行\nint main( void )\n{\n    int integer1; // 使用者要輸入的第一個數字\n    int integer2; // 使用者要輸入的第二個數字\n    int sum; // 將儲存總和的變數\n\n    printf("Enter first integer\\n" ); // 提示\n    scanf("%d", &integer1); // 讀取一個整數\n\n    printf("Enter second integer\\n"); // 提示\n    scanf("%d", &integer2); // 讀取一個整數\n\n    sum = integer1 + integer2; // 將總和賦值給 sum\n    printf( "Sum is %d\\n", sum); // 印出總和\n} // main 函式結束\n```\n\n### 變數與變數定義\n名稱 `integer1`、`integer2` 和 `sum` 是變數——記憶體中可以儲存值的位置。這些定義指定這些變數的類型為 `int`，表示它們將儲存整數值。所有變數在使用前都必須用名稱和資料類型進行定義。C 語言中的變數名稱可以是任何有效的識別碼（由字母、數字和底線組成且不以數字開頭的序列）。C 語言區分大小寫。\n\n### scanf 函式與格式化輸入\n`scanf` 函式從使用者那裡獲取一個值。它有兩個參數，`"%d"` 和 `&integer1`。第一個，格式控制字串，指示應該輸入的資料類型。`%d` 轉換說明符表示整數。第二個參數以 `&`（位址運算子）開頭。它告訴 `scanf` 變數 `integer1` 在記憶體中的儲存位置。\n\n### 賦值陳述式\n賦值陳述式 `sum = integer1 + integer2;` 計算總和並使用賦值運算子 `=` 將結果賦給 `sum`。\n\n## 2.4 記憶體概念\n變數名稱如 `integer1`、`integer2` 和 `sum` 實際上對應於電腦記憶體中的位置。每個變數都有一個名稱、一個類型和一個值。當一個值被放入記憶體位置時，它會取代之前的值；這稱為破壞性過程。當從記憶體中讀取一個值時，該過程被稱為非破壞性的。\n\n## 2.5 C 語言的算術運算\n大多數 C 程式使用 C 算術運算子進行計算。\n\n| C 運算 | 算術運算子 | 代數表達式 | C 表達式 |\n|---|---|---|---|\n| 加法 | `+` | f + 7 | `f + 7` |\n| 減法 | `-` | p - c | `p - c` |\n| 乘法 | `*` | bm | `b * m` |\n| 除法 | `/` | x/y 或 x ÷ y | `x / y` |\n| 餘數 | `%` | r mod s | `r % s` |\n\n### 運算子優先順序規則\nC 語言按照運算子優先順序規則的精確順序來應用算術表達式中的運算子。\n1.  **括號**：最先計算。\n2.  **乘法、除法和餘數**：第二順位，由左至右計算。\n3.  **加法和減法**：第三順位，由左至右計算。\n4.  **賦值**：最後計算。\n\n## 2.6 決策：相等與關係運算子\n`if` 陳述式允許程式根據條件的真假來做出決策。條件是使用相等運算子（`==`、`!=`）和關係運算子（`>`、`<`、`>=`、`<=`）形成的。\n\n```c\n// 圖 2.13: fig02_13.c\n// 使用 if 陳述式、關係運算子和相等運算子。\n#include <stdio.h>\n\nint main( void )\n{\n    int num1; // 從使用者讀取的第一個數字\n    int num2; // 從使用者讀取的第二個數字\n\n    printf("Enter two integers, and I will tell you\\n");\n    printf("the relationships they satisfy: ");\n    scanf("%d %d", &num1, &num2); // 讀取兩個整數\n\n    if ( num1 == num2 ) {\n        printf("%d is equal to %d\\n", num1, num2 );\n    }\n    if ( num1 != num2 ) {\n        printf("%d is not equal to %d\\n", num1, num2 );\n    }\n    if ( num1 < num2 ) {\n        printf("%d is less than %d\\n", num1, num2);\n    }\n    if ( num1 > num2 ) {\n        printf("%d is greater than %d\\n", num1, num2);\n    }\n    if ( num1 <= num2 ) {\n        printf("%d is less than or equal to %d\\n", num1, num2);\n    }\n    if ( num1 >= num2 ) {\n        printf("%d is greater than or equal to %d\\n", num1, num2 );\n    }\n}\n```\n\n## 2.7 安全的 C 程式設計\n我們在 C 程式中使用的詞彙——特別是 `int`、`if` 和 `void`——是該語言的關鍵字或保留字。它們對編譯器有特殊意義，不能用作識別碼。\n\n### 避免單一參數的 printf\n一個指導原則是避免使用帶有單一字串參數的 `printf`。如果您需要顯示以換行符結尾的字串，請使用 `puts` 函式。如果您需要顯示不帶終止換行符的字串，請使用帶有兩個參數的 `printf`——一個 `"%s"` 格式控制字串和要顯示的字串。\n\n'},c={en:`
# 3. Structured Program Development in C

## Objectives
In this chapter, you'll:
- Use basic problem-solving techniques.
- Develop algorithms through the process of top-down, stepwise refinement.
- Use the if selection statement and the if...else selection statement to select actions.
- Use the while iteration statement to execute statements in a program repeatedly.
- Use counter-controlled iteration and sentinel-controlled iteration.
- Learn structured programming.
- Use increment, decrement and assignment operators.

## 3.1 Introduction
Before writing a program to solve a particular problem, we must have a thorough understanding of the problem and a carefully planned solution approach. Chapters 3 and 4 discuss techniques that facilitate the development of structured computer programs. In Section 4.12, we present a summary of the structured programming techniques developed here and in Chapter 4.

## 3.2 Algorithms
The solution to any computing problem involves executing a series of actions in a specific order. A procedure for solving a problem in terms of
1. the actions to be executed, and
2. the order in which these actions are to be executed
is called an algorithm. The following example demonstrates that correctly specifying the order in which the actions are to be executed is important.
Consider the “rise-and-shine algorithm” followed by one junior executive for getting out of bed and going to work: (1) Get out of bed, (2) take off pajamas, (3) take a shower, (4) get dressed, (5) eat breakfast, (6) carpool to work. This routine gets the executive to work well prepared to make critical decisions. Suppose that the same steps are performed in a slightly different order: (1) Get out of bed, (2) take off pajamas, (3) get dressed, (4) take a shower, (5) eat breakfast, (6) carpool to work. In this case, our junior executive shows up for work soaking wet. Specifying the order in which statements are to be executed in a computer program is called program control. In this and the next chapter, we investigate C’s program control capabilities.

## 3.3 Pseudocode
Pseudocode is an artificial and informal language that helps you develop algorithms. The pseudocode we present here is particularly useful for developing algorithms that will be converted to structured C programs. Pseudocode is similar to everyday English; it’s convenient and user friendly although it’s not an actual computer programming language.
Pseudocode programs are not executed on computers. Rather, they merely help you “think out” a program before attempting to write it in a programming language like C.
Pseudocode consists purely of characters, so you may conveniently type pseudocode programs into a computer using a text editor program. A carefully prepared pseudocode program can be easily converted to a corresponding C program. This is done in many cases simply by replacing pseudocode statements with their C equivalents.
Pseudocode consists only of action and decision statements—those that are executed when the program has been converted from pseudocode to C and is run in C. Definitions are not executable statements—they’re simply messages to the compiler. For example, the definition
\`int i;\`
tells the compiler the type of variable i and instructs the compiler to reserve space in memory for the variable. But this definition does not cause any action—such as input, output, a calculation or a comparison—to occur when the program is executed. Some programmers choose to list each variable and briefly mention the purpose of each at the beginning of a pseudocode program.

## 3.4 Control Structures
Normally, statements in a program are executed one after the other in the order in which they’re written. This is called sequential execution. Various C statements we’ll soon discuss enable you to specify that the next statement to be executed may be other than the next one in sequence. This is called transfer of control.
During the 1960s, it became clear that the indiscriminate use of transfers of control was the root of a great deal of difficulty experienced by software-development groups. The finger of blame was pointed at the goto statement that allows you to specify a transfer of control to one of many possible destinations in a program. The notion of so-called structured programming became almost synonymous with “goto elimination.”
The research of Bohm and Jacopini had demonstrated that programs could be written without any goto statements. The challenge of the era was for programmers to shift their styles to “goto-less programming.” It was not until well into the 1970s that the programming profession started taking structured programming seriously. The results were impressive, as software-development groups reported reduced development times, more frequent on-time delivery of systems and more frequent within-budget completion of software projects. Programs produced with structured techniques were clearer, easier to debug and modify and more likely to be bug free in the first place.
Bohm and Jacopini’s work demonstrated that all programs could be written in terms of only three control structures, namely the sequence structure, the selection structure and the iteration structure. The sequence structure is simple—unless directed otherwise, the computer executes C statements one after the other in the order in which they’re written. The flowchart segment of Fig. 3.1 illustrates C’s sequence structure.

### Flowcharts
A flowchart is a graphical representation of an algorithm or of a portion of an algorithm. Flowcharts are drawn using certain special-purpose symbols such as rectangles, diamonds, rounded rectangles, and small circles; these symbols are connected by arrows called flowlines.
Like pseudocode, flowcharts are useful for developing and representing algorithms, although pseudocode is preferred by most programmers. Flowcharts clearly show how control structures operate; that’s what we use them for in this text.
Consider the flowchart for the sequence structure in Fig. 3.1. We use the rectangle symbol, also called the action symbol, to indicate any type of action including a calculation or an input/output operation. The flowlines in the figure indicate the order in which the actions are performed—first, grade is added to total, then 1 is added to counter. C allows us to have as many actions as we want in a sequence structure. As we’ll soon see, anywhere a single action may be placed, we may place several actions in sequence.

When drawing a flowchart that represents a complete algorithm, the first symbol we use is a rounded rectangle symbol containing the word “Begin.” The last symbol is a rounded rectangle containing the word “End.” When drawing only a portion of an algorithm as in Fig. 3.1, we omit the rounded rectangle symbols in favor of using small circle symbols, also called connector symbols.
Perhaps the most important flowcharting symbol is the diamond symbol, also called the decision symbol, which indicates that a decision is to be made. We’ll discuss the diamond symbol in the next section.

### Selection Statements in C
C provides three types of selection structures in the form of statements. The if selection statement (Section 3.5) either selects (performs) an action if a condition is true or skips the action if the condition is false. The if...else selection statement (Section 3.6) performs an action if a condition is true and performs a different action if the condition is false. The switch selection statement (discussed in Chapter 4) performs one of many different actions, depending on the value of an expression. The if statement is called a single-selection statement because it selects or ignores a single action. The if...else statement is called a double-selection statement because it selects between two different actions. The switch statement is called a multiple-selection statement because it selects among many different actions.

### Iteration Statements in C
C provides three types of iteration structures in the form of statements, namely while (Section 3.7), do...while, and for (both discussed in Chapter 4).
That’s all there is. C has only seven control statements: sequence, three types of selection and three types of iteration. Each C program is formed by combining as many of each type of control statement as is appropriate for the algorithm the program implements. As with the sequence structure of Fig. 3.1, we’ll see that the flowchart representation of each control statement has two small circle symbols, one at the entry point to the control statement and one at the exit point. These single-entry/single-exit control statements make it easy to build clear programs. We can attach the control-statement flowchart segments to one another by connecting the exit point of one control statement to the entry point of the next. This is much like the way in which a child stacks building blocks, so we call this control-statement stacking. We’ll learn that there’s only one other way control statements may be connected—a method called control-statement nesting. Thus, any C program we’ll ever need to build can be constructed from only seven different types of control statements combined in only two ways. This is the essence of simplicity.

## 3.5 The if Selection Statement
Selection statements are used to choose among alternative courses of action. For example, suppose the passing grade on an exam is 60. The pseudocode statement
*If student's grade is greater than or equal to 60*
*  Print "Passed"*
determines whether the condition “student’s grade is greater than or equal to 60” is true or false. If the condition is true, then “Passed” is printed, and the next pseudocode statement in order is “performed” (remember that pseudocode isn’t a real programming language). If the condition is false, the printing is ignored, and the next pseudocode statement in order is performed.
The preceding pseudocode If statement may be written in C as
\`\`\`c
if ( grade >= 60 ) {
    puts("Passed");
} // end if
\`\`\`
Notice that the C code corresponds closely to the pseudocode (of course you’ll also need to declare the int variable grade). This is one of the properties of pseudocode that makes it such a useful program-development tool. The second line of this selection statement is indented. Such indentation is optional, but it’s highly recommended, as it helps emphasize the inherent structure of structured programs. The C compiler ignores white-space characters such as blanks, tabs and newlines used for indentation and vertical spacing.
The flowchart of Fig. 3.2 illustrates the single-selection if statement. This flowchart contains what is perhaps the most important flowcharting symbol—the diamond symbol, also called the decision symbol, which indicates that a decision is to be made. The decision symbol contains an expression, such as a condition, that can be either true or false. The decision symbol has two flowlines emerging from it. One indicates the direction to take when the expression in the symbol is true and the other the direction to take when the expression is false. Decisions can be based on conditions containing relational or equality operators. In fact, a decision can be based on any expression—if the expression evaluates to zero, it’s treated as false, and if it evaluates to nonzero, it’s treated as true.

The if statement, too, is a single-entry/single-exit statement. We’ll soon learn that the flowcharts for the remaining control structures can also contain (besides small circle symbols and flowlines) only rectangle symbols to indicate the actions to be performed, and diamond symbols to indicate decisions to be made. This is the action/decision model of programming we’ve been emphasizing.
We can envision seven bins, each containing only control-statement flowcharts of one of the seven types. These flowchart segments are empty—nothing is written in the rectangles and nothing in the diamonds. Your task, then, is assembling a program from as many of each type of control statement as the algorithm demands, combining them in only two possible ways (stacking or nesting), and then filling in the actions and decisions in a manner appropriate for the algorithm. We’ll discuss the variety of ways in which actions and decisions may be written.

## 3.6 The if...else Selection Statement
The if selection statement performs an indicated action only when the condition is true; otherwise the action is skipped. The if...else selection statement allows you to specify that different actions are to be performed when the condition is true and when it’s false. For example, the pseudocode statement
*If student's grade is greater than or equal to 60*
*  Print "Passed"*
*else*
*  Print "Failed"*
prints Passed if the student’s grade is greater than or equal to 60 and Failed if the student’s grade is less than 60. In either case, after printing occurs, the next pseudocode statement in sequence is “performed.” The body of the else is also indented.

> **Good Programming Practice 3.1**
> Indent both body statements of an if...else statement (in both pseudocode and C).

The preceding pseudocode If...else statement may be written in C as
\`\`\`c
if ( grade >= 60 ) {
    puts("Passed");
} // end if
else {
    puts("Failed" );
} // end else
\`\`\`
The flowchart of Fig. 3.3 illustrates the flow of control in the if...else statement. Once again, besides small circles and arrows, the only symbols in the flowchart are rectangles (for actions) and a diamond (for a decision).

### Conditional Operator (?:)
C provides the conditional operator (?:), which is closely related to the if...else statement. The conditional operator is C’s only ternary operator—it takes three operands. These together with the conditional operator form a conditional expression. The first operand is a condition. The second operand is the value for the entire conditional expression if the condition is true and the third operand is the value for the entire conditional expression if the condition is false. For example, the puts statement
\`\`\`c
puts( grade >= 60 ? "Passed" : "Failed" );
\`\`\`
contains as its argument a conditional expression that evaluates to the string "Passed" if the condition grade >= 60 is true and to the string "Failed" if the condition is false. The puts statement performs in essentially the same way as the preceding if...else statement.

### Nested if...else Statements
Nested if...else statements test for multiple cases by placing if...else statements inside if...else statements. For example, the following pseudocode statement will print A for exam grades greater than or equal to 90, B for grades greater than or equal to 80 (but less than 90), C for grades greater than or equal to 70 (but less than 80), D for grades greater than or equal to 60 (but less than 70), and F for all other grades.

*If student's grade is greater than or equal to 90*
*  Print "A"*
*else*
*  If student's grade is greater than or equal to 80*
*    Print "B"*
*  else*
*    If student's grade is greater than or equal to 70*
*      Print "C"*
*    else*
*      If student's grade is greater than or equal to 60*
*        Print "D"*
*      else*
*        Print "F"*

This pseudocode may be written in C as
\`\`\`c
if ( grade >= 90 ) {
    puts("A");
} // end if
else {
    if ( grade >= 80 ) {
        puts("B");
    } // end if
    else {
        if ( grade >= 70 ) {
            puts("C");
        } // end if
        else {
            if ( grade >= 60 ) {
                puts("D");
            } // end if
            else {
                puts("F");
            } // end else
        } // end else
    } // end else
} // end else
\`\`\`
You may prefer to write the preceding if statement as
\`\`\`c
if ( grade >= 90 ) {
    puts("A");
} // end if
else if ( grade >= 80 ) {
    puts("B");
} // end else if
else if ( grade >= 70 ) {
    puts("C");
} // end else if
else if ( grade >= 60 ) {
    puts("D");
} // end else if
else {
    puts("F");
} // end else
\`\`\`
As far as the C compiler is concerned, both forms are equivalent. The latter form is popular because it avoids the deep indentation of the code to the right. Such indentation often leaves little room on a line, forcing lines to be split and decreasing program readability.

### Compound Statements
The if selection statement expects only one statement in its body—if you have only one statement in the if’s body, you do not need to enclose it in braces. To include several statements in the body of an if, you must enclose the set of statements in braces ({ and }). A set of statements contained within a pair of braces is called a compound statement or a block.

> **Software Engineering Observation 3.1**
> A compound statement can be placed anywhere in a program that a single statement can be placed.

## 3.7 The while Iteration Statement
An iteration statement (also called an repetition statement or loop) allows you to specify that an action is to be repeated while some condition remains true. The pseudocode statement
*While there are more items on my shopping list*
*  Purchase next item and cross it off my list*
describes the iteration that occurs during a shopping trip. The condition, “there are more items on my shopping list” may be true or false. If it’s true, then the action, “Purchase next item and cross it off my list” is performed. This action will be performed repeatedly while the condition remains true. The statement(s) contained in the while iteration statement constitute the body of the while. The while statement body may be a single statement or a compound statement. Eventually, the condition will become false (when the last item on the shopping list has been purchased and crossed off the list). At this point, the iteration terminates, and the first pseudocode statement after the iteration structure is executed.

## 3.8 Formulating Algorithms Case Study 1: Counter-Controlled Iteration
To illustrate how algorithms are developed, we solve several variations of a class-averaging problem. Consider the following problem statement:
*A class of ten students took a quiz. The grades (integers in the range 0 to 100) for this quiz are available to you. Determine the class average on the quiz.*
Let’s use pseudocode to list the actions to execute and specify the order in which these actions should execute. We use counter-controlled iteration to input the grades one at a time. This technique uses a variable called a counter to specify the number of times a set of statements should execute. In this example, iteration terminates when the counter exceeds 10. Counter-controlled iteration is often called definite iteration because the number of iterations is known before the loop begins executing.
The following C program solves the class-average problem using counter-controlled iteration.
\`\`\`c
// Fig. 3.6: fig03_06.c
// Class average program with counter-controlled iteration.
#include <stdio.h>

int main( void ) {
    unsigned int counter; // number of grade to be entered next
    int grade; // grade value
    int total; // sum of grades entered by user
    int average; // average of grades

    // initialization phase
    total = 0; // initialize total
    counter = 1; // initialize loop counter

    // processing phase
    while ( counter <= 10 ) { // loop 10 times
        printf( "%s", "Enter grade: " ); // prompt for input
        scanf( "%d", &grade ); // read grade from user
        total = total + grade; // add grade to total
        counter = counter + 1; // increment counter
    } // end while

    // termination phase
    average = total / 10; // integer division
    printf( "Class average is %d\\n", average ); // display result
} // end function main
\`\`\`

## 3.9 Formulating Algorithms with Top-Down, Stepwise Refinement Case Study 2: Sentinel-Controlled Iteration
Let’s generalize the class-average problem. Consider the following problem:
*Develop a class-averaging program that will process an arbitrary number of grades each time the program is run.*
One way to solve this problem is to use a special value called a sentinel value (also called a signal value, a dummy value, or a flag value) to indicate “end of data entry.” The user types grades until all legitimate grades have been entered. The user then types the sentinel value to indicate “the last grade has been entered.” Sentinel-controlled iteration is often called indefinite iteration because the number of iterations isn’t known before the loop begins executing.

### Top-Down, Stepwise Refinement
We approach the class-average program with a technique called top-down, stepwise refinement, a technique that’s essential to the development of well-structured programs. We begin with a pseudocode representation of the top:
*Determine the class average for the quiz*
We divide the top into a series of smaller tasks and list these in the order in which they need to be performed. This results in the following first refinement.
*Initialize variables*
*Input, sum, and count the quiz grades*
*Calculate and print the class average*
To proceed to the next level of refinement, i.e., the second refinement, we commit to specific variables. The complete second refinement is shown below.
1. *Initialize total to zero*
2. *Initialize counter to zero*
3. *Input the first grade (possibly the sentinel)*
4. *While the user has not as yet entered the sentinel*
5. *  Add this grade into the running total*
6. *  Add one to the grade counter*
7. *  Input the next grade (possibly the sentinel)*
8. *If the counter is not equal to zero*
9. *  Set the average to the total divided by the counter*
10. *  Print the average*
11. *else*
12. *  Print “No grades were entered”*

The C program and a sample execution are shown below. Although only integer grades are entered, the averaging calculation is likely to produce a number with a decimal point. The type \`int\` cannot represent such a number. The program introduces the data type \`float\` to handle numbers with decimal points (called floating-point numbers) and introduces a special operator called a cast operator to handle the averaging calculation.
\`\`\`c
// Fig. 3.8: fig03_08.c
// Class-average program with sentinel-controlled iteration.
#include <stdio.h>

int main( void ) {
    unsigned int counter; // number of grades entered
    int grade; // grade value
    int total; // sum of grades
    float average; // number with decimal point for average

    // initialization phase
    total = 0; // initialize total
    counter = 0; // initialize loop counter

    // processing phase
    printf( "%s", "Enter grade, -1 to end: " ); // prompt for input
    scanf( "%d", &grade ); // read grade from user
    
    while ( grade != -1 ) {
        total = total + grade; // add grade to total
        counter = counter + 1; // increment counter
        printf( "%s", "Enter grade, -1 to end: " ); // prompt for input
        scanf( "%d", &grade ); // read next grade
    } // end while

    // termination phase
    if ( counter != 0 ) {
        // calculate average of all grades entered
        average = (float) total / counter; // avoid truncation
        printf( "Class average is %.2f\\n", average );
    } // end if
    else { // if no grades were entered, output message
        puts( "No grades were entered" );
    } // end else
} // end function main
\`\`\`

## 3.10 Formulating Algorithms with Top-Down, Stepwise Refinement Case Study 3: Nested Control Statements
We’ve seen that control statements may be stacked on top of one another (in sequence). In this case study we’ll see the only other structured way control statements may be connected in C, namely through nesting of one control statement within another.

## 3.11 Assignment Operators
C provides several assignment operators for abbreviating assignment expressions. For example, the statement \`c = c + 3;\` can be abbreviated with the addition assignment operator \`+=\` as \`c += 3;\`. The \`+=\` operator adds the value of the expression on the right of the operator to the value of the variable on the left of the operator and stores the result in the variable on the left of the operator.

## 3.12 Increment and Decrement Operators
C also provides the unary increment operator, \`++\`, and the unary decrement operator, \`--\`. If a variable c is to be incremented by 1, the increment operator \`++\` can be used rather than the expressions \`c = c + 1\` or \`c += 1\`. If increment or decrement operators are placed before a variable (i.e., prefixed), they’re referred to as the preincrement or predecrement operators. If increment or decrement operators are placed after a variable (i.e., postfixed), they’re referred to as the postincrement or postdecrement operators. Preincrementing (predecrementing) a variable causes the variable to be incremented (decremented) by 1, then its new value is used in the expression in which it appears. Postincrementing (postdecrementing) the variable causes the current value of the variable to be used in the expression in which it appears, then the variable value is incremented (decremented) by 1.

## 3.13 Secure C Programming
### Arithmetic Overflow
Adding integers could result in a value that’s too large to store in an \`int\` variable. This is known as arithmetic overflow and can cause undefined behavior. It’s considered a good practice to ensure that before you perform arithmetic calculations, they will not overflow.

### Unsigned Integers
In general, counters that should store only non-negative values should be declared with \`unsigned\` before the integer type. Variables of unsigned types can represent values from 0 to approximately twice the positive range of the corresponding signed integer types.
`,zh:`
# 3. C 的結構化程式開發

## 學習目標
在本章中，您將學習：
- 使用基本的解決問題技巧。
- 透過由上而下、逐步精化的過程來開發演算法。
- 使用 if 選擇陳述式和 if...else 選擇陳述式來選擇動作。
- 使用 while 迭代陳述式在程式中重複執行陳述式。
- 使用計數器控制的迭代和哨兵控制的迭代。
- 學習結構化程式設計。
- 使用遞增、遞減和賦值運算子。

## 3.1 簡介
在為了解決特定問題而編寫程式之前，我們必須對問題有透徹的理解，並有一個精心規劃的解決方案。第三章和第四章討論了有助於開發結構化電腦程式的技術。在 4.12 節中，我們將總結這裡和第四章中開發的結構化程式設計技術。

## 3.2 演算法
任何計算問題的解決方案都涉及按特定順序執行一系列動作。一個解決問題的程序，就以下兩方面而言：
1. 要執行的動作，以及
2. 這些動作要執行的順序
被稱為演算法。下面的例子說明了正確指定動作執行順序的重要性。
考慮一位初級主管起床上班所遵循的「起床號演算法」：(1) 起床，(2) 脫掉睡衣，(3) 洗澡，(4) 穿衣服，(5) 吃早餐，(6) 共乘上班。這個程序讓主管準備充分地去上班做重要決策。假設同樣的步驟以稍微不同的順序執行：(1) 起床，(2) 脫掉睡衣，(3) 穿衣服，(4) 洗澡，(5) 吃早餐，(6) 共乘上班。在這種情況下，我們的初級主管上班時會濕淋淋的。在電腦程式中指定陳述式的執行順序稱為程式控制。在本章和下一章中，我們將探討 C 的程式控制能力。

## 3.3 偽代碼
偽代碼是一種非正式的人工語言，可幫助您開發演算法。我們在這裡介紹的偽代碼對於開發將轉換為結構化 C 程式的演算法特別有用。偽代碼類似於日常英語；它方便且使用者友好，儘管它不是一種實際的電腦程式語言。
偽代碼程式不在電腦上執行。相反，它們僅僅幫助您在嘗試用像 C 這樣的程式語言編寫程式之前「思考」出一個程式。
偽代碼純粹由字元組成，因此您可以方便地使用文字編輯器程式將偽代碼程式輸入電腦。一個精心準備的偽代碼程式可以輕易地轉換為對應的 C 程式。在許多情況下，只需將偽代碼陳述式替換為其 C 的等價物即可。
偽代碼僅包含動作和決策陳述式——那些在程式從偽代碼轉換為 C 並在 C 中運行時執行的陳述式。定義不是可執行的陳述式——它們只是給編譯器的訊息。例如，定義
\`int i;\`
告訴編譯器變數 i 的類型，並指示編譯器在記憶體中為該變數保留空間。但是當程式執行時，這個定義不會引起任何動作——如輸入、輸出、計算或比較。一些程式設計師選擇在偽代碼程式的開頭列出每個變數並簡要提及其用途。

## 3.4 控制結構
通常，程式中的陳述式是按照它們被書寫的順序一個接一個地執行的。這稱為循序執行。我們很快將討論的各種 C 陳述式使您能夠指定下一個要執行的陳述式可能不是序列中的下一個。這稱為控制轉移。
在 1960 年代，人們清楚地認識到，不加選擇地使用控制轉移是軟體開發團隊遇到大量困難的根源。矛頭指向了 goto 陳述式，它允許您將控制權轉移到程式中許多可能的目的地之一。「結構化程式設計」的概念幾乎成了「消除 goto」的同義詞。
Bohm 和 Jacopini 的研究表明，程式可以在沒有任何 goto 陳述式的情況下編寫。當時的挑戰是讓程式設計師將他們的風格轉變為「無 goto 程式設計」。直到 1970 年代中期，程式設計行業才開始認真對待結構化程式設計。結果令人印象深刻，軟體開發團隊報告說開發時間縮短了，系統更頻繁地按時交付，軟體專案更頻繁地在預算內完成。用結構化技術產生的程式更清晰，更容易除錯和修改，並且更有可能一開始就沒有錯誤。
Bohm 和 Jacopini 的工作證明了所有程式都可以只用三種控制結構來編寫，即序列結構、選擇結構和迭代結構。序列結構很簡單——除非另有指示，否則電腦會按照 C 陳述式被書寫的順序一個接一個地執行。圖 3.1 的流程圖片段說明了 C 的序列結構。

### 流程圖
流程圖是演算法或演算法一部分的圖形表示。流程圖使用一些特殊用途的符號繪製，如矩形、菱形、圓角矩形和小圓圈；這些符號由稱為流程線的箭頭連接。
像偽代碼一樣，流程圖對於開發和表示演算法很有用，儘管大多數程式設計師更喜歡偽代碼。流程圖清楚地顯示了控制結構如何運作；這就是我們在本書中使用它們的目的。
考慮圖 3.1 中序列結構的流程圖。我們使用矩形符號，也稱為動作符號，來表示任何類型的動作，包括計算或輸入/輸出操作。圖中的流程線指示了動作執行的順序——首先，將 grade 加到 total，然後將 1 加到 counter。C 允許我們在一個序列結構中有多個動作。正如我們很快會看到的，任何可以放置單一動作的地方，我們都可以放置多個動作。

在繪製代表完整演算法的流程圖時，我們使用的第一個符號是包含「開始」字樣的圓角矩形符號。最後一個符號是包含「結束」字樣的圓角矩形。在只繪製演算法的一部分時，如圖 3.1，我們省略了圓角矩形符號，而使用小圓圈符號，也稱為連接符號。
也許最重要的流程圖符號是菱形符號，也稱為決策符號，它表示需要做出一個決定。我們將在下一節討論菱形符號。

### C 的選擇陳述式
C 提供了三種類型的選擇結構，以陳述式的形式。if 選擇陳述式（3.5 節）在條件為真時選擇（執行）一個動作，如果條件為假則跳過該動作。if...else 選擇陳述式（3.6 節）在條件為真時執行一個動作，在條件為假時執行另一個不同的動作。switch 選擇陳述式（在第四章討論）根據一個表達式的值執行多個不同動作中的一個。if 陳述式被稱為單一選擇陳述式，因為它選擇或忽略一個單一的動作。if...else 陳述式被稱為雙重選擇陳述式，因為它在兩個不同的動作之間進行選擇。switch 陳述式被稱為多重選擇陳述式，因為它在多個不同動作中進行選擇。

### C 的迭代陳述式
C 提供了三種類型的迭代結構，以陳述式的形式，即 while（3.7 節）、do...while 和 for（兩者都在第四章討論）。
這就是全部了。C 只有七個控制陳述式：序列、三種類型的選擇和三種類型的迭代。每個 C 程式都是透過組合適當數量的每種類型的控制陳述式來形成的，以實現程式所執行的演算法。與圖 3.1 的序列結構一樣，我們將看到每個控制陳述式的流程圖表示都有兩個小圓圈符號，一個在控制陳述式的入口點，一個在出口點。這些單入口/單出口的控制陳述式使建構清晰的程式變得容易。我們可以將控制陳述式的流程圖片段相互連接，方法是將一個控制陳述式的出口點連接到下一個的入口點。這很像孩子堆疊積木的方式，所以我們稱之為控制陳述式堆疊。我們將學習到控制陳述式還有另一種連接方式——一種稱為控制陳述式巢狀的方法。因此，我們需要建構的任何 C 程式都可以僅由七種不同類型的控制陳述式以兩種方式組合而成。這就是簡單的精髓。

## 3.5 if 選擇陳述式
選擇陳述式用於在不同的行動方案中進行選擇。例如，假設一場考試的及格分數是 60 分。偽代碼陳述式
*如果學生成績大於或等於 60*
*  印出 "Passed"*
判斷「學生成績大於或等於 60」這個條件是真是假。如果條件為真，則印出「Passed」，然後按順序「執行」下一個偽代碼陳述式（記住偽代碼不是真正的程式語言）。如果條件為假，則忽略印出動作，並執行順序中的下一個偽代碼陳述式。
前面的偽代碼 If 陳述式可以用 C 語言寫成
\`\`\`c
if ( grade >= 60 ) {
    puts("Passed");
} // 結束 if
\`\`\`
請注意，C 程式碼與偽代碼非常接近（當然您還需要宣告 int 變數 grade）。這是偽代碼使其成為如此有用的程式開發工具的特性之一。這個選擇陳述式的第二行是縮排的。這種縮排是可選的，但強烈建議使用，因為它有助於強調結構化程式的內在結構。C 編譯器會忽略用於縮排和垂直間距的空白字元，如空格、定位字元和換行符。
圖 3.2 的流程圖說明了單一選擇 if 陳述式。這個流程圖包含了可能是最重要的流程圖符號——菱形符號，也稱為決策符號，它表示需要做出一個決定。決策符號包含一個表達式，如一個條件，其結果可以是真或假。決策符號有兩條流程線從中引出。一條指示當符號中的表達式為真時要走的方向，另一條指示當表達式為假時要走的方向。決策可以基於包含關係或相等運算子的條件。事實上，決策可以基於任何表達式——如果表達式求值為零，則視為假，如果求值為非零，則視為真。

if 陳述式也是一個單入口/單出口的陳述式。我們很快會學到，其餘控制結構的流程圖也只能包含（除了小圓圈符號和流程線外）表示要執行的動作的矩形符號，以及表示要做的決策的菱形符號。這就是我們一直強調的動作/決策程式設計模型。
我們可以想像有七個箱子，每個箱子只包含七種類型中的一種控制陳述式流程圖。這些流程圖片段是空的——矩形裡什麼也沒寫，菱形裡也什麼也沒寫。您的任務就是，根據演算法的需求，從每種類型的控制陳述式中組合出一個程式，只用兩種可能的方式（堆疊或巢狀）組合它們，然後以適合演算法的方式填入動作和決策。我們將討論可以書寫動作和決策的各種方式。

## 3.6 if...else 選擇陳述式
if 選擇陳述式只在條件為真時執行指定的動作；否則跳過該動作。if...else 選擇陳述式允許您指定當條件為真和為假時要執行的不同動作。例如，偽代碼陳述式
*如果學生成績大於或等於 60*
*  印出 "Passed"*
*否則*
*  印出 "Failed"*
如果學生成績大於或等於 60，則印出 Passed，如果學生成績小於 60，則印出 Failed。在任何一種情況下，印出動作發生後，序列中的下一個偽代碼陳述式將被「執行」。else 的主體也是縮排的。

> **良好程式設計實踐 3.1**
> 在 if...else 陳述式中，將兩個主體陳述式都進行縮排（在偽代碼和 C 語言中都是如此）。

前面的偽代碼 If...else 陳述式可以用 C 語言寫成
\`\`\`c
if ( grade >= 60 ) {
    puts("Passed");
} // 結束 if
else {
    puts("Failed" );
} // 結束 else
\`\`\`
圖 3.3 的流程圖說明了 if...else 陳述式中的控制流程。再次，除了小圓圈和箭頭，流程圖中唯一的符號是矩形（用於動作）和一個菱形（用於決策）。

### 條件運算子 (?:)
C 語言提供了條件運算子（?:），它與 if...else 陳述式密切相關。條件運算子是 C 語言中唯一的三元運算子——它接受三個運算元。這三個運算元與條件運算子一起構成一個條件表達式。第一個運算元是一個條件。第二個運算元是當條件為真時整個條件表達式的值，第三個運算元是當條件為假時整個條件表達式的值。例如，puts 陳述式
\`\`\`c
puts( grade >= 60 ? "Passed" : "Failed" );
\`\`\`
的參數是一個條件表達式，如果條件 grade >= 60 為真，則其求值結果為字串 "Passed"，如果條件為假，則為字串 "Failed"。這個 puts 陳述式的執行方式與前面的 if...else 陳述式基本相同。

### 巢狀 if...else 陳述式
巢狀 if...else 陳述式透過將 if...else 陳述式放在其他 if...else 陳述式內部來測試多種情況。例如，下面的偽代碼陳述式將為大於或等於 90 的考試成績印出 A，為大於或等於 80（但小於 90）的成績印出 B，為大於或等於 70（但小於 80）的成績印出 C，為大於或等於 60（但小於 70）的成績印出 D，為所有其他成績印出 F。

*如果學生成績大於或等於 90*
*  印出 "A"*
*否則*
*  如果學生成績大於或等於 80*
*    印出 "B"*
*  否則*
*    如果學生成績大於或等於 70*
*      印出 "C"*
*    否則*
*      如果學生成績大於或等於 60*
*        印出 "D"*
*      否則*
*        印出 "F"*

這個偽代碼可以用 C 語言寫成
\`\`\`c
if ( grade >= 90 ) {
    puts("A");
} // 結束 if
else {
    if ( grade >= 80 ) {
        puts("B");
    } // 結束 if
    else {
        if ( grade >= 70 ) {
            puts("C");
        } // 結束 if
        else {
            if ( grade >= 60 ) {
                puts("D");
            } // 結束 if
            else {
                puts("F");
            } // 結束 else
        } // 結束 else
    } // 結束 else
} // 結束 else
\`\`\`
您可能更喜歡將前面的 if 陳述式寫成
\`\`\`c
if ( grade >= 90 ) {
    puts("A");
} // 結束 if
else if ( grade >= 80 ) {
    puts("B");
} // 結束 else if
else if ( grade >= 70 ) {
    puts("C");
} // 結束 else if
else if ( grade >= 60 ) {
    puts("D");
} // 結束 else if
else {
    puts("F");
} // 結束 else
\`\`\`
就 C 編譯器而言，這兩種形式是等價的。後一種形式很受歡迎，因為它避免了程式碼向右的深度縮排。這種縮排通常會讓一行上的空間變得很小，迫使程式碼行被分割，降低了程式的可讀性。

### 複合陳述式
if 選擇陳述式在其主體中只期望一個陳述式——如果 if 的主體中只有一個陳述式，您不需要用大括號將其括起來。要在 if 的主體中包含多個陳述式，您必須用大括號（{ 和 }）將這組陳述式括起來。包含在一對大括號內的一組陳述式稱為複合陳述式或區塊。

> **軟體工程觀察 3.1**
> 複合陳述式可以放在程式中任何可以放置單一陳述式的地方。

## 3.7 while 迭代陳述式
迭代陳述式（也稱為重複陳述式或迴圈）允許您指定在某個條件保持為真時重複執行一個動作。偽代碼陳述式
*當我的購物清單上還有更多項目時*
*  購買下一個項目並將其劃掉*
描述了購物過程中發生的迭代。條件「我的購物清單上還有更多項目」可以是真或假。如果為真，則執行動作「購買下一個項目並將其劃掉」。只要條件保持為真，這個動作就會重複執行。包含在 while 迭代陳述式中的陳述式構成了 while 的主體。while 陳述式的主體可以是單一陳述式或複合陳述式。最終，條件將變為假（當購物清單上的最後一個項目被購買並劃掉時）。此時，迭代終止，並執行迭代結構之後的第一個偽代碼陳述式。

## 3.8 演算法設計案例研究 1：計數器控制的迭代
為了說明演算法是如何開發的，我們解決了班級平均問題的幾種變體。考慮以下問題陳述：
*一個班級的十名學生參加了一次測驗。這次測驗的成績（0 到 100 範圍內的整數）可供您使用。確定班級在這次測驗中的平均成績。*
讓我們使用偽代碼來列出要執行的動作並指定它們的執行順序。我們使用計數器控制的迭代來一次輸入一個成績。這種技術使用一個稱為計數器的變數來指定一組陳述式應該執行的次數。在這個例子中，當計數器超過 10 時，迭代終止。計數器控制的迭代通常稱為確定性迭代，因為在迴圈開始執行之前，迭代的次數是已知的。
以下 C 程式使用計數器控制的迭代解決了班級平均問題。
\`\`\`c
// 圖 3.6: fig03_06.c
// 使用計數器控制迭代的班級平均程式。
#include <stdio.h>

int main( void ) {
    unsigned int counter; // 下一個要輸入的成績編號
    int grade; // 成績值
    int total; // 使用者輸入的成績總和
    int average; // 成績平均值

    // 初始化階段
    total = 0; // 初始化總和
    counter = 1; // 初始化迴圈計數器

    // 處理階段
    while ( counter <= 10 ) { // 迴圈 10 次
        printf( "%s", "輸入成績: " ); // 提示輸入
        scanf( "%d", &grade ); // 從使用者讀取成績
        total = total + grade; // 將成績加到總和
        counter = counter + 1; // 遞增計數器
    } // 結束 while

    // 終止階段
    average = total / 10; // 整數除法
    printf( "班級平均成績是 %d\\n", average ); // 顯示結果
} // 結束 main 函式
\`\`\`

## 3.9 演算法設計與由上而下、逐步精化案例研究 2：哨兵控制的迭代
讓我們將班級平均問題一般化。考慮以下問題：
*開發一個班級平均程式，該程式每次運行時將處理任意數量的成績。*
解決這個問題的一種方法是使用一個稱為哨兵值（也稱為信號值、虛設值或標誌值）的特殊值來表示「資料輸入結束」。使用者輸入成績，直到所有合法成績都已輸入。然後使用者輸入哨兵值以表示「最後一個成績已輸入」。哨兵控制的迭代通常稱為不確定性迭代，因為在迴圈開始執行之前，迭代的次數是未知的。

### 由上而下、逐步精化
我們使用一種稱為由上而下、逐步精化的技術來處理班級平均程式，這種技術對於開發結構良好的程式至關重要。我們從頂層的偽代碼表示開始：
*確定測驗的班級平均成績*
我們將頂層任務分解為一系列較小的任務，並按它們需要執行的順序列出。這導致了以下的第一層精化。
*初始化變數*
*輸入、加總並計算測驗成績的數量*
*計算並印出班級平均成績*
為了進入下一層精化，即第二層精化，我們確定具體的變數。完整的第二層精化如下所示。
1. *將總和初始化為零*
2. *將計數器初始化為零*
3. *輸入第一個成績（可能是哨兵值）*
4. *當使用者尚未輸入哨兵值時*
5. *  將此成績加到運行總和中*
6. *  將成績計數器加一*
7. *  輸入下一個成績（可能是哨兵值）*
8. *如果計數器不等於零*
9. *  將平均值設定為總和除以計數器*
10. *  印出平均值*
11. *否則*
12. *  印出「未輸入成績」*

C 程式和一個範例執行如下所示。雖然只輸入整數成績，但平均計算很可能會產生帶有小數點的數字。\`int\` 類型無法表示這樣的數字。該程式引入了 \`float\` 資料類型來處理帶有小數點的數字（稱為浮點數），並引入了一個稱為強制轉型運算子的特殊運算子來處理平均計算。
\`\`\`c
// 圖 3.8: fig03_08.c
// 使用哨兵控制迭代的班級平均程式。
#include <stdio.h>

int main( void ) {
    unsigned int counter; // 輸入的成績數量
    int grade; // 成績值
    int total; // 成績總和
    float average; // 帶有小數點的平均值

    // 初始化階段
    total = 0; // 初始化總和
    counter = 0; // 初始化迴圈計數器

    // 處理階段
    printf( "%s", "輸入成績，-1 結束: " ); // 提示輸入
    scanf( "%d", &grade ); // 從使用者讀取成績
    
    while ( grade != -1 ) {
        total = total + grade; // 將成績加到總和
        counter = counter + 1; // 遞增計數器
        printf( "%s", "輸入成績，-1 結束: " ); // 提示輸入
        scanf( "%d", &grade ); // 讀取下一個成績
    } // 結束 while

    // 終止階段
    if ( counter != 0 ) {
        // 計算所有輸入成績的平均值
        average = (float) total / counter; // 避免截斷
        printf( "班級平均成績是 %.2f\\n", average );
    } // 結束 if
    else { // 如果沒有輸入成績，則輸出訊息
        puts( "未輸入成績" );
    } // 結束 else
} // 結束 main 函式
\`\`\`

## 3.10 演算法設計與由上而下、逐步精化案例研究 3：巢狀控制陳述式
我們已經看到控制陳述式可以一個接一個地堆疊（循序地）。在這個案例研究中，我們將看到 C 語言中控制陳述式可以連接的唯一另一種結構化方式，即將一個控制陳述式巢狀在另一個之內。

## 3.11 賦值運算子
C 語言提供了幾種賦值運算子來簡化賦值表達式。例如，陳述式 \`c = c + 3;\` 可以用加法賦值運算子 \`+=\` 簡寫為 \`c += 3;\`。\`+=\` 運算子將運算子右邊表達式的值加到運算子左邊變數的值上，並將結果儲存在左邊的變數中。

## 3.12 遞增與遞減運算子
C 語言也提供了一元遞增運算子 \`++\` 和一元遞減運算子 \`--\`。如果一個變數 c 要加 1，可以使用遞增運算子 \`++\`，而不是表達式 \`c = c + 1\` 或 \`c += 1\`。如果遞增或遞減運算子放在變數前面（即前置），它們被稱為前置遞增或前置遞減運算子。如果遞增或遞減運算子放在變數後面（即後置），它們被稱為後置遞增或後置遞減運算子。前置遞增（前置遞減）一個變數會使該變數先加（減）1，然後在它出現的表達式中使用它的新值。後置遞增（後置遞減）一個變數會使該變數的當前值先在它出現的表達式中使用，然後變數的值再加（減）1。

## 3.13 安全的 C 程式設計
### 算術溢位
將整數相加可能會導致一個太大而無法儲存在 \`int\` 變數中的值。這被稱為算術溢位，可能導致未定義的行為。在執行算術計算之前，確保它們不會溢位是一個良好的實踐。

### 無符號整數
一般來說，只應儲存非負值的計數器應該在整數類型前用 \`unsigned\` 聲明。無符號類型的變數可以表示從 0 到大約是相應有符號整數類型正數範圍兩倍的值。
`},d={en:`
# 4. C Program Control

## Objectives
In this chapter, you'll learn:
- The essentials of counter-controlled iteration.
- To use the for and do...while iteration statements to execute statements repeatedly.
- To understand multiple selection using the switch selection statement.
- To use the break and continue statements to alter the flow of control.
- To use the logical operators to form complex conditional expressions in control statements.
- To avoid the consequences of confusing the equality and assignment operators.

## 4.1 Introduction
You should now be comfortable with writing simple, complete C programs. In this chapter, iteration is considered in greater detail, and additional iteration control statements, namely the for and the do...while, are presented. The switch multiple-selection statement is introduced. We discuss the break statement for exiting immediately from certain control statements, and the continue statement for skipping the remainder of the body of an iteration statement, then proceeding with the next iteration of the loop. The chapter discusses logical operators used for combining conditions, and summarizes the principles of structured programming as presented in Chapter 3 and this chapter.

## 4.2 Iteration Essentials
Most programs involve iteration, or looping. A loop is a group of instructions the computer executes repeatedly while some loop-continuation condition remains true. We've discussed two means of iteration:
1. Counter-controlled iteration
2. Sentinel-controlled iteration
Counter-controlled iteration is sometimes called definite iteration because we know in advance exactly how many times the loop will be executed. Sentinel-controlled iteration is sometimes called indefinite iteration because it’s not known in advance how many times the loop will be executed.
In counter-controlled iteration, a control variable is used to count the number of iterations. The control variable is incremented (usually by 1) each time the group of instructions is performed. When the value of the control variable indicates that the correct number of iterations has been performed, the loop terminates and execution continues with the statement after the iteration statement.

## 4.3 Counter-Controlled Iteration
Counter-controlled iteration requires:
1. The name of a control variable (or loop counter).
2. The initial value of the control variable.
3. The increment (or decrement) by which the control variable is modified each time through the loop.
4. The condition that tests for the final value of the control variable (i.e., whether looping should continue).
Consider the simple program shown in Fig. 4.1, which prints the numbers from 1 to 10. The definition
\`unsigned int counter = 1; // initialization\`
names the control variable (counter), defines it to be an integer, reserves memory space for it, and sets its initial value to 1.

## 4.4 for Iteration Statement
The for iteration statement handles all the details of counter-controlled iteration. The general format of the for statement is
\`for (initialization; condition; increment) { statement }\`
where the initialization expression initializes the loop-control variable, the condition expression is the loop-continuation condition and the increment expression increments the control variable.
Figure 4.3 takes a closer look at the for statement of Fig. 4.2. Notice that the for statement “does it all”—it specifies each of the items needed for counter-controlled iteration with a control variable. The three expressions in the for statement are optional. If the condition expression is omitted, C assumes that the loop-continuation condition is true, thus creating an infinite loop. The two semicolons in the for statement are required.

## 4.5 for Statement: Notes and Observations
1. The initialization, loop-continuation condition and increment can contain arithmetic expressions.
2. The “increment” may be negative (in which case it’s really a decrement and the loop actually counts downward).
3. If the loop-continuation condition is initially false, the loop body does not execute.
4. The control variable is frequently printed or used in calculations in the body of a loop, but it need not be.
5. The for statement is flowcharted much like the while statement. The initialization occurs only once and incrementing occurs after the body statement each time it’s performed.

## 4.6 Examples Using the for Statement
The for statement can be used to sum the even integers from 2 to 100, or to calculate compound interest. C does not include an exponentiation operator, but we can use the Standard Library function \`pow(x, y)\` to calculate x raised to the y-th power.

## 4.7 switch Multiple-Selection Statement
Occasionally, an algorithm will contain a series of decisions in which a variable or expression is tested separately for each of the constant integral values it may assume, and different actions are taken. This is called multiple selection. C provides the switch multiple-selection statement to handle such decision making.
The switch statement consists of a series of case labels, an optional default case and statements to execute for each case. The break statement is used to exit the switch statement immediately. If break is not used, fall-through will occur, where the statements for all the remaining cases will be executed.

## 4.8 do...while Iteration Statement
The do...while iteration statement is similar to the while statement. In the while statement, the loop-continuation condition is tested at the beginning of the loop before the body of the loop is performed. The do...while statement tests the loop-continuation condition after the loop body is performed. Therefore, the loop body will always execute at least once.

## 4.9 break and continue Statements
The break and continue statements are used to alter the flow of control.
- **break Statement**: When executed in a while, for, do...while or switch statement, causes an immediate exit from that statement.
- **continue Statement**: When executed in a while, for or do...while statement, skips the remaining statements in that control statement’s body and performs the next iteration of the loop.

## 4.10 Logical Operators
Logical operators may be used to form more complex conditions by combining simple conditions. The logical operators are \`&&\` (logical AND), \`||\` (logical OR) and \`!\` (logical NOT).
- An expression containing \`&&\` or \`||\` operators is evaluated only until truth or falsehood is known. This is called short-circuit evaluation.

## 4.11 Confusing Equality (==) and Assignment (=) Operators
A common error is accidentally swapping the operators \`==\` (equality) and \`=\` (assignment). This does not ordinarily cause compilation errors but can lead to runtime logic errors. Any expression that produces a value can be used in the decision portion of any control statement. If the value is 0, it’s treated as false; if nonzero, it's true. Assignments in C produce a value.

## 4.12 Structured Programming Summary
Structured programming produces programs that are easier to understand, test, debug, modify, and even prove correct. It involves using only single-entry/single-exit control statements combined in two ways: stacking and nesting. All programs can be written in terms of only three forms of control: sequence, selection (if), and iteration (while).

## 4.13 Secure C Programming
### Checking Function scanf’s Return Value
Many functions return values indicating whether they executed successfully. For example, function \`scanf\` returns an \`int\` indicating the number of items that were read. If this value does not match the number you intended to read, then \`scanf\` was unable to complete the input operation.

### Range Checking
Even if a scanf operates successfully, the values read might still be invalid. You should validate inputs by using range checking to ensure that they are within expected bounds.
`,zh:`
# 4. C 程式控制

## 學習目標
在本章中，您將學習：
- 計數器控制迭代的要點。
- 使用 for 和 do...while 迭代陳述式重複執行陳述式。
- 理解使用 switch 選擇陳述式的多重選擇。
- 使用 break 和 continue 陳述式改變控制流程。
- 在控制陳述式中使用邏輯運算子形成複雜的條件表達式。
- 避免混淆相等和賦值運算子所帶來的後果。

## 4.1 簡介
您現在應該能自如地編寫簡單、完整的 C 程式了。在本章中，將更詳細地探討迭代，並介紹額外的迭代控制陳述式，即 for 和 do...while。同時也會介紹 switch 多重選擇陳述式。我們將討論用於立即從某些控制陳述式中退出的 break 陳述式，以及用於跳過迭代陳述式主體的其餘部分，然後繼續下一次迴圈的 continue 陳述式。本章還討論了用於組合條件的邏輯運算子，並總結了第三章和本章中介紹的結構化程式設計原則。

## 4.2 迭代要點
大多數程式都涉及迭代或迴圈。迴圈是電腦在某個迴圈繼續條件為真時重複執行的一組指令。我們已經討論了兩種迭代方式：
1. 計數器控制的迭代
2. 哨兵控制的迭代
計數器控制的迭代有時被稱為確定性迭代，因為我們事先確切知道迴圈將執行多少次。哨兵控制的迭代有時被稱為不確定性迭代，因為事先不知道迴圈將執行多少次。
在計數器控制的迭代中，使用一個控制變數來計算迭代次數。每次執行這組指令時，控制變數都會遞增（通常是加 1）。當控制變數的值表示已執行正確的迭代次數時，迴圈終止，程式繼續執行迭代陳述式之後的陳述式。

## 4.3 計數器控制的迭代
計數器控制的迭代需要：
1. 控制變數（或迴圈計數器）的名稱。
2. 控制變數的初始值。
3. 每次迴圈中控制變數被修改的增量（或減量）。
4. 測試控制變數最終值的條件（即是否應繼續迴圈）。
考慮圖 4.1 中的簡單程式，它印出從 1 到 10 的數字。定義
\`unsigned int counter = 1; // 初始化\`
命名了控制變數（counter），將其定義為整數，為其保留記憶體空間，並將其初始值設為 1。

## 4.4 for 迭代陳述式
for 迭代陳述式處理了計數器控制迭代的所有細節。for 陳述式的一般格式是
\`for (初始化; 條件; 增量) { 陳述式 }\`
其中初始化表達式初始化迴圈控制變數，條件表達式是迴圈繼續條件，增量表達式遞增控制變數。
圖 4.3 更詳細地介紹了圖 4.2 的 for 陳述式。請注意，for 陳述式「包辦一切」——它指定了使用控制變數進行計數器控制迭代所需的每一個項目。for 陳述式中的三個表達式都是可選的。如果省略條件表達式，C 語言會假設迴圈繼續條件為真，從而創建一個無限迴圈。for 陳述式中的兩個分號是必需的。

## 4.5 for 陳述式：注意事項與觀察
1. 初始化、迴圈繼續條件和增量可以包含算術表達式。
2. 「增量」可以是負數（在這種情況下，它實際上是遞減，迴圈實際上是倒數）。
3. 如果迴圈繼續條件一開始就為假，則迴圈主體不執行。
4. 控制變數經常在迴圈主體中被印出或用於計算，但這不是必需的。
5. for 陳述式的流程圖與 while 陳述式非常相似。初始化只發生一次，而增量在每次執行主體陳述式後發生。

## 4.6 使用 for 陳述式的範例
for 陳述式可用於對 2 到 100 之間的所有偶數求和，或計算複利。C 語言不包含指數運算子，但我們可以使用標準函式庫的 \`pow(x, y)\` 函式來計算 x 的 y 次方。

## 4.7 switch 多重選擇陳述式
有時，一個演算法會包含一系列的決策，其中一個變數或表達式會針對它可能承擔的每個常數整數值進行單獨測試，並採取不同的動作。這稱為多重選擇。C 語言提供了 switch 多重選擇陳述式來處理這種決策。
switch 陳述式由一系列的 case 標籤、一個可選的 default case 以及為每個 case 執行的陳述式組成。break 陳述式用於立即退出 switch 陳述式。如果不使用 break，將會發生「穿透」(fall-through)，即其餘所有 case 的陳述式都將被執行。

## 4.8 do...while 迭代陳述式
do...while 迭代陳述式與 while 陳述式相似。在 while 陳述式中，迴圈繼續條件在迴圈主體執行之前於迴圈開始時進行測試。do...while 陳述式則在迴圈主體執行之後測試迴圈繼續條件。因此，迴圈主體至少會執行一次。

## 4.9 break 與 continue 陳述式
break 和 continue 陳述式用於改變控制流程。
- **break 陳述式**：在 while、for、do...while 或 switch 陳述式中執行時，會導致立即從該陳述式退出。
- **continue 陳述式**：在 while、for 或 do...while 陳述式中執行時，會跳過該控制陳述式主體中的其餘陳述式，並執行迴圈的下一次迭代。

## 4.10 邏輯運算子
邏輯運算子可用於透過組合簡單條件來形成更複雜的條件。邏輯運算子有 \`&&\` (邏輯 AND)、\`||\` (邏輯 OR) 和 \`!\` (邏輯 NOT)。
- 包含 \`&&\` 或 \`||\` 運算子的表達式只會評估到真假值已知為止。這稱為短路求值。

## 4.11 混淆相等 (==) 與賦值 (=) 運算子
一個常見的錯誤是意外地交換了 \`==\` (相等) 和 \`=\` (賦值) 運算子。這通常不會導致編譯錯誤，但可能導致執行時的邏輯錯誤。任何產生值的表達式都可以在任何控制陳述式的決策部分使用。如果值為 0，則視為假；如果非零，則為真。在 C 語言中，賦值會產生一個值。

## 4.12 結構化程式設計摘要
結構化程式設計產生的程式更容易理解、測試、除錯、修改，甚至可以證明其正確性。它僅涉及使用單入口/單出口的控制陳述式，並以兩種方式組合：堆疊和巢狀。所有程式都可以僅用三種控制形式來編寫：序列、選擇 (if) 和迭代 (while)。

## 4.13 安全的 C 程式設計
### 檢查函式 scanf 的回傳值
許多函式會回傳值以指示它們是否成功執行。例如，函式 \`scanf\` 回傳一個 \`int\`，表示讀取到的項目數量。如果這個值與您預期讀取的數量不符，那麼 \`scanf\` 就無法完成輸入操作。

### 範圍檢查
即使 scanf 操作成功，讀取到的值可能仍然無效。您應該透過範圍檢查來驗證輸入，以確保它們在預期的範圍內。
`},e=[{id:"preface",title:{en:"Preface",zh:"前言"},subtitle:{en:"About the book",zh:"關於本書"}},{id:"chapter1",title:{en:"Chapter 1: Intro to Computers, Internet & Web",zh:"第一章：電腦、網路與全球資訊網簡介"},subtitle:{en:"Basic concepts, hardware, software, and history",zh:"基本概念、硬體、軟體與歷史"}},{id:"chapter2",title:{en:"Chapter 2: Introduction to C Programming",zh:"第二章：C 語言程式設計入門"},subtitle:{en:"First programs, variables, arithmetic, and decision making",zh:"第一個程式、變數、算術與決策"}},{id:"chapter3",title:{en:"Chapter 3: Structured Program Development in C",zh:"第三章：C 的結構化程式開發"},subtitle:{en:"Algorithms, pseudocode, control structures",zh:"演算法、偽代碼、控制結構"}},{id:"chapter4",title:{en:"Chapter 4: C Program Control",zh:"第四章：C 程式控制"},subtitle:{en:"Essentials of repetition, for, do...while, switch",zh:"重複、for、do...while、switch"}},{id:"chapter5",title:{en:"Chapter 5: C Functions",zh:"第五章：C 函式"},subtitle:{en:"Function definitions, prototypes, recursion",zh:"函式定義、原型、遞迴"}},{id:"chapter6",title:{en:"Chapter 6: C Arrays",zh:"第六章：C 陣列"},subtitle:{en:"Defining, initializing, and using arrays",zh:"定義、初始化與使用陣列"}},{id:"chapter7",title:{en:"Chapter 7: C Pointers",zh:"第七章：C 指標"},subtitle:{en:"Pointer variables, operators, and pointer arithmetic",zh:"指標變數、運算子與指標算術"}},{id:"chapter8",title:{en:"Chapter 8: C Characters and Strings",zh:"第八章：C 字元與字串"},subtitle:{en:"Character handling and string manipulation functions",zh:"字元處理與字串操作函式"}},{id:"chapter9",title:{en:"Chapter 9: C Formatted Input/Output",zh:"第九章：C 格式化輸入/輸出"},subtitle:{en:"printf, scanf, field widths, and precision",zh:"printf、scanf、欄位寬度與精度"}},{id:"chapter10",title:{en:"Chapter 10: C Structures, Unions, Bit Manipulation",zh:"第十章：C 結構、聯合與位元操作"},subtitle:{en:"Structures, unions, bitwise operators, and bit fields",zh:"結構、聯合、位元運算子與位元欄位"}},{id:"chapter11",title:{en:"Chapter 11: C File Processing",zh:"第十一章：C 檔案處理"},subtitle:{en:"Sequential and random-access files",zh:"循序與隨機存取檔案"}},{id:"chapter12",title:{en:"Chapter 12: C Data Structures",zh:"第十二章：C 資料結構"},subtitle:{en:"Linked lists, stacks, queues, and trees",zh:"鏈結串列、堆疊、佇列與樹"}},{id:"chapter13",title:{en:"Chapter 13: C Preprocessor",zh:"第十三章：C 前置處理器"},subtitle:{en:"#define, #include, conditional compilation",zh:"#define、#include、條件編譯"}},{id:"chapter14",title:{en:"Chapter 14: Other C Topics",zh:"第十四章：其他 C 主題"},subtitle:{en:"Redirecting I/O, command-line arguments, exit",zh:"I/O 重導向、命令列參數、exit"}},{id:"chapter15",title:{en:"Chapter 15: C++ as a Better C",zh:"第十五章：C++ 作為更好的 C"},subtitle:{en:"Intro to Object Technology, iostream, references",zh:"物件技術入門、iostream、參考"}},{id:"chapter16",title:{en:"Chapter 16: Intro to Classes, Objects and Strings",zh:"第十六章：類別、物件與字串入門"},subtitle:{en:"Defining classes, member functions, constructors",zh:"定義類別、成員函式、建構函式"}},{id:"chapter17",title:{en:"Chapter 17: Classes: A Deeper Look",zh:"第十七章：深入探討類別"},subtitle:{en:"const objects, composition, friend functions, this pointer",zh:"const 物件、複合、友元函式、this 指標"}},{id:"chapter18",title:{en:"Chapter 18: Operator Overloading; Class string",zh:"第十八章：運算子重載；string 類別"},subtitle:{en:"Fundamentals, binary/unary operator overloading",zh:"基礎、二元/一元運算子重載"}},{id:"chapter19",title:{en:"Chapter 19: Object-Oriented Programming: Inheritance",zh:"第十九章：物件導向程式設計：繼承"},subtitle:{en:"Base classes, derived classes, protected members",zh:"基底類別、衍生類別、保護成員"}},{id:"chapter20",title:{en:"Chapter 20: Object-Oriented Programming: Polymorphism",zh:"第二十章：物件導向程式設計：多型"},subtitle:{en:"Virtual functions, abstract classes, dynamic binding",zh:"虛擬函式、抽象類別、動態綁定"}},{id:"chapter21",title:{en:"Chapter 21: Stream Input/Output: A Deeper Look",zh:"第二十一章：串流輸入/輸出深入探討"},subtitle:{en:"Stream states, manipulators, formatting",zh:"串流狀態、操縱元、格式化"}},{id:"chapter22",title:{en:"Chapter 22: Exception Handling: A Deeper Look",zh:"第二十二章：例外處理深入探討"},subtitle:{en:"try, catch, throw, stack unwinding",zh:"try、catch、throw、堆疊回溯"}},{id:"chapter23",title:{en:"Chapter 23: Introduction to Custom Templates",zh:"第二十三章：自訂範本入門"},subtitle:{en:"Class templates, function templates",zh:"類別範本、函式範本"}}],t={en:`# Content Coming Soon

This chapter content is currently being prepared and will be available in a future update.`,zh:`# 內容即將推出

本章節內容正在準備中，將在未來的更新中提供。`},p={preface:{title:e[0].title,content:r},chapter1:{title:e[1].title,content:s},chapter2:{title:e[2].title,content:l},chapter3:{title:e[3].title,content:c},chapter4:{title:e[4].title,content:d},chapter5:{title:e[5].title,content:t},chapter6:{title:e[6].title,content:t},chapter7:{title:e[7].title,content:t},chapter8:{title:e[8].title,content:t},chapter9:{title:e[9].title,content:t},chapter10:{title:e[10].title,content:t},chapter11:{title:e[11].title,content:t},chapter12:{title:e[12].title,content:t},chapter13:{title:e[13].title,content:t},chapter14:{title:e[14].title,content:t},chapter15:{title:e[15].title,content:t},chapter16:{title:e[16].title,content:t},chapter17:{title:e[17].title,content:t},chapter18:{title:e[18].title,content:t},chapter19:{title:e[19].title,content:t},chapter20:{title:e[20].title,content:t},chapter21:{title:e[21].title,content:t},chapter22:{title:e[22].title,content:t},chapter23:{title:e[23].title,content:t}};export{e as chapterList,m as exercises,u as glossaryData,h as problems,p as textbookData};
