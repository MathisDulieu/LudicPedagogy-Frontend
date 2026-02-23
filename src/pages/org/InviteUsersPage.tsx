import { useState } from "react";
import { Mail, UserPlus, Send, CheckCircle, X } from "lucide-react";

export default function InviteUsersPage() {
    const [emails, setEmails] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [role, setRole] = useState("student");
    const [sent, setSent] = useState(false);

    const addEmail = () => {
        if (input && !emails.includes(input)) {
            setEmails([...emails, input]);
            setInput("");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <UserPlus className="text-primary-400" /> Inviter des
                    membres
                </h1>
                <p className="text-slate-400 mt-1 text-sm">
                    Envoyez des invitations par email à vos enseignants et
                    étudiants.
                </p>
            </div>

            {sent ? (
                <div className="bg-green-900/20 border border-green-700/40 rounded-2xl p-10 text-center">
                    <CheckCircle
                        size={48}
                        className="text-green-400 mx-auto mb-4"
                    />
                    <h2 className="text-xl font-bold text-white mb-2">
                        Invitations envoyées !
                    </h2>
                    <p className="text-slate-400 text-sm">
                        {emails.length} email{emails.length > 1 ? "s" : ""}{" "}
                        envoyé{emails.length > 1 ? "s" : ""}.
                    </p>
                    <button
                        onClick={() => {
                            setSent(false);
                            setEmails([]);
                        }}
                        className="mt-6 text-primary-400 hover:underline text-sm"
                    >
                        Envoyer d'autres invitations
                    </button>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5">
                            Rôle à attribuer
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                        >
                            <option value="student">Étudiant</option>
                            <option value="teacher">Enseignant</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5">
                            Ajouter des emails
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Mail
                                    size={14}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && addEmail()
                                    }
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500"
                                    placeholder="jean.dupont@lycee.fr"
                                />
                            </div>
                            <button
                                onClick={addEmail}
                                className="px-4 py-2 rounded-xl bg-slate-700 text-white text-sm hover:bg-slate-600 transition-colors"
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>

                    {emails.length > 0 && (
                        <div>
                            <p className="text-xs text-slate-500 mb-2">
                                {emails.length} email
                                {emails.length > 1 ? "s" : ""} à inviter :
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {emails.map((e) => (
                                    <div
                                        key={e}
                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-900/40 border border-primary-700/40 text-primary-300 text-xs"
                                    >
                                        {e}
                                        <button
                                            onClick={() =>
                                                setEmails(
                                                    emails.filter(
                                                        (x) => x !== e,
                                                    ),
                                                )
                                            }
                                        >
                                            <X
                                                size={12}
                                                className="hover:text-white"
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setSent(true)}
                        disabled={emails.length === 0}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40"
                    >
                        <Send size={16} /> Envoyer les invitations
                    </button>
                </div>
            )}
        </div>
    );
}
