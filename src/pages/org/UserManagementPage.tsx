import { useState } from "react";
import { Users, Search, Shield, Edit, Trash2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const USERS = [
    {
        id: "u1",
        name: "Marie Fontaine",
        email: "marie.f@lycee.fr",
        role: "teacher",
        class: "NSI A",
    },
    {
        id: "u2",
        name: "Alice Martin",
        email: "alice.m@lycee.fr",
        role: "student",
        class: "NSI A",
    },
    {
        id: "u3",
        name: "Julien Maret",
        email: "julien.m@lycee.fr",
        role: "teacher",
        class: "NSI A, NSI B",
    },
    {
        id: "u4",
        name: "Thomas Leblanc",
        email: "thomas.l@lycee.fr",
        role: "student",
        class: "NSI B",
    },
    {
        id: "u5",
        name: "Sofia Kovacs",
        email: "sofia.k@lycee.fr",
        role: "student",
        class: "BTS SIO 1",
    },
];

const ROLE_COLORS: Record<string, string> = {
    teacher: "bg-primary-900/50 text-primary-400 border-primary-700/40",
    student: "bg-slate-800 text-slate-400",
    admin: "bg-accent-900/50 text-accent-400 border-accent-700/40",
};

export default function UserManagementPage() {
    const [q, setQ] = useState("");
    const filtered = USERS.filter(
        (u) =>
            u.name.toLowerCase().includes(q.toLowerCase()) ||
            u.email.toLowerCase().includes(q.toLowerCase()),
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Users className="text-primary-400" /> Gestion des
                    utilisateurs
                </h1>
                <Link
                    to="/org/invite"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                    <UserPlus size={16} /> Inviter
                </Link>
            </div>

            <div className="relative mb-6">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                    placeholder="Rechercher…"
                />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-5 text-xs text-slate-500 px-6 py-3 border-b border-slate-800">
                    <span className="col-span-2">Utilisateur</span>
                    <span>Rôle</span>
                    <span>Classe</span>
                    <span />
                </div>
                {filtered.map(({ id, name, email, role, class: cls }) => (
                    <div
                        key={id}
                        className="grid grid-cols-5 items-center px-6 py-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                        <div className="col-span-2">
                            <p className="text-sm font-medium text-white">
                                {name}
                            </p>
                            <p className="text-xs text-slate-500">{email}</p>
                        </div>
                        <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full border w-fit ${ROLE_COLORS[role]}`}
                        >
                            {role === "teacher" ? "Enseignant" : "Étudiant"}
                        </span>
                        <span className="text-xs text-slate-500">{cls}</span>
                        <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 text-slate-500 hover:text-white">
                                <Edit size={14} />
                            </button>
                            <button className="p-1.5 text-slate-500 hover:text-primary-400">
                                <Shield size={14} />
                            </button>
                            <button className="p-1.5 text-slate-500 hover:text-red-400">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
