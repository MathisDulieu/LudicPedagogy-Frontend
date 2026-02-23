import { Link } from "react-router-dom";
import { Clock, Users, Play, Eye } from "lucide-react";

const SESSIONS = [
    {
        id: "s1",
        quiz: "QCM Python Chapitre 1",
        date: "22 fév. 2026 — 10h00",
        active: 24,
        total: 28,
        status: "live",
    },
    {
        id: "s2",
        quiz: "QCM Algorithmique",
        date: "18 fév. 2026 — 14h00",
        active: 0,
        total: 18,
        status: "done",
    },
    {
        id: "s3",
        quiz: "QCM SQL Chapitre 2",
        date: "25 fév. 2026 — 09h00",
        active: 0,
        total: 31,
        status: "scheduled",
    },
];

export default function TestSessionsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Play className="text-primary-400" /> Sessions de test
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Gérez vos sessions de quiz en direct et planifiées.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                    <Play size={16} /> Lancer une session
                </button>
            </div>
            <div className="space-y-4">
                {SESSIONS.map(({ id, quiz, date, active, total, status }) => (
                    <div
                        key={id}
                        className={`p-6 rounded-2xl border transition-all ${status === "live" ? "border-green-700/50 bg-green-900/10" : "border-slate-800 bg-slate-900/50"}`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    {status === "live" && (
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-900/50 px-2 py-0.5 rounded-full border border-green-700/40">
                                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                            LIVE
                                        </span>
                                    )}
                                    {status === "scheduled" && (
                                        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                                            Planifiée
                                        </span>
                                    )}
                                    {status === "done" && (
                                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                                            Terminée
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-bold text-white mb-0.5">
                                    {quiz}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} /> {date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users size={12} />{" "}
                                        {status === "live"
                                            ? `${active} actifs / ${total}`
                                            : `${total} participants`}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {status === "live" && (
                                    <Link
                                        to={`/teacher/anti-cheat/${id}`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 text-red-400 border border-red-700/40 text-xs font-semibold hover:bg-red-600/30 transition-colors"
                                    >
                                        👁 Surveiller
                                    </Link>
                                )}
                                <Link
                                    to={`/teacher/sessions/${id}`}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-400 text-xs hover:border-slate-500 hover:text-white transition-colors"
                                >
                                    <Eye size={14} /> Détails
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
