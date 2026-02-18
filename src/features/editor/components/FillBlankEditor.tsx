import type { FillBlankData } from "../../../types/game";
import type { EditorProps } from "../types";
import { uid, clamp } from "../utils";
import { T, FB, FD } from "../constants";
import {
    Label,
    Input,
    Btn,
    Card,
    ImageUploader,
    SkinPicker,
    AdvancedGate,
} from "./Shared";

export function FillBlankEditor({
    game,
    update,
    advOpen,
    setAdv,
}: EditorProps<FillBlankData>) {
    const upS = (sid: string, p: Partial<FillBlankData["sentences"][0]>) => {
        update({
            sentences: game.sentences.map((s) =>
                s.id === sid ? { ...s, ...p } : s,
            ),
        });
    };

    const addS = () => {
        update({
            sentences: [
                ...game.sentences,
                { id: uid(), before: "", answer: "", after: "", hint: "" },
            ],
        });
    };

    const delS = (sid: string) => {
        update({ sentences: game.sentences.filter((s) => s.id !== sid) });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                }}
            >
                <div>
                    <Label>Titre</Label>
                    <Input
                        value={game.title}
                        onChange={(e) => update({ title: e.target.value })}
                        placeholder="Phrase à trous…"
                    />
                </div>
                <SkinPicker
                    value={game.skin}
                    onChange={(v) => update({ skin: v })}
                />
            </div>
            <ImageUploader
                value={game.image}
                onChange={(v) => update({ image: v })}
            />

            {game.sentences.map((s, si) => (
                <Card key={s.id} className="fade-up">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 12,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: FD,
                                fontSize: 11,
                                color: T.muted,
                            }}
                        >
                            PHRASE {si + 1}
                        </span>
                        {game.sentences.length > 1 && (
                            <Btn
                                variant="danger"
                                small
                                onClick={() => delS(s.id)}
                            >
                                ✕
                            </Btn>
                        )}
                    </div>

                    <div
                        style={{
                            padding: 12,
                            background: T.bg3,
                            borderRadius: 9,
                            marginBottom: 12,
                            fontFamily: FB,
                            fontSize: 13,
                            color: T.text,
                            lineHeight: 1.8,
                            border: `1px solid ${T.border}`,
                        }}
                    >
                        <span style={{ opacity: 0.7 }}>
                            {s.before || "Début de phrase…"}{" "}
                        </span>
                        <span
                            style={{
                                background: T.accentLo,
                                border: `1.5px solid ${T.accent}`,
                                borderRadius: 6,
                                padding: "2px 8px",
                                color: T.accent,
                                fontWeight: 700,
                            }}
                        >
                            {s.answer || "___"}
                        </span>
                        <span style={{ opacity: 0.7 }}>
                            {" "}
                            {s.after || "…fin de phrase"}
                        </span>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10,
                            marginBottom: 10,
                        }}
                    >
                        <div>
                            <Label>Texte AVANT le trou</Label>
                            <Input
                                value={s.before}
                                placeholder="L'eau bout à…"
                                onChange={(e) =>
                                    upS(s.id, { before: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label>Texte APRÈS le trou</Label>
                            <Input
                                value={s.after}
                                placeholder="…degrés Celsius."
                                onChange={(e) =>
                                    upS(s.id, { after: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10,
                        }}
                    >
                        <div>
                            <Label required>Réponse correcte</Label>
                            <Input
                                value={s.answer}
                                placeholder="100"
                                onChange={(e) =>
                                    upS(s.id, { answer: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label>Indice (optionnel)</Label>
                            <Input
                                value={s.hint || ""}
                                placeholder="C'est un nombre…"
                                onChange={(e) =>
                                    upS(s.id, { hint: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </Card>
            ))}

            <Btn variant="secondary" onClick={addS}>
                ＋ Ajouter une phrase
            </Btn>

            <AdvancedGate
                open={!!advOpen}
                onToggle={() => setAdv && setAdv((o) => !o)}
            >
                <div>
                    <Label>XP par bonne réponse</Label>
                    <Input
                        type="number"
                        value={game.xpCorrect || 0}
                        style={{ width: 90 }}
                        onChange={(e) =>
                            update({
                                xpCorrect: clamp(+e.target.value, 0, 999),
                            })
                        }
                    />
                </div>
            </AdvancedGate>
        </div>
    );
}
