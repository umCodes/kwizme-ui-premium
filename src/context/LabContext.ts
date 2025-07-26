import { createContext, type Dispatch, type SetStateAction } from "react";


export type QuizTypes = "MCQ" | "T/F" | "SAQ" | "FIB";
export type DifficultyLevels = "basic" | "regular" | "intermediate" | "advanced" | "expert";

type FileType = "prompt" | "text" | "image"
export type QuizPrompt = {
    subject: string; 
    qTypes: QuizTypes[];
    difficulty: DifficultyLevels; 
    number: number;
    file?: null | File;
    file_type?: "prompt" | "text" | "image"
}

const defaultState = {
    form: {
        subject: '',
        difficulty: 'regular' as DifficultyLevels,
        qTypes: ['MCQ'] as QuizTypes[],
        number: 5,
        file: null,
        file_type: 'prompt' as FileType 
    },
    setForm: () => {},
    isLoading: false,
    setIsLoading: () => {},
}

export const LabContext = createContext<{
    form: QuizPrompt;
    setForm: Dispatch<SetStateAction<QuizPrompt>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
}>(defaultState);