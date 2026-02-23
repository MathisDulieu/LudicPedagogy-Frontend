import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, X, Zap, ArrowRight, HelpCircle } from "lucide-react";

const PLANS = [
    {
        name: "Starter",
        price: "29",
        period: "/ mois",
        tagline: "Idéal pour commencer",
        color: "border-slate-700",
        headerBg: "bg-slate-800",
        cta: "Commencer gratuit",
        featured: false,
        features: [
            { label: "Jusqu'à 30 étudiants", included: true },
            { label: "5 cours actifs", included: true },
            { label: "3 types de jeux", included: true },
            { label: "Statistiques basiques", included: true },
            { label: "Support email", included: true },
            { label: "Anti-triche", included: false },
            { label: "Multi-structures", included: false },
            { label: "API Access", included: false },
        ],
    },
    {
        name: "Pro",
        price: "79",
        period: "/ mois",
        tagline: "Pour les établissements",
        color: "border-primary-500 ring-2 ring-primary-500/30",
        headerBg: "bg-gradient-to-br from-primary-900 to-accent-900",
        cta: "Démarrer maintenant",
        featured: true,
        features: [
            { label: "Jusqu'à 200 étudiants", included: true },
            { label: "Cours illimités", included: true },
            { label: "9 types de jeux", included: true },
            { label: "Statistiques avancées", included: true },
            { label: "Support prioritaire", included: true },
            { label: "Anti-triche intégré", included: true },
            { label: "Multi-structures", included: true },
            { label: "API Access", included: false },
        ],
    },
    {
        name: "Enterprise",
        price: "199",
        period: "/ mois",
        tagline: "Pour les grandes orgs",
        color: "border-accent-700",
        headerBg: "bg-slate-800",
        cta: "Nous contacter",
        featured: false,
        features: [
            { label: "Étudiants illimités", included: true },
            { label: "Cours illimités", included: true },
            { label: "9 types de jeux", included: true },
            { label: "Statistiques avancées +", included: true },
            { label: "Support dédié 24/7", included: true },
            { label: "Anti-triche intégré", included: true },
            { label: "Multi-structures", included: true },
            { label: "API Access + Webhooks", included: true },
        ],
    },
];

const FAQ_PRICING = [
    {
        q: "Y a-t-il un engagement ?",
        a: "Non, tous nos plans sont sans engagement et vous pouvez résilier à tout moment depuis votre espace abonnement.",
    },
    {
        q: "Puis-je changer de plan en cours d'abonnement ?",
        a: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. La différence est calculée au prorata.",
    },
    {
        q: "Les 14 jours d'essai nécessitent-ils une carte bancaire ?",
        a: "Non, vous pouvez démarrer votre essai gratuit sans aucune information de paiement.",
    },
];

export default function PricingPage() {
    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-700/50 bg-primary-900/30 text-primary-300 text-sm font-medium mb-6">
                    <Zap size={14} />
                    Tarifs transparents
                </div>
                <h1 className="text-5xl font-extrabold text-white mb-4">
                    Un plan pour chaque établissement
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Essayez gratuitement 14 jours. Aucune carte requise.
                </p>

                {/* Billing toggle */}
                <div className="inline-flex items-center gap-3 mt-8 p-1 rounded-xl border border-slate-800 bg-slate-900">
                    <button
                        onClick={() => setBilling("monthly")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${billing === "monthly" ? "bg-primary-600 text-white" : "text-slate-400 hover:text-white"}`}
                    >
                        Mensuel
                    </button>
                    <button
                        onClick={() => setBilling("yearly")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-primary-600 text-white" : "text-slate-400 hover:text-white"}`}
                    >
                        Annuel
                        <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                            -20%
                        </span>
                    </button>
                </div>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {PLANS.map(
                    ({
                        name,
                        price,
                        period,
                        tagline,
                        color,
                        headerBg,
                        cta,
                        featured,
                        features,
                    }) => {
                        const actualPrice =
                            billing === "yearly"
                                ? Math.floor(parseInt(price) * 0.8)
                                : price;
                        return (
                            <div
                                key={name}
                                className={`rounded-3xl border ${color} overflow-hidden flex flex-col relative`}
                            >
                                {featured && (
                                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary-500 text-white text-xs font-bold uppercase">
                                        Populaire
                                    </div>
                                )}
                                <div className={`${headerBg} p-8`}>
                                    <h2 className="text-2xl font-bold text-white mb-1">
                                        {name}
                                    </h2>
                                    <p className="text-slate-400 text-sm mb-4">
                                        {tagline}
                                    </p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-5xl font-extrabold text-white">
                                            {actualPrice}€
                                        </span>
                                        <span className="text-slate-400 mb-1.5">
                                            {period}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col bg-slate-900">
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {features.map(({ label, included }) => (
                                            <li
                                                key={label}
                                                className={`flex items-center gap-2.5 text-sm ${included ? "text-slate-300" : "text-slate-600"}`}
                                            >
                                                {included ? (
                                                    <CheckCircle
                                                        size={16}
                                                        className="text-green-500 flex-shrink-0"
                                                    />
                                                ) : (
                                                    <X
                                                        size={16}
                                                        className="flex-shrink-0"
                                                    />
                                                )}
                                                {label}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        to={
                                            name === "Enterprise"
                                                ? "/vitrine/contact"
                                                : "/vitrine/signup"
                                        }
                                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all ${
                                            featured
                                                ? "bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:opacity-90"
                                                : "border border-slate-600 text-white hover:border-slate-400"
                                        }`}
                                    >
                                        {cta} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        );
                    },
                )}
            </div>

            {/* FAQ */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                    <HelpCircle size={24} className="text-primary-400" />
                    Questions fréquentes
                </h2>
                <div className="space-y-4">
                    {FAQ_PRICING.map(({ q, a }) => (
                        <div
                            key={q}
                            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50"
                        >
                            <p className="font-semibold text-white mb-2">{q}</p>
                            <p className="text-slate-400 text-sm">{a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
