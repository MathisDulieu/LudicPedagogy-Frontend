import QCMGame from "./qcm/QCMGame";
import MemoryGame from "./memory/MemoryGame";
import WarioGame from "./wario/WarioGame";
import SortGame from "./sort/SortGame";
import HexFlash from "./hex-flash/HexFlash";
import TerminalRiddle from "./terminal-riddle/TerminalRiddle";
import type {
    BaseGameData,
    QCMData,
    WarioData,
    MemoryData,
    SortData,
    HexFlashData,
    TerminalRiddleData,
} from "../../types/game";

interface GameRendererProps {
    game: BaseGameData;
    onScore: (points: number) => void;
}

export default function GameRenderer({ game, onScore }: GameRendererProps) {
    if (!game) return <div className="text-white">Chargement du jeu...</div>;

    switch (game.type) {
        case "qcm":
            return <QCMGame data={game as QCMData} onScore={onScore} />;
        case "wario":
            return <WarioGame data={game as WarioData} onScore={onScore} />;
        case "memory":
            return <MemoryGame data={game as MemoryData} onScore={onScore} />;
        case "sort":
        case "timeline":
            return <SortGame data={game as SortData} onScore={onScore} />;
        case "hex-flash":
            return <HexFlash data={game as HexFlashData} onScore={onScore} />;
        case "terminal-riddle":
            return (
                <TerminalRiddle
                    data={game as TerminalRiddleData}
                    onScore={onScore}
                />
            );
        case "enigma":
            return (
                <div className="p-8 text-center bg-slate-900 rounded-xl">
                    <div className="text-4xl mb-4">🧩</div>
                    <h2 className="text-xl font-bold text-white mb-2">
                        Jeu d'énigme
                    </h2>
                    <p className="text-slate-400">Ce mode arrive bientôt !</p>
                </div>
            );
        default:
            return (
                <div className="p-8 text-center bg-slate-900 rounded-xl">
                    <div className="text-4xl mb-4">🚧</div>
                    <h2 className="text-xl font-bold text-white mb-2">
                        Type de jeu non supporté : {game.type}
                    </h2>
                    <p className="text-slate-400">
                        Ce mode de jeu n'est pas encore implémenté ou a été
                        migré.
                    </p>
                </div>
            );
    }
}
