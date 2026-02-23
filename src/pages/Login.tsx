import { useState } from "react";
import { useAuth } from "../contexts/useAuthContext";
import type { UserRole } from "../contexts/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    GraduationCap,
    BookOpen,
    Building2,
    Zap,
} from "lucide-react";

const ROLES: {
    value: UserRole;
    label: string;
    icon: typeof GraduationCap;
    desc: string;
}[] = [
    {
        value: "student",
        label: "Étudiant",
        icon: GraduationCap,
        desc: "Accéder à mes cours et évaluations",
    },
    {
        value: "teacher",
        label: "Enseignant",
        icon: BookOpen,
        desc: "Gérer mes classes et créer des évaluations",
    },
    {
        value: "org_owner",
        label: "Responsable",
        icon: Building2,
        desc: "Gérer mon établissement",
    },
];

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [role, setRole] = useState<UserRole>("student");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }
        setError("");
        // Derive username from email (before @) for demo purposes
        const username = email.split("@")[0];
        login(username, role);
        navigate("/hub");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link
                        to="/vitrine"
                        className="inline-flex items-center gap-2 mb-6 group"
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary-900/40">
                            LP
                        </div>
                        <span className="text-slate-400 text-sm group-hover:text-white transition-colors">
                            ← Retour au site
                        </span>
                    </Link>
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                        Connexion
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Bienvenue sur LudicPedagogy
                    </p>
                </div>

                {/* Card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
                    {/* Role selector */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {ROLES.map(({ value, label, icon: Icon }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setRole(value)}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                                    role === value
                                        ? "border-primary-500 bg-primary-500/10 text-primary-400"
                                        : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-400"
                                }`}
                            >
                                <Icon size={18} />
                                {label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label
                                className="block text-xs font-medium text-slate-400 mb-1.5"
                                htmlFor="email"
                            >
                                Adresse email
                            </label>
                            <div className="relative">
                                <Mail
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                                />
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="jean.dupont@lycee.fr"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label
                                    className="text-xs font-medium text-slate-400"
                                    htmlFor="password"
                                >
                                    Mot de passe
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                                />
                                <input
                                    id="password"
                                    type={showPw ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full pl-10 pr-12 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((v) => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPw ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-400 bg-red-900/20 border border-red-700/30 rounded-xl px-3 py-2">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary-900/30 flex items-center justify-center gap-2 mt-2"
                        >
                            <Zap size={16} />
                            Se connecter
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-500 mt-6">
                        Pas encore de compte ?{" "}
                        <Link
                            to="/vitrine/signup"
                            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                        >
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
