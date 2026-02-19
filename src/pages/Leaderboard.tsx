import { Link } from "react-router-dom";
import { useLeaderboard } from "../contexts/useLeaderboardContext";

export default function Leaderboard() {
    const { scores } = useLeaderboard();

    const top = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link
                        to="/"
                        className="inline-block mb-6 text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        ← Retour à l'accueil
                    </Link>
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                        🏆 Leaderboard
                    </h1>
                    <p className="text-xl text-slate-300">
                        Les meilleurs joueurs de LudicPedagogy
                    </p>
                </div>

                {/* Leaderboard */}
                <div className="terminal-box">
                    {top.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-2xl text-slate-400">
                                Aucun score enregistré
                            </p>
                            <p className="text-slate-500 mt-2">
                                Sois le premier à jouer !
                            </p>
                            <Link
                                to="/hub"
                                className="neon-button inline-block mt-6"
                            >
                                Commencer à jouer
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {top.map((s, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:bg-slate-800/50 ${
                                        i === 0
                                            ? "bg-gradient-to-r from-accent-500/20 to-primary-500/20 border-2 border-accent-500/50"
                                            : i === 1
                                              ? "bg-slate-800/30 border border-slate-600/50"
                                              : i === 2
                                                ? "bg-slate-800/20 border border-slate-700/50"
                                                : "bg-slate-800/10"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`text-2xl font-bold w-12 text-center ${
                                                i === 0
                                                    ? "text-accent-400"
                                                    : i === 1
                                                      ? "text-slate-300"
                                                      : i === 2
                                                        ? "text-amber-600"
                                                        : "text-slate-500"
                                            }`}
                                        >
                                            #{i + 1}
                                        </span>
                                        <div>
                                            <p className="text-lg font-semibold text-white">
                                                {s.username}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-primary-400">
                                            {s.score}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            points
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back to hub */}
                <div className="mt-8 text-center">
                    <Link
                        to="/hub"
                        className="px-6 py-3 rounded-lg font-semibold border-2 border-primary-500/50 hover:border-primary-400 hover:bg-slate-800/50 transition-all duration-300 inline-block"
                    >
                        Retour au Hub
                    </Link>
                </div>
            </div>
        </div>
    );
}
