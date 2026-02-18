import { useParams, Link } from "react-router-dom";
import GameShell from "../features/games/GameShell";

import HexFlash from "../features/games/hex-flash/HexFlash";
import TerminalRiddle from "../features/games/terminal-riddle/TerminalRiddle";
import BinarySlap from "../features/games/binary-slap/SlapGame.tsx";

const GAME_MAP: Record<string, React.ComponentType<any>> = {
    "hex-flash": HexFlash,
    "terminal-riddle": TerminalRiddle,
    "binary-slap": BinarySlap,
};

export default function GamePage() {
    const { gameId } = useParams<{ gameId: string }>();
    const GameComponent = gameId ? GAME_MAP[gameId] : null;

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

    return (
        <GameShell
            duration={gameId === "hex-flash" ? 20 : 60}
            onGameEnd={(score) => {
                console.log("Score final :", score);
            }}
        >
            {({ addScore }) => <GameComponent onScore={addScore} />}
        </GameShell>
    );
}
