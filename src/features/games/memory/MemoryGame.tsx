import { useState, useEffect } from "react";
import type { MemoryData, GameProps } from "../../../types/game";

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export default function MemoryGame({ data, onScore }: GameProps<MemoryData>) {
    const [cards, setCards] = useState<
        {
            uid: number;
            id: string;
            content: string;
            flipped: boolean;
            matched: boolean;
        }[]
    >(() => {
        if (!data || !data.pairs) return [];
        const pairs = data.pairs.flatMap(
            (p: { id: string; left: string; right: string }, i: number) => [
                {
                    uid: i * 2,
                    id: p.id,
                    content: p.left,
                    flipped: false,
                    matched: false,
                },
                {
                    uid: i * 2 + 1,
                    id: p.id,
                    content: p.right,
                    flipped: false,
                    matched: false,
                },
            ],
        );
        return shuffle(pairs);
    });

    const [selected, setSelected] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [locked, setLocked] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!data || !data.pairs) return;
        // Reinstrument if data changes (new game)
        const pairs = data.pairs.flatMap(
            (p: { id: string; left: string; right: string }, i: number) => [
                {
                    uid: i * 2,
                    id: p.id,
                    content: p.left,
                    flipped: false,
                    matched: false,
                },
                {
                    uid: i * 2 + 1,
                    id: p.id,
                    content: p.right,
                    flipped: false,
                    matched: false,
                },
            ],
        );
        setCards(shuffle(pairs));
        setSelected([]);
        setMoves(0);
        setLocked(false);
        setDone(false);
    }, [data]);

    const flip = (uid: number) => {
        if (locked || done) return;
        const card = cards.find((c) => c.uid === uid);
        if (!card || card.flipped || card.matched) return;

        const newCards = cards.map((c) =>
            c.uid === uid ? { ...c, flipped: true } : c,
        );
        const newSelected = [...selected, uid];
        setCards(newCards);
        setSelected(newSelected);

        if (newSelected.length === 2) {
            setMoves((m) => m + 1);
            setLocked(true);
            const [uid1, uid2] = newSelected;
            const card1 = newCards.find((c) => c.uid === uid1)!;
            const card2 = newCards.find((c) => c.uid === uid2)!;

            setTimeout(() => {
                if (card1.id === card2.id) {
                    const matchedCards = newCards.map((c) =>
                        c.uid === uid1 || c.uid === uid2
                            ? { ...c, matched: true }
                            : c,
                    );
                    setCards(matchedCards);
                    if (matchedCards.every((c) => c.matched)) {
                        setDone(true);
                        const score = Math.max(
                            0,
                            (data.xpCorrect || 30) - moves * 2,
                        );
                        onScore(score);
                    }
                } else {
                    setCards(
                        newCards.map((c) =>
                            c.uid === uid1 || c.uid === uid2
                                ? { ...c, flipped: false }
                                : c,
                        ),
                    );
                }
                setSelected([]);
                setLocked(false);
            }, 900);
        }
    };

    if (!cards.length) return <div className="text-white">Chargement...</div>;

    return (
        <div className="max-w-md mx-auto p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <div className="text-slate-400 font-medium">
                    🃏 {data.title || "Trouve les paires"}
                </div>
                <div className="text-yellow-500 font-bold">{moves} coups</div>
            </div>

            <div className="grid grid-cols-4 gap-3">
                {cards.map((card) => (
                    <button
                        key={card.uid}
                        onClick={() => flip(card.uid)}
                        className={`
                            aspect-square rounded-xl text-2xl flex items-center justify-center transition-all duration-300
                            ${
                                card.matched
                                    ? "bg-green-900/50 border-2 border-green-500"
                                    : card.flipped
                                      ? "bg-indigo-900/50 border-2 border-indigo-500 rotate-y-180"
                                      : "bg-slate-800 border-2 border-slate-700 hover:border-slate-600"
                            }
                        `}
                    >
                        <div
                            className={
                                card.flipped && !card.matched
                                    ? "[transform:rotateY(180deg)]"
                                    : ""
                            }
                        >
                            {card.flipped || card.matched ? card.content : "❓"}
                        </div>
                    </button>
                ))}
            </div>

            {done && (
                <div className="mt-8 p-6 bg-green-900/20 border border-green-500/50 rounded-xl text-center animate-in zoom-in duration-300">
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="text-xl font-bold text-green-400 mb-2">
                        Parfait en {moves} coups !
                    </div>
                </div>
            )}
        </div>
    );
}
