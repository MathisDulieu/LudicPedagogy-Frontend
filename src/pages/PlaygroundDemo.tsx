import { useState } from "react";
import { Navbar } from "../layouts/Navbar";
import GameRenderer from "../features/games/GameRenderer";
import type {
    GameData,
    QCMData,
    WarioData,
    MemoryData,
    SortData,
} from "../types/game";

// SAMPLE DATA
const DEMO_GAMES: GameData[] = [
    {
        id: "demo-qcm",
        type: "qcm",
        title: "Culture Générale",
        xpCorrect: 20,
        questions: [
            {
                id: "q1",
                q: "Quelle est la capitale de la France ?",
                choices: ["Lyon", "Paris", "Marseille", "Bordeaux"],
                answer: "Paris",
            },
            {
                id: "q2",
                q: "Combien font 6 x 7 ?",
                choices: ["42", "48", "36", "49"],
                answer: "42",
            },
        ],
    } as QCMData,
    {
        id: "demo-wario",
        type: "wario",
        title: "Réflexes Éclair",
        xpCorrect: 15,
        tasks: [
            {
                id: "t1",
                instruction: "Tape le ROUGE !",
                options: ["Bleu", "Vert", "Rouge", "Jaune"],
                answer: "Rouge",
                duration: 3000,
            },
            {
                id: "t2",
                instruction: "Trouve l'intrus",
                options: ["Pomme", "Poire", "Banane", "Voiture"],
                answer: "Voiture",
                duration: 4000,
            },
        ],
    } as WarioData,
    {
        id: "demo-memory",
        type: "memory",
        title: "Symboles Chimiques",
        xpCorrect: 30,
        pairs: [
            { id: "p1", left: "H", right: "Hydrogène" },
            { id: "p2", left: "O", right: "Oxygène" },
            { id: "p3", left: "Na", right: "Sodium" },
            { id: "p4", left: "Cl", right: "Chlore" },
        ],
    } as MemoryData,
    {
        id: "demo-sort",
        type: "sort",
        title: "Grandeur Nature",
        xpCorrect: 25,
        items: [
            { id: "i1", label: "Fourmi", value: 1 },
            { id: "i2", label: "Lapin", value: 2 },
            { id: "i3", label: "Cheval", value: 3 },
            { id: "i4", label: "Éléphant", value: 4 },
        ],
    } as SortData,
];

export default function DemoPage() {
    const [activeGame, setActiveGame] = useState<GameData | null>(null);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                            Playground
                        </span>{" "}
                        Démo
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Test des composants de jeu extraits et standardisés.
                        Sélectionnez un jeu ci-dessous pour le lancer.
                    </p>
                </header>

                {/* Game Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {DEMO_GAMES.map((game) => (
                        <button
                            key={game.id}
                            onClick={() => setActiveGame(game)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-[1.02]
                                ${
                                    activeGame?.id === game.id
                                        ? "bg-primary-900/40 border-primary-500 ring-2 ring-primary-500/20"
                                        : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                                }`}
                        >
                            <div className="font-bold text-white mb-1">
                                {game.title}
                            </div>
                            <div className="text-xs font-mono uppercase tracking-wider opacity-60 bg-white/5 inline-block px-2 py-1 rounded">
                                {game.type}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Active Game Area */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-8 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
                    {activeGame ? (
                        <div className="w-full max-w-2xl relative z-10">
                            <div className="mb-6 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span className="w-2 h-8 rounded-full bg-primary-500 block"></span>
                                    {activeGame.title}
                                </h2>
                                <button
                                    onClick={() => setActiveGame(null)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    Fermer ✕
                                </button>
                            </div>

                            {/* Force remount on game change using key */}
                            <GameRenderer
                                key={activeGame.id}
                                game={activeGame}
                                onScore={(score) =>
                                    alert(`Terminé ! Score: ${score} XP`)
                                }
                            />
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 opacity-60">
                            <div className="text-6xl mb-4">👈</div>
                            <p className="text-xl font-medium">
                                Sélectionnez un jeu pour commencer
                            </p>
                        </div>
                    )}

                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[100px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
