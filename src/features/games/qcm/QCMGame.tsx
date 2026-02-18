import { useState } from "react";
import type { QCMData, GameProps } from "../../../types/game";

export default function QCMGame({ data, onScore }: GameProps<QCMData>) {
    const [qIndex, setQIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [shake, setShake] = useState(false);
    const [answered, setAnswered] = useState(false);

    const questions = data.questions || [];
    const q = questions[qIndex];

    // Safety check
    if (!q) return <div className="text-white">Aucune question configurée</div>;

    const handleSelect = (choice: string) => {
        if (answered) return;
        setSelected(choice);
        setAnswered(true);
        if (choice !== q.answer) setShake(true);
        setTimeout(() => setShake(false), 400);

        if (choice === q.answer) {
            // Delay score update slightly for visual feedback
            setTimeout(() => onScore(data.xpCorrect || 15), 500);
        }
    };

    const next = () => {
        if (qIndex + 1 >= questions.length) {
            onScore(0); // Optional: signal end of game?
        } else {
            setQIndex(qIndex + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
            {/* Progress */}
            {data.showProgress && (
                <div className="flex gap-2 mb-8">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                                i <= qIndex ? "bg-primary-500" : "bg-slate-800"
                            }`}
                        />
                    ))}
                </div>
            )}

            <div
                key={qIndex}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
                {q.image && (
                    <img
                        src={q.image}
                        alt="Question"
                        className="w-full h-48 object-cover rounded-lg mb-6"
                    />
                )}
                <div className="text-6xl text-center mb-6 filter drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    {/* {q.emoji} - Removed as it's not in the data structure yet */}
                </div>
                <h2 className="text-2xl font-bold text-center mb-8 text-white leading-tight">
                    {q.q}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {q.choices.map((choice) => {
                        let bg = "bg-slate-800";
                        let border = "border-slate-700";
                        let color = "text-slate-200";

                        if (answered && choice === q.answer) {
                            bg = "bg-green-900/50";
                            border = "border-green-500";
                            color = "text-green-400";
                        } else if (
                            answered &&
                            choice === selected &&
                            choice !== q.answer
                        ) {
                            bg = "bg-red-900/50";
                            border = "border-red-500";
                            color = "text-red-400";
                        } else if (!answered && selected === choice) {
                            border = "border-primary-500";
                        }

                        return (
                            <button
                                key={choice}
                                onClick={() => handleSelect(choice)}
                                className={`
                                    p-4 rounded-xl border-2 text-lg font-semibold transition-all duration-200
                                    ${bg} ${border} ${color}
                                    ${!answered ? "hover:bg-slate-700 hover:border-slate-600 cursor-pointer" : "cursor-default"}
                                    ${shake && choice === selected ? "animate-shake" : ""}
                                    ${!answered && selected === choice ? "scale-105" : "scale-100"}
                                `}
                            >
                                {choice}
                            </button>
                        );
                    })}
                </div>
            </div>

            {answered && (
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={next}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-semibold transition-colors"
                    >
                        {qIndex + 1 >= questions.length
                            ? "Terminer"
                            : "Suivant"}
                    </button>
                </div>
            )}
        </div>
    );
}
