
import type { ProgrammingExercise } from '../../../types';

export const exercises: ProgrammingExercise[] = [
  {
    id: 'c3.10', chapter: '3', number: '3.10',
    title_en: 'Error Correction',
    title_zh: '錯誤修正',
    description_en: 'Identify and correct the errors in each of the following code snippets. [Note: There may be more than one error in each piece of code.]\na) `if (sales => 5000 ) puts("Sales are greater than or equal to $5000"); else puts("Sales are less than $5000");`\nb) `int x = 1, product = 0; while (x <= 10); { product *= x; ++x; }`\nc) `While (x <= 100 ) total =+ x; ++x;`',
    description_zh: '找出並修正下列每個程式碼片段中的錯誤。[注意：每個程式碼片段中可能有一個以上的錯誤。]\na) `if (sales => 5000 ) puts("Sales are greater than or equal to $5000"); else puts("Sales are less than $5000");`\nb) `int x = 1, product = 0; while (x <= 10); { product *= x; ++x; }`\nc) `While (x <= 100 ) total =+ x; ++x;`',
    difficulty: 'easy',
    type: 'short_answer'
  },
  {
    id: 'c3.16', chapter: '3', number: '3.16',
    title_en: 'Sales Tax',
    title_zh: '銷售稅計算',
    description_en: 'A retailer has to file a monthly sales tax report which lists the sales for the month and the amount of sales tax collected, at both the county and state levels. Develop a program that will input the total collections for a month, calculate the sales tax on the collections, and display the county and state taxes. Assume that states have a 4% sales tax and counties have a 5% sales tax.',
    description_zh: '零售商必須提交月度銷售稅報告，其中列出該月的銷售額以及在郡和州兩級徵收的銷售稅金額。開發一個程式，輸入一個月的總收款，計算收款的銷售稅，並顯示郡稅和州稅。假設州銷售稅為 4%，郡銷售稅為 5%。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c3.17', chapter: '3', number: '3.17',
    title_en: 'Mortgage Calculator',
    title_zh: '抵押貸款計算器',
    description_en: 'Develop a C program to calculate the interest accrued on a bank customer\'s mortgage. For each customer, the following facts are available: account number, mortgage amount, mortgage term (in years), and interest rate. The program should input each fact, calculate the total interest payable ( = mortgage amount × interest rate × mortgage term), and calculate the required monthly payment. The program should display the monthly payment rounded to the nearest dollar.',
    description_zh: '開發一個 C 程式來計算銀行客戶抵押貸款的應計利息。對於每個客戶，可獲得以下資訊：帳號、抵押貸款金額、抵押貸款期限（年）和利率。程式應輸入每個資訊，計算應付總利息（= 抵押貸款金額 × 利率 × 抵押貸款期限），並計算所需的每月還款額。程式應顯示四捨五入到最接近美元的每月還款額。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c3.18', chapter: '3', number: '3.18',
    title_en: 'Sales-Commission Calculator',
    title_zh: '銷售佣金計算器',
    description_en: 'A large chemical company pays its salespeople on a commission basis. The salespeople receive $200 per week plus 9% of their gross sales for that week. Develop a program that will input each salesperson\'s gross sales for last week and will calculate and display that salesperson\'s earnings. Process one salesperson\'s figures at a time.',
    description_zh: '一家大型化學公司按佣金制支付銷售人員薪水。銷售人員每週可獲得 200 美元，外加該週總銷售額的 9%。開發一個程式，輸入每位銷售人員上週的總銷售額，並計算和顯示該銷售人員的收入。一次處理一位銷售人員的數據。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c3.19', chapter: '3', number: '3.19',
    title_en: 'Interest Calculator',
    title_zh: '利息計算器',
    description_en: 'The simple interest on a loan is calculated by the formula: interest = principal * rate * days / 365; Develop a program that will input principal, rate and days for several loans, and will calculate and display the simple interest for each loan.',
    description_zh: '貸款的單利計算公式為：利息 = 本金 * 利率 * 天數 / 365；開發一個程式，輸入多筆貸款的本金、利率和天數，並計算和顯示每筆貸款的單利。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c3.20', chapter: '3', number: '3.20',
    title_en: 'Salary Calculator',
    title_zh: '薪資計算器',
    description_en: 'Develop a program that will determine the gross pay for each of several employees. The company pays “straight time” for the first 40 hours worked by each employee and pays "time-and-a-half" for all hours worked in excess of 40 hours. Your program should input the number of hours worked and the hourly rate for each employee, and determine and display the employee\'s gross pay.',
    description_zh: '開發一個程式來確定幾位員工的總薪資。公司對每位員工工作的前 40 小時支付「正常工資」，對超過 40 小時的所有工時支付「1.5 倍工資」。您的程式應輸入每位員工的工作時數和時薪，並確定和顯示員工的總薪資。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c3.22', chapter: '3', number: '3.22',
    title_en: 'Checking if a Number is Prime',
    title_zh: '檢查質數',
    description_en: 'A prime number is any natural number greater than 1 that is divisible only by 1 and by itself. Write a C program that reads an integer and determines whether it is a prime number or not.',
    description_zh: '質數是任何大於 1 的自然數，且只能被 1 和它本身整除。編寫一個 C 程式，讀取一個整數並判斷它是否為質數。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c3.23', chapter: '3', number: '3.23',
    title_en: 'Find the Largest Number',
    title_zh: '找出最大數',
    description_en: 'Write a program that inputs a series of 10 non-negative numbers and determines and prints the largest of the numbers. Your program should use three variables: counter, number, and largest.',
    description_zh: '編寫一個程式，輸入一系列 10 個非負數，並確定和印出其中最大的數字。您的程式應使用三個變數：計數器、數字和最大值。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c3.24', chapter: '3', number: '3.24',
    title_en: 'Tabular Output',
    title_zh: '表格輸出',
    description_en: 'Write a program that uses looping to print a table of N, N^2, N^3, and N^4 for N from 1 to 10. Use the tab escape sequence (\\t) to separate the columns.',
    description_zh: '編寫一個程式，使用迴圈印出 N 從 1 到 10 的 N、N^2、N^3 和 N^4 的表格。使用定位字元逸出序列 (\\t) 來分隔各欄。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c3.32', chapter: '3', number: '3.32',
    title_en: 'Square of Asterisks',
    title_zh: '星號正方形',
    description_en: 'Write a program that reads in the side of a square and then prints that square out of asterisks. Your program should work for squares of all side sizes between 1 and 20.',
    description_zh: '編寫一個程式，讀入一個正方形的邊長，然後用星號印出該正方形。您的程式應適用於邊長在 1 到 20 之間的所有正方形。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c3.33', chapter: '3', number: '3.33',
    title_en: 'Hollow Square of Asterisks',
    title_zh: '空心星號正方形',
    description_en: 'Modify the program you wrote in Exercise 3.32 so that it prints a hollow square. For example, if your program reads a size of 5, it should print a 5x5 hollow square.',
    description_zh: '修改您在練習 3.32 中編寫的程式，使其印出一個空心正方形。例如，如果您的程式讀取的大小為 5，它應該印出一個 5x5 的空心正方形。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c3.45', chapter: '3', number: '3.45',
    title_en: 'Factorial',
    title_zh: '階乘',
    description_en: 'The factorial of a nonnegative integer n is written n!. Write a program that reads a nonnegative integer and computes and prints its factorial.',
    description_zh: '非負整數 n 的階乘寫作 n!。編寫一個程式，讀取一個非負整數，並計算和印出其階乘。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c3.46', chapter: '3', number: '3.46',
    title_en: 'World Population Growth Calculator',
    title_zh: '世界人口增長計算器',
    description_en: 'Use the web to determine the current world population and the annual world population growth rate. Write an application that inputs these values, then displays the estimated world population after one, two, three, four and five years.',
    description_zh: '使用網路確定當前的世界人口和年度世界人口增長率。編寫一個應用程式，輸入這些值，然後顯示一年、兩年、三年、四年和五年後的預計世界人口。',
    difficulty: 'easy',
    type: 'making_a_difference'
  },
  {
    id: 'c3.47', chapter: '3', number: '3.47',
    title_en: 'Target-Heart-Rate Calculator',
    title_zh: '目標心率計算器',
    description_en: 'Create a program that reads the user\'s birthday and the current day (each consisting of the month, day and year). Your program should calculate and display the person\'s age (in years), the person\'s maximum heart rate (220 - age) and the person\'s target-heart-rate range (50-85% of max).',
    description_zh: '創建一個程式，讀取使用者的生日和當前日期（均包括月、日、年）。您的程式應計算並顯示此人的年齡（歲）、最大心率（220 - 年齡）和目標心率範圍（最大心率的 50-85%）。',
    difficulty: 'medium',
    type: 'making_a_difference'
  },
  {
    id: 'c3.48', chapter: '3', number: '3.48',
    title_en: 'Enforcing Privacy with Cryptography',
    title_zh: '用密碼學加強隱私',
    description_en: 'Write a program that encrypts a four-digit integer. Replace each digit with the result of adding 7 to the digit and getting the remainder after dividing by 10. Then swap the first digit with the third, and swap the second digit with the fourth. Print the encrypted integer. Write a separate application that decrypts it.',
    description_zh: '編寫一個加密四位數整數的程式。將每個數字替換為（該數字+7）除以 10 的餘數。然後交換第一位和第三位數字，交換第二位和第四位數字。印出加密後的整數。再編寫一個獨立的應用程式來解密它。',
    difficulty: 'hard',
    type: 'making_a_difference'
  }
];
