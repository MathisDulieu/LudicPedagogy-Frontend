import {
    Building2,
    Users,
    BookOpen,
    BarChart3,
    TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
    {
        label: "Classes actives",
        value: "4",
        icon: <Building2 size={18} className="text-primary-400" />,
        color: "border-primary-700/30 bg-primary-900/20",
    },
    {
        label: "Utilisateurs",
        value: "87",
        icon: <Users size={18} className="text-accent-400" />,
        color: "border-accent-700/30 bg-accent-900/20",
    },
    {
        label: "Cours actifs",
        value: "12",
        icon: <BookOpen size={18} className="text-green-400" />,
        color: "border-green-700/30 bg-green-900/20",
    },
    {
        label: "Taux de complétion",
        value: "74%",
        icon: <TrendingUp size={18} className="text-yellow-400" />,
        color: "border-yellow-700/30 bg-yellow-900/20",
    },
];

const CLASSES = [
    {
        id: "cl1",
        name: "Terminale NSI A",
        students: 28,
        teachers: 2,
        progress: 72,
    },
    {
        id: "cl2",
        name: "Terminale NSI B",
        students: 25,
        teachers: 1,
        progress: 58,
    },
    { id: "cl3", name: "BTS SIO 1", students: 18, teachers: 3, progress: 85 },
    { id: "cl4", name: "BTS SIO 2", students: 16, teachers: 2, progress: 91 },
];

export default function OrgDashboard() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Building2 className="text-primary-400" /> Tableau de bord
                    organisation
                </h1>
                <p className="text-slate-400 mt-1 text-sm">
                    Vue d'ensemble de votre établissement.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {STATS.map(({ label, value, icon, color }) => (
                    <div
                        key={label}
                        className={`p-5 rounded-2xl border ${color} flex items-center gap-3`}
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
                <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-white flex items-center gap-2">
                            <BarChart3 size={16} className="text-primary-400" />{" "}
                            Mes classes
                        </h2>
                        <Link
                            to="/org/classes"
                            className="text-xs text-primary-400 hover:underline"
                        >
                            Voir tout
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {CLASSES.map(
                            ({ id, name, students, teachers, progress }) => (
                                <Link
                                    to={`/org/classes/${id}`}
                                    key={id}
                                    className="block p-4 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium text-white text-sm">
                                            {name}
                                        </p>
                                        <div className="flex gap-3 text-xs text-slate-500">
                                            <span>{students} élèves</span>
                                            <span>{teachers} profs</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            {progress}%
                                        </span>
                                    </div>
                                </Link>
                            ),
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-white mb-4">
                        Liens rapides
                    </h2>
                    <div className="space-y-2">
                        {[
                            { label: "Gérer les classes", to: "/org/classes" },
                            {
                                label: "Gérer les utilisateurs",
                                to: "/org/users",
                            },
                            { label: "Inviter des membres", to: "/org/invite" },
                            {
                                label: "Mon abonnement",
                                to: "/org/subscription",
                            },
                        ].map(({ label, to }) => (
                            <Link
                                key={to}
                                to={to}
                                className="block p-3 rounded-xl border border-slate-800 text-sm text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
