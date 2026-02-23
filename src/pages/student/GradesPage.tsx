import { BookOpen, Trophy, CheckCircle } from "lucide-react";

const GRADES = [
    {
        course: "Introduction à Python",
        type: "Test QCM",
        grade: "18/20",
        date: "15 fév. 2026",
        badge: "Excellent",
    },
    {
        course: "Introduction à Python",
        type: "Devoir #1",
        grade: "14/20",
        date: "10 fév. 2026",
        badge: null,
    },
    {
        course: "Algorithmique avancée",
        type: "Test QCM",
        grade: "12/20",
        date: "5 fév. 2026",
        badge: null,
    },
    {
        course: "Bases de données SQL",
        type: "Devoir #1",
        grade: "En attente",
        date: "2 fév. 2026",
        badge: null,
    },
];

export default function GradesPage() {
    const avg = "14.7";
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Trophy className="text-yellow-400" /> Mes notes
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Toutes vos évaluations et résultats.
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-500 mb-0.5">
                        Moyenne générale
                    </p>
                    <p className="text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                        {avg}/20
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-5 text-xs text-slate-500 font-medium px-6 py-3 border-b border-slate-800">
                    <span className="col-span-2">Cours</span>
                    <span>Type</span>
                    <span>Date</span>
                    <span>Note</span>
                </div>
                {GRADES.map(({ course, type, grade, date, badge }) => (
                    <div
                        key={type + date}
                        className="grid grid-cols-5 items-center px-6 py-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                        <span className="col-span-2 text-sm text-white font-medium flex items-center gap-2">
                            <BookOpen
                                size={14}
                                className="text-primary-400 flex-shrink-0"
                            />
                            {course}
                        </span>
                        <span className="text-sm text-slate-400">{type}</span>
                        <span className="text-sm text-slate-500">{date}</span>
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-sm font-bold ${grade === "En attente" ? "text-slate-500" : "text-white"}`}
                            >
                                {grade}
                            </span>
                            {badge && (
                                <span className="text-xs bg-green-900/50 text-green-400 border border-green-700/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle size={10} /> {badge}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
