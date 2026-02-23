import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Building2,
    Mail,
    User,
    Lock,
    Zap,
    CheckCircle,
    CreditCard,
    ArrowRight,
    Eye,
    EyeOff,
} from "lucide-react";

const PLANS = [
    "Starter — 29€/mois",
    "Pro — 79€/mois",
    "Enterprise — 199€/mois",
];

type Step = "account" | "org" | "plan" | "payment";

function StepIndicator({ current }: { current: Step }) {
    const steps: { id: Step; label: string }[] = [
        { id: "account", label: "Compte" },
        { id: "org", label: "Organisation" },
        { id: "plan", label: "Plan" },
        { id: "payment", label: "Paiement" },
    ];
    const idx = steps.findIndex((s) => s.id === current);
    return (
        <div className="flex items-center justify-center gap-0 mb-10">
            {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${i < idx ? "bg-green-600 text-white" : i === idx ? "bg-primary-600 text-white ring-4 ring-primary-600/30" : "bg-slate-800 text-slate-500"}`}
                    >
                        {i < idx ? <CheckCircle size={14} /> : i + 1}
                    </div>
                    <span
                        className={`hidden sm:block mx-2 text-xs font-medium ${i === idx ? "text-white" : "text-slate-500"}`}
                    >
                        {step.label}
                    </span>
                    {i < steps.length - 1 && (
                        <div
                            className={`w-8 h-0.5 mx-1 ${i < idx ? "bg-green-600" : "bg-slate-700"}`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default function SignupPage() {
    const [step, setStep] = useState<Step>("account");
    const [showPw, setShowPw] = useState(false);
    const [plan, setPlan] = useState(PLANS[1]);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        orgName: "",
        orgType: "school",
    });

    const update = (key: string, val: string) =>
        setForm((f) => ({ ...f, [key]: val }));

    return (
        <div className="min-h-screen py-16 px-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Créer votre compte
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        14 jours gratuits • Sans engagement • Sans carte
                    </p>
                </div>

                <StepIndicator current={step} />

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                    {/* Step 1: Account */}
                    {step === "account" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <User size={20} className="text-primary-400" />{" "}
                                Informations personnelles
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">
                                        Prénom
                                    </label>
                                    <input
                                        value={form.firstName}
                                        onChange={(e) =>
                                            update("firstName", e.target.value)
                                        }
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="Jean"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">
                                        Nom
                                    </label>
                                    <input
                                        value={form.lastName}
                                        onChange={(e) =>
                                            update("lastName", e.target.value)
                                        }
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="Dupont"
                                    />
                                </div>
                            </div>
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
                                        value={form.email}
                                        onChange={(e) =>
                                            update("email", e.target.value)
                                        }
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="jean.dupont@lycee.fr"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                    />
                                    <input
                                        type={showPw ? "text" : "password"}
                                        value={form.password}
                                        onChange={(e) =>
                                            update("password", e.target.value)
                                        }
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
                            <button
                                onClick={() => setStep("org")}
                                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                Continuer <ArrowRight size={16} />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Org */}
                    {step === "org" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Building2
                                    size={20}
                                    className="text-primary-400"
                                />{" "}
                                Votre organisation
                            </h2>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Nom de l'établissement
                                </label>
                                <input
                                    value={form.orgName}
                                    onChange={(e) =>
                                        update("orgName", e.target.value)
                                    }
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                    placeholder="Lycée Victor Hugo"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Type d'établissement
                                </label>
                                <select
                                    value={form.orgType}
                                    onChange={(e) =>
                                        update("orgType", e.target.value)
                                    }
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                >
                                    <option value="school">
                                        École / Lycée
                                    </option>
                                    <option value="university">
                                        Université / BTS
                                    </option>
                                    <option value="training">
                                        Centre de formation
                                    </option>
                                    <option value="corporate">
                                        Entreprise
                                    </option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => setStep("account")}
                                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-semibold hover:text-white hover:border-slate-500 transition-all"
                                >
                                    Retour
                                </button>
                                <button
                                    onClick={() => setStep("plan")}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    Suivant <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Plan */}
                    {step === "plan" && (
                        <div className="space-y-3">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Zap size={20} className="text-primary-400" />{" "}
                                Choisissez votre plan
                            </h2>
                            {PLANS.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPlan(p)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${plan === p ? "border-primary-500 bg-primary-900/20" : "border-slate-700 hover:border-slate-500"}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium text-sm">
                                            {p}
                                        </span>
                                        {plan === p && (
                                            <CheckCircle
                                                size={18}
                                                className="text-primary-400"
                                            />
                                        )}
                                    </div>
                                </button>
                            ))}
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => setStep("org")}
                                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-semibold hover:text-white hover:border-slate-500 transition-all"
                                >
                                    Retour
                                </button>
                                <button
                                    onClick={() => setStep("payment")}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    Paiement <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Payment */}
                    {step === "payment" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <CreditCard
                                    size={20}
                                    className="text-primary-400"
                                />{" "}
                                Informations de paiement
                            </h2>
                            <p className="text-slate-500 text-xs mb-4">
                                Votre essai de 14 jours commence immédiatement.
                                Vous ne serez débité qu'à la fin.
                            </p>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">
                                    Numéro de carte
                                </label>
                                <input
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                    placeholder="4242 4242 4242 4242"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">
                                        Expiration
                                    </label>
                                    <input
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="MM/AA"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">
                                        CVC
                                    </label>
                                    <input
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => setStep("plan")}
                                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-semibold hover:text-white hover:border-slate-500 transition-all"
                                >
                                    Retour
                                </button>
                                <Link
                                    to="/vitrine/signup-confirm"
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    Créer mon compte <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-slate-600 mt-6">
                    Déjà un compte ?{" "}
                    <Link
                        to="/login"
                        className="text-primary-400 hover:text-primary-300"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}
