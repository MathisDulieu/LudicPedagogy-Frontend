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

import Home from "./pages/Home.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import GameHub from "./pages/GameHub.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import GamePage from "./pages/GamePage.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import MyCourses from "./pages/MyCourses.tsx";
import CoursePage from "./pages/CoursePage.tsx";
import CourseCatalog from "./pages/CourseCatalog.tsx";
import CourseEditor from "./features/editor/CourseEditor";
import GameEditor from "./features/editor/GameEditor";
import Demo from "./pages/PlaygroundDemo";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CourseProvider>
                    <LeaderboardProvider>
                        <ProgressProvider>
                            <StructureProvider>
                                <Routes>
                                    <Route element={<RootLayout />}>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="/hub"
                                            element={<GameHub />}
                                        />
                                        <Route
                                            path="/leaderboard"
                                            element={<Leaderboard />}
                                        />
                                        <Route
                                            path="/profile"
                                            element={<Profile />}
                                        />
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
                                        <Route
                                            path="/game/:gameId"
                                            element={<GamePage />}
                                        />
                                        <Route
                                            path="/login"
                                            element={<Login />}
                                        />
                                        <Route
                                            path="/editor"
                                            element={<GameEditor />}
                                        />
                                        <Route
                                            path="/demo"
                                            element={<Demo />}
                                        />
                                    </Route>
                                </Routes>
                            </StructureProvider>
                        </ProgressProvider>
                    </LeaderboardProvider>
                </CourseProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
