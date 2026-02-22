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
  AbsoluteConstruction = "独立主格"
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
  sentenceParts: string[]; // Parts of the sentence between blanks
  blanks: Blank[];
  difficulty: Difficulty;
  category: GrammarPoint;
  translation: string;
}

export const QUESTION_BANK: Question[] = [
  {
    id: "q1",
    sentenceParts: ["", " tired, she still finished the report."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "Although",
        options: [
          { id: "o1", text: "Because" },
          { id: "o2", text: "Although" },
          { id: "o3", text: "Unless" },
          { id: "o4", text: "If" }
        ],
        explanation: {
          rule: "Although 引导让步状语从句，表示“尽管”。句子前后存在转折关系：尽管累，但还是完成了报告。",
          example: "Although it was raining, they went out for a walk.",
          commonMistake: "在英语中 although 和 but 不能同时出现在一个句子中。"
        }
      }
    ],
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.AdverbialClause,
    translation: "尽管很累，她还是完成了报告。"
  },
  {
    id: "q2",
    sentenceParts: ["The boy ", " is playing football is my brother."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "who",
        options: [
          { id: "o1", text: "which" },
          { id: "o2", text: "who" },
          { id: "o3", text: "whose" },
          { id: "o4", text: "whom" }
        ],
        explanation: {
          rule: "who 引导定语从句，先行词是人（The boy），且在从句中作主语。",
          example: "The girl who is singing is my sister.",
          commonMistake: "先行词为人时，不能用 which。"
        }
      }
    ],
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.RelativeClause,
    translation: "那个正在踢足球的男孩是我的弟弟。"
  },
  {
    id: "q3",
    sentenceParts: ["", " the homework, the student went out to play."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "Having finished",
        options: [
          { id: "o1", text: "Finish" },
          { id: "o2", text: "Finished" },
          { id: "o3", text: "Finishing" },
          { id: "o4", text: "Having finished" }
        ],
        explanation: {
          rule: "非谓语动词作时间状语。Having finished 表示动作发生在主句动作（went out）之前，且与主语（the student）是主动关系。",
          example: "Having seen the movie, I don't want to see it again.",
          commonMistake: "误用 Finished，Finished 表示被动关系。"
        }
      }
    ],
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.NonFiniteVerb,
    translation: "做完作业后，那个学生出去玩了。"
  },
  {
    id: "q4",
    sentenceParts: ["I don't know ", " he will come back tomorrow."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "whether",
        options: [
          { id: "o1", text: "that" },
          { id: "o2", text: "whether" },
          { id: "o3", text: "what" },
          { id: "o4", text: "which" }
        ],
        explanation: {
          rule: "whether 引导宾语从句，表示“是否”。这里表示不确定他明天是否会回来。",
          example: "I wonder whether it will rain tomorrow.",
          commonMistake: "that 引导宾语从句时通常表示一个确定的事实。"
        }
      }
    ],
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.NounClause,
    translation: "我不知道他明天是否会回来。"
  },
  {
    id: "q5",
    sentenceParts: ["The news ", " our team won the game excited everyone."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "that",
        options: [
          { id: "o1", text: "which" },
          { id: "o2", text: "that" },
          { id: "o3", text: "what" },
          { id: "o4", text: "who" }
        ],
        explanation: {
          rule: "that 引导同位语从句，解释说明 news 的具体内容。that 在从句中不作成分，仅起连接作用。",
          example: "The fact that he failed the exam surprised us.",
          commonMistake: "误用 which，which 在定语从句中需作主语或宾语，而这里从句成分完整。"
        }
      }
    ],
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.NounClause,
    translation: "我们队赢了比赛的消息让每个人都很兴奋。"
  },
  {
    id: "q6",
    sentenceParts: ["", " by the teacher, the student felt very happy."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "Praised",
        options: [
          { id: "o1", text: "Praising" },
          { id: "o2", text: "Praised" },
          { id: "o3", text: "To praise" },
          { id: "o4", text: "Having praised" }
        ],
        explanation: {
          rule: "过去分词作状语，表示被动关系。学生是被老师表扬（be praised by teacher）。",
          example: "Seen from the hill, the city looks beautiful.",
          commonMistake: "误用 Praising，Praising 表示主动关系。"
        }
      }
    ],
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.NonFiniteVerb,
    translation: "受到老师的表扬，那个学生感到很高兴。"
  },
  {
    id: "q7",
    sentenceParts: ["This is the place ", " I visited last year."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "which",
        options: [
          { id: "o1", text: "where" },
          { id: "o2", text: "which" },
          { id: "o3", text: "when" },
          { id: "o4", text: "what" }
        ],
        explanation: {
          rule: "which 引导定语从句，先行词是 place，在从句中作 visited 的宾语。",
          example: "The book which I bought is interesting.",
          commonMistake: "误用 where。虽然先行词是地点，但从句中缺少宾语，应使用关系代词 which/that 而非关系副词 where。"
        }
      }
    ],
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.RelativeClause,
    translation: "这就是我去年参观过的地方。"
  },
  {
    id: "q8",
    sentenceParts: ["", " weather permitting, we will go for a picnic."],
    blanks: [
      {
        id: "b1",
        correctAnswer: "With",
        options: [
          { id: "o1", text: "If" },
          { id: "o2", text: "With" },
          { id: "o3", text: "Because" },
          { id: "o4", text: "Although" }
        ],
        explanation: {
          rule: "独立主格结构（Absolute Construction）。weather permitting 是名词+现在分词构成的独立结构，表示条件。",
          example: "Time permitting, I'll visit you.",
          commonMistake: "误用 If。如果用 If，句子应为 If weather permits..."
        }
      }
    ],
    difficulty: Difficulty.Advanced,
    category: GrammarPoint.AbsoluteConstruction,
    translation: "如果天气允许，我们将去野餐。"
  }
];
