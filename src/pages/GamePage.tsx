import { useParams, Link, useSearchParams } from "react-router-dom";
import GameShell from "../features/games/GameShell";
import { useGames } from "../contexts/useGameContext";
import { useCourses } from "../contexts/useCourseContext";
import type { GameData, BaseGameData, GameProps } from "../types/game";

import HexFlash from "../features/games/hex-flash/HexFlash";
import TerminalRiddle from "../features/games/terminal-riddle/TerminalRiddle";
import BinarySlap from "../features/games/binary-slap/SlapGame.tsx";

// Game components for custom types
import QCMGame from "../features/games/qcm/QCMGame";
// Note: We might need to add other game components as they are implemented

const GAME_MAP: Record<string, React.ComponentType<GameProps<BaseGameData>>> = {
    "hex-flash": HexFlash as unknown as React.ComponentType<
        GameProps<BaseGameData>
    >,
    "terminal-riddle": TerminalRiddle as unknown as React.ComponentType<
        GameProps<BaseGameData>
    >,
    "binary-slap": BinarySlap as unknown as React.ComponentType<
        GameProps<BaseGameData>
    >,
};

const TYPE_MAP: Record<string, React.ComponentType<GameProps<BaseGameData>>> = {
    qcm: QCMGame as unknown as React.ComponentType<GameProps<BaseGameData>>,
    // Add other types here
};

export default function GamePage() {
    const { gameId } = useParams<{ gameId: string }>();
    const [searchParams] = useSearchParams();
    const { getGameById } = useGames();
    const { markActivityComplete } = useCourses();

    const courseId = searchParams.get("courseId");
    const activityId = searchParams.get("activityId");

    // 1. Try static map
    let GameComponent = (
        gameId ? GAME_MAP[gameId] : null
    ) as React.ComponentType<GameProps<BaseGameData>> | null;
    let gameData: GameData | null = null;

    // 2. Try dynamic games from context
    if (!GameComponent && gameId) {
        gameData = getGameById(gameId) || null;
        if (gameData) {
            GameComponent = TYPE_MAP[gameData.type] as React.ComponentType<
                GameProps<BaseGameData>
            >;
        }
    }

    if (!GameComponent) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8">
                <div className="terminal-box text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        ❌ Jeu introuvable
                    </h1>
                    <p className="text-slate-400 mb-6">
                        Le jeu que tu cherches n'existe pas.
                    </p>
                    <Link to="/hub" className="neon-button inline-block">
                        Retour au Hub
                    </Link>
                </div>
            </div>
        );
    }

    // Default data for static games that expect it
    const activeData =
        gameData ||
        ({
            id: gameId || "static",
            type: gameId || "static",
            title: gameId || "Static Game",
        } as GameData);

    return (
        <GameShell
            duration={gameId === "hex-flash" ? 20 : 60}
            onGameEnd={(score: number) => {
                console.log("Score final :", score);
                if (courseId && activityId) {
                    markActivityComplete(courseId, activityId);
                }
            }}
        >
            {({ addScore }) => (
                <GameComponent onScore={addScore} data={activeData} />
            )}
        </GameShell>
    );
}
