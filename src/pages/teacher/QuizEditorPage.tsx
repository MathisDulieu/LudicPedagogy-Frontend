import { useParams } from "react-router-dom";
import { Plus, Trash2, Save } from "lucide-react";
import { useState } from "react";

export default function QuizEditorPage() {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([
        {
            text: "Première question ?",
            options: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
            correct: 0,
        },
    ]);

    const addQuestion = () =>
        setQuestions([
            ...questions,
            {
                text: "Nouvelle question ?",
                options: ["Option A", "Option B", "Option C", "Option D"],
                correct: 0,
            },
        ]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Éditeur de quiz — #{quizId ?? "nouveau"}
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Modifiez les questions et réponses du quiz.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                    <Save size={16} /> Enregistrer
                </button>
            </div>

            <div className="space-y-6">
                {questions.map((q, qi) => (
                    <div
                        key={qi}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                                Question {qi + 1}
                            </span>
                            <button
                                onClick={() =>
                                    setQuestions(
                                        questions.filter((_, i) => i !== qi),
                                    )
                                }
                                className="text-slate-500 hover:text-red-400"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <input
                            value={q.text}
                            onChange={(e) => {
                                const qs = [...questions];
                                qs[qi].text = e.target.value;
                                setQuestions(qs);
                            }}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm mb-4 focus:outline-none focus:border-primary-500"
                        />
                        <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt, oi) => (
                                <div
                                    key={oi}
                                    className={`flex items-center gap-2 p-2 rounded-lg border ${q.correct === oi ? "border-green-600 bg-green-900/20" : "border-slate-700"}`}
                                >
                                    <button
                                        onClick={() => {
                                            const qs = [...questions];
                                            qs[qi].correct = oi;
                                            setQuestions(qs);
                                        }}
                                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${q.correct === oi ? "border-green-500 bg-green-500" : "border-slate-600"}`}
                                    />
                                    <input
                                        value={opt}
                                        onChange={(e) => {
                                            const qs = [...questions];
                                            qs[qi].options[oi] = e.target.value;
                                            setQuestions(qs);
                                        }}
                                        className="w-full bg-transparent text-slate-200 text-xs focus:outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={addQuestion}
                    className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-700 text-slate-400 hover:border-primary-600 hover:text-primary-400 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                    <Plus size={16} /> Ajouter une question
                </button>
            </div>
        </div>
    );
}
