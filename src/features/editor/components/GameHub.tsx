import { useState } from "react";
import type { GameData } from "../../../types/game";
import { T, FB, FD, GAME_TYPES } from "../constants";
import { Btn } from "./Shared";
import { TypeSelectionModal } from "./TypeSelectionModal";
import {
    Plus,
    Trash2,
    Layout,
    Gamepad2,
    Settings,
    ArrowLeft,
} from "lucide-react";

interface GameHubProps {
    games: GameData[];
    onCreate: (g: GameData) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onExport: () => void;
    onExit?: () => void;
}

export function GameHub({
    games,
    onCreate,
    onEdit,
    onDelete,
    onExport,
    onExit,
}: GameHubProps) {
    const [filter, setFilter] = useState("all");
    const [showSelector, setShowSelector] = useState(false);

    const filtered =
        filter === "all" ? games : games.filter((g) => g.type === filter);

    return (
        <div
            className="fade-up"
            style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "80px 40px 40px 40px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 40,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {onExit && (
                        <button
                            onClick={onExit}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: `1px solid ${T.border}`,
                                background: T.bg2,
                                color: T.muted,
                                cursor: "pointer",
                                transition: "all .2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = T.accent;
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = T.border;
                                e.currentTarget.style.color = T.muted;
                            }}
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div>
                        <h1
                            style={{
                                fontFamily: FD,
                                fontSize: 32,
                                marginBottom: 8,
                                background: `linear-gradient(135deg,#fff,${T.accent})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Atelier Ludique
                        </h1>
                        <p style={{ color: T.muted, fontFamily: FB }}>
                            Créez et gérez vos micro-jeux pédagogiques
                        </p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <Btn variant="secondary" onClick={onExport}>
                        <Layout size={16} /> Exporter tout
                    </Btn>
                    <Btn variant="primary">
                        <Settings size={16} /> Paramètres
                    </Btn>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 24,
                    overflowX: "auto",
                    paddingBottom: 8,
                }}
            >
                <Btn
                    variant={filter === "all" ? "primary" : "ghost"}
                    onClick={() => setFilter("all")}
                >
                    Tous ({games.length})
                </Btn>
                {GAME_TYPES.map((t) => (
                    <Btn
                        key={t.type}
                        variant={filter === t.type ? "primary" : "ghost"}
                        onClick={() => setFilter(t.type)}
                    >
                        <span style={{ marginRight: 6 }}>{t.icon}</span>
                        {t.label}
                    </Btn>
                ))}
            </div>

            <div
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                    display: "grid",
                    gap: 24,
                }}
            >
                <button
                    onClick={() => setShowSelector(true)}
                    className="new-game-btn"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        border: `2px dashed ${T.border}`,
                        borderRadius: 20,
                        minHeight: 200,
                        background: T.bg2,
                        cursor: "pointer",
                        transition: "all .2s",
                        color: T.muted,
                    }}
                >
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: T.bg3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Plus size={24} />
                    </div>
                    <span style={{ fontFamily: FB, fontWeight: 600 }}>
                        Nouveau Jeu
                    </span>
                </button>

                {filtered.map((g) => {
                    const typeInfo =
                        GAME_TYPES.find((t) => t.type === g.type) ||
                        GAME_TYPES[0];
                    return (
                        <div
                            key={g.id}
                            onClick={() => onEdit(g.id)}
                            style={{
                                background: T.bg2,
                                borderRadius: 20,
                                border: `1px solid ${T.border}`,
                                overflow: "hidden",
                                position: "relative",
                                cursor: "pointer",
                                transition: "transform .2s, box-shadow .2s",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-4px)";
                                e.currentTarget.style.boxShadow = T.shadowLg;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div
                                style={{
                                    height: 120,
                                    background: typeInfo.color,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {g.image ? (
                                    <img
                                        src={g.image}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            opacity: 0.8,
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 48,
                                            opacity: 0.3,
                                        }}
                                    >
                                        {typeInfo.icon}
                                    </div>
                                )}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 12,
                                        right: 12,
                                        background: "rgba(0,0,0,.4)",
                                        backdropFilter: "blur(4px)",
                                        padding: "4px 10px",
                                        borderRadius: 99,
                                        color: "#fff",
                                        fontFamily: FD,
                                        fontSize: 10,
                                        fontWeight: 700,
                                    }}
                                >
                                    {typeInfo.label}
                                </div>
                            </div>

                            <div
                                style={{
                                    padding: 20,
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <h3
                                    style={{
                                        fontFamily: FD,
                                        fontSize: 16,
                                        color: T.text,
                                        marginBottom: 6,
                                    }}
                                >
                                    {g.title}
                                </h3>
                                <p
                                    style={{
                                        fontFamily: FB,
                                        fontSize: 12,
                                        color: T.muted,
                                        lineHeight: 1.5,
                                        marginBottom: 16,
                                        flex: 1,
                                    }}
                                >
                                    {typeInfo.desc}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingTop: 16,
                                        borderTop: `1px solid ${T.border}`,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            fontSize: 12,
                                            color: T.dim,
                                            fontFamily: FB,
                                        }}
                                    >
                                        <Gamepad2 size={14} />
                                        <span>{g.id.substring(0, 4)}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(g.id);
                                        }}
                                        style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: 8,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "none",
                                            background: T.redLo,
                                            color: T.red,
                                            cursor: "pointer",
                                            transition: "background .2s",
                                        }}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showSelector && (
                <TypeSelectionModal
                    onClose={() => setShowSelector(false)}
                    onSelect={(g) => {
                        onCreate(g);
                        setShowSelector(false);
                    }}
                />
            )}
        </div>
    );
}
