// ── DESIGN TOKENS ────────────────────────────────────────────────────────────
export const T = {
    bg: "#12111a",
    bg2: "#1a1828",
    bg3: "#211f30",
    border: "#2e2c3e",
    borderHi: "#7c3aed",
    text: "#f0eeff",
    muted: "#7a7890",
    dim: "#4a4860",
    accent: "#7c3aed",
    accentLo: "#2d1f4e",
    accentHi: "#a855f7",
    green: "#22c55e",
    greenLo: "#0f2d1a",
    red: "#ef4444",
    redLo: "#2d0f0f",
    yellow: "#eab308",
    yellowLo: "#2d250a",
    blue: "#3b82f6",
    blueLo: "#0a1a2d",
    shadow: "0 2px 8px rgba(0,0,0,.4)",
    shadowLg: "0 8px 32px rgba(0,0,0,.5)",
};

export const FD = "Unbounded, sans-serif";
export const FB = "Plus Jakarta Sans, sans-serif";

// ── ANIMATION SKINS ──────────────────────────────────────────────────────────
export const SKINS = [
    { id: "none", label: "Aucune", emoji: "⬜" },
    { id: "flower", label: "Fleur", emoji: "🌸" },
    { id: "boxing", label: "Match de boxe", emoji: "🥊" },
    { id: "star", label: "Étoile filante", emoji: "⭐" },
    { id: "duel", label: "Duel spatial", emoji: "🚀" },
];

// ── GAME TYPES ────────────────────────────────────────────────────────────────
export const GAME_TYPES = [
    {
        type: "qcm",
        icon: "⚡",
        label: "Quiz Flash",
        desc: "QCM multi-choix",
        color: "#7c3aed",
    },
    {
        type: "wario",
        icon: "🎮",
        label: "Micro-Défi",
        desc: "Chrono WarioWare",
        color: "#eab308",
    },
    {
        type: "truefalse",
        icon: "⚖️",
        label: "Vrai / Faux",
        desc: "Binaire sous tension",
        color: "#3b82f6",
    },
    {
        type: "fillblank",
        icon: "✏️",
        label: "Phrase à trous",
        desc: "Texte lacunaire",
        color: "#22c55e",
    },
    {
        type: "connect",
        icon: "🔗",
        label: "Relier",
        desc: "Associer deux colonnes",
        color: "#f97316",
    },
    {
        type: "timeline",
        icon: "📅",
        label: "Chronologie",
        desc: "Remettre dans l'ordre",
        color: "#ec4899",
    },
    {
        type: "enigma",
        icon: "🔎",
        label: "Énigme Layton",
        desc: "Indices + solution",
        color: "#06b6d4",
    },
    {
        type: "memory",
        icon: "🃏",
        label: "Memory",
        desc: "Trouver les paires",
        color: "#8b5cf6",
    },
    {
        type: "sort",
        icon: "🔃",
        label: "Tri Logique",
        desc: "Classer dans l'ordre",
        color: "#10b981",
    },
];
