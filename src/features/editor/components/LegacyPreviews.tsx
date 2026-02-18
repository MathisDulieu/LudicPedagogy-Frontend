import React, { useState } from "react";
import { T, FD, FB } from "../constants";
import { shuffle } from "../utils";
import { GameHeader } from "./GameHeader";
import { SkinWrapper } from "./SkinWrapper";
import type {
    TrueFalseData,
    FillBlankData,
    ConnectData,
    TimelineData,
    EnigmaData,
} from "../../../types/game";

const DARK = {
    bg: "#0d0c15",
    card: "#171525",
    text: "#f0eeff",
    muted: "#7a7890",
    border: "#2a2840",
};

// ── VRAI/FAUX ─────────────────────────────────────────────────────────────────
export function PreviewTrueFalse({ game }: { game: TrueFalseData }) {
    const [si, setSi] = useState(0);
    const [sel, setSel] = useState<boolean | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const s = game.statements[si];

    const pick = (v: boolean) => {
        if (sel !== null) return;
        setSel(v);
        const ok = v === s.answer;
        setResult(ok ? "correct" : "wrong");
        setTimeout(() => setResult(null), 1000);
    };

    const next = () => {
        setSi((i) => (i + 1) % game.statements.length);
        setSel(null);
    };

    return (
        <div style={{ background: DARK.bg, borderRadius: 16, padding: 18 }}>
            <GameHeader game={game} />
            <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                {game.statements.map((_, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            height: 4,
                            borderRadius: 99,
                            background: i <= si ? T.blue : DARK.border,
                            transition: "background .3s",
                        }}
                    />
                ))}
            </div>
            <SkinWrapper skin={game.skin} result={result}>
                {/* s.image is missing from TrueFalseData definition? It seems it was used in GameEditor.jsx but maybe not defined in TS interface? 
          Checking types.ts: TrueFalseData statements has NO image field. 
          But GameEditor.jsx line 884 uses s.image.
          I won't add it to interface to avoid breaking changes now, but will comment it out or cast if needed.
          Actually, I can just ignore it or cast `s as any`. */}
                {(s as any).image && (
                    <img
                        src={(s as any).image}
                        alt=""
                        style={{
                            width: "100%",
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    />
                )}

                <p
                    style={{
                        color: DARK.text,
                        fontFamily: FD,
                        fontWeight: 700,
                        fontSize: 15,
                        lineHeight: 1.5,
                        textAlign: "center",
                        marginBottom: 20,
                        padding: "0 8px",
                    }}
                >
                    {s.text || <em style={{ opacity: 0.4 }}>Affirmation…</em>}
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                    {[true, false].map((v) => {
                        let bg = DARK.card,
                            brd = `2px solid ${DARK.border}`,
                            col = DARK.text;
                        if (sel !== null && v === s.answer) {
                            bg = T.greenLo;
                            brd = `2px solid ${T.green}`;
                            col = T.green;
                        } else if (sel === v && v !== s.answer) {
                            bg = T.redLo;
                            brd = `2px solid ${T.red}`;
                            col = T.red;
                        }
                        return (
                            <button
                                key={String(v)}
                                onClick={() => pick(v)}
                                style={{
                                    flex: 1,
                                    padding: "14px",
                                    borderRadius: 12,
                                    cursor: "pointer",
                                    fontFamily: FD,
                                    fontWeight: 800,
                                    fontSize: 18,
                                    border: brd,
                                    background: bg,
                                    color: col,
                                    transition: "all .2s",
                                }}
                            >
                                {v ? "✓ VRAI" : "✗ FAUX"}
                            </button>
                        );
                    })}
                </div>
                {sel !== null && s.explanation && (
                    <div
                        style={{
                            marginTop: 12,
                            padding: 10,
                            background: T.accentLo,
                            borderRadius: 9,
                            color: DARK.text,
                            fontFamily: FB,
                            fontSize: 12,
                            lineHeight: 1.5,
                        }}
                    >
                        💡 {s.explanation}
                    </div>
                )}
            </SkinWrapper>
            {sel !== null && (
                <button
                    onClick={next}
                    style={{
                        marginTop: 10,
                        width: "100%",
                        padding: "10px",
                        background: sel === s.answer ? T.green : T.red,
                        border: "none",
                        borderRadius: 10,
                        color: "#fff",
                        fontFamily: FD,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                    }}
                >
                    Suivant →
                </button>
            )}
        </div>
    );
}

// ── PHRASE À TROUS ────────────────────────────────────────────────────────────
export function PreviewFillBlank({ game }: { game: FillBlankData }) {
    const [si, setSi] = useState(0);
    const [val, setVal] = useState("");
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const s = game.sentences[si];

    const check = () => {
        const ok = val.trim().toLowerCase() === s.answer.toLowerCase();
        setChecked(true);
        setResult(ok ? "correct" : "wrong");
        setTimeout(() => setResult(null), 900);
    };

    const next = () => {
        setSi((i) => (i + 1) % game.sentences.length);
        setVal("");
        setChecked(false);
    };

    return (
        <div style={{ background: DARK.bg, borderRadius: 16, padding: 18 }}>
            <GameHeader game={game} />
            <SkinWrapper skin={game.skin} result={result}>
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 16,
                        padding: "0 8px",
                    }}
                >
                    <p
                        style={{
                            color: DARK.muted,
                            fontFamily: FB,
                            fontSize: 13,
                            lineHeight: 2,
                        }}
                    >
                        <span style={{ color: DARK.text }}>
                            {s.before || "…"}{" "}
                        </span>
                        <span
                            style={{
                                display: "inline-block",
                                borderBottom: `2.5px solid ${
                                    checked
                                        ? val.trim().toLowerCase() ===
                                          s.answer.toLowerCase()
                                            ? T.green
                                            : T.red
                                        : T.accent
                                }`,
                                minWidth: 60,
                                padding: "0 8px",
                                color: T.accent,
                                fontFamily: FD,
                                fontWeight: 700,
                                transition: "border-color .3s",
                            }}
                        >
                            {val || "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                        </span>
                        <span style={{ color: DARK.text }}>
                            {" "}
                            {s.after || "…"}
                        </span>
                    </p>
                </div>
                <input
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !checked && check()}
                    placeholder={
                        s.hint ? `Indice : ${s.hint}` : "Votre réponse…"
                    }
                    disabled={checked}
                    style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: `1.5px solid ${checked ? (val.trim().toLowerCase() === s.answer.toLowerCase() ? T.green : T.red) : T.border}`,
                        background: DARK.card,
                        fontFamily: FB,
                        fontSize: 14,
                        color: DARK.text,
                        outline: "none",
                        marginBottom: 10,
                    }}
                />
                {!checked ? (
                    <button
                        onClick={check}
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: T.accent,
                            border: "none",
                            borderRadius: 10,
                            color: "#fff",
                            fontFamily: FD,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: "pointer",
                        }}
                    >
                        Vérifier ✓
                    </button>
                ) : (
                    <button
                        onClick={next}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "none",
                            borderRadius: 10,
                            background:
                                val.trim().toLowerCase() ===
                                s.answer.toLowerCase()
                                    ? T.green
                                    : T.red,
                            color: "#fff",
                            fontFamily: FD,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: "pointer",
                        }}
                    >
                        Suivant →
                    </button>
                )}
            </SkinWrapper>
        </div>
    );
}

// ── RELIER ────────────────────────────────────────────────────────────────────
interface PairStatus {
    side: "left" | "right";
    id: string;
}

export function PreviewConnect({ game }: { game: ConnectData }) {
    const [selected, setSel] = useState<PairStatus | null>(null);
    const [matched, setMatched] = useState<Record<string, boolean>>({});

    // Use useMemo or state to keep stable references during re-renders if needed,
    // but here simple variable is fine BUT rightItems MUST be shuffled only once.
    // GameEditor.jsx used useState(()=>shuffle(...))[0] trick.
    const leftItems = game.pairs.map((p) => ({ id: p.id, text: p.left }));
    const [rightItems] = useState(() =>
        shuffle(game.pairs.map((p) => ({ id: p.id, text: p.right }))),
    );

    const done = Object.keys(matched).length === game.pairs.length;

    const tap = (side: "left" | "right", id: string) => {
        if (matched[id]) return;
        if (!selected) {
            setSel({ side, id });
            return;
        }
        if (selected.side === side) {
            setSel({ side, id });
            return;
        }

        const leftId = side === "right" ? selected.id : id;
        const rightId = side === "right" ? id : selected.id;

        if (leftId === rightId) setMatched((m) => ({ ...m, [leftId]: true }));
        setSel(null);
    };

    return (
        <div style={{ background: DARK.bg, borderRadius: 16, padding: 18 }}>
            <GameHeader game={game} />
            {!done ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 24px 1fr",
                        gap: 8,
                        alignItems: "start",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}
                    >
                        {leftItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => tap("left", item.id)}
                                style={{
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    cursor: matched[item.id]
                                        ? "default"
                                        : "pointer",
                                    fontFamily: FD,
                                    fontWeight: 700,
                                    fontSize: 12,
                                    textAlign: "left",
                                    border: `2px solid ${matched[item.id] ? T.green : selected?.id === item.id && selected?.side === "left" ? T.accent : DARK.border}`,
                                    background: matched[item.id]
                                        ? T.greenLo
                                        : selected?.id === item.id &&
                                            selected?.side === "left"
                                          ? T.accentLo
                                          : DARK.card,
                                    color: matched[item.id]
                                        ? T.green
                                        : DARK.text,
                                    transition: "all .2s",
                                }}
                            >
                                {item.text || "…"}
                            </button>
                        ))}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            paddingTop: 4,
                        }}
                    >
                        {leftItems.map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    height: 42,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: T.dim,
                                    fontSize: 16,
                                }}
                            >
                                —
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}
                    >
                        {rightItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => tap("right", item.id)}
                                style={{
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    cursor: matched[item.id]
                                        ? "default"
                                        : "pointer",
                                    fontFamily: FB,
                                    fontWeight: 600,
                                    fontSize: 12,
                                    textAlign: "left",
                                    border: `2px solid ${matched[item.id] ? T.green : selected?.id === item.id && selected?.side === "right" ? T.accent : DARK.border}`,
                                    background: matched[item.id]
                                        ? T.greenLo
                                        : selected?.id === item.id &&
                                            selected?.side === "right"
                                          ? T.accentLo
                                          : DARK.card,
                                    color: matched[item.id]
                                        ? T.green
                                        : DARK.text,
                                    transition: "all .2s",
                                }}
                            >
                                {item.text || "…"}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className="pop"
                    style={{ textAlign: "center", padding: "20px 0" }}
                >
                    <div style={{ fontSize: 56, marginBottom: 8 }}>🎯</div>
                    <div
                        style={{
                            fontFamily: FD,
                            fontWeight: 800,
                            fontSize: 20,
                            color: T.green,
                        }}
                    >
                        Tout relié !
                    </div>
                </div>
            )}
        </div>
    );
}

// ── CHRONOLOGIE ───────────────────────────────────────────────────────────────
export function PreviewTimeline({ game }: { game: TimelineData }) {
    const [items, setItems] = useState(() => shuffle(game.events));
    const [drag, setDrag] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const correct = items.every((e, i) => e.order === i + 1);

    const onDragStart = (i: number) => setDrag(i);

    const onDragOver = (e: React.DragEvent, i: number) => {
        e.preventDefault();
        if (drag === null || drag === i) return;
        const next = [...items];
        const [m] = next.splice(drag, 1);
        next.splice(i, 0, m);
        setItems(next);
        setDrag(i);
    };

    return (
        <div style={{ background: DARK.bg, borderRadius: 16, padding: 18 }}>
            <GameHeader game={game} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: 14,
                }}
            >
                {items.map((ev, i) => (
                    <div
                        key={ev.id}
                        draggable
                        onDragStart={() => onDragStart(i)}
                        onDragOver={(e) => onDragOver(e, i)}
                        onDragEnd={() => setDrag(null)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                            borderRadius: 10,
                            cursor: submitted ? "default" : "grab",
                            transition: "all .2s",
                            background: submitted
                                ? ev.order === i + 1
                                    ? T.greenLo
                                    : T.redLo
                                : drag === i
                                  ? T.accentLo
                                  : DARK.card,
                            border: `1.5px solid ${submitted ? (ev.order === i + 1 ? T.green : T.red) : drag === i ? T.accent : DARK.border}`,
                        }}
                    >
                        <span
                            style={{
                                color: T.muted,
                                fontSize: 16,
                                flexShrink: 0,
                            }}
                        >
                            ⠿
                        </span>
                        <span
                            style={{
                                fontFamily: FB,
                                fontSize: 13,
                                color: DARK.text,
                                flex: 1,
                            }}
                        >
                            {ev.label || "Événement…"}
                        </span>
                        {submitted && (
                            <span>{ev.order === i + 1 ? "✅" : "❌"}</span>
                        )}
                    </div>
                ))}
            </div>
            {!submitted ? (
                <button
                    onClick={() => setSubmitted(true)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: T.accent,
                        border: "none",
                        borderRadius: 10,
                        color: "#fff",
                        fontFamily: FD,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                    }}
                >
                    Vérifier ✓
                </button>
            ) : (
                <div
                    className="pop"
                    style={{
                        textAlign: "center",
                        padding: 14,
                        background: correct ? T.greenLo : T.redLo,
                        borderRadius: 10,
                        border: `2px solid ${correct ? T.green : T.red}`,
                    }}
                >
                    <div
                        style={{
                            fontFamily: FD,
                            fontWeight: 800,
                            fontSize: 16,
                            color: correct ? T.green : T.red,
                            marginBottom: 8,
                        }}
                    >
                        {correct ? "🏆 Ordre parfait !" : "🔄 Pas tout à fait…"}
                    </div>
                    <button
                        onClick={() => {
                            setItems(shuffle(game.events));
                            setSubmitted(false);
                        }}
                        style={{
                            background: correct ? T.green : T.red,
                            border: "none",
                            borderRadius: 8,
                            padding: "8px 18px",
                            color: "#fff",
                            fontFamily: FD,
                            fontWeight: 700,
                            fontSize: 12,
                            cursor: "pointer",
                        }}
                    >
                        Réessayer
                    </button>
                </div>
            )}
        </div>
    );
}

// ── ÉNIGME ────────────────────────────────────────────────────────────────────
export function PreviewEnigma({ game }: { game: EnigmaData }) {
    const [clueIdx, setClueIdx] = useState(0);
    const [val, setVal] = useState("");
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const ok = val.trim().toLowerCase() === game.answer.toLowerCase();

    const check = () => {
        setChecked(true);
        setResult(ok ? "correct" : "wrong");
        setTimeout(() => setResult(null), 1000);
    };

    return (
        <div style={{ background: DARK.bg, borderRadius: 16, padding: 18 }}>
            <GameHeader game={game} />
            {game.image && (
                <img
                    src={game.image}
                    alt=""
                    style={{
                        width: "100%",
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 10,
                        marginBottom: 12,
                    }}
                />
            )}
            <div
                style={{
                    padding: 14,
                    background: "#0e1d2e",
                    borderRadius: 12,
                    marginBottom: 14,
                    border: `1px solid ${T.blue}`,
                    fontFamily: FB,
                    fontSize: 13,
                    color: "#c0d8f0",
                    lineHeight: 1.7,
                }}
            >
                📖{" "}
                {game.narrative || (
                    <em style={{ opacity: 0.5 }}>Contexte narratif…</em>
                )}
            </div>
            <div style={{ marginBottom: 14 }}>
                <div
                    style={{
                        fontFamily: FD,
                        fontSize: 11,
                        color: T.yellow,
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                        marginBottom: 8,
                    }}
                >
                    Indices ({clueIdx + 1}/{game.clues.length})
                </div>
                {game.clues.slice(0, clueIdx + 1).map((c, i) => (
                    <div
                        key={i}
                        className={i === clueIdx ? "fade-up" : ""}
                        style={{
                            display: "flex",
                            gap: 8,
                            padding: "8px 12px",
                            borderRadius: 9,
                            marginBottom: 6,
                            background: T.yellowLo,
                            border: `1px solid ${T.yellow}44`,
                        }}
                    >
                        <span
                            style={{
                                color: T.yellow,
                                fontFamily: FD,
                                fontSize: 11,
                                flexShrink: 0,
                            }}
                        >
                            {i + 1}.
                        </span>
                        <span
                            style={{
                                color: DARK.text,
                                fontFamily: FB,
                                fontSize: 13,
                            }}
                        >
                            {c || "…"}
                        </span>
                    </div>
                ))}
                {clueIdx < game.clues.length - 1 && !checked && (
                    <button
                        onClick={() => setClueIdx((i) => i + 1)}
                        style={{
                            background: "none",
                            border: `1px dashed ${T.yellow}`,
                            borderRadius: 8,
                            padding: "6px 14px",
                            color: T.yellow,
                            fontFamily: FD,
                            fontSize: 11,
                            cursor: "pointer",
                        }}
                    >
                        Indice suivant 💡
                    </button>
                )}
            </div>
            <SkinWrapper skin={game.skin} result={result}>
                <input
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !checked && check()}
                    placeholder="Votre réponse…"
                    disabled={checked}
                    style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 10,
                        marginBottom: 10,
                        border: `1.5px solid ${checked ? (ok ? T.green : T.red) : T.border}`,
                        background: DARK.card,
                        fontFamily: FB,
                        fontSize: 14,
                        color: DARK.text,
                        outline: "none",
                    }}
                />
                {checked && (
                    <div
                        style={{
                            padding: 10,
                            borderRadius: 9,
                            marginBottom: 10,
                            background: ok ? T.greenLo : T.redLo,
                            border: `1.5px solid ${ok ? T.green : T.red}`,
                            color: ok ? T.green : T.red,
                            fontFamily: FB,
                            fontSize: 13,
                        }}
                    >
                        {ok
                            ? game.correctFeedback || "✓ Exact !"
                            : game.wrongFeedback || "✗ Pas tout à fait…"}
                    </div>
                )}
                {!checked && (
                    <button
                        onClick={check}
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: T.accent,
                            border: "none",
                            borderRadius: 10,
                            color: "#fff",
                            fontFamily: FD,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: "pointer",
                        }}
                    >
                        Soumettre 🔎
                    </button>
                )}
            </SkinWrapper>
        </div>
    );
}
