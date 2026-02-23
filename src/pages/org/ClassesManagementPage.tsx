import { Link } from "react-router-dom";
import { Building2, Plus, ChevronRight, Users } from "lucide-react";

const CLASSES = [
    {
        id: "cl1",
        name: "Terminale NSI A",
        students: 28,
        teachers: 2,
        description: "Classe de terminale spécialité NSI, groupe A",
    },
    {
        id: "cl2",
        name: "Terminale NSI B",
        students: 25,
        teachers: 1,
        description: "Classe de terminale spécialité NSI, groupe B",
    },
    {
        id: "cl3",
        name: "BTS SIO 1ère année",
        students: 18,
        teachers: 3,
        description: "Première année BTS Services Informatiques",
    },
    {
        id: "cl4",
        name: "BTS SIO 2ème année",
        students: 16,
        teachers: 2,
        description: "Deuxième année BTS Services Informatiques",
    },
];

export default function ClassesManagementPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Building2 className="text-primary-400" /> Mes classes
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Gérez vos classes et leurs membres.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                    <Plus size={16} /> Nouvelle classe
                </button>
            </div>

            <div className="grid gap-4">
                {CLASSES.map(
                    ({ id, name, students, teachers, description }) => (
                        <Link
                            to={`/org/classes/${id}`}
                            key={id}
                            className="flex items-center justify-between p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-700 to-accent-700 flex items-center justify-center text-white text-lg font-bold">
                                    {name[0]}
                                </div>
                                <div>
                                    <h2 className="font-bold text-white">
                                        {name}
                                    </h2>
                                    <p className="text-slate-500 text-sm">
                                        {description}
                                    </p>
                                    <div className="flex gap-3 text-xs text-slate-600 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Users size={11} /> {students}{" "}
                                            étudiants
                                        </span>
                                        <span>
                                            {teachers} enseignant
                                            {teachers > 1 ? "s" : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight
                                size={18}
                                className="text-slate-500 group-hover:text-white transition-colors"
                            />
                        </Link>
                    ),
                )}
            </div>
        </div>
    );
}
