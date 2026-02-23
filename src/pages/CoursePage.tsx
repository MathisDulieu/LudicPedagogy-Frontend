import { useParams, Link } from "react-router-dom";
import { useCourses } from "../contexts/useCourseContext";
import { CoursePreview } from "../features/editor/components/CoursePreview";
import { FileText, Clock, Play, ChevronRight, BookOpen } from "lucide-react";

// Mock quiz/assignment data per course — in a real app this would come from context/API
const COURSE_EVALUATIONS: Record<
    string,
    {
        quizzes: {
            id: string;
            title: string;
            duration: string;
            status: "available" | "done" | "locked";
        }[];
        assignments: {
            id: string;
            title: string;
            deadline: string;
            status: "open" | "submitted" | "graded";
        }[];
    }
> = {
    "binary-basics": {
        quizzes: [
            {
                id: "q1",
                title: "QCM — Introduction au binaire",
                duration: "15 min",
                status: "done",
            },
            {
                id: "q2",
                title: "QCM — Conversions bin/déc",
                duration: "20 min",
                status: "available",
            },
            {
                id: "q3",
                title: "QCM — Opérations binaires",
                duration: "25 min",
                status: "locked",
            },
        ],
        assignments: [
            {
                id: "a1",
                title: "Devoir : Convertir 10 nombres",
                deadline: "15 mars 2026",
                status: "submitted",
            },
            {
                id: "a2",
                title: "Devoir : Exercices d'addition binaire",
                deadline: "29 mars 2026",
                status: "open",
            },
        ],
    },
    "hex-mastery": {
        quizzes: [
            {
                id: "q4",
                title: "QCM — Introduction à l'hexadécimal",
                duration: "15 min",
                status: "available",
            },
        ],
        assignments: [
            {
                id: "a3",
                title: "Devoir : Convertir hex → déc",
                deadline: "22 mars 2026",
                status: "open",
            },
        ],
    },
};

const STATUS_QUIZ: Record<string, { label: string; style: string }> = {
    done: {
        label: "Terminé",
        style: "text-green-400 bg-green-900/30 border-green-700/40",
    },
    available: {
        label: "Disponible",
        style: "text-primary-400 bg-primary-900/30 border-primary-700/40",
    },
    locked: {
        label: "Verrouillé",
        style: "text-slate-500 bg-slate-800 border-slate-700",
    },
};

const STATUS_ASSIGNMENT: Record<string, { label: string; style: string }> = {
    open: {
        label: "À rendre",
        style: "text-yellow-400 bg-yellow-900/30 border-yellow-700/40",
    },
    submitted: {
        label: "Rendu",
        style: "text-blue-400 bg-blue-900/30 border-blue-700/40",
    },
    graded: {
        label: "Noté",
        style: "text-green-400 bg-green-900/30 border-green-700/40",
    },
};

export default function CoursePage() {
    const { courseId } = useParams<{ courseId: string }>();
    const { getCourseById } = useCourses();
    const course = courseId ? getCourseById(courseId) : null;
    const evaluations = courseId ? COURSE_EVALUATIONS[courseId] : undefined;

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Cours introuvable
                    </h2>
                    <Link
                        to="/catalog"
                        className="text-primary-400 hover:underline"
                    >
                        Retour au catalogue
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Breadcrumb */}
            <div className="max-w-5xl mx-auto px-4 pt-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Link
                        to="/catalog"
                        className="hover:text-white transition-colors flex items-center gap-1"
                    >
                        <BookOpen size={13} /> Catalogue
                    </Link>
                    <ChevronRight size={13} />
                    <span className="text-slate-300 truncate">
                        {course.title}
                    </span>
                </div>
            </div>

            {/* Course Content (stays as-is, includes header + sections) */}
            <CoursePreview course={course} />

            {/* ── Quizzes & Assignments Section ── */}
            {evaluations && (
                <div className="max-w-5xl mx-auto px-4 pb-16 space-y-10">
                    <div className="h-px bg-slate-800 my-6" />

                    {/* Quizzes */}
                    {evaluations.quizzes.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                                <Play size={18} className="text-primary-400" />{" "}
                                Tests & QCM
                            </h2>
                            <div className="space-y-3">
                                {evaluations.quizzes.map(
                                    ({ id, title, duration, status }) => (
                                        <div
                                            key={id}
                                            className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${status === "locked" ? "opacity-50 border-slate-800 bg-slate-900/30" : "border-slate-800 bg-slate-900/60 hover:border-primary-700/40 hover:bg-slate-900"}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === "done" ? "bg-green-900/30" : status === "available" ? "bg-primary-900/30" : "bg-slate-800"}`}
                                                >
                                                    <Play
                                                        size={16}
                                                        className={
                                                            status === "done"
                                                                ? "text-green-400"
                                                                : status ===
                                                                    "available"
                                                                  ? "text-primary-400"
                                                                  : "text-slate-600"
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">
                                                        {title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                        <Clock size={10} />{" "}
                                                        {duration}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_QUIZ[status].style}`}
                                                >
                                                    {STATUS_QUIZ[status].label}
                                                </span>
                                                {status !== "locked" && (
                                                    <Link
                                                        to={`/test/${id}`}
                                                        className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold transition-colors"
                                                    >
                                                        {status === "done"
                                                            ? "Revoir"
                                                            : "Démarrer"}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    )}

                    {/* Assignments */}
                    {evaluations.assignments.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                                <FileText
                                    size={18}
                                    className="text-accent-400"
                                />{" "}
                                Devoirs
                            </h2>
                            <div className="space-y-3">
                                {evaluations.assignments.map(
                                    ({ id, title, deadline, status }) => (
                                        <div
                                            key={id}
                                            className="flex items-center justify-between p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-accent-700/40 hover:bg-slate-900 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === "graded" ? "bg-green-900/30" : status === "submitted" ? "bg-blue-900/30" : "bg-accent-900/30"}`}
                                                >
                                                    <FileText
                                                        size={16}
                                                        className={
                                                            status === "graded"
                                                                ? "text-green-400"
                                                                : status ===
                                                                    "submitted"
                                                                  ? "text-blue-400"
                                                                  : "text-accent-400"
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">
                                                        {title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                        <Clock size={10} />{" "}
                                                        Rendu avant le{" "}
                                                        {deadline}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_ASSIGNMENT[status].style}`}
                                                >
                                                    {
                                                        STATUS_ASSIGNMENT[
                                                            status
                                                        ].label
                                                    }
                                                </span>
                                                {status !== "graded" && (
                                                    <Link
                                                        to={`/evaluation/${id}`}
                                                        className="px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold transition-colors"
                                                    >
                                                        {status === "submitted"
                                                            ? "Voir"
                                                            : "Rendre"}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    )}

                    {!evaluations.quizzes.length &&
                        !evaluations.assignments.length && (
                            <div className="text-center py-12 text-slate-600">
                                <FileText
                                    size={32}
                                    className="mx-auto mb-2 opacity-30"
                                />
                                <p className="text-sm">
                                    Aucune évaluation disponible pour ce cours.
                                </p>
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}
