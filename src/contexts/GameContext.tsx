import { useState, useEffect, type ReactNode } from "react";
import type { GameData } from "../types/game";
import { GameContext } from "./useGameContext";

export function GameProvider({ children }: { children: ReactNode }) {
    const [games, setGames] = useState<GameData[]>(() => {
        try {
            const saved = localStorage.getItem("ludic-games");
            if (!saved) return [];
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                return parsed.filter(
                    (g: GameData) => g && g.id && g.id.trim() !== "",
                );
            }
            return [];
        } catch (e) {
            console.error("Failed to parse stored games", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("ludic-games", JSON.stringify(games));
    }, [games]);

    const addGame = (game: GameData) => {
        setGames((prev) => [...prev, game]);
    };

    const updateGame = (game: GameData) => {
        setGames((prev) => prev.map((g) => (g.id === game.id ? game : g)));
    };

    const deleteGame = (id: string) => {
        setGames((prev) => prev.filter((g) => g.id !== id));
    };

    const getGameById = (id: string) => games.find((g) => g.id === id);

    return (
        <GameContext.Provider
            value={{ games, addGame, updateGame, deleteGame, getGameById }}
        >
            {children}
        </GameContext.Provider>
    );
}
