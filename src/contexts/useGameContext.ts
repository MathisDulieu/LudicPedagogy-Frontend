import { createContext, useContext } from "react";
import type { GameData } from "../types/game";

export interface GameContextType {
    games: GameData[];
    addGame: (game: GameData) => void;
    updateGame: (game: GameData) => void;
    deleteGame: (id: string) => void;
    getGameById: (id: string) => GameData | undefined;
}

export const GameContext = createContext<GameContextType | undefined>(
    undefined,
);

export function useGames() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGames must be used within a GameProvider");
    }
    return context;
}
