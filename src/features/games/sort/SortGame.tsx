import { useState } from "react";
import type { SortData, GameProps } from "../../../types/game";

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export default function SortGame({ data, onScore }: GameProps<SortData>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [items, setItems] = useState<
        { id: string; label: string; value: number }[]
    >(() => {
        if (!data || !data.items) return [];
        return shuffle(data.items);
    });
    const [dragIdx, setDragIdx] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);

    const onDragStart = (i: number) => setDragIdx(i);
    const onDragOver = (e: React.DragEvent, i: number) => {
        e.preventDefault();
        if (dragIdx === null || dragIdx === i) return;
        const next = [...items];
        const [moved] = next.splice(dragIdx, 1);
        next.splice(i, 0, moved);
        setItems(next);
        setDragIdx(i);
    };

    const check = () => {
        const isCorrect = items.every((item, i) => item.value === i + 1);
        setCorrect(isCorrect);
        setSubmitted(true);
        if (isCorrect) onScore(data.xpCorrect || 20);
    };

    if (!items.length) return <div className="text-white">Chargement...</div>;

    return (
        <div className="max-w-md mx-auto p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
            <div className="mb-6 bg-slate-800/50 p-4 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-white font-bold text-lg mb-1">
                    🔎 {data.title}
                </h3>
                <p className="text-slate-400 text-sm">
                    Glisse-dépose les éléments dans le bon ordre
                </p>
            </div>

            <div className="flex gap-4">
                {/* Visual indicator (Arrow) */}
                <div className="flex flex-col items-center py-2 shrink-0">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 [writing-mode:vertical-lr] rotate-180">
                        {data.minLabel || "Départ"}
                    </div>
                    <div className="flex-1 w-0.5 bg-slate-700 relative flex items-center justify-center">
                        <div className="absolute top-0 w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_var(--color-primary-500)]" />
                        <div className="absolute bottom-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-slate-700 translate-y-full" />
                        <div className="absolute bottom-[-10px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[8px] border-t-primary-500" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-4 [writing-mode:vertical-lr] rotate-180">
                        {data.maxLabel || "Fin"}
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    {items.map((item, i) => (
                        <div
                            key={item.id}
                            draggable={!submitted}
                            onDragStart={() => onDragStart(i)}
                            onDragOver={(e) => onDragOver(e, i)}
                            onDragEnd={() => setDragIdx(null)}
                            className={`
                            flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200
                            ${
                                submitted
                                    ? correct
                                        ? "bg-green-900/20 border-green-500/50"
                                        : item.value === i + 1
                                          ? "bg-green-900/20 border-green-500/50"
                                          : "bg-red-900/20 border-red-500/50"
                                    : dragIdx === i
                                      ? "bg-slate-800 border-primary-500 z-10 scale-105 shadow-lg"
                                      : "bg-slate-800 border-slate-700 hover:border-slate-600 cursor-grab active:cursor-grabbing"
                            }
                        `}
                        >
                            <span className="text-slate-500 text-xl">⠿</span>
                            <span className="text-2xl">
                                {item.label.split(" ")[0]}
                            </span>
                            <span className="text-slate-200 font-semibold">
                                {item.label.split(" ").slice(1).join(" ")}
                            </span>
                            {submitted && (
                                <span className="ml-auto text-xl">
                                    {item.value === i + 1 ? "✅" : "❌"}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {!submitted ? (
                <button
                    onClick={check}
                    className="w-full mt-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary-900/20"
                >
                    Vérifier ✓
                </button>
            ) : (
                <div
                    className={`mt-6 p-4 rounded-xl text-center border ${correct ? "bg-green-900/20 border-green-500/50 text-green-400" : "bg-red-900/20 border-red-500/50 text-red-400"}`}
                >
                    <div className="font-bold text-lg">
                        {correct
                            ? "🎯 Excellent ! Ordre parfait !"
                            : "🔄 Pas tout à fait..."}
                    </div>
                </div>
            )}
        </div>
    );
}
