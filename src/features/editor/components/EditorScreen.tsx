import React, { useState } from "react";
import type { GameData } from "../../../types/game";
import { T, FD, FB } from "../constants";
import { QCMEditor } from "./QCMEditor";
import { WarioEditor } from "./WarioEditor";
import { TrueFalseEditor } from "./TrueFalseEditor";
import { FillBlankEditor } from "./FillBlankEditor";
import { ConnectEditor } from "./ConnectEditor";
import { TimelineEditor } from "./TimelineEditor";
import { EnigmaEditor } from "./EnigmaEditor";
import { MemoryEditor } from "./MemoryEditor";
import { SortEditor } from "./SortEditor";
import { LivePreviewWrapper } from "./Preview";
import { Btn } from "./Shared";
import { ArrowLeft, Save } from "lucide-react";

// Mapping of types to editor components
const EDITORS: Record<string, React.ComponentType<any>> = {
    qcm: QCMEditor,
    wario: WarioEditor,
    truefalse: TrueFalseEditor,
    fillblank: FillBlankEditor,
    connect: ConnectEditor,
    timeline: TimelineEditor,
    enigma: EnigmaEditor,
    memory: MemoryEditor,
    sort: SortEditor,
};

interface EditorScreenProps {
    game: GameData;
    onUpdate: (g: GameData) => void;
    onBack: () => void;
}

export function EditorScreen({ game, onUpdate, onBack }: EditorScreenProps) {
    const [advOpen, setAdv] = useState(false);

    const EditorComp = EDITORS[game.type];

    const update = (partial: Partial<GameData>) => {
        onUpdate({ ...game, ...partial } as GameData);
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 64, // Height of the navbar
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                overflow: "hidden",
                zIndex: 40,
                background: "#0d0c15",
            }}
        >
            {/* LEFT PANEL: EDITOR */}
            <div
                style={{
                    width: 380,
                    flexShrink: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRight: `1px solid ${T.border}`,
                    zIndex: 10,
                }}
            >
                {/* Sidebar Scroll Area */}
                <div
                    className="custom-scrollbar"
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: 24,
                    }}
                >
                    {/* Back button and title */}
                    <div style={{ marginBottom: 24 }}>
                        <button
                            onClick={onBack}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                color: T.muted,
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontFamily: FB,
                                fontSize: 13,
                                padding: 0,
                                marginBottom: 4,
                            }}
                        >
                            <ArrowLeft size={16} /> Retour
                        </button>
                        <h1
                            style={{
                                fontFamily: FD,
                                fontSize: 18,
                                color: "#fff",
                            }}
                        >
                            {game.title || "Sans titre"}
                        </h1>
                    </div>

                    {EditorComp ? (
                        <EditorComp
                            game={game as any}
                            update={update}
                            advOpen={advOpen}
                            setAdv={setAdv}
                        />
                    ) : (
                        <div
                            style={{
                                padding: 20,
                                textAlign: "center",
                                color: T.red,
                            }}
                        >
                            Éditeur manquant pour {game.type}
                        </div>
                    )}
                </div>

                {/* Sidebar Footer (Save Button) */}
                <div
                    style={{
                        padding: 20,
                        borderTop: `1px solid ${T.border}`,
                        background: T.bg2,
                    }}
                >
                    <Btn
                        style={{ width: "100%", justifyContent: "center" }}
                        onClick={onBack}
                    >
                        <Save size={16} /> Enregistrer & Quitter
                    </Btn>
                </div>
            </div>

            {/* RIGHT PANEL: LIVE PREVIEW */}
            <div
                style={{
                    flex: 1,
                    height: "100%",
                    overflowY: "auto",
                    padding: 40,
                    background: "#020617",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 0,
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        display: "flex",
                        gap: 12,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: T.bg3,
                            padding: "6px 12px",
                            borderRadius: 99,
                            border: `1px solid ${T.border}`,
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: T.green,
                            }}
                        />
                        <span
                            style={{
                                fontFamily: FB,
                                fontSize: 11,
                                color: T.muted,
                            }}
                        >
                            Aperçu en direct
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        width: "100%",
                        maxWidth: 400,
                        perspective: 1000,
                        marginTop: 40,
                    }}
                >
                    <LivePreviewWrapper game={game} />
                </div>
            </div>
        </div>
    );
}
