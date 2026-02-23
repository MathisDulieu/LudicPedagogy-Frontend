import { CreditCard, Download } from "lucide-react";

const PAYMENTS = [
    {
        date: "1 fév. 2026",
        org: "Lycée Victor Hugo",
        plan: "Pro",
        amount: "79,00 €",
        status: "paid",
    },
    {
        date: "1 fév. 2026",
        org: "Université Paris 9",
        plan: "Enterprise",
        amount: "390,00 €",
        status: "paid",
    },
    {
        date: "1 fév. 2026",
        org: "École Numys",
        plan: "Starter",
        amount: "29,00 €",
        status: "paid",
    },
    {
        date: "1 jan. 2026",
        org: "Lycée Victor Hugo",
        plan: "Pro",
        amount: "79,00 €",
        status: "paid",
    },
    {
        date: "1 jan. 2026",
        org: "Université Paris 9",
        plan: "Enterprise",
        amount: "390,00 €",
        status: "paid",
    },
    {
        date: "5 jan. 2026",
        org: "Centre AFPA Nord",
        plan: "Pro",
        amount: "79,00 €",
        status: "failed",
    },
];

export default function AdminPaymentHistory() {
    const total = "1 046,00 €";

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="text-primary-400" /> Historique des
                    paiements
                </h1>
                <div className="text-sm text-slate-400">
                    Total ce mois :{" "}
                    <strong className="text-green-400 text-lg">{total}</strong>
                </div>
            </div>

            <div className="flex justify-end mb-3">
                <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-xl transition-all">
                    <Download size={14} /> Exporter
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-5 text-xs text-slate-500 px-6 py-3 border-b border-slate-800">
                    <span>Date</span>
                    <span className="col-span-2">Organisation</span>
                    <span>Montant</span>
                    <span>Statut</span>
                </div>
                {PAYMENTS.map(({ date, org, plan, amount, status }, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-5 items-center px-6 py-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                        <span className="text-sm text-slate-400">{date}</span>
                        <div className="col-span-2">
                            <p className="text-sm font-medium text-white">
                                {org}
                            </p>
                            <p className="text-xs text-slate-500">{plan}</p>
                        </div>
                        <span className="text-sm font-bold text-white">
                            {amount}
                        </span>
                        <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full border w-fit ${status === "paid" ? "text-green-400 bg-green-900/30 border-green-700/40" : "text-red-400 bg-red-900/30 border-red-700/40"}`}
                        >
                            {status === "paid" ? "Payé" : "Échoué"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
