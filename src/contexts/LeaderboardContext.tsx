import { createContext, useContext, useState, type ReactNode } from "react";

interface ScoreEntry {
    username: string;
    score: number;
    gameId?: string;
    timestamp?: number;
}

interface LeaderboardContextType {
    scores: ScoreEntry[];
    addScore: (entry: ScoreEntry) => void;
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(
    undefined,
);

export function LeaderboardProvider({ children }: { children: ReactNode }) {
    const [scores, setScores] = useState<ScoreEntry[]>(() => {
        const stored = localStorage.getItem("scores");
        return stored ? JSON.parse(stored) : [];
    });

    function addScore(entry: ScoreEntry) {
        const updated = [...scores, { ...entry, timestamp: Date.now() }];
        setScores(updated);
        localStorage.setItem("scores", JSON.stringify(updated));
    }

    return (
        <LeaderboardContext.Provider value={{ scores, addScore }}>
            {children}
        </LeaderboardContext.Provider>
    );
}

export function useLeaderboard() {
    const context = useContext(LeaderboardContext);
    if (!context) {
        throw new Error(
            "useLeaderboard must be used within LeaderboardProvider",
        );
    }
    return context;
}
