import { Link } from "react-router-dom";

const GAMES = [
    {
        id: "hex-flash",
        name: "Hex Flash",
        type: "Rapide",
        emoji: "⚡",
        description: "Convertis des nombres hexadécimaux le plus vite possible",
    },
    {
        id: "terminal-riddle",
        name: "Terminal Riddle",
        type: "Énigme",
        emoji: "🧩",
        description: "Résous des énigmes dans un terminal simulé",
    },
    {
        id: "binary-slap",
        name: "Binary Slap",
        type: "Action",
        emoji: "💥",
        description: "Tape sur les bons bits binaires",
    },
];

export default function GameHub() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link
                        to="/"
                        className="inline-block mb-6 text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        ← Retour à l'accueil
                    </Link>
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                        Choisis ton défi
                    </h1>
                    <p className="text-xl text-slate-300">
                        Sélectionne un jeu et montre tes compétences !
                    </p>
                </div>

                {/* Game Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GAMES.map((game) => (
                        <Link
                            key={game.id}
                            to={`/game/${game.id}`}
                            className="group game-card flex flex-col"
                        >
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {game.emoji}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary-300 transition-colors">
                                {game.name}
                            </h3>
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/50 mb-3 self-start">
                                {game.type}
                            </span>
                            <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                                {game.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Stats/Leaderboard Link */}
                <div className="mt-12 text-center">
                    <Link
                        to="/leaderboard"
                        className="neon-button inline-block"
                    >
                        Voir le classement 🏆
                    </Link>
                </div>
            </div>
        </div>
    );
}
