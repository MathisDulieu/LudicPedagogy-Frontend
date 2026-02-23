import { Link } from "react-router-dom";
import {
    BookOpen,
    Trophy,
    BarChart3,
    Zap,
    Clock,
    ArrowRight,
} from "lucide-react";

const QUICK_STATS = [
    {
        label: "Cours en cours",
        value: "3",
        icon: <BookOpen size={18} className="text-primary-400" />,
        color: "border-primary-700/30 bg-primary-900/20",
    },
    {
        label: "XP total",
        value: "2 450",
        icon: <Zap size={18} className="text-yellow-400" />,
        color: "border-yellow-700/30 bg-yellow-900/20",
    },
    {
        label: "Classement",
        value: "#12",
        icon: <Trophy size={18} className="text-accent-400" />,
        color: "border-accent-700/30 bg-accent-900/20",
    },
    {
        label: "Heures étudiées",
        value: "18h",
        icon: <Clock size={18} className="text-green-400" />,
        color: "border-green-700/30 bg-green-900/20",
    },
];

const ACTIVITIES = [
    {
        title: "Introduction à Python — Quiz complété",
        time: "il y a 2h",
        xp: "+120 XP",
        type: "quiz",
    },
    {
        title: "Boucles For — Théorie lue",
        time: "il y a 4h",
        xp: "+50 XP",
        type: "theory",
    },
    {
        title: "Classement semaine mis à jour",
        time: "hier",
        xp: "🏆 Top 15",
        type: "ranking",
    },
];

export default function Dashboard() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Bonjour 👋</h1>
                <p className="text-slate-400 mt-1">
                    Voici un aperçu de votre activité.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {QUICK_STATS.map(({ label, value, icon, color }) => (
                    <div
                        key={label}
                        className={`p-5 rounded-2xl border ${color} flex items-center gap-4`}
                    >
                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                            {icon}
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">{label}</p>
                            <p className="text-2xl font-bold text-white">
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Recent activity */}
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-white flex items-center gap-2">
                            <BarChart3 size={18} className="text-primary-400" />{" "}
                            Activité récente
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {ACTIVITIES.map(({ title, time, xp }) => (
                            <div
                                key={title}
                                className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-800/50"
                            >
                                <div>
                                    <p className="text-sm text-white font-medium">
                                        {title}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {time}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-yellow-400">
                                    {xp}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick links */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h2 className="font-semibold text-white mb-4">
                        Raccourcis
                    </h2>
                    <div className="space-y-2">
                        {[
                            { label: "Mes cours", to: "/my-courses" },
                            { label: "Catalogue", to: "/catalog" },
                            { label: "Classement", to: "/leaderboard" },
                            { label: "Hub de jeux", to: "/hub" },
                        ].map(({ label, to }) => (
                            <Link
                                key={to}
                                to={to}
                                className="flex items-center justify-between p-3 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors text-sm text-slate-300 hover:text-white"
                            >
                                {label}{" "}
                                <ArrowRight
                                    size={14}
                                    className="text-slate-500"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
