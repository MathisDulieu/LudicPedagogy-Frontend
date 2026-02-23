import { CreditCard, CheckCircle, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function SubscriptionPage() {
    const CURRENT_PLAN = {
        name: "Pro",
        price: "79€/mois",
        renewal: "1 mars 2026",
        users: 87,
        limit: 200,
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
                <CreditCard className="text-primary-400" /> Mon abonnement
            </h1>

            {/* Current plan */}
            <div className="bg-gradient-to-br from-primary-900/30 to-accent-900/20 border border-primary-700/40 rounded-3xl p-8 mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-600 text-white text-xs font-bold mb-2">
                            <Zap size={10} /> Plan actuel
                        </span>
                        <h2 className="text-3xl font-extrabold text-white">
                            {CURRENT_PLAN.name}
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            {CURRENT_PLAN.price} • Renouvellement le{" "}
                            {CURRENT_PLAN.renewal}
                        </p>
                    </div>
                    <CheckCircle size={32} className="text-green-400" />
                </div>
                <div className="mt-6">
                    <div className="flex justify-between text-sm text-slate-400 mb-1">
                        <span>Utilisateurs</span>
                        <span className="text-white font-semibold">
                            {CURRENT_PLAN.users} / {CURRENT_PLAN.limit}
                        </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                            style={{
                                width: `${(CURRENT_PLAN.users / CURRENT_PLAN.limit) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <h3 className="font-semibold text-white mb-3">
                        Gérer l'abonnement
                    </h3>
                    <div className="space-y-2">
                        <Link
                            to="/vitrine/pricing"
                            className="flex items-center justify-between p-3 rounded-xl border border-slate-700 text-sm text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                        >
                            Changer de plan <ArrowRight size={14} />
                        </Link>
                        <button className="flex items-center justify-between w-full p-3 rounded-xl border border-red-700/30 text-sm text-red-400 hover:bg-red-900/10 transition-all">
                            Résilier l'abonnement
                        </button>
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <h3 className="font-semibold text-white mb-3">
                        Facturation
                    </h3>
                    <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-800/50 text-sm text-slate-400">
                            <p className="text-white text-xs mb-0.5">
                                Carte bancaire
                            </p>
                            Visa •••• 4242
                        </div>
                        <Link
                            to="/org/payments"
                            className="flex items-center justify-between p-3 rounded-xl border border-slate-700 text-sm text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                        >
                            Historique des paiements <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
