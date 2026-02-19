import { useState, useMemo, useCallback, type ReactNode } from "react";
import type { Course } from "../types/course";
import { DEFAULT_COURSES } from "../data/courses";
import { CourseContext } from "./useCourseContext";

export function CourseProvider({ children }: { children: ReactNode }) {
    const [courses, setCourses] = useState<Course[]>(() => {
        const stored = localStorage.getItem("courses");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    // Filter out corrupt courses with empty IDs
                    return parsed.filter((c: Course) => c && c.id);
                }
            } catch (e) {
                console.error("Failed to parse stored courses", e);
            }
        }
        return DEFAULT_COURSES;
    });

    const addCourse = useCallback((course: Course) => {
        setCourses((prev) => {
            const updated = [...prev, course];
            localStorage.setItem("courses", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const updateCourse = useCallback((course: Course) => {
        setCourses((prev) => {
            const updated = prev.map((c) => (c.id === course.id ? course : c));
            localStorage.setItem("courses", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const deleteCourse = useCallback((id: string) => {
        setCourses((prev) => {
            const updated = prev.filter((c) => c.id !== id);
            localStorage.setItem("courses", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const getCourseById = useCallback(
        (id: string) => courses.find((c) => c.id === id),
        [courses],
    );

    const markActivityComplete = useCallback(
        (courseId: string, activityId: string) => {
            setCourses((prev) => {
                const updated = prev.map((c) => {
                    if (c.id !== courseId) return c;

                    const updatedSections = c.sections.map((section) => ({
                        ...section,
                        activities: section.activities.map((activity) =>
                            activity.id === activityId
                                ? { ...activity, completed: true }
                                : activity,
                        ),
                    }));

                    // Recalculate global progress
                    const totalActivities = updatedSections.reduce(
                        (acc, s) => acc + s.activities.length,
                        0,
                    );
                    const completedActivities = updatedSections.reduce(
                        (acc, s) =>
                            acc +
                            s.activities.filter((a) => a.completed).length,
                        0,
                    );
                    const progress =
                        totalActivities > 0
                            ? Math.round(
                                  (completedActivities / totalActivities) * 100,
                              )
                            : 0;

                    return {
                        ...c,
                        sections: updatedSections,
                        progress,
                    };
                });
                localStorage.setItem("courses", JSON.stringify(updated));
                return updated;
            });
        },
        [],
    );

    const value = useMemo(
        () => ({
            courses,
            addCourse,
            updateCourse,
            deleteCourse,
            getCourseById,
            markActivityComplete,
        }),
        [
            courses,
            addCourse,
            updateCourse,
            deleteCourse,
            getCourseById,
            markActivityComplete,
        ],
    );

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
}
