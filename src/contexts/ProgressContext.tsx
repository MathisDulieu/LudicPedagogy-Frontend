import { useState, type ReactNode } from "react";
import { computeLevel } from "../hooks/useProgression";
import { ProgressContext } from "./useProgressContext";

export function ProgressProvider({ children }: { children: ReactNode }) {
    const [xp, setXp] = useState<number>(() => {
        const stored = localStorage.getItem("xp");
        return stored ? Number(stored) : 0;
    });

    const level = computeLevel(xp);

    function addXp(amount: number) {
        const newXp = xp + amount;
        setXp(newXp);
        localStorage.setItem("xp", String(newXp));
    }

    return (
        <ProgressContext.Provider value={{ xp, level, addXp }}>
            {children}
        </ProgressContext.Provider>
    );
}
