import type { TimelineData } from "../../../types/game";
import type { EditorProps } from "../types";
import { uid, clamp } from "../utils";
import { T, FB, FD } from "../constants";
import {
    Label,
    Input,
    Btn,
    ImageUploader,
    SkinPicker,
    AdvancedGate,
} from "./Shared";

export function TimelineEditor({
    game,
    update,
    advOpen,
    setAdv,
}: EditorProps<TimelineData>) {
    const upE = (eid: string, p: Partial<TimelineData["events"][0]>) => {
        update({
            events: game.events.map((e) => (e.id === eid ? { ...e, ...p } : e)),
        });
    };

    const addE = () => {
        const n = game.events.length + 1;
        update({
            events: [...game.events, { id: uid(), label: "", order: n }],
        });
    };

    const delE = (eid: string) => {
        update({ events: game.events.filter((e) => e.id !== eid) });
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
                        placeholder="Chronologie…"
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

            <div
                style={{
                    padding: 12,
                    background: T.accentLo,
                    borderRadius: 9,
                    fontFamily: FB,
                    fontSize: 12,
                    color: T.muted,
                    lineHeight: 1.6,
                }}
            >
                💡 Saisissez les événements dans leur{" "}
                <strong style={{ color: T.text }}>
                    ordre chronologique correct
                </strong>
                . Le jeu les mélangera automatiquement.
            </div>

            {game.events.map((e, ei) => (
                <div
                    key={e.id}
                    style={{ display: "flex", gap: 10, alignItems: "center" }}
                >
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: T.accentLo,
                            border: `2px solid ${T.accent}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: FD,
                            fontSize: 11,
                            color: T.accent,
                            flexShrink: 0,
                        }}
                    >
                        {ei + 1}
                    </div>
                    <Input
                        value={e.label}
                        placeholder={`Événement ${ei + 1}…`}
                        onChange={(ev) =>
                            upE(e.id, { label: ev.target.value, order: ei + 1 })
                        }
                    />
                    {game.events.length > 2 && (
                        <button
                            onClick={() => delE(e.id)}
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

            <Btn variant="secondary" onClick={addE}>
                ＋ Ajouter un événement
            </Btn>

            <AdvancedGate
                open={!!advOpen}
                onToggle={() => setAdv && setAdv((o) => !o)}
            >
                <div>
                    <Label>XP (ordre parfait)</Label>
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
