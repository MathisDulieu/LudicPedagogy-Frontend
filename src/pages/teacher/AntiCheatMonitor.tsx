import { useParams } from "react-router-dom";
import { Shield, AlertTriangle, Eye } from "lucide-react";

const STUDENTS = [
    { name: "Alice Martin", suspicious: 3, status: "active" },
    { name: "Thomas B.", suspicious: 0, status: "active" },
    { name: "Sofia K.", suspicious: 12, status: "flagged" },
    { name: "Marc D.", suspicious: 1, status: "active" },
    { name: "Lucie P.", suspicious: 0, status: "finished" },
];

export default function AntiCheatMonitor() {
    const { sessionId } = useParams();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Shield className="text-red-400" /> Anti-triche —
                        Session #{sessionId}
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Surveillance en temps réel des comportements suspects.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-900/30 border border-green-700/40 text-green-400 text-xs font-semibold">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />{" "}
                    Live
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 text-xs text-slate-500 font-medium px-6 py-3 border-b border-slate-800">
                    <span className="col-span-2">Étudiant</span>
                    <span>Alertes</span>
                    <span>Statut</span>
                </div>
                {STUDENTS.map(({ name, suspicious, status }) => (
                    <div
                        key={name}
                        className={`grid grid-cols-4 items-center px-6 py-4 border-b border-slate-800 last:border-0 ${status === "flagged" ? "bg-red-900/10" : ""}`}
                    >
                        <span className="col-span-2 text-sm font-medium text-white flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                                {name[0]}
                            </div>
                            {name}
                        </span>
                        <span
                            className={`flex items-center gap-1.5 text-sm font-bold ${suspicious > 5 ? "text-red-400" : suspicious > 0 ? "text-yellow-400" : "text-green-400"}`}
                        >
                            {suspicious > 0 && <AlertTriangle size={14} />}
                            {suspicious}{" "}
                            {suspicious === 1 ? "alerte" : "alertes"}
                        </span>
                        <div className="flex items-center justify-between">
                            <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                    status === "flagged"
                                        ? "bg-red-900/50 text-red-400 border border-red-700/40"
                                        : status === "finished"
                                          ? "bg-slate-800 text-slate-400"
                                          : "bg-green-900/40 text-green-400"
                                }`}
                            >
                                {status === "flagged"
                                    ? "Suspect"
                                    : status === "finished"
                                      ? "Terminé"
                                      : "En cours"}
                            </span>
                            <button className="p-1.5 text-slate-500 hover:text-white">
                                <Eye size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
