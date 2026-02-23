import { Link } from "react-router-dom";
import { CheckCircle, Mail, ArrowRight, Zap } from "lucide-react";

export default function SignupConfirmPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Success animation */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mx-auto shadow-2xl shadow-green-900/50 animate-pulse">
                        <CheckCircle size={48} className="text-white" />
                    </div>
                    <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-green-500/20 animate-ping" />
                </div>

                <h1 className="text-4xl font-extrabold text-white mb-4">
                    Compte créé ! 🎉
                </h1>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Votre essai de 14 jours a commencé. Un email de confirmation
                    a été envoyé à votre adresse.
                </p>

                {/* Steps */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 text-left">
                    <p className="text-slate-400 text-sm font-medium mb-4">
                        Prochaines étapes :
                    </p>
                    <div className="space-y-4">
                        {[
                            {
                                icon: (
                                    <Mail size={18} className="text-blue-400" />
                                ),
                                title: "Vérifiez votre email",
                                desc: "Cliquez sur le lien dans l'email pour activer votre compte.",
                            },
                            {
                                icon: (
                                    <Zap
                                        size={18}
                                        className="text-yellow-400"
                                    />
                                ),
                                title: "Créez votre premier cours",
                                desc: "Utilisez l'éditeur intuitif pour créer votre premier cours pédagogique.",
                            },
                            {
                                icon: (
                                    <CheckCircle
                                        size={18}
                                        className="text-green-400"
                                    />
                                ),
                                title: "Invitez vos étudiants",
                                desc: "Envoyez des invitations à votre classe depuis le tableau de bord.",
                            },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">
                                        {title}
                                    </p>
                                    <p className="text-slate-500 text-xs">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold hover:opacity-90 transition-opacity"
                    >
                        Accéder à la plateforme <ArrowRight size={18} />
                    </Link>
                    <Link
                        to="/vitrine"
                        className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
