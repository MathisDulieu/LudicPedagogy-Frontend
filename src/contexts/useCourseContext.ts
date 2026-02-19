import { createContext, useContext } from "react";
import type { Course } from "../types/course";

export interface CourseContextType {
    courses: Course[];
    addCourse: (course: Course) => void;
    updateCourse: (course: Course) => void;
    deleteCourse: (id: string) => void;
    getCourseById: (id: string) => Course | undefined;
    markActivityComplete: (courseId: string, activityId: string) => void;
}

export const CourseContext = createContext<CourseContextType | undefined>(
    undefined,
);

export function useCourses() {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error("useCourses must be used within CourseProvider");
    }
    return context;
}
