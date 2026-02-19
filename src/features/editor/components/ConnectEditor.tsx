import type { ConnectData } from "../../../types/game";
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

export function ConnectEditor({
    game,
    update,
    advOpen,
    setAdv,
}: EditorProps<ConnectData>) {
    const upP = (pid: string, p: Partial<ConnectData["pairs"][0]>) => {
        update({
            pairs: game.pairs.map((x) => (x.id === pid ? { ...x, ...p } : x)),
        });
    };

    const addP = () => {
        update({ pairs: [...game.pairs, { id: uid(), left: "", right: "" }] });
    };

    const delP = (pid: string) => {
        update({ pairs: game.pairs.filter((x) => x.id !== pid) });
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
                        placeholder="Relier…"
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
                    display: "grid",
                    gridTemplateColumns: "1fr 24px 1fr",
                    gap: 8,
                    fontFamily: FD,
                    fontSize: 10,
                    color: T.muted,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    padding: "0 2px",
                    marginBottom: -4,
                }}
            >
                <div>Colonne gauche</div>
                <div />
                <div>Colonne droite</div>
            </div>

            {game.pairs.map((p, pi) => (
                <div
                    key={p.id}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 24px 1fr",
                        gap: 8,
                        alignItems: "center",
                    }}
                >
                    <Input
                        value={p.left}
                        placeholder={`Terme ${pi + 1}…`}
                        onChange={(e) => upP(p.id, { left: e.target.value })}
                    />
                    <div
                        style={{
                            textAlign: "center",
                            color: T.accent,
                            fontSize: 18,
                            fontWeight: 700,
                        }}
                    >
                        ↔
                    </div>
                    <Input
                        value={p.right}
                        placeholder={`Définition ${pi + 1}…`}
                        onChange={(e) => upP(p.id, { right: e.target.value })}
                    />
                    {game.pairs.length > 2 && (
                        <button
                            onClick={() => delP(p.id)}
                            style={{
                                gridColumn: "3",
                                marginTop: -6,
                                background: "none",
                                border: "none",
                                color: T.muted,
                                cursor: "pointer",
                                fontSize: 13,
                                textAlign: "right",
                                fontFamily: FB,
                            }}
                        >
                            ✕ Supprimer
                        </button>
                    )}
                </div>
            ))}

            <Btn variant="secondary" onClick={addP}>
                ＋ Ajouter une paire
            </Btn>

            <AdvancedGate
                open={!!advOpen}
                onToggle={() => setAdv && setAdv((o) => !o)}
            >
                <div>
                    <Label>XP par paire correcte</Label>
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
