import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft,
    Building2,
    Users,
    CreditCard,
    ShieldOff,
} from "lucide-react";

const ORG_DATA: Record<
    string,
    {
        name: string;
        plan: string;
        users: number;
        status: string;
        owner: string;
        created: string;
    }
> = {
    o1: {
        name: "Lycée Victor Hugo",
        plan: "Pro",
        users: 87,
        status: "active",
        owner: "Mathieu Roux",
        created: "15 sep. 2025",
    },
    o2: {
        name: "École Numys",
        plan: "Starter",
        users: 24,
        status: "active",
        owner: "Claire Dupont",
        created: "3 oct. 2025",
    },
};

export default function AdminOrgDetailPage() {
    const { orgId } = useParams();
    const org = ORG_DATA[orgId ?? ""] ?? {
        name: `Organisation ${orgId}`,
        plan: "—",
        users: 0,
        status: "active",
        owner: "—",
        created: "—",
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Link
                    to="/admin/organizations"
                    className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={16} />
                </Link>
                <h1 className="text-2xl font-bold text-white">{org.name}</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                    {
                        label: "Plan",
                        value: org.plan,
                        icon: (
                            <CreditCard
                                size={16}
                                className="text-primary-400"
                            />
                        ),
                    },
                    {
                        label: "Utilisateurs",
                        value: org.users,
                        icon: <Users size={16} className="text-accent-400" />,
                    },
                    {
                        label: "Propriétaire",
                        value: org.owner,
                        icon: (
                            <Building2 size={16} className="text-green-400" />
                        ),
                    },
                    { label: "Créée le", value: org.created, icon: "📅" },
                ].map(({ label, value, icon }) => (
                    <div
                        key={label}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-3"
                    >
                        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center">
                            {icon}
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">{label}</p>
                            <p className="font-bold text-white">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <h2 className="font-semibold text-white mb-2">Actions admin</h2>
                <button className="w-full flex items-center gap-2 p-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all text-sm">
                    <CreditCard size={14} /> Modifier le plan
                </button>
                <button className="w-full flex items-center gap-2 p-3 rounded-xl border border-red-700/30 text-red-400 hover:bg-red-900/10 transition-all text-sm">
                    <ShieldOff size={14} /> Suspendre l'organisation
                </button>
            </div>
        </div>
    );
}
