import { useState } from "react";
import { Clock, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { useParams } from "react-router-dom";

const MOCK_QUESTIONS = [
    {
        id: 1,
        question: "Qu'est-ce qu'une variable en Python ?",
        options: [
            "Un conteneur de valeur",
            "Une boucle",
            "Une fonction",
            "Un opérateur",
        ],
        answer: 0,
    },
    {
        id: 2,
        question: "Quel mot-clé permet de définir une fonction ?",
        options: ["func", "def", "function", "define"],
        answer: 1,
    },
    {
        id: 3,
        question: "Lequel est un type booléen valide en Python ?",
        options: ["yes", "True", "1.0", "ok"],
        answer: 1,
    },
];

export default function TestSession() {
    const { sessionId } = useParams();
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [finished, setFinished] = useState(false);

    const q = MOCK_QUESTIONS[current];

    const handleNext = () => {
        const newAnswers = [...answers, selected ?? -1];
        if (current < MOCK_QUESTIONS.length - 1) {
            setAnswers(newAnswers);
            setSelected(null);
            setCurrent(current + 1);
        } else {
            setAnswers(newAnswers);
            setFinished(true);
        }
    };

    if (finished) {
        const score = answers.filter(
            (a, i) => a === MOCK_QUESTIONS[i].answer,
        ).length;
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <CheckCircle
                        size={56}
                        className="text-green-400 mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Test terminé !
                    </h1>
                    <p className="text-slate-400 mb-2">
                        Score :{" "}
                        <strong className="text-white">
                            {score}/{MOCK_QUESTIONS.length}
                        </strong>
                    </p>
                    <p className="text-slate-500 text-sm">
                        Session #{sessionId}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-xl font-bold text-white">
                            Session #{sessionId}
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Question {current + 1} / {MOCK_QUESTIONS.length}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-yellow-400">
                            <Clock size={16} /> 14:32
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-400">
                            <Shield size={14} /> Surveillé
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="h-1.5 bg-slate-800 rounded-full mb-8">
                    <div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
                        style={{
                            width: `${(current / MOCK_QUESTIONS.length) * 100}%`,
                        }}
                    />
                </div>

                {/* Question */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6">
                    <p className="text-xl font-semibold text-white mb-6">
                        {q.question}
                    </p>
                    <div className="space-y-3">
                        {q.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(i)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                                    selected === i
                                        ? "border-primary-500 bg-primary-900/30 text-primary-300"
                                        : "border-slate-700 text-slate-300 hover:border-slate-500"
                                }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Anti-cheat warning */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                    <AlertTriangle size={12} className="text-yellow-500" />
                    Votre session est surveillée. Ne quittez pas cette fenêtre.
                </div>

                <button
                    onClick={handleNext}
                    disabled={selected === null}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                    {current < MOCK_QUESTIONS.length - 1
                        ? "Question suivante"
                        : "Terminer"}
                </button>
            </div>
        </div>
    );
}
