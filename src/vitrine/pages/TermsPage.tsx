export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 prose prose-invert prose-sm">
            <h1 className="text-4xl font-bold text-white mb-2">
                Conditions Générales d'Utilisation
            </h1>
            <p className="text-slate-500 text-sm mb-10">
                Dernière mise à jour : 22 février 2026
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    1. Acceptation des CGU
                </h2>
                <p>
                    En créant un compte sur LudicPedagogy, vous acceptez sans
                    réserve les présentes Conditions Générales d'Utilisation
                    (CGU). Si vous n'acceptez pas ces conditions, vous ne devez
                    pas utiliser le service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    2. Description du service
                </h2>
                <p>
                    LudicPedagogy est une plateforme éducative en ligne
                    permettant :
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                    <li>La création et la gestion de cours interactifs;</li>
                    <li>La réalisation de quiz et jeux pédagogiques;</li>
                    <li>Le suivi de la progression des apprenants;</li>
                    <li>
                        La gestion d'organisations éducatives (classes,
                        départements).
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    3. Comptes utilisateurs
                </h2>
                <p>
                    Chaque utilisateur est responsable de la confidentialité de
                    ses identifiants de connexion. Tout accès effectué depuis
                    votre compte est présumé être de votre fait. En cas de
                    compromission, vous devez contacter immédiatement
                    LudicPedagogy.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    4. Obligations des utilisateurs
                </h2>
                <p>En utilisant le service, vous vous engagez à :</p>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                    <li>
                        Fournir des informations exactes lors de l'inscription;
                    </li>
                    <li>Ne pas partager votre compte avec des tiers;</li>
                    <li>
                        Ne pas publier de contenu illicite, offensant ou
                        contrefait;
                    </li>
                    <li>
                        Respecter les droits de propriété intellectuelle des
                        autres utilisateurs;
                    </li>
                    <li>
                        Ne pas tenter de perturber ou d'accéder frauduleusement
                        au service.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    5. Abonnements et paiements
                </h2>
                <p>
                    Les abonnements sont souscrits pour une durée mensuelle ou
                    annuelle selon le plan choisi. Les tarifs sont indiqués hors
                    taxes sur la page Tarifs. LudicPedagogy se réserve le droit
                    de modifier les prix avec un préavis de 30 jours. Le
                    non-paiement entraîne la suspension du compte.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    6. Résiliation
                </h2>
                <p>
                    Vous pouvez résilier votre abonnement à tout moment depuis
                    votre espace abonnement. La résiliation prend effet à la fin
                    de la période d'abonnement en cours. LudicPedagogy peut
                    résilier ou suspendre tout compte ne respectant pas les
                    présentes CGU.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    7. Limitation de responsabilité
                </h2>
                <p>
                    LudicPedagogy ne saurait être tenu responsable des dommages
                    indirects résultant de l'utilisation ou de l'impossibilité
                    d'utiliser le service. La responsabilité totale de
                    LudicPedagogy est limitée au montant payé par l'utilisateur
                    au cours des 12 derniers mois.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    8. Droit applicable
                </h2>
                <p>
                    Les présentes CGU sont régies par le droit français. Tout
                    litige relatif à leur interprétation ou exécution sera
                    soumis aux tribunaux compétents de Paris.
                </p>
            </section>
        </div>
    );
}
