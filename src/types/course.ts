export type Difficulty = "Débutant" | "Intermédiaire" | "Avancé";
export type ActivityType = "theory" | "game" | "quiz";

export interface Activity {
    id: string;
    title: string;
    type: ActivityType;
    content?: string; // For theory
    gameId?: string; // Reference to GameData ID
    completed?: boolean;
    locked?: boolean;
}

export interface Section {
    id: string;
    title: string;
    activities: Activity[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    duration: string;
    image: string; // Tailwind class or image URL
    students: number;
    sections: Section[];
    progress?: number;
}
