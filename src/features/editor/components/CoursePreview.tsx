import { CheckCircle, Lock, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import type { Course } from "../../../types/course";
import { useCourses } from "../../../contexts/useCourseContext";

interface CoursePreviewProps {
    course: Course;
}

export function CoursePreview({ course }: CoursePreviewProps) {
    const { markActivityComplete } = useCourses();
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-4">
                            {course.title || "Titre du cours"}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl">
                            {course.description || "Description du cours..."}
                        </p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <div className="text-3xl font-bold text-white">
                            {course.progress || 0}%
                        </div>
                        <div className="text-slate-500 text-sm uppercase tracking-wider">
                            Complété
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules List */}
            <div className="space-y-12">
                {course.sections.map((section, sIdx) => (
                    <div key={section.id || sIdx}>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center text-sm">
                                {sIdx + 1}
                            </span>
                            {section.title || "Section sans titre"}
                        </h2>
                        <div className="space-y-4">
                            {section.activities.map((activity, index) => (
                                <Card
                                    key={activity.id || index}
                                    className={`transition-all duration-200 border-l-4 p-6 ${
                                        activity.completed
                                            ? "border-l-green-500 bg-slate-900/30"
                                            : activity.locked
                                              ? "border-l-slate-700 opacity-70"
                                              : "border-l-primary-500 bg-slate-900/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Status Icon */}
                                        <div className="flex-shrink-0">
                                            {activity.completed ? (
                                                <CheckCircle
                                                    className="text-green-500"
                                                    size={24}
                                                />
                                            ) : activity.locked ? (
                                                <Lock
                                                    className="text-slate-600"
                                                    size={24}
                                                />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full border-2 border-primary-500 flex items-center justify-center text-xs font-bold text-primary-500">
                                                    {index + 1}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <h3
                                                className={`text-lg font-semibold ${activity.completed ? "text-slate-400" : "text-white"}`}
                                            >
                                                {activity.title ||
                                                    (activity.type === "theory"
                                                        ? "Texte"
                                                        : "Jeu")}
                                            </h3>
                                            <p className="text-sm text-slate-500 capitalize">
                                                {activity.type === "theory"
                                                    ? "Théorie"
                                                    : activity.type}
                                            </p>
                                        </div>

                                        {/* Action */}
                                        <div className="flex-shrink-0">
                                            {activity.type === "game" &&
                                                activity.gameId &&
                                                !activity.locked && (
                                                    <Link
                                                        to={`/game/${activity.gameId}?courseId=${course.id}&activityId=${activity.id}`}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant={
                                                                activity.completed
                                                                    ? "secondary"
                                                                    : "primary"
                                                            }
                                                            className="gap-2"
                                                        >
                                                            <Gamepad2
                                                                size={16}
                                                            />
                                                            {activity.completed
                                                                ? "Rejouer"
                                                                : "Jouer"}
                                                        </Button>
                                                    </Link>
                                                )}
                                            {activity.type === "theory" &&
                                                !activity.locked && (
                                                    <Button
                                                        size="sm"
                                                        variant={
                                                            activity.completed
                                                                ? "ghost"
                                                                : "primary"
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                !activity.completed
                                                            ) {
                                                                markActivityComplete(
                                                                    course.id,
                                                                    activity.id,
                                                                );
                                                            }
                                                            alert(
                                                                activity.content ||
                                                                    "Aucun contenu",
                                                            );
                                                        }}
                                                    >
                                                        {activity.completed
                                                            ? "Relire"
                                                            : "Démarrer"}
                                                    </Button>
                                                )}
                                            {activity.locked && (
                                                <Lock
                                                    className="text-slate-600"
                                                    size={20}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {activity.type === "theory" &&
                                        activity.content &&
                                        !activity.locked && (
                                            <div className="mt-4 p-4 bg-slate-950/50 rounded-lg text-slate-300 text-sm whitespace-pre-wrap font-sans border border-slate-800">
                                                {activity.content}
                                            </div>
                                        )}
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
