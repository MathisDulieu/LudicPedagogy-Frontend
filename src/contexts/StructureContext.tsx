import { createContext, useContext, useState, type ReactNode } from "react";

interface Structure {
    id: string;
    name: string;
    type?: string;
}

interface StructureContextType {
    structure: Structure | null;
    joinStructure: (structure: Structure) => void;
    leaveStructure: () => void;
}

const StructureContext = createContext<StructureContextType | undefined>(
    undefined,
);

export function StructureProvider({ children }: { children: ReactNode }) {
    const [structure, setStructure] = useState<Structure | null>(() => {
        const stored = localStorage.getItem("structure");
        return stored ? JSON.parse(stored) : null;
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

export function useStructure() {
    const context = useContext(StructureContext);
    if (!context) {
        throw new Error("useStructure must be used within StructureProvider");
    }
    return context;
}
