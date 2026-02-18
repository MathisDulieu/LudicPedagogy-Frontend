import { uid } from "./utils";
import type {
    GameData,
    QCMData,
    WarioData,
    TrueFalseData,
    FillBlankData,
    ConnectData,
    TimelineData,
    EnigmaData,
    MemoryData,
    SortData,
} from "../../types/game";

// ── DEFAULT FACTORIES ─────────────────────────────────────────────────────────
export const mkQCM = (): QCMData => ({
    id: uid(),
    type: "qcm",
    title: "Quiz Flash",
    image: null,
    skin: "flower",
    xpCorrect: 15,
    shuffleChoices: false,
    showProgress: true,
    questions: [
        {
            id: uid(),
            q: "",
            image: null,
            choices: ["", "", "", ""],
            answer: "",
        },
    ],
});

export const mkWario = (): WarioData => ({
    id: uid(),
    type: "wario",
    title: "Micro-Défi",
    image: null,
    skin: "boxing",
    xpCorrect: 10,
    shuffleOptions: true,
    tasks: [
        {
            id: uid(),
            instruction: "",
            options: ["", "", "", ""],
            answer: "",
            duration: 4000,
        },
    ],
});

export const mkTrueFalse = (): TrueFalseData => ({
    id: uid(),
    type: "truefalse",
    title: "Vrai / Faux",
    image: null,
    skin: "star",
    xpCorrect: 8,
    statements: [{ id: uid(), text: "", answer: true, explanation: "" }],
});

export const mkFillBlank = (): FillBlankData => ({
    id: uid(),
    type: "fillblank",
    title: "Phrase à trous",
    image: null,
    skin: "none",
    xpCorrect: 12,
    sentences: [{ id: uid(), before: "", answer: "", after: "", hint: "" }],
});

export const mkConnect = (): ConnectData => ({
    id: uid(),
    type: "connect",
    title: "Relier",
    image: null,
    skin: "none",
    xpCorrect: 10,
    pairs: [
        { id: uid(), left: "", right: "" },
        { id: uid(), left: "", right: "" },
        { id: uid(), left: "", right: "" },
    ],
});

export const mkTimeline = (): TimelineData => ({
    id: uid(),
    type: "timeline",
    title: "Chronologie",
    image: null,
    skin: "none",
    xpCorrect: 15,
    events: [
        { id: uid(), label: "", order: 1 },
        { id: uid(), label: "", order: 2 },
        { id: uid(), label: "", order: 3 },
    ],
});

export const mkEnigma = (): EnigmaData => ({
    id: uid(),
    type: "enigma",
    title: "Énigme",
    image: null,
    skin: "star",
    xpCorrect: 20,
    narrative: "",
    clues: ["", "", ""],
    answer: "",
    wrongFeedback: "",
    correctFeedback: "",
});

export const mkMemory = (): MemoryData => ({
    id: uid(),
    type: "memory",
    title: "Memory",
    image: null,
    skin: "none",
    xpCorrect: 20,
    pairs: [
        { id: uid(), left: "A", right: "A" },
        { id: uid(), left: "B", right: "B" },
    ],
});

export const mkSort = (): SortData => ({
    id: uid(),
    type: "sort",
    title: "Tri Logique",
    image: null,
    skin: "none",
    xpCorrect: 15,
    minLabel: "Plus petit",
    maxLabel: "Plus grand",
    items: [
        { id: uid(), label: "Item 1", value: 1 },
        { id: uid(), label: "Item 2", value: 2 },
        { id: uid(), label: "Item 3", value: 3 },
    ],
});

export const FACTORIES: Record<string, () => GameData> = {
    qcm: mkQCM,
    wario: mkWario,
    truefalse: mkTrueFalse,
    fillblank: mkFillBlank,
    connect: mkConnect,
    timeline: mkTimeline,
    enigma: mkEnigma,
    memory: mkMemory,
    sort: mkSort,
};
