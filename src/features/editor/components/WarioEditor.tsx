import type { WarioData } from "../../../types/game";
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
    Toggle,
    AnswerBtn,
} from "./Shared";

export function WarioEditor({
    game,
    update,
    advOpen,
    setAdv,
}: EditorProps<WarioData>) {
    const upT = (tid: string, p: Partial<WarioData["tasks"][0]>) => {
        update({
            tasks: game.tasks.map((t) => (t.id === tid ? { ...t, ...p } : t)),
        });
    };

    const addT = () => {
        update({
            tasks: [
                ...game.tasks,
                {
                    id: uid(),
                    instruction: "",
                    options: ["", "", "", ""],
                    answer: "",
                    duration: 4000,
                },
            ],
        });
    };

    const delT = (tid: string) => {
        update({ tasks: game.tasks.filter((t) => t.id !== tid) });
    };

    const addO = (tid: string) => {
        const t = game.tasks.find((t) => t.id === tid);
        if (!t || t.options.length >= 6) return;
        upT(tid, { options: [...t.options, ""] });
    };

    const delO = (tid: string, i: number) => {
        const t = game.tasks.find((t) => t.id === tid);
        if (!t) return;
        const options = t.options.filter((_, j) => j !== i);
        const newAnswer =
            t.options[i] === t.answer ? (options[0] ?? "") : t.answer;
        upT(tid, { options, answer: newAnswer });
    };

    const upO = (tid: string, i: number, v: string) => {
        const t = game.tasks.find((t) => t.id === tid);
        if (!t) return;
        const options = t.options.map((o, j) => (j === i ? v : o));
        const newAnswer = t.options[i] === t.answer ? v : t.answer;
        upT(tid, { options, answer: newAnswer });
    };

    const DURS = [
        [2000, "2s ⚡ Ultra"],
        [3000, "3s 🔥 Rapide"],
        [4000, "4s ⏱ Normal"],
        [6000, "6s 🧠 Réflexion"],
    ] as const;

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
                        placeholder="Micro-Défi…"
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

            {game.tasks.map((t, ti) => (
                <Card key={t.id} className="fade-up">
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
                            MICRO-TÂCHE {ti + 1}
                        </span>
                        {game.tasks.length > 1 && (
                            <Btn
                                variant="danger"
                                small
                                onClick={() => delT(t.id)}
                            >
                                ✕
                            </Btn>
                        )}
                    </div>

                    <div style={{ marginBottom: 10 }}>
                        <Label required>Consigne (courte !)</Label>
                        <Input
                            value={t.instruction}
                            placeholder="Trouve le PAIR !"
                            onChange={(e) =>
                                upT(t.id, { instruction: e.target.value })
                            }
                        />
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <Label>Durée</Label>
                        <select
                            value={t.duration}
                            onChange={(e) =>
                                upT(t.id, { duration: +e.target.value })
                            }
                            style={{
                                padding: "8px 12px",
                                borderRadius: 9,
                                border: `1.5px solid ${T.border}`,
                                background: T.bg3,
                                fontFamily: FB,
                                fontSize: 13,
                                color: T.text,
                                cursor: "pointer",
                                outline: "none",
                            }}
                        >
                            {DURS.map(([v, l]) => (
                                <option key={v} value={v}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Label required>Options</Label>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 7,
                            marginTop: 6,
                        }}
                    >
                        {t.options.map((o, oi) => (
                            <div
                                key={oi}
                                style={{
                                    display: "flex",
                                    gap: 8,
                                    alignItems: "center",
                                }}
                            >
                                <AnswerBtn
                                    active={t.answer === o && o !== ""}
                                    onClick={() => upT(t.id, { answer: o })}
                                />
                                <Input
                                    value={o}
                                    placeholder={`Option ${oi + 1}…`}
                                    onChange={(e) =>
                                        upO(t.id, oi, e.target.value)
                                    }
                                    style={{
                                        border:
                                            t.answer === o && o !== ""
                                                ? `1.5px solid ${T.green}`
                                                : undefined,
                                        background:
                                            t.answer === o && o !== ""
                                                ? T.greenLo
                                                : undefined,
                                    }}
                                />
                                {t.options.length > 2 && (
                                    <button
                                        onClick={() => delO(t.id, oi)}
                                        style={{
                                            width: 26,
                                            height: 26,
                                            border: "none",
                                            background: "none",
                                            color: T.muted,
                                            cursor: "pointer",
                                            fontSize: 16,
                                        }}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {t.options.length < 6 && (
                        <Btn
                            variant="ghost"
                            small
                            style={{ marginTop: 8 }}
                            onClick={() => addO(t.id)}
                        >
                            + option
                        </Btn>
                    )}
                </Card>
            ))}

            <Btn variant="secondary" onClick={addT}>
                ＋ Ajouter une tâche
            </Btn>

            <AdvancedGate
                open={!!advOpen}
                onToggle={() => setAdv && setAdv((o) => !o)}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    <div>
                        <Label>XP par réussite</Label>
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
                    <Toggle
                        value={!!game.shuffleOptions}
                        onChange={(v) => update({ shuffleOptions: v })}
                        label="Mélanger les options"
                    />
                </div>
            </AdvancedGate>
        </div>
    );
}
