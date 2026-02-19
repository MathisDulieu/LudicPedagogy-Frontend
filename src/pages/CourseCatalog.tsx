import { useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Plus,
    Search,
    Filter,
    Play,
    GraduationCap,
} from "lucide-react";
import { useAuth } from "../contexts/useAuthContext";
import { useCourses } from "../contexts/useCourseContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function CourseCatalog() {
    const { user } = useAuth();
    const { courses } = useCourses();
    const [searchTerm, setSearchTerm] = useState("");
    const isTeacher = user?.role === "teacher" || user?.role === "admin";

    const filteredCourses = courses.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-2">
                        Catalogue des Cours
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Explore nos formations et monte en compétence.
                    </p>
                </div>

                {isTeacher && (
                    <Link to="/course-editor">
                        <Button className="gap-2 px-6 py-6 text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                            <Plus size={24} />
                            Créer un cours
                        </Button>
                    </Link>
                )}
            </div>

            {/* toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Rechercher un cours..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    />
                </div>
                <Button variant="secondary" className="gap-2">
                    <Filter size={18} />
                    Filtres
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => {
                    const isEnrolled = user?.enrolledCourses?.includes(
                        course.id,
                    );
                    // Mock progress if enrolled, 0 otherwise
                    const progress = isEnrolled
                        ? course.id === "binary-basics"
                            ? 75
                            : 10
                        : 0;

                    return (
                        <Card
                            key={course.id}
                            hoverEffect
                            className={`flex flex-col h-full bg-slate-900/50 relative overflow-hidden ${isEnrolled ? "border-primary-500/30" : "border-slate-800"}`}
                        >
                            {/* Enrollment Ribbon */}
                            {isEnrolled && (
                                <div className="absolute top-0 right-0 z-20">
                                    <div className="bg-primary-500 text-white text-[10px] font-bold px-8 py-1 rotate-45 translate-x-[25px] translate-y-[10px] shadow-lg uppercase tracking-tighter">
                                        Suivi
                                    </div>
                                </div>
                            )}

                            <div
                                className={`h-32 w-full ${course.image} rounded-t-xl mb-6 relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
                                        {course.difficulty}
                                    </span>
                                </div>
                            </div>

                            <div className="px-2 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {course.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 flex-1">
                                    {course.description}
                                </p>

                                {isEnrolled && (
                                    <div className="mb-6">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-500 uppercase font-bold text-[10px]">
                                                Ma Progression
                                            </span>
                                            <span className="text-primary-400 font-bold">
                                                {progress}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary-500 transition-all duration-1000"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={14} />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap size={14} />
                                        <span>{course.students} élèves</span>
                                    </div>
                                </div>

                                <Link to={`/course/${course.id}`}>
                                    <Button
                                        className="w-full gap-2 group"
                                        variant={
                                            isEnrolled ? "primary" : "secondary"
                                        }
                                    >
                                        <Play
                                            size={16}
                                            className={
                                                isEnrolled ? "fill-current" : ""
                                            }
                                        />
                                        {isEnrolled ? "Continuer" : "Découvrir"}
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4 text-slate-700">🔍</div>
                    <h3 className="text-xl font-bold text-slate-400">
                        Aucun cours trouvé
                    </h3>
                    <p className="text-slate-600">
                        Essaie une autre recherche ou filtre.
                    </p>
                </div>
            )}
        </div>
    );
}
