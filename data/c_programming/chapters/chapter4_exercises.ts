
import type { ProgrammingExercise } from '../../../types';

export const exercises: ProgrammingExercise[] = [
  {
    id: 'c4.5', chapter: '4', number: '4.5',
    title_en: 'Find the Errors',
    title_zh: '找出錯誤',
    description_en: 'Find the error in each of the following. (Note: There may be more than one error.)\na) `for (a = 25, a <= 1, a--); { printf("%d\\n", a); }`\nb) The following code should print whether a given integer is odd or even: `switch (value) { case (value % 2 == 0): puts("Even"); case (value % 2 != 0): puts("Odd"); }`',
    description_zh: '找出下列各項中的錯誤。（註：可能有一個以上的錯誤。）\na) `for (a = 25, a <= 1, a--); { printf("%d\\n", a); }`\nb) 下列程式碼應該要印出給定的整數是奇數還是偶數：`switch (value) { case (value % 2 == 0): puts("Even"); case (value % 2 != 0): puts("Odd"); }`',
    difficulty: 'easy',
    type: 'short_answer'
  },
  {
    id: 'c4.9', chapter: '4', number: '4.9',
    title_en: 'Sum and Average of Integers',
    title_zh: '整數的總和與平均值',
    description_en: 'Write a program to sum a sequence of integers and calculate their average. Assume that the first integer read specifies the number of values to be entered.',
    description_zh: '編寫一個程式來加總一個整數序列並計算它們的平均值。假設讀取的第一個整數指定了要輸入的值的數量。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c4.10', chapter: '4', number: '4.10',
    title_en: 'Conversion Celsius to Fahrenheit',
    title_zh: '攝氏度轉華氏度',
    description_en: 'Write a program that converts temperatures from 30°C to 50°C to the Fahrenheit scale. The program should print a table displaying temperatures in the two scales side by side. [Hint: °F = (9/5)°C + 32]',
    description_zh: '編寫一個程式，將 30°C 到 50°C 的溫度轉換為華氏度。程式應印出一個並排顯示兩種溫標的表格。[提示：°F = (9/5)°C + 32]',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c4.12', chapter: '4', number: '4.12',
    title_en: 'Prime Numbers',
    title_zh: '質數',
    description_en: 'Write a program to calculate and print a list of all prime numbers from 1 to 100.',
    description_zh: '編寫一個程式來計算並印出 1 到 100 之間的所有質數列表。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c4.14', chapter: '4', number: '4.14',
    title_en: 'Factorials',
    title_zh: '階乘',
    description_en: 'Write a program that evaluates the factorials of the integers from 1 to 5. Print the results in tabular format. What difficulty might prevent you from calculating the factorial of 20?',
    description_zh: '編寫一個程式，計算 1 到 5 的整數的階乘。以表格格式印出結果。計算 20 的階乘可能會遇到什麼困難？',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c4.15', chapter: '4', number: '4.15',
    title_en: 'Modified Compound-Interest Program',
    title_zh: '修改後的複利程式',
    description_en: 'Modify the compound-interest program to repeat its steps for interest rates of 5%, 6%, 7%, 8%, 9%, and 10%. Use a for loop to vary the interest rate.',
    description_zh: '修改複利程式，使其對 5%、6%、7%、8%、9% 和 10% 的利率重複其步驟。使用 for 迴圈來改變利率。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c4.16', chapter: '4', number: '4.16',
    title_en: 'Triangle-Printing Program',
    title_zh: '三角形列印程式',
    description_en: 'Write a program that prints four different triangle patterns separately, one below the other, using for loops. All asterisks (*) should be printed by a single printf statement of the form printf("%s", "*");',
    description_zh: '編寫一個程式，使用 for 迴圈分別印出四種不同的三角形圖案，一個在另一個下面。所有星號 (*) 都應由 printf("%s", "*"); 形式的單一 printf 陳述式印出。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c4.17', chapter: '4', number: '4.17',
    title_en: 'Calculating Credit Limits',
    title_zh: '計算信用額度',
    description_en: 'A company has cut its customers\' credit limits in half. Write a program that analyzes the credit status of three customers. For each customer you\'re given an account number, credit limit before the recession, and current balance. Your program should calculate and print the new credit limit and determine which customers have balances that exceed their new credit limits.',
    description_zh: '一家公司將其客戶的信用額度減半。編寫一個程式，分析三位客戶的信用狀況。對於每位客戶，您將獲得帳號、衰退前的信用額度和當前餘額。您的程式應計算並印出新的信用額度，並確定哪些客戶的餘額超過了他們的新信用額度。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c4.18', chapter: '4', number: '4.18',
    title_en: 'Bar-Chart Printing Program',
    title_zh: '長條圖列印程式',
    description_en: 'Write a program that reads five numbers (each between 1 and 30). For each number read, your program should print a line containing that number of adjacent asterisks.',
    description_zh: '編寫一個程式，讀取五個數字（每個數字介於 1 和 30 之間）。對於讀取的每個數字，您的程式應印出一行包含該數量相鄰星號的線。',
    difficulty: 'easy',
    type: 'programming'
  },
  {
    id: 'c4.19', chapter: '4', number: '4.19',
    title_en: 'Calculating Sales',
    title_zh: '計算銷售額',
    description_en: 'An online retailer sells five different products. Write a program that reads a series of pairs of numbers (product number and quantity sold) and uses a switch statement to determine the retail price for each product. Your program should calculate and display the total retail value of all products sold.',
    description_zh: '一家線上零售商銷售五種不同的產品。編寫一個程式，讀取一系列數字對（產品編號和銷售數量），並使用 switch 陳述式來確定每種產品的零售價。您的程式應計算並顯示所有售出產品的總零售價值。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c4.27', chapter: '4', number: '4.27',
    title_en: 'Pythagorean Triples',
    title_zh: '畢氏三元數組',
    description_en: 'A right triangle can have sides that are all integers. The set of three integer values for the sides is called a Pythagorean triple. These three sides must satisfy the relationship that the sum of the squares of two of the sides is equal to the square of the hypotenuse. Find all Pythagorean triples for side1, side2, and the hypotenuse all no larger than 500. Use a triple-nested for loop.',
    description_zh: '直角三角形的三個邊可以是整數。這組三個整數值稱為畢氏三元數組。這三個邊必須滿足兩邊平方和等於斜邊平方的關係。找出 side1、side2 和斜邊都不大於 500 的所有畢氏三元數組。使用三重巢狀 for 迴圈。',
    difficulty: 'hard',
    type: 'programming'
  },
  {
    id: 'c4.28', chapter: '4', number: '4.28',
    title_en: 'Calculating Weekly Pay',
    title_zh: '計算週薪',
    description_en: 'A company pays its employees as managers (fixed salary), hourly workers (time-and-a-half for overtime), commission workers ($250 + 5.7% of sales), or pieceworkers. Write a program to compute the weekly pay for each employee. Use a switch to compute pay based on an employee\'s paycode.',
    description_zh: '一家公司支付其員工薪資的方式有：經理（固定週薪）、計時工（加班費為 1.5 倍）、佣金工（250 美元 + 5.7% 的銷售額）或計件工。編寫一個程式來計算每位員工的週薪。使用 switch 根據員工的薪資代碼計算薪資。',
    difficulty: 'hard',
    type: 'programming'
  },
  {
    id: 'c4.29', chapter: '4', number: '4.29',
    title_en: 'De Morgan\'s Laws',
    title_zh: '笛摩根定律',
    description_en: 'Use De Morgan\'s Laws to write equivalent expressions for each of the following, and then write a program to show that both the original expression and the new expression in each case are equivalent.\na) `! (x < 5) && ! (y >= 7)`\nb) `! (a == b) || !(g != 5)`\nc) `!((x <= 8) && (y > 4))`\nd) `!((i > 4) || (j <= 6))`',
    description_zh: '使用笛摩根定律為下列各項編寫等價的表達式，然後編寫一個程式來證明原始表達式和新表達式在每種情況下都是等價的。\na) `! (x < 5) && ! (y >= 7)`\nb) `! (a == b) || !(g != 5)`\nc) `!((x <= 8) && (y > 4))`\nd) `!((i > 4) || (j <= 6))`',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c4.31', chapter: '4', number: '4.31',
    title_en: 'Diamond-Printing Program',
    title_zh: '鑽石圖形列印程式',
    description_en: 'Write a program that prints a diamond shape. You may use printf statements that print either a single asterisk (*) or a single blank. Maximize your use of iteration (with nested for statements).',
    description_zh: '編寫一個程式來印出鑽石形狀。您可以使用只印出單一星號 (*) 或單一空格的 printf 陳述式。最大化地使用迭代（使用巢狀 for 陳述式）。',
    difficulty: 'medium',
    type: 'programming'
  },
  {
    id: 'c4.40', chapter: '4', number: '4.40',
    title_en: 'World Population Growth',
    title_zh: '世界人口增長',
    description_en: 'Get estimates for the current world population and its growth rate. Write a program that calculates world population growth each year for the next 75 years, using the simplifying assumption that the current growth rate will stay constant. Determine the year in which the population would be double what it is today.',
    description_zh: '獲取當前世界人口及其增長率的估計值。編寫一個程式，在假設當前增長率保持不變的情況下，計算未來 75 年每年的世界人口增長。確定人口將是今天兩倍的年份。',
    difficulty: 'medium',
    type: 'making_a_difference'
  },
  {
    id: 'c4.41', chapter: '4', number: '4.41',
    title_en: 'Tax Plan Alternatives; The “FairTax”',
    title_zh: '稅收計畫替代方案；「公平稅」',
    description_en: 'Research how the proposed FairTax works. Write a program that prompts the user to enter expenses in various categories (e.g., housing, food, clothing), then prints the estimated FairTax that person would pay.',
    description_zh: '研究擬議的公平稅 (FairTax) 如何運作。編寫一個程式，提示使用者輸入各種類別的開支（例如，住房、食品、衣物），然後印出該人將支付的預計公平稅。',
    difficulty: 'medium',
    type: 'making_a_difference'
  }
];
