import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";
import { LeaderboardProvider } from "./contexts/LeaderboardContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import { StructureProvider } from "./contexts/StructureContext";
import { CourseProvider } from "./contexts/CourseContext";
import { GameProvider } from "./contexts/GameContext";

// App layouts
import RootLayout from "./layouts/RootLayout";
import RoleGuard from "./layouts/RoleGuard";

// App pages (existing)
import Home from "./pages/Home";
import GameHub from "./pages/GameHub";
import Leaderboard from "./pages/Leaderboard";
import GamePage from "./pages/GamePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import CoursePage from "./pages/CoursePage";
import CourseCatalog from "./pages/CourseCatalog";
import CourseEditor from "./features/editor/CourseEditor";
import GameEditor from "./features/editor/GameEditor";
import Demo from "./pages/PlaygroundDemo";

// Phase 2: Auth pages (new)
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ActivateAccount from "./pages/ActivateAccount";
import Dashboard from "./pages/Dashboard";

// Phase 3: Student pages (new)
import TestSession from "./pages/student/TestSession";
import EvaluationPage from "./pages/student/EvaluationPage";
import GradesPage from "./pages/student/GradesPage";

// Phase 4: Teacher pages (new)
import TeacherCoursesPage from "./pages/teacher/TeacherCoursesPage";
import QuizEditorPage from "./pages/teacher/QuizEditorPage";
import AssignmentEditorPage from "./pages/teacher/AssignmentEditorPage";
import AntiCheatMonitor from "./pages/teacher/AntiCheatMonitor";
import TestSessionsPage from "./pages/teacher/TestSessionsPage";
import SessionDetailPage from "./pages/teacher/SessionDetailPage";
import GradeSubmissionPage from "./pages/teacher/GradeSubmissionPage";
import StudentListPage from "./pages/teacher/StudentListPage";
import StudentProfilePage from "./pages/teacher/StudentProfilePage";
import CourseStatsPage from "./pages/teacher/CourseStatsPage";

// Phase 5: Org Owner pages (new)
import OrgDashboard from "./pages/org/OrgDashboard";
import ClassesManagementPage from "./pages/org/ClassesManagementPage";
import SubstructureDetailPage from "./pages/org/SubstructureDetailPage";
import UserManagementPage from "./pages/org/UserManagementPage";
import InviteUsersPage from "./pages/org/InviteUsersPage";
import SubscriptionPage from "./pages/org/SubscriptionPage";
import PaymentHistoryPage from "./pages/org/PaymentHistoryPage";

// Phase 6: Admin pages (new)
import AdminOrganizationsPage from "./pages/admin/AdminOrganizationsPage";
import AdminOrgDetailPage from "./pages/admin/AdminOrgDetailPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminSubscriptionsPage from "./pages/admin/AdminSubscriptionsPage";
import AdminPromoCodes from "./pages/admin/AdminPromoCodes";
import AdminPaymentHistory from "./pages/admin/AdminPaymentHistory";

// Vitrine (marketing site)
import VitrineLayout from "./vitrine/VitrineLayout";
import LandingPage from "./vitrine/pages/LandingPage";
import FeaturesPage from "./vitrine/pages/FeaturesPage";
import PricingPage from "./vitrine/pages/PricingPage";
import DemoPage from "./vitrine/pages/DemoPage";
import SignupPage from "./vitrine/pages/SignupPage";
import SignupConfirmPage from "./vitrine/pages/SignupConfirmPage";
import FAQPage from "./vitrine/pages/FAQPage";
import ContactPage from "./vitrine/pages/ContactPage";
import AboutPage from "./vitrine/pages/AboutPage";
import LegalNoticePage from "./vitrine/pages/LegalNoticePage";
import TermsPage from "./vitrine/pages/TermsPage";
import PrivacyPage from "./vitrine/pages/PrivacyPage";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CourseProvider>
                    <GameProvider>
                        <LeaderboardProvider>
                            <ProgressProvider>
                                <StructureProvider>
                                    <Routes>
                                        {/* ── Vitrine (marketing site, no app navbar) ── */}
                                        <Route element={<VitrineLayout />}>
                                            <Route
                                                path="/vitrine"
                                                element={<LandingPage />}
                                            />
                                            <Route
                                                path="/vitrine/features"
                                                element={<FeaturesPage />}
                                            />
                                            <Route
                                                path="/vitrine/pricing"
                                                element={<PricingPage />}
                                            />
                                            <Route
                                                path="/vitrine/demo"
                                                element={<DemoPage />}
                                            />
                                            <Route
                                                path="/vitrine/signup"
                                                element={<SignupPage />}
                                            />
                                            <Route
                                                path="/vitrine/signup-confirm"
                                                element={<SignupConfirmPage />}
                                            />
                                            <Route
                                                path="/vitrine/faq"
                                                element={<FAQPage />}
                                            />
                                            <Route
                                                path="/vitrine/contact"
                                                element={<ContactPage />}
                                            />
                                            <Route
                                                path="/vitrine/about"
                                                element={<AboutPage />}
                                            />
                                            <Route
                                                path="/vitrine/legal"
                                                element={<LegalNoticePage />}
                                            />
                                            <Route
                                                path="/vitrine/terms"
                                                element={<TermsPage />}
                                            />
                                            <Route
                                                path="/vitrine/privacy"
                                                element={<PrivacyPage />}
                                            />
                                        </Route>

                                        {/* ── App (with Navbar) ── */}
                                        <Route element={<RootLayout />}>
                                            {/* Home */}
                                            <Route
                                                path="/"
                                                element={<Home />}
                                            />

                                            {/* Auth */}
                                            <Route
                                                path="/login"
                                                element={<Login />}
                                            />
                                            <Route
                                                path="/forgot-password"
                                                element={<ForgotPassword />}
                                            />
                                            <Route
                                                path="/reset-password"
                                                element={<ResetPassword />}
                                            />
                                            <Route
                                                path="/activate"
                                                element={<ActivateAccount />}
                                            />

                                            {/* Common */}
                                            <Route
                                                path="/dashboard"
                                                element={<Dashboard />}
                                            />
                                            <Route
                                                path="/profile"
                                                element={<Profile />}
                                            />
                                            <Route
                                                path="/leaderboard"
                                                element={<Leaderboard />}
                                            />

                                            {/* Game */}
                                            <Route
                                                path="/hub"
                                                element={<GameHub />}
                                            />
                                            <Route
                                                path="/game/:gameId"
                                                element={<GamePage />}
                                            />
                                            <Route
                                                path="/editor"
                                                element={<GameEditor />}
                                            />
                                            <Route
                                                path="/demo"
                                                element={<Demo />}
                                            />

                                            {/* Courses */}
                                            <Route
                                                path="/my-courses"
                                                element={<MyCourses />}
                                            />
                                            <Route
                                                path="/catalog"
                                                element={<CourseCatalog />}
                                            />
                                            <Route
                                                path="/course/:courseId"
                                                element={<CoursePage />}
                                            />
                                            <Route
                                                path="/course-editor"
                                                element={<CourseEditor />}
                                            />
                                            <Route
                                                path="/course-editor/:courseId"
                                                element={<CourseEditor />}
                                            />

                                            {/* Student */}
                                            <Route
                                                path="/test/:sessionId"
                                                element={<TestSession />}
                                            />
                                            <Route
                                                path="/evaluation/:assignmentId"
                                                element={<EvaluationPage />}
                                            />
                                            <Route
                                                path="/grades"
                                                element={<GradesPage />}
                                            />

                                            {/* Teacher — only teachers and admins */}
                                            <Route
                                                element={
                                                    <RoleGuard
                                                        allow={[
                                                            "teacher",
                                                            "admin",
                                                        ]}
                                                    />
                                                }
                                            >
                                                <Route
                                                    path="/teacher/courses"
                                                    element={
                                                        <TeacherCoursesPage />
                                                    }
                                                />
                                                <Route
                                                    path="/teacher/quiz-editor/:quizId"
                                                    element={<QuizEditorPage />}
                                                />
                                                <Route
                                                    path="/teacher/assignment-editor/:assignmentId"
                                                    element={
                                                        <AssignmentEditorPage />
                                                    }
                                                />
                                                <Route
                                                    path="/teacher/anti-cheat/:sessionId"
                                                    element={
                                                        <AntiCheatMonitor />
                                                    }
                                                />
                                                <Route
                                                    path="/teacher/sessions"
                                                    element={
                                                        <TestSessionsPage />
                                                    }
                                                />
                                                <Route
                                                    path="/teacher/sessions/:sessionId"
                                                    element={
                                                        <SessionDetailPage />
                                                    }
                                                />
                                                <Route
                                                    path="/teacher/grade/:submissionId"
                                                    element={
                                                        <GradeSubmissionPage />
                                                    }
                                                />
                                                <Route
                                                    path="/teacher/students"
                                                    element={
                                                        <StudentListPage />
                                                    }
                                                />
                                                <Route
                                                    path="/teacher/students/:studentId"
                                                    element={
                                                        <StudentProfilePage />
                                                    }
                                                />
                                                <Route
                                                    path="/teacher/stats"
                                                    element={
                                                        <CourseStatsPage />
                                                    }
                                                />
                                            </Route>

                                            {/* Org Owner — only org_owner and admin */}
                                            <Route
                                                element={
                                                    <RoleGuard
                                                        allow={[
                                                            "org_owner",
                                                            "admin",
                                                        ]}
                                                    />
                                                }
                                            >
                                                <Route
                                                    path="/org/dashboard"
                                                    element={<OrgDashboard />}
                                                />
                                                <Route
                                                    path="/org/classes"
                                                    element={
                                                        <ClassesManagementPage />
                                                    }
                                                />
                                                <Route
                                                    path="/org/classes/:classId"
                                                    element={
                                                        <SubstructureDetailPage />
                                                    }
                                                />
                                                <Route
                                                    path="/org/users"
                                                    element={
                                                        <UserManagementPage />
                                                    }
                                                />
                                                <Route
                                                    path="/org/invite"
                                                    element={
                                                        <InviteUsersPage />
                                                    }
                                                />
                                                <Route
                                                    path="/org/subscription"
                                                    element={
                                                        <SubscriptionPage />
                                                    }
                                                />
                                                <Route
                                                    path="/org/payments"
                                                    element={
                                                        <PaymentHistoryPage />
                                                    }
                                                />
                                            </Route>

                                            {/* Admin — only admin */}
                                            <Route
                                                element={
                                                    <RoleGuard
                                                        allow={["admin"]}
                                                    />
                                                }
                                            >
                                                <Route
                                                    path="/admin/organizations"
                                                    element={
                                                        <AdminOrganizationsPage />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/organizations/:orgId"
                                                    element={
                                                        <AdminOrgDetailPage />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/users"
                                                    element={<AdminUsersPage />}
                                                />
                                                <Route
                                                    path="/admin/subscriptions"
                                                    element={
                                                        <AdminSubscriptionsPage />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/promo-codes"
                                                    element={
                                                        <AdminPromoCodes />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/payments"
                                                    element={
                                                        <AdminPaymentHistory />
                                                    }
                                                />
                                            </Route>
                                        </Route>
                                    </Routes>
                                </StructureProvider>
                            </ProgressProvider>
                        </LeaderboardProvider>
                    </GameProvider>
                </CourseProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
