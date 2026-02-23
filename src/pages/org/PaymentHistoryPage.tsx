import { CreditCard, Download, CheckCircle } from "lucide-react";

const PAYMENTS = [
    {
        date: "1 fév. 2026",
        plan: "Pro",
        amount: "79,00 €",
        status: "paid",
        invoice: "INV-2026-002",
    },
    {
        date: "1 jan. 2026",
        plan: "Pro",
        amount: "79,00 €",
        status: "paid",
        invoice: "INV-2026-001",
    },
    {
        date: "1 déc. 2025",
        plan: "Starter",
        amount: "29,00 €",
        status: "paid",
        invoice: "INV-2025-012",
    },
    {
        date: "1 nov. 2025",
        plan: "Starter",
        amount: "29,00 €",
        status: "paid",
        invoice: "INV-2025-011",
    },
];

export default function PaymentHistoryPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
                <CreditCard className="text-primary-400" /> Historique des
                paiements
            </h1>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-5 text-xs text-slate-500 px-6 py-3 border-b border-slate-800">
                    <span>Date</span>
                    <span>Plan</span>
                    <span>Montant</span>
                    <span>Statut</span>
                    <span />
                </div>
                {PAYMENTS.map(({ date, plan, amount, invoice }) => (
                    <div
                        key={invoice}
                        className="grid grid-cols-5 items-center px-6 py-4 border-b border-slate-800 last:border-0"
                    >
                        <span className="text-sm text-slate-400">{date}</span>
                        <span className="text-sm text-white">{plan}</span>
                        <span className="text-sm font-bold text-white">
                            {amount}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
                            <CheckCircle size={12} /> Payé
                        </span>
                        <div className="flex justify-end">
                            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-white transition-colors">
                                <Download size={12} /> {invoice}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
