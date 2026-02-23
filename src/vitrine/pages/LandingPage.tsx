import { Link } from "react-router-dom";
import {
    Zap,
    BookOpen,
    Trophy,
    Users,
    BarChart3,
    Shield,
    ArrowRight,
    CheckCircle,
    Star,
    ChevronRight,
} from "lucide-react";

const FEATURES = [
    {
        icon: <BookOpen className="text-primary-400" size={22} />,
        title: "Cours interactifs",
        desc: "Créez des parcours pédagogiques riches avec textes, quiz et jeux éducatifs.",
    },
    {
        icon: <Trophy className="text-yellow-400" size={22} />,
        title: "Gamification avancée",
        desc: "Classements, XP, niveaux et récompenses pour motiver chaque apprenant.",
    },
    {
        icon: <BarChart3 className="text-accent-400" size={22} />,
        title: "Analytiques détaillées",
        desc: "Suivez la progression de chaque étudiant avec des tableaux de bord complets.",
    },
    {
        icon: <Shield className="text-green-400" size={22} />,
        title: "Anti-triche intégré",
        desc: "Surveillance automatique des comportements suspects pendant les évaluations.",
    },
    {
        icon: <Users className="text-purple-400" size={22} />,
        title: "Gestion multi-niveaux",
        desc: "Organisations, classes, sous-groupes : une hiérarchie pensée pour les écoles.",
    },
    {
        icon: <Zap className="text-orange-400" size={22} />,
        title: "Micro-jeux pédagogiques",
        desc: "QCM, Vrai/Faux, Timeline, association de termes — des formats variés en quelques clics.",
    },
];

const TESTIMONIALS = [
    {
        name: "Sophie Martin",
        role: "Enseignante — Lycée Victor Hugo",
        avatar: "SM",
        text: "Mes élèves sont beaucoup plus impliqués depuis qu'on utilise LudicPedagogy. Le système de points et de classement crée une émulation positive.",
    },
    {
        name: "Thomas Leblanc",
        role: "Directeur pédagogique — École Numys",
        avatar: "TL",
        text: "Outil complet, simple à prendre en main. Nos enseignants ont créé leurs premiers cours interactifs en moins d'une heure.",
    },
    {
        name: "Amina Diallo",
        role: "Étudiante — DUT Info",
        avatar: "AD",
        text: "J'adore pouvoir apprendre à mon rythme et voir ma progression sur le leaderboard. Ça rend les révisions beaucoup moins ennuyeuses!",
    },
];

export default function LandingPage() {
    return (
        <div className="overflow-x-hidden">
            {/* ─── Hero ───────────────────────────────────────────────── */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-24">
                {/* Background glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-900/30 to-accent-900/30 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-700/50 bg-primary-900/30 text-primary-300 text-sm font-medium mb-8">
                        <Zap size={14} />
                        Plateforme pédagogique gamifiée
                        <ChevronRight size={14} />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                        <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            Rendez l'apprentissage
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                            irrésistible.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        LudicPedagogy combine cours interactifs, jeux
                        pédagogiques et gamification pour transformer chaque
                        session d'apprentissage en une expérience mémorable.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/vitrine/signup"
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-2xl shadow-primary-900/40 group"
                        >
                            Démarrer gratuitement
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                        <Link
                            to="/vitrine/demo"
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-700 bg-slate-900/50 text-white font-semibold text-lg hover:border-slate-500 transition-colors"
                        >
                            Voir la démo
                        </Link>
                    </div>

                    {/* Social proof */}
                    <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <CheckCircle size={14} className="text-green-500" />
                            Sans carte bancaire
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle size={14} className="text-green-500" />
                            14 jours gratuits
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle size={14} className="text-green-500" />
                            Annulation à tout moment
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Stats ──────────────────────────────────────────────── */}
            <section className="border-y border-slate-800 bg-slate-900/30 py-12">
                <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "10 000+", label: "Apprenants actifs" },
                        { value: "500+", label: "Enseignants" },
                        { value: "2 000+", label: "Cours créés" },
                        { value: "98%", label: "Satisfaction" },
                    ].map(({ value, label }) => (
                        <div key={label}>
                            <div className="text-3xl font-extrabold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                                {value}
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Features Grid ──────────────────────────────────────── */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Tout ce qu'il faut pour enseigner autrement
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Une suite d'outils pensée pour les enseignants,
                            adoptée par les étudiants.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map(({ icon, title, desc }) => (
                            <div
                                key={title}
                                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link
                            to="/vitrine/features"
                            className="inline-flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors"
                        >
                            Voir toutes les fonctionnalités{" "}
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Testimonials ───────────────────────────────────────── */}
            <section className="py-24 px-4 bg-slate-900/20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ils font confiance à LudicPedagogy
                        </h2>
                        <div className="flex justify-center gap-1 text-yellow-400 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-slate-500 text-sm">
                            Note moyenne 4.9/5 sur + de 200 avis
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map(({ name, role, avatar, text }) => (
                            <div
                                key={name}
                                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60"
                            >
                                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                                    "{text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-bold text-sm">
                                        {avatar}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">
                                            {name}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ────────────────────────────────────────────────── */}
            <section className="py-24 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="p-12 rounded-3xl border border-primary-700/40 bg-gradient-to-br from-primary-900/30 to-accent-900/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-accent-600/5 pointer-events-none" />
                        <h2 className="text-4xl font-bold text-white mb-4 relative">
                            Prêt à transformer votre enseignement ?
                        </h2>
                        <p className="text-slate-400 mb-8 text-lg relative">
                            Rejoignez des centaines d'établissements qui ont
                            déjà adopté LudicPedagogy.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
                            <Link
                                to="/vitrine/signup"
                                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
                            >
                                Commencer maintenant <ArrowRight size={18} />
                            </Link>
                            <Link
                                to="/vitrine/contact"
                                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-slate-600 text-white font-semibold hover:border-slate-400 transition-colors"
                            >
                                Contacter l'équipe
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
