import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Send,
    CheckCircle,
} from "lucide-react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-700/50 bg-purple-900/30 text-purple-300 text-sm font-medium mb-6">
                    <MessageSquare size={14} />
                    Contact
                </div>
                <h1 className="text-5xl font-extrabold text-white mb-4">
                    Parlons de votre projet
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Notre équipe est disponible pour répondre à toutes vos
                    questions et vous accompagner dans votre démarche.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">
                            On est là pour vous
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: (
                                        <Mail
                                            size={20}
                                            className="text-primary-400"
                                        />
                                    ),
                                    label: "Email",
                                    value: "contact@ludicpedagogy.fr",
                                },
                                {
                                    icon: (
                                        <Phone
                                            size={20}
                                            className="text-accent-400"
                                        />
                                    ),
                                    label: "Téléphone",
                                    value: "+33 1 23 45 67 89",
                                },
                                {
                                    icon: (
                                        <MapPin
                                            size={20}
                                            className="text-green-400"
                                        />
                                    ),
                                    label: "Adresse",
                                    value: "42 rue de l'Innovation, 75001 Paris",
                                },
                            ].map(({ icon, label, value }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/50"
                                >
                                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                                        {icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            {label}
                                        </p>
                                        <p className="text-white font-medium text-sm">
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30">
                        <h3 className="font-semibold text-white mb-3">
                            Horaires du support
                        </h3>
                        <div className="space-y-2 text-sm text-slate-400">
                            <div className="flex justify-between">
                                <span>Lundi — Vendredi</span>
                                <span className="text-white">9h — 18h</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Samedi</span>
                                <span className="text-white">9h — 12h</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Dimanche</span>
                                <span className="text-slate-600">Fermé</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                    {sent ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 rounded-full bg-green-900/50 border border-green-700 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle
                                    size={32}
                                    className="text-green-400"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Message envoyé !
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Nous vous répondrons dans les 24h ouvrées.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4">
                                Envoyer un message
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">
                                        Nom complet
                                    </label>
                                    <input
                                        value={form.name}
                                        onChange={(e) =>
                                            update("name", e.target.value)
                                        }
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="Jean Dupont"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            update("email", e.target.value)
                                        }
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="jean@lycee.fr"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Sujet
                                </label>
                                <select
                                    value={form.subject}
                                    onChange={(e) =>
                                        update("subject", e.target.value)
                                    }
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                >
                                    <option value="">
                                        Sélectionner un sujet
                                    </option>
                                    <option>Demande commerciale</option>
                                    <option>Support technique</option>
                                    <option>Question sur les plans</option>
                                    <option>Partenariat</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    value={form.message}
                                    onChange={(e) =>
                                        update("message", e.target.value)
                                    }
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500 resize-none"
                                    placeholder="Décrivez votre besoin..."
                                />
                            </div>
                            <button
                                onClick={() => setSent(true)}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <Send size={16} />
                                Envoyer le message
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
