import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, BookOpen, ChevronRight } from "lucide-react";

const CLASS_DATA = {
    cl1: {
        name: "Terminale NSI A",
        students: 28,
        teachers: ["Marie Fontaine", "Julien Maret"],
        courses: ["Python", "Algorithmique"],
        progress: 72,
    },
    cl2: {
        name: "Terminale NSI B",
        students: 25,
        teachers: ["Marc Faure"],
        courses: ["Python"],
        progress: 58,
    },
};

export default function SubstructureDetailPage() {
    const { classId } = useParams();
    const data = CLASS_DATA[classId as keyof typeof CLASS_DATA] ?? {
        name: `Classe ${classId}`,
        students: 0,
        teachers: [],
        courses: [],
        progress: 0,
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Link
                    to="/org/classes"
                    className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={16} />
                </Link>
                <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    {
                        label: "Étudiants",
                        value: data.students,
                        icon: <Users size={16} className="text-primary-400" />,
                    },
                    {
                        label: "Enseignants",
                        value: data.teachers.length,
                        icon: <Users size={16} className="text-accent-400" />,
                    },
                    {
                        label: "Complétion moy.",
                        value: `${data.progress}%`,
                        icon: <BookOpen size={16} className="text-green-400" />,
                    },
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

            {/* Teachers */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4">
                <h2 className="font-semibold text-white mb-3">Enseignants</h2>
                <div className="space-y-2">
                    {data.teachers.map((t) => (
                        <div
                            key={t}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-xs font-bold">
                                {t[0]}
                            </div>
                            <span className="text-sm text-white">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Courses */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="font-semibold text-white mb-3">
                    Cours assignés
                </h2>
                <div className="space-y-2">
                    {data.courses.map((c) => (
                        <div
                            key={c}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50"
                        >
                            <span className="text-sm text-white flex items-center gap-2">
                                <BookOpen
                                    size={14}
                                    className="text-primary-400"
                                />{" "}
                                {c}
                            </span>
                            <ChevronRight
                                size={14}
                                className="text-slate-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
