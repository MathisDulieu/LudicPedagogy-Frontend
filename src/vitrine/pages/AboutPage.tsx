import { Link } from "react-router-dom";
import { Rocket, Heart, Target, ArrowRight } from "lucide-react";

const TEAM = [
    {
        name: "Mathis Dulieu",
        role: "Co-fondateur & CEO",
        initials: "MD",
        color: "from-primary-600 to-blue-600",
    },
    {
        name: "Alex Fontaine",
        role: "Co-fondateur & CTO",
        initials: "AF",
        color: "from-accent-600 to-purple-600",
    },
    {
        name: "Lucie Bernard",
        role: "Head of Design",
        initials: "LB",
        color: "from-pink-600 to-rose-600",
    },
    {
        name: "Karim Hadj",
        role: "Lead Pedagogy",
        initials: "KH",
        color: "from-green-600 to-teal-600",
    },
];

const VALUES = [
    {
        icon: <Rocket size={24} className="text-primary-400" />,
        title: "Innovation pédagogique",
        desc: "Nous croyons que la technologie peut révolutionner l'apprentissage sans le déshumaniser.",
    },
    {
        icon: <Heart size={24} className="text-pink-400" />,
        title: "Passion pour l'éducation",
        desc: "Chaque décision de produit est guidée par un seul objectif : aider les apprenants à progresser.",
    },
    {
        icon: <Target size={24} className="text-accent-400" />,
        title: "Impact mesurable",
        desc: "Nous mesurons notre succès à l'aune des progrès de chaque étudiant sur la plateforme.",
    },
];

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="text-center mb-20">
                <h1 className="text-5xl font-extrabold text-white mb-4">
                    Notre mission :{" "}
                    <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                        rendre l'apprentissage irrésistible
                    </span>
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    LudicPedagogy est né d'une frustration : les plateformes
                    éducatives existantes sont ennuyeuses. Nous avons décidé de
                    faire autrement.
                </p>
            </div>

            {/* Story */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Notre histoire
                    </h2>
                    <div className="space-y-4 text-slate-400 leading-relaxed">
                        <p>
                            Tout a commencé en 2024, dans une classe de lycée.
                            Deux enseignants observaient leurs élèves passer de
                            visages ennuyés à des yeux pétillants... une fois la
                            partie de jeu dans leur cours commencée.
                        </p>
                        <p>
                            Cette observation a été le déclic. Et si on pouvait
                            intégrer ces mécaniques d'engagement dans tous les
                            cours, pour tous les établissements ?
                        </p>
                        <p>
                            LudicPedagogy est le résultat de cette conviction :{" "}
                            <strong className="text-white">
                                l'éducation de qualité doit être accessible et
                                engageante pour tous.
                            </strong>
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { value: "2024", label: "Année de création" },
                        { value: "10K+", label: "Apprenants actifs" },
                        { value: "4", label: "Membres fondateurs" },
                        { value: "🇫🇷", label: "100% français" },
                    ].map(({ value, label }) => (
                        <div
                            key={label}
                            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 text-center"
                        >
                            <div className="text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-1">
                                {value}
                            </div>
                            <div className="text-sm text-slate-500">
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-white text-center mb-10">
                    Nos valeurs
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {VALUES.map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50"
                        >
                            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                                {icon}
                            </div>
                            <h3 className="font-bold text-white mb-2">
                                {title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-white text-center mb-10">
                    L'équipe
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TEAM.map(({ name, role, initials, color }) => (
                        <div
                            key={name}
                            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 text-center"
                        >
                            <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}
                            >
                                {initials}
                            </div>
                            <p className="font-semibold text-white text-sm">
                                {name}
                            </p>
                            <p className="text-slate-500 text-xs">{role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <Link
                    to="/vitrine/signup"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold hover:opacity-90 transition-opacity"
                >
                    Rejoindre l'aventure <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
