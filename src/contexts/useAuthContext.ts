import { createContext, useContext } from "react";

export type UserRole = "student" | "teacher" | "org_owner" | "admin";

export interface User {
    username: string;
    level: number;
    xp: number;
    role: UserRole;
    enrolledCourses: string[]; // Track IDs of enrolled courses
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, role?: UserRole) => void;
    logout: () => void;
    enrollInCourse: (courseId: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
