import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, BarChart3, Download } from "lucide-react";

const RESULTS = [
    { name: "Alice Martin", score: "18/20", time: "12m 30s", suspicious: 0 },
    { name: "Thomas B.", score: "14/20", time: "18m 10s", suspicious: 1 },
    { name: "Sofia K.", score: "9/20", time: "6m 55s", suspicious: 12 },
    { name: "Marc D.", score: "16/20", time: "14m 20s", suspicious: 0 },
    { name: "Lucie P.", score: "20/20", time: "10m 05s", suspicious: 0 },
];

export default function SessionDetailPage() {
    const { sessionId } = useParams();
    const avg = "15.4";

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <Link
                    to="/teacher/sessions"
                    className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Session #{sessionId} — QCM Python Ch. 1
                    </h1>
                    <p className="text-slate-400 text-sm">
                        22 fév. 2026 • {RESULTS.length} participants
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    {
                        label: "Participants",
                        value: RESULTS.length,
                        icon: <Users size={16} className="text-primary-400" />,
                    },
                    {
                        label: "Moyenne",
                        value: `${avg}/20`,
                        icon: (
                            <BarChart3 size={16} className="text-accent-400" />
                        ),
                    },
                    { label: "Alertes anti-triche", value: "13", icon: "⚠️" },
                ].map(({ label, value, icon }) => (
                    <div
                        key={label}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                            {icon}
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">{label}</p>
                            <p className="text-xl font-bold text-white">
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mb-3">
                <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-xl transition-all">
                    <Download size={14} /> Exporter CSV
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 text-xs text-slate-500 px-6 py-3 border-b border-slate-800">
                    <span className="col-span-2">Étudiant</span>
                    <span>Score</span>
                    <span>Alertes</span>
                </div>
                {RESULTS.map(({ name, score, time, suspicious }) => (
                    <div
                        key={name}
                        className="grid grid-cols-4 items-center px-6 py-4 border-b border-slate-800 last:border-0"
                    >
                        <span className="col-span-2 text-sm text-white">
                            {name}{" "}
                            <span className="text-xs text-slate-500 ml-1">
                                {time}
                            </span>
                        </span>
                        <span className="text-sm font-bold text-white">
                            {score}
                        </span>
                        <span
                            className={`text-sm font-bold ${suspicious > 5 ? "text-red-400" : suspicious > 0 ? "text-yellow-400" : "text-green-400"}`}
                        >
                            {suspicious}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
