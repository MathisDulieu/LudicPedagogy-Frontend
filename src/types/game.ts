export interface BaseGameData {
    id: string;
    type: string;
    title: string;
    image?: string | null;
    skin?: string;
    xpCorrect?: number;
}

export interface GameProps<T = BaseGameData> {
    data: T;
    onScore: (points: number) => void;
}

export interface QCMData extends BaseGameData {
    questions: {
        id: string;
        q: string;
        image?: string | null;
        choices: string[];
        answer: string;
    }[];
    showProgress?: boolean;
    shuffleChoices?: boolean;
}

export interface WarioData extends BaseGameData {
    tasks: {
        id: string;
        instruction: string;
        options: string[];
        answer: string;
        duration: number;
    }[];
    shuffleOptions?: boolean;
}

export interface MemoryData extends BaseGameData {
    pairs: {
        id: string;
        left: string; // Used as content/symbol
        right: string; // Used as match (can be same)
    }[];
}

export interface SortData extends BaseGameData {
    items: {
        id: string;
        label: string;
        value: number; // Order
    }[];
    minLabel?: string;
    maxLabel?: string;
}

export interface TrueFalseData extends BaseGameData {
    statements: {
        id: string;
        text: string;
        answer: boolean;
        explanation?: string;
    }[];
}

export interface FillBlankData extends BaseGameData {
    sentences: {
        id: string;
        before: string;
        answer: string;
        after: string;
        hint?: string;
    }[];
}

export interface ConnectData extends BaseGameData {
    pairs: {
        id: string;
        left: string;
        right: string;
    }[];
}

export interface TimelineData extends BaseGameData {
    events: {
        id: string;
        label: string;
        order: number;
    }[];
}

export interface EnigmaData extends BaseGameData {
    narrative: string;
    clues: string[];
    answer: string;
    correctFeedback?: string;
    wrongFeedback?: string;
}

export interface HexFlashData extends BaseGameData {
    // No extra data needed for now, it uses static COLORS
}

export interface TerminalRiddleData extends BaseGameData {
    logs: string[];
    question: string;
    answers: string[];
    correctIndex: number;
}

export type GameData =
    | QCMData
    | WarioData
    | MemoryData
    | SortData
    | TrueFalseData
    | FillBlankData
    | ConnectData
    | TimelineData
    | EnigmaData
    | HexFlashData
    | TerminalRiddleData;
