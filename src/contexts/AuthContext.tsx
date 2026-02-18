import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "student" | "teacher" | "admin";

interface User {
    username: string;
    level: number;
    xp: number;
    role: UserRole;
    enrolledCourses: string[]; // Track IDs of enrolled courses
}

interface AuthContextType {
    user: User | null;
    login: (username: string, role?: UserRole) => void;
    logout: () => void;
    enrollInCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("user");
        if (!stored) return null;
        try {
            const parsed = JSON.parse(stored);
            // Safety fallback for legacy sessions lacking new fields
            if (parsed && !parsed.enrolledCourses) {
                parsed.enrolledCourses = [];
            }
            return parsed;
        } catch (e) {
            return null;
        }
    });

    function login(username: string, role: UserRole = "student") {
        const newUser: User = {
            username,
            level: 1,
            xp: 0,
            role,
            enrolledCourses: ["binary-basics"], // Default starting course
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("xp"); // Reset progress on logout for clean session
    }

    function enrollInCourse(courseId: string) {
        if (!user) return;
        if (user.enrolledCourses.includes(courseId)) return;

        const updatedUser = {
            ...user,
            enrolledCourses: [...user.enrolledCourses, courseId],
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, enrollInCourse }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
