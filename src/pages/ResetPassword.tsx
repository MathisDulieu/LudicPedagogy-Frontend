import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ResetPassword() {
    const [showPw, setShowPw] = useState(false);
    const [done, setDone] = useState(false);
    const [pw, setPw] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mx-auto mb-4">
                        <Lock size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">
                        Nouveau mot de passe
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Choisissez un mot de passe sécurisé.
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                    {done ? (
                        <div className="text-center space-y-4">
                            <CheckCircle
                                size={40}
                                className="text-green-400 mx-auto"
                            />
                            <p className="text-white font-semibold">
                                Mot de passe mis à jour !
                            </p>
                            <Link
                                to="/login"
                                className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                                Se connecter
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Nouveau mot de passe
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                    />
                                    <input
                                        type={showPw ? "text" : "password"}
                                        value={pw}
                                        onChange={(e) => setPw(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="Minimum 8 caractères"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw(!showPw)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    >
                                        {showPw ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Confirmer le mot de passe
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                    />
                                    <input
                                        type={showPw ? "text" : "password"}
                                        value={confirm}
                                        onChange={(e) =>
                                            setConfirm(e.target.value)
                                        }
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="Répéter le mot de passe"
                                    />
                                </div>
                            </div>
                            {confirm && pw !== confirm && (
                                <p className="text-red-400 text-xs">
                                    Les mots de passe ne correspondent pas.
                                </p>
                            )}
                            <button
                                onClick={() => setDone(true)}
                                disabled={pw !== confirm || !pw}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
                            >
                                Réinitialiser
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
