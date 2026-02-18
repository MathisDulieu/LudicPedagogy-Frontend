import { useState, useEffect } from "react";
import type { GameProps } from "../../../types/game";

export default function BinarySlap({ onScore }: GameProps<any>) {
    const [target, setTarget] = useState(0);
    const [bits, setBits] = useState<number[]>(Array(8).fill(0));
    const [feedback, setFeedback] = useState("");

    function nextRound() {
        setTarget(Math.floor(Math.random() * 255) + 1);
        setBits(Array(8).fill(0));
        setFeedback("");
    }

    useEffect(() => {
        nextRound();
    }, []);

    const currentSum = bits.reduce(
        (acc, bit, i) => acc + (bit ? Math.pow(2, 7 - i) : 0),
        0,
    );

    function toggleBit(index: number) {
        const newBits = [...bits];
        newBits[index] = newBits[index] ? 0 : 1;
        setBits(newBits);

        // Auto-check if sum matches
        const newSum = newBits.reduce(
            (acc, bit, i) => acc + (bit ? Math.pow(2, 7 - i) : 0),
            0,
        );
        if (newSum === target) {
            onScore(15);
            setFeedback("⚡ SLAP ! +15 XP");
            setTimeout(nextRound, 1000);
        }
    }

    return (
        <div className="bg-slate-900 border-2 border-primary-500/50 rounded-2xl p-8 shadow-[0_0_30px_rgba(14,165,233,0.2)] text-center max-w-2xl w-full mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                BINARY SLAP
            </h2>
            <p className="text-slate-400 mb-8">
                Active les bons bits pour obtenir le nombre cible
            </p>

            <div className="mb-12">
                <div className="text-sm text-slate-500 uppercase tracking-widest mb-2">
                    Cible
                </div>
                <div className="text-7xl font-bold text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {target}
                </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-8">
                {bits.map((bit, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <button
                            onClick={() => toggleBit(i)}
                            className={`h-16 rounded-xl text-2xl font-bold transition-all duration-200 focus:outline-none active:scale-95 cursor-pointer
                ${
                    bit
                        ? "bg-primary-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] border-primary-400"
                        : "bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700 hover:border-slate-600"
                } border-2`}
                        >
                            {bit}
                        </button>
                        <div className="text-[10px] font-mono text-slate-600">
                            {Math.pow(2, 7 - i)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-12 flex items-center justify-center">
                {feedback ? (
                    <div className="text-green-400 font-bold text-xl animate-bounce">
                        {feedback}
                    </div>
                ) : (
                    <div className="text-slate-500 font-mono">
                        Somme actuelle :{" "}
                        <span className="text-primary-400 font-bold">
                            {currentSum}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
