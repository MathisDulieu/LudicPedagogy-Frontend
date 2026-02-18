export interface Game {
    id: string;
    name: string;
    type: "Rapide" | "Énigme" | "Action";
    description: string;
    emoji: string;
    path: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
}

export interface CourseModule {
    id: string;
    title: string;
    description: string;
    isLocked: boolean;
    gameId?: string; // Link to a game for this module
}

export interface Course {
    id: string;
    title: string;
    description: string;
    icon: string;
    level: "Débutant" | "Intermédiaire" | "Avancé";
    modules: CourseModule[];
    totalProgress: number; // 0-100
    isEnrolled: boolean;
}

export interface User {
    username: string;
    level: number;
    xp: number;
    achievements: Achievement[];
    enrolledCourses: string[]; // Course IDs
    completedGames: string[]; // Game IDs
}
