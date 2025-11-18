
import type { ProgrammingExercise } from '../../../types';

export const exercises: ProgrammingExercise[] = [
  {
    id: 'c1.4', chapter: '1', number: '1.4',
    title_en: 'Categorize Hardware/Software',
    title_zh: '硬體/軟體分類',
    description_en: 'Categorize each of the following items as either hardware or software:\na) a microprocessor\nb) RAM\nc) Microsoft Visual Studio\nd) a preprocessor\ne) a scanner\nf) an internet browser',
    description_zh: '將下列各項分類為硬體或軟體：\na) 微處理器\nb) RAM\nc) Microsoft Visual Studio\nd) 前置處理器\ne) 掃描器\nf) 網路瀏覽器',
    difficulty: 'easy',
    type: 'short_answer'
  },
  {
    id: 'c1.9', chapter: '1', number: '1.9',
    title_en: 'Internet Negatives',
    title_zh: '網際網路的負面影響',
    description_en: 'Besides their numerous benefits, the Internet and the web have several downsides, such as privacy issues, identity theft, spam and malware. Research some of the negative aspects of the Internet. List five problems and describe what could possibly be done to help solve each.',
    description_zh: '除了眾多好處外，網際網路和網路也有一些負面影響，例如隱私問題、身份盜竊、垃圾郵件和惡意軟體。研究網際網路的一些負面層面。列出五個問題，並描述可以採取哪些措施來幫助解決每個問題。',
    difficulty: 'medium',
    type: 'making_a_difference'
  },
  {
    id: 'c1.10', chapter: '1', number: '1.10',
    title_en: 'Watch as an Object',
    title_zh: '手錶作為物件',
    description_en: 'You are probably wearing on your wrist one of the most common types of objects—a watch. Discuss how each of the following terms and concepts applies to the notion of a watch: object, attributes, behaviors, class, inheritance (consider, for example, an alarm clock), messages, encapsulation and information hiding.',
    description_zh: '你手腕上可能戴著最常見的物件類型之一——手錶。討論以下每個術語和概念如何應用於手錶的概念：物件、屬性、行為、類別、繼承（例如，考慮鬧鐘）、訊息、封裝和資訊隱藏。',
    difficulty: 'medium',
    type: 'short_answer'
  },
  {
    id: 'c1.11', chapter: '1', number: '1.11',
    title_en: 'Test-Drive: Carbon Footprint Calculator',
    title_zh: '試駕：碳足跡計算器',
    description_en: 'Some scientists believe that carbon emissions contribute significantly to global warming. Websites like TerraPass and Carbon Footprint provide carbon-footprint calculators. Test-drive these calculators to determine your carbon footprint. To prepare for programming your own later, use the web to research the formulas for calculating carbon footprints.',
    description_zh: '一些科學家認為碳排放對全球暖化有顯著影響。像 TerraPass 和 Carbon Footprint 這樣的網站提供了碳足跡計算器。試用這些計算器來確定您的碳足跡。為了準備稍後自己編寫程式，請使用網路研究計算碳足跡的公式。',
    difficulty: 'easy',
    type: 'making_a_difference'
  },
  {
    id: 'c1.12', chapter: '1', number: '1.12',
    title_en: 'Test-Drive: Body Mass Index Calculator',
    title_zh: '試駕：身體質量指數(BMI)計算器',
    description_en: 'Obesity causes significant increases in illnesses. To determine whether a person is overweight or obese, you can use the body mass index (BMI). The U.S. Department of Health provides a BMI calculator. Use it to calculate your own BMI. To prepare for programming your own later, research the formulas for calculating BMI.',
    description_zh: '肥胖會顯著增加疾病風險。要確定一個人是否超重或肥胖，您可以使用身體質量指數（BMI）。美國衛生部提供了一個 BMI 計算器。用它來計算您自己的 BMI。為了準備稍後自己編寫程式，請研究計算 BMI 的公式。',
    difficulty: 'easy',
    type: 'making_a_difference'
  },
  {
    id: 'c1.14', chapter: '1', number: '1.14',
    title_en: 'Gender Neutrality',
    title_zh: '性別中立',
    description_en: 'You\'ve been asked to create a program that can process a paragraph of text and replace gender-specific words with gender-neutral ones (e.g., replace “wife” with “spouse”). Explain the procedure you\'d use to read through a paragraph and manually perform these replacements. How might your procedure generate a strange term like “woperchild?”',
    description_zh: '您被要求創建一個程式，該程式可以處理一段文本並將特定性別的詞語替換為性別中立的詞語（例如，將「妻子」替換為「配偶」）。解釋您將用來閱讀段落並手動執行這些替換的程序。您的程序可能會如何產生像「woperchild」這樣的奇怪術語？',
    difficulty: 'medium',
    type: 'making_a_difference'
  }
];
