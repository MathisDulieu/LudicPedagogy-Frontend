import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

const COURSES = [
    {
        name: "Introduction à Python",
        completion: 72,
        avgGrade: 15.4,
        activeStudents: 28,
        avgTime: "38 min",
    },
    {
        name: "Algorithmique avancée",
        completion: 45,
        avgGrade: 12.1,
        activeStudents: 18,
        avgTime: "52 min",
    },
    {
        name: "Bases de données SQL",
        completion: 88,
        avgGrade: 17.2,
        activeStudents: 31,
        avgTime: "29 min",
    },
];

export default function CourseStatsPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <BarChart3 className="text-primary-400" /> Statistiques des
                    cours
                </h1>
                <p className="text-slate-400 mt-1 text-sm">
                    Analysez la performance et l'engagement de vos étudiants.
                </p>
            </div>

            <div className="space-y-6">
                {COURSES.map(
                    ({
                        name,
                        completion,
                        avgGrade,
                        activeStudents,
                        avgTime,
                    }) => (
                        <div
                            key={name}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                        >
                            <h2 className="font-bold text-white text-lg mb-4">
                                {name}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {[
                                    {
                                        label: "Complétion moy.",
                                        value: `${completion}%`,
                                        icon: (
                                            <TrendingUp
                                                size={16}
                                                className="text-green-400"
                                            />
                                        ),
                                        color: "text-green-400",
                                    },
                                    {
                                        label: "Note moy.",
                                        value: `${avgGrade}/20`,
                                        icon: (
                                            <BarChart3
                                                size={16}
                                                className="text-primary-400"
                                            />
                                        ),
                                        color: "text-primary-400",
                                    },
                                    {
                                        label: "Étudiants actifs",
                                        value: activeStudents,
                                        icon: (
                                            <Users
                                                size={16}
                                                className="text-accent-400"
                                            />
                                        ),
                                        color: "text-accent-400",
                                    },
                                    {
                                        label: "Temps moy.",
                                        value: avgTime,
                                        icon: (
                                            <Clock
                                                size={16}
                                                className="text-orange-400"
                                            />
                                        ),
                                        color: "text-orange-400",
                                    },
                                ].map(({ label, value, icon, color }) => (
                                    <div
                                        key={label}
                                        className="bg-slate-800 rounded-xl p-4"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            {icon}
                                            <span className="text-xs text-slate-500">
                                                {label}
                                            </span>
                                        </div>
                                        <p
                                            className={`text-2xl font-bold ${color}`}
                                        >
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {/* Completion bar */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-500 w-20">
                                    Complétion
                                </span>
                                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
                                        style={{ width: `${completion}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-white w-10 text-right">
                                    {completion}%
                                </span>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}
