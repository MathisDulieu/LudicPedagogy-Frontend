import { createContext, useContext, useState, type ReactNode } from "react";
import type { Course } from "../types/course";

interface CourseContextType {
    courses: Course[];
    addCourse: (course: Course) => void;
    updateCourse: (course: Course) => void;
    deleteCourse: (id: string) => void;
    getCourseById: (id: string) => Course | undefined;
}

const DEFAULT_COURSES: Course[] = [
    {
        id: "binary-basics",
        title: "Les Bases du Binaire",
        description:
            "Apprends à penser comme un ordinateur en comprenant le système binaire.",
        difficulty: "Débutant",
        duration: "2h",
        image: "bg-emerald-500",
        students: 124,
        sections: [
            {
                id: "s1",
                title: "Introduction",
                activities: [
                    {
                        id: "a1",
                        title: "Qu'est-ce que le binaire ?",
                        type: "theory",
                        content:
                            "Le binaire est un système de comptage en base 2...",
                    },
                    {
                        id: "a2",
                        title: "Conversion Décimal -> Binaire",
                        type: "game",
                        gameId: "binary-slap",
                    },
                ],
            },
        ],
    },
    {
        id: "hex-mastery",
        title: "Maîtrise Hexadécimale",
        description:
            "Domine les conversions entre binaire, décimal et hexadécimal.",
        difficulty: "Intermédiaire",
        duration: "1.5h",
        image: "bg-purple-500",
        students: 85,
        sections: [
            {
                id: "s2",
                title: "L'Hexadécimal",
                activities: [
                    {
                        id: "a3",
                        title: "Pourquoi l'Hexa ?",
                        type: "theory",
                        content:
                            "L'hexadécimal permet de condenser 4 bits en un seul caractère...",
                    },
                    {
                        id: "a4",
                        title: "Hex Flash Challenge",
                        type: "game",
                        gameId: "hex-flash",
                    },
                ],
            },
        ],
    },
];

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
    const [courses, setCourses] = useState<Course[]>(() => {
        const stored = localStorage.getItem("courses");
        return stored ? JSON.parse(stored) : DEFAULT_COURSES;
    });

    const addCourse = (course: Course) => {
        const updated = [...courses, course];
        setCourses(updated);
        localStorage.setItem("courses", JSON.stringify(updated));
    };

    const updateCourse = (course: Course) => {
        const updated = courses.map((c) => (c.id === course.id ? course : c));
        setCourses(updated);
        localStorage.setItem("courses", JSON.stringify(updated));
    };

    const deleteCourse = (id: string) => {
        const updated = courses.filter((c) => c.id !== id);
        setCourses(updated);
        localStorage.setItem("courses", JSON.stringify(updated));
    };

    const getCourseById = (id: string) => courses.find((c) => c.id === id);

    return (
        <CourseContext.Provider
            value={{
                courses,
                addCourse,
                updateCourse,
                deleteCourse,
                getCourseById,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
}

export function useCourses() {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error("useCourses must be used within CourseProvider");
    }
    return context;
}
