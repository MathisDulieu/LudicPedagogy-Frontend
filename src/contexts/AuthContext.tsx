import { useState, type ReactNode } from "react";
import { AuthContext, type User, type UserRole } from "./useAuthContext";

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
        } catch {
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
