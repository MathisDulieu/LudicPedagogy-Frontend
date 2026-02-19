import type { TrueFalseData } from "../../../types/game";
import type { EditorProps } from "../types";
import { uid, clamp } from "../utils";
import { T, FD } from "../constants";
import {
    Label,
    Input,
    Textarea,
    Btn,
    Card,
    ImageUploader,
    SkinPicker,
    AdvancedGate,
} from "./Shared";

export function TrueFalseEditor({
    game,
    update,
    advOpen,
    setAdv,
}: EditorProps<TrueFalseData>) {
    const upS = (sid: string, p: Partial<TrueFalseData["statements"][0]>) => {
        update({
            statements: game.statements.map((s) =>
                s.id === sid ? { ...s, ...p } : s,
            ),
        });
    };

    const addS = () => {
        update({
            statements: [
                ...game.statements,
                { id: uid(), text: "", answer: true, explanation: "" },
            ],
        });
    };

    const delS = (sid: string) => {
        update({ statements: game.statements.filter((s) => s.id !== sid) });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingBottom: 100,
            }}
        >
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
                        placeholder="Vrai ou Faux…"
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

            {game.statements.map((s, si) => (
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
                            AFFIRMATION {si + 1}
                        </span>
                        {game.statements.length > 1 && (
                            <Btn
                                variant="danger"
                                small
                                onClick={() => delS(s.id)}
                            >
                                ✕
                            </Btn>
                        )}
                    </div>

                    <div style={{ marginBottom: 10 }}>
                        <Label required>Affirmation</Label>
                        <Textarea
                            value={s.text}
                            rows={2}
                            placeholder="La Terre est ronde…"
                            onChange={(e) =>
                                upS(s.id, { text: e.target.value })
                            }
                        />
                    </div>

                    <div style={{ marginBottom: 10 }}>
                        <Label>Réponse correcte</Label>
                        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                            {[true, false].map((v) => (
                                <button
                                    key={String(v)}
                                    onClick={() => upS(s.id, { answer: v })}
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        borderRadius: 9,
                                        cursor: "pointer",
                                        fontFamily: FD,
                                        fontWeight: 700,
                                        fontSize: 14,
                                        border: `2px solid ${s.answer === v ? (v ? T.green : T.red) : T.border}`,
                                        background:
                                            s.answer === v
                                                ? v
                                                    ? T.greenLo
                                                    : T.redLo
                                                : T.bg3,
                                        color:
                                            s.answer === v
                                                ? v
                                                    ? T.green
                                                    : T.red
                                                : T.muted,
                                        transition: "all .15s",
                                    }}
                                >
                                    {v ? "✓ VRAI" : "✗ FAUX"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label>Explication (affichée après réponse)</Label>
                        <Input
                            value={s.explanation || ""}
                            placeholder="Parce que…"
                            onChange={(e) =>
                                upS(s.id, { explanation: e.target.value })
                            }
                        />
                    </div>
                </Card>
            ))}

            <Btn variant="secondary" onClick={addS}>
                ＋ Ajouter une affirmation
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
