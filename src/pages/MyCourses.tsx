import { Link } from "react-router-dom";
import { BookOpen, Clock } from "lucide-react";
import { Play } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function MyCourses() {
    const courses = [
        {
            id: "binary-basics",
            title: "Les Bases du Binaire",
            progress: 75,
            lastPlayed: "Il y a 2 heures",
            image: "bg-emerald-500",
        },
        {
            id: "hex-mastery",
            title: "Maîtrise Hexadécimale",
            progress: 30,
            lastPlayed: "Hier",
            image: "bg-purple-500",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <BookOpen className="text-primary-400" />
                Mes Cours
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        hoverEffect
                        className="group overflow-hidden relative"
                    >
                        <div
                            className={`absolute top-0 right-0 w-32 h-32 ${course.image} blur-[60px] opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-30 transition-opacity`}
                        />

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary-300 transition-colors">
                                {course.title}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                                <Clock size={14} />
                                <span>{course.lastPlayed}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-300">
                                        Progression
                                    </span>
                                    <span className="font-bold text-primary-400">
                                        {course.progress}%
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary-500 rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>

                            <Link to={`/course/${course.id}`}>
                                <Button className="w-full gap-2">
                                    <Play size={16} />
                                    Continuer
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}

                {/* Empty State / Discover More */}
                <Card className="border-dashed border-2 border-slate-700 bg-transparent flex flex-col items-center justify-center text-center p-8 hover:border-primary-500/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                        <BookOpen size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300">
                        Découvrir d'autres cours
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">
                        Explore le catalogue pour apprendre de nouvelles
                        compétences
                    </p>
                    <Link
                        to="/catalog"
                        className="mt-4 text-primary-400 hover:text-primary-300 font-medium text-sm"
                    >
                        Voir le catalogue &rarr;
                    </Link>
                </Card>
            </div>
        </div>
    );
}
