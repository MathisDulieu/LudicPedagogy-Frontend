import { useState } from "react";
import type { TerminalRiddleData, GameProps } from "../../../types/game";

export default function TerminalRiddle({
    data,
    onScore,
}: GameProps<TerminalRiddleData>) {
    const [answered, setAnswered] = useState(false);
    const [feedback, setFeedback] = useState("");

    // Use data from props if available, otherwise fallback to default
    const logs = data?.logs || [
        "[INFO] Starting server...",
        "[INFO] Connecting to database...",
        "[ERROR] Connection refused",
        "[INFO] Server stopped",
    ];
    const question = data?.question || "Pourquoi le serveur s'est-il arrêté ?";
    const answers = data?.answers || [
        "Le port était déjà utilisé",
        "La base de données était inaccessible",
        "Une erreur de syntaxe dans le code",
        "La mémoire était pleine",
    ];
    const correctIndex = data?.correctIndex ?? 1;

    function handleAnswer(index: number) {
        setAnswered(true);

        if (index === correctIndex) {
            onScore(data?.xpCorrect || 50);
            setFeedback("✔ Bonne analyse ! La base n'était pas accessible.");
        } else {
            setFeedback("❌ Relis bien les logs, un indice est caché.");
        }
    }

    return (
        <div className="bg-slate-950 border border-slate-700 rounded-lg p-6 font-mono text-left max-w-2xl w-full mx-auto shadow-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-slate-500">
                    terminal-riddle — bash
                </span>
            </div>

            <div className="mb-6 bg-slate-900 p-4 rounded border border-slate-800 text-sm">
                {logs.map((log, i) => (
                    <div
                        key={i}
                        className={`${
                            log.includes("ERROR")
                                ? "text-red-400"
                                : "text-green-400"
                        }`}
                    >
                        <span className="opacity-50 mr-2">$</span>
                        {log}
                    </div>
                ))}
            </div>

            <p className="text-xl text-slate-200 mb-6 font-bold border-l-4 border-primary-500 pl-4 py-1">
                {question}
            </p>

            <div className="space-y-3">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        disabled={answered}
                        onClick={() => handleAnswer(index)}
                        className={`w-full text-left p-4 rounded transition-all duration-200 border cursor-pointer
              ${
                  answered
                      ? index === correctIndex
                          ? "bg-green-500/10 border-green-500 text-green-300"
                          : "bg-slate-800 border-transparent text-slate-500 opacity-50"
                      : "bg-slate-900 border-slate-700 hover:border-primary-400 hover:bg-slate-800 text-slate-300"
              }`}
                    >
                        <span className="inline-block w-6 opacity-50">
                            {index + 1}.
                        </span>
                        {answer}
                    </button>
                ))}
            </div>

            {feedback && (
                <div
                    className={`mt-6 p-4 rounded text-center animate-fade-in font-bold ${
                        feedback.startsWith("✔")
                            ? "bg-green-500/20 text-green-300 border border-green-500/50"
                            : "bg-red-500/20 text-red-300 border border-red-500/50"
                    }`}
                >
                    {feedback}
                </div>
            )}
        </div>
    );
}
