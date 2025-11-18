
import type { ProgrammingExercise } from '../../../types';

export const exercises: ProgrammingExercise[] = [
  {
    id: 'c2.16', chapter: '2', number: '2.16',
    title_en: 'Arithmetic',
    title_zh: '算術運算',
    description_en: 'Write a program that asks the user to enter two numbers, obtains them from the user and prints their sum, product, difference, quotient and remainder.',
    description_zh: '編寫一個程式，要求使用者輸入兩個數字，從使用者那裡獲取它們，然後印出它們的和、積、差、商和餘數。',
    difficulty: 'easy',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    // Declare variables\n    int num1, num2;\n\n    // Prompt user for input\n    printf("Enter two numbers: ");\n    scanf("%d %d", &num1, &num2);\n\n    // Perform calculations and print results\n    printf("Sum is %d\\n", num1 + num2);\n    printf("Product is %d\\n", num1 * num2);\n    printf("Difference is %d\\n", num1 - num2);\n    printf("Quotient is %d\\n", num1 / num2);\n    printf("Remainder is %d\\n", num1 % num2);\n    \n    return 0;\n}`,
    sampleOutput: `Enter two numbers: 45 10\nSum is 55\nProduct is 450\nDifference is 35\nQuotient is 4\nRemainder is 5`
  },
  {
    id: 'c2.17', chapter: '2', number: '2.17',
    title_en: 'Final Velocity',
    title_zh: '末速度計算',
    description_en: 'Write a program that asks the user to enter the initial velocity (u), acceleration (a), and time (t) of an object, and prints the final velocity (v) and distance traversed (s), using the formulas: v = u + at and s = ut + (1/2)at²',
    description_zh: '編寫一個程式，要求使用者輸入物體的初速度(u)、加速度(a)和經過的時間(t)，並使用公式 v = u + at 和 s = ut + (1/2)at² 印出末速度 v 和行進距離 s。',
    difficulty: 'easy',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    double u, a, t;\n    double v, s;\n\n    printf("Enter initial velocity (u): ");\n    scanf("%lf", &u);\n\n    printf("Enter acceleration (a): ");\n    scanf("%lf", &a);\n\n    printf("Enter time elapsed (t): ");\n    scanf("%lf", &t);\n\n    v = u + a * t;\n    s = u * t + 0.5 * a * t * t;\n\n    printf("\\nFinal velocity (v) is: %.2f\\n", v);\n    printf("Distance traversed (s) is: %.2f\\n", s);\n    \n    return 0;\n}`,
    sampleOutput: `Enter initial velocity (u): 10\nEnter acceleration (a): 5\nEnter time elapsed (t): 12\n\nFinal velocity (v) is: 70.00\nDistance traversed (s) is: 480.00`
  },
  {
    id: 'c2.19', chapter: '2', number: '2.19',
    title_en: 'Arithmetic, Largest, and Smallest',
    title_zh: '算術、最大值與最小值',
    description_en: 'Write a program that inputs three different integers from the keyboard, then prints the sum, the average, the product, the smallest and the largest of these numbers. Use only the single-selection form of the if statement.',
    description_zh: '編寫一個程式，從鍵盤輸入三個不同的整數，然後印出這些數字的和、平均值、積、最小值和最大值。僅使用單選 if 陳述式。',
    difficulty: 'medium',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    int n1, n2, n3;\n    int sum, product;\n    float average;\n    int smallest, largest;\n\n    printf("Enter three different integers: ");\n    scanf("%d %d %d", &n1, &n2, &n3);\n\n    sum = n1 + n2 + n3;\n    average = (float)sum / 3.0;\n    product = n1 * n2 * n3;\n\n    printf("Sum is %d\\n", sum);\n    printf("Average is %.2f\\n", average);\n    printf("Product is %d\\n", product);\n\n    smallest = n1;\n    if (n2 < smallest) {\n        smallest = n2;\n    }\n    if (n3 < smallest) {\n        smallest = n3;\n    }\n    printf("Smallest is %d\\n", smallest);\n\n    largest = n1;\n    if (n2 > largest) {\n        largest = n2;\n    }\n    if (n3 > largest) {\n        largest = n3;\n    }\n    printf("Largest is %d\\n", largest);\n\n    return 0;\n}`,
    sampleOutput: `Enter three different integers: 13 27 14\nSum is 54\nAverage is 18.00\nProduct is 4914\nSmallest is 13\nLargest is 27`
  },
  {
    id: 'c2.20', chapter: '2', number: '2.20',
    title_en: 'Seconds to H:M:S',
    title_zh: '秒數轉換',
    description_en: 'Write a program that asks the user to enter the total time elapsed in seconds and converts it to hours:minutes:seconds. [Hint: Use the remainder operator]',
    description_zh: '編寫一個程式，要求使用者輸入經過的總秒數，並將其轉換為 時:分:秒 的格式。[提示：使用餘數運算子]',
    difficulty: 'easy',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    int total_seconds;\n    int hours, minutes, seconds;\n\n    printf("Enter total time elapsed in seconds: ");\n    scanf("%d", &total_seconds);\n\n    hours = total_seconds / 3600;\n    minutes = (total_seconds % 3600) / 60;\n    seconds = total_seconds % 60;\n\n    printf("%d seconds is equal to %d:%d:%d\\n", total_seconds, hours, minutes, seconds);\n\n    return 0;\n}`,
    sampleOutput: `Enter total time elapsed in seconds: 3723\n3723 seconds is equal to 1:2:3`
  },
    {
    id: 'c2.21', chapter: '2', number: '2.21',
    title_en: 'Shapes with Asterisks',
    title_zh: '星號圖形',
    description_en: 'Write a program that prints specific shapes using asterisks.',
    description_zh: '編寫一個程式，用星號印出指定的圖形。',
    difficulty: 'easy',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    printf("*********\\n*       *\\n*       *\\n*       *\\n*       *\\n*       *\\n*       *\\n*       *\\n*********\\n\\n");\n    printf("   ***   \\n *     * \\n*       *\\n*       *\\n*       *\\n*       *\\n*       *\\n *     * \\n   ***   \\n\\n");\n    printf("  *  \\n *** \\n*****\\n  *  \\n  *  \\n  *  \\n  *  \\n\\n");\n    printf("    *    \\n   * *   \\n  *   *  \\n *     * \\n*       *\\n *     * \\n  *   *  \\n   * *   \\n    *    \\n");\n    return 0;\n}`
  },
  {
    id: 'c2.23', chapter: '2', number: '2.23',
    title_en: 'Largest and Smallest Integers',
    title_zh: '最大與最小整數',
    description_en: 'Write a program that reads in three integers and then determines and prints the largest and the smallest integers in the group.',
    description_zh: '編寫一個程式，讀入三個整數，然後確定並印出這組數中的最大值和最小值。',
    difficulty: 'easy',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    int n1, n2, n3;\n    int smallest, largest;\n\n    printf("Enter three integers: ");\n    scanf("%d %d %d", &n1, &n2, &n3);\n\n    smallest = n1;\n    if (n2 < smallest) smallest = n2;\n    if (n3 < smallest) smallest = n3;\n\n    largest = n1;\n    if (n2 > largest) largest = n2;\n    if (n3 > largest) largest = n3;\n\n    printf("Smallest is %d\\n", smallest);\n    printf("Largest is %d\\n", largest);\n\n    return 0;\n}`
  },
  {
    id: 'c2.24', chapter: '2', number: '2.24',
    title_en: 'Odd or Even',
    title_zh: '奇數或偶數',
    description_en: 'Write a program that reads an integer and determines and prints whether it\'s odd or even.',
    description_zh: '編寫一個程式，讀入一個整數，然後確定並印出它是奇數還是偶數。',
    difficulty: 'easy',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    int num;\n\n    printf("Enter an integer: ");\n    scanf("%d", &num);\n\n    if (num % 2 == 0) {\n        printf("%d is even.\\n", num);\n    } else {\n        printf("%d is odd.\\n", num);\n    }\n    \n    return 0;\n}`
  },
  {
    id: 'c2.26', chapter: '2', number: '2.26',
    title_en: 'Multiples',
    title_zh: '倍數',
    description_en: 'Write a program that reads in two integers and determines and prints whether the first is a multiple of the second.',
    description_zh: '編寫一個程式，讀入兩個整數，然後確定並印出第一個數是否為第二個數的倍數。',
    difficulty: 'easy',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    int num1, num2;\n\n    printf("Enter two integers: ");\n    scanf("%d %d", &num1, &num2);\n\n    if (num2 != 0 && num1 % num2 == 0) {\n        printf("%d is a multiple of %d.\\n", num1, num2);\n    } else {\n        printf("%d is not a multiple of %d.\\n", num1, num2);\n    }\n\n    return 0;\n}`
  },
  {
    id: 'c2.29', chapter: '2', number: '2.29',
    title_en: 'Integer Value of a Character',
    title_zh: '字元的整數值',
    description_en: 'Write a C program that prints the integer equivalents of: A B C a b c 0 1 2 $ * + / and the blank character.',
    description_zh: '編寫一個 C 程式，印出以下字元的整數等價值：A B C a b c 0 1 2 $ * + / 以及空白字元。',
    difficulty: 'easy',
    type: 'programming',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    printf("A: %d\\n", 'A');\n    printf("B: %d\\n", 'B');\n    printf("C: %d\\n", 'C');\n    printf("a: %d\\n", 'a');\n    printf("b: %d\\n", 'b');\n    printf("c: %d\\n", 'c');\n    printf("0: %d\\n", '0');\n    printf("1: %d\\n", '1');\n    printf("2: %d\\n", '2');\n    printf("$: %d\\n", '$');\n    printf("*: %d\\n", '*');\n    printf("+: %d\\n", '+');\n    printf("/: %d\\n", '/');\n    printf("space: %d\\n", ' ');\n\n    return 0;\n}`
  },
  {
    id: 'c2.32', chapter: '2', number: '2.32',
    title_en: 'Body Mass Index Calculator',
    title_zh: '身體質量指數(BMI)計算機',
    description_en: 'Create a BMI calculator application that reads the user\'s weight and height, then calculates and displays the user\'s body mass index, along with the standard BMI categories.',
    description_zh: '建立一個 BMI 計算器應用程式，讀取使用者的體重和身高，然後計算並顯示其身體質量指數，同時顯示標準的 BMI 分類資訊。',
    difficulty: 'medium',
    type: 'making_a_difference',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    float weight_lb, height_in;\n    float bmi;\n\n    printf("Enter your weight in pounds: ");\n    scanf("%f", &weight_lb);\n    printf("Enter your height in inches: ");\n    scanf("%f", &height_in);\n\n    bmi = (weight_lb * 703) / (height_in * height_in);\n\n    printf("\\nYour BMI is: %.2f\\n\\n", bmi);\n    \n    printf("BMI VALUES\\n");\n    printf("Underweight: less than 18.5\\n");\n    printf("Normal:      between 18.5 and 24.9\\n");\n    printf("Overweight:  between 25 and 29.9\\n");\n    printf("Obese:       30 or greater\\n");\n\n    return 0;\n}`
  },
  {
    id: 'c2.33', chapter: '2', number: '2.33',
    title_en: 'Car-Pool Savings Calculator',
    title_zh: '共乘節省計算機',
    description_en: 'Create an application that calculates your daily driving cost based on total miles, gas cost, mileage, parking, and tolls.',
    description_zh: '建立一個應用程式，根據總里程、油價、油耗、停車費和過路費來計算您的每日駕駛成本。',
    difficulty: 'easy',
    type: 'making_a_difference',
    templateCode: `#include <stdio.h>\n\nint main(void) {\n    float miles, cost_gallon, avg_mpg, parking, tolls;\n    float daily_cost;\n\n    printf("Enter total miles driven per day: ");\n    scanf("%f", &miles);\n    printf("Enter cost per gallon of gasoline: ");\n    scanf("%f", &cost_gallon);\n    printf("Enter average miles per gallon: ");\n    scanf("%f", &avg_mpg);\n    printf("Enter parking fees per day: ");\n    scanf("%f", &parking);\n    printf("Enter tolls per day: ");\n    scanf("%f", &tolls);\n\n    daily_cost = (miles / avg_mpg) * cost_gallon + parking + tolls;\n\n    printf("\\nYour daily driving cost is: $%.2f\\n", daily_cost);\n\n    return 0;\n}`
  }
];
