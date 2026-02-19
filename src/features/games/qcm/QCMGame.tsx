import { useState } from "react";
import type { QCMData, GameProps } from "../../../types/game";

export default function QCMGame({ data, onScore }: GameProps<QCMData>) {
    const [qIndex, setQIndex] = useState(0);
    const [selected, setSelected] = useState<string | string[] | null>(null);
    const [shake, setShake] = useState(false);
    const [answered, setAnswered] = useState(false);

    const questions = data.questions || [];
    const q = questions[qIndex];

    // Safety check
    if (!q) return <div className="text-white">Aucune question configurée</div>;

    const isCorrect = (sel: string | string[] | null) => {
        if (!sel) return false;
        const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
        const current = Array.isArray(sel) ? sel : [sel];

        if (correct.length !== current.length) return false;
        return current.every((val) => correct.includes(val));
    };

    const handleSelect = (choice: string) => {
        if (answered) return;

        if (q.isMulti) {
            const current = Array.isArray(selected) ? selected : [];
            const next = current.includes(choice)
                ? current.filter((c) => c !== choice)
                : [...current, choice];
            setSelected(next);
        } else {
            setSelected(choice);
            setAnswered(true);
            const correct = isCorrect(choice);
            if (!correct) setShake(true);
            setTimeout(() => setShake(false), 400);

            if (correct) {
                setTimeout(() => onScore(data.xpCorrect || 15), 500);
            }
        }
    };

    const validate = () => {
        if (answered || !q.isMulti) return;
        setAnswered(true);
        const correct = isCorrect(selected);
        if (!correct) setShake(true);
        setTimeout(() => setShake(false), 400);

        if (correct) {
            setTimeout(() => onScore(data.xpCorrect || 15), 500);
        }
    };

    const next = () => {
        if (qIndex + 1 >= questions.length) {
            onScore(0);
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
                <h2 className="text-2xl font-bold text-center mb-8 text-white leading-tight">
                    {q.q}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {q.choices.map((choice, index) => {
                        let bg = "bg-slate-800";
                        let border = "border-slate-700";
                        let color = "text-slate-200";

                        const isAnswer = Array.isArray(q.answer)
                            ? q.answer.includes(choice)
                            : q.answer === choice;

                        const isSelected = Array.isArray(selected)
                            ? selected.includes(choice)
                            : selected === choice;

                        if (answered && isAnswer) {
                            bg = "bg-green-900/50";
                            border = "border-green-500";
                            color = "text-green-400";
                        } else if (answered && isSelected && !isAnswer) {
                            bg = "bg-red-900/50";
                            border = "border-red-500";
                            color = "text-red-400";
                        } else if (!answered && isSelected) {
                            border = "border-primary-500";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelect(choice)}
                                className={`
                                    p-4 rounded-xl border-2 text-lg font-semibold transition-all duration-200 text-left flex items-center gap-3
                                    ${bg} ${border} ${color}
                                    ${!answered ? "hover:bg-slate-700 hover:border-slate-600 cursor-pointer" : "cursor-default"}
                                    ${shake && isSelected ? "animate-shake" : ""}
                                    ${!answered && isSelected ? "scale-105" : "scale-100"}
                                `}
                            >
                                {q.isMulti && (
                                    <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? "bg-primary-500 border-primary-500" : "border-slate-600"}`}
                                    >
                                        {isSelected && (
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={4}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                )}
                                <span className="flex-1">{choice}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {q.isMulti && !answered && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={validate}
                        disabled={
                            !selected ||
                            (Array.isArray(selected) && selected.length === 0)
                        }
                        className={`
                            px-8 py-3 rounded-xl font-bold text-lg transition-all
                            ${
                                selected &&
                                (!Array.isArray(selected) ||
                                    selected.length > 0)
                                    ? "bg-primary-600 hover:bg-primary-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                            }
                        `}
                    >
                        Valider
                    </button>
                </div>
            )}

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
