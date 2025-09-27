export const logicalQuestions = [
  {
    id: "1",
    title: "Sequence Pattern",
    difficulty: "Easy",
    description: "Find the next number in the sequence: 2, 6, 12, 20, 30, __",
    options: [
      "42",
      "40",
      "38",
      "44"
    ],
    explanation: "The pattern is adding consecutive even numbers: +4, +6, +8, +10, therefore +12 next. So, 30 + 12 = 42",
    correctAnswer: "42",
    category: "Number Series"
  },
  {
    id: "6",
    title: "Calendar Logic",
    difficulty: "Medium",
    description: "If today is Monday and after 61 days it will be Sunday, then what day was it 57 days ago?",
    options: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday"
    ],
    explanation: "61 days = 8 weeks + 5 days (Monday to Sunday). Going back 57 days = 8 weeks + 1 day. So from Monday, going back 1 day gives us Sunday, then 8 weeks back is still Sunday.",
    correctAnswer: "Monday",
    category: "Time and Calendar"
  },
  {
    id: "7",
    title: "Cube Formation",
    difficulty: "Hard",
    description: "A cube is painted red on all faces. It is then cut into 27 smaller cubes of equal size. How many small cubes have exactly two faces painted red?",
    options: [
      "4",
      "8",
      "12",
      "24"
    ],
    explanation: "Edge cubes have exactly two faces painted. In a 3×3×3 cube, there are 12 edges, each containing one small cube. Therefore, 12 small cubes have exactly two faces painted red.",
    correctAnswer: "12",
    category: "Spatial Reasoning"
  },
  {
    id: "8",
    title: "Direction Puzzle",
    difficulty: "Medium",
    description: "A man walks 5 km toward south and then turns to the right. After walking 3 km he turns to the right and walks 5 km. At what distance is he from his starting point?",
    options: [
      "3 km",
      "4 km",
      "5 km",
      "8 km"
    ],
    explanation: "This forms a rectangle. He walks 5 km south, 3 km west, then 5 km north. The net displacement is only the 3 km westward movement.",
    correctAnswer: "3 km",
    category: "Direction Sense"
  },
  {
    id: "9",
    title: "Word Logic",
    difficulty: "Easy",
    description: "If 'GIVE' is coded as '5137' and 'TAKE' is coded as '4927', then how would 'GATE' be coded?",
    options: [
      "5247",
      "5927",
      "5947",
      "5847"
    ],
    explanation: "In this coding: G=5, I=1, V=3, E=7, T=4, A=9, K=2. Therefore, GATE would be coded as 5947.",
    correctAnswer: "5947",
    category: "Coding-Decoding"
  },
  {
    id: "10",
    title: "Age Puzzle",
    difficulty: "Hard",
    description: "Present ages of Sameer and Anand are in the ratio of 5:4. After 3 years, Sameer's age will be 3 years more than twice Anand's age. What is Anand's present age?",
    options: [
      "16",
      "18",
      "20",
      "24"
    ],
    explanation: "Let Anand's age be x. Then Sameer's age is 5x/4. After 3 years: (5x/4 + 3) = 2(x + 3) + 3. Solving this equation gives x = 18.",
    correctAnswer: "18",
    category: "Mathematical Reasoning"
  },
  {
    id: "11",
    title: "Syllogism Challenge",
    difficulty: "Medium",
    description: `All artists are creative.
Some creative people are musicians.
Based on these statements, which conclusion is valid?`,
    options: [
      "All musicians are artists",
      "Some artists may be musicians",
      "No artists are musicians",
      "All creative people are artists"
    ],
    explanation: "Since all artists are creative, and some creative people are musicians, it's possible that some artists are also musicians. We cannot make any stronger conclusion.",
    correctAnswer: "Some artists may be musicians",
    category: "Syllogism"
  },
  {
    id: "12",
    title: "Series Completion",
    difficulty: "Hard",
    description: "AZ, BY, CX, DW, __",
    options: [
      "EV",
      "VE",
      "EW",
      "VW"
    ],
    explanation: "First letter moves forward in alphabet (A→B→C→D→E), while second letter moves backward (Z→Y→X→W→V). Therefore, EV is next in the series.",
    correctAnswer: "EV",
    category: "Letter Series"
  },
  {
    id: "13",
    title: "Family Tree",
    difficulty: "Hard",
    description: `A and B are married couple. X and Y are brothers. X is the son of A. Z is Y's wife. How is B related to Z?`,
    options: [
      "Mother",
      "Sister",
      "Mother-in-law",
      "Aunt"
    ],
    explanation: "A is X's mother, and B is A's husband, making B the father of X. Y is X's brother, so B is also Y's father. Z is Y's wife, making B her father-in-law's wife, thus her mother-in-law.",
    correctAnswer: "Mother-in-law",
    category: "Family Relations"
  },
  {
    id: "14",
    title: "Statement and Conclusions",
    difficulty: "Medium",
    description: `Statement: Only those who have a graduate degree can apply for this job.
Person X has applied for this job.
Which conclusion follows?`,
    options: [
      "X definitely has a graduate degree",
      "X may or may not have a graduate degree",
      "X doesn't have a graduate degree",
      "X has multiple degrees"
    ],
    explanation: "Since only graduates can apply, and X has applied, X must have a graduate degree. This is a necessary condition for application.",
    correctAnswer: "X definitely has a graduate degree",
    category: "Logical Deduction"
  },
  {
    id: "2",
    title: "Word Analogy",
    difficulty: "Medium",
    description: "Book is to Reader as Movie is to:",
    options: [
      "Director",
      "Actor",
      "Viewer",
      "Theater"
    ],
    explanation: "A reader consumes/experiences a book, similarly, a viewer consumes/experiences a movie.",
    correctAnswer: "Viewer",
    category: "Verbal Analogy"
  },
  {
    id: "3",
    title: "Logical Deduction",
    difficulty: "Hard",
    description: `All roses in my garden are red.
Some flowers in my garden are not red.
Based on these statements, which conclusion is valid?`,
    options: [
      "Some flowers in my garden are not roses",
      "All flowers in my garden are roses",
      "No flowers in my garden are roses",
      "Some roses in my garden are not red"
    ],
    explanation: "Since all roses are red, but some flowers are not red, those non-red flowers cannot be roses. Therefore, some flowers must not be roses.",
    correctAnswer: "Some flowers in my garden are not roses",
    category: "Syllogism"
  },
  {
    id: "4",
    title: "Pattern Recognition",
    difficulty: "Medium",
    description: "If APPLE is coded as 12234, how would PAPER be coded?",
    options: [
      "21234",
      "21243",
      "23124",
      "21245"
    ],
    explanation: "In APPLE, each unique letter gets a unique number in order of appearance. P would be 2 (like P in APPLE), A would be 1, second P would be 2, E would be 3, R would be 4. Therefore, PAPER = 21234",
    correctAnswer: "21234",
    category: "Coding-Decoding"
  },
  {
    id: "5",
    title: "Blood Relations",
    difficulty: "Hard",
    description: `Pointing to a photograph, Ram said, "She is the daughter of the only son of my grandfather." How is Ram related to the girl in the photograph?`,
    options: [
      "Father",
      "Uncle",
      "Brother",
      "Cousin"
    ],
    explanation: "The only son of Ram's grandfather would be Ram's father. The girl is the daughter of Ram's father, making her Ram's sister.",
    correctAnswer: "Brother",
    category: "Family Relations"
  }
];