import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    Search,
    ChevronRight,
    BarChart3,
    AlertTriangle,
    Clock,
} from "lucide-react";

// Mock: classes a teacher manages
const CLASSES = [
    { id: "cl1", name: "Terminale NSI A", students: 28, avg: 14.2, pending: 3 },
    { id: "cl2", name: "Terminale NSI B", students: 25, avg: 12.8, pending: 0 },
    {
        id: "cl3",
        name: "BTS SIO 1ère année",
        students: 18,
        avg: 15.6,
        pending: 1,
    },
];

// Mock: students per class
const STUDENTS: Record<
    string,
    {
        id: string;
        name: string;
        email: string;
        progress: number;
        avg: number;
        lastActive: string;
        alerts: number;
    }[]
> = {
    cl1: [
        {
            id: "u1",
            name: "Alice Martin",
            email: "alice.m@lycee.fr",
            progress: 85,
            avg: 16.4,
            lastActive: "Aujourd'hui",
            alerts: 0,
        },
        {
            id: "u2",
            name: "Thomas Leblanc",
            email: "thomas.l@lycee.fr",
            progress: 60,
            avg: 12.1,
            lastActive: "Hier",
            alerts: 1,
        },
        {
            id: "u3",
            name: "Sofia Kovacs",
            email: "sofia.k@lycee.fr",
            progress: 92,
            avg: 18.0,
            lastActive: "Aujourd'hui",
            alerts: 0,
        },
        {
            id: "u4",
            name: "Lucas Bernard",
            email: "lucas.b@lycee.fr",
            progress: 45,
            avg: 10.5,
            lastActive: "Il y a 3 jours",
            alerts: 2,
        },
    ],
    cl2: [
        {
            id: "u5",
            name: "Emma Jourdain",
            email: "emma.j@lycee.fr",
            progress: 70,
            avg: 13.5,
            lastActive: "Hier",
            alerts: 0,
        },
        {
            id: "u6",
            name: "Axel Renaud",
            email: "axel.r@lycee.fr",
            progress: 55,
            avg: 11.8,
            lastActive: "Il y a 2 jours",
            alerts: 0,
        },
    ],
    cl3: [
        {
            id: "u7",
            name: "Inès Dupont",
            email: "ines.d@bts.fr",
            progress: 88,
            avg: 15.2,
            lastActive: "Aujourd'hui",
            alerts: 0,
        },
        {
            id: "u8",
            name: "Nathan Cros",
            email: "nathan.c@bts.fr",
            progress: 72,
            avg: 16.0,
            lastActive: "Hier",
            alerts: 0,
        },
    ],
};

export default function StudentListPage() {
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [q, setQ] = useState("");

    const classData = selectedClass
        ? CLASSES.find((c) => c.id === selectedClass)
        : null;
    const students = selectedClass ? (STUDENTS[selectedClass] ?? []) : [];
    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(q.toLowerCase()) ||
            s.email.toLowerCase().includes(q.toLowerCase()),
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                {selectedClass && (
                    <button
                        onClick={() => {
                            setSelectedClass(null);
                            setQ("");
                        }}
                        className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-colors"
                    >
                        ←
                    </button>
                )}
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Users className="text-primary-400" />
                    {classData ? classData.name : "Mes classes"}
                </h1>
            </div>

            {/* CLASS SELECTOR */}
            {!selectedClass && (
                <div className="grid md:grid-cols-3 gap-4">
                    {CLASSES.map(
                        ({ id, name, students: count, avg, pending }) => (
                            <button
                                key={id}
                                onClick={() => setSelectedClass(id)}
                                className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-primary-700/50 hover:bg-slate-900/80 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-900/30 border border-primary-700/30 flex items-center justify-center">
                                        <Users
                                            size={18}
                                            className="text-primary-400"
                                        />
                                    </div>
                                    {pending > 0 && (
                                        <span className="text-xs bg-yellow-900/40 text-yellow-400 border border-yellow-700/30 px-2 py-0.5 rounded-full">
                                            {pending} en attente
                                        </span>
                                    )}
                                </div>
                                <h2 className="font-bold text-white group-hover:text-primary-300 transition-colors">
                                    {name}
                                </h2>
                                <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Users size={12} /> {count} élèves
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BarChart3 size={12} /> Moy. {avg}/20
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center justify-end text-primary-400 text-xs font-semibold">
                                    Voir les élèves <ChevronRight size={14} />
                                </div>
                            </button>
                        ),
                    )}
                </div>
            )}

            {/* STUDENT LIST for selected class */}
            {selectedClass && classData && (
                <>
                    {/* Summary bar */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                            {
                                label: "Moyenne classe",
                                value: `${classData.avg}/20`,
                                icon: (
                                    <BarChart3
                                        size={16}
                                        className="text-primary-400"
                                    />
                                ),
                            },
                            {
                                label: "Notes en attente",
                                value: classData.pending,
                                icon: (
                                    <Clock
                                        size={16}
                                        className="text-yellow-400"
                                    />
                                ),
                            },
                            {
                                label: "Total élèves",
                                value: classData.students,
                                icon: (
                                    <Users
                                        size={16}
                                        className="text-accent-400"
                                    />
                                ),
                            },
                        ].map(({ label, value, icon }) => (
                            <div
                                key={label}
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3"
                            >
                                <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center">
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">
                                        {label}
                                    </p>
                                    <p className="text-lg font-bold text-white">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500"
                            placeholder="Rechercher un élève…"
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-6 text-xs text-slate-500 px-6 py-3 border-b border-slate-800">
                            <span className="col-span-2">Élève</span>
                            <span>Progression</span>
                            <span>Moyenne</span>
                            <span>Dernière activité</span>
                            <span />
                        </div>
                        {filtered.map(
                            ({
                                id,
                                name,
                                email,
                                progress,
                                avg,
                                lastActive,
                                alerts,
                            }) => (
                                <div
                                    key={id}
                                    className="grid grid-cols-6 items-center px-6 py-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors"
                                >
                                    <div className="col-span-2 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                            {name[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-white truncate">
                                                {name}
                                            </p>
                                            <p className="text-xs text-slate-500 truncate">
                                                {email}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-500 w-8 text-right">
                                                {progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className={`text-sm font-bold ${avg >= 14 ? "text-green-400" : avg >= 10 ? "text-yellow-400" : "text-red-400"}`}
                                    >
                                        {avg}/20
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {lastActive}
                                    </span>
                                    <div className="flex items-center justify-end gap-2">
                                        {alerts > 0 && (
                                            <span
                                                title={`${alerts} alerte(s) anti-triche`}
                                                className="flex items-center gap-1 text-xs text-orange-400 bg-orange-900/20 border border-orange-700/30 px-2 py-0.5 rounded-full"
                                            >
                                                <AlertTriangle size={10} />{" "}
                                                {alerts}
                                            </span>
                                        )}
                                        <Link
                                            to={`/teacher/students/${id}`}
                                            className="p-1.5 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-900/20 transition-all"
                                        >
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ),
                        )}
                        {filtered.length === 0 && (
                            <div className="px-6 py-8 text-center text-slate-600 text-sm">
                                Aucun résultat.
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
