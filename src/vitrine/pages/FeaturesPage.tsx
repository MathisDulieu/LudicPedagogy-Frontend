import { Link } from "react-router-dom";
import {
    BookOpen,
    Trophy,
    BarChart3,
    Shield,
    Users,
    Zap,
    Gamepad2,
    Clock,
    FileText,
    ChevronRight,
    ArrowRight,
    CheckCircle,
    GitBranch,
    MessageSquare,
} from "lucide-react";

const SECTIONS = [
    {
        tag: "Pour les Enseignants",
        color: "from-primary-500 to-blue-500",
        bg: "from-primary-900/20 to-blue-900/20",
        border: "border-primary-700/30",
        title: "Créez des cours engageants en quelques minutes",
        desc: "Un éditeur de cours visuel, intuitif, sans aucune compétence technique requise.",
        features: [
            {
                icon: <BookOpen size={18} />,
                label: "Éditeur de cours drag & drop",
            },
            {
                icon: <Gamepad2 size={18} />,
                label: "9 types de jeux pédagogiques",
            },
            {
                icon: <FileText size={18} />,
                label: "Gestion des devoirs et évaluations",
            },
            {
                icon: <Clock size={18} />,
                label: "Sessions de test chronométrées",
            },
            {
                icon: <BarChart3 size={18} />,
                label: "Statistiques détaillées par cours",
            },
            {
                icon: <Shield size={18} />,
                label: "Détection de triche en temps réel",
            },
        ],
    },
    {
        tag: "Pour les Étudiants",
        color: "from-accent-500 to-purple-500",
        bg: "from-accent-900/20 to-purple-900/20",
        border: "border-accent-700/30",
        title: "Apprenez à votre rythme, progressez plus vite",
        desc: "Une expérience d'apprentissage gamifiée qui rend chaque cours addictif.",
        features: [
            {
                icon: <Trophy size={18} />,
                label: "Système de XP et de niveaux",
            },
            {
                icon: <BarChart3 size={18} />,
                label: "Suivi personnel de la progression",
            },
            {
                icon: <Users size={18} />,
                label: "Classements et compétition saine",
            },
            {
                icon: <Zap size={18} />,
                label: "Streaks et récompenses de régularité",
            },
            {
                icon: <MessageSquare size={18} />,
                label: "Soumission de devoirs simplifiée",
            },
            { icon: <CheckCircle size={18} />, label: "Résultats instantanés" },
        ],
    },
    {
        tag: "Pour les Organisations",
        color: "from-green-500 to-teal-500",
        bg: "from-green-900/20 to-teal-900/20",
        border: "border-green-700/30",
        title: "Gérez votre établissement avec clarté",
        desc: "Un tableau de bord complet pour piloter classes, enseignants et abonnements.",
        features: [
            {
                icon: <GitBranch size={18} />,
                label: "Hiérarchie multi-niveaux",
            },
            {
                icon: <Users size={18} />,
                label: "Gestion des utilisateurs centralisée",
            },
            {
                icon: <BarChart3 size={18} />,
                label: "Vue d'ensemble de l'organisation",
            },
            { icon: <FileText size={18} />, label: "Historique des paiements" },
            {
                icon: <Shield size={18} />,
                label: "Contrôle des accès par rôle",
            },
            { icon: <Zap size={18} />, label: "Invitations en masse" },
        ],
    },
];

const GAME_TYPES = [
    {
        name: "QCM",
        icon: "🎯",
        desc: "Questions à choix multiples, simples ou multi-réponses",
    },
    {
        name: "Vrai / Faux",
        icon: "⚖️",
        desc: "Affirmations à valider rapidement",
    },
    {
        name: "Complétion",
        icon: "✏️",
        desc: "Textes à compléter avec les bons termes",
    },
    { name: "Association", icon: "🔗", desc: "Relier des paires de concepts" },
    {
        name: "Timeline",
        icon: "📅",
        desc: "Remettre des événements dans le bon ordre",
    },
    { name: "Mémoire", icon: "🃏", desc: "Paires à retourner et associer" },
    { name: "Énigme", icon: "🔍", desc: "Résoudre un problème narratif" },
    { name: "Réaction", icon: "⚡", desc: "Micro-jeux de réflexe et rapidité" },
    {
        name: "Tri",
        icon: "🗂️",
        desc: "Classer des éléments par ordre ou catégorie",
    },
];

export default function FeaturesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-700/50 bg-accent-900/30 text-accent-300 text-sm font-medium mb-6">
                    <Zap size={14} />
                    Fonctionnalités
                </div>
                <h1 className="text-5xl font-extrabold text-white mb-4">
                    Une plateforme conçue pour{" "}
                    <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                        tous
                    </span>
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                    Que vous soyez enseignant, étudiant ou directeur
                    pédagogique, LudicPedagogy offre les outils adaptés à votre
                    rôle.
                </p>
            </div>

            {/* Role sections */}
            <div className="space-y-16 mb-24">
                {SECTIONS.map(
                    ({ tag, color, bg, border, title, desc, features }) => (
                        <div
                            key={tag}
                            className={`rounded-3xl border ${border} bg-gradient-to-br ${bg} p-8 md:p-12`}
                        >
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white text-xs font-bold uppercase tracking-wide mb-4`}
                            >
                                {tag}
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-3">
                                        {title}
                                    </h2>
                                    <p className="text-slate-400 text-lg">
                                        {desc}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {features.map(({ icon, label }) => (
                                        <div
                                            key={label}
                                            className="flex items-center gap-2.5 text-slate-300 text-sm"
                                        >
                                            <span className="text-primary-400 flex-shrink-0">
                                                {icon}
                                            </span>
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ),
                )}
            </div>

            {/* Game types */}
            <div className="mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        9 formats de jeux pédagogiques
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Créez des quiz et des jeux variés pour maintenir
                        l'attention et adapter votre pédagogie.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {GAME_TYPES.map(({ name, icon, desc }) => (
                        <div
                            key={name}
                            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 text-center hover:border-slate-600 hover:scale-105 transition-all duration-200 cursor-pointer"
                        >
                            <div className="text-3xl mb-2">{icon}</div>
                            <div className="font-semibold text-white text-sm mb-1">
                                {name}
                            </div>
                            <div className="text-xs text-slate-500 leading-tight">
                                {desc}
                            </div>
                        </div>
                    ))}
                    <div className="p-5 rounded-2xl border-2 border-dashed border-primary-700/50 bg-primary-900/10 text-center flex flex-col items-center justify-center hover:border-primary-500 transition-colors cursor-pointer">
                        <div className="text-2xl mb-1">🚀</div>
                        <div className="font-semibold text-primary-400 text-sm">
                            Et bientôt plus
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Convaincu ?
                </h2>
                <p className="text-slate-400 mb-8">
                    Commencez gratuitement pendant 14 jours, sans carte
                    bancaire.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/vitrine/signup"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold hover:opacity-90 transition-opacity"
                    >
                        Démarrer <ArrowRight size={18} />
                    </Link>
                    <Link
                        to="/vitrine/pricing"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-700 text-white font-semibold hover:border-slate-500 transition-colors"
                    >
                        Voir les tarifs <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
