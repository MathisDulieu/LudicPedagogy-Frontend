import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    User,
    BookOpen,
    Trophy,
    LogOut,
    Settings,
    LayoutGrid,
} from "lucide-react";
import { useProgress } from "../contexts/useProgressContext";
import { useAuth } from "../contexts/useAuthContext";
import { Button } from "../components/ui/Button";

export function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { level, xp } = useProgress();
    const { user, logout } = useAuth();
    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: "/my-courses", label: "Cours", icon: BookOpen },
        { path: "/leaderboard", label: "Classement", icon: Trophy },
    ];

    const secondaryLinks = [
        { path: "/hub", label: "Bibliothèque de Jeux", icon: LayoutGrid },
        { path: "/editor", label: "Éditeur", icon: Settings },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
                        LP
                    </div>
                    <span className="text-lg font-semibold text-slate-100 tracking-tight">
                        LudicPedagogy
                    </span>
                </Link>

                {/* Primary Nav */}
                <div className="hidden md:flex items-center gap-1 mx-6">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2
                                    ${
                                        active
                                            ? "bg-slate-800 text-white border-b-2 border-primary-500 rounded-b-none"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                    }`}
                            >
                                <Icon size={18} />
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            {/* Secondary Links (Compact) */}
                            <div className="hidden lg:flex items-center gap-1 mr-4 border-r border-slate-800 pr-4">
                                {secondaryLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        title={link.label}
                                        className="p-2 text-slate-500 hover:text-primary-400 hover:bg-slate-800 rounded-lg transition-all"
                                    >
                                        <link.icon size={20} />
                                    </Link>
                                ))}
                            </div>

                            {/* Progress HUD */}
                            <div className="hidden sm:flex items-center gap-4 px-4 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-none">
                                        Niv.
                                    </span>
                                    <span className="text-lg font-black text-primary-400 leading-none">
                                        {level}
                                    </span>
                                </div>
                                <div className="w-px h-6 bg-slate-700" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-none mb-1">
                                        EXP
                                    </span>
                                    <span className="text-sm font-bold text-slate-200 leading-none">
                                        {xp}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ml-2">
                                <Link to="/profile">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-10 w-10 p-0 rounded-full bg-slate-800 border-slate-700 overflow-hidden"
                                    >
                                        <User
                                            size={20}
                                            className="text-primary-400"
                                        />
                                    </Button>
                                </Link>
                                <Button
                                    onClick={handleLogout}
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 p-2"
                                    title="Déconnexion"
                                >
                                    <LogOut size={20} />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login">
                            <Button
                                variant="primary"
                                size="sm"
                                className="bg-primary-600 hover:bg-primary-700 text-white border-none"
                            >
                                Connexion
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
