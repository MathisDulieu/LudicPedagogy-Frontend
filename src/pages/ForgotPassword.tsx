import { Link } from "react-router-dom";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { useState } from "react";

export default function ForgotPassword() {
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mx-auto mb-4">
                        <KeyRound size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">
                        Mot de passe oublié
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        {sent
                            ? "Vérifiez votre boîte mail."
                            : "Entrez votre email pour réinitialiser votre mot de passe."}
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                    {sent ? (
                        <div className="text-center space-y-4">
                            <div className="w-14 h-14 rounded-full bg-green-900/50 border border-green-700 flex items-center justify-center mx-auto">
                                <Mail size={24} className="text-green-400" />
                            </div>
                            <p className="text-slate-300 text-sm">
                                Un email de réinitialisation a été envoyé à{" "}
                                <strong className="text-white">{email}</strong>.
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm"
                            >
                                <ArrowLeft size={14} /> Retour à la connexion
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Adresse email
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="jean.dupont@lycee.fr"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setSent(true)}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                                Envoyer le lien
                            </button>
                            <Link
                                to="/login"
                                className="flex items-center justify-center gap-2 text-slate-500 hover:text-white text-sm transition-colors"
                            >
                                <ArrowLeft size={14} /> Retour
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
