import { BookOpen, Plus, Edit, Trash2, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const COURSES = [
    {
        id: "c1",
        title: "Introduction à Python",
        students: 28,
        progress: 72,
        sections: 5,
    },
    {
        id: "c2",
        title: "Algorithmique avancée",
        students: 18,
        progress: 45,
        sections: 8,
    },
    {
        id: "c3",
        title: "Bases de données SQL",
        students: 31,
        progress: 88,
        sections: 6,
    },
];

export default function TeacherCoursesPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <BookOpen className="text-primary-400" /> Mes cours
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Gérez vos cours et suivez leurs statistiques.
                    </p>
                </div>
                <Link
                    to="/course-editor"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                    <Plus size={16} /> Nouveau cours
                </Link>
            </div>

            <div className="space-y-4">
                {COURSES.map(({ id, title, students, progress, sections }) => (
                    <div
                        key={id}
                        className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition-all"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h2 className="font-bold text-white text-lg mb-1">
                                    {title}
                                </h2>
                                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Users size={14} /> {students} étudiants
                                    </span>
                                    <span>{sections} sections</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        {progress}% de complétion moy.
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    to={`/teacher/stats`}
                                    className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                                >
                                    <BarChart3 size={16} />
                                </Link>
                                <Link
                                    to={`/course-editor/${id}`}
                                    className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                                >
                                    <Edit size={16} />
                                </Link>
                                <button className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-700/50 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
