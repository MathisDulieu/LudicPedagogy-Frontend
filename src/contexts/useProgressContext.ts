import { createContext, useContext } from "react";

export interface ProgressContextType {
    xp: number;
    level: number;
    addXp: (amount: number) => void;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(
    undefined,
);

export function useProgress() {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error("useProgress must be used within ProgressProvider");
    }
    return context;
}
