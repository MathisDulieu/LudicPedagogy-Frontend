import type { SortData } from "../../../types/game";
import type { EditorProps } from "../types";
import { T } from "../constants";
import { uid } from "../utils";
import { Input, Btn, SectionTitle } from "./Shared";
import { Trash2 } from "lucide-react";

export function SortEditor({ game, update }: EditorProps<SortData>) {
    const addItem = () => {
        update({
            items: [
                ...game.items,
                { id: uid(), label: "", value: game.items.length + 1 },
            ],
        });
    };

    const upItem = (
        id: string,
        f: keyof SortData["items"][0],
        v: string | number,
    ) => {
        // Cast value to match specific field type (string or number)
        update({
            items: game.items.map((i) => (i.id === id ? { ...i, [f]: v } : i)),
        });
    };

    const delItem = (id: string) => {
        update({ items: game.items.filter((i) => i.id !== id) });
    };

    return (
        <div className="fade-up" style={{ paddingBottom: 100 }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 20,
                }}
            >
                <div>
                    <label
                        style={{
                            fontSize: 11,
                            color: T.muted,
                            marginBottom: 4,
                            display: "block",
                        }}
                    >
                        Label Haut (Min)
                    </label>
                    <Input
                        placeholder="Ex: Plus petit"
                        value={game.minLabel || ""}
                        onChange={(e) => update({ minLabel: e.target.value })}
                        style={{ marginBottom: 0 }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            fontSize: 11,
                            color: T.muted,
                            marginBottom: 4,
                            display: "block",
                        }}
                    >
                        Label Bas (Max)
                    </label>
                    <Input
                        placeholder="Ex: Plus grand"
                        value={game.maxLabel || ""}
                        onChange={(e) => update({ maxLabel: e.target.value })}
                        style={{ marginBottom: 0 }}
                    />
                </div>
            </div>

            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <SectionTitle emoji="🔃" title="Éléments à trier" />
                <Btn variant="ghost" small onClick={addItem}>
                    ＋ Ajouter
                </Btn>
            </div>

            <p style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>
                Définissez l'ordre correct (Valeur 1 = Premier). Le joueur devra
                reconstruire cet ordre.
            </p>

            <div style={{ display: "grid", gap: 10 }}>
                {game.items.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                background: T.accentLo,
                                color: T.accent,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: 700,
                                fontSize: 12,
                            }}
                        >
                            {item.value}
                        </div>

                        <Input
                            placeholder="Libellé"
                            value={item.label}
                            onChange={(e) =>
                                upItem(item.id, "label", e.target.value)
                            }
                            style={{ marginBottom: 0 }}
                        />

                        <Input
                            type="number"
                            placeholder="Ordre"
                            value={item.value}
                            onChange={(e) =>
                                upItem(
                                    item.id,
                                    "value",
                                    parseInt(e.target.value) || 0,
                                )
                            }
                            style={{ width: 60, marginBottom: 0 }}
                        />

                        <Btn variant="ghost" onClick={() => delItem(item.id)}>
                            <Trash2 size={16} />
                        </Btn>
                    </div>
                ))}
            </div>
        </div>
    );
}
