import { CreditCard, TrendingUp } from "lucide-react";

const SUBS = [
    {
        org: "Lycée Victor Hugo",
        plan: "Pro",
        users: 87,
        mrr: "79€",
        start: "1 sep. 2025",
        status: "active",
    },
    {
        org: "Université Paris 9",
        plan: "Enterprise",
        users: 412,
        mrr: "390€",
        start: "1 oct. 2025",
        status: "active",
    },
    {
        org: "École Numys",
        plan: "Starter",
        users: 24,
        mrr: "29€",
        start: "15 oct. 2025",
        status: "active",
    },
    {
        org: "Centre AFPA Nord",
        plan: "Pro",
        users: 65,
        mrr: "79€",
        start: "1 nov. 2025",
        status: "trial",
    },
    {
        org: "IUT de Bordeaux",
        plan: "Starter",
        users: 18,
        mrr: "29€",
        start: "1 déc. 2025",
        status: "suspended",
    },
];

const STATUS_STYLE: Record<string, string> = {
    active: "text-green-400 bg-green-900/30 border-green-700/40",
    trial: "text-yellow-400 bg-yellow-900/30 border-yellow-700/40",
    suspended: "text-red-400 bg-red-900/30 border-red-700/40",
};

export default function AdminSubscriptionsPage() {
    const totalMrr = "606€";

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="text-primary-400" /> Abonnements
                </h1>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-900/30 border border-green-700/40 text-green-400 text-sm font-bold">
                    <TrendingUp size={16} /> MRR total : {totalMrr}
                </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-6 text-xs text-slate-500 px-6 py-3 border-b border-slate-800">
                    <span className="col-span-2">Organisation</span>
                    <span>Plan</span>
                    <span>Utilisateurs</span>
                    <span>MRR</span>
                    <span>Statut</span>
                </div>
                {SUBS.map(({ org, plan, users, mrr, status }) => (
                    <div
                        key={org}
                        className="grid grid-cols-6 items-center px-6 py-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                        <span className="col-span-2 text-sm font-medium text-white">
                            {org}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                            {plan}
                        </span>
                        <span className="text-sm text-slate-400">{users}</span>
                        <span className="text-sm font-bold text-green-400">
                            {mrr}
                        </span>
                        <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full border w-fit ${STATUS_STYLE[status]}`}
                        >
                            {status === "active"
                                ? "Actif"
                                : status === "trial"
                                  ? "Essai"
                                  : "Suspendu"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
