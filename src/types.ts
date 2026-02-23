export enum Level {
  KET = "KET (初级)",
  PET = "PET (中级)"
}

export enum Difficulty {
  Beginner = "初级",
  Intermediate = "中级",
  Advanced = "高级"
}

export enum GrammarPoint {
  RelativeClause = "定语从句",
  AdverbialClause = "状语从句",
  NounClause = "名词性从句",
  NonFiniteVerb = "非谓语动词",
  Conjunction = "连词/介词",
  AbsoluteConstruction = "独立主格",
  Tense = "时态",
  PassiveVoice = "被动语态",
  Conditionals = "条件句"
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Blank {
  id: string;
  correctAnswer: string;
  options: QuestionOption[];
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
  };
}

export interface Question {
  id: string;
  level: Level;
  sentenceParts: string[];
  blanks: Blank[];
  difficulty: Difficulty;
  category: GrammarPoint;
  translation: string;
}

export const KET_QUESTIONS: Question[] = [
  {
    id: "k1",
    level: Level.KET,
    sentenceParts: ["I went to the park ", " it was sunny."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "because",
        options: [
          { id: "o1", text: "but" },
          { id: "o2", text: "because" },
          { id: "o3", text: "so" },
          { id: "o4", text: "or" }
        ],
        explanation: {
          rule: "because 引导原因状语从句，表示“因为”。去公园的原因是天气晴朗。",
          example: "I stayed at home because I was tired.",
          commonMistake: "误用 so，so 表示结果。"
        }
      }
    ],
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.AdverbialClause,
    translation: "因为天气晴朗，我去了公园。"
  },
  {
    id: "k2",
    level: Level.KET,
    sentenceParts: ["This is the girl ", " lives next door."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "who",
        options: [
          { id: "o1", text: "which" },
          { id: "o2", text: "who" },
          { id: "o3", text: "where" },
          { id: "o4", text: "whose" }
        ],
        explanation: {
          rule: "who 引导定语从句，指代人（the girl），在从句中作主语。",
          example: "The man who is talking to my father is a doctor.",
          commonMistake: "指代人时误用 which。"
        }
      }
    ],
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.RelativeClause,
    translation: "这就是住在隔壁的那个女孩。"
  },
  {
    id: "k3",
    level: Level.KET,
    sentenceParts: ["She ", " her homework at 8 o'clock last night."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "was doing",
        options: [
          { id: "o1", text: "does" },
          { id: "o2", text: "did" },
          { id: "o3", text: "was doing" },
          { id: "o4", text: "is doing" }
        ],
        explanation: {
          rule: "过去进行时表示在过去某一特定时刻正在进行的动作。last night at 8 o'clock 是明确的过去时间点。",
          example: "I was reading a book when she called.",
          commonMistake: "误用一般过去时 did，did 强调动作发生过，而 was doing 强调当时正在进行。"
        }
      }
    ],
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.Tense,
    translation: "昨晚八点她正在做作业。"
  },
  {
    id: "k4",
    level: Level.KET,
    sentenceParts: ["There ", " some milk in the fridge."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "is",
        options: [
          { id: "o1", text: "is" },
          { id: "o2", text: "are" },
          { id: "o3", text: "be" },
          { id: "o4", text: "have" }
        ],
        explanation: {
          rule: "There be 句型遵循“就近原则”。milk 是不可数名词，谓语动词用单数 is。",
          example: "There is some water in the bottle.",
          commonMistake: "误认为 milk 是复数而用 are。"
        }
      }
    ],
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.Conjunction,
    translation: "冰箱里有一些牛奶。"
  },
  {
    id: "k5",
    level: Level.KET,
    sentenceParts: ["He is ", " than his brother."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "taller",
        options: [
          { id: "o1", text: "tall" },
          { id: "o2", text: "taller" },
          { id: "o3", text: "tallest" },
          { id: "o4", text: "more tall" }
        ],
        explanation: {
          rule: "形容词比较级。than 是比较级的标志词，tall 的比较级是 taller。",
          example: "This apple is bigger than that one.",
          commonMistake: "误用最高级 tallest 或错误的比较级形式 more tall。"
        }
      }
    ],
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.Conjunction,
    translation: "他比他的哥哥高。"
  }
];

export const PET_QUESTIONS: Question[] = [
  {
    id: "p1",
    level: Level.PET,
    sentenceParts: ["If I ", " you, I would take the job."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "were",
        options: [
          { id: "o1", text: "am" },
          { id: "o2", text: "was" },
          { id: "o3", text: "were" },
          { id: "o4", text: "be" }
        ],
        explanation: {
          rule: "虚拟语气（Second Conditional），表示与现在事实相反的假设。在 if 引导的虚拟语气中，be 动词通常统一用 were。",
          example: "If I had wings, I would fly to you.",
          commonMistake: "误用 am 或 was。虽然口语中有用 was 的情况，但在标准考试中应选 were。"
        }
      }
    ],
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.Conditionals,
    translation: "如果我是你，我就接受那份工作。"
  },
  {
    id: "p2",
    level: Level.PET,
    sentenceParts: ["The bridge ", " in 1990."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "was built",
        options: [
          { id: "o1", text: "built" },
          { id: "o2", text: "was built" },
          { id: "o3", text: "has built" },
          { id: "o4", text: "is built" }
        ],
        explanation: {
          rule: "被动语态的一般过去时。主语 bridge 是动作 build 的承受者，且时间状语 in 1990 表示过去。",
          example: "This book was written by Lu Xun.",
          commonMistake: "误用主动语态 built。"
        }
      }
    ],
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.PassiveVoice,
    translation: "这座桥建于1990年。"
  },
  {
    id: "p3",
    level: Level.PET,
    sentenceParts: ["I'm looking forward to ", " you soon."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "seeing",
        options: [
          { id: "o1", text: "see" },
          { id: "o2", text: "seeing" },
          { id: "o3", text: "saw" },
          { id: "o4", text: "to see" }
        ],
        explanation: {
          rule: "look forward to 中的 to 是介词，后面必须接动名词（V-ing）或名词。",
          example: "I look forward to hearing from you.",
          commonMistake: "误认为 to 是不定式符号而接动词原形 see。"
        }
      }
    ],
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.NonFiniteVerb,
    translation: "我期待很快见到你。"
  },
  {
    id: "p4",
    level: Level.PET,
    sentenceParts: ["He asked me ", " I had finished my work."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "if",
        options: [
          { id: "o1", text: "that" },
          { id: "o2", text: "if" },
          { id: "o3", text: "what" },
          { id: "o4", text: "which" }
        ],
        explanation: {
          rule: "宾语从句。在间接引语中，由一般疑问句转化而来的从句用 if 或 whether 引导，表示“是否”。",
          example: "She asked if I liked coffee.",
          commonMistake: "误用 that。that 引导陈述句转化的宾语从句。"
        }
      }
    ],
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.NounClause,
    translation: "他问我是否已经完成了工作。"
  },
  {
    id: "p5",
    level: Level.PET,
    sentenceParts: ["By the time he arrived, the train ", "."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "had left",
        options: [
          { id: "o1", text: "left" },
          { id: "o2", text: "has left" },
          { id: "o3", text: "had left" },
          { id: "o4", text: "was leaving" }
        ],
        explanation: {
          rule: "过去完成时。表示在过去某一动作（arrived）之前已经完成的动作（left）。即“过去的过去”。",
          example: "When I got to the cinema, the film had already started.",
          commonMistake: "误用一般过去时 left。"
        }
      }
    ],
    difficulty: Difficulty.Advanced,
    category: GrammarPoint.Tense,
    translation: "在他到达之前，火车已经开了。"
  }
];

export const QUESTION_BANK: Question[] = [...KET_QUESTIONS, ...PET_QUESTIONS];
