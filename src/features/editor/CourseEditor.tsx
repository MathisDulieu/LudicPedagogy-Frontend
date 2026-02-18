import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Save,
    Plus,
    Trash2,
    ChevronRight,
    ChevronDown,
    Type,
    Gamepad2,
    HelpCircle,
    LayoutPanelLeft,
    GripVertical,
    Settings,
    ArrowUp,
    ArrowDown,
    Columns2,
} from "lucide-react";
import { useCourses } from "../../contexts/CourseContext";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { CoursePreview } from "./components/CoursePreview";
import type {
    Activity,
    Section,
    Course,
    Difficulty,
    ActivityType,
} from "../../types/course";
import type { GameData } from "../../types/game";

export default function CourseEditor() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { getCourseById, addCourse, updateCourse } = useCourses();

    const [course, setCourse] = useState<Course>(() => {
        // Try to load draft first
        const draft = localStorage.getItem("ludic-course-draft");
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                // Return draft if it's a new course or the correct one (we'll sync in useEffect if courseId is present)
                return parsed;
            } catch (e) {
                console.error("Failed to parse course draft", e);
            }
        }
        return {
            id: "",
            title: "Nouveau Cours",
            description: "",
            difficulty: "Débutant",
            duration: "1h",
            image: "bg-blue-500",
            students: 0,
            sections: [],
        };
    });

    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const [libGames] = useState<GameData[]>(() => {
        const savedGames = localStorage.getItem("ludic-games");
        return savedGames ? JSON.parse(savedGames) : [];
    });
    const [showGameSelector, setShowGameSelector] = useState<string | null>(
        null,
    ); // sectionId_activityId
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (courseId) {
            const existing = getCourseById(courseId);
            if (existing && existing.id !== course.id) {
                setCourse(existing);
            }
        }
    }, [courseId, getCourseById, course.id]);

    // Auto-save draft
    useEffect(() => {
        if (
            course.sections.length > 0 ||
            (course.title !== "Nouveau Cours" && course.title !== "")
        ) {
            localStorage.setItem("ludic-course-draft", JSON.stringify(course));
        }
    }, [course]);

    const handleSave = () => {
        if (courseId) {
            updateCourse(course);
        } else {
            addCourse(course);
        }
        localStorage.removeItem("ludic-course-draft");
        alert("Cours sauvegardé !");
        navigate("/catalog");
    };

    const addSection = () => {
        const newSection: Section = {
            id: `sec-${crypto.randomUUID()}`,
            title: "Nouvelle Section",
            activities: [],
        };
        setCourse({ ...course, sections: [...course.sections, newSection] });
        setActiveSectionId(newSection.id);
    };

    const addActivity = (sectionId: string, type: ActivityType) => {
        const newActivity: Activity = {
            id: `act-${crypto.randomUUID()}`,
            title: type === "theory" ? "Nouveau texte" : "Nouvelle activité",
            type,
            content:
                type === "theory" ? "Écrivez votre contenu ici..." : undefined,
        };
        setCourse({
            ...course,
            sections: course.sections.map((s) =>
                s.id === sectionId
                    ? { ...s, activities: [...s.activities, newActivity] }
                    : s,
            ),
        });
    };

    const updateActivity = (
        sectionId: string,
        activityId: string,
        updates: Partial<Activity>,
    ) => {
        setCourse({
            ...course,
            sections: course.sections.map((s) =>
                s.id === sectionId
                    ? {
                          ...s,
                          activities: s.activities.map((a) =>
                              a.id === activityId ? { ...a, ...updates } : a,
                          ),
                      }
                    : s,
            ),
        });
    };

    const deleteActivity = (sectionId: string, activityId: string) => {
        setCourse({
            ...course,
            sections: course.sections.map((s) =>
                s.id === sectionId
                    ? {
                          ...s,
                          activities: s.activities.filter(
                              (a) => a.id !== activityId,
                          ),
                      }
                    : s,
            ),
        });
    };

    const moveActivity = (
        sectionId: string,
        activityId: string,
        direction: "up" | "down",
    ) => {
        setCourse((prev) => ({
            ...prev,
            sections: prev.sections.map((s) => {
                if (s.id !== sectionId) return s;
                const idx = s.activities.findIndex((a) => a.id === activityId);
                if (idx === -1) return s;
                if (direction === "up" && idx === 0) return s;
                if (direction === "down" && idx === s.activities.length - 1)
                    return s;

                const newActivities = [...s.activities];
                const targetIdx = direction === "up" ? idx - 1 : idx + 1;
                [newActivities[idx], newActivities[targetIdx]] = [
                    newActivities[targetIdx],
                    newActivities[idx],
                ];
                return { ...s, activities: newActivities };
            }),
        }));
    };

    const moveSection = (sectionId: string, direction: "up" | "down") => {
        setCourse((prev) => {
            const idx = prev.sections.findIndex((s) => s.id === sectionId);
            if (idx === -1) return prev;
            if (direction === "up" && idx === 0) return prev;
            if (direction === "down" && idx === prev.sections.length - 1)
                return prev;

            const newSections = [...prev.sections];
            const targetIdx = direction === "up" ? idx - 1 : idx + 1;
            [newSections[idx], newSections[targetIdx]] = [
                newSections[targetIdx],
                newSections[idx],
            ];
            return { ...prev, sections: newSections };
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Toolbar */}
            <div className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8 sticky top-0 z-50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Link
                        to="/catalog"
                        className="text-slate-400 hover:text-white"
                    >
                        &larr; Retour
                    </Link>
                    <h1 className="text-lg font-bold">Éditeur de Cours</h1>
                    <span className="text-slate-600">|</span>
                    <input
                        className="bg-transparent border-none focus:ring-0 text-primary-400 font-bold w-64"
                        value={course.title}
                        onChange={(e) =>
                            setCourse({ ...course, title: e.target.value })
                        }
                        placeholder="Titre du cours..."
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant={showPreview ? "primary" : "ghost"}
                        className="gap-2"
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        <Columns2 size={18} />{" "}
                        {showPreview ? "Masquer Aperçu" : "Aperçu"}
                    </Button>
                    <Button className="gap-2 px-6" onClick={handleSave}>
                        <Save size={18} /> Enregistrer
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Course Structure */}
                <div className="w-80 border-r border-slate-800 bg-slate-900/30 overflow-y-auto p-4 flex flex-col gap-6">
                    <div>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                            Paramètres
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase font-bold">
                                    Difficulté
                                </label>
                                <select
                                    className="w-full bg-slate-800 border-slate-700 rounded-md text-sm mt-1"
                                    value={course.difficulty}
                                    onChange={(e) =>
                                        setCourse({
                                            ...course,
                                            difficulty: e.target
                                                .value as Difficulty,
                                        })
                                    }
                                >
                                    <option>Débutant</option>
                                    <option>Intermédiaire</option>
                                    <option>Avancé</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase font-bold">
                                    Durée estimée
                                </label>
                                <input
                                    className="w-full bg-slate-800 border-slate-700 rounded-md text-sm mt-1"
                                    value={course.duration}
                                    onChange={(e) =>
                                        setCourse({
                                            ...course,
                                            duration: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Contenu
                            </h2>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={addSection}
                            >
                                <Plus size={16} />
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {course.sections.map((section) => (
                                <div key={section.id} className="group">
                                    <div
                                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${activeSectionId === section.id ? "bg-primary-500/10 text-primary-400" : "hover:bg-slate-800"}`}
                                        onClick={() =>
                                            setActiveSectionId(
                                                activeSectionId === section.id
                                                    ? null
                                                    : section.id,
                                            )
                                        }
                                    >
                                        {activeSectionId === section.id ? (
                                            <ChevronDown size={14} />
                                        ) : (
                                            <ChevronRight size={14} />
                                        )}
                                        <span className="text-sm font-medium flex-1 overflow-hidden text-nowrap truncate">
                                            {section.title}
                                        </span>
                                        <span className="text-[10px] bg-slate-800 text-slate-500 px-1.5 rounded">
                                            {section.activities.length}
                                        </span>
                                    </div>

                                    {activeSectionId === section.id && (
                                        <div className="ml-6 py-2 border-l border-slate-800 space-y-1">
                                            {section.activities.map((act) => (
                                                <div
                                                    key={act.id}
                                                    className="flex items-center gap-2 pl-4 py-1.5 hover:bg-slate-800/50 rounded-r-lg text-xs text-slate-400"
                                                >
                                                    {act.type === "theory" && (
                                                        <Type size={12} />
                                                    )}
                                                    {act.type === "game" && (
                                                        <Gamepad2 size={12} />
                                                    )}
                                                    {act.type === "quiz" && (
                                                        <HelpCircle size={12} />
                                                    )}
                                                    <span className="truncate">
                                                        {act.title}
                                                    </span>
                                                </div>
                                            ))}
                                            <button
                                                className="flex items-center gap-2 pl-4 py-1.5 text-primary-500/50 hover:text-primary-400 text-[10px] font-bold uppercase transition-colors"
                                                onClick={() =>
                                                    addActivity(
                                                        section.id,
                                                        "theory",
                                                    )
                                                }
                                            >
                                                <Plus size={10} /> AJOUTER UNE
                                                SOUS-SECTION
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Editor Surface */}
                <div
                    className={`flex-1 overflow-y-auto bg-slate-950 pattern-grid transition-all duration-300 ${showPreview ? "border-r border-slate-800" : ""}`}
                >
                    <div className="p-12 max-w-3xl mx-auto space-y-12">
                        {course.sections.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl">
                                <LayoutPanelLeft
                                    className="mx-auto text-slate-700 mb-4"
                                    size={48}
                                />
                                <h3 className="text-xl font-bold text-slate-500">
                                    Votre cours est vide
                                </h3>
                                <p className="text-slate-600 mb-8">
                                    Commencez par ajouter une section ou un
                                    module.
                                </p>
                                <Button onClick={addSection}>
                                    Créer une section
                                </Button>
                            </div>
                        ) : (
                            course.sections.map((section) => (
                                <section key={section.id} className="space-y-6">
                                    <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-800 group">
                                        <div className="flex items-center gap-2 flex-grow">
                                            <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="text-slate-600 hover:text-primary-400 p-0.5"
                                                    onClick={() =>
                                                        moveSection(
                                                            section.id,
                                                            "up",
                                                        )
                                                    }
                                                    title="Monter"
                                                >
                                                    <ArrowUp size={14} />
                                                </button>
                                                <button
                                                    className="text-slate-600 hover:text-primary-400 p-0.5"
                                                    onClick={() =>
                                                        moveSection(
                                                            section.id,
                                                            "down",
                                                        )
                                                    }
                                                    title="Descendre"
                                                >
                                                    <ArrowDown size={14} />
                                                </button>
                                            </div>
                                            <input
                                                className="bg-transparent border-none text-2xl font-black text-white p-0 focus:ring-0 w-full"
                                                value={section.title}
                                                onChange={(e) => {
                                                    setCourse({
                                                        ...course,
                                                        sections:
                                                            course.sections.map(
                                                                (s) =>
                                                                    s.id ===
                                                                    section.id
                                                                        ? {
                                                                              ...s,
                                                                              title: e
                                                                                  .target
                                                                                  .value,
                                                                          }
                                                                        : s,
                                                            ),
                                                    });
                                                }}
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() =>
                                                setCourse({
                                                    ...course,
                                                    sections:
                                                        course.sections.filter(
                                                            (s) =>
                                                                s.id !==
                                                                section.id,
                                                        ),
                                                })
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {section.activities.map((activity) => (
                                            <Card
                                                key={activity.id}
                                                className="relative group/card p-6 bg-slate-900/50 border-slate-800 hover:border-primary-500/50 transition-all"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 flex flex-col items-center gap-0.5 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                        <button
                                                            className="text-slate-700 hover:text-primary-400 p-0.5"
                                                            onClick={() =>
                                                                moveActivity(
                                                                    section.id,
                                                                    activity.id,
                                                                    "up",
                                                                )
                                                            }
                                                            title="Monter"
                                                        >
                                                            <ArrowUp
                                                                size={14}
                                                            />
                                                        </button>
                                                        <GripVertical
                                                            size={20}
                                                            className="text-slate-800"
                                                        />
                                                        <button
                                                            className="text-slate-700 hover:text-primary-400 p-0.5"
                                                            onClick={() =>
                                                                moveActivity(
                                                                    section.id,
                                                                    activity.id,
                                                                    "down",
                                                                )
                                                            }
                                                            title="Descendre"
                                                        >
                                                            <ArrowDown
                                                                size={14}
                                                            />
                                                        </button>
                                                    </div>

                                                    <div className="flex-1 flex flex-col gap-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className={`p-2 rounded-lg ${
                                                                        activity.type ===
                                                                        "theory"
                                                                            ? "bg-blue-500/10 text-blue-400"
                                                                            : activity.type ===
                                                                                "game"
                                                                              ? "bg-purple-500/10 text-purple-400"
                                                                              : "bg-amber-500/10 text-amber-400"
                                                                    }`}
                                                                >
                                                                    {activity.type ===
                                                                        "theory" && (
                                                                        <Type
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    )}
                                                                    {activity.type ===
                                                                        "game" && (
                                                                        <Gamepad2
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    )}
                                                                    {activity.type ===
                                                                        "quiz" && (
                                                                        <HelpCircle
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                                <input
                                                                    className="bg-transparent border-none font-bold text-lg p-0 focus:ring-0"
                                                                    value={
                                                                        activity.title
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateActivity(
                                                                            section.id,
                                                                            activity.id,
                                                                            {
                                                                                title: e
                                                                                    .target
                                                                                    .value,
                                                                            },
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-red-500/50 hover:text-red-400"
                                                                    onClick={() =>
                                                                        deleteActivity(
                                                                            section.id,
                                                                            activity.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        {activity.type ===
                                                            "theory" && (
                                                            <textarea
                                                                className="w-full bg-slate-950/50 border-slate-800 rounded-xl p-4 text-sm font-mono focus:border-primary-500 transition-colors h-32"
                                                                value={
                                                                    activity.content
                                                                }
                                                                onChange={(e) =>
                                                                    updateActivity(
                                                                        section.id,
                                                                        activity.id,
                                                                        {
                                                                            content:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        },
                                                                    )
                                                                }
                                                                placeholder="Contenu Markdown ou texte..."
                                                            />
                                                        )}

                                                        {activity.type ===
                                                            "game" && (
                                                            <div className="flex flex-col gap-4">
                                                                {activity.gameId ? (
                                                                    <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-primary-500/30 rounded-xl">
                                                                        <div className="flex items-center gap-3">
                                                                            <Gamepad2
                                                                                size={
                                                                                    24
                                                                                }
                                                                                className="text-primary-400"
                                                                            />
                                                                            <div>
                                                                                <p className="text-sm font-bold text-white uppercase tracking-wider">
                                                                                    {
                                                                                        activity.gameId
                                                                                    }
                                                                                </p>
                                                                                <p className="text-xs text-slate-500">
                                                                                    Jeu
                                                                                    interactif
                                                                                    configuré
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                onClick={() =>
                                                                                    setShowGameSelector(
                                                                                        `${section.id}_${activity.id}`,
                                                                                    )
                                                                                }
                                                                            >
                                                                                Changer
                                                                            </Button>
                                                                            <Link to="/editor">
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="secondary"
                                                                                >
                                                                                    <Settings
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                    />
                                                                                </Button>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-4">
                                                                        <Button
                                                                            variant="secondary"
                                                                            className="flex-1 gap-2 border-dashed border-2 bg-transparent"
                                                                            onClick={() =>
                                                                                setShowGameSelector(
                                                                                    `${section.id}_${activity.id}`,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Plus
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />{" "}
                                                                            Choisir
                                                                            dans
                                                                            la
                                                                            bibliothèque
                                                                        </Button>
                                                                        <Link
                                                                            to="/editor"
                                                                            className="flex-1"
                                                                        >
                                                                            <Button
                                                                                variant="ghost"
                                                                                className="w-full gap-2 border border-slate-800"
                                                                            >
                                                                                <Plus
                                                                                    size={
                                                                                        16
                                                                                    }
                                                                                />{" "}
                                                                                Créer
                                                                                un
                                                                                nouveau
                                                                                jeu
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}

                                        <div className="flex items-center justify-center gap-4 py-4 border-2 border-dashed border-slate-800 rounded-xl">
                                            <button
                                                className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-white transition-colors"
                                                onClick={() =>
                                                    addActivity(
                                                        section.id,
                                                        "theory",
                                                    )
                                                }
                                            >
                                                <Type size={16} /> Texte
                                            </button>
                                            <button
                                                className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-white transition-colors"
                                                onClick={() =>
                                                    addActivity(
                                                        section.id,
                                                        "game",
                                                    )
                                                }
                                            >
                                                <Gamepad2 size={16} /> Jeu
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Sidebar: Live Preview */}
                {showPreview && (
                    <div className="w-[500px] border-l border-slate-800 bg-slate-900/40 overflow-y-auto animate-in slide-in-from-right duration-300">
                        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md p-4 border-b border-slate-800 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                Aperçu en direct
                            </h2>
                            <div className="flex gap-2 text-[10px] text-slate-500">
                                <span>📱 Mobile</span>
                                <span>💻 Desktop</span>
                            </div>
                        </div>
                        <div className="p-4 origin-top transform scale-95 border border-slate-800 m-4 rounded-2xl bg-slate-950 shadow-2xl">
                            <CoursePreview course={course} />
                        </div>
                    </div>
                )}
            </div>

            {/* Game Selector Modal */}
            {showGameSelector && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-8">
                    <Card className="max-w-4xl w-full bg-slate-900 border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">
                                Sélectionner un jeu
                            </h2>
                            <Button
                                variant="ghost"
                                onClick={() => setShowGameSelector(null)}
                            >
                                Fermer
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Standard Games */}
                            <div
                                className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 cursor-pointer flex items-center gap-4"
                                onClick={() => {
                                    const [sId, aId] =
                                        showGameSelector.split("_");
                                    updateActivity(sId, aId, {
                                        gameId: "binary-slap",
                                        title: "Binary Slap",
                                    });
                                    setShowGameSelector(null);
                                }}
                            >
                                <div className="text-3xl">🧩</div>
                                <div>
                                    <h4 className="font-bold text-white">
                                        Binary Slap
                                    </h4>
                                    <p className="text-xs text-slate-500 italic">
                                        Jeu standard
                                    </p>
                                </div>
                            </div>
                            <div
                                className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 cursor-pointer flex items-center gap-4"
                                onClick={() => {
                                    const [sId, aId] =
                                        showGameSelector.split("_");
                                    updateActivity(sId, aId, {
                                        gameId: "hex-flash",
                                        title: "Hex Flash",
                                    });
                                    setShowGameSelector(null);
                                }}
                            >
                                <div className="text-3xl">⚡</div>
                                <div>
                                    <h4 className="font-bold text-white">
                                        Hex Flash
                                    </h4>
                                    <p className="text-xs text-slate-500 italic">
                                        Jeu standard
                                    </p>
                                </div>
                            </div>

                            {/* Custom Games */}
                            {libGames.map((game) => (
                                <div
                                    key={game.id}
                                    className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 cursor-pointer flex items-center gap-4"
                                    onClick={() => {
                                        const [sId, aId] =
                                            showGameSelector.split("_");
                                        updateActivity(sId, aId, {
                                            gameId: game.id,
                                            title: game.title,
                                        });
                                        setShowGameSelector(null);
                                    }}
                                >
                                    <div className="text-3xl">🎮</div>
                                    <div>
                                        <h4 className="font-bold text-white">
                                            {game.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 uppercase font-mono">
                                            {game.type}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-slate-800 flex justify-between items-center text-slate-500 text-sm italic">
                            <span>
                                {libGames.length + 2} jeux disponibles au total
                            </span>
                            <Link to="/editor">
                                <Button size="sm" variant="secondary">
                                    Aller à l'éditeur de jeux &rarr;
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
