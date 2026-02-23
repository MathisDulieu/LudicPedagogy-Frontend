import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Zap } from "lucide-react";

const NAV_LINKS = [
    { label: "Fonctionnalités", to: "/vitrine/features" },
    { label: "Tarifs", to: "/vitrine/pricing" },
    { label: "Démonstration", to: "/vitrine/demo" },
    { label: "FAQ", to: "/vitrine/faq" },
    { label: "À propos", to: "/vitrine/about" },
];

export default function VitrineLayout() {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* ─── Header ─────────────────────────────────────────────── */}
            <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            to="/vitrine"
                            className="flex items-center gap-2 group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <BookOpen size={16} className="text-white" />
                            </div>
                            <span className="font-bold text-lg bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                LudicPedagogy
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-6">
                            {NAV_LINKS.map(({ label, to }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`text-sm font-medium transition-colors ${
                                        pathname === to
                                            ? "text-primary-400"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                to="/login"
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                Connexion
                            </Link>
                            <Link
                                to="/vitrine/signup"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary-900/30"
                            >
                                <Zap size={14} />
                                Commencer
                            </Link>
                        </div>

                        {/* Mobile toggle */}
                        <button
                            className="md:hidden p-2 text-slate-400 hover:text-white"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
                        {NAV_LINKS.map(({ label, to }) => (
                            <Link
                                key={to}
                                to={to}
                                className="block text-sm text-slate-300 hover:text-white py-1"
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        <hr className="border-slate-800" />
                        <Link
                            to="/login"
                            className="block text-sm text-slate-400 hover:text-white py-1"
                        >
                            Connexion
                        </Link>
                        <Link
                            to="/vitrine/signup"
                            className="block w-full text-center px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold"
                        >
                            Commencer
                        </Link>
                    </div>
                )}
            </header>

            {/* ─── Content ─────────────────────────────────────────────── */}
            <main className="pt-16">
                <Outlet />
            </main>

            {/* ─── Footer ─────────────────────────────────────────────── */}
            <footer className="border-t border-slate-800 bg-slate-950 mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                    <BookOpen
                                        size={14}
                                        className="text-white"
                                    />
                                </div>
                                <span className="font-bold text-white">
                                    LudicPedagogy
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                La plateforme pédagogique gamifiée qui
                                transforme l'apprentissage.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-3">
                                Produit
                            </h4>
                            <ul className="space-y-2">
                                {[
                                    {
                                        label: "Fonctionnalités",
                                        to: "/vitrine/features",
                                    },
                                    { label: "Tarifs", to: "/vitrine/pricing" },
                                    {
                                        label: "Démonstration",
                                        to: "/vitrine/demo",
                                    },
                                    { label: "FAQ", to: "/vitrine/faq" },
                                ].map(({ label, to }) => (
                                    <li key={to}>
                                        <Link
                                            to={to}
                                            className="text-sm text-slate-500 hover:text-white transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-3">
                                Entreprise
                            </h4>
                            <ul className="space-y-2">
                                {[
                                    { label: "À propos", to: "/vitrine/about" },
                                    {
                                        label: "Contact",
                                        to: "/vitrine/contact",
                                    },
                                ].map(({ label, to }) => (
                                    <li key={to}>
                                        <Link
                                            to={to}
                                            className="text-sm text-slate-500 hover:text-white transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-3">
                                Légal
                            </h4>
                            <ul className="space-y-2">
                                {[
                                    {
                                        label: "Mentions légales",
                                        to: "/vitrine/legal",
                                    },
                                    { label: "CGU", to: "/vitrine/terms" },
                                    {
                                        label: "Confidentialité",
                                        to: "/vitrine/privacy",
                                    },
                                ].map(({ label, to }) => (
                                    <li key={to}>
                                        <Link
                                            to={to}
                                            className="text-sm text-slate-500 hover:text-white transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-600 text-sm">
                            © 2026 LudicPedagogy. Tous droits réservés.
                        </p>
                        <p className="text-slate-600 text-sm">
                            Fait avec ❤️ pour l'éducation
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
