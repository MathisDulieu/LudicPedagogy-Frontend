import { useState } from "react";
import { Users, Search, Shield, Trash2, Edit } from "lucide-react";

const ALL_USERS = [
    {
        name: "Marie Fontaine",
        email: "marie.f@lycee.fr",
        role: "teacher",
        org: "Lycée Victor Hugo",
    },
    {
        name: "Alice Martin",
        email: "alice.m@lycee.fr",
        role: "student",
        org: "Lycée Victor Hugo",
    },
    {
        name: "Julien Maret",
        email: "julien.m@lycee.fr",
        role: "teacher",
        org: "École Numys",
    },
    {
        name: "Mathieu Roux",
        email: "m.roux@lyvh.fr",
        role: "org_owner",
        org: "Lycée Victor Hugo",
    },
    {
        name: "Claire Dupont",
        email: "claire.d@numys.fr",
        role: "org_owner",
        org: "École Numys",
    },
    {
        name: "Admin Système",
        email: "admin@ludicpedagogy.fr",
        role: "admin",
        org: "LudicPedagogy",
    },
];

const ROLE_LABELS: Record<string, { label: string; style: string }> = {
    admin: {
        label: "Admin",
        style: "text-red-400 bg-red-900/30 border-red-700/40",
    },
    org_owner: {
        label: "Org Owner",
        style: "text-accent-400 bg-accent-900/30 border-accent-700/40",
    },
    teacher: {
        label: "Enseignant",
        style: "text-primary-400 bg-primary-900/30 border-primary-700/40",
    },
    student: {
        label: "Étudiant",
        style: "text-slate-400 bg-slate-800 border-slate-700",
    },
};

export default function AdminUsersPage() {
    const [q, setQ] = useState("");
    const filtered = ALL_USERS.filter((u) =>
        u.name.toLowerCase().includes(q.toLowerCase()),
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Users className="text-primary-400" /> Tous les utilisateurs
                </h1>
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
                    <span>Organisation</span>
                    <span />
                </div>
                {filtered.map(({ name, email, role, org }) => (
                    <div
                        key={email}
                        className="grid grid-cols-5 items-center px-6 py-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                        <div className="col-span-2">
                            <p className="text-sm font-medium text-white">
                                {name}
                            </p>
                            <p className="text-xs text-slate-500">{email}</p>
                        </div>
                        <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full border w-fit ${ROLE_LABELS[role].style}`}
                        >
                            {ROLE_LABELS[role].label}
                        </span>
                        <span className="text-xs text-slate-500">{org}</span>
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
