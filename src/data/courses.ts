import type { Course } from "../types/course";

export const DEFAULT_COURSES: Course[] = [
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
