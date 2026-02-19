import type { MemoryData } from "../../../types/game";
import type { EditorProps } from "../types";
import { T } from "../constants";
import { uid } from "../utils";
import { Input, Btn, SectionTitle } from "./Shared";

export function MemoryEditor({ game, update }: EditorProps<MemoryData>) {
    const addPair = () => {
        update({ pairs: [...game.pairs, { id: uid(), left: "", right: "" }] });
    };

    const upPair = (id: string, f: keyof MemoryData["pairs"][0], v: string) => {
        update({
            pairs: game.pairs.map((p) => (p.id === id ? { ...p, [f]: v } : p)),
        });
    };

    const delPair = (id: string) => {
        if (game.pairs.length > 1) {
            update({ pairs: game.pairs.filter((p) => p.id !== id) });
        }
    };

    return (
        <div className="fade-up" style={{ paddingBottom: 100 }}>
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <SectionTitle emoji="🃏" title="Paires de cartes" />
                <Btn variant="ghost" small onClick={addPair}>
                    ＋ Ajouter
                </Btn>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
                {game.pairs.map((p, i) => (
                    <div
                        key={p.id}
                        style={{
                            background: T.bg2,
                            padding: 12,
                            borderRadius: 10,
                            border: `1px solid ${T.border}`,
                        }}
                    >
                        <div
                            style={{
                                marginBottom: 8,
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: 12,
                                color: T.muted,
                            }}
                        >
                            <span>Paire #{i + 1}</span>
                            <button
                                onClick={() => delPair(p.id)}
                                style={{
                                    color: T.red,
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 8,
                            }}
                        >
                            <Input
                                placeholder="Verso 1 (Texte/Emoji)"
                                value={p.left}
                                onChange={(e) =>
                                    upPair(p.id, "left", e.target.value)
                                }
                                style={{ marginBottom: 0 }}
                            />
                            <Input
                                placeholder="Verso 2 (Texte/Emoji)"
                                value={p.right}
                                onChange={(e) =>
                                    upPair(p.id, "right", e.target.value)
                                }
                                style={{ marginBottom: 0 }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
