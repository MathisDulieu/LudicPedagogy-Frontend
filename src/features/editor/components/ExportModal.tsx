import { useState } from "react";
import type { GameData } from "../../../types/game";
import { T, FD } from "../constants";
import { Btn } from "./Shared";

export function ExportModal({
    games,
    onClose,
}: {
    games: GameData[];
    onClose: () => void;
}) {
    const [copied, setCopied] = useState(false);
    const json = JSON.stringify(games, null, 2);

    const copy = () => {
        navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.8)",
                backdropFilter: "blur(5px)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                className="pop"
                style={{
                    background: T.bg2,
                    width: 600,
                    padding: 24,
                    borderRadius: 16,
                    border: `1px solid ${T.border}`,
                    boxShadow: T.shadowLg,
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "80vh",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <h3 style={{ fontFamily: FD, fontSize: 18, color: T.text }}>
                        Export JSON
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            color: T.muted,
                            cursor: "pointer",
                            fontSize: 24,
                        }}
                    >
                        ×
                    </button>
                </div>
                <div
                    style={{
                        background: T.bg3,
                        padding: 16,
                        borderRadius: 12,
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: T.muted,
                        overflow: "auto",
                        flex: 1,
                        whiteSpace: "pre-wrap",
                        border: `1px solid ${T.border}`,
                    }}
                >
                    {json}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 12,
                        marginTop: 20,
                    }}
                >
                    <Btn variant="secondary" onClick={onClose}>
                        Fermer
                    </Btn>
                    <Btn
                        onClick={copy}
                        style={{ width: 140, justifyContent: "center" }}
                    >
                        {copied ? "Copié !" : "Copier"}
                    </Btn>
                </div>
            </div>
        </div>
    );
}
