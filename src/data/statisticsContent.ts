import { TopicContent } from '../types/stats';

export const TOPICS_DATA: TopicContent[] = [
  {
    id: 1,
    slug: 'what-data-is-and-types',
    title: 'What Data Is & Basic Types',
    subtitle: 'Categorical vs. Numerical Data in Everyday Life',
    everydayContext: 'Bus routes, shopping receipts, and utility bills',
    badge: 'Foundation',
    teachingCard: {
      simpleExplanation:
        'Data is simply information we gather by asking, counting, or measuring. The easiest way to know what kind of data you have is to ask: "Does it make sense to do mathematics with it?"',
      everydayExampleTitle: 'Waiting for the Bus in Town',
      everydayExampleStory:
        'Imagine you are standing at a bus stop. You notice the bus route numbers (Route 24, Route 43, Route 73) and the number of passengers on board each one (18, 35, 42 passengers).',
      dataList: ['Route 24', 'Route 43', '18 passengers', '35 passengers'],
      units: 'labels & counts',
      stepByStep: [
        {
          step: 'Look at the bus numbers: 24, 43, 73',
          detail:
            'Even though these use digits, you would never calculate "24 + 43". A bus 24 plus a bus 43 does not make bus 67! They are labels or categories. This is Categorical data.',
          math: 'Route 24 = Category / Label',
        },
        {
          step: 'Look at the passenger counts: 18, 35, 42',
          detail:
            'Here, doing maths makes total sense: 18 + 35 = 53 total passengers. You can count them in whole numbers. This is Numerical (Counted) data.',
          math: '18 + 35 = 53 passengers (Numerical)',
        },
        {
          step: 'Check measured quantities (e.g. journey time 22.5 mins)',
          detail:
            'When you measure continuous things like time, weight, or distance that can have decimals, that is Numerical (Measured) data.',
          math: '22.5 minutes (Measured Numerical)',
        },
      ],
      result:
        'Test summary: If it is a name or code label (even with digits), it is Categorical. If you can meaningfully add, subtract, or average it, it is Numerical.',
      whyUseful:
        'Knowing the type of data stops you from making silly calculations (like calculating the "average phone number" or "average post code") and guides which summary tools to pick.',
      jargonBuster: [
        {
          term: 'Categorical Data',
          plainMeaning:
            'Data sorted into groups, categories, or labels (e.g., eye colour, post code, bus route).',
        },
        {
          term: 'Numerical Data (Counted)',
          plainMeaning:
            'Information gathered by counting distinct items in whole numbers (e.g., cups of tea, children, coins).',
        },
        {
          term: 'Numerical Data (Measured)',
          plainMeaning:
            'Information gathered with an instrument that can have fractions or decimals (e.g., weight in kg, time in minutes, room temperature).',
        },
      ],
      keyTakeaway:
        'The golden test is: "Does doing maths with these numbers make real-world sense?" House numbers and telephone numbers are categorical labels; the number of houses on a street is numerical.',
    },
    alternateExplanation: {
      title: 'A Simpler Look: Shoe Rack Analogy',
      analogy: 'Imagine looking at your family shoe rack by the front door.',
      exampleStory:
        'You see: Black boots, Brown loafers, Red trainers. That is Categorical (colours/styles). Then you count them: 6 pairs in total. That is Numerical (Counted). Then you check the heel height: 3.5 cm. That is Numerical (Measured).',
      dataList: ['Black boots', 'Brown loafers', '6 pairs', '3.5 cm heel'],
      units: 'items',
      stepByStep: [
        {
          step: 'Ask: Can I calculate Red + Brown?',
          detail: 'No, combining colours does not give an arithmetic total. It is Categorical.',
        },
        {
          step: 'Ask: Can I calculate 6 pairs - 2 pairs?',
          detail: 'Yes, 4 pairs left! That is Numerical counted data.',
        },
      ],
      result: 'Words and ID codes = Categorical. Quantities you count or measure = Numerical.',
      tip: 'Remember: A credit card number or passport number is just an ID code, not a mathematical quantity.',
    },
    practiceQuestion: {
      prompt:
        'A local community cafe tracks 4 things today: (A) Table number: 7, (B) Number of cups of tea sold: 45, (C) Milk temperature: 65.5°C, (D) Payment method: Card.',
      explainPrompt:
        'In your own words, explain how to decide whether "Table number: 7" is categorical or numerical. Does it make sense to do maths with it?',
      calculationPrompt:
        'How many cups of tea were sold today? (Enter the count number)',
      data: ['Table 7', 45, '65.5°C', 'Card'],
      units: 'cups',
      expectedAnswer: 45,
      answerType: 'number',
      sentenceFrame:
        'Table number 7 looks like a number, but it is actually [categorical / numerical] because doing maths with it [does / does not] make sense.',
      modelExplanation:
        'Table number 7 is categorical data because it is merely a location label for staff. You would never add Table 2 and Table 5 together to serve Table 7.',
      hint: 'Think about whether adding table numbers together tells you anything meaningful about the tables.',
    },
    deliberateMistake: {
      scenario:
        'A local baker creates an inventory sheet for the morning bake and writes down these notes for the team:',
      workedSteps: [
        {
          stepNum: 1,
          title: 'Item 1: Sourdough loaf price = £3.50',
          content: 'Classified as Numerical (Measured / Money) because we can total the revenue.',
          isErrorStep: false,
        },
        {
          stepNum: 2,
          title: 'Item 2: Loaves baked today = 24 loaves',
          content: 'Classified as Numerical (Counted) because it is a whole count of baked items.',
          isErrorStep: false,
        },
        {
          stepNum: 3,
          title: 'Item 3: Customer Receipt Number = 1042',
          content:
            'Classified as Numerical because 1042 is a four-digit number and we can add 1 to it to find the next receipt.',
          isErrorStep: true,
        },
      ],
      errorStepNumber: 3,
      exactMistakeDescription:
        'The baker incorrectly classified Receipt Number 1042 as numerical. A receipt number is an identifier label (categorical), not a measurement or quantity.',
      whyWrong:
        'A receipt number is just a unique tracking code. Adding two receipt numbers together (1042 + 1043) produces no meaningful mathematical quantity.',
      correctCorrection:
        'Receipt Number 1042 should be classified as Categorical data because it is an ID tag, not a quantity.',
      fullCorrectSolution:
        'Correct Solution:\n1. Loaf price (£3.50): Numerical (currency/measurement).\n2. Loaves baked (24): Numerical (counted).\n3. Receipt Number (1042): Categorical (label/identifier code). Even though it uses digits, doing arithmetic on receipt codes has no real-world meaning.',
      hints: [
        'Look closely at Step 3: what is the purpose of a receipt number?',
        'Does adding receipt 1042 and receipt 1043 tell you anything meaningful like total sales?',
        'Remember our test: "Does it make sense to do maths with it?" If it is just an identification label, it is categorical.',
      ],
    },
    suggestedSituations: [
      {
        title: 'Supermarket checkout receipt',
        scenario: 'A receipt lists loyalty card number, number of apples bought, and total weight.',
        suggestedNumbers: 'Card #8892, 6 apples, 1.2 kg weight',
      },
      {
        title: 'Football match program',
        scenario: 'A program lists player shirt numbers and the minutes each player played.',
        suggestedNumbers: 'Shirt #10, Shirt #9, 90 minutes played',
      },
      {
        title: 'Post office parcels',
        scenario: 'A clerk handles parcel tracking barcodes and package weights.',
        suggestedNumbers: 'Tracking code TRK901, weight 2.4 kg',
      },
    ],
    keyPointsRubric: [
      'Data is information collected by counting, measuring, or asking.',
      'The test is "does it make sense to do maths with it?", not whether it has digits or letters.',
      'Categorical data sorts into groups or labels (e.g., bus route, post code, eye colour).',
      'Numerical data can be counted (whole numbers like people, cups) or measured (continuous decimals like time, weight).',
    ],
  },
  {
    id: 2,
    slug: 'mean',
    title: 'The Mean (Equal Sharing)',
    subtitle: 'How Much Each Would Get If Shared Equally',
    everydayContext: 'Splitting electricity bills and coffee runs',
    badge: 'Central Tendency',
    teachingCard: {
      simpleExplanation:
        'The mean is what each person or day would get if we pooled all the values together and shared them out equally. To find it, add up all the values, then divide by how many values you have.',
      everydayExampleTitle: 'Sharing a Flat Electric Bill Over 4 Months',
      everydayExampleStory:
        'Four friends in a shared house look at their winter electric bills: Month 1: £40, Month 2: £60, Month 3: £50, Month 4: £50.',
      dataList: [40, 60, 50, 50],
      units: '£',
      stepByStep: [
        {
          step: 'Step 1: Add up all the values to find the grand total',
          detail: '40 + 60 + 50 + 50 = 200',
          math: '£40 + £60 + £50 + £50 = £200 total spend',
        },
        {
          step: 'Step 2: Count how many values you have',
          detail: 'There are 4 bills (one for each month).',
          math: 'Count = 4',
        },
        {
          step: 'Step 3: Divide the grand total by the count',
          detail: '200 divided by 4 gives 50.',
          math: '£200 ÷ 4 = £50 per month',
        },
      ],
      result:
        'The mean bill is £50. If the total electricity cost was split identically across the 4 months, each month would cost £50.',
      whyUseful:
        'It gives one single benchmark figure for budgeting. Notice: nobody actually had to pay exactly £50 every single month; it represents the balanced average.',
      jargonBuster: [
        {
          term: 'Mean',
          plainMeaning:
            'The sum of all values divided by the number of values. Commonly called "the average".',
        },
        {
          term: 'Sum',
          plainMeaning: 'The total you get when you add all the numbers together.',
        },
        {
          term: 'Count',
          plainMeaning: 'How many items or numbers are in your list.',
        },
      ],
      keyTakeaway:
        'The mean is the "equal share". Remember: divide by the total number of values in the list (which could be days, bills, or items, not always people).',
    },
    alternateExplanation: {
      title: 'A Simpler Look: Equalising Piles of Coins',
      analogy: 'Imagine 3 small jars with 10p, 20p, and 60p.',
      exampleStory:
        'Pour all the coins onto the table: 10 + 20 + 60 = 90p total. Now distribute them into the 3 jars so every jar has the exact same amount: 90 ÷ 3 = 30p per jar.',
      dataList: [10, 20, 60],
      units: 'p',
      stepByStep: [
        { step: 'Pool all coins', detail: '10p + 20p + 60p = 90p' },
        { step: 'Divide equally', detail: '90p ÷ 3 jars = 30p' },
      ],
      result: 'The mean is 30p per jar.',
      tip: 'The mean acts like a level balance bar.',
    },
    practiceQuestion: {
      prompt:
        'David tracks his daily coffee spending from Monday to Friday: Monday £3, Tuesday £4, Wednesday £2, Thursday £5, Friday £6.',
      explainPrompt:
        'In your own words, explain the idea of the mean to someone who has never heard of it. What does it tell David about his week?',
      calculationPrompt:
        'Calculate David’s mean daily coffee spend for the 5 days. (Enter the number in £)',
      data: [3, 4, 2, 5, 6],
      units: '£',
      expectedAnswer: 4,
      answerType: 'number',
      sentenceFrame:
        'The mean is the amount David would spend each day if he spent the [equal / different] amount every day. We add all 5 days to get [total], then divide by [count].',
      modelExplanation:
        'The mean is what each day would cost if David shared his total coffee spending equally across all 5 working days. We add £3 + £4 + £2 + £5 + £6 = £20, then divide by 5 days to get £4 per day.',
      hint: 'Add up the 5 spending numbers first (£20 total), then divide by 5.',
    },
    deliberateMistake: {
      scenario:
        'A group of 4 friends buy cinema tickets. The prices paid were: £10, £12, £14, and £16. A student calculates the mean ticket price:',
      workedSteps: [
        {
          stepNum: 1,
          title: 'Step 1: Add all the ticket prices',
          content: '£10 + £12 + £14 + £16 = £52 total.',
          isErrorStep: false,
        },
        {
          stepNum: 2,
          title: 'Step 2: Count the values',
          content: 'The student counts 4 friends plus the cinema ticket cashier, giving a count of 5.',
          isErrorStep: true,
        },
        {
          stepNum: 3,
          title: 'Step 3: Divide total by count',
          content: '£52 ÷ 5 = £10.40 mean ticket price.',
          isErrorStep: false,
        },
      ],
      errorStepNumber: 2,
      exactMistakeDescription:
        'In Step 2, the student divided by 5 instead of 4 because they included the cashier who did not buy a ticket.',
      whyWrong:
        'You must only divide by the count of the values you actually added (4 ticket prices), not unrelated people present.',
      correctCorrection:
        'There were 4 ticket values added, so the count is 4. The correct division is £52 ÷ 4 = £13.00.',
      fullCorrectSolution:
        'Correct Solution:\n1. Total spend = £10 + £12 + £14 + £16 = £52.\n2. Number of ticket values = 4.\n3. Mean price = £52 ÷ 4 = £13.00. (Each friend would pay £13 if shared equally).',
      hints: [
        'Look closely at Step 2: count how many numbers were added in Step 1.',
        'Did the cashier buy a ticket?',
        'Only count the values that are in your dataset. There were 4 ticket prices, not 5.',
      ],
    },
    suggestedSituations: [
      {
        title: 'Weekly grocery bills',
        scenario: 'Comparing your supermarket receipts over 4 weeks.',
        suggestedNumbers: '£45, £55, £50, £50 (Mean = £50)',
      },
      {
        title: 'Daily walking steps',
        scenario: 'Checking your fitness band step counts over 3 days.',
        suggestedNumbers: '6,000 steps, 8,000 steps, 10,000 steps (Mean = 8,000)',
      },
      {
        title: 'Fuel fill-ups',
        scenario: 'Cost of putting petrol in the car over 3 months.',
        suggestedNumbers: '£60, £70, £80 (Mean = £70)',
      },
    ],
    keyPointsRubric: [
      'The mean represents how much each would get if all values were pooled and shared out equally.',
      'Calculation: add all values together (sum), then divide by how many values there are (count).',
      'The divisor is the count of values in the list, not always people.',
      'Nobody in the data set actually needs to have the exact mean value.',
    ],
  },
  {
    id: 3,
    slug: 'median',
    title: 'The Median (The Middle Value)',
    subtitle: 'Finding the Fair Middle & Handling Extreme Outliers',
    everydayContext: 'Commute times, house prices, and salary discussions',
    badge: 'Central Tendency',
    teachingCard: {
      simpleExplanation:
        'The median is the true middle value when your data is arranged in order from smallest to largest. Exactly half the values are lower, and half are higher. It is robust because one crazy extreme number does not distort it.',
      everydayExampleTitle: 'Daily Commute to Work in Minutes',
      everydayExampleStory:
        'Aisha records her morning commute time over 5 days: 22, 25, 28, 30, and 85 minutes (due to an overturned lorry on Friday).',
      dataList: [22, 25, 28, 30, 85],
      units: 'minutes',
      stepByStep: [
        {
          step: 'Step 1: Always sort the numbers from smallest to largest first!',
          detail: '22, 25, 28, 30, 85 (already ordered here).',
          math: '[22, 25, 28, 30, 85]',
        },
        {
          step: 'Step 2: Find the exact middle position',
          detail:
            'With 5 numbers, cross off one from each end until one remains in the center: 28.',
          math: '2 numbers on left (22, 25) | 28 | 2 numbers on right (30, 85)',
        },
        {
          step: 'Step 3: What if there is an even number of values?',
          detail:
            'If you have an even count (e.g., 4 values: 10, 20, 30, 40), take the two middle numbers (20 and 30), add them up and divide by 2: (20 + 30) ÷ 2 = 25.',
          math: '(20 + 30) ÷ 2 = 25',
        },
      ],
      result:
        'The median commute is 28 minutes. Notice that the mean here is (22+25+28+30+85) ÷ 5 = 38 minutes! The mean was skewed by that one 85-minute disaster day, but 28 minutes tells you what a typical normal day feels like.',
      whyUseful:
        'When data has extreme values or "outliers" (like billionaire wages or traffic jams), the median gives a much fairer picture of what is "typical" than the mean.',
      jargonBuster: [
        {
          term: 'Median',
          plainMeaning: 'The value sitting directly in the middle after putting the numbers in order.',
        },
        {
          term: 'Outlier',
          plainMeaning:
            'An unusually high or low value that sits far away from the rest of the data.',
        },
        {
          term: 'Sorted Order',
          plainMeaning: 'Arranged from lowest to highest (or highest to lowest). Mandatory for the median!',
        },
      ],
      keyTakeaway:
        'Rule 1: Always sort the list first! Rule 2: If the count is even, average the two middle numbers together (the result might be a number not in your original list).',
    },
    alternateExplanation: {
      title: 'A Simpler Look: People Standing in a Height Line',
      analogy: 'Imagine 5 people standing in a queue for cinema tickets.',
      exampleStory:
        'If they stand randomly, the person in the middle seat is not the median height. But if you ask them to line up by height from shortest to tallest, the person standing right in the center has an equal number of shorter people to their left and taller people to their right. That person is the median.',
      dataList: [150, 162, 170, 178, 195],
      units: 'cm',
      stepByStep: [
        { step: 'Line up by height', detail: 'Shortest to tallest' },
        { step: 'Pick the middle person', detail: 'The person in position 3' },
      ],
      result: 'Median height is 170 cm.',
      tip: 'Sorting is non-negotiable. Without sorting, there is no median!',
    },
    practiceQuestion: {
      prompt:
        'An internet provider tests home broadband speeds on 6 different evenings (in Mbps): 32, 45, 18, 50, 22, 38.',
      explainPrompt:
        'Explain step-by-step how to find the median when there is an even number of values (like these 6 readings). Why must you sort first?',
      calculationPrompt:
        'Find the median broadband speed for these 6 evenings. (Enter the number in Mbps)',
      data: [18, 22, 32, 38, 45, 50],
      units: 'Mbps',
      expectedAnswer: 35,
      answerType: 'number',
      sentenceFrame:
        'First, I sort the numbers: [18, 22, 32, 38, 45, 50]. Because there are 6 values, I take the two middle numbers [32 and 38], add them, and divide by 2.',
      modelExplanation:
        'First, arrange the speeds from smallest to largest: 18, 22, 32, 38, 45, 50. Since there are 6 readings (an even number), the middle falls between the 3rd and 4th values (32 and 38). Add them: 32 + 38 = 70. Divide by 2: 70 ÷ 2 = 35 Mbps.',
      hint: 'Sort the 6 numbers first: 18, 22, 32, 38, 45, 50. Then find the halfway point between 32 and 38.',
    },
    deliberateMistake: {
      scenario:
        'A gardener records midday temperatures in degrees Celsius over 5 days: 19°C, 24°C, 15°C, 21°C, 18°C. A student writes this solution:',
      workedSteps: [
        {
          stepNum: 1,
          title: 'Step 1: Inspect the list of 5 temperatures',
          content: 'Values: 19, 24, 15, 21, 18.',
          isErrorStep: false,
        },
        {
          stepNum: 2,
          title: 'Step 2: Pick the middle number',
          content:
            'The student identifies the 3rd number in the list: "The middle number is 15°C, so the median is 15°C."',
          isErrorStep: true,
        },
        {
          stepNum: 3,
          title: 'Step 3: State the conclusion',
          content: 'The median temperature is 15°C.',
          isErrorStep: false,
        },
      ],
      errorStepNumber: 2,
      exactMistakeDescription:
        'The student picked the middle item from the unsorted list without sorting the temperatures from lowest to highest first.',
      whyWrong:
        'The median is only defined on an ordered list. In the raw list, 15 is actually the lowest temperature of the week, not the middle!',
      correctCorrection:
        'Sort the temperatures first: 15, 18, 19, 21, 24. The true middle (3rd value) is 19°C.',
      fullCorrectSolution:
        'Correct Solution:\n1. Sort from smallest to largest: 15, 18, 19, 21, 24.\n2. Pick the value right in the middle: 19°C.\n(Notice: 15 is the minimum, while 19°C is the true median).',
      hints: [
        'Look at Step 2: did the student do the essential first step before picking the middle?',
        'Are the numbers 19, 24, 15, 21, 18 sorted from smallest to largest?',
        'You must sort first! What is the middle number once you sort them properly?',
      ],
    },
    suggestedSituations: [
      {
        title: 'Weekly house sale prices on a street',
        scenario: '4 normal terraced homes and 1 mansion.',
        suggestedNumbers: '£220k, £230k, £240k, £250k, £2,000k (Median = £240k)',
      },
      {
        title: 'Waiting times at the dentist',
        scenario: '5 patient appointments in minutes.',
        suggestedNumbers: '10, 12, 15, 18, 45 mins (Median = 15 mins)',
      },
      {
        title: 'Prices of winter coats',
        scenario: 'Checking prices across 4 department stores.',
        suggestedNumbers: '£60, £80, £100, £120 (Median = £90)',
      },
    ],
    keyPointsRubric: [
      'The median is the middle value after sorting from smallest to largest (or largest to smallest).',
      'It splits data in half: equal number of values above and below.',
      'If the count is even, add the two middle values and divide by 2 (the result may not be in the original list).',
      'Extreme high or low values (outliers) barely move the median, making it a fairer "typical" value than the mean when data is skewed.',
    ],
  },
  {
    id: 4,
    slug: 'mode',
    title: 'The Mode (The Most Popular)',
    subtitle: 'The Only Average That Works for Words and Categories',
    everydayContext: 'Bakery bestsellers, shoe sizes, and voting',
    badge: 'Central Tendency',
    teachingCard: {
      simpleExplanation:
        'The mode is simply the value that appears most frequently in your data. An easy way to remember it is: "Mode = Most". It is the only measure of central tendency that works for words and categories!',
      everydayExampleTitle: 'A Coffee Shop’s Milk Choices',
      everydayExampleStory:
        'A barista serves 7 customers in the morning: Oat, Cow, Oat, Soya, Oat, Almond, Cow milk.',
      dataList: ['Oat', 'Cow', 'Oat', 'Soya', 'Oat', 'Almond', 'Cow'],
      units: 'orders',
      stepByStep: [
        {
          step: 'Step 1: Count how many times each option appears',
          detail: 'Oat appears 3 times. Cow appears 2 times. Soya appears 1 time. Almond appears 1 time.',
          math: 'Oat: 3 | Cow: 2 | Soya: 1 | Almond: 1',
        },
        {
          step: 'Step 2: Find which one has the highest count',
          detail: 'Oat has the highest count (3 times).',
          math: 'Most frequent = Oat',
        },
        {
          step: 'Step 3: Can there be more than one mode, or no mode?',
          detail:
            'Yes! If Oat and Cow both had 3 votes, both would be modes (bimodal). If every milk had exactly 1 order, there would be no mode.',
          math: 'Can be unimodal, bimodal, or no mode',
        },
      ],
      result:
        'The mode is Oat milk. You cannot calculate the "mean" or "median" of Oat, Cow and Soya milk because they are words, but you can find the mode!',
      whyUseful:
        'Shopkeepers and planners use the mode to decide what stock to buy (e.g., shoe sizes, most popular bus departure time, most popular meal).',
      jargonBuster: [
        {
          term: 'Mode',
          plainMeaning: 'The value or item that appears most often in a dataset.',
        },
        {
          term: 'Bimodal',
          plainMeaning: 'When two different values tie for the top frequency.',
        },
        {
          term: 'No Mode',
          plainMeaning: 'When every value in the dataset appears the exact same number of times.',
        },
      ],
      keyTakeaway:
        'Mode = Most. It is the only average that works with categorical data (words, labels, choices). A list can have one mode, multiple modes, or no mode at all.',
    },
    alternateExplanation: {
      title: 'A Simpler Look: Shoe Shop Inventory',
      analogy: 'Imagine a shoe shop manager restocking the shelves.',
      exampleStory:
        'The manager looks at shoes sold today: Size 5, Size 7, Size 7, Size 7, Size 9, Size 11. Size 7 sold 3 times, more than any other size. The mean shoe size might be 7.67, which nobody can buy! But the mode is Size 7, which tells the manager exactly what shoe to order.',
      dataList: [5, 7, 7, 7, 9, 11],
      units: 'sizes',
      stepByStep: [
        { step: 'Tally sales', detail: 'Size 7 sold 3 pairs' },
        { step: 'Pick the winner', detail: 'Mode is 7' },
      ],
      result: 'Mode is size 7.',
      tip: 'The mode always exists as a real item that someone actually chose.',
    },
    practiceQuestion: {
      prompt:
        'A community center polls members for their favorite afternoon biscuit: Digestive, Custard Cream, Bourbon, Digestive, Bourbon, Rich Tea, Bourbon.',
      explainPrompt:
        'In your own words, explain what the mode is and why it works for biscuit names while the mean does not.',
      calculationPrompt:
        'Which biscuit is the mode in this survey? (Enter the biscuit name)',
      data: ['Digestive', 'Custard Cream', 'Bourbon', 'Digestive', 'Bourbon', 'Rich Tea', 'Bourbon'],
      units: 'biscuit',
      expectedAnswer: 'Bourbon',
      answerType: 'text',
      sentenceFrame:
        'The mode means the [most / least] common value. It works for biscuit names because you cannot [add / count] words to find a mean, but you can count which biscuit appears the most.',
      modelExplanation:
        'The mode is the most frequently occurring value ("mode = most"). Bourbon appears 3 times, Digestive 2 times, Custard Cream 1, and Rich Tea 1. You cannot add biscuit names together to compute a mean, but you can count their popularity.',
      hint: 'Count how many times Bourbon appears compared to Digestive.',
    },
    deliberateMistake: {
      scenario:
        'A fitness trainer records how many days a week 5 gym members attend: 2, 4, 3, 5, 1. A student analyses the data:',
      workedSteps: [
        {
          stepNum: 1,
          title: 'Step 1: Put the attendance counts in order',
          content: 'Ordered list: 1, 2, 3, 4, 5.',
          isErrorStep: false,
        },
        {
          stepNum: 2,
          title: 'Step 2: Find the mode',
          content:
            'The student states: "The mode is 3 because 3 is sitting in the center of the list."',
          isErrorStep: true,
        },
        {
          stepNum: 3,
          title: 'Step 3: Conclude',
          content: 'Conclusion: The mode is 3 days.',
          isErrorStep: false,
        },
      ],
      errorStepNumber: 2,
      exactMistakeDescription:
        'The student confused the mode with the median. In Step 2, they picked the middle value (3) instead of looking for the most frequent value.',
      whyWrong:
        'The mode is the value that appears most often. In the list 1, 2, 3, 4, 5, every number appears exactly once, which means there is NO mode!',
      correctCorrection:
        'Every number appears only once, so there is no mode for this data set. 3 is the median, not the mode.',
      fullCorrectSolution:
        'Correct Solution:\n1. Frequency tally: 1 (once), 2 (once), 3 (once), 4 (once), 5 (once).\n2. No value appears more than once.\n3. Conclusion: There is NO mode. (The student mistakenly calculated the median instead).',
      hints: [
        'Look at Step 2: what definition did the student use? Middle or most frequent?',
        'Does the number 3 appear more times than 1, 2, 4, or 5?',
        'Remember: "Mode = Most". If every item appears only once, what is the mode?',
      ],
    },
    suggestedSituations: [
      {
        title: 'Favourite sandwich filling in the office',
        scenario: 'Colleagues ordering lunch fillings.',
        suggestedNumbers: 'Cheese, Ham, Cheese, Tuna, Cheese, Egg (Mode = Cheese)',
      },
      {
        title: 'T-shirt sizes sold at a concert',
        scenario: 'Sizes S, M, M, L, XL, M.',
        suggestedNumbers: 'Mode = Medium',
      },
      {
        title: 'Customer star ratings on a recipe',
        scenario: 'Reviews: 5, 5, 4, 5, 3, 4 stars.',
        suggestedNumbers: 'Mode = 5 stars',
      },
    ],
    keyPointsRubric: [
      'The mode is the value that appears most frequently ("mode = most").',
      'It is the only measure of central tendency that works for categorical (word) data.',
      'A dataset can have one mode, more than one mode (bimodal/multimodal), or no mode at all if all values appear with equal frequency.',
    ],
  },
  {
    id: 5,
    slug: 'range',
    title: 'The Range (The Spread)',
    subtitle: 'Measuring Consistency & How Outliers Stretch the Gap',
    everydayContext: 'Temperature swings, price differences, and delivery times',
    badge: 'Spread / Dispersion',
    teachingCard: {
      simpleExplanation:
        'The range measures how spread out your numbers are. It is calculated by taking the largest value and subtracting the smallest value. A small range means consistency; a large range means wide variation.',
      everydayExampleTitle: 'Weekly Forecast Temperatures in Autumn',
      everydayExampleStory:
        'The weather forecast predicts the midday temperature in degrees Celsius over 5 days: 14°C, 16°C, 17°C, 15°C, and 22°C.',
      dataList: [14, 16, 17, 15, 22],
      units: '°C',
      stepByStep: [
        {
          step: 'Step 1: Identify the largest number (maximum)',
          detail: 'The warmest day is 22°C.',
          math: 'Maximum = 22°C',
        },
        {
          step: 'Step 2: Identify the smallest number (minimum)',
          detail: 'The coolest day is 14°C.',
          math: 'Minimum = 14°C',
        },
        {
          step: 'Step 3: Subtract the smallest from the largest',
          detail: '22 minus 14 equals 8.',
          math: 'Range = 22 - 14 = 8°C',
        },
      ],
      result:
        'The range is 8°C. This tells you the temperature swings by 8 degrees across the week.',
      whyUseful:
        'A commuter train might have a mean travel time of 30 minutes, but if its range is 45 minutes (sometimes 20 mins, sometimes 65 mins), it is totally unreliable! Range measures consistency.',
      jargonBuster: [
        {
          term: 'Range',
          plainMeaning: 'The difference between the highest and lowest numbers in a set.',
        },
        {
          term: 'Spread',
          plainMeaning: 'How far apart or scattered the data points are from each other.',
        },
        {
          term: 'Maximum & Minimum',
          plainMeaning: 'The single highest and single lowest values in your data.',
        },
      ],
      keyTakeaway:
        'Range = Largest value minus Smallest value. It shows how spread out the data is. Just one extreme number can stretch the range massively.',
    },
    alternateExplanation: {
      title: 'A Simpler Look: Delivery Window Time',
      analogy: 'Imagine waiting for two parcel delivery couriers.',
      exampleStory:
        'Courier A arrives between 2:00 PM and 2:15 PM (Range = 15 minutes). Courier B arrives between 9:00 AM and 5:00 PM (Range = 8 hours). Both might have an "average" time of 1:00 PM, but Courier A has a tight, predictable range, while Courier B has a huge, inconvenient spread.',
      dataList: ['Courier A: 15 mins range', 'Courier B: 480 mins range'],
      units: 'minutes',
      stepByStep: [
        { step: 'Find the gap', detail: '8 hours vs 15 minutes' },
        { step: 'Evaluate reliability', detail: 'Smaller range = more predictable' },
      ],
      result: 'Smaller range indicates tighter consistency.',
      tip: 'Remember: Range is one single number (the difference), not two numbers written together.',
    },
    practiceQuestion: {
      prompt:
        'Sarah tracks her weekly grocery bill over 5 weeks: Week 1 £42, Week 2 £48, Week 3 £39, Week 4 £65, Week 5 £46.',
      explainPrompt:
        'In your own words, explain what the range tells Sarah about her grocery spending. How does she calculate it?',
      calculationPrompt:
        'Calculate the range of Sarah’s grocery bills. (Enter the number in £)',
      data: [42, 48, 39, 65, 46],
      units: '£',
      expectedAnswer: 26,
      answerType: 'number',
      sentenceFrame:
        'The range tells Sarah how much her bills [spread / average]. She takes the largest bill [£65] and subtracts the smallest bill [£39] to get [£26].',
      modelExplanation:
        'The range measures how much Sarah’s grocery spending varies from her cheapest week to her most expensive week. We find the largest bill (£65) and subtract the smallest bill (£39): £65 - £39 = £26.',
      hint: 'Find the highest bill (£65) and the lowest bill (£39), then subtract: 65 - 39.',
    },
    deliberateMistake: {
      scenario:
        'A delivery driver records parcel weights on their morning round: 3kg, 7kg, 12kg, 2kg, 9kg. A trainee calculates the range:',
      workedSteps: [
        {
          stepNum: 1,
          title: 'Step 1: Identify the largest parcel weight',
          content: 'The heaviest parcel is 12kg.',
          isErrorStep: false,
        },
        {
          stepNum: 2,
          title: 'Step 2: Identify the comparison weight',
          content: 'The trainee looks at the very first number in the list and picks 3kg.',
          isErrorStep: true,
        },
        {
          stepNum: 3,
          title: 'Step 3: Calculate the difference',
          content: '12kg - 3kg = 9kg. The trainee states the range is 9kg.',
          isErrorStep: false,
        },
      ],
      errorStepNumber: 2,
      exactMistakeDescription:
        'In Step 2, the trainee subtracted the first number in the list (3kg) instead of finding the true minimum parcel weight (2kg).',
      whyWrong:
        'The range must always be Largest minus Smallest. 3kg is not the smallest parcel in the list; 2kg is the smallest.',
      correctCorrection:
        'The smallest weight is 2kg. The correct range is 12kg - 2kg = 10kg.',
      fullCorrectSolution:
        'Correct Solution:\n1. Maximum weight = 12kg.\n2. Minimum weight = 2kg.\n3. Range = 12kg - 2kg = 10kg. (The range is 10kg, showing the full spread from lightest to heaviest).',
      hints: [
        'Look at Step 2: did the trainee find the absolute smallest number in the whole list?',
        'Look at the list: 3kg, 7kg, 12kg, 2kg, 9kg. Which parcel is actually the lightest?',
        'The lightest parcel is 2kg, not 3kg. What is 12 minus 2?',
      ],
    },
    suggestedSituations: [
      {
        title: 'Electricity bills across seasons',
        scenario: 'Comparing summer and winter bills.',
        suggestedNumbers: 'Lowest £35, Highest £115 (Range = £80)',
      },
      {
        title: 'Commute times on a train route',
        scenario: 'Shortest journey 25 mins, longest delay 70 mins.',
        suggestedNumbers: 'Range = 45 mins',
      },
      {
        title: 'Price of a takeaway pizza in town',
        scenario: 'Cheapest £6, most expensive gourmet £18.',
        suggestedNumbers: 'Range = £12',
      },
    ],
    keyPointsRubric: [
      'The range is calculated as largest value minus smallest value (Maximum - Minimum).',
      'It measures the spread or dispersion of the data.',
      'A single extreme value (outlier) can make the range very large.',
      'Range is expressed in the same units as the original data.',
    ],
  },
  {
    id: 6,
    slug: 'reading-charts',
    title: 'Reading Simple Charts',
    subtitle: 'Bar Charts, Pictograms, and Simple Line Charts',
    everydayContext: 'Utility monitors, phone screen-time, and health apps',
    badge: 'Data Visualisation',
    teachingCard: {
      simpleExplanation:
        'Charts help us see patterns instantly. Before reading the bars or lines, ALWAYS follow this 4-step checklist: 1. Read the Title, 2. Check the Axis Labels, 3. Check the Units, and 4. Check the Scale (what does each grid line or symbol stand for?).',
      everydayExampleTitle: 'Weekly Fruit Intake Bar Chart',
      everydayExampleStory:
        'Priya checks her phone wellness app, which shows a bar chart of fruit portions eaten from Monday to Friday: Mon: 2, Tue: 4, Wed: 3, Thu: 5, Fri: 1.',
      dataList: ['Mon: 2', 'Tue: 4', 'Wed: 3', 'Thu: 5', 'Fri: 1'],
      units: 'portions',
      stepByStep: [
        {
          step: 'Check Title: "Daily Fruit Portions"',
          detail: 'Tells you what information is being communicated.',
          math: 'Context established',
        },
        {
          step: 'Check Axes & Units: Days of week (horizontal) vs Portions (vertical)',
          detail: 'The vertical axis starts at 0 and counts up in steps of 1.',
          math: 'Vertical scale = 0, 1, 2, 3, 4, 5',
        },
        {
          step: 'Inspect the Bars',
          detail:
            'Thursday is the tallest bar (5 portions). Friday is the shortest bar (1 portion).',
          math: 'Tallest = Thu (5) | Shortest = Fri (1)',
        },
      ],
      result:
        'Following the checklist prevents misinterpreting charts and lets you spot trends and extremes easily.',
      whyUseful:
        'Charts are everywhere in news and bills. Reading the scale and units first stops you from being misled by fancy visual graphics.',
      jargonBuster: [
        {
          term: 'Bar Chart',
          plainMeaning: 'Uses bars of varying height or length to compare quantities between categories.',
        },
        {
          term: 'Pictogram',
          plainMeaning: 'Uses small pictures or icons to represent numbers (e.g., 1 icon = 10 items).',
        },
        {
          term: 'Line Chart',
          plainMeaning: 'Connects data points with lines to show how a number changes over time.',
        },
        {
          term: 'Axis Scale',
          plainMeaning: 'The numbering and spacing on the edges of the chart (e.g. 0, 10, 20, 30).',
        },
      ],
      keyTakeaway:
        'Never jump straight to the bars. Read the Title, Axis labels, Units, and Scale first. On pictograms, always check the key to see what one symbol represents!',
    },
    alternateExplanation: {
      title: 'A Simpler Look: A Pictogram Key',
      analogy: 'Imagine a community library chart with book icons.',
      exampleStory:
        'The chart shows: Monday [📚📚], Tuesday [📚📚📚]. Before saying "Monday only had 2 books", look at the key: "Key: 1 📚 = 10 books borrowed". So Monday actually had 20 books, and Tuesday had 30 books!',
      dataList: ['Key: 1 icon = 10 books', 'Mon: 2 icons (20)', 'Tue: 3 icons (30)'],
      units: 'books',
      stepByStep: [
        { step: 'Find the key', detail: '1 symbol = 10 books' },
        { step: 'Multiply symbols by key', detail: '2 × 10 = 20 books' },
      ],
      result: 'Always verify what each symbol or grid step represents.',
      tip: 'The key unlocks the chart!',
    },
    practiceQuestion: {
      prompt:
        'Look at the interactive chart below showing hours of sleep recorded by a fitness tracker: Mon 7 hrs, Tue 6 hrs, Wed 8 hrs, Thu 5 hrs, Fri 9 hrs.',
      explainPrompt:
        'Explain why it is critical to read the title, axis labels, and scale before looking at the height of the bars.',
      calculationPrompt:
        'What was the highest number of sleep hours recorded on any night? (Enter the number)',
      data: [7, 6, 8, 5, 9],
      units: 'hours',
      expectedAnswer: 9,
      answerType: 'number',
      sentenceFrame:
        'Before looking at the bars, I must check the [title and scale] so I know what the bars mean. The highest night was Friday with [9] hours.',
      modelExplanation:
        'Checking the title, axis labels, units, and scale ensures you know what is being measured and what each grid line represents. Friday had the tallest bar at 9 hours of sleep.',
      hint: 'Look at the tallest bar on Friday and read across to the vertical axis scale.',
    },
    deliberateMistake: {
      scenario:
        'A local council publishes a rainfall bar chart for the week. The vertical axis has grid marks labelled 0, 10, 20, 30, 40 mm. A resident reads Wednesday’s bar, which reaches the 4th line up (marked 40mm):',
      workedSteps: [
        {
          stepNum: 1,
          title: 'Step 1: Check Wednesday’s bar height',
          content: 'Wednesday’s bar reaches the 4th line on the vertical axis.',
          isErrorStep: false,
        },
        {
          stepNum: 2,
          title: 'Step 2: Read the value',
          content:
            'The resident says: "The bar is 4 blocks high, so Wednesday had 4 mm of rain."',
          isErrorStep: true,
        },
        {
          stepNum: 3,
          title: 'Step 3: State the summary',
          content: 'Wednesday was very dry with only 4 mm.',
          isErrorStep: false,
        },
      ],
      errorStepNumber: 2,
      exactMistakeDescription:
        'The resident counted the grid lines (4 lines) instead of reading the axis scale numbers (where line 4 represents 40mm).',
      whyWrong:
        'Each grid line represents 10mm of rainfall, not 1mm. 4 blocks × 10mm = 40mm of heavy rain, not 4mm!',
      correctCorrection:
        'The 4th line is marked 40mm. Wednesday had 40mm of rain.',
      fullCorrectSolution:
        'Correct Solution:\n1. Check the vertical axis scale: 0, 10, 20, 30, 40mm.\n2. Wednesday’s bar aligns with the 40mm line.\n3. Rainfall = 40mm. (Counting blocks as 1 without checking the axis scale is a classic mistake!).',
      hints: [
        'Look at Step 2: what does each step on the vertical axis actually represent?',
        'Does the vertical axis count in 1s or in 10s?',
        'The axis scale goes 0, 10, 20, 30, 40. 4 units on this scale means 40mm, not 4mm.',
      ],
    },
    suggestedSituations: [
      {
        title: 'Weekly electricity usage bar chart',
        scenario: 'Comparing kilowatt-hours per day.',
        suggestedNumbers: 'Mon 12 kWh, Tue 15 kWh, Wed 18 kWh',
      },
      {
        title: 'Water bottles recycled pictogram',
        scenario: 'Where 1 bottle icon = 50 bottles collected.',
        suggestedNumbers: '3 icons = 150 bottles',
      },
      {
        title: 'Weight progress line chart over 4 weeks',
        scenario: 'Tracking weekly body weight in kg.',
        suggestedNumbers: 'Week 1: 72kg, Week 2: 71.5kg, Week 3: 71kg',
      },
    ],
    keyPointsRubric: [
      'Always read the title, axis labels, units, and scale before reading bars or lines.',
      'Check whether the vertical axis starts at zero.',
      'On pictograms, check the key to know what quantity each symbol represents.',
      'A chart needs text alternatives (a data table and description) for accessibility.',
    ],
    chart: {
      type: 'bar',
      title: 'Hours of Sleep This Week (Mon - Fri)',
      description: 'Bar chart showing hours slept per night recorded by a sleep tracker.',
      xAxisLabel: 'Day of Week',
      yAxisLabel: 'Hours of Sleep',
      units: 'hours',
      items: [
        { label: 'Mon', value: 7, color: '#3b82f6' },
        { label: 'Tue', value: 6, color: '#06b6d4' },
        { label: 'Wed', value: 8, color: '#10b981' },
        { label: 'Thu', value: 5, color: '#f59e0b' },
        { label: 'Fri', value: 9, color: '#8b5cf6' },
      ],
      accessibleSummary:
        'A bar chart showing sleep hours: Monday 7h, Tuesday 6h, Wednesday 8h, Thursday 5h, Friday 9h. Highest is Friday (9h), lowest is Thursday (5h).',
    },
  },
  {
    id: 7,
    slug: 'misleading-statistics',
    title: 'How Statistics Can Be Misleading',
    subtitle: 'Truncated Axes, Tiny Samples, and Outlier Traps',
    everydayContext: 'Sensational news headlines, advertising claims, and salary reports',
    badge: 'Critical Thinking',
    teachingCard: {
      simpleExplanation:
        'Statistics are numbers with a purpose, but they can easily mislead if presented dishonestly. Becoming data-literate means learning to spot the common tricks: truncated axes that exaggerate tiny changes, tiny sample sizes, and means that hide extreme inequalities.',
      everydayExampleTitle: 'The "Crime Has Skyrocketed!" News Graphic',
      everydayExampleStory:
        'A local newspaper runs a front-page bar chart titled "Burglaries Soar!" showing 2023 with a tiny bar and 2024 with a huge bar three times taller. But when you look at the vertical axis, it starts at 98 and ends at 104! The actual numbers were 100 burglaries in 2023 and 103 in 2024 (a tiny 3% increase).',
      dataList: ['2023: 100 burglaries', '2024: 103 burglaries'],
      units: 'burglaries',
      stepByStep: [
        {
          step: 'Tactic 1: The Truncated (Cut-off) Axis',
          detail:
            'By starting the vertical axis at 98 instead of 0, a difference of just 3 burglaries looked like a 300% surge!',
          math: 'Visual ratio: 3x bar height for a 3% change',
        },
        {
          step: 'Tactic 2: Tiny Sample Sizes',
          detail:
            'Adverts claiming "4 out of 5 dentists recommend this toothpaste" often surveyed only 5 dentists in total! A tiny sample cannot represent thousands of practitioners.',
          math: 'Sample size (n) = 5 is too small',
        },
        {
          step: 'Tactic 3: The Mean Pulled by an Outlier',
          detail:
            'A company with 9 workers earning £20,000 and 1 CEO earning £500,000 can honestly claim: "Our mean salary is £68,000!" Yet 90% of workers earn less than a third of that. The median is £20,000.',
          math: 'Mean = £68,000 vs Median = £20,000',
        },
      ],
      result:
        'Always ask: Does the axis start at 0? How many people were surveyed? Is an extreme outlier pulling the average?',
      whyUseful:
        'Protects you from being manipulated by biased news articles, misleading advertising claims, and selective political graphs.',
      jargonBuster: [
        {
          term: 'Truncated Axis',
          plainMeaning: 'A chart axis that does not start at zero, visually exaggerating tiny differences.',
        },
        {
          term: 'Cherry-picking',
          plainMeaning: 'Selecting only the specific dates or data points that support your preferred argument.',
        },
        {
          term: 'Sample Size',
          plainMeaning: 'The total number of people, items, or observations included in a study.',
        },
      ],
      keyTakeaway:
        'Five red flags to watch for: 1. Axis not starting at zero, 2. Tiny sample size, 3. Mean inflated by an outlier (ask for the median!), 4. Average hiding big spread, 5. Cherry-picked time windows.',
    },
    alternateExplanation: {
      title: 'A Simpler Look: The Duck Pond Average',
      analogy: 'Imagine a man with his head in an oven and his feet in a freezer.',
      exampleStory:
        '"On average, my body temperature is a comfortable 37°C!" That statistic is mathematically true, but completely hides the deadly spread! A single average without knowing the range or spread can hide vital truths.',
      dataList: ['Head: 100°C', 'Feet: -26°C', 'Mean: 37°C'],
      units: '°C',
      stepByStep: [
        { step: 'Compute mean', detail: '(100 + -26) ÷ 2 = 37°C' },
        { step: 'Check reality', detail: 'The spread is lethal!' },
      ],
      result: 'Always ask about the spread, not just the average.',
      tip: 'When you hear an average, ask: "What was the range? What was the median?"',
    },
    practiceQuestion: {
      prompt:
        'A tech startup of 5 people has the following annual salaries: £22,000, £25,000, £23,000, £26,000, and £254,000 (the founder).',
      explainPrompt:
        'Explain why using the mean salary would mislead a job applicant about what typical staff earn, and why the median is fairer.',
      calculationPrompt:
        'Calculate the median salary for these 5 people. (Enter the number in £, e.g. 25000)',
      data: [22000, 23000, 25000, 26000, 254000],
      units: '£',
      expectedAnswer: 25000,
      answerType: 'number',
      sentenceFrame:
        'The founder’s salary of £254,000 pulls the [mean] way up to £70,000, which none of the regular staff earn. The [median] of £25,000 is much fairer because it represents the middle worker.',
      modelExplanation:
        'The mean salary is £70,000 ((22+23+25+26+254)k ÷ 5). This severely misleads an applicant because 4 out of 5 staff earn under £27,000. The median is £25,000 (sorted middle), which accurately shows what a typical employee earns.',
      hint: 'Sort the 5 salaries: 22k, 23k, 25k, 26k, 254k. What is the middle value?',
    },
    deliberateMistake: {
      scenario:
        'A smartphone company publishes a press release claiming: "Satisfaction has doubled this year!" They show a bar chart for Customer Satisfaction: Last Year: 92%, This Year: 96%. A junior analyst writes:',
      workedSteps: [
        {
          stepNum: 1,
          title: 'Step 1: Check the percentage numbers',
          content: 'Last year = 92%. This year = 96%.',
          isErrorStep: false,
        },
        {
          stepNum: 2,
          title: 'Step 2: Inspect the chart axis',
          content: 'The vertical axis starts at 90% and ends at 98%.',
          isErrorStep: false,
        },
        {
          stepNum: 3,
          title: 'Step 3: Evaluate the claim',
          content:
            'The analyst concludes: "Because the bar for this year is twice as tall visually, customer satisfaction genuinely doubled from last year."',
          isErrorStep: true,
        },
      ],
      errorStepNumber: 3,
      exactMistakeDescription:
        'The analyst believed the visual illusion of a truncated axis without checking that satisfaction only rose by 4% (from 92% to 96%), not 100% (doubling).',
      whyWrong:
        'The axis was cut off at 90% instead of 0%. 96% is only 4 percentage points higher than 92%. Doubling 92% would be 184%, which is impossible!',
      correctCorrection:
        'Satisfaction did not double; it increased by only 4 percentage points. The chart used a truncated axis starting at 90% to artificially exaggerate the visual difference.',
      fullCorrectSolution:
        'Correct Solution:\n1. Actual increase: 96% - 92% = 4%.\n2. The visual height doubled only because the vertical axis began at 90% rather than 0%.\n3. Conclusion: The claim that satisfaction "doubled" is false and misleading.',
      hints: [
        'Look at Step 3: if satisfaction was 92%, what would "doubling" actually mean?',
        'Look at the axis in Step 2: does it start at 0% or 90%?',
        'A truncated axis exaggerates visual height. The real gain was only from 92% to 96% (a 4% rise), not a 100% doubling!',
      ],
    },
    suggestedSituations: [
      {
        title: 'Salary advertising at a sales firm',
        scenario: 'Advertising average commission when 1 top performer earns 90% of it.',
        suggestedNumbers: '£15k, £18k, £20k, £22k, £250k',
      },
      {
        title: 'Diet pill success rate advert',
        scenario: 'Claiming "80% success" based on a test of 5 friends.',
        suggestedNumbers: '4 out of 5 people',
      },
      {
        title: 'Stock market chart in news',
        scenario: 'Axis zoomed from 5,000 to 5,020 to make a 0.4% dip look like a crash.',
        suggestedNumbers: 'Dip of 15 points on 5,000',
      },
    ],
    keyPointsRubric: [
      'A y-axis that does not start at zero exaggerates visual differences (truncated axis).',
      'Small sample sizes produce unreliable statistics that cannot be generalised.',
      'An average can hide a large spread or high variation.',
      'A mean is pulled up or down by extreme values; the median often gives a fairer typical value.',
      'Cherry-picked time periods hide broader long-term trends.',
    ],
    misleadingDemo: {
      title: 'Interactive Comparison: Honest vs Misleading Axis',
      tactic: 'Truncated Y-Axis',
      whyItMisleads:
        'Cutting off the base makes a modest 3% change look like a 300% explosion.',
      howToSpotIt: 'Always look at the bottom number on the vertical axis. Does it start at 0?',
      data: [
        { label: '2023', value: 100 },
        { label: '2024', value: 103 },
      ],
      yAxisMinTruncated: 98,
      yAxisMinHonest: 0,
    },
  },
  {
    id: 8,
    slug: 'final-combined-scenario',
    title: 'Putting It All Together: The Weekly Food Shop',
    subtitle: 'A Complete Everyday Scenario Using Every Topic',
    everydayContext: 'A family budget tracking grocery spending over 6 weeks',
    badge: 'Capstone Integration',
    teachingCard: {
      simpleExplanation:
        'In the real world, you do not use statistics in isolated boxes. You collect data, organise it, calculate averages and spreads, plot it on an honest chart, and use it to make informed family decisions.',
      everydayExampleTitle: 'Amara & Liam’s 6-Week Supermarket Tracker',
      everydayExampleStory:
        'Amara and Liam track their weekly household supermarket spend for 6 weeks: Week 1: £54 (Aldi), Week 2: £62 (Tesco), Week 3: £58 (Aldi), Week 4: £136 (Sainsbury’s - special family anniversary dinner), Week 5: £56 (Aldi), Week 6: £60 (Tesco).',
      dataList: [54, 62, 58, 136, 56, 60],
      units: '£',
      stepByStep: [
        {
          step: '1. Data Types Check',
          detail:
            'Supermarket names (Aldi, Tesco, Sainsbury’s) are Categorical. Weekly spend in £ is Numerical (Continuous/Measured money).',
          math: 'Stores = Categorical | Spend = Numerical',
        },
        {
          step: '2. Mean Spend (Equal Share)',
          detail:
            'Total spend = 54 + 62 + 58 + 136 + 56 + 60 = £426. Mean = £426 ÷ 6 = £71.00.',
          math: '£426 ÷ 6 = £71.00 per week',
        },
        {
          step: '3. Median Spend (The Middle / Outlier Resistant)',
          detail:
            'Sort values: £54, £56, £58, £60, £62, £136. Even count of 6: middle two are £58 and £60. Median = (58 + 60) ÷ 2 = £59.00.',
          math: '(£58 + £60) ÷ 2 = £59.00',
        },
        {
          step: '4. Mode (Most Frequent Store)',
          detail: 'Aldi appears 3 times, Tesco 2 times, Sainsbury’s 1 time. The mode store is Aldi.',
          math: 'Mode Store = Aldi (3 weeks)',
        },
        {
          step: '5. Range (The Spread)',
          detail:
            'Maximum (£136) minus Minimum (£54) = £82.00 spread, stretched wide by Week 4’s celebration.',
          math: '£136 - £54 = £82.00 range',
        },
        {
          step: '6. The Decision: Mean vs Median & Chart Traps',
          detail:
            'For regular budgeting, Amara and Liam should budget around £59 (the median), not £71 (the mean). The mean was dragged up £12 by a once-a-year party!',
          math: 'Budget £59/week, reserve separate fund for parties',
        },
      ],
      result:
        'By combining all 7 ideas, Amara and Liam understand their real everyday living cost without being fooled by one extreme week.',
      whyUseful:
        'This is the superpower of descriptive statistics: turning confusing piles of receipts into clear, calm, actionable decisions in everyday life.',
      jargonBuster: [
        {
          term: 'Data-Informed Decision',
          plainMeaning: 'Using evidence from your own records rather than guesswork to plan ahead.',
        },
        {
          term: 'Robust Metric',
          plainMeaning: 'A measurement (like the median) that remains reliable even when an outlier occurs.',
        },
      ],
      keyTakeaway:
        'You have mastered the foundation: Categorical vs Numerical, Mean (equal share), Median (middle after sorting), Mode (most frequent), Range (spread), Reading Charts honestly, and Spotting Misleading Claims!',
    },
    alternateExplanation: {
      title: 'A Simpler Look: Car Fuel Log',
      analogy: 'Imagine logging your monthly car petrol costs over 4 months.',
      exampleStory:
        'Three normal commute months cost £60, £65, £65. One month you drove across the country for a holiday and spent £210. Mean is £100/month. Median is £65/month. Mode is £65. Range is £150. For your monthly petrol budget, £65 is your realistic baseline!',
      dataList: [60, 65, 65, 210],
      units: '£',
      stepByStep: [
        { step: 'Notice the outlier', detail: '£210 road trip pulls the mean up' },
        { step: 'Use the median for baseline', detail: '£65 is typical' },
      ],
      result: 'The median protects your normal budget from rare events.',
      tip: 'Always look at Mean and Median together to see if outliers exist.',
    },
    practiceQuestion: {
      prompt:
        'Amara and Liam look at their 6 weeks of grocery spend: £54, £62, £58, £136, £56, £60. As calculated, the mean is £71 and the median is £59.',
      explainPrompt:
        'Explain in your own words why Amara and Liam should use the median (£59) rather than the mean (£71) to set their routine weekly food shopping budget.',
      calculationPrompt:
        'Calculate the range of their 6 weeks of food spending: Largest (£136) minus Smallest (£54). (Enter the number in £)',
      data: [54, 56, 58, 60, 62, 136],
      units: '£',
      expectedAnswer: 82,
      answerType: 'number',
      sentenceFrame:
        'They should budget around the median (£59) because the single celebration bill of [£136] pulled the [mean] up. The range of their bills is [£82].',
      modelExplanation:
        'The median of £59 represents a typical normal shopping trip. The mean of £71 was artificially elevated by the one-off £136 celebration dinner in Week 4. For everyday planning, £59 is realistic. The range is £136 - £54 = £82.',
      hint: 'Subtract the smallest bill (£54) from the celebration bill (£136): 136 - 54.',
    },
    deliberateMistake: {
      scenario:
        'A family friend looks at Amara and Liam’s grocery log (£54, £62, £58, £136, £56, £60) and writes a quick summary report:',
      workedSteps: [
        {
          stepNum: 1,
          title: 'Step 1: Calculate total grocery spend',
          content: '£54 + £62 + £58 + £136 + £56 + £60 = £426 total.',
          isErrorStep: false,
        },
        {
          stepNum: 2,
          title: 'Step 2: Calculate the mean',
          content: '£426 ÷ 6 = £71 mean weekly spend.',
          isErrorStep: false,
        },
        {
          stepNum: 3,
          title: 'Step 3: Budget advice',
          content:
            'The friend advises: "Because your mean is £71, you must be overspending on everyday groceries. You should cut your normal weekly shopping down to £71 because that is what you normally spend."',
          isErrorStep: true,
        },
      ],
      errorStepNumber: 3,
      exactMistakeDescription:
        'The friend gave flawed advice by assuming the mean (£71) represents normal weekly spending, ignoring that 5 out of the 6 weeks cost £62 or less!',
      whyWrong:
        'In 5 out of 6 weeks, the couple spent between £54 and £62 (median £59). The high mean was caused solely by the single £136 celebration in Week 4, not routine overspending.',
      correctCorrection:
        'The friend should have used the median (£59) to assess normal weekly spending. The couple is not routinely overspending; their routine shopping is around £59.',
      fullCorrectSolution:
        'Correct Solution:\n1. Routine weeks: £54, £56, £58, £60, £62. All are well below £71.\n2. The £71 mean is inflated by the single £136 celebration week.\n3. Sound budget advice: Set regular weekly shopping at the median (£59) and create a separate fund for special celebrations.',
      hints: [
        'Look at Step 3: how many weeks did the family actually spend anywhere near £71?',
        'Look at the individual numbers: £54, £62, £58, £56, £60. Aren’t all of these below £71?',
        'One outlier (£136) pulled up the mean. The friend confused the inflated mean with normal everyday spending!',
      ],
    },
    suggestedSituations: [
      {
        title: 'Personal monthly utility bills over 6 months',
        scenario: '5 mild months and 1 freezing winter blizzard month.',
        suggestedNumbers: '£70, £75, £70, £80, £72, £210',
      },
      {
        title: 'Freelance weekly earnings',
        scenario: '5 standard weeks and 1 big bonus project.',
        suggestedNumbers: '£400, £450, £420, £480, £430, £1,500',
      },
      {
        title: 'Commuting fuel costs across 4 seasons',
        scenario: 'Comparing steady commute with a summer road trip.',
        suggestedNumbers: '£50, £55, £52, £160',
      },
    ],
    keyPointsRubric: [
      'In real life, all statistics concepts work together: data types, mean, median, mode, range, and charts.',
      'Always compare mean and median: if they differ significantly, an outlier is pulling the mean.',
      'Use the median for baseline planning when outliers exist.',
      'Check the mode for category preferences and range for stability/spread.',
      'Beware of truncated charts that make small shifts look dramatic.',
    ],
    chart: {
      type: 'bar',
      title: 'Amara & Liam’s 6-Week Supermarket Spend (£)',
      description:
        'Bar chart showing weekly grocery bills over 6 weeks, highlighting the Week 4 celebration outlier.',
      xAxisLabel: 'Week',
      yAxisLabel: 'Spend (£)',
      units: '£',
      items: [
        { label: 'Wk 1 (Aldi)', value: 54, color: '#3b82f6' },
        { label: 'Wk 2 (Tesco)', value: 62, color: '#06b6d4' },
        { label: 'Wk 3 (Aldi)', value: 58, color: '#10b981' },
        { label: 'Wk 4 (Party)', value: 136, color: '#ef4444' },
        { label: 'Wk 5 (Aldi)', value: 56, color: '#f59e0b' },
        { label: 'Wk 6 (Tesco)', value: 60, color: '#8b5cf6' },
      ],
      accessibleSummary:
        'Chart showing 6 weeks of grocery spend: Week 1 £54, Week 2 £62, Week 3 £58, Week 4 £136 (outlier), Week 5 £56, Week 6 £60. Median is £59, Mean is £71.',
    },
  },
];
