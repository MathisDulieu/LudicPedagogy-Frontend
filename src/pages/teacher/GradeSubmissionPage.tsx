import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { useState } from "react";

export default function GradeSubmissionPage() {
    const { submissionId } = useParams();
    const [grade, setGrade] = useState("");
    const [feedback, setFeedback] = useState("");
    const [saved, setSaved] = useState(false);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <Link
                    to="/teacher/sessions"
                    className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileText className="text-primary-400" /> Correction — #
                        {submissionId}
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Thomas Leblanc • Devoir Python #1
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                <h2 className="font-semibold text-white mb-3">
                    Rendu de l'étudiant
                </h2>
                <pre className="text-slate-300 text-xs font-mono bg-slate-950 rounded-xl p-4 overflow-x-auto leading-relaxed">{`nums = input("Entrez les nombres : ").split()
nums = [int(x) for x in nums]
avg = sum(nums) / len(nums)
print(f"Moyenne : {avg}")
if avg > 10:
    print("Supérieur à 10 !")`}</pre>
            </div>

            {saved ? (
                <div className="bg-green-900/20 border border-green-700/40 rounded-2xl p-6 text-center">
                    <p className="text-green-400 font-semibold">
                        Note enregistrée : {grade}/20
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                        L'étudiant sera notifié.
                    </p>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5">
                            Note (sur 20)
                        </label>
                        <input
                            type="number"
                            max={20}
                            min={0}
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                            placeholder="Ex: 16"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5">
                            Commentaire
                        </label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={4}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500 resize-none"
                            placeholder="Laissez un retour à l'étudiant..."
                        />
                    </div>
                    <button
                        onClick={() => setSaved(true)}
                        disabled={!grade}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40"
                    >
                        <Save size={16} /> Enregistrer la note
                    </button>
                </div>
            )}
        </div>
    );
}
