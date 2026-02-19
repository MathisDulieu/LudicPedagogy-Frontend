import { useState, useEffect, useRef } from "react";
import type { WarioData, GameProps } from "../../../types/game";

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export default function WarioGame({ data, onScore }: GameProps<WarioData>) {
    const [taskIdx, setTaskIdx] = useState(0);
    const [phase, setPhase] = useState<"get-ready" | "playing" | "result">(
        "get-ready",
    );
    const [result, setResult] = useState<
        "correct" | "wrong" | "timeout" | null
    >(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const tasks = data.tasks || [];
    const task = tasks[taskIdx];

    useEffect(() => {
        if (!task) return;
        if (phase === "get-ready") {
            const t = setTimeout(() => setPhase("playing"), 1500);
            return () => clearTimeout(t);
        }
        if (phase === "playing") {
            timerRef.current = setTimeout(() => {
                setResult("timeout");
                setPhase("result");
            }, task.duration);
            return () => {
                if (timerRef.current) clearTimeout(timerRef.current);
            };
        }
    }, [phase, task]);

    const handleTap = (option: string) => {
        if (phase !== "playing") return;
        if (timerRef.current) clearTimeout(timerRef.current);
        const correct = option === task.answer;
        setResult(correct ? "correct" : "wrong");
        if (correct) onScore(data.xpCorrect || 10);
        setPhase("result");
    };

    const next = () => {
        if (taskIdx + 1 >= tasks.length) {
            onScore(0); // Optional: signal end
        } else {
            setTaskIdx(taskIdx + 1);
            setResult(null);
            setPhase("get-ready");
        }
    };

    if (!task) return <div className="text-white">Chargement...</div>;

    const currentOptions = data.shuffleOptions
        ? shuffle(task.options)
        : task.options;

    return (
        <div className="max-w-xl mx-auto min-h-[400px] flex flex-col justify-center bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden relative">
            {phase === "get-ready" && (
                <div className="text-center animate-pulse">
                    <div className="text-8xl mb-4">🎮</div>
                    <div className="text-4xl font-black text-yellow-500 tracking-wider">
                        PRÊT ?
                    </div>
                </div>
            )}

            {phase === "playing" && (
                <div className="w-full h-full p-6 flex flex-col">
                    {/* Timer Bar */}
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-8">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                            style={{
                                width: "100%",
                                animation: `timer-drain ${task.duration}ms linear forwards`,
                            }}
                        />
                        <style>{`
                            @keyframes timer-drain {
                                from { width: 100%; }
                                to { width: 0%; }
                            }
                        `}</style>
                    </div>

                    <h2 className="text-3xl font-black text-center text-white mb-8 uppercase tracking-wide">
                        {task.instruction}
                    </h2>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                        {currentOptions.map((opt, index) => (
                            <button
                                key={index}
                                onClick={() => handleTap(opt)}
                                className="bg-slate-800 border-b-4 border-slate-950 hover:bg-slate-700 active:border-b-0 active:translate-y-1 rounded-xl text-xl font-bold text-white transition-all p-4"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {phase === "result" && (
                <div className="text-center p-8 animate-in zoom-in duration-300">
                    <div className="text-8xl mb-4">
                        {result === "correct"
                            ? "🌟"
                            : result === "timeout"
                              ? "⏰"
                              : "💥"}
                    </div>
                    <div
                        className={`text-3xl font-black mb-2 ${result === "correct" ? "text-green-500" : "text-red-500"}`}
                    >
                        {result === "correct"
                            ? "BOUM !"
                            : result === "timeout"
                              ? "TROP LENT !"
                              : "RATÉ !"}
                    </div>
                    {result !== "correct" && (
                        <div className="text-slate-400 mb-8">
                            Bonne réponse :{" "}
                            <span className="text-primary-400 font-bold">
                                {task.answer}
                            </span>
                        </div>
                    )}
                    <button
                        onClick={next}
                        className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold text-lg transition-colors"
                    >
                        {taskIdx + 1 >= tasks.length ? "Terminer" : "Suivant"}
                    </button>
                </div>
            )}
        </div>
    );
}
