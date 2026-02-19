import { useState } from "react";
import { useAuth } from "../contexts/useAuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!username) return;
        login(username, isTeacher ? "teacher" : "student");
        navigate("/hub");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link
                        to="/"
                        className="inline-block mb-6 text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        ← Retour à l'accueil
                    </Link>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                        Connexion
                    </h1>
                    <p className="text-slate-300">
                        Entre ton nom pour commencer
                    </p>
                </div>

                {/* Login Form */}
                <div className="terminal-box">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-slate-300 mb-2"
                            >
                                Nom d'utilisateur
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Ton pseudo..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-primary-500/50 rounded-lg 
                         text-white placeholder-slate-500 
                         focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20
                         transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                            <input
                                id="isTeacher"
                                type="checkbox"
                                checked={isTeacher}
                                onChange={(e) => setIsTeacher(e.target.checked)}
                                className="w-5 h-5 rounded border-primary-500 text-primary-500 focus:ring-primary-500/20 cursor-pointer"
                            />
                            <label
                                htmlFor="isTeacher"
                                className="text-sm text-slate-300 cursor-pointer"
                            >
                                Je suis un enseignant / créateur
                            </label>
                        </div>

                        <button type="submit" className="neon-button w-full">
                            Entrer
                        </button>

                        <p className="text-center text-sm text-slate-500 mt-4">
                            💡 Pas de mot de passe requis (pour l'instant)
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
