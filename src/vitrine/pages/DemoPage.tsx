import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Play,
    BookOpen,
    Trophy,
    BarChart3,
    Gamepad2,
} from "lucide-react";

const DEMO_TABS = [
    { id: "course", label: "Éditeur de cours", icon: <BookOpen size={16} /> },
    { id: "game", label: "Jeux pédagogiques", icon: <Gamepad2 size={16} /> },
    { id: "leaderboard", label: "Classements", icon: <Trophy size={16} /> },
    { id: "stats", label: "Statistiques", icon: <BarChart3 size={16} /> },
];

const DEMO_CONTENT: Record<
    string,
    { title: string; desc: string; mockup: React.ReactNode }
> = {
    course: {
        title: "Éditeur de cours intuitif",
        desc: "Créez des sections, ajoutez du contenu théorique, des quiz interactifs et des jeux pédagogiques. Tout en quelques clics.",
        mockup: (
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 text-left">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-slate-500 text-xs ml-2">
                        Éditeur de cours — Introduction à Python
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="h-6 bg-slate-800 rounded w-2/3 flex items-center px-2">
                        <span className="text-white text-xs font-semibold">
                            Introduction à Python
                        </span>
                    </div>
                    <div className="ml-4 space-y-1.5">
                        {[
                            "Section 1 : Variables et types",
                            "Section 2 : Conditions",
                            "Section 3 : Boucles",
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                                <div className="h-5 bg-slate-800 rounded flex-1 flex items-center px-2">
                                    <span className="text-slate-300 text-xs">
                                        {s}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-dashed border border-slate-600" />
                            <div className="h-5 border border-dashed border-slate-700 rounded flex-1 flex items-center px-2">
                                <span className="text-slate-600 text-xs">
                                    + Ajouter une section
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    game: {
        title: "9 formats de jeux pédagogiques",
        desc: "Choisissez parmi QCM, Vrai/Faux, Association, Timeline et bien d'autres pour varier les exercices.",
        mockup: (
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 text-left">
                <p className="text-slate-400 text-xs mb-2">
                    Question 1/5 — QCM
                </p>
                <p className="font-semibold text-white mb-4 text-sm">
                    Quel mot-clé Python permet de définir une fonction ?
                </p>
                <div className="grid grid-cols-2 gap-2">
                    {["def", "function", "fn", "func"].map((opt, i) => (
                        <button
                            key={opt}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${i === 0 ? "border-green-500 bg-green-900/30 text-green-400" : "border-slate-700 bg-slate-800 text-slate-300"}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        ),
    },
    leaderboard: {
        title: "Classements et gamification",
        desc: "Motivez vos étudiants avec un système de XP, niveaux et classements mis à jour en temps réel.",
        mockup: (
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 text-left">
                <p className="text-slate-500 text-xs mb-3">
                    🏆 Classement — Semaine en cours
                </p>
                {[
                    { rank: 1, name: "Alice M.", xp: 2840, medal: "🥇" },
                    { rank: 2, name: "Thomas B.", xp: 2210, medal: "🥈" },
                    { rank: 3, name: "Sofia K.", xp: 1980, medal: "🥉" },
                    { rank: 4, name: "Vous", xp: 1450, medal: "4" },
                ].map(({ rank, name, xp, medal }) => (
                    <div
                        key={rank}
                        className={`flex items-center gap-3 py-2 px-3 rounded-xl mb-1 ${name === "Vous" ? "bg-primary-900/30 border border-primary-700/50" : ""}`}
                    >
                        <span className="text-sm w-5 text-center">{medal}</span>
                        <span
                            className={`flex-1 text-sm ${name === "Vous" ? "text-primary-300 font-semibold" : "text-slate-300"}`}
                        >
                            {name}
                        </span>
                        <span className="text-xs text-yellow-400 font-bold">
                            {xp.toLocaleString()} XP
                        </span>
                    </div>
                ))}
            </div>
        ),
    },
    stats: {
        title: "Tableau de bord analytique",
        desc: "Suivez la progression de chaque étudiant, identifiez les difficultés, et mesurez l'efficacité de vos cours.",
        mockup: (
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 text-left">
                <p className="text-slate-500 text-xs mb-3">
                    📊 Aperçu du cours — Semaine en cours
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                        {
                            label: "Complétion",
                            value: "72%",
                            color: "text-green-400",
                        },
                        {
                            label: "Note moy.",
                            value: "14.3/20",
                            color: "text-blue-400",
                        },
                        {
                            label: "Actifs",
                            value: "28/35",
                            color: "text-purple-400",
                        },
                        {
                            label: "Durée moy.",
                            value: "42 min",
                            color: "text-orange-400",
                        },
                    ].map(({ label, value, color }) => (
                        <div
                            key={label}
                            className="bg-slate-800 rounded-xl p-3"
                        >
                            <p className="text-slate-500 text-xs">{label}</p>
                            <p className={`font-bold text-lg ${color}`}>
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                </div>
            </div>
        ),
    },
};

export default function DemoPage() {
    const [activeTab, setActiveTab] = useState("course");

    const activeContent = DEMO_CONTENT[activeTab];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-700/50 bg-green-900/30 text-green-300 text-sm font-medium mb-6">
                    <Play size={14} />
                    Démonstration interactive
                </div>
                <h1 className="text-5xl font-extrabold text-white mb-4">
                    Voyez LudicPedagogy en action
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Explorez les fonctionnalités clés de la plateforme à travers
                    des aperçus interactifs.
                </p>
            </div>

            {/* Demo tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {DEMO_TABS.map(({ id, label, icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            activeTab === id
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-900/30"
                                : "border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
                        }`}
                    >
                        {icon}
                        {label}
                    </button>
                ))}
            </div>

            {/* Demo content */}
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
                <div className="animate-in fade-in duration-300">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {activeContent.title}
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        {activeContent.desc}
                    </p>
                    <Link
                        to="/vitrine/signup"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Essayer gratuitement <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="scale-105">{activeContent.mockup}</div>
            </div>

            {/* Video placeholder */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform shadow-2xl shadow-primary-900/50">
                    <Play size={32} className="text-white ml-1" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Voir la vidéo de présentation
                </h2>
                <p className="text-slate-500">
                    3 minutes pour tout comprendre sur LudicPedagogy
                </p>
            </div>
        </div>
    );
}
