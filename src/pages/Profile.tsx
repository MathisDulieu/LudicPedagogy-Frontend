import { Trophy, Star } from "lucide-react";
import { Card } from "../components/ui/Card";

export default function Profile() {
    // Mock user data
    const user = {
        username: "CyberPlayer",
        level: 5,
        xp: 2450,
        nextLevelXp: 3000,
        achievements: 12,
        rank: "Hacker Éthique",
    };

    const progress = (user.xp / user.nextLevelXp) * 100;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Stats Card */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="text-center">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mb-4">
                            <span className="text-4xl font-bold text-white">
                                {user.username[0]}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                            {user.username}
                        </h2>
                        <p className="text-slate-400 mt-1">{user.rank}</p>

                        <div className="mt-6 flex items-center justify-center gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">
                                    {user.level}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">
                                    Niveau
                                </div>
                            </div>
                            <div className="w-px h-10 bg-slate-700" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">
                                    {user.achievements}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">
                                    Succès
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* XP Progress */}
                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-300">
                                XP Actuel
                            </span>
                            <span className="text-sm font-bold text-primary-400">
                                {user.xp} / {user.nextLevelXp}
                            </span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">
                            Plus que {user.nextLevelXp - user.xp} XP pour le
                            niveau {user.level + 1}
                        </p>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <Trophy className="text-yellow-500" />
                        Derniers Succès
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Card
                                key={i}
                                hoverEffect
                                className="flex items-center gap-4"
                            >
                                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                                    <Star
                                        className="text-yellow-500"
                                        size={24}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-200">
                                        Maître du Code {i}
                                    </h4>
                                    <p className="text-sm text-slate-400">
                                        Terminer le module {i} sans erreur
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
