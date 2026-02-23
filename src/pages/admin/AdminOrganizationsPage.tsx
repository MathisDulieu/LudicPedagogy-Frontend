import { Building2, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ORGS = [
    {
        id: "o1",
        name: "Lycée Victor Hugo",
        plan: "Pro",
        users: 87,
        status: "active",
    },
    {
        id: "o2",
        name: "École Numys",
        plan: "Starter",
        users: 24,
        status: "active",
    },
    {
        id: "o3",
        name: "Université Paris 9",
        plan: "Enterprise",
        users: 412,
        status: "active",
    },
    {
        id: "o4",
        name: "Centre AFPA Nord",
        plan: "Pro",
        users: 65,
        status: "trial",
    },
    {
        id: "o5",
        name: "IUT de Bordeaux",
        plan: "Starter",
        users: 18,
        status: "suspended",
    },
];

const STATUS_COLORS: Record<string, string> = {
    active: "text-green-400 bg-green-900/30 border-green-700/40",
    trial: "text-yellow-400 bg-yellow-900/30 border-yellow-700/40",
    suspended: "text-red-400 bg-red-900/30 border-red-700/40",
};

export default function AdminOrganizationsPage() {
    const [q, setQ] = useState("");
    const filtered = ORGS.filter((o) =>
        o.name.toLowerCase().includes(q.toLowerCase()),
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Building2 className="text-primary-400" /> Organisations
                </h1>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                    <Plus size={16} /> Ajouter
                </button>
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
                    <span className="col-span-2">Organisation</span>
                    <span>Plan</span>
                    <span>Utilisateurs</span>
                    <span>Statut</span>
                </div>
                {filtered.map(({ id, name, plan, users, status }) => (
                    <Link
                        to={`/admin/organizations/${id}`}
                        key={id}
                        className="grid grid-cols-5 items-center px-6 py-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                        <span className="col-span-2 font-medium text-white">
                            {name}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                            {plan}
                        </span>
                        <span className="text-sm text-slate-400">{users}</span>
                        <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border w-fit ${STATUS_COLORS[status]}`}
                        >
                            {status === "active"
                                ? "Actif"
                                : status === "trial"
                                  ? "Essai"
                                  : "Suspendu"}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
