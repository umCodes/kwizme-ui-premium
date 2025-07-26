

export type QuizPrompt = {
    uid: string | undefined; 
    subject: string; 
    qTypes: QuizTypes[];
    difficulty: DifficultyLevels; 
    number: number;
    credits: number;
    generated_from: "prompt" | "image pdf" | "text pdf";
}


export type MCQ = {
    type: "MCQ";
    question: string;
    options: {answer: string; correct: boolean}[];
    explanation: string;
}

export type TF = {
    type: "True/False";
    question: string;
    options: [{answer: boolean; correct: boolean}, {answer: boolean; correct: boolean}];
    explanation: string;
}

export type SAQ = {
    type: "Short Answer Questions";
    question: string;
    answers: string;
    explanation: string;
};

export type FIB = {
    type: "Fill in the Blank";
    question: string;
    answers: string;
    explanation: string;
};

export type QuizTypes = "MCQ" | "T/F" | "SAQ" | "FIB";
export type DifficultyLevels = "basic" | "regular" | "intermediate" | "advanced" | "expert";

export type Quizes = {
    _id: string;
    uid: string;
    status?: "success";
    generated_from: "prompt" | "image pdf" | "text pdf";
    credits: number;
    topic: string;
    difficulty: DifficultyLevels;
    question_types: QuizTypes[];
    question: (MCQ | TF)[];
}

export type Sorts = 'default' | 'credits' | 'topic' | 'difficulty' | 'questions';
export const difficultyLevels: DifficultyLevels[] = ["basic", "regular", "intermediate", "advanced", "expert"]
export const quizTypes = ["MCQ", "T/F", "SAQ", "FIB"]


export type GeneratePromptOptions =  {
  uid: string;
  subject: string;
  qTypes: QuizTypes[];
  difficulty: DifficultyLevels;
  number: number;
}


export type QuizesError = {
    status: "error";
    message: string;
}


export interface PDFInfo {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modDate?: string;
  pages: number;
  pageSize?: string;
  encrypted?: boolean;
  version?: string;
  fileSize?: number | string; // optional, depending on the CLI version
};
