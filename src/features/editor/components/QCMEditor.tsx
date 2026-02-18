import type { QCMData } from "../../../types/game";
import type { EditorProps } from "../types";
import { uid } from "../utils";
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
    Toggle,
    AnswerBtn,
} from "./Shared";
import { clamp } from "../utils"; // Import clamp from utils

export function QCMEditor({
    game,
    update,
    advOpen,
    setAdv,
}: EditorProps<QCMData>) {
    const upQ = (qid: string, p: Partial<QCMData["questions"][0]>) => {
        update({
            questions: game.questions.map((q) =>
                q.id === qid ? { ...q, ...p } : q,
            ),
        });
    };

    const addQ = () => {
        update({
            questions: [
                ...game.questions,
                {
                    id: uid(),
                    q: "",
                    image: null,
                    choices: ["", "", "", ""],
                    answer: "",
                },
            ],
        });
    };

    const delQ = (qid: string) => {
        update({ questions: game.questions.filter((q) => q.id !== qid) });
    };

    const addC = (qid: string) => {
        const q = game.questions.find((q) => q.id === qid);
        if (!q || q.choices.length >= 6) return;
        upQ(qid, { choices: [...q.choices, ""] });
    };

    const delC = (qid: string, i: number) => {
        const q = game.questions.find((q) => q.id === qid);
        if (!q) return;
        const choices = q.choices.filter((_, j) => j !== i);
        // Update answer if the deleted choice was the answer, or if answer becomes invalid
        const newAnswer =
            q.choices[i] === q.answer ? (choices[0] ?? "") : q.answer;
        upQ(qid, { choices, answer: newAnswer });
    };

    const upC = (qid: string, i: number, v: string) => {
        const q = game.questions.find((q) => q.id === qid);
        if (!q) return;
        const choices = q.choices.map((c, j) => (j === i ? v : c));
        const newAnswer = q.choices[i] === q.answer ? v : q.answer;
        upQ(qid, { choices, answer: newAnswer });
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
                        placeholder="Titre du quiz…"
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
                label="Image d'en-tête (optionnel)"
            />

            {game.questions.map((q, qi) => (
                <Card key={q.id} className="fade-up">
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
                            QUESTION {qi + 1}
                        </span>
                        {game.questions.length > 1 && (
                            <Btn
                                variant="danger"
                                small
                                onClick={() => delQ(q.id)}
                            >
                                ✕
                            </Btn>
                        )}
                    </div>

                    <div style={{ marginBottom: 10 }}>
                        <Label required>Énoncé</Label>
                        <Textarea
                            value={q.q}
                            rows={2}
                            placeholder="Posez votre question…"
                            onChange={(e) => upQ(q.id, { q: e.target.value })}
                        />
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <ImageUploader
                            value={q.image}
                            onChange={(v) => upQ(q.id, { image: v })}
                            label="Image liée à la question"
                        />
                    </div>

                    <Label required>
                        Choix{" "}
                        <span
                            style={{
                                fontWeight: 400,
                                color: T.muted,
                                textTransform: "none",
                            }}
                        >
                            (✓ = bonne réponse)
                        </span>
                    </Label>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 7,
                            marginTop: 6,
                        }}
                    >
                        {q.choices.map((c, ci) => (
                            <div
                                key={ci}
                                style={{
                                    display: "flex",
                                    gap: 8,
                                    alignItems: "center",
                                }}
                            >
                                <AnswerBtn
                                    active={q.answer === c && c !== ""}
                                    onClick={() => upQ(q.id, { answer: c })}
                                />
                                <Input
                                    value={c}
                                    placeholder={`Choix ${ci + 1}…`}
                                    onChange={(e) =>
                                        upC(q.id, ci, e.target.value)
                                    }
                                    style={{
                                        border:
                                            q.answer === c && c !== ""
                                                ? `1.5px solid ${T.green}`
                                                : undefined,
                                        background:
                                            q.answer === c && c !== ""
                                                ? T.greenLo
                                                : undefined,
                                    }}
                                />
                                {q.choices.length > 2 && (
                                    <button
                                        onClick={() => delC(q.id, ci)}
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

                    {q.choices.length < 6 && (
                        <Btn
                            variant="ghost"
                            small
                            style={{ marginTop: 8 }}
                            onClick={() => addC(q.id)}
                        >
                            + choix
                        </Btn>
                    )}
                </Card>
            ))}

            <Btn variant="secondary" onClick={addQ}>
                ＋ Ajouter une question
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
                    <Toggle
                        value={!!game.showProgress}
                        onChange={(v) => update({ showProgress: v })}
                        label="Barre de progression"
                    />
                    <Toggle
                        value={!!game.shuffleChoices}
                        onChange={(v) => update({ shuffleChoices: v })}
                        label="Mélanger les choix"
                    />
                </div>
            </AdvancedGate>
        </div>
    );
}
