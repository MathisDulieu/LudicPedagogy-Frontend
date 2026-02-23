import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const FAQ_DATA = [
    {
        category: "Général",
        items: [
            {
                q: "Qu'est-ce que LudicPedagogy ?",
                a: "LudicPedagogy est une plateforme éducative qui combine des cours interactifs avec des mécaniques de jeu (gamification) pour rendre l'apprentissage plus engageant. Elle s'adresse aux établissements scolaires, universités, centres de formation et entreprises.",
            },
            {
                q: "À qui s'adresse la plateforme ?",
                a: "La plateforme est conçue pour les enseignants qui créent du contenu, les étudiants qui apprennent, et les directeurs pédagogiques ou responsables d'organisation qui pilotent l'ensemble.",
            },
            {
                q: "LudicPedagogy est-il accessible sur mobile ?",
                a: "Oui, l'interface est responsive et fonctionne sur tous les appareils (ordinateur, tablette, smartphone). Une application mobile native est prévue pour 2026.",
            },
        ],
    },
    {
        category: "Plans & Facturation",
        items: [
            {
                q: "Y a-t-il un essai gratuit ?",
                a: "Oui, tous les plans bénéficient d'un essai gratuit de 14 jours sans carte bancaire requise. À la fin de l'essai, vous pouvez choisir de continuer avec un plan payant ou de supprimer votre compte.",
            },
            {
                q: "Puis-je changer de plan en cours d'abonnement ?",
                a: "Oui, vous pouvez passer à un plan supérieur à tout moment. Le montant sera ajusté au prorata. Pour passer à un plan inférieur, le changement prend effet à la prochaine date de facturation.",
            },
            {
                q: "Comment fonctionne la facturation ?",
                a: "La facturation est mensuelle ou annuelle selon votre choix. En cas d'abonnement annuel, vous bénéficiez d'une réduction de 20% sur le prix mensuel.",
            },
            {
                q: "Acceptez-vous les bons de commande (PO) ?",
                a: "Oui, pour les plans Enterprise, nous acceptons les bons de commande. Contactez notre équipe commerciale pour plus d'informations.",
            },
        ],
    },
    {
        category: "Fonctionnalités",
        items: [
            {
                q: "Combien de types de jeux sont disponibles ?",
                a: "LudicPedagogy propose actuellement 9 types de jeux pédagogiques : QCM, Vrai/Faux, Complétion de texte, Association de termes, Timeline, Mémoire, Énigme, Réaction, et Tri. De nouveaux formats sont ajoutés régulièrement.",
            },
            {
                q: "Comment fonctionne la détection de triche ?",
                a: "Quand un étudiant lance une évaluation, le système surveille les mouvements de souris. Si l'étudiant déplace souvent le curseur hors de la zone de l'exercice, cela est consigné comme comportement suspect et visible par l'enseignant en temps réel.",
            },
            {
                q: "Peut-on importer des cours existants ?",
                a: "Oui, vous pouvez importer des contenus depuis des fichiers PDF, Word ou depuis des formats SCORM. Notre outil d'import vous guide pas à pas.",
            },
            {
                q: "Les étudiants ont-ils besoin de créer un compte ?",
                a: "Oui, chaque étudiant doit avoir un compte pour accéder aux cours, suivre sa progression et apparaître dans les classements. Vous pouvez les inviter en masse par email ou leur partager un code d'accès.",
            },
        ],
    },
    {
        category: "Sécurité & Données",
        items: [
            {
                q: "Où sont hébergées les données ?",
                a: "Les données sont hébergées en France, sur des serveurs conformes au RGPD. Aucune donnée n'est transférée hors de l'Union Européenne sans votre consentement explicite.",
            },
            {
                q: "LudicPedagogy est-il conforme au RGPD ?",
                a: "Oui, nous sommes entièrement conformes au RGPD. Vous pouvez exporter ou supprimer toutes les données de vos utilisateurs à tout moment depuis votre tableau de bord.",
            },
        ],
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={`border border-slate-700 rounded-2xl overflow-hidden transition-all ${open ? "border-primary-700/50 bg-primary-900/10" : "bg-slate-900/50"}`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
            >
                <span
                    className={`font-medium text-sm ${open ? "text-primary-300" : "text-white"}`}
                >
                    {q}
                </span>
                {open ? (
                    <ChevronUp
                        size={18}
                        className="text-primary-400 flex-shrink-0"
                    />
                ) : (
                    <ChevronDown
                        size={18}
                        className="text-slate-500 flex-shrink-0"
                    />
                )}
            </button>
            {open && (
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">
                    {a}
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-700/50 bg-yellow-900/30 text-yellow-300 text-sm font-medium mb-6">
                    <HelpCircle size={14} />
                    FAQ
                </div>
                <h1 className="text-5xl font-extrabold text-white mb-4">
                    Questions fréquentes
                </h1>
                <p className="text-slate-400 text-lg">
                    Vous ne trouvez pas la réponse ?{" "}
                    <a
                        href="/vitrine/contact"
                        className="text-primary-400 hover:underline"
                    >
                        Contactez-nous
                    </a>
                    .
                </p>
            </div>

            <div className="space-y-10">
                {FAQ_DATA.map(({ category, items }) => (
                    <div key={category}>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-4">
                            {category}
                        </h2>
                        <div className="space-y-3">
                            {items.map(({ q, a }) => (
                                <FAQItem key={q} q={q} a={a} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
