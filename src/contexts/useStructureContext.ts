import { createContext, useContext } from "react";

export interface Structure {
    id: string;
    name: string;
    type?: string;
}

export interface StructureContextType {
    structure: Structure | null;
    joinStructure: (structure: Structure) => void;
    leaveStructure: () => void;
}

export const StructureContext = createContext<StructureContextType | undefined>(
    undefined,
);

export function useStructure() {
    const context = useContext(StructureContext);
    if (!context) {
        throw new Error("useStructure must be used within StructureProvider");
    }
    return context;
}
