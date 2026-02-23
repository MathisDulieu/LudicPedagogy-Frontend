import { useParams } from "react-router-dom";
import { FileText, Save, Calendar } from "lucide-react";
import { useState } from "react";

export default function AssignmentEditorPage() {
    const { assignmentId } = useParams();
    const [title, setTitle] = useState("Devoir Python #1");
    const [description, setDescription] = useState(
        "Décrivez l'exercice à réaliser...",
    );
    const [maxScore, setMaxScore] = useState(20);
    const [deadline, setDeadline] = useState("2026-02-28");

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileText className="text-primary-400" /> Éditeur de
                        devoir
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        #{assignmentId ?? "nouveau"}
                    </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                    <Save size={16} /> Sauvegarder
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                        Titre du devoir
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                        Consigne
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500 resize-none"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5">
                            Note maximale
                        </label>
                        <input
                            type="number"
                            value={maxScore}
                            onChange={(e) =>
                                setMaxScore(Number(e.target.value))
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5 flex items-center gap-1">
                            <Calendar size={12} /> Date limite
                        </label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
