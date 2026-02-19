import type { GameData } from "../../../types/game";
import { T, FD, FB, GAME_TYPES } from "../constants";
import { FACTORIES } from "../factories";
import { Btn } from "./Shared";

interface TypeSelectionModalProps {
    onClose: () => void;
    onSelect: (g: GameData) => void;
}

export function TypeSelectionModal({
    onClose,
    onSelect,
}: TypeSelectionModalProps) {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.85)",
                backdropFilter: "blur(12px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
            }}
            onClick={onClose}
        >
            <div
                className="pop"
                style={{
                    background: T.bg2,
                    width: "100%",
                    maxWidth: 700,
                    padding: 32,
                    borderRadius: 24,
                    border: `1px solid ${T.border}`,
                    boxShadow: T.shadowLg,
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "90vh",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 24,
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontFamily: FD,
                                fontSize: 20,
                                color: T.text,
                                marginBottom: 4,
                            }}
                        >
                            Nouveau Jeu
                        </h3>
                        <p
                            style={{
                                fontFamily: FB,
                                fontSize: 13,
                                color: T.muted,
                            }}
                        >
                            Choisissez le type de micro-jeu à créer
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: T.bg3,
                            border: "none",
                            color: T.muted,
                            cursor: "pointer",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                        }}
                    >
                        ×
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: 16,
                        overflowY: "auto",
                        paddingRight: 4,
                        flex: 1,
                        minHeight: 0,
                    }}
                >
                    {GAME_TYPES.map((t) => (
                        <button
                            key={t.type}
                            onClick={() => onSelect(FACTORIES[t.type]())}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                textAlign: "left",
                                padding: 20,
                                background: T.bg3,
                                border: `1.5px solid ${T.border}`,
                                borderRadius: 16,
                                cursor: "pointer",
                                transition: "all .2s",
                                position: "relative",
                                overflow: "hidden",
                                opacity: 1,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = t.color;
                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = T.border;
                                e.currentTarget.style.transform = "none";
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 28,
                                    marginBottom: 12,
                                    background: t.color + "20",
                                    width: 50,
                                    height: 50,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 12,
                                }}
                            >
                                {t.icon}
                            </div>
                            <div
                                style={{
                                    fontFamily: FD,
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: T.text,
                                    marginBottom: 4,
                                }}
                            >
                                {t.label}
                            </div>
                            <div
                                style={{
                                    fontFamily: FB,
                                    fontSize: 11,
                                    color: T.muted,
                                    lineHeight: 1.4,
                                }}
                            >
                                {t.desc}
                            </div>
                        </button>
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 24,
                    }}
                >
                    <Btn variant="secondary" onClick={onClose}>
                        Annuler
                    </Btn>
                </div>
            </div>
        </div>
    );
}
