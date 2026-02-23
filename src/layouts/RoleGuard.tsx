import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuthContext";
import type { UserRole } from "../contexts/useAuthContext";

interface RoleGuardProps {
    /** Roles that are allowed to access the wrapped routes */
    allow: UserRole[];
    /** Where to redirect if the user is authenticated but has the wrong role (defaults to "/") */
    fallback?: string;
}

/**
 * Protects routes by role. Usage in main.tsx:
 *
 * <Route element={<RoleGuard allow={["teacher", "admin"]} />}>
 *   <Route path="/teacher/courses" element={<TeacherCoursesPage />} />
 * </Route>
 */
export default function RoleGuard({ allow, fallback = "/" }: RoleGuardProps) {
    const { user } = useAuth();

    // Not logged in → go to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role → go to fallback
    if (!allow.includes(user.role)) {
        return <Navigate to={fallback} replace />;
    }

    return <Outlet />;
}
