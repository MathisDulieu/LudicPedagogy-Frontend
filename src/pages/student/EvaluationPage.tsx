import { useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Upload, CheckCircle } from "lucide-react";

export default function EvaluationPage() {
    const { assignmentId } = useParams();
    const [text, setText] = useState("");
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <FileText className="text-primary-400" /> Devoir #
                    {assignmentId}
                </h1>
                <p className="text-slate-400 mt-1 text-sm">
                    Date limite :{" "}
                    <strong className="text-white">
                        28 février 2026 • 23h59
                    </strong>
                </p>
            </div>

            {submitted ? (
                <div className="bg-slate-900 border border-green-700/50 rounded-2xl p-12 text-center">
                    <CheckCircle
                        size={48}
                        className="text-green-400 mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Devoir soumis !
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Votre réponse a été enregistrée. Résultat disponible
                        après correction.
                    </p>
                </div>
            ) : (
                <>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                        <h2 className="font-semibold text-white mb-3">
                            Consigne
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Écrivez un programme Python qui demande à
                            l'utilisateur d'entrer une liste de nombres séparés
                            par des espaces, calcule leur moyenne et affiche si
                            elle est supérieure à 10.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                        <h2 className="font-semibold text-white mb-3">
                            Votre réponse
                        </h2>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={12}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-primary-500 resize-none"
                            placeholder="Écrivez votre code Python ici..."
                        />
                    </div>

                    <div className="flex items-center gap-2 p-4 rounded-xl border border-slate-800 bg-slate-900 mb-6 text-sm text-slate-400">
                        <Upload size={16} className="text-primary-400" />
                        Vous pouvez aussi joindre un fichier (PDF, .py, .docx —
                        max 10 Mo)
                        <label className="ml-auto cursor-pointer text-primary-400 hover:underline text-xs">
                            Parcourir
                        </label>
                    </div>

                    <button
                        onClick={() => setSubmitted(true)}
                        disabled={!text.trim()}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
                    >
                        Soumettre le devoir
                    </button>
                </>
            )}
        </div>
    );
}
