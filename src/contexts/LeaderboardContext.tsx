import { useState, type ReactNode } from "react";
import { LeaderboardContext, type ScoreEntry } from "./useLeaderboardContext";

export function LeaderboardProvider({ children }: { children: ReactNode }) {
    const [scores, setScores] = useState<ScoreEntry[]>(() => {
        const stored = localStorage.getItem("scores");
        if (!stored) return [];
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                // Filter out entries with missing data or empty usernames if they cause issues
                return parsed.filter((s: ScoreEntry) => s && s.username);
            }
        } catch (e) {
            console.error("Failed to parse stored scores", e);
        }
        return [];
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
