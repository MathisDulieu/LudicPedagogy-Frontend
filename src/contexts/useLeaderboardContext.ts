import { createContext, useContext } from "react";

export interface ScoreEntry {
    username: string;
    score: number;
    gameId?: string;
    timestamp?: number;
}

export interface LeaderboardContextType {
    scores: ScoreEntry[];
    addScore: (entry: ScoreEntry) => void;
}

export const LeaderboardContext = createContext<
    LeaderboardContextType | undefined
>(undefined);

export function useLeaderboard() {
    const context = useContext(LeaderboardContext);
    if (!context) {
        throw new Error(
            "useLeaderboard must be used within LeaderboardProvider",
        );
    }
    return context;
}
