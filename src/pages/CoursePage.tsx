import { useParams, Link } from "react-router-dom";
import { useCourses } from "../contexts/useCourseContext";
import { CoursePreview } from "../features/editor/components/CoursePreview";

export default function CoursePage() {
    const { courseId } = useParams<{ courseId: string }>();
    const { getCourseById } = useCourses();
    const course = courseId ? getCourseById(courseId) : null;

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
            <div className="max-w-5xl mx-auto px-4 py-8">
                <Link
                    to="/catalog"
                    className="text-sm text-slate-400 hover:text-white mb-8 inline-block"
                >
                    &larr; Retour au catalogue
                </Link>
                <CoursePreview course={course} />
            </div>
        </div>
    );
}
