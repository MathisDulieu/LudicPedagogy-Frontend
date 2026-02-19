import type { EnigmaData } from "../../../types/game";
import type { EditorProps } from "../types";
import { T, FD } from "../constants";
import { Input, Btn, SectionTitle } from "./Shared";
import { Trash2 } from "lucide-react";

export function EnigmaEditor({ game, update }: EditorProps<EnigmaData>) {
    const upClue = (i: number, v: string) => {
        const c = [...game.clues];
        c[i] = v;
        update({ clues: c });
    };

    const addClue = () => {
        update({ clues: [...game.clues, ""] });
    };

    const delClue = (i: number) => {
        if (game.clues.length > 1) {
            update({ clues: game.clues.filter((_, x) => x !== i) });
        }
    };

    return (
        <div className="fade-up" style={{ paddingBottom: 100 }}>
            <SectionTitle emoji="📝" title="Scénario" />
            <Input
                label="Contexte narratif"
                value={game.narrative}
                onChange={(e) => update({ narrative: e.target.value })}
                textarea
                rows={3}
            />
            <Input
                label="Réponse attendue"
                value={game.answer}
                onChange={(e) => update({ answer: e.target.value })}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginTop: 12,
                }}
            >
                <Input
                    label="Feedback succès"
                    value={game.correctFeedback || ""}
                    onChange={(e) =>
                        update({ correctFeedback: e.target.value })
                    }
                />
                <Input
                    label="Feedback échec"
                    value={game.wrongFeedback || ""}
                    onChange={(e) => update({ wrongFeedback: e.target.value })}
                />
            </div>

            <div
                style={{
                    marginTop: 24,
                    marginBottom: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <SectionTitle emoji="💡" title="Indices progressifs" />
                <Btn variant="ghost" small onClick={addClue}>
                    ＋ Ajouter
                </Btn>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {game.clues.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: 8 }}>
                        <span
                            style={{
                                paddingTop: 10,
                                color: T.dim,
                                fontSize: 12,
                                fontFamily: FD,
                            }}
                        >
                            {i + 1}.
                        </span>
                        <Input
                            value={c}
                            onChange={(e) => upClue(i, e.target.value)}
                            style={{ marginBottom: 0 }}
                        />
                        <Btn variant="ghost" onClick={() => delClue(i)}>
                            <Trash2 size={16} />
                        </Btn>
                    </div>
                ))}
            </div>
        </div>
    );
}
