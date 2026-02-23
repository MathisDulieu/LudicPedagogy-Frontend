import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    Trophy,
    AlertTriangle,
    Shield,
    TrendingUp,
} from "lucide-react";

const STUDENTS: Record<
    string,
    {
        name: string;
        email: string;
        class: string;
        level: number;
        xp: number;
        grades: {
            course: string;
            items: {
                label: string;
                score: string;
                max: number;
                outOf: number;
            }[];
        }[];
        alerts: {
            date: string;
            type: string;
            severity: "low" | "medium" | "high";
        }[];
        xpTimeline: { date: string; amount: number; reason: string }[];
    }
> = {
    u1: {
        name: "Alice Martin",
        email: "alice.m@lycee.fr",
        class: "Terminale NSI A",
        level: 7,
        xp: 2840,
        grades: [
            {
                course: "Les Bases du Binaire",
                items: [
                    {
                        label: "QCM — Introduction",
                        score: "16/20",
                        max: 20,
                        outOf: 20,
                    },
                    {
                        label: "Devoir : Conversions",
                        score: "17/20",
                        max: 20,
                        outOf: 20,
                    },
                ],
            },
            {
                course: "Maîtrise Hexadécimale",
                items: [
                    {
                        label: "QCM — Intro hex",
                        score: "15/20",
                        max: 20,
                        outOf: 20,
                    },
                ],
            },
        ],
        alerts: [],
        xpTimeline: [
            { date: "20 fév.", amount: 120, reason: "QCM Binaire" },
            { date: "18 fév.", amount: 80, reason: "Activité théorie" },
            { date: "15 fév.", amount: 200, reason: "Devoir rendu" },
        ],
    },
    u2: {
        name: "Thomas Leblanc",
        email: "thomas.l@lycee.fr",
        class: "Terminale NSI A",
        level: 4,
        xp: 980,
        grades: [
            {
                course: "Les Bases du Binaire",
                items: [
                    {
                        label: "QCM — Introduction",
                        score: "10/20",
                        max: 20,
                        outOf: 20,
                    },
                    {
                        label: "Devoir : Conversions",
                        score: "11/20",
                        max: 20,
                        outOf: 20,
                    },
                ],
            },
        ],
        alerts: [
            {
                date: "21 fév. 2026",
                type: "Changement d'onglet répété",
                severity: "medium",
            },
        ],
        xpTimeline: [
            { date: "19 fév.", amount: 60, reason: "QCM Binaire" },
            { date: "14 fév.", amount: 50, reason: "Activité théorie" },
        ],
    },
};

const SEVERITY_STYLE: Record<string, string> = {
    low: "text-yellow-400 bg-yellow-900/20 border-yellow-700/30",
    medium: "text-orange-400 bg-orange-900/20 border-orange-700/30",
    high: "text-red-400 bg-red-900/20 border-red-700/30",
};

export default function StudentProfilePage() {
    const { studentId } = useParams();
    const s = STUDENTS[studentId ?? ""] ?? {
        name: `Étudiant ${studentId}`,
        email: "—",
        class: "—",
        level: 1,
        xp: 0,
        grades: [],
        alerts: [],
        xpTimeline: [],
    };

    const allScores = s.grades.flatMap((g) => g.items);
    const avg =
        allScores.length > 0
            ? (
                  allScores.reduce(
                      (sum, i) => sum + (parseInt(i.score) / i.max) * i.outOf,
                      0,
                  ) / allScores.length
              ).toFixed(1)
            : "—";

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link
                    to="/teacher/students"
                    className="hover:text-white transition-colors"
                >
                    Mes élèves
                </Link>
                <span>/</span>
                <span className="text-slate-400">{s.class}</span>
                <span>/</span>
                <span className="text-white">{s.name}</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    to="/teacher/students"
                    className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={16} />
                </Link>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-2xl font-black">
                    {s.name[0]}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">{s.name}</h1>
                    <p className="text-sm text-slate-400">
                        {s.email} · {s.class}
                    </p>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                    {
                        label: "Niveau",
                        value: s.level,
                        icon: <Trophy size={16} className="text-yellow-400" />,
                    },
                    {
                        label: "XP Total",
                        value: s.xp,
                        icon: (
                            <TrendingUp
                                size={16}
                                className="text-primary-400"
                            />
                        ),
                    },
                    {
                        label: "Moyenne",
                        value: `${avg}/20`,
                        icon: (
                            <BookOpen size={16} className="text-accent-400" />
                        ),
                    },
                    {
                        label: "Alertes",
                        value: s.alerts.length,
                        icon: (
                            <AlertTriangle
                                size={16}
                                className={
                                    s.alerts.length > 0
                                        ? "text-orange-400"
                                        : "text-slate-500"
                                }
                            />
                        ),
                    },
                ].map(({ label, value, icon }) => (
                    <div
                        key={label}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-2.5"
                    >
                        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                            {icon}
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                {label}
                            </p>
                            <p className="font-bold text-white">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Grade breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
                    <BookOpen size={16} className="text-primary-400" />
                    <h2 className="font-bold text-white">
                        Résultats par cours
                    </h2>
                </div>
                {s.grades.length === 0 ? (
                    <div className="px-6 py-8 text-center text-slate-600 text-sm">
                        Aucune note disponible.
                    </div>
                ) : (
                    s.grades.map(({ course, items }) => (
                        <div key={course}>
                            <div className="px-6 py-2.5 bg-slate-800/30 border-b border-slate-800">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    {course}
                                </span>
                            </div>
                            {items.map(({ label, score, max }) => {
                                const pct = (parseInt(score) / max) * 100;
                                return (
                                    <div
                                        key={label}
                                        className="grid grid-cols-3 items-center px-6 py-3.5 border-b border-slate-800 last:border-0"
                                    >
                                        <span className="text-sm text-slate-300 col-span-2">
                                            {label}
                                        </span>
                                        <div className="flex items-center gap-3 justify-end">
                                            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${pct >= 70 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span
                                                className={`text-sm font-bold tabular-nums ${pct >= 70 ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"}`}
                                            >
                                                {score}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))
                )}
            </div>

            {/* Anti-cheat alerts */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
                    <Shield size={16} className="text-orange-400" />
                    <h2 className="font-bold text-white">
                        Alertes anti-triche
                    </h2>
                </div>
                {s.alerts.length === 0 ? (
                    <div className="px-6 py-6 text-center text-green-400 text-sm flex flex-col items-center gap-1">
                        <Shield size={20} className="opacity-70" />
                        Aucune alerte détectée
                    </div>
                ) : (
                    s.alerts.map(({ date, type, severity }, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between px-6 py-4 border-b border-slate-800 last:border-0"
                        >
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {type}
                                </p>
                                <p className="text-xs text-slate-500">{date}</p>
                            </div>
                            <span
                                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${SEVERITY_STYLE[severity]}`}
                            >
                                {severity === "low"
                                    ? "Faible"
                                    : severity === "medium"
                                      ? "Modéré"
                                      : "Élevé"}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {/* XP timeline */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
                    <TrendingUp size={16} className="text-primary-400" />
                    <h2 className="font-bold text-white">Timeline XP</h2>
                </div>
                <div className="divide-y divide-slate-800">
                    {s.xpTimeline.map(({ date, amount, reason }, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between px-6 py-3.5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-500" />
                                <span className="text-sm text-slate-300">
                                    {reason}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-right">
                                <span className="text-xs text-slate-500">
                                    {date}
                                </span>
                                <span className="text-sm font-bold text-primary-400">
                                    +{amount} XP
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
