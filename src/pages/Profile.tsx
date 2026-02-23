import { useState } from "react";
import { useAuth } from "../contexts/useAuthContext";
import {
    Trophy,
    Star,
    Shield,
    Settings,
    BookOpen,
    CheckCircle,
    Lock,
    Eye,
    EyeOff,
    Bell,
} from "lucide-react";

// Mock course progress data for the student profile tab
const COURSE_PROGRESS = [
    {
        id: "binary-basics",
        title: "Les Bases du Binaire",
        completion: 75,
        lastGrade: "16/20",
        xpEarned: 380,
    },
    {
        id: "hex-mastery",
        title: "Maîtrise Hexadécimale",
        completion: 30,
        lastGrade: "—",
        xpEarned: 120,
    },
];

type Tab = "profil" | "securite" | "preferences";

function TabButton({
    id,
    label,
    icon: Icon,
    active,
    onClick,
}: {
    id: Tab;
    label: string;
    icon: typeof Trophy;
    active: boolean;
    onClick: (t: Tab) => void;
}) {
    return (
        <button
            onClick={() => onClick(id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/30"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
            }`}
        >
            <Icon size={16} />
            {label}
        </button>
    );
}

export default function Profile() {
    const { user } = useAuth();
    const [tab, setTab] = useState<Tab>("profil");
    const [showPw, setShowPw] = useState(false);
    const [notifications, setNotifications] = useState({
        grades: true,
        sessions: true,
        news: false,
    });

    // Fallback mock when no user session
    const displayUser = user ?? {
        username: "CyberPlayer",
        level: 5,
        xp: 2450,
        role: "student",
        enrolledCourses: ["binary-basics", "hex-mastery"],
    };
    const nextLevelXp = (displayUser.level + 1) * 600;
    const progress = Math.min((displayUser.xp / nextLevelXp) * 100, 100);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-primary-900/30">
                    {displayUser.username[0].toUpperCase()}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-white">
                        {displayUser.username}
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5 capitalize">
                        {displayUser.role === "student"
                            ? "Étudiant"
                            : displayUser.role === "teacher"
                              ? "Enseignant"
                              : displayUser.role === "org_owner"
                                ? "Responsable org."
                                : "Administrateur"}
                        {" · "}Niveau {displayUser.level}
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
                <TabButton
                    id="profil"
                    label="Profil"
                    icon={Trophy}
                    active={tab === "profil"}
                    onClick={setTab}
                />
                <TabButton
                    id="securite"
                    label="Sécurité"
                    icon={Shield}
                    active={tab === "securite"}
                    onClick={setTab}
                />
                <TabButton
                    id="preferences"
                    label="Préférences"
                    icon={Settings}
                    active={tab === "preferences"}
                    onClick={setTab}
                />
            </div>

            {/* === PROFIL TAB === */}
            {tab === "profil" && (
                <div className="space-y-6">
                    {/* XP & Level */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-300">
                                Expérience (XP)
                            </span>
                            <span className="text-sm font-bold text-primary-400">
                                {displayUser.xp} / {nextLevelXp} XP
                            </span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Plus que {nextLevelXp - displayUser.xp} XP pour le
                            niveau {displayUser.level + 1}
                        </p>
                    </div>

                    {/* Achievements */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h2 className="font-bold text-white flex items-center gap-2 mb-4">
                            <Star size={18} className="text-yellow-500" />{" "}
                            Succès récents
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                "Maître du Code I",
                                "Sans Faute",
                                "Vitesse Éclair",
                                "Persévérant",
                            ].map((a) => (
                                <div
                                    key={a}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-yellow-900/30 border border-yellow-700/30 flex items-center justify-center">
                                        <Star
                                            size={16}
                                            className="text-yellow-500"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            {a}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course breakdown — only shows own data */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
                            <BookOpen size={16} className="text-primary-400" />
                            <h2 className="font-bold text-white">
                                Mes cours & résultats
                            </h2>
                        </div>
                        <div className="divide-y divide-slate-800">
                            {COURSE_PROGRESS.map(
                                ({
                                    id,
                                    title,
                                    completion,
                                    lastGrade,
                                    xpEarned,
                                }) => (
                                    <div
                                        key={id}
                                        className="flex items-center gap-4 px-6 py-4"
                                    >
                                        <div
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${completion === 100 ? "bg-green-900/30 border border-green-700/30" : "bg-slate-800 border border-slate-700"}`}
                                        >
                                            {completion === 100 ? (
                                                <CheckCircle
                                                    size={16}
                                                    className="text-green-400"
                                                />
                                            ) : (
                                                <BookOpen
                                                    size={16}
                                                    className="text-slate-500"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">
                                                {title}
                                            </p>
                                            <div className="mt-1.5 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                                    style={{
                                                        width: `${completion}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0 ml-4">
                                            <p className="text-sm font-bold text-white">
                                                {lastGrade}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {xpEarned} XP
                                            </p>
                                        </div>
                                        <div className="text-xs text-right text-slate-500 w-10 flex-shrink-0">
                                            {completion}%
                                        </div>
                                    </div>
                                ),
                            )}
                            {COURSE_PROGRESS.length === 0 && (
                                <div className="px-6 py-8 text-center text-slate-500 text-sm">
                                    <Lock
                                        size={24}
                                        className="mx-auto mb-2 opacity-40"
                                    />
                                    Aucun cours suivi pour le moment.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* === SÉCURITÉ TAB === */}
            {tab === "securite" && (
                <div className="space-y-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                            <Shield size={16} className="text-primary-400" />{" "}
                            Changer de mot de passe
                        </h2>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {[
                                {
                                    id: "current-pw",
                                    label: "Mot de passe actuel",
                                },
                                { id: "new-pw", label: "Nouveau mot de passe" },
                                {
                                    id: "confirm-pw",
                                    label: "Confirmer le nouveau mot de passe",
                                },
                            ].map(({ id, label }) => (
                                <div key={id}>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        {label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id={id}
                                            type={showPw ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="w-full pr-10 pl-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPw((v) => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                        >
                                            {showPw ? (
                                                <EyeOff size={15} />
                                            ) : (
                                                <Eye size={15} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold text-sm hover:opacity-90 transition-opacity mt-2"
                            >
                                Mettre à jour le mot de passe
                            </button>
                        </form>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 opacity-60">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-bold text-white flex items-center gap-2">
                                    <Shield
                                        size={16}
                                        className="text-accent-400"
                                    />{" "}
                                    Double authentification (2FA)
                                </h2>
                                <p className="text-xs text-slate-500 mt-1">
                                    Fonctionnalité à venir
                                </p>
                            </div>
                            <span className="text-xs bg-slate-800 text-slate-500 px-3 py-1 rounded-full border border-slate-700">
                                Bientôt
                            </span>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h2 className="font-bold text-white mb-3">
                            Sessions actives
                        </h2>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60">
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Ce navigateur
                                </p>
                                <p className="text-xs text-slate-500">
                                    Windows · Aujourd'hui à{" "}
                                    {new Date().toLocaleTimeString("fr-FR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                    </div>
                </div>
            )}

            {/* === PRÉFÉRENCES TAB === */}
            {tab === "preferences" && (
                <div className="space-y-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Settings size={16} className="text-primary-400" />{" "}
                            Langue
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { code: "fr", label: "🇫🇷 Français" },
                                { code: "en", label: "🇬🇧 English" },
                            ].map(({ code, label }) => (
                                <button
                                    key={code}
                                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${code === "fr" ? "border-primary-500 bg-primary-500/10 text-primary-400" : "border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400"}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Bell size={16} className="text-accent-400" />{" "}
                            Notifications
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    key: "grades" as const,
                                    label: "Nouvelles notes disponibles",
                                    desc: "Quand l'enseignant publie une correction",
                                },
                                {
                                    key: "sessions" as const,
                                    label: "Sessions de test à venir",
                                    desc: "Rappel 24h avant le début",
                                },
                                {
                                    key: "news" as const,
                                    label: "Actualités LudicPedagogy",
                                    desc: "Nouvelles fonctionnalités et mises à jour",
                                },
                            ].map(({ key, label, desc }) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            {label}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {desc}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setNotifications((n) => ({
                                                ...n,
                                                [key]: !n[key],
                                            }))
                                        }
                                        className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${notifications[key] ? "bg-primary-600" : "bg-slate-700"}`}
                                    >
                                        <span
                                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[key] ? "left-5" : "left-0.5"}`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
