import { useState } from "react";
import { Tag, Plus, Trash2, Copy } from "lucide-react";

const CODES = [
    {
        code: "BACK2SCHOOL25",
        discount: "25%",
        uses: 12,
        max: 50,
        expires: "31 août 2026",
        active: true,
    },
    {
        code: "FREETRIAL14",
        discount: "14 jours",
        uses: 89,
        max: 200,
        expires: "30 juin 2026",
        active: true,
    },
    {
        code: "SUMMER2025",
        discount: "30%",
        uses: 200,
        max: 200,
        expires: "31 août 2025",
        active: false,
    },
];

export default function AdminPromoCodes() {
    const [codes, setCodes] = useState(CODES);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Tag className="text-primary-400" /> Codes promo
                </h1>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                    <Plus size={16} /> Créer un code
                </button>
            </div>

            <div className="space-y-3">
                {codes.map(({ code, discount, uses, max, expires, active }) => (
                    <div
                        key={code}
                        className={`p-5 rounded-2xl border transition-all ${active ? "border-slate-800 bg-slate-900/50" : "border-slate-800/50 bg-slate-900/20 opacity-60"}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="font-mono font-bold text-white text-lg tracking-wider">
                                    {code}
                                </div>
                                <span
                                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? "bg-green-900/40 text-green-400 border border-green-700/40" : "bg-slate-800 text-slate-500"}`}
                                >
                                    {active ? "Actif" : "Expiré"}
                                </span>
                                <span className="text-xs bg-primary-900/40 text-primary-300 border border-primary-700/30 px-2 py-0.5 rounded-full">
                                    -{discount}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-2 text-slate-500 hover:text-white"
                                    title="Copier"
                                >
                                    <Copy size={14} />
                                </button>
                                <button
                                    onClick={() =>
                                        setCodes(
                                            codes.filter(
                                                (c) => c.code !== code,
                                            ),
                                        )
                                    }
                                    className="p-2 text-slate-500 hover:text-red-400"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex-1">
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>Utilisations</span>
                                    <span>
                                        {uses}/{max}
                                    </span>
                                </div>
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                        style={{
                                            width: `${Math.min((uses / max) * 100, 100)}%`,
                                        }}
                                    />
                                </div>
                            </div>
                            <span className="text-xs text-slate-500 flex-shrink-0">
                                Expire : {expires}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
