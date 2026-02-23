import { CheckCircle, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ActivateAccount() {
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading",
    );

    useEffect(() => {
        const t = setTimeout(() => setStatus("success"), 1800);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-sm">
                {status === "loading" && (
                    <>
                        <Loader
                            size={48}
                            className="text-primary-400 mx-auto mb-4 animate-spin"
                        />
                        <h1 className="text-2xl font-bold text-white">
                            Activation en cours…
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm">
                            Veuillez patienter quelques instants.
                        </p>
                    </>
                )}
                {status === "success" && (
                    <>
                        <div className="relative mb-6">
                            <div className="w-20 h-20 rounded-full bg-green-900/40 border border-green-700 flex items-center justify-center mx-auto">
                                <CheckCircle
                                    size={40}
                                    className="text-green-400"
                                />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Compte activé ! 🎉
                        </h1>
                        <p className="text-slate-400 mb-8 text-sm">
                            Votre compte a été vérifié avec succès. Vous pouvez
                            maintenant vous connecter.
                        </p>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold hover:opacity-90 transition-opacity"
                        >
                            Se connecter
                        </Link>
                    </>
                )}
                {status === "error" && (
                    <>
                        <h1 className="text-2xl font-bold text-red-400 mb-2">
                            Lien invalide
                        </h1>
                        <p className="text-slate-400 text-sm mb-6">
                            Ce lien d'activation est expiré ou invalide.
                        </p>
                        <Link
                            to="/login"
                            className="text-primary-400 hover:underline text-sm"
                        >
                            Retour à la connexion
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
