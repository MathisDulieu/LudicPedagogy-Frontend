export default function LegalNoticePage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 prose prose-invert prose-sm">
            <h1 className="text-4xl font-bold text-white mb-2">
                Mentions légales
            </h1>
            <p className="text-slate-500 text-sm mb-10">
                Dernière mise à jour : 22 février 2026
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    1. Éditeur du site
                </h2>
                <p>
                    Le site <strong>ludicpedagogy.fr</strong> est édité par la
                    société <strong>LudicPedagogy SAS</strong>, société par
                    actions simplifiée au capital de 10 000 €, immatriculée au
                    Registre du Commerce et des Sociétés de Paris sous le numéro{" "}
                    <strong>RCS 123 456 789</strong>.
                </p>
                <ul className="text-slate-400 space-y-1">
                    <li>
                        <strong>Siège social :</strong> 42 rue de l'Innovation,
                        75001 Paris
                    </li>
                    <li>
                        <strong>Téléphone :</strong> +33 1 23 45 67 89
                    </li>
                    <li>
                        <strong>Email :</strong> contact@ludicpedagogy.fr
                    </li>
                    <li>
                        <strong>Directeur de la publication :</strong> Mathis
                        Dulieu
                    </li>
                    <li>
                        <strong>N° TVA intracommunautaire :</strong> FR 12 345
                        678 901
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    2. Hébergeur
                </h2>
                <p>Le site est hébergé par :</p>
                <ul className="text-slate-400 space-y-1">
                    <li>
                        <strong>Société :</strong> OVHcloud SAS
                    </li>
                    <li>
                        <strong>Adresse :</strong> 2 rue Kellermann, 59100
                        Roubaix, France
                    </li>
                    <li>
                        <strong>Site web :</strong> www.ovhcloud.com
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    3. Propriété intellectuelle
                </h2>
                <p>
                    L'ensemble des contenus présents sur le site LudicPedagogy
                    (textes, images, logos, graphismes, structure) est protégé
                    par le droit d'auteur et demeure la propriété exclusive de
                    LudicPedagogy SAS. Toute reproduction, représentation ou
                    utilisation sans autorisation préalable est strictement
                    interdite.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    4. Limitation de responsabilité
                </h2>
                <p>
                    LudicPedagogy s'efforce de maintenir l'exactitude des
                    informations présentes sur le site. Cependant, nous ne
                    saurions être tenus responsables d'éventuelles erreurs ou
                    omissions. Les liens hypertextes présents sur le site
                    peuvent renvoyer vers des sites tiers dont nous ne
                    maîtrisons pas le contenu.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">5. Contact</h2>
                <p>
                    Pour toute question relative au présent document, vous
                    pouvez nous contacter à{" "}
                    <a
                        href="mailto:legal@ludicpedagogy.fr"
                        className="text-primary-400 hover:underline"
                    >
                        legal@ludicpedagogy.fr
                    </a>
                    .
                </p>
            </section>
        </div>
    );
}
