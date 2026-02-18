import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Gamepad2, Brain, Trophy, ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative flex-1 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-slate-950 -z-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000 -z-10"></div>

                <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                    <div className="space-y-4 animate-float">
                        <div className="inline-block px-4 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-primary-300 mb-4 backdrop-blur-sm">
                            🚀 Prêt à passer au niveau supérieur ?
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight">
                            <span className="block text-white mb-2">
                                Apprends en
                            </span>
                            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent text-shadow-neon">
                                Jouant
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Maîtrise le code, résous des énigmes et grimpe dans
                            le classement avec{" "}
                            <span className="text-white font-semibold">
                                LudicPedagogy
                            </span>
                            .
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <Link to="/my-courses">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto text-lg group box-shadow-neon hover:scale-105 transition-transform"
                            >
                                <Gamepad2 className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" />
                                Commencer l'aventure
                            </Button>
                        </Link>
                        <Link to="/leaderboard">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="w-full sm:w-auto text-lg hover:bg-slate-800/80 backdrop-blur-sm"
                            >
                                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                                Voir les champions
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-8 bg-slate-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card
                            hoverEffect
                            className="relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Gamepad2 className="w-32 h-32" />
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center mb-6 text-primary-400 group-hover:scale-110 transition-transform duration-300">
                                <Gamepad2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">
                                Jeux Arcade
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Des mini-jeux rapides pour tester tes réflexes
                                et tes connaissances. Hex Flash, Binary Slap et
                                plus encore.
                            </p>
                            <Link
                                to="/hub"
                                className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium group/link"
                            >
                                Jouer maintenant{" "}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </Card>

                        <Card
                            hoverEffect
                            className="relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Brain className="w-32 h-32" />
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-secondary-500/20 flex items-center justify-center mb-6 text-secondary-400 group-hover:scale-110 transition-transform duration-300">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">
                                Énigmes Logiques
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Analyse des logs, debug des scripts et résous
                                des casse-têtes algorithmiques complexes.
                            </p>
                            <Link
                                to="/hub"
                                className="inline-flex items-center text-secondary-400 hover:text-secondary-300 font-medium group/link"
                            >
                                Relever le défi{" "}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </Card>

                        <Card
                            hoverEffect
                            className="relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Trophy className="w-32 h-32" />
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-accent-500/20 flex items-center justify-center mb-6 text-accent-400 group-hover:scale-110 transition-transform duration-300">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">
                                Compétition
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Mesure-toi aux autres étudiants. Gagne de l'XP,
                                monte en niveau et débloque des succès
                                exclusifs.
                            </p>
                            <Link
                                to="/leaderboard"
                                className="inline-flex items-center text-accent-400 hover:text-accent-300 font-medium group/link"
                            >
                                Voir le classement{" "}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
