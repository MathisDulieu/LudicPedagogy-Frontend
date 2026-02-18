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
            className="fade-up"
            style={{
                height: "100vh",
                display: "grid",
                gridTemplateColumns: "380px 1fr",
                overflow: "hidden",
            }}
        >
            {/* LEFT PANEL: EDITOR */}
            <div
                style={{
                    background: T.bg2,
                    borderRight: `1px solid ${T.border}`,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        padding: "16px 20px",
                        borderBottom: `1px solid ${T.border}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <button
                        onClick={onBack}
                        style={{
                            background: "none",
                            border: "none",
                            color: T.muted,
                            cursor: "pointer",
                            padding: 4,
                        }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <span
                        style={{
                            fontFamily: FD,
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        Éditeur
                    </span>
                    <div
                        style={{
                            marginLeft: "auto",
                            fontSize: 11,
                            color: T.dim,
                            fontFamily: FB,
                            background: T.bg3,
                            padding: "4px 8px",
                            borderRadius: 6,
                        }}
                    >
                        Auto-save
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
                    {EditorComp ? (
                        <EditorComp
                            game={game}
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

                <div
                    style={{
                        padding: 20,
                        borderTop: `1px solid ${T.border}`,
                        background: T.bg2,
                    }}
                >
                    <Btn style={{ width: "100%", justifyContent: "center" }}>
                        <Save size={16} /> Enregistrer
                    </Btn>
                </div>
            </div>

            {/* RIGHT PANEL: PREVIEW */}
            <div
                style={{
                    background: T.bg,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 40,
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
                    style={{ width: "100%", maxWidth: 400, perspective: 1000 }}
                >
                    <LivePreviewWrapper game={game} />
                </div>
            </div>
        </div>
    );
}
