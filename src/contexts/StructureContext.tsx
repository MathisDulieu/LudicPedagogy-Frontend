import { useState, type ReactNode } from "react";
import { StructureContext, type Structure } from "./useStructureContext";

export function StructureProvider({ children }: { children: ReactNode }) {
    const [structure, setStructure] = useState<Structure | null>(() => {
        const stored = localStorage.getItem("structure");
        if (!stored) return null;
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse stored structure", e);
            return null;
        }
    });

    function joinStructure(newStructure: Structure) {
        setStructure(newStructure);
        localStorage.setItem("structure", JSON.stringify(newStructure));
    }

    function leaveStructure() {
        setStructure(null);
        localStorage.removeItem("structure");
    }

    return (
        <StructureContext.Provider
            value={{ structure, joinStructure, leaveStructure }}
        >
            {children}
        </StructureContext.Provider>
    );
}
